import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_4: SubLesson = {
  id: "5.4",
  title: 'Simplification of Ratios',
  status: 'completed',
  content: `# 🔄 Simplification of Ratios

Master the art of simplifying ratios to their lowest terms! Simplification makes ratios easier to work with and compare. Learn systematic methods to reduce complex ratios using HCF and other techniques.

---

## 🎯 What is Ratio Simplification?

**Ratio simplification** means expressing a ratio in its lowest terms by dividing both parts by their Highest Common Factor (HCF).

### **Why Simplify?**
- Easier to understand and compare
- Eliminates common factors
- Standard form for calculations
- Reduces complexity in problems

### **Basic Rule**
\`\`\`
a:b simplified = (a÷d):(b÷d)
where d = HCF of a and b
\`\`\`

---

## 📊 Step-by-Step Simplification

### **Example 1: Simple Ratio**
**Simplify 12:18**

**Step 1:** Find HCF of 12 and 18
- Factors of 12: 1, 2, 3, 4, 6, 12
- Factors of 18: 1, 2, 3, 6, 9, 18
- HCF = 6

**Step 2:** Divide both terms by HCF
- 12÷6 = 2
- 18÷6 = 3
- Simplified ratio = 2:3

### **Example 2: Larger Numbers**
**Simplify 36:48**

**Step 1:** Find HCF
- HCF of 36 and 48 = 12

**Step 2:** Divide by HCF
- 36÷12 = 3
- 48÷12 = 4
- Simplified = 3:4

---

## 🧮 Finding HCF Methods

### **Method 1: Prime Factorization**
\`\`\`
Express numbers as product of primes
HCF = Product of common prime factors with lowest powers
\`\`\`

**Example:** HCF of 24 and 36
- 24 = 2³ × 3
- 36 = 2² × 3²
- HCF = 2² × 3 = 12

### **Method 2: Division Method**
\`\`\`
Divide larger number by smaller number
Continue with remainder until remainder is zero
Last divisor is HCF
\`\`\`

**Example:** HCF of 48 and 36
- 48 ÷ 36 = 1, remainder 12
- 36 ÷ 12 = 3, remainder 0
- HCF = 12

### **Method 3: Common Division**
\`\`\`
Keep dividing by common factors until no common factor remains
\`\`\`

**Example:** 48 and 36
- Divide by 2: 24 and 18
- Divide by 2: 12 and 9
- Divide by 3: 4 and 3
- No more common factors
- HCF = 2 × 2 × 3 = 12

---

## 🔢 Simplifying Compound Ratios

### **Three-Term Ratio**
**Simplify 12:18:24**

**Step 1:** Find HCF of all three numbers
- HCF of 12, 18, 24 = 6

**Step 2:** Divide each by HCF
- 12÷6 = 2
- 18÷6 = 3
- 24÷6 = 4
- Simplified = 2:3:4

### **Four-Term Ratio**
**Simplify 15:20:25:30**

**Step 1:** Find HCF = 5

**Step 2:** Divide each term
- 15÷5 = 3
- 20÷5 = 4
- 25÷5 = 5
- 30÷5 = 6
- Simplified = 3:4:5:6

---

## 💡 Quick Tricks for Common Cases

### **Trick 1: Even Numbers**
\`\`\`
If both numbers are even, divide by 2 repeatedly
Example: 14:16 → 7:8 (divide by 2)
\`\`\`

### **Trick 2: Ending with 5 or 0**
\`\`\`
Divide by 5 if both end with 5 or 0
Example: 25:35 → 5:7 (divide by 5)
\`\`\`

### **Trick 3: Same Last Digit**
\`\`\`
Check for common factors
Example: 12:18 → 2:3 (divide by 6)
\`\`\`

### **Trick 4: Ratio Already Simple**
\`\`\`
Check HCF = 1
Example: 3:5 (HCF = 1, already simplified)
\`\`\`

---

## 🎯 Special Cases

### **Case 1: Ratio with Decimals**
Convert to whole numbers first, then simplify.

**Example:** Simplify 2.4:3.6
- Multiply by 10: 24:36
- HCF = 12
- 24÷12:36÷12 = 2:3

### **Case 2: Ratio with Fractions**
Convert to equivalent fractions with common denominator.

**Example:** Simplify 1/2 : 1/3
- Common denominator = 6
- 3/6 : 2/6
- 3:2

### **Case 3: Large Numbers**
Use prime factorization for large numbers.

**Example:** Simplify 144:216
- 144 = 2^4 × 3^2
- 216 = 2^3 × 3^3
- HCF = 2^3 × 3^2 = 72
- 144÷72:216÷72 = 2:3

---

## 🔄 Inverse Simplification

### **Expressing as Ratio from Simplified Form**
\`\`\`
Multiply both terms by same number to get original ratio
\`\`\`

**Example:** 2:3 is simplified form of:
- 4:6 (multiply by 2)
- 6:9 (multiply by 3)
- 8:12 (multiply by 4)

---

## 🧮 Advanced Simplification Techniques

### **Technique 1: Multiple Ratios**
Simplify multiple ratios to compare them.

**Example:** Compare 12:15, 16:20, 18:24
- 12:15 = 4:5
- 16:20 = 4:5
- 18:24 = 3:4
- All different: 4:5, 4:5, 3:4

### **Technique 2: Ratio with Common Factor**
\`\`\`
Divide by HCF of all terms for compound ratios
\`\`\`

### **Technique 3: Fractional Ratios**
\`\`\`
a/b : c/d = (a×d):(b×c) then simplify
\`\`\`

---

## 🚨 Common Mistakes to Avoid

### **Mistake 1: Partial Division**
❌ Simplify 12:18 as 6:9
- Should go to lowest terms: 2:3

### **Mistake 2: Wrong HCF**
❌ HCF of 15 and 20 is 3
- Wrong! HCF is 5, simplified ratio is 3:4

### **Mistake 3: Decimal Confusion**
❌ Simplify 1.5:2.5 as is
- Wrong! Convert to 3:5 first

### **Mistake 4: Compound Ratio Error**
❌ Simplify 6:9:12 as 2:3:4
- Correct! Divide by HCF of 6,9,12 = 3

---

## 🎯 Practice Questions

### **Basic Simplification:**
1. Simplify 24:36
2. Simplify 45:60
3. Simplify 18:24:30

### **Advanced Cases:**
1. Simplify 2.4:3.6
2. Simplify 1/3 : 1/4
3. Simplify 144:216:288

### **Comparison Problems:**
1. Which is smaller: 15:20 or 18:24?
2. Arrange in order: 12:15, 16:20, 21:28

**Answers:**
Basic: 2:3, 3:4, 3:4:5
Advanced: 2:3, 4:3, 4:6:8
Comparison: Both equal (3:4), 12:15 = 16:20 < 21:28

---

## 🎓 Pro Tips for Exams

1. **Always find HCF first** - don't stop at intermediate steps
2. **Check if already simplified** - HCF should be 1
3. **Use prime factorization** for large numbers
4. **Convert decimals/fractions** to whole numbers
5. **For compound ratios** - find HCF of all terms
6. **Verify by multiplying back** - should get original ratio

---

## 🔢 Quick Reference

| Original | HCF | Simplified | Verification |
|----------|-----|------------|--------------|
| 12:18    | 6   | 2:3        | 2×6:3×6     |
| 15:20    | 5   | 3:4        | 3×5:4×5     |
| 24:36:48 | 12  | 2:3:4      | 2×12:3×12:4×12 |

---

## 💡 Applications

### **1. Recipe Scaling**
- Original: 2:3:1 → Double: 4:6:2 → Simplified: 2:3:1

### **2. Mixture Ratios**
- 500g mixture in 5:3:2 ratio → 250g:150g:100g → 5:3:2

### **3. Speed Comparisons**
- Times 4:6:8 → Simplify to 1:1.5:2 or 2:3:4

Master ratio simplification to work efficiently with proportions and comparisons! 🏆`
};