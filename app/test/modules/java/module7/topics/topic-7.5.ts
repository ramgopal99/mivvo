import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_5: SubLesson = {
  id: "7.5",
  title: 'Abstract Classes and Methods',
  status: 'completed',
  content: `# 📐 Abstract Classes and Methods in Java

Abstract classes and methods provide a way to define incomplete implementations that must be completed by subclasses. They serve as templates for other classes, ensuring that certain methods are implemented while allowing flexibility in the implementation details. Abstract classes are a key feature of inheritance and polymorphism in Java.

---

## 📋 Understanding Abstract Classes

### **What is an Abstract Class?**
\`\`\`java
// Abstract class cannot be instantiated directly
public abstract class Animal {
    // Abstract fields (concrete classes will have these)
    protected String name;
    protected int age;

    // Concrete constructor
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Abstract method - must be implemented by subclasses
    public abstract void makeSound();

    // Another abstract method
    public abstract void move();

    // Concrete method - inherited as-is
    public void eat() {
        System.out.println(name + " is eating food");
    }

    // Concrete method that can be overridden
    public void sleep() {
        System.out.println(name + " is sleeping");
    }

    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
}

// ❌ Cannot instantiate abstract class
// Animal animal = new Animal("Generic", 5); // Compilation error

// ✅ Must extend and implement abstract methods
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }

    // Must implement abstract methods
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof!");
    }

    @Override
    public void move() {
        System.out.println(name + " runs on four legs");
    }

    // Can add new methods
    public void fetch() {
        System.out.println(name + " fetches the ball");
    }

    public String getBreed() { return breed; }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        Dog dog = new Dog("Buddy", 3, "Golden Retriever");

        // Use inherited concrete methods
        dog.eat();
        dog.sleep();

        // Use implemented abstract methods
        dog.makeSound();
        dog.move();

        // Use subclass-specific methods
        dog.fetch();
    }
}
\`\`\`

### **Abstract Class Characteristics**
\`\`\`java
public abstract class AbstractCharacteristics {
    // ✅ Can have instance variables
    protected int value;
    private String name;

    // ✅ Can have constructors
    public AbstractCharacteristics(String name) {
        this.name = name;
    }

    // ✅ Can have concrete methods
    public String getName() {
        return name;
    }

    public void setValue(int value) {
        this.value = value;
    }

    // ✅ Can have abstract methods
    public abstract void performAction();

    // ✅ Can have static methods
    public static void staticMethod() {
        System.out.println("Static method in abstract class");
    }

    // ✅ Can have final methods
    public final void finalMethod() {
        System.out.println("Final method cannot be overridden");
    }
}

// Implementation
class ConcreteClass extends AbstractCharacteristics {
    public ConcreteClass(String name) {
        super(name);
    }

    @Override
    public void performAction() {
        System.out.println("Performing action in concrete class");
    }
}

class AbstractCharacteristicsDemo {
    public static void main(String[] args) {
        ConcreteClass obj = new ConcreteClass("Test");

        obj.setValue(42);
        System.out.println("Name: " + obj.getName());
        obj.performAction();
        obj.finalMethod();

        // Call static method
        AbstractCharacteristics.staticMethod();
    }
}
\`\`\`

---

## 🔧 Abstract Methods

### **Abstract Method Rules**
\`\`\`java
public abstract class AbstractMethods {
    // ✅ Valid abstract methods
    public abstract void method1();
    protected abstract void method2();
    abstract void method3();  // package-private by default

    // ❌ Invalid abstract methods
    // private abstract void method4();     // Abstract methods cannot be private
    // final abstract void method5();       // Abstract methods cannot be final
    // static abstract void method6();      // Abstract methods cannot be static

    // Abstract method with parameters
    public abstract void processData(String data, int count);

    // Abstract method with return type
    public abstract double calculateArea();
}

// Implementation must provide concrete versions
class Implementation extends AbstractMethods {
    @Override
    public void method1() {
        System.out.println("Implementation of method1");
    }

    @Override
    protected void method2() {
        System.out.println("Implementation of method2");
    }

    @Override
    void method3() {
        System.out.println("Implementation of method3");
    }

    @Override
    public void processData(String data, int count) {
        System.out.println("Processing '" + data + "' " + count + " times");
    }

    @Override
    public double calculateArea() {
        return 100.0;  // Dummy implementation
    }
}

class AbstractMethodsDemo {
    public static void main(String[] args) {
        Implementation impl = new Implementation();
        impl.method1();
        impl.method2();
        impl.method3();
        impl.processData("Hello", 3);
        System.out.println("Area: " + impl.calculateArea());
    }
}
\`\`\`

### **Partial Implementation with Abstract Classes**
\`\`\`java
public abstract class DatabaseConnection {
    protected String url;
    protected String username;
    protected String password;

    public DatabaseConnection(String url, String username, String password) {
        this.url = url;
        this.username = username;
        this.password = password;
    }

    // Common functionality provided
    public void connect() {
        System.out.println("Connecting to database...");
        validateCredentials();
        establishConnection();
        System.out.println("Connected successfully");
    }

    public void disconnect() {
        System.out.println("Disconnecting from database...");
        closeConnection();
        System.out.println("Disconnected");
    }

    // Abstract methods that subclasses must implement
    protected abstract void validateCredentials();
    protected abstract void establishConnection();
    protected abstract void closeConnection();

    // Template method
    public final void executeQuery(String query) {
        connect();
        performQuery(query);
        disconnect();
    }

    protected abstract void performQuery(String query);
}

// MySQL implementation
class MySQLConnection extends DatabaseConnection {
    public MySQLConnection(String url, String username, String password) {
        super(url, username, password);
    }

    @Override
    protected void validateCredentials() {
        System.out.println("Validating MySQL credentials");
    }

    @Override
    protected void establishConnection() {
        System.out.println("Establishing MySQL connection to " + url);
    }

    @Override
    protected void closeConnection() {
        System.out.println("Closing MySQL connection");
    }

    @Override
    protected void performQuery(String query) {
        System.out.println("Executing MySQL query: " + query);
    }
}

// PostgreSQL implementation
class PostgreSQLConnection extends DatabaseConnection {
    public PostgreSQLConnection(String url, String username, String password) {
        super(url, username, password);
    }

    @Override
    protected void validateCredentials() {
        System.out.println("Validating PostgreSQL credentials");
    }

    @Override
    protected void establishConnection() {
        System.out.println("Establishing PostgreSQL connection to " + url);
    }

    @Override
    protected void closeConnection() {
        System.out.println("Closing PostgreSQL connection");
    }

    @Override
    protected void performQuery(String query) {
        System.out.println("Executing PostgreSQL query: " + query);
    }
}

public class PartialImplementationDemo {
    public static void main(String[] args) {
        DatabaseConnection mysql = new MySQLConnection("mysql://localhost/db", "user", "pass");
        DatabaseConnection postgres = new PostgreSQLConnection("postgres://localhost/db", "user", "pass");

        System.out.println("MySQL operations:");
        mysql.executeQuery("SELECT * FROM users");

        System.out.println("\\nPostgreSQL operations:");
        postgres.executeQuery("SELECT * FROM products");
    }
}
\`\`\`

---

## 🎯 Abstract Classes vs Interfaces

### **When to Use Abstract Classes**
\`\`\`java
// ✅ Use abstract classes when:

// 1. You want to share code among related classes
public abstract class Vehicle {
    protected String brand;
    protected int year;

    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
    }

    // Common implementation
    public void start() {
        System.out.println("Starting " + year + " " + brand + " vehicle");
    }

    // Abstract methods that subclasses must implement differently
    public abstract void drive();
    public abstract double getFuelEfficiency();
}

// 2. You need to define a template method pattern
public abstract class DataProcessor {
    // Template method
    public final void process() {
        loadData();
        validateData();
        processData();
        saveResults();
    }

    // Steps that can be customized
    protected abstract void loadData();
    protected abstract void validateData();
    protected abstract void processData();
    protected abstract void saveResults();
}

// 3. You have state that needs to be shared
public abstract class Employee {
    protected String name;
    protected double baseSalary;

    public Employee(String name, double baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }

    public abstract double calculateBonus();
    public abstract String getJobTitle();

    // Common method using shared state
    public double getTotalCompensation() {
        return baseSalary + calculateBonus();
    }
}
\`\`\`

### **Abstract Classes vs Concrete Inheritance**
\`\`\`java
public class AbstractVsConcrete {
    // Concrete base class
    static class Person {
        protected String name;
        protected int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public void introduce() {
            System.out.println("Hi, I'm " + name + ", " + age + " years old");
        }
    }

    // Abstract extension point
    static abstract class Worker extends Person {
        protected double salary;

        public Worker(String name, int age, double salary) {
            super(name, age);
            this.salary = salary;
        }

        // Abstract method for different work types
        public abstract void performWork();

        // Concrete method using abstract method
        public void workDay() {
            System.out.println(name + " starts working");
            performWork();
            System.out.println(name + " finishes working");
        }
    }

    // Concrete implementations
    static class Developer extends Worker {
        public Developer(String name, int age, double salary) {
            super(name, age, salary);
        }

        @Override
        public void performWork() {
            System.out.println(name + " writes code");
        }
    }

    static class Manager extends Worker {
        public Manager(String name, int age, double salary) {
            super(name, age, salary);
        }

        @Override
        public void performWork() {
            System.out.println(name + " manages team and meetings");
        }
    }

    public static void main(String[] args) {
        Developer dev = new Developer("Alice", 28, 80000);
        Manager mgr = new Manager("Bob", 35, 95000);

        dev.introduce();
        dev.workDay();

        System.out.println();

        mgr.introduce();
        mgr.workDay();
    }
}
\`\`\`

---

## 🎯 Abstract Class Design Patterns

### **Template Method Pattern**
\`\`\`java
public class TemplateMethodPattern {
    // Abstract base class defining the algorithm template
    public abstract static class Game {
        // Template method - defines the algorithm structure
        public final void play() {
            initializeGame();
            startGame();
            playGame();
            endGame();
            displayResults();
        }

        // Abstract steps that subclasses must implement
        protected abstract void initializeGame();
        protected abstract void startGame();
        protected abstract void playGame();
        protected abstract void endGame();

        // Hook method - optional customization
        protected void displayResults() {
            System.out.println("Game completed!");
        }
    }

    // Concrete game implementations
    public static class Chess extends Game {
        @Override
        protected void initializeGame() {
            System.out.println("Setting up chess board");
        }

        @Override
        protected void startGame() {
            System.out.println("White moves first");
        }

        @Override
        protected void playGame() {
            System.out.println("Players make moves...");
        }

        @Override
        protected void endGame() {
            System.out.println("Checkmate!");
        }

        @Override
        protected void displayResults() {
            System.out.println("Chess game finished - White wins!");
        }
    }

    public static class TicTacToe extends Game {
        @Override
        protected void initializeGame() {
            System.out.println("Drawing 3x3 grid");
        }

        @Override
        protected void startGame() {
            System.out.println("X goes first");
        }

        @Override
        protected void playGame() {
            System.out.println("Players place X's and O's...");
        }

        @Override
        protected void endGame() {
            System.out.println("Three in a row!");
        }
    }

    public static void main(String[] args) {
        Game chess = new Chess();
        Game ticTacToe = new TicTacToe();

        System.out.println("Playing Chess:");
        chess.play();

        System.out.println("\\nPlaying Tic-Tac-Toe:");
        ticTacToe.play();
    }
}
\`\`\`

### **Factory Method Pattern with Abstract Classes**
\`\`\`java
public class AbstractFactory {
    // Abstract product
    public abstract static class Document {
        public abstract void open();
        public abstract void save();
        public abstract void close();
    }

    // Concrete products
    public static class PDFDocument extends Document {
        @Override
        public void open() {
            System.out.println("Opening PDF document");
        }

        @Override
        public void save() {
            System.out.println("Saving PDF document");
        }

        @Override
        public void close() {
            System.out.println("Closing PDF document");
        }
    }

    public static class WordDocument extends Document {
        @Override
        public void open() {
            System.out.println("Opening Word document");
        }

        @Override
        public void save() {
            System.out.println("Saving Word document");
        }

        @Override
        public void close() {
            System.out.println("Closing Word document");
        }
    }

    // Abstract creator
    public abstract static class DocumentCreator {
        // Factory method
        public abstract Document createDocument();

        // Template method using factory method
        public void processDocument() {
            Document doc = createDocument();
            doc.open();
            doc.save();
            doc.close();
        }
    }

    // Concrete creators
    public static class PDFCreator extends DocumentCreator {
        @Override
        public Document createDocument() {
            return new PDFDocument();
        }
    }

    public static class WordCreator extends DocumentCreator {
        @Override
        public Document createDocument() {
            return new WordDocument();
        }
    }

    public static void main(String[] args) {
        DocumentCreator pdfCreator = new PDFCreator();
        DocumentCreator wordCreator = new WordCreator();

        System.out.println("Processing PDF:");
        pdfCreator.processDocument();

        System.out.println("\\nProcessing Word document:");
        wordCreator.processDocument();
    }
}
\`\`\`

---

## ⚠️ Abstract Class Best Practices

### **1. Use Abstract Classes for "IS-A" Relationships**
\`\`\`java
public class IsARelationship {
    // ✅ Good: Employee IS-A Person (inheritance appropriate)
    public abstract class Person {
        protected String name;
        protected int age;

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public abstract void performDailyActivity();
    }

    public class Employee extends Person {
        private String jobTitle;

        public Employee(String name, int age, String jobTitle) {
            super(name, age);
            this.jobTitle = jobTitle;
        }

        @Override
        public void performDailyActivity() {
            System.out.println(name + " works as " + jobTitle);
        }
    }

    public class Student extends Person {
        private String major;

        public Student(String name, int age, String major) {
            super(name, age);
            this.major = major;
        }

        @Override
        public void performDailyActivity() {
            System.out.println(name + " studies " + major);
        }
    }

    // ❌ Bad: Car IS-NOT-A Engine (composition would be better)
    // public abstract class Engine {
    //     public abstract void start();
    // }
    //
    // public class Car extends Engine {  // Poor design
    //     @Override
    //     public void start() {
    //         System.out.println("Starting car");
    //     }
    // }

    // ✅ Better: Use composition
    public class Engine {
        public void start() {
            System.out.println("Engine starting");
        }
    }

    public class Car {
        private Engine engine;

        public Car() {
            this.engine = new Engine();
        }

        public void start() {
            System.out.println("Starting car");
            engine.start();
        }
    }
}
\`\`\`

### **2. Provide Good Documentation**
\`\`\`java
public abstract class WellDocumentedAbstractClass {
    /**
     * Represents a processor that can handle data transformation.
     * Subclasses must implement the core processing logic while
     * this class provides common validation and error handling.
     */
    protected String processorName;
    protected boolean isInitialized = false;

    /**
     * Creates a new processor with the given name.
     *
     * @param processorName the name of this processor instance
     * @throws IllegalArgumentException if processorName is null or empty
     */
    public WellDocumentedAbstractClass(String processorName) {
        if (processorName == null || processorName.trim().isEmpty()) {
            throw new IllegalArgumentException("Processor name cannot be null or empty");
        }
        this.processorName = processorName;
    }

    /**
     * Processes the given input data and returns the result.
     * This is the main entry point for data processing.
     *
     * @param input the input data to process
     * @return the processed result
     * @throws ProcessingException if processing fails
     */
    public final String process(String input) {
        validateInput(input);
        String result = performProcessing(input);
        validateResult(result);
        return result;
    }

    /**
     * Performs the actual data processing.
     * Subclasses must implement this method to provide specific processing logic.
     *
     * @param input the input data to process
     * @return the processed result
     */
    protected abstract String performProcessing(String input);

    /**
     * Validates the input data before processing.
     * Default implementation checks for null input.
     *
     * @param input the input to validate
     * @throws IllegalArgumentException if input is invalid
     */
    protected void validateInput(String input) {
        if (input == null) {
            throw new IllegalArgumentException("Input cannot be null");
        }
    }

    /**
     * Validates the processing result.
     * Default implementation checks for null result.
     *
     * @param result the result to validate
     * @throws ProcessingException if result is invalid
     */
    protected void validateResult(String result) {
        if (result == null) {
            throw new ProcessingException("Processing resulted in null output");
        }
    }

    // Custom exception
    public static class ProcessingException extends RuntimeException {
        public ProcessingException(String message) {
            super(message);
        }
    }
}

// Example implementation
class UpperCaseProcessor extends WellDocumentedAbstractClass {
    public UpperCaseProcessor() {
        super("UpperCase Processor");
    }

    @Override
    protected String performProcessing(String input) {
        return input.toUpperCase();
    }
}

class AbstractDocumentationDemo {
    public static void main(String[] args) {
        WellDocumentedAbstractClass processor = new UpperCaseProcessor();
        String result = processor.process("hello world");
        System.out.println("Processed: " + result);
    }
}
\`\`\`

### **3. Avoid Deep Inheritance Hierarchies**
\`\`\`java
public class AvoidingDeepHierarchies {
    // ❌ Bad: Deep inheritance hierarchy
    abstract class A { abstract void method(); }
    abstract class B extends A { }
    abstract class C extends B { }
    abstract class D extends C { }
    class E extends D {
        @Override
        void method() { System.out.println("E"); }
    }

    // ✅ Better: Flatter hierarchy with composition
    interface Processor {
        void process();
    }

    abstract class BaseProcessor implements Processor {
        protected String name;

        public BaseProcessor(String name) {
            this.name = name;
        }

        public void process() {
            System.out.println("Processing with " + name);
            performProcessing();
        }

        protected abstract void performProcessing();
    }

    class TextProcessor extends BaseProcessor {
        public TextProcessor() {
            super("Text Processor");
        }

        @Override
        protected void performProcessing() {
            System.out.println("Processing text");
        }
    }

    class ImageProcessor extends BaseProcessor {
        public ImageProcessor() {
            super("Image Processor");
        }

        @Override
        protected void performProcessing() {
            System.out.println("Processing image");
        }
    }

    public static void main(String[] args) {
        Processor textProc = new TextProcessor();
        Processor imageProc = new ImageProcessor();

        textProc.process();
        imageProc.process();
    }
}
\`\`\`

Abstract classes and methods provide a powerful way to define incomplete implementations that serve as templates for subclasses. They enable code reuse while ensuring that critical methods are implemented by concrete classes. Use them when you need to define a common structure with some implementation flexibility! 📐`
};



