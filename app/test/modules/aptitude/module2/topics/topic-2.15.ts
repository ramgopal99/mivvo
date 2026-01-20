import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_15: SubLesson = {
  id: "2.15",
  title: 'Recurring Decimals',
  status: 'completed',
  content: "`# ðŸ”¢ Recurring Decimals

Recurring decimals (repeating decimals) are decimal representations that repeat a pattern infinitely. Understanding how to convert between fractions and recurring decimals is essential for solving complex mathematical problems in quantitative aptitude.

---

## ðŸŽ¯ What are Recurring Decimals?

### Definition
Recurring decimals are decimals where one or more digits repeat infinitely.

**Notation**:
- 0.333... = 0.3Ì… (single digit repeats)
- 0.142857142857... = 0.142857Ì… (multiple digits repeat)
- 0.1666... = 0.1Ì…6Ì… (two digits repeat)

### Types of Recurring Decimals

#### 1. **Pure Recurring Decimals**
Decimal starts with recurring part: 0.333..., 0.142857...

#### 2. **Mixed Recurring Decimals**
Non-recurring part followed by recurring part: 0.1666..., 0.8333...

#### 3. **Terminating Decimals**
End after finite digits: 0.5, 0.25, 0.125

---

## ðŸ“Š Converting Fractions to Recurring Decimals

### Method 1: **Long Division**
Divide numerator by denominator.

**Example**: Convert 1/3 to decimal
\`"\`\`
1 Ã· 3 = 0.333...
3)1.000
   9
  --
   10
    9
   --
    10
\`\`\`
Result: 0.3Ì…

### Method 2: **Calculator Method**
Direct division shows repeating pattern.

---

## ðŸ§® Converting Recurring Decimals to Fractions

### 1. **Pure Recurring Decimals**
**Formula**: Let x = recurring decimal
Multiply by appropriate power of 10 to shift decimal.

**Example**: Convert 0.3Ì… to fraction
\`\`\`
Let x = 0.333...
10x = 3.333...
10x - x = 3.333... - 0.333... = 3
9x = 3
x = 3/9 = 1/3
\`\`\`

**Example**: Convert 0.142857Ì… to fraction
\`\`\`
Let x = 0.142857142857...
Multiply by 6 (length of repeating cycle)
1000000x = 142857.142857...
But 1000000x - x = 142857
999999x = 142857
x = 142857/999999 = 1/7
\`\`\`

### 2. **Mixed Recurring Decimals**
**Example**: Convert 0.16Ì… to fraction
\`\`\`
Let x = 0.1666...
10x = 1.666...
100x = 16.666...
100x - 10x = 16.666... - 1.666... = 15
90x = 15
x = 15/90 = 1/6
\`\`\`

### 3. **Complex Recurring Decimals**
**Example**: Convert 0.12Ì…3Ì… to fraction
\`\`\`
Let x = 0.12333...
100x = 12.333...
1000x = 123.333...
1000x - 100x = 123.333... - 12.333... = 111
900x = 111
x = 111/900
\`\`\`

---

## ðŸŽ¯ Patterns and Shortcuts

### 1. **Single Digit Repeats**
- 0.1Ì… = 1/9
- 0.2Ì… = 2/9
- 0.3Ì… = 3/9 = 1/3
- 0.4Ì… = 4/9
- 0.5Ì… = 5/9
- 0.6Ì… = 6/9 = 2/3
- 0.7Ì… = 7/9
- 0.8Ì… = 8/9
- 0.9Ì… = 9/9 = 1

### 2. **Two Digit Repeats**
- 0.09Ì… = 9/99 = 1/11
- 0.18Ì… = 18/99 = 2/11
- 0.27Ì… = 27/99 = 3/11

### 3. **Three Digit Repeats**
- 0.001Ì… = 1/999
- 0.142857Ì… = 1/7
- 0.285714Ì… = 2/7

---

## ðŸ§  Problem Solving Tricks

### Trick 1: **Identify Repeating Cycle**
Look for the shortest repeating sequence.

**Example**: 0.121212... = 0.12Ì…

### Trick 2: **Use Multiples of 9 or 99**
- Single digit: divide by 9
- Two digits: divide by 99
- Three digits: divide by 999

**Example**: 0.27Ì… = 27/99 = 3/11

### Trick 3: **Mixed Recurring**
Separate non-recurring and recurring parts.

**Example**: 0.123Ì… = 0.1 + 0.02Ì… = 1/10 + 2/90 = 1/10 + 1/45 = 9/90 + 2/90 = 11/90

### Trick 4: **Long Division Patterns**
Recognize when division will produce recurring decimals.

---

## ðŸ“Š Advanced Concepts

### 1. **Non-Repeating Decimals**
Irrational numbers: Ï€, âˆš2, e

### 2. **Eventually Repeating Decimals**
All rational numbers either terminate or repeat.

### 3. **Period of Decimal**
Length of repeating sequence.

### 4. **Pure vs Mixed**
Pure: starts immediately repeating
Mixed: has non-repeating part

---

## ðŸŽ¯ Applications in Aptitude

### 1. **Percentage Calculations**
**Example**: 33.3Ì…% = 1/3

### 2. **Division Problems**
**Example**: 10 Ã· 3 = 3.3Ì…

### 3. **Fraction Comparisons**
**Example**: Compare 1/3 and 0.3Ì… (equal)

### 4. **Pattern Recognition**
**Example**: Find next term: 0.1Ì…, 0.2Ì…, 0.3Ì…, ?

**Solution**: 0.4Ì…

---

## ðŸ” Special Cases

### 1. **Terminating Fractions**
Convert to decimals that end.

**Example**: 1/2 = 0.5 (terminates)
1/4 = 0.25 (terminates)

### 2. **Long Repeating Cycles**
**Example**: 1/17 = 0.0588235294117647Ì… (16 digits repeat)

### 3. **Complex Fractions**
**Example**: 2/7 = 0.285714Ì…

### 4. **Addition of Recurring Decimals**
**Example**: 0.3Ì… + 0.6Ì… = 0.9Ì… = 1

---

## ðŸ§® Conversion Formulas

### General Method for Pure Recurring:
Let x = 0.abcÌ… (where abc repeats n times)
Then x = abc...c / (10^n - 1)

### General Method for Mixed Recurring:
Let x = 0.abÌ…cÌ… (where b repeats, a doesn't)
Then x = [ab - a] / (10Ã—(10^n - 1)) + a/10^m

Where m = digits before repeat, n = repeating digits.

---

## ðŸ“ Practice Examples

### Example 1: Simple Recurring
Convert 0.6Ì… to fraction

**Solution**: 0.666... = 2/3

### Example 2: Mixed Recurring
Convert 0.23Ì… to fraction

**Solution**: Let x = 0.2333...
100x = 23.333...
10x = 2.333...
90x = 21
x = 21/90 = 7/30

### Example 3: Long Repeating
Convert 0.142857Ì… to fraction

**Solution**: 142857/999999 = 1/7

### Example 4: Complex Mixed
Convert 0.123Ì… to fraction

**Solution**: Let x = 0.12333...
100x = 12.333...
1000x = 123.333...
1000x - 100x = 111
900x = 111
x = 111/900 = 37/300

### Example 5: Addition Problem
What is 0.3Ì… + 0.1Ì… + 0.2Ì…?

**Solution**: 1/3 + 1/9 + 2/9 = (3/9 + 1/9 + 2/9) = 6/9 = 2/3 = 0.6Ì…

### Example 6: Division Result
What is 100 Ã· 7?

**Solution**: 14.285714Ì… (pattern repeats every 6 digits)

Master recurring decimals to convert between fractions and decimals! ðŸš€`
};


