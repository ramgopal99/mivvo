import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_5: SubLesson = {
  id: "12.5",
  title: 'Iterators and Enhanced For Loop',
  status: 'completed',
  content: "`# ðŸ”„ Iterators and Enhanced For Loop in Java Collections

Iteration is a fundamental operation in collections. Java provides several ways to iterate through collections, each with its own advantages and use cases. Understanding these iteration mechanisms is crucial for effective collection usage.

---

## ðŸŽ¯ Iterator Interface

### **What is an Iterator?**

An Iterator is an object that enables you to traverse through a collection and selectively remove elements during iteration. It's part of the Java Collections Framework and provides a uniform way to access elements in any collection.

### **Iterator Methods**

\`"\`\`java
import java.util.Iterator;
import java.util.ArrayList;
import java.util.List;

public class IteratorBasics {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        fruits.add("Cherry");
        fruits.add("Date");

        // Getting an iterator
        Iterator<String> iterator = fruits.iterator();

        // hasNext() - checks if there are more elements
        System.out.println("Has next: " + iterator.hasNext());

        // next() - returns next element and advances iterator
        System.out.println("First element: " + iterator.next());   // Apple
        System.out.println("Second element: " + iterator.next());  // Banana

        // remove() - removes last element returned by next()
        iterator.remove();  // Removes "Banana"
        System.out.println("After removing Banana: " + fruits);

        // Continue iteration
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println("Processing: " + fruit);

            // Remove elements conditionally
            if (fruit.equals("Cherry")) {
                iterator.remove();  // Safe removal during iteration
                System.out.println("Removed Cherry during iteration");
            }
        }

        System.out.println("Final list: " + fruits);
    }
}
\`\`\`

### **Iterator vs For Loop**

\`\`\`java
import java.util.*;

public class IteratorVsForLoop {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        System.out.println("Using traditional for loop:");
        for (int i = 0; i < list.size(); i++) {
            String element = list.get(i);
            System.out.println("Index " + i + ": " + element);

            // Dangerous: modifying list during iteration
            if (element.equals("B")) {
                // list.remove(i);  // This would cause IndexOutOfBoundsException!
            }
        }

        System.out.println("\\nUsing Iterator:");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String element = iterator.next();
            System.out.println("Element: " + element);

            // Safe: modifying list during iteration
            if (element.equals("B")) {
                iterator.remove();  // Safe removal
                System.out.println("Removed B safely");
            }
        }

        System.out.println("Final list: " + list);
    }
}
\`\`\`

---

## ðŸ”„ Enhanced For Loop (For-Each Loop)

### **What is Enhanced For Loop?**

The enhanced for loop (also called for-each loop) is a simplified way to iterate over collections and arrays. It was introduced in Java 5 and provides a cleaner syntax for iteration without needing to manage indices or iterators explicitly.

### **Syntax and Usage**

\`\`\`java
import java.util.*;

public class EnhancedForLoop {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Cherry");

        // Enhanced for loop syntax
        System.out.println("Enhanced for loop:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Equivalent traditional for loop
        System.out.println("\\nTraditional for loop:");
        for (int i = 0; i < fruits.size(); i++) {
            String fruit = fruits.get(i);
            System.out.println(fruit);
        }

        // Works with arrays too
        String[] colors = {"Red", "Green", "Blue"};
        System.out.println("\\nEnhanced for loop with array:");
        for (String color : colors) {
            System.out.println(color);
        }

        // Works with Set
        Set<String> uniqueFruits = new HashSet<>(fruits);
        System.out.println("\\nEnhanced for loop with Set:");
        for (String fruit : uniqueFruits) {
            System.out.println(fruit);
        }
    }
}
\`\`\`

### **Limitations of Enhanced For Loop**

\`\`\`java
import java.util.*;

public class EnhancedForLoopLimitations {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D"));

        System.out.println("Original list: " + list);

        // âŒ Cannot modify collection during iteration
        try {
            for (String item : list) {
                if (item.equals("B")) {
                    // list.remove(item);  // ConcurrentModificationException!
                }
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }

        // âŒ Cannot access index
        // Enhanced for loop doesn't provide index information
        for (String item : list) {
            // System.out.println("Index: ???, Value: " + item);  // No index available
        }

        // âœ… Use traditional for loop when index is needed
        System.out.println("\\nWith index (traditional for loop):");
        for (int i = 0; i < list.size(); i++) {
            System.out.println("Index: " + i + ", Value: " + list.get(i));
        }

        // âœ… Use Iterator when modification is needed
        System.out.println("\\nSafe modification with Iterator:");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String item = iterator.next();
            if (item.equals("B")) {
                iterator.remove();
                System.out.println("Removed B safely");
            }
        }
        System.out.println("Final list: " + list);
    }
}
\`\`\`

---

## ðŸ”§ ListIterator Interface

### **What is ListIterator?**

ListIterator is a more powerful iterator specifically for List implementations. It allows bidirectional traversal and provides additional operations like adding elements during iteration and modifying elements.

### **ListIterator Features**

\`\`\`java
import java.util.*;

public class ListIteratorDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
        System.out.println("Original list: " + list);

        // Get ListIterator
        ListIterator<String> listIterator = list.listIterator();

        // Forward iteration (same as Iterator)
        System.out.println("\\nForward iteration:");
        while (listIterator.hasNext()) {
            int index = listIterator.nextIndex();  // Get next index
            String element = listIterator.next();
            System.out.println("Index " + index + ": " + element);
        }

        // Backward iteration
        System.out.println("\\nBackward iteration:");
        while (listIterator.hasPrevious()) {
            int index = listIterator.previousIndex();  // Get previous index
            String element = listIterator.previous();
            System.out.println("Index " + index + ": " + element);
        }

        // Reset to beginning for modification demo
        listIterator = list.listIterator();

        System.out.println("\\nModifying during iteration:");
        while (listIterator.hasNext()) {
            String element = listIterator.next();
            System.out.println("Processing: " + element);

            if (element.equals("B")) {
                listIterator.set("B-Modified");  // Modify current element
                System.out.println("Modified B to B-Modified");
            }

            if (element.equals("C")) {
                listIterator.add("D");  // Add new element after current
                System.out.println("Added D after C");
            }
        }

        System.out.println("Final list: " + list);
    }
}
\`\`\`

### **ListIterator vs Iterator**

| Feature | Iterator | ListIterator |
|---------|----------|--------------|
| Direction | Forward only | Bidirectional |
| Modification | remove() only | add(), set(), remove() |
| Index access | No | nextIndex(), previousIndex() |
| Applicable to | All Collections | Lists only |

---

## ðŸŽ¯ Choosing the Right Iteration Method

### **When to Use Each Method**

\`\`\`java
import java.util.*;

public class IterationMethodsComparison {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // 1. Enhanced for loop - Simple iteration, no modification needed
        System.out.println("1. Enhanced for loop (read-only):");
        for (String item : list) {
            System.out.print(item + " ");
        }
        System.out.println();

        // 2. Traditional for loop - Need index or modification
        System.out.println("\\n2. Traditional for loop (with index):");
        for (int i = 0; i < list.size(); i++) {
            System.out.println("Index " + i + ": " + list.get(i));
        }

        // 3. Iterator - Safe removal during iteration
        System.out.println("\\n3. Iterator (safe removal):");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String item = iterator.next();
            if (item.equals("C")) {
                iterator.remove();
                System.out.println("Removed C safely");
            } else {
                System.out.print(item + " ");
            }
        }
        System.out.println("\\nList after iterator removal: " + list);

        // Reset list
        list = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // 4. ListIterator - Bidirectional traversal and modification
        System.out.println("\\n4. ListIterator (bidirectional):");
        ListIterator<String> listIterator = list.listIterator();
        while (listIterator.hasNext()) {
            String item = listIterator.next();
            if (item.equals("B")) {
                listIterator.set("B-Modified");
                listIterator.add("B-New");
            }
        }
        System.out.println("List after ListIterator modification: " + list);
    }
}
\`\`\`

### **Performance Considerations**

\`\`\`java
import java.util.*;

public class IterationPerformance {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            list.add(i);
        }

        // Enhanced for loop (fastest for iteration)
        long startTime = System.nanoTime();
        int sum1 = 0;
        for (int num : list) {
            sum1 += num;
        }
        long enhancedForTime = System.nanoTime() - startTime;

        // Traditional for loop with get()
        startTime = System.nanoTime();
        int sum2 = 0;
        for (int i = 0; i < list.size(); i++) {
            sum2 += list.get(i);
        }
        long traditionalForTime = System.nanoTime() - startTime;

        // Iterator
        startTime = System.nanoTime();
        int sum3 = 0;
        Iterator<Integer> iterator = list.iterator();
        while (iterator.hasNext()) {
            sum3 += iterator.next();
        }
        long iteratorTime = System.nanoTime() - startTime;

        System.out.println("Enhanced for loop: " + enhancedForTime / 1000000 + "ms");
        System.out.println("Traditional for loop: " + traditionalForTime / 1000000 + "ms");
        System.out.println("Iterator: " + iteratorTime / 1000000 + "ms");

        // For ArrayList: Enhanced for loop â‰ˆ Iterator > Traditional for loop
        // For LinkedList: Iterator is much faster than random access with get()
    }
}
\`\`\`

---

## ðŸš¨ Fail-Fast vs Fail-Safe Iterators

### **Fail-Fast Iterators**

Most collection iterators are "fail-fast", meaning they throw ConcurrentModificationException if the collection is modified during iteration (except through the iterator's own remove method).

\`\`\`java
import java.util.*;

public class FailFastIterator {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        try {
            Iterator<String> iterator = list.iterator();
            while (iterator.hasNext()) {
                String item = iterator.next();
                System.out.println("Processing: " + item);

                // This will cause ConcurrentModificationException
                if (item.equals("B")) {
                    list.add("D");  // Modifying collection directly during iteration
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Caught ConcurrentModificationException: " + e.getMessage());
        }

        // Safe modification using iterator
        Iterator<String> safeIterator = list.iterator();
        while (safeIterator.hasNext()) {
            String item = safeIterator.next();
            if (item.equals("B")) {
                safeIterator.remove();  // Safe removal
            }
        }
        System.out.println("List after safe removal: " + list);
    }
}
\`\`\`

### **Fail-Safe Iterators**

Some concurrent collections provide fail-safe iterators that don't throw ConcurrentModificationException. Instead, they work on a snapshot of the collection.

\`\`\`java
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.Iterator;
import java.util.List;

public class FailSafeIterator {
    public static void main(String[] args) {
        // CopyOnWriteArrayList provides fail-safe iterator
        List<String> list = new CopyOnWriteArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");

        Iterator<String> iterator = list.iterator();

        while (iterator.hasNext()) {
            String item = iterator.next();
            System.out.println("Processing: " + item);

            // This won't cause ConcurrentModificationException
            if (item.equals("B")) {
                list.add("D");  // Modifying collection during iteration
                System.out.println("Added D during iteration");
            }
        }

        System.out.println("Final list: " + list);
        // Note: Iterator won't see the newly added "D" because it works on a snapshot
    }
}
\`\`\`

---

## ðŸŽ¯ Practical Iterator Examples

### **Custom Iterator Implementation**

\`\`\`java
import java.util.Iterator;
import java.util.NoSuchElementException;

class Range implements Iterable<Integer> {
    private int start;
    private int end;

    public Range(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new RangeIterator();
    }

    private class RangeIterator implements Iterator<Integer> {
        private int current;

        public RangeIterator() {
            this.current = start;
        }

        @Override
        public boolean hasNext() {
            return current <= end;
        }

        @Override
        public Integer next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return current++;
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException("Remove not supported");
        }
    }
}

public class CustomIteratorExample {
    public static void main(String[] args) {
        Range range = new Range(1, 5);

        System.out.println("Using enhanced for loop:");
        for (int num : range) {
            System.out.print(num + " ");
        }

        System.out.println("\\n\\nUsing iterator directly:");
        Iterator<Integer> iterator = range.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();
    }
}
\`\`\`

### **Filtering and Processing Collections**

\`\`\`java
import java.util.*;

public class IteratorProcessing {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        System.out.println("Original list: " + numbers);

        // Remove even numbers using Iterator
        Iterator<Integer> iterator = numbers.iterator();
        while (iterator.hasNext()) {
            Integer num = iterator.next();
            if (num % 2 == 0) {
                iterator.remove();
            }
        }
        System.out.println("After removing even numbers: " + numbers);

        // Reset list
        numbers = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        // Using ListIterator to modify elements
        ListIterator<Integer> listIterator = numbers.listIterator();
        while (listIterator.hasNext()) {
            Integer num = listIterator.next();
            if (num % 3 == 0) {
                listIterator.set(num * 2);  // Double multiples of 3
            }
        }
        System.out.println("After doubling multiples of 3: " + numbers);

        // Bulk operations
        List<Integer> filtered = new ArrayList<>();
        for (Integer num : numbers) {
            if (num > 5) {
                filtered.add(num);
            }
        }
        System.out.println("Numbers greater than 5: " + filtered);
    }
}
\`\`\`

### **Concurrent Collection Iteration**

\`\`\`java
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;

public class ConcurrentIteration {
    public static void main(String[] args) {
        // Regular ArrayList - not safe for concurrent modification
        List<String> regularList = new ArrayList<>(Arrays.asList("A", "B", "C"));

        // CopyOnWriteArrayList - safe for concurrent modification
        List<String> concurrentList = new CopyOnWriteArrayList<>(Arrays.asList("A", "B", "C"));

        System.out.println("Demonstrating concurrent modification:");

        // With regular list - would cause ConcurrentModificationException
        try {
            for (String item : regularList) {
                System.out.println("Processing: " + item);
                if (item.equals("B")) {
                    regularList.add("D");  // This is dangerous!
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("Regular list threw: " + e.getClass().getSimpleName());
        }

        // With CopyOnWriteArrayList - safe
        for (String item : concurrentList) {
            System.out.println("Processing: " + item);
            if (item.equals("B")) {
                concurrentList.add("D");  // This is safe!
                System.out.println("Added D during iteration");
            }
        }

        System.out.println("Concurrent list final state: " + concurrentList);
    }
}
\`\`\`

---

## ðŸŽ¯ Summary

### **Iterator Interface Key Points**

- **Traversal**: Provides uniform way to access collection elements
- **Safe Removal**: Allows removal during iteration without ConcurrentModificationException
- **Methods**: \`hasNext()\`, \`next()\`, \`remove()\`
- **Fail-Fast**: Throws exception if collection modified during iteration
- **Read-Only**: Iterator itself cannot modify elements (except remove)

### **Enhanced For Loop Key Points**

- **Simple Syntax**: \`for (Type element : collection)\`
- **Read-Only**: Cannot modify collection during iteration
- **No Index Access**: Cannot access element indices
- **Works With**: Arrays, Collections, any Iterable
- **Performance**: Generally fastest for simple iteration

### **ListIterator Key Points**

- **Bidirectional**: Can traverse forward and backward
- **Rich Operations**: \`add()\`, \`set()\`, \`remove()\`, \`hasPrevious()\`, \`previous()\`
- **Index Access**: \`nextIndex()\`, \`previousIndex()\`
- **List-Only**: Only available for List implementations

### **Choosing the Right Iteration Method**

| Use Case | Recommended Method | Reason |
|----------|-------------------|---------|
| Simple read-only iteration | Enhanced for loop | Cleanest syntax, best performance |
| Need element indices | Traditional for loop | Access to index variable |
| Safe removal during iteration | Iterator | Prevents ConcurrentModificationException |
| Bidirectional traversal/modification | ListIterator | Most powerful, but List-only |
| Concurrent collections | Enhanced for loop or Iterator | Fail-safe iterators available |

### **Performance Guidelines**

- **Enhanced for loop**: Fastest for ArrayList and arrays
- **Iterator**: Slightly slower but safe for modification
- **Traditional for loop**: Good when index is needed
- **ListIterator**: Convenient for Lists with modification needs

### **Common Pitfalls**

- **ConcurrentModificationException**: Modifying collection during iteration
- **NoSuchElementException**: Calling next() when hasNext() is false
- **UnsupportedOperationException**: Attempting remove() on read-only iterators
- **IndexOutOfBoundsException**: Accessing invalid indices in traditional loops

### **Quick Check**
What will be the output of this code?
\`\`\`java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
Iterator<String> it = list.iterator();
it.next();
it.remove();
System.out.println(list);
\`\`\`
Output: [B, C]
`
};


