import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_23: SubLesson = {
  id: "1.23",
  title: 'Base System (Basic Binary)',
  status: 'completed',
  content: `# 🔢 Base System (Basic Binary)

Number systems with different bases are fundamental to computer science and mathematics. Binary (base 2) is particularly important for digital systems, while understanding other bases helps in number theory and computer applications.

---

## 🎯 What is a Number Base?

### Definition
A number base (or radix) is the number of unique digits used to represent numbers in a positional numeral system.

**Examples**:
- Decimal (base 10): digits 0-9
- Binary (base 2): digits 0-1
- Octal (base 8): digits 0-7
- Hexadecimal (base 16): digits 0-9, A-F

---

## 📊 Binary System (Base 2)

### Basic Concepts
Binary uses only two digits: 0 and 1.

**Place Values**: Powers of 2 from right to left.

**Example**: Binary 1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11 (decimal)

---

## 🧮 Converting Binary to Decimal

### Method 1: **Positional Method**
Multiply each digit by 2^(position from right, starting at 0)

**Example**: Convert 1101₂ to decimal
\`\`\`
1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13₁₀
\`\`\`

### Method 2: **Doubling Method**
Start with 0, double and add each digit.

**Example**: Convert 1011₂ to decimal
\`\`\`
Start: 0
Add 1: 1, double: 2
Add 0: 2, double: 4
Add 1: 5, double: 10
Add 1: 11₁₀
\`\`\`

---

## 🎯 Converting Decimal to Binary

### Method 1: **Division by 2**
Keep dividing by 2 and recording remainders.

**Example**: Convert 25₁₀ to binary
\`\`\`
25 ÷ 2 = 12 remainder 1
12 ÷ 2 = 6  remainder 0
6 ÷  2 = 3  remainder 0
3 ÷  2 = 1  remainder 1
1 ÷  2 = 0  remainder 1

Read remainders from bottom up: 11001₂
\`\`\`

### Method 2: **Powers of 2**
Find combination of powers of 2 that sum to the number.

**Example**: 13₁₀ = 8 + 4 + 1 = 2³ + 2² + 2⁰ = 1101₂

---

## 📈 Binary Operations

### 1. **Addition**
\`\`\`
  1011  (11)
+  110  (6)
--------
 10001  (17)
\`\`\`

### 2. **Subtraction**
Using borrowing, similar to decimal.

### 3. **Multiplication**
Similar to decimal multiplication.

**Example**: 101 × 11 = 1111 (5 × 3 = 15)

---

## 🧠 Binary Tricks

### Trick 1: **Even/Odd Check**
Last digit 0 = even, 1 = odd.

### Trick 2: **Powers of 2**
Binary representation of 2^n is 1 followed by n zeros.

**Example**: 8₁₀ = 1000₂ (2³)

### Trick 3: **Binary to Decimal Shortcuts**
- 2^n = 1 followed by n zeros
- 2^n - 1 = n ones

### Trick 4: **Range of n-bit Numbers**
0 to 2^n - 1

---

## 🎯 Other Number Bases

### 1. **Octal (Base 8)**
Digits: 0-7
Used in older computer systems.

**Example**: 17₈ = 1×8¹ + 7×8⁰ = 15₁₀

### 2. **Hexadecimal (Base 16)**
Digits: 0-9, A-F (A=10, B=11, C=12, D=13, E=14, F=15)

**Example**: 1F₁₆ = 1×16¹ + 15×16⁰ = 31₁₀

### 3. **Base Conversion General Method**
To convert from base b to decimal: Σ(digit_i × b^(position_from_right))

To convert from decimal to base b: Repeated division by b.

---

## 📊 Applications in Aptitude

### 1. **Binary Representation**
**Example**: How many bits needed for numbers 0-15?
**Solution**: 4 bits (2⁴ = 16 possibilities)

### 2. **Binary Addition**
**Example**: Add 13 + 9 in binary
13₁₀ = 1101₂, 9₁₀ = 1001₂
1101 + 1001 = 10110₂ = 22₁₀

### 3. **Binary Patterns**
**Example**: Find the binary representation of 2^n - 1
**Solution**: n ones

### 4. **Computer Science Problems**
**Example**: How many different 3-bit binary numbers?
**Solution**: 8 (2³)

---

## 🔍 Binary Properties

### 1. **Bit Patterns**
- Even numbers: end with 0
- Odd numbers: end with 1
- Powers of 2: one 1 followed by zeros
- Powers of 2 minus 1: all 1s

### 2. **Binary Operations**
- AND: 1&1=1, others=0
- OR: 0|0=0, others=1
- XOR: 1⊕1=0, 0⊕0=0, 1⊕0=1, 0⊕1=1

### 3. **Gray Code**
Binary code where consecutive numbers differ by one bit.

### 4. **Binary Search**
Algorithm based on binary representation.

---

## 🧮 Binary Conversion Table

| Decimal | Binary | Decimal | Binary |
|---------|--------|---------|--------|
| 0       | 0000   | 8       | 1000   |
| 1       | 0001   | 9       | 1001   |
| 2       | 0010   | 10      | 1010   |
| 3       | 0011   | 11      | 1011   |
| 4       | 0100   | 12      | 1100   |
| 5       | 0101   | 13      | 1101   |
| 6       | 0110   | 14      | 1110   |
| 7       | 0111   | 15      | 1111   |

---

## 🎯 Advanced Binary Concepts

### 1. **Two's Complement**
Method for representing negative numbers in binary.

### 2. **Binary Fractions**
Binary numbers with fractional parts.

### 3. **Binary Coded Decimal (BCD)**
Each decimal digit represented by 4 binary digits.

### 4. **Error Detection**
Parity bits for error checking.

---

## 📝 Practice Examples

### Example 1: Binary to Decimal
Convert 10110₂ to decimal

**Solution**: 1×2⁴ + 0×2³ + 1×2² + 1×2¹ + 0×2⁰ = 16 + 4 + 2 = 22₁₀

### Example 2: Decimal to Binary
Convert 29₁₀ to binary

**Solution**: 29÷2=14 r1, 14÷2=7 r0, 7÷2=3 r1, 3÷2=1 r1, 1÷2=0 r1
Reading up: 11101₂

### Example 3: Binary Addition
Add 1101₂ + 1011₂

**Solution**: 1101 + 1011 = 11000₂ = 24₁₀

### Example 4: Binary Properties
What is the binary representation of 15?

**Solution**: 1111₂ (four 1s)

### Example 5: Bit Counting
How many 1s in binary representation of 23₁₀?

**Solution**: 23₁₀ = 10111₂, three 1s

### Example 6: Range Problems
What is the range of 5-bit signed binary numbers?

**Solution**: -16 to +15

### Example 7: Base Conversion
Convert 25₁₀ to octal (base 8)

**Solution**: 25÷8=3 r1, 3÷8=0 r3, so 31₈

### Example 8: Hexadecimal
Convert A3₁₆ to decimal

**Solution**: 10×16¹ + 3×16⁰ = 160 + 3 = 163₁₀

Master binary and number base systems for computer science and number theory problems! 🚀`
};
