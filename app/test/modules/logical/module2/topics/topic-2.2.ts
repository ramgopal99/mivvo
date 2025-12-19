import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: "2.2",
  title: 'Family Relationship Basics',
  status: 'completed',
  content: `# 🌳 Family Tree Problems

Dive deep into complex family tree analysis! Family trees represent multi-generational relationships and test your ability to navigate intricate relationship networks. Learn systematic approaches to solve complex family relationship puzzles.

---

## 🎯 Understanding Family Trees

**Family Tree Problems** involve analyzing relationships across multiple generations. These problems require you to:

- Navigate complex family structures
- Track relationships across generations
- Apply logical deduction systematically
- Handle multiple marriages and blended families

### **Why Family Trees are Challenging**
- **Multiple Generations**: 3-4 generation relationships
- **Complex Connections**: Marriage and blood relations
- **Ambiguous Terms**: Context-dependent relationships
- **Hidden Information**: Not all relationships are stated

---

## 🏗️ Building Family Trees

### **Step-by-Step Construction**

#### **Step 1: Identify All Persons**
- List every person mentioned
- Note their genders (♂/♀)
- Identify generations

#### **Step 2: Find Anchor Points**
- Start with known relationships
- Find husband-wife pairs
- Identify parent-child relationships

#### **Step 3: Build Generation by Generation**
\`\`\`
Generation 1: Grandparents
Generation 2: Parents
Generation 3: Children
Generation 4: Grandchildren
\`\`\`

#### **Step 4: Add Marriage Links**
- Connect spouses with marriage symbols (⚭)
- Note multiple marriages if any

#### **Step 5: Verify Consistency**
- Check all stated relationships
- Ensure no contradictions
- Fill in implied relationships

---

## 📊 Sample Family Tree Problem

### **Problem Statement**

"In a family, A is the father of B and C. D is the wife of B. E and F are the children of B and D. G is the brother of A. H is the wife of G. I and J are the children of G and H."

### **Building the Family Tree**

\`\`\`
Generation 1:    G (♂) - ⚭ - H (♀)
                     │
Generation 2:    A (♂) - ⚭ - ? (Unknown)
                     │
Generation 3:    B (♂) - ⚭ - D (♀)
                     │
Generation 4:    E (?)    F (?)
\`\`\`

### **Analysis Questions**

#### **Question 1: What is the relationship between A and G?**
**Answer:** Brothers (both sons of same parents)

#### **Question 2: What is the relationship between D and E?**
**Answer:** Mother (D is wife of B, E is child of B)

#### **Question 3: What is the relationship between G and I?**
**Answer:** Father (G is father of I and J)

---

## 🎯 Complex Family Tree Patterns

### **Pattern 1: Multiple Marriages**

**Problem:** "A has two wives, B and C. B has two sons, D and E. C has one daughter, F. G is the brother of A."

**Family Tree:**
\`\`\`
A (♂)
├── B (♀)
│   ├── D (♂)
│   └── E (♂)
└── C (♀)
    └── F (♀)
\`\`\`

**Relationships:**
- D and E are half-brothers
- F is half-sister to D and E
- G is uncle to all children

### **Pattern 2: In-Law Relationships**

**Problem:** "P is married to Q. R is the sister of P. S is the brother of Q. T is married to R."

**Family Tree:**
\`\`\`
R (♂) - ⚭ - T (♀)    S (♀) - ⚭ - ? (Unknown)
│                                │
P (♂) - ⚭ - Q (♀)          Brother-Sister
\`\`\`

**Relationships:**
- T is sister-in-law of Q
- S is sister-in-law of R
- R is brother-in-law of S

---

## 🧠 Problem-Solving Techniques

### **Technique 1: Relationship Mapping**

#### **Create a Relationship Matrix**
\`\`\`
Person A | Person B | Relationship | Basis
---------|----------|--------------|-------
A        | B        | Father       | Given
B        | C        | Mother       | Given
\`\`\`

#### **Deduce New Relationships**
- A → B (father) + B → C (mother) = A → C (father-in-law)
- A → B (father) + B → D (son) = A → D (grandfather)

### **Technique 2: Generation Tracking**

#### **Assign Generation Numbers**
\`\`\`
Generation -2: Great-grandparents
Generation -1: Grandparents
Generation  0: Parents (reference)
Generation  1: Children
Generation  2: Grandchildren
\`\`\`

#### **Track Relationships by Generation**
- Same generation: Siblings, cousins
- Adjacent generations: Parent-child
- Two generations apart: Grandparent-grandchild

---

## 🎯 Practice Family Tree Problems

### **Problem 1: Three Generations**

**Given:**
- P is the father of Q
- Q is the mother of R
- S is the brother of Q
- T is the wife of S

**Questions:**
1. What is the relationship between P and R?
2. What is the relationship between S and R?
3. What is the relationship between T and Q?

**Solutions:**
1. **P and R**: Grandfather-grandchild (P → Q → R)
2. **S and R**: Uncle-aunt relationship (S is uncle of R)
3. **T and Q**: Sister-in-law (T is wife of S, S is brother of Q)

### **Problem 2: Complex Relationships**

**Given:**
- A is married to B
- C is the father of A
- D is the brother of B
- E is the daughter of D
- F is married to E

**Family Tree Construction:**
\`\`\`
C (♂)
│
A (♂) - ⚭ - B (♀)
                    │
                    D (♂)
                    │
                    E (♀) - ⚭ - F (♂)
\`\`\`

**Questions:**
1. What is the relationship between C and E?
2. What is the relationship between A and F?
3. What is the relationship between B and F?

**Solutions:**
1. **C and E**: Grandfather-granddaughter
2. **A and F**: Uncle (A is brother-in-law of D)
3. **B and F**: Aunt (B is sister of D)

---

## 📊 Advanced Family Tree Concepts

### **Concept 1: Multiple Marriage Families**

#### **Step-Families**
- **Step-parent**: Parent through marriage
- **Step-sibling**: Sibling through marriage
- **Blended family**: Combined families

#### **Example Problem**
**"X is married to Y. Y has a son Z from previous marriage. X has a daughter W from previous marriage."**

**Relationships:**
- Z and W are step-siblings
- X is step-parent of Z
- Y is step-parent of W

### **Concept 2: Distant Relationships**

#### **Cousin Relationships**
- **First cousins**: Children of siblings
- **Second cousins**: Children of first cousins
- **Cousins once/twice removed**: Different generations

#### **Example Problem**
**"P and Q are siblings. R is child of P. S is child of Q. T is child of R."**

**Relationships:**
- R and S: Cousins
- T and S: First cousins once removed
- P and T: Grandfather-grandchild

---

## 🎯 Systematic Problem-Solving

### **Step 1: Information Gathering**
- List all persons and their genders
- Note all relationships mentioned
- Identify anchor relationships

### **Step 2: Tree Construction**
- Start with nuclear families
- Connect through marriages
- Extend to extended family

### **Step 3: Relationship Verification**
- Check each stated relationship
- Deduce additional relationships
- Resolve ambiguities

### **Step 4: Answer Formulation**
- Express relationships clearly
- Consider alternative interpretations
- Provide complete answers

---

## 🚨 Common Pitfalls in Family Trees

### **Pitfall 1: Gender Assumptions**
❌ Assuming "child" is male
✅ Always consider both genders unless specified

### **Pitfall 2: Missing Marriage Links**
❌ "A's father's brother" without considering marriages
✅ Marriage creates in-law relationships

### **Pitfall 3: Generation Confusion**
❌ "Grandson" could be great-grandson
✅ Count generations accurately

### **Pitfall 4: Multiple Relationship Paths**
❌ Only considering direct relationships
✅ A person can be related through multiple paths

---

## 🧮 Relationship Calculation Methods

### **Method 1: Relationship Chains**
**Example:** "Father's brother's wife"
- Father's brother = Uncle
- Uncle's wife = Aunt
- **Answer: Aunt**

### **Method 2: Position Mapping**
**Example:** "Mother's sister's daughter"
\`\`\`
Mother → Sister (blood relation)
Sister → Daughter (parent-child)
Final: Cousin (mother's sister's daughter)
\`\`\`

### **Method 3: Venn Diagram Approach**
- **Blood Relations**: Direct family
- **Marriage Relations**: In-laws
- **Intersection**: Complex relationships

---

## 🎯 Practice Questions

### **Question 1: Basic Family Tree**
**"A is the father of B. B is the sister of C. C is the husband of D. E is the son of C."**

**What is the relationship between A and E?**
- A → B → C → E (grandfather-grandson)

### **Question 2: In-Law Relationships**
**"P is married to Q. R is the sister of P. S is the brother of Q. T is married to R."**

**What is the relationship between S and T?**
- S is brother of Q, T is married to R (sister of P)
- S and T are brother-in-law and sister-in-law

### **Question 3: Multi-Generational**
**"X is the grandfather of Y. Z is the sister of Y. W is the daughter of Z."**

**What is the relationship between X and W?**
- X → Y → Z → W (great-grandfather)
- Y and Z are siblings, W is niece of Y

---

## 🏆 Pro Tips for Family Trees

1. **Draw diagrams** whenever possible
2. **Use consistent symbols** (♂, ♀, ⚭, ├, └)
3. **Start with known relationships**
4. **Work generation by generation**
5. **Consider all possible connections**
6. **Verify each relationship**
7. **Practice with real family scenarios**

---

## 🔍 Advanced Family Tree Topics

### **Topic 1: Coded Family Trees**
- Symbolic representations
- Mathematical relationships
- Puzzle-based family trees

### **Topic 2: Logical Deduction**
- Missing relationship identification
- Contradiction detection
- Implied relationship discovery

### **Topic 3: Complex Marriage Patterns**
- Polygamous relationships
- Multiple divorces
- Adoption and guardianship

---

## 📊 Family Tree Problem Statistics

| Difficulty Level | Occurrence Rate | Time Required |
|------------------|-----------------|---------------|
| Easy (2-3 generations) | 30% | 1-2 minutes |
| Medium (3-4 generations) | 50% | 2-3 minutes |
| Hard (4+ generations) | 20% | 3-5 minutes |

**Success Rate:** 70-80% with systematic approach

---

## 🎯 Final Practice Problem

**Complex Family Tree Challenge:**

**Given:**
- A is married to B
- C and D are children of A and B
- E is married to C
- F and G are children of C and E
- H is the brother of A
- I is married to H
- J and K are children of H and I

**Questions:**
1. What is the relationship between D and F?
2. What is the relationship between B and J?
3. What is the relationship between G and K?

**Think systematically and draw the family tree!**

**Master family trees and you'll conquer blood relations problems! 🌳🩸**`
};