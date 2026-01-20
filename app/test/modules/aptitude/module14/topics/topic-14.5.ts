import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_5: SubLesson = {
  id: "14.5",
  title: 'Quadratic Formula',
  status: 'completed',
  content: "`# ðŸ“ Quadratic Formula

Master the universal Quadratic Formula for solving any quadratic equation! This powerful tool works for all quadratic equations and is essential for competitive exams. Learn to apply the formula correctly and understand its derivation.

---

## ðŸŽ¯ What is the Quadratic Formula?

The **Quadratic Formula** is a universal method to solve any quadratic equation of the form \`"axÂ² + bx + c = 0\`. It gives the roots directly using the coefficients.

### **The Formula**
\`x = [-b Â± âˆš(bÂ² - 4ac)] / (2a)\`

### **Where:**
- \`a\`: coefficient of xÂ² (a â‰  0)
- \`b\`: coefficient of x
- \`c\`: constant term
- \`Â±\`: plus or minus (two solutions)

### **Discriminant (D)**
\`D = bÂ² - 4ac\`
- D > 0: Two distinct real roots
- D = 0: One real root (repeated)
- D < 0: Two complex roots

---

## ðŸ“ˆ Derivation of Quadratic Formula

### **Method 1: Completing the Square**
**For axÂ² + bx + c = 0:**

1. \`axÂ² + bx = -c\`
2. \`xÂ² + (b/a)x = -c/a\`
3. \`xÂ² + (b/a)x + (b/(2a))Â² = -c/a + (b/(2a))Â²\`
4. \`(x + b/(2a))Â² = (-c/a) + (bÂ²/(4aÂ²))\`
5. \`(x + b/(2a))Â² = (bÂ² - 4ac)/(4aÂ²)\`
6. \`x + b/(2a) = Â± âˆš(bÂ² - 4ac)/(2a)\`
7. \`x = -b/(2a) Â± âˆš(bÂ² - 4ac)/(2a)\`
8. \`x = [-b Â± âˆš(bÂ² - 4ac)]/(2a)\`

### **Method 2: Direct Formula Application**
The formula is derived from completing the square and can be used directly.

---

## ðŸ”¢ Applying the Quadratic Formula

### **Step 1: Identify Coefficients**
Write equation as \`axÂ² + bx + c = 0\`
- a = coefficient of xÂ²
- b = coefficient of x
- c = constant term

### **Step 2: Calculate Discriminant**
\`D = bÂ² - 4ac\`

### **Step 3: Apply Formula**
\`x = [-b Â± âˆšD] / (2a)\`

### **Step 4: Write Both Solutions**
\`x = [-b + âˆšD] / (2a)\` and \`x = [-b - âˆšD] / (2a)\`

### **Step 5: Simplify**
- Reduce fractions
- Rationalize denominators if needed
- Write in simplest form

---

## ðŸ“Š Examples: Real Roots

### **Example 1: Perfect Square Roots**
**Solve:** \`xÂ² - 5x + 6 = 0\`

**Coefficients:** a = 1, b = -5, c = 6

**Discriminant:** D = (-5)Â² - 4Ã—1Ã—6 = 25 - 24 = 1

**Solutions:**
\`x = [5 Â± âˆš1] / 2\`
\`x = [5 + 1]/2 = 6/2 = 3\`
\`x = [5 - 1]/2 = 4/2 = 2\`

### **Example 2: Negative b coefficient**
**Solve:** \`xÂ² + 4x - 5 = 0\`

**Coefficients:** a = 1, b = 4, c = -5

**Discriminant:** D = 4Â² - 4Ã—1Ã—(-5) = 16 + 20 = 36

**Solutions:**
\`x = [-4 Â± âˆš36]/2\`
\`x = [-4 + 6]/2 = 2/2 = 1\`
\`x = [-4 - 6]/2 = -10/2 = -5\`

### **Example 3: Leading coefficient â‰  1**
**Solve:** \`2xÂ² - 7x + 3 = 0\`

**Coefficients:** a = 2, b = -7, c = 3

**Discriminant:** D = (-7)Â² - 4Ã—2Ã—3 = 49 - 24 = 25

**Solutions:**
\`x = [7 Â± âˆš25]/(2Ã—2)\`
\`x = [7 Â± 5]/4\`
\`x = 12/4 = 3\` or \`x = 2/4 = 0.5\`

---

## ðŸ§® Examples: Complex Roots

### **Example 1: Negative Discriminant**
**Solve:** \`xÂ² + 2x + 5 = 0\`

**Coefficients:** a = 1, b = 2, c = 5

**Discriminant:** D = 2Â² - 4Ã—1Ã—5 = 4 - 20 = -16

**Solutions:**
\`x = [-2 Â± âˆš(-16)]/2\`
\`x = [-2 Â± 4i]/2\`
\`x = -1 + 2i\` or \`x = -1 - 2i\`

### **Example 2: Pure Imaginary**
**Solve:** \`xÂ² + 4 = 0\`

**Coefficients:** a = 1, b = 0, c = 4

**Discriminant:** D = 0 - 4Ã—1Ã—4 = -16

**Solutions:**
\`x = [0 Â± âˆš(-16)]/2\`
\`x = [0 Â± 4i]/2\`
\`x = 2i\` or \`x = -2i\`

---

## ðŸŽ¯ Examples: Repeated Roots

### **Example 1: Discriminant = 0**
**Solve:** \`xÂ² - 4x + 4 = 0\`

**Coefficients:** a = 1, b = -4, c = 4

**Discriminant:** D = (-4)Â² - 4Ã—1Ã—4 = 16 - 16 = 0

**Solutions:**
\`x = [4 Â± âˆš0]/2\`
\`x = [4 Â± 0]/2\`
\`x = 4/2 = 2\` (repeated root)

### **Example 2: With leading coefficient**
**Solve:** \`9xÂ² - 12x + 4 = 0\`

**Coefficients:** a = 9, b = -12, c = 4

**Discriminant:** D = (-12)Â² - 4Ã—9Ã—4 = 144 - 144 = 0

**Solutions:**
\`x = [12 Â± 0]/(2Ã—9)\`
\`x = 12/18 = 2/3\` (repeated root)

---

## ðŸ“ˆ Nature of Roots Summary

| Discriminant | Nature of Roots | Number of Solutions |
|-------------|----------------|-------------------|
| D > 0 | Two distinct real roots | 2 |
| D = 0 | One real root (repeated) | 1 |
| D < 0 | Two complex roots | 0 real, 2 complex |

### **Real Roots Conditions:**
- D â‰¥ 0 for real roots
- D > 0 for distinct real roots
- D = 0 for equal real roots

### **Complex Roots Form:**
If D < 0, roots are: \`[-b Â± âˆš(-D)i]/(2a)\`

---

## ðŸ”„ Relationship with Roots

### **Sum of Roots**
\`Î± + Î² = -b/a\`
From formula: \`xâ‚ + xâ‚‚ = -(-b)/a = -b/a\`

### **Product of Roots**
\`Î± Ã— Î² = c/a\`
From formula: When roots are r, s, then (x - r)(x - s) = xÂ² - (r+s)x + rs

### **Verification**
For equation \`axÂ² + bx + c = 0\`
- Sum of roots = -b/a
- Product of roots = c/a

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Discriminant Sign**
âŒ D = bÂ² + 4ac (wrong sign)
- Always subtract: bÂ² - 4ac

### **Mistake 2: Forgetting 2a in Denominator**
âŒ x = [-b Â± âˆšD]/a
- Correct: x = [-b Â± âˆšD]/(2a)

### **Mistake 3: Wrong Coefficient Identification**
âŒ For 2xÂ² + 3x + 1 = 0, a=2, b=3, c=1 âœ“
âŒ For xÂ² - 5x = 6, must be xÂ² - 5x - 6 = 0

### **Mistake 4: Complex Root Errors**
âŒ âˆš(-4) = 2i, but x = [-2 Â± 2i]/2 = -1 Â± i âœ“
âŒ Forgetting to divide complex part by 2a

---

## ðŸŽ¯ Practice Questions

### **Real Roots Cases:**
1. Solve: \`xÂ² - 7x + 12 = 0\`
2. Solve: \`2xÂ² + 5x - 3 = 0\`
3. Solve: \`xÂ² + 4x + 4 = 0\`

### **Complex Roots Cases:**
1. Solve: \`xÂ² + 2x + 3 = 0\`
2. Solve: \`2xÂ² + 3x + 5 = 0\`

### **Nature Determination:**
1. Find nature of roots: \`3xÂ² - 5x + 2 = 0\`
2. Find nature of roots: \`xÂ² + x + 1 = 0\`
3. Find nature of roots: \`4xÂ² - 4x + 1 = 0\`

### **Sum and Product:**
1. For equation \`xÂ² - 5x + 6 = 0\`, verify sum and product
2. Find quadratic equation with roots 3 and -2

### **Word Problems:**
1. **Area:** Rectangle area 24mÂ², length 2m more than width
2. **Investment:** Two investments, total â‚¹5000, difference â‚¹1000

**Answers:**
Real: 3,4; -3,0.5; 2 (repeated)
Complex: -1Â±âˆš2i; Complex roots
Nature: Real distinct; Complex; Real equal
Sum/Product: Sum=5, Product=6; xÂ²-x-6=0
Word: 6Ã—4m; â‚¹3000, â‚¹2000

---

## ðŸŽ“ Pro Tips for Quadratic Formula

1. **Always identify a, b, c correctly** from standard form
2. **Calculate discriminant carefully** - common mistake area
3. **Use both Â± signs** to get both roots
4. **Simplify fractions** after calculation
5. **Check for repeated roots** when D = 0
6. **Handle complex roots** properly with i notation
7. **Verify solutions** by substitution

---

## ðŸ”¢ Quadratic Formula Memory Aid

\`\`\`
x = [-b Â± âˆš(bÂ² - 4ac)] / (2a)

"B" is for "both" (numerator and denominator)
"4ac" is for "four a c"
"2a" is for "two a"
"Â±" is for "plus or minus"
\`\`\`

---

## ðŸ“Š Comparison with Other Methods

| Method | Advantages | Disadvantages |
|--------|------------|---------------|
| Factorization | Exact, simple | Not always possible |
| Completing Square | Shows process | Tedious for large numbers |
| Quadratic Formula | Always works | May give decimals |

Choose the method based on the equation and your needs!

Master the quadratic formula and you'll solve any quadratic equation with confidence! ðŸ†`
};
