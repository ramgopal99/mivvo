import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_4: SubLesson = {
  id: "8.4",
  title: 'Simple Interest Formula',
  status: 'completed',
  content: `# 🧮 Simple Interest Formula

Master the fundamental simple interest formula! Simple Interest (SI) is calculated only on the principal amount throughout the loan/investment period. This formula is the cornerstone of all basic interest calculations and appears frequently in aptitude exams.

---

## 🎯 The Simple Interest Formula

### **Basic Formula**
\`\`\`
SI = (P × R × T) ÷ 100
\`\`\`

**Where:**
- **SI** = Simple Interest
- **P** = Principal amount
- **R** = Rate of interest (in %)
- **T** = Time period

### **Amount Formula**
\`\`\`
A = P + SI = P(1 + RT/100)
\`\`\`

---

## 📊 Step-by-Step Calculation

### **Example 1: Basic SI Calculation**
**Problem:** Find SI on ₹1000 at 10% for 2 years.

**Step 1:** Identify values
- P = ₹1000
- R = 10%
- T = 2 years

**Step 2:** Apply formula
- SI = (1000 × 10 × 2) ÷ 100
- SI = (20000) ÷ 100 = ₹200

**Step 3:** Find total amount
- A = 1000 + 200 = ₹1200

---

## 🔢 Examples with Variations

### **Example 1: Different Rates**
**Problem:** P = ₹5000, R = 8%, T = 1.5 years

**Solution:**
- SI = (5000 × 8 × 1.5) ÷ 100
- SI = (60000) ÷ 100 = ₹600
- A = 5000 + 600 = ₹5600

### **Example 2: Fractional Time**
**Problem:** P = ₹2000, R = 12%, T = 9 months

**Solution:**
- Convert time: 9 months = 9/12 = 0.75 years
- SI = (2000 × 12 × 0.75) ÷ 100
- SI = (18000) ÷ 100 = ₹180
- A = 2000 + 180 = ₹2180

### **Example 3: Decimal Rate**
**Problem:** P = ₹3000, R = 7.5%, T = 3 years

**Solution:**
- SI = (3000 × 7.5 × 3) ÷ 100
- SI = (67500) ÷ 100 = ₹675
- A = 3000 + 675 = ₹3675

---

## 💡 Properties of Simple Interest

### **1. Linear Growth**
- Interest increases linearly with time
- No interest on interest

### **2. Proportional to All Variables**
- SI ∝ P (higher principal = higher SI)
- SI ∝ R (higher rate = higher SI)
- SI ∝ T (longer time = higher SI)

### **3. Time Value**
- Same principal earns same interest per unit time
- Interest is additive over time

---

## 🧮 Alternative Forms

### **SI in Terms of Amount**
\`\`\`
SI = A - P
\`\`\`

### **SI as Percentage of Principal**
\`\`\`
SI % = (SI × 100) ÷ P
\`\`\`

### **Rate from SI**
\`\`\`
R = (SI × 100) ÷ (P × T)
\`\`\`

---

## 🎯 Applications

### **1. Banking Calculations**
- Fixed deposit interest
- Savings account interest
- Loan interest calculations

### **2. Investment Planning**
- Bond interest
- Certificate of deposit returns
- Treasury bill yields

### **3. Loan Calculations**
- Personal loan interest
- Education loan interest
- Vehicle loan interest

### **4. Business Finance**
- Working capital interest
- Trade credit interest
- Supplier payment delays

---

## 📈 SI vs Compound Interest

| Aspect | Simple Interest | Compound Interest |
|--------|----------------|-------------------|
| Formula | P×R×T/100 | P(1+R/100)^T - P |
| Interest on | Only principal | Principal + interest |
| Growth | Linear | Exponential |
| Use | Short-term loans | Long-term investments |
| Calculation | Simple | Complex |

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Order**
❌ "SI = P × T × R ÷ 100"
- Order doesn't matter: multiplication is commutative

### **Mistake 2: Unit Confusion**
❌ Mixing time units
- Ensure consistent units

### **Mistake 3: Rate as Decimal**
❌ Using R as decimal instead of %
- Rate is always in percentage

### **Mistake 4: Time Conversion**
❌ Forgetting to convert months/days to years
- Convert when rate is annual

---

## 🎯 Practice Problems

### **Basic SI Calculations:**
1. P = ₹2000, R = 5%, T = 3 years. Find SI.
2. P = ₹1500, R = 8%, T = 2 years. Find A.
3. P = ₹3000, R = 6%, T = 1.5 years. Find SI.

### **Application Problems:**
1. SI = ₹240, P = ₹1200, T = 2 years. Find R.
2. A = ₹1540, P = ₹1400, T = 1 year. Find R.
3. SI = ₹400, R = 10%, T = 2 years. Find P.

**Answers:**
Basic: ₹300, ₹1860, ₹270
Applications: 10%, 10%, ₹2000

Master the simple interest formula for all basic interest calculations! 🏆`
};
