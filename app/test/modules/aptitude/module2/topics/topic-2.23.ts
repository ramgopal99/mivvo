import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_23: SubLesson = {
  id: "2.23",
  title: 'Base System (Basic Binary)',
  status: 'completed',
  content: "`# ðŸ”¢ Base System (Basic Binary)

Number systems with different bases are fundamental to computer science and mathematics. Binary (base 2) is particularly important for digital systems, while understanding other bases helps in number theory and computer applications.

---

## ðŸŽ¯ What is a Number Base?

### Definition
A number base (or radix) is the number of unique digits used to represent numbers in a positional numeral system.

**Examples**:
- Decimal (base 10): digits 0-9
- Binary (base 2): digits 0-1
- Octal (base 8): digits 0-7
- Hexadecimal (base 16): digits 0-9, A-F

---

## ðŸ“Š Binary System (Base 2)

### Basic Concepts
Binary uses only two digits: 0 and 1.

**Place Values**: Powers of 2 from right to left.

**Example**: Binary 1011 = 1Ã—2Â³ + 0Ã—2Â² + 1Ã—2Â¹ + 1Ã—2â° = 8 + 0 + 2 + 1 = 11 (decimal)

---

## ðŸ§® Converting Binary to Decimal

### Method 1: **Positional Method**
Multiply each digit by 2^(position from right, starting at 0)

**Example**: Convert 1101â‚‚ to decimal
\`"\`\`
1Ã—2Â³ + 1Ã—2Â² + 0Ã—2Â¹ + 1Ã—2â° = 8 + 4 + 0 + 1 = 13â‚â‚€
\`\`\`

### Method 2: **Doubling Method**
Start with 0, double and add each digit.

**Example**: Convert 1011â‚‚ to decimal
\`\`\`
Start: 0
Add 1: 1, double: 2
Add 0: 2, double: 4
Add 1: 5, double: 10
Add 1: 11â‚â‚€
\`\`\`

---

## ðŸŽ¯ Converting Decimal to Binary

### Method 1: **Division by 2**
Keep dividing by 2 and recording remainders.

**Example**: Convert 25â‚â‚€ to binary
\`\`\`
25 Ã· 2 = 12 remainder 1
12 Ã· 2 = 6  remainder 0
6 Ã·  2 = 3  remainder 0
3 Ã·  2 = 1  remainder 1
1 Ã·  2 = 0  remainder 1

Read remainders from bottom up: 11001â‚‚
\`\`\`

### Method 2: **Powers of 2**
Find combination of powers of 2 that sum to the number.

**Example**: 13â‚â‚€ = 8 + 4 + 1 = 2Â³ + 2Â² + 2â° = 1101â‚‚

---

## ðŸ“ˆ Binary Operations

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

**Example**: 101 Ã— 11 = 1111 (5 Ã— 3 = 15)

---

## ðŸ§  Binary Tricks

### Trick 1: **Even/Odd Check**
Last digit 0 = even, 1 = odd.

### Trick 2: **Powers of 2**
Binary representation of 2^n is 1 followed by n zeros.

**Example**: 8â‚â‚€ = 1000â‚‚ (2Â³)

### Trick 3: **Binary to Decimal Shortcuts**
- 2^n = 1 followed by n zeros
- 2^n - 1 = n ones

### Trick 4: **Range of n-bit Numbers**
0 to 2^n - 1

---

## ðŸŽ¯ Other Number Bases

### 1. **Octal (Base 8)**
Digits: 0-7
Used in older computer systems.

**Example**: 17â‚ˆ = 1Ã—8Â¹ + 7Ã—8â° = 15â‚â‚€

### 2. **Hexadecimal (Base 16)**
Digits: 0-9, A-F (A=10, B=11, C=12, D=13, E=14, F=15)

**Example**: 1Fâ‚â‚† = 1Ã—16Â¹ + 15Ã—16â° = 31â‚â‚€

### 3. **Base Conversion General Method**
To convert from base b to decimal: Î£(digit_i Ã— b^(position_from_right))

To convert from decimal to base b: Repeated division by b.

---

## ðŸ“Š Applications in Aptitude

### 1. **Binary Representation**
**Example**: How many bits needed for numbers 0-15?
**Solution**: 4 bits (2â´ = 16 possibilities)

### 2. **Binary Addition**
**Example**: Add 13 + 9 in binary
13â‚â‚€ = 1101â‚‚, 9â‚â‚€ = 1001â‚‚
1101 + 1001 = 10110â‚‚ = 22â‚â‚€

### 3. **Binary Patterns**
**Example**: Find the binary representation of 2^n - 1
**Solution**: n ones

### 4. **Computer Science Problems**
**Example**: How many different 3-bit binary numbers?
**Solution**: 8 (2Â³)

---

## ðŸ” Binary Properties

### 1. **Bit Patterns**
- Even numbers: end with 0
- Odd numbers: end with 1
- Powers of 2: one 1 followed by zeros
- Powers of 2 minus 1: all 1s

### 2. **Binary Operations**
- AND: 1&1=1, others=0
- OR: 0|0=0, others=1
- XOR: 1âŠ•1=0, 0âŠ•0=0, 1âŠ•0=1, 0âŠ•1=1

### 3. **Gray Code**
Binary code where consecutive numbers differ by one bit.

### 4. **Binary Search**
Algorithm based on binary representation.

---

## ðŸ§® Binary Conversion Table

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

## ðŸŽ¯ Advanced Binary Concepts

### 1. **Two's Complement**
Method for representing negative numbers in binary.

### 2. **Binary Fractions**
Binary numbers with fractional parts.

### 3. **Binary Coded Decimal (BCD)**
Each decimal digit represented by 4 binary digits.

### 4. **Error Detection**
Parity bits for error checking.

---

## ðŸ“ Practice Examples

### Example 1: Binary to Decimal
Convert 10110â‚‚ to decimal

**Solution**: 1Ã—2â´ + 0Ã—2Â³ + 1Ã—2Â² + 1Ã—2Â¹ + 0Ã—2â° = 16 + 4 + 2 = 22â‚â‚€

### Example 2: Decimal to Binary
Convert 29â‚â‚€ to binary

**Solution**: 29Ã·2=14 r1, 14Ã·2=7 r0, 7Ã·2=3 r1, 3Ã·2=1 r1, 1Ã·2=0 r1
Reading up: 11101â‚‚

### Example 3: Binary Addition
Add 1101â‚‚ + 1011â‚‚

**Solution**: 1101 + 1011 = 11000â‚‚ = 24â‚â‚€

### Example 4: Binary Properties
What is the binary representation of 15?

**Solution**: 1111â‚‚ (four 1s)

### Example 5: Bit Counting
How many 1s in binary representation of 23â‚â‚€?

**Solution**: 23â‚â‚€ = 10111â‚‚, three 1s

### Example 6: Range Problems
What is the range of 5-bit signed binary numbers?

**Solution**: -16 to +15

### Example 7: Base Conversion
Convert 25â‚â‚€ to octal (base 8)

**Solution**: 25Ã·8=3 r1, 3Ã·8=0 r3, so 31â‚ˆ

### Example 8: Hexadecimal
Convert A3â‚â‚† to decimal

**Solution**: 10Ã—16Â¹ + 3Ã—16â° = 160 + 3 = 163â‚â‚€

Master binary and number base systems for computer science and number theory problems! ðŸš€`
};


