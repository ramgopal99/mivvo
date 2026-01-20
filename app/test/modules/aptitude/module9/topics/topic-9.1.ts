import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: "9.1",
  title: 'Principal (P)',
  status: 'completed',
  content: "`# ðŸ’° Principal (P) in Compound Interest

Welcome to compound interest fundamentals! Principal (P) is the foundation of compound interest calculations. Unlike simple interest where principal remains constant, in compound interest, the principal grows each compounding period. Master this key concept to understand CI mechanics.

---

## ðŸŽ¯ Principal in Compound Interest

**Principal (P)** is the initial amount of money that earns compound interest. In CI, the principal grows over time as interest is added to it periodically.

### **Key Points**
- Initial principal is the base amount
- Principal grows each compounding period
- Interest is calculated on the growing principal
- Creates exponential growth

### **Symbol**
\`"\`\`
P (Initial Principal Amount)
\`\`\`

---

## ðŸ“Š How Principal Changes in CI

### **Annual Compounding**
- **Year 1:** Principal becomes P(1 + R/100)
- **Year 2:** Principal becomes P(1 + R/100)Â²
- **Year 3:** Principal becomes P(1 + R/100)Â³

### **General Pattern**
\`\`\`
Principal after t periods = P Ã— (1 + r)^t
\`\`\`

**Where:**
- P = Initial principal
- r = Rate per compounding period
- t = Number of compounding periods

---

## ðŸ”¢ Principal vs Amount

### **Key Distinction**
- **Principal:** Initial investment/borrowing
- **Amount:** Principal + accumulated interest

### **Relationship**
\`\`\`
Amount = Principal + Compound Interest
Amount = Principal Ã— (1 + r)^t
\`\`\`

### **Finding Principal**
\`\`\`
P = Amount / (1 + r)^t
P = Amount Ã— (1 + r)^(-t)
\`\`\`

---

## ðŸ§® Principal in Different Scenarios

### **1. Investment Growth**
- Initial investment becomes principal
- Grows through compound interest
- Principal increases over time

### **2. Loan Amounts**
- Loan amount is the principal borrowed
- Interest compounds on outstanding principal
- Principal reduces with repayments

### **3. Deposit Accounts**
- Deposit amount is initial principal
- Compounds to create larger amounts
- Principal grows through reinvestment

---

## ðŸ’¡ Principal Importance in CI

### **1. Growth Engine**
- Larger principal = Larger growth
- Exponential effect of compounding

### **2. Time Value**
- Same principal grows more over longer periods
- Compounding frequency affects growth

### **3. Rate Impact**
- Higher rates accelerate principal growth
- Compounding amplifies rate effects

---

## ðŸ“ˆ Principal Growth Examples

### **Example 1: Annual Growth**
**Problem:** â‚¹10,000 at 10% annual CI. Principal after 2 years?

**Solution:**
- After Year 1: 10,000 Ã— 1.10 = â‚¹11,000 (new principal)
- After Year 2: 11,000 Ã— 1.10 = â‚¹12,100 (final amount)

### **Example 2: Half-Yearly Growth**
**Problem:** â‚¹5,000 at 8% half-yearly CI. Principal growth?

**Solution:**
- Rate per half-year: 8%/2 = 4%
- After 1st half: 5,000 Ã— 1.04 = â‚¹5,200
- After 2nd half: 5,200 Ã— 1.04 = â‚¹5,408

---

## ðŸŽ¯ Applications

### **1. Investment Planning**
- Initial corpus growth tracking
- Retirement fund accumulation
- Wealth building projections

### **2. Business Finance**
- Capital appreciation
- Loan amortization
- Asset value growth

### **3. Banking Products**
- FD maturity calculations
- Savings account growth
- Investment scheme projections

---

## ðŸ”„ Principal in CI vs SI

| Aspect | Simple Interest | Compound Interest |
|--------|----------------|-------------------|
| Principal | Remains constant | Grows each period |
| Growth | Linear | Exponential |
| Interest Base | Always original P | Growing principal |
| Total Return | Lower | Higher |

---

## ðŸ§® Principal Calculations

### **Finding Original Principal**
\`\`\`
P = A / (1 + r)^t
\`\`\`

**Example:** A = â‚¹12,100, r = 10%, t = 2 years
- P = 12,100 Ã· (1.10)Â² = 12,100 Ã· 1.21 = â‚¹10,000

### **Principal After n Periods**
\`\`\`
Principal_n = P Ã— (1 + r)^n
\`\`\`

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Confusing Principal with Amount**
âŒ "Principal is the final amount"
- Principal is initial, amount is final

### **Mistake 2: Ignoring Growth**
âŒ "Principal stays the same in CI"
- Principal grows in CI, stays constant in SI

### **Mistake 3: Wrong Compounding**
âŒ "Principal doubles every year"
- Depends on rate and compounding frequency

---

## ðŸŽ¯ Practice Questions

### **Basic Principal Concepts:**
1. What is principal in CI for â‚¹1000 investment?
2. How does principal change in CI vs SI?
3. Principal after 1 year at 10% CI on â‚¹2000?

### **Calculation Problems:**
1. Find original principal: A = â‚¹2662, R = 10%, T = 2 years.
2. Principal after 3 years: P = â‚¹5000, R = 8%, annual CI.
3. Principal growth: â‚¹10000 at 12% half-yearly for 1 year.

**Answers:**
Basic: â‚¹1000, Grows in CI, â‚¹2200
Calculations: â‚¹2000, â‚¹6298.56, â‚¹11236.16

Master principal concepts in compound interest for accurate growth calculations! ðŸ†`
};
