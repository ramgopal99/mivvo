import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_7: SubLesson = {
  id: "9.7",
  title: 'Half-Yearly Compounding',
  status: 'completed',
  content: `# 📅 Half-Yearly Compounding

Learn half-yearly compounding - where interest is calculated twice per year! This compounding frequency provides higher effective returns than annual compounding. Master the calculations for semi-annual interest applications.

---

## 🎯 What is Half-Yearly Compounding?

**Half-Yearly Compounding** means interest is calculated and added to the principal twice per year (every 6 months). This creates more frequent compounding, leading to higher effective returns.

### **Key Features**
- Interest applied twice per year
- Higher effective annual rate
- Periodic rate = Annual rate ÷ 2
- Time measured in half-years

---

## 📊 Half-Yearly Compounding Formulas

### **Amount Formula**
\`\`\`
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

## 🔢 Step-by-Step Examples

### **Example 1: Basic Calculation**
**Problem:** ₹10,000 at 10% half-yearly CI for 2 years.

**Step 1:** Calculate periodic rate
- Half-yearly rate = 10% ÷ 2 = 5%

**Step 2:** Number of periods
- 2 years × 2 = 4 half-yearly periods

**Step 3:** Apply formula
- A = 10,000 × (1 + 5/100)^4
- A = 10,000 × (1.05)^4
- A = 10,000 × 1.21550625 = ₹12,155.06
- CI = 12,155.06 - 10,000 = ₹2,155.06

### **Example 2: Comparison with Annual**
**Problem:** Compare ₹10,000 at 10% for 2 years: annual vs half-yearly.

**Annual:** A = 10,000 × (1.10)^2 = ₹12,100
**Half-yearly:** A = 10,000 × (1.05)^4 = ₹12,155.06

**Difference:** ₹55.06 more with half-yearly

---

## 💡 Effective Annual Rate

### **For Half-Yearly Compounding**
\`\`\`
EAR = (1 + R/200)^2 - 1
\`\`\`

**Example:** 10% nominal half-yearly
- EAR = (1 + 10/200)^2 - 1 = (1.05)^2 - 1 = 1.1025 - 1 = 10.25%

---

## 🎯 Applications

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

## 🧮 Half-Yearly vs Annual

| Aspect | Annual | Half-Yearly |
|--------|--------|-------------|
| Periods per year | 1 | 2 |
| Periodic rate | R | R/2 |
| Effective rate | R% | (1 + R/200)^2 - 1 |
| Example 10% | 10% | 10.25% |
| Formula | P(1+R/100)^T | P(1+R/200)^(2T) |

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Periodic Rate**
❌ "Half-yearly rate = annual rate"
- Half-yearly rate = annual rate ÷ 2

### **Mistake 2: Wrong Time Periods**
❌ "T = 2 for 2 years"
- Number of periods = 2 × T

### **Mistake 3: Confusing with Quarterly**
❌ "Half-yearly = quarterly"
- Half-yearly = 2 periods/year, quarterly = 4

---

## 🎯 Practice Problems

### **Basic Half-Yearly CI:**
1. P = ₹2000, R = 8%, T = 2 years. Find A and CI.
2. P = ₹1500, R = 10%, T = 1.5 years. Find A and CI.
3. P = ₹5000, R = 6%, T = 3 years. Find A and CI.

### **Comparison Problems:**
1. Compare annual vs half-yearly for ₹10000 at 12% for 2 years.
2. Find EAR for 10% half-yearly compounding.

**Answers:**
Basic: A ₹2324.64, CI ₹324.64; A ₹1722.19, CI ₹222.19; A ₹5977.15, CI ₹977.15
Comparison: Annual ₹12,544, Half-yearly ₹12,583.68; 10.25%

Master half-yearly compounding for higher frequency interest calculations! 🏆`
};