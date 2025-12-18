import { SubLesson } from '../../../data/lessonsData';

export const topic_7_4: SubLesson = {
  id: 7.4,
  title: 'Polymorphism',
  status: 'completed',
  content: `# 🎭 Polymorphism in Java

Polymorphism is the ability of objects to take on multiple forms. It allows objects of different classes to be treated as objects of a common superclass, enabling flexible and extensible code. Polymorphism is one of the core principles of object-oriented programming alongside encapsulation, inheritance, and abstraction.

---

## 📋 Understanding Polymorphism

### **What is Polymorphism?**
\`\`\`java
public class PolymorphismBasics {
    // Superclass
    static class Animal {
        public void makeSound() {
            System.out.println("Animal makes a sound");
        }

        public void move() {
            System.out.println("Animal moves");
        }
    }

    // Subclasses with different behaviors
    static class Dog extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Dog barks: Woof!");
        }

        @Override
        public void move() {
            System.out.println("Dog runs on four legs");
        }

        public void fetch() {
            System.out.println("Dog fetches the ball");
        }
    }

    static class Cat extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Cat meows: Meow!");
        }

        @Override
        public void move() {
            System.out.println("Cat walks gracefully");
        }

        public void climb() {
            System.out.println("Cat climbs the tree");
        }
    }

    static class Bird extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Bird chirps: Tweet!");
        }

        @Override
        public void move() {
            System.out.println("Bird flies in the sky");
        }

        public void fly() {
            System.out.println("Bird soars through the air");
        }
    }

    public static void main(String[] args) {
        // Polymorphism in action
        Animal dog = new Dog();
        Animal cat = new Cat();
        Animal bird = new Bird();

        // Same method calls, different behaviors
        dog.makeSound();   // "Dog barks: Woof!"
        cat.makeSound();   // "Cat meows: Meow!"
        bird.makeSound();  // "Bird chirps: Tweet!"

        dog.move();   // "Dog runs on four legs"
        cat.move();   // "Cat walks gracefully"
        bird.move();  // "Bird flies in the sky"
    }
}
\`\`\`

### **Types of Polymorphism**
\`\`\`java
public class PolymorphismTypes {
    // 1. Compile-time Polymorphism (Method Overloading)
    static class Calculator {
        public int add(int a, int b) {
            return a + b;
        }

        public double add(double a, double b) {
            return a + b;
        }

        public int add(int a, int b, int c) {
            return a + b + c;
        }
    }

    // 2. Runtime Polymorphism (Method Overriding)
    static class Shape {
        public double getArea() {
            return 0.0;
        }

        public void draw() {
            System.out.println("Drawing a shape");
        }
    }

    static class Circle extends Shape {
        private double radius;

        public Circle(double radius) {
            this.radius = radius;
        }

        @Override
        public double getArea() {
            return Math.PI * radius * radius;
        }

        @Override
        public void draw() {
            System.out.println("Drawing a circle");
        }
    }

    static class Rectangle extends Shape {
        private double width, height;

        public Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }

        @Override
        public double getArea() {
            return width * height;
        }

        @Override
        public void draw() {
            System.out.println("Drawing a rectangle");
        }
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // Compile-time polymorphism
        System.out.println("Add ints: " + calc.add(5, 3));
        System.out.println("Add doubles: " + calc.add(5.5, 3.2));
        System.out.println("Add three ints: " + calc.add(5, 3, 2));

        // Runtime polymorphism
        Shape circle = new Circle(5.0);
        Shape rectangle = new Rectangle(10.0, 8.0);

        System.out.println("Circle area: " + circle.getArea());
        System.out.println("Rectangle area: " + rectangle.getArea());

        circle.draw();
        rectangle.draw();
    }
}
\`\`\`

---

## 🔄 Runtime Polymorphism (Dynamic Method Dispatch)

### **How Runtime Polymorphism Works**
\`\`\`java
public class RuntimePolymorphism {
    static class Animal {
        public void eat() {
            System.out.println("Animal eats food");
        }

        public void makeSound() {
            System.out.println("Animal makes a sound");
        }
    }

    static class Dog extends Animal {
        @Override
        public void eat() {
            System.out.println("Dog eats dog food");
        }

        @Override
        public void makeSound() {
            System.out.println("Dog barks");
        }

        public void fetch() {
            System.out.println("Dog fetches");
        }
    }

    static class Cat extends Animal {
        @Override
        public void eat() {
            System.out.println("Cat eats cat food");
        }

        @Override
        public void makeSound() {
            System.out.println("Cat meows");
        }

        public void climb() {
            System.out.println("Cat climbs");
        }
    }

    // Method that accepts any Animal
    public static void animalActivities(Animal animal) {
        animal.eat();
        animal.makeSound();

        // Downcasting to access subclass-specific methods
        if (animal instanceof Dog) {
            ((Dog) animal).fetch();
        } else if (animal instanceof Cat) {
            ((Cat) animal).climb();
        }
    }

    public static void main(String[] args) {
        Dog dog = new Dog();
        Cat cat = new Cat();

        // Polymorphic method calls
        animalActivities(dog);
        System.out.println();
        animalActivities(cat);
    }
}
\`\`\`

### **Method Resolution Order**
\`\`\`java
public class MethodResolution {
    static class GrandParent {
        public void method() {
            System.out.println("GrandParent method");
        }
    }

    static class Parent extends GrandParent {
        @Override
        public void method() {
            System.out.println("Parent method");
        }
    }

    static class Child extends Parent {
        @Override
        public void method() {
            System.out.println("Child method");
        }
    }

    public static void main(String[] args) {
        GrandParent gp = new GrandParent();
        GrandParent p = new Parent();
        GrandParent c = new Child();

        // Runtime method resolution based on actual object type
        gp.method();  // GrandParent method
        p.method();   // Parent method (overridden)
        c.method();   // Child method (overridden)
    }
}
\`\`\`

---

## 🎯 Polymorphism in Collections and Arrays

### **Polymorphic Collections**
\`\`\`java
public class PolymorphicCollections {
    static class Shape {
        public double getArea() {
            return 0.0;
        }

        public String getType() {
            return "Shape";
        }
    }

    static class Circle extends Shape {
        private double radius;

        public Circle(double radius) {
            this.radius = radius;
        }

        @Override
        public double getArea() {
            return Math.PI * radius * radius;
        }

        @Override
        public String getType() {
            return "Circle";
        }
    }

    static class Square extends Shape {
        private double side;

        public Square(double side) {
            this.side = side;
        }

        @Override
        public double getArea() {
            return side * side;
        }

        @Override
        public String getType() {
            return "Square";
        }
    }

    public static void main(String[] args) {
        // Collection of polymorphic objects
        java.util.List<Shape> shapes = new java.util.ArrayList<>();
        shapes.add(new Circle(5.0));
        shapes.add(new Square(4.0));
        shapes.add(new Circle(3.0));

        // Process all shapes polymorphically
        double totalArea = 0.0;
        for (Shape shape : shapes) {
            System.out.println(shape.getType() + " area: " + shape.getArea());
            totalArea += shape.getArea();
        }

        System.out.println("Total area: " + totalArea);
    }
}
\`\`\`

### **Polymorphic Method Parameters**
\`\`\`java
public class PolymorphicParameters {
    static class Animal {
        public void eat() {
            System.out.println("Animal eats");
        }
    }

    static class Dog extends Animal {
        @Override
        public void eat() {
            System.out.println("Dog eats dog food");
        }

        public void bark() {
            System.out.println("Woof!");
        }
    }

    static class Cat extends Animal {
        @Override
        public void eat() {
            System.out.println("Cat eats cat food");
        }

        public void meow() {
            System.out.println("Meow!");
        }
    }

    // Method that accepts any Animal
    public static void feedAnimal(Animal animal) {
        System.out.println("Feeding animal:");
        animal.eat();
    }

    // Method that works with collections of animals
    public static void feedAllAnimals(java.util.List<Animal> animals) {
        for (Animal animal : animals) {
            feedAnimal(animal);
        }
    }

    public static void main(String[] args) {
        java.util.List<Animal> animals = new java.util.ArrayList<>();
        animals.add(new Dog());
        animals.add(new Cat());
        animals.add(new Dog());

        feedAllAnimals(animals);
    }
}
\`\`\`

---

## 🔄 Polymorphism with Interfaces

### **Interface Polymorphism**
\`\`\`java
public class InterfacePolymorphism {
    // Interface
    interface Drawable {
        void draw();
        double getArea();
    }

    // Classes implementing the interface
    static class Circle implements Drawable {
        private double radius;

        public Circle(double radius) {
            this.radius = radius;
        }

        @Override
        public void draw() {
            System.out.println("Drawing a circle");
        }

        @Override
        public double getArea() {
            return Math.PI * radius * radius;
        }
    }

    static class Rectangle implements Drawable {
        private double width, height;

        public Rectangle(double width, double height) {
            this.width = width;
            this.height = height;
        }

        @Override
        public void draw() {
            System.out.println("Drawing a rectangle");
        }

        @Override
        public double getArea() {
            return width * height;
        }
    }

    // Method that works with any Drawable
    public static void renderShape(Drawable shape) {
        shape.draw();
        System.out.println("Area: " + shape.getArea());
    }

    // Collection of different drawable objects
    public static void renderAll(java.util.List<Drawable> shapes) {
        for (Drawable shape : shapes) {
            renderShape(shape);
            System.out.println();
        }
    }

    public static void main(String[] args) {
        java.util.List<Drawable> shapes = new java.util.ArrayList<>();
        shapes.add(new Circle(5.0));
        shapes.add(new Rectangle(10.0, 8.0));
        shapes.add(new Circle(3.0));

        renderAll(shapes);
    }
}
\`\`\`

---

## 🎯 Advanced Polymorphism Patterns

### **Strategy Pattern with Polymorphism**
\`\`\`java
public class StrategyPattern {
    // Strategy interface
    interface PaymentStrategy {
        void pay(double amount);
        String getPaymentMethod();
    }

    // Concrete strategies
    static class CreditCardPayment implements PaymentStrategy {
        private String cardNumber;

        public CreditCardPayment(String cardNumber) {
            this.cardNumber = cardNumber;
        }

        @Override
        public void pay(double amount) {
            System.out.println("Paying $" + amount + " with credit card " +
                             cardNumber.substring(cardNumber.length() - 4));
        }

        @Override
        public String getPaymentMethod() {
            return "Credit Card";
        }
    }

    static class PayPalPayment implements PaymentStrategy {
        private String email;

        public PayPalPayment(String email) {
            this.email = email;
        }

        @Override
        public void pay(double amount) {
            System.out.println("Paying $" + amount + " via PayPal account " + email);
        }

        @Override
        public String getPaymentMethod() {
            return "PayPal";
        }
    }

    // Context class using polymorphism
    static class ShoppingCart {
        private java.util.List<Double> items = new java.util.ArrayList<>();
        private PaymentStrategy paymentStrategy;

        public void addItem(double price) {
            items.add(price);
        }

        public void setPaymentStrategy(PaymentStrategy strategy) {
            this.paymentStrategy = strategy;
        }

        public void checkout() {
            double total = items.stream().mapToDouble(Double::doubleValue).sum();
            System.out.println("Total amount: $" + total);

            if (paymentStrategy != null) {
                paymentStrategy.pay(total);
            } else {
                System.out.println("No payment method selected");
            }
        }
    }

    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(29.99);
        cart.addItem(15.50);

        // Use different payment strategies polymorphically
        cart.setPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456"));
        cart.checkout();

        System.out.println();

        cart.setPaymentStrategy(new PayPalPayment("user@example.com"));
        cart.checkout();
    }
}
\`\`\`

### **Factory Pattern with Polymorphism**
\`\`\`java
public class FactoryPolymorphism {
    // Abstract product
    abstract static class Vehicle {
        public abstract void drive();
        public abstract String getType();
    }

    // Concrete products
    static class Car extends Vehicle {
        @Override
        public void drive() {
            System.out.println("Driving a car on the road");
        }

        @Override
        public String getType() {
            return "Car";
        }
    }

    static class Motorcycle extends Vehicle {
        @Override
        public void drive() {
            System.out.println("Riding a motorcycle");
        }

        @Override
        public String getType() {
            return "Motorcycle";
        }
    }

    static class Truck extends Vehicle {
        @Override
        public void drive() {
            System.out.println("Driving a truck");
        }

        @Override
        public String getType() {
            return "Truck";
        }
    }

    // Factory using polymorphism
    static class VehicleFactory {
        public static Vehicle createVehicle(String type) {
            switch (type.toLowerCase()) {
                case "car":
                    return new Car();
                case "motorcycle":
                    return new Motorcycle();
                case "truck":
                    return new Truck();
                default:
                    throw new IllegalArgumentException("Unknown vehicle type: " + type);
            }
        }
    }

    // Usage with polymorphism
    public static void testDrive(Vehicle vehicle) {
        System.out.println("Testing " + vehicle.getType() + ":");
        vehicle.drive();
    }

    public static void main(String[] args) {
        // Create different vehicles polymorphically
        java.util.List<Vehicle> vehicles = new java.util.ArrayList<>();
        vehicles.add(VehicleFactory.createVehicle("car"));
        vehicles.add(VehicleFactory.createVehicle("motorcycle"));
        vehicles.add(VehicleFactory.createVehicle("truck"));

        // Test drive all vehicles
        for (Vehicle vehicle : vehicles) {
            testDrive(vehicle);
            System.out.println();
        }
    }
}
\`\`\`

---

## ⚠️ Polymorphism Pitfalls

### **Type Casting Issues**
\`\`\`java
public class PolymorphismPitfalls {
    static class Animal {
        public void makeSound() {
            System.out.println("Animal sound");
        }
    }

    static class Dog extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Woof!");
        }

        public void fetch() {
            System.out.println("Fetching ball");
        }
    }

    static class Cat extends Animal {
        @Override
        public void makeSound() {
            System.out.println("Meow!");
        }

        public void climb() {
            System.out.println("Climbing tree");
        }
    }

    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();

        // ✅ Safe downcasting with instanceof
        if (animal1 instanceof Dog) {
            Dog dog = (Dog) animal1;
            dog.fetch();
        }

        if (animal2 instanceof Cat) {
            Cat cat = (Cat) animal2;
            cat.climb();
        }

        // ❌ Dangerous downcasting without check
        try {
            Cat wrongCat = (Cat) animal1;  // animal1 is a Dog!
            wrongCat.climb();  // This would cause ClassCastException
        } catch (ClassCastException e) {
            System.out.println("ClassCastException caught: " + e.getMessage());
        }
    }
}
\`\`\`

### **Method Hiding vs Overriding**
\`\`\`java
public class MethodHiding {
    static class Parent {
        public static void staticMethod() {
            System.out.println("Parent static method");
        }

        public void instanceMethod() {
            System.out.println("Parent instance method");
        }
    }

    static class Child extends Parent {
        // This hides the parent static method (not overriding)
        public static void staticMethod() {
            System.out.println("Child static method");
        }

        // This overrides the parent instance method
        @Override
        public void instanceMethod() {
            System.out.println("Child instance method");
        }
    }

    public static void main(String[] args) {
        Parent parent = new Child();

        // Static method call depends on reference type (hiding)
        Parent.staticMethod();   // Parent static method
        Child.staticMethod();    // Child static method

        // Instance method call depends on object type (overriding)
        parent.instanceMethod(); // Child instance method (polymorphic)
    }
}
\`\`\`

---

## 🎯 Polymorphism Best Practices

### **1. Program to Interfaces, Not Implementations**
\`\`\`java
public class InterfaceProgramming {
    // Use interfaces for maximum polymorphism
    interface Logger {
        void log(String message);
        void logError(String message);
    }

    // Multiple implementations
    static class ConsoleLogger implements Logger {
        @Override
        public void log(String message) {
            System.out.println("[INFO] " + message);
        }

        @Override
        public void logError(String message) {
            System.err.println("[ERROR] " + message);
        }
    }

    static class FileLogger implements Logger {
        @Override
        public void log(String message) {
            // Write to file
            System.out.println("[FILE INFO] " + message);
        }

        @Override
        public void logError(String message) {
            // Write error to file
            System.out.println("[FILE ERROR] " + message);
        }
    }

    // Client code works with interface
    static class Application {
        private Logger logger;

        public Application(Logger logger) {
            this.logger = logger;
        }

        public void doWork() {
            logger.log("Application started");
            try {
                // Some work
                logger.log("Work completed successfully");
            } catch (Exception e) {
                logger.logError("Work failed: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        // Can easily switch implementations
        Application consoleApp = new Application(new ConsoleLogger());
        Application fileApp = new Application(new FileLogger());

        consoleApp.doWork();
        System.out.println();
        fileApp.doWork();
    }
}
\`\`\`

### **2. Use Polymorphism for Extensibility**
\`\`\`java
public class ExtensiblePolymorphism {
    // Base class for processing different file types
    abstract static class FileProcessor {
        public final void processFile(String filename) {
            if (canProcess(filename)) {
                loadFile(filename);
                processContent();
                saveResult();
            } else {
                throw new UnsupportedOperationException("Cannot process file: " + filename);
            }
        }

        protected abstract boolean canProcess(String filename);
        protected abstract void loadFile(String filename);
        protected abstract void processContent();
        protected abstract void saveResult();
    }

    // Concrete implementations for different file types
    static class TextFileProcessor extends FileProcessor {
        private String content;

        @Override
        protected boolean canProcess(String filename) {
            return filename.endsWith(".txt");
        }

        @Override
        protected void loadFile(String filename) {
            content = "Loaded text content from " + filename;
        }

        @Override
        protected void processContent() {
            content = content.toUpperCase();
        }

        @Override
        protected void saveResult() {
            System.out.println("Saving processed text: " + content);
        }
    }

    static class CSVFileProcessor extends FileProcessor {
        private java.util.List<String[]> data;

        @Override
        protected boolean canProcess(String filename) {
            return filename.endsWith(".csv");
        }

        @Override
        protected void loadFile(String filename) {
            data = new java.util.ArrayList<>();
            data.add(new String[]{"Name", "Age"});
            data.add(new String[]{"Alice", "25"});
        }

        @Override
        protected void processContent() {
            // Process CSV data
            System.out.println("Processing CSV data with " + data.size() + " rows");
        }

        @Override
        protected void saveResult() {
            System.out.println("Saving processed CSV data");
        }
    }

    // Factory method for polymorphic creation
    public static FileProcessor createProcessor(String filename) {
        if (filename.endsWith(".txt")) {
            return new TextFileProcessor();
        } else if (filename.endsWith(".csv")) {
            return new CSVFileProcessor();
        } else {
            throw new IllegalArgumentException("Unsupported file type");
        }
    }

    public static void main(String[] args) {
        // Process different file types polymorphically
        java.util.List<String> files = java.util.Arrays.asList("data.txt", "sales.csv");

        for (String filename : files) {
            FileProcessor processor = createProcessor(filename);
            processor.processFile(filename);
            System.out.println();
        }
    }
}
\`\`\`

### **3. Avoid Fragile Base Class Problem**
\`\`\`java
public class FragileBaseClass {
    // ❌ Fragile base class - changes can break subclasses
    static class ProblematicBase {
        public void process() {
            step1();
            step2();
            step3();
        }

        protected void step1() { System.out.println("Step 1"); }
        protected void step2() { System.out.println("Step 2"); }
        protected void step3() { System.out.println("Step 3"); }
    }

    // Subclass depends on specific implementation
    static class ProblematicSubclass extends ProblematicBase {
        @Override
        protected void step2() {
            super.step2();  // Depends on parent implementation
            System.out.println("Additional step 2 logic");
        }
    }

    // ✅ Better: Use composition and interfaces
    interface Processor {
        void process();
    }

    static class StepProcessor implements Processor {
        @Override
        public void process() {
            step1();
            step2();
            step3();
        }

        protected void step1() { System.out.println("Step 1"); }
        protected void step2() { System.out.println("Step 2"); }
        protected void step3() { System.out.println("Step 3"); }
    }

    // Decorator pattern for extension
    static class EnhancedProcessor implements Processor {
        private final Processor baseProcessor;

        public EnhancedProcessor(Processor baseProcessor) {
            this.baseProcessor = baseProcessor;
        }

        @Override
        public void process() {
            baseProcessor.process();
            System.out.println("Enhanced processing complete");
        }
    }

    public static void main(String[] args) {
        Processor basic = new StepProcessor();
        Processor enhanced = new EnhancedProcessor(basic);

        System.out.println("Basic processing:");
        basic.process();

        System.out.println("\\nEnhanced processing:");
        enhanced.process();
    }
}
\`\`\`

Polymorphism is a cornerstone of object-oriented programming that enables flexible, extensible, and maintainable code. By programming to interfaces and leveraging inheritance, you can create systems that are easy to extend and modify without changing existing code! 🎭`
};


