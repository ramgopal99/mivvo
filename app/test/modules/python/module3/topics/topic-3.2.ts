import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_2: SubLesson = {
  id: 3.2,
  title: 'Creating Lists',
  status: 'demo',
  content: `# 🆕 Creating Python Lists

There are several ways to create lists in Python. Let's explore the most common methods!

---

## 🎯 Basic List Creation

### **Using Square Brackets []**
\`\`\`python
# Empty list
empty_list = []
print(empty_list)  # []

# List with items
fruits = ["apple", "banana", "orange"]
print(fruits)  # ['apple', 'banana', 'orange']

# Numbers list
numbers = [1, 2, 3, 4, 5]
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

---

## 🔧 Using the list() Function

### **From Other Sequences**
\`\`\`python
# From a string
word = "hello"
letters = list(word)
print(letters)  # ['h', 'e', 'l', 'l', 'o']

# From a range
numbers = list(range(1, 6))
print(numbers)  # [1, 2, 3, 4, 5]
\`\`\`

---

## 📝 List Comprehension (Simple)

### **Basic Pattern**
\`\`\`python
# Create a list of squares
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# Create a list of even numbers
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]
\`\`\`

---

## 🎨 Creating Different Types of Lists

\`\`\`python
# String list
colors = ["red", "blue", "green"]

# Number list
scores = [85, 92, 78, 96]

# Mixed list
mixed = ["Alice", 25, True, 3.14]

# Nested list (list of lists)
matrix = [[1, 2], [3, 4], [5, 6]]
print(matrix)  # [[1, 2], [3, 4], [5, 6]]
\`\`\`

---

## ✅ Quick Practice

\`\`\`python
# Create these lists:
# 1. Your favorite foods
foods = ["pizza", "pasta", "salad"]

# 2. Numbers 1 through 10
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 3. Days of the week
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
\`\`\`

Lists can be created in many ways - choose the method that fits your needs! 🎯`
};
