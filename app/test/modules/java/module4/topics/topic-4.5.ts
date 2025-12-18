import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_5: SubLesson = {
  id: 4.5,
  title: 'Map Operations',
  status: 'completed',
  content: `# 🔄 Map Operations in Java

Map operations encompass a wide range of techniques for working with key-value data, from iteration and transformation to complex data processing. Mastering these operations is key to effective Java development.

---

## 🔄 Iteration Techniques

### **Iterating Over Map Entries**
\`\`\`java
import java.util.*;

public class MapIteration {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);

        // Method 1: Iterate over entrySet
        System.out.println("=== Entry Set Iteration ===");
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // Method 2: Iterate over keySet, then get values
        System.out.println("\\n=== Key Set Iteration ===");
        for (String key : scores.keySet()) {
            System.out.println(key + ": " + scores.get(key));
        }

        // Method 3: Iterate over values only
        System.out.println("\\n=== Values Iteration ===");
        for (Integer score : scores.values()) {
            System.out.println("Score: " + score);
        }
    }
}
\`\`\`

### **Java 8+ Functional Iteration**
\`\`\`java
public class FunctionalIteration {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // forEach with lambda
        System.out.println("=== forEach with Lambda ===");
        scores.forEach((key, value) -> {
            System.out.println(key + " scored " + value);
        });

        // forEach with method reference
        System.out.println("\\n=== Entry Set Stream ===");
        scores.entrySet().stream()
            .forEach(entry -> System.out.println(
                entry.getKey() + " → " + entry.getValue()));

        // Filter and collect
        Map<String, Integer> highScores = scores.entrySet().stream()
            .filter(entry -> entry.getValue() >= 90)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));

        System.out.println("\\nHigh scores: " + highScores);
    }
}
\`\`\`

---

## 🔄 Transformation Operations

### **Transforming Keys and Values**
\`\`\`java
public class MapTransformations {
    public static void main(String[] args) {
        Map<String, Integer> original = new HashMap<>();
        original.put("Alice", 95);
        original.put("Bob", 87);
        original.put("Charlie", 92);

        // Transform values (add 5 points)
        Map<String, Integer> boostedScores = new HashMap<>();
        for (Map.Entry<String, Integer> entry : original.entrySet()) {
            boostedScores.put(entry.getKey(), entry.getValue() + 5);
        }
        System.out.println("Boosted scores: " + boostedScores);

        // Transform keys (to uppercase)
        Map<String, Integer> upperCaseKeys = new HashMap<>();
        for (Map.Entry<String, Integer> entry : original.entrySet()) {
            upperCaseKeys.put(entry.getKey().toUpperCase(), entry.getValue());
        }
        System.out.println("Uppercase keys: " + upperCaseKeys);

        // Using replaceAll (Java 8+)
        Map<String, Integer> doubledScores = new HashMap<>(original);
        doubledScores.replaceAll((key, value) -> value * 2);
        System.out.println("Doubled scores: " + doubledScores);
    }
}
\`\`\`

### **Type Conversions**
\`\`\`java
public class TypeConversions {
    public static void main(String[] args) {
        // String to Integer map
        Map<String, String> stringMap = new HashMap<>();
        stringMap.put("age", "25");
        stringMap.put("score", "95");

        // Convert to Integer values
        Map<String, Integer> intMap = new HashMap<>();
        for (Map.Entry<String, String> entry : stringMap.entrySet()) {
            try {
                intMap.put(entry.getKey(), Integer.parseInt(entry.getValue()));
            } catch (NumberFormatException e) {
                System.out.println("Invalid number: " + entry.getValue());
            }
        }
        System.out.println("Converted map: " + intMap);

        // Convert back to string values
        Map<String, String> backToString = new HashMap<>();
        intMap.forEach((key, value) -> backToString.put(key, value.toString()));
        System.out.println("Back to strings: " + backToString);
    }
}
\`\`\`

---

## 🔍 Search and Filter Operations

### **Finding Specific Entries**
\`\`\`java
public class SearchOperations {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);
        scores.put("Eve", 88);

        // Find maximum score
        Map.Entry<String, Integer> maxEntry = null;
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (maxEntry == null || entry.getValue() > maxEntry.getValue()) {
                maxEntry = entry;
            }
        }
        System.out.println("Highest scorer: " + maxEntry.getKey() + " with " + maxEntry.getValue());

        // Find all above threshold
        int threshold = 85;
        List<String> aboveThreshold = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue() > threshold) {
                aboveThreshold.add(entry.getKey());
            }
        }
        System.out.println("Above " + threshold + ": " + aboveThreshold);

        // Find by pattern
        List<String> startsWithA = new ArrayList<>();
        for (String key : scores.keySet()) {
            if (key.startsWith("A")) {
                startsWithA.add(key);
            }
        }
        System.out.println("Names starting with A: " + startsWithA);
    }
}
\`\`\`

### **Advanced Filtering with Streams**
\`\`\`java
import java.util.stream.*;

public class AdvancedFiltering {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);
        scores.put("Eve", 88);

        // Filter and collect
        Map<String, Integer> excellentScores = scores.entrySet().stream()
            .filter(entry -> entry.getValue() >= 90)
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                Map.Entry::getValue
            ));
        System.out.println("Excellent scores: " + excellentScores);

        // Group by score range
        Map<String, List<String>> groupedByRange = scores.entrySet().stream()
            .collect(Collectors.groupingBy(
                entry -> {
                    int score = entry.getValue();
                    if (score >= 90) return "Excellent";
                    else if (score >= 80) return "Good";
                    else return "Needs Improvement";
                },
                Collectors.mapping(Map.Entry::getKey, Collectors.toList())
            ));
        System.out.println("Grouped by range: " + groupedByRange);

        // Find top N scores
        List<Map.Entry<String, Integer>> topScores = scores.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(3)
            .collect(Collectors.toList());

        System.out.println("Top 3 scores:");
        topScores.forEach(entry ->
            System.out.println("  " + entry.getKey() + ": " + entry.getValue()));
    }
}
\`\`\`

---

## 🔄 Sorting Operations

### **Sorting by Keys**
\`\`\`java
public class SortingByKeys {
    public static void main(String[] args) {
        Map<String, Integer> unsorted = new HashMap<>();
        unsorted.put("Charlie", 92);
        unsorted.put("Alice", 95);
        unsorted.put("Bob", 87);

        // Sort by keys (natural order)
        Map<String, Integer> sortedByKey = new TreeMap<>(unsorted);
        System.out.println("Sorted by key: " + sortedByKey);

        // Sort by keys (reverse order)
        Map<String, Integer> reverseKeyOrder = new TreeMap<>(Collections.reverseOrder());
        reverseKeyOrder.putAll(unsorted);
        System.out.println("Reverse key order: " + reverseKeyOrder);

        // Custom key sorting (case-insensitive)
        Map<String, Integer> caseInsensitive = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        caseInsensitive.putAll(unsorted);
        System.out.println("Case-insensitive: " + caseInsensitive);
    }
}
\`\`\`

### **Sorting by Values**
\`\`\`java
public class SortingByValues {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);

        // Sort by values (ascending)
        List<Map.Entry<String, Integer>> sortedByValue = new ArrayList<>(scores.entrySet());
        sortedByValue.sort(Map.Entry.comparingByValue());

        System.out.println("Sorted by value (ascending):");
        sortedByValue.forEach(entry ->
            System.out.println("  " + entry.getKey() + ": " + entry.getValue()));

        // Sort by values (descending)
        sortedByValue.sort(Map.Entry.<String, Integer>comparingByValue().reversed());
        System.out.println("\\nSorted by value (descending):");
        sortedByValue.forEach(entry ->
            System.out.println("  " + entry.getKey() + ": " + entry.getValue()));

        // Convert back to LinkedHashMap to preserve order
        Map<String, Integer> sortedMap = new LinkedHashMap<>();
        sortedByValue.forEach(entry -> sortedMap.put(entry.getKey(), entry.getValue()));
        System.out.println("\\nOrdered map: " + sortedMap);
    }
}
\`\`\`

---

## 🔄 Aggregation Operations

### **Calculating Statistics**
\`\`\`java
public class AggregationOperations {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        scores.put("Charlie", 92);
        scores.put("David", 78);

        // Calculate sum
        int total = 0;
        for (int score : scores.values()) {
            total += score;
        }
        double average = (double) total / scores.size();

        System.out.println("Total score: " + total);
        System.out.println("Average score: " + String.format("%.2f", average));

        // Find min and max
        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        String minStudent = "";
        String maxStudent = "";

        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            if (entry.getValue() < min) {
                min = entry.getValue();
                minStudent = entry.getKey();
            }
            if (entry.getValue() > max) {
                max = entry.getValue();
                maxStudent = entry.getKey();
            }
        }

        System.out.println("Highest: " + maxStudent + " (" + max + ")");
        System.out.println("Lowest: " + minStudent + " (" + min + ")");

        // Using streams for statistics
        IntSummaryStatistics stats = scores.values().stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();

        System.out.println("\\nStream statistics:");
        System.out.println("Count: " + stats.getCount());
        System.out.println("Sum: " + stats.getSum());
        System.out.println("Average: " + String.format("%.2f", stats.getAverage()));
        System.out.println("Min: " + stats.getMin());
        System.out.println("Max: " + stats.getMax());
    }
}
\`\`\`

### **Grouping and Counting**
\`\`\`java
public class GroupingOperations {
    public static void main(String[] args) {
        List<Student> students = Arrays.asList(
            new Student("Alice", "Computer Science", 95),
            new Student("Bob", "Mathematics", 87),
            new Student("Charlie", "Computer Science", 92),
            new Student("David", "Physics", 78),
            new Student("Eve", "Mathematics", 88)
        );

        // Group students by department
        Map<String, List<Student>> byDepartment = new HashMap<>();
        for (Student student : students) {
            byDepartment.computeIfAbsent(student.department, k -> new ArrayList<>())
                       .add(student);
        }

        System.out.println("Students by department:");
        byDepartment.forEach((dept, studentList) -> {
            System.out.println(dept + ":");
            studentList.forEach(s -> System.out.println("  " + s.name + " (" + s.score + ")"));
        });

        // Count students per department
        Map<String, Long> departmentCount = students.stream()
            .collect(Collectors.groupingBy(
                student -> student.department,
                Collectors.counting()
            ));

        System.out.println("\\nStudent count by department: " + departmentCount);

        // Average score by department
        Map<String, Double> avgScoreByDept = students.stream()
            .collect(Collectors.groupingBy(
                student -> student.department,
                Collectors.averagingInt(student -> student.score)
            ));

        System.out.println("Average score by department: " + avgScoreByDept);
    }

    static class Student {
        String name;
        String department;
        int score;

        Student(String name, String department, int score) {
            this.name = name;
            this.department = department;
            this.score = score;
        }
    }
}
\`\`\`

---

## 🔄 Merging and Combining Maps

### **Merging Multiple Maps**
\`\`\`java
public class MergingMaps {
    public static void main(String[] args) {
        Map<String, Integer> map1 = new HashMap<>();
        map1.put("A", 1);
        map1.put("B", 2);

        Map<String, Integer> map2 = new HashMap<>();
        map2.put("B", 20);
        map2.put("C", 3);

        Map<String, Integer> map3 = new HashMap<>();
        map3.put("C", 30);
        map3.put("D", 4);

        // Merge with sum for duplicate keys
        Map<String, Integer> merged = new HashMap<>(map1);
        map2.forEach((key, value) ->
            merged.merge(key, value, Integer::sum)
        );
        map3.forEach((key, value) ->
            merged.merge(key, value, Integer::sum)
        );

        System.out.println("Merged with sum: " + merged);

        // Merge with custom logic (keep maximum)
        Map<String, Integer> maxMerge = new HashMap<>(map1);
        Stream.of(map2, map3).forEach(sourceMap ->
            sourceMap.forEach((key, value) ->
                maxMerge.merge(key, value, Math::max)
            )
        );

        System.out.println("Merged with max: " + maxMerge);

        // Merge keeping first occurrence
        Map<String, Integer> firstWins = new HashMap<>();
        Stream.of(map1, map2, map3).forEach(sourceMap ->
            sourceMap.forEach((key, value) ->
                firstWins.putIfAbsent(key, value)
            )
        );

        System.out.println("First wins: " + firstWins);
    }
}
\`\`\`

---

## 🎯 Advanced Map Operations

### **Bi-directional Maps**
\`\`\`java
public class BidirectionalOperations {
    public static void main(String[] args) {
        // Create bidirectional mapping
        Map<String, Integer> nameToId = new HashMap<>();
        Map<Integer, String> idToName = new HashMap<>();

        String[] names = {"Alice", "Bob", "Charlie", "David"};
        for (int i = 0; i < names.length; i++) {
            nameToId.put(names[i], i + 1);
            idToName.put(i + 1, names[i]);
        }

        System.out.println("Name to ID: " + nameToId);
        System.out.println("ID to Name: " + idToName);

        // Lookup in both directions
        String name = "Bob";
        Integer id = nameToId.get(name);
        String backToName = idToName.get(id);

        System.out.println(name + " → " + id + " → " + backToName);
    }
}
\`\`\`

### **Map Computations**
\`\`\`java
public class MapComputations {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();
        inventory.put("Apples", 50);
        inventory.put("Bananas", 30);
        inventory.put("Oranges", 0);  // Out of stock

        // Restock items below threshold
        int threshold = 25;
        inventory.replaceAll((item, quantity) -> {
            if (quantity < threshold) {
                System.out.println("Restocking " + item + " from " + quantity + " to 100");
                return 100;
            }
            return quantity;
        });

        System.out.println("After restocking: " + inventory);

        // Calculate total value with prices
        Map<String, Double> prices = new HashMap<>();
        prices.put("Apples", 0.50);
        prices.put("Bananas", 0.30);
        prices.put("Oranges", 0.75);

        double totalValue = inventory.entrySet().stream()
            .mapToDouble(entry -> {
                String item = entry.getKey();
                int quantity = entry.getValue();
                double price = prices.getOrDefault(item, 0.0);
                return quantity * price;
            })
            .sum();

        System.out.println("Total inventory value: $" + String.format("%.2f", totalValue));
    }
}
\`\`\`

---

## ⚠️ Operation Performance Considerations

### **Choosing the Right Map Implementation**
\`\`\`java
public class PerformanceConsiderations {
    public static void main(String[] args) {
        // For frequent lookups: HashMap (O(1))
        Map<String, String> config = new HashMap<>();
        // Fast key-based access

        // For sorted iteration: TreeMap (O(log n))
        Map<String, Integer> sortedMap = new TreeMap<>();
        // Keys always sorted

        // For insertion-order iteration: LinkedHashMap
        Map<String, Integer> insertionOrder = new LinkedHashMap<>();
        // Maintains insertion order

        // Large dataset operations
        Map<String, Integer> largeMap = new HashMap<>(10000); // Pre-size for performance

        // Measure operation times
        long start = System.nanoTime();
        for (int i = 0; i < 1000; i++) {
            largeMap.put("Key" + i, i);
        }
        long end = System.nanoTime();

        System.out.println("1000 insertions took: " + (end - start) / 1000000 + " ms");

        // Bulk operations are more efficient
        start = System.nanoTime();
        Map<String, Integer> bulkMap = new HashMap<>();
        bulkMap.putAll(largeMap);
        end = System.nanoTime();

        System.out.println("Bulk copy took: " + (end - start) / 1000000 + " ms");
    }
}
\`\`\`

Map operations in Java provide powerful ways to manipulate key-value data. From simple iterations to complex transformations and aggregations, understanding these operations enables efficient and elegant solutions! 🔄`
};


