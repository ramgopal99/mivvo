import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_2: SubLesson = {
  id: 9.2,
  title: 'Types of Inheritance and Access Control',
  status: 'completed',
  content: `# 👨‍👩‍👧‍👦 Types of Inheritance and Access Control in Java

Master inheritance mechanisms and access control in object-oriented programming!

---

## 🎯 Types of Inheritance in Java

### **1. Single Inheritance**
\`\`\`java
// Parent class
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating");
    }

    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class inheriting from Animal
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }

    // Override parent method
    @Override
    public void eat() {
        System.out.println(name + " the " + breed + " is eating dog food");
    }

    // Add new method
    public void bark() {
        System.out.println("Woof! Woof!");
    }

    public String getBreed() {
        return breed;
    }
}

public class SingleInheritanceDemo {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");

        // Inherited methods
        dog.eat();   // Overridden method
        dog.sleep(); // Inherited method

        // New method
        dog.bark();

        // Inherited fields
        System.out.println("Name: " + dog.name);
        System.out.println("Age: " + dog.age);
        System.out.println("Breed: " + dog.getBreed());
    }
}
\`\`\`

### **2. Multilevel Inheritance**
\`\`\`java
public class Animal {
    public void breathe() {
        System.out.println("Animal is breathing");
    }
}

public class Mammal extends Animal {
    public void walk() {
        System.out.println("Mammal is walking");
    }
}

public class Dog extends Mammal {
    public void bark() {
        System.out.println("Dog is barking");
    }
}

public class Labrador extends Dog {
    private String color;

    public Labrador(String color) {
        this.color = color;
    }

    public void fetch() {
        System.out.println("Labrador is fetching");
    }

    public String getColor() {
        return color;
    }
}

public class MultilevelInheritanceDemo {
    public static void main(String[] args) {
        Labrador labrador = new Labrador("Golden");

        // Inherited from Animal
        labrador.breathe();

        // Inherited from Mammal
        labrador.walk();

        // Inherited from Dog
        labrador.bark();

        // Own method
        labrador.fetch();

        System.out.println("Color: " + labrador.getColor());
    }
}
\`\`\`

### **3. Hierarchical Inheritance**
\`\`\`java
public class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public void draw() {
        System.out.println("Drawing a shape");
    }

    public String getColor() {
        return color;
    }
}

// Circle inherits from Shape
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " circle with radius " + radius);
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }

    public double getRadius() {
        return radius;
    }
}

// Rectangle inherits from Shape
public class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " rectangle " + length + "x" + width);
    }

    public double getArea() {
        return length * width;
    }

    public double getPerimeter() {
        return 2 * (length + width);
    }
}

// Triangle inherits from Shape
public class Triangle extends Shape {
    private double base;
    private double height;

    public Triangle(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }

    @Override
    public void draw() {
        System.out.println("Drawing a " + color + " triangle with base " + base + " and height " + height);
    }

    public double getArea() {
        return 0.5 * base * height;
    }
}

public class HierarchicalInheritanceDemo {
    public static void main(String[] args) {
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 4.0, 6.0);
        Triangle triangle = new Triangle("Green", 3.0, 4.0);

        // Polymorphism - same method, different behavior
        Shape[] shapes = {circle, rectangle, triangle};

        for (Shape shape : shapes) {
            shape.draw();
            System.out.println("Color: " + shape.getColor());
        }

        // Specific methods
        System.out.println("Circle area: " + circle.getArea());
        System.out.println("Rectangle area: " + rectangle.getArea());
        System.out.println("Triangle area: " + triangle.getArea());
    }
}
\`\`\`

---

## 🔐 Access Control in Inheritance

### **1. Access Modifiers and Inheritance**
\`\`\`java
public class Parent {
    public String publicField = "Public";
    protected String protectedField = "Protected";
    String defaultField = "Default"; // package-private
    private String privateField = "Private";

    public void publicMethod() { System.out.println("Public method"); }
    protected void protectedMethod() { System.out.println("Protected method"); }
    void defaultMethod() { System.out.println("Default method"); }
    private void privateMethod() { System.out.println("Private method"); }

    public void testAccess() {
        System.out.println(privateField); // OK - same class
        privateMethod(); // OK - same class
    }
}

public class Child extends Parent {
    public void testInheritanceAccess() {
        System.out.println(publicField);    // OK - public
        System.out.println(protectedField); // OK - protected
        System.out.println(defaultField);   // OK - same package
        // System.out.println(privateField); // ERROR - private not inherited

        publicMethod();    // OK - public
        protectedMethod(); // OK - protected
        defaultMethod();   // OK - same package
        // privateMethod(); // ERROR - private not inherited
    }
}

class SamePackageClass {
    public void testAccess() {
        Parent parent = new Parent();
        System.out.println(parent.publicField);    // OK
        System.out.println(parent.protectedField); // OK - same package
        System.out.println(parent.defaultField);   // OK - same package
        // System.out.println(parent.privateField); // ERROR - private

        parent.publicMethod();    // OK
        parent.protectedMethod(); // OK - same package
        parent.defaultMethod();   // OK - same package
        // parent.privateMethod(); // ERROR - private
    }
}
\`\`\`

### **2. Method Overriding and Access**
\`\`\`java
public class Parent {
    public void publicMethod() {
        System.out.println("Parent public method");
    }

    protected void protectedMethod() {
        System.out.println("Parent protected method");
    }

    void defaultMethod() {
        System.out.println("Parent default method");
    }

    // Cannot override private methods
    private void privateMethod() {
        System.out.println("Parent private method");
    }
}

public class Child extends Parent {
    // Can override public method
    @Override
    public void publicMethod() {
        System.out.println("Child public method");
        super.publicMethod(); // Call parent method
    }

    // Can override protected method
    @Override
    protected void protectedMethod() {
        System.out.println("Child protected method");
    }

    // Can override default method (same package)
    @Override
    void defaultMethod() {
        System.out.println("Child default method");
    }

    // Cannot make method more restrictive
    // ERROR: Cannot reduce visibility
    // @Override
    // protected void publicMethod() { }

    // OK: Can make method more accessible
    // @Override
    // public void protectedMethod() { }
}

public class AccessDemo {
    public static void main(String[] args) {
        Child child = new Child();

        child.publicMethod(); // Calls overridden method
        // child.protectedMethod(); // Not accessible from different package
        // child.defaultMethod();   // Not accessible from different package
    }
}
\`\`\`

---

## 🎯 Inheritance Best Practices

### **1. Composition vs Inheritance**
\`\`\`java
// Inheritance approach (IS-A relationship)
public class Car extends Vehicle {
    private Engine engine; // Composition

    public Car(Engine engine) {
        this.engine = engine;
    }

    public void start() {
        engine.start(); // Delegation
        System.out.println("Car started");
    }
}

// Composition approach (HAS-A relationship)
public class Car {
    private Vehicle vehicle; // Composition
    private Engine engine;   // Composition

    public Car(Vehicle vehicle, Engine engine) {
        this.vehicle = vehicle;
        this.engine = engine;
    }

    public void start() {
        engine.start();
        System.out.println("Car started");
    }

    // Delegate to vehicle
    public void move() {
        vehicle.move();
    }
}

public class Engine {
    public void start() {
        System.out.println("Engine started");
    }
}

public class Vehicle {
    public void move() {
        System.out.println("Vehicle is moving");
    }
}
\`\`\`

### **2. Liskov Substitution Principle**
\`\`\`java
public class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getArea() {
        return width * height;
    }
}

// This violates LSP - Square is not a proper substitute for Rectangle
public class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        super.setWidth(width);
        super.setHeight(width); // Force square constraint
    }

    @Override
    public void setHeight(int height) {
        super.setWidth(height); // Force square constraint
        super.setHeight(height);
    }
}

public class LSPViolation {
    public static void main(String[] args) {
        Rectangle rect = new Square();
        rect.setWidth(5);
        rect.setHeight(10);

        // Expected: 50, Actual: 10 (violates LSP)
        System.out.println("Area: " + rect.getArea());
    }
}

// Better design - composition over inheritance
public class Square {
    private Rectangle rectangle;

    public Square(int side) {
        this.rectangle = new Rectangle();
        this.rectangle.setWidth(side);
        this.rectangle.setHeight(side);
    }

    public int getSide() {
        return rectangle.width;
    }

    public void setSide(int side) {
        rectangle.setWidth(side);
        rectangle.setHeight(side);
    }

    public int getArea() {
        return rectangle.getArea();
    }
}
\`\`\`

### **3. Avoiding Fragile Base Class Problem**
\`\`\`java
// Fragile base class - changes can break subclasses
public class BaseClass {
    public void process() {
        step1();
        step2();
        step3();
    }

    protected void step1() { System.out.println("Step 1"); }
    protected void step2() { System.out.println("Step 2"); }
    protected void step3() { System.out.println("Step 3"); }
}

// Subclass depends on specific order
public class SubClass extends BaseClass {
    private int counter = 0;

    @Override
    protected void step1() {
        counter++;
        System.out.println("Sub step 1, counter: " + counter);
    }

    @Override
    protected void step2() {
        counter *= 2;
        System.out.println("Sub step 2, counter: " + counter);
    }
}

// Better approach - Template Method Pattern
public abstract class TemplateBase {
    // Template method defines the algorithm
    public final void process() {
        doStep1();
        doStep2();
        doStep3();
    }

    // Hook methods for subclasses
    protected abstract void doStep1();
    protected abstract void doStep2();
    protected void doStep3() { } // Optional
}

public class TemplateSubClass extends TemplateBase {
    @Override
    protected void doStep1() {
        System.out.println("Template step 1");
    }

    @Override
    protected void doStep2() {
        System.out.println("Template step 2");
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Single inheritance**: One class extends one parent class
2. **Multilevel inheritance**: Class → Parent → Grandparent
3. **Hierarchical inheritance**: Multiple classes inherit from one parent
4. **Access control**: private members not inherited, protected accessible in subclasses
5. **Method overriding**: Same signature, different implementation
6. **Composition over inheritance**: Prefer HAS-A over IS-A when possible
7. **LSP**: Subtypes must be substitutable for their base types
8. **Template Method**: Define algorithm in base class, customize steps in subclasses

**Next:** Learn about polymorphism and method overriding! 🚀`
};
