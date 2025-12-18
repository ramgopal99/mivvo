import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_3: SubLesson = {
  id: "8.3",
  title: 'Constructors and Initialization',
  status: 'completed',
  content: `# 🏗️ Constructors and Initialization in Java

Master object initialization and constructor design patterns!

---

## 🎯 What is a Constructor?

A **constructor** is a special method that is called when an object is instantiated. It initializes the object's state and performs any necessary setup.

### **Key Characteristics:**
- Same name as the class
- No return type (not even void)
- Called automatically when object is created
- Can be overloaded

---

## 📝 Constructor Types

### **1. Default Constructor**
\`\`\`java
public class Person {
    private String name;
    private int age;

    // Default constructor (no parameters)
    public Person() {
        // Initialize with default values
        this.name = "Unknown";
        this.age = 0;
        System.out.println("Default constructor called");
    }

    public static void main(String[] args) {
        Person person = new Person(); // Calls default constructor
    }
}
\`\`\`

### **2. Parameterized Constructor**
\`\`\`java
public class Person {
    private String name;
    private int age;

    // Parameterized constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Parameterized constructor called");
    }

    public static void main(String[] args) {
        Person person1 = new Person(); // Error: no default constructor
        Person person2 = new Person("Alice", 25); // OK
    }
}
\`\`\`

### **3. Copy Constructor**
\`\`\`java
public class Person {
    private String name;
    private int age;

    // Copy constructor
    public Person(Person other) {
        this.name = other.name;
        this.age = other.age;
        System.out.println("Copy constructor called");
    }

    // Regular constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        Person original = new Person("Bob", 30);
        Person copy = new Person(original); // Creates a copy
    }
}
\`\`\`

---

## 🔄 Constructor Overloading

\`\`\`java
public class Rectangle {
    private double length;
    private double width;

    // Default constructor
    public Rectangle() {
        this.length = 1.0;
        this.width = 1.0;
    }

    // Constructor with one parameter (square)
    public Rectangle(double side) {
        this.length = side;
        this.width = side;
    }

    // Constructor with two parameters
    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    // Constructor with different parameter types
    public Rectangle(String dimensions) {
        String[] parts = dimensions.split("x");
        this.length = Double.parseDouble(parts[0]);
        this.width = Double.parseDouble(parts[1]);
    }

    public double getArea() {
        return length * width;
    }

    public static void main(String[] args) {
        Rectangle rect1 = new Rectangle();              // 1.0 x 1.0
        Rectangle rect2 = new Rectangle(5.0);           // 5.0 x 5.0 (square)
        Rectangle rect3 = new Rectangle(3.0, 4.0);      // 3.0 x 4.0
        Rectangle rect4 = new Rectangle("10.5x20.3");   // 10.5 x 20.3

        System.out.println("Areas: " + rect1.getArea() + ", " +
                          rect2.getArea() + ", " + rect3.getArea() + ", " + rect4.getArea());
    }
}
\`\`\`

---

## 🔗 Constructor Chaining

### **this() - Same Class Constructor**
\`\`\`java
public class Employee {
    private String name;
    private String department;
    private double salary;

    // Constructor with all parameters
    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Constructor chaining with this()
    public Employee(String name, String department) {
        this(name, department, 50000.0); // Calls the 3-parameter constructor
    }

    // Another chained constructor
    public Employee(String name) {
        this(name, "General"); // Calls the 2-parameter constructor
    }

    public static void main(String[] args) {
        Employee emp1 = new Employee("John", "IT", 75000.0);
        Employee emp2 = new Employee("Jane", "HR");      // salary = 50000.0
        Employee emp3 = new Employee("Bob");             // department = "General", salary = 50000.0
    }
}
\`\`\`

### **super() - Parent Class Constructor**
\`\`\`java
public class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Animal constructor called");
    }
}

public class Dog extends Animal {
    private String breed;

    // Constructor chaining with super()
    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor first
        this.breed = breed;
        System.out.println("Dog constructor called");
    }

    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");
        // Output:
        // Animal constructor called
        // Dog constructor called
    }
}
\`\`\`

---

## 🎯 Initialization Blocks

### **1. Instance Initialization Block**
\`\`\`java
public class InstanceBlock {
    private int value;
    private String message;

    // Instance initialization block
    {
        value = 42;
        message = "Initialized";
        System.out.println("Instance block executed");
    }

    // Constructor
    public InstanceBlock() {
        System.out.println("Constructor executed");
    }

    // Constructor with parameter
    public InstanceBlock(int customValue) {
        this.value = customValue;
        System.out.println("Parameterized constructor executed");
    }

    public static void main(String[] args) {
        System.out.println("Creating first object:");
        InstanceBlock obj1 = new InstanceBlock();

        System.out.println("\\nCreating second object:");
        InstanceBlock obj2 = new InstanceBlock(100);

        // Output shows instance block runs before each constructor
    }
}
\`\`\`

### **2. Static Initialization Block**
\`\`\`java
public class StaticBlock {
    private static int counter;
    private static String appName;

    // Static initialization block
    static {
        counter = 0;
        appName = "My Application";
        System.out.println("Static block executed (only once)");
        // Can perform complex initialization
    }

    // Constructor
    public StaticBlock() {
        counter++;
        System.out.println("Object created. Total objects: " + counter);
    }

    public static void main(String[] args) {
        System.out.println("Starting application: " + appName);
        StaticBlock obj1 = new StaticBlock(); // Static block runs first
        StaticBlock obj2 = new StaticBlock(); // Static block doesn't run again
    }
}
\`\`\`

### **3. Order of Execution**
\`\`\`java
public class InitializationOrder {
    private String instanceVar = "Instance Variable";

    // Static block
    static {
        System.out.println("1. Static block");
    }

    // Instance block
    {
        System.out.println("3. Instance block");
        System.out.println("Instance var: " + instanceVar);
    }

    // Constructor
    public InitializationOrder() {
        System.out.println("4. Constructor");
    }

    public static void main(String[] args) {
        System.out.println("2. Before object creation");
        InitializationOrder obj = new InitializationOrder();
        System.out.println("5. After object creation");
    }
}

/* Output:
1. Static block
2. Before object creation
3. Instance block
Instance var: Instance Variable
4. Constructor
5. After object creation
*/
\`\`\`

---

## ⚠️ Common Constructor Issues

### **1. Constructor Not Calling super()**
\`\`\`java
public class Parent {
    public Parent() {
        System.out.println("Parent constructor");
    }
}

public class Child extends Parent {
    public Child() {
        // super() is called automatically here
        System.out.println("Child constructor");
    }
}
\`\`\`

### **2. this() and super() Cannot Both Be First**
\`\`\`java
public class Test {
    public Test() {
        // this(42);  // This would work
        // super();    // But not both - compilation error
    }

    public Test(int value) {
        // Constructor logic
    }
}
\`\`\`

### **3. Recursive Constructor Calls**
\`\`\`java
public class BadExample {
    public BadExample() {
        // this(); // Infinite recursion! Compilation error
    }
}
\`\`\`

---

## 🎨 Constructor Design Patterns

### **1. Builder Pattern**
\`\`\`java
public class User {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final int age;
    private final String address;

    private User(Builder builder) {
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.email = builder.email;
        this.age = builder.age;
        this.address = builder.address;
    }

    public static class Builder {
        private String firstName;
        private String lastName;
        private String email;
        private int age;
        private String address;

        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }

    // Usage
    public static void main(String[] args) {
        User user = new User.Builder()
            .firstName("John")
            .lastName("Doe")
            .email("john@example.com")
            .age(30)
            .address("123 Main St")
            .build();
    }
}
\`\`\`

### **2. Factory Method Pattern**
\`\`\`java
public abstract class Shape {
    public abstract void draw();

    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle":
                return new Circle();
            case "rectangle":
                return new Rectangle();
            case "triangle":
                return new Triangle();
            default:
                throw new IllegalArgumentException("Unknown shape type");
        }
    }
}

public class Circle extends Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}

// Usage
public class FactoryExample {
    public static void main(String[] args) {
        Shape circle = Shape.createShape("circle");
        circle.draw(); // Drawing a circle
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Constructors** initialize objects when created with \`new\`
2. **Constructor Overloading** allows multiple ways to create objects
3. **Constructor Chaining** uses \`this()\` and \`super()\` for code reuse
4. **Initialization Order**: Static blocks → Instance blocks → Constructors
5. **Design Patterns**: Builder pattern for complex object creation
6. **Best Practices**: Keep constructors simple, use factories for complex logic

**Next:** Learn about methods and encapsulation! 🚀`
};

