import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_2: SubLesson = {
  id: 4.2,
  title: 'Creating HashMaps',
  status: 'completed',
  content: `# 🏗️ Creating HashMaps in Java

HashMap is the most commonly used Map implementation in Java. It provides fast key-value lookups and is the go-to choice for most mapping needs. Understanding how to create and initialize HashMaps effectively is crucial for Java development.

---

## 🏭 HashMap Creation

### **Basic HashMap Creation**
\`\`\`java
import java.util.*;

public class HashMapCreation {
    public static void main(String[] args) {
        // Method 1: Empty HashMap
        Map<String, Integer> map1 = new HashMap<>();
        System.out.println("Empty HashMap: " + map1);

        // Method 2: HashMap with initial capacity
        Map<String, String> map2 = new HashMap<>(16);  // Initial capacity 16
        System.out.println("HashMap with capacity: " + map2);

        // Method 3: HashMap with capacity and load factor
        Map<String, Double> map3 = new HashMap<>(16, 0.75f);
        // Load factor 0.75 means resize when 75% full
        System.out.println("HashMap with capacity and load factor: " + map3);

        // Method 4: Copy constructor
        Map<String, Integer> source = new HashMap<>();
        source.put("A", 1);
        source.put("B", 2);
        Map<String, Integer> copy = new HashMap<>(source);
        System.out.println("Copied HashMap: " + copy);
    }
}
\`\`\`

### **Generic Type Safety**
\`\`\`java
public class GenericHashMap {
    public static void main(String[] args) {
        // ✅ Generic HashMap (recommended)
        Map<String, Integer> studentGrades = new HashMap<>();
        studentGrades.put("Alice", 95);
        studentGrades.put("Bob", 87);
        // studentGrades.put("Charlie", "Excellent");  // Compile-time error!

        // ✅ Different key-value type combinations
        Map<Integer, String> idToName = new HashMap<>();
        Map<String, List<String>> nameToHobbies = new HashMap<>();
        Map<Student, List<Course>> enrollment = new HashMap<>();

        // ❌ Raw HashMap (avoid in modern Java)
        Map rawMap = new HashMap();  // Raw type warning
        rawMap.put("key", "value");
        rawMap.put(42, new Object());  // Mixed types allowed (dangerous)

        System.out.println("Generic map: " + studentGrades);
        System.out.println("Raw map: " + rawMap);
    }

    static class Student { String name; }
    static class Course { String title; }
}
\`\`\`

---

## ➕ Adding Entries to HashMap

### **put() and putIfAbsent() Methods**
\`\`\`java
public class AddingEntries {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        // Basic put operations
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        System.out.println("Initial scores: " + scores);

        // put() overwrites existing values
        scores.put("Alice", 97);  // Overwrites Alice's 95 with 97
        System.out.println("After updating Alice: " + scores);

        // putIfAbsent() only adds if key doesn't exist
        scores.putIfAbsent("Alice", 100);    // Won't change (key exists)
        scores.putIfAbsent("David", 88);     // Will add (key doesn't exist)
        System.out.println("After putIfAbsent operations: " + scores);

        // Return values from put operations
        Integer oldScore = scores.put("Bob", 90);  // Returns old value (87)
        Integer newScore = scores.put("Eve", 85);  // Returns null (new key)
        System.out.println("Bob's old score: " + oldScore);
        System.out.println("Eve's new score: " + newScore);
    }
}
\`\`\`

### **Bulk Operations**
\`\`\`java
public class BulkOperations {
    public static void main(String[] args) {
        // Method 1: putAll()
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("A", 1);
        map1.put("B", 2);

        Map<String, Integer> map2 = new HashMap<>();
        map2.put("C", 3);
        map2.put("D", 4);

        map1.putAll(map2);  // Add all entries from map2 to map1
        System.out.println("After putAll: " + map1);

        // Method 2: Using Map.of() (Java 9+)
        Map<String, Integer> immutableMap = Map.of(
            "X", 10,
            "Y", 20,
            "Z", 30
        );
        // immutableMap.put("W", 40);  // UnsupportedOperationException

        // Convert to mutable HashMap
        Map<String, Integer> mutableMap = new HashMap<>(immutableMap);
        mutableMap.put("W", 40);
        System.out.println("Mutable from immutable: " + mutableMap);

        // Method 3: Constructor with Map.ofEntries()
        Map<String, Integer> entryMap = Map.ofEntries(
            Map.entry("P", 1),
            Map.entry("Q", 2),
            Map.entry("R", 3)
        );
        System.out.println("Map from entries: " + entryMap);
    }
}
\`\`\`

---

## 🔄 Initialization Patterns

### **Double Brace Initialization**
\`\`\`java
public class DoubleBraceInitialization {
    public static void main(String[] args) {
        // Double brace initialization (creates anonymous subclass)
        Map<String, Integer> scores = new HashMap<String, Integer>() {{
            put("Alice", 95);
            put("Bob", 87);
            put("Charlie", 92);
        }};

        System.out.println("Double brace initialization: " + scores);

        // Can be useful for one-time initialization
        Map<String, Object> config = new HashMap<String, Object>() {{
            put("host", "localhost");
            put("port", 8080);
            put("debug", true);
            put("features", Arrays.asList("auth", "logging", "cache"));
        }};

        System.out.println("Config map: " + config);

        // Note: Creates extra class file, use sparingly
    }
}
\`\`\`

### **Builder Pattern for Complex Initialization**
\`\`\`java
public class BuilderPattern {
    public static void main(String[] args) {
        // Custom builder for complex HashMap initialization
        Map<String, Object> userProfile = createUserProfile()
            .name("John Doe")
            .age(30)
            .email("john@example.com")
            .active(true)
            .roles(Arrays.asList("admin", "user"))
            .build();

        System.out.println("User profile: " + userProfile);
    }

    static UserProfileBuilder createUserProfile() {
        return new UserProfileBuilder();
    }

    static class UserProfileBuilder {
        private Map<String, Object> profile = new HashMap<>();

        public UserProfileBuilder name(String name) {
            profile.put("name", name);
            return this;
        }

        public UserProfileBuilder age(int age) {
            profile.put("age", age);
            return this;
        }

        public UserProfileBuilder email(String email) {
            profile.put("email", email);
            return this;
        }

        public UserProfileBuilder active(boolean active) {
            profile.put("active", active);
            return this;
        }

        public UserProfileBuilder roles(List<String> roles) {
            profile.put("roles", roles);
            return this;
        }

        public Map<String, Object> build() {
            return new HashMap<>(profile);  // Return copy
        }
    }
}
\`\`\`

---

## 📊 HashMap Capacity and Load Factor

### **Understanding Capacity and Load Factor**
\`\`\`java
public class CapacityLoadFactor {
    public static void main(String[] args) {
        // Default: capacity 16, load factor 0.75
        Map<String, Integer> defaultMap = new HashMap<>();

        // Custom capacity and load factor
        Map<String, Integer> customMap = new HashMap<>(32, 0.8f);

        // Load factor = 0.75 means resize when 75% full
        // For capacity 16: resize at 12 elements
        // For capacity 32: resize at 24 elements (with load factor 0.75)
        // For capacity 32: resize at 25 elements (with load factor 0.8)

        // Adding elements to see resizing behavior
        for (int i = 0; i < 20; i++) {
            defaultMap.put("Key" + i, i);
            customMap.put("Key" + i, i);
        }

        System.out.println("Default map size: " + defaultMap.size());
        System.out.println("Custom map size: " + customMap.size());
    }
}
\`\`\`

### **Performance Implications**
\`\`\`java
public class PerformanceDemo {
    public static void main(String[] args) {
        // Poor performance: starts with small capacity
        Map<String, Integer> poorPerformance = new HashMap<>(1);
        long start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            poorPerformance.put("Key" + i, i);
        }
        long poorTime = System.nanoTime() - start;

        // Good performance: appropriate initial capacity
        Map<String, Integer> goodPerformance = new HashMap<>(12000); // ~20% extra
        start = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            goodPerformance.put("Key" + i, i);
        }
        long goodTime = System.nanoTime() - start;

        System.out.println("Poor performance time: " + (poorTime / 1_000_000) + " ms");
        System.out.println("Good performance time: " + (goodTime / 1_000_000) + " ms");
        System.out.println("Performance ratio: " + (double) poorTime / goodTime + "x");
    }
}
\`\`\`

---

## 🔑 Custom Keys and Hashing

### **Implementing Proper hashCode() and equals()**
\`\`\`java
public class CustomKeyDemo {
    public static void main(String[] args) {
        Map<Person, Integer> personScores = new HashMap<>();

        Person alice1 = new Person("Alice", 25);
        Person alice2 = new Person("Alice", 25);  // Same data
        Person bob = new Person("Bob", 30);

        personScores.put(alice1, 95);
        personScores.put(bob, 87);

        // Should retrieve Alice's score (same hashCode and equals)
        Integer aliceScore = personScores.get(alice2);
        System.out.println("Alice's score: " + aliceScore);

        // Different objects with same data should be equal
        System.out.println("alice1.equals(alice2): " + alice1.equals(alice2));
        System.out.println("alice1.hashCode() == alice2.hashCode(): " +
                          (alice1.hashCode() == alice2.hashCode()));
    }

    static class Person {
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
}
\`\`\`

### **Common Hashing Mistakes**
\`\`\`java
public class HashingMistakes {
    public static void main(String[] args) {
        Map<BadKey, String> badMap = new HashMap<>();
        Map<GoodKey, String> goodMap = new HashMap<>();

        // Bad key: mutable object used as key
        BadKey badKey1 = new BadKey(1);
        badMap.put(badKey1, "First");

        badKey1.value = 2;  // Modifying key after insertion
        System.out.println("Bad key retrieval: " + badMap.get(badKey1)); // May not work

        // Good key: immutable or properly implemented
        GoodKey goodKey1 = new GoodKey(1);
        GoodKey goodKey2 = new GoodKey(1);  // Same value

        goodMap.put(goodKey1, "First");
        System.out.println("Good key retrieval: " + goodMap.get(goodKey2)); // Works correctly
    }

    static class BadKey {
        int value;
        BadKey(int value) { this.value = value; }
        // No hashCode/equals - uses Object's implementation
    }

    static class GoodKey {
        private final int value;  // Immutable

        GoodKey(int value) { this.value = value; }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            GoodKey goodKey = (GoodKey) obj;
            return value == goodKey.value;
        }

        @Override
        public int hashCode() {
            return Integer.hashCode(value);
        }
    }
}
\`\`\`

---

## 🛡️ Thread Safety Considerations

### **HashMap vs ConcurrentHashMap**
\`\`\`java
import java.util.concurrent.*;

public class ThreadSafety {
    public static void main(String[] args) {
        // Not thread-safe
        Map<String, Integer> regularMap = new HashMap<>();
        regularMap.put("counter", 0);

        // Thread-safe alternative
        Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
        concurrentMap.put("counter", 0);

        // For external synchronization
        Map<String, Integer> synchronizedMap = Collections.synchronizedMap(new HashMap<>());
        synchronizedMap.put("counter", 0);

        System.out.println("Regular HashMap: " + regularMap);
        System.out.println("ConcurrentHashMap: " + concurrentMap);
        System.out.println("SynchronizedMap: " + synchronizedMap);

        // ConcurrentHashMap allows concurrent reads without locking
        // and fine-grained locking for writes
    }
}
\`\`\`

---

## 🎯 HashMap Best Practices

### **1. Choose Appropriate Initial Capacity**
\`\`\`java
public class CapacityBestPractices {
    public static void main(String[] args) {
        // Good: Estimate size if known
        Map<String, Integer> map = new HashMap<>(100);  // Expect ~100 entries

        // Add entries...
        for (int i = 0; i < 80; i++) {
            map.put("Key" + i, i);
        }

        // Good: Use load factor based on use case
        Map<String, Integer> readHeavy = new HashMap<>(100, 0.9f);  // Higher load factor for read-heavy
        Map<String, Integer> writeHeavy = new HashMap<>(100, 0.5f); // Lower load factor for write-heavy

        System.out.println("Map size: " + map.size());
        System.out.println("Map capacity estimate: ~" + (int)(map.size() / 0.75));
    }
}
\`\`\`

### **2. Use Proper Key Types**
\`\`\`java
public class KeyBestPractices {
    public static void main(String[] args) {
        // ✅ Good keys
        Map<String, String> config = new HashMap<>();      // Immutable String
        Map<Integer, User> userById = new HashMap<>();     // Immutable Integer
        Map<UUID, Order> orderByUuid = new HashMap<>();    // Immutable UUID

        // ✅ Custom immutable key
        Map<Coordinate, String> locationNames = new HashMap<>();

        Coordinate coord1 = new Coordinate(10, 20);
        Coordinate coord2 = new Coordinate(10, 20);  // Same values

        locationNames.put(coord1, "Home");
        System.out.println("Location name: " + locationNames.get(coord2)); // Works correctly
    }

    static class Coordinate {
        private final int x, y;  // Immutable fields

        Coordinate(int x, int y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Coordinate that = (Coordinate) obj;
            return x == that.x && y == that.y;
        }

        @Override
        public int hashCode() {
            return Objects.hash(x, y);
        }
    }

    static class User { }
    static class Order { }
}
\`\`\`

### **3. Handle Null Values Carefully**
\`\`\`java
public class NullHandling {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        // HashMap allows null keys and values
        map.put(null, "Null Key Value");
        map.put("Null Value Key", null);

        // But be careful with null checks
        String value1 = map.get("nonexistent");  // Returns null
        String value2 = map.getOrDefault("nonexistent", "Default Value");

        System.out.println("Null key value: " + map.get(null));
        System.out.println("Null value for missing key: " + value1);
        System.out.println("Default value for missing key: " + value2);

        // Check for key existence
        if (map.containsKey("Null Value Key")) {
            String nullValue = map.get("Null Value Key");
            System.out.println("Null value exists: " + (nullValue == null));
        }
    }
}
\`\`\`

HashMap is your primary tool for key-value mappings in Java. Understanding capacity, load factors, and proper key implementation leads to efficient and reliable code! 🏗️`
};

