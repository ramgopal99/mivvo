import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: "7.6",
  title: 'Shortest Distance Problems',
  status: 'completed',
  content: "`# ðŸ“ Shortest Distance Problems

Shortest distance problems involve finding the most direct path between two points, often using Pythagorean theorem for right-angle movements. These problems require distinguishing between actual distance traveled (path length) and displacement (straight-line distance), which is crucial for optimization in competitive exams.

---

## ðŸŽ¯ Understanding Shortest Distance

### **Key Concepts**

#### **Displacement vs Distance**
- **Displacement**: Straight-line distance between start and end points
- **Distance**: Total path length traveled
- **Shortest Distance**: Minimum possible distance (displacement)

#### **When Pythagoras Applies**
- Movements at 90Â° angles (North-South and East-West)
- Perpendicular directional components
- Right-angle triangle formation

#### **Formula Application**
**Shortest Distance = âˆš[(Net East-West)Â² + (Net North-South)Â²]**

---

## ðŸ§® Pythagorean Theorem Application

### **Right Triangle Formation**

When movements are perpendicular (90Â° angles), they form a right-angled triangle:

CÂ² = AÂ² + BÂ²  
Where:  
- C = Shortest distance (hypotenuse)  
- A = Net North-South distance  
- B = Net East-West distance

### **Example Calculation**

Movements: 6km East, 8km North  
Net E-W: +6km, Net N-S: +8km  
Shortest Distance: âˆš(6Â² + 8Â²) = âˆš(36 + 64) = âˆš100 = 10km  
Actual Distance Traveled: 6 + 8 = 14km

---

## ðŸŽ¯ Problem Types and Solutions

### **Type 1: Basic Displacement**
*"A man walks 9m North, 12m East. What is shortest distance from start?"*

**Solution:**
- Net North-South: +9m
- Net East-West: +12m
- Shortest Distance: âˆš(9Â² + 12Â²) = âˆš(81 + 144) = âˆš225 = 15m

### **Type 2: Complex Path with Returns**
*"Walk 15m North, 8m South, 20m East, 5m West. Find shortest distance."*

**Solution:**
- Net N-S: 15 - 8 = +7m
- Net E-W: 20 - 5 = +15m
- Shortest Distance: âˆš(7Â² + 15Â²) = âˆš(49 + 225) = âˆš274 = âˆš(49Ã—5) = 7âˆš5m

### **Type 3: Zero Displacement**
*"Walk 10m East, 10m West, 5m North, 5m South. Shortest distance?"*

**Solution:**
- Net N-S: 5 - 5 = 0m
- Net E-W: 10 - 10 = 0m
- Shortest Distance: âˆš(0Â² + 0Â²) = 0m (back to start)

---

## ðŸ“Š Advanced Shortest Distance Problems

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

## ðŸ› ï¸ Shortest Distance Framework

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
   - Confirm 90Â° angle between components
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

## ðŸŽ¯ Common Pythagorean Triples

### **Common Right Triangles**

3-4-5: âˆš(9+16) = 5  
5-12-13: âˆš(25+144) = 13  
6-8-10: âˆš(36+64) = 10  
7-24-25: âˆš(49+576) = 25  
8-15-17: âˆš(64+225) = 17  
9-12-15: âˆš(81+144) = 15  
9-40-41: âˆš(81+1600) = 41

### **Quick Calculations**

âˆš(25+25) = âˆš50 = 5âˆš2 â‰ˆ 7.07  
âˆš(36+36) = âˆš72 = 6âˆš2 â‰ˆ 8.49  
âˆš(49+49) = âˆš98 = 7âˆš2 â‰ˆ 9.90  
âˆš(64+64) = âˆš128 = 8âˆš2 â‰ˆ 11.31  
âˆš(81+81) = âˆš162 = 9âˆš2 â‰ˆ 12.73

---

## ðŸ“ˆ Problem Variations

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

## ðŸŽ¯ Question Patterns

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

## ðŸ“Š Coordinate-Based Solutions

### **Coordinate System Method**

Starting Point: (0,0)  
Each movement updates coordinates:  
North: (x, y+d)  
South: (x, y-d)  
East: (x+d, y)  
West: (x-d, y)  

Final Position: (x_final, y_final)  
Shortest Distance: âˆš(x_finalÂ² + y_finalÂ²)

### **Example Tracking**

Start: (0,0)  
+ 5km North: (0,5)  
+ 12km East: (12,5)  
- 3km South: (12,2)  
Shortest Distance: âˆš(12Â² + 2Â²) = âˆš(144 + 4) = âˆš148 = 2âˆš37

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Confusing Distance Types**
âŒ Using actual distance when shortest distance is asked
âœ… Displacement = shortest distance, Distance = path length

### **Mistake 2: Wrong Pythagorean Application**
âŒ Applying to non-right-angle triangles
âœ… Only for perpendicular directional components

### **Mistake 3: Sign Errors in Net Calculation**
âŒ Adding instead of subtracting opposite directions
âœ… Net movement = positive - negative directions

### **Mistake 4: Square Root Calculation Errors**
âŒ Incorrect square root arithmetic
âœ… Memorize common Pythagorean triples

---

## ðŸŽ“ Pro Tips for Success

1. **Use Coordinate System**: Track position with (x,y) coordinates
2. **Calculate Net Movements**: Find net East-West and North-South
3. **Apply Pythagoras Correctly**: Only for 90Â° directional components
4. **Memorize Common Triples**: 3-4-5, 5-12-13, etc. for quick calculation
5. **Maintain Unit Consistency**: Same units throughout calculation
6. **Visualize Right Triangle**: Picture the triangle formed by movements
7. **Double-Check Calculations**: Verify arithmetic and square roots

---

## ðŸ“Š Practice Examples

### **Example 1: Simple Displacement**
*"A man walks 5m North, 12m East, then 3m South. Shortest distance?"*

**Solution:**
- Net N-S: 5 - 3 = 2m
- Net E-W: 12m
- Shortest Distance: âˆš(2Â² + 12Â²) = âˆš(4 + 144) = âˆš148 = 2âˆš37m

### **Example 2: Complex Path**
*"8m N, 6m E, 8m S, 6m W. Find shortest distance from start."*

**Solution:**
- Net N-S: 8 - 8 = 0m
- Net E-W: 6 - 6 = 0m
- Shortest Distance: âˆš(0Â² + 0Â²) = 0m

### **Example 3: Return Distance**
*"After walking 9m E and 12m N, how far to return home?"*

**Solution:**
- Displacement: âˆš(9Â² + 12Â²) = 15m
- Return distance = 15m (straight back)

### **Example 4: Path Comparison**
*"Path A: 5m N, 12m E (total 17m). Path B: direct. Which is shorter?"*

**Solution:**
- Path A: 17m (actual distance)
- Path B: âˆš(5Â² + 12Â²) = 13m (shortest)
- Path B is shorter

---

## ðŸ” Integration with Other Topics

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

**Master shortest distance calculations to solve complex path optimization problems! ðŸ“âœ¨**`"
};
