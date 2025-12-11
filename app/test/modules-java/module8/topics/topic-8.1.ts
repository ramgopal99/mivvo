import { SubLesson } from '../../../data/lessonsData';

export const topic_8_1: SubLesson = {
  id: 8.1,
  title: 'Introduction to Classes and Objects',
  status: 'completed',
  content: `# 🏗️ Introduction to Classes and Objects in Java

Classes and objects are fundamental concepts in object-oriented programming (OOP). They form the building blocks of Java applications, enabling encapsulation, abstraction, and modular design. Understanding these concepts is essential for writing clean, maintainable, and efficient Java programs.

---

## 🎯 Understanding Object-Oriented Programming

### **What is OOP?**

Object-Oriented Programming is a programming paradigm that uses objects and classes to structure software. Instead of focusing on functions and procedures, OOP emphasizes data and the operations that can be performed on that data.

### **Four Pillars of OOP**

\`\`\`java
public class OOPPillars {
    /*
     * 1. ENCAPSULATION: Bundling data and methods together
     * 2. ABSTRACTION: Hiding implementation details
     * 3. INHERITANCE: Creating hierarchical relationships
     * 4. POLYMORPHISM: Same interface, different implementations
     */
}
\`\`\`

#### **1. Encapsulation**
Combining data and methods that operate on that data into a single unit (class).

#### **2. Abstraction**
Hiding complex implementation details and showing only essential features.

#### **3. Inheritance**
Creating new classes based on existing classes, inheriting their properties.

#### **4. Polymorphism**
Ability of objects to take many forms - same method name, different behavior.

---

## 📦 What is a Class?

A **class** is a blueprint or template that defines the structure and behavior of objects. It encapsulates data (fields/attributes) and methods that operate on that data.

### **Class Definition Syntax**

\`\`\`java
// Class declaration
[access_modifier] class ClassName {
    // Fields (data members)
    // Constructors
    // Methods
    // Inner classes
}
\`\`\`

### **Complete Class Example**

\`\`\`java
/**
 * Represents a Car in a vehicle management system.
 * Demonstrates class structure with fields, constructors, and methods.
 */
public class Car {
    // Fields (instance variables)
    private String model;
    private String color;
    private int year;
    private double price;
    private boolean isRunning;

    // Static field (shared by all instances)
    public static int totalCars = 0;

    // Default constructor
    public Car() {
        this.model = "Unknown";
        this.color = "White";
        this.year = 2024;
        this.price = 0.0;
        this.isRunning = false;
        totalCars++;
    }

    // Parameterized constructor
    public Car(String model, String color, int year, double price) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.price = price;
        this.isRunning = false;
        totalCars++;
    }

    // Instance methods
    public void start() {
        if (!isRunning) {
            isRunning = true;
            System.out.println(model + " started successfully!");
        } else {
            System.out.println(model + " is already running.");
        }
    }

    public void stop() {
        if (isRunning) {
            isRunning = false;
            System.out.println(model + " stopped.");
        } else {
            System.out.println(model + " is already stopped.");
        }
    }

    public void drive() {
        if (isRunning) {
            System.out.println("Driving the " + color + " " + model + "...");
        } else {
            System.out.println("Cannot drive. Please start the car first.");
        }
    }

    // Getter methods
    public String getModel() { return model; }
    public String getColor() { return color; }
    public int getYear() { return year; }
    public double getPrice() { return price; }
    public boolean isRunning() { return isRunning; }

    // Setter methods
    public void setPrice(double price) { this.price = price; }

    // Static method
    public static int getTotalCars() {
        return totalCars;
    }

    // toString method (inherited from Object)
    @Override
    public String toString() {
        return year + " " + color + " " + model + " ($" + String.format("%.2f", price) + ")";
    }
}
\`\`\`

---

## 🎯 What is an Object?

An **object** is an instance of a class - a concrete realization of the blueprint. Each object has its own state (field values) but shares the same behavior (methods) defined by its class.

### **Object Creation**

\`\`\`java
public class ObjectCreation {
    public static void main(String[] args) {
        // Creating objects using different constructors

        // Using default constructor
        Car car1 = new Car();
        System.out.println("Car 1: " + car1);

        // Using parameterized constructor
        Car car2 = new Car("Toyota Camry", "Blue", 2022, 25000.00);
        System.out.println("Car 2: " + car2);

        // Creating another object
        Car car3 = new Car("Honda Civic", "Red", 2023, 22000.00);
        System.out.println("Car 3: " + car3);

        // Accessing object methods
        car2.start();
        car2.drive();
        car2.stop();

        // Accessing static method
        System.out.println("Total cars created: " + Car.getTotalCars());
    }
}
\`\`\`

### **Object Characteristics**

#### **1. State (Fields)**
Each object maintains its own state through instance variables.

\`\`\`java
public class ObjectState {
    public static void main(String[] args) {
        Car carA = new Car("BMW X5", "Black", 2024, 60000.00);
        Car carB = new Car("BMW X5", "White", 2024, 60000.00);

        // Each object has its own state
        System.out.println("Car A color: " + carA.getColor());
        System.out.println("Car B color: " + carB.getColor());

        // Modifying one object doesn't affect the other
        carA.setPrice(55000.00);
        System.out.println("Car A price: $" + carA.getPrice());
        System.out.println("Car B price: $" + carB.getPrice()); // Unchanged
    }
}
\`\`\`

#### **2. Behavior (Methods)**
Objects exhibit behavior through methods defined in their class.

\`\`\`java
public class ObjectBehavior {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla Model 3", "Silver", 2024, 45000.00);

        // Calling methods on the object
        myCar.start();      // Behavior: starting the car
        myCar.drive();      // Behavior: driving the car
        myCar.stop();       // Behavior: stopping the car

        // Each object can perform the same behaviors
        Car anotherCar = new Car("Ford Mustang", "Red", 2023, 35000.00);
        anotherCar.start();
        anotherCar.drive();
    }
}
\`\`\`

#### **3. Identity**
Each object has a unique identity, even if they have the same state.

\`\`\`java
public class ObjectIdentity {
    public static void main(String[] args) {
        Car car1 = new Car("Honda Civic", "Blue", 2022, 25000.00);
        Car car2 = new Car("Honda Civic", "Blue", 2022, 25000.00);
        Car car3 = car1; // Reference to the same object

        // Different objects with same state
        System.out.println("car1 == car2: " + (car1 == car2));     // false (different objects)
        System.out.println("car1 == car3: " + (car1 == car3));     // true (same object reference)

        // Same state, different identity
        System.out.println("Same model? " + car1.getModel().equals(car2.getModel()));
        System.out.println("Same color? " + car1.getColor().equals(car2.getColor()));
        System.out.println("Same year? " + (car1.getYear() == car2.getYear()));

        // But they are different objects
        car1.setPrice(24000.00);
        System.out.println("car1 price: $" + car1.getPrice());
        System.out.println("car2 price: $" + car2.getPrice()); // Unchanged
    }
}
\`\`\`

---

## 🏗️ Class Components

### **1. Fields (Instance Variables)**

Fields store the data for each object instance.

\`\`\`java
public class FieldTypes {
    // Instance fields (each object has its own copy)
    private String name;
    private int age;
    private double salary;

    // Static field (shared by all instances of the class)
    private static int totalEmployees = 0;

    // Final field (cannot be changed after initialization)
    private final String employeeId;

    // Constructor initializes final field
    public FieldTypes(String employeeId) {
        this.employeeId = employeeId;
        totalEmployees++;
    }

    // Methods to access fields
    public String getEmployeeId() { return employeeId; }
    public static int getTotalEmployees() { return totalEmployees; }
}
\`\`\`

### **2. Constructors**

Constructors are special methods used to initialize objects.

\`\`\`java
public class ConstructorExamples {
    private String name;
    private int age;

    // Default constructor
    public ConstructorExamples() {
        this.name = "Unknown";
        this.age = 0;
        System.out.println("Default constructor called");
    }

    // Parameterized constructor
    public ConstructorExamples(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Parameterized constructor called");
    }

    // Constructor overloading
    public ConstructorExamples(String name) {
        this(name, 18); // Calls the two-parameter constructor
        System.out.println("Single-parameter constructor called");
    }

    public static void main(String[] args) {
        ConstructorExamples obj1 = new ConstructorExamples();                    // Default
        ConstructorExamples obj2 = new ConstructorExamples("Alice", 25);        // Parameterized
        ConstructorExamples obj3 = new ConstructorExamples("Bob");              // Overloaded
    }
}
\`\`\`

### **3. Methods**

Methods define the behavior of objects.

\`\`\`java
public class MethodTypes {
    private int value;

    // Instance method (operates on instance data)
    public void setValue(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    // Static method (belongs to class, not instances)
    public static int add(int a, int b) {
        return a + b;
    }

    // Method with multiple parameters
    public void updateInfo(String name, int age, double salary) {
        // Process multiple parameters
        System.out.println("Updating info for: " + name);
        System.out.println("Age: " + age + ", Salary: $" + salary);
    }

    public static void main(String[] args) {
        MethodTypes obj = new MethodTypes();

        // Instance methods
        obj.setValue(42);
        System.out.println("Value: " + obj.getValue());

        // Static method (called on class)
        int sum = MethodTypes.add(10, 20);
        System.out.println("Sum: " + sum);

        // Method with multiple parameters
        obj.updateInfo("John Doe", 30, 50000.00);
    }
}
\`\`\`

---

## 🎯 Practical Examples

### **Bank Account System**

\`\`\`java
/**
 * Represents a bank account with basic operations.
 */
public class BankAccount {
    // Fields
    private String accountNumber;
    private String accountHolder;
    private double balance;
    private static int accountCounter = 1000;

    // Constructor
    public BankAccount(String accountHolder) {
        this.accountHolder = accountHolder;
        this.accountNumber = "ACC" + (++accountCounter);
        this.balance = 0.0;
    }

    // Methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("$" + amount + " deposited. New balance: $" + balance);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("$" + amount + " withdrawn. New balance: $" + balance);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountInfo() {
        return "Account: " + accountNumber + ", Holder: " + accountHolder + ", Balance: $" + balance;
    }

    public static void main(String[] args) {
        // Create bank accounts (objects)
        BankAccount account1 = new BankAccount("Alice Johnson");
        BankAccount account2 = new BankAccount("Bob Smith");

        // Perform operations
        account1.deposit(1000.00);
        account1.withdraw(200.00);

        account2.deposit(500.00);
        account2.withdraw(100.00);

        // Display information
        System.out.println("\\n" + account1.getAccountInfo());
        System.out.println(account2.getAccountInfo());
    }
}
\`\`\`

### **Student Management System**

\`\`\`java
/**
 * Represents a student in a university system.
 */
public class Student {
    // Fields
    private String studentId;
    private String name;
    private int age;
    private String major;
    private double gpa;
    private static int studentCount = 0;

    // Constructor
    public Student(String name, int age, String major) {
        this.name = name;
        this.age = age;
        this.major = major;
        this.gpa = 0.0;
        this.studentId = "STU" + String.format("%03d", ++studentCount);
    }

    // Methods
    public void updateGPA(double newGPA) {
        if (newGPA >= 0.0 && newGPA <= 4.0) {
            this.gpa = newGPA;
        } else {
            System.out.println("Invalid GPA. Must be between 0.0 and 4.0");
        }
    }

    public String getGrade() {
        if (gpa >= 3.7) return "A";
        else if (gpa >= 3.0) return "B";
        else if (gpa >= 2.0) return "C";
        else if (gpa >= 1.0) return "D";
        else return "F";
    }

    public void displayInfo() {
        System.out.println("Student ID: " + studentId);
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Major: " + major);
        System.out.println("GPA: " + String.format("%.2f", gpa));
        System.out.println("Grade: " + getGrade());
        System.out.println("---");
    }

    public static int getTotalStudents() {
        return studentCount;
    }

    public static void main(String[] args) {
        // Create student objects
        Student student1 = new Student("Alice Johnson", 20, "Computer Science");
        Student student2 = new Student("Bob Smith", 21, "Mathematics");
        Student student3 = new Student("Carol Davis", 19, "Physics");

        // Update GPAs
        student1.updateGPA(3.8);
        student2.updateGPA(3.2);
        student3.updateGPA(2.9);

        // Display information
        System.out.println("Student Information:");
        System.out.println("===================");
        student1.displayInfo();
        student2.displayInfo();
        student3.displayInfo();

        System.out.println("Total students: " + Student.getTotalStudents());
    }
}
\`\`\`

---

## 🔒 Access Modifiers

### **Public, Private, Protected, Default**

\`\`\`java
public class AccessModifiers {
    public int publicField = 1;      // Accessible from anywhere
    private int privateField = 2;    // Accessible only within this class
    protected int protectedField = 3; // Accessible within package and subclasses
    int defaultField = 4;           // Accessible within package (default)

    public void demonstrateAccess() {
        System.out.println("Public: " + publicField);
        System.out.println("Private: " + privateField);
        System.out.println("Protected: " + protectedField);
        System.out.println("Default: " + defaultField);
    }
}

class TestAccess {
    public static void main(String[] args) {
        AccessModifiers obj = new AccessModifiers();

        // Can access public field
        System.out.println("Public field: " + obj.publicField);

        // Cannot access private field
        // System.out.println(obj.privateField); // Compilation error

        // Can access protected field (same package)
        System.out.println("Protected field: " + obj.protectedField);

        // Can access default field (same package)
        System.out.println("Default field: " + obj.defaultField);
    }
}
\`\`\`

---

## 🎯 Summary

Classes and objects are the foundation of Java programming:

### **Key Concepts**
- **Class**: Blueprint defining structure and behavior
- **Object**: Instance of a class with its own state
- **Encapsulation**: Data + methods bundled together
- **Fields**: Store object state (instance variables)
- **Methods**: Define object behavior
- **Constructors**: Initialize objects

### **Class Structure**
\`\`\`java
public class ClassName {
    // Fields
    private dataType fieldName;

    // Constructor
    public ClassName(parameters) {
        // initialization
    }

    // Methods
    public returnType methodName(parameters) {
        // implementation
    }
}
\`\`\`

### **Object Creation and Usage**
\`\`\`java
// Create object
ClassName objectName = new ClassName(parameters);

// Access fields/methods
objectName.fieldName;
objectName.methodName(arguments);
\`\`\`

### **Best Practices**
- Use meaningful class and variable names
- Encapsulate data with private fields and public accessors
- Initialize objects properly in constructors
- Follow single responsibility principle
- Use appropriate access modifiers

### **Common Patterns**
- **Data classes**: Store and manage data (BankAccount, Student)
- **Service classes**: Provide functionality (Calculator, FileProcessor)
- **Utility classes**: Static helper methods (MathUtils, StringUtils)
- **Controller classes**: Manage application flow

Master classes and objects, and you'll have the foundation for building sophisticated Java applications!

### **Quick Check**
What will be the output of this code?
\`\`\`java
public class Test {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Red", 2020, 20000);
        Car car2 = new Car("Honda", "Blue", 2021, 22000);

        System.out.println(car1.getModel());
        System.out.println(car2.getModel());
        System.out.println(Car.getTotalCars());
    }
}
\`\`\`
1. First output: ?
2. Second output: ?
3. Third output: ?
`};

