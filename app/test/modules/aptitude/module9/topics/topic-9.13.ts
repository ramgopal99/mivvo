import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_13: SubLesson = {
  id: "9.13",
  title: 'Word Problems Based on Compound Interest',
  status: 'completed',
  content: "`# ðŸ§© Word Problems Based on Compound Interest

Master solving complex compound interest word problems! These problems combine CI concepts with real-life scenarios involving investments, loans, population growth, and business situations. Learn problem-solving strategies for advanced aptitude exams.

---

## ðŸŽ¯ Problem-Solving Strategy

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

## ðŸ’° Investment Problems

### **Problem 1: Investment Growth**
**Question:** â‚¹50,000 invested at 8% annual CI. Amount after 3 years?

**Solution:**
- A = 50000 Ã— (1.08)^3
- A = 50000 Ã— 1.259712 = â‚¹62,985.60

### **Problem 2: Multiple Investments**
**Question:** â‚¹30,000 at 10% and â‚¹40,000 at 12% for 2 years. Total amount?

**Solution:**
- Aâ‚ = 30000 Ã— (1.10)^2 = 30000 Ã— 1.21 = â‚¹36,300
- Aâ‚‚ = 40000 Ã— (1.12)^2 = 40000 Ã— 1.2544 = â‚¹50,176
- Total A = 36,300 + 50,176 = â‚¹86,476

### **Problem 3: Half-Yearly Investment**
**Question:** â‚¹25,000 at 12% half-yearly CI for 2 years. Amount?

**Solution:**
- A = 25000 Ã— (1 + 12/200)^(2Ã—2) = 25000 Ã— (1.06)^4
- A = 25000 Ã— 1.26247696 â‰ˆ â‚¹31,561.92

---

## ðŸ¦ Loan Problems

### **Problem 1: Loan Amount**
**Question:** Borrowed amount becomes â‚¹1,21,000 in 2 years at 10% annual CI. Find loan amount.

**Solution:**
- 121000 = P Ã— (1.10)^2
- P = 121000 / 1.21 = â‚¹100,000

### **Problem 2: Different Rate Periods**
**Question:** Loan at 8% for first year, 10% for second year. Amount becomes â‚¹11,880. Find loan amount.

**Solution:**
- After Year 1: P Ã— 1.08
- After Year 2: P Ã— 1.08 Ã— 1.10 = P Ã— 1.188
- 1.188P = 11880
- P = 11880 / 1.188 â‰ˆ â‚¹10,000

---

## ðŸ‘¥ Population Problems

### **Problem 1: Population Growth**
**Question:** Population 2,00,000 grows 5% annually. Population after 3 years?

**Solution:**
- A = 200000 Ã— (1.05)^3
- A = 200000 Ã— 1.157625 = 231,525

### **Problem 2: Population Decrease**
**Question:** Population 1,50,000 decreases 3% annually. Population after 2 years?

**Solution:**
- A = 150000 Ã— (0.97)^2
- A = 150000 Ã— 0.9409 = 141,135

---

## ðŸ¢ Business Problems

### **Problem 1: Asset Appreciation**
**Question:** Machine worth â‚¹8,00,000 appreciates 12% annually. Value after 2 years?

**Solution:**
- A = 800000 Ã— (1.12)^2
- A = 800000 Ã— 1.2544 = â‚¹10,03,520

### **Problem 2: Asset Depreciation**
**Question:** Equipment â‚¹5,00,000 depreciates 10% annually. Value after 3 years?

**Solution:**
- A = 500000 Ã— (0.90)^3
- A = 500000 Ã— 0.729 = â‚¹3,64,500

---

## ðŸ’µ Banking Problems

### **Problem 1: Deposit Maturity**
**Question:** â‚¹1,00,000 at 7% annual CI. Amount after 3 years?

**Solution:**
- A = 100000 Ã— (1.07)^3
- A = 100000 Ã— 1.225043 = â‚¹1,22,504.30

### **Problem 2: Quarterly Interest**
**Question:** â‚¹50,000 at 8% quarterly CI for 2 years. Amount?

**Solution:**
- A = 50000 Ã— (1 + 8/400)^(4Ã—2) = 50000 Ã— (1.02)^8
- A = 50000 Ã— 1.171659 = â‚¹58,582.95

---

## ðŸƒ Rate Finding Problems

### **Problem 1: Finding Rate**
**Question:** â‚¹20,000 becomes â‚¹26,620 in 3 years. Find rate.

**Solution:**
- 26620 = 20000 Ã— (1 + R/100)^3
- 1.331 = (1 + R/100)^3
- 1 + R/100 = 1.331^(1/3) â‰ˆ 1.10
- R/100 = 0.10, R = 10%

### **Problem 2: Time Finding**
**Question:** â‚¹15,000 becomes â‚¹19,753.50 at 8% annual CI. Find time.

**Solution:**
- 19753.50 = 15000 Ã— (1.08)^T
- 1.3169 = (1.08)^T
- Take log: log(1.3169) = T Ã— log(1.08)
- T = log(1.3169) / log(1.08) â‰ˆ 0.1196 / 0.0334 â‰ˆ 3.58 years

---

## ðŸš¨ Common Problem Traps

### **Trap 1: Wrong Compounding Frequency**
âŒ "All CI is annual"
- Check for half-yearly, quarterly

### **Trap 2: Rate Confusion**
âŒ "8% half-yearly = 16% annual"
- Half-yearly rate = annual rate Ã· 2

### **Trap 3: Time Period Errors**
âŒ "2 years = 2 periods always"
- Depends on compounding frequency

### **Trap 4: Growth vs Depreciation**
âŒ "Depreciation uses + rate"
- Depreciation uses - rate

---

## ðŸŽ¯ Practice Word Problems

### **Investment Problems:**
1. â‚¹25000 at 9% annual CI for 3 years. Amount?
2. â‚¹40000 at 10% half-yearly for 2 years. Amount?

### **Loan Problems:**
1. Amount becomes â‚¹133100 in 3 years at 10% annual CI. Find loan amount.
2. Loan at 6% first year, 8% second year becomes â‚¹11248.64. Find loan amount.

### **Growth Problems:**
1. Population 300000 grows 4% annually. Size after 4 years?
2. Asset â‚¹600000 depreciates 8% annually. Value after 2 years?

### **Complex Problems:**
1. Investment grows from â‚¹30000 to â‚¹42130 in 2 years. Find rate.
2. Deposit becomes â‚¹52974 in 3 years at 8% annual CI. Find deposit amount.

**Answers:**
Investment: â‚¹32,092.13, â‚¹48,838.40
Loan: â‚¹100,000, â‚¹10,000
Growth: ~347,449, â‚¹4,49,280
Complex: 12%, â‚¹40,000

Master CI word problems for comprehensive aptitude solving! ðŸ†`"
};

