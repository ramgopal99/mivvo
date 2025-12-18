import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_16: SubLesson = {
  id: "1.16",
  title: 'Simplification',
  status: 'completed',
  content: `# 🔢 Simplification

Simplification is the process of making mathematical expressions easier to work with by reducing complexity while maintaining equivalence. This fundamental skill is essential for solving aptitude problems efficiently.

---

## 🎯 What is Simplification?

Simplification involves:
- Reducing fractions to lowest terms
- Combining like terms
- Eliminating unnecessary operations
- Using algebraic identities
- Applying mathematical rules systematically

---

## 📊 Basic Simplification Techniques

### 1. **Fraction Simplification**
Divide numerator and denominator by common factors.

**Example**: Simplify 48/72
\`\`\`
48 ÷ 24 = 2, 72 ÷ 24 = 3
Result: 2/3
\`\`\`

### 2. **Decimal Simplification**
Convert decimals to fractions or simplify decimal expressions.

**Example**: Simplify 0.375
\`\`\`
0.375 = 375/1000 = 3/8
\`\`\`

### 3. **Percentage Simplification**
Convert percentages to fractions or decimals.

**Example**: Simplify 25%
\`\`\`
25% = 25/100 = 1/4 = 0.25
\`\`\`

---

## 🧮 Algebraic Simplification

### 1. **Combining Like Terms**
Add or subtract terms with same variables and powers.

**Example**: Simplify 3x + 2y - x + 4y
\`\`\`
3x - x + 2y + 4y = 2x + 6y
\`\`\`

### 2. **Expanding Brackets**
Use distributive property: a(b + c) = ab + ac

**Example**: Simplify 2(x + 3) + 3(x - 1)
\`\`\`
2x + 6 + 3x - 3 = 5x + 3
\`\`\`

### 3. **Factorization**
Factor out common terms.

**Example**: Simplify 6x² + 9x
\`\`\`
3x(2x + 3)
\`\`\`

---

## 🎯 BODMAS/BIDMAS Rule

### Order of Operations:
1. **B**rackets (Parentheses)
2. **O**f (Orders/Exponents)
3. **D**ivision
4. **M**ultiplication
5. **A**ddition
6. **S**ubtraction

**Example**: Simplify 2 + 3 × (4 - 1) ÷ 2
\`\`\`
First: 4 - 1 = 3
Then: 3 × 3 = 9
Then: 9 ÷ 2 = 4.5
Finally: 2 + 4.5 = 6.5
\`\`\`

---

## 🧠 Advanced Simplification Tricks

### Trick 1: **Difference of Squares**
a² - b² = (a - b)(a + b)

**Example**: Simplify x² - 16
\`\`\`
(x - 4)(x + 4)
\`\`\`

### Trick 2: **Perfect Squares**
Recognize expressions that form perfect squares.

**Example**: Simplify (x + 3)² - 4
\`\`\`
x² + 6x + 9 - 4 = x² + 6x + 5
\`\`\`

### Trick 3: **Common Factor Extraction**
Factor out the greatest common factor.

**Example**: Simplify 15a²b + 25ab² - 10a²b²
\`\`\`
5ab(3a + 5b - 2ab)
\`\`\`

### Trick 4: **Rationalization**
Multiply numerator and denominator by conjugate.

**Example**: Simplify 1/(√3 + 1)
\`\`\`
(√3 - 1)/((√3 + 1)(√3 - 1)) = (√3 - 1)/(3 - 1) = (√3 - 1)/2
\`\`\`

---

## 📊 Complex Expression Simplification

### 1. **Fraction Operations**
**Example**: Simplify (2/3 + 1/4) × (3/4 - 1/6)
\`\`\`
First: 2/3 + 1/4 = 8/12 + 3/12 = 11/12
3/4 - 1/6 = 9/12 - 2/12 = 7/12

Then: (11/12) × (7/12) = 77/144
\`\`\`

### 2. **Mixed Operations**
**Example**: Simplify √(48) + √(12) - √(27)
\`\`\`
√(16×3) + √(4×3) - √(9×3) = 4√3 + 2√3 - 3√3 = 3√3
\`\`\`

### 3. **Exponent Rules**
**Example**: Simplify (2³ × 3²) ÷ (2² × 3) × 4²
\`\`\`
First: 2^(3-2) × 3^(2-1) × 4² = 2¹ × 3¹ × 16 = 2 × 3 × 16 = 96
\`\`\`

---

## 🎯 Common Simplification Patterns

### Pattern 1: **Square of Sum/Difference**
(a ± b)² = a² ± 2ab + b²

**Example**: (x + 2)² = x² + 4x + 4

### Pattern 2: **Cube of Sum/Difference**
(a ± b)³ = a³ ± 3a²b + 3ab² ± b³

**Example**: (x - 1)³ = x³ - 3x² + 3x - 1

### Pattern 3: **Difference of Cubes**
a³ - b³ = (a - b)(a² + ab + b²)

**Example**: 8 - 1 = 7 = (2 - 1)(4 + 2 + 1) = 1 × 7 = 7

### Pattern 4: **Sum of Cubes**
a³ + b³ = (a + b)(a² - ab + b²)

**Example**: 8 + 27 = 35 = (2 + 3)(4 - 6 + 9) = 5 × 7 = 35

---

## 🧮 Simplification in Aptitude Problems

### 1. **Percentage Problems**
**Example**: Simplify 25% of 40% of 200
\`\`\`
25% of 40% of 200 = 0.25 × 0.4 × 200 = 0.1 × 200 = 20
\`\`\`

### 2. **Ratio Problems**
**Example**: Simplify ratio 2:3:4 to 4:6:8
\`\`\`
Multiply each term by 2: 4:6:8
\`\`\`

### 3. **Fraction Problems**
**Example**: Simplify 2/3 ÷ 4/5 × 1/2
\`\`\`
2/3 × 5/4 × 1/2 = (2 × 5 × 1)/(3 × 4 × 2) = 10/48 = 5/24
\`\`\`

### 4. **Mixed Operations**
**Example**: Simplify 2 + 3 × 4 - 5 ÷ 1 + 6
\`\`\`
Following BODMAS: 3 × 4 = 12, 5 ÷ 1 = 5
2 + 12 - 5 + 6 = (2 + 12 + 6) - 5 = 20 - 5 = 15
\`\`\`

---

## 🔍 Advanced Simplification Techniques

### 1. **Using Identities**
Apply trigonometric or algebraic identities.

### 2. **Logarithmic Simplification**
Use logarithm properties.

**Example**: Simplify log₂(8) + log₃(9) - log₄(16)
\`\`\`
log₂(2³) + log₃(3²) - log₄(4²) = 3 + 2 - 2 = 3
\`\`\`

### 3. **Matrix Operations**
Simplify matrix expressions.

### 4. **Complex Number Simplification**
Work with imaginary numbers.

---

## 📝 Practice Examples

### Example 1: Basic Algebraic
Simplify 5x + 3y - 2x + 4y - x

**Solution**: (5x - 2x - x) + (3y + 4y) = 2x + 7y

### Example 2: Fraction Operations
Simplify (3/4 + 2/5) ÷ (1/2 - 1/3)

**Solution**: First: 3/4 + 2/5 = 15/20 + 8/20 = 23/20
1/2 - 1/3 = 3/6 - 2/6 = 1/6

Then: (23/20) ÷ (1/6) = (23/20) × (6/1) = 138/20 = 69/10

### Example 3: Square Root Simplification
Simplify √(98) + √(50) - √(72)

**Solution**: √(49×2) + √(25×2) - √(36×2) = 7√2 + 5√2 - 6√2 = 6√2

### Example 4: Complex Expression
Simplify (a² - b²)/(a + b) + (a + b)

**Solution**: (a² - b²)/(a + b) + (a + b) = [(a - b)(a + b)/(a + b)] + (a + b)
= (a - b) + (a + b) = 2a

### Example 5: Percentage Simplification
Simplify 40% of 25% of 200

**Solution**: 0.4 × 0.25 × 200 = 0.1 × 200 = 20

### Example 6: BODMAS Application
Simplify 8 ÷ 2 × (3 + 1) - 4

**Solution**: 8 ÷ 2 = 4
4 × (3 + 1) = 4 × 4 = 16
16 - 4 = 12

Master simplification techniques to solve complex mathematical problems efficiently! 🚀`
};
