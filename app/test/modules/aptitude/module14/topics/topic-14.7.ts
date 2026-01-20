import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_7: SubLesson = {
  id: "14.7",
  title: 'Relation between Roots & Coefficients',
  status: 'completed',
  content: "`# ðŸ”— Relation between Roots & Coefficients

Discover the fundamental relationships between quadratic equation roots and coefficients! These relationships (sum and product of roots) are powerful tools for solving problems without finding actual roots. Learn to form equations and solve complex problems using these properties.

---

## ðŸŽ¯ What are Root-Coefficient Relations?

For a quadratic equation \`"axÂ² + bx + c = 0\` with roots Î± and Î², there are two fundamental relationships:

### **Sum of Roots**
\`Î± + Î² = -b/a\`

### **Product of Roots**
\`Î± Ã— Î² = c/a\`

### **Why Important?**
- Find equations from roots
- Solve without factorization
- Verify solutions
- Form new equations

---

## ðŸ“ˆ Derivation of Relations

### **Quadratic Equation**
\`axÂ² + bx + c = 0\`

### **Root Form**
\`(x - Î±)(x - Î²) = 0\`
\`xÂ² - (Î± + Î²)x + (Î±Î²) = 0\`

### **Comparing Coefficients**
\`axÂ² + bx + c = xÂ² - (Î± + Î²)x + (Î±Î²)\`

**Therefore:**
- Coefficient of xÂ²: a = 1 â†’ multiply by a: \`axÂ² + b x + c = axÂ² - a(Î± + Î²)x + a(Î±Î²)\`
- Coefficient of x: b = -a(Î± + Î²) â†’ Î± + Î² = -b/a
- Constant term: c = a(Î±Î²) â†’ Î±Î² = c/a

---

## ðŸ”¢ Applying the Relations

### **Example 1: Find Equation from Roots**
**Roots:** 3 and -2

**Sum:** Î± + Î² = 3 + (-2) = 1
**Product:** Î±Î² = 3 Ã— (-2) = -6

**Equation:** xÂ² - (sum)x + (product) = 0
\`xÂ² - x - 6 = 0\`

### **Example 2: Find Roots from Equation**
**Equation:** 2xÂ² - 7x + 3 = 0

**Sum:** Î± + Î² = -(-7)/2 = 7/2
**Product:** Î±Î² = 3/2

**Roots:** Let roots be p, q where p + q = 7/2, pq = 3/2
**Possible:** 3 and 1/2 (since 3 + 0.5 = 3.5 = 7/2, 3Ã—0.5 = 1.5 = 3/2)

---

## ðŸŽ¯ Forming Equations with Given Conditions

### **Problem Type 1: Roots Satisfy Relation**
**Problem:** Find quadratic equation with roots Î±, Î² where Î± + Î² = 5, Î±Î² = 6

**Solution:** xÂ² - (Î± + Î²)x + Î±Î² = 0
\`xÂ² - 5x + 6 = 0\`

### **Problem Type 2: One Root Known**
**Problem:** One root is 2, sum of roots is 8

**Solution:** Let roots be 2 and Î²
2 + Î² = 8 â†’ Î² = 6
Product: 2 Ã— 6 = 12
Equation: xÂ² - 8x + 12 = 0

### **Problem Type 3: Roots in Terms of Variable**
**Problem:** Roots differ by 4, product is 21

**Solution:** Let roots be x, x+4
Sum: x + (x+4) = 2x + 4
Product: x(x+4) = 21
xÂ² + 4x - 21 = 0
(x + 7)(x - 3) = 0
x = -7 or x = 3

**If x = 3:** Roots 3 and 7
**If x = -7:** Roots -7 and -3

**Equations:** xÂ² - 10x + 21 = 0 or xÂ² + 10x + 21 = 0

---

## ðŸ§® Advanced Applications

### **Example 1: Quadratic with Given Roots**
**Problem:** Find equation with roots (3, 4)

**Method 1: Direct**
\`xÂ² - (3+4)x + (3Ã—4) = 0\`
\`xÂ² - 7x + 12 = 0\`

**Method 2: Root form**
\`(x - 3)(x - 4) = 0\`
\`xÂ² - 7x + 12 = 0\`

### **Example 2: Roots of Another Equation**
**Problem:** If Î±, Î² are roots of xÂ² + px + q = 0, find equation with roots Î±Â², Î²Â²

**Solution:** Sum of new roots: Î±Â² + Î²Â² = (Î± + Î²)Â² - 2Î±Î² = pÂ² - 2q
Product of new roots: Î±Â²Î²Â² = (Î±Î²)Â² = qÂ²

**Equation:** xÂ² - (pÂ² - 2q)x + qÂ² = 0

### **Example 3: Reciprocal Roots**
**Problem:** Find equation with roots 1/Î±, 1/Î²

**Solution:** Sum: 1/Î± + 1/Î² = (Î± + Î²)/Î±Î² = p/q
Product: (1/Î±)(1/Î²) = 1/(Î±Î²) = 1/q

**Equation:** xÂ² - (p/q)x + 1/q = 0
Multiply by qÂ²: qÂ²xÂ² - p q x + 1 = 0

---

## ðŸ“Š Special Cases and Patterns

### **Case 1: Roots Equal in Magnitude**
If roots are a and -a, then:
- Sum: a + (-a) = 0
- Product: a Ã— (-a) = -aÂ²
- Equation: xÂ² + 0Â·x + (-aÂ²) = 0 â†’ xÂ² - aÂ² = 0

### **Case 2: One Root Zero**
If one root is 0, other is -c/a
- Sum: 0 + Î² = -b/a â†’ Î² = -c/a
- Product: 0 Ã— Î² = c/a â†’ c = 0 (impossible)
- Conclusion: If c = 0, one root is 0

### **Case 3: Roots Reciprocals**
If roots are r, 1/r:
- Sum: r + 1/r = (rÂ² + 1)/r
- Product: r Ã— (1/r) = 1

### **Case 4: Roots Differ by Constant**
If roots differ by d: roots are x, x+d
- Sum: x + (x+d) = 2x + d
- Product: x(x+d) = xÂ² + d x

---

## ðŸŽ¯ Word Problems Using Relations

### **Example 1: Age Problem**
**Problem:** Ages of A and B differ by 10 years. 10 years ago, A was twice B's age. Find current ages.

**Solution:** Let current ages be x, x+10
10 years ago: x-10, (x+10)-10 = x
A was twice B: x-10 = 2(x) â†’ x-10 = 2x â†’ x = -10 (impossible)

**Alternative:** Let B's age = x, A's age = x+10
10 years ago: B = x-10, A = x
A was twice B: x = 2(x-10) â†’ x = 2x - 20 â†’ x = 20
Ages: B=20, A=30

### **Example 2: Number Problem**
**Problem:** Two numbers sum to 15, product 50. Find numbers.

**Solution:** Let numbers be Î±, Î²
Î± + Î² = 15
Î±Î² = 50

**Equation:** xÂ² - 15x + 50 = 0
Discriminant: 225 - 200 = 25
Roots: [15 Â± 5]/2 = 10 or 5

### **Example 3: Geometry Problem**
**Problem:** Rectangle length exceeds width by 7m, area 78mÂ². Find dimensions.

**Solution:** Let width = x, length = x+7
Area: x(x+7) = 78
xÂ² + 7x - 78 = 0
(x + 13)(x - 6) = 0
x = 6m (width), length = 13m

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Sum Sign**
âŒ Î± + Î² = b/a
- Correct: Î± + Î² = -b/a

### **Mistake 2: Wrong Product Sign**
âŒ Î±Î² = -c/a
- Correct: Î±Î² = c/a

### **Mistake 3: Forgetting Leading Coefficient**
âŒ For 2xÂ² + 5x + 3 = 0, sum = -5/2, product = 3/2 âœ“
âŒ Forgetting to divide by a

### **Mistake 4: Root Order Confusion**
âŒ Assuming larger root first
- Sum and product don't specify which is which

---

## ðŸŽ¯ Practice Questions

### **Form Equations:**
1. Roots 4 and -3, find equation
2. Roots 2Â±âˆš3, find equation
3. One root 5, product 10, find equation

### **Find Roots:**
1. Equation 3xÂ² - 8x + 4 = 0, find sum and product
2. Equation xÂ² + âˆš2 x - 1 = 0, find sum and product
3. Roots of xÂ² - 7x + 10 = 0, verify relations

### **Word Problems:**
1. **Numbers:** Two numbers sum 20, product 96. Find numbers.
2. **Rectangle:** Perimeter 24m, area 32mÂ². Find dimensions.
3. **Investment:** Two investments, sum â‚¹12,000, difference â‚¹2,000. Find amounts.

### **Advanced:**
1. **Roots Î±, Î²:** Find equation with roots Î±Â², Î²Â²
2. **Reciprocal roots:** Find equation with roots 1/Î±, 1/Î²
3. **Equal roots:** Find condition for equal roots using relations

**Answers:**
Equations: xÂ²-x-12=0; xÂ²-4x-2=0; xÂ²-5x+10=0
Sum/Product: 8/3,4/3; -âˆš2,-1; Sum=7, Product=10
Word: 8,12; 8Ã—4m; â‚¹7,000 & â‚¹5,000
Advanced: xÂ²-(Î±Â²+Î²Â²)x+Î±Â²Î²Â²=0; qÂ²xÂ²-pqx+1=0; Sum= -b/a, etc.

---

## ðŸŽ“ Pro Tips for Root Relations

1. **Remember the signs** carefully: sum = -b/a, product = c/a
2. **Use for quick equation formation** without expanding
3. **Apply to parameter problems** in competitive exams
4. **Combine with discriminant** for complete analysis
5. **Use for root transformations** (squares, reciprocals)
6. **Verify solutions** using the relations
7. **Practice forming equations** from given conditions

---

## ðŸ”¢ Root Relations Summary

| Relation | Formula | Use |
|----------|---------|-----|
| Sum of roots | Î± + Î² = -b/a | Find equation from roots |
| Product of roots | Î±Î² = c/a | Complete root information |
| Equal roots | Î± = Î² = -b/(2a) | When D = 0 |
| Reciprocal roots | 1/Î± + 1/Î² = p/q | Special root transformations |
| Square roots | Î±Â² + Î²Â² = (Î±+Î²)Â² - 2Î±Î² | Advanced transformations |

Master root-coefficient relations and solve quadratic problems with elegance! ðŸ†`
};
