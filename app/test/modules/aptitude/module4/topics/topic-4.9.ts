import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_9: SubLesson = {
  id: "4.9",
  title: 'Population Increase/Decrease',
  status: 'completed',
  content: "`# ðŸ‘¥ Population Increase/Decrease

Master population growth and decline calculations! This topic applies percentage concepts to demographic changes, involving compound growth rates over multiple periods. Learn to calculate population changes using exponential formulas.

---

## ðŸŽ¯ Population Growth Basics

**Population change** follows compound growth patterns where each year's growth is calculated on the previous year's population.

### **Key Concepts**
- **Growth Rate:** Annual percentage increase
- **Compound Effect:** Growth on growth
- **Time Periods:** Usually in years

### **Basic Formula**
\`"\`\`
Population after n years = P Ã— (1 + r/100)^n
\`\`\`

**Where:**
- P = Initial population
- r = Annual growth rate (%)
- n = Number of years

---

## ðŸ“ˆ Population Increase Calculations

### **Example 1: Simple Growth**
**Problem:** Population of a town is 10,000. It grows at 5% per year. Find population after 2 years.

**Solution:**
- Year 1: 10,000 Ã— 1.05 = 10,500
- Year 2: 10,500 Ã— 1.05 = 11,025

**Using formula:** 10,000 Ã— (1.05)Â² = 11,025

### **Example 2: Multi-year Growth**
**Problem:** City population: 50,000. Grows 8% annually. Find population after 3 years.

**Solution:**
- 50,000 Ã— (1.08)Â³ = 50,000 Ã— 1.259712 = 62,985.6 â‰ˆ 62,986

### **Example 3: Finding Growth Rate**
**Problem:** Population grew from 20,000 to 23,200 in 2 years. Find annual growth rate.

**Solution:**
- 20,000 Ã— (1 + r/100)Â² = 23,200
- (1 + r/100)Â² = 23,200 Ã· 20,000 = 1.16
- 1 + r/100 = âˆš1.16 â‰ˆ 1.077
- r/100 = 0.077
- r = 7.7%

---

## ðŸ“‰ Population Decrease Calculations

### **Example 1: Population Decline**
**Problem:** Village population: 15,000. Declines 3% annually. Find population after 2 years.

**Solution:**
- Formula: P Ã— (1 - r/100)^n
- 15,000 Ã— (0.97)Â² = 15,000 Ã— 0.9409 = 14,113.5 â‰ˆ 14,114

### **Example 2: Finding Decline Rate**
**Problem:** Population decreased from 25,000 to 21,250 in 3 years. Find annual decline rate.

**Solution:**
- 25,000 Ã— (1 - r/100)Â³ = 21,250
- (1 - r/100)Â³ = 21,250 Ã· 25,000 = 0.85
- 1 - r/100 = âˆ›0.85 â‰ˆ 0.946
- r/100 = 1 - 0.946 = 0.054
- r = 5.4%

---

## ðŸ’¡ Quick Tricks for Population Problems

### **Trick 1: Two-Year Growth**
\`\`\`
Population = P Ã— (1 + r/100) Ã— (1 + r/100)
= P Ã— (1 + r/100)Â²
\`\`\`

### **Trick 2: Three-Year Growth**
\`\`\`
Population = P Ã— (1 + r/100)Â³
\`\`\`

### **Trick 3: Growth Rate from Data**
\`\`\`
Final Population = Initial Ã— (1 + r/100)^n
r = [(Final/Initial)^(1/n) - 1] Ã— 100%
\`\`\`

### **Trick 4: Population Ratio**
\`\`\`
Male/Female ratio = M:F
Total population = M + F
Male % = (M/(M+F)) Ã— 100%
\`\`\`

---

## ðŸ”¢ Population Composition Problems

### **Example 1: Age Distribution**
**Problem:** Town has 60,000 people. 35% are children, 50% adults, 15% elderly. How many adults?

**Solution:**
- Adults = 50% of 60,000 = 30,000

### **Example 2: Gender Ratio**
**Problem:** Village: 8000 people, male:female = 5:4. How many females?

**Solution:**
- Total parts = 5 + 4 = 9
- Females = (4/9) Ã— 8000 = 3555.56 â‰ˆ 3556

### **Example 3: Literacy Rate**
**Problem:** City: 1,00,000 people. Literacy rate 75%. How many literates?

**Solution:**
- Literates = 75% of 1,00,000 = 75,000

---

## ðŸŽ¯ Advanced Population Scenarios

### **Scenario 1: Migration Effects**
**Problem:** Town population 50,000. Natural growth 2% but 1000 people migrate out annually. Find population after 2 years.

**Solution:**
- Year 1: 50,000 Ã— 1.02 - 1000 = 51,000 - 1000 = 50,000
- Year 2: 50,000 Ã— 1.02 - 1000 = 51,000 - 1000 = 50,000
- Population remains constant due to balancing factors

### **Scenario 2: Different Growth Rates**
**Problem:** Urban area grows 8%, rural area grows 3%. Urban has 40,000, rural has 60,000. Find total population after 2 years.

**Solution:**
- Urban: 40,000 Ã— (1.08)Â² = 46,464
- Rural: 60,000 Ã— (1.03)Â² = 63,678
- Total: 46,464 + 63,678 = 1,10,142

### **Scenario 3: Population Density**
**Problem:** Area 100 sq km, population 2,00,000. Density = ?

**Solution:**
- Density = Population Ã· Area = 2,00,000 Ã· 100 = 2,000 per sq km

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Simple Addition of Rates**
âŒ "5% + 5% = 10% growth in 2 years"
- Wrong! Compound effect gives 10.25%

### **Mistake 2: Wrong Base for Percentage**
âŒ "Population increased by 1000, so 1000% increase"
- Wrong! Use original population as base

### **Mistake 3: Ignoring Compound Effect**
âŒ "2% growth for 3 years = 6% total"
- Wrong! 2% compounded = (1.02)Â³ - 1 â‰ˆ 6.12%

### **Mistake 4: Migration Confusion**
âŒ "Migration out reduces growth rate"
- Wrong! Migration is absolute, growth is percentage

---

## ðŸŽ¯ Practice Questions

### **Population Growth:**
1. Population 10,000 grows 6% annually. Find after 2 years = ?
2. Town 25,000 grows 4% yearly. Find after 3 years = ?
3. City grew from 50,000 to 60,000 in 3 years. Find annual rate = ?

### **Population Decline:**
1. Population 30,000 declines 2% annually. Find after 2 years = ?
2. Village decreased from 40,000 to 35,000 in 3 years. Find annual decline = ?

### **Composition Problems:**
1. Town 80,000 people. 45% males. How many females = ?
2. City 1,20,000 population. Male:female = 6:5. How many males = ?

**Answers:**
Growth: 11,236, 28,092.16, ~3.71%
Decline: 28,812, ~3.02%
Composition: 44,000, 69,600

---

## ðŸŽ“ Pro Tips for Exams

1. **Use compound formula** - don't add percentages
2. **Careful with negative rates** - decrease uses (1 - r/100)
3. **Round appropriately** - population can't be fractional
4. **Check units** - years, percentages, absolute numbers
5. **Read carefully** - growth vs. absolute increase
6. **Use calculator for powers** - (1+r)^n calculations

---

## ðŸ”¢ Population Growth Formula Summary

| Scenario | Formula | Example |
|----------|---------|---------|
| Growth | P(1 + r/100)^n | 1000(1.05)^2 = 1102.5 |
| Decline | P(1 - r/100)^n | 1000(0.98)^2 = 960.4 |
| Find rate | r = [(F/P)^(1/n) - 1]Ã—100% | From 1000â†’1331 in 3y: 10% |
| Migration | P(1 Â± r/100)^n Â± M | Complex scenarios |

---

## ðŸ’¡ Real-World Applications

### **1. Urban Planning**
- City growth projections
- Infrastructure planning
- Resource allocation

### **2. Economics**
- Labor force estimation
- Market size prediction
- Economic growth modeling

### **3. Environmental Studies**
- Wildlife population tracking
- Resource depletion studies
- Biodiversity monitoring

### **4. Business Planning**
- Market expansion
- Customer base growth
- Sales forecasting

Master population calculations to understand demographic changes and growth patterns! ðŸ†`
};
