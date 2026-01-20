import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_5: SubLesson = {
  id: "9.5",
  title: 'Amount under CI',
  status: 'completed',
  content: "`# ðŸ’µ Amount under Compound Interest

Learn about the final amount in compound interest transactions! Amount (A) in CI represents the total value after compounding - the principal plus all accumulated compound interest. This is the maturity value that investors receive or borrowers repay.

---

## ðŸŽ¯ Amount in Compound Interest

**Amount (A)** is the final sum received or paid at the end of the compound interest period. It includes the original principal plus all compound interest earned over time.

### **Basic Formula**
\`"\`\`
A = P + CI = P(1 + R/100)^T
\`\`\`

**Where:**
- **A** = Final amount
- **P** = Principal
- **CI** = Compound Interest
- **R** = Rate (%)
- **T** = Time (years)

---

## ðŸ“Š Step-by-Step Calculation

### **Example 1: Annual Compounding**
**Problem:** P = â‚¹10,000, R = 10%, T = 2 years. Find A.

**Step 1:** Apply formula
- A = 10,000 Ã— (1 + 10/100)^2
- A = 10,000 Ã— (1.10)^2
- A = 10,000 Ã— 1.21 = â‚¹12,100

### **Example 2: Half-Yearly Compounding**
**Problem:** P = â‚¹5,000, R = 8%, T = 2 years, half-yearly.

**Step 1:** Adjust for half-yearly
- Rate per half-year = 8%/2 = 4%
- Number of periods = 2 Ã— 2 = 4

**Step 2:** Apply formula
- A = 5,000 Ã— (1 + 4/100)^4
- A = 5,000 Ã— (1.04)^4
- A = 5,000 Ã— 1.16985856 â‰ˆ â‚¹5,849.29

---

## ðŸ”¢ Amount with Different Compounding

### **Annual Compounding**
\`\`\`
A = P(1 + R/100)^T
\`\`\`

### **Half-Yearly Compounding**
\`\`\`
A = P(1 + R/200)^(2T)
\`\`\`

### **Quarterly Compounding**
\`\`\`
A = P(1 + R/400)^(4T)
\`\`\`

### **Monthly Compounding**
\`\`\`
A = P(1 + R/1200)^(12T)
\`\`\`

---

## ðŸ’¡ Amount Growth Patterns

### **1. Exponential Growth**
- Amount grows exponentially with time
- Each period multiplies by growth factor

### **2. Rate Sensitivity**
- Higher rates create larger amounts
- Effect compounds over time

### **3. Time Value**
- Same investment grows more over longer periods
- Compounding amplifies time effect

---

## ðŸŽ¯ Applications

### **1. Investment Maturity**
- FD maturity amounts
- Mutual fund growth
- Retirement corpus

### **2. Loan Repayment**
- Total amount payable
- EMI calculations
- Outstanding balance

### **3. Savings Goals**
- Target amount calculations
- Future value projections
- Wealth accumulation

---

## ðŸ§® Amount Relationships

### **Finding Principal from Amount**
\`\`\`
P = A / (1 + R/100)^T
\`\`\`

**Example:** A = â‚¹12,100, R = 10%, T = 2 years
- P = 12,100 / (1.10)^2 = 12,100 / 1.21 â‰ˆ â‚¹10,000

### **Finding Rate from Amount**
\`\`\`
R = 100 Ã— [(A/P)^(1/T) - 1]
\`\`\`

### **Finding Time from Amount**
\`\`\`
T = log(A/P) / log(1 + R/100)
\`\`\`

---

## ðŸ“ˆ Amount vs Principal

| Aspect | Principal (P) | Amount (A) |
|--------|---------------|------------|
| Definition | Initial amount | Final value |
| Timing | Start | End |
| Relationship | A = P(1+r)^T | P = A/(1+r)^T |
| Growth | Base value | Includes growth |

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Confusing Amount with Principal**
âŒ "Amount is the interest earned"
- Amount = Principal + Interest

### **Mistake 2: Wrong Compounding**
âŒ "All compounding is annual"
- Must match specified frequency

### **Mistake 3: Rate Units**
âŒ "Rate is always annual"
- Adjust for compounding frequency

### **Mistake 4: Time Periods**
âŒ "Time is always in years"
- Match compounding period units

---

## ðŸŽ¯ Practice Problems

### **Basic Amount Calculations:**
1. P = â‚¹1500, R = 8%, T = 2 years. Find A.
2. P = â‚¹2000, R = 12%, T = 1.5 years. Find A.
3. P = â‚¹3000, R = 6%, T = 2 years, half-yearly. Find A.

### **Reverse Calculations:**
1. A = â‚¹1320, P = â‚¹1200, T = 2 years. Find R.
2. A = â‚¹2500, P = â‚¹2000, R = 10%. Find T.
3. A = â‚¹3150, R = 5%, T = 3 years. Find P.

**Answers:**
Basic: â‚¹1816.08, â‚¹2281.53, â‚¹3370.89
Reverse: 10%, 2.5 years, â‚¹3000

Master amount calculations in compound interest for complete financial understanding! ðŸ†`
};
