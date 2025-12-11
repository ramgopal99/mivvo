import { SubLesson } from '../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: 2.3,
  title: 'Conditions',
  status: 'completed',
  content: `# 📊 Arrays and Strings in Java

Arrays and strings are fundamental data structures in Java. Understanding how to work with them is essential for effective Java programming.

---

## 🏗️ Arrays in Java

### **What is an Array?**
An array is a fixed-size, homogeneous data structure that stores elements of the same type in contiguous memory locations.

\`\`\`java
public class ArrayBasics {
    public static void main(String[] args) {
        // Declaring arrays
        int[] numbers;           // Declaration
        numbers = new int[5];    // Initialization with size 5

        // Declaration and initialization together
        int[] scores = new int[10];

        // Declaration, initialization, and assignment
        int[] ages = {25, 30, 35, 40, 45};

        // Accessing elements (0-based indexing)
        ages[0] = 26;  // Modify first element
        int firstAge = ages[0];  // Access first element
        int lastAge = ages[ages.length - 1];  // Access last element

        System.out.println("First age: " + firstAge);
        System.out.println("Last age: " + lastAge);
        System.out.println("Array length: " + ages.length);
    }
}
\`\`\`

### **Array Operations**
\`\`\`java
import java.util.Arrays;

public class ArrayOperations {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};

        // Iterating through array
        System.out.println("Array elements:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // Enhanced for loop (for-each)
        System.out.println("Using enhanced for loop:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        // Sorting array
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));

        // Searching in sorted array
        int index = Arrays.binarySearch(numbers, 8);
        System.out.println("Index of 8: " + index);

        // Copying arrays
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("Copied array: " + Arrays.toString(copy));
    }
}
\`\`\`

### **Multidimensional Arrays**
\`\`\`java
public class MultiDimensionalArrays {
    public static void main(String[] args) {
        // 2D array declaration and initialization
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        // Accessing elements
        System.out.println("Element at [1][2]: " + matrix[1][2]); // 6

        // Iterating through 2D array
        System.out.println("Matrix elements:");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }

        // Jagged arrays (rows can have different lengths)
        int[][] jaggedArray = new int[3][];
        jaggedArray[0] = new int[2];  // First row: 2 elements
        jaggedArray[1] = new int[4];  // Second row: 4 elements
        jaggedArray[2] = new int[3];  // Third row: 3 elements
    }
}
\`\`\`

---

## 📝 Strings in Java

### **String Class**
Strings in Java are objects of the String class. They are immutable (cannot be changed after creation).

\`\`\`java
public class StringBasics {
    public static void main(String[] args) {
        // String creation
        String str1 = "Hello";              // String literal
        String str2 = new String("World");  // Using constructor
        String str3 = str1 + " " + str2;    // Concatenation

        System.out.println(str3);  // Output: Hello World

        // String length
        System.out.println("Length: " + str3.length());

        // Accessing characters
        System.out.println("First character: " + str3.charAt(0));
        System.out.println("Last character: " + str3.charAt(str3.length() - 1));

        // Substring
        String substring = str3.substring(6);  // "World"
        System.out.println("Substring: " + substring);
    }
}
\`\`\`

### **String Methods**
\`\`\`java
public class StringMethods {
    public static void main(String[] args) {
        String text = "Hello, Java Programming!";

        // Case conversion
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());

        // Searching
        System.out.println("Contains 'Java': " + text.contains("Java"));
        System.out.println("Starts with 'Hello': " + text.startsWith("Hello"));
        System.out.println("Ends with '!': " + text.endsWith("!"));

        // Finding position
        System.out.println("Index of 'Java': " + text.indexOf("Java"));
        System.out.println("Last index of 'o': " + text.lastIndexOf("o"));

        // Replacing
        String replaced = text.replace("Java", "Python");
        System.out.println("Replaced: " + replaced);

        // Splitting
        String[] words = text.split(" ");
        System.out.println("Words: " + java.util.Arrays.toString(words));

        // Trimming whitespace
        String spaced = "  Hello World  ";
        System.out.println("Trimmed: '" + spaced.trim() + "'");

        // Checking emptiness
        String empty = "";
        System.out.println("Is empty: " + empty.isEmpty());
    }
}
\`\`\`

### **String Comparison**
\`\`\`java
public class StringComparison {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = "Hello";
        String str3 = new String("Hello");

        // Using == operator (compares references)
        System.out.println("str1 == str2: " + (str1 == str2));     // true (same reference)
        System.out.println("str1 == str3: " + (str1 == str3));     // false (different references)

        // Using equals() method (compares content)
        System.out.println("str1.equals(str2): " + str1.equals(str2)); // true
        System.out.println("str1.equals(str3): " + str1.equals(str3)); // true

        // Case-insensitive comparison
        System.out.println("equalsIgnoreCase: " + "Hello".equalsIgnoreCase("HELLO"));

        // Comparing lexicographically
        System.out.println("compareTo: " + "Apple".compareTo("Banana")); // Negative (A comes before B)
        System.out.println("compareTo: " + "Banana".compareTo("Apple")); // Positive (B comes after A)
    }
}
\`\`\`

---

## 🔄 StringBuilder and StringBuffer

### **StringBuilder (Faster, not thread-safe)**
\`\`\`java
public class StringBuilderDemo {
    public static void main(String[] args) {
        // Creating StringBuilder
        StringBuilder sb = new StringBuilder("Hello");

        // Appending (modifying the same object)
        sb.append(" ");
        sb.append("World");
        sb.append("!");

        System.out.println("Result: " + sb.toString());

        // Inserting
        sb.insert(6, "Beautiful ");
        System.out.println("After insert: " + sb);

        // Replacing
        sb.replace(6, 16, "Amazing");
        System.out.println("After replace: " + sb);

        // Deleting
        sb.delete(6, 14);
        System.out.println("After delete: " + sb);

        // Reversing
        sb.reverse();
        System.out.println("Reversed: " + sb);

        // Capacity and length
        System.out.println("Length: " + sb.length());
        System.out.println("Capacity: " + sb.capacity());
    }
}
\`\`\`

### **StringBuffer (Thread-safe, slower)**
\`\`\`java
public class StringBufferDemo {
    public static void main(String[] args) {
        // StringBuffer is thread-safe (synchronized)
        StringBuffer sbf = new StringBuffer("Hello");

        // Same methods as StringBuilder
        sbf.append(" World");
        System.out.println(sbf); // Output: Hello World

        // Use StringBuffer when multiple threads access the same string
        Runnable task = () -> {
            for (int i = 0; i < 10; i++) {
                sbf.append(" " + i);
            }
        };

        // In multi-threaded scenarios, StringBuffer ensures thread safety
        // while StringBuilder does not
    }
}
\`\`\`

---

## 🛠️ Array Utilities

### **Arrays Class Methods**
\`\`\`java
import java.util.Arrays;

public class ArrayUtilities {
    public static void main(String[] args) {
        int[] numbers = {5, 2, 8, 1, 9, 3};

        // Sorting
        Arrays.sort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));

        // Binary search (array must be sorted)
        int index = Arrays.binarySearch(numbers, 8);
        System.out.println("Index of 8: " + index);

        // Filling array with value
        int[] filled = new int[5];
        Arrays.fill(filled, 42);
        System.out.println("Filled: " + Arrays.toString(filled));

        // Copying arrays
        int[] copy = Arrays.copyOf(numbers, numbers.length);
        System.out.println("Copy: " + Arrays.toString(copy));

        // Partial copy
        int[] rangeCopy = Arrays.copyOfRange(numbers, 1, 4);
        System.out.println("Range copy: " + Arrays.toString(rangeCopy));

        // Comparing arrays
        int[] arr1 = {1, 2, 3};
        int[] arr2 = {1, 2, 3};
        System.out.println("Arrays equal: " + Arrays.equals(arr1, arr2));
    }
}
\`\`\`

---

## 📚 Advanced String Operations

### **Regular Expressions**
\`\`\`java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexDemo {
    public static void main(String[] args) {
        String text = "Contact us at support@example.com or info@company.org";

        // Email pattern
        String emailPattern = "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b";

        Pattern pattern = Pattern.compile(emailPattern);
        Matcher matcher = pattern.matcher(text);

        System.out.println("Found emails:");
        while (matcher.find()) {
            System.out.println(matcher.group());
        }

        // Splitting with regex
        String csv = "apple,banana,orange,grape";
        String[] fruits = csv.split(",");
        System.out.println("Fruits: " + java.util.Arrays.toString(fruits));

        // Replacing with regex
        String result = text.replaceAll("\\b\\d{4}\\b", "****");
        System.out.println("Masked: " + result);
    }
}
\`\`\`

### **String Formatting**
\`\`\`java
public class StringFormatting {
    public static void main(String[] args) {
        String name = "Alice";
        int age = 25;
        double height = 5.8;

        // Using String.format()
        String formatted = String.format("Name: %s, Age: %d, Height: %.1f",
                                         name, age, height);
        System.out.println(formatted);

        // Using printf()
        System.out.printf("Name: %s, Age: %d, Height: %.1f%n", name, age, height);

        // Format specifiers:
        // %s - String
        // %d - Integer
        // %f - Floating point
        // %.1f - Floating point with 1 decimal place
        // %n - Platform-independent newline

        // Padding and alignment
        System.out.printf("'%10s'%n", "Hello");    // Right-aligned in 10 chars
        System.out.printf("'%-10s'%n", "Hello");   // Left-aligned in 10 chars
        System.out.printf("'%05d'%n", 42);         // Zero-padded to 5 digits
    }
}
\`\`\`

---

## ⚠️ Common Array and String Pitfalls

### **Array Index Out of Bounds**
\`\`\`java
public class CommonErrors {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};

        // ❌ Runtime error: ArrayIndexOutOfBoundsException
        // System.out.println(arr[3]);  // Index 3 doesn't exist

        // ✅ Safe access
        if (arr.length > 3) {
            System.out.println(arr[3]);
        }

        // ✅ Proper bounds checking
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Element " + i + ": " + arr[i]);
        }
    }
}
\`\`\`

### **String Immutability Issues**
\`\`\`java
public class StringImmutability {
    public static void main(String[] args) {
        String original = "Hello";

        // This creates a new string, doesn't modify original
        String modified = original.concat(" World");

        System.out.println("Original: " + original);     // "Hello"
        System.out.println("Modified: " + modified);     // "Hello World"

        // For frequent modifications, use StringBuilder
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");  // Modifies the same object
        System.out.println("StringBuilder: " + sb);
    }
}
\`\`\`

---

## 🎯 Best Practices

### **Array Best Practices**
\`\`\`java
public class ArrayBestPractices {
    public static void main(String[] args) {
        // ✅ Use enhanced for loop when possible
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println(num);
        }

        // ✅ Use Arrays utility methods
        int[] copy = Arrays.copyOf(numbers, numbers.length);

        // ✅ Prefer collections for dynamic arrays
        java.util.List<Integer> list = new java.util.ArrayList<>();
        list.add(1);
        list.add(2);
        // List automatically resizes
    }
}
\`\`\`

### **String Best Practices**
\`\`\`java
public class StringBestPractices {
    public static void main(String[] args) {
        // ✅ Use StringBuilder for concatenation in loops
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            result.append(i).append(" ");
        }
        String finalResult = result.toString();

        // ❌ Avoid this (inefficient)
        // String result = "";
        // for (int i = 0; i < 1000; i++) {
        //     result += i + " ";  // Creates new string each time
        // }

        // ✅ Use equals() for string comparison, not ==
        String str1 = new String("Hello");
        String str2 = new String("Hello");
        if (str1.equals(str2)) {  // ✅ Correct
            System.out.println("Strings are equal");
        }

        // ✅ Use String.isEmpty() instead of length check
        String text = "";
        if (text.isEmpty()) {  // ✅ Better than text.length() == 0
            System.out.println("String is empty");
        }
    }
}
\`\`\`

Arrays and strings are fundamental to Java programming. Master these concepts, and you'll handle data effectively in your Java applications! 📊📝`
};

