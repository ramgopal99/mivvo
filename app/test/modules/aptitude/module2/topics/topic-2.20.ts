import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_20: SubLesson = {
  id: "2.20",
  title: 'Trailing Zeros in Factorial',
  status: 'completed',
  content: `# 🔢 Trailing Zeros in Factorial

Trailing zeros in factorials are created by factors of 10 (2×5). Since there are usually more factors of 2 than 5 in a factorial, the number of trailing zeros is determined by the number of times 5 appears as a factor in the prime factorization of n!.

---

## 🎯 What are Trailing Zeros?

Trailing zeros are zeros at the end of a number.

**Examples**:
- 100 has 2 trailing zeros
- 250 has 1 trailing zero
- 123 has 0 trailing zeros

---

## 📊 Why Trailing Zeros in Factorials?

Trailing zeros in n! come from factors of 10 = 2 × 5.

Since there are usually more factors of 2 than 5 in n!, the limiting factor is the number of 5s.

**Example**: 10! = 10 × 9 × 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1
\`\`\`
Powers of 5: floor(10/5) = 2
Powers of 2: floor(10/2)=5, floor(10/4)=2, floor(10/8)=1 → 5+2+1=8
More 2s than 5s, so 2 trailing zeros
\`\`\`

---

## 🧮 Formula for Trailing Zeros

### Basic Formula
Number of trailing zeros in n! = floor(n/5) + floor(n/25) + floor(n/125) + ...

**Why?**
- floor(n/5): numbers divisible by 5
- floor(n/25): numbers divisible by 25 (extra 5)
- floor(n/125): numbers divisible by 125 (extra 5)
- And so on...

**Example**: Trailing zeros in 100!
\`\`\`
floor(100/5) = 20
floor(100/25) = 4
floor(100/125) = 0
Total: 20 + 4 = 24
\`\`\`

---

## 🎯 Step-by-Step Method

### Step 1: **Count multiples of 5**
floor(n/5)

### Step 2: **Count multiples of 25**
floor(n/25) - these contribute an extra 5

### Step 3: **Count multiples of 125**
floor(n/125) - these contribute another extra 5

### Step 4: **Continue for higher powers**
floor(n/625), floor(n/3125), etc.

**Example**: 50!
\`\`\`
floor(50/5) = 10
floor(50/25) = 2
floor(50/125) = 0
Total: 10 + 2 = 12 trailing zeros
\`\`\`

---

## 🧠 Trailing Zeros Tricks

### Trick 1: **For numbers ending with 0**
These contribute both 2 and 5.

**Example**: In 50!, the number 50 = 2 × 5² contributes 2 extra 5s.

### Trick 2: **Pattern Recognition**
Trailing zeros increase at multiples of 5, 25, 125, etc.

### Trick 3: **Quick Estimation**
For large n, approximate using floor(n/4) for rough estimate.

### Trick 4: **Exact vs Minimum**
The formula gives the exact number of trailing zeros.

---

## 📊 Applications in Aptitude

### 1. **Factorial Problems**
**Example**: How many trailing zeros in 25!?
\`\`\`
floor(25/5) = 5
floor(25/25) = 1
Total: 6
\`\`\`

### 2. **Large Number Factorials**
**Example**: 1000! has how many trailing zeros?
\`\`\`
floor(1000/5) = 200
floor(1000/25) = 40
floor(1000/125) = 8
floor(1000/625) = 1
Total: 200 + 40 + 8 + 1 = 249
\`\`\`

### 3. **Comparison Problems**
**Example**: Which has more trailing zeros: 50! or 49! × 50?
\`\`\`
50! has more trailing zeros than 49! × 50
\`\`\`

### 4. **Pattern Questions**
**Example**: Find the highest power of 10 dividing 50!
\`\`\`
Number of trailing zeros = 12 (as above)
So 10^12 divides 50!
\`\`\`

---

## 🔍 Special Cases

### 1. **Small Factorials**
**Example**: 4! = 24, no trailing zeros

### 2. **Powers of 5**
**Example**: 5! = 120, 1 trailing zero

### 3. **Numbers between powers of 5**
**Example**: Between 25 and 124, trailing zeros stay constant except at multiples.

### 4. **Very Large Numbers**
Use the formula systematically.

---

## 🧮 Trailing Zeros vs Powers of 2

### Important Distinction
- Trailing zeros come from 2×5 pairs
- Number of 2s is always more than number of 5s
- So trailing zeros = number of 5s in prime factorization of n!

### Example Comparison
In 10!:
- Number of 5s: floor(10/5) + floor(10/25) = 2 + 0 = 2
- Number of 2s: floor(10/2) + floor(10/4) + floor(10/8) = 5 + 2 + 1 = 8
- Trailing zeros: min(2,8) = 2

---

## 🎯 Related Concepts

### 1. **Highest Power of 2 in n!**
floor(n/2) + floor(n/4) + floor(n/8) + ...

### 2. **Highest Power of 5 in n!**
Same as trailing zeros formula

### 3. **Highest Power of 10 in n!**
Same as trailing zeros

### 4. **General Highest Power**
For prime p in n!: floor(n/p) + floor(n/p²) + floor(n/p³) + ...

---

## 📝 Practice Examples

### Example 1: Basic Trailing Zeros
How many trailing zeros in 20!?

**Solution**: floor(20/5) + floor(20/25) = 4 + 0 = 4

### Example 2: Medium Size
How many trailing zeros in 50!?

**Solution**: floor(50/5) + floor(50/25) = 10 + 2 = 12

### Example 3: Large Factorial
How many trailing zeros in 100!?

**Solution**: floor(100/5) + floor(100/25) + floor(100/125) = 20 + 4 + 0 = 24

### Example 4: Very Large
How many trailing zeros in 1000!?

**Solution**: floor(1000/5) + floor(1000/25) + floor(1000/125) + floor(1000/625) = 200 + 40 + 8 + 1 = 249

### Example 5: Comparison
Compare trailing zeros in 24! and 25!

**Solution**: 24!: floor(24/5)=4, 25!: floor(25/5)+floor(25/25)=5+1=6
So 25! has more trailing zeros

### Example 6: Pattern Question
Find n such that n! has exactly 5 trailing zeros

**Solution**: Need floor(n/5) + floor(n/25) = 5
Try n=25: floor(25/5)+floor(25/25)=5+1=6 (>5)
n=24: floor(24/5)=4 (<5)
n=23: floor(23/5)=4
n=19: floor(19/5)=3
So between 20-24, n=24 gives 4, need 5th at n=25

Actually, need to solve: floor(n/5) + floor(n/25) = 5

Master trailing zeros in factorials to solve factorial-related aptitude problems! 🚀`
};

