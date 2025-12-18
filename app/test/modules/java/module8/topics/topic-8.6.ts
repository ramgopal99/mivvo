import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: "8.6",
  title: 'Final Keyword and Immutability',
  status: 'completed',
  content: `# 🔒 Final Keyword and Immutability in Java

Master immutability and the final keyword for creating robust, thread-safe classes!

---

## 🎯 The Final Keyword

### **1. Final Variables**
\`\`\`java
public class FinalVariables {
    // Final instance variable - must be initialized
    private final String name;
    private final int id;

    // Final static variable (constant)
    public static final double PI = 3.14159;
    public static final String APP_NAME = "MyApp";

    // Final local variable
    public void processData() {
        final int maxRetries = 3;
        final String configFile = "app.config";

        // maxRetries = 5; // ERROR: Cannot reassign final variable

        for (int i = 0; i < maxRetries; i++) {
            // Can use final variable in loop
            System.out.println("Attempt " + (i + 1));
        }
    }

    // Constructor initializes final instance variables
    public FinalVariables(String name, int id) {
        this.name = name;  // Initialize final variable
        this.id = id;
    }

    // Instance initializer block can also initialize final variables
    {
        // name = "Default"; // Cannot initialize final in instance block
        // Final instance variables must be initialized in constructor or declaration
    }

    // Static initializer can initialize final static variables
    static {
        // PI = 3.14; // Cannot modify final static variable
    }
}
\`\`\`

### **2. Final Methods**
\`\`\`java
public class Parent {
    // Final method - cannot be overridden
    public final void displayMessage() {
        System.out.println("This is a final method");
    }

    public void regularMethod() {
        System.out.println("This can be overridden");
    }
}

public class Child extends Parent {
    // This would cause compilation error
    // @Override
    // public void displayMessage() { } // ERROR: Cannot override final method

    // This is OK
    @Override
    public void regularMethod() {
        System.out.println("Overridden method");
    }
}
\`\`\`

### **3. Final Classes**
\`\`\`java
// Final class - cannot be extended
public final class ImmutableClass {
    private final String value;

    public ImmutableClass(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    // Class cannot be extended, methods cannot be overridden
}

// This would cause compilation error
// public class ExtendedClass extends ImmutableClass { } // ERROR: Cannot inherit from final class

// Common final classes in Java
public class FinalClassExamples {
    public static void main(String[] args) {
        // String is final
        String str = "Hello";

        // Integer, Double, etc. are final
        Integer num = 42;

        // Math class is final
        double sqrt = Math.sqrt(16);
    }
}
\`\`\`

---

## 🛡️ Immutability

### **What is Immutability?**

An **immutable object** is one whose state cannot be changed after construction. Immutable objects are thread-safe and can be safely shared.

### **Creating Immutable Classes**
\`\`\`java
public final class ImmutablePerson {
    // All fields are final and private
    private final String firstName;
    private final String lastName;
    private final LocalDate birthDate;
    private final List<String> hobbies; // Mutable object!

    // Constructor validates and copies mutable objects
    public ImmutablePerson(String firstName, String lastName, LocalDate birthDate, List<String> hobbies) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;

        // Defensive copy for mutable objects
        this.hobbies = hobbies != null ? List.copyOf(hobbies) : List.of();
    }

    // Only getters, no setters
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate; // LocalDate is immutable
    }

    public List<String> getHobbies() {
        return hobbies; // Returns immutable view
    }

    // Business methods
    public String getFullName() {
        return firstName + " " + lastName;
    }

    public int getAge() {
        return Period.between(birthDate, LocalDate.now()).getYears();
    }

    // Factory method
    public static ImmutablePerson create(String firstName, String lastName) {
        return new ImmutablePerson(firstName, lastName, null, null);
    }
}
\`\`\`

### **Benefits of Immutability**
\`\`\`java
public class ImmutabilityBenefits {
    public static void main(String[] args) {
        List<String> hobbies = new ArrayList<>(Arrays.asList("Reading", "Gaming"));
        ImmutablePerson person = new ImmutablePerson("John", "Doe",
                                                   LocalDate.of(1990, 1, 1), hobbies);

        // Cannot modify the object
        // person.setFirstName("Jane"); // No such method!

        // Original list can be modified, but person's hobbies are safe
        hobbies.add("Cooking");
        System.out.println("Original hobbies: " + hobbies);
        System.out.println("Person hobbies: " + person.getHobbies()); // Unchanged

        // Thread-safe: can be shared across threads safely
        Runnable task1 = () -> System.out.println("Thread 1: " + person.getFullName());
        Runnable task2 = () -> System.out.println("Thread 2: " + person.getFullName());

        new Thread(task1).start();
        new Thread(task2).start();
    }
}
\`\`\`

---

## 🔄 Mutable vs Immutable Objects

### **Mutable Objects (Problematic)**
\`\`\`java
public class MutablePerson {
    private String name;
    private List<String> addresses;

    public MutablePerson(String name, List<String> addresses) {
        this.name = name;
        this.addresses = addresses; // Dangerous!
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<String> getAddresses() { return addresses; }
    public void setAddresses(List<String> addresses) { this.addresses = addresses; }
}

public class MutableProblem {
    public static void main(String[] args) {
        List<String> addresses = new ArrayList<>(Arrays.asList("123 Main St"));
        MutablePerson person = new MutablePerson("John", addresses);

        // External modification affects the object!
        addresses.add("456 Oak St");
        System.out.println("Person addresses: " + person.getAddresses());
        // Output: [123 Main St, 456 Oak St] - Unexpected!

        // Direct modification through getter
        person.getAddresses().remove(0);
        System.out.println("Person addresses: " + person.getAddresses());
        // Output: [456 Oak St] - Object state changed externally!
    }
}
\`\`\`

### **Immutable Solution**
\`\`\`java
public final class SafePerson {
    private final String name;
    private final List<String> addresses;

    public SafePerson(String name, List<String> addresses) {
        this.name = name;
        // Defensive copy
        this.addresses = addresses != null ? List.copyOf(addresses) : List.of();
    }

    public String getName() { return name; }

    public List<String> getAddresses() {
        return addresses; // Returns immutable view
    }

    // No setters!
}
\`\`\`

---

## 🎨 Builder Pattern for Immutable Objects

### **Immutable Builder Pattern**
\`\`\`java
public final class ComplexImmutableClass {
    private final String name;
    private final int age;
    private final String email;
    private final List<String> skills;
    private final Map<String, String> metadata;

    private ComplexImmutableClass(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
        this.skills = builder.skills != null ? List.copyOf(builder.skills) : List.of();
        this.metadata = builder.metadata != null ? Map.copyOf(builder.metadata) : Map.of();
    }

    // Getters only
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getEmail() { return email; }
    public List<String> getSkills() { return skills; }
    public Map<String, String> getMetadata() { return metadata; }

    public static class Builder {
        private String name;
        private int age;
        private String email;
        private List<String> skills;
        private Map<String, String> metadata;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder age(int age) {
            this.age = age;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder skills(List<String> skills) {
            this.skills = skills;
            return this;
        }

        public Builder addSkill(String skill) {
            if (this.skills == null) {
                this.skills = new ArrayList<>();
            }
            this.skills.add(skill);
            return this;
        }

        public Builder metadata(Map<String, String> metadata) {
            this.metadata = metadata;
            return this;
        }

        public Builder addMetadata(String key, String value) {
            if (this.metadata == null) {
                this.metadata = new HashMap<>();
            }
            this.metadata.put(key, value);
            return this;
        }

        public ComplexImmutableClass build() {
            // Validation
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Name is required");
            }
            if (email == null || !email.contains("@")) {
                throw new IllegalArgumentException("Valid email is required");
            }
            if (age < 0 || age > 150) {
                throw new IllegalArgumentException("Age must be between 0 and 150");
            }

            return new ComplexImmutableClass(this);
        }
    }

    // Factory method
    public static Builder builder() {
        return new Builder();
    }
}

// Usage
public class BuilderExample {
    public static void main(String[] args) {
        ComplexImmutableClass person = ComplexImmutableClass.builder()
            .name("John Doe")
            .age(30)
            .email("john@example.com")
            .addSkill("Java")
            .addSkill("Python")
            .addMetadata("department", "Engineering")
            .addMetadata("level", "Senior")
            .build();

        System.out.println("Name: " + person.getName());
        System.out.println("Skills: " + person.getSkills());
        System.out.println("Metadata: " + person.getMetadata());
    }
}
\`\`\`

---

## 🏆 Java's Built-in Immutable Classes

### **String Immutability**
\`\`\`java
public class StringImmutability {
    public static void main(String[] args) {
        String str1 = "Hello";
        String str2 = str1.concat(" World");

        System.out.println("str1: " + str1); // "Hello" (unchanged)
        System.out.println("str2: " + str2); // "Hello World" (new string)

        // String methods return new strings
        String upper = str1.toUpperCase();
        System.out.println("Original: " + str1); // "Hello" (unchanged)
        System.out.println("Upper: " + upper);   // "HELLO" (new string)
    }
}
\`\`\`

### **Wrapper Classes**
\`\`\`java
public class WrapperImmutability {
    public static void main(String[] args) {
        Integer num1 = 42;
        Integer num2 = num1 + 8; // Creates new Integer object

        System.out.println("num1: " + num1); // 42 (unchanged)
        System.out.println("num2: " + num2); // 50 (new object)

        // All wrapper classes are immutable
        Double d1 = 3.14;
        Double d2 = d1 * 2; // New Double object

        Boolean b1 = true;
        Boolean b2 = !b1; // New Boolean object
    }
}
\`\`\`

### **Collections API**
\`\`\`java
import java.util.*;

public class CollectionsImmutability {
    public static void main(String[] args) {
        // Creating immutable collections (Java 9+)
        List<String> immutableList = List.of("A", "B", "C");
        Set<String> immutableSet = Set.of("X", "Y", "Z");
        Map<String, Integer> immutableMap = Map.of("One", 1, "Two", 2);

        // These cannot be modified
        try {
            immutableList.add("D"); // Throws UnsupportedOperationException
        } catch (UnsupportedOperationException e) {
            System.out.println("Cannot modify immutable list");
        }

        // Copying existing collections to immutable
        List<String> mutableList = new ArrayList<>(Arrays.asList("A", "B", "C"));
        List<String> copiedImmutable = List.copyOf(mutableList);

        mutableList.add("D");
        System.out.println("Mutable: " + mutableList);      // [A, B, C, D]
        System.out.println("Immutable: " + copiedImmutable); // [A, B, C]
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **final variables** cannot be reassigned after initialization
2. **final methods** cannot be overridden in subclasses
3. **final classes** cannot be extended
4. **Immutable objects** have state that cannot be changed
5. **Defensive copying** protects mutable fields in immutable classes
6. **Builder pattern** simplifies construction of complex immutable objects
7. **Java's built-in classes** like String, Integer, and Collections are immutable
8. **Thread safety** comes naturally with immutability

**Next:** Learn about inner classes and nested classes! 🚀`
};

