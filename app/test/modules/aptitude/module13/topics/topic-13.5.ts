import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_5: SubLesson = {
  id: "13.5",
  title: 'Solving by Elimination Method',
  status: 'completed',
  content: `# ➕ Solving by Elimination Method

Master the Elimination Method for solving systems of linear equations! This powerful technique eliminates one variable by adding or subtracting equations, making it ideal for most aptitude problems. Learn systematic elimination with confidence.

---

## 🎯 What is Elimination Method?

**Elimination Method** (also called **Addition Method**) solves systems of linear equations by eliminating one variable through addition or subtraction of the equations.

### **When to Use**
- When coefficients are different
- When you want to avoid fractions
- When substitution becomes complex
- Most common method for competitive exams

### **Basic Principle**
Make coefficients of one variable equal in magnitude but opposite in sign, then add/subtract equations.

---

## 🔢 Step-by-Step Elimination Method

### **Step 1: Write Equations in Standard Form**
- Ensure both equations are in \`ax + by = c\` form
- Align like terms

### **Step 2: Choose Variable to Eliminate**
- Pick variable with different coefficients
- Choose variable where LCM of coefficients is smaller

### **Step 3: Make Coefficients Equal**
- Find LCM of coefficients
- Multiply equations to make coefficients equal

### **Step 4: Add or Subtract Equations**
- Add if signs are opposite
- Subtract if signs are same
- Eliminate chosen variable

### **Step 5: Solve Resulting Equation**
- Solve for remaining variable

### **Step 6: Substitute Back**
- Find value of eliminated variable

### **Step 7: Verify Solution**
- Check in both original equations

---

## 📊 Basic Examples

### **Example 1: Direct Elimination**
**Solve:**
\`\`\`
x + y = 7  ...(1)
x - y = 3  ...(2)
\`\`\`

**Step 1:** Coefficients of y: +1 and -1 (opposite signs)

**Step 2:** Add equations:
\`(x + y) + (x - y) = 7 + 3\`
\`2x = 10\`
\`x = 5\`

**Step 3:** Substitute x = 5 in equation (1):
\`5 + y = 7\`
\`y = 2\`

**Solution:** x = 5, y = 2

### **Example 2: Multiplication Required**
**Solve:**
\`\`\`
2x + 3y = 11 ...(1)
x + 2y = 7    ...(2)
\`\`\`

**Step 1:** Eliminate x. Coefficients: 2 and 1
LCM = 2

**Step 2:** Multiply equation (2) by 2:
\`2x + 4y = 14\` ...(3)

**Step 3:** Subtract equation (1) from (3):
\`(2x + 4y) - (2x + 3y) = 14 - 11\`
\`y = 3\`

**Step 4:** Substitute y = 3 in equation (2):
\`x + 2×3 = 7\`
\`x + 6 = 7\`
\`x = 1\`

**Solution:** x = 1, y = 3

---

## 🧮 Advanced Examples

### **Example 1: Eliminate y Variable**
**Solve:**
\`\`\`
3x + 2y = 12 ...(1)
x + 2y = 6    ...(2)
\`\`\`

**Step 1:** Coefficients of y: 2 and 2 (same)

**Step 2:** Subtract equation (2) from (1):
\`(3x + 2y) - (x + 2y) = 12 - 6\`
\`2x = 6\`
\`x = 3\`

**Step 3:** Substitute x = 3 in equation (2):
\`3 + 2y = 6\`
\`2y = 3\`
\`y = 1.5\`

**Solution:** x = 3, y = 1.5

### **Example 2: Both Variables Need Multiplication**
**Solve:**
\`\`\`
2x + 3y = 13 ...(1)
3x - 2y = 5   ...(2)
\`\`\`

**Step 1:** Eliminate x. Coefficients: 2 and 3
LCM = 6

**Step 2:** Multiply (1) by 3, (2) by 2:
\`6x + 9y = 39\` ...(3)
\`6x - 4y = 10\` ...(4)

**Step 3:** Subtract (4) from (3):
\`(6x + 9y) - (6x - 4y) = 39 - 10\`
\`13y = 29\`
\`y = 29/13 ≈ 2.23\`

**Step 4:** Substitute y = 29/13 in equation (1):
\`2x + 3×(29/13) = 13\`
\`2x + 87/13 = 13\`
\`2x = 13 - 87/13 = (169 - 87)/13 = 82/13\`
\`x = 82/26 = 41/13 ≈ 3.15\`

**Solution:** x = 41/13, y = 29/13

---

## 📈 Complex Examples

### **Example 1: Three-Step Elimination**
**Solve:**
\`\`\`
4x + 6y = 22 ...(1)
2x + 3y = 11 ...(2)
\`\`\`

**Step 1:** Notice equation (2) is half of equation (1)
Divide equation (1) by 2: \`2x + 3y = 11\` (same as equation 2)

**Result:** Dependent system (infinite solutions)
**General solution:** y = (11 - 2x)/3

### **Example 2: Decimal Coefficients**
**Solve:**
\`\`\`
1.5x + 2.5y = 8.5 ...(1)
2.5x + 1.5y = 7.5 ...(2)
\`\`\`

**Step 1:** Multiply both equations by 2 to eliminate decimals:
\`3x + 5y = 17\` ...(3)
\`5x + 3y = 15\` ...(4)

**Step 2:** Eliminate x. Coefficients: 3 and 5
LCM = 15

**Step 3:** Multiply (3) by 5, (4) by 3:
\`15x + 25y = 85\` ...(5)
\`15x + 9y = 45\`  ...(6)

**Step 4:** Subtract (6) from (5):
\`16y = 40\`
\`y = 2.5\`

**Step 5:** Substitute in (3):
\`3x + 5×2.5 = 17\`
\`3x + 12.5 = 17\`
\`3x = 4.5\`
\`x = 1.5\`

**Solution:** x = 1.5, y = 2.5

---

## 🎯 Word Problems Using Elimination

### **Example 1: Investment Problem**
**Problem:** A man invested ₹10,000 in two schemes. Scheme A gives 8% profit, Scheme B gives 10% profit. Total profit ₹880. Find amounts invested.

**Solution:**
Let amount in A = \`x\`, amount in B = \`y\`

Equations:
\`\`\`
x + y = 10,000     ...(1)
0.08x + 0.10y = 880 ...(2)
\`\`\`

Multiply equation (2) by 100:
\`8x + 10y = 88,000\` ...(3)

Eliminate x (multiply (1) by 8):
\`8x + 8y = 80,000\` ...(4)

Subtract (4) from (3):
\`2y = 8,000\`
\`y = 4,000\`

From (1): \`x = 10,000 - 4,000 = 6,000\`

**Answer:** ₹6,000 in A, ₹4,000 in B

### **Example 2: Age Problem**
**Problem:** Ages of A and B differ by 10 years. 5 years ago, A was twice as old as B. Find current ages.

**Solution:**
Let current age of B = \`x\`, A = \`x + 10\`

5 years ago: B was \`x - 5\`, A was \`x + 10 - 5 = x + 5\`

Equation: \`x + 5 = 2(x - 5)\`
\`x + 5 = 2x - 10\`
\`15 = x\`

Ages: B = 15, A = 25

---

## 🚨 Special Cases

### **Case 1: Parallel Lines (No Solution)**
**System:**
\`\`\`
x + y = 3  ...(1)
x + y = 5  ...(2)
\`\`\`

**Step 1:** Subtract equations:
\`(x + y) - (x + y) = 3 - 5\`
\`0 = -2\`

**Result:** Contradiction → No solution

### **Case 2: Coincident Lines (Infinite Solutions)**
**System:**
\`\`\`
2x + 3y = 6  ...(1)
4x + 6y = 12 ...(2)
\`\`\`

**Step 1:** Divide equation (2) by 2: \`2x + 3y = 6\` (same as 1)

**Step 2:** Subtract equations:
\`0 = 0\`

**Result:** Identity → Infinite solutions

---

## 🎯 Practice Questions

### **Basic Elimination:**
1. Solve: \`x + y = 8\` and \`x - y = 2\`
2. Solve: \`2x + 3y = 11\` and \`x + 2y = 7\`
3. Solve: \`3x + 2y = 12\` and \`x + 2y = 6\`

### **Advanced Problems:**
1. Solve: \`2x + 3y = 13\` and \`3x - 2y = 5\`
2. Solve: \`1.5x + 2.5y = 8.5\` and \`2.5x + 1.5y = 7.5\`

### **Word Problems:**
1. **Investment:** ₹15,000 invested at 6% and 8%. Total interest ₹1,080. Find amounts.
2. **Numbers:** Two numbers differ by 8. Their sum is 40. Find numbers.
3. **Age:** Father is 30 years older than son. 5 years ago, father was 3 times son's age. Find ages.

### **Special Cases:**
1. Check: \`2x + y = 5\` and \`4x + 2y = 8\`
2. Check: \`x + y = 3\` and \`x + y = 4\`

**Answers:**
Basic: (5,3), (1,3), (0,6)
Advanced: (41/13,29/13), (1.5,2.5)
Word: ₹9,000 & ₹6,000, 16 & 24, Son-10, Father-40
Special: Unique solution (1,3), No solution

---

## 🎓 Pro Tips for Elimination Method

1. **Choose elimination variable wisely** - pick easier coefficients
2. **Find LCM correctly** - crucial for multiplication factors
3. **Keep track of signs** - addition vs subtraction
4. **Multiply systematically** - avoid arithmetic errors
5. **Check for special cases** - zero coefficients after elimination
6. **Verify solutions** - substitute in both equations
7. **Practice decimal elimination** - multiply by 10 or 100

---

## 🔢 Elimination Method Decision Tree

\`\`\`
Choose variable to eliminate
    ↓
Check coefficients
    ↓
Same signs? → Subtract equations
    ↓
Opposite signs? → Add equations
    ↓
Different magnitudes? → Find LCM and multiply
    ↓
Eliminate variable
    ↓
Solve remaining equation
    ↓
Substitute back
    ↓
Verify solution
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Operation**
❌ Adding when you should subtract
- Check signs of coefficients

### **Mistake 2: Incorrect LCM**
❌ Wrong multiplication factors
- Double-check LCM calculation

### **Mistake 3: Sign Errors in Subtraction**
❌ Forgetting to change signs when subtracting
- All signs change in subtraction

### **Mistake 4: Incomplete Elimination**
❌ Not multiplying both equations by correct factors
- Both equations must be multiplied

### **Mistake 5: Division Instead of Multiplication**
❌ Dividing equations instead of multiplying to eliminate decimals
- Always multiply to clear fractions/decimals

Master the elimination method and solve linear equation systems efficiently! 🏆`
};