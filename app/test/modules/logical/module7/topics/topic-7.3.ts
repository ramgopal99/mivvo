import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_3: SubLesson = {
  id: "7.3",
  title: 'Distance Calculation',
  status: 'completed',
  content: `# 📏 Distance Calculation

Distance calculation is crucial in direction sense problems, involving the difference between actual distance traveled (path length) and displacement (straight-line distance between start and end points). Master these calculations to solve complex directional movement problems in competitive exams.

---

## 🎯 Understanding Distance Concepts

### **Two Types of Distance**

#### **1. Actual Distance (Path Length)**
- **Definition**: Total distance traveled along the path
- **Calculation**: Sum of all individual movement distances
- **Formula**: Distance = d₁ + d₂ + d₃ + ... + dn

#### **2. Displacement (Shortest Distance)**
- **Definition**: Straight-line distance between start and end points
- **Calculation**: Uses Pythagorean theorem for right-angle movements
- **Formula**: Displacement = √(North-South² + East-West²)

### **Key Difference**
- **Actual Distance**: How far you walked (path length)
- **Displacement**: How far you are from start (straight line)

---

## 🧮 Distance Calculation Methods

### **Method 1: Coordinate System**

#### **Establish Coordinate Axes**
- **X-axis**: East-West movements
- **Y-axis**: North-South movements
- **Origin (0,0)**: Starting point

#### **Movement Tracking**

East  → +X (positive X)  
West  → -X (negative X)  
North → +Y (positive Y)  
South → -Y (negative Y)

#### **Final Position Calculation**
- **Net East-West movement** = Σ(East movements) - Σ(West movements)
- **Net North-South movement** = Σ(North movements) - Σ(South movements)

---

## 📐 Pythagorean Theorem Application

### **Right-Angle Triangle Formation**

When movements are at 90° angles (North-South and East-West), the displacement forms a right-angled triangle:

C = √(A² + B²)  
Where:  
- C = Displacement (shortest distance)  
- A = Net North-South distance  
- B = Net East-West distance

### **Example Calculation**

Movements: 3km North, 4km East  
Net N-S: +3km  
Net E-W: +4km  
Displacement: √(3² + 4²) = √(9 + 16) = √25 = 5km  
Actual Distance: 3 + 4 = 7km

---

## 🎯 Problem Types and Solutions

### **Type 1: Simple Displacement**
*"A man walks 5m North, then 12m East. What is his displacement?"*

**Solution:**
- Net North-South: +5m
- Net East-West: +12m
- Displacement: √(5² + 12²) = √(25 + 144) = √169 = 13m

### **Type 2: Complex Path with Returns**
*"Walks 10m North, 5m South, 8m East, 3m West"*

**Solution:**
- Net North-South: 10 - 5 = +5m
- Net East-West: 8 - 3 = +5m
- Displacement: √(5² + 5²) = √(25 + 25) = √50 = 5√2m

### **Type 3: Multi-Directional Movement**
*"3km North, 4km West, 5km South, 2km East"*

**Solution:**
- Net N-S: 3 - 5 = -2km
- Net E-W: -4 + 2 = -2km
- Displacement: √((-2)² + (-2)²) = √(4 + 4) = √8 = 2√2km

---

## 🧭 Direction-Specific Calculations

### **Pure North-South Movement**

Only North and South movements  
Displacement = |Net North-South|  
Example: 8km N, 3km S → Displacement = |8-3| = 5km

### **Pure East-West Movement**

Only East and West movements  
Displacement = |Net East-West|  
Example: 6km E, 2km W → Displacement = |6-2| = 4km

### **Diagonal Movement (45° paths)**

When movement is at 45° angles  
Requires trigonometric calculations  
Displacement = √(d² + d²) = d√2 (for equal distances)

---

## 📊 Advanced Distance Problems

### **Problem 1: Minimum Distance with Obstacles**
*"Find shortest path avoiding obstacles"*

**Approach:**
- Calculate straight-line distance
- Adjust for obstacle avoidance
- Use geometry to find optimal path

### **Problem 2: Distance with Turns**
*"Walk 100m in one direction, turn 90°, walk 50m"*

**Solution:**
- First leg: 100m (any direction)
- Second leg: 50m (perpendicular)
- Displacement: √(100² + 50²) = √(10000 + 2500) = √12500 = 50√5m

### **Problem 3: Circular Path Problems**
*"Walk around a square park"*

**Solution:**
- Actual distance = Perimeter
- Displacement = 0 (back to start)
- For circular paths: Actual = 2πr, Displacement = 0

---

## 🛠️ Distance Calculation Framework

### **Step-by-Step Approach**

1. **List All Movements**
   - Record direction and distance for each step
   - Note the sequence of movements

2. **Categorize Movements**
   - Group North-South movements together
   - Group East-West movements together
   - Identify any other directional movements

3. **Calculate Net Movements**
   - Net N-S = Σ(North) - Σ(South)
   - Net E-W = Σ(East) - Σ(West)
   - Take absolute values for displacement

4. **Apply Pythagorean Theorem**
   - Displacement = √[(Net N-S)² + (Net E-W)²]
   - Actual Distance = Sum of all individual distances

5. **Verify Calculations**
   - Cross-check arithmetic
   - Ensure correct sign handling
   - Verify logical consistency

---

## 🎯 Common Question Patterns

### **Pattern 1: Find Shortest Distance**
*"What is the shortest distance from start to end?"*

### **Pattern 2: Find Actual Distance**
*"How far did he actually walk?"*

### **Pattern 3: Position After Movements**
*"Where will he be after these movements?"*

### **Pattern 4: Return Journey**
*"How far must he walk to return directly?"*

### **Pattern 5: Minimum Path**
*"What is the minimum distance to reach the destination?"*

---

## 📈 Difficulty Levels

### **Easy Level (40%)**
- Simple right-angle movements
- Basic Pythagorean applications
- Single direction changes

### **Medium Level (45%)**
- Complex movement sequences
- Multiple direction changes
- Distance optimization problems

### **Difficult Level (15%)**
- Multi-step optimization
- Obstacle avoidance
- Advanced geometric calculations

---

## 🧮 Mathematical Tools

### **Pythagorean Triples**
Common right triangles for quick calculation:
- **3-4-5**: √(9+16) = 5
- **5-12-13**: √(25+144) = 13
- **6-8-10**: √(36+64) = 10
- **7-24-25**: √(49+576) = 25

### **Quick Square Roots**

√2 ≈ 1.414  √3 ≈ 1.732  √5 ≈ 2.236  
√6 ≈ 2.449  √8 ≈ 2.828  √10 ≈ 3.162  
√13 ≈ 3.606  √15 ≈ 3.873  √17 ≈ 4.123  
√18 ≈ 4.243  √20 ≈ 4.472  √25 = 5

### **Common Calculations**

√(25+25) = √50 = 5√2 ≈ 7.07  
√(36+36) = √72 = 6√2 ≈ 8.48  
√(49+49) = √98 = 7√2 ≈ 9.90  
√(64+64) = √128 = 8√2 ≈ 11.31

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Confusing Distance Types**
❌ Using actual distance when displacement is asked
✅ Clearly distinguish between path length and straight-line distance

### **Mistake 2: Wrong Sign Handling**
❌ Adding instead of subtracting opposite directions
✅ Net movement = Positive - Negative directions

### **Mistake 3: Pythagorean Misapplication**
❌ Applying Pythagoras to non-right-angle triangles
✅ Only use for perpendicular movements

### **Mistake 4: Unit Conversion Errors**
❌ Mixing meters, kilometers without conversion
✅ Maintain consistent units throughout

---

## 🎓 Pro Tips for Success

1. **Use Coordinate System**: Always plot movements on X-Y axes
2. **Track Net Movements**: Calculate North-South and East-West separately
3. **Apply Pythagoras Correctly**: Only for right-angle movements
4. **Memorize Common Triples**: 3-4-5, 5-12-13, etc. for quick calculation
5. **Maintain Unit Consistency**: Convert all distances to same units
6. **Visualize the Triangle**: Picture the right triangle formed by movements
7. **Double-Check Calculations**: Verify arithmetic and square roots

---

## 📊 Practice Examples

### **Example 1: Basic Displacement**
*"A walks 9m North, 12m East, 5m South"*

**Solution:**
- Net N-S: 9 - 5 = 4m
- Net E-W: 12m
- Displacement: √(4² + 12²) = √(16 + 144) = √160 = 4√10m

### **Example 2: Complex Path**
*"3km N, 4km E, 3km S, 4km W"*

**Solution:**
- Net N-S: 3 - 3 = 0km
- Net E-W: 4 - 4 = 0km
- Displacement: √(0² + 0²) = 0km (back to start)

### **Example 3: Return Distance**
*"After movements, how far to return home?"*

**Solution:**
- Displacement from home = Shortest distance calculated
- Return distance = Same displacement value

---

## 🔍 Integration with Other Topics

### **With Turning Problems**
- Track direction changes and distances
- Calculate position after each turn
- Apply distance formulas for final displacement

### **With Shortest Path Problems**
- Compare actual vs optimal paths
- Calculate minimum distance requirements
- Optimize routes for efficiency

### **With Blood Relations**
- Calculate relative positions
- Determine distances between family members
- Solve integrated directional problems

**Master distance calculations to accurately solve all types of direction sense problems! 📏✨**`
};