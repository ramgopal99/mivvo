import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: "7.6",
  title: 'When to Use Inheritance',
  status: 'completed',
  content: "`# ðŸŽ¯ When to Use Inheritance in Java

Inheritance is a powerful feature of object-oriented programming, but it's often overused or misused. Knowing when to use inheritance versus other design approaches like composition is crucial for creating maintainable and flexible Java applications. This topic explores the appropriate use cases for inheritance and when to choose alternative approaches.

---

## ðŸ“‹ Inheritance Decision Criteria

### **The IS-A Relationship Test**
\`"\`\`java
public class IsARelationshipTest {
    // âœ… Good inheritance: Car IS-A Vehicle
    static class Vehicle {
        protected String brand;
        protected int year;

        public Vehicle(String brand, int year) {
            this.brand = brand;
            this.year = year;
        }

        public void start() {
            System.out.println("Vehicle starting");
        }

        public void stop() {
            System.out.println("Vehicle stopping");
        }
    }

    static class Car extends Vehicle {
        private int doors;

        public Car(String brand, int year, int doors) {
            super(brand, year);
            this.doors = doors;
        }

        @Override
        public void start() {
            System.out.println(brand + " car with " + doors + " doors starting");
        }

        public void drive() {
            System.out.println("Car driving");
        }
    }

    // âŒ Bad inheritance: Square IS-NOT-A Rectangle (violates Liskov Substitution)
    static class BadRectangle {
        protected int width, height;

        public void setWidth(int width) { this.width = width; }
        public void setHeight(int height) { this.height = height; }
        public int getArea() { return width * height; }
    }

    static class BadSquare extends BadRectangle {
        @Override
        public void setWidth(int width) {
            this.width = width;
            this.height = width;  // Forces square constraint
        }

        @Override
        public void setHeight(int height) {
            this.width = height;
            this.height = height;  // Forces square constraint
        }
    }

    public static void main(String[] args) {
        // Good inheritance
        Car car = new Car("Toyota", 2020, 4);
        car.start();
        car.drive();

        // Problem with bad inheritance
        BadRectangle square = new BadSquare();
        square.setWidth(5);
        square.setHeight(10);
        System.out.println("Area should be 50, but is: " + square.getArea()); // 100!
    }
}
\`\`\`

### **Inheritance vs Composition Guidelines**
\`\`\`java
public class InheritanceVsComposition {
    // âŒ Bad: Inheritance for HAS-A relationship
    static class Engine {
        public void start() { System.out.println("Engine starting"); }
        public void stop() { System.out.println("Engine stopping"); }
    }

    // Wrong: Car IS-NOT-A Engine
    static class BadCar extends Engine {
        public void drive() { System.out.println("Car driving"); }
    }

    // âœ… Good: Composition for HAS-A relationship
    static class GoodCar {
        private Engine engine;  // Car HAS-A Engine

        public GoodCar() {
            this.engine = new Engine();
        }

        public void start() {
            engine.start();
            System.out.println("Car ready to drive");
        }

        public void drive() {
            System.out.println("Car driving");
        }

        public void stop() {
            engine.stop();
            System.out.println("Car stopped");
        }
    }

    // âœ… Good: Inheritance for IS-A relationship
    static class Employee {
        protected String name;
        protected double salary;

        public Employee(String name, double salary) {
            this.name = name;
            this.salary = salary;
        }

        public void work() {
            System.out.println(name + " is working");
        }

        public double getSalary() {
            return salary;
        }
    }

    // Manager IS-A Employee (inheritance appropriate)
    static class Manager extends Employee {
        private int teamSize;

        public Manager(String name, double salary, int teamSize) {
            super(name, salary);
            this.teamSize = teamSize;
        }

        @Override
        public void work() {
            System.out.println(name + " is managing a team of " + teamSize);
        }

        public void conductMeeting() {
            System.out.println(name + " is conducting a team meeting");
        }
    }

    public static void main(String[] args) {
        GoodCar car = new GoodCar();
        car.start();
        car.drive();
        car.stop();

        System.out.println();

        Manager manager = new Manager("Alice", 80000, 5);
        manager.work();
        manager.conductMeeting();
    }
}
\`\`\`

---

## ðŸŽ¯ Appropriate Uses for Inheritance

### **1. Modeling Hierarchical Classifications**
\`\`\`java
public class HierarchicalModeling {
    // âœ… Perfect for inheritance: Animal classification
    abstract static class Animal {
        protected String species;
        protected String habitat;

        public Animal(String species, String habitat) {
            this.species = species;
            this.habitat = habitat;
        }

        public abstract void makeSound();
        public abstract void move();

        public void breathe() {
            System.out.println(species + " breathes air");
        }

        public String getDescription() {
            return species + " lives in " + habitat;
        }
    }

    static class Mammal extends Animal {
        private boolean hasFur;

        public Mammal(String species, String habitat, boolean hasFur) {
            super(species, habitat);
            this.hasFur = hasFur;
        }

        public void giveBirth() {
            System.out.println(species + " gives birth to live young");
        }

        public boolean hasFur() { return hasFur; }
    }

    static class Bird extends Animal {
        private boolean canFly;

        public Bird(String species, String habitat, boolean canFly) {
            super(species, habitat);
            this.canFly = canFly;
        }

        @Override
        public void move() {
            if (canFly) {
                System.out.println(species + " flies through the air");
            } else {
                System.out.println(species + " walks on the ground");
            }
        }

        public void layEggs() {
            System.out.println(species + " lays eggs");
        }
    }

    static class Dog extends Mammal {
        private String breed;

        public Dog(String breed) {
            super("Dog", "Domestic", true);
            this.breed = breed;
        }

        @Override
        public void makeSound() {
            System.out.println(breed + " dog barks: Woof!");
        }

        @Override
        public void move() {
            System.out.println(breed + " dog runs on four legs");
        }

        public void fetch() {
            System.out.println(breed + " dog fetches the ball");
        }
    }

    public static void main(String[] args) {
        Dog dog = new Dog("Golden Retriever");
        Bird eagle = new Bird("Eagle", "Mountains", true);
        Bird penguin = new Bird("Penguin", "Antarctica", false);

        System.out.println("Dog:");
        dog.makeSound();
        dog.move();
        dog.fetch();
        dog.breathe();

        System.out.println("\\nEagle:");
        eagle.makeSound();
        eagle.move();
        eagle.layEggs();

        System.out.println("\\nPenguin:");
        penguin.makeSound();
        penguin.move();
        penguin.layEggs();
    }
}
\`\`\`

### **2. Code Reuse in UI Components**
\`\`\`java
public class UIComponentInheritance {
    // âœ… Good: Base UI component with common functionality
    static class UIComponent {
        protected int x, y;
        protected int width, height;
        protected boolean visible = true;
        protected String backgroundColor = "white";

        public UIComponent(int x, int y, int width, int height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public void setPosition(int x, int y) {
            this.x = x;
            this.y = y;
        }

        public void setSize(int width, int height) {
            this.width = width;
            this.height = height;
        }

        public void show() { visible = true; }
        public void hide() { visible = false; }

        public void render() {
            if (visible) {
                System.out.println("Rendering component at (" + x + "," + y +
                                 ") size " + width + "x" + height);
            }
        }
    }

    static class Button extends UIComponent {
        private String text;
        private String textColor = "black";

        public Button(int x, int y, int width, int height, String text) {
            super(x, y, width, height);
            this.text = text;
        }

        @Override
        public void render() {
            super.render();
            if (visible) {
                System.out.println("  Button text: '" + text + "' in " + textColor);
            }
        }

        public void click() {
            System.out.println("Button '" + text + "' was clicked!");
        }

        public void setText(String text) { this.text = text; }
        public void setTextColor(String color) { this.textColor = color; }
    }

    static class TextField extends UIComponent {
        private String text = "";
        private int maxLength = 100;

        public TextField(int x, int y, int width, int height) {
            super(x, y, width, height);
            backgroundColor = "lightgray";
        }

        public void setText(String text) {
            if (text.length() <= maxLength) {
                this.text = text;
            }
        }

        public String getText() { return text; }

        @Override
        public void render() {
            super.render();
            if (visible) {
                System.out.println("  Text field content: '" + text + "'");
            }
        }

        public void clear() {
            text = "";
        }
    }

    public static void main(String[] args) {
        Button loginButton = new Button(100, 200, 80, 30, "Login");
        TextField usernameField = new TextField(100, 150, 200, 25);

        loginButton.setTextColor("white");
        usernameField.setText("john_doe");

        System.out.println("UI Components:");
        loginButton.render();
        usernameField.render();

        loginButton.click();
    }
}
\`\`\`

### **3. Exception Class Hierarchies**
\`\`\`java
public class ExceptionInheritance {
    // âœ… Perfect for inheritance: Exception hierarchies
    static class ApplicationException extends Exception {
        public ApplicationException(String message) {
            super(message);
        }

        public ApplicationException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    static class ValidationException extends ApplicationException {
        private String fieldName;

        public ValidationException(String fieldName, String message) {
            super("Validation failed for field '" + fieldName + "': " + message);
            this.fieldName = fieldName;
        }

        public String getFieldName() {
            return fieldName;
        }
    }

    static class DatabaseException extends ApplicationException {
        private String sqlQuery;

        public DatabaseException(String sqlQuery, String message) {
            super("Database error executing query: " + message);
            this.sqlQuery = sqlQuery;
        }

        public DatabaseException(String sqlQuery, String message, Throwable cause) {
            super("Database error executing query: " + message, cause);
            this.sqlQuery = sqlQuery;
        }

        public String getSqlQuery() {
            return sqlQuery;
        }
    }

    // Usage in application
    static class UserService {
        public void createUser(String username, String email) throws ValidationException, DatabaseException {
            // Validate input
            if (username == null || username.trim().isEmpty()) {
                throw new ValidationException("username", "Username cannot be empty");
            }

            if (email == null || !email.contains("@")) {
                throw new ValidationException("email", "Invalid email format");
            }

            // Simulate database operation
            try {
                saveToDatabase(username, email);
            } catch (Exception e) {
                throw new DatabaseException("INSERT INTO users...", "Connection failed", e);
            }
        }

        private void saveToDatabase(String username, String email) {
            // Simulate database operation
            System.out.println("Saving user: " + username + " with email: " + email);
        }
    }

    public static void main(String[] args) {
        UserService userService = new UserService();

        try {
            userService.createUser("", "invalid-email");
        } catch (ValidationException e) {
            System.out.println("Validation error: " + e.getMessage());
            System.out.println("Field: " + e.getFieldName());
        } catch (DatabaseException e) {
            System.out.println("Database error: " + e.getMessage());
            System.out.println("Query: " + e.getSqlQuery());
        }
    }
}
\`\`\`

---

## ðŸš« When NOT to Use Inheritance

### **1. For Code Reuse Without IS-A Relationship**
\`\`\`java
public class BadInheritanceExamples {
    // âŒ Bad: Using inheritance just to reuse ArrayList functionality
    static class BadEmployeeList extends java.util.ArrayList<String> {
        // Don't do this - EmployeeList IS-NOT-A ArrayList
        // It just happens to use list functionality
    }

    // âœ… Better: Use composition
    static class GoodEmployeeList {
        private java.util.List<String> employees = new java.util.ArrayList<>();

        public void addEmployee(String employee) {
            employees.add(employee);
        }

        public void removeEmployee(String employee) {
            employees.remove(employee);
        }

        public java.util.List<String> getAllEmployees() {
            return new java.util.ArrayList<>(employees); // Defensive copy
        }

        public int getEmployeeCount() {
            return employees.size();
        }
    }

    // âŒ Bad: Deep inheritance hierarchies
    static class A { void method() { System.out.println("A"); } }
    static class B extends A { void methodB() { System.out.println("B"); } }
    static class C extends B { void methodC() { System.out.println("C"); } }
    static class D extends C { void methodD() { System.out.println("D"); } }
    static class E extends D { void methodE() { System.out.println("E"); } }

    // âœ… Better: Flatter hierarchy or composition
    static class BetterDesign {
        private A a = new A();
        private B b = new B();
        private C c = new C();

        public void useAll() {
            a.method();
            b.methodB();
            c.methodC();
        }
    }

    public static void main(String[] args) {
        GoodEmployeeList employeeList = new GoodEmployeeList();
        employeeList.addEmployee("Alice");
        employeeList.addEmployee("Bob");
        System.out.println("Employees: " + employeeList.getAllEmployees());
    }
}
\`\`\`

### **2. When You Need Multiple Inheritance**
\`\`\`java
public class MultipleInheritanceProblem {
    // âŒ Java doesn't support multiple inheritance
    // class FlyingCar extends Car, Airplane { } // Not allowed!

    // âœ… Use interfaces instead
    interface Drivable {
        void drive();
    }

    interface Flyable {
        void fly();
    }

    static class Car implements Drivable {
        @Override
        public void drive() {
            System.out.println("Car driving on road");
        }
    }

    static class Airplane implements Flyable {
        @Override
        public void fly() {
            System.out.println("Airplane flying in sky");
        }
    }

    // Composition solution
    static class FlyingCar implements Drivable, Flyable {
        private Car car = new Car();
        private Airplane airplane = new Airplane();

        @Override
        public void drive() {
            car.drive();
        }

        @Override
        public void fly() {
            airplane.fly();
        }

        public void transform() {
            System.out.println("Transforming from car to airplane mode");
        }
    }

    public static void main(String[] args) {
        FlyingCar flyingCar = new FlyingCar();
        flyingCar.drive();
        flyingCar.transform();
        flyingCar.fly();
    }
}
\`\`\`

---

## ðŸŽ¯ Inheritance Best Practices

### **1. Favor Composition over Inheritance**
\`\`\`java
public class CompositionOverInheritance {
    // âœ… Prefer composition when possible
    static class Engine {
        public void start() { System.out.println("Engine starting"); }
        public void stop() { System.out.println("Engine stopping"); }
    }

    static class Car {
        private Engine engine;  // Composition
        private String model;

        public Car(String model) {
            this.model = model;
            this.engine = new Engine();
        }

        public void start() {
            System.out.println(model + " car starting");
            engine.start();
        }

        public void drive() {
            System.out.println(model + " car driving");
        }

        public void stop() {
            System.out.println(model + " car stopping");
            engine.stop();
        }

        // Easy to change engine type
        public void upgradeEngine(Engine newEngine) {
            this.engine = newEngine;
            System.out.println(model + " engine upgraded");
        }
    }

    // âœ… Use inheritance only when there's a true IS-A relationship
    static class ElectricEngine extends Engine {
        @Override
        public void start() {
            System.out.println("Electric engine starting silently");
        }

        @Override
        public void stop() {
            System.out.println("Electric engine stopping");
        }
    }

    public static void main(String[] args) {
        Car car = new Car("Tesla");
        car.start();
        car.drive();

        // Upgrade to electric engine
        car.upgradeEngine(new ElectricEngine());
        car.start();
        car.stop();
    }
}
\`\`\`

### **2. Keep Inheritance Hierarchies Shallow**
\`\`\`java
public class ShallowInheritance {
    // âŒ Bad: Deep inheritance (4+ levels)
    static class GrandParent { void methodA() {} }
    static class Parent extends GrandParent { void methodB() {} }
    static class Child extends Parent { void methodC() {} }
    static class GrandChild extends Child { void methodD() {} }

    // âœ… Better: Shallow inheritance with composition
    static class BetterDesign {
        private GrandParent grandParent = new GrandParent();
        private Parent parent = new Parent();
        private Child child = new Child();

        public void useAllMethods() {
            grandParent.methodA();
            parent.methodB();
            child.methodC();
            // Direct implementation instead of inheritance
            methodD();
        }

        private void methodD() {
            System.out.println("Direct implementation");
        }
    }

    public static void main(String[] args) {
        BetterDesign design = new BetterDesign();
        design.useAllMethods();
    }
}
\`\`\`

### **3. Use Protected Access Wisely**
\`\`\`java
public class ProtectedAccessDesign {
    static class BaseProcessor {
        protected java.util.List<String> data;

        public BaseProcessor() {
            this.data = new java.util.ArrayList<>();
        }

        protected void validateData() {
            if (data == null) {
                throw new IllegalStateException("Data is null");
            }
        }

        protected void processData() {
            validateData();
            // Processing logic
        }

        // Public API
        public final void execute() {
            loadData();
            processData();
            saveResults();
        }

        protected void loadData() {
            System.out.println("Loading data");
        }

        protected void saveResults() {
            System.out.println("Saving results");
        }
    }

    static class CustomProcessor extends BaseProcessor {
        @Override
        protected void processData() {
            super.processData(); // Call parent validation
            System.out.println("Custom processing of " + data.size() + " items");
        }

        @Override
        protected void loadData() {
            super.loadData();
            // Add custom data
            data.add("Custom Item 1");
            data.add("Custom Item 2");
        }
    }

    public static void main(String[] args) {
        CustomProcessor processor = new CustomProcessor();
        processor.execute();
    }
}
\`\`\`

---

## ðŸŽ¯ Inheritance vs Other Design Patterns

### **Inheritance vs Strategy Pattern**
\`\`\`java
public class InheritanceVsStrategy {
    // âŒ Inheritance approach - rigid
    static class Character {
        public void attack() {
            System.out.println("Basic attack");
        }
    }

    static class Warrior extends Character {
        @Override
        public void attack() {
            System.out.println("Warrior swings sword");
        }
    }

    static class Mage extends Character {
        @Override
        public void attack() {
            System.out.println("Mage casts spell");
        }
    }

    // âœ… Strategy pattern - flexible
    interface AttackStrategy {
        void attack();
    }

    static class SwordAttack implements AttackStrategy {
        @Override
        public void attack() {
            System.out.println("Swings sword");
        }
    }

    static class SpellAttack implements AttackStrategy {
        @Override
        public void attack() {
            System.out.println("Casts spell");
        }
    }

    static class FlexibleCharacter {
        private AttackStrategy attackStrategy;

        public FlexibleCharacter(AttackStrategy attackStrategy) {
            this.attackStrategy = attackStrategy;
        }

        public void attack() {
            attackStrategy.attack();
        }

        public void changeWeapon(AttackStrategy newStrategy) {
            this.attackStrategy = newStrategy;
            System.out.println("Weapon changed!");
        }
    }

    public static void main(String[] args) {
        // Inheritance approach - fixed behavior
        Warrior warrior = new Warrior();
        warrior.attack();

        // Strategy approach - changeable behavior
        FlexibleCharacter character = new FlexibleCharacter(new SwordAttack());
        character.attack();

        character.changeWeapon(new SpellAttack());
        character.attack();
    }
}
\`\`\`

### **Inheritance vs Decorator Pattern**
\`\`\`java
public class InheritanceVsDecorator {
    // âŒ Inheritance approach - explosion of classes
    static class Coffee { }
    static class MilkCoffee extends Coffee { }
    static class SugarCoffee extends Coffee { }
    static class MilkSugarCoffee extends Coffee { } // Gets complex quickly!

    // âœ… Decorator pattern - flexible composition
    interface Beverage {
        String getDescription();
        double getCost();
    }

    static class SimpleCoffee implements Beverage {
        @Override
        public String getDescription() {
            return "Simple coffee";
        }

        @Override
        public double getCost() {
            return 2.0;
        }
    }

    abstract static class BeverageDecorator implements Beverage {
        protected Beverage beverage;

        public BeverageDecorator(Beverage beverage) {
            this.beverage = beverage;
        }

        @Override
        public String getDescription() {
            return beverage.getDescription();
        }

        @Override
        public double getCost() {
            return beverage.getCost();
        }
    }

    static class MilkDecorator extends BeverageDecorator {
        public MilkDecorator(Beverage beverage) {
            super(beverage);
        }

        @Override
        public String getDescription() {
            return super.getDescription() + " with milk";
        }

        @Override
        public double getCost() {
            return super.getCost() + 0.5;
        }
    }

    static class SugarDecorator extends BeverageDecorator {
        public SugarDecorator(Beverage beverage) {
            super(beverage);
        }

        @Override
        public String getDescription() {
            return super.getDescription() + " with sugar";
        }

        @Override
        public double getCost() {
            return super.getCost() + 0.2;
        }
    }

    public static void main(String[] args) {
        // Create coffee with milk and sugar
        Beverage fancyCoffee = new SugarDecorator(
            new MilkDecorator(
                new SimpleCoffee()
            )
        );

        System.out.println(fancyCoffee.getDescription());
        System.out.println("Cost: $" + fancyCoffee.getCost());
    }
}
\`\`\`

---

## ðŸŽ¯ Decision Framework for Inheritance

### **Inheritance Checklist**
\`\`\`java
public class InheritanceDecisionFramework {
    /*
    âœ… USE INHERITANCE WHEN:

    1. IS-A Relationship
       - The subclass IS-A type of the superclass
       - Example: Car IS-A Vehicle, Dog IS-A Animal

    2. Shared Behavior and State
       - Subclasses share significant common functionality
       - Superclass provides meaningful default implementations

    3. Polymorphic Behavior Needed
       - You need runtime polymorphism through method overriding
       - Code needs to work with different implementations uniformly

    4. Framework/Template Design
       - Creating a framework where subclasses customize specific steps
       - Template Method pattern is appropriate

    5. Exception Hierarchies
       - Creating related exception types
       - Building exception classification systems

    âŒ DON'T USE INHERITANCE WHEN:

    1. HAS-A Relationship
       - Use composition instead
       - Example: Car HAS-A Engine (not Car IS-A Engine)

    2. Just for Code Reuse
       - Use composition or utility classes
       - Inheritance should represent conceptual relationships

    3. Multiple Inheritance Needed
       - Java doesn't support it - use interfaces and composition

    4. Deep Hierarchies
       - Keep inheritance hierarchies shallow (2-3 levels max)
       - Deep hierarchies become hard to understand and maintain

    5. Implementation Details
       - Don't inherit from concrete classes just to reuse implementation
       - Favor composition and delegation

    ðŸ¤” ASK YOURSELF:

    - Is this truly an IS-A relationship?
    - Will subclasses need to override most methods?
    - Could composition work better here?
    - Will this hierarchy be stable or change frequently?
    - Am I creating unnecessary coupling?

    ðŸ’¡ REMEMBER:

    - Favor composition over inheritance
    - Program to interfaces, not implementations
    - Keep inheritance hierarchies shallow
    - Use inheritance for polymorphism and code sharing
    - Consider the Liskov Substitution Principle
    */
}
\`\`\`

Inheritance is a powerful tool when used appropriately for true IS-A relationships and shared behavior. However, composition often provides better flexibility and maintainability. Always consider whether inheritance is the right choice for your specific design needs! ðŸŽ¯`
};




