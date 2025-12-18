import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_6: SubLesson = {
  id: 8.6,
  title: 'Utility Functions',
  status: 'demo',
  content: `# 🛠️ Utility Functions

Miscellaneous built-in functions that provide useful utilities for various programming tasks!

---

## 🎯 Type and Identity Functions

### **type() - Get Object Type**
\`\`\`python
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hello"))    # <class 'str'>
print(type([1, 2, 3]))  # <class 'list'>
print(type({"a": 1}))   # <class 'dict'>

# Check type
def is_number(value):
    return type(value) in (int, float, complex)

print(is_number(42))     # True
print(is_number("42"))   # False
\`\`\`

### **isinstance() - Check Type Inheritance**
\`\`\`python
# Better than type() for inheritance
print(isinstance(42, int))           # True
print(isinstance(42, (int, float)))  # True
print(isinstance("hello", str))      # True

# Works with inheritance
class Animal:
    pass

class Dog(Animal):
    pass

dog = Dog()
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True (inheritance)
print(type(dog) == Animal)      # False (type doesn't check inheritance)
\`\`\`

### **id() - Get Object Identity**
\`\`\`python
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(id(x))  # Memory address of x
print(id(y))  # Different address
print(id(z))  # Same as x

print(x is z)  # True (same object)
print(x is y)  # False (different objects)
print(x == y)  # True (same values)
\`\`\`

---

## 📦 Object Creation Functions

### **callable() - Check if Object is Callable**
\`\`\`python
def my_function():
    pass

class MyClass:
    def method(self):
        pass

print(callable(my_function))    # True
print(callable(MyClass))        # True (classes are callable)
print(callable(MyClass()))      # False (instances may not be)
print(callable(42))             # False
print(callable("string"))       # False

# Check before calling
def safe_call(func, *args):
    if callable(func):
        return func(*args)
    else:
        return f"Error: {func} is not callable"

print(safe_call(len, [1, 2, 3]))  # 3
print(safe_call(42, [1, 2, 3]))    # Error: 42 is not callable
\`\`\`

### **hash() - Get Hash Value**
\`\`\`python
# Hashable objects
print(hash("hello"))      # String hash
print(hash(42))           # Integer hash
print(hash((1, 2, 3)))    # Tuple hash

# Unhashable objects
# print(hash([1, 2, 3]))  # TypeError - lists are unhashable
# print(hash({"a": 1}))   # TypeError - dicts are unhashable

# Hash is consistent within a session
word = "python"
print(hash(word) == hash(word))  # True

# Useful for creating hash-based data structures
data = ["apple", "banana", "cherry"]
hashed_data = {item: hash(item) for item in data}
print(hashed_data)
\`\`\`

---

## 🔍 Attribute and Property Functions

### **hasattr() - Check Attribute Existence**
\`\`\`python
class Person:
    def __init__(self):
        self.name = "Alice"
        self.age = 25

person = Person()

print(hasattr(person, "name"))     # True
print(hasattr(person, "age"))      # True
print(hasattr(person, "salary"))   # False

# Safe attribute access
def safe_getattr(obj, attr, default=None):
    return getattr(obj, attr) if hasattr(obj, attr) else default

print(safe_getattr(person, "name"))      # Alice
print(safe_getattr(person, "salary"))    # None
\`\`\`

### **getattr() - Get Attribute Value**
\`\`\`python
person = Person()

print(getattr(person, "name"))           # Alice
print(getattr(person, "age"))            # 25
print(getattr(person, "salary", "N/A"))  # N/A (default)

# Dynamic method calling
method_name = "upper"
text = "hello"
result = getattr(text, method_name)()
print(result)  # HELLO
\`\`\`

### **setattr() - Set Attribute Value**
\`\`\`python
person = Person()

# Add new attribute
setattr(person, "salary", 50000)
print(person.salary)  # 50000

# Modify existing attribute
setattr(person, "age", 26)
print(person.age)     # 26

# Dynamic attribute setting
attrs = {"city": "NYC", "job": "Engineer"}
for attr, value in attrs.items():
    setattr(person, attr, value)

print(person.city)  # NYC
print(person.job)   # Engineer
\`\`\`

---

## 📊 Evaluation and Execution

### **eval() - Evaluate Expression**
\`\`\`python
# WARNING: eval() can be dangerous with untrusted input!

# Safe usage examples
result1 = eval("2 + 3 * 4")
print(result1)  # 14

x = 10
result2 = eval("x ** 2 + 5")
print(result2)  # 105

# With built-in functions
result3 = eval("len([1, 2, 3, 4])")
print(result3)  # 4

# Simple calculator (be careful with eval!)
def calculate(expr):
    try:
        return eval(expr)
    except:
        return "Error"

print(calculate("2 + 3"))  # 5
\`\`\`

### **exec() - Execute Code**
\`\`\`python
# WARNING: exec() can be very dangerous!

# Simple exec example (be very careful!)
code = "x = 10 + 5"
exec(code)
print(x)  # 15
\`\`\`

---

## 🎨 Practical Examples

### **Object Inspector**
\`\`\`python
def inspect_object(obj):
    """Inspect an object's properties and methods."""
    info = {
        "type": type(obj).__name__,
        "id": id(obj),
        "callable": callable(obj),
        "attributes": [],
        "methods": []
    }

    # Get all attributes
    for attr in dir(obj):
        if not attr.startswith('_'):  # Skip private attributes
            value = getattr(obj, attr)
            if callable(value):
                info["methods"].append(attr)
            else:
                info["attributes"].append((attr, value))

    return info

# Inspect different objects
objects = ["hello", [1, 2, 3], {"a": 1}, len]

for obj in objects:
    info = inspect_object(obj)
    print(f"\n{info['type']}: {obj}")
    print(f"  Callable: {info['callable']}")
    print(f"  Methods: {info['methods'][:5]}...")  # First 5 methods
    print(f"  Attributes: {len(info['attributes'])}")
\`\`\`

### **Dynamic Object Builder**
\`\`\`python
def build_object(class_name, **attributes):
    """Dynamically create an object with attributes."""

    # Create a simple class
    class DynamicClass:
        pass

    # Set class name
    DynamicClass.__name__ = class_name

    # Create instance
    obj = DynamicClass()

    # Set attributes
    for attr, value in attributes.items():
        setattr(obj, attr, value)

    return obj

# Build objects dynamically
person = build_object("Person", name="Alice", age=25, city="NYC")
product = build_object("Product", name="Widget", price=19.99, stock=100)

print(f"Person: {person.name}, {person.age} years old")
print(f"Product: {product.name}, $", product.price)
\`\`\`

### **Configuration Validator**
\`\`\`python
def validate_config(config, schema):
    """
    Validate configuration against schema.

    Schema format: {"key": (expected_type, required, default)}
    """
    validated = {}
    errors = []

    for key, (expected_type, required, default) in schema.items():
        if key in config:
            value = config[key]
            if isinstance(value, expected_type):
                validated[key] = value
            else:
                errors.append(f"{key}: expected {expected_type.__name__}, got {type(value).__name__}")
        elif required:
            errors.append(f"{key}: required but missing")
        else:
            validated[key] = default

    return validated, errors

# Define schema
config_schema = {
    "debug": (bool, False, False),
    "max_users": (int, True, None),
    "timeout": (float, False, 30.0),
    "theme": (str, False, "light")
}

# Test configurations
test_configs = [
    {"max_users": 100, "debug": True},  # Valid
    {"max_users": "100", "debug": True},  # Type error
    {"debug": True}  # Missing required
]

for i, config in enumerate(test_configs, 1):
    validated, errors = validate_config(config, config_schema)
    print(f"\nConfig {i}:")
    if errors:
        print("  Errors:", errors)
    else:
        print("  Validated:", validated)
\`\`\`

### **Safe Expression Evaluator**
\`\`\`python
def safe_eval(expression, max_length=100):
    """Safely evaluate mathematical expressions."""
    if len(expression) > max_length:
        return "Expression too long"

    # Define safe environment
    safe_globals = {
        "__builtins__": {
            "abs": abs,
            "max": max,
            "min": min,
            "sum": sum,
            "len": len,
            "round": round,
            "pow": pow,
            "divmod": divmod
        }
    }

    safe_locals = {}

    try:
        # Check for dangerous patterns
        dangerous = ["import", "exec", "eval", "__", "open", "file"]
        if any(word in expression.lower() for word in dangerous):
            return "Dangerous expression detected"

        result = eval(expression, safe_globals, safe_locals)
        return result
    except Exception as e:
        return f"Error: {e}"

# Test expressions
expressions = [
    "2 + 3 * 4",
    "max([1, 5, 3])",
    "sum(range(10))",
    "import os",  # Dangerous
    "1/0",        # Error
    "abs(-42)"
]

for expr in expressions:
    result = safe_eval(expr)
    print(f"{expr:<15} -> {result}")
\`\`\`

---

## ⚠️ Security Considerations

### **Dangerous Functions**
\`\`\`python
# These functions can be dangerous with untrusted input:
# - eval() - executes arbitrary code
# - exec() - executes arbitrary code
# - open() - file system access
# - input() - user input can be malicious

# Always validate and sanitize input
def safe_open(filename, mode="r"):
    """Safely open files with validation."""
    # Check filename for dangerous patterns
    dangerous = ["..", "/", "\\", "*"]
    if any(char in filename for char in dangerous):
        raise ValueError("Invalid filename")

    # Limit modes
    allowed_modes = ["r", "w", "a"]
    if mode not in allowed_modes:
        raise ValueError("Invalid mode")

    return open(filename, mode)
\`\`\`

Utility functions provide powerful introspection and dynamic capabilities! 🔍`
};
