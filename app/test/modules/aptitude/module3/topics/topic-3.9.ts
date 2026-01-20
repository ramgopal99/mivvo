import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_9: SubLesson = {
  id: "3.9",
  title: 'Surds (Basic)',
  status: 'completed',
  content: "`# ðŸ”¢ Surds (Basic)

Surds are irrational square roots that cannot be simplified to rational numbers. Understanding surds is essential for aptitude exams as they appear frequently in simplification and algebra problems.

---

## ðŸŽ¯ What are Surds?

**Surds** are expressions containing square roots (or other roots) of numbers that are not perfect squares.

**Examples:**
- âˆš2, âˆš3, âˆš5, âˆš6, âˆš7, âˆš8, âˆš10, âˆš11, âˆš12, âˆš13, âˆš14, âˆš15

**Non-surds (rational):**
- âˆš4 = 2, âˆš9 = 3, âˆš16 = 4, âˆš25 = 5

---

## ðŸ“Š Types of Surds

### **1. Simple Surds**
Single square root expressions
- âˆš2, âˆš7, âˆš11

### **2. Compound Surds**
Expressions with multiple terms
- 2âˆš3, 3âˆš5, 5âˆš2

### **3. Binomial Surds**
Sum or difference of surds
- âˆš2 + âˆš3, 2âˆš5 - âˆš3

### **4. Similar Surds**
Surds with same irrational part
- 2âˆš3 and 5âˆš3 (both have âˆš3)
- âˆš7 and 3âˆš7 (both have âˆš7)

---

## ðŸ§® Operations with Surds

### **1. Addition and Subtraction**
Only similar surds can be added/subtracted.

**Examples:**
- 2âˆš3 + 5âˆš3 = 7âˆš3
- 4âˆš5 - 2âˆš5 = 2âˆš5
- âˆš2 + âˆš3 = âˆš2 + âˆš3 (cannot simplify - unlike surds)

### **2. Multiplication**
âˆša Ã— âˆšb = âˆš(a Ã— b)

**Examples:**
- âˆš2 Ã— âˆš3 = âˆš6
- âˆš5 Ã— âˆš5 = âˆš25 = 5
- 2âˆš3 Ã— 3âˆš2 = 2Ã—3 Ã— âˆš(3Ã—2) = 6âˆš6

### **3. Division**
âˆša Ã· âˆšb = âˆš(a/b)

**Examples:**
- âˆš8 Ã· âˆš2 = âˆš(8/2) = âˆš4 = 2
- âˆš15 Ã· âˆš3 = âˆš(15/3) = âˆš5
- âˆš12 Ã· âˆš3 = âˆš(12/3) = âˆš4 = 2

---

## ðŸ”§ Simplification of Surds

### **Method 1: Prime Factorization**
Express number under root as product of primes, simplify.

**Examples:**
- âˆš12 = âˆš(4 Ã— 3) = âˆš4 Ã— âˆš3 = 2âˆš3
- âˆš18 = âˆš(9 Ã— 2) = âˆš9 Ã— âˆš2 = 3âˆš2
- âˆš50 = âˆš(25 Ã— 2) = âˆš25 Ã— âˆš2 = 5âˆš2

### **Method 2: Division Method**
Divide number by perfect squares until quotient is not divisible by perfect squares.

**Examples:**
- âˆš72: 72 Ã· 4 = 18, 18 Ã· 9 = 2 â†’ âˆš(4 Ã— 9 Ã— 2) = 2Ã—3Ã—âˆš2 = 6âˆš2
- âˆš96: 96 Ã· 16 = 6 â†’ âˆš(16 Ã— 6) = 4âˆš6

---

## ðŸŽ¯ Rationalization

### **Rationalizing Denominators**
Multiply numerator and denominator by appropriate expression to eliminate surd in denominator.

### **Single Term Denominator**
Multiply by same surd:
\\frac{1}{\\sqrt{2}} Ã— \\frac{\\sqrt{2}}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}

### **Binomial Denominator**
Multiply by conjugate (change sign between terms):
\\frac{1}{\\sqrt{2} + \\sqrt{3}} Ã— \\frac{\\sqrt{2} - \\sqrt{3}}{\\sqrt{2} - \\sqrt{3}} = \\frac{\\sqrt{2} - \\sqrt{3}}{2 - 3} = \\sqrt{2} - \\sqrt{3}

**Examples:**
- \\frac{3}{\\sqrt{5}} = \\frac{3\\sqrt{5}}{5}
- \\frac{2}{\\sqrt{3} + 1} Ã— \\frac{\\sqrt{3} - 1}{\\sqrt{3} - 1} = \\frac{2(\\sqrt{3} - 1)}{3 - 1} = \\frac{2(\\sqrt{3} - 1)}{2} = \\sqrt{3} - 1

---

## ðŸ§  Surd Identities

### **Conjugate Pairs**
For a + bâˆšc, conjugate is a - bâˆšc
(a + bâˆšc)(a - bâˆšc) = aÂ² - (bâˆšc)Â² = aÂ² - bÂ²c

### **Difference of Squares**
aÂ² - bÂ² = (a - b)(a + b)
This applies to surds too.

### **Sum of Squares**
Sometimes helpful: (âˆša + âˆšb)Â² = a + b + 2âˆš(ab)

---

## ðŸš¨ Common Mistakes to Avoid

### âŒ **Adding Unlike Surds**
\`"\`\`
Wrong: âˆš2 + âˆš3 = âˆš5
Right: âˆš2 + âˆš3 cannot be simplified
\`\`\`

### âŒ **Wrong Rationalization**
\`\`\`
Wrong: \\frac{1}{\\sqrt{2} + \\sqrt{3}} = \\frac{1}{\\sqrt{5}}
Right: Use conjugate: \\frac{\\sqrt{2} - \\sqrt{3}}{2 - 3} = \\sqrt{2} - \\sqrt{3}
\`\`\`

### âŒ **Incorrect Simplification**
\`\`\`
Wrong: âˆš12 = âˆš(2Ã—6) = âˆš2 Ã— âˆš6
Right: âˆš12 = âˆš(4Ã—3) = 2âˆš3
\`\`\`

### âŒ **Forgetting Coefficients**
\`\`\`
Wrong: 2âˆš3 Ã— 3âˆš2 = 6âˆš6 âœ“
Wrong: 2âˆš3 Ã— 3âˆš2 = 2Ã—3Ã—âˆš3Ã—âˆš2 = 6âˆš6 âœ“ (same as above)
\`\`\`

---

## ðŸŽ¯ Practice Problems

### **Simplification:**
1. âˆš12 = ?
2. âˆš18 = ?
3. âˆš50 = ?
4. âˆš72 = ?

### **Operations:**
1. 3âˆš2 + 2âˆš2 = ?
2. âˆš8 Ã— âˆš2 = ?
3. 2âˆš5 - âˆš5 = ?
4. âˆš12 Ã· âˆš3 = ?

### **Rationalization:**
1. \\frac{1}{\\sqrt{2}} = ?
2. \\frac{2}{\\sqrt{3}} = ?
3. \\frac{1}{\\sqrt{2} + \\sqrt{3}} = ?
4. \\frac{3}{\\sqrt{5} - 1} = ?

### **Complex Problems:**
1. Simplify: (âˆš3 + âˆš2)(âˆš3 - âˆš2)
2. Rationalize: \\frac{5}{\\sqrt{6} + \\sqrt{2}}
3. Calculate: (2âˆš3 + 3âˆš2)(2âˆš3 - 3âˆš2)
4. Simplify: \\frac{\\sqrt{5} + \\sqrt{3}}{\\sqrt{5} - \\sqrt{3}}

### **Word Problems:**
1. Simplify âˆš(48) + âˆš(12)
2. Rationalize \\frac{1}{\\sqrt{7} + \\sqrt{3}}

**Answers:**
Simplification: 2âˆš3, 3âˆš2, 5âˆš2, 6âˆš2
Operations: 5âˆš2, âˆš16 = 4, âˆš5, âˆš4 = 2
Rationalization: \\frac{\\sqrt{2}}{2}, \\frac{2\\sqrt{3}}{3}, \\sqrt{2} - \\sqrt{3}, \\frac{3(\\sqrt{5} + 1)}{4}
Complex: (âˆš3)Â² - (âˆš2)Â² = 3 - 2 = 1, \\frac{5(\\sqrt{6} - \\sqrt{2})}{4}, (2âˆš3)Â² - (3âˆš2)Â² = 12 - 18 = -6, \\frac{(5+3) + 2\\sqrt{15}}{5-3} = \\frac{8 + 2\\sqrt{15}}{2} = 4 + \\sqrt{15}
Word: âˆš(16Ã—3) + âˆš(4Ã—3) = 4âˆš3 + 2âˆš3 = 6âˆš3, \\frac{\\sqrt{7} - \\sqrt{3}}{4}

---

## ðŸŽ“ Pro Tips for Exams

1. **Identify similar surds** before adding/subtracting
2. **Simplify surds** before performing operations
3. **Use conjugates** for rationalization of binomial denominators
4. **Multiply numerator and denominator** by same expression
5. **Remember difference of squares** for conjugate multiplication
6. **Practice simplification** of common surds (âˆš2, âˆš3, âˆš5, âˆš6, âˆš7, âˆš8, âˆš10)
7. **Check answers** by substituting approximate values

Master surds to handle irrational numbers and complex root expressions with confidence! ðŸ†`
};


