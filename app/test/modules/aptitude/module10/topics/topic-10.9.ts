import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_9: SubLesson = {
  id: "10.9",
  title: 'Alternate Days Work',
  status: 'completed',
  content: `# 🔄 Alternate Days Work

Master problems involving workers who work on alternate days or different schedules - common in aptitude exam scenarios.

---

## 🎯 Alternate Work Concept

**Alternate days work** occurs when workers follow different working patterns - working on different days or shifts.

### **Key Patterns**
- **Alternate days**: A works day 1,3,5... B works day 2,4,6...
- **Different shifts**: Morning/evening shifts
- **Weekly rotation**: Different days of week
- **Custom schedules**: Any non-overlapping work pattern

---

## 📊 Alternate Work Calculations

### 1. **Basic Alternate Pattern**
\`\`\`
Day 1: Only A works
Day 2: Only B works
Day 3: Only A works
And so on...
\`\`\`

### 2. **Work per Cycle**
\`\`\`
2-day cycle: A + B work = A's 1-day + B's 1-day work
\`\`\`

### 3. **Efficiency Calculation**
\`\`\`
Work in n days = Work by A in n days + Work by B in n days
Account for who works which days
\`\`\`

---

## 🧮 Alternate Work Examples

### Example 1: Simple Alternate
**A completes work in 12 days, B in 18 days. They work alternate days starting with A. Time together?**

**Solution:**
- A's 1-day work = 1/12
- B's 1-day work = 1/18
- 2-day cycle work = 1/12 + 1/18 = 5/36
- Work in 2 days = 5/36
- Full work = 36/5 = 7.2 days (but check if complete)

For 7 days: A works days 1,3,5,7 (4 days), B works days 2,4,6 (3 days)
- A's work = 4/12 = 1/3
- B's work = 3/18 = 1/6
- Total work = 1/3 + 1/6 = 1/2
- Need 8th day: A works, completes remaining 1/2 work
- A's work on 8th day = 1/12 = 1/12, but needs 1/2 = 6/12
- Wait, mistake: after 7 days 1/2 work done, so on 8th day A does full day but only needs 1/2 day's work
- Time for 1/2 work by A = (1/2) ÷ (1/12) = 6 days? No.

Let's recalculate properly:
Total work = 1
After 7 days: 4 days A + 3 days B = 4/12 + 3/18 = 1/3 + 1/6 = 1/2
Remaining work = 1/2
On day 8: A works, does 1/12 work
But needs only 1/2 work, so A works fraction of day 8
Time for 1/2 work by A = (1/2) / (1/12) = 6 hours (assuming 12-hour day)

This is getting complex. Let me use a better approach.

### Better Solution:
Let total work = LCM(12,18) = 36 units
A does 36/12 = 3 units/day
B does 36/18 = 2 units/day

Day 1: A works = 3 units
Day 2: B works = 2 units
Day 3: A works = 3 units
Day 4: B works = 2 units
Day 5: A works = 3 units
Day 6: B works = 2 units
Day 7: A works = 3 units (total so far: 3+2+3+2+3+2+3 = 18 units)
Day 8: A works, needs 36-18=18 more units, A does 3 units, so fraction: 18/3 = 6 hours

Total time = 7 days + 6/12 days = 7.5 days

---

## 🧠 Exam Tricks & Shortcuts

### **LCM Method for Alternate Work**
\`\`\`
Step 1: Find LCM of individual times
Step 2: Convert to work units
Step 3: Track work by each person per day
Step 4: Simulate day by day until work completes
\`\`\`

### **Cycle Work Calculation**
\`\`\`
Find work done in one complete cycle
Calculate how many full cycles needed
Add partial cycle work
\`\`\`

### **Quick Alternate Formula**
\`\`\`
For alternate starting with A:
Work pattern repeats every 2 days
Calculate work per 2-day cycle
\`\`\`

### **Efficiency Adjustment**
\`\`\`
Account for different working hours
Adjust work rates accordingly
\`\`\`

---

## 🔢 Advanced Alternate Patterns

### **Different Alternate Patterns**
- **A,B,A,B,A,B...**: Standard alternate
- **A,A,B,B,A,A,B,B...**: 2 days each
- **A,B,C,A,B,C...**: 3-person rotation
- **Custom patterns**: Any repeating schedule

### **Unequal Work Days**
- **Different hours**: 8-hour vs 6-hour days
- **Weekend variations**: Different weekend schedules
- **Holiday adjustments**: Work pattern changes

### **Complex Schedules**
- **Multiple shifts**: Morning, afternoon, night
- **Overlapping work**: Some days both work
- **Variable efficiency**: Different efficiency on different days

---

## 🎯 Complex Examples

### Example 2: 2-Day Rotation
**A, B work 2 days each alternately. A takes 15 days alone, B takes 20 days alone. Total time?**

**Solution:**
- LCM(15,20) = 60 units
- A: 60/15 = 4 units/day
- B: 60/20 = 3 units/day

Pattern: A,A,B,B,A,A,B,B,...
4-day cycle work: 4+4+3+3 = 14 units
Cycles needed: 60/14 ≈ 4.28 cycles
4 cycles: 56 units
Remaining: 4 units
Next worker is A (after B,B), so A does 4 units in 4/4 = 1 day

Total time = 16 days + 1 day = 17 days

### Example 3: Three Workers
**A, B, C work alternate days starting with A. Times: 12, 15, 18 days. Total time?**

**Solution:**
- LCM(12,15,18) = 180 units
- A: 180/12 = 15 units/day
- B: 180/15 = 12 units/day
- C: 180/18 = 10 units/day

Pattern: A,B,C,A,B,C,...
3-day cycle: 15+12+10 = 37 units
Cycles: 180/37 ≈ 4.86 cycles
4 cycles: 148 units
Remaining: 32 units
Next is A: 15 units (not enough)
Then B: 12 units (total 27, still need 5 more)
Then C: does 5 units in 5/10 = 0.5 days

Total time = 12 days + 0.5 days = 12.5 days

---

## 🚨 Alternate Work Mistakes

1. **Pattern Tracking**: Lose track of who works when
2. **Cycle Calculation**: Wrong work per cycle
3. **Remaining Work**: Incorrect fractional day calculation
4. **LCM Errors**: Wrong work unit conversion
5. **Starting Person**: Forget who starts the pattern

---

## 🎯 Practice Problems

**1.** A takes 10d, B takes 15d. Alternate days, A starts. Time?
**2.** A,B work 2 days each alternately. A:12d, B:16d. Time?
**3.** A,B,C alternate. A:8d, B:10d, C:12d. Time?
**4.** A works 3 days, B works 2 days alternately. A:18d, B:24d. Time?
**5.** A,B work alternate days. A does 2/5 work, B does 1/3 work. Find individual times.

**Answers:** 1. ~7.5d, 2. ~14d, 3. ~8.5d, 4. ~21d, 5. A:15d, B:20d

---

## 🎓 Alternate Work Strategies

1. **Use LCM method** for precision
2. **Track work day by day** for complex patterns
3. **Calculate work per cycle** first
4. **Handle fractional days** carefully
5. **Double-check starting person** and pattern

Master alternate days work problems and solve complex scheduling scenarios! 🏆`
};