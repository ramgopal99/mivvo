import { SubLesson } from '../../../../data/lessonsData';

export const topic_19_1: SubLesson = {
  id: 19.1,
  title: 'Task Management System',
  status: 'completed',
  content: `# 📋 Java Intermediate Project: Task Management System

Build a comprehensive task management application with Spring Boot!

---

## 🎯 Project Overview

Create a full-stack task management system with REST API backend and database persistence.

### **Features to Implement:**
- ✅ User registration and authentication
- ✅ CRUD operations for tasks
- ✅ Task categories and priorities
- ✅ Due dates and reminders
- ✅ Search and filtering
- ✅ RESTful API design
- ✅ Database integration with JPA

---

## 🏗️ Technology Stack

- **Backend**: Spring Boot, Spring Data JPA, Spring Security
- **Database**: H2/MySQL/PostgreSQL
- **Authentication**: JWT tokens
- **Testing**: JUnit, Mockito
- **Documentation**: Swagger/OpenAPI

---

## 📊 Database Design

### **Entity Relationships**
\`\`\`sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    user_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tasks table
CREATE TABLE tasks (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    status ENUM('TODO', 'IN_PROGRESS', 'DONE') DEFAULT 'TODO',
    due_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    category_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
\`\`\`

---

## 🔧 Backend Implementation

### **1. Entity Classes**
\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Category> categories;

    // Constructors, getters, setters
}

@Entity
@Table(name = "tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;

    @Enumerated(EnumType.STRING)
    private Status status = Status.TODO;

    private LocalDateTime dueDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // Constructors, getters, setters
}

public enum Priority {
    LOW, MEDIUM, HIGH
}

public enum Status {
    TODO, IN_PROGRESS, DONE
}
\`\`\`

### **2. Repository Layer**
\`\`\`java
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Task> findByUserIdAndStatus(Long userId, Status status);

    List<Task> findByUserIdAndPriority(Long userId, Priority priority);

    List<Task> findByUserIdAndCategoryId(Long userId, Long categoryId);

    @Query("SELECT t FROM Task t WHERE t.user.id = :userId AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Task> searchTasks(@Param("userId") Long userId,
                          @Param("keyword") String keyword);

    List<Task> findByUserIdAndDueDateBefore(Long userId, LocalDateTime date);
}
\`\`\`

### **3. Service Layer**
\`\`\`java
@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository,
                      UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Long userId, TaskCreateRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setUser(user);

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            task.setCategory(category);
        }

        return taskRepository.save(task);
    }

    public List<Task> getUserTasks(Long userId) {
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Task updateTask(Long userId, Long taskId, TaskUpdateRequest request) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        // Verify ownership
        if (!task.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied");
        }

        // Update fields
        if (request.getTitle() != null) {
            task.setTitle(request.getTitle());
        }
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }

        return taskRepository.save(task);
    }

    public void deleteTask(Long userId, Long taskId) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getUser().getId().equals(userId)) {
            throw new AccessDeniedException("Access denied");
        }

        taskRepository.delete(task);
    }
}
\`\`\`

### **4. Controller Layer**
\`\`\`java
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskCreateRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Task task = taskService.createTask(currentUser.getId(), request);
        TaskResponse response = TaskResponse.fromEntity(task);

        return ResponseEntity.created(
            ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(task.getId())
                .toUri()
        ).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getUserTasks(
            @AuthenticationPrincipal UserPrincipal currentUser,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) Long categoryId) {

        List<Task> tasks;

        if (status != null) {
            tasks = taskService.getTasksByStatus(currentUser.getId(), status);
        } else if (priority != null) {
            tasks = taskService.getTasksByPriority(currentUser.getId(), priority);
        } else if (categoryId != null) {
            tasks = taskService.getTasksByCategory(currentUser.getId(), categoryId);
        } else {
            tasks = taskService.getUserTasks(currentUser.getId());
        }

        List<TaskResponse> responses = tasks.stream()
            .map(TaskResponse::fromEntity)
            .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskUpdateRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        Task task = taskService.updateTask(currentUser.getId(), taskId, request);
        return ResponseEntity.ok(TaskResponse.fromEntity(task));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            @AuthenticationPrincipal UserPrincipal currentUser) {

        taskService.deleteTask(currentUser.getId(), taskId);
        return ResponseEntity.noContent().build();
    }
}
\`\`\`

---

## 🔐 Authentication & Security

### **JWT Authentication**
\`\`\`java
@Service
public class JwtService {
    private final String secretKey = "your-secret-key-here";
    private final long jwtExpiration = 86400000; // 24 hours

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
\`\`\`

---

## 🧪 Testing

### **Unit Tests**
\`\`\`java
@SpringBootTest
public class TaskServiceTest {
    @MockBean
    private TaskRepository taskRepository;

    @Autowired
    private TaskService taskService;

    @Test
    public void testCreateTask() {
        // Given
        Long userId = 1L;
        TaskCreateRequest request = new TaskCreateRequest();
        request.setTitle("Test Task");
        request.setDescription("Test Description");

        User user = new User();
        user.setId(userId);

        Task savedTask = new Task();
        savedTask.setId(1L);
        savedTask.setTitle("Test Task");
        savedTask.setUser(user);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        // When
        Task result = taskService.createTask(userId, request);

        // Then
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository).save(any(Task.class));
    }
}
\`\`\`

### **Integration Tests**
\`\`\`java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testCreateAndGetTask() {
        // Create task
        TaskCreateRequest request = new TaskCreateRequest();
        request.setTitle("Integration Test Task");

        HttpEntity<TaskCreateRequest> entity = new HttpEntity<>(request, getAuthHeaders());

        ResponseEntity<TaskResponse> createResponse = restTemplate.postForEntity(
            "/api/tasks", entity, TaskResponse.class);

        assertEquals(HttpStatus.CREATED, createResponse.getStatusCode());

        // Get task
        ResponseEntity<TaskResponse[]> getResponse = restTemplate.exchange(
            "/api/tasks", HttpMethod.GET, new HttpEntity<>(getAuthHeaders()),
            TaskResponse[].class);

        assertEquals(HttpStatus.OK, getResponse.getStatusCode());
        assertTrue(getResponse.getBody().length > 0);
    }

    private HttpHeaders getAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + getJwtToken());
        return headers;
    }
}
\`\`\`

---

## 🎯 Learning Outcomes

By completing this project, you'll master:

1. **Spring Boot** application development
2. **REST API** design and implementation
3. **JPA/Hibernate** for database operations
4. **JWT Authentication** and security
5. **Unit and Integration Testing**
6. **MVC Architecture** in web applications
7. **Error Handling** and validation
8. **API Documentation** with Swagger

---

## 🚀 Deployment

### **Docker Configuration**
\`\`\`dockerfile
FROM openjdk:17-jdk-slim
COPY target/taskmanager-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
\`\`\`

### **Application Properties**
\`\`\`properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager
spring.datasource.username=user
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update

# JWT
app.jwt.secret=mySecretKey
app.jwt.expiration=86400000

# Server
server.port=8080
\`\`\`

---

## 🏆 Advanced Features (Optional)

- 🔍 **Advanced Search**: Full-text search with Elasticsearch
- 📧 **Email Notifications**: Reminders for due tasks
- 👥 **Team Collaboration**: Share tasks with other users
- 📊 **Analytics**: Dashboard with task statistics
- 📱 **Mobile App**: React Native companion app
- 🔄 **Real-time Updates**: WebSocket notifications

**Congratulations!** 🎉 You've built a professional-grade task management system!`
};
