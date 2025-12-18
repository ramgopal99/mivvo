import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_1: SubLesson = {
  id: 12.1,
  title: 'Introduction to Collections',
  status: 'completed',
  content: `# 📚 Java Collections Framework

The Java Collections Framework is one of the most important and widely used parts of the Java standard library. It provides a unified architecture for storing, manipulating, and processing groups of objects, offering powerful alternatives to traditional arrays.

---

## 🎯 What are Collections?

### **Understanding Collections**

Collections are objects that store multiple elements (objects) in a single unit. Unlike arrays, collections can dynamically resize, provide rich APIs, and offer various implementations optimized for different use cases.

### **Why Use Collections?**

#### **1. Dynamic Sizing**
Collections grow and shrink automatically as needed.

#### **2. Rich Functionality**
Built-in methods for searching, sorting, filtering, and manipulation.

#### **3. Type Safety**
Generics provide compile-time type checking.

#### **4. Performance Optimized**
Different implementations for different access patterns.

#### **5. Interoperability**
Standard interfaces allow easy switching between implementations.

---

## 🏗️ Collections Framework Architecture

### **Core Interfaces**

The Collections Framework is built around a set of core interfaces in the \`java.util\` package:

\`\`\`java
// Core Collection interfaces hierarchy
public class CollectionHierarchy {
    /*
     * Iterable (base interface for all collections)
     * └── Collection (root interface for collections)
     *     ├── List (ordered collection, allows duplicates)
     *     │   ├── ArrayList (resizable array implementation)
     *     │   ├── LinkedList (doubly-linked list implementation)
     *     │   └── Vector (synchronized resizable array)
     *     ├── Set (unordered collection, no duplicates)
     *     │   ├── HashSet (hash table implementation)
     *     │   ├── LinkedHashSet (maintains insertion order)
     *     │   ├── TreeSet (sorted set implementation)
     *     │   └── EnumSet (for enum types)
     *     └── Queue (ordered collection for processing elements)
     *         ├── PriorityQueue (priority-based ordering)
     *         ├── LinkedList (also implements Queue)
     *         └── ArrayDeque (double-ended queue)
     *
     * Map (key-value pairs, separate from Collection hierarchy)
     * ├── HashMap (hash table implementation)
     * ├── LinkedHashMap (maintains insertion order)
     * ├── TreeMap (sorted map implementation)
     * ├── Hashtable (synchronized hash table)
     * └── EnumMap (for enum keys)
     */
}
\`\`\`

### **Collection vs Collections**

\`\`\`java
// Collection (interface) - represents a group of objects
public interface Collection<E> extends Iterable<E> {
    // Methods for managing groups of objects
}

// Collections (utility class) - provides static methods
public class Collections {
    // Static utility methods for collection operations
    public static <T> void sort(List<T> list) { ... }
    public static <T> int binarySearch(List<T> list, T key) { ... }
}
\`\`\`

---

## 📋 The List Interface

### **What is a List?**

A List is an ordered collection that allows duplicate elements and provides positional access to elements.

### **ArrayList - Resizable Array Implementation**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class ArrayListExample {
    public static void main(String[] args) {
        // Creating an ArrayList
        List<String> fruits = new ArrayList<>();

        // Adding elements
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Orange");

        // Adding at specific position
        fruits.add(1, "Mango");  // Insert at index 1

        // Accessing elements
        System.out.println("First fruit: " + fruits.get(0));
        System.out.println("All fruits: " + fruits);

        // Size and emptiness
        System.out.println("Size: " + fruits.size());
        System.out.println("Is empty: " + fruits.isEmpty());

        // Checking containment
        System.out.println("Contains 'Apple': " + fruits.contains("Apple"));

        // Finding index
        System.out.println("Index of 'Banana': " + fruits.indexOf("Banana"));

        // Replacing elements
        fruits.set(2, "Grape");
        System.out.println("After replacement: " + fruits);

        // Removing elements
        fruits.remove("Mango");
        fruits.remove(0);  // Remove by index
        System.out.println("After removals: " + fruits);

        // Iterating through the list
        System.out.println("\\nIterating with for-each:");
        for (String fruit : fruits) {
            System.out.println("- " + fruit);
        }

        // Iterating with traditional for loop
        System.out.println("\\nIterating with indexed loop:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println("Index " + i + ": " + fruits.get(i));
        }

        // Clearing the list
        fruits.clear();
        System.out.println("After clear - Size: " + fruits.size());
    }
}
\`\`\`

### **LinkedList - Doubly-Linked List Implementation**

\`\`\`java
import java.util.LinkedList;
import java.util.ListIterator;

public class LinkedListExample {
    public static void main(String[] args) {
        LinkedList<String> tasks = new LinkedList<>();

        // Adding elements
        tasks.add("Task 1");
        tasks.add("Task 2");
        tasks.add("Task 3");

        // LinkedList-specific methods
        tasks.addFirst("Urgent Task");    // Add to beginning
        tasks.addLast("Low Priority");    // Add to end

        // Accessing first and last elements
        System.out.println("First task: " + tasks.getFirst());
        System.out.println("Last task: " + tasks.getLast());

        // Removing first and last
        System.out.println("Removed first: " + tasks.removeFirst());
        System.out.println("Removed last: " + tasks.removeLast());

        System.out.println("Remaining tasks: " + tasks);

        // Using as a queue (FIFO)
        LinkedList<String> queue = new LinkedList<>();
        queue.offer("Customer 1");  // Add to end
        queue.offer("Customer 2");
        queue.offer("Customer 3");

        System.out.println("\\nProcessing queue:");
        while (!queue.isEmpty()) {
            System.out.println("Serving: " + queue.poll());  // Remove from front
        }

        // Using as a stack (LIFO)
        LinkedList<String> stack = new LinkedList<>();
        stack.push("Page 1");  // Add to front (top)
        stack.push("Page 2");
        stack.push("Page 3");

        System.out.println("\\nBrowser history (LIFO):");
        while (!stack.isEmpty()) {
            System.out.println("Going back to: " + stack.pop());  // Remove from front
        }
    }
}
\`\`\`

### **List Operations and Algorithms**

\`\`\`java
import java.util.*;

public class ListOperations {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6));

        System.out.println("Original list: " + numbers);

        // Sorting
        Collections.sort(numbers);
        System.out.println("Sorted: " + numbers);

        // Reverse sorting
        Collections.sort(numbers, Collections.reverseOrder());
        System.out.println("Reverse sorted: " + numbers);

        // Shuffling
        Collections.shuffle(numbers);
        System.out.println("Shuffled: " + numbers);

        // Finding min/max
        System.out.println("Min: " + Collections.min(numbers));
        System.out.println("Max: " + Collections.max(numbers));

        // Binary search (requires sorted list)
        Collections.sort(numbers);
        int index = Collections.binarySearch(numbers, 5);
        System.out.println("Index of 5: " + index);

        // Frequency count
        List<Integer> repeated = Arrays.asList(1, 2, 2, 3, 3, 3, 4, 4, 4, 4);
        System.out.println("Frequency of 2: " + Collections.frequency(repeated, 2));
        System.out.println("Frequency of 4: " + Collections.frequency(repeated, 4));

        // Rotating elements
        Collections.rotate(numbers, 2);  // Rotate right by 2
        System.out.println("Rotated by 2: " + numbers);

        // Swapping elements
        Collections.swap(numbers, 0, numbers.size() - 1);
        System.out.println("First and last swapped: " + numbers);
    }
}
\`\`\`

---

## 🎯 The Set Interface

### **What is a Set?**

A Set is a collection that contains no duplicate elements and typically does not guarantee element ordering.

### **HashSet - Hash Table Implementation**

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
    public static void main(String[] args) {
        // Creating a HashSet
        Set<String> uniqueWords = new HashSet<>();

        // Adding elements (duplicates are ignored)
        uniqueWords.add("hello");
        uniqueWords.add("world");
        uniqueWords.add("hello");  // Duplicate - ignored
        uniqueWords.add("java");
        uniqueWords.add("world");  // Duplicate - ignored

        System.out.println("Unique words: " + uniqueWords);
        System.out.println("Size: " + uniqueWords.size());

        // Checking containment
        System.out.println("Contains 'java': " + uniqueWords.contains("java"));
        System.out.println("Contains 'python': " + uniqueWords.contains("python"));

        // Removing elements
        uniqueWords.remove("world");
        System.out.println("After removing 'world': " + uniqueWords);

        // Set operations with another set
        Set<String> otherWords = new HashSet<>(Arrays.asList("hello", "python", "javascript"));

        // Union
        Set<String> union = new HashSet<>(uniqueWords);
        union.addAll(otherWords);
        System.out.println("Union: " + union);

        // Intersection
        Set<String> intersection = new HashSet<>(uniqueWords);
        intersection.retainAll(otherWords);
        System.out.println("Intersection: " + intersection);

        // Difference
        Set<String> difference = new HashSet<>(uniqueWords);
        difference.removeAll(otherWords);
        System.out.println("Difference: " + difference);

        // Iterating through set
        System.out.println("\\nIterating through set:");
        for (String word : uniqueWords) {
            System.out.println("- " + word);
        }
    }
}
\`\`\`

### **TreeSet - Sorted Set Implementation**

\`\`\`java
import java.util.TreeSet;
import java.util.Set;

public class TreeSetExample {
    public static void main(String[] args) {
        // TreeSet maintains sorted order
        Set<Integer> numbers = new TreeSet<>();

        // Adding elements (automatically sorted)
        numbers.add(5);
        numbers.add(1);
        numbers.add(8);
        numbers.add(3);
        numbers.add(7);
        numbers.add(1);  // Duplicate - ignored

        System.out.println("Sorted numbers: " + numbers);

        // TreeSet-specific methods
        System.out.println("First (smallest): " + ((TreeSet<Integer>) numbers).first());
        System.out.println("Last (largest): " + ((TreeSet<Integer>) numbers).last());

        // Range operations
        System.out.println("Numbers less than 5: " + ((TreeSet<Integer>) numbers).headSet(5));
        System.out.println("Numbers greater than or equal to 5: " + ((TreeSet<Integer>) numbers).tailSet(5));
        System.out.println("Numbers between 3 and 7: " + ((TreeSet<Integer>) numbers).subSet(3, 8));

        // Ceiling and floor operations
        System.out.println("Ceiling of 4: " + ((TreeSet<Integer>) numbers).ceiling(4));  // Smallest element >= 4
        System.out.println("Floor of 4: " + ((TreeSet<Integer>) numbers).floor(4));      // Largest element <= 4

        // Reverse order iteration
        System.out.println("\\nReverse order:");
        for (Integer num : ((TreeSet<Integer>) numbers).descendingSet()) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}
\`\`\`

### **LinkedHashSet - Maintains Insertion Order**

\`\`\`java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
    public static void main(String[] args) {
        // LinkedHashSet maintains insertion order
        Set<String> orderedUniqueItems = new LinkedHashSet<>();

        // Adding elements in specific order
        orderedUniqueItems.add("First");
        orderedUniqueItems.add("Second");
        orderedUniqueItems.add("Third");
        orderedUniqueItems.add("First");  // Duplicate - ignored

        System.out.println("Insertion order preserved: " + orderedUniqueItems);

        // Useful for maintaining order while eliminating duplicates
        String[] words = {"the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"};

        Set<String> uniqueWords = new LinkedHashSet<>();
        for (String word : words) {
            uniqueWords.add(word);
        }

        System.out.println("Original: " + Arrays.toString(words));
        System.out.println("Unique (order preserved): " + uniqueWords);
    }
}
\`\`\`

---

## 🔑 The Map Interface

### **What is a Map?**

A Map is a collection that stores key-value pairs. Each key maps to exactly one value, and keys must be unique.

### **HashMap - Hash Table Implementation**

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
    public static void main(String[] args) {
        // Creating a HashMap
        Map<String, Integer> studentGrades = new HashMap<>();

        // Adding key-value pairs
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);
        studentGrades.put("Diana", 88);

        // Accessing values by key
        System.out.println("Alice's grade: " + studentGrades.get("Alice"));
        System.out.println("Bob's grade: " + studentGrades.get("Bob"));

        // Checking if key exists
        System.out.println("Has Charlie: " + studentGrades.containsKey("Charlie"));
        System.out.println("Has Eve: " + studentGrades.containsKey("Eve"));

        // Checking if value exists
        System.out.println("Someone got 95: " + studentGrades.containsValue(95));

        // Size and emptiness
        System.out.println("Number of students: " + studentGrades.size());
        System.out.println("Is empty: " + studentGrades.isEmpty());

        // Updating values
        studentGrades.put("Alice", 97);  // Overwrites existing value
        System.out.println("Alice's updated grade: " + studentGrades.get("Alice"));

        // Using putIfAbsent (only adds if key doesn't exist)
        studentGrades.putIfAbsent("Eve", 90);
        studentGrades.putIfAbsent("Alice", 100);  // Won't change Alice's grade
        System.out.println("Eve's grade: " + studentGrades.get("Eve"));

        // Iterating through keys
        System.out.println("\\nAll students:");
        for (String name : studentGrades.keySet()) {
            System.out.println(name + ": " + studentGrades.get(name));
        }

        // Iterating through entries
        System.out.println("\\nAll entries:");
        for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }

        // Removing entries
        studentGrades.remove("Bob");
        System.out.println("\\nAfter removing Bob: " + studentGrades);

        // Clearing the map
        studentGrades.clear();
        System.out.println("After clear - Size: " + studentGrades.size());
    }
}
\`\`\`

### **TreeMap - Sorted Map Implementation**

\`\`\`java
import java.util.TreeMap;
import java.util.Map;

public class TreeMapExample {
    public static void main(String[] args) {
        // TreeMap maintains sorted order by keys
        Map<String, Integer> phoneBook = new TreeMap<>();

        // Adding entries (automatically sorted by keys)
        phoneBook.put("Charlie", 12345);
        phoneBook.put("Alice", 67890);
        phoneBook.put("Bob", 54321);
        phoneBook.put("Diana", 98765);

        System.out.println("Sorted phone book: " + phoneBook);

        // TreeMap-specific methods
        System.out.println("First key: " + ((TreeMap<String, Integer>) phoneBook).firstKey());
        System.out.println("Last key: " + ((TreeMap<String, Integer>) phoneBook).lastKey());

        // Range operations
        System.out.println("Keys before 'Charlie': " + ((TreeMap<String, Integer>) phoneBook).headMap("Charlie"));
        System.out.println("Keys after 'Bob': " + ((TreeMap<String, Integer>) phoneBook).tailMap("Bob"));
        System.out.println("Keys between 'Bob' and 'Diana': " + ((TreeMap<String, Integer>) phoneBook).subMap("Bob", "Diana"));

        // Ceiling and floor operations
        System.out.println("Ceiling key for 'Ben': " + ((TreeMap<String, Integer>) phoneBook).ceilingKey("Ben"));
        System.out.println("Floor key for 'Ben': " + ((TreeMap<String, Integer>) phoneBook).floorKey("Ben"));
    }
}
\`\`\`

### **LinkedHashMap - Maintains Insertion Order**

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapExample {
    public static void main(String[] args) {
        // LinkedHashMap maintains insertion order
        Map<String, String> userPreferences = new LinkedHashMap<>();

        // Adding preferences in specific order
        userPreferences.put("theme", "dark");
        userPreferences.put("language", "en");
        userPreferences.put("timezone", "UTC");
        userPreferences.put("notifications", "enabled");

        System.out.println("User preferences (insertion order): " + userPreferences);

        // Access order example (for LRU cache simulation)
        LinkedHashMap<String, Integer> cache = new LinkedHashMap<>(16, 0.75f, true);

        cache.put("A", 1);
        cache.put("B", 2);
        cache.put("C", 3);

        System.out.println("\\nInitial cache: " + cache);

        // Accessing elements changes their order
        cache.get("A");  // Moves A to end
        cache.get("B");  // Moves B to end

        System.out.println("After accessing A and B: " + cache);
    }
}
\`\`\`

---

## 🧮 Generics in Collections

### **Type Safety with Generics**

\`\`\`java
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

public class GenericsExample {
    public static void main(String[] args) {
        // Generic List - only Strings
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        // names.add(123);  // Compilation error - not a String

        // Generic Map - String keys, Integer values
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Math", 95);
        scores.put("Science", 87);
        // scores.put(123, "good");  // Compilation error - wrong types

        // Raw types (avoid these!)
        List rawList = new ArrayList();  // No type checking
        rawList.add("String");
        rawList.add(123);  // Allowed but dangerous
        rawList.add(new Object());

        // Using raw types requires casting (unsafe)
        String first = (String) rawList.get(0);  // OK
        // Integer second = (Integer) rawList.get(0);  // ClassCastException at runtime

        System.out.println("Generic list: " + names);
        System.out.println("Generic map: " + scores);
        System.out.println("Raw list: " + rawList);
    }
}
\`\`\`

### **Generic Methods and Wildcards**

\`\`\`java
import java.util.*;

public class GenericMethods {
    // Generic method
    public static <T> void printList(List<T> list) {
        for (T item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    // Wildcard method - accepts any type of list
    public static void printListWildcard(List<?> list) {
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    // Upper bounded wildcard
    public static double sumOfNumbers(List<? extends Number> numbers) {
        double sum = 0.0;
        for (Number num : numbers) {
            sum += num.doubleValue();
        }
        return sum;
    }

    // Lower bounded wildcard
    public static void addIntegers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }

    public static void main(String[] args) {
        List<String> strings = Arrays.asList("A", "B", "C");
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Generic method
        printList(strings);
        printList(numbers);

        // Wildcard method
        printListWildcard(strings);
        printListWildcard(numbers);

        // Upper bounded wildcard
        System.out.println("Sum: " + sumOfNumbers(numbers));

        // Lower bounded wildcard
        List<Number> numberList = new ArrayList<>();
        addIntegers(numberList);
        System.out.println("Number list: " + numberList);
    }
}
\`\`\`

---

## 🎯 Practical Collection Examples

### **Student Management System**

\`\`\`java
import java.util.*;

public class StudentManagementSystem {
    private Map<String, Student> students = new HashMap<>();
    private List<String> enrolledStudents = new ArrayList<>();
    private Set<String> courses = new TreeSet<>();

    public void addStudent(String id, String name, int age) {
        Student student = new Student(id, name, age);
        students.put(id, student);
        enrolledStudents.add(id);
    }

    public void enrollInCourse(String studentId, String courseName) {
        Student student = students.get(studentId);
        if (student != null) {
            student.addCourse(courseName);
            courses.add(courseName);
        }
    }

    public void displayAllStudents() {
        System.out.println("All Students:");
        for (String id : enrolledStudents) {
            Student student = students.get(id);
            System.out.println(student);
        }
    }

    public void displayStudentsByCourse(String courseName) {
        System.out.println("\\nStudents enrolled in " + courseName + ":");
        for (Student student : students.values()) {
            if (student.getCourses().contains(courseName)) {
                System.out.println("- " + student.getName());
            }
        }
    }

    public void displayCourseStatistics() {
        System.out.println("\\nCourse Statistics:");
        for (String course : courses) {
            int count = 0;
            for (Student student : students.values()) {
                if (student.getCourses().contains(course)) {
                    count++;
                }
            }
            System.out.println(course + ": " + count + " students");
        }
    }

    public static void main(String[] args) {
        StudentManagementSystem sms = new StudentManagementSystem();

        // Add students
        sms.addStudent("S001", "Alice Johnson", 20);
        sms.addStudent("S002", "Bob Smith", 21);
        sms.addStudent("S003", "Carol Davis", 19);
        sms.addStudent("S004", "David Wilson", 22);

        // Enroll in courses
        sms.enrollInCourse("S001", "Java Programming");
        sms.enrollInCourse("S001", "Database Systems");
        sms.enrollInCourse("S002", "Java Programming");
        sms.enrollInCourse("S002", "Web Development");
        sms.enrollInCourse("S003", "Java Programming");
        sms.enrollInCourse("S003", "Database Systems");
        sms.enrollInCourse("S004", "Web Development");

        // Display information
        sms.displayAllStudents();
        sms.displayStudentsByCourse("Java Programming");
        sms.displayCourseStatistics();
    }
}

class Student {
    private String id;
    private String name;
    private int age;
    private Set<String> courses;

    public Student(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.courses = new HashSet<>();
    }

    public void addCourse(String course) {
        courses.add(course);
    }

    public Set<String> getCourses() {
        return courses;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public String toString() {
        return id + ": " + name + " (" + age + " years) - Courses: " + courses;
    }
}
\`\`\`

### **Word Frequency Counter**

\`\`\`java
import java.util.*;

public class WordFrequencyCounter {
    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox is quick";

        // Split text into words
        String[] words = text.split("\\\\s+");

        // Count word frequencies
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        // Sort by frequency (descending)
        List<Map.Entry<String, Integer>> sortedWords = new ArrayList<>(wordCount.entrySet());
        sortedWords.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        // Display results
        System.out.println("Word Frequency Analysis:");
        System.out.println("========================");
        for (Map.Entry<String, Integer> entry : sortedWords) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Find most frequent word
        Map.Entry<String, Integer> mostFrequent = sortedWords.get(0);
        System.out.println("\\nMost frequent word: '" + mostFrequent.getKey() +
                          "' appears " + mostFrequent.getValue() + " times");

        // Unique words
        Set<String> uniqueWords = new TreeSet<>(wordCount.keySet());
        System.out.println("\\nUnique words (alphabetical): " + uniqueWords);
        System.out.println("Total unique words: " + uniqueWords.size());
    }
}
\`\`\`

---

## 🎯 Summary

The Java Collections Framework provides powerful data structures for managing groups of objects:

### **Key Interfaces and Implementations**

#### **List Interface**
- **ArrayList**: Fast random access, slow insertions/deletions in middle
- **LinkedList**: Fast insertions/deletions, slow random access, good for queues/stacks

#### **Set Interface**
- **HashSet**: Fast lookups, no ordering
- **TreeSet**: Sorted, slower than HashSet
- **LinkedHashSet**: Maintains insertion order

#### **Map Interface**
- **HashMap**: Fast key-value lookups, no ordering
- **TreeMap**: Sorted by keys
- **LinkedHashMap**: Maintains insertion order

### **Collection Operations**
- **Adding**: \`add()\`, \`put()\`
- **Removing**: \`remove()\`, \`clear()\`
- **Accessing**: \`get()\`, \`contains()\`
- **Iterating**: for-each loops, iterators
- **Utilities**: \`Collections.sort()\`, \`Collections.shuffle()\`, etc.

### **Generics**
- **Type Safety**: Compile-time type checking
- **Wildcards**: \`?\`, \`? extends T\`, \`? super T\`
- **Generic Methods**: Type parameters in method signatures

### **Best Practices**
- Choose the right collection for your use case
- Use generics for type safety
- Prefer interfaces over implementations
- Consider performance characteristics
- Use utility methods from Collections class

### **Common Use Cases**
- **Lists**: When order matters and duplicates are allowed
- **Sets**: When uniqueness is required
- **Maps**: When key-value associations are needed
- **Queues**: For FIFO processing
- **Stacks**: For LIFO processing

Master the Collections Framework and you'll have powerful tools for managing data in your Java applications!

### **Quick Check**
What will be the output of this collection code?
\`\`\`java
List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("A");
Set<String> set = new HashSet<>(list);
System.out.println("List size: " + list.size());
System.out.println("Set size: " + set.size());
\`\`\`
Output: List size: 3, Set size: 2
`
};
