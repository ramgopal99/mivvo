import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_6: SubLesson = {
  id: "14.6",
  title: 'Nature of Roots (Discriminant)',
  status: 'completed',
  content: `# 🔍 Nature of Roots (Discriminant)

Master the discriminant and understand the nature of quadratic equation roots! The discriminant (D = b² - 4ac) is a powerful tool that reveals whether roots are real, complex, equal, or distinct. Learn to analyze quadratic equations without solving them completely.

---

## 🎯 What is the Discriminant?

The **Discriminant** is the expression inside the square root in the quadratic formula: \`D = b² - 4ac\`. It determines the nature and number of roots of a quadratic equation \`ax² + bx + c = 0\`.

### **Formula**
\`D = b² - 4ac\`

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

## 📊 Nature of Roots Based on Discriminant

### **Case 1: D > 0 (Positive Discriminant)**
- **Two distinct real roots**
- Roots are real and different
- Parabola crosses x-axis at two points
- Example: \`x² - 5x + 6 = 0\`, D = 25 - 24 = 1 > 0

### **Case 2: D = 0 (Zero Discriminant)**
- **One real root (repeated)**
- Roots are real and equal
- Parabola touches x-axis at one point
- Example: \`x² - 4x + 4 = 0\`, D = 16 - 16 = 0

### **Case 3: D < 0 (Negative Discriminant)**
- **Two complex roots**
- Roots are complex conjugates
- Parabola doesn't cross x-axis
- Example: \`x² + 2x + 3 = 0\`, D = 4 - 12 = -8 < 0

---

## 🔢 Calculating Discriminant

### **Step 1: Identify Coefficients**
For equation \`ax² + bx + c = 0\`
- a = coefficient of x²
- b = coefficient of x
- c = constant term

### **Step 2: Apply Formula**
\`D = b² - 4ac\`

### **Step 3: Interpret Result**
- Compare with zero
- Determine root nature
- Calculate actual roots if needed

---

## 📈 Examples: Different Discriminant Values

### **Example 1: D > 0 (Distinct Real Roots)**
**Equation:** \`x² - 7x + 10 = 0\`

**Discriminant:** D = (-7)² - 4×1×10 = 49 - 40 = 9 > 0

**Roots:** \`x = [7 ± √9]/2 = [7 ± 3]/2\`
\`x = 10/2 = 5\` or \`x = 4/2 = 2\`

**Nature:** Two distinct real roots

### **Example 2: D = 0 (Equal Real Roots)**
**Equation:** \`4x² - 12x + 9 = 0\`

**Discriminant:** D = (-12)² - 4×4×9 = 144 - 144 = 0

**Roots:** \`x = [12 ± √0]/(2×4) = 12/8 = 1.5\` (repeated)

**Nature:** One real root (multiplicity 2)

### **Example 3: D < 0 (Complex Roots)**
**Equation:** \`x² + 4x + 5 = 0\`

**Discriminant:** D = 4² - 4×1×5 = 16 - 20 = -4 < 0

**Roots:** \`x = [-4 ± √(-4)]/2 = [-4 ± 2i]/2\`
\`x = -2 + i\` or \`x = -2 - i\`

**Nature:** Two complex roots (conjugates)

---

## 🧮 Advanced Discriminant Analysis

### **Fractional Coefficients**
**Equation:** \`x² + (1/2)x - 1/2 = 0\`

**Discriminant:** D = (1/2)² - 4×1×(-1/2) = 1/4 + 2 = 9/4 > 0

**Roots:** Real and distinct

### **Large Coefficients**
**Equation:** \`6x² + 11x - 35 = 0\`

**Discriminant:** D = 121 - 4×6×(-35) = 121 + 840 = 961 > 0

**Roots:** Real and distinct

### **Perfect Squares**
**Equation:** \`x² - 10x + 25 = 0\`

**Discriminant:** D = 100 - 100 = 0

**Roots:** Equal real roots (x - 5)² = 0, x = 5 (repeated)

---

## 🎯 Conditions for Real Roots

### **General Condition**
For real roots: \`D ≥ 0\`

### **Distinct Real Roots**
\`D > 0\` and discriminant is perfect square

### **Equal Real Roots**
\`D = 0\`

### **No Real Roots**
\`D < 0\`

---

## 📊 Discriminant and Graph Relationship

### **Parabola y = ax² + bx + c**

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

## 🔄 Discriminant in Different Forms

### **Vertex Form: y = a(x - h)² + k**
- Discriminant relates to vertex height
- D = -4a × (y-coordinate of vertex)
- If k > 0, D < 0 (complex roots)
- If k = 0, D = 0 (equal real roots)
- If k < 0, D > 0 (distinct real roots)

### **Intercept Form: x/a + y/b = 1**
- Related to intercept lengths
- Discriminant: D = (a + b)² - 4ab = a² - 2ab + b² = (a - b)²

---

## 🎯 Applications in Problem Solving

### **Example 1: Range of Parameters**
**Find k such that equation x² + kx + 1 = 0 has real roots**

**Condition:** D ≥ 0
\`k² - 4 ≥ 0\`
\`k² ≥ 4\`
\`k ≤ -2\` or \`k ≥ 2\`

### **Example 2: Nature of Roots**
**For 2x² + kx + 3 = 0, find k so that roots are equal**

**Condition:** D = 0
\`k² - 4×2×3 = 0\`
\`k² = 24\`
\`k = ±2√6\`

### **Example 3: Complex Roots**
**Find range of k where x² + kx + k = 0 has complex roots**

**Condition:** D < 0
\`k² - 4k < 0\`
\`k(k - 4) < 0\`
\`0 < k < 4\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Sign in Formula**
❌ D = b² + 4ac
- Correct: D = b² - 4ac

### **Mistake 2: Coefficient Confusion**
❌ For 3x² + 2x + 1 = 0, D = 4 - 12 = -8
- Correct: D = 4 - 4×3×1 = 4 - 12 = -8

### **Mistake 3: Nature Misinterpretation**
❌ D < 0 means no roots
- Correct: Complex roots exist, just not real

### **Mistake 4: Square Root Application**
❌ D = 4, so roots are ±√4 = ±2
- D is inside square root: √D = √4 = 2

---

## 🎯 Practice Questions

### **Calculate Discriminant:**
1. Find D for \`x² + 5x + 6 = 0\`
2. Find D for \`2x² - 3x + 1 = 0\`
3. Find D for \`x² + 4x + 4 = 0\`

### **Determine Nature:**
1. Nature of roots: \`3x² + 2x - 1 = 0\`
2. Nature of roots: \`x² - 2x + 2 = 0\`
3. Nature of roots: \`4x² - 4x + 1 = 0\`

### **Parameter Problems:**
1. Find k so \`x² + kx + 9 = 0\` has equal roots
2. Find range of k for real roots: \`x² + 2kx + 8 = 0\`
3. Find k for complex roots: \`kx² + 3x + 2 = 0\`

### **Graphical Connection:**
1. For \`y = x² - 4x + 3\`, find vertex and nature of roots
2. For \`y = 2x² + 3x + 5\`, determine x-intercepts

### **Advanced:**
1. If roots are 2 and 3, find D for the equation
2. If one root is square of other, find relationship

**Answers:**
Discriminant: 1; 1; 0
Nature: Distinct real; Complex; Equal real
Parameter: k=±6; k≤-4 or k≥4; k<2/9 or k>8
Graphical: Vertex=(2,-1), distinct real; No real roots
Advanced: (2-3)²-4×1×(2×3)=1-24=-23; D = b²-4ac relates to roots

---

## 🎓 Pro Tips for Discriminant

1. **Calculate D first** before solving - saves time
2. **Remember the three cases** clearly
3. **Use D ≥ 0 for real roots** in parameter problems
4. **Connect with graphs** - vertex height relates to D
5. **Practice range problems** - common in competitive exams
6. **Check perfect squares** for exact roots
7. **Understand complex roots** - they always come in pairs

---

## 🔢 Discriminant Summary Table

| D Value | Nature of Roots | Graph Behavior | Examples |
|---------|----------------|----------------|----------|
| D > 0 | Two distinct real | Crosses x-axis twice | x²-5x+6=0 |
| D = 0 | One real (repeated) | Touches x-axis once | x²-4x+4=0 |
| D < 0 | Two complex | Above/below x-axis | x²+2x+3=0 |

| Condition | Mathematical Form | Real Roots |
|-----------|-------------------|------------|
| At least one real root | D ≥ 0 | Yes |
| Two distinct real roots | D > 0 | Yes |
| One real root | D = 0 | Yes |
| No real roots | D < 0 | No |

Master the discriminant and you'll quickly analyze any quadratic equation! 🏆`
};