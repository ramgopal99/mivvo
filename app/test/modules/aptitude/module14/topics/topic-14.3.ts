import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_3: SubLesson = {
  id: "14.3",
  title: 'Solving by Factorization',
  status: 'completed',
  content: `# 🔍 Solving by Factorization

Master the factorization method for solving quadratic equations! This algebraic technique is often the quickest method when the equation factors nicely. Learn systematic approaches to factor quadratic trinomials and solve equations efficiently.

---

## 🎯 What is Factorization Method?

**Factorization Method** (also called **Splitting the Middle Term**) involves expressing the quadratic trinomial as a product of two linear factors and then setting each factor to zero to find the roots.

### **When to Use**
- When the quadratic equation factors easily
- When roots are integers or simple fractions
- For equations with integer coefficients
- When you want exact roots without decimals

### **Basic Principle**
\`ax² + bx + c = (px + q)(rx + s) = 0\`
Then: \`px + q = 0\` and \`rx + s = 0\`

---

## 🔢 Step-by-Step Factorization Method

### **Step 1: Write in Standard Form**
Ensure equation is: \`ax² + bx + c = 0\`

### **Step 2: Factor Out Common Factors**
If all terms have a common factor, factor it out.

**Example:** \`2x² + 6x + 4 = 0\`
\`2(x² + 3x + 2) = 0\`
\`2(x + 1)(x + 2) = 0\`

### **Step 3: Factor the Quadratic**
For \`ax² + bx + c\`, find two numbers that:
- Multiply to give a × c
- Add up to give b

### **Step 4: Write as Sum of Factors**
Split middle term: \`ax² + (m + n)x + c\`

### **Step 5: Group Terms**
\`(ax² + mx) + (nx + c)\`

### **Step 6: Factor by Grouping**
\`x(ax + m) + 1(nx + c)\`

### **Step 7: Set Factors to Zero**
Solve: \`ax + m = 0\` and \`nx + c = 0\`

---

## 📊 Basic Examples

### **Example 1: Monic Quadratic (a = 1)**
**Solve:** \`x² + 5x + 6 = 0\`

**Step 1:** Find factors of 6 that add to 5: 2 and 3
**Step 2:** \`x² + 2x + 3x + 6 = 0\`
**Step 3:** \`x(x + 2) + 3(x + 2) = 0\`
**Step 4:** \`(x + 2)(x + 3) = 0\`
**Step 5:** \`x = -2\` or \`x = -3\`

**Verification:**
\`(-2)² + 5(-2) + 6 = 4 - 10 + 6 = 0\` ✓
\`(-3)² + 5(-3) + 6 = 9 - 15 + 6 = 0\` ✓

### **Example 2: Non-Monic Quadratic**
**Solve:** \`2x² + 7x + 3 = 0\`

**Step 1:** Multiply a × c = 2 × 3 = 6
**Step 2:** Find factors of 6 that add to 7: 6 and 1
**Step 3:** \`2x² + 6x + x + 3 = 0\`
**Step 4:** \`2x(x + 3) + 1(x + 3) = 0\`
**Step 5:** \`(2x + 1)(x + 3) = 0\`
**Step 6:** \`2x + 1 = 0\` → \`x = -1/2\`
\`x + 3 = 0\` → \`x = -3\`

---

## 🧮 Advanced Examples

### **Example 1: Negative Constant Term**
**Solve:** \`x² - 5x - 14 = 0\`

**Step 1:** Factors of -14 that add to -5: -7 and 2
**Step 2:** \`x² - 7x + 2x - 14 = 0\`
**Step 3:** \`x(x - 7) + 2(x - 7) = 0\`
**Step 4:** \`(x - 7)(x + 2) = 0\`
**Step 5:** \`x = 7\` or \`x = -2\`

### **Example 2: Large Coefficients**
**Solve:** \`6x² + 7x - 3 = 0\`

**Step 1:** a × c = 6 × (-3) = -18
**Step 2:** Factors of -18 that add to 7: 9 and -2
**Step 3:** \`6x² + 9x - 2x - 3 = 0\`
**Step 4:** \`3x(2x + 3) - 1(2x + 3) = 0\`
**Step 5:** \`(3x - 1)(2x + 3) = 0\`
**Step 6:** \`3x - 1 = 0\` → \`x = 1/3\`
\`2x + 3 = 0\` → \`x = -3/2\`

### **Example 3: Perfect Square**
**Solve:** \`x² + 6x + 9 = 0\`

**Step 1:** This is (x + 3)² = 0
**Step 2:** \`x + 3 = 0\` → \`x = -3\` (repeated root)

---

## 📈 Special Factorization Patterns

### **1. Difference of Squares**
\`a² - b² = (a - b)(a + b)\`

**Example:** \`x² - 9 = 0\`
\`(x - 3)(x + 3) = 0\`
\`x = 3\` or \`x = -3\`

### **2. Perfect Square Trinomial**
\`a² + 2ab + b² = (a + b)²\`
\`a² - 2ab + b² = (a - b)²\`

**Example:** \`x² + 4x + 4 = 0\`
\`(x + 2)² = 0\`
\`x = -2\`

### **3. Common Factor First**
**Example:** \`3x² - 12x = 0\`
\`3x(x - 4) = 0\`
\`x = 0\` or \`x = 4\`

### **4. Fractional Coefficients**
**Example:** \`x² + (1/2)x - 1/2 = 0\`

Multiply by 2: \`2x² + x - 1 = 0\`
Factors of -2 that add to 1: 2 and -1
\`2x² + 2x - x - 1 = 0\`
\`2x(x + 1) - 1(x + 1) = 0\`
\`(2x - 1)(x + 1) = 0\`
\`x = 1/2\` or \`x = -1\`

---

## 🎯 Systematic Factorization Algorithm

### **For ax² + bx + c = 0**

1. **If a = 1**: Find factors of c that add to b
2. **If a > 1**: Find factors of (a×c) that add to b
3. **Split middle term**: Write as ax² + px + qx + c
4. **Group terms**: (ax² + px) + (qx + c)
5. **Factor groups**: x(ax + p) + r(qx + c)
6. **Common factor**: (ax + p)(x + r)
7. **Set to zero**: ax + p = 0 and x + r = 0

### **Decision Tree**

\`\`\`
Start with ax² + bx + c = 0
    ↓
a = 1? → Find factors of c summing to b
    ↓
a > 1? → Find factors of (a×c) summing to b
    ↓
Split middle term
    ↓
Group and factor
    ↓
Set factors to zero
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Factor Pair**
❌ For x² + 7x + 12, using 3×4=12 but 3+4=7 ✓
❌ Using 2×6=12 but 2+6=8 ≠ 7 ✗

### **Mistake 2: Incorrect Grouping**
❌ x² + 5x + 6 grouped as (x² + 3x) + (2x + 6)
- Should be (x² + 2x) + (3x + 6)

### **Mistake 3: Missing Common Factor**
❌ 2x² + 4x + 2 = 2(x² + 2x + 1)
- Factor out 2 first: 2(x² + 2x + 1)

### **Mistake 4: Wrong Sign Distribution**
❌ x² - 5x - 14 split as x² + 7x - 12x - 14
- Should be x² - 7x + 2x - 14

---

## 🎯 Practice Questions

### **Basic Factorization:**
1. Solve: \`x² + 8x + 15 = 0\`
2. Solve: \`x² - 9x + 18 = 0\`
3. Solve: \`x² + x - 12 = 0\`

### **Non-Monic Equations:**
1. Solve: \`2x² + 9x + 4 = 0\`
2. Solve: \`3x² - 10x + 3 = 0\`
3. Solve: \`5x² + 11x + 2 = 0\`

### **Special Cases:**
1. Solve: \`x² - 16 = 0\` (difference of squares)
2. Solve: \`x² + 6x + 9 = 0\` (perfect square)
3. Solve: \`4x² - 12x = 0\` (common factor)

### **Word Problems:**
1. **Numbers:** Sum of two numbers is 15, product is 50. Find numbers.
2. **Geometry:** Rectangle length exceeds width by 7m, area 78m². Find dimensions.

### **Advanced:**
1. Solve: \`6x² + 5x - 4 = 0\`
2. Solve: \`2x² + 7x + 3 = 0\`

**Answers:**
Basic: -3,-5; 3,6; -4,3
Non-Monic: -4,-1/2; 3,1/3; -2,-1/5
Special: ±4; -3 (repeated); 0,3
Word: 10,5; Length=13m, Width=6m
Advanced: 2/3,-4; -3,-1/2

---

## 🎓 Pro Tips for Factorization

1. **Always factor out common factors** first
2. **For a=1, focus on factors of c** summing to b
3. **For a>1, multiply a×c** then find factor pairs
4. **Check factor pairs systematically** - don't guess randomly
5. **Group terms correctly** - ensure common factors emerge
6. **Verify factors** by expanding back
7. **Practice mental factorization** for quick checks

---

## 🔢 Factorization Checklist

- [ ] Equation in standard form
- [ ] Common factors removed
- [ ] Correct factor pairs identified
- [ ] Middle term properly split
- [ ] Terms correctly grouped
- [ ] Common factors factored out
- [ ] Linear equations solved
- [ ] Roots verified

Master factorization and you'll solve most quadratic equations with elegance and speed! 🏆`
};