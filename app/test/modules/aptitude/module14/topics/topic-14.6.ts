import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_6: SubLesson = {
  id: "14.6",
  title: 'Nature of Roots (Discriminant)',
  status: 'completed',
  content: "`# ðŸ” Nature of Roots (Discriminant)

Master the discriminant and understand the nature of quadratic equation roots! The discriminant (D = bÂ² - 4ac) is a powerful tool that reveals whether roots are real, complex, equal, or distinct. Learn to analyze quadratic equations without solving them completely.

---

## ðŸŽ¯ What is the Discriminant?

The **Discriminant** is the expression inside the square root in the quadratic formula: \`"D = bÂ² - 4ac\`. It determines the nature and number of roots of a quadratic equation \`axÂ² + bx + c = 0\`.

### **Formula**
\`D = bÂ² - 4ac\`

### **Why Important?**
- Predicts root nature without solving
- Essential for competitive exams
- Helps in graphing parabolas
- Determines maximum/minimum values

### **Historical Context**
- Introduced by ancient mathematicians
- Used in completing the square method
- Fundamental in algebraic analysis

---

## ðŸ“Š Nature of Roots Based on Discriminant

### **Case 1: D > 0 (Positive Discriminant)**
- **Two distinct real roots**
- Roots are real and different
- Parabola crosses x-axis at two points
- Example: \`xÂ² - 5x + 6 = 0\`, D = 25 - 24 = 1 > 0

### **Case 2: D = 0 (Zero Discriminant)**
- **One real root (repeated)**
- Roots are real and equal
- Parabola touches x-axis at one point
- Example: \`xÂ² - 4x + 4 = 0\`, D = 16 - 16 = 0

### **Case 3: D < 0 (Negative Discriminant)**
- **Two complex roots**
- Roots are complex conjugates
- Parabola doesn't cross x-axis
- Example: \`xÂ² + 2x + 3 = 0\`, D = 4 - 12 = -8 < 0

---

## ðŸ”¢ Calculating Discriminant

### **Step 1: Identify Coefficients**
For equation \`axÂ² + bx + c = 0\`
- a = coefficient of xÂ²
- b = coefficient of x
- c = constant term

### **Step 2: Apply Formula**
\`D = bÂ² - 4ac\`

### **Step 3: Interpret Result**
- Compare with zero
- Determine root nature
- Calculate actual roots if needed

---

## ðŸ“ˆ Examples: Different Discriminant Values

### **Example 1: D > 0 (Distinct Real Roots)**
**Equation:** \`xÂ² - 7x + 10 = 0\`

**Discriminant:** D = (-7)Â² - 4Ã—1Ã—10 = 49 - 40 = 9 > 0

**Roots:** \`x = [7 Â± âˆš9]/2 = [7 Â± 3]/2\`
\`x = 10/2 = 5\` or \`x = 4/2 = 2\`

**Nature:** Two distinct real roots

### **Example 2: D = 0 (Equal Real Roots)**
**Equation:** \`4xÂ² - 12x + 9 = 0\`

**Discriminant:** D = (-12)Â² - 4Ã—4Ã—9 = 144 - 144 = 0

**Roots:** \`x = [12 Â± âˆš0]/(2Ã—4) = 12/8 = 1.5\` (repeated)

**Nature:** One real root (multiplicity 2)

### **Example 3: D < 0 (Complex Roots)**
**Equation:** \`xÂ² + 4x + 5 = 0\`

**Discriminant:** D = 4Â² - 4Ã—1Ã—5 = 16 - 20 = -4 < 0

**Roots:** \`x = [-4 Â± âˆš(-4)]/2 = [-4 Â± 2i]/2\`
\`x = -2 + i\` or \`x = -2 - i\`

**Nature:** Two complex roots (conjugates)

---

## ðŸ§® Advanced Discriminant Analysis

### **Fractional Coefficients**
**Equation:** \`xÂ² + (1/2)x - 1/2 = 0\`

**Discriminant:** D = (1/2)Â² - 4Ã—1Ã—(-1/2) = 1/4 + 2 = 9/4 > 0

**Roots:** Real and distinct

### **Large Coefficients**
**Equation:** \`6xÂ² + 11x - 35 = 0\`

**Discriminant:** D = 121 - 4Ã—6Ã—(-35) = 121 + 840 = 961 > 0

**Roots:** Real and distinct

### **Perfect Squares**
**Equation:** \`xÂ² - 10x + 25 = 0\`

**Discriminant:** D = 100 - 100 = 0

**Roots:** Equal real roots (x - 5)Â² = 0, x = 5 (repeated)

---

## ðŸŽ¯ Conditions for Real Roots

### **General Condition**
For real roots: \`D â‰¥ 0\`

### **Distinct Real Roots**
\`D > 0\` and discriminant is perfect square

### **Equal Real Roots**
\`D = 0\`

### **No Real Roots**
\`D < 0\`

---

## ðŸ“Š Discriminant and Graph Relationship

### **Parabola y = axÂ² + bx + c**

#### **Vertex and Discriminant**
- Vertex: \`(-b/(2a), -D/(4a))\`
- Y-coordinate of vertex: \`-D/(4a)\`

#### **X-intercepts (Roots)**
- When D > 0: Two x-intercepts
- When D = 0: One x-intercept (vertex)
- When D < 0: No x-intercepts

#### **Axis of Symmetry**
\`x = -b/(2a)\` (independent of c)

---

## ðŸ”„ Discriminant in Different Forms

### **Vertex Form: y = a(x - h)Â² + k**
- Discriminant relates to vertex height
- D = -4a Ã— (y-coordinate of vertex)
- If k > 0, D < 0 (complex roots)
- If k = 0, D = 0 (equal real roots)
- If k < 0, D > 0 (distinct real roots)

### **Intercept Form: x/a + y/b = 1**
- Related to intercept lengths
- Discriminant: D = (a + b)Â² - 4ab = aÂ² - 2ab + bÂ² = (a - b)Â²

---

## ðŸŽ¯ Applications in Problem Solving

### **Example 1: Range of Parameters**
**Find k such that equation xÂ² + kx + 1 = 0 has real roots**

**Condition:** D â‰¥ 0
\`kÂ² - 4 â‰¥ 0\`
\`kÂ² â‰¥ 4\`
\`k â‰¤ -2\` or \`k â‰¥ 2\`

### **Example 2: Nature of Roots**
**For 2xÂ² + kx + 3 = 0, find k so that roots are equal**

**Condition:** D = 0
\`kÂ² - 4Ã—2Ã—3 = 0\`
\`kÂ² = 24\`
\`k = Â±2âˆš6\`

### **Example 3: Complex Roots**
**Find range of k where xÂ² + kx + k = 0 has complex roots**

**Condition:** D < 0
\`kÂ² - 4k < 0\`
\`k(k - 4) < 0\`
\`0 < k < 4\`

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Sign in Formula**
âŒ D = bÂ² + 4ac
- Correct: D = bÂ² - 4ac

### **Mistake 2: Coefficient Confusion**
âŒ For 3xÂ² + 2x + 1 = 0, D = 4 - 12 = -8
- Correct: D = 4 - 4Ã—3Ã—1 = 4 - 12 = -8

### **Mistake 3: Nature Misinterpretation**
âŒ D < 0 means no roots
- Correct: Complex roots exist, just not real

### **Mistake 4: Square Root Application**
âŒ D = 4, so roots are Â±âˆš4 = Â±2
- D is inside square root: âˆšD = âˆš4 = 2

---

## ðŸŽ¯ Practice Questions

### **Calculate Discriminant:**
1. Find D for \`xÂ² + 5x + 6 = 0\`
2. Find D for \`2xÂ² - 3x + 1 = 0\`
3. Find D for \`xÂ² + 4x + 4 = 0\`

### **Determine Nature:**
1. Nature of roots: \`3xÂ² + 2x - 1 = 0\`
2. Nature of roots: \`xÂ² - 2x + 2 = 0\`
3. Nature of roots: \`4xÂ² - 4x + 1 = 0\`

### **Parameter Problems:**
1. Find k so \`xÂ² + kx + 9 = 0\` has equal roots
2. Find range of k for real roots: \`xÂ² + 2kx + 8 = 0\`
3. Find k for complex roots: \`kxÂ² + 3x + 2 = 0\`

### **Graphical Connection:**
1. For \`y = xÂ² - 4x + 3\`, find vertex and nature of roots
2. For \`y = 2xÂ² + 3x + 5\`, determine x-intercepts

### **Advanced:**
1. If roots are 2 and 3, find D for the equation
2. If one root is square of other, find relationship

**Answers:**
Discriminant: 1; 1; 0
Nature: Distinct real; Complex; Equal real
Parameter: k=Â±6; kâ‰¤-4 or kâ‰¥4; k<2/9 or k>8
Graphical: Vertex=(2,-1), distinct real; No real roots
Advanced: (2-3)Â²-4Ã—1Ã—(2Ã—3)=1-24=-23; D = bÂ²-4ac relates to roots

---

## ðŸŽ“ Pro Tips for Discriminant

1. **Calculate D first** before solving - saves time
2. **Remember the three cases** clearly
3. **Use D â‰¥ 0 for real roots** in parameter problems
4. **Connect with graphs** - vertex height relates to D
5. **Practice range problems** - common in competitive exams
6. **Check perfect squares** for exact roots
7. **Understand complex roots** - they always come in pairs

---

## ðŸ”¢ Discriminant Summary Table

| D Value | Nature of Roots | Graph Behavior | Examples |
|---------|----------------|----------------|----------|
| D > 0 | Two distinct real | Crosses x-axis twice | xÂ²-5x+6=0 |
| D = 0 | One real (repeated) | Touches x-axis once | xÂ²-4x+4=0 |
| D < 0 | Two complex | Above/below x-axis | xÂ²+2x+3=0 |

| Condition | Mathematical Form | Real Roots |
|-----------|-------------------|------------|
| At least one real root | D â‰¥ 0 | Yes |
| Two distinct real roots | D > 0 | Yes |
| One real root | D = 0 | Yes |
| No real roots | D < 0 | No |

Master the discriminant and you'll quickly analyze any quadratic equation! ðŸ†`
};
