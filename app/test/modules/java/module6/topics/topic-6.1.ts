import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_1: SubLesson = {
  id: "6.1",
  title: 'Introduction to Arrays',
  status: 'completed',
  content: `# 📊 Introduction to Arrays in Java

Arrays are fundamental data structures in Java that allow you to store multiple values of the same type in a single variable. They provide efficient access to elements using index-based positioning and are essential for handling collections of data in Java programs.

---

## 🎯 What is an Array?

An **array** is a container object that holds a fixed number of values of a single type. Each item in an array is called an **element**, and each element can be accessed by its **index** (position in the array).

### **Key Characteristics of Arrays**
- **Fixed Size**: Once created, the size cannot be changed
- **Homogeneous**: All elements must be of the same type
- **Index-based Access**: Elements accessed using zero-based indexing
- **Contiguous Memory**: Elements stored in consecutive memory locations
- **Efficient Access**: Constant-time access to any element

---

## 📝 Array Declaration and Creation

### **Array Declaration**

Arrays can be declared in several ways:

\`\`\`java
public class ArrayDeclaration {
    public static void main(String[] args) {
        // Method 1: Declare and create separately
        int[] numbers;           // Declaration
        numbers = new int[5];    // Creation (size 5)

        // Method 2: Declare and create together
        int[] scores = new int[10];     // Integer array of size 10
        String[] names = new String[3]; // String array of size 3
        double[] prices = new double[20]; // Double array of size 20

        // Method 3: Declare, create, and initialize
        int[] values = {1, 2, 3, 4, 5};         // Size 5, initialized
        String[] fruits = {"Apple", "Banana", "Orange"}; // Size 3, initialized

        // Method 4: Anonymous array creation
        int[] anonymous = new int[]{10, 20, 30, 40}; // Size inferred
    }
}
\`\`\`

### **Array Syntax Variations**

Java supports multiple syntax styles for arrays:

\`\`\`java
public class ArraySyntax {
    public static void main(String[] args) {
        // C-style syntax (less common in Java)
        int arr1[];  // Valid but not recommended

        // Java-style syntax (recommended)
        int[] arr2;  // Preferred way

        // Both are equivalent
        arr1 = new int[5];
        arr2 = new int[5];

        // Multiple arrays
        int[] a, b, c;  // All are arrays
        int d[], e, f;   // Only d is array, e and f are ints (confusing!)
    }
}
\`\`\`

---

## 🔢 Array Indexing and Access

### **Zero-Based Indexing**

Arrays use zero-based indexing - the first element is at index 0.

\`\`\`java
public class ArrayIndexing {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        // Accessing elements by index
        System.out.println("First element: " + numbers[0]);   // 10
        System.out.println("Second element: " + numbers[1]);  // 20
        System.out.println("Last element: " + numbers[4]);    // 50

        // Modifying elements
        numbers[2] = 35;  // Change third element from 30 to 35
        System.out.println("Modified third element: " + numbers[2]);

        // Array length
        System.out.println("Array length: " + numbers.length); // 5
    }
}
\`\`\`

### **Array Length Property**

Every array has a \`length\` property that gives the number of elements:

\`\`\`java
public class ArrayLength {
    public static void main(String[] args) {
        int[] emptyArray = new int[0];     // Length: 0
        int[] smallArray = {1, 2};         // Length: 2
        int[] largeArray = new int[1000];  // Length: 1000

        System.out.println("Empty array length: " + emptyArray.length);
        System.out.println("Small array length: " + smallArray.length);
        System.out.println("Large array length: " + largeArray.length);

        // Accessing last element using length
        int[] data = {100, 200, 300, 400};
        int lastElement = data[data.length - 1];  // 400
        System.out.println("Last element: " + lastElement);
    }
}
\`\`\`

---

## 🔄 Iterating Through Arrays

### **Traditional for Loop**

\`\`\`java
public class ArrayIteration {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};

        // Forward iteration
        System.out.println("Forward iteration:");
        for (int i = 0; i < numbers.length; i++) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }

        // Backward iteration
        System.out.println("\\nBackward iteration:");
        for (int i = numbers.length - 1; i >= 0; i--) {
            System.out.println("Index " + i + ": " + numbers[i]);
        }

        // Sum calculation
        int sum = 0;
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        System.out.println("\\nSum of all elements: " + sum);
    }
}
\`\`\`

### **Enhanced for-each Loop**

\`\`\`java
public class EnhancedForLoop {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana", "Orange", "Grape"};

        // Enhanced for-each loop (read-only access)
        System.out.println("Fruits in basket:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }

        // Finding maximum value
        int[] scores = {85, 92, 78, 96, 88};
        int maxScore = scores[0];

        for (int score : scores) {
            if (score > maxScore) {
                maxScore = score;
            }
        }
        System.out.println("\\nHighest score: " + maxScore);

        // Counting elements meeting criteria
        int[] values = {12, 25, 8, 33, 7, 19};
        int countEven = 0;

        for (int value : values) {
            if (value % 2 == 0) {
                countEven++;
            }
        }
        System.out.println("Number of even values: " + countEven);
    }
}
\`\`\`

---

## 🧮 Array Operations

### **Array Initialization Patterns**

\`\`\`java
public class ArrayInitialization {
    public static void main(String[] args) {
        // Initialize with default values
        int[] defaultInts = new int[5];     // All elements are 0
        boolean[] defaultBools = new boolean[3]; // All elements are false
        String[] defaultStrings = new String[4]; // All elements are null

        System.out.println("Default int value: " + defaultInts[0]);
        System.out.println("Default boolean value: " + defaultBools[0]);
        System.out.println("Default String value: " + defaultStrings[0]);

        // Pattern: Initialize with sequence
        int[] sequence = new int[10];
        for (int i = 0; i < sequence.length; i++) {
            sequence[i] = i + 1;  // 1, 2, 3, ..., 10
        }

        // Pattern: Initialize with computed values
        double[] squares = new double[5];
        for (int i = 0; i < squares.length; i++) {
            squares[i] = (i + 1) * (i + 1);  // 1, 4, 9, 16, 25
        }

        // Pattern: Copy from another array
        int[] source = {1, 2, 3, 4, 5};
        int[] destination = new int[source.length];
        for (int i = 0; i < source.length; i++) {
            destination[i] = source[i];
        }
    }
}
\`\`\`

### **Array Searching and Modification**

\`\`\`java
public class ArrayOperations {
    public static void main(String[] args) {
        int[] numbers = {15, 8, 23, 7, 42, 19, 31};

        // Linear search - find element
        int target = 42;
        int foundIndex = -1;
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] == target) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex != -1) {
            System.out.println(target + " found at index " + foundIndex);
        } else {
            System.out.println(target + " not found");
        }

        // Modify elements based on condition
        System.out.println("\\nOriginal array:");
        printArray(numbers);

        // Double all even numbers
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                numbers[i] *= 2;
            }
        }

        System.out.println("\\nAfter doubling even numbers:");
        printArray(numbers);
    }

    // Helper method to print array
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) {
                System.out.print(", ");
            }
        }
        System.out.println();
    }
}
\`\`\`

---

## 🎯 Practical Array Applications

### **Student Grade Management**

\`\`\`java
public class GradeManager {
    public static void main(String[] args) {
        // Student grades
        int[] grades = {85, 92, 78, 96, 88, 75, 89};

        // Calculate statistics
        int sum = 0;
        int highest = grades[0];
        int lowest = grades[0];
        int passCount = 0;

        for (int grade : grades) {
            sum += grade;

            if (grade > highest) highest = grade;
            if (grade < lowest) lowest = grade;
            if (grade >= 60) passCount++;
        }

        double average = (double) sum / grades.length;

        System.out.println("Grade Statistics:");
        System.out.println("Average: " + String.format("%.2f", average));
        System.out.println("Highest: " + highest);
        System.out.println("Lowest: " + lowest);
        System.out.println("Passed: " + passCount + "/" + grades.length);
        System.out.println("Pass Rate: " + String.format("%.1f%%", (passCount * 100.0) / grades.length));
    }
}
\`\`\`

### **Simple Inventory System**

\`\`\`java
public class InventorySystem {
    public static void main(String[] args) {
        // Product data
        String[] productNames = {"Laptop", "Mouse", "Keyboard", "Monitor"};
        double[] prices = {999.99, 25.50, 75.00, 299.99};
        int[] stockLevels = {5, 20, 15, 8};

        // Display inventory
        System.out.println("Current Inventory:");
        System.out.println("==================");
        for (int i = 0; i < productNames.length; i++) {
            System.out.printf("%-10s $%7.2f (Stock: %2d)%n",
                            productNames[i], prices[i], stockLevels[i]);
        }

        // Calculate total inventory value
        double totalValue = 0.0;
        for (int i = 0; i < prices.length; i++) {
            totalValue += prices[i] * stockLevels[i];
        }

        System.out.println("\\nTotal Inventory Value: $" + String.format("%.2f", totalValue));

        // Check low stock items
        System.out.println("\\nLow Stock Alert (less than 10):");
        for (int i = 0; i < stockLevels.length; i++) {
            if (stockLevels[i] < 10) {
                System.out.println("- " + productNames[i] + " (Stock: " + stockLevels[i] + ")");
            }
        }
    }
}
\`\`\`

### **Temperature Data Analysis**

\`\`\`java
public class TemperatureAnalysis {
    public static void main(String[] args) {
        // Weekly temperature readings (°C)
        double[] temperatures = {22.5, 24.1, 19.8, 26.3, 23.7, 21.4, 25.0};

        // Analyze temperature data
        double sum = 0.0;
        double maxTemp = temperatures[0];
        double minTemp = temperatures[0];
        int hotDays = 0;  // Days with temp >= 25°C
        int coldDays = 0;  // Days with temp < 20°C

        for (double temp : temperatures) {
            sum += temp;

            if (temp > maxTemp) maxTemp = temp;
            if (temp < minTemp) minTemp = temp;

            if (temp >= 25.0) hotDays++;
            if (temp < 20.0) coldDays++;
        }

        double averageTemp = sum / temperatures.length;

        System.out.println("Weekly Temperature Analysis:");
        System.out.println("============================");
        System.out.println("Average Temperature: " + String.format("%.1f°C", averageTemp));
        System.out.println("Highest Temperature: " + maxTemp + "°C");
        System.out.println("Lowest Temperature: " + minTemp + "°C");
        System.out.println("Hot Days (≥25°C): " + hotDays);
        System.out.println("Cold Days (<20°C): " + coldDays);

        // Temperature trend
        System.out.println("\\nDaily Temperatures:");
        for (int i = 0; i < temperatures.length; i++) {
            String day = getDayName(i);
            System.out.println(day + ": " + temperatures[i] + "°C");
        }
    }

    private static String getDayName(int index) {
        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"};
        return days[index];
    }
}
\`\`\`

---

## ⚠️ Common Array Mistakes

### **ArrayIndexOutOfBoundsException**

\`\`\`java
public class ArrayErrors {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};

        // ❌ Wrong: Accessing invalid index
        try {
            // int invalid = numbers[10];  // Index 10 doesn't exist (valid: 0-4)
            // int negative = numbers[-1]; // Negative indices not allowed
            System.out.println("Array access would cause exception");
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // ✅ Correct: Always check bounds
        int safeIndex = 2;
        if (safeIndex >= 0 && safeIndex < numbers.length) {
            System.out.println("Safe access: " + numbers[safeIndex]);
        } else {
            System.out.println("Invalid index: " + safeIndex);
        }

        // ✅ Use length property to avoid errors
        for (int i = 0; i < numbers.length; i++) {  // Always safe
            System.out.println("Element " + i + ": " + numbers[i]);
        }
    }
}
\`\`\`

### **Null Pointer with Object Arrays**

\`\`\`java
public class NullPointerIssue {
    public static void main(String[] args) {
        // Object arrays are initialized with null values
        String[] names = new String[3];  // [null, null, null]

        // ❌ Wrong: Calling method on null reference
        try {
            // System.out.println(names[0].length()); // NullPointerException
            System.out.println("Would cause NullPointerException");
        } catch (NullPointerException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // ✅ Correct: Check for null before using
        if (names[0] != null) {
            System.out.println("Length: " + names[0].length());
        } else {
            System.out.println("String is null");
        }

        // ✅ Initialize array elements
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";

        // Now safe to use
        for (String name : names) {
            System.out.println("Name: " + name + " (length: " + name.length() + ")");
        }
    }
}
\`\`\`

---

## 🎯 Array Best Practices

### **1. Validate Array Access**

\`\`\`java
public class ArrayBestPractices {
    public static void main(String[] args) {
        int[] data = {10, 20, 30, 40, 50};

        // ✅ Always validate indices
        int index = 3;
        if (isValidIndex(data, index)) {
            System.out.println("Value at index " + index + ": " + data[index]);
        } else {
            System.out.println("Invalid index: " + index);
        }

        // ✅ Use enhanced for-each when possible
        int sum = 0;
        for (int value : data) {
            sum += value;
        }
        System.out.println("Sum using for-each: " + sum);
    }

    // Helper method for index validation
    public static boolean isValidIndex(int[] array, int index) {
        return index >= 0 && index < array.length;
    }
}
\`\`\`

### **2. Initialize Arrays Properly**

\`\`\`java
public class ProperInitialization {
    public static void main(String[] args) {
        // ✅ Initialize with meaningful defaults
        int[] scores = new int[5];  // Defaults to 0 (meaningful for scores)

        // ✅ Initialize with specific values
        String[] statusOptions = {"Pending", "Processing", "Completed", "Failed"};

        // ✅ Use array literals for small, fixed data
        double[] taxRates = {0.05, 0.10, 0.15, 0.20};  // 5%, 10%, 15%, 20%

        // ❌ Avoid uninitialized arrays
        // int[] uninitialized;  // Compiler error if used before initialization

        // ✅ Initialize object arrays with actual objects
        String[] names = new String[3];
        names[0] = "Alice";
        names[1] = "Bob";
        names[2] = "Charlie";

        // Or use array literals
        String[] colors = {"Red", "Green", "Blue"};
    }
}
\`\`\`

### **3. Handle Edge Cases**

\`\`\`java
public class EdgeCases {
    public static void main(String[] args) {
        // Handle empty arrays
        int[] empty = new int[0];
        System.out.println("Empty array length: " + empty.length);

        // Handle single-element arrays
        int[] single = {42};
        System.out.println("Single element: " + single[0]);

        // Handle large arrays carefully
        final int LARGE_SIZE = 1000000;
        int[] largeArray = new int[LARGE_SIZE];
        System.out.println("Large array created with " + largeArray.length + " elements");

        // Memory considerations
        // Large arrays consume significant memory
        // Consider using collections for dynamic sizing
    }
}
\`\`\`

---

## 🎯 Summary

Arrays are fundamental data structures in Java:

### **Key Concepts**
- **Fixed-size containers** for same-type elements
- **Zero-based indexing** for element access
- **Length property** to determine array size
- **Efficient random access** to any element

### **Declaration Methods**
- \`datatype[] arrayName;\` - Declaration only
- \`datatype[] arrayName = new datatype[size];\` - Declaration with size
- \`datatype[] arrayName = {val1, val2, val3};\` - Declaration with initialization
- \`datatype[] arrayName = new datatype[]{val1, val2, val3};\` - Anonymous initialization

### **Common Operations**
- **Iteration**: for loops and enhanced for-each loops
- **Search**: Linear search through elements
- **Modification**: Update elements by index
- **Statistics**: Sum, average, min, max calculations

### **Best Practices**
- Always check array bounds before access
- Initialize arrays properly to avoid null values
- Use enhanced for-each loops for read-only iteration
- Consider array length in performance-critical code
- Handle edge cases (empty arrays, single elements)

Arrays provide the foundation for more advanced data structures. Master arrays and you'll have the tools to handle collections of data effectively in your Java programs!

### **Quick Check**
What will be the output of this array code?
\`\`\`java
int[] arr = {5, 10, 15, 20};
System.out.println(arr.length);     // 1. ?
System.out.println(arr[0]);         // 2. ?
System.out.println(arr[3]);         // 3. ?
// System.out.println(arr[4]);      // 4. What happens?
\`\`\``
};

