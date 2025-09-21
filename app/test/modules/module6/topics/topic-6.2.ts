import { SubLesson } from '../../../data/lessonsData';

export const topic_6_2: SubLesson = {
  id: 6.2,
  title: 'Creating Dictionaries',
  status: 'demo',
  content: `# 🆕 Creating Python Dictionaries

Dictionaries can be created in several ways. Let's explore all the methods!

---

## 🎯 Basic Dictionary Creation

### **Using Curly Braces {}**
\`\`\`python
# Empty dictionary
empty_dict = {}
print(empty_dict)  # {}

# Dictionary with items
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

---

## 🔧 Using the dict() Function

### **From Key-Value Pairs**
\`\`\`python
# Using keyword arguments
person = dict(name="Alice", age=25, city="New York")
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}

# From a list of tuples
pairs = [("name", "Alice"), ("age", 25), ("city", "New York")]
person = dict(pairs)
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}
\`\`\`

---

## 📝 Dictionary Comprehensions

### **Create Dictionaries with Patterns**
\`\`\`python
# Basic comprehension
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)  # {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# String manipulation
word_lengths = {word: len(word) for word in ["cat", "elephant", "dog"]}
print(word_lengths)  # {'cat': 3, 'elephant': 8, 'dog': 3}
\`\`\`

---

## 🔄 Creating from Other Collections

### **From Lists and Tuples**
\`\`\`python
# From two lists (keys and values)
keys = ["name", "age", "city"]
values = ["Alice", 25, "New York"]
person = dict(zip(keys, values))
print(person)  # {'name': 'Alice', 'age': 25, 'city': 'New York'}

# From existing dictionary
original = {"a": 1, "b": 2}
copy_dict = dict(original)
print(copy_dict)  # {'a': 1, 'b': 2}
\`\`\`

---

## 🎨 Creating Different Types of Dictionaries

\`\`\`python
# Mixed data types
mixed_dict = {
    "string_key": "text",
    42: "number key",
    (1, 2): "tuple key",
    True: "boolean key"
}
print(mixed_dict)

# Nested dictionaries
company = {
    "HR": {"employees": 10, "budget": 50000},
    "IT": {"employees": 25, "budget": 150000},
    "Sales": {"employees": 15, "budget": 80000}
}
print(company["IT"]["employees"])  # 25

# List of dictionaries
students = [
    {"name": "Alice", "grade": 95},
    {"name": "Bob", "grade": 87},
    {"name": "Charlie", "grade": 92}
]
print(students[0]["name"])  # Alice
\`\`\`

---

## ✅ Quick Practice

\`\`\`python
# Create these dictionaries:
# 1. Your contact information
contact = {
    "name": "Your Name",
    "email": "your.email@example.com",
    "phone": "123-456-7890"
}

# 2. Product prices
prices = {
    "apple": 2.50,
    "banana": 1.20,
    "orange": 3.00
}

# 3. Dictionary from comprehension
cubes = {x: x**3 for x in range(1, 6)}

# 4. Settings configuration
config = dict(
    debug=True,
    max_users=100,
    timeout=30.0
)

# 5. Translation dictionary
translations = dict([
    ("hello", "hola"),
    ("goodbye", "adiós"),
    ("thank you", "gracias")
])
\`\`\`

Dictionaries are incredibly flexible - choose the creation method that fits your data! 🎯`
};
