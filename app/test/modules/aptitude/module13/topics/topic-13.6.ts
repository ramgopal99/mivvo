import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_6: SubLesson = {
  id: "13.6",
  title: 'Cross-Multiplication Method',
  status: 'completed',
  content: `# ❌ Cross-Multiplication Method

Discover the elegant Cross-Multiplication Method for solving systems of linear equations! This visual and systematic approach is perfect for competitive exams where speed matters. Learn to solve equations with confidence using this powerful technique.

---

## 🎯 What is Cross-Multiplication Method?

**Cross-Multiplication Method** is a systematic way to solve systems of two linear equations by multiplying across the equations and eliminating variables through cross-multiplication.

### **When to Use**
- When equations are in standard form
- When you want a formula-based approach
- For quick solutions in competitive exams
- When dealing with fractions

### **Basic Principle**
Multiply each term by the coefficient of the opposite variable in the other equation.

---

## 🔢 Standard Form for Cross-Multiplication

### **General Equations:**
\`\`\`
a₁x + b₁y + c₁ = 0  ...(1)
a₂x + b₂y + c₂ = 0  ...(2)
\`\`\`

### **Cross-Multiplication Formula:**
\`\`\`
x/(b₁c₂ - b₂c₁) = y/(c₁a₂ - c₂a₁) = 1/(a₁b₂ - a₂b₁)
\`\`\`

### **Simplified:**
\`\`\`
x = (b₁c₂ - b₂c₁)/(a₁b₂ - a₂b₁)
y = (c₁a₂ - c₂a₁)/(a₁b₂ - a₂b₁)
\`\`\`

**Where:**
- \`a₁b₂ - a₂b₁\` = determinant of coefficients
- If determinant = 0, system has no unique solution

---

## 📊 Step-by-Step Cross-Multiplication

### **Step 1: Write Equations in Standard Form**
Ensure both equations are: \`ax + by + c = 0\`

### **Step 2: Identify Coefficients**
\`\`\`
a₁x + b₁y + c₁ = 0
a₂x + b₂y + c₂ = 0
\`\`\`

### **Step 3: Apply Formula**
\`\`\`
x = (b₁c₂ - b₂c₁) / (a₁b₂ - a₂b₁)
y = (c₁a₂ - c₂a₁) / (a₁b₂ - a₂b₁)
\`\`\`

### **Step 4: Simplify**
Reduce fractions to lowest terms

### **Step 5: Verify**
Substitute values in original equations

---

## 🔧 Basic Examples

### **Example 1: Simple Case**
**Solve:**
\`\`\`
x + y - 3 = 0  ...(1)
x - y - 1 = 0  ...(2)
\`\`\`

**Coefficients:**
\`a₁ = 1, b₁ = 1, c₁ = -3\`
\`a₂ = 1, b₂ = -1, c₂ = -1\`

**Apply formula:**
\`\`\`
x = (b₁c₂ - b₂c₁) / (a₁b₂ - a₂b₁)
  = (1×(-1) - (-1)×(-3)) / (1×(-1) - 1×1)
  = (-1 - 3) / (-1 - 1)
  = (-4) / (-2)
  = 2

y = (c₁a₂ - c₂a₁) / (a₁b₂ - a₂b₁)
  = ((-3)×1 - (-1)×1) / (-1 - 1)
  = (-3 + 1) / (-2)
  = (-2) / (-2)
  = 1
\`\`\`

**Solution:** x = 2, y = 1

### **Example 2: Different Coefficients**
**Solve:**
\`\`\`
2x + 3y - 7 = 0  ...(1)
3x - 2y - 3 = 0  ...(2)
\`\`\`

**Coefficients:**
\`a₁ = 2, b₁ = 3, c₁ = -7\`
\`a₂ = 3, b₂ = -2, c₂ = -3\`

**Apply formula:**
\`\`\`
x = (3×(-3) - (-2)×(-7)) / (2×(-2) - 3×3)
  = (-9 - 14) / (-4 - 9)
  = (-23) / (-13)
  = 23/13

y = ((-7)×3 - (-3)×2) / (-4 - 9)
  = (-21 + 6) / (-13)
  = (-15) / (-13)
  = 15/13
\`\`\`

**Solution:** x = 23/13, y = 15/13

---

## 🧮 Advanced Examples

### **Example 1: With Constants**
**Solve:**
\`\`\`
x + 2y = 5      ...(1) → x + 2y - 5 = 0
2x - y = 4       ...(2) → 2x - y - 4 = 0
\`\`\`

**Coefficients:**
\`a₁ = 1, b₁ = 2, c₁ = -5\`
\`a₂ = 2, b₂ = -1, c₂ = -4\`

**Apply formula:**
\`\`\`
x = (2×(-4) - (-1)×(-5)) / (1×(-1) - 2×2)
  = (-8 - 5) / (-1 - 4)
  = (-13) / (-5)
  = 13/5

y = ((-5)×2 - (-4)×1) / (-1 - 4)
  = (-10 + 4) / (-5)
  = (-6) / (-5)
  = 6/5
\`\`\`

**Solution:** x = 13/5, y = 6/5

### **Example 2: Negative Constants**
**Solve:**
\`\`\`
3x + 4y = -2     ...(1) → 3x + 4y + 2 = 0
2x - 3y = 7      ...(2) → 2x - 3y - 7 = 0
\`\`\`

**Coefficients:**
\`a₁ = 3, b₁ = 4, c₁ = 2\`
\`a₂ = 2, b₂ = -3, c₂ = -7\`

**Apply formula:**
\`\`\`
x = (4×(-7) - (-3)×2) / (3×(-3) - 2×4)
  = (-28 + 6) / (-9 - 8)
  = (-22) / (-17)
  = 22/17

y = (2×2 - (-7)×3) / (-9 - 8)
  = (4 + 21) / (-17)
  = 25 / (-17)
  = -25/17
\`\`\`

**Solution:** x = 22/17, y = -25/17

---

## 📈 Special Cases

### **Case 1: No Solution (Inconsistent)**
**System:**
\`\`\`
x + y = 3  ...(1) → x + y - 3 = 0
x + y = 5  ...(2) → x + y - 5 = 0
\`\`\`

**Coefficients:**
\`a₁ = 1, b₁ = 1, c₁ = -3\`
\`a₂ = 1, b₂ = 1, c₂ = -5\`

**Determinant:** \`1×1 - 1×1 = 0\`

**Result:** Determinant = 0 → No unique solution

### **Case 2: Infinite Solutions (Dependent)**
**System:**
\`\`\`
2x + 3y = 6  ...(1) → 2x + 3y - 6 = 0
4x + 6y = 12 ...(2) → 4x + 6y - 12 = 0
\`\`\`

**Divide equation (2) by 2:** Same as equation (1)

**Determinant:** \`2×6 - 4×3 = 12 - 12 = 0\`

**Result:** Determinant = 0 → Infinite solutions

---

## 🎯 Word Problems Using Cross-Multiplication

### **Example 1: Cost Problem**
**Problem:** A man buys 2 kg apples and 3 kg oranges for ₹250. Another man buys 1 kg apples and 2 kg oranges for ₹150. Find prices per kg.

**Solution:**
Let apple price = \`x\` ₹/kg, orange price = \`y\` ₹/kg

Equations:
\`\`\`
2x + 3y = 250  ...(1)
x + 2y = 150   ...(2)
\`\`\`

Convert to standard form:
\`\`\`
2x + 3y - 250 = 0  ...(1)
x + 2y - 150 = 0   ...(2)
\`\`\`

**Coefficients:**
\`a₁ = 2, b₁ = 3, c₁ = -250\`
\`a₂ = 1, b₂ = 2, c₂ = -150\`

**Apply formula:**
\`\`\`
x = (3×(-150) - 2×(-250)) / (2×2 - 1×3)
  = (-450 + 500) / (4 - 3)
  = 50/1 = 50

y = ((-250)×1 - (-150)×2) / (4 - 3)
  = (-250 + 300) / 1
  = 50/1 = 50
\`\`\`

**Answer:** Apples: ₹50/kg, Oranges: ₹50/kg

### **Example 2: Age Problem**
**Problem:** Sum of ages of A and B is 45. A is 5 years older than B. Find ages.

**Solution:**
Let B's age = \`x\`, A's age = \`x + 5\`

Equation: \`x + (x + 5) = 45\`
\`2x + 5 = 45\`
\`2x = 40\`
\`x = 20\`

Ages: A = 25, B = 20

---

## 🔢 Cross-Multiplication Pattern

### **Visual Representation:**
\`\`\`
a₁x + b₁y = -c₁    a₂x + b₂y = -c₂

Cross-multiply:
x coefficient of y × y coefficient of x, etc.
\`\`\`

### **Memory Aid:**
\`\`\`
x = (b₁(-c₂) - b₂(-c₁)) / (a₁b₂ - a₂b₁)
y = (c₁(-a₂) - c₂(-a₁)) / (a₁b₂ - a₂b₁)

Simplified:
x = (b₁c₂ - b₂c₁) / D
y = (c₁a₂ - c₂a₁) / D
where D = a₁b₂ - a₂b₁
\`\`\`

---

## 🎯 Practice Questions

### **Basic Cross-Multiplication:**
1. Solve: \`x + y = 7\` and \`x - y = 3\`
2. Solve: \`2x + 3y = 11\` and \`x + 2y = 7\`
3. Solve: \`3x + 2y = 12\` and \`x + 2y = 6\`

### **Advanced Problems:**
1. Solve: \`x + 2y = 5\` and \`2x - y = 4\`
2. Solve: \`3x + 4y = -2\` and \`2x - 3y = 7\`

### **Word Problems:**
1. **Investment:** ₹8000 invested at 5% and 6%. Total interest ₹430. Find amounts.
2. **Numbers:** Two numbers ratio 2:3, sum 50. Find numbers.
3. **Age:** Father 4 times son's age. Ages sum 75. Find ages.

### **Special Cases:**
1. Check solution for: \`x + y = 3\` and \`2x + 2y = 6\`
2. Check solution for: \`x + y = 3\` and \`x + y = 4\`

**Answers:**
Basic: (5,2), (1,3), (0,6)
Advanced: (13/5,6/5), (22/17,-25/17)
Word: ₹3000 & ₹5000, 20 & 30, Son-15, Father-60
Special: Infinite solutions, No solution

---

## 🎓 Pro Tips for Cross-Multiplication

1. **Always use standard form** - convert to \`ax + by + c = 0\`
2. **Identify coefficients carefully** - don't mix up positions
3. **Check determinant first** - if zero, special case
4. **Calculate numerator and denominator separately** - avoid confusion
5. **Simplify fractions** - reduce to lowest terms
6. **Verify solutions** - substitute in original equations
7. **Practice the pattern** - memorize the formula structure

---

## 🔢 Quick Reference

| Component | Formula | Purpose |
|-----------|---------|---------|
| x value | \`(b₁c₂ - b₂c₁)/D\` | Find x coordinate |
| y value | \`(c₁a₂ - c₂a₁)/D\` | Find y coordinate |
| Determinant | \`a₁b₂ - a₂b₁\` | Check solution existence |
| Special case | D = 0 | No unique solution |

| D Value | Solution Type | Meaning |
|---------|---------------|---------|
| D ≠ 0 | Unique solution | Intersecting lines |
| D = 0 | Infinite/No solution | Parallel/coincident lines |

Master cross-multiplication and solve linear equations with elegance and speed! 🏆`
};