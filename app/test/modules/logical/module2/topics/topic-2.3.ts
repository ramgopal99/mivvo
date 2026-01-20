import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Symbols & Notations',
  status: 'completed',
  content: "`# ðŸ” Coded Blood Relations

Unlock the secrets of coded blood relation problems! These challenging puzzles use symbols, codes, and mathematical operators to represent family relationships. Learn to decode complex relationship patterns and solve intricate family puzzles.

---

## ðŸŽ¯ What are Coded Blood Relations?

**Coded Blood Relations** use symbols, mathematical operators, or codes to represent family relationships. Instead of direct terms, relationships are expressed through:

- Mathematical operators (+, -, Ã—, Ã·)
- Symbols and codes (A, B, C, etc.)
- Logical connectives (and, or, if-then)
- Puzzle-based representations

### **Why Coded Relations are Tricky**
- **Abstract Representation**: Relationships not stated directly
- **Multiple Interpretations**: Same code can mean different things
- **Logical Deduction**: Requires systematic analysis
- **Pattern Recognition**: Finding underlying relationship rules

---

## ðŸ”¢ Common Coding Patterns

### **Pattern 1: Mathematical Operators**

#### **Basic Operators**
\`"\`\`
+ means "brother/sister of"
- means "husband/wife of"
Ã— means "parent of"
Ã· means "child of"
\`\`\`

#### **Example Problem**
**"A + B means A is brother of B"**
**"A - B means A is husband of B"**
**"A Ã— B means A is father of B"**

**Statement: P + Q - R Ã— S**

**Question: What is S to P?**

**Step-by-step decoding:**
1. P + Q â†’ P is brother of Q
2. Q - R â†’ Q is wife of R (or R is husband of Q)
3. R Ã— S â†’ R is father of S

**Family analysis:**
- P and Q are siblings
- Q and R are married (husband-wife)
- R and S are parent-child

**Final relationship:** P is uncle of S

### **Pattern 2: Symbolic Relationships**

#### **Common Symbols**
\`\`\`
â™‚ = Male, â™€ = Female
âš­ = Married
â†‘ = Parent, â†“ = Child
â†’ = Older, â† = Younger
\`\`\`

#### **Example Problem**
**"A â™‚ â†‘ B â™€ means A is father of B"**
**"C â™€ âš­ D â™‚ means C is wife of D"**

**Statement: P â™‚ â†‘ Q â™€ âš­ R â™‚ â†“ S â™€**

**Analysis:**
- P is father of Q
- Q is married to R
- R has daughter S

**Question: What is S to P?**
**Answer: S is granddaughter of P**

---

## ðŸŽ¯ Systematic Decoding Approach

### **Step 1: Understand the Code**
- Read all coding rules carefully
- Note which relationships are represented
- Identify any exceptions or special cases

### **Step 2: Break Down the Statement**
- Split complex statements into parts
- Apply each code individually
- Build relationships incrementally

### **Step 3: Create Relationship Map**
\`\`\`
Person A â†’ Code â†’ Person B â†’ Relationship
A + B = A is brother of B
B - C = B is wife of C
C Ã— D = C is parent of D
\`\`\`

### **Step 4: Connect the Relationships**
- Find connecting points between relationships
- Identify common persons
- Build the complete family picture

---

## ðŸ“Š Practice Coded Problems

### **Problem 1: Basic Mathematical Coding**

**Codes:**
- A + B means A is brother of B
- A - B means A is sister of B
- A Ã— B means A is father of B
- A Ã· B means A is daughter of B

**Statement: P + Q Ã· R Ã— S**

**Question: What is the relationship between P and S?**

**Decoding:**
1. P + Q: P is brother of Q
2. Q Ã· R: Q is daughter of R
3. R Ã— S: R is father of S

**Family Tree:**
\`\`\`
R (â™‚)
â”œâ”€â”€ Q (â™€)
â”‚   â””â”€â”€ Brother: P (â™‚)
â””â”€â”€ S (â™‚/â™€)
\`\`\`

**Answer: P is uncle of S**

### **Problem 2: Complex Coding**

**Codes:**
- P @ Q means P is father of Q
- P # Q means P is sister of Q
- P $ Q means P is brother of Q
- P % Q means P is mother of Q

**Statement: A @ B # C $ D % E**

**Question: If E is male, what is the relationship between A and E?**

**Decoding:**
1. A @ B: A is father of B
2. B # C: B is sister of C
3. C $ D: C is brother of D
4. D % E: D is mother of E

**Family Analysis:**
- A is grandfather of E (A â†’ B â†’ C â†’ D â†’ E)
- Since E is male, A is great-grandfather

**Answer: Great-grandfather**

---

## ðŸ§  Advanced Coding Patterns

### **Pattern 1: Conditional Coding**

#### **If-Then Relationships**
**"If A is male, A Ã— B means father-son"**
**"If A is female, A Ã— B means mother-daughter"**

#### **Example Problem**
**Statement: P Ã— Q, R Ã— S**
**Given: P is male, R is female**

**Analysis:**
- P Ã— Q: P is father of Q
- R Ã— S: R is mother of S

**Question: What is the relationship between Q and S?**
**Answer: Cannot be determined (no connection)**

### **Pattern 2: Multiple Operators**

#### **Combined Operations**
**"A + B means A is brother of B"**
**"A Ã— B means A is father of B"**
**"A + B Ã— C" means combined operations**

#### **Example Problem**
**Statement: M + N Ã— O + P**

**Decoding:**
1. M + N: M is brother of N
2. N Ã— O: N is father of O
3. O + P: O is brother of P

**Family Tree:**
\`\`\`
N (â™‚)
â”œâ”€â”€ M (â™‚) - brother
â”œâ”€â”€ O (â™‚/â™€)
â”‚   â””â”€â”€ P (â™‚/â™€) - sibling
\`\`\`

**Answer: M is uncle of P**

---

## ðŸŽ¯ Complex Coded Problems

### **Problem 1: Puzzle-Based Coding**

**"In a certain code language:"**
- "A is B's father" is written as "A # B"
- "C is D's mother" is written as "C @ D"
- "E is F's sister" is written as "E $ F"
- "G is H's brother" is written as "G % H"

**Statement: P # Q @ R $ S % T**

**Question: If T is female, what is the relationship between P and T?**

**Decoding:**
1. P # Q: P is father of Q
2. Q @ R: Q is mother of R
3. R $ S: R is sister of S
4. S % T: S is brother of T

**Family Analysis:**
- P â†’ Q â†’ R â†’ S â†’ T
- Since T is female and S is brother of T, T is sister of S
- P is great-grandfather of T

**Answer: Great-grandfather**

### **Problem 2: Mathematical Coding**

**"If A Ã— B means A is brother of B"**
**"A + B means A is mother of B"**
**"A Ã· B means A is father of B"**

**Statement: P Ã— Q + R Ã· S**

**Question: What is S to P?**

**Decoding:**
1. P Ã— Q: P is brother of Q
2. Q + R: Q is mother of R
3. R Ã· S: R is father of S (S is child of R)

**Family Tree:**
\`\`\`
Q (â™€)
â”œâ”€â”€ P (â™‚) - brother of Q
â””â”€â”€ R (â™‚) - son of Q
    â””â”€â”€ S (â™‚/â™€) - child of R
\`\`\`

**Answer: P is uncle of S**

---

## ðŸ“Š Coding Strategy Framework

### **Step 1: Code Analysis**
\`\`\`
1. List all codes and their meanings
2. Identify relationship types (blood/marriage)
3. Note any conditions or exceptions
4. Look for patterns in coding
\`\`\`

### **Step 2: Statement Breakdown**
\`\`\`
1. Split statement into individual codes
2. Apply each code to build relationships
3. Find connecting persons between codes
4. Build relationship chains
\`\`\`

### **Step 3: Family Construction**
\`\`\`
1. Start with known relationships
2. Add persons as they appear
3. Connect through common persons
4. Verify consistency
\`\`\`

### **Step 4: Answer Derivation**
\`\`\`
1. Trace relationship path between persons
2. Consider all possible interpretations
3. Account for gender specifications
4. Provide precise relationship term
\`\`\`

---

## ðŸš¨ Common Mistakes in Coded Relations

### **Mistake 1: Wrong Operator Precedence**
âŒ Applying codes in wrong order
âœ… Follow left-to-right or specified precedence

### **Mistake 2: Ignoring Gender Context**
âŒ "Son" always male, "daughter" always female
âœ… Consider context-dependent relationships

### **Mistake 3: Missing Relationship Chains**
âŒ Only direct relationships
âœ… Consider indirect connections through family

### **Mistake 4: Incorrect Code Application**
âŒ Applying codes universally
âœ… Check if codes have conditional applications

---

## ðŸ§® Quick Reference: Common Codes

### **Mathematical Operators**
| Code | Meaning | Example |
|------|---------|---------|
| A + B | Brother/Sister | P + Q = siblings |
| A - B | Husband/Wife | M - N = married |
| A Ã— B | Parent-Child | X Ã— Y = parent |
| A Ã· B | Child-Parent | Y Ã· X = child |

### **Symbolic Codes**
| Symbol | Meaning | Example |
|--------|---------|---------|
| â†’ | "is" | A â†’ father |
| â†‘ | Parent | A â†‘ B = A parent of B |
| â†“ | Child | C â†“ D = C child of D |
| âš­ | Married | E âš­ F = married |

---

## ðŸŽ¯ Practice Coded Problems

### **Problem 1: Simple Coding**
**Codes:**
- P @ Q means P is father of Q
- P # Q means P is mother of Q
- P $ Q means P is brother of Q

**Statement: A @ B # C $ D**

**Question: What is D to A?**
**Answer: Nephew**

### **Problem 2: Complex Coding**
**Codes:**
- A + B means A is sister of B
- A Ã— B means A is mother of B
- A Ã· B means A is husband of B

**Statement: M + N Ã— O Ã· P**

**Question: What is P to M?**
**Answer: Father-in-law**

### **Problem 3: Conditional Coding**
**"A & B means A is father of B if A is male"**
**"A & B means A is mother of B if A is female"**

**Statement: P & Q & R**
**Given: P is male, Q is female**

**Question: What is R to P?**
**Answer: Grandchild**

---

## ðŸ† Pro Tips for Coded Relations

1. **Read codes multiple times** carefully
2. **Make a code reference table**
3. **Draw relationship diagrams**
4. **Work step by step** through the statement
5. **Consider all possible connections**
6. **Verify gender assumptions**
7. **Practice with different coding patterns**

---

## ðŸ” Advanced Coded Relation Topics

### **Topic 1: Matrix-Based Coding**
- Grid-based relationship representations
- Multiple relationship types in matrices

### **Topic 2: Logical Puzzle Coding**
- Sudoku-style family relationship puzzles
- Constraint-based relationship solving

### **Topic 3: Sequential Coding**
- Time-based relationship changes
- Age progression in family relationships

---

## ðŸ“Š Coded Relations Statistics

| Coding Type | Difficulty | Frequency | Time Required |
|-------------|------------|-----------|---------------|
| Mathematical | Easy | 40% | 1-2 minutes |
| Symbolic | Medium | 35% | 2-3 minutes |
| Conditional | Hard | 25% | 3-4 minutes |

**Success Rate:** 60-70% with systematic approach

---

## ðŸŽ¯ Final Challenge Problem

**Complex Coded Relation:**

**Codes:**
- A @ B means A is grandfather of B
- A # B means A is sister of B
- A $ B means A is husband of B
- A % B means A is daughter of B

**Statement: P @ Q # R $ S % T**

**Additional Info:** T is female**

**Question: What is the relationship between P and T?**

**Think systematically:**
1. Break down each code
2. Build the family tree
3. Trace the relationship path
4. Consider the gender information

**Master coded blood relations and you'll decode any family relationship puzzle! ðŸ”ðŸ©¸**`
};
