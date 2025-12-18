import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_3: SubLesson = {
  id: "7.3",
  title: 'Final Classes and Methods',
  status: 'completed',
  content: `# 🔒 Final Classes and Methods in Java

The \`final\` keyword in Java prevents inheritance and method overriding. It provides security, performance benefits, and design clarity by ensuring that certain classes and methods cannot be modified through inheritance. Understanding when and how to use \`final\` is crucial for robust Java programming.

---

## 📋 The final Keyword

### **Final Classes**
\`\`\`java
// Final class cannot be extended
public final class MathUtils {
    // Utility methods
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static double calculatePower(double base, int exponent) {
        double result = 1;
        for (int i = 0; i < Math.abs(exponent); i++) {
            result *= base;
        }
        return exponent < 0 ? 1 / result : result;
    }

    public static boolean isPrime(int number) {
        if (number <= 1) return false;
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) return false;
        }
        return true;
    }
}

// ❌ This would cause a compilation error
// class ExtendedMathUtils extends MathUtils { }

public class FinalClassDemo {
    public static void main(String[] args) {
        System.out.println("Circle area: " + MathUtils.calculateCircleArea(5.0));
        System.out.println("2^3: " + MathUtils.calculatePower(2, 3));
        System.out.println("Is 17 prime? " + MathUtils.isPrime(17));
    }
}
\`\`\`

### **Final Methods**
\`\`\`java
public class FinalMethods {
    static class Vehicle {
        public final void startEngine() {
            System.out.println("Engine starting...");
        }

        public void drive() {
            System.out.println("Vehicle driving");
        }
    }

    static class Car extends Vehicle {
        // ✅ Can override non-final methods
        @Override
        public void drive() {
            System.out.println("Car driving on road");
        }

        // ❌ Cannot override final methods
        // @Override
        // public void startEngine() { }  // Compilation error
    }

    public static void main(String[] args) {
        Car car = new Car();
        car.startEngine();  // Final method - cannot be overridden
        car.drive();        // Overridden method
    }
}
\`\`\`

---

## 🔒 Final Fields and Variables

### **Final Instance Fields**
\`\`\`java
public class FinalFields {
    // Final instance fields must be initialized
    private final String id;
    private final java.util.Date createdDate;
    private final double PI = 3.14159;  // Can be initialized at declaration

    // Constructor initialization
    public FinalFields(String id) {
        this.id = id;  // Must be initialized in constructor
        this.createdDate = new java.util.Date();  // Can be computed
    }

    // Cannot modify final fields
    // public void setId(String id) {
    //     this.id = id;  // Compilation error
    // }

    public String getId() { return id; }
    public java.util.Date getCreatedDate() { return createdDate; }

    public static void main(String[] args) {
        FinalFields obj = new FinalFields("OBJ001");
        System.out.println("ID: " + obj.getId());
        System.out.println("Created: " + obj.getCreatedDate());
        System.out.println("PI: " + obj.PI);
    }
}
\`\`\`

### **Final Local Variables**
\`\`\`java
public class FinalVariables {
    public void demonstrateFinalVariables() {
        // Final local variable
        final int maxAttempts = 3;

        // Cannot reassign final variables
        // maxAttempts = 5;  // Compilation error

        // Final reference - cannot reassign reference, but can modify object
        final java.util.List<String> names = new java.util.ArrayList<>();
        names.add("Alice");  // ✅ Can modify the object
        names.add("Bob");    // ✅ Can modify the object

        // names = new java.util.ArrayList<>();  // ❌ Cannot reassign reference

        // Final in enhanced for loop
        for (final String name : names) {
            System.out.println(name);
            // name = "New Name";  // ❌ Cannot modify final variable
        }

        // Final parameters
        processData(names, maxAttempts);
    }

    public void processData(final java.util.List<String> data, final int limit) {
        // Cannot modify final parameters
        // data = new java.util.ArrayList<>();  // ❌ Cannot reassign
        // limit = 10;  // ❌ Cannot reassign

        // But can use the parameters
        System.out.println("Processing " + data.size() + " items with limit " + limit);
    }

    public static void main(String[] args) {
        FinalVariables demo = new FinalVariables();
        demo.demonstrateFinalVariables();
    }
}
\`\`\`

---

## 🎯 When to Use final

### **Final Classes**
\`\`\`java
// ✅ Use final classes when:

// 1. Utility classes with static methods
public final class StringUtils {
    public static String capitalize(String text) {
        if (text == null || text.isEmpty()) return text;
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }

    public static boolean isEmpty(String text) {
        return text == null || text.trim().isEmpty();
    }

    public static String reverse(String text) {
        return text != null ? new StringBuilder(text).reverse().toString() : null;
    }
}

// 2. Immutable classes
public final class ImmutablePoint {
    private final int x;
    private final int y;

    public ImmutablePoint(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public int getY() { return y; }

    public ImmutablePoint move(int deltaX, int deltaY) {
        return new ImmutablePoint(x + deltaX, y + deltaY);
    }
}

// 3. Security-sensitive classes
public final class SecurityManager {
    private static final SecurityManager instance = new SecurityManager();

    private SecurityManager() { }  // Private constructor

    public static SecurityManager getInstance() {
        return instance;
    }

    public final void checkPermission(String permission) {
        // Security check logic - cannot be overridden
        System.out.println("Checking permission: " + permission);
    }
}
\`\`\`

### **Final Methods**
\`\`\`java
public class FinalMethodExamples {
    // ✅ Use final methods when:

    // 1. Security-critical operations
    static class BankAccount {
        private double balance;

        public final void withdraw(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Invalid amount");
            }
            if (amount > balance) {
                throw new IllegalArgumentException("Insufficient funds");
            }
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        }

        public void deposit(double amount) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Invalid amount");
            }
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }

    // 2. Template method pattern steps
    abstract static class DataProcessor {
        // Template method
        public final void process() {
            validateInput();
            processData();
            generateOutput();
        }

        // Steps that can be customized
        protected abstract void validateInput();
        protected abstract void processData();
        protected abstract void generateOutput();
    }

    static class CSVProcessor extends DataProcessor {
        @Override
        protected void validateInput() {
            System.out.println("Validating CSV format");
        }

        @Override
        protected void processData() {
            System.out.println("Processing CSV data");
        }

        @Override
        protected void generateOutput() {
            System.out.println("Generating CSV output");
        }
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount();
        account.deposit(1000);
        account.withdraw(500);

        DataProcessor processor = new CSVProcessor();
        processor.process();  // Cannot change the algorithm structure
    }
}
\`\`\`

---

## 🚀 Performance Benefits of final

### **JVM Optimizations**
\`\`\`java
public class PerformanceBenefits {
    // Final fields allow JVM optimizations
    public static final int MAX_SIZE = 1000;
    public static final String CONFIG_KEY = "app.config";

    // Final methods can be inlined by the JVM
    public final int calculateSum(final int a, final int b) {
        return a + b;  // Simple enough to be inlined
    }

    // Final classes allow more aggressive optimizations
    public final class OptimizedCounter {
        private int count = 0;

        public void increment() {
            count++;
        }

        public int getCount() {
            return count;
        }
    }

    public static void main(String[] args) {
        PerformanceBenefits demo = new PerformanceBenefits();
        OptimizedCounter counter = demo.new OptimizedCounter();

        // JVM can optimize these operations
        for (int i = 0; i < MAX_SIZE; i++) {
            counter.increment();
            int sum = demo.calculateSum(i, 1);
        }

        System.out.println("Final optimizations applied");
    }
}
\`\`\`

### **Immutability Benefits**
\`\`\`java
public class ImmutabilityBenefits {
    // Immutable class using final
    public final class ImmutablePerson {
        private final String name;
        private final int age;
        private final java.util.List<String> hobbies;

        public ImmutablePerson(String name, int age, java.util.List<String> hobbies) {
            this.name = name;
            this.age = age;
            // Defensive copy to prevent external modification
            this.hobbies = hobbies != null ? java.util.List.copyOf(hobbies) : java.util.List.of();
        }

        public String getName() { return name; }
        public int getAge() { return age; }
        public java.util.List<String> getHobbies() {
            return hobbies;  // Safe to return - it's immutable
        }
    }

    public static void main(String[] args) {
        java.util.List<String> hobbies = java.util.Arrays.asList("Reading", "Swimming");
        ImmutablePerson person = new ImmutablePerson("Alice", 25, hobbies);

        // Cannot modify the person object
        // person.age = 26;  // Compilation error

        // Original list modification doesn't affect the person
        hobbies.set(0, "Writing");
        System.out.println("Person hobbies: " + person.getHobbies()); // Still "Reading"

        // Thread-safe - can be shared between threads without synchronization
        System.out.println("Thread-safe immutable object created");
    }
}
\`\`\`

---

## ⚠️ Common final Usage Mistakes

### **Over-Using final**
\`\`\`java
public class OverUsingFinal {
    // ❌ Over-using final can make code inflexible
    public final class RigidClass {
        private final String name;
        private final int value;

        public RigidClass(String name, int value) {
            this.name = name;
            this.value = value;
        }

        // Even simple methods are final - prevents extension
        public final void display() {
            System.out.println(name + ": " + value);
        }

        // Cannot be extended for customization
    }

    // ❌ Final utility class prevents method addition
    public final class Utility {
        public static void method1() { }
        public static void method2() { }
        // Cannot add more utility methods
    }

    // ✅ Better: Non-final where extension might be useful
    public class FlexibleClass {
        public void customizableMethod() {
            // Can be overridden by subclasses
        }

        public final void secureMethod() {
            // Only this method is final for security
        }
    }

    public static void main(String[] args) {
        RigidClass rigid = new RigidClass("Test", 42);
        rigid.display();

        // Cannot extend RigidClass for customization
        // class ExtendedRigid extends RigidClass { } // Compilation error
    }
}
\`\`\`

### **Confusing final Fields**
\`\`\`java
public class FinalFieldConfusion {
    // ❌ Confusing: not all final fields are constants
    public final java.util.Date currentDate = new java.util.Date();

    // ✅ Clear: use static final for constants
    public static final double PI = 3.14159;
    public static final String APP_NAME = "MyApp";

    // Instance-specific final field
    private final String instanceId;

    public FinalFieldConfusion(String instanceId) {
        this.instanceId = instanceId;
    }

    public void demonstrateConfusion() {
        // currentDate is final but mutable
        currentDate.setTime(System.currentTimeMillis() + 86400000); // Can modify!

        System.out.println("Instance ID: " + instanceId); // Truly immutable
        System.out.println("Modified date: " + currentDate);
    }

    public static void main(String[] args) {
        FinalFieldConfusion obj = new FinalFieldConfusion("OBJ001");
        obj.demonstrateConfusion();
    }
}
\`\`\`

---

## 🎯 final Best Practices

### **1. Use final Liberally for Security and Clarity**
\`\`\`java
public class FinalBestPractices {
    // ✅ Final classes for security
    public final class SecurityUtils {
        public static boolean validateToken(String token) {
            // Critical security logic - cannot be overridden
            return token != null && token.length() > 10;
        }
    }

    // ✅ Final methods for critical operations
    public class BankAccount {
        private double balance;

        public final void transfer(double amount, BankAccount target) {
            // Critical operation - cannot be tampered with
            if (balance >= amount) {
                balance -= amount;
                target.balance += amount;
            }
        }

        public void deposit(double amount) {
            balance += amount;
        }
    }

    // ✅ Final fields for constants
    public class Constants {
        public static final String DATABASE_URL = "jdbc:mysql://localhost:3306/mydb";
        public static final int MAX_CONNECTIONS = 100;
        public static final java.util.logging.Level LOG_LEVEL = java.util.logging.Level.INFO;

        // Instance-specific immutable fields
        private final String instanceId;
        private final java.time.LocalDateTime createdAt;

        public Constants(String instanceId) {
            this.instanceId = instanceId;
            this.createdAt = java.time.LocalDateTime.now();
        }
    }
}
\`\`\`

### **2. Consider Inheritance Needs**
\`\`\`java
public class InheritanceConsiderations {
    // ✅ Design for inheritance when extension is intended
    public class BaseService {
        // Protected methods for subclasses to override
        protected void initialize() {
            System.out.println("Base initialization");
        }

        // Final methods for security/integrity
        public final void execute() {
            initialize();
            performOperation();
            cleanup();
        }

        protected void performOperation() {
            System.out.println("Base operation");
        }

        protected void cleanup() {
            System.out.println("Base cleanup");
        }
    }

    // ✅ Subclass can customize behavior
    public class CustomService extends BaseService {
        @Override
        protected void performOperation() {
            System.out.println("Custom operation");
        }
    }

    // ❌ Don't make classes final unnecessarily
    // public final class RigidService {
    //     // Prevents all extension
    // }

    public static void main(String[] args) {
        BaseService base = new BaseService();
        CustomService custom = new CustomService();

        base.execute();
        System.out.println();
        custom.execute();
    }
}
\`\`\`

### **3. Final and Performance**
\`\`\`java
public class FinalPerformance {
    // ✅ JVM can inline final methods
    public final int add(final int a, final int b) {
        return a + b;
    }

    // ✅ JVM can optimize final fields
    public static final int BUFFER_SIZE = 8192;

    // ✅ Immutable objects are thread-safe
    public final class ImmutableValue {
        private final int value;

        public ImmutableValue(int value) {
            this.value = value;
        }

        public int getValue() { return value; }

        public ImmutableValue add(int delta) {
            return new ImmutableValue(value + delta);
        }
    }

    public static void main(String[] args) {
        FinalPerformance demo = new FinalPerformance();

        // JVM optimizations applied
        int result = 0;
        for (int i = 0; i < 1000000; i++) {
            result = demo.add(result, 1);
        }

        System.out.println("Final method optimization: " + result);

        ImmutableValue val = demo.new ImmutableValue(10);
        ImmutableValue newVal = val.add(5);
        System.out.println("Immutable value: " + newVal.getValue());
    }
}
\`\`\`

### **4. Documentation and Intent**
\`\`\`java
public class FinalDocumentation {
    /**
     * Immutable configuration class.
     * Instances are thread-safe and can be shared freely.
     */
    public final class Configuration {
        private final String databaseUrl;
        private final int maxConnections;
        private final boolean debugMode;

        public Configuration(String databaseUrl, int maxConnections, boolean debugMode) {
            this.databaseUrl = databaseUrl;
            this.maxConnections = maxConnections;
            this.debugMode = debugMode;
        }

        /**
         * Returns the database URL. This value cannot be changed after construction.
         */
        public String getDatabaseUrl() { return databaseUrl; }

        /**
         * Returns the maximum number of connections. This is a fixed configuration value.
         */
        public final int getMaxConnections() { return maxConnections; }

        /**
         * Checks if debug mode is enabled. This setting cannot be changed at runtime.
         */
        public boolean isDebugMode() { return debugMode; }
    }

    /**
     * Base class for all controllers. The request processing flow is final
     * to ensure consistent behavior across all controllers.
     */
    public abstract class BaseController {
        /**
         * Final request processing method. Subclasses can customize
         * validation and processing but not the overall flow.
         */
        public final void handleRequest(String request) {
            validateRequest(request);
            processRequest(request);
            sendResponse();
        }

        protected abstract void validateRequest(String request);
        protected abstract void processRequest(String request);

        private final void sendResponse() {
            System.out.println("Sending response");
        }
    }

    public static void main(String[] args) {
        Configuration config = new Configuration("jdbc:mysql://localhost/db", 10, true);
        System.out.println("Database URL: " + config.getDatabaseUrl());
        System.out.println("Max connections: " + config.getMaxConnections());
    }
}
\`\`\`

The \`final\` keyword is a powerful tool in Java that prevents inheritance and method overriding. Use it strategically to create secure, optimized, and well-designed classes that clearly communicate their immutability and extension restrictions! 🔒`
};

