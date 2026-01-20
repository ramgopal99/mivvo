import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_7: SubLesson = {
  id: "6.7",
  title: 'Average of Consecutive Numbers',
  status: 'completed',
  content: "`# ðŸ”¢ Average of Consecutive Numbers

Discover the magic of consecutive number averages! For evenly spaced numbers, the average is simply the middle value. This shortcut saves time in aptitude exams and reveals beautiful mathematical patterns.

---

## ðŸŽ¯ The Magic Formula

**For any consecutive numbers, the average is the middle value:**

\`"\`\`
Average = (First + Last) Ã· 2
\`\`\`

**This works for:**
- Consecutive integers: 1, 2, 3, 4, 5
- Consecutive even numbers: 2, 4, 6, 8, 10
- Consecutive odd numbers: 1, 3, 5, 7, 9

---

## ðŸ“Š Why It Works

### **Mathematical Proof**
For n consecutive numbers from a to a+(n-1):
- Sum = n Ã— (first + last) Ã· 2
- Average = Sum Ã· n = (first + last) Ã· 2

**Example:** 1, 2, 3, 4, 5
- Sum = 15, Count = 5
- Average = 15 Ã· 5 = 3
- (1 + 5) Ã· 2 = 3 âœ“

---

## ðŸ”¢ Examples

### **Example 1: Consecutive Integers**
**Problem:** Average of first 10 natural numbers.

**Solution:**
- First = 1, Last = 10
- Average = (1 + 10) Ã· 2 = 5.5

### **Example 2: Consecutive Even Numbers**
**Problem:** Average of 2, 4, 6, 8, 10.

**Solution:**
- First = 2, Last = 10
- Average = (2 + 10) Ã· 2 = 6

### **Example 3: Consecutive Odd Numbers**
**Problem:** Average of 11, 13, 15, 17, 19.

**Solution:**
- First = 11, Last = 19
- Average = (11 + 19) Ã· 2 = 15

---

## ðŸ’¡ Special Cases

### **1. Even Count of Numbers**
Middle value doesn't exist, but average is between middle two.

### **2. Odd Count of Numbers**
Average equals the exact middle number.

### **3. Single Number**
Average equals the number itself.

---

## ðŸŽ¯ Applications

### **1. Series Problems**
- Finding average of arithmetic sequences
- Quick calculations for number series

### **2. Age Problems**
- Consecutive ages in families
- Year calculations

### **3. Score Calculations**
- Consecutive marks/ranks
- Rating systems

---

## ðŸ§® Related Concepts

### **1. Sum of Consecutive Numbers**
\`\`\`
Sum = n Ã— (first + last) Ã· 2
\`\`\`

### **2. Number of Terms**
\`\`\`
n = last - first + 1
\`\`\`

### **3. Middle Term**
\`\`\`
Middle = (first + last) Ã· 2
\`\`\`

---

## ðŸš¨ Common Mistakes

### **Mistake 1: Wrong First/Last**
âŒ Including or excluding numbers incorrectly
- Verify the sequence

### **Mistake 2: Non-Consecutive**
âŒ Applying to non-consecutive numbers
- Only works for consecutive series

### **Mistake 3: Even vs Odd Count**
âŒ Confusion with even number of terms
- Average is still (first + last) Ã· 2

---

## ðŸŽ¯ Practice Problems

### **Basic Consecutive:**
1. Average of 1 to 20?
2. Average of first 15 even numbers?
3. Average of 10 to 20 inclusive?

### **Application Problems:**
1. Average age of 5 children with consecutive ages, eldest 12?
2. Average of numbers from 51 to 100?
3. Average of first 25 odd numbers?

**Answers:**
Basic: (1+20)Ã·2 = 10.5, First even=2, last=30, average=16, (10+20)Ã·2 = 15
Applications: Ages 8,9,10,11,12, average=10, (51+100)Ã·2 = 75.5, First=1, last=49, average=25

Master consecutive number averages for quick calculations! ðŸ†`
};
