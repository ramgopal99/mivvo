import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_4: SubLesson = {
  id: "16.4",
  title: 'Iterators and Generators',
  status: 'demo',
  content: "`# ðŸ”„ Iterators and Generators

Iterators and generators are fundamental concepts in Python that enable efficient processing of large datasets and lazy evaluation. They form the basis of Python's iteration protocol and are essential for memory-efficient programming. Let's explore these powerful tools!

---

## ðŸŽ¯ Understanding Iteration

### **What is an Iterator?**
An **iterator** is an object that implements the iterator protocol with \`"__iter__()\` and \`__next__()\` methods.

### **What is a Generator?**
A **generator** is a special type of iterator created using functions with \`yield\` or generator expressions.

### **Why Use Iterators/Generators?**
- **Memory efficiency** - Process large datasets without loading everything into memory
- **Lazy evaluation** - Compute values only when needed
- **Infinite sequences** - Generate infinite series
- **Pipeline processing** - Chain operations efficiently

---

## ðŸ’» Creating Custom Iterators

### **Basic Iterator Class**
\`\`\`python
class Counter:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    
    def __iter__(self):
        return self  # Iterator object is self
    
    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# Usage
counter = Counter(1, 5)
for num in counter:
    print(num, end=" ")  # 1 2 3 4

# Manual iteration
counter = Counter(1, 4)
iterator = iter(counter)
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
try:
    print(next(iterator))  # StopIteration
except StopIteration:
    print("Iteration complete")
\`\`\`

### **Fibonacci Iterator**
\`\`\`python
class Fibonacci:
    def __init__(self, max_count=10):
        self.max_count = max_count
        self.count = 0
        self.a, self.b = 0, 1
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.count >= self.max_count:
            raise StopIteration
        
        if self.count == 0:
            self.count += 1
            return 0
        elif self.count == 1:
            self.count += 1
            return 1
        
        result = self.a + self.b
        self.a, self.b = self.b, result
        self.count += 1
        return result

# Usage
fib = Fibonacci(10)
for num in fib:
    print(num, end=" ")  # 0 1 1 2 3 5 8 13 21 34
\`\`\`

---

## âš¡ Generator Functions

### **Basic Generator**
\`\`\`python
def simple_generator():
    yield 1
    yield 2
    yield 3

# Usage
gen = simple_generator()
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
try:
    print(next(gen))  # StopIteration
except StopIteration:
    print("Generator exhausted")

# Using in a loop
for value in simple_generator():
    print(value, end=" ")  # 1 2 3
\`\`\`

### **Fibonacci Generator**
\`\`\`python
def fibonacci_generator(max_count=10):
    count = 0
    a, b = 0, 1
    while count < max_count:
        if count == 0:
            yield 0
        elif count == 1:
            yield 1
        else:
            a, b = b, a + b
            yield b
        count += 1

# Usage
for num in fibonacci_generator(10):
    print(num, end=" ")  # 0 1 1 2 3 5 8 13 21 34
\`\`\`

### **Infinite Generator**
\`\`\`python
def infinite_counter(start=0):
    current = start
    while True:
        yield current
        current += 1

# Usage (be careful with infinite generators!)
counter = infinite_counter(100)
for i in range(5):
    print(next(counter), end=" ")  # 100 101 102 103 104

# Use itertools.islice for safety
import itertools
for num in itertools.islice(infinite_counter(1000), 5):
    print(num, end=" ")  # 1000 1001 1002 1003 1004
\`\`\`

---

## ðŸŽ¨ Generator Expressions

### **List Comprehension vs Generator Expression**
\`\`\`python
# List comprehension - creates entire list in memory
squares_list = [x**2 for x in range(1000000)]  # Uses ~4GB memory

# Generator expression - creates values on demand
squares_gen = (x**2 for x in range(1000000))   # Uses minimal memory

print(f"List type: {type(squares_list)}")     # <class 'list'>
print(f"Gen type: {type(squares_gen)}")       # <class 'generator'>

# Use generator
for square in squares_gen:
    if square > 100:
        break
    print(square, end=" ")  # 0 1 4 9 16 25 36 49 64 81
\`\`\`

### **Complex Generator Expressions**
\`\`\`python
# Multiple conditions
even_squares = (x**2 for x in range(20) if x % 2 == 0)
print(list(even_squares))  # [0, 4, 16, 36, 64, 100, 144, 196, 256, 324]

# Nested generators
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = (num for row in matrix for num in row)
print(list(flattened))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# With functions
import math
large_squares = (x**2 for x in range(100) if math.sqrt(x**2) == x)  # Only perfect squares
print(list(large_squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

---

## ðŸ”§ Advanced Generator Techniques

### **Generator Pipelines**
\`\`\`python
def get_numbers():
    """Generate numbers"""
    for i in range(10):
        yield i

def filter_even(numbers):
    """Filter even numbers"""
    for num in numbers:
        if num % 2 == 0:
            yield num

def multiply_by_10(numbers):
    """Multiply by 10"""
    for num in numbers:
        yield num * 10

# Create pipeline
numbers = get_numbers()
evens = filter_even(numbers)
result = multiply_by_10(evens)

print(list(result))  # [0, 20, 40, 60, 80]
\`\`\`

### **send() and throw() Methods**
\`\`\`python
def counter():
    value = 0
    while True:
        received = (yield value)
        if received is not None:
            value = received
        else:
            value += 1

# Usage
gen = counter()
print(next(gen))     # 0
print(next(gen))     # 1
print(gen.send(10))  # 10 (reset to 10)
print(next(gen))     # 11
print(next(gen))     # 12

# Using throw()
try:
    gen.throw(ValueError("Something went wrong"))
except ValueError as e:
    print(f"Caught exception: {e}")
\`\`\`

### **Generator-Based Coroutines**
\`\`\`python
def average():
    total = 0.0
    count = 0
    avg = 0.0
    while True:
        try:
            value = (yield avg)
            total += value
            count += 1
            avg = total / count
        except GeneratorExit:
            print(f"Final average: {avg}")
            return

# Usage
avg_gen = average()
next(avg_gen)  # Initialize

print(avg_gen.send(10))  # 10.0
print(avg_gen.send(20))  # 15.0
print(avg_gen.send(30))  # 20.0

avg_gen.close()  # Final average: 20.0
\`\`\`

---

## ðŸ“š Built-in Iterators and Generators

### **range() - Lazy Iterator**
\`\`\`python
# range() creates a range object (iterator)
r = range(5)
print(f"Type: {type(r)}")  # <class 'range'>
print(f"List: {list(r)}")  # [0, 1, 2, 3, 4]

# Memory efficient
big_range = range(1000000)
print(f"Memory usage: minimal")
# No list created until needed
\`\`\`

### **enumerate()**
\`\`\`python
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# With start parameter
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
\`\`\`

### **zip()**
\`\`\`python
names = ['Alice', 'Bob', 'Charlie']
ages = [25, 30, 35]
cities = ['NYC', 'LA', 'Chicago']

# Zip creates tuples from multiple iterables
for name, age, city in zip(names, ages, cities):
    print(f"{name} is {age} years old and lives in {city}")

# Zip stops at shortest iterable
short_list = [1, 2]
long_list = [1, 2, 3, 4, 5]
zipped = list(zip(short_list, long_list))
print(zipped)  # [(1, 1), (2, 2)]
\`\`\`

### **itertools Module**
\`\`\`python
import itertools

# Infinite iterators
counter = itertools.count(start=10, step=2)
print(list(itertools.islice(counter, 5)))  # [10, 12, 14, 16, 18]

# Cycle through values
cycler = itertools.cycle(['A', 'B', 'C'])
print(list(itertools.islice(cycler, 7)))  # ['A', 'B', 'C', 'A', 'B', 'C', 'A']

# Repeat values
repeater = itertools.repeat('hello', 3)
print(list(repeater))  # ['hello', 'hello', 'hello']

# Chain iterables
combined = itertools.chain([1, 2, 3], ['a', 'b', 'c'])
print(list(combined))  # [1, 2, 3, 'a', 'b', 'c']
\`\`\`

---

## ðŸ§ª Practical Examples

### **Example 1: File Processing**
\`\`\`python
def read_large_file(filename):
    """Generator to read large file line by line"""
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Process large file without loading into memory
def process_log_file(filename):
    error_count = 0
    for line in read_large_file(filename):
        if 'ERROR' in line:
            error_count += 1
            if error_count <= 5:  # Show first 5 errors
                print(f"Error found: {line}")
    print(f"Total errors: {error_count}")

# Usage (assuming log.txt exists)
# process_log_file('log.txt')
\`\`\`

### **Example 2: Prime Number Generator**
\`\`\`python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

def prime_generator():
    num = 2
    while True:
        if is_prime(num):
            yield num
        num += 1

# Generate first 10 primes
primes = prime_generator()
for i, prime in enumerate(primes):
    if i >= 10:
        break
    print(prime, end=" ")  # 2 3 5 7 11 13 17 19 23 29
\`\`\`

### **Example 3: Tree Traversal**
\`\`\`python
class TreeNode:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right

def inorder_traversal(root):
    """Inorder traversal using generator"""
    if root:
        yield from inorder_traversal(root.left)
        yield root.value
        yield from inorder_traversal(root.right)

# Create a binary tree
#       1
#      / \\
#     2   3
#    / \\
#   4   5

root = TreeNode(1,
    TreeNode(2, TreeNode(4), TreeNode(5)),
    TreeNode(3)
)

print("Inorder traversal:", list(inorder_traversal(root)))  # [4, 2, 5, 1, 3]
\`\`\`

---

## âš¡ Generator Performance Benefits

### **Memory Usage Comparison**
\`\`\`python
import sys

# List approach (high memory)
def squares_list(n):
    return [x**2 for x in range(n)]

# Generator approach (low memory)
def squares_generator(n):
    for x in range(n):
        yield x**2

n = 1000000
list_squares = squares_list(n)
gen_squares = squares_generator(n)

print(f"List memory: {sys.getsizeof(list_squares)} bytes")
print(f"Generator memory: {sys.getsizeof(gen_squares)} bytes")

# List: ~4MB, Generator: ~128 bytes
\`\`\`

### **Lazy Evaluation**
\`\`\`python
def expensive_computation(x):
    print(f"Computing {x}...")
    return x ** 2

# List comprehension - computes everything immediately
results_list = [expensive_computation(x) for x in range(5)]
print("List results:", results_list)

print()

# Generator expression - computes on demand
results_gen = (expensive_computation(x) for x in range(5))
print("First result:", next(results_gen))  # Computes only 0
print("Second result:", next(results_gen)) # Computes only 1
\`\`\`

---

## ðŸŽ¯ Iterator Protocol

### **Making Objects Iterable**
\`\`\`python
class MyRange:
    def __init__(self, start, end):
        self.start = start
        self.end = end
    
    def __iter__(self):
        return MyRangeIterator(self.start, self.end)

class MyRangeIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end
    
    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# Usage
my_range = MyRange(0, 5)
for num in my_range:
    print(num, end=" ")  # 0 1 2 3 4
\`\`\`

### **Iterator vs Iterable**
\`\`\`python
# An iterable is an object that implements __iter__()
# An iterator is an object that implements __iter__() and __next__()

class IterableExample:
    def __init__(self, data):
        self.data = data
    
    def __iter__(self):
        return iter(self.data)  # Returns an iterator

class IteratorExample:
    def __init__(self, data):
        self.data = data
        self.index = 0
    
    def __iter__(self):
        return self
    
    def __next__(self):
        if self.index >= len(self.data):
            raise StopIteration
        value = self.data[self.index]
        self.index += 1
        return value

# Usage
iterable = IterableExample([1, 2, 3])
iterator = IteratorExample([1, 2, 3])

print("Iterable:")
for item in iterable:
    print(item, end=" ")  # 1 2 3

print("\\nIterator:")
for item in iterator:
    print(item, end=" ")  # 1 2 3
\`\`\`

---

## ðŸ† Key Takeaways

1. **Iterators** implement \`__iter__()\` and \`__next__()\` methods
2. **Generators** are created with \`yield\` or generator expressions
3. **Memory efficient** - process large datasets without loading everything
4. **Lazy evaluation** - compute values only when needed
5. **Pipeline processing** - chain multiple generators efficiently
6. **Infinite sequences** possible with generators

**Iterators and generators are essential for writing memory-efficient, scalable Python code. They enable processing of large datasets and create elegant data processing pipelines! ðŸ”„**`
};


