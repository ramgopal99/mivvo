import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_6: SubLesson = {
  id: "4.6",
  title: 'When to Use Maps',
  status: 'completed',
  content: `# 🎯 When to Use Maps in Java

Maps are one of the most versatile data structures in Java, but choosing the right Map implementation and knowing when to use them is crucial for writing efficient and maintainable code. Understanding the different scenarios where Maps excel will help you make better design decisions.

---

## 🔑 Choosing the Right Map Type

### **HashMap: The Default Choice**
\`\`\`java
public class HashMapUseCases {
    public static void main(String[] args) {
        // ✅ Use HashMap when:
        // - You need fast lookups (O(1) average)
        // - Order doesn't matter
        // - Most common use case

        // Configuration settings
        Map<String, String> config = new HashMap<>();
        config.put("database.url", "jdbc:mysql://localhost:3306/mydb");
        config.put("database.username", "admin");
        config.put("cache.enabled", "true");

        // User sessions (ID → Session)
        Map<String, UserSession> sessions = new HashMap<>();
        sessions.put("user123", new UserSession("user123", System.currentTimeMillis()));

        // Cache for expensive computations
        Map<String, Integer> fibonacciCache = new HashMap<>();
        fibonacciCache.put("fib5", 5);
        fibonacciCache.put("fib10", 55);

        System.out.println("Config loaded: " + config.size() + " settings");
        System.out.println("Active sessions: " + sessions.size());
    }

    static class UserSession {
        String userId;
        long loginTime;

        UserSession(String userId, long loginTime) {
            this.userId = userId;
            this.loginTime = loginTime;
        }
    }
}
\`\`\`

### **TreeMap: When Order Matters**
\`\`\`java
public class TreeMapUseCases {
    public static void main(String[] args) {
        // ✅ Use TreeMap when:
        // - You need keys in sorted order
        // - You need range operations
        // - You need ordered iteration

        // Sorted dictionary
        Map<String, String> dictionary = new TreeMap<>();
        dictionary.put("zebra", "an African wild horse");
        dictionary.put("apple", "a fruit");
        dictionary.put("moon", "Earth's natural satellite");

        System.out.println("Dictionary (sorted): " + dictionary);

        // Range queries
        SortedMap<String, String> range = ((TreeMap<String, String>) dictionary)
            .subMap("apple", "zebra"); // From "apple" to "zebra"
        System.out.println("Range A-Z: " + range);

        // Score leaderboard (sorted by score)
        Map<Integer, String> leaderboard = new TreeMap<>(Collections.reverseOrder());
        leaderboard.put(95, "Alice");
        leaderboard.put(87, "Bob");
        leaderboard.put(92, "Charlie");

        System.out.println("Leaderboard (highest first): " + leaderboard);
    }
}
\`\`\`

### **LinkedHashMap: When Insertion Order Matters**
\`\`\`java
public class LinkedHashMapUseCases {
    public static void main(String[] args) {
        // ✅ Use LinkedHashMap when:
        // - You need to preserve insertion order
        // - You want predictable iteration order
        // - You need LRU cache behavior

        // Processing steps in order
        Map<String, Runnable> processingSteps = new LinkedHashMap<>();
        processingSteps.put("validate", () -> System.out.println("Validating..."));
        processingSteps.put("process", () -> System.out.println("Processing..."));
        processingSteps.put("cleanup", () -> System.out.println("Cleaning up..."));

        System.out.println("Processing in order:");
        for (Map.Entry<String, Runnable> step : processingSteps.entrySet()) {
            System.out.print(step.getKey() + " → ");
            step.getValue().run();
        }

        // LRU Cache implementation
        Map<String, String> cache = new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > 3; // Keep only 3 recent entries
            }
        };

        cache.put("A", "first");
        cache.put("B", "second");
        cache.put("C", "third");
        cache.put("D", "fourth"); // "A" gets removed

        System.out.println("\\nLRU Cache (most recent first): " + cache);
    }
}
\`\`\`

### **ConcurrentHashMap: For Thread Safety**
\`\`\`java
import java.util.concurrent.*;

public class ConcurrentHashMapUseCases {
    public static void main(String[] args) {
        // ✅ Use ConcurrentHashMap when:
        // - Multiple threads access the map
        // - You need thread-safe operations
        // - High concurrency is required

        // Shared cache across threads
        Map<String, Integer> sharedCache = new ConcurrentHashMap<>();

        // Simulate concurrent access
        ExecutorService executor = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 3; i++) {
            final int threadId = i;
            executor.submit(() -> {
                for (int j = 0; j < 10; j++) {
                    String key = "Thread" + threadId + "_Key" + j;
                    sharedCache.put(key, j);

                    // Safe concurrent reads
                    Integer value = sharedCache.get(key);
                    if (value != null) {
                        System.out.println(Thread.currentThread().getName() +
                                         " read: " + key + " = " + value);
                    }
                }
            });
        }

        executor.shutdown();
        try {
            executor.awaitTermination(5, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.out.println("Final cache size: " + sharedCache.size());
    }
}
\`\`\`

---

## 🎯 Real-World Map Usage Patterns

### **Data Lookup Tables**
\`\`\`java
public class LookupTables {
    public static void main(String[] args) {
        // Country codes → Country names
        Map<String, String> countryCodes = new HashMap<>();
        countryCodes.put("US", "United States");
        countryCodes.put("UK", "United Kingdom");
        countryCodes.put("CA", "Canada");

        // HTTP status codes → Messages
        Map<Integer, String> httpStatuses = new HashMap<>();
        httpStatuses.put(200, "OK");
        httpStatuses.put(404, "Not Found");
        httpStatuses.put(500, "Internal Server Error");

        // MIME types → File extensions
        Map<String, List<String>> mimeTypes = new HashMap<>();
        mimeTypes.put("text/plain", Arrays.asList(".txt", ".log"));
        mimeTypes.put("image/jpeg", Arrays.asList(".jpg", ".jpeg"));
        mimeTypes.put("application/json", Arrays.asList(".json"));

        // Usage examples
        System.out.println("Country US: " + countryCodes.get("US"));
        System.out.println("Status 404: " + httpStatuses.get(404));
        System.out.println("JSON extensions: " + mimeTypes.get("application/json"));
    }
}
\`\`\`

### **Configuration Management**
\`\`\`java
public class ConfigurationManagement {
    public static void main(String[] args) {
        // Application configuration
        Map<String, Object> appConfig = new HashMap<>();
        appConfig.put("app.name", "MyApp");
        appConfig.put("app.version", "1.0.0");
        appConfig.put("database.host", "localhost");
        appConfig.put("database.port", 3306);
        appConfig.put("cache.enabled", true);
        appConfig.put("features", Arrays.asList("auth", "logging", "metrics"));

        // Typed configuration access
        String appName = getConfigValue(appConfig, "app.name", String.class, "DefaultApp");
        int dbPort = getConfigValue(appConfig, "database.port", Integer.class, 5432);
        boolean cacheEnabled = getConfigValue(appConfig, "cache.enabled", Boolean.class, false);
        List<String> features = getConfigValue(appConfig, "features", List.class, new ArrayList<>());

        System.out.println("App: " + appName + " v" + getConfigValue(appConfig, "app.version", String.class, "1.0"));
        System.out.println("Database: " + getConfigValue(appConfig, "database.host", String.class, "unknown") + ":" + dbPort);
        System.out.println("Cache enabled: " + cacheEnabled);
        System.out.println("Features: " + features);
    }

    @SuppressWarnings("unchecked")
    static <T> T getConfigValue(Map<String, Object> config, String key, Class<T> type, T defaultValue) {
        Object value = config.get(key);
        if (value != null && type.isInstance(value)) {
            return (T) value;
        }
        return defaultValue;
    }
}
\`\`\`

### **Caching and Memoization**
\`\`\`java
public class CachingPatterns {
    private static final Map<Integer, Long> fibonacciCache = new HashMap<>();
    private static final Map<String, String> apiResponseCache = new HashMap<>();

    public static void main(String[] args) {
        // Fibonacci with memoization
        System.out.println("Fibonacci(10): " + fibonacci(10));
        System.out.println("Fibonacci(20): " + fibonacci(20));
        System.out.println("Fibonacci(10) again: " + fibonacci(10)); // From cache

        // API response caching
        String response1 = getApiResponse("https://api.example.com/users");
        String response2 = getApiResponse("https://api.example.com/users"); // From cache

        System.out.println("Cache size: " + apiResponseCache.size());
    }

    static long fibonacci(int n) {
        if (n <= 1) return n;

        // Check cache first
        Long cached = fibonacciCache.get(n);
        if (cached != null) {
            return cached;
        }

        // Compute and cache
        long result = fibonacci(n - 1) + fibonacci(n - 2);
        fibonacciCache.put(n, result);
        return result;
    }

    static String getApiResponse(String url) {
        // Check cache
        String cached = apiResponseCache.get(url);
        if (cached != null) {
            System.out.println("Cache hit for: " + url);
            return cached;
        }

        // Simulate API call
        String response = "Response from " + url + " at " + System.currentTimeMillis();
        apiResponseCache.put(url, response);
        System.out.println("API call to: " + url);
        return response;
    }
}
\`\`\`

---

## 🆚 Maps vs Other Data Structures

### **Maps vs Arrays/Lists**
\`\`\`java
public class MapsVsLists {
    public static void main(String[] args) {
        // Use List when:
        // - Order matters
        // - You need indexed access
        // - You have sequential data
        List<String> names = new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie"));

        // Use Map when:
        // - You need key-based lookup
        // - You have key-value relationships
        // - You need fast search by key
        Map<String, Integer> nameToAge = new HashMap<>();
        nameToAge.put("Alice", 25);
        nameToAge.put("Bob", 30);
        nameToAge.put("Charlie", 35);

        // Comparison: Finding age by name
        String targetName = "Bob";

        // List approach (slow - O(n))
        int listIndex = names.indexOf(targetName);
        Integer ageFromList = (listIndex != -1) ? nameToAge.get(names.get(listIndex)) : null;

        // Map approach (fast - O(1))
        Integer ageFromMap = nameToAge.get(targetName);

        System.out.println("Age from list search: " + ageFromList);
        System.out.println("Age from map lookup: " + ageFromMap);
    }
}
\`\`\`

### **Maps vs Sets**
\`\`\`java
public class MapsVsSets {
    public static void main(String[] args) {
        // Use Set when:
        // - You only need unique elements
        // - You don't need additional data per element
        Set<String> uniqueNames = new HashSet<>(Arrays.asList("Alice", "Bob", "Alice"));

        // Use Map when:
        // - You need to associate additional data with each key
        // - You need key-value relationships
        Map<String, Person> peopleByName = new HashMap<>();
        peopleByName.put("Alice", new Person("Alice", 25, "Engineer"));
        peopleByName.put("Bob", new Person("Bob", 30, "Designer"));

        System.out.println("Unique names: " + uniqueNames);
        System.out.println("People details: " + peopleByName.get("Alice"));
    }

    static class Person {
        String name;
        int age;
        String job;

        Person(String name, int age, String job) {
            this.name = name;
            this.age = age;
            this.job = job;
        }

        @Override
        public String toString() {
            return name + "(" + age + ", " + job + ")";
        }
    }
}
\`\`\`

---

## 🚫 When NOT to Use Maps

### **Avoid Maps When...**
\`\`\`java
public class WhenNotToUseMaps {
    public static void main(String[] args) {
        // ❌ Don't use Map for small, fixed datasets
        // Better: Use arrays or enums
        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
        // Instead of: Map<Integer, String> dayMap = new HashMap<>();

        // ❌ Don't use Map when order is primary concern and keys are sequential
        // Better: Use List
        List<String> tasks = new ArrayList<>();
        tasks.add("Task 1");
        tasks.add("Task 2");
        // Instead of: Map<Integer, String> taskMap = new HashMap<>();

        // ❌ Don't use Map for simple counting if you don't need the counts
        // Better: Use Set for uniqueness
        Set<String> uniqueVisitors = new HashSet<>();
        uniqueVisitors.add("user1");
        uniqueVisitors.add("user2");
        // Instead of: Map<String, Integer> visitorCount = new HashMap<>();

        // ✅ Good use: Complex relationships
        Map<String, List<String>> userPermissions = new HashMap<>();
        userPermissions.put("admin", Arrays.asList("read", "write", "delete"));
        userPermissions.put("user", Arrays.asList("read", "write"));

        System.out.println("Admin permissions: " + userPermissions.get("admin"));
    }
}
\`\`\`

---

## 🎯 Performance Considerations

### **Choosing Based on Access Patterns**
\`\`\`java
public class PerformanceBasedChoice {
    public static void main(String[] args) {
        // High read, low write: HashMap
        Map<String, String> readHeavy = new HashMap<>();
        // - Fast lookups
        // - Acceptable for occasional writes

        // Sorted access needed: TreeMap
        Map<String, Integer> sortedAccess = new TreeMap<>();
        // - Logarithmic operations
        // - Always sorted iteration

        // Insertion order important: LinkedHashMap
        Map<String, Long> insertionOrder = new LinkedHashMap<>();
        // - Slightly slower than HashMap
        // - Maintains insertion order

        // High concurrency: ConcurrentHashMap
        Map<String, Object> concurrentAccess = new ConcurrentHashMap<>();
        // - Thread-safe
        // - Good concurrent performance

        // Measure typical operations
        Map<String, Integer> testMap = new HashMap<>();
        long start = System.nanoTime();

        // Bulk insert
        for (int i = 0; i < 10000; i++) {
            testMap.put("key" + i, i);
        }

        // Bulk lookup
        int sum = 0;
        for (int i = 0; i < 10000; i++) {
            sum += testMap.get("key" + i);
        }

        long end = System.nanoTime();
        System.out.println("10k inserts + 10k lookups: " + (end - start) / 1_000_000 + " ms");
    }
}
\`\`\`

### **Memory Considerations**
\`\`\`java
public class MemoryConsiderations {
    public static void main(String[] args) {
        // HashMap: Good balance of speed and memory
        Map<String, Integer> hashMap = new HashMap<>();

        // TreeMap: Higher memory usage due to tree structure
        Map<String, Integer> treeMap = new TreeMap<>();

        // LinkedHashMap: Slightly higher memory due to linked structure
        Map<String, Integer> linkedHashMap = new LinkedHashMap<>();

        // For very large maps, consider initial capacity
        Map<String, Integer> largeMap = new HashMap<>(100000);
        // Avoids rehashing and copying

        // For memory-critical applications, consider alternatives
        // - Use primitive maps if available (not standard Java)
        // - Consider database storage for very large datasets
        // - Use weak references for cache-like structures

        System.out.println("Choose map type based on your specific requirements:");
        System.out.println("- HashMap: Fast, general purpose");
        System.out.println("- TreeMap: Sorted, range operations");
        System.out.println("- LinkedHashMap: Insertion order");
        System.out.println("- ConcurrentHashMap: Thread safety");
    }
}
\`\`\`

---

## 🎯 Best Practices Summary

### **Map Selection Guide**
\`\`\`java
public class MapSelectionGuide {
    public static void main(String[] args) {
        // 1. Default choice: HashMap
        Map<String, Object> generalUse = new HashMap<>();

        // 2. Need sorted keys: TreeMap
        Map<String, Integer> sortedKeys = new TreeMap<>();

        // 3. Need insertion order: LinkedHashMap
        Map<String, String> insertionOrder = new LinkedHashMap<>();

        // 4. High concurrency: ConcurrentHashMap
        Map<String, Integer> threadSafe = new ConcurrentHashMap<>();

        // 5. Custom requirements: Extend AbstractMap or use composition
        Map<String, Integer> customMap = new CustomHashMap();

        System.out.println("Choose your Map implementation wisely!");
        System.out.println("- Consider access patterns");
        System.out.println("- Think about concurrency needs");
        System.out.println("- Evaluate memory constraints");
        System.out.println("- Test performance for your use case");
    }

    static class CustomHashMap extends HashMap<String, Integer> {
        // Custom implementation if needed
    }
}
\`\`\`

Maps are incredibly powerful and flexible, but choosing the right implementation and using them appropriately is key to writing efficient Java code. Consider your specific requirements and constraints when selecting a Map type! 🎯`
};



