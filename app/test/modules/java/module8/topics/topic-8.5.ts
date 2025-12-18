import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_5: SubLesson = {
  id: 8.5,
  title: 'Static Members and Class Variables',
  status: 'completed',
  content: `# 📊 Static Members and Class Variables in Java

Master class-level members that exist independently of object instances!

---

## 🎯 What are Static Members?

**Static members** belong to the class itself rather than any particular instance. They are shared among all instances of the class and can be accessed without creating an object.

### **Key Characteristics:**
- Shared by all instances
- Exist before any objects are created
- Accessed using class name
- Memory allocated once per class

---

## 📊 Static Variables (Class Variables)

### **Declaration and Usage**
\`\`\`java
public class Counter {
    // Static variable - shared by all instances
    private static int instanceCount = 0;

    // Instance variable - unique to each instance
    private int id;

    public Counter() {
        instanceCount++;  // Increment shared counter
        id = instanceCount; // Assign unique ID
    }

    public int getId() {
        return id;
    }

    public static int getInstanceCount() {
        return instanceCount;
    }

    public static void main(String[] args) {
        System.out.println("Initial count: " + Counter.getInstanceCount()); // 0

        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();

        System.out.println("Final count: " + Counter.getInstanceCount());   // 3
        System.out.println("Object IDs: " + c1.getId() + ", " +
                          c2.getId() + ", " + c3.getId()); // 1, 2, 3
    }
}
\`\`\`

### **Common Use Cases**
\`\`\`java
public class Configuration {
    // Static constants
    public static final String APP_NAME = "MyApp";
    public static final String VERSION = "1.0.0";
    public static final int MAX_CONNECTIONS = 100;

    // Static configuration variable
    private static String databaseUrl;
    private static int connectionPoolSize = 10;

    // Static initializer block
    static {
        databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null) {
            databaseUrl = "jdbc:h2:mem:test"; // Default
        }
    }

    // Static getter/setter
    public static String getDatabaseUrl() {
        return databaseUrl;
    }

    public static void setConnectionPoolSize(int size) {
        if (size > 0 && size <= MAX_CONNECTIONS) {
            connectionPoolSize = size;
        }
    }

    public static int getConnectionPoolSize() {
        return connectionPoolSize;
    }
}
\`\`\`

---

## ⚡ Static Methods

### **Class-Level Operations**
\`\`\`java
public class MathUtilities {
    // Static utility method
    public static int findMax(int[] array) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("Array cannot be null or empty");
        }

        int max = array[0];
        for (int i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }
        return max;
    }

    // Static method with multiple parameters
    public static double calculateAverage(int... numbers) {
        if (numbers.length == 0) return 0.0;

        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        return (double) sum / numbers.length;
    }

    // Static factory method
    public static List<Integer> createList(int... elements) {
        List<Integer> list = new ArrayList<>();
        for (int element : elements) {
            list.add(element);
        }
        return list;
    }

    public static void main(String[] args) {
        // Call static methods without creating instance
        int max = MathUtilities.findMax(new int[]{3, 7, 2, 9, 1}); // 9
        double avg = MathUtilities.calculateAverage(1, 2, 3, 4, 5); // 3.0
        List<Integer> list = MathUtilities.createList(1, 2, 3); // [1, 2, 3]
    }
}
\`\`\`

### **Restrictions on Static Methods**
\`\`\`java
public class StaticMethodRestrictions {
    private int instanceVariable = 10;
    private static int staticVariable = 20;

    // Static method cannot access instance variables
    public static void staticMethod() {
        // System.out.println(instanceVariable); // ERROR: Cannot access instance variable

        System.out.println(staticVariable); // OK: Can access static variables
        staticMethod2(); // OK: Can call other static methods
    }

    public static void staticMethod2() {
        System.out.println("Static method 2");
    }

    // Instance method can access both
    public void instanceMethod() {
        System.out.println(instanceVariable); // OK
        System.out.println(staticVariable);   // OK
        staticMethod(); // OK: Can call static methods
    }

    // Cannot override static methods (hiding instead)
    public static void staticMethod3() {
        System.out.println("Parent static method");
    }
}

class Child extends StaticMethodRestrictions {
    // This hides, doesn't override
    public static void staticMethod3() {
        System.out.println("Child static method");
    }
}
\`\`\`

---

## 🏗️ Static Blocks (Static Initializers)

### **Static Initialization**
\`\`\`java
public class DatabaseManager {
    private static Connection connection;
    private static final String DRIVER = "org.h2.Driver";
    private static final String URL = "jdbc:h2:mem:testdb";

    // Static block for complex initialization
    static {
        try {
            Class.forName(DRIVER);
            connection = DriverManager.getConnection(URL);
            System.out.println("Database connection established");

            // Initialize tables
            initializeDatabase();

        } catch (Exception e) {
            System.err.println("Failed to initialize database: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private static void initializeDatabase() throws SQLException {
        try (Statement stmt = connection.createStatement()) {
            stmt.execute("CREATE TABLE IF NOT EXISTS users (" +
                        "id INT PRIMARY KEY AUTO_INCREMENT, " +
                        "name VARCHAR(100) NOT NULL, " +
                        "email VARCHAR(100) UNIQUE NOT NULL)");
            System.out.println("Database tables initialized");
        }
    }

    public static Connection getConnection() {
        return connection;
    }

    // Ensure connection is closed on shutdown
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                if (connection != null && !connection.isClosed()) {
                    connection.close();
                    System.out.println("Database connection closed");
                }
            } catch (SQLException e) {
                System.err.println("Error closing connection: " + e.getMessage());
            }
        }));
    }
}
\`\`\`

---

## 🔄 Static Imports

### **Importing Static Members**
\`\`\`java
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;
import static java.lang.System.out;

// Now you can use them directly
public class StaticImports {
    public static void main(String[] args) {
        out.println("PI value: " + PI);              // Instead of Math.PI
        out.println("Square root of 16: " + sqrt(16)); // Instead of Math.sqrt(16)

        // Calculate circle area
        double radius = 5.0;
        double area = PI * radius * radius;
        out.println("Circle area: " + area);
    }
}
\`\`\`

---

## 🎨 Design Patterns with Static Members

### **1. Singleton Pattern**
\`\`\`java
public class Singleton {
    // Static instance - single instance for entire application
    private static Singleton instance;

    // Private constructor prevents instantiation
    private Singleton() {
        System.out.println("Singleton instance created");
    }

    // Static method to get the single instance
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) { // Double-checked locking
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }

    public void showMessage() {
        System.out.println("Hello from Singleton!");
    }

    public static void main(String[] args) {
        Singleton s1 = Singleton.getInstance();
        Singleton s2 = Singleton.getInstance();

        System.out.println("Same instance? " + (s1 == s2)); // true

        s1.showMessage();
    }
}
\`\`\`

### **2. Factory Pattern with Static Methods**
\`\`\`java
public abstract class Shape {
    public abstract void draw();

    // Static factory method
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle":
                return new Circle();
            case "square":
                return new Square();
            case "triangle":
                return new Triangle();
            default:
                throw new IllegalArgumentException("Unknown shape: " + type);
        }
    }
}

class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

class Square extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a square");
    }
}

// Usage
public class FactoryExample {
    public static void main(String[] args) {
        Shape circle = Shape.createShape("circle");
        Shape square = Shape.createShape("square");

        circle.draw(); // Drawing a circle
        square.draw(); // Drawing a square
    }
}
\`\`\`

### **3. Utility Class**
\`\`\`java
public final class StringUtils {
    // Private constructor prevents instantiation
    private StringUtils() {
        throw new UnsupportedOperationException("Utility class");
    }

    // Static utility methods
    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isBlank(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String capitalize(String str) {
        if (isEmpty(str)) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }

    public static String reverse(String str) {
        if (isEmpty(str)) return str;
        return new StringBuilder(str).reverse().toString();
    }

    public static void main(String[] args) {
        System.out.println(StringUtils.capitalize("hello")); // Hello
        System.out.println(StringUtils.reverse("world"));    // dlrow
        System.out.println(StringUtils.isEmpty(""));         // true
    }
}
\`\`\`

---

## ⚠️ Common Pitfalls

### **1. Static Variable Thread Safety**
\`\`\`java
public class UnsafeCounter {
    private static int counter = 0;

    // Not thread-safe!
    public static void increment() {
        counter++; // Race condition in multi-threaded environment
    }

    public static int getCounter() {
        return counter;
    }
}

// Thread-safe version
public class SafeCounter {
    private static final AtomicInteger counter = new AtomicInteger(0);

    public static void increment() {
        counter.incrementAndGet(); // Thread-safe
    }

    public static int getCounter() {
        return counter.get();
    }
}
\`\`\`

### **2. Memory Leaks with Static Collections**
\`\`\`java
public class MemoryLeak {
    private static List<String> cache = new ArrayList<>();

    public static void addToCache(String item) {
        cache.add(item);
        // Items never removed - potential memory leak!
    }

    // Better: Use WeakHashMap or limit cache size
    private static Map<String, String> boundedCache = new LinkedHashMap<>() {
        private static final int MAX_SIZE = 100;

        @Override
        protected boolean removeEldestEntry(Map.Entry eldest) {
            return size() > MAX_SIZE;
        }
    };
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Static members** belong to the class, not instances
2. **Static variables** are shared by all instances of the class
3. **Static methods** can be called without creating objects
4. **Static blocks** initialize static members when class loads
5. **Static imports** allow direct access to static members
6. **Design patterns** like Singleton use static members effectively
7. **Thread safety** is crucial when using static variables
8. **Memory management** is important to prevent leaks

**Next:** Learn about the final keyword and immutability! 🚀`
};
