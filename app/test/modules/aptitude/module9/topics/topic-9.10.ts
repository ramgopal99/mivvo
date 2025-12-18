import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_10: SubLesson = {
  id: "9.10",
  title: 'Compound Interest on Successive Years',
  status: 'completed',
  content: `# 🔢 Compound Interest on Successive Years

Learn to calculate compound interest year by year! Understanding successive year calculations helps track growth patterns and predict future values. Master the step-by-step compounding process.

---

## 🎯 Successive Year CI Concept

**Successive Year CI** means calculating interest for each year separately, where each year's interest is added to the principal for the next year's calculation. This shows the exponential growth pattern clearly.

### **Key Process**
1. Start with initial principal
2. Calculate interest for year 1
3. Add interest to principal
4. Repeat for subsequent years

---

## 📊 Year-by-Year Calculation

### **Example 1: Three-Year Investment**
**Problem:** ₹10,000 at 10% annual CI. Show successive year calculations.

**Year 1:**
- Principal: ₹10,000
- Interest: (10000 × 10 × 1) ÷ 100 = ₹1,000
- Amount: 10,000 + 1,000 = ₹11,000

**Year 2:**
- Principal: ₹11,000
- Interest: (11000 × 10 × 1) ÷ 100 = ₹1,100
- Amount: 11,000 + 1,100 = ₹12,100

**Year 3:**
- Principal: ₹12,100
- Interest: (12100 × 10 × 1) ÷ 100 = ₹1,210
- Amount: 12,100 + 1,210 = ₹13,310

**Total CI:** 1,000 + 1,100 + 1,210 = ₹3,310

---

## 🔢 Using Formula for Successive Years

### **Amount After n Years**
\`\`\`
A = P(1 + R/100)^n
\`\`\`

### **Interest for Specific Year**
\`\`\`
Year n Interest = P(1 + R/100)^(n-1) × (R/100)
\`\`\`

**Example:** Year 3 interest for above example
- Year 3 Interest = 10000 × (1.10)^2 × 0.10 = 10000 × 1.21 × 0.10 = ₹1,210 ✓

---

## 💡 Interest Pattern Analysis

### **1. Increasing Interest**
- Year 1: ₹1,000
- Year 2: ₹1,100 (+10%)
- Year 3: ₹1,210 (+10%)

**Each year's interest increases by same percentage**

### **2. Cumulative Growth**
- Total amount grows exponentially
- Interest portion increases each year

### **3. Principal Growth**
- Principal doubles approximately every 7-8 years at 10%
- Rule of 72: Years to double = 72 ÷ Rate

---

## 🎯 Applications

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

## 🧮 Successive Year Table

| Year | Principal Start | Interest | Principal End |
|------|-----------------|----------|----------------|
| 1 | ₹10,000 | ₹1,000 | ₹11,000 |
| 2 | ₹11,000 | ₹1,100 | ₹12,100 |
| 3 | ₹12,100 | ₹1,210 | ₹13,310 |
| **Total** |  | **₹3,310** | **₹13,310** |

---

## 🚨 Common Mistakes

### **Mistake 1: Same Interest Each Year**
❌ "Interest remains ₹1000 every year"
- Interest increases each year

### **Mistake 2: Wrong Principal for Next Year**
❌ "Adding interest but not updating principal"
- Principal = Previous principal + interest

### **Mistake 3: Confusing with SI**
❌ "SI also increases each year"
- SI interest stays same, CI increases

---

## 🎯 Practice Problems

### **Year-by-Year Calculations:**
1. ₹5000 at 8% annual CI. Show amounts for 3 years.
2. ₹8000 at 6% annual CI. Find interest for year 2 and 3.

### **Pattern Analysis:**
1. At what rate does principal double in 7 years?
2. How many years to triple at 10%?

**Answers:**
Year-by-year: Year1 ₹5400, Year2 ₹5832, Year3 ₹6310.56; Year2 ₹480, Year3 ₹504
Pattern: ~10.3%, ~11.5 years

Master successive year CI calculations for detailed growth analysis! 🏆`
};