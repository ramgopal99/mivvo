import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_6: SubLesson = {
  id: "9.6",
  title: 'Annual Compounding',
  status: 'completed',
  content: `# 📅 Annual Compounding

Master annual compounding - the most common compounding frequency! Annual compounding applies interest once per year, making it simple to calculate while still providing compound growth. This is the standard for most basic CI problems.

---

## 🎯 What is Annual Compounding?

**Annual Compounding** means interest is calculated and added to the principal once per year. The interest for the next year is calculated on the new principal (original + accumulated interest).

### **Key Features**
- Interest applied once per year
- Simplest compounding frequency
- Effective rate equals nominal rate
- Standard for basic CI problems

---

## 📊 Annual Compounding Formulas

### **Amount Formula**
\`\`\`
A = P(1 + R/100)^T
\`\`\`

### **Compound Interest Formula**
\`\`\`
CI = P[(1 + R/100)^T - 1]
\`\`\`

**Where:**
- P = Principal
- R = Annual rate (%)
- T = Time in years

---

## 🔢 Step-by-Step Examples

### **Example 1: Basic Calculation**
**Problem:** ₹10,000 at 10% annual CI for 3 years.

**Year 1:** 10,000 × 1.10 = ₹11,000
**Year 2:** 11,000 × 1.10 = ₹12,100
**Year 3:** 12,100 × 1.10 = ₹13,310

**Using Formula:**
- A = 10,000 × (1.10)^3 = 10,000 × 1.331 = ₹13,310
- CI = 13,310 - 10,000 = ₹3,310

### **Example 2: Finding Time**
**Problem:** P = ₹5,000, R = 8%, A = ₹7,412.16. Find T.

**Solution:**
- 7,412.16 = 5,000 × (1.08)^T
- 1.482432 = (1.08)^T
- Take log: log(1.482432) = T × log(1.08)
- T = log(1.482432) / log(1.08) ≈ 0.1717 / 0.0334 ≈ 5.14 years

---

## 💡 Annual Compounding Properties

### **1. Linear Exponent**
- Power equals number of years
- Easy to calculate mentally for small numbers

### **2. Effective Rate**
- EAR = Nominal rate
- No compounding advantage

### **3. Simple Calculations**
- Most straightforward CI method
- Used in basic aptitude problems

---

## 🎯 Applications

### **1. Fixed Deposits**
- Bank FD maturity calculations
- Annual interest crediting

### **2. Investment Returns**
- Annual portfolio growth
- Long-term investment projections

### **3. Loan Interest**
- Annual loan interest calculations
- Simple loan schemes

---

## 🧮 Comparison with Other Frequencies

| Compounding | Formula | Effective Rate (10% nominal) |
|-------------|---------|------------------------------|
| Annual | P(1.10)^T | 10% |
| Semi-annual | P(1.05)^(2T) | 10.25% |
| Quarterly | P(1.025)^(4T) | 10.38% |
| Monthly | P(1.00833)^(12T) | 10.47% |

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Time Units**
❌ "T must be in years"
- Yes, for annual compounding

### **Mistake 2: Confusing with SI**
❌ "CI = SI for annual compounding"
- CI is higher than SI

### **Mistake 3: Rate Application**
❌ "Rate is per compounding period"
- For annual, rate is annual

---

## 🎯 Practice Problems

### **Basic Annual CI:**
1. P = ₹2000, R = 5%, T = 3 years. Find A and CI.
2. P = ₹1500, R = 8%, T = 2 years. Find A and CI.
3. P = ₹3000, R = 6%, T = 2 years. Find A and CI.

### **Reverse Calculations:**
1. A = ₹1320, P = ₹1200, T = 2 years. Find R.
2. A = ₹2500, P = ₹2000, R = 10%. Find T.
3. CI = ₹1310, P = ₹2000, R = 10%. Find T.

**Answers:**
Basic: A ₹2315.50, CI ₹315.50; A ₹1752, CI ₹252; A ₹3367.20, CI ₹367.20
Reverse: 10%, 2.5 years, 2 years

Master annual compounding for standard compound interest calculations! 🏆`
};