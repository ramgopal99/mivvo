import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_4: SubLesson = {
  id: "6.4",
  title: 'Finding Average When One Value Is Missing',
  status: 'completed',
  content: "`# ðŸ” Finding Average When One Value Is Missing

Master finding unknown values when average is known! This technique is crucial for solving problems where you have most values and need to find the missing one to achieve a target average.

---

## ðŸŽ¯ The Missing Value Formula

**Key Formula:**
\`"\`\`
Missing Value = (Average Ã— Total Count) - Sum of Known Values
\`\`\`

**Or:**
\`\`\`
x = (A Ã— n) - Î£(known values)
\`\`\`

**Where:**
- A = Target average
- n = Total number of values
- Î£ = Sum of all known values

---

## ðŸ“Š Step-by-Step Method

### **Example 1: Basic Missing Value**
**Problem:** Average of 5 numbers is 40. Four numbers: 35, 45, 38, 42. Find fifth number.

**Step 1:** Calculate required total sum
- Required sum = 40 Ã— 5 = 200

**Step 2:** Sum of known values
- 35 + 45 + 38 + 42 = 160

**Step 3:** Find missing value
- Missing = 200 - 160 = 40

### **Example 2: Age Problem**
**Problem:** Average age of 7 family members is 28. Ages of 6: 25, 30, 26, 32, 27, 29. Find seventh age.

**Step 1:** Required sum = 28 Ã— 7 = 196

**Step 2:** Known sum = 25 + 30 + 26 + 32 + 27 + 29 = 169

**Step 3:** Missing age = 196 - 169 = 27

---

## ðŸ”¢ Variations

### **Type 1: Find Value for Specific Average**
Same as above examples.

### **Type 2: Multiple Missing Values**
If average and some values known, distribute among missing.

### **Type 3: Replace to Change Average**
Find replacement value to achieve new average.

---

## ðŸ’¡ Quick Tricks

### **Trick 1: Mental Calculation**
\`\`\`
Estimate first, then calculate precisely
\`\`\`

### **Trick 2: Check Feasibility**
\`\`\`
Missing value should be reasonable for context
\`\`\`

### **Trick 3: Common Patterns**
\`\`\`
Look for arithmetic sequences or patterns
\`\`\`

---

## ðŸŽ¯ Applications

### **1. Academic Problems**
- Find missing test score
- Calculate required marks

### **2. Age Calculations**
- Find unknown family member age
- Group age problems

### **3. Financial Problems**
- Find missing expense/income
- Budget calculations

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong Sum**
âŒ Errors in adding known values
- Double-check addition

### **Mistake 2: Count Error**
âŒ Wrong total count n
- Include the missing value in count

### **Mistake 3: Negative Values**
âŒ Impossible negative ages/heights
- Check result makes sense

---

## ðŸŽ¯ Practice Problems

### **Basic Problems:**
1. Average 35, 6 numbers. Five: 30, 40, 32, 38, 36. Find sixth.
2. Average age 25, 5 people. Four ages: 20, 28, 24, 26. Find fifth.

### **Complex Problems:**
1. Average 42, 8 numbers. Seven: 45, 40, 44, 38, 46, 41, 39. Find eighth.
2. Average marks 85, 10 students. Nine scores: 88, 82, 90, 87, 84, 86, 89, 83, 91. Find tenth.

**Answers:**
Basic: 34, 22
Complex: 43, 85

Master finding missing values to solve average puzzles! ðŸ†`
};
