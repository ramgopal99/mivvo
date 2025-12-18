import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_8: SubLesson = {
  id: "2.8",
  title: 'Square Roots and Cube Roots',
  status: 'completed',
  content: `# 🔢 Square Roots and Cube Roots

Square roots and cube roots are essential concepts in mathematics, appearing frequently in aptitude exams. Understanding how to calculate, simplify, and work with roots is crucial for solving complex problems involving radicals.

---

## 🎯 What are Square Roots and Cube Roots?

### **Square Root (√)**
The square root of a number x is a number that, when multiplied by itself, gives x.
√x = y means y × y = x

**Examples:**
- √4 = 2 (since 2 × 2 = 4)
- √9 = 3 (since 3 × 3 = 9)
- √16 = 4 (since 4 × 4 = 16)

### **Cube Root (∛)**
The cube root of a number x is a number that, when multiplied by itself three times, gives x.
∛x = y means y × y × y = x

**Examples:**
- ∛8 = 2 (since 2 × 2 × 2 = 8)
- ∛27 = 3 (since 3 × 3 × 3 = 27)
- ∛64 = 4 (since 4 × 4 × 4 = 64)

---

## 📊 Properties of Roots

### **Square Root Properties**
- √0 = 0
- √1 = 1
- √(a²) = a (if a ≥ 0)
- √(a × b) = √a × √b
- √(a/b) = √a / √b
- √(a² × b²) = a × b (absolute values)

### **Cube Root Properties**
- ∛0 = 0
- ∛1 = 1
- ∛(a³) = a
- ∛(a × b) = ∛a × ∛b
- ∛(a/b) = ∛a / ∛b
- ∛(a³ × b³) = a × b

---

## 🧮 Calculating Roots

### **Prime Factorization Method**
Express number as product of primes, then group factors.

#### **Square Roots:**
- Group factors in pairs
- Take one factor from each pair

**Examples:**
- √144 = √(2² × 3² × 2²) = √(2² × 2² × 3²) = 2 × 2 × 3 = 12
- √196 = √(2² × 7²) = 2 × 7 = 14

#### **Cube Roots:**
- Group factors in threes
- Take one factor from each triple

**Examples:**
- ∛512 = ∛(2³ × 2³ × 2³ × 2²) = ∛(2^(9+2)) = ∛(2^9 × 2^2) = 2^(9÷3) × ∛2² = 2³ × ∛4 = 8 × ∛4
- ∛729 = ∛(3^6) = ∛(3^6) = 3^(6÷3) = 3² = 9

---

## 🔍 Perfect Squares and Cubes

### **Perfect Squares (1-100)**
1, 4, 9, 16, 25, 36, 49, 64, 81, 100

### **Perfect Cubes (1-1000)**
1³ = 1, 2³ = 8, 3³ = 27, 4³ = 64, 5³ = 125, 6³ = 216, 7³ = 343, 8³ = 512, 9³ = 729, 10³ = 1000

### **Square Root Patterns**
- Numbers ending with 2, 3, 7, 8 have irrational square roots
- Numbers ending with 0, 1, 4, 5, 6, 9 may have rational square roots
- Perfect squares have even number of zeros at end

### **Cube Root Patterns**
- All numbers have real cube roots
- Positive numbers have positive cube roots
- Negative numbers have negative cube roots

---

## 🧠 Simplification of Roots

### **Simplifying Square Roots**
Express as √(perfect square × other factor)

**Examples:**
- √12 = √(4 × 3) = √4 × √3 = 2√3
- √18 = √(9 × 2) = √9 × √2 = 3√2
- √50 = √(25 × 2) = √25 × √2 = 5√2

### **Simplifying Cube Roots**
Express as ∛(perfect cube × other factor)

**Examples:**
- ∛16 = ∛(8 × 2) = ∛8 × ∛2 = 2∛2
- ∛54 = ∛(27 × 2) = ∛27 × ∛2 = 3∛2
- ∛40 = ∛(8 × 5) = ∛8 × ∛5 = 2∛5

---

## 🔧 Operations with Roots

### **Addition and Subtraction**
Only like terms can be added/subtracted.

**Examples:**
- 2√3 + 3√3 = 5√3
- 4√5 - 2√5 = 2√5
- √2 + √3 = √2 + √3 (cannot simplify)

### **Multiplication**
√a × √b = √(a × b)

**Examples:**
- √2 × √3 = √6
- √5 × √5 = √25 = 5
- 2√3 × 3√2 = 2×3 × √(3×2) = 6√6

### **Division**
√a ÷ √b = √(a/b)

**Examples:**
- √8 ÷ √2 = √(8/2) = √4 = 2
- √15 ÷ √3 = √(15/3) = √5
- √12 ÷ √3 = √(12/3) = √4 = 2

---

## 🎯 Rationalization

### **Rationalizing Denominators**
Multiply numerator and denominator by conjugate to eliminate square roots in denominator.

**Examples:**
- \\frac{1}{\\sqrt{2}} × \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}
- \\frac{3}{\\sqrt{5} + 2} × \\frac{\\sqrt{5} - 2}{\\sqrt{5} - 2} = \\frac{3(\\sqrt{5} - 2)}{5 - 4} = 3(\\sqrt{5} - 2)

### **Conjugate Pairs**
For expressions like a + b√c, the conjugate is a - b√c.

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong Simplification**
\`\`\`
Wrong: √12 = √(2×6) = √2 × √6
Right: √12 = √(4×3) = 2√3
\`\`\`

### ❌ **Adding Unlike Terms**
\`\`\`
Wrong: √2 + √3 = √5
Right: √2 + √3 cannot be simplified
\`\`\`

### ❌ **Cube Root Confusion**
\`\`\`
Wrong: ∛8 = 4 (because 4² = 16, close to 8)
Right: ∛8 = 2 (because 2³ = 8)
\`\`\`

### ❌ **Negative Square Roots**
\`\`\`
Wrong: √(-4) = -2
Right: √(-4) is not real (imaginary number)
\`\`\`

---

## 🎯 Practice Problems

### **Square Roots:**
1. √36 = ?
2. √144 = ?
3. √(49 × 4) = ?
4. Simplify √75

### **Cube Roots:**
1. ∛125 = ?
2. ∛216 = ?
3. ∛(27 × 8) = ?
4. Simplify ∛40

### **Operations:**
1. 3√2 + 2√2 = ?
2. √8 × √2 = ?
3. √12 ÷ √3 = ?
4. Rationalize \\frac{1}{\\sqrt{3}}

### **Complex Problems:**
1. Find √(144 ÷ 9) × √16
2. Simplify ∛(512 ÷ 8)
3. Calculate 2√5 × 3√5
4. Rationalize \\frac{5}{\\sqrt{6} + 1}

### **Word Problems:**
1. Area of square is 49 cm². Find side length.
2. Volume of cube is 512 cm³. Find side length.

**Answers:**
Square: 6, 12, √196 = 14, 5√3
Cube: 5, 6, ∛216 = 6, 2∛5
Operations: 5√2, √16 = 4, √4 = 2, \\frac{\\sqrt{3}}{3}
Complex: √16 × 4 = 16, ∛64 = 4, 30, \\frac{5(\\sqrt{6} - 1)}{5} = \\sqrt{6} - 1
Word: 7 cm, 8 cm

---

## 🎓 Pro Tips for Exams

1. **Memorize perfect squares and cubes** up to 20
2. **Look for perfect square/cube factors** first
3. **Simplify before operating** with roots
4. **Rationalize denominators** when required
5. **Check if terms are like** before adding/subtracting
6. **Use prime factorization** for complex roots
7. **Practice mental calculations** for common roots

Master square roots and cube roots to handle radical problems with confidence! 🏆`
};