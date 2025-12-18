import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_11: SubLesson = {
  id: "11.11",
  title: 'Advanced Time, Speed & Distance Problems',
  status: 'completed',
  content: `# 🧠 Advanced Time, Speed & Distance Problems

Master the most challenging problems combining multiple concepts - the pinnacle of time, speed, and distance aptitude questions.

---

## 🎯 Advanced Problem Concepts

**Advanced problems** require combining multiple concepts and applying critical thinking to solve complex motion scenarios.

### **Key Advanced Topics**
- **Variable acceleration**: Changing speeds
- **Non-linear motion**: Complex path patterns
- **Multiple constraints**: Several conditions to satisfy
- **Optimization problems**: Minimum/maximum time/distance

---

## 📊 Advanced Problem Types

### 1. **Variable Speed Problems**
\`\`\`
Speed changes over time or distance
Requires integration of speed functions
\`\`\`

### 2. **Complex Relative Motion**
\`\`\`
Multiple objects moving in different directions
Complex relative speed calculations
\`\`\`

### 3. **Optimization Scenarios**
\`\`\`
Minimum time for journey
Maximum distance covered
Optimal speed strategies
\`\`\`

---

## 🧮 Advanced Examples

### Example 1: Escalator Problem
**A man takes 30 seconds to walk up escalator moving down. Takes 20 seconds to walk down same escalator when it moves up at same speed. Find time to walk up stationary escalator.**

**Solution:**
- Let man's speed = M steps/second
- Escalator speed = E steps/second
- Going up (escalator down): M + E = distance/30
- Going down (escalator up): M - E = distance/20
- Let distance = D steps
- M + E = D/30  (1)
- M - E = D/20  (2)
- Add: 2M = D(1/30 + 1/20) = D(2+3)/60 = D/12
- M = D/24
- Subtract: 2E = D(1/30 - 1/20) = D(2-3)/60 = -D/60
- E = -D/120 (negative because directions oppose)
- Stationary time = D/M = 24 seconds

### Example 2: Three Train Problem
**Three trains A, B, C start from same station. A at 60 km/h to city P, B at 80 km/h to city Q, C at 100 km/h follows A after 1 hour. When will C meet A?**

**Solution:**
- After 1 hour, A has covered 60 km
- C starts at 100 km/h, relative speed to A = 100 - 60 = 40 km/h
- Distance to cover = 60 km
- Time = 60/40 = 1.5 hours
- Total time = 1 + 1.5 = 2.5 hours

### Example 3: Complex Boat Problem
**Boat goes from A to B downstream, immediately returns upstream. Total time 8 hours. Stream speed 2 km/h. If boat had gone to B and back in still water, time would be 2 hours more. Find boat speed.**

**Solution:**
- Let boat speed = B km/h, stream = S = 2 km/h
- Distance one way = D
- Downstream time = D/(B+S)
- Upstream time = D/(B-S)
- Total time = D/(B+S) + D/(B-S) = 8
- In still water: 2D/B = [D/(B+S) + D/(B-S)] + 2
- Let T = D/(B+S) + D/(B-S) = 8
- 2D/B = T + 2 = 10
- D/B = 5
- From T = D(1/(B+S) + 1/(B-S)) = 8
- D(2B)/(B²-S²) = 8
- 5 × 2B / (B²-4) = 8
- 10B / (B²-4) = 8
- 10B = 8(B²-4)
- 8B² - 32 = 10B
- 8B² - 10B - 32 = 0
- 4B² - 5B - 16 = 0
- B = [5 ± √(25+256)]/8 = [5 ± √281]/8 ≈ 3.2 km/h

---

## 🧠 Advanced Problem Tricks

### **System of Equations**
\`\`\`
Set up multiple equations
Use substitution or elimination
Solve for unknowns systematically
\`\`\`

### **Relative Motion in Complex Scenarios**
\`\`\`
Consider reference frames
Break into components
Use vector addition for directions
\`\`\`

### **Time-Distance Analysis**
\`\`\`
Create distance-time graphs
Find intersection points
Analyze motion phases
\`\`\`

### **Critical Thinking Approaches**
\`\`\`
Work backwards from answer
Consider extreme cases
Use trial and error intelligently
\`\`\`

---

## 🔢 Complex Advanced Problems

### Example 4: Man and Escalator with Variable Speed
**Escalator brings 60 people in 1 minute when moving. Man takes 30 seconds to walk up stationary escalator. How many people would escalator bring if man walks up moving escalator?**

**Solution:**
- Let escalator speed = E people/minute
- Man's walking speed = M people/minute
- Stationary time = 60/M = 30 seconds = 0.5 minutes
- M = 120 people/minute
- Moving escalator: Effective speed = M + E = 120 + E
- People brought = (M + E) × 1 = 120 + E
- We need another relationship. This is insufficient information.

### Example 5: Trains with Different Starting Times
**Train A leaves station at 10 AM at 60 km/h. Train B leaves same station at 12 PM at 80 km/h towards A. When will B meet A?**

**Solution:**
- A has 2 hour head start, covers 120 km
- Relative speed = 80 - 60 = 20 km/h (B catching A)
- Time to catch = 120 / 20 = 6 hours
- Meeting time = 12 PM + 6 hours = 6 PM

### Example 6: Circular Track with Offset Starts
**Two runners on 400m track. A starts from start, B starts from 100m mark. Both run at 8 m/s. When and where do they meet first?**

**Solution:**
- B is 100m ahead
- A needs to cover 100m to reach B's position
- Relative speed = 8 m/s
- Time = 100/8 = 12.5 seconds
- A covers 8 × 12.5 = 100m
- Position = 100m from start
- B has covered 8 × 12.5 = 100m from 100m mark = 200m from start

---

## 🚨 Advanced Problem Mistakes

1. **Overcomplication**: Simple problems made complex
2. **Missing variables**: Not accounting for all unknowns
3. **Incorrect assumptions**: Assuming constant speeds
4. **Unit mismatches**: Different time/distance units
5. **Direction confusion**: Complex relative motion

---

## 🎯 Practice Advanced Problems

**1.** Man takes 40s up escalator moving down, 25s down when escalator moves up. Stationary time?
**2.** Three trains A(50 km/h), B(60 km/h), C(70 km/h) start from same point. C follows A after 2h. When does C meet A?
**3.** Boat speed 12 km/h still water. Goes 36 km downstream, returns. Total time 7h. Stream speed?
**4.** Two runners on 500m track, speeds 10 m/s, 8 m/s. B starts 150m ahead. First meeting?
**5.** Train A 200m at 72 km/h, B 160m at 54 km/h same direction. Overtaking time?

**Answers:** 1. 32 seconds, 2. 5 hours, 3. 3 km/h, 4. 25 seconds at 250m, 5. 80 seconds

---

## 🎓 Advanced Problem Strategies

1. **Break into smaller parts** - Solve step by step
2. **Draw detailed diagrams** - Visualize all motion
3. **Use variables systematically** - Define all unknowns
4. **Apply multiple concepts** - Combine different formulas
5. **Verify with logic** - Check if answer makes sense

Master advanced problems and conquer the most challenging time, speed & distance questions! 🏆`
};