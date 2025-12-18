import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_13: SubLesson = {
  id: "9.13",
  title: 'Word Problems Based on Compound Interest',
  status: 'completed',
  content: `# 🧩 Word Problems Based on Compound Interest

Master solving complex compound interest word problems! These problems combine CI concepts with real-life scenarios involving investments, loans, population growth, and business situations. Learn problem-solving strategies for advanced aptitude exams.

---

## 🎯 Problem-Solving Strategy

### **Step-by-Step Approach**
1. **Identify CI scenario** - Investment, loan, growth, depreciation
2. **Extract variables** - P, R, T, A, compounding frequency
3. **Choose appropriate formula** - Based on compounding frequency
4. **Solve systematically** - Use calculator for complex calculations
5. **Verify reasonableness** - Check if answer makes sense

### **Key Keywords**
- **Compound interest**: Use CI formulas
- **Grows/appreciates**: Growth formula
- **Depreciates**: Depreciation formula
- **Population**: Growth calculations
- **Investment**: CI amount calculations

---

## 💰 Investment Problems

### **Problem 1: Investment Growth**
**Question:** ₹50,000 invested at 8% annual CI. Amount after 3 years?

**Solution:**
- A = 50000 × (1.08)^3
- A = 50000 × 1.259712 = ₹62,985.60

### **Problem 2: Multiple Investments**
**Question:** ₹30,000 at 10% and ₹40,000 at 12% for 2 years. Total amount?

**Solution:**
- A₁ = 30000 × (1.10)^2 = 30000 × 1.21 = ₹36,300
- A₂ = 40000 × (1.12)^2 = 40000 × 1.2544 = ₹50,176
- Total A = 36,300 + 50,176 = ₹86,476

### **Problem 3: Half-Yearly Investment**
**Question:** ₹25,000 at 12% half-yearly CI for 2 years. Amount?

**Solution:**
- A = 25000 × (1 + 12/200)^(2×2) = 25000 × (1.06)^4
- A = 25000 × 1.26247696 ≈ ₹31,561.92

---

## 🏦 Loan Problems

### **Problem 1: Loan Amount**
**Question:** Borrowed amount becomes ₹1,21,000 in 2 years at 10% annual CI. Find loan amount.

**Solution:**
- 121000 = P × (1.10)^2
- P = 121000 / 1.21 = ₹100,000

### **Problem 2: Different Rate Periods**
**Question:** Loan at 8% for first year, 10% for second year. Amount becomes ₹11,880. Find loan amount.

**Solution:**
- After Year 1: P × 1.08
- After Year 2: P × 1.08 × 1.10 = P × 1.188
- 1.188P = 11880
- P = 11880 / 1.188 ≈ ₹10,000

---

## 👥 Population Problems

### **Problem 1: Population Growth**
**Question:** Population 2,00,000 grows 5% annually. Population after 3 years?

**Solution:**
- A = 200000 × (1.05)^3
- A = 200000 × 1.157625 = 231,525

### **Problem 2: Population Decrease**
**Question:** Population 1,50,000 decreases 3% annually. Population after 2 years?

**Solution:**
- A = 150000 × (0.97)^2
- A = 150000 × 0.9409 = 141,135

---

## 🏢 Business Problems

### **Problem 1: Asset Appreciation**
**Question:** Machine worth ₹8,00,000 appreciates 12% annually. Value after 2 years?

**Solution:**
- A = 800000 × (1.12)^2
- A = 800000 × 1.2544 = ₹10,03,520

### **Problem 2: Asset Depreciation**
**Question:** Equipment ₹5,00,000 depreciates 10% annually. Value after 3 years?

**Solution:**
- A = 500000 × (0.90)^3
- A = 500000 × 0.729 = ₹3,64,500

---

## 💵 Banking Problems

### **Problem 1: Deposit Maturity**
**Question:** ₹1,00,000 at 7% annual CI. Amount after 3 years?

**Solution:**
- A = 100000 × (1.07)^3
- A = 100000 × 1.225043 = ₹1,22,504.30

### **Problem 2: Quarterly Interest**
**Question:** ₹50,000 at 8% quarterly CI for 2 years. Amount?

**Solution:**
- A = 50000 × (1 + 8/400)^(4×2) = 50000 × (1.02)^8
- A = 50000 × 1.171659 = ₹58,582.95

---

## 🏃 Rate Finding Problems

### **Problem 1: Finding Rate**
**Question:** ₹20,000 becomes ₹26,620 in 3 years. Find rate.

**Solution:**
- 26620 = 20000 × (1 + R/100)^3
- 1.331 = (1 + R/100)^3
- 1 + R/100 = 1.331^(1/3) ≈ 1.10
- R/100 = 0.10, R = 10%

### **Problem 2: Time Finding**
**Question:** ₹15,000 becomes ₹19,753.50 at 8% annual CI. Find time.

**Solution:**
- 19753.50 = 15000 × (1.08)^T
- 1.3169 = (1.08)^T
- Take log: log(1.3169) = T × log(1.08)
- T = log(1.3169) / log(1.08) ≈ 0.1196 / 0.0334 ≈ 3.58 years

---

## 🚨 Common Problem Traps

### **Trap 1: Wrong Compounding Frequency**
❌ "All CI is annual"
- Check for half-yearly, quarterly

### **Trap 2: Rate Confusion**
❌ "8% half-yearly = 16% annual"
- Half-yearly rate = annual rate ÷ 2

### **Trap 3: Time Period Errors**
❌ "2 years = 2 periods always"
- Depends on compounding frequency

### **Trap 4: Growth vs Depreciation**
❌ "Depreciation uses + rate"
- Depreciation uses - rate

---

## 🎯 Practice Word Problems

### **Investment Problems:**
1. ₹25000 at 9% annual CI for 3 years. Amount?
2. ₹40000 at 10% half-yearly for 2 years. Amount?

### **Loan Problems:**
1. Amount becomes ₹133100 in 3 years at 10% annual CI. Find loan amount.
2. Loan at 6% first year, 8% second year becomes ₹11248.64. Find loan amount.

### **Growth Problems:**
1. Population 300000 grows 4% annually. Size after 4 years?
2. Asset ₹600000 depreciates 8% annually. Value after 2 years?

### **Complex Problems:**
1. Investment grows from ₹30000 to ₹42130 in 2 years. Find rate.
2. Deposit becomes ₹52974 in 3 years at 8% annual CI. Find deposit amount.

**Answers:**
Investment: ₹32,092.13, ₹48,838.40
Loan: ₹100,000, ₹10,000
Growth: ~347,449, ₹4,49,280
Complex: 12%, ₹40,000

Master CI word problems for comprehensive aptitude solving! 🏆`
};