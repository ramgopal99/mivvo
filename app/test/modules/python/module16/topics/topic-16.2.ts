import { SubLesson } from '../../../data/lessonsData';

export const topic_16_2: SubLesson = {
  id: 16.2,
  title: 'Lambda Functions and Functional Programming',
  status: 'demo',
  content: `# λ Lambda Functions and Functional Programming

Lambda functions are anonymous, single-expression functions that are a cornerstone of functional programming in Python. Combined with functional programming concepts like map, filter, and reduce, they enable elegant and concise code. Let's explore this powerful paradigm!

---

## 🎯 What are Lambda Functions?

**Lambda functions** are small, anonymous functions defined with the \`lambda\` keyword. They can take any number of arguments but can only have one expression.

### **Basic Syntax**
\`\`\`python
lambda arguments: expression
\`\`\`

### **Why Use Lambda Functions?**
- **Concise syntax** for simple functions
- **No need for function names** when used once
- **Perfect for functional programming**
- **Often used with higher-order functions**

---

## 💻 Lambda Function Basics

### **Simple Examples**
\`\`\`python
# Regular function
def add(x, y):
    return x + y

# Equivalent lambda
add_lambda = lambda x, y: x + y

print(add(5, 3))        # 8
print(add_lambda(5, 3)) # 8

# Lambda without assignment (anonymous)
print((lambda x, y: x + y)(5, 3))  # 8
\`\`\`

### **Different Parameter Types**
\`\`\`python
# No parameters
no_params = lambda: "Hello World"
print(no_params())  # Hello World

# Single parameter
square = lambda x: x ** 2
print(square(5))  # 25

# Multiple parameters
power = lambda x, y: x ** y
print(power(2, 3))  # 8

# Default parameters
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!

# Variable arguments
sum_all = lambda *args: sum(args)
print(sum_all(1, 2, 3, 4, 5))  # 15

# Keyword arguments
create_dict = lambda **kwargs: kwargs
print(create_dict(name="Alice", age=30))  # {'name': 'Alice', 'age': 30}
\`\`\`

---

## 🔄 Functional Programming with Lambdas

### **Map Function**
\`\`\`python
# Apply a function to each element of an iterable
numbers = [1, 2, 3, 4, 5]

# Using lambda with map
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Multiple iterables
list1 = [1, 2, 3]
list2 = [4, 5, 6]
summed = list(map(lambda x, y: x + y, list1, list2))
print(summed)  # [5, 7, 9]
\`\`\`

### **Filter Function**
\`\`\`python
# Filter elements based on a condition
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Get even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Get numbers greater than 5
greater_than_five = list(filter(lambda x: x > 5, numbers))
print(greater_than_five)  # [6, 7, 8, 9, 10]

# Filter strings by length
words = ["cat", "elephant", "dog", "hippopotamus"]
long_words = list(filter(lambda word: len(word) > 3, words))
print(long_words)  # ['elephant', 'hippopotamus']
\`\`\`

### **Reduce Function**
\`\`\`python
from functools import reduce

# Reduce iterable to a single value
numbers = [1, 2, 3, 4, 5]

# Sum all numbers
total = reduce(lambda x, y: x + y, numbers)
print(total)  # 15

# Find maximum
maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(maximum)  # 5

# Concatenate strings
words = ["Hello", " ", "World", "!"]
sentence = reduce(lambda x, y: x + y, words)
print(sentence)  # Hello World!
\`\`\`

---

## 🔧 Advanced Lambda Patterns

### **Lambda with Conditional Expressions**
\`\`\`python
# Ternary operator in lambda
check_age = lambda age: "Adult" if age >= 18 else "Minor"
print(check_age(20))  # Adult
print(check_age(15))  # Minor

# Multiple conditions
classify_number = lambda x: "Positive" if x > 0 else "Negative" if x < 0 else "Zero"
print(classify_number(5))   # Positive
print(classify_number(-3))  # Negative
print(classify_number(0))   # Zero
\`\`\`

### **Lambda in List Comprehensions**
\`\`\`python
# Lambda inside list comprehension
numbers = [1, 2, 3, 4, 5]
result = [(lambda x: x ** 2)(x) for x in numbers]
print(result)  # [1, 4, 9, 16, 25]

# Better: use lambda with map
result = list(map(lambda x: x ** 2, numbers))
print(result)  # [1, 4, 9, 16, 25]
\`\`\`

### **Sorting with Lambda**
\`\`\`python
# Sort by string length
words = ["apple", "banana", "cherry", "date"]
sorted_by_length = sorted(words, key=lambda x: len(x))
print(sorted_by_length)  # ['date', 'apple', 'banana', 'cherry']

# Sort students by grade
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]
sorted_students = sorted(students, key=lambda student: student["grade"], reverse=True)
print(sorted_students)
# [{'name': 'Bob', 'grade': 92}, {'name': 'Alice', 'grade': 85}, {'name': 'Charlie', 'grade': 78}]
\`\`\`

### **Lambda with Closures**
\`\`\`python
def create_multiplier(n):
    return lambda x: x * n

double = create_multiplier(2)
triple = create_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

# Counter using closure
def create_counter():
    count = 0
    return lambda: (lambda: count + 1)()  # Wait, this is getting complex...

# Simpler counter
def create_counter():
    count = [0]  # Use list to make it mutable
    return lambda: count.__setitem__(0, count[0] + 1) or count[0]

counter = create_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
\`\`\`

---

## 🎯 Higher-Order Functions

### **Functions that Return Functions**
\`\`\`python
def create_operation(operation):
    if operation == "add":
        return lambda x, y: x + y
    elif operation == "multiply":
        return lambda x, y: x * y
    elif operation == "power":
        return lambda x, y: x ** y

add_func = create_operation("add")
multiply_func = create_operation("multiply")
power_func = create_operation("power")

print(add_func(5, 3))      # 8
print(multiply_func(5, 3)) # 15
print(power_func(5, 3))    # 125
\`\`\`

### **Functions that Take Functions as Arguments**
\`\`\`python
def apply_operation(func, x, y):
    return func(x, y)

add = lambda x, y: x + y
multiply = lambda x, y: x * y

print(apply_operation(add, 5, 3))      # 8
print(apply_operation(multiply, 5, 3)) # 15

# More complex example
def apply_to_list(func, numbers):
    return [func(x) for x in numbers]

numbers = [1, 2, 3, 4, 5]
squared = apply_to_list(lambda x: x ** 2, numbers)
cubed = apply_to_list(lambda x: x ** 3, numbers)

print(squared)  # [1, 4, 9, 16, 25]
print(cubed)    # [1, 8, 27, 64, 125]
\`\`\`

---

## 🧪 Practical Examples

### **Example 1: Data Processing**
\`\`\`python
# Process a list of dictionaries
employees = [
    {"name": "Alice", "salary": 50000, "department": "Engineering"},
    {"name": "Bob", "salary": 60000, "department": "Marketing"},
    {"name": "Charlie", "salary": 55000, "department": "Engineering"},
    {"name": "Diana", "salary": 65000, "department": "Sales"}
]

# Filter high earners
high_earners = list(filter(lambda emp: emp["salary"] > 55000, employees))
print("High earners:", [emp["name"] for emp in high_earners])

# Calculate average salary
salaries = list(map(lambda emp: emp["salary"], employees))
average_salary = sum(salaries) / len(salaries)
print("Average salary: $" + str(average_salary)[:4])

# Group by department
from collections import defaultdict
by_dept = defaultdict(list)
for emp in employees:
    by_dept[emp["department"]].append(emp)
print("By department:", dict(by_dept))
\`\`\`

### **Example 2: Custom Sorting**
\`\`\`python
# Sort by multiple criteria
products = [
    {"name": "Laptop", "price": 1000, "rating": 4.5},
    {"name": "Mouse", "price": 50, "rating": 4.2},
    {"name": "Keyboard", "price": 80, "rating": 4.8},
    {"name": "Monitor", "price": 300, "rating": 4.3}
]

# Sort by rating descending, then by price ascending
sorted_products = sorted(products, 
    key=lambda p: (-p["rating"], p["price"]))

print("Sorted by rating (desc), then price (asc):")
for product in sorted_products:
    print(f"{product['name']}: \${product['price']} (rating: {product['rating']})")
\`\`\`

### **Example 3: Event Handling**
\`\`\`python
# Simulate event handling with lambdas
events = []

def on_click(handler):
    events.append(("click", handler))

def on_hover(handler):
    events.append(("hover", handler))

def trigger_event(event_type, data):
    for etype, handler in events:
        if etype == event_type:
            handler(data)

# Register event handlers
on_click(lambda data: print(f"Button clicked: {data}"))
on_hover(lambda data: print(f"Button hovered: {data}"))
on_click(lambda data: print(f"Another click handler: {data}"))

# Trigger events
trigger_event("click", "submit_button")
trigger_event("hover", "submit_button")
\`\`\`

---

## ⚠️ Lambda Limitations

### **What Lambdas Cannot Do**
\`\`\`python
# ❌ Cannot have multiple expressions
# lambda x: print(x); return x  # SyntaxError

# ❌ Cannot have statements
# lambda x: if x > 0: return x else: return -x  # SyntaxError

# ❌ Cannot have docstrings
# lambda x: """This won't work""" return x  # SyntaxError

# ✅ Use regular functions instead
def absolute_value(x):
    """Return the absolute value of x."""
    if x >= 0:
        return x
    else:
        return -x

abs_lambda = lambda x: x if x >= 0 else -x  # This works for simple cases
\`\`\`

---

## 🎯 When to Use Lambdas

### **Good Use Cases**
- **Short, simple functions** used once
- **Higher-order functions** (map, filter, reduce)
- **Sorting with custom keys**
- **Event handlers**
- **Simple calculations**

### **Avoid Lambdas When**
- **Function is complex** - use regular function
- **Function needs documentation** - use regular function
- **Function is reused multiple times** - use regular function
- **Debugging is important** - lambdas are harder to debug

---

## 🏆 Best Practices

### **Lambda Style Guidelines**
\`\`\`python
# ✅ Good: Clear and concise
squares = map(lambda x: x**2, numbers)

# ❌ Bad: Too complex, hard to read
complex_calc = lambda x, y, z: (x + y) * z if x > 0 else (x - y) * z

# ✅ Better: Use regular function for complex logic
def complex_calculation(x, y, z):
    if x > 0:
        return (x + y) * z
    else:
        return (x - y) * z
\`\`\`

### **Naming Conventions**
\`\`\`python
# If lambda is assigned to a variable, use descriptive names
get_even_numbers = lambda lst: list(filter(lambda x: x % 2 == 0, lst))

# Or better, use a regular function
def get_even_numbers(numbers):
    return [x for x in numbers if x % 2 == 0]
\`\`\`

### **Performance Considerations**
\`\`\`python
import time

# Lambda in a loop (inefficient)
start = time.time()
result = []
for i in range(1000000):
    result.append((lambda x: x * 2)(i))
print(f"Lambda in loop: {time.time() - start:.4f}s")

# List comprehension (efficient)
start = time.time()
result = [x * 2 for x in range(1000000)]
print(f"List comprehension: {time.time() - start:.4f}s")
\`\`\`

---

## 🚀 Key Takeaways

1. **Lambda functions** are anonymous, single-expression functions
2. **Functional programming** enables elegant data processing with map, filter, reduce
3. **Lambdas work best** for simple, one-time use functions
4. **Complex logic** should use regular named functions
5. **Higher-order functions** combined with lambdas create powerful patterns

**Lambda functions and functional programming provide elegant solutions for data transformation and processing tasks. Use them wisely to write clean, concise Python code! λ**`
};
