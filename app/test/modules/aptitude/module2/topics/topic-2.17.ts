import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_17: SubLesson = {
  id: "2.17",
  title: 'Approximation',
  status: 'completed',
  content: "`# ðŸ”¢ Approximation

Approximation is the process of finding an approximate value that is close enough to the exact value for practical purposes. This technique is essential in quantitative aptitude for quick calculations and estimating results.

---

## ðŸŽ¯ What is Approximation?

Approximation involves:
- Rounding numbers to suitable decimal places
- Using approximate values for complex calculations
- Estimating results when exact calculation is difficult
- Balancing accuracy with practicality

---

## ðŸ“Š Rounding Rules

### 1. **Basic Rounding**
- **0-4**: Round down
- **5-9**: Round up

**Example**: Round 3.67 to 1 decimal place
\`"\`\`
3.67 â†’ 3.7 (6 â‰¥ 5, round up)
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

## ðŸ§® Approximation Techniques

### 1. **Using Approximate Values**
Replace numbers with nearby easy-to-calculate values.

**Example**: Calculate 49.8 Ã— 50.2
\`\`\`
50 Ã— 50 = 2500
Exact: 49.8 Ã— 50.2 = 2500 - 49.8Ã—0.2 - 50.2Ã—0.2 + 0.2Ã—0.2 â‰ˆ 2500
Better approximation: 2500
\`\`\`

### 2. **Fraction Approximation**
Use nearby fractions for decimals.

**Example**: Approximate 0.333...
\`\`\`
â‰ˆ 1/3
\`\`\`

### 3. **Square Root Approximation**
Use nearby perfect squares.

**Example**: Approximate âˆš17
\`\`\`
4Â² = 16, 5Â² = 25
âˆš17 â‰ˆ 4.123, closer to 4
\`\`\`

---

## ðŸŽ¯ Common Approximation Methods

### Method 1: **Linear Approximation**
For small changes: f(x + h) â‰ˆ f(x) + h f'(x)

### Method 2: **Percentage Approximation**
For small percentages: (1 + r%) â‰ˆ 1 + r/100

**Example**: 5% increase on 200
\`\`\`
200 Ã— 1.05 â‰ˆ 210
\`\`\`

### Method 3: **Product Approximation**
For a Ã— b where a â‰ˆ x, b â‰ˆ y
(a Ã— b) â‰ˆ x Ã— y

---

## ðŸ§  Approximation Tricks

### Trick 1: **Replace with Nearby Numbers**
Use numbers that are easy to calculate with.

**Example**: Approximate 998 Ã— 1002
\`\`\`
1000 Ã— 1000 = 1,000,000
But better: (1000 - 2) Ã— (1000 + 2) = 1000Â² - 2Â² = 1,000,000 - 4 = 999,996
\`\`\`

### Trick 2: **Use Powers of 10**
Round to nearest power of 10.

**Example**: Approximate 456 Ã— 789
\`\`\`
500 Ã— 800 = 400,000 (rough)
450 Ã— 790 = 355,500 (better)
\`\`\`

### Trick 3: **Square Approximation**
Use (a + b)Â² = aÂ² + 2ab + bÂ²

**Example**: Approximate 31Â²
\`\`\`
30Â² + 2Ã—30Ã—1 + 1Â² = 900 + 60 + 1 = 961
\`\`\`

### Trick 4: **Fraction to Decimal**
Use simple fractions.

**Example**: Approximate 22/7
\`\`\`
â‰ˆ 3.142857 â‰ˆ 3.14
\`\`\`

---

## ðŸ“Š Error Estimation

### 1. **Absolute Error**
|Approximate - Exact|

### 2. **Relative Error**
|Approximate - Exact| / |Exact|

### 3. **Percentage Error**
Relative Error Ã— 100%

**Example**: Approximate Ï€ as 3.14, exact is 3.14159
\`\`\`
Absolute error: |3.14 - 3.14159| = 0.00159
Relative error: 0.00159/3.14159 â‰ˆ 0.000506
Percentage error: 0.0506%
\`\`\`

---

## ðŸŽ¯ Applications in Aptitude

### 1. **Large Number Calculations**
**Example**: Approximate 9876 Ã— 5432
\`\`\`
10,000 Ã— 5000 = 50,000,000 (very rough)
9800 Ã— 5400 = 52,920,000 (better)
\`\`\`

### 2. **Percentage Problems**
**Example**: 4.9% of 1998
\`\`\`
5% of 2000 = 100
So approximately 99.8
\`\`\`

### 3. **Interest Calculations**
**Example**: Simple interest on â‚¹999 at 5% for 2 years
\`\`\`
1000 Ã— 0.05 Ã— 2 = 100
So approximately â‚¹100
\`\`\`

### 4. **Square Root Problems**
**Example**: Approximate âˆš(50)
\`\`\`
7Â² = 49, 8Â² = 64
âˆš50 â‰ˆ 7.07
\`\`\`

---

## ðŸ” Advanced Approximation Techniques

### 1. **Taylor Series Approximation**
f(x + h) â‰ˆ f(x) + h f'(x) + (hÂ²/2) f''(x) + ...

### 2. **Newton's Method**
Iterative approximation for roots.

### 3. **Binomial Approximation**
(1 + x)^n â‰ˆ 1 + nx for small x

### 4. **Logarithmic Approximation**
ln(1 + x) â‰ˆ x for small x

---

## ðŸ§® Practical Approximation Rules

### Rule 1: **Multiplication by 1.01**
â‰ˆ 1 + 0.01 = 1.01

### Rule 2: **Division by 1.01**
â‰ˆ 1 - 0.01 = 0.99

### Rule 3: **Square Root of Large Numbers**
Use the formula: âˆš(aÂ² + b) â‰ˆ a + b/(2a)

**Example**: âˆš(100 + 3) â‰ˆ 10 + 3/20 = 10.15

### Rule 4: **Cube Root Approximation**
Similar approach for cube roots.

---

## ðŸ“ Practice Examples

### Example 1: Basic Rounding
Round 7.894 to 2 decimal places

**Solution**: 7.89 (4 < 5, round down)

### Example 2: Product Approximation
Approximate 99 Ã— 101

**Solution**: (100 - 1)(100 + 1) = 100Â² - 1Â² = 10,000 - 1 = 9,999

### Example 3: Square Root
Approximate âˆš(24)

**Solution**: 5Â² = 25, 4Â² = 16, so between 4 and 5
4.8Â² = 23.04, 4.9Â² = 24.01, so â‰ˆ 4.9

### Example 4: Percentage
Approximate 12.5% of 248

**Solution**: 12.5% = 1/8, so 248 Ã· 8 = 31

### Example 5: Complex Calculation
Approximate (1.01)^5

**Solution**: Using binomial: (1 + 0.01)^5 â‰ˆ 1 + 5Ã—0.01 = 1.05

### Example 6: Interest Calculation
Approximate compound interest on â‚¹10,000 at 5% for 2 years

**Solution**: Simple: 10,000 Ã— 0.05 Ã— 2 = 1,000
Compound: â‰ˆ 1,000 + (1,000 Ã— 0.05) = 1,050

### Example 7: Error Estimation
Approximate 3.14159 as 3.14. Find percentage error.

**Solution**: |3.14 - 3.14159| / 3.14159 Ã— 100% â‰ˆ 0.000506 Ã— 100% â‰ˆ 0.0506%

Master approximation techniques for quick and accurate calculations in aptitude problems! ðŸš€`
};


