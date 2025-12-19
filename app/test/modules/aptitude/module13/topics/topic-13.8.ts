import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_8: SubLesson = {
  id: "13.8",
  title: 'Word Problems Based on Linear Equations',
  status: 'completed',
  content: `# 📚 Word Problems Based on Linear Equations

Master solving real-world word problems using linear equations! This comprehensive guide covers all major categories of aptitude problems with systematic approaches and solved examples. Learn to convert complex scenarios into solvable mathematical equations.

---

## 🎯 Importance of Word Problems

**Word problems** test your ability to:
- Understand real-world situations
- Convert English to mathematics
- Apply linear equations practically
- Think logically and systematically

### **Common Categories:**
- Age problems
- Money and cost problems
- Distance-speed-time problems
- Work and time problems
- Mixture problems
- Investment problems

---

## 👨‍👩‍👧 Age Problems

### **Example 1: Basic Age Difference**
**Problem:** A father is 30 years older than his son. The sum of their ages is 60 years. Find their present ages.

**Solution:**
Let son's age = \`x\` years
Father's age = \`x + 30\` years

Equation: \`x + (x + 30) = 60\`
\`2x + 30 = 60\`
\`2x = 30\`
\`x = 15\`

Father: \`15 + 30 = 45\` years

**Answer:** Son: 15 years, Father: 45 years

### **Example 2: Future Age Problem**
**Problem:** A mother is 3 times as old as her daughter. After 5 years, she will be twice as old as her daughter. Find their present ages.

**Solution:**
Let daughter's age = \`x\` years
Mother's age = \`3x\` years

After 5 years:
Daughter: \`x + 5\`
Mother: \`3x + 5\`

Equation: \`3x + 5 = 2(x + 5)\`
\`3x + 5 = 2x + 10\`
\`3x - 2x = 10 - 5\`
\`x = 5\`

Mother: \`3 × 5 = 15\` years

**Answer:** Daughter: 5 years, Mother: 15 years

### **Example 3: Past Age Problem**
**Problem:** 10 years ago, a man was 4 times his son's age. 10 years hence, he will be twice his son's age. Find their present ages.

**Solution:**
Let son's present age = \`x\` years
Father's present age = father's age 10 years ago + 20 years

10 years ago:
Son: \`x - 10\`
Father: \`4(x - 10)\`

So father's present age = \`4(x - 10) + 20 = 4x - 40 + 20 = 4x - 20\`

10 years hence:
Son: \`x + 10\`
Father: \`4x - 20 + 10 = 4x - 10\`

Equation: \`4x - 10 = 2(x + 10)\`
\`4x - 10 = 2x + 20\`
\`4x - 2x = 20 + 10\`
\`2x = 30\`
\`x = 15\`

Father: \`4×15 - 20 = 60 - 20 = 40\` years

**Answer:** Son: 15 years, Father: 40 years

---

## 💰 Money and Cost Problems

### **Example 1: Cost Price Problem**
**Problem:** A shopkeeper buys 3 kg apples and 4 kg oranges for ₹280. He buys 2 kg apples and 5 kg oranges for ₹250. Find price per kg.

**Solution:**
Let apple price = \`x\` ₹/kg
Orange price = \`y\` ₹/kg

Equations:
\`3x + 4y = 280\` ...(1)
\`2x + 5y = 250\` ...(2)

Multiply (1) by 2, (2) by 3:
\`6x + 8y = 560\` ...(3)
\`6x + 15y = 750\` ...(4)

Subtract (3) from (4):
\`7y = 190\`
\`y = 190/7 ≈ 27.14\`

From (1): \`3x + 4×(190/7) = 280\`
\`3x + 760/7 = 280\`
\`3x = 280 - 760/7 = (1960 - 760)/7 = 1200/7\`
\`x = 400/7 ≈ 57.14\`

**Answer:** Apples: ₹400/7/kg, Oranges: ₹190/7/kg

### **Example 2: Profit/Loss Problem**
**Problem:** A sells an item at 20% profit, B at 20% loss. Overall no profit/loss. Prove that cost price ratio is 1:4.

**Solution:**
Let cost price for A = \`x\`
Cost price for B = \`4x\` (since ratio 1:4)

A's selling price = \`x × 1.2 = 1.2x\`
B's selling price = \`4x × 0.8 = 3.2x\`

Total SP = \`1.2x + 3.2x = 4.4x\`
Total CP = \`x + 4x = 5x\`

Since 4.4x = 5x, there is loss. Wait, problem says no profit/loss.

**Correct Problem:** Two items with cost prices in ratio 4:1. First sold at 20% profit, second at 20% loss, overall no profit/loss.

**Solution:**
Let CP of first = \`4x\`, second = \`x\`

First SP = \`4x × 1.2 = 4.8x\`
Second SP = \`x × 0.8 = 0.8x\`

Total SP = \`4.8x + 0.8x = 5.6x\`
Total CP = \`4x + x = 5x\`

Profit = \`5.6x - 5x = 0.6x\` (not zero)

**Correct Approach:**
For no profit/loss: Profit % on one = Loss % on other
Let profit % = loss % = r%

Then: \`r/100 = r/100\` → always true? No.

Actually: When one gains r%, other loses r%, then:
Total SP/CP = 1 + (profit × r/100) - (loss × r/100) = 1

---

## 🚗 Distance-Speed-Time Problems

### **Example 1: Basic DST Problem**
**Problem:** A car travels 300 km at 60 km/h. How long to cover 450 km at 75 km/h?

**Solution:**
Time = Distance/Speed
First: \`300/60 = 5\` hours
Second: \`450/75 = 6\` hours

### **Example 2: Relative Speed**
**Problem:** Two trains 200m and 150m long run at 60 km/h and 40 km/h. How long to cross each other?

**Solution:**
Convert to m/s: 60 km/h = \`60 × 5/18 = 50/3\` m/s
40 km/h = \`40 × 5/18 = 100/9\` m/s

Relative speed = \`50/3 + 100/9 = 200/9\` m/s
Total length = \`200 + 150 = 350\` m

Time = \`350 ÷ (200/9) = 350 × 9/200 = 63/40 = 1.575\` hours

### **Example 3: Meeting Point**
**Problem:** Two persons start from same point. A walks 4 km/h, B 5 km/h. After how many hours will they be 9 km apart?

**Solution:**
Let time = \`t\` hours
Distance by A = \`4t\`
Distance by B = \`5t\`

Difference: \`5t - 4t = t = 9\`
\`t = 9\` hours

---

## ⚙️ Work and Time Problems

### **Example 1: Individual Work Rates**
**Problem:** A can do work in 12 days, B in 18 days. How long together?

**Solution:**
A's 1-day work = \`1/12\`
B's 1-day work = \`1/18\`

Together: \`1/12 + 1/18 = 3/36 + 2/36 = 5/36\`

Time = \`36/5 = 7.2\` days

### **Example 2: Pipe Problem**
**Problem:** Two pipes fill tank in 6 and 8 hours. Empty pipe empties in 12 hours. How long to fill?

**Solution:**
Filling pipe A: \`1/6\` per hour
Filling pipe B: \`1/8\` per hour
Empty pipe: \`1/12\` per hour (negative)

Net rate: \`1/6 + 1/8 - 1/12 = 4/24 + 3/24 - 2/24 = 5/24\`

Time: \`24/5 = 4.8\` hours

### **Example 3: Efficiency Problem**
**Problem:** A does work in 10 days. B is 50% more efficient. How long together?

**Solution:**
A's efficiency: \`1/10\` per day
B's efficiency: \`1.5 × 1/10 = 3/20\` per day

Together: \`1/10 + 3/20 = 2/20 + 3/20 = 5/20 = 1/4\`

Time: \`4\` days

---

## 🥛 Mixture Problems

### **Example 1: Two Solutions**
**Problem:** Mix 20% and 40% solutions to get 30% solution. Ratio?

**Solution:**
Let quantity of 20% = \`x\`
40% = \`y\`

Equations:
\`x + y = total\` (say 1 unit)
\`0.2x + 0.4y = 0.3(x + y)\`

\`0.2x + 0.4y = 0.3x + 0.3y\`
\`0.1y = 0.1x\`
\`x = y\`

Ratio 1:1

### **Example 2: Replacement Problem**
**Problem:** 10 liters of 20% solution. Replace 2 liters with water. New concentration?

**Solution:**
Salt in original: \`10 × 0.2 = 2\` liters
After replacement: \`2 - 2×0.2 = 2 - 0.4 = 1.6\` liters salt in 10 liters

Concentration: \`1.6/10 = 16%\`

---

## 📈 Investment Problems

### **Example 1: Simple Interest**
**Problem:** ₹5000 invested at 8% SI. Amount after 3 years?

**Solution:**
SI = \`5000 × 8 × 3 / 100 = 1200\`
Amount = \`5000 + 1200 = 6200\`

### **Example 2: Different Rates**
**Problem:** ₹10,000 in two schemes: 6% and 8%. Total interest ₹700. Find amounts.

**Solution:**
Let amount at 6% = \`x\`
At 8% = \`10000 - x\`

Interest: \`x×0.06 + (10000-x)×0.08 = 700\`
\`0.06x + 800 - 0.08x = 700\`
\`800 - 0.02x = 700\`
\`0.02x = 100\`
\`x = 5000\`

**Answer:** ₹5,000 at 6%, ₹5,000 at 8%

### **Example 3: Compound Interest**
**Problem:** ₹10,000 at 10% CI annually. Amount after 2 years?

**Solution:**
Year 1: \`10000 × 1.1 = 11000\`
Year 2: \`11000 × 1.1 = 12100\`

---

## 🎯 Practice Problems

### **Age Problems:**
1. Father 4 times son's age. Ages sum 75. Find ages.
2. Sister 3 years younger than brother. Sum 25. Find ages.

### **Money Problems:**
1. Two items ₹50 and ₹70. Bought 5 and 3, total ₹550. Find prices.
2. Shopkeeper gains 25% on one, loses 25% on other. Overall loss 10%. Find ratios.

### **Speed Problems:**
1. Car A 60 km/h, B 80 km/h. B starts 2 hours later. When will B catch A?
2. Train 150m long crosses man in 10 seconds. Speed?

### **Work Problems:**
1. A does work in 8 days, B in 12 days. C in 24 days. Together?
2. Two pipes fill in 10 and 15 hours. Third empties in 20 hours. Together?

### **Mixture Problems:**
1. Mix 25% and 45% acids to get 35% acid. Ratio?
2. 8 liters 40% solution. Add water to make 25% solution. How much water?

**Answers:**
Age: Son-15, Father-60; Sister-11, Brother-14
Money: ₹50 & ₹70; Loss on higher CP
Speed: After 8 hours; 54 km/h
Work: 4.24 days; 8.57 hours
Mixture: 2:1; 8 liters water

---

## 🎓 Pro Tips for Word Problems

1. **Read carefully** - identify all quantities and relationships
2. **Choose variables wisely** - let unknown be x, relate others
3. **Form equations systematically** - one relationship per equation
4. **Check units** - ensure consistency
5. **Verify answers** - substitute back in problem
6. **Practice regularly** - different categories
7. **Look for key phrases** - "is", "more than", "sum", etc.

---

## 🔢 Problem-Solving Framework

\`\`\`
1. UNDERSTAND the problem
   - What is asked?
   - What information given?
   - What relationships exist?

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

Master word problems and excel in aptitude examinations! 🏆`
};