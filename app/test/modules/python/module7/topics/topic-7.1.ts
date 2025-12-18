import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_1: SubLesson = {
  id: "7.1",
  title: 'What are Functions?',
  status: 'demo',
  content: `# 🔧 What are Python Functions?

Functions are reusable blocks of code that perform specific tasks. They are the building blocks of Python programs!

---

## 🎯 What is a Function?

A **function** is a named block of code that:
- **Performs a specific task** - Has a clear purpose
- **Can be called multiple times** - Reusable code
- **Can accept inputs (parameters)** - Customizable behavior
- **Can return outputs** - Produces results
- **Organizes code** - Makes programs modular

\`\`\`python
# A simple function
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!
greet()  # Can call it again!
\`\`\`

---

## 📦 Why Use Functions?

### **Code Reusability**
\`\`\`python
def calculate_area(radius):
    return 3.14159 * radius * radius

# Use the function multiple times
area1 = calculate_area(5)
area2 = calculate_area(10)
area3 = calculate_area(15)

print(f"Areas: {area1}, {area2}, {area3}")
\`\`\`

### **Code Organization**
\`\`\`python
def get_user_input():
    return input("Enter your name: ")

def process_name(name):
    return name.strip().title()

def display_greeting(name):
    print(f"Hello, {name}!")

# Main program flow
user_input = get_user_input()
processed_name = process_name(user_input)
display_greeting(processed_name)
\`\`\`

### **Abstraction**
\`\`\`python
# Complex logic hidden behind simple function calls
def send_email(to, subject, body):
    # Lots of complex email sending code here
    # SMTP connections, authentication, etc.
    print(f"Email sent to {to}")

# Simple usage
send_email("user@email.com", "Welcome!", "Thanks for joining!")
\`\`\`

---

## 🔍 Types of Functions

### **Built-in Functions**
\`\`\`python
# Python provides these automatically
print("Hello")     # Built-in print function
len([1, 2, 3])    # Built-in len function
max([1, 5, 3])    # Built-in max function
\`\`\`

### **User-Defined Functions**
\`\`\`python
# Functions you create
def add_numbers(a, b):
    return a + b

def greet_person(name):
    return f"Hello, {name}!"

result = add_numbers(5, 3)      # 8
message = greet_person("Alice") # "Hello, Alice!"
\`\`\`

### **Methods**
\`\`\`python
# Functions attached to objects
text = "hello"
upper_text = text.upper()  # Method on string object

numbers = [1, 2, 3]
numbers.append(4)  # Method on list object
\`\`\`

---

## 🎨 Real-World Examples

\`\`\`python
# Mathematical calculations
def calculate_circle_area(radius):
    """Calculate the area of a circle given its radius."""
    pi = 3.14159
    return pi * radius ** 2

def calculate_hypotenuse(a, b):
    """Calculate the hypotenuse of a right triangle."""
    return (a**2 + b**2) ** 0.5

# Data processing
def clean_text(text):
    """Clean and normalize text data."""
    return text.strip().lower()

def validate_email(email):
    """Check if email address is valid."""
    return "@" in email and "." in email

# User interface
def display_menu():
    """Display application menu."""
    print("1. View data")
    print("2. Add item")
    print("3. Exit")

def get_user_choice():
    """Get and validate user menu choice."""
    while True:
        choice = input("Enter choice (1-3): ")
        if choice in ["1", "2", "3"]:
            return int(choice)
        print("Invalid choice. Please try again.")
\`\`\`

---

## 🚀 Benefits of Functions

### **Modularity**
- Break complex programs into smaller, manageable pieces
- Each function has a single responsibility

### **Maintainability**
- Changes to one function don't affect others
- Easier to debug and test individual components

### **Readability**
- Self-documenting code with descriptive function names
- Hide implementation details behind clear interfaces

### **Reusability**
- Write once, use many times
- Build libraries of useful functions

Functions are essential for writing clean, maintainable Python code! 🏗️`
};

