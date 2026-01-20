import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: "3.1",
  title: 'BODMAS / PEMDAS Rule',
  status: 'completed',
  content: "`# ðŸ”¢ BODMAS / PEMDAS Rule

Welcome to the foundation of mathematical simplification! The BODMAS/PEMDAS rule is crucial for solving complex mathematical expressions correctly. This rule ensures that everyone gets the same answer when simplifying expressions.

---

## ðŸŽ¯ What is BODMAS/PEMDAS?

**BODMAS** (British) and **PEMDAS** (American) are mnemonics that help remember the order of operations in mathematics.

### BODMAS = B â†’ O â†’ D â†’ M â†’ A â†’ S
### PEMDAS = P â†’ E â†’ M â†’ D â†’ A â†’ S

---

## ðŸ“Š Detailed Breakdown

### 1. **B/P - Brackets/Parentheses** (First Priority)
Solve expressions inside brackets first.

**Examples:**
- 2 Ã— (3 + 4) = 2 Ã— 7 = 14
- (8 Ã· 2) + (6 Ã— 3) = 4 + 18 = 22
- 5 Ã— [2 + (3 Ã— 4)] = 5 Ã— [2 + 12] = 5 Ã— 14 = 70

### 2. **O/E - Orders/Exponents** (Second Priority)
Solve powers, roots, and indices next.

**Examples:**
- 2Â³ + 4 = 8 + 4 = 12
- âˆš9 Ã— 3 = 3 Ã— 3 = 9
- 2Â² Ã— (5 + 1)Â² = 4 Ã— 6Â² = 4 Ã— 36 = 144

### 3. **D/M - Division/Multiplication** (Third Priority)
Work from left to right when both appear.

**Examples:**
- 12 Ã· 2 Ã— 3 = 6 Ã— 3 = 18
- 15 Ã· 5 Ã— 2 = 3 Ã— 2 = 6
- 8 Ã— 2 Ã· 4 = 16 Ã· 4 = 4

### 4. **M/D - Multiplication/Division** (Same as above)
- 10 + 5 Ã— 2 = 10 + 10 = 20
- 20 Ã· 2 Ã— 5 = 10 Ã— 5 = 50

### 5. **A - Addition** (Fourth Priority)
- 5 + 3 Ã— 2 = 5 + 6 = 11
- 8 Ã· 4 + 6 = 2 + 6 = 8

### 6. **S - Subtraction** (Last Priority)
- 10 - 2 Ã— 3 = 10 - 6 = 4
- 15 Ã· 3 - 2 = 5 - 2 = 3

---

## ðŸŽ¯ Complex Examples

### Example 1:
**Simplify: 8 + 4 Ã— (6 Ã· 2) - 3**

**Step 1:** Brackets first â†’ 6 Ã· 2 = 3  
**Step 2:** Multiplication â†’ 4 Ã— 3 = 12  
**Step 3:** Addition/Subtraction left to right â†’ 8 + 12 - 3 = 17 - 3 = 14

### Example 2:
**Simplify: 2Â³ Ã— (5 + 2) Ã· 4**

**Step 1:** Brackets â†’ 5 + 2 = 7  
**Step 2:** Exponents â†’ 2Â³ = 8  
**Step 3:** Multiplication â†’ 8 Ã— 7 = 56  
**Step 4:** Division â†’ 56 Ã· 4 = 14

### Example 3:
**Simplify: 10 - âˆš(9 Ã— 4) + 6 Ã— 2**

**Step 1:** Brackets â†’ 9 Ã— 4 = 36  
**Step 2:** Root â†’ âˆš36 = 6  
**Step 3:** Multiplication â†’ 6 Ã— 2 = 12  
**Step 4:** Subtraction/Addition â†’ 10 - 6 + 12 = 16

---

## ðŸ§  Important Points to Remember

### 1. **Left to Right Rule**
When operations have same priority, work from left to right:
- 8 Ã· 2 Ã— 4 = (8 Ã· 2) Ã— 4 = 16, not 8 Ã· (2 Ã— 4) = 1

### 2. **Brackets Types (Priority Order)**
1. **Parentheses ()** - Highest priority
2. **Square brackets []**
3. **Curly brackets {}** - Lowest priority

**Example:** 2 Ã— {3 + [4 Ã— (5 - 2)]} = 2 Ã— {3 + [4 Ã— 3]} = 2 Ã— {3 + 12} = 2 Ã— 15 = 30

### 3. **Nested Brackets**
Always solve innermost brackets first:
- 3 Ã— [(2 + 4) Ã— (5 - 1)] = 3 Ã— [6 Ã— 4] = 3 Ã— 24 = 72

### 4. **Fraction Bar as Bracket**
Expressions above and below fraction bar are treated as brackets:
- 2 + 3/4 - 1 = (2 + 3/4) - 1 = 5/4 - 1 = 1/4

---

## ðŸš¨ Common Mistakes to Avoid

### âŒ Wrong: 4 + 5 Ã— 2 = (4 + 5) Ã— 2 = 18
### âœ… Right: 4 + 5 Ã— 2 = 4 + 10 = 14

### âŒ Wrong: 8 Ã· 2 Ã— 3 = 8 Ã· (2 Ã— 3) = 8 Ã· 6 = 1.33
### âœ… Right: 8 Ã· 2 Ã— 3 = 4 Ã— 3 = 12

### âŒ Wrong: 2Â³ + 3Â² = 6Â² = 36
### âœ… Right: 2Â³ + 3Â² = 8 + 9 = 17

---

## ðŸŽ¯ Practice Questions

**Simplify the following:**

1. 5 + 3 Ã— (8 - 2) Ã· 2 = ?
2. 4Â² Ã— (7 + 3) - âˆš16 = ?
3. 15 Ã· 3 Ã— 2 + 4 - 1 = ?
4. 2 Ã— [3 + (4 Ã— 2)] - 5 = ?
5. 9 - 2 Ã— (6 Ã· 3) + 4 = ?

**Answers:** 5, 108, 13, 18, 11

---

## ðŸŽ“ Pro Tips for Exams

1. **Always scan for brackets first** - they're your highest priority
2. **Use brackets to avoid confusion** when writing expressions
3. **Double-check calculations** - small arithmetic errors can change answers
4. **Practice mental math** for quick simplifications
5. **Remember: MD comes before AS** - multiplication/division before addition/subtraction

Master BODMAS/PEMDAS and you'll never go wrong in simplification problems! ðŸ†`"
};


