import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_7: SubLesson = {
  id: "3.7",
  title: 'Powers and Exponents',
  status: 'completed',
  content: `# 🔢 Powers and Exponents

Powers and exponents are fundamental concepts in mathematics that appear frequently in aptitude exams. Understanding how to work with powers efficiently is crucial for solving complex problems involving repeated multiplication and scientific notation.

---

## 🎯 What are Powers and Exponents?

**Powers** represent repeated multiplication of the same number.
**Exponents** indicate how many times a number is multiplied by itself.

### **Notation:**
a^n = a × a × a × ... × a (n times)

**Examples:**
- 2³ = 2 × 2 × 2 = 8
- 5² = 5 × 5 = 25
- 10⁴ = 10 × 10 × 10 × 10 = 10,000

**Components:**
- **Base**: The number being multiplied (a)
- **Exponent/Power**: Number of times to multiply (n)
- **Value**: Result of the multiplication

---

## 📊 Special Cases and Rules

### **1. Zero Exponent**
Any non-zero number raised to power zero equals 1:
a⁰ = 1 (where a ≠ 0)

**Examples:**
- 5⁰ = 1
- (-3)⁰ = 1
- (1/2)⁰ = 1

### **2. Negative Exponents**
Negative exponents mean reciprocals:
a^(-n) = 1/a^n

**Examples:**
- 2^(-3) = 1/2³ = 1/8
- 5^(-2) = 1/5² = 1/25
- 10^(-1) = 1/10 = 0.1

### **3. Fractional Exponents**
Fractional exponents represent roots:
a^(1/n) = ⁿ√a
a^(m/n) = (ⁿ√a)^m or ^n√(a^m)

**Examples:**
- 8^(1/3) = ∛8 = 2
- 16^(1/2) = √16 = 4
- 27^(2/3) = (∛27)² = 3² = 9

---

## 🧮 Laws of Exponents

### **1. Multiplication Law**
When multiplying same bases, add exponents:
a^m × a^n = a^(m+n)

**Examples:**
- 2³ × 2⁴ = 2^(3+4) = 2⁷ = 128
- x⁵ × x² = x^(5+2) = x⁷
- 10² × 10³ = 10^(2+3) = 10⁵ = 100,000

### **2. Division Law**
When dividing same bases, subtract exponents:
a^m ÷ a^n = a^(m-n)

**Examples:**
- 2⁵ ÷ 2³ = 2^(5-3) = 2² = 4
- x⁷ ÷ x⁴ = x^(7-4) = x³
- 10⁶ ÷ 10² = 10^(6-2) = 10⁴ = 10,000

### **3. Power of a Power**
When raising a power to another power, multiply exponents:
(a^m)^n = a^(m×n)

**Examples:**
- (2³)⁴ = 2^(3×4) = 2¹² = 4,096
- (x²)³ = x^(2×3) = x⁶
- (10²)³ = 10^(2×3) = 10⁶ = 1,000,000

### **4. Power of a Product**
Power of a product equals product of powers:
(a×b)^n = a^n × b^n

**Examples:**
- (2×3)⁴ = 2⁴ × 3⁴ = 16 × 81 = 1,296
- (xy)³ = x³ × y³
- (2×5)² = 2² × 5² = 4 × 25 = 100

### **5. Power of a Quotient**
Power of a quotient equals quotient of powers:
(a/b)^n = a^n / b^n

**Examples:**
- (2/3)⁴ = 2⁴ / 3⁴ = 16/81
- (x/y)³ = x³ / y³
- (4/5)² = 4² / 5² = 16/25

---

## 🔍 Scientific Notation

### **What is Scientific Notation?**
Scientific notation expresses very large or small numbers as:
N × 10^k where 1 ≤ N < 10 and k is an integer.

**Examples:**
- 3,000 = 3 × 10³
- 0.0005 = 5 × 10^(-4)
- 1,500,000 = 1.5 × 10⁶
- 0.0072 = 7.2 × 10^(-3)

### **Operations with Scientific Notation**

#### **Multiplication:**
(2 × 10³) × (3 × 10²) = (2×3) × 10^(3+2) = 6 × 10⁵

#### **Division:**
(8 × 10⁴) ÷ (2 × 10²) = (8÷2) × 10^(4-2) = 4 × 10²

#### **Addition/Subtraction:**
Convert to same power of 10 first:
2 × 10³ + 3 × 10² = 20 × 10² + 3 × 10² = 23 × 10²

---

## 🧠 Common Powers to Remember

### **Powers of 2:**
- 2¹ = 2
- 2² = 4
- 2³ = 8
- 2⁴ = 16
- 2⁵ = 32
- 2⁶ = 64
- 2⁷ = 128
- 2⁸ = 256
- 2⁹ = 512
- 2¹⁰ = 1,024

### **Powers of 3:**
- 3¹ = 3
- 3² = 9
- 3³ = 27
- 3⁴ = 81
- 3⁵ = 243

### **Powers of 4:**
- 4¹ = 4
- 4² = 16
- 4³ = 64
- 4⁴ = 256

### **Powers of 5:**
- 5¹ = 5
- 5² = 25
- 5³ = 125
- 5⁴ = 625

### **Powers of 10:**
- 10⁰ = 1
- 10¹ = 10
- 10² = 100
- 10³ = 1,000
- 10⁴ = 10,000
- 10⁵ = 100,000
- 10⁶ = 1,000,000

---

## 🎯 Problem Solving with Powers

### **Example 1: Simplification**
Simplify: 2³ × 3² × 2⁴ ÷ 2²

**Solution:** 2^(3+4-2) × 3² = 2^5 × 3² = 32 × 9 = 288

### **Example 2: Large Numbers**
Express 24,000,000 in scientific notation.

**Solution:** 2.4 × 10⁷

### **Example 3: Negative Exponents**
Simplify: (2/3)^(-2)

**Solution:** (3/2)² = 9/4

### **Example 4: Fractional Exponents**
Simplify: 8^(2/3)

**Solution:** (∛8)² = 2² = 4

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong Sign in Division**
\`\`\`
Wrong: 2⁵ ÷ 2³ = 2^(5+3) = 2⁸
Right: 2⁵ ÷ 2³ = 2^(5-3) = 2²
\`\`\`

### ❌ **Power of Product Error**
\`\`\`
Wrong: (2×3)⁴ = 2×3⁴ = 2×81 = 162
Right: (2×3)⁴ = 2⁴ × 3⁴ = 16×81 = 1,296
\`\`\`

### ❌ **Zero Exponent Confusion**
\`\`\`
Wrong: 0⁰ = 0
Right: 0⁰ is undefined (but often taken as 1 in some contexts)
\`\`\`

### ❌ **Negative Exponent Misapplication**
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

### **Scientific Notation:**
1. Express 5,000,000 in scientific notation
2. Express 0.00003 in scientific notation
3. (2×10³) × (3×10²) = ?

### **Negative/Fractional Exponents:**
1. 2^(-3) = ?
2. 8^(1/3) = ?
3. 16^(-1/2) = ?

### **Complex Problems:**
1. Simplify: 3² × 2³ × 3⁴ ÷ 2²
2. Find: (2/3)^(-2)
3. Calculate: 27^(2/3)

### **Word Problems:**
1. A bacteria doubles every hour. If there are 2 bacteria now, how many after 5 hours?
2. Light travels at 3×10⁸ m/s. Express in scientific notation.

**Answers:**
Basic: 2⁷=128, 5³=125, 2⁶=64, 3⁴×2⁴=81×16=1,296
Scientific: 5×10⁶, 3×10^(-5), 6×10⁵
Negative/Fractional: 1/8, 2, 1/4
Complex: 3^(2+4)×2^(3-2)=3⁶×2¹=729×2=1,458, 9/4, 9
Word: 2⁶=64 bacteria, 3×10⁸ m/s

---

## 🎓 Pro Tips for Exams

1. **Remember exponent laws** - they save calculation time
2. **Use scientific notation** for very large/small numbers
3. **Memorize common powers** of 2, 3, 4, 5, 10
4. **Be careful with negative bases** and negative exponents
5. **Simplify expressions** before calculating final values
6. **Check units** when working with scientific notation
7. **Practice mental calculations** for quick simplifications

Master powers and exponents to handle advanced mathematical problems with confidence! 🏆`
};

