import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: "8.6",
  title: 'Finding P, R, or T',
  status: 'completed',
  content: "`# ðŸ” Finding P, R, or T

Master reverse calculations in simple interest! When one variable is unknown, you can find it using the other known values. These formulas are essential for solving problems where you need to determine the missing parameter.

---

## ðŸŽ¯ The SI Formula Rearrangements

**Basic SI Formula:**
\`"\`\`
SI = (P Ã— R Ã— T) Ã· 100
\`\`\`

**We can solve for each variable:**

### **1. Finding Principal (P)**
\`\`\`
P = (SI Ã— 100) Ã· (R Ã— T)
\`\`\`

**Example:** SI = â‚¹500, R = 10%, T = 2 years
- P = (500 Ã— 100) Ã· (10 Ã— 2) = â‚¹2500

### **2. Finding Rate (R)**
\`\`\`
R = (SI Ã— 100) Ã· (P Ã— T)
\`\`\`

**Example:** SI = â‚¹300, P = â‚¹2000, T = 3 years
- R = (300 Ã— 100) Ã· (2000 Ã— 3) = 5%

### **3. Finding Time (T)**
\`\`\`
T = (SI Ã— 100) Ã· (P Ã— R)
\`\`\`

**Example:** SI = â‚¹400, P = â‚¹2000, R = 10%
- T = (400 Ã— 100) Ã· (2000 Ã— 10) = 2 years

---

## ðŸ“Š Finding Variables from Amount

### **Finding P from A**
\`\`\`
P = A Ã· (1 + RT/100)
\`\`\`

**Example:** A = â‚¹1200, R = 10%, T = 2 years
- P = 1200 Ã· (1 + 20/100) = 1200 Ã· 1.2 = â‚¹1000

### **Finding R from A**
\`\`\`
R = [(A - P) Ã— 100] Ã· (P Ã— T)
\`\`\`

**Example:** A = â‚¹1100, P = â‚¹1000, T = 2 years
- R = (100 Ã— 100) Ã· (1000 Ã— 2) = 10%

### **Finding T from A**
\`\`\`
T = [(A - P) Ã— 100] Ã· (P Ã— R)
\`\`\`

**Example:** A = â‚¹1200, P = â‚¹1000, R = 10%
- T = (200 Ã— 100) Ã· (1000 Ã— 10) = 2 years

---

## ðŸ”¢ Detailed Examples

### **Example 1: Finding Missing Principal**
**Problem:** SI = â‚¹240, R = 12%, T = 1.5 years. Find P.

**Solution:**
- P = (240 Ã— 100) Ã· (12 Ã— 1.5)
- P = 24000 Ã· 18 = â‚¹1333.33

### **Example 2: Finding Missing Rate**
**Problem:** P = â‚¹5000, SI = â‚¹750, T = 2 years. Find R.

**Solution:**
- R = (750 Ã— 100) Ã· (5000 Ã— 2)
- R = 75000 Ã· 10000 = 7.5%

### **Example 3: Finding Missing Time**
**Problem:** P = â‚¹3000, R = 8%, SI = â‚¹480. Find T.

**Solution:**
- T = (480 Ã— 100) Ã· (3000 Ã— 8)
- T = 48000 Ã· 24000 = 2 years

---

## ðŸ’¡ Quick Tricks

### **Trick 1: When Two Values Known**
\`\`\`
Use the appropriate rearranged formula
SI, R, T known â†’ Find P
SI, P, T known â†’ Find R
SI, P, R known â†’ Find T
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

## ðŸŽ¯ Applications

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

## ðŸ§® Advanced Scenarios

### **Scenario 1: Partial Information**
When some values are ranges or estimates, calculate possible ranges for unknown variable.

### **Scenario 2: Multiple Solutions**
Some problems may have multiple possible values - consider all valid solutions.

### **Scenario 3: Optimization**
Find optimal values for minimum cost or maximum return.

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Formula Selection**
âŒ Using P formula when finding R
- Match formula to unknown variable

### **Mistake 2: Unit Mismatch**
âŒ R in % with T in months
- Convert units consistently

### **Mistake 3: Calculation Errors**
âŒ Wrong order of operations
- Follow PEMDAS/BODMAS rules

### **Mistake 4: Negative Results**
âŒ Impossible negative time/rate
- Check input values

---

## ðŸŽ¯ Practice Problems

### **Finding Principal:**
1. SI = â‚¹300, R = 10%, T = 2 years. Find P.
2. A = â‚¹1320, R = 10%, T = 2 years. Find P.
3. SI = â‚¹500, R = 8%, T = 1.5 years. Find P.

### **Finding Rate:**
1. P = â‚¹2000, SI = â‚¹400, T = 2 years. Find R.
2. P = â‚¹1500, A = â‚¹1650, T = 1 year. Find R.
3. SI = â‚¹360, P = â‚¹1200, T = 3 years. Find R.

### **Finding Time:**
1. P = â‚¹2500, R = 12%, SI = â‚¹300. Find T.
2. P = â‚¹3000, R = 8%, A = â‚¹3600. Find T.
3. SI = â‚¹600, P = â‚¹2000, R = 15%. Find T.

**Answers:**
Principal: â‚¹1500, â‚¹1200, â‚¹2083.33
Rate: 10%, 10%, 10%
Time: 1 year, 2.5 years, 2 years

Master reverse calculations to solve any simple interest problem! ðŸ†`
};

