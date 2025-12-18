import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_1: SubLesson = {
  id: 11.1,
  title: 'Exception Handling Fundamentals',
  status: 'completed',
  content: `# 🚨 Exception Handling in Java

Exception handling is a critical mechanism in Java for dealing with runtime errors and unexpected situations. It allows programs to continue executing or fail gracefully when problems occur, rather than crashing unexpectedly.

---

## 🎯 What are Exceptions?

### **Understanding Exceptions**

An exception is an event that occurs during the execution of a program that disrupts the normal flow of instructions. Exceptions can be caused by various factors including:

- **User errors** (invalid input)
- **Programming errors** (bugs in code)
- **Resource issues** (file not found, network problems)
- **System failures** (hardware issues, out of memory)

### **Why Handle Exceptions?**

#### **1. Prevent Program Crashes**
Without exception handling, errors cause abrupt program termination.

#### **2. Provide User-Friendly Error Messages**
Instead of cryptic system errors, show meaningful messages.

#### **3. Enable Graceful Recovery**
Programs can recover from errors and continue execution.

#### **4. Improve Debugging**
Exception information helps identify and fix problems.

#### **5. Maintain Program Stability**
Isolate error handling from normal program logic.

---

## 📋 Exception Hierarchy

### **Throwable Class**

All exceptions in Java inherit from the \`Throwable\` class, which has two main subclasses:

\`\`\`java
public class ThrowableHierarchy {
    /*
     * Throwable (base class for all throwables)
     * ├── Exception (checked exceptions - must be handled)
     * │   ├── IOException (I/O related)
     * │   ├── SQLException (database related)
     * │   └── RuntimeException (unchecked exceptions)
     * │       ├── NullPointerException
     * │       ├── IllegalArgumentException
     * │       ├── IndexOutOfBoundsException
     * │       └── ArithmeticException
     * └── Error (serious system problems - usually not caught)
     *     ├── OutOfMemoryError
     *     ├── StackOverflowError
     *     └── VirtualMachineError
     */
}
\`\`\`

### **Checked vs Unchecked Exceptions**

#### **Checked Exceptions**
- **Must be handled** by the programmer
- **Compile-time checking** enforced
- **Examples**: \`IOException\`, \`SQLException\`, \`ClassNotFoundException\`

\`\`\`java
import java.io.FileReader;
import java.io.IOException;

public class CheckedExceptionExample {
    public static void main(String[] args) {
        // ❌ Compilation error: unreported exception
        // FileReader reader = new FileReader("file.txt");

        // ✅ Must handle checked exception
        try {
            FileReader reader = new FileReader("file.txt");
            // Use reader...
        } catch (IOException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}
\`\`\`

#### **Unchecked Exceptions**
- **Runtime exceptions** and their subclasses
- **Not checked at compile-time**
- **Examples**: \`NullPointerException\`, \`ArithmeticException\`, \`IndexOutOfBoundsException\`

\`\`\`java
public class UncheckedExceptionExample {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};

        // ❌ Runtime error: ArrayIndexOutOfBoundsException
        // System.out.println(numbers[10]);

        // ✅ Handle if needed
        try {
            System.out.println(numbers[10]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index out of bounds: " + e.getMessage());
        }
    }
}
\`\`\`

#### **Errors**
- **Serious problems** that applications shouldn't try to handle
- **Usually indicate** system-level issues
- **Examples**: \`OutOfMemoryError\`, \`StackOverflowError\`

---

## 🛡️ Try-Catch Blocks

### **Basic Try-Catch Syntax**

\`\`\`java
try {
    // Code that might throw an exception
    riskyOperation();
} catch (ExceptionType e) {
    // Code to handle the exception
    handleException(e);
}
\`\`\`

### **Complete Try-Catch Example**

\`\`\`java
public class TryCatchExample {
    public static void main(String[] args) {
        try {
            // Code that might fail
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            // Handle the specific exception
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception message: " + e.getMessage());
        } catch (Exception e) {
            // Handle any other exception
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            // Always executed (optional)
            System.out.println("Finally block executed");
        }
    }

    public static int divide(int a, int b) {
        return a / b; // Throws ArithmeticException if b == 0
    }
}
\`\`\`

### **Multiple Catch Blocks**

\`\`\`java
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.IOException;

public class MultipleCatchBlocks {
    public static void main(String[] args) {
        try {
            FileReader reader = new FileReader("data.txt");
            // Process file...
            reader.close();
        } catch (FileNotFoundException e) {
            // Handle file not found specifically
            System.out.println("File not found: " + e.getMessage());
            System.out.println("Please check the file path.");
        } catch (IOException e) {
            // Handle other I/O errors
            System.out.println("I/O error: " + e.getMessage());
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            System.out.println("Unexpected error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Nested Try-Catch Blocks**

\`\`\`java
public class NestedTryCatch {
    public static void main(String[] args) {
        try {
            // Outer try block
            System.out.println("Outer try block");

            try {
                // Inner try block
                int[] numbers = {1, 2, 3};
                System.out.println("Accessing array element: " + numbers[5]);
            } catch (ArrayIndexOutOfBoundsException e) {
                // Inner catch block
                System.out.println("Inner catch: " + e.getMessage());
            }

            // This will cause an exception
            int result = 10 / 0;

        } catch (ArithmeticException e) {
            // Outer catch block
            System.out.println("Outer catch: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🎯 The Finally Block

### **Purpose of Finally**

The \`finally\` block always executes, regardless of whether an exception occurs or not. It's typically used for cleanup operations.

\`\`\`java
import java.io.FileReader;
import java.io.IOException;

public class FinallyBlockExample {
    public static void main(String[] args) {
        FileReader reader = null;

        try {
            reader = new FileReader("example.txt");
            // Process file...
            System.out.println("File processing completed");

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());

        } finally {
            // Always executed - cleanup resources
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("File closed successfully");
                } catch (IOException e) {
                    System.out.println("Error closing file: " + e.getMessage());
                }
            }
            System.out.println("Finally block always executes");
        }
    }
}
\`\`\`

### **Finally with Return Statements**

\`\`\`java
public class FinallyWithReturn {
    public static int testFinally() {
        try {
            System.out.println("In try block");
            return 1;  // Try to return 1
        } catch (Exception e) {
            System.out.println("In catch block");
            return 2;  // Try to return 2
        } finally {
            System.out.println("In finally block");
            // return 3;  // This would override the try/catch returns
        }
    }

    public static void main(String[] args) {
        int result = testFinally();
        System.out.println("Method returned: " + result);
    }
}
\`\`\`

---

## 🚀 Throwing Exceptions

### **The throw Keyword**

Use \`throw\` to explicitly throw an exception.

\`\`\`java
public class ThrowingExceptions {
    public static void validateAge(int age) {
        if (age < 0) {
            // Throw checked exception
            throw new IllegalArgumentException("Age cannot be negative");
        }

        if (age > 150) {
            // Throw unchecked exception
            throw new RuntimeException("Age seems unrealistic");
        }

        System.out.println("Age is valid: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        try {
            validateAge(200);
        } catch (RuntimeException e) {
            System.out.println("Caught: " + e.getMessage());
        }
    }
}
\`\`\`

### **Creating Custom Exceptions**

\`\`\`\`java
// Custom exception class
public class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(double amount) {
        super("Insufficient funds. Required: $" + amount);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

// Using custom exception
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount);
        }
        balance -= amount;
        System.out.println("Withdrew: $" + amount + ", Balance: $" + balance);
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(100.0);

        try {
            account.withdraw(150.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
            System.out.println("Required amount: $" + e.getAmount());
        }
    }
}
\`\`\`\`

---

## 📝 The throws Keyword

### **Method Declaration with throws**

Use \`throws\` to declare that a method might throw exceptions.

\`\`\`java
import java.io.IOException;

public class ThrowsKeywordExample {
    // Method declares it might throw IOException
    public static void readFile() throws IOException {
        // Code that might throw IOException
        throw new IOException("File not found");
    }

    // Method declares multiple exceptions
    public static void complexOperation() throws IOException, InterruptedException {
        // Simulate some operations
        Thread.sleep(1000);  // Might throw InterruptedException

        if (Math.random() > 0.5) {
            throw new IOException("I/O operation failed");
        }
    }

    public static void main(String[] args) {
        try {
            readFile();
        } catch (IOException e) {
            System.out.println("Handled IOException: " + e.getMessage());
        }

        try {
            complexOperation();
        } catch (IOException | InterruptedException e) {
            System.out.println("Handled exception: " + e.getMessage());
        }
    }
}
\`\`\`

### **Checked vs Unchecked Exceptions with throws**

\`\`\`java
public class ThrowsDeclarations {
    // Checked exception - must be declared or handled
    public static void methodWithCheckedException() throws IOException {
        throw new IOException("Checked exception");
    }

    // Unchecked exception - optional to declare
    public static void methodWithUncheckedException() throws RuntimeException {
        throw new RuntimeException("Unchecked exception");
    }

    // Can declare unchecked exceptions but not required
    public static void methodWithUncheckedException2() {
        throw new RuntimeException("Unchecked exception - no throws needed");
    }

    public static void main(String[] args) {
        try {
            methodWithCheckedException();
        } catch (IOException e) {
            System.out.println("Checked exception caught: " + e.getMessage());
        }

        try {
            methodWithUncheckedException();
        } catch (RuntimeException e) {
            System.out.println("Unchecked exception caught: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🎯 Exception Handling Best Practices

### **1. Catch Specific Exceptions**

\`\`\`java
public class SpecificExceptionHandling {
    public static void main(String[] args) {
        try {
            // Code that might throw multiple types of exceptions
            processData();
        } catch (FileNotFoundException e) {
            // Handle file not found specifically
            System.out.println("File not found. Please check the path.");
            // Maybe prompt user for correct path
        } catch (IOException e) {
            // Handle other I/O errors
            System.out.println("I/O error occurred. Please try again.");
            // Maybe retry the operation
        } catch (NumberFormatException e) {
            // Handle data format errors
            System.out.println("Invalid number format in data.");
            // Maybe validate input data
        } catch (Exception e) {
            // Catch-all for unexpected exceptions
            System.out.println("Unexpected error: " + e.getMessage());
            // Log the error for debugging
        }
    }

    private static void processData() throws FileNotFoundException, IOException {
        // Simulate different types of exceptions
        double random = Math.random();
        if (random < 0.3) {
            throw new FileNotFoundException("data.txt");
        } else if (random < 0.6) {
            throw new IOException("Network error");
        } else if (random < 0.9) {
            throw new NumberFormatException("Invalid number");
        } else {
            throw new RuntimeException("Unknown error");
        }
    }
}
\`\`\`

### **2. Use Finally for Resource Cleanup**

\`\`\`java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class ResourceCleanup {
    public static void main(String[] args) {
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader("data.txt"));
            String line;

            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());

        } finally {
            // Always close resources in finally block
            if (reader != null) {
                try {
                    reader.close();
                    System.out.println("File closed successfully");
                } catch (IOException e) {
                    System.out.println("Error closing file: " + e.getMessage());
                }
            }
        }
    }
}
\`\`\`

### **3. Try-With-Resources (Java 7+)**

A cleaner way to handle resources that implement AutoCloseable.

\`\`\`java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TryWithResources {
    public static void main(String[] args) {
        // Resources are automatically closed
        try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            System.out.println("File processed successfully");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());

        }
        // No need for finally block - resources automatically closed
    }
}
\`\`\`

### **4. Don't Catch Generic Exceptions Unnecessarily**

\`\`\`java
public class AvoidGenericCatches {
    public static void main(String[] args) {
        // ✅ Specific exception handling
        try {
            int result = divide(10, 0);
        } catch (ArithmeticException e) {
            System.out.println("Division by zero: " + e.getMessage());
        }

        // ❌ Avoid catching Exception unless necessary
        try {
            riskyOperation();
        } catch (Exception e) {
            // This catches everything including RuntimeException, Error, etc.
            // Makes debugging difficult
            System.out.println("Something went wrong: " + e.getMessage());
        }
    }

    private static int divide(int a, int b) {
        return a / b;
    }

    private static void riskyOperation() throws IOException {
        // Some operation that throws checked exception
    }
}
\`\`\`

### **5. Preserve Stack Trace Information**

\`\`\`java
public class PreserveStackTrace {
    public static void method1() throws Exception {
        try {
            method2();
        } catch (Exception e) {
            // ✅ Preserve original stack trace
            throw e;
        }
    }

    public static void method2() throws Exception {
        throw new Exception("Original error in method2");
    }

    public static void main(String[] args) {
        try {
            method1();
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
            System.out.println("Stack trace:");
            e.printStackTrace();
        }
    }
}
\`\`\`

---

## 🎯 Practical Exception Handling Examples

### **File Processing with Error Handling**

\`\`\`java
import java.io.*;
import java.util.Scanner;

public class FileProcessor {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            try {
                System.out.print("Enter file path to read: ");
                String filePath = scanner.nextLine();

                // Process the file
                processFile(filePath);
                break; // Success - exit loop

            } catch (FileNotFoundException e) {
                System.out.println("File not found: " + e.getMessage());
                System.out.println("Please check the file path and try again.");

            } catch (IOException e) {
                System.out.println("Error reading file: " + e.getMessage());
                System.out.println("Please try again.");

            } catch (Exception e) {
                System.out.println("Unexpected error: " + e.getMessage());
                break; // Serious error - exit
            }
        }

        scanner.close();
    }

    private static void processFile(String filePath) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            int lineCount = 0;

            while ((line = reader.readLine()) != null) {
                lineCount++;
                System.out.println("Line " + lineCount + ": " + line);
            }

            System.out.println("File processed successfully. Lines read: " + lineCount);
        }
    }
}
\`\`\`

### **Calculator with Error Handling**

\`\`\`java
import java.util.Scanner;

public class CalculatorWithErrorHandling {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            try {
                System.out.print("Enter first number: ");
                double num1 = Double.parseDouble(scanner.nextLine());

                System.out.print("Enter operation (+, -, *, /): ");
                String operation = scanner.nextLine();

                System.out.print("Enter second number: ");
                double num2 = Double.parseDouble(scanner.nextLine());

                double result = calculate(num1, num2, operation);
                System.out.println("Result: " + result);

                System.out.print("Continue? (y/n): ");
                if (!scanner.nextLine().equalsIgnoreCase("y")) {
                    break;
                }

            } catch (NumberFormatException e) {
                System.out.println("Invalid number format. Please enter valid numbers.");

            } catch (ArithmeticException e) {
                System.out.println("Arithmetic error: " + e.getMessage());

            } catch (IllegalArgumentException e) {
                System.out.println("Invalid operation: " + e.getMessage());

            } catch (Exception e) {
                System.out.println("Unexpected error: " + e.getMessage());
                break;
            }
        }

        scanner.close();
    }

    private static double calculate(double a, double b, String operation) {
        switch (operation) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                if (b == 0) {
                    throw new ArithmeticException("Division by zero");
                }
                return a / b;
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }
    }
}
\`\`\`

---

## 🎯 Summary

Exception handling is essential for robust Java applications:

### **Key Concepts**
- **Exceptions**: Runtime errors that disrupt normal program flow
- **Throwable hierarchy**: Exception and Error classes
- **Checked vs Unchecked**: Compile-time vs runtime exception checking
- **Try-catch-finally**: Basic exception handling structure

### **Exception Types**
- **Checked exceptions**: Must be handled (IOException, SQLException)
- **Unchecked exceptions**: Runtime exceptions (NullPointerException, ArithmeticException)
- **Errors**: Serious system problems (OutOfMemoryError, StackOverflowError)

### **Handling Mechanisms**
- **try block**: Code that might throw exceptions
- **catch block**: Exception handling code
- **finally block**: Cleanup code (always executes)
- **throw keyword**: Explicitly throw exceptions
- **throws keyword**: Declare method exceptions

### **Best Practices**
- Catch specific exceptions, not generic Exception
- Use finally for resource cleanup
- Try-with-resources for automatic resource management
- Preserve stack trace information
- Provide meaningful error messages
- Don't suppress exceptions unnecessarily

### **Modern Java Features**
- **Try-with-resources** (Java 7): Automatic resource management
- **Multi-catch** (Java 7): Handle multiple exceptions in one catch
- **Improved exception messages** in newer Java versions

Master exception handling, and your Java programs will be more robust, user-friendly, and maintainable!

### **Quick Check**
What will happen with this code?
\`\`\`java
public static void test() {
    try {
        System.out.println("In try");
        throw new RuntimeException("Test");
    } catch (RuntimeException e) {
        System.out.println("In catch");
        return;
    } finally {
        System.out.println("In finally");
    }
    System.out.println("After finally");  // Executed?
}
\`\`\`
Output order: try → catch → finally (After finally not printed)
`
};
