import { SubLesson } from '../../../data/lessonsData';

export const topic_12_6: SubLesson = {
  id: 12.6,
  title: 'Collections Utility Class',
  status: 'completed',
  content: `# 🛠️ Collections Utility Class in Java

The Collections class is a utility class in Java that provides static methods for operating on collections. It contains polymorphic algorithms that work on collections, providing functionality like sorting, searching, shuffling, and creating synchronized views.

---

## 🎯 What is the Collections Class?

### **Overview**

The Collections class consists exclusively of static methods that operate on or return collections. It provides algorithms that are useful in many different contexts and eliminates the need to write boilerplate code.

### **Key Features**

- **Static Methods**: All methods are static, no instantiation needed
- **Polymorphic Algorithms**: Work with any Collection implementation
- **Type Safety**: Generic methods for type safety
- **Convenience Methods**: Common operations like sorting, searching, etc.

---

## 🔄 Sorting Methods

### **sort() - Natural and Custom Ordering**

\`\`\`java
import java.util.*;

public class SortingMethods {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Orange", "Apple", "Banana", "Grape"));
        System.out.println("Original: " + fruits);

        // Natural ordering (alphabetical)
        Collections.sort(fruits);
        System.out.println("Sorted (natural): " + fruits);

        // Custom comparator - by length
        Collections.sort(fruits, (a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Sorted by length: " + fruits);

        // Reverse order
        Collections.sort(fruits, Collections.reverseOrder());
        System.out.println("Reverse alphabetical: " + fruits);

        // Numbers
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6);
        Collections.sort(numbers);
        System.out.println("Sorted numbers: " + numbers);

        // Custom objects
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20)
        );

        Collections.sort(people, (a, b) -> Integer.compare(a.getAge(), b.getAge()));
        System.out.println("Sorted by age: " + people);
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public int getAge() { return age; }

    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}
\`\`\`

### **reverse() and shuffle()**

\`\`\`java
import java.util.*;

public class ReverseShuffleMethods {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Original: " + list);

        // Reverse the list
        Collections.reverse(list);
        System.out.println("Reversed: " + list);

        // Shuffle randomly
        Collections.shuffle(list);
        System.out.println("Shuffled: " + list);

        // Shuffle with custom Random
        Random random = new Random(42);  // Fixed seed for reproducible results
        Collections.shuffle(list, random);
        System.out.println("Shuffled (seed 42): " + list);

        // Shuffle again with same seed - same result
        Collections.shuffle(list, new Random(42));
        System.out.println("Shuffled again (seed 42): " + list);
    }
}
\`\`\`

### **rotate() and swap()**

\`\`\`java
import java.util.*;

public class RotateSwapMethods {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));
        System.out.println("Original: " + list);

        // Rotate right by 2 positions
        Collections.rotate(list, 2);
        System.out.println("Rotated right by 2: " + list);

        // Rotate left by 3 positions (or right by 2)
        Collections.rotate(list, -3);
        System.out.println("Rotated left by 3: " + list);

        // Swap two elements
        Collections.swap(list, 0, 4);
        System.out.println("Swapped first and last: " + list);

        // Rotate to move specific element to front
        int index = list.indexOf("C");
        Collections.rotate(list, index);
        System.out.println("Rotated C to front: " + list);
    }
}
\`\`\`

---

## 🔍 Searching Methods

### **binarySearch() - Efficient Searching**

\`\`\`java
import java.util.*;

public class SearchingMethods {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date", "Elderberry"));
        System.out.println("List: " + fruits);

        // Must be sorted for binary search
        Collections.sort(fruits);
        System.out.println("Sorted: " + fruits);

        // Binary search - returns index
        int index = Collections.binarySearch(fruits, "Cherry");
        System.out.println("Cherry found at index: " + index);

        // Search for non-existent element
        index = Collections.binarySearch(fruits, "Fig");
        System.out.println("Fig not found, insertion point: " + (-index - 1));

        // Binary search with custom comparator
        List<String> byLength = new ArrayList<>(fruits);
        byLength.sort(Comparator.comparing(String::length));
        System.out.println("Sorted by length: " + byLength);

        index = Collections.binarySearch(byLength, "Cherry", Comparator.comparing(String::length));
        System.out.println("Cherry (by length) found at index: " + index);

        // Numbers
        List<Integer> numbers = Arrays.asList(1, 3, 5, 7, 9, 11, 13);
        index = Collections.binarySearch(numbers, 7);
        System.out.println("7 found at index: " + index);

        index = Collections.binarySearch(numbers, 6);
        System.out.println("6 not found, insertion point: " + (-index - 1));
    }
}
\`\`\`

---

## 📊 Min/Max and Frequency Methods

### **min(), max(), and frequency()**

\`\`\`java
import java.util.*;

public class MinMaxFrequencyMethods {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5);
        System.out.println("Numbers: " + numbers);

        // Find minimum and maximum
        int min = Collections.min(numbers);
        int max = Collections.max(numbers);
        System.out.println("Min: " + min + ", Max: " + max);

        // Find min/max with custom comparator
        List<String> words = Arrays.asList("apple", "Banana", "cherry", "Date");
        String shortest = Collections.min(words, Comparator.comparing(String::length));
        String longest = Collections.max(words, Comparator.comparing(String::length));
        System.out.println("Shortest: " + shortest + ", Longest: " + longest);

        // Case-insensitive min/max
        String first = Collections.min(words, String.CASE_INSENSITIVE_ORDER);
        String last = Collections.max(words, String.CASE_INSENSITIVE_ORDER);
        System.out.println("First (case-insensitive): " + first + ", Last: " + last);

        // Frequency count
        int frequencyOf1 = Collections.frequency(numbers, 1);
        int frequencyOf5 = Collections.frequency(numbers, 5);
        System.out.println("Frequency of 1: " + frequencyOf1);
        System.out.println("Frequency of 5: " + frequencyOf5);

        // Find most frequent element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (Integer num : numbers) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        Map.Entry<Integer, Integer> mostFrequent = null;
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            if (mostFrequent == null || entry.getValue() > mostFrequent.getValue()) {
                mostFrequent = entry;
            }
        }
        System.out.println("Most frequent: " + mostFrequent.getKey() + " appears " + mostFrequent.getValue() + " times");
    }
}
\`\`\`

---

## 🔒 Synchronized Collections

### **Thread-Safe Wrappers**

\`\`\`java
import java.util.*;

public class SynchronizedCollections {
    public static void main(String[] args) {
        // Regular collections are not thread-safe
        List<String> list = new ArrayList<>();
        Set<String> set = new HashSet<>();
        Map<String, String> map = new HashMap<>();

        // Create synchronized wrappers
        List<String> syncList = Collections.synchronizedList(list);
        Set<String> syncSet = Collections.synchronizedSet(set);
        Map<String, String> syncMap = Collections.synchronizedMap(map);

        // All operations on these are now thread-safe
        syncList.add("A");
        syncSet.add("B");
        syncMap.put("C", "D");

        System.out.println("Sync list: " + syncList);
        System.out.println("Sync set: " + syncSet);
        System.out.println("Sync map: " + syncMap);

        // For iteration, still need to synchronize manually
        synchronized (syncList) {
            for (String item : syncList) {
                System.out.println("Item: " + item);
            }
        }

        // Java 5+ concurrent collections are better alternatives
        List<String> concurrentList = new java.util.concurrent.CopyOnWriteArrayList<>();
        Set<String> concurrentSet = java.util.concurrent.ConcurrentHashMap.newKeySet();
        Map<String, String> concurrentMap = new java.util.concurrent.ConcurrentHashMap<>();
    }
}
\`\`\`

---

## 🚫 Unmodifiable Collections

### **Read-Only Views**

\`\`\`java
import java.util.*;

public class UnmodifiableCollections {
    public static void main(String[] args) {
        List<String> originalList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        Set<String> originalSet = new HashSet<>(Arrays.asList("X", "Y", "Z"));
        Map<String, String> originalMap = new HashMap<>();
        originalMap.put("key1", "value1");
        originalMap.put("key2", "value2");

        // Create unmodifiable views
        List<String> unmodifiableList = Collections.unmodifiableList(originalList);
        Set<String> unmodifiableSet = Collections.unmodifiableSet(originalSet);
        Map<String, String> unmodifiableMap = Collections.unmodifiableMap(originalMap);

        // Reading is allowed
        System.out.println("List: " + unmodifiableList);
        System.out.println("Set: " + unmodifiableSet);
        System.out.println("Map: " + unmodifiableMap);

        // Modification attempts will throw UnsupportedOperationException
        try {
            unmodifiableList.add("D");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to unmodifiable list: " + e.getMessage());
        }

        try {
            unmodifiableSet.add("W");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to unmodifiable set: " + e.getMessage());
        }

        try {
            unmodifiableMap.put("key3", "value3");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot put to unmodifiable map: " + e.getMessage());
        }

        // But modifying the original collection affects the view
        originalList.add("D");
        System.out.println("After modifying original: " + unmodifiableList);
    }
}
\`\`\`

---

## 🎯 Singleton and Empty Collections

### **Creating Single-Element Collections**

\`\`\`java
import java.util.*;

public class SingletonCollections {
    public static void main(String[] args) {
        // Singleton collections contain exactly one element
        List<String> singletonList = Collections.singletonList("Only");
        Set<String> singletonSet = Collections.singleton("Only");
        Map<String, String> singletonMap = Collections.singletonMap("key", "value");

        System.out.println("Singleton list: " + singletonList);
        System.out.println("Singleton set: " + singletonSet);
        System.out.println("Singleton map: " + singletonMap);

        // They are immutable
        try {
            singletonList.add("Another");
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify singleton collections");
        }

        // Empty collections
        List<String> emptyList = Collections.emptyList();
        Set<String> emptySet = Collections.emptySet();
        Map<String, String> emptyMap = Collections.emptyMap();

        System.out.println("Empty list size: " + emptyList.size());
        System.out.println("Empty set size: " + emptySet.size());
        System.out.println("Empty map size: " + emptyMap.size());

        // Useful for returning empty collections instead of null
        List<String> result = getNames(true);  // Return empty list instead of null
        System.out.println("Result size: " + result.size());
    }

    private static List<String> getNames(boolean includeNames) {
        if (includeNames) {
            return Arrays.asList("Alice", "Bob");
        } else {
            return Collections.emptyList();  // Better than returning null
        }
    }
}
\`\`\`

---

## 🔄 Bulk Operations

### **addAll(), replaceAll(), and fill()**

\`\`\`java
import java.util.*;

public class BulkOperations {
    public static void main(String[] args) {
        // addAll() - add multiple elements
        List<String> list = new ArrayList<>();
        Collections.addAll(list, "A", "B", "C", "D");
        System.out.println("After addAll: " + list);

        // replaceAll() - replace all occurrences
        Collections.replaceAll(list, "B", "Beta");
        System.out.println("After replaceAll: " + list);

        // fill() - replace all elements with a single value
        Collections.fill(list, "X");
        System.out.println("After fill: " + list);

        // Copying lists
        List<String> source = Arrays.asList("1", "2", "3");
        List<String> destination = Arrays.asList("A", "B", "C", "D");  // Must be at least as long
        Collections.copy(destination, source);
        System.out.println("After copy: " + destination);

        // Disjoint - check if two collections have no elements in common
        List<String> list1 = Arrays.asList("A", "B", "C");
        List<String> list2 = Arrays.asList("D", "E", "F");
        List<String> list3 = Arrays.asList("C", "D", "E");

        System.out.println("list1 and list2 disjoint: " + Collections.disjoint(list1, list2));  // true
        System.out.println("list1 and list3 disjoint: " + Collections.disjoint(list1, list3));  // false
    }
}
\`\`\`

---

## 🎯 Practical Collections Utility Examples

### **Finding N Largest/Smallest Elements**

\`\`\`java
import java.util.*;

public class NMaxMinElements {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 9, 3, 7, 4, 6);

        // Find 3 largest elements
        List<Integer> largest = new ArrayList<>(numbers);
        Collections.sort(largest, Collections.reverseOrder());
        List<Integer> top3 = largest.subList(0, Math.min(3, largest.size()));
        System.out.println("Top 3 largest: " + top3);

        // Find 3 smallest elements
        List<Integer> smallest = new ArrayList<>(numbers);
        Collections.sort(smallest);
        List<Integer> bottom3 = smallest.subList(0, Math.min(3, smallest.size()));
        System.out.println("Top 3 smallest: " + bottom3);

        // More efficient approach using PriorityQueue (not covered in this module)
        // But for large datasets, PriorityQueue would be better than sorting
    }
}
\`\`\`

### **Shuffling and Random Sampling**

\`\`\`java
import java.util.*;

public class ShufflingSampling {
    public static void main(String[] args) {
        List<String> deck = new ArrayList<>();
        String[] suits = {"Hearts", "Diamonds", "Clubs", "Spades"};
        String[] ranks = {"Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"};

        for (String suit : suits) {
            for (String rank : ranks) {
                deck.add(rank + " of " + suit);
            }
        }

        System.out.println("Original deck size: " + deck.size());

        // Shuffle the deck
        Collections.shuffle(deck);
        System.out.println("First 5 cards after shuffle: " + deck.subList(0, 5));

        // Deal a hand (first 5 cards)
        List<String> hand = deck.subList(0, 5);
        System.out.println("Your hand: " + hand);

        // Sort hand by suit and rank
        Collections.sort(hand, (a, b) -> {
            // Extract suit and rank
            String[] aParts = a.split(" of ");
            String[] bParts = b.split(" of ");

            // First compare suits
            int suitCompare = aParts[1].compareTo(bParts[1]);
            if (suitCompare != 0) return suitCompare;

            // Then compare ranks
            return getRankValue(aParts[0]) - getRankValue(bParts[0]);
        });

        System.out.println("Sorted hand: " + hand);
    }

    private static int getRankValue(String rank) {
        switch (rank) {
            case "Ace": return 14;
            case "King": return 13;
            case "Queen": return 12;
            case "Jack": return 11;
            default: return Integer.parseInt(rank);
        }
    }
}
\`\`\`

### **Collection Utilities for Custom Classes**

\`\`\`java
import java.util.*;

class Employee implements Comparable<Employee> {
    private String name;
    private double salary;
    private int yearsOfService;

    public Employee(String name, double salary, int yearsOfService) {
        this.name = name;
        this.salary = salary;
        this.yearsOfService = yearsOfService;
    }

    public double getSalary() { return salary; }
    public int getYearsOfService() { return yearsOfService; }

    @Override
    public int compareTo(Employee other) {
        return Double.compare(this.salary, other.salary);
    }

    @Override
    public String toString() {
        return String.format("%s($%.2f,%dy)", name, salary, yearsOfService);
    }
}

public class EmployeeUtilities {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", 75000, 5),
            new Employee("Bob", 65000, 3),
            new Employee("Charlie", 80000, 7),
            new Employee("Diana", 70000, 4),
            new Employee("Eve", 60000, 2)
        );

        System.out.println("Employees: " + employees);

        // Find highest paid employee
        Employee highestPaid = Collections.max(employees);
        System.out.println("Highest paid: " + highestPaid);

        // Find employee with most experience
        Employee mostExperienced = Collections.max(employees,
            Comparator.comparing(Employee::getYearsOfService));
        System.out.println("Most experienced: " + mostExperienced);

        // Find lowest paid employee
        Employee lowestPaid = Collections.min(employees);
        System.out.println("Lowest paid: " + lowestPaid);

        // Sort by salary (natural order)
        Collections.sort(employees);
        System.out.println("Sorted by salary: " + employees);

        // Sort by years of service
        employees.sort(Comparator.comparing(Employee::getYearsOfService));
        System.out.println("Sorted by experience: " + employees);

        // Reverse the list
        Collections.reverse(employees);
        System.out.println("Reversed: " + employees);

        // Shuffle
        Collections.shuffle(employees);
        System.out.println("Shuffled: " + employees);

        // Create unmodifiable view for read-only access
        List<Employee> readOnlyEmployees = Collections.unmodifiableList(employees);
        System.out.println("Read-only list created");

        // Frequency of salaries (would need custom logic)
        Map<Double, Integer> salaryFrequency = new HashMap<>();
        for (Employee emp : employees) {
            salaryFrequency.put(emp.getSalary(),
                salaryFrequency.getOrDefault(emp.getSalary(), 0) + 1);
        }
        System.out.println("Salary frequencies: " + salaryFrequency);
    }
}
\`\`\`

---

## 🎯 Summary

### **Collections Utility Class Key Methods**

#### **Sorting Methods**
- \`sort(list)\` - Natural ordering sort
- \`sort(list, comparator)\` - Custom comparator sort
- \`reverse(list)\` - Reverse list order
- \`shuffle(list)\` - Random shuffle
- \`rotate(list, distance)\` - Rotate elements

#### **Searching Methods**
- \`binarySearch(list, key)\` - Binary search (requires sorted list)
- \`binarySearch(list, key, comparator)\` - Binary search with comparator

#### **Min/Max Methods**
- \`min(collection)\` - Find minimum element
- \`max(collection)\` - Find maximum element
- \`min(collection, comparator)\` - Find minimum with comparator
- \`max(collection, comparator)\` - Find maximum with comparator

#### **Other Utility Methods**
- \`frequency(collection, element)\` - Count occurrences
- \`swap(list, i, j)\` - Swap two elements
- \`replaceAll(list, oldVal, newVal)\` - Replace all occurrences
- \`fill(list, element)\` - Fill list with single value
- \`copy(dest, src)\` - Copy elements between lists

#### **Wrapper Methods**
- \`synchronizedList(list)\` - Thread-safe list wrapper
- \`synchronizedSet(set)\` - Thread-safe set wrapper
- \`synchronizedMap(map)\` - Thread-safe map wrapper
- \`unmodifiableList(list)\` - Read-only list wrapper
- \`unmodifiableSet(set)\` - Read-only set wrapper
- \`unmodifiableMap(map)\` - Read-only map wrapper

#### **Factory Methods**
- \`singletonList(element)\` - Single-element list
- \`singleton(element)\` - Single-element set
- \`singletonMap(key, value)\` - Single-entry map
- \`emptyList()\` - Empty list
- \`emptySet()\` - Empty set
- \`emptyMap()\` - Empty map

### **Best Practices**

- **Use appropriate methods**: Choose the right utility method for the task
- **Consider performance**: Some operations require sorted collections
- **Thread safety**: Use synchronized wrappers when needed
- **Immutability**: Use unmodifiable wrappers to prevent modification
- **Null safety**: Prefer empty collections over null returns

### **Performance Considerations**

- **Sorting**: O(n log n) time complexity
- **Searching**: O(log n) for binary search (requires sorted collection)
- **Min/Max**: O(n) time complexity
- **Shuffle**: O(n) time complexity
- **Rotate**: O(n) time complexity

### **Common Pitfalls**

- **Unsorted binary search**: Collections.binarySearch() requires sorted collection
- **Modifying synchronized collections**: Still need external synchronization for iteration
- **Unmodifiable collection changes**: Original collection changes affect unmodifiable view
- **Null elements**: Some utility methods don't handle null elements well

### **Quick Check**
What will be the output of this code?
\`\`\`java
List<String> list = Arrays.asList("B", "A", "C");
Collections.sort(list);
Collections.reverse(list);
System.out.println(list);
\`\`\`
Output: [C, B, A]
`
};
