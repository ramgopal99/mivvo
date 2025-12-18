import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: "6.6",
  title: 'Weighted Average (Basic)',
  status: 'completed',
  content: `# ⚖️ Weighted Average (Basic)

Master weighted averages where different values have different importance! Unlike simple averages, weighted averages account for significance or frequency of values. Essential for grades, prices, and real-world decision making.

---

## 🎯 What is Weighted Average?

**Weighted Average** gives more importance (weight) to certain values. It's the average where each value contributes proportionally to its significance.

### **Formula**
\`\`\`
Weighted Average = Σ(weight × value) ÷ Σ(weight)
\`\`\`

**Where:**
- weight = importance/frequency of each value
- value = the actual data point

---

## 📊 Step-by-Step Calculation

### **Example 1: Different Quantities**
**Problem:** Rice at ₹40/kg (3 kg) and ₹50/kg (2 kg). Find average price.

**Solution:**
- Total cost = (40 × 3) + (50 × 2) = 120 + 100 = 220
- Total weight = 3 + 2 = 5 kg
- Average price = 220 ÷ 5 = ₹44/kg

**Formula method:**
- Weighted Average = (40×3 + 50×2) ÷ (3+2) = 220 ÷ 5 = 44

### **Example 2: Exam Grades**
**Problem:** Quiz 20% (85%), Midterm 30% (78%), Final 50% (92%). Find overall grade.

**Solution:**
- Weighted Average = (85×0.20 + 78×0.30 + 92×0.50) ÷ (0.20+0.30+0.50)
- = (17 + 23.4 + 46) ÷ 1 = 86.4%

---

## 🔢 Types of Weighted Averages

### **1. Frequency Weighted**
When values repeat with different frequencies.

**Example:** Scores: 80 (5 students), 90 (3 students), 95 (2 students)
- Weighted Average = (80×5 + 90×3 + 95×2) ÷ (5+3+2) = 835 ÷ 10 = 83.5

### **2. Importance Weighted**
When values have different significance.

**Example:** Investment: Stock A 40% (12% return), Stock B 60% (8% return)
- Weighted Average = (12×0.4 + 8×0.6) = 4.8 + 4.8 = 9.6%

### **3. Time Weighted**
Different time periods.

**Example:** Speed: 60 km/h (2 hours), 80 km/h (3 hours)
- Weighted Average = (60×2 + 80×3) ÷ (2+3) = 300 ÷ 5 = 60 km/h

---

## 💡 Quick Tricks

### **Trick 1: Equal Weights**
\`\`\`
Becomes simple average: Σx/n
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

## 🎯 Real-Life Applications

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

## 🧮 Properties

### **1. Weight Range**
Weights can be frequencies, percentages, or importance factors.

### **2. Weight Sum**
Denominator is sum of all weights.

### **3. Effect of Weights**
Higher weight values have more influence on final average.

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Weight Application**
❌ Applying weights to wrong values
- Match weights to corresponding values

### **Mistake 2: Weight Sum Error**
❌ Wrong denominator
- Sum of weights, not count of values

### **Mistake 3: Percentage Confusion**
❌ Treating percentages as absolute values
- Convert to decimals or consistent units

---

## 🎯 Practice Problems

### **Basic Weighted Average:**
1. Items: 10kg at ₹50/kg, 5kg at ₹60/kg. Average price?
2. Grades: Quiz 25% (80%), Test 35% (85%), Final 40% (90%). Overall?

### **Application Problems:**
1. Investment: ₹10,000 at 8%, ₹15,000 at 10%. Average return?
2. Classes: 30 students average 75, 20 students average 80. Combined?

**Answers:**
Basic: (10×50 + 5×60)÷15 = 550÷15 ≈ 36.67, (80×0.25 + 85×0.35 + 90×0.4) = 87.5%
Applications: (10×8 + 15×10)÷25 = 9.2%, (30×75 + 20×80)÷50 = 77

Master weighted averages for accurate real-world calculations! 🏆`
};