import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_7: SubLesson = {
  id: "12.7",
  title: 'Repeated Replacement',
  status: 'completed',
  content: "`# ðŸ” Repeated Replacement

Master repeated replacement problems - where the same replacement operation is performed multiple times on a mixture.

---

## ðŸŽ¯ Repeated Replacement Concept

**Repeated replacement** occurs when the same replacement process is applied multiple times to the same mixture, gradually changing its composition.

### **Common Scenarios**
- **Water replacement**: Replacing mixture with water
- **Pure ingredient replacement**: Replacing with pure solute
- **Equal volume replacement**: Same volume removed and added

---

## ðŸ“Š Repeated Replacement Method

### 1. **Single Replacement Formula**
\`"\`\`
After one replacement:
New concentration = Old concentration Ã— (1 - r/n) + r Ã— C
\`\`\`

Where:
- **r**: Replacement ratio (volume replaced/total volume)
- **n**: Total parts (1/r)
- **C**: Concentration of replacement ingredient

### 2. **Multiple Replacement Formula**
\`\`\`
After k replacements:
New concentration = Initial concentration Ã— (1 - r)^k + C Ã— [1 - (1 - r)^k]
\`\`\`

### 3. **Shortcut for Equal Volume**
\`\`\`
Each replacement: Concentration Ã— (1 - r) + C Ã— r
Apply sequentially for multiple replacements
\`\`\`

---

## ðŸ§® Repeated Replacement Examples

### Example 1: Water Replacement
**10 liters 40% solution. Replace 2 liters with water twice. Final concentration?**

**Solution:**
- r = 2/10 = 0.2
- After first replacement:
- New concentration = 40% Ã— (1 - 0.2) + 0% Ã— 0.2 = 32%
- After second replacement:
- New concentration = 32% Ã— (1 - 0.2) + 0% Ã— 0.2 = 25.6%

### Example 2: Pure Solute Replacement
**20 liters 30% solution. Replace 4 liters with pure solute thrice. Final concentration?**

**Solution:**
- r = 4/20 = 0.2
- C = 100%
- After first: 30% Ã— 0.8 + 100% Ã— 0.2 = 24% + 20% = 44%
- After second: 44% Ã— 0.8 + 100% Ã— 0.2 = 35.2% + 20% = 55.2%
- After third: 55.2% Ã— 0.8 + 100% Ã— 0.2 = 44.16% + 20% = 64.16%

### Example 3: Same Concentration Replacement
**15 liters 50% solution. Replace 3 liters with same concentration solution twice. Concentration?**

**Solution:**
- r = 3/15 = 0.2, C = 50%
- After first: 50% Ã— 0.8 + 50% Ã— 0.2 = 40% + 10% = 50%
- After second: 50% Ã— 0.8 + 50% Ã— 0.2 = 40% + 10% = 50%
- Concentration remains 50% (no change)

---

## ðŸŽ¯ Special Cases

### **Water Replacement**
\`\`\`
New concentration = Initial concentration Ã— (1 - r)^k
\`\`\`

### **Pure Solute Replacement**
\`\`\`
New concentration = Initial + (100 - Initial) Ã— [1 - (1 - r)^k]
\`\`\`

### **Same Concentration**
\`\`\`
No change in concentration
\`\`\`

---

## ðŸ§  Exam Tricks & Shortcuts

### **Geometric Series Method**
\`\`\`
For water replacement:
C_k = Câ‚€ Ã— (1 - r)^k
\`\`\`

### **Sequential Calculation**
\`\`\`
Apply formula step by step
Use calculator for powers
\`\`\`

### **Percentage Method**
\`\`\`
Work with decimal fractions
Multiply by 100 at end
\`\`\`

### **Memory Method**
\`\`\`
Each replacement multiplies remaining concentration by (1-r)
Adds r Ã— C each time
\`\`\`

---

## ðŸ”¢ Advanced Repeated Replacement

### **Variable Replacement Volumes**
- **Different volumes each time**
- **Changing replacement ingredients**
- **Complex sequences**

### **Target Achievement**
- **How many replacements for target concentration**
- **Minimum/maximum replacements needed**

### **Real-World Applications**
- **Chemical processing**
- **Water treatment**
- **Industrial mixing**

---

## ðŸŽ¯ Complex Examples

### Example 4: Target Concentration
**25 liters 60% solution. Replace 5 liters with water each time. How many replacements to reach 30%?**

**Solution:**
- r = 5/25 = 0.2
- Formula: 60 Ã— (0.8)^k = 30
- (0.8)^k = 30/60 = 0.5
- 0.8^k = 0.5
- k Ã— ln(0.8) = ln(0.5)
- k = ln(0.5)/ln(0.8) â‰ˆ (-0.693)/ (-0.223) â‰ˆ 3.11
- Need 4 replacements (after 3: 60Ã—0.8Â³ = 60Ã—0.512 = 30.72%, after 4: 30.72Ã—0.8 = 24.58%)

### Example 5: Mixed Replacement
**30 liters 40% solution. First replace 6L with pure solute, then 6L with water. Final concentration?**

**Solution:**
- First replacement (pure solute): r=6/30=0.2, C=100%
- New conc = 40% Ã— 0.8 + 100% Ã— 0.2 = 32% + 20% = 52%
- Second replacement (water): r=6/30=0.2, C=0%
- New conc = 52% Ã— 0.8 + 0% Ã— 0.2 = 41.6%

### Example 6: Cost with Repeated Replacement
**20 kg mixture Rs. 50/kg. Replace 4 kg with Rs. 60/kg ingredient twice. Final price?**

**Solution:**
- Initial value = 20 Ã— 50 = Rs. 1000
- First replacement: Remove 4kg mixture (Rs. 50/kg) = Rs. 200, add 4kg @ Rs. 60 = Rs. 240
- Net addition = Rs. 40, total value = Rs. 1040
- Price = 1040/20 = Rs. 52/kg
- Second replacement: Remove 4kg @ Rs. 52/kg = Rs. 208, add 4kg @ Rs. 60 = Rs. 240
- Net addition = Rs. 32, total value = Rs. 1072
- Price = 1072/20 = Rs. 53.6/kg

---

## ðŸš¨ Repeated Replacement Mistakes

1. **Sequential Application**: Applying formula incorrectly multiple times
2. **Volume Consistency**: Same total volume assumption
3. **Concentration Units**: Mixing percentages and decimals
4. **Replacement Type**: Wrong concentration of replacement ingredient
5. **Final Calculation**: Incorrect final percentage calculation

---

## ðŸŽ¯ Practice Problems

**1.** 12L 50% solution. Replace 2L with water twice. Final %?
**2.** 16L 30% solution. Replace 4L with pure solute thrice. Final %?
**3.** 20L 40% solution. Replace 5L with same concentration twice. %?
**4.** 25L 60% solution. Replace 5L water. How many for 30%?
**5.** 18L 45% solution. Replace 3L pure solute, then 3L water. Final %?

**Answers:** 1. 32%, 2. 56.25%, 3. 40%, 4. 4 replacements, 5. 45%

---

## ðŸŽ“ Repeated Replacement Strategies

1. **Use sequential method** for accuracy
2. **Apply formula step by step** 
3. **Keep track of current concentration**
4. **Use consistent units** throughout
5. **Verify with logic** - concentration should change predictably

Master repeated replacement and handle iterative mixture changes! ðŸ†`
};

