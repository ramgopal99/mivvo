import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_8: SubLesson = {
  id: "6.8",
  title: 'Combined Average',
  status: 'completed',
  content: "`# ðŸ”— Combined Average

Learn to find the overall average when combining multiple groups! Combined averages are essential for merging data from different sources, classes, or time periods. Master the weighted average approach for groups.

---

## ðŸŽ¯ What is Combined Average?

**Combined Average** finds the overall average when two or more groups with known averages and sizes are combined.

### **Formula**
\`"\`\`
Combined Average = (nâ‚Aâ‚ + nâ‚‚Aâ‚‚ + ... + nâ‚–Aâ‚–) Ã· (nâ‚ + nâ‚‚ + ... + nâ‚–)
\`\`\`

**Where:**
- nâ‚, nâ‚‚ = sizes of groups
- Aâ‚, Aâ‚‚ = averages of groups

---

## ðŸ“Š Step-by-Step Calculation

### **Example 1: Two Classes**
**Problem:** Class A: 30 students, average 75. Class B: 20 students, average 80. Combined average?

**Solution:**
- Combined Average = (30Ã—75 + 20Ã—80) Ã· (30+20)
- = (2250 + 1600) Ã· 50
- = 3850 Ã· 50 = 77

### **Example 2: Three Groups**
**Problem:** Group X: 15 items, average 45. Group Y: 25 items, average 52. Group Z: 10 items, average 48.

**Solution:**
- Combined = (15Ã—45 + 25Ã—52 + 10Ã—48) Ã· (15+25+10)
- = (675 + 1300 + 480) Ã· 50
- = 2455 Ã· 50 = 49.1

---

## ðŸ”¢ Applications

### **1. Class Averages**
- Combining different class sections
- School-wide performance

### **2. Business Metrics**
- Department performance
- Regional sales averages

### **3. Sports Statistics**
- Team vs team combinations
- Tournament averages

### **4. Financial Analysis**
- Portfolio combinations
- Multi-period returns

---

## ðŸ’¡ Quick Tricks

### **Trick 1: Equal Group Sizes**
\`\`\`
Combined = (Aâ‚ + Aâ‚‚) Ã· 2
\`\`\`

### **Trick 2: Percentage Weights**
\`\`\`
Convert sizes to percentages for mental math
\`\`\`

### **Trick 3: Difference from Mean**
\`\`\`
Calculate deviation from assumed average
\`\`\`

---

## ðŸŽ¯ Properties

### **1. Weighted Nature**
Larger groups have more influence.

### **2. Between Extremes**
Combined average lies between the individual averages.

### **3. Effect of Group Sizes**
More weight to larger groups.

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Simple Average**
âŒ Adding averages and dividing by 2
- Must weight by group sizes

### **Mistake 2: Wrong Weights**
âŒ Using averages as weights
- Use group sizes as weights

### **Mistake 3: Missing Terms**
âŒ Forgetting to include all groups
- Include all nA terms and all n terms

---

## ðŸŽ¯ Practice Problems

### **Two Groups:**
1. Class A: 25 students, avg 70. Class B: 35 students, avg 75. Combined?
2. Team X: 12 players, avg 85. Team Y: 15 players, avg 82. Combined?

### **Three Groups:**
1. Group P: 20 items, avg 45. Group Q: 30 items, avg 52. Group R: 25 items, avg 48. Combined?
2. Section A: 18 students, avg 78. Section B: 22 students, avg 82. Section C: 15 students, avg 75. Combined?

**Answers:**
Two groups: (25Ã—70 + 35Ã—75)Ã·60 = 73.75, (12Ã—85 + 15Ã—82)Ã·27 â‰ˆ 83.3
Three groups: (20Ã—45 + 30Ã—52 + 25Ã—48)Ã·75 = 49, (18Ã—78 + 22Ã—82 + 15Ã—75)Ã·55 â‰ˆ 78.8

Master combined averages for multi-group analysis! ðŸ†`
};
