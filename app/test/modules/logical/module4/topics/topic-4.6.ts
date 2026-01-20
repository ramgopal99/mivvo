import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_6: SubLesson = {
  id: "4.6",
  title: 'Comparison-Based Puzzles',
  status: 'completed',
  content: "`# âš–ï¸ Comparison-Based Puzzles

Comparison-based puzzles involve analyzing relationships between entities based on various attributes like age, height, weight, performance, etc. These puzzles require understanding comparative relationships and transitive reasoning to solve complex ranking problems.

---

## ðŸŽ¯ Understanding Comparison Puzzles

### **What are Comparison-Based Puzzles?**
Comparison puzzles involve entities compared based on attributes, requiring you to determine relative rankings and relationships. They test your ability to:
- **Apply comparative logic**
- **Use transitive reasoning**
- **Understand ranking relationships**
- **Solve complex comparison networks**

### **Key Characteristics**
- **Comparative attributes**: Age, height, weight, marks, etc.
- **Ranking relationships**: Better than, taller than, older than
- **Transitive logic**: If A > B and B > C, then A > C
- **Network relationships**: Complex comparison webs

---

## ðŸ§© Types of Comparisons

### **1. Direct Comparisons**
**Explicit relationship statements**
- "A is taller than B"
- "C is older than D"
- "E scores higher than F"

### **2. Indirect Comparisons**
**Relationships through intermediaries**
- "A is taller than someone who is taller than B"
- Transitive relationship chains
- Network-based comparisons

### **3. Multiple Attribute Comparisons**
**Different comparison criteria**
- Age, height, weight simultaneously
- Performance across different metrics
- Multi-dimensional rankings

---

## ðŸ“Š Problem-Solving Framework

### **Step 1: Identify Comparison Type**
- Note the attribute being compared
- Understand comparison direction (greater/lesser)
- Map all comparison statements

### **Step 2: Create Comparison Framework**
- List all entities involved
- Draw comparison relationship diagram
- Identify direct and indirect relationships

### **Step 3: Apply Transitive Logic**
- Use transitive property systematically
- Build complete comparison network
- Identify ranking positions

### **Step 4: Verify Relationships**
- Check all statements satisfied
- Ensure logical consistency
- Answer specific comparison questions

---

## ðŸŽ¯ Common Problem Types

### **Type 1: Age Comparison**
**Age-based ranking problems**
- "A is older than B"
- "C is youngest among them"
- "D is 5 years older than E"

### **Type 2: Performance Comparison**
**Score/rank-based problems**
- "A scored higher than B"
- "C got more marks than D"
- "E performed better than F"

### **Type 3: Physical Attribute Comparison**
**Height, weight, size comparisons**
- "A is taller than B"
- "C weighs more than D"
- "E is heavier than F"

---

## ðŸ› ï¸ Solving Techniques

### **1. Comparison Chain Method**
A > B > C > D
â†‘
E > F
- Create comparison chains
- Apply transitive relationships
- Build complete ranking

### **2. Matrix Method**
    A   B   C   D
A   -   >   >   <
B   <   -   >   <
C   <   <   -   <
D   >   >   >   -
- Create comparison matrix
- Fill based on given relationships
- Use transitivity to complete

### **3. Ranking Method**
- Assign relative positions
- Use given comparisons
- Determine exact rankings

---

## ðŸŽ¯ Practice Examples

### **Example 1: Simple Age Comparison**
**Conditions:**
1. Five people: A, B, C, D, E
2. A is older than B
3. B is older than C
4. D is older than E
5. C is older than D

**Solution:** A > B > C > D > E

### **Example 2: Complex Network**
**Conditions:**
1. Six students: P, Q, R, S, T, U
2. P scored higher than Q
3. R scored higher than S
4. T scored higher than U
5. Q scored higher than R
6. S scored higher than T

**Solution:** P > Q > R > S > T > U

### **Example 3: Multiple Attributes**
**Conditions:**
1. Four friends: X, Y, Z, W
2. X is taller than Y
3. Z is heavier than W
4. Y is taller than Z
5. X weighs more than W

**Solution:** Height: X > Y > Z > W, Weight: X > Z > W (Y unknown)

---

## ðŸ” Advanced Comparison Concepts

### **Multi-Attribute Comparisons**
Problems involving multiple comparison criteria simultaneously.

### **Conditional Comparisons**
Comparisons that depend on other factors or conditions.

### **Circular Comparisons**
Complex relationship loops requiring careful analysis.

---

## ðŸ“Š Comparison Logic Methods

### **Transitive Logic**
- **Direct Transitivity**: A > B, B > C â†’ A > C
- **Indirect Transitivity**: A > D, D > C â†’ A > C
- **Network Transitivity**: Complex relationship chains

### **Ranking Logic**
- **Position Assignment**: 1st, 2nd, 3rd positions
- **Relative Positioning**: Better/worse than specific number
- **Group Rankings**: Top 3, bottom 2, etc.

### **Attribute Logic**
- **Same Attribute**: Age-to-age, height-to-height
- **Different Attributes**: Age vs height comparisons
- **Conversion Logic**: Relating different attributes

---

## ðŸŽ¯ Common Pitfalls

### **Pitfall 1: Transitive Error**
âŒ Incorrect transitive application
âœ… Careful chain verification

### **Pitfall 2: Attribute Confusion**
âŒ Mixing different comparison attributes
âœ… Keep attributes separate

### **Pitfall 3: Direction Error**
âŒ Reversing comparison directions
âœ… Maintain correct relationship directions

---

## ðŸ› ï¸ Quick Solving Strategies

### **1. Comparison Diagram**
- Draw comparison arrows/lines
- Show relationship directions
- Identify transitive chains

### **2. Systematic Application**
- Start with direct comparisons
- Apply transitivity step by step
- Build complete relationship network

### **3. Verification Process**
- Check each comparison individually
- Verify transitive relationships
- Confirm overall ranking consistency

---

## ðŸ“ˆ Difficulty Levels

### **Easy Level**
- Few entities, simple comparisons
- Direct relationship chains
- Single attribute comparisons

### **Medium Level**
- Multiple entities, complex chains
- Mixed comparison directions
- Multiple attribute types

### **Hard Level**
- Many entities, complex networks
- Multiple attributes simultaneously
- Conditional and circular comparisons

---

## ðŸŽ¯ Pro Tips for Success

1. **Draw Comparison Diagrams**: Visual relationship mapping
2. **Apply Transitive Property**: Use A > B, B > C â†’ A > C
3. **Keep Attributes Separate**: Don't mix age and height comparisons
4. **Start with Direct**: Use given comparisons first
5. **Verify Chains**: Check each transitive step

---

## âš–ï¸ Practice Questions

### **Question 1**
**Conditions:**
1. Five students: A, B, C, D, E
2. A scored higher than B
3. B scored higher than C
4. D scored higher than E
5. C scored higher than D

**Who scored the highest?**

### **Question 2**
**Conditions:**
1. Four athletes: P, Q, R, S
2. P is taller than Q
3. R is shorter than S
4. Q is taller than R
5. P is taller than S

**What is the order from tallest to shortest?**

### **Question 3**
**Conditions:**
1. Six employees: X, Y, Z, W, V, U
2. X is senior to Y
3. Z joined before W
4. Y is junior to Z
5. V joined after U
6. W is senior to V

**Who joined first?**

**Master comparison-based puzzles for ranking and relationship analysis! âš–ï¸âœ¨**`"
};
