import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: 3.3,
  title: 'Accessing ArrayList Elements',
  status: 'completed',
  content: `# 🎯 Accessing ArrayList Elements in Java

Accessing elements in an ArrayList is fundamental to working with collections. Java provides multiple ways to retrieve, examine, and work with elements in your ArrayList.

---

## 📍 Direct Access by Index

### **get() Method**
The most basic way to access elements is by their index position using the \`get()\` method.

\`\`\`java
import java.util.*;

public class DirectAccess {
    public static void main(String[] args) {
        List<String> colors = Arrays.asList("Red", "Green", "Blue", "Yellow", "Purple");

        // Access by index (0-based)
        String firstColor = colors.get(0);      // "Red"
        String thirdColor = colors.get(2);      // "Blue"
        String lastColor = colors.get(colors.size() - 1);  // "Purple"

        System.out.println("First color: " + firstColor);
        System.out.println("Third color: " + thirdColor);
        System.out.println("Last color: " + lastColor);

        // Safe access with bounds checking
        int safeIndex = 10;
        if (safeIndex >= 0 && safeIndex < colors.size()) {
            String safeColor = colors.get(safeIndex);
            System.out.println("Safe access: " + safeColor);
        } else {
            System.out.println("Index " + safeIndex + " is out of bounds!");
        }
    }
}
\`\`\`

### **Index Bounds and Exceptions**
\`\`\`java
public class IndexBounds {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 30);

        try {
            // Valid indices: 0, 1, 2
            System.out.println("Valid access: " + numbers.get(1));  // 20

            // Invalid indices cause IndexOutOfBoundsException
            // System.out.println(numbers.get(3));  // Exception!
            // System.out.println(numbers.get(-1)); // Exception!

        } catch (IndexOutOfBoundsException e) {
            System.out.println("IndexOutOfBoundsException: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🔍 Searching for Elements

### **Finding Elements by Value**
\`\`\`java
public class SearchingElements {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange", "Apple", "Grape");

        // Check if element exists
        boolean hasBanana = fruits.contains("Banana");
        boolean hasMango = fruits.contains("Mango");

        System.out.println("Contains Banana: " + hasBanana);
        System.out.println("Contains Mango: " + hasMango);

        // Find first occurrence index
        int firstApple = fruits.indexOf("Apple");
        int lastApple = fruits.lastIndexOf("Apple");
        int notFound = fruits.indexOf("Pineapple");

        System.out.println("First Apple at index: " + firstApple);    // 0
        System.out.println("Last Apple at index: " + lastApple);      // 3
        System.out.println("Pineapple index: " + notFound);            // -1
    }
}
\`\`\`

### **Advanced Searching**
\`\`\`java
import java.util.*;

public class AdvancedSearching {
    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
            new Person("Alice", 25),
            new Person("Bob", 30),
            new Person("Charlie", 25),
            new Person("Alice", 35)
        );

        // Find by custom criteria
        Person alice = findByName(people, "Alice");
        List<Person> age25People = findByAge(people, 25);

        System.out.println("Found Alice: " + alice);
        System.out.println("People aged 25: " + age25People);
    }

    static class Person {
        String name;
        int age;

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        public String toString() {
            return name + "(" + age + ")";
        }
    }

    // Custom search methods
    static Person findByName(List<Person> people, String name) {
        for (Person person : people) {
            if (person.name.equals(name)) {
                return person;
            }
        }
        return null;
    }

    static List<Person> findByAge(List<Person> people, int age) {
        List<Person> result = new ArrayList<>();
        for (Person person : people) {
            if (person.age == age) {
                result.add(person);
            }
        }
        return result;
    }
}
\`\`\`

---

## 🔄 Iterating Through ArrayList

### **Traditional For Loop**
\`\`\`java
public class TraditionalIteration {
    public static void main(String[] args) {
        List<String> animals = Arrays.asList("Cat", "Dog", "Bird", "Fish");

        // Traditional for loop with index
        System.out.println("Traditional for loop:");
        for (int i = 0; i < animals.size(); i++) {
            String animal = animals.get(i);
            System.out.println("Index " + i + ": " + animal);
        }

        // Traditional for loop with counter
        System.out.println("\\nWith counter:");
        int count = 0;
        for (String animal : animals) {
            System.out.println("Animal " + count + ": " + animal);
            count++;
        }
    }
}
\`\`\`

### **Enhanced For Loop (For-Each)**
\`\`\`java
public class EnhancedForLoop {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange");

        System.out.println("Enhanced for loop:");
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }

        // Works with any Iterable
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        int sum = 0;
        for (int number : numbers) {
            sum += number;
        }
        System.out.println("Sum: " + sum);
    }
}
\`\`\`

### **Using Iterator**
\`\`\`java
import java.util.*;

public class IteratorUsage {
    public static void main(String[] args) {
        List<String> colors = Arrays.asList("Red", "Green", "Blue");

        // Using Iterator
        System.out.println("Using Iterator:");
        Iterator<String> iterator = colors.iterator();
        while (iterator.hasNext()) {
            String color = iterator.next();
            System.out.println("Color: " + color);
        }

        // Using ListIterator (bidirectional)
        System.out.println("\\nUsing ListIterator:");
        ListIterator<String> listIterator = colors.listIterator();

        // Forward iteration
        System.out.println("Forward:");
        while (listIterator.hasNext()) {
            System.out.println("Color: " + listIterator.next());
        }

        // Backward iteration
        System.out.println("Backward:");
        while (listIterator.hasPrevious()) {
            System.out.println("Color: " + listIterator.previous());
        }
    }
}
\`\`\`

---

## 🚀 Java 8+ Functional Iteration

### **forEach() Method**
\`\`\`java
import java.util.*;

public class FunctionalIteration {
    public static void main(String[] args) {
        List<String> languages = Arrays.asList("Java", "Python", "JavaScript", "C++");

        // forEach with lambda expression
        System.out.println("Languages:");
        languages.forEach(language -> System.out.println("Language: " + language));

        // forEach with method reference
        System.out.println("\\nUppercase languages:");
        languages.forEach(System.out::println);

        // forEach with complex lambda
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("\\nNumber analysis:");
        numbers.forEach(number -> {
            System.out.println("Number: " + number);
            System.out.println("  Square: " + (number * number));
            System.out.println("  Even: " + (number % 2 == 0));
        });
    }
}
\`\`\`

### **Stream API for Advanced Operations**
\`\`\`java
import java.util.*;
import java.util.stream.*;

public class StreamOperations {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("Java", "Python", "JavaScript", "C", "Ruby");

        // Filter and collect
        List<String> longWords = words.stream()
            .filter(word -> word.length() > 4)
            .collect(Collectors.toList());
        System.out.println("Long words: " + longWords);

        // Transform and collect
        List<String> upperWords = words.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        System.out.println("Uppercase: " + upperWords);

        // Find elements
        Optional<String> firstJWord = words.stream()
            .filter(word -> word.startsWith("J"))
            .findFirst();
        System.out.println("First J word: " + firstJWord.orElse("None found"));

        // Count elements
        long count = words.stream()
            .filter(word -> word.contains("a"))
            .count();
        System.out.println("Words containing 'a': " + count);
    }
}
\`\`\`

---

## 📊 Bulk Operations

### **SubList Operations**
\`\`\`java
public class SubListOperations {
    public static void main(String[] args) {
        List<String> fullList = Arrays.asList("A", "B", "C", "D", "E", "F", "G");

        // Get sublist (fromIndex inclusive, toIndex exclusive)
        List<String> subList1 = fullList.subList(2, 5);  // "C", "D", "E"
        System.out.println("Sublist (2,5): " + subList1);

        // Get first N elements
        List<String> firstThree = fullList.subList(0, 3);  // "A", "B", "C"
        System.out.println("First three: " + firstThree);

        // Get last N elements
        int startIndex = Math.max(0, fullList.size() - 3);
        List<String> lastThree = fullList.subList(startIndex, fullList.size());
        System.out.println("Last three: " + lastThree);
    }
}
\`\`\`

### **Range Operations**
\`\`\`java
public class RangeOperations {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(10, 20, 30, 40, 50, 60, 70, 80, 90, 100);

        // Get elements in range
        List<Integer> range = new ArrayList<>();
        for (int i = 2; i < 7; i++) {  // indices 2, 3, 4, 5, 6
            range.add(numbers.get(i));
        }
        System.out.println("Range (2-6): " + range);

        // Process range with specific conditions
        List<Integer> evenNumbers = new ArrayList<>();
        for (int i = 3; i < numbers.size(); i++) {
            int number = numbers.get(i);
            if (number % 2 == 0) {
                evenNumbers.add(number);
            }
        }
        System.out.println("Even numbers from index 3: " + evenNumbers);
    }
}
\`\`\`

---

## 🔍 Peeking and Inspecting

### **Examining List Contents**
\`\`\`java
public class InspectingLists {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("First", "Second", "Third", "Fourth", "Fifth");

        // Check basic properties
        System.out.println("List: " + list);
        System.out.println("Size: " + list.size());
        System.out.println("Is empty: " + list.isEmpty());
        System.out.println("First element: " + list.get(0));
        System.out.println("Last element: " + list.get(list.size() - 1));

        // Find middle element
        int middleIndex = list.size() / 2;
        System.out.println("Middle element: " + list.get(middleIndex));

        // Check for patterns
        boolean hasDuplicates = hasDuplicates(list);
        boolean isSorted = isSorted(list);

        System.out.println("Has duplicates: " + hasDuplicates);
        System.out.println("Is sorted: " + isSorted);
    }

    static boolean hasDuplicates(List<String> list) {
        Set<String> set = new HashSet<>(list);
        return set.size() < list.size();
    }

    static boolean isSorted(List<String> list) {
        for (int i = 0; i < list.size() - 1; i++) {
            if (list.get(i).compareTo(list.get(i + 1)) > 0) {
                return false;
            }
        }
        return true;
    }
}
\`\`\`

---

## ⚠️ Safe Access Patterns

### **Null Checks and Bounds Checking**
\`\`\`java
public class SafeAccess {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B", null, "D");

        // Safe access with null check
        System.out.println("Safe element access:");
        for (int i = 0; i < list.size(); i++) {
            String element = list.get(i);
            if (element != null) {
                System.out.println("Index " + i + ": " + element);
            } else {
                System.out.println("Index " + i + ": null (skipped)");
            }
        }

        // Safe bounds checking
        int[] indicesToCheck = {0, 2, 5, -1, 10};

        for (int index : indicesToCheck) {
            String result = safeGet(list, index);
            System.out.println("Index " + index + ": " + result);
        }
    }

    // Safe get method with bounds checking
    static String safeGet(List<String> list, int index) {
        if (list == null) {
            return "List is null";
        }
        if (index < 0 || index >= list.size()) {
            return "Index out of bounds";
        }
        String element = list.get(index);
        return element != null ? element : "Element is null";
    }
}
\`\`\`

### **Defensive Copying**
\`\`\`java
public class DefensiveCopying {
    public static void main(String[] args) {
        List<String> original = new ArrayList<>(Arrays.asList("A", "B", "C"));

        // Create defensive copy
        List<String> copy = new ArrayList<>(original);

        // Modify copy (original unchanged)
        copy.add("D");
        copy.set(0, "Modified");

        System.out.println("Original: " + original);
        System.out.println("Copy: " + copy);

        // Safe sublist access
        List<String> safeSublist = getSafeSublist(original, 1, 3);
        System.out.println("Safe sublist: " + safeSublist);
    }

    static List<String> getSafeSublist(List<String> list, int from, int to) {
        if (list == null) return new ArrayList<>();

        int safeFrom = Math.max(0, from);
        int safeTo = Math.min(list.size(), to);

        if (safeFrom >= safeTo) return new ArrayList<>();

        return new ArrayList<>(list.subList(safeFrom, safeTo));
    }
}
\`\`\`

Accessing ArrayList elements is straightforward but requires attention to bounds checking and null handling. Master these patterns to write robust and safe Java code! 🎯`
};
