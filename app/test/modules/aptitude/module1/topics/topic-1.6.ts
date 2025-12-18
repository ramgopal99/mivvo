import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_6: SubLesson = {
  id: "1.6",
  title: 'Remainder Theorem & Division Algorithm',
  status: 'completed',
  content: `# 🔢 Remainder Theorem & Division Algorithm

The Remainder Theorem and Division Algorithm are powerful tools in number theory. These concepts help solve complex remainder problems and are essential for competitive exams involving divisibility and modular arithmetic.

---

## 🎯 Division Algorithm

### Definition
When we divide an integer a by a positive integer b, we get:
**a = b × q + r**

Where:
- **a** = dividend
- **b** = divisor (b > 0)
- **q** = quotient
- **r** = remainder

### Important Properties
- **0 ≤ r < b** (remainder is always less than divisor)
- **r = 0** when a is divisible by b
- **q** can be positive, negative, or zero
- **a, b, q, r** are all integers

**Examples**:
- 17 ÷ 5 = 3 × 5 + 2 → q=3, r=2
- 20 ÷ 4 = 5 × 4 + 0 → q=5, r=0
- -17 ÷ 5 = (-4) × 5 + 3 → q=-4, r=3

---

## 📋 Remainder Theorem

### Basic Remainder Theorem
When a number is divided by another number, the remainder is the same as the remainder obtained when the dividend's last few digits are divided.

### Extended Remainder Theorem
**If a ÷ b = q + r/b, then:**
- **a ≡ r (mod b)**
- **a and r give same remainder when divided by b**

**Examples**:
- 17 ÷ 5 = 3 + 2/5 → 17 ≡ 2 (mod 5)
- 25 ÷ 7 = 3 + 4/7 → 25 ≡ 4 (mod 7)

---

## 🎯 Types of Remainder Problems

### Type 1: **Direct Remainder**
Find remainder when a number is divided by another.

**Example**: Find remainder when 12345 is divided by 7.

**Solution**: 12345 ÷ 7
Using long division or calculator: remainder = 4

### Type 2: **Negative Numbers**
Remainder is always positive and less than divisor.

**Example**: What is remainder when -17 is divided by 5?

**Solution**: -17 = -4 × 5 + 3 → remainder = 3

### Type 3: **Large Numbers**
Use modular arithmetic properties.

**Example**: Find remainder when 2^100 is divided by 7.

**Solution**: Find pattern of powers of 2 modulo 7:
2¹ ≡ 2, 2² ≡ 4, 2³ ≡ 1, 2⁴ ≡ 2, 2⁵ ≡ 4, 2⁶ ≡ 1, ...

Since 100 ÷ 3 = 33 × 3 + 1, so 2^100 ≡ 2¹ ≡ 2 (mod 7)

---

## 🧠 Remainder Tricks

### Trick 1: **Same Remainder Property**
If a ≡ b (mod m), then a and b give same remainder when divided by m.

**Example**: 17 ≡ 3 (mod 7) since 17-3=14, 14÷7=2
Both 17÷7 = 2*7 + 3, 3÷7 = 0*7 + 3

### Trick 2: **Division by Large Numbers**
Break into smaller parts.

**Example**: Find 123456 ÷ 17

**Solution**: 123456 = 123400 + 56
123400 ÷ 17 = 7260 × 17, so work with 56
56 ÷ 17 = 3 × 17 + 5 → remainder = 5

### Trick 3: **Euler's Theorem for Large Exponents**
For powers: a^φ(n) ≡ 1 (mod n) if gcd(a,n)=1

### Trick 4: **Chinese Remainder Theorem**
Solve simultaneous congruences.

**Example**: Find x such that:
x ≡ 1 (mod 3)
x ≡ 2 (mod 5)
x ≡ 3 (mod 7)

---

## 📊 Advanced Remainder Concepts

### 1. **Wilson's Theorem**
For prime p: (p-1)! ≡ -1 (mod p)

### 2. **Fermat's Little Theorem**
For prime p, if p doesn't divide a:
a^(p-1) ≡ 1 (mod p)

### 3. **Modular Arithmetic Properties**
- **(a + b) mod m = ((a mod m) + (b mod m)) mod m**
- **(a × b) mod m = ((a mod m) × (b mod m)) mod m**
- **(a - b) mod m = ((a mod m) - (b mod m)) mod m**

---

## 🎯 Common Problem Patterns

### Pattern 1: **Find Remainder of Large Number**
**Example**: Find remainder when 123456789 is divided by 9.

**Solution**: Sum of digits: 1+2+3+4+5+6+7+8+9 = 45, 45÷9=5 → remainder 0

### Pattern 2: **Polynomial Remainder**
**Example**: Find remainder when x³ + 2x² + 3x + 4 is divided by (x+1).

**Solution**: Use Remainder Theorem: f(-1) = (-1)³ + 2(-1)² + 3(-1) + 4 = -1 + 2 - 3 + 4 = 2

### Pattern 3: **Complex Remainders**
**Example**: Find remainder when 2^50 is divided by 13.

**Solution**: Find cycle: 2^1=2, 2^2=4, 2^3=8, 2^4=3, 2^5=6, 2^6=12, 2^7=11, 2^8=9, 2^9=5, 2^10=10, 2^11=7, 2^12=1, 2^13=2...

Cycle length 12. 50 ÷ 12 = 4*12 + 2, so 2^50 ≡ 2^2 ≡ 4 (mod 13)

---

## 🔧 Remainder Theorem Applications

### 1. **Factor Theorem**
If f(a) = 0, then (x-a) is a factor of f(x).

### 2. **Synthetic Division**
Quick polynomial division method.

**Example**: Divide x³ - 6x² + 11x - 6 by (x-2)

Using synthetic division:
\`\`\`
2 | 1  -6  11  -6
  |     2  -8   6
  -------------
    1  -4   3   0
\`\`\`
Quotient: x² - 4x + 3, Remainder: 0

### 3. **Testing Divisibility**
Use remainder theorem for large numbers.

---

## 🎯 Problem Solving Techniques

### Technique 1: **Break and Solve**
Break large numbers into manageable parts.

### Technique 2: **Find Patterns**
Look for cycles in remainders.

### Technique 3: **Use Modular Properties**
Apply modular arithmetic rules.

### Technique 4: **Negative Remainders**
Always convert to positive remainder.

---

## 📝 Practice Examples

### Example 1: Basic Remainder
Find remainder when 37 is divided by 6.

**Solution**: 37 ÷ 6 = 6 × 6 + 1 → remainder = 1

### Example 2: Large Power
Find remainder when 7^25 is divided by 10.

**Solution**: Cycle of 7: 7, 9, 3, 1, 7, 9, 3, 1...
Pattern repeats every 4: 7, 9, 3, 1
25 ÷ 4 = 6 × 4 + 1, so 7^25 ≡ 7¹ ≡ 7 (mod 10)

### Example 3: Negative Number
Find remainder when -23 is divided by 5.

**Solution**: -23 = -5 × 5 + 2 → remainder = 2

### Example 4: Polynomial
Find remainder when x⁴ + 3x³ + 2x² + x + 1 is divided by (x+2).

**Solution**: f(-2) = (-2)⁴ + 3(-2)³ + 2(-2)² + (-2) + 1
= 16 + 3(-8) + 2(4) - 2 + 1
= 16 - 24 + 8 - 2 + 1 = (16+8+1) + (-24-2) = 25 - 26 = -1

Master remainder theorem and division algorithm to solve complex number problems! 🚀`
};
