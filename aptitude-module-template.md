# Aptitude Module Topic Template

This template provides the structure and format for creating new aptitude module topics. Use this as a reference for AI to generate properly formatted content without backtick escaping issues.

## Module Information
- **Module ID**: [e.g., 2 for Simplification]
- **Topic ID**: [e.g., 2.1 for BODMAS/PEMDAS]
- **Title**: [Descriptive title for the topic]
- **Status**: completed

## Content Structure

Use the following markdown structure for all topic content:

### Main Sections
1. **Introduction** - Brief overview of the topic
2. **Core Concepts** - Detailed explanations with examples
3. **Operations/Methods** - Step-by-step procedures
4. **Special Cases** - Edge cases and patterns
5. **Applications** - Real-world usage and problem-solving
6. **Common Mistakes** - Error prevention with examples
7. **Practice Problems** - Exercises with answers
8. **Pro Tips** - Exam strategies

### Formatting Guidelines

#### Headers
```markdown
# 🔢 Main Title

## 🎯 Section Title

### 📊 Subsection Title

#### 🔍 Sub-subsection Title
```

#### Lists
```markdown
- **Bold item**: Description
- *Italic item*: Description
- `Code item`: Description
```

#### Examples
```markdown
**Examples:**
- Example 1: description
- Example 2: description
```

#### Code Blocks (IMPORTANT - Use this format)
Instead of triple backticks, use:
```markdown
\`\`\`
Code content here
\`\`\`
```

#### Mathematical Expressions
```markdown
- Use LaTeX notation: \\frac{a}{b}, x², √n
- Use proper spacing: a² + 2ab + b²
- Use superscripts: 10⁴, x^(m+n)
```

#### Tables (if needed)
```markdown
| Operation | Example | Result |
|-----------|---------|--------|
| Addition | 2 + 3 | 5 |
```

## Topic Template Structure

```markdown
# 🔢 [Topic Title]

[Brief introduction paragraph explaining the topic importance.]

---

## 🎯 [Main Concept Section]

[Detailed explanation of the core concept.]

### [Subsection 1]
- **Key Point**: Explanation
- **Example**: Step-by-step example

### [Subsection 2]
- **Key Point**: Explanation
- **Example**: Step-by-step example

---

## 📊 [Operations/Methods Section]

[Explanation of how to perform operations.]

### **Method 1**
\`\`\`
Step-by-step example
Result: answer
\`\`\`

### **Method 2**
\`\`\`
Step-by-step example
Result: answer
\`\`\`

---

## 🔍 [Special Cases Section]

[Explanation of edge cases and patterns.]

### **Case 1**
- **Condition**: When this applies
- **Example**: Specific example

### **Case 2**
- **Condition**: When this applies
- **Example**: Specific example

---

## 🧮 [Application Section]

[How to apply the concept in problem-solving.]

### **Problem Type 1**
**Example Problem:**
[Problem statement]

**Solution:**
[Step-by-step solution]
**Answer:** [Final answer]

---

## 🚨 [Common Mistakes Section]

### ❌ **[Mistake 1]**
\`\`\`
Wrong: incorrect approach
Right: correct approach
\`\`\`

### ❌ **[Mistake 2]**
\`\`\`
Wrong: incorrect approach
Right: correct approach
\`\`\`

---

## 🎯 [Practice Problems Section]

### **[Category 1]:**
1. [Problem 1] = ?
2. [Problem 2] = ?
3. [Problem 3] = ?

### **[Category 2]:**
1. [Problem 1] = ?
2. [Problem 2] = ?

**Answers:**
[Category 1]: answer1, answer2, answer3
[Category 2]: answer1, answer2

---

## 🎓 [Pro Tips Section]

1. **[Tip 1]**: [Explanation]
2. **[Tip 2]**: [Explanation]
3. **[Tip 3]**: [Explanation]

[Closing remark with emoji]
```

## Example Topic: BODMAS/PEMDAS

```markdown
# 🔢 BODMAS / PEMDAS Rule

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

Master BODMAS/PEMDAS and you'll never go wrong in simplification problems! 🏆
```

## Conversion Instructions

To convert this markdown template to a TypeScript topic file:

1. **Replace placeholders** in square brackets `[]`
2. **Escape all backticks**: Replace ``` with \`\`\`
3. **Add TypeScript wrapper**:
```typescript
import { SubLesson } from '../../../../data/lessonsData';

export const topic_[module]_[topic]: SubLesson = {
  id: "[module.topic]",
  title: '[Topic Title]',
  status: 'completed',
  content: `[Converted markdown content here]`
};
```

## Common Issues to Avoid

1. **Unescaped backticks** - Always replace ``` with \`\`\`
2. **Incorrect IDs** - Use string format like "2.1" not 2.1
3. **Missing imports** - Always include the SubLesson import
4. **Malformed markdown** - Test rendering before finalizing

## Example Topics Using This Template

- **2.1**: BODMAS/PEMDAS Rule
- **2.2**: Basic Arithmetic Operations
- **2.3**: Brackets ((), {}, [])
- **2.4**: Fractions (Simple & Complex)
- **2.5**: Decimal Numbers
- **2.6**: Mixed Fractions
- **2.7**: Powers and Exponents
- **2.8**: Square Roots and Cube Roots
- **2.9**: Surds (Basic)
- **2.10**: Indices Laws
- **2.11**: Approximation
- **2.12**: Use of Identities (basic)
- **2.13**: Sign Change Rules (+ / −)

This template ensures consistent formatting and prevents the backtick escaping issues we've encountered.