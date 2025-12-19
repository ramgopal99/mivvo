import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: "7.6",
  title: 'Shortest Distance Problems',
  status: 'completed',
  content: `# 📏 Shortest Distance Problems

Shortest distance problems involve finding the most direct path between two points, often using Pythagorean theorem for right-angle movements. These problems require distinguishing between actual distance traveled (path length) and displacement (straight-line distance), which is crucial for optimization in competitive exams.

---

## 🎯 Understanding Shortest Distance

### **Key Concepts**

#### **Displacement vs Distance**
- **Displacement**: Straight-line distance between start and end points
- **Distance**: Total path length traveled
- **Shortest Distance**: Minimum possible distance (displacement)

#### **When Pythagoras Applies**
- Movements at 90° angles (North-South and East-West)
- Perpendicular directional components
- Right-angle triangle formation

#### **Formula Application**
**Shortest Distance = √[(Net East-West)² + (Net North-South)²]**

---

## 🧮 Pythagorean Theorem Application

### **Right Triangle Formation**

When movements are perpendicular (90° angles), they form a right-angled triangle:

C² = A² + B²  
Where:  
- C = Shortest distance (hypotenuse)  
- A = Net North-South distance  
- B = Net East-West distance

### **Example Calculation**

Movements: 6km East, 8km North  
Net E-W: +6km, Net N-S: +8km  
Shortest Distance: √(6² + 8²) = √(36 + 64) = √100 = 10km  
Actual Distance Traveled: 6 + 8 = 14km

---

## 🎯 Problem Types and Solutions

### **Type 1: Basic Displacement**
*"A man walks 9m North, 12m East. What is shortest distance from start?"*

**Solution:**
- Net North-South: +9m
- Net East-West: +12m
- Shortest Distance: √(9² + 12²) = √(81 + 144) = √225 = 15m

### **Type 2: Complex Path with Returns**
*"Walk 15m North, 8m South, 20m East, 5m West. Find shortest distance."*

**Solution:**
- Net N-S: 15 - 8 = +7m
- Net E-W: 20 - 5 = +15m
- Shortest Distance: √(7² + 15²) = √(49 + 225) = √274 = √(49×5) = 7√5m

### **Type 3: Zero Displacement**
*"Walk 10m East, 10m West, 5m North, 5m South. Shortest distance?"*

**Solution:**
- Net N-S: 5 - 5 = 0m
- Net E-W: 10 - 10 = 0m
- Shortest Distance: √(0² + 0²) = 0m (back to start)

---

## 📊 Advanced Shortest Distance Problems

### **Problem 1: Multi-Step Optimization**
*"Find minimum distance to reach destination via optimal path"*

**Solution:**
- Calculate straight-line distance
- Compare with given path
- Identify shortest possible route

### **Problem 2: Obstacle Avoidance**
*"Find shortest path avoiding obstacles"*

**Solution:**
- Calculate direct distance
- Add detour calculations
- Find minimum path around obstacles

### **Problem 3: Time-Distance Optimization**
*"Find fastest path considering different terrains"*

**Solution:**
- Calculate distance for each path option
- Factor in speed variations
- Choose optimal time-distance combination

---

## 🛠️ Shortest Distance Framework

### **Step-by-Step Approach**

1. **Analyze Movement Components**
   - Separate North-South movements
   - Separate East-West movements
   - Calculate net displacement in each direction

2. **Apply Pythagorean Theorem**
   - Identify perpendicular components
   - Square each component
   - Sum squares and take square root

3. **Verify Right Angle Condition**
   - Confirm 90° angle between components
   - Check for diagonal movements
   - Adjust calculations if needed

4. **Calculate and Interpret**
   - Compute numerical value
   - Round appropriately
   - Compare with actual distance traveled

5. **Validate Solution**
   - Cross-check arithmetic
   - Ensure logical consistency
   - Verify against problem constraints

---

## 🎯 Common Pythagorean Triples

### **Common Right Triangles**

3-4-5: √(9+16) = 5  
5-12-13: √(25+144) = 13  
6-8-10: √(36+64) = 10  
7-24-25: √(49+576) = 25  
8-15-17: √(64+225) = 17  
9-12-15: √(81+144) = 15  
9-40-41: √(81+1600) = 41

### **Quick Calculations**

√(25+25) = √50 = 5√2 ≈ 7.07  
√(36+36) = √72 = 6√2 ≈ 8.49  
√(49+49) = √98 = 7√2 ≈ 9.90  
√(64+64) = √128 = 8√2 ≈ 11.31  
√(81+81) = √162 = 9√2 ≈ 12.73

---

## 📈 Problem Variations

### **Variation 1: Return Journey**
*"After reaching a point, find distance to return directly"*

**Solution:**
- Calculate current displacement from start
- Return distance = displacement value
- Direction = opposite of net movement

### **Variation 2: Multiple Points**
*"Find shortest distance passing through multiple points"*

**Solution:**
- Calculate segment distances
- Sum straight-line segments
- Find optimal path through all points

### **Variation 3: Constrained Movement**
*"Find shortest distance with directional constraints"*

**Solution:**
- Identify allowed movement directions
- Calculate within constraints
- Find minimum distance under restrictions

---

## 🎯 Question Patterns

### **Pattern 1: Direct Shortest Distance**
*"What is the shortest distance from start to end?"*

### **Pattern 2: Compare Paths**
*"Which path is shorter: actual path or direct path?"*

### **Pattern 3: Return Distance**
*"How far must he walk to return directly home?"*

### **Pattern 4: Minimum Path**
*"What is the minimum distance to reach destination?"*

### **Pattern 5: Path Optimization**
*"Find the shortest possible route to destination"*

---

## 📊 Coordinate-Based Solutions

### **Coordinate System Method**

Starting Point: (0,0)  
Each movement updates coordinates:  
North: (x, y+d)  
South: (x, y-d)  
East: (x+d, y)  
West: (x-d, y)  

Final Position: (x_final, y_final)  
Shortest Distance: √(x_final² + y_final²)

### **Example Tracking**

Start: (0,0)  
+ 5km North: (0,5)  
+ 12km East: (12,5)  
- 3km South: (12,2)  
Shortest Distance: √(12² + 2²) = √(144 + 4) = √148 = 2√37

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Confusing Distance Types**
❌ Using actual distance when shortest distance is asked
✅ Displacement = shortest distance, Distance = path length

### **Mistake 2: Wrong Pythagorean Application**
❌ Applying to non-right-angle triangles
✅ Only for perpendicular directional components

### **Mistake 3: Sign Errors in Net Calculation**
❌ Adding instead of subtracting opposite directions
✅ Net movement = positive - negative directions

### **Mistake 4: Square Root Calculation Errors**
❌ Incorrect square root arithmetic
✅ Memorize common Pythagorean triples

---

## 🎓 Pro Tips for Success

1. **Use Coordinate System**: Track position with (x,y) coordinates
2. **Calculate Net Movements**: Find net East-West and North-South
3. **Apply Pythagoras Correctly**: Only for 90° directional components
4. **Memorize Common Triples**: 3-4-5, 5-12-13, etc. for quick calculation
5. **Maintain Unit Consistency**: Same units throughout calculation
6. **Visualize Right Triangle**: Picture the triangle formed by movements
7. **Double-Check Calculations**: Verify arithmetic and square roots

---

## 📊 Practice Examples

### **Example 1: Simple Displacement**
*"A man walks 5m North, 12m East, then 3m South. Shortest distance?"*

**Solution:**
- Net N-S: 5 - 3 = 2m
- Net E-W: 12m
- Shortest Distance: √(2² + 12²) = √(4 + 144) = √148 = 2√37m

### **Example 2: Complex Path**
*"8m N, 6m E, 8m S, 6m W. Find shortest distance from start."*

**Solution:**
- Net N-S: 8 - 8 = 0m
- Net E-W: 6 - 6 = 0m
- Shortest Distance: √(0² + 0²) = 0m

### **Example 3: Return Distance**
*"After walking 9m E and 12m N, how far to return home?"*

**Solution:**
- Displacement: √(9² + 12²) = 15m
- Return distance = 15m (straight back)

### **Example 4: Path Comparison**
*"Path A: 5m N, 12m E (total 17m). Path B: direct. Which is shorter?"*

**Solution:**
- Path A: 17m (actual distance)
- Path B: √(5² + 12²) = 13m (shortest)
- Path B is shorter

---

## 🔍 Integration with Other Topics

### **With Direction-Based Movement**
- Track coordinates through movement sequences
- Calculate displacement at any point
- Find optimal paths during movement

### **With Distance Calculation**
- Distinguish between actual and shortest distance
- Apply appropriate calculation methods
- Compare path efficiencies

### **With Turning Problems**
- Calculate shortest distance after turn sequences
- Track position changes with orientation
- Optimize paths with directional constraints

**Master shortest distance calculations to solve complex path optimization problems! 📏✨**`
};