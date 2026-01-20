import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Classification of Numbers',
  status: 'completed',
  content: "`# ðŸ”¢ Classification of Numbers

Master the fundamental classifications of numbers and their properties. This topic covers even/odd numbers, prime/composite numbers, co-prime numbers, divisibility rules, and factors/multiples - essential concepts for quantitative aptitude.

---

## ðŸŽ¯ Even and Odd Numbers

### Even Numbers
**Definition**: Numbers that are divisible by 2 (remainder = 0)

**Examples**: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, ...

**Properties**:
- Last digit is always: 0, 2, 4, 6, 8
- Even + Even = Even
- Even + Odd = Odd
- Even Ã— Even = Even
- Even Ã— Odd = Even

### Odd Numbers
**Definition**: Numbers that are not divisible by 2 (remainder = 1)

**Examples**: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, ...

**Properties**:
- Last digit is always: 1, 3, 5, 7, 9
- Odd + Odd = Even
- Odd + Even = Odd
- Odd Ã— Odd = Odd
- Odd Ã— Even = Even

### ðŸ§  Quick Test
**Rule**: If a number is divisible by 2 â†’ Even, else â†’ Odd

**Trick**: Check the last digit only!

---

## ðŸ” Prime and Composite Numbers

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

### ðŸ§  Prime Number Tricks

#### 1. **Sieve of Eratosthenes**
Mark multiples of each prime starting from 2.

#### 2. **Prime Checking Trick**
For numbers > 2, check divisibility up to âˆšn.

**Example**: Check if 29 is prime
- âˆš29 â‰ˆ 5.38
- Check divisors: 2, 3, 5 (none divide 29)
- 29 is prime!

#### 3. **Prime Number Patterns**
- Except 2 and 3, all primes are of form: 6kÂ±1
- Twin primes: Pairs like (3,5), (5,7), (11,13)

---

## ðŸ¤ Co-prime Numbers

### Definition
Two numbers are co-prime (or relatively prime) if their HCF (GCD) is 1.

**Examples**:
- (2, 3): HCF = 1 â†’ Co-prime
- (4, 9): HCF = 1 â†’ Co-prime
- (6, 8): HCF = 2 â†’ Not co-prime
- (15, 28): HCF = 1 â†’ Co-prime

### Properties
- Every pair of consecutive integers is co-prime
- 1 is co-prime with every number
- Prime numbers are co-prime to all numbers except their multiples

### ðŸ§  Co-prime Trick
**Rule**: Two numbers are co-prime if they don't share any common prime factors.

**Quick Check**: If two numbers don't have any common prime factors, they're co-prime.

---

## ðŸ“ Divisibility Rules

Master these rules to quickly check divisibility without actual division!

### 1. **Divisible by 2**
**Rule**: Last digit is even (0, 2, 4, 6, 8)

**Examples**:
- 128 â†’ 8 is even â†’ Yes
- 135 â†’ 5 is odd â†’ No

### 2. **Divisible by 3**
**Rule**: Sum of digits is divisible by 3

**Examples**:
- 123 â†’ 1+2+3=6 â†’ 6Ã·3=2 â†’ Yes
- 457 â†’ 4+5+7=16 â†’ 16Ã·3=5.333 â†’ No

### 3. **Divisible by 4**
**Rule**: Last two digits form a number divisible by 4

**Examples**:
- 128 â†’ 28Ã·4=7 â†’ Yes
- 135 â†’ 35Ã·4=8.75 â†’ No

### 4. **Divisible by 5**
**Rule**: Last digit is 0 or 5

**Examples**:
- 125 â†’ ends with 5 â†’ Yes
- 128 â†’ ends with 8 â†’ No

### 5. **Divisible by 6**
**Rule**: Divisible by both 2 AND 3

**Examples**:
- 126 â†’ Even (2) AND 1+2+6=9Ã·3=3 â†’ Yes
- 135 â†’ Odd â†’ No

### 6. **Divisible by 8**
**Rule**: Last three digits form a number divisible by 8

**Examples**:
- 1024 â†’ 024Ã·8=3 â†’ Yes
- 1025 â†’ 025Ã·8=3.125 â†’ No

### 7. **Divisible by 7** (Osculation Method)
**Rule**: Double the last digit and subtract from remaining number

**Examples**:
- 126 â†’ Remove 6, double=12, 12-12=0 â†’ Yes
- 133 â†’ Remove 3, double=6, 13-6=7, 7Ã·7=1 â†’ Yes
- 134 â†’ Remove 4, double=8, 13-8=5, not 0 or 7 â†’ No

### 8. **Divisible by 9**
**Rule**: Sum of digits is divisible by 9

**Examples**:
- 126 â†’ 1+2+6=9 â†’ Yes
- 127 â†’ 1+2+7=10 â†’ No

### 9. **Divisible by 10**
**Rule**: Last digit is 0

**Examples**:
- 120 â†’ ends with 0 â†’ Yes
- 125 â†’ ends with 5 â†’ No

### 10. **Divisible by 11** (Alternating Sum)
**Rule**: Alternating sum of digits is 0 or divisible by 11

**Examples**:
- 121 â†’ 1-2+1=0 â†’ Yes
- 132 â†’ 1-3+2=0 â†’ Yes
- 133 â†’ 1-3+3=1 â†’ No

---

## ðŸ§© Factors and Multiples

### Factors (Divisors)
**Definition**: Numbers that divide another number exactly (remainder = 0)

**Example**: Factors of 12: 1, 2, 3, 4, 6, 12

### Multiples
**Definition**: Numbers obtained by multiplying a number by integers

**Example**: Multiples of 3: 3, 6, 9, 12, 15, 18, ...

### ðŸ§  Factor Finding Tricks

#### 1. **Prime Factorization**
Express number as product of prime factors.

**Example**: 84 = 2 Ã— 2 Ã— 3 Ã— 7 = 2Â² Ã— 3 Ã— 7

#### 2. **Factor Pairs**
For any number n, factors come in pairs (a, b) where a Ã— b = n.

**Example**: Factors of 24: (1,24), (2,12), (3,8), (4,6)

#### 3. **Number of Factors Formula**
If n = pâ‚^a Ã— pâ‚‚^b Ã— pâ‚ƒ^c Ã— ...
Then number of factors = (a+1) Ã— (b+1) Ã— (c+1) Ã— ...

**Example**: 84 = 2Â² Ã— 3Â¹ Ã— 7Â¹
Number of factors = (2+1) Ã— (1+1) Ã— (1+1) = 3 Ã— 2 Ã— 2 = 12

#### 4. **Sum of Factors Formula**
Sum of factors = [(pâ‚^(a+1)-1)/(pâ‚-1)] Ã— [(pâ‚‚^(b+1)-1)/(pâ‚‚-1)] Ã— ...

**Example**: Sum of factors of 84 = [(2Â³-1)/(2-1)] Ã— [(3Â²-1)/(3-1)] Ã— [(7Â²-1)/(7-1)]
= [(8-1)/1] Ã— [(9-1)/2] Ã— [(49-1)/6]
= 7 Ã— 4 Ã— 8 = 224

---

## ðŸŽ¯ Problem Solving Techniques

### 1. **Even/Odd Problems**
**Trick**: Use parity (even/odd) properties in equations.

**Example**: If x is odd, then xÂ² is odd, xÂ³ is odd, etc.

### 2. **Prime Number Problems**
**Trick**: Use prime factorization for quick solutions.

**Example**: Find HCF of 84 and 90
84 = 2Â² Ã— 3 Ã— 7
90 = 2 Ã— 3Â² Ã— 5
HCF = 2 Ã— 3 = 6

### 3. **Divisibility Shortcuts**
**Combined Rules**: Use multiple rules together.

**Example**: Is 123456 divisible by 6?
- By 2: Last digit 6 â†’ Yes
- By 3: 1+2+3+4+5+6=21, 21Ã·3=7 â†’ Yes
- Therefore, divisible by 6

### 4. **Factor Counting Problems**
**Trick**: Use the formula for counting factors.

**Example**: How many factors does 360 have?
360 = 2Â³ Ã— 3Â² Ã— 5Â¹
Factors = (3+1) Ã— (2+1) Ã— (1+1) = 4 Ã— 3 Ã— 2 = 24

Master these concepts and you'll solve number classification problems with ease! ðŸš€`"
};


