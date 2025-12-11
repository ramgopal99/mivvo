import { SubLesson } from '../../../data/lessonsData';

export const topic_10_2: SubLesson = {
  id: 10.2,
  title: 'Abstract Classes vs Interfaces',
  status: 'completed',
  content: `# ⚖️ Abstract Classes vs Interfaces in Java

Master the differences and use cases for abstraction mechanisms in Java!

---

## 🎯 Abstract Classes

### **What is an Abstract Class?**

An **abstract class** is a class that cannot be instantiated and may contain abstract methods (methods without implementation) that must be implemented by subclasses.

\`\`\`java
// Abstract class
public abstract class Shape {
    // Abstract fields (can have state)
    protected String color;
    protected double area;

    // Concrete constructor
    public Shape(String color) {
        this.color = color;
    }

    // Abstract method - no implementation
    public abstract double calculateArea();

    // Concrete method with implementation
    public void display() {
        System.out.println("Shape color: " + color);
        System.out.println("Shape area: " + calculateArea());
    }

    // Concrete getter
    public String getColor() {
        return color;
    }

    // Can have static methods
    public static void printInfo() {
        System.out.println("This is a shape");
    }
}

// Concrete subclass
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color); // Call parent constructor
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    public double getRadius() {
        return radius;
    }
}

// Another concrete subclass
public class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    public double calculateArea() {
        return length * width;
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        // Cannot instantiate abstract class
        // Shape shape = new Shape("Red"); // ERROR

        // Create concrete instances
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 4.0, 6.0);

        // Use abstract class reference
        Shape[] shapes = {circle, rectangle};

        for (Shape shape : shapes) {
            shape.display();
            System.out.println("---");
        }

        // Call static method
        Shape.printInfo();
    }
}
\`\`\`

---

## 🔌 Interfaces

### **What is an Interface?**

An **interface** is a reference type that can contain only constants, method signatures, default methods, static methods, and nested types. Interfaces cannot be instantiated.

\`\`\`java
// Interface definition
public interface Drawable {
    // Constant (public static final by default)
    String DEFAULT_COLOR = "Black";

    // Abstract method (public abstract by default)
    void draw();

    // Default method (Java 8+)
    default void setColor(String color) {
        System.out.println("Setting color to: " + color);
    }

    // Static method (Java 8+)
    static void printInfo() {
        System.out.println("This is a drawable object");
    }

    // Private method (Java 9+)
    private void validateColor(String color) {
        if (color == null || color.trim().isEmpty()) {
            throw new IllegalArgumentException("Color cannot be null or empty");
        }
    }
}

// Interface extending another interface
public interface ColoredDrawable extends Drawable {
    void setColor(String color); // Override default method
    String getColor();
}

// Class implementing interface
public class Circle implements ColoredDrawable {
    private String color = Drawable.DEFAULT_COLOR;
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius + " in color " + color);
    }

    @Override
    public void setColor(String color) {
        this.color = color;
        System.out.println("Circle color set to: " + color);
    }

    @Override
    public String getColor() {
        return color;
    }

    public double getRadius() {
        return radius;
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Circle circle = new Circle(5.0);

        // Interface methods
        circle.draw();
        circle.setColor("Red");
        System.out.println("Current color: " + circle.getColor());

        // Static method call
        Drawable.printInfo();

        // Use interface reference
        ColoredDrawable drawable = circle;
        drawable.setColor("Blue");
        drawable.draw();
    }
}
\`\`\`

---

## ⚖️ Abstract Class vs Interface

### **Comparison Table**

| Feature | Abstract Class | Interface |
|---------|----------------|-----------|
| **Instantiation** | Cannot instantiate | Cannot instantiate |
| **State** | Can have instance variables | Only constants (public static final) |
| **Methods** | Abstract + concrete methods | Abstract + default + static methods |
| **Constructors** | Can have constructors | No constructors |
| **Inheritance** | Single inheritance | Multiple inheritance |
| **Access Modifiers** | All access modifiers | public only (by default) |
| **When to Use** | IS-A relationship, shared code | Contract, multiple inheritance |

### **1. Multiple Inheritance with Interfaces**
\`\`\`java
// Multiple interfaces
interface Flyable {
    void fly();
    default void land() {
        System.out.println("Landing...");
    }
}

interface Swimmable {
    void swim();
    default void dive() {
        System.out.println("Diving...");
    }
}

// Class implementing multiple interfaces
public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }

    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }

    // Can override default methods
    @Override
    public void land() {
        System.out.println("Duck is landing on water");
    }
}

public class MultipleInheritanceDemo {
    public static void main(String[] args) {
        Duck duck = new Duck();

        duck.fly();
        duck.land(); // From Flyable
        duck.swim();
        duck.dive(); // From Swimmable

        // Polymorphism with interfaces
        Flyable flyingDuck = duck;
        flyingDuck.fly();

        Swimmable swimmingDuck = duck;
        swimmingDuck.swim();
    }
}
\`\`\`

### **2. Choosing Between Abstract Class and Interface**

#### **Use Abstract Class when:**
- You want to share code among closely related classes
- You have a "is-a" relationship
- You need to declare non-public members
- You want to provide default implementations

#### **Use Interface when:**
- You want to define a contract for unrelated classes
- You need multiple inheritance
- You want to provide different implementations
- You want to support future extensions

### **3. Modern Java: Functional Interfaces**
\`\`\`java
@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);

    // Can have default methods
    default void displayResult(int result) {
        System.out.println("Result: " + result);
    }
}

// Lambda implementation
public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        // Lambda expression implementing functional interface
        Calculator adder = (a, b) -> a + b;
        Calculator multiplier = (a, b) -> a * b;

        System.out.print("Addition: ");
        adder.displayResult(adder.calculate(5, 3));

        System.out.print("Multiplication: ");
        multiplier.displayResult(multiplier.calculate(5, 3));

        // Method reference
        Calculator subtractor = (a, b) -> a - b;
        System.out.print("Subtraction: ");
        subtractor.displayResult(subtractor.calculate(10, 4));
    }
}
\`\`\`

---

## 🎨 Design Patterns with Abstraction

### **1. Template Method Pattern**
\`\`\`java
// Abstract class defining template
public abstract class DataProcessor {
    // Template method
    public final void process() {
        loadData();
        validateData();
        processData();
        saveResults();
    }

    // Abstract methods to be implemented by subclasses
    protected abstract void loadData();
    protected abstract void validateData();
    protected abstract boolean isValid();
    protected abstract void processData();
    protected abstract void saveResults();

    // Hook method with default implementation
    protected void logProgress(String message) {
        System.out.println("Processing: " + message);
    }
}

public class CSVProcessor extends DataProcessor {
    private List<String> csvData;

    @Override
    protected void loadData() {
        logProgress("Loading CSV data");
        csvData = Arrays.asList("John,25", "Jane,30", "Bob,35");
    }

    @Override
    protected void validateData() {
        logProgress("Validating CSV data");
        // Validation logic
    }

    @Override
    protected boolean isValid() {
        return csvData != null && !csvData.isEmpty();
    }

    @Override
    protected void processData() {
        logProgress("Processing CSV data");
        for (String row : csvData) {
            String[] parts = row.split(",");
            System.out.println("Name: " + parts[0] + ", Age: " + parts[1]);
        }
    }

    @Override
    protected void saveResults() {
        logProgress("Saving CSV results");
        // Save logic
    }
}
\`\`\`

### **2. Strategy Pattern with Interfaces**
\`\`\`java
// Strategy interface
interface PaymentStrategy {
    void pay(double amount);
    String getPaymentMethod();
}

// Concrete strategies
class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paying $" + amount + " with Credit Card");
    }

    @Override
    public String getPaymentMethod() {
        return "Credit Card";
    }
}

class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paying $" + amount + " with PayPal");
    }

    @Override
    public String getPaymentMethod() {
        return "PayPal";
    }
}

// Context class
class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void checkout(double amount) {
        if (paymentStrategy == null) {
            throw new IllegalStateException("Payment strategy not set");
        }
        paymentStrategy.pay(amount);
    }
}

public class StrategyPatternDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        // Pay with credit card
        cart.setPaymentStrategy(new CreditCardPayment());
        cart.checkout(100.0);

        // Pay with PayPal
        cart.setPaymentStrategy(new PayPalPayment());
        cart.checkout(50.0);
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Abstract classes** share code with subclasses, interfaces define contracts
2. **Multiple inheritance** possible with interfaces, single with classes
3. **Abstract classes** have state and constructors, interfaces don't
4. **Default methods** in interfaces provide backward compatibility
5. **Functional interfaces** enable lambda expressions
6. **Choose abstract classes** for IS-A relationships with shared code
7. **Choose interfaces** for HAS-A relationships and multiple inheritance
8. **Design patterns** leverage both for flexible, maintainable code

**Next:** Learn about exception handling and polymorphism! 🚀`
};
