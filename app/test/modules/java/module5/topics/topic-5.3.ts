import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_3: SubLesson = {
  id: "5.3",
  title: 'Method Parameters',
  status: 'completed',
  content: `# 📥 Method Parameters in Java

Method parameters allow you to pass data into methods, making them more flexible and reusable. Java provides several ways to define parameters, each with different characteristics and use cases.

---

## 📋 Parameter Declaration

### **Basic Parameter Types**
\`\`\`java
public class BasicParameters {
    // Primitive type parameters
    public void processNumber(int number) {
        System.out.println("Processing number: " + number);
    }

    // Reference type parameters
    public void processString(String text) {
        System.out.println("Processing text: " + text);
    }

    // Object parameters
    public void processUser(User user) {
        System.out.println("Processing user: " + user.getName());
    }

    // Array parameters
    public void processArray(int[] numbers) {
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        BasicParameters obj = new BasicParameters();

        obj.processNumber(42);
        obj.processString("Hello World");
        obj.processUser(new User("Alice"));
        obj.processArray(new int[]{1, 2, 3, 4, 5});
    }

    static class User {
        private String name;

        public User(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
}
\`\`\`

### **Multiple Parameters**
\`\`\`java
public class MultipleParameters {
    // Multiple parameters of same type
    public void calculateRectangle(int length, int width) {
        int area = length * width;
        int perimeter = 2 * (length + width);
        System.out.println("Area: " + area + ", Perimeter: " + perimeter);
    }

    // Multiple parameters of different types
    public void createUser(String name, int age, String email, boolean isActive) {
        System.out.println("Creating user:");
        System.out.println("  Name: " + name);
        System.out.println("  Age: " + age);
        System.out.println("  Email: " + email);
        System.out.println("  Active: " + isActive);
    }

    // Parameters with calculations
    public void processPayment(double amount, double taxRate, String currency) {
        double tax = amount * taxRate;
        double total = amount + tax;
        System.out.println("Payment: " + currency + total + " (tax: " + currency + tax + ")");
    }

    public static void main(String[] args) {
        MultipleParameters obj = new MultipleParameters();

        obj.calculateRectangle(10, 5);
        obj.createUser("Bob", 30, "bob@example.com", true);
        obj.processPayment(100.0, 0.08, "$");
    }
}
\`\`\`

---

## 🔄 Parameter Passing Mechanisms

### **Pass by Value (Primitives)**
\`\`\`java
public class PassByValue {
    public static void main(String[] args) {
        PassByValue obj = new PassByValue();

        int number = 10;
        System.out.println("Before method call: " + number);

        obj.modifyPrimitive(number);

        System.out.println("After method call: " + number);
        // Value remains unchanged - passed by value
    }

    public void modifyPrimitive(int num) {
        num = 20;  // This only changes the local copy
        System.out.println("Inside method: " + num);
    }
}
\`\`\`

### **Pass by Reference (Objects)**
\`\`\`java
public class PassByReference {
    public static void main(String[] args) {
        PassByReference obj = new PassByReference();

        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Before method call: " + sb);

        obj.modifyObject(sb);

        System.out.println("After method call: " + sb);
        // Object is modified - reference is passed by value, but points to same object
    }

    public void modifyObject(StringBuilder builder) {
        builder.append(" World");  // This modifies the original object
        System.out.println("Inside method: " + builder);
    }
}
\`\`\`

### **Array Parameters**
\`\`\`java
public class ArrayParameters {
    public static void main(String[] args) {
        ArrayParameters obj = new ArrayParameters();

        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Before method call: " + java.util.Arrays.toString(numbers));

        obj.modifyArray(numbers);

        System.out.println("After method call: " + java.util.Arrays.toString(numbers));
        // Array elements are modified - arrays are objects
    }

    public void modifyArray(int[] arr) {
        arr[0] = 999;  // This modifies the original array
        System.out.println("Inside method: " + java.util.Arrays.toString(arr));
    }
}
\`\`\`

---

## 📊 Variable Arguments (Varargs)

### **Using Varargs**
\`\`\`java
public class VarargsDemo {
    // Varargs parameter (must be last parameter)
    public void printNumbers(String message, int... numbers) {
        System.out.println(message);
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
    }

    // Varargs with different types (not directly possible)
    public void printMixed(String message, Object... items) {
        System.out.println(message);
        for (Object item : items) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        VarargsDemo obj = new VarargsDemo();

        // Different ways to call varargs method
        obj.printNumbers("No numbers:");
        obj.printNumbers("One number:", 42);
        obj.printNumbers("Multiple numbers:", 1, 2, 3, 4, 5);

        // Mixed types
        obj.printMixed("Mixed items:", "Hello", 123, true, 3.14);
    }
}
\`\`\`

### **Varargs vs Arrays**
\`\`\`java
public class VarargsVsArrays {
    // Method with varargs
    public void processVarargs(String... items) {
        System.out.println("Varargs - Items: " + items.length);
        for (String item : items) {
            System.out.println("  " + item);
        }
    }

    // Method with array
    public void processArray(String[] items) {
        System.out.println("Array - Items: " + items.length);
        for (String item : items) {
            System.out.println("  " + item);
        }
    }

    public static void main(String[] args) {
        VarargsVsArrays obj = new VarargsVsArrays();

        // Calling varargs method
        obj.processVarargs("Apple", "Banana", "Orange");

        // Calling array method
        String[] fruits = {"Apple", "Banana", "Orange"};
        obj.processArray(fruits);

        // Varargs can also accept arrays
        obj.processVarargs(fruits);
    }
}
\`\`\`

---

## 🏷️ Parameter Naming and Documentation

### **Parameter Naming Conventions**
\`\`\`java
public class ParameterNaming {
    // ✅ Good parameter names - descriptive and follow camelCase
    public void createUser(String userName, String emailAddress, int userAge) {
        // Implementation
    }

    // ❌ Bad parameter names - unclear or non-standard
    // public void createUser(String u, String e, int a) { }  // Too short
    // public void createUser(String UserName, String Email, int Age) { }  // Wrong case

    // ✅ Consistent naming across related methods
    public void setUserName(String userName) { }
    public void setEmailAddress(String emailAddress) { }
    public void setUserAge(int userAge) { }

    // ✅ Boolean parameters should indicate their purpose
    public void setUserActive(boolean isActive) { }
    public void enableFeature(boolean shouldEnable) { }
    public void processData(boolean ignoreErrors) { }

    public static void main(String[] args) {
        ParameterNaming obj = new ParameterNaming();
        obj.createUser("alice_smith", "alice@example.com", 25);
        obj.setUserActive(true);
        obj.enableFeature(false);
    }
}
\`\`\`

### **Parameter Validation**
\`\`\`java
public class ParameterValidation {
    public void setAge(int age) {
        if (age < 0 || age > 150) {
            throw new IllegalArgumentException("Age must be between 0 and 150");
        }
        // Set age...
        System.out.println("Age set to: " + age);
    }

    public void setName(String name) {
        if (name == null) {
            throw new IllegalArgumentException("Name cannot be null");
        }
        if (name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        // Set name...
        System.out.println("Name set to: " + name);
    }

    public void setEmail(String email, boolean allowNull) {
        if (!allowNull && email == null) {
            throw new IllegalArgumentException("Email cannot be null");
        }
        if (email != null && !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
        // Set email...
        System.out.println("Email set to: " + email);
    }

    public static void main(String[] args) {
        ParameterValidation obj = new ParameterValidation();

        try {
            obj.setAge(25);
            obj.setName("Alice");
            obj.setEmail("alice@example.com", false);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🔄 Advanced Parameter Patterns

### **Method Overloading with Parameters**
\`\`\`java
public class MethodOverloading {
    // Different number of parameters
    public void display(String message) {
        System.out.println("Message: " + message);
    }

    public void display(String message, int count) {
        for (int i = 0; i < count; i++) {
            System.out.println("Message " + (i + 1) + ": " + message);
        }
    }

    // Different parameter types
    public void display(int number) {
        System.out.println("Number: " + number);
    }

    public void display(double number) {
        System.out.println("Decimal: " + number);
    }

    // Varargs version
    public void display(String... messages) {
        for (String msg : messages) {
            System.out.println("Varargs message: " + msg);
        }
    }

    public static void main(String[] args) {
        MethodOverloading obj = new MethodOverloading();

        obj.display("Hello");              // String version
        obj.display("Hello", 3);           // String + int version
        obj.display(42);                   // int version
        obj.display(3.14);                 // double version
        obj.display("A", "B", "C");        // varargs version
    }
}
\`\`\`

### **Parameter Objects**
\`\`\`java
public class ParameterObjects {
    // ❌ Bad: Too many parameters
    // public void createUser(String firstName, String lastName, String email,
    //                        String phone, String address, Date birthDate,
    //                        boolean isActive, String role) { }

    // ✅ Better: Use parameter object
    public void createUser(UserDetails details) {
        validateUserDetails(details);
        saveUser(details);
        sendWelcomeEmail(details);
    }

    private void validateUserDetails(UserDetails details) {
        if (details.getFirstName() == null) {
            throw new IllegalArgumentException("First name required");
        }
        // More validation...
    }

    private void saveUser(UserDetails details) {
        System.out.println("Saving user: " + details.getFirstName() + " " + details.getLastName());
    }

    private void sendWelcomeEmail(UserDetails details) {
        System.out.println("Sending welcome email to: " + details.getEmail());
    }

    static class UserDetails {
        private String firstName;
        private String lastName;
        private String email;
        private String phone;
        private String address;
        private java.util.Date birthDate;
        private boolean isActive;
        private String role;

        // Constructor, getters, setters...
        public UserDetails(String firstName, String lastName, String email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }

        public String getFirstName() { return firstName; }
        public String getLastName() { return lastName; }
        public String getEmail() { return email; }
    }

    public static void main(String[] args) {
        ParameterObjects obj = new ParameterObjects();
        UserDetails user = new UserDetails("John", "Doe", "john@example.com");
        obj.createUser(user);
    }
}
\`\`\`

---

## 🎯 Parameter Best Practices

### **1. Limit Parameter Count**
\`\`\`java
public class ParameterLimits {
    // ✅ Good: Few parameters
    public void sendEmail(String to, String subject, String body) { }

    // ❌ Bad: Too many parameters (more than 7 is usually too many)
    // public void complexCalculation(int a, int b, int c, int d, int e, int f, int g, int h, int i) { }

    // ✅ Solution: Use parameter object or builder pattern
    public void complexCalculation(CalculationParams params) { }

    static class CalculationParams {
        int a, b, c, d, e, f, g, h, i;
        // Constructor and getters...
    }
}
\`\`\`

### **2. Parameter Order Consistency**
\`\`\`java
public class ParameterOrder {
    // ✅ Good: Consistent parameter order across related methods
    public void drawRectangle(int x, int y, int width, int height) { }
    public void fillRectangle(int x, int y, int width, int height) { }
    public void moveRectangle(int x, int y, int width, int height, int newX, int newY) { }

    // ❌ Bad: Inconsistent order
    // public void drawRectangle(int x, int y, int width, int height) { }
    // public void fillRectangle(int width, int height, int x, int y) { }  // Wrong order!
}
\`\`\`

### **3. Immutable Parameters**
\`\`\`java
public class ImmutableParameters {
    // ✅ Good: Use immutable wrappers for mutable objects
    public void processData(java.util.List<String> data) {
        // Don't modify the input list
        java.util.List<String> copy = new java.util.ArrayList<>(data);
        // Work with copy instead
        copy.add("processed");
        System.out.println("Processed data: " + copy);
    }

    // ✅ Better: Document parameter ownership
    /**
     * Processes the data list. The input list is not modified.
     * @param data the input data (not modified)
     * @return processed result
     */
    public java.util.List<String> processDataSafely(java.util.List<String> data) {
        java.util.List<String> result = new java.util.ArrayList<>(data);
        result.add("processed");
        return result;
    }

    public static void main(String[] args) {
        ImmutableParameters obj = new ImmutableParameters();
        java.util.List<String> input = java.util.Arrays.asList("item1", "item2");

        obj.processData(input);
        System.out.println("Original list unchanged: " + input);

        java.util.List<String> result = obj.processDataSafely(input);
        System.out.println("Result: " + result);
    }
}
\`\`\`

### **4. Null Handling**
\`\`\`java
public class NullHandling {
    // ✅ Good: Explicit null checking
    public String formatName(String firstName, String lastName) {
        if (firstName == null) firstName = "";
        if (lastName == null) lastName = "";
        return (firstName + " " + lastName).trim();
    }

    // ✅ Better: Use Objects.requireNonNull for required parameters
    public void saveUser(String name, String email) {
        java.util.Objects.requireNonNull(name, "Name cannot be null");
        java.util.Objects.requireNonNull(email, "Email cannot be null");

        System.out.println("Saving user: " + name + " <" + email + ">");
    }

    // ✅ Use Optional for truly optional parameters
    public void updateUser(String name, java.util.Optional<String> email) {
        System.out.println("Updating user: " + name);
        email.ifPresent(e -> System.out.println("New email: " + e));
    }

    public static void main(String[] args) {
        NullHandling obj = new NullHandling();

        System.out.println("Formatted name: " + obj.formatName("John", null));

        try {
            obj.saveUser("Alice", "alice@example.com");
            // obj.saveUser(null, "test@example.com");  // Would throw exception
        } catch (NullPointerException e) {
            System.out.println("Null check worked: " + e.getMessage());
        }

        obj.updateUser("Bob", java.util.Optional.of("bob@example.com"));
        obj.updateUser("Charlie", java.util.Optional.empty());
    }
}
\`\`\`

---

## 🎯 Parameter Design Guidelines

### **Parameter Object Pattern**
\`\`\`java
public class ParameterObjectPattern {
    // Instead of many parameters
    public void complexOperation(String param1, int param2, double param3,
                                boolean param4, java.util.Date param5) {
        // Implementation
    }

    // Use parameter object
    public void complexOperation(OperationParams params) {
        validateParams(params);
        executeOperation(params);
    }

    private void validateParams(OperationParams params) {
        // Validation logic
    }

    private void executeOperation(OperationParams params) {
        // Operation logic
    }

    static class OperationParams {
        private String param1;
        private int param2;
        private double param3;
        private boolean param4;
        private java.util.Date param5;

        // Builder pattern for complex construction
        public static Builder builder() {
            return new Builder();
        }

        static class Builder {
            private OperationParams params = new OperationParams();

            public Builder param1(String value) {
                params.param1 = value;
                return this;
            }

            public Builder param2(int value) {
                params.param2 = value;
                return this;
            }

            public Builder param3(double value) {
                params.param3 = value;
                return this;
            }

            public Builder param4(boolean value) {
                params.param4 = value;
                return this;
            }

            public Builder param5(java.util.Date value) {
                params.param5 = value;
                return this;
            }

            public OperationParams build() {
                return params;
            }
        }
    }

    public static void main(String[] args) {
        ParameterObjectPattern obj = new ParameterObjectPattern();

        // Using parameter object with builder
        OperationParams params = OperationParams.builder()
            .param1("value1")
            .param2(42)
            .param3(3.14)
            .param4(true)
            .param5(new java.util.Date())
            .build();

        obj.complexOperation(params);
    }
}
\`\`\`

Method parameters are essential for creating flexible and reusable methods. Understanding parameter passing mechanisms, using appropriate validation, and following naming conventions leads to robust and maintainable code! 📥`
};



