import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_5: SubLesson = {
  id: "3.5",
  title: 'Removing Elements from ArrayLists',
  status: 'completed',
  content: "`# ðŸ—‘ï¸ Removing Elements from ArrayLists in Java

Removing elements from ArrayList is a common operation. Java provides multiple methods to remove elements by index, by value, or conditionally.

---

## ðŸ“ Remove by Index

### **remove(int index) Method**
\`"\`\`java
import java.util.*;

public class RemoveByIndex {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Orange", "Grape", "Mango"
        ));

        System.out.println("Original list: " + fruits);

        // Remove by index (returns removed element)
        String removed = fruits.remove(2);  // Remove "Orange" at index 2
        System.out.println("Removed: " + removed);
        System.out.println("After removal: " + fruits);

        // Remove first element (index 0)
        fruits.remove(0);
        System.out.println("After removing first: " + fruits);

        // Remove last element
        fruits.remove(fruits.size() - 1);
        System.out.println("After removing last: " + fruits);
    }
}
\`\`\`

### **Index Bounds Checking**
\`\`\`java
public class SafeRemoveByIndex {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", "C");

        // Safe removal with bounds checking
        int indexToRemove = 5;

        if (indexToRemove >= 0 && indexToRemove < list.size()) {
            String removed = list.remove(indexToRemove);
            System.out.println("Safely removed: " + removed);
        } else {
            System.out.println("Index " + indexToRemove + " is out of bounds");
        }

        System.out.println("Final list: " + list);
    }
}
\`\`\`

---

## ðŸ” Remove by Value

### **remove(Object obj) Method**
\`\`\`java
public class RemoveByValue {
    public static void main(String[] args) {
        List<String> colors = new ArrayList<>(Arrays.asList(
            "Red", "Green", "Blue", "Green", "Yellow"
        ));

        System.out.println("Original list: " + colors);

        // Remove first occurrence of "Green"
        boolean removed = colors.remove("Green");
        System.out.println("Removed 'Green': " + removed);
        System.out.println("After removal: " + colors);

        // Try to remove non-existent element
        boolean notRemoved = colors.remove("Purple");
        System.out.println("Removed 'Purple': " + notRemoved);
        System.out.println("List unchanged: " + colors);
    }
}
\`\`\`

### **Removing Custom Objects**
\`\`\`java
public class RemoveCustomObjects {
    static class Person {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String toString() {
            return name + "(" + age + ")";
        }

        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Person person = (Person) obj;
            return age == person.age && Objects.equals(name, person.name);
        }

        public int hashCode() {
            return Objects.hash(name, age);
        }
    }

    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 25));
        people.add(new Person("Bob", 30));
        people.add(new Person("Alice", 25)); // Duplicate

        System.out.println("Original: " + people);

        // Remove specific person (uses equals method)
        Person toRemove = new Person("Alice", 25);
        boolean removed = people.remove(toRemove);
        System.out.println("Removed Alice: " + removed);
        System.out.println("After removal: " + people);
    }
}
\`\`\`

---

## ðŸ§¹ Bulk Removal Operations

### **removeAll() Method**
\`\`\`java
public class BulkRemoval {
    public static void main(String[] args) {
        List<String> allFruits = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Orange", "Apple", "Grape", "Banana"
        ));

        List<String> fruitsToRemove = Arrays.asList("Apple", "Banana");

        System.out.println("Original: " + allFruits);
        System.out.println("To remove: " + fruitsToRemove);

        // Remove all occurrences of elements in the second list
        boolean changed = allFruits.removeAll(fruitsToRemove);
        System.out.println("Changed: " + changed);
        System.out.println("After removeAll: " + allFruits);
    }
}
\`\`\`

### **retainAll() Method**
\`\`\`java
public class RetainAll {
    public static void main(String[] args) {
        List<String> allItems = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Orange", "Car", "Bike", "Plane"
        ));

        List<String> fruitsOnly = Arrays.asList("Apple", "Banana", "Orange");

        System.out.println("Original: " + allItems);
        System.out.println("Keep only: " + fruitsOnly);

        // Keep only elements that are in the second list
        boolean changed = allItems.retainAll(fruitsOnly);
        System.out.println("Changed: " + changed);
        System.out.println("After retainAll: " + allItems);
    }
}
\`\`\`

---

## ðŸ”„ Conditional Removal

### **Using Iterator.remove()**
\`\`\`java
import java.util.*;

public class ConditionalRemoval {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList(
            "apple", "Banana", "orange", "GRAPE", "Pineapple"
        ));

        System.out.println("Original: " + words);

        // Remove elements that start with uppercase (safe way)
        Iterator<String> iterator = words.iterator();
        while (iterator.hasNext()) {
            String word = iterator.next();
            if (Character.isUpperCase(word.charAt(0))) {
                iterator.remove();
            }
        }

        System.out.println("After removing uppercase starts: " + words);

        // Reset list for next example
        words.addAll(Arrays.asList("Banana", "GRAPE"));
        System.out.println("After adding back: " + words);

        // Remove elements shorter than 6 characters
        words.removeIf(word -> word.length() < 6);
        System.out.println("After removing short words: " + words);
    }
}
\`\`\`

### **Using removeIf() (Java 8+)**
\`\`\`java
public class RemoveIfMethod {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        System.out.println("Original: " + numbers);

        // Remove even numbers
        numbers.removeIf(number -> number % 2 == 0);
        System.out.println("After removing evens: " + numbers);

        // Remove numbers greater than 5
        numbers.removeIf(number -> number > 5);
        System.out.println("After removing > 5: " + numbers);
    }
}
\`\`\`

---

## ðŸ—‚ï¸ Advanced Removal Techniques

### **Removing While Iterating**
\`\`\`java
public class SafeIterationRemoval {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "keep", "remove", "keep", "remove", "keep"
        ));

        System.out.println("Original: " + list);

        // âŒ Dangerous: ConcurrentModificationException
        try {
            for (String item : list) {
                if (item.equals("remove")) {
                    list.remove(item);  // Throws exception!
                }
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getClass().getSimpleName());
        }

        // âœ… Safe: Use Iterator
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String item = iterator.next();
            if (item.equals("remove")) {
                iterator.remove();
            }
        }

        System.out.println("Safe removal result: " + list);

        // Reset for next example
        list.addAll(Arrays.asList("remove", "remove"));

        // âœ… Safe: Use removeIf
        list.removeIf(item -> item.equals("remove"));
        System.out.println("removeIf result: " + list);
    }
}
\`\`\`

### **Removing Duplicates**
\`\`\`java
public class RemoveDuplicates {
    public static void main(String[] args) {
        List<String> withDuplicates = Arrays.asList(
            "A", "B", "A", "C", "B", "D", "A"
        );

        System.out.println("With duplicates: " + withDuplicates);

        // Method 1: Using LinkedHashSet (preserves order)
        Set<String> uniqueSet = new LinkedHashSet<>(withDuplicates);
        List<String> withoutDuplicates1 = new ArrayList<>(uniqueSet);
        System.out.println("Method 1 (LinkedHashSet): " + withoutDuplicates1);

        // Method 2: Using Stream.distinct()
        List<String> withoutDuplicates2 = withDuplicates.stream()
            .distinct()
            .collect(Collectors.toList());
        System.out.println("Method 2 (Stream.distinct): " + withoutDuplicates2);
    }
}
\`\`\`

---

## ðŸ“Š Performance Considerations

### **Removal Performance**
\`\`\`java
public class RemovalPerformance {
    public static void main(String[] args) {
        // ArrayList removal is O(n) because elements need to be shifted
        List<String> list = new ArrayList<>();

        // Add many elements
        for (int i = 0; i < 10000; i++) {
            list.add("Item" + i);
        }

        System.out.println("Initial size: " + list.size());

        // Fast removal from end
        long start = System.nanoTime();
        list.remove(list.size() - 1);  // O(1)
        long endTime = System.nanoTime() - start;
        System.out.println("Remove from end: " + (endTime / 1000) + " Î¼s");

        // Slow removal from beginning
        start = System.nanoTime();
        list.remove(0);  // O(n) - shifts all remaining elements
        endTime = System.nanoTime() - start;
        System.out.println("Remove from beginning: " + (endTime / 1000) + " Î¼s");

        System.out.println("Final size: " + list.size());
    }
}
\`\`\`

### **Choosing the Right Removal Method**
\`\`\`java
public class RemovalMethodChoice {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "A", "B", "C", "D", "E", "A", "B"
        ));

        // 1. Remove by index (when you know the position)
        list.remove(2);  // Remove "C"
        System.out.println("After remove(2): " + list);

        // 2. Remove by value (when you know the element)
        list.remove("A");  // Remove first "A"
        System.out.println("After remove(\"A\"): " + list);

        // 3. Remove all occurrences
        list.removeAll(Arrays.asList("B"));
        System.out.println("After removeAll([\"B\"]): " + list);

        // 4. Conditional removal
        list.removeIf(item -> item.equals("D"));
        System.out.println("After removeIf: " + list);

        // 5. Clear entire list
        list.clear();
        System.out.println("After clear(): " + list);
        System.out.println("Is empty: " + list.isEmpty());
    }
}
\`\`\`

---

## âš ï¸ Common Removal Mistakes

### **Index Shifting During Removal**
\`\`\`java
public class IndexShifting {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        System.out.println("Original: " + list);

        // âŒ Wrong: Removing in forward loop (skips elements)
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).equals("B") || list.get(i).equals("D")) {
                list.remove(i);
                // After removing "B" at index 1, "D" shifts to index 2
                // But loop continues to index 3, skipping the new element at index 2
            }
        }
        System.out.println("Wrong way result: " + list);

        // Reset list
        list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        // âœ… Correct: Remove from end to beginning
        for (int i = list.size() - 1; i >= 0; i--) {
            if (list.get(i).equals("B") || list.get(i).equals("D")) {
                list.remove(i);
            }
        }
        System.out.println("Correct way result: " + list);

        // Best: Use Iterator or removeIf
        list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));
        list.removeIf(item -> item.equals("B") || item.equals("D"));
        System.out.println("Best way (removeIf): " + list);
    }
}
\`\`\`

### **Removing from Fixed-Size Lists**
\`\`\`java
public class FixedSizeListRemoval {
    public static void main(String[] args) {
        // Arrays.asList() creates fixed-size list
        List<String> fixedList = Arrays.asList("A", "B", "C");

        try {
            fixedList.remove("B");  // UnsupportedOperationException!
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot remove from fixed-size list: " + e.getMessage());
        }

        // Solution: Convert to ArrayList first
        List<String> modifiableList = new ArrayList<>(fixedList);
        modifiableList.remove("B");
        System.out.println("Modifiable list after removal: " + modifiableList);

        // List.of() also creates immutable list
        List<String> immutableList = List.of("X", "Y", "Z");
        try {
            immutableList.remove("Y");  // UnsupportedOperationException!
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot remove from immutable list: " + e.getMessage());
        }
    }
}
\`\`\`

---

## ðŸŽ¯ Removal Best Practices

### **1. Choose the Right Removal Method**
\`\`\`java
public class RemovalBestPractices {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Orange", "Apple", "Grape"
        ));

        // For single element by index: remove(index)
        list.remove(2);  // Remove "Orange"
        System.out.println("After index removal: " + list);

        // For single element by value: remove(object)
        list.remove("Apple");  // Remove first "Apple"
        System.out.println("After value removal: " + list);

        // For multiple elements: removeAll()
        list.removeAll(Arrays.asList("Apple"));  // Remove all "Apple"
        System.out.println("After removeAll: " + list);

        // For conditional removal: removeIf()
        list.removeIf(fruit -> fruit.length() < 6);
        System.out.println("After conditional removal: " + list);
    }
}
\`\`\`

### **2. Handle Concurrent Modification Safely**
\`\`\`java
public class SafeConcurrentRemoval {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "keep", "remove", "keep", "remove", "keep"
        ));

        // âœ… Safe removal during iteration
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            if (iterator.next().equals("remove")) {
                iterator.remove();  // Safe
            }
        }

        // âœ… Alternative: Collect indices to remove
        List<String> list2 = new ArrayList<>(Arrays.asList(
            "keep", "remove", "keep", "remove", "keep"
        ));

        List<Integer> indicesToRemove = new ArrayList<>();
        for (int i = 0; i < list2.size(); i++) {
            if (list2.get(i).equals("remove")) {
                indicesToRemove.add(i);
            }
        }

        // Remove from highest index to lowest
        for (int i = indicesToRemove.size() - 1; i >= 0; i--) {
            list2.remove((int) indicesToRemove.get(i));
        }

        System.out.println("Safe removal result: " + list2);
    }
}
\`\`\`

### **3. Validate Before Removing**
\`\`\`java
public class ValidationBeforeRemoval {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        // âœ… Check before removing
        String toRemove = "D";
        if (list.contains(toRemove)) {
            list.remove(toRemove);
            System.out.println("Successfully removed: " + toRemove);
        } else {
            System.out.println("Element not found: " + toRemove);
        }

        // âœ… Safe index removal
        int indexToRemove = 5;
        if (indexToRemove >= 0 && indexToRemove < list.size()) {
            String removed = list.remove(indexToRemove);
            System.out.println("Successfully removed at index " + indexToRemove + ": " + removed);
        } else {
            System.out.println("Invalid index: " + indexToRemove);
        }

        System.out.println("Final list: " + list);
    }
}
\`\`\`

Removing elements from ArrayLists requires careful consideration of performance and safety. Always choose the appropriate removal method and handle concurrent modification exceptions properly! ðŸ—‘ï¸`
};




