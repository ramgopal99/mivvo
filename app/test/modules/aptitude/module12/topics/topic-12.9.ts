import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_9: SubLesson = {
  id: "12.9",
  title: 'Finding Quantity of Each Ingredient',
  status: 'completed',
  content: `# 🔍 Finding Quantity of Each Ingredient

Master techniques to determine the quantity of each ingredient in a mixture based on given conditions and final mixture properties.

---

## 🎯 Quantity Finding Concept

**Finding ingredient quantities** involves working backwards from final mixture properties to determine original quantities of each ingredient.

### **Common Scenarios**
- **Given final mixture properties**
- **Known ingredient properties**
- **Target specifications met**

---

## 📊 Quantity Finding Methods

### 1. **Direct Proportion Method**
\`\`\`
When ratios or percentages are given
Use proportion formulas
\`\`\`

### 2. **Equation Method**
\`\`\`
Set up equations based on mixture properties
Solve for unknown quantities
\`\`\`

### 3. **Alligation Reverse Method**
\`\`\`
Work backwards from alligation result
Determine individual quantities
\`\`\`

---

## 🧮 Quantity Finding Examples

### Example 1: Ratio Given
**Mixture of milk:water = 4:1. Total 45 liters. Find milk and water quantities.**

**Solution:**
- Total parts = 4 + 1 = 5
- Milk quantity = (4/5) × 45 = 36 liters
- Water quantity = (1/5) × 45 = 9 liters

### Example 2: Cost-Based
**Two types sugar: Rs. 40/kg, Rs. 50/kg. Mixture Rs. 45/kg. Ratio 1:2. Find quantities if total 30 kg.**

**Solution:**
- Ratio 1:2, total parts = 3
- Quantity A = (1/3) × 30 = 10 kg at Rs. 40
- Quantity B = (2/3) × 30 = 20 kg at Rs. 50
- Verify: Cost = (10×40 + 20×50)/30 = (400 + 1000)/30 = 1400/30 = Rs. 46.67/kg
- Wait, doesn't match Rs. 45/kg. Let me recalculate.

Actual: For Rs. 45/kg average:
Let x kg of Rs. 40/kg, (30-x) kg of Rs. 50/kg
40x + 50(30-x) = 45×30
40x + 1500 - 50x = 1350
1500 - 10x = 1350
10x = 150
x = 15 kg
A: 15 kg, B: 15 kg

### Example 3: Concentration-Based
**Two solutions: 20% and 60% acid. Mixed to get 40% acid. Ratio 1:2. Find quantities for 30 liters mixture.**

**Solution:**
- Ratio 1:2, total parts = 3
- 20% solution = (1/3) × 30 = 10 liters
- 60% solution = (2/3) × 30 = 20 liters
- Verify: Acid = (0.2×10 + 0.6×20) = (2 + 12) = 14 liters
- Concentration = 14/30 = 46.67%, not 40%. Wrong ratio.

Correct ratio using alligation: 60, 20, mean 40
Ratio = (40-20):(60-40) = 20:20 = 1:1
For 30L: 15L each

---

## 🎯 Reverse Engineering Techniques

### **From Final Mixture**
1. **Identify known properties**
2. **Set up equations**
3. **Solve for unknowns**
4. **Verify solution**

### **Using Alligation**
\`\`\`
Alligation gives ratio
Ratio gives relative quantities
Find absolute quantities from total
\`\`\`

### **Cost-Volume Analysis**
\`\`\`
Cost = Quantity × Price
Total cost = Sum of individual costs
\`\`\`

---

## 🧠 Exam Tricks & Shortcuts

### **Ratio to Quantity**
\`\`\`
If ratio a:b and total T:
Quantity A = (a/(a+b)) × T
Quantity B = (b/(a+b)) × T
\`\`\`

### **Percentage Method**
\`\`\`
If A is p% of mixture:
Quantity A = (p/100) × Total
\`\`\`

### **Equation Setup**
\`\`\`
Let quantities be x, y, z
Set up: x + y + z = Total
And property equations
\`\`\`

### **Alligation Quantity**
\`\`\`
Ratio r:s means r parts + s parts = total
Each part = Total / (r+s)
\`\`\`

---

## 🔢 Advanced Quantity Finding

### **Multiple Constraints**
- **Cost + quality requirements**
- **Multiple properties**
- **Complex relationships**

### **Variable Analysis**
- **Unknown totals**
- **Unknown ratios**
- **Iterative solutions**

---

## 🎯 Complex Examples

### Example 4: Cost and Quality
**Two batches: Batch A (30 kg, 40% pure), Batch B (x kg, 60% pure). Mixture 50% pure. Find x.**

**Solution:**
- Let total mixture = 30 + x kg
- Pure ingredient from A: 0.4 × 30 = 12 kg
- Pure ingredient from B: 0.6x kg
- Total pure = 12 + 0.6x kg
- Mixture purity = (12 + 0.6x)/(30 + x) = 0.5
- 12 + 0.6x = 0.5(30 + x)
- 12 + 0.6x = 15 + 0.5x
- 0.1x = 3
- x = 30 kg

### Example 5: Three Ingredients
**A, B, C mixed. A:B = 2:3, B:C = 1:2. Total 42 liters. Find individual quantities.**

**Solution:**
- A:B = 2:3, B:C = 1:2
- A:B:C = 2:3:6 (multiply B:C by 3)
- Total parts = 2+3+6 = 11
- A = (2/11)×42 ≈ 7.64L
- B = (3/11)×42 ≈ 11.45L
- C = (6/11)×42 ≈ 22.91L

### Example 6: Reverse Alligation
**Alligation gives ratio 3:2 for two ingredients. Total mixture 50 kg. Find quantities.**

**Solution:**
- Ratio 3:2, total parts = 5
- Quantity A = (3/5)×50 = 30 kg
- Quantity B = (2/5)×50 = 20 kg

---

## 🚨 Quantity Finding Mistakes

1. **Ratio Misapplication**: Wrong ratio interpretation
2. **Equation Errors**: Incorrect equation setup
3. **Unit Inconsistency**: Different measurement units
4. **Verification Omission**: Not checking final mixture
5. **Proportion Errors**: Wrong part-to-whole calculations

---

## 🎯 Practice Problems

**1.** Milk:water = 3:2, 40L total. Milk quantity?
**2.** Rs.30/kg, Rs.50/kg sugar. Rs.40/kg mixture, 2:1 ratio. Quantities for 30kg?
**3.** 25%, 75% solutions. 50% mixture, 1:1 ratio. Quantities for 20L?
**4.** A:B:C = 2:3:4, 45L total. Individual quantities?
**5.** Two batches: 20kg(30%), x kg(70%). Mixture 50%. Find x?

**Answers:** 1. 24L, 2. 20kg, 10kg, 3. 10L each, 4. 10L, 15L, 20L, 5. 40kg

---

## 🎓 Quantity Finding Strategies

1. **Identify known ratios** and properties
2. **Set up proportion equations**
3. **Use alligation** for ratio determination
4. **Solve systematically** for unknowns
5. **Verify solution** with original conditions

Master finding ingredient quantities and work backwards from mixture properties! 🏆`
};

