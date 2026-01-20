import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_3: SubLesson = {
  id: "11.3",
  title: 'Average Speed',
  status: 'completed',
  content: "`# ðŸ“Š Average Speed

Learn to calculate average speed for journeys with varying speeds - crucial for real-world travel scenarios.

---

## ðŸŽ¯ What is Average Speed?

**Average speed** is the total distance traveled divided by the total time taken for the entire journey.

### **Basic Formula**
\`"\`\`
Average Speed = Total Distance / Total Time
\`\`\`

**Note:** Average speed is NOT the average of individual speeds!

---

## ðŸ“Š Types of Average Speed Problems

### 1. **Different Speeds for Different Distances**
\`\`\`
When distance varies, time varies
Average speed = Total distance / Total time
\`\`\`

### 2. **Different Speeds for Different Times**
\`\`\`
When time varies, distance varies
Average speed = Total distance / Total time
\`\`\`

### 3. **Return Journey**
\`\`\`
Different speeds for onward and return journey
Average speed = 2 Ã— S1 Ã— S2 / (S1 + S2)
\`\`\`

---

## ðŸ§® Average Speed Examples

### Example 1: Different Distances
**A car travels 120 km at 60 km/h and 180 km at 90 km/h. Find average speed.**

**Solution:**
- Time1 = 120/60 = 2 hours
- Time2 = 180/90 = 2 hours
- Total distance = 300 km
- Total time = 4 hours
- Average speed = 300/4 = 75 km/h

### Example 2: Different Times
**A train travels for 2 hours at 50 km/h and 3 hours at 60 km/h. Find average speed.**

**Solution:**
- Distance1 = 50 Ã— 2 = 100 km
- Distance2 = 60 Ã— 3 = 180 km
- Total distance = 280 km
- Total time = 5 hours
- Average speed = 280/5 = 56 km/h

### Example 3: Return Journey
**A person goes to a place at 40 km/h and returns at 60 km/h. Find average speed.**

**Solution:**
- Average speed = 2 Ã— 40 Ã— 60 / (40 + 60) = 4800 / 100 = 48 km/h

---

## ðŸ§  Exam Tricks & Shortcuts

### **Harmonic Mean for Return Journey**
\`\`\`
Average speed = 2S1S2 / (S1 + S2)
Where S1 and S2 are onward and return speeds
\`\`\`

### **Weighted Average Method**
\`\`\`
Average speed = Î£ (Speed Ã— Time) / Î£ Time
OR
Average speed = Î£ (Speed Ã— Distance) / Î£ Distance
\`\`\`

### **Quick Check**
\`\`\`
Average speed is always between the minimum and maximum speeds
Never equal to arithmetic mean of speeds
\`\`\`

### **Same Distance vs Same Time**
\`\`\`
If distances equal: Average = (S1 + S2)/2 Ã— correction factor
If times equal: Average = (D1 + D2)/(T1 + T2) Ã— correction factor
\`\`\`

---

## ðŸ”¢ Advanced Average Speed

### **Multiple Segments**
- **Break journey into parts**
- **Calculate time for each segment**
- **Sum distances and times**
- **Apply basic formula**

### **Variable Speed Functions**
- **Acceleration/deceleration**
- **Non-linear speed changes**
- **Complex motion patterns**

### **Special Cases**
- **Circular motion**: Different average calculations
- **Stop-and-go traffic**: Account for stopped time
- **Multi-vehicle scenarios**: Relative average speeds

---

## ðŸŽ¯ Complex Examples

### Example 4: Three Segments
**Journey: 100 km at 50 km/h, 150 km at 75 km/h, 200 km at 100 km/h. Average speed?**

**Solution:**
- Time1 = 100/50 = 2h
- Time2 = 150/75 = 2h
- Time3 = 200/100 = 2h
- Total distance = 450 km
- Total time = 6h
- Average speed = 450/6 = 75 km/h

### Example 5: Stop Time
**Car travels 120 km at 60 km/h, stops for 30 minutes. Average speed for whole journey?**

**Solution:**
- Travel time = 120/60 = 2h
- Stop time = 0.5h
- Total time = 2.5h
- Average speed = 120/2.5 = 48 km/h

### Example 6: Mixed Units
**Runner covers 5 km at 10 km/h, then 3 km at 12 km/h. Average speed in m/s?**

**Solution:**
- Time1 = 5/10 = 0.5h
- Time2 = 3/12 = 0.25h
- Total distance = 8 km = 8000 m
- Total time = 0.75h = 2700 seconds
- Average speed = 8000/2700 â‰ˆ 2.96 m/s

---

## ðŸš¨ Average Speed Mistakes

1. **Arithmetic mean error**: Average speed â‰  (S1 + S2)/2
2. **Return journey formula**: Must use harmonic mean
3. **Unit consistency**: Convert all to same units
4. **Time calculation**: Include all time segments
5. **Distance addition**: Sum all distances correctly

---

## ðŸŽ¯ Practice Problems

**1.** 60 km at 30 km/h, 40 km at 40 km/h. Average speed?
**2.** 2h at 50 km/h, 3h at 60 km/h. Average speed?
**3.** To place at 20 km/h, return at 30 km/h. Average speed?
**4.** 100 km at 40 km/h, 150 km at 60 km/h. Average speed?
**5.** Journey takes 5h at average 50 km/h. Distance?

**Answers:** 1. 34.29 km/h, 2. 56 km/h, 3. 24 km/h, 4. 52.5 km/h, 5. 250 km

---

## ðŸŽ“ Average Speed Strategies

1. **Identify problem type** - same distance or same time segments
2. **Calculate total distance** and total time separately
3. **Use harmonic mean** for return journey problems
4. **Check if average makes sense** - between min and max speeds
5. **Convert units consistently** before final calculation

Master average speed calculations and handle complex journey problems with ease! ðŸ†`
};
