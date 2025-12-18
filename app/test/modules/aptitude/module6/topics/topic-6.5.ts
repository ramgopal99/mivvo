import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_5: SubLesson = {
  id: "6.5",
  title: 'Change in Average',
  status: 'completed',
  content: `# 📈 Change in Average

Learn how averages change when values are added, removed, or replaced! Understanding average dynamics is crucial for tracking performance, analyzing trends, and solving complex average problems.

---

## 🎯 Average Change Scenarios

### **1. Adding a New Value**
\`\`\`
New Average = (Old Average × n + New Value) ÷ (n + 1)
\`\`\`

**Example:** Average of 5 numbers is 40. Add 50.
- New average = (40 × 5 + 50) ÷ 6 = (200 + 50) ÷ 6 = 250 ÷ 6 ≈ 41.67

### **2. Removing a Value**
\`\`\`
New Average = (Old Average × n - Removed Value) ÷ (n - 1)
\`\`\`

### **3. Replacing a Value**
\`\`\`
New Average = Old Average + (New - Old) ÷ n
\`\`\`

**Example:** Average 50, replace 40 with 60, n=10
- New average = 50 + (60 - 40) ÷ 10 = 50 + 2 = 52

---

## 📊 Detailed Calculations

### **Example 1: Adding to Group**
**Problem:** Class average 75, 20 students. New student scores 85. New average?

**Solution:**
- New average = (75 × 20 + 85) ÷ 21
- = (1500 + 85) ÷ 21 = 1585 ÷ 21 ≈ 75.48

### **Example 2: Removing from Group**
**Problem:** Team average 82, 11 players. Remove player with 95. New average?

**Solution:**
- New average = (82 × 11 - 95) ÷ 10
- = (902 - 95) ÷ 10 = 807 ÷ 10 = 80.7

---

## 🔢 Impact of Changes

### **1. Adding High Value**
- Increases average
- Effect depends on original average gap

### **2. Adding Low Value**
- Decreases average
- Magnitude depends on how low

### **3. Replacing Values**
- Net change = (new - old) ÷ total count
- Independent of other values!

---

## 💡 Quick Tricks

### **Trick 1: Small Changes**
\`\`\`
For small additions, approximate impact
\`\`\`

### **Trick 2: Percentage Change**
\`\`\`
Calculate percentage increase/decrease in average
\`\`\`

### **Trick 3: Multiple Changes**
\`\`\`
Apply changes sequentially
\`\`\`

---

## 🎯 Applications

### **1. Performance Tracking**
- Adding new test scores
- Removing invalid data

### **2. Financial Analysis**
- Portfolio changes
- Budget adjustments

### **3. Quality Control**
- Adding new measurements
- Removing outliers

---

## 🚨 Common Mistakes

### **Mistake 1: Wrong Formula Application**
❌ Using wrong divisor
- Adding: divide by (n+1)
- Removing: divide by (n-1)

### **Mistake 2: Sequential Changes**
❌ Applying changes to original average
- Use updated average for each step

### **Mistake 3: Ignoring Count Changes**
❌ Forgetting to change n
- Critical for correct calculation

---

## 🎯 Practice Problems

### **Adding Values:**
1. Average 60, 8 items. Add 75. New average?
2. Class average 70, 25 students. New student 85. New average?

### **Replacing Values:**
1. Average 50, 10 items. Replace 45 with 55. New average?
2. Team average 80, 12 players. Replace 85 with 75. New average?

**Answers:**
Adding: (60×8 + 75)÷9 ≈ 67.22, (70×25 + 85)÷26 ≈ 70.96
Replacing: 50 + (55-45)÷10 = 51, 80 + (75-85)÷12 = 79.17

Master average changes to track evolving data! 🏆`
};