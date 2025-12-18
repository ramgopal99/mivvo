import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_4: SubLesson = {
  id: "8.4",
  title: 'Methods and Encapsulation',
  status: 'completed',
  content: `# 📦 Methods and Encapsulation in Java

Master method design and data hiding principles in object-oriented programming!

---

## 🎯 Methods in Java

### **What is a Method?**

A **method** is a block of code that performs a specific task and can be called multiple times. Methods help organize code into reusable units.

### **Method Components:**
\`\`\`java
public class MethodExample {
    // Method signature: access modifier + return type + name + parameters
    public int calculateSum(int a, int b) {  // Method header
        int sum = a + b;                      // Method body
        return sum;                           // Return statement
    }

    // Method that doesn't return anything
    public void printMessage(String message) {
        System.out.println(message);
    }

    // Method with no parameters
    public void sayHello() {
        System.out.println("Hello, World!");
    }
}
\`\`\`

---

## 📝 Method Types

### **1. Instance Methods**
Belong to object instances, can access instance variables.

\`\`\`java
public class Calculator {
    private int memory = 0;

    // Instance method - uses 'this' implicitly
    public int add(int a, int b) {
        return a + b;
    }

    // Instance method - accesses instance variable
    public void saveToMemory(int value) {
        this.memory = value;
    }

    public int getMemory() {
        return memory;
    }
}
\`\`\`

### **2. Static Methods**
Belong to the class, don't need object instances.

\`\`\`java
public class MathUtils {
    // Static method - belongs to class
    public static int max(int a, int b) {
        return (a > b) ? a : b;
    }

    // Static method can call other static methods
    public static int maxOfThree(int a, int b, int c) {
        return max(max(a, b), c);
    }

    public static void main(String[] args) {
        // Call static methods without creating object
        int result = MathUtils.max(5, 10); // 10
        int result2 = MathUtils.maxOfThree(5, 10, 3); // 10
    }
}
\`\`\`

### **3. Method Overloading**
Multiple methods with same name but different parameters.

\`\`\`java
public class Printer {
    // Overloaded methods
    public void print(String text) {
        System.out.println(text);
    }

    public void print(int number) {
        System.out.println("Number: " + number);
    }

    public void print(String text, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(text);
        }
    }

    public void print(int[] array) {
        for (int num : array) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Printer printer = new Printer();
        printer.print("Hello");           // Hello
        printer.print(42);                // Number: 42
        printer.print("Hi", 3);           // Hi Hi Hi
        printer.print(new int[]{1,2,3});  // 1 2 3
    }
}
\`\`\`

---

## 🔒 Encapsulation

### **What is Encapsulation?**

**Encapsulation** is the bundling of data and methods that operate on that data into a single unit (class), while restricting access to some components.

### **Key Principles:**
- **Data Hiding**: Hide internal state from outside world
- **Access Control**: Use access modifiers to control visibility
- **Getter/Setter Methods**: Controlled access to private fields

\`\`\`java
public class BankAccount {
    // Private fields - encapsulated data
    private String accountNumber;
    private double balance;
    private String ownerName;

    // Constructor
    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0;
    }

    // Public methods - controlled access
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Insufficient funds or invalid amount");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    // Private helper method - not accessible outside
    private boolean isValidAmount(double amount) {
        return amount > 0 && amount <= 10000; // Business rule
    }
}
\`\`\`

---

## 🔐 Access Modifiers

### **1. public**
Accessible from anywhere.

\`\`\`java
public class PublicExample {
    public int publicField = 10;

    public void publicMethod() {
        System.out.println("Public method");
    }
}

// Anywhere in the program
PublicExample obj = new PublicExample();
obj.publicMethod(); // Accessible
\`\`\`

### **2. private**
Accessible only within the same class.

\`\`\`java
public class PrivateExample {
    private int secretCode = 12345;

    private void secretMethod() {
        System.out.println("This is private");
    }

    public void accessSecret() {
        secretMethod(); // OK - same class
        System.out.println("Secret code: " + secretCode); // OK - same class
    }
}

// Outside the class
PrivateExample obj = new PrivateExample();
// obj.secretMethod(); // Error - not accessible
// obj.secretCode;     // Error - not accessible
\`\`\`

### **3. protected**
Accessible within same package and subclasses.

\`\`\`java
public class ProtectedExample {
    protected int protectedField = 20;

    protected void protectedMethod() {
        System.out.println("Protected method");
    }
}

class SubClass extends ProtectedExample {
    public void accessProtected() {
        protectedMethod(); // OK - subclass
        System.out.println(protectedField); // OK - subclass
    }
}

// Same package
class SamePackageClass {
    public void accessProtected() {
        ProtectedExample obj = new ProtectedExample();
        obj.protectedMethod(); // OK - same package
    }
}
\`\`\`

### **4. default (no modifier)**
Accessible only within same package.

\`\`\`java
class DefaultExample {  // No public modifier
    int defaultField = 30;  // No access modifier

    void defaultMethod() {  // No access modifier
        System.out.println("Default method");
    }
}

// Same package - accessible
class SamePackage {
    void test() {
        DefaultExample obj = new DefaultExample();
        obj.defaultMethod(); // OK
    }
}

// Different package - not accessible
// package other;
// class OtherPackage {
//     void test() {
//         DefaultExample obj = new DefaultExample(); // Error
//     }
// }
\`\`\`

---

## 🛠️ Getter and Setter Methods

### **Why Use Getters and Setters?**
- Encapsulation control
- Validation logic
- Lazy initialization
- API flexibility

\`\`\`java
public class Employee {
    private String name;
    private double salary;
    private int age;

    // Getter methods
    public String getName() {
        return name;
    }

    public double getSalary() {
        return salary;
    }

    public int getAge() {
        return age;
    }

    // Setter methods with validation
    public void setName(String name) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name.trim();
        }
    }

    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        }
    }

    public void setAge(int age) {
        if (age >= 18 && age <= 65) {
            this.age = age;
        }
    }

    // Business logic method
    public void giveRaise(double percentage) {
        if (percentage > 0 && percentage <= 20) {
            salary += salary * (percentage / 100);
        }
    }
}
\`\`\`

---

## 🎨 Method Design Best Practices

### **1. Single Responsibility Principle**
\`\`\`java
public class FileProcessor {
    // Bad: Multiple responsibilities
    public void processFile(String filename) {
        // Read file
        // Process data
        // Write results
        // Send email notification
    }

    // Good: Single responsibility each
    public List<String> readFile(String filename) { /* ... */ }
    public List<Data> processData(List<String> lines) { /* ... */ }
    public void writeResults(List<Data> results) { /* ... */ }
    public void sendNotification(String message) { /* ... */ }
}
\`\`\`

### **2. Method Naming Conventions**
\`\`\`java
public class NamingExample {
    // Good names - clear intent
    public void calculateTotalPrice() { /* ... */ }
    public boolean isValidEmail(String email) { /* ... */ }
    public User findUserById(Long id) { /* ... */ }

    // Bad names - unclear
    public void doStuff() { /* ... */ }           // What stuff?
    public void process() { /* ... */ }           // Process what?
    public int get() { /* ... */ }                // Get what?
}
\`\`\`

### **3. Parameter Validation**
\`\`\`java
public class ValidationExample {
    public void transferMoney(Account from, Account to, double amount) {
        // Validate parameters
        if (from == null) {
            throw new IllegalArgumentException("Source account cannot be null");
        }
        if (to == null) {
            throw new IllegalArgumentException("Destination account cannot be null");
        }
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
        if (from.getBalance() < amount) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        // Perform transfer
        from.withdraw(amount);
        to.deposit(amount);
    }
}
\`\`\`

---

## 🔄 Method Overriding vs Overloading

### **Method Overloading (Compile-time Polymorphism)**
\`\`\`java
public class Calculator {
    // Same method name, different parameters
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
\`\`\`

### **Method Overriding (Runtime Polymorphism)**
\`\`\`java
public class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

public class Dog extends Animal {
    @Override  // Annotation indicates overriding
    public void makeSound() {
        System.out.println("Dog barks");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }
}

// Usage
public class Test {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();

        animal1.makeSound(); // Dog barks
        animal2.makeSound(); // Cat meows
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Methods** organize code into reusable, callable units
2. **Encapsulation** hides internal state and provides controlled access
3. **Access Modifiers** control visibility: private, default, protected, public
4. **Getters/Setters** provide controlled access to private fields
5. **Method Overloading** same name, different parameters (compile-time)
6. **Method Overriding** same signature in subclass (runtime)
7. **Best Practices**: Single responsibility, clear naming, parameter validation

**Next:** Learn about inheritance and polymorphism! 🚀`
};

