import { Course } from './types';

export const dummyCourses: Course[] = [
  {
    id: '1',
    title: 'Python Programming Fundamentals',
    description: 'Learn Python programming fundamentals and data analysis techniques. Build a strong foundation in Python development.',
    instructor: 'Lisa Wang',
    duration: '14 hours',
    level: 'Beginner',
    price: 69.99,
    rating: 4.7,
    students: 1650,
    tags: ['Python', 'Programming', 'Fundamentals'],
    thumbnail: '/api/placeholder/300/200'
  }
];

export const courseCategories = [
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Design',
  'DevOps',
  'Security',
  'Business',
];

export const courseLevels = ['Beginner', 'Intermediate', 'Advanced'] as const;

// Python Course Topics and Subtopics
export const pythonTopics = [
  {
    id: '1',
    title: 'Python Basics',
    subtopics: [
      'Introduction to Python',
      'Variables and Data Types',
      'Operators and Expressions',
      'Input and Output',
      'Comments and Documentation'
    ],
    content: {
      'Introduction to Python': `# Introduction to Python

## What is Python?

Python is a high-level, interpreted programming language that emphasizes code readability and simplicity. Created by Guido van Rossum and first released in 1991, Python has become one of the most popular programming languages worldwide.

## Key Features of Python

### 🎯 **Easy to Learn**
Python has a simple syntax that mimics natural language, making it beginner-friendly.

### 🔧 **Versatile**
Python can be used for:
- Web development
- Data analysis
- Machine learning
- Automation
- Game development
- And much more!

### 📚 **Large Community**
Python has a vast ecosystem of libraries and frameworks, and a supportive community.

## Why Learn Python?

1. **High Demand**: Python developers are in high demand across industries
2. **Multiple Applications**: From web apps to data science
3. **Growing Ecosystem**: Constantly evolving with new libraries and tools
4. **Career Opportunities**: Opens doors to various tech roles

## Getting Started

To run Python code, you'll need:
- Python interpreter (version 3.6+ recommended)
- A code editor (VS Code, PyCharm, etc.)
- Basic understanding of programming concepts

Let's dive into your Python journey! 🚀`,

      'Variables and Data Types': `# Variables and Data Types in Python

## What are Variables?

Variables are containers for storing data values. In Python, you don't need to declare the type of variable - Python automatically determines it.

## Creating Variables

\`\`\`python
# String variable
name = "John Doe"

# Integer variable
age = 25

# Float variable
height = 5.9

# Boolean variable
is_student = True
\`\`\`

## Python Data Types

### 📝 **Strings**
Text data enclosed in quotes.

\`\`\`python
# Single quotes
name = 'Python'

# Double quotes
greeting = "Hello, World!"

# Multi-line strings
message = """This is a
multi-line string"""
\`\`\`

### 🔢 **Numbers**

**Integers**: Whole numbers
\`\`\`python
age = 25
year = 2024
\`\`\`

**Floats**: Decimal numbers
\`\`\`python
pi = 3.14159
temperature = 23.5
\`\`\`

### ✅ **Booleans**
True or False values
\`\`\`python
is_raining = True
has_license = False
\`\`\`

## Variable Naming Rules

1. **Start with letter or underscore**: \`name\`, \`_private\`
2. **Can contain letters, numbers, underscores**: \`user_age\`, \`data_2024\`
3. **Case sensitive**: \`Name ≠ name\`
4. **No reserved keywords**: Don't use \`if\`, \`for\`, \`class\`, etc.

## Best Practices

- Use descriptive names: \`user_age\` instead of \`ua\`
- Use snake_case for variables: \`first_name\`
- Keep names concise but meaningful

## Type Checking

Use \`type()\` to check variable types:

\`\`\`python
name = "Alice"
age = 30
height = 5.7

print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(height))  # <class 'float'>
\`\`\``,

      'Operators and Expressions': `# Operators and Expressions in Python

## What are Operators?

Operators are special symbols that perform operations on variables and values. Python supports various types of operators.

## Arithmetic Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| \`+\` | Addition | \`5 + 3\` | \`8\` |
| \`-\` | Subtraction | \`10 - 4\` | \`6\` |
| \`*\` | Multiplication | \`7 * 6\` | \`42\` |
| \`/\` | Division | \`15 / 3\` | \`5.0\` |
| \`//\` | Floor Division | \`17 // 3\` | \`5\` |
| \`%\` | Modulus | \`17 % 3\` | \`2\` |
| \`**\` | Exponentiation | \`2 ** 3\` | \`8\` |

### Examples:
\`\`\`python
a = 10
b = 3

print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a / b)   # 3.333...
print(a // b)  # 3
print(a % b)   # 1
print(a ** b)  # 1000
\`\`\`

## Comparison Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| \`==\` | Equal to | \`5 == 5\` | \`True\` |
| \`!=\` | Not equal to | \`5 != 3\` | \`True\` |
| \`>\` | Greater than | \`7 > 3\` | \`True\` |
| \`<\` | Less than | \`2 < 8\` | \`True\` |
| \`>=\` | Greater or equal | \`5 >= 5\` | \`True\` |
| \`<\` | Less or equal | \`3 <= 4\` | \`True\` |

### Examples:
\`\`\`python
x = 10
y = 5

print(x == y)  # False
print(x != y)  # True
print(x > y)   # True
print(x < y)   # False
print(x >= y)  # True
print(x <= y)  # False
\`\`\``,

      'Input and Output': `# Input and Output in Python

## Introduction to I/O

Input and Output (I/O) operations allow your program to interact with users and display results. Python provides simple ways to handle both input and output.

## Output with print()

The \`print()\` function displays information to the console.

### Basic Usage:
\`\`\`python
# Simple print
print("Hello, World!")

# Print multiple values
print("Name:", "John", "Age:", 25)

# Print with separator
print("Python", "is", "awesome", sep="-")  # Python-is-awesome

# Print without newline
print("Hello", end=" ")
print("World!")  # Hello World!
\`\`\`

## Input with input()

The \`input()\` function reads user input from the keyboard.

### Basic Usage:
\`\`\`python
# Simple input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Input with prompt
age = input("Enter your age: ")
print(f"You are {age} years old.")
\`\`\`

### Important Notes:
- \`input()\` always returns a **string**, even for numbers
- You need to convert to other types if necessary

### Type Conversion:
\`\`\`python
# Convert to integer
age = int(input("Enter your age: "))

# Convert to float
height = float(input("Enter your height in meters: "))

# Convert to boolean (if needed)
is_student = input("Are you a student? (yes/no): ").lower() == "yes"
\`\`\``,

      'Comments and Documentation': `# Comments and Documentation in Python

## Introduction to Comments

Comments are pieces of text in your code that are ignored by the Python interpreter. They help explain what your code does and make it easier for others (and your future self) to understand.

## Single-Line Comments

Single-line comments start with the \`#\` symbol and continue to the end of the line.

### Examples:
\`\`\`python
# This is a single-line comment
print("Hello, World!")  # This prints a greeting

# Calculate the area of a circle
radius = 5
pi = 3.14159
area = pi * radius ** 2  # Formula: πr²
print(f"Area: {area}")
\`\`\`

## Multi-Line Comments

Python doesn't have a built-in multi-line comment syntax like some other languages. However, you can use multiple single-line comments or triple quotes for multi-line strings.

### Method 1: Multiple single-line comments
\`\`\`python
# This program calculates the factorial of a number
# It uses a recursive function to demonstrate the concept
# The factorial of n is n * (n-1) * (n-2) * ... * 1
\`\`\`

## Best Practices for Comments

### 1. **Explain Why, Not What**
\`\`\`python
# Good: Explains the purpose
total = price * (1 + tax_rate)  # Apply tax to get final price

# Bad: Just repeats what the code does
total = price * (1 + tax_rate)  # Multiply price by 1 plus tax rate
\`\`\`

### 2. **Keep Comments Current**
Update comments when you change the code. Outdated comments are worse than no comments.

### 3. **Use Clear and Concise Language**
\`\`\`python
# Good
user_age = current_year - birth_year  # Calculate age from birth year

# Unclear
user_age = current_year - birth_year  # Do some math with years
\`\`\``
    }
  },
  {
    id: '2',
    title: 'Control Structures',
    subtopics: [
      'Conditional Statements (if, elif, else)',
      'Loops (for, while)',
      'Break and Continue',
      'Nested Loops',
      'Loop Control'
    ]
  },
  {
    id: '3',
    title: 'Data Structures',
    subtopics: [
      'Lists and List Methods',
      'Tuples and Immutability',
      'Dictionaries and Sets',
      'String Manipulation',
      'List Comprehensions'
    ]
  },
  {
    id: '4',
    title: 'Functions',
    subtopics: [
      'Function Definition and Calling',
      'Parameters and Arguments',
      'Return Values',
      'Lambda Functions',
      'Scope and Namespace'
    ]
  },
  {
    id: '5',
    title: 'Object-Oriented Programming',
    subtopics: [
      'Classes and Objects',
      'Inheritance',
      'Polymorphism',
      'Encapsulation',
      'Special Methods (__init__, __str__)'
    ]
  },
  {
    id: '6',
    title: 'File Handling',
    subtopics: [
      'Reading Files',
      'Writing Files',
      'File Modes',
      'Exception Handling',
      'Context Managers (with statement)'
    ]
  },
  {
    id: '7',
    title: 'Modules and Packages',
    subtopics: [
      'Importing Modules',
      'Creating Custom Modules',
      'Package Structure',
      'Standard Library',
      'Third-party Packages'
    ]
  },
  {
    id: '8',
    title: 'Error Handling',
    subtopics: [
      'Try-Except Blocks',
      'Exception Types',
      'Raising Exceptions',
      'Custom Exceptions',
      'Finally Block'
    ]
  },
  {
    id: '9',
    title: 'Advanced Topics',
    subtopics: [
      'Decorators',
      'Generators and Iterators',
      'Regular Expressions',
      'Working with JSON',
      'Database Connectivity'
    ]
  },
  {
    id: '10',
    title: 'Data Science Basics',
    subtopics: [
      'NumPy Arrays',
      'Pandas DataFrames',
      'Data Visualization',
      'Statistical Analysis',
      'Data Cleaning'
    ]
  }
];
