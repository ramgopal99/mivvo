import { SubLesson } from '../../../data/lessonsData';

export const topic_16_1: SubLesson = {
  id: 16.1,
  title: 'Python Modules and Packages',
  status: 'demo',
  content: `# 📦 Python Modules and Packages

Modules and packages are fundamental to organizing and reusing Python code. They allow you to break down large programs into manageable, reusable components. Let's explore how to create, import, and organize Python modules and packages!

---

## 🎯 What are Modules?

**Modules** are Python files containing Python code (functions, classes, variables) that can be imported and used in other Python programs.

### **Why Use Modules?**
- **Code Organization**: Break large programs into smaller, manageable files
- **Code Reusability**: Use the same code across multiple programs
- **Namespace Management**: Avoid naming conflicts
- **Maintainability**: Easier to debug and maintain smaller code units

---

## 💻 Creating and Using Modules

### **Basic Module Creation**
\`\`\`python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

def add_numbers(a, b):
    return a + b

# Module-level variable
PI = 3.14159

# Execute only when run directly
if __name__ == "__main__":
    print("This module is being run directly")
\`\`\`

### **Importing Modules**
\`\`\`python
# Method 1: Import the whole module
import mymodule

result = mymodule.add_numbers(5, 3)
print(mymodule.greet("Alice"))  # Hello, Alice!
print(mymodule.PI)  # 3.14159

# Method 2: Import specific items
from mymodule import greet, PI

print(greet("Bob"))  # Hello, Bob!
print(PI)  # 3.14159

# Method 3: Import with alias
import mymodule as mm

result = mm.add_numbers(10, 20)
\`\`\`

### **The name Variable**
\`\`\`text
# In mymodule.py
print("Module name: " + __name__)

# When imported: Module name: mymodule
# When run directly: Module name: __main__
\`\`\`

---

## 📁 Python Packages

**Packages** are directories containing multiple modules and a special \`__init__.py\` file.

### **Package Structure**
\`\`\`
mypackage/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── submodule.py
\`\`\`

### **Creating a Package**
\`\`\`python
# mypackage/__init__.py
# This file makes Python treat the directory as a package
# Can be empty or contain initialization code

print("mypackage is being imported")

# You can also expose functions from submodules
from .module1 import function1
from .module2 import function2

# Define package-level variables
__version__ = "1.0.0"
\`\`\`

\`\`\`python
# mypackage/module1.py
def function1():
    return "Function 1 from module1"

class MyClass:
    def method(self):
        return "Method from MyClass"
\`\`\`

\`\`\`python
# mypackage/module2.py
def function2():
    return "Function 2 from module2"

def helper_function():
    return "Helper function"
\`\`\`

### **Using Packages**
\`\`\`python
# Import entire package
import mypackage
print(mypackage.function1())  # Function 1 from module1

# Import specific modules
from mypackage import module1
obj = module1.MyClass()
print(obj.method())  # Method from MyClass

# Import specific functions
from mypackage.module2 import function2, helper_function
print(function2())  # Function 2 from module2
\`\`\`

---

## 🔍 Module Search Path

### **How Python Finds Modules**
\`\`\`python
import sys
print(sys.path)  # List of directories Python searches for modules
\`\`\`

**Search Order:**
1. Current directory
2. PYTHONPATH environment variable
3. Python installation directory
4. Site-packages directory

### **Adding to Search Path**
\`\`\`python
import sys
sys.path.append('/path/to/your/modules')

# Or modify PYTHONPATH environment variable
import os
os.environ['PYTHONPATH'] = '/path/to/your/modules'
\`\`\`

---

## 📚 Standard Library Modules

### **Commonly Used Modules**
\`\`\`python
# Math operations
import math
print(math.sqrt(16))  # 4.0
print(math.pi)  # 3.141592653589793

# Date and time
import datetime
now = datetime.datetime.now()
print(now)  # 2024-01-15 10:30:45.123456

# Random numbers
import random
print(random.randint(1, 10))  # Random number between 1 and 10
print(random.choice(['apple', 'banana', 'cherry']))  # Random choice

# Operating system interface
import os
print(os.getcwd())  # Current working directory
print(os.listdir('.'))  # List files in current directory

# JSON handling
import json
data = {'name': 'Alice', 'age': 30}
json_str = json.dumps(data)
print(json_str)  # {"name": "Alice", "age": 30}
\`\`\`

### **Importing Multiple Modules**
\`\`\`python
# Method 1: Multiple import statements
import math
import random
import json

# Method 2: Single import statement
import math, random, json

# Method 3: Import with aliases
import math as m
import random as r
import json as j

print(m.sqrt(25))  # 5.0
print(r.choice([1, 2, 3, 4, 5]))
\`\`\`

---

## 🔧 Advanced Module Features

### **Module Reloading**
\`\`\`python
import importlib
import mymodule

# Modify mymodule.py externally, then reload
importlib.reload(mymodule)
\`\`\`

### **Conditional Imports**
\`\`\`python
try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False
    print("NumPy not available, using alternative implementation")

if HAS_NUMPY:
    arr = np.array([1, 2, 3])
else:
    arr = [1, 2, 3]  # Fallback implementation
\`\`\`

### **Lazy Imports**
\`\`\`python
# Only import when needed (saves startup time)
def use_pandas():
    import pandas as pd
    # Use pandas here
    return pd.DataFrame()

# This is better than importing at module level if pandas is rarely used
\`\`\`

---

## 📦 Package Distribution

### **setup.py for Distribution**
\`\`\`python
# setup.py
from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        'numpy>=1.18.0',
        'pandas>=1.0.0',
    ],
    author="Your Name",
    author_email="your.email@example.com",
    description="A useful Python package",
    url="https://github.com/yourusername/mypackage",
)
\`\`\`

### **Installing Local Packages**
\`\`\`bash
# Install in development mode (symlink)
pip install -e .

# Install normally
pip install .
\`\`\`

---

## 🧪 Module Testing and Examples

### **Test Case 1: Basic Module Usage**
\`\`\`python
# Create a simple calculator module
# calculator.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# main.py
from calculator import add, subtract, multiply, divide

print(add(10, 5))        # 15
print(subtract(10, 5))   # 5
print(multiply(10, 5))   # 50
print(divide(10, 5))     # 2.0
\`\`\`

### **Test Case 2: Package with Submodules**
\`\`\`python
# mylib/
# ├── __init__.py
# ├── math_operations.py
# └── string_operations.py

# mylib/math_operations.py
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# mylib/string_operations.py
def reverse_string(s):
    return s[::-1]

def is_palindrome(s):
    return s == s[::-1]

# mylib/__init__.py
from .math_operations import factorial, fibonacci
from .string_operations import reverse_string, is_palindrome

# Usage
import mylib

print(mylib.factorial(5))          # 120
print(mylib.fibonacci(8))          # 21
print(mylib.reverse_string("hello"))  # olleh
print(mylib.is_palindrome("radar"))   # True
\`\`\`

---

## 🎯 Best Practices

### **Module Organization**
1. **One responsibility per module** - Keep modules focused
2. **Clear naming conventions** - Use descriptive names
3. **Proper documentation** - Include docstrings
4. **Error handling** - Handle exceptions appropriately
5. **Version control** - Use semantic versioning

### **Import Best Practices**
1. **Import at the top** - Put all imports at the beginning
2. **Group imports** - Standard library, third-party, local imports
3. **Use absolute imports** - Prefer \`from package import module\`
4. **Avoid wildcard imports** - Don't use \`from module import *\`
5. **Use aliases wisely** - Only when necessary for clarity

### **Package Best Practices**
1. **Include __init__.py** - Always make directories packages
2. **Define __all__** - Control what's exported
3. **Use relative imports** - Within packages
4. **Include tests** - Test your packages
5. **Document thoroughly** - README, docstrings, examples

---

## 🚀 Key Takeaways

1. **Modules** are Python files that can be imported and reused
2. **Packages** are directories containing modules and __init__.py
3. **Import system** allows flexible code organization
4. **Standard library** provides many useful modules
5. **Best practices** ensure maintainable and reusable code

**Modules and packages are essential for writing organized, maintainable Python code. They enable code reuse and help manage complexity in large projects! 📦**`
};
