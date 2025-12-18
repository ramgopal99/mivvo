import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_1: SubLesson = {
  id: "2.1",
  title: 'Syntax',
  status: 'demo',
  content: `# 📝 Python Basic Syntax

Python syntax is designed to be clean, readable, and straightforward. Let's explore the fundamental building blocks of Python code.

---

## 🏗️ Python Program Structure

### 1. **Statements and Expressions**
\`\`\`python
# Statement (performs an action)
print("Hello, World!")

# Expression (returns a value)
result = 2 + 3  # Returns 5

# Assignment statement
name = "Alice"
age = 25
\`\`\`

### 2. **💬 Comments**
\`\`\`python
# This is a single-line comment

"""
This is a multi-line comment
or docstring
"""

# Comments help explain your code
user_name = "Bob"  # Store the user's name
\`\`\`

## 📦 Code Blocks and Indentation

### **⚠️ Indentation is Important!**
Python uses **indentation** to define code blocks, not braces like other languages:

\`\`\`python
# ❌ Wrong - inconsistent indentation
# if True:
# print("This will cause an error")

# ✅ Correct - consistent 4-space indentation
if True:
    print("This works!")
    print("Still in the if block")
print("Outside the if block")
\`\`\`

### **🔧 Common Indentation Examples**
\`\`\`python
# Function definition
def greet(name):
    return f"Hello, {name}!"

# Class definition
class Person:
    def __init__(self, name):
        self.name = name
\`\`\`

## 🔑 Keywords and Identifiers

### **🚫 Python Keywords** (Reserved Words)
\`\`\`python
# Some important Python keywords:
False      # Boolean value
True       # Boolean value
None       # Null/empty value
and        # Logical operator
or         # Logical operator
not        # Logical operator
if         # Conditional statement
else       # Alternative condition
elif       # Else if condition
for        # Loop
while      # Loop
def        # Function definition
class      # Class definition
return     # Return from function
import     # Import modules
\`\`\`

### **📋 Naming Rules for Variables and Functions**
\`\`\`python
# ✅ Valid names
name = "Alice"
user_name = "Bob"
total_score = 100
calculate_total = lambda x, y: x + y

# ❌ Invalid names (will cause errors)
# 1name = "Error"      # Cannot start with number
# user-name = "Error"   # Cannot use hyphens
# class = "Error"       # Cannot use keywords
\`\`\`

## 🎨 String Formatting and F-Strings

### **✨ F-String Basics**
\`\`\`python
# F-strings (formatted string literals) - Python 3.6+
# Use f"..." and {variable} to insert values

name = "Alice"
age = 25

# Basic f-string usage
print(f"Hello, {name}!")  # Output: Hello, Alice!
print(f"You are {age} years old.")  # Output: You are 25 years old.

# F-strings with expressions
print(f"Next year you will be {age + 1} years old.")
# Output: Next year you will be 26 years old.

\`\`\`

### **🔧 F-String Formatting Options**
\`\`\`python
# Number formatting
pi = 3.14159265359
print(f"Pi to 2 decimal places: {pi:.2f}")  # Output: Pi to 2 decimal places: 3.14
print(f"Pi to 4 decimal places: {pi:.4f}")  # Output: Pi to 4 decimal places: 3.1416

# Percentage formatting
percentage = 0.856
print(f"Percentage: {percentage:.1%}")  # Output: Percentage: 85.6%

# Zero padding
number = 5
print(f"Zero padded: {number:03d}")  # Output: Zero padded: 005

# String alignment
name = "Alice"
print(f"Left aligned: {name:<10}")   # Output: Left aligned: Alice
\`\`\`

### **📖 F-String Examples**
\`\`\`python
# Real-world examples
student_name = "Bob"
score = 85
grade = "B"

print(f"Student Report:")
print(f"Name: {student_name}")
print(f"Score: {score}/100")
print(f"Grade: {grade}")
print(f"Percentage: {score}%")

# Multi-line f-strings
message = f"""
Student: {student_name}
Score: {score}
Grade: {grade}
Status: {'Pass' if score >= 60 else 'Fail'}
"""

print(message)
\`\`\`

### **⚡ F-String vs Old Methods**
\`\`\`python
name = "Alice"
age = 25

# Old method (still works but not recommended)
print("Hello, " + name + "! You are " + str(age) + " years old.")

# F-string method (recommended)
print(f"Hello, {name}! You are {age} years old.")

# Even older method with % formatting
print("Hello, %s! You are %d years old." % (name, age))
\`\`\`

## 📏 Line Structure

### **🔄 Physical vs Logical Lines**
\`\`\`python
# One physical line, one logical line
name = "Alice"

# One physical line, multiple logical lines (using semicolon)
name = "Alice"; age = 25

# Multiple physical lines, one logical line (using backslash)
total = 1 + 2 + \\
        3 + 4

# Recommended: One statement per line
name = "Alice"
age = 25
total = 1 + 2 + 3 + 4
\`\`\`

## ⭐ Best Practices

### **🎯 Code Style Guidelines**
1. **Use 4 spaces for indentation** (not tabs)
2. **Keep lines under 79 characters**
3. **Use blank lines to separate functions and classes**
4. **Use descriptive names** for variables and functions
5. **Write comments** to explain complex logic

### **📋 Example of Good Python Style**
\`\`\`python
# Calculate the area of a circle
def calculate_area(radius):
    """Calculate the area of a circle given its radius."""
    pi = 3.14159
    area = pi * radius ** 2
    return area

# Use the function
circle_area = calculate_area(5)
print(f"Area: {circle_area}")
\`\`\`

## 📚 Syntax Summary

- **Comment**: Use # comment for single-line comments
- **Multi-line Comment**: Use triple quotes for multi-line comments
- **Code Block**: Use 4 spaces indentation for code blocks
- **Function**: Use def name(): to define functions
- **Variable**: Use name = value for variable assignment

Python's syntax is designed to be **intuitive and readable** - it reads almost like English! 🐍✨`
};

