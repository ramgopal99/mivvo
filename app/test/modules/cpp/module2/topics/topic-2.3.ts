import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Operators & Expressions',
  status: 'completed',
  content: `\`# ⚡ Operators & Expressions

Operators are symbols that perform operations on variables and values. Expressions combine operators and operands to produce results. Mastering operators is essential for writing effective C++ code.

---

## 🔢 Arithmetic Operators

### **Basic Arithmetic**
\`\`\`cpp
int a = 10, b = 3;

int sum = a + b;        // 13 (Addition)
int diff = a - b;       // 7  (Subtraction)
int product = a * b;    // 30 (Multiplication)
int quotient = a / b;   // 3  (Division - integer division)
int remainder = a % b;  // 1  (Modulo - remainder)
\`\`\`

### **Floating-Point Division**
\`\`\`cpp
double x = 10.0, y = 3.0;

double result = x / y;  // 3.333... (Floating-point division)
\`\`\`

### **Unary Operators**
\`\`\`cpp
int x = 5;

int positive = +x;      // +5 (Unary plus)
int negative = -x;      // -5 (Unary minus)
\`\`\`

---

## 🔄 Assignment Operators

### **Basic Assignment**
\`\`\`cpp
int x = 10;  // Assign 10 to x
x = 20;      // Reassign 20 to x
\`\`\`

### **Compound Assignment**
\`\`\`cpp
int x = 10;

x += 5;   // x = x + 5;  (15)
x -= 3;   // x = x - 3;  (12)
x *= 2;   // x = x * 2;  (24)
x /= 4;   // x = x / 4;  (6)
x %= 5;   // x = x % 5;  (1)
\`\`\`

---

## 🔍 Comparison Operators

### **Relational Operators**
Return \`bool\` (true/false):
\`\`\`cpp
int a = 10, b = 5;

bool equal = (a == b);       // false (Equal to)
bool notEqual = (a != b);    // true  (Not equal to)
bool greater = (a > b);      // true  (Greater than)
bool less = (a < b);         // false (Less than)
bool greaterEqual = (a >= b); // true  (Greater than or equal)
bool lessEqual = (a <= b);   // false (Less than or equal)
\`\`\`

### **String Comparison**
\`\`\`cpp
std::string s1 = "apple";
std::string s2 = "banana";

bool result = (s1 < s2);  // true (Lexicographical comparison)
\`\`\`

---

## 🔗 Logical Operators

### **Basic Logical Operators**
\`\`\`cpp
bool p = true, q = false;

bool andResult = p && q;    // false (AND)
bool orResult = p || q;     // true  (OR)
bool notResult = !p;        // false (NOT)
\`\`\`

### **Truth Table**
| P | Q | P && Q | P \\|\\| Q | !P |
|---|---|--------|----------|----|
| T | T | T      | T        | F  |
| T | F | F      | T        | F  |
| F | T | F      | T        | T  |
| F | F | F      | F        | T  |

### **Short-Circuit Evaluation**
\`\`\`cpp
// && short-circuits: if first operand is false, second isn't evaluated
bool result1 = (false && someFunction());  // someFunction() not called

// || short-circuits: if first operand is true, second isn't evaluated
bool result2 = (true || someFunction());   // someFunction() not called
\`\`\`

---

## 🔢 Increment/Decrement Operators

### **Postfix vs Prefix**
\`\`\`cpp
int x = 5;

// Postfix: use value first, then increment
int y = x++;  // y = 5, x = 6

// Prefix: increment first, then use value
int z = ++x;  // z = 7, x = 7
\`\`\`

### **Decrement Operators**
\`\`\`cpp
int x = 5;

// Postfix decrement
int y = x--;  // y = 5, x = 4

// Prefix decrement
int z = --x;  // z = 3, x = 3
\`\`\`

---

## ❓ Conditional (Ternary) Operator

### **Syntax**
\`\`\`cpp
// condition ? value_if_true : value_if_false
int max = (a > b) ? a : b;
std::string result = (score >= 60) ? "Pass" : "Fail";
\`\`\`

### **Nested Ternary**
\`\`\`cpp
// Be careful with nesting - can be hard to read
char grade = (score >= 90) ? 'A' :
             (score >= 80) ? 'B' :
             (score >= 70) ? 'C' : 'F';
\`\`\`

---

## 🔗 Bitwise Operators

### **Bitwise Operations**
Work on individual bits:
\`\`\`cpp
int a = 5;   // 0101 in binary
int b = 3;   // 0011 in binary

int and_result = a & b;   // 0001 (1) - Bitwise AND
int or_result = a | b;    // 0111 (7) - Bitwise OR
int xor_result = a ^ b;   // 0110 (6) - Bitwise XOR
int not_result = ~a;      // ... - Bitwise NOT
\`\`\`

### **Shift Operators**
\`\`\`cpp
int x = 8;   // 1000 in binary

int left_shift = x << 2;   // 32 (100000) - Shift left
int right_shift = x >> 1;  // 4  (0100)   - Shift right
\`\`\`

### **Common Uses**
- **Flags and masks**
- **Efficient multiplication/division by powers of 2**
- **Bit manipulation**
- **Embedded systems programming**

---

## 📏 Sizeof Operator

### **Get Size Information**
\`\`\`cpp
int x = 42;
std::cout << sizeof(int) << std::endl;     // Size of type
std::cout << sizeof(x) << std::endl;       // Size of variable
std::cout << sizeof(x + 1) << std::endl;   // Size of expression
\`\`\`

---

## 🏗️ Operator Precedence

### **Precedence Table** (Highest to Lowest)
| Precedence | Operator | Description | Associativity |
|------------|----------|-------------|---------------|
| 1 | \`::\` | Scope resolution | Left to right |
| 2 | \`++\` \`--\` | Postfix increment/decrement | Left to right |
| 2 | \`()\` \`[]\` \`->\` \`.\` | Function call, subscript, member access | Left to right |
| 3 | \`++\` \`--\` | Prefix increment/decrement | Right to left |
| 3 | \`+\` \`-\` | Unary plus/minus | Right to left |
| 3 | \`!\` \`~\` | Logical NOT, bitwise NOT | Right to left |
| 4 | \`*\` \`/\` \`%\` | Multiplication, division, modulo | Left to right |
| 5 | \`+\` \`-\` | Addition, subtraction | Left to right |
| 6 | \`<<\` \`>>\` | Bitwise shift | Left to right |
| 7 | \`<\` \`>\` \`>=\` \`<\` | Relational operators | Left to right |
| 8 | \`==\` \`!=\` | Equality operators | Left to right |
| 9 | \`&\` | Bitwise AND | Left to right |
| 10 | \`^\` | Bitwise XOR | Left to right |
| 11 | \`\\|\` | Bitwise OR | Left to right |
| 12 | \`&&\` | Logical AND | Left to right |
| 13 | \`\\|\\|\` | Logical OR | Left to right |
| 14 | \`?:\` | Conditional (ternary) | Right to left |
| 15 | \`=\` \`+=\` \`-=\` etc. | Assignment operators | Right to left |
| 16 | \`,\` | Comma | Left to right |

### **Using Parentheses**
\`\`\`cpp
// Without parentheses
int result = 2 + 3 * 4;  // 14 (multiplication first)

// With parentheses
int result = (2 + 3) * 4;  // 20 (addition first)
\`\`\`

---

## 🎭 Type Conversion in Expressions

### **Implicit Conversion**
\`\`\`cpp
int a = 5;
double b = 2.5;
double result = a + b;  // int → double automatically
\`\`\`

### **Explicit Conversion (Casting)**
\`\`\`cpp
double pi = 3.14159;
int approx = static_cast<int>(pi);  // 3

// Old C-style casting (avoid)
int old_way = (int)pi;
\`\`\`

---

## 🔄 Expressions

### **What is an Expression?**
An expression is a combination of operators, operands, and function calls that evaluates to a value.

### **Types of Expressions**

#### **Arithmetic Expressions**
\`\`\`cpp
int result = (a + b) * (c - d) / 2;
\`\`\`

#### **Logical Expressions**
\`\`\`cpp
bool isValid = (age >= 18) && (age <= 65);
\`\`\`

#### **Assignment Expressions**
\`\`\`cpp
int x = (y = 10) + 5;  // y becomes 10, x becomes 15
\`\`\`

#### **Function Call Expressions**
\`\`\`cpp
int sum = add(5, 10);
std::string message = "Result: " + std::to_string(sum);
\`\`\`

---

## 🚨 Common Mistakes

### **Assignment vs Comparison**
\`\`\`cpp
// ❌ Wrong: assignment in condition
if (x = 5) {  // Always true, assigns 5 to x
    // This code always runs
}

// ✅ Correct: comparison
if (x == 5) {
    // Only runs if x equals 5
}
\`\`\`

### **Integer Division**
\`\`\`cpp
// ❌ Unexpected result
double average = (3 + 4) / 2;  // 3 (integer division!)

// ✅ Correct
double average = (3 + 4) / 2.0;  // 3.5
double average = static_cast<double>(3 + 4) / 2;  // 3.5
\`\`\`

### **Operator Precedence Confusion**
\`\`\`cpp
// ❌ Wrong precedence
int result = a & b == c;  // Interpreted as: a & (b == c)

// ✅ Clear intent
int result = (a & b) == c;
\`\`\`

### **Overflow**
\`\`\`cpp
// ❌ Integer overflow
int max_int = 2147483647;
int overflow = max_int + 1;  // Undefined behavior!

// ✅ Check for overflow (advanced topic)
\`\`\`

---

## 🎯 Best Practices

### **Use Parentheses for Clarity**
\`\`\`cpp
// ✅ Clear precedence
int result = (a + b) * (c + d);

// ❌ Unclear without parentheses
int result = a + b * c + d;
\`\`\`

### **Avoid Complex Expressions**
\`\`\`cpp
// ❌ Too complex
int result = (a + b) * c - d / e + f;

// ✅ Break it down
int sum = a + b;
int division = d / e;
int result = sum * c - division + f;
\`\`\`

### **Use Meaningful Variable Names**
\`\`\`cpp
// ✅ Self-documenting
double circleArea = PI * radius * radius;
bool isValidAge = (age >= 18) && (age <= 120);

// ❌ Cryptic
double ca = p * r * r;
bool va = (a >= 18) && (a <= 120);
\`\`\`

### **Be Careful with Side Effects**
\`\`\`cpp
// ❌ Side effect in condition
if (++counter > 10) {
    // counter is modified
}

// ✅ Separate side effect
counter++;
if (counter > 10) {
    // clearer intent
}
\`\`\`

---

## 🎪 Advanced Examples

### **Bit Manipulation**
\`\`\`cpp
// Check if number is even
bool isEven = (x & 1) == 0;

// Set a bit
int setBit = x | (1 << position);

// Clear a bit
int clearBit = x & ~(1 << position);

// Toggle a bit
int toggleBit = x ^ (1 << position);
\`\`\`

### **Conditional Logic**
\`\`\`cpp
// Clamp value between min and max
int clamped = (value < min) ? min : (value > max) ? max : value;

// Sign function
int sign = (x > 0) ? 1 : (x < 0) ? -1 : 0;
\`\`\`

### **Bit Flags**
\`\`\`cpp
enum Flags {
    FLAG_A = 1 << 0,  // 0001
    FLAG_B = 1 << 1,  // 0010
    FLAG_C = 1 << 2,  // 0100
};

int flags = FLAG_A | FLAG_C;  // 0101

// Check if flag is set
bool hasFlagA = (flags & FLAG_A) != 0;

// Add a flag
flags |= FLAG_B;

// Remove a flag
flags &= ~FLAG_C;
\`\`\`

---

## 📚 Summary

**Operator Categories:**
- **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`
- **Assignment**: \`=\`, \`+=\`, \`-=\`, etc.
- **Comparison**: \`==\`, \`!=\`, \`<\`, \`>\`, etc.
- **Logical**: \`&&\`, \`\\|\\|\`, \`!\`
- **Bitwise**: \`&\`, \`\\|\`, \`^\`, \`~\`, \`<<\`, \`>>\`
- **Increment/Decrement**: \`++\`, \`--\`
- **Conditional**: \`?:\`

**Key Concepts:**
- **Precedence** determines evaluation order
- **Associativity** handles same-precedence operators
- **Short-circuit evaluation** in logical operators
- **Type conversion** happens automatically or explicitly

**Best Practices:**
- Use parentheses for complex expressions
- Avoid assignment in conditions
- Be careful with integer division
- Use meaningful names
- Break complex expressions into simpler parts

**Next:** Now that you understand operators and expressions, let's explore input and output operations! 📥📤\``
};