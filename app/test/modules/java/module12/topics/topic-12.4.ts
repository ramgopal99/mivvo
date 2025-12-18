import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_4: SubLesson = {
  id: "12.4",
  title: 'Map Interface and HashMap',
  status: 'completed',
  content: `# 🗺️ Map Interface and HashMap in Java

The Map interface represents a collection that stores key-value pairs. Unlike other collection types, Map is not a true Collection (it doesn't extend the Collection interface), but it's a fundamental part of the Java Collections Framework. HashMap is the most commonly used implementation of the Map interface.

---

## 🎯 The Map Interface

### **What is a Map?**

A Map is a collection that:
- **Stores key-value pairs**: Each entry has a unique key and an associated value
- **Keys are unique**: No duplicate keys allowed
- **Values can be duplicated**: Multiple keys can map to the same value
- **Provides fast lookups**: Typically O(1) for key-based operations
- **Allows one null key**: Most implementations allow one null key
- **Allows multiple null values**: Values can be null

### **Core Map Operations**

\`\`\`java
import java.util.Map;
import java.util.HashMap;

public class MapInterfaceDemo {
    public static void main(String[] args) {
        // Creating a Map (using HashMap implementation)
        Map<String, Integer> studentGrades = new HashMap<>();

        // Adding key-value pairs
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        studentGrades.put("Charlie", 92);

        // Accessing values by key
        System.out.println("Alice's grade: " + studentGrades.get("Alice"));     // 95
        System.out.println("Bob's grade: " + studentGrades.get("Bob"));         // 87
        System.out.println("Dave's grade: " + studentGrades.get("Dave"));       // null (key not found)

        // Checking key and value existence
        System.out.println("Contains key 'Alice': " + studentGrades.containsKey("Alice"));    // true
        System.out.println("Contains key 'Dave': " + studentGrades.containsKey("Dave"));      // false
        System.out.println("Contains value 95: " + studentGrades.containsValue(95));          // true
        System.out.println("Contains value 100: " + studentGrades.containsValue(100));        // false

        // Size operations
        System.out.println("Size: " + studentGrades.size());                   // 3
        System.out.println("Is empty: " + studentGrades.isEmpty());            // false

        // Updating values
        studentGrades.put("Alice", 97);  // Overwrites existing value
        System.out.println("Alice's updated grade: " + studentGrades.get("Alice"));  // 97

        // Using putIfAbsent (only adds if key doesn't exist)
        studentGrades.putIfAbsent("Dave", 88);
        studentGrades.putIfAbsent("Alice", 100);  // Won't change Alice's grade
        System.out.println("Dave's grade: " + studentGrades.get("Dave"));      // 88
        System.out.println("Alice's grade: " + studentGrades.get("Alice"));    // Still 97

        // Removing entries
        studentGrades.remove("Bob");  // Remove by key
        System.out.println("After removing Bob: " + studentGrades);

        // Conditional remove (remove only if key maps to specific value)
        boolean removed = studentGrades.remove("Alice", 95);  // Won't remove (value is 97)
        System.out.println("Removed Alice with value 95: " + removed);  // false

        removed = studentGrades.remove("Alice", 97);  // Will remove
        System.out.println("Removed Alice with value 97: " + removed);  // true

        System.out.println("Final map: " + studentGrades);
    }
}
\`\`\`

### **Map Iteration**

\`\`\`java
import java.util.Map;
import java.util.HashMap;
import java.util.Set;

public class MapIteration {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("Diana", 88);

        // Iterating over keys
        System.out.println("Iterating over keys:");
        for (String key : scores.keySet()) {
            System.out.println(key + ": " + scores.get(key));
        }

        // Iterating over values
        System.out.println("\\nIterating over values:");
        for (Integer value : scores.values()) {
            System.out.println("Score: " + value);
        }

        // Iterating over entries (recommended approach)
        System.out.println("\\nIterating over entries:");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + " → " + entry.getValue());
        }

        // Using Iterator with entries
        System.out.println("\\nUsing Iterator:");
        java.util.Iterator<Map.Entry<String, Integer>> iterator = scores.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Integer> entry = iterator.next();
            System.out.println(entry.getKey() + " = " + entry.getValue());
            // Can modify value during iteration
            if (entry.getKey().equals("Bob")) {
                entry.setValue(90);  // Update value during iteration
            }
        }
        System.out.println("After updating Bob: " + scores);

        // Java 8+ forEach with lambda
        System.out.println("\\nUsing forEach (Java 8+):");
        scores.forEach((key, value) -> System.out.println(key + " :: " + value));

        // Conditional iteration
        System.out.println("\\nStudents with scores >= 90:");
        scores.entrySet().stream()
              .filter(entry -> entry.getValue() >= 90)
              .forEach(entry -> System.out.println(entry.getKey() + ": " + entry.getValue()));
    }
}
\`\`\`

---

## 🚀 HashMap - The Primary Map Implementation

### **What is HashMap?**

HashMap is the most commonly used implementation of the Map interface. It uses a hash table to store key-value pairs, providing constant-time performance for basic operations.

### **Key Characteristics**

- **Fast Operations**: O(1) average time complexity for put, get, remove
- **No Ordering**: Keys are not stored in any particular order
- **Allows Null**: Can contain one null key and multiple null values
- **Not Thread-Safe**: Multiple threads should not access simultaneously
- **Uses Hashing**: Keys must implement hashCode() and equals() properly

### **HashMap Internals**

\`\`\`java
public class HashMap<K, V> extends AbstractMap<K, V>
        implements Map<K, V>, Cloneable, Serializable {

    // Default initial capacity - MUST be a power of two
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // 16

    // Maximum capacity
    static final int MAXIMUM_CAPACITY = 1 << 30; // 1 billion

    // Default load factor
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    // The table, initialized on first use, and resized as necessary
    transient Node<K, V>[] table;

    // The number of key-value mappings contained in this map
    transient int size;

    // Node class representing each entry
    static class Node<K, V> implements Map.Entry<K, V> {
        final int hash;
        final K key;
        V value;
        Node<K, V> next; // For collision handling (linked list)
    }
}
\`\`\`

### **HashMap Constructors**

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapConstructors {
    public static void main(String[] args) {
        // 1. Default constructor - capacity 16, load factor 0.75
        Map<String, Integer> defaultMap = new HashMap<>();
        System.out.println("Default HashMap created");

        // 2. Constructor with initial capacity
        Map<String, Integer> capacityMap = new HashMap<>(50);
        System.out.println("HashMap with initial capacity 50 created");

        // 3. Constructor with capacity and load factor
        Map<String, Integer> customMap = new HashMap<>(50, 0.8f);
        System.out.println("HashMap with capacity 50 and load factor 0.8 created");

        // 4. Constructor with another Map
        Map<String, Integer> sourceMap = new HashMap<>();
        sourceMap.put("A", 1);
        sourceMap.put("B", 2);
        Map<String, Integer> copyMap = new HashMap<>(sourceMap);
        copyMap.put("C", 3);
        System.out.println("Source map: " + sourceMap);
        System.out.println("Copy map: " + copyMap);

        // 5. Using Map.of() for small immutable maps (Java 9+)
        Map<String, Integer> immutableMap = Map.of("X", 10, "Y", 20, "Z", 30);
        System.out.println("Immutable map: " + immutableMap);
        // immutableMap.put("W", 40); // UnsupportedOperationException

        // 6. Using Map.ofEntries() for larger immutable maps (Java 9+)
        Map<String, Integer> largerImmutableMap = Map.ofEntries(
            Map.entry("P", 100),
            Map.entry("Q", 200),
            Map.entry("R", 300)
        );
        System.out.println("Larger immutable map: " + largerImmutableMap);
    }
}
\`\`\`

### **Hash Function and Collision Handling**

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapInternals {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        // Adding entries
        map.put("Alice", 1);
        map.put("Bob", 2);
        map.put("Charlie", 3);

        // Hash codes for keys
        System.out.println("Hash codes:");
        System.out.println("'Alice' hash: " + "Alice".hashCode());
        System.out.println("'Bob' hash: " + "Bob".hashCode());
        System.out.println("'Charlie' hash: " + "Charlie".hashCode());

        // HashMap uses hash code to determine bucket index
        // index = (hash & (capacity - 1)) for power-of-two capacities

        // Demonstrating collision (when different keys have same bucket index)
        Map<BadHashKey, String> badMap = new HashMap<>();
        badMap.put(new BadHashKey("A"), "Value A");
        badMap.put(new BadHashKey("B"), "Value B");  // Same hash code as "A"
        badMap.put(new BadHashKey("C"), "Value C");  // Same hash code as "A"

        System.out.println("Bad hash map size: " + badMap.size());
        System.out.println("Bad hash map: " + badMap);
    }
}

// Bad hashCode implementation (always returns same value)
class BadHashKey {
    private String value;

    public BadHashKey(String value) {
        this.value = value;
    }

    @Override
    public int hashCode() {
        return 42;  // Always return same hash code - causes collisions!
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BadHashKey that = (BadHashKey) obj;
        return Objects.equals(value, that.value);
    }

    @Override
    public String toString() {
        return "BadHashKey{" + value + '}';
    }
}
\`\`\`

---

## ⚡ HashMap Performance Characteristics

### **Time Complexity**

| Operation | Average Case | Worst Case | Notes |
|-----------|--------------|------------|--------|
| \`put(key, value)\` | O(1) | O(n) | Depends on hash function and collisions |
| \`get(key)\` | O(1) | O(n) | Depends on hash function and collisions |
| \`remove(key)\` | O(1) | O(n) | Depends on hash function and collisions |
| \`containsKey(key)\` | O(1) | O(n) | Depends on hash function and collisions |
| \`containsValue(value)\` | O(n) | O(n) | Always linear search through values |
| \`size()\` | O(1) | O(1) | Direct field access |
| \`isEmpty()\` | O(1) | O(1) | Direct field access |

### **Space Complexity**

- **O(n)** where n is the number of entries
- Additional space for hash table overhead and collision handling
- Load factor affects space usage vs performance trade-off

### **Performance Tips**

\`\`\`java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class HashMapPerformanceTips {
    public static void main(String[] args) {
        // 1. Choose appropriate initial capacity
        Map<String, Integer> largeMap = new HashMap<>(100000);  // Better than default 16

        // 2. Use appropriate load factor
        Map<String, Integer> fastMap = new HashMap<>(1000, 0.5f);    // Lower load factor = faster
        Map<String, Integer> memoryEfficientMap = new HashMap<>(1000, 0.9f);  // Higher load factor = less memory

        // 3. Ensure good hashCode() and equals() implementation
        Map<Person, String> personMap = new HashMap<>();

        // 4. Use containsKey() before get() if null values are possible
        Map<String, String> nullableMap = new HashMap<>();
        nullableMap.put("key1", null);

        // Bad: Can't distinguish between missing key and null value
        String value1 = nullableMap.get("key1");  // null
        String value2 = nullableMap.get("missing");  // null

        // Good: Check existence first
        if (nullableMap.containsKey("key1")) {
            System.out.println("key1 exists with value: " + nullableMap.get("key1"));
        }

        // 5. Use putIfAbsent() for conditional updates
        Map<String, Integer> scores = new HashMap<>();
        scores.putIfAbsent("Alice", 95);  // Adds if not present
        scores.putIfAbsent("Alice", 100); // Won't change existing value

        // 6. Use computeIfAbsent() for lazy initialization
        Map<String, java.util.List<String>> groupedData = new HashMap<>();
        groupedData.computeIfAbsent("fruits", k -> new java.util.ArrayList<>()).add("Apple");
        groupedData.computeIfAbsent("fruits", k -> new java.util.ArrayList<>()).add("Banana");
        groupedData.computeIfAbsent("vegetables", k -> new java.util.ArrayList<>()).add("Carrot");

        System.out.println("Grouped data: " + groupedData);
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }

    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}
\`\`\`

---

## 🔄 HashMap vs Other Map Implementations

### **HashMap vs TreeMap**

\`\`\`java
import java.util.*;

public class HashMapVsTreeMap {
    public static void main(String[] args) {
        // HashMap: Fast operations, no ordering
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Charlie", 3);
        hashMap.put("Alice", 1);
        hashMap.put("Bob", 2);
        System.out.println("HashMap (unordered): " + hashMap);

        // TreeMap: Ordered operations, slower
        Map<String, Integer> treeMap = new TreeMap<>();
        treeMap.put("Charlie", 3);
        treeMap.put("Alice", 1);
        treeMap.put("Bob", 2);
        System.out.println("TreeMap (sorted): " + treeMap);

        // Performance comparison
        int iterations = 100000;

        // HashMap operations
        Map<Integer, String> hashMapPerf = new HashMap<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            hashMapPerf.put(i, "Value" + i);
            hashMapPerf.get(i / 2);
        }
        long hashMapTime = System.nanoTime() - startTime;

        // TreeMap operations
        Map<Integer, String> treeMapPerf = new TreeMap<>();
        startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            treeMapPerf.put(i, "Value" + i);
            treeMapPerf.get(i / 2);
        }
        long treeMapTime = System.nanoTime() - startTime;

        System.out.println("HashMap time: " + hashMapTime / 1000000 + "ms");
        System.out.println("TreeMap time: " + treeMapTime / 1000000 + "ms");

        // TreeMap specific operations
        TreeMap<String, Integer> sortedMap = new TreeMap<>(hashMap);
        System.out.println("TreeMap first key: " + sortedMap.firstKey());
        System.out.println("TreeMap last key: " + sortedMap.lastKey());
        System.out.println("TreeMap submap (A-C): " + sortedMap.subMap("Alice", "Charlie"));
    }
}
\`\`\`

### **HashMap vs LinkedHashMap**

\`\`\`java
import java.util.*;

public class HashMapVsLinkedHashMap {
    public static void main(String[] args) {
        // HashMap: Fastest, no ordering guarantee
        Map<String, Integer> hashMap = new HashMap<>();
        hashMap.put("Third", 3);
        hashMap.put("First", 1);
        hashMap.put("Second", 2);
        System.out.println("HashMap (no order): " + hashMap);

        // LinkedHashMap: Maintains insertion order, slightly slower
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();
        linkedHashMap.put("Third", 3);
        linkedHashMap.put("First", 1);
        linkedHashMap.put("Second", 2);
        System.out.println("LinkedHashMap (insertion order): " + linkedHashMap);

        // LinkedHashMap with access order (for LRU cache)
        Map<String, Integer> accessOrderMap = new LinkedHashMap<>(16, 0.75f, true);
        accessOrderMap.put("A", 1);
        accessOrderMap.put("B", 2);
        accessOrderMap.put("C", 3);

        System.out.println("Initial access order map: " + accessOrderMap);
        accessOrderMap.get("A");  // Accessing moves A to end
        accessOrderMap.get("B");  // Accessing moves B to end
        System.out.println("After accessing A and B: " + accessOrderMap);

        // Performance comparison
        int iterations = 50000;

        Map<Integer, String> hashMapPerf = new HashMap<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            hashMapPerf.put(i, "Value" + i);
            hashMapPerf.get(i / 2);
        }
        long hashMapTime = System.nanoTime() - startTime;

        Map<Integer, String> linkedHashMapPerf = new LinkedHashMap<>();
        startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            linkedHashMapPerf.put(i, "Value" + i);
            linkedHashMapPerf.get(i / 2);
        }
        long linkedHashMapTime = System.nanoTime() - startTime;

        System.out.println("HashMap time: " + hashMapTime / 1000000 + "ms");
        System.out.println("LinkedHashMap time: " + linkedHashMapTime / 1000000 + "ms");
    }
}
\`\`\`

### **Choosing the Right Map Implementation**

| Use Case | Recommended Implementation | Reason |
|----------|---------------------------|---------|
| Fast lookups, no ordering needed | HashMap | O(1) operations, lowest overhead |
| Keys need to be sorted | TreeMap | Automatic sorting, O(log n) operations |
| Maintain insertion/access order | LinkedHashMap | Predictable iteration order |
| Thread-safe operations | ConcurrentHashMap or Collections.synchronizedMap() | Built-in synchronization |
| Need range operations on keys | TreeMap | firstKey(), lastKey(), subMap(), etc. |
| LRU cache implementation | LinkedHashMap (access order) | Automatic reordering on access |
| Small, immutable maps | Map.of() or Map.ofEntries() | Memory efficient, thread-safe |

---

## 🧵 Thread Safety Considerations

### **HashMap is Not Thread-Safe**

\`\`\`java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class HashMapThreadSafety {
    public static void main(String[] args) throws InterruptedException {
        // Non-thread-safe HashMap (may cause issues with concurrent access)
        Map<String, Integer> unsafeMap = new HashMap<>();

        // Thread-safe alternatives
        Map<String, Integer> safeMap1 = Collections.synchronizedMap(new HashMap<>());
        Map<String, Integer> safeMap2 = new ConcurrentHashMap<>();

        // Demonstration (may not always show problems due to timing)
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                unsafeMap.put("Key" + i, i);
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Unsafe map size (may be incorrect): " + unsafeMap.size());

        // Proper thread-safe usage
        Runnable safeTask = () -> {
            for (int i = 0; i < 1000; i++) {
                safeMap1.put("Key" + i, i);
            }
        };

        Map<String, Integer> finalSafeMap = safeMap1;
        Runnable safeTask2 = () -> {
            for (int i = 0; i < 1000; i++) {
                finalSafeMap.put("Key" + i, i);
            }
        };

        t1 = new Thread(safeTask);
        t2 = new Thread(safeTask2);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Safe map size (correct): " + safeMap1.size());
    }
}
\`\`\`

---

## 🎯 Practical HashMap Examples

### **Word Frequency Counter**

\`\`\`java
import java.util.*;

public class WordFrequencyCounter {
    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox is quick and brown";

        // Use HashMap to count word frequencies
        Map<String, Integer> wordCount = new HashMap<>();

        // Split text into words and count
        String[] words = text.split("\\\\s+");
        for (String word : words) {
            word = word.toLowerCase();
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        System.out.println("Word Frequency Analysis:");
        System.out.println("========================");

        // Display all word counts
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Find most frequent word
        String mostFrequent = null;
        int maxCount = 0;
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }

        // Find least frequent words
        int minCount = Integer.MAX_VALUE;
        List<String> leastFrequent = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            if (entry.getValue() < minCount) {
                minCount = entry.getValue();
                leastFrequent.clear();
                leastFrequent.add(entry.getKey());
            } else if (entry.getValue() == minCount) {
                leastFrequent.add(entry.getKey());
            }
        }

        System.out.println("\\nMost frequent word: '" + mostFrequent + "' appears " + maxCount + " times");
        System.out.println("Least frequent words: " + leastFrequent + " appear " + minCount + " times");

        // Sort by frequency (descending)
        List<Map.Entry<String, Integer>> sortedByFrequency = new ArrayList<>(wordCount.entrySet());
        sortedByFrequency.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        System.out.println("\\nWords sorted by frequency:");
        for (Map.Entry<String, Integer> entry : sortedByFrequency) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
\`\`\`

### **Student Grade Book**

\`\`\`java
import java.util.*;

class Student {
    private String id;
    private String name;
    private Map<String, Integer> grades; // Course -> Grade

    public Student(String id, String name) {
        this.id = id;
        this.name = name;
        this.grades = new HashMap<>();
    }

    public void addGrade(String course, int grade) {
        grades.put(course, grade);
    }

    public double getAverageGrade() {
        if (grades.isEmpty()) return 0.0;
        int sum = 0;
        for (int grade : grades.values()) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }

    public Map<String, Integer> getGrades() {
        return new HashMap<>(grades); // Return defensive copy
    }

    public String getId() { return id; }
    public String getName() { return name; }

    @Override
    public String toString() {
        return id + ": " + name + " - Average: " + String.format("%.2f", getAverageGrade()) + " - Grades: " + grades;
    }
}

public class StudentGradeBook {
    private Map<String, Student> students;

    public StudentGradeBook() {
        this.students = new HashMap<>();
    }

    public void addStudent(Student student) {
        students.put(student.getId(), student);
    }

    public void addGrade(String studentId, String course, int grade) {
        Student student = students.get(studentId);
        if (student != null) {
            student.addGrade(course, grade);
        }
    }

    public void displayAllStudents() {
        System.out.println("All Students:");
        for (Student student : students.values()) {
            System.out.println(student);
        }
    }

    public Student findTopStudent() {
        if (students.isEmpty()) return null;

        Student topStudent = null;
        double highestAverage = 0.0;

        for (Student student : students.values()) {
            double average = student.getAverageGrade();
            if (average > highestAverage) {
                highestAverage = average;
                topStudent = student;
            }
        }

        return topStudent;
    }

    public Map<String, Double> getCourseAverages() {
        Map<String, List<Integer>> courseGrades = new HashMap<>();

        // Collect all grades for each course
        for (Student student : students.values()) {
            for (Map.Entry<String, Integer> entry : student.getGrades().entrySet()) {
                String course = entry.getKey();
                int grade = entry.getValue();
                courseGrades.computeIfAbsent(course, k -> new ArrayList<>()).add(grade);
            }
        }

        // Calculate averages
        Map<String, Double> courseAverages = new HashMap<>();
        for (Map.Entry<String, List<Integer>> entry : courseGrades.entrySet()) {
            String course = entry.getKey();
            List<Integer> grades = entry.getValue();
            double average = grades.stream().mapToInt(Integer::intValue).average().orElse(0.0);
            courseAverages.put(course, average);
        }

        return courseAverages;
    }

    public static void main(String[] args) {
        StudentGradeBook gradeBook = new StudentGradeBook();

        Student alice = new Student("S001", "Alice Johnson");
        alice.addGrade("Math", 95);
        alice.addGrade("Science", 92);
        alice.addGrade("English", 88);

        Student bob = new Student("S002", "Bob Smith");
        bob.addGrade("Math", 87);
        bob.addGrade("Science", 90);
        bob.addGrade("English", 85);

        Student charlie = new Student("S003", "Charlie Brown");
        charlie.addGrade("Math", 98);
        charlie.addGrade("Science", 95);
        charlie.addGrade("History", 92);

        gradeBook.addStudent(alice);
        gradeBook.addStudent(bob);
        gradeBook.addStudent(charlie);

        gradeBook.displayAllStudents();

        Student topStudent = gradeBook.findTopStudent();
        System.out.println("\\nTop Student: " + topStudent.getName() +
                          " (Average: " + String.format("%.2f", topStudent.getAverageGrade()) + ")");

        Map<String, Double> courseAverages = gradeBook.getCourseAverages();
        System.out.println("\\nCourse Averages:");
        for (Map.Entry<String, Double> entry : courseAverages.entrySet()) {
            System.out.println(entry.getKey() + ": " + String.format("%.2f", entry.getValue()));
        }
    }
}
\`\`\`

### **Configuration Manager**

\`\`\`java
import java.util.*;

public class ConfigurationManager {
    private static ConfigurationManager instance;
    private Map<String, Object> configurations;

    private ConfigurationManager() {
        this.configurations = new HashMap<>();
        loadDefaultConfigurations();
    }

    public static ConfigurationManager getInstance() {
        if (instance == null) {
            instance = new ConfigurationManager();
        }
        return instance;
    }

    private void loadDefaultConfigurations() {
        configurations.put("app.name", "MyApp");
        configurations.put("app.version", "1.0.0");
        configurations.put("database.url", "jdbc:mysql://localhost:3306/myapp");
        configurations.put("database.username", "admin");
        configurations.put("database.maxConnections", 10);
        configurations.put("cache.enabled", true);
        configurations.put("cache.size", 1000);
        configurations.put("logging.level", "INFO");
        configurations.put("email.smtp.host", "smtp.gmail.com");
        configurations.put("email.smtp.port", 587);
    }

    public void setConfiguration(String key, Object value) {
        configurations.put(key, value);
    }

    public Object getConfiguration(String key) {
        return configurations.get(key);
    }

    public Object getConfiguration(String key, Object defaultValue) {
        return configurations.getOrDefault(key, defaultValue);
    }

    public String getString(String key) {
        Object value = configurations.get(key);
        return value != null ? value.toString() : null;
    }

    public String getString(String key, String defaultValue) {
        Object value = configurations.get(key);
        return value != null ? value.toString() : defaultValue;
    }

    public int getInt(String key) {
        Object value = configurations.get(key);
        return value instanceof Integer ? (Integer) value : 0;
    }

    public int getInt(String key, int defaultValue) {
        Object value = configurations.get(key);
        return value instanceof Integer ? (Integer) value : defaultValue;
    }

    public boolean getBoolean(String key) {
        Object value = configurations.get(key);
        return value instanceof Boolean ? (Boolean) value : false;
    }

    public boolean getBoolean(String key, boolean defaultValue) {
        Object value = configurations.get(key);
        return value instanceof Boolean ? (Boolean) value : defaultValue;
    }

    public Map<String, Object> getAllConfigurations() {
        return new HashMap<>(configurations);
    }

    public void displayConfigurations() {
        System.out.println("Current Configurations:");
        System.out.println("=======================");

        // Group configurations by prefix
        Map<String, Map<String, Object>> groupedConfigs = new TreeMap<>();

        for (Map.Entry<String, Object> entry : configurations.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            int dotIndex = key.indexOf('.');
            String prefix = dotIndex > 0 ? key.substring(0, dotIndex) : "general";
            String subKey = dotIndex > 0 ? key.substring(dotIndex + 1) : key;

            groupedConfigs.computeIfAbsent(prefix, k -> new TreeMap<>()).put(subKey, value);
        }

        for (Map.Entry<String, Map<String, Object>> group : groupedConfigs.entrySet()) {
            System.out.println("\\n" + group.getKey().toUpperCase() + ":");
            for (Map.Entry<String, Object> config : group.getValue().entrySet()) {
                System.out.println("  " + config.getKey() + " = " + config.getValue());
            }
        }
    }

    public static void main(String[] args) {
        ConfigurationManager config = ConfigurationManager.getInstance();

        // Display default configurations
        config.displayConfigurations();

        // Override some configurations
        config.setConfiguration("app.version", "1.1.0");
        config.setConfiguration("database.maxConnections", 20);
        config.setConfiguration("cache.enabled", false);

        System.out.println("\\nAfter modifications:");
        System.out.println("App version: " + config.getString("app.version"));
        System.out.println("Max DB connections: " + config.getInt("database.maxConnections"));
        System.out.println("Cache enabled: " + config.getBoolean("cache.enabled"));
        System.out.println("Non-existent config: " + config.getString("non.existent", "default-value"));
    }
}
\`\`\`

---

## 🎯 Summary

### **Map Interface Key Points**

- **Key-Value Pairs**: Each entry has a unique key and associated value
- **Unique Keys**: No duplicate keys allowed
- **Fast Lookups**: Typically O(1) for key-based operations
- **Allows Null Key**: Most implementations allow one null key
- **Allows Null Values**: Values can be null
- **Core Methods**: \`put()\`, \`get()\`, \`remove()\`, \`containsKey()\`, \`containsValue()\`, \`size()\`

### **HashMap Key Points**

- **Fast Operations**: O(1) average time for put, get, remove
- **Hash-Based**: Uses hashCode() and equals() for key management
- **No Ordering**: Keys are not stored in sorted order
- **Dynamic Sizing**: Automatically grows as needed
- **Not Thread-Safe**: Use Collections.synchronizedMap() for thread safety

### **Performance Guidelines**

- **Choose HashMap for**: Fast key-based lookups, when ordering doesn't matter
- **Choose TreeMap for**: Sorted keys, range operations
- **Choose LinkedHashMap for**: Predictable iteration order
- **Pre-size when possible**: Reduces rehashing overhead
- **Implement hashCode/equals properly**: Critical for custom keys

### **Common Pitfalls**

- **Poor hashCode/equals**: Can cause incorrect behavior or performance issues
- **Null key confusion**: Can't distinguish between missing key and null value without containsKey()
- **Concurrent access**: HashMap is not thread-safe
- **Iteration during modification**: Can cause ConcurrentModificationException

### **Quick Check**
What will be the output of this code?
\`\`\`java
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);
map.put("A", 3);
System.out.println(map.size() + " " + map.get("A"));
\`\`\`
Output: 2 3
`
};

