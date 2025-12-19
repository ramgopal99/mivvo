import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_2: SubLesson = {
  id: "14.2",
  title: 'Standard Form (ax² + bx + c = 0)',
  status: 'completed',
  content: `# 📏 Standard Form (ax² + bx + c = 0)

Master the standard form of quadratic equations! This canonical representation is essential for systematic solving and understanding the fundamental properties of quadratic equations. Learn to manipulate equations into standard form and extract key information.

---

## 🎯 What is Standard Form?

The **Standard Form** of a quadratic equation is \`ax² + bx + c = 0\`, where:
- \`a\`: Leading coefficient (real number, a ≠ 0)
- \`b\`: Coefficient of x (real number)
- \`c\`: Constant term (real number)
- The equation equals zero on one side

### **Why Standard Form?**
- **Unified representation** for all quadratic equations
- **Easier solving** with formulas and methods
- **Property extraction** (discriminant, sum/product of roots)
- **Graphical analysis** (vertex, intercepts)

---

## 🔢 Converting to Standard Form

### **Method 1: Bringing All Terms to One Side**
**Example 1:** \`x² + 3x = 7\`
\`x² + 3x - 7 = 0\`

**Example 2:** \`2x² = 5x + 3\`
\`2x² - 5x - 3 = 0\`

**Example 3:** \`x(x + 2) = 15\`
\`x² + 2x - 15 = 0\`

### **Method 2: Expanding Brackets**
**Example 1:** \`(x + 3)(x - 2) = 0\`
\`x² + x - 6 = 0\`

**Example 2:** \`(2x - 1)(x + 4) = 0\`
\`2x² + 7x - 4 = 0\`

### **Method 3: From Word Descriptions**
**Example:** "Square of a number minus twice the number equals 8"
Let number = x
\`x² - 2x = 8\`
\`x² - 2x - 8 = 0\`

---

## 📊 Analyzing Standard Form Components

### **1. Leading Coefficient (a)**
- **Function**: Determines parabola width and direction
- **a > 0**: Parabola opens upward
- **a < 0**: Parabola opens downward
- **|a| > 1**: Narrow parabola
- **|a| < 1**: Wide parabola

### **2. Linear Coefficient (b)**
- **Function**: Affects axis of symmetry
- **Axis of symmetry**: x = -b/(2a)
- **Vertex x-coordinate**: -b/(2a)

### **3. Constant Term (c)**
- **Function**: Determines y-intercept
- **Y-intercept**: (0, c)
- **Vertex y-coordinate**: c - b²/(4a)

---

## 🔄 Converting Between Forms

### **From Standard to Other Forms**

#### **1. To Slope-Intercept Form**
\`ax² + bx + c = 0\`
\`y = ax² + bx + c\`

#### **2. To Vertex Form**
\`y = a(x - h)² + k\`
Where h = -b/(2a), k = c - b²/(4a)

#### **3. To Intercept Form**
\`y = a(x - p)(x - q)\`
Where p, q are roots

### **Examples**

**Example 1:** \`x² - 5x + 6 = 0\`
- Slope-intercept: \`y = x² - 5x + 6\`
- Vertex form: \`y = (x - 5/2)² - 1/4\`
- Intercept form: \`y = (x - 2)(x - 3)\`

**Example 2:** \`2x² + 4x - 6 = 0\`
- Slope-intercept: \`y = 2x² + 4x - 6\`
- Vertex form: \`y = 2(x + 1)² - 8\`
- Intercept form: \`y = 2(x - 1)(x + 3)\`

---

## 🧮 Key Properties and Formulas

### **1. Discriminant (D)**
\`D = b² - 4ac\`

**Determines nature of roots:**
- D > 0: Two distinct real roots
- D = 0: One real root (repeated)
- D < 0: Two complex roots

### **2. Sum of Roots**
\`α + β = -b/a\`

### **3. Product of Roots**
\`α × β = c/a\`

### **4. Quadratic Formula**
\`x = [-b ± √(b² - 4ac)] / (2a)\`

### **5. Vertex Coordinates**
\`h = -b/(2a)\`
\`k = c - b²/(4a)\`

---

## 📈 Graphical Properties

### **Vertex**
\`(h, k) = (-b/(2a), c - b²/(4a))\`

### **Axis of Symmetry**
\`x = -b/(2a)\`

### **Y-intercept**
\`(0, c)\`

### **X-intercepts (Roots)**
Where parabola crosses x-axis
\`(α, 0)\` and \`(β, 0)\`

---

## 🎯 Special Cases

### **1. Perfect Square Trinomial**
\`ax² + bx + c = a(x + b/(2a))² + (c - b²/(4a))\`

**Example:** \`x² + 6x + 9 = (x + 3)²\`

### **2. Difference of Squares**
\`ax² + c = a(x² + c/a)\`

**Example:** \`x² - 4 = (x - 2)(x + 2)\`

### **3. Monic Equations (a = 1)**
\`x² + bx + c = 0\`
Easier to factor

### **4. Pure Quadratic (b = 0)**
\`ax² + c = 0\`
\`x² = -c/a\`
Real solutions only if c/a < 0

---

## 🔧 Solving Using Standard Form

### **Method 1: Factorization**
**Steps:**
1. Write in standard form
2. Factor the trinomial
3. Set factors to zero
4. Solve linear equations

**Example:** \`x² - 5x + 6 = 0\`
\`(x - 2)(x - 3) = 0\`
\`x = 2\` or \`x = 3\`

### **Method 2: Quadratic Formula**
**Example:** \`2x² - 7x + 3 = 0\`
\`x = [7 ± √(49 - 24)]/4\`
\`x = [7 ± √25]/4\`
\`x = [7 ± 5]/4\`
\`x = 3\` or \`x = 0.5\`

### **Method 3: Completing the Square**
**Example:** \`x² + 4x - 5 = 0\`
\`x² + 4x = 5\`
\`(x + 2)² - 4 = 5\`
\`(x + 2)² = 9\`
\`x + 2 = ±3\`
\`x = 1\` or \`x = -5\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Sign Convention**
❌ \`ax² + bx + c = 0\` written as \`ax² + bx = -c\`
- Keep constant term on left side

### **Mistake 2: Zero Leading Coefficient**
❌ \`0x² + bx + c = 0\` called quadratic
- This is linear equation

### **Mistake 3: Incorrect Discriminant**
❌ D = b² + 4ac (wrong sign)
- Always subtract: b² - 4ac

### **Mistake 4: Wrong Root Sum**
❌ Sum of roots = b/a
- Correct: -b/a

---

## 🎯 Practice Questions

### **Convert to Standard Form:**
1. \`x² + 4 = 2x\`
2. \`3x(x - 2) = 10\`
3. \`(x + 1)(x - 3) = 8\`

### **Identify Components:**
1. For \`3x² - 4x + 1 = 0\`, find a, b, c
2. Calculate discriminant for \`x² + 5x + 6 = 0\`

### **Properties:**
1. Find sum and product of roots for \`2x² - 7x + 3 = 0\`
2. Find vertex of \`y = x² - 4x + 3\`

### **Graphical:**
1. Find axis of symmetry for \`2x² + 8x - 1 = 0\`
2. Find y-intercept of \`x² + 2x - 8 = 0\`

### **Special Cases:**
1. Convert \`x² + 6x + 9 = 0\` to perfect square
2. Solve pure quadratic \`2x² - 18 = 0\`

**Answers:**
Convert: \`x² - 2x + 4 = 0\`, \`3x² - 6x - 10 = 0\`, \`x² - 2x - 11 = 0\`
Components: a=3, b=-4, c=1; D=25-24=1
Properties: Sum=7/2, Product=3/2; Vertex=(2,-1)
Graphical: x=-2; y-intercept=(0,-8)
Special: \`(x+3)²=0\`, x=±3

---

## 🎓 Pro Tips for Standard Form

1. **Always convert to standard form** before solving
2. **Check discriminant first** to know solution type
3. **Remember root properties** for verification
4. **Use appropriate solving method** based on equation
5. **Graph mentally** to understand the parabola
6. **Verify solutions** by substitution
7. **Practice coefficient extraction** quickly

---

## 🔢 Standard Form Checklist

- [ ] All terms on left side
- [ ] Right side equals zero
- [ ] Descending powers of x
- [ ] No missing terms (use zero coefficients)
- [ ] Leading coefficient ≠ 0
- [ ] Integer coefficients when possible

Master the standard form and you'll have a solid foundation for all quadratic equation techniques! 🏆`
};