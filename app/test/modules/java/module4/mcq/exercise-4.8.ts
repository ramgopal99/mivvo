import { Exercise } from '../../../../data/lessonsData';

export const exercise_4_8: Exercise = {
  id: 4.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates HashMap creation and basic operations:\n1. Create a HashMap to store country capitals (String keys, String values)\n2. Add 5 country-capital pairs using put() method\n3. Display the size of the HashMap\n4. Print all key-value pairs using entrySet()\n5. Access specific values using get() method",
      solution: `import java.util.HashMap;
import java.util.Map;

public class HashMapBasics {
    public static void main(String[] args) {
        // Create a HashMap to store country capitals
        HashMap<String, String> capitals = new HashMap<>();

        // Add country-capital pairs
        capitals.put("USA", "Washington D.C.");
        capitals.put("UK", "London");
        capitals.put("France", "Paris");
        capitals.put("Germany", "Berlin");
        capitals.put("Japan", "Tokyo");

        // Display size
        System.out.println("Number of countries: " + capitals.size());

        // Print all entries using entrySet
        System.out.println("\\nCountry capitals:");
        for (Map.Entry<String, String> entry : capitals.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }

        // Access specific values
        System.out.println("\\nSpecific capitals:");
        System.out.println("USA: " + capitals.get("USA"));
        System.out.println("France: " + capitals.get("France"));
        System.out.println("India: " + capitals.get("India")); // Will be null
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates HashMap modification operations:\n1. Create a HashMap with student IDs (Integer) and names (String)\n2. Add 3 students using put() method\n3. Update one student's name using put() with existing key\n4. Remove a student using remove(key)\n5. Check if a key exists using containsKey()\n6. Display the map after each operation",
      solution: `import java.util.HashMap;

public class HashMapModifications {
    public static void main(String[] args) {
        // Create HashMap with student IDs and names
        HashMap<Integer, String> students = new HashMap<>();

        // Add initial students
        students.put(101, "Alice");
        students.put(102, "Bob");
        students.put(103, "Charlie");
        System.out.println("Initial students: " + students);

        // Update a student's name
        students.put(102, "Robert"); // Overwrites existing entry
        System.out.println("After updating Bob to Robert: " + students);

        // Remove a student
        String removedStudent = students.remove(103);
        System.out.println("Removed student: " + removedStudent);
        System.out.println("After removing Charlie: " + students);

        // Check if key exists
        boolean hasKey101 = students.containsKey(101);
        boolean hasKey103 = students.containsKey(103);
        System.out.println("Contains key 101: " + hasKey101);
        System.out.println("Contains key 103: " + hasKey103);
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that demonstrates HashMap iteration techniques:\n1. Create a HashMap with product names and prices\n2. Iterate using keySet() and get values\n3. Iterate using entrySet() for better performance\n4. Iterate using values() to access only values\n5. Calculate total price of all products",
      solution: `import java.util.HashMap;
import java.util.Map;

public class HashMapIteration {
    public static void main(String[] args) {
        // Create HashMap with products and prices
        HashMap<String, Double> products = new HashMap<>();
        products.put("Apple", 2.50);
        products.put("Banana", 1.80);
        products.put("Orange", 3.20);
        products.put("Grape", 4.00);

        // Method 1: Iterate using keySet()
        System.out.println("Method 1 - Using keySet():");
        for (String product : products.keySet()) {
            double price = products.get(product);
            System.out.println(product + ": $" + price);
        }

        // Method 2: Iterate using entrySet() (more efficient)
        System.out.println("\\nMethod 2 - Using entrySet():");
        for (Map.Entry<String, Double> entry : products.entrySet()) {
            System.out.println(entry.getKey() + ": $" + entry.getValue());
        }

        // Method 3: Iterate values only
        System.out.println("\\nMethod 3 - Values only:");
        double total = 0;
        for (double price : products.values()) {
            System.out.println("$" + price);
            total += price;
        }
        System.out.println("Total price: $" + total);
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates HashMap with custom objects:\n1. Create a Student class with id, name, and grade fields\n2. Create a HashMap using student ID as key and Student object as value\n3. Add 3 students to the map\n4. Retrieve and display student information\n5. Update a student's grade and show the change",
      solution: `import java.util.HashMap;

public class HashMapCustomObjects {
    public static void main(String[] args) {
        // Create HashMap with Integer keys and Student values
        HashMap<Integer, Student> studentMap = new HashMap<>();

        // Create student objects
        Student student1 = new Student(101, "Alice", 85.5);
        Student student2 = new Student(102, "Bob", 92.0);
        Student student3 = new Student(103, "Charlie", 78.8);

        // Add students to map
        studentMap.put(student1.getId(), student1);
        studentMap.put(student2.getId(), student2);
        studentMap.put(student3.getId(), student3);

        // Display all students
        System.out.println("All students:");
        for (Student student : studentMap.values()) {
            System.out.println(student);
        }

        // Retrieve specific student
        Student retrievedStudent = studentMap.get(102);
        if (retrievedStudent != null) {
            System.out.println("\\nRetrieved student 102: " + retrievedStudent);
        }

        // Update a student's grade
        retrievedStudent.setGrade(95.0);
        System.out.println("After updating Bob's grade: " + retrievedStudent);

        // Show the map reflects the change
        System.out.println("Student 102 in map: " + studentMap.get(102));
    }
}

class Student {
    private int id;
    private String name;
    private double grade;

    public Student(int id, String name, double grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getGrade() { return grade; }
    public void setGrade(double grade) { this.grade = grade; }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", grade=" + grade +
                '}';
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates HashMap utility methods:\n1. Create two HashMaps with some overlapping keys\n2. Use putIfAbsent() to add entries conditionally\n3. Use getOrDefault() to safely retrieve values\n4. Demonstrate replace() operations\n5. Show how to merge two maps and handle conflicts",
      solution: `import java.util.HashMap;

public class HashMapUtilities {
    public static void main(String[] args) {
        // Create first HashMap
        HashMap<String, Integer> map1 = new HashMap<>();
        map1.put("Alice", 25);
        map1.put("Bob", 30);
        map1.put("Charlie", 35);

        System.out.println("Map1: " + map1);

        // putIfAbsent() - only adds if key doesn't exist
        map1.putIfAbsent("Alice", 99); // Won't change, Alice already exists
        map1.putIfAbsent("Diana", 28); // Will add, Diana doesn't exist
        System.out.println("After putIfAbsent operations: " + map1);

        // getOrDefault() - returns default if key not found
        int aliceAge = map1.getOrDefault("Alice", 0);
        int eveAge = map1.getOrDefault("Eve", 0);
        System.out.println("\\nAlice age: " + aliceAge);
        System.out.println("Eve age (default): " + eveAge);

        // replace() operations
        boolean replaced = map1.replace("Bob", 30, 32); // Only replaces if current value is 30
        System.out.println("Replaced Bob's age: " + replaced);
        System.out.println("Map after replace: " + map1);

        // Create second map for merging
        HashMap<String, Integer> map2 = new HashMap<>();
        map2.put("Bob", 40); // Different value for Bob
        map2.put("Eve", 22); // New entry

        // Merge maps - keep higher value in case of conflict
        map2.forEach((key, value) ->
            map1.merge(key, value, (oldValue, newValue) -> Math.max(oldValue, newValue))
        );

        System.out.println("\\nAfter merging (keeping higher values): " + map1);
    }
}`
    }
  ]
};
