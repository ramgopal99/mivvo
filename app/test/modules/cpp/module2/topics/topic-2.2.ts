import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: "2.2",
  title: 'Variables & Data Types',
  status: 'completed',
  content: `\`# 📦 Variables & Data Types

Variables are the building blocks of any program. They store data that your program can manipulate. Understanding data types and how to use variables effectively is fundamental to C++ programming.

---

## 🎯 What is a Variable?

A **variable** is a named storage location in memory that holds a value. Think of it as a labeled box where you can store and retrieve data.

### **Variable Declaration**
\`\`\`cpp
// Syntax: type variableName;
int age;           // Declaration
age = 25;          // Assignment

// Declaration + Assignment (Initialization)
int height = 175;
std::string name = "Alice";
\`\`\`

---

## 📊 Fundamental Data Types

### **Integer Types**

| Type | Size | Range | Usage |
|------|------|-------|--------|
| \`short\` | 2 bytes | -32,768 to 32,767 | Small numbers |
| \`int\` | 4 bytes | -2.1B to 2.1B | General integers |
| \`long\` | 4/8 bytes | Platform dependent | Large numbers |
| \`long long\` | 8 bytes | -9.2Q to 9.2Q | Very large numbers |

\`\`\`cpp
short smallNumber = 100;
int normalNumber = 50000;
long largeNumber = 1000000L;
long long hugeNumber = 1000000000000LL;

// Unsigned variants (only positive)
unsigned int positiveOnly = 42;
unsigned long bigPositive = 5000000UL;
\`\`\`

### **Floating-Point Types**

| Type | Size | Precision | Usage |
|------|------|-----------|--------|
| \`float\` | 4 bytes | 6-7 decimal digits | Single precision |
| \`double\` | 8 bytes | 15 decimal digits | Double precision |
| \`long double\` | 8-16 bytes | Higher precision | Extended precision |

\`\`\`cpp
float pi_float = 3.14159f;
double pi_double = 3.141592653589793;
long double pi_extended = 3.141592653589793238L;

float temperature = 98.6f;
double distance = 384400.0;  // Earth to Moon in km
\`\`\`

### **Character Types**

| Type | Size | Usage |
|------|------|--------|
| \`char\` | 1 byte | Single character |
| \`wchar_t\` | 2-4 bytes | Wide character |
| \`char16_t\` | 2 bytes | Unicode UTF-16 |
| \`char32_t\` | 4 bytes | Unicode UTF-32 |

\`\`\`cpp
char letter = 'A';
char digit = '5';
char symbol = '@';

wchar_t wideChar = L'Ω';      // Greek letter Omega
char16_t utf16 = u'🎵';        // Music note emoji
char32_t utf32 = U'🚀';        // Rocket emoji
\`\`\`

### **Boolean Type**

| Type | Size | Values |
|------|------|--------|
| \`bool\` | 1 byte | \`true\`, \`false\` |

\`\`\`cpp
bool isStudent = true;
bool hasLicense = false;
bool isAdult = (age >= 18);
\`\`\`

---

## 🔧 Variable Declaration & Initialization

### **Declaration Syntax**
\`\`\`cpp
// Single variable
type variableName;

// Multiple variables
type var1, var2, var3;

// With initialization
type variableName = value;
\`\`\`

### **Initialization Methods**

#### **Copy Initialization**
\`\`\`cpp
int x = 42;
std::string name = "Alice";
double pi = 3.14159;
\`\`\`

#### **Direct Initialization**
\`\`\`cpp
int x(42);
std::string name("Alice");
\`\`\`

#### **Uniform Initialization (C++11)**
\`\`\`cpp
int x{42};
std::string name{"Alice"};
std::vector<int> numbers{1, 2, 3, 4, 5};
\`\`\`

#### **Default Initialization**
\`\`\`cpp
int x;        // Uninitialized (dangerous!)
int y{};      // Initialized to 0
int z = int(); // Initialized to 0
\`\`\`

---

## 📏 Variable Scope & Lifetime

### **Local Scope**
Variables declared inside functions:
\`\`\`cpp
void myFunction() {
    int localVar = 10;  // Exists only in this function
    // localVar is accessible here
}
// localVar is destroyed here
\`\`\`

### **Block Scope**
Variables declared inside blocks:
\`\`\`cpp
if (true) {
    int blockVar = 20;  // Exists only in this block
    // blockVar is accessible here
}
// blockVar is destroyed here
\`\`\`

### **Global Scope**
Variables declared outside functions:
\`\`\`cpp
#include <iostream>

int globalVar = 100;  // Global variable

int main() {
    std::cout << globalVar << std::endl;  // Accessible everywhere
    return 0;
}
\`\`\`

### **Static Variables**
Retain value between function calls:
\`\`\`cpp
void counterFunction() {
    static int count = 0;  // Initialized only once
    count++;
    std::cout << "Call #" << count << std::endl;
}

int main() {
    counterFunction();  // Call #1
    counterFunction();  // Call #2
    counterFunction();  // Call #3
    return 0;
}
\`\`\`

---

## 🔄 Type Conversion

### **Implicit Conversion (Automatic)**
\`\`\`cpp
int x = 5;
double y = x;  // int → double (safe)

char c = 'A';
int ascii = c;  // char → int (ASCII value)
\`\`\`

### **Explicit Conversion (Casting)**

#### **C-Style Casting**
\`\`\`cpp
double pi = 3.14159;
int approx = (int)pi;  // 3.14159 → 3
\`\`\`

#### **C++ Static Cast**
\`\`\`cpp
double pi = 3.14159;
int approx = static_cast<int>(pi);
\`\`\`

#### **Other Cast Types**
\`\`\`cpp
// const_cast: remove const-ness
const int x = 5;
int* ptr = const_cast<int*>(&x);

// reinterpret_cast: low-level casting
int value = 42;
char* charPtr = reinterpret_cast<char*>(&value);

// dynamic_cast: for polymorphic types (covered later)
\`\`\`

---

## 📏 Sizeof Operator

Check the size of variables and types:
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Size of int: " << sizeof(int) << " bytes" << std::endl;
    std::cout << "Size of double: " << sizeof(double) << " bytes" << std::endl;
    std::cout << "Size of char: " << sizeof(char) << " bytes" << std::endl;

    int x = 42;
    std::cout << "Size of x: " << sizeof(x) << " bytes" << std::endl;

    return 0;
}
\`\`\`

---

## 🎨 Constants

### **Const Variables**
Cannot be modified after initialization:
\`\`\`cpp
const double PI = 3.14159;
const int MAX_USERS = 100;
const std::string COMPANY = "TechCorp";

// PI = 3.14;  // ❌ Error: cannot modify const

// Const pointers
const int* ptr1 = &x;  // Pointer to const int
int* const ptr2 = &x;  // Const pointer to int
const int* const ptr3 = &x;  // Const pointer to const int
\`\`\`

### **Constexpr (C++11)**
Compile-time constants:
\`\`\`cpp
constexpr double PI = 3.14159;
constexpr int FIB_10 = 55;  // 10th Fibonacci number

// Can be used in array sizes
int array[FIB_10];  // Valid at compile time
\`\`\`

---

## 🔤 Literals

### **Integer Literals**
\`\`\`cpp
int decimal = 42;      // Decimal
int octal = 052;       // Octal (42 in decimal)
int hex = 0x2A;        // Hexadecimal (42 in decimal)
int binary = 0b101010; // Binary (42 in decimal, C++14)
\`\`\`

### **Floating-Point Literals**
\`\`\`cpp
double pi = 3.14159;
float gravity = 9.81f;
long double avogadro = 6.022e23L;
\`\`\`

### **Character Literals**
\`\`\`cpp
char letter = 'A';
char newline = '\\n';
char tab = '\\t';
char quote = '\\"';
char backslash = '\\\\';
\`\`\`

### **String Literals**
\`\`\`cpp
const char* str1 = "Hello";
std::string str2 = "World";

// Raw strings (C++11) - no escape sequences needed
const char* path = R"(C:\\Program Files\\MyApp)";
const char* multiline = R"(
This is a
multiline string
)";
\`\`\`

---

## 🚨 Common Mistakes & Best Practices

### **Uninitialized Variables**
\`\`\`cpp
// ❌ Dangerous: uninitialized variable
int x;
std::cout << x;  // Undefined behavior!

// ✅ Safe initialization
int x = 0;
int y{};  // Zero-initialized
\`\`\`

### **Type Mismatches**
\`\`\`cpp
// ❌ Loss of precision
int x = 3.14159;  // Becomes 3

// ✅ Explicit casting
int x = static_cast<int>(3.14159);
\`\`\`

### **Magic Numbers**
\`\`\`cpp
// ❌ Magic numbers
double area = 3.14159 * radius * radius;

// ✅ Named constants
const double PI = 3.14159;
double area = PI * radius * radius;
\`\`\`

### **Variable Naming**
\`\`\`cpp
// ✅ Good naming
int userAge;
double accountBalance;
std::string firstName;

// ❌ Poor naming
int a;
double x;
std::string s;
\`\`\`

---

## 🔍 Type Information (Typeid)

Get information about types at runtime:
\`\`\`cpp
#include <iostream>
#include <typeinfo>

int main() {
    int x = 42;
    double y = 3.14;

    std::cout << "Type of x: " << typeid(x).name() << std::endl;
    std::cout << "Type of y: " << typeid(y).name() << std::endl;

    return 0;
}
\`\`\`

---

## 📊 Memory Layout

### **Variable Storage**
\`\`\`cpp
#include <iostream>

int globalVar = 100;  // Stored in data segment

int main() {
    int localVar = 50;    // Stored on stack
    static int staticVar = 25;  // Stored in data segment

    std::cout << "Global: " << globalVar << std::endl;
    std::cout << "Local: " << localVar << std::endl;
    std::cout << "Static: " << staticVar << std::endl;

    return 0;
}
\`\`\`

---

## 🎯 Summary

**Key Concepts:**
- **Variables** store data in named memory locations
- **Data types** specify what kind of data a variable can hold
- **Scope** determines where a variable is accessible
- **Lifetime** determines how long a variable exists
- **Constants** prevent modification after initialization

**Fundamental Types:**
- **Integers**: \`int\`, \`short\`, \`long\`, \`long long\`
- **Floating-point**: \`float\`, \`double\`, \`long double\`
- **Characters**: \`char\`, \`wchar_t\`, \`char16_t\`, \`char32_t\`
- **Boolean**: \`bool\`

**Best Practices:**
- Always initialize variables
- Use meaningful names
- Prefer \`const\` for constants
- Use appropriate data types for your needs
- Be careful with type conversions

**Next:** Now let's explore operators and expressions to manipulate these variables! ⚡\``
};