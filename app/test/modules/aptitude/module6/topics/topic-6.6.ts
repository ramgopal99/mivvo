import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: "6.6",
  title: 'Weighted Average (Basic)',
  status: 'completed',
  content: "`# âš–ï¸ Weighted Average (Basic)

Master weighted averages where different values have different importance! Unlike simple averages, weighted averages account for significance or frequency of values. Essential for grades, prices, and real-world decision making.

---

## ðŸŽ¯ What is Weighted Average?

**Weighted Average** gives more importance (weight) to certain values. It's the average where each value contributes proportionally to its significance.

### **Formula**
\`"\`\`
Weighted Average = Î£(weight Ã— value) Ã· Î£(weight)
\`\`\`

**Where:**
- weight = importance/frequency of each value
- value = the actual data point

---

## ðŸ“Š Step-by-Step Calculation

### **Example 1: Different Quantities**
**Problem:** Rice at â‚¹40/kg (3 kg) and â‚¹50/kg (2 kg). Find average price.

**Solution:**
- Total cost = (40 Ã— 3) + (50 Ã— 2) = 120 + 100 = 220
- Total weight = 3 + 2 = 5 kg
- Average price = 220 Ã· 5 = â‚¹44/kg

**Formula method:**
- Weighted Average = (40Ã—3 + 50Ã—2) Ã· (3+2) = 220 Ã· 5 = 44

### **Example 2: Exam Grades**
**Problem:** Quiz 20% (85%), Midterm 30% (78%), Final 50% (92%). Find overall grade.

**Solution:**
- Weighted Average = (85Ã—0.20 + 78Ã—0.30 + 92Ã—0.50) Ã· (0.20+0.30+0.50)
- = (17 + 23.4 + 46) Ã· 1 = 86.4%

---

## ðŸ”¢ Types of Weighted Averages

### **1. Frequency Weighted**
When values repeat with different frequencies.

**Example:** Scores: 80 (5 students), 90 (3 students), 95 (2 students)
- Weighted Average = (80Ã—5 + 90Ã—3 + 95Ã—2) Ã· (5+3+2) = 835 Ã· 10 = 83.5

### **2. Importance Weighted**
When values have different significance.

**Example:** Investment: Stock A 40% (12% return), Stock B 60% (8% return)
- Weighted Average = (12Ã—0.4 + 8Ã—0.6) = 4.8 + 4.8 = 9.6%

### **3. Time Weighted**
Different time periods.

**Example:** Speed: 60 km/h (2 hours), 80 km/h (3 hours)
- Weighted Average = (60Ã—2 + 80Ã—3) Ã· (2+3) = 300 Ã· 5 = 60 km/h

---

## ðŸ’¡ Quick Tricks

### **Trick 1: Equal Weights**
\`\`\`
Becomes simple average: Î£x/n
\`\`\`

### **Trick 2: Unit Weights**
\`\`\`
Weights of 1: simple average
\`\`\`

### **Trick 3: Percentage Weights**
\`\`\`
Weights sum to 100% or 1.0
\`\`\`

---

## ðŸŽ¯ Real-Life Applications

### **1. Academic GPA**
- Different credit hours for courses
- Weighted by course difficulty/credits

### **2. Portfolio Returns**
- Different investments with different amounts
- Weighted by investment size

### **3. Product Ratings**
- Different review scores with different importance
- Weighted by reviewer credibility

### **4. Salary Calculations**
- Different pay rates for different hours
- Weighted by hours worked

---

## ðŸ§® Properties

### **1. Weight Range**
Weights can be frequencies, percentages, or importance factors.

### **2. Weight Sum**
Denominator is sum of all weights.

### **3. Effect of Weights**
Higher weight values have more influence on final average.

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Weight Application**
âŒ Applying weights to wrong values
- Match weights to corresponding values

### **Mistake 2: Weight Sum Error**
âŒ Wrong denominator
- Sum of weights, not count of values

### **Mistake 3: Percentage Confusion**
âŒ Treating percentages as absolute values
- Convert to decimals or consistent units

---

## ðŸŽ¯ Practice Problems

### **Basic Weighted Average:**
1. Items: 10kg at â‚¹50/kg, 5kg at â‚¹60/kg. Average price?
2. Grades: Quiz 25% (80%), Test 35% (85%), Final 40% (90%). Overall?

### **Application Problems:**
1. Investment: â‚¹10,000 at 8%, â‚¹15,000 at 10%. Average return?
2. Classes: 30 students average 75, 20 students average 80. Combined?

**Answers:**
Basic: (10Ã—50 + 5Ã—60)Ã·15 = 550Ã·15 â‰ˆ 36.67, (80Ã—0.25 + 85Ã—0.35 + 90Ã—0.4) = 87.5%
Applications: (10Ã—8 + 15Ã—10)Ã·25 = 9.2%, (30Ã—75 + 20Ã—80)Ã·50 = 77

Master weighted averages for accurate real-world calculations! ðŸ†`
};
