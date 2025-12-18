import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_11: SubLesson = {
  id: "1.11",
  title: 'Square Root & Cube Root',
  status: 'completed',
  content: `# 🔢 Square Root & Cube Root

Square roots and cube roots are fundamental mathematical operations with important applications in algebra, geometry, and quantitative aptitude. Understanding these concepts helps solve problems involving areas, volumes, and complex equations.

---

## 🎯 Square Root

### Definition
The square root of a number x is a number y such that y² = x.

**Notation**: √x or x^(1/2)

**Examples**:
- √4 = 2 (since 2² = 4)
- √9 = 3 (since 3² = 9)
- √16 = 4 (since 4² = 16)
- √25 = 5 (since 5² = 25)

---

## 📊 Properties of Square Roots

### 1. **Positive and Negative Roots**
Every positive number has two square roots: positive and negative.

**Example**: √4 = ±2

### 2. **Square Root of Negative Numbers**
Not defined in real numbers (imaginary in complex numbers).

### 3. **Square Root of Perfect Squares**
Always rational or integer.

### 4. **Square Root of Non-Perfect Squares**
Irrational numbers.

---

## 🧮 Methods to Find Square Root

### 1. **Prime Factorization Method**
Express number as product of prime factors, then pair them.

**Example**: Find √(144)
\`\`\`
144 = 2² × 3²
√144 = √(2² × 3²) = 2 × 3 = 6
\`\`\`

### 2. **Long Division Method**
\`\`\`
Find √196:
  14
---------
14|196.00
   196
  -----
     000
\`\`\`

### 3. **Estimation Method**
Find two perfect squares between which the number lies.

**Example**: Find √15
\`\`\`
3² = 9, 4² = 16
So 3 < √15 < 4
\`\`\`

---

## 📈 Cube Root

### Definition
The cube root of a number x is a number y such that y³ = x.

**Notation**: ∛x or x^(1/3)

**Examples**:
- ∛8 = 2 (since 2³ = 8)
- ∛27 = 3 (since 3³ = 27)
- ∛64 = 4 (since 4³ = 64)
- ∛125 = 5 (since 5³ = 125)

---

## 🔧 Properties of Cube Roots

### 1. **Unique Root**
Every real number has exactly one real cube root.

### 2. **Negative Numbers**
Cube roots of negative numbers are negative.

**Example**: ∛(-8) = -2

### 3. **Perfect Cubes**
Cube roots are rational for perfect cubes.

### 4. **Prime Factorization**
Group prime factors in threes.

---

## 🧠 Problem Solving Tricks

### Trick 1: **Square Root of Large Numbers**
Use prime factorization and pair factors.

**Example**: Find √(1296)
\`\`\`
1296 = 2^4 × 3^4
√1296 = √(2^4 × 3^4) = 2² × 3² = 4 × 9 = 36
\`\`\`

### Trick 2: **Cube Root of Large Numbers**
Group factors in threes.

**Example**: Find ∛(3375)
\`\`\`
3375 = 3^3 × 5^3
∛3375 = 3 × 5 = 15
\`\`\`

### Trick 3: **Square Root Between Two Numbers**
For any number n, √n lies between floor(√n) and ceil(√n).

### Trick 4: **Rationalizing Denominators**
Multiply numerator and denominator by conjugate.

**Example**: Simplify 1/(√3 - 1)
\`\`\`
Multiply by √3 + 1: (√3 + 1)/((√3 - 1)(√3 + 1)) = (√3 + 1)/(3 - 1) = (√3 + 1)/2
\`\`\`

---

## 🎯 Square Root & Cube Root Identities

### 1. **Square Root Identities**
- √(ab) = √a × √b (if a,b ≥ 0)
- √(a/b) = √a / √b (if a,b > 0)
- √(a²) = |a|
- (√a + √b)(√a - √b) = a - b

### 2. **Cube Root Identities**
- ∛(abc) = ∛a × ∛b × ∛c
- ∛(a/b) = ∛a / ∛b
- ∛(a³) = a

### 3. **Mixed Operations**
- √(a³) = √a × √a × √a = a√a
- ∛(a²) = ∛a × ∛a = a^(2/3)

---

## 📊 Approximating Roots

### 1. **Linear Approximation**
For √x where x is near a perfect square.

### 2. **Newton's Method**
Iterative formula: x_{n+1} = (x_n + a/x_n)/2 for square root.

### 3. **Using Calculator**
Direct calculation for precise values.

---

## 🎯 Applications in Aptitude

### 1. **Geometry Problems**
**Example**: Find side of square with area 144 cm².

**Solution**: Side = √144 = 12 cm

### 2. **Volume Problems**
**Example**: Find edge of cube with volume 125 cm³.

**Solution**: Edge = ∛125 = 5 cm

### 3. **Quadratic Equations**
**Example**: Solve x² - 7x + 12 = 0

**Solution**: Roots = [7 ± √(49-48)]/2 = [7 ± √1]/2 = [7 ± 1]/2
x = 4 or x = 3

### 4. **Simplification Problems**
**Example**: Simplify √(48) + √(12)

**Solution**: √(16×3) + √(4×3) = 4√3 + 2√3 = 6√3

---

## 🔍 Special Cases

### 1. **Square Root of Fractions**
√(a/b) = √a / √b

### 2. **Square Root of Decimals**
Convert to fractions first.

### 3. **Cube Root of Fractions**
∛(a/b) = ∛a / ∛b

### 4. **Complex Roots**
Square roots of negative numbers involve imaginary unit i.

---

## 🧮 Root Calculations

### 1. **Square Root by Division**
\`\`\`
Find √784:
  28
---------
28|784.00
   784
  -----
     000
\`\`\`

### 2. **Cube Root by Division**
Similar method grouping digits in threes.

### 3. **Using Prime Factors**
Most reliable method for exact answers.

---

## 📝 Practice Examples

### Example 1: Square Root by Factors
Find √(2025)

**Solution**: 2025 = 45² = (9×5)² = 81 × 25
√2025 = 45

### Example 2: Cube Root by Factors
Find ∛(13824)

**Solution**: 13824 = 24³ = (2×12)³ = 8 × 1728
∛13824 = 24

### Example 3: Simplification
Simplify √(75) - √(27) + √(12)

**Solution**: √(25×3) - √(9×3) + √(4×3) = 5√3 - 3√3 + 2√3 = 4√3

### Example 4: Equation Solving
Solve √(x+1) + √(x-1) = 2

**Solution**: Square both sides: x+1 + x-1 + 2√((x+1)(x-1)) = 4
2x + 2√(x²-1) = 4
x + √(x²-1) = 2
Square again: x² + (x²-1) + 2x√(x²-1) = 4
2x² - 1 + 2x√(x²-1) = 4
2x² + 2x√(x²-1) = 5
Divide by 2: x² + x√(x²-1) = 5/2

This requires further solving.

### Example 5: Rationalization
Rationalize 1/(√5 - √3)

**Solution**: Multiply by √5 + √3:
(√5 + √3)/((√5 - √3)(√5 + √3)) = (√5 + √3)/(5 - 3) = (√5 + √3)/2

Master square roots and cube roots for geometry and algebra problems! 🚀`
};
