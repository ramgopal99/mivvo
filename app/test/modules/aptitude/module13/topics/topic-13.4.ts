import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_4: SubLesson = {
  id: "13.4",
  title: 'Solving by Substitution Method',
  status: 'completed',
  content: `# 🔄 Solving by Substitution Method

Master the Substitution Method for solving systems of linear equations! This systematic approach is particularly useful when one equation has a variable with coefficient 1. Learn to substitute and solve with confidence.

---

## 🎯 What is Substitution Method?

**Substitution Method** is a technique to solve systems of linear equations by expressing one variable in terms of the other from one equation and substituting it into the second equation.

### **When to Use**
- When one variable has coefficient 1 or -1
- When equations are simple to manipulate
- When you want to avoid fractions in elimination

### **Basic Principle**
Express one variable from one equation and substitute into the other equation.

---

## 🔢 Step-by-Step Substitution Method

### **Step 1: Choose the Variable to Substitute**
- Pick the variable that's easiest to express
- Usually choose variable with coefficient ±1
- If both have complex coefficients, choose simpler one

### **Step 2: Express Chosen Variable**
- Solve one equation for that variable
- Write it in terms of the other variable

### **Step 3: Substitute**
- Replace the expressed variable in the second equation
- Now you have one equation with one variable

### **Step 4: Solve the Equation**
- Solve for the remaining variable
- Get the value of the first variable

### **Step 5: Substitute Back**
- Put the found value into one of the original equations
- Find the value of the second variable

### **Step 6: Verify**
- Check both equations with the solution
- Ensure it satisfies both equations

---

## 📊 Examples: Basic Substitution

### **Example 1: Simple Case**
**Solve:**
\`\`\`
x + y = 7  ...(1)
x - y = 3  ...(2)
\`\`\`

**Step 1:** From equation (1): \`x = 7 - y\`

**Step 2:** Substitute in equation (2):
\`(7 - y) - y = 3\`
\`7 - y - y = 3\`
\`7 - 2y = 3\`

**Step 3:** Solve for y:
\`7 - 2y = 3\`
\`7 - 3 = 2y\`
\`4 = 2y\`
\`y = 2\`

**Step 4:** Substitute y = 2 in equation (1):
\`x + 2 = 7\`
\`x = 5\`

**Solution:** x = 5, y = 2

**Verification:**
Equation (1): 5 + 2 = 7 ✓
Equation (2): 5 - 2 = 3 ✓

---

## 🧮 Advanced Examples

### **Example 1: Coefficient Other Than 1**
**Solve:**
\`\`\`
2x + y = 10 ...(1)
x + y = 6    ...(2)
\`\`\`

**Step 1:** From equation (2): \`x = 6 - y\`

**Step 2:** Substitute in equation (1):
\`2(6 - y) + y = 10\`
\`12 - 2y + y = 10\`
\`12 - y = 10\`

**Step 3:** Solve for y:
\`12 - y = 10\`
\`12 - 10 = y\`
\`y = 2\`

**Step 4:** Substitute y = 2 in equation (2):
\`x + 2 = 6\`
\`x = 4\`

**Solution:** x = 4, y = 2

### **Example 2: Negative Coefficients**
**Solve:**
\`\`\`
x - 2y = 1  ...(1)
3x + y = 10 ...(2)
\`\`\`

**Step 1:** From equation (1): \`x = 1 + 2y\`

**Step 2:** Substitute in equation (2):
\`3(1 + 2y) + y = 10\`
\`3 + 6y + y = 10\`
\`3 + 7y = 10\`

**Step 3:** Solve for y:
\`7y = 10 - 3\`
\`7y = 7\`
\`y = 1\`

**Step 4:** Substitute y = 1 in equation (1):
\`x - 2×1 = 1\`
\`x - 2 = 1\`
\`x = 3\`

**Solution:** x = 3, y = 1

---

## 📈 Complex Examples

### **Example 1: Fractional Coefficients**
**Solve:**
\`\`\`
x/2 + y/3 = 5  ...(1)
x/3 + y/2 = 4  ...(2)
\`\`\`

**Step 1:** Multiply equations to eliminate denominators:
Equation (1) × 6: \`3x + 2y = 30\` ...(3)
Equation (2) × 6: \`2x + 3y = 24\` ...(4)

**Step 2:** From equation (3): \`3x = 30 - 2y\`
\`x = (30 - 2y)/3\`

**Step 3:** Substitute in equation (4):
\`2×((30 - 2y)/3) + 3y = 24\`
\`2(30 - 2y)/3 + 3y = 24\`
\`Multiply by 3: 2(30 - 2y) + 9y = 72\`
\`60 - 4y + 9y = 72\`
\`60 + 5y = 72\`
\`5y = 12\`
\`y = 12/5 = 2.4\`

**Step 4:** Substitute y = 12/5 in equation (3):
\`3x + 2×(12/5) = 30\`
\`3x + 24/5 = 30\`
\`3x = 30 - 24/5 = (150 - 24)/5 = 126/5\`
\`x = 126/5 ÷ 3 = 126/(5×3) = 126/15 = 8.4\`

**Solution:** x = 42/5, y = 12/5

---

## 🎯 Word Problems Using Substitution

### **Example 1: Age Problem**
**Problem:** A father is 4 years older than 3 times his son's age. The sum of their ages is 50 years. Find their ages.

**Solution:**
Let son's age = \`x\` years
Father's age = \`3x + 4\` years

Equation: \`x + (3x + 4) = 50\`
\`4x + 4 = 50\`
\`4x = 46\`
\`x = 11.5\`

Father's age = \`3×11.5 + 4 = 34.5 + 4 = 38.5\`

**Answer:** Son: 11.5 years, Father: 38.5 years

### **Example 2: Cost Problem**
**Problem:** A shopkeeper sells two types of items. Type A costs ₹20 each, Type B costs ₹30 each. He sells 5 items of type A and some of type B, totaling ₹400. Find number of type B items.

**Solution:**
Let number of type B items = \`x\`

Equation: \`5×20 + x×30 = 400\`
\`100 + 30x = 400\`
\`30x = 300\`
\`x = 10\`

**Answer:** 10 items of type B

---

## 🚨 Special Cases in Substitution

### **Case 1: Infinite Solutions (Dependent System)**
**System:**
\`\`\`
2x + y = 4  ...(1)
4x + 2y = 8 ...(2)
\`\`\`

**Step 1:** From equation (1): \`y = 4 - 2x\`

**Step 2:** Substitute in equation (2):
\`4x + 2(4 - 2x) = 8\`
\`4x + 8 - 4x = 8\`
\`8 = 8\`

**Result:** Identity (true for all x)
**Infinite solutions:** y = 4 - 2x

### **Case 2: No Solution (Inconsistent System)**
**System:**
\`\`\`
x + y = 3  ...(1)
x + y = 5  ...(2)
\`\`\`

**Step 1:** From equation (1): \`y = 3 - x\`

**Step 2:** Substitute in equation (2):
\`x + (3 - x) = 5\`
\`3 = 5\`

**Result:** Contradiction (never true)
**No solution**

---

## 🎯 Practice Questions

### **Basic Substitution:**
1. Solve: \`x + y = 8\` and \`x - y = 2\`
2. Solve: \`2x + y = 7\` and \`x + y = 4\`
3. Solve: \`x - 2y = 1\` and \`3x + y = 10\`

### **Advanced Problems:**
1. Solve: \`x/2 + y/3 = 5\` and \`x/3 + y/2 = 4\`
2. Solve: \`2/x + 3/y = 5\` and \`3/x + 2/y = 4\` (Let 1/x = a, 1/y = b)

### **Word Problems:**
1. **Number Problem:** Sum of two numbers is 15. One is 3 more than twice the other. Find numbers.
2. **Age Problem:** Mother is 5 years younger than twice her daughter's age. Sum of ages is 45. Find ages.
3. **Cost Problem:** Two items A and B. A costs ₹50, B costs ₹30. Bought 3A and 4B for ₹270. Verify if correct.

### **Special Cases:**
1. Check if these have solutions: \`2x + y = 5\` and \`4x + 2y = 10\`
2. Check if these have solutions: \`x + y = 3\` and \`x + y = 4\`

**Answers:**
Basic: (5,3), (1,3), (3,1)
Advanced: (42/5,12/5), (1,1)
Word: 4 and 11, Daughter-13.3, Mother-26.7, Correct
Special: Infinite solutions, No solution

---

## 🎓 Pro Tips for Substitution Method

1. **Choose the right variable** - pick coefficient ±1 when possible
2. **Express carefully** - ensure correct sign when moving terms
3. **Substitute completely** - replace all occurrences of the variable
4. **Watch for fractions** - multiply equations if needed
5. **Check special cases** - infinite solutions or no solutions
6. **Verify solutions** - substitute back in both original equations
7. **Practice word problems** - translate English to equations

---

## 🔢 Substitution Method Flowchart

\`\`\`
Start with two equations
    ↓
Choose variable to express (preferably coeff ±1)
    ↓
Express chosen variable in terms of other
    ↓
Substitute expression into second equation
    ↓
Solve the resulting equation
    ↓
Substitute found value back into first equation
    ↓
Get second variable value
    ↓
Verify in both original equations
    ↓
Write final solution
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Substitution**
❌ Substituting wrong variable
- Always substitute the expressed variable

### **Mistake 2: Sign Errors**
❌ Forgetting to change signs when transposing
- Double-check sign changes

### **Mistake 3: Incomplete Substitution**
❌ Missing terms when substituting
- Replace all occurrences of the variable

### **Mistake 4: Division Errors**
❌ Dividing instead of multiplying when eliminating denominators
- Multiply equations to clear fractions

Master the substitution method and solve linear equation systems with ease! 🏆`
};