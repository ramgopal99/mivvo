import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_2: SubLesson = {
  id: "7.2",
  title: 'Extending Classes',
  status: 'completed',
  content: "`# ðŸ”— Extending Classes in Java

The \`"extends\` keyword is used to create a subclass that inherits from a superclass. This mechanism allows subclasses to inherit fields and methods from their parent class while adding new functionality or modifying inherited behavior. Understanding how to properly extend classes is essential for effective inheritance design.

---

## ðŸ“‹ The extends Keyword

### **Basic Class Extension**
\`\`\`java
// Superclass (parent class)
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

// Subclass (child class) extends superclass
public class Dog extends Animal {
    private String breed;

    // Constructor calls super() implicitly or explicitly
    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }

    // Override inherited method
    @Override
    public void eat() {
        System.out.println(name + " is eating dog food");
    }

    // Add new method
    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    // Add new getter
    public String getBreed() {
        return breed;
    }
}

public class ExtensionDemo {
    public static void main(String[] args) {
        Dog myDog = new Dog("Buddy", 3, "Golden Retriever");

        // Inherited methods (some overridden)
        myDog.eat();    // "Buddy is eating dog food"
        myDog.sleep();  // "Buddy is sleeping"

        // Inherited properties
        System.out.println("Name: " + myDog.getName());
        System.out.println("Age: " + myDog.getAge());

        // Subclass-specific
        myDog.bark();
        System.out.println("Breed: " + myDog.getBreed());
    }
}
\`\`\`

### **Constructor Chaining with super()**
\`\`\`java
public class ConstructorChaining {
    static class Person {
        protected String name;
        protected int age;

        public Person() {
            this("Unknown", 0);
        }

        public Person(String name) {
            this(name, 0);
        }

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String toString() {
            return name + " (" + age + ")";
        }
    }

    static class Employee extends Person {
        private String department;
        private double salary;

        // Constructor must call super() or this()
        public Employee(String name, int age, String department, double salary) {
            super(name, age);  // Call parent constructor
            this.department = department;
            this.salary = salary;
        }

        // Constructor using this() for chaining
        public Employee(String name, String department, double salary) {
            this(name, 0, department, salary);
        }

        @Override
        public String toString() {
            return super.toString() + " - " + department + " ($" + salary + ")";
        }
    }

    public static void main(String[] args) {
        Employee emp1 = new Employee("Alice", 30, "Engineering", 75000);
        Employee emp2 = new Employee("Bob", "Marketing", 65000);

        System.out.println(emp1);
        System.out.println(emp2);
    }
}
\`\`\`

---

## ðŸ”„ Method Overriding

### **@Override Annotation**
\`\`\`java
public class MethodOverriding {
    static class Vehicle {
        public void start() {
            System.out.println("Vehicle starting");
        }

        public void stop() {
            System.out.println("Vehicle stopping");
        }

        public String getDescription() {
            return "A vehicle";
        }
    }

    static class Car extends Vehicle {
        @Override  // Good practice: explicit override annotation
        public void start() {
            System.out.println("Car engine starting");
            super.start();  // Call parent method
        }

        @Override
        public String getDescription() {
            return "A car";  // Completely replace parent behavior
        }

        // Not overriding - different method signature
        public void start(boolean quiet) {
            if (quiet) {
                System.out.println("Car starting quietly");
            } else {
                start();  // Call overridden method
            }
        }
    }

    public static void main(String[] args) {
        Car car = new Car();
        car.start();           // Overridden method
        car.start(true);       // Overloaded method
        car.stop();            // Inherited method
        System.out.println(car.getDescription());
    }
}
\`\`\`

### **Rules for Method Overriding**
\`\`\`java
public class OverridingRules {
    static class Parent {
        public void method1() { System.out.println("Parent method1"); }
        protected void method2() { System.out.println("Parent method2"); }
        public final void method3() { System.out.println("Parent method3"); }
        private void method4() { System.out.println("Parent method4"); }
        public void method5(int x) { System.out.println("Parent method5: " + x); }
    }

    static class Child extends Parent {
        // âœ… Valid override: same signature, compatible return type
        @Override
        public void method1() {
            System.out.println("Child method1");
        }

        // âœ… Valid override: can make visibility more permissive
        @Override
        public void method2() {
            System.out.println("Child method2");
        }

        // âŒ Invalid: cannot override final method
        // @Override
        // public void method3() { }

        // âŒ Invalid: private methods are not inherited
        // @Override
        // public void method4() { }

        // âœ… Valid overload: different parameter list
        public void method5(int x, int y) {
            System.out.println("Child method5: " + x + ", " + y);
        }

        // âŒ Invalid: cannot make visibility more restrictive
        // @Override
        // protected void method2() { }  // Less visible than parent
    }

    public static void main(String[] args) {
        Child child = new Child();
        child.method1();       // Child method1
        child.method2();       // Child method2
        child.method5(10);     // Parent method5: 10
        child.method5(10, 20); // Child method5: 10, 20
    }
}
\`\`\`

---

## ðŸ”’ Access to Inherited Members

### **Inherited Field Access**
\`\`\`java
public class FieldInheritance {
    static class Parent {
        public String publicField = "Public";
        protected String protectedField = "Protected";
        private String privateField = "Private";
        String defaultField = "Default";  // Package-private
    }

    static class Child extends Parent {
        public void accessFields() {
            // Accessible fields
            System.out.println(publicField);     // âœ… Public
            System.out.println(protectedField);  // âœ… Protected
            System.out.println(defaultField);    // âœ… Package-private (same package)

            // Inaccessible field
            // System.out.println(privateField); // âŒ Private not inherited
        }

        public void modifyFields() {
            publicField = "Modified public";
            protectedField = "Modified protected";
            defaultField = "Modified default";
        }
    }

    public static void main(String[] args) {
        Child child = new Child();
        child.accessFields();
        child.modifyFields();
        child.accessFields();
    }
}
\`\`\`

### **super Keyword Usage**
\`\`\`java
public class SuperKeyword {
    static class Parent {
        protected String name = "Parent";
        protected int value = 10;

        public void display() {
            System.out.println("Parent display: " + name);
        }

        public void method() {
            System.out.println("Parent method");
        }
    }

    static class Child extends Parent {
        private String name = "Child";  // Hides parent field
        private int value = 20;         // Hides parent field

        @Override
        public void display() {
            System.out.println("Child display: " + name);
            System.out.println("Parent name via super: " + super.name);
            System.out.println("Child value: " + value);
            System.out.println("Parent value via super: " + super.value);
        }

        public void callParentMethod() {
            super.method();  // Call parent method
            method();        // Call overridden method
        }

        public void constructorExample() {
            // super() is called automatically if not specified
            System.out.println("Child constructor");
        }
    }

    public static void main(String[] args) {
        Child child = new Child();
        child.display();
        System.out.println();
        child.callParentMethod();
    }
}
\`\`\`

---

## ðŸŽ¯ Extending Abstract Classes

### **Abstract Class Extension**
\`\`\`java
public abstract class AbstractExtension {
    // Abstract class
    abstract static class Shape {
        protected String color;

        public Shape(String color) {
            this.color = color;
        }

        // Abstract method - must be implemented
        public abstract double getArea();

        // Concrete method - inherited
        public String getColor() {
            return color;
        }

        public void display() {
            System.out.println(color + " shape with area " + getArea());
        }
    }

    // Concrete subclass
    static class Circle extends Shape {
        private double radius;

        public Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        public double getArea() {
            return Math.PI * radius * radius;
        }

        public double getRadius() {
            return radius;
        }
    }

    // Another concrete subclass
    static class Rectangle extends Shape {
        private double width, height;

        public Rectangle(String color, double width, double height) {
            super(color);
            this.width = width;
            this.height = height;
        }

        @Override
        public double getArea() {
            return width * height;
        }
    }

    public static void main(String[] args) {
        Circle circle = new Circle("Red", 5.0);
        Rectangle rect = new Rectangle("Blue", 10.0, 8.0);

        circle.display();  // Red shape with area 78.54...
        rect.display();    // Blue shape with area 80.0

        // Cannot instantiate abstract class
        // Shape shape = new Shape("Green"); // Compilation error
    }
}
\`\`\`

---

## ðŸ”„ Multiple Levels of Extension

### **Multilevel Inheritance**
\`\`\`java
public class MultilevelExtension {
    static class Animal {
        protected String species;

        public Animal(String species) {
            this.species = species;
        }

        public void breathe() {
            System.out.println(species + " is breathing");
        }
    }

    static class Mammal extends Animal {
        protected boolean hasFur;

        public Mammal(String species, boolean hasFur) {
            super(species);
            this.hasFur = hasFur;
        }

        public void giveBirth() {
            System.out.println(species + " gives birth to live young");
        }
    }

    static class Dog extends Mammal {
        private String breed;

        public Dog(String breed) {
            super("Dog", true);
            this.breed = breed;
        }

        public void bark() {
            System.out.println(breed + " dog barks: Woof!");
        }

        @Override
        public void giveBirth() {
            System.out.println(breed + " gives birth to puppies");
        }
    }

    static class Labrador extends Dog {
        public Labrador() {
            super("Labrador");
        }

        public void swim() {
            System.out.println("Labrador swims well");
        }

        @Override
        public void bark() {
            System.out.println("Labrador barks: Ruff!");
        }
    }

    public static void main(String[] args) {
        Labrador lab = new Labrador();

        // Inherited from Animal
        lab.breathe();

        // Inherited from Mammal
        lab.giveBirth();

        // Inherited from Dog (overridden)
        lab.bark();

        // Labrador-specific
        lab.swim();
    }
}
\`\`\`

---

## ðŸŽ¯ Extension Best Practices

### **Composition vs Inheritance**
\`\`\`java
public class CompositionVsInheritance {
    // Sometimes composition is better than inheritance

    // Inheritance approach
    static class Car extends Vehicle {
        public void drive() {
            System.out.println("Car drives on road");
        }
    }

    static class Vehicle {
        public void start() {
            System.out.println("Vehicle starting");
        }
    }

    // Composition approach (more flexible)
    static class FlyingCar {
        private Car car;
        private Airplane airplane;

        public FlyingCar() {
            this.car = new Car();
            this.airplane = new Airplane();
        }

        public void drive() {
            car.start();
            System.out.println("Flying car drives");
        }

        public void fly() {
            airplane.takeOff();
            System.out.println("Flying car flies");
        }
    }

    static class Airplane {
        public void takeOff() {
            System.out.println("Airplane taking off");
        }
    }

    public static void main(String[] args) {
        FlyingCar flyingCar = new FlyingCar();
        flyingCar.drive();
        flyingCar.fly();
    }
}
\`\`\`

### **The Template Method Pattern**
\`\`\`java
public class TemplateMethodPattern {
    // Abstract base class with template method
    abstract static class Game {
        // Template method - defines algorithm structure
        public final void play() {
            initialize();
            startPlay();
            endPlay();
        }

        // Abstract methods to be implemented by subclasses
        protected abstract void initialize();
        protected abstract void startPlay();
        protected abstract void endPlay();

        // Hook method - can be overridden optionally
        protected void printWinner() {
            System.out.println("Game finished!");
        }
    }

    // Concrete implementation
    static class Chess extends Game {
        @Override
        protected void initialize() {
            System.out.println("Setting up chess board");
        }

        @Override
        protected void startPlay() {
            System.out.println("Playing chess...");
        }

        @Override
        protected void endPlay() {
            System.out.println("Chess game ended");
            printWinner();
        }

        @Override
        protected void printWinner() {
            System.out.println("Checkmate! White wins!");
        }
    }

    static class Monopoly extends Game {
        @Override
        protected void initialize() {
            System.out.println("Setting up Monopoly board and money");
        }

        @Override
        protected void startPlay() {
            System.out.println("Playing Monopoly...");
        }

        @Override
        protected void endPlay() {
            System.out.println("Monopoly game ended");
            printWinner();
        }
    }

    public static void main(String[] args) {
        Game chess = new Chess();
        Game monopoly = new Monopoly();

        System.out.println("Playing Chess:");
        chess.play();

        System.out.println("\\nPlaying Monopoly:");
        monopoly.play();
    }
}
\`\`\`

---

## ðŸŽ¯ Extension Guidelines

### **1. Follow the IS-A Relationship**
\`\`\`java
public class IsARelationship {
    // âœ… Good: Car IS-A Vehicle
    static class Vehicle {
        public void move() {
            System.out.println("Vehicle moves");
        }
    }

    static class Car extends Vehicle {
        @Override
        public void move() {
            System.out.println("Car drives");
        }
    }

    // âŒ Bad: Square IS-NOT-A Rectangle (violates Liskov Substitution)
    static class Rectangle {
        protected int width, height;

        public void setWidth(int width) { this.width = width; }
        public void setHeight(int height) { this.height = height; }
        public int getArea() { return width * height; }
    }

    static class BadSquare extends Rectangle {
        @Override
        public void setWidth(int width) {
            this.width = width;
            this.height = width;  // Forces square constraint
        }

        @Override
        public void setHeight(int height) {
            this.width = height;
            this.height = height; // Forces square constraint
        }
    }

    public static void main(String[] args) {
        // This works fine
        Car car = new Car();
        car.move();

        // This demonstrates the problem
        Rectangle square = new BadSquare();
        square.setWidth(5);
        square.setHeight(10);
        System.out.println("Area: " + square.getArea()); // 100, not 50 as expected!
    }
}
\`\`\`

### **2. Use Protected for Extensible Behavior**
\`\`\`java
public class ProtectedExtension {
    static class BaseProcessor {
        public final void process() {
            loadData();
            validateData();
            processData();
            saveResults();
        }

        protected void loadData() {
            System.out.println("Loading data from file");
        }

        protected void validateData() {
            System.out.println("Validating data");
        }

        protected void processData() {
            System.out.println("Processing data");
        }

        protected void saveResults() {
            System.out.println("Saving results to file");
        }
    }

    static class CustomProcessor extends BaseProcessor {
        @Override
        protected void loadData() {
            System.out.println("Loading data from database");
        }

        @Override
        protected void validateData() {
            super.validateData();
            System.out.println("Additional custom validation");
        }

        @Override
        protected void processData() {
            System.out.println("Custom processing logic");
        }
    }

    public static void main(String[] args) {
        BaseProcessor standard = new BaseProcessor();
        CustomProcessor custom = new CustomProcessor();

        System.out.println("Standard processing:");
        standard.process();

        System.out.println("\\nCustom processing:");
        custom.process();
    }
}
\`\`\`

### **3. Prefer Composition over Deep Inheritance**
\`\`\`java
public class CompositionOverDeepInheritance {
    // âŒ Deep inheritance hierarchy
    static class A { public void methodA() {} }
    static class B extends A { public void methodB() {} }
    static class C extends B { public void methodC() {} }
    static class D extends C { public void methodD() {} }

    // âœ… Composition approach
    static class ComposedClass {
        private A a;
        private B b;
        private C c;
        private D d;

        public ComposedClass() {
            this.d = new D();  // D has access to A, B, C methods
            this.c = d;
            this.b = d;
            this.a = d;
        }

        public void useAllMethods() {
            a.methodA();
            // b.methodB();  // Would need casting
            // c.methodC();  // Would need casting
            // d.methodD();  // Would need casting
        }
    }

    // Better composition with delegation
    static class BetterComposition {
        private final A a = new A();
        private final B b = new B();
        private final C c = new C();
        private final D d = new D();

        public void methodA() { a.methodA(); }
        public void methodB() { b.methodB(); }
        public void methodC() { c.methodC(); }
        public void methodD() { d.methodD(); }
    }

    public static void main(String[] args) {
        BetterComposition composed = new BetterComposition();
        composed.methodA();
        composed.methodB();
        composed.methodC();
        composed.methodD();
    }
}
\`\`\`

### **4. Use Abstract Classes for Incomplete Implementations**
\`\`\`java
public class AbstractClassUsage {
    // Abstract class for shapes
    abstract static class Shape {
        protected String color;

        public Shape(String color) {
            this.color = color;
        }

        // Abstract method - subclasses must implement
        public abstract double calculateArea();

        // Concrete method - inherited as-is
        public void displayColor() {
            System.out.println("Color: " + color);
        }

        // Template method
        public void displayInfo() {
            displayColor();
            System.out.println("Area: " + calculateArea());
        }
    }

    // Concrete implementations
    static class Circle extends Shape {
        private double radius;

        public Circle(String color, double radius) {
            super(color);
            this.radius = radius;
        }

        @Override
        public double calculateArea() {
            return Math.PI * radius * radius;
        }
    }

    static class Square extends Shape {
        private double side;

        public Square(String color, double side) {
            super(color);
            this.side = side;
        }

        @Override
        public double calculateArea() {
            return side * side;
        }
    }

    public static void main(String[] args) {
        Shape circle = new Circle("Red", 5.0);
        Shape square = new Square("Blue", 4.0);

        circle.displayInfo();  // Uses template method
        square.displayInfo();  // Uses template method

        // Cannot instantiate abstract class
        // Shape shape = new Shape("Green"); // Compilation error
    }
}
\`\`\`

Extending classes with the \`extends\` keyword is fundamental to inheritance. Always ensure proper constructor chaining with \`super()\`, follow method overriding rules, and consider whether inheritance or composition is more appropriate for your design! ðŸ”—`
};


