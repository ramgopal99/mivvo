import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_6: SubLesson = {
  id: "11.6",
  title: 'Trains (Crossing a Pole/Platform/Train)',
  status: 'completed',
  content: `# 🚂 Trains (Crossing a Pole/Platform/Train)

Master train crossing problems - a favorite topic in aptitude exams involving relative speed and distance calculations.

---

## 🎯 Train Crossing Concepts

**Train crossing problems** involve trains passing stationary objects (pole/platform) or moving objects (another train).

### **Key Distinction**
- **Pole/Platform**: Stationary object
- **Another Train**: Moving object (relative speed)

---

## 📊 Types of Train Crossing

### 1. **Crossing a Pole**
\`\`\`
Time = Length of train / Speed of train
\`\`\`

### 2. **Crossing a Platform/Bridge**
\`\`\`
Time = (Length of train + Length of platform) / Speed of train
\`\`\`

### 3. **Crossing Another Train**
\`\`\`
Time = (Length₁ + Length₂) / Relative Speed
\`\`\`

---

## 🧮 Train Crossing Examples

### Example 1: Crossing a Pole
**Train 200m long crosses a pole at 72 km/h. Time taken?**

**Solution:**
- Speed = 72 × 5/18 = 20 m/s
- Time = 200 / 20 = 10 seconds

### Example 2: Crossing a Platform
**Train 150m long crosses 250m platform at 54 km/h. Time?**

**Solution:**
- Speed = 54 × 5/18 = 15 m/s
- Total distance = 150 + 250 = 400 m
- Time = 400 / 15 = 26.67 seconds

### Example 3: Two Trains Crossing
**Train A 120m at 60 km/h, Train B 100m at 40 km/h towards each other. Crossing time?**

**Solution:**
- Speed A = 60 × 5/18 ≈ 16.67 m/s
- Speed B = 40 × 5/18 ≈ 11.11 m/s
- Relative speed = 16.67 + 11.11 = 27.78 m/s
- Distance = 120 + 100 = 220 m
- Time = 220 / 27.78 ≈ 7.92 seconds

---

## 🧠 Exam Tricks & Shortcuts

### **Pole Crossing**
\`\`\`
Simplest case: Time = Train length / Speed
\`\`\`

### **Platform Crossing**
\`\`\`
Add platform length to train length
Time = (Train + Platform) / Speed
\`\`\`

### **Train Crossing Formula**
\`\`\`
Time = (L1 + L2) / (S1 + S2)
Where L = length, S = speed
\`\`\`

### **Unit Conversion**
\`\`\`
Always convert speed to m/s for meter distances
Speed (m/s) = Speed (km/h) × 5/18
\`\`\`

---

## 🔢 Advanced Train Problems

### **Same Direction Crossing**
- **Overtaking**: Faster train overtaking slower train
- **Relative speed**: S1 - S2 (if S1 > S2)
- **Distance**: L1 + L2

### **Complex Scenarios**
- **Stationary train**: Like crossing a platform
- **Multiple trains**: Chain crossing scenarios
- **Variable speeds**: Acceleration/deceleration

### **Real-World Applications**
- **Railway signaling**
- **Platform design**
- **Safety calculations**

---

## 🎯 Complex Examples

### Example 4: Overtaking Train
**Train A 200m at 72 km/h overtakes train B 150m at 54 km/h. Time to cross completely?**

**Solution:**
- Speed A = 72 × 5/18 = 20 m/s
- Speed B = 54 × 5/18 = 15 m/s
- Relative speed = 20 - 15 = 5 m/s
- Distance = 200 + 150 = 350 m
- Time = 350 / 5 = 70 seconds

### Example 5: Station Crossing
**Train 180m long takes 15 seconds to cross a station. Speed?**

**Solution:**
- Station length unknown, but we can find speed if we assume typical station length
- This is an incomplete problem - needs more information

### Example 6: Bridge Crossing
**Train 300m long crosses 500m bridge in 30 seconds. Speed of train?**

**Solution:**
- Total distance = 300 + 500 = 800 m
- Time = 30 seconds
- Speed = 800 / 30 = 26.67 m/s = 26.67 × 18/5 = 96 km/h

---

## 🚨 Train Crossing Mistakes

1. **Length addition**: Forgetting to add lengths
2. **Direction confusion**: Same vs opposite direction
3. **Unit conversion**: km/h with meter distances
4. **Relative speed**: Adding when should subtract
5. **Complete crossing**: Ensuring full crossing time

---

## 🎯 Practice Problems

**1.** Train 120m at 90 km/h crosses pole. Time?
**2.** Train 180m crosses 220m platform at 60 km/h. Time?
**3.** Train A 150m at 75 km/h, B 120m at 50 km/h towards. Crossing time?
**4.** Train 200m overtakes 160m train at 20 m/s relative speed. Time?
**5.** Train takes 25 seconds to cross 300m platform. Speed in km/h?

**Answers:** 1. 4.8 seconds, 2. 16.67 seconds, 3. 6.5 seconds, 4. 18 seconds, 5. 72 km/h

---

## 🎓 Train Crossing Strategies

1. **Identify crossing type** - pole, platform, or another train
2. **Determine relative speed** correctly
3. **Calculate total distance** to cover
4. **Convert units** appropriately
5. **Ensure complete crossing** time

Master train crossing problems and solve railway motion scenarios! 🏆`
};