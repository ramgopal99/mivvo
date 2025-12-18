import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_2: SubLesson = {
  id: "12.2",
  title: 'List Interface and ArrayList',
  status: 'completed',
  content: `# 📋 List Interface and ArrayList in Java

The List interface is one of the most frequently used interfaces in the Java Collections Framework. It represents an ordered collection that allows duplicate elements and provides positional access to elements. ArrayList is the most commonly used implementation of the List interface.

---

## 🎯 The List Interface

### **What is a List?**

A List is an ordered collection (sequence) that can contain duplicate elements. Unlike Sets, Lists maintain insertion order and allow access to elements by their integer index (position).

### **Core List Operations**

\`\`\`java
import java.util.List;
import java.util.ArrayList;

public class ListInterfaceDemo {
    public static void main(String[] args) {
        // Creating a List (using ArrayList implementation)
        List<String> names = new ArrayList<>();

        // Basic operations
        names.add("Alice");     // Append to end
        names.add("Bob");
        names.add("Charlie");

        // Positional access
        System.out.println("First element: " + names.get(0));      // Alice
        System.out.println("Second element: " + names.get(1));     // Bob

        // Insertion at specific position
        names.add(1, "Anna");   // Insert at index 1
        System.out.println("After insertion: " + names);           // [Alice, Anna, Bob, Charlie]

        // Replacement
        names.set(2, "Bobby");  // Replace element at index 2
        System.out.println("After replacement: " + names);         // [Alice, Anna, Bobby, Charlie]

        // Removal
        names.remove(1);        // Remove element at index 1
        names.remove("Charlie"); // Remove by object value
        System.out.println("After removals: " + names);            // [Alice, Bobby]

        // Search operations
        System.out.println("Index of Alice: " + names.indexOf("Alice"));     // 0
        System.out.println("Index of Bobby: " + names.indexOf("Bobby"));     // 1
        System.out.println("Contains Alice: " + names.contains("Alice"));    // true
        System.out.println("Contains David: " + names.contains("David"));    // false

        // Size and emptiness
        System.out.println("Size: " + names.size());               // 2
        System.out.println("Is empty: " + names.isEmpty());        // false

        // Bulk operations
        List<String> moreNames = new ArrayList<>(Arrays.asList("Diana", "Eve"));
        names.addAll(moreNames);  // Add all elements from another collection
        System.out.println("After addAll: " + names);              // [Alice, Bobby, Diana, Eve]

        names.addAll(1, Arrays.asList("Ben", "Cathy"));  // Insert all at position 1
        System.out.println("After insertAll: " + names);           // [Alice, Ben, Cathy, Bobby, Diana, Eve]

        // Sublist operations
        List<String> subList = names.subList(2, 5);  // Elements from index 2 to 4
        System.out.println("Sublist (2,5): " + subList);           // [Cathy, Bobby, Diana]

        // Clearing the list
        names.clear();
        System.out.println("After clear - Size: " + names.size()); // 0
    }
}
\`\`\`

### **List Iterators**

\`\`\`java
import java.util.List;
import java.util.ArrayList;
import java.util.ListIterator;

public class ListIterators {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry", "Date"));

        // Basic for-each iteration
        System.out.println("For-each iteration:");
        for (String fruit : fruits) {
            System.out.println(fruit);
        }

        // Traditional for loop with index
        System.out.println("\\nIndexed iteration:");
        for (int i = 0; i < fruits.size(); i++) {
            System.out.println("Index " + i + ": " + fruits.get(i));
        }

        // Using Iterator (forward only)
        System.out.println("\\nIterator (forward only):");
        java.util.Iterator<String> iterator = fruits.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
            // Can remove current element during iteration
            if (fruit.equals("Banana")) {
                iterator.remove();  // Safe removal during iteration
            }
        }
        System.out.println("After iterator removal: " + fruits);

        // Using ListIterator (bidirectional)
        fruits.addAll(Arrays.asList("Elderberry", "Fig"));
        System.out.println("\\nOriginal list: " + fruits);

        ListIterator<String> listIterator = fruits.listIterator();

        System.out.println("Forward iteration:");
        while (listIterator.hasNext()) {
            int index = listIterator.nextIndex();
            String fruit = listIterator.next();
            System.out.println("Index " + index + ": " + fruit);
        }

        System.out.println("Backward iteration:");
        while (listIterator.hasPrevious()) {
            int index = listIterator.previousIndex();
            String fruit = listIterator.previous();
            System.out.println("Index " + index + ": " + fruit);
        }

        // Modifying during bidirectional iteration
        listIterator = fruits.listIterator();
        while (listIterator.hasNext()) {
            String fruit = listIterator.next();
            if (fruit.equals("Cherry")) {
                listIterator.set("Cherry Tomato");  // Replace current element
            }
            if (fruit.equals("Date")) {
                listIterator.add("Dragon Fruit");   // Insert new element after current
            }
        }
        System.out.println("After modifications: " + fruits);
    }
}
\`\`\`

---

## 🚀 ArrayList - The Workhorse Implementation

### **What is ArrayList?**

ArrayList is the most commonly used implementation of the List interface. It uses a dynamic array to store elements, providing fast random access and efficient iteration.

### **Key Characteristics**

- **Random Access**: O(1) time complexity for get() and set() operations
- **Dynamic Sizing**: Automatically grows as elements are added
- **Fast Iteration**: Excellent performance for sequential access
- **Memory Efficient**: Stores elements in contiguous memory locations
- **Not Thread-Safe**: Multiple threads should not access simultaneously without synchronization

### **ArrayList Internals**

\`\`\`java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable {

    private static final long serialVersionUID = 8683452581122892189L;

    /**
     * Default initial capacity.
     */
    private static final int DEFAULT_CAPACITY = 10;

    /**
     * Shared empty array instance used for empty instances.
     */
    private static final Object[] EMPTY_ELEMENTDATA = {};

    /**
     * Shared empty array instance used for default sized empty instances.
     */
    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    /**
     * The array buffer into which the elements of the ArrayList are stored.
     */
    transient Object[] elementData;

    /**
     * The size of the ArrayList (the number of elements it contains).
     */
    private int size;
}
\`\`\`

### **Capacity and Growth Strategy**

\`\`\`java
import java.util.ArrayList;
import java.lang.reflect.Field;

public class ArrayListCapacity {
    public static void main(String[] args) throws Exception {
        // Create ArrayList with default capacity
        ArrayList<String> list = new ArrayList<>();
        printCapacity(list);  // Capacity: 0 (initially uses EMPTY_ELEMENTDATA)

        // Add first element
        list.add("First");
        printCapacity(list);  // Capacity: 10 (DEFAULT_CAPACITY)

        // Fill to capacity
        for (int i = 1; i < 10; i++) {
            list.add("Item " + i);
        }
        printCapacity(list);  // Capacity: 10

        // Add one more - triggers growth
        list.add("Eleventh");
        printCapacity(list);  // Capacity: 15 (10 * 1.5)

        // Continue adding
        for (int i = 11; i < 16; i++) {
            list.add("Item " + i);
        }
        printCapacity(list);  // Capacity: 15

        // Add one more - triggers another growth
        list.add("Sixteenth");
        printCapacity(list);  // Capacity: 22 (15 * 1.5 ≈ 22)
    }

    private static void printCapacity(ArrayList<?> list) throws Exception {
        Field field = ArrayList.class.getDeclaredField("elementData");
        field.setAccessible(true);
        Object[] elementData = (Object[]) field.get(list);

        Field sizeField = ArrayList.class.getDeclaredField("size");
        sizeField.setAccessible(true);
        int size = (int) sizeField.get(list);

        System.out.println("Size: " + size + ", Capacity: " + elementData.length);
    }
}
\`\`\`

### **ArrayList Constructors**

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;

public class ArrayListConstructors {
    public static void main(String[] args) {
        // 1. Default constructor - initial capacity 10
        ArrayList<String> defaultList = new ArrayList<>();
        System.out.println("Default constructor capacity: " + getCapacity(defaultList));

        // 2. Constructor with initial capacity
        ArrayList<String> capacityList = new ArrayList<>(50);
        System.out.println("Custom capacity constructor: " + getCapacity(capacityList));

        // 3. Constructor with Collection parameter
        ArrayList<String> collectionList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        System.out.println("Collection constructor: " + collectionList);
        System.out.println("Collection constructor size: " + collectionList.size());

        // 4. Creating ArrayList from another List
        ArrayList<String> copyList = new ArrayList<>(collectionList);
        copyList.add("D");
        System.out.println("Original: " + collectionList);
        System.out.println("Copy: " + copyList);

        // 5. Using Arrays.asList() - creates a fixed-size list backed by array
        java.util.List<String> fixedList = Arrays.asList("X", "Y", "Z");
        // fixedList.add("W");  // UnsupportedOperationException!

        // Convert to ArrayList if you need a modifiable list
        ArrayList<String> modifiableList = new ArrayList<>(fixedList);
        modifiableList.add("W");
        System.out.println("Modifiable list: " + modifiableList);
    }

    private static int getCapacity(ArrayList<?> list) {
        try {
            java.lang.reflect.Field field = ArrayList.class.getDeclaredField("elementData");
            field.setAccessible(true);
            Object[] elementData = (Object[]) field.get(list);
            return elementData.length;
        } catch (Exception e) {
            return -1;
        }
    }
}
\`\`\`

---

## ⚡ ArrayList Performance Characteristics

### **Time Complexity**

| Operation | Time Complexity | Notes |
|-----------|-----------------|--------|
| \`get(index)\` | O(1) | Direct array access |
| \`set(index, element)\` | O(1) | Direct array access |
| \`add(element)\` | O(1) amortized | May require array copy if resize needed |
| \`add(index, element)\` | O(n) | Elements after index must shift |
| \`remove(index)\` | O(n) | Elements after index must shift |
| \`remove(Object)\` | O(n) | Linear search + shift |
| \`contains(element)\` | O(n) | Linear search |
| \`indexOf(element)\` | O(n) | Linear search |
| \`size()\` | O(1) | Direct field access |
| \`isEmpty()\` | O(1) | Direct field access |

### **Space Complexity**

- **O(n)** where n is the number of elements
- Additional space overhead for capacity beyond current size
- Each element reference takes additional memory

### **Performance Tips**

\`\`\`java
import java.util.ArrayList;
import java.util.Arrays;

public class ArrayListPerformanceTips {
    public static void main(String[] args) {
        // 1. Pre-size ArrayList if you know the approximate size
        ArrayList<String> largeList = new ArrayList<>(100000);  // Better than default 10

        // 2. Use add() for appending (efficient)
        largeList.add("Item 1");
        largeList.add("Item 2");  // O(1) amortized

        // 3. Avoid frequent insertions/removals in middle
        ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "D", "E"));
        list.add(2, "C");  // O(n) - shifts "D" and "E"

        // 4. Use removeAll() for bulk removals
        ArrayList<String> numbers = new ArrayList<>(Arrays.asList("1", "2", "3", "4", "5"));
        numbers.removeAll(Arrays.asList("2", "4"));  // More efficient than individual removes

        // 5. Use clear() instead of creating new ArrayList
        ArrayList<String> temp = new ArrayList<>();
        // ... use temp ...
        temp.clear();  // Reuses existing capacity
        // temp = new ArrayList<>();  // Less efficient - creates new backing array

        // 6. Use subList() for range operations (creates view, not copy)
        ArrayList<Integer> nums = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
        java.util.List<Integer> middle = nums.subList(3, 7);  // [4, 5, 6, 7]
        middle.clear();  // Affects original list!
        System.out.println("After subList clear: " + nums);  // [1, 2, 3, 8, 9, 10]

        // 7. Use toArray() for array conversion
        String[] array = list.toArray(new String[0]);  // Efficient conversion
    }
}
\`\`\`

---

## 🔄 ArrayList vs Other List Implementations

### **ArrayList vs LinkedList**

\`\`\`java
import java.util.*;

public class ArrayListVsLinkedList {
    public static void main(String[] args) {
        // ArrayList: Fast random access, slow insertions/deletions in middle
        List<String> arrayList = new ArrayList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // LinkedList: Fast insertions/deletions, slow random access
        List<String> linkedList = new LinkedList<>(Arrays.asList("A", "B", "C", "D", "E"));

        // Random access comparison
        long startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String element = arrayList.get(arrayList.size() / 2);
        }
        long arrayListTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            String element = linkedList.get(linkedList.size() / 2);
        }
        long linkedListTime = System.nanoTime() - startTime;

        System.out.println("Random access - ArrayList: " + arrayListTime / 1000000 + "ms");
        System.out.println("Random access - LinkedList: " + linkedListTime / 1000000 + "ms");

        // Insertion comparison (middle)
        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            arrayList.add(arrayList.size() / 2, "X");
        }
        arrayListTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        for (int i = 0; i < 10000; i++) {
            linkedList.add(linkedList.size() / 2, "X");
        }
        linkedListTime = System.nanoTime() - startTime;

        System.out.println("Middle insertion - ArrayList: " + arrayListTime / 1000000 + "ms");
        System.out.println("Middle insertion - LinkedList: " + linkedListTime / 1000000 + "ms");
    }
}
\`\`\`

### **Choosing the Right List Implementation**

| Use Case | Recommended Implementation | Reason |
|----------|---------------------------|---------|
| Fast random access | ArrayList | O(1) get/set operations |
| Frequent insertions/deletions in middle | LinkedList | O(1) add/remove operations |
| Frequent insertions/deletions at ends | ArrayList or LinkedList | Both efficient for end operations |
| Memory efficiency | ArrayList | Lower overhead per element |
| Stack operations | ArrayDeque | More efficient than Stack class |
| Queue operations | LinkedList or ArrayDeque | Good for FIFO operations |
| Thread-safe operations | Vector or Collections.synchronizedList() | Built-in synchronization |

---

## 🧵 Thread Safety Considerations

### **ArrayList is Not Thread-Safe**

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ThreadSafetyDemo {
    public static void main(String[] args) throws InterruptedException {
        // Non-thread-safe ArrayList
        List<String> unsafeList = new ArrayList<>();

        // Thread-safe alternatives
        List<String> safeList1 = Collections.synchronizedList(new ArrayList<>());
        List<String> safeList2 = new java.util.concurrent.CopyOnWriteArrayList<>();

        // Demonstration of thread safety issue (may not always show problem)
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                unsafeList.add("Item " + i);
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Unsafe list size (may be incorrect): " + unsafeList.size());

        // Proper thread-safe usage
        Runnable safeTask = () -> {
            for (int i = 0; i < 1000; i++) {
                safeList1.add("Item " + i);
            }
        };

        List<String> finalSafeList = safeList1;
        Runnable safeTask2 = () -> {
            for (int i = 0; i < 1000; i++) {
                finalSafeList.add("Item " + i);
            }
        };

        t1 = new Thread(safeTask);
        t2 = new Thread(safeTask2);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Safe list size (correct): " + safeList1.size());
    }
}
\`\`\`

---

## 🎯 Practical ArrayList Examples

### **Student Grade Management**

\`\`\`java
import java.util.*;

class Student {
    private String name;
    private List<Integer> grades;

    public Student(String name) {
        this.name = name;
        this.grades = new ArrayList<>();
    }

    public void addGrade(int grade) {
        grades.add(grade);
    }

    public double getAverageGrade() {
        if (grades.isEmpty()) return 0.0;
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.size();
    }

    public List<Integer> getGrades() {
        return new ArrayList<>(grades);  // Return defensive copy
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name + " - Grades: " + grades + " - Average: " + String.format("%.2f", getAverageGrade());
    }
}

public class StudentGradeManager {
    private List<Student> students;

    public StudentGradeManager() {
        this.students = new ArrayList<>();
    }

    public void addStudent(Student student) {
        students.add(student);
    }

    public void displayAllStudents() {
        for (Student student : students) {
            System.out.println(student);
        }
    }

    public Student findStudentWithHighestAverage() {
        if (students.isEmpty()) return null;

        Student topStudent = students.get(0);
        for (Student student : students) {
            if (student.getAverageGrade() > topStudent.getAverageGrade()) {
                topStudent = student;
            }
        }
        return topStudent;
    }

    public List<Student> getStudentsAboveAverage(double threshold) {
        List<Student> aboveAverage = new ArrayList<>();
        for (Student student : students) {
            if (student.getAverageGrade() >= threshold) {
                aboveAverage.add(student);
            }
        }
        return aboveAverage;
    }

    public static void main(String[] args) {
        StudentGradeManager manager = new StudentGradeManager();

        Student alice = new Student("Alice");
        alice.addGrade(85);
        alice.addGrade(90);
        alice.addGrade(88);

        Student bob = new Student("Bob");
        bob.addGrade(75);
        bob.addGrade(80);
        bob.addGrade(82);

        Student charlie = new Student("Charlie");
        charlie.addGrade(95);
        charlie.addGrade(92);
        charlie.addGrade(98);

        manager.addStudent(alice);
        manager.addStudent(bob);
        manager.addStudent(charlie);

        System.out.println("All Students:");
        manager.displayAllStudents();

        System.out.println("\\nTop Student: " + manager.findStudentWithHighestAverage());

        System.out.println("\\nStudents with average >= 85:");
        List<Student> aboveAverage = manager.getStudentsAboveAverage(85);
        for (Student student : aboveAverage) {
            System.out.println(student.getName() + ": " + String.format("%.2f", student.getAverageGrade()));
        }
    }
}
\`\`\`

### **Dynamic Array Operations**

\`\`\`java
import java.util.*;

public class DynamicArrayOperations {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();

        // Adding elements dynamically
        list.add("First");
        list.add("Second");
        list.add("Third");

        System.out.println("Initial list: " + list);

        // Inserting elements
        list.add(1, "Inserted at position 1");
        System.out.println("After insertion: " + list);

        // Replacing elements
        list.set(2, "Replaced second element");
        System.out.println("After replacement: " + list);

        // Removing elements
        list.remove(0);  // Remove first element
        list.remove("Third");  // Remove by value
        System.out.println("After removals: " + list);

        // Bulk operations
        ArrayList<String> moreItems = new ArrayList<>(Arrays.asList("Fourth", "Fifth", "Sixth"));
        list.addAll(moreItems);
        System.out.println("After addAll: " + list);

        // Retain only certain elements
        list.retainAll(Arrays.asList("Inserted at position 1", "Replaced second element", "Fourth"));
        System.out.println("After retainAll: " + list);

        // Sorting
        Collections.sort(list);
        System.out.println("After sorting: " + list);

        // Reversing
        Collections.reverse(list);
        System.out.println("After reversing: " + list);

        // Shuffling
        Collections.shuffle(list);
        System.out.println("After shuffling: " + list);

        // Finding elements
        System.out.println("Index of 'Fourth': " + list.indexOf("Fourth"));
        System.out.println("Last index of 'Fourth': " + list.lastIndexOf("Fourth"));

        // Sublists
        List<String> subList = list.subList(0, 2);
        System.out.println("Sublist (0,2): " + subList);

        // Converting to array
        String[] array = list.toArray(new String[0]);
        System.out.println("As array: " + Arrays.toString(array));

        // Iterating with different methods
        System.out.println("\\nIteration methods:");
        System.out.println("For-each:");
        for (String item : list) {
            System.out.print(item + " ");
        }
        System.out.println();

        System.out.println("Iterator:");
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            System.out.print(iterator.next() + " ");
        }
        System.out.println();

        System.out.println("ListIterator (backward):");
        ListIterator<String> listIterator = list.listIterator(list.size());
        while (listIterator.hasPrevious()) {
            System.out.print(listIterator.previous() + " ");
        }
        System.out.println();
    }
}
\`\`\`

---

## 🎯 Summary

### **List Interface Key Points**

- **Ordered Collection**: Maintains insertion order
- **Allows Duplicates**: Same element can appear multiple times
- **Positional Access**: Elements accessible by integer index
- **Core Methods**: \`add()\`, \`get()\`, \`set()\`, \`remove()\`, \`contains()\`, \`size()\`

### **ArrayList Key Points**

- **Fast Random Access**: O(1) for get/set operations
- **Dynamic Growth**: Automatically resizes as needed
- **Efficient Iteration**: Excellent for sequential access
- **Memory Contiguous**: Elements stored in contiguous memory
- **Growth Strategy**: Capacity increases by ~50% when full
- **Not Thread-Safe**: Use Collections.synchronizedList() for thread safety

### **Performance Guidelines**

- **Choose ArrayList for**: Random access, iteration, end insertions
- **Choose LinkedList for**: Frequent middle insertions/deletions
- **Pre-size when possible**: Reduces array copying overhead
- **Use bulk operations**: More efficient than individual operations
- **Consider thread safety**: Use synchronized wrappers if needed

### **Common Pitfalls**

- **IndexOutOfBoundsException**: Accessing invalid indices
- **ConcurrentModificationException**: Modifying during iteration
- **Memory inefficiency**: Keeping large capacity when not needed
- **Thread safety issues**: Multiple threads accessing without synchronization

### **Quick Check**
What will be the output of this code?
\`\`\`java
List<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));
list.add(1, "X");
list.remove(2);
System.out.println(list);
\`\`\`
Output: [A, X, C]
`
};

