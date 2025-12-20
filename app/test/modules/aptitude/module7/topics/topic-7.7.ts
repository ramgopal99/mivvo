import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_7: SubLesson = {
  id: "7.7",
  title: 'Marked Price (MP)',
  status: 'completed',
  content: `# 🏷️ Marked Price (MP)

Understand marked price concepts! Marked Price (MP) is the price printed on products before any discounts. It serves as the reference point for discount calculations and perceived value. Master MP calculations for retail pricing strategies.

---

## 🎯 What is Marked Price?

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

## 📊 MP Calculation Methods

### **Method 1: From CP and Profit**
\`\`\`
MP = CP × (1 + Profit%/100)
\`\`\`

**Example:** CP = ₹800, desired profit 25%
- MP = 800 × 1.25 = ₹1000

### **Method 2: From SP and Discount**
\`\`\`
MP = SP / (1 - Discount%/100)
\`\`\`

**Example:** SP = ₹800, discount 20%
- MP = 800 / 0.8 = ₹1000

### **Method 3: Reverse Calculation**
\`\`\`
CP = MP × (1 - Discount%/100) / (1 + Profit%/100)
\`\`\`

---

## 🔢 Examples of MP Calculations

### **Example 1: Profit-Based MP**
**Problem:** CP = ₹600, profit 40%, discount 10%. Find MP.

**Solution:**
- First, calculate SP without discount
- SP = 600 × (1 + 40/100) = 600 × 1.4 = ₹840
- MP = 840 / (1 - 10/100) = 840 / 0.9 = ₹933.33

### **Example 2: Discount-Based MP**
**Problem:** SP = ₹720, discount 20%. Find MP.

**Solution:**
- MP = 720 / (1 - 20/100) = 720 / 0.8 = ₹900

### **Example 3: Complete Pricing**
**Problem:** CP = ₹500, profit 30%, discount 15%. Find MP and SP.

**Solution:**
- SP (before discount) = 500 × 1.3 = ₹650
- MP = 650 / (1 - 0.15) = 650 / 0.85 ≈ ₹764.71
- Actual SP = 764.71 × 0.85 ≈ ₹650

---

## 💡 Pricing Psychology

### **1. Charm Pricing**
- Price ending in 9: ₹999 instead of ₹1000
- Creates perception of better deal

### **2. Prestige Pricing**
- High MP for luxury products
- Even without discounts, conveys quality

### **3. Odd-Even Pricing**
- Odd numbers for discounts
- Even numbers for quality perception

---

## 🎯 Applications

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

## 🧮 MP in Different Scenarios

### **1. Single Discount**
\`\`\`
MP = SP / (1 - D/100)
\`\`\`

### **2. Multiple Discounts**
\`\`\`
MP = SP / [(1 - D1/100) × (1 - D2/100)]
\`\`\`

### **3. With Taxes**
\`\`\`
MP includes taxes or separate
\`\`\`

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Base**
❌ "Discount on SP"
- Discount always on MP

### **Mistake 2: Double Discount**
❌ Applying discount twice
- Single application unless specified

### **Mistake 3: Ignoring Taxes**
❌ MP before or after taxes
- Clarify tax inclusion

---

## 🎯 Practice Problems

1. SP ₹800, discount 20%. Find MP.
2. CP ₹600, profit 25%, discount 10%. Find MP.
3. MP ₹1200, discount 15%. Find SP.

**Answers:** ₹1000, ₹857.14, ₹1020

Master marked price calculations for effective retail pricing! 🏆`
};

