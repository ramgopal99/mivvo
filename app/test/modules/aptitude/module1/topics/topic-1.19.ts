import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_19: SubLesson = {
  id: "1.19",
  title: 'Digit Sum / Digital Root',
  status: 'completed',
  content: `# 🔢 Digit Sum / Digital Root

Digit sum and digital root are important concepts in number theory with applications in divisibility tests, congruence, and pattern recognition. These concepts help solve problems involving large numbers efficiently.

---

## 🎯 What is Digit Sum?

### Definition
Digit sum is the sum of all digits in a number.

**Example**: Digit sum of 1234 = 1 + 2 + 3 + 4 = 10

### Properties
- Helps in divisibility tests (divisibility by 3, 9)
- Used in checksum calculations
- Related to casting out nines

---

## 📊 Calculating Digit Sum

### Method 1: **Direct Addition**
Add all digits individually.

**Example**: Digit sum of 56789
\`\`\`
5 + 6 + 7 + 8 + 9 = 35
\`\`\`

### Method 2: **Modular Arithmetic**
Digit sum modulo 9 gives the same result as the number modulo 9.

### Method 3: **Repeated Summation**
For large numbers, sum digits repeatedly.

**Example**: Digit sum of 999
\`\`\`
9 + 9 + 9 = 27
2 + 7 = 9
\`\`\`

---

## 🧮 Digital Root

### Definition
Digital root is the single digit obtained by repeatedly summing digits until a single digit remains.

**Formula**: Digital root of n = 1 + (n - 1) mod 9

**Examples**:
- Digital root of 123 = 1+2+3=6
- Digital root of 999 = 9+9+9=27, 2+7=9
- Digital root of 1000 = 1+0+0+0=1

---

## 🎯 Digital Root Properties

### Property 1: **Range**
Digital root is always between 1-9, except for multiples of 9 which have digital root 9.

### Property 2: **Multiples of 9**
Numbers divisible by 9 have digital root 9.

**Example**: 18: 1+8=9, divisible by 9 ✓

### Property 3: **Congruence**
Two numbers are congruent modulo 9 if they have the same digital root.

### Property 4: **Addition**
Digital root of sum = digital root of sum of digital roots.

**Example**: Digital root of 15 + 27
\`\`\`
DR(15)=6, DR(27)=9
6+9=15, DR(15)=6
Actual: 15+27=42, DR(42)=6 ✓
\`\`\`

---

## 🧠 Digit Sum Tricks

### Trick 1: **Casting Out Nines**
To check divisibility by 9, compare digit sum to 9.

**Example**: Is 123456 divisible by 9?
\`\`\`
Digit sum: 1+2+3+4+5+6=21, 2+1=3
Not 9, so not divisible by 9
\`\`\`

### Trick 2: **Digital Root for Multiplication**
Digital root of product = digital root of product of digital roots.

**Example**: Digital root of 12 × 15
\`\`\`
DR(12)=3, DR(15)=6
3×6=18, DR(18)=9
Actual: 12×15=180, DR(180)=9 ✓
\`\`\`

### Trick 3: **Digital Root for Powers**
Digital root cycles every power.

**Example**: Digital root of 7^n
\`\`\`
7¹: 7, 7²: 49→13→4, 7³: 343→10→1, 7⁴: 2401→7
Cycle: 7, 4, 1, 7, 4, 1...
\`\`\`

### Trick 4: **Repeated Digit Sum**
Keep summing until single digit (digital root).

---

## 📊 Applications in Aptitude

### 1. **Divisibility Tests**
**Example**: Check if 142857 is divisible by 9
\`\`\`
1+4+2+8+5+7=27, 2+7=9
Yes, divisible by 9
\`\`\`

### 2. **Error Detection**
**Example**: ISBN checksum uses digit sums

### 3. **Pattern Recognition**
**Example**: Find missing digit in 12345_ where digit sum should be 25
\`\`\`
1+2+3+4+5+x=15+x=25, so x=10 (impossible)
Wait, 1+2+3+4+5=15, need sum=25, so x=10 (invalid)
\`\`\`

### 4. **Congruence Problems**
**Example**: Find x such that x ≡ 5 (mod 9)
\`\`\`
Digital root should be 5
\`\`\`

---

## 🔍 Advanced Digital Root Concepts

### 1. **Digital Root of Factorials**
**Example**: Digital root of 10!
\`\`\`
10! = 3,628,800
Sum digits repeatedly until single digit
\`\`\`

### 2. **Digital Root in Number Theory**
Used in proofs and properties.

### 3. **Multiplicative Digital Root**
Product of digits repeatedly summed.

### 4. **Digital Root of Large Powers**
**Example**: Digital root of 2^100
\`\`\`
2^1:2, 2^2:4, 2^3:8, 2^4:7, 2^5:5, 2^6:1, 2^7:2...
Cycle: 2,4,8,7,5,1
100÷6=16×6+4, so 2^100 ≡ 2^4 ≡7 (mod 9)
\`\`\`

---

## 🧮 Digital Root Table

| Number | Digital Root |
|--------|--------------|
| 1-9    | Same        |
| 10     | 1           |
| 11     | 2           |
| 12     | 3           |
| ...    | ...         |
| 18     | 9           |
| 19     | 1           |
| 20     | 2           |

**Pattern**: Digital root = n mod 9, except when n mod 9 = 0, then 9.

---

## 🎯 Special Cases

### 1. **Numbers Divisible by 9**
Digital root = 9

### 2. **Perfect Squares**
Digital root can be 1, 4, 7, 9

### 3. **Prime Numbers**
Can have any digital root except multiples of prime factors

### 4. **Zero**
Digital root of 0 is 0

---

## 📝 Practice Examples

### Example 1: Basic Digit Sum
Find digit sum of 987654

**Solution**: 9+8+7+6+5+4 = 39

### Example 2: Digital Root
Find digital root of 987654

**Solution**: 39 → 3+9 = 12 → 1+2 = 3

### Example 3: Divisibility Check
Is 156789 divisible by 9?

**Solution**: Digit sum: 1+5+6+7+8+9=36, 3+6=9, yes

### Example 4: Digital Root of Product
Find digital root of 25 × 36

**Solution**: DR(25)=7, DR(36)=9, 7×9=63, 6+3=9

### Example 5: Digital Root of Power
Find digital root of 3^50

**Solution**: 3^1:3, 3^2:9, 3^3:27→9, cycle:3,9,9,9,...
50 mod 2 = 0, so like 3^2: 9

### Example 6: Missing Digit
Find missing digit: 12_45, digit sum should be 18

**Solution**: 1+2+4+5=12, 18-12=6, so missing digit is 6

### Example 7: Large Number
Find digital root of 123456789

**Solution**: 1+2+3+4+5+6+7+8+9=45, 4+5=9

### Example 8: Congruence
Find x such that DR(x) = 7 and x ≡ 3 (mod 9)

**Solution**: x mod 9 = 3, and DR = 7, so x = 9k + 3 where DR(9k+3)=7

Master digit sum and digital root for divisibility tests and number pattern problems! 🚀`
};
