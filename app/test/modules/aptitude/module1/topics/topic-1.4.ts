import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_4: SubLesson = {
  id: "1.4",
  title: 'Prime Factorization',
  status: 'completed',
  content: `# 🔢 Prime Factorization

Prime factorization is the process of breaking down a composite number into its prime factors. This fundamental concept forms the basis for many number theory problems and is essential for understanding HCF, LCM, and factor-related questions.

---

## 🎯 What is Prime Factorization?

**Prime Factorization** is the process of expressing a composite number as a product of its prime factors.

### Why Prime Factors?
- Every composite number can be uniquely expressed as a product of prime numbers
- This representation is unique (except for the order of factors)
- Forms the foundation for many mathematical operations

---

## 📊 Methods of Prime Factorization

### 1. **Division Method** (Factor Tree)
Start dividing the number by smallest prime factors repeatedly.

**Example**: Prime factorize 84

\`\`\`
84 ÷ 2 = 42
42 ÷ 2 = 21
21 ÷ 3 = 7
7 ÷ 7 = 1

∴ 84 = 2 × 2 × 3 × 7 = 2² × 3¹ × 7¹
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

∴ 120 = 2 × 2 × 2 × 3 × 5 = 2³ × 3¹ × 5¹
\`\`\`

### 3. **Shortcut Method for Large Numbers**
- First check divisibility by small primes (2, 3, 5, 7, 11...)
- Use divisibility rules to speed up the process

---

## 🧠 Prime Factorization Tricks

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
- 391 ÷ 17 = 23
- So 391 = 17 × 23

### Trick 4: **Prime Factorization of Powers**
For perfect powers, factorize the base first.

**Example**: 512 = 2¹⁰ = (2²)⁵ = 4⁵
But better: 512 = 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2¹⁰

---

## 🎯 Applications of Prime Factorization

### 1. **Finding HCF (Highest Common Factor)**
Take the minimum powers of common prime factors.

**Example**: Find HCF of 84 and 90
\`\`\`
84 = 2² × 3¹ × 7¹
90 = 2¹ × 3² × 5¹

Common factors: 2¹ × 3¹ = 6
∴ HCF(84, 90) = 6
\`\`\`

### 2. **Finding LCM (Least Common Multiple)**
Take the maximum powers of all prime factors.

**Example**: Find LCM of 84 and 90
\`\`\`
84 = 2² × 3¹ × 7¹
90 = 2¹ × 3² × 5¹

Maximum powers: 2² × 3² × 5¹ × 7¹ = 4 × 9 × 5 × 7 = 1260
∴ LCM(84, 90) = 1260
\`\`\`

### 3. **Number of Factors**
Formula: If n = p₁^a × p₂^b × p₃^c × ...
Then number of factors = (a+1) × (b+1) × (c+1) × ...

**Example**: Factors of 84 = 2² × 3¹ × 7¹
Number of factors = (2+1) × (1+1) × (1+1) = 3 × 2 × 2 = 12

### 4. **Sum of Factors**
Formula: Sum = [(p₁^(a+1)-1)/(p₁-1)] × [(p₂^(b+1)-1)/(p₂-1)] × ...

**Example**: Sum of factors of 84
= [(2³-1)/(2-1)] × [(3²-1)/(3-1)] × [(7²-1)/(7-1)]
= (8-1)/1 × (9-1)/2 × (49-1)/6
= 7 × 4 × 8 = 224

---

## 🔍 Special Cases and Patterns

### 1. **Prime Numbers**
A prime number has only one prime factor: itself.

**Example**: 17 = 17¹

### 2. **Perfect Squares**
Numbers with even exponents in prime factorization.

**Example**: 36 = 2² × 3² (perfect square)
**Example**: 48 = 2⁴ × 3¹ (not a perfect square)

### 3. **Perfect Cubes**
Numbers with exponents divisible by 3.

**Example**: 27 = 3³ (perfect cube)
**Example**: 24 = 2³ × 3¹ (not a perfect cube)

### 4. **Highly Composite Numbers**
Numbers with many factors.

**Example**: 60 = 2² × 3¹ × 5¹ has 12 factors
**Example**: 120 = 2³ × 3¹ × 5¹ has 16 factors

---

## 🎯 Problem Solving Techniques

### Technique 1: **Quick Prime Factorization**
**Steps**:
1. Check divisibility by 2
2. Check divisibility by 3 (sum of digits)
3. Check divisibility by 5
4. Try primes: 7, 11, 13, 17, 19, etc.
5. For large factors, use factor pairs

### Technique 2: **Factorization by Grouping**
For quadratic expressions: ax² + bx + c

**Example**: Factorize x² + 5x + 6
= (x + 2)(x + 3)

### Technique 3: **Difference of Squares**
a² - b² = (a - b)(a + b)

**Example**: 25 - 9 = 16 = 4²
25 - 9 = (5)² - (3)² = (5-3)(5+3) = 2 × 8 = 16

---

## 📝 Common Mistakes to Avoid

### Mistake 1: **Forgetting to Check All Primes**
Always continue dividing until you reach 1.

### Mistake 2: **Wrong Order in Factor Tree**
The order doesn't matter, but be systematic.

### Mistake 3: **Missing Prime Factors**
Double-check that all factors are prime.

### Mistake 4: **Incorrect Exponent Calculation**
Count the number of times each prime divides the number.

---

## 🎯 Practice Examples

### Example 1: Basic Factorization
Factorize 126:
126 ÷ 2 = 63
63 ÷ 3 = 21
21 ÷ 3 = 7
7 ÷ 7 = 1
∴ 126 = 2¹ × 3² × 7¹

### Example 2: Large Number
Factorize 391:
391 ÷ 17 = 23
∴ 391 = 17¹ × 23¹

### Example 3: Perfect Square
Factorize 225:
225 ÷ 5 = 45
45 ÷ 5 = 9
9 ÷ 3 = 3
3 ÷ 3 = 1
∴ 225 = 3² × 5²

Master prime factorization and you'll unlock the secrets of number theory! 🔓`
};
