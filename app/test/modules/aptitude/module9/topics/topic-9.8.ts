import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_8: SubLesson = {
  id: "9.8",
  title: 'Quarterly Compounding',
  status: 'completed',
  content: "`# ðŸ“… Quarterly Compounding

Master quarterly compounding - interest calculated four times per year! This frequency provides even higher effective returns than half-yearly compounding. Learn the calculations for quarterly interest applications.

---

## ðŸŽ¯ What is Quarterly Compounding?

**Quarterly Compounding** means interest is calculated and added to the principal four times per year (every 3 months). This creates the most frequent compounding among common options.

### **Key Features**
- Interest applied four times per year
- Highest effective annual rate among common frequencies
- Periodic rate = Annual rate Ã· 4
- Time measured in quarters

---

## ðŸ“Š Quarterly Compounding Formulas

### **Amount Formula**
\`"\`\`
A = P(1 + R/400)^(4T)
\`\`\`

### **Compound Interest Formula**
\`\`\`
CI = P[(1 + R/400)^(4T) - 1]
\`\`\`

**Where:**
- P = Principal
- R = Annual nominal rate (%)
- T = Time in years
- 4T = Number of quarterly periods

---

## ðŸ”¢ Step-by-Step Examples

### **Example 1: Basic Calculation**
**Problem:** â‚¹10,000 at 10% quarterly CI for 2 years.

**Step 1:** Calculate periodic rate
- Quarterly rate = 10% Ã· 4 = 2.5%

**Step 2:** Number of periods
- 2 years Ã— 4 = 8 quarterly periods

**Step 3:** Apply formula
- A = 10,000 Ã— (1 + 2.5/100)^8
- A = 10,000 Ã— (1.025)^8
- A = 10,000 Ã— 1.218402 = â‚¹12,184.02
- CI = 12,184.02 - 10,000 = â‚¹2,184.02

### **Example 2: Comparison with Annual**
**Problem:** Compare â‚¹10,000 at 10% for 2 years: annual vs quarterly.

**Annual:** A = 10,000 Ã— (1.10)^2 = â‚¹12,100
**Quarterly:** A = 10,000 Ã— (1.025)^8 = â‚¹12,184.02

**Difference:** â‚¹84.02 more with quarterly

---

## ðŸ’¡ Effective Annual Rate

### **For Quarterly Compounding**
\`\`\`
EAR = (1 + R/400)^4 - 1
\`\`\`

**Example:** 10% nominal quarterly
- EAR = (1 + 10/400)^4 - 1 = (1.025)^4 - 1 â‰ˆ 1.1038 - 1 = 10.38%

---

## ðŸŽ¯ Applications

### **1. Investment Products**
- Some mutual fund schemes
- Corporate fixed deposits
- High-yield savings accounts

### **2. Loan Products**
- Credit card interest
- Personal loan options
- Business loan schemes

### **3. Banking Services**
- Premium savings accounts
- Recurring deposit schemes
- Money market accounts

---

## ðŸ§® Frequency Comparison

| Compounding | Periods/Year | Periodic Rate | Effective Rate (10% nominal) |
|-------------|--------------|---------------|------------------------------|
| Annual | 1 | 10% | 10.00% |
| Semi-annual | 2 | 5% | 10.25% |
| Quarterly | 4 | 2.5% | 10.38% |
| Monthly | 12 | 0.833% | 10.47% |

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Periodic Rate**
âŒ "Quarterly rate = annual rate Ã· 2"
- Quarterly rate = annual rate Ã· 4

### **Mistake 2: Wrong Time Periods**
âŒ "T = 2 for 2 years"
- Number of periods = 4 Ã— T

### **Mistake 3: Confusing with Monthly**
âŒ "Quarterly = monthly"
- Quarterly = 4 periods/year, monthly = 12

---

## ðŸŽ¯ Practice Problems

### **Basic Quarterly CI:**
1. P = â‚¹2000, R = 8%, T = 2 years. Find A and CI.
2. P = â‚¹1500, R = 12%, T = 1.5 years. Find A and CI.
3. P = â‚¹5000, R = 6%, T = 3 years. Find A and CI.

### **Comparison Problems:**
1. Compare annual vs quarterly for â‚¹10000 at 12% for 2 years.
2. Find EAR for 10% quarterly compounding.

**Answers:**
Basic: A â‚¹2345.92, CI â‚¹345.92; A â‚¹1858.29, CI â‚¹358.29; A â‚¹5970.93, CI â‚¹970.93
Comparison: Annual â‚¹12,544, Quarterly â‚¹12,583.68; 10.38%

Master quarterly compounding for maximum compounding frequency benefits! ðŸ†`
};
