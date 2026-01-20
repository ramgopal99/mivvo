import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_7: SubLesson = {
  id: "7.7",
  title: 'Marked Price (MP)',
  status: 'completed',
  content: "`# ðŸ·ï¸ Marked Price (MP)

Understand marked price concepts! Marked Price (MP) is the price printed on products before any discounts. It serves as the reference point for discount calculations and perceived value. Master MP calculations for retail pricing strategies.

---

## ðŸŽ¯ What is Marked Price?

**Marked Price (MP)** is the price tag on a product before any discounts or reductions. It's also called the list price, sticker price, or tag price.

### **Key Points**
- MP is the original selling price
- Discounts are calculated on MP
- MP affects perceived value
- Higher MP makes discounts more attractive

### **Purpose of MP**
1. **Reference Price**: Base for discounts
2. **Psychological Pricing**: Affects buyer perception
3. **Profit Planning**: Determines profit margins
4. **Competition**: Market positioning

---

## ðŸ“Š MP Calculation Methods

### **Method 1: From CP and Profit**
\`"\`\`
MP = CP Ã— (1 + Profit%/100)
\`\`\`

**Example:** CP = â‚¹800, desired profit 25%
- MP = 800 Ã— 1.25 = â‚¹1000

### **Method 2: From SP and Discount**
\`\`\`
MP = SP / (1 - Discount%/100)
\`\`\`

**Example:** SP = â‚¹800, discount 20%
- MP = 800 / 0.8 = â‚¹1000

### **Method 3: Reverse Calculation**
\`\`\`
CP = MP Ã— (1 - Discount%/100) / (1 + Profit%/100)
\`\`\`

---

## ðŸ”¢ Examples of MP Calculations

### **Example 1: Profit-Based MP**
**Problem:** CP = â‚¹600, profit 40%, discount 10%. Find MP.

**Solution:**
- First, calculate SP without discount
- SP = 600 Ã— (1 + 40/100) = 600 Ã— 1.4 = â‚¹840
- MP = 840 / (1 - 10/100) = 840 / 0.9 = â‚¹933.33

### **Example 2: Discount-Based MP**
**Problem:** SP = â‚¹720, discount 20%. Find MP.

**Solution:**
- MP = 720 / (1 - 20/100) = 720 / 0.8 = â‚¹900

### **Example 3: Complete Pricing**
**Problem:** CP = â‚¹500, profit 30%, discount 15%. Find MP and SP.

**Solution:**
- SP (before discount) = 500 Ã— 1.3 = â‚¹650
- MP = 650 / (1 - 0.15) = 650 / 0.85 â‰ˆ â‚¹764.71
- Actual SP = 764.71 Ã— 0.85 â‰ˆ â‚¹650

---

## ðŸ’¡ Pricing Psychology

### **1. Charm Pricing**
- Price ending in 9: â‚¹999 instead of â‚¹1000
- Creates perception of better deal

### **2. Prestige Pricing**
- High MP for luxury products
- Even without discounts, conveys quality

### **3. Odd-Even Pricing**
- Odd numbers for discounts
- Even numbers for quality perception

---

## ðŸŽ¯ Applications

### **1. Retail Strategy**
- Seasonal discount planning
- Promotional pricing
- Customer attraction

### **2. Brand Positioning**
- Luxury vs budget positioning
- Market segment targeting

### **3. Profit Planning**
- Margin calculations
- Break-even analysis

---

## ðŸ§® MP in Different Scenarios

### **1. Single Discount**
\`\`\`
MP = SP / (1 - D/100)
\`\`\`

### **2. Multiple Discounts**
\`\`\`
MP = SP / [(1 - D1/100) Ã— (1 - D2/100)]
\`\`\`

### **3. With Taxes**
\`\`\`
MP includes taxes or separate
\`\`\`

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Base**
âŒ "Discount on SP"
- Discount always on MP

### **Mistake 2: Double Discount**
âŒ Applying discount twice
- Single application unless specified

### **Mistake 3: Ignoring Taxes**
âŒ MP before or after taxes
- Clarify tax inclusion

---

## ðŸŽ¯ Practice Problems

1. SP â‚¹800, discount 20%. Find MP.
2. CP â‚¹600, profit 25%, discount 10%. Find MP.
3. MP â‚¹1200, discount 15%. Find SP.

**Answers:** â‚¹1000, â‚¹857.14, â‚¹1020

Master marked price calculations for effective retail pricing! ðŸ†`
};

