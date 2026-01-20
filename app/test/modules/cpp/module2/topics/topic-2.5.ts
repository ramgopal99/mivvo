import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: "2.5",
  title: 'Namespaces & Using Directives',
  status: 'completed',
  content: `\`# 📦 Namespaces & Using Directives

Namespaces are a fundamental feature in C++ that help organize code and prevent naming conflicts. They allow you to group related functions, classes, and variables under a common scope, avoiding collisions with identically named entities from different libraries or parts of your program.

---

## 🎯 What is a Namespace?

### **The Problem Without Namespaces**
\`\`\`cpp
// ❌ Potential naming conflicts
void print() { /* my print function */ }

void print() { /* someone else's print function */ }  // Error: redefinition

int max = 100;
int max = 200;  // Error: redefinition
\`\`\`

### **Solution: Namespaces**
\`\`\`cpp
// ✅ Namespaces prevent conflicts
namespace mylib {
    void print() { /* my print function */ }
    int max = 100;
}

namespace otherlib {
    void print() { /* someone else's print function */ }
    int max = 200;
}
\`\`\`

---

## 🏗️ Defining Namespaces

### **Basic Namespace Definition**
\`\`\`cpp
namespace MyNamespace {
    // Functions, classes, variables go here
    int value = 42;
    void display() {
        std::cout << "Value: " << value << std::endl;
    }
}
\`\`\`

### **Nested Namespaces**
\`\`\`cpp
namespace Outer {
    namespace Inner {
        void function() {
            std::cout << "Nested namespace function" << std::endl;
        }
    }
}

// Access nested namespace
Outer::Inner::function();
\`\`\`

### **Namespace Aliases**
\`\`\`cpp
namespace VeryLongNamespaceName {
    void func() {}
}

// Create shorter alias
namespace VLNN = VeryLongNamespaceName;

// Now you can use:
VLNN::func();
\`\`\`

---

## 📥 Accessing Namespace Members

### **Qualified Access**
\`\`\`cpp
#include <iostream>

namespace Math {
    const double PI = 3.14159;
    double area(double radius) {
        return PI * radius * radius;
    }
}

int main() {
    // Access using namespace qualifier
    double r = 5.0;
    double circleArea = Math::area(r);
    std::cout << "Area: " << circleArea << std::endl;
    std::cout << "PI: " << Math::PI << std::endl;

    return 0;
}
\`\`\`

### **Using Declarations**
\`\`\`cpp
#include <iostream>

namespace Utils {
    void print(std::string message) {
        std::cout << message << std::endl;
    }

    int add(int a, int b) {
        return a + b;
    }
}

int main() {
    // Bring specific items into scope
    using Utils::print;
    using Utils::add;

    // Now you can use them directly
    print("Hello, World!");
    int result = add(5, 3);
    print("Result: " + std::to_string(result));

    // Utils::add still works
    int another = Utils::add(10, 20);

    return 0;
}
\`\`\`

### **Using Directives**
\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

namespace ContainerUtils {
    void printVector(const std::vector<int>& vec) {
        for (int num : vec) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }

    void sortVector(std::vector<int>& vec) {
        std::sort(vec.begin(), vec.end());
    }
}

int main() {
    // Bring entire namespace into scope
    using namespace ContainerUtils;

    std::vector<int> numbers = {3, 1, 4, 1, 5};

    printVector(numbers);  // No qualifier needed
    sortVector(numbers);
    printVector(numbers);

    return 0;
}
\`\`\`

---

## 🌍 The std Namespace

### **Standard Library Namespace**
\`\`\`cpp
// Everything in the C++ standard library is in namespace std
#include <iostream>
#include <string>
#include <vector>

// Common std members:
// std::cout, std::cin, std::endl
// std::string, std::vector, std::map
// std::sort, std::find, std::max, etc.
\`\`\`

### **Common Ways to Access std**

#### **Method 1: Qualified Access (Recommended)**
\`\`\`cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Enter your name: ";
    std::getline(std::cin, name);
    std::cout << "Hello, " << name << "!" << std::endl;
    return 0;
}
\`\`\`

#### **Method 2: Using Declarations**
\`\`\`cpp
#include <iostream>
#include <string>

using std::cout;
using std::cin;
using std::endl;
using std::string;

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);  // getline still needs std::
    cout << "Hello, " << name << "!" << endl;
    return 0;
}
\`\`\`

#### **Method 3: Using Directive (Generally Avoided)**
\`\`\`cpp
#include <iostream>
#include <string>

using namespace std;  // Bring entire std namespace

int main() {
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    return 0;
}
\`\`\`

---

## ⚠️ Using Directive Controversies

### **Why Avoid \`using namespace std\`?**

#### **Problem 1: Name Conflicts**
\`\`\`cpp
#include <iostream>
#include <algorithm>

using namespace std;

// Now both cout and a potential custom cout conflict
void cout() {
    // This would conflict with std::cout!
}
\`\`\`

#### **Problem 2: Ambiguity**
\`\`\`cpp
#include <iostream>
#include <vector>

using namespace std;

class vector {
    // Custom vector class
};

int main() {
    vector v;  // Which vector? std::vector or custom?
    return 0;
}
\`\`\`

#### **Problem 3: Hidden Dependencies**
\`\`\`cpp
// In header file (bad practice)
using namespace std;

// Now every file that includes this header
// gets the entire std namespace!
\`\`\`

### **When is \`using namespace\` OK?**

#### **In Implementation Files (.cpp)**
\`\`\`cpp
// myfile.cpp - OK for implementation files
#include "myheader.h"
using namespace std;
using namespace boost;

// Implementation details here
\`\`\`

#### **In Limited Scopes**
\`\`\`cpp
void someFunction() {
    using namespace std;  // Limited to function scope
    // Use unqualified names here
}
// Outside the function, still need qualification
\`\`\`

#### **Namespace Aliases**
\`\`\`cpp
namespace fs = std::filesystem;
namespace ch = std::chrono;

// Now use fs:: and ch:: instead of long names
\`\`\`

---

## 🏗️ Creating Your Own Namespaces

### **Organizing Code with Namespaces**
\`\`\`cpp
// math_utils.h
#ifndef MATH_UTILS_H
#define MATH_UTILS_H

namespace MathUtils {
    const double PI = 3.141592653589793;

    double area(double radius);
    double circumference(double radius);
    double volume(double radius);

    namespace Geometry3D {
        double sphereVolume(double radius);
        double cubeVolume(double side);
    }
}

#endif
\`\`\`

\`\`\`cpp
// math_utils.cpp
#include "math_utils.h"

namespace MathUtils {
    double area(double radius) {
        return PI * radius * radius;
    }

    double circumference(double radius) {
        return 2 * PI * radius;
    }

    double volume(double radius) {
        return (4.0/3.0) * PI * radius * radius * radius;
    }

    namespace Geometry3D {
        double sphereVolume(double radius) {
            return (4.0/3.0) * PI * radius * radius * radius;
        }

        double cubeVolume(double side) {
            return side * side * side;
        }
    }
}
\`\`\`

\`\`\`cpp
// main.cpp
#include <iostream>
#include "math_utils.h"

int main() {
    using namespace MathUtils;

    double radius = 5.0;

    std::cout << "Circle area: " << area(radius) << std::endl;
    std::cout << "Circle circumference: " << circumference(radius) << std::endl;
    std::cout << "Sphere volume: " << Geometry3D::sphereVolume(radius) << std::endl;

    return 0;
}
\`\`\`

---

## 🔄 Anonymous Namespaces

### **Unnamed Namespaces**
\`\`\`cpp
// Internal linkage - file scope only
namespace {
    int internalVariable = 42;
    void internalFunction() {
        std::cout << "Internal function" << std::endl;
    }
}

// Equivalent to:
// static int internalVariable = 42;
// static void internalFunction() { ... }
\`\`\`

### **Usage in Implementation Files**
\`\`\`cpp
// utils.cpp
namespace {  // Anonymous namespace
    const double CONVERSION_FACTOR = 2.54;

    double convertInchesToCm(double inches) {
        return inches * CONVERSION_FACTOR;
    }
}

void publicFunction() {
    double result = convertInchesToCm(10.0);
    std::cout << "10 inches = " << result << " cm" << std::endl;
}
\`\`\`

---

## 📚 Advanced Namespace Features

### **Inline Namespaces (C++11)**
\`\`\`cpp
namespace Library {
    inline namespace v1 {  // Inline namespace
        void func() { std::cout << "Version 1" << std::endl; }
    }

    namespace v2 {
        void func() { std::cout << "Version 2" << std::endl; }
    }
}

// These are equivalent:
Library::func();       // Calls v1::func() due to inline
Library::v1::func();   // Explicit call to v1
Library::v2::func();   // Call to v2
\`\`\`

### **Namespace Composition**
\`\`\`cpp
namespace A {
    int x = 1;
}

namespace B {
    int x = 2;
}

// Compose namespaces
namespace Combined {
    using namespace A;
    using namespace B;

    // Now need to qualify which x you want
    int getA_x() { return A::x; }
    int getB_x() { return B::x; }
}
\`\`\`

---

## 🏆 Best Practices

### **Namespace Organization**
\`\`\`cpp
// Good: Hierarchical organization
namespace Company {
    namespace Product {
        namespace Utils {
            void helper();
        }
        namespace Core {
            void process();
        }
    }
}

// Usage:
Company::Product::Utils::helper();
Company::Product::Core::process();
\`\`\`

### **Avoid Global Using Directives**
\`\`\`cpp
// ❌ Bad: Global using directive
#include <iostream>
using namespace std;

// ✅ Good: Qualified access
#include <iostream>

int main() {
    std::cout << "Hello" << std::endl;
    return 0;
}

// ✅ Good: Specific using declarations
#include <iostream>
using std::cout;
using std::endl;
\`\`\`

### **Consistent Naming**
\`\`\`cpp
// Good naming conventions
namespace MyCompany {
    namespace MyProduct {
        namespace Networking {
            class TcpClient;
            class UdpServer;
        }
    }
}
\`\`\`

### **Header File Guidelines**
\`\`\`cpp
// In header files (.h/.hpp):
// - Use qualified names
// - Don't use using directives
// - Declare what you need

// myheader.h
#ifndef MYHEADER_H
#define MYHEADER_H

#include <string>

namespace MyNamespace {
    void func(const std::string& param);
}

#endif
\`\`\`

---

## 🔍 Name Lookup Rules

### **Namespace Lookup Order**
\`\`\`cpp
namespace A {
    int x = 1;
}

int x = 2;  // Global x

namespace B {
    int x = 3;

    void func() {
        int x = 4;  // Local x
        std::cout << x << std::endl;       // 4 (local)
        std::cout << B::x << std::endl;    // 3 (namespace B)
        std::cout << A::x << std::endl;    // 1 (namespace A)
        std::cout << ::x << std::endl;     // 2 (global)
    }
}
\`\`\`

### **Using Declarations and Lookup**
\`\`\`cpp
namespace A { int x = 1; }
namespace B { int x = 2; }

using A::x;  // Bring A::x into current scope

void func() {
    std::cout << x << std::endl;  // Refers to A::x (value 1)
    std::cout << B::x << std::endl;  // Explicit qualification still works
}
\`\`\`

---

## 🚨 Common Mistakes

### **Name Conflicts with Using Directives**
\`\`\`cpp
#include <iostream>
#include <vector>

using namespace std;

class vector {  // ❌ Conflicts with std::vector
    // ...
};
\`\`\`

### **Overusing Using Directives**
\`\`\`cpp
// ❌ Too many using directives
using namespace std;
using namespace boost;
using namespace MyCompany;

// ✅ Selective using declarations
using std::cout;
using std::endl;
using boost::shared_ptr;
using MyCompany::MyClass;
\`\`\`

### **Namespace in Headers**
\`\`\`cpp
// ❌ Bad: using directive in header
// myheader.h
using namespace std;

class MyClass {
    string name;  // Now all includers get std namespace!
};

// ✅ Good: qualified names in headers
// myheader.h
#include <string>

class MyClass {
    std::string name;
};
\`\`\`

---

## 📚 Real-World Examples

### **Large Project Organization**
\`\`\`cpp
// project structure
namespace CompanyName {
    namespace ProjectName {

        namespace Core {
            class Engine;
            class Scene;
        }

        namespace Graphics {
            class Renderer;
            class Shader;
        }

        namespace Audio {
            class SoundManager;
            class AudioSource;
        }

        namespace Utils {
            namespace Math {
                class Vector3;
                double distance(const Vector3& a, const Vector3& b);
            }

            namespace String {
                std::string toLower(const std::string& str);
                std::vector<std::string> split(const std::string& str, char delimiter);
            }
        }
    }
}
\`\`\`

### **Library API Design**
\`\`\`cpp
// mylibrary.h
namespace MyLibrary {

    namespace v1 {
        class API {
        public:
            void doSomething();
        };
    }

    // Current version (inline)
    inline namespace v2 {
        class API {
        public:
            void doSomethingV2();
        };
    }

    // Backward compatibility
    using v1::API;  // Old API still available
}
\`\`\`

---

## 📚 Summary

**Key Namespace Concepts:**
- **Namespaces** organize code and prevent naming conflicts
- **Qualified access** uses \`::\` operator (e.g., \`std::cout\`)
- **Using declarations** bring specific items into scope
- **Using directives** bring entire namespaces into scope
- **Anonymous namespaces** provide file-local linkage

**Best Practices:**
- Avoid \`using namespace std\` in global scope
- Use qualified names in header files
- Prefer using declarations over using directives
- Organize code hierarchically with nested namespaces
- Use namespace aliases for long names

**Common Patterns:**
- **Qualified access** for standard library
- **Using declarations** for commonly used items
- **Namespace composition** for combining functionality
- **Inline namespaces** for versioning

**Next:** Now that you understand namespaces, let's explore preprocessor directives and macros! ⚙️\``
};