import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: "2.2",
  title: 'Coded Blood Relations',
  status: 'completed',
  content: `# 🔐 Coded Blood Relations

Unlock the secrets of coded blood relation problems! These challenging puzzles use symbols, codes, and mathematical operators to represent family relationships. Learn to decode complex relationship patterns and solve intricate family puzzles.

---

## 🎯 What are Coded Blood Relations?

**Coded Blood Relations** use symbols, mathematical operators, or codes to represent family relationships. Instead of direct terms, relationships are expressed through:

- Mathematical operators (+, -, ×, ÷)
- Symbols and codes (A, B, C, etc.)
- Logical connectives (and, or, if-then)
- Puzzle-based representations

### **Why Coded Relations are Tricky**
- **Abstract Representation**: Relationships not stated directly
- **Multiple Interpretations**: Same code can mean different things
- **Logical Deduction**: Requires systematic analysis
- **Pattern Recognition**: Finding underlying relationship rules

---

## 🔢 Common Coding Patterns

### **Pattern 1: Mathematical Operators**

#### **Basic Operators**
\`\`\`
+ means "brother/sister of"
- means "husband/wife of"
× means "parent of"
÷ means "child of"
\`\`\`

#### **Example Problem**
**"A + B means A is brother of B"**
**"A - B means A is husband of B"**
**"A × B means A is father of B"**

**Statement: P + Q - R × S**

**Question: What is S to P?**

**Step-by-step decoding:**
1. P + Q → P is brother of Q
2. Q - R → Q is wife of R (or R is husband of Q)
3. R × S → R is father of S

**Family analysis:**
- P and Q are siblings
- Q and R are married (husband-wife)
- R and S are parent-child

**Final relationship:** P is uncle of S

### **Pattern 2: Symbolic Relationships**

#### **Common Symbols**
\`\`\`
♂ = Male, ♀ = Female
⚭ = Married
↑ = Parent, ↓ = Child
→ = Older, ← = Younger
\`\`\`

#### **Example Problem**
**"A ♂ ↑ B ♀ means A is father of B"**
**"C ♀ ⚭ D ♂ means C is wife of D"**

**Statement: P ♂ ↑ Q ♀ ⚭ R ♂ ↓ S ♀**

**Analysis:**
- P is father of Q
- Q is married to R
- R has daughter S

**Question: What is S to P?**
**Answer: S is granddaughter of P**

---

## 🎯 Systematic Decoding Approach

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
Person A → Code → Person B → Relationship
A + B = A is brother of B
B - C = B is wife of C
C × D = C is parent of D
\`\`\`

### **Step 4: Connect the Relationships**
- Find connecting points between relationships
- Identify common persons
- Build the complete family picture

---

## 📊 Practice Coded Problems

### **Problem 1: Basic Mathematical Coding**

**Codes:**
- A + B means A is brother of B
- A - B means A is sister of B
- A × B means A is father of B
- A ÷ B means A is daughter of B

**Statement: P + Q ÷ R × S**

**Question: What is the relationship between P and S?**

**Decoding:**
1. P + Q: P is brother of Q
2. Q ÷ R: Q is daughter of R
3. R × S: R is father of S

**Family Tree:**
\`\`\`
R (♂)
├── Q (♀)
│   └── Brother: P (♂)
└── S (♂/♀)
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
- A is grandfather of E (A → B → C → D → E)
- Since E is male, A is great-grandfather

**Answer: Great-grandfather**

---

## 🧠 Advanced Coding Patterns

### **Pattern 1: Conditional Coding**

#### **If-Then Relationships**
**"If A is male, A × B means father-son"**
**"If A is female, A × B means mother-daughter"**

#### **Example Problem**
**Statement: P × Q, R × S**
**Given: P is male, R is female**

**Analysis:**
- P × Q: P is father of Q
- R × S: R is mother of S

**Question: What is the relationship between Q and S?**
**Answer: Cannot be determined (no connection)**

### **Pattern 2: Multiple Operators**

#### **Combined Operations**
**"A + B means A is brother of B"**
**"A × B means A is father of B"**
**"A + B × C" means combined operations**

#### **Example Problem**
**Statement: M + N × O + P**

**Decoding:**
1. M + N: M is brother of N
2. N × O: N is father of O
3. O + P: O is brother of P

**Family Tree:**
\`\`\`
N (♂)
├── M (♂) - brother
├── O (♂/♀)
│   └── P (♂/♀) - sibling
\`\`\`

**Answer: M is uncle of P**

---

## 🎯 Complex Coded Problems

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
- P → Q → R → S → T
- Since T is female and S is brother of T, T is sister of S
- P is great-grandfather of T

**Answer: Great-grandfather**

### **Problem 2: Mathematical Coding**

**"If A × B means A is brother of B"**
**"A + B means A is mother of B"**
**"A ÷ B means A is father of B"**

**Statement: P × Q + R ÷ S**

**Question: What is S to P?**

**Decoding:**
1. P × Q: P is brother of Q
2. Q + R: Q is mother of R
3. R ÷ S: R is father of S (S is child of R)

**Family Tree:**
\`\`\`
Q (♀)
├── P (♂) - brother of Q
└── R (♂) - son of Q
    └── S (♂/♀) - child of R
\`\`\`

**Answer: P is uncle of S**

---

## 📊 Coding Strategy Framework

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

## 🚨 Common Mistakes in Coded Relations

### **Mistake 1: Wrong Operator Precedence**
❌ Applying codes in wrong order
✅ Follow left-to-right or specified precedence

### **Mistake 2: Ignoring Gender Context**
❌ "Son" always male, "daughter" always female
✅ Consider context-dependent relationships

### **Mistake 3: Missing Relationship Chains**
❌ Only direct relationships
✅ Consider indirect connections through family

### **Mistake 4: Incorrect Code Application**
❌ Applying codes universally
✅ Check if codes have conditional applications

---

## 🧮 Quick Reference: Common Codes

### **Mathematical Operators**
| Code | Meaning | Example |
|------|---------|---------|
| A + B | Brother/Sister | P + Q = siblings |
| A - B | Husband/Wife | M - N = married |
| A × B | Parent-Child | X × Y = parent |
| A ÷ B | Child-Parent | Y ÷ X = child |

### **Symbolic Codes**
| Symbol | Meaning | Example |
|--------|---------|---------|
| → | "is" | A → father |
| ↑ | Parent | A ↑ B = A parent of B |
| ↓ | Child | C ↓ D = C child of D |
| ⚭ | Married | E ⚭ F = married |

---

## 🎯 Practice Coded Problems

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
- A × B means A is mother of B
- A ÷ B means A is husband of B

**Statement: M + N × O ÷ P**

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

## 🏆 Pro Tips for Coded Relations

1. **Read codes multiple times** carefully
2. **Make a code reference table**
3. **Draw relationship diagrams**
4. **Work step by step** through the statement
5. **Consider all possible connections**
6. **Verify gender assumptions**
7. **Practice with different coding patterns**

## ⚡ Quick Solving Tricks for Coded Problems

### **Trick 1: Code Pattern Recognition**
- **"+" means siblings** (brother/sister)
- **"-" means spouses** (husband/wife)
- **"×" means parent-child** (father/son, mother/daughter)
- **"÷" means child-parent** (reverse of ×)

### **Trick 2: Mathematical Operator Precedence**
- **Solve left to right** unless brackets specify otherwise
- **Group operations** by relationship type
- **Apply operations** in sequence: siblings → marriage → parent-child

### **Trick 3: Quick Decoding Formula**
- **A + B** = A and B are siblings
- **A - B** = A married to B (gender swap)
- **A × B** = A is parent of B
- **A ÷ B** = A is child of B

### **Trick 4: Chain Relationship Shortcuts**
- **A + B × C** = A is uncle/aunt of C
- **A × B + C** = A is parent of siblings B and C
- **A - B × C** = A is spouse of C's parent

### **Trick 5: Gender Assumption Rules**
- **Default: Assume opposite genders** for spouses
- **Same gender for siblings** unless specified
- **Parent-child: Gender determined** by son/daughter terms

### **Trick 6: Common Code Combinations**
- **A + B - C** = A and B are married to C (love triangle)
- **A × B × C** = A is grandparent of C
- **A + B × C + D** = A and D are cousins through B and C

### **Trick 7: Reverse Engineering**
- **"Uncle of X"** = X's parent's brother
- **"Nephew of Y"** = Y's brother's son
- **"Cousin of Z"** = Z's parent's sibling's child

### **Trick 8: Code Substitution Technique**
- **Replace symbols** with relationship words
- **Read aloud** the decoded relationships
- **Verify logic** step by step

### **Trick 9: Elimination Method**
- **Cross out** impossible relationships
- **Use gender clues** to eliminate options
- **Apply generation rules** to filter answers

### **Trick 10: Pattern-Based Solving**
- **Look for repeated codes** in the statement
- **Identify relationship chains** (A→B→C→D)
- **Find common persons** connecting different codes

---

## 🔍 Advanced Coded Relation Topics

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

## 📊 Coded Relations Statistics

| Coding Type | Difficulty | Frequency | Time Required |
|-------------|------------|-----------|---------------|
| Mathematical | Easy | 40% | 1-2 minutes |
| Symbolic | Medium | 35% | 2-3 minutes |
| Conditional | Hard | 25% | 3-4 minutes |

**Success Rate:** 60-70% with systematic approach

---

## 🎯 Final Challenge Problem

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

**Master coded blood relations and you'll decode any family relationship puzzle! 🔐🩸**`
};