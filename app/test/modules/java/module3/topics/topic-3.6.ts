import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_6: SubLesson = {
  id: "3.6",
  title: 'Simple Collection Operations',
  status: 'completed',
  content: "`# ðŸ”§ Simple Collection Operations in Java

Collections in Java provide powerful operations for manipulating data. Understanding these operations helps you write efficient and clean code.

---

## ðŸ”„ Sorting Collections

### **Collections.sort() Method**
\`"\`\`java
import java.util.*;

public class SortingOperations {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList(
            "Orange", "Apple", "Banana", "Grape", "Mango"
        ));

        System.out.println("Original: " + fruits);

        // Sort in natural order (alphabetical)
        Collections.sort(fruits);
        System.out.println("Sorted (natural): " + fruits);

        // Sort with custom comparator (reverse order)
        Collections.sort(fruits, Collections.reverseOrder());
        System.out.println("Sorted (reverse): " + fruits);
    }
}
\`\`\`

### **Sorting with Custom Comparators**
\`\`\`java
public class CustomSorting {
    static class Person implements Comparable<Person> {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String toString() {
            return name + "(" + age + ")";
        }

        @Override
        public int compareTo(Person other) {
            // Sort by age, then by name
            if (this.age != other.age) {
                return Integer.compare(this.age, other.age);
            }
            return this.name.compareTo(other.name);
        }
    }

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 25),
            new Person("David", 35)
        );

        System.out.println("Original: " + people);

        // Sort using Comparable (natural order)
        Collections.sort(people);
        System.out.println("Sorted by age/name: " + people);

        // Sort by name only
        people.sort(Comparator.comparing(Person::getName));
        System.out.println("Sorted by name: " + people);

        // Sort by age descending
        people.sort(Comparator.comparing(Person::getAge).reversed());
        System.out.println("Sorted by age (desc): " + people);
    }

    // Add getter for Comparator.comparing
    static class Person implements Comparable<Person> {
        private String name;
        private int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String getName() { return name; }
        public int getAge() { return age; }

        public String toString() {
            return name + "(" + age + ")";
        }

        @Override
        public int compareTo(Person other) {
            if (this.age != other.age) {
                return Integer.compare(this.age, other.age);
            }
            return this.name.compareTo(other.name);
        }
    }
}
\`\`\`

---

## ðŸ”€ Reversing Collections

### **Collections.reverse() Method**
\`\`\`java
public class ReversingCollections {
    public static void main(String[] args) {
        List<String> colors = new ArrayList<>(Arrays.asList(
            "Red", "Green", "Blue", "Yellow", "Purple"
        ));

        System.out.println("Original: " + colors);

        // Reverse the entire list
        Collections.reverse(colors);
        System.out.println("Reversed: " + colors);

        // Reverse a sublist
        Collections.reverse(colors.subList(1, 4));  // Reverse elements 1-3
        System.out.println("Partial reverse: " + colors);
    }
}
\`\`\`

### **Reverse Order Sorting**
\`\`\`java
public class ReverseOrderSorting {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);

        System.out.println("Original: " + numbers);

        // Sort in reverse natural order
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("Reverse sorted: " + numbers);

        // Alternative: sort then reverse
        Collections.sort(numbers);  // Normal sort first
        Collections.reverse(numbers);  // Then reverse
        System.out.println("Sort then reverse: " + numbers);
    }
}
\`\`\`

---

## ðŸŽ² Shuffling Collections

### **Collections.shuffle() Method**
\`\`\`java
public class ShufflingCollections {
    public static void main(String[] args) {
        List<String> cards = new ArrayList<>(Arrays.asList(
            "Ace", "King", "Queen", "Jack", "10", "9", "8", "7"
        ));

        System.out.println("Original deck: " + cards);

        // Shuffle the collection (random order)
        Collections.shuffle(cards);
        System.out.println("Shuffled deck: " + cards);

        // Shuffle with custom Random
        Collections.shuffle(cards, new Random(42));  // Reproducible shuffle
        System.out.println("Reproducible shuffle: " + cards);
    }
}
\`\`\`

### **Practical Shuffling Example**
\`\`\`java
public class ShuffleExamples {
    public static void main(String[] args) {
        // Shuffle for randomization
        List<String> questions = new ArrayList<>(Arrays.asList(
            "Question 1", "Question 2", "Question 3", "Question 4", "Question 5"
        ));

        // Randomize question order for quiz
        Collections.shuffle(questions);
        System.out.println("Randomized questions:");
        for (int i = 0; i < questions.size(); i++) {
            System.out.println((i + 1) + ". " + questions.get(i));
        }

        // Shuffle array
        Integer[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        List<Integer> list = Arrays.asList(array);
        Collections.shuffle(list);
        System.out.println("Shuffled array: " + Arrays.toString(array));
    }
}
\`\`\`

---

## ðŸ” Searching in Collections

### **Collections.binarySearch()**
\`\`\`java
public class BinarySearch {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Cherry", "Date", "Elderberry"
        ));

        // Must be sorted for binary search
        Collections.sort(words);
        System.out.println("Sorted list: " + words);

        // Search for existing element
        int index = Collections.binarySearch(words, "Cherry");
        System.out.println("Cherry found at index: " + index);

        // Search for non-existing element
        int notFound = Collections.binarySearch(words, "Fig");
        System.out.println("Fig not found, insertion point: " + (-notFound - 1));

        // Search in sublist
        List<String> sublist = words.subList(1, 4);  // "Banana", "Cherry", "Date"
        int subIndex = Collections.binarySearch(sublist, "Cherry");
        System.out.println("Cherry in sublist at index: " + subIndex);
    }
}
\`\`\`

### **Finding Min/Max Values**
\`\`\`java
public class MinMaxOperations {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(15, 8, 23, 4, 42, 16);

        // Find minimum and maximum
        int min = Collections.min(numbers);
        int max = Collections.max(numbers);
        System.out.println("Numbers: " + numbers);
        System.out.println("Min: " + min + ", Max: " + max);

        // Find min/max with custom comparator
        List<String> fruits = Arrays.asList("Apple", "Banana", "Cherry", "Date");

        // Longest fruit name
        String longest = Collections.max(fruits, Comparator.comparing(String::length));
        String shortest = Collections.min(fruits, Comparator.comparing(String::length));

        System.out.println("Fruits: " + fruits);
        System.out.println("Longest: " + longest + ", Shortest: " + shortest);

        // Find first/last occurrence
        List<String> repeated = Arrays.asList("A", "B", "C", "A", "B", "D");
        System.out.println("List: " + repeated);
        System.out.println("Index of first 'A': " + repeated.indexOf("A"));
        System.out.println("Index of last 'A': " + repeated.lastIndexOf("A"));
    }
}
\`\`\`

---

## ðŸ”„ Rotating Collections

### **Collections.rotate() Method**
\`\`\`java
public class RotatingCollections {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "A", "B", "C", "D", "E", "F"
        ));

        System.out.println("Original: " + list);

        // Rotate right by 2 positions
        Collections.rotate(list, 2);
        System.out.println("Rotated right by 2: " + list);

        // Rotate left by 3 positions (or right by 3)
        Collections.rotate(list, -3);
        System.out.println("Rotated left by 3: " + list);

        // Rotate to bring specific element to front
        int index = list.indexOf("C");
        Collections.rotate(list, -index);
        System.out.println("Rotated to bring 'C' to front: " + list);
    }
}
\`\`\`

### **Practical Rotation Example**
\`\`\`java
public class RotationExamples {
    public static void main(String[] args) {
        // Rotating a queue (simulated)
        List<String> queue = new ArrayList<>(Arrays.asList(
            "Task1", "Task2", "Task3", "Task4", "Task5"
        ));

        System.out.println("Original queue: " + queue);

        // Process first 2 tasks (rotate left to remove from front)
        for (int i = 0; i < 2; i++) {
            String task = queue.remove(0);
            System.out.println("Processed: " + task);
        }
        System.out.println("After processing 2 tasks: " + queue);

        // Rotate to prioritize urgent task
        String urgentTask = "Urgent";
        queue.add(urgentTask);
        System.out.println("Added urgent task: " + queue);

        // Move urgent task to front
        int urgentIndex = queue.indexOf(urgentTask);
        Collections.rotate(queue, queue.size() - urgentIndex - 1);
        System.out.println("Urgent task prioritized: " + queue);
    }
}
\`\`\`

---

## ðŸ”„ Swapping Elements

### **Collections.swap() Method**
\`\`\`java
public class SwappingElements {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "First", "Second", "Third", "Fourth"
        ));

        System.out.println("Original: " + list);

        // Swap two elements
        Collections.swap(list, 0, 2);  // Swap index 0 and 2
        System.out.println("After swapping 0 and 2: " + list);

        // Swap multiple pairs
        Collections.swap(list, 1, 3);  // Swap index 1 and 3
        System.out.println("After swapping 1 and 3: " + list);

        // Bubble sort simulation (swap adjacent elements)
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5);
        List<Integer> mutableNumbers = new ArrayList<>(numbers);

        // Simple bubble sort step (one pass)
        for (int i = 0; i < mutableNumbers.size() - 1; i++) {
            if (mutableNumbers.get(i) > mutableNumbers.get(i + 1)) {
                Collections.swap(mutableNumbers, i, i + 1);
            }
        }
        System.out.println("After bubble sort pass: " + mutableNumbers);
    }
}
\`\`\`

---

## ðŸ“Š Frequency and Counting

### **Collections.frequency() Method**
\`\`\`java
public class FrequencyCounting {
    public static void main(String[] args) {
        List<String> words = Arrays.asList(
            "the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "the"
        );

        System.out.println("Words: " + words);

        // Count frequency of each word
        Set<String> uniqueWords = new HashSet<>(words);
        for (String word : uniqueWords) {
            int frequency = Collections.frequency(words, word);
            System.out.println("'" + word + "' appears " + frequency + " time(s)");
        }

        // Find most frequent word
        String mostFrequent = null;
        int maxFrequency = 0;

        for (String word : uniqueWords) {
            int frequency = Collections.frequency(words, word);
            if (frequency > maxFrequency) {
                maxFrequency = frequency;
                mostFrequent = word;
            }
        }

        System.out.println("Most frequent word: '" + mostFrequent +
                          "' (appears " + maxFrequency + " times)");
    }
}
\`\`\`

---

## ðŸ”„ Replacing Elements

### **Collections.replaceAll() and fill()**
\`\`\`java
public class ReplacingElements {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList(
            "Apple", "Banana", "Apple", "Cherry", "Apple"
        ));

        System.out.println("Original: " + list);

        // Replace all occurrences of "Apple" with "Orange"
        Collections.replaceAll(list, "Apple", "Orange");
        System.out.println("After replaceAll: " + list);

        // Fill entire list with same value
        Collections.fill(list, "Fruit");
        System.out.println("After fill: " + list);

        // Fill sublist
        List<String> numbers = new ArrayList<>(Arrays.asList(
            "One", "Two", "Three", "Four", "Five"
        ));

        System.out.println("Numbers: " + numbers);
        Collections.fill(numbers.subList(1, 4), "X");  // Fill indices 1-3
        System.out.println("After filling sublist: " + numbers);
    }
}
\`\`\`

---

## ðŸ—‚ï¸ Copying Collections

### **Collections.copy() Method**
\`\`\`java
public class CopyingCollections {
    public static void main(String[] args) {
        List<String> source = Arrays.asList("A", "B", "C", "D", "E");

        // Create destination list (must be at least as large)
        List<String> destination = new ArrayList<>();
        for (int i = 0; i < source.size(); i++) {
            destination.add("");
        }

        // Copy all elements
        Collections.copy(destination, source);
        System.out.println("Copied list: " + destination);

        // Copy to existing list (overwrite)
        List<String> target = Arrays.asList("X", "X", "X", "X", "X");
        Collections.copy(target, source);
        System.out.println("Overwritten list: " + target);

        // Partial copy using subList
        List<String> partial = new ArrayList<>(Arrays.asList("1", "2", "3", "4", "5"));
        Collections.copy(partial.subList(1, 4), Arrays.asList("A", "B", "C"));
        System.out.println("Partial copy result: " + partial);
    }
}
\`\`\`

---

## ðŸŽ¯ Best Practices for Collection Operations

### **1. Use Appropriate Data Structures**
\`\`\`java
public class DataStructureChoice {
    public static void main(String[] args) {
        // For frequent searches: HashSet
        Set<String> searchSet = new HashSet<>(Arrays.asList("A", "B", "C"));
        System.out.println("HashSet lookup: " + searchSet.contains("B")); // Fast!

        // For ordered operations: TreeSet
        Set<String> orderedSet = new TreeSet<>(Arrays.asList("C", "A", "B"));
        System.out.println("TreeSet ordered: " + orderedSet); // Sorted!

        // For indexed access: ArrayList
        List<String> indexedList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        System.out.println("ArrayList by index: " + indexedList.get(1)); // Fast!

        // For FIFO operations: LinkedList
        Queue<String> queue = new LinkedList<>(Arrays.asList("A", "B", "C"));
        System.out.println("Queue poll: " + queue.poll()); // Removes first
    }
}
\`\`\`

### **2. Immutable Collections (Java 9+)**
\`\`\`java
import java.util.*;

public class ImmutableCollections {
    public static void main(String[] args) {
        // Immutable list (cannot be modified)
        List<String> immutableList = List.of("A", "B", "C");
        Set<String> immutableSet = Set.of("X", "Y", "Z");
        Map<String, Integer> immutableMap = Map.of("One", 1, "Two", 2);

        System.out.println("Immutable list: " + immutableList);
        System.out.println("Immutable set: " + immutableSet);
        System.out.println("Immutable map: " + immutableMap);

        // These will throw UnsupportedOperationException
        try {
            immutableList.add("D");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify immutable collection");
        }

        // Create mutable copy if needed
        List<String> mutableCopy = new ArrayList<>(immutableList);
        mutableCopy.add("D");
        System.out.println("Mutable copy: " + mutableCopy);
    }
}
\`\`\`

### **3. Stream API for Complex Operations (Java 8+)**
\`\`\`java
import java.util.*;
import java.util.stream.*;

public class StreamOperations {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("hello", "world", "java", "programming");

        // Filter, transform, collect
        List<String> result = words.stream()
            .filter(word -> word.length() > 4)        // Keep words > 4 chars
            .map(String::toUpperCase)                 // Convert to uppercase
            .sorted()                                  // Sort alphabetically
            .collect(Collectors.toList());            // Collect to list

        System.out.println("Stream result: " + result);

        // Complex operations
        double averageLength = words.stream()
            .mapToInt(String::length)
            .average()
            .orElse(0.0);

        System.out.println("Average word length: " + averageLength);

        // Grouping
        Map<Integer, List<String>> groupedByLength = words.stream()
            .collect(Collectors.groupingBy(String::length));

        System.out.println("Grouped by length: " + groupedByLength);
    }
}
\`\`\`

Collection operations in Java provide powerful ways to manipulate data efficiently. Understanding these operations helps you write cleaner and more performant code! ðŸ”§`
};




