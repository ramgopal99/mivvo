import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_11: SubLesson = {
  id: "9.11",
  title: 'Growth & Depreciation',
  status: 'completed',
  content: `# 📈 Growth & Depreciation

Learn compound growth and depreciation calculations! These concepts apply CI principles to real-world scenarios like population growth, asset appreciation, and value depreciation. Master exponential change calculations.

---

## 🎯 Growth vs Depreciation

### **Compound Growth**
- Value increases over time
- Formula: A = P(1 + R/100)^T
- Examples: Investments, population, assets

### **Compound Depreciation**
- Value decreases over time
- Formula: A = P(1 - R/100)^T
- Examples: Car value, equipment, inventory

---

## 📊 Growth Calculations

### **Example 1: Investment Growth**
**Problem:** ₹10,000 investment grows 12% annually for 3 years.

**Solution:**
- A = 10000 × (1.12)^3
- A = 10000 × 1.404928 = ₹14,049.28
- Growth = 14,049.28 - 10,000 = ₹4,049.28

### **Example 2: Population Growth**
**Problem:** Population 50,000 grows 5% annually for 5 years.

**Solution:**
- A = 50000 × (1.05)^5
- A = 50000 × 1.2762815625 ≈ 63,814
- Growth = 13,814 people

---

## 🔢 Depreciation Calculations

### **Example 1: Asset Depreciation**
**Problem:** Car worth ₹5,00,000 depreciates 15% annually for 3 years.

**Solution:**
- A = 500000 × (0.85)^3
- A = 500000 × 0.614125 = ₹307,062.50
- Depreciation = 500,000 - 307,062.50 = ₹192,937.50

### **Example 2: Equipment Value**
**Problem:** Machine ₹1,00,000 depreciates 10% annually. Value after 4 years?

**Solution:**
- A = 100000 × (0.90)^4
- A = 100000 × 0.6561 = ₹65,610

---

## 💡 Applications

### **1. Investment Planning**
- Portfolio growth projections
- Retirement fund calculations
- Wealth accumulation

### **2. Business Assets**
- Equipment depreciation
- Asset value tracking
- Tax calculations

### **3. Economic Analysis**
- GDP growth rates
- Inflation impact
- Market value changes

---

## 🧮 Growth vs Depreciation Formulas

| Concept | Formula | Example |
|---------|---------|---------|
| Growth | A = P(1 + R/100)^T | Investment growth |
| Depreciation | A = P(1 - R/100)^T | Asset depreciation |
| Growth Rate | R = [(A/P)^(1/T) - 1] × 100% | Finding rate |
| Time Period | T = log(A/P) / log(1 ± R/100) | Finding time |

---

## 🎯 Real-Life Scenarios

### **1. Investment Returns**
- Stock portfolio growth
- Mutual fund NAV increase
- Savings account accumulation

### **2. Asset Depreciation**
- Vehicle value reduction
- Real estate depreciation
- Equipment wear and tear

### **3. Population Studies**
- Demographic growth
- Urban expansion
- Species population tracking

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Sign**
❌ Using + for depreciation
- Depreciation uses -

### **Mistake 2: Rate Confusion**
❌ "Depreciation rate = growth rate"
- Opposite concepts

### **Mistake 3: Time Application**
❌ Same time formula for both
- Different for growth vs depreciation

---

## 🎯 Practice Problems

### **Growth Problems:**
1. Investment ₹20000 grows 8% annually for 4 years. Find amount.
2. Population 1 lakh grows 6% annually. Size after 3 years?

### **Depreciation Problems:**
1. Car ₹600000 depreciates 12% annually. Value after 2 years?
2. Equipment ₹80000 depreciates 10% annually. Value after 5 years?

### **Rate/Time Problems:**
1. Investment grows from ₹50000 to ₹92610 in 3 years. Find rate.
2. Asset depreciates from ₹100000 to ₹59049 in 4 years. Find rate.

**Answers:**
Growth: ₹27,428.03, ~1,19,102
Depreciation: ₹4,75,680, ₹47,045.76
Rate: 15%, 20%

Master growth and depreciation calculations for real-world value changes! 🏆`
};
