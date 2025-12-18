import { Exercise } from '../../../../data/lessonsData';

export const exercise_5_8: Exercise = {
  id: "5.8",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates method definition and calling:\n1. Define a method that prints a greeting message\n2. Define a method that calculates the area of a rectangle\n3. Define a method that checks if a number is even\n4. Call all methods from main() with different parameters\n5. Show proper method syntax with return types and parameters",
      solution: `public class MethodBasics {
    public static void main(String[] args) {
        // Call greeting method
        printGreeting("Alice");
        printGreeting("Java Programmer");

        // Call area calculation method
        double area1 = calculateRectangleArea(5.0, 3.0);
        double area2 = calculateRectangleArea(10.5, 7.2);
        System.out.println("Rectangle 1 area: " + area1);
        System.out.println("Rectangle 2 area: " + area2);

        // Call even checking method
        System.out.println("Is 4 even? " + isEven(4));
        System.out.println("Is 7 even? " + isEven(7));
        System.out.println("Is 0 even? " + isEven(0));
    }

    // Method that prints a greeting (void return type)
    public static void printGreeting(String name) {
        System.out.println("Hello, " + name + "! Welcome to Java methods!");
    }

    // Method that calculates rectangle area (double return type)
    public static double calculateRectangleArea(double length, double width) {
        return length * width;
    }

    // Method that checks if number is even (boolean return type)
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates method parameters:\n1. Create a method that accepts multiple parameters of different types\n2. Create a method that modifies its parameters (demonstrate pass-by-value)\n3. Create a method with default behavior using method overloading\n4. Demonstrate parameter validation in methods\n5. Show how methods can call other methods",
      solution: `public class MethodParameters {
    public static void main(String[] args) {
        // Call method with multiple parameters
        displayStudentInfo("Alice", 20, 3.8, true);

        // Call overloaded methods
        printMessage("Hello World");
        printMessage("Hello World", 3);

        // Demonstrate pass-by-value
        int originalValue = 100;
        System.out.println("\\nBefore method call: " + originalValue);
        modifyValue(originalValue);
        System.out.println("After method call: " + originalValue);

        // Call method with validation
        processScore(85);
        processScore(150); // Invalid score
        processScore(-10); // Invalid score
    }

    // Method with multiple parameters
    public static void displayStudentInfo(String name, int age, double gpa, boolean isActive) {
        System.out.println("Student Information:");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        System.out.println("Active: " + isActive);
    }

    // Overloaded methods (same name, different parameters)
    public static void printMessage(String message) {
        System.out.println(message);
    }

    public static void printMessage(String message, int times) {
        for (int i = 0; i < times; i++) {
            System.out.println(message);
        }
    }

    // Demonstrate pass-by-value
    public static void modifyValue(int value) {
        value = 200; // This only changes the local copy
        System.out.println("Inside method: " + value);
    }

    // Method with parameter validation
    public static void processScore(int score) {
        if (score < 0 || score > 100) {
            System.out.println("Invalid score: " + score + " (must be between 0 and 100)");
            return;
        }
        System.out.println("Processing score: " + score);
        String grade = calculateGrade(score);
        System.out.println("Grade: " + grade);
    }

    // Helper method called by processScore
    public static String calculateGrade(int score) {
        if (score >= 90) return "A";
        else if (score >= 80) return "B";
        else if (score >= 70) return "C";
        else if (score >= 60) return "D";
        else return "F";
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that demonstrates return values and method chaining:\n1. Create methods that return different data types\n2. Create a method that returns an array\n3. Demonstrate method chaining with string operations\n4. Create a method that returns the result of complex calculations\n5. Show how to handle methods that might return null",
      solution: `import java.util.Arrays;

public class MethodReturns {
    public static void main(String[] args) {
        // Methods returning different types
        String fullName = buildFullName("John", "Doe");
        System.out.println("Full name: " + fullName);

        int maxValue = findMaximum(10, 25, 8);
        System.out.println("Maximum value: " + maxValue);

        boolean isPositive = checkPositive(-5);
        System.out.println("-5 is positive: " + isPositive);

        // Method returning an array
        int[] fibonacciNumbers = generateFibonacci(8);
        System.out.println("Fibonacci sequence: " + Arrays.toString(fibonacciNumbers));

        // Method chaining with strings
        String result = "hello world"
            .toUpperCase()
            .substring(0, 5)
            .concat("!")
            .replace("L", "X");
        System.out.println("Method chaining result: " + result);

        // Handling potentially null returns
        String userInput = getUserInput("admin");
        if (userInput != null) {
            System.out.println("User input: " + userInput);
        } else {
            System.out.println("No input available");
        }

        // Complex calculation method
        double average = calculateAverage(85, 92, 78, 96, 88);
        System.out.println("Average score: " + average);
    }

    // Method returning String
    public static String buildFullName(String firstName, String lastName) {
        return firstName + " " + lastName;
    }

    // Method returning int
    public static int findMaximum(int a, int b, int c) {
        return Math.max(Math.max(a, b), c);
    }

    // Method returning boolean
    public static boolean checkPositive(int number) {
        return number > 0;
    }

    // Method returning array
    public static int[] generateFibonacci(int count) {
        int[] fibonacci = new int[count];
        fibonacci[0] = 0;
        if (count > 1) {
            fibonacci[1] = 1;
            for (int i = 2; i < count; i++) {
                fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
            }
        }
        return fibonacci;
    }

    // Method that might return null
    public static String getUserInput(String userType) {
        if ("admin".equals(userType)) {
            return "Administrator access granted";
        } else if ("user".equals(userType)) {
            return "User access granted";
        } else {
            return null; // No valid input
        }
    }

    // Method with complex calculation
    public static double calculateAverage(int... scores) {
        if (scores.length == 0) return 0.0;

        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        return (double) sum / scores.length;
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates method overloading extensively:\n1. Create multiple overloaded methods with different parameter types\n2. Create overloaded methods with different parameter counts\n3. Show how Java resolves method calls to the correct overloaded version\n4. Include overloaded constructors in a class\n5. Demonstrate type promotion in method overloading",
      solution: `public class MethodOverloading {
    public static void main(String[] args) {
        // Overloaded methods with different parameter types
        displayInfo("Alice");
        displayInfo(25);
        displayInfo(3.8);
        displayInfo(true);

        // Overloaded methods with different parameter counts
        calculateSum(10, 20);
        calculateSum(10, 20, 30);
        calculateSum(10.5, 20.3);

        // Type promotion examples
        processNumber((byte) 10);  // byte -> int
        processNumber((short) 20); // short -> int
        processNumber(30);         // int -> int
        processNumber(40L);        // long -> long (more specific)

        // Using overloaded constructors
        Calculator calc1 = new Calculator();
        Calculator calc2 = new Calculator("Scientific");
        Calculator calc3 = new Calculator("Basic", 100);

        calc1.displayType();
        calc2.displayType();
        calc3.displayType();
    }

    // Overloaded methods with different parameter types
    public static void displayInfo(String info) {
        System.out.println("String: " + info);
    }

    public static void displayInfo(int info) {
        System.out.println("Integer: " + info);
    }

    public static void displayInfo(double info) {
        System.out.println("Double: " + info);
    }

    public static void displayInfo(boolean info) {
        System.out.println("Boolean: " + info);
    }

    // Overloaded methods with different parameter counts
    public static void calculateSum(int a, int b) {
        System.out.println("Sum of two ints: " + (a + b));
    }

    public static void calculateSum(int a, int b, int c) {
        System.out.println("Sum of three ints: " + (a + b + c));
    }

    public static void calculateSum(double a, double b) {
        System.out.println("Sum of two doubles: " + (a + b));
    }

    // Methods demonstrating type promotion
    public static void processNumber(int number) {
        System.out.println("Processing int: " + number);
    }

    public static void processNumber(long number) {
        System.out.println("Processing long: " + number);
    }
}

class Calculator {
    private String type;
    private int precision;

    // Overloaded constructors
    public Calculator() {
        this.type = "Basic";
        this.precision = 2;
    }

    public Calculator(String type) {
        this.type = type;
        this.precision = 2;
    }

    public Calculator(String type, int precision) {
        this.type = type;
        this.precision = precision;
    }

    public void displayType() {
        System.out.println("Calculator: " + type + " (precision: " + precision + ")");
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates advanced method concepts:\n1. Create recursive methods (methods that call themselves)\n2. Create methods with variable-length arguments (varargs)\n3. Demonstrate method visibility (public, private, protected)\n4. Create static methods and instance methods\n5. Show method documentation with JavaDoc comments",
      solution: `/**
 * Advanced Method Concepts Demonstration
 *
 * This class demonstrates various advanced method concepts in Java
 * including recursion, varargs, visibility modifiers, and documentation.
 *
 * @author Java Methods Expert
 * @version 1.0
 */
public class AdvancedMethods {
    public static void main(String[] args) {
        // Recursive methods
        System.out.println("Factorial of 5: " + calculateFactorial(5));
        System.out.println("Fibonacci number 8: " + calculateFibonacci(8));

        // Variable-length arguments (varargs)
        System.out.println("Sum of 1,2,3,4,5: " + sumAll(1, 2, 3, 4, 5));
        System.out.println("Sum of array: " + sumAll(new int[]{10, 20, 30}));

        // Static vs instance methods
        AdvancedMethods instance = new AdvancedMethods();
        greetStatic("Alice"); // Static method
        instance.greetInstance("Bob"); // Instance method

        // Method visibility demonstration
        instance.publicMethod();
        instance.callPrivateMethod(); // Calls private method indirectly
    }

    /**
     * Calculates factorial using recursion
     * @param n The number to calculate factorial for
     * @return The factorial of n
     */
    public static int calculateFactorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * calculateFactorial(n - 1);
    }

    /**
     * Calculates Fibonacci number using recursion
     * @param n The position in Fibonacci sequence
     * @return The nth Fibonacci number
     */
    public static int calculateFibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
    }

    /**
     * Sums all provided integers using varargs
     * @param numbers Variable number of integers to sum
     * @return The sum of all numbers
     */
    public static int sumAll(int... numbers) {
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        return sum;
    }

    // Static method
    public static void greetStatic(String name) {
        System.out.println("Static greeting to " + name);
    }

    // Instance method
    public void greetInstance(String name) {
        System.out.println("Instance greeting to " + name);
    }

    // Public method
    public void publicMethod() {
        System.out.println("This is a public method");
        privateMethod(); // Can call private method from same class
    }

    // Method that calls private method
    public void callPrivateMethod() {
        System.out.println("Calling private method:");
        privateMethod();
    }

    // Private method - only accessible within this class
    private void privateMethod() {
        System.out.println("This is a private method");
    }
}`
    }
  ]
};

