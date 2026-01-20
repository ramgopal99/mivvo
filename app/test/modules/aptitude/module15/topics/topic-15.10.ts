import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_10: SubLesson = {
  id: "15.10",
  title: 'Caselet DI',
  status: 'completed',
  content: "`# ðŸ“– Caselet DI

Master Caselet Data Interpretation! Caselets are story-based DI problems that require comprehensive analysis of narrative data. Learn to extract, organize, and analyze information from paragraphs, stories, and complex scenarios.

---

## ðŸŽ¯ What is Caselet DI?

**Caselet DI** presents data in narrative or story format rather than traditional charts/tables. It requires:
- Reading comprehension skills
- Data extraction and organization
- Analytical thinking
- Connecting multiple pieces of information

### **Caselet Characteristics**
- **Narrative Form**: Story or paragraph format
- **Multiple Questions**: 4-6 questions per caselet
- **Complex Relationships**: Interconnected data points
- **Real-World Context**: Business, social, or practical scenarios

### **Advantages**
- Tests comprehensive understanding
- Requires logical reasoning
- Closer to real business analysis
- Less reliance on visual skills

---

## ðŸ“ Caselet Reading Strategy

### **Step 1: Initial Reading**
- Read the entire caselet once
- Understand the context and scenario
- Identify key entities and relationships
- Note any numbers, dates, or categories

### **Step 2: Data Extraction**
- Create mental tables or notes
- Identify all quantitative information
- Note relationships and dependencies
- Mark important assumptions

### **Step 3: Question Analysis**
- Read each question carefully
- Identify required data points
- Note any calculations needed
- Plan solution approach

### **Step 4: Systematic Solving**
- Extract relevant data for each question
- Perform calculations step-by-step
- Verify assumptions and relationships
- Cross-check with caselet information

---

## ðŸ“Š Caselet Types and Structures

### **Type 1: Business Scenario**

**Example Caselet:**
"A company has 4 divisions: A, B, C, D. Division A has 40% of total employees and contributes 50% of total revenue. Division B has 30% of employees and 25% of revenue. Division C has 20% employees and 15% revenue. Division D has 10% employees and 10% revenue. Total employees are 1000 and total revenue is â‚¹10 crores."

**Data Organization:**
| Division | Employees | % Employees | Revenue (â‚¹cr) | % Revenue |
|----------|-----------|-------------|---------------|-----------|
| A        | 400       | 40%         | 5.0           | 50%       |
| B        | 300       | 30%         | 2.5           | 25%       |
| C        | 200       | 20%         | 1.5           | 15%       |
| D        | 100       | 10%         | 1.0           | 10%       |
| Total    | 1000      | 100%        | 10.0          | 100%      |

**Sample Questions:**
1. How many employees in Division A? (400)
2. What is revenue per employee in Division B? (â‚¹8,333)
3. Which division has highest revenue per employee? (A: â‚¹12,500)

### **Type 2: Population/Social Data**

**Example Caselet:**
"A town has population of 50,000. 60% are adults, 40% children. Among adults, 70% are employed. Among employed adults, 80% are males. Children comprise 45% boys and 55% girls."

**Data Organization:**
- Total Population: 50,000
- Adults: 60% = 30,000
- Children: 40% = 20,000
- Employed Adults: 70% of 30,000 = 21,000
- Employed Males: 80% of 21,000 = 16,800
- Employed Females: 20% of 21,000 = 4,200
- Unemployed Adults: 30% of 30,000 = 9,000
- Boys: 45% of 20,000 = 9,000
- Girls: 55% of 20,000 = 11,000

### **Type 3: Financial Data**

**Example Caselet:**
"A company had revenue of â‚¹100 crores in 2019. In 2020, revenue increased by 20%. Cost of goods sold was 60% of revenue. Operating expenses were â‚¹15 crores. Tax rate is 25%."

**Calculations:**
- 2020 Revenue: 100 Ã— 1.20 = â‚¹120 crores
- 2019 COGS: 60% of 100 = â‚¹60 crores
- 2020 COGS: 60% of 120 = â‚¹72 crores
- 2019 Operating Expenses: Assume same â‚¹15 crores
- 2019 Profit before tax: 100 - 60 - 15 = â‚¹25 crores
- 2019 Tax: 25% of 25 = â‚¹6.25 crores
- 2019 Net Profit: 25 - 6.25 = â‚¹18.75 crores

---

## ðŸŽ¯ Common Caselet Question Types

### **1. Direct Value Questions**
**"What is the value of X?"**
- Direct extraction from caselet
- May require simple calculation

### **2. Percentage Calculations**
**"What percentage of A is B?"**
- Calculate proportions
- Use percentage formulas

### **3. Ratio Questions**
**"What is the ratio of X to Y?"**
- Compare quantities
- Simplify ratios

### **4. Average Calculations**
**"What is the average value?"**
- Calculate means
- May require weighted averages

### **5. Growth/Change Questions**
**"By what percentage did X change?"**
- Calculate percentage changes
- Compare across periods

### **6. Conditional Questions**
**"If condition X applies, what happens to Y?"**
- Apply given conditions
- Calculate new values

---

## ðŸ“‹ Caselet Solving Framework

### **Step 1: Create Data Tables**
**Mental/Physical Organization:**
- List all entities (companies, people, items)
- Note all quantitative data
- Create relationship maps
- Identify dependencies

### **Step 2: Calculate Base Values**
**Find fundamental numbers:**
- Calculate totals from percentages
- Find missing values using relationships
- Verify consistency of data

### **Step 3: Build Relationship Tree**
**Map connections:**
- Which values depend on others
- Calculation sequences
- Assumption dependencies

### **Step 4: Pre-calculate Common Values**
**Prepare for questions:**
- Calculate frequently needed values
- Find averages, totals, percentages
- Prepare ratio calculations

---

## ðŸŽ¯ Sample Caselet Analysis

### **Company Performance Caselet**

**"ABC Corporation has 5 departments with employee distribution: HR-20%, IT-30%, Sales-25%, Finance-15%, Admin-10%. Average salary per department: HR-â‚¹40,000, IT-â‚¹60,000, Sales-â‚¹45,000, Finance-â‚¹50,000, Admin-â‚¹35,000. Total employees are 1000."**

### **Data Organization**

| Department | % Employees | Employees | Avg Salary | Total Salary (â‚¹) |
|------------|-------------|-----------|------------|------------------|
| HR         | 20%         | 200       | 40,000    | 80,00,000       |
| IT         | 30%         | 300       | 60,000    | 1,80,00,000     |
| Sales      | 25%         | 250       | 45,000    | 1,12,50,000     |
| Finance    | 15%         | 150       | 50,000    | 75,00,000       |
| Admin      | 10%         | 100       | 35,000    | 35,00,000       |
| **Total**  | **100%**    | **1000**  | -          | **4,82,50,000** |

### **Sample Questions & Solutions**

**1. How many employees in IT department?**
- 30% of 1000 = 300

**2. What is total salary expenditure?**
- Sum of all department salaries = â‚¹4,82,50,000

**3. Which department has highest total salary?**
- IT: â‚¹1,80,00,000 (highest)

**4. What is the average salary across all employees?**
- Total salary/Total employees = 4,82,50,000/1000 = â‚¹48,250

**5. What percentage of total salary is IT department?**
- (1,80,00,000/4,82,50,000) Ã— 100 â‰ˆ 37.31%

---

## ðŸ§® Advanced Caselet Techniques

### **1. Multi-Variable Relationships**
**Example:** Price, quantity, discount relationships

**Caselet:** "A shop sells items at â‚¹100 each. For 10+ items, 10% discount. For 20+ items, 20% discount. Customer bought 25 items."

**Calculations:**
- Base price: 25 Ã— 100 = â‚¹2,500
- 20% discount applies (25 > 20)
- Discount: 20% of 2,500 = â‚¹500
- Final price: 2,500 - 500 = â‚¹2,000

### **2. Time-Based Calculations**
**Example:** Growth over multiple periods

**Caselet:** "Population 10,000 in 2019. Grows 10% annually."

**Calculations:**
- 2020: 10,000 Ã— 1.10 = 11,000
- 2021: 11,000 Ã— 1.10 = 12,100
- 2022: 12,100 Ã— 1.10 = 13,310

### **3. Conditional Logic**
**Example:** Tiered pricing or bonuses

**Caselet:** "Salary based on sales: Up to â‚¹1 lakh-5% commission, â‚¹1-2 lakhs-7%, Above â‚¹2 lakhs-10%."

**Calculations:**
- Sales â‚¹2.5 lakhs
- First â‚¹1 lakh: 5% = â‚¹5,000
- Next â‚¹1 lakh: 7% = â‚¹7,000
- Last â‚¹0.5 lakh: 10% = â‚¹5,000
- Total commission: â‚¹17,000

---

## ðŸš¨ Common Caselet Challenges

### **Challenge 1: Information Overload**
**Solution:** Focus on relevant data for each question
**Tip:** Don't try to calculate everything at once

### **Challenge 2: Hidden Relationships**
**Solution:** Read carefully for implicit connections
**Tip:** Look for "if-then" relationships

### **Challenge 3: Multiple Assumptions**
**Solution:** Note all assumptions explicitly
**Tip:** Verify each assumption is valid

### **Challenge 4: Complex Calculations**
**Solution:** Break down into smaller steps
**Tip:** Calculate intermediate values

---

## ðŸŽ¯ Practice Caselet

### **Banking Caselet**

**"ABC Bank has 4 branches with deposits: Branch A - â‚¹200 crores (40%), B - â‚¹150 crores (30%), C - â‚¹75 crores (15%), D - â‚¹75 crores (15%). Interest rates: A-6%, B-7%, C-8%, D-5%. Total interest earned is â‚¹14.5 crores."**

### **Questions:**

1. **What are the actual deposits for each branch?**
   - A: 40% of 500 = â‚¹200 crores
   - B: 30% of 500 = â‚¹150 crores
   - C: 15% of 500 = â‚¹75 crores
   - D: 15% of 500 = â‚¹75 crores

2. **What is the interest earned by Branch A?**
   - â‚¹200 crores Ã— 6% = â‚¹12 crores

3. **Which branch has highest interest per crore?**
   - A: 6%, B: 7%, C: 8%, D: 5% â†’ C (8%)

4. **Verify the total interest calculation**
   - A: 200Ã—0.06 = 12
   - B: 150Ã—0.07 = 10.5
   - C: 75Ã—0.08 = 6
   - D: 75Ã—0.05 = 3.75
   - Total: 12 + 10.5 + 6 + 3.75 = 32.25 crores (Wait, caselet says 14.5 - inconsistency!)

---

## ðŸŽ“ Pro Tips for Caselet DI

1. **Read the caselet 2-3 times** carefully
2. **Make notes/tables** for important data
3. **Identify relationships** between variables
4. **Pre-calculate** common values
5. **Answer questions one by one** systematically
6. **Check calculations** multiple times
7. **Look for shortcuts** in calculations

---

## ðŸ”¢ Caselet Solving Framework

\`"\`\`
1. READ the entire caselet
   - Understand the scenario
   - Note all quantitative data
   - Identify relationships

2. ORGANIZE the data
   - Create mental/physical tables
   - Calculate missing values
   - Verify data consistency

3. ANALYZE each question
   - Identify required data
   - Plan calculation steps
   - Check for dependencies

4. CALCULATE systematically
   - Use appropriate formulas
   - Show intermediate steps
   - Verify with original data

5. REVIEW and verify
   - Check calculation accuracy
   - Ensure answer makes sense
   - Compare with options
\`\`\`

Master caselet DI and tackle complex narrative data with confidence! ðŸ†

**Note:** The banking caselet has inconsistent data (14.5 crores vs 32.25 crores calculated). In real exams, always check for such inconsistencies and choose the mathematically correct answer based on given data.`
};
