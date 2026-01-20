import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_3: SubLesson = {
  id: "12.3",
  title: 'Set Interface and HashSet',
  status: 'completed',
  content: "`# ðŸŽ¯ Set Interface and HashSet in Java

The Set interface represents a collection that contains no duplicate elements. It's one of the fundamental interfaces in the Java Collections Framework. HashSet is the most commonly used implementation of the Set interface, providing fast lookups and operations.

---

## ðŸŽ¯ The Set Interface

### **What is a Set?**

A Set is a collection that:
- **Contains no duplicate elements**: Each element appears at most once
- **Does not guarantee order**: Elements may or may not be ordered
- **Allows null elements**: Most implementations allow one null element
- **Provides fast lookups**: Typically O(1) for basic operations

### **Core Set Operations**

\`"\`\`java
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;

public class SetInterfaceDemo {
    public static void main(String[] args) {
        // Creating a Set (using HashSet implementation)
        Set<String> names = new HashSet<>();

        // Adding elements (duplicates are automatically ignored)
        System.out.println("Adding 'Alice': " + names.add("Alice"));     // true
        System.out.println("Adding 'Bob': " + names.add("Bob"));         // true
        System.out.println("Adding 'Alice' again: " + names.add("Alice")); // false (duplicate)

        System.out.println("Set: " + names);  // [Alice, Bob] (order may vary)

        // Checking containment
        System.out.println("Contains Alice: " + names.contains("Alice"));    // true
        System.out.println("Contains Charlie: " + names.contains("Charlie")); // false

        // Size operations
        System.out.println("Size: " + names.size());               // 2
        System.out.println("Is empty: " + names.isEmpty());        // false

        // Removing elements
        System.out.println("Removing Bob: " + names.remove("Bob"));       // true
        System.out.println("Removing Charlie: " + names.remove("Charlie")); // false (not present)
        System.out.println("Set after removals: " + names);               // [Alice]

        // Bulk operations
        Set<String> moreNames = new HashSet<>(Arrays.asList("David", "Eve", "Alice"));
        names.addAll(moreNames);
        System.out.println("After addAll: " + names);  // [Alice, David, Eve]

        // Set operations
        Set<String> otherSet = new HashSet<>(Arrays.asList("Alice", "Frank", "Grace"));

        // Union (addAll)
        Set<String> union = new HashSet<>(names);
        union.addAll(otherSet);
        System.out.println("Union: " + union);  // [Alice, David, Eve, Frank, Grace]

        // Intersection (retainAll)
        Set<String> intersection = new HashSet<>(names);
        intersection.retainAll(otherSet);
        System.out.println("Intersection: " + intersection);  // [Alice]

        // Difference (removeAll)
        Set<String> difference = new HashSet<>(names);
        difference.removeAll(otherSet);
        System.out.println("Difference: " + difference);  // [David, Eve]

        // Clearing the set
        names.clear();
        System.out.println("After clear - Size: " + names.size());  // 0
    }
}
\`\`\`

### **Set Iteration**

\`\`\`java
import java.util.Set;
import java.util.HashSet;
import java.util.Iterator;

public class SetIteration {
    public static void main(String[] args) {
        Set<String> fruits = new HashSet<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Date");

        // For-each iteration (recommended for Sets)
        System.out.println("For-each iteration:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Iterator iteration
        System.out.println("\\nIterator iteration:");
        Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
            // Safe removal during iteration
            if (fruit.equals("Banana")) {
                iterator.remove();
            }
        }
        System.out.println("After iterator removal: " + fruits);

        // Converting to array for indexed access
        String[] fruitArray = fruits.toArray(new String[0]);
        System.out.println("\\nAs array:");
        for (int i = 0; i < fruitArray.length; i++) {
            System.out.println("Index " + i + ": " + fruitArray[i]);
        }

        // Java 8+ streams (advanced topic)
        System.out.println("\\nUsing streams:");
        fruits.stream()
              .filter(fruit -> fruit.length() > 5)
              .forEach(System.out::println);
    }
}
\`\`\`

---

## ðŸš€ HashSet - The Primary Set Implementation

### **What is HashSet?**

HashSet is the most commonly used implementation of the Set interface. It uses a hash table (HashMap internally) to store elements, providing constant-time performance for basic operations.

### **Key Characteristics**

- **Fast Operations**: O(1) average time complexity for add, remove, contains
- **No Ordering**: Elements are not stored in any particular order
- **Allows Null**: Can contain one null element
- **Not Thread-Safe**: Multiple threads should not access simultaneously
- **Uses Hashing**: Elements must implement hashCode() and equals() properly

### **HashSet Internals**

\`\`\`java
public class HashSet<E> extends AbstractSet<E>
        implements Set<E>, Cloneable, java.io.Serializable {

    private transient HashMap<E, Object> map;

    // Dummy value to associate with an Object in the backing Map
    private static final Object PRESENT = new Object();

    public HashSet() {
        map = new HashMap<>();
    }

    public boolean add(E e) {
        return map.put(e, PRESENT) == null;
    }

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }
}
\`\`\`

### **HashSet Constructors**

\`\`\`java
import java.util.HashSet;
import java.util.Arrays;
import java.util.List;

public class HashSetConstructors {
    public static void main(String[] args) {
        // 1. Default constructor - initial capacity 16, load factor 0.75
        HashSet<String> defaultSet = new HashSet<>();
        System.out.println("Default HashSet created");

        // 2. Constructor with initial capacity
        HashSet<String> capacitySet = new HashSet<>(50);
        System.out.println("HashSet with initial capacity 50 created");

        // 3. Constructor with capacity and load factor
        HashSet<String> customSet = new HashSet<>(50, 0.8f);
        System.out.println("HashSet with capacity 50 and load factor 0.8 created");

        // 4. Constructor with Collection parameter
        List<String> list = Arrays.asList("A", "B", "C", "A", "B");  // Contains duplicates
        HashSet<String> fromCollection = new HashSet<>(list);
        System.out.println("HashSet from List: " + fromCollection);  // Duplicates removed: [A, B, C]

        // 5. Copy constructor (creating from another Set)
        HashSet<String> copySet = new HashSet<>(fromCollection);
        copySet.add("D");
        System.out.println("Original: " + fromCollection);  // [A, B, C]
        System.out.println("Copy: " + copySet);             // [A, B, C, D]
    }
}
\`\`\`

### **Load Factor and Rehashing**

\`\`\`java
import java.util.HashSet;

public class HashSetLoadFactor {
    public static void main(String[] args) {
        // Default load factor is 0.75
        HashSet<String> set = new HashSet<>(4, 0.75f);

        System.out.println("Adding elements (capacity starts at 4):");
        for (int i = 0; i < 10; i++) {
            set.add("Element" + i);
            System.out.println("Added Element" + i + ", Size: " + set.size());
            // When size > capacity * loadFactor (4 * 0.75 = 3), rehashing occurs
        }

        System.out.println("Final set: " + set);

        // Higher load factor = more memory efficient but slower operations
        HashSet<String> highLoadFactor = new HashSet<>(100, 0.9f);

        // Lower load factor = faster operations but more memory usage
        HashSet<String> lowLoadFactor = new HashSet<>(100, 0.5f);
    }
}
\`\`\`

---

## âš¡ HashSet Performance Characteristics

### **Time Complexity**

| Operation | Average Case | Worst Case | Notes |
|-----------|--------------|------------|--------|
| \`add(element)\` | O(1) | O(n) | Depends on hash function quality |
| \`remove(element)\` | O(1) | O(n) | Depends on hash function quality |
| \`contains(element)\` | O(1) | O(n) | Depends on hash function quality |
| \`size()\` | O(1) | O(1) | Direct field access |
| \`isEmpty()\` | O(1) | O(1) | Direct field access |
| \`clear()\` | O(n) | O(n) | Must clear all entries |

### **Space Complexity**

- **O(n)** where n is the number of elements
- Additional space for hash table overhead
- Load factor affects space usage vs performance trade-off

### **Performance Tips**

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class HashSetPerformanceTips {
    public static void main(String[] args) {
        // 1. Choose appropriate initial capacity
        Set<String> largeSet = new HashSet<>(100000);  // Better than default 16

        // 2. Use appropriate load factor
        Set<String> fastSet = new HashSet<>(1000, 0.5f);   // Lower load factor = faster
        Set<String> memoryEfficientSet = new HashSet<>(1000, 0.9f);  // Higher load factor = less memory

        // 3. Ensure good hashCode() and equals() implementation
        Set<Person> people = new HashSet<>();

        // 4. Use bulk operations when possible
        Set<String> set1 = new HashSet<>(java.util.Arrays.asList("A", "B", "C"));
        Set<String> set2 = new HashSet<>(java.util.Arrays.asList("C", "D", "E"));

        // Efficient bulk operations
        Set<String> union = new HashSet<>(set1);
        union.addAll(set2);  // Union

        Set<String> intersection = new HashSet<>(set1);
        intersection.retainAll(set2);  // Intersection

        Set<String> difference = new HashSet<>(set1);
        difference.removeAll(set2);  // Difference
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
}
\`\`\`

---

## ðŸ”„ HashSet vs Other Set Implementations

### **HashSet vs TreeSet**

\`\`\`java
import java.util.*;

public class HashSetVsTreeSet {
    public static void main(String[] args) {
        // HashSet: Fast operations, no ordering
        Set<String> hashSet = new HashSet<>(Arrays.asList("Charlie", "Alice", "Bob"));
        System.out.println("HashSet (unordered): " + hashSet);

        // TreeSet: Ordered operations, slower
        Set<String> treeSet = new TreeSet<>(Arrays.asList("Charlie", "Alice", "Bob"));
        System.out.println("TreeSet (sorted): " + treeSet);

        // Performance comparison
        int iterations = 100000;

        // HashSet operations
        Set<Integer> hashSetNumbers = new HashSet<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            hashSetNumbers.add(i);
            hashSetNumbers.contains(i / 2);
        }
        long hashSetTime = System.nanoTime() - startTime;

        // TreeSet operations
        Set<Integer> treeSetNumbers = new TreeSet<>();
        startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            treeSetNumbers.add(i);
            treeSetNumbers.contains(i / 2);
        }
        long treeSetTime = System.nanoTime() - startTime;

        System.out.println("HashSet time: " + hashSetTime / 1000000 + "ms");
        System.out.println("TreeSet time: " + treeSetTime / 1000000 + "ms");

        // TreeSet specific operations
        TreeSet<Integer> sortedNumbers = new TreeSet<>(Arrays.asList(5, 2, 8, 1, 9, 3));
        System.out.println("TreeSet first: " + sortedNumbers.first());
        System.out.println("TreeSet last: " + sortedNumbers.last());
        System.out.println("TreeSet subset (2,8): " + sortedNumbers.subSet(2, 8));
    }
}
\`\`\`

### **HashSet vs LinkedHashSet**

\`\`\`java
import java.util.*;

public class HashSetVsLinkedHashSet {
    public static void main(String[] args) {
        // HashSet: Fastest, no ordering guarantee
        Set<String> hashSet = new HashSet<>();
        hashSet.add("Third");
        hashSet.add("First");
        hashSet.add("Second");
        System.out.println("HashSet (no order): " + hashSet);

        // LinkedHashSet: Maintains insertion order, slightly slower than HashSet
        Set<String> linkedHashSet = new LinkedHashSet<>();
        linkedHashSet.add("Third");
        linkedHashSet.add("First");
        linkedHashSet.add("Second");
        System.out.println("LinkedHashSet (insertion order): " + linkedHashSet);

        // Performance comparison (LinkedHashSet is slightly slower due to linked list overhead)
        int iterations = 50000;

        Set<Integer> hashSetPerf = new HashSet<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            hashSetPerf.add(i);
            hashSetPerf.contains(i / 2);
        }
        long hashSetTime = System.nanoTime() - startTime;

        Set<Integer> linkedHashSetPerf = new LinkedHashSet<>();
        startTime = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            linkedHashSetPerf.add(i);
            linkedHashSetPerf.contains(i / 2);
        }
        long linkedHashSetTime = System.nanoTime() - startTime;

        System.out.println("HashSet time: " + hashSetTime / 1000000 + "ms");
        System.out.println("LinkedHashSet time: " + linkedHashSetTime / 1000000 + "ms");
    }
}
\`\`\`

### **Choosing the Right Set Implementation**

| Use Case | Recommended Implementation | Reason |
|----------|---------------------------|---------|
| Fast lookups, no ordering needed | HashSet | O(1) operations, lowest overhead |
| Elements need to be sorted | TreeSet | Automatic sorting, O(log n) operations |
| Maintain insertion order | LinkedHashSet | Predictable iteration order |
| Memory is critical | HashSet | Least memory overhead |
| Need range operations | TreeSet | first(), last(), subSet(), etc. |
| Thread-safe operations | Collections.synchronizedSet() or ConcurrentSkipListSet | Built-in synchronization |

---

## ðŸ§µ Thread Safety Considerations

### **HashSet is Not Thread-Safe**

\`\`\`java
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class HashSetThreadSafety {
    public static void main(String[] args) throws InterruptedException {
        // Non-thread-safe HashSet (may cause issues with concurrent access)
        Set<String> unsafeSet = new HashSet<>();

        // Thread-safe alternatives
        Set<String> safeSet1 = Collections.synchronizedSet(new HashSet<>());
        Set<String> safeSet2 = java.util.concurrent.ConcurrentHashMap.newKeySet();  // Java 8+

        // Demonstration (may not always show problems due to timing)
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                unsafeSet.add("Item" + i);
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Unsafe set size (may be incorrect): " + unsafeSet.size());

        // Proper thread-safe usage
        Runnable safeTask = () -> {
            for (int i = 0; i < 1000; i++) {
                safeSet1.add("Item" + i);
            }
        };

        Set<String> finalSafeSet = safeSet1;
        Runnable safeTask2 = () -> {
            for (int i = 0; i < 1000; i++) {
                finalSafeSet.add("Item" + i);
            }
        };

        t1 = new Thread(safeTask);
        t2 = new Thread(safeTask2);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Safe set size (correct): " + safeSet1.size());
    }
}
\`\`\`

---

## ðŸŽ¯ Practical HashSet Examples

### **Unique Word Counter**

\`\`\`java
import java.util.*;

public class UniqueWordCounter {
    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox is quick and brown";

        // Split text into words
        String[] words = text.split("\\\\s+");

        // Use HashSet to store unique words
        Set<String> uniqueWords = new HashSet<>();
        for (String word : words) {
            uniqueWords.add(word.toLowerCase());  // Convert to lowercase for case-insensitive uniqueness
        }

        // Use HashMap to count word frequencies
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            word = word.toLowerCase();
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        System.out.println("Original text: " + text);
        System.out.println("Total words: " + words.length);
        System.out.println("Unique words: " + uniqueWords.size());
        System.out.println("Unique words list: " + uniqueWords);

        System.out.println("\\nWord frequencies:");
        for (String word : uniqueWords) {
            System.out.println(word + ": " + wordCount.get(word));
        }

        // Find words that appear only once
        Set<String> uniqueAppearances = new HashSet<>();
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            if (entry.getValue() == 1) {
                uniqueAppearances.add(entry.getKey());
            }
        }
        System.out.println("\\nWords that appear only once: " + uniqueAppearances);

        // Find most frequent word
        String mostFrequent = null;
        int maxCount = 0;
        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                mostFrequent = entry.getKey();
            }
        }
        System.out.println("Most frequent word: '" + mostFrequent + "' appears " + maxCount + " times");
    }
}
\`\`\`

### **Set Operations for Data Analysis**

\`\`\`java
import java.util.*;

public class SetOperationsExample {
    public static void main(String[] args) {
        // Students enrolled in different courses
        Set<String> javaStudents = new HashSet<>(Arrays.asList("Alice", "Bob", "Charlie", "David"));
        Set<String> pythonStudents = new HashSet<>(Arrays.asList("Bob", "Eve", "Frank", "Grace"));
        Set<String> webDevStudents = new HashSet<>(Arrays.asList("Alice", "Charlie", "Eve", "Henry"));

        System.out.println("Java students: " + javaStudents);
        System.out.println("Python students: " + pythonStudents);
        System.out.println("Web Dev students: " + webDevStudents);

        // Students taking multiple courses (intersection)
        Set<String> multiCourseStudents = new HashSet<>(javaStudents);
        multiCourseStudents.retainAll(pythonStudents);
        System.out.println("\\nStudents taking both Java and Python: " + multiCourseStudents);

        // Students taking Java or Python (union)
        Set<String> javaOrPython = new HashSet<>(javaStudents);
        javaOrPython.addAll(pythonStudents);
        System.out.println("Students taking Java or Python: " + javaOrPython);

        // Students taking only Java (difference)
        Set<String> onlyJava = new HashSet<>(javaStudents);
        onlyJava.removeAll(pythonStudents);
        System.out.println("Students taking only Java: " + onlyJava);

        // Students taking only Python
        Set<String> onlyPython = new HashSet<>(pythonStudents);
        onlyPython.removeAll(javaStudents);
        System.out.println("Students taking only Python: " + onlyPython);

        // Students taking all three courses
        Set<String> allThreeCourses = new HashSet<>(javaStudents);
        allThreeCourses.retainAll(pythonStudents);
        allThreeCourses.retainAll(webDevStudents);
        System.out.println("Students taking all three courses: " + allThreeCourses);

        // Students taking at least two courses
        Set<String> atLeastTwoCourses = new HashSet<>();

        // Java and Python
        atLeastTwoCourses.addAll(multiCourseStudents);

        // Java and Web Dev
        Set<String> javaAndWeb = new HashSet<>(javaStudents);
        javaAndWeb.retainAll(webDevStudents);
        atLeastTwoCourses.addAll(javaAndWeb);

        // Python and Web Dev
        Set<String> pythonAndWeb = new HashSet<>(pythonStudents);
        pythonAndWeb.retainAll(webDevStudents);
        atLeastTwoCourses.addAll(pythonAndWeb);

        // All three
        atLeastTwoCourses.addAll(allThreeCourses);

        System.out.println("Students taking at least two courses: " + atLeastTwoCourses);

        // Unique students across all courses
        Set<String> allStudents = new HashSet<>(javaStudents);
        allStudents.addAll(pythonStudents);
        allStudents.addAll(webDevStudents);
        System.out.println("Total unique students: " + allStudents.size());

        // Students not enrolled in any course (empty set example)
        Set<String> allPossibleStudents = new HashSet<>(Arrays.asList(
            "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"
        ));

        Set<String> unenrolledStudents = new HashSet<>(allPossibleStudents);
        unenrolledStudents.removeAll(allStudents);
        System.out.println("Unenrolled students: " + unenrolledStudents);
    }
}
\`\`\`

### **Custom Object Set**

\`\`\`java
import java.util.*;

class Employee {
    private String id;
    private String name;
    private String department;

    public Employee(String id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    // Proper equals() implementation
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee employee = (Employee) obj;
        return Objects.equals(id, employee.id);  // Equality based on ID only
    }

    // Proper hashCode() implementation
    @Override
    public int hashCode() {
        return Objects.hash(id);  // Hash based on ID only
    }

    @Override
    public String toString() {
        return id + ":" + name + "(" + department + ")";
    }

    // Getters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
}

public class CustomObjectSet {
    public static void main(String[] args) {
        Set<Employee> employees = new HashSet<>();

        // Adding employees
        employees.add(new Employee("E001", "Alice Johnson", "Engineering"));
        employees.add(new Employee("E002", "Bob Smith", "Marketing"));
        employees.add(new Employee("E003", "Charlie Brown", "Engineering"));

        // Duplicate employee (same ID) - will be ignored
        employees.add(new Employee("E001", "Alice Johnson", "HR"));  // Same ID, different department

        System.out.println("Employees: " + employees);
        System.out.println("Total employees: " + employees.size());

        // Check containment
        Employee searchEmp = new Employee("E002", "Bob Smith", "Marketing");
        System.out.println("Contains E002: " + employees.contains(searchEmp));

        // Remove employee
        Employee removeEmp = new Employee("E003", "Charlie Brown", "Engineering");
        System.out.println("Removed E003: " + employees.remove(removeEmp));

        System.out.println("Final employees: " + employees);

        // Group employees by department
        Map<String, Set<Employee>> employeesByDept = new HashMap<>();
        for (Employee emp : employees) {
            employeesByDept.computeIfAbsent(emp.getDepartment(), k -> new HashSet<>()).add(emp);
        }

        System.out.println("\\nEmployees by department:");
        for (Map.Entry<String, Set<Employee>> entry : employeesByDept.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
\`\`\`

---

## ðŸŽ¯ Summary

### **Set Interface Key Points**

- **No Duplicates**: Each element appears at most once
- **No Ordering Guarantee**: Elements may not be in any particular order
- **Fast Lookups**: Typically O(1) for contains() operations
- **Allows Null**: Most implementations allow one null element
- **Core Methods**: \`add()\`, \`remove()\`, \`contains()\`, \`size()\`, \`isEmpty()\`

### **HashSet Key Points**

- **Fast Operations**: O(1) average time for add, remove, contains
- **Hash-Based**: Uses hashCode() and equals() for element management
- **No Ordering**: Elements are not stored in sorted order
- **Dynamic Sizing**: Automatically grows as needed
- **Not Thread-Safe**: Use Collections.synchronizedSet() for thread safety

### **Performance Guidelines**

- **Choose HashSet for**: Fast lookups, deduplication, when ordering doesn't matter
- **Choose TreeSet for**: Sorted elements, range queries
- **Choose LinkedHashSet for**: Predictable iteration order
- **Pre-size when possible**: Reduces rehashing overhead
- **Implement hashCode/equals properly**: Critical for custom objects

### **Common Pitfalls**

- **Poor hashCode/equals**: Can cause duplicates or performance issues
- **Concurrent access**: HashSet is not thread-safe
- **Null handling**: Be aware of null element restrictions in some implementations
- **Iteration during modification**: Can cause ConcurrentModificationException

### **Quick Check**
What will be the output of this code?
\`\`\`java
Set<String> set = new HashSet<>(Arrays.asList("A", "B", "C"));
set.add("A");
set.add("D");
System.out.println(set.size() + " " + set.contains("A"));
\`\`\`
Output: 4 true
`
};


