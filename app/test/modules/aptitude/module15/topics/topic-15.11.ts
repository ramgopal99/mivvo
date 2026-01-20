import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_11: SubLesson = {
  id: "15.11",
  title: 'Data Sufficiency (Basic)',
  status: 'completed',
  content: "`# â“ Data Sufficiency (Basic)

Master Data Sufficiency questions in DI! These unique problems test your ability to determine what information is needed to solve a problem without actually calculating the answer. Learn to analyze requirements and identify when data is sufficient or insufficient.

---

## ðŸŽ¯ What is Data Sufficiency?

**Data Sufficiency** questions present a problem and multiple statements, asking whether the given data is enough to solve the problem. The goal is not to find the answer, but to determine if sufficient information exists.

### **Question Format**
**"What is the value of X?"**
1. Statement A alone is sufficient
2. Statement B alone is sufficient
3. Both statements together are sufficient
4. Each statement alone is sufficient
5. Neither statement nor both are sufficient

### **Key Concept**
- **Sufficient**: Enough information to find unique answer
- **Insufficient**: Missing data or multiple possible answers
- **Redundant**: Extra information not needed

---

## ðŸ” Data Sufficiency Analysis

### **Step 1: Understand the Question**
- Identify what is being asked
- Note all variables involved
- Determine what information is needed

### **Step 2: Analyze Statement A**
- Check if A alone provides enough information
- Identify what A tells us
- See if any variables remain unknown

### **Step 3: Analyze Statement B**
- Check if B alone is sufficient
- Compare with A's information
- Note any overlap or new information

### **Step 4: Analyze Combined Statements**
- Check if A and B together are sufficient
- See if they provide all required information
- Identify if they create unique solution

### **Step 5: Choose Correct Option**
- Match with standard answer formats
- Eliminate wrong options systematically

---

## ðŸŽ¯ Common Data Sufficiency Patterns

### **Pattern 1: Single Variable Problems**

**Question:** What is John's age?
**Statement A:** John is 5 years older than Mary
**Statement B:** Mary is 25 years old

**Analysis:**
- A alone: Not sufficient (Mary's age unknown)
- B alone: Not sufficient (John's age unknown)
- A + B: Sufficient (John = 25 + 5 = 30)

**Answer:** Both statements together are sufficient

### **Pattern 2: Ratio Problems**

**Question:** What is the ratio of boys to girls in class?
**Statement A:** There are 30 boys
**Statement B:** Boys are 60% of total students

**Analysis:**
- A alone: Not sufficient (girls unknown)
- B alone: Not sufficient (total unknown)
- A + B: Redundant (if 30 boys = 60%, total = 50, girls = 20)

**Answer:** Each statement alone is sufficient

### **Pattern 3: Percentage Problems**

**Question:** What is the marked price?
**Statement A:** Selling price is â‚¹800 at 20% discount
**Statement B:** Cost price is â‚¹600

**Analysis:**
- A alone: MP = SP/(1-discount%) = 800/0.8 = â‚¹1000
- B alone: Not sufficient (profit/loss unknown)
- A + B: Redundant

**Answer:** Statement A alone is sufficient

---

## ðŸ“Š Data Sufficiency in DI Context

### **Table-Based Questions**

**Question:** What is the total sales of Product A in 2020?

| Product | 2019 | 2020 | Growth % |
|---------|------|------|----------|
| A       | 100  | ?    | 20%      |
| B       | 150  | 180  | ?        |

**Statement A:** Product B had 20% growth in 2020
**Statement B:** Total sales in 2020 were â‚¹500

**Analysis:**
- A alone: B grew 20% from 150 to 180 âœ“, but doesn't help A
- B alone: Total 500, but B=180, A unknown
- A + B: A grew 20% from 100 to 120, total = 120 + 180 = 300 â‰  500

**Answer:** Neither statement nor both are sufficient

### **Chart-Based Questions**

**Question:** What percentage of total is Category X?

\`"\`\`
Pie Chart: A-30%, B-40%, C-20%, D-?
\`\`\`

**Statement A:** Category D is 10%
**Statement B:** Total value is â‚¹1000

**Analysis:**
- A alone: D=10%, total % = 30+40+20+10=100%, so X% known
- B alone: Total 1000, but individual values unknown
- A + B: Redundant

**Answer:** Statement A alone is sufficient

---

## ðŸŽ¯ Advanced Data Sufficiency Scenarios

### **Example 1: Multiple Relationships**

**Question:** What is the population of City X?

**Statement A:** City X has 20% more population than City Y
**Statement B:** City Y has 10,000 population

**Analysis:**
- A alone: Not sufficient (Y unknown)
- B alone: Not sufficient (relationship unknown)
- A + B: X = 10,000 Ã— 1.20 = 12,000

**Answer:** Both statements together are sufficient

### **Example 2: Conditional Information**

**Question:** What is the profit percentage?

**Statement A:** Selling price is â‚¹120, cost price is â‚¹100
**Statement B:** If cost price was 10% less, profit would be 25%

**Analysis:**
- A alone: Profit = (120-100)/100 Ã— 100 = 20%
- B alone: Creates equation but SP unknown
- A + B: Redundant

**Answer:** Statement A alone is sufficient

### **Example 3: Insufficient Information**

**Question:** What is the average speed?

**Statement A:** Distance covered is 120 km
**Statement B:** Time taken is 2 hours

**Analysis:**
- A alone: Time unknown
- B alone: Distance unknown
- A + B: Speed = 120/2 = 60 km/h

**Answer:** Both statements together are sufficient

---

## ðŸ“‹ Standard Answer Options

### **Option 1: Statement A alone is sufficient**
- A provides all required information
- B is unnecessary or redundant

### **Option 2: Statement B alone is sufficient**
- B provides all required information
- A is unnecessary or redundant

### **Option 3: Both statements together are sufficient**
- Neither alone is enough
- Combined they provide complete information

### **Option 4: Each statement alone is sufficient**
- Both A and B independently provide enough information
- Can use either one

### **Option 5: Neither statement nor both are sufficient**
- Even with both statements, cannot find unique answer
- Missing crucial information
- Contradictory information

---

## ðŸŽ¯ Common DI Data Sufficiency Types

### **Type 1: Value Finding**
**"What is the value of X?"**
- Need exact numerical value
- Any ambiguity makes it insufficient

### **Type 2: Percentage Calculation**
**"What percentage of A is B?"**
- Need both values or relationship
- May require total or individual amounts

### **Type 3: Ratio Problems**
**"What is the ratio of X:Y?"**
- Need both quantities or relationship
- May have multiple possibilities

### **Type 4: Comparison Questions**
**"Which is larger, A or B?"**
- Need values or comparison relationship
- May require additional context

### **Type 5: Average Problems**
**"What is the average of group X?"**
- Need total and count, or individual values
- May require distribution information

---

## ðŸš¨ Common Pitfalls to Avoid

### **Pitfall 1: Assuming Information**
âŒ "If A is 50%, B must be 50%" (without total being 100%)
- Don't assume unstated relationships

### **Pitfall 2: Ignoring Dependencies**
âŒ "A gives ratio, B gives total, so sufficient"
- Check if ratio and total together give unique values

### **Pitfall 3: Overlooking Conditions**
âŒ Missing "if-then" relationships
- Read statements carefully for conditional information

### **Pitfall 4: Wrong Sufficiency Criteria**
âŒ "Two equations always sufficient for two variables"
- May have infinite solutions or inconsistencies

### **Pitfall 5: Calculation Errors**
âŒ Thinking information sufficient when calculations give different answers
- Always check if statements lead to unique answer

---

## ðŸŽ¯ Practice Data Sufficiency Questions

### **Basic Problems**

1. **What is the area of rectangle?**
   **A:** Length is 10m
   **B:** Perimeter is 30m

   **Analysis:** A alone: Width unknown
   B alone: Length unknown
   A + B: Width = (30-20)/2 = 5m, Area = 50mÂ²
   **Answer:** Both together sufficient

2. **What is the selling price?**
   **A:** Cost price is â‚¹100, profit is 20%
   **B:** Marked price is â‚¹120, discount is 10%

   **Analysis:** A alone: SP = 100 Ã— 1.2 = â‚¹120
   B alone: SP = 120 Ã— 0.9 = â‚¹108
   A + B: Contradictory information
   **Answer:** Each alone sufficient (but different answers!)

   Wait, this shows the issue - in real DS, statements should be consistent.

---

## ðŸŽ“ Pro Tips for Data Sufficiency

1. **Don't solve the actual problem** - just check sufficiency
2. **Look for unique answers** - any ambiguity means insufficient
3. **Check consistency** - statements should not contradict
4. **Consider all possibilities** - could there be multiple answers?
5. **Use options systematically** - eliminate wrong choices
6. **Read statements literally** - don't add assumptions
7. **Practice logical thinking** - focus on "what if" scenarios

---

## ðŸ”¢ Data Sufficiency Decision Tree

\`\`\`
Start with question requirement
    â†“
Analyze Statement A
    â†“
Does A give unique answer? â†’ Yes: Option 1
    â†“
No â†’ Analyze Statement B
    â†“
Does B give unique answer? â†’ Yes: Option 2
    â†“
No â†’ Analyze A + B together
    â†“
Do A + B give unique answer? â†’ Yes: Option 3
    â†“
No â†’ Check if each alone works â†’ Yes: Option 4
    â†“
No â†’ Option 5 (insufficient)
\`\`\`

---

## ðŸ“Š DI-Specific Data Sufficiency

### **Table Data Sufficiency**

**Question:** What is the average sales of Product X?

**Statement A:** Product X sales in 4 quarters: 100, 120, 140, 160
**Statement B:** Total sales of all products in Q1 was 500

**Analysis:**
- A alone: Average = (100+120+140+160)/4 = 130
- B alone: No information about X's sales
- A + B: Redundant

**Answer:** Statement A alone is sufficient

### **Chart Data Sufficiency**

**Question:** What percentage of total is Category A?

**Statement A:** Pie chart shows A as 25% of total
**Statement B:** Total value is â‚¹1000, A contributes â‚¹250

**Analysis:**
- A alone: Directly gives 25%
- B alone: 250/1000 = 25%
- A + B: Consistent but redundant

**Answer:** Each statement alone is sufficient

Master data sufficiency and determine information adequacy with precision! ðŸ†`
};
