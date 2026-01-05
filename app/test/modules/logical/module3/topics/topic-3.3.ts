import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: "3.3",
  title: 'Double Row Seating',
  status: 'completed',
  content: `# 📊 Double Row Seating

Double row seating arrangements involve two parallel rows of people facing each other. These problems are more complex than single-row arrangements and require understanding both intra-row and inter-row relationships. Master the techniques for solving two-row facing arrangements.

---

## 🎯 Understanding Double Row Arrangements

### **What are Double Row Arrangements?**
Double row arrangements consist of two parallel rows with people facing each other. These problems test your ability to:
- **Understand facing relationships**
- **Apply cross-row positioning logic**
- **Interpret directional conditions**
- **Manage complex position interactions**

---

## 📊 Types of Double Row Arrangements

### **1. Facing Each Other**
Two rows facing opposite directions (North-South).

### **2. Same Direction Facing**
Both rows facing the same direction.

### **3. Complex Facing Patterns**
Mixed directional orientations.

---

## 🛠️ Problem-Solving Framework

### **Step 1: Visualize the Setup**
- Draw two parallel lines
- Mark direction arrows
- Label positions clearly
- Note facing relationships

### **Step 2: Apply Intra-Row Logic**
- Handle relationships within each row
- Apply left-right positioning
- Consider row-specific constraints

### **Step 3: Apply Inter-Row Logic**
- Handle cross-row relationships
- Apply facing position logic
- Consider opposite positioning

### **Step 4: Integrate Both Aspects**
- Combine intra and inter-row constraints
- Verify all conditions
- Resolve any conflicts

---

## 🎯 Key Concepts

### **Facing Relationships**
- **Directly opposite**: Same position number
- **One position away**: Adjacent diagonally
- **Two positions away**: Two steps apart

### **Row Logic**
- **Same row**: Adjacent relationships
- **Cross row**: Facing relationships
- **Position mapping**: Row A position ↔ Row B position

---

## 📊 Position Mapping

### **Direct Facing**
| Row A | Row B |
|-------|-------|
| 1     | 1     |
| 2     | 2     |
| 3     | 3     |

### **Adjacent Facing**
| Row A | Row B |
|-------|-------|
| 1     | 2     |
| 2     | 1,3   |
| 3     | 2     |

---

## 🎯 Practice Examples

### **Example 1: Basic Double Row**
**Question:** 6 people in 2 rows of 3 each, facing each other. A is opposite C. B is left of A. D is right of C.

**Solution:**
- Row 1: _ B A _
- Row 2: _ _ C D (since facing Row 1)
- Map positions and apply logic

### **Example 2: Complex Relationships**
**Question:** Two rows, 4 people each. P opposite Q. R is second from left in his row. S is neighbor of P.

**Analysis:**
- Apply facing constraints
- Use intra-row positioning
- Combine both logics

---

## 🔍 Common Patterns

### **Pattern 1: Direct Opposites**
People specified as sitting directly opposite each other.

### **Pattern 2: Adjacent Opposites**
People sitting diagonally opposite (one position away).

### **Pattern 3: Row-Based Relationships**
Relationships within the same row or across rows.

---

## 🧩 Solving Techniques

### **1. Position Grid Method**
- Draw two parallel lines
- Mark position numbers
- Show facing arrows

### **2. Facing Matrix**
- Create position correspondence table
- Mark known facing relationships
- Fill in deduced positions

### **3. Row-by-Row Approach**
- Solve one row first
- Use facing clues to fill other row
- Verify cross-row relationships

---

## 📈 Advanced Double Row Problems

### **Unequal Rows**
Different number of people in each row.

### **Complex Facing**
Non-standard facing arrangements.

### **Multiple Constraints**
Complex web of relationships.

---

## 🎯 Pro Tips for Success

1. **Draw Clear Diagrams**: Two parallel lines with facing arrows
2. **Label Positions**: Number positions in each row
3. **Handle One Row First**: Solve easier row first
4. **Use Facing Logic**: Understand opposite and adjacent positions
5. **Verify Cross-Links**: Check relationships between rows

---

## 🧮 Quick Formulas

### **Facing Position Calculation**
- **Direct opposite**: Same position number
- **Left adjacent**: Position - 1
- **Right adjacent**: Position + 1

### **Row Distance**
- **Same row**: |Position A - Position B|
- **Facing row**: Position mapping based on facing

---

## ⚡ Quick Solving Tricks

### **Trick 1: Facing Symmetry**
- Opposite positions are mirror images
- Use symmetry to find corresponding positions

### **Trick 2: Position Limits**
- End positions have limited facing options
- Use boundary constraints effectively

### **Trick 3: Row Independence**
- Solve intra-row relationships first
- Then apply inter-row constraints

### **Trick 4: Facing Chain**
- A opposite B, B opposite C → A and C relationship
- Create facing relationship chains

### **Trick 5: Elimination Matrix**
- Create grid of possible positions
- Mark facing constraints
- Eliminate impossible combinations

---

## 🎯 Practice Questions

### **Question 1**
Two rows of 3 people each facing each other. A is opposite C. B is immediate left of A. D is immediate right of C. Who is opposite B?

### **Question 2**
Four people in each row facing each other. P is second from left in row 1. Q is opposite P. R is neighbor of Q. S is opposite R. Who is at the ends?

### **Question 3**
Two parallel rows facing north and south. A in north row, B in south row. A is directly opposite B. C is left of A. D is right of B. Who is opposite C?

**Master double row seating arrangements to handle complex facing relationship problems! 📊✨**`
};
