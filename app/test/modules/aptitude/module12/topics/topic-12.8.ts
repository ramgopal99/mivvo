import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_8: SubLesson = {
  id: "12.8",
  title: 'Mixing Two or More Ingredients',
  status: 'completed',
  content: `# 🥣 Mixing Two or More Ingredients

Learn systematic approaches for mixing multiple ingredients with different properties to achieve target mixtures.

---

## 🎯 Multiple Ingredient Mixing

**Multiple ingredient mixing** involves combining two or more ingredients with different properties to create a mixture with desired characteristics.

### **Key Considerations**
- **Different prices/costs**
- **Different concentrations**
- **Different qualities**
- **Target specifications**

---

## 📊 Mixing Strategies

### 1. **Cost-Based Mixing**
\`\`\`
Find quantities to achieve target average cost
Use weighted average formula
\`\`\`

### 2. **Concentration-Based Mixing**
\`\`\`
Mix to achieve target concentration
Use alligation or direct proportion
\`\`\`

### 3. **Ratio-Based Mixing**
\`\`\`
Mix in specific ratios
Calculate required quantities
\`\`\`

---

## 🧮 Mixing Examples

### Example 1: Cost Optimization
**Three types rice: Rs. 20/kg, Rs. 30/kg, Rs. 40/kg. Mix to get Rs. 25/kg. Find ratio.**

**Solution:**
- Let quantities be x, y, z kg
- Cost equation: 20x + 30y + 40z = 25(x + y + z)
- Simplify: 20x + 30y + 40z = 25x + 25y + 25z
- 5y + 15z = 5x
- x = y + 3z  (1)
- Assume z = k, then y = m, x = m + 3k
- Ratio x:y:z = (m+3k):m:k
- Common ratios: let m=k=1, x=4, ratio 4:1:1
- Check: (20×4 + 30×1 + 40×1)/(4+1+1) = (80+30+40)/6 = 150/6 = 25 ✓

### Example 2: Concentration Mixing
**Two acids: 30% and 70%. Mix 4 liters each. Final concentration?**

**Solution:**
- Acid from first: 30% of 4L = 1.2L
- Acid from second: 70% of 4L = 2.8L
- Total acid = 1.2 + 2.8 = 4L
- Total volume = 8L
- Final concentration = 50%

### Example 3: Quality Mixing
**Two grades: A (80% pure), B (60% pure). Mix to get 70% pure. Ratio?**

**Solution:**
- Use alligation: Higher=80, Lower=60, Mean=70
- Ratio = (70-60):(80-70) = 10:10 = 1:1

---

## 🎯 Systematic Approach

### **Step-by-Step Method**
1. **Identify target property** (cost, concentration, etc.)
2. **List ingredient properties**
3. **Set up equations** based on requirements
4. **Solve for unknowns**
5. **Verify solution**

### **Alligation for Multiple Ingredients**
\`\`\`
Use pairwise alligation
Combine results systematically
\`\`\`

---

## 🧠 Exam Tricks & Shortcuts

### **Variable Assignment**
\`\`\`
Let quantities be x, y, z
Set up cost/concentration equations
Solve system of equations
\`\`\`

### **Ratio Assumption**
\`\`\`
Assume ratio, calculate average
Adjust if needed
\`\`\`

### **Common Difference Method**
\`\`\`
Find how much each ingredient differs from target
Ratio = Differences inversely
\`\`\`

### **Equal Quantity Assumption**
\`\`\`
Assume equal quantities first
Adjust ratios based on differences
\`\`\`

---

## 🔢 Advanced Mixing Problems

### **Complex Constraints**
- **Multiple properties** (cost + quality)
- **Quantity limits**
- **Availability constraints**

### **Optimization Problems**
- **Minimum cost** for target quality
- **Maximum quality** for given cost
- **Balanced properties**

---

## 🎯 Complex Examples

### Example 4: Three Ingredients Cost
**A Rs. 15/kg, B Rs. 20/kg, C Rs. 25/kg. Mix in 2:3:1 ratio. Average cost?**

**Solution:**
- Ratio 2:3:1, total parts = 6
- Average cost = (2×15 + 3×20 + 1×25)/6 = (30 + 60 + 25)/6 = 115/6 ≈ Rs. 19.17/kg

### Example 5: Target with Constraints
**Two solutions: 25% and 75% acid. Mix 100L total. Get 50% acid. Quantities?**

**Solution:**
- Let x liters of 25% solution
- (100-x) liters of 75% solution
- Acid equation: 0.25x + 0.75(100-x) = 0.50 × 100
- 0.25x + 75 - 0.75x = 50
- 75 - 0.5x = 50
- 0.5x = 25
- x = 50L
- 25% solution: 50L, 75% solution: 50L

### Example 6: Quality and Cost
**Two grades tea: Grade A Rs. 200/kg (80% quality), Grade B Rs. 150/kg (60% quality). Mix to get 70% quality at minimum cost.**

**Solution:**
- Use alligation for quality: 80, 60, mean 70
- Ratio = (70-60):(80-70) = 10:10 = 1:1
- Cost = (200+150)/2 = Rs. 175/kg
- Since ratio is 1:1, this gives minimum cost for 70% quality

---

## 🚨 Multiple Ingredient Mistakes

1. **Equation Setup**: Wrong variable relationships
2. **Unit Consistency**: Different units not converted
3. **Ratio Application**: Wrong ratio interpretation
4. **Target Achievement**: Not meeting required specifications
5. **Verification**: Not checking final mixture properties

---

## 🎯 Practice Problems

**1.** A Rs.25/kg, B Rs.35/kg. Mix 2:3 ratio. Average cost?
**2.** 40%, 60% solutions. Mix for 50%. If equal volumes, concentration?
**3.** Three acids 20%,30%,50%. Mix 1:2:1. Final %?
**4.** A Rs.20/kg, B Rs.30/kg, C Rs.40/kg. Mix for Rs.28/kg. Ratio?
**5.** Two qualities 70%, 90%. Mix 3:2 ratio. Final quality?

**Answers:** 1. Rs. 31/kg, 2. 50%, 3. 33.33%, 4. 2:1:1, 5. 78%

---

## 🎓 Multiple Ingredient Strategies

1. **Identify target property** clearly
2. **Set up appropriate equations**
3. **Use alligation** when applicable
4. **Solve systematically** for unknowns
5. **Verify solution** meets all requirements

Master multiple ingredient mixing and create perfect mixtures! 🏆`
};

