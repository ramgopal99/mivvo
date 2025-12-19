import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_10: SubLesson = {
  id: "13.10",
  title: 'Consistent and Inconsistent Equations',
  status: 'completed',
  content: `# ⚖️ Consistent and Inconsistent Equations

Master the classification of systems of linear equations! Understanding consistency helps you determine when solutions exist and interpret different solution scenarios. Learn to analyze equations systematically and identify their nature.

---

## 🎯 What is Consistency?

**Consistency** refers to whether a system of linear equations has solutions or not.

### **Types of Systems:**
- **Consistent System**: Has at least one solution
- **Inconsistent System**: Has no solution
- **Dependent System**: Infinite solutions (special case of consistent)

### **Why Important?**
- Determines solution existence
- Helps choose solving methods
- Avoids unnecessary calculations
- Understands real-world applicability

---

## 📊 Classification Methods

### **Method 1: Graphical Approach**

#### **Consistent - Unique Solution**
Lines intersect at one point
\`\`\`
x + y = 7  ...(1)
x - y = 3  ...(2)
\`\`\`
**Graph:** Intersecting lines
**Solution:** One point (5, 2)

#### **Consistent - Infinite Solutions**
Lines coincide (same line)
\`\`\`
2x + y = 4  ...(1)
4x + 2y = 8 ...(2)
\`\`\`
**Graph:** Same line
**Solution:** Infinite points

#### **Inconsistent - No Solution**
Lines are parallel
\`\`\`
x + y = 3  ...(1)
x + y = 5  ...(2)
\`\`\`
**Graph:** Parallel lines
**Solution:** No intersection

---

## 🔢 Algebraic Classification

### **Using Elimination Method**

#### **Step 1: Write equations in standard form**
\`a₁x + b₁y + c₁ = 0\`
\`a₂x + b₂y + c₂ = 0\`

#### **Step 2: Compare coefficients**
- If \`a₁/a₂ ≠ b₁/b₂\`: Unique solution (consistent)
- If \`a₁/a₂ = b₁/b₂ = c₁/c₂\`: Infinite solutions (consistent, dependent)
- If \`a₁/a₂ = b₁/b₂ ≠ c₁/c₂\`: No solution (inconsistent)

#### **Examples:**

**Unique Solution:**
\`\`\`
2x + 3y = 11  ...(1)
x + 2y = 7     ...(2)
\`\`\`
Coefficients: 2/1 = 2, 3/2 = 1.5 → Different ratios → Unique solution

**Infinite Solutions:**
\`\`\`
2x + 3y = 6   ...(1)
4x + 6y = 12  ...(2)
\`\`\`
Divide equation (2) by 2: Same as equation (1) → Infinite solutions

**No Solution:**
\`\`\`
x + y = 3  ...(1)
x + y = 5  ...(2)
\`\`\`
Same coefficients, different constants → No solution

---

## 🧮 Determinant Method

### **For Two Equations:**
\`\`\`
a₁x + b₁y + c₁ = 0
a₂x + b₂y + c₂ = 0
\`\`\`

### **Determinant D:**
\`D = a₁b₂ - a₂b₁\`

### **Classification:**
- **D ≠ 0**: Unique solution (consistent)
- **D = 0**: Infinite or no solution
  - If \`a₁c₂ - a₂c₁ = 0\`: Infinite solutions
  - If \`a₁c₂ - a₂c₁ ≠ 0\`: No solution

### **Examples:**

**Unique Solution:**
\`\`\`
2x + 3y - 11 = 0
x + 2y - 7 = 0
\`\`\`
D = 2×2 - 1×3 = 4 - 3 = 1 ≠ 0 → Unique solution

**Infinite Solutions:**
\`\`\`
2x + 3y - 6 = 0
4x + 6y - 12 = 0
\`\`\`
D = 2×6 - 4×3 = 12 - 12 = 0
Check: 2×(-12) - 4×(-6) = -24 + 24 = 0 → Infinite solutions

**No Solution:**
\`\`\`
x + y - 3 = 0
x + y - 5 = 0
\`\`\`
D = 1×1 - 1×1 = 0
Check: 1×(-5) - 1×(-3) = -5 + 3 = -2 ≠ 0 → No solution

---

## 📈 Geometric Interpretation

### **Unique Solution (Consistent)**
- Lines intersect at one point
- System has exactly one solution
- Represented by ordered pair (x, y)

### **Infinite Solutions (Consistent & Dependent)**
- Lines are coincident (same line)
- Every point on the line is a solution
- General solution: y = expression in terms of x

### **No Solution (Inconsistent)**
- Lines are parallel
- Never intersect
- No common solution exists

---

## 🎯 Practical Examples

### **Example 1: Cost Problem (Unique Solution)**
**Problem:** 2 apples + 3 oranges = ₹100
4 apples + 2 oranges = ₹120

**System:**
\`\`\`
2a + 3o = 100  ...(1)
4a + 2o = 120  ...(2)
\`\`\`

**Check consistency:**
D = 2×2 - 4×3 = 4 - 12 = -8 ≠ 0 → Unique solution
**Solution:** Apples ₹20, Oranges ₹20

### **Example 2: Dependent System**
**Problem:** Express relationship between quantities

**System:**
\`\`\`
2x + 3y = 6   ...(1)
4x + 6y = 12  ...(2)
\`\`\`

**Check:** Equation (2) = 2 × Equation (1) → Dependent
**Solution:** Infinite solutions, y = (6 - 2x)/3

### **Example 3: Impossible Situation (Inconsistent)**
**Problem:** Sum of two numbers is 10, difference is 5

**System:**
\`\`\`
x + y = 10  ...(1)
x - y = 5   ...(2)
\`\`\`

**Solution:** x = 7.5, y = 2.5 → Consistent

**Inconsistent case:** x + y = 10, x + y = 15
**Result:** Impossible → No solution

---

## 🔄 Consistency in Different Methods

### **Substitution Method:**

#### **Consistent:**
\`\`\`
x + y = 7  ...(1)
x - y = 3  ...(2)
\`\`\`
From (1): x = 7 - y
Substitute: (7 - y) - y = 3 → y = 2, x = 5

#### **Inconsistent:**
\`\`\`
x + y = 3  ...(1)
x + y = 5  ...(2)
\`\`\`
From (1): x = 3 - y
Substitute: (3 - y) + y = 5 → 3 = 5 → Impossible

### **Elimination Method:**

#### **Consistent:**
\`\`\`
2x + 3y = 11
x + 2y = 7
\`\`\`
Multiply (2) by 2: 2x + 4y = 14
Subtract: y = 3, x = 1

#### **Inconsistent:**
\`\`\`
x + y = 3
x + y = 5
\`\`\`
Subtract: 0 = -2 → Impossible

---

## 🎯 Word Problem Applications

### **Example 1: Age Problem (Consistent)**
**Problem:** Father is 40, son is 10. After 10 years, father will be twice son's age.

**Check:** Current: 40 vs 20 (2×10)
After 10 years: 50 vs 40 (2×20) → Consistent

### **Example 2: Investment Problem (Inconsistent)**
**Problem:** ₹1000 invested at 10% gives ₹200 interest. Same amount at 20% gives ₹300 interest.

**Check:**
At 10%: 1000 × 0.1 × t = 200 → t = 2 years
At 20%: 1000 × 0.2 × t = 300 → t = 1.5 years
Different times → Inconsistent for same amount

### **Example 3: Work Problem (Dependent)**
**Problem:** A works twice as fast as B. Together they finish in 3 days.

**Solution:** Let B's rate = r, A's rate = 2r
Time: 3 days = 1/(r + 2r) = 1/(3r) → r = 1/9
Infinite solutions (A and B rates related)

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Classification**
❌ Calling dependent system inconsistent
- Dependent systems are consistent (infinite solutions)

### **Mistake 2: Incorrect Determinant**
❌ Using wrong order in determinant
- Always a₁b₂ - a₂b₁

### **Mistake 3: Missing Negative Signs**
❌ Forgetting signs in coefficient comparison
- Pay attention to positive/negative coefficients

### **Mistake 4: Confusing Parallel and Coincident**
❌ Parallel lines are inconsistent, coincident are dependent
- Parallel: no intersection, coincident: infinite intersections

---

## 🎯 Practice Problems

### **Classify Systems:**
1. \`2x + 3y = 7\` and \`x + y = 4\`
2. \`3x + 4y = 12\` and \`6x + 8y = 24\`
3. \`x + y = 5\` and \`x + y = 7\`

### **Word Problems:**
1. **Age:** Mother 3 times daughter's age. Sum 48. Check consistency.
2. **Cost:** Two items same price. Bought different quantities, different totals. Check consistency.
3. **Speed:** Two trains same speed. One starts later. Check if they meet.

### **Determinant Method:**
1. Check: \`a₁x + b₁y + c₁ = 0\` and \`a₂x + b₂y + c₂ = 0\`
   Given: a₁=2, b₁=3, c₁=-7; a₂=1, b₂=2, c₂=-4
2. Classify: \`3x + 4y = 6\` and \`6x + 8y = 10\`

### **Graphical:**
1. Sketch and classify: \`y = 2x + 1\` and \`y = 2x + 3\`
2. Sketch and classify: \`y = 3x - 1\` and \`y = 3x - 1\`

**Answers:**
Systems: Unique, Infinite, No solution
Word: Consistent, Inconsistent, Consistent
Determinant: D=1, unique; D=0, c check ≠0, no solution
Graphical: Parallel, Coincident

---

## 🎓 Pro Tips for Consistency

1. **Use determinant method** - most reliable for classification
2. **Check ratios of coefficients** - quick method
3. **Graph when possible** - visual confirmation
4. **Verify with substitution** - practical check
5. **Understand real meaning** - consistent = possible, inconsistent = impossible
6. **Practice different methods** - cross-verification
7. **Look for dependent relationships** - when equations are multiples

---

## 🔢 Consistency Flowchart

\`\`\`
Start with system of equations
    ↓
Write in standard form: ax + by + c = 0
    ↓
Calculate determinant D = a₁b₂ - a₂b₁
    ↓
D ≠ 0 → Unique solution (Consistent)
    ↓
D = 0 → Check a₁c₂ - a₂c₁
    ↓
= 0 → Infinite solutions (Consistent & Dependent)
    ↓
≠ 0 → No solution (Inconsistent)
\`\`\`

---

## 📊 Summary Table

| Type | Determinant | Geometric | Solutions | Example |
|------|-------------|-----------|-----------|---------|
| Unique | D ≠ 0 | Intersecting | One | \`x+y=7, x-y=3\` |
| Infinite | D = 0 & ratios equal | Coincident | Many | \`2x+y=4, 4x+2y=8\` |
| None | D = 0 & ratios unequal | Parallel | Zero | \`x+y=3, x+y=5\` |

Master consistency concepts and solve linear equation systems with confidence! 🏆`
};