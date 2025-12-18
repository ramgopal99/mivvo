import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_3: SubLesson = {
  id: 4.3,
  title: 'Accessing Tuple Elements',
  status: 'demo',
  content: `# 🎯 Accessing Tuple Elements

Tuples are ordered, so you can access each item using its position (index). Works just like lists!

---

## 📍 Index Basics

### **Position Numbers (Indices)**
\`\`\`python
fruits = ("apple", "banana", "orange", "grape")

# Index starts from 0
print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[2])  # orange (third item)
print(fruits[3])  # grape (fourth item)
\`\`\`

---

## 🔄 Negative Indexing

### **Count from the End**
\`\`\`python
fruits = ("apple", "banana", "orange", "grape")

# Negative indices count from the end
print(fruits[-1])  # grape (last item)
print(fruits[-2])  # orange (second to last)
print(fruits[-3])  # banana (third to last)
print(fruits[-4])  # apple (fourth to last/first)
\`\`\`

---

## 📏 Getting Tuple Length

### **How Many Items?**
\`\`\`python
fruits = ("apple", "banana", "orange")
count = len(fruits)
print(f"Tuple has {count} items")  # Tuple has 3 items

# Check if index exists
if len(fruits) > 2:
    print(fruits[2])  # orange
\`\`\`

---

## 🔍 Check if Item Exists

### **Using 'in' Operator**
\`\`\`python
fruits = ("apple", "banana", "orange")

# Check if item is in tuple
print("apple" in fruits)    # True
print("grape" in fruits)    # False

# Check if NOT in tuple
print("grape" not in fruits)  # True
\`\`\`

---

## 🔢 Count Items

### **Count Occurrences**
\`\`\`python
numbers = (1, 2, 2, 3, 2, 4)
print(numbers.count(2))  # 3 (appears 3 times)
print(numbers.count(5))  # 0 (not found)
\`\`\`

---

## 📍 Find Position

### **Index Method**
\`\`\`python
fruits = ("apple", "banana", "orange", "banana")
print(fruits.index("banana"))  # 1 (first occurrence)
print(fruits.index("orange"))  # 2
\`\`\`

---

## 🎨 Simple Examples

\`\`\`python
# RGB color example
red = (255, 0, 0)
print(f"Red: {red[0]}, Green: {red[1]}, Blue: {red[2]}")

# Coordinates
point = (10, 20, 30)
print(f"Point: ({point[0]}, {point[1]}, {point[2]})")

# Days in months
months_days = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
print(f"January has {months_days[0]} days")
print(f"February has {months_days[1]} days")

# Student info
student = ("Alice", 25, "Computer Science", 3.8)
name, age, major, gpa = student
print(f"{name} is {age} years old, majoring in {major}")
\`\`\`

---

## ⚠️ Index Errors

### **Avoid Going Out of Bounds**
\`\`\`python
colors = ("red", "green", "blue")  # Only 3 items (indices 0, 1, 2)

# This will cause an error:
# print(colors[3])  # IndexError!

# Safe way - check length first
if len(colors) > 3:
    print(colors[3])
else:
    print("Index 3 doesn't exist")
\`\`\`

Accessing tuple elements works exactly like lists! 🔢`
};
