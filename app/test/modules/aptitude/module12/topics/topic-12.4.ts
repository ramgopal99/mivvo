import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_4: SubLesson = {
  id: "12.4",
  title: 'Alligation Rule',
  status: 'completed',
  content: `# ⚖️ Alligation Rule

Master the alligation rule - a powerful shortcut for mixture problems involving different prices or concentrations.

---

## 🎯 What is Alligation?

**Alligation** is a rule that helps find the ratio in which two ingredients of different prices/concentrations should be mixed to get a desired price/concentration.

### **Alligation Formula**
\`\`\`
Required price/quantity - Lower price
Ratio = ──────────────────────────────────────
        Higher price - Lower price
\`\`\`

---

## 📊 Alligation Method

### **Visual Representation**
\`\`\`
    Higher Price/Concentration (H)
            |
            | Difference: H - M
            |
    Mean Price/Concentration (M)
            |
            | Difference: M - L
            |
    Lower Price/Concentration (L)
\`\`\`

### **Ratio Formula**
\`\`\`
Ratio = (M - L) : (H - M)
\`\`\`

Where:
- **M**: Required mean price/concentration
- **L**: Lower price/concentration
- **H**: Higher price/concentration

---

## 🧮 Alligation Examples

### Example 1: Price Mixture
**Two types sugar: Rs. 50/kg and Rs. 70/kg. Mix to get Rs. 60/kg. Find ratio.**

**Solution:**
- Higher price (H) = 70
- Lower price (L) = 50
- Mean price (M) = 60

Using alligation:
\`\`\`
    70
     |
     | 70-60=10
     |
    60
     |
     | 60-50=10
     |
    50
\`\`\`

- Ratio = 10:10 = 1:1

### Example 2: Concentration Mixture
**Two solutions: 20% and 40% acid. Mix to get 30% acid. Find ratio.**

**Solution:**
- H = 40%, L = 20%, M = 30%
- Ratio = (30-20):(40-30) = 10:10 = 1:1

### Example 3: Milk-Water Problem
**Milk Rs. 20/liter, water free. Mix to get Rs. 12/liter. Find ratio.**

**Solution:**
- H = 20, L = 0, M = 12
- Ratio = (12-0):(20-12) = 12:8 = 3:2
- Milk:Water = 3:2

---

## 🎯 Alligation Applications

### **Price Problems**
- Different cost items mixed for target price
- Wholesale vs retail price mixtures
- Discounted item mixtures

### **Concentration Problems**
- Acid/water solutions
- Alcohol/water mixtures
- Metal alloys

### **Quality Problems**
- Different grade mixtures
- Purity level mixtures
- Concentration adjustments

---

## 🧠 Exam Tricks & Shortcuts

### **Alligation Cross Method**
\`\`\`
Higher - Mean    Mean - Lower
    10              10
\`\`\`

### **Ratio Interpretation**
\`\`\`
First number: Quantity of higher price item
Second number: Quantity of lower price item
\`\`\`

### **Quick Verification**
\`\`\`
Check if mean = (H×first + L×second) / (first + second)
\`\`\`

### **Multiple Ingredients**
\`\`\`
For more than two: Use pairwise alligation
Complex problems need systematic approach
\`\`\`

---

## 🔢 Advanced Alligation

### **Three Ingredient Problems**
- **Pairwise application**
- **Systematic elimination**
- **Weighted averages**

### **Complex Scenarios**
- **Cost with transportation**
- **Loss/gain considerations**
- **Multiple quality levels**

### **Real-World Applications**
- **Chemical mixing**
- **Food processing**
- **Pharmaceutical compounding**

---

## 🎯 Complex Examples

### Example 4: Three Price Levels
**Three types rice: Rs. 40/kg, Rs. 50/kg, Rs. 60/kg. Mix equal quantities. Average price?**

**Solution:**
- Equal quantities: 1:1:1 ratio
- Average = (40+50+60)/3 = Rs. 50/kg

### Example 5: Cost with Transport
**Rice Rs. 20/kg, transport Rs. 2/kg. Mix with Rs. 25/kg rice to get Rs. 23/kg. Ratio?**

**Solution:**
- Effective price of first rice = 20 + 2 = Rs. 22/kg
- Second rice = Rs. 25/kg
- Target = Rs. 23/kg
- Ratio = (23-22):(25-23) = 1:1

### Example 6: Concentration with Loss
**Two solutions A(30%) and B(50%). Mix to get 40%. If 10% evaporates, find original ratio.**

**Solution:**
- After evaporation, concentration becomes higher
- Let original mixture volume = 100 units
- After evaporation = 90 units
- Final concentration = 40%
- Original concentration = (40 × 90) / 100 = 36%
- Now use alligation for 36% from 30% and 50%
- Ratio = (36-30):(50-36) = 6:14 = 3:7

---

## 🚨 Alligation Mistakes

1. **Cross Method**: Wrong positioning of numbers
2. **Ratio Order**: Higher:lower vs lower:higher confusion
3. **Negative Values**: Impossible ratios
4. **Unit Consistency**: Same units for all prices
5. **Mean Position**: Mean between higher and lower

---

## 🎯 Practice Problems

**1.** Sugar Rs. 30/kg, Rs. 50/kg. Mix for Rs. 40/kg. Ratio?
**2.** Milk Rs. 25/L, water free. Mix for Rs. 15/L. Ratio?
**3.** Acid 40%, 60%. Mix for 50%. Ratio?
**4.** Two alloys: 70%, 90% copper. Mix for 80%. Ratio?
**5.** Tea Rs. 100/kg, Rs. 150/kg. Mix for Rs. 120/kg. Ratio?

**Answers:** 1. 1:1, 2. 3:1, 3. 1:1, 4. 1:1, 5. 1:1

---

## 🎓 Alligation Strategies

1. **Identify higher and lower** values clearly
2. **Apply cross method** correctly
3. **Interpret ratio** as higher:lower quantities
4. **Verify calculation** with direct method
5. **Check reasonableness** - ratio should make sense

Master alligation rule and solve mixture problems in seconds! 🏆`
};

