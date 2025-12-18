import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_1: SubLesson = {
  id: 8.1,
  title: 'Introduction to Built-in Functions',
  status: 'demo',
  content: `# 🏗️ Introduction to Built-in Functions

Python comes with many built-in functions that are always available. These are the foundation tools you use every day!

---

## 🎯 What are Built-in Functions?

Built-in functions are functions that Python provides automatically - you don't need to import anything to use them. They're always available in any Python program.

\`\`\`python
# These work anywhere in Python
print("Hello, World!")  # Display text
len([1, 2, 3])         # Get length: 3
max([1, 5, 3])         # Get maximum: 5
min([1, 5, 3])         # Get minimum: 1
sum([1, 2, 3])         # Sum elements: 6
\`\`\`

---

## 📊 Categories of Built-in Functions

### **Type Conversion Functions**
\`\`\`python
int("42")      # String to integer: 42
float("3.14")  # String to float: 3.14
str(42)        # Number to string: "42"
bool(0)        # Number to boolean: False
list("hello")  # String to list: ['h', 'e', 'l', 'l', 'o']
\`\`\`

### **Mathematical Functions**
\`\`\`python
abs(-5)        # Absolute value: 5
round(3.14159, 2)  # Round to 2 decimals: 3.14
pow(2, 3)      # Power: 8
divmod(7, 3)   # Division and modulo: (2, 1)
\`\`\`

### **Sequence Functions**
\`\`\`python
len([1, 2, 3])       # Length: 3
max([1, 5, 3])       # Maximum: 5
min([1, 5, 3])       # Minimum: 1
sum([1, 2, 3])       # Sum: 6
sorted([3, 1, 4])    # Sort: [1, 3, 4]
reversed([1, 2, 3])  # Reverse: <reversed object>
\`\`\`

### **Input/Output Functions**
\`\`\`python
print("Hello")       # Display output
input("Enter name: ") # Get user input
open("file.txt")     # Open file
\`\`\`

### **Utility Functions**
\`\`\`python
range(5)       # Create sequence: range(0, 5)
enumerate([1, 2, 3])  # Add indices: [(0, 1), (1, 2), (2, 3)]
zip([1, 2], ['a', 'b'])  # Combine sequences: [(1, 'a'), (2, 'b')]
type(42)       # Get type: <class 'int'>
id("hello")    # Get memory address
\`\`\`

---

## 🔍 Exploring Built-in Functions

### **See All Built-in Functions**
\`\`\`python
import builtins

# Get all built-in function names
builtin_functions = [name for name in dir(builtins) if callable(getattr(builtins, name))]
print(f"There are {len(builtin_functions)} built-in functions!")
print("First 10:", builtin_functions[:10])

# Check if something is built-in
print("len is built-in:", hasattr(builtins, 'len'))
print("print is built-in:", hasattr(builtins, 'print'))
\`\`\`

### **Help with Built-in Functions**
\`\`\`python
# Get help for any built-in function
help(len)
help(print)
help(max)

# Or use ? in IPython/Jupyter
# len?
# print?
\`\`\`

---

## 🎨 Practical Examples

### **Data Analysis Pipeline**
\`\`\`python
# Sample data
scores = [85, 92, 78, 96, 88, 91, 83]

# Use multiple built-in functions together
print("Original scores:", scores)
print("Number of scores:", len(scores))
print("Highest score:", max(scores))
print("Lowest score:", min(scores))
print("Average score:", round(sum(scores) / len(scores), 2))
print("Sorted scores:", sorted(scores))
print("Score range:", max(scores) - min(scores))

# Check conditions
print("All scores >= 70:", all(score >= 70 for score in scores))
print("Any perfect scores:", any(score == 100 for score in scores))
\`\`\`

### **Text Processing**
\`\`\`python
text = "Hello, World! How are you today?"

print("Original text:", repr(text))
print("Length:", len(text))
print("Uppercase:", text.upper())
print("Words:", text.split())
print("Number of words:", len(text.split()))
print("Contains 'Hello':", "Hello" in text)
print("Starts with 'Hello':", text.startswith("Hello"))
print("Ends with '?':", text.endswith("?"))

# Character analysis
chars = list(text)
print("Unique characters:", len(set(chars)))
print("Most common char:", max(set(chars), key=chars.count))
\`\`\`

### **File Operations**
\`\`\`python
# Working with file paths
import os

files = ["data.txt", "config.py", "image.jpg", "script.py"]
print("All files:", files)

# Filter by extension
python_files = [f for f in files if f.endswith('.py')]
print("Python files:", python_files)

# Get file extensions
extensions = [os.path.splitext(f)[1] for f in files]
print("Extensions:", list(set(extensions)))

# Check file types
print("Has Python files:", any(f.endswith('.py') for f in files))
print("All are Python:", all(f.endswith('.py') for f in files))
\`\`\`

---

## ⚡ Performance Tips

### **Built-in Functions are Fast**
\`\`\`python
import time

# Large dataset
data = list(range(100000))

# Using built-in sum (fast)
start = time.time()
result1 = sum(data)
time1 = time.time() - start

# Manual implementation (slower)
start = time.time()
result2 = 0
for num in data:
    result2 += num
time2 = time.time() - start

print(f"Built-in sum: {time1:.4f}s")
print(f"Manual loop: {time2:.4f}s")
print(f"Built-in is {time2/time1:.1f}x faster!")
\`\`\`

### **Memory Efficient**
\`\`\`python
# Built-ins often use memory efficiently
large_list = list(range(1000000))

# len() is O(1) - instant
print(len(large_list))  # Instant

# max() is O(n) but optimized
print(max(large_list))  # Fast enough
\`\`\`

---

## ✅ Best Practices

1. **Use built-in functions first** - They're optimized and tested
2. **Combine built-ins creatively** - Chain them for powerful operations
3. **Know when to avoid them** - Some built-ins have limitations
4. **Check performance** - Built-ins are usually fastest
5. **Use help() to learn** - Discover function capabilities

Built-in functions are your Python superpower! 🦸‍♂️`
};
