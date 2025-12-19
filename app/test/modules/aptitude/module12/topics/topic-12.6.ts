import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_6: SubLesson = {
  id: "12.6",
  title: 'Replacement Problems',
  status: 'completed',
  content: `# 🔄 Replacement Problems

Master replacement scenarios in mixtures - where one ingredient is replaced by another, changing the mixture composition.

---

## 🎯 Replacement Concept

**Replacement problems** involve removing some quantity of a mixture and replacing it with a different ingredient, or replacing one ingredient with another.

### **Key Scenarios**
- **Mixture replacement**: Replace part of mixture with pure ingredient
- **Ingredient replacement**: Replace one ingredient with another
- **Water/oil addition**: Adding solvent to solution

---

## 📊 Replacement Types

### 1. **Replacing Mixture with Pure Ingredient**
\`\`\`
Remove x liters of mixture
Add x liters of pure ingredient
New concentration increases
\`\`\`

### 2. **Replacing with Different Ingredient**
\`\`\`
Remove x liters of ingredient A
Add x liters of ingredient B
Composition changes
\`\`\`

### 3. **Adding Solvent**
\`\`\`
Add water/oil to existing solution
Concentration decreases
Volume increases
\`\`\`

---

## 🧮 Replacement Examples

### Example 1: Milk Replacement
**20 liters milk solution, 25% milk. Remove 5 liters, add 5 liters pure milk. New concentration?**

**Solution:**
- Initial milk = 25% of 20 = 5 liters
- Remove 5 liters mixture containing 25% milk = 1.25 liters milk
- Remaining milk = 5 - 1.25 = 3.75 liters
- Add 5 liters pure milk
- Total milk = 3.75 + 5 = 8.75 liters
- Total volume = 20 - 5 + 5 = 20 liters
- New concentration = (8.75/20) × 100% = 43.75%

### Example 2: Water Addition
**10 liters 40% solution. Add 5 liters water. New concentration?**

**Solution:**
- Initial solute = 40% of 10 = 4 liters
- Add 5 liters water (no solute)
- Total volume = 10 + 5 = 15 liters
- Total solute = 4 liters
- New concentration = (4/15) × 100% = 26.67%

### Example 3: Ingredient Replacement
**20 liters mixture, milk:water = 3:2. Replace 4 liters water with 4 liters milk. New ratio?**

**Solution:**
- Initial milk = (3/5) × 20 = 12 liters
- Initial water = (2/5) × 20 = 8 liters
- Remove 4 liters water → remaining water = 8 - 4 = 4 liters
- Add 4 liters milk → total milk = 12 + 4 = 16 liters
- Total volume = 20 liters
- New ratio = 16:4 = 4:1

---

## 🎯 Replacement Strategies

### **Step-by-Step Method**
1. **Calculate initial quantities** of each ingredient
2. **Account for removal** - subtract removed quantities
3. **Account for addition** - add new quantities
4. **Calculate new total volume**
5. **Find new concentrations/ratios**

### **Concentration Change Formula**
\`\`\`
New concentration = (Initial solute - Removed solute + Added solute) / New volume
\`\`\`

---

## 🧠 Exam Tricks & Shortcuts

### **Quick Concentration Change**
\`\`\`
For adding pure ingredient:
New % = Old % + (Replacement % - Old %) × (Replaced volume / Total volume)
\`\`\`

### **Water Addition Shortcut**
\`\`\`
New concentration = Old concentration × (Old volume / New volume)
\`\`\`

### **Equal Volume Replacement**
\`\`\`
When replacement volume = removed volume:
Net change = Added ingredient - Removed ingredient
\`\`\`

### **Percentage Method**
\`\`\`
Work with percentages and absolute quantities
Convert to common units
\`\`\`

---

## 🔢 Advanced Replacement

### **Multiple Replacements**
- **Sequential replacements**
- **Different replacement volumes**
- **Complex ingredient changes**

### **Conditional Replacements**
- **Target concentration achievement**
- **Minimum/maximum constraints**
- **Cost optimization**

---

## 🎯 Complex Examples

### Example 4: Multiple Steps
**10 liters 30% solution. Replace 3 liters with pure solvent. Then add 2 liters pure solute. Final concentration?**

**Solution:**
- Step 1: Remove 3L mixture (0.9L solute), add 3L solvent (0L solute)
- Remaining solute = 3 - 0.9 = 2.1L
- Volume = 10L
- Step 2: Add 2L pure solute
- Total solute = 2.1 + 2 = 4.1L
- Total volume = 10 + 2 = 12L
- Final concentration = (4.1/12) × 100% ≈ 34.17%

### Example 5: Target Concentration
**20L 25% solution. How much water to add to make 20% solution?**

**Solution:**
- Initial solute = 25% of 20 = 5L
- Let water added = x liters
- Final volume = 20 + x
- Final concentration = 5/(20+x) = 0.20
- 5 = 0.20(20 + x)
- 20 + x = 5/0.20 = 25
- x = 5 liters

### Example 6: Replacement with Cost
**Milk Rs. 40/L, water free. 100L mixture Rs. 20/L. Replace 20L with pure milk. New average price?**

**Solution:**
- Initial milk = (20/40) × 100 = 50L (since Rs. 20/L average)
- Initial water = 50L
- Remove 20L mixture containing milk:water = 20:20 = 10L milk, 10L water
- Remaining milk = 50 - 10 = 40L
- Remaining water = 50 - 10 = 40L
- Add 20L pure milk
- Total milk = 40 + 20 = 60L
- Total volume = 100L
- New average price = (60×40 + 40×0)/100 = Rs. 24/L

---

## 🚨 Replacement Mistakes

1. **Removal Calculation**: Wrong proportion of ingredients removed
2. **Volume Tracking**: Forgetting volume changes
3. **Solute Conservation**: Solute quantity should remain constant (except for addition/removal)
4. **Order of Operations**: Wrong sequence of replacements
5. **Final Volume**: Incorrect total volume calculation

---

## 🎯 Practice Problems

**1.** 15L 40% solution. Remove 3L, add 3L pure solute. New %?
**2.** 25L milk-water 2:3. Replace 5L water with milk. New ratio?
**3.** 20L 30% solution. Add 10L water. New %?
**4.** 50L mixture Rs. 25/L. Replace 10L with Rs. 40/L ingredient. New price?
**5.** 10L 50% solution. Replace 4L with pure solvent. New %?

**Answers:** 1. 50%, 2. 3:2, 3. 20%, 4. Rs. 26/L, 5. 30%

---

## 🎓 Replacement Strategies

1. **Track ingredient quantities** separately
2. **Account for volume changes** accurately
3. **Calculate removed amounts** proportionally
4. **Apply additions** correctly
5. **Verify final concentrations** make sense

Master replacement problems and handle mixture modification scenarios! 🏆`
};
