import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_10: SubLesson = {
  id: "2.10",
  title: 'Square & Cube Numbers',
  status: 'completed',
  content: "`# ðŸ”¢ Square & Cube Numbers

Square and cube numbers are fundamental concepts in mathematics with important properties and applications. Understanding these special numbers helps in solving various aptitude problems involving patterns, factorization, and number properties.

---

## ðŸŽ¯ Square Numbers

### Definition
A square number (or perfect square) is the result of multiplying an integer by itself.

**Formula**: nÂ² = n Ã— n

**Examples**:
- 1Â² = 1
- 2Â² = 4
- 3Â² = 9
- 4Â² = 16
- 5Â² = 25
- 6Â² = 36
- 7Â² = 49
- 8Â² = 64
- 9Â² = 81
- 10Â² = 100

---

## ðŸ“Š Properties of Square Numbers

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
In prime factorization of nÂ², all exponents are even.

---

## ðŸ§® Cube Numbers

### Definition
A cube number (or perfect cube) is the result of multiplying an integer by itself twice.

**Formula**: nÂ³ = n Ã— n Ã— n

**Examples**:
- 1Â³ = 1
- 2Â³ = 8
- 3Â³ = 27
- 4Â³ = 64
- 5Â³ = 125
- 6Â³ = 216
- 7Â³ = 343
- 8Â³ = 512
- 9Â³ = 729
- 10Â³ = 1000

---

## ðŸ“ˆ Properties of Cube Numbers

### 1. **Last Digit Pattern**
Cube numbers can end with any digit (0-9).

### 2. **Digital Root**
Cubes can have any digital root.

### 3. **Prime Factorization**
In prime factorization of nÂ³, all exponents are divisible by 3.

### 4. **Even/Odd Property**
- Even cube = even number
- Odd cube = odd number

---

## ðŸŽ¯ Special Square & Cube Numbers

### 1. **Triangular Numbers that are Square**
Numbers that are both triangular and square.

**Examples**: 1, 36, 1225

### 2. **Square Triangular Numbers**
Solutions to: 8xÂ² + 1 = yÂ²

### 3. **Taxicab Numbers**
Numbers that can be expressed as sum of two cubes in two different ways.

**Example**: 1729 = 1Â³ + 12Â³ = 9Â³ + 10Â³

### 4. **Palindromic Squares**
Square numbers that are palindromes.

**Example**: 121 = 11Â², 484 = 22Â²

---

## ðŸ§  Problem Solving Tricks

### Trick 1: **Square Number Recognition**
A number n is a perfect square if:
- Its prime factors have even exponents
- It ends with allowable digits (0,1,4,5,6,9)
- Digital root is 1, 4, 7, or 9

**Example**: Is 441 a perfect square?
\`"\`\`
441 ends with 1 âœ“
441 = 21Â² = 441 âœ“
\`\`\`

### Trick 2: **Cube Number Recognition**
A number n is a perfect cube if:
- Its prime factors have exponents divisible by 3
- Can end with any digit

**Example**: Is 512 a perfect cube?
\`\`\`
512 = 2^9 = (2^3)^3 = 8^3 âœ“
\`\`\`

### Trick 3: **Between Squares**
For any number n, there is exactly one perfect square between nÂ² and (n+1)Â².

### Trick 4: **Sum of First n Squares**
Formula: Î£kÂ² = n(n+1)(2n+1)/6

**Example**: Sum of squares from 1 to 5 = 1+4+9+16+25 = 55
Formula: 5Ã—6Ã—11/6 = 55 âœ“

### Trick 5: **Sum of First n Cubes**
Formula: Î£kÂ³ = [n(n+1)/2]Â²

**Example**: Sum of cubes from 1 to 3 = 1+8+27 = 36
Formula: (3Ã—4/2)Â² = 6Â² = 36 âœ“

---

## ðŸ“Š Patterns and Sequences

### 1. **Square Number Pattern**
\`\`\`
1Â² = 1
1Â² + 3 = 4 = 2Â²
4 + 5 = 9 = 3Â²
9 + 7 = 16 = 4Â²
16 + 9 = 25 = 5Â²
25 + 11 = 36 = 6Â²
\`\`\`
**Pattern**: Add odd numbers: 1, 3, 5, 7, 9, 11...

### 2. **Cube Number Pattern**
\`\`\`
1Â³ = 1
2Â³ = 8
3Â³ = 27
4Â³ = 64
5Â³ = 125
\`\`\`

### 3. **Difference of Squares**
aÂ² - bÂ² = (a - b)(a + b)

### 4. **Difference of Cubes**
aÂ³ - bÂ³ = (a - b)(aÂ² + ab + bÂ²)

### 5. **Sum of Cubes**
aÂ³ + bÂ³ = (a + b)(aÂ² - ab + bÂ²)

---

## ðŸŽ¯ Applications in Aptitude

### 1. **Finding Square Roots**
**Example**: Find âˆš(144) without calculator.

**Solution**: 12Â² = 144 âœ“

### 2. **Cube Roots**
**Example**: Find âˆ›(125).

**Solution**: 5Â³ = 125 âœ“

### 3. **Pattern Recognition**
**Example**: Find the next number: 1, 4, 9, 16, 25, ?

**Solution**: 36 (6Â²)

### 4. **Factor Analysis**
**Example**: Is 225 a perfect square?

**Solution**: 225 = 15Â² = 3Â² Ã— 5Â² âœ“

---

## ðŸ” Advanced Concepts

### 1. **Square-Free Numbers**
Numbers not divisible by any perfect square other than 1.

**Example**: 15 = 3Ã—5 (square-free)
**Example**: 12 = 4Ã—3 (not square-free, divisible by 4)

### 2. **Cube-Free Numbers**
Numbers not divisible by any perfect cube other than 1.

### 3. **Powerful Numbers**
Numbers where every prime factor has exponent â‰¥2.

### 4. **Achilles Numbers**
Powerful numbers that are not perfect powers.

---

## ðŸ“ Practice Examples

### Example 1: Perfect Square Check
Is 169 a perfect square?

**Solution**: 169 = 13Â² âœ“

### Example 2: Perfect Cube Check
Is 343 a perfect cube?

**Solution**: 343 = 7Â³ âœ“

### Example 3: Square Pattern
What is the sum of first 10 odd numbers?

**Solution**: 10Â² = 100 âœ“

### Example 4: Cube Pattern
What is the sum of cubes from 1 to n?

**Solution**: [n(n+1)/2]Â²

### Example 5: Difference Pattern
Simplify: 50Â² - 49Â²

**Solution**: (50-49)(50+49) = 1 Ã— 99 = 99

### Example 6: Complex Squares
Find the square of 15.

**Solution**: 15Â² = 225
Or: (10+5)Â² = 100 + 2Ã—10Ã—5 + 25 = 100 + 100 + 25 = 225

Master square and cube numbers to solve pattern and number problems! ðŸš€`
};


