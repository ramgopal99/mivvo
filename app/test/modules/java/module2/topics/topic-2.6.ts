import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: 2.6,
  title: 'Type Casting',
  status: 'completed',
  content: `# 🔄 Type Casting and Conversions in Java

Type casting and conversions are essential concepts in Java for converting between different data types. Understanding these concepts helps prevent errors and ensures data integrity.

---

## 📊 Implicit vs Explicit Conversion

### **Implicit Conversion (Automatic)**
Java automatically converts compatible types without explicit casting.

\`\`\`java
public class ImplicitConversion {
    public static void main(String[] args) {
        // Widening conversions (safe, no data loss)
        int intValue = 100;
        long longValue = intValue;      // int → long
        float floatValue = intValue;    // int → float
        double doubleValue = floatValue; // float → double

        System.out.println("int to long: " + longValue);
        System.out.println("int to float: " + floatValue);
        System.out.println("float to double: " + doubleValue);

        // char to int (ASCII value)
        char letter = 'A';
        int asciiValue = letter;  // 'A' = 65
        System.out.println("Char 'A' ASCII: " + asciiValue);
    }
}
\`\`\`

### **Explicit Conversion (Casting)**
Requires explicit casting when converting to a narrower type or between incompatible types.

\`\`\`java
public class ExplicitCasting {
    public static void main(String[] args) {
        // Narrowing conversions (potential data loss)
        double doubleValue = 123.456;
        float floatValue = (float) doubleValue;    // double → float
        long longValue = (long) doubleValue;       // double → long (truncates decimal)
        int intValue = (int) doubleValue;          // double → int (truncates decimal)

        System.out.println("double: " + doubleValue);
        System.out.println("float: " + floatValue);
        System.out.println("long: " + longValue);
        System.out.println("int: " + intValue);

        // int to char
        int number = 66;
        char character = (char) number;  // 66 = 'B'
        System.out.println("int 66 to char: " + character);
    }
}
\`\`\`

---

## 🏗️ Primitive Type Casting

### **Widening Casting (Safe)**
\`\`\`java
public class WideningCasting {
    public static void main(String[] args) {
        // byte → short → int → long → float → double
        byte byteValue = 100;
        short shortValue = byteValue;    // byte to short
        int intValue = shortValue;       // short to int
        long longValue = intValue;       // int to long
        float floatValue = longValue;    // long to float
        double doubleValue = floatValue; // float to double

        System.out.println("Widening: byte " + byteValue +
                          " → double " + doubleValue);

        // char can be widened to int, long, float, double
        char charValue = 'A';  // ASCII 65
        int intFromChar = charValue;
        double doubleFromChar = charValue;

        System.out.println("Char 'A' to int: " + intFromChar);
        System.out.println("Char 'A' to double: " + doubleFromChar);
    }
}
\`\`\`

### **Narrowing Casting (Risky)**
\`\`\`java
public class NarrowingCasting {
    public static void main(String[] args) {
        // double → float → long → int → short → byte
        double doubleValue = 123.987;

        float floatValue = (float) doubleValue;
        long longValue = (long) doubleValue;    // Truncates decimal part
        int intValue = (int) doubleValue;       // Truncates decimal part

        System.out.println("Original double: " + doubleValue);
        System.out.println("After narrowing to int: " + intValue);
        System.out.println("Lost decimal precision: " + (doubleValue - intValue));

        // Potential overflow
        int largeInt = 130;  // 130 is within byte range (-128 to 127)
        byte byteValue = (byte) largeInt;
        System.out.println("int 130 to byte: " + byteValue);  // Becomes -126 due to overflow

        // char narrowing
        int intNum = 98;
        char charFromInt = (char) intNum;  // 98 = 'b'
        System.out.println("int 98 to char: " + charFromInt);
    }
}
\`\`\`

---

## 🔧 Reference Type Casting

### **Upcasting (Safe)**
\`\`\`java
class Animal {
    public void makeSound() {
        System.out.println("Some animal sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }

    public void fetch() {
        System.out.println("Fetching ball");
    }
}

public class Upcasting {
    public static void main(String[] args) {
        Dog dog = new Dog();

        // Upcasting: Dog → Animal (automatic)
        Animal animal = dog;

        // Can call methods defined in Animal
        animal.makeSound();  // Calls Dog's overridden method

        // Cannot call Dog-specific methods
        // animal.fetch();  // Compilation error

        System.out.println("Upcasting successful!");
    }
}
\`\`\`

### **Downcasting (Risky)**
\`\`\`java
public class Downcasting {
    public static void main(String[] args) {
        Animal animal = new Dog();  // Upcast first

        // Downcasting: Animal → Dog (requires explicit cast)
        if (animal instanceof Dog) {
            Dog dog = (Dog) animal;
            dog.makeSound();  // Woof!
            dog.fetch();      // Fetching ball
            System.out.println("Downcasting successful!");
        } else {
            System.out.println("Cannot downcast - not a Dog instance");
        }

        // Dangerous downcasting (without instanceof check)
        Animal cat = new Animal();
        try {
            Dog fakeDog = (Dog) cat;  // ClassCastException at runtime
            fakeDog.makeSound();
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🛠️ Utility Methods for Conversion

### **String to Primitive**
\`\`\`java
public class StringToPrimitive {
    public static void main(String[] args) {
        // String to numbers
        String intStr = "123";
        String doubleStr = "45.67";
        String booleanStr = "true";

        int intValue = Integer.parseInt(intStr);
        double doubleValue = Double.parseDouble(doubleStr);
        boolean booleanValue = Boolean.parseBoolean(booleanStr);

        System.out.println("String to int: " + intValue);
        System.out.println("String to double: " + doubleValue);
        System.out.println("String to boolean: " + booleanValue);

        // Handling conversion errors
        try {
            int invalidInt = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("NumberFormatException: " + e.getMessage());
        }

        // Safe conversion with default values
        String userInput = "invalid";
        int safeInt = 0;
        try {
            safeInt = Integer.parseInt(userInput);
        } catch (NumberFormatException e) {
            System.out.println("Using default value: " + safeInt);
        }
    }
}
\`\`\`

### **Primitive to String**
\`\`\`java
public class PrimitiveToString {
    public static void main(String[] args) {
        int intValue = 42;
        double doubleValue = 3.14159;
        boolean booleanValue = true;

        // Method 1: String concatenation
        String str1 = "" + intValue;
        String str2 = "" + doubleValue;
        String str3 = "" + booleanValue;

        // Method 2: String.valueOf()
        String str4 = String.valueOf(intValue);
        String str5 = String.valueOf(doubleValue);
        String str6 = String.valueOf(booleanValue);

        // Method 3: Wrapper class toString()
        String str7 = Integer.toString(intValue);
        String str8 = Double.toString(doubleValue);
        String str9 = Boolean.toString(booleanValue);

        System.out.println("Different conversion methods:");
        System.out.println("Concatenation: " + str1 + ", " + str2 + ", " + str3);
        System.out.println("String.valueOf: " + str4 + ", " + str5 + ", " + str6);
        System.out.println("toString: " + str7 + ", " + str8 + ", " + str9);
    }
}
\`\`\`

---

## 🔄 Wrapper Classes and Auto-boxing

### **Wrapper Classes**
\`\`\`java
public class WrapperClasses {
    public static void main(String[] args) {
        // Primitive to Wrapper (Boxing)
        int primitiveInt = 42;
        Integer wrapperInt = Integer.valueOf(primitiveInt);  // Explicit boxing
        Integer autoBoxedInt = primitiveInt;                // Auto-boxing

        // Wrapper to Primitive (Unboxing)
        Integer wrapperDouble = 3.14;
        double primitiveDouble = wrapperDouble.doubleValue();  // Explicit unboxing
        double autoUnboxedDouble = wrapperDouble;              // Auto-unboxing

        System.out.println("Primitive int: " + primitiveInt);
        System.out.println("Wrapper Integer: " + wrapperInt);
        System.out.println("Auto-boxed: " + autoBoxedInt);
        System.out.println("Auto-unboxed: " + autoUnboxedDouble);

        // Useful wrapper methods
        System.out.println("Max int value: " + Integer.MAX_VALUE);
        System.out.println("Min int value: " + Integer.MIN_VALUE);
        System.out.println("Is digit '5': " + Character.isDigit('5'));
        System.out.println("Is letter 'A': " + Character.isLetter('A'));
    }
}
\`\`\`

### **Auto-boxing and Auto-unboxing**
\`\`\`java
public class AutoBoxing {
    public static void main(String[] args) {
        // Auto-boxing in collections
        java.util.List<Integer> numbers = new java.util.ArrayList<>();
        numbers.add(1);        // int → Integer (auto-boxing)
        numbers.add(2);
        numbers.add(3);

        // Auto-unboxing in operations
        int sum = 0;
        for (Integer num : numbers) {
            sum += num;       // Integer → int (auto-unboxing)
        }

        System.out.println("Sum using auto-boxing/unboxing: " + sum);

        // Comparison with auto-unboxing
        Integer a = 100;
        Integer b = 100;
        Integer c = 200;
        Integer d = 200;

        System.out.println("a == b: " + (a == b));     // true (same value, cached)
        System.out.println("c == d: " + (c == d));     // false (different objects)
        System.out.println("c.equals(d): " + c.equals(d)); // true (same value)
    }
}
\`\`\`

---

## 🔍 Advanced Casting Techniques

### **instanceof Operator**
\`\`\`java
class Vehicle {
    void drive() {
        System.out.println("Driving vehicle");
    }
}

class Car extends Vehicle {
    void drive() {
        System.out.println("Driving car");
    }

    void honk() {
        System.out.println("Honk honk!");
    }
}

class Bike extends Vehicle {
    void drive() {
        System.out.println("Riding bike");
    }

    void ringBell() {
        System.out.println("Ring ring!");
    }
}

public class InstanceofDemo {
    public static void main(String[] args) {
        Vehicle v1 = new Car();
        Vehicle v2 = new Bike();
        Vehicle v3 = new Vehicle();

        // Safe downcasting using instanceof
        if (v1 instanceof Car) {
            Car car = (Car) v1;
            car.honk();  // Safe to call Car-specific method
        }

        if (v2 instanceof Bike) {
            Bike bike = (Bike) v2;
            bike.ringBell();  // Safe to call Bike-specific method
        }

        if (v3 instanceof Car) {
            System.out.println("v3 is a Car");
        } else {
            System.out.println("v3 is not a Car");
        }
    }
}
\`\`\`

### **Generic Casting (Advanced)**
\`\`\`java
import java.util.List;
import java.util.ArrayList;

public class GenericCasting {
    public static void main(String[] args) {
        // Raw types (avoid in modern Java)
        List rawList = new ArrayList();
        rawList.add("String");
        rawList.add(123);  // Mixed types allowed

        // Generic types (preferred)
        List<String> stringList = new ArrayList<>();
        stringList.add("Hello");
        stringList.add("World");

        // Cannot add wrong type (compile-time safety)
        // stringList.add(123);  // Compilation error

        // Iterating with generics
        for (String item : stringList) {
            System.out.println("Item: " + item.toUpperCase());
        }

        // Generic method
        printList(stringList);
    }

    // Generic method
    public static <T> void printList(List<T> list) {
        for (T item : list) {
            System.out.println("Generic item: " + item);
        }
    }
}
\`\`\`

---

## ⚠️ Common Casting Mistakes

### **1. Loss of Precision**
\`\`\`java
public class PrecisionLoss {
    public static void main(String[] args) {
        double preciseValue = 123.987654321;

        // Losing precision in narrowing conversion
        float lessPrecise = (float) preciseValue;     // double → float
        long integerPart = (long) preciseValue;       // double → long
        int evenLessPrecise = (int) preciseValue;     // double → int

        System.out.println("Original: " + preciseValue);
        System.out.println("Float: " + lessPrecise);
        System.out.println("Long: " + integerPart);
        System.out.println("Int: " + evenLessPrecise);

        // Large numbers in narrowing conversions
        long bigNumber = 1_000_000_000_000L;
        int tooSmall = (int) bigNumber;  // Overflow!

        System.out.println("Big long: " + bigNumber);
        System.out.println("Small int: " + tooSmall);  // Wrong value due to overflow
    }
}
\`\`\`

### **2. Invalid Reference Casting**
\`\`\`java
class Parent { }
class Child extends Parent {
    void childMethod() {
        System.out.println("Child method");
    }
}

public class InvalidCasting {
    public static void main(String[] args) {
        Parent parent = new Parent();

        // This compiles but fails at runtime
        try {
            Child child = (Child) parent;  // ClassCastException
            child.childMethod();
        } catch (ClassCastException e) {
            System.out.println("ClassCastException: " + e.getMessage());
        }

        // Correct way: check with instanceof first
        if (parent instanceof Child) {
            Child child = (Child) parent;
            child.childMethod();
        } else {
            System.out.println("Cannot cast Parent to Child");
        }
    }
}
\`\`\`

### **3. Null Pointer Issues**
\`\`\`java
public class NullCasting {
    public static void main(String[] args) {
        String str = null;

        // This compiles but may cause NullPointerException later
        try {
            int length = str.length();  // NullPointerException
            System.out.println("Length: " + length);
        } catch (NullPointerException e) {
            System.out.println("NullPointerException: " + e.getMessage());
        }

        // Safe null checking
        if (str != null) {
            int length = str.length();
            System.out.println("Safe length: " + length);
        } else {
            System.out.println("String is null");
        }

        // Modern null-safe operations (Java 8+)
        Integer safeLength = (str != null) ? str.length() : null;
        System.out.println("Safe length (ternary): " + safeLength);
    }
}
\`\`\`

---

## 🎯 Best Practices for Type Conversions

### **1. Prefer Explicit Casting**
\`\`\`java
public class CastingBestPractices {
    public static void main(String[] args) {
        double value = 123.789;

        // ✅ Clear intent with explicit casting
        int explicitCast = (int) value;

        // ❌ Implicit narrowing (compilation error)
        // int implicitCast = value;  // Error!

        System.out.println("Explicit cast result: " + explicitCast);

        // Use wrapper classes for complex conversions
        String numberStr = "456";
        try {
            int parsedInt = Integer.parseInt(numberStr);
            double parsedDouble = Double.parseDouble(numberStr);
            System.out.println("Parsed values: " + parsedInt + ", " + parsedDouble);
        } catch (NumberFormatException e) {
            System.out.println("Invalid number format: " + e.getMessage());
        }
    }
}
\`\`\`

### **2. Check Before Casting**
\`\`\`java
public class SafeCasting {
    public static void processVehicle(Object obj) {
        // ✅ Always check with instanceof before casting
        if (obj instanceof Car) {
            Car car = (Car) obj;
            car.honk();
        } else if (obj instanceof Bike) {
            Bike bike = (Bike) obj;
            bike.ringBell();
        } else {
            System.out.println("Unknown vehicle type");
        }
    }

    public static void main(String[] args) {
        processVehicle(new Car());
        processVehicle(new Bike());
        processVehicle("Not a vehicle");  // Safe - no exception
    }
}

// Dummy classes for demonstration
class Car {
    void honk() { System.out.println("Honk!"); }
}

class Bike {
    void ringBell() { System.out.println("Ring!"); }
}
\`\`\`

### **3. Use Generics for Type Safety**
\`\`\`java
import java.util.List;
import java.util.ArrayList;

public class GenericSafety {
    public static void main(String[] args) {
        // ✅ Type-safe generic collections
        List<String> stringList = new ArrayList<>();
        stringList.add("Hello");
        // stringList.add(123);  // Compilation error!

        // ✅ Type-safe generic methods
        String result = combine("Hello", " World");
        System.out.println("Combined: " + result);

        // ❌ Raw types (avoid in modern Java)
        List rawList = new ArrayList();  // Allows any type
        rawList.add("String");
        rawList.add(123);  // No compilation error, but risky
    }

    // Generic method
    public static <T> T combine(T first, T second) {
        if (first instanceof String && second instanceof String) {
            return (T) ((String) first + (String) second);
        }
        return first;  // Simple fallback
    }
}
\`\`\`

Type casting and conversions are fundamental to Java programming. Always be aware of potential data loss, use explicit casting when narrowing, and check object types before casting references! 🔄`
};

