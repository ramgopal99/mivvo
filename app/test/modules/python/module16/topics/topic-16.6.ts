import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_6: SubLesson = {
  id: 16.6,
  title: 'List Comprehensions and Comprehensions',
  status: 'demo',
  content: `# 📋 List Comprehensions and Comprehensions

List comprehensions are Python's elegant way to create lists from iterables with built-in filtering and transformation. Combined with dictionary and set comprehensions, they provide powerful and readable syntax for data manipulation. Let's master these essential Python features!

---

## 🎯 What are List Comprehensions?

**List comprehensions** provide a concise way to create lists by applying an expression to each item in an iterable, with optional filtering.

### **Basic Syntax**
\`\`\`python
[expression for item in iterable if condition]
\`\`\`

### **Why Use Comprehensions?**
- **Concise and readable** - Replace multi-line loops with single expressions
- **Efficient** - Often faster than equivalent loop-based code
- **Expressive** - Combine filtering, mapping, and transformation
- **Pythonic** - Follow Python's philosophy of readable code

---

## 💻 Basic List Comprehensions

### **Simple Transformation**
\`\`\`python
# Traditional approach
numbers = [1, 2, 3, 4, 5]
squares = []
for num in numbers:
    squares.append(num ** 2)
print(squares)  # [1, 4, 9, 16, 25]

# List comprehension
squares = [num ** 2 for num in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# With strings
words = ["hello", "world", "python"]
upper_words = [word.upper() for word in words]
print(upper_words)  # ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

### **With Conditional Filtering**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Even numbers only
evens = [num for num in numbers if num % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Numbers greater than 5
greater_than_five = [num for num in numbers if num > 5]
print(greater_than_five)  # [6, 7, 8, 9, 10]

# Complex conditions
complex_filter = [num for num in numbers if num % 2 == 0 and num > 4]
print(complex_filter)  # [6, 8, 10]
\`\`\`

### **Conditional Expressions**
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6]

# Transform with condition
result = [num * 2 if num % 2 == 0 else num for num in numbers]
print(result)  # [1, 4, 3, 8, 5, 12]

# Classify numbers
classification = ["even" if num % 2 == 0 else "odd" for num in numbers]
print(classification)  # ['odd', 'even', 'odd', 'even', 'odd', 'even']
\`\`\`

---

## 🎨 Advanced List Comprehensions

### **Nested Loops**
\`\`\`python
# Traditional nested loops
matrix = []
for i in range(3):
    row = []
    for j in range(3):
        row.append(i * j)
    matrix.append(row)
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# List comprehension equivalent
matrix = [[i * j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]

# Flatten nested lists
nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in nested for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### **Multiple Conditions**
\`\`\`python
students = [
    {"name": "Alice", "grade": 85, "age": 20},
    {"name": "Bob", "grade": 92, "age": 19},
    {"name": "Charlie", "grade": 78, "age": 21},
    {"name": "Diana", "grade": 95, "age": 18}
]

# Complex filtering
honor_students = [
    student["name"] 
    for student in students 
    if student["grade"] >= 90 and student["age"] >= 19
]
print(honor_students)  # ['Bob']

# Multiple transformations
student_info = [
    f"{s['name']} ({s['age']}): {'A' if s['grade'] >= 90 else 'B' if s['grade'] >= 80 else 'C'}"
    for s in students
]
print(student_info)
# ['Alice (20): B', 'Bob (19): A', 'Charlie (21): C', 'Diana (18): A']
\`\`\`

---

## 🔧 Dictionary Comprehensions

### **Basic Dictionary Comprehension**
\`\`\`python
# Traditional approach
numbers = [1, 2, 3, 4, 5]
squares_dict = {}
for num in numbers:
    squares_dict[num] = num ** 2
print(squares_dict)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Dictionary comprehension
squares_dict = {num: num ** 2 for num in numbers}
print(squares_dict)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With filtering
even_squares = {num: num ** 2 for num in numbers if num % 2 == 0}
print(even_squares)  # {2: 4, 4: 16}
\`\`\`

### **Advanced Dictionary Operations**
\`\`\`python
# Invert dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {value: key for key, value in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# Transform keys and values
data = {"name": "Alice", "age": 25, "city": "NYC"}
formatted = {key.upper(): str(value).upper() for key, value in data.items()}
print(formatted)  # {'NAME': 'ALICE', 'AGE': '25', 'CITY': 'NYC'}

# Conditional dictionary comprehension
scores = {"Alice": 85, "Bob": 92, "Charlie": 78}
grades = {name: "Pass" if score >= 80 else "Fail" for name, score in scores.items()}
print(grades)  # {'Alice': 'Pass', 'Bob': 'Pass', 'Charlie': 'Fail'}
\`\`\`

---

## ⚡ Set Comprehensions

### **Basic Set Comprehension**
\`\`\`python
# Traditional approach
numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_squares = set()
for num in numbers:
    unique_squares.add(num ** 2)
print(unique_squares)  # {16, 1, 4, 9}

# Set comprehension
unique_squares = {num ** 2 for num in numbers}
print(unique_squares)  # {16, 1, 4, 9}

# With filtering
even_squares = {num ** 2 for num in numbers if num % 2 == 0}
print(even_squares)  # {4, 16}
\`\`\`

### **Set Operations with Comprehensions**
\`\`\`python
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# Union with transformation
union_squares = {x ** 2 for x in set1 | set2}
print(union_squares)  # {1, 4, 9, 16, 25, 36, 49, 64}

# Intersection with condition
intersection_filtered = {x for x in set1 & set2 if x > 4}
print(intersection_filtered)  # {5}

# Symmetric difference
sym_diff = {x for x in set1 ^ set2}
print(sym_diff)  # {1, 2, 3, 6, 7, 8}
\`\`\`

---

## 🎯 Generator Expressions

### **Memory-Efficient Alternatives**
\`\`\`python
# List comprehension (creates entire list)
squares_list = [x ** 2 for x in range(1000000)]  # Uses ~4GB memory

# Generator expression (lazy evaluation)
squares_gen = (x ** 2 for x in range(1000000))   # Uses minimal memory

print(f"List type: {type(squares_list)}")       # <class 'list'>
print(f"Gen type: {type(squares_gen)}")         # <class 'generator'>

# Use generator in loops
for square in squares_gen:
    if square > 100:
        break
    print(square, end=" ")  # 0 1 4 9 16 25 36 49 64 81
\`\`\`

### **Generator Expression Syntax**
\`\`\`python
# Similar to list comprehensions but with parentheses
gen_expr = (expression for item in iterable if condition)

# Examples
even_gen = (x for x in range(10) if x % 2 == 0)
print(list(even_gen))  # [0, 2, 4, 6, 8]

# Nested generator expressions
nested_gen = ((i, j) for i in range(3) for j in range(3) if i != j)
print(list(nested_gen))  # [(0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1)]
\`\`\`

---

## 🧪 Practical Examples

### **Example 1: Data Processing**
\`\`\`python
# Sample data
data = [
    {"name": "Alice", "scores": [85, 92, 88]},
    {"name": "Bob", "scores": [78, 85, 90]},
    {"name": "Charlie", "scores": [92, 95, 89]}
]

# Calculate average scores
averages = [sum(student["scores"]) / len(student["scores"]) for student in data]
print(averages)  # [88.33333333333333, 84.33333333333333, 92.0]

# Students with average >= 85
top_students = [
    student["name"] 
    for student in data 
    if sum(student["scores"]) / len(student["scores"]) >= 85
]
print(top_students)  # ['Alice', 'Charlie']

# Flatten all scores
all_scores = [score for student in data for score in student["scores"]]
print(all_scores)  # [85, 92, 88, 78, 85, 90, 92, 95, 89]
\`\`\`

### **Example 2: Text Processing**
\`\`\`python
text = "The quick brown fox jumps over the lazy dog"

# Word lengths
word_lengths = [len(word) for word in text.split()]
print(word_lengths)  # [3, 5, 5, 3, 5, 4, 3, 4, 3]

# Words longer than 4 characters
long_words = [word for word in text.split() if len(word) > 4]
print(long_words)  # ['quick', 'brown', 'jumps', 'lazy']

# Word frequency dictionary
words = text.lower().split()
word_freq = {word: words.count(word) for word in set(words)}
print(word_freq)  # {'the': 2, 'quick': 1, 'brown': 1, ...}

# Character frequency (case insensitive)
char_freq = {char: text.lower().count(char) for char in set(text.lower()) if char.isalpha()}
print(char_freq)  # {'t': 2, 'h': 2, 'e': 4, ...}
\`\`\`

### **Example 3: Matrix Operations**
\`\`\`python
# Create a 3x3 matrix
matrix = [[i * 3 + j for j in range(3)] for i in range(3)]
print(matrix)  # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

# Transpose matrix
transposed = [[row[i] for row in matrix] for i in range(len(matrix[0]))]
print(transposed)  # [[0, 3, 6], [1, 4, 7], [2, 5, 8]]

# Matrix multiplication preparation
matrix1 = [[1, 2], [3, 4]]
matrix2 = [[5, 6], [7, 8]]

# Element-wise multiplication (not standard matrix multiplication)
result = [[a * b for a, b in zip(row1, row2)] for row1, row2 in zip(matrix1, matrix2)]
print(result)  # [[5, 12], [21, 32]]

# Flatten matrix
flattened = [num for row in matrix for num in row]
print(flattened)  # [0, 1, 2, 3, 4, 5, 6, 7, 8]
\`\`\`

---

## ⚡ Performance Considerations

### **When to Use Comprehensions**
\`\`\`python
import time

# Test data
numbers = list(range(1000000))

# List comprehension
start = time.time()
squares_lc = [x ** 2 for x in numbers]
lc_time = time.time() - start

# Traditional loop
start = time.time()
squares_loop = []
for x in numbers:
    squares_loop.append(x ** 2)
loop_time = time.time() - start

print(f"List comprehension: {lc_time:.4f}s")
print(f"Traditional loop: {loop_time:.4f}s")
print(f"Comprehension is {loop_time/lc_time:.1f}x faster")

# Memory usage
import sys
print(f"List memory: {sys.getsizeof(squares_lc)} bytes")
\`\`\`

### **Comprehension vs Loop Readability**
\`\`\`python
# ✅ Readable comprehension
even_squares = [x ** 2 for x in range(10) if x % 2 == 0]

# ❌ Overly complex comprehension (hard to read)
complex_result = [
    x * y + z 
    for x in range(5) 
    if x > 1 
    for y in range(3) 
    if y < 2 
    for z in range(2) 
    if z == 0
]

# ✅ Better as a regular loop for complex logic
complex_result = []
for x in range(5):
    if x > 1:
        for y in range(3):
            if y < 2:
                for z in range(2):
                    if z == 0:
                        complex_result.append(x * y + z)
\`\`\`

---

## 🎯 Comprehension Best Practices

### **Readability Guidelines**
\`\`\`python
# ✅ Keep it simple
simple = [x ** 2 for x in range(10)]

# ✅ Use descriptive variable names
squares_of_even_numbers = [num ** 2 for num in numbers if num % 2 == 0]

# ❌ Avoid deeply nested comprehensions
# Hard to read and debug
nested = [x for x in [y for y in range(10) if y > 5] if x < 8]

# ✅ Break complex comprehensions into multiple steps
temp = [y for y in range(10) if y > 5]
result = [x for x in temp if x < 8]
\`\`\`

### **Performance Tips**
\`\`\`python
# ✅ Use generator expressions for large datasets
large_gen = (x ** 2 for x in range(1000000))  # Memory efficient

# ✅ Prefer comprehensions over map/filter for simple operations
# Map/filter can be less readable
traditional = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, range(10))))
comprehension = [x ** 2 for x in range(10) if x % 2 == 0]

# ✅ Use set/dict comprehensions when appropriate
unique_values = {x for x in data if x > 0}  # Set comprehension
value_map = {x: x ** 2 for x in range(5)}  # Dict comprehension
\`\`\`

---

## 🧪 Advanced Patterns

### **Comprehension with walrus operator (Python 3.8+)**
\`\`\`python
# Walrus operator in comprehensions
data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Calculate and filter in one step
results = [y for x in data if (y := x ** 2) > 10]
print(results)  # [16, 25, 36, 49, 64, 81, 100]

# More complex example
products = [
    {"name": "Widget A", "price": 10, "cost": 7},
    {"name": "Widget B", "price": 15, "cost": 12},
    {"name": "Widget C", "price": 8, "cost": 6}
]

# Calculate profit margin and filter
profitable = [
    {"name": item["name"], "margin": margin}
    for item in products
    if (margin := ((item["price"] - item["cost"]) / item["price"]) * 100) > 25
]
print(profitable)
\`\`\`

### **Multiple Assignments in Comprehensions**
\`\`\`python
# Unpacking in comprehensions
pairs = [(1, 2), (3, 4), (5, 6)]
sums = [x + y for x, y in pairs]
print(sums)  # [3, 7, 11]

# Dictionary items
data = {"a": 1, "b": 2, "c": 3}
formatted = [f"{key}={value}" for key, value in data.items()]
print(formatted)  # ['a=1', 'b=2', 'c=3']
\`\`\`

---

## 🚀 Key Takeaways

1. **List comprehensions** create lists with concise, readable syntax
2. **Dictionary and set comprehensions** work similarly for other data types
3. **Generator expressions** provide memory-efficient alternatives
4. **Conditional filtering** and **transformation** can be combined
5. **Nested comprehensions** handle complex data structures
6. **Performance** is often better than traditional loops
7. **Readability** should guide when to use comprehensions vs loops

**Comprehensions are a cornerstone of Pythonic code. They make data manipulation elegant, efficient, and readable! 📋**`
};
