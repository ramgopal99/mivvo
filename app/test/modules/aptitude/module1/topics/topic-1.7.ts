import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_7: SubLesson = {
  id: "1.7",
  title: 'Unit Digit, Last Digits & Cyclicity',
  status: 'completed',
  content: `# 🔢 Unit Digit, Last Digits & Cyclicity

Understanding digit patterns and cyclicity is crucial for solving power problems, large number calculations, and competitive exam questions. These concepts help predict the behavior of numbers when raised to powers or when dealing with repetitive patterns.

---

## 🎯 Unit Digit (Last Digit)

### Definition
The unit digit is the rightmost digit of a number, which determines the number modulo 10.

### Powers of Numbers and Their Unit Digits

#### 1. **Powers of 2**
Pattern: 2, 4, 8, 6, 2, 4, 8, 6...
**Cycle**: 4 digits

\`\`\`
2¹ = 2  → 2
2² = 4  → 4
2³ = 8  → 8
2⁴ = 16 → 6
2⁵ = 32 → 2
2⁶ = 64 → 4
...\`\`\`

#### 2. **Powers of 3**
Pattern: 3, 9, 7, 1, 3, 9, 7, 1...
**Cycle**: 4 digits

\`\`\`
3¹ = 3  → 3
3² = 9  → 9
3³ = 27 → 7
3⁴ = 81 → 1
3⁵ = 243 → 3
...\`\`\`

#### 3. **Powers of 4**
Pattern: 4, 6, 4, 6, 4, 6...
**Cycle**: 2 digits

\`\`\`
4¹ = 4  → 4
4² = 16 → 6
4³ = 64 → 4
4⁴ = 256 → 6
...\`\`\`

#### 4. **Powers of 5**
Always ends with 5.
**Cycle**: 1 digit

#### 5. **Powers of 6**
Pattern: 6, 6, 6, 6... (always 6)
**Cycle**: 1 digit

#### 6. **Powers of 7**
Pattern: 7, 9, 3, 1, 7, 9, 3, 1...
**Cycle**: 4 digits

#### 7. **Powers of 8**
Pattern: 8, 4, 2, 6, 8, 4, 2, 6...
**Cycle**: 4 digits

#### 8. **Powers of 9**
Pattern: 9, 1, 9, 1, 9, 1... (alternates)
**Cycle**: 2 digits

#### 9. **Powers of 0**
Always ends with 0.

---

## 📊 Last Two Digits

### Definition
The last two digits determine the number modulo 100.

### Common Patterns

#### 1. **Powers of 2**
\`\`\`
2¹ = 02
2² = 04
2³ = 08
2⁴ = 16
2⁵ = 32
2⁶ = 64
2⁷ = 28
2⁸ = 56
2⁹ = 12
2¹⁰ = 24
\`\`\`
**Cycle**: Every 4 powers: 76, 24, 76, 24...

#### 2. **Powers of 3**
\`\`\`
3¹ = 03
3² = 09
3³ = 27
3⁴ = 81
3⁵ = 43
3⁶ = 29
3⁷ = 87
3⁸ = 61
3⁹ = 83
3¹⁰ = 49
\`\`\`

#### 3. **Powers of 5**
Always ends with 25, 75, 25, 75... (alternates)

#### 4. **Powers of 6**
Pattern: 76, 56, 36, 16, 96, 76, 56...

---

## 🔄 Cyclicity of Digits

### Definition
**Cyclicity** is the repeating pattern in the last digits of powers of a number.

### Key Concepts

#### 1. **Cycle Length**
The number of different last digits before the pattern repeats.

#### 2. **Finding Cycle for Any Number**
To find last digit of a^b, find b mod (cycle length).

### Complete Cyclicity Table

| Number | Last Digit Cycle | Cycle Length |
|--------|------------------|--------------|
| 0      | 0                | 1            |
| 1      | 1                | 1            |
| 2      | 2, 4, 8, 6      | 4            |
| 3      | 3, 9, 7, 1      | 4            |
| 4      | 4, 6            | 2            |
| 5      | 5                | 1            |
| 6      | 6                | 1            |
| 7      | 7, 9, 3, 1      | 4            |
| 8      | 8, 4, 2, 6      | 4            |
| 9      | 9, 1            | 2            |

---

## 🎯 Advanced Digit Patterns

### 1. **Last Three Digits**
For larger powers, consider modulo 1000.

### 2. **Finding Last n Digits**
Use modular arithmetic with 10^n.

### 3. **Cyclicity in Series**
Some numbers have longer cycles for last two or three digits.

---

## 🧠 Problem Solving Tricks

### Trick 1: **Quick Last Digit Calculation**
**Example**: Find last digit of 7^123

**Solution**: 7 has cycle 4: 7, 9, 3, 1
123 ÷ 4 = 30 × 4 + 3, so 7^123 has last digit same as 7³ = 343 → **3**

### Trick 2: **Combined Operations**
**Example**: Find last digit of (2^3 × 3^2 × 5^4)

**Solution**: Last digits: 2³=8, 3²=9, 5⁴=5
8 × 9 × 5 = 72 × 5 = 360 → **0**

### Trick 3: **Negative Exponents**
**Example**: Find last digit of 7^{-5}

**Solution**: First find cycle, then find equivalent positive exponent.

### Trick 4: **Pattern Recognition**
**Example**: Find last digit of 6^100

**Solution**: 6^any power always ends with 6 → **6**

---

## 📊 Last Two Digits Calculation

### Method 1: **Direct Calculation for Small Powers**
For powers up to 10-15, calculate directly.

### Method 2: **Using Cycles**
Find the cycle pattern for last two digits.

**Example**: Last two digits of 7^n
\`\`\`
7¹ = 07
7² = 49
7³ = 43
7⁴ = 01
7⁵ = 07 (cycle repeats)
\`\`\`

### Method 3: **Modular Arithmetic**
Use modulo 100 to find last two digits.

---

## 🎯 Common Problem Types

### Type 1: **Find Last Digit of Power**
**Example**: Find last digit of 23^45

**Solution**: Only last digit of base matters: 3^45
3 has cycle: 3, 9, 7, 1
45 ÷ 4 = 11 × 4 + 1, so 3^45 ≡ 3¹ ≡ 3

### Type 2: **Find Last Two Digits**
**Example**: Find last two digits of 7^25

**Solution**: Find pattern of 7^n mod 100:
7¹ ≡ 07, 7² ≡ 49, 7³ ≡ 43, 7⁴ ≡ 01, 7⁵ ≡ 07...
25 ÷ 4 = 6 × 4 + 1, so 7^25 ≡ 7¹ ≡ 07

### Type 3: **Complex Expressions**
**Example**: Find last digit of (2^10 + 3^8 × 5^6)

**Solution**: Last digits: 2^10=4, 3^8=1, 5^6=5
4 + 1 × 5 = 4 + 5 = 9 → **9**

---

## 🔧 Euler's Totient Function for Large Powers

### Definition
φ(n) = number of integers k where 1 ≤ k ≤ n and gcd(k,n) = 1

### Euler's Theorem
If gcd(a,n) = 1, then a^φ(n) ≡ 1 (mod n)

### Application
For last digits, φ(10) = 4, so a^4 ≡ 1 (mod 10) for gcd(a,10)=1

---

## 📝 Practice Examples

### Example 1: Basic Last Digit
Find last digit of 27^15

**Solution**: 7^15, cycle 4: 7,9,3,1
15÷4=3×4+3, so 7^15 ≡ 7³ ≡ 343 → **3**

### Example 2: Last Two Digits
Find last two digits of 6^20

**Solution**: 6^any power ends with 76 → **76**

### Example 3: Complex Power
Find last digit of (7^2 × 8^3 × 9^4)

**Solution**: 49 × 512 × 6561
Last digits: 9 × 2 × 1 = 18 → **8**

### Example 4: Negative Base
Find last digit of (-2)^10

**Solution**: (-2)^10 = 2^10, last digit of 2^10 = 4 → **4**

### Example 5: Fractional Power
Find last digit of 7^(1/2)

**Solution**: Square root of 7 is irrational, no last digit → **No last digit**

Master digit patterns and cyclicity to solve power problems efficiently! 🚀`
};
