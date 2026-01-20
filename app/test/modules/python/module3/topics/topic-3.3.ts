import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_3: SubLesson = {
  id: "3.3",
  title: 'Accessing List Elements',
  status: 'demo',
  content: "`# ðŸŽ¯ Accessing List Elements

Lists are ordered, so you can access each item using its position (index). Let's learn how!

---

## ðŸ“ Index Basics

### **Position Numbers (Indices)**
\`"\`\`python
fruits = ["apple", "banana", "orange", "grape"]

# Index starts from 0
print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[2])  # orange (third item)
print(fruits[3])  # grape (fourth item)
\`\`\`

---

## ðŸ”„ Negative Indexing

### **Count from the End**
\`\`\`python
fruits = ["apple", "banana", "orange", "grape"]

# Negative indices count from the end
print(fruits[-1])  # grape (last item)
print(fruits[-2])  # orange (second to last)
print(fruits[-3])  # banana (third to last)
print(fruits[-4])  # apple (fourth to last/first)
\`\`\`

---

## ðŸ“ Getting List Length

### **How Many Items?**
\`\`\`python
fruits = ["apple", "banana", "orange"]
count = len(fruits)
print(f"List has {count} items")  # List has 3 items

# Check if index exists
if len(fruits) > 2:
    print(fruits[2])  # orange
\`\`\`

---

## ðŸŽ¨ Simple Examples

\`\`\`python
# Student grades example
grades = [85, 92, 78, 96, 88]

print(f"First grade: {grades[0]}")
print(f"Last grade: {grades[-1]}")
print(f"Total students: {len(grades)}")

# Days of week
days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
print(f"Today is {days[0]}")  # Assuming Monday
print(f"Weekend: {days[-2]}, {days[-1]}")
\`\`\`

---

## âš ï¸ Index Errors

### **Avoid Going Out of Bounds**
\`\`\`python
numbers = [1, 2, 3]  # Only 3 items (indices 0, 1, 2)

# This will cause an error:
# print(numbers[3])  # IndexError!

# Safe way - check length first
if len(numbers) > 3:
    print(numbers[3])
else:
    print("Index 3 doesn't exist")
\`\`\`

Accessing list elements is fundamental - always remember indices start at 0! ðŸ”¢`
};


