import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_5: SubLesson = {
  id: "15.5",
  title: 'Pie Charts',
  status: 'completed',
  content: "`# ðŸ¥§ Pie Charts Interpretation

Master pie chart analysis! Pie charts excel at showing proportions and percentages. Learn to read sectors, calculate angles, and extract proportional insights from circular data representations.

---

## ðŸŽ¯ What are Pie Charts?

**Pie Charts** (also called Circle Graphs) divide a circle into sectors where each sector's area represents a proportion of the whole. The size of each slice shows its relative importance.

### **Key Features**
- **Circle**: Represents 100% or total
- **Sectors/Slices**: Parts of the whole
- **Angles**: Proportional to values
- **Areas**: Proportional to values
- **Legend**: Explains what each slice represents

### **When to Use**
- Show parts of a whole
- Compare proportions
- Display percentage distributions
- Limited categories (3-8 slices)

---

## ðŸ“Š Reading Pie Charts

### **Basic Components**

\`"\`\`
Market Share Distribution

        30% - Product A
       â–ˆâ–ˆâ–ˆ
   25% â–ˆ    â–ˆ 20% - Product D
   â–ˆ         â–ˆ
  â–ˆ    15%    â–ˆ
 â–ˆ      B       â–ˆ
â–ˆ               â–ˆ
â–ˆ       C       â–ˆ
 â–ˆ             â–ˆ
  â–ˆ           â–ˆ
   â–ˆ         â–ˆ
    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
    10% - Product E
\`\`\`

**Key Elements:**
- Each slice represents a category
- Slice size proportional to value
- Total of all slices = 100%
- Angles can be measured for calculations

---

## ðŸ” Analysis Techniques

### **Step 1: Understand the Total**
- Read the title and total value
- Note if percentages or actual values given
- Check if chart represents 100%

### **Step 2: Read Slice Values**
- Check if values are given on slices
- Use legend for category identification
- Note the largest and smallest slices

### **Step 3: Calculate Proportions**
- Convert to percentages if needed
- Calculate ratios between slices
- Find relationships between categories

### **Step 4: Compare Categories**
- Identify largest/smallest shares
- Compare relative sizes
- Calculate differences

---

## ðŸ“ˆ Types of Pie Chart Questions

### **1. Direct Value Reading**
**"What percentage does Category A represent?"**
- Read the value on slice or from legend
- Answer: Direct from chart

### **2. Total Calculation**
**"If total sales are â‚¹10,000, what are sales of Category B?"**
- Find B's percentage
- Calculate: (B%/100) Ã— 10,000

### **3. Comparison Questions**
**"How much more is Category A than Category C?"**
- Find both values
- Calculate difference

### **4. Ratio Questions**
**"What is the ratio of A to B?"**
- Read both values
- Express as ratio: A:B

### **5. Percentage of Total**
**"What percentage of total is A + B?"**
- Sum A and B percentages
- Answer: Combined percentage

### **6. Angle Calculations**
**"What is the central angle for Category X?"**
- Formula: (Value/Total) Ã— 360Â°
- Calculate angle in degrees

---

## ðŸŽ¯ Sample Pie Chart Analysis

### **Expense Distribution**

\`\`\`
Monthly Expenses: â‚¹50,000

        Rent - 35%
       â–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
   25% â–ˆ     â–ˆ 15% - Food
   â–ˆ         â–ˆ
  â–ˆ    10%    â–ˆ
 â–ˆ      B       â–ˆ
â–ˆ       U       â–ˆ
â–ˆ      T       â–ˆ
 â–ˆ    I       â–ˆ
  â–ˆ  L       â–ˆ
   â–ˆ I       â–ˆ
    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
    15% - Others
\`\`\`

**Slice Values:**
- Rent: 35% = â‚¹17,500
- Utilities: 25% = â‚¹12,500
- Food: 15% = â‚¹7,500
- Bills: 10% = â‚¹5,000
- Others: 15% = â‚¹7,500

### **Practice Questions**

**1. What is the largest expense category?**
- Rent: 35%

**2. What percentage of expenses is Utilities + Bills?**
- 25% + 10% = 35%

**3. If total expenses increase by 20%, what will be new rent amount?**
- Current rent: â‚¹17,500
- New rent: 17,500 Ã— 1.20 = â‚¹21,000

**4. What is the ratio of Food to Others?**
- 15:15 = 1:1

**5. What is the central angle for Rent?**
- (35/100) Ã— 360Â° = 126Â°

---

## ðŸ“Š Advanced Pie Chart Types

### **1. Exploded Pie Chart**
Slices pulled out for emphasis

\`\`\`
Exploded View

    Category A
       â–ˆâ–ˆâ–ˆ
     â–ˆ      â–ˆ
   â–ˆ   40%    â–ˆ
  â–ˆ            â–ˆ
 â–ˆ      B       â–ˆ
â–ˆ       30%      â–ˆ
 â–ˆ              â–ˆ
  â–ˆ            â–ˆ
   â–ˆ          â–ˆ
     â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
     Category C
      30%
\`\`\`

**Analysis:**
- Emphasized categories stand out
- Easier to read individual values
- Same calculation methods apply

### **2. 3D Pie Chart**
Three-dimensional appearance

**Analysis Considerations:**
- Visual distortion possible
- Compare angles, not apparent sizes
- Use same calculation methods

### **3. Doughnut Chart**
Ring-shaped with center removed

**Analysis:**
- Same as pie chart
- Center can show total or additional data
- Calculations identical

---

## ðŸ§® Calculation Techniques

### **1. Finding Actual Values**
**If total is given:**
- Value = (Percentage/100) Ã— Total

**Example:** Total sales â‚¹1,00,000, A has 25%
- A sales = (25/100) Ã— 1,00,000 = â‚¹25,000

### **2. Finding Percentages**
**If actual values given:**
- Percentage = (Value/Total) Ã— 100

**Example:** A = â‚¹30,000, Total = â‚¹1,20,000
- A% = (30,000/1,20,000) Ã— 100 = 25%

### **3. Finding Totals**
**If one value and percentage given:**
- Total = (Value Ã— 100)/Percentage

**Example:** A = â‚¹40,000 at 20%
- Total = (40,000 Ã— 100)/20 = â‚¹2,00,000

### **4. Angle Calculations**
**Central Angle = (Value/Total) Ã— 360Â°**

**Example:** Category with 30% share
- Angle = (30/100) Ã— 360Â° = 108Â°

---

## ðŸŽ¯ Common Question Patterns

### **Pattern 1: Value from Percentage**
**"If total is X, what is value of category with Y%?"**
- Formula: (Y/100) Ã— X

### **Pattern 2: Percentage from Value**
**"What percentage is category with value A of total T?"**
- Formula: (A/T) Ã— 100

### **Pattern 3: Combined Categories**
**"What percentage is A + B + C together?"**
- Sum individual percentages

### **Pattern 4: Difference Between Categories**
**"How much more is A than B?"**
- Find actual values, then subtract

### **Pattern 5: Ratio of Categories**
**"What is the ratio of A:B?"**
- Use percentages or actual values

---

## ðŸš€ Speed Reading Techniques

### **1. Visual Estimation**
- Compare slice sizes quickly
- Identify largest/smallest sectors
- Group similar-sized slices

### **2. Percentage Addition**
- Add percentages mentally
- Use benchmarks (25%, 50%, 75%)
- Round for quick calculations

### **3. Angle Estimation**
- 10% = 36Â°, 25% = 90Â°, 50% = 180Â°
- Use these for quick checks

### **4. Ratio Calculation**
- Simplify ratios directly
- Use fractions for mental math

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Wrong Total Assumption**
âŒ Assuming 100% when not stated
- Always check if chart represents full circle

### **Mistake 2: Visual Distortion**
âŒ Judging by apparent size in 3D charts
- Use percentages, not visual areas

### **Mistake 3: Missing Categories**
âŒ Forgetting "Others" or unlabeled slices
- Check all slices and legend

### **Mistake 4: Calculation Errors**
âŒ Wrong percentage: Value Ã— 100 Ã· Total
- Correct: (Value/Total) Ã— 100

### **Mistake 5: Unit Confusion**
âŒ Mixing rupees with percentages
- Convert to same units for calculations

---

## ðŸŽ¯ Practice Pie Charts

### **Chart 1: Budget Allocation**

\`\`\`
Annual Budget: â‚¹12,00,000

      Salary - 40%
     â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
   â–ˆâ–ˆâ–ˆ         â–ˆâ–ˆâ–ˆ
  â–ˆ     20%      â–ˆ
 â–ˆ   Education     â–ˆ
â–ˆ         15%       â–ˆ
â–ˆ      Savings      â–ˆ
 â–ˆ                 â–ˆ
  â–ˆ               â–ˆ
   â–ˆâ–ˆâ–ˆ         â–ˆâ–ˆâ–ˆ
     â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
     Transport - 25%
\`\`\`

**Questions:**
1. What is the amount allocated for Education?
2. What percentage is Transport + Savings?
3. If budget increases by 10%, what is new Salary amount?

### **Chart 2: Market Share**

\`\`\`
Market Share (%)

    Brand A - 35
   â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
 â–ˆâ–ˆâ–ˆ      â–ˆâ–ˆâ–ˆ
â–ˆ    25     â–ˆ
â–ˆ  Brand B   â–ˆ
â–ˆ            â–ˆ
 â–ˆ   20     â–ˆ
  â–ˆ Brand C â–ˆ
   â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆ
   Brand D - 20
\`\`\`

**Questions:**
1. Which brand has highest share?
2. What is the ratio of A to D?
3. What is the central angle for Brand B?

---

## ðŸŽ“ Pro Tips for Pie Charts

1. **Check if chart represents 100%** total
2. **Read all labels and legend** carefully
3. **Identify largest/smallest** slices quickly
4. **Use mental math** for percentage calculations
5. **Convert between** percentages and actual values
6. **Calculate angles** only when needed
7. **Verify totals** add up to 100%

---

## ðŸ”¢ Pie Chart Analysis Framework

\`\`\`
1. READ the title and total value
   - Understand what data represents
   - Note units and total amount

2. IDENTIFY slice values
   - Read percentages or values
   - Check legend for categories
   - Note largest/smallest shares

3. ANALYZE the question
   - Determine required calculation
   - Identify relevant slices

4. CALCULATE accurately
   - Use appropriate formulas
   - Convert units if needed

5. VERIFY the answer
   - Check calculation
   - Ensure reasonableness
\`\`\`

Master pie chart interpretation and analyze proportions quickly from any circular chart! ðŸ†

**Answers for Practice Charts:**
1. Education: 20% of â‚¹12,00,000 = â‚¹2,40,000
2. Transport + Savings: 25% + 15% = 40%
3. New Salary: â‚¹4,80,000 Ã— 1.10 = â‚¹5,28,000

Market Share: 1. Brand A: 35%
2. A:D = 35:20 = 7:4
3. Brand B: 25% â†’ (25/100)Ã—360Â° = 90Â°`
};
