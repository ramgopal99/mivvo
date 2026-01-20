import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_3: SubLesson = {
  id: "13.3",
  title: 'Linear Equations in Two Variables',
  status: 'completed',
  content: "`# ðŸ“ˆ Linear Equations in Two Variables

Dive into the fascinating world of linear equations with two variables! These equations form the foundation for coordinate geometry and have countless real-world applications. Learn to recognize, solve, and apply two-variable linear equations effectively.

---

## ðŸŽ¯ What is a Linear Equation in Two Variables?

A **Linear Equation in Two Variables** is an equation that can be written in the form \`"ax + by + c = 0\`, where \`a\`, \`b\`, and \`c\` are real numbers, and \`a\` and \`b\` are not both zero.

### **General Form**
\`ax + by + c = 0\`

**Where:**
- \`x\`, \`y\`: variables
- \`a\`, \`b\`: coefficients (a, b â‰  0 simultaneously)
- \`c\`: constant term

### **Alternative Forms**
- \`ax + by = c\`
- \`ax + by + c = d\`
- \`ax - by = c\`

---

## ðŸ”¢ Standard Forms

### **1. General Form**
\`ax + by + c = 0\`
- Most common form
- Easy for calculations
- Example: \`2x + 3y - 6 = 0\`

### **2. Slope-Intercept Form**
\`y = mx + c\`
- \`m\`: slope of the line
- \`c\`: y-intercept
- Example: \`y = 2x + 3\`

### **3. Intercept Form**
\`x/a + y/b = 1\`
- \`a\`: x-intercept
- \`b\`: y-intercept
- Example: \`x/2 + y/3 = 1\`

### **4. Standard Form**
\`Ax + By = C\`
- A, B, C are integers
- A > 0, GCD(A,B,C) = 1
- Example: \`2x + 3y = 6\`

---

## ðŸ”„ Converting Between Forms

### **Example 1: General to Slope-Intercept**
**Equation:** \`2x + 3y - 6 = 0\`

**Step 1:** Bring to one side
\`2x + 3y = 6\`

**Step 2:** Solve for y
\`3y = -2x + 6\`
\`y = (-2/3)x + 2\`

**Answer:** \`y = (-2/3)x + 2\`

### **Example 2: Slope-Intercept to General**
**Equation:** \`y = 3x - 4\`

**Step 1:** Bring to standard form
\`y - 3x + 4 = 0\`
\`-3x + y + 4 = 0\`

**Step 2:** Make x coefficient positive
\`3x - y - 4 = 0\`

**Answer:** \`3x - y - 4 = 0\`

---

## ðŸ“Š Solutions of Linear Equations

### **What is a Solution?**
A solution is a pair of values (x, y) that satisfies the equation.

### **Example: Finding Solutions**
**Equation:** \`2x + y = 5\`

**Possible solutions:**
- (1, 3): \`2Ã—1 + 3 = 5\` âœ“
- (2, 1): \`2Ã—2 + 1 = 3\` â‰  5 âœ—
- (0, 5): \`2Ã—0 + 5 = 5\` âœ“
- (3, -1): \`2Ã—3 + (-1) = 5\` âœ“

### **Infinite Solutions**
Each linear equation in two variables has **infinitely many solutions** because:
- We can express y in terms of x (or vice versa)
- For each x-value, there's a corresponding y-value

---

## ðŸŽ¯ Expressing General Solution

### **Method 1: Express y in terms of x**
**Equation:** \`2x + 3y = 6\`

**Solution:** \`3y = 6 - 2x\`
\`y = (6 - 2x)/3\`
\`y = 2 - (2/3)x\`

**General solution:** \`y = 2 - (2/3)x\` where x is any real number

### **Method 2: Express x in terms of y**
**Equation:** \`2x + 3y = 6\`

**Solution:** \`2x = 6 - 3y\`
\`x = (6 - 3y)/2\`
\`x = 3 - (3/2)y\`

**General solution:** \`x = 3 - (3/2)y\` where y is any real number

---

## ðŸ“ˆ System of Linear Equations

Two or more linear equations with same variables form a **system**.

### **Example System:**
\`\`\`
2x + 3y = 7  ...(1)
x - y = 1     ...(2)
\`\`\`

### **Types of Systems:**

#### **1. Consistent System (Unique Solution)**
- Lines intersect at one point
- Example: Above system has solution (2, 1)

#### **2. Dependent System (Infinite Solutions)**
- Lines coincide (same line)
- Example: \`2x + y = 5\` and \`4x + 2y = 10\`

#### **3. Inconsistent System (No Solution)**
- Lines are parallel
- Example: \`x + y = 3\` and \`x + y = 5\`

---

## ðŸ§® Finding Specific Solutions

### **Method 1: Substitution**
**System:**
\`\`\`
x + y = 7  ...(1)
x - y = 3  ...(2)
\`\`\`

**Step 1:** From (1): \`x = 7 - y\`

**Step 2:** Substitute in (2):
\`(7 - y) - y = 3\`
\`7 - 2y = 3\`
\`7 - 3 = 2y\`
\`4 = 2y\`
\`y = 2\`

**Step 3:** Substitute y = 2 in (1):
\`x + 2 = 7\`
\`x = 5\`

**Solution:** (5, 2)

### **Method 2: Elimination**
**System:**
\`\`\`
2x + 3y = 11 ...(1)
x + 2y = 7    ...(2)
\`\`\`

**Step 1:** Multiply (2) by 2:
\`2x + 4y = 14\` ...(3)

**Step 2:** Subtract (1) from (3):
\`(2x + 4y) - (2x + 3y) = 14 - 11\`
\`y = 3\`

**Step 3:** Substitute in (2):
\`x + 2Ã—3 = 7\`
\`x + 6 = 7\`
\`x = 1\`

**Solution:** (1, 3)

---

## ðŸ“Š Graphical Representation

### **Coordinate Plane**
- x-axis: horizontal
- y-axis: vertical
- Origin: (0, 0)

### **Plotting Linear Equations**
**Equation:** \`x + y = 5\`

**Points:** (0,5), (5,0), (2,3), etc.

### **Line Characteristics**
- **Slope**: steepness of line
- **Intercept**: where line crosses axes
- **Direction**: angle with x-axis

---

## ðŸ’° Real-Life Applications

### **1. Cost Analysis**
**Problem:** A company sells two products. Product A costs â‚¹200 profit â‚¹50/unit. Product B costs â‚¹300 profit â‚¹70/unit. Total profit â‚¹500 from 10 units.

**Equations:**
Let A = units of product A, B = units of product B
\`\`\`
A + B = 10          ...(1)
50A + 70B = 500     ...(2)
\`\`\`

**Solution:** A = 6, B = 4

### **2. Age Problems**
**Problem:** Sum of ages is 45. After 5 years, sum becomes 55.

**Equations:**
Let x = John's age, y = Mary's age
\`\`\`
x + y = 45
(x + 5) + (y + 5) = 55
\`\`\`

**Solution:** x = 25, y = 20

### **3. Mixture Problems**
**Problem:** Mix 20% and 40% solutions to get 30% solution.

**Equations:**
Let x = amount of 20% solution, y = amount of 40% solution
\`\`\`
x + y = total amount
0.2x + 0.4y = 0.3(x + y)
\`\`\`

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Coefficient Interpretation**
âŒ \`2x + 3y = 6\` means x coefficient is 2
- Don't confuse with multiplication

### **Mistake 2: Incorrect Solution Verification**
âŒ Only checking one equation
- Always verify in both equations

### **Mistake 3: Wrong Substitution**
âŒ Substituting wrong variable
- Be careful with which variable you're substituting

### **Mistake 4: Sign Errors in Elimination**
âŒ Wrong sign when subtracting equations
- Double-check addition/subtraction

---

## ðŸŽ¯ Practice Questions

### **Express in Different Forms:**
1. Convert \`3x + 4y = 12\` to slope-intercept form.
2. Convert \`y = 2x + 5\` to general form.
3. Find slope and intercept of \`y = -3x + 7\`.

### **Find Solutions:**
1. Find three solutions for \`x + 2y = 6\`.
2. Express general solution for \`3x - y = 7\`.

### **Solve Systems:**
1. Solve: \`x + y = 8\` and \`x - y = 2\`
2. Solve: \`2x + 3y = 10\` and \`x + y = 5\`

### **Word Problems:**
1. **Age Problem:** Father's age is twice son's age. Sum of ages is 54. Find ages.
2. **Cost Problem:** Two items cost â‚¹150 and â‚¹200. Total cost of 3 items first and 2 items second is â‚¹650. Find individual prices.
3. **Mixture Problem:** Mix solutions of 10% and 20% acid to get 15% solution.

**Answers:**
Forms: y = -3x/4 + 3, 2x - y + 5 = 0, slope=-3, intercept=7
Solutions: (0,3), (2,2), (4,1); y = 3x - 7
Systems: (5,3), (1,4)
Word: Son-18, Father-36; â‚¹150, â‚¹200; Ratio 1:1

---

## ðŸŽ“ Pro Tips for Two-Variable Equations

1. **Master form conversions** - practice all standard forms
2. **Understand infinite solutions** - not unique like one variable
3. **Use both methods** - substitution and elimination
4. **Verify solutions** in both equations
5. **Practice graphical representation** - visualize the lines
6. **Apply to real problems** - age, cost, mixture problems
7. **Check for special cases** - parallel lines, coincident lines

---

## ðŸ”¢ Quick Reference Table

| Form | Equation | Characteristics |
|------|----------|-----------------|
| General | \`ax + by + c = 0\` | Most common |
| Slope-Intercept | \`y = mx + c\` | Shows slope & intercept |
| Intercept | \`x/a + y/b = 1\` | Shows intercepts |
| Standard | \`Ax + By = C\` | Integer coefficients |

| System Type | Solution | Geometric Meaning |
|-------------|----------|-------------------|
| Unique | One solution | Intersecting lines |
| Infinite | Many solutions | Coincident lines |
| None | No solution | Parallel lines |

Master linear equations in two variables and unlock advanced problem-solving skills! ðŸ†`
};
