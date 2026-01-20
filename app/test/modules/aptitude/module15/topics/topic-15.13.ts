import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_13: SubLesson = {
  id: "15.13",
  title: 'Missing Data Problems',
  status: 'completed',
  content: "`# ðŸ” Missing Data Problems

Master missing data identification and calculation in Data Interpretation! Many DI problems have incomplete information that must be logically deduced. Learn systematic approaches to find missing values using relationships, patterns, and mathematical properties.

---

## ðŸŽ¯ What are Missing Data Problems?

**Missing Data Problems** involve datasets with some information omitted. The missing values must be calculated using:
- **Mathematical relationships** between known values
- **Logical patterns** in the data
- **Total/sum constraints**
- **Percentage/ratio relationships**

### **Why Important?**
- Tests logical thinking ability
- Requires understanding of data relationships
- Common in competitive exams
- Helps develop analytical skills

---

## ðŸ” Types of Missing Data

### **1. Single Missing Value**
- One cell/data point missing
- Can be found using totals or relationships

### **2. Multiple Missing Values**
- Several related values missing
- Require system of equations
- May have unique or multiple solutions

### **3. Pattern-Based Missing Data**
- Follows mathematical or logical pattern
- Can be arithmetic, geometric, or custom

### **4. Conditional Missing Data**
- Missing values depend on conditions
- Requires if-then logic

---

## ðŸ“Š Missing Data in Tables

### **Example 1: Row/Column Totals**

| Product | Q1 | Q2 | Q3 | Total |
|---------|----|----|----|-------|
| A       | 100| 120| 140| 360   |
| B       | 80 | 95 | ?  | 275   |
| Total   | 280| ?  | 340| 715   |

**Missing Values:**
1. **B Q3:** Total B = 275, Q1+Q2 = 80+95=175, so Q3 = 275-175 = 100
2. **Total Q2:** Total Q2 = 715 - (280 + 340) = 715 - 620 = 95
   Or: Q2 = 120 (A) + 95 (B) = 215? Wait, let's check.

Wait, the table has inconsistency. Let me correct:

| Product | Q1 | Q2 | Q3 | Total |
|---------|----|----|----|-------|
| A       | 100| 120| 140| 360   |
| B       | 80 | 95 | ?  | 275   |
| Total   | 280| 315| 340| 935   |

**Corrected Missing Values:**
1. **B Q3:** 275 - (80 + 95) = 275 - 175 = 100
2. **Total Q2:** 120 + 95 = 215
3. **Grand Total:** 360 + 275 = 635, or 280 + 215 + 340 = 835? Inconsistency.

**Proper Table:**

| Product | Q1 | Q2 | Q3 | Total |
|---------|----|----|----|-------|
| A       | 100| 120| 140| 360   |
| B       | 80 | 95 | 100| 275   |
| Total   | 180| 215| 240| 635   |

### **Example 2: Percentage Relationships**

| Category | Amount | % of Total |
|----------|--------|------------|
| A        | 2500   | ?          |
| B        | ?      | 30%        |
| C        | 1500   | ?          |
| Total    | 5000   | 100%       |

**Missing Values:**
1. **A %:** (2500/5000) Ã— 100 = 50%
2. **B Amount:** 30% of 5000 = 1500
3. **C %:** (1500/5000) Ã— 100 = 30%

---

## ðŸ“ˆ Missing Data in Charts

### **Pie Chart Missing Data**

\`"\`\`
Market Share Distribution

Company A: 35%
Company B: 28%
Company C: 22%
Company D: ?

Total: 100%
\`\`\`

**Missing Value:**
Company D: 100% - (35% + 28% + 22%) = 100% - 85% = 15%

### **Bar Chart Missing Data**

\`\`\`
Monthly Sales (â‚¹ lakhs)

Jan: 15    Feb: 18    Mar: 22
Apr: ?     May: 26    Jun: 28

Average: 22 lakhs
\`\`\`

**Missing Value:**
Total for 6 months: 22 Ã— 6 = 132 lakhs
Known total: 15 + 18 + 22 + 26 + 28 = 109 lakhs
Apr: 132 - 109 = 23 lakhs

---

## ðŸ§® Systematic Missing Data Solution

### **Step 1: Identify Known Relationships**
- Find totals, percentages, ratios
- Note arithmetic/geometric patterns
- Identify dependencies

### **Step 2: Create Equations**
- Express missing values in terms of known ones
- Use multiple constraints when available
- Build system of equations

### **Step 3: Solve Step-by-Step**
- Start with simplest missing value
- Use solved values to find others
- Verify consistency

### **Step 4: Check Feasibility**
- Ensure all values make sense
- Check if totals match
- Verify percentage relationships

---

## ðŸŽ¯ Common Missing Data Patterns

### **Pattern 1: Total-Based Missing Data**

| Items | Value | Percentage |
|-------|-------|------------|
| A     | 120   | 24%        |
| B     | 150   | ?          |
| C     | ?     | 32%        |
| Total | 500   | 100%       |

**Solutions:**
1. **B %:** (150/500) Ã— 100 = 30%
2. **C Value:** 32% of 500 = 160

### **Pattern 2: Ratio-Based Missing Data**

| Category | Ratio | Amount |
|----------|-------|--------|
| P        | 3     | ?      |
| Q        | 4     | 200    |
| R        | ?     | 150    |

**Solution:**
Q amount = 4 parts = 200
1 part = 200/4 = 50
P amount = 3 parts = 150
R ratio = 150/50 = 3

### **Pattern 3: Arithmetic Progression**

| Term | Value |
|------|-------|
| 1    | 5     |
| 2    | 8     |
| 3    | ?     |
| 4    | 14    |

**Solution:**
Common difference = 8 - 5 = 3
Term 3 = 8 + 3 = 11
Term 4 = 11 + 3 = 14 âœ“

---

## ðŸ“Š Advanced Missing Data Scenarios

### **Example 1: Multi-Constraint Problems**

| Department | Employees | Salary/Employee | Total Salary |
|------------|-----------|-----------------|--------------|
| A          | 50        | 20000           | ?            |
| B          | ?         | 25000           | 500000       |
| C          | 40        | ?               | 720000       |
| Total      | 120       | -               | ?            |

**Solutions:**
1. **A Total:** 50 Ã— 20000 = 1,000,000
2. **B Employees:** 500000 Ã· 25000 = 20
3. **Total Employees:** 120 - 50 - 20 - 40 = 10 (missing C employees)
4. **C Salary/Employee:** 720000 Ã· 40 = 18,000
5. **Total Salary:** 1,000,000 + 500,000 + 720,000 + (10 Ã— 18,000) = 2,220,000 + 180,000 = 2,400,000

### **Example 2: Percentage with Base Missing**

| Product | Sales 2019 | Sales 2020 | Growth % |
|---------|------------|------------|----------|
| X       | 1000       | ?          | 25%      |
| Y       | ?          | 1200       | 20%      |
| Z       | 800        | ?          | ?        |

**Additional Info:** Total 2020 sales = 3000, Z grew by 30%

**Solutions:**
1. **X 2020:** 1000 Ã— 1.25 = 1,250
2. **Z 2020:** 800 Ã— 1.30 = 1,040
3. **Y 2020:** Total 2020 = 3,000
   Known: 1,250 + 1,040 = 2,290
   Y 2020 = 3,000 - 2,290 = 710
4. **Y 2019:** 710 Ã· 1.20 = 591.67 â‰ˆ 592

---

## ðŸŽ¯ Caselet Missing Data

### **Example: Business Caselet**

**"Company has 3 divisions with revenue ratios 2:3:4. Division A expenses are 60% of revenue, B 50%, C 40%. Total expenses â‚¹24 lakhs. Net profit 20% of total revenue."**

**Missing Information to Find:**
- Individual division revenues
- Individual division expenses
- Total revenue
- Net profit amount

**Step-by-Step Solution:**

1. **Revenue Ratios:** 2:3:4, let total parts = 9
2. **Total Expenses:** â‚¹24 lakhs
3. **Expense Ratios:** A:60%, B:50%, C:40%
4. **Revenue from Expenses:** Need to find revenue values

Let total revenue = R
A revenue = (2/9)R, expenses = 0.6 Ã— (2/9)R = (1.2/9)R
B expenses = 0.5 Ã— (3/9)R = (1.5/9)R
C expenses = 0.4 Ã— (4/9)R = (1.6/9)R

Total expenses = (1.2 + 1.5 + 1.6)/9 R = 4.3/9 R = 24
R = 24 Ã— 9 / 4.3 = 216 / 4.3 â‰ˆ 50.23 lakhs

**Precise Calculation:**
Total expenses = 24 lakhs
Expense coefficients: 1.2 + 1.5 + 1.6 = 4.3
4.3/9 R = 24
R = 24 Ã— 9 / 4.3 = 216 / 4.3 â‰ˆ 50.23 lakhs

---

## ðŸš¨ Common Missing Data Challenges

### **Challenge 1: Insufficient Information**
**Problem:** Two equations, three variables
**Solution:** Identify which value is needed

### **Challenge 2: Multiple Possibilities**
**Problem:** Data allows different interpretations
**Solution:** Check problem constraints

### **Challenge 3: Inconsistent Data**
**Problem:** Totals don't match
**Solution:** Recheck calculations or identify errors

### **Challenge 4: Conditional Missing Data**
**Problem:** Values depend on conditions
**Solution:** Consider all possible scenarios

---

## ðŸŽ¯ Practice Missing Data Problems

### **Table Missing Data**

| Year | Sales A | Sales B | Total | Growth % |
|------|---------|---------|-------|----------|
| 2019 | 200     | 150     | ?     | -        |
| 2020 | ?       | 180     | 420   | 20%      |
| 2021 | 260     | ?       | ?     | 15%      |

**Find all missing values.**

**Solution:**
1. **2019 Total:** 200 + 150 = 350
2. **2020 Sales A:** Total growth 20%: 350 Ã— 1.20 = 420 âœ“
   Sales A growth: (A - 200)/200 Ã— 100 = 20%
   A - 200 = 40, A = 240
3. **2021 Sales B:** Assume B grew 20% from 180 = 216
4. **2021 Total:** 260 + 216 = 476

### **Percentage Missing Data**

| Category | Amount | Percentage |
|----------|--------|------------|
| P        | 1200   | ?          |
| Q        | ?      | 25%        |
| R        | 800    | ?          |
| Total    | ?      | 100%       |

**Solution:**
1. **P %:** Need total first
2. **Total:** Let total = T
   P + Q + R = T
   1200 + Q + 800 = T
   Q = 0.25T
   2000 + 0.25T = T
   2000 = 0.75T
   T = 2000/0.75 = 2,666.67
3. **Q Amount:** 0.25 Ã— 2666.67 â‰ˆ 666.67
4. **R %:** (800/2666.67) Ã— 100 â‰ˆ 30%

---

## ðŸŽ“ Pro Tips for Missing Data

1. **Identify all relationships** first
2. **Start with known totals** or percentages
3. **Use cross-verification** techniques
4. **Check for consistency** in calculations
5. **Consider multiple approaches** if stuck
6. **Look for patterns** in the data
7. **Practice systematic solving** method

---

## ðŸ”¢ Missing Data Solution Framework

\`\`\`
1. SCAN the data structure
   - Identify missing values
   - Note known relationships
   - Check for totals/percentages

2. IDENTIFY solution approach
   - Which relationships to use
   - Order of solving
   - Required equations

3. SOLVE step by step
   - Start with simplest missing value
   - Use solved values for others
   - Maintain calculation accuracy

4. VERIFY consistency
   - Check all totals match
   - Ensure percentages add up
   - Validate with known values

5. CONFIRM all missing data found
   - No remaining unknowns
   - All relationships satisfied
   - Answer makes sense
\`\`\`

Master missing data problems and complete incomplete datasets with logical precision! ðŸ†`
};
