import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_22: SubLesson = {
  id: "2.22",
  title: 'Factorials',
  status: 'completed',
  content: "`# ðŸ”¢ Factorials

Factorials are fundamental mathematical functions used in permutations, combinations, probability, and various counting problems. Understanding factorial properties and calculations is essential for aptitude problems.

---

## ðŸŽ¯ What is a Factorial?

### Definition
The factorial of a non-negative integer n, denoted n!, is the product of all positive integers from 1 to n.

**Formula**: n! = n Ã— (n-1) Ã— (n-2) Ã— ... Ã— 3 Ã— 2 Ã— 1

**Examples**:
- 0! = 1 (by definition)
- 1! = 1
- 2! = 2 Ã— 1 = 2
- 3! = 3 Ã— 2 Ã— 1 = 6
- 4! = 4 Ã— 3 Ã— 2 Ã— 1 = 24
- 5! = 5 Ã— 4 Ã— 3 Ã— 2 Ã— 1 = 120

---

## ðŸ“Š Factorial Properties

### 1. **Recursive Property**
n! = n Ã— (n-1)!

### 2. **Growth Rate**
Factorials grow very rapidly:
\`"\`\`
5! = 120
10! = 3,628,800
15! â‰ˆ 1.3 Ã— 10^12
20! â‰ˆ 2.4 Ã— 10^18
\`\`\`

### 3. **Even vs Odd**
For n â‰¥ 2, n! is always even (contains factor of 2)

### 4. **Trailing Zeros**
Number of trailing zeros = floor(n/5) + floor(n/25) + floor(n/125) + ...

---

## ðŸ§® Factorial Calculations

### Method 1: **Direct Multiplication**
Multiply numbers from n down to 1.

**Example**: Calculate 6!
\`\`\`
6! = 6 Ã— 5 Ã— 4 Ã— 3 Ã— 2 Ã— 1 = 720
\`\`\`

### Method 2: **Using Previous Factorial**
n! = n Ã— (n-1)!

**Example**: If 5! = 120, then 6! = 6 Ã— 120 = 720

### Method 3: **Grouping**
Group numbers for easier calculation.

**Example**: 10! = (10Ã—9Ã—8Ã—7Ã—6) Ã— (5Ã—4Ã—3Ã—2Ã—1)
= 30240 Ã— 120 = 3,628,800

---

## ðŸŽ¯ Applications in Aptitude

### 1. **Permutations**
Number of ways to arrange n distinct items: n!

**Example**: Number of ways to arrange 5 books on a shelf: 5! = 120

### 2. **Combinations**
C(n,r) = n! / (r! Ã— (n-r)!)

**Example**: Number of ways to choose 3 items from 5: C(5,3) = 10

### 3. **Probability**
Factorials appear in probability calculations.

### 4. **Series and Sequences**
In mathematical series and pattern problems.

---

## ðŸ§  Factorial Tricks

### Trick 1: **Simplify Ratio of Factorials**
n! / r! = n Ã— (n-1) Ã— ... Ã— (r+1)

**Example**: 8! / 5! = 8 Ã— 7 Ã— 6 = 336

### Trick 2: **Factorial Division**
(n!) / (k!) where k < n = product from (k+1) to n

### Trick 3: **Double Factorial**
n!! = n Ã— (n-2) Ã— (n-4) Ã— ... (product of numbers with same parity)

### Trick 4: **Factorial in Fractions**
Simplify expressions like (n+1)! / n! = n+1

---

## ðŸ“Š Factorial Series

### 1. **Sum of Reciprocals**
1 + 1/1! + 1/2! + 1/3! + ... = e (Euler's number)

### 2. **Factorial Growth**
n! grows faster than exponential functions.

### 3. **Stirling's Approximation**
n! â‰ˆ âˆš(2Ï€n) Ã— (n/e)^n

### 4. **Prime Factor Distribution**
For large n, prime factors follow certain distributions.

---

## ðŸŽ¯ Common Problems

### Type 1: **Direct Calculation**
**Example**: Find 7!
**Solution**: 7! = 5040

### Type 2: **Ratio Problems**
**Example**: Simplify 9! / 7!
**Solution**: 9! / 7! = 9 Ã— 8 = 72

### Type 3: **Comparison**
**Example**: Compare 5! and 3! Ã— 4!
**Solution**: 120 vs 6 Ã— 24 = 144, so 3! Ã— 4! > 5!

### Type 4: **Word Problems**
**Example**: In how many ways can 4 boys and 3 girls be arranged in a line such that no two girls are together?

---

## ðŸ” Advanced Factorial Concepts

### 1. **Multifactorial**
n! = n Ã— (n-1) Ã— ... Ã— 1
Double factorial: n!! = n Ã— (n-2) Ã— ...
Triple factorial: n!!! = n Ã— (n-3) Ã— ...

### 2. **Factorial Primes**
Numbers of form n! Â± 1 that are prime.

### 3. **Wilson's Theorem**
(p-1)! â‰¡ -1 (mod p) for prime p

### 4. **Kummer's Theorem**
For binomial coefficients, valuation gives carry information.

---

## ðŸ§® Factorial Properties

### 1. **Divisibility**
n! is divisible by all integers from 1 to n.

### 2. **Prime Factors**
The prime factors of n! are all primes â‰¤ n.

### 3. **Exponent of Prime p**
In n!: floor(n/p) + floor(n/pÂ²) + floor(n/pÂ³) + ...

### 4. **Trailing Zeros**
Determined by number of 5s in prime factorization.

---

## ðŸ“ Practice Examples

### Example 1: Basic Calculation
Find 8!

**Solution**: 8! = 40320

### Example 2: Ratio Simplification
Simplify 10! / 8!

**Solution**: 10! / 8! = 10 Ã— 9 = 90

### Example 3: Complex Expression
Simplify (n+1)! / n!

**Solution**: n+1

### Example 4: Comparison
Which is larger: 6! or 3! Ã— 4! Ã— 2!

**Solution**: 720 vs 6 Ã— 24 Ã— 2 = 288, so 6! > 3! Ã— 4! Ã— 2!

### Example 5: Word Problem
How many 4-digit numbers can be formed using digits 1,2,3,4 without repetition?

**Solution**: 4! = 24 numbers

### Example 6: Permutation
In how many ways can 5 people be seated in a round table?

**Solution**: (5-1)! = 4! = 24 ways

### Example 7: Combination
How many ways to choose 2 items from 6?

**Solution**: C(6,2) = 6!/(2!Ã—4!) = 15

### Example 8: Probability
What is the probability of getting a sum of 7 with two dice?

**Solution**: Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 ways
Total outcomes: 6Ã—6=36
Probability: 6/36 = 1/6

Master factorials for permutations, combinations, and counting problems! ðŸš€`
};


