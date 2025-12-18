import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_5: SubLesson = {
  id: "5.5",
  title: 'Method Overloading',
  status: 'completed',
  content: `# 🔄 Method Overloading in Java

Method overloading allows multiple methods with the same name but different parameter lists to coexist in the same class. This feature enables more intuitive APIs and provides flexibility for method callers.

---

## 📋 Overloading Fundamentals

### **What is Method Overloading?**
\`\`\`java
public class OverloadingBasics {
    // Multiple methods with same name but different parameters
    public void display(String message) {
        System.out.println("Message: " + message);
    }

    public void display(String message, int count) {
        for (int i = 0; i < count; i++) {
            System.out.println("Message " + (i + 1) + ": " + message);
        }
    }

    public void display(int number) {
        System.out.println("Number: " + number);
    }

    public void display(double number) {
        System.out.println("Decimal: " + number);
    }

    public static void main(String[] args) {
        OverloadingBasics obj = new OverloadingBasics();

        obj.display("Hello World");        // Calls display(String)
        obj.display("Hello", 3);           // Calls display(String, int)
        obj.display(42);                   // Calls display(int)
        obj.display(3.14);                 // Calls display(double)
    }
}
\`\`\`

### **Why Use Method Overloading?**
\`\`\`java
public class OverloadingBenefits {
    // ❌ Without overloading - confusing method names
    public void printString(String text) {
        System.out.println(text);
    }

    public void printStringMultipleTimes(String text, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(text);
        }
    }

    public void printInteger(int number) {
        System.out.println(number);
    }

    // ✅ With overloading - clean, intuitive API
    public void print(String text) {
        System.out.println(text);
    }

    public void print(String text, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(text);
        }
    }

    public void print(int number) {
        System.out.println(number);
    }

    public static void main(String[] args) {
        OverloadingBenefits obj = new OverloadingBenefits();

        obj.print("Hello");        // Clear intent
        obj.print("Hello", 3);     // Clear intent
        obj.print(42);             // Clear intent
    }
}
\`\`\`

---

## 📊 Overloading Rules

### **Valid Overloading Criteria**
\`\`\`java
public class OverloadingRules {
    // ✅ Different number of parameters
    public void method1() { }
    public void method1(int a) { }
    public void method1(int a, int b) { }

    // ✅ Different parameter types
    public void method2(int a) { }
    public void method2(double a) { }
    public void method2(String a) { }

    // ✅ Different parameter order (if types differ)
    public void method3(int a, String b) { }
    public void method3(String a, int b) { }

    // ❌ Same parameter list - not allowed
    // public void method4(int a) { }      // Duplicate
    // public void method4(int a) { }      // Duplicate

    // ✅ Varargs are treated as arrays
    public void method5(String... args) { }
    public void method5(String[] args) { }  // Not allowed - same as varargs

    public static void main(String[] args) {
        OverloadingRules obj = new OverloadingRules();

        obj.method1();           // No parameters
        obj.method1(10);         // One int parameter
        obj.method1(10, 20);     // Two int parameters

        obj.method2(42);         // int version
        obj.method2(3.14);       // double version
        obj.method2("Hello");    // String version

        obj.method3(1, "Hello"); // int, String
        obj.method3("Hello", 1); // String, int
    }
}
\`\`\`

### **What Cannot Be Overloaded**
\`\`\`java
public class InvalidOverloading {
    // ✅ Valid overloading - different parameter types
    public void validMethod(int a) { }
    public void validMethod(String a) { }

    // ❌ Invalid - only return type differs
    // public int invalidMethod(int a) { return a; }
    // public void invalidMethod(int a) { }  // Compile error

    // ❌ Invalid - only parameter names differ
    // public void invalidMethod(int a) { }
    // public void invalidMethod(int b) { }  // Compile error

    // ❌ Invalid - only access modifiers differ
    // public void invalidMethod(String a) { }
    // private void invalidMethod(String a) { }  // Not overloading, just hiding

    public static void main(String[] args) {
        InvalidOverloading obj = new InvalidOverloading();
        obj.validMethod(42);
        obj.validMethod("Hello");
    }
}
\`\`\`

---

## 🔧 Overloading with Different Parameter Types

### **Primitive Type Overloading**
\`\`\`java
public class PrimitiveOverloading {
    public void process(int value) {
        System.out.println("Processing int: " + value);
    }

    public void process(long value) {
        System.out.println("Processing long: " + value);
    }

    public void process(double value) {
        System.out.println("Processing double: " + value);
    }

    public void process(float value) {
        System.out.println("Processing float: " + value);
    }

    public void process(boolean value) {
        System.out.println("Processing boolean: " + value);
    }

    public static void main(String[] args) {
        PrimitiveOverloading obj = new PrimitiveOverloading();

        obj.process(42);      // int
        obj.process(42L);     // long
        obj.process(3.14);    // double
        obj.process(2.71f);   // float
        obj.process(true);    // boolean
    }
}
\`\`\`

### **Object Type Overloading**
\`\`\`java
public class ObjectOverloading {
    public void display(java.util.List<String> list) {
        System.out.println("List: " + list);
    }

    public void display(java.util.Set<String> set) {
        System.out.println("Set: " + set);
    }

    public void display(java.util.Map<String, Integer> map) {
        System.out.println("Map: " + map);
    }

    public void display(String text) {
        System.out.println("String: " + text);
    }

    public void display(String[] array) {
        System.out.println("Array: " + java.util.Arrays.toString(array));
    }

    public static void main(String[] args) {
        ObjectOverloading obj = new ObjectOverloading();

        obj.display(java.util.Arrays.asList("A", "B", "C"));
        obj.display(new java.util.HashSet<>(java.util.Arrays.asList("X", "Y", "Z")));

        java.util.Map<String, Integer> map = new java.util.HashMap<>();
        map.put("Alice", 95);
        obj.display(map);

        obj.display("Hello World");
        obj.display(new String[]{"A", "B", "C"});
    }
}
\`\`\`

---

## 📊 Advanced Overloading Patterns

### **Constructor Overloading**
\`\`\`java
public class ConstructorOverloading {
    private String name;
    private int age;
    private String email;

    // Default constructor
    public ConstructorOverloading() {
        this("Unknown", 0, "unknown@example.com");
    }

    // Constructor with name
    public ConstructorOverloading(String name) {
        this(name, 0, "unknown@example.com");
    }

    // Constructor with name and age
    public ConstructorOverloading(String name, int age) {
        this(name, age, "unknown@example.com");
    }

    // Full constructor
    public ConstructorOverloading(String name, int age, String email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    @Override
    public String toString() {
        return "ConstructorOverloading{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", email='" + email + '\'' +
            '}';
    }

    public static void main(String[] args) {
        ConstructorOverloading user1 = new ConstructorOverloading();
        ConstructorOverloading user2 = new ConstructorOverloading("Alice");
        ConstructorOverloading user3 = new ConstructorOverloading("Bob", 25);
        ConstructorOverloading user4 = new ConstructorOverloading("Charlie", 30, "charlie@example.com");

        System.out.println(user1);
        System.out.println(user2);
        System.out.println(user3);
        System.out.println(user4);
    }
}
\`\`\`

### **Varargs Overloading**
\`\`\`java
public class VarargsOverloading {
    // Single value
    public void printValues(int value) {
        System.out.println("Single value: " + value);
    }

    // Multiple values
    public void printValues(int... values) {
        System.out.println("Multiple values: " + java.util.Arrays.toString(values));
    }

    // Different type varargs
    public void printValues(String... values) {
        System.out.println("String values: " + java.util.Arrays.toString(values));
    }

    public static void main(String[] args) {
        VarargsOverloading obj = new VarargsOverloading();

        obj.printValues(42);              // Single int
        obj.printValues(1, 2, 3, 4);      // Multiple ints
        obj.printValues("A", "B", "C");   // Multiple strings
    }
}
\`\`\`

---

## 🎯 Method Resolution (Which Overload is Called?)

### **Compile-time Method Resolution**
\`\`\`java
public class MethodResolution {
    public void method(int a) {
        System.out.println("int version: " + a);
    }

    public void method(long a) {
        System.out.println("long version: " + a);
    }

    public void method(Integer a) {
        System.out.println("Integer version: " + a);
    }

    public void method(double a) {
        System.out.println("double version: " + a);
    }

    public static void main(String[] args) {
        MethodResolution obj = new MethodResolution();

        obj.method(42);     // int version - exact match
        obj.method(42L);    // long version - exact match
        obj.method(42.0);   // double version - exact match

        // Autoboxing
        Integer boxed = 42;
        obj.method(boxed);  // Integer version - exact match

        // Widening primitive conversion
        int primitive = 42;
        obj.method(primitive);  // int version - exact match

        // Method call with literal
        obj.method(42);  // int version - int is the default type for integer literals
    }
}
\`\`\`

### **Ambiguity Resolution**
\`\`\`java
public class AmbiguityResolution {
    public void method(int a, long b) {
        System.out.println("int, long version");
    }

    public void method(long a, int b) {
        System.out.println("long, int version");
    }

    // This would cause ambiguity:
    // public void method(int a, int b) { }  // Compile error - ambiguous

    public static void main(String[] args) {
        AmbiguityResolution obj = new AmbiguityResolution();

        obj.method(1, 2L);  // Calls method(int, long)
        obj.method(1L, 2);  // Calls method(long, int)

        // obj.method(1, 2);  // Compile error - ambiguous call
    }
}
\`\`\`

---

## 🎯 Overloading Best Practices

### **1. Use Overloading for Related Operations**
\`\`\`java
public class GoodOverloading {
    // ✅ Good: Related operations with different inputs
    public void save(String data) {
        // Save string data
        System.out.println("Saving string: " + data);
    }

    public void save(java.io.File file) {
        // Save file
        System.out.println("Saving file: " + file.getName());
    }

    public void save(java.util.List<String> data) {
        // Save list of strings
        System.out.println("Saving list: " + data);
    }

    // ✅ Good: Different levels of configuration
    public void connect(String host) {
        connect(host, 80);
    }

    public void connect(String host, int port) {
        connect(host, port, "anonymous");
    }

    public void connect(String host, int port, String username) {
        System.out.println("Connecting to " + host + ":" + port + " as " + username);
    }

    public static void main(String[] args) {
        GoodOverloading obj = new GoodOverloading();

        obj.save("Simple text");
        obj.save(new java.io.File("data.txt"));
        obj.save(java.util.Arrays.asList("item1", "item2"));

        obj.connect("localhost");
        obj.connect("example.com", 8080);
        obj.connect("secure.com", 443, "admin");
    }
}
\`\`\`

### **2. Avoid Ambiguous Overloads**
\`\`\`java
public class AvoidAmbiguity {
    // ✅ Clear: Different parameter counts
    public void calculate(int a, int b) {
        System.out.println("Sum: " + (a + b));
    }

    public void calculate(int a, int b, int c) {
        System.out.println("Sum: " + (a + b + c));
    }

    // ❌ Avoid: Similar parameter patterns
    // public void process(int value, String type) { }
    // public void process(String type, int value) { }  // Confusing!

    // ✅ Better: Use different method names or parameter objects
    public void processByType(int value, String type) {
        System.out.println("Processing " + value + " of type " + type);
    }

    public void processByValue(String type, int value) {
        System.out.println("Processing type " + type + " with value " + value);
    }

    // Or use a parameter object
    public void process(ProcessRequest request) {
        System.out.println("Processing: " + request);
    }

    static class ProcessRequest {
        int value;
        String type;

        ProcessRequest(int value, String type) {
            this.value = value;
            this.type = type;
        }

        @Override
        public String toString() {
            return "value=" + value + ", type=" + type;
        }
    }

    public static void main(String[] args) {
        AvoidAmbiguity obj = new AvoidAmbiguity();

        obj.calculate(1, 2);
        obj.calculate(1, 2, 3);

        obj.processByType(100, "percentage");
        obj.processByValue("percentage", 100);

        obj.process(new ProcessRequest(50, "score"));
    }
}
\`\`\`

### **3. Document Overloaded Methods Clearly**
\`\`\`java
public class DocumentedOverloading {
    /**
     * Prints the given message to the console.
     *
     * @param message the message to print
     */
    public void print(String message) {
        System.out.println(message);
    }

    /**
     * Prints the given message multiple times to the console.
     *
     * @param message the message to print
     * @param times the number of times to print the message (must be positive)
     */
    public void print(String message, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(message);
        }
    }

    /**
     * Prints the given number to the console.
     *
     * @param number the number to print
     */
    public void print(int number) {
        System.out.println(number);
    }

    /**
     * Prints the elements of the given array to the console.
     *
     * @param array the array whose elements to print
     */
    public void print(int[] array) {
        for (int value : array) {
            System.out.print(value + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        DocumentedOverloading obj = new DocumentedOverloading();

        obj.print("Hello World");
        obj.print("Hello", 3);
        obj.print(42);
        obj.print(new int[]{1, 2, 3, 4, 5});
    }
}
\`\`\`

---

## 🔄 Overloading vs Overriding

### **Key Differences**
\`\`\`java
public class OverloadingVsOverriding {
    // Overloading: Multiple methods with same name, different parameters
    public void method(int a) {
        System.out.println("Overloaded method with int: " + a);
    }

    public void method(String a) {
        System.out.println("Overloaded method with String: " + a);
    }

    // Overriding would be in a subclass
    public void overridableMethod() {
        System.out.println("Base class implementation");
    }
}

// Subclass demonstrating overriding
class SubClass extends OverloadingVsOverriding {
    // This is overriding, not overloading
    @Override
    public void overridableMethod() {
        System.out.println("Subclass implementation");
    }

    // This adds overloading to the subclass
    public void overridableMethod(String message) {
        System.out.println("Overloaded in subclass: " + message);
    }
}

public class OverrideDemo {
    public static void main(String[] args) {
        OverloadingVsOverriding base = new OverloadingVsOverriding();
        SubClass sub = new SubClass();

        // Overloading examples
        base.method(42);
        base.method("Hello");

        // Overriding example
        base.overridableMethod();  // Base implementation
        sub.overridableMethod();   // Subclass implementation

        // Subclass overloading
        sub.overridableMethod("Extra parameter");
    }
}
\`\`\`

---

## 🎯 When to Use Method Overloading

### **Appropriate Use Cases**
\`\`\`java
public class AppropriateOverloading {
    // ✅ Good: Mathematical operations
    public double max(double a, double b) {
        return Math.max(a, b);
    }

    public double max(double a, double b, double c) {
        return Math.max(Math.max(a, b), c);
    }

    // ✅ Good: Collection operations
    public <T> void add(java.util.List<T> list, T element) {
        list.add(element);
    }

    public <T> void add(java.util.List<T> list, java.util.Collection<T> elements) {
        list.addAll(elements);
    }

    // ✅ Good: String operations
    public String join(String separator, String... parts) {
        return String.join(separator, parts);
    }

    public String join(java.util.List<String> parts) {
        return String.join(", ", parts);
    }

    // ✅ Good: File operations
    public void save(String filename, String content) throws java.io.IOException {
        java.nio.file.Files.write(java.nio.file.Paths.get(filename),
                                content.getBytes());
    }

    public void save(String filename, byte[] content) throws java.io.IOException {
        java.nio.file.Files.write(java.nio.file.Paths.get(filename), content);
    }

    public static void main(String[] args) {
        AppropriateOverloading obj = new AppropriateOverloading();

        System.out.println("Max of 2: " + obj.max(1.5, 2.7));
        System.out.println("Max of 3: " + obj.max(1.5, 2.7, 0.8));

        java.util.List<String> list = new java.util.ArrayList<>();
        obj.add(list, "single item");
        obj.add(list, java.util.Arrays.asList("item1", "item2"));
        System.out.println("List: " + list);

        System.out.println("Joined: " + obj.join("-", "A", "B", "C"));
        System.out.println("Joined list: " + obj.join(java.util.Arrays.asList("X", "Y", "Z")));
    }
}
\`\`\`

### **When NOT to Use Overloading**
\`\`\`java
public class AvoidOverloading {
    // ❌ Bad: Overloading with completely different behaviors
    // public void process(String data) { /* parse as XML */ }
    // public void process(int data) { /* calculate factorial */ }

    // ✅ Better: Use different method names
    public void parseXml(String xmlData) { }
    public int calculateFactorial(int n) { }

    // ❌ Bad: Overloading based on return type only
    // public int convert(String value) { return Integer.parseInt(value); }
    // public double convert(String value) { return Double.parseDouble(value); }

    // ✅ Better: Use different method names
    public int toInt(String value) { return Integer.parseInt(value); }
    public double toDouble(String value) { return Double.parseDouble(value); }

    // ❌ Bad: Too many overloads (hard to maintain)
    // Consider using parameter objects or method chaining instead

    public static void main(String[] args) {
        AvoidOverloading obj = new AvoidOverloading();

        obj.parseXml("<xml>data</xml>");
        System.out.println("Factorial: " + obj.calculateFactorial(5));

        System.out.println("To int: " + obj.toInt("42"));
        System.out.println("To double: " + obj.toDouble("3.14"));
    }
}
\`\`\`

Method overloading is a powerful feature that enables more intuitive and flexible APIs. Use it when methods perform conceptually similar operations but with different inputs, and avoid it when the operations are fundamentally different! 🔄`
};



