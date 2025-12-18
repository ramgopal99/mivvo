import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_15: SubLesson = {
  id: "2.15",
  title: 'Recurring Decimals',
  status: 'completed',
  content: `# 🔢 Recurring Decimals

Recurring decimals (repeating decimals) are decimal representations that repeat a pattern infinitely. Understanding how to convert between fractions and recurring decimals is essential for solving complex mathematical problems in quantitative aptitude.

---

## 🎯 What are Recurring Decimals?

### Definition
Recurring decimals are decimals where one or more digits repeat infinitely.

**Notation**:
- 0.333... = 0.3̅ (single digit repeats)
- 0.142857142857... = 0.142857̅ (multiple digits repeat)
- 0.1666... = 0.1̅6̅ (two digits repeat)

### Types of Recurring Decimals

#### 1. **Pure Recurring Decimals**
Decimal starts with recurring part: 0.333..., 0.142857...

#### 2. **Mixed Recurring Decimals**
Non-recurring part followed by recurring part: 0.1666..., 0.8333...

#### 3. **Terminating Decimals**
End after finite digits: 0.5, 0.25, 0.125

---

## 📊 Converting Fractions to Recurring Decimals

### Method 1: **Long Division**
Divide numerator by denominator.

**Example**: Convert 1/3 to decimal
\`\`\`
1 ÷ 3 = 0.333...
3)1.000
   9
  --
   10
    9
   --
    10
\`\`\`
Result: 0.3̅

### Method 2: **Calculator Method**
Direct division shows repeating pattern.

---

## 🧮 Converting Recurring Decimals to Fractions

### 1. **Pure Recurring Decimals**
**Formula**: Let x = recurring decimal
Multiply by appropriate power of 10 to shift decimal.

**Example**: Convert 0.3̅ to fraction
\`\`\`
Let x = 0.333...
10x = 3.333...
10x - x = 3.333... - 0.333... = 3
9x = 3
x = 3/9 = 1/3
\`\`\`

**Example**: Convert 0.142857̅ to fraction
\`\`\`
Let x = 0.142857142857...
Multiply by 6 (length of repeating cycle)
1000000x = 142857.142857...
But 1000000x - x = 142857
999999x = 142857
x = 142857/999999 = 1/7
\`\`\`

### 2. **Mixed Recurring Decimals**
**Example**: Convert 0.16̅ to fraction
\`\`\`
Let x = 0.1666...
10x = 1.666...
100x = 16.666...
100x - 10x = 16.666... - 1.666... = 15
90x = 15
x = 15/90 = 1/6
\`\`\`

### 3. **Complex Recurring Decimals**
**Example**: Convert 0.12̅3̅ to fraction
\`\`\`
Let x = 0.12333...
100x = 12.333...
1000x = 123.333...
1000x - 100x = 123.333... - 12.333... = 111
900x = 111
x = 111/900
\`\`\`

---

## 🎯 Patterns and Shortcuts

### 1. **Single Digit Repeats**
- 0.1̅ = 1/9
- 0.2̅ = 2/9
- 0.3̅ = 3/9 = 1/3
- 0.4̅ = 4/9
- 0.5̅ = 5/9
- 0.6̅ = 6/9 = 2/3
- 0.7̅ = 7/9
- 0.8̅ = 8/9
- 0.9̅ = 9/9 = 1

### 2. **Two Digit Repeats**
- 0.09̅ = 9/99 = 1/11
- 0.18̅ = 18/99 = 2/11
- 0.27̅ = 27/99 = 3/11

### 3. **Three Digit Repeats**
- 0.001̅ = 1/999
- 0.142857̅ = 1/7
- 0.285714̅ = 2/7

---

## 🧠 Problem Solving Tricks

### Trick 1: **Identify Repeating Cycle**
Look for the shortest repeating sequence.

**Example**: 0.121212... = 0.12̅

### Trick 2: **Use Multiples of 9 or 99**
- Single digit: divide by 9
- Two digits: divide by 99
- Three digits: divide by 999

**Example**: 0.27̅ = 27/99 = 3/11

### Trick 3: **Mixed Recurring**
Separate non-recurring and recurring parts.

**Example**: 0.123̅ = 0.1 + 0.02̅ = 1/10 + 2/90 = 1/10 + 1/45 = 9/90 + 2/90 = 11/90

### Trick 4: **Long Division Patterns**
Recognize when division will produce recurring decimals.

---

## 📊 Advanced Concepts

### 1. **Non-Repeating Decimals**
Irrational numbers: π, √2, e

### 2. **Eventually Repeating Decimals**
All rational numbers either terminate or repeat.

### 3. **Period of Decimal**
Length of repeating sequence.

### 4. **Pure vs Mixed**
Pure: starts immediately repeating
Mixed: has non-repeating part

---

## 🎯 Applications in Aptitude

### 1. **Percentage Calculations**
**Example**: 33.3̅% = 1/3

### 2. **Division Problems**
**Example**: 10 ÷ 3 = 3.3̅

### 3. **Fraction Comparisons**
**Example**: Compare 1/3 and 0.3̅ (equal)

### 4. **Pattern Recognition**
**Example**: Find next term: 0.1̅, 0.2̅, 0.3̅, ?

**Solution**: 0.4̅

---

## 🔍 Special Cases

### 1. **Terminating Fractions**
Convert to decimals that end.

**Example**: 1/2 = 0.5 (terminates)
1/4 = 0.25 (terminates)

### 2. **Long Repeating Cycles**
**Example**: 1/17 = 0.0588235294117647̅ (16 digits repeat)

### 3. **Complex Fractions**
**Example**: 2/7 = 0.285714̅

### 4. **Addition of Recurring Decimals**
**Example**: 0.3̅ + 0.6̅ = 0.9̅ = 1

---

## 🧮 Conversion Formulas

### General Method for Pure Recurring:
Let x = 0.abc̅ (where abc repeats n times)
Then x = abc...c / (10^n - 1)

### General Method for Mixed Recurring:
Let x = 0.ab̅c̅ (where b repeats, a doesn't)
Then x = [ab - a] / (10×(10^n - 1)) + a/10^m

Where m = digits before repeat, n = repeating digits.

---

## 📝 Practice Examples

### Example 1: Simple Recurring
Convert 0.6̅ to fraction

**Solution**: 0.666... = 2/3

### Example 2: Mixed Recurring
Convert 0.23̅ to fraction

**Solution**: Let x = 0.2333...
100x = 23.333...
10x = 2.333...
90x = 21
x = 21/90 = 7/30

### Example 3: Long Repeating
Convert 0.142857̅ to fraction

**Solution**: 142857/999999 = 1/7

### Example 4: Complex Mixed
Convert 0.123̅ to fraction

**Solution**: Let x = 0.12333...
100x = 12.333...
1000x = 123.333...
1000x - 100x = 111
900x = 111
x = 111/900 = 37/300

### Example 5: Addition Problem
What is 0.3̅ + 0.1̅ + 0.2̅?

**Solution**: 1/3 + 1/9 + 2/9 = (3/9 + 1/9 + 2/9) = 6/9 = 2/3 = 0.6̅

### Example 6: Division Result
What is 100 ÷ 7?

**Solution**: 14.285714̅ (pattern repeats every 6 digits)

Master recurring decimals to convert between fractions and decimals! 🚀`
};

