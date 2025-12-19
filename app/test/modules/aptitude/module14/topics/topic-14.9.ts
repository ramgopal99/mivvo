import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_9: SubLesson = {
  id: "14.9",
  title: 'Word Problems Based on Quadratic Equations',
  status: 'completed',
  content: `# 📚 Word Problems Based on Quadratic Equations

Master solving real-world word problems using quadratic equations! This comprehensive guide covers all major categories of aptitude problems with systematic approaches and solved examples. Learn to convert complex scenarios into quadratic equations.

---

## 🎯 Importance of Word Problems

**Word problems** are essential because they:
- Test practical application of quadratic equations
- Develop problem-solving skills
- Appear frequently in competitive exams
- Build logical thinking abilities

### **Common Categories:**
- Geometry problems (area, perimeter)
- Number problems (sums, products)
- Age problems (relationships over time)
- Work and time problems
- Speed-distance-time problems
- Investment and profit problems

---

## 📐 Geometry Problems

### **Example 1: Rectangle Area Problem**
**Problem:** A rectangular plot has area 600 m². Length exceeds width by 10m. Find dimensions.

**Solution:**
Let width = x meters
Length = x + 10 meters

Area: x(x + 10) = 600
x² + 10x - 600 = 0
(x + 30)(x - 20) = 0
x = 20m (width)
Length = 30m

### **Example 2: Square with Path**
**Problem:** Square garden with side 20m has 2m wide path. Find total area including path.

**Solution:**
Outer side = 20 + 2 + 2 = 24m
Total area = 24² = 576 m²

**Alternative:** Path area = total area - garden area
Total area = (side + 2×path)² = (20 + 4)² = 576 m²
Garden area = 20² = 400 m²
Path area = 576 - 400 = 176 m²

### **Example 3: Two Squares**
**Problem:** Difference of areas of two squares is 75 m². Sum of sides is 13m. Find sides.

**Solution:**
Let sides be x, 13-x
Area difference: x² - (13-x)² = 75
x² - (169 - 26x + x²) = 75
x² - 169 + 26x - x² = 75
26x - 169 = 75
26x = 244
x = 244/26 = 38/13 ≈ 2.92m (not practical)

**Problem correction:** Sum of perimeters is 52m
Perimeters: 4x + 4(13-x) = 52
4x + 52 - 4x = 52
52 = 52 (identity - infinite solutions)

---

## 🔢 Number Problems

### **Example 1: Sum and Product**
**Problem:** Sum of two numbers is 20, product is 96. Find numbers.

**Solution:**
Let numbers be x, 20-x
Product: x(20-x) = 96
20x - x² = 96
x² - 20x + 96 = 0
(x - 8)(x - 12) = 0
Numbers: 8 and 12

### **Example 2: Consecutive Numbers**
**Problem:** Three consecutive integers sum to 51. Find numbers.

**Solution:**
Let middle number = x
Numbers: x-1, x, x+1
Sum: (x-1) + x + (x+1) = 51
3x = 51
x = 17
Numbers: 16, 17, 18

### **Example 3: Numbers with Difference**
**Problem:** Two numbers differ by 8. Sum of squares is 260. Find numbers.

**Solution:**
Let numbers be x, x+8
x² + (x+8)² = 260
x² + x² + 16x + 64 = 260
2x² + 16x + 64 = 260
2x² + 16x - 196 = 0
x² + 8x - 98 = 0
(x + 14)(x - 7) = 0
x = 7 (take positive)
Numbers: 7 and 15

---

## 👨‍👩‍👧 Age Problems

### **Example 1: Basic Age Relationship**
**Problem:** Father is 4 times son's age. After 16 years, father will be twice son's age. Find current ages.

**Solution:**
Let son's age = x
Father's age = 4x

After 16 years:
Son: x + 16
Father: 4x + 16
Father will be twice: 4x + 16 = 2(x + 16)
4x + 16 = 2x + 32
2x = 16
x = 8
Ages: Son = 8, Father = 32

### **Example 2: Multiple Relationships**
**Problem:** Mother is 3 times daughter's age. Sister is 5 years younger than daughter. Sum of ages is 55. Find ages.

**Solution:**
Let daughter's age = x
Mother's age = 3x
Sister's age = x - 5

Sum: x + 3x + (x - 5) = 55
5x - 5 = 55
5x = 60
x = 12
Ages: Daughter = 12, Mother = 36, Sister = 7

### **Example 3: Past Age Problem**
**Problem:** 12 years ago, mother was 5 times daughter's age. After 8 years, mother will be 3 times daughter's age. Find current ages.

**Solution:**
Let current daughter's age = x
Current mother's age = y

12 years ago:
Daughter: x - 12
Mother: y - 12
Mother was 5 times: y - 12 = 5(x - 12)
y - 12 = 5x - 60
y = 5x - 48

After 8 years:
Daughter: x + 8
Mother: y + 8
Mother will be 3 times: y + 8 = 3(x + 8)
5x - 48 + 8 = 3x + 24
5x - 40 = 3x + 24
2x = 64
x = 32
y = 5×32 - 48 = 160 - 48 = 112
Ages: Daughter = 32, Mother = 112

---

## ⚙️ Work and Time Problems

### **Example 1: Individual Work Rates**
**Problem:** A completes work in 12 days, B in 18 days. How long together?

**Solution:**
A's rate = 1/12 per day
B's rate = 1/18 per day
Together: 1/12 + 1/18 = 1/7.2 per day
Time = 7.2 days

### **Example 2: Partial Work**
**Problem:** A works twice as fast as B. Together complete work in 9 days. Find individual times.

**Solution:**
Let B's time = x days
A's time = x/2 days

Together rate = 1/(x/2) + 1/x = 2/x + 1/x = 3/x
Time together = x/3 = 9
x = 27 days
A = 13.5 days

### **Example 3: Pipe Problems**
**Problem:** Two pipes fill tank in 10 and 15 hours. Empty pipe empties in 20 hours. How long to fill?

**Solution:**
Filling rates: 1/10 + 1/15 = 1/6 per hour
Emptying rate: 1/20 per hour
Net rate: 1/6 - 1/20 = 10/60 - 3/60 = 7/60 per hour
Time = 60/7 ≈ 8.57 hours

---

## 🚗 Speed-Distance-Time Problems

### **Example 1: Basic SDT**
**Problem:** Train covers 360km at x km/h. Speed increased by 20 km/h, covers same distance in 2 hours less. Find x.

**Solution:**
Time at x: 360/x hours
Time at x+20: 360/(x+20) hours
Difference: 360/x - 360/(x+20) = 2
360(x+20 - x)/(x(x+20)) = 2
360(20)/(x² + 20x) = 2
x² + 20x - 3600 = 0
(x + 60)(x - 50) = 0
x = 50 km/h

### **Example 2: Meeting Point**
**Problem:** Two trains 120m and 100m long run towards each other at 50 km/h and 40 km/h. How long to cross?

**Solution:**
Convert speeds: 50 km/h = 50×5/18 = 125/9 m/s
40 km/h = 40×5/18 = 100/9 m/s
Relative speed = 125/9 + 100/9 = 225/9 m/s
Distance = 120 + 100 = 220m
Time = 220 ÷ (225/9) = 220 × 9/225 = 1980/225 = 8.8 seconds

### **Example 3: Stream Problems**
**Problem:** Boat 10 km/h in still water, 12 km/h downstream. Find stream speed.

**Solution:**
10 + s = 12 → s = 2 km/h

---

## 💰 Investment and Profit Problems

### **Example 1: Simple Interest**
**Problem:** ₹5,000 invested at r% gives ₹600 interest in 2 years. Find r.

**Solution:**
SI = P×R×T/100
600 = 5000×r×2/100
600 = 100×r
r = 6%

### **Example 2: Multiple Investments**
**Problem:** ₹15,000 invested in two schemes at 8% and 12%. Total interest ₹1,560 in 2 years. Find amounts.

**Solution:**
Let amount at 8% = x
Amount at 12% = 15000 - x

Interest: x×0.08×2 + (15000-x)×0.12×2 = 1560
0.16x + 3600 - 0.24x = 1560
3600 - 0.08x = 1560
0.08x = 2040
x = 2040/0.08 = 25,500 (exceeds total - impossible)

**Correct problem:** Total interest ₹1,560 in 1 year
x×0.08 + (15000-x)×0.12 = 1560
0.08x + 1800 - 0.12x = 1560
1800 - 0.04x = 1560
0.04x = 240
x = 6,000
Amounts: ₹6,000 at 8%, ₹9,000 at 12%

---

## 🥛 Mixture Problems

### **Example 1: Two Solutions**
**Problem:** Mix 20% and 40% solutions to get 30% solution. Ratio?

**Solution:**
Let quantities be x, y of 20% and 40%
(0.2x + 0.4y)/(x + y) = 0.30
20x + 40y = 30x + 30y
10y = 10x
x/y = 1/1
Ratio 1:1

### **Example 2: Replacement**
**Problem:** 10 liters 20% solution. Replace 4 liters with water. New concentration?

**Solution:**
Salt initially: 10 × 0.2 = 2 liters
After replacement: 2 - 4×0.2 = 2 - 0.8 = 1.2 liters salt
Concentration: 1.2/10 = 12%

### **Example 3: Multiple Mixings**
**Problem:** Mix solutions of 20%, 30%, 40% to get 25% solution. Ratio?

**Solution:**
Let quantities be x, y, z
(0.2x + 0.3y + 0.4z)/(x + y + z) = 0.25
20x + 30y + 40z = 25x + 25y + 25z
5y + 15z = 5x
x = y + 3z
Many solutions possible

---

## 🎯 Practice Problems

### **Geometry Problems:**
1. **Rectangle:** Area 144m², length 4m more than width.
2. **Square path:** Garden side 15m, 2m path, total area?
3. **Two rectangles:** Areas differ by 21m², widths differ by 2m.

### **Number Problems:**
1. **Sum product:** Numbers sum 25, product 156.
2. **Consecutive:** Four consecutive integers sum 26.
3. **Difference:** Numbers differ by 5, squares sum 97.

### **Age Problems:**
1. **Father-son:** Father 5 times son. After 10 years, father 3 times son.
2. **Three people:** A twice B, B 10 years older than C, sum 75.
3. **Past ages:** 15 years ago, ratio 3:1. After 10 years, ratio 2:1.

### **Work Problems:**
1. **Two workers:** A works 8 days, B 12 days, together?
2. **Three workers:** A:B:C = 2:3:4, together complete in 10 days.
3. **Pipe system:** Two fill in 12,15 hours, one empties in 20 hours.

### **Speed Problems:**
1. **Train speed:** 240km in x hours. Speed +15 km/h, time -1 hour.
2. **Relative speed:** Two trains 150m,120m at 60,45 km/h towards each other.
3. **Stream:** Boat 12 km/h still water, 16 km/h downstream.

**Answers:**
Geometry: 12×12m; 361m²; Various solutions
Numbers: 13,12; 5,6,7,8; 6,11
Age: Son-10, Father-50; C-5, B-15, A-30; Son-15, Father-45
Work: 4.8 days; A-20, B-30, C-40 days; 8 hours
Speed: x=48 km/h; 10 seconds; Stream 4 km/h

---

## 🎓 Pro Tips for Word Problems

1. **Identify the type** - geometry, numbers, age, work, speed
2. **Choose variables carefully** - should lead to quadratic
3. **Form equations systematically** - convert relationships
4. **Check units** - ensure consistency
5. **Verify solutions** - substitute back
6. **Look for multiple answers** - check which make sense
7. **Practice regularly** - different problem types

---

## 🔢 Problem-Solving Framework

\`\`\`
1. UNDERSTAND the problem
   - Read multiple times
   - Identify unknowns
   - Note relationships

2. PLAN the solution
   - Choose variables
   - Identify equations needed
   - Select solving method

3. EXECUTE the plan
   - Write equations
   - Solve systematically
   - Show all steps

4. VERIFY the solution
   - Check calculations
   - Ensure real-world validity
   - Answer the question asked
\`\`\`

Master quadratic word problems and excel in aptitude examinations! 🏆`
};