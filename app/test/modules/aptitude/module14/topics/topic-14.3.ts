import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_3: SubLesson = {
  id: "14.3",
  title: 'Solving by Factorization',
  status: 'completed',
  content: "`# ðŸ” Solving by Factorization

Master the factorization method for solving quadratic equations! This algebraic technique is often the quickest method when the equation factors nicely. Learn systematic approaches to factor quadratic trinomials and solve equations efficiently.

---

## ðŸŽ¯ What is Factorization Method?

**Factorization Method** (also called **Splitting the Middle Term**) involves expressing the quadratic trinomial as a product of two linear factors and then setting each factor to zero to find the roots.

### **When to Use**
- When the quadratic equation factors easily
- When roots are integers or simple fractions
- For equations with integer coefficients
- When you want exact roots without decimals

### **Basic Principle**
\`"axÂ² + bx + c = (px + q)(rx + s) = 0\`
Then: \`px + q = 0\` and \`rx + s = 0\`

---

## ðŸ”¢ Step-by-Step Factorization Method

### **Step 1: Write in Standard Form**
Ensure equation is: \`axÂ² + bx + c = 0\`

### **Step 2: Factor Out Common Factors**
If all terms have a common factor, factor it out.

**Example:** \`2xÂ² + 6x + 4 = 0\`
\`2(xÂ² + 3x + 2) = 0\`
\`2(x + 1)(x + 2) = 0\`

### **Step 3: Factor the Quadratic**
For \`axÂ² + bx + c\`, find two numbers that:
- Multiply to give a Ã— c
- Add up to give b

### **Step 4: Write as Sum of Factors**
Split middle term: \`axÂ² + (m + n)x + c\`

### **Step 5: Group Terms**
\`(axÂ² + mx) + (nx + c)\`

### **Step 6: Factor by Grouping**
\`x(ax + m) + 1(nx + c)\`

### **Step 7: Set Factors to Zero**
Solve: \`ax + m = 0\` and \`nx + c = 0\`

---

## ðŸ“Š Basic Examples

### **Example 1: Monic Quadratic (a = 1)**
**Solve:** \`xÂ² + 5x + 6 = 0\`

**Step 1:** Find factors of 6 that add to 5: 2 and 3
**Step 2:** \`xÂ² + 2x + 3x + 6 = 0\`
**Step 3:** \`x(x + 2) + 3(x + 2) = 0\`
**Step 4:** \`(x + 2)(x + 3) = 0\`
**Step 5:** \`x = -2\` or \`x = -3\`

**Verification:**
\`(-2)Â² + 5(-2) + 6 = 4 - 10 + 6 = 0\` âœ“
\`(-3)Â² + 5(-3) + 6 = 9 - 15 + 6 = 0\` âœ“

### **Example 2: Non-Monic Quadratic**
**Solve:** \`2xÂ² + 7x + 3 = 0\`

**Step 1:** Multiply a Ã— c = 2 Ã— 3 = 6
**Step 2:** Find factors of 6 that add to 7: 6 and 1
**Step 3:** \`2xÂ² + 6x + x + 3 = 0\`
**Step 4:** \`2x(x + 3) + 1(x + 3) = 0\`
**Step 5:** \`(2x + 1)(x + 3) = 0\`
**Step 6:** \`2x + 1 = 0\` â†’ \`x = -1/2\`
\`x + 3 = 0\` â†’ \`x = -3\`

---

## ðŸ§® Advanced Examples

### **Example 1: Negative Constant Term**
**Solve:** \`xÂ² - 5x - 14 = 0\`

**Step 1:** Factors of -14 that add to -5: -7 and 2
**Step 2:** \`xÂ² - 7x + 2x - 14 = 0\`
**Step 3:** \`x(x - 7) + 2(x - 7) = 0\`
**Step 4:** \`(x - 7)(x + 2) = 0\`
**Step 5:** \`x = 7\` or \`x = -2\`

### **Example 2: Large Coefficients**
**Solve:** \`6xÂ² + 7x - 3 = 0\`

**Step 1:** a Ã— c = 6 Ã— (-3) = -18
**Step 2:** Factors of -18 that add to 7: 9 and -2
**Step 3:** \`6xÂ² + 9x - 2x - 3 = 0\`
**Step 4:** \`3x(2x + 3) - 1(2x + 3) = 0\`
**Step 5:** \`(3x - 1)(2x + 3) = 0\`
**Step 6:** \`3x - 1 = 0\` â†’ \`x = 1/3\`
\`2x + 3 = 0\` â†’ \`x = -3/2\`

### **Example 3: Perfect Square**
**Solve:** \`xÂ² + 6x + 9 = 0\`

**Step 1:** This is (x + 3)Â² = 0
**Step 2:** \`x + 3 = 0\` â†’ \`x = -3\` (repeated root)

---

## ðŸ“ˆ Special Factorization Patterns

### **1. Difference of Squares**
\`aÂ² - bÂ² = (a - b)(a + b)\`

**Example:** \`xÂ² - 9 = 0\`
\`(x - 3)(x + 3) = 0\`
\`x = 3\` or \`x = -3\`

### **2. Perfect Square Trinomial**
\`aÂ² + 2ab + bÂ² = (a + b)Â²\`
\`aÂ² - 2ab + bÂ² = (a - b)Â²\`

**Example:** \`xÂ² + 4x + 4 = 0\`
\`(x + 2)Â² = 0\`
\`x = -2\`

### **3. Common Factor First**
**Example:** \`3xÂ² - 12x = 0\`
\`3x(x - 4) = 0\`
\`x = 0\` or \`x = 4\`

### **4. Fractional Coefficients**
**Example:** \`xÂ² + (1/2)x - 1/2 = 0\`

Multiply by 2: \`2xÂ² + x - 1 = 0\`
Factors of -2 that add to 1: 2 and -1
\`2xÂ² + 2x - x - 1 = 0\`
\`2x(x + 1) - 1(x + 1) = 0\`
\`(2x - 1)(x + 1) = 0\`
\`x = 1/2\` or \`x = -1\`

---

## ðŸŽ¯ Systematic Factorization Algorithm

### **For axÂ² + bx + c = 0**

1. **If a = 1**: Find factors of c that add to b
2. **If a > 1**: Find factors of (aÃ—c) that add to b
3. **Split middle term**: Write as axÂ² + px + qx + c
4. **Group terms**: (axÂ² + px) + (qx + c)
5. **Factor groups**: x(ax + p) + r(qx + c)
6. **Common factor**: (ax + p)(x + r)
7. **Set to zero**: ax + p = 0 and x + r = 0

### **Decision Tree**

\`\`\`
Start with axÂ² + bx + c = 0
    â†“
a = 1? â†’ Find factors of c summing to b
    â†“
a > 1? â†’ Find factors of (aÃ—c) summing to b
    â†“
Split middle term
    â†“
Group and factor
    â†“
Set factors to zero
\`\`\`

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Factor Pair**
âŒ For xÂ² + 7x + 12, using 3Ã—4=12 but 3+4=7 âœ“
âŒ Using 2Ã—6=12 but 2+6=8 â‰  7 âœ—

### **Mistake 2: Incorrect Grouping**
âŒ xÂ² + 5x + 6 grouped as (xÂ² + 3x) + (2x + 6)
- Should be (xÂ² + 2x) + (3x + 6)

### **Mistake 3: Missing Common Factor**
âŒ 2xÂ² + 4x + 2 = 2(xÂ² + 2x + 1)
- Factor out 2 first: 2(xÂ² + 2x + 1)

### **Mistake 4: Wrong Sign Distribution**
âŒ xÂ² - 5x - 14 split as xÂ² + 7x - 12x - 14
- Should be xÂ² - 7x + 2x - 14

---

## ðŸŽ¯ Practice Questions

### **Basic Factorization:**
1. Solve: \`xÂ² + 8x + 15 = 0\`
2. Solve: \`xÂ² - 9x + 18 = 0\`
3. Solve: \`xÂ² + x - 12 = 0\`

### **Non-Monic Equations:**
1. Solve: \`2xÂ² + 9x + 4 = 0\`
2. Solve: \`3xÂ² - 10x + 3 = 0\`
3. Solve: \`5xÂ² + 11x + 2 = 0\`

### **Special Cases:**
1. Solve: \`xÂ² - 16 = 0\` (difference of squares)
2. Solve: \`xÂ² + 6x + 9 = 0\` (perfect square)
3. Solve: \`4xÂ² - 12x = 0\` (common factor)

### **Word Problems:**
1. **Numbers:** Sum of two numbers is 15, product is 50. Find numbers.
2. **Geometry:** Rectangle length exceeds width by 7m, area 78mÂ². Find dimensions.

### **Advanced:**
1. Solve: \`6xÂ² + 5x - 4 = 0\`
2. Solve: \`2xÂ² + 7x + 3 = 0\`

**Answers:**
Basic: -3,-5; 3,6; -4,3
Non-Monic: -4,-1/2; 3,1/3; -2,-1/5
Special: Â±4; -3 (repeated); 0,3
Word: 10,5; Length=13m, Width=6m
Advanced: 2/3,-4; -3,-1/2

---

## ðŸŽ“ Pro Tips for Factorization

1. **Always factor out common factors** first
2. **For a=1, focus on factors of c** summing to b
3. **For a>1, multiply aÃ—c** then find factor pairs
4. **Check factor pairs systematically** - don't guess randomly
5. **Group terms correctly** - ensure common factors emerge
6. **Verify factors** by expanding back
7. **Practice mental factorization** for quick checks

---

## ðŸ”¢ Factorization Checklist

- [ ] Equation in standard form
- [ ] Common factors removed
- [ ] Correct factor pairs identified
- [ ] Middle term properly split
- [ ] Terms correctly grouped
- [ ] Common factors factored out
- [ ] Linear equations solved
- [ ] Roots verified

Master factorization and you'll solve most quadratic equations with elegance and speed! ðŸ†`
};
