import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_9: SubLesson = {
  id: "3.9",
  title: 'Surds (Basic)',
  status: 'completed',
  content: `# 🔢 Surds (Basic)

Surds are irrational square roots that cannot be simplified to rational numbers. Understanding surds is essential for aptitude exams as they appear frequently in simplification and algebra problems.

---

## 🎯 What are Surds?

**Surds** are expressions containing square roots (or other roots) of numbers that are not perfect squares.

**Examples:**
- √2, √3, √5, √6, √7, √8, √10, √11, √12, √13, √14, √15

**Non-surds (rational):**
- √4 = 2, √9 = 3, √16 = 4, √25 = 5

---

## 📊 Types of Surds

### **1. Simple Surds**
Single square root expressions
- √2, √7, √11

### **2. Compound Surds**
Expressions with multiple terms
- 2√3, 3√5, 5√2

### **3. Binomial Surds**
Sum or difference of surds
- √2 + √3, 2√5 - √3

### **4. Similar Surds**
Surds with same irrational part
- 2√3 and 5√3 (both have √3)
- √7 and 3√7 (both have √7)

---

## 🧮 Operations with Surds

### **1. Addition and Subtraction**
Only similar surds can be added/subtracted.

**Examples:**
- 2√3 + 5√3 = 7√3
- 4√5 - 2√5 = 2√5
- √2 + √3 = √2 + √3 (cannot simplify - unlike surds)

### **2. Multiplication**
√a × √b = √(a × b)

**Examples:**
- √2 × √3 = √6
- √5 × √5 = √25 = 5
- 2√3 × 3√2 = 2×3 × √(3×2) = 6√6

### **3. Division**
√a ÷ √b = √(a/b)

**Examples:**
- √8 ÷ √2 = √(8/2) = √4 = 2
- √15 ÷ √3 = √(15/3) = √5
- √12 ÷ √3 = √(12/3) = √4 = 2

---

## 🔧 Simplification of Surds

### **Method 1: Prime Factorization**
Express number under root as product of primes, simplify.

**Examples:**
- √12 = √(4 × 3) = √4 × √3 = 2√3
- √18 = √(9 × 2) = √9 × √2 = 3√2
- √50 = √(25 × 2) = √25 × √2 = 5√2

### **Method 2: Division Method**
Divide number by perfect squares until quotient is not divisible by perfect squares.

**Examples:**
- √72: 72 ÷ 4 = 18, 18 ÷ 9 = 2 → √(4 × 9 × 2) = 2×3×√2 = 6√2
- √96: 96 ÷ 16 = 6 → √(16 × 6) = 4√6

---

## 🎯 Rationalization

### **Rationalizing Denominators**
Multiply numerator and denominator by appropriate expression to eliminate surd in denominator.

### **Single Term Denominator**
Multiply by same surd:
\\frac{1}{\\sqrt{2}} × \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}

### **Binomial Denominator**
Multiply by conjugate (change sign between terms):
\\frac{1}{\\sqrt{2} + \\sqrt{3}} × \\frac{\\sqrt{2} - \\sqrt{3}}{\\sqrt{2} - \\sqrt{3}} = \\frac{\\sqrt{2} - \\sqrt{3}}{2 - 3} = \\sqrt{2} - \\sqrt{3}

**Examples:**
- \\frac{3}{\\sqrt{5}} = \\frac{3\\sqrt{5}}{5}
- \\frac{2}{\\sqrt{3} + 1} × \\frac{\\sqrt{3} - 1}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} - 1)}{3 - 1} = \\frac{2(\\sqrt{3} - 1)}{2} = \\sqrt{3} - 1

---

## 🧠 Surd Identities

### **Conjugate Pairs**
For a + b√c, conjugate is a - b√c
(a + b√c)(a - b√c) = a² - (b√c)² = a² - b²c

### **Difference of Squares**
a² - b² = (a - b)(a + b)
This applies to surds too.

### **Sum of Squares**
Sometimes helpful: (√a + √b)² = a + b + 2√(ab)

---

## 🚨 Common Mistakes to Avoid

### ❌ **Adding Unlike Surds**
\`\`\`
Wrong: √2 + √3 = √5
Right: √2 + √3 cannot be simplified
\`\`\`

### ❌ **Wrong Rationalization**
\`\`\`
Wrong: \\frac{1}{\\sqrt{2} + \\sqrt{3}} = \\frac{1}{\\sqrt{5}}
Right: Use conjugate: \\frac{\\sqrt{2} - \\sqrt{3}}{2 - 3} = \\sqrt{2} - \\sqrt{3}
\`\`\`

### ❌ **Incorrect Simplification**
\`\`\`
Wrong: √12 = √(2×6) = √2 × √6
Right: √12 = √(4×3) = 2√3
\`\`\`

### ❌ **Forgetting Coefficients**
\`\`\`
Wrong: 2√3 × 3√2 = 6√6 ✓
Wrong: 2√3 × 3√2 = 2×3×√3×√2 = 6√6 ✓ (same as above)
\`\`\`

---

## 🎯 Practice Problems

### **Simplification:**
1. √12 = ?
2. √18 = ?
3. √50 = ?
4. √72 = ?

### **Operations:**
1. 3√2 + 2√2 = ?
2. √8 × √2 = ?
3. 2√5 - √5 = ?
4. √12 ÷ √3 = ?

### **Rationalization:**
1. \\frac{1}{\\sqrt{2}} = ?
2. \\frac{2}{\\sqrt{3}} = ?
3. \\frac{1}{\\sqrt{2} + \\sqrt{3}} = ?
4. \\frac{3}{\\sqrt{5} - 1} = ?

### **Complex Problems:**
1. Simplify: (√3 + √2)(√3 - √2)
2. Rationalize: \\frac{5}{\\sqrt{6} + \\sqrt{2}}
3. Calculate: (2√3 + 3√2)(2√3 - 3√2)
4. Simplify: \\frac{\\sqrt{5} + \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}}

### **Word Problems:**
1. Simplify √(48) + √(12)
2. Rationalize \\frac{1}{\\sqrt{7} + \\sqrt{3}}

**Answers:**
Simplification: 2√3, 3√2, 5√2, 6√2
Operations: 5√2, √16 = 4, √5, √4 = 2
Rationalization: \\frac{\\sqrt{2}}{2}, \\frac{2\\sqrt{3}}{3}, \\sqrt{2} - \\sqrt{3}, \\frac{3(\\sqrt{5} + 1)}{4}
Complex: (√3)² - (√2)² = 3 - 2 = 1, \\frac{5(\\sqrt{6} - \\sqrt{2})}{4}, (2√3)² - (3√2)² = 12 - 18 = -6, \\frac{(5+3) + 2\\sqrt{15}}{5-3} = \\frac{8 + 2\\sqrt{15}}{2} = 4 + \\sqrt{15}
Word: √(16×3) + √(4×3) = 4√3 + 2√3 = 6√3, \\frac{\\sqrt{7} - \\sqrt{3}}{4}

---

## 🎓 Pro Tips for Exams

1. **Identify similar surds** before adding/subtracting
2. **Simplify surds** before performing operations
3. **Use conjugates** for rationalization of binomial denominators
4. **Multiply numerator and denominator** by same expression
5. **Remember difference of squares** for conjugate multiplication
6. **Practice simplification** of common surds (√2, √3, √5, √6, √7, √8, √10)
7. **Check answers** by substituting approximate values

Master surds to handle irrational numbers and complex root expressions with confidence! 🏆`
};

