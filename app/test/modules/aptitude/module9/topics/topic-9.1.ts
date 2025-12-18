import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: "9.1",
  title: 'Principal (P)',
  status: 'completed',
  content: `# 💰 Principal (P) in Compound Interest

Welcome to compound interest fundamentals! Principal (P) is the foundation of compound interest calculations. Unlike simple interest where principal remains constant, in compound interest, the principal grows each compounding period. Master this key concept to understand CI mechanics.

---

## 🎯 Principal in Compound Interest

**Principal (P)** is the initial amount of money that earns compound interest. In CI, the principal grows over time as interest is added to it periodically.

### **Key Points**
- Initial principal is the base amount
- Principal grows each compounding period
- Interest is calculated on the growing principal
- Creates exponential growth

### **Symbol**
\`\`\`
P (Initial Principal Amount)
\`\`\`

---

## 📊 How Principal Changes in CI

### **Annual Compounding**
- **Year 1:** Principal becomes P(1 + R/100)
- **Year 2:** Principal becomes P(1 + R/100)²
- **Year 3:** Principal becomes P(1 + R/100)³

### **General Pattern**
\`\`\`
Principal after t periods = P × (1 + r)^t
\`\`\`

**Where:**
- P = Initial principal
- r = Rate per compounding period
- t = Number of compounding periods

---

## 🔢 Principal vs Amount

### **Key Distinction**
- **Principal:** Initial investment/borrowing
- **Amount:** Principal + accumulated interest

### **Relationship**
\`\`\`
Amount = Principal + Compound Interest
Amount = Principal × (1 + r)^t
\`\`\`

### **Finding Principal**
\`\`\`
P = Amount / (1 + r)^t
P = Amount × (1 + r)^(-t)
\`\`\`

---

## 🧮 Principal in Different Scenarios

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

## 💡 Principal Importance in CI

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

## 📈 Principal Growth Examples

### **Example 1: Annual Growth**
**Problem:** ₹10,000 at 10% annual CI. Principal after 2 years?

**Solution:**
- After Year 1: 10,000 × 1.10 = ₹11,000 (new principal)
- After Year 2: 11,000 × 1.10 = ₹12,100 (final amount)

### **Example 2: Half-Yearly Growth**
**Problem:** ₹5,000 at 8% half-yearly CI. Principal growth?

**Solution:**
- Rate per half-year: 8%/2 = 4%
- After 1st half: 5,000 × 1.04 = ₹5,200
- After 2nd half: 5,200 × 1.04 = ₹5,408

---

## 🎯 Applications

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

## 🔄 Principal in CI vs SI

| Aspect | Simple Interest | Compound Interest |
|--------|----------------|-------------------|
| Principal | Remains constant | Grows each period |
| Growth | Linear | Exponential |
| Interest Base | Always original P | Growing principal |
| Total Return | Lower | Higher |

---

## 🧮 Principal Calculations

### **Finding Original Principal**
\`\`\`
P = A / (1 + r)^t
\`\`\`

**Example:** A = ₹12,100, r = 10%, t = 2 years
- P = 12,100 ÷ (1.10)² = 12,100 ÷ 1.21 = ₹10,000

### **Principal After n Periods**
\`\`\`
Principal_n = P × (1 + r)^n
\`\`\`

---

## 🚨 Common Mistakes

### **Mistake 1: Confusing Principal with Amount**
❌ "Principal is the final amount"
- Principal is initial, amount is final

### **Mistake 2: Ignoring Growth**
❌ "Principal stays the same in CI"
- Principal grows in CI, stays constant in SI

### **Mistake 3: Wrong Compounding**
❌ "Principal doubles every year"
- Depends on rate and compounding frequency

---

## 🎯 Practice Questions

### **Basic Principal Concepts:**
1. What is principal in CI for ₹1000 investment?
2. How does principal change in CI vs SI?
3. Principal after 1 year at 10% CI on ₹2000?

### **Calculation Problems:**
1. Find original principal: A = ₹2662, R = 10%, T = 2 years.
2. Principal after 3 years: P = ₹5000, R = 8%, annual CI.
3. Principal growth: ₹10000 at 12% half-yearly for 1 year.

**Answers:**
Basic: ₹1000, Grows in CI, ₹2200
Calculations: ₹2000, ₹6298.56, ₹11236.16

Master principal concepts in compound interest for accurate growth calculations! 🏆`
};