import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_10: SubLesson = {
  id: "3.10",
  title: 'Indices Laws',
  status: 'completed',
  content: "`# ðŸ”¢ Indices Laws

Indices laws (also called exponent laws) are fundamental rules for working with powers and exponents. These laws allow us to simplify complex expressions involving powers efficiently, which is crucial for aptitude exams.

---

## ðŸŽ¯ What are Indices?

**Indices** (or exponents) indicate how many times a number is multiplied by itself.

**Notation:** a^n where:
- **a** is the base
- **n** is the index/exponent/power
- **a^n** means a Ã— a Ã— a Ã— ... Ã— a (n times)

**Examples:**
- 2Â³ = 2 Ã— 2 Ã— 2 = 8
- xâµ = x Ã— x Ã— x Ã— x Ã— x
- 10â´ = 10 Ã— 10 Ã— 10 Ã— 10 = 10,000

---

## ðŸ“Š The Seven Laws of Indices

### **Law 1: Multiplication Law**
When multiplying powers with the same base, add the indices:
a^m Ã— a^n = a^(m+n)

**Examples:**
- 2Â³ Ã— 2â´ = 2^(3+4) = 2â· = 128
- xâµ Ã— xÂ² = x^(5+2) = xâ·
- 10Â² Ã— 10Â³ = 10^(2+3) = 10âµ = 100,000

### **Law 2: Division Law**
When dividing powers with the same base, subtract the indices:
a^m Ã· a^n = a^(m-n)

**Examples:**
- 2âµ Ã· 2Â³ = 2^(5-3) = 2Â² = 4
- xâ· Ã· xâ´ = x^(7-4) = xÂ³
- 10â¶ Ã· 10Â² = 10^(6-2) = 10â´ = 10,000

### **Law 3: Power of a Power**
When raising a power to another power, multiply the indices:
(a^m)^n = a^(mÃ—n)

**Examples:**
- (2Â³)â´ = 2^(3Ã—4) = 2Â¹Â² = 4,096
- (xÂ²)Â³ = x^(2Ã—3) = xâ¶
- (10Â²)Â³ = 10^(2Ã—3) = 10â¶ = 1,000,000

### **Law 4: Power of a Product**
Power of a product equals product of powers:
(aÃ—b)^n = a^n Ã— b^n

**Examples:**
- (2Ã—3)â´ = 2â´ Ã— 3â´ = 16 Ã— 81 = 1,296
- (xy)Â³ = xÂ³ Ã— yÂ³
- (2Ã—5)Â² = 2Â² Ã— 5Â² = 4 Ã— 25 = 100

### **Law 5: Power of a Quotient**
Power of a quotient equals quotient of powers:
(a/b)^n = a^n / b^n

**Examples:**
- (2/3)â´ = 2â´ / 3â´ = 16/81
- (x/y)Â³ = xÂ³ / yÂ³
- (4/5)Â² = 4Â² / 5Â² = 16/25

### **Law 6: Zero Index**
Any non-zero number raised to power zero equals 1:
aâ° = 1 (where a â‰  0)

**Examples:**
- 5â° = 1
- (-3)â° = 1
- (1/2)â° = 1

### **Law 7: Negative Indices**
Negative indices mean reciprocals:
a^(-n) = 1/a^n

**Examples:**
- 2^(-3) = 1/2Â³ = 1/8
- x^(-2) = 1/xÂ²
- 10^(-1) = 1/10 = 0.1

---

## ðŸ” Fractional Indices

### **Fractional Indices as Roots**
a^(1/n) = ^nâˆša
a^(m/n) = (^nâˆša)^m or ^nâˆš(a^m)

**Examples:**
- 8^(1/3) = âˆ›8 = 2
- 16^(1/2) = âˆš16 = 4
- 27^(2/3) = (âˆ›27)Â² = 3Â² = 9

### **Negative Fractional Indices**
a^(-m/n) = 1/a^(m/n)

**Examples:**
- 8^(-1/3) = 1/âˆ›8 = 1/2
- 16^(-1/2) = 1/âˆš16 = 1/4

---

## ðŸ§® Application of Indices Laws

### **Simplifying Expressions**
Use laws to combine and simplify complex expressions.

**Examples:**
- 2Â³ Ã— 3Â² Ã— 2â´ Ã· 2Â² = 2^(3+4-2) Ã— 3Â² = 2^5 Ã— 3Â² = 32 Ã— 9 = 288
- (xÂ² Ã— yÂ³)Â³ Ã· (x Ã— yÂ²)Â² = x^(2Ã—3) Ã— y^(3Ã—3) Ã· (xÂ² Ã— y^4) = x^6 Ã— y^9 Ã· xÂ² Ã— y^4 = x^(6-2) Ã— y^(9-4) = x^4 Ã— y^5

### **Solving Equations**
Use indices laws to solve exponential equations.

**Examples:**
- 2^x Ã— 2^(x+1) = 2^(2x+1) = 128 = 2^7 â†’ 2x+1 = 7 â†’ 2x = 6 â†’ x = 3
- (3^x) Ã· (3^(x-1)) = 3^(x - (x-1)) = 3^1 = 3

---

## ðŸš¨ Common Mistakes to Avoid

### âŒ **Wrong Operation in Division**
\`"\`\`
Wrong: 2âµ Ã· 2Â³ = 2^(5Ã—3) = 2Â¹âµ
Right: 2âµ Ã· 2Â³ = 2^(5-3) = 2Â²
\`\`\`

### âŒ **Power of Product Confusion**
\`\`\`
Wrong: (2Ã—3)â´ = 2Ã—3â´ = 2Ã—81 = 162
Right: (2Ã—3)â´ = 2â´ Ã— 3â´ = 16Ã—81 = 1,296
\`\`\`

### âŒ **Zero Index Misapplication**
\`\`\`
Wrong: 0â° = 0
Right: 0â° is undefined (though sometimes taken as 1 in limits)
\`\`\`

### âŒ **Negative Base Confusion**
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

### **Complex Expressions:**
1. 2Â³ Ã— 3Â² Ã— 2â´ Ã· 2Â² = ?
2. (xÂ² Ã— yÂ³)Â³ Ã· (x Ã— yÂ²)Â² = ?
3. 10^6 Ã· 10^2 Ã— 10^3 = ?

### **Negative/Zero Indices:**
1. 2^(-3) = ?
2. 5â° = ?
3. 10^(-2) = ?

### **Fractional Indices:**
1. 8^(1/3) = ?
2. 16^(1/2) = ?
3. 27^(2/3) = ?

### **Word Problems:**
1. A bacteria doubles every hour. If there are 2 bacteria now, how many after 5 hours?
2. If xÂ² Ã— x^5 = x^12, find the value of x when x = 3.

### **Equations:**
1. Solve: 2^x Ã— 2^(x+1) = 128
2. Solve: 3^(2x) Ã· 3^x = 27

**Answers:**
Basic: 2â·=128, 5Â³=125, 2â¶=64, 3â´Ã—2â´=81Ã—16=1,296
Complex: 2^5Ã—3Â²=32Ã—9=288, x^(6-2)Ã—y^(9-4)=x^4Ã—y^5, 10^(6-2+3)=10^7
Negative/Zero: 1/8, 1, 1/100
Fractional: 2, 4, 9
Word: 2^6=64, 3^12=531441
Equations: 2^(2x+1)=2^7â†’2x+1=7â†’x=3, 3^x=27=3^3â†’x=3

---

## ðŸŽ“ Pro Tips for Exams

1. **Apply laws step by step** - don't rush calculations
2. **Combine like bases** before applying laws
3. **Use negative indices** to move terms between numerator and denominator
4. **Remember zero index** equals 1 (except for 0â°)
5. **Be careful with negative bases** and fractional indices
6. **Practice mental calculations** for common powers
7. **Check answers** by substituting values

Master indices laws to simplify complex exponential expressions efficiently! ðŸ†`
};


