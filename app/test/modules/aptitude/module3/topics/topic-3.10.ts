import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_10: SubLesson = {
  id: "3.10",
  title: 'Indices Laws',
  status: 'completed',
  content: `# 🔢 Indices Laws

Indices laws (also called exponent laws) are fundamental rules for working with powers and exponents. These laws allow us to simplify complex expressions involving powers efficiently, which is crucial for aptitude exams.

---

## 🎯 What are Indices?

**Indices** (or exponents) indicate how many times a number is multiplied by itself.

**Notation:** a^n where:
- **a** is the base
- **n** is the index/exponent/power
- **a^n** means a × a × a × ... × a (n times)

**Examples:**
- 2³ = 2 × 2 × 2 = 8
- x⁵ = x × x × x × x × x
- 10⁴ = 10 × 10 × 10 × 10 = 10,000

---

## 📊 The Seven Laws of Indices

### **Law 1: Multiplication Law**
When multiplying powers with the same base, add the indices:
a^m × a^n = a^(m+n)

**Examples:**
- 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128
- x⁵ × x² = x^(5+2) = x⁷
- 10² × 10³ = 10^(2+3) = 10⁵ = 100,000

### **Law 2: Division Law**
When dividing powers with the same base, subtract the indices:
a^m ÷ a^n = a^(m-n)

**Examples:**
- 2⁵ ÷ 2³ = 2^(5-3) = 2² = 4
- x⁷ ÷ x⁴ = x^(7-4) = x³
- 10⁶ ÷ 10² = 10^(6-2) = 10⁴ = 10,000

### **Law 3: Power of a Power**
When raising a power to another power, multiply the indices:
(a^m)^n = a^(m×n)

**Examples:**
- (2³)⁴ = 2^(3×4) = 2¹² = 4,096
- (x²)³ = x^(2×3) = x⁶
- (10²)³ = 10^(2×3) = 10⁶ = 1,000,000

### **Law 4: Power of a Product**
Power of a product equals product of powers:
(a×b)^n = a^n × b^n

**Examples:**
- (2×3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1,296
- (xy)³ = x³ × y³
- (2×5)² = 2² × 5² = 4 × 25 = 100

### **Law 5: Power of a Quotient**
Power of a quotient equals quotient of powers:
(a/b)^n = a^n / b^n

**Examples:**
- (2/3)⁴ = 2⁴ / 3⁴ = 16/81
- (x/y)³ = x³ / y³
- (4/5)² = 4² / 5² = 16/25

### **Law 6: Zero Index**
Any non-zero number raised to power zero equals 1:
a⁰ = 1 (where a ≠ 0)

**Examples:**
- 5⁰ = 1
- (-3)⁰ = 1
- (1/2)⁰ = 1

### **Law 7: Negative Indices**
Negative indices mean reciprocals:
a^(-n) = 1/a^n

**Examples:**
- 2^(-3) = 1/2³ = 1/8
- x^(-2) = 1/x²
- 10^(-1) = 1/10 = 0.1

---

## 🔍 Fractional Indices

### **Fractional Indices as Roots**
a^(1/n) = ^n√a
a^(m/n) = (^n√a)^m or ^n√(a^m)

**Examples:**
- 8^(1/3) = ∛8 = 2
- 16^(1/2) = √16 = 4
- 27^(2/3) = (∛27)² = 3² = 9

### **Negative Fractional Indices**
a^(-m/n) = 1/a^(m/n)

**Examples:**
- 8^(-1/3) = 1/∛8 = 1/2
- 16^(-1/2) = 1/√16 = 1/4

---

## 🧮 Application of Indices Laws

### **Simplifying Expressions**
Use laws to combine and simplify complex expressions.

**Examples:**
- 2³ × 3² × 2⁴ ÷ 2² = 2^(3+4-2) × 3² = 2^5 × 3² = 32 × 9 = 288
- (x² × y³)³ ÷ (x × y²)² = x^(2×3) × y^(3×3) ÷ (x² × y^4) = x^6 × y^9 ÷ x² × y^4 = x^(6-2) × y^(9-4) = x^4 × y^5

### **Solving Equations**
Use indices laws to solve exponential equations.

**Examples:**
- 2^x × 2^(x+1) = 2^(2x+1) = 128 = 2^7 → 2x+1 = 7 → 2x = 6 → x = 3
- (3^x) ÷ (3^(x-1)) = 3^(x - (x-1)) = 3^1 = 3

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong Operation in Division**
\`\`\`
Wrong: 2⁵ ÷ 2³ = 2^(5×3) = 2¹⁵
Right: 2⁵ ÷ 2³ = 2^(5-3) = 2²
\`\`\`

### ❌ **Power of Product Confusion**
\`\`\`
Wrong: (2×3)⁴ = 2×3⁴ = 2×81 = 162
Right: (2×3)⁴ = 2⁴ × 3⁴ = 16×81 = 1,296
\`\`\`

### ❌ **Zero Index Misapplication**
\`\`\`
Wrong: 0⁰ = 0
Right: 0⁰ is undefined (though sometimes taken as 1 in limits)
\`\`\`

### ❌ **Negative Base Confusion**
\`\`\`
Wrong: (-2)³ = -2³ = -8 ✓
Wrong: (-2)^(-3) = -2^(-3) = -1/8 ✗
Right: (-2)^(-3) = 1/(-2)³ = 1/(-8) = -1/8 ✓
\`\`\`

---

## 🎯 Practice Problems

### **Basic Laws:**
1. 2³ × 2⁴ = ?
2. 5⁶ ÷ 5³ = ?
3. (2²)³ = ?
4. (3×2)⁴ = ?

### **Complex Expressions:**
1. 2³ × 3² × 2⁴ ÷ 2² = ?
2. (x² × y³)³ ÷ (x × y²)² = ?
3. 10^6 ÷ 10^2 × 10^3 = ?

### **Negative/Zero Indices:**
1. 2^(-3) = ?
2. 5⁰ = ?
3. 10^(-2) = ?

### **Fractional Indices:**
1. 8^(1/3) = ?
2. 16^(1/2) = ?
3. 27^(2/3) = ?

### **Word Problems:**
1. A bacteria doubles every hour. If there are 2 bacteria now, how many after 5 hours?
2. If x² × x^5 = x^12, find the value of x when x = 3.

### **Equations:**
1. Solve: 2^x × 2^(x+1) = 128
2. Solve: 3^(2x) ÷ 3^x = 27

**Answers:**
Basic: 2⁷=128, 5³=125, 2⁶=64, 3⁴×2⁴=81×16=1,296
Complex: 2^5×3²=32×9=288, x^(6-2)×y^(9-4)=x^4×y^5, 10^(6-2+3)=10^7
Negative/Zero: 1/8, 1, 1/100
Fractional: 2, 4, 9
Word: 2^6=64, 3^12=531441
Equations: 2^(2x+1)=2^7→2x+1=7→x=3, 3^x=27=3^3→x=3

---

## 🎓 Pro Tips for Exams

1. **Apply laws step by step** - don't rush calculations
2. **Combine like bases** before applying laws
3. **Use negative indices** to move terms between numerator and denominator
4. **Remember zero index** equals 1 (except for 0⁰)
5. **Be careful with negative bases** and fractional indices
6. **Practice mental calculations** for common powers
7. **Check answers** by substituting values

Master indices laws to simplify complex exponential expressions efficiently! 🏆`
};

