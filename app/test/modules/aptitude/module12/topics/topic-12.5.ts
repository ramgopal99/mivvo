import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_5: SubLesson = {
  id: "12.5",
  title: 'Mean Price / Mean Value',
  status: 'completed',
  content: `# 💰 Mean Price / Mean Value

Learn to calculate average prices and values in mixtures - essential for cost-related mixture problems in aptitude exams.

---

## 🎯 Mean Price Concept

**Mean price** (also called average price) is the weighted average price of all ingredients in a mixture.

### **Basic Formula**
\`\`\`
Mean Price = Total Cost / Total Quantity
\`\`\`

**Where:**
- **Total Cost** = Sum of (Quantity × Price) for all ingredients
- **Total Quantity** = Sum of all quantities

---

## 📊 Mean Price Calculations

### 1. **Two Ingredient Mixture**
\`\`\`
Mean Price = (Q₁×P₁ + Q₂×P₂) / (Q₁ + Q₂)
\`\`\`

### 2. **Three Ingredient Mixture**
\`\`\`
Mean Price = (Q₁×P₁ + Q₂×P₂ + Q₃×P₃) / (Q₁ + Q₂ + Q₃)
\`\`\`

### 3. **Ratio-Based Mean Price**
\`\`\`
If mixed in ratio a:b, mean price = (a×P₁ + b×P₂) / (a + b)
\`\`\`

---

## 🧮 Mean Price Examples

### Example 1: Simple Average
**10 kg rice at Rs. 20/kg + 15 kg at Rs. 25/kg. Mean price?**

**Solution:**
- Total cost = (10×20) + (15×25) = 200 + 375 = Rs. 575
- Total quantity = 10 + 15 = 25 kg
- Mean price = 575/25 = Rs. 23/kg

### Example 2: Ratio Mixture
**Sugar and flour mixed in 2:3 ratio. Sugar Rs. 40/kg, flour Rs. 20/kg. Mean price?**

**Solution:**
- Mean price = (2×40 + 3×20) / (2 + 3) = (80 + 60)/5 = 140/5 = Rs. 28/kg

### Example 3: Percentage Mixture
**40% of mixture is A at Rs. 50/kg, rest B at Rs. 30/kg. Mean price?**

**Solution:**
- Let total = 100 kg
- A = 40 kg at Rs. 50 = Rs. 2000
- B = 60 kg at Rs. 30 = Rs. 1800
- Total cost = Rs. 3800
- Mean price = 3800/100 = Rs. 38/kg

---

## 🎯 Mean Value Applications

### **Quality-Based Mean**
- **Purity percentages**
- **Concentration levels**
- **Quality grades**

### **Weighted Averages**
- **Different quantities**
- **Different importance weights**
- **Complex proportions**

---

## 🧠 Exam Tricks & Shortcuts

### **Quick Mean Calculation**
\`\`\`
Mean = Σ (Quantity × Price) / Σ Quantity
\`\`\`

### **Ratio Shortcut**
\`\`\`
For ratio a:b, Mean = (a×P₁ + b×P₂) / (a + b)
\`\`\`

### **Percentage Method**
\`\`\`
Mean = (P₁×%₁ + P₂×%₂ + ...) / 100
Where %₁ + %₂ + ... = 100%
\`\`\`

### **Unit Cost Method**
\`\`\`
Calculate cost per unit, then average
\`\`\`

---

## 🔢 Advanced Mean Price

### **Conditional Mean Price**
- **Minimum/maximum prices**
- **Cost constraints**
- **Quality requirements**

### **Complex Mixtures**
- **Multi-stage mixing**
- **Replacement scenarios**
- **Loss/gain considerations**

---

## 🎯 Complex Examples

### Example 4: Three Ingredients with Ratios
**A, B, C mixed in 2:3:5 ratio. Prices Rs. 10, 20, 30 per kg. Mean price?**

**Solution:**
- Total parts = 2+3+5 = 10
- Mean price = (2×10 + 3×20 + 5×30) / 10 = (20 + 60 + 150)/10 = 230/10 = Rs. 23/kg

### Example 5: Cost with Transport
**Rice Rs. 100/quintal, transport Rs. 10/quintal. Mixed with Rs. 120/quintal rice. Mean Rs. 110/quintal. Ratio?**

**Solution:**
- Effective price 1st rice = 100 + 10 = Rs. 110/quintal
- 2nd rice = Rs. 120/quintal
- Required mean = Rs. 110/quintal
- Since mean equals 1st rice price, ratio = 1:0 (only first rice)

### Example 6: Value with Depreciation
**Two cars: Rs. 2 lakh (depreciates 10%), Rs. 3 lakh (depreciates 5%). Average depreciation?**

**Solution:**
- Car A: Depreciation = 10% of 2 lakh = Rs. 20,000
- Car B: Depreciation = 5% of 3 lakh = Rs. 15,000
- Total depreciation = Rs. 35,000
- Average depreciation % = (35,000 / 5,00,000) × 100% = 7%

---

## 🚨 Mean Price Mistakes

1. **Quantity Omission**: Forgetting to include all quantities
2. **Price Application**: Wrong price-quantity multiplication
3. **Division Error**: Dividing by wrong total
4. **Unit Mismatch**: Different units not converted
5. **Percentage Confusion**: Mixing absolute and percentage values

---

## 🎯 Practice Problems

**1.** 25kg @ Rs.15/kg + 35kg @ Rs.20/kg. Mean price?
**2.** Ratio 3:4, prices Rs.30, Rs.40. Mean price?
**3.** 60% A @ Rs.25/kg, 40% B @ Rs.35/kg. Mean price?
**4.** Three items: 2:3:5 ratio, Rs.10,15,20. Mean price?
**5.** Total cost Rs.500 for 20kg mixture. Mean price?

**Answers:** 1. Rs. 18/kg, 2. Rs. 34/kg, 3. Rs. 29.5/kg, 4. Rs. 16/kg, 5. Rs. 25/kg

---

## 🎓 Mean Price Strategies

1. **Calculate total cost** by multiplying quantity × price
2. **Sum all quantities** for denominator
3. **Apply weighted average** formula
4. **Convert ratios to quantities** when needed
5. **Verify calculation** with reasonableness check

Master mean price calculations and handle all mixture costing problems! 🏆`
};
