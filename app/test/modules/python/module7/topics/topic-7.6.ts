import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: "7.6",
  title: 'Advanced Functions',
  status: 'demo',
  content: `# 🚀 Advanced Functions

Python functions support advanced features like recursion, lambda functions, decorators, and more. Let's explore these powerful concepts!

---

## 🔄 Recursive Functions

### **Functions That Call Themselves**
\`\`\`python
def factorial(n):
    """Calculate factorial using recursion."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    """Calculate nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Factorial 5: {factorial(5)}")      # 120
print(f"Fibonacci 8: {fibonacci(8)}")      # 21

# Recursion with base case
def countdown(n):
    """Count down to zero."""
    if n <= 0:
        print("Blast off!")
        return
    print(n)
    countdown(n - 1)

countdown(5)
\`\`\`

---

## λ Lambda Functions

### **Anonymous Functions**
\`\`\`python
# Traditional function
def add(x, y):
    return x + y

# Lambda equivalent
add_lambda = lambda x, y: x + y

print(add(5, 3))        # 8
print(add_lambda(5, 3)) # 8

# Common lambda uses
numbers = [1, 2, 3, 4, 5]

# Sort by custom key
words = ["apple", "Banana", "cherry", "Date"]
words.sort(key=lambda x: x.lower())
print(words)  # ['apple', 'Banana', 'cherry', 'Date']

# Filter with lambda
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]

# Map with lambda
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]
\`\`\`

---

## 🎨 Function Decorators

### **Modify Function Behavior**
\`\`\`python
def timer_decorator(func):
    """Decorator that times function execution."""
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    """A function that takes some time."""
    import time
    time.sleep(0.5)
    return "Done!"

@timer_decorator
def calculate_sum(n):
    """Calculate sum of first n numbers."""
    return sum(range(n + 1))

result1 = slow_function()
result2 = calculate_sum(100000)
print(f"Results: {result1}, {result2}")
\`\`\`

---

## 📚 Higher-Order Functions

### **Functions as Arguments and Return Values**
\`\`\`python
def apply_operation(func, x, y):
    """Apply a function to two arguments."""
    return func(x, y)

def create_adder(n):
    """Create a function that adds n to any number."""
    def adder(x):
        return x + n
    return adder

# Use functions as arguments
result1 = apply_operation(lambda a, b: a + b, 5, 3)  # 8
result2 = apply_operation(lambda a, b: a * b, 5, 3)  # 15

# Create specialized functions
add_10 = create_adder(10)
add_100 = create_adder(100)

print(add_10(5))   # 15
print(add_100(5))  # 105
\`\`\`

---

## 🔄 Generators

### **Functions That Yield Values**
\`\`\`python
def fibonacci_generator(limit):
    """Generate Fibonacci numbers up to limit."""
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

def countdown_generator(n):
    """Generate countdown from n to 0."""
    while n >= 0:
        yield n
        n -= 1

# Use generators
fib_gen = fibonacci_generator(10)
print("Fibonacci:", list(fib_gen))

countdown_gen = countdown_generator(5)
for num in countdown_gen:
    print(f"Countdown: {num}")
\`\`\`

---

## 🎯 Function Annotations

### **Type Hints for Functions**
\`\`\`python
def greet(name: str) -> str:
    """Greet someone by name."""
    return f"Hello, {name}!"

def calculate_area(length: float, width: float) -> float:
    """Calculate rectangle area."""
    return length * width

def process_data(data: list, operation: str = "sum") -> float:
    """Process a list of numbers."""
    if operation == "sum":
        return sum(data)
    elif operation == "average":
        return sum(data) / len(data)
    return 0.0

# Annotations are stored in __annotations__
print(greet.__annotations__)      # {'name': <class 'str'>, 'return': <class 'str'>}
print(calculate_area.__annotations__)  # {'length': <class 'float'>, 'width': <class 'float'>, 'return': <class 'float'>}
\`\`\`

---

## 🎨 Practical Examples

### **Memoization Decorator**
\`\`\`python
def memoize(func):
    """Decorator to cache function results."""
    cache = {}

    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]

    return wrapper

@memoize
def fibonacci(n):
    """Calculate nth Fibonacci number with memoization."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# First call is slow, subsequent calls are fast
import time
start = time.time()
result = fibonacci(35)
end = time.time()
print(f"Fibonacci 35: {result} (took {end - start:.4f}s)")

# Second call is instant
start = time.time()
result = fibonacci(35)
end = time.time()
print(f"Cached result: {result} (took {end - start:.4f}s)")
\`\`\`

### **Function Composition**
\`\`\`python
def compose(*functions):
    """Compose multiple functions."""
    def composed_function(x):
        result = x
        for func in reversed(functions):
            result = func(result)
        return result
    return composed_function

# Create composed functions
def add_1(x): return x + 1
def multiply_2(x): return x * 2
def square(x): return x ** 2

# Compose: square(multiply_2(add_1(x)))
complex_function = compose(square, multiply_2, add_1)
result = complex_function(3)  # ((3 + 1) * 2) ^ 2 = 64
print(f"Composed result: {result}")

# Verify manually
manual = square(multiply_2(add_1(3)))
print(f"Manual result: {manual}")
\`\`\`

---

## ✅ Best Practices

1. **Use recursion carefully** - Avoid deep recursion that could cause stack overflow
2. **Lambda for simple functions** - Use named functions for complex logic
3. **Decorators for cross-cutting concerns** - Logging, timing, caching, etc.
4. **Generators for large datasets** - Memory efficient for big data
5. **Type annotations for clarity** - Especially in team projects

Advanced functions unlock Python's full potential! 🚀`
};

