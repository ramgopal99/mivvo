import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_8: SubLesson = {
  id: "8.8",
  title: 'SI on Different Rates for Different Periods',
  status: 'completed',
  content: `# 📊 SI on Different Rates for Different Periods

Master complex simple interest scenarios with varying rates and time periods! Many real-world situations involve different interest rates for different time intervals. Learn to calculate total interest by breaking down the periods and applying appropriate rates.

---

## 🎯 Understanding Variable Rates

**Variable Rate SI** occurs when:
- Different rates apply to different time periods
- Rate changes during the loan/investment period
- Multiple rate slabs exist

### **Key Approach**
\`\`\`
Total SI = SI₁ + SI₂ + SI₃ + ...
Where each SI is calculated for its specific rate and time period
\`\`\`

---

## 📊 Calculation Method

### **Step-by-Step Process**
1. **Divide the total period** into segments with same rate
2. **Calculate SI for each segment** using its rate and time
3. **Add all SI amounts** to get total interest
4. **Add total SI to principal** for final amount

### **Formula for Each Segment**
\`\`\`
SI_segment = (P × R_segment × T_segment) ÷ 100
\`\`\`

---

## 🔢 Examples

### **Example 1: Two Different Rates**
**Problem:** P = ₹10,000, first 2 years at 8%, next 3 years at 10%. Find total SI.

**Solution:**
- SI₁ = (10000 × 8 × 2) ÷ 100 = ₹1600
- SI₂ = (10000 × 10 × 3) ÷ 100 = ₹3000
- Total SI = 1600 + 3000 = ₹4600

### **Example 2: Three Rate Periods**
**Problem:** P = ₹20,000, first year 6%, second year 8%, third year 10%. Find total SI.

**Solution:**
- SI₁ = (20000 × 6 × 1) ÷ 100 = ₹1200
- SI₂ = (20000 × 8 × 1) ÷ 100 = ₹1600
- SI₃ = (20000 × 10 × 1) ÷ 100 = ₹2000
- Total SI = 1200 + 1600 + 2000 = ₹4800

### **Example 3: Partial Years**
**Problem:** P = ₹15,000, first 6 months at 9%, next 18 months at 11%. Find total SI.

**Solution:**
- Convert to years: 6 months = 0.5 years, 18 months = 1.5 years
- SI₁ = (15000 × 9 × 0.5) ÷ 100 = ₹675
- SI₂ = (15000 × 11 × 1.5) ÷ 100 = ₹2475
- Total SI = 675 + 2475 = ₹3150

---

## 💡 Applications

### **1. Loan Rate Changes**
- Interest rate revisions
- Promotional rate periods
- Variable rate loans

### **2. Investment Rate Variations**
- Changing FD rates
- SIP rate fluctuations
- Market-linked returns

### **3. Business Scenarios**
- Seasonal pricing
- Volume-based discounts
- Time-based rate slabs

---

## 🎯 Advanced Scenarios

### **Scenario 1: Principal Changes**
When principal amount changes during the period (additional deposits/withdrawals).

### **Scenario 2: Overlapping Periods**
When rate changes occur at irregular intervals.

### **Scenario 3: Compound Effects**
Though SI doesn't compound, understanding the difference with CI.

---

## 🧮 Weighted Average Rate

### **For Comparison Purposes**
\`\`\`
Weighted Average Rate = (Total SI × 100) ÷ (P × Total T)
\`\`\`

**Example:** Total SI = ₹4600, P = ₹10,000, T = 5 years
- Average R = (4600 × 100) ÷ (10000 × 5) = 9.2%

---

## 🚨 Common Mistakes

### **Mistake 1: Single Rate Application**
❌ Applying only one rate to entire period
- Calculate each segment separately

### **Mistake 2: Wrong Time Division**
❌ Incorrect period segmentation
- Ensure time periods add up correctly

### **Mistake 3: Principal Changes**
❌ Using same P for all periods
- Adjust principal if deposits/withdrawals occur

### **Mistake 4: Rate Unit Confusion**
❌ Mixing monthly and yearly rates
- Convert to consistent units

---

## 🎯 Practice Problems

### **Two Rate Periods:**
1. P = ₹8000, first 2 years 7%, next 3 years 9%. Total SI?
2. P = ₹12000, first 1 year 8%, next 2 years 10%. Total SI?

### **Three Rate Periods:**
1. P = ₹5000, Year 1: 6%, Year 2: 8%, Year 3: 10%. Total SI?
2. P = ₹15000, 6 months: 9%, 12 months: 11%, 6 months: 12%. Total SI?

### **Complex Scenarios:**
1. P = ₹10000, first 6 months 8%, next 12 months 9%, last 6 months 10%. Total SI?
2. Find weighted average rate for above scenario.

**Answers:**
Two rates: ₹1840, ₹3360
Three rates: ₹950, ₹2250
Complex: ₹1450, 9.67%

Master variable rate calculations for realistic financial scenarios! 🏆`
};
