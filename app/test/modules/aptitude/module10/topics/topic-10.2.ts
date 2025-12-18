import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_2: SubLesson = {
  id: "10.2",
  title: 'Work–Time Relationship',
  status: 'completed',
  content: `# ⏱️ Work-Time Relationship

Understand the fundamental relationship between work completed and time taken - the cornerstone of time and work problems.

---

## 🎯 Core Relationship

### **Basic Formula**
\`\`\`
Work = Time × Efficiency
\`\`\`

**Where:**
- **Work**: Fraction of total work completed (usually 0 < work ≤ 1)
- **Time**: Time taken to complete that work
- **Efficiency**: Rate of work completion per unit time

---

## 📊 Work-Time Proportionality

### 1. **Direct Proportionality with Time**
\`\`\`
More time → More work completed
Time ∝ Work (for constant efficiency)
\`\`\`

### 2. **Inverse Proportionality with Workers**
\`\`\`
More workers → Less time required
Time ∝ 1/Workers (for same work)
\`\`\`

### 3. **Efficiency Relationship**
\`\`\`
Efficiency = Work/Time
Time = Work/Efficiency
\`\`\`

---

## 🧮 Mathematical Relationships

### **Work-Time Formula**
\`\`\`
If A takes 'a' days for work W:
Time taken by A = a days
Work done by A in 1 day = W/a
\`\`\`

### **Multiple Workers**
\`\`\`
If A takes 'a' days, B takes 'b' days:
Combined work in 1 day = 1/a + 1/b
Time for full work = 1/(1/a + 1/b) = ab/(a+b)
\`\`\`

### **Efficiency Ratio**
\`\`\`
If A:B efficiency ratio = x:y
Then A:B time ratio = y:x
\`\`\`

---

## 🎯 Practical Applications

### Example 1: Basic Work-Time
**A completes work in 12 days. B completes same work in 18 days. Find time when both work together.**

**Solution:**
- A's 1-day work = 1/12
- B's 1-day work = 1/18
- Combined work = 1/12 + 1/18 = 5/36
- Time taken = 1/(5/36) = 36/5 = 7.2 days

### Example 2: Work Fraction
**A does 2/5 work in 10 days. How long for full work?**

**Solution:**
- Work done = 2/5 in 10 days
- Full work = 5/2 × 10 = 25 days

### Example 3: Efficiency Comparison
**A is twice efficient as B. If B takes 30 days, how long does A take?**

**Solution:**
- Efficiency A : B = 2:1
- Time A : B = 1:2
- A takes 30/2 = 15 days

---

## 🧠 Exam Tricks & Shortcuts

### **Time Ratio Trick**
\`\`\`
If efficiencies are in ratio m:n
Time taken will be in ratio n:m
\`\`\`

### **Combined Work Formula**
\`\`\`
Time together = (a×b)/(a+b) where a,b are individual times
\`\`\`

### **Work Completion Shortcuts**
- **Half work**: Same time as full work
- **Double efficiency**: Half the time
- **Triple speed**: One-third the time

### **Quick LCM Method**
For multiple workers with times a,b,c days:
\`\`\`
LCM = LCM(a,b,c)
Work units = LCM/a, LCM/b, LCM/c
Total work per day = Sum of work units
Days required = LCM/Total work per day
\`\`\`

---

## 🔢 Advanced Relationships

### **Work-Time-Efficiency Triangle**
\`\`\`
Work     Efficiency
   ↗       ↙
  Time
\`\`\`

**Key:** Any two determine the third

### **Proportional Changes**
\`\`\`
If work increases by x%, time increases by x% (same efficiency)
If efficiency increases by x%, time decreases by x% (same work)
\`\`\`

### **Combined Efficiency**
\`\`\`
Total efficiency = Sum of individual efficiencies
Time = Total work / Total efficiency
\`\`\`

---

## 🚨 Common Mistakes to Avoid

1. **Inverse vs Direct Relationship**: More workers = less time (inverse)
2. **Unit Consistency**: Convert all times to same units
3. **Work Addition**: Work adds up, time doesn't add up directly
4. **Zero Work**: Cannot have negative or zero work
5. **Efficiency Confusion**: Higher efficiency = less time

---

## 🎯 Practice Problems

**1.** A takes 10 days, B takes 15 days. Time together?
**2.** A does 3/7 work in 9 days. Total time for A?
**3.** A:B:C efficiency = 2:3:4. Time ratio for same work?
**4.** 4 men do work in 6 days. How many men for 3 days?
**5.** A works twice as fast as B. B takes 20 days, A takes?

**Answers:** 1. 6 days, 2. 21 days, 3. 12:8:6, 4. 8 men, 5. 10 days

---

## 🎓 Exam Strategies

1. **Identify the relationship** - work constant or time constant?
2. **Use LCM for precision** - avoid decimals in calculations
3. **Draw work diagrams** - visualize progress
4. **Check reasonableness** - more workers should take less time
5. **Use ratio methods** - often simpler than fractions

Master work-time relationships and solve complex problems effortlessly! 🏆`
};