import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: "2.5",
  title: 'String Validation',
  status: 'completed',
  content: `# 🚨 Exception Handling in Java

Exception handling is crucial for writing robust Java applications. It allows programs to gracefully handle runtime errors and unexpected situations.

---

## ⚠️ What are Exceptions?

### **What is an Exception?**
An exception is an event that occurs during program execution that disrupts the normal flow of instructions. Exceptions can be caused by:
- Invalid user input
- File not found
- Network errors
- Division by zero
- Array index out of bounds

\`\`\`java
public class ExceptionBasics {
    public static void main(String[] args) {
        // This will cause ArithmeticException
        // int result = 10 / 0;  // Division by zero

        // This will cause ArrayIndexOutOfBoundsException
        // int[] arr = {1, 2, 3};
        // System.out.println(arr[5]);  // Index 5 doesn't exist

        System.out.println("Program continues normally...");
    }
}
\`\`\`

### **Types of Exceptions**

#### **Checked Exceptions**
- Checked at compile time
- Must be handled or declared
- Examples: IOException, SQLException

#### **Unchecked Exceptions (Runtime Exceptions)**
- Not checked at compile time
- Usually programming errors
- Examples: NullPointerException, ArithmeticException

#### **Errors**
- Serious problems not meant to be caught
- Examples: OutOfMemoryError, StackOverflowError

---

## 🛡️ Try-Catch Blocks

### **Basic Try-Catch**
\`\`\`java
public class TryCatchBasic {
    public static void main(String[] args) {
        try {
            // Code that might throw an exception
            int result = 10 / 0;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            // Handle the exception
            System.out.println("Error: Cannot divide by zero!");
            System.out.println("Exception message: " + e.getMessage());
        }

        System.out.println("Program continues after exception handling...");
    }
}
\`\`\`

### **Multiple Catch Blocks**
\`\`\`java
public class MultipleCatch {
    public static void main(String[] args) {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[5]);  // ArrayIndexOutOfBoundsException

            String str = null;
            System.out.println(str.length());  // NullPointerException

            int result = 10 / 0;  // ArithmeticException

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array index error: " + e.getMessage());
        } catch (NullPointerException e) {
            System.out.println("Null pointer error: " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic error: " + e.getMessage());
        } catch (Exception e) {
            // Catch any other exception
            System.out.println("Unexpected error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Finally Block**
\`\`\`java
import java.io.FileReader;
import java.io.IOException;

public class FinallyBlock {
    public static void main(String[] args) {
        FileReader reader = null;

        try {
            reader = new FileReader("example.txt");
            // Read from file...

        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());

        } finally {
            // This block ALWAYS executes
            try {
                if (reader != null) {
                    reader.close();
                    System.out.println("File closed successfully");
                }
            } catch (IOException e) {
                System.out.println("Error closing file: " + e.getMessage());
            }
        }
    }
}
\`\`\`

---

## 🚀 Try-With-Resources (Java 7+)

### **Automatic Resource Management**
\`\`\`java
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class TryWithResources {
    public static void main(String[] args) {
        // Resources are automatically closed
        try (BufferedReader reader = new BufferedReader(new FileReader("example.txt"))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
        }
        // No need for finally block - resources are auto-closed
    }
}
\`\`\`

### **Multiple Resources**
\`\`\`java
import java.io.*;
import java.net.Socket;

public class MultipleResources {
    public static void main(String[] args) {
        try (
            FileReader fr = new FileReader("input.txt");
            BufferedReader br = new BufferedReader(fr);
            FileWriter fw = new FileWriter("output.txt");
            BufferedWriter bw = new BufferedWriter(fw)
        ) {
            String line;
            while ((line = br.readLine()) != null) {
                bw.write(line.toUpperCase());
                bw.newLine();
            }
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }
        // All resources are automatically closed
    }
}
\`\`\`

---

## 🛠️ Throwing Exceptions

### **Throw Keyword**
\`\`\`java
public class ThrowingExceptions {
    public static void validateAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        if (age > 150) {
            throw new IllegalArgumentException("Age cannot be greater than 150");
        }
        System.out.println("Age is valid: " + age);
    }

    public static void main(String[] args) {
        try {
            validateAge(-5);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }

        try {
            validateAge(25);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Creating Custom Exceptions**
\`\`\`java
// Custom exception class
class InvalidEmailException extends Exception {
    public InvalidEmailException(String message) {
        super(message);
    }
}

public class CustomExceptions {
    public static void validateEmail(String email) throws InvalidEmailException {
        if (email == null || email.isEmpty()) {
            throw new InvalidEmailException("Email cannot be null or empty");
        }
        if (!email.contains("@")) {
            throw new InvalidEmailException("Email must contain @ symbol");
        }
        if (!email.contains(".")) {
            throw new InvalidEmailException("Email must contain domain");
        }
    }

    public static void main(String[] args) {
        try {
            validateEmail("invalid-email");
        } catch (InvalidEmailException e) {
            System.out.println("Email validation failed: " + e.getMessage());
        }

        try {
            validateEmail("user@example.com");
            System.out.println("Email is valid!");
        } catch (InvalidEmailException e) {
            System.out.println("Email validation failed: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 📋 Method Signatures with Exceptions

### **Throws Declaration**
\`\`\`java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ThrowsDeclaration {
    // Method declares it might throw IOException
    public static String readFile(String filename) throws IOException {
        return new String(Files.readAllBytes(Paths.get(filename)));
    }

    public static void main(String[] args) {
        try {
            String content = readFile("example.txt");
            System.out.println("File content: " + content);
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
\`\`\`

### **Overriding Methods with Exceptions**
\`\`\`java
class Parent {
    // Parent method throws broad exception
    public void doSomething() throws Exception {
        System.out.println("Parent doing something");
    }
}

class Child extends Parent {
    // Child can throw same or narrower exceptions
    @Override
    public void doSomething() throws RuntimeException {
        System.out.println("Child doing something differently");
        // Cannot throw broader exception than parent
    }
}

public class ExceptionInheritance {
    public static void main(String[] args) {
        Parent obj = new Child();
        try {
            obj.doSomething();
        } catch (Exception e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🎯 Exception Handling Best Practices

### **1. Catch Specific Exceptions**
\`\`\`java
import java.io.IOException;
import java.sql.SQLException;

public class SpecificCatches {
    public static void processFileAndDatabase(String filename) {
        try {
            // File operations
            java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(filename));

            // Database operations (simulated)
            throw new SQLException("Database connection failed");

        } catch (IOException e) {
            System.out.println("File error: " + e.getMessage());
            // Handle file-specific errors

        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
            // Handle database-specific errors

        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
            // Catch-all for unexpected exceptions
        }
    }

    public static void main(String[] args) {
        processFileAndDatabase("nonexistent.txt");
    }
}
\`\`\`

### **2. Don't Catch Exception**
\`\`\`java
public class AvoidCatchingException {
    public static void riskyOperation() {
        try {
            // Some risky operation
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);  // ArrayIndexOutOfBoundsException

        } catch (Exception e) {  // ❌ Too broad
            System.out.println("Something went wrong");
            // This catches ALL exceptions, including programming errors
            // Makes debugging difficult
        }
    }

    public static void betterApproach() {
        try {
            int[] arr = {1, 2, 3};
            System.out.println(arr[10]);

        } catch (ArrayIndexOutOfBoundsException e) {  // ✅ Specific
            System.out.println("Array index error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        riskyOperation();
        betterApproach();
    }
}
\`\`\`

### **3. Use Finally for Cleanup**
\`\`\`java
public class ProperCleanup {
    public static void processData() {
        java.sql.Connection conn = null;
        java.sql.Statement stmt = null;

        try {
            // Database operations
            conn = java.sql.DriverManager.getConnection("jdbc:example");
            stmt = conn.createStatement();

            // Process data...

        } catch (java.sql.SQLException e) {
            System.out.println("Database error: " + e.getMessage());

        } finally {
            // Always cleanup resources
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (java.sql.SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {
        processData();
    }
}
\`\`\`

### **4. Exception Chaining**
\`\`\`java
public class ExceptionChaining {
    public static void highLevelOperation() throws CustomException {
        try {
            lowLevelOperation();
        } catch (IOException e) {
            // Chain the original exception
            throw new CustomException("High level operation failed", e);
        }
    }

    public static void lowLevelOperation() throws IOException {
        throw new IOException("Low level I/O error");
    }

    static class CustomException extends Exception {
        public CustomException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    public static void main(String[] args) {
        try {
            highLevelOperation();
        } catch (CustomException e) {
            System.out.println("Caught: " + e.getMessage());
            System.out.println("Caused by: " + e.getCause().getMessage());
        }
    }
}
\`\`\`

---

## ⚠️ Common Exception Handling Mistakes

### **1. Empty Catch Blocks**
\`\`\`java
public class EmptyCatch {
    public static void badPractice() {
        try {
            riskyOperation();
        } catch (Exception e) {
            // ❌ Empty catch - silently ignores errors
            // Makes debugging impossible
        }
    }

    public static void goodPractice() {
        try {
            riskyOperation();
        } catch (Exception e) {
            // ✅ Log the error at minimum
            System.err.println("Error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void riskyOperation() throws Exception {
        throw new Exception("Something went wrong!");
    }

    public static void main(String[] args) {
        badPractice();  // Silent failure
        goodPractice(); // Proper error handling
    }
}
\`\`\`

### **2. Catching Exceptions Too Early**
\`\`\`java
public class CatchTooEarly {
    public static void badApproach() {
        try {
            validateInput("invalid");
            processData();
        } catch (Exception e) {
            // ❌ Catches too early - loses context
            System.out.println("Something failed");
        }
    }

    public static void goodApproach() {
        try {
            validateInput("invalid");
        } catch (IllegalArgumentException e) {
            System.out.println("Input validation failed: " + e.getMessage());
        }

        try {
            processData();
        } catch (Exception e) {
            System.out.println("Data processing failed: " + e.getMessage());
        }
    }

    public static void validateInput(String input) {
        if (input.equals("invalid")) {
            throw new IllegalArgumentException("Invalid input provided");
        }
    }

    public static void processData() throws Exception {
        throw new Exception("Data processing error");
    }

    public static void main(String[] args) {
        badApproach();
        goodApproach();
    }
}
\`\`\`

### **3. Re-throwing Exceptions Incorrectly**
\`\`\`java
public class Rethrowing {
    public static void badRethrow() throws Exception {
        try {
            riskyOperation();
        } catch (Exception e) {
            // ❌ Loses original stack trace
            throw new Exception("Operation failed");
        }
    }

    public static void goodRethrow() throws Exception {
        try {
            riskyOperation();
        } catch (Exception e) {
            // ✅ Preserves original exception
            throw new Exception("Operation failed", e);
        }
    }

    public static void riskyOperation() throws Exception {
        throw new Exception("Original error");
    }

    public static void main(String[] args) {
        try {
            badRethrow();
        } catch (Exception e) {
            System.out.println("Bad rethrow: " + e.getMessage());
            System.out.println("Has cause: " + (e.getCause() != null));
        }

        try {
            goodRethrow();
        } catch (Exception e) {
            System.out.println("Good rethrow: " + e.getMessage());
            System.out.println("Has cause: " + (e.getCause() != null));
            System.out.println("Original error: " + e.getCause().getMessage());
        }
    }
}
\`\`\`

Exception handling is essential for robust Java applications. Use try-catch-finally blocks appropriately, throw meaningful exceptions, and always handle errors gracefully! 🚨`
};


