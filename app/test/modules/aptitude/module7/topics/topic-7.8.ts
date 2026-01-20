import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_8: SubLesson = {
  id: "7.8",
  title: 'Discount',
  status: 'completed',
  content: "`# ðŸ·ï¸ Discount

Master discount calculations! Discounts are price reductions offered to customers. They boost sales but affect profitability. Learn to calculate discounts and their impact on business metrics.

---

## ðŸŽ¯ What is Discount?

**Discount** is the reduction in marked price offered to customers. It's the difference between marked price and selling price.

### **Basic Formula**
\`"\`\`
Discount = Marked Price - Selling Price
Discount = MP - SP
\`\`\`

### **Key Points**
- Always calculated on MP
- Attracts customers and increases sales
- Reduces profit margins

---

## ðŸ“Š Discount Calculation Methods

### **Method 1: Direct Calculation**
\`\`\`
Discount Amount = MP - SP
\`\`\`

**Example:** MP = â‚¹1000, SP = â‚¹800
- Discount = 1000 - 800 = â‚¹200

### **Method 2: Percentage Method**
\`\`\`
Discount % = (Discount Amount / MP) Ã— 100%
SP = MP Ã— (1 - Discount%/100)
\`\`\`

**Example:** MP = â‚¹1200, discount 15%
- Discount amount = 1200 Ã— 0.15 = â‚¹180
- SP = 1200 Ã— 0.85 = â‚¹1020

### **Method 3: Reverse Calculation**
\`\`\`
MP = SP / (1 - Discount%/100)
Discount % = [(MP - SP)/MP] Ã— 100%
\`\`\`

---

## ðŸ”¢ Examples of Discount Calculations

### **Example 1: Amount Given**
**Problem:** MP = â‚¹1500, discount â‚¹300. Find discount % and SP.

**Solution:**
- SP = 1500 - 300 = â‚¹1200
- Discount % = (300/1500) Ã— 100% = 20%

### **Example 2: Percentage Given**
**Problem:** MP = â‚¹2000, discount 25%. Find discount amount and SP.

**Solution:**
- Discount amount = 2000 Ã— 0.25 = â‚¹500
- SP = 2000 - 500 = â‚¹1500

### **Example 3: SP Given**
**Problem:** MP = â‚¹800, SP = â‚¹640. Find discount %.

**Solution:**
- Discount = 800 - 640 = â‚¹160
- Discount % = (160/800) Ã— 100% = 20%

---

## ðŸ’¡ Types of Discounts

### **1. Percentage Discount**
- Fixed percentage off MP
- Example: 20% off

### **2. Fixed Amount Discount**
- Fixed rupees off
- Example: â‚¹500 off

### **3. Buy One Get One (BOGO)**
- Purchase one, get one free
- Effective discount varies

### **4. Seasonal Discounts**
- Time-bound offers
- Clear inventory

### **5. Loyalty Discounts**
- Repeat customer rewards
- Encourages retention

---

## ðŸŽ¯ Business Impact of Discounts

### **1. Sales Volume Increase**
- More customers attracted
- Higher total revenue possible

### **2. Profit Margin Reduction**
- Lower profit per unit
- Need volume to compensate

### **3. Brand Perception**
- Value-driven image
- Customer loyalty

### **4. Competitive Advantage**
- Match competitor prices
- Market share gain

---

## ðŸ§® Discount in Different Scenarios

### **1. Single Discount**
\`\`\`
SP = MP Ã— (1 - D/100)
\`\`\`

### **2. Multiple Products**
\`\`\`
Total discount depends on individual MPs
\`\`\`

### **3. With Taxes**
\`\`\`
Discount before or after taxes - clarify
Usually discount on pre-tax price
\`\`\`

---

## ðŸ“ˆ Discount Strategy

### **1. Break-even Analysis**
\`\`\`
Additional units needed = Discount amount / Profit per unit
\`\`\`

### **2. Margin Maintenance**
\`\`\`
Required volume increase = (Discount % / Profit Margin %)
\`\`\`

### **3. Promotional Planning**
- Seasonal discounts
- Product launches
- Excess inventory

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Base**
âŒ "Discount on SP"
- Always on MP

### **Mistake 2: Double Discount**
âŒ Applying discount twice
- Clear discount terms

### **Mistake 3: Ignoring Taxes**
âŒ Discount calculation without tax consideration
- Specify tax treatment

---

## ðŸŽ¯ Practice Problems

1. MP â‚¹1000, discount 15%. Find SP.
2. MP â‚¹1500, SP â‚¹1200. Find discount %.
3. Discount â‚¹200 on MP â‚¹800. Find discount %.

**Answers:** â‚¹850, 20%, 25%

Master discount calculations for effective pricing strategies! ðŸ†`
};

