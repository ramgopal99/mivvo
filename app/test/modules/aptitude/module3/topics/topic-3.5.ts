import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_5: SubLesson = {
  id: "3.5",
  title: 'Decimal Numbers',
  status: 'completed',
  content: "`# ðŸ”¢ Decimal Numbers

Decimal numbers are essential in mathematics and everyday calculations. Understanding decimal operations, conversions, and properties is crucial for aptitude exams. Let's explore the world of decimal numbers and their applications!

---

## ðŸŽ¯ What are Decimal Numbers?

**Decimal numbers** use the base-10 system with a decimal point to separate whole numbers from fractional parts.

### **Structure of Decimal Numbers**
\`"\`\`
Whole Number Part . Fractional Part
       â†‘              â†‘
     123      .     456
\`\`\`

- **Whole number part**: Numbers left of decimal point
- **Decimal point**: Separates whole and fractional parts
- **Fractional part**: Numbers right of decimal point

**Examples:**
- 3.14 (Pi approximation)
- 0.5 (One half)
- 25.75 (Twenty-five and three-quarters)
- 100.001 (One hundred point zero zero one)

---

## ðŸ“Š Types of Decimal Numbers

### **1. Terminating Decimals**
Decimals that end after finite digits
- Examples: 0.5, 1.25, 3.75, 4.0
- Convert easily to fractions: 0.5 = \\frac{1}{2}, 1.25 = \\frac{5}{4}

### **2. Non-terminating Decimals**
Decimals that continue infinitely

#### **Recurring (Repeating) Decimals**
- Examples: 0.333..., 0.1666..., 1.272727...
- Notation: 0.3Ì…, 0.16Ì…, 1.27Ì…
- Can be converted to fractions

#### **Non-recurring Decimals**
- Examples: Ï€ = 3.1415926535..., e = 2.7182818284...
- Cannot be expressed as exact fractions
- Known as irrational numbers

---

## ðŸ”„ Converting Between Decimals and Fractions

### **Decimal to Fraction**

#### **Terminating Decimals**
Move decimal point to make whole number, divide by power of 10:

**Examples:**
- 0.5 = \\frac{5}{10} = \\frac{1}{2}
- 1.25 = \\frac{125}{100} = \\frac{5}{4}
- 0.375 = \\frac{375}{1000} = \\frac{3}{8}

#### **Recurring Decimals**
Use algebraic method:

**Pure recurring decimals (0.abÌ…cÌ…):**
Formula: \\frac{abc...}{999...} (same number of 9s as recurring digits)

**Examples:**
- 0.3Ì… = \\frac{3}{9} = \\frac{1}{3}
- 0.27Ì… = \\frac{27}{99} = \\frac{3}{11}
- 0.142857Ì… = \\frac{142857}{999999} = \\frac{1}{7}

**Mixed recurring decimals (0.abÌ…cÌ…d):**
Formula: \\frac{abc... - ab...}{999... - 00...} (non-recurring digits as zeros)

**Examples:**
- 0.1Ì…6Ì… = \\frac{16 - 1}{99 - 0} = \\frac{15}{99} = \\frac{5}{33}
- 0.23Ì…4Ì… = \\frac{234 - 23}{999 - 00} = \\frac{211}{900}

### **Fraction to Decimal**
Divide numerator by denominator:

**Examples:**
- \\frac{1}{2} = 0.5
- \\frac{1}{3} = 0.333... = 0.3Ì…
- \\frac{2}{3} = 0.666... = 0.6Ì…
- \\frac{1}{7} = 0.142857Ì…

---

## ðŸ§® Decimal Operations

### **1. Addition of Decimals**
Align decimal points vertically, add like whole numbers:

\`\`\`
  45.67
+ 23.89
-------
  69.56
\`\`\`

**Rule:** Ignore decimal point for addition, place in sum at same relative position.

### **2. Subtraction of Decimals**
Align decimal points vertically, subtract like whole numbers:

\`\`\`
  45.67
- 23.89
-------
  21.78
\`\`\`

**Rule:** Borrow across decimal point if needed.

### **3. Multiplication of Decimals**
Multiply as whole numbers, count total decimal places:

\`\`\`
   4.5
Ã—  2.3
------
  135  (4.5 Ã— 2.3 = 10.35)
\`\`\`

**Rule:** Count decimal places in both numbers (1 + 1 = 2), place decimal 2 places from right in product.

### **4. Division of Decimals**
Move decimal points to make divisor whole number:

**Example:** 7.2 Ã· 2.4
\`\`\`
Move decimal right by 1 in both: 72 Ã· 24 = 3
\`\`\`

**Rule:** Move decimal in dividend and divisor same number of places to make divisor whole.

---

## ðŸ” Rounding and Approximation

### **Rounding Rules**
- **0-4**: Round down
- **5-9**: Round up

**Examples:**
- 3.14159 to 2 decimal places = 3.14
- 3.14159 to 3 decimal places = 3.142
- 2.5 to nearest whole number = 3

### **Significant Figures**
Keep specified number of meaningful digits:

**Examples:**
- 123.456 to 3 significant figures = 123
- 0.001234 to 2 significant figures = 0.0012

---

## ðŸ§  Decimal Shortcuts and Tricks

### **Multiplication by Powers of 10**
- Move decimal right for multiplication: 2.5 Ã— 10 = 25
- Move decimal left for division: 25 Ã· 10 = 2.5
- Move decimal right for Ã—100: 2.5 Ã— 100 = 250

### **Quick Conversions**
- 0.5 = \\frac{1}{2}
- 0.25 = \\frac{1}{4}
- 0.75 = \\frac{3}{4}
- 0.333... = \\frac{1}{3}
- 0.666... = \\frac{2}{3}

### **Mental Math Techniques**
- **Adding near numbers**: 0.99 + 0.01 = 1.00
- **Multiplying by 0.5**: Divide by 2, move decimal left
- **Percentage calculations**: Move decimal for percentages

---

## ðŸŽ¯ Decimal in Word Problems

### **Money Problems**
A shirt costs $24.50 and pants cost $39.75. Total cost?
**Answer:** $24.50 + $39.75 = $64.25

### **Measurement Problems**
A rope is 12.5 meters long. Cut into 4 equal pieces. Each piece?
**Answer:** 12.5 Ã· 4 = 3.125 meters

### **Percentage Problems**
Price increased from $100.00 to $125.50. Percentage increase?
**Answer:** (($125.50 - $100.00) Ã· $100.00) Ã— 100% = 25.5%

### **Average Problems**
Test scores: 85.5, 92.3, 78.8, 88.9. Average?
**Answer:** (85.5 + 92.3 + 78.8 + 88.9) Ã· 4 = 345.5 Ã· 4 = 86.375

---

## ðŸš¨ Common Mistakes to Avoid

### âŒ **Misaligned Decimals**
\`\`\`
Wrong:  45.67
       + 23.89
       -------
        69.56  (wrong alignment)
\`\`\`

\`\`\`
Right:   45.67
       + 23.89
       -------
        69.56
\`\`\`

### âŒ **Wrong Decimal Placement in Product**
\`\`\`
Wrong: 4.5 Ã— 2.3 = 13.5 (forgot decimal places)
Right: 4.5 Ã— 2.3 = 10.35 (1+1=2 decimal places)
\`\`\`

### âŒ **Division Without Adjusting Decimals**
\`\`\`
Wrong: 7.2 Ã· 2.4 = 3 (forgot to move decimals)
Right: 72 Ã· 24 = 3 (moved decimals right by 1)
\`\`\`

### âŒ **Rounding Errors**
\`\`\`
Wrong: 3.14159 to 2 decimal places = 3.15 (wrong rounding)
Right: 3.14159 to 2 decimal places = 3.14 (1 < 5, round down)
\`\`\`

---

## ðŸŽ¯ Practice Problems

### **Basic Operations:**
1. 45.67 + 23.89 = ?
2. 45.67 - 23.89 = ?
3. 4.5 Ã— 2.3 = ?
4. 7.2 Ã· 2.4 = ?

### **Conversions:**
1. 0.25 = ?
2. 0.3Ì… = ?
3. 0.142857Ì… = ?
4. \\frac{3}{8} = ?

### **Rounding:**
1. 3.14159 to 2 decimal places
2. 2.987 to 1 decimal place
3. 156.789 to nearest whole number

### **Word Problems:**
1. Three items cost $12.50, $8.75, and $15.25. Total cost?
2. A 50-meter rope is cut into 8 equal pieces. Length of each?
3. Temperature changed from 25.6Â°C to 31.8Â°C. Change in temperature?

### **Mental Math:**
1. 0.5 Ã— 0.5 = ?
2. 0.25 Ã— 4 = ?
3. 100 Ã· 0.25 = ?

**Answers:**
Basic: 69.56, 21.78, 10.35, 3
Conversions: \\frac{1}{4}, \\frac{1}{3}, \\frac{1}{7}, 0.375
Rounding: 3.14, 3.0, 157
Word: $36.50, 6.25 meters, 6.2Â°C
Mental: 0.25, 1, 400

---

## ðŸŽ“ Pro Tips for Exams

1. **Always align decimal points** for addition/subtraction
2. **Count decimal places carefully** in multiplication
3. **Make divisor whole** in division by moving decimals
4. **Round appropriately** based on problem requirements
5. **Use estimation** to check reasonableness of answers
6. **Remember common fraction-decimal equivalents**
7. **Practice mental decimal calculations** for speed

Master decimal numbers and you'll handle quantitative problems with ease! ðŸ†`
};


