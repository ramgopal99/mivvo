import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: 3.1,
  title: 'Introduction to Variables',
  status: 'completed',
  content: `# 📊 Introduction to Variables in Java

Variables are fundamental building blocks of any programming language. In Java, variables store data that can be manipulated and used throughout your program. Understanding how variables work is essential for effective Java programming.

---

## 🎯 What is a Variable?

A **variable** is a named storage location in memory that holds a value. Think of it as a container that can store different types of data and can be referenced by name throughout your program.

### **Variable Characteristics**
\`\`\`java
public class VariableBasics {
    public static void main(String[] args) {
        // Variable declaration and assignment
        int age = 25;              // Integer variable
        String name = "Alice";      // String variable
        boolean isStudent = true;   // Boolean variable

        // Using variables in expressions
        int nextYearAge = age + 1;

        // Displaying variable values
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Next year: " + nextYearAge);
        System.out.println("Is student: " + isStudent);
    }
}
\`\`\`

---

## 📝 Variable Declaration

### **Basic Declaration Syntax**
\`\`\`java
// datatype variableName;
int age;
String name;
double salary;

// Declaration with initialization
int count = 0;
String message = "Hello";
boolean isValid = false;
\`\`\`

### **Multiple Declarations**
\`\`\`java
// Same type variables can be declared together
int x, y, z;
int a = 1, b = 2, c = 3;

// Different types require separate declarations
int number;
String text;
boolean flag;
\`\`\`

---

## 🎨 Variable Naming Rules

### **Java Naming Conventions**
\`\`\`java
public class NamingExamples {
    // ✅ Valid variable names
    int age;
    String firstName;
    double accountBalance;
    boolean isActive;
    int userCount;
    String emailAddress;

    // ❌ Invalid variable names (compilation errors)
    // int 123abc;        // Cannot start with number
    // int my-variable;   // Cannot contain hyphens
    // int class;         // Reserved keyword
    // int my variable;   // Cannot contain spaces

    public void demonstrateNaming() {
        // camelCase for variables (first letter lowercase)
        String studentName = "John";
        int studentAge = 20;
        double gpaScore = 3.8;

        // Use descriptive names
        int numberOfStudents = 150;  // ✅ Good
        int n = 150;                // ❌ Bad (not descriptive)

        System.out.println(studentName + " is " + studentAge + " years old");
    }
}
\`\`\`

#### **Naming Rules**
- **Must start with**: letter (a-z, A-Z), underscore (_), or dollar sign ($)
- **Can contain**: letters, digits (0-9), underscores, dollar signs
- **Case sensitive**: \`myVar\` ≠ \`myvar\` ≠ \`MYVAR\`
- **No keywords**: Cannot use reserved words like \`class\`, \`int\`, \`public\`
- **No spaces**: Variable names cannot contain spaces

#### **Best Practices**
- **Use camelCase**: \`studentName\`, \`accountBalance\`
- **Be descriptive**: \`numberOfStudents\` instead of \`n\`
- **Use meaningful names**: \`calculateTotal()\` instead of \`calc()\`
- **Keep reasonable length**: Avoid extremely long names

---

## 🔄 Variable Assignment

### **Assignment Operator (=)**
\`\`\`java
public class AssignmentExamples {
    public static void main(String[] args) {
        // Variable declaration and assignment
        int score = 95;

        // Reassignment (changing the value)
        score = 98;  // Old value (95) is replaced

        // Multiple assignments
        int a, b, c;
        a = b = c = 10;  // All variables get value 10

        // Assignment in expressions
        int x = 5;
        int y = x + 10;  // y gets 15

        System.out.println("Score: " + score);
        System.out.println("a, b, c: " + a + ", " + b + ", " + c);
        System.out.println("y: " + y);
    }
}
\`\`\`

### **Compound Assignment Operators**
\`\`\`java
public class CompoundAssignment {
    public static void main(String[] args) {
        int x = 10;

        // Equivalent to: x = x + 5;
        x += 5;  // x becomes 15

        // Equivalent to: x = x * 2;
        x *= 2;  // x becomes 30

        // Equivalent to: x = x - 3;
        x -= 3;  // x becomes 27

        // Equivalent to: x = x / 3;
        x /= 3;  // x becomes 9

        // Equivalent to: x = x % 4;
        x %= 4;  // x becomes 1

        System.out.println("Final x: " + x);
    }
}
\`\`\`

---

## 🌍 Variable Scope

### **Local Variables**
Variables declared inside methods, constructors, or blocks.

\`\`\`java
public class ScopeExample {
    public static void main(String[] args) {
        // Local variable - accessible only within main method
        int localVar = 10;

        if (localVar > 5) {
            // Block scope - accessible only within this if block
            int blockVar = 20;
            System.out.println("Local: " + localVar);
            System.out.println("Block: " + blockVar);
        }

        // blockVar is not accessible here (out of scope)
        // System.out.println(blockVar); // Compilation error!

        System.out.println("Local: " + localVar); // Still accessible
    }

    public void anotherMethod() {
        // localVar is not accessible here (different method)
        // System.out.println(localVar); // Compilation error!
    }
}
\`\`\`

### **Method Parameters**
Variables passed to methods (local to the method).

\`\`\`java
public class ParameterScope {
    public static void main(String[] args) {
        int x = 5;
        int y = 10;

        // x and y are passed as parameters
        int result = addNumbers(x, y);
        System.out.println("Result: " + result);
    }

    // Parameters a and b are local to this method
    public static int addNumbers(int a, int b) {
        return a + b;  // a and b are accessible here
    }

    // a and b are not accessible here (different method)
    // public static void anotherMethod() {
    //     System.out.println(a); // Compilation error!
    // }
}
\`\`\`

---

## 🏷️ Variable Initialization

### **Default Initialization**
Local variables must be initialized before use. Class/instance variables have default values.

\`\`\`java
public class InitializationExample {
    // Instance variables (automatically initialized)
    private int instanceVar;        // Default: 0
    private boolean flag;           // Default: false
    private String text;            // Default: null
    private double price;           // Default: 0.0

    public void demonstrateInitialization() {
        // Local variables must be initialized before use
        int localVar;  // Declared but not initialized

        // System.out.println(localVar); // Compilation error!

        // Initialize before use
        localVar = 42;
        System.out.println("Local variable: " + localVar);

        // Or declare and initialize together
        int anotherVar = 100;
        System.out.println("Another variable: " + anotherVar);
    }

    public static void main(String[] args) {
        InitializationExample obj = new InitializationExample();
        obj.demonstrateInitialization();
    }
}
\`\`\`

---

## 🔄 Variable Reassignment

### **Changing Variable Values**
\`\`\`java
public class ReassignmentExample {
    public static void main(String[] args) {
        // Initial assignment
        String status = "pending";

        // Reassignment
        status = "processing";

        // More reassignments
        status = "completed";

        // Reassignment with expressions
        int counter = 0;
        counter = counter + 1;  // counter becomes 1
        counter += 5;           // counter becomes 6
        counter *= 2;           // counter becomes 12

        System.out.println("Status: " + status);
        System.out.println("Counter: " + counter);

        // Reassignment with method results
        String name = "John";
        name = name.toUpperCase();  // "JOHN"

        System.out.println("Name: " + name);
    }
}
\`\`\`

---

## 🎯 Variable Usage Best Practices

### **1. Declare Variables Close to Usage**
\`\`\`java
public class BestPractices {
    public static void main(String[] args) {
        // ✅ Good: Declare when needed
        System.out.println("Enter your age:");
        int age = getUserInput();

        if (age >= 18) {
            String message = "You are an adult";
            System.out.println(message);
        } else {
            String message = "You are a minor";
            System.out.println(message);
        }

        // ❌ Bad: Declare all at top
        // int age;
        // String message;
        // age = getUserInput();
        // message = "some value";
    }

    private static int getUserInput() {
        // Simulate user input
        return 25;
    }
}
\`\`\`

### **2. Use Meaningful Names**
\`\`\`java
public class MeaningfulNames {
    public static void main(String[] args) {
        // ✅ Good: Self-documenting code
        double principalAmount = 1000.0;
        double interestRate = 0.05;
        int investmentPeriodYears = 5;

        double finalAmount = calculateCompoundInterest(
            principalAmount,
            interestRate,
            investmentPeriodYears
        );

        // ❌ Bad: Unclear abbreviations
        // double p = 1000.0;
        // double r = 0.05;
        // int t = 5;
        // double a = calculateCI(p, r, t);

        System.out.println("Final amount: $" + finalAmount);
    }

    public static double calculateCompoundInterest(
            double principal,
            double rate,
            int years) {
        return principal * Math.pow(1 + rate, years);
    }
}
\`\`\`

### **3. Initialize Variables Appropriately**
\`\`\`java
public class ProperInitialization {
    public static void main(String[] args) {
        // ✅ Good: Initialize with meaningful defaults
        int count = 0;              // Counter starts at 0
        String result = "";         // Empty string, not null
        boolean found = false;      // Default to not found

        // Use the variables
        for (int i = 1; i <= 10; i++) {
            count += i;
            result += i + " ";
            if (i == 5) {
                found = true;
            }
        }

        System.out.println("Count: " + count);
        System.out.println("Result: " + result.trim());
        System.out.println("Found 5: " + found);
    }
}
\`\`\`

---

## 🎯 Summary

Variables are the foundation of Java programming:

### **Key Concepts**
- **Declaration**: Creating a variable with type and name
- **Initialization**: Giving a variable its first value
- **Assignment**: Changing a variable's value
- **Scope**: Where a variable can be accessed
- **Naming**: Rules and conventions for variable names

### **Variable Rules**
- Must be declared before use
- Must have a data type
- Must follow naming conventions
- Local variables must be initialized
- Case sensitive

### **Best Practices**
- Use descriptive, meaningful names
- Follow camelCase convention
- Declare variables close to usage
- Initialize with appropriate default values
- Keep variable scope as narrow as possible

Now that you understand variables, you're ready to explore **data types** - the different kinds of values variables can hold! 🚀

### **Quick Check**
Identify the variables and their characteristics in this code:
\`\`\`java
public class Quiz {
    private static final int MAX_USERS = 100;  // 1. What type of variable?

    public static void main(String[] args) {
        int userCount = 0;                      // 2. Scope?
        String status = "active";               // 3. Data type?

        for (int i = 0; i < 5; i++) {           // 4. Variable i scope?
            userCount += 10;
            String message = "Processing";      // 5. Variable scope?
        }

        // System.out.println(message);         // 6. Why error?
        System.out.println(userCount);          // 7. Accessible?
    }
}
\`\`\``
};
