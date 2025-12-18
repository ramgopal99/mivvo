import { Exercise } from '../../../data/lessonsData';

export const exercise_7_1: Exercise = {
  id: 7.1,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates basic inheritance:\n1. Create a base class 'Animal' with properties and methods\n2. Create a derived class 'Dog' that extends Animal\n3. Override methods in the Dog class\n4. Demonstrate the 'super' keyword usage\n5. Show how inherited methods work",
      solution: `public class InheritanceBasics {
    public static void main(String[] args) {
        // Create instances of both classes
        Animal genericAnimal = new Animal("Generic Animal");
        Dog dog = new Dog("Buddy", "Golden Retriever");

        // Call methods on both objects
        System.out.println("=== Generic Animal ===");
        genericAnimal.makeSound();
        genericAnimal.eat();
        genericAnimal.sleep();

        System.out.println("\\n=== Dog ===");
        dog.makeSound(); // Overridden method
        dog.eat();       // Inherited method
        dog.sleep();     // Inherited method
        dog.fetch();     // Dog-specific method
        dog.displayBreed(); // Dog-specific method
    }
}

// Base class
class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
        System.out.println("Animal constructor called for: " + name);
    }

    public void makeSound() {
        System.out.println(name + " makes a generic animal sound");
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
}

// Derived class
class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name); // Call parent constructor
        this.breed = breed;
        System.out.println("Dog constructor called for: " + name + " (" + breed + ")");
    }

    // Override parent method
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }

    // Dog-specific method
    public void fetch() {
        System.out.println(name + " is fetching a ball");
    }

    // Dog-specific method
    public void displayBreed() {
        System.out.println(name + " is a " + breed);
    }

    // Method that uses both inherited and own properties
    public void play() {
        super.eat(); // Call parent method
        fetch();     // Call own method
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates method overriding and polymorphism:\n1. Create a Vehicle base class with move() method\n2. Create Car and Bicycle classes that extend Vehicle\n3. Override the move() method in each subclass\n4. Demonstrate polymorphism by storing objects in Vehicle array\n5. Show dynamic method dispatch at runtime",
      solution: `public class PolymorphismDemo {
    public static void main(String[] args) {
        // Create different vehicle objects
        Vehicle car = new Car("Toyota Camry");
        Vehicle bicycle = new Bicycle("Mountain Bike");
        Vehicle genericVehicle = new Vehicle("Generic Vehicle");

        // Array of Vehicle objects (polymorphism)
        Vehicle[] vehicles = {car, bicycle, genericVehicle};

        // Polymorphic method calls - runtime determines which method to execute
        System.out.println("=== Vehicle Movements ===");
        for (Vehicle vehicle : vehicles) {
            vehicle.move();      // Dynamic method dispatch
            vehicle.displayInfo();
            System.out.println();
        }

        // Direct method calls
        System.out.println("=== Specific Behaviors ===");
        Car specificCar = (Car) car; // Downcasting
        specificCar.honk();

        Bicycle specificBicycle = (Bicycle) bicycle;
        specificBicycle.ringBell();
    }
}

// Base class
class Vehicle {
    protected String name;

    public Vehicle(String name) {
        this.name = name;
    }

    // Method to be overridden
    public void move() {
        System.out.println(name + " moves in a generic way");
    }

    public void displayInfo() {
        System.out.println("This is a " + name);
    }
}

// Car class extends Vehicle
class Car extends Vehicle {
    public Car(String name) {
        super(name);
    }

    @Override
    public void move() {
        System.out.println(name + " drives on roads with 4 wheels");
    }

    // Car-specific method
    public void honk() {
        System.out.println(name + " honks: Beep! Beep!");
    }
}

// Bicycle class extends Vehicle
class Bicycle extends Vehicle {
    public Bicycle(String name) {
        super(name);
    }

    @Override
    public void move() {
        System.out.println(name + " pedals with 2 wheels");
    }

    // Bicycle-specific method
    public void ringBell() {
        System.out.println(name + " rings bell: Ring! Ring!");
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that demonstrates inheritance with constructors:\n1. Create a Person base class with name and age\n2. Create Employee class extending Person with salary\n3. Create Manager class extending Employee with department\n4. Show constructor chaining with super() calls\n5. Demonstrate multilevel inheritance",
      solution: `public class ConstructorInheritance {
    public static void main(String[] args) {
        // Create objects of different levels in inheritance hierarchy
        Person person = new Person("Alice", 25);
        Employee employee = new Employee("Bob", 30, 50000.0);
        Manager manager = new Manager("Charlie", 40, 80000.0, "Engineering");

        // Display information for each object
        System.out.println("=== Person Information ===");
        person.displayInfo();

        System.out.println("\\n=== Employee Information ===");
        employee.displayInfo();

        System.out.println("\\n=== Manager Information ===");
        manager.displayInfo();

        // Show method overriding in action
        System.out.println("\\n=== Polymorphic Method Calls ===");
        Person[] people = {person, employee, manager};
        for (Person p : people) {
            p.displayInfo();
            System.out.println();
        }
    }
}

// Base class
class Person {
    protected String name;
    protected int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Person constructor called");
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}

// Employee extends Person (single inheritance)
class Employee extends Person {
    protected double salary;

    public Employee(String name, int age, double salary) {
        super(name, age); // Call parent constructor
        this.salary = salary;
        System.out.println("Employee constructor called");
    }

    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Salary: $" + salary);
    }

    public double getSalary() { return salary; }
}

// Manager extends Employee (multilevel inheritance)
class Manager extends Employee {
    private String department;

    public Manager(String name, int age, double salary, String department) {
        super(name, age, salary); // Call parent constructor
        this.department = department;
        System.out.println("Manager constructor called");
    }

    @Override
    public void displayInfo() {
        super.displayInfo(); // Call parent method
        System.out.println("Department: " + department);
        System.out.println("Role: Manager");
    }

    public String getDepartment() { return department; }

    // Manager-specific method
    public void manageTeam() {
        System.out.println(name + " is managing the " + department + " team");
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates the 'protected' access modifier in inheritance:\n1. Create a base class with private, protected, and public members\n2. Show how derived classes can access protected members\n3. Demonstrate that private members are not accessible in derived classes\n4. Show method overriding with different access modifiers\n5. Illustrate the concept of encapsulation in inheritance",
      solution: `public class AccessModifiersInheritance {
    public static void main(String[] args) {
        // Create instances
        Parent parent = new Parent();
        Child child = new Child();

        System.out.println("=== Parent Object ===");
        parent.showAccess();

        System.out.println("\\n=== Child Object ===");
        child.showAccess();
        child.showInheritedAccess();

        // Demonstrate polymorphism
        System.out.println("\\n=== Polymorphic Call ===");
        Parent polymorphicChild = new Child();
        polymorphicChild.showAccess(); // Calls overridden method
    }
}

class Parent {
    private String privateField = "Private field";
    protected String protectedField = "Protected field";
    public String publicField = "Public field";

    private void privateMethod() {
        System.out.println("Private method called");
    }

    protected void protectedMethod() {
        System.out.println("Protected method called");
    }

    public void publicMethod() {
        System.out.println("Public method called");
    }

    public void showAccess() {
        System.out.println("From Parent class:");
        System.out.println("- " + privateField);
        System.out.println("- " + protectedField);
        System.out.println("- " + publicField);

        privateMethod();
        protectedMethod();
        publicMethod();
    }
}

class Child extends Parent {
    public void showInheritedAccess() {
        System.out.println("From Child class accessing inherited members:");

        // Can access protected and public members
        System.out.println("- " + protectedField);
        System.out.println("- " + publicField);

        // Can call protected and public methods
        protectedMethod();
        publicMethod();

        // Cannot access private members (compilation error if uncommented)
        // System.out.println(privateField); // Error!
        // privateMethod(); // Error!

        System.out.println("- Private members are not accessible in child class");
    }

    // Override parent method with same or wider access
    @Override
    public void showAccess() {
        System.out.println("From Child class (overridden method):");
        System.out.println("- " + protectedField);
        System.out.println("- " + publicField);
        System.out.println("- Child can access protected and public members");
    }

    // Child-specific method
    public void childSpecificMethod() {
        // Can access protected members from parent
        System.out.println("Child accessing protected field: " + protectedField);
        protectedMethod(); // Can call protected method
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates the 'final' keyword in inheritance:\n1. Create a final class that cannot be extended\n2. Create a class with final methods that cannot be overridden\n3. Create a class with final fields (constants)\n4. Show inheritance with final and non-final members\n5. Demonstrate when to use final for security and performance",
      solution: `public class FinalKeywordInheritance {
    public static void main(String[] args) {
        // Create instances of inheritable classes
        ParentClass parent = new ParentClass();
        ChildClass child = new ChildClass();

        System.out.println("=== Parent Class ===");
        parent.displayInfo();
        parent.normalMethod();

        System.out.println("\\n=== Child Class ===");
        child.displayInfo();
        child.normalMethod();
        child.childSpecificMethod();

        // Demonstrate final field usage
        System.out.println("\\n=== Constants (Final Fields) ===");
        System.out.println("PI constant: " + Math.PI);
        System.out.println("Max value: " + child.getMaxValue());

        // Cannot instantiate final class (compilation error if uncommented)
        // FinalClass finalObj = new FinalClass(); // Error!

        // Cannot extend final class (compilation error if uncommented)
        // class ExtendedFinal extends FinalClass {} // Error!
    }
}

// Class with final members
class ParentClass {
    // Final field (constant)
    public final double PI = 3.14159;
    public final int MAX_VALUE = 100;

    // Normal field
    protected String name = "Parent Class";

    // Final method - cannot be overridden
    public final void finalMethod() {
        System.out.println("This is a final method and cannot be overridden");
    }

    // Normal method - can be overridden
    public void normalMethod() {
        System.out.println("This is a normal method and can be overridden");
    }

    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("PI: " + PI);
        System.out.println("Max Value: " + MAX_VALUE);
        finalMethod();
    }
}

// Child class extending ParentClass
class ChildClass extends ParentClass {
    // Override normal method (allowed)
    @Override
    public void normalMethod() {
        System.out.println("This is the overridden normal method in ChildClass");
    }

    // Cannot override final method (compilation error if uncommented)
    // @Override
    // public void finalMethod() { } // Error!

    // Can access final fields from parent
    public int getMaxValue() {
        return MAX_VALUE; // Accessing final field from parent
    }

    // Child-specific method
    public void childSpecificMethod() {
        System.out.println("Child can use parent's final field: " + PI);
        finalMethod(); // Can call parent's final method
    }
}

// Final class - cannot be extended
final class FinalClass {
    public void someMethod() {
        System.out.println("Method from final class");
    }

    // Final classes can have final methods too
    public final void finalMethodInFinalClass() {
        System.out.println("Final method in final class");
    }
}

// Cannot extend final class (compilation error if uncommented)
// class TryingToExtendFinal extends FinalClass { } // Error!


