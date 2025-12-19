import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_11: SubLesson = {
  id: "7.11",
  title: 'Gain or Loss on Cost Price & Selling Price',
  status: 'completed',
  content: `# 📊 Gain or Loss on Cost Price & Selling Price

Learn to calculate profit/loss percentages based on both cost price and selling price! This dual perspective helps understand profitability from different angles. Master both CP-based and SP-based calculations.

---

## 🎯 Dual Perspective on Profit/Loss

Profit and loss can be expressed as percentages of either cost price or selling price. Each provides different insights into business performance.

### **Two Methods**
1. **Profit/Loss % on CP**: Traditional method
2. **Profit/Loss % on SP**: Alternative view

### **Key Formulas**
\`\`\`
Profit/Loss % on CP = [(SP - CP) / CP] × 100%
Profit/Loss % on SP = [(SP - CP) / SP] × 100%
\`\`\`

---

## 📊 Relationship Between the Two

### **Mathematical Relationship**
\`\`\`
Profit % on SP = (Profit % on CP) / (1 + Profit % on CP/100)
Loss % on SP = (Loss % on CP) / (1 - Loss % on CP/100)
\`\`\`

### **Example**
Profit 25% on CP
- Profit % on SP = 25 / (1 + 0.25) = 25/1.25 = 20%

**Explanation:** 
- CP = ₹100, SP = ₹125
- Profit on CP = 25%
- Profit on SP = (25/125) × 100% = 20%

---

## 🔢 Examples

### **Example 1: Profit Case**
**Problem:** SP = ₹1200, CP = ₹1000. Find both percentages.

**Solution:**
- Profit % on CP = [(1200-1000)/1000] × 100% = 20%
- Profit % on SP = [(1200-1000)/1200] × 100% = 16.67%

### **Example 2: Loss Case**
**Problem:** SP = ₹800, CP = ₹1000. Find both percentages.

**Solution:**
- Loss % on CP = [(1000-800)/1000] × 100% = 20%
- Loss % on SP = [(1000-800)/800] × 100% = 25%

### **Example 3: Finding Missing Value**
**Problem:** CP = ₹1500, profit 25% on CP. Find profit % on SP.

**Solution:**
- SP = 1500 × 1.25 = ₹1875
- Profit % on SP = (375/1875) × 100% = 20%

---

## 💡 Interpretation

### **CP-Based Percentage**
- Shows return on investment
- Standard business metric
- Higher % means better investment

### **SP-Based Percentage**
- Shows profit margin on sales
- Important for pricing strategy
- Used in financial analysis

### **When to Use Each**
- **CP %**: Investment decisions, profitability comparison
- **SP %**: Margin analysis, pricing strategy

---

## 🎯 Applications

### **1. Business Analysis**
- Profit margin calculations
- Pricing strategy evaluation
- Comparative profitability

### **2. Financial Reporting**
- Gross margin calculations
- Profitability ratios
- Performance metrics

### **3. Investment Decisions**
- Return on cost analysis
- Margin-based pricing
- Profit optimization

---

## 🧮 Advanced Calculations

### **1. Converting Between Methods**
\`\`\`
If Profit % on CP = P%, then Profit % on SP = [P/(100+P)] × 100%
If Profit % on SP = M%, then Profit % on CP = [M/(100-M)] × 100%
\`\`\`

### **2. Break-even Analysis**
\`\`\`
Profit % on SP helps determine sustainable pricing
\`\`\`

### **3. Comparative Analysis**
\`\`\`
Same profit can show different margins based on calculation method
\`\`\`

---

## 📈 Industry Applications

### **1. Retail**
- Gross margin analysis
- Pricing strategy
- Profit optimization

### **2. Manufacturing**
- Cost-plus pricing
- Margin maintenance
- Profit planning

### **3. Service Industry**
- Service pricing
- Profit margin analysis
- Fee structure optimization

---

## 🚨 Common Mistakes

### **Mistake 1: Confusing Methods**
❌ "Profit % on SP = Profit % on CP"
- They are different calculations

### **Mistake 2: Wrong Base**
❌ Using wrong denominator
- CP % uses CP, SP % uses SP

### **Mistake 3: Negative Interpretations**
❌ Loss % on SP can't be negative
- Loss percentages are always positive

---

## 🎯 Practice Problems

### **Basic Conversions:**
1. Profit 20% on CP. Find profit % on SP.
2. Loss 25% on CP. Find loss % on SP.
3. Profit 30% on SP. Find profit % on CP.

### **Application Problems:**
1. CP ₹800, SP ₹1000. Find both percentages.
2. SP ₹600, loss 20% on CP. Find CP and loss % on SP.
3. Profit 25% on SP, CP ₹1200. Find SP and profit % on CP.

**Answers:**
Basic: 16.67%, 33.33%, 42.86%
Applications: 25% on CP, 16.67% on SP; CP ₹750, loss 33.33% on SP; SP ₹1600, profit 33.33% on CP

Master both profit/loss percentage methods for comprehensive business analysis! 🏆`
};
