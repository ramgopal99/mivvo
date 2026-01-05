import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_4: SubLesson = {
  id: "3.4",
  title: 'Circular Seating Arrangement',
  status: 'completed',
  content: `# ⭕ Circular Seating Arrangement

Circular seating arrangements involve people sitting in a circle, creating unique positional relationships without fixed endpoints. These problems are common in competitive exams and require understanding of circular logic, adjacent relationships, and directional positioning.

---

## 🎯 Understanding Circular Arrangements

### **What are Circular Arrangements?**
Circular arrangements involve people seated in a circle, where everyone has two neighbors and there are no "end" positions. These problems test your ability to:
- **Understand circular positioning**
- **Apply clockwise/anticlockwise logic**
- **Handle adjacent relationships**
- **Manage opposite positioning**

---

## ⭕ Types of Circular Arrangements

### **1. Clockwise Arrangement**
People arranged in clockwise direction.

### **2. Anti-Clockwise Arrangement**
People arranged in anti-clockwise direction.

### **3. Mixed Arrangements**
Combination of both directions.

---

## 🛠️ Problem-Solving Framework

### **Step 1: Understand the Circle**
- Note total number of people
- Identify any fixed positions
- Determine direction (clockwise/anti-clockwise)
- Note special positions (adjacent, opposite)

### **Step 2: Create Position Circle**
- Draw circle with position slots
- Mark any known positions
- Note directional flow

### **Step 3: Apply Adjacent Logic**
- Handle immediate neighbor relationships
- Apply clockwise/anti-clockwise constraints
- Consider "not adjacent" conditions

### **Step 4: Apply Opposite Logic**
- Handle directly opposite relationships
- Calculate opposite positions
- Consider diagonal relationships

---

## 🎯 Key Concepts

### **Positional Relationships**
- **Adjacent**: Immediate neighbors (left and right)
- **Opposite**: Person directly across (diameter)
- **Second neighbor**: One person away
- **Third neighbor**: Two persons away

### **Circular Logic**
- **Clockwise**: Right side neighbor
- **Anti-clockwise**: Left side neighbor
- **No ends**: Every person has two neighbors
- **Wrap around**: Position connects to itself

---

## 📊 Position Calculations

### **Opposite Position Formula**
- **Total people = N**
- **Opposite of position P** = P + (N/2)
- **If result > N**: Subtract N

### **Adjacent Positions**
- **Clockwise neighbor**: Position + 1
- **Anti-clockwise neighbor**: Position - 1
- **Wrap around**: Position N+1 = Position 1

---

## 🎯 Practice Examples

### **Example 1: Basic Circular**
**Question:** 8 people in circle. A is opposite C. B is immediate right of A. D is 2nd to left of C.

**Solution:**
1. Draw circle with 8 positions
2. A opposite C: Position relationship
3. B right of A: Clockwise positioning
4. D 2nd left of C: Anti-clockwise counting

### **Example 2: Complex Relationships**
**Question:** 6 people A,B,C,D,E,F in circle. A is between B and C. D is opposite A. E is immediate left of F.

**Analysis:**
- Apply between relationship
- Use opposite positioning
- Handle left/right constraints

---

## 🔍 Common Patterns

### **Pattern 1: Adjacent Constraints**
Problems focusing on neighbor relationships.

### **Pattern 2: Opposite Relationships**
Problems with direct opposite positioning.

### **Pattern 3: Directional Flow**
Problems with clockwise/anti-clockwise specifications.

---

## 🧩 Solving Techniques

### **1. Circle Drawing Method**
- Draw actual circle
- Mark positions 1 to N
- Show directional arrows

### **2. Position Number Method**
- Assign numbers 1 to N
- Use modular arithmetic
- Calculate relative positions

### **3. Clockwise Reference**
- Fix one position
- Place others relative to it
- Use directional consistency

---

## 📈 Advanced Circular Problems

### **Complex Constraints**
Multiple overlapping conditions.

### **Mixed Directions**
Clockwise and anti-clockwise elements.

### **Variable Positions**
Positions based on other variables.

---

## 🎯 Pro Tips for Success

1. **Draw Circle**: Always sketch the circular arrangement
2. **Number Positions**: Label 1 to N clockwise
3. **Know Formulas**: Opposite = P + N/2
4. **Handle Wrap-around**: Position N+1 = Position 1
5. **Check Consistency**: Verify all neighbor relationships

---

## 🧮 Quick Formulas

### **Position Relationships**
- **Opposite**: P + (N ÷ 2)
- **Clockwise neighbor**: P + 1 (mod N)
- **Anti-clockwise neighbor**: P - 1 (mod N)
- **Two away clockwise**: P + 2 (mod N)

### **Distance Calculations**
- **Clockwise distance**: Min(|A-B|, N-|A-B|)
- **Direct distance**: Min(|A-B|, N-|A-B|)
- **Opposite check**: |A-B| = N/2

---

## ⚡ Quick Solving Tricks

### **Trick 1: Opposite Symmetry**
- Opposite positions are fixed pairs
- Use symmetry to solve relationships

### **Trick 2: Adjacent Chains**
- A next to B, B next to C → A and C relationship
- Create neighbor relationship chains

### **Trick 3: Position Limits**
- Maximum people between two positions
- Minimum distance constraints

### **Trick 4: Modular Arithmetic**
- Use clock arithmetic for positions
- Handle wrap-around automatically

### **Trick 5: Fixed Reference**
- Fix one person's position
- Place others relative to reference
- Rotate entire arrangement if needed

---

## 🎯 Practice Questions

### **Question 1**
Eight people are sitting in a circle. A is third to left of C. B is second to right of C. D is not neighbor of A. Who is opposite to C?

### **Question 2**
Six friends in circle facing center. P is between Q and R. S is opposite P. T is immediate left of S. Who is opposite Q?

### **Question 3**
Ten people in circle. A is fourth to right of B. C is third to left of B. D is second to right of A. Who is opposite to B?

**Master circular seating arrangements to handle problems without fixed endpoints! ⭕✨**`
};
