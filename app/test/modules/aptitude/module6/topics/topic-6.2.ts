import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_2: SubLesson = {
  id: "6.2",
  title: 'Average Formula',
  status: 'completed',
  content: "`# ðŸ§® Average Formula

Master the fundamental average formula and its applications! The arithmetic mean formula is the cornerstone of average calculations. Learn different ways to apply it and common variations you'll encounter in aptitude problems.

---

## ðŸŽ¯ The Basic Average Formula

### **Standard Formula**
\`"\`\`
Average = Sum of all values Ã· Number of values
Average = Î£xáµ¢ Ã· n
\`\`\`

**Where:**
- Î£xáµ¢ = Sum of all observations
- n = Total number of observations

### **Alternative Notation**
\`\`\`
Mean = (xâ‚ + xâ‚‚ + xâ‚ƒ + ... + xâ‚™) Ã· n
\`\`\`

---

## ðŸ“Š Step-by-Step Calculation

### **Example 1: Basic Application**
**Problem:** Find average of 12, 15, 18, 21, 24.

**Step 1:** Add all values
- 12 + 15 = 27
- 27 + 18 = 45
- 45 + 21 = 66
- 66 + 24 = 90

**Step 2:** Count the values
- n = 5

**Step 3:** Divide sum by count
- Average = 90 Ã· 5 = 18

### **Example 2: Decimal Values**
**Problem:** Average of 4.5, 6.7, 8.2, 5.8.

**Step 1:** Sum = 4.5 + 6.7 + 8.2 + 5.8 = 25.2

**Step 2:** Count = 4

**Step 3:** Average = 25.2 Ã· 4 = 6.3

---

## ðŸ”¢ Variations of the Formula

### **1. Average with Frequencies**
When some values repeat:

\`\`\`
Average = (Î£(frequency Ã— value)) Ã· Total frequency
\`\`\`

**Example:** Scores: 85 (3 students), 90 (5 students), 95 (2 students)
- Average = (85Ã—3 + 90Ã—5 + 95Ã—2) Ã· (3+5+2) = (255 + 450 + 190) Ã· 10 = 895 Ã· 10 = 89.5

### **2. Average of Grouped Data**
For frequency distribution:

\`\`\`
Average = Î£(f Ã— x) Ã· Î£f
Where x is midpoint of class interval
\`\`\`

### **3. Average Speed Formula**
\`\`\`
Average Speed = Total Distance Ã· Total Time
\`\`\`

**Example:** 60 km at 30 km/h, 60 km at 40 km/h
- Timeâ‚ = 60/30 = 2 hours
- Timeâ‚‚ = 60/40 = 1.5 hours
- Average speed = 120 km Ã· 3.5 hours â‰ˆ 34.29 km/h

---

## ðŸ§® Properties of the Average Formula

### **1. Commutative Property**
Order of values doesn't matter:
- Average of 2, 3, 5 = Average of 5, 3, 2

### **2. Effect of Adding Constant**
If you add k to each value, average increases by k:
- Original: 10, 20, 30 â†’ Average = 20
- Add 5: 15, 25, 35 â†’ Average = 25

### **3. Effect of Multiplying by Constant**
If you multiply each value by k, average multiplies by k:
- Original: 2, 4, 6 â†’ Average = 4
- Multiply by 3: 6, 12, 18 â†’ Average = 12

---

## ðŸ’¡ Mental Math Tricks

### **Trick 1: Average of Two Numbers**
\`\`\`
Average = (a + b) Ã· 2
\`\`\`

**Example:** Average of 15 and 25 = (15 + 25) Ã· 2 = 20

### **Trick 2: Numbers Around a Value**
For numbers close to each other:

**Example:** 49, 50, 51
- Average = 50 (middle value)
- Sum = 150, Average = 150 Ã· 3 = 50

### **Trick 3: Evenly Spaced Numbers**
For arithmetic sequence:

**Example:** 1, 2, 3, 4, 5
- Average = 3 (middle value)
- Sum = 15, Average = 15 Ã· 5 = 3

---

## ðŸŽ¯ Common Applications

### **1. Academic Averages**
- Class average marks
- Semester GPA
- Subject-wise averages

### **2. Financial Averages**
- Average monthly expenses
- Portfolio returns
- Salary calculations

### **3. Sports Statistics**
- Batting average
- Points per game
- Team statistics

### **4. Quality Metrics**
- Average product rating
- Customer satisfaction scores
- Performance indicators

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Count**
âŒ Including or excluding values incorrectly
- Always double-check n

### **Mistake 2: Calculation Errors**
âŒ Addition or division mistakes
- Use calculator for large sums, but understand method

### **Mistake 3: Units Confusion**
âŒ Mixing different units
- Convert to same units before averaging

### **Mistake 4: Zero Values**
âŒ Forgetting zero contributes to average
- Zero is a valid data point

---

## ðŸ”„ Relationship with Other Averages

### **1. Mean vs. Median**
- Mean: Mathematical average
- Median: Positional middle
- For symmetric data: Mean â‰ˆ Median

### **2. Mean vs. Mode**
- Mean: Balance point
- Mode: Most frequent
- For normal distribution: Mean â‰ˆ Mode â‰ˆ Median

### **3. Weighted Mean**
- When values have different importance
- Formula: Î£(weight Ã— value) Ã· Î£(weight)

---

## ðŸŽ¯ Practice Questions

### **Basic Formula Application:**
1. Average of 8, 12, 15, 20, 25?
2. Average of 3.5, 4.2, 5.8, 6.1, 7.4?
3. Average of 100, 200, 300, 400, 500?

### **Application Problems:**
1. Average marks: 85, 90, 88, 92, 87, 89?
2. Average temperature: 25Â°C, 27Â°C, 24Â°C, 26Â°C, 28Â°C, 23Â°C, 29Â°C?
3. Average runs: 45, 67, 23, 89, 56?

**Answers:**
Basic: 16, 5.4, 300
Applications: 88.5, 26Â°C, 56

---

## ðŸŽ“ Pro Tips for Exams

1. **Write down the formula** - Average = Sum Ã· Count
2. **Check your addition** - Sum should be reasonable
3. **Verify division** - Result should make sense
4. **Watch for decimals** - Round appropriately
5. **Consider context** - Average should be logical
6. **Use shortcuts** for common patterns

---

## ðŸ”¢ Quick Reference Table

| Situation | Formula | Example |
|-----------|---------|---------|
| Simple average | Î£x/n | (10+20+30)/3 = 20 |
| With frequencies | Î£(fÃ—x)/Î£f | (2Ã—10 + 3Ã—20)/5 = 16 |
| Two numbers | (a+b)/2 | (15+25)/2 = 20 |
| Consecutive | (first+last)/2 | (1+5)/2 = 3 |
| Grouped data | Î£(fÃ—midpoint)/Î£f | Class intervals with frequencies |

Master the average formula and solve numerical problems with ease! ðŸ†`
};
