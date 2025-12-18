import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_1: SubLesson = {
  id: 3.1,
  title: 'What are Lists?',
  status: 'demo',
  content: `# 📋 What are Python Lists?

Lists are one of Python's most useful data structures. Think of them as containers that can hold multiple items!

---

## 🎯 What is a List?

A **list** is a collection of items that are:
- **Ordered** - Items have a specific position
- **Changeable** - You can add, remove, or modify items
- **Allow duplicates** - Same item can appear multiple times

\`\`\`python
# A simple list of fruits
fruits = ["apple", "banana", "orange"]
print(fruits)  # ['apple', 'banana', 'orange']
\`\`\`

---

## 📦 List Characteristics

### **Ordered Collection**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
# Position 0: 1, Position 1: 2, etc.
print(numbers[0])  # First item: 1
print(numbers[2])  # Third item: 3
\`\`\`

### **Can Hold Different Types**
\`\`\`python
mixed_list = ["hello", 42, 3.14, True]
print(mixed_list)  # ['hello', 42, 3.14, True]
\`\`\`

### **Allows Duplicates**
\`\`\`python
duplicates = ["apple", "banana", "apple", "cherry"]
print(duplicates)  # ['apple', 'banana', 'apple', 'cherry']
\`\`\`

---

## 🔍 Real-World Examples

\`\`\`python
# Shopping list
shopping = ["bread", "milk", "eggs", "butter"]

# Student grades
grades = [85, 92, 78, 96, 88]

# Mixed information
student = ["Alice", 25, "Computer Science", True]
\`\`\`

Lists are perfect for storing collections of related data! 🛒`
};
