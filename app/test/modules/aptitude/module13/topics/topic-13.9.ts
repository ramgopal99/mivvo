import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_9: SubLesson = {
  id: "13.9",
  title: 'Graphical Representation (Basic)',
  status: 'completed',
  content: `# 📊 Graphical Representation (Basic)

Explore the visual beauty of linear equations through graphs! Understanding graphical representation helps you visualize solutions and comprehend the geometric meaning of linear equations. Learn to plot lines and interpret their relationships.

---

## 🎯 Why Graphical Representation?

**Graphical representation** provides:
- Visual understanding of linear equations
- Geometric interpretation of solutions
- Easy identification of solution types
- Foundation for coordinate geometry

### **Key Concepts:**
- Coordinate plane
- Plotting points
- Drawing lines
- Interpreting intersections

---

## 📈 The Coordinate Plane

### **Components:**
- **X-axis**: Horizontal axis (abscissa)
- **Y-axis**: Vertical axis (ordinate)
- **Origin**: Point (0, 0) where axes intersect
- **Quadrants**: Four regions divided by axes

### **Point Representation:**
A point is represented as **(x, y)**
- x-coordinate: distance from y-axis
- y-coordinate: distance from x-axis

### **Example Points:**
- (3, 2): 3 units right, 2 units up
- (-2, 4): 2 units left, 4 units up
- (0, 5): On y-axis, 5 units up
- (4, 0): On x-axis, 4 units right

---

## 📊 Plotting Linear Equations

### **Method 1: Table of Values**
**Equation:** \`2x + y = 6\`

**Step 1:** Express y in terms of x
\`y = 6 - 2x\`

**Step 2:** Create table of values

| x | y = 6 - 2x | Point |
|---|------------|-------|
| 0 | 6 - 0 = 6 | (0, 6) |
| 1 | 6 - 2 = 4 | (1, 4) |
| 2 | 6 - 4 = 2 | (2, 2) |
| 3 | 6 - 6 = 0 | (3, 0) |

**Step 3:** Plot points and draw line

### **Method 2: Intercept Method**
**Equation:** \`x/2 + y/3 = 1\`

**Step 1:** Find intercepts
- X-intercept (y=0): \`x/2 = 1\` → \`x = 2\` → (2, 0)
- Y-intercept (x=0): \`y/3 = 1\` → \`y = 3\` → (0, 3)

**Step 2:** Plot intercepts and draw line

---

## 🔢 Slope-Intercept Form

### **General Form:** \`y = mx + c\`

**Components:**
- \`m\`: slope (steepness)
- \`c\`: y-intercept (where line crosses y-axis)

### **Slope Interpretation:**
- Positive slope: line rises left to right
- Negative slope: line falls left to right
- Zero slope: horizontal line
- Undefined slope: vertical line

### **Examples:**
- \`y = 2x + 3\`: slope = 2, intercept = 3
- \`y = -x + 1\`: slope = -1, intercept = 1
- \`y = 3\`: slope = 0, intercept = 3 (horizontal)
- \`x = 2\`: vertical line at x = 2

---

## 📊 System of Linear Equations

### **Graphical Solution Methods:**

#### **Method 1: Plot Both Lines**
**System:**
\`\`\`
x + y = 6  ...(1)
x - y = 2  ...(2)
\`\`\`

**Step 1:** Convert to slope-intercept
Equation (1): \`y = 6 - x\`
Equation (2): \`y = x - 2\`

**Step 2:** Plot both lines
- Line 1: through (0,6) and (6,0)
- Line 2: through (0,-2) and (2,0)

**Step 3:** Find intersection point (2, 4)

#### **Method 2: Use Intercepts**
**System:**
\`\`\`
2x + 3y = 12  ...(1)
x + 2y = 8     ...(2)
\`\`\`

**Find intercepts for each equation and plot**

---

## 🎯 Types of Solutions

### **1. Unique Solution (Intersecting Lines)**
Lines cross at exactly one point

**Example:**
\`\`\`
x + y = 7
x - y = 3
\`\`\`
**Solution:** (5, 2)

**Graphically:** Two lines intersecting at one point

### **2. Infinite Solutions (Coincident Lines)**
Lines lie on top of each other

**Example:**
\`\`\`
2x + y = 4
4x + 2y = 8
\`\`\`
**Solution:** Infinite points on the line y = 4 - 2x

**Graphically:** Same line (superimposed)

### **3. No Solution (Parallel Lines)**
Lines never intersect

**Example:**
\`\`\`
x + y = 3
x + y = 5
\`\`\`
**Solution:** No solution

**Graphically:** Parallel lines

---

## 📈 Distance Formula

### **Distance Between Two Points:**
**Formula:** \`d = √[(x₂ - x₁)² + (y₂ - y₁)²]\`

**Example:** Distance between (2, 3) and (5, 7)
\`d = √[(5-2)² + (7-3)²] = √[9 + 16] = √25 = 5\`

### **Applications:**
- Finding distance between solution points
- Verifying solutions
- Geometric problems

---

## 📊 Area of Triangle

### **Formula:** \`Area = ½| (x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂)) |\`

**Example:** Points (0,0), (4,0), (2,3)
\`Area = ½| (0(0-3) + 4(3-0) + 2(0-0)) | = ½|0 + 12 + 0| = ½×12 = 6\`

---

## 🔄 Converting Forms

### **Slope-Intercept to General Form**
**Equation:** \`y = 2x + 3\`

**Step 1:** Bring to one side
\`y - 2x - 3 = 0\`

**Step 2:** Make x coefficient positive
\` -2x + y - 3 = 0\`
\`2x - y + 3 = 0\`

### **General to Slope-Intercept Form**
**Equation:** \`3x + 4y - 12 = 0\`

**Step 1:** Solve for y
\`4y = -3x + 12\`
\`y = (-3/4)x + 3\`

---

## 🎯 Practice Problems

### **Plotting Lines:**
1. Plot the line: \`y = 2x + 1\`
2. Plot the line: \`x + y = 5\`
3. Plot the line: \`y = -x + 3\`

### **Finding Intercepts:**
1. Find intercepts of: \`2x + 3y = 12\`
2. Find intercepts of: \`x/3 + y/4 = 1\`

### **System Solutions:**
1. Graph and solve: \`x + y = 6\` and \`2x - y = 2\`
2. Graph and solve: \`3x + y = 7\` and \`x + 2y = 8\`

### **Special Cases:**
1. Graph: \`2x + 3y = 6\` and \`4x + 6y = 12\`
2. Graph: \`x + y = 4\` and \`x + y = 6\`

### **Distance and Area:**
1. Distance between (1,2) and (4,6)
2. Area of triangle with points (0,0), (3,0), (1,4)

**Answers:**
Intercepts: (6,0) & (0,4); (3,0) & (0,4)
Systems: (2.67,3.33); (2,3)
Special: Same line; Parallel lines
Distance: √13; Area: 6

---

## 🎓 Pro Tips for Graphical Representation

1. **Choose appropriate scale** - make graph readable
2. **Use graph paper** - accurate plotting
3. **Label axes clearly** - x and y with units
4. **Plot at least two points** - verify line is straight
5. **Use different colors** - distinguish multiple lines
6. **Check intercepts** - easy verification points
7. **Understand slope** - direction and steepness

---

## 🔢 Graphical Problem-Solving Steps

\`\`\`
1. CONVERT equations to slope-intercept form
   ↓
2. IDENTIFY slopes and intercepts
   ↓
3. PLOT y-intercepts on y-axis
   ↓
4. USE slope to find second point
   ↓
5. DRAW lines through the points
   ↓
6. FIND intersection point (if exists)
   ↓
7. VERIFY solution algebraically
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Intercepts**
❌ For \`2x + 3y = 6\`, intercepts are (3,0) and (0,2)
- Set one variable to zero correctly

### **Mistake 2: Incorrect Slope**
❌ Slope is rise over run, not run over rise
- y-change over x-change

### **Mistake 3: Not Using Scale**
❌ Plotting (0,100) and (1,0) without scale
- Use appropriate scale for readability

### **Mistake 4: Missing Negative Signs**
❌ Plotting (-2,3) as (2,-3)
- Pay attention to coordinate signs

Master graphical representation and visualize linear equations like a pro! 🏆`
};