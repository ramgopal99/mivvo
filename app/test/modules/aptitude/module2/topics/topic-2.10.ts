import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_10: SubLesson = {
  id: "2.10",
  title: 'Square & Cube Numbers',
  status: 'completed',
  content: `# 🔢 Square & Cube Numbers

Square and cube numbers are fundamental concepts in mathematics with important properties and applications. Understanding these special numbers helps in solving various aptitude problems involving patterns, factorization, and number properties.

---

## 🎯 Square Numbers

### Definition
A square number (or perfect square) is the result of multiplying an integer by itself.

**Formula**: n² = n × n

**Examples**:
- 1² = 1
- 2² = 4
- 3² = 9
- 4² = 16
- 5² = 25
- 6² = 36
- 7² = 49
- 8² = 64
- 9² = 81
- 10² = 100

---

## 📊 Properties of Square Numbers

### 1. **Last Digit Pattern**
Square numbers end with: 0, 1, 4, 5, 6, 9

**Examples**:
- Numbers ending with 1, 4, 6, 9, 0 can be perfect squares
- Numbers ending with 2, 3, 7, 8 cannot be perfect squares

### 2. **Digital Root Property**
Square of any number has digital root 1, 4, 7, or 9.

### 3. **Even/Odd Property**
- Even square = even number
- Odd square = odd number

### 4. **Prime Factorization**
In prime factorization of n², all exponents are even.

---

## 🧮 Cube Numbers

### Definition
A cube number (or perfect cube) is the result of multiplying an integer by itself twice.

**Formula**: n³ = n × n × n

**Examples**:
- 1³ = 1
- 2³ = 8
- 3³ = 27
- 4³ = 64
- 5³ = 125
- 6³ = 216
- 7³ = 343
- 8³ = 512
- 9³ = 729
- 10³ = 1000

---

## 📈 Properties of Cube Numbers

### 1. **Last Digit Pattern**
Cube numbers can end with any digit (0-9).

### 2. **Digital Root**
Cubes can have any digital root.

### 3. **Prime Factorization**
In prime factorization of n³, all exponents are divisible by 3.

### 4. **Even/Odd Property**
- Even cube = even number
- Odd cube = odd number

---

## 🎯 Special Square & Cube Numbers

### 1. **Triangular Numbers that are Square**
Numbers that are both triangular and square.

**Examples**: 1, 36, 1225

### 2. **Square Triangular Numbers**
Solutions to: 8x² + 1 = y²

### 3. **Taxicab Numbers**
Numbers that can be expressed as sum of two cubes in two different ways.

**Example**: 1729 = 1³ + 12³ = 9³ + 10³

### 4. **Palindromic Squares**
Square numbers that are palindromes.

**Example**: 121 = 11², 484 = 22²

---

## 🧠 Problem Solving Tricks

### Trick 1: **Square Number Recognition**
A number n is a perfect square if:
- Its prime factors have even exponents
- It ends with allowable digits (0,1,4,5,6,9)
- Digital root is 1, 4, 7, or 9

**Example**: Is 441 a perfect square?
\`\`\`
441 ends with 1 ✓
441 = 21² = 441 ✓
\`\`\`

### Trick 2: **Cube Number Recognition**
A number n is a perfect cube if:
- Its prime factors have exponents divisible by 3
- Can end with any digit

**Example**: Is 512 a perfect cube?
\`\`\`
512 = 2^9 = (2^3)^3 = 8^3 ✓
\`\`\`

### Trick 3: **Between Squares**
For any number n, there is exactly one perfect square between n² and (n+1)².

### Trick 4: **Sum of First n Squares**
Formula: Σk² = n(n+1)(2n+1)/6

**Example**: Sum of squares from 1 to 5 = 1+4+9+16+25 = 55
Formula: 5×6×11/6 = 55 ✓

### Trick 5: **Sum of First n Cubes**
Formula: Σk³ = [n(n+1)/2]²

**Example**: Sum of cubes from 1 to 3 = 1+8+27 = 36
Formula: (3×4/2)² = 6² = 36 ✓

---

## 📊 Patterns and Sequences

### 1. **Square Number Pattern**
\`\`\`
1² = 1
1² + 3 = 4 = 2²
4 + 5 = 9 = 3²
9 + 7 = 16 = 4²
16 + 9 = 25 = 5²
25 + 11 = 36 = 6²
\`\`\`
**Pattern**: Add odd numbers: 1, 3, 5, 7, 9, 11...

### 2. **Cube Number Pattern**
\`\`\`
1³ = 1
2³ = 8
3³ = 27
4³ = 64
5³ = 125
\`\`\`

### 3. **Difference of Squares**
a² - b² = (a - b)(a + b)

### 4. **Difference of Cubes**
a³ - b³ = (a - b)(a² + ab + b²)

### 5. **Sum of Cubes**
a³ + b³ = (a + b)(a² - ab + b²)

---

## 🎯 Applications in Aptitude

### 1. **Finding Square Roots**
**Example**: Find √(144) without calculator.

**Solution**: 12² = 144 ✓

### 2. **Cube Roots**
**Example**: Find ∛(125).

**Solution**: 5³ = 125 ✓

### 3. **Pattern Recognition**
**Example**: Find the next number: 1, 4, 9, 16, 25, ?

**Solution**: 36 (6²)

### 4. **Factor Analysis**
**Example**: Is 225 a perfect square?

**Solution**: 225 = 15² = 3² × 5² ✓

---

## 🔍 Advanced Concepts

### 1. **Square-Free Numbers**
Numbers not divisible by any perfect square other than 1.

**Example**: 15 = 3×5 (square-free)
**Example**: 12 = 4×3 (not square-free, divisible by 4)

### 2. **Cube-Free Numbers**
Numbers not divisible by any perfect cube other than 1.

### 3. **Powerful Numbers**
Numbers where every prime factor has exponent ≥2.

### 4. **Achilles Numbers**
Powerful numbers that are not perfect powers.

---

## 📝 Practice Examples

### Example 1: Perfect Square Check
Is 169 a perfect square?

**Solution**: 169 = 13² ✓

### Example 2: Perfect Cube Check
Is 343 a perfect cube?

**Solution**: 343 = 7³ ✓

### Example 3: Square Pattern
What is the sum of first 10 odd numbers?

**Solution**: 10² = 100 ✓

### Example 4: Cube Pattern
What is the sum of cubes from 1 to n?

**Solution**: [n(n+1)/2]²

### Example 5: Difference Pattern
Simplify: 50² - 49²

**Solution**: (50-49)(50+49) = 1 × 99 = 99

### Example 6: Complex Squares
Find the square of 15.

**Solution**: 15² = 225
Or: (10+5)² = 100 + 2×10×5 + 25 = 100 + 100 + 25 = 225

Master square and cube numbers to solve pattern and number problems! 🚀`
};

