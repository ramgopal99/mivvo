import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_5: SubLesson = {
  id: 6.5,
  title: 'Access Modifiers',
  status: 'completed',
  content: `# 🔐 Access Modifiers in Java

Access modifiers control the visibility and accessibility of classes, fields, methods, and constructors. They are fundamental to encapsulation and play a crucial role in designing secure and maintainable Java applications.

---

## 📋 The Four Access Modifiers

### **Public Access**
\`\`\`java
// Accessible from anywhere
public class PublicClass {
    public String publicField = "Anyone can access";

    public void publicMethod() {
        System.out.println("Anyone can call this method");
    }

    public PublicClass() {
        System.out.println("Public constructor");
    }
}

// Usage from any class
public class AnyClass {
    public void accessPublic() {
        PublicClass obj = new PublicClass();
        obj.publicField = "Modified";     // ✅ Accessible
        obj.publicMethod();               // ✅ Callable
    }
}
\`\`\`

### **Private Access**
\`\`\`java
public class PrivateExample {
    private String secretData = "Hidden data";
    private int secretNumber = 42;

    private void secretMethod() {
        System.out.println("This is a private method");
    }

    // Public methods to provide controlled access
    public String getSecretData() {
        return secretData;
    }

    public void setSecretData(String data) {
        if (data != null && !data.isEmpty()) {
            this.secretData = data;
            secretMethod();  // Private method accessible within class
        }
    }

    public static void main(String[] args) {
        PrivateExample obj = new PrivateExample();

        // Cannot access private members directly
        // obj.secretData = "test";     // ❌ Compilation error
        // obj.secretMethod();          // ❌ Compilation error

        // Must use public methods
        System.out.println(obj.getSecretData());
        obj.setSecretData("New secret data");
        System.out.println(obj.getSecretData());
    }
}
\`\`\`

### **Protected Access**
\`\`\`java
public class ProtectedExample {
    protected String protectedField = "Protected data";

    protected void protectedMethod() {
        System.out.println("Protected method");
    }

    protected ProtectedExample() {
        System.out.println("Protected constructor");
    }
}

// Subclass in same package
class SamePackageSubclass extends ProtectedExample {
    public void accessProtected() {
        System.out.println(protectedField);  // ✅ Accessible
        protectedMethod();                  // ✅ Callable
    }
}

// Class in same package
class SamePackageClass {
    public void accessProtected() {
        ProtectedExample obj = new ProtectedExample();
        System.out.println(obj.protectedField);  // ✅ Accessible (same package)
        obj.protectedMethod();                   // ✅ Callable (same package)
    }
}

// Different package subclass
package different;
class DifferentPackageSubclass extends ProtectedExample {
    public void accessProtected() {
        System.out.println(protectedField);  // ✅ Accessible (subclass)
        protectedMethod();                  // ✅ Callable (subclass)
    }
}

// Different package non-subclass
package different;
class DifferentPackageClass {
    public void tryAccessProtected() {
        ProtectedExample obj = new ProtectedExample();
        // obj.protectedField = "test";  // ❌ Compilation error
        // obj.protectedMethod();        // ❌ Compilation error
    }
}
\`\`\`

### **Default (Package-Private) Access**
\`\`\`java
// No modifier specified - package-private
class PackagePrivateClass {
    String defaultField = "Package-private data";

    void defaultMethod() {
        System.out.println("Package-private method");
    }

    PackagePrivateClass() {
        System.out.println("Package-private constructor");
    }
}

// Same package - full access
class SamePackageAccess {
    public void accessDefault() {
        PackagePrivateClass obj = new PackagePrivateClass();
        obj.defaultField = "Modified";      // ✅ Accessible
        obj.defaultMethod();                // ✅ Callable
    }
}

// Different package - no access
package other;
class DifferentPackageAccess {
    public void tryAccessDefault() {
        // PackagePrivateClass obj = new PackagePrivateClass();  // ❌ Compilation error
        // Cannot even see the class from different package
    }
}
\`\`\`

---

## 🎯 Access Modifier Usage Guidelines

### **Class-Level Access**
\`\`\`java
// Public class - accessible everywhere
public class PublicAPI {
    // Implementation
}

// Package-private class - only within package
class PackageUtility {
    // Helper classes, not part of public API
}

// Private nested classes
public class OuterClass {
    private static class PrivateHelper {
        // Implementation details
    }

    public void useHelper() {
        PrivateHelper helper = new PrivateHelper();
        // Use helper for internal logic
    }
}
\`\`\`

### **Field Access Patterns**
\`\`\`java
public class FieldAccessPatterns {
    // Public constants - acceptable
    public static final String COMPANY_NAME = "ABC Corp";
    public static final int MAX_CONNECTIONS = 100;

    // Private fields - encapsulation
    private String internalData;
    private int sensitiveValue;

    // Protected fields - for inheritance
    protected String customizableSetting;

    // Package-private fields - for package cooperation
    String packageSharedData;

    // Constructor with validation
    public FieldAccessPatterns(String data, int value) {
        setInternalData(data);  // Use setter for validation
        setSensitiveValue(value);
    }

    // Public getters
    public String getInternalData() { return internalData; }
    public int getSensitiveValue() { return sensitiveValue; }
    public String getCustomizableSetting() { return customizableSetting; }

    // Public setters with validation
    public void setInternalData(String data) {
        if (data != null && !data.trim().isEmpty()) {
            this.internalData = data;
        } else {
            throw new IllegalArgumentException("Data cannot be null or empty");
        }
    }

    public void setSensitiveValue(int value) {
        if (value >= 0) {
            this.sensitiveValue = value;
        } else {
            throw new IllegalArgumentException("Value must be non-negative");
        }
    }
}
\`\`\`

### **Method Access Patterns**
\`\`\`java
public class MethodAccessPatterns {
    // Public API methods
    public void publicApiMethod() {
        validateInput();
        processData();
        logOperation();
    }

    // Private implementation methods
    private void validateInput() {
        // Validation logic
    }

    private void processData() {
        // Processing logic
    }

    private void logOperation() {
        // Logging logic
    }

    // Protected methods for customization
    protected void customizeBehavior() {
        // Default implementation that subclasses can override
    }

    // Package-private utility methods
    void packageUtility() {
        // Utility accessible within package
    }
}

// Subclass can override protected methods
class CustomSubclass extends MethodAccessPatterns {
    @Override
    protected void customizeBehavior() {
        // Custom implementation
        System.out.println("Custom behavior");
    }
}
\`\`\`

---

## 🔒 Encapsulation with Access Modifiers

### **Complete Encapsulation Example**
\`\`\`java
public class BankAccount {
    // Private fields - implementation details hidden
    private String accountNumber;
    private double balance;
    private String ownerName;
    private boolean isActive;

    // Public constructor
    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0;
        this.isActive = true;
    }

    // Public business methods
    public void deposit(double amount) {
        validateAmount(amount);
        balance += amount;
        logTransaction("Deposit", amount);
    }

    public void withdraw(double amount) {
        validateAmount(amount);
        validateSufficientFunds(amount);
        balance -= amount;
        logTransaction("Withdrawal", amount);
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getOwnerName() {
        return ownerName;
    }

    // Private helper methods
    private void validateAmount(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }
    }

    private void validateSufficientFunds(double amount) {
        if (balance < amount) {
            throw new IllegalArgumentException("Insufficient funds");
        }
    }

    private void logTransaction(String type, double amount) {
        System.out.println(type + " of $" + amount + " for account " + accountNumber);
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", "John Doe");

        account.deposit(1000);
        account.withdraw(500);
        System.out.println("Final balance: $" + account.getBalance());

        // Cannot directly modify private fields
        // account.balance = 1000000;  // ❌ Compilation error
    }
}
\`\`\`

---

## 📦 Access Modifiers and Inheritance

### **Inheritance Access Rules**
\`\`\`java
public class ParentClass {
    public String publicField = "Public";
    protected String protectedField = "Protected";
    String defaultField = "Default";      // Package-private
    private String privateField = "Private";

    public void publicMethod() { }
    protected void protectedMethod() { }
    void defaultMethod() { }              // Package-private
    private void privateMethod() { }
}

class ChildClass extends ParentClass {
    public void testAccess() {
        // Inherited access from parent
        System.out.println(publicField);      // ✅ Accessible
        System.out.println(protectedField);   // ✅ Accessible
        System.out.println(defaultField);     // ✅ Accessible (same package)
        // System.out.println(privateField);  // ❌ Not accessible

        publicMethod();      // ✅ Accessible
        protectedMethod();   // ✅ Accessible
        defaultMethod();     // ✅ Accessible (same package)
        // privateMethod();   // ❌ Not accessible
    }
}

class SamePackageClass {
    public void testAccess() {
        ParentClass parent = new ParentClass();
        System.out.println(parent.publicField);    // ✅
        System.out.println(parent.protectedField); // ✅ (same package)
        System.out.println(parent.defaultField);   // ✅ (same package)
        // System.out.println(parent.privateField); // ❌

        parent.publicMethod();    // ✅
        parent.protectedMethod(); // ✅ (same package)
        parent.defaultMethod();   // ✅ (same package)
        // parent.privateMethod(); // ❌
    }
}
\`\`\`

---

## 🚫 Common Access Modifier Mistakes

### **Overly Permissive Access**
\`\`\`java
public class BadAccessExample {
    // ❌ Bad: Public field allows direct modification
    public int age;

    // ❌ Bad: Public setter without validation
    public void setAge(int age) {
        this.age = age;  // No validation
    }

    public static void main(String[] args) {
        BadAccessExample obj = new BadAccessExample();

        // Can set invalid values
        obj.age = -5;        // Direct field access
        obj.setAge(200);     // No validation

        System.out.println("Age: " + obj.age);
    }
}

// ✅ Better: Proper encapsulation
class GoodAccessExample {
    private int age;

    public void setAge(int age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            throw new IllegalArgumentException("Invalid age");
        }
    }

    public int getAge() {
        return age;
    }
}
\`\`\`

### **Inconsistent Access Patterns**
\`\`\`java
public class InconsistentAccess {
    // ❌ Inconsistent: Some fields public, some private
    public String name;       // Public field
    private String email;     // Private field with getter/setter
    public int age;          // Public field

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    // This creates confusion about the class's encapsulation policy
}

// ✅ Better: Consistent encapsulation
class ConsistentAccess {
    private String name;
    private String email;
    private int age;

    // All access through methods
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
\`\`\`

---

## 🎯 Best Practices

### **1. Favor Private Fields**
\`\`\`java
public class PrivateByDefault {
    // Start with private fields
    private String data;
    private int value;
    private boolean flag;

    // Expose through public methods only when necessary
    public String getData() { return data; }
    public void setData(String data) { this.data = data; }

    // Keep implementation details private
    private void validateData() {
        // Private validation logic
    }

    private boolean isDataValid(String data) {
        // Private helper method
        return data != null && !data.trim().isEmpty();
    }
}
\`\`\`

### **2. Use Protected for Extensibility**
\`\`\`java
public class ExtensibleClass {
    private String name;

    public ExtensibleClass(String name) {
        this.name = name;
    }

    // Protected method that subclasses can override
    protected void initialize() {
        System.out.println("Base initialization for " + name);
    }

    // Protected method for subclasses to customize
    protected String formatOutput() {
        return "Output: " + name;
    }

    public void process() {
        initialize();  // Hook for subclasses
        System.out.println(formatOutput());  // Hook for subclasses
    }
}

class CustomSubclass extends ExtensibleClass {
    public CustomSubclass(String name) {
        super(name);
    }

    @Override
    protected void initialize() {
        super.initialize();
        System.out.println("Additional initialization");
    }

    @Override
    protected String formatOutput() {
        return "Custom " + super.formatOutput();
    }
}
\`\`\`

### **3. Minimize Public API**
\`\`\`java
public class MinimalPublicAPI {
    // Only expose what's absolutely necessary
    public void doImportantThing() {
        // Public method - part of API
        validateInputs();
        performOperation();
        logResults();
    }

    // Keep implementation details private
    private void validateInputs() { }
    private void performOperation() { }
    private void logResults() { }

    // Package-private for testing or package cooperation
    void packageTestMethod() { }
}
\`\`\`

### **4. Access Modifier Summary**
\`\`\`java
public class AccessModifierSummary {
    // Public: Part of the public API, stable contract
    public static final String VERSION = "1.0.0";
    public void publicApiMethod() { }

    // Protected: For inheritance, subclasses can access/modify
    protected void customizableMethod() { }
    protected String protectedField;

    // Default: Package cooperation, not part of public API
    void packageMethod() { }
    String packageField;

    // Private: Implementation details, can change freely
    private String internalData;
    private void internalMethod() { }

    // Choose based on:
    // - Who needs access?
    // - Should subclasses be able to modify?
    // - Is this part of the public contract?
    // - Can this change without breaking clients?
}
\`\`\`

Access modifiers are essential for creating well-encapsulated, maintainable Java classes. They control visibility and help establish clear contracts between different parts of your code! 🔐`
};


