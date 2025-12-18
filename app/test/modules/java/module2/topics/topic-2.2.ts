import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: 2.2,
  title: 'Variables & Data Types',
  status: 'completed',
  content: `# 📦 Java Variables and Data Types

Variables are containers that store data values in Java. Java is a statically-typed language, which means you must declare the data type of each variable.

---

## 🆕 Creating Variables

### **Basic Variable Declaration**
\`\`\`java
// Variable declaration and initialization
String name = "Alice";
int age = 25;
double height = 5.9;
boolean isStudent = true;

// Declaration without initialization
String address;
int score;

// Multiple declarations
int x, y, z;
\`\`\`

### **Static Typing**
Unlike Python, Java requires explicit type declarations:

\`\`\`java
// ✅ Correct - type must be specified
int number = 42;
String text = "Hello";

// ❌ Wrong - type cannot be inferred
// var number = 42;  // Not allowed in older Java versions
\`\`\`

## 📊 Java Data Types

### **Primitive Data Types**

Java has 8 primitive data types:

#### **1. Integer Types**
\`\`\`java
byte smallNumber = 127;        // 8-bit: -128 to 127
short mediumNumber = 32767;    // 16-bit: -32,768 to 32,767
int number = 2147483647;       // 32-bit: -2^31 to 2^31-1
long bigNumber = 9223372036854775807L;  // 64-bit: -2^63 to 2^63-1
\`\`\`

#### **2. Floating-Point Types**
\`\`\`java
float price = 19.99f;          // 32-bit floating point
double precisePrice = 19.99;   // 64-bit floating point (default)
\`\`\`

#### **3. Character Type**
\`\`\`java
char letter = 'A';              // Single character
char digit = '5';               // Character digit
char unicode = '\\u0041';        // Unicode character
\`\`\`

#### **4. Boolean Type**
\`\`\`java
boolean isTrue = true;          // true or false
boolean isFalse = false;
boolean isGreater = 5 > 3;      // Expression result
\`\`\`

### **Reference Data Types**

#### **String Class**
\`\`\`java
String name = "Alice";          // String literal
String message = new String("Hello");  // Using constructor
String empty = "";               // Empty string
String nullString = null;        // Null reference
\`\`\`

#### **Arrays**
\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};           // Array literal
String[] names = new String[5];             // Array with size
int[][] matrix = {{1, 2}, {3, 4}};          // 2D array
\`\`\`

## 🔄 Type Conversion

### **Implicit Conversion (Widening)**
\`\`\`java
int small = 10;
long big = small;        // int to long (automatic)

float single = 10.5f;
double precise = single; // float to double (automatic)
\`\`\`

### **Explicit Conversion (Casting)**
\`\`\`java
double precise = 10.7;
int whole = (int) precise;  // 10 (decimal part lost)

long big = 1000L;
int small = (int) big;      // Explicit cast needed
\`\`\`

## 📋 Variable Scope and Lifetime

### **Local Variables**
\`\`\`java
public void example() {
    int localVar = 10;  // Exists only in this method
    {
        int blockVar = 20;  // Exists only in this block
    }
    // blockVar not accessible here
}
\`\`\`

### **Instance Variables**
\`\`\`java
public class Example {
    private int instanceVar;  // Exists as long as object exists

    public void setValue(int value) {
        instanceVar = value;
    }
}
\`\`\`

### **Static Variables**
\`\`\`java
public class Example {
    public static int staticVar = 0;  // Shared by all instances
}
\`\`\`

## 🎯 Best Practices

### **Variable Naming**
\`\`\`java
// Good naming
String firstName = "John";
int accountBalance = 1000;
boolean isAccountActive = true;

// Avoid single letters (except loop counters)
int i = 0;  // OK for loop counter
int x = 5;  // Not descriptive

// Use constants for fixed values
final double PI = 3.14159;
final int MAX_USERS = 100;
\`\`\`

### **Variable Initialization**
\`\`\`java
// Initialize when declaring
int count = 0;
String name = "Unknown";

// Or initialize before use
int result;
if (condition) {
    result = 10;
} else {
    result = 20;
}
\`\`\`

## 🎯 Summary

Java variables and data types are fundamental to understanding how data is stored and manipulated in Java programs. Key points:

- **Static Typing**: Java requires explicit type declarations
- **Primitive Types**: 8 built-in types (byte, short, int, long, float, double, char, boolean)
- **Reference Types**: Objects, arrays, strings
- **Type Safety**: Prevents many runtime errors through compile-time checking
- **Memory Management**: Automatic for primitive types, manual for reference types

Mastering data types is essential before moving to more advanced Java concepts like OOP!`
};

