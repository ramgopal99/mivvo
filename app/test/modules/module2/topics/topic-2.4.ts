import { SubLesson } from '../../../data/lessonsData';

export const topic_2_4: SubLesson = {
  id: 2.4,
  title: 'Loops',
  status: 'demo',
  content: `# 🚀 Python Loops - Fast Track Template

Master Python loops from basic to advanced! Each level builds on the previous with templates and examples.

---

## 🎯 RANGE() FUNCTION - Essential Foundation

### **Template: range() Basics**
\`\`\`python
# Template: range(stop)
range(STOP)  # 0 to stop-1

# Template: range(start, stop)
range(START, STOP)  # start to stop-1

# Template: range(start, stop, step)
range(START, STOP, STEP)  # start to stop-1, incrementing by step
\`\`\`

### **Essential range() Examples:**
\`\`\`python
# Basic range - 0 to 4
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Range with start and stop
for i in range(3, 8):
    print(i)  # 3, 4, 5, 6, 7

# Range with step (even numbers)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Range with negative step (backwards)
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1

# Range with negative step (backwards from positive)
for i in range(5, -1, -1):
    print(i)  # 5, 4, 3, 2, 1, 0
\`\`\`

### **Common range() Patterns:**
\`\`\`python
# Count from 1 to n
for i in range(1, 6):
    print(f"Count: {i}")  # Count: 1, 2, 3, 4, 5

# Generate multiples
for i in range(0, 21, 3):
    print(f"Multiple of 3: {i}")  # 0, 3, 6, 9, 12, 15, 18

# Create index-based loops
items = ["apple", "banana", "cherry"]
for i in range(len(items)):  # len() returns the length of the list (3)
    print(f"Item {i}: {items[i]}")
\`\`\`

### **What is len()?**
\`\`\`python
# len() function returns the number of items in a collection
my_list = ["a", "b", "c"]
print(len(my_list))  # Output: 3

my_string = "hello"
print(len(my_string))  # Output: 5

my_dict = {"key1": "value1", "key2": "value2"}
print(len(my_dict))  # Output: 2 (number of key-value pairs)

# Common use: range(len(collection)) creates indices 0 to length-1
for i in range(len(items)):  # Creates: 0, 1, 2
    print(f"Index {i}: {items[i]}")
\`\`\`

---

## 📚 LEVEL 1: BASIC - Simple Loops

### **Template 1: Basic For Loop with Range**
\`\`\`python
# Template: for i in range(n):
for i in range(N):
    # Do something with i
    ACTION
\`\`\`

### **Examples:**
\`\`\`python
# Count from 0 to 4
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop with start, stop, step
for i in range(2, 10, 2):
    print(i)  # 2, 4, 6, 8

# Loop backwards
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
\`\`\`

### **Template 2: For Loop with Lists**
\`\`\`python
# Template: for item in list:
for ITEM in COLLECTION:
    # Do something with item
    ACTION
\`\`\`

### **Examples:**
\`\`\`python
# Loop through fruits
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")

# Output:
# I like apple
# I like banana
# I like orange

# Loop with index
for index, fruit in enumerate(fruits):
    print(f"Fruit {index}: {fruit}")

# Output:
# Fruit 0: apple
# Fruit 1: banana
# Fruit 2: orange
\`\`\`

---

## 📈 LEVEL 2: INTERMEDIATE - While Loops & Control

### **Template 3: Basic While Loop**
\`\`\`python
# Template: while condition:
while CONDITION:
    # Do something
    ACTION
    # Update condition variable
    UPDATE_CONDITION
\`\`\`

### **Examples:**
\`\`\`python
# Count with while
count = 0
while count < 5:
    print(count)
    count += 1

# Output:
# 0
# 1
# 2
# 3
# 4

# Password checker
password = ""
while password != "secret":
    password = input("Enter password: ")
    if password == "secret":
        print("Access granted!")
    else:
        print("Try again!")

# Example output (when user types "wrong", "password", then "secret"):
# Enter password: wrong
# Try again!
# Enter password: password
# Try again!
# Enter password: secret
# Access granted!
\`\`\`

### **Control Statements Template**
\`\`\`python
# Break: Exit loop early
if CONDITION:
    break

# Continue: Skip current iteration
if CONDITION:
    continue

# Pass: Placeholder
if CONDITION:
    pass  # TODO: implement later
\`\`\`

### **Examples:**
\`\`\`python
# Break example
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num == 3:
        print("Found 3, stopping!")
        break
    print(num)

# Output:
# 1
# 2
# Found 3, stopping!

# Continue example
for i in range(6):
    if i % 2 == 0:
        continue
    print(i)  # Only odd numbers

# Output:
# 1
# 3
# 5
\`\`\`

---

## 🔧 LEVEL 3: ADVANCED - Nested Loops & Comprehensions

### **Template 4: Nested Loops**
\`\`\`python
# Template: Loops inside loops
for OUTER_ITEM in OUTER_COLLECTION:
    for INNER_ITEM in INNER_COLLECTION:
        # Do something with both items
        ACTION
\`\`\`

### **Examples:**
\`\`\`python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print("---")

# Output:
# 1 x 1 = 1
# 1 x 2 = 2
# 1 x 3 = 3
# ---
# 2 x 1 = 2
# 2 x 2 = 4
# 2 x 3 = 6
# ---
# 3 x 1 = 3
# 3 x 2 = 6
# 3 x 3 = 9
# ---

# Pattern printing
for i in range(5):
    for j in range(i + 1):
        print("*", end="")
    print()

# Output:
# *
# **
# ***
# ****
# *****
\`\`\`

### **Template 5: List Comprehension**
\`\`\`python
# Template: [expression for item in collection]
result = [EXPRESSION for ITEM in COLLECTION]

# With condition
result = [EXPRESSION for ITEM in COLLECTION if CONDITION]
\`\`\`

### **Examples:**
\`\`\`python
# Traditional vs comprehension
squares = []
for i in range(5):
    squares.append(i ** 2)

# Same with comprehension
squares = [i ** 2 for i in range(5)]

# With condition
even_squares = [i ** 2 for i in range(10) if i % 2 == 0]

# Nested comprehension
matrix = [[i * j for j in range(3)] for i in range(3)]

print(squares)          # [0, 1, 4, 9, 16]
print(even_squares)     # [0, 4, 16, 36, 64]
print(matrix)           # [[0, 0, 0], [0, 1, 2], [0, 2, 4]]
\`\`\`

---

## 🎯 LEVEL 4: EXPERT - Real-World Patterns

### **Template 6: Common Loop Patterns**
\`\`\`python
# Template: Sum with loop
total = 0
for item in collection:
    total += item

# Template: Find max/min
maximum = collection[0]
for item in collection[1:]:
    if item > maximum:
        maximum = item

# Template: Count occurrences
count = 0
for item in collection:
    if CONDITION:
        count += 1
\`\`\`

### **Simple Real-World Example:**

\`\`\`python
# Daily Step Counter
print("Daily Step Counter")
print("==================")

# Count steps for each day
total_steps = 0
days = 7

for day in range(1, days + 1):
    # Assume we walk different steps each day
    if day == 1:
        steps = 8500
    elif day == 2:
        steps = 9200
    elif day == 3:
        steps = 7800
    elif day == 4:
        steps = 10100
    elif day == 5:
        steps = 8900
    elif day == 6:
        steps = 9500
    else:  # day 7
        steps = 8800

    print(f"Day {day}: {steps} steps")
    total_steps += steps

# Calculate average
average_steps = total_steps // days
print(f"\nTotal steps: {total_steps}")
print(f"Average per day: {average_steps}")
print(f"Goal reached: {'Yes' if average_steps >= 8000 else 'No'}")

# Output:
# Day 1: 8500 steps
# Day 2: 9200 steps
# Day 3: 7800 steps
# Day 4: 10100 steps
# Day 5: 8900 steps
# Day 6: 9500 steps
# Day 7: 8800 steps
#
# Total steps: 62800
# Average per day: 8971
# Goal reached: Yes
\`\`\`

---`
};
