import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_4: SubLesson = {
  id: "3.4",
  title: 'Adding Elements to ArrayLists',
  status: 'completed',
  content: `# ➕ Adding Elements to ArrayLists in Java

Adding elements to an ArrayList is a fundamental operation. Java provides multiple methods to add elements at different positions with different behaviors.

---

## 📝 Basic Add Operations

### **add() Method - Append Elements**
\`\`\`java
import java.util.*;

public class BasicAddOperations {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();

        // Add single element (appends to end)
        fruits.add("Apple");
        System.out.println("After adding Apple: " + fruits);

        fruits.add("Banana");
        fruits.add("Orange");
        System.out.println("After adding more fruits: " + fruits);

        // Add another element
        fruits.add("Grape");
        System.out.println("Final list: " + fruits);
        System.out.println("Size: " + fruits.size());
    }
}
\`\`\`

### **add(index, element) - Insert at Position**
\`\`\`java
public class InsertOperations {
    public static void main(String[] args) {
        List<String> colors = new ArrayList<>(Arrays.asList("Red", "Blue"));

        System.out.println("Original: " + colors);

        // Insert at specific position
        colors.add(1, "Green");  // Insert at index 1
        System.out.println("After inserting Green at index 1: " + colors);

        colors.add(0, "Yellow"); // Insert at beginning
        System.out.println("After inserting Yellow at index 0: " + colors);

        colors.add(colors.size(), "Purple"); // Insert at end (same as add(element))
        System.out.println("After inserting Purple at end: " + colors);
    }
}
\`\`\`

---

## 🔄 Adding Multiple Elements

### **addAll() Method**
\`\`\`java
public class AddAllOperations {
    public static void main(String[] args) {
        List<String> list1 = new ArrayList<>(Arrays.asList("A", "B"));
        List<String> list2 = new ArrayList<>(Arrays.asList("C", "D", "E"));

        System.out.println("List1: " + list1);
        System.out.println("List2: " + list2);

        // Add all elements from list2 to list1
        list1.addAll(list2);
        System.out.println("After addAll: " + list1);

        // Add elements at specific position
        List<String> moreElements = Arrays.asList("X", "Y", "Z");
        list1.addAll(2, moreElements); // Insert at index 2
        System.out.println("After addAll at index 2: " + list1);
    }
}
\`\`\`

### **Using Collections.addAll()**
\`\`\`java
import java.util.*;

public class CollectionsAddAll {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        // Add multiple elements at once
        Collections.addAll(list, "One", "Two", "Three", "Four");
        System.out.println("After Collections.addAll: " + list);

        // Add array elements
        String[] moreItems = {"Five", "Six"};
        Collections.addAll(list, moreItems);
        System.out.println("After adding array: " + list);
    }
}
\`\`\`

---

## 🎨 Advanced Add Patterns

### **Conditional Adding**
\`\`\`java
public class ConditionalAdding {
    public static void main(String[] args) {
        List<Integer> evenNumbers = new ArrayList<>();
        List<Integer> oddNumbers = new ArrayList<>();

        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        // Add to different lists based on condition
        for (int num : numbers) {
            if (num % 2 == 0) {
                evenNumbers.add(num);
            } else {
                oddNumbers.add(num);
            }
        }

        System.out.println("Even numbers: " + evenNumbers);
        System.out.println("Odd numbers: " + oddNumbers);

        // Add with validation
        List<String> validNames = new ArrayList<>();
        String[] names = {"Alice", "Bob", "", "Charlie", null, "David"};

        for (String name : names) {
            if (isValidName(name)) {
                validNames.add(name);
            }
        }

        System.out.println("Valid names: " + validNames);
    }

    static boolean isValidName(String name) {
        return name != null && !name.trim().isEmpty();
    }
}
\`\`\`

### **Adding with Transformations**
\`\`\`java
import java.util.*;
import java.util.stream.*;

public class TransformAndAdd {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("hello", "world", "java");
        List<String> transformedWords = new ArrayList<>();

        // Transform and add
        for (String word : words) {
            String transformed = word.toUpperCase();
            transformedWords.add(transformed);
        }

        System.out.println("Original: " + words);
        System.out.println("Transformed: " + transformedWords);

        // Using Java 8+ streams
        List<String> streamTransformed = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Stream transformed: " + streamTransformed);

        // Add with prefix/suffix
        List<String> prefixedWords = new ArrayList<>();
        for (String word : words) {
            prefixedWords.add("Prefix_" + word + "_Suffix");
        }

        System.out.println("With prefixes: " + prefixedWords);
    }
}
\`\`\`

---

## 🔄 Bulk Add Operations

### **Merging Lists**
\`\`\`java
public class MergingLists {
    public static void main(String[] args) {
        List<String> list1 = Arrays.asList("A", "B", "C");
        List<String> list2 = Arrays.asList("D", "E", "F");
        List<String> list3 = Arrays.asList("G", "H");

        List<String> merged = new ArrayList<>();

        // Method 1: addAll multiple times
        merged.addAll(list1);
        merged.addAll(list2);
        merged.addAll(list3);
        System.out.println("Merged with addAll: " + merged);

        // Method 2: Using streams (Java 8+)
        List<String> streamMerged = Stream.of(list1, list2, list3)
            .flatMap(List::stream)
            .collect(Collectors.toList());
        System.out.println("Merged with streams: " + streamMerged);

        // Method 3: Manual iteration
        List<String> manualMerged = new ArrayList<>();
        addAllElements(manualMerged, list1);
        addAllElements(manualMerged, list2);
        addAllElements(manualMerged, list3);
        System.out.println("Merged manually: " + manualMerged);
    }

    static <T> void addAllElements(List<T> target, List<T> source) {
        for (T element : source) {
            target.add(element);
        }
    }
}
\`\`\`

### **Adding from Arrays**
\`\`\`java
public class ArrayToList {
    public static void main(String[] args) {
        String[] stringArray = {"One", "Two", "Three", "Four", "Five"};
        int[] intArray = {1, 2, 3, 4, 5};

        // Convert arrays to ArrayLists
        List<String> stringList = new ArrayList<>();
        for (String item : stringArray) {
            stringList.add(item);
        }

        List<Integer> intList = new ArrayList<>();
        for (int num : intArray) {
            intList.add(num);
        }

        System.out.println("String list: " + stringList);
        System.out.println("Integer list: " + intList);

        // Using Collections.addAll (efficient for arrays)
        List<String> efficientStringList = new ArrayList<>();
        Collections.addAll(efficientStringList, stringArray);
        System.out.println("Efficient conversion: " + efficientStringList);
    }
}
\`\`\`

---

## 📊 Performance Considerations

### **Capacity Management**
\`\`\`java
public class CapacityManagement {
    public static void main(String[] args) {
        // Default capacity (inefficient for many additions)
        List<String> inefficient = new ArrayList<>();
        long start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            inefficient.add("Item" + i);
        }
        long inefficientTime = System.nanoTime() - start;

        // Pre-allocated capacity (efficient)
        List<String> efficient = new ArrayList<>(10000);
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            efficient.add("Item" + i);
        }
        long efficientTime = System.nanoTime() - start;

        System.out.println("Inefficient time: " + (inefficientTime / 1_000_000) + " ms");
        System.out.println("Efficient time: " + (efficientTime / 1_000_000) + " ms");
        System.out.println("Improvement: " + (inefficientTime / efficientTime) + "x faster");
    }
}
\`\`\`

### **Choosing Add Method**
\`\`\`java
public class AddMethodChoice {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "D", "E"));

        // For appending (most common)
        list.add("F");  // O(1) amortized
        System.out.println("After append: " + list);

        // For inserting at beginning (expensive)
        list.add(0, "Z");  // O(n) - shifts all elements
        System.out.println("After insert at beginning: " + list);

        // For inserting in middle
        list.add(3, "C");  // O(n) - shifts elements after insertion point
        System.out.println("After insert in middle: " + list);
    }
}
\`\`\`

---

## 🚨 Common Add Mistakes

### **Index Out of Bounds**
\`\`\`java
public class CommonMistakes {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C"); // Size 3

        try {
            // Valid indices: 0, 1, 2, 3 (3 is valid for append)
            list.add(3, "D");  // Valid - append at end
            System.out.println("Valid insert: " + list);

            // list.add(5, "E");  // IndexOutOfBoundsException!

        } catch (IndexOutOfBoundsException e) {
            System.out.println("IndexOutOfBoundsException: " + e.getMessage());
        }

        // Safe insert method
        safeInsert(list, 10, "Safe"); // Won't crash
    }

    static void safeInsert(List<String> list, int index, String element) {
        int safeIndex = Math.min(index, list.size());
        list.add(safeIndex, element);
        System.out.println("Safe insert result: " + list);
    }
}
\`\`\`

### **Immutable Lists**
\`\`\`java
public class ImmutableLists {
    public static void main(String[] args) {
        // Arrays.asList() creates fixed-size list
        List<String> fixedSize = Arrays.asList("A", "B", "C");

        try {
            fixedSize.add("D");  // UnsupportedOperationException!
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to fixed-size list: " + e.getMessage());
        }

        // Convert to modifiable ArrayList
        List<String> modifiable = new ArrayList<>(fixedSize);
        modifiable.add("D");
        System.out.println("Modifiable list: " + modifiable);

        // List.of() creates immutable list (Java 9+)
        List<String> immutable = List.of("X", "Y", "Z");
        try {
            immutable.add("W");  // UnsupportedOperationException!
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify immutable list: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🎯 Add Method Best Practices

### **1. Choose the Right Add Method**
\`\`\`java
public class BestPractices {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        // ✅ Append when possible (fastest)
        list.add("First");
        list.add("Second");

        // ✅ Use add(index, element) only when necessary
        list.add(1, "Middle");  // Insert in middle

        // ✅ Use addAll for bulk additions
        list.addAll(Arrays.asList("Fourth", "Fifth"));

        // ✅ Use Collections.addAll for arrays
        Collections.addAll(list, "Sixth", "Seventh");

        System.out.println("Final list: " + list);
    }
}
\`\`\`

### **2. Handle Capacity Efficiently**
\`\`\`java
public class CapacityBestPractice {
    public static void main(String[] args) {
        // Good: Estimate size if known
        List<String> list = new ArrayList<>(100); // Expect ~100 elements

        // Add elements...
        for (int i = 0; i < 50; i++) {
            list.add("Item" + i);
        }

        // Trim when done adding (optional)
        ((ArrayList<String>) list).trimToSize();

        System.out.println("Size: " + list.size());
        System.out.println("Final list: " + list);
    }
}
\`\`\`

### **3. Validate Before Adding**
\`\`\`java
public class ValidationBestPractice {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();

        addIfValid(names, "Alice");
        addIfValid(names, "");      // Invalid - empty
        addIfValid(names, null);    // Invalid - null
        addIfValid(names, "Bob");

        System.out.println("Valid names: " + names);
    }

    static void addIfValid(List<String> list, String name) {
        if (name != null && !name.trim().isEmpty()) {
            list.add(name.trim());
        } else {
            System.out.println("Skipped invalid name: " + name);
        }
    }
}
\`\`\`

Adding elements to ArrayLists is straightforward but understanding the performance implications and choosing the right method is crucial for efficient Java code! ➕`
};



