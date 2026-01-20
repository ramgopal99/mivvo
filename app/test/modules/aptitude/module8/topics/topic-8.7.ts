import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_7: SubLesson = {
  id: "8.7",
  title: 'SI on Monthly / Yearly Basis',
  status: 'completed',
  content: "`# ðŸ“… SI on Monthly / Yearly Basis

Learn to handle simple interest calculations with different time bases! Interest rates can be quoted monthly or yearly, and time periods may be in months or years. Mastering these conversions is crucial for accurate interest calculations in banking and finance.

---

## ðŸŽ¯ Monthly vs Yearly Rates

### **Key Concepts**
- **Monthly Rate**: Interest per month
- **Yearly Rate**: Interest per year
- **Time Conversion**: Match rate and time units

### **Important Relationship**
\`"\`\`
Yearly Rate = Monthly Rate Ã— 12
Monthly Rate = Yearly Rate Ã· 12
\`\`\`

---

## ðŸ“Š Rate Conversion Examples

### **Example 1: Yearly to Monthly**
**Problem:** Convert 12% yearly rate to monthly rate.

**Solution:**
- Monthly Rate = 12% Ã· 12 = 1% per month

### **Example 2: Monthly to Yearly**
**Problem:** Convert 0.8% monthly rate to yearly rate.

**Solution:**
- Yearly Rate = 0.8% Ã— 12 = 9.6% per year

---

## ðŸ”¢ SI Calculations with Different Bases

### **Case 1: Yearly Rate, Yearly Time**
\`\`\`
SI = (P Ã— R_yearly Ã— T_years) Ã· 100
\`\`\`

**Example:** P = â‚¹1000, R = 10% yearly, T = 2 years
- SI = (1000 Ã— 10 Ã— 2) Ã· 100 = â‚¹200

### **Case 2: Yearly Rate, Monthly Time**
\`\`\`
SI = (P Ã— R_yearly Ã— T_months) Ã· (100 Ã— 12)
\`\`\`

**Example:** P = â‚¹1000, R = 10% yearly, T = 6 months
- SI = (1000 Ã— 10 Ã— 6) Ã· (100 Ã— 12) = 60000 Ã· 1200 = â‚¹50

### **Case 3: Monthly Rate, Monthly Time**
\`\`\`
SI = (P Ã— R_monthly Ã— T_months) Ã· 100
\`\`\`

**Example:** P = â‚¹1000, R = 1% monthly, T = 6 months
- SI = (1000 Ã— 1 Ã— 6) Ã· 100 = â‚¹60

### **Case 4: Monthly Rate, Yearly Time**
\`\`\`
SI = (P Ã— R_monthly Ã— T_years Ã— 12) Ã· 100
\`\`\`

**Example:** P = â‚¹1000, R = 1% monthly, T = 1 year
- SI = (1000 Ã— 1 Ã— 1 Ã— 12) Ã· 100 = â‚¹120

---

## ðŸ’¡ Practical Applications

### **1. Loan Calculations**
- Home loans: Monthly EMI calculations
- Personal loans: Monthly interest rates
- Credit cards: Daily/monthly charges

### **2. Investment Planning**
- SIP calculations: Monthly investments
- FD returns: Monthly interest options
- Mutual funds: Monthly dividend payouts

### **3. Banking Operations**
- Savings accounts: Monthly interest
- Current accounts: Monthly charges
- Term deposits: Monthly interest payout

---

## ðŸŽ¯ Common Scenarios

### **Scenario 1: Bank Loans**
- Rate: 12% per annum
- Time: 24 months
- SI = (P Ã— 12 Ã— 24) Ã· (100 Ã— 12) = (P Ã— 12 Ã— 2) Ã· 100 = (24P) Ã· 100 = 0.24P

### **Scenario 2: Monthly Deposits**
- Rate: 6% per annum
- Monthly deposit: â‚¹1000
- Monthly rate: 6% Ã· 12 = 0.5%
- Monthly interest: (1000 Ã— 0.5 Ã— 1) Ã· 100 = â‚¹5

### **Scenario 3: Credit Card Interest**
- Rate: 24% per annum (2% per month)
- Outstanding balance: â‚¹5000
- Monthly interest: (5000 Ã— 2 Ã— 1) Ã· 100 = â‚¹100

---

## ðŸ§® Time Conversion Table

| Time Unit | To Years | To Months | To Days |
|-----------|----------|-----------|---------|
| 1 Year | 1 | 12 | 365/366 |
| 1 Month | 1/12 â‰ˆ 0.0833 | 1 | 30.4167 |
| 1 Day | 1/365 â‰ˆ 0.00274 | 1/30.4167 | 1 |
| 1 Quarter | 0.25 | 3 | 91.25 |

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Rate Conversion**
âŒ "12% yearly = 12% monthly"
- Monthly rate = yearly rate Ã· 12

### **Mistake 2: Time Unit Confusion**
âŒ Using years with monthly rate
- Match units: monthly rate with months

### **Mistake 3: Double Conversion**
âŒ Converting rate and then time again
- Convert only rate or only time

### **Mistake 4: Ignoring Leap Years**
âŒ Always 365 days
- Use 366 for leap years in precise calculations

---

## ðŸŽ¯ Practice Problems

### **Rate Conversions:**
1. Convert 15% yearly to monthly.
2. Convert 0.75% monthly to yearly.
3. Convert 18% yearly to monthly.

### **SI Calculations:**
1. P = â‚¹2000, R = 12% yearly, T = 9 months. Find SI.
2. P = â‚¹1500, R = 1% monthly, T = 8 months. Find SI.
3. P = â‚¹5000, R = 10% yearly, T = 18 months. Find SI.

**Answers:**
Rate: 1.25%, 9%, 1.5%
SI: â‚¹180, â‚¹120, â‚¹750

Master monthly/yearly interest calculations for real banking scenarios! ðŸ†`
};

