import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_11: SubLesson = {
  id: "3.11",
  title: 'Approximation',
  status: 'completed',
  content: `# 🔢 Approximation

Approximation techniques are essential in aptitude exams where exact calculations may be time-consuming or unnecessary. Learning to estimate answers quickly and accurately can save valuable time while maintaining precision.

---

## 🎯 What is Approximation?

**Approximation** means finding an estimate that is close to the exact value. In aptitude exams, we often need to:
- Round numbers to suitable places
- Use mental math techniques
- Estimate without calculators
- Make quick calculations for time management

---

## 📊 Rounding Rules

### **Rounding to Whole Numbers**
- **0-4**: Round down
- **5-9**: Round up

**Examples:**
- 3.2 → 3
- 3.7 → 4
- 2.5 → 3 (standard rounding)
- 2.5 → 2 or 3 (depends on context)

### **Rounding to Decimal Places**
Look at the digit after the desired decimal place:
- If < 5, round down
- If ≥ 5, round up

**Examples:**
- 3.14159 to 2 decimal places: 3.14
- 3.14159 to 3 decimal places: 3.142
- 2.987 to 1 decimal place: 2.9 (8 ≥ 5, round up 8 to 9, but 9 rounds up 7 to 10, so 3.0)

### **Rounding to Significant Figures**
Keep specified number of meaningful digits:
- Round appropriately based on next digit

**Examples:**
- 123.456 to 3 significant figures: 123
- 0.001234 to 2 significant figures: 0.0012
- 156.789 to 3 significant figures: 157

---

## 🧮 Mental Math Techniques

### **Rounding for Addition/Subtraction**
Round numbers to nearest 10, 100, or 1000:

**Examples:**
- 47 + 52 = 50 + 50 = 100 (exact: 99, very close)
- 248 + 149 ≈ 250 + 150 = 400 (exact: 397)
- 856 - 478 ≈ 860 - 480 = 380 (exact: 378)

### **Rounding for Multiplication**
Use compatible numbers:

**Examples:**
- 19 × 21 ≈ 20 × 20 = 400 (exact: 399)
- 48 × 52 ≈ 50 × 50 = 2500 (exact: 2496)
- 97 × 103 ≈ 100 × 100 = 10,000 (exact: 9,991)

### **Rounding for Division**
Round dividend and divisor:

**Examples:**
- 147 ÷ 49 ≈ 150 ÷ 50 = 3 (exact: 3)
- 856 ÷ 32 ≈ 850 ÷ 30 = 28.33 (exact: 26.75) → not very accurate

---

## 🎯 Estimation Strategies

### **1. Front-End Estimation**
Add/subtract from left to right:

**Example:**
Add 347 + 589 + 126:
300 + 500 = 800
40 + 80 = 120, plus 20 = 140 → 800 + 140 = 940
7 + 9 + 6 = 22 → Total ≈ 962 (exact: 347+589=936, +126=1,062)

### **2. Clustering**
Group numbers around a central value:

**Example:**
Average of 98, 102, 97, 103, 99:
Around 100: 98(-2), 102(+2), 97(-3), 103(+3), 99(-1)
Sum of differences: -2+2-3+3-1 = -1
Average ≈ 100 + (-1/5) = 99.8

### **3. Compatible Numbers**
Use numbers that are easy to calculate with:

**Examples:**
- √48 ≈ √49 = 7 (since 48 is close to 49)
- 23/7 ≈ 3.285, but 21/6 = 3.5 is easier
- 199/200 ≈ 1 (since 199 is very close to 200)

---

## 🔍 Approximation in Calculations

### **Multiplication by Numbers Close to 10, 100, etc.**
- 9.8 × 10.2 ≈ 10 × 10 = 100
- 98 × 102 = (100-2)×(100+2) = 100² - 2² = 10,000 - 4 = 9,996

### **Division by Numbers Close to Powers of 10**
- 499 ÷ 5 ≈ 500 ÷ 5 = 100 (since 499 ≈ 500)
- 1,001 ÷ 1,000 = 1.001 ≈ 1

### **Square Roots**
- √(x² + 2x + 1) = √((x+1)²) = x+1
- √(a² + b²) ≈ |a| + |b| when a and b are similar

### **Percentages**
- 98% ≈ 100%
- 4.9% ≈ 5%
- 1.1 × 1.1 = (1 + 0.1)² = 1 + 2×0.1 + 0.01 = 1.21

---

## 🧠 Quick Calculation Methods

### **Addition Shortcuts**
- Numbers ending with 5: 35 + 45 = 80 (30+40=70, 5+5=10, total 80)
- Round and adjust: 47 + 48 = 50 + 50 - 5 = 95 (47+48=95 exactly)

### **Multiplication Shortcuts**
- By 5: Multiply by 10, divide by 2
- By 25: Multiply by 100, divide by 4
- By 11: (a+b)×11 where a is tens, b is units: 23×11 = 2×11×10 + 2×11×1 = 220 + 22 = 242

### **Division Shortcuts**
- By 5: Multiply by 2, divide by 10
- By 25: Multiply by 4, divide by 100
- By 9: Add digits, subtract from dividend, repeat

---

## 🎯 Approximation in Word Problems

### **Population Growth**
"City population 1,247,839 grew by 3.2%. Approximate growth?"
3.2% ≈ 3%, so growth ≈ 1,247,839 × 0.03 ≈ 37,435

### **Time/Distance**
"Drive 247 miles at 58 mph. Approximate time?"
250 miles at 60 mph = 4.166 hours ≈ 4 hours 10 minutes

### **Cost Calculations**
"Buy 3 items at $19.95 each. Approximate total?"
20 × 3 = 60, so approximately $60

### **Percentage Problems**
"Score 47 out of 50. What percentage?"
47/50 = 94%, or approximately 95%

---

## 🚨 Common Mistakes to Avoid

### ❌ **Over-Rounding**
\`\`\`
Wrong: 3.14159 to 1 decimal place = 3.1
Right: 3.14159 to 1 decimal place = 3.1 (4 < 5, keep 1)
\`\`\`

### ❌ **Inconsistent Rounding**
\`\`\`
Wrong: Add 3.45 + 2.67 = 3.5 + 2.7 = 6.2
Right: Should round to same decimal place: 3.45 + 2.67 = 6.12
\`\`\`

### ❌ **Poor Compatible Numbers**
\`\`\`
Wrong: √48 ≈ √50 = 7.07 (not very close)
Right: √48 ≈ √49 = 7 (much closer)
\`\`\`

### ❌ **Forgetting Adjustment**
\`\`\`
Wrong: 48 × 52 ≈ 50 × 50 = 2500
Right: 48 × 52 = (50-2)×(50+2) = 2500 - 4 = 2496
\`\`\`

---

## 🎯 Practice Problems

### **Rounding:**
1. Round 3.14159 to 2 decimal places
2. Round 2.987 to 1 decimal place
3. Round 156.789 to nearest whole number
4. Round 0.001234 to 2 significant figures

### **Mental Math:**
1. 47 + 52 ≈ ?
2. 248 + 149 ≈ ?
3. 19 × 21 ≈ ?
4. 147 ÷ 49 ≈ ?

### **Estimation:**
1. √48 ≈ ?
2. 98 × 102 ≈ ?
3. 499 ÷ 5 ≈ ?
4. 23 × 11 ≈ ?

### **Word Problems:**
1. Approximate cost: 3 items at $19.95 each
2. Approximate time: 247 miles at 58 mph
3. Approximate percentage: 47 out of 50
4. Approximate growth: Population 1,247,839 grew by 3.2%

### **Complex Calculations:**
1. (47.2 + 52.8) × (19.9 × 20.1) ≈ ?
2. √(144 + 256) ÷ (13.95 × 14.05) ≈ ?

**Answers:**
Rounding: 3.14, 3.0, 157, 0.0012
Mental: 100, 400, 400, 3
Estimation: 7, 10,000, 100, 253
Word: $60, 4.25 hours, 94%, 37,000
Complex: (100)×(400)=40,000, √400÷196≈20÷200=0.1

---

## 🎓 Pro Tips for Exams

1. **Estimate first** before calculating exactly
2. **Use compatible numbers** that are easy to work with
3. **Round consistently** to the same place value
4. **Check reasonableness** of your approximation
5. **Practice mental math** regularly
6. **Know common percentages** and their approximations
7. **Use front-end estimation** for multi-step problems

Master approximation techniques to solve problems quickly and accurately! 🏆`
};

