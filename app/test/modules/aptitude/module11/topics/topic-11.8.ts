import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_8: SubLesson = {
  id: "11.8",
  title: 'Circular Track Problems',
  status: 'completed',
  content: `# 🏁 Circular Track Problems

Master problems involving motion on circular tracks - including meeting points, lap times, and relative speeds in circular motion.

---

## 🎯 Circular Track Concepts

**Circular track problems** involve objects moving in circles, meeting periodically, and calculating lap times and meeting frequencies.

### **Key Concepts**
- **Circumference**: Distance around the track
- **Lap time**: Time to complete one full circle
- **Relative speed**: How fast objects approach each other

---

## 📊 Circular Track Calculations

### 1. **Lap Time**
\`\`\`
Time for one lap = Circumference / Speed
\`\`\`

### 2. **Meeting Frequency**
\`\`\`
Time between meetings = Circumference / Relative Speed
\`\`\`

### 3. **Number of Meetings**
\`\`\`
Meetings per lap = Number of objects - 1
\`\`\`

---

## 🧮 Circular Track Examples

### Example 1: Single Runner
**Runner runs 400m track at 8 m/s. Lap time?**

**Solution:**
- Time = 400 / 8 = 50 seconds

### Example 2: Two Runners Meeting
**Two runners on 400m track, speeds 10 m/s and 8 m/s. Time between meetings?**

**Solution:**
- Relative speed = 10 - 8 = 2 m/s
- Time = 400 / 2 = 200 seconds

### Example 3: Meeting Points
**Two runners start together on 500m track. Speeds 12 m/s and 8 m/s. Where do they meet first?**

**Solution:**
- Relative speed = 12 - 8 = 4 m/s
- Time to meet = 500 / 4 = 125 seconds
- Distance covered by faster runner = 12 × 125 = 1500 m
- Position = 1500 mod 500 = 0 (back at start)

---

## 🧠 Exam Tricks & Shortcuts

### **Same Direction Meeting**
\`\`\`
Time = Circumference / |Speed₁ - Speed₂|
\`\`\`

### **Opposite Direction Meeting**
\`\`\`
Time = Circumference / (Speed₁ + Speed₂)
\`\`\`

### **Lapping Time**
\`\`\`
Time for faster to lap slower = Circumference / (Speed₁ - Speed₂)
\`\`\`

### **Meeting Frequency**
\`\`\`
Number of meetings per unit time = Relative speed / Circumference
\`\`\`

---

## 🔢 Advanced Circular Problems

### **Multiple Runners**
- **Three runners**: Complex meeting patterns
- **Different starting points**: Offset calculations
- **Variable speeds**: Changing speed scenarios

### **Complex Scenarios**
- **Clockwise vs counterclockwise**
- **Different lap directions**
- **Stopping and starting**

### **Real-World Applications**
- **Race tracks**: Lap timing
- **Traffic circles**: Vehicle meeting
- **Sports**: Track and field events

---

## 🎯 Complex Examples

### Example 4: Three Runners
**Three runners on 600m track, speeds 10, 8, 6 m/s. Find meeting times.**

**Solution:**
- This requires calculating pairwise relative speeds
- Meetings occur when any two runners meet
- Complex timing calculations needed

### Example 5: Offset Start
**Two runners on 400m track. A starts at start, B starts 100m ahead. Speeds 12 m/s and 8 m/s. First meeting point?**

**Solution:**
- Effective distance = 100 m (B's head start)
- Relative speed = 12 - 8 = 4 m/s
- Time to catch = 100 / 4 = 25 seconds
- Distance covered by A = 12 × 25 = 300 m
- Position = 300 mod 400 = 300 m from start

### Example 6: Race Completion
**Two runners race on 500m track. A at 10 m/s, B at 8 m/s. How many laps does B complete when A finishes 5 laps?**

**Solution:**
- A completes 5 laps: Distance = 5 × 500 = 2500 m
- Time = 2500 / 10 = 250 seconds
- B's distance = 8 × 250 = 2000 m
- B's laps = 2000 / 500 = 4 laps

---

## 🚨 Circular Track Mistakes

1. **Direction confusion**: Same vs opposite direction
2. **Starting point**: Offset distances
3. **Meeting calculation**: Complete laps vs first meeting
4. **Relative speed**: Correct subtraction/addition
5. **Modulo arithmetic**: Position calculations

---

## 🎯 Practice Problems

**1.** Runner on 400m track at 8 m/s. Lap time?
**2.** Two runners 500m track, 12 m/s and 8 m/s. Meeting time?
**3.** 600m track, A at 15 m/s, B at 10 m/s. Time for A to lap B?
**4.** 300m track, two runners opposite directions, 6 m/s each. Meeting time?
**5.** 400m track, A starts first, B starts 100m behind at same speed. Meeting time?

**Answers:** 1. 50 seconds, 2. 83.33 seconds, 3. 120 seconds, 4. 25 seconds, 5. 50 seconds

---

## 🎓 Circular Track Strategies

1. **Determine direction** - same or opposite
2. **Calculate relative speed** correctly
3. **Find effective distance** considering starting positions
4. **Use modulo arithmetic** for position calculations
5. **Account for complete laps** when needed

Master circular track problems and handle track racing scenarios! 🏆`
};