import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_17: SubLesson = {
  id: "2.17",
  title: 'Approximation',
  status: 'completed',
  content: `# 🔢 Approximation

Approximation is the process of finding an approximate value that is close enough to the exact value for practical purposes. This technique is essential in quantitative aptitude for quick calculations and estimating results.

---

## 🎯 What is Approximation?

Approximation involves:
- Rounding numbers to suitable decimal places
- Using approximate values for complex calculations
- Estimating results when exact calculation is difficult
- Balancing accuracy with practicality

---

## 📊 Rounding Rules

### 1. **Basic Rounding**
- **0-4**: Round down
- **5-9**: Round up

**Example**: Round 3.67 to 1 decimal place
\`\`\`
3.67 → 3.7 (6 ≥ 5, round up)
\`\`\`

### 2. **Significant Figures**
Keep specified number of significant digits.

**Example**: Round 156.78 to 3 significant figures
\`\`\`
157 (rounded up)
\`\`\`

### 3. **Decimal Places vs Significant Figures**
- Decimal places: Count after decimal point
- Significant figures: Count all digits including before decimal

---

## 🧮 Approximation Techniques

### 1. **Using Approximate Values**
Replace numbers with nearby easy-to-calculate values.

**Example**: Calculate 49.8 × 50.2
\`\`\`
50 × 50 = 2500
Exact: 49.8 × 50.2 = 2500 - 49.8×0.2 - 50.2×0.2 + 0.2×0.2 ≈ 2500
Better approximation: 2500
\`\`\`

### 2. **Fraction Approximation**
Use nearby fractions for decimals.

**Example**: Approximate 0.333...
\`\`\`
≈ 1/3
\`\`\`

### 3. **Square Root Approximation**
Use nearby perfect squares.

**Example**: Approximate √17
\`\`\`
4² = 16, 5² = 25
√17 ≈ 4.123, closer to 4
\`\`\`

---

## 🎯 Common Approximation Methods

### Method 1: **Linear Approximation**
For small changes: f(x + h) ≈ f(x) + h f'(x)

### Method 2: **Percentage Approximation**
For small percentages: (1 + r%) ≈ 1 + r/100

**Example**: 5% increase on 200
\`\`\`
200 × 1.05 ≈ 210
\`\`\`

### Method 3: **Product Approximation**
For a × b where a ≈ x, b ≈ y
(a × b) ≈ x × y

---

## 🧠 Approximation Tricks

### Trick 1: **Replace with Nearby Numbers**
Use numbers that are easy to calculate with.

**Example**: Approximate 998 × 1002
\`\`\`
1000 × 1000 = 1,000,000
But better: (1000 - 2) × (1000 + 2) = 1000² - 2² = 1,000,000 - 4 = 999,996
\`\`\`

### Trick 2: **Use Powers of 10**
Round to nearest power of 10.

**Example**: Approximate 456 × 789
\`\`\`
500 × 800 = 400,000 (rough)
450 × 790 = 355,500 (better)
\`\`\`

### Trick 3: **Square Approximation**
Use (a + b)² = a² + 2ab + b²

**Example**: Approximate 31²
\`\`\`
30² + 2×30×1 + 1² = 900 + 60 + 1 = 961
\`\`\`

### Trick 4: **Fraction to Decimal**
Use simple fractions.

**Example**: Approximate 22/7
\`\`\`
≈ 3.142857 ≈ 3.14
\`\`\`

---

## 📊 Error Estimation

### 1. **Absolute Error**
|Approximate - Exact|

### 2. **Relative Error**
|Approximate - Exact| / |Exact|

### 3. **Percentage Error**
Relative Error × 100%

**Example**: Approximate π as 3.14, exact is 3.14159
\`\`\`
Absolute error: |3.14 - 3.14159| = 0.00159
Relative error: 0.00159/3.14159 ≈ 0.000506
Percentage error: 0.0506%
\`\`\`

---

## 🎯 Applications in Aptitude

### 1. **Large Number Calculations**
**Example**: Approximate 9876 × 5432
\`\`\`
10,000 × 5000 = 50,000,000 (very rough)
9800 × 5400 = 52,920,000 (better)
\`\`\`

### 2. **Percentage Problems**
**Example**: 4.9% of 1998
\`\`\`
5% of 2000 = 100
So approximately 99.8
\`\`\`

### 3. **Interest Calculations**
**Example**: Simple interest on ₹999 at 5% for 2 years
\`\`\`
1000 × 0.05 × 2 = 100
So approximately ₹100
\`\`\`

### 4. **Square Root Problems**
**Example**: Approximate √(50)
\`\`\`
7² = 49, 8² = 64
√50 ≈ 7.07
\`\`\`

---

## 🔍 Advanced Approximation Techniques

### 1. **Taylor Series Approximation**
f(x + h) ≈ f(x) + h f'(x) + (h²/2) f''(x) + ...

### 2. **Newton's Method**
Iterative approximation for roots.

### 3. **Binomial Approximation**
(1 + x)^n ≈ 1 + nx for small x

### 4. **Logarithmic Approximation**
ln(1 + x) ≈ x for small x

---

## 🧮 Practical Approximation Rules

### Rule 1: **Multiplication by 1.01**
≈ 1 + 0.01 = 1.01

### Rule 2: **Division by 1.01**
≈ 1 - 0.01 = 0.99

### Rule 3: **Square Root of Large Numbers**
Use the formula: √(a² + b) ≈ a + b/(2a)

**Example**: √(100 + 3) ≈ 10 + 3/20 = 10.15

### Rule 4: **Cube Root Approximation**
Similar approach for cube roots.

---

## 📝 Practice Examples

### Example 1: Basic Rounding
Round 7.894 to 2 decimal places

**Solution**: 7.89 (4 < 5, round down)

### Example 2: Product Approximation
Approximate 99 × 101

**Solution**: (100 - 1)(100 + 1) = 100² - 1² = 10,000 - 1 = 9,999

### Example 3: Square Root
Approximate √(24)

**Solution**: 5² = 25, 4² = 16, so between 4 and 5
4.8² = 23.04, 4.9² = 24.01, so ≈ 4.9

### Example 4: Percentage
Approximate 12.5% of 248

**Solution**: 12.5% = 1/8, so 248 ÷ 8 = 31

### Example 5: Complex Calculation
Approximate (1.01)^5

**Solution**: Using binomial: (1 + 0.01)^5 ≈ 1 + 5×0.01 = 1.05

### Example 6: Interest Calculation
Approximate compound interest on ₹10,000 at 5% for 2 years

**Solution**: Simple: 10,000 × 0.05 × 2 = 1,000
Compound: ≈ 1,000 + (1,000 × 0.05) = 1,050

### Example 7: Error Estimation
Approximate 3.14159 as 3.14. Find percentage error.

**Solution**: |3.14 - 3.14159| / 3.14159 × 100% ≈ 0.000506 × 100% ≈ 0.0506%

Master approximation techniques for quick and accurate calculations in aptitude problems! 🚀`
};

