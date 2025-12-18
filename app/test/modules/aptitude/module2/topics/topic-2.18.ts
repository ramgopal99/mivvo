import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_18: SubLesson = {
  id: "2.18",
  title: 'Comparison of Numbers',
  status: 'completed',
  content: `# 🔢 Comparison of Numbers

Comparing numbers is a fundamental skill in quantitative aptitude. Understanding different methods to compare various types of numbers (integers, fractions, decimals, powers) helps solve problems efficiently.

---

## 🎯 Basic Comparison

### 1. **Integer Comparison**
Direct comparison using place values.

**Example**: Compare 456 and 567
\`\`\`
456 < 567 (first digits: 4 < 5)
\`\`\`

### 2. **Decimal Comparison**
Compare digit by digit from left to right.

**Example**: Compare 3.14 and 3.08
\`\`\`
3.14 > 3.08 (tenths place: 1 > 0)
\`\`\`

---

## 📊 Comparing Fractions

### Method 1: **Cross Multiplication**
For a/b and c/d, compare a×d and b×c

**Example**: Compare 2/3 and 3/4
\`\`\`
2 × 4 = 8, 3 × 3 = 9
8 < 9, so 2/3 < 3/4
\`\`\`

### Method 2: **Common Denominator**
Convert to same denominator.

**Example**: Compare 1/3 and 2/5
\`\`\`
Common denominator 15: 5/15 and 6/15
5/15 < 6/15, so 1/3 < 2/5
\`\`\`

### Method 3: **Decimal Conversion**
Convert to decimals and compare.

**Example**: Compare 5/8 and 0.625
\`\`\`
5/8 = 0.625, so equal
\`\`\`

---

## 🧮 Comparing Powers and Exponents

### 1. **Same Base**
Higher exponent = larger number (for base > 1)

**Example**: Compare 2³ and 2⁵
\`\`\`
2⁵ > 2³ (5 > 3)
\`\`\`

### 2. **Same Exponent**
Higher base = larger number

**Example**: Compare 3² and 4²
\`\`\`
16 > 9, so 4² > 3²
\`\`\`

### 3. **Different Bases and Exponents**
Take logarithms or compare directly.

**Example**: Compare 2⁴ and 3³
\`\`\`
16 and 27, so 3³ > 2⁴
\`\`\`

### 4. **Fractional Powers**
Compare using common exponents.

**Example**: Compare 4^(1/2) and 8^(1/3)
\`\`\`
√4 = 2, ∛8 = 2, so equal
\`\`\`

---

## 🎯 Advanced Comparison Techniques

### 1. **Using Ratios**
Compare by taking ratios.

**Example**: Compare √2 and √3
\`\`\`
√2 ≈ 1.414, √3 ≈ 1.732
So √3 > √2
\`\`\`

### 2. **Using Logarithms**
For complex comparisons.

**Example**: Compare 2^10 and 10^2
\`\`\`
2^10 = 1024, 10^2 = 100
1024 > 100, so 2^10 > 10^2
\`\`\`

### 3. **Using Inequalities**
Apply mathematical inequalities.

**Example**: Compare (1 + 1/n)^n and e
\`\`\`
As n → ∞, approaches e ≈ 2.718
\`\`\`

---

## 🧠 Comparison Tricks

### Trick 1: **Convert to Same Form**
Convert all numbers to same format (decimal, fraction, etc.)

### Trick 2: **Use Cross Multiplication**
Quick method for fractions: a/b ? c/d iff a×d ? b×c

### Trick 3: **Compare with Reference**
Compare each number to a common reference point.

**Example**: Compare 0.7, 7/10, 70%
\`\`\`
All equal to 0.7
\`\`\`

### Trick 4: **Square or Cube Comparison**
For square roots and cube roots.

**Example**: Compare √5 and √7
\`\`\`
5 < 7, so √5 < √7
\`\`\`

---

## 📊 Comparing Special Numbers

### 1. **Irrational Numbers**
Use approximations or inequalities.

**Example**: Compare π and √10
\`\`\`
π ≈ 3.1416, √10 ≈ 3.1623
So π < √10
\`\`\`

### 2. **Very Large Numbers**
Use scientific notation.

**Example**: Compare 10^6 and 2^20
\`\`\`
10^6 = 1,000,000
2^20 = 1,048,576
So 2^20 > 10^6
\`\`\`

### 3. **Very Small Numbers**
Compare decimal places.

**Example**: Compare 0.001 and 0.0001
\`\`\`
0.001 > 0.0001
\`\`\`

---

## 🎯 Applications in Aptitude

### 1. **Percentage Comparison**
**Example**: Compare 25%, 1/4, 0.25
\`\`\`
All equal
\`\`\`

### 2. **Ratio Comparison**
**Example**: Which is larger: 3:4 or 5:6?
\`\`\`
3/4 = 0.75, 5/6 ≈ 0.833
So 5:6 > 3:4
\`\`\`

### 3. **Rate Comparison**
**Example**: Compare speeds 60 km/h and 50 m/min
\`\`\`
60 km/h = 1000 m/min
50 m/min < 1000 m/min
\`\`\`

### 4. **Growth Comparison**
**Example**: Compare 5% and 6% growth rates
\`\`\`
6% > 5%, so higher growth
\`\`\`

---

## 🔍 Comparison with Inequalities

### 1. **Transitive Property**
If a > b and b > c, then a > c

### 2. **Arithmetic Mean vs Geometric Mean**
AM ≥ GM for positive numbers

**Example**: Compare 2 and √2
\`\`\`
AM = (2 + √2)/2 ≈ 1.707
GM = √(2×√2) = √(2√2) = √(2^{3/2}) = 2^{3/4} ≈ 1.682
AM > GM
\`\`\`

### 3. **Using Derivatives**
For function comparison.

---

## 🧮 Comparison Algorithms

### 1. **For Fractions**
- Cross multiplication
- Common denominator
- Decimal conversion

### 2. **For Powers**
- Same base: compare exponents
- Same exponent: compare bases
- Different: calculate values or use logs

### 3. **For Irrationals**
- Use approximations
- Compare squares or cubes
- Use known values

---

## 📝 Practice Examples

### Example 1: Fraction Comparison
Compare 3/7 and 4/9

**Solution**: Cross multiplication: 3×9 = 27, 7×4 = 28
27 < 28, so 3/7 < 4/9

### Example 2: Decimal Comparison
Compare 1.234 and 1.235

**Solution**: 1.234 < 1.235 (thousandths place: 4 < 5)

### Example 3: Power Comparison
Compare 3^4 and 4^3

**Solution**: 81 and 64, so 3^4 > 4^3

### Example 4: Root Comparison
Compare √15 and √10

**Solution**: 15 > 10, so √15 > √10

### Example 5: Mixed Comparison
Compare 0.75, 3/4, 75%

**Solution**: All equal to 0.75

### Example 6: Complex Comparison
Compare 2^10 and 10^2

**Solution**: 1024 > 100, so 2^10 > 10^2

### Example 7: Percentage Comparison
Which is larger: 37.5% or 3/8?

**Solution**: 37.5% = 0.375, 3/8 = 0.375, equal

### Example 8: Rate Comparison
Compare ₹50 per kg and ₹1.50 per 100g

**Solution**: ₹1.50 per 100g = ₹15 per kg
₹50 per kg > ₹15 per kg

Master comparison techniques to quickly determine which number is larger or smaller! 🚀`
};

