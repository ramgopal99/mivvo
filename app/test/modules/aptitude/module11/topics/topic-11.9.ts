import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_9: SubLesson = {
  id: "11.9",
  title: 'Races & Competitions',
  status: 'completed',
  content: `# 🏃‍♂️ Races & Competitions

Master race and competition problems - involving head starts, handicaps, and various racing scenarios.

---

## 🎯 Race Problem Concepts

**Race problems** involve competitions where participants start together or with advantages/disadvantages.

### **Key Concepts**
- **Head start**: One participant starts ahead
- **Handicap**: Artificial advantage/disadvantage
- **Dead heat**: Tie at finish
- **Winning margin**: Distance/time difference

---

## 📊 Race Problem Types

### 1. **Head Start Problems**
\`\`\`
Runner A starts X meters ahead of B
Time saved by head start = X / Relative Speed
\`\`\`

### 2. **Handicap Racing**
\`\`\`
Slower runner gets time/distance advantage
Effective speed difference calculation
\`\`\`

### 3. **Winning by Distance**
\`\`\`
Distance won = Speed difference × Time
\`\`\`

---

## 🧮 Race Examples

### Example 1: Head Start
**A gives B 50m head start in 200m race. A runs 10 m/s, B runs 8 m/s. Who wins?**

**Solution:**
- Relative speed = 10 - 8 = 2 m/s
- Time to cover 50m gap = 50 / 2 = 25 seconds
- In 25 seconds, A covers 10 × 25 = 250 m
- B covers 8 × 25 = 200 m
- A wins by 50m

### Example 2: Handicap Race
**A and B run 100m race. A gives B 10m start. A wins by 5 seconds. Find speeds.**

**Solution:**
- Let B's speed = S m/s
- A's speed = S + extra
- Time for A to cover 100m = 100/A's speed
- Time for B to cover 90m = 90/S
- A wins by 5 seconds: 100/A - 90/S = 5

### Example 3: Dead Heat
**A and B run 400m race. A at 8 m/s, B at 6 m/s. What head start makes it dead heat?**

**Solution:**
- Relative speed = 8 - 6 = 2 m/s
- Time for A to finish = 400/8 = 50 seconds
- Distance B covers in 50 seconds = 6 × 50 = 300 m
- Head start needed = 400 - 300 = 100 m

---

## 🧠 Exam Tricks & Shortcuts

### **Head Start Formula**
\`\`\`
Head start distance = Relative speed × Time difference
\`\`\`

### **Winning Margin**
\`\`\`
Distance won = (Speed A - Speed B) × Race time
\`\`\`

### **Dead Heat Condition**
\`\`\`
Distance covered by slower = Race distance - Head start
\`\`\`

### **Time Advantage**
\`\`\`
Time saved by head start = Head start distance / Speed difference
\`\`\`

---

## 🔢 Advanced Race Problems

### **Multiple Participants**
- **Three-way races**: Complex head starts
- **Team races**: Combined team speeds
- **Elimination rounds**: Progressive advantages

### **Complex Scenarios**
- **Variable speeds**: Changing pace during race
- **Obstacle courses**: Different path lengths
- **Relay races**: Team coordination

### **Real-World Applications**
- **Sports competitions**
- **Business races**: Market share battles
- **Election scenarios**: Vote counting races

---

## 🎯 Complex Examples

### Example 4: Three Runner Race
**A, B, C run 200m race. A gives B 20m, B gives C 20m head start. A runs 10 m/s, B 8 m/s, C 6 m/s. Finishing order?**

**Solution:**
- A starts at 0
- B starts at 20m
- C starts at 40m
- Race ends when A reaches 200m
- Time = 200/10 = 20 seconds
- B covers in 20s: 8×20 = 160m + 20m start = 180m from start
- C covers in 20s: 6×20 = 120m + 40m start = 160m from start
- Order: A (200m), C (160m), B (180m)

### Example 5: Handicap with Time
**A gives B 5 seconds head start in 100m race. A runs 10 m/s, wins by 5m. Find B's speed.**

**Solution:**
- Let B's speed = S m/s
- B starts 5 seconds early, covers 5S meters before A starts
- A runs 100m at 10 m/s, time = 10 seconds
- In 10 seconds, B covers another 10S meters
- Total B covers: 5S + 10S = 15S meters
- A covers 100m, wins by 5m, so B covers 95m
- 15S = 95 ⇒ S = 95/15 = 6.33 m/s

### Example 6: Relay Race
**4×100m relay. Each runner 10 m/s. Baton exchange takes 2 seconds. Team time?**

**Solution:**
- Each runner runs 100m at 10 m/s = 10 seconds
- 3 exchanges × 2 seconds = 6 seconds
- Total time = 40 + 6 = 46 seconds

---

## 🚨 Race Problem Mistakes

1. **Head start confusion**: Who gets the advantage
2. **Starting positions**: Correct offset calculations
3. **Time synchronization**: When runners actually start
4. **Winning calculation**: Distance vs time differences
5. **Multiple participants**: Complex interactions

---

## 🎯 Practice Problems

**1.** A gives B 30m head start in 200m race. A at 8 m/s, B at 6 m/s. Winner?
**2.** A and B run 100m. A gives B 10m start, wins by 2 seconds. Speeds?
**3.** Dead heat in 300m race. A at 9 m/s, B at 7 m/s. Head start for B?
**4.** A wins 50m race by 2 seconds. A at 10 m/s. B's speed?
**5.** Relay: 4×50m, each at 8 m/s, 1 second exchanges. Total time?

**Answers:** 1. A wins by 10m, 2. Complex calculation needed, 3. 66.67m, 4. 6.25 m/s, 5. 28 seconds

---

## 🎓 Race Problem Strategies

1. **Identify advantages** - head starts, handicaps
2. **Calculate effective positions** over time
3. **Use relative speed** for catching up
4. **Account for time differences** carefully
5. **Check finishing order** systematically

Master race and competition problems and handle competitive scenarios! 🏆`
};