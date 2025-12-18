import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_8: Exercise = {
  id: 3.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates ArrayList creation and basic operations:\n1. Create an ArrayList of Strings to store programming languages\n2. Add 5 different programming languages using add() method\n3. Display the size of the ArrayList\n4. Print all elements using a for-each loop\n5. Use get() method to access the first and last elements",
      solution: `import java.util.ArrayList;

public class ArrayListBasics {
    public static void main(String[] args) {
        // Create an ArrayList of Strings
        ArrayList<String> languages = new ArrayList<>();

        // Add programming languages
        languages.add("Java");
        languages.add("Python");
        languages.add("JavaScript");
        languages.add("C++");
        languages.add("Ruby");

        // Display size
        System.out.println("Number of languages: " + languages.size());

        // Print all elements using for-each loop
        System.out.println("\\nAll languages:");
        for (String language : languages) {
            System.out.println("- " + language);
        }

        // Access first and last elements
        System.out.println("\\nFirst language: " + languages.get(0));
        System.out.println("Last language: " + languages.get(languages.size() - 1));
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates adding elements to ArrayList:\n1. Create an empty ArrayList of Integers\n2. Add numbers 10, 20, 30 using add() method\n3. Insert number 15 at index 1 using add(index, element)\n4. Add another number 25 at the end\n5. Display the ArrayList after each operation to show changes",
      solution: `import java.util.ArrayList;

public class ArrayListAdding {
    public static void main(String[] args) {
        // Create empty ArrayList
        ArrayList<Integer> numbers = new ArrayList<>();

        // Add initial numbers
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        System.out.println("After adding 10, 20, 30: " + numbers);

        // Insert 15 at index 1
        numbers.add(1, 15);
        System.out.println("After inserting 15 at index 1: " + numbers);

        // Add 25 at the end
        numbers.add(25);
        System.out.println("After adding 25 at the end: " + numbers);

        // Display final size
        System.out.println("Final size: " + numbers.size());
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that demonstrates removing elements from ArrayList:\n1. Create an ArrayList with names: Alice, Bob, Charlie, Diana, Eve\n2. Remove 'Charlie' by value using remove(Object)\n3. Remove the element at index 1 using remove(int)\n4. Try to remove 'Frank' (which doesn't exist) and handle the result\n5. Clear the entire list and show it's empty",
      solution: `import java.util.ArrayList;

public class ArrayListRemoving {
    public static void main(String[] args) {
        // Create ArrayList with names
        ArrayList<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        names.add("Diana");
        names.add("Eve");

        System.out.println("Initial list: " + names);

        // Remove 'Charlie' by value
        boolean removedCharlie = names.remove("Charlie");
        System.out.println("Removed 'Charlie': " + removedCharlie);
        System.out.println("After removing Charlie: " + names);

        // Remove element at index 1
        String removedName = names.remove(1);
        System.out.println("Removed element at index 1: " + removedName);
        System.out.println("After removing index 1: " + names);

        // Try to remove 'Frank' (doesn't exist)
        boolean removedFrank = names.remove("Frank");
        System.out.println("Removed 'Frank': " + removedFrank);
        System.out.println("List unchanged: " + names);

        // Clear the entire list
        names.clear();
        System.out.println("After clearing: " + names);
        System.out.println("Is empty: " + names.isEmpty());
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates searching and accessing ArrayList elements:\n1. Create an ArrayList of exam scores: 85, 92, 78, 96, 88\n2. Use get() to access each element by index\n3. Find and display the highest score manually (without Collections.max)\n4. Use indexOf() to find the position of score 92\n5. Check if the list contains score 90 using contains()",
      solution: `import java.util.ArrayList;

public class ArrayListAccessing {
    public static void main(String[] args) {
        // Create ArrayList with exam scores
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(96);
        scores.add(88);

        // Access each element by index
        System.out.println("Exam scores:");
        for (int i = 0; i < scores.size(); i++) {
            System.out.println("Index " + i + ": " + scores.get(i));
        }

        // Find highest score manually
        int highest = scores.get(0);
        for (int i = 1; i < scores.size(); i++) {
            if (scores.get(i) > highest) {
                highest = scores.get(i);
            }
        }
        System.out.println("\\nHighest score: " + highest);

        // Find position of score 92
        int indexOf92 = scores.indexOf(92);
        System.out.println("Index of score 92: " + indexOf92);

        // Check if contains 90
        boolean contains90 = scores.contains(90);
        System.out.println("Contains score 90: " + contains90);

        // Check if contains 96
        boolean contains96 = scores.contains(96);
        System.out.println("Contains score 96: " + contains96);
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates ArrayList operations and modifications:\n1. Create an ArrayList with student names: John, Mary, David, Lisa\n2. Replace 'David' with 'Daniel' using set() method\n3. Add 'Emma' and 'Mike' to the end\n4. Create a sublist from index 1 to 3\n5. Check if two ArrayLists are equal after copying one to another",
      solution: `import java.util.ArrayList;
import java.util.List;

public class ArrayListOperations {
    public static void main(String[] args) {
        // Create initial ArrayList
        ArrayList<String> students = new ArrayList<>();
        students.add("John");
        students.add("Mary");
        students.add("David");
        students.add("Lisa");

        System.out.println("Initial students: " + students);

        // Replace 'David' with 'Daniel' using set()
        int davidIndex = students.indexOf("David");
        if (davidIndex != -1) {
            students.set(davidIndex, "Daniel");
        }
        System.out.println("After replacing David: " + students);

        // Add more students
        students.add("Emma");
        students.add("Mike");
        System.out.println("After adding Emma and Mike: " + students);

        // Create a sublist from index 1 to 3 (exclusive)
        List<String> sublist = students.subList(1, 4);
        System.out.println("Sublist (indices 1-3): " + sublist);

        // Create another list and copy elements
        ArrayList<String> studentsCopy = new ArrayList<>(students);
        System.out.println("Copied list: " + studentsCopy);

        // Check if lists are equal
        boolean areEqual = students.equals(studentsCopy);
        System.out.println("Lists are equal: " + areEqual);

        // Modify original list
        students.add("Sarah");
        System.out.println("Original after adding Sarah: " + students);
        System.out.println("Copy remains unchanged: " + studentsCopy);
        System.out.println("Lists still equal: " + students.equals(studentsCopy));
    }
}`
    }
  ]
};
