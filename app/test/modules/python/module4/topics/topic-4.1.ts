import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_1: SubLesson = {
  id: 4.1,
  title: 'What are Tuples?',
  status: 'demo',
  content: `# 📦 What are Python Tuples?

Tuples are **immutable** sequences that can hold multiple items. Think of them as "read-only" lists!

---

## 🎯 What is a Tuple?

A **tuple** is a collection of items that are:
- **Ordered** - Items have a specific position
- **Immutable** - Cannot be changed after creation
- **Allow duplicates** - Same item can appear multiple times
- **Can hold different types** - Like lists, but fixed

\`\`\`python
# A simple tuple of coordinates
point = (10, 20)
print(point)  # (10, 20)

# Tuple with mixed types
person = ("Alice", 25, "Engineer")
print(person)  # ('Alice', 25, 'Engineer')
\`\`\`

---

## 🔒 Key Difference: Immutable vs Mutable

### **Lists are Mutable (can change)**
\`\`\`python
fruits = ["apple", "banana"]
fruits[0] = "orange"  # ✅ This works
print(fruits)  # ['orange', 'banana']
\`\`\`

### **Tuples are Immutable (cannot change)**
\`\`\`python
fruits = ("apple", "banana")
# fruits[0] = "orange"  # ❌ This will cause an error!
print(fruits)  # ('apple', 'banana')
\`\`\`

---

## 📊 Tuple Characteristics

### **Ordered Collection**
\`\`\`python
colors = ("red", "green", "blue")
print(colors[0])  # red (first item)
print(colors[2])  # blue (third item)
\`\`\`

### **Allow Duplicates**
\`\`\`python
numbers = (1, 2, 2, 3, 1)
print(numbers)  # (1, 2, 2, 3, 1)
\`\`\`

### **Different Data Types**
\`\`\`python
mixed = ("hello", 42, 3.14, True, [1, 2, 3])
print(mixed)  # ('hello', 42, 3.14, True, [1, 2, 3])
\`\`\`

---

## 🔍 Real-World Examples

\`\`\`python
# Geographic coordinates
location = (40.7128, -74.0060)  # New York City

# RGB color values
red = (255, 0, 0)
green = (0, 255, 0)

# Student record (name, age, grade)
student = ("Bob", 16, "A")

# Days in months (immutable calendar data)
months_days = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
\`\`\`

Tuples are perfect for data that should never change! 🔒`
};
