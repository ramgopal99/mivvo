import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_6: SubLesson = {
  id: "15.6",
  title: 'Mixed Graphs',
  status: 'completed',
  content: `# 📊 Mixed Graphs Interpretation

Master complex data visualization! Mixed graphs combine multiple chart types to show different aspects of data. Learn to analyze combinations of bars, lines, and other elements for comprehensive insights.

---

## 🎯 What are Mixed Graphs?

**Mixed Graphs** combine two or more types of charts in a single visualization to show multiple data dimensions or relationships. They provide richer analysis by displaying different data types together.

### **Common Combinations**
- **Bar + Line**: Bars for values, line for trends
- **Multiple Lines**: Different series comparison
- **Bar + Pie**: Detailed + proportional view
- **Line + Area**: Trend with magnitude
- **Scatter + Line**: Data points with trend line

### **Advantages**
- Show multiple data series
- Compare different metrics
- Display trends and values together
- Provide comprehensive analysis
- Handle complex relationships

---

## 📊 Types of Mixed Graphs

### **1. Bar Chart + Line Graph**

\`\`\`
Sales and Growth Rate

25 │           ●
20 │         ●   ●
15 │ ████  ●     ●
10 │ ████●       ●
 5 │ ████        ●
 0 │___________________
    Q1  Q2  Q3  Q4
\`\`\`

**Components:**
- Bars: Monthly sales values
- Line: Growth rate percentage
- Dual y-axes: Different scales

**Analysis:**
- Compare absolute sales (bars) with growth rate (line)
- Identify when high sales had low growth
- Find optimal performance periods

### **2. Multiple Line Graphs**

\`\`\`
Temperature and Humidity

35 │     ●-------●
30 │   ●         ●
25 │ ●           ●
20 │     Humidity ●
15 │
10 │   Temperature ●
 5 │ ●             ●
 0 │___________________
     Jan Feb Mar Apr
\`\`\`

**Components:**
- Solid line: Temperature
- Dashed line: Humidity
- Same or different scales

**Analysis:**
- Compare trends of different variables
- Find correlation between temperature and humidity
- Identify seasonal patterns

### **3. Stacked Bar + Line**

\`\`\`
Revenue Breakdown with Total

30 │           ●
25 │         ●   ●
20 │ ███████●     ●
15 │ ███████      ●
10 │ ██████        ●
 5 │ █████          ●
 0 │___________________
    Q1  Q2  Q3  Q4
\`\`\`

**Components:**
- Stacked bars: Revenue components
- Line: Total revenue trend

**Analysis:**
- See how components contribute to total
- Track changes in composition
- Compare component vs total growth

---

## 🔍 Reading Mixed Graphs

### **Step 1: Identify Chart Types**
- Recognize each visualization type
- Note which data uses which chart
- Check legends and axis labels

### **Step 2: Understand Scales**
- Check if multiple y-axes used
- Note different scales for different data
- Understand units for each series

### **Step 3: Read Legends Carefully**
- Match colors/lines to data series
- Note what each element represents
- Check for any special symbols

### **Step 4: Analyze Relationships**
- Compare trends between series
- Identify correlations or divergences
- Look for patterns and anomalies

---

## 🎯 Common Question Types

### **1. Value Reading**
**"What was the value of Series A in Period X?"**
- Identify correct chart type and series
- Read value from appropriate axis

### **2. Comparison Questions**
**"Compare the performance of Series A and B in Period Y"**
- Read both values
- Calculate difference or ratio
- Consider different scales

### **3. Trend Analysis**
**"Describe the relationship between Series X and Y"**
- Compare slopes and directions
- Identify correlation patterns
- Note time lags or leads

### **4. Calculation Questions**
**"What is the percentage difference between A and B in Q3?"**
- Read both values
- Apply percentage formula
- Account for different units if any

### **5. Composition Analysis**
**"What percentage of total in Q2 was Component C?"**
- Read component and total values
- Calculate proportion

---

## 📈 Sample Mixed Graph Analysis

### **Sales Performance Dashboard**

\`\`\`
Monthly Sales Analysis

Revenue (bars) & Growth (line)

25 │           ▲
20 │         ▲   ▲
15 │ ████  ▲     ▲
10 │ ████▲       ▲
 5 │ ████        ▲
 0 │___________________
    Jan Feb Mar Apr May
\`\`\`

**Data Interpretation:**
- Bars: Monthly revenue (₹ lakhs)
- ▲ points: Month-over-month growth %
- Jan: Revenue 8, Growth N/A
- Feb: Revenue 12, Growth +50%
- Mar: Revenue 15, Growth +25%
- Apr: Revenue 18, Growth +20%
- May: Revenue 22, Growth +22%

### **Practice Questions**

**1. What was the revenue in March?**
- 15 lakhs (from bar height)

**2. Which month had the highest growth rate?**
- February: +50%

**3. What is the total revenue for 5 months?**
- 8 + 12 + 15 + 18 + 22 = 75 lakhs

**4. In which month was growth rate lowest?**
- April: +20% (excluding Jan with no growth data)

**5. What is the average monthly revenue?**
- 75/5 = 15 lakhs

---

## 🧮 Advanced Mixed Graph Types

### **1. Combo Charts with Secondary Axis**

\`\`\`
Dual Axis Chart

Temperature (°C) & Rainfall (mm)

35 │     ●-------●
30 │   ●         ●
25 │ ●           ●
20 │
15 │           ■■■■■
10 │         ■■■■■■■■
 5 │       ■■■■■■■■■■
 0 │___________________
     Jan Feb Mar Apr May
\`\`\`

**Analysis:**
- Line: Temperature scale (left axis)
- Bars: Rainfall scale (right axis)
- Different units require careful reading

### **2. Scatter Plot with Trend Line**

\`\`\`
Data Correlation

15 │       ●
12 │     ●   ●
 9 │   ●       ●
 6 │ ●   ●       ●
 3 │     ●   ●
 0 │___________________
     0   3   6   9   12
\`\`\`

**Analysis:**
- Points: Individual data pairs
- Line: Trend or regression line
- Shows relationship strength

### **3. Area Chart + Line**

\`\`\`
Cumulative Sales

25 │     ███████████████
20 │   █████████████
15 │ ███████████
10 │ ████████
 5 │ ████
 0 │___________________
    Q1  Q2  Q3  Q4
\`\`\`

**Analysis:**
- Area: Cumulative values
- Line: Period values
- Shows both individual and total trends

---

## 🎯 Complex Analysis Questions

### **Example 1: Correlation Analysis**
**Question:** "What is the relationship between advertising spend and sales?"

- Compare advertising line with sales bars
- Look for time lag effects
- Calculate correlation coefficient if data allows

### **Example 2: Efficiency Analysis**
**Question:** "Which department has best input-output ratio?"

- Compare cost bars with output lines
- Calculate efficiency ratios
- Identify optimal performers

### **Example 3: Trend Forecasting**
**Question:** "Predict next quarter's performance"

- Analyze historical trends
- Consider seasonal patterns
- Use trend lines for projection

---

## 📊 Reading Multiple Scales

### **Dual Y-Axis Charts**

\`\`\`
Revenue & Profit Margin

Revenue (bars, ₹cr) | Profit % (line)

25 │           ●
20 │         ●   ●
15 │ ████  ●     ●
10 │ ████●       ●
 5 │ ████        ●
 0 │___________________
    Q1  Q2  Q3  Q4

Left scale: 0-25 (Revenue)
Right scale: 0-25% (Profit)
\`\`\`

**Reading Tips:**
- Use correct axis for each data series
- Note different scales and units
- Compare trends, not absolute values

### **Scale Conversion**
- Revenue scale: 1 unit = ₹1 crore
- Profit scale: 1 unit = 1%
- Convert to common units when comparing

---

## 🚀 Speed Enhancement Techniques

### **1. Quick Identification**
- Recognize chart types instantly
- Match legends to visual elements
- Note scale differences immediately

### **2. Systematic Reading**
- Read one series at a time
- Compare related data points
- Use grid lines for accuracy

### **3. Pattern Recognition**
- Identify correlations quickly
- Spot anomalies or outliers
- Recognize common chart combinations

### **4. Mental Calculations**
- Round values for speed
- Use approximation techniques
- Compare ratios mentally

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Scale Usage**
❌ Using revenue scale for profit percentage
- Always check which axis belongs to which data

### **Mistake 2: Missing Legend**
❌ Confusing data series without legend
- Always read legend first

### **Mistake 3: Scale Confusion**
❌ Comparing values with different units directly
- Convert to common units when needed

### **Mistake 4: Overlooking Relationships**
❌ Analyzing series independently
- Look for correlations and relationships

### **Mistake 5: Trend Misinterpretation**
❌ Ignoring time lags between series
- Consider cause-effect relationships

---

## 🎯 Practice Mixed Graphs

### **Graph 1: Sales vs Profit**

\`\`\`
Quarterly Performance

Sales (bars) & Profit (line)

30 │         ●
25 │       ●   ●
20 │ ████●     ●
15 │ ████      ●
10 │ ████      ●
 5 │ ████      ●
 0 │___________________
    Q1  Q2  Q3  Q4
\`\`\`

**Questions:**
1. Which quarter had highest sales?
2. In which quarter was profit highest relative to sales?
3. What is the total sales for the year?

### **Graph 2: Temperature and Precipitation**

\`\`\`
Weather Analysis

Temp (°C) & Rain (mm)

35 │     ●-------●
30 │   ●         ●
25 │ ●           ●
20 │
15 │         ████
10 │       ███████
 5 │     █████████
 0 │___________________
    Jun Jul Aug Sep Oct
\`\`\`

**Questions:**
1. Which month had highest temperature?
2. Which month had highest rainfall?
3. Is there any relationship between temperature and rainfall?

---

## 🎓 Pro Tips for Mixed Graphs

1. **Identify all chart types** and their purposes
2. **Read legends and scales** carefully
3. **Understand relationships** between different data series
4. **Use appropriate scales** for each data type
5. **Look for correlations** and patterns
6. **Convert units** when comparing different metrics
7. **Practice systematic reading** of complex visualizations

---

## 🔢 Mixed Graph Analysis Framework

\`\`\`
1. IDENTIFY chart components
   - Types of visualizations used
   - Data series and their representations
   - Scales and units for each

2. READ legends and labels
   - Match colors/lines to data
   - Note axis assignments
   - Check for special symbols

3. ANALYZE relationships
   - Compare trends between series
   - Identify correlations/divergences
   - Note time lags or patterns

4. ANSWER the question
   - Extract required data points
   - Perform necessary calculations
   - Consider scale differences

5. VERIFY accuracy
   - Double-check readings
   - Ensure correct scale usage
   - Validate calculations
\`\`\`

Master mixed graph interpretation and extract insights from complex multi-chart visualizations! 🏆

**Answers for Practice Graphs:**
1. Q2: 20 units
2. Q3: Sales 15, Profit ~18 (high profit relative to sales)
3. 10 + 15 + 20 + 25 = 70 units

Weather: 1. July: 30°C
2. October: highest bars
3. Generally inverse relationship - higher rainfall in cooler months`
};