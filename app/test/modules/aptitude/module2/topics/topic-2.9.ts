import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_9: SubLesson = {
  id: "2.9",
  title: 'Sum of Factors',
  status: 'completed',
  content: `# 🔢 Sum of Factors

The sum of factors of a number is a fundamental concept in number theory with important applications in algebra and number properties. Understanding how to calculate and work with factor sums is crucial for solving advanced aptitude problems.

---

## 🎯 Basic Concept

### What is Sum of Factors?
The sum of all factors (divisors) of a number n, including 1 and n itself.

**Example**: Sum of factors of 12: 1 + 2 + 3 + 4 + 6 + 12 = 28

---

## 📊 Formula for Sum of Factors

### Prime Factorization Formula
If n = p₁^a × p₂^b × p₃^c × ... × pₖ^k
Then sum of factors = [(p₁^(a+1)-1)/(p₁-1)] × [(p₂^(b+1)-1)/(p₂-1)] × ... × [(pₖ^(k+1)-1)/(pₖ-1)]

### Why This Works
Each prime factor contributes a geometric series:
- For p₁^a: Sum = 1 + p₁ + p₁² + ... + p₁^a = (p₁^(a+1) - 1)/(p₁ - 1)
- Same for each prime factor
- Product of all these geometric series gives total sum

**Example**: Sum of factors of 84
\`\`\`
84 = 2² × 3¹ × 7¹
Sum = [(2³-1)/(2-1)] × [(3²-1)/(3-1)] × [(7²-1)/(7-1)]
    = (8-1)/1 × (9-1)/2 × (49-1)/6
    = 7 × 4 × 8 = 224

Factors: 1+2+3+4+6+7+12+14+21+28+42+84 = 224 ✓
\`\`\`

---

## 🧠 Sum of Factors Tricks

### Trick 1: **For Perfect Squares**
Sum of factors includes the square root twice in the counting, but once in the sum.

### Trick 2: **For Prime Numbers**
Sum of factors of prime p: 1 + p

### Trick 3: **For Powers of 2**
Sum of factors of 2^n: 1 + 2 + 4 + ... + 2^n = 2^(n+1) - 1

**Example**: Sum of factors of 16 (2^4) = 2^5 - 1 = 32 - 1 = 31

### Trick 4: **Perfect Numbers**
A number n is perfect if sum of proper divisors equals n.

**Example**: 6 = 1 + 2 + 3 (proper divisors)
28 = 1 + 2 + 4 + 7 + 14 (proper divisors)

---

## 🎯 Types of Factor Sums

### 1. **Sum of All Factors**
Includes 1 and the number itself.

### 2. **Sum of Proper Divisors**
All factors except the number itself.

**Example**: Proper divisors of 12: 1, 2, 3, 4, 6 → Sum = 16

### 3. **Sum of Odd Factors**
Ignore the power of 2 in prime factorization.

**Example**: Sum of odd factors of 60
\`\`\`
60 = 2² × 3¹ × 5¹
Odd part: 3¹ × 5¹
Sum = (3²-1)/(3-1) × (5²-1)/(5-1) = (9-1)/2 × (25-1)/4 = 4 × 6 = 24
\`\`\`

### 4. **Sum of Even Factors**
Total sum - sum of odd factors.

---

## 📈 Advanced Factor Sum Concepts

### 1. **Abundant Numbers**
Sum of proper divisors > number itself.

**Example**: 12: proper divisors 1+2+3+4+6=16 > 12

### 2. **Deficient Numbers**
Sum of proper divisors < number itself.

**Example**: 8: proper divisors 1+2+4=7 < 8

### 3. **Multiplicative Function**
Sum of factors is multiplicative: σ(ab) = σ(a) × σ(b) if gcd(a,b)=1

### 4. **Highly Composite Numbers**
Numbers with many factors, hence large factor sums.

---

## 🔍 Factor Sum Properties

### Property 1: **For Powers**
Sum of factors of p^n = (p^(n+1) - 1)/(p - 1)

### Property 2: **For Products**
If gcd(a,b)=1, then σ(a×b) = σ(a) × σ(b)

### Property 3: **Perfect Squares**
Sum of factors of perfect squares is odd.

### Property 4: **Prime Factors**
More prime factors generally mean larger factor sums.

---

## 🎯 Applications in Problem Solving

### 1. **Finding Numbers with Given Factor Sum**
**Example**: Find number whose sum of factors is 60.

**Solution**: Possible factor sums for small numbers:
- 12: 1+2+3+4+6+12=28
- 14: 1+2+7+14=24
- 15: 1+3+5+15=24
- 16: 1+2+4+8+16=31
- 18: 1+2+3+6+9+18=39
- 20: 1+2+4+5+10+20=42
- 21: 1+3+7+21=32
- 24: 1+2+3+4+6+8+12+24=60 ✓

### 2. **Checking Perfect Numbers**
**Example**: Is 496 a perfect number?

**Solution**: Sum of proper divisors of 496
496 = 16 × 31 = 2^4 × 31
Sum = (2^5-1)/(2-1) × (31^2-1)/(31-1) = 31 × (961-1)/30 = 31 × 960/30 = 31 × 32 = 992
Proper divisors sum = 992 - 496 = 496 ✓

### 3. **Factor Sum in Equations**
**Example**: If σ(n) = 2n, what is n?

**Solution**: Sum of factors = 2n means n is perfect number.

---

## 🧮 Factor Sum Formulas

### Perfect Number Formula
For even perfect numbers: n = 2^(p-1) × (2^p - 1) where 2^p - 1 is prime

### Sum of Divisors Function
σ(n) = sum of all divisors of n

### Aliquot Sum
s(n) = sum of proper divisors = σ(n) - n

---

## 📝 Practice Examples

### Example 1: Basic Sum
Find sum of factors of 36.

**Solution**: 36 = 2² × 3²
Sum = (2³-1)/(2-1) × (3³-1)/(3-1) = (8-1) × (27-1)/2 = 7 × 13 = 91

### Example 2: Perfect Number Check
Is 28 a perfect number?

**Solution**: 28 = 2² × 7
Sum = (2³-1) × (7²-1)/6 = 7 × 48/6 = 7 × 8 = 56
Proper divisors sum = 56 - 28 = 28 ✓

### Example 3: Odd Factor Sum
Find sum of odd factors of 100.

**Solution**: 100 = 2² × 5²
Odd part: 5²
Sum = (5³-1)/(5-1) = (125-1)/4 = 124/4 = 31

### Example 4: Factor Sum Equation
If σ(n) = 2n + 6, find n.

**Solution**: σ(n) - n = n + 6
Sum of proper divisors = n + 6
This means the number is abundant by 6.

Master sum of factors to understand number properties deeply! 🚀`
};

