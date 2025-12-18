import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: "2.2",
  title: 'Addition, Subtraction, Multiplication, Division of Numbers',
  status: 'completed',
  content: `# 🔢 Basic Arithmetic Operations

Master the fundamental operations of mathematics! Addition, subtraction, multiplication, and division form the building blocks of all complex calculations. Understanding these operations thoroughly is essential for aptitude exams.

---

## 🎯 The Four Fundamental Operations

### 1. **Addition (+)** - Combining Numbers
- **Definition**: Adding numbers together to get a total
- **Symbol**: +
- **Examples**: 5 + 3 = 8, 12 + 7 = 19

### 2. **Subtraction (-)** - Finding Difference
- **Definition**: Taking away one number from another
- **Symbol**: -
- **Examples**: 8 - 3 = 5, 15 - 7 = 8

### 3. **Multiplication (×)** - Repeated Addition
- **Definition**: Adding a number multiple times
- **Symbol**: × or *
- **Examples**: 4 × 3 = 12, 6 × 7 = 42

### 4. **Division (÷)** - Splitting into Equal Parts
- **Definition**: Dividing a number into equal parts
- **Symbol**: ÷ or /
- **Examples**: 12 ÷ 3 = 4, 20 ÷ 5 = 4

---

## 📊 Properties of Operations

### **Addition Properties**
- **Commutative**: a + b = b + a
  - 3 + 5 = 5 + 3 = 8
- **Associative**: (a + b) + c = a + (b + c)
  - (2 + 3) + 4 = 2 + (3 + 4) = 9
- **Identity**: a + 0 = a
  - 7 + 0 = 7

### **Multiplication Properties**
- **Commutative**: a × b = b × a
  - 4 × 5 = 5 × 4 = 20
- **Associative**: (a × b) × c = a × (b × c)
  - (2 × 3) × 4 = 2 × (3 × 4) = 24
- **Identity**: a × 1 = a
  - 9 × 1 = 9
- **Zero Property**: a × 0 = 0

### **Division Properties**
- **Not Commutative**: a ÷ b ≠ b ÷ a
  - 8 ÷ 2 = 4, but 2 ÷ 8 = 0.25
- **Not Associative**: (a ÷ b) ÷ c ≠ a ÷ (b ÷ c)

---

## 🧮 Step-by-Step Calculation Methods

### **Addition of Large Numbers**
\`\`\`
  456
+ 278
-----
  734
\`\`\`

**Method**: Add units (6+8=14, write 4, carry 1), tens (5+7+1=13, write 3, carry 1), hundreds (4+2+1=7)

### **Subtraction of Large Numbers**
\`\`\`
  856
- 478
-----
  378
\`\`\`

**Method**: Subtract units (6-8, borrow 1 making 16-8=8), tens (5-7, borrow 1 making 15-7=8), hundreds (7-4=3)

### **Multiplication**
\`\`\`
   456
×    3
-----
  1368
\`\`\`

**Method**: 456 × 3 = 1368

**Long Multiplication:**
\`\`\`
   234
×   56
------
  1404  (234 × 6)
 1170   (234 × 50)
------
 13104
\`\`\`

### **Division**
\`\`\`
5 ) 25
   ---
   25
   25
   ---
    0
\`\`\`

**Result**: 25 ÷ 5 = 5

**Long Division:**
\`\`\`
  3  (quotient)
2 ) 6  (divide 6÷2=3)
    6  (multiply 3×2=6)
   ---
    0  (subtract 6-6=0)
\`\`\`

---

## 🎯 Special Cases and Tricks

### **Addition Tricks**
- **Adding 9**: 47 + 9 = 56 (7+9=16, write 6 carry 1, 4+1=5)
- **Adding 99**: 247 + 99 = 346 (47+99=146, write 46 carry 1, 2+1=3)
- **Round numbers**: 48 + 52 = 100 (50+50=100, adjust for 2+2=4 difference)

### **Subtraction Tricks**
- **Subtracting 9**: 53 - 9 = 44 (53-10+1=44)
- **Subtracting 99**: 247 - 99 = 148 (247-100+1=148)
- **Complements**: 1000 - 456 = 544 (1000 - 500 = 500, 500 - 56 = 444? Wait, better: 999 - 456 = 543, then +1 = 544)

### **Multiplication Tricks**
- **Multiplying by 5**: Add 0 and divide by 2: 47 × 5 = 235
- **Multiplying by 25**: ×100 ÷ 4: 16 × 25 = 400
- **Multiplying by 11**: 23 × 11 = 253 (2, 2+3=5, 3)
- **Multiplying by 9**: ×10 - ×1: 17 × 9 = 153

### **Division Tricks**
- **Dividing by 5**: ×2 ÷ 10: 85 ÷ 5 = 17
- **Dividing by 25**: ×4 ÷ 100: 100 ÷ 25 = 4
- **Dividing by 9**: Use multiplication table reverse
- **Dividing by 11**: Alternating sum method

---

## 🔢 Working with Decimals

### **Addition of Decimals**
\`\`\`
  45.67
+ 23.89
-------
  69.56
\`\`\`

**Rule**: Align decimal points, add like whole numbers.

### **Subtraction of Decimals**
\`\`\`
  45.67
- 23.89
-------
  21.78
\`\`\`

**Rule**: Align decimal points, subtract like whole numbers.

### **Multiplication of Decimals**
\`\`\`
   4.5
×  2.3
------
  10.35
\`\`\`

**Rule**: Ignore decimals, multiply, then place decimal point (1 + 1 = 2 places from right).

### **Division of Decimals**
\`\`\`
2.4 ) 7.2
     7.2
     ---
      0
\`\`\`

**Rule**: Move decimal points to make divisor whole number.

---

## 🧠 Mental Math Techniques

### **Addition Shortcuts**
- **Grouping**: 7 + 8 + 3 = (7 + 3) + 8 = 10 + 8 = 18
- **Compensation**: 49 + 52 = 50 + 51 = 101 (adjusted for 1+1=2 difference)
- **Front-end addition**: Start from left: 23 + 47 = 70, then adjust

### **Multiplication Shortcuts**
- **Breaking numbers**: 17 × 8 = 10×8 + 7×8 = 80 + 56 = 136
- **Using 10s**: 23 × 19 = 23 × (20 - 1) = 460 - 23 = 437
- **Squaring near 50**: 48² = (50-2)² = 2500 - 200 + 4 = 2304

---

## 🚨 Common Mistakes to Avoid

1. **Carrying over in addition**: Always carry to next column
2. **Borrowing in subtraction**: Don't forget to reduce borrowed digit
3. **Decimal alignment**: Always align decimal points
4. **Zero multiplication**: Any number × 0 = 0
5. **Division by zero**: Undefined - never divide by zero

---

## 🎯 Practice Problems

**Basic Operations:**
1. 456 + 278 = ?
2. 856 - 478 = ?
3. 234 × 56 = ?
4. 13104 ÷ 56 = ?

**Decimal Operations:**
1. 45.67 + 23.89 = ?
2. 45.67 - 23.89 = ?
3. 4.5 × 2.3 = ?
4. 7.2 ÷ 2.4 = ?

**Mental Math:**
1. 47 × 9 = ?
2. 85 ÷ 5 = ?
3. 23 × 19 = ?
4. 48² = ?

**Answers:** 734, 378, 13104, 234, 69.56, 21.78, 10.35, 3, 423, 17, 437, 2304

---

## 🎓 Exam Strategies

1. **Estimate first**: Always estimate answers before calculating
2. **Check calculations**: Use reverse operations to verify
3. **Look for patterns**: Use shortcuts when possible
4. **Break complex problems**: Split into smaller, manageable parts
5. **Practice mental math**: Speed up calculations for time-bound exams

Master these operations and you'll handle any arithmetic problem with confidence! 🏆`
};