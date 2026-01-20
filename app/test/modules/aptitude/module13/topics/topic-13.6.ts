import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_6: SubLesson = {
  id: "13.6",
  title: 'Cross-Multiplication Method',
  status: 'completed',
  content: "`# âŒ Cross-Multiplication Method

Discover the elegant Cross-Multiplication Method for solving systems of linear equations! This visual and systematic approach is perfect for competitive exams where speed matters. Learn to solve equations with confidence using this powerful technique.

---

## ðŸŽ¯ What is Cross-Multiplication Method?

**Cross-Multiplication Method** is a systematic way to solve systems of two linear equations by multiplying across the equations and eliminating variables through cross-multiplication.

### **When to Use**
- When equations are in standard form
- When you want a formula-based approach
- For quick solutions in competitive exams
- When dealing with fractions

### **Basic Principle**
Multiply each term by the coefficient of the opposite variable in the other equation.

---

## ðŸ”¢ Standard Form for Cross-Multiplication

### **General Equations:**
\`"\`\`
aâ‚x + bâ‚y + câ‚ = 0  ...(1)
aâ‚‚x + bâ‚‚y + câ‚‚ = 0  ...(2)
\`\`\`

### **Cross-Multiplication Formula:**
\`\`\`
x/(bâ‚câ‚‚ - bâ‚‚câ‚) = y/(câ‚aâ‚‚ - câ‚‚aâ‚) = 1/(aâ‚bâ‚‚ - aâ‚‚bâ‚)
\`\`\`

### **Simplified:**
\`\`\`
x = (bâ‚câ‚‚ - bâ‚‚câ‚)/(aâ‚bâ‚‚ - aâ‚‚bâ‚)
y = (câ‚aâ‚‚ - câ‚‚aâ‚)/(aâ‚bâ‚‚ - aâ‚‚bâ‚)
\`\`\`

**Where:**
- \`aâ‚bâ‚‚ - aâ‚‚bâ‚\` = determinant of coefficients
- If determinant = 0, system has no unique solution

---

## ðŸ“Š Step-by-Step Cross-Multiplication

### **Step 1: Write Equations in Standard Form**
Ensure both equations are: \`ax + by + c = 0\`

### **Step 2: Identify Coefficients**
\`\`\`
aâ‚x + bâ‚y + câ‚ = 0
aâ‚‚x + bâ‚‚y + câ‚‚ = 0
\`\`\`

### **Step 3: Apply Formula**
\`\`\`
x = (bâ‚câ‚‚ - bâ‚‚câ‚) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)
y = (câ‚aâ‚‚ - câ‚‚aâ‚) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)
\`\`\`

### **Step 4: Simplify**
Reduce fractions to lowest terms

### **Step 5: Verify**
Substitute values in original equations

---

## ðŸ”§ Basic Examples

### **Example 1: Simple Case**
**Solve:**
\`\`\`
x + y - 3 = 0  ...(1)
x - y - 1 = 0  ...(2)
\`\`\`

**Coefficients:**
\`aâ‚ = 1, bâ‚ = 1, câ‚ = -3\`
\`aâ‚‚ = 1, bâ‚‚ = -1, câ‚‚ = -1\`

**Apply formula:**
\`\`\`
x = (bâ‚câ‚‚ - bâ‚‚câ‚) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)
  = (1Ã—(-1) - (-1)Ã—(-3)) / (1Ã—(-1) - 1Ã—1)
  = (-1 - 3) / (-1 - 1)
  = (-4) / (-2)
  = 2

y = (câ‚aâ‚‚ - câ‚‚aâ‚) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)
  = ((-3)Ã—1 - (-1)Ã—1) / (-1 - 1)
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
\`aâ‚ = 2, bâ‚ = 3, câ‚ = -7\`
\`aâ‚‚ = 3, bâ‚‚ = -2, câ‚‚ = -3\`

**Apply formula:**
\`\`\`
x = (3Ã—(-3) - (-2)Ã—(-7)) / (2Ã—(-2) - 3Ã—3)
  = (-9 - 14) / (-4 - 9)
  = (-23) / (-13)
  = 23/13

y = ((-7)Ã—3 - (-3)Ã—2) / (-4 - 9)
  = (-21 + 6) / (-13)
  = (-15) / (-13)
  = 15/13
\`\`\`

**Solution:** x = 23/13, y = 15/13

---

## ðŸ§® Advanced Examples

### **Example 1: With Constants**
**Solve:**
\`\`\`
x + 2y = 5      ...(1) â†’ x + 2y - 5 = 0
2x - y = 4       ...(2) â†’ 2x - y - 4 = 0
\`\`\`

**Coefficients:**
\`aâ‚ = 1, bâ‚ = 2, câ‚ = -5\`
\`aâ‚‚ = 2, bâ‚‚ = -1, câ‚‚ = -4\`

**Apply formula:**
\`\`\`
x = (2Ã—(-4) - (-1)Ã—(-5)) / (1Ã—(-1) - 2Ã—2)
  = (-8 - 5) / (-1 - 4)
  = (-13) / (-5)
  = 13/5

y = ((-5)Ã—2 - (-4)Ã—1) / (-1 - 4)
  = (-10 + 4) / (-5)
  = (-6) / (-5)
  = 6/5
\`\`\`

**Solution:** x = 13/5, y = 6/5

### **Example 2: Negative Constants**
**Solve:**
\`\`\`
3x + 4y = -2     ...(1) â†’ 3x + 4y + 2 = 0
2x - 3y = 7      ...(2) â†’ 2x - 3y - 7 = 0
\`\`\`

**Coefficients:**
\`aâ‚ = 3, bâ‚ = 4, câ‚ = 2\`
\`aâ‚‚ = 2, bâ‚‚ = -3, câ‚‚ = -7\`

**Apply formula:**
\`\`\`
x = (4Ã—(-7) - (-3)Ã—2) / (3Ã—(-3) - 2Ã—4)
  = (-28 + 6) / (-9 - 8)
  = (-22) / (-17)
  = 22/17

y = (2Ã—2 - (-7)Ã—3) / (-9 - 8)
  = (4 + 21) / (-17)
  = 25 / (-17)
  = -25/17
\`\`\`

**Solution:** x = 22/17, y = -25/17

---

## ðŸ“ˆ Special Cases

### **Case 1: No Solution (Inconsistent)**
**System:**
\`\`\`
x + y = 3  ...(1) â†’ x + y - 3 = 0
x + y = 5  ...(2) â†’ x + y - 5 = 0
\`\`\`

**Coefficients:**
\`aâ‚ = 1, bâ‚ = 1, câ‚ = -3\`
\`aâ‚‚ = 1, bâ‚‚ = 1, câ‚‚ = -5\`

**Determinant:** \`1Ã—1 - 1Ã—1 = 0\`

**Result:** Determinant = 0 â†’ No unique solution

### **Case 2: Infinite Solutions (Dependent)**
**System:**
\`\`\`
2x + 3y = 6  ...(1) â†’ 2x + 3y - 6 = 0
4x + 6y = 12 ...(2) â†’ 4x + 6y - 12 = 0
\`\`\`

**Divide equation (2) by 2:** Same as equation (1)

**Determinant:** \`2Ã—6 - 4Ã—3 = 12 - 12 = 0\`

**Result:** Determinant = 0 â†’ Infinite solutions

---

## ðŸŽ¯ Word Problems Using Cross-Multiplication

### **Example 1: Cost Problem**
**Problem:** A man buys 2 kg apples and 3 kg oranges for â‚¹250. Another man buys 1 kg apples and 2 kg oranges for â‚¹150. Find prices per kg.

**Solution:**
Let apple price = \`x\` â‚¹/kg, orange price = \`y\` â‚¹/kg

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
\`aâ‚ = 2, bâ‚ = 3, câ‚ = -250\`
\`aâ‚‚ = 1, bâ‚‚ = 2, câ‚‚ = -150\`

**Apply formula:**
\`\`\`
x = (3Ã—(-150) - 2Ã—(-250)) / (2Ã—2 - 1Ã—3)
  = (-450 + 500) / (4 - 3)
  = 50/1 = 50

y = ((-250)Ã—1 - (-150)Ã—2) / (4 - 3)
  = (-250 + 300) / 1
  = 50/1 = 50
\`\`\`

**Answer:** Apples: â‚¹50/kg, Oranges: â‚¹50/kg

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

## ðŸ”¢ Cross-Multiplication Pattern

### **Visual Representation:**
\`\`\`
aâ‚x + bâ‚y = -câ‚    aâ‚‚x + bâ‚‚y = -câ‚‚

Cross-multiply:
x coefficient of y Ã— y coefficient of x, etc.
\`\`\`

### **Memory Aid:**
\`\`\`
x = (bâ‚(-câ‚‚) - bâ‚‚(-câ‚)) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)
y = (câ‚(-aâ‚‚) - câ‚‚(-aâ‚)) / (aâ‚bâ‚‚ - aâ‚‚bâ‚)

Simplified:
x = (bâ‚câ‚‚ - bâ‚‚câ‚) / D
y = (câ‚aâ‚‚ - câ‚‚aâ‚) / D
where D = aâ‚bâ‚‚ - aâ‚‚bâ‚
\`\`\`

---

## ðŸŽ¯ Practice Questions

### **Basic Cross-Multiplication:**
1. Solve: \`x + y = 7\` and \`x - y = 3\`
2. Solve: \`2x + 3y = 11\` and \`x + 2y = 7\`
3. Solve: \`3x + 2y = 12\` and \`x + 2y = 6\`

### **Advanced Problems:**
1. Solve: \`x + 2y = 5\` and \`2x - y = 4\`
2. Solve: \`3x + 4y = -2\` and \`2x - 3y = 7\`

### **Word Problems:**
1. **Investment:** â‚¹8000 invested at 5% and 6%. Total interest â‚¹430. Find amounts.
2. **Numbers:** Two numbers ratio 2:3, sum 50. Find numbers.
3. **Age:** Father 4 times son's age. Ages sum 75. Find ages.

### **Special Cases:**
1. Check solution for: \`x + y = 3\` and \`2x + 2y = 6\`
2. Check solution for: \`x + y = 3\` and \`x + y = 4\`

**Answers:**
Basic: (5,2), (1,3), (0,6)
Advanced: (13/5,6/5), (22/17,-25/17)
Word: â‚¹3000 & â‚¹5000, 20 & 30, Son-15, Father-60
Special: Infinite solutions, No solution

---

## ðŸŽ“ Pro Tips for Cross-Multiplication

1. **Always use standard form** - convert to \`ax + by + c = 0\`
2. **Identify coefficients carefully** - don't mix up positions
3. **Check determinant first** - if zero, special case
4. **Calculate numerator and denominator separately** - avoid confusion
5. **Simplify fractions** - reduce to lowest terms
6. **Verify solutions** - substitute in original equations
7. **Practice the pattern** - memorize the formula structure

---

## ðŸ”¢ Quick Reference

| Component | Formula | Purpose |
|-----------|---------|---------|
| x value | \`(bâ‚câ‚‚ - bâ‚‚câ‚)/D\` | Find x coordinate |
| y value | \`(câ‚aâ‚‚ - câ‚‚aâ‚)/D\` | Find y coordinate |
| Determinant | \`aâ‚bâ‚‚ - aâ‚‚bâ‚\` | Check solution existence |
| Special case | D = 0 | No unique solution |

| D Value | Solution Type | Meaning |
|---------|---------------|---------|
| D â‰  0 | Unique solution | Intersecting lines |
| D = 0 | Infinite/No solution | Parallel/coincident lines |

Master cross-multiplication and solve linear equations with elegance and speed! ðŸ†`
};
