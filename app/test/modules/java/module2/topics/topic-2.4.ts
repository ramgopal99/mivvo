import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: 2.4,
  title: 'Loops',
  status: 'completed',
  content: `# 🔧 Methods in Java

Methods are fundamental building blocks in Java. They allow you to organize code into reusable, modular units that perform specific tasks.

---

## 🏗️ Method Basics

### **What is a Method?**
A method is a block of code that performs a specific task and can be called multiple times from different parts of your program.

\`\`\`java
public class MethodBasics {
    // Method declaration
    public static void greet() {
        System.out.println("Hello, World!");
    }

    public static void main(String[] args) {
        // Method call
        greet();        // Output: Hello, World!
        greet();        // Output: Hello, World! (can be called multiple times)
    }
}
\`\`\`

### **Method Components**
1. **Access Modifier**: public, private, protected
2. **Return Type**: The type of value the method returns (void for no return)
3. **Method Name**: Identifier following Java naming conventions
4. **Parameters**: Input values (optional)
5. **Method Body**: Code that executes when method is called

---

## 📝 Method Parameters and Arguments

### **Parameters vs Arguments**
- **Parameters**: Variables declared in method signature
- **Arguments**: Values passed when calling the method

\`\`\`java
public class ParametersDemo {
    // Method with parameters
    public static void displayMessage(String message, int count) {
        for (int i = 0; i < count; i++) {
            System.out.println(message);
        }
    }

    // Method with no parameters
    public static void showWelcome() {
        System.out.println("Welcome to Java!");
    }

    public static void main(String[] args) {
        // Calling methods with arguments
        displayMessage("Hello", 3);    // Output: Hello (3 times)
        displayMessage("Java", 2);     // Output: Java (2 times)

        showWelcome();                  // Output: Welcome to Java!
    }
}
\`\`\`

### **Parameter Passing**
Java uses **pass-by-value** for primitive types and **pass-by-reference** for objects.

\`\`\`java
public class ParameterPassing {
    public static void modifyPrimitive(int num) {
        num = 100;  // This change doesn't affect the original variable
    }

    public static void modifyObject(java.util.List<String> list) {
        list.add("New Item");  // This change affects the original list
    }

    public static void main(String[] args) {
        int number = 50;
        modifyPrimitive(number);
        System.out.println("Number after method call: " + number);  // Still 50

        java.util.List<String> myList = new java.util.ArrayList<>();
        myList.add("Original");
        modifyObject(myList);
        System.out.println("List after method call: " + myList);  // Contains both items
    }
}
\`\`\`

---

## 🔄 Method Overloading

### **What is Method Overloading?**
Method overloading allows multiple methods with the same name but different parameter lists.

\`\`\`java
public class MethodOverloading {
    // Overloaded methods with different parameter types
    public static int add(int a, int b) {
        return a + b;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static String add(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println("2 + 3 = " + add(2, 3));                    // 5
        System.out.println("2.5 + 3.7 = " + add(2.5, 3.7));            // 6.2
        System.out.println("1 + 2 + 3 = " + add(1, 2, 3));             // 6
        System.out.println("Hello + World = " + add("Hello ", "World")); // Hello World
    }
}
\`\`\`

### **Rules for Method Overloading**
- Same method name
- Different parameter lists (type, number, or order)
- Return type can be different, but not sufficient alone
- Can have different access modifiers

---

## 📤 Return Values

### **Methods with Return Values**
\`\`\`java
public class ReturnValues {
    // Method returning int
    public static int calculateSquare(int num) {
        return num * num;
    }

    // Method returning String
    public static String getGreeting(String name) {
        return "Hello, " + name + "!";
    }

    // Method returning boolean
    public static boolean isEven(int num) {
        return num % 2 == 0;
    }

    // Method returning array
    public static int[] getNumbers() {
        return new int[]{1, 2, 3, 4, 5};
    }

    public static void main(String[] args) {
        int square = calculateSquare(5);
        System.out.println("Square of 5: " + square);

        String greeting = getGreeting("Alice");
        System.out.println(greeting);

        boolean even = isEven(4);
        System.out.println("4 is even: " + even);

        int[] numbers = getNumbers();
        System.out.println("First number: " + numbers[0]);
    }
}
\`\`\`

### **Void Methods**
\`\`\`java
public class VoidMethods {
    public static void printHeader(String title) {
        System.out.println("==========");
        System.out.println(title.toUpperCase());
        System.out.println("==========");
    }

    public static void printNumbers(int start, int end) {
        for (int i = start; i <= end; i++) {
            System.out.print(i + " ");
        }
        System.out.println(); // Just for newline, no return value
    }

    public static void main(String[] args) {
        printHeader("Number Sequence");
        printNumbers(1, 5);
    }
}
\`\`\`

---

## 🔄 Recursion

### **What is Recursion?**
Recursion is when a method calls itself to solve a problem by breaking it down into smaller, similar subproblems.

\`\`\`java
public class RecursionDemo {
    // Factorial using recursion
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;  // Base case
        }
        return n * factorial(n - 1);  // Recursive call
    }

    // Fibonacci sequence using recursion
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;  // Base case
        }
        return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive calls
    }

    // Sum of array using recursion
    public static int sumArray(int[] arr, int index) {
        if (index >= arr.length) {
            return 0;  // Base case
        }
        return arr[index] + sumArray(arr, index + 1);  // Recursive call
    }

    public static void main(String[] args) {
        System.out.println("Factorial of 5: " + factorial(5));     // 120
        System.out.println("Fibonacci of 6: " + fibonacci(6));     // 8
        System.out.println("Fibonacci of 7: " + fibonacci(7));     // 13

        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Sum of array: " + sumArray(numbers, 0)); // 15
    }
}
\`\`\`

### **Recursion vs Iteration**
\`\`\`java
public class RecursionVsIteration {
    // Recursive factorial
    public static int factorialRecursive(int n) {
        if (n <= 1) return 1;
        return n * factorialRecursive(n - 1);
    }

    // Iterative factorial
    public static int factorialIterative(int n) {
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        int n = 5;

        // Both give same result
        System.out.println("Recursive: " + factorialRecursive(n));  // 120
        System.out.println("Iterative: " + factorialIterative(n));  // 120

        // Recursive uses more memory (call stack)
        // Iterative is usually more efficient
    }
}
\`\`\`

---

## 🎯 Variable Scope

### **Local Variables**
\`\`\`java
public class VariableScope {
    public static void method1() {
        int localVar = 10;  // Local to method1
        System.out.println("method1 localVar: " + localVar);
    }

    public static void method2() {
        // localVar from method1 is not accessible here
        // System.out.println(localVar);  // Compilation error

        int localVar = 20;  // Different variable with same name
        System.out.println("method2 localVar: " + localVar);
    }

    public static void main(String[] args) {
        method1();
        method2();
    }
}
\`\`\`

### **Block Scope**
\`\`\`java
public class BlockScope {
    public static void main(String[] args) {
        int outerVar = 10;

        if (outerVar > 5) {
            int innerVar = 20;  // Block scope
            System.out.println("Inner: " + innerVar);
            System.out.println("Outer: " + outerVar);
        }

        // innerVar is not accessible here
        // System.out.println(innerVar);  // Compilation error

        System.out.println("Outer after block: " + outerVar);
    }
}
\`\`\`

---

## 🛠️ Method Best Practices

### **1. Single Responsibility Principle**
Each method should do one thing and do it well.

\`\`\`java
public class BestPractices {
    // ✅ Good: Single responsibility
    public static boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }

    public static void sendWelcomeEmail(String email) {
        if (isValidEmail(email)) {
            // Send email logic
            System.out.println("Welcome email sent to: " + email);
        }
    }

    // ❌ Bad: Multiple responsibilities
    public static void processUserData(String email, String name) {
        // Validation
        if (!email.contains("@")) {
            System.out.println("Invalid email");
            return;
        }

        // Formatting
        String formattedName = name.toUpperCase();

        // Database operation
        System.out.println("Saving user: " + formattedName + " with email: " + email);

        // Email sending
        System.out.println("Sending welcome email to: " + email);
    }

    public static void main(String[] args) {
        sendWelcomeEmail("user@example.com");
    }
}
\`\`\`

### **2. Meaningful Method Names**
\`\`\`java
public class MethodNaming {
    // ✅ Good names
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static boolean isPasswordStrong(String password) {
        return password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\d.*");
    }

    // ❌ Bad names
    public static double calc(double r) {  // Too vague
        return Math.PI * r * r;
    }

    public static boolean check(String p) {  // Unclear what it checks
        return p.length() >= 8;
    }

    public static void main(String[] args) {
        double area = calculateCircleArea(5.0);
        boolean strong = isPasswordStrong("MyPass123");

        System.out.println("Area: " + area);
        System.out.println("Password strong: " + strong);
    }
}
\`\`\`

### **3. Proper Documentation**
\`\`\`java
/**
 * Calculates the factorial of a non-negative integer.
 * @param n the number to calculate factorial for (must be >= 0)
 * @return the factorial of n
 * @throws IllegalArgumentException if n is negative
 */
public static long factorial(int n) {
    if (n < 0) {
        throw new IllegalArgumentException("Number must be non-negative");
    }

    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\`

---

## ⚠️ Common Method Mistakes

### **1. Missing Return Statement**
\`\`\`java
public class CommonMistakes {
    // ❌ Error: Not all code paths return a value
    public static int getMax(int a, int b) {
        if (a > b) {
            return a;
        }
        // Missing return statement for b >= a case
    }

    // ✅ Fixed
    public static int getMaxFixed(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
        // Or: return (a > b) ? a : b;
    }

    // ❌ Error: Dead code after return
    public static void deadCode() {
        System.out.println("This executes");
        return;
        System.out.println("This never executes");  // Unreachable code
    }

    public static void main(String[] args) {
        System.out.println("Max of 5, 3: " + getMaxFixed(5, 3));
    }
}
\`\`\`

### **2. Infinite Recursion**
\`\`\`java
public class InfiniteRecursion {
    // ❌ Infinite recursion - no base case
    public static int badFactorial(int n) {
        return n * badFactorial(n - 1);  // Will cause StackOverflowError
    }

    // ✅ Proper recursion with base case
    public static int goodFactorial(int n) {
        if (n <= 1) {
            return 1;  // Base case stops recursion
        }
        return n * goodFactorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("Good factorial: " + goodFactorial(5));
        // System.out.println(badFactorial(5));  // Would crash
    }
}
\`\`\`

Methods are the building blocks of Java programs. Master method creation, calling, and best practices to write clean, maintainable code! 🔧`
};
