import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: "2.4",
  title: 'Input & Output Operations',
  status: 'completed',
  content: `\`# 📥📤 Input & Output Operations

Input and output (I/O) operations allow your program to communicate with users and files. C++ provides powerful I/O capabilities through the standard library, primarily using \`cin\` for input and \`cout\` for output.

---

## 📋 The I/O Stream Library

### **Standard I/O Objects**
\`\`\`cpp
#include <iostream>

std::cin  // Standard input (keyboard)
std::cout // Standard output (console)
std::cerr // Standard error (console, unbuffered)
std::clog // Standard log (console, buffered)
\`\`\`

### **Basic Output with cout**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Welcome to C++" << std::endl;
    return 0;
}
\`\`\`

---

## 📤 Output Operations

### **The Insertion Operator (<<)**
\`\`\`cpp
int age = 25;
double height = 5.9;
std::string name = "Alice";

std::cout << "Name: " << name << std::endl;
std::cout << "Age: " << age << " years" << std::endl;
std::cout << "Height: " << height << " feet" << std::endl;
\`\`\`

### **Output Formatting**

#### **Newlines**
\`\`\`cpp
// Method 1: std::endl
std::cout << "Line 1" << std::endl;

// Method 2: \\n character
std::cout << "Line 2\\n";

// Method 3: std::endl with flush
std::cout << "Line 3" << std::endl;  // Also flushes buffer
\`\`\`

#### **Tabs and Spacing**
\`\`\`cpp
std::cout << "Name\\tAge\\tCity" << std::endl;
std::cout << "Alice\\t25\\tNYC" << std::endl;
std::cout << "Bob\\t30\\tLA" << std::endl;
\`\`\`

### **Output Manipulators**
\`\`\`cpp
#include <iostream>
#include <iomanip>

int main() {
    double price = 19.99;
    int quantity = 3;

    // Set precision
    std::cout << std::fixed << std::setprecision(2);
    std::cout << "Price: $" << price << std::endl;

    // Set field width
    std::cout << std::setw(10) << "Item"
              << std::setw(10) << "Qty"
              << std::setw(10) << "Price" << std::endl;

    std::cout << std::setw(10) << "Apple"
              << std::setw(10) << quantity
              << std::setw(10) << price << std::endl;

    return 0;
}
\`\`\`

---

## 📥 Input Operations

### **The Extraction Operator (>>)**

#### **Basic Input**
\`\`\`cpp
#include <iostream>

int main() {
    int age;
    std::string name;

    std::cout << "Enter your name: ";
    std::cin >> name;

    std::cout << "Enter your age: ";
    std::cin >> age;

    std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;

    return 0;
}
\`\`\`

#### **Multiple Values**
\`\`\`cpp
int x, y, z;
std::cout << "Enter three numbers: ";
std::cin >> x >> y >> z;
std::cout << "Sum: " << (x + y + z) << std::endl;
\`\`\`

### **Input Issues**

#### **Whitespace Handling**
\`\`\`cpp
// cin stops at whitespace
std::string firstName, lastName;
std::cout << "Enter first and last name: ";
std::cin >> firstName >> lastName;  // "John Doe" → firstName="John", lastName="Doe"
\`\`\`

#### **Reading Full Lines**
\`\`\`cpp
#include <iostream>
#include <string>

int main() {
    std::string fullName;

    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);  // Reads entire line including spaces

    std::cout << "Hello, " << fullName << "!" << std::endl;

    return 0;
}
\`\`\`

#### **Mixing cin and getline**
\`\`\`cpp
// ❌ Problem: leftover newline causes issues
int age;
std::string name;

std::cout << "Enter age: ";
std::cin >> age;

std::cout << "Enter name: ";
std::getline(std::cin, name);  // Gets empty string!

// ✅ Solution: ignore the leftover newline
std::cin.ignore();  // Ignore one character
std::getline(std::cin, name);

// Or use this approach:
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
\`\`\`

---

## 🔧 Advanced I/O Features

### **String Streams**
\`\`\`cpp
#include <iostream>
#include <sstream>
#include <string>

int main() {
    // Output to string
    std::ostringstream oss;
    oss << "Value: " << 42 << " Text: " << "Hello";
    std::string result = oss.str();
    std::cout << result << std::endl;

    // Input from string
    std::istringstream iss("123 456 789");
    int a, b, c;
    iss >> a >> b >> c;
    std::cout << "Numbers: " << a << ", " << b << ", " << c << std::endl;

    return 0;
}
\`\`\`

### **File I/O Basics**
\`\`\`cpp
#include <iostream>
#include <fstream>

int main() {
    // Writing to file
    std::ofstream outputFile("output.txt");
    if (outputFile.is_open()) {
        outputFile << "Hello, File!" << std::endl;
        outputFile << "This is line 2" << std::endl;
        outputFile.close();
    }

    // Reading from file
    std::ifstream inputFile("output.txt");
    if (inputFile.is_open()) {
        std::string line;
        while (std::getline(inputFile, line)) {
            std::cout << line << std::endl;
        }
        inputFile.close();
    }

    return 0;
}
\`\`\`

---

## 🎯 Error Handling in I/O

### **Checking Stream State**
\`\`\`cpp
#include <iostream>

int main() {
    int number;

    std::cout << "Enter a number: ";
    if (std::cin >> number) {
        std::cout << "You entered: " << number << std::endl;
    } else {
        std::cout << "Invalid input!" << std::endl;
        std::cin.clear();  // Clear error flags
        std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');  // Ignore bad input
    }

    return 0;
}
\`\`\`

### **Stream States**
\`\`\`cpp
// Check various states
if (std::cin.good()) { /* Stream is good */ }
if (std::cin.eof()) { /* End of file reached */ }
if (std::cin.fail()) { /* Operation failed */ }
if (std::cin.bad()) { /* Serious error occurred */ }

// Clear and continue
std::cin.clear();
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
\`\`\`

---

## 🎨 Formatting Output

### **I/O Manipulators**
\`\`\`cpp
#include <iostream>
#include <iomanip>

int main() {
    double pi = 3.14159265359;
    int number = 42;

    // Fixed and scientific notation
    std::cout << std::fixed << pi << std::endl;      // 3.141593
    std::cout << std::scientific << pi << std::endl; // 3.141593e+00

    // Set precision
    std::cout << std::setprecision(2) << pi << std::endl;  // 3.14

    // Field width and alignment
    std::cout << std::setw(10) << std::left << "Left" << "aligned" << std::endl;
    std::cout << std::setw(10) << std::right << "Right" << "aligned" << std::endl;

    // Show base for numbers
    std::cout << std::showbase;
    std::cout << std::hex << number << std::endl;    // 0x2a
    std::cout << std::oct << number << std::endl;    // 052
    std::cout << std::dec << number << std::endl;    // 42

    // Boolean as true/false instead of 1/0
    bool flag = true;
    std::cout << std::boolalpha << flag << std::endl;  // true

    return 0;
}
\`\`\`

---

## 📝 Common Patterns

### **Menu-Driven Programs**
\`\`\`cpp
#include <iostream>

int main() {
    int choice;

    do {
        std::cout << "\\n=== Menu ===" << std::endl;
        std::cout << "1. Add numbers" << std::endl;
        std::cout << "2. Subtract numbers" << std::endl;
        std::cout << "3. Exit" << std::endl;
        std::cout << "Enter choice: ";

        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
            std::cout << "Invalid input! Please enter a number." << std::endl;
            continue;
        }

        switch (choice) {
            case 1: {
                double a, b;
                std::cout << "Enter two numbers: ";
                std::cin >> a >> b;
                std::cout << "Sum: " << (a + b) << std::endl;
                break;
            }
            case 2: {
                double a, b;
                std::cout << "Enter two numbers: ";
                std::cin >> a >> b;
                std::cout << "Difference: " << (a - b) << std::endl;
                break;
            }
            case 3:
                std::cout << "Goodbye!" << std::endl;
                break;
            default:
                std::cout << "Invalid choice!" << std::endl;
        }
    } while (choice != 3);

    return 0;
}
\`\`\`

### **Data Validation**
\`\`\`cpp
#include <iostream>
#include <limits>

double getValidDouble(const std::string& prompt) {
    double value;
    while (true) {
        std::cout << prompt;
        if (std::cin >> value) {
            // Check if there's extra input
            char extra;
            if (std::cin.get(extra) && extra != '\\n') {
                std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
                std::cout << "Invalid input! Please enter a number." << std::endl;
            } else {
                return value;
            }
        } else {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
            std::cout << "Invalid input! Please enter a number." << std::endl;
        }
    }
}

int main() {
    double price = getValidDouble("Enter price: ");
    std::cout << "Price entered: $" << price << std::endl;
    return 0;
}
\`\`\`

---

## 🚨 Common I/O Mistakes

### **Forgetting to Include Headers**
\`\`\`cpp
// ❌ Missing include
int main() {
    cout << "Hello";  // Error: cout not declared
    return 0;
}

// ✅ Correct
#include <iostream>
int main() {
    std::cout << "Hello";  // Works
    return 0;
}
\`\`\`

### **Buffer Issues**
\`\`\`cpp
// ❌ Output not appearing immediately
std::cout << "Processing...";

// ✅ Force output with endl or flush
std::cout << "Processing..." << std::endl;
std::cout << "Processing..." << std::flush;
\`\`\`

### **Input Buffer Problems**
\`\`\`cpp
// ❌ Leftover newline causes issues
int age;
std::string name;

std::cin >> age;
std::getline(std::cin, name);  // Gets empty line!

// ✅ Clear the input buffer
std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
std::getline(std::cin, name);
\`\`\`

### **Mixed Input Types**
\`\`\`cpp
// ❌ Reading wrong type
int x;
std::string text = "not_a_number";

std::istringstream iss(text);
iss >> x;  // fail() will be true

// ✅ Check success
if (iss >> x) {
    std::cout << "Converted: " << x << std::endl;
} else {
    std::cout << "Conversion failed!" << std::endl;
}
\`\`\`

---

## 🎯 Best Practices

### **Error Handling**
\`\`\`cpp
// Always check I/O operations
if (!(std::cin >> value)) {
    std::cerr << "Input error!" << std::endl;
    std::cin.clear();
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
}
\`\`\`

### **User-Friendly Prompts**
\`\`\`cpp
// ✅ Clear prompts
std::cout << "Enter your age (18-120): ";
int age;
while (!(std::cin >> age) || age < 18 || age > 120) {
    std::cout << "Invalid age. Please enter a number between 18 and 120: ";
    std::cin.clear();
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
}
\`\`\`

### **Consistent Formatting**
\`\`\`cpp
// Use manipulators for consistent output
std::cout << std::fixed << std::setprecision(2);
std::cout << std::setw(15) << std::left << "Item"
          << std::setw(10) << std::right << "Price" << std::endl;
\`\`\`

### **Resource Management**
\`\`\`cpp
// Always close files
std::ofstream file("data.txt");
// ... use file ...
file.close();  // Explicit close

// Or use RAII (Resource Acquisition Is Initialization)
{
    std::ofstream file("data.txt");
    // File automatically closed when scope ends
}
\`\`\`

---

## 📚 Advanced I/O Topics

### **Custom Stream Buffers**
\`\`\`cpp
#include <iostream>
#include <streambuf>

class NullBuffer : public std::streambuf {
protected:
    virtual int overflow(int c) { return c; }
};

class NullStream : public std::ostream {
public:
    NullStream() : std::ostream(&m_sb) {}
private:
    NullBuffer m_sb;
};

// Usage: silent output
NullStream nullStream;
nullStream << "This goes nowhere" << std::endl;
\`\`\`

### **Binary I/O**
\`\`\`cpp
#include <iostream>
#include <fstream>

struct Data {
    int id;
    double value;
    char name[20];
};

int main() {
    Data d = {42, 3.14, "Test Data"};

    // Write binary
    std::ofstream file("data.bin", std::ios::binary);
    file.write(reinterpret_cast<char*>(&d), sizeof(Data));
    file.close();

    // Read binary
    Data readData;
    std::ifstream inFile("data.bin", std::ios::binary);
    inFile.read(reinterpret_cast<char*>(&readData), sizeof(Data));

    std::cout << "ID: " << readData.id << std::endl;
    std::cout << "Value: " << readData.value << std::endl;
    std::cout << "Name: " << readData.name << std::endl;

    return 0;
}
\`\`\`

---

## 📚 Summary

**Key I/O Concepts:**
- **\`std::cout\`** for output with \`<<\` operator
- **\`std::cin\`** for input with \`>>\` operator
- **\`std::getline()\`** for reading entire lines
- **Stream states** for error checking
- **Manipulators** for formatting output
- **String streams** for string I/O operations

**Best Practices:**
- Always check I/O operation success
- Handle input validation properly
- Clear input buffer when mixing \`cin\` and \`getline\`
- Use meaningful prompts
- Close files explicitly or use RAII

**Common Issues to Avoid:**
- Buffer problems with mixed input methods
- Forgetting error checking
- Not handling invalid input gracefully
- Missing header includes

**Next:** Now that you understand I/O operations, let's explore control flow statements to make your programs more dynamic! 🔀\``
};