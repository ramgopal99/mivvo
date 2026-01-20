import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_5: SubLesson = {
  id: "4.5",
  title: 'Successive Percentage Change',
  status: 'completed',
  content: "`# ðŸ”„ Successive Percentage Change

Master the art of calculating successive percentage changes! This advanced topic appears frequently in aptitude exams and requires careful understanding of compound effects. Learn why you can't just add percentages and how to calculate net change correctly.

---

## ðŸŽ¯ What is Successive Percentage Change?

**Successive Percentage Change** occurs when a quantity undergoes multiple percentage changes in sequence. The key insight: **You cannot simply add the percentages!**

### **Why Not Just Add?**
Because each percentage change is calculated on the current value, not the original value.

**Example:** â‚¹100 increased by 10%, then by 20%
- After 10% increase: â‚¹100 â†’ â‚¹110
- After 20% increase on â‚¹110: â‚¹110 â†’ â‚¹132
- Total increase: â‚¹32 (32%, not 30%)

---

## ðŸ“ˆ Key Formula for Successive Changes

### **Two Successive Changes**
\`"\`\`
Net% = A% + B% + (A% Ã— B%)/100%
\`\`\`

**Where:**
- A% = First percentage change
- B% = Second percentage change

### **Three Successive Changes**
\`\`\`
Net% = A% + B% + C% + (AB + BC + CA)/100% + (A% Ã— B% Ã— C%)/10000%
\`\`\`

---

## ðŸ”¢ Examples of Successive Changes

### **Example 1: Two Increases**
**Problem:** Price increased by 10%, then by 20%. Find net increase.

**Method 1: Step-by-step**
- Original: â‚¹100
- After 10% increase: 100 Ã— 1.10 = â‚¹110
- After 20% increase: 110 Ã— 1.20 = â‚¹132
- Net increase: (132 - 100) Ã· 100 Ã— 100% = 32%

**Method 2: Formula**
- Net% = 10% + 20% + (10% Ã— 20%)/100% = 30% + 2% = 32%

### **Example 2: Increase then Decrease**
**Problem:** Price increased by 25%, then decreased by 20%. Find net change.

**Formula:** Net% = 25% + (-20%) + (25% Ã— -20%)/100%
- = 25% - 20% - 5% = 0%

**Result:** Back to original price!

### **Example 3: Three Changes**
**Problem:** Salary increased by 10%, then 15%, then 20%. Find net increase.

**Formula:** Net% = 10 + 15 + 20 + (10Ã—15 + 15Ã—20 + 20Ã—10)/100 + (10Ã—15Ã—20)/10000%
- = 45% + (150 + 300 + 200)/100 + 3000/10000%
- = 45% + 650/100 + 0.3% = 45% + 6.5% + 0.3% = 51.8%

---

## ðŸ’¡ Shortcut Tricks

### **Trick 1: Same Direction Changes**
For two increases/decreases in same direction:
\`\`\`
Net% = A% + B% + (AÃ—B)/100%
\`\`\`

### **Trick 2: Opposite Direction Changes**
For increase then decrease (or vice versa):
\`\`\`
Net% = A% - B% - (AÃ—B)/100%
\`\`\`

### **Trick 3: When Net Effect is Zero**
If increase % = decrease %, net change = 0

**Example:** +25% then -20%
- Net = 25% - 20% - (25Ã—20)/100% = 5% - 5% = 0%

---

## ðŸ“Š Real-Life Applications

### **1. Business & Finance**
- **Price Changes:** Product price fluctuations
- **Investment Growth:** Portfolio performance
- **Salary Hikes:** Multiple increments

### **2. Economics**
- **Inflation:** Year-over-year price changes
- **GDP Growth:** Economic indicators
- **Market Trends:** Stock market movements

### **3. Science & Engineering**
- **Measurement Errors:** Cumulative errors
- **Population Studies:** Growth/decline patterns
- **Chemical Reactions:** Concentration changes

### **4. Sports & Performance**
- **Score Improvements:** Multiple test scores
- **Athletic Performance:** Training progress
- **Efficiency Metrics:** Performance indicators

---

## ðŸŽ¯ Advanced Scenarios

### **Scenario 1: Multiple Price Changes**
A product undergoes: +15%, -10%, +25%, -5%

**Step-by-step calculation:**
1. Start with 100
2. After +15%: 100 Ã— 1.15 = 115
3. After -10%: 115 Ã— 0.90 = 103.5
4. After +25%: 103.5 Ã— 1.25 = 129.375
5. After -5%: 129.375 Ã— 0.95 = 122.906

**Net change:** (122.906 - 100) Ã· 100 Ã— 100% â‰ˆ 22.91%

### **Scenario 2: Population Growth**
Population changes: +5%, +8%, -3%, +12%

**Using successive formula:**
Net% = 5 + 8 - 3 + 12 + (5Ã—8 + 8Ã—(-3) + (-3)Ã—12 + 12Ã—5)/100 + (5Ã—8Ã—(-3)Ã—12)/10000%

### **Scenario 3: Currency Fluctuations**
Exchange rate changes: +10%, -15%, +8%, -5%

**Complex successive changes require careful calculation.**

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Simple Addition**
âŒ "10% + 20% = 30% increase"
- Wrong! Actual increase is 32%

### **Mistake 2: Wrong Order Application**
âŒ "Apply decreases first"
- Wrong! Apply changes in given sequence

### **Mistake 3: Ignoring Compound Effect**
âŒ "Each 10% change is independent"
- Wrong! Each change affects the next base

### **Mistake 4: Negative Sign Confusion**
âŒ "Decrease of 20% as +20%"
- Wrong! Decrease is always negative

---

## ðŸ§® Quick Reference for Two Changes

| Change 1 | Change 2 | Net Effect Formula |
|----------|----------|-------------------|
| +A%      | +B%      | A + B + (AÃ—B)/100 |
| +A%      | -B%      | A - B - (AÃ—B)/100 |
| -A%      | +B%      | -A + B - (AÃ—B)/100 |
| -A%      | -B%      | -A - B + (AÃ—B)/100 |

---

## ðŸŽ¯ Practice Questions

### **Two Successive Changes:**
1. Price increased by 20%, then decreased by 25%. Find net change.
2. Salary hiked by 15%, then by 10%. Find net increase.
3. Investment grew by 25%, then fell by 20%. Find net change.
4. Temperature rose by 30%, then fell by 20%. Find net change.

### **Three Successive Changes:**
1. Marks improved by 10%, then 15%, then decreased by 5%. Find net change.
2. Production increased by 12%, then 8%, then decreased by 10%. Find net change.

### **Word Problems:**
1. A shopkeeper increases price by 10%, then offers 10% discount. What is net effect?
2. Population grew by 5% first year, 8% second year. What is total growth?
3. Car depreciated by 15% first year, 10% second year. What is total depreciation?

**Answers:**
Two changes: -8.75%, 26.5%, 0%, 4%
Three changes: 20.575%, 9.056%
Word problems: 0% (back to original), 13.4%, -23.5%

---

## ðŸŽ“ Pro Tips for Exams

1. **Don't add percentages directly** - use the compound formula
2. **Pay attention to the sequence** - order matters!
3. **Use negative signs for decreases** - be careful with signs
4. **For three changes, use the extended formula** - don't approximate
5. **Check for special cases** - when net effect is zero
6. **Practice mental calculation** - learn to compute quickly

---

## ðŸ”¢ Successive Change Flowchart

\`\`\`
Two Changes: A% then B%
   â†“
Net% = A + B + (AÃ—B)/100
   â†“
If opposite signs: subtract extra term
   â†“
Apply to original value
\`\`\`

---

## ðŸ’¡ Special Cases

### **Case 1: Equal Increase and Decrease**
+20% then -16.67% â†’ Back to original (20 - 16.67 - (20Ã—16.67)/100 â‰ˆ 0)

### **Case 2: No Net Change**
+25% then -20% â†’ Net 0% (25 - 20 - 5 = 0)

### **Case 3: Maximum Impact**
Same direction changes give maximum effect
Opposite direction changes may minimize effect

Master successive percentage changes and you'll solve complex percentage problems with ease! ðŸ†`
};
