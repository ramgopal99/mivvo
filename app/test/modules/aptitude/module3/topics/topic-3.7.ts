import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_7: SubLesson = {
  id: "3.7",
  title: 'Powers and Exponents',
  status: 'completed',
  content: "`# ðŸ”¢ Powers and Exponents

Powers and exponents are fundamental concepts in mathematics that appear frequently in aptitude exams. Understanding how to work with powers efficiently is crucial for solving complex problems involving repeated multiplication and scientific notation.

---

## ðŸŽ¯ What are Powers and Exponents?

**Powers** represent repeated multiplication of the same number.
**Exponents** indicate how many times a number is multiplied by itself.

### **Notation:**
a^n = a Ã— a Ã— a Ã— ... Ã— a (n times)

**Examples:**
- 2Â³ = 2 Ã— 2 Ã— 2 = 8
- 5Â² = 5 Ã— 5 = 25
- 10â´ = 10 Ã— 10 Ã— 10 Ã— 10 = 10,000

**Components:**
- **Base**: The number being multiplied (a)
- **Exponent/Power**: Number of times to multiply (n)
- **Value**: Result of the multiplication

---

## ðŸ“Š Special Cases and Rules

### **1. Zero Exponent**
Any non-zero number raised to power zero equals 1:
aâ° = 1 (where a â‰  0)

**Examples:**
- 5â° = 1
- (-3)â° = 1
- (1/2)â° = 1

### **2. Negative Exponents**
Negative exponents mean reciprocals:
a^(-n) = 1/a^n

**Examples:**
- 2^(-3) = 1/2Â³ = 1/8
- 5^(-2) = 1/5Â² = 1/25
- 10^(-1) = 1/10 = 0.1

### **3. Fractional Exponents**
Fractional exponents represent roots:
a^(1/n) = â¿âˆša
a^(m/n) = (â¿âˆša)^m or ^nâˆš(a^m)

**Examples:**
- 8^(1/3) = âˆ›8 = 2
- 16^(1/2) = âˆš16 = 4
- 27^(2/3) = (âˆ›27)Â² = 3Â² = 9

---

## ðŸ§® Laws of Exponents

### **1. Multiplication Law**
When multiplying same bases, add exponents:
a^m Ã— a^n = a^(m+n)

**Examples:**
- 2Â³ Ã— 2â´ = 2^(3+4) = 2â· = 128
- xâµ Ã— xÂ² = x^(5+2) = xâ·
- 10Â² Ã— 10Â³ = 10^(2+3) = 10âµ = 100,000

### **2. Division Law**
When dividing same bases, subtract exponents:
a^m Ã· a^n = a^(m-n)

**Examples:**
- 2âµ Ã· 2Â³ = 2^(5-3) = 2Â² = 4
- xâ· Ã· xâ´ = x^(7-4) = xÂ³
- 10â¶ Ã· 10Â² = 10^(6-2) = 10â´ = 10,000

### **3. Power of a Power**
When raising a power to another power, multiply exponents:
(a^m)^n = a^(mÃ—n)

**Examples:**
- (2Â³)â´ = 2^(3Ã—4) = 2Â¹Â² = 4,096
- (xÂ²)Â³ = x^(2Ã—3) = xâ¶
- (10Â²)Â³ = 10^(2Ã—3) = 10â¶ = 1,000,000

### **4. Power of a Product**
Power of a product equals product of powers:
(aÃ—b)^n = a^n Ã— b^n

**Examples:**
- (2Ã—3)â´ = 2â´ Ã— 3â´ = 16 Ã— 81 = 1,296
- (xy)Â³ = xÂ³ Ã— yÂ³
- (2Ã—5)Â² = 2Â² Ã— 5Â² = 4 Ã— 25 = 100

### **5. Power of a Quotient**
Power of a quotient equals quotient of powers:
(a/b)^n = a^n / b^n

**Examples:**
- (2/3)â´ = 2â´ / 3â´ = 16/81
- (x/y)Â³ = xÂ³ / yÂ³
- (4/5)Â² = 4Â² / 5Â² = 16/25

---

## ðŸ” Scientific Notation

### **What is Scientific Notation?**
Scientific notation expresses very large or small numbers as:
N Ã— 10^k where 1 â‰¤ N < 10 and k is an integer.

**Examples:**
- 3,000 = 3 Ã— 10Â³
- 0.0005 = 5 Ã— 10^(-4)
- 1,500,000 = 1.5 Ã— 10â¶
- 0.0072 = 7.2 Ã— 10^(-3)

### **Operations with Scientific Notation**

#### **Multiplication:**
(2 Ã— 10Â³) Ã— (3 Ã— 10Â²) = (2Ã—3) Ã— 10^(3+2) = 6 Ã— 10âµ

#### **Division:**
(8 Ã— 10â´) Ã· (2 Ã— 10Â²) = (8Ã·2) Ã— 10^(4-2) = 4 Ã— 10Â²

#### **Addition/Subtraction:**
Convert to same power of 10 first:
2 Ã— 10Â³ + 3 Ã— 10Â² = 20 Ã— 10Â² + 3 Ã— 10Â² = 23 Ã— 10Â²

---

## ðŸ§  Common Powers to Remember

### **Powers of 2:**
- 2Â¹ = 2
- 2Â² = 4
- 2Â³ = 8
- 2â´ = 16
- 2âµ = 32
- 2â¶ = 64
- 2â· = 128
- 2â¸ = 256
- 2â¹ = 512
- 2Â¹â° = 1,024

### **Powers of 3:**
- 3Â¹ = 3
- 3Â² = 9
- 3Â³ = 27
- 3â´ = 81
- 3âµ = 243

### **Powers of 4:**
- 4Â¹ = 4
- 4Â² = 16
- 4Â³ = 64
- 4â´ = 256

### **Powers of 5:**
- 5Â¹ = 5
- 5Â² = 25
- 5Â³ = 125
- 5â´ = 625

### **Powers of 10:**
- 10â° = 1
- 10Â¹ = 10
- 10Â² = 100
- 10Â³ = 1,000
- 10â´ = 10,000
- 10âµ = 100,000
- 10â¶ = 1,000,000

---

## ðŸŽ¯ Problem Solving with Powers

### **Example 1: Simplification**
Simplify: 2Â³ Ã— 3Â² Ã— 2â´ Ã· 2Â²

**Solution:** 2^(3+4-2) Ã— 3Â² = 2^5 Ã— 3Â² = 32 Ã— 9 = 288

### **Example 2: Large Numbers**
Express 24,000,000 in scientific notation.

**Solution:** 2.4 Ã— 10â·

### **Example 3: Negative Exponents**
Simplify: (2/3)^(-2)

**Solution:** (3/2)Â² = 9/4

### **Example 4: Fractional Exponents**
Simplify: 8^(2/3)

**Solution:** (âˆ›8)Â² = 2Â² = 4

---

## ðŸš¨ Common Mistakes to Avoid

### âŒ **Wrong Sign in Division**
\`"\`\`
Wrong: 2âµ Ã· 2Â³ = 2^(5+3) = 2â¸
Right: 2âµ Ã· 2Â³ = 2^(5-3) = 2Â²
\`\`\`

### âŒ **Power of Product Error**
\`\`\`
Wrong: (2Ã—3)â´ = 2Ã—3â´ = 2Ã—81 = 162
Right: (2Ã—3)â´ = 2â´ Ã— 3â´ = 16Ã—81 = 1,296
\`\`\`

### âŒ **Zero Exponent Confusion**
\`\`\`
Wrong: 0â° = 0
Right: 0â° is undefined (but often taken as 1 in some contexts)
\`\`\`

### âŒ **Negative Exponent Misapplication**
\`\`\`
Wrong: (-2)Â³ = -2Â³ = -8 âœ“
Wrong: (-2)^(-3) = -2^(-3) = -1/8 âœ—
Right: (-2)^(-3) = 1/(-2)Â³ = 1/(-8) = -1/8 âœ“
\`\`\`

---

## ðŸŽ¯ Practice Problems

### **Basic Laws:**
1. 2Â³ Ã— 2â´ = ?
2. 5â¶ Ã· 5Â³ = ?
3. (2Â²)Â³ = ?
4. (3Ã—2)â´ = ?

### **Scientific Notation:**
1. Express 5,000,000 in scientific notation
2. Express 0.00003 in scientific notation
3. (2Ã—10Â³) Ã— (3Ã—10Â²) = ?

### **Negative/Fractional Exponents:**
1. 2^(-3) = ?
2. 8^(1/3) = ?
3. 16^(-1/2) = ?

### **Complex Problems:**
1. Simplify: 3Â² Ã— 2Â³ Ã— 3â´ Ã· 2Â²
2. Find: (2/3)^(-2)
3. Calculate: 27^(2/3)

### **Word Problems:**
1. A bacteria doubles every hour. If there are 2 bacteria now, how many after 5 hours?
2. Light travels at 3Ã—10â¸ m/s. Express in scientific notation.

**Answers:**
Basic: 2â·=128, 5Â³=125, 2â¶=64, 3â´Ã—2â´=81Ã—16=1,296
Scientific: 5Ã—10â¶, 3Ã—10^(-5), 6Ã—10âµ
Negative/Fractional: 1/8, 2, 1/4
Complex: 3^(2+4)Ã—2^(3-2)=3â¶Ã—2Â¹=729Ã—2=1,458, 9/4, 9
Word: 2â¶=64 bacteria, 3Ã—10â¸ m/s

---

## ðŸŽ“ Pro Tips for Exams

1. **Remember exponent laws** - they save calculation time
2. **Use scientific notation** for very large/small numbers
3. **Memorize common powers** of 2, 3, 4, 5, 10
4. **Be careful with negative bases** and negative exponents
5. **Simplify expressions** before calculating final values
6. **Check units** when working with scientific notation
7. **Practice mental calculations** for quick simplifications

Master powers and exponents to handle advanced mathematical problems with confidence! ðŸ†`
};


