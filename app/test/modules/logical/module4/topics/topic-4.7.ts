import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_7: SubLesson = {
  id: "4.7",
  title: 'Scheduling Puzzles',
  status: 'completed',
  content: "`# ðŸ“… Scheduling Puzzles

Scheduling puzzles involve arranging events, appointments, or activities in specific time slots based on various constraints. These puzzles require understanding of time management, sequence logic, and constraint satisfaction to solve complex scheduling problems.

---

## ðŸŽ¯ Understanding Scheduling Puzzles

### **What are Scheduling Puzzles?**
Scheduling puzzles involve arranging activities, meetings, or events in time slots based on given constraints. They test your ability to:
- **Apply time management logic**
- **Understand sequence relationships**
- **Interpret temporal constraints**
- **Solve complex time-based arrangements**

### **Key Characteristics**
- **Time-based positioning**: Hours, days, weeks
- **Sequence constraints**: Before/after relationships
- **Duration limits**: Activity time requirements
- **Resource constraints**: Person/venue availability

---

## ðŸ§© Types of Scheduling Problems

### **1. Time Slot Scheduling**
**Assigning activities to specific time slots**
- Meeting room bookings
- Class schedule arrangements
- Event time assignments

### **2. Sequence Scheduling**
**Ordering activities with precedence constraints**
- Task completion sequences
- Process flow arrangements
- Activity dependency chains

### **3. Resource Scheduling**
**Allocating resources with availability constraints**
- Person assignments to tasks
- Equipment allocation
- Venue booking conflicts

---

## ðŸ“Š Problem-Solving Framework

### **Step 1: Understand Time Framework**
- Identify time slots available
- Note activity durations
- Understand scheduling constraints

### **Step 2: Analyze Constraints**
- Map activity requirements
- Note precedence relationships
- Identify resource conflicts

### **Step 3: Create Schedule Framework**
- Draw time slot layout
- Mark known assignments
- Identify constraint patterns

### **Step 4: Apply Scheduling Logic**
- Place definite assignments first
- Apply precedence constraints
- Resolve conflicts systematically

---

## ðŸŽ¯ Common Problem Types

### **Type 1: Meeting Scheduling**
**Meeting room and time assignments**
- "Meeting A must be before meeting B"
- "Room X cannot be used after 5 PM"
- "Person P cannot attend meetings at same time"

### **Type 2: Class Scheduling**
**Subject and teacher assignments**
- "Math class before Science class"
- "Teacher T available only mornings"
- "Room capacity constraints"

### **Type 3: Event Scheduling**
**Event time and venue assignments**
- "Event A must be after Event B"
- "Venue V booked for Event C"
- "Guest G cannot attend overlapping events"

---

## ðŸ› ï¸ Solving Techniques

### **1. Time Grid Method**
Time: 9AM 10AM 11AM 12PM 1PM
Mon:  [ ]  [ ]  [ ]  [ ]  [ ]
Tue:  [ ]  [ ]  [ ]  [ ]  [ ]
- Create time-activity matrix
- Fill based on constraints
- Track conflicts

### **2. Sequence Chain Method**
- Map precedence relationships
- Identify critical paths
- Apply sequence logic

### **3. Conflict Resolution**
- Identify scheduling conflicts
- Apply resolution rules
- Find optimal arrangements

---

## ðŸŽ¯ Practice Examples

### **Example 1: Simple Meeting Schedule**
**Conditions:**
1. Four meetings: A, B, C, D
2. Four time slots: 9AM, 10AM, 11AM, 12PM
3. Meeting A must be at 9AM
4. Meeting B before Meeting C
5. Meeting D at 12PM
6. No meetings at same time

**Solution:** A(9AM), B(10AM), C(11AM), D(12PM)

### **Example 2: Complex Resource Schedule**
**Conditions:**
1. Three doctors: P, Q, R
2. Five patients: 1, 2, 3, 4, 5
3. Time slots: 9AM, 10AM, 11AM, 2PM, 3PM
4. Doctor P specializes in surgery
5. Doctor Q available only mornings
6. Doctor R handles emergencies
7. Patient 1 needs surgery
8. Patient 3 is emergency case

**Solution:** Apply specialization and availability constraints.

### **Example 3: Event Sequence**
**Conditions:**
1. Six events: X, Y, Z, W, V, U
2. Six time slots: T1-T6
3. Event X must be first
4. Event Y immediately after X
5. Event Z before Event W
6. Event V and U cannot be consecutive
7. Event W must be in T6

**Solution:** Apply sequence and positioning constraints.

---

## ðŸ” Advanced Scheduling Concepts

### **Multi-Resource Scheduling**
Problems involving multiple resources simultaneously.

### **Time Window Constraints**
Activities restricted to specific time periods.

### **Dependency Chains**
Complex activity dependency networks.

---

## ðŸ“Š Scheduling Logic Methods

### **Time-Based Logic**
- **Before/After**: Temporal sequence relationships
- **During**: Time period containment
- **Overlapping**: Time period intersections

### **Resource-Based Logic**
- **Availability**: Resource time constraints
- **Capacity**: Resource usage limits
- **Compatibility**: Resource-activity matching

### **Sequence-Based Logic**
- **Precedence**: Required order relationships
- **Dependencies**: Conditional scheduling requirements
- **Chains**: Multi-step dependency sequences

---

## ðŸŽ¯ Common Pitfalls

### **Pitfall 1: Time Confusion**
âŒ Mixing time formats or slots
âœ… Clear time slot identification

### **Pitfall 2: Sequence Errors**
âŒ Wrong precedence application
âœ… Careful before/after logic

### **Pitfall 3: Resource Conflicts**
âŒ Overbooking resources
âœ… Resource availability checking

---

## ðŸ› ï¸ Quick Solving Strategies

### **1. Time Framework Creation**
- Draw clear time slot layout
- Mark all time constraints
- Create activity timeline

### **2. Constraint Organization**
- List all scheduling constraints
- Group by constraint type
- Identify most restrictive rules

### **3. Systematic Assignment**
- Start with fixed time assignments
- Apply sequence constraints
- Resolve resource conflicts

---

## ðŸ“ˆ Difficulty Levels

### **Easy Level**
- Few activities, simple constraints
- Direct time assignments
- Basic sequence requirements

### **Medium Level**
- Multiple activities, mixed constraints
- Resource availability issues
- Complex sequence relationships

### **Hard Level**
- Many activities, complex constraints
- Multiple resource conflicts
- Advanced dependency chains

---

## ðŸŽ¯ Pro Tips for Success

1. **Create Time Grid**: Visual time-activity framework
2. **List All Constraints**: Systematic constraint organization
3. **Start with Fixed**: Place known time assignments first
4. **Apply Sequences**: Use before/after logic carefully
5. **Check Resources**: Ensure resource availability

---

## ðŸ“… Practice Questions

### **Question 1**
**Conditions:**
1. Four meetings: A, B, C, D
2. Four time slots: 9, 10, 11, 12
3. Meeting A at 9 AM
4. Meeting B before Meeting C
5. Meeting D at 12 PM

**When is Meeting B scheduled?**

### **Question 2**
**Conditions:**
1. Three doctors: X, Y, Z
2. Five patients: P, Q, R, S, T
3. Doctor X available 9-11 AM
4. Doctor Y available 1-3 PM
5. Doctor Z available all day
6. Patient P needs Doctor X
7. Patient Q needs Doctor Y

**How many patients can be scheduled in morning?**

### **Question 3**
**Conditions:**
1. Six tasks: M, N, O, P, Q, R
2. Six time slots: T1-T6
3. Task M must be first
4. Task N immediately after M
5. Task O before Task P
6. Task Q and R cannot be consecutive
7. Task P must be last

**What is the sequence of tasks?**

**Master scheduling puzzles for effective time management! ðŸ“…âœ¨**`"
};
