import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_5: SubLesson = {
  id: 4.5,
  title: 'Tuple Operations',
  status: 'demo',
  content: `# ⚡ Tuple Operations

Even though tuples are immutable, you can still perform many useful operations on them!

---

## ➕ Concatenation

### **Joining Tuples**
\`\`\`python
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)

# Using + operator
combined = tuple1 + tuple2
print(combined)  # (1, 2, 3, 4, 5, 6)

# Multiple concatenations
fruits = ("apple", "banana") + ("orange", "grape")
print(fruits)  # ('apple', 'banana', 'orange', 'grape')
\`\`\`

---

## 🔄 Repetition

### **Repeating Tuples**
\`\`\`python
single = ("hello",)
repeated = single * 3
print(repeated)  # ('hello', 'hello', 'hello')

# Repeating numbers
zeros = (0,) * 5
print(zeros)  # (0, 0, 0, 0, 0)

# Pattern creation
pattern = ("A", "B") * 2
print(pattern)  # ('A', 'B', 'A', 'B')
\`\`\`

---

## ✂️ Slicing

### **Extracting Parts**
\`\`\`python
numbers = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

# Get first 3 elements
print(numbers[:3])   # (0, 1, 2)

# Get last 3 elements
print(numbers[-3:])  # (7, 8, 9)

# Get middle elements
print(numbers[2:7])  # (2, 3, 4, 5, 6)

# Get every other element
print(numbers[::2])  # (0, 2, 4, 6, 8)

# Reverse tuple
print(numbers[::-1]) # (9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
\`\`\`

---

## 🔄 Unpacking Operations

### **Advanced Unpacking**
\`\`\`python
# Basic unpacking
point = (10, 20, 30)
x, y, z = point
print(f"x={x}, y={y}, z={z}")

# Extended unpacking
data = (1, 2, 3, 4, 5)
first, *middle, last = data
print(f"first={first}, middle={middle}, last={last}")
# first=1, middle=[2, 3, 4], last=5

# Ignoring values with underscore
name, age, _ = ("Alice", 25, "Engineer")
print(f"{name} is {age} years old")

# Nested unpacking
nested = ((1, 2), (3, 4), (5, 6))
(a, b), (c, d), (e, f) = nested
print(f"a={a}, b={b}, c={c}, d={d}, e={e}, f={f}")
\`\`\`

---

## 🔍 Membership and Comparison

### **Checking Contents**
\`\`\`python
fruits = ("apple", "banana", "orange", "grape")

# Membership
print("apple" in fruits)      # True
print("watermelon" in fruits) # False

# Subsequence checking
print(fruits[:2])  # ('apple', 'banana')
print(fruits[1:3]) # ('banana', 'orange')

# Comparison
tuple1 = (1, 2, 3)
tuple2 = (1, 2, 3)
tuple3 = (1, 2, 4)

print(tuple1 == tuple2)  # True
print(tuple1 == tuple3)  # False
print(tuple1 < tuple3)   # True (compares element by element)
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Working with coordinates
point1 = (10, 20)
point2 = (30, 40)

# Combine coordinates
all_points = point1 + point2
print(f"All points: {all_points}")  # (10, 20, 30, 40)

# Create grid pattern
grid = ((0, 0), (0, 1), (1, 0), (1, 1))
print(f"Grid: {grid}")

# Extract RGB components
colors = ((255, 0, 0), (0, 255, 0), (0, 0, 255))
for r, g, b in colors:
    print(f"RGB: ({r}, {g}, {b})")

# Matrix operations
matrix = ((1, 2, 3), (4, 5, 6), (7, 8, 9))
first_row = matrix[0]
print(f"First row: {first_row}")     # (1, 2, 3)
first_column = tuple(row[0] for row in matrix)
print(f"First column: {first_column}")  # (1, 4, 7)
\`\`\`

Tuples support many operations while staying immutable! 🔒`
};
