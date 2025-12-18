import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: 9.1,
  title: 'Introduction to Inheritance',
  status: 'completed',
  content: `# 🧬 Introduction to Inheritance in Java

Inheritance is one of the core principles of object-oriented programming. It allows classes to inherit properties and behaviors from other classes, creating hierarchical relationships that promote code reuse and extensibility. Understanding inheritance is crucial for designing flexible and maintainable Java applications.

---

## 📋 Inheritance Fundamentals

### **What is Inheritance?**

Inheritance is a mechanism where one class (subclass/child class) acquires the properties and behaviors of another class (superclass/parent class). The subclass can then extend or modify the inherited functionality.

### **Why Use Inheritance?**

#### **1. Code Reusability**
Avoid rewriting code by inheriting existing functionality.

#### **2. Method Overriding**
Modify inherited behavior to suit specific needs.

#### **3. Polymorphism**
Same interface, different implementations.

#### **4. Hierarchical Classification**
Create logical class hierarchies that reflect real-world relationships.

---

## 🔗 Basic Inheritance Syntax

### **extends Keyword**

The \`extends\` keyword creates an inheritance relationship between classes.

\`\`\`java
// Superclass (Parent class)
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

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

// Subclass (Child class) - inherits from Animal
public class Dog extends Animal {
    private String breed;

    // Constructor calls superclass constructor
    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }

    // Additional method specific to Dog
    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    // Override inherited method
    @Override
    public void eat() {
        System.out.println(name + " (a " + breed + ") is eating dog food");
    }

    public String getBreed() {
        return breed;
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        // Create Dog object
        Dog myDog = new Dog("Buddy", 3, "Golden Retriever");

        // Inherited methods
        System.out.println("Name: " + myDog.getName());
        System.out.println("Age: " + myDog.getAge());
        myDog.sleep();

        // Overridden method
        myDog.eat();

        // Subclass-specific method
        myDog.bark();
        System.out.println("Breed: " + myDog.getBreed());
    }
}
\`\`\`

---

## 🎯 Key Inheritance Concepts

### **1. super Keyword**

The \`super\` keyword refers to the superclass and is used to:

#### **Call Superclass Constructor**
\`\`\`java
public class Vehicle {
    private String brand;
    private int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }
}

public class Car extends Vehicle {
    private int doors;

    public Car(String brand, int year, int doors) {
        super(brand, year);  // Call Vehicle constructor
        this.doors = doors;
    }
}
\`\`\`

#### **Call Superclass Methods**
\`\`\`java
public class Parent {
    public void display() {
        System.out.println("Parent display");
    }
}

public class Child extends Parent {
    @Override
    public void display() {
        super.display();  // Call parent method
        System.out.println("Child display");  // Add child behavior
    }
}
\`\`\`

#### **Access Superclass Fields**
\`\`\`java
public class Shape {
    protected double area;
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
        super.area = Math.PI * radius * radius;  // Access parent field
    }
}
\`\`\`

### **2. Method Overriding**

Method overriding allows a subclass to provide a specific implementation of a method already defined in its superclass.

#### **Rules for Method Overriding**
\`\`\`java
public class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }

    public void move() {
        System.out.println("Animal moves");
    }
}

public class Cat extends Animal {
    // ✅ Valid override: same signature, covariant return type allowed
    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }

    // ✅ Valid override: more accessible
    @Override
    public void move() {
        System.out.println("Cat walks gracefully");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }

    @Override
    public void move() {
        System.out.println("Dog runs");
    }
}
\`\`\`

#### **@Override Annotation**

The \`@Override\` annotation is optional but recommended. It tells the compiler that you intend to override a method.

\`\`\`java
public class Calculator {
    public double calculate(double a, double b) {
        return a + b;
    }
}

public class ScientificCalculator extends Calculator {
    @Override  // Compiler checks this is actually overriding
    public double calculate(double a, double b) {
        // If method signature doesn't match parent, compiler error
        return Math.sqrt(a * a + b * b);
    }
}
\`\`\`

### **3. Access Modifiers in Inheritance**

#### **public**: Accessible everywhere
#### **protected**: Accessible within package and subclasses
#### **default (package-private)**: Accessible within package only
#### **private**: Accessible within class only

\`\`\`java
public class Parent {
    public int publicField = 1;
    protected int protectedField = 2;
    int defaultField = 3;           // package-private
    private int privateField = 4;

    public void testAccess() {
        System.out.println(privateField);     // ✅ Accessible
        System.out.println(defaultField);     // ✅ Accessible
        System.out.println(protectedField);   // ✅ Accessible
        System.out.println(publicField);      // ✅ Accessible
    }
}

public class Child extends Parent {
    public void testInheritedAccess() {
        System.out.println(publicField);      // ✅ Inherited
        System.out.println(protectedField);   // ✅ Inherited
        System.out.println(defaultField);     // ✅ Inherited (same package)
        // System.out.println(privateField);  // ❌ Not inherited
    }
}

class Sibling {
    public void testSiblingAccess() {
        Parent obj = new Parent();
        System.out.println(obj.publicField);      // ✅ Accessible
        // System.out.println(obj.protectedField); // ❌ Not accessible (different class)
        // System.out.println(obj.defaultField);   // ❌ Not accessible (different class)
        // System.out.println(obj.privateField);   // ❌ Not accessible
    }
}
\`\`\`

---

## 🏗️ Types of Inheritance

### **1. Single Inheritance**

A class inherits from only one superclass.

\`\`\`java
public class Animal { }           // Superclass

public class Mammal extends Animal { }  // Single inheritance

public class Dog extends Mammal { }     // Single inheritance

// Dog inherits from Mammal, which inherits from Animal
// This creates a hierarchy: Animal → Mammal → Dog
\`\`\`

### **2. Multilevel Inheritance**

A class inherits from another class, which itself inherits from another class.

\`\`\`java
public class LivingBeing {
    public void breathe() {
        System.out.println("Breathing...");
    }
}

public class Animal extends LivingBeing {
    public void move() {
        System.out.println("Moving...");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println("Woof!");
    }
}

public class InheritanceHierarchy {
    public static void main(String[] args) {
        Dog dog = new Dog();

        // Inherited from LivingBeing
        dog.breathe();

        // Inherited from Animal
        dog.move();

        // Own method
        dog.bark();
    }
}
\`\`\`

### **3. Hierarchical Inheritance**

Multiple classes inherit from the same superclass.

\`\`\`java
public class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public void displayColor() {
        System.out.println("Color: " + color);
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color);
        this.length = length;
        this.width = width;
    }

    public double getArea() {
        return length * width;
    }
}

public class Triangle extends Shape {
    private double base;
    private double height;

    public Triangle(String color, double base, double height) {
        super(color);
        this.base = base;
        this.height = height;
    }

    public double getArea() {
        return 0.5 * base * height;
    }
}

public class HierarchicalDemo {
    public static void main(String[] args) {
        Circle circle = new Circle("Red", 5.0);
        Rectangle rectangle = new Rectangle("Blue", 4.0, 6.0);
        Triangle triangle = new Triangle("Green", 3.0, 4.0);

        // All inherit displayColor from Shape
        circle.displayColor();
        rectangle.displayColor();
        triangle.displayColor();

        // Each has its own getArea implementation
        System.out.println("Circle area: " + circle.getArea());
        System.out.println("Rectangle area: " + rectangle.getArea());
        System.out.println("Triangle area: " + triangle.getArea());
    }
}
\`\`\`

---

## 🔒 final Keyword in Inheritance

### **final Classes**

A final class cannot be inherited from.

\`\`\`java
public final class MathUtils {
    public static double PI = 3.14159;

    public static double calculateCircleArea(double radius) {
        return PI * radius * radius;
    }
}

// ❌ Compilation error: cannot inherit from final class
// public class AdvancedMath extends MathUtils { }
\`\`\`

### **final Methods**

A final method cannot be overridden.

\`\`\`java
public class Vehicle {
    public final void startEngine() {
        System.out.println("Engine starting...");
    }

    public void drive() {
        System.out.println("Vehicle driving...");
    }
}

public class Car extends Vehicle {
    // ✅ Can override non-final methods
    @Override
    public void drive() {
        System.out.println("Car driving...");
    }

    // ❌ Compilation error: cannot override final method
    // @Override
    // public void startEngine() { }
}
\`\`\`

### **final Variables in Inheritance**

\`\`\`java
public class Constants {
    public final double PI = 3.14159;
    public final int MAX_USERS = 1000;
}

public class Circle extends Constants {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getArea() {
        return PI * radius * radius;  // Can use inherited final constants
    }

    // ❌ Cannot modify final inherited fields
    // public void modifyPI() {
    //     PI = 3.14;  // Compilation error
    // }
}
\`\`\`

---

## 🎯 Practical Inheritance Examples

### **Employee Management System**

\`\`\`java
// Base class
public class Employee {
    protected String name;
    protected String employeeId;
    protected double baseSalary;

    public Employee(String name, String employeeId, double baseSalary) {
        this.name = name;
        this.employeeId = employeeId;
        this.baseSalary = baseSalary;
    }

    public double calculateSalary() {
        return baseSalary;
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("ID: " + employeeId);
        System.out.println("Base Salary: $" + baseSalary);
    }
}

// Subclass 1
public class Manager extends Employee {
    private double bonus;

    public Manager(String name, String employeeId, double baseSalary, double bonus) {
        super(name, employeeId, baseSalary);
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() {
        return super.calculateSalary() + bonus;
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Bonus: $" + bonus);
        System.out.println("Total Salary: $" + calculateSalary());
        System.out.println("Position: Manager");
    }
}

// Subclass 2
public class Developer extends Employee {
    private String programmingLanguage;
    private int experienceYears;

    public Developer(String name, String employeeId, double baseSalary,
                    String programmingLanguage, int experienceYears) {
        super(name, employeeId, baseSalary);
        this.programmingLanguage = programmingLanguage;
        this.experienceYears = experienceYears;
    }

    @Override
    public double calculateSalary() {
        // Experience bonus: $1000 per year
        return super.calculateSalary() + (experienceYears * 1000);
    }

    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.println("Programming Language: " + programmingLanguage);
        System.out.println("Experience: " + experienceYears + " years");
        System.out.println("Experience Bonus: $" + (experienceYears * 1000));
        System.out.println("Total Salary: $" + calculateSalary());
        System.out.println("Position: Developer");
    }
}

public class EmployeeDemo {
    public static void main(String[] args) {
        // Create different types of employees
        Manager manager = new Manager("Alice Johnson", "M001", 80000, 15000);
        Developer developer = new Developer("Bob Smith", "D001", 70000, "Java", 5);

        System.out.println("=== Manager Information ===");
        manager.displayInfo();

        System.out.println("\\n=== Developer Information ===");
        developer.displayInfo();

        // Polymorphism: treat different objects uniformly
        Employee[] employees = {manager, developer};

        System.out.println("\\n=== All Employees ===");
        for (Employee emp : employees) {
            System.out.println("\\n" + emp.name + "'s total salary: $" + emp.calculateSalary());
        }
    }
}
\`\`\`

### **Shape Hierarchy**

\`\`\`java
// Abstract base class (will be covered in next module)
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public abstract double getArea();
    public abstract double getPerimeter();

    public void displayInfo() {
        System.out.println("Color: " + color);
        System.out.println("Area: " + getArea());
        System.out.println("Perimeter: " + getPerimeter());
    }
}

public class Rectangle extends Shape {
    private double length;
    private double width;

    public Rectangle(String color, double length, double width) {
        super(color);
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
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
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
}

public class Triangle extends Shape {
    private double base;
    private double height;
    private double side1;
    private double side2;

    public Triangle(String color, double base, double height,
                   double side1, double side2) {
        super(color);
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
}

public class ShapeDemo {
    public static void main(String[] args) {
        // Create different shapes
        Rectangle rectangle = new Rectangle("Red", 5.0, 3.0);
        Circle circle = new Circle("Blue", 4.0);
        Triangle triangle = new Triangle("Green", 6.0, 4.0, 5.0, 5.0);

        Shape[] shapes = {rectangle, circle, triangle};

        System.out.println("=== Shape Information ===");
        for (int i = 0; i < shapes.length; i++) {
            System.out.println("\\nShape " + (i + 1) + ":");
            shapes[i].displayInfo();
        }

        // Calculate total area
        double totalArea = 0;
        for (Shape shape : shapes) {
            totalArea += shape.getArea();
        }
        System.out.println("\\nTotal area of all shapes: " + totalArea);
    }
}
\`\`\`

---

## ⚠️ Common Inheritance Mistakes

### **1. Overriding vs Overloading Confusion**

\`\`\`java
public class Confusion {
    public static class Parent {
        public void display() {
            System.out.println("Parent display");
        }
    }

    public static class Child extends Parent {
        // ❌ This is overloading, not overriding!
        // Different parameter list = method overloading
        public void display(String message) {
            System.out.println("Child display: " + message);
        }

        // ✅ This is overriding
        @Override
        public void display() {
            System.out.println("Child display");
        }
    }
}
\`\`\`

### **2. Breaking Encapsulation**

\`\`\`java
public class BadInheritance {
    public static class Parent {
        public int balance = 1000;  // Should be private!
    }

    public static class Child extends Parent {
        public void stealMoney() {
            balance = 0;  // Direct access to inherited field
        }
    }

    // ✅ Better approach
    public static class GoodParent {
        private int balance = 1000;

        public int getBalance() {
            return balance;
        }

        protected void setBalance(int balance) {
            this.balance = balance;
        }
    }

    public static class GoodChild extends GoodParent {
        public void resetBalance() {
            setBalance(0);  // Proper encapsulation
        }
    }
}
\`\`\`

### **3. Not Calling Superclass Constructors**

\`\`\`java
public class ConstructorMistake {
    public static class Parent {
        private String name;

        public Parent(String name) {
            this.name = name;
        }
    }

    public static class Child extends Parent {
        private int age;

        // ❌ Forgot to call super() - compilation error
        // public Child(String name, int age) {
        //     this.age = age;
        // }

        // ✅ Correct: call super() first
        public Child(String name, int age) {
            super(name);  // Initialize parent first
            this.age = age;
        }
    }
}
\`\`\`

---

## 🎯 Inheritance Best Practices

### **1. Follow Liskov Substitution Principle**

Subclasses should be substitutable for their parent classes.

\`\`\`java
public class LSPExample {
    public static class Rectangle {
        protected int width;
        protected int height;

        public void setWidth(int width) { this.width = width; }
        public void setHeight(int height) { this.height = height; }
        public int getArea() { return width * height; }
    }

    // ❌ Bad: breaks LSP - Square is not a proper Rectangle
    public static class BadSquare extends Rectangle {
        @Override
        public void setWidth(int width) {
            this.width = width;
            this.height = width;  // Forces height = width
        }

        @Override
        public void setHeight(int height) {
            this.height = height;
            this.width = height;  // Forces width = height
        }
    }

    // ✅ Better: Use composition or different design
    public static class Square {
        private int side;

        public Square(int side) {
            this.side = side;
        }

        public int getArea() {
            return side * side;
        }
    }
}
\`\`\`

### **2. Prefer Composition over Inheritance**

\`\`\`java
public class CompositionExample {
    // ❌ Inheritance approach (tight coupling)
    public static class Car extends Engine {
        // Car is an Engine? Not really...
    }

    // ✅ Composition approach (loose coupling)
    public static class BetterCar {
        private Engine engine;  // Car has an Engine

        public BetterCar(Engine engine) {
            this.engine = engine;
        }

        public void start() {
            engine.start();
        }
    }

    public static class Engine {
        public void start() {
            System.out.println("Engine started");
        }
    }
}
\`\`\`

### **3. Use Abstract Classes for Incomplete Implementations**

\`\`\`java
// Preview of next module
public abstract class AbstractShape {
    protected String color;

    public AbstractShape(String color) {
        this.color = color;
    }

    // Abstract method - must be implemented by subclasses
    public abstract double getArea();

    // Concrete method - inherited as-is
    public void displayColor() {
        System.out.println("Color: " + color);
    }
}
\`\`\`

---

## 🎯 Summary

Inheritance is a powerful OOP mechanism that enables:

### **Key Concepts**
- **extends**: Creates inheritance relationship
- **super**: Access superclass members
- **@Override**: Method overriding annotation
- **final**: Prevent inheritance/overriding

### **Inheritance Hierarchy**
\`\`\`
Object (implicit parent of all classes)
├── Custom Classes
├── Collections
├── Exceptions
└── Many others...
\`\`\`

### **Method Overriding Rules**
- Same method name and parameters
- Same or covariant return type
- Cannot be more restrictive access modifier
- Cannot override final methods
- Cannot override static methods

### **Access Rules**
- **private**: Not inherited
- **default**: Inherited within package
- **protected**: Inherited, accessible in subclasses
- **public**: Inherited and accessible everywhere

### **Best Practices**
- Use inheritance for "is-a" relationships
- Prefer composition for "has-a" relationships
- Don't break encapsulation
- Call \`super()\` in constructors
- Use \`@Override\` annotation
- Keep inheritance hierarchies shallow

### **Common Patterns**
- **Template Method**: Abstract base with concrete steps
- **Strategy Pattern**: Different algorithms for same interface
- **Decorator Pattern**: Add behavior dynamically
- **Factory Method**: Create objects in subclasses

Master inheritance and you'll be able to create flexible, extensible class hierarchies that model real-world relationships effectively!

### **Quick Check**
What will be the output of this inheritance code?
\`\`\`java
class Animal {
    public void sound() { System.out.println("Animal sound"); }
}

class Dog extends Animal {
    @Override
    public void sound() { System.out.println("Woof"); }
}

public class Test {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.sound();
    }
}
\`\`\`
Output: ?
`};

