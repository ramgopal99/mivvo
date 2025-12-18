import { Exercise } from '../../../../data/lessonsData';

export const exercise_2_9: Exercise = {
  id: "2.9",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates basic syntax and OOP concepts:\n1. Define a Person class with name and age fields\n2. Create a constructor and getter/setter methods\n3. Create multiple Person objects in main method\n4. Use System.out.println() to display object information\n5. Show proper Java syntax with correct indentation",
      solution: `public class PersonDemo {
    public static void main(String[] args) {
        // Create Person objects using constructor
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 30);
        Person person3 = new Person("Charlie", 22);

        // Display person information
        System.out.println("Person 1: " + person1.getName() + ", Age: " + person1.getAge());
        System.out.println("Person 2: " + person2.getName() + ", Age: " + person2.getAge());
        System.out.println("Person 3: " + person3.getName() + ", Age: " + person3.getAge());

        // Modify person data using setters
        person1.setAge(26);
        person2.setName("Robert");

        System.out.println("\\nAfter modifications:");
        System.out.println("Person 1: " + person1.getName() + ", Age: " + person1.getAge());
        System.out.println("Person 2: " + person2.getName() + ", Age: " + person2.getAge());
    }
}

class Person {
    private String name;
    private int age;

    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter methods
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    // Setter methods
    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates arrays and strings:\n1. Create an array of strings with programming languages\n2. Use a for-each loop to iterate through the array\n3. Create individual string variables and demonstrate concatenation\n4. Use string methods like length(), toUpperCase(), and substring()\n5. Create an integer array and calculate the sum of its elements",
      solution: `public class ArraysAndStringsDemo {
    public static void main(String[] args) {
        // String array of programming languages
        String[] languages = {"Java", "Python", "JavaScript", "C++", "Ruby"};

        System.out.println("Programming Languages:");
        // For-each loop to iterate through array
        for (String language : languages) {
            System.out.println("- " + language);
        }

        // Individual string operations
        String favorite = "Java";
        System.out.println("\\nString Operations:");
        System.out.println("Favorite language: " + favorite);
        System.out.println("Length: " + favorite.length());
        System.out.println("Uppercase: " + favorite.toUpperCase());
        System.out.println("First 2 characters: " + favorite.substring(0, 2));

        // String concatenation
        String message = "I love " + favorite + " programming!";
        System.out.println("Message: " + message);

        // Integer array and sum calculation
        int[] numbers = {10, 20, 30, 40, 50};
        int sum = 0;

        System.out.println("\\nNumbers array:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i]);
            if (i < numbers.length - 1) {
                System.out.print(", ");
            }
            sum += numbers[i];
        }
        System.out.println("\\nSum of numbers: " + sum);
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that demonstrates methods and parameters:\n1. Define multiple methods with different parameter types\n2. Create methods that return values and void methods\n3. Use method overloading (same name, different parameters)\n4. Demonstrate pass-by-value with primitive types\n5. Include a method that performs calculations and returns results",
      solution: `public class MethodsDemo {
    public static void main(String[] args) {
        // Call different methods
        greet("Alice");
        greet("Bob", 25);

        // Methods with return values
        int result1 = add(10, 20);
        double result2 = multiply(3.5, 4.0);
        String result3 = createMessage("Java", "powerful");

        System.out.println("\\nCalculations:");
        System.out.println("10 + 20 = " + result1);
        System.out.println("3.5 * 4.0 = " + result2);
        System.out.println("Message: " + result3);

        // Demonstrate pass-by-value
        int original = 100;
        System.out.println("\\nBefore method call: " + original);
        modifyValue(original);
        System.out.println("After method call: " + original);
    }

    // Void method with one parameter
    public static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Overloaded method with two parameters
    public static void greet(String name, int age) {
        System.out.println("Hello, " + name + "! You are " + age + " years old.");
    }

    // Method returning int
    public static int add(int a, int b) {
        return a + b;
    }

    // Method returning double
    public static double multiply(double a, double b) {
        return a * b;
    }

    // Method returning String
    public static String createMessage(String language, String adjective) {
        return language + " is " + adjective + "!";
    }

    // Demonstrate pass-by-value
    public static void modifyValue(int value) {
        value = 200; // This only modifies the local copy
        System.out.println("Inside method: " + value);
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates exception handling:\n1. Use try-catch blocks to handle potential exceptions\n2. Create methods that might throw exceptions\n3. Use multiple catch blocks for different exception types\n4. Include a finally block for cleanup\n5. Demonstrate throwing custom exceptions with meaningful messages",
      solution: `import java.util.Scanner;

public class ExceptionHandlingDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            // Demonstrate array access with exception handling
            int[] numbers = {1, 2, 3, 4, 5};
            System.out.println("Enter an index (0-4): ");
            int index = scanner.nextInt();

            int value = getArrayElement(numbers, index);
            System.out.println("Value at index " + index + ": " + value);

            // Demonstrate division with exception handling
            System.out.println("Enter dividend: ");
            int dividend = scanner.nextInt();
            System.out.println("Enter divisor: ");
            int divisor = scanner.nextInt();

            double result = divide(dividend, divisor);
            System.out.println(dividend + " / " + divisor + " = " + result);

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Error: Invalid array index. " + e.getMessage());
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero. " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Unexpected error: " + e.getMessage());
        } finally {
            // Cleanup code always executes
            System.out.println("Cleaning up resources...");
            scanner.close();
        }
    }

    // Method that might throw ArrayIndexOutOfBoundsException
    public static int getArrayElement(int[] array, int index) {
        if (index < 0 || index >= array.length) {
            throw new ArrayIndexOutOfBoundsException("Index " + index + " is out of bounds for array of length " + array.length);
        }
        return array[index];
    }

    // Method that might throw ArithmeticException
    public static double divide(int dividend, int divisor) {
        if (divisor == 0) {
            throw new ArithmeticException("Cannot divide by zero");
        }
        return (double) dividend / divisor;
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates type casting and conversions:\n1. Show implicit casting (widening) with primitive types\n2. Show explicit casting (narrowing) with primitive types\n3. Convert between strings and numbers using parse methods\n4. Demonstrate wrapper classes (Integer, Double, etc.)\n5. Show safe casting with instanceof checks",
      solution: `public class TypeCastingDemo {
    public static void main(String[] args) {
        System.out.println("=== Type Casting and Conversions Demo ===");

        // 1. Implicit casting (widening)
        System.out.println("\\n1. Implicit Casting (Widening):");
        int intValue = 100;
        double doubleValue = intValue; // int to double
        System.out.println("int " + intValue + " -> double " + doubleValue);

        float floatValue = intValue; // int to float
        System.out.println("int " + intValue + " -> float " + floatValue);

        // 2. Explicit casting (narrowing)
        System.out.println("\\n2. Explicit Casting (Narrowing):");
        double bigDouble = 123.456;
        int narrowedInt = (int) bigDouble; // double to int (loses precision)
        System.out.println("double " + bigDouble + " -> int " + narrowedInt);

        // 3. String to number conversions
        System.out.println("\\n3. String to Number Conversions:");
        String numberString = "42";
        int parsedInt = Integer.parseInt(numberString);
        double parsedDouble = Double.parseDouble("3.14159");

        System.out.println("String \\"" + numberString + "\\" -> int " + parsedInt);
        System.out.println("String \\"3.14159\\" -> double " + parsedDouble);

        // 4. Wrapper classes
        System.out.println("\\n4. Wrapper Classes:");
        Integer wrapperInt = Integer.valueOf(100);
        Double wrapperDouble = Double.valueOf("2.5");
        Boolean wrapperBool = Boolean.valueOf("true");

        System.out.println("Integer wrapper: " + wrapperInt);
        System.out.println("Double wrapper: " + wrapperDouble);
        System.out.println("Boolean wrapper: " + wrapperBool);

        // 5. Safe casting with instanceof
        System.out.println("\\n5. Safe Casting with instanceof:");
        Object[] objects = {42, "Hello", 3.14, true};

        for (Object obj : objects) {
            if (obj instanceof Integer) {
                System.out.println(obj + " is an Integer: " + ((Integer) obj * 2));
            } else if (obj instanceof String) {
                System.out.println(obj + " is a String: length = " + ((String) obj).length());
            } else if (obj instanceof Double) {
                System.out.println(obj + " is a Double: " + ((Double) obj * 2));
            } else {
                System.out.println(obj + " is of type: " + obj.getClass().getSimpleName());
            }
        }
    }
}`
    }
  ]
};

