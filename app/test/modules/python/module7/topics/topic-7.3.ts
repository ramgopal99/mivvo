import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_3: SubLesson = {
  id: 7.3,
  title: 'Function Parameters',
  status: 'demo',
  content: `# 📥 Function Parameters

Parameters allow functions to accept input values. Python offers flexible parameter options for different use cases!

---

## 🎯 Required Parameters

### **Basic Parameters**
\`\`\`python
def greet(name, age):
    """Greet someone with their name and age."""
    print(f"Hello {name}, you are {age} years old!")

# Must provide both arguments
greet("Alice", 25)  # Works
# greet("Bob")      # Error - missing age parameter
\`\`\`

---

## 🔄 Default Parameters

### **Optional Parameters with Defaults**
\`\`\`python
def greet(name, age=25):
    """Greet someone, age is optional."""
    print(f"Hello {name}, you are {age} years old!")

greet("Alice")        # Uses default age 25
greet("Bob", 30)      # Overrides default
\`\`\`

### **Multiple Defaults**
\`\`\`python
def create_user(name, email, active=True, role="user"):
    """Create a user account."""
    return {
        "name": name,
        "email": email,
        "active": active,
        "role": role
    }

# Various ways to call
user1 = create_user("Alice", "alice@email.com")
user2 = create_user("Bob", "bob@email.com", False)
user3 = create_user("Charlie", "charlie@email.com", True, "admin")
\`\`\`

---

## 📊 *args - Variable Positional Arguments

### **Accept Any Number of Positional Arguments**
\`\`\`python
def sum_numbers(*args):
    """Sum any number of arguments."""
    total = 0
    for num in args:
        total += num
    return total

print(sum_numbers(1, 2, 3))        # 6
print(sum_numbers(10, 20))         # 30
print(sum_numbers(1, 2, 3, 4, 5))  # 15
\`\`\`

### **Combining with Regular Parameters**
\`\`\`python
def calculate_average(subject, *scores):
    """Calculate average score for a subject."""
    if not scores:
        return 0
    average = sum(scores) / len(scores)
    print(f"{subject} average: {average:.1f}")
    return average

calculate_average("Math", 85, 92, 78)
calculate_average("Science", 88, 95, 87, 91)
calculate_average("History")  # No scores
\`\`\`

---

## 🔑 **kwargs - Variable Keyword Arguments

### **Accept Any Number of Keyword Arguments**
\`\`\`python
def create_profile(**kwargs):
    """Create a profile from keyword arguments."""
    profile = {}
    for key, value in kwargs.items():
        profile[key] = value
    return profile

# Create different profiles
alice = create_profile(name="Alice", age=25, city="NYC")
bob = create_profile(name="Bob", job="Engineer", hobbies=["coding", "reading"])

print(alice)
print(bob)
\`\`\`

### **Combining All Parameter Types**
\`\`\`python
def advanced_function(required, default="default", *args, **kwargs):
    """Demonstrate all parameter types."""
    print(f"Required: {required}")
    print(f"Default: {default}")
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

advanced_function("hello")
advanced_function("hello", "custom", 1, 2, 3, name="Alice", age=25)
\`\`\`

---

## 🎨 Practical Examples

### **Flexible Calculator**
\`\`\`python
def calculator(operation, *numbers, precision=2):
    """
    Perform calculations on multiple numbers.

    Args:
        operation (str): 'add', 'multiply', 'average'
        *numbers: Numbers to operate on
        precision (int): Decimal places for result
    """
    if not numbers:
        return 0

    if operation == "add":
        result = sum(numbers)
    elif operation == "multiply":
        result = 1
        for num in numbers:
            result *= num
    elif operation == "average":
        result = sum(numbers) / len(numbers)
    else:
        raise ValueError(f"Unknown operation: {operation}")

    return round(result, precision)

print(calculator("add", 1, 2, 3, 4))        # 10
print(calculator("multiply", 2, 3, 4))      # 24
print(calculator("average", 85, 92, 78))    # 85.0
\`\`\`

### **Configuration Builder**
\`\`\`python
def build_config(base_config, **overrides):
    """
    Build configuration by overriding base settings.

    Args:
        base_config (dict): Default configuration
        **overrides: Settings to override
    """
    config = base_config.copy()
    config.update(overrides)
    return config

# Base configuration
defaults = {
    "debug": False,
    "max_users": 100,
    "timeout": 30,
    "database": "sqlite"
}

# Create different configurations
dev_config = build_config(defaults, debug=True, database="postgres")
prod_config = build_config(defaults, max_users=1000, timeout=60)

print("Development config:")
for key, value in dev_config.items():
    print(f"  {key}: {value}")

print("\nProduction config:")
for key, value in prod_config.items():
    print(f"  {key}: {value}")
\`\`\`

---

## ⚠️ Parameter Order Rules

### **Correct Parameter Order**
\`\`\`python
# ✅ Correct order
def example(required, default="value", *args, **kwargs):
    pass

# ❌ Wrong orders (will cause syntax errors)
# def wrong1(default="value", required):  # Defaults before required
# def wrong2(required, *args, default="value"):  # Defaults after *args
# def wrong3(**kwargs, default="value"):  # Defaults after **kwargs
\`\`\`

---

## ✅ Best Practices

1. **Use descriptive parameter names** - calculate_tax(amount, rate) not calc(a, r)
2. **Provide sensible defaults** - Think about what values are commonly used
3. **Use \*args for variable positional arguments** - When you need to accept multiple values
4. **Use \*\*kwargs for flexible keyword arguments** - When you need extensible options
5. **Document parameter types and purposes** - Use docstrings with Args section

Function parameters make your functions flexible and reusable! 🎛️`
};
