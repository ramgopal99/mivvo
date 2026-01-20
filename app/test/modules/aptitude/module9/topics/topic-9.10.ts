import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_10: SubLesson = {
  id: "9.10",
  title: 'Compound Interest on Successive Years',
  status: 'completed',
  content: "`# ðŸ”¢ Compound Interest on Successive Years

Learn to calculate compound interest year by year! Understanding successive year calculations helps track growth patterns and predict future values. Master the step-by-step compounding process.

---

## ðŸŽ¯ Successive Year CI Concept

**Successive Year CI** means calculating interest for each year separately, where each year's interest is added to the principal for the next year's calculation. This shows the exponential growth pattern clearly.

### **Key Process**
1. Start with initial principal
2. Calculate interest for year 1
3. Add interest to principal
4. Repeat for subsequent years

---

## ðŸ“Š Year-by-Year Calculation

### **Example 1: Three-Year Investment**
**Problem:** â‚¹10,000 at 10% annual CI. Show successive year calculations.

**Year 1:**
- Principal: â‚¹10,000
- Interest: (10000 Ã— 10 Ã— 1) Ã· 100 = â‚¹1,000
- Amount: 10,000 + 1,000 = â‚¹11,000

**Year 2:**
- Principal: â‚¹11,000
- Interest: (11000 Ã— 10 Ã— 1) Ã· 100 = â‚¹1,100
- Amount: 11,000 + 1,100 = â‚¹12,100

**Year 3:**
- Principal: â‚¹12,100
- Interest: (12100 Ã— 10 Ã— 1) Ã· 100 = â‚¹1,210
- Amount: 12,100 + 1,210 = â‚¹13,310

**Total CI:** 1,000 + 1,100 + 1,210 = â‚¹3,310

---

## ðŸ”¢ Using Formula for Successive Years

### **Amount After n Years**
\`"\`\`
A = P(1 + R/100)^n
\`\`\`

### **Interest for Specific Year**
\`\`\`
Year n Interest = P(1 + R/100)^(n-1) Ã— (R/100)
\`\`\`

**Example:** Year 3 interest for above example
- Year 3 Interest = 10000 Ã— (1.10)^2 Ã— 0.10 = 10000 Ã— 1.21 Ã— 0.10 = â‚¹1,210 âœ“

---

## ðŸ’¡ Interest Pattern Analysis

### **1. Increasing Interest**
- Year 1: â‚¹1,000
- Year 2: â‚¹1,100 (+10%)
- Year 3: â‚¹1,210 (+10%)

**Each year's interest increases by same percentage**

### **2. Cumulative Growth**
- Total amount grows exponentially
- Interest portion increases each year

### **3. Principal Growth**
- Principal doubles approximately every 7-8 years at 10%
- Rule of 72: Years to double = 72 Ã· Rate

---

## ðŸŽ¯ Applications

### **1. Investment Tracking**
- Year-wise portfolio growth
- Retirement fund accumulation
- Savings plan progress

### **2. Loan Amortization**
- Year-wise interest calculation
- Principal reduction tracking
- EMI component analysis

### **3. Business Planning**
- Asset value appreciation
- Depreciation schedules
- Profit projection

---

## ðŸ§® Successive Year Table

| Year | Principal Start | Interest | Principal End |
|------|-----------------|----------|----------------|
| 1 | â‚¹10,000 | â‚¹1,000 | â‚¹11,000 |
| 2 | â‚¹11,000 | â‚¹1,100 | â‚¹12,100 |
| 3 | â‚¹12,100 | â‚¹1,210 | â‚¹13,310 |
| **Total** |  | **â‚¹3,310** | **â‚¹13,310** |

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Same Interest Each Year**
âŒ "Interest remains â‚¹1000 every year"
- Interest increases each year

### **Mistake 2: Wrong Principal for Next Year**
âŒ "Adding interest but not updating principal"
- Principal = Previous principal + interest

### **Mistake 3: Confusing with SI**
âŒ "SI also increases each year"
- SI interest stays same, CI increases

---

## ðŸŽ¯ Practice Problems

### **Year-by-Year Calculations:**
1. â‚¹5000 at 8% annual CI. Show amounts for 3 years.
2. â‚¹8000 at 6% annual CI. Find interest for year 2 and 3.

### **Pattern Analysis:**
1. At what rate does principal double in 7 years?
2. How many years to triple at 10%?

**Answers:**
Year-by-year: Year1 â‚¹5400, Year2 â‚¹5832, Year3 â‚¹6310.56; Year2 â‚¹480, Year3 â‚¹504
Pattern: ~10.3%, ~11.5 years

Master successive year CI calculations for detailed growth analysis! ðŸ†`
};

