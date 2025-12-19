import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_1: SubLesson = {
  id: "14.1",
  title: 'Concept of Quadratic Equation',
  status: 'completed',
  content: `# 📐 Concept of Quadratic Equation

Welcome to the fascinating world of Quadratic Equations! These equations form the backbone of algebra and appear frequently in competitive exams. Understanding quadratic equations will help you solve complex real-world problems involving parabolic curves and optimization.

---

## 🎯 What is a Quadratic Equation?

A **Quadratic Equation** is a polynomial equation of degree 2, where the highest power of the variable is 2. It can be written in the general form \`ax² + bx + c = 0\`, where \`a\`, \`b\`, and \`c\` are real numbers and \`a ≠ 0\`.

### **Key Characteristics**
- **Degree**: 2 (highest power of variable)
- **Graph**: Parabola (U-shaped curve)
- **Solutions**: Can have 0, 1, or 2 real solutions
- **Roots**: Values of x that satisfy the equation

### **General Form**
\`ax² + bx + c = 0\`

**Where:**
- \`a\`: coefficient of x² (a ≠ 0)
- \`b\`: coefficient of x
- \`c\`: constant term

---

## 🔢 Historical Context

### **Etymology**
- **Quadratic** comes from Latin "quadratus" meaning "square"
- Refers to the squared term (x²)
- Ancient civilizations used quadratic equations for practical problems

### **Timeline of Development**
- **Ancient Babylonians** (2000 BC): Solved quadratic equations
- **Ancient Greeks**: Geometric solutions
- **Islamic mathematicians**: Algebraic methods
- **16th century**: General solution formulas
- **Modern era**: Complex number solutions

---

## 📊 Types of Quadratic Equations

### **1. Monic Quadratic Equations**
Leading coefficient a = 1
\`\`\`
x² + bx + c = 0
Example: x² + 5x + 6 = 0
\`\`\`

### **2. Non-Monic Quadratic Equations**
Leading coefficient a ≠ 1
\`\`\`
ax² + bx + c = 0
Example: 2x² + 3x + 1 = 0
\`\`\`

### **3. Pure Quadratic Equations**
No linear term (b = 0)
\`\`\`
ax² + c = 0
Example: x² - 9 = 0
\`\`\`

### **4. Incomplete Quadratic Equations**
Missing either linear term or constant term
\`\`\`
ax² + bx = 0  (missing constant)
ax² + c = 0   (missing linear term)
\`\`\`

---

## 🧮 Components of Quadratic Equations

### **1. Variable**
- Usually represented by x
- Can be any symbol (y, z, t, etc.)
- Represents unknown quantity

### **2. Coefficients**
- **a**: Leading coefficient
  - Cannot be zero
  - Determines parabola width and direction
- **b**: Linear coefficient
  - Can be zero
  - Affects axis of symmetry
- **c**: Constant term
  - Can be zero
  - Determines y-intercept

### **3. Roots/Solutions**
- Values that satisfy the equation
- Where the parabola crosses x-axis
- Can be real or complex

---

## 📈 Graphical Representation

### **Parabolic Curve**
- **Vertex**: Turning point of parabola
- **Axis of symmetry**: Vertical line through vertex
- **Direction**: Opens upward if a > 0, downward if a < 0
- **Width**: Narrower when |a| is larger

### **Roots and X-intercepts**
- Points where parabola crosses x-axis
- Number of real roots: 0, 1, or 2
- Determined by discriminant (D = b² - 4ac)

### **Examples of Graphs**

#### **Case 1: Two distinct real roots (D > 0)**
\`y = x² - 5x + 6\`
- Roots: (2, 0) and (3, 0)
- Parabola crosses x-axis twice

#### **Case 2: One real root (D = 0)**
\`y = x² - 4x + 4\`
- Root: (2, 0)
- Parabola touches x-axis at one point

#### **Case 3: No real roots (D < 0)**
\`y = x² + 2x + 3\`
- No real roots
- Parabola entirely above x-axis

---

## 🔄 Converting to Standard Form

### **Method 1: Bringing to One Side**
**Example:** \`x² + 3x = 10\`
\`x² + 3x - 10 = 0\`

### **Method 2: Expanding Brackets**
**Example:** \`(x + 2)(x + 3) = 0\`
\`x² + 5x + 6 = 0\`

### **Method 3: Completing the Square**
**Example:** \`x² + 6x + 8 = 0\`
\`(x + 3)² - 1 = 0\`
\`(x + 3)² = 1\`

---

## 🎯 Real-Life Applications

### **1. Projectile Motion**
Height of projectile: \`h = -16t² + vt + h₀\`
- Quadratic in time variable
- Maximum height at vertex

### **2. Area Problems**
Rectangle with fixed perimeter: \`A = x(L - x)\`
- Quadratic relationship
- Maximum area optimization

### **3. Revenue Optimization**
Revenue = Price × Quantity: \`R = (p₀ - kx)x\`
- Quadratic in quantity
- Maximum revenue at optimum price

### **4. Physics Problems**
- Distance-time relationships
- Acceleration problems
- Harmonic motion equations

### **5. Engineering Applications**
- Bridge design (cable curves)
- Satellite dish shapes
- Structural engineering calculations

---

## 🔧 Important Properties

### **1. Sum of Roots**
For equation \`ax² + bx + c = 0\`:
Sum of roots = \`-b/a\`

### **2. Product of Roots**
For equation \`ax² + bx + c = 0\`:
Product of roots = \`c/a\`

### **3. Nature of Roots**
Determined by discriminant: \`D = b² - 4ac\`
- D > 0: Two distinct real roots
- D = 0: One real root (repeated)
- D < 0: Two complex roots

### **4. Quadratic Formula**
\`x = [-b ± √(b² - 4ac)] / 2a\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Standard Form**
❌ \`x² = 5x + 6\` (not in standard form)
✅ \`x² - 5x - 6 = 0\` (correct)

### **Mistake 2: Zero Leading Coefficient**
❌ \`0x² + 3x + 2 = 0\` (not quadratic)
- Linear equation if a = 0

### **Mistake 3: Confusing Roots with Solutions**
❌ "Roots are where equation equals root"
✅ "Roots are values that satisfy the equation"

### **Mistake 4: Wrong Graph Interpretation**
❌ "Parabola always crosses x-axis twice"
- Depends on discriminant value

---

## 🎯 Practice Questions

### **Identify Quadratic Equations:**
1. Which of these is quadratic?
   - A) \`x + 5 = 0\`
   - B) \`x² + 3x + 2 = 0\`
   - C) \`x³ + x + 1 = 0\`
   - D) \`1/x + 2 = 0\`

2. Convert \`x² = 7x - 12\` to standard form.

### **Component Identification:**
1. For \`2x² - 5x + 3 = 0\`, identify a, b, c.
2. What type of quadratic is \`x² + 4 = 0\`?

### **Graphical Understanding:**
1. Sketch basic parabola for \`y = x²\`.
2. How many real roots for \`x² + 1 = 0\`?

### **Word Problems:**
1. **Area Problem:** A rectangular garden has area 100 m². Express width in terms of length.
2. **Physics Problem:** Ball thrown upward reaches height h = -5t² + 20t. Find maximum height.

**Answers:**
Identify: B) \`x² + 3x + 2 = 0\`
Convert: \`x² - 7x + 12 = 0\`
Components: a=2, b=-5, c=3
Type: Pure quadratic
Graphs: Opens upward, vertex at origin; No real roots
Word: Width = 100/Length; Maximum at t=2, h=20m

---

## 🎓 Pro Tips for Quadratic Equations

1. **Always write in standard form** before solving
2. **Check leading coefficient** - must be non-zero
3. **Understand graphical meaning** - helps visualize solutions
4. **Remember root properties** - sum and product relationships
5. **Practice different solving methods** - each has advantages
6. **Check discriminant** to know nature of roots
7. **Verify solutions** by substitution

---

## 🔢 Quick Reference

| Property | Formula | Meaning |
|----------|---------|---------|
| Sum of roots | \`-b/a\` | α + β |
| Product of roots | \`c/a\` | α × β |
| Discriminant | \`b² - 4ac\` | Nature of roots |
| Quadratic formula | \`[-b ± √D]/2a\` | Root values |
| Vertex | \`(-b/2a, -D/4a)\` | Turning point |

| D Value | Root Nature | Graph |
|---------|-------------|-------|
| D > 0 | Two distinct real | Crosses x-axis twice |
| D = 0 | One real root | Touches x-axis once |
| D < 0 | Complex roots | Above/below x-axis |

Master the concept of quadratic equations and you'll unlock powerful problem-solving tools! 🏆`
};