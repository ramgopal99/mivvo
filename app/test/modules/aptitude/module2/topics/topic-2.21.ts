import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_21: SubLesson = {
  id: "2.21",
  title: 'Highest Power of a Number in Factorial',
  status: 'completed',
  content: `# 🔢 Highest Power of a Number in Factorial

Finding the highest power of a number that divides a factorial is a crucial concept in number theory. This helps determine how many times a prime or composite number appears as a factor in n!.

---

## 🎯 Basic Concept

The highest power of a prime p that divides n! is given by:

**Formula**: floor(n/p) + floor(n/p²) + floor(n/p³) + ... 

**Example**: Highest power of 2 in 10!
\`\`\`
floor(10/2) + floor(10/4) + floor(10/8) = 5 + 2 + 1 = 8
So 2^8 divides 10!, but 2^9 does not
\`\`\`

---

## 📊 For Prime Numbers

### Method 1: **Direct Formula**
For prime p: floor(n/p) + floor(n/p²) + floor(n/p³) + ...

**Example**: Highest power of 5 in 50!
\`\`\`
floor(50/5) + floor(50/25) + floor(50/125) = 10 + 2 + 0 = 12
So 5^12 divides 50!
\`\`\`

### Method 2: **Step-by-Step Calculation**
Keep dividing n by increasing powers of p.

**Example**: Highest power of 7 in 100!
\`\`\`
floor(100/7) = 14
floor(100/49) = 2
floor(100/343) = 0
Total: 14 + 2 = 16
\`\`\`

---

## 🧮 For Composite Numbers

### Method 1: **Prime Factorization**
Express the number as product of primes, then find minimum of the powers.

**Example**: Highest power of 12 in 50!
\`\`\`
12 = 2² × 3
Power of 2 in 50!: floor(50/2)+floor(50/4)+floor(50/8)+floor(50/16)+floor(50/32) = 25+12+6+3+1 = 47
Power of 3 in 50!: floor(50/3)+floor(50/9)+floor(50/27) = 16+5+1 = 22
For 12=2²×3: min(floor(47/2), 22) = min(23, 22) = 22
So 12^22 divides 50!
\`\`\`

### Method 2: **Direct Division**
Keep dividing n! by increasing powers of the composite number.

---

## 🎯 Special Cases

### 1. **Power of 2 in n!**
Always more than power of any odd prime.

### 2. **Trailing Zeros (Power of 10)**
Power of 10 = min(power of 2, power of 5)

### 3. **Power of 4 in n!**
Since 4=2², power = floor( (power of 2 in n!) / 2 )

### 4. **Power of 8 in n!**
Since 8=2³, power = floor( (power of 2 in n!) / 3 )

---

## 🧠 Problem Solving Tricks

### Trick 1: **For Prime Powers**
Use the standard formula directly.

### Trick 2: **For Composite Numbers**
Factorize and find limiting prime factor.

### Trick 3: **Quick Estimation**
For large n, approximate using n/(p-1) for prime p.

### Trick 4: **Pattern Recognition**
Powers increase significantly at multiples of p, p², etc.

---

## 📊 Applications in Aptitude

### 1. **Factorial Divisibility**
**Example**: Does 50! have 12^20 as a factor?

**Solution**: Check if power of 12 in 50! ≥ 20
Power of 12 = 22 (from earlier), 22 ≥ 20, yes

### 2. **Trailing Zeros**
**Example**: How many trailing zeros in 100!?

**Solution**: min(power of 2, power of 5) in 100!
Power of 5: floor(100/5)+floor(100/25)+floor(100/125)=20+4+0=24
So 24 trailing zeros

### 3. **Highest Common Factor**
**Example**: Find HCF of 50! and 100!

**Solution**: HCF is determined by minimum powers in each factorial

### 4. **Comparison Problems**
**Example**: Compare highest powers in different factorials

---

## 🔍 Advanced Concepts

### 1. **Legendre's Formula**
The formula floor(n/p) + floor(n/p²) + ... is called Legendre's formula.

### 2. **Kummer's Theorem**
For binomial coefficients, the power of p is floor( (a+b)/p ) - floor(a/p) - floor(b/p)

### 3. **P-adic Valuation**
The highest power of p dividing n! is the p-adic valuation.

### 4. **Sylvester's Formula**
Alternative way to compute the power.

---

## 🧮 Calculation Examples

### Example 1: Prime Power
Find highest power of 3 in 20!

**Solution**: floor(20/3) + floor(20/9) + floor(20/27) = 6 + 2 + 0 = 8

### Example 2: Composite Power
Find highest power of 6 in 15!

**Solution**: 6 = 2 × 3
Power of 2: floor(15/2)+floor(15/4)+floor(15/8)=7+3+1=11
Power of 3: floor(15/3)+floor(15/9)=5+1=6
For 6=2×3: min(11,6) = 6

### Example 3: High Power Prime
Find highest power of 7 in 50!

**Solution**: floor(50/7) + floor(50/49) = 7 + 1 = 8

### Example 4: Power of 4
Find highest power of 4 in 20!

**Solution**: Power of 2 in 20! = floor(20/2)+floor(20/4)+floor(20/8)+floor(20/16)=10+5+2+1=18
Power of 4 = 2², so floor(18/2) = 9

### Example 5: Large Factorial
Find highest power of 13 in 100!

**Solution**: floor(100/13) + floor(100/169) = 7 + 0 = 7

### Example 6: Comparison
Which has higher power of 5: 24! or 25!?

**Solution**: 24!: floor(24/5)=4, 25!: floor(25/5)+floor(25/25)=5+1=6
25! has higher power

### Example 7: Complex Composite
Find highest power of 24 in 30!

**Solution**: 24 = 2³ × 3
Power of 2: floor(30/2)+floor(30/4)+floor(30/8)+floor(30/16)=15+7+3+1=26
Power of 3: floor(30/3)+floor(30/9)+floor(30/27)=10+3+1=14
For 24=2³×3: min(floor(26/3),14) = min(8,14) = 8

Master finding highest powers in factorials for advanced number theory problems! 🚀`
};

