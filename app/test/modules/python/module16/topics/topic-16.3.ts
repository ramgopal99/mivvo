import { SubLesson } from '../../../data/lessonsData';

export const topic_16_3: SubLesson = {
  id: 16.3,
  title: 'Decorators',
  status: 'demo',
  content: `# 🎨 Python Decorators

Decorators are a powerful and elegant feature in Python that allow you to modify or extend the behavior of functions and methods without changing their source code. They are widely used in frameworks, for logging, authentication, caching, and more. Let's explore this advanced Python concept!

---

## 🎯 What are Decorators?

**Decorators** are functions that take another function as an argument and extend or modify its behavior without explicitly modifying the function itself.

### **Decorator Syntax**
\`\`\`python
@decorator_name
def function_name():
    pass
\`\`\`

This is equivalent to:
\`\`\`python
def function_name():
    pass

function_name = decorator_name(function_name)
\`\`\`

---

## 💻 Basic Decorator Creation

### **Simple Decorator**
\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before function execution")
        func()
        print("After function execution")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

# Usage
say_hello()
# Output:
# Before function execution
# Hello!
# After function execution
\`\`\`

### **Decorator with Arguments**
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args: {args}, kwargs: {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned: {result}")
        return result
    return wrapper

@my_decorator
def add_numbers(a, b):
    return a + b

@my_decorator
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Usage
print(add_numbers(5, 3))         # 8
print(greet("Alice"))            # Hello, Alice!
print(greet("Bob", "Hi"))        # Hi, Bob!
\`\`\`

---

## 🔧 Decorator Factory (Parameterized Decorators)

### **Creating Decorators with Parameters**
\`\`\`python
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("Hi!")

say_hi()  # Prints "Hi!" 3 times and returns the last result
\`\`\`

### **Logging Decorator with Level**
\`\`\`python
def log(level):
    def decorator(func):
        def wrapper(*args, **kwargs):
            print(f"[{level.upper()}] Calling {func.__name__}")
            result = func(*args, **kwargs)
            print(f"[{level.upper()}] {func.__name__} completed")
            return result
        return wrapper
    return decorator

@log("info")
def calculate(x, y):
    return x + y * 2

@log("debug")
def process_data(data):
    return [x * 2 for x in data]

calculate(5, 3)          # INFO level logging
process_data([1, 2, 3])  # DEBUG level logging
\`\`\`

---

## 🎯 Built-in Decorators

### **@staticmethod and @classmethod**
\`\`\`python
class MathUtils:
    @staticmethod
    def add(a, b):
        """Static method - no self parameter"""
        return a + b
    
    @classmethod
    def create_from_string(cls, expression):
        """Class method - receives class as first parameter"""
        # Parse expression like "5+3" and create instance
        return cls(*map(int, expression.split('+')))
    
    def __init__(self, a, b):
        self.a = a
        self.b = b

# Usage
result = MathUtils.add(5, 3)  # Call static method
obj = MathUtils.create_from_string("5+3")  # Call class method
print(f"Result: {result}, Object: {obj.a} + {obj.b}")
\`\`\`

### **@property Decorator**
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        """Getter for radius"""
        return self._radius
    
    @radius.setter
    def radius(self, value):
        """Setter for radius"""
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value
    
    @property
    def area(self):
        """Computed property"""
        return 3.14159 * self._radius ** 2

# Usage
circle = Circle(5)
print(f"Radius: {circle.radius}")  # 5
print(f"Area: {circle.area}")      # 78.53975

circle.radius = 10
print(f"New area: {circle.area}")  # 314.159

# circle.radius = -5  # Raises ValueError
\`\`\`

---

## 🔄 Multiple Decorators

### **Stacking Decorators**
\`\`\`python
def bold(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<b>{result}</b>"
    return wrapper

def italic(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return f"<i>{result}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # <b><i>Hello, Alice!</i></b>

# Order matters: decorators are applied from bottom to top
# @bold
# @italic
# def func(): pass
# is equivalent to:
# func = bold(italic(func))
\`\`\`

---

## 🎨 Practical Decorator Examples

### **Timing Decorator**
\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done!"

@timer
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(slow_function())
print(fibonacci(30))
\`\`\`

### **Caching/Memoization Decorator**
\`\`\`python
def cache(func):
    cache_dict = {}
    
    def wrapper(*args):
        if args in cache_dict:
            print(f"Cache hit for {args}")
            return cache_dict[args]
        
        print(f"Computing result for {args}")
        result = func(*args)
        cache_dict[args] = result
        return result
    
    return wrapper

@cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # Computes and caches
print(fibonacci(10))  # Uses cache
print(fibonacci(5))   # Uses cache
\`\`\`

### **Authentication Decorator**
\`\`\`python
def requires_auth(func):
    def wrapper(*args, **kwargs):
        # Simulate authentication check
        user = kwargs.get('user', 'anonymous')
        if user == 'anonymous':
            raise PermissionError("Authentication required")
        
        print(f"User {user} authenticated")
        return func(*args, **kwargs)
    return wrapper

@requires_auth
def sensitive_operation(data, user=None):
    return f"Processing {data} for user {user}"

try:
    print(sensitive_operation("secret_data", user="alice"))
    print(sensitive_operation("secret_data"))  # Will raise error
except PermissionError as e:
    print(f"Error: {e}")
\`\`\`

### **Retry Decorator**
\`\`\`python
import random

def retry(max_attempts=3, delay=1):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    print(f"Attempt {attempt + 1} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=5, delay=0.5)
def unreliable_operation():
    if random.random() < 0.7:  # 70% chance of failure
        raise ConnectionError("Network error")
    return "Success!"

print(unreliable_operation())
\`\`\`

---

## 🔧 Advanced Decorator Techniques

### **Preserving Function Metadata**
\`\`\`python
import functools

def my_decorator(func):
    @functools.wraps(func)  # Preserves original function's metadata
    def wrapper(*args, **kwargs):
        """Wrapper docstring"""
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def example_function():
    """This is the original docstring"""
    return "Hello"

print(example_function.__name__)  # example_function (without @wraps would be 'wrapper')
print(example_function.__doc__)   # This is the original docstring
\`\`\`

### **Class-Based Decorators**
\`\`\`python
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.call_count = 0
        functools.update_wrapper(self, func)
    
    def __call__(self, *args, **kwargs):
        self.call_count += 1
        print(f"Call #{self.call_count} to {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))
print(greet("Bob"))
print(f"Total calls: {greet.call_count}")
\`\`\`

### **Method Decorators**
\`\`\`python
def method_decorator(func):
    def wrapper(self, *args, **kwargs):
        print(f"Calling method {func.__name__} on {self.__class__.__name__}")
        return func(self, *args, **kwargs)
    return wrapper

class MyClass:
    @method_decorator
    def method1(self):
        return "Method 1"
    
    @method_decorator
    def method2(self, param):
        return f"Method 2 with {param}"

obj = MyClass()
print(obj.method1())
print(obj.method2("parameter"))
\`\`\`

---

## 🧪 Testing and Examples

### **Example 1: Web Framework Style**
\`\`\`python
# Simulate a simple web framework
routes = {}

def route(path):
    def decorator(func):
        routes[path] = func
        return func
    return decorator

@route("/home")
def home():
    return "Welcome to home page"

@route("/about")
def about():
    return "About us page"

@route("/contact")
def contact():
    return "Contact us"

# Simulate routing
def handle_request(path):
    if path in routes:
        return routes[path]()
    return "404 Not Found"

print(handle_request("/home"))   # Welcome to home page
print(handle_request("/about"))  # About us page
print(handle_request("/unknown")) # 404 Not Found
\`\`\`

### **Example 2: Database Connection**
\`\`\`python
def with_database_connection(func):
    def wrapper(*args, **kwargs):
        # Simulate database connection
        print("Opening database connection...")
        try:
            result = func(*args, **kwargs)
            print("Committing transaction...")
            return result
        except Exception as e:
            print(f"Rolling back transaction due to: {e}")
            raise
        finally:
            print("Closing database connection...")
    return wrapper

@with_database_connection
def save_user_data(user_id, data):
    if user_id < 0:
        raise ValueError("Invalid user ID")
    print(f"Saving data for user {user_id}: {data}")
    return f"User {user_id} saved successfully"

try:
    print(save_user_data(123, {"name": "Alice"}))
    print(save_user_data(-1, {"name": "Bob"}))  # Will raise error
except ValueError as e:
    print(f"Error: {e}")
\`\`\`

---

## ⚠️ Decorator Best Practices

### **Common Pitfalls**
\`\`\`python
# ❌ Don't forget to return the result
def bad_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        func(*args, **kwargs)  # Missing return!
        print("After")
    return wrapper

@bad_decorator
def returns_value():
    return "Hello"

result = returns_value()
print(result)  # None - oops!

# ✅ Correct version
def good_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result  # Don't forget to return!
    return wrapper
\`\`\`

### **Preserving Metadata**
\`\`\`python
# Always use @functools.wraps or update_wrapper
import functools

def proper_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        """This docstring will be replaced by func's docstring"""
        return func(*args, **kwargs)
    return wrapper

@proper_decorator
def documented_function():
    """This docstring will be preserved"""
    pass

print(documented_function.__name__)  # documented_function
print(documented_function.__doc__)   # This docstring will be preserved
\`\`\`

---

## 🎯 When to Use Decorators

### **Good Use Cases**
- **Cross-cutting concerns**: logging, timing, caching
- **Authentication/authorization**
- **Input validation**
- **Resource management**
- **Monitoring and metrics**
- **Framework functionality**

### **Avoid Overusing**
- **Simple functions** - may add unnecessary complexity
- **Performance-critical code** - decorators add overhead
- **When inheritance would be clearer**

---

## 🚀 Key Takeaways

1. **Decorators modify function behavior** without changing source code
2. **@ syntax** is syntactic sugar for function wrapping
3. **Parameterized decorators** use the decorator factory pattern
4. **Multiple decorators** are applied from bottom to top
5. **functools.wraps** preserves original function metadata
6. **Class-based decorators** offer more flexibility than function-based ones

**Decorators are a powerful tool for extending functionality elegantly. Use them to separate concerns and keep your code clean and maintainable! 🎨**`
};
