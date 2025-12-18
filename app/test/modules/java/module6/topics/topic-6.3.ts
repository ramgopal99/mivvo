import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_3: SubLesson = {
  id: "6.3",
  title: 'Creating Objects',
  status: 'completed',
  content: `# 🆕 Creating Objects in Java

Object creation is the process of instantiating classes. Understanding how objects are created, initialized, and managed is crucial for effective Java programming. The \`new\` keyword and constructors play central roles in this process.

---

## 📋 Object Instantiation

### **Basic Object Creation**
\`\`\`java
public class BasicObjectCreation {
    public static void main(String[] args) {
        // Object creation syntax:
        // ClassName variableName = new ClassName(parameters);

        // Create objects using different constructors
        Person person1 = new Person();                    // Default constructor
        Person person2 = new Person("Alice", 25);         // Parameterized constructor
        Person person3 = new Person("Bob", 30, "Engineer"); // Full constructor

        // Use the objects
        person1.displayInfo();
        person2.displayInfo();
        person3.displayInfo();
    }
}

class Person {
    private String name;
    private int age;
    private String occupation;

    // Default constructor
    public Person() {
        this.name = "Unknown";
        this.age = 0;
        this.occupation = "Unemployed";
    }

    // Constructor with name and age
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        this.occupation = "Unknown";
    }

    // Constructor with all fields
    public Person(String name, int age, String occupation) {
        this.name = name;
        this.age = age;
        this.occupation = occupation;
    }

    public void displayInfo() {
        System.out.println("Name: " + name + ", Age: " + age + ", Occupation: " + occupation);
    }
}
\`\`\`

### **Object References**
\`\`\`java
public class ObjectReferences {
    public static void main(String[] args) {
        // Create an object
        Person person = new Person("Alice", 25);

        // Create a reference to the same object
        Person samePerson = person;

        // Both references point to the same object
        System.out.println("Same object? " + (person == samePerson)); // true

        // Modify through one reference
        samePerson.setName("Alice Smith");

        // Change is visible through both references
        System.out.println("Original reference: " + person.getName());
        System.out.println("Second reference: " + samePerson.getName());

        // Set one reference to null - object still exists
        samePerson = null;
        System.out.println("person still works: " + person.getName());
        // System.out.println(samePerson.getName()); // NullPointerException
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
}
\`\`\`

---

## 🏗️ Constructor Overloading and Chaining

### **Constructor Overloading**
\`\`\`java
public class ConstructorOverloading {
    private String brand;
    private String model;
    private int year;
    private double price;

    // Constructor with all parameters
    public ConstructorOverloading(String brand, String model, int year, double price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
    }

    // Constructor with brand and model only
    public ConstructorOverloading(String brand, String model) {
        this(brand, model, 2024, 0.0); // Call other constructor
    }

    // Constructor with brand only
    public ConstructorOverloading(String brand) {
        this(brand, "Unknown", 2024, 0.0);
    }

    // Default constructor
    public ConstructorOverloading() {
        this("Unknown", "Unknown", 2024, 0.0);
    }

    public void displayInfo() {
        System.out.println(year + " " + brand + " " + model + " - $" + price);
    }

    public static void main(String[] args) {
        ConstructorOverloading car1 = new ConstructorOverloading("Toyota", "Camry", 2020, 25000);
        ConstructorOverloading car2 = new ConstructorOverloading("Honda", "Civic");
        ConstructorOverloading car3 = new ConstructorOverloading("Ford");
        ConstructorOverloading car4 = new ConstructorOverloading();

        car1.displayInfo();
        car2.displayInfo();
        car3.displayInfo();
        car4.displayInfo();
    }
}
\`\`\`

### **Copy Constructors**
\`\`\`java
public class CopyConstructors {
    private String name;
    private int age;
    private Address address;

    // Regular constructor
    public CopyConstructors(String name, int age, Address address) {
        this.name = name;
        this.age = age;
        this.address = new Address(address); // Deep copy
    }

    // Copy constructor
    public CopyConstructors(CopyConstructors other) {
        this.name = other.name;
        this.age = other.age;
        this.address = new Address(other.address); // Deep copy
    }

    // Shallow copy (problematic)
    public CopyConstructors shallowCopy(CopyConstructors other) {
        CopyConstructors copy = new CopyConstructors(other.name, other.age, other.address);
        return copy;
    }

    public void setName(String name) { this.name = name; }
    public void setAddressCity(String city) { this.address.city = city; }

    public String toString() {
        return name + " (" + age + ") lives in " + address.city;
    }

    public static void main(String[] args) {
        Address addr = new Address("New York");
        CopyConstructors person1 = new CopyConstructors("Alice", 25, addr);

        // Deep copy using copy constructor
        CopyConstructors person2 = new CopyConstructors(person1);
        person2.setName("Bob");

        // Modify address through person1
        person1.setAddressCity("Los Angeles");

        System.out.println("Person1: " + person1); // Changed to LA
        System.out.println("Person2: " + person2); // Still New York
    }
}

class Address {
    String city;

    Address(String city) {
        this.city = city;
    }

    Address(Address other) {
        this.city = other.city; // Deep copy
    }
}
\`\`\`

---

## 🔄 Object Initialization Patterns

### **Instance Initializer Blocks**
\`\`\`java
public class InstanceInitializers {
    private int id;
    private String name;
    private static int nextId = 1;

    // Instance initializer block - runs before constructor
    {
        id = nextId++;
        System.out.println("Instance initializer: assigning id " + id);
    }

    // Another initializer block
    {
        name = "Default";
        System.out.println("Second initializer: setting default name");
    }

    public InstanceInitializers() {
        System.out.println("Constructor: id=" + id + ", name=" + name);
    }

    public InstanceInitializers(String customName) {
        name = customName;
        System.out.println("Constructor with name: id=" + id + ", name=" + name);
    }

    public static void main(String[] args) {
        System.out.println("Creating first object:");
        InstanceInitializers obj1 = new InstanceInitializers();

        System.out.println("\\nCreating second object:");
        InstanceInitializers obj2 = new InstanceInitializers("Custom Name");
    }
}
\`\`\`

### **Static Initialization Blocks**
\`\`\`java
public class StaticInitializers {
    private static java.util.Map<String, String> config;

    // Static initializer block - runs once when class is loaded
    static {
        config = new java.util.HashMap<>();
        config.put("database.url", "jdbc:mysql://localhost:3306/mydb");
        config.put("database.user", "admin");
        System.out.println("Static initializer: configuration loaded");
    }

    private String instanceData;

    public StaticInitializers(String data) {
        this.instanceData = data;
        System.out.println("Constructor: instance created with " + data);
    }

    public static String getConfig(String key) {
        return config.get(key);
    }

    public static void main(String[] args) {
        System.out.println("Class loading triggers static initializer");
        StaticInitializers obj1 = new StaticInitializers("data1");
        StaticInitializers obj2 = new StaticInitializers("data2");

        System.out.println("Database URL: " + StaticInitializers.getConfig("database.url"));
    }
}
\`\`\`

---

## 🏭 Object Creation Methods

### **Factory Methods**
\`\`\`java
public class FactoryMethods {
    private String type;
    private int value;

    private FactoryMethods(String type, int value) {
        this.type = type;
        this.value = value;
    }

    // Factory method for creating different types
    public static FactoryMethods createNumber(int value) {
        return new FactoryMethods("number", value);
    }

    public static FactoryMethods createText(String text) {
        return new FactoryMethods("text", text.length());
    }

    public static FactoryMethods createFromString(String input) {
        if (input.matches("\\d+")) {
            return createNumber(Integer.parseInt(input));
        } else {
            return createText(input);
        }
    }

    public String toString() {
        return type + ": " + value;
    }

    public static void main(String[] args) {
        FactoryMethods num = FactoryMethods.createNumber(42);
        FactoryMethods text = FactoryMethods.createText("Hello");
        FactoryMethods auto1 = FactoryMethods.createFromString("123");
        FactoryMethods auto2 = FactoryMethods.createFromString("Hello");

        System.out.println(num);
        System.out.println(text);
        System.out.println(auto1);
        System.out.println(auto2);
    }
}
\`\`\`

### **Builder Pattern for Complex Objects**
\`\`\`java
public class BuilderPattern {
    private final String name;
    private final int age;
    private final String email;
    private final String address;
    private final boolean active;

    private BuilderPattern(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.email = builder.email;
        this.address = builder.address;
        this.active = builder.active;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private int age;
        private String email;
        private String address;
        private boolean active = true;

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

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder active(boolean active) {
            this.active = active;
            return this;
        }

        public BuilderPattern build() {
            validate();
            return new BuilderPattern(this);
        }

        private void validate() {
            if (name == null) throw new IllegalStateException("Name required");
            if (email == null) throw new IllegalStateException("Email required");
        }
    }

    public String toString() {
        return name + " (" + age + ") - " + email + " [" + (active ? "active" : "inactive") + "]";
    }

    public static void main(String[] args) {
        BuilderPattern person = BuilderPattern.builder()
            .name("Alice")
            .age(25)
            .email("alice@example.com")
            .address("123 Main St")
            .active(true)
            .build();

        System.out.println(person);
    }
}
\`\`\`

---

## 🗂️ Object Lifecycle

### **Object Creation Process**
\`\`\`java
public class ObjectLifecycle {
    static {
        System.out.println("1. Class loading and static initialization");
    }

    {
        System.out.println("3. Instance initializer block");
    }

    public ObjectLifecycle() {
        System.out.println("4. Constructor execution");
    }

    public static void main(String[] args) {
        System.out.println("2. Main method starts");

        ObjectLifecycle obj = new ObjectLifecycle();

        System.out.println("5. Object ready for use");
    }
}
\`\`\`

### **Garbage Collection**
\`\`\`java
public class GarbageCollection {
    private String name;

    public GarbageCollection(String name) {
        this.name = name;
        System.out.println("Object created: " + name);
    }

    @Override
    protected void finalize() throws Throwable {
        System.out.println("Object being garbage collected: " + name);
    }

    public static void main(String[] args) {
        System.out.println("Creating objects...");
        GarbageCollection obj1 = new GarbageCollection("Object 1");
        GarbageCollection obj2 = new GarbageCollection("Object 2");

        // Make objects eligible for garbage collection
        obj1 = null;
        obj2 = null;

        // Suggest garbage collection (not guaranteed to run)
        System.gc();

        System.out.println("Main method ending...");
        // finalize() may be called here or later
    }
}
\`\`\`

---

## 🎯 Object Creation Best Practices

### **1. Prefer Constructor Injection**
\`\`\`java
public class ConstructorInjection {
    private final DatabaseConnection db;
    private final EmailService email;

    // Constructor injection - dependencies provided at creation
    public ConstructorInjection(DatabaseConnection db, EmailService email) {
        this.db = db;
        this.email = email;
    }

    public void processUser(String userId) {
        User user = db.findUser(userId);
        email.sendWelcomeEmail(user);
    }

    public static void main(String[] args) {
        DatabaseConnection db = new DatabaseConnection();
        EmailService email = new EmailService();

        ConstructorInjection service = new ConstructorInjection(db, email);
        service.processUser("user123");
    }
}

class DatabaseConnection {
    User findUser(String id) { return new User(id, "John"); }
}

class EmailService {
    void sendWelcomeEmail(User user) { System.out.println("Email sent to " + user.name); }
}

class User {
    String id, name;
    User(String id, String name) { this.id = id; this.name = name; }
}
\`\`\`

### **2. Use Factory Methods for Complex Creation**
\`\`\`java
public class FactoryMethodPattern {
    private String host;
    private int port;
    private String username;
    private String password;

    private FactoryMethodPattern(String host, int port, String username, String password) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
    }

    // Factory methods for different connection types
    public static FactoryMethodPattern createLocalConnection() {
        return new FactoryMethodPattern("localhost", 3306, "root", "");
    }

    public static FactoryMethodPattern createProductionConnection() {
        return new FactoryMethodPattern("prod-db.example.com", 3306, "app_user", "secret123");
    }

    public static FactoryMethodPattern createCustomConnection(String host, int port,
                                                            String username, String password) {
        validateConnection(host, port, username, password);
        return new FactoryMethodPattern(host, port, username, password);
    }

    private static void validateConnection(String host, int port, String username, String password) {
        if (host == null) throw new IllegalArgumentException("Host required");
        if (port <= 0 || port > 65535) throw new IllegalArgumentException("Invalid port");
        if (username == null) throw new IllegalArgumentException("Username required");
    }

    public String getConnectionString() {
        return "jdbc:mysql://" + host + ":" + port + "?user=" + username;
    }

    public static void main(String[] args) {
        FactoryMethodPattern local = FactoryMethodPattern.createLocalConnection();
        FactoryMethodPattern prod = FactoryMethodPattern.createProductionConnection();
        FactoryMethodPattern custom = FactoryMethodPattern.createCustomConnection(
            "test-db.example.com", 3306, "test_user", "test_pass");

        System.out.println("Local: " + local.getConnectionString());
        System.out.println("Prod: " + prod.getConnectionString());
        System.out.println("Custom: " + custom.getConnectionString());
    }
}
\`\`\`

### **3. Avoid Constructor Overloading Abuse**
\`\`\`java
public class ConstructorOverloadingLimits {
    private String name;
    private int age;
    private String email;
    private String address;
    private boolean active;
    private java.util.Date createdDate;

    // Too many constructors become confusing
    // public ConstructorOverloadingLimits(String name) { ... }
    // public ConstructorOverloadingLimits(String name, int age) { ... }
    // public ConstructorOverloadingLimits(String name, int age, String email) { ... }
    // And so on...

    // Better: Use builder pattern or factory methods
    private ConstructorOverloadingLimits(String name, int age, String email,
                                       String address, boolean active, java.util.Date createdDate) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.address = address;
        this.active = active;
        this.createdDate = createdDate;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String name;
        private int age;
        private String email;
        private String address;
        private boolean active = true;
        private java.util.Date createdDate = new java.util.Date();

        public Builder name(String name) { this.name = name; return this; }
        public Builder age(int age) { this.age = age; return this; }
        public Builder email(String email) { this.email = email; return this; }
        public Builder address(String address) { this.address = address; return this; }
        public Builder active(boolean active) { this.active = active; return this; }

        public ConstructorOverloadingLimits build() {
            return new ConstructorOverloadingLimits(name, age, email, address, active, createdDate);
        }
    }

    public String toString() {
        return name + " (" + age + ") - " + email;
    }

    public static void main(String[] args) {
        ConstructorOverloadingLimits person = ConstructorOverloadingLimits.builder()
            .name("Alice")
            .age(25)
            .email("alice@example.com")
            .address("123 Main St")
            .build();

        System.out.println(person);
    }
}
\`\`\`

Object creation is a fundamental aspect of Java programming. Understanding constructors, initialization patterns, and object lifecycle enables you to create robust and maintainable applications! 🆕`
};

