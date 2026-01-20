import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_4: SubLesson = {
  id: "6.4",
  title: 'Class Members',
  status: 'completed',
  content: "`# ðŸ‘¥ Class Members in Java

Class members include fields, methods, constructors, and nested classes. Understanding the different types of members and their scopes is essential for designing well-structured Java classes.

---

## ðŸ“Š Instance Members vs Static Members

### **Instance Members**
\`"\`\`java
public class InstanceMembers {
    // Instance fields - each object has its own copy
    private String name;
    private int age;

    // Instance constructor
    public InstanceMembers(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Instance methods - operate on instance data
    public void introduce() {
        System.out.println("Hi, I'm " + name + " and I'm " + age + " years old.");
    }

    public void haveBirthday() {
        age++;  // Modifies this object's age
        System.out.println("Happy birthday! Now I'm " + age + " years old.");
    }

    public static void main(String[] args) {
        InstanceMembers person1 = new InstanceMembers("Alice", 25);
        InstanceMembers person2 = new InstanceMembers("Bob", 30);

        person1.introduce();  // Alice's introduction
        person2.introduce();  // Bob's introduction

        person1.haveBirthday();  // Only affects Alice
        person1.introduce();    // Alice is now 26
        person2.introduce();    // Bob is still 30
    }
}
\`\`\`

### **Static Members**
\`\`\`java
public class StaticMembers {
    // Static field - shared by all instances of the class
    private static int instanceCount = 0;

    // Static constant
    public static final double PI = 3.14159;

    // Instance field
    private String name;

    public StaticMembers(String name) {
        this.name = name;
        instanceCount++;  // Increment shared counter
    }

    // Instance method
    public void displayInfo() {
        System.out.println("Name: " + name + ", Instance count: " + instanceCount);
    }

    // Static method - can be called without creating an instance
    public static int getInstanceCount() {
        return instanceCount;
    }

    public static double calculateCircleArea(double radius) {
        return PI * radius * radius;  // Uses static constant
    }

    public static void main(String[] args) {
        // Call static method without creating instance
        System.out.println("Initial count: " + StaticMembers.getInstanceCount());

        StaticMembers obj1 = new StaticMembers("First");
        StaticMembers obj2 = new StaticMembers("Second");

        obj1.displayInfo();  // Shows count: 2
        obj2.displayInfo();  // Shows count: 2

        // Call static method
        double area = StaticMembers.calculateCircleArea(5.0);
        System.out.println("Circle area: " + area);
        System.out.println("Total instances: " + StaticMembers.getInstanceCount());
    }
}
\`\`\`

---

## ðŸ”’ Access Modifiers

### **Public Members**
\`\`\`java
public class PublicMembers {
    public String publicField = "Anyone can access me";

    public void publicMethod() {
        System.out.println("Anyone can call me");
    }

    public static void main(String[] args) {
        PublicMembers obj = new PublicMembers();
        System.out.println(obj.publicField);  // Accessible
        obj.publicMethod();                   // Accessible
    }
}

// Another class can access public members
class OtherClass {
    public void accessPublicMembers() {
        PublicMembers obj = new PublicMembers();
        obj.publicField = "Modified";        // Can modify
        obj.publicMethod();                   // Can call
    }
}
\`\`\`

### **Private Members**
\`\`\`java
public class PrivateMembers {
    private String secretData = "This is private";
    private int secretNumber = 42;

    private void secretMethod() {
        System.out.println("This method is private");
    }

    // Public method to access private data
    public String getSecretData() {
        return secretData;
    }

    // Public method to modify private data (with validation)
    public void setSecretData(String data) {
        if (data != null && !data.isEmpty()) {
            this.secretData = data;
        }
    }

    public static void main(String[] args) {
        PrivateMembers obj = new PrivateMembers();

        // Cannot access private members directly
        // System.out.println(obj.secretData);    // Compilation error
        // obj.secretMethod();                    // Compilation error

        // Must use public methods
        System.out.println(obj.getSecretData());
        obj.setSecretData("New secret");
        System.out.println(obj.getSecretData());
    }
}
\`\`\`

### **Protected Members**
\`\`\`java
public class ProtectedMembers {
    protected String protectedField = "Accessible in subclass and same package";

    protected void protectedMethod() {
        System.out.println("Protected method");
    }
}

// Subclass in same package
class SubClass extends ProtectedMembers {
    public void accessProtected() {
        System.out.println(protectedField);  // Can access
        protectedMethod();                   // Can call
    }
}

// Class in different package
class OtherPackageClass {
    public void tryAccessProtected() {
        ProtectedMembers obj = new ProtectedMembers();
        // obj.protectedField = "test";  // Compilation error - different package
        // obj.protectedMethod();        // Compilation error - different package
    }
}
\`\`\`

### **Default (Package-Private) Members**
\`\`\`java
class DefaultMembers {
    String defaultField = "Accessible within same package";

    void defaultMethod() {
        System.out.println("Default method");
    }
}

// Same package - can access
class SamePackageClass {
    public void accessDefault() {
        DefaultMembers obj = new DefaultMembers();
        obj.defaultField = "Modified";     // Can access
        obj.defaultMethod();               // Can call
    }
}

// Different package - cannot access
// class DifferentPackageClass {
//     public void tryAccessDefault() {
//         DefaultMembers obj = new DefaultMembers();
//         obj.defaultField = "test";    // Compilation error
//         obj.defaultMethod();          // Compilation error
//     }
// }
\`\`\`

---

## ðŸ—ï¸ Nested Classes

### **Static Nested Classes**
\`\`\`java
public class OuterClass {
    private static String staticField = "Static field";
    private String instanceField = "Instance field";

    // Static nested class
    public static class StaticNested {
        public void accessOuter() {
            System.out.println(staticField);      // Can access static members
            // System.out.println(instanceField); // Cannot access instance members
        }
    }

    public static void main(String[] args) {
        // Create nested class instance without outer class instance
        StaticNested nested = new StaticNested();
        nested.accessOuter();
    }
}
\`\`\`

### **Inner Classes (Non-static Nested Classes)**
\`\`\`java
public class OuterClassWithInner {
    private String outerField = "Outer field";

    // Inner class
    public class InnerClass {
        private String innerField = "Inner field";

        public void accessOuter() {
            System.out.println(outerField);    // Can access outer class members
            System.out.println(innerField);    // Can access own members
        }

        public void accessOuterMethod() {
            outerMethod();  // Can call outer class methods
        }
    }

    public void outerMethod() {
        System.out.println("Outer method called from inner class");
    }

    public void createInner() {
        InnerClass inner = new InnerClass();
        inner.accessOuter();
        inner.accessOuterMethod();
    }

    public static void main(String[] args) {
        OuterClassWithInner outer = new OuterClassWithInner();
        outer.createInner();

        // Create inner class instance through outer class instance
        OuterClassWithInner.InnerClass inner = outer.new InnerClass();
        inner.accessOuter();
    }
}
\`\`\`

### **Local Classes**
\`\`\`java
public class LocalClasses {
    public void methodWithLocalClass() {
        final String localVariable = "Local variable";

        // Local class defined inside a method
        class LocalClass {
            public void display() {
                System.out.println("Accessing: " + localVariable);
            }
        }

        LocalClass local = new LocalClass();
        local.display();
    }

    public static void main(String[] args) {
        LocalClasses obj = new LocalClasses();
        obj.methodWithLocalClass();
    }
}
\`\`\`

### **Anonymous Classes**
\`\`\`java
public class AnonymousClasses {
    // Interface or abstract class
    interface Greeting {
        void greet(String name);
    }

    public void useAnonymousClass() {
        // Anonymous class implementing the interface
        Greeting greeting = new Greeting() {
            @Override
            public void greet(String name) {
                System.out.println("Hello, " + name + "! Nice to meet you!");
            }
        };

        greeting.greet("Alice");
    }

    public static void main(String[] args) {
        AnonymousClasses obj = new AnonymousClasses();
        obj.useAnonymousClass();
    }
}
\`\`\`

---

## ðŸŽ¯ Member Initialization Order

### **Class Loading and Initialization**
\`\`\`java
public class InitializationOrder {
    // Static field initialization
    private static String staticField = "Static field";

    // Static initializer block
    static {
        System.out.println("Static initializer block: " + staticField);
        staticField = "Modified in static block";
    }

    // Instance field initialization
    private String instanceField = "Instance field";

    // Instance initializer block
    {
        System.out.println("Instance initializer block: " + instanceField);
        instanceField = "Modified in instance block";
    }

    // Constructor
    public InitializationOrder() {
        System.out.println("Constructor: " + instanceField);
        instanceField = "Modified in constructor";
    }

    public static void main(String[] args) {
        System.out.println("1. Class loading triggers static initialization");
        System.out.println("2. Static field value: " + staticField);

        System.out.println("3. Creating first instance:");
        InitializationOrder obj1 = new InitializationOrder();

        System.out.println("4. Creating second instance:");
        InitializationOrder obj2 = new InitializationOrder();
    }
}
\`\`\`

---

## ðŸ“Š Member Visibility Summary

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | âœ… | âœ… | âœ… | âœ… |
| protected | âœ… | âœ… | âœ… | âŒ |
| default | âœ… | âœ… | âŒ | âŒ |
| private | âœ… | âŒ | âŒ | âŒ |

---

## ðŸŽ¯ Best Practices for Class Members

### **1. Encapsulation**
\`\`\`java
public class EncapsulatedClass {
    // Private fields
    private String name;
    private int age;

    // Public constructor
    public EncapsulatedClass(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Public getters
    public String getName() { return name; }
    public int getAge() { return age; }

    // Public setters with validation
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        }
    }

    // Business logic methods
    public void celebrateBirthday() {
        age++;  // Direct access to private field within the class
    }
}
\`\`\`

### **2. Static Members Usage**
\`\`\`java
public class StaticMembersBestPractices {
    // Constants should be static final
    public static final double PI = 3.14159;
    public static final int MAX_USERS = 1000;

    // Utility methods should be static
    public static boolean isValidEmail(String email) {
        return email != null && email.contains("@");
    }

    public static String capitalize(String text) {
        if (text == null || text.isEmpty()) return text;
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
    }

    // Instance count (acceptable use of static field)
    private static int instanceCount = 0;

    private String name;

    public StaticMembersBestPractices(String name) {
        this.name = name;
        instanceCount++;
    }

    public static int getInstanceCount() {
        return instanceCount;
    }

    public static void main(String[] args) {
        StaticMembersBestPractices obj1 = new StaticMembersBestPractices("Alice");
        StaticMembersBestPractices obj2 = new StaticMembersBestPractices("Bob");

        System.out.println("Email valid: " + StaticMembersBestPractices.isValidEmail("test@example.com"));
        System.out.println("Capitalized: " + StaticMembersBestPractices.capitalize("hello"));
        System.out.println("Instance count: " + StaticMembersBestPractices.getInstanceCount());
    }
}
\`\`\`

### **3. Choosing Access Modifiers**
\`\`\`java
public class AccessModifierChoices {
    // Public constants
    public static final String COMPANY_NAME = "ABC Corp";

    // Private implementation details
    private String internalData;
    private void internalMethod() { }

    // Protected for inheritance
    protected void customizableMethod() {
        // Base implementation that subclasses can modify
    }

    // Package-private for package-level utilities
    void packageUtility() {
        // Only accessible within the same package
    }

    // Public API methods
    public void publicApiMethod() {
        // This is the public interface of the class
        internalMethod();  // Can call private methods
        customizableMethod();  // Can call protected methods
    }
}
\`\`\`

### **4. Nested Classes Usage**
\`\`\`java
public class NestedClassPatterns {
    private String outerData;

    // Static nested class for helper/utility classes
    public static class Helper {
        public static String formatData(String data) {
            return "Formatted: " + data;
        }
    }

    // Inner class for classes that need access to outer instance
    public class EventHandler {
        public void handleEvent() {
            System.out.println("Handling event for: " + outerData);
        }
    }

    // Local class for method-specific logic
    public void processData() {
        final String methodData = "Method data";

        class DataProcessor {
            public void process() {
                System.out.println("Processing: " + methodData + " for " + outerData);
            }
        }

        DataProcessor processor = new DataProcessor();
        processor.process();
    }

    public static void main(String[] args) {
        // Static nested class usage
        String formatted = NestedClassPatterns.Helper.formatData("test");
        System.out.println(formatted);

        // Inner class usage
        NestedClassPatterns outer = new NestedClassPatterns();
        outer.outerData = "Outer data";
        EventHandler handler = outer.new EventHandler();
        handler.handleEvent();

        // Local class usage
        outer.processData();
    }
}
\`\`\`

Class members form the structure and behavior of your classes. Proper use of access modifiers, understanding static vs instance members, and appropriate use of nested classes leads to well-designed, maintainable Java code! ðŸ‘¥`
};




