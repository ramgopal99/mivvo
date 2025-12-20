import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_5: SubLesson = {
  id: "8.5",
  title: 'Amount (A = P + SI)',
  status: 'completed',
  content: `# 💵 Amount (A = P + SI)

Learn about the total amount in simple interest transactions! Amount (A) is the final sum received or paid back, consisting of the original principal plus the interest earned or charged. It's the complete value at the end of the interest period.

---

## 🎯 What is Amount in SI?

**Amount (A)** is the total money received or paid at the end of the simple interest period. It includes both the principal and the interest accumulated over time.

### **Basic Formula**
\`\`\`
A = P + SI
\`\`\`

**Or combined:**
\`\`\`
A = P(1 + RT/100)
\`\`\`

**Where:**
- **A** = Total amount
- **P** = Principal
- **SI** = Simple interest
- **R** = Rate of interest (%)
- **T** = Time period

---

## 📊 Step-by-Step Calculation

### **Example 1: Maturity Amount**
**Problem:** P = ₹1000, R = 10%, T = 2 years. Find A.

**Step 1:** Calculate SI
- SI = (1000 × 10 × 2) ÷ 100 = ₹200

**Step 2:** Add to principal
- A = 1000 + 200 = ₹1200

**Step 3:** Using combined formula
- A = 1000 × (1 + 10×2/100) = 1000 × (1 + 0.2) = ₹1200

---

## 🔢 Examples of Amount Calculations

### **Example 1: Investment Maturity**
**Problem:** Investment of ₹5000 at 8% for 3 years.

**Solution:**
- SI = (5000 × 8 × 3) ÷ 100 = ₹1200
- A = 5000 + 1200 = ₹6200

### **Example 2: Loan Repayment**
**Problem:** Loan of ₹10000 at 12% for 2 years.

**Solution:**
- SI = (10000 × 12 × 2) ÷ 100 = ₹2400
- A = 10000 + 2400 = ₹12400

### **Example 3: With Fractions**
**Problem:** P = ₹2500, R = 6%, T = 2.5 years.

**Solution:**
- SI = (2500 × 6 × 2.5) ÷ 100 = ₹375
- A = 2500 + 375 = ₹2875

---

## 💡 Amount in Different Contexts

### **1. Investment Context**
- **Maturity Value**: Amount received on investment
- **Future Value**: Value at end of investment period
- Higher A means better returns

### **2. Loan Context**
- **Total Repayment**: Amount to be paid back
- **Outstanding Amount**: Remaining balance
- Lower A means better deal for borrower

### **3. Banking Context**
- **Deposit Maturity**: Amount in account after interest
- **Loan Closure**: Final payment amount

---

## 🧮 Amount Relationships

### **Finding Principal from Amount**
\`\`\`
P = A ÷ (1 + RT/100)
\`\`\`

**Example:** A = ₹1200, R = 10%, T = 2 years
- P = 1200 ÷ (1 + 20/100) = 1200 ÷ 1.2 = ₹1000

### **Finding Rate from Amount**
\`\`\`
R = [(A - P) × 100] ÷ (P × T)
\`\`\`

### **Finding Time from Amount**
\`\`\`
T = [(A - P) × 100] ÷ (P × R)
\`\`\`

---

## 🎯 Applications

### **1. Investment Planning**
- Calculating maturity amounts
- Comparing investment options
- Retirement planning

### **2. Loan Management**
- Total repayment calculations
- EMI planning
- Debt management

### **3. Savings Goals**
- Target amount calculations
- Savings plan evaluation
- Financial goal setting

---

## 📊 Amount vs Principal

| Aspect | Principal (P) | Amount (A) |
|--------|---------------|------------|
| Definition | Original amount | P + Interest |
| Timing | At start | At end |
| Purpose | Base for interest | Final value |
| Change | Remains constant | Increases over time |
| Formula | P | P(1 + RT/100) |

---

## 🚨 Common Mistakes

### **Mistake 1: Confusing Amount with Principal**
❌ "Amount is the principal"
- Amount includes both P and SI

### **Mistake 2: Wrong Addition**
❌ "A = P × SI"
- A = P + SI

### **Mistake 3: Time Inclusion**
❌ Forgetting time in formula
- T is essential for SI calculation

### **Mistake 4: Rate as Decimal**
❌ Using R as 0.10 instead of 10%
- Rate is always percentage

---

## 🎯 Practice Problems

### **Basic Amount Calculations:**
1. P = ₹1500, R = 8%, T = 2 years. Find A.
2. P = ₹2000, R = 12%, T = 1.5 years. Find A.
3. SI = ₹300, P = ₹1000. Find A.

### **Reverse Calculations:**
1. A = ₹1320, P = ₹1200, T = 2 years. Find R.
2. A = ₹2500, P = ₹2000, R = 10%. Find T.
3. A = ₹3150, R = 5%, T = 3 years. Find P.

**Answers:**
Basic: ₹1860, ₹2280, ₹1300
Reverse: 10%, 2.5 years, ₹3000

Master amount calculations for complete financial transaction understanding! 🏆`
};

