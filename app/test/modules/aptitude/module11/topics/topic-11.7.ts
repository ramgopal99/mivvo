import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_7: SubLesson = {
  id: "11.7",
  title: 'Boats & Streams',
  status: 'completed',
  content: `# 🚣 Boats & Streams

Master boats and streams problems - involving motion in flowing water where speed depends on both boat and stream velocities.

---

## 🎯 Boats & Streams Concept

**Boats & Streams** problems involve boats moving in rivers/streams where water flow affects the boat's effective speed.

### **Key Speeds**
- **Boat Speed (B)**: Speed in still water
- **Stream Speed (S)**: Speed of water current
- **Downstream Speed**: B + S
- **Upstream Speed**: B - S

---

## 📊 Downstream & Upstream

### 1. **Downstream (with current)**
\`\`\`
Speed = Boat Speed + Stream Speed
Time = Distance / (B + S)
\`\`\`

### 2. **Upstream (against current)**
\`\`\`
Speed = Boat Speed - Stream Speed
Time = Distance / (B - S)
\`\`\`

### 3. **Speed Relationships**
\`\`\`
Downstream Speed > Upstream Speed
Difference = 2 × Stream Speed
\`\`\`

---

## 🧮 Boats & Streams Examples

### Example 1: Basic Calculation
**Boat speed in still water is 12 km/h, stream speed 4 km/h. Downstream speed?**

**Solution:**
- Downstream speed = 12 + 4 = 16 km/h

### Example 2: Round Trip
**Boat goes 20 km downstream in 2 hours, returns in 2.5 hours. Find boat and stream speeds.**

**Solution:**
- Downstream: Distance = Speed × Time = S_d × 2 = 20 ⇒ S_d = 10 km/h
- Upstream: Distance = Speed × Time = S_u × 2.5 = 20 ⇒ S_u = 8 km/h
- Boat speed = (S_d + S_u)/2 = (10 + 8)/2 = 9 km/h
- Stream speed = (S_d - S_u)/2 = (10 - 8)/2 = 1 km/h

### Example 3: Time Difference
**Boat takes 4 hours downstream, 6 hours upstream for same distance. Find speeds.**

**Solution:**
- Let distance = D
- Downstream: D = (B + S) × 4
- Upstream: D = (B - S) × 6
- Divide equations: (B + S)/ (B - S) = 6/4 = 1.5
- B + S = 1.5(B - S)
- B + S = 1.5B - 1.5S
- 2.5S = 0.5B ⇒ B = 5S
- From downstream: D = (5S + S) × 4 = 24S
- From upstream: D = (5S - S) × 6 = 24S ✓

---

## 🧠 Exam Tricks & Shortcuts

### **Speed Difference Formula**
\`\`\`
Downstream - Upstream = 2 × Stream Speed
(S_d - S_u) = 2S
\`\`\`

### **Average Speed Formula**
\`\`\`
Average Speed = (Downstream × Upstream) / (Downstream + Upstream)
Average Speed = B² / (B² - S²) for round trip
\`\`\`

### **Quick Boat Speed**
\`\`\`
Boat Speed = (Downstream + Upstream) / 2
Stream Speed = (Downstream - Upstream) / 2
\`\`\`

### **Time Ratio Method**
\`\`\`
Time ratio = 1/(B+S) : 1/(B-S) = (B-S):(B+S)
\`\`\`

---

## 🔢 Advanced Boats & Streams

### **Complex Scenarios**
- **Multiple trips**: Different distances
- **Variable streams**: Changing current speeds
- **Boat racing**: Relative speeds in streams

### **Special Cases**
- **Zero stream**: Still water
- **Equal speeds**: Critical stream speed
- **Extreme conditions**: Very fast/slow streams

### **Real-World Applications**
- **River navigation**
- **Shipping calculations**
- **Water sports timing**

---

## 🎯 Complex Examples

### Example 4: Different Distances
**Boat goes 30 km downstream in 2 hours, 18 km upstream in 2 hours. Find speeds.**

**Solution:**
- Downstream: 30 = (B + S) × 2 ⇒ B + S = 15
- Upstream: 18 = (B - S) × 2 ⇒ B - S = 9
- Add: 2B = 24 ⇒ B = 12 km/h
- Subtract: 2S = 6 ⇒ S = 3 km/h

### Example 5: Man Swimming
**Man swims 9 km downstream in 3 hours, returns in 9 hours. Find speeds.**

**Solution:**
- Downstream: 9 = (M + S) × 3 ⇒ M + S = 3
- Upstream: 9 = (M - S) × 9 ⇒ M - S = 1
- Add: 2M = 4 ⇒ M = 2 km/h
- Subtract: 2S = 2 ⇒ S = 1 km/h

### Example 6: Race Problem
**Two boats race in stream. Boat A speed 20 km/h, B speed 18 km/h, stream 2 km/h. Find relative speed downstream.**

**Solution:**
- A downstream: 20 + 2 = 22 km/h
- B downstream: 18 + 2 = 20 km/h
- Relative speed: 22 - 20 = 2 km/h

---

## 🚨 Boats & Streams Mistakes

1. **Sign convention**: Downstream +, Upstream -
2. **Speed confusion**: Boat speed vs stream speed
3. **Time application**: Different times for same distance
4. **Round trip average**: Not simple average
5. **Direction errors**: Upstream vs downstream

---

## 🎯 Practice Problems

**1.** Boat speed 15 km/h, stream 3 km/h. Downstream speed?
**2.** Boat takes 4h downstream, 6h upstream, same distance. Boat speed?
**3.** Boat goes 24 km downstream in 1.5h, returns in 2h. Stream speed?
**4.** Man swims 12 km downstream in 3h, upstream in 6h. Stream speed?
**5.** Boat speed 20 km/h in still water. Downstream 25 km/h. Stream speed?

**Answers:** 1. 18 km/h, 2. 12.5 km/h, 3. 2 km/h, 4. 1 km/h, 5. 5 km/h

---

## 🎓 Boats & Streams Strategies

1. **Define variables** clearly - boat speed, stream speed
2. **Use correct formulas** - downstream = B+S, upstream = B-S
3. **Set up equations** for given conditions
4. **Solve systematically** - add/subtract equations
5. **Check reasonableness** - downstream > upstream

Master boats and streams problems and handle water current motion calculations! 🏆`
};