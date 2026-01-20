import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_7: SubLesson = {
  id: "9.7",
  title: 'Half-Yearly Compounding',
  status: 'completed',
  content: "`# ðŸ“… Half-Yearly Compounding

Learn half-yearly compounding - where interest is calculated twice per year! This compounding frequency provides higher effective returns than annual compounding. Master the calculations for semi-annual interest applications.

---

## ðŸŽ¯ What is Half-Yearly Compounding?

**Half-Yearly Compounding** means interest is calculated and added to the principal twice per year (every 6 months). This creates more frequent compounding, leading to higher effective returns.

### **Key Features**
- Interest applied twice per year
- Higher effective annual rate
- Periodic rate = Annual rate Ã· 2
- Time measured in half-years

---

## ðŸ“Š Half-Yearly Compounding Formulas

### **Amount Formula**
\`"\`\`
A = P(1 + R/200)^(2T)
\`\`\`

### **Compound Interest Formula**
\`\`\`
CI = P[(1 + R/200)^(2T) - 1]
\`\`\`

**Where:**
- P = Principal
- R = Annual nominal rate (%)
- T = Time in years
- 2T = Number of half-yearly periods

---

## ðŸ”¢ Step-by-Step Examples

### **Example 1: Basic Calculation**
**Problem:** â‚¹10,000 at 10% half-yearly CI for 2 years.

**Step 1:** Calculate periodic rate
- Half-yearly rate = 10% Ã· 2 = 5%

**Step 2:** Number of periods
- 2 years Ã— 2 = 4 half-yearly periods

**Step 3:** Apply formula
- A = 10,000 Ã— (1 + 5/100)^4
- A = 10,000 Ã— (1.05)^4
- A = 10,000 Ã— 1.21550625 = â‚¹12,155.06
- CI = 12,155.06 - 10,000 = â‚¹2,155.06

### **Example 2: Comparison with Annual**
**Problem:** Compare â‚¹10,000 at 10% for 2 years: annual vs half-yearly.

**Annual:** A = 10,000 Ã— (1.10)^2 = â‚¹12,100
**Half-yearly:** A = 10,000 Ã— (1.05)^4 = â‚¹12,155.06

**Difference:** â‚¹55.06 more with half-yearly

---

## ðŸ’¡ Effective Annual Rate

### **For Half-Yearly Compounding**
\`\`\`
EAR = (1 + R/200)^2 - 1
\`\`\`

**Example:** 10% nominal half-yearly
- EAR = (1 + 10/200)^2 - 1 = (1.05)^2 - 1 = 1.1025 - 1 = 10.25%

---

## ðŸŽ¯ Applications

### **1. Investment Schemes**
- Some mutual funds
- Corporate deposits
- Government savings schemes

### **2. Loan Products**
- Home loan options
- Business loan terms
- Education loan schemes

### **3. Banking Products**
- Certain FD schemes
- Recurring deposits
- Senior citizen savings

---

## ðŸ§® Half-Yearly vs Annual

| Aspect | Annual | Half-Yearly |
|--------|--------|-------------|
| Periods per year | 1 | 2 |
| Periodic rate | R | R/2 |
| Effective rate | R% | (1 + R/200)^2 - 1 |
| Example 10% | 10% | 10.25% |
| Formula | P(1+R/100)^T | P(1+R/200)^(2T) |

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Periodic Rate**
âŒ "Half-yearly rate = annual rate"
- Half-yearly rate = annual rate Ã· 2

### **Mistake 2: Wrong Time Periods**
âŒ "T = 2 for 2 years"
- Number of periods = 2 Ã— T

### **Mistake 3: Confusing with Quarterly**
âŒ "Half-yearly = quarterly"
- Half-yearly = 2 periods/year, quarterly = 4

---

## ðŸŽ¯ Practice Problems

### **Basic Half-Yearly CI:**
1. P = â‚¹2000, R = 8%, T = 2 years. Find A and CI.
2. P = â‚¹1500, R = 10%, T = 1.5 years. Find A and CI.
3. P = â‚¹5000, R = 6%, T = 3 years. Find A and CI.

### **Comparison Problems:**
1. Compare annual vs half-yearly for â‚¹10000 at 12% for 2 years.
2. Find EAR for 10% half-yearly compounding.

**Answers:**
Basic: A â‚¹2324.64, CI â‚¹324.64; A â‚¹1722.19, CI â‚¹222.19; A â‚¹5977.15, CI â‚¹977.15
Comparison: Annual â‚¹12,544, Half-yearly â‚¹12,583.68; 10.25%

Master half-yearly compounding for higher frequency interest calculations! ðŸ†`
};
