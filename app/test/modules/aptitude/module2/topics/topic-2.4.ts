import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: "2.4",
  title: 'Prime Factorization',
  status: 'completed',
  content: "`# ðŸ”¢ Prime Factorization

Prime factorization is the process of breaking down a composite number into its prime factors. This fundamental concept forms the basis for many number theory problems and is essential for understanding HCF, LCM, and factor-related questions.

---

## ðŸŽ¯ What is Prime Factorization?

**Prime Factorization** is the process of expressing a composite number as a product of its prime factors.

### Why Prime Factors?
- Every composite number can be uniquely expressed as a product of prime numbers
- This representation is unique (except for the order of factors)
- Forms the foundation for many mathematical operations

---

## ðŸ“Š Methods of Prime Factorization

### 1. **Division Method** (Factor Tree)
Start dividing the number by smallest prime factors repeatedly.

**Example**: Prime factorize 84

\`"\`\`
84 Ã· 2 = 42
42 Ã· 2 = 21
21 Ã· 3 = 7
7 Ã· 7 = 1

âˆ´ 84 = 2 Ã— 2 Ã— 3 Ã— 7 = 2Â² Ã— 3Â¹ Ã— 7Â¹
\`\`\`

### 2. **Factor Tree Method**
Draw a tree structure to break down the number.

**Example**: Prime factorize 120

\`\`\`
        120
       /    \\
      2      60
            /  \\
           2    30
               /  \\
              2    15
                  /  \\
                 3    5

âˆ´ 120 = 2 Ã— 2 Ã— 2 Ã— 3 Ã— 5 = 2Â³ Ã— 3Â¹ Ã— 5Â¹
\`\`\`

### 3. **Shortcut Method for Large Numbers**
- First check divisibility by small primes (2, 3, 5, 7, 11...)
- Use divisibility rules to speed up the process

---

## ðŸ§  Prime Factorization Tricks

### Trick 1: **Check Small Primes First**
Always start with 2, then 3, 5, 7, 11, 13, etc.

### Trick 2: **Use Divisibility Rules**
- For 2: Check if even
- For 3: Sum of digits divisible by 3
- For 5: Ends with 0 or 5
- For 9: Sum of digits divisible by 9

### Trick 3: **Pair Factors Efficiently**
For large numbers, work with factor pairs.

**Example**: Factorize 391
- 391 Ã· 17 = 23
- So 391 = 17 Ã— 23

### Trick 4: **Prime Factorization of Powers**
For perfect powers, factorize the base first.

**Example**: 512 = 2Â¹â° = (2Â²)âµ = 4âµ
But better: 512 = 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 Ã— 2 = 2Â¹â°

---

## ðŸŽ¯ Applications of Prime Factorization

### 1. **Finding HCF (Highest Common Factor)**
Take the minimum powers of common prime factors.

**Example**: Find HCF of 84 and 90
\`\`\`
84 = 2Â² Ã— 3Â¹ Ã— 7Â¹
90 = 2Â¹ Ã— 3Â² Ã— 5Â¹

Common factors: 2Â¹ Ã— 3Â¹ = 6
âˆ´ HCF(84, 90) = 6
\`\`\`

### 2. **Finding LCM (Least Common Multiple)**
Take the maximum powers of all prime factors.

**Example**: Find LCM of 84 and 90
\`\`\`
84 = 2Â² Ã— 3Â¹ Ã— 7Â¹
90 = 2Â¹ Ã— 3Â² Ã— 5Â¹

Maximum powers: 2Â² Ã— 3Â² Ã— 5Â¹ Ã— 7Â¹ = 4 Ã— 9 Ã— 5 Ã— 7 = 1260
âˆ´ LCM(84, 90) = 1260
\`\`\`

### 3. **Number of Factors**
Formula: If n = pâ‚^a Ã— pâ‚‚^b Ã— pâ‚ƒ^c Ã— ...
Then number of factors = (a+1) Ã— (b+1) Ã— (c+1) Ã— ...

**Example**: Factors of 84 = 2Â² Ã— 3Â¹ Ã— 7Â¹
Number of factors = (2+1) Ã— (1+1) Ã— (1+1) = 3 Ã— 2 Ã— 2 = 12

### 4. **Sum of Factors**
Formula: Sum = [(pâ‚^(a+1)-1)/(pâ‚-1)] Ã— [(pâ‚‚^(b+1)-1)/(pâ‚‚-1)] Ã— ...

**Example**: Sum of factors of 84
= [(2Â³-1)/(2-1)] Ã— [(3Â²-1)/(3-1)] Ã— [(7Â²-1)/(7-1)]
= (8-1)/1 Ã— (9-1)/2 Ã— (49-1)/6
= 7 Ã— 4 Ã— 8 = 224

---

## ðŸ” Special Cases and Patterns

### 1. **Prime Numbers**
A prime number has only one prime factor: itself.

**Example**: 17 = 17Â¹

### 2. **Perfect Squares**
Numbers with even exponents in prime factorization.

**Example**: 36 = 2Â² Ã— 3Â² (perfect square)
**Example**: 48 = 2â´ Ã— 3Â¹ (not a perfect square)

### 3. **Perfect Cubes**
Numbers with exponents divisible by 3.

**Example**: 27 = 3Â³ (perfect cube)
**Example**: 24 = 2Â³ Ã— 3Â¹ (not a perfect cube)

### 4. **Highly Composite Numbers**
Numbers with many factors.

**Example**: 60 = 2Â² Ã— 3Â¹ Ã— 5Â¹ has 12 factors
**Example**: 120 = 2Â³ Ã— 3Â¹ Ã— 5Â¹ has 16 factors

---

## ðŸŽ¯ Problem Solving Techniques

### Technique 1: **Quick Prime Factorization**
**Steps**:
1. Check divisibility by 2
2. Check divisibility by 3 (sum of digits)
3. Check divisibility by 5
4. Try primes: 7, 11, 13, 17, 19, etc.
5. For large factors, use factor pairs

### Technique 2: **Factorization by Grouping**
For quadratic expressions: axÂ² + bx + c

**Example**: Factorize xÂ² + 5x + 6
= (x + 2)(x + 3)

### Technique 3: **Difference of Squares**
aÂ² - bÂ² = (a - b)(a + b)

**Example**: 25 - 9 = 16 = 4Â²
25 - 9 = (5)Â² - (3)Â² = (5-3)(5+3) = 2 Ã— 8 = 16

---

## ðŸ“ Common Mistakes to Avoid

### Mistake 1: **Forgetting to Check All Primes**
Always continue dividing until you reach 1.

### Mistake 2: **Wrong Order in Factor Tree**
The order doesn't matter, but be systematic.

### Mistake 3: **Missing Prime Factors**
Double-check that all factors are prime.

### Mistake 4: **Incorrect Exponent Calculation**
Count the number of times each prime divides the number.

---

## ðŸŽ¯ Practice Examples

### Example 1: Basic Factorization
Factorize 126:
126 Ã· 2 = 63
63 Ã· 3 = 21
21 Ã· 3 = 7
7 Ã· 7 = 1
âˆ´ 126 = 2Â¹ Ã— 3Â² Ã— 7Â¹

### Example 2: Large Number
Factorize 391:
391 Ã· 17 = 23
âˆ´ 391 = 17Â¹ Ã— 23Â¹

### Example 3: Perfect Square
Factorize 225:
225 Ã· 5 = 45
45 Ã· 5 = 9
9 Ã· 3 = 3
3 Ã· 3 = 1
âˆ´ 225 = 3Â² Ã— 5Â²

Master prime factorization and you'll unlock the secrets of number theory! ðŸ”“`
};


