import { SubLesson } from '../../../data/lessonsData';

export const topic_8_7: SubLesson = {
  id: 8.7,
  title: 'Inner Classes and Nested Classes',
  status: 'completed',
  content: `# 🏗️ Inner Classes and Nested Classes in Java

Master nested classes and their relationships with outer classes!

---

## 🎯 Types of Nested Classes

### **1. Static Nested Classes**
\`\`\`java
public class OuterClass {
    private static String staticField = "Static field";
    private String instanceField = "Instance field";

    // Static nested class
    public static class StaticNestedClass {
        // Can access static members of outer class
        public void accessOuterStatic() {
            System.out.println("Accessing: " + staticField);
            // Cannot access instanceField - no outer instance
        }

        // Can have static members
        public static void staticMethod() {
            System.out.println("Static method in nested class");
        }

        public void instanceMethod() {
            System.out.println("Instance method in nested class");
        }
    }

    // Can access nested class without outer instance
    public void useNestedClass() {
        StaticNestedClass nested = new StaticNestedClass();
        nested.instanceMethod();
        StaticNestedClass.staticMethod();
    }
}

// Usage
public class StaticNestedExample {
    public static void main(String[] args) {
        // Access without outer instance
        OuterClass.StaticNestedClass nested = new OuterClass.StaticNestedClass();
        nested.instanceMethod();
        OuterClass.StaticNestedClass.staticMethod();

        // Through outer class instance (also works)
        OuterClass outer = new OuterClass();
        outer.useNestedClass();
    }
}
\`\`\`

### **2. Inner Classes (Non-static)**
\`\`\`java
public class OuterClass {
    private String outerField = "Outer field";
    private static String staticOuterField = "Static outer field";

    // Inner class (non-static nested class)
    public class InnerClass {
        private String innerField = "Inner field";

        public void accessOuterMembers() {
            // Can access both static and instance members of outer class
            System.out.println("Outer field: " + outerField);
            System.out.println("Static outer field: " + staticOuterField);
            System.out.println("Inner field: " + innerField);
        }

        public void demonstrateThis() {
            System.out.println("Inner this: " + this);
            System.out.println("Outer this: " + OuterClass.this);
            System.out.println("Inner field via this: " + this.innerField);
            System.out.println("Outer field via OuterClass.this: " + OuterClass.this.outerField);
        }
    }

    public void createInnerInstance() {
        InnerClass inner = new InnerClass();
        inner.accessOuterMembers();
    }
}

// Usage
public class InnerClassExample {
    public static void main(String[] args) {
        OuterClass outer = new OuterClass();

        // Create inner class instance through outer instance
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.accessOuterMembers();
        inner.demonstrateThis();

        // Alternative syntax
        outer.createInnerInstance();
    }
}
\`\`\`

### **3. Local Classes (Inside Methods)**
\`\`\`java
public class LocalClassExample {
    private String outerField = "Outer field";

    public void demonstrateLocalClass() {
        final String localVariable = "Local variable";
        String effectivelyFinal = "Effectively final";

        // Local class defined inside method
        class LocalClass {
            private String localClassField = "Local class field";

            public void accessMembers() {
                // Can access outer class members
                System.out.println("Outer field: " + outerField);

                // Can access final/effectively final local variables
                System.out.println("Local variable: " + localVariable);
                System.out.println("Effectively final: " + effectivelyFinal);

                // Cannot access non-final local variables
                // String nonFinal = "test"; // Would cause compilation error if accessed
            }

            public void showScope() {
                System.out.println("Local class field: " + localClassField);
            }
        }

        // Create and use local class
        LocalClass local = new LocalClass();
        local.accessMembers();
        local.showScope();
    }

    public static void main(String[] args) {
        LocalClassExample example = new LocalClassExample();
        example.demonstrateLocalClass();
    }
}
\`\`\`

### **4. Anonymous Classes**
\`\`\`java
import java.util.*;

public class AnonymousClassExample {
    // Interface for callback
    interface ClickListener {
        void onClick(String buttonName);
    }

    private List<String> buttons = new ArrayList<>();

    public void addButton(String name, ClickListener listener) {
        buttons.add(name);
        // Store listener for later use
        System.out.println("Added button: " + name);
    }

    public void simulateClick(int index) {
        if (index >= 0 && index < buttons.size()) {
            String buttonName = buttons.get(index);

            // Find the corresponding listener (simplified)
            // In real implementation, you'd store listener references
            ClickListener listener = createListenerForButton(buttonName);
            listener.onClick(buttonName);
        }
    }

    // Method to create anonymous class
    private ClickListener createListenerForButton(String buttonName) {
        // Anonymous class implementing ClickListener
        return new ClickListener() {
            @Override
            public void onClick(String buttonName) {
                System.out.println("Button '" + buttonName + "' was clicked!");
                System.out.println("Processing click for: " + buttonName);

                // Can access outer class members
                System.out.println("Total buttons: " + buttons.size());
            }
        };
    }

    public static void main(String[] args) {
        AnonymousClassExample example = new AnonymousClassExample();

        // Add buttons with anonymous click listeners
        example.addButton("Save", new ClickListener() {
            @Override
            public void onClick(String buttonName) {
                System.out.println("Saving document...");
                // Specific save logic here
            }
        });

        example.addButton("Load", new ClickListener() {
            @Override
            public void onClick(String buttonName) {
                System.out.println("Loading document...");
                // Specific load logic here
            }
        });

        example.addButton("Exit", new ClickListener() {
            @Override
            public void onClick(String buttonName) {
                System.out.println("Exiting application...");
                System.exit(0);
            }
        });

        // Simulate button clicks
        example.simulateClick(0); // Save
        example.simulateClick(1); // Load
        // example.simulateClick(2); // Exit (would close application)
    }
}
\`\`\`

---

## 🎯 Use Cases and Best Practices

### **1. Event Handling with Inner Classes**
\`\`\`java
import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class EventHandlingExample extends JFrame {
    private JButton button;
    private JTextArea textArea;

    public EventHandlingExample() {
        setTitle("Event Handling Example");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        button = new JButton("Click Me!");
        textArea = new JTextArea();
        textArea.setEditable(false);

        // Inner class for event handling
        class ButtonClickHandler implements ActionListener {
            private int clickCount = 0;

            @Override
            public void actionPerformed(ActionEvent e) {
                clickCount++;
                textArea.append("Button clicked " + clickCount + " times\\n");

                // Can access outer class members
                button.setText("Clicked " + clickCount + " times!");
            }
        }

        button.addActionListener(new ButtonClickHandler());

        add(button, BorderLayout.NORTH);
        add(new JScrollPane(textArea), BorderLayout.CENTER);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new EventHandlingExample().setVisible(true);
        });
    }
}
\`\`\`

### **2. Builder Pattern with Static Nested Class**
\`\`\`java
public class Pizza {
    private final String size;
    private final boolean cheese;
    private final boolean pepperoni;
    private final List<String> toppings;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.toppings = builder.toppings != null ?
                       List.copyOf(builder.toppings) : List.of();
    }

    // Static nested Builder class
    public static class Builder {
        private String size = "Medium";
        private boolean cheese = true;
        private boolean pepperoni = false;
        private List<String> toppings = new ArrayList<>();

        public Builder size(String size) {
            this.size = size;
            return this;
        }

        public Builder cheese(boolean cheese) {
            this.cheese = cheese;
            return this;
        }

        public Builder pepperoni(boolean pepperoni) {
            this.pepperoni = pepperoni;
            return this;
        }

        public Builder addTopping(String topping) {
            if (this.toppings == null) {
                this.toppings = new ArrayList<>();
            }
            this.toppings.add(topping);
            return this;
        }

        public Pizza build() {
            return new Pizza(this);
        }
    }

    // Static factory method
    public static Builder builder() {
        return new Builder();
    }

    @Override
    public String toString() {
        return String.format("Pizza{size='%s', cheese=%s, pepperoni=%s, toppings=%s}",
                           size, cheese, pepperoni, toppings);
    }

    public static void main(String[] args) {
        Pizza pizza = Pizza.builder()
                          .size("Large")
                          .cheese(true)
                          .pepperoni(true)
                          .addTopping("Mushrooms")
                          .addTopping("Onions")
                          .build();

        System.out.println(pizza);
    }
}
\`\`\`

### **3. Iterator Pattern with Inner Class**
\`\`\`java
public class CustomList<E> {
    private Object[] elements;
    private int size;

    public CustomList() {
        elements = new Object[10];
        size = 0;
    }

    public void add(E element) {
        if (size == elements.length) {
            // Resize array (simplified)
            Object[] newElements = new Object[elements.length * 2];
            System.arraycopy(elements, 0, newElements, 0, size);
            elements = newElements;
        }
        elements[size++] = element;
    }

    public E get(int index) {
        if (index < 0 || index >= size) {
            throw new IndexOutOfBoundsException();
        }
        return (E) elements[index];
    }

    public int size() {
        return size;
    }

    // Inner class implementing Iterator
    private class ListIterator implements Iterator<E> {
        private int currentIndex = 0;

        @Override
        public boolean hasNext() {
            return currentIndex < size;
        }

        @Override
        public E next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            return get(currentIndex++);
        }

        @Override
        public void remove() {
            throw new UnsupportedOperationException();
        }
    }

    // Method to get iterator
    public Iterator<E> iterator() {
        return new ListIterator();
    }

    public static void main(String[] args) {
        CustomList<String> list = new CustomList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");

        // Use iterator (enhanced for loop uses iterator internally)
        for (String fruit : list) {
            System.out.println(fruit);
        }

        // Manual iterator usage
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println("Manual: " + fruit);
        }
    }
}
\`\`\`

---

## ⚠️ Important Considerations

### **1. Memory and Performance**
\`\`\`java
public class MemoryConsiderations {
    // Inner class holds reference to outer instance
    public class HeavyInnerClass {
        // This prevents outer instance from being garbage collected
        // if inner class instance is still referenced
    }

    // Static nested class doesn't hold reference
    public static class LightStaticNested {
        // No reference to outer instance
    }

    private HeavyInnerClass innerRef;

    public void createMemoryLeak() {
        this.innerRef = new HeavyInnerClass();
        // Even if this method returns, innerRef keeps outer instance alive
    }
}
\`\`\`

### **2. Serialization Issues**
\`\`\`java
import java.io.*;

public class SerializationExample implements Serializable {
    private String outerField = "Outer";

    public class InnerClass implements Serializable {
        private String innerField = "Inner";

        // During deserialization, outer instance might not exist
        // This can cause issues
    }

    public static void main(String[] args) {
        // Serialization of inner classes can be problematic
        // Often better to make nested classes static
    }
}
\`\`\`

### **3. Access Modifiers for Nested Classes**
\`\`\`java
public class AccessModifiers {
    // Public nested class - accessible from anywhere
    public class PublicNested {}

    // Private nested class - accessible only within outer class
    private class PrivateNested {}

    // Protected nested class - accessible within package and subclasses
    protected class ProtectedNested {}

    // Package-private nested class - accessible within package
    class PackageNested {}

    public void demonstrateAccess() {
        PublicNested publicNested = new PublicNested();
        PrivateNested privateNested = new PrivateNested();
        ProtectedNested protectedNested = new ProtectedNested();
        PackageNested packageNested = new PackageNested();
    }
}

class OtherClass {
    public void accessNested() {
        AccessModifiers outer = new AccessModifiers();
        AccessModifiers.PublicNested publicNested = outer.new PublicNested();
        // Cannot access private, protected, or package-private nested classes
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Static nested classes** don't hold reference to outer instance
2. **Inner classes** have access to outer instance members via \`OuterClass.this\`
3. **Local classes** are defined inside methods and can access final/effectively final locals
4. **Anonymous classes** are used for one-time implementations (callbacks, event handlers)
5. **Memory considerations** - inner classes can prevent garbage collection
6. **Serialization** - static nested classes are safer for serialization
7. **Access modifiers** apply to nested classes like regular members

**Congratulations!** 🎉 You've mastered Classes and Objects in Java!

### **What You've Learned:**
- Object creation and memory management
- Constructors and initialization
- Methods and encapsulation
- Static members and class variables
- Final keyword and immutability
- Inner classes and nested classes

**Ready to move on to Inheritance and Polymorphism?** 🚀`
};
