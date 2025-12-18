import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_2: SubLesson = {
  id: "4.2",
  title: 'Creating Tuples',
  status: 'demo',
  content: `# 🆕 Creating Python Tuples

Tuples can be created in several ways. Let's explore the most common methods!

---

## 🎯 Basic Tuple Creation

### **Using Parentheses ()**
\`\`\`python
# Empty tuple
empty_tuple = ()
print(empty_tuple)  # ()

# Tuple with items
fruits = ("apple", "banana", "orange")
print(fruits)  # ('apple', 'banana', 'orange')

# Single item tuple (note the comma!)
single = ("hello",)
print(single)      # ('hello',)
print(type(single)) # <class 'tuple'>

# Without comma - this is just a string!
not_tuple = ("hello")
print(not_tuple)     # 'hello'
print(type(not_tuple)) # <class 'str'>
\`\`\`

---

## 🔧 Using the tuple() Function

### **From Other Sequences**
\`\`\`python
# From a list
my_list = [1, 2, 3, 4]
my_tuple = tuple(my_list)
print(my_tuple)  # (1, 2, 3, 4)

# From a string
word = "hello"
letters = tuple(word)
print(letters)  # ('h', 'e', 'l', 'l', 'o')

# From a range
numbers = tuple(range(1, 6))
print(numbers)  # (1, 2, 3, 4, 5)
\`\`\`

---

## 📝 Tuple Packing and Unpacking

### **Tuple Packing**
\`\`\`python
# Creating tuple without parentheses (packing)
point = 10, 20, 30
print(point)      # (10, 20, 30)
print(type(point)) # <class 'tuple'>
\`\`\`

### **Tuple Unpacking**
\`\`\`python
# Unpacking tuple into variables
coordinates = (100, 200, 300)
x, y, z = coordinates
print(f"x={x}, y={y}, z={z}")  # x=100, y=200, z=300

# Unpacking with *
first, *middle, last = (1, 2, 3, 4, 5)
print(f"first={first}, middle={middle}, last={last}")
# first=1, middle=[2, 3, 4], last=5
\`\`\`

---

## 🎨 Creating Different Types of Tuples

\`\`\`python
# String tuple
colors = ("red", "blue", "green")

# Number tuple
scores = (85, 92, 78, 96)

# Mixed tuple
mixed = ("Alice", 25, True, 3.14)

# Nested tuple (tuple of tuples)
matrix = ((1, 2), (3, 4), (5, 6))
print(matrix)  # ((1, 2), (3, 4), (5, 6))
\`\`\`

---

## ✅ Quick Practice

\`\`\`python
# Create these tuples:
# 1. Your three favorite colors
colors = ("blue", "green", "purple")

# 2. Coordinates (x, y)
point = (15, 25)

# 3. RGB color values for red
red_rgb = (255, 0, 0)

# 4. Single item tuple
single_item = ("important",)

# 5. Convert list to tuple
my_list = [1, 2, 3]
my_tuple = tuple(my_list)
\`\`\`

Tuples are created similarly to lists but with parentheses! 📦`
};

