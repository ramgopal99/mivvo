import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_2: SubLesson = {
  id: "6.2",
  title: 'Creating Classes',
  status: 'completed',
  content: "`# ðŸ­ Creating Classes in Java

Creating well-designed classes is fundamental to Java programming. A class definition includes fields, constructors, methods, and proper encapsulation. Understanding class creation patterns leads to maintainable and reusable code.

---

## ðŸ“‹ Class Declaration Syntax

### **Basic Class Structure**
\`"\`\`java
// Complete class declaration
public class Car {
    // Fields (instance variables)
    private String make;
    private String model;
    private int year;
    private String color;

    // Constructor
    public Car(String make, String model, int year, String color) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
    }

    // Methods
    public void start() {
        System.out.println("Starting the " + year + " " + make + " " + model);
    }

    public void drive(int speed) {
        System.out.println("Driving at " + speed + " mph");
    }

    public String getDescription() {
        return color + " " + year + " " + make + " " + model;
    }

    // Getters
    public String getMake() { return make; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public String getColor() { return color; }

    // Setters
    public void setColor(String color) { this.color = color; }
}

// Usage
public class ClassCreationDemo {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Camry", 2020, "Blue");
        System.out.println(myCar.getDescription());
        myCar.start();
        myCar.drive(60);
    }
}
\`\`\`

### **Class Declaration Components**
\`\`\`java
// 1. Access modifiers
public class PublicClass { }        // Accessible everywhere
class PackagePrivateClass { }      // Accessible within package only

// 2. Class modifiers
public final class FinalClass { }   // Cannot be extended
public abstract class AbstractClass { } // Cannot be instantiated directly

// 3. Inheritance
public class SubClass extends SuperClass { }

// 4. Interfaces
public class ImplementingClass implements Interface1, Interface2 { }

// 5. Generic classes
public class GenericClass<T> {
    private T value;

    public GenericClass(T value) {
        this.value = value;
    }

    public T getValue() {
        return value;
    }
}
\`\`\`

---

## ðŸ”§ Fields (Instance Variables)

### **Field Declaration and Types**
\`\`\`java
public class FieldTypes {
    // Primitive type fields
    private int age;
    private double salary;
    private boolean isActive;
    private char grade;

    // Reference type fields
    private String name;
    private java.util.Date birthDate;
    private java.util.List<String> hobbies;

    // Array fields
    private int[] scores;
    private String[] tags;

    // Custom object fields
    private Address address;
    private Person spouse;

    // Static fields (shared by all instances)
    private static int instanceCount = 0;

    // Final fields (constants)
    private final String SOCIAL_SECURITY_NUMBER;
    private static final double PI = 3.14159;

    // Constructor
    public FieldTypes(String ssn) {
        this.SOCIAL_SECURITY_NUMBER = ssn;
        instanceCount++;
    }

    public static int getInstanceCount() {
        return instanceCount;
    }
}

// Supporting classes
class Address {
    String street, city, state, zipCode;
}

class Person {
    String name;
    int age;
}
\`\`\`

### **Field Initialization**
\`\`\`java
public class FieldInitialization {
    // 1. Declaration-time initialization
    private int defaultValue = 42;
    private String defaultName = "Unknown";

    // 2. Instance initializer block
    {
        System.out.println("Instance initializer block executed");
        // Complex initialization logic
    }

    // 3. Constructor initialization (recommended)
    private String requiredField;

    public FieldInitialization(String requiredValue) {
        this.requiredField = requiredValue;
        System.out.println("Constructor executed");
    }

    // 4. Lazy initialization
    private java.util.List<String> expensiveList;

    public java.util.List<String> getExpensiveList() {
        if (expensiveList == null) {
            expensiveList = new java.util.ArrayList<>();
            // Expensive initialization
            expensiveList.add("Initialized lazily");
        }
        return expensiveList;
    }

    public static void main(String[] args) {
        FieldInitialization obj = new FieldInitialization("Required Value");
        System.out.println("Default value: " + obj.defaultValue);
        System.out.println("Lazy list: " + obj.getExpensiveList());
    }
}
\`\`\`

---

## ðŸ—ï¸ Constructors

### **Constructor Types and Overloading**
\`\`\`java
public class ConstructorExamples {
    private String name;
    private int age;
    private String email;
    private boolean isActive;

    // 1. Default constructor (no parameters)
    public ConstructorExamples() {
        this.name = "Unknown";
        this.age = 0;
        this.email = "unknown@example.com";
        this.isActive = false;
    }

    // 2. Parameterized constructor
    public ConstructorExamples(String name, int age) {
        this.name = name;
        this.age = age;
        this.email = name.toLowerCase() + "@example.com";
        this.isActive = true;
    }

    // 3. Full constructor
    public ConstructorExamples(String name, int age, String email, boolean isActive) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.isActive = isActive;
    }

    // 4. Copy constructor
    public ConstructorExamples(ConstructorExamples other) {
        this.name = other.name;
        this.age = other.age;
        this.email = other.email;
        this.isActive = other.isActive;
    }

    @Override
    public String toString() {
        return "ConstructorExamples{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", email='" + email + '\'' +
            ", isActive=" + isActive +
            '}';
    }

    public static void main(String[] args) {
        ConstructorExamples person1 = new ConstructorExamples();
        ConstructorExamples person2 = new ConstructorExamples("Alice", 25);
        ConstructorExamples person3 = new ConstructorExamples("Bob", 30, "bob@email.com", true);
        ConstructorExamples person4 = new ConstructorExamples(person3); // Copy

        System.out.println(person1);
        System.out.println(person2);
        System.out.println(person3);
        System.out.println(person4);
    }
}
\`\`\`

### **Constructor Chaining and this()**
\`\`\`java
public class ConstructorChaining {
    private String firstName;
    private String lastName;
    private String fullName;
    private int age;
    private String department;

    // Constructor with all parameters
    public ConstructorChaining(String firstName, String lastName, int age, String department) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
        this.age = age;
        this.department = department;
    }

    // Constructor chaining with this()
    public ConstructorChaining(String firstName, String lastName, int age) {
        this(firstName, lastName, age, "General");
    }

    public ConstructorChaining(String firstName, String lastName) {
        this(firstName, lastName, 0, "General");
    }

    public ConstructorChaining(String fullName) {
        // Parse full name
        String[] parts = fullName.split(" ");
        this.firstName = parts.length > 0 ? parts[0] : "";
        this.lastName = parts.length > 1 ? parts[1] : "";
        this.fullName = fullName;
        this.age = 0;
        this.department = "General";
    }

    @Override
    public String toString() {
        return fullName + " (" + age + ") - " + department;
    }

    public static void main(String[] args) {
        ConstructorChaining emp1 = new ConstructorChaining("John", "Doe", 30, "Engineering");
        ConstructorChaining emp2 = new ConstructorChaining("Jane", "Smith", 25); // Uses chaining
        ConstructorChaining emp3 = new ConstructorChaining("Bob", "Johnson"); // Uses chaining
        ConstructorChaining emp4 = new ConstructorChaining("Alice Cooper"); // Different constructor

        System.out.println(emp1);
        System.out.println(emp2);
        System.out.println(emp3);
        System.out.println(emp4);
    }
}
\`\`\`

---

## ðŸ”„ Methods in Classes

### **Instance Methods**
\`\`\`java
public class InstanceMethods {
    private int value;

    public InstanceMethods(int value) {
        this.value = value;
    }

    // Instance methods can access instance fields
    public void increment() {
        value++;
    }

    public void add(int amount) {
        value += amount;
    }

    public int getValue() {
        return value;
    }

    public void printInfo() {
        System.out.println("Current value: " + value);
    }

    // Instance methods can call other instance methods
    public void incrementAndPrint() {
        increment();
        printInfo();
    }

    public static void main(String[] args) {
        InstanceMethods counter = new InstanceMethods(10);
        counter.incrementAndPrint(); // 11
        counter.add(5);
        counter.printInfo(); // 16
    }
}
\`\`\`

### **Static Methods**
\`\`\`java
public class StaticMethods {
    private static int instanceCount = 0;
    private int instanceValue;

    public StaticMethods(int value) {
        this.instanceValue = value;
        instanceCount++;
    }

    // Static method - belongs to the class
    public static int getInstanceCount() {
        return instanceCount;
    }

    // Static method cannot access instance fields
    // public static void printInstanceValue() {
    //     System.out.println(instanceValue); // Compilation error
    // }

    // Static utility method
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static int max(int a, int b) {
        return a > b ? a : b;
    }

    // Instance method can call static methods
    public void printComparison() {
        int max = max(instanceValue, 100);
        System.out.println("Max of " + instanceValue + " and 100: " + max);
    }

    public static void main(String[] args) {
        StaticMethods obj1 = new StaticMethods(50);
        StaticMethods obj2 = new StaticMethods(75);

        // Call static method on class
        System.out.println("Total instances: " + StaticMethods.getInstanceCount());
        System.out.println("Is 42 even? " + StaticMethods.isEven(42));

        // Call instance method
        obj1.printComparison();
    }
}
\`\`\`

---

## ðŸŽ¯ Class Design Best Practices

### **Encapsulation**
\`\`\`java
public class EncapsulatedClass {
    // Private fields
    private String name;
    private int age;
    private double salary;

    // Public constructor
    public EncapsulatedClass(String name, int age, double salary) {
        setName(name);
        setAge(age);
        setSalary(salary);
    }

    // Public getters
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getSalary() { return salary; }

    // Public setters with validation
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        } else {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
    }

    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            throw new IllegalArgumentException("Salary cannot be negative");
        }
    }

    // Business logic method
    public void giveRaise(double percentage) {
        if (percentage > 0 && percentage <= 50) {
            salary *= (1 + percentage / 100);
        } else {
            throw new IllegalArgumentException("Raise percentage must be between 1 and 50");
        }
    }

    @Override
    public String toString() {
        return "Employee{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", salary=" + String.format("%.2f", salary) +
            '}';
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        EncapsulatedClass employee = new EncapsulatedClass("Alice", 30, 50000);
        System.out.println(employee);

        employee.giveRaise(10);
        System.out.println("After raise: " + employee);
    }
}
\`\`\`

---

## ðŸ“š Advanced Class Creation Patterns

### **Builder Pattern for Complex Objects**
\`\`\`java
public class BuilderPattern {
    private final String name;
    private final int age;
    private final String email;
    private final String address;
    private final boolean isActive;

    // Private constructor - only accessible through Builder
    private BuilderPattern(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
        this.address = builder.address;
        this.isActive = builder.isActive;
    }

    // Static Builder class
    public static class Builder {
        private String name;
        private int age;
        private String email;
        private String address;
        private boolean isActive = true;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder isActive(boolean isActive) {
            this.isActive = isActive;
            return this;
        }

        public BuilderPattern build() {
            // Validation
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalStateException("Name is required");
            }
            if (email == null || !email.contains("@")) {
                throw new IllegalStateException("Valid email is required");
            }
            return new BuilderPattern(this);
        }
    }

    @Override
    public String toString() {
        return "BuilderPattern{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", email='" + email + '\'' +
            ", address='" + address + '\'' +
            ", isActive=" + isActive +
            '}';
    }

    public static void main(String[] args) {
        BuilderPattern person = new BuilderPattern.Builder()
            .name("John Doe")
            .age(30)
            .email("john@example.com")
            .address("123 Main St")
            .isActive(true)
            .build();

        System.out.println(person);
    }
}
\`\`\`

### **Immutable Classes**
\`\`\`java
public final class ImmutableClass {
    // Final fields ensure immutability
    private final String name;
    private final int age;
    private final java.util.List<String> hobbies;

    // Constructor
    public ImmutableClass(String name, int age, java.util.List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Defensive copy to prevent external modification
        this.hobbies = hobbies != null ? new java.util.ArrayList<>(hobbies) : new java.util.ArrayList<>();
    }

    // Only getters - no setters
    public String getName() { return name; }
    public int getAge() { return age; }

    // Return defensive copy
    public java.util.List<String> getHobbies() {
        return new java.util.ArrayList<>(hobbies);
    }

    @Override
    public String toString() {
        return "ImmutableClass{" +
            "name='" + name + '\'' +
            ", age=" + age +
            ", hobbies=" + hobbies +
            '}';
    }

    public static void main(String[] args) {
        java.util.List<String> hobbies = java.util.Arrays.asList("Reading", "Swimming");
        ImmutableClass person = new ImmutableClass("Alice", 25, hobbies);

        System.out.println(person);

        // Cannot modify the object
        // person.age = 26; // Compilation error

        // Original list modification doesn't affect the object
        hobbies.add("Running");
        System.out.println("Person hobbies: " + person.getHobbies());
    }
}
\`\`\`

---

## ðŸŽ¯ Class Creation Guidelines

### **1. Single Responsibility Principle**
\`\`\`java
// âœ… Good: Each class has one clear responsibility
public class EmailService {
    public void sendEmail(String to, String subject, String body) { }
}

public class UserRepository {
    public void save(User user) { }
    public User findById(String id) { return null; }
}

public class OrderProcessor {
    public void processOrder(Order order) { }
}

// âŒ Bad: Class trying to do too many things
// public class UtilityClass {
//     public void sendEmail(String to, String subject, String body) { }
//     public void saveToDatabase(Object data) { }
//     public void processPayment(Payment payment) { }
//     public void generateReport() { }
//     // Many unrelated responsibilities
// }
\`\`\`

### **2. Proper Naming Conventions**
\`\`\`java
// âœ… Good class names - nouns, descriptive, PascalCase
public class CustomerOrder { }
public class EmailService { }
public class DatabaseConnection { }
public class PaymentProcessor { }

// âŒ Bad class names
// public class order { }         // Not PascalCase
// public class Customer { }      // Too generic
// public class doSomething { }   // Verb, not noun
// public class Manager { }       // Unclear what it manages

// âœ… Good field names - camelCase, descriptive
public class GoodNaming {
    private String firstName;
    private String lastName;
    private int ageInYears;
    private boolean isActive;

    // âœ… Good method names - verbs, camelCase
    public void calculateTotal() { }
    public void sendNotification() { }
    public boolean isValidEmail() { }
    public String getFullName() { }
    public void setAgeInYears(int age) { }
}

// âŒ Bad field names
// private String fn;             // Unclear abbreviation
// private int a;                 // Single letter
// private boolean flag;          // Unclear what it flags
\`\`\`

### **3. Consistent Constructor Patterns**
\`\`\`java
public class ConstructorPatterns {
    private String name;
    private int age;
    private String email;

    // âœ… Good: All constructors initialize all fields
    public ConstructorPatterns(String name, int age, String email) {
        // Common validation and initialization
        validateAndSetFields(name, age, email);
    }

    public ConstructorPatterns(String name, int age) {
        this(name, age, name.toLowerCase() + "@example.com");
    }

    public ConstructorPatterns(String name) {
        this(name, 0, name.toLowerCase() + "@example.com");
    }

    private void validateAndSetFields(String name, int age, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        this.name = name;
        this.age = age;
        this.email = email;
    }

    @Override
    public String toString() {
        return name + " (" + age + ") - " + email;
    }

    public static void main(String[] args) {
        ConstructorPatterns p1 = new ConstructorPatterns("Alice", 25, "alice@email.com");
        ConstructorPatterns p2 = new ConstructorPatterns("Bob", 30);
        ConstructorPatterns p3 = new ConstructorPatterns("Charlie");

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);
    }
}
\`\`\`

Creating classes properly is essential for building robust Java applications. Following encapsulation principles, using appropriate constructors, and maintaining clean design patterns leads to maintainable and reusable code! ðŸ­`
};




