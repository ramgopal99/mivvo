import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_7: SubLesson = {
  id: "8.7",
  title: 'Comparative Ranking Problems',
  status: 'completed',
  content: `# ⚖️ Comparative Ranking Problems

Comparative ranking problems involve analyzing relative positions and standings using "better than," "worse than," or "immediately before/after" relationships. These problems require building complete ranking sequences from comparative information and determining specific positions within ordered arrangements.

---

## 🎯 Understanding Comparative Ranking

### **What are Comparative Ranking Problems?**
These problems involve determining positions and rankings based on relative comparisons between persons or objects. They test your ability to:
- **Interpret comparative statements**
- **Build ranking sequences from relationships**
- **Determine specific positions in ordered lists**
- **Apply logical ranking rules**

### **Key Comparative Terms**

#### **Superiority Comparisons**
- **Better than**: Higher ranking, better performance
- **Worse than**: Lower ranking, poorer performance
- **Higher than**: Above in ranking or position
- **Lower than**: Below in ranking or position

#### **Positional Comparisons**
- **Before/After**: Sequential position relationships
- **Above/Below**: Vertical position relationships
- **Left/Right of**: Horizontal position relationships

---

## 🧩 Comparative Relationship Types

### **Type 1: Direct Superiority**
\`\`\`
"A is better than B" means:
- A ranks higher than B
- A has better position than B
- A comes before B in descending order
\`\`\`

### **Type 2: Quantitative Comparisons**
\`\`\`
"A is better than 3 persons" means:
- 3 persons rank lower than A
- A is 4th in descending order (top 3 are better)
- A has 3 persons below him in ranking
\`\`\`

### **Type 3: Positional Relationships**
\`\`\`
"A is immediately before B" means:
- No person between A and B
- A and B are adjacent in the sequence
- B follows A directly
\`\`\`

---

## 🎯 Problem Types and Solutions

### **Type 1: Superiority Chain**
*"A is better than B, B is better than C, C is better than D. Who is the best?"*

**Solution:**
- Ranking: A > B > C > D
- A is the best (highest ranking)

### **Type 2: Quantitative Ranking**
*"A is better than 5 persons in the class. How many students are there?"*

**Solution:**
- A has 5 persons worse than him
- Total = A + 5 worse = 6 students
- A is 1st (best) among 6

### **Type 3: Positional Relationships**
*"A is immediately after B, C is immediately before D. Find positions."*

**Solution:**
- Possible sequences: B-A-... or ...-B-A-...
- C-D-... or ...-C-D-...
- Find consistent arrangement

---

## 📊 Comparative Logic Rules

### **Transitivity Rule**
\`\`\`
If A > B and B > C, then A > C
Comparative relationships are transitive
\`\`\`

### **Quantification Rule**
\`\`\`
"A is better than X persons" means:
- In descending order: A is (X+1)th position
- A has exactly X persons below him
- Total persons above A: X
\`\`\`

### **Immediacy Rule**
\`\`\`
"Immediately before/after" means:
- No persons between the two
- Adjacent positions in sequence
- Direct sequential relationship
\`\`\`

---

## 🛠️ Problem-Solving Framework

### **Step-by-Step Approach**

1. **Identify Comparative Information**
   - List all comparative statements
   - Categorize by type (superiority, quantity, position)
   - Note any immediacy relationships

2. **Build Relationship Chains**
   - Create superiority hierarchies (A > B > C)
   - Identify quantitative constraints
   - Map positional relationships

3. **Apply Comparative Logic**
   - Use transitivity to extend relationships
   - Apply quantification rules
   - Resolve positional constraints

4. **Construct Complete Ranking**
   - Arrange persons in order based on relationships
   - Fill in missing positions logically
   - Verify all constraints are satisfied

5. **Determine Required Information**
   - Find specific positions or rankings
   - Calculate total persons if needed
   - Answer comparative queries

---

## 🎯 Common Question Patterns

### **Pattern 1: Ranking Order**
*"Based on comparisons, who ranks where?"*

### **Pattern 2: Quantitative Position**
*"A is better than X persons. Find A's rank."*

### **Pattern 3: Total Persons**
*"A is better than X persons. How many total?"*

### **Pattern 4: Positional Logic**
*"A is immediately before B. Find relative positions."*

---

## 📈 Difficulty Levels

### **Easy Level (30%)**
- Simple superiority chains
- Direct ranking determination
- Basic comparative logic

### **Medium Level (50%)**
- Complex relationship networks
- Quantitative ranking problems
- Multiple constraint integration

### **Difficult Level (20%)**
- Multi-variable comparative problems
- Complex positional relationships
- Advanced logical integration

---

## 🧮 Mathematical Applications

### **Ranking Quantification**
\`\`\`
If A is better than X persons:
- A's rank = X + 1 (in descending order)
- Persons worse than A = X
- Persons better than A = Total - (X + 1)
\`\`\`

### **Position Ranges**
\`\`\`
"A is better than at least X persons":
- Minimum rank: X + 1
- Maximum possible rank: Total (if X are minimum)

"A is better than at most X persons":
- Maximum rank: X + 1
- Minimum possible rank: 1 (if X = 0)
\`\`\`

### **Comparative Arithmetic**
\`\`\`
If A > B by K positions:
- Rank difference = K
- Position span between A and B = K - 1 persons
\`\`\`

---

## 🎯 Special Cases and Exceptions

### **Case 1: Equal Ranking**
\`\`\`
When persons have same rank:
- "Better than" doesn't apply between equals
- Separate ranking criteria needed
- Positions may be interchangeable
\`\`\`

### **Case 2: Boundary Conditions**
\`\`\`
Best person: Better than all others
Worst person: Worse than all others
Middle ranking: Equal number better and worse
\`\`\`

### **Case 3: Immediacy Constraints**
\`\`\`
Immediately adjacent: No persons between
Cannot have gaps in immediate relationships
Forces specific position arrangements
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Comparative Direction Confusion**
❌ Mixing "better than" with positional meanings
✅ Clarify if comparison is about quality or position

### **Mistake 2: Quantification Error**
❌ Wrong interpretation of "better than X persons"
✅ "Better than X" means X persons are worse, so rank = X + 1

### **Mistake 3: Transitivity Assumption**
❌ Assuming all relationships are transitive
✅ Verify transitivity applies to superiority comparisons

### **Mistake 4: Positional Logic Error**
❌ Confusing immediate vs general before/after
✅ "Immediately" means adjacent, no persons between

---

## 🎓 Pro Tips for Success

1. **Clarify Comparative Meaning**: Understand if "better" means quality or position
2. **Apply Quantification Correctly**: "Better than X" = rank X + 1
3. **Build Relationship Networks**: Map all comparative connections
4. **Use Transitivity**: Extend relationships through logical chains
5. **Handle Immediacy**: "Immediately" means adjacent positions
6. **Consider Boundary Cases**: Check for best/worst/middle scenarios
7. **Verify Consistency**: Ensure all relationships work together

---

## 📊 Practice Examples

### **Example 1: Superiority Chain**
*"A is better than B, B is better than C, C is better than D. Who is the worst?"*

**Solution:**
- Ranking: A > B > C > D
- D is the worst (lowest ranking)

### **Example 2: Quantitative Ranking**
*"A is better than 4 persons in a group. What is A's rank?"*

**Solution:**
- A has 4 persons worse than him
- A is 1st among 5 persons (A + 4 worse)

### **Example 3: Positional Relationship**
*"A is immediately after B, C is immediately before D. If there are 6 persons, find possible arrangements."*

**Solution:**
- B-A must be adjacent (B then A)
- C-D must be adjacent (C then D)
- Possible arrangements depend on other constraints

### **Example 4: Complex Comparative**
*"A is better than B and C. B is better than D. C is better than D. A is better than 3 persons. How many total?"*

**Solution:**
- From comparisons: A > B, A > C, B > D, C > D
- A is better than 3 persons: A, B, C, D (4 persons)
- A has 3 persons worse: Total = 4 persons

### **Example 5: Range Analysis**
*"A is better than at least 2 persons and at most 4 persons. What are possible ranks for A?"*

**Solution:**
- Better than at least 2: Rank ≤ 3 (at most 2 better than A)
- Better than at most 4: Rank ≥ 2 (at least 1 better or A is best)
- Possible ranks: 2nd or 3rd

---

## 🔍 Integration with Other Topics

### **With Ascending-Descending Order**
- Apply comparative logic to ordered sequences
- Determine positions in sorted arrangements
- Use ranking relationships with order types

### **With Total Persons**
- Use comparative information to calculate totals
- Apply quantification to find group sizes
- Integrate ranking with size calculations

### **With Position Interchanges**
- Track how interchanges affect comparative rankings
- Maintain ranking relationships during position changes
- Update comparative positions after swaps

**Master comparative ranking problems to excel in relationship-based reasoning questions! ⚖️✨**`
};