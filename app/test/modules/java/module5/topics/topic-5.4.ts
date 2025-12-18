import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_4: SubLesson = {
  id: "5.4",
  title: 'Return Values',
  status: 'completed',
  content: `# ↩️ Return Values in Java Methods

Return values allow methods to communicate results back to their callers. Understanding how to properly return values, handle different return types, and design methods with appropriate return behaviors is crucial for effective Java programming.

---

## 📋 Return Type Declaration

### **Void Methods (No Return)**
\`\`\`java
public class VoidMethods {
    // Void methods perform actions but don't return values
    public void displayMessage(String message) {
        System.out.println("Message: " + message);
    }

    public void logEvent(String event, long timestamp) {
        System.out.println("[" + timestamp + "] " + event);
    }

    public void clearScreen() {
        for (int i = 0; i < 50; i++) {
            System.out.println();
        }
    }

    // Void methods can still have side effects
    private java.util.List<String> messages = new java.util.ArrayList<>();

    public void addMessage(String message) {
        messages.add(message);  // Side effect: modifies object state
        System.out.println("Message added: " + message);
    }

    public static void main(String[] args) {
        VoidMethods obj = new VoidMethods();

        obj.displayMessage("Hello World");
        obj.logEvent("User login", System.currentTimeMillis());
        obj.addMessage("First message");
        obj.addMessage("Second message");
    }
}
\`\`\`

### **Primitive Return Types**
\`\`\`java
public class PrimitiveReturns {
    // Integer return types
    public int getAge() {
        return 25;
    }

    public int addNumbers(int a, int b) {
        return a + b;
    }

    // Double return types
    public double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }

    public double getAverage(int[] numbers) {
        if (numbers.length == 0) return 0.0;
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    // Boolean return types
    public boolean isEven(int number) {
        return number % 2 == 0;
    }

    public boolean isValidEmail(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    // Character return types
    public char getFirstLetter(String text) {
        if (text == null || text.isEmpty()) {
            return '\0';  // Null character
        }
        return text.charAt(0);
    }

    public static void main(String[] args) {
        PrimitiveReturns obj = new PrimitiveReturns();

        System.out.println("Age: " + obj.getAge());
        System.out.println("Sum: " + obj.addNumbers(10, 20));
        System.out.println("Area: " + obj.calculateArea(5.0));
        System.out.println("Average: " + obj.getAverage(new int[]{1, 2, 3, 4, 5}));
        System.out.println("Is 4 even? " + obj.isEven(4));
        System.out.println("Valid email: " + obj.isValidEmail("user@example.com"));
        System.out.println("First letter: " + obj.getFirstLetter("Hello"));
    }
}
\`\`\`

---

## 📦 Reference Return Types

### **Object Return Types**
\`\`\`java
public class ObjectReturns {
    // String return types
    public String getGreeting(String name) {
        return "Hello, " + name + "!";
    }

    public String formatUserInfo(String name, int age) {
        return String.format("User: %s, Age: %d", name, age);
    }

    // Custom object return types
    public User createUser(String name, String email) {
        return new User(name, email);
    }

    public java.util.List<String> getNames() {
        return java.util.Arrays.asList("Alice", "Bob", "Charlie");
    }

    public java.util.Map<String, Integer> getScores() {
        java.util.Map<String, Integer> scores = new java.util.HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        return scores;
    }

    public static void main(String[] args) {
        ObjectReturns obj = new ObjectReturns();

        System.out.println(obj.getGreeting("Alice"));
        System.out.println(obj.formatUserInfo("Bob", 25));

        User user = obj.createUser("Charlie", "charlie@example.com");
        System.out.println("Created user: " + user.getName());

        java.util.List<String> names = obj.getNames();
        System.out.println("Names: " + names);

        java.util.Map<String, Integer> scores = obj.getScores();
        System.out.println("Scores: " + scores);
    }

    static class User {
        private String name;
        private String email;

        public User(String name, String email) {
            this.name = name;
            this.email = email;
        }

        public String getName() { return name; }
        public String getEmail() { return email; }

        @Override
        public String toString() {
            return name + " (" + email + ")";
        }
    }
}
\`\`\`

### **Array Return Types**
\`\`\`java
public class ArrayReturns {
    // Primitive array returns
    public int[] getEvenNumbers(int count) {
        int[] result = new int[count];
        for (int i = 0; i < count; i++) {
            result[i] = (i + 1) * 2;  // 2, 4, 6, 8, ...
        }
        return result;
    }

    // Object array returns
    public String[] getDaysOfWeek() {
        return new String[]{"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
    }

    // Multi-dimensional array returns
    public int[][] getMultiplicationTable(int size) {
        int[][] table = new int[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                table[i][j] = (i + 1) * (j + 1);
            }
        }
        return table;
    }

    public static void main(String[] args) {
        ArrayReturns obj = new ArrayReturns();

        int[] evens = obj.getEvenNumbers(5);
        System.out.println("Even numbers: " + java.util.Arrays.toString(evens));

        String[] days = obj.getDaysOfWeek();
        System.out.println("Days: " + java.util.Arrays.toString(days));

        int[][] table = obj.getMultiplicationTable(3);
        System.out.println("Multiplication table:");
        for (int[] row : table) {
            System.out.println(java.util.Arrays.toString(row));
        }
    }
}
\`\`\`

---

## 🔄 Return Statement Patterns

### **Single Return vs Multiple Returns**
\`\`\`java
public class ReturnPatterns {
    // ✅ Single return point (traditional style)
    public String getGradeDescription(int score) {
        String description;

        if (score >= 90) {
            description = "Excellent";
        } else if (score >= 80) {
            description = "Good";
        } else if (score >= 70) {
            description = "Average";
        } else if (score >= 60) {
            description = "Below Average";
        } else {
            description = "Poor";
        }

        return description;  // Single return point
    }

    // ✅ Multiple return points (modern style)
    public String getGradeDescriptionModern(int score) {
        if (score >= 90) {
            return "Excellent";  // Early return
        } else if (score >= 80) {
            return "Good";
        } else if (score >= 70) {
            return "Average";
        } else if (score >= 60) {
            return "Below Average";
        } else {
            return "Poor";
        }
    }

    // Guard clauses with early returns
    public double divideNumbers(double dividend, double divisor) {
        if (divisor == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }

        return dividend / divisor;
    }

    public static void main(String[] args) {
        ReturnPatterns obj = new ReturnPatterns();

        System.out.println("Score 85: " + obj.getGradeDescription(85));
        System.out.println("Score 85 (modern): " + obj.getGradeDescriptionModern(85));

        try {
            System.out.println("Division result: " + obj.divideNumbers(10, 2));
            // System.out.println(obj.divideNumbers(10, 0));  // Would throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Returning null vs Optional**
\`\`\`java
public class NullVsOptional {
    // ❌ Traditional approach: can return null
    public String findUserById(String userId) {
        // Simulate database lookup
        if ("123".equals(userId)) {
            return "John Doe";
        }
        return null;  // Problematic - caller must check for null
    }

    // ✅ Better approach: use Optional
    public java.util.Optional<String> findUserByIdSafe(String userId) {
        // Simulate database lookup
        if ("123".equals(userId)) {
            return java.util.Optional.of("John Doe");
        }
        return java.util.Optional.empty();  // Explicit absence
    }

    // ✅ For collections: return empty collection instead of null
    public java.util.List<String> getUserRoles(String userId) {
        if ("admin".equals(userId)) {
            return java.util.Arrays.asList("read", "write", "delete");
        }
        return new java.util.ArrayList<>();  // Return empty list, not null
    }

    public static void main(String[] args) {
        NullVsOptional obj = new NullVsOptional();

        // Dangerous null handling
        String user1 = obj.findUserById("123");
        if (user1 != null) {
            System.out.println("Found user: " + user1);
        }

        String user2 = obj.findUserById("999");
        if (user2 != null) {
            System.out.println("Found user: " + user2);
        } else {
            System.out.println("User not found");
        }

        // Safe Optional handling
        java.util.Optional<String> user3 = obj.findUserByIdSafe("123");
        user3.ifPresent(name -> System.out.println("Safe find: " + name));

        java.util.Optional<String> user4 = obj.findUserByIdSafe("999");
        String result = user4.orElse("Unknown User");
        System.out.println("Safe result: " + result);

        // Safe collection handling
        java.util.List<String> roles = obj.getUserRoles("admin");
        System.out.println("Admin roles: " + roles);

        java.util.List<String> noRoles = obj.getUserRoles("guest");
        System.out.println("Guest roles: " + noRoles);  // Empty list, not null
    }
}
\`\`\`

---

## 🎯 Return Value Best Practices

### **Consistent Return Types**
\`\`\`java
public class ReturnConsistency {
    // ✅ Good: Consistent return types for similar methods
    public String getUserName() { return "John"; }
    public String getUserEmail() { return "john@example.com"; }
    public String getUserRole() { return "admin"; }

    // ✅ Good: Use wrapper types for primitive operations that might fail
    public Integer parseInteger(String input) {
        try {
            return Integer.parseInt(input);
        } catch (NumberFormatException e) {
            return null;  // Or use Optional<Integer>
        }
    }

    // ❌ Bad: Inconsistent return types
    // public String getUserInfo() { return "John"; }
    // public int getUserAge() { return 25; }
    // public boolean isUserActive() { return true; }
    // public java.util.Date getUserCreatedDate() { return new java.util.Date(); }

    // ✅ Better: Use consistent object returns
    public UserInfo getUserInfo() {
        return new UserInfo("John", 25, true, new java.util.Date());
    }

    static class UserInfo {
        String name;
        int age;
        boolean active;
        java.util.Date createdDate;

        UserInfo(String name, int age, boolean active, java.util.Date createdDate) {
            this.name = name;
            this.age = age;
            this.active = active;
            this.createdDate = createdDate;
        }

        // Getters...
    }
}
\`\`\`

### **Immutable Return Values**
\`\`\`java
public class ImmutableReturns {
    private java.util.List<String> internalList = new java.util.ArrayList<>();

    // ❌ Bad: Returns mutable internal state
    public java.util.List<String> getItems() {
        return internalList;  // Caller can modify internal state!
    }

    // ✅ Good: Return defensive copy
    public java.util.List<String> getItemsSafely() {
        return new java.util.ArrayList<>(internalList);
    }

    // ✅ Better: Return unmodifiable view
    public java.util.List<String> getItemsUnmodifiable() {
        return java.util.Collections.unmodifiableList(internalList);
    }

    // For arrays: return copy
    private int[] data = {1, 2, 3, 4, 5};

    public int[] getData() {
        return data.clone();  // Return copy, not original
    }

    public static void main(String[] args) {
        ImmutableReturns obj = new ImmutableReturns();
        obj.internalList.add("item1");
        obj.internalList.add("item2");

        // Safe access
        java.util.List<String> safeList = obj.getItemsSafely();
        safeList.add("new item");  // Modifies copy, not original
        System.out.println("Original list: " + obj.internalList);
        System.out.println("Modified copy: " + safeList);

        // Unmodifiable access
        java.util.List<String> unmodifiableList = obj.getItemsUnmodifiable();
        try {
            unmodifiableList.add("new item");  // Throws exception
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable list");
        }
    }
}
\`\`\`

---

## 🔄 Advanced Return Patterns

### **Builder Pattern for Complex Returns**
\`\`\`java
public class BuilderPatternReturns {
    public User buildUser(String name, String email) {
        return User.builder()
            .name(name)
            .email(email)
            .active(true)
            .createdAt(java.time.LocalDateTime.now())
            .build();
    }

    static class User {
        private String name;
        private String email;
        private boolean active;
        private java.time.LocalDateTime createdAt;

        private User(Builder builder) {
            this.name = builder.name;
            this.email = builder.email;
            this.active = builder.active;
            this.createdAt = builder.createdAt;
        }

        public static Builder builder() {
            return new Builder();
        }

        static class Builder {
            private String name;
            private String email;
            private boolean active = true;
            private java.time.LocalDateTime createdAt;

            public Builder name(String name) {
                this.name = name;
                return this;
            }

            public Builder email(String email) {
                this.email = email;
                return this;
            }

            public Builder active(boolean active) {
                this.active = active;
                return this;
            }

            public Builder createdAt(java.time.LocalDateTime createdAt) {
                this.createdAt = createdAt;
                return this;
            }

            public User build() {
                if (name == null || email == null) {
                    throw new IllegalStateException("Name and email are required");
                }
                return new User(this);
            }
        }

        @Override
        public String toString() {
            return "User{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                ", createdAt=" + createdAt +
                '}';
        }
    }

    public static void main(String[] args) {
        BuilderPatternReturns obj = new BuilderPatternReturns();
        User user = obj.buildUser("Alice", "alice@example.com");
        System.out.println("Built user: " + user);
    }
}
\`\`\`

### **Factory Methods**
\`\`\`java
public class FactoryMethodReturns {
    // Factory method pattern
    public static Shape createCircle(double radius) {
        return new Circle(radius);
    }

    public static Shape createRectangle(double width, double height) {
        return new Rectangle(width, height);
    }

    public static Shape createShape(String type, double... params) {
        switch (type.toLowerCase()) {
            case "circle":
                return createCircle(params[0]);
            case "rectangle":
                return createRectangle(params[0], params[1]);
            default:
                throw new IllegalArgumentException("Unknown shape type: " + type);
        }
    }

    // Abstract factory
    public static DatabaseConnection createConnection(String type) {
        switch (type.toLowerCase()) {
            case "mysql":
                return new MySQLConnection();
            case "postgresql":
                return new PostgreSQLConnection();
            default:
                throw new IllegalArgumentException("Unsupported database type: " + type);
        }
    }

    // Interface and implementations
    interface Shape {
        double getArea();
        double getPerimeter();
    }

    static class Circle implements Shape {
        private double radius;

        Circle(double radius) { this.radius = radius; }

        public double getArea() { return Math.PI * radius * radius; }
        public double getPerimeter() { return 2 * Math.PI * radius; }
    }

    static class Rectangle implements Shape {
        private double width, height;

        Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }

        public double getArea() { return width * height; }
        public double getPerimeter() { return 2 * (width + height); }
    }

    interface DatabaseConnection {
        void connect();
        void disconnect();
    }

    static class MySQLConnection implements DatabaseConnection {
        public void connect() { System.out.println("Connected to MySQL"); }
        public void disconnect() { System.out.println("Disconnected from MySQL"); }
    }

    static class PostgreSQLConnection implements DatabaseConnection {
        public void connect() { System.out.println("Connected to PostgreSQL"); }
        public void disconnect() { System.out.println("Disconnected from PostgreSQL"); }
    }

    public static void main(String[] args) {
        // Using factory methods
        Shape circle = createCircle(5.0);
        Shape rectangle = createRectangle(10, 20);
        Shape shapeFromString = createShape("circle", 3.0);

        System.out.println("Circle area: " + circle.getArea());
        System.out.println("Rectangle area: " + rectangle.getArea());
        System.out.println("Shape from string area: " + shapeFromString.getArea());

        // Database connections
        DatabaseConnection mysql = createConnection("mysql");
        mysql.connect();
        mysql.disconnect();
    }
}
\`\`\`

---

## 🎯 Return Value Design Guidelines

### **1. Prefer Specific Return Types**
\`\`\`java
public class SpecificReturnTypes {
    // ✅ Good: Specific return types
    public java.util.List<String> getActiveUsers() {
        // Return concrete type that matches the contract
        return new java.util.ArrayList<>();
    }

    // ❌ Bad: Overly general return types
    // public java.util.Collection getActiveUsers() { ... }  // Too vague

    // ✅ Good: Use interfaces for flexibility
    public java.util.Set<String> getUserRoles() {
        // Can return HashSet, TreeSet, etc.
        return new java.util.HashSet<>();
    }

    // ✅ Good: Use Optional for nullable returns
    public java.util.Optional<String> findUserEmail(String userId) {
        // Explicitly indicates possibility of absence
        return java.util.Optional.empty();
    }
}
\`\`\`

### **2. Document Return Value Behavior**
\`\`\`java
public class ReturnDocumentation {
    /**
     * Finds a user by their ID.
     *
     * @param userId the unique identifier of the user
     * @return an Optional containing the user name if found,
     *         or empty Optional if no user exists with the given ID
     */
    public java.util.Optional<String> findUser(String userId) {
        // Implementation
        return java.util.Optional.empty();
    }

    /**
     * Gets all users in the system.
     *
     * @return an unmodifiable list of user names.
     *         Changes to the returned list are not reflected in the system.
     */
    public java.util.List<String> getAllUsers() {
        // Return unmodifiable view
        return java.util.Collections.unmodifiableList(new java.util.ArrayList<>());
    }

    /**
     * Processes a payment and returns the transaction result.
     *
     * @param amount the payment amount (must be positive)
     * @param cardNumber the credit card number
     * @return a PaymentResult indicating success or failure with details
     * @throws IllegalArgumentException if amount is not positive
     */
    public PaymentResult processPayment(double amount, String cardNumber) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        // Process payment...
        return new PaymentResult(true, "Payment successful");
    }

    static class PaymentResult {
        boolean success;
        String message;

        PaymentResult(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
    }
}
\`\`\`

### **3. Consider Performance Implications**
\`\`\`java
public class PerformanceConsiderations {
    // ✅ Good: Lazy evaluation for expensive operations
    private java.util.List<String> cachedUsers = null;

    public java.util.List<String> getUsers() {
        if (cachedUsers == null) {
            // Expensive operation only performed when needed
            cachedUsers = loadUsersFromDatabase();
        }
        return new java.util.ArrayList<>(cachedUsers);  // Return copy
    }

    // ✅ Good: Streaming for large datasets
    public java.util.stream.Stream<String> getUserStream() {
        // Return stream for lazy processing
        return loadUsersFromDatabase().stream();
    }

    private java.util.List<String> loadUsersFromDatabase() {
        // Simulate expensive database operation
        System.out.println("Loading users from database...");
        return java.util.Arrays.asList("Alice", "Bob", "Charlie");
    }

    public static void main(String[] args) {
        PerformanceConsiderations obj = new PerformanceConsiderations();

        // First call loads from database
        java.util.List<String> users1 = obj.getUsers();
        System.out.println("Users: " + users1);

        // Second call uses cache
        java.util.List<String> users2 = obj.getUsers();
        System.out.println("Cached users: " + users2);

        // Stream processing
        long userCount = obj.getUserStream()
            .filter(name -> name.length() > 3)
            .count();
        System.out.println("Users with name > 3 chars: " + userCount);
    }
}
\`\`\`

Return values are a critical part of method design. Choosing appropriate return types, ensuring immutability when needed, and providing clear documentation leads to robust and usable APIs! ↩️`
};



