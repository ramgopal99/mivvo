import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_8: SubLesson = {
  id: "10.8",
  title: 'Pipes and Cisterns (Basic)',
  status: 'completed',
  content: `# 🚰 Pipes and Cisterns (Basic)

Learn the fundamentals of pipes and cisterns problems - water filling and emptying scenarios common in aptitude exams.

---

## 🎯 Pipes and Cisterns Concept

**Pipes and Cisterns** problems involve filling or emptying containers using pipes with different flow rates.

### **Basic Principle**
\`\`\`
Work = Time × Rate
Filling/Emptying follows same time & work principles
\`\`\`

---

## 📊 Basic Pipe Operations

### 1. **Inlet Pipe (Fills Tank)**
\`\`\`
Rate = +1/t (where t = time to fill tank alone)
\`\`\`

### 2. **Outlet Pipe (Empties Tank)**
\`\`\`
Rate = -1/t (where t = time to empty tank alone)
\`\`\`

### 3. **Combined Operation**
\`\`\`
Net rate = Sum of individual rates
Time = 1 / Net rate
\`\`\`

---

## 🧮 Basic Examples

### Example 1: Two Pipes Filling
**Pipe A fills tank in 10 hours, Pipe B in 15 hours. Time together?**

**Solution:**
- A's rate = 1/10 per hour
- B's rate = 1/15 per hour
- Combined rate = 1/10 + 1/15 = 1/6 per hour
- Time = 1/(1/6) = 6 hours

### Example 2: Filling and Emptying
**Pipe A fills in 12 hours, Pipe B empties in 8 hours. Time together?**

**Solution:**
- A's rate = +1/12 per hour
- B's rate = -1/8 per hour
- Net rate = 1/12 - 1/8 = (2-3)/24 = -1/24 per hour
- Tank will empty, time = 1/(1/24) = 24 hours

### Example 3: Three Pipes
**A fills in 10h, B fills in 15h, C empties in 12h. Time together?**

**Solution:**
- A: +1/10, B: +1/15, C: -1/12
- Net rate = 1/10 + 1/15 - 1/12 = (6+4-5)/60 = 5/60 per hour
- Time = 60/5 = 12 hours

---

## 🧠 Exam Tricks & Shortcuts

### **Rate Calculation Magic**
\`\`\`
Inlet: +1/time
Outlet: -1/time
Net rate = Sum of rates
\`\`\`

### **Quick Time Formula**
\`\`\`
Time = Total work / Net rate
For tank filling: Work = 1 (full tank)
\`\`\`

### **LCM Method for Precision**
\`\`\`
Find LCM of times
Convert to work units per LCM time
Add/subtract work units
Calculate time for 1 unit work
\`\`\`

### **Emptying Time Trick**
\`\`\`
If net rate is negative → Tank empties
Time = 1 / |Net rate|
\`\`\`

---

## 🔢 Advanced Pipe Scenarios

### **Partial Tank Problems**
- **Fill to certain level**: Work = fraction of tank
- **Start with water**: Account for initial water level
- **Multiple operations**: Different pipes at different times

### **Pipe Efficiency Variations**
- **Different diameters**: Different flow rates
- **Pressure variations**: Higher pressure = faster flow
- **Pipe conditions**: Clogged pipes = slower flow

### **Complex Operations**
- **Alternating pipes**: Pipes work at different times
- **Variable flow**: Flow rate changes over time
- **Leakage**: Continuous slow emptying

---

## 🎯 Complex Examples

### Example 4: Partial Filling
**A fills tank in 8 hours. How long to fill half tank?**

**Solution:**
- Rate = 1/8 per hour
- Work needed = 1/2 tank
- Time = (1/2) / (1/8) = 4 hours

### Example 5: Initial Water
**Tank is 1/3 full. A fills in 10 hours. Time to fill completely?**

**Solution:**
- Work needed = 2/3 tank
- Rate = 1/10 per hour
- Time = (2/3) / (1/10) = 20/3 ≈ 6.67 hours

### Example 6: Sequential Operation
**A fills in 6h, B empties in 8h. A works 3h, then B works 2h. Final level?**

**Solution:**
- A's 3h work = 3/6 = 1/2 tank
- B's 2h work = 2/8 = 1/4 tank (empties)
- Net work = 1/2 - 1/4 = 1/4 tank full

---

## 🚨 Pipe Problem Mistakes

1. **Sign Convention**: Inlet +, Outlet -
2. **Net Rate Zero**: Pipes cancel out - no change
3. **Partial Work**: Account for initial levels
4. **Time Units**: Convert to same units
5. **Direction Confusion**: Filling vs emptying

---

## 🎯 Practice Problems

**1.** A fills in 8h, B fills in 12h. Time together?
**2.** A fills in 10h, B empties in 15h. Time together?
**3.** A fills in 6h, B empties in 8h. What happens together?
**4.** Tank 1/4 full. A fills in 20h. Time to fill completely?
**5.** A fills in 12h, B fills in 18h, C empties in 24h. Time together?

**Answers:** 1. 4.8h, 2. 30h (empties), 3. Empties in 24h, 4. 15h, 5. 8h

---

## 🎓 Pipe Problem Strategies

1. **Assign correct signs** - inlet positive, outlet negative
2. **Calculate net rate** first
3. **Account for initial levels** in partial problems
4. **Use LCM method** for multiple pipes
5. **Check if tank fills or empties** based on net rate

Master basic pipes and cisterns problems and handle water flow calculations with ease! 🏆`
};