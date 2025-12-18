import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_5: SubLesson = {
  id: "7.5",
  title: 'Scope and Variables',
  status: 'demo',
  content: `# 🌍 Scope and Variables

Understanding variable scope is crucial for writing correct Python functions. Variables behave differently based on where they're defined!

---

## 🎯 Local vs Global Scope

### **Local Variables (Inside Functions)**
\`\`\`python
def calculate_area():
    """Calculate area using local variables."""
    length = 5      # Local variable
    width = 3       # Local variable
    area = length * width
    return area

result = calculate_area()
print(result)  # 15

# These variables don't exist outside the function
# print(length)  # NameError!
\`\`\`

### **Global Variables (Outside Functions)**
\`\`\`python
message = "Hello"  # Global variable

def greet():
    """Access global variable."""
    print(message)  # Can access global

def change_message():
    """Try to change global (won't work as expected)."""
    message = "Goodbye"  # Creates local variable instead
    print(f"Inside function: {message}")

greet()           # Hello
change_message()  # Inside function: Goodbye
print(message)    # Hello (unchanged!)
\`\`\`

---

## 🔄 Modifying Global Variables

### **Using global Keyword**
\`\`\`python
counter = 0

def increment_counter():
    """Increment global counter."""
    global counter  # Declare we want to use global variable
    counter += 1
    print(f"Counter: {counter}")

def reset_counter():
    """Reset global counter."""
    global counter
    counter = 0
    print("Counter reset")

increment_counter()  # Counter: 1
increment_counter()  # Counter: 2
reset_counter()      # Counter reset
increment_counter()  # Counter: 1
\`\`\`

---

## 📊 Built-in Scope

### **Python's Built-in Functions**
\`\`\`python
# These are always available
print(len([1, 2, 3]))  # len is built-in
print(max([1, 5, 3]))  # max is built-in

def custom_len(items):
    """Override built-in len (not recommended!)."""
    count = 0
    for item in items:
        count += 1
    return count

# Built-in len still works
print(len("hello"))      # 5
print(custom_len("hello"))  # 5
\`\`\`

---

## 🔍 LEGB Rule

### **Variable Lookup Order**
\`\`\`python
# L = Local (inside function)
# E = Enclosing (nested functions)
# G = Global (module level)
# B = Built-in (Python's built-ins)

x = "global"  # Global

def outer():
    x = "enclosing"  # Enclosing

    def inner():
        x = "local"  # Local
        print(f"Local: {x}")

        # Access enclosing variable
        def innermost():
            print(f"Enclosing: {x}")  # Refers to outer's x
        innermost()

    inner()

outer()
print(f"Global: {x}")
\`\`\`

---

## 🎨 Practical Examples

### **Configuration Management**
\`\`\`python
# Global configuration
APP_CONFIG = {
    "debug": False,
    "max_users": 100,
    "version": "1.0"
}

def get_config(key):
    """Get configuration value."""
    return APP_CONFIG.get(key, "Not found")

def update_config(key, value):
    """Update configuration."""
    global APP_CONFIG
    APP_CONFIG[key] = value
    print(f"Updated {key}: {value}")

def reset_config():
    """Reset configuration to defaults."""
    global APP_CONFIG
    APP_CONFIG = {
        "debug": False,
        "max_users": 100,
        "version": "1.0"
    }
    print("Configuration reset")

print(get_config("debug"))      # False
update_config("debug", True)
print(get_config("debug"))      # True
reset_config()
print(get_config("debug"))      # False
\`\`\`

### **Function Factories**
\`\`\`python
def create_multiplier(factor):
    """Create a function that multiplies by a specific factor."""
    def multiplier(number):
        # 'factor' is in enclosing scope
        return number * factor
    return multiplier

# Create specialized functions
double = create_multiplier(2)
triple = create_multiplier(3)
quadruple = create_multiplier(4)

print(double(5))     # 10
print(triple(5))     # 15
print(quadruple(5))  # 20
\`\`\`

### **Counter Functions**
\`\`\`python
def create_counter():
    """Create a counter function."""
    count = 0  # Enclosing scope variable

    def counter():
        nonlocal count  # Access enclosing variable
        count += 1
        return count

    return counter

# Create independent counters
counter1 = create_counter()
counter2 = create_counter()

print(counter1())  # 1
print(counter1())  # 2
print(counter2())  # 1 (independent)
print(counter1())  # 3
\`\`\`

---

## ⚠️ Common Scope Issues

### **UnboundLocalError**
\`\`\`python
x = 10

def problem():
    print(x)  # This would cause UnboundLocalError
    x = 20    # Because we assign to x later

# Fix: use global or different variable name
def fixed():
    global x
    print(x)
    x = 20

def better():
    print(x)  # Read global
    local_x = 20  # Create local variable
\`\`\`

### **Mutable Default Arguments**
\`\`\`python
def bad_function(items=[]):  # Don't do this!
    """This has a mutable default argument."""
    items.append("new item")
    return items

print(bad_function())  # ['new item']
print(bad_function())  # ['new item', 'new item'] - Problem!

# Correct way
def good_function(items=None):
    if items is None:
        items = []
    items.append("new item")
    return items

print(good_function())  # ['new item']
print(good_function())  # ['new item'] - Fresh list each time
\`\`\`

---

## ✅ Best Practices

1. **Avoid global variables when possible** - Pass data as parameters instead
2. **Use global only when necessary** - For truly global state
3. **Use nonlocal for nested functions** - To modify enclosing variables
4. **Don't use mutable default arguments** - Use None and create inside function
5. **Keep variable names clear** - Avoid shadowing built-ins

Understanding scope prevents bugs and makes code predictable! 🎯`
};

