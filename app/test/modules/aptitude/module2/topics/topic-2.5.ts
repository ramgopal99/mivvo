import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: "2.5",
  title: 'HCF & LCM',
  status: 'completed',
  content: "`# ðŸ”¢ HCF & LCM

Highest Common Factor (HCF) and Least Common Multiple (LCM) are fundamental concepts in number theory. These concepts are crucial for solving problems involving fractions, ratios, and number relationships.

---

## ðŸŽ¯ Understanding HCF and LCM

### HCF (Highest Common Factor / GCD)
**Definition**: The largest number that divides two or more numbers exactly.

**Also known as**: Greatest Common Divisor (GCD), Greatest Common Factor (GCF)

### LCM (Least Common Multiple)
**Definition**: The smallest number that is exactly divisible by two or more numbers.

---

## ðŸ“Š Methods to Find HCF

### 1. **Prime Factorization Method**
Factorize both numbers and take minimum powers of common factors.

**Example**: Find HCF of 24 and 36
\`"\`\`
24 = 2Â³ Ã— 3Â¹
36 = 2Â² Ã— 3Â²

Common factors: 2Â² Ã— 3Â¹ = 4 Ã— 3 = 12
âˆ´ HCF(24, 36) = 12
\`\`\`

### 2. **Division Method (Euclidean Algorithm)**
Repeatedly divide the larger number by the smaller number until remainder is 0.

**Example**: Find HCF of 56 and 98
\`\`\`
98 Ã· 56 = 1 (remainder 42)
56 Ã· 42 = 1 (remainder 14)
42 Ã· 14 = 3 (remainder 0)

âˆ´ HCF(56, 98) = 14
\`\`\`

### 3. **Listing Method**
List all factors of both numbers and find the largest common factor.

**Example**: Find HCF of 12 and 18
\`\`\`
Factors of 12: 1, 2, 3, 4, 6, 12
Factors of 18: 1, 2, 3, 6, 9, 18

Common factors: 1, 2, 3, 6
Largest: 6
âˆ´ HCF(12, 18) = 6
\`\`\`

---

## ðŸ“ˆ Methods to Find LCM

### 1. **Prime Factorization Method**
Factorize both numbers and take maximum powers of all factors.

**Example**: Find LCM of 24 and 36
\`\`\`
24 = 2Â³ Ã— 3Â¹
36 = 2Â² Ã— 3Â²

Maximum powers: 2Â³ Ã— 3Â² = 8 Ã— 9 = 72
âˆ´ LCM(24, 36) = 72
\`\`\`

### 2. **Division Method**
Divide by common factors until no common factors remain.

**Example**: Find LCM of 12, 15, 20
\`\`\`
2 | 12, 15, 20
  | 6,  15, 10
2 | 3,  15, 5
  | 3,  15, 5
3 | 3,  15, 5
  | 1,  5,  5
5 | 1,  5,  5
  | 1,  1,  1

âˆ´ LCM = 2 Ã— 2 Ã— 3 Ã— 5 = 60
\`\`\`

### 3. **Formula Method**
LCM(a,b) = (a Ã— b) / HCF(a,b)

**Example**: Find LCM of 15 and 20
\`\`\`
HCF(15,20) = 5
LCM = (15 Ã— 20) / 5 = 300 / 5 = 60
\`\`\`

---

## ðŸ”— Relationship Between HCF and LCM

### Fundamental Relationship
For any two numbers a and b:
**HCF(a,b) Ã— LCM(a,b) = a Ã— b**

**Proof**: Using prime factorization
\`\`\`
a = pâ‚^a Ã— pâ‚‚^b Ã— ...
b = pâ‚^c Ã— pâ‚‚^d Ã— ...

HCF = pâ‚^min(a,c) Ã— pâ‚‚^min(b,d) Ã— ...
LCM = pâ‚^max(a,c) Ã— pâ‚‚^max(b,d) Ã— ...

Product: HCF Ã— LCM = pâ‚^(min+max) Ã— pâ‚‚^(min+max) Ã— ...
a Ã— b = pâ‚^(a+c) Ã— pâ‚‚^(b+d) Ã— ...

Since min(a,c) + max(a,c) = a + c
âˆ´ HCF Ã— LCM = a Ã— b
\`\`\`

### Important Properties

#### Property 1: HCF of fractions
HCF(a/b, c/d) = HCF(a,c) / LCM(b,d)

#### Property 2: LCM of fractions
LCM(a/b, c/d) = LCM(a,c) / HCF(b,d)

#### Property 3: For three numbers
HCF(a,b,c) Ã— LCM(a,b,c) = HCF(a,b) Ã— LCM(a,b) Ã— LCM(HCF(a,b),c) / HCF(HCF(a,b),c)

---

## ðŸŽ¯ HCF and LCM of Multiple Numbers

### HCF of Multiple Numbers
Find HCF of first two, then HCF of result with third, and so on.

**Example**: HCF of 12, 18, 24
\`\`\`
HCF(12,18) = 6
HCF(6,24) = 6
âˆ´ HCF(12,18,24) = 6
\`\`\`

### LCM of Multiple Numbers
Find LCM of first two, then LCM of result with third, and so on.

**Example**: LCM of 4, 6, 8
\`\`\`
LCM(4,6) = 12
LCM(12,8) = 24
âˆ´ LCM(4,6,8) = 24
\`\`\`

---

## ðŸ§  Problem Solving Tricks

### Trick 1: **Quick HCF/LCM with Formula**
When one number is multiple of other: HCF = smaller number, LCM = larger number

**Example**: HCF and LCM of 12 and 24
\`\`\`
HCF = 12, LCM = 24
Check: 12 Ã— 24 = 12 Ã— 24 = 288 âœ“
\`\`\`

### Trick 2: **HCF and LCM are equal**
Only when numbers are equal.

**Example**: For 5 and 5: HCF = 5, LCM = 5

### Trick 3: **One number is HCF**
When HCF is given as one of the numbers.

### Trick 4: **Consecutive Numbers**
HCF of consecutive numbers is always 1.

---

## ðŸŽ¯ Advanced Applications

### 1. **Word Problems**
**Example**: A gardener plants trees in rows of 6, 8, or 12. What's the minimum number of trees needed to have complete rows?

**Solution**: LCM(6,8,12) = 24 trees

### 2. **Clock Problems**
**Example**: Two bells ring every 6 and 8 minutes. When will they ring together again?

**Solution**: LCM(6,8) = 24 minutes

### 3. **Fraction Problems**
**Example**: Add 1/6 + 1/8 + 1/12

**Solution**: Common denominator = LCM(6,8,12) = 24
= (4 + 3 + 2)/24 = 9/24 = 3/8

---

## ðŸ“ Common Types of Problems

### Type 1: **Find Numbers with Given HCF and LCM**
If HCF(a,b) = h and LCM(a,b) = l, then:
a Ã— b = h Ã— l

**Example**: Two numbers have HCF 12 and LCM 72. Find the numbers.
\`\`\`
Product = 12 Ã— 72 = 864
Possible pairs: (12,72), (24,36), etc.
\`\`\`

### Type 2: **Find Numbers with Given HCF/LCM Ratio**
If LCM : HCF = k, then find the relationship.

### Type 3: **Find Numbers with Given Sum and HCF/LCM**
Use the relationship: a + b = sum, a Ã— b = HCF Ã— LCM

---

## ðŸŽ¯ Important Formulas

### For Two Numbers:
- **HCF Ã— LCM = a Ã— b**
- **HCF â‰¤ min(a,b)**
- **LCM â‰¥ max(a,b)**

### For Multiple Numbers:
- **HCF(a,b,c) â‰¤ HCF(a,b)**
- **LCM(a,b,c) â‰¥ LCM(a,b)**

### Special Cases:
- **HCF(a,a) = a**, **LCM(a,a) = a**
- **HCF(a,1) = 1**, **LCM(a,1) = a**
- **HCF(a,0) = a**, **LCM(a,0) = 0**

---

## ðŸ“Š Practice Examples

### Example 1: Basic HCF and LCM
Find HCF and LCM of 15 and 20
\`\`\`
HCF = 5
LCM = 60
Check: 5 Ã— 60 = 300, 15 Ã— 20 = 300 âœ“
\`\`\`

### Example 2: Multiple Numbers
Find HCF and LCM of 8, 12, 16
\`\`\`
HCF = 4
LCM = 48
\`\`\`

### Example 3: Word Problem
Two runners run around a track. One completes a round every 4 minutes, the other every 6 minutes. When will they meet again?

**Solution**: LCM(4,6) = 12 minutes

Master HCF and LCM and you'll solve many quantitative aptitude problems with ease! ðŸš€`
};


