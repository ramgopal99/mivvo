import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: "2.4",
  title: 'Fractions (Simple & Complex)',
  status: 'completed',
  content: `# 🔢 Fractions: Simple & Complex

Fractions are fundamental to mathematics and appear frequently in aptitude exams. Understanding how to add, subtract, multiply, and divide fractions is essential for solving complex problems. Let's master both simple and complex fractions!

---

## 🎯 What is a Fraction?

A **fraction** represents a part of a whole number. It consists of:
- **Numerator** (top number) - represents parts taken
- **Denominator** (bottom number) - represents total equal parts
- **Fraction bar** (÷ or /) - separates numerator and denominator

**Examples:**
- \\frac{3}{4} (three quarters)
- \\frac{5}{8} (five eighths)
- \\frac{1}{2} (one half)

---

## 📊 Types of Fractions

### **1. Proper Fractions**
Numerator < Denominator
- Examples: \\frac{2}{3}, \\frac{5}{8}, \\frac{1}{4}
- Value less than 1

### **2. Improper Fractions**
Numerator > Denominator
- Examples: \\frac{5}{3}, \\frac{7}{4}, \\frac{9}{2}
- Value greater than 1

### **3. Mixed Fractions**
Whole number + proper fraction
- Examples: 2\\frac{1}{3}, 5\\frac{3}{4}, 1\\frac{1}{2}
- Value greater than 1

### **4. Equivalent Fractions**
Different fractions with same value
- Examples: \\frac{1}{2} = \\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8}

---

## 🔧 Basic Operations with Fractions

### **1. Addition of Fractions**

#### **Same Denominator (Like Fractions)**
Add numerators, keep denominator same:
\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}

**Examples:**
- \\frac{2}{5} + \\frac{3}{5} = \\frac{5}{5} = 1
- \\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}

#### **Different Denominator (Unlike Fractions)**
Find LCM of denominators, convert to equivalent fractions:
\\frac{a}{b} + \\frac{c}{d} = \\frac{a × d + c × b}{b × d}

**Examples:**
- \\frac{1}{2} + \\frac{1}{3} = \\frac{3 + 2}{6} = \\frac{5}{6}
- \\frac{2}{3} + \\frac{1}{4} = \\frac{8 + 3}{12} = \\frac{11}{12}

### **2. Subtraction of Fractions**

#### **Same Denominator**
Subtract numerators, keep denominator:
\\frac{a}{c} - \\frac{b}{c} = \\frac{a - b}{c}

#### **Different Denominator**
\\frac{a}{b} - \\frac{c}{d} = \\frac{a × d - c × b}{b × d}

**Examples:**
- \\frac{3}{4} - \\frac{1}{4} = \\frac{2}{4} = \\frac{1}{2}
- \\frac{2}{3} - \\frac{1}{6} = \\frac{4 - 1}{6} = \\frac{3}{6} = \\frac{1}{2}

### **3. Multiplication of Fractions**
Multiply numerators and denominators:
\\frac{a}{b} × \\frac{c}{d} = \\frac{a × c}{b × d}

**Examples:**
- \\frac{2}{3} × \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}
- \\frac{1}{2} × \\frac{2}{5} × \\frac{5}{6} = \\frac{10}{60} = \\frac{1}{6}

### **4. Division of Fractions**
Multiply by reciprocal (flip second fraction):
\\frac{a}{b} ÷ \\frac{c}{d} = \\frac{a}{b} × \\frac{d}{c} = \\frac{a × d}{b × c}

**Examples:**
- \\frac{2}{3} ÷ \\frac{4}{5} = \\frac{2}{3} × \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}
- \\frac{3}{4} ÷ \\frac{1}{2} = \\frac{3}{4} × \\frac{2}{1} = \\frac{6}{4} = \\frac{3}{2}

---

## 🔄 Converting Between Fraction Types

### **Mixed Fraction to Improper Fraction**
Multiply whole number by denominator, add numerator:
a\\frac{b}{c} = \\frac{a × c + b}{c}

**Examples:**
- 2\\frac{1}{3} = \\frac{2 × 3 + 1}{3} = \\frac{7}{3}
- 3\\frac{2}{5} = \\frac{3 × 5 + 2}{5} = \\frac{17}{5}

### **Improper Fraction to Mixed Fraction**
Divide numerator by denominator:
\\frac{a}{b} = q\\frac{r}{b} where a = q × b + r

**Examples:**
- \\frac{7}{3} = 2\\frac{1}{3}
- \\frac{17}{5} = 3\\frac{2}{5}

### **Decimal to Fraction**
Move decimal places to make whole number:
0.5 = \\frac{5}{10} = \\frac{1}{2}
0.25 = \\frac{25}{100} = \\frac{1}{4}

---

## 🧮 Complex Fraction Operations

### **Compound Fractions**
Fractions containing fractions within them.

**Examples:**
- \\frac{\\frac{1}{2}}{\\frac{3}{4}} = \\frac{1}{2} ÷ \\frac{3}{4} = \\frac{1}{2} × \\frac{4}{3} = \\frac{4}{6} = \\frac{2}{3}
- \\frac{2 + \\frac{1}{3}}{4 - \\frac{1}{2}} = \\frac{\\frac{7}{3}}{\\frac{7}{2}} = \\frac{7}{3} × \\frac{2}{7} = \\frac{2}{3}

### **Adding Mixed Fractions**
Convert to improper fractions first:
2\\frac{1}{3} + 1\\frac{1}{4} = \\frac{7}{3} + \\frac{5}{4} = \\frac{28 + 15}{12} = \\frac{43}{12} = 3\\frac{7}{12}

### **Multiplying Mixed Fractions**
Convert to improper fractions:
2\\frac{1}{3} × 1\\frac{1}{4} = \\frac{7}{3} × \\frac{5}{4} = \\frac{35}{12} = 2\\frac{11}{12}

---

## 🧠 Simplification Techniques

### **1. Common Factor Cancellation**
Cancel common factors before multiplying:

**Example:**
\\frac{2}{3} × \\frac{9}{10} × \\frac{5}{4} = \\frac{2 × 9 × 5}{3 × 10 × 4} = \\frac{2 × 3 × 5}{3 × 2 × 4} = \\frac{5}{4}

### **2. LCM for Addition/Subtraction**
Find LCM of denominators to add/subtract:

**Example:**
\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} = \\frac{6 + 4 + 3}{12} = \\frac{13}{12} = 1\\frac{1}{12}

### **3. Cross Multiplication**
For comparing fractions: a/b vs c/d
If a×d > b×c, then a/b > c/d

### **4. Reciprocal Method**
For division: flip the second fraction and multiply

---

## 🎯 Word Problems with Fractions

### **Part of a Whole**
If a pizza is divided into 8 equal slices and John eats 3 slices, what fraction did he eat?
**Answer:** \\frac{3}{8}

### **Addition Problems**
Mary has \\frac{2}{5} of a cake and Peter has \\frac{1}{3} of the same cake. How much do they have together?
**Answer:** \\frac{2}{5} + \\frac{1}{3} = \\frac{6 + 5}{15} = \\frac{11}{15}

### **Division Problems**
If 5 workers complete \\frac{2}{3} of a job in one day, how much does one worker complete?
**Answer:** \\frac{2}{3} ÷ 5 = \\frac{2}{15}

---

## 🚨 Common Mistakes to Avoid

### ❌ **Adding Without Common Denominator**
\`\`\`
Wrong: \\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}
Right: \\frac{1}{2} + \\frac{1}{3} = \\frac{3 + 2}{6} = \\frac{5}{6}
\`\`\`

### ❌ **Multiplying Instead of Dividing**
\`\`\`
Wrong: \\frac{2}{3} ÷ \\frac{4}{5} = \\frac{2 × 4}{3 × 5} = \\frac{8}{15}
Right: \\frac{2}{3} ÷ \\frac{4}{5} = \\frac{2}{3} × \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}
\`\`\`

### ❌ **Wrong Reciprocal**
\`\`\`
Wrong: \\frac{3}{4} ÷ 2 = \\frac{3}{4} × \\frac{1}{2} = \\frac{3}{8}
Right: \\frac{3}{4} ÷ 2 = \\frac{3}{4} × \\frac{1}{2} = \\frac{3}{8} ✓
\`\`\`

### ❌ **Mixed Fraction Conversion**
\`\`\`
Wrong: 2\\frac{1}{3} = \\frac{2}{3}
Right: 2\\frac{1}{3} = \\frac{7}{3}
\`\`\`

---

## 🎯 Practice Problems

### **Simple Fractions:**
1. \\frac{2}{3} + \\frac{1}{4} = ?
2. \\frac{5}{6} - \\frac{1}{3} = ?
3. \\frac{3}{4} × \\frac{2}{5} = ?
4. \\frac{2}{3} ÷ \\frac{4}{5} = ?

### **Mixed Fractions:**
1. 2\\frac{1}{3} + 1\\frac{1}{4} = ?
2. 3\\frac{1}{2} - 1\\frac{2}{3} = ?
3. 2\\frac{1}{3} × 1\\frac{1}{4} = ?

### **Complex Fractions:**
1. \\frac{\\frac{1}{2} + \\frac{1}{3}}{\\frac{1}{4}} = ?
2. \\frac{2}{\\frac{3}{4}} = ?

### **Word Problems:**
1. A rope of length 5\\frac{1}{2} meters is cut into 3 equal pieces. What is the length of each piece?
2. John ate \\frac{3}{8} of a pizza and Mary ate \\frac{1}{4}. How much pizza is left?

**Answers:**
Simple: \\frac{11}{12}, \\frac{3}{6}=\\frac{1}{2}, \\frac{3}{10}, \\frac{5}{6}
Mixed: 3\\frac{7}{12}, 1\\frac{5}{6}, 2\\frac{11}{12}
Complex: 3\\frac{1}{3}, 2\\frac{2}{3}
Word: 1\\frac{5}{6} meters, \\frac{3}{8}

---

## 🎓 Pro Tips for Exams

1. **Always find LCM** for addition/subtraction of unlike fractions
2. **Cancel common factors** before multiplying to simplify calculations
3. **Convert mixed to improper** for complex operations
4. **Use reciprocals** for division problems
5. **Simplify final answers** by dividing numerator and denominator by GCD
6. **Check reasonableness** - improper fractions should give answers > 1

Master fractions and you'll excel in quantitative aptitude problems! 🏆`
};