import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_2: SubLesson = {
  id: "2.2",
  title: 'Variables & Data Types',
  status: 'demo',
  content: "`# ðŸ“¦ Python Variables and Data Types

Variables are containers that store data values in Python. Unlike some languages, Python doesn't require you to declare the data type - it figures it out automatically!

---

## ðŸ†• Creating Variables

### **ðŸŽ¯ Basic Variable Assignment**
\`"\`\`python
# Creating variables is simple
name = "Alice"
age = 25
height = 5.9
is_student = True

# Multiple assignment
x = y = z = 10

# Multiple variables with different values
a, b, c = 1, 2, 3
\`\`\`

### **ðŸ”„ Dynamic Typing**
\`\`\`python
# Variables can change type
score = 100        # Integer
score = "High Score!"  # Now it's a string
score = 98.5       # Now it's a float

print(score)       # Output: 98.5
\`\`\`

## ðŸ”¢ Python Data Types

### **1. ðŸ“Š Numeric Types**
\`\`\`python
# Integer (whole numbers)
age = 25
year = 2024

# Float (decimal numbers)
height = 5.9
price = 19.99

# Complex numbers
complex_num = 3 + 4j
\`\`\`

### **2. ðŸ“ String (Text)**
\`\`\`python
# Single quotes
name = 'Alice'

# Double quotes
city = "New York"

# Triple quotes for multi-line strings
message = '''
This is a
multi-line
string!
'''

# String concatenation
full_name = "Alice" + " " + "Smith"
print(full_name)  # Output: Alice Smith

greeting = f"Hello, {name}!"  # f-string formatting
print(greeting)   # Output: Hello, Alice!
\`\`\`

### **3. âœ… Boolean (True/False)**
\`\`\`python
# Boolean values
is_student = True
is_working = False

# Boolean operations
print(10 > 5)   # True
print(5 == 6)   # False
print(5 != 6)   # True

# Logical operators
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
\`\`\`

## ðŸ“Š Python Data Types Overview

Python has several built-in data types, organized by category:

### **Text Type:** \`str\`
- String data type for text and characters

### **Numeric Types:** \`int\`, \`float\`, \`complex\`
- \`int\`: Integer (whole numbers)
- \`float\`: Floating-point (decimal numbers)
- \`complex\`: Complex numbers with real and imaginary parts

### **Boolean Type:** \`bool\`
- Boolean values: \`True\` or \`False\`

### **None Type:** \`NoneType\`
- Represents absence of value: \`None\`

### **Other Python Data Types** (Advanced - covered later):
- **Sequence Types:** \`list\` (ordered collections), \`tuple\` (immutable lists)
- **Mapping Type:** \`dict\` (key-value pairs)
- **Set Types:** \`set\` (unique items), \`frozenset\` (immutable sets)

## ðŸ” Type Checking and Conversion

### **ðŸ”Ž Check Data Types**
\`\`\`python
# Check variable types
print(type(name))     # <class 'str'>
print(type(age))      # <class 'int'>
print(type(height))   # <class 'float'>
\`\`\`

### **ðŸ”„ Type Conversion**
\`\`\`python
# Convert between types
number_str = "123"
number_int = int(number_str)    # Convert to integer

float_num = 3.14
int_num = int(float_num)        # Convert to integer (loses decimal)

age = 25
age_str = str(age)              # Convert to string
\`\`\`

## ðŸ“‹ Variable Naming Rules

### **âœ… Good Variable Names**
\`\`\`python
user_name = "Alice"
total_score = 100
is_logged_in = True
calculate_total = lambda x, y: x + y
\`\`\`

### **âŒ Bad Variable Names (will cause errors)**
\`\`\`python
# Cannot start with numbers
# 1name = "Alice"  # SyntaxError

# Cannot use special characters (except underscore)
# user-name = "Alice"  # SyntaxError

# Cannot use reserved keywords
# class = "Python"  # SyntaxError
\`\`\`

## ðŸ“Š Data Type Categories

| Category | Data Types | Examples |
|----------|------------|----------|
| **Basic** | \`str\`, \`int\`, \`float\`, \`bool\`, \`NoneType\` | \`"hello"\`, \`42\`, \`3.14\`, \`True\`, \`None\` |
| **Sequences** | \`list\`, \`tuple\` | \`[1,2,3]\`, \`(1,2,3)\` |
| **Mapping** | \`dict\` | \`{"key": "value"}\` |
| **Sets** | \`set\`, \`frozenset\` | \`{1,2,3}\` |

*Note: Advanced data types (list, tuple, dict, set) will be covered in future lessons.*

## â­ Best Practices

1. **Use descriptive names**: \`user_age\` instead of \`x\`
2. **Use snake_case**: \`first_name\` instead of \`firstName\`
3. **Be consistent**: Choose one style and stick to it
4. **Use constants for values that don't change**:
   \`\`\`python
   PI = 3.14159
   MAX_USERS = 100
   \`\`\`

Python's dynamic typing makes it easy to learn, but understanding data types is crucial for writing robust code! ðŸâœ¨`
};


