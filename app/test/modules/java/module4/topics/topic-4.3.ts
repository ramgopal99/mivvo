import { SubLesson } from '../../../data/lessonsData';

export const topic_4_3: SubLesson = {
  id: 4.3,
  title: 'Accessing HashMap Elements',
  status: 'completed',
  content: `# 🔍 Accessing HashMap Elements in Java

Accessing elements in a HashMap involves retrieving values by keys, checking for existence, and working with the different views (key set, value collection, entry set) that HashMap provides. Understanding these access patterns is crucial for effective HashMap usage.

---

## 🔑 Basic Value Retrieval

### **get() and getOrDefault() Methods**
\`\`\`java
import java.util.*;

public class BasicRetrieval {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Basic get operation
        Integer aliceScore = scores.get("Alice");
        System.out.println("Alice's score: " + aliceScore);

        // Get with null checking
        Integer missingScore = scores.get("David");
        System.out.println("David's score: " + missingScore);  // null

        // Safe get with default value
        Integer safeScore = scores.getOrDefault("David", 0);
        System.out.println("David's score (default 0): " + safeScore);

        // Get with conditional logic
        String student = "Eve";
        Integer studentScore = scores.get(student);
        if (studentScore != null) {
            System.out.println(student + "'s score: " + studentScore);
        } else {
            System.out.println(student + " not found in scores");
        }
    }
}
\`\`\`

### **Null Key Handling**
\`\`\`java
public class NullKeyHandling {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();

        // HashMap allows one null key
        map.put(null, "Null Key Value");
        map.put("regular", "Regular Value");

        // Retrieving null key
        String nullKeyValue = map.get(null);
        System.out.println("Null key value: " + nullKeyValue);

        // Checking for null key
        boolean hasNullKey = map.containsKey(null);
        System.out.println("Contains null key: " + hasNullKey);

        // Null keys in iteration
        for (String key : map.keySet()) {
            if (key == null) {
                System.out.println("Found null key with value: " + map.get(key));
            } else {
                System.out.println("Key: " + key + ", Value: " + map.get(key));
            }
        }
    }
}
\`\`\`

---

## 🔍 Key and Value Existence Checks

### **containsKey() and containsValue() Methods**
\`\`\`java
public class ExistenceChecks {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);
        inventory.put("Oranges", 40);
        inventory.put("Grapes", 25);

        // Check if key exists
        boolean hasApples = inventory.containsKey("Apples");
        boolean hasMangoes = inventory.containsKey("Mangoes");

        System.out.println("Has apples: " + hasApples);
        System.out.println("Has mangoes: " + hasMangoes);

        // Check if value exists
        boolean hasQuantity30 = inventory.containsValue(30);
        boolean hasQuantity100 = inventory.containsValue(100);

        System.out.println("Has quantity 30: " + hasQuantity30);
        System.out.println("Has quantity 100: " + hasQuantity100);

        // Combined checks for safe operations
        String item = "Pineapple";
        if (inventory.containsKey(item)) {
            System.out.println(item + " quantity: " + inventory.get(item));
        } else {
            System.out.println(item + " not in inventory");
        }
    }
}
\`\`\`

### **Conditional Access Patterns**
\`\`\`java
public class ConditionalAccess {
    public static void main(String[] args) {
        Map<String, Double> prices = new HashMap<>();
        prices.put("Laptop", 999.99);
        prices.put("Mouse", 29.99);
        prices.put("Keyboard", 79.99);

        // Method 1: Check then get
        String product = "Monitor";
        if (prices.containsKey(product)) {
            System.out.println(product + " price: $" + prices.get(product));
        } else {
            System.out.println(product + " not found");
        }

        // Method 2: Get then check (less efficient for misses)
        Double price = prices.get(product);
        if (price != null) {
            System.out.println(product + " price: $" + price);
        } else {
            System.out.println(product + " not found");
        }

        // Method 3: Get with default (most concise)
        double defaultPrice = prices.getOrDefault(product, 0.0);
        System.out.println(product + " price (default 0): $" + defaultPrice);

        // Method 4: Compute if absent (Java 8+)
        double computedPrice = prices.computeIfAbsent("Headphones", k -> 49.99);
        System.out.println("Headphones price (computed): $" + computedPrice);
    }
}
\`\`\`

---

## 👀 Working with Map Views

### **Key Set View**
\`\`\`java
public class KeySetView {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Get key set
        Set<String> keys = scores.keySet();
        System.out.println("All keys: " + keys);

        // Iterate through keys
        System.out.println("Iterating keys:");
        for (String key : keys) {
            System.out.println("Key: " + key + ", Value: " + scores.get(key));
        }

        // Key set is backed by the map
        scores.put("David", 88);
        System.out.println("Keys after adding David: " + keys);

        // Can modify map through key set (removal)
        keys.remove("Bob");
        System.out.println("Map after removing Bob via keySet: " + scores);
    }
}
\`\`\`

### **Value Collection View**
\`\`\`java
public class ValueCollectionView {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Get value collection
        Collection<Integer> values = scores.values();
        System.out.println("All values: " + values);

        // Iterate through values
        System.out.println("Iterating values:");
        for (Integer value : values) {
            System.out.println("Value: " + value);
        }

        // Find max value
        Integer maxScore = Collections.max(values);
        Integer minScore = Collections.min(values);
        System.out.println("Max score: " + maxScore);
        System.out.println("Min score: " + minScore);

        // Value collection is backed by the map
        scores.put("David", 88);
        System.out.println("Values after adding entry: " + values);

        // Cannot add directly to value collection
        try {
            values.add(100);  // UnsupportedOperationException
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot add to values collection directly");
        }
    }
}
\`\`\`

### **Entry Set View**
\`\`\`java
public class EntrySetView {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Get entry set
        Set<Map.Entry<String, Integer>> entries = scores.entrySet();
        System.out.println("All entries: " + entries);

        // Iterate through entries
        System.out.println("Iterating entries:");
        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println("Key: " + entry.getKey() +
                             ", Value: " + entry.getValue());
        }

        // Modify values through entries
        for (Map.Entry<String, Integer> entry : entries) {
            if (entry.getKey().equals("Bob")) {
                entry.setValue(90);  // Modify value through entry
            }
        }
        System.out.println("Map after modifying Bob's score: " + scores);

        // Entry set is backed by the map
        scores.put("David", 88);
        System.out.println("Entries after adding David: " + entries);
    }
}
\`\`\`

---

## 🔄 Advanced Access Patterns

### **Bulk Retrieval Operations**
\`\`\`java
public class BulkRetrieval {
    public static void main(String[] args) {
        Map<String, String> config = new HashMap<>();
        config.put("host", "localhost");
        config.put("port", "8080");
        config.put("database", "mydb");
        config.put("username", "admin");

        // Get multiple values at once
        List<String> requiredKeys = Arrays.asList("host", "port", "database");

        System.out.println("Required configuration:");
        for (String key : requiredKeys) {
            String value = config.get(key);
            if (value != null) {
                System.out.println(key + ": " + value);
            } else {
                System.out.println(key + ": NOT SET");
            }
        }

        // Get all values that match a pattern
        List<String> networkConfig = new ArrayList<>();
        for (Map.Entry<String, String> entry : config.entrySet()) {
            if (entry.getKey().contains("host") || entry.getKey().contains("port")) {
                networkConfig.add(entry.getKey() + "=" + entry.getValue());
            }
        }
        System.out.println("Network config: " + networkConfig);
    }
}
\`\`\`

### **Java 8+ Functional Access**
\`\`\`java
import java.util.stream.*;

public class FunctionalAccess {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 88);

        // Find first score above 90
        Optional<Map.Entry<String, Integer>> highScore = scores.entrySet().stream()
            .filter(entry -> entry.getValue() > 90)
            .findFirst();

        highScore.ifPresent(entry ->
            System.out.println("First high score: " + entry.getKey() + " - " + entry.getValue())
        );

        // Get all students with scores above 85
        List<String> goodStudents = scores.entrySet().stream()
            .filter(entry -> entry.getValue() > 85)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());

        System.out.println("Good students: " + goodStudents);

        // Calculate average score
        double averageScore = scores.values().stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);

        System.out.println("Average score: " + averageScore);

        // Group students by score range
        Map<String, List<String>> groupedByRange = scores.entrySet().stream()
            .collect(Collectors.groupingBy(
                entry -> {
                    int score = entry.getValue();
                    if (score >= 90) return "Excellent";
                    else if (score >= 85) return "Good";
                    else return "Needs Improvement";
                },
                Collectors.mapping(Map.Entry::getKey, Collectors.toList())
            ));

        System.out.println("Grouped by performance: " + groupedByRange);
    }
}
\`\`\`

---

## 🔍 Searching and Finding in Maps

### **Finding Keys by Value**
\`\`\`java
public class ReverseLookup {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 87);  // Same score as Bob

        // Find key by value (may have multiple matches)
        int targetScore = 87;
        List<String> studentsWithScore = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue().equals(targetScore)) {
                studentsWithScore.add(entry.getKey());
            }
        }

        System.out.println("Students with score " + targetScore + ": " + studentsWithScore);

        // Find first key with specific value
        String firstStudent = null;
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue().equals(targetScore)) {
                firstStudent = entry.getKey();
                break;
            }
        }
        System.out.println("First student with score " + targetScore + ": " + firstStudent);
    }
}
\`\`\`

### **Complex Search Criteria**
\`\`\`java
public class ComplexSearch {
    public static void main(String[] args) {
        Map<String, Person> employees = new HashMap<>();
        employees.put("EMP001", new Person("Alice", "Engineering", 95000));
        employees.put("EMP002", new Person("Bob", "Marketing", 75000));
        employees.put("EMP003", new Person("Charlie", "Engineering", 105000));
        employees.put("EMP004", new Person("Diana", "HR", 65000));

        // Find employees in Engineering department
        List<String> engineeringEmployees = findEmployeesByDepartment(employees, "Engineering");
        System.out.println("Engineering employees: " + engineeringEmployees);

        // Find employees with salary above threshold
        List<String> highEarners = findEmployeesBySalary(employees, 80000);
        System.out.println("High earners (>80k): " + highEarners);

        // Find employee with highest salary
        String topEarner = findTopEarner(employees);
        System.out.println("Top earner: " + topEarner);
    }

    static List<String> findEmployeesByDepartment(Map<String, Person> employees, String department) {
        List<String> result = new ArrayList<>();
        for (Map.Entry<String, Person> entry : employees.entrySet()) {
            if (entry.getValue().department.equals(department)) {
                result.add(entry.getKey());
            }
        }
        return result;
    }

    static List<String> findEmployeesBySalary(Map<String, Person> employees, int minSalary) {
        List<String> result = new ArrayList<>();
        for (Map.Entry<String, Person> entry : employees.entrySet()) {
            if (entry.getValue().salary >= minSalary) {
                result.add(entry.getKey());
            }
        }
        return result;
    }

    static String findTopEarner(Map<String, Person> employees) {
        String topEmployee = null;
        int maxSalary = 0;

        for (Map.Entry<String, Person> entry : employees.entrySet()) {
            if (entry.getValue().salary > maxSalary) {
                maxSalary = entry.getValue().salary;
                topEmployee = entry.getKey();
            }
        }
        return topEmployee;
    }

    static class Person {
        String name;
        String department;
        int salary;

        Person(String name, String department, int salary) {
            this.name = name;
            this.department = department;
            this.salary = salary;
        }
    }
}
\`\`\`

---

## ⚠️ Common Access Pitfalls

### **Null Pointer Exceptions**
\`\`\`java
public class NullPointerPitfalls {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", null);  // Explicit null value

        // Safe null checking
        String value1 = map.get("key1");
        if (value1 != null) {
            System.out.println("Value1: " + value1.toUpperCase());
        }

        String value2 = map.get("key2");
        if (value2 != null) {
            System.out.println("Value2: " + value2.toUpperCase());
        } else {
            System.out.println("Value2 is null");
        }

        String missingValue = map.get("nonexistent");
        if (missingValue != null) {
            System.out.println("Missing value: " + missingValue);
        } else {
            System.out.println("Key not found");
        }

        // Using getOrDefault for safety
        String safeValue = map.getOrDefault("nonexistent", "default");
        System.out.println("Safe access: " + safeValue);
    }
}
\`\`\`

### **Concurrent Modification Issues**
\`\`\`java
public class ConcurrentModification {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();
        map.put("A", 1);
        map.put("B", 2);
        map.put("C", 3);

        // ❌ Dangerous: Modifying map while iterating keys
        try {
            for (String key : map.keySet()) {
                if (map.get(key) < 3) {
                    map.remove(key);  // ConcurrentModificationException
                }
            }
        } catch (Exception e) {
            System.out.println("ConcurrentModificationException: " + e.getClass().getSimpleName());
        }

        // ✅ Safe: Iterate over a copy
        Map<String, Integer> map2 = new HashMap<>(map);
        for (String key : new HashSet<>(map2.keySet())) {
            if (map2.get(key) < 3) {
                map2.remove(key);
            }
        }
        System.out.println("Safe removal result: " + map2);

        // ✅ Best: Use removeIf with entrySet
        Map<String, Integer> map3 = new HashMap<>(map);
        map3.entrySet().removeIf(entry -> entry.getValue() < 3);
        System.out.println("removeIf result: " + map3);
    }
}
\`\`\`

---

## 🎯 Access Method Best Practices

### **1. Choose the Right Access Method**
\`\`\`java
public class AccessBestPractices {
    public static void main(String[] args) {
        Map<String, String> config = new HashMap<>();
        config.put("host", "localhost");
        config.put("port", "8080");

        // For required values: get() with null check
        String host = config.get("host");
        if (host == null) {
            throw new IllegalStateException("Host configuration missing");
        }
        System.out.println("Host: " + host);

        // For optional values: getOrDefault()
        String timeout = config.getOrDefault("timeout", "30");
        System.out.println("Timeout: " + timeout);

        // For existence checks: containsKey()
        if (config.containsKey("debug")) {
            System.out.println("Debug mode: " + config.get("debug"));
        }

        // For bulk access: use views
        Set<String> keys = config.keySet();
        Collection<String> values = config.values();
        Set<Map.Entry<String, String>> entries = config.entrySet();

        System.out.println("All keys: " + keys);
        System.out.println("All values: " + values);
    }
}
\`\`\`

### **2. Handle Edge Cases Properly**
\`\`\`java
public class EdgeCaseHandling {
    public static void main(String[] args) {
        Map<String, Object> mixedMap = new HashMap<>();
        mixedMap.put("string", "hello");
        mixedMap.put("number", 42);
        mixedMap.put("null", null);

        // Safe type checking and casting
        Object value = mixedMap.get("number");
        if (value instanceof Integer) {
            int intValue = (Integer) value;
            System.out.println("Integer value: " + intValue);
        }

        // Safe string operations
        Object stringValue = mixedMap.get("string");
        String safeString = (stringValue instanceof String) ?
                           (String) stringValue : "default";
        System.out.println("Safe string: " + safeString);

        // Handle null values
        Object nullValue = mixedMap.get("null");
        String result = (nullValue != null) ? nullValue.toString() : "NULL";
        System.out.println("Null handling: " + result);
    }
}
\`\`\`

### **3. Use Appropriate Collection Views**
\`\`\`java
public class ViewBestPractices {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Use keySet() for key operations
        Set<String> students = scores.keySet();
        System.out.println("Students: " + students);

        // Use values() for value operations
        Collection<Integer> allScores = scores.values();
        int maxScore = Collections.max(allScores);
        System.out.println("Max score: " + maxScore);

        // Use entrySet() for key-value operations
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue() >= 90) {
                System.out.println("High performer: " + entry.getKey());
            }
        }

        // Remember: views are backed by the map
        students.add("David");  // ❌ UnsupportedOperationException
        scores.put("David", 88);  // ✅ Add through the map
        System.out.println("After adding David: " + students);
    }
}
\`\`\`

Accessing HashMap elements efficiently requires understanding the different access methods and views available. Proper null handling and concurrent modification awareness leads to robust and safe code! 🔍`
};


