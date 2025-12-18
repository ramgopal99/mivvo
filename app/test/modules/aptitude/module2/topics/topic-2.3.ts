import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Classification of Numbers',
  status: 'completed',
  content: `# 🔢 Classification of Numbers

Master the fundamental classifications of numbers and their properties. This topic covers even/odd numbers, prime/composite numbers, co-prime numbers, divisibility rules, and factors/multiples - essential concepts for quantitative aptitude.

---

## 🎯 Even and Odd Numbers

### Even Numbers
**Definition**: Numbers that are divisible by 2 (remainder = 0)

**Examples**: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, ...

**Properties**:
- Last digit is always: 0, 2, 4, 6, 8
- Even + Even = Even
- Even + Odd = Odd
- Even × Even = Even
- Even × Odd = Even

### Odd Numbers
**Definition**: Numbers that are not divisible by 2 (remainder = 1)

**Examples**: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, ...

**Properties**:
- Last digit is always: 1, 3, 5, 7, 9
- Odd + Odd = Even
- Odd + Even = Odd
- Odd × Odd = Odd
- Odd × Even = Even

### 🧠 Quick Test
**Rule**: If a number is divisible by 2 → Even, else → Odd

**Trick**: Check the last digit only!

---

## 🔍 Prime and Composite Numbers

### Prime Numbers
**Definition**: Numbers greater than 1 that have exactly two positive divisors: 1 and itself.

**Examples**: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, ...

**Key Points**:
- 2 is the only even prime number
- 1 is NOT a prime number
- Prime numbers > 2 are always odd

### Composite Numbers
**Definition**: Numbers greater than 1 that have more than two positive divisors.

**Examples**: 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, ...

**Key Points**:
- 1 is neither prime nor composite
- All even numbers > 2 are composite
- Composite numbers can be even or odd

### 🧠 Prime Number Tricks

#### 1. **Sieve of Eratosthenes**
Mark multiples of each prime starting from 2.

#### 2. **Prime Checking Trick**
For numbers > 2, check divisibility up to √n.

**Example**: Check if 29 is prime
- √29 ≈ 5.38
- Check divisors: 2, 3, 5 (none divide 29)
- 29 is prime!

#### 3. **Prime Number Patterns**
- Except 2 and 3, all primes are of form: 6k±1
- Twin primes: Pairs like (3,5), (5,7), (11,13)

---

## 🤝 Co-prime Numbers

### Definition
Two numbers are co-prime (or relatively prime) if their HCF (GCD) is 1.

**Examples**:
- (2, 3): HCF = 1 → Co-prime
- (4, 9): HCF = 1 → Co-prime
- (6, 8): HCF = 2 → Not co-prime
- (15, 28): HCF = 1 → Co-prime

### Properties
- Every pair of consecutive integers is co-prime
- 1 is co-prime with every number
- Prime numbers are co-prime to all numbers except their multiples

### 🧠 Co-prime Trick
**Rule**: Two numbers are co-prime if they don't share any common prime factors.

**Quick Check**: If two numbers don't have any common prime factors, they're co-prime.

---

## 📏 Divisibility Rules

Master these rules to quickly check divisibility without actual division!

### 1. **Divisible by 2**
**Rule**: Last digit is even (0, 2, 4, 6, 8)

**Examples**:
- 128 → 8 is even → Yes
- 135 → 5 is odd → No

### 2. **Divisible by 3**
**Rule**: Sum of digits is divisible by 3

**Examples**:
- 123 → 1+2+3=6 → 6÷3=2 → Yes
- 457 → 4+5+7=16 → 16÷3=5.333 → No

### 3. **Divisible by 4**
**Rule**: Last two digits form a number divisible by 4

**Examples**:
- 128 → 28÷4=7 → Yes
- 135 → 35÷4=8.75 → No

### 4. **Divisible by 5**
**Rule**: Last digit is 0 or 5

**Examples**:
- 125 → ends with 5 → Yes
- 128 → ends with 8 → No

### 5. **Divisible by 6**
**Rule**: Divisible by both 2 AND 3

**Examples**:
- 126 → Even (2) AND 1+2+6=9÷3=3 → Yes
- 135 → Odd → No

### 6. **Divisible by 8**
**Rule**: Last three digits form a number divisible by 8

**Examples**:
- 1024 → 024÷8=3 → Yes
- 1025 → 025÷8=3.125 → No

### 7. **Divisible by 7** (Osculation Method)
**Rule**: Double the last digit and subtract from remaining number

**Examples**:
- 126 → Remove 6, double=12, 12-12=0 → Yes
- 133 → Remove 3, double=6, 13-6=7, 7÷7=1 → Yes
- 134 → Remove 4, double=8, 13-8=5, not 0 or 7 → No

### 8. **Divisible by 9**
**Rule**: Sum of digits is divisible by 9

**Examples**:
- 126 → 1+2+6=9 → Yes
- 127 → 1+2+7=10 → No

### 9. **Divisible by 10**
**Rule**: Last digit is 0

**Examples**:
- 120 → ends with 0 → Yes
- 125 → ends with 5 → No

### 10. **Divisible by 11** (Alternating Sum)
**Rule**: Alternating sum of digits is 0 or divisible by 11

**Examples**:
- 121 → 1-2+1=0 → Yes
- 132 → 1-3+2=0 → Yes
- 133 → 1-3+3=1 → No

---

## 🧩 Factors and Multiples

### Factors (Divisors)
**Definition**: Numbers that divide another number exactly (remainder = 0)

**Example**: Factors of 12: 1, 2, 3, 4, 6, 12

### Multiples
**Definition**: Numbers obtained by multiplying a number by integers

**Example**: Multiples of 3: 3, 6, 9, 12, 15, 18, ...

### 🧠 Factor Finding Tricks

#### 1. **Prime Factorization**
Express number as product of prime factors.

**Example**: 84 = 2 × 2 × 3 × 7 = 2² × 3 × 7

#### 2. **Factor Pairs**
For any number n, factors come in pairs (a, b) where a × b = n.

**Example**: Factors of 24: (1,24), (2,12), (3,8), (4,6)

#### 3. **Number of Factors Formula**
If n = p₁^a × p₂^b × p₃^c × ...
Then number of factors = (a+1) × (b+1) × (c+1) × ...

**Example**: 84 = 2² × 3¹ × 7¹
Number of factors = (2+1) × (1+1) × (1+1) = 3 × 2 × 2 = 12

#### 4. **Sum of Factors Formula**
Sum of factors = [(p₁^(a+1)-1)/(p₁-1)] × [(p₂^(b+1)-1)/(p₂-1)] × ...

**Example**: Sum of factors of 84 = [(2³-1)/(2-1)] × [(3²-1)/(3-1)] × [(7²-1)/(7-1)]
= [(8-1)/1] × [(9-1)/2] × [(49-1)/6]
= 7 × 4 × 8 = 224

---

## 🎯 Problem Solving Techniques

### 1. **Even/Odd Problems**
**Trick**: Use parity (even/odd) properties in equations.

**Example**: If x is odd, then x² is odd, x³ is odd, etc.

### 2. **Prime Number Problems**
**Trick**: Use prime factorization for quick solutions.

**Example**: Find HCF of 84 and 90
84 = 2² × 3 × 7
90 = 2 × 3² × 5
HCF = 2 × 3 = 6

### 3. **Divisibility Shortcuts**
**Combined Rules**: Use multiple rules together.

**Example**: Is 123456 divisible by 6?
- By 2: Last digit 6 → Yes
- By 3: 1+2+3+4+5+6=21, 21÷3=7 → Yes
- Therefore, divisible by 6

### 4. **Factor Counting Problems**
**Trick**: Use the formula for counting factors.

**Example**: How many factors does 360 have?
360 = 2³ × 3² × 5¹
Factors = (3+1) × (2+1) × (1+1) = 4 × 3 × 2 = 24

Master these concepts and you'll solve number classification problems with ease! 🚀`
};

