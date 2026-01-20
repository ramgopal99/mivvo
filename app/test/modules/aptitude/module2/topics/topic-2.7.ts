import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: "2.7",
  title: 'Unit Digit, Last Digits & Cyclicity',
  status: 'completed',
  content: "`# ðŸ”¢ Unit Digit, Last Digits & Cyclicity

Understanding digit patterns and cyclicity is crucial for solving power problems, large number calculations, and competitive exam questions. These concepts help predict the behavior of numbers when raised to powers or when dealing with repetitive patterns.

---

## ðŸŽ¯ Unit Digit (Last Digit)

### Definition
The unit digit is the rightmost digit of a number, which determines the number modulo 10.

### Powers of Numbers and Their Unit Digits

#### 1. **Powers of 2**
Pattern: 2, 4, 8, 6, 2, 4, 8, 6...
**Cycle**: 4 digits

\`"\`\`
2Â¹ = 2  â†’ 2
2Â² = 4  â†’ 4
2Â³ = 8  â†’ 8
2â´ = 16 â†’ 6
2âµ = 32 â†’ 2
2â¶ = 64 â†’ 4
...\`\`\`

#### 2. **Powers of 3**
Pattern: 3, 9, 7, 1, 3, 9, 7, 1...
**Cycle**: 4 digits

\`\`\`
3Â¹ = 3  â†’ 3
3Â² = 9  â†’ 9
3Â³ = 27 â†’ 7
3â´ = 81 â†’ 1
3âµ = 243 â†’ 3
...\`\`\`

#### 3. **Powers of 4**
Pattern: 4, 6, 4, 6, 4, 6...
**Cycle**: 2 digits

\`\`\`
4Â¹ = 4  â†’ 4
4Â² = 16 â†’ 6
4Â³ = 64 â†’ 4
4â´ = 256 â†’ 6
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

## ðŸ“Š Last Two Digits

### Definition
The last two digits determine the number modulo 100.

### Common Patterns

#### 1. **Powers of 2**
\`\`\`
2Â¹ = 02
2Â² = 04
2Â³ = 08
2â´ = 16
2âµ = 32
2â¶ = 64
2â· = 28
2â¸ = 56
2â¹ = 12
2Â¹â° = 24
\`\`\`
**Cycle**: Every 4 powers: 76, 24, 76, 24...

#### 2. **Powers of 3**
\`\`\`
3Â¹ = 03
3Â² = 09
3Â³ = 27
3â´ = 81
3âµ = 43
3â¶ = 29
3â· = 87
3â¸ = 61
3â¹ = 83
3Â¹â° = 49
\`\`\`

#### 3. **Powers of 5**
Always ends with 25, 75, 25, 75... (alternates)

#### 4. **Powers of 6**
Pattern: 76, 56, 36, 16, 96, 76, 56...

---

## ðŸ”„ Cyclicity of Digits

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

## ðŸŽ¯ Advanced Digit Patterns

### 1. **Last Three Digits**
For larger powers, consider modulo 1000.

### 2. **Finding Last n Digits**
Use modular arithmetic with 10^n.

### 3. **Cyclicity in Series**
Some numbers have longer cycles for last two or three digits.

---

## ðŸ§  Problem Solving Tricks

### Trick 1: **Quick Last Digit Calculation**
**Example**: Find last digit of 7^123

**Solution**: 7 has cycle 4: 7, 9, 3, 1
123 Ã· 4 = 30 Ã— 4 + 3, so 7^123 has last digit same as 7Â³ = 343 â†’ **3**

### Trick 2: **Combined Operations**
**Example**: Find last digit of (2^3 Ã— 3^2 Ã— 5^4)

**Solution**: Last digits: 2Â³=8, 3Â²=9, 5â´=5
8 Ã— 9 Ã— 5 = 72 Ã— 5 = 360 â†’ **0**

### Trick 3: **Negative Exponents**
**Example**: Find last digit of 7^{-5}

**Solution**: First find cycle, then find equivalent positive exponent.

### Trick 4: **Pattern Recognition**
**Example**: Find last digit of 6^100

**Solution**: 6^any power always ends with 6 â†’ **6**

---

## ðŸ“Š Last Two Digits Calculation

### Method 1: **Direct Calculation for Small Powers**
For powers up to 10-15, calculate directly.

### Method 2: **Using Cycles**
Find the cycle pattern for last two digits.

**Example**: Last two digits of 7^n
\`\`\`
7Â¹ = 07
7Â² = 49
7Â³ = 43
7â´ = 01
7âµ = 07 (cycle repeats)
\`\`\`

### Method 3: **Modular Arithmetic**
Use modulo 100 to find last two digits.

---

## ðŸŽ¯ Common Problem Types

### Type 1: **Find Last Digit of Power**
**Example**: Find last digit of 23^45

**Solution**: Only last digit of base matters: 3^45
3 has cycle: 3, 9, 7, 1
45 Ã· 4 = 11 Ã— 4 + 1, so 3^45 â‰¡ 3Â¹ â‰¡ 3

### Type 2: **Find Last Two Digits**
**Example**: Find last two digits of 7^25

**Solution**: Find pattern of 7^n mod 100:
7Â¹ â‰¡ 07, 7Â² â‰¡ 49, 7Â³ â‰¡ 43, 7â´ â‰¡ 01, 7âµ â‰¡ 07...
25 Ã· 4 = 6 Ã— 4 + 1, so 7^25 â‰¡ 7Â¹ â‰¡ 07

### Type 3: **Complex Expressions**
**Example**: Find last digit of (2^10 + 3^8 Ã— 5^6)

**Solution**: Last digits: 2^10=4, 3^8=1, 5^6=5
4 + 1 Ã— 5 = 4 + 5 = 9 â†’ **9**

---

## ðŸ”§ Euler's Totient Function for Large Powers

### Definition
Ï†(n) = number of integers k where 1 â‰¤ k â‰¤ n and gcd(k,n) = 1

### Euler's Theorem
If gcd(a,n) = 1, then a^Ï†(n) â‰¡ 1 (mod n)

### Application
For last digits, Ï†(10) = 4, so a^4 â‰¡ 1 (mod 10) for gcd(a,10)=1

---

## ðŸ“ Practice Examples

### Example 1: Basic Last Digit
Find last digit of 27^15

**Solution**: 7^15, cycle 4: 7,9,3,1
15Ã·4=3Ã—4+3, so 7^15 â‰¡ 7Â³ â‰¡ 343 â†’ **3**

### Example 2: Last Two Digits
Find last two digits of 6^20

**Solution**: 6^any power ends with 76 â†’ **76**

### Example 3: Complex Power
Find last digit of (7^2 Ã— 8^3 Ã— 9^4)

**Solution**: 49 Ã— 512 Ã— 6561
Last digits: 9 Ã— 2 Ã— 1 = 18 â†’ **8**

### Example 4: Negative Base
Find last digit of (-2)^10

**Solution**: (-2)^10 = 2^10, last digit of 2^10 = 4 â†’ **4**

### Example 5: Fractional Power
Find last digit of 7^(1/2)

**Solution**: Square root of 7 is irrational, no last digit â†’ **No last digit**

Master digit patterns and cyclicity to solve power problems efficiently! ðŸš€`
};


