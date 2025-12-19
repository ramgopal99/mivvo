import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: "8.6",
  title: 'Finding P, R, or T',
  status: 'completed',
  content: `# 🔍 Finding P, R, or T

Master reverse calculations in simple interest! When one variable is unknown, you can find it using the other known values. These formulas are essential for solving problems where you need to determine the missing parameter.

---

## 🎯 The SI Formula Rearrangements

**Basic SI Formula:**
\`\`\`
SI = (P × R × T) ÷ 100
\`\`\`

**We can solve for each variable:**

### **1. Finding Principal (P)**
\`\`\`
P = (SI × 100) ÷ (R × T)
\`\`\`

**Example:** SI = ₹500, R = 10%, T = 2 years
- P = (500 × 100) ÷ (10 × 2) = ₹2500

### **2. Finding Rate (R)**
\`\`\`
R = (SI × 100) ÷ (P × T)
\`\`\`

**Example:** SI = ₹300, P = ₹2000, T = 3 years
- R = (300 × 100) ÷ (2000 × 3) = 5%

### **3. Finding Time (T)**
\`\`\`
T = (SI × 100) ÷ (P × R)
\`\`\`

**Example:** SI = ₹400, P = ₹2000, R = 10%
- T = (400 × 100) ÷ (2000 × 10) = 2 years

---

## 📊 Finding Variables from Amount

### **Finding P from A**
\`\`\`
P = A ÷ (1 + RT/100)
\`\`\`

**Example:** A = ₹1200, R = 10%, T = 2 years
- P = 1200 ÷ (1 + 20/100) = 1200 ÷ 1.2 = ₹1000

### **Finding R from A**
\`\`\`
R = [(A - P) × 100] ÷ (P × T)
\`\`\`

**Example:** A = ₹1100, P = ₹1000, T = 2 years
- R = (100 × 100) ÷ (1000 × 2) = 10%

### **Finding T from A**
\`\`\`
T = [(A - P) × 100] ÷ (P × R)
\`\`\`

**Example:** A = ₹1200, P = ₹1000, R = 10%
- T = (200 × 100) ÷ (1000 × 10) = 2 years

---

## 🔢 Detailed Examples

### **Example 1: Finding Missing Principal**
**Problem:** SI = ₹240, R = 12%, T = 1.5 years. Find P.

**Solution:**
- P = (240 × 100) ÷ (12 × 1.5)
- P = 24000 ÷ 18 = ₹1333.33

### **Example 2: Finding Missing Rate**
**Problem:** P = ₹5000, SI = ₹750, T = 2 years. Find R.

**Solution:**
- R = (750 × 100) ÷ (5000 × 2)
- R = 75000 ÷ 10000 = 7.5%

### **Example 3: Finding Missing Time**
**Problem:** P = ₹3000, R = 8%, SI = ₹480. Find T.

**Solution:**
- T = (480 × 100) ÷ (3000 × 8)
- T = 48000 ÷ 24000 = 2 years

---

## 💡 Quick Tricks

### **Trick 1: When Two Values Known**
\`\`\`
Use the appropriate rearranged formula
SI, R, T known → Find P
SI, P, T known → Find R
SI, P, R known → Find T
\`\`\`

### **Trick 2: Unit Consistency**
\`\`\`
Ensure R and T units match
Convert months to years if needed
\`\`\`

### **Trick 3: Mental Calculation**
\`\`\`
For nice numbers: 100, 200, 50, etc.
Use shortcuts for division
\`\`\`

---

## 🎯 Applications

### **1. Investment Planning**
- Find required principal for target returns
- Determine suitable interest rates
- Calculate investment duration

### **2. Loan Management**
- Find affordable loan amounts
- Determine suitable interest rates
- Calculate repayment periods

### **3. Savings Goals**
- Find required monthly deposits
- Determine interest rate needs
- Calculate time to reach goals

---

## 🧮 Advanced Scenarios

### **Scenario 1: Partial Information**
When some values are ranges or estimates, calculate possible ranges for unknown variable.

### **Scenario 2: Multiple Solutions**
Some problems may have multiple possible values - consider all valid solutions.

### **Scenario 3: Optimization**
Find optimal values for minimum cost or maximum return.

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Formula Selection**
❌ Using P formula when finding R
- Match formula to unknown variable

### **Mistake 2: Unit Mismatch**
❌ R in % with T in months
- Convert units consistently

### **Mistake 3: Calculation Errors**
❌ Wrong order of operations
- Follow PEMDAS/BODMAS rules

### **Mistake 4: Negative Results**
❌ Impossible negative time/rate
- Check input values

---

## 🎯 Practice Problems

### **Finding Principal:**
1. SI = ₹300, R = 10%, T = 2 years. Find P.
2. A = ₹1320, R = 10%, T = 2 years. Find P.
3. SI = ₹500, R = 8%, T = 1.5 years. Find P.

### **Finding Rate:**
1. P = ₹2000, SI = ₹400, T = 2 years. Find R.
2. P = ₹1500, A = ₹1650, T = 1 year. Find R.
3. SI = ₹360, P = ₹1200, T = 3 years. Find R.

### **Finding Time:**
1. P = ₹2500, R = 12%, SI = ₹300. Find T.
2. P = ₹3000, R = 8%, A = ₹3600. Find T.
3. SI = ₹600, P = ₹2000, R = 15%. Find T.

**Answers:**
Principal: ₹1500, ₹1200, ₹2083.33
Rate: 10%, 10%, 10%
Time: 1 year, 2.5 years, 2 years

Master reverse calculations to solve any simple interest problem! 🏆`
};
