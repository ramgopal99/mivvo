import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: "2.6",
  title: 'Mixed Fractions',
  status: 'completed',
  content: `# 🔢 Mixed Fractions

Mixed fractions combine whole numbers with proper fractions, making them essential for real-world applications. Understanding how to work with mixed fractions is crucial for aptitude exams and practical problem-solving.

---

## 🎯 What are Mixed Fractions?

**Mixed fractions** consist of a whole number part and a fractional part. They represent numbers greater than 1.

**Examples:**
- 2\\frac{1}{3} (two and one-third)
- 5\\frac{3}{4} (five and three-quarters)
- 1\\frac{1}{2} (one and one-half)
- 3\\frac{2}{5} (three and two-fifths)

**Structure:**
\`\`\`
Whole Number  Fraction
     ↑         ↑
   2     1/3
\`\`\`

---

## 🔄 Converting Mixed Fractions

### **Mixed Fraction to Improper Fraction**
Multiply whole number by denominator, add numerator:
a\\frac{b}{c} = \\frac{a × c + b}{c}

**Examples:**
- 2\\frac{1}{3} = \\frac{2 × 3 + 1}{3} = \\frac{7}{3}
- 3\\frac{2}{5} = \\frac{3 × 5 + 2}{5} = \\frac{17}{5}
- 5\\frac{3}{4} = \\frac{5 × 4 + 3}{4} = \\frac{23}{4}

### **Improper Fraction to Mixed Fraction**
Divide numerator by denominator:
\\frac{a}{b} = q\\frac{r}{b} where a = q × b + r

**Examples:**
- \\frac{7}{3} = 2\\frac{1}{3} (7 ÷ 3 = 2 remainder 1)
- \\frac{17}{5} = 3\\frac{2}{5} (17 ÷ 5 = 3 remainder 2)
- \\frac{23}{4} = 5\\frac{3}{4} (23 ÷ 4 = 5 remainder 3)

---

## 🧮 Operations with Mixed Fractions

### **Addition of Mixed Fractions**
Convert to improper fractions, add, convert back:

**Examples:**
- 2\\frac{1}{3} + 1\\frac{1}{4} = \\frac{7}{3} + \\frac{5}{4} = \\frac{28 + 15}{12} = \\frac{43}{12} = 3\\frac{7}{12}
- 3\\frac{1}{2} + 2\\frac{1}{3} = \\frac{7}{2} + \\frac{7}{3} = \\frac{21 + 14}{6} = \\frac{35}{6} = 5\\frac{5}{6}

### **Subtraction of Mixed Fractions**
Convert to improper fractions, subtract, convert back:

**Examples:**
- 3\\frac{1}{2} - 1\\frac{2}{3} = \\frac{7}{2} - \\frac{5}{3} = \\frac{21 - 10}{6} = \\frac{11}{6} = 1\\frac{5}{6}
- 5\\frac{3}{4} - 2\\frac{1}{2} = \\frac{23}{4} - \\frac{5}{2} = \\frac{23 - 10}{4} = \\frac{13}{4} = 3\\frac{1}{4}

### **Multiplication of Mixed Fractions**
Convert to improper fractions, multiply, convert back:

**Examples:**
- 2\\frac{1}{3} × 1\\frac{1}{4} = \\frac{7}{3} × \\frac{5}{4} = \\frac{35}{12} = 2\\frac{11}{12}
- 3\\frac{1}{2} × 2\\frac{2}{3} = \\frac{7}{2} × \\frac{8}{3} = \\frac{56}{6} = 9\\frac{2}{6} = 9\\frac{1}{3}

### **Division of Mixed Fractions**
Convert to improper fractions, divide (multiply by reciprocal), convert back:

**Examples:**
- 2\\frac{1}{3} ÷ 1\\frac{1}{4} = \\frac{7}{3} ÷ \\frac{5}{4} = \\frac{7}{3} × \\frac{4}{5} = \\frac{28}{15} = 1\\frac{13}{15}
- 5\\frac{1}{2} ÷ 2\\frac{1}{4} = \\frac{11}{2} ÷ \\frac{9}{4} = \\frac{11}{2} × \\frac{4}{9} = \\frac{44}{18} = \\frac{22}{9} = 2\\frac{4}{9}

---

## 🧠 Simplification Techniques

### **1. Converting for Ease**
Convert to improper fractions for complex operations, then back to mixed.

### **2. Common Denominator**
Find LCD when adding/subtracting multiple mixed fractions.

### **3. Cancellation**
Cancel common factors before multiplying.

### **4. Mixed Operations**
Follow BODMAS rules with mixed fractions.

---

## 🎯 Word Problems with Mixed Fractions

### **Length/Distance Problems**
A rope of 5\\frac{1}{2} meters is cut into 3 equal pieces. Find length of each piece.

**Solution:** 5\\frac{1}{2} ÷ 3 = \\frac{11}{2} ÷ 3 = \\frac{11}{2} × \\frac{1}{3} = \\frac{11}{6} = 1\\frac{5}{6} meters

### **Time Problems**
John takes 2\\frac{1}{4} hours to complete a task. Mary takes 1\\frac{3}{4} hours. Who is faster?

**Solution:** Compare 2\\frac{1}{4} and 1\\frac{3}{4} → 2\\frac{1}{4} = \\frac{9}{4}, 1\\frac{3}{4} = \\frac{7}{4} → Mary is faster

### **Quantity Problems**
A recipe requires 3\\frac{1}{2} cups of flour. You have 2\\frac{3}{4} cups. How much more needed?

**Solution:** 3\\frac{1}{2} - 2\\frac{3}{4} = \\frac{7}{2} - \\frac{11}{4} = \\frac{14 - 11}{4} = \\frac{3}{4} cups

---

## 🚨 Common Mistakes to Avoid

### ❌ **Wrong Conversion**
\`\`\`
Wrong: 2\\frac{1}{3} = \\frac{2}{3}
Right: 2\\frac{1}{3} = \\frac{7}{3}
\`\`\`

### ❌ **Adding Without Conversion**
\`\`\`
Wrong: 2\\frac{1}{3} + 1\\frac{1}{4} = 3\\frac{2}{7}
Right: Convert to \\frac{7}{3} + \\frac{5}{4} = \\frac{43}{12} = 3\\frac{7}{12}
\`\`\`

### ❌ **Wrong Reciprocal in Division**
\`\`\`
Wrong: 2\\frac{1}{3} ÷ 1\\frac{1}{4} = \\frac{7}{3} × \\frac{5}{4} = \\frac{35}{12} = 2\\frac{11}{12}
Right: 2\\frac{1}{3} ÷ 1\\frac{1}{4} = \\frac{7}{3} ÷ \\frac{5}{4} = \\frac{7}{3} × \\frac{4}{5} = \\frac{28}{15} = 1\\frac{13}{15}
\`\`\`

### ❌ **Improper Simplification**
\`\`\`
Wrong: \\frac{35}{12} = 2\\frac{11}{12} ✓ (correct)
Wrong: \\frac{35}{12} = 2\\frac{11}{6} ✗ (wrong denominator)
\`\`\`

---

## 🎯 Practice Problems

### **Conversions:**
1. 3\\frac{2}{5} = ?
2. \\frac{17}{4} = ?
3. 4\\frac{1}{3} = ?
4. \\frac{23}{6} = ?

### **Operations:**
1. 2\\frac{1}{3} + 1\\frac{1}{4} = ?
2. 3\\frac{1}{2} - 1\\frac{2}{3} = ?
3. 2\\frac{1}{3} × 1\\frac{1}{4} = ?
4. 3\\frac{1}{2} ÷ 2\\frac{1}{4} = ?

### **Word Problems:**
1. A pizza is divided into 8 equal slices. If John eats 3\\frac{1}{2} slices, what fraction did he eat?
2. A journey of 5\\frac{1}{2} km takes 1\\frac{1}{4} hours. Find average speed.
3. Recipe needs 2\\frac{3}{4} cups flour. You have 1\\frac{1}{2} cups. How much more needed?

**Answers:**
Conversions: \\frac{17}{5}, 4\\frac{1}{4}, \\frac{13}{3}, 3\\frac{5}{6}
Operations: 3\\frac{7}{12}, 1\\frac{5}{6}, 2\\frac{11}{12}, 1\\frac{5}{7}
Word: \\frac{7}{16}, 4\\frac{2}{5} km/h, 1\\frac{1}{4} cups

---

## 🎓 Pro Tips for Exams

1. **Convert to improper fractions** for complex operations
2. **Find common denominators** for addition/subtraction
3. **Cancel common factors** before multiplying
4. **Use reciprocals correctly** for division
5. **Always simplify final answers**
6. **Estimate answers** to check reasonableness
7. **Practice mental conversions** for speed

Master mixed fractions and you'll handle complex quantitative problems confidently! 🏆`
};