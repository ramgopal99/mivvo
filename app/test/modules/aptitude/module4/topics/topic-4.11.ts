import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_11: SubLesson = {
  id: "4.11",
  title: 'Percentage Error',
  status: 'completed',
  content: `# 📏 Percentage Error

Master error calculations in measurements and approximations! Percentage error measures the accuracy of measurements and calculations. Learn to calculate relative errors and understand precision in quantitative analysis.

---

## 🎯 What is Percentage Error?

**Percentage Error** measures how inaccurate a measurement or calculation is, expressed as a percentage of the true/accepted value.

### **Key Concepts**
- **Absolute Error:** |Measured - Actual|
- **Relative Error:** Absolute Error ÷ Actual
- **Percentage Error:** Relative Error × 100%

### **Basic Formula**
\`\`\`
Percentage Error = |(Measured - Actual)/Actual| × 100%
\`\`\`

---

## 📊 Error Calculation Methods

### **Method 1: Direct Formula**
**Example:** Measured length = 25.2 cm, Actual = 25.0 cm. Find percentage error.

**Solution:**
- Absolute Error = |25.2 - 25.0| = 0.2 cm
- Percentage Error = (0.2 ÷ 25.0) × 100% = 0.8%

### **Method 2: Approximation Formula**
For small errors: Percentage Error ≈ (Error ÷ Actual) × 100%

### **Method 3: Multiple Measurements**
Average error when measuring multiple times.

---

## 🔢 Examples of Percentage Error

### **Example 1: Length Measurement**
**Problem:** Ruler measures 15.2 cm, actual length 15.0 cm. Find percentage error.

**Solution:**
- Error = |15.2 - 15.0| = 0.2 cm
- Percentage Error = (0.2 ÷ 15.0) × 100% = 1.33%

### **Example 2: Weight Measurement**
**Problem:** Scale shows 2.45 kg, actual weight 2.50 kg. Find percentage error.

**Solution:**
- Error = |2.45 - 2.50| = 0.05 kg
- Percentage Error = (0.05 ÷ 2.50) × 100% = 2%

### **Example 3: Temperature Reading**
**Problem:** Thermometer reads 98.5°F, actual temperature 100.0°F. Find percentage error.

**Solution:**
- Error = |98.5 - 100.0| = 1.5°F
- Percentage Error = (1.5 ÷ 100.0) × 100% = 1.5%

---

## 💡 Error in Calculations

### **Error in Addition/Subtraction**
\`\`\`
Maximum Error = Sum of individual absolute errors
\`\`\`

**Example:** Adding 10.0 ± 0.1 and 20.0 ± 0.1
- Result = 30.0 ± 0.2

### **Error in Multiplication/Division**
\`\`\`
Relative Error = Sum of relative errors of individual measurements
Percentage Error = Sum of percentage errors
\`\`\`

**Example:** Area = length × width
- Length: 10.0 ± 1% error
- Width: 5.0 ± 1% error
- Area error = 1% + 1% = 2%

---

## 🎯 Applications in Science & Engineering

### **1. Measurement Precision**
- **Instrument Accuracy:** Calipers, scales, meters
- **Experimental Errors:** Lab measurement accuracy
- **Quality Control:** Manufacturing tolerances

### **2. Calculation Approximations**
- **Rounding Errors:** Number approximation effects
- **Computational Errors:** Algorithm accuracy
- **Statistical Errors:** Data analysis precision

### **3. Real-World Applications**
- **GPS Accuracy:** Location measurement errors
- **Medical Tests:** Diagnostic accuracy
- **Financial Calculations:** Interest rate precision

---

## 🔧 Advanced Error Concepts

### **Concept 1: Significant Figures**
Number of digits that carry meaning.

**Example:** 2.50 has 3 significant figures, 2.5 has 2.

### **Concept 2: Propagation of Errors**
How errors combine in complex calculations.

**Example:** Volume = πr²h
- r error = 2%, h error = 1%
- Volume error = 2 × 2% + 1% = 5%

### **Concept 3: Systematic vs Random Errors**
- **Systematic:** Consistent bias (calibration error)
- **Random:** Unpredictable variation (reading error)

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Wrong Denominator**
❌ "Error = |M - A|, Percentage = (Error ÷ Error) × 100%"
- Wrong! Use actual value as denominator

### **Mistake 2: Negative Errors**
❌ "Percentage error can't be negative"
- Wrong! But absolute value is usually taken

### **Mistake 3: Large Errors**
❌ "Percentage error of 200% is impossible"
- Wrong! Possible with very small actual values

### **Mistake 4: Unit Confusion**
❌ "Error in cm, actual in mm"
- Wrong! Use consistent units

---

## 🎯 Practice Questions

### **Basic Error Calculations:**
1. Measured: 12.5 cm, Actual: 12.0 cm. Error = ?
2. Reading: 98.6°F, True: 100.0°F. Error = ?
3. Weight: 2.48 kg, Actual: 2.50 kg. Error = ?

### **Application Problems:**
1. Instrument accurate to ±0.01 cm. Measuring 10.00 cm length. Error = ?
2. Scale accurate to ±0.1 g. Weighing 100.0 g. Error = ?
3. Thermometer accurate to ±1°C. Reading 25°C. Error = ?

### **Complex Calculations:**
1. Length: 15.0 ± 1% cm, Width: 10.0 ± 1% cm. Area error = ?
2. Mass: 50.0 ± 2% g, Volume: 100.0 ± 1% cm³. Density error = ?

**Answers:**
Basic: 4.17%, 1.4%, 0.8%
Applications: 0.1%, 0.1%, 4%
Complex: 2%, 3%

---

## 🎓 Pro Tips for Exams

1. **Always use actual/true value** as denominator
2. **Take absolute value** for percentage error
3. **Check units consistency** before calculating
4. **For small errors** (<5%), approximation works
5. **In calculations**, errors add for multiplication/division
6. **Significant figures** determine precision level

---

## 🔢 Error Formula Summary

| Type | Formula | Example |
|------|---------|---------|
| Basic Error | \|M - A\|/A × 100% | \|10.5 - 10.0\|/10.0 × 100% = 5% |
| Addition | Max error = Σ(errors) | 10±1 + 20±1 = 30±2 |
| Multiplication | % error = Σ(% errors) | 2% × 3% = 5% total |
| Power | % error = n × (% error in base) | x² error = 2 × (% error in x) |

---

## 💡 Error Analysis in Research

### **1. Accuracy vs Precision**
- **Accuracy:** How close to true value
- **Precision:** How consistent measurements are

### **2. Error Sources**
- **Instrument Error:** Equipment limitations
- **Observer Error:** Human reading mistakes
- **Environmental Error:** Temperature, pressure effects

### **3. Error Reduction**
- **Multiple Measurements:** Average reduces random error
- **Calibration:** Corrects systematic error
- **Better Equipment:** Reduces instrument error

Master percentage error calculations to ensure accuracy in measurements and calculations! 🏆`
};