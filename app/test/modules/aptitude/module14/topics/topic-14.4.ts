import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_4: SubLesson = {
  id: "14.4",
  title: 'Solving by Completing the Square',
  status: 'completed',
  content: "`# ðŸŽ¯ Solving by Completing the Square

Master the Completing the Square method for quadratic equations! This geometric approach transforms the equation into a perfect square trinomial, making it easier to solve. Learn to complete squares systematically and understand the underlying mathematics.

---

## ðŸŽ¯ What is Completing the Square?

**Completing the Square** is a method that transforms a quadratic expression into a perfect square trinomial by adding a constant term. This allows us to solve quadratic equations by taking square roots.

### **Geometric Interpretation**
- Represents completing a square with side length (b/2a)
- Creates a perfect square trinomial
- Transforms equation into (x + h)Â² = k form

### **When to Use**
- When factorization is difficult
- When you need exact solutions
- For deriving the quadratic formula
- When working with vertex form

---

## ðŸ”¢ Step-by-Step Completing the Square

### **Step 1: Write in Standard Form**
Ensure equation is: \`"axÂ² + bx + c = 0\`

### **Step 2: Move Constant to Right Side**
\`axÂ² + bx = -c\`

### **Step 3: Divide by Leading Coefficient (if a â‰  1)**
\`xÂ² + (b/a)x = -c/a\`

### **Step 4: Half the Linear Coefficient**
Take half of x coefficient: \`b/(2a)\`

### **Step 5: Square the Half**
\`(b/(2a))Â²\`

### **Step 6: Add to Both Sides**
\`xÂ² + (b/a)x + (b/(2a))Â² = -c/a + (b/(2a))Â²\`

### **Step 7: Write as Perfect Square**
\`(x + b/(2a))Â² = -c/a + bÂ²/(4aÂ²)\`

### **Step 8: Combine Right Side**
\`(x + b/(2a))Â² = (bÂ² - 4ac)/(4aÂ²)\`

### **Step 9: Take Square Root**
\`x + b/(2a) = Â±âˆš[(bÂ² - 4ac)/(4aÂ²)]\`

### **Step 10: Solve for x**
\`x = -b/(2a) Â± âˆš(bÂ² - 4ac)/(2a)\`

---

## ðŸ“Š Basic Examples

### **Example 1: a = 1 (Simple Case)**
**Solve:** \`xÂ² + 6x + 5 = 0\`

**Step 1:** \`xÂ² + 6x = -5\`

**Step 2:** Half of 6 is 3, square is 9

**Step 3:** \`xÂ² + 6x + 9 = -5 + 9\`

**Step 4:** \`(x + 3)Â² = 4\`

**Step 5:** \`x + 3 = Â±2\`

**Step 6:** \`x = -3 + 2 = -1\` or \`x = -3 - 2 = -5\`

**Verification:**
\`(-1)Â² + 6(-1) + 5 = 1 - 6 + 5 = 0\` âœ“
\`(-5)Â² + 6(-5) + 5 = 25 - 30 + 5 = 0\` âœ“

### **Example 2: Negative Constant**
**Solve:** \`xÂ² - 4x - 12 = 0\`

**Step 1:** \`xÂ² - 4x = 12\`

**Step 2:** Half of -4 is -2, square is 4

**Step 3:** \`xÂ² - 4x + 4 = 12 + 4\`

**Step 4:** \`(x - 2)Â² = 16\`

**Step 5:** \`x - 2 = Â±4\`

**Step 6:** \`x = 2 + 4 = 6\` or \`x = 2 - 4 = -2\`

---

## ðŸ§® Advanced Examples

### **Example 1: Leading Coefficient â‰  1**
**Solve:** \`2xÂ² + 8x + 6 = 0\`

**Step 1:** \`2xÂ² + 8x = -6\`

**Step 2:** Divide by 2: \`xÂ² + 4x = -3\`

**Step 3:** Half of 4 is 2, square is 4

**Step 4:** \`xÂ² + 4x + 4 = -3 + 4\`

**Step 5:** \`(x + 2)Â² = 1\`

**Step 6:** \`x + 2 = Â±1\`

**Step 7:** \`x = -2 + 1 = -1\` or \`x = -2 - 1 = -3\`

### **Example 2: Fractional Coefficients**
**Solve:** \`xÂ² + (1/2)x - 1/2 = 0\`

**Step 1:** \`xÂ² + (1/2)x = 1/2\`

**Step 2:** Half of 1/2 is 1/4, square is 1/16

**Step 3:** \`xÂ² + (1/2)x + 1/16 = 1/2 + 1/16\`

**Step 4:** \`(x + 1/4)Â² = 8/16 + 1/16 = 9/16\`

**Step 5:** \`x + 1/4 = Â±3/4\`

**Step 6:** \`x = -1/4 + 3/4 = 1/2\` or \`x = -1/4 - 3/4 = -1\`

### **Example 3: Complex Case**
**Solve:** \`3xÂ² - 5x + 1 = 0\`

**Step 1:** \`3xÂ² - 5x = -1\`

**Step 2:** Divide by 3: \`xÂ² - (5/3)x = -1/3\`

**Step 3:** Half of -5/3 is -5/6, square is 25/36

**Step 4:** \`xÂ² - (5/3)x + 25/36 = -1/3 + 25/36\`

**Step 5:** \`xÂ² - (5/3)x + 25/36 = (-12 + 25)/36 = 13/36\`

**Step 6:** \`(x - 5/6)Â² = 13/36\`

**Step 7:** \`x - 5/6 = Â±âˆš13/6\`

**Step 8:** \`x = 5/6 Â± âˆš13/6\`

---

## ðŸ“ˆ Completing Square for Expression

### **General Quadratic Expression**
To complete square for \`axÂ² + bx + c\`:

1. Factor out a: \`a(xÂ² + (b/a)x) + c\`
2. Complete square: \`a(x + b/(2a))Â² + c - bÂ²/(4a)\`
3. Vertex form: \`a(x - h)Â² + k\`

### **Example: Convert to Vertex Form**
**Expression:** \`xÂ² - 6x + 8\`

**Step 1:** \`xÂ² - 6x + 8\`

**Step 2:** Half of -6 is -3, square is 9

**Step 3:** \`xÂ² - 6x + 9 + 8 - 9 = (x - 3)Â² - 1\`

**Step 4:** Vertex form: \`(x - 3)Â² - 1\`

---

## ðŸŽ¯ Deriving Quadratic Formula

The completing square method leads to the quadratic formula:

**For axÂ² + bx + c = 0:**

\`axÂ² + bx = -c\`
\`xÂ² + (b/a)x = -c/a\`
\`xÂ² + (b/a)x + (b/(2a))Â² = -c/a + (b/(2a))Â²\`
\`(x + b/(2a))Â² = (-c/a) + (bÂ²/(4aÂ²))\`
\`(x + b/(2a))Â² = (bÂ² - 4ac)/(4aÂ²)\`
\`x + b/(2a) = Â±âˆš(bÂ² - 4ac)/(2a)\`
\`x = -b/(2a) Â± âˆš(bÂ² - 4ac)/(2a)\`
\`x = [-b Â± âˆš(bÂ² - 4ac)]/(2a)\`

---

## ðŸ”„ Relationship with Other Methods

### **Completing Square vs Factorization**
- **Factorization**: Direct when factors exist
- **Completing Square**: Always works, more systematic

### **Completing Square vs Quadratic Formula**
- **Completing Square**: Shows the process
- **Quadratic Formula**: Direct application

### **Advantages of Completing Square**
- Works for all quadratic equations
- Gives vertex form directly
- Builds understanding of the process
- Useful for integration and other calculus applications

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Half Calculation**
âŒ For xÂ² + 8x, half is 8, square is 64
- Half should be 4, square is 16

### **Mistake 2: Wrong Sign Addition**
âŒ xÂ² + 6x = -5, add 9: xÂ² + 6x + 9 = 4
- Should be: xÂ² + 6x + 9 = -5 + 9 = 4

### **Mistake 3: Forgetting to Divide by a**
âŒ 2xÂ² + 4x = -2, complete square without dividing
- Must divide by 2 first: xÂ² + 2x = -1

### **Mistake 4: Wrong Square Root**
âŒ (x + 2)Â² = -4, x + 2 = Â±2i
- Complex roots are valid

---

## ðŸŽ¯ Practice Questions

### **Basic Completing Square:**
1. Solve: \`xÂ² + 8x + 12 = 0\`
2. Solve: \`xÂ² - 10x + 21 = 0\`
3. Solve: \`xÂ² + 4x - 5 = 0\`

### **Leading Coefficient â‰  1:**
1. Solve: \`2xÂ² + 12x + 10 = 0\`
2. Solve: \`3xÂ² - 6x - 9 = 0\`
3. Solve: \`5xÂ² + 10x + 4 = 0\`

### **Vertex Form Conversion:**
1. Convert \`xÂ² + 6x + 8 = 0\` to vertex form
2. Find vertex of \`y = 2xÂ² - 8x + 3\`

### **Complex Cases:**
1. Solve: \`xÂ² + (âˆš2)x - 1 = 0\`
2. Solve: \`2xÂ² + 3x + 1 = 0\` (gives complex roots)

### **Word Problems:**
1. **Area Problem:** Rectangle area 20mÂ², length 2m more than width. Find dimensions.
2. **Path Problem:** Path 2m wide around square garden area 100mÂ². Find original side.

**Answers:**
Basic: -2,-6; 3,7; -5,1
Leading: -1,-5; 3,-1; -2,-0.4
Vertex: (x+3)Â²-1; Vertex=(2,-5)
Complex: [-âˆš2Â±âˆš(2+4)]/2; Complex roots
Word: 6Ã—4m; Side=10m

---

## ðŸŽ“ Pro Tips for Completing the Square

1. **Always divide by leading coefficient** when a â‰  1
2. **Take half correctly** - careful with signs
3. **Add to both sides** - don't forget the right side
4. **Combine fractions carefully** when simplifying
5. **Practice vertex form** conversion
6. **Use for quadratic formula derivation** understanding
7. **Apply to maximum/minimum problems**

---

## ðŸ”¢ Completing Square Flowchart

\`\`\`
Start with axÂ² + bx + c = 0
    â†“
Move constant: axÂ² + bx = -c
    â†“
Divide by a: xÂ² + (b/a)x = -c/a
    â†“
Half coefficient: b/(2a)
    â†“
Square half: (b/(2a))Â²
    â†“
Add to both sides
    â†“
Write as square: (x + b/(2a))Â² = ...
    â†“
Take square root
    â†“
Solve for x
\`\`\`

Master completing the square and you'll understand quadratic equations at a deeper level! ðŸ†`
};
