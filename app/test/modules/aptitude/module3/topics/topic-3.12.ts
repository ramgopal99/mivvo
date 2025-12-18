import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_12: SubLesson = {
  id: "3.12",
  title: 'Use of Identities (basic)',
  status: 'completed',
  content: `# 🔢 Use of Identities (Basic)

Identities are mathematical equations that hold true for all values of the variables involved. Understanding and applying basic identities is crucial for simplification problems in aptitude exams. These identities help us transform complex expressions into simpler forms.

---

## 🎯 What are Identities?

**Identities** are equations that are true for all values of the variables. Unlike equations that have specific solutions, identities work universally.

**Examples:**
- (a + b)² = a² + 2ab + b² (always true)
- (a - b)² = a² - 2ab + b² (always true)
- a² - b² = (a - b)(a + b) (always true)

---

## 📊 Basic Algebraic Identities

### **1. Square of Sum**
(a + b)² = a² + 2ab + b²

**Examples:**
- (x + 2)² = x² + 2×x×2 + 2² = x² + 4x + 4
- (3 + y)² = 3² + 2×3×y + y² = 9 + 6y + y²

### **2. Square of Difference**
(a - b)² = a² - 2ab + b²

**Examples:**
- (x - 3)² = x² - 2×x×3 + 3² = x² - 6x + 9
- (5 - y)² = 5² - 2×5×y + y² = 25 - 10y + y²

### **3. Difference of Squares**
a² - b² = (a - b)(a + b)

**Examples:**
- x² - 4 = (x - 2)(x + 2)
- 9y² - 16 = (3y - 4)(3y + 4)

### **4. Sum of Cubes**
a³ + b³ = (a + b)(a² - ab + b²)

**Examples:**
- x³ + 8 = (x + 2)(x² - 2x + 4)
- 27 + y³ = (3 + y)(9 - 3y + y²)

### **5. Difference of Cubes**
a³ - b³ = (a - b)(a² + ab + b²)

**Examples:**
- x³ - 1 = (x - 1)(x² + x + 1)
- 8y³ - 27 = (2y - 3)(4y² + 6y + 9)

---

## 🧮 Application in Simplification

### **Expanding Expressions**
Use identities to expand brackets quickly.

**Examples:**
- (x + 3)² = x² + 6x + 9
- (2y - 1)² = 4y² - 4y + 1
- x² - 9 = (x - 3)(x + 3)

### **Simplifying Expressions**
Recognize patterns and apply identities.

**Examples:**
- x² + 6x + 9 = (x + 3)²
- 4y² - 4y + 1 = (2y - 1)²
- 9 - 6x + x² = (3 - x)²

### **Evaluating Expressions**
Substitute values efficiently.

**Examples:**
- Find 47²: (50 - 3)² = 50² - 2×50×3 + 3² = 2500 - 300 + 9 = 2209
- Find 98²: (100 - 2)² = 100² - 2×100×2 + 2² = 10000 - 400 + 4 = 9604

---

## 🎯 Special Cases and Patterns

### **Numbers Ending with 5**
For numbers like 15, 25, 35, etc.:
n5² = n(n+1) hundred + 25

**Examples:**
- 15² = 1×2 × 100 + 25 = 225
- 25² = 2×3 × 100 + 25 = 625
- 85² = 8×9 × 100 + 25 = 7225

### **Numbers Close to Powers of 10**
- 98² = (100 - 2)² = 100² - 2×100×2 + 2² = 10000 - 400 + 4 = 9604
- 103² = (100 + 3)² = 100² + 2×100×3 + 3² = 10000 + 600 + 9 = 10609

### **Difference of Squares Pattern**
- 61² - 39² = (61 - 39)(61 + 39) = 22 × 100 = 2200
- 75² - 25² = (75 - 25)(75 + 25) = 50 × 100 = 5000

---

## 🧠 Advanced Identity Applications

### **Multiple Variables**
Apply identities to expressions with multiple variables.

**Examples:**
- x² + y² + 2xy = (x + y)²
- x² + y² - 2xy = (x - y)²
- x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx)

### **Fractional Expressions**
Use identities in fractions.

**Examples:**
- \\frac{x² - 4}{x - 2} = \\frac{(x-2)(x+2)}{x-2} = x + 2 (for x ≠ 2)
- \\frac{x³ - 1}{x - 1} = \\frac{(x-1)(x² + x + 1)}{x-1} = x² + x + 1 (for x ≠ 1)

---

## 🎯 Identity-Based Problem Solving

### **Example 1: Simplification**
Simplify: (2x + 3)² - (2x + 1)²

**Solution:**
= [4x² + 12x + 9] - [4x² + 4x + 1]
= 4x² + 12x + 9 - 4x² - 4x - 1
= (12x - 4x) + (9 - 1) = 8x + 8

### **Example 2: Evaluation**
Find 49² - 51²

**Solution:**
= (49 - 51)(49 + 51) = (-2)(100) = -200

### **Example 3: Factorization**
Factor: x² - 10x + 25

**Solution:**
= (x - 5)²

### **Example 4: Expansion**
Expand: (a + b)³

**Solution:**
= (a + b)(a + b)² = (a + b)(a² + 2ab + b²) = a³ + 3a²b + 3ab² + b³

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong Sign in Difference of Squares**
\`\`\`
Wrong: a² + b² = (a + b)(a - b)
Right: a² - b² = (a - b)(a + b)
\`\`\`

### ❌ **Incorrect Expansion**
\`\`\`
Wrong: (a + b)² = a² + b²
Right: (a + b)² = a² + 2ab + b²
\`\`\`

### ❌ **Missing Middle Term**
\`\`\`
Wrong: (a - b)² = a² - b²
Right: (a - b)² = a² - 2ab + b²
\`\`\`

### ❌ **Wrong Cube Identity**
\`\`\`
Wrong: a³ + b³ = (a + b)(a² - ab - b²)
Right: a³ + b³ = (a + b)(a² - ab + b²)
\`\`\`

---

## 🎯 Practice Problems

### **Expansion:**
1. (x + 2)² = ?
2. (y - 3)² = ?
3. (a + b)(a - b) = ?
4. (x + 1)³ = ?

### **Factorization:**
1. x² + 6x + 9 = ?
2. y² - 8y + 16 = ?
3. 4a² - 9 = ?
4. x³ + 27 = ?

### **Evaluation:**
1. 47² = ?
2. 98² = ?
3. 49² - 51² = ?
4. 15² = ?

### **Simplification:**
1. (2x + 1)² - (2x - 1)² = ?
2. (a + b)² + (a - b)² = ?
3. (x + y)³ - (x - y)³ = ?
4. \\frac{x² - 4}{x - 2} = ?

### **Word Problems:**
1. Area of square is (x + 2)². Expand to find expression.
2. Difference between squares of 51 and 49.
3. Simplify (√3 + 1)² - (√3 - 1)²

**Answers:**
Expansion: x²+4x+4, y²-6y+9, a²-b², x³+3x²+3x+1
Factorization: (x+3)², (y-4)², (2a-3)(2a+3), (x+3)(x²-3x+9)
Evaluation: 2209, 9604, -200, 225
Simplification: 8x, 2(a²+b²), 6y(x²+y²), x+2
Word: x²+4x+4, 51²-49²=(51-49)(51+49)=2×100=200, (√3+1)²-(√3-1)²=[(√3+1)-(√3-1)]×[(√3+1)+(√3-1)]=2×(2√3)=4√3

---

## 🎓 Pro Tips for Exams

1. **Memorize the basic identities** - they're used repeatedly
2. **Recognize patterns** in expressions to apply identities
3. **Use identities for quick calculations** of squares and cubes
4. **Apply identities** before expanding or factoring
5. **Check your work** by expanding factored expressions
6. **Practice mental application** for time-saving
7. **Combine identities** for complex expressions

Master identities to simplify complex expressions and solve problems efficiently! 🏆`
};

