import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_1: SubLesson = {
  id: "10.1",
  title: 'Abstract Classes and Interfaces',
  status: 'completed',
  content: "`# ðŸŽ¯ Abstract Classes and Interfaces in Java

Abstract classes and interfaces are advanced object-oriented programming concepts that enable abstraction, multiple inheritance, and design flexibility. They provide blueprints for classes and define contracts that implementing classes must follow.

---

## ðŸ“‹ Understanding Abstraction

### **What is Abstraction?**

Abstraction is the process of hiding implementation details and showing only essential features. It allows you to focus on what an object does rather than how it does it.

### **Why Use Abstraction?**

#### **1. Hide Complexity**
Users don't need to know internal implementation details.

#### **2. Provide Contracts**
Define what classes must implement without specifying how.

#### **3. Enable Polymorphism**
Same interface, different implementations.

#### **4. Support Multiple Inheritance**
Java doesn't support multiple class inheritance, but interfaces provide this capability.

---

## ðŸ”· Abstract Classes

### **What is an Abstract Class?**

An abstract class is a class that cannot be instantiated directly and may contain abstract methods (methods without implementation) that must be implemented by subclasses.

### **Abstract Class Syntax**

\`"\`\`java
// Abstract class declaration
public abstract class AbstractClassName {
    // Fields
    protected int field;

    // Concrete methods (with implementation)
    public void concreteMethod() {
        System.out.println("This method has implementation");
    }

    // Abstract methods (without implementation)
    public abstract void abstractMethod();

    // Constructor (can have constructors)
    public AbstractClassName(int field) {
        this.field = field;
    }
}
\`\`\`

### **Complete Abstract Class Example**

\`\`\`java
// Abstract base class for all shapes
public abstract class Shape {
    protected String color;
    protected String name;

    // Constructor
    public Shape(String color, String name) {
        this.color = color;
        this.name = name;
    }

    // Concrete method - all shapes can display their info
    public void displayInfo() {
        System.out.println("Shape: " + name);
        System.out.println("Color: " + color);
        System.out.println("Area: " + getArea());
        System.out.println("Perimeter: " + getPerimeter());
    }

    // Abstract methods - must be implemented by subclasses
    public abstract double getArea();
    public abstract double getPerimeter();

    // Concrete method using abstract methods
    public boolean isLargerThan(Shape other) {
        return this.getArea() > other.getArea();
    }

    // Getters
    public String getColor() { return color; }
    public String getName() { return name; }
}

// Concrete implementation 1
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color, "Circle");
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }

    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }

    public double getRadius() {
        return radius;
    }
}

// Concrete implementation 2
public class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color, "Rectangle");
        this.length = length;
        this.width = width;
    }

    @Override
    public double getArea() {
        return length * width;
    }

    @Override
    public double getPerimeter() {
        return 2 * (length + width);
    }

    public double getLength() { return length; }
    public double getWidth() { return width; }
}

// Concrete implementation 3
public class Triangle extends Shape {
    private double base;
    private double height;
    private double side1;
    private double side2;

    public Triangle(String color, double base, double height, double side1, double side2) {
        super(color, "Triangle");
        this.base = base;
        this.height = height;
        this.side1 = side1;
        this.side2 = side2;
    }

    @Override
    public double getArea() {
        return 0.5 * base * height;
    }

    @Override
    public double getPerimeter() {
        return base + side1 + side2;
    }

    public double getBase() { return base; }
    public double getHeight() { return height; }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        // âŒ Cannot instantiate abstract class
        // Shape shape = new Shape("Red", "Generic"); // Compilation error

        // âœ… Create concrete implementations
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 4.0, 6.0);
        Triangle triangle = new Triangle("Green", 6.0, 4.0, 5.0, 5.0);

        // Polymorphism - treat different shapes uniformly
        Shape[] shapes = {circle, rectangle, triangle};

        System.out.println("=== Shape Information ===");
        for (Shape shape : shapes) {
            shape.displayInfo();
            System.out.println();
        }

        // Use abstract method in concrete method
        System.out.println("=== Area Comparisons ===");
        if (circle.isLargerThan(rectangle)) {
            System.out.println("Circle has larger area than rectangle");
        } else {
            System.out.println("Rectangle has larger or equal area to circle");
        }
    }
}
\`\`\`

### **Abstract Class Rules**

#### **1. Cannot Be Instantiated**
\`\`\`java
public abstract class Animal {
    public abstract void makeSound();
}

// âŒ Compilation error
// Animal animal = new Animal();

// âœ… Must use concrete subclass
public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

Animal dog = new Dog(); // âœ… OK
\`\`\`

#### **2. Can Have Abstract and Concrete Methods**
\`\`\`java
public abstract class Vehicle {
    // Abstract method - no implementation
    public abstract void start();

    // Concrete method - has implementation
    public void stop() {
        System.out.println("Vehicle stopped");
    }

    // Concrete method using abstract method
    public void startAndDrive() {
        start(); // Call abstract method
        System.out.println("Driving...");
    }
}
\`\`\`

#### **3. Can Have Constructors**
\`\`\`java
public abstract class Employee {
    protected String name;
    protected double salary;

    // Constructor
    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    // Abstract method
    public abstract double calculateBonus();

    // Concrete method
    public double getTotalCompensation() {
        return salary + calculateBonus();
    }
}
\`\`\`

#### **4. Can Have Static Methods**
\`\`\`java
public abstract class MathUtils {
    // Static concrete method
    public static double square(double number) {
        return number * number;
    }

    // Abstract instance method
    public abstract double calculate();
}
\`\`\`

---

## ðŸ”— Interfaces

### **What is an Interface?**

An interface is a completely abstract class that defines a contract (set of methods) that implementing classes must follow. Interfaces support multiple inheritance and provide complete abstraction.

### **Interface Syntax**

\`\`\`java
// Interface declaration
public interface InterfaceName {
    // Constants (public static final by default)
    int MAX_VALUE = 100;

    // Abstract methods (public abstract by default)
    void method1();
    int method2(String param);

    // Default methods (Java 8+)
    default void defaultMethod() {
        System.out.println("Default implementation");
    }

    // Static methods (Java 8+)
    static void staticMethod() {
        System.out.println("Static method in interface");
    }

    // Private methods (Java 9+)
    private void privateMethod() {
        System.out.println("Private helper method");
    }
}
\`\`\`

### **Complete Interface Example**

\`\`\`java
// Interface for drawable objects
public interface Drawable {
    // Abstract methods
    void draw();
    void setColor(String color);
    String getColor();

    // Default method
    default void erase() {
        System.out.println("Erasing " + getColor() + " drawing");
        setColor("white");
    }

    // Static method
    static void printDrawingInfo() {
        System.out.println("Drawing interface provides drawing capabilities");
    }
}

// Interface for resizable objects
public interface Resizable {
    void resize(double factor);
    double getArea();
}

// Class implementing single interface
public class Circle implements Drawable {
    private double radius;
    private String color;

    public Circle(double radius, String color) {
        this.radius = radius;
        this.color = color;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle with radius " + radius);
    }

    @Override
    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String getColor() {
        return color;
    }

    // Additional method not in interface
    public double getRadius() {
        return radius;
    }
}

// Class implementing multiple interfaces
public class Rectangle implements Drawable, Resizable {
    private double length;
    private double width;
    private String color;

    public Rectangle(double length, double width, String color) {
        this.length = length;
        this.width = width;
        this.color = color;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " rectangle " + length + "x" + width);
    }

    @Override
    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String getColor() {
        return color;
    }

    @Override
    public void resize(double factor) {
        length *= factor;
        width *= factor;
        System.out.println("Rectangle resized by factor " + factor);
    }

    @Override
    public double getArea() {
        return length * width;
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        // Create objects
        Circle circle = new Circle(5.0, "red");
        Rectangle rectangle = new Rectangle(4.0, 6.0, "blue");

        // Polymorphism with interfaces
        Drawable[] drawables = {circle, rectangle};

        System.out.println("=== Drawing Shapes ===");
        for (Drawable drawable : drawables) {
            drawable.draw();
        }

        // Use default method
        System.out.println("\\n=== Erasing Shapes ===");
        for (Drawable drawable : drawables) {
            drawable.erase();
        }

        // Multiple interface implementation
        System.out.println("\\n=== Resizing Rectangle ===");
        rectangle.resize(2.0);
        System.out.println("New area: " + rectangle.getArea());

        // Static method call
        Drawable.printDrawingInfo();
    }
}
\`\`\`

### **Interface Rules**

#### **1. All Methods Are Public Abstract (by default)**
\`\`\`java
public interface Calculator {
    // These are all public abstract by default
    int add(int a, int b);
    int subtract(int a, int b);
    void display();

    // Explicit modifiers (same effect)
    public abstract int multiply(int a, int b);
}
\`\`\`

#### **2. All Fields Are Public Static Final (by default)**
\`\`\`java
public interface Constants {
    // These are all public static final by default
    int MAX_VALUE = 100;
    String DEFAULT_NAME = "Unknown";
    double PI = 3.14159;

    // Explicit modifiers (same effect)
    public static final int MIN_VALUE = 0;
}
\`\`\`

#### **3. Cannot Have Constructors**
\`\`\`java
public interface NoConstructors {
    // âŒ Interfaces cannot have constructors
    // public NoConstructors() { } // Compilation error

    // âœ… Can have default methods for initialization-like behavior
    default void initialize() {
        System.out.println("Initializing...");
    }
}
\`\`\`

#### **4. Can Extend Multiple Interfaces**
\`\`\`java
public interface InterfaceA {
    void methodA();
}

public interface InterfaceB {
    void methodB();
}

// Interface extending multiple interfaces
public interface CombinedInterface extends InterfaceA, InterfaceB {
    void methodC();
}

// Class implementing multiple interfaces
public class MultiInterfaceClass implements InterfaceA, InterfaceB {
    @Override
    public void methodA() { System.out.println("A"); }

    @Override
    public void methodB() { System.out.println("B"); }
}
\`\`\`

---

## âš–ï¸ Abstract Classes vs Interfaces

### **When to Use Abstract Classes**

#### **âœ… Use Abstract Classes When:**
- You want to share code among related classes
- You have common fields and methods
- You need to declare non-public members
- You want to provide default implementations
- You need constructors for initialization

\`\`\`java
// Abstract class for database operations
public abstract class DatabaseHandler {
    protected Connection connection;

    public DatabaseHandler(String url) {
        // Initialize connection
        this.connection = createConnection(url);
    }

    // Abstract method - implementation varies
    public abstract ResultSet executeQuery(String query);

    // Concrete method - common to all databases
    public void close() {
        if (connection != null) {
            connection.close();
        }
    }

    // Helper method
    protected Connection createConnection(String url) {
        // Common connection logic
        return DriverManager.getConnection(url);
    }
}
\`\`\`

#### **âŒ Don't Use Abstract Classes When:**
- You need multiple inheritance
- Classes are not closely related
- You want complete abstraction
- You don't need shared code

### **When to Use Interfaces**

#### **âœ… Use Interfaces When:**
- You need multiple inheritance
- You want complete abstraction
- Classes are unrelated but need common behavior
- You want to define contracts
- You need to support different implementations

\`\`\`java
// Interface for payment processing
public interface PaymentProcessor {
    boolean processPayment(double amount);
    String getPaymentMethod();
    boolean refund(double amount);
}

// Different implementations
public class CreditCardProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        // Credit card processing logic
        return true;
    }

    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }

    @Override
    public boolean refund(double amount) {
        // Refund logic
        return true;
    }
}

public class PayPalProcessor implements PaymentProcessor {
    @Override
    public boolean processPayment(double amount) {
        // PayPal processing logic
        return true;
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }

    @Override
    public boolean refund(double amount) {
        // PayPal refund logic
        return true;
    }
}
\`\`\`

#### **âŒ Don't Use Interfaces When:**
- You need shared implementation code
- You need non-public members
- You need constructors
- You have closely related classes that share state

---

## ðŸŽ¯ Advanced Interface Features

### **Default Methods (Java 8+)**

Default methods allow interfaces to provide method implementations.

\`\`\`java
public interface Vehicle {
    void start();
    void stop();

    // Default method with implementation
    default void honk() {
        System.out.println("Honk! Honk!");
    }

    // Default method calling abstract method
    default void startAndDrive() {
        start();
        System.out.println("Vehicle is now driving");
    }
}

public class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car engine started");
    }

    @Override
    public void stop() {
        System.out.println("Car stopped");
    }

    // Can override default method
    @Override
    public void honk() {
        System.out.println("Beep! Beep! (Car horn)");
    }
}

public class DefaultMethodDemo {
    public static void main(String[] args) {
        Car car = new Car();

        car.start();          // Abstract method implementation
        car.startAndDrive();  // Uses default method
        car.honk();           // Overridden default method
        car.stop();           // Abstract method implementation
    }
}
\`\`\`

### **Static Methods in Interfaces (Java 8+)**

\`\`\`java
public interface MathOperations {
    // Abstract method
    double calculate(double x);

    // Static method
    static double square(double x) {
        return x * x;
    }

    static double cube(double x) {
        return x * x * x;
    }

    // Default method using static method
    default double calculateAndSquare() {
        double result = calculate(5.0);
        return MathOperations.square(result);
    }
}

public class Calculator implements MathOperations {
    @Override
    public double calculate(double x) {
        return x * 2; // Double the value
    }
}

public class StaticMethodDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // Instance method
        double result = calc.calculate(10);
        System.out.println("Calculate: " + result);

        // Static methods called on interface
        double squared = MathOperations.square(5);
        double cubed = MathOperations.cube(3);

        System.out.println("Square: " + squared);
        System.out.println("Cube: " + cubed);

        // Default method using static method
        double complex = calc.calculateAndSquare();
        System.out.println("Calculate and square: " + complex);
    }
}
\`\`\`

### **Private Methods (Java 9+)**

Private methods allow code reuse within interfaces.

\`\`\`java
public interface DataProcessor {
    void process(String data);

    default void processAndValidate(String data) {
        validateData(data);  // Call private method
        process(data);
        logProcessing(data); // Call private method
    }

    // Private helper method
    private void validateData(String data) {
        if (data == null || data.trim().isEmpty()) {
            throw new IllegalArgumentException("Data cannot be null or empty");
        }
    }

    // Private helper method
    private void logProcessing(String data) {
        System.out.println("Processing data: " + data.substring(0, Math.min(20, data.length())));
    }
}
\`\`\`

---

## ðŸŽ¯ Practical Examples

### **Shape Drawing System**

\`\`\`java
// Interfaces
public interface Drawable {
    void draw();
    void setColor(String color);
    String getColor();
}

public interface Movable {
    void move(int deltaX, int deltaY);
    int getX();
    int getY();
}

// Abstract class
public abstract class Shape implements Drawable, Movable {
    protected int x, y;
    protected String color;

    public Shape(int x, int y, String color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    @Override
    public String getColor() { return color; }

    @Override
    public void setColor(String color) { this.color = color; }

    @Override
    public int getX() { return x; }

    @Override
    public int getY() { return y; }

    @Override
    public void move(int deltaX, int deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }

    // Abstract method
    public abstract double getArea();
}

// Concrete implementations
public class Circle extends Shape {
    private double radius;

    public Circle(int x, int y, String color, double radius) {
        super(x, y, color);
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing " + color + " circle at (" + x + "," + y + ") with radius " + radius);
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private int width, height;

    public Rectangle(int x, int y, String color, int width, int height) {
        super(x, y, color);
        this.width = width;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing " + color + " rectangle at (" + x + "," + y + ") " + width + "x" + height);
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

public class ShapeSystemDemo {
    public static void main(String[] args) {
        // Create shapes
        Circle circle = new Circle(10, 20, "red", 5.0);
        Rectangle rectangle = new Rectangle(30, 40, "blue", 10, 8);

        // Use interface references
        Drawable[] drawables = {circle, rectangle};
        Movable[] movables = {circle, rectangle};

        System.out.println("=== Drawing Shapes ===");
        for (Drawable drawable : drawables) {
            drawable.draw();
        }

        System.out.println("\\n=== Moving Shapes ===");
        for (Movable movable : movables) {
            System.out.println("Moving shape from (" + movable.getX() + "," + movable.getY() + ")");
            movable.move(5, 10);
            System.out.println("To (" + movable.getX() + "," + movable.getY() + ")");
        }

        System.out.println("\\n=== Shape Areas ===");
        for (Shape shape : new Shape[]{circle, rectangle}) {
            System.out.println(shape.getClass().getSimpleName() + " area: " + shape.getArea());
        }
    }
}
\`\`\`

### **Payment Processing System**

\`\`\`java
// Payment interface
public interface PaymentProcessor {
    boolean processPayment(double amount);
    boolean refund(double amount);
    String getPaymentMethod();
    default void validateAmount(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }
}

// Abstract payment class
public abstract class PaymentGateway implements PaymentProcessor {
    protected String gatewayName;
    protected boolean connected;

    public PaymentGateway(String gatewayName) {
        this.gatewayName = gatewayName;
        this.connected = connect();
    }

    // Abstract method for connection
    protected abstract boolean connect();

    // Template method pattern
    @Override
    public final boolean processPayment(double amount) {
        validateAmount(amount);
        if (!connected) {
            System.out.println("Not connected to " + gatewayName);
            return false;
        }
        return executePayment(amount);
    }

    protected abstract boolean executePayment(double amount);

    @Override
    public final boolean refund(double amount) {
        validateAmount(amount);
        if (!connected) {
            System.out.println("Not connected to " + gatewayName);
            return false;
        }
        return executeRefund(amount);
    }

    protected abstract boolean executeRefund(double amount);
}

// Concrete implementations
public class StripeProcessor extends PaymentGateway {
    public StripeProcessor() {
        super("Stripe");
    }

    @Override
    protected boolean connect() {
        System.out.println("Connecting to Stripe API...");
        return true; // Simulate successful connection
    }

    @Override
    protected boolean executePayment(double amount) {
        System.out.println("Processing $" + amount + " through Stripe");
        return true;
    }

    @Override
    protected boolean executeRefund(double amount) {
        System.out.println("Refunding $" + amount + " through Stripe");
        return true;
    }

    @Override
    public String getPaymentMethod() {
        return "Credit Card (Stripe)";
    }
}

public class PayPalProcessor extends PaymentGateway {
    public PayPalProcessor() {
        super("PayPal");
    }

    @Override
    protected boolean connect() {
        System.out.println("Connecting to PayPal API...");
        return true;
    }

    @Override
    protected boolean executePayment(double amount) {
        System.out.println("Processing $" + amount + " through PayPal");
        return true;
    }

    @Override
    protected boolean executeRefund(double amount) {
        System.out.println("Refunding $" + amount + " through PayPal");
        return true;
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal Account";
    }
}

public class PaymentSystemDemo {
    public static void main(String[] args) {
        // Create payment processors
        PaymentProcessor stripe = new StripeProcessor();
        PaymentProcessor paypal = new PayPalProcessor();

        double amount = 99.99;

        // Process payments
        System.out.println("=== Processing Payments ===");
        System.out.println("Stripe: " + stripe.processPayment(amount));
        System.out.println("PayPal: " + paypal.processPayment(amount));

        // Process refunds
        System.out.println("\\n=== Processing Refunds ===");
        System.out.println("Stripe: " + stripe.refund(amount));
        System.out.println("PayPal: " + paypal.refund(amount));

        // Display payment methods
        System.out.println("\\n=== Payment Methods ===");
        System.out.println("Stripe: " + stripe.getPaymentMethod());
        System.out.println("PayPal: " + paypal.getPaymentMethod());
    }
}
\`\`\`

---

## ðŸŽ¯ Best Practices

### **1. Interface Segregation Principle**

Keep interfaces focused and specific rather than having large, general-purpose interfaces.

\`\`\`java
// âŒ Bad: Large, unfocused interface
public interface Worker {
    void work();
    void eat();
    void sleep();
    void drive();
    void cook();
    void clean();
}

// âœ… Good: Focused, specific interfaces
public interface Workable {
    void work();
}

public interface Eatable {
    void eat();
}

public interface Drivable {
    void drive();
}

// Classes implement only what they need
public class Robot implements Workable {
    @Override
    public void work() { /* robot work */ }
}

public class Human implements Workable, Eatable, Drivable {
    @Override
    public void work() { /* human work */ }
    @Override
    public void eat() { /* human eat */ }
    @Override
    public void drive() { /* human drive */ }
}
\`\`\`

### **2. Dependency Inversion Principle**

Depend on abstractions, not concrete implementations.

\`\`\`java
// âœ… Good: Depend on interface
public class DataProcessor {
    private DataReader reader;

    // Constructor injection with interface
    public DataProcessor(DataReader reader) {
        this.reader = reader;
    }

    public void process() {
        String data = reader.readData();
        // Process data...
    }
}

// Interface defines contract
public interface DataReader {
    String readData();
}

// Multiple implementations
public class FileDataReader implements DataReader {
    @Override
    public String readData() { /* read from file */ }
}

public class DatabaseDataReader implements DataReader {
    @Override
    public String readData() { /* read from database */ }
}
\`\`\`

### **3. Choose Wisely Between Abstract Classes and Interfaces**

\`\`\`java
// Use abstract class when:
// - You want to share code among closely related classes
// - You need to declare protected/private fields
// - You want to provide default implementations
public abstract class DatabaseConnection {
    protected String url;

    public DatabaseConnection(String url) {
        this.url = url;
    }

    public abstract ResultSet executeQuery(String query);

    public void close() { /* common close logic */ }
}

// Use interface when:
// - You need multiple inheritance
// - Classes are unrelated but need common behavior
// - You want complete abstraction
public interface Logger {
    void log(String message);
    default void logError(String message) {
        log("ERROR: " + message);
    }
}
\`\`\`

---

## ðŸŽ¯ Summary

Abstract classes and interfaces are powerful tools for abstraction and design flexibility:

### **Abstract Classes**
- **Purpose**: Share code among related classes
- **Features**: Can have abstract and concrete methods, constructors, fields
- **Usage**: When classes share common implementation
- **Inheritance**: Single inheritance only

### **Interfaces**
- **Purpose**: Define contracts and enable multiple inheritance
- **Features**: Abstract methods, constants, default/static methods (Java 8+)
- **Usage**: When classes need common behavior but different implementations
- **Inheritance**: Multiple interface inheritance supported

### **Key Differences**
| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| **Methods** | Abstract + Concrete | Abstract + Default + Static |
| **Fields** | Instance + Static | Constants only |
| **Constructors** | Yes | No |
| **Access Modifiers** | All | Public only |
| **Inheritance** | Single | Multiple |
| **Instantiation** | No | No |

### **Modern Java Features**
- **Default methods** (Java 8): Provide default implementations
- **Static methods** (Java 8): Utility methods in interfaces
- **Private methods** (Java 9): Helper methods within interfaces

### **Design Principles**
- **Interface Segregation**: Keep interfaces focused
- **Dependency Inversion**: Depend on abstractions
- **Single Responsibility**: Each class/interface has one purpose

Master abstract classes and interfaces, and you'll be able to create flexible, maintainable, and extensible Java applications!

### **Quick Check**
Which of these can be instantiated directly?
1. \`new AbstractClass()\`
2. \`new Interface()\`
3. \`new ConcreteClass()\` (implements interface)
4. \`new AbstractSubclass()\` (extends abstract class)

Answer: Only #3
`
};


