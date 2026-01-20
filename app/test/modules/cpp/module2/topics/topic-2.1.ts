import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_1: SubLesson = {
  id: "2.1",
  title: 'C++ Program Structure',
  status: 'completed',
  content: `\`# 🏗️ C++ Program Structure

Every C++ program follows a specific structure. Understanding this foundation is crucial for writing clean, organized code. Let's explore the anatomy of a C++ program!

---

## 📋 Basic Program Structure

### **Minimal C++ Program**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

Every C++ program consists of these essential parts:

1. **Header Files** (Preprocessor directives)
2. **Main Function** (Program entry point)
3. **Statements** (Code execution)
4. **Return Statement** (Exit status)

---

## 📚 Header Files & Includes

### **What are Header Files?**
Header files contain:
- **Function declarations**
- **Class definitions**
- **Constants**
- **Type definitions**

### **Common Standard Library Headers**
\`\`\`cpp
#include <iostream>    // Input/Output streams
#include <string>      // String class
#include <vector>      // Dynamic arrays
#include <array>       // Fixed-size arrays
#include <map>         // Key-value containers
#include <set>         // Unique value containers
#include <algorithm>   // Algorithms (sort, find, etc.)
#include <cmath>       // Mathematical functions
#include <ctime>       // Date and time functions
#include <fstream>     // File I/O
#include <iomanip>     // I/O manipulators
#include <memory>      // Smart pointers
#include <thread>      // Multi-threading
#include <mutex>       // Thread synchronization
\`\`\`

### **Angle Brackets vs Quotes**
\`\`\`cpp
#include <iostream>     // Standard library headers (system paths)
#include "myheader.h"   // User-defined headers (project paths)
\`\`\`

---

## 🎯 The Main Function

### **Function Signature**
\`\`\`cpp
int main() {
    // Your code here
    return 0;
}
\`\`\`

### **Command Line Arguments**
\`\`\`cpp
int main(int argc, char* argv[]) {
    // argc: argument count
    // argv: argument values (array of C-strings)

    std::cout << "Number of arguments: " << argc << std::endl;
    for(int i = 0; i < argc; i++) {
        std::cout << "Argument " << i << ": " << argv[i] << std::endl;
    }

    return 0;
}
\`\`\`

### **Alternative Main Signatures**
\`\`\`cpp
// Standard signatures
int main();                    // No parameters
int main(int argc, char* argv[]);  // Command line arguments
int main(int argc, char** argv);   // Alternative syntax

// Non-standard (some compilers)
void main();                   // No return value (avoid!)
\`\`\`

---

## 📝 Statements & Expressions

### **What is a Statement?**
A statement is a complete instruction that performs some action.

### **Types of Statements**

#### **Expression Statements**
\`\`\`cpp
x = 5;                    // Assignment
func();                   // Function call
std::cout << "Hello";     // Output
++counter;                // Increment
\`\`\`

#### **Compound Statements (Blocks)**
\`\`\`cpp
{                          // Opening brace
    int x = 10;
    std::cout << x;
}                          // Closing brace
\`\`\`

#### **Control Statements**
\`\`\`cpp
if (condition) {          // Conditional
    // code
}

for (int i = 0; i < 10; i++) {  // Loop
    // code
}
\`\`\`

---

## 🔚 Return Statement

### **Purpose**
- **Exit the function**
- **Return a value** to the caller
- **Indicate program success/failure**

### **Return Values**
\`\`\`cpp
// Success
return 0;        // EXIT_SUCCESS
return EXIT_SUCCESS;

// Failure
return 1;        // EXIT_FAILURE
return EXIT_FAILURE;
return -1;       // Custom error code
\`\`\`

### **Void Functions**
\`\`\`cpp
void printMessage() {
    std::cout << "Hello!" << std::endl;
    // No return statement needed
    // (implicit return at end)
}
\`\`\`

---

## 🏷️ Comments

### **Single-Line Comments**
\`\`\`cpp
// This is a single-line comment
int x = 5;  // Comment after code
\`\`\`

### **Multi-Line Comments**
\`\`\`cpp
/*
 * This is a multi-line comment
 * spanning several lines
 */
int y = 10;
\`\`\`

### **Documentation Comments**
\`\`\`cpp
/// @brief Calculate the sum of two numbers
/// @param a First number
/// @param b Second number
/// @return Sum of a and b
int add(int a, int b) {
    return a + b;
}
\`\`\`

---

## 📏 Whitespace & Formatting

### **C++ is Whitespace-Insensitive**
All these are equivalent:
\`\`\`cpp
// Compact
int main(){std::cout<<"Hello"<<std::endl;return 0;}

// Spread out
int main()
{
    std::cout << "Hello" << std::endl;
    return 0;
}

// Mixed
int main() {
    std::cout
        << "Hello"
        << std::endl;
    return 0;
}
\`\`\`

### **Best Practices**
\`\`\`cpp
// ✅ Good formatting
#include <iostream>
#include <string>

int main() {
    std::string message = "Hello, World!";
    std::cout << message << std::endl;
    return 0;
}

// ❌ Poor formatting (hard to read)
#include<iostream>
#include<string>
int main(){std::string message="Hello, World!";std::cout<<message<<std::endl;return 0;}
\`\`\`

---

## 🔧 Preprocessor Directives

### **What is the Preprocessor?**
The preprocessor runs before compilation and modifies your source code.

### **Common Directives**

#### **Include Guards**
\`\`\`cpp
#ifndef MYHEADER_H
#define MYHEADER_H

// Header content here

#endif  // MYHEADER_H
\`\`\`

#### **Macros**
\`\`\`cpp
#define PI 3.14159
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// Usage
double area = PI * SQUARE(radius);
int larger = MAX(5, 10);
\`\`\`

#### **Conditional Compilation**
\`\`\`cpp
#define DEBUG 1

#ifdef DEBUG
    #define LOG(x) std::cout << x << std::endl
#else
    #define LOG(x) // Do nothing
#endif

// Usage
LOG("This will only print in debug mode");
\`\`\`

---

## 🏛️ Program Organization

### **Single File Program**
\`\`\`cpp
// hello.cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

### **Multi-File Program Structure**
\`\`\`text
myproject/
├── main.cpp           # Main program file
├── functions.cpp      # Function definitions
├── functions.h        # Function declarations
├── classes.cpp        # Class definitions
├── classes.h          # Class declarations
└── utils.cpp          # Utility functions
\`\`\`

**functions.h:**
\`\`\`cpp
#ifndef FUNCTIONS_H
#define FUNCTIONS_H

int add(int a, int b);
void printMessage(const std::string& msg);

#endif
\`\`\`

**functions.cpp:**
\`\`\`cpp
#include "functions.h"
#include <iostream>
#include <string>

int add(int a, int b) {
    return a + b;
}

void printMessage(const std::string& msg) {
    std::cout << msg << std::endl;
}
\`\`\`

**main.cpp:**
\`\`\`cpp
#include "functions.h"

int main() {
    int result = add(5, 3);
    printMessage("Result: " + std::to_string(result));
    return 0;
}
\`\`\`

---

## ⚠️ Common Mistakes

### **Missing Semicolons**
\`\`\`cpp
// ❌ Error: missing semicolon
std::cout << "Hello" << std::endl

// ✅ Correct
std::cout << "Hello" << std::endl;
\`\`\`

### **Missing Includes**
\`\`\`cpp
// ❌ Error: string not declared
std::string name = "Alice";

// ✅ Correct
#include <string>
std::string name = "Alice";
\`\`\`

### **Case Sensitivity**
\`\`\`cpp
// ❌ Error: Main is not main
int Main() {
    // ...
}

// ✅ Correct
int main() {
    // ...
}
\`\`\`

### **Missing Return Statement**
\`\`\`cpp
// ❌ Warning: not all paths return a value
int add(int a, int b) {
    if (a > 0) {
        return a + b;
    }
    // Missing return for a <= 0
}

// ✅ Correct
int add(int a, int b) {
    if (a > 0) {
        return a + b;
    }
    return 0;  // Handle all cases
}
\`\`\`

---

## 🔨 Compilation Process

### **Steps in Compilation**
1. **Preprocessing** (#include, #define expansion)
2. **Compilation** (C++ code to assembly)
3. **Assembly** (Assembly to machine code)
4. **Linking** (Combine with libraries)

### **Command Line Compilation**
\`\`\`bash
# Simple compilation
g++ main.cpp -o program

# Multi-file compilation
g++ main.cpp functions.cpp -o program

# With warnings and C++17
g++ -std=c++17 -Wall -Wextra main.cpp functions.cpp -o program
\`\`\`

---

## 🎯 Best Practices

### **Code Organization**
- **One responsibility per function**
- **Logical grouping of code**
- **Consistent naming conventions**
- **Proper indentation**

### **Include Order**
\`\`\`cpp
// 1. Standard library headers
#include <iostream>
#include <string>
#include <vector>

// 2. Third-party library headers
#include <boost/filesystem.hpp>

// 3. Project headers
#include "myclass.h"
#include "utils.h"
\`\`\`

### **File Naming**
- **Header files**: \`.h\` or \`.hpp\`
- **Source files**: \`.cpp\` or \`.cc\`
- **Consistent naming**: \`my_class.h\`, \`my_class.cpp\`

---

## 📚 Summary

**Key Takeaways:**
- Every C++ program needs a \`main()\` function
- Use \`#include\` for header files
- Statements end with semicolons
- Programs return an exit status
- Good formatting improves readability
- Organize code into logical files

**Next:** Now that you understand program structure, let's dive into variables and data types! 🚀\``
};