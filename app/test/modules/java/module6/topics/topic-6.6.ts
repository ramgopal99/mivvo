import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: "6.6",
  title: 'When to Use Classes',
  status: 'completed',
  content: "`# ðŸŽ¯ When to Use Classes in Java

Knowing when to create classes and how to structure them effectively is crucial for building maintainable Java applications. Classes should represent meaningful abstractions and follow object-oriented design principles.

---

## ðŸ“‹ Identifying Class Candidates

### **Modeling Real-World Entities**
\`"\`\`java
// âœ… Good: Classes representing real-world entities
public class Customer {
    private String name;
    private String email;
    private String address;
    private java.util.Date registrationDate;

    // Customer-specific behavior
    public void updateEmail(String newEmail) { /* validation & update */ }
    public boolean isActive() { return true; }
    public void sendWelcomeEmail() { /* email logic */ }
}

public class Product {
    private String name;
    private double price;
    private int stockQuantity;
    private String category;

    // Product-specific behavior
    public void reduceStock(int amount) { /* inventory logic */ }
    public boolean isAvailable() { return stockQuantity > 0; }
    public double getDiscountedPrice(double discountPercent) { return price * (1 - discountPercent / 100); }
}

public class Order {
    private Customer customer;
    private java.util.List<OrderItem> items;
    private java.util.Date orderDate;
    private OrderStatus status;

    // Order-specific behavior
    public double getTotalAmount() { /* calculation logic */ }
    public void addItem(Product product, int quantity) { /* add logic */ }
    public void cancel() { /* cancellation logic */ }
}
\`\`\`

### **Encapsulating Related Data and Behavior**
\`\`\`java
// âœ… Good: Classes that group related functionality
public class EmailService {
    private String smtpHost;
    private int smtpPort;
    private String username;
    private String password;

    public EmailService(String smtpHost, int smtpPort, String username, String password) {
        this.smtpHost = smtpHost;
        this.smtpPort = smtpPort;
        this.username = username;
        this.password = password;
    }

    // All email-related functionality in one place
    public void sendEmail(String to, String subject, String body) {
        connectToSmtp();
        authenticate();
        sendMessage(to, subject, body);
        disconnect();
    }

    public boolean validateEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    private void connectToSmtp() { /* connection logic */ }
    private void authenticate() { /* auth logic */ }
    private void sendMessage(String to, String subject, String body) { /* send logic */ }
    private void disconnect() { /* cleanup logic */ }
}

public class DatabaseConnection {
    private java.sql.Connection connection;

    public DatabaseConnection(String url, String user, String password) {
        // Initialize connection
    }

    // Database operations encapsulated
    public void executeQuery(String sql) { /* query logic */ }
    public void executeUpdate(String sql) { /* update logic */ }
    public void close() { /* cleanup logic */ }
}
\`\`\`

---

## ðŸ—ï¸ Class Design Patterns

### **Data Transfer Objects (DTOs)**
\`\`\`java
// âœ… Good: DTOs for transferring data between layers
public class UserDTO {
    private final String id;
    private final String name;
    private final String email;
    private final boolean active;

    public UserDTO(String id, String name, String email, boolean active) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }

    // Only getters - immutable
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public boolean isActive() { return active; }

    // Factory method for easy creation
    public static UserDTO fromUser(User user) {
        return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.isActive());
    }
}

public class User {
    private String id;
    private String name;
    private String email;
    private boolean active;

    // Business logic entity
    public void updateEmail(String newEmail) {
        validateEmail(newEmail);
        this.email = newEmail;
        sendEmailVerification();
    }

    private void validateEmail(String email) { /* validation */ }
    private void sendEmailVerification() { /* email logic */ }

    // Getters and setters...
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public boolean isActive() { return active; }
}
\`\`\`

### **Service Classes**
\`\`\`java
// âœ… Good: Service classes for business logic
public class UserService {
    private UserRepository userRepository;
    private EmailService emailService;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailService emailService,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    // Business operations
    public User registerUser(String name, String email, String password) {
        validateRegistrationData(name, email, password);

        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(name, email, hashedPassword);

        userRepository.save(newUser);
        emailService.sendWelcomeEmail(newUser);

        return newUser;
    }

    public void changePassword(String userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId);
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Invalid old password");
        }

        String hashedNewPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedNewPassword);
        userRepository.save(user);
    }

    private void validateRegistrationData(String name, String email, String password) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (!emailService.validateEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password too short");
        }
    }
}

// Dependencies (interfaces for testability)
interface UserRepository {
    void save(User user);
    User findById(String id);
}

interface PasswordEncoder {
    String encode(String password);
    boolean matches(String rawPassword, String encodedPassword);
}
\`\`\`

### **Factory Classes**
\`\`\`java
// âœ… Good: Factory classes for object creation
public class DatabaseConnectionFactory {
    public static DatabaseConnection createMySQLConnection(String host, int port,
                                                         String database, String user, String password) {
        String url = "jdbc:mysql://" + host + ":" + port + "/" + database;
        return new DatabaseConnection(url, user, password);
    }

    public static DatabaseConnection createPostgreSQLConnection(String host, int port,
                                                              String database, String user, String password) {
        String url = "jdbc:postgresql://" + host + ":" + port + "/" + database;
        return new DatabaseConnection(url, user, password);
    }

    // Factory method with connection pooling
    public static PooledDatabaseConnection createPooledConnection(String type, String host, int port,
                                                                String database, String user, String password) {
        DatabaseConnection baseConnection = createConnection(type, host, port, database, user, password);
        return new PooledDatabaseConnection(baseConnection);
    }

    private static DatabaseConnection createConnection(String type, String host, int port,
                                                     String database, String user, String password) {
        switch (type.toLowerCase()) {
            case "mysql":
                return createMySQLConnection(host, port, database, user, password);
            case "postgresql":
                return createPostgreSQLConnection(host, port, database, user, password);
            default:
                throw new IllegalArgumentException("Unsupported database type: " + type);
        }
    }
}

class DatabaseConnection {
    String url, user, password;
    DatabaseConnection(String url, String user, String password) {
        this.url = url; this.user = user; this.password = password;
    }
}

class PooledDatabaseConnection extends DatabaseConnection {
    PooledDatabaseConnection(DatabaseConnection base) {
        super(base.url, base.user, base.password);
        // Add pooling logic
    }
}
\`\`\`

---

## ðŸš« When NOT to Use Classes

### **Avoid Classes for Simple Data**
\`\`\`java
// âŒ Bad: Class for simple data that has no behavior
class SimpleData {
    public String name;
    public int value;
    // No methods, just data
}

// âœ… Better: Use primitive types, arrays, or collections
String name = "John";
int value = 42;
String[] names = {"John", "Jane", "Bob"};
java.util.Map<String, Integer> dataMap = new java.util.HashMap<>();

// Or if you need to group related data, consider a record (Java 14+)
// record Person(String name, int age) {}  // Concise data class
\`\`\`

### **Avoid Over-Engineering**
\`\`\`java
// âŒ Bad: Unnecessarily complex class hierarchy
abstract class Animal {
    abstract void makeSound();
}

abstract class Mammal extends Animal {
    abstract void giveBirth();
}

class Dog extends Mammal {
    @Override
    void makeSound() { System.out.println("Woof"); }

    @Override
    void giveBirth() { System.out.println("Puppies"); }
}

// âœ… Better: Simple class when complexity isn't needed
class Dog {
    private String name;
    private String breed;

    public Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }

    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    public String getName() { return name; }
    public String getBreed() { return breed; }
}
\`\`\`

### **Avoid God Classes**
\`\`\`java
// âŒ Bad: God class that does everything
class ApplicationManager {
    // Database operations
    public void saveUser(User user) { }
    public User findUser(String id) { }

    // Email operations
    public void sendEmail(String to, String subject, String body) { }

    // File operations
    public void saveFile(String filename, byte[] data) { }
    public byte[] loadFile(String filename) { }

    // Business logic
    public void processOrder(Order order) { }
    public void calculateTaxes(double amount) { }

    // UI operations
    public void showMessage(String message) { }
    public void refreshUI() { }
}

// âœ… Better: Separate classes with single responsibilities
class UserService { /* user operations */ }
class EmailService { /* email operations */ }
class FileService { /* file operations */ }
class OrderProcessor { /* business logic */ }
class TaxCalculator { /* tax calculations */ }
class UIManager { /* UI operations */ }
\`\`\`

---

## ðŸŽ¯ Class Design Principles

### **Single Responsibility Principle (SRP)**
\`\`\`java
// âœ… Good: Each class has one reason to change
public class OrderValidator {
    public boolean isValidOrder(Order order) {
        return validateItems(order) && validateCustomer(order) && validatePayment(order);
    }

    private boolean validateItems(Order order) {
        return order.getItems() != null && !order.getItems().isEmpty();
    }

    private boolean validateCustomer(Order order) {
        return order.getCustomer() != null && order.getCustomer().isActive();
    }

    private boolean validatePayment(Order order) {
        return order.getPaymentMethod() != null && order.getPaymentMethod().isValid();
    }
}

public class OrderProcessor {
    public void processOrder(Order order) {
        if (!new OrderValidator().isValidOrder(order)) {
            throw new IllegalArgumentException("Invalid order");
        }
        // Process the order
    }
}

public class OrderRepository {
    public void save(Order order) {
        // Save to database
    }

    public Order findById(String id) {
        // Find from database
        return null;
    }
}
\`\`\`

### **Open/Closed Principle**
\`\`\`java
// âœ… Good: Classes open for extension, closed for modification
public interface PaymentProcessor {
    boolean processPayment(double amount);
}

public class CreditCardProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        // Credit card processing logic
        return true;
    }
}

public class PayPalProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        // PayPal processing logic
        return true;
    }
}

public class PaymentService {
    private PaymentProcessor processor;

    public PaymentService(PaymentProcessor processor) {
        this.processor = processor;
    }

    // Can work with any payment processor
    public boolean makePayment(double amount) {
        return processor.processPayment(amount);
    }
}

// Usage: Easy to add new payment methods without modifying existing code
public class NewBankTransferProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        // Bank transfer logic
        return true;
    }
}
\`\`\`

---

## ðŸ—ï¸ Class Organization Patterns

### **Package Organization**
\`\`\`java
// âœ… Good: Logical package structure
// com.mycompany.ecommerce
// â”œâ”€â”€ model/           // Data classes (User, Product, Order)
// â”‚   â”œâ”€â”€ User.java
// â”‚   â”œâ”€â”€ Product.java
// â”‚   â””â”€â”€ Order.java
// â”œâ”€â”€ service/         // Business logic classes
// â”‚   â”œâ”€â”€ UserService.java
// â”‚   â”œâ”€â”€ ProductService.java
// â”‚   â””â”€â”€ OrderService.java
// â”œâ”€â”€ repository/      // Data access classes
// â”‚   â”œâ”€â”€ UserRepository.java
// â”‚   â”œâ”€â”€ ProductRepository.java
// â”‚   â””â”€â”€ OrderRepository.java
// â”œâ”€â”€ controller/      // API/Web classes
// â”‚   â”œâ”€â”€ UserController.java
// â”‚   â””â”€â”€ ProductController.java
// â””â”€â”€ util/           // Utility classes
//     â”œâ”€â”€ EmailUtils.java
//     â””â”€â”€ ValidationUtils.java

// Example classes
package com.mycompany.ecommerce.model;

public class User {
    private String id;
    private String name;
    private String email;

    // Constructor, getters, setters
}

package com.mycompany.ecommerce.service;

public class UserService {
    private UserRepository userRepository;

    public User createUser(String name, String email) {
        // Business logic
        User user = new User(name, email);
        return userRepository.save(user);
    }
}

package com.mycompany.ecommerce.repository;

public interface UserRepository {
    User save(User user);
    User findById(String id);
}
\`\`\`

### **Class Relationships**
\`\`\`java
// âœ… Good: Clear class relationships
public class University {
    private String name;
    private java.util.List<Department> departments;

    public University(String name) {
        this.name = name;
        this.departments = new java.util.ArrayList<>();
    }

    public void addDepartment(Department dept) {
        departments.add(dept);
    }

    public java.util.List<Department> getDepartments() {
        return new java.util.ArrayList<>(departments); // Defensive copy
    }
}

public class Department {
    private String name;
    private Professor head;
    private java.util.List<Course> courses;

    public Department(String name, Professor head) {
        this.name = name;
        this.head = head;
        this.courses = new java.util.ArrayList<>();
    }

    // Methods...
}

public class Professor {
    private String name;
    private String department;
    private String employeeId;

    // Methods...
}

public class Course {
    private String code;
    private String name;
    private Professor instructor;
    private int credits;

    // Methods...
}
\`\`\`

---

## ðŸŽ¯ Decision Framework for Class Creation

### **Questions to Ask**
\`\`\`java
public class ClassCreationDecision {
    // 1. Does this represent a meaningful concept?
    //    - Real-world entity (Customer, Product, Order)
    //    - Business concept (Account, Transaction, Policy)
    //    - Technical concept (Connection, Cache, Validator)

    // 2. Does it have both data AND behavior?
    // âœ… Good: Classes with both
    public class CustomerService {
        private CustomerRepository repository;

        public Customer createCustomer(String name, String email) {
            validateCustomerData(name, email);
            Customer customer = new Customer(name, email);
            return repository.save(customer);
        }

        private void validateCustomerData(String name, String email) {
            // Validation logic
        }
    }

    // âŒ Bad: Classes with only data
    public class CustomerData {
        public String name;
        public String email;
        // No behavior - just data
    }

    // âŒ Bad: Classes with only behavior (should be methods in other classes)
    public class StringUtils {
        public static String capitalize(String s) { return s.toUpperCase(); }
        public static boolean isEmpty(String s) { return s == null || s.isEmpty(); }
        // Only static utility methods
    }

    // 3. Does it follow single responsibility?
    // âœ… Good: One clear purpose
    public class EmailService {
        public void sendWelcomeEmail(User user) { }
        public void sendPasswordResetEmail(User user) { }
        // Only email-related functionality
    }

    // âŒ Bad: Multiple responsibilities
    public class UserManager {
        public void createUser(User user) { }
        public void sendEmail(String to, String subject, String body) { }
        public void saveToDatabase(Object obj) { }
        // Too many different responsibilities
    }

    // 4. Will it be instantiated multiple times?
    // âœ… Good: Regular classes for multiple instances
    public class ShoppingCart {
        private java.util.List<Item> items = new java.util.ArrayList<>();

        public void addItem(Item item) { items.add(item); }
        public double getTotal() { return items.stream().mapToDouble(Item::getPrice).sum(); }
    }

    // âœ… Good: Singleton pattern for single instance
    public class ConfigurationManager {
        private static ConfigurationManager instance;
        private java.util.Properties config;

        private ConfigurationManager() {
            config = loadConfiguration();
        }

        public static ConfigurationManager getInstance() {
            if (instance == null) {
                instance = new ConfigurationManager();
            }
            return instance;
        }

        private java.util.Properties loadConfiguration() {
            // Load config logic
            return new java.util.Properties();
        }
    }

    // 5. Does it need to be extended or customized?
    // âœ… Good: Non-final classes for inheritance
    public class BaseService {
        protected void logOperation(String operation) {
            System.out.println("Operation: " + operation);
        }
    }

    // âœ… Good: Abstract classes for partial implementation
    public abstract class Shape {
        protected String color;

        public Shape(String color) {
            this.color = color;
        }

        public abstract double getArea();

        public String getColor() { return color; }
    }
}

class CustomerRepository {
    Customer save(Customer customer) { return customer; }
}

class Customer {
    String name, email;
    Customer(String name, String email) { this.name = name; this.email = email; }
}

class Item {
    double price;
    double getPrice() { return price; }
}
\`\`\`

### **Class Creation Checklist**
\`\`\`java
public class ClassChecklist {
    /*
    âœ… CLASS CREATION CHECKLIST:

    1. Purpose & Responsibility
       - Does it represent a clear, single concept?
       - Does it have a well-defined responsibility?

    2. Data & Behavior
       - Does it encapsulate related data?
       - Does it provide meaningful behavior for that data?
       - Is the behavior cohesive?

    3. Interface Design
       - Does it expose a clean, minimal public API?
       - Are access modifiers appropriate?
       - Is encapsulation maintained?

    4. Dependencies
       - Does it follow dependency inversion principle?
       - Are dependencies injected rather than created internally?
       - Can it be easily tested?

    5. Extensibility
       - Should it be open for extension?
       - Should it be closed for modification?
       - Does it follow Liskov substitution principle?

    6. Lifecycle
       - How many instances will exist?
       - Should it be immutable?
       - Does it need cleanup/disposal?

    7. Naming & Documentation
       - Is the name clear and descriptive?
       - Are methods and fields well-named?
       - Is the class properly documented?

    8. Performance & Memory
       - Does it create unnecessary objects?
       - Are there memory leaks?
       - Is it thread-safe if needed?

    EXAMPLES OF GOOD CLASSES:
    - Customer, Product, Order (business entities)
    - CustomerService, OrderProcessor (business services)
    - EmailService, DatabaseConnection (technical services)
    - ArrayList, HashMap (data structures)
    - FileInputStream, BufferedReader (I/O utilities)

    EXAMPLES OF BAD CLASSES:
    - God classes with too many responsibilities
    - Data-only classes (use records or tuples)
    - Classes with only static methods (use utility classes)
    - Classes that mix UI, business logic, and data access
    */
}
\`\`\`

Classes are the fundamental building blocks of Java applications. Use them to model meaningful concepts with clear responsibilities, proper encapsulation, and well-designed interfaces. Always consider the broader architectural context and follow established design principles! ðŸŽ¯`
};




