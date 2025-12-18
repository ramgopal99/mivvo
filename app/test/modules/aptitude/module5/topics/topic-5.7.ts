import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_7: SubLesson = {
  id: "5.7",
  title: 'Continued Proportion',
  status: 'completed',
  content: `# 🔗 Continued Proportion

Learn about continued proportion where three or more quantities form a chain of equal ratios! This concept is essential for geometric progressions and scaling problems. Master the properties and applications of continued proportion.

---

## 🎯 What is Continued Proportion?

**Continued Proportion** occurs when three or more quantities are in proportion such that the ratio of first to second equals the ratio of second to third, and so on.

### **Basic Form**
\`\`\`
a:b = b:c  (three quantities)
a:b = b:c = c:d  (four quantities)
\`\`\`

### **Meaning**
The middle term is the geometric mean of the other two terms.

---

## 📊 Examples

### **Example 1: Three Numbers**
**Problem:** Find c if 4, 6, c are in continued proportion.

**Solution:**
- 4:6 = 6:c
- 4/c = 6/6 = 1
- 4 = c
- Wait, that can't be right. 4:6 = 6:c means 4/6 = 6/c
- Cross multiply: 4c = 36
- c = 9

### **Example 2: Four Numbers**
**Problem:** Find d if 2, 4, 8, d are in continued proportion.

**Solution:**
- 2:4 = 4:8 = 8:d
- From 4:8 = 8:d, 4/d = 8/8 = 1, so d = 4
- But 2:4 = 1:2, 4:8 = 1:2, 8:d = 1:2
- So d = 16

---

## 🔢 Properties

### **Property 1: Geometric Mean**
\`\`\`
b² = a × c  (for a, b, c in continued proportion)
\`\`\`

### **Property 2: Chain Equality**
\`\`\`
a/b = b/c = c/d = ... = k (constant ratio)
\`\`\`

### **Property 3: Common Ratio**
\`\`\`
Each term = previous term × r
\`\`\`

---

## 🧮 Applications

### **1. Geometric Progressions**
- Terms form continued proportion
- Common ratio between consecutive terms

### **2. Scaling Problems**
- Similar figures
- Map scales
- Model reductions

### **3. Growth Patterns**
- Population growth
- Investment returns
- Chain reactions

---

## 💡 Quick Tricks

### **Trick 1: Finding Missing Term**
\`\`\`
If a, b, c in continued proportion: c = (b²)/a
\`\`\`

### **Trick 2: Four Terms**
\`\`\`
a, b, c, d: d = (b² × c)/a or d = (c³)/(a²)
\`\`\`

### **Trick 3: Multiple Terms**
\`\`\`
Use the chain property: a/b = b/c = c/d = ...
\`\`\`

---

## 🎯 Practice Problems

1. Find third proportional to 2 and 3.
2. Find mean proportional between 9 and 16.
3. If 3, x, 12 are in continued proportion, find x.

**Answers:**
1. 4.5 (since 3:x = x:12, x² = 36, x = 6)
2. 12 (since x² = 9×16 = 144, x = 12)
3. 6 (as above)

Master continued proportion for geometric sequences and scaling problems! 🏆`
};