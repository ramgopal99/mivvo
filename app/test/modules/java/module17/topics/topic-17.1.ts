import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_1: SubLesson = {
  id: "17.1",
  title: 'Spring Framework & Hibernate',
  status: 'completed',
  content: "`# ðŸŒ± Spring Framework & Hibernate

Master enterprise Java development with powerful frameworks!

---

## ðŸŽ¯ Spring Framework Overview

### **1. Dependency Injection (DI)**
\`"\`\`java
// Service class
@Component
public class UserService {
    private final UserRepository userRepository;

    // Constructor injection (recommended)
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

// Repository interface
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA provides findById automatically
}
\`\`\`

### **2. Spring Boot Application**
\`\`\`java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

// REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findUserById(id);
        return user != null ? ResponseEntity.ok(user) :
                            ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.created(
            ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri()
        ).body(savedUser);
    }
}
\`\`\`

---

## ðŸ—„ï¸ Hibernate ORM

### **1. Entity Mapping**
\`\`\`java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();

    // Constructors, getters, setters
    public User() {}

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
\`\`\`

### **2. Repository Pattern**
\`\`\`java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query methods
    List<User> findByLastName(String lastName);

    List<User> findByEmailContaining(String email);

    @Query("SELECT u FROM User u WHERE u.firstName = :firstName AND u.lastName = :lastName")
    List<User> findByFullName(@Param("firstName") String firstName,
                             @Param("lastName") String lastName);

    @Query(value = "SELECT * FROM users WHERE created_date > :date", nativeQuery = true)
    List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);
}
\`\`\`

### **3. Service Layer**
\`\`\`java
@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(CreateUserRequest request) {
        // Validate input
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        // Create user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User not found"));
    }
}
\`\`\`

---

## ðŸ”’ Spring Security

### **1. Basic Configuration**
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter(),
                           UsernamePasswordAuthenticationFilter.class);
    }
}
\`\`\`

### **2. JWT Implementation**
\`\`\`java
@Component
public class JwtTokenProvider {
    \@Value("\${app.jwt.secret}")
    private String jwtSecret;

    \@Value("\${app.jwt.expiration}")
    private int jwtExpirationInMs;

    public String generateToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Date expiryDate = new Date(System.currentTimeMillis() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            // Invalid JWT signature
        } catch (MalformedJwtException ex) {
            // Invalid JWT token
        } catch (ExpiredJwtException ex) {
            // Expired JWT token
        } catch (UnsupportedJwtException ex) {
            // Unsupported JWT token
        } catch (IllegalArgumentException ex) {
            // JWT claims string is empty
        }
        return false;
    }
}
\`\`\`

---

## ðŸ§ª Testing with Spring

### **1. Unit Testing**
\`\`\`java
@SpringBootTest
public class UserServiceTest {
    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Test
    public void testCreateUser() {
        // Arrange
        CreateUserRequest request = new CreateUserRequest(
            "John", "Doe", "john@example.com", "password"
        );

        User savedUser = new User(1L, "John", "Doe", "john@example.com");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);

        // Act
        User result = userService.createUser(request);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        verify(userRepository).save(any(User.class));
    }
}
\`\`\`

### **2. Integration Testing**
\`\`\`java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testGetUser() {
        // Assuming user with ID 1 exists in test database
        ResponseEntity<User> response = restTemplate.getForEntity(
            "/api/users/1", User.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Spring Boot**: Rapid application development with auto-configuration
2. **Spring Data JPA**: Simplified database operations
3. **Spring Security**: Authentication and authorization
4. **Hibernate**: Powerful ORM for database mapping
5. **Testing**: Unit and integration tests for reliability
6. **REST APIs**: Building scalable web services

**Build enterprise-grade Java applications with these frameworks!** ðŸš€`
};


