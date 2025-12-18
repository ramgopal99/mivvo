import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_4: SubLesson = {
  id: "9.4",
  title: 'Compound Interest Formula',
  status: 'completed',
  content: `# 🧮 Compound Interest Formula

Master the compound interest formula! Compound Interest (CI) calculates interest on both principal and accumulated interest, creating exponential growth. This formula is fundamental for understanding investments, loans, and wealth building through compounding.

---

## 🎯 The Compound Interest Formula

### **Basic Annual CI Formula**
\`\`\`
CI = P(1 + R/100)^T - P
\`\`\`

### **Amount Formula**
\`\`\`
A = P(1 + R/100)^T
\`\`\`

**Where:**
- **CI** = Compound Interest
- **A** = Amount (Principal + CI)
- **P** = Principal
- **R** = Rate of interest (%)
- **T** = Time in years

---

## 📊 Step-by-Step Calculation

### **Example 1: Annual Compounding**
**Problem:** Find CI on ₹10,000 at 10% for 2 years.

**Step 1:** Apply amount formula
- A = 10,000 × (1 + 10/100)^2
- A = 10,000 × (1.10)^2
- A = 10,000 × 1.21 = ₹12,100

**Step 2:** Calculate CI
- CI = A - P = 12,100 - 10,000 = ₹2,100

**Step 3:** Verify with CI formula
- CI = 10,000 × (1.10)^2 - 10,000 = 12,100 - 10,000 = ₹2,100

---

## 🔢 Examples with Variations

### **Example 1: Different Rates**
**Problem:** P = ₹5,000, R = 8%, T = 3 years.

**Solution:**
- A = 5,000 × (1 + 8/100)^3
- A = 5,000 × (1.08)^3
- A = 5,000 × 1.259712 = ₹6,298.56
- CI = 6,298.56 - 5,000 = ₹1,298.56

### **Example 2: Fractional Time**
**Problem:** P = ₹8,000, R = 12%, T = 2.5 years.

**Solution:**
- A = 8,000 × (1.12)^2.5
- First calculate (1.12)^2 = 1.2544
- (1.12)^2.5 = 1.2544 × √1.12 ≈ 1.2544 × 1.0583 ≈ 1.327
- A = 8,000 × 1.327 ≈ ₹10,616
- CI ≈ ₹2,616

---

## 💡 Properties of CI Formula

### **1. Exponential Growth**
- Amount grows exponentially with time
- Each year multiplies by (1 + r)

### **2. Compounding Effect**
- Interest earned on previous interest
- Creates wealth through reinvestment

### **3. Time Value**
- Same principal grows faster over longer periods
- Rate amplifies time effect

---

## 🧮 General CI Formula

### **For n Compounding Periods per Year**
\`\`\`
A = P(1 + R/(100×n))^(n×T)
CI = A - P
\`\`\`

**Where:**
- n = Compounding frequency per year
- R = Nominal annual rate

### **Examples**
- **Annual:** n = 1, A = P(1 + R/100)^T
- **Half-yearly:** n = 2, A = P(1 + R/200)^(2T)
- **Quarterly:** n = 4, A = P(1 + R/400)^(4T)
- **Monthly:** n = 12, A = P(1 + R/1200)^(12T)

---

## 🎯 Applications

### **1. Investment Growth**
- Mutual fund returns
- Stock portfolio growth
- Retirement savings accumulation

### **2. Loan Calculations**
- Home loan interest
- Education loan interest
- Business loan interest

### **3. Banking Products**
- Fixed deposit maturity
- Recurring deposit growth
- Savings account interest

### **4. Business Finance**
- Asset appreciation
- Depreciation calculations
- Investment returns

---

## 📈 CI vs SI Comparison

| Aspect | Simple Interest | Compound Interest |
|--------|----------------|-------------------|
| Formula | SI = P×R×T/100 | CI = P(1+R/100)^T - P |
| Growth | Linear | Exponential |
| Interest on | Only principal | Principal + interest |
| Returns | Lower | Higher |
| Best for | Short-term | Long-term |

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Exponent**
❌ "A = P × (1 + R/100) × T"
- Should be power, not multiplication

### **Mistake 2: Rate as Decimal**
❌ Using R as 0.10 instead of 10%
- Rate is percentage

### **Mistake 3: Time Units**
❌ Mixing time units
- Time must be in years for annual compounding

### **Mistake 4: Negative Exponents**
❌ For finding P: A × (1 + r)^(-T)
- Correct, but ensure proper calculation

---

## 🎯 Practice Problems

### **Basic CI Calculations:**
1. P = ₹2000, R = 5%, T = 3 years. Find CI and A.
2. P = ₹1500, R = 8%, T = 2 years. Find CI and A.
3. P = ₹3000, R = 6%, T = 1.5 years. Find CI and A.

### **Application Problems:**
1. CI = ₹240, P = ₹1200, T = 2 years. Find R.
2. A = ₹1540, P = ₹1400, T = 1 year. Find R.
3. CI = ₹400, R = 10%, T = 2 years. Find P.

**Answers:**
Basic: CI ₹315.50, A ₹2315.50; CI ₹252, A ₹1752; CI ₹296.01, A ₹3296.01
Applications: 10%, 10%, ₹2000

Master the compound interest formula for exponential growth calculations! 🏆`
};