import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_2: SubLesson = {
  id: "3.2",
  title: 'Creating ArrayLists',
  status: 'completed',
  content: "`# ðŸ“ Creating ArrayLists in Java

ArrayList is the most commonly used implementation of the List interface in Java. It provides a dynamic array that can grow and shrink as needed, making it much more flexible than regular arrays.

---

## ðŸ—ï¸ ArrayList Basics

### **What is ArrayList?**
ArrayList is a resizable array implementation of the List interface. It provides:
- **Dynamic sizing**: Grows automatically as elements are added
- **Fast access**: O(1) access time by index
- **Ordered**: Maintains insertion order
- **Allows duplicates**: Same elements can be added multiple times

\`"\`\`java
import java.util.ArrayList;
import java.util.List;

public class ArrayListBasics {
    public static void main(String[] args) {
        // Creating ArrayList - preferred way
        List<String> names = new ArrayList<>();

        // Or explicitly
        ArrayList<String> cities = new ArrayList<>();

        // Can also specify initial capacity
        List<Integer> numbers = new ArrayList<>(10);  // Initial capacity 10

        System.out.println("Empty ArrayList created!");
        System.out.println("Size: " + names.size());
    }
}
\`\`\`

### **ArrayList vs Array**
\`\`\`java
public class ArrayVsArrayList {
    public static void main(String[] args) {
        // Array - fixed size
        String[] array = new String[3];
        array[0] = "First";
        array[1] = "Second";
        // array[2] = "Third";  // Can't add more without creating new array

        // ArrayList - dynamic size
        List<String> arrayList = new ArrayList<>();
        arrayList.add("First");
        arrayList.add("Second");
        arrayList.add("Third");
        arrayList.add("Fourth");  // No problem!

        System.out.println("Array length: " + array.length);
        System.out.println("ArrayList size: " + arrayList.size());
    }
}
\`\`\`

---

## ðŸ”§ Creating ArrayLists

### **Different Ways to Create ArrayList**
\`\`\`java
import java.util.*;

public class CreatingArrayLists {
    public static void main(String[] args) {
        // Method 1: Empty ArrayList
        List<String> list1 = new ArrayList<>();
        System.out.println("Empty list: " + list1);

        // Method 2: With initial capacity
        List<String> list2 = new ArrayList<>(5);  // Capacity for 5 elements
        System.out.println("Initial capacity: " + list2);

        // Method 3: From another collection
        List<String> source = Arrays.asList("A", "B", "C");
        List<String> list3 = new ArrayList<>(source);
        System.out.println("From collection: " + list3);

        // Method 4: Using Arrays.asList() - fixed size
        List<String> list4 = Arrays.asList("X", "Y", "Z");
        // list4.add("W");  // UnsupportedOperationException!

        // Method 5: Using List.of() - immutable (Java 9+)
        List<String> list5 = List.of("P", "Q", "R");
        // list5.add("S");  // UnsupportedOperationException!

        // Method 6: Double brace initialization (not recommended)
        List<String> list6 = new ArrayList<String>() {{
            add("One");
            add("Two");
            add("Three");
        }};
        System.out.println("Double brace: " + list6);
    }
}
\`\`\`

### **Generic vs Raw Types**
\`\`\`java
public class GenericsExample {
    public static void main(String[] args) {
        // âœ… Generic ArrayList (recommended)
        List<String> names = new ArrayList<>();
        names.add("Alice");
        // names.add(123);  // Compile-time error!

        // âŒ Raw ArrayList (avoid in modern Java)
        List rawList = new ArrayList();  // Raw type
        rawList.add("String");
        rawList.add(123);  // Compiles but dangerous

        // Type casting needed (error-prone)
        String first = (String) rawList.get(0);
        // Integer second = (Integer) rawList.get(1);  // Works
        // String error = (String) rawList.get(1);     // ClassCastException!
    }
}
\`\`\`

---

## âž• Adding Elements

### **Basic Add Operations**
\`\`\`java
public class AddingElements {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();

        // Add single element
        fruits.add("Apple");
        System.out.println("After adding Apple: " + fruits);

        // Add at specific index
        fruits.add(1, "Banana");  // Insert at position 1
        System.out.println("After inserting Banana: " + fruits);

        // Add multiple elements
        fruits.add("Orange");
        fruits.add("Grape");
        System.out.println("Final list: " + fruits);
    }
}
\`\`\`

### **Adding Collections**
\`\`\`java
import java.util.*;

public class AddingCollections {
    public static void main(String[] args) {
        List<String> list1 = new ArrayList<>(Arrays.asList("A", "B"));
        List<String> list2 = new ArrayList<>(Arrays.asList("C", "D", "E"));

        // Add all elements from another collection
        list1.addAll(list2);
        System.out.println("After addAll: " + list1);

        // Add elements at specific position
        List<String> moreElements = Arrays.asList("X", "Y");
        list1.addAll(2, moreElements);  // Insert at index 2
        System.out.println("After addAll at index 2: " + list1);
    }
}
\`\`\`

---

## ðŸ“– Accessing Elements

### **Get by Index**
\`\`\`java
public class AccessingElements {
    public static void main(String[] args) {
        List<String> colors = Arrays.asList("Red", "Green", "Blue", "Yellow");

        // Get element by index
        String firstColor = colors.get(0);      // "Red"
        String thirdColor = colors.get(2);      // "Blue"

        System.out.println("First color: " + firstColor);
        System.out.println("Third color: " + thirdColor);

        // Safe access with bounds checking
        int safeIndex = 5;
        if (safeIndex < colors.size()) {
            String safeColor = colors.get(safeIndex);
            System.out.println("Safe access: " + safeColor);
        } else {
            System.out.println("Index out of bounds!");
        }
    }
}
\`\`\`

### **Iterating Through ArrayList**
\`\`\`java
public class IteratingArrayList {
    public static void main(String[] args) {
        List<String> animals = Arrays.asList("Cat", "Dog", "Bird", "Fish");

        // Method 1: Traditional for loop
        System.out.println("Traditional for loop:");
        for (int i = 0; i < animals.size(); i++) {
            System.out.println("Animal " + i + ": " + animals.get(i));
        }

        // Method 2: Enhanced for loop (for-each)
        System.out.println("\\nEnhanced for loop:");
        for (String animal : animals) {
            System.out.println("Animal: " + animal);
        }

        // Method 3: Iterator
        System.out.println("\\nUsing Iterator:");
        Iterator<String> iterator = animals.iterator();
        while (iterator.hasNext()) {
            String animal = iterator.next();
            System.out.println("Animal: " + animal);
        }

        // Method 4: ListIterator (bidirectional)
        System.out.println("\\nUsing ListIterator (backward):");
        ListIterator<String> listIterator = animals.listIterator(animals.size());
        while (listIterator.hasPrevious()) {
            String animal = listIterator.previous();
            System.out.println("Animal: " + animal);
        }
    }
}
\`\`\`

---

## ðŸ” Searching and Checking

### **Contains and Index Methods**
\`\`\`java
public class SearchingElements {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange", "Apple", "Grape");

        // Check if element exists
        boolean hasBanana = fruits.contains("Banana");
        boolean hasMango = fruits.contains("Mango");

        System.out.println("Contains Banana: " + hasBanana);
        System.out.println("Contains Mango: " + hasMango);

        // Find first occurrence
        int firstApple = fruits.indexOf("Apple");
        int lastApple = fruits.lastIndexOf("Apple");

        System.out.println("First Apple at index: " + firstApple);
        System.out.println("Last Apple at index: " + lastApple);

        // Find non-existent element
        int notFound = fruits.indexOf("Pineapple");
        System.out.println("Pineapple index: " + notFound);  // -1
    }
}
\`\`\`

### **Empty and Size Checks**
\`\`\`java
public class SizeChecks {
    public static void main(String[] args) {
        List<String> emptyList = new ArrayList<>();
        List<String> filledList = Arrays.asList("A", "B", "C");

        // Check if empty
        System.out.println("Empty list isEmpty: " + emptyList.isEmpty());
        System.out.println("Filled list isEmpty: " + filledList.isEmpty());

        // Get size
        System.out.println("Empty list size: " + emptyList.size());
        System.out.println("Filled list size: " + filledList.size());

        // Check if equal
        List<String> anotherFilledList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        System.out.println("Lists equal: " + filledList.equals(anotherFilledList));
    }
}
\`\`\`

---

## ðŸ”„ Converting Arrays to ArrayLists

### **Arrays.asList() Method**
\`\`\`java
import java.util.*;

public class ArrayToArrayList {
    public static void main(String[] args) {
        // Method 1: Arrays.asList() - fixed size
        String[] stringArray = {"One", "Two", "Three"};
        List<String> fixedSizeList = Arrays.asList(stringArray);

        System.out.println("Fixed size list: " + fixedSizeList);
        // fixedSizeList.add("Four");  // UnsupportedOperationException!

        // Method 2: Create new ArrayList from Arrays.asList
        List<String> modifiableList = new ArrayList<>(Arrays.asList(stringArray));
        modifiableList.add("Four");  // This works!
        System.out.println("Modifiable list: " + modifiableList);

        // Method 3: Using Collections.addAll
        List<String> list3 = new ArrayList<>();
        Collections.addAll(list3, stringArray);
        System.out.println("Using Collections.addAll: " + list3);

        // Method 4: Manual loop
        List<String> list4 = new ArrayList<>();
        for (String item : stringArray) {
            list4.add(item);
        }
        System.out.println("Manual loop: " + list4);
    }
}
\`\`\`

---

## ðŸ“‹ ArrayList Best Practices

### **1. Choose Appropriate Initial Capacity**
\`\`\`java
public class CapacityBestPractice {
    public static void main(String[] args) {
        // Good: If you know approximate size
        List<String> names = new ArrayList<>(50);  // Expect ~50 names

        // Avoid: Default capacity (10) with many additions
        List<String> badExample = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            badExample.add("Item" + i);  // Multiple array copies internally
        }

        // Good: Use trimToSize() when done adding
        names.trimToSize();  // Minimize memory usage
    }
}
\`\`\`

### **2. Use Interface Types**
\`\`\`java
public class InterfaceBestPractice {
    public static void main(String[] args) {
        // âœ… Good: Use interface type
        List<String> list = new ArrayList<>();

        // âŒ Avoid: Use concrete type
        ArrayList<String> arrayList = new ArrayList<>();

        // Benefits of interface types:
        // - Flexibility to change implementation
        // - Better encapsulation
        // - Cleaner API
    }
}
\`\`\`

### **3. Handle Concurrent Modification**
\`\`\`java
import java.util.*;

public class ConcurrentModification {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        // âŒ Dangerous: Modifying while iterating
        try {
            for (String item : list) {
                if (item.equals("B")) {
                    list.remove(item);  // ConcurrentModificationException!
                }
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getClass().getSimpleName());
        }

        // âœ… Safe: Use Iterator.remove()
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String item = iterator.next();
            if (item.equals("B")) {
                iterator.remove();  // Safe removal
            }
        }
        System.out.println("After safe removal: " + list);
    }
}
\`\`\`

ArrayList is your go-to choice for most list operations in Java. It provides fast access, dynamic sizing, and a rich set of methods for all your data manipulation needs! ðŸš€`
};




