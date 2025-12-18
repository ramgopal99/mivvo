import { SubLesson } from '../../../data/lessonsData';

export const topic_8_2: SubLesson = {
  id: 8.2,
  title: 'Object Creation and Memory Management',
  status: 'completed',
  content: `# 🔧 Object Creation and Memory Management in Java

Understanding how objects are created, managed, and destroyed in Java's memory system!

---

## 🎯 Object Creation

### **The 'new' Keyword**

Objects are created using the \`new\` keyword, which allocates memory and initializes the object:

\`\`\`java
public class Car {
    private String brand;
    private String model;
    private int year;

    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Main method to demonstrate object creation
    public static void main(String[] args) {
        // Creating objects using 'new'
        Car car1 = new Car("Toyota", "Camry", 2020);
        Car car2 = new Car("Honda", "Civic", 2019);
        Car car3 = car1; // Reference copy, not new object

        System.out.println("Car 1: " + car1.getBrand() + " " + car1.getModel());
        System.out.println("Car 2: " + car2.getBrand() + " " + car2.getModel());
        System.out.println("Car 3: " + car3.getBrand() + " " + car3.getModel());
    }

    // Getters
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
}
\`\`\`

---

## 🗂️ Java Memory Areas

### **1. Stack Memory**
- Stores method calls and local variables
- Automatic memory management (LIFO structure)
- Fast access, limited size

\`\`\`java
public class StackExample {
    public void method1() {
        int localVar = 10; // Stored in stack
        method2();
    }

    public void method2() {
        String localString = "Hello"; // Stored in stack
        // method1() is still in stack
    }
}
\`\`\`

### **2. Heap Memory**
- Stores objects and instance variables
- Managed by Garbage Collector
- Larger size, slower access

\`\`\`java
public class HeapExample {
    public static void main(String[] args) {
        // Objects created with 'new' go to heap
        StringBuilder sb = new StringBuilder(); // Heap
        int[] array = new int[10]; // Heap

        // Local variables go to stack
        int number = 42; // Stack
    }
}
\`\`\`

### **3. Method Area (Permanent Generation)**
- Stores class metadata, static variables
- Contains constant pool, method data

---

## 🔄 Object Lifecycle

### **1. Creation Phase**
\`\`\`java
public class ObjectLifecycle {
    // Instance variables
    private String name;

    // Constructor
    public ObjectLifecycle(String name) {
        System.out.println("Constructor called for: " + name);
        this.name = name;
    }

    // Instance initializer block
    {
        System.out.println("Instance initializer block");
    }

    // Static initializer block
    static {
        System.out.println("Static initializer block");
    }

    public static void main(String[] args) {
        System.out.println("Before object creation");
        ObjectLifecycle obj = new ObjectLifecycle("Test Object");
        System.out.println("After object creation");
    }
}
\`\`\`

**Output:**
\`\`\`
Static initializer block
Before object creation
Instance initializer block
Constructor called for: Test Object
After object creation
\`\`\`

### **2. Usage Phase**
\`\`\`java
public class ObjectUsage {
    private int value;

    public void increment() {
        this.value++;
    }

    public int getValue() {
        return this.value;
    }

    public static void main(String[] args) {
        ObjectUsage obj = new ObjectUsage();
        obj.increment();
        obj.increment();
        System.out.println("Value: " + obj.getValue()); // Value: 2
    }
}
\`\`\`

### **3. Destruction Phase**
- Handled by Garbage Collector
- No deterministic destruction like C++
- \`finalize()\` method (deprecated, don't use)

---

## 🗑️ Garbage Collection

### **How GC Works**

Java's Garbage Collector automatically manages memory:

\`\`\`java
public class GarbageCollection {
    public static void main(String[] args) {
        // Create objects
        GarbageCollection obj1 = new GarbageCollection();
        GarbageCollection obj2 = new GarbageCollection();

        // Objects become eligible for GC when no references point to them
        obj1 = null; // obj1 is now eligible for GC
        obj2 = null; // obj2 is now eligible for GC

        // Suggest GC (not guaranteed to run)
        System.gc();

        // Objects will be collected when GC runs
    }

    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object is being garbage collected");
        super.finalize();
    }
}
\`\`\`

### **GC Types in Java:**
- **Serial GC**: Single-threaded, good for small applications
- **Parallel GC**: Multi-threaded, default for server applications
- **CMS (Concurrent Mark Sweep)**: Minimizes pauses
- **G1 GC**: Designed for large heaps

### **Memory Leaks in Java**
\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class MemoryLeak {
    private static List<String> list = new ArrayList<>();

    public void addToList() {
        for (int i = 0; i < 100000; i++) {
            list.add("Item " + i); // Keeps growing, potential memory leak
        }
    }

    // Better approach: Clear when done
    public void clearList() {
        list.clear(); // Free memory
    }
}
\`\`\`

---

## 📊 Memory Optimization

### **1. Object Pooling**
Reuse objects instead of creating new ones:

\`\`\`java
import java.util.concurrent.ConcurrentLinkedQueue;

public class ObjectPool<T> {
    private final ConcurrentLinkedQueue<T> pool = new ConcurrentLinkedQueue<>();
    private final ObjectFactory<T> factory;

    public interface ObjectFactory<T> {
        T create();
    }

    public ObjectPool(ObjectFactory<T> factory) {
        this.factory = factory;
    }

    public T borrow() {
        T obj = pool.poll();
        return obj != null ? obj : factory.create();
    }

    public void release(T obj) {
        pool.offer(obj);
    }
}
\`\`\`

### **2. String Interning**
\`\`\`java
public class StringInterning {
    public static void main(String[] args) {
        // Without interning: multiple objects
        String s1 = new String("hello");
        String s2 = new String("hello");
        System.out.println(s1 == s2); // false (different objects)

        // With interning: same object from string pool
        String s3 = "hello";
        String s4 = "hello";
        System.out.println(s3 == s4); // true (same object)

        // Manual interning
        String s5 = s1.intern();
        System.out.println(s3 == s5); // true
    }
}
\`\`\`

---

## 🛠️ Best Practices

### **1. Null Checks**
\`\`\`java
public class NullSafety {
    public void processData(String data) {
        // Defensive programming
        if (data != null && !data.trim().isEmpty()) {
            System.out.println("Processing: " + data);
        } else {
            System.out.println("Invalid data");
        }
    }

    public void processUser(User user) {
        // Null-safe operations (Java 8+)
        String name = Optional.ofNullable(user)
                             .map(User::getName)
                             .orElse("Unknown");
        System.out.println("User name: " + name);
    }
}
\`\`\`

### **2. Resource Management**
\`\`\`java
import java.io.*;

public class ResourceManagement {
    // Traditional try-catch-finally
    public void readFileTraditional(String filename) {
        FileReader reader = null;
        try {
            reader = new FileReader(filename);
            // Read file
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    // Try-with-resources (Java 7+)
    public void readFileModern(String filename) {
        try (FileReader reader = new FileReader(filename)) {
            // Read file - automatically closed
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Object Creation**: Use \`new\` keyword to allocate memory in heap
2. **Memory Areas**: Stack (methods/variables), Heap (objects), Method Area (classes)
3. **Garbage Collection**: Automatic memory management, no manual deletion
4. **Object Lifecycle**: Creation → Usage → Garbage Collection
5. **Memory Optimization**: Object pooling, string interning, null safety
6. **Resource Management**: Use try-with-resources for automatic cleanup

**Next:** Learn about constructors and initialization in detail! 🚀`
};
