import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_8: SubLesson = {
  id: 16.8,
  title: 'Advanced Python Features',
  status: 'demo',
  content: `# 🚀 Advanced Python Features

Python offers many advanced features that enable sophisticated programming patterns and techniques. This topic covers powerful language features like metaclasses, descriptors, method resolution order, and other advanced concepts that take Python programming to the next level. Let's explore these advanced capabilities!

---

## 🎯 Metaclasses

### **What are Metaclasses?**
**Metaclasses** are classes that create classes. They allow you to customize class creation and behavior.

\`\`\`python
# The default metaclass is 'type'
class MyClass:
    pass

print(type(MyClass))  # <class 'type'>
print(type(type))     # <class 'type'> (type is its own metaclass)
\`\`\`

### **Creating Custom Metaclasses**
\`\`\`python
class SingletonMeta(type):
    """Metaclass that creates singleton classes"""
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class SingletonClass(metaclass=SingletonMeta):
    def __init__(self, value):
        self.value = value

# Usage
obj1 = SingletonClass(42)
obj2 = SingletonClass(100)

print(obj1 is obj2)  # True (same instance)
print(obj1.value)    # 42 (first value set)
print(obj2.value)    # 42 (same instance)
\`\`\`

### **Metaclass for Validation**
\`\`\`python
class ValidatedMeta(type):
    def __new__(cls, name, bases, namespace, **kwargs):
        # Validate class definition
        if 'required_attr' not in namespace:
            raise TypeError(f"Class {name} must have 'required_attr'")
        
        # Add automatic methods
        if '__str__' not in namespace:
            namespace['__str__'] = lambda self: f"{name}({self.required_attr})"
        
        return super().__new__(cls, name, bases, namespace)

class ValidatedClass(metaclass=ValidatedMeta):
    required_attr = "mandatory"
    
    def __init__(self, value):
        self.value = value

# Usage
obj = ValidatedClass(42)
print(obj)  # ValidatedClass(mandatory)
\`\`\`

---

## 🔍 Descriptors

### **What are Descriptors?**
**Descriptors** are objects that customize attribute access. They implement \`__get__\`, \`__set__\`, or \`__delete__\` methods.

### **Data Descriptor**
\`\`\`python
class ValidatedAttribute:
    def __init__(self, validator=None):
        self.validator = validator
        self.name = None
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.name, None)
    
    def __set__(self, instance, value):
        if self.validator and not self.validator(value):
            raise ValueError(f"Invalid value for {self.name}: {value}")
        instance.__dict__[self.name] = value

def is_positive(value):
    return isinstance(value, (int, float)) and value > 0

class Product:
    price = ValidatedAttribute(is_positive)
    quantity = ValidatedAttribute(lambda x: isinstance(x, int) and x >= 0)
    
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity

# Usage
product = Product("Widget", 29.99, 100)
print("Product: " + product.name + ", Price: $" + str(product.price) + ", Qty: " + str(product.quantity))

try:
    product.price = -10  # Raises ValueError
except ValueError as e:
    print("Error: " + str(e))
\`\`\`

### **Non-Data Descriptor**
\`\`\`python
class LazyProperty:
    def __init__(self, func):
        self.func = func
        self.name = None
    
    def __set_name__(self, owner, name):
        self.name = name
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        
        # Compute and cache the value
        value = self.func(instance)
        instance.__dict__[self.name] = value
        return value

class DataProcessor:
    def __init__(self, data):
        self.data = data
        self._processed = None
    
    @LazyProperty
    def processed_data(self):
        print("Computing processed data (expensive operation)...")
        # Simulate expensive computation
        import time
        time.sleep(0.1)
        return [x * 2 for x in self.data]

# Usage
processor = DataProcessor([1, 2, 3, 4, 5])

# First access - computed
print(processor.processed_data)  # Computes and caches

# Subsequent access - cached
print(processor.processed_data)  # Uses cached value
\`\`\`

---

## 🏗️ Method Resolution Order (MRO)

### **Understanding MRO**
\`\`\`python
class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):
    pass

# Method Resolution Order
print(D.__mro__)  # (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

d = D()
print(d.method())  # B (follows MRO: D -> B -> C -> A)
\`\`\`

### **C3 Linearization Algorithm**
\`\`\`python
# Python uses C3 linearization to create MRO
# Ensures consistent method resolution in complex inheritance hierarchies

class X: pass
class Y: pass
class Z(X, Y): pass

# Check if inheritance is valid
try:
    class A(Z, Y): pass  # This would create inconsistent MRO
except TypeError as e:
    print(f"Inconsistent MRO: {e}")

# Valid inheritance
class A(X, Y): pass
class B(Z, A): pass  # Valid: follows C3 rules
print(B.__mro__)
\`\`\`

---

## 🎨 Abstract Base Classes (ABCs)

### **Creating Abstract Classes**
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        """Calculate area of shape"""
        pass
    
    @abstractmethod
    def perimeter(self):
        """Calculate perimeter of shape"""
        pass
    
    # Concrete method
    def description(self):
        return f"This is a {self.__class__.__name__}"

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Usage
shapes = [Rectangle(4, 5), Circle(3)]

for shape in shapes:
    print(f"{shape.description()}: Area={shape.area():.2f}, Perimeter={shape.perimeter():.2f}")

# Cannot instantiate abstract class
try:
    shape = Shape()  # Raises TypeError
except TypeError as e:
    print(f"Error: {e}")
\`\`\`

### **ABCs for Type Checking**
\`\`\`python
from abc import ABC, abstractmethod
from collections.abc import Iterable

class DataProcessor(ABC):
    @abstractmethod
    def process(self, data):
        pass
    
    @classmethod
    def __subclasshook__(cls, subclass):
        return (hasattr(subclass, 'process') and 
                callable(getattr(subclass, 'process', None)))

class ListProcessor:
    def process(self, data):
        return [x * 2 for x in data]

class DictProcessor:
    def process(self, data):
        return {k: v * 2 for k, v in data.items()}

# Usage
processors = [ListProcessor(), DictProcessor()]

for processor in processors:
    print(isinstance(processor, DataProcessor))  # True (due to __subclasshook__)

# Type checking
def process_data(processor, data):
    if isinstance(processor, DataProcessor):
        return processor.process(data)
    raise TypeError("Invalid processor")

result = process_data(ListProcessor(), [1, 2, 3])
print(result)  # [2, 4, 6]
\`\`\`

---

## 🔧 Advanced Function Features

### **Function Introspection**
\`\`\`python
def example_function(a, b=10, *args, **kwargs):
    """Example function with various parameter types"""
    return a + b + sum(args) + sum(kwargs.values())

# Function introspection
print(f"Name: {example_function.__name__}")
print(f"Docstring: {example_function.__doc__}")
print(f"Module: {example_function.__module__}")

import inspect
sig = inspect.signature(example_function)
print(f"Signature: {sig}")

# Parameter information
for name, param in sig.parameters.items():
    print(f"{name}: {param.kind} = {param.default}")
\`\`\`

### **functools Module**
\`\`\`python
import functools

# Partial functions
def multiply(x, y, z):
    return x * y * z

double = functools.partial(multiply, 2)  # Fix first argument
triple_and_double = functools.partial(multiply, 3, 2)  # Fix first two arguments

print(double(3, 4))           # 24 (2 * 3 * 4)
print(triple_and_double(5))   # 30 (3 * 2 * 5)

# Cached functions
@functools.lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(30))  # Computed once, cached for future calls

# Function composition
def compose(*functions):
    return functools.reduce(lambda f, g: lambda x: f(g(x)), functions)

add_one = lambda x: x + 1
multiply_two = lambda x: x * 2
square = lambda x: x ** 2

# Compose: square(multiply_two(add_one(x)))
complex_function = compose(square, multiply_two, add_one)
print(complex_function(3))  # ((3+1)*2)^2 = 64
\`\`\`

---

## 🎯 Advanced Class Features

### **__slots__ for Memory Optimization**
\`\`\`python
class RegularClass:
    def __init__(self, name, value):
        self.name = name
        self.value = value

class SlottedClass:
    __slots__ = ['name', 'value']  # Only these attributes allowed
    
    def __init__(self, name, value):
        self.name = name
        self.value = value

# Memory comparison
import sys
regular = RegularClass("test", 42)
slotted = SlottedClass("test", 42)

print(f"Regular class size: {sys.getsizeof(regular)} bytes")
print(f"Slotted class size: {sys.getsizeof(slotted)} bytes")

# Slotted classes prevent new attributes
try:
    slotted.new_attr = "not allowed"
except AttributeError as e:
    print(f"Error: {e}")
\`\`\`

### **Class Decorators**
\`\`\`python
def add_method(cls):
    """Decorator that adds a method to a class"""
    def new_method(self):
        return f"New method called on {self.__class__.__name__}"
    
    cls.new_method = new_method
    return cls

@add_method
class MyClass:
    def __init__(self, value):
        self.value = value

obj = MyClass(42)
print(obj.new_method())  # New method called on MyClass
\`\`\`

---

## 🚀 Advanced Data Structures

### **Named Tuples**
\`\`\`python
from collections import namedtuple

# Create a named tuple class
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', 'name age city', defaults=['Unknown'])

# Usage
p1 = Point(10, 20)
p2 = Point(30, 40)

print(f"Point 1: x={p1.x}, y={p1.y}")
print(f"Distance: {((p2.x-p1.x)**2 + (p2.y-p1.y)**2)**0.5}")

person = Person('Alice', 30)
print(f"{person.name} is {person.age} years old")

# Named tuples are immutable
try:
    person.age = 31  # Raises AttributeError
except AttributeError as e:
    print(f"Immutable: {e}")
\`\`\`

### **DefaultDict and Counter**
\`\`\`python
from collections import defaultdict, Counter

# defaultdict - provides default values for missing keys
word_counts = defaultdict(int)
text = "the quick brown fox jumps over the lazy dog"

for word in text.split():
    word_counts[word] += 1

print(dict(word_counts))  # {'the': 2, 'quick': 1, 'brown': 1, ...}

# Counter - counts hashable objects
from collections import Counter
colors = ['red', 'blue', 'red', 'green', 'blue', 'red']
color_counts = Counter(colors)
print(color_counts)      # Counter({'red': 3, 'blue': 2, 'green': 1})
print(color_counts.most_common(2))  # [('red', 3), ('blue', 2)]
\`\`\`

---

## 🧪 Practical Advanced Examples

### **Example 1: Custom Property Descriptor**
\`\`\`python
class TypeChecked:
    def __init__(self, name, expected_type):
        self.name = name
        self.expected_type = expected_type
    
    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.name)
    
    def __set__(self, instance, value):
        if not isinstance(value, self.expected_type):
            raise TypeError(f"{self.name} must be {self.expected_type.__name__}, got {type(value).__name__}")
        instance.__dict__[self.name] = value

class Person:
    name = TypeChecked('name', str)
    age = TypeChecked('age', int)
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

person = Person("Alice", 30)
print(f"{person.name} is {person.age} years old")

try:
    person.age = "thirty"  # TypeError
except TypeError as e:
    print(f"Type error: {e}")
\`\`\`

### **Example 2: Metaclass for API Registration**
\`\`\`python
class APIRegistry(type):
    registry = {}
    
    def __new__(cls, name, bases, namespace, **kwargs):
        # Register classes that have 'api_endpoint' attribute
        if 'api_endpoint' in namespace:
            cls.registry[namespace['api_endpoint']] = cls
        
        return super().__new__(cls, name, bases, namespace)

class APIView(metaclass=APIRegistry):
    pass

class UserView(APIView):
    api_endpoint = '/users'
    
    def get(self, user_id):
        return f"User {user_id}"

class ProductView(APIView):
    api_endpoint = '/products'
    
    def get(self, product_id):
        return f"Product {product_id}"

# Access registered views
print("Registered endpoints:")
for endpoint, view_class in APIRegistry.registry.items():
    print(f"{endpoint}: {view_class.__name__}")

# Simulate routing
def route_request(endpoint, method, *args):
    if endpoint in APIRegistry.registry:
        view_class = APIRegistry.registry[endpoint]
        view = view_class()
        if hasattr(view, method):
            return getattr(view, method)(*args)
    return "404 Not Found"

print(route_request('/users', 'get', 123))      # User 123
print(route_request('/products', 'get', 456))   # Product 456
print(route_request('/unknown', 'get'))         # 404 Not Found
\`\`\`

---

## 🎯 Advanced Exception Handling

### **Custom Exception Hierarchy**
\`\`\`python
class ApplicationError(Exception):
    """Base exception for application errors"""
    pass

class ValidationError(ApplicationError):
    """Raised when validation fails"""
    pass

class DatabaseError(ApplicationError):
    """Raised when database operations fail"""
    pass

class ConnectionError(DatabaseError):
    """Raised when database connection fails"""
    pass

def process_user_data(user_data):
    try:
        if not user_data.get('name'):
            raise ValidationError("Name is required")
        
        # Simulate database operation
        if user_data.get('simulate_db_error'):
            raise ConnectionError("Database connection failed")
        
        return f"Processed user: {user_data['name']}"
    
    except ValidationError as e:
        print(f"Validation failed: {e}")
        return None
    except ConnectionError as e:
        print(f"Database error: {e}")
        return None
    except ApplicationError as e:
        print(f"Application error: {e}")
        return None

# Usage
print(process_user_data({'name': 'Alice'}))              # Success
print(process_user_data({}))                            # Validation error
print(process_user_data({'simulate_db_error': True}))   # Database error
\`\`\`

### **Context Managers with Exception Chaining**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def transaction_manager():
    print("Starting transaction")
    try:
        yield
        print("Committing transaction")
    except Exception as e:
        print(f"Rolling back transaction due to: {e}")
        raise  # Re-raise the exception

def risky_operation():
    raise ValueError("Operation failed")

try:
    with transaction_manager():
        print("Performing operation")
        risky_operation()
except ValueError as e:
    print(f"Caught exception: {e}")
\`\`\`

---

## 🏆 Key Takeaways

1. **Metaclasses** customize class creation and behavior
2. **Descriptors** control attribute access and validation
3. **Method Resolution Order (MRO)** determines method lookup in inheritance
4. **Abstract Base Classes (ABCs)** define interfaces and enable duck typing
5. **Function introspection** enables dynamic code analysis
6. **\`functools\`** provides powerful function manipulation tools
7. **\`__slots__\`** optimizes memory usage for classes
8. **Advanced data structures** like named tuples enhance code clarity
9. **Custom exceptions** improve error handling and debugging

**These advanced features enable sophisticated Python programming patterns and are essential for building robust, maintainable applications! 🚀**`
};
