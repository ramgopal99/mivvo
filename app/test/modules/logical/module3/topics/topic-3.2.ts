import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_2: SubLesson = {
  id: "3.2",
  title: 'Linear Arrangement (Single Row)',
  status: 'completed',
  content: `# 📏 Linear Arrangement (Single Row)

Linear arrangement problems involve arranging people or objects in a single straight line based on given conditions. These problems are fundamental to seating arrangement questions and appear frequently in competitive exams. Master the techniques for solving single-row arrangement problems.

---

## 🎯 Understanding Linear Arrangements

### **What are Linear Arrangements?**
Linear arrangements involve positioning people or objects in a straight line, either horizontally or vertically. These problems test your ability to:
- **Understand positional relationships**
- **Apply left-right positioning logic**
- **Interpret directional conditions**
- **Use systematic placement techniques**

---

## 📏 Types of Linear Arrangements

### **1. Single Row Horizontal**
People/objects arranged from left to right in a straight line.

### **2. Single Row Vertical**  
People/objects arranged from top to bottom in a straight line.

### **3. Mixed Arrangements**
Combination of horizontal and vertical arrangements.

---

## 🛠️ Problem-Solving Framework

### **Step 1: Understand the Problem**
- Identify total number of people/objects
- Note any fixed positions
- Understand directional constraints (left, right, etc.)
- Identify relationships between people

### **Step 2: Create Position Slots**
- Draw horizontal line with position slots
- Mark known positions
- Note directional relationships

### **Step 3: Apply Constraints**
- Place people with fixed positions first
- Use relative positioning (next to, opposite, etc.)
- Apply directional logic (left of, right of)

### **Step 4: Fill Remaining Positions**
- Use elimination technique
- Apply logical deduction
- Verify all conditions are satisfied

---

## 🎯 Key Concepts in Linear Arrangements

### **Positional Terms**
- **Leftmost/Rightmost**: End positions
- **Second from left/right**: Specific positions
- **Middle position**: Center of arrangement
- **Immediate left/right**: Adjacent positions

### **Directional Logic**
- **A is left of B** → A ... B (A before B)
- **A is right of B** → B ... A (A after B)
- **A is next to B** → A B or B A (adjacent)
- **A is not next to B** → Gap between A and B

---

## 📊 Practice Examples

### **Example 1: Basic Linear Arrangement**
**Question:** Six friends A, B, C, D, E, F are sitting in a row. A is sitting second from left. C is sitting immediate right of A. D is not sitting next to C. Who is sitting at the extreme right?

**Solution:**
1. Positions: _ _ _ _ _ _
2. A is 2nd from left: _ A _ _ _ _
3. C is immediate right of A: _ A C _ _ _
4. D is not next to C, so D cannot be in position 4
5. Remaining positions for D, E, F with constraints

### **Example 2: Complex Relationships**
**Question:** P, Q, R, S, T, U are sitting in a row. P is not at end. Q is second from right. R is left of P but right of S. T is neighbor of U.

**Analysis:**
- Apply each condition systematically
- Use position slots to visualize
- Eliminate impossible arrangements

---

## 🔍 Common Patterns

### **Pattern 1: Fixed Position + Relative**
One person has fixed position, others positioned relatively.

### **Pattern 2: Multiple Relationships**
Complex web of relationships between multiple people.

### **Pattern 3: Conditional Positioning**
Positions based on specific conditions or rules.

---

## 🧩 Solving Techniques

### **1. Position Mapping**
- Draw line with position numbers
- Mark known positions
- Use arrows for relationships

### **2. Elimination Method**
- Consider all possible positions
- Eliminate based on given conditions
- Narrow down to final arrangement

### **3. Logical Deduction**
- Start with definite information
- Build relationships step by step
- Verify consistency

---

## 📈 Advanced Linear Arrangements

### **Complex Constraints**
Problems with multiple conditions and relationships.

### **Variable Positions**
Positions that depend on other variables.

### **Integrated Reasoning**
Combining linear arrangement with other reasoning types.

---

## 🎯 Pro Tips for Success

1. **Draw Diagrams**: Always sketch the arrangement line
2. **Use Numbers**: Mark positions 1, 2, 3... from left to right
3. **Start with Known**: Place people with definite positions first
4. **Apply Logic**: Use directional and positional logic consistently
5. **Verify Twice**: Double-check all conditions are satisfied

---

## 🧮 Quick Formulas

### **Position Calculations**
- **Total positions** = Number of people
- **Middle position** = (Total + 1) ÷ 2
- **nth from left** = Position n
- **nth from right** = Position (Total - n + 1)

### **Distance Calculations**
- **Positions between A and B** = |Position A - Position B| - 1
- **Adjacent check** = |Position A - Position B| = 1

---

## ⚡ Quick Solving Tricks

### **Trick 1: End Position Logic**
- Extreme positions have only one neighbor
- Use end constraints to limit possibilities

### **Trick 2: Adjacent Relationships**
- "Next to" means exactly one position away
- "Not next to" means at least one position gap

### **Trick 3: Direction Chain**
- A left of B, B left of C → A left of C
- Create relationship chains for complex arrangements

### **Trick 4: Position Symmetry**
- Mirror positions for opposite relationships
- Use symmetry to verify arrangements

### **Trick 5: Elimination Grid**
- Create table of possible positions
- Mark impossible positions with X
- Find positions with single possibility

---

## 🎯 Practice Questions

### **Question 1**
Eight students are sitting in a row. A is third from left. B is second from right. C is between A and B. Where is C sitting?

### **Question 2**
Five people P, Q, R, S, T are in a line. P is not at end. Q is left of R. S is right of T. Who is in the middle?

### **Question 3**
Six friends sitting in a row facing north. A is second from left. C is immediate right of A. D is not next to C. B is at one end. Who is at the right end?

**Master linear arrangements to build a strong foundation for complex seating arrangement problems! 📏✨**`
};
