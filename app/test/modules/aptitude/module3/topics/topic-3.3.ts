import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: "3.3",
  title: 'Brackets ((), {}, [])',
  status: 'completed',
  content: `# 🔢 Understanding Brackets

Brackets are essential tools in mathematics for grouping operations and clarifying the order of calculations. Different types of brackets have different priorities, and understanding their usage is crucial for accurate simplification.

---

## 🎯 Types of Brackets and Their Priorities

### 1. **Parentheses ()** - Highest Priority
- **Also called**: Round brackets or curved brackets
- **Priority**: First to solve
- **Usage**: Group expressions, function arguments
- **Examples**: (2 + 3), (a + b) × c

### 2. **Square Brackets []** - Medium Priority
- **Also called**: Box brackets
- **Priority**: Second to solve
- **Usage**: Group larger expressions, matrices
- **Examples**: [2 + 3 × 4], [a + b] × [c + d]

### 3. **Curly Brackets {}** - Lowest Priority
- **Also called**: Brace brackets
- **Priority**: Last to solve
- **Usage**: Group multiple expressions, sets
- **Examples**: {2 + 3} × 4, {a, b, c}

---

## 📊 Priority Order in Simplification

**Always solve brackets in this order:**
1. **Parentheses first**: ()
2. **Square brackets second**: []
3. **Curly brackets last**: {}

### Example:
**Simplify: 2 × {3 + [4 × (5 - 2)]}**

**Step 1:** Solve parentheses: (5 - 2) = 3  
**Step 2:** Solve square brackets: [4 × 3] = 12  
**Step 3:** Solve curly brackets: {3 + 12} = 15  
**Step 4:** Final multiplication: 2 × 15 = 30

---

## 🎯 Common Bracket Operations

### **Removing Brackets with Positive Signs**
When there's a **+** before brackets, remove brackets without changing signs:

**Examples:**
- 2 + (3 + 4) = 2 + 3 + 4 = 9
- 5 × (2 + 3) = 5 × 2 + 5 × 3 = 10 + 15 = 25
- a + (b + c) = a + b + c

### **Removing Brackets with Negative Signs**
When there's a **-** before brackets, change all signs inside:

**Examples:**
- 2 - (3 + 4) = 2 - 3 - 4 = 2 - 7 = -5
- 5 - (2 + 3) = 5 - 2 - 3 = 0
- a - (b + c) = a - b - c

### **Removing Double Brackets**
Solve inner brackets first, then outer ones:

**Examples:**
- ((2 + 3) × 4) = (5 × 4) = 20
- 2 × ((3 + 4) - 1) = 2 × (7 - 1) = 2 × 6 = 12

---

## 🧮 Expanding Expressions with Brackets

### **Single Bracket Expansion**
**Examples:**
- 2(a + b) = 2a + 2b
- 3(2x + 5) = 6x + 15
- -2(a + b) = -2a - 2b

### **Multiple Bracket Expansion**
**Examples:**
- (a + b)(c + d) = a(c + d) + b(c + d) = ac + ad + bc + bd
- (x + 2)(x + 3) = x(x + 3) + 2(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6

### **Nested Brackets**
**Examples:**
- 2[3 + (4 × 2)] = 2[3 + 8] = 2[11] = 22
- 3{2 + [4 × (5 - 2)]} = 3{2 + [4 × 3]} = 3{2 + 12} = 3{14} = 42

---

## 🎯 Special Bracket Rules

### **Fraction Bar as Invisible Brackets**
The fraction bar acts like brackets for numerator and denominator:

**Examples:**
- \\frac{2 + 3}{4 - 1} = \\frac{5}{3}
- \\frac{a + b}{c × d} = \\frac{a + b}{c × d}

### **Brackets in Complex Fractions**
**Examples:**
- \\frac{1 + \\frac{1}{2}}{3} = \\frac{\\frac{3}{2}}{3} = \\frac{1}{2}
- \\frac{a}{b + \\frac{c}{d}} = \\frac{a}{\\frac{bd + c}{d}} = \\frac{a × d}{bd + c}

---

## 🚨 Common Mistakes with Brackets

### ❌ **Wrong Order of Solving**
\`\`\`
Wrong: 2 × [3 + (4 × 5)] = 2 × [3 + 4] × 5 = 14 × 5 = 70
Right: 2 × [3 + (4 × 5)] = 2 × [3 + 20] = 2 × 23 = 46
\`\`\`

### ❌ **Incorrect Sign Change**
\`\`\`
Wrong: 5 - (2 + 3) = 5 - 2 + 3 = 6
Right: 5 - (2 + 3) = 5 - 5 = 0
\`\`\`

### ❌ **Missing Multiplication**
\`\`\`
Wrong: 2(3 + 4) = 2 × 3 + 4 = 10
Right: 2(3 + 4) = 2 × 3 + 2 × 4 = 6 + 8 = 14
\`\`\`

### ❌ **Wrong Bracket Priority**
\`\`\`
Wrong: {2 + [3 × (4 + 5)]} = {2 + [3 × 4 + 5]} = {2 + [12 + 5]} = 19
Right: {2 + [3 × (4 + 5)]} = {2 + [3 × 9]} = {2 + 27} = 29
\`\`\`

---

## 🎯 Advanced Bracket Problems

### **Multiple Levels**
**Simplify: 3 - {2 + [4 × (5 - 2)] + 1}**

**Step 1:** (5 - 2) = 3  
**Step 2:** [4 × 3] = 12  
**Step 3:** {2 + 12 + 1} = 15  
**Step 4:** 3 - 15 = -12

### **Mixed Operations**
**Simplify: 2 × [3 + (4 ÷ 2) × 5] - 1**

**Step 1:** (4 ÷ 2) = 2  
**Step 2:** 2 × 5 = 10  
**Step 3:** [3 + 10] = 13  
**Step 4:** 2 × 13 = 26  
**Step 5:** 26 - 1 = 25

### **Fraction with Brackets**
**Simplify: \\frac{2 + (3 × 4)}{5 - (2 + 1)}**

**Step 1:** (3 × 4) = 12  
**Step 2:** 2 + 12 = 14  
**Step 3:** (2 + 1) = 3  
**Step 4:** 5 - 3 = 2  
**Step 5:** 14 ÷ 2 = 7

---

## 🧠 Shortcut Techniques

### **Quick Bracket Removal**
- **Positive brackets**: Just remove
- **Negative brackets**: Change all signs
- **Nested brackets**: Work from inside out

### **Visual Method for Sign Changes**
\`\`\`
Positive bracket: 2 + (a + b) = 2 + a + b
Negative bracket: 2 - (a + b) = 2 - a - b
\`\`\`

### **Bracket Multiplication**
\`\`\`
2(a + b) = 2a + 2b
(a + b)(c + d) = ac + ad + bc + bd
\`\`\`

---

## 🎯 Practice Questions

**Basic Bracket Problems:**
1. 5 + (3 + 4) = ?
2. 8 - (2 + 3) = ?
3. 2 × (4 + 6) = ?
4. 3[2 + (4 × 2)] = ?

**Complex Bracket Problems:**
1. 2 × {3 + [4 × (5 - 2)]} = ?
2. 5 - {2 + [3 × (4 + 1)]} = ?
3. 3 × [2 + {4 × (6 ÷ 2)}] = ?
4. \\frac{3 + (2 × 4)}{5 - (3 + 1)} = ?

**Expansion Problems:**
1. 2(a + b + c) = ?
2. -3(x + 2y) = ?
3. (x + 1)(x + 2) = ?

**Answers:** 12, 3, 20, 22, 30, -8, 42, 2, 2a+2b+2c, -3x-6y, x²+3x+2

---

## 🎓 Pro Tips for Exams

1. **Always solve inner brackets first** - work from inside out
2. **Remember sign change rule** - minus before brackets flips all signs
3. **Use BODMAS with brackets** - brackets come first in order of operations
4. **Draw lines to separate levels** - helps visualize complex expressions
5. **Practice mental expansion** - get quick at multiplying brackets
6. **Check your work** - always verify bracket removal

Master brackets and you'll handle even the most complex simplification problems! 🏆`
};

