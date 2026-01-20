import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: "4.4",
  title: 'Floor-Based Puzzles',
  status: 'completed',
  content: "`# ðŸ¢ Floor-Based Puzzles

Floor-based puzzles involve arranging people or objects across multiple floors in a building based on various constraints. These puzzles are common in competitive exams and require understanding of vertical positioning, floor relationships, and complex constraint interactions.

---

## ðŸŽ¯ Understanding Floor Puzzles

### **What are Floor-Based Puzzles?**
Floor puzzles involve arranging entities (people, offices, apartments) across multiple building floors based on given constraints. They test your ability to:
- **Understand vertical positioning**
- **Apply floor relationship logic**
- **Interpret multi-level constraints**
- **Solve complex hierarchical arrangements**

### **Key Characteristics**
- **Multi-floor buildings**: 4-10 floors typically
- **Vertical relationships**: Above-below, top-bottom
- **Floor-specific constraints**: Floor-based rules
- **Entity attributes**: Age, profession, preferences, etc.

---

## ðŸ§© Basic Floor Puzzle Concepts

### **Floor Positioning Terms**
- **Ground Floor/Bottom Floor**: Floor 1
- **Top Floor**: Highest floor
- **Middle Floors**: Central floors
- **Adjacent Floors**: Next to each other vertically

### **Position Relationships**
- **Immediately Above/Below**: Next floor relationship
- **Not Immediately Above/Below**: Separated by floors
- **Same Floor**: Horizontal relationships
- **Different Floors**: Vertical separation

---

## ðŸ“Š Problem-Solving Framework

### **Step 1: Understand Building Structure**
- Identify number of floors
- Note floor numbering (bottom-up or top-down)
- Understand building layout

### **Step 2: Analyze Constraints**
- Identify floor-specific requirements
- Note vertical relationship constraints
- Map entity attributes and preferences

### **Step 3: Create Floor Framework**
- Draw vertical floor representation
- Mark known floor assignments
- Identify relationship patterns

### **Step 4: Apply Logic Systematically**
- Place definite floor assignments
- Apply vertical constraints
- Use elimination techniques

---

## ðŸŽ¯ Common Problem Types

### **Type 1: Direct Floor Assignment**
**Specific floor requirements**
- "A lives on floor 3"
- "B is on the top floor"
- "C is not on ground floor"

### **Type 2: Relative Floor Positioning**
**Vertical relationship constraints**
- "A lives above B"
- "C is immediately below D"
- "E is not on adjacent floors to F"

### **Type 3: Attribute-Based Constraints**
**Floor assignments based on attributes**
- "Doctor lives above Engineer"
- "Oldest person on top floor"
- "Manager not on same floor as junior"

---

## ðŸ› ï¸ Solving Techniques

### **1. Floor Grid Method**
Floor 5: ________
Floor 4: ________
Floor 3: ________
Floor 2: ________
Floor 1: ________
- Create vertical floor layout
- Fill systematically
- Track relationships

### **2. Attribute Mapping**
- Create tables for entity attributes
- Map floor constraints to attributes
- Use logical deduction

### **3. Possibility Elimination**
- List all possible floor assignments
- Eliminate based on constraints
- Find valid arrangement

---

## ðŸŽ¯ Practice Examples

### **Example 1: Simple Floor Assignment**
**Conditions:**
1. Five people: A, B, C, D, E on 5 floors
2. A lives on floor 3
3. B lives immediately above A
4. C lives on ground floor
5. D lives above E

**Solution:** Systematic floor assignment based on constraints.

### **Example 2: Attribute-Based**
**Conditions:**
1. Five professionals: Doctor, Engineer, Teacher, Lawyer, Accountant
2. Five floors: 1-5 (1=ground)
3. Doctor lives above Engineer
4. Teacher lives on floor 3
5. Lawyer lives immediately below Accountant
6. Engineer is not on ground floor

**Solution:** Map professions to floors using relationships.

### **Example 3: Complex Relationships**
**Conditions:**
1. Six friends: P, Q, R, S, T, U
2. Six floors: 1-6
3. P lives on even numbered floor
4. Q lives immediately above R
5. S lives on floor above T
6. U lives on top floor
7. No two friends on adjacent floors except specified

**Solution:** Apply all constraints systematically.

---

## ðŸ” Advanced Floor Concepts

### **Multi-Building Arrangements**
Problems involving multiple buildings with floor relationships.

### **Floor-Specific Rules**
Different rules applying to different floor ranges.

### **Dynamic Floor Assignments**
Conditional floor assignments based on other factors.

---

## ðŸ“Š Floor Logic Methods

### **Absolute Floor Positioning**
- **Specific floors**: Direct floor assignments
- **Floor ranges**: Ground, middle, top floor categories
- **Even/Odd floors**: Parity-based constraints

### **Relative Floor Positioning**
- **Above/Below**: Vertical position relationships
- **Adjacent floors**: Immediate floor relationships
- **Floor separation**: Minimum/maximum floor gaps

### **Attribute-Floor Mapping**
- **Age-based**: Older people on higher/lower floors
- **Profession-based**: Job role floor assignments
- **Preference-based**: Personal preference constraints

---

## ðŸŽ¯ Common Pitfalls

### **Pitfall 1: Floor Numbering Confusion**
âŒ Mixing floor numbering systems
âœ… Clarify ground floor numbering

### **Pitfall 2: Above/Below Misinterpretation**
âŒ Confusing immediately above/below
âœ… Distinguish between adjacent and general above/below

### **Pitfall 3: Attribute Mapping Errors**
âŒ Wrong attribute-floor assignments
âœ… Careful attribute constraint application

---

## ðŸ› ï¸ Quick Solving Strategies

### **1. Floor Layout Creation**
- Draw clear vertical floor diagram
- Label floors clearly (1=bottom to 5=top)
- Mark known assignments

### **2. Constraint Organization**
- List all floor constraints separately
- Group by constraint type
- Identify most restrictive conditions

### **3. Systematic Assignment**
- Start with definite floor assignments
- Apply vertical relationship constraints
- Use attribute mapping for remaining positions

---

## ðŸ“ˆ Difficulty Levels

### **Easy Level**
- 4-5 floors, few constraints
- Direct floor assignments
- Simple relationships

### **Medium Level**
- 5-7 floors, mixed constraints
- Attribute-based assignments
- Complex relationships

### **Hard Level**
- 7+ floors, multiple constraints
- Complex attribute interactions
- Multi-level relationships

---

## ðŸŽ¯ Pro Tips for Success

1. **Draw Floor Diagram**: Always create vertical floor layout
2. **Clarify Floor Numbering**: Know if 1 is ground or top floor
3. **Start with Definite**: Place known floor assignments first
4. **Apply Relationships**: Use vertical constraints systematically
5. **Track Attributes**: Map entity attributes to floor constraints

---

## ðŸ¢ Practice Questions

### **Question 1**
**Conditions:**
1. Five people: A, B, C, D, E on 5 floors
2. A lives on floor 2
3. B lives immediately above A
4. C lives on ground floor
5. D lives above E

**Who lives on floor 4?**

### **Question 2**
**Conditions:**
1. Four professionals: Doctor, Engineer, Teacher, Lawyer
2. Four floors: 1-4 (1=ground)
3. Doctor lives above Engineer
4. Teacher lives on floor 2
5. Lawyer lives on top floor

**Who lives on floor 3?**

### **Question 3**
**Conditions:**
1. Six friends: P, Q, R, S, T, U
2. Six floors: 1-6
3. P lives on even numbered floor
4. Q lives immediately above R
5. S lives two floors above T
6. U lives on floor 6

**How many floors are between Q and S?**

**Master floor-based puzzles for vertical reasoning skills! ðŸ¢âœ¨**`"
};
