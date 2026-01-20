import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_8: SubLesson = {
  id: "8.8",
  title: 'SI on Different Rates for Different Periods',
  status: 'completed',
  content: "`# ðŸ“Š SI on Different Rates for Different Periods

Master complex simple interest scenarios with varying rates and time periods! Many real-world situations involve different interest rates for different time intervals. Learn to calculate total interest by breaking down the periods and applying appropriate rates.

---

## ðŸŽ¯ Understanding Variable Rates

**Variable Rate SI** occurs when:
- Different rates apply to different time periods
- Rate changes during the loan/investment period
- Multiple rate slabs exist

### **Key Approach**
\`"\`\`
Total SI = SIâ‚ + SIâ‚‚ + SIâ‚ƒ + ...
Where each SI is calculated for its specific rate and time period
\`\`\`

---

## ðŸ“Š Calculation Method

### **Step-by-Step Process**
1. **Divide the total period** into segments with same rate
2. **Calculate SI for each segment** using its rate and time
3. **Add all SI amounts** to get total interest
4. **Add total SI to principal** for final amount

### **Formula for Each Segment**
\`\`\`
SI_segment = (P Ã— R_segment Ã— T_segment) Ã· 100
\`\`\`

---

## ðŸ”¢ Examples

### **Example 1: Two Different Rates**
**Problem:** P = â‚¹10,000, first 2 years at 8%, next 3 years at 10%. Find total SI.

**Solution:**
- SIâ‚ = (10000 Ã— 8 Ã— 2) Ã· 100 = â‚¹1600
- SIâ‚‚ = (10000 Ã— 10 Ã— 3) Ã· 100 = â‚¹3000
- Total SI = 1600 + 3000 = â‚¹4600

### **Example 2: Three Rate Periods**
**Problem:** P = â‚¹20,000, first year 6%, second year 8%, third year 10%. Find total SI.

**Solution:**
- SIâ‚ = (20000 Ã— 6 Ã— 1) Ã· 100 = â‚¹1200
- SIâ‚‚ = (20000 Ã— 8 Ã— 1) Ã· 100 = â‚¹1600
- SIâ‚ƒ = (20000 Ã— 10 Ã— 1) Ã· 100 = â‚¹2000
- Total SI = 1200 + 1600 + 2000 = â‚¹4800

### **Example 3: Partial Years**
**Problem:** P = â‚¹15,000, first 6 months at 9%, next 18 months at 11%. Find total SI.

**Solution:**
- Convert to years: 6 months = 0.5 years, 18 months = 1.5 years
- SIâ‚ = (15000 Ã— 9 Ã— 0.5) Ã· 100 = â‚¹675
- SIâ‚‚ = (15000 Ã— 11 Ã— 1.5) Ã· 100 = â‚¹2475
- Total SI = 675 + 2475 = â‚¹3150

---

## ðŸ’¡ Applications

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

## ðŸŽ¯ Advanced Scenarios

### **Scenario 1: Principal Changes**
When principal amount changes during the period (additional deposits/withdrawals).

### **Scenario 2: Overlapping Periods**
When rate changes occur at irregular intervals.

### **Scenario 3: Compound Effects**
Though SI doesn't compound, understanding the difference with CI.

---

## ðŸ§® Weighted Average Rate

### **For Comparison Purposes**
\`\`\`
Weighted Average Rate = (Total SI Ã— 100) Ã· (P Ã— Total T)
\`\`\`

**Example:** Total SI = â‚¹4600, P = â‚¹10,000, T = 5 years
- Average R = (4600 Ã— 100) Ã· (10000 Ã— 5) = 9.2%

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Single Rate Application**
âŒ Applying only one rate to entire period
- Calculate each segment separately

### **Mistake 2: Wrong Time Division**
âŒ Incorrect period segmentation
- Ensure time periods add up correctly

### **Mistake 3: Principal Changes**
âŒ Using same P for all periods
- Adjust principal if deposits/withdrawals occur

### **Mistake 4: Rate Unit Confusion**
âŒ Mixing monthly and yearly rates
- Convert to consistent units

---

## ðŸŽ¯ Practice Problems

### **Two Rate Periods:**
1. P = â‚¹8000, first 2 years 7%, next 3 years 9%. Total SI?
2. P = â‚¹12000, first 1 year 8%, next 2 years 10%. Total SI?

### **Three Rate Periods:**
1. P = â‚¹5000, Year 1: 6%, Year 2: 8%, Year 3: 10%. Total SI?
2. P = â‚¹15000, 6 months: 9%, 12 months: 11%, 6 months: 12%. Total SI?

### **Complex Scenarios:**
1. P = â‚¹10000, first 6 months 8%, next 12 months 9%, last 6 months 10%. Total SI?
2. Find weighted average rate for above scenario.

**Answers:**
Two rates: â‚¹1840, â‚¹3360
Three rates: â‚¹950, â‚¹2250
Complex: â‚¹1450, 9.67%

Master variable rate calculations for realistic financial scenarios! ðŸ†`
};

