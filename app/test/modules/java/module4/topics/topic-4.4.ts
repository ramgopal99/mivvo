import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: "4.4",
  title: 'Map Methods',
  status: 'completed',
  content: `# 🔧 Map Methods in Java

Java's Map interface provides a rich set of methods for manipulating key-value pairs. Understanding these methods is essential for effective Map usage and covers everything from basic operations to advanced transformations.

---

## 🏗️ Core Map Methods

### **Basic CRUD Operations**
\`\`\`java
import java.util.*;

public class BasicMapMethods {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();

        // CREATE: put(key, value)
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // READ: get(key)
        Integer aliceScore = scores.get("Alice");
        System.out.println("Alice's score: " + aliceScore);

        // UPDATE: put(key, newValue) - overwrites existing
        Integer oldScore = scores.put("Alice", 97);
        System.out.println("Alice's old score: " + oldScore);
        System.out.println("Alice's new score: " + scores.get("Alice"));

        // DELETE: remove(key)
        Integer removedScore = scores.remove("Bob");
        System.out.println("Removed Bob's score: " + removedScore);
        System.out.println("Map after removal: " + scores);
    }
}
\`\`\`

### **Conditional Operations**
\`\`\`java
public class ConditionalMethods {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);

        // putIfAbsent: Only put if key doesn't exist
        Integer oldApples = inventory.putIfAbsent("Apples", 100);
        Integer oldOranges = inventory.putIfAbsent("Oranges", 75);

        System.out.println("Apples was: " + oldApples + " (not replaced)");
        System.out.println("Oranges was: " + oldOranges + " (newly added)");
        System.out.println("Inventory: " + inventory);

        // getOrDefault: Get with fallback value
        Integer apples = inventory.getOrDefault("Apples", 0);
        Integer grapes = inventory.getOrDefault("Grapes", 0);

        System.out.println("Apples: " + apples);
        System.out.println("Grapes (default): " + grapes);
    }
}
\`\`\`

---

## 🔄 Bulk Operations

### **putAll() Method**
\`\`\`java
public class PutAllMethod {
    public static void main(String[] args) {
        Map<String, Integer> original = new HashMap<>();
        original.put("A", 1);
        original.put("B", 2);

        Map<String, Integer> additional = new HashMap<>();
        additional.put("C", 3);
        additional.put("D", 4);
        additional.put("A", 100);  // Same key, different value

        System.out.println("Original: " + original);
        System.out.println("Additional: " + additional);

        // Add all entries from additional to original
        original.putAll(additional);
        System.out.println("After putAll: " + original);
        // Note: "A" was overwritten with value 100
    }
}
\`\`\`

### **clear() and isEmpty()**
\`\`\`java
public class ClearAndEmpty {
    public static void main(String[] args) {
        Map<String, String> config = new HashMap<>();
        config.put("host", "localhost");
        config.put("port", "8080");
        config.put("debug", "true");

        System.out.println("Config: " + config);
        System.out.println("Is empty: " + config.isEmpty());
        System.out.println("Size: " + config.size());

        // Clear all entries
        config.clear();
        System.out.println("After clear:");
        System.out.println("Config: " + config);
        System.out.println("Is empty: " + config.isEmpty());
        System.out.println("Size: " + config.size());
    }
}
\`\`\`

---

## 🔍 Search and Check Methods

### **containsKey() and containsValue()**
\`\`\`java
public class ContainsMethods {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 95);  // Same value as Alice

        // Check if key exists
        boolean hasAlice = scores.containsKey("Alice");
        boolean hasDavid = scores.containsKey("David");

        System.out.println("Contains key 'Alice': " + hasAlice);
        System.out.println("Contains key 'David': " + hasDavid);

        // Check if value exists
        boolean hasScore95 = scores.containsValue(95);
        boolean hasScore100 = scores.containsValue(100);

        System.out.println("Contains value 95: " + hasScore95);
        System.out.println("Contains value 100: " + hasScore100);

        // Practical usage
        String student = "Alice";
        if (scores.containsKey(student)) {
            System.out.println(student + "'s score: " + scores.get(student));
        } else {
            System.out.println(student + " not found");
        }
    }
}
\`\`\`

---

## 🔄 Java 8+ Functional Methods

### **compute() Methods**
\`\`\`java
public class ComputeMethods {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);

        // compute: Recompute value based on current value
        inventory.compute("Apples", (key, value) -> value + 10);
        System.out.println("After compute Apples: " + inventory);

        // computeIfPresent: Only if key exists
        inventory.computeIfPresent("Bananas", (key, value) -> value * 2);
        inventory.computeIfPresent("Oranges", (key, value) -> value + 5); // No effect
        System.out.println("After computeIfPresent: " + inventory);

        // computeIfAbsent: Only if key doesn't exist
        inventory.computeIfAbsent("Oranges", key -> 25);
        inventory.computeIfAbsent("Apples", key -> 100); // No effect
        System.out.println("After computeIfAbsent: " + inventory);
    }
}
\`\`\`

### **merge() Method**
\`\`\`java
public class MergeMethod {
    public static void main(String[] args) {
        Map<String, Integer> cart1 = new HashMap<>();
        cart1.put("Apple", 3);
        cart1.put("Banana", 2);

        Map<String, Integer> cart2 = new HashMap<>();
        cart2.put("Apple", 5);
        cart2.put("Orange", 4);

        // Merge cart2 into cart1
        cart2.forEach((key, value) ->
            cart1.merge(key, value, Integer::sum)
        );

        System.out.println("Merged cart: " + cart1);
        // Apple: 3 + 5 = 8, Banana: 2, Orange: 4

        // Alternative: using merge directly
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 85);

        // Add 10 points if Alice exists, otherwise set to 10
        scores.merge("Alice", 10, Integer::sum);
        scores.merge("Bob", 10, Integer::sum);

        System.out.println("Scores: " + scores);
    }
}
\`\`\`

### **replace() Methods**
\`\`\`java
public class ReplaceMethods {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);

        // replace(key, newValue): Replace specific key
        Integer oldAliceScore = scores.replace("Alice", 90);
        System.out.println("Alice's old score: " + oldAliceScore);
        System.out.println("After replace Alice: " + scores);

        // replace(key, oldValue, newValue): Conditional replace
        boolean replacedBob = scores.replace("Bob", 92, 95);     // Success
        boolean replacedCharlie = scores.replace("Charlie", 80, 85); // Fail
        System.out.println("Bob replaced: " + replacedBob);
        System.out.println("Charlie replaced: " + replacedCharlie);
        System.out.println("After conditional replace: " + scores);

        // replaceAll: Transform all values
        scores.replaceAll((key, value) -> value + 5);
        System.out.println("After adding 5 to all scores: " + scores);
    }
}
\`\`\`

---

## 📊 Utility Methods (Collections Class)

### **Collections Utility Methods**
\`\`\`java
import java.util.*;

public class CollectionsUtilities {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);

        // Find maximum value
        Integer maxScore = Collections.max(scores.values());
        Integer minScore = Collections.min(scores.values());
        System.out.println("Max score: " + maxScore);
        System.out.println("Min score: " + minScore);

        // Find key with maximum value
        Map.Entry<String, Integer> maxEntry = Collections.max(
            scores.entrySet(),
            Map.Entry.comparingByValue()
        );
        System.out.println("Top student: " + maxEntry.getKey() + " with " + maxEntry.getValue());

        // Create unmodifiable map
        Map<String, Integer> unmodifiableScores = Collections.unmodifiableMap(scores);
        System.out.println("Unmodifiable map: " + unmodifiableScores);

        // Try to modify (will throw exception)
        try {
            unmodifiableScores.put("Eve", 88);
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify unmodifiable map");
        }
    }
}
\`\`\`

---

## 🔄 Advanced Method Patterns

### **Method Chaining**
\`\`\`java
public class MethodChaining {
    public static void main(String[] args) {
        Map<String, Integer> result = new HashMap<String, Integer>()
            .put("A", 1)      // Note: put() returns previous value, not the map
            .put("B", 2);     // This won't work as expected

        System.out.println("Incorrect chaining: " + result);

        // Correct way: use proper chaining methods or separate calls
        Map<String, Integer> correct = new HashMap<>();
        correct.put("A", 1);
        correct.put("B", 2);
        System.out.println("Correct approach: " + correct);
    }
}
\`\`\`

### **Fluent API with Custom Methods**
\`\`\`java
public class FluentMapAPI {
    public static void main(String[] args) {
        // Create a fluent map builder
        Map<String, Object> config = MapBuilder.create()
            .put("host", "localhost")
            .put("port", 8080)
            .put("debug", true)
            .put("timeout", 30)
            .build();

        System.out.println("Built config: " + config);
    }

    static class MapBuilder {
        private Map<String, Object> map = new HashMap<>();

        public static MapBuilder create() {
            return new MapBuilder();
        }

        public MapBuilder put(String key, Object value) {
            map.put(key, value);
            return this;
        }

        public Map<String, Object> build() {
            return new HashMap<>(map);
        }
    }
}
\`\`\`

---

## 🎯 Method Return Values

### **Understanding Return Types**
\`\`\`java
public class MethodReturnValues {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);

        // put() returns the previous value (or null)
        Integer previous1 = map.put("A", 2);     // Returns 1
        Integer previous2 = map.put("B", 3);     // Returns null

        System.out.println("put('A', 2) returned: " + previous1);
        System.out.println("put('B', 3) returned: " + previous2);

        // remove() returns the removed value (or null)
        Integer removed1 = map.remove("A");      // Returns 2
        Integer removed2 = map.remove("C");      // Returns null

        System.out.println("remove('A') returned: " + removed1);
        System.out.println("remove('C') returned: " + removed2);

        // get() returns the value (or null)
        Integer value1 = map.get("B");           // Returns 3
        Integer value2 = map.get("D");           // Returns null

        System.out.println("get('B') returned: " + value1);
        System.out.println("get('D') returned: " + value2);
    }
}
\`\`\`

---

## ⚠️ Common Method Mistakes

### **Incorrect Use of putIfAbsent**
\`\`\`java
public class CommonMistakes {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);

        // ❌ Thinking putIfAbsent always puts
        map.putIfAbsent("A", 999);  // Won't put because "A" exists
        System.out.println("After putIfAbsent on existing key: " + map.get("A"));

        // ✅ Correct usage
        map.putIfAbsent("B", 999);  // Will put because "B" doesn't exist
        System.out.println("After putIfAbsent on new key: " + map);

        // ❌ Confusing put and putIfAbsent
        Map<String, Integer> cache = new HashMap<>();
        // For cache-like behavior, use putIfAbsent
        Integer existing = cache.putIfAbsent("key", computeExpensiveValue());
        if (existing == null) {
            System.out.println("Computed new value");
        } else {
            System.out.println("Used cached value: " + existing);
        }
    }

    static Integer computeExpensiveValue() {
        System.out.println("Computing expensive value...");
        return 42;
    }
}
\`\`\`

### **Misunderstanding compute Methods**
\`\`\`java
public class ComputeMistakes {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 10);

        // ❌ compute can return null to remove entry
        map.compute("A", (key, value) -> null);
        System.out.println("After compute with null: " + map);

        // ❌ computeIfPresent doesn't execute if key missing
        map.computeIfPresent("B", (key, value) -> value * 2); // No effect
        System.out.println("computeIfPresent on missing key: " + map);

        // ✅ Correct usage
        map.put("C", 5);
        map.computeIfPresent("C", (key, value) -> value * 2);
        System.out.println("computeIfPresent on existing key: " + map);
    }
}
\`\`\`

---

## 🎯 Best Practices for Map Methods

### **1. Choose the Right Method for the Job**
\`\`\`java
public class MethodBestPractices {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        // For initialization: put()
        map.put("initial", 1);

        // For conditional updates: putIfAbsent()
        map.putIfAbsent("conditional", 2);

        // For default values: getOrDefault()
        int value = map.getOrDefault("missing", 0);

        // For complex updates: compute()
        map.compute("counter", (k, v) -> (v == null) ? 1 : v + 1);

        // For merging data: merge()
        map.merge("total", 10, Integer::sum);

        // For replacing all: replaceAll()
        map.replaceAll((k, v) -> v * 2);

        System.out.println("Final map: " + map);
    }
}
\`\`\`

### **2. Handle Null Values Properly**
\`\`\`java
public class NullHandling {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        // HashMap allows null keys and values
        map.put(null, "null key value");
        map.put("null value key", null);

        // But be careful with operations
        System.out.println("Null key value: " + map.get(null));

        // compute methods handle null carefully
        map.compute("null value key", (k, v) -> (v == null) ? "default" : v);
        System.out.println("After compute: " + map);

        // merge handles null
        map.merge("new key", "value", (old, newVal) -> old + newVal);
        System.out.println("After merge: " + map);
    }
}
\`\`\`

### **3. Use Method References for Readability**
\`\`\`java
public class MethodReferences {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 85);
        scores.put("Bob", 92);
        scores.put("Charlie", 78);

        // Using lambda
        scores.replaceAll((key, value) -> value + 5);

        // Using method reference (more concise)
        scores.replaceAll((key, value) -> Integer.sum(value, 5));

        // For simple operations, use merge
        scores.merge("Alice", 10, Integer::sum);
        scores.merge("David", 80, Integer::sum);

        System.out.println("Updated scores: " + scores);
    }
}
\`\`\`

Map methods in Java provide powerful and flexible ways to work with key-value data. Understanding the different method families (basic CRUD, conditional, bulk, functional) enables you to write clean and efficient code! 🔧`
};



