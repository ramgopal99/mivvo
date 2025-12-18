import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_2: SubLesson = {
  id: 5.2,
  title: 'Defining Methods',
  status: 'completed',
  content: `# 📝 Defining Methods in Java

Defining methods properly is crucial for creating well-structured, maintainable Java code. This involves understanding method signatures, access modifiers, return types, and following Java's syntax rules and best practices.

---

## 📋 Method Declaration Syntax

### **Complete Method Declaration**
\`\`\`java
public class MethodDeclaration {
    // Complete method declaration syntax:
    // [access modifier] [static] [final] [return type] methodName([parameters]) [throws exceptions] {
    //     method body
    // }

    // Example of a complete method declaration
    public static final void processUserData(String name, int age, boolean isActive) throws IllegalArgumentException {
        // Method body
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be null or empty");
        }

        System.out.println("Processing user: " + name + ", Age: " + age + ", Active: " + isActive);
    }

    public static void main(String[] args) {
        try {
            processUserData("Alice", 25, true);
            processUserData("", 30, false);  // This will throw exception
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Method Signature Components**
\`\`\`java
public class MethodSignature {
    // 1. Access Modifiers
    public void publicMethod() { }      // Accessible from anywhere
    private void privateMethod() { }    // Accessible only within the class
    protected void protectedMethod() { } // Accessible within package and subclasses
    void packagePrivateMethod() { }     // Accessible within the package (default)

    // 2. Static Modifier
    public static void staticMethod() {
        System.out.println("Static method - no object needed");
    }

    public void instanceMethod() {
        System.out.println("Instance method - requires object");
    }

    // 3. Final Modifier
    public final void finalMethod() {
        System.out.println("Final method - cannot be overridden");
    }

    // 4. Return Type
    public void voidMethod() { }                    // No return value
    public int intMethod() { return 42; }          // Returns int
    public String stringMethod() { return "Hello"; } // Returns String
    public double[] arrayMethod() { return new double[5]; } // Returns array

    public static void main(String[] args) {
        MethodSignature obj = new MethodSignature();

        staticMethod();           // Call static method
        obj.instanceMethod();     // Call instance method
        obj.finalMethod();        // Call final method

        int result = obj.intMethod();
        String message = obj.stringMethod();
        System.out.println("Result: " + result + ", Message: " + message);
    }
}
\`\`\`

---

## 🔧 Method Parameters

### **Parameter Types and Usage**
\`\`\`java
public class MethodParameters {
    // No parameters
    public void noParams() {
        System.out.println("No parameters needed");
    }

    // Single parameter
    public void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Multiple parameters
    public void displayInfo(String name, int age, double salary) {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: $" + salary);
    }

    // Array parameters
    public void processNumbers(int[] numbers) {
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    // Varargs (variable arguments)
    public void printItems(String... items) {
        for (String item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MethodParameters obj = new MethodParameters();

        obj.noParams();
        obj.greet("Alice");
        obj.displayInfo("Bob", 25, 50000.0);
        obj.processNumbers(new int[]{1, 2, 3, 4, 5});
        obj.printItems("Apple", "Banana", "Orange");
        obj.printItems("Single Item");
    }
}
\`\`\`

### **Parameter Passing Mechanisms**
\`\`\`java
public class ParameterPassing {
    public static void main(String[] args) {
        ParameterPassing obj = new ParameterPassing();

        // Primitive types - pass by value
        int number = 10;
        obj.modifyPrimitive(number);
        System.out.println("After modifyPrimitive: " + number);  // Still 10

        // Objects - pass by reference (but reference is passed by value)
        StringBuilder sb = new StringBuilder("Hello");
        obj.modifyObject(sb);
        System.out.println("After modifyObject: " + sb);  // "Hello World"

        // Arrays - also pass by reference
        int[] array = {1, 2, 3};
        obj.modifyArray(array);
        System.out.println("After modifyArray: " + java.util.Arrays.toString(array));  // [10, 2, 3]
    }

    public void modifyPrimitive(int num) {
        num = 20;  // This change doesn't affect the original
    }

    public void modifyObject(StringBuilder sb) {
        sb.append(" World");  // This change affects the original object
    }

    public void modifyArray(int[] arr) {
        arr[0] = 10;  // This change affects the original array
    }
}
\`\`\`

---

## 🔄 Method Body and Return Statements

### **Method Body Structure**
\`\`\`java
public class MethodBody {
    // Method with void return type
    public void processData() {
        // Method body can contain:
        // - Variable declarations
        int localVar = 10;

        // - Control flow statements
        if (localVar > 5) {
            System.out.println("Value is greater than 5");
        }

        // - Loops
        for (int i = 0; i < 3; i++) {
            System.out.println("Iteration: " + i);
        }

        // - Method calls
        helperMethod();

        // No return statement needed for void methods
    }

    // Helper method
    private void helperMethod() {
        System.out.println("Helper method called");
    }

    // Method with return value
    public int calculateSum(int a, int b) {
        int sum = a + b;
        return sum;  // Return statement with value

        // Code after return is unreachable
        // System.out.println("This line never executes");
    }

    // Method with early return
    public boolean isPositive(int number) {
        if (number > 0) {
            return true;   // Early return
        } else if (number < 0) {
            return false;  // Another early return
        } else {
            return false;  // Final return
        }
    }

    public static void main(String[] args) {
        MethodBody obj = new MethodBody();
        obj.processData();

        int sum = obj.calculateSum(5, 10);
        System.out.println("Sum: " + sum);

        System.out.println("Is 5 positive? " + obj.isPositive(5));
        System.out.println("Is -3 positive? " + obj.isPositive(-3));
        System.out.println("Is 0 positive? " + obj.isPositive(0));
    }
}
\`\`\`

### **Return Statement Rules**
\`\`\`java
public class ReturnStatements {
    // ✅ Correct: void method with no return
    public void method1() {
        System.out.println("No return needed");
    }

    // ✅ Correct: non-void method with return
    public int method2() {
        return 42;
    }

    // ✅ Correct: multiple return paths
    public String method3(boolean condition) {
        if (condition) {
            return "True case";
        } else {
            return "False case";
        }
    }

    // ✅ Correct: return in try-catch
    public int method4() {
        try {
            return 1;
        } catch (Exception e) {
            return 0;  // Must have return in catch if method returns int
        }
    }

    // ❌ Incorrect: unreachable code
    // public int badMethod() {
    //     return 1;
    //     System.out.println("This is unreachable");  // Compile error
    // }

    // ❌ Incorrect: missing return
    // public int anotherBadMethod() {
    //     if (true) {
    //         return 1;
    //     }
    //     // Missing return statement - compile error
    // }

    public static void main(String[] args) {
        ReturnStatements obj = new ReturnStatements();
        System.out.println("Method3 result: " + obj.method3(true));
        System.out.println("Method4 result: " + obj.method4());
    }
}
\`\`\`

---

## 🎯 Method Definition Best Practices

### **Method Length and Complexity**
\`\`\`java
public class MethodBestPractices {
    // ✅ Good: Short, focused method
    public boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return email.contains("@") && email.contains(".");
    }

    // ❌ Bad: Too long and does multiple things
    // public void processUserRegistration(String name, String email, String password) {
    //     // Validation logic (should be separate method)
    //     if (name == null) throw new IllegalArgumentException("Name required");
    //     if (email == null) throw new IllegalArgumentException("Email required");
    //     if (password == null) throw new IllegalArgumentException("Password required");
    //
    //     // Database logic (should be separate method)
    //     // ... 50 lines of database code ...
    //
    //     // Email logic (should be separate method)
    //     // ... 30 lines of email code ...
    //
    //     // Logging logic (should be separate method)
    //     // ... 20 lines of logging code ...
    // }

    // ✅ Better: Break into smaller, focused methods
    public void processUserRegistration(String name, String email, String password) {
        validateRegistrationData(name, email, password);
        User newUser = saveUserToDatabase(name, email, password);
        sendWelcomeEmail(newUser);
        logRegistration(newUser);
    }

    private void validateRegistrationData(String name, String email, String password) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email format");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
    }

    private User saveUserToDatabase(String name, String email, String password) {
        // Database logic here
        System.out.println("Saving user to database: " + name);
        return new User(name, email);
    }

    private void sendWelcomeEmail(User user) {
        System.out.println("Sending welcome email to: " + user.email);
    }

    private void logRegistration(User user) {
        System.out.println("User registered: " + user.name + " at " + java.time.LocalDateTime.now());
    }

    static class User {
        String name;
        String email;

        User(String name, String email) {
            this.name = name;
            this.email = email;
        }
    }

    public static void main(String[] args) {
        MethodBestPractices obj = new MethodBestPractices();
        try {
            obj.processUserRegistration("Alice", "alice@example.com", "password123");
        } catch (IllegalArgumentException e) {
            System.out.println("Registration failed: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 📚 Advanced Method Definition Patterns

### **Method Overriding Preparation**
\`\`\`java
public class MethodOverridingPrep {
    // Methods that can be overridden must not be private or final
    public void overridableMethod() {
        System.out.println("Base implementation");
    }

    // Final methods cannot be overridden
    public final void finalMethod() {
        System.out.println("This cannot be overridden");
    }

    // Private methods cannot be overridden (they're not inherited)
    private void privateMethod() {
        System.out.println("This cannot be overridden");
    }

    // Static methods can be hidden but not overridden
    public static void staticMethod() {
        System.out.println("Static method in base class");
    }
}

// Example subclass
class SubClass extends MethodOverridingPrep {
    @Override
    public void overridableMethod() {
        System.out.println("Overridden implementation");
    }

    // This would be a compile error:
    // @Override
    // public final void finalMethod() { }  // Cannot override final method

    // Static method hiding (not overriding)
    public static void staticMethod() {
        System.out.println("Static method in subclass");
    }
}

public class OverrideDemo {
    public static void main(String[] args) {
        MethodOverridingPrep base = new MethodOverridingPrep();
        SubClass sub = new SubClass();

        base.overridableMethod();  // "Base implementation"
        sub.overridableMethod();   // "Overridden implementation"

        base.staticMethod();  // "Static method in base class"
        sub.staticMethod();   // "Static method in subclass"
        SubClass.staticMethod();  // "Static method in subclass"
    }
}
\`\`\`

### **Method Documentation (JavaDoc)**
\`\`\`java
public class MethodDocumentation {
    /**
     * Calculates the area of a rectangle.
     *
     * @param length the length of the rectangle (must be positive)
     * @param width the width of the rectangle (must be positive)
     * @return the area of the rectangle (length * width)
     * @throws IllegalArgumentException if length or width is not positive
     */
    public double calculateRectangleArea(double length, double width) {
        if (length <= 0 || width <= 0) {
            throw new IllegalArgumentException("Length and width must be positive");
        }
        return length * width;
    }

    /**
     * Validates an email address.
     *
     * @param email the email address to validate
     * @return true if the email is valid, false otherwise
     */
    public boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return email.contains("@") && email.contains(".");
    }

    public static void main(String[] args) {
        MethodDocumentation obj = new MethodDocumentation();

        try {
            double area = obj.calculateRectangleArea(5.0, 10.0);
            System.out.println("Rectangle area: " + area);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }

        System.out.println("Valid email: " + obj.isValidEmail("user@example.com"));
        System.out.println("Invalid email: " + obj.isValidEmail("invalid-email"));
    }
}
\`\`\`

---

## 🎯 Method Definition Guidelines

### **1. Single Responsibility Principle**
\`\`\`java
public class SingleResponsibility {
    // ✅ Good: Each method has one clear purpose
    public void validateUser(User user) {
        // Only validation logic
    }

    public void saveUser(User user) {
        // Only database logic
    }

    public void sendNotification(User user) {
        // Only notification logic
    }

    // ❌ Bad: Multiple responsibilities
    // public void processUser(User user) {
    //     // Validation, database, and notification all mixed together
    // }

    static class User {
        String name;
        String email;
    }
}
\`\`\`

### **2. Consistent Parameter Ordering**
\`\`\`java
public class ParameterOrdering {
    // ✅ Good: Consistent parameter order across related methods
    public void drawRectangle(int x, int y, int width, int height) { }
    public void fillRectangle(int x, int y, int width, int height) { }
    public void moveRectangle(int x, int y, int width, int height, int newX, int newY) { }

    // ❌ Bad: Inconsistent parameter order
    // public void drawRectangle(int x, int y, int width, int height) { }
    // public void fillRectangle(int width, int height, int x, int y) { }  // Wrong order
    // public void moveRectangle(int newX, int newY, int x, int y, int width, int height) { }  // Wrong order
}
\`\`\`

### **3. Method Visibility**
\`\`\`java
public class MethodVisibility {
    // Public API - visible to all
    public void publicApiMethod() { }

    // Package-private - visible within package (default)
    void packageMethod() { }

    // Protected - visible to subclasses
    protected void protectedMethod() { }

    // Private - visible only within class
    private void privateMethod() { }

    // Helper methods should be private
    public void processData(String data) {
        validateData(data);  // Private helper
        String processed = transformData(data);  // Private helper
        saveData(processed);  // Private helper
    }

    private void validateData(String data) {
        if (data == null) throw new IllegalArgumentException("Data cannot be null");
    }

    private String transformData(String data) {
        return data.toUpperCase();
    }

    private void saveData(String data) {
        System.out.println("Saving: " + data);
    }
}
\`\`\`

Defining methods properly is fundamental to Java programming. Following consistent naming conventions, maintaining single responsibility, and using appropriate access modifiers leads to clean, maintainable, and reusable code! 📝`
};


