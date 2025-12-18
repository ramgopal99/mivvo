import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_9: SubLesson = {
  id: "7.9",
  title: 'Successive Discount',
  status: 'completed',
  content: `# 🏷️ Successive Discount

Master successive discount calculations! When multiple discounts are applied one after another, the combined effect is not simply their sum. Learn the correct method to calculate net discount and equivalent single discount.

---

## 🎯 What is Successive Discount?

**Successive Discount** occurs when two or more discounts are applied sequentially on the same price. Each discount is calculated on the price after the previous discount.

### **Key Concept**
- Discounts are **not additive**
- Each discount applies to reduced price
- Net effect is less than sum of individual discounts

### **Formula for Two Discounts**
\`\`\`
Net Discount % = A% + B% - (A% × B%)/100%
\`\`\`

**Where:**
- A% = First discount percentage
- B% = Second discount percentage

---

## 📊 Calculation Methods

### **Method 1: Step-by-Step**
\`\`\`
1. Apply first discount: Price₁ = MP × (1 - A/100)
2. Apply second discount: Price₂ = Price₁ × (1 - B/100)
3. Net discount % = [(MP - Price₂)/MP] × 100%
\`\`\`

**Example:** MP = ₹1000, discounts 20% then 10%
- After 20%: 1000 × 0.8 = ₹800
- After 10%: 800 × 0.9 = ₹720
- Net discount: (1000-720)/1000 × 100% = 28%

### **Method 2: Formula Method**
\`\`\`
Net % = 20% + 10% - (20% × 10%)/100% = 30% - 2% = 28%
\`\`\`

---

## 🔢 Examples of Successive Discounts

### **Example 1: Two Discounts**
**Problem:** MP = ₹2000, discounts 15% and 10%. Find SP.

**Solution:**
- Method 1: 2000 × 0.85 × 0.9 = 2000 × 0.765 = ₹1530
- Method 2: Net % = 15 + 10 - (15×10)/100 = 25 - 1.5 = 23.5%
- SP = 2000 × (1 - 23.5/100) = 2000 × 0.765 = ₹1530

### **Example 2: Three Discounts**
**Problem:** MP = ₹5000, discounts 10%, 20%, 5%. Find SP.

**Solution:**
- Method 1: 5000 × 0.9 × 0.8 × 0.95
- = 5000 × 0.9 = 4500
- 4500 × 0.8 = 3600
- 3600 × 0.95 = 3420
- SP = ₹3420

- Formula: Net % = 10 + 20 + 5 - (10×20 + 20×5 + 5×10)/100 + (10×20×5)/10000
- = 35 - (200 + 100 + 50)/100 + 1000/10000
- = 35 - 350/100 + 0.1 = 35 - 3.5 + 0.1 = 31.6%
- SP = 5000 × (1 - 0.316) = 5000 × 0.684 = ₹3420

---

## 💡 Quick Tricks

### **Trick 1: Equivalent Single Discount**
\`\`\`
SP = MP × (1 - A/100) × (1 - B/100)
\`\`\`

### **Trick 2: Net Percentage**
\`\`\`
Net % = A + B - (A×B)/100
\`\`\`

### **Trick 3: Three Discounts**
\`\`\`
Net % = A + B + C - (AB + BC + CA)/100 + (A×B×C)/10000
\`\`\`

---

## 🎯 Applications

### **1. Retail Sales**
- Multiple discount coupons
- Seasonal sale combinations
- Promotional offers

### **2. Business Negotiations**
- Volume discounts
- Trade discounts
- Bulk purchase deals

### **3. E-commerce**
- Coupon stacking
- Flash sales
- Loyalty program discounts

---

## 🧮 Real-Life Scenarios

### **1. Departmental Store**
- 20% off + additional 10% off
- Not 30% off

### **2. Online Shopping**
- Product discount + coupon + cashback
- Complex successive calculations

### **3. Business Contracts**
- Trade discount + cash discount
- Volume-based reductions

---

## 🚨 Common Mistakes

### **Mistake 1: Simple Addition**
❌ "20% + 10% = 30% discount"
- Actual discount is 28%

### **Mistake 2: Wrong Order**
❌ Order doesn't matter
- Actually order doesn't matter mathematically

### **Mistake 3: Multiple Applications**
❌ Applying same discount multiple times
- Each discount applies to current price

---

## 🎯 Practice Problems

### **Two Discounts:**
1. MP ₹1000, discounts 20% and 15%. Find SP.
2. MP ₹2000, 25% and 10%. Find net discount %.
3. Discounts 30% and 20% on ₹1500. Find SP.

### **Three Discounts:**
1. MP ₹5000, 10%, 15%, 5%. Find SP.
2. Discounts 20%, 10%, 5% on ₹3000. Find net %.

**Answers:**
Two: ₹850, 32.5%, ₹1050
Three: ₹3825, 31.5%

Master successive discounts to calculate accurate promotional pricing! 🏆`
};