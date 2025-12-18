import { SubLesson } from '../../../data/lessonsData';

export const topic_2_1: SubLesson = {
  id: 2.1,
  title: 'Basic Syntax',
  status: 'completed',
  content: `# 📝 Java Basic Syntax

Java syntax is designed to be clean, readable, and structured. Let's explore the fundamental building blocks of Java code.

---

## 🏗️ Java Program Structure

### 1. **Statements and Expressions**

\`\`\`java
// Statement (performs an action)
System.out.println("Hello, World!");

// Expression (returns a value)
int result = 2 + 3;  // Returns 5

// Assignment statement
String name = "Alice";
int age = 25;
\`\`\`

### 2. **Comments**

\`\`\`java
// This is a single-line comment

/*
This is a multi-line comment
that spans multiple lines
*/

/**
 * This is a documentation comment
 * Used for generating JavaDoc
 */

// Comments help explain your code
String userName = "Bob";  // Store the user's name
\`\`\`

## 📦 Code Blocks and Indentation

### **Consistent Indentation**
Java uses **curly braces** \`{}\` to define code blocks, but **consistent indentation** is crucial for readability:

\`\`\`java
// ✅ Correct - consistent indentation
if (true) {
    System.out.println("This works!");
    System.out.println("Still in the if block");
}
System.out.println("Outside the if block");

// ❌ Wrong - inconsistent indentation (will compile but hard to read)
// if (true) {
// System.out.println("This will compile");
//     System.out.println("but is hard to read");
// }
\`\`\`

### **Block Structure Examples**
\`\`\`java
// Method definition
public void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

// Class definition
public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }
}

// Control structures
if (condition) {
    // code block
} else {
    // another code block
}
\`\`\`

## 🔑 Keywords and Identifiers

### **🚫 Java Keywords** (Reserved Words)
\`\`\`java
// Some important Java keywords:
public      // Access modifier
private     // Access modifier
class       // Class definition
void        // Return type for methods
static      // Class-level member
final       // Constant or non-overrideable
if          // Conditional statement
else        // Alternative condition
for         // Loop
while       // Loop
return      // Return from method
import      // Import classes
\`\`\`

### **📋 Naming Rules for Variables and Methods**
\`\`\`java
// ✅ Valid names
String name = "Alice";
String userName = "Bob";
int totalScore = 100;
void calculateTotal() { }

// ❌ Invalid names (will cause compile errors)
// int 123abc = 10;     // Cannot start with number
// String my-name = "";  // Cannot use hyphens
// int class = 5;        // Cannot use keywords
\`\`\`

### **📝 Naming Conventions**
\`\`\`java
// CamelCase for classes
public class BankAccount { }

// camelCase for variables and methods
String firstName = "John";
int accountBalance = 1000;
void depositMoney() { }

// UPPER_CASE for constants
final double PI = 3.14159;
final int MAX_USERS = 100;
\`\`\`

## 🔧 Basic Program Structure

### **Minimal Java Program**
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### **Complete Program Structure**
\`\`\`java
// 1. Package declaration (optional)
package com.example;

// 2. Import statements (optional)
import java.util.Scanner;

// 3. Class definition
public class MyProgram {

    // 4. Fields (optional)
    private String name;

    // 5. Constructor (optional)
    public MyProgram(String name) {
        this.name = name;
    }

    // 6. Methods
    public void greet() {
        System.out.println("Hello, " + name + "!");
    }

    // 7. Main method (entry point)
    public static void main(String[] args) {
        MyProgram program = new MyProgram("World");
        program.greet();
    }
}
\`\`\`

### **1. Package Declaration (Optional)**
\`\`\`java
// Package declaration (must be first line if present)
package com.example.myapp;

// This organizes code into namespaces
\`\`\`

### **2. Import Statements (Optional)**
\`\`\`java
// Import statements (after package, before class)
import java.util.Scanner;           // Single class import
import java.util.*;                  // Wildcard import (all classes in package)
import static java.lang.Math.PI;     // Static import

// Multiple imports
import java.io.File;
import java.io.IOException;
\`\`\`

### **3. Class Declaration**
\`\`\`java
// Basic class structure
public class HelloWorld {
    // Class body - fields, constructors, methods
}

// Class with access modifiers
public class Calculator {
    // Class members go here
}

class Helper {  // Package-private class
    // Accessible only within same package
}

private class InnerHelper {  // Inner class
    // Nested class
}
\`\`\`

### **4. The main Method - Program Entry Point**
\`\`\`java
public class HelloWorld {
    // The main method - where execution begins
    public static void main(String[] args) {
        // Program logic goes here
        System.out.println("Hello, Java!");
    }
}

// Alternative main method signatures (valid but less common)
public static void main(String args[]) { }  // Array syntax variation
public static void main(String... args) { } // Varargs syntax
\`\`\`

---

## ?? Comments in Java

Comments are essential for code documentation and readability. Java supports three types of comments:

### **1. Single-Line Comments**
\`\`\`java
public class CommentExamples {
    public static void main(String[] args) {
        // This is a single-line comment
        System.out.println("Hello"); // Comment after code

        // Multiple single-line comments
        // are often used for
        // multi-line explanations
    }
}
\`\`\`

### **2. Multi-Line Comments (Block Comments)**
\`\`\`java
public class MultiLineComments {
    public static void main(String[] args) {
        /*
         * This is a multi-line comment
         * that spans several lines.
         * It's useful for longer explanations.
         */

        System.out.println("Multi-line comments are helpful");

        /* Multi-line comments can also be
           written in a single line like this */
    }
}
\`\`\`

### **3. Documentation Comments (JavaDoc)**
\`\`\`java
/**
 * This is a JavaDoc comment for the Calculator class.
 * It provides detailed documentation that can be
 * extracted to generate HTML documentation.
 *
 * @author John Doe
 * @version 1.0
 * @since 2024
 */
public class Calculator {

    /**
     * Adds two integers and returns the result.
     *
     * @param a the first number
     * @param b the second number
     * @return the sum of a and b
     */
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * The main method - program entry point.
     * @param args command line arguments
     */
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 3)); // Output: 8
    }
}
\`\`\`

#### **JavaDoc Tags**
- **\`@param\`**: Describes method parameters
- **\`@return\`**: Describes return values
- **\`@throws\`** or **\`@exception\`**: Documents exceptions
- **\`@author\`**: Specifies the author
- **\`@version\`**: Version information
- **\`@since\`**: When the element was added
- **\`@see\`**: References to other elements
- **\`@deprecated\`**: Marks deprecated elements

---

## ?? Java Statements and Expressions

### **Statements**
Statements are complete units of execution that perform actions:

\`\`\`java
public class Statements {
    public static void main(String[] args) {
        // Declaration statement
        int x;

        // Assignment statement
        x = 5;

        // Method call statement
        System.out.println("Hello");

        // Control flow statements
        if (x > 0) {
            System.out.println("Positive");
        }

        // Loop statement
        for (int i = 0; i < 3; i++) {
            System.out.println(i);
        }
    }
}
\`\`\`

### **Expressions**
Expressions evaluate to values:

\`\`\`java
public class Expressions {
    public static void main(String[] args) {
        // Arithmetic expressions
        int sum = 5 + 3;           // 8
        int product = 4 * 2;       // 8
        double division = 10.0 / 3; // 3.333...

        // Comparison expressions
        boolean isEqual = (5 == 3);     // false
        boolean isGreater = (10 > 5);   // true

        // Logical expressions
        boolean result = (5 > 3) && (10 < 20); // true

        // Method call expressions
        String message = "Hello".toUpperCase(); // "HELLO"

        // Complex expressions
        int complex = (5 + 3) * 2 - 1; // 15

        System.out.println("Complex result: " + complex);
    }
}
\`\`\`

---

## ?? Identifiers and Keywords

### **Identifiers**
Identifiers are names given to classes, methods, variables, etc.:

\`\`\`java
public class IdentifierExamples {
    // Valid identifiers
    int age;
    String firstName;
    double _privateField;
    boolean $isValid;

    // Invalid identifiers (compilation errors)
    // int 123invalid;     // Cannot start with number
    // int my-variable;    // Cannot contain hyphens
    // int class;          // Reserved keyword

    public void calculateTotal() {
        int itemCount = 5;
        double itemPrice = 29.99;
        double totalAmount = itemCount * itemPrice;
    }
}
\`\`\`

#### **Identifier Rules**
- **Must start with**: letter, underscore (_), or dollar sign ($)
- **Can contain**: letters, digits, underscores, dollar signs
- **Case sensitive**: \`myVar\` ? \`myvar\` ? \`MYVAR\`
- **No length limit**: but keep them reasonable
- **Cannot be keywords**: reserved words have special meanings

### **Java Keywords**
Java has 67 reserved keywords (as of Java 17):

#### **Access Modifiers**
- \`public\`, \`private\`, \`protected\`

#### **Class/Object Keywords**
- \`class\`, \`interface\`, \`enum\`, \`abstract\`, \`final\`, \`static\`
- \`extends\`, \`implements\`, \`super\`, \`this\`, \`new\`, \`instanceof\`

#### **Control Flow**
- \`if\`, \`else\`, \`switch\`, \`case\`, \`default\`
- \`for\`, \`while\`, \`do\`, \`break\`, \`continue\`
- \`return\`, \`try\`, \`catch\`, \`finally\`, \`throw\`, \`throws\`

#### **Data Types**
- \`boolean\`, \`byte\`, \`char\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`
- \`void\` (for methods that don't return values)

#### **Other Keywords**
- \`package\`, \`import\`, \`synchronized\`, \`volatile\`, \`transient\`
- \`native\`, \`strictfp\`, \`assert\`, \`const\`, \`goto\` (reserved but unused)

---

## ?? Code Organization and Structure

### **Proper Code Formatting**
\`\`\`java
// ? Good formatting (readable)
public class WellFormatted {
    private int value;

    public WellFormatted(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}

// ? Poor formatting (hard to read)
// Compact but confusing
public class PoorlyFormatted{private int value;public PoorlyFormatted(int value){this.value=value;}public int getValue(){return value;}public void setValue(int value){this.value=value;}}
\`\`\`

### **Indentation and Spacing**
\`\`\`java
public class FormattingGuidelines {
    public static void main(String[] args) {
        // Use 4 spaces or consistent tabs for indentation
        if (args.length > 0) {
            System.out.println("Arguments provided");

            for (String arg : args) {
                System.out.println("Arg: " + arg);
            }
        } else {
            System.out.println("No arguments");
        }
    }
}
\`\`\`

### **Naming Conventions**
\`\`\`java
public class NamingConventions {
    // Classes: PascalCase (first letter of each word capitalized)
    public class UserAccount { }
    public class DataProcessor { }

    // Methods and variables: camelCase (first word lowercase, subsequent capitalized)
    public void processData() { }
    private int userCount;
    public String firstName;

    // Constants: UPPER_SNAKE_CASE (all uppercase, words separated by underscores)
    public static final int MAX_USERS = 1000;
    public static final String DEFAULT_NAME = "Guest";
    public static final double PI_VALUE = 3.14159;

    // Packages: lowercase with dots
    // com.example.myapp
    // org.apache.commons
}
\`\`\`

---

## ?? Complete Java Program Examples

### **Example 1: Simple Calculator**
\`\`\`java
/**
 * A simple calculator program demonstrating Java syntax.
 * @author Java Learner
 * @version 1.0
 */
public class SimpleCalculator {

    /**
     * The main method - program entry point.
     * @param args command line arguments
     */
    public static void main(String[] args) {
        // Create calculator instance
        SimpleCalculator calc = new SimpleCalculator();

        // Perform calculations
        int sum = calc.add(10, 5);
        int difference = calc.subtract(10, 5);
        int product = calc.multiply(10, 5);
        double quotient = calc.divide(10, 5);

        // Display results
        System.out.println("Sum: " + sum);
        System.out.println("Difference: " + difference);
        System.out.println("Product: " + product);
        System.out.println("Quotient: " + quotient);
    }

    /**
     * Adds two integers.
     * @param a first number
     * @param b second number
     * @return the sum
     */
    public int add(int a, int b) {
        return a + b;
    }

    /**
     * Subtracts two integers.
     * @param a first number
     * @param b second number
     * @return the difference
     */
    public int subtract(int a, int b) {
        return a - b;
    }

    /**
     * Multiplies two integers.
     * @param a first number
     * @param b second number
     * @return the product
     */
    public int multiply(int a, int b) {
        return a * b;
    }

    /**
     * Divides two numbers.
     * @param a dividend
     * @param b divisor
     * @return the quotient
     */
    public double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) a / b;
    }
}
\`\`\`

### **Example 2: Student Grade System**
\`\`\`java
package com.example.school;

/**
 * A student grading system demonstrating Java structure.
 */
public class StudentGradeSystem {
    // Constants
    private static final int PASSING_GRADE = 60;
    private static final String SCHOOL_NAME = "Example University";

    public static void main(String[] args) {
        // Create student records
        Student alice = new Student("Alice Johnson", 85);
        Student bob = new Student("Bob Smith", 72);
        Student charlie = new Student("Charlie Brown", 45);

        // Process grades
        processStudent(alice);
        processStudent(bob);
        processStudent(charlie);
    }

    /**
     * Processes a student's grade information.
     * @param student the student to process
     */
    public static void processStudent(Student student) {
        System.out.println("\\n--- Student Report ---");
        System.out.println("School: " + SCHOOL_NAME);
        System.out.println("Name: " + student.getName());
        System.out.println("Grade: " + student.getGrade());

        // Determine pass/fail status
        if (student.getGrade() >= PASSING_GRADE) {
            System.out.println("Status: PASS ?");
            System.out.println("Letter Grade: " + getLetterGrade(student.getGrade()));
        } else {
            System.out.println("Status: FAIL ?");
            System.out.println("Recommendation: Extra tutoring required");
        }
    }

    /**
     * Converts numeric grade to letter grade.
     * @param grade the numeric grade
     * @return the letter grade
     */
    private static String getLetterGrade(int grade) {
        if (grade >= 90) return "A";
        else if (grade >= 80) return "B";
        else if (grade >= 70) return "C";
        else if (grade >= 60) return "D";
        else return "F";
    }
}

/**
 * Represents a student with name and grade.
 */
class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public int getGrade() {
        return grade;
    }
}
\`\`\`

---

## ?? Best Practices for Java Syntax

### **1. Code Readability**
\`\`\`java
// ? Good: Clear and readable
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Invalid user ID");
        }
        return userRepository.findById(id);
    }
}

// ? Bad: Confusing and hard to read
public class US{UserRepository ur;public US(UserRepository u){ur=u;}public User fUBI(Long i){if(i==null||i<=0)throw new IllegalArgumentException("Invalid user ID");return ur.findById(i);}}
\`\`\`

### **2. Consistent Naming**
\`\`\`java
// ? Good naming conventions
public class OrderProcessor {
    private List<Order> pendingOrders;
    private final int MAX_PROCESSING_TIME = 300;

    public void processPendingOrders() {
        for (Order order : pendingOrders) {
            processSingleOrder(order);
        }
    }

    private void processSingleOrder(Order order) {
        // Processing logic
    }
}

// ? Bad naming
public class OP {
    private List<O> po;
    private final int mpt = 300;

    public void ppo() {
        for (O o : po) {
            pso(o);
        }
    }

    private void pso(O o) {
        // Processing logic
    }
}
\`\`\`

### **3. Proper Documentation**
\`\`\`java
/**
 * Represents a bank account with basic operations.
 * This class demonstrates proper encapsulation and documentation.
 *
 * @author Finance Team
 * @version 2.0
 * @since 2024
 */
public class BankAccount {
    private String accountNumber;
    private double balance;
    private final double MINIMUM_BALANCE = 100.0;

    /**
     * Creates a new bank account with initial balance.
     *
     * @param accountNumber the unique account identifier
     * @param initialBalance the starting balance (must be >= minimum)
     * @throws IllegalArgumentException if initialBalance < minimum balance
     */
    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < MINIMUM_BALANCE) {
            throw new IllegalArgumentException(
                "Initial balance must be at least $" + MINIMUM_BALANCE);
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    /**
     * Deposits money into the account.
     *
     * @param amount the amount to deposit (must be positive)
     * @return true if deposit was successful
     */
    public boolean deposit(double amount) {
        // Implementation
        return true;
    }
}
\`\`\`

### **4. Avoid Common Syntax Errors**
\`\`\`java
public class CommonErrors {
    public static void main(String[] args) {
        // ? Correct: Proper semicolon usage
        int x = 5;
        System.out.println(x);

        // ? Wrong: Missing semicolon
        // int y = 10  // Compilation error!

        // ? Correct: Proper brace matching
        if (x > 0) {
            System.out.println("Positive");
        }

        // ? Wrong: Mismatched braces
        // if (x > 0) {
        //     System.out.println("Positive");
        //     // Missing closing brace!

        // ? Correct: Proper string literals
        String message = "Hello, World!";
        System.out.println(message);

        // ? Wrong: Unclosed string literal
        // String bad = "Hello, World!; // Compilation error!
    }
}
\`\`\`

---

## ?? Summary

Java syntax provides a structured and readable way to write programs. Key takeaways:

### **Essential Elements**
- **Package declarations** for organization
- **Import statements** for using external code
- **Class declarations** as program building blocks
- **Main method** as program entry point
- **Proper comments** for documentation

### **Best Practices**
- **Follow naming conventions** (camelCase, PascalCase, UPPER_SNAKE_CASE)
- **Use consistent indentation** (4 spaces recommended)
- **Write clear, descriptive comments**
- **Keep methods and classes focused** on single responsibilities
- **Handle errors gracefully** with proper exception handling

### **Common Patterns**
- **Class structure**: fields, constructors, methods
- **Method signatures**: access modifiers, return types, parameters
- **Control flow**: if-else, loops, switch statements
- **Error handling**: try-catch blocks

Now that you understand Java syntax, you're ready to explore **variables and data types** in the next module! ??

### **Quick Check**
Test your understanding by identifying the syntax elements in this code:
\`\`\`java
package com.example.demo;  // 1. Package declaration

import java.util.Scanner;  // 2. Import statement

/**
 * A simple demo program.  // 3. Documentation comment
 * @author Demo Author
 */
public class DemoProgram {  // 4. Class declaration
    private static final int MAX_VALUE = 100;  // 5. Constant field

    public static void main(String[] args) {  // 6. Main method
        Scanner scanner = new Scanner(System.in);  // 7. Variable declaration
        System.out.println("Enter a number:");    // 8. Method call
        int number = scanner.nextInt();           // 9. Variable assignment

        if (number > MAX_VALUE) {  // 10. Control structure
            System.out.println("Number is too large!");
        } else {
            System.out.println("Number accepted: " + number);
        }
    }
}
`
};



