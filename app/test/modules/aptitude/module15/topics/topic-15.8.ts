import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_8: SubLesson = {
  id: "15.8",
  title: 'Ratio & Average Based DI',
  status: 'completed',
  content: `# 📊 Ratio & Average Based DI

Master ratio and average calculations in Data Interpretation! These fundamental concepts help compare data points, find relationships, and analyze distributions. Learn systematic approaches to solve ratio and average problems across all DI formats.

---

## 🎯 Importance of Ratios and Averages

**Ratios and Averages** are essential DI tools because they:
- Compare different quantities effectively
- Provide standardized comparison metrics
- Help identify patterns and relationships
- Simplify complex data analysis
- Enable quick decision making

### **Common Applications**
- Market share comparisons
- Performance benchmarking
- Resource allocation analysis
- Growth rate comparisons
- Distribution analysis

---

## 🔢 Ratio Calculations

### **1. Basic Ratio**
\`Ratio = A:B or A/B\`

**Example:** Sales A: ₹50,000, Sales B: ₹30,000
\`Ratio = 50,000:30,000 = 5:3\`

### **2. Multiple Ratios**
\`A:B:C = x:y:z\`

**Example:** Departments P:Q:R = 40:30:30
\`Simplified = 4:3:3\`

### **3. Inverse Ratio**
\`Ratio of reciprocals = 1/A : 1/B = B:A\`

**Example:** If A:B = 3:4, then 1/A:1/B = 4:3

---

## 📊 Average Calculations

### **1. Simple Average**
\`Average = Sum of values/Number of values\`

**Example:** Scores: 85, 90, 95, 80, 88
\`Average = (85+90+95+80+88)/5 = 438/5 = 87.6\`

### **2. Weighted Average**
\`Weighted Average = Σ(weight × value)/Σ(weight)\`

**Example:** Grades with credits:
- Math: 90 (3 credits)
- Science: 85 (4 credits)
- English: 95 (2 credits)
\`WA = (90×3 + 85×4 + 95×2)/(3+4+2) = (270+340+190)/9 = 800/9 ≈ 88.89\`

### **3. Moving Average**
\`Moving Average = Average of consecutive periods\`

**Example:** 3-month moving average of sales data

---

## 📈 Ratio-Based DI Problems

### **Example 1: Market Share Ratios**

\`\`\`
Market Share Data

Company | Share %
--------|--------
A       | 35%
B       | 25%
C       | 20%
D       | 20%
\`\`\`

**Ratio Questions:**
1. **"What is the ratio of A to B?"**
   - 35:25 = 7:5

2. **"What is the ratio of A to C+D?"**
   - A : (C+D) = 35 : (20+20) = 35:40 = 7:8

3. **"If total market is ₹10,000 crores, what is B's share?"**
   - 25% of 10,000 = ₹2,500 crores

### **Example 2: Investment Ratios**

\`\`\`
Investment Portfolio

Scheme | Amount | Ratio
-------|--------|------
A      | 2,00,000 | 4
B      | 1,50,000 | 3
C      | 1,00,000 | 2
Total  | 4,50,000 | 9
\`\`\`

**Questions:**
1. **"What is the ratio of investments in A and C?"**
   - 4:2 = 2:1

2. **"If Scheme A gives 10% return, what is total return?"**
   - Need to know other returns - insufficient data

---

## 📊 Average-Based DI Problems

### **Example 1: Student Performance**

\`\`\`
Class Test Scores

Subject | Average | Students
--------|---------|---------
Math    | 85      | 40
Science | 78      | 35
English | 82      | 45
Hindi   | 80      | 30
\`\`\`

**Average Questions:**
1. **"What is the overall class average?"**
   - Total scores = (85×40) + (78×35) + (82×45) + (80×30)
   - Total students = 40+35+45+30 = 150
   - Average = Total scores/150

2. **"Which subject has highest total score?"**
   - Compare weighted totals: 85×40, 78×35, etc.

### **Example 2: Sales Performance**

\`\`\`
Monthly Sales (₹ lakhs)

Month | Sales | Average (3-month)
------|-------|------------------
Jan   | 20    | -
Feb   | 25    | -
Mar   | 30    | 25.0
Apr   | 35    | 30.0
May   | 28    | 31.0
\`\`\`

**Questions:**
1. **"What is the average sales for first quarter?"**
   - (20+25+30)/3 = 75/3 = 25 lakhs

2. **"Which month had sales above 3-month average?"**
   - Compare each month's sales with its 3-month average

---

## 🧮 Advanced Ratio-Average Techniques

### **1. Ratio of Averages**
**Problem:** Find ratio of average marks of two classes

**Method:**
- Calculate total marks for each class
- Divide by number of students
- Take ratio of averages

### **2. Average of Ratios**
**Problem:** Find average of ratios across different periods

**Method:**
- Calculate individual ratios
- Sum ratios and divide by number of periods
- Or use weighted average approach

### **3. Ratio from Missing Data**
**Problem:** Find missing value when ratio is given

**Example:** A:B = 3:4, B:C = 2:3, find A:B:C
- A:B = 3:4, B:C = 2:3
- A:B:C = 3:4:6 (multiply B ratio by 2)

---

## 🎯 Combined Ratio-Average Problems

### **Example 1: Population Growth**

\`\`\`
City Population Data

Year | Population | Growth Rate | Average Growth
-----|------------|-------------|---------------
2015 | 10,000     | -          | -
2016 | 11,000     | 10%         | -
2017 | 12,100     | 10%         | 10%
2018 | 13,200     | 9.09%       | 9.7%
\`\`\`

**Questions:**
1. **"What is the ratio of 2018 to 2015 population?"**
   - 13,200 : 10,000 = 132:100 = 33:25

2. **"What is the average annual growth rate?"**
   - For 3 years: From 10,000 to 13,200
   - Total growth: 3,200
   - Average annual: 3,200/3 = 1,067 (absolute)
   - Percentage: [(13,200/10,000)^(1/3) - 1] × 100

### **Example 2: Business Metrics**

\`\`\`
Company Performance

Metric      | Q1 | Q2 | Q3 | Q4 | Average
------------|----|----|----|----|--------
Revenue (₹cr)| 50| 55| 60| 65| 57.5
Profit (₹cr) | 8 | 9 | 10| 11| 9.5
Employees    |100|105|110|115| -
\`\`\`

**Questions:**
1. **"What is the ratio of Q4 to Q1 revenue?"**
   - 65:50 = 13:10

2. **"What is the average profit per employee?"**
   - Total profit: 8+9+10+11 = 38 crores
   - Average employees: (100+105+110+115)/4 = 107.5
   - Profit per employee: 38/107.5 ≈ ₹35.35 lakhs

3. **"What is the profit margin ratio?"**
   - Average profit/average revenue = 9.5/57.5 ≈ 16.52%

---

## 📊 Ratio-Average in Different Charts

### **Bar Charts**

\`\`\`
Department Salaries

15 │
12 │ ████ ████ ████ ████ ████
 9 │ ████ ████ ████ ████ ████
 6 │ ████ ████ ████ ████ ████
 3 │ ████ ████ ████ ████ ████
 0 │___________________________
    IT  HR  Sales  Mktg  Admin
\`\`\`

**Values:** IT:12, HR:9, Sales:15, Mktg:6, Admin:3 lakhs

**Ratio Questions:**
- IT:Sales = 12:15 = 4:5
- Lowest to highest = 3:15 = 1:5

**Average Questions:**
- Average salary: (12+9+15+6+3)/5 = 45/5 = 9 lakhs

### **Pie Charts**

\`\`\`
Expense Distribution

    Food - 30%
   ███
  █    █
 █  Rent  █
█    25%   █
█ Travel 20% █
 █        █
  █ Other 25% █
   ███████
\`\`\`

**Ratio Questions:**
- Food:Rent = 30:25 = 6:5
- Travel:Other = 20:25 = 4:5

**Average Questions:**
- If total expenses ₹60,000
- Average expense per category: 60,000/6 = ₹10,000

---

## 🚀 Speed Calculation Techniques

### **1. Ratio Simplification**
- Always reduce ratios to simplest form
- Use common divisors quickly
- 48:32 = 3:2 (divide by 16)

### **2. Average Approximation**
- Round numbers for quick calculation
- Use compatible numbers
- 87.3 + 92.7 + 88.5 ≈ 87 + 93 + 89 = 269, average ≈ 89.67

### **3. Mental Ratio Calculation**
- Compare values directly
- Use percentage equivalents
- 35:65 = 7:13 (divide by 5)

### **4. Average Shortcuts**
- Sum of deviations from average = 0
- Average of first n natural numbers = (n+1)/2
- Average of first n even numbers = n+1

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Ratio Order**
❌ Ratio of A to B as B:A
- Always maintain consistent order

### **Mistake 2: Average Without Weights**
❌ Simple average when weighted average needed
- Use weighted average for different quantities

### **Mistake 3: Ratio vs Proportion**
❌ Confusing ratio with percentage
- Ratio compares parts, percentage shows part of whole

### **Mistake 4: Moving Average Error**
❌ Including future data in moving average
- Moving average uses past data only

### **Mistake 5: Ratio Simplification**
❌ Not simplifying ratios completely
- Always reduce to simplest form

---

## 🎯 Practice Ratio-Average Problems

### **Table Data**

| Product | Sales 2019 | Sales 2020 | Ratio 2020/2019 |
|---------|------------|------------|-----------------|
| A       | 100        | 120        | 6:5             |
| B       | 150        | 180        | 6:5             |
| C       | 80         | 100        | 5:4             |

**Questions:**
1. What is the average growth rate?
2. What is the ratio of total 2020 to total 2019 sales?
3. Which product had highest absolute growth?

### **Chart Data**

\`\`\`
Score Distribution

Range  | Students
-------|---------
90-100 | 15
80-89  | 25
70-79  | 30
60-69  | 20
<60    | 10
\`\`\`

**Questions:**
1. What is the average score range?
2. What is the ratio of high performers (90+) to low performers (<60)?
3. What percentage have scores 70+?

---

## 🎓 Pro Tips for Ratio-Average DI

1. **Simplify ratios immediately** to lowest terms
2. **Use weighted averages** when quantities differ
3. **Calculate totals first** for average problems
4. **Compare ratios** rather than absolute values when possible
5. **Use approximation** for close calculations
6. **Check ratio order** - A:B vs B:A
7. **Practice mental math** for quick calculations

---

## 🔢 Ratio-Average Problem Framework

\`\`\`
1. IDENTIFY the type
   - Simple ratio comparison
   - Average calculation
   - Weighted average
   - Moving average

2. LOCATE the data
   - Find relevant values
   - Note any weights or quantities
   - Check for time periods or categories

3. CALCULATE systematically
   - For ratios: simplify A:B
   - For averages: sum/count or weighted formula
   - Use appropriate method

4. VERIFY the result
   - Check calculation accuracy
   - Ensure ratio is simplified
   - Confirm average makes sense

5. INTERPRET the answer
   - Understand what the ratio/average means
   - Relate back to the problem context
   - Check against given options
\`\`\`

Master ratio and average calculations and solve complex DI problems with confidence! 🏆

**Answers for Practice:**
1. Average growth: (20% + 20% + 25%)/3 = 65%/3 ≈ 21.67%
2. Total 2019: 100+150+80=330, Total 2020: 120+180+100=400, Ratio: 400:330 = 40:33
3. B: 180-150=30, A:20, C:20 → B highest

Chart: 1. Not applicable (categorical)
2. 15:10 = 3:2
3. (15+25+30)/100 × 100 = 70%`
};