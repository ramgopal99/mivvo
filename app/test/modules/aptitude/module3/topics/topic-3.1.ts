import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: "3.1",
  title: 'BODMAS / PEMDAS Rule',
  status: 'completed',
  content: `# 🔢 BODMAS / PEMDAS Rule

Welcome to the foundation of mathematical simplification! The BODMAS/PEMDAS rule is crucial for solving complex mathematical expressions correctly. This rule ensures that everyone gets the same answer when simplifying expressions.

---

## 🎯 What is BODMAS/PEMDAS?

**BODMAS** (British) and **PEMDAS** (American) are mnemonics that help remember the order of operations in mathematics.

### BODMAS = B → O → D → M → A → S
### PEMDAS = P → E → M → D → A → S

---

## 📊 Detailed Breakdown

### 1. **B/P - Brackets/Parentheses** (First Priority)
Solve expressions inside brackets first.

**Examples:**
- 2 × (3 + 4) = 2 × 7 = 14
- (8 ÷ 2) + (6 × 3) = 4 + 18 = 22
- 5 × [2 + (3 × 4)] = 5 × [2 + 12] = 5 × 14 = 70

### 2. **O/E - Orders/Exponents** (Second Priority)
Solve powers, roots, and indices next.

**Examples:**
- 2³ + 4 = 8 + 4 = 12
- √9 × 3 = 3 × 3 = 9
- 2² × (5 + 1)² = 4 × 6² = 4 × 36 = 144

### 3. **D/M - Division/Multiplication** (Third Priority)
Work from left to right when both appear.

**Examples:**
- 12 ÷ 2 × 3 = 6 × 3 = 18
- 15 ÷ 5 × 2 = 3 × 2 = 6
- 8 × 2 ÷ 4 = 16 ÷ 4 = 4

### 4. **M/D - Multiplication/Division** (Same as above)
- 10 + 5 × 2 = 10 + 10 = 20
- 20 ÷ 2 × 5 = 10 × 5 = 50

### 5. **A - Addition** (Fourth Priority)
- 5 + 3 × 2 = 5 + 6 = 11
- 8 ÷ 4 + 6 = 2 + 6 = 8

### 6. **S - Subtraction** (Last Priority)
- 10 - 2 × 3 = 10 - 6 = 4
- 15 ÷ 3 - 2 = 5 - 2 = 3

---

## 🎯 Complex Examples

### Example 1:
**Simplify: 8 + 4 × (6 ÷ 2) - 3**

**Step 1:** Brackets first → 6 ÷ 2 = 3  
**Step 2:** Multiplication → 4 × 3 = 12  
**Step 3:** Addition/Subtraction left to right → 8 + 12 - 3 = 17 - 3 = 14

### Example 2:
**Simplify: 2³ × (5 + 2) ÷ 4**

**Step 1:** Brackets → 5 + 2 = 7  
**Step 2:** Exponents → 2³ = 8  
**Step 3:** Multiplication → 8 × 7 = 56  
**Step 4:** Division → 56 ÷ 4 = 14

### Example 3:
**Simplify: 10 - √(9 × 4) + 6 × 2**

**Step 1:** Brackets → 9 × 4 = 36  
**Step 2:** Root → √36 = 6  
**Step 3:** Multiplication → 6 × 2 = 12  
**Step 4:** Subtraction/Addition → 10 - 6 + 12 = 16

---

## 🧠 Important Points to Remember

### 1. **Left to Right Rule**
When operations have same priority, work from left to right:
- 8 ÷ 2 × 4 = (8 ÷ 2) × 4 = 16, not 8 ÷ (2 × 4) = 1

### 2. **Brackets Types (Priority Order)**
1. **Parentheses ()** - Highest priority
2. **Square brackets []**
3. **Curly brackets {}** - Lowest priority

**Example:** 2 × {3 + [4 × (5 - 2)]} = 2 × {3 + [4 × 3]} = 2 × {3 + 12} = 2 × 15 = 30

### 3. **Nested Brackets**
Always solve innermost brackets first:
- 3 × [(2 + 4) × (5 - 1)] = 3 × [6 × 4] = 3 × 24 = 72

### 4. **Fraction Bar as Bracket**
Expressions above and below fraction bar are treated as brackets:
- 2 + 3/4 - 1 = (2 + 3/4) - 1 = 5/4 - 1 = 1/4

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong: 4 + 5 × 2 = (4 + 5) × 2 = 18
### ✅ Right: 4 + 5 × 2 = 4 + 10 = 14

### ❌ Wrong: 8 ÷ 2 × 3 = 8 ÷ (2 × 3) = 8 ÷ 6 = 1.33
### ✅ Right: 8 ÷ 2 × 3 = 4 × 3 = 12

### ❌ Wrong: 2³ + 3² = 6² = 36
### ✅ Right: 2³ + 3² = 8 + 9 = 17

---

## 🎯 Practice Questions

**Simplify the following:**

1. 5 + 3 × (8 - 2) ÷ 2 = ?
2. 4² × (7 + 3) - √16 = ?
3. 15 ÷ 3 × 2 + 4 - 1 = ?
4. 2 × [3 + (4 × 2)] - 5 = ?
5. 9 - 2 × (6 ÷ 3) + 4 = ?

**Answers:** 5, 108, 13, 18, 11

---

## 🎓 Pro Tips for Exams

1. **Always scan for brackets first** - they're your highest priority
2. **Use brackets to avoid confusion** when writing expressions
3. **Double-check calculations** - small arithmetic errors can change answers
4. **Practice mental math** for quick simplifications
5. **Remember: MD comes before AS** - multiplication/division before addition/subtraction

Master BODMAS/PEMDAS and you'll never go wrong in simplification problems! 🏆`
};

