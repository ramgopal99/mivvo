import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_1: SubLesson = {
  id: "7.1",
  title: 'Introduction to Methods',
  status: 'completed',
  content: "`# ðŸ”§ Introduction to Methods in Java

Methods are fundamental building blocks in Java programming. They encapsulate reusable code, promote modularity, and enable code organization. Understanding methods is crucial for writing clean, maintainable, and efficient Java programs.

---

## ðŸ“‹ Method Fundamentals

### **What is a Method?**
A method is a block of code that performs a specific task and can be called (invoked) from other parts of your program. Methods help you organize code into logical, reusable units.

\`"\`\`java
// Class definition
public class Calculator {
    // This is a method
    public int add(int a, int b) {
        int sum = a + b;
        return sum;
    }

    // Another method
    public void displayResult(int result) {
        System.out.println("Result: " + result);
    }

    // Main method - program entry point
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        int sum = calc.add(5, 3);        // Calling the add method
        calc.displayResult(sum);         // Calling the displayResult method
    }
}
\`\`\`

### **Why Use Methods?**

#### **1. Code Reusability**
Methods allow you to write code once and use it multiple times.

\`\`\`java
public class CodeReuse {
    // Method to calculate area of a circle
    public double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        CodeReuse calculator = new CodeReuse();

        // Reuse the same method for different circles
        double area1 = calculator.calculateCircleArea(5.0);
        double area2 = calculator.calculateCircleArea(10.0);
        double area3 = calculator.calculateCircleArea(2.5);

        System.out.println("Circle areas: " + area1 + ", " + area2 + ", " + area3);
    }
}
\`\`\`

#### **2. Code Organization**
Methods break down complex problems into smaller, manageable pieces.

\`\`\`java
public class CodeOrganization {
    public void processUserData() {
        String userInput = getUserInput();
        String processedData = validateAndProcess(userInput);
        saveToDatabase(processedData);
        sendConfirmationEmail();
    }

    private String getUserInput() {
        // Code to get input from user
        return "user data";
    }

    private String validateAndProcess(String input) {
        // Code to validate and process input
        return "processed " + input;
    }

    private void saveToDatabase(String data) {
        // Code to save to database
        System.out.println("Saved: " + data);
    }

    private void sendConfirmationEmail() {
        // Code to send email
        System.out.println("Email sent");
    }
}
\`\`\`

#### **3. Abstraction**
Methods hide implementation details and provide a clean interface.

\`\`\`java
public class AbstractionExample {
    public static void main(String[] args) {
        // We don't need to know how payment processing works
        processPayment("credit_card", 99.99);
        processPayment("paypal", 49.99);
    }

    // Abstract method - we know what it does, not how
    public static void processPayment(String method, double amount) {
        // Complex payment processing logic hidden here
        System.out.println("Processing $" + amount + " via " + method);
        // ... actual implementation ...
        System.out.println("Payment successful!");
    }
}
\`\`\`

---

## ðŸ“ Method Declaration Syntax

### **Complete Method Syntax**

\`\`\`java
[access_modifier] [static] [final] return_type method_name(parameter_list) [throws exception_list] {
    // Method body
    // Statements...
    [return value;]  // Optional return statement
}
\`\`\`

#### **Method Components:**

\`\`\`java
public class MethodComponents {
    // 1. Access modifier: public, private, protected, or default
    // 2. Static keyword (optional): belongs to class, not instance
    // 3. Final keyword (optional): cannot be overridden
    // 4. Return type: void (no return) or any data type
    // 5. Method name: follows camelCase convention
    // 6. Parameter list: comma-separated (type name) pairs in parentheses
    // 7. Throws clause (optional): exceptions the method might throw
    // 8. Method body: statements enclosed in curly braces
    // 9. Return statement (optional): returns value to caller

    // Example with all components
    public static final double calculateTax(double income, int taxYear)
            throws IllegalArgumentException {
        if (income < 0) {
            throw new IllegalArgumentException("Income cannot be negative");
        }

        double tax = income * 0.25;  // Simplified tax calculation
        return tax;
    }

    public static void main(String[] args) {
        try {
            double tax = calculateTax(50000.0, 2024);
            System.out.println("Tax amount: $" + tax);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## ðŸ”„ Method Parameters

### **Parameter Types**

#### **1. Value Parameters (Primitive Types)**
Primitive values are passed by value - changes inside method don't affect original.

\`\`\`java
public class ValueParameters {
    public static void main(String[] args) {
        int original = 10;
        System.out.println("Before: " + original);  // 10

        modifyValue(original);
        System.out.println("After: " + original);   // Still 10 (unchanged)
    }

    public static void modifyValue(int value) {
        value = 20;  // Only changes the local copy
        System.out.println("Inside method: " + value);  // 20
    }
}
\`\`\`

#### **2. Reference Parameters (Objects)**
Object references are passed by value, but the objects they point to can be modified.

\`\`\`java
public class ReferenceParameters {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3};
        System.out.println("Before: " + java.util.Arrays.toString(numbers));

        modifyArray(numbers);
        System.out.println("After: " + java.util.Arrays.toString(numbers));
    }

    public static void modifyArray(int[] arr) {
        arr[0] = 999;  // Modifies the original array
        System.out.println("Inside method: " + java.util.Arrays.toString(arr));
    }
}
\`\`\`

### **Parameter Passing Rules**

\`\`\`java
public class ParameterRules {
    // âœ… Valid parameter declarations
    public void method1(int a, double b, String c) { }

    // âœ… Parameters can have the same type
    public void method2(int x, int y, int z) { }

    // âŒ Duplicate parameter names (compilation error)
    // public void method3(int a, String a) { }

    // âœ… Varargs (variable arguments)
    public void method4(int... numbers) {
        for (int num : numbers) {
            System.out.println(num);
        }
    }

    public static void main(String[] args) {
        ParameterRules obj = new ParameterRules();

        // Calling method with varargs
        obj.method4(1, 2, 3);        // Three arguments
        obj.method4(10, 20);         // Two arguments
        obj.method4();               // No arguments
    }
}
\`\`\`

---

## ðŸ“¤ Method Return Values

### **Return Statement**

The return statement exits a method and optionally returns a value to the caller.

\`\`\`java
public class ReturnStatement {
    // Method that returns an int
    public static int add(int a, int b) {
        int sum = a + b;
        return sum;  // Returns the sum and exits the method
        // Any code after return is unreachable
    }

    // Method that returns void (no value)
    public static void printMessage(String message) {
        System.out.println("Message: " + message);
        return;  // Optional for void methods - just exits
    }

    // Method with multiple return points
    public static String getGrade(int score) {
        if (score >= 90) {
            return "A";
        } else if (score >= 80) {
            return "B";
        } else if (score >= 70) {
            return "C";
        } else {
            return "F";
        }
    }

    public static void main(String[] args) {
        int result = add(5, 3);
        System.out.println("Sum: " + result);

        printMessage("Hello, World!");

        String grade = getGrade(85);
        System.out.println("Grade: " + grade);
    }
}
\`\`\`

### **Return Type Compatibility**

\`\`\`java
public class ReturnTypes {
    // âœ… Primitive return types
    public int getAge() { return 25; }
    public double getPrice() { return 19.99; }
    public boolean isValid() { return true; }

    // âœ… Reference return types
    public String getName() { return "Alice"; }
    public int[] getNumbers() { return new int[]{1, 2, 3}; }

    // âœ… Autoboxing works
    public Integer getCount() { return 42; }  // int â†’ Integer

    // âŒ Type mismatch (compilation error)
    // public int getValue() { return "hello"; }  // String cannot be converted to int

    // âœ… void methods don't return values
    public void doSomething() {
        // No return statement needed
        System.out.println("Done!");
    }
}
\`\`\`

---

## ðŸ”§ Method Overloading

### **Same Name, Different Parameters**

Method overloading allows multiple methods with the same name but different parameter lists.

\`\`\`java
public class MethodOverloading {
    // Overloaded methods - same name, different parameters

    // Version 1: Add two integers
    public int add(int a, int b) {
        return a + b;
    }

    // Version 2: Add three integers
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Version 3: Add two doubles
    public double add(double a, double b) {
        return a + b;
    }

    // Version 4: Concatenate strings
    public String add(String a, String b) {
        return a + b;
    }

    public static void main(String[] args) {
        MethodOverloading calc = new MethodOverloading();

        // Compiler chooses the right method based on arguments
        System.out.println("2 + 3 = " + calc.add(2, 3));                    // int version
        System.out.println("1 + 2 + 3 = " + calc.add(1, 2, 3));           // 3-param version
        System.out.println("2.5 + 3.7 = " + calc.add(2.5, 3.7));          // double version
        System.out.println("Hello" + " " + "World = " + calc.add("Hello", " World")); // String version
    }
}
\`\`\`

### **Overloading Rules**

\`\`\`java
public class OverloadingRules {
    // âœ… Valid overloads - different parameter types
    public void process(int number) { }
    public void process(double number) { }
    public void process(String text) { }

    // âœ… Valid overloads - different parameter counts
    public void process(int a, int b) { }
    public void process(int a, int b, int c) { }

    // âœ… Valid overloads - different parameter order
    public void mix(int x, String y) { }
    public void mix(String x, int y) { }

    // âŒ Invalid - same parameter list (compilation error)
    // public void process(int num) { }  // Duplicate!

    // âœ… Return type alone doesn't make overloads
    // public int calculate() { return 1; }
    // public double calculate() { return 1.0; }  // Compilation error!
}
\`\`\`

---

## ðŸ·ï¸ Method Scope and Lifetime

### **Local Variables**

Variables declared inside methods have method scope.

\`\`\`java
public class MethodScope {
    private int instanceVariable = 100;  // Available to all methods in class

    public void method1() {
        int localVar1 = 10;  // Only available in method1
        System.out.println("Local: " + localVar1);
        System.out.println("Instance: " + instanceVariable);
    }

    public void method2() {
        int localVar2 = 20;  // Only available in method2
        System.out.println("Local: " + localVar2);
        System.out.println("Instance: " + instanceVariable);

        // localVar1 is not accessible here
        // System.out.println(localVar1);  // Compilation error!
    }

    public static void main(String[] args) {
        MethodScope obj = new MethodScope();
        obj.method1();
        obj.method2();
    }
}
\`\`\`

### **Parameter Scope**

Method parameters are local to the method.

\`\`\`java
public class ParameterScope {
    public static void calculate(int x, int y) {
        // Parameters x and y are accessible here
        int sum = x + y;
        int product = x * y;

        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);

        // Parameters can be modified locally
        x = x * 2;  // This doesn't affect the caller's variables
        y = y + 10;
    }

    public static void main(String[] args) {
        int a = 5, b = 3;

        System.out.println("Before: a=" + a + ", b=" + b);
        calculate(a, b);  // Pass by value
        System.out.println("After: a=" + a + ", b=" + b);  // Unchanged
    }
}
\`\`\`

---

## ðŸŽ¯ Practical Method Examples

### **Calculator Class**

\`\`\`java
public class Calculator {
    // Basic arithmetic operations
    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Cannot divide by zero");
        }
        return (double) a / b;
    }

    // Advanced operations
    public long power(int base, int exponent) {
        if (exponent < 0) {
            throw new IllegalArgumentException("Exponent must be non-negative");
        }

        long result = 1;
        for (int i = 0; i < exponent; i++) {
            result *= base;
        }
        return result;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();

        try {
            System.out.println("5 + 3 = " + calc.add(5, 3));
            System.out.println("10 - 4 = " + calc.subtract(10, 4));
            System.out.println("6 * 7 = " + calc.multiply(6, 7));
            System.out.println("15 Ã· 4 = " + calc.divide(15, 4));
            System.out.println("2^8 = " + calc.power(2, 8));
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

### **String Utility Methods**

\`\`\`java
public class StringUtils {
    // Count vowels in a string
    public int countVowels(String text) {
        if (text == null) return 0;

        int count = 0;
        String vowels = "aeiouAEIOU";

        for (char ch : text.toCharArray()) {
            if (vowels.indexOf(ch) != -1) {
                count++;
            }
        }
        return count;
    }

    // Reverse a string
    public String reverse(String text) {
        if (text == null) return null;

        StringBuilder reversed = new StringBuilder();
        for (int i = text.length() - 1; i >= 0; i--) {
            reversed.append(text.charAt(i));
        }
        return reversed.toString();
    }

    // Check if string is palindrome
    public boolean isPalindrome(String text) {
        if (text == null) return false;

        String clean = text.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        String reversed = reverse(clean);
        return clean.equals(reversed);
    }

    public static void main(String[] args) {
        StringUtils utils = new StringUtils();

        String test = "Hello, World!";
        System.out.println("Text: " + test);
        System.out.println("Vowels: " + utils.countVowels(test));
        System.out.println("Reversed: " + utils.reverse(test));

        String palindrome = "A man, a plan, a canal: Panama";
        System.out.println("\\nIs palindrome: " + utils.isPalindrome(palindrome));
    }
}
\`\`\`

---

## ðŸŽ¯ Method Best Practices

### **1. Single Responsibility Principle**

Each method should do one thing and do it well.

\`\`\`java
public class SingleResponsibility {
    // âœ… Good: One clear responsibility
    public void processOrder(Order order) {
        validateOrder(order);
        calculateTotal(order);
        applyDiscount(order);
        saveOrder(order);
        sendConfirmation(order);
    }

    // âŒ Bad: Multiple responsibilities
    public void processEverything(Order order) {
        // Validate order
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have items");
        }

        // Calculate total
        double total = 0;
        for (OrderItem item : order.getItems()) {
            total += item.getPrice() * item.getQuantity();
        }
        order.setTotal(total);

        // Apply discount
        if (total > 100) {
            order.setDiscount(total * 0.1);
        }

        // Save and send - too many things in one method!
    }

    private void validateOrder(Order order) { /* ... */ }
    private void calculateTotal(Order order) { /* ... */ }
    private void applyDiscount(Order order) { /* ... */ }
    private void saveOrder(Order order) { /* ... */ }
    private void sendConfirmation(Order order) { /* ... */ }
}
\`\`\`

### **2. Meaningful Names**

\`\`\`java
public class MethodNaming {
    // âœ… Good: Clear, descriptive names
    public void calculateMonthlySalary() { }
    public boolean isUserAuthenticated() { }
    public List<Customer> findActiveCustomers() { }

    // âŒ Bad: Unclear or misleading names
    public void doStuff() { }                    // What stuff?
    public void process() { }                     // Process what?
    public boolean check() { }                    // Check what?

    // âœ… Good: Parameters have descriptive names
    public void transferMoney(Account fromAccount, Account toAccount, double amount) {
        // Clear what each parameter represents
    }
}
\`\`\`

### **3. Appropriate Method Length**

\`\`\`java
public class MethodLength {
    // âœ… Good: Short, focused method
    public void processPayment(Payment payment) {
        validatePayment(payment);
        chargeCard(payment);
        updateDatabase(payment);
        sendReceipt(payment);
    }

    // âŒ Bad: Too long method
    public void processPaymentLong(Payment payment) {
        // 50+ lines of code...
        // Hard to understand, debug, and maintain
    }

    // âœ… Good: Break down complex logic
    private void validatePayment(Payment payment) {
        // Validation logic here (10-15 lines)
    }

    private void chargeCard(Payment payment) {
        // Charging logic here
    }

    private void updateDatabase(Payment payment) {
        // Database update logic here
    }

    private void sendReceipt(Payment payment) {
        // Email sending logic here
    }
}
\`\`\`

### **4. Proper Documentation**

\`\`\`java
/**
 * Represents a bank account with basic operations.
 * This class demonstrates proper method documentation.
 */
public class BankAccount {
    private double balance;

    /**
     * Deposits money into the account.
     *
     * @param amount the amount to deposit (must be positive)
     * @return true if deposit was successful, false otherwise
     * @throws IllegalArgumentException if amount is negative or zero
     */
    public boolean deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }

        balance += amount;
        return true;
    }

    /**
     * Withdraws money from the account.
     *
     * @param amount the amount to withdraw
     * @return true if withdrawal was successful
     * @throws IllegalArgumentException if amount is invalid
     * @throws InsufficientFundsException if balance is insufficient
     */
    public boolean withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }

        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }

        balance -= amount;
        return true;
    }

    /**
     * Gets the current account balance.
     *
     * @return the current balance
     */
    public double getBalance() {
        return balance;
    }
}

// Custom exception for demonstration
class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
\`\`\`

---

## ðŸŽ¯ Summary

Methods are the building blocks of Java programs:

### **Key Concepts**
- **Reusable code blocks** that perform specific tasks
- **Parameters** for input, **return values** for output
- **Method overloading** for same-name different behaviors
- **Scope rules** for variable accessibility

### **Method Structure**
- **Access modifiers**: public, private, protected
- **Return type**: void or any data type
- **Method name**: descriptive, camelCase
- **Parameter list**: (type name, type name, ...)
- **Method body**: { statements }

### **Best Practices**
- **Single responsibility**: One method, one purpose
- **Descriptive names**: Clear what the method does
- **Appropriate length**: Keep methods focused and readable
- **Proper documentation**: JavaDoc comments for clarity

### **Common Patterns**
- **Getter methods**: Access private fields
- **Setter methods**: Modify private fields
- **Utility methods**: Static helper functions
- **Validation methods**: Check input validity
- **Calculation methods**: Perform computations

Master methods and you'll be able to create modular, maintainable, and reusable Java code!

### **Quick Check**
Identify the method components in this code:
\`\`\`java
public static int calculateSum(int a, int b) {
    int result = a + b;
    return result;
}
\`\`\`
1. Access modifier: ?
2. Return type: ?
3. Method name: ?
4. Parameters: ?
5. Method body: ?
`
};


