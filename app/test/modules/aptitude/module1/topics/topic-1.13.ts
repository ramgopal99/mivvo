import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_13: SubLesson = {
  id: "1.13",
  title: 'Surds & Indices (Basic)',
  status: 'completed',
  content: `# 🔢 Surds & Indices (Basic)

Surds and indices are essential concepts in mathematics dealing with irrational roots and exponential expressions. Understanding these concepts helps simplify complex expressions and solve advanced mathematical problems.

---

## 🎯 What are Surds?

### Definition
Surds are irrational roots of numbers that cannot be expressed as finite decimals or fractions.

**Examples**:
- √2 ≈ 1.414213562...
- √3 ≈ 1.732050807...
- ∛7 ≈ 1.912931182...
- √(5 + 2√3) (compound surd)

### Types of Surds

#### 1. **Simple Surds**
Single irrational root: √2, ∛5, ⁴√7

#### 2. **Compound Surds**
Expression with multiple surds: √(3 + 2√2)

#### 3. **Similar Surds**
Surds with same irrational part: 2√3, 5√3, √3

#### 4. **Dissimilar Surds**
Surds with different irrational parts: √2, √3, √5

---

## 📊 Laws of Surds

### 1. **Multiplication**
√a × √b = √(a × b)

**Example**: √2 × √3 = √6

### 2. **Division**
√a ÷ √b = √(a/b)

**Example**: √8 ÷ √2 = √4 = 2

### 3. **Rationalization**
Multiply numerator and denominator by conjugate to eliminate surds.

**Example**: Rationalize 1/(√2 + 1)
\`\`\`
Multiply by √2 - 1: (√2 - 1)/((√2 + 1)(√2 - 1)) = (√2 - 1)/(2 - 1) = √2 - 1
\`\`\`

### 4. **Power Rule**
(√a)^n = a^(n/2)

**Example**: (√2)^4 = 2^(4/2) = 2² = 4

---

## 🧮 Operations with Surds

### 1. **Addition and Subtraction**
Only similar surds can be added/subtracted.

**Example**: 3√2 + 5√2 = 8√2
**Example**: 7√3 - 2√3 = 5√3
**Example**: 2√2 + 3√3 (cannot be simplified)

### 2. **Multiplication**
√a × √b = √(a×b)

**Example**: 2√3 × 3√2 = 6√6

### 3. **Division**
√a ÷ √b = √(a/b)

**Example**: 4√6 ÷ 2√3 = 2√2

### 4. **Simplification**
Express surd in simplest form.

**Example**: √12 = √(4×3) = 2√3

---

## 🎯 Indices (Exponents)

### Definition
Indices show how many times a number is multiplied by itself.

**Notation**: a^n (a is base, n is index/power)

### Laws of Indices

#### 1. **Multiplication**
a^m × a^n = a^(m+n)

#### 2. **Division**
a^m ÷ a^n = a^(m-n)

#### 3. **Power of Power**
(a^m)^n = a^(m×n)

#### 4. **Product Rule**
(a×b)^n = a^n × b^n

#### 5. **Quotient Rule**
(a/b)^n = a^n / b^n

#### 6. **Zero Index**
a⁰ = 1 (a ≠ 0)

#### 7. **Negative Index**
a^(-n) = 1/a^n

#### 8. **Fractional Index**
a^(m/n) = (a^m)^(1/n) = (a^(1/n))^m

---

## 🧠 Problem Solving Tricks

### Trick 1: **Simplify Surds**
Express in simplest form by factoring out perfect squares.

**Example**: √28 = √(4×7) = 2√7

### Trick 2: **Rationalize Denominators**
Use conjugates for denominators with surds.

**Example**: √2 / (√3 + 1)
\`\`\`
Multiply by √3 - 1: (√2(√3 - 1))/(3 - 1) = (√6 - √2)/2
\`\`\`

### Trick 3: **Compare Surds**
Convert to decimal or use known values.

**Example**: Compare √2 and √3
√2 ≈ 1.41, √3 ≈ 1.73, so √2 < √3

### Trick 4: **Solve Surd Equations**
Square both sides carefully.

**Example**: Solve √(x+1) = 3
Square: x+1 = 9 → x = 8

**Example**: Solve √(x+1) + √(x-1) = 2
Square: x+1 + x-1 + 2√((x+1)(x-1)) = 4
2x + 2√(x²-1) = 4
x + √(x²-1) = 2
Square again: x² + (x²-1) + 2x√(x²-1) = 4
2x² - 1 + 2x√(x²-1) = 4
2x² + 2x√(x²-1) = 5

---

## 📊 Advanced Surd Concepts

### 1. **Pure Surds**
Cannot be simplified: √2, √3, √5

### 2. **Mixed Surds**
Can be simplified: √12 = 2√3

### 3. **Binomial Surds**
Expressions like √a ± √b

### 4. **Conjugate Surds**
Pairs like √a + √b and √a - √b

---

## 🎯 Applications in Aptitude

### 1. **Geometry Problems**
**Example**: Diagonal of square with side √2 is 2.

### 2. **Trigonometry**
**Example**: sin45° = cos45° = 1/√2 = √2/2

### 3. **Complex Calculations**
**Example**: Simplify (√3 + 1)(√3 - 1) = 3 - 1 = 2

### 4. **Equation Solving**
**Example**: Solve √(2x+3) - √(x+1) = 1

---

## 🔍 Special Cases

### 1. **Square Root of Negative Numbers**
Imaginary numbers: √(-4) = 2i

### 2. **Higher Order Roots**
∛(-8) = -2, ⁴√16 = 2

### 3. **Surd Conjugates**
(√a + √b)(√a - √b) = a - b

### 4. **Perfect Powers**
Numbers that are perfect squares, cubes, etc.

---

## 🧮 Surd Identities

### 1. **(√a + √b)² = a + b + 2√(ab)**
**Example**: (√2 + √3)² = 2 + 3 + 2√6 = 5 + 2√6

### 2. **(√a - √b)² = a + b - 2√(ab)**
**Example**: (√5 - √2)² = 5 + 2 - 2√10 = 7 - 2√10

### 3. **(a + √b)(a - √b) = a² - b**
**Example**: (3 + √2)(3 - √2) = 9 - 2 = 7

### 4. **Rationalization Factor**
Multiply by conjugate to rationalize.

---

## 📝 Practice Examples

### Example 1: Simplify Surds
Simplify √75 + √12 - √27

**Solution**: √(25×3) + √(4×3) - √(9×3) = 5√3 + 2√3 - 3√3 = 4√3

### Example 2: Rationalize
Rationalize 1/(2 + √3)

**Solution**: Multiply by 2 - √3:
(2 - √3)/((2 + √3)(2 - √3)) = (2 - √3)/(4 - 3) = 2 - √3

### Example 3: Operations
Simplify (3√2 + 2√3)(√2 - √3)

**Solution**: 3√2×√2 + 3√2×(-√3) + 2√3×√2 + 2√3×(-√3)
= 3×2 + 3(-√6) + 2√6 + 2(-3)
= 6 - 3√6 + 2√6 - 6
= (6 - 6) + (-3√6 + 2√6) = -√6

### Example 4: Equation
Solve √(x+4) - √x = 2

**Solution**: Square both sides: x+4 - x + 2√(x(x+4)) = 4
4 + 2√(x²+4x) = 4
2√(x²+4x) = 0
√(x²+4x) = 0
x²+4x = 0
x(x+4) = 0
x = 0 or x = -4 (reject)

### Example 5: Indices
Simplify (2^3 × 3^2)^2 ÷ (2^2 × 3^3)

**Solution**: (2^6 × 3^4) ÷ (2^2 × 3^3) = 2^(6-2) × 3^(4-3) = 2^4 × 3^1 = 16 × 3 = 48

Master surds and indices to simplify complex mathematical expressions! 🚀`
};
