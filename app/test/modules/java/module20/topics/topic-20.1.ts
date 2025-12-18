import { SubLesson } from '../../../../data/lessonsData';

export const topic_20_1: SubLesson = {
  id: "20.1",
  title: 'E-Commerce Platform',
  status: 'completed',
  content: `# 🛒 Java Advanced Project: Full-Stack E-Commerce Platform

Build a complete e-commerce application with microservices architecture!

---

## 🎯 Project Overview

Create a scalable e-commerce platform with modern architecture and advanced features.

### **Features to Implement:**
- ✅ User authentication and authorization
- ✅ Product catalog with search and filtering
- ✅ Shopping cart and checkout system
- ✅ Order management and tracking
- ✅ Payment integration (Stripe/PayPal)
- ✅ Admin dashboard for inventory management
- ✅ Review and rating system
- ✅ Email notifications
- ✅ Docker containerization

---

## 🏗️ Architecture Overview

### **Microservices Architecture**
\`\`\`
ecommerce-platform/
├── api-gateway/           # API Gateway (Spring Cloud Gateway)
├── user-service/          # User management & authentication
├── product-service/       # Product catalog & inventory
├── order-service/         # Order processing & management
├── payment-service/       # Payment processing
├── notification-service/  # Email & SMS notifications
├── discovery-server/      # Service discovery (Eureka)
├── config-server/         # Configuration management
└── frontend/              # React/Angular SPA
\`\`\`

### **Technology Stack**
- **Backend**: Spring Boot, Spring Cloud, JPA
- **Database**: PostgreSQL, Redis (caching)
- **Message Queue**: RabbitMQ/Kafka
- **Frontend**: React with TypeScript
- **Deployment**: Docker, Kubernetes
- **Monitoring**: Spring Boot Actuator, Prometheus

---

## 🔧 Core Services Implementation

### **1. User Service**
\`\`\`java
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EventPublisher eventPublisher;

    @Autowired
    public UserService(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      JwtService jwtService,
                      EventPublisher eventPublisher) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.eventPublisher = eventPublisher;
    }

    public User registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(UserRole.CUSTOMER);

        User savedUser = userRepository.save(user);

        // Publish user registered event
        eventPublisher.publishEvent(new UserRegisteredEvent(savedUser));

        return savedUser;
    }

    public String authenticate(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return jwtService.generateToken(user);
    }

    public User getCurrentUser(String token) {
        String email = jwtService.extractUsername(token);
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}
\`\`\`

### **2. Product Service**
\`\`\`java
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stockQuantity;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImage> images;

    @Column(nullable = false)
    private boolean active = true;

    // Constructors, getters, setters
}

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Cacheable("products")
    public Page<Product> getProducts(ProductSearchCriteria criteria, Pageable pageable) {
        Specification<Product> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (criteria.getCategoryId() != null) {
                predicates.add(cb.equal(root.get("category").get("id"), criteria.getCategoryId()));
            }

            if (criteria.getMinPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), criteria.getMinPrice()));
            }

            if (criteria.getMaxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), criteria.getMaxPrice()));
            }

            if (criteria.getSearchTerm() != null) {
                String searchPattern = "%" + criteria.getSearchTerm().toLowerCase() + "%";
                predicates.add(cb.or(
                    cb.like(cb.lower(root.get("name")), searchPattern),
                    cb.like(cb.lower(root.get("description")), searchPattern)
                ));
            }

            predicates.add(cb.isTrue(root.get("active")));

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return productRepository.findAll(spec, pageable);
    }

    @CacheEvict(value = "products", allEntries = true)
    public Product createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(category);

        return productRepository.save(product);
    }

    public Product updateStock(Long productId, Integer quantityChange) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        int newQuantity = product.getStockQuantity() + quantityChange;
        if (newQuantity < 0) {
            throw new InsufficientStockException("Insufficient stock");
        }

        product.setStockQuantity(newQuantity);
        return productRepository.save(product);
    }
}
\`\`\`

### **3. Order Service**
\`\`\`java
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String orderNumber;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;

    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    private BigDecimal totalAmount;

    @Embedded
    private Address shippingAddress;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors, getters, setters
}

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EventPublisher eventPublisher;

    public Order createOrder(Long userId, CreateOrderRequest request) {
        User user = userService.getUserById(userId);

        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setUser(user);
        order.setShippingAddress(request.getShippingAddress());

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getItems()) {
            Product product = productService.getProductById(itemRequest.getProductId());

            if (product.getStockQuantity() < itemRequest.getQuantity()) {
                throw new InsufficientStockException("Insufficient stock for " + product.getName());
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());
            item.setPrice(product.getPrice());

            items.add(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setItems(items);
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        // Update product stock
        for (OrderItem item : items) {
            productService.updateStock(item.getProduct().getId(), -item.getQuantity());
        }

        eventPublisher.publishEvent(new OrderCreatedEvent(savedOrder));

        return savedOrder;
    }

    public Order processPayment(Long orderId, PaymentRequest paymentRequest) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new InvalidOrderStateException("Order is not in pending state");
        }

        // Process payment
        PaymentResult result = paymentService.processPayment(
            order.getTotalAmount(),
            paymentRequest.getPaymentMethod(),
            paymentRequest.getPaymentDetails()
        );

        if (result.isSuccess()) {
            order.setStatus(OrderStatus.CONFIRMED);
            eventPublisher.publishEvent(new OrderConfirmedEvent(order));
        } else {
            order.setStatus(OrderStatus.PAYMENT_FAILED);
        }

        return orderRepository.save(order);
    }

    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis() + "-" +
               String.format("%04d", new Random().nextInt(10000));
    }
}
\`\`\`

---

## 🔄 Event-Driven Architecture

### **Event Publishing**
\`\`\`java
@Service
public class EventPublisher {
    @Autowired
    private ApplicationEventPublisher publisher;

    public void publishEvent(Object event) {
        publisher.publishEvent(event);
    }
}

// Event listeners
@Component
public class OrderEventListener {
    @Autowired
    private NotificationService notificationService;

    @EventListener
    public void handleOrderCreated(OrderCreatedEvent event) {
        Order order = event.getOrder();
        notificationService.sendOrderConfirmationEmail(order);
    }

    @EventListener
    public void handleOrderConfirmed(OrderConfirmedEvent event) {
        Order order = event.getOrder();
        notificationService.sendOrderShippedEmail(order);
    }
}
\`\`\`

---

## 🔐 Security & Authentication

### **JWT Authentication Filter**
\`\`\`java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
\`\`\`

---

## 🧪 Testing Strategy

### **Unit Tests**
\`\`\`java
@SpringBootTest
public class OrderServiceTest {
    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Test
    public void testCreateOrder_Success() {
        // Given
        CreateOrderRequest request = createValidOrderRequest();
        User user = createTestUser();
        Product product = createTestProduct();

        when(userService.getUserById(1L)).thenReturn(user);
        when(productService.getProductById(1L)).thenReturn(product);
        when(orderRepository.save(any(Order.class))).thenAnswer(i -> i.getArgument(0));

        // When
        Order result = orderService.createOrder(1L, request);

        // Then
        assertNotNull(result);
        assertEquals(OrderStatus.PENDING, result.getStatus());
        assertNotNull(result.getOrderNumber());
        verify(orderRepository).save(any(Order.class));
    }

    @Test
    public void testCreateOrder_InsufficientStock() {
        // Given
        CreateOrderRequest request = createOrderRequestWithLargeQuantity();
        Product product = createTestProductWithLowStock();

        when(productService.getProductById(1L)).thenReturn(product);

        // When & Then
        assertThrows(InsufficientStockException.class, () ->
            orderService.createOrder(1L, request));
    }
}
\`\`\`

### **Integration Tests**
\`\`\`java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EcommerceIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testCompleteOrderFlow() {
        // 1. Register user
        UserRegistrationRequest userRequest = createUserRequest();
        ResponseEntity<UserResponse> userResponse = restTemplate.postForEntity(
            "/api/auth/register", userRequest, UserResponse.class);
        assertEquals(HttpStatus.CREATED, userResponse.getStatusCode());

        // 2. Login
        LoginRequest loginRequest = new LoginRequest(
            userRequest.getEmail(), userRequest.getPassword());
        ResponseEntity<AuthResponse> authResponse = restTemplate.postForEntity(
            "/api/auth/login", loginRequest, AuthResponse.class);
        assertEquals(HttpStatus.OK, authResponse.getStatusCode());

        String token = "Bearer " + authResponse.getBody().getToken();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);

        // 3. Create order
        CreateOrderRequest orderRequest = createOrderRequest();
        HttpEntity<CreateOrderRequest> orderEntity = new HttpEntity<>(orderRequest, headers);
        ResponseEntity<OrderResponse> orderResponse = restTemplate.postForEntity(
            "/api/orders", orderEntity, OrderResponse.class);
        assertEquals(HttpStatus.CREATED, orderResponse.getStatusCode());

        // 4. Process payment
        PaymentRequest paymentRequest = createPaymentRequest();
        HttpEntity<PaymentRequest> paymentEntity = new HttpEntity<>(paymentRequest, headers);
        ResponseEntity<OrderResponse> paymentResponse = restTemplate.exchange(
            "/api/orders/" + orderResponse.getBody().getId() + "/payment",
            HttpMethod.POST, paymentEntity, OrderResponse.class);
        assertEquals(HttpStatus.OK, paymentResponse.getStatusCode());
        assertEquals(OrderStatus.CONFIRMED, paymentResponse.getBody().getStatus());
    }
}
\`\`\`

---

## 🐳 Docker & Deployment

### **Docker Compose**
\`\`\`yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"

  discovery-service:
    build: ./discovery-server
    ports:
      - "8761:8761"

  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - discovery-service

  user-service:
    build: ./user-service
    ports:
      - "8081:8081"
    depends_on:
      - postgres
      - redis
      - discovery-service

  product-service:
    build: ./product-service
    ports:
      - "8082:8082"
    depends_on:
      - postgres
      - redis
      - discovery-service

  order-service:
    build: ./order-service
    ports:
      - "8083:8083"
    depends_on:
      - postgres
      - redis
      - rabbitmq
      - discovery-service
\`\`\`

---

## 📊 Monitoring & Observability

### **Spring Boot Actuator**
\`\`\`java
@Configuration
public class MonitoringConfig {
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config()
            .commonTags("application", "ecommerce-platform")
            .commonTags("version", "1.0.0");
    }
}

// Custom metrics
@Service
public class OrderMetricsService {
    private final Counter ordersCreated;
    private final Counter ordersConfirmed;
    private final Counter ordersCancelled;

    public OrderMetricsService(MeterRegistry registry) {
        this.ordersCreated = Counter.builder("orders.created")
            .description("Number of orders created")
            .register(registry);

        this.ordersConfirmed = Counter.builder("orders.confirmed")
            .description("Number of orders confirmed")
            .register(registry);

        this.ordersCancelled = Counter.builder("orders.cancelled")
            .description("Number of orders cancelled")
            .register(registry);
    }

    public void incrementOrdersCreated() {
        ordersCreated.increment();
    }

    public void incrementOrdersConfirmed() {
        ordersConfirmed.increment();
    }

    public void incrementOrdersCancelled() {
        ordersCancelled.increment();
    }
}
\`\`\`

---

## 🎯 Learning Outcomes

By completing this project, you'll master:

1. **Microservices Architecture** design and implementation
2. **Spring Cloud** ecosystem (Eureka, Gateway, Config)
3. **Event-Driven Architecture** with message queues
4. **Distributed Systems** concepts and patterns
5. **Database Design** for complex relationships
6. **Security** implementation with JWT
7. **Testing Strategies** for microservices
8. **Containerization** with Docker
9. **Monitoring & Observability** in production
10. **Scalability** and performance optimization

---

## 🚀 Advanced Features (Optional)

- 🔍 **Advanced Search**: Elasticsearch integration
- 📊 **Analytics Dashboard**: Real-time metrics with Grafana
- 🌐 **Multi-tenancy**: Support for multiple merchants
- 💳 **Multiple Payment Gateways**: Stripe, PayPal, Apple Pay
- 🌍 **Internationalization**: Multi-language support
- 📱 **Mobile Apps**: React Native companion apps
- 🤖 **AI Recommendations**: Product recommendations engine
- 📦 **Inventory Management**: Advanced stock tracking
- 📈 **A/B Testing**: Feature experimentation framework

---

## 🏆 Final Achievement

**Congratulations!** 🎉 You've built a production-ready, enterprise-grade e-commerce platform!

### **Skills Demonstrated:**
- **System Architecture** & Design
- **Microservices Development**
- **Database Design** & Optimization
- **Security Implementation**
- **API Design** & Documentation
- **Testing & Quality Assurance**
- **DevOps & Deployment**
- **Performance Monitoring**

This project showcases your ability to build complex, scalable software systems - a key requirement for senior software engineering roles! 🚀`
};

