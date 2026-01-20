import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_9: SubLesson = {
  id: "7.9",
  title: 'Successive Discount',
  status: 'completed',
  content: "`# ðŸ·ï¸ Successive Discount

Master successive discount calculations! When multiple discounts are applied one after another, the combined effect is not simply their sum. Learn the correct method to calculate net discount and equivalent single discount.

---

## ðŸŽ¯ What is Successive Discount?

**Successive Discount** occurs when two or more discounts are applied sequentially on the same price. Each discount is calculated on the price after the previous discount.

### **Key Concept**
- Discounts are **not additive**
- Each discount applies to reduced price
- Net effect is less than sum of individual discounts

### **Formula for Two Discounts**
\`"\`\`
Net Discount % = A% + B% - (A% Ã— B%)/100%
\`\`\`

**Where:**
- A% = First discount percentage
- B% = Second discount percentage

---

## ðŸ“Š Calculation Methods

### **Method 1: Step-by-Step**
\`\`\`
1. Apply first discount: Priceâ‚ = MP Ã— (1 - A/100)
2. Apply second discount: Priceâ‚‚ = Priceâ‚ Ã— (1 - B/100)
3. Net discount % = [(MP - Priceâ‚‚)/MP] Ã— 100%
\`\`\`

**Example:** MP = â‚¹1000, discounts 20% then 10%
- After 20%: 1000 Ã— 0.8 = â‚¹800
- After 10%: 800 Ã— 0.9 = â‚¹720
- Net discount: (1000-720)/1000 Ã— 100% = 28%

### **Method 2: Formula Method**
\`\`\`
Net % = 20% + 10% - (20% Ã— 10%)/100% = 30% - 2% = 28%
\`\`\`

---

## ðŸ”¢ Examples of Successive Discounts

### **Example 1: Two Discounts**
**Problem:** MP = â‚¹2000, discounts 15% and 10%. Find SP.

**Solution:**
- Method 1: 2000 Ã— 0.85 Ã— 0.9 = 2000 Ã— 0.765 = â‚¹1530
- Method 2: Net % = 15 + 10 - (15Ã—10)/100 = 25 - 1.5 = 23.5%
- SP = 2000 Ã— (1 - 23.5/100) = 2000 Ã— 0.765 = â‚¹1530

### **Example 2: Three Discounts**
**Problem:** MP = â‚¹5000, discounts 10%, 20%, 5%. Find SP.

**Solution:**
- Method 1: 5000 Ã— 0.9 Ã— 0.8 Ã— 0.95
- = 5000 Ã— 0.9 = 4500
- 4500 Ã— 0.8 = 3600
- 3600 Ã— 0.95 = 3420
- SP = â‚¹3420

- Formula: Net % = 10 + 20 + 5 - (10Ã—20 + 20Ã—5 + 5Ã—10)/100 + (10Ã—20Ã—5)/10000
- = 35 - (200 + 100 + 50)/100 + 1000/10000
- = 35 - 350/100 + 0.1 = 35 - 3.5 + 0.1 = 31.6%
- SP = 5000 Ã— (1 - 0.316) = 5000 Ã— 0.684 = â‚¹3420

---

## ðŸ’¡ Quick Tricks

### **Trick 1: Equivalent Single Discount**
\`\`\`
SP = MP Ã— (1 - A/100) Ã— (1 - B/100)
\`\`\`

### **Trick 2: Net Percentage**
\`\`\`
Net % = A + B - (AÃ—B)/100
\`\`\`

### **Trick 3: Three Discounts**
\`\`\`
Net % = A + B + C - (AB + BC + CA)/100 + (AÃ—BÃ—C)/10000
\`\`\`

---

## ðŸŽ¯ Applications

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

## ðŸ§® Real-Life Scenarios

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

## ðŸš¨ Common Mistakes

### **Mistake 1: Simple Addition**
âŒ "20% + 10% = 30% discount"
- Actual discount is 28%

### **Mistake 2: Wrong Order**
âŒ Order doesn't matter
- Actually order doesn't matter mathematically

### **Mistake 3: Multiple Applications**
âŒ Applying same discount multiple times
- Each discount applies to current price

---

## ðŸŽ¯ Practice Problems

### **Two Discounts:**
1. MP â‚¹1000, discounts 20% and 15%. Find SP.
2. MP â‚¹2000, 25% and 10%. Find net discount %.
3. Discounts 30% and 20% on â‚¹1500. Find SP.

### **Three Discounts:**
1. MP â‚¹5000, 10%, 15%, 5%. Find SP.
2. Discounts 20%, 10%, 5% on â‚¹3000. Find net %.

**Answers:**
Two: â‚¹850, 32.5%, â‚¹1050
Three: â‚¹3825, 31.5%

Master successive discounts to calculate accurate promotional pricing! ðŸ†`
};

