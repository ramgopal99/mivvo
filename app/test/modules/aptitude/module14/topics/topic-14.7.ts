import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_7: SubLesson = {
  id: "14.7",
  title: 'Relation between Roots & Coefficients',
  status: 'completed',
  content: `# 🔗 Relation between Roots & Coefficients

Discover the fundamental relationships between quadratic equation roots and coefficients! These relationships (sum and product of roots) are powerful tools for solving problems without finding actual roots. Learn to form equations and solve complex problems using these properties.

---

## 🎯 What are Root-Coefficient Relations?

For a quadratic equation \`ax² + bx + c = 0\` with roots α and β, there are two fundamental relationships:

### **Sum of Roots**
\`α + β = -b/a\`

### **Product of Roots**
\`α × β = c/a\`

### **Why Important?**
- Find equations from roots
- Solve without factorization
- Verify solutions
- Form new equations

---

## 📈 Derivation of Relations

### **Quadratic Equation**
\`ax² + bx + c = 0\`

### **Root Form**
\`(x - α)(x - β) = 0\`
\`x² - (α + β)x + (αβ) = 0\`

### **Comparing Coefficients**
\`ax² + bx + c = x² - (α + β)x + (αβ)\`

**Therefore:**
- Coefficient of x²: a = 1 → multiply by a: \`ax² + b x + c = ax² - a(α + β)x + a(αβ)\`
- Coefficient of x: b = -a(α + β) → α + β = -b/a
- Constant term: c = a(αβ) → αβ = c/a

---

## 🔢 Applying the Relations

### **Example 1: Find Equation from Roots**
**Roots:** 3 and -2

**Sum:** α + β = 3 + (-2) = 1
**Product:** αβ = 3 × (-2) = -6

**Equation:** x² - (sum)x + (product) = 0
\`x² - x - 6 = 0\`

### **Example 2: Find Roots from Equation**
**Equation:** 2x² - 7x + 3 = 0

**Sum:** α + β = -(-7)/2 = 7/2
**Product:** αβ = 3/2

**Roots:** Let roots be p, q where p + q = 7/2, pq = 3/2
**Possible:** 3 and 1/2 (since 3 + 0.5 = 3.5 = 7/2, 3×0.5 = 1.5 = 3/2)

---

## 🎯 Forming Equations with Given Conditions

### **Problem Type 1: Roots Satisfy Relation**
**Problem:** Find quadratic equation with roots α, β where α + β = 5, αβ = 6

**Solution:** x² - (α + β)x + αβ = 0
\`x² - 5x + 6 = 0\`

### **Problem Type 2: One Root Known**
**Problem:** One root is 2, sum of roots is 8

**Solution:** Let roots be 2 and β
2 + β = 8 → β = 6
Product: 2 × 6 = 12
Equation: x² - 8x + 12 = 0

### **Problem Type 3: Roots in Terms of Variable**
**Problem:** Roots differ by 4, product is 21

**Solution:** Let roots be x, x+4
Sum: x + (x+4) = 2x + 4
Product: x(x+4) = 21
x² + 4x - 21 = 0
(x + 7)(x - 3) = 0
x = -7 or x = 3

**If x = 3:** Roots 3 and 7
**If x = -7:** Roots -7 and -3

**Equations:** x² - 10x + 21 = 0 or x² + 10x + 21 = 0

---

## 🧮 Advanced Applications

### **Example 1: Quadratic with Given Roots**
**Problem:** Find equation with roots (3, 4)

**Method 1: Direct**
\`x² - (3+4)x + (3×4) = 0\`
\`x² - 7x + 12 = 0\`

**Method 2: Root form**
\`(x - 3)(x - 4) = 0\`
\`x² - 7x + 12 = 0\`

### **Example 2: Roots of Another Equation**
**Problem:** If α, β are roots of x² + px + q = 0, find equation with roots α², β²

**Solution:** Sum of new roots: α² + β² = (α + β)² - 2αβ = p² - 2q
Product of new roots: α²β² = (αβ)² = q²

**Equation:** x² - (p² - 2q)x + q² = 0

### **Example 3: Reciprocal Roots**
**Problem:** Find equation with roots 1/α, 1/β

**Solution:** Sum: 1/α + 1/β = (α + β)/αβ = p/q
Product: (1/α)(1/β) = 1/(αβ) = 1/q

**Equation:** x² - (p/q)x + 1/q = 0
Multiply by q²: q²x² - p q x + 1 = 0

---

## 📊 Special Cases and Patterns

### **Case 1: Roots Equal in Magnitude**
If roots are a and -a, then:
- Sum: a + (-a) = 0
- Product: a × (-a) = -a²
- Equation: x² + 0·x + (-a²) = 0 → x² - a² = 0

### **Case 2: One Root Zero**
If one root is 0, other is -c/a
- Sum: 0 + β = -b/a → β = -c/a
- Product: 0 × β = c/a → c = 0 (impossible)
- Conclusion: If c = 0, one root is 0

### **Case 3: Roots Reciprocals**
If roots are r, 1/r:
- Sum: r + 1/r = (r² + 1)/r
- Product: r × (1/r) = 1

### **Case 4: Roots Differ by Constant**
If roots differ by d: roots are x, x+d
- Sum: x + (x+d) = 2x + d
- Product: x(x+d) = x² + d x

---

## 🎯 Word Problems Using Relations

### **Example 1: Age Problem**
**Problem:** Ages of A and B differ by 10 years. 10 years ago, A was twice B's age. Find current ages.

**Solution:** Let current ages be x, x+10
10 years ago: x-10, (x+10)-10 = x
A was twice B: x-10 = 2(x) → x-10 = 2x → x = -10 (impossible)

**Alternative:** Let B's age = x, A's age = x+10
10 years ago: B = x-10, A = x
A was twice B: x = 2(x-10) → x = 2x - 20 → x = 20
Ages: B=20, A=30

### **Example 2: Number Problem**
**Problem:** Two numbers sum to 15, product 50. Find numbers.

**Solution:** Let numbers be α, β
α + β = 15
αβ = 50

**Equation:** x² - 15x + 50 = 0
Discriminant: 225 - 200 = 25
Roots: [15 ± 5]/2 = 10 or 5

### **Example 3: Geometry Problem**
**Problem:** Rectangle length exceeds width by 7m, area 78m². Find dimensions.

**Solution:** Let width = x, length = x+7
Area: x(x+7) = 78
x² + 7x - 78 = 0
(x + 13)(x - 6) = 0
x = 6m (width), length = 13m

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Sum Sign**
❌ α + β = b/a
- Correct: α + β = -b/a

### **Mistake 2: Wrong Product Sign**
❌ αβ = -c/a
- Correct: αβ = c/a

### **Mistake 3: Forgetting Leading Coefficient**
❌ For 2x² + 5x + 3 = 0, sum = -5/2, product = 3/2 ✓
❌ Forgetting to divide by a

### **Mistake 4: Root Order Confusion**
❌ Assuming larger root first
- Sum and product don't specify which is which

---

## 🎯 Practice Questions

### **Form Equations:**
1. Roots 4 and -3, find equation
2. Roots 2±√3, find equation
3. One root 5, product 10, find equation

### **Find Roots:**
1. Equation 3x² - 8x + 4 = 0, find sum and product
2. Equation x² + √2 x - 1 = 0, find sum and product
3. Roots of x² - 7x + 10 = 0, verify relations

### **Word Problems:**
1. **Numbers:** Two numbers sum 20, product 96. Find numbers.
2. **Rectangle:** Perimeter 24m, area 32m². Find dimensions.
3. **Investment:** Two investments, sum ₹12,000, difference ₹2,000. Find amounts.

### **Advanced:**
1. **Roots α, β:** Find equation with roots α², β²
2. **Reciprocal roots:** Find equation with roots 1/α, 1/β
3. **Equal roots:** Find condition for equal roots using relations

**Answers:**
Equations: x²-x-12=0; x²-4x-2=0; x²-5x+10=0
Sum/Product: 8/3,4/3; -√2,-1; Sum=7, Product=10
Word: 8,12; 8×4m; ₹7,000 & ₹5,000
Advanced: x²-(α²+β²)x+α²β²=0; q²x²-pqx+1=0; Sum= -b/a, etc.

---

## 🎓 Pro Tips for Root Relations

1. **Remember the signs** carefully: sum = -b/a, product = c/a
2. **Use for quick equation formation** without expanding
3. **Apply to parameter problems** in competitive exams
4. **Combine with discriminant** for complete analysis
5. **Use for root transformations** (squares, reciprocals)
6. **Verify solutions** using the relations
7. **Practice forming equations** from given conditions

---

## 🔢 Root Relations Summary

| Relation | Formula | Use |
|----------|---------|-----|
| Sum of roots | α + β = -b/a | Find equation from roots |
| Product of roots | αβ = c/a | Complete root information |
| Equal roots | α = β = -b/(2a) | When D = 0 |
| Reciprocal roots | 1/α + 1/β = p/q | Special root transformations |
| Square roots | α² + β² = (α+β)² - 2αβ | Advanced transformations |

Master root-coefficient relations and solve quadratic problems with elegance! 🏆`
};