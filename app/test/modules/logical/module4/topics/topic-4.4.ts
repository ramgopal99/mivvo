import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: "4.4",
  title: 'Box / Distribution Puzzles',
  status: 'completed',
  content: `# 📦 Box / Distribution Puzzles

Box and distribution puzzles involve allocating items, resources, or entities into containers or groups based on various constraints. These puzzles require systematic distribution logic and constraint satisfaction to solve complex allocation problems.

---

## 🎯 Understanding Distribution Puzzles

### **What are Box/Distribution Puzzles?**
These puzzles involve distributing items, people, or resources into boxes, groups, or categories based on given constraints. They test your ability to:
- **Apply systematic allocation logic**
- **Understand distribution constraints**
- **Use constraint satisfaction techniques**
- **Solve complex allocation scenarios**

### **Key Characteristics**
- **Multiple containers/groups**: Boxes, rooms, categories
- **Distribution rules**: What can/cannot go where
- **Capacity constraints**: Limits on container contents
- **Relationship constraints**: Item interaction rules

---

## 🧩 Types of Distribution Problems

### **1. Box Distribution**
**Allocating items into boxes with constraints**
- Different colored boxes
- Size/capacity constraints
- Content relationship rules
- Box-specific requirements

### **2. Group Distribution**
**Assigning people/objects to groups**
- Team or category assignments
- Group size limitations
- Inter-group relationship constraints
- Balance requirements

### **3. Resource Allocation**
**Distributing resources systematically**
- Limited resource distribution
- Fair allocation requirements
- Preference-based assignments
- Constraint optimization

---

## 📊 Problem-Solving Framework

### **Step 1: Understand Distribution Requirements**
- Identify containers and their properties
- Note item characteristics and constraints
- Understand distribution rules

### **Step 2: Create Distribution Framework**
- List all containers and items
- Create allocation matrix
- Map known assignments

### **Step 3: Apply Constraints Systematically**
- Start with definite assignments
- Apply distribution rules
- Use elimination techniques

### **Step 4: Verify Distribution**
- Check all constraints satisfied
- Ensure balanced distribution
- Answer specific questions

---

## 🎯 Common Problem Types

### **Type 1: Box Capacity Problems**
**Items distributed into boxes with size limits**
- "Box A can hold maximum 3 items"
- "Box B must have at least 2 items"
- "Each box gets equal number of items"

### **Type 2: Item Relationship Constraints**
**Items cannot be together or must be together**
- "A and B cannot be in same box"
- "C and D must be in same box"
- "E must be with F or G"

### **Type 3: Box Property Constraints**
**Boxes have specific requirements**
- "Red box gets only small items"
- "Large box gets heavy items"
- "Square box gets cubic items"

---

## 🛠️ Solving Techniques

### **1. Distribution Matrix Method**
Box A: [ ] [ ] [ ]
Box B: [ ] [ ] [ ]
Box C: [ ] [ ]
- Create allocation framework
- Fill systematically
- Track constraints

### **2. Possibility Grid**
- List all possible allocations
- Mark valid/invalid combinations
- Use elimination to find solution

### **3. Logical Deduction**
- Apply distribution rules
- Use relationship constraints
- Build solution progressively

---

## 🎯 Practice Examples

### **Example 1: Simple Box Distribution**
**Conditions:**
1. Three boxes: A, B, C
2. Five items: 1, 2, 3, 4, 5
3. Box A gets 2 items
4. Box B gets 2 items
5. Box C gets 1 item
6. Item 1 cannot be with item 2

**Solution:** Systematic distribution based on constraints.

### **Example 2: Complex Relationships**
**Conditions:**
1. Four boxes: Red, Blue, Green, Yellow
2. Eight balls: Different colors and sizes
3. Red box gets only large balls
4. Blue box gets only small balls
5. Green box gets mixed sizes
6. Yellow box gets medium balls only
7. No two same color balls in same box

**Solution:** Apply color and size constraints carefully.

### **Example 3: Group Assignment**
**Conditions:**
1. Three groups: Alpha, Beta, Gamma
2. Nine students: A-I
3. Each group gets 3 students
4. A and B must be in same group
5. C cannot be with D
6. E must be in Alpha group
7. F and G cannot be in same group as H

**Solution:** Apply relationship constraints systematically.

---

## 🔍 Advanced Distribution Concepts

### **Multi-Constraint Distributions**
Complex problems with multiple interacting constraints.

### **Optimization Distributions**
Finding optimal distribution based on criteria.

### **Dynamic Distributions**
Distributions that change based on conditions.

---

## 📊 Distribution Logic Methods

### **Capacity-Based Logic**
- **Fixed capacity**: Exact number requirements
- **Range capacity**: Minimum/maximum limits
- **Proportional distribution**: Percentage-based allocation

### **Relationship-Based Logic**
- **Compatibility rules**: What can be together
- **Exclusion rules**: What cannot be together
- **Dependency rules**: Conditional allocations

### **Property-Based Logic**
- **Attribute matching**: Item properties match container requirements
- **Quality constraints**: Quality-based distribution rules
- **Preference logic**: Preference-based allocations

---

## 🎯 Common Pitfalls

### **Pitfall 1: Capacity Miscalculation**
❌ Wrong capacity constraint application
✅ Careful capacity limit checking

### **Pitfall 2: Relationship Confusion**
❌ Mixing compatibility and exclusion rules
✅ Clear relationship rule application

### **Pitfall 3: Incomplete Distribution**
❌ Not distributing all items
✅ Ensure all items are allocated

---

## 🛠️ Quick Solving Strategies

### **1. Framework Creation**
- Create clear distribution matrix
- List all constraints systematically
- Mark known allocations

### **2. Systematic Application**
- Start with most restrictive constraints
- Apply relationship rules
- Fill remaining allocations

### **3. Verification Process**
- Check all capacity limits
- Verify relationship constraints
- Ensure complete distribution

---

## 📈 Difficulty Levels

### **Easy Level**
- Few containers, simple constraints
- Direct capacity assignments
- Basic relationship rules

### **Medium Level**
- Multiple containers, mixed constraints
- Complex relationship interactions
- Attribute-based distributions

### **Hard Level**
- Many containers, complex constraints
- Multiple constraint interactions
- Optimization requirements

---

## 🎯 Pro Tips for Success

1. **Create Distribution Matrix**: Visual allocation framework
2. **List All Constraints**: Systematic constraint organization
3. **Start with Definite**: Place known allocations first
4. **Apply Relationships**: Use compatibility rules carefully
5. **Check Capacities**: Ensure capacity limits are respected

---

## 📦 Practice Questions

### **Question 1**
**Conditions:**
1. Three boxes: A, B, C
2. Six items: 1, 2, 3, 4, 5, 6
3. Box A: 2 items
4. Box B: 2 items
5. Box C: 2 items
6. Item 1 cannot be with item 2
7. Item 3 must be with item 4

**Which item is in Box C?**

### **Question 2**
**Conditions:**
1. Four groups: P, Q, R, S
2. Eight students: A-H
3. Each group gets 2 students
4. A and B must be in same group
5. C cannot be with D
6. E and F must be in different groups

**How many different valid distributions are possible?**

### **Question 3**
**Conditions:**
1. Five containers: Red, Blue, Green, Yellow, Purple
2. Ten balls: Different sizes and weights
3. Red: Large balls only
4. Blue: Small balls only
5. Green: Heavy balls only
6. Yellow: Light balls only
7. Purple: Medium balls only

**What is the minimum number of balls that can be distributed?**

**Master box and distribution puzzles for systematic allocation skills! 📦✨**`
};