import { SubLesson } from '../../../data/lessonsData';

export const topic_16_1: SubLesson = {
  id: 16.1,
  title: 'Java Generics & Collections Deep Dive',
  status: 'completed',
  content: `# 🎯 Java Advanced Concepts: Generics & Collections

Master advanced Java features for robust, type-safe programming!

---

## 🎯 Advanced Generics

### **1. Wildcards (?)**

#### **Upper Bounded Wildcards (? extends T)**
\`\`\`java
public class UpperBoundedWildcard {
    // Accept any list of Number or its subclasses
    public static double sum(List<? extends Number> numbers) {
        double total = 0.0;
        for (Number num : numbers) {
            total += num.doubleValue();
        }
        return total;
    }

    public static void main(String[] args) {
        List<Integer> ints = Arrays.asList(1, 2, 3);
        List<Double> doubles = Arrays.asList(1.1, 2.2, 3.3);

        System.out.println("Sum of ints: " + sum(ints));       // 6.0
        System.out.println("Sum of doubles: " + sum(doubles)); // 6.6
    }
}
\`\`\`

#### **Lower Bounded Wildcards (? super T)**
\`\`\`java
public class LowerBoundedWildcard {
    // Accept any list that can hold Integers (Integer or its superclasses)
    public static void addNumbers(List<? super Integer> list) {
        list.add(1);
        list.add(2);
        list.add(3);
    }

    public static void main(String[] args) {
        List<Number> numbers = new ArrayList<>();
        List<Object> objects = new ArrayList<>();

        addNumbers(numbers);
        addNumbers(objects);

        System.out.println("Numbers: " + numbers);
        System.out.println("Objects: " + objects);
    }
}
\`\`\`

#### **Unbounded Wildcards (?)**
\`\`\`java
public class UnboundedWildcard {
    // Accept any type of list
    public static void printList(List<?> list) {
        for (Object item : list) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        List<String> strings = Arrays.asList("A", "B", "C");
        List<Integer> numbers = Arrays.asList(1, 2, 3);

        printList(strings);  // A B C
        printList(numbers);  // 1 2 3
    }
}
\`\`\`

### **2. Generic Methods**
\`\`\`java
public class GenericMethods {
    // Generic method to swap two elements in array
    public static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Generic method with multiple type parameters
    public static <K, V> Map<K, V> createMap(K key, V value) {
        Map<K, V> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

    // Bounded generic method
    public static <T extends Comparable<T>> T max(T[] arr) {
        if (arr.length == 0) return null;

        T max = arr[0];
        for (T item : arr) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public static void main(String[] args) {
        // Test swap
        String[] strings = {"A", "B", "C"};
        swap(strings, 0, 2);
        System.out.println("Swapped: " + Arrays.toString(strings));

        // Test max
        Integer[] numbers = {3, 1, 4, 1, 5};
        System.out.println("Max: " + max(numbers));
    }
}
\`\`\`

---

## 📚 Advanced Collections

### **1. HashMap Internal Working**
\`\`\`java
public class HashMapInternals {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        // Adding elements
        map.put("Apple", 1);
        map.put("Banana", 2);
        map.put("Cherry", 3);

        // HashMap uses hashCode() and equals() for key comparison
        System.out.println("Apple hash: " + "Apple".hashCode());
        System.out.println("Map: " + map);

        // Load factor and capacity
        System.out.println("Size: " + map.size());
        // When size > capacity * loadFactor, HashMap resizes
    }
}
\`\`\`

### **2. Concurrent Collections**
\`\`\`java
import java.util.concurrent.*;

public class ConcurrentCollections {
    public static void main(String[] args) {
        // Thread-safe collections
        ConcurrentHashMap<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        CopyOnWriteArrayList<String> copyOnWriteList = new CopyOnWriteArrayList<>();

        // ConcurrentHashMap allows concurrent reads without locking
        concurrentMap.put("Key1", 1);
        concurrentMap.put("Key2", 2);

        // CopyOnWriteArrayList creates new copy for modifications
        copyOnWriteList.add("Item1");
        copyOnWriteList.add("Item2");

        System.out.println("ConcurrentMap: " + concurrentMap);
        System.out.println("CopyOnWriteList: " + copyOnWriteList);
    }
}
\`\`\`

### **3. Custom Comparator**
\`\`\`java
import java.util.Comparator;

public class CustomSorting {
    static class Person {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        @Override
        public String toString() {
            return name + "(" + age + ")";
        }
    }

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 20)
        );

        // Sort by age (ascending)
        people.sort(Comparator.comparingInt(p -> p.age));
        System.out.println("By age: " + people);

        // Sort by name (descending)
        people.sort(Comparator.comparing((Person p) -> p.name).reversed());
        System.out.println("By name desc: " + people);

        // Sort by age then name
        people.sort(Comparator.comparingInt((Person p) -> p.age)
                           .thenComparing(p -> p.name));
        System.out.println("By age then name: " + people);
    }
}
\`\`\`

---

## 🔧 Advanced Java Features

### **1. Lambda Expressions & Streams**
\`\`\`java
import java.util.stream.Collectors;

public class StreamsExample {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Java", "Python", "JavaScript", "C++");

        // Filter, map, collect
        List<String> longWords = words.stream()
            .filter(word -> word.length() > 4)
            .map(String::toUpperCase)
            .collect(Collectors.toList());

        System.out.println("Long words uppercase: " + longWords);

        // Grouping and counting
        Map<Integer, Long> lengthCount = words.stream()
            .collect(Collectors.groupingBy(String::length, Collectors.counting()));

        System.out.println("Length counts: " + lengthCount);

        // Parallel streams for performance
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        int sum = numbers.parallelStream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();

        System.out.println("Sum of even numbers: " + sum);
    }
}
\`\`\`

### **2. Optional Class**
\`\`\`java
import java.util.Optional;

public class OptionalExample {
    public static Optional<String> findUserById(int id) {
        // Simulate database lookup
        if (id == 1) {
            return Optional.of("John Doe");
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        // Using Optional to avoid null checks
        Optional<String> user = findUserById(1);

        // Safe operations
        String name = user.orElse("Unknown User");
        System.out.println("User: " + name);

        // Conditional operations
        user.ifPresent(u -> System.out.println("Found: " + u));

        // Transform values
        String greeting = user.map(u -> "Hello, " + u)
                             .orElse("Hello, Guest");
        System.out.println(greeting);
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Wildcards**: ? extends T for reading, ? super T for writing
2. **Generic Methods**: <T> syntax for type parameters
3. **Collections**: Understand internal workings for better performance
4. **Streams**: Functional programming approach for data processing
5. **Optional**: Avoid null pointer exceptions elegantly
6. **Concurrent Collections**: Thread-safe data structures

**Master these advanced concepts for professional Java development!** 🚀`
};
