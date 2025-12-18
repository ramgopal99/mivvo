import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_6: SubLesson = {
  id: "5.6",
  title: 'When to Use Methods',
  status: 'completed',
  content: `# 🎯 When to Use Methods in Java

Knowing when and how to create methods is crucial for writing clean, maintainable, and efficient Java code. Methods should be used strategically to improve code organization, reusability, and readability.

---

## 📋 Code Organization Principles

### **Single Responsibility Principle**
\`\`\`java
public class SingleResponsibility {
    // ❌ Bad: One method doing too many things
    public void processUserRegistration(String name, String email, String password) {
        // Validate input
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password too short");
        }

        // Hash password (should be separate)
        String hashedPassword = hashPassword(password);

        // Save to database (should be separate)
        saveToDatabase(name, email, hashedPassword);

        // Send email (should be separate)
        sendWelcomeEmail(email);

        // Log activity (should be separate)
        logRegistration(name, email);
    }

    // ✅ Good: Break into focused methods
    public void processUserRegistration(String name, String email, String password) {
        validateRegistrationInput(name, email, password);
        String hashedPassword = hashPassword(password);
        saveToDatabase(name, email, hashedPassword);
        sendWelcomeEmail(email);
        logRegistration(name, email);
    }

    private void validateRegistrationInput(String name, String email, String password) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password too short");
        }
    }

    private String hashPassword(String password) {
        // Password hashing logic
        return "hashed_" + password; // Simplified
    }

    private void saveToDatabase(String name, String email, String hashedPassword) {
        System.out.println("Saving user to database: " + name);
    }

    private void sendWelcomeEmail(String email) {
        System.out.println("Sending welcome email to: " + email);
    }

    private void logRegistration(String name, String email) {
        System.out.println("User registered: " + name + " (" + email + ")");
    }

    public static void main(String[] args) {
        SingleResponsibility obj = new SingleResponsibility();
        try {
            obj.processUserRegistration("Alice", "alice@example.com", "password123");
        } catch (IllegalArgumentException e) {
            System.out.println("Registration failed: " + e.getMessage());
        }
    }
}
\`\`\`

### **DRY (Don't Repeat Yourself) Principle**
\`\`\`java
public class DRYPrinciple {
    // ❌ Bad: Code duplication
    public void printReport1() {
        System.out.println("=== Report Header ===");
        System.out.println("Generated on: " + java.time.LocalDateTime.now());
        System.out.println("Company: ABC Corp");
        System.out.println("====================");

        System.out.println("Report 1 Data:");
        System.out.println("Total sales: $50,000");
        System.out.println("Total customers: 150");
    }

    public void printReport2() {
        System.out.println("=== Report Header ===");
        System.out.println("Generated on: " + java.time.LocalDateTime.now());
        System.out.println("Company: ABC Corp");
        System.out.println("====================");

        System.out.println("Report 2 Data:");
        System.out.println("Total orders: 300");
        System.out.println("Total revenue: $75,000");
    }

    // ✅ Good: Extract common functionality
    public void printReport1() {
        printReportHeader();
        System.out.println("Report 1 Data:");
        System.out.println("Total sales: $50,000");
        System.out.println("Total customers: 150");
    }

    public void printReport2() {
        printReportHeader();
        System.out.println("Report 2 Data:");
        System.out.println("Total orders: 300");
        System.out.println("Total revenue: $75,000");
    }

    private void printReportHeader() {
        System.out.println("=== Report Header ===");
        System.out.println("Generated on: " + java.time.LocalDateTime.now());
        System.out.println("Company: ABC Corp");
        System.out.println("====================");
    }

    public static void main(String[] args) {
        DRYPrinciple obj = new DRYPrinciple();
        obj.printReport1();
        System.out.println();
        obj.printReport2();
    }
}
\`\`\`

---

## 🔧 Method Granularity Guidelines

### **Method Length Guidelines**
\`\`\`java
public class MethodLength {
    // ✅ Good: Short, focused methods (5-15 lines)
    public boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return email.contains("@") && email.contains(".");
    }

    public double calculateAverage(int[] numbers) {
        if (numbers.length == 0) {
            return 0.0;
        }
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    // ❌ Bad: Too long method (should be broken down)
    // public void processLargeDataset() {
    //     // 50+ lines of mixed logic
    //     loadData();
    //     validateData();
    //     processData();
    //     saveResults();
    //     sendNotifications();
    //     cleanup();
    // }

    // ✅ Better: Break into smaller methods
    public void processLargeDataset() {
        DataSet data = loadData();
        validateData(data);
        ProcessedData results = processData(data);
        saveResults(results);
        sendNotifications(results);
        cleanup();
    }

    private DataSet loadData() {
        System.out.println("Loading data...");
        return new DataSet();
    }

    private void validateData(DataSet data) {
        System.out.println("Validating data...");
    }

    private ProcessedData processData(DataSet data) {
        System.out.println("Processing data...");
        return new ProcessedData();
    }

    private void saveResults(ProcessedData results) {
        System.out.println("Saving results...");
    }

    private void sendNotifications(ProcessedData results) {
        System.out.println("Sending notifications...");
    }

    private void cleanup() {
        System.out.println("Cleaning up...");
    }

    static class DataSet { }
    static class ProcessedData { }

    public static void main(String[] args) {
        MethodLength obj = new MethodLength();
        System.out.println("Email valid: " + obj.isValidEmail("user@example.com"));
        System.out.println("Average: " + obj.calculateAverage(new int[]{1, 2, 3, 4, 5}));
        obj.processLargeDataset();
    }
}
\`\`\`

### **Method Complexity**
\`\`\`java
public class MethodComplexity {
    // ✅ Good: Simple, linear logic
    public int findMax(int[] numbers) {
        if (numbers.length == 0) {
            throw new IllegalArgumentException("Array cannot be empty");
        }

        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        return max;
    }

    // ❌ Bad: High cyclomatic complexity (too many decision points)
    // public void complexLogic(int a, int b, int c, boolean flag) {
    //     if (a > 0) {
    //         if (b > 0) {
    //             if (c > 0) {
    //                 if (flag) {
    //                     // Deep nesting
    //                 }
    //             }
    //         }
    //     }
    // }

    // ✅ Better: Extract methods to reduce complexity
    public void processData(int a, int b, int c, boolean flag) {
        if (!areAllPositive(a, b, c)) {
            throw new IllegalArgumentException("All values must be positive");
        }

        if (flag) {
            processWithFlag(a, b, c);
        } else {
            processWithoutFlag(a, b, c);
        }
    }

    private boolean areAllPositive(int... values) {
        for (int value : values) {
            if (value <= 0) {
                return false;
            }
        }
        return true;
    }

    private void processWithFlag(int a, int b, int c) {
        System.out.println("Processing with flag: " + a + ", " + b + ", " + c);
    }

    private void processWithoutFlag(int a, int b, int c) {
        System.out.println("Processing without flag: " + a + ", " + b + ", " + c);
    }

    public static void main(String[] args) {
        MethodComplexity obj = new MethodComplexity();

        int[] numbers = {3, 1, 4, 1, 5, 9, 2, 6};
        System.out.println("Max value: " + obj.findMax(numbers));

        try {
            obj.processData(1, 2, 3, true);
            obj.processData(1, 2, 3, false);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🎯 Method Design Patterns

### **Command Pattern**
\`\`\`java
public class CommandPattern {
    // Use methods to encapsulate actions
    public void executeUserAction(String action, User user) {
        switch (action.toLowerCase()) {
            case "login":
                loginUser(user);
                break;
            case "logout":
                logoutUser(user);
                break;
            case "update":
                updateUserProfile(user);
                break;
            default:
                throw new IllegalArgumentException("Unknown action: " + action);
        }
    }

    private void loginUser(User user) {
        System.out.println("Logging in user: " + user.getName());
        // Login logic
    }

    private void logoutUser(User user) {
        System.out.println("Logging out user: " + user.getName());
        // Logout logic
    }

    private void updateUserProfile(User user) {
        System.out.println("Updating profile for: " + user.getName());
        // Update logic
    }

    static class User {
        private String name;

        public User(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public static void main(String[] args) {
        CommandPattern obj = new CommandPattern();
        User user = new User("Alice");

        obj.executeUserAction("login", user);
        obj.executeUserAction("update", user);
        obj.executeUserAction("logout", user);
    }
}
\`\`\`

### **Factory Pattern**
\`\`\`java
public class FactoryPattern {
    // Use methods to create objects
    public Shape createShape(String type, double... params) {
        switch (type.toLowerCase()) {
            case "circle":
                return createCircle(params[0]);
            case "rectangle":
                return createRectangle(params[0], params[1]);
            case "triangle":
                return createTriangle(params[0], params[1]);
            default:
                throw new IllegalArgumentException("Unknown shape type: " + type);
        }
    }

    private Circle createCircle(double radius) {
        return new Circle(radius);
    }

    private Rectangle createRectangle(double width, double height) {
        return new Rectangle(width, height);
    }

    private Triangle createTriangle(double base, double height) {
        return new Triangle(base, height);
    }

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

    static class Triangle implements Shape {
        private double base, height;

        Triangle(double base, double height) {
            this.base = base;
            this.height = height;
        }

        public double getArea() { return 0.5 * base * height; }
        public double getPerimeter() { return base + height + Math.sqrt(base * base + height * height); }
    }

    public static void main(String[] args) {
        FactoryPattern factory = new FactoryPattern();

        Shape circle = factory.createShape("circle", 5.0);
        Shape rectangle = factory.createShape("rectangle", 10.0, 20.0);
        Shape triangle = factory.createShape("triangle", 8.0, 6.0);

        System.out.println("Circle area: " + circle.getArea());
        System.out.println("Rectangle area: " + rectangle.getArea());
        System.out.println("Triangle area: " + triangle.getArea());
    }
}
\`\`\`

---

## 🎯 Performance Considerations

### **Method Inlining Opportunities**
\`\`\`java
public class MethodInlining {
    // Simple methods may be inlined by JVM for performance
    public boolean isEven(int number) {
        return number % 2 == 0;
    }

    public int square(int number) {
        return number * number;
    }

    // Complex methods should remain as separate methods for readability
    public void processComplexData(java.util.List<String> data) {
        validateData(data);
        transformData(data);
        saveData(data);
    }

    private void validateData(java.util.List<String> data) {
        // Validation logic
    }

    private void transformData(java.util.List<String> data) {
        // Transformation logic
    }

    private void saveData(java.util.List<String> data) {
        // Saving logic
    }

    public static void main(String[] args) {
        MethodInlining obj = new MethodInlining();

        // Simple methods - good candidates for inlining
        System.out.println("42 is even: " + obj.isEven(42));
        System.out.println("5 squared: " + obj.square(5));

        // Complex method - better as separate method
        java.util.List<String> data = java.util.Arrays.asList("item1", "item2", "item3");
        obj.processComplexData(data);
    }
}
\`\`\`

### **Avoiding Method Call Overhead**
\`\`\`java
public class MethodCallOverhead {
    // ✅ Good: Simple calculations in loops
    public int sumArray(int[] array) {
        int sum = 0;
        for (int value : array) {
            sum += value;  // Direct calculation, no method call
        }
        return sum;
    }

    // ❌ Bad: Method calls in tight loops (if performance critical)
    // public int sumArrayBad(int[] array) {
    //     int sum = 0;
    //     for (int value : array) {
    //         sum = add(sum, value);  // Method call in loop
    //     }
    //     return sum;
    // }

    // private int add(int a, int b) {
    //     return a + b;
    // }

    // ✅ Better: Balance readability and performance
    public int sumArrayBalanced(int[] array) {
        if (array.length < 1000) {
            // For small arrays, readability matters more
            return sumWithMethod(array);
        } else {
            // For large arrays, performance matters more
            return sumInline(array);
        }
    }

    private int sumWithMethod(int[] array) {
        int sum = 0;
        for (int value : array) {
            sum = add(sum, value);
        }
        return sum;
    }

    private int sumInline(int[] array) {
        int sum = 0;
        for (int value : array) {
            sum += value;
        }
        return sum;
    }

    private int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        MethodCallOverhead obj = new MethodCallOverhead();
        int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        System.out.println("Sum: " + obj.sumArray(array));
        System.out.println("Balanced sum: " + obj.sumArrayBalanced(array));
    }
}
\`\`\`

---

## 🎯 Testing and Debugging Benefits

### **Testable Method Units**
\`\`\`java
public class TestableMethods {
    // Methods should be easily testable in isolation
    public boolean isValidPassword(String password) {
        return password != null &&
               password.length() >= 8 &&
               containsUpperCase(password) &&
               containsLowerCase(password) &&
               containsDigit(password);
    }

    public boolean containsUpperCase(String text) {
        return text.chars().anyMatch(Character::isUpperCase);
    }

    public boolean containsLowerCase(String text) {
        return text.chars().anyMatch(Character::isLowerCase);
    }

    public boolean containsDigit(String text) {
        return text.chars().anyMatch(Character::isDigit);
    }

    // Easy to test individual components
    public static void main(String[] args) {
        TestableMethods obj = new TestableMethods();

        String password = "ValidPass123";
        System.out.println("Password valid: " + obj.isValidPassword(password));
        System.out.println("Has uppercase: " + obj.containsUpperCase(password));
        System.out.println("Has lowercase: " + obj.containsLowerCase(password));
        System.out.println("Has digit: " + obj.containsDigit(password));
    }
}
\`\`\`

### **Debuggable Method Flow**
\`\`\`java
public class DebuggableMethods {
    // Methods should have clear entry/exit points for debugging
    public void processOrder(Order order) {
        logMethodEntry("processOrder", order);

        validateOrder(order);
        calculateTotal(order);
        applyDiscount(order);
        saveOrder(order);
        sendConfirmation(order);

        logMethodExit("processOrder");
    }

    private void validateOrder(Order order) {
        System.out.println("Validating order: " + order.getId());
        // Validation logic
    }

    private void calculateTotal(Order order) {
        System.out.println("Calculating total for order: " + order.getId());
        // Calculation logic
    }

    private void applyDiscount(Order order) {
        System.out.println("Applying discount for order: " + order.getId());
        // Discount logic
    }

    private void saveOrder(Order order) {
        System.out.println("Saving order: " + order.getId());
        // Save logic
    }

    private void sendConfirmation(Order order) {
        System.out.println("Sending confirmation for order: " + order.getId());
        // Email logic
    }

    private void logMethodEntry(String methodName, Object... params) {
        System.out.println("Entering " + methodName + " with params: " + java.util.Arrays.toString(params));
    }

    private void logMethodExit(String methodName) {
        System.out.println("Exiting " + methodName);
    }

    static class Order {
        private String id;

        public Order(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }
    }

    public static void main(String[] args) {
        DebuggableMethods obj = new DebuggableMethods();
        Order order = new Order("ORD-001");
        obj.processOrder(order);
    }
}
\`\`\`

---

## 🎯 Method Usage Guidelines

### **When to Create a Method**
\`\`\`java
public class WhenToCreateMethod {
    public void process() {
        // ✅ Extract method when:
        // - Code is repeated 2+ times
        // - Method would be longer than 10-15 lines
        // - Method has a single, clear responsibility
        // - Method would improve readability
        // - Method would be independently testable
        // - Method represents a meaningful abstraction

        loadConfiguration();
        validateConfiguration();
        initializeComponents();
        startProcessing();
    }

    private void loadConfiguration() {
        System.out.println("Loading configuration...");
    }

    private void validateConfiguration() {
        System.out.println("Validating configuration...");
    }

    private void initializeComponents() {
        System.out.println("Initializing components...");
    }

    private void startProcessing() {
        System.out.println("Starting processing...");
    }

    // ✅ Methods for complex boolean expressions
    public boolean isEligibleForDiscount(User user, Order order) {
        return user.isPremiumMember() &&
               order.getTotal() > 100.0 &&
               !order.isAlreadyDiscounted() &&
               isWithinDiscountPeriod();
    }

    private boolean isWithinDiscountPeriod() {
        // Check if current date is within discount period
        return true; // Simplified
    }

    static class User {
        public boolean isPremiumMember() { return true; }
    }

    static class Order {
        public double getTotal() { return 150.0; }
        public boolean isAlreadyDiscounted() { return false; }
    }

    public static void main(String[] args) {
        WhenToCreateMethod obj = new WhenToCreateMethod();

        obj.process();

        User user = new User();
        Order order = new Order();
        System.out.println("Eligible for discount: " + obj.isEligibleForDiscount(user, order));
    }
}
\`\`\`

### **When NOT to Create a Method**
\`\`\`java
public class WhenNotToCreateMethod {
    public void example() {
        // ❌ Don't extract method when:
        // - Method would only be called once
        // - Method would be extremely simple (1-2 lines with no logic)
        // - Method would break the flow of the calling method
        // - Method name wouldn't add clarity

        // This is acceptable for simple operations
        int result = calculateSimpleSum(5, 10);
        System.out.println("Result: " + result);

        // Don't do this for trivial operations:
        // int doubled = doubleValue(result);  // Unnecessary method
        System.out.println("Doubled: " + (result * 2));
    }

    // ✅ This method is justified - it encapsulates meaningful logic
    private int calculateSimpleSum(int a, int b) {
        return a + b;
    }

    // ❌ This would be overkill
    // private int doubleValue(int value) {
    //     return value * 2;
    // }

    public static void main(String[] args) {
        WhenNotToCreateMethod obj = new WhenNotToCreateMethod();
        obj.example();
    }
}
\`\`\`

Methods are fundamental to good Java programming. Use them to organize code, eliminate duplication, improve readability, and create testable, maintainable software. The key is finding the right balance between too many small methods and methods that are too large! 🎯`
};



