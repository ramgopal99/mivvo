import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_12: SubLesson = {
  id: "2.12",
  title: 'Powers & Exponents',
  status: 'completed',
  content: `# 🔢 Powers & Exponents

Powers and exponents are fundamental concepts in mathematics with extensive applications in algebra, calculus, and quantitative aptitude. Understanding exponent rules and properties is essential for solving complex numerical problems efficiently.

---

## 🎯 Basic Concepts

### What is an Exponent?
An exponent indicates how many times a number (base) is multiplied by itself.

**Notation**: a^n (a raised to power n)

**Examples**:
- 2³ = 2 × 2 × 2 = 8
- 5² = 5 × 5 = 25
- 10⁴ = 10 × 10 × 10 × 10 = 10000

---

## 📊 Laws of Exponents

### 1. **Multiplication Law**
a^m × a^n = a^(m+n)

**Example**: 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128

### 2. **Division Law**
a^m ÷ a^n = a^(m-n)

**Example**: 5⁴ ÷ 5² = 5^(4-2) = 5² = 25

### 3. **Power of Power**
(a^m)^n = a^(m×n)

**Example**: (2³)⁴ = 2^(3×4) = 2¹² = 4096

### 4. **Product Rule**
(a × b)^n = a^n × b^n

**Example**: (2 × 3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1296

### 5. **Quotient Rule**
(a/b)^n = a^n / b^n

**Example**: (4/2)³ = 4³ / 2³ = 64 / 8 = 8

### 6. **Zero Exponent**
a⁰ = 1 (for a ≠ 0)

**Example**: 5⁰ = 1, 100⁰ = 1

### 7. **Negative Exponent**
a^(-n) = 1/a^n

**Example**: 2^(-3) = 1/2³ = 1/8

### 8. **Fractional Exponent**
a^(m/n) = (a^m)^(1/n) = (a^(1/n))^m

**Example**: 8^(2/3) = (8²)^(1/3) = 64^(1/3) = 4
Or: 8^(2/3) = (8^(1/3))² = 2² = 4

---

## 🧮 Advanced Exponent Rules

### 1. **Different Bases, Same Exponent**
a^n × b^n = (a × b)^n

**Example**: 2³ × 3³ = (2 × 3)³ = 6³ = 216

### 2. **Same Base, Different Exponents**
a^m / a^n = a^(m-n)

### 3. **Mixed Operations**
Combine multiple rules.

**Example**: Simplify (2² × 3³)⁴ ÷ (2³ × 3²)

**Solution**: = (2^(2×4) × 3^(3×4)) ÷ (2³ × 3²)
= (2⁸ × 3¹²) ÷ (2³ × 3²)
= 2^(8-3) × 3^(12-2)
= 2⁵ × 3¹⁰ = 32 × 59049 = 1,889,568

---

## 🎯 Special Cases and Patterns

### 1. **Powers of 10**
10^n follows place value system.

**Examples**:
- 10⁰ = 1
- 10¹ = 10
- 10² = 100
- 10³ = 1000

### 2. **Powers of 2**
Binary system, doubling pattern.

### 3. **Powers of Negative Numbers**
Alternating signs based on exponent.

**Example**: (-2)³ = -8, (-2)⁴ = 16

### 4. **Powers of Fractions**
Apply rules carefully.

**Example**: (1/2)³ = 1/8

---

## 🧠 Problem Solving Tricks

### Trick 1: **Simplify Complex Expressions**
Break down into simpler parts.

**Example**: Simplify (2³ × 3² × 5)/(2² × 3 × 7)

**Solution**: = 2^(3-2) × 3^(2-1) × 5/7 = 2¹ × 3¹ × 5/7 = 30/7

### Trick 2: **Find Missing Exponent**
Use known relationships.

**Example**: If 2^x × 3^y = 72, find x and y.

**Solution**: 72 = 2³ × 3², so x=3, y=2

### Trick 3: **Compare Powers**
For same base, higher exponent = larger number.

### Trick 4: **Scientific Notation**
Express large numbers as powers of 10.

**Example**: 5000 = 5 × 10³

---

## 📊 Exponent Applications

### 1. **Compound Interest**
A = P(1 + r/n)^(nt)

### 2. **Population Growth**
P = P₀e^(rt)

### 3. **Radioactive Decay**
N = N₀e^(-λt)

### 4. **Logarithms**
log_b(a) = x means b^x = a

---

## 🔍 Advanced Concepts

### 1. **Irrational Exponents**
Like √2, π, e

### 2. **Complex Exponents**
Euler's formula: e^(iθ) = cosθ + i sinθ

### 3. **Exponential Equations**
Solve equations involving exponents.

**Example**: Solve 2^x = 8

**Solution**: 2^x = 2³ → x = 3

### 4. **Exponential Inequalities**
**Example**: Solve 3^x > 27

**Solution**: 3^x > 3³ → x > 3

---

## 🎯 Common Problem Types

### Type 1: **Simplify Expressions**
**Example**: Simplify (2³ × 3²)⁴ ÷ (2⁵ × 3³)

**Solution**: = 2^(12) × 3^8 ÷ 2^5 × 3^3
= 2^(12-5) × 3^(8-3)
= 2⁷ × 3⁵ = 128 × 243 = 31,104

### Type 2: **Compare Powers**
**Example**: Which is larger: 2^10 or 10^2?

**Solution**: 2^10 = 1024, 10^2 = 100, so 2^10 > 10^2

### Type 3: **Find Unknown Exponent**
**Example**: If 3^x × 5^y = 225, find x + y.

**Solution**: 225 = 3² × 5², so x=2, y=2, x+y=4

### Type 4: **Fractional Powers**
**Example**: Simplify (8^(2/3) × 4^(1/2))

**Solution**: 8^(2/3) = (2³)^(2/3) = 2² = 4
4^(1/2) = 2
4 × 2 = 8

---

## 🧮 Exponential Identities

### 1. **Sum of Powers**
a^n + a^m = a^m(a^(n-m) + 1)

### 2. **Difference of Powers**
a^n - a^m = a^m(a^(n-m) - 1)

### 3. **Binomial Expansion**
(a + b)^n = Σ C(n,k) a^(n-k) b^k

### 4. **Geometric Series**
Sum = a(r^n - 1)/(r - 1) for r ≠ 1

---

## 📝 Practice Examples

### Example 1: Basic Laws
Simplify (3² × 2³) ÷ (3³ × 2²)

**Solution**: 3^(2-3) × 2^(3-2) = 3^(-1) × 2^1 = 2/3

### Example 2: Complex Expression
Simplify (2^3 × 5^2 × 3^4) / (2^2 × 3^2 × 5)

**Solution**: 2^(3-2) × 5^(2-1) × 3^(4-2) = 2^1 × 5^1 × 3^2 = 2 × 5 × 9 = 90

### Example 3: Negative Exponents
Simplify 2^3 × 3^(-2) × 5^0

**Solution**: 8 × (1/9) × 1 = 8/9

### Example 4: Fractional Powers
Simplify 16^(3/4)

**Solution**: 16^(3/4) = (2^4)^(3/4) = 2^(4×3/4) = 2^3 = 8

### Example 5: Equation Solving
Solve 3^(x+1) = 27

**Solution**: 3^(x+1) = 3^3 → x+1 = 3 → x = 2

### Example 6: Inequality
Solve 4^x > 64

**Solution**: 4^x > 4^3 → x > 3

Master powers and exponents to solve complex mathematical problems! 🚀`
};

