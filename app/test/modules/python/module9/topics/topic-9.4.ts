import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_4: SubLesson = {
  id: 9.4,
  title: 'Polymorphism',
  status: 'demo',
  content: `# 🎭 Polymorphism

Polymorphism enables objects to take multiple forms. The concept of "if it walks like a duck and quacks like a duck, it must be a duck" makes code incredibly flexible and intuitive!

---

## 🎯 Duck Typing Philosophy

### **What is Duck Typing?**
Duck typing is a programming concept where **object suitability is determined by the presence of certain methods and properties**, rather than the type of the object itself.

\`\`\`python
# Duck typing in action
class Dog:
    def speak(self):
        return "Woof!"

class Robot:
    def speak(self):
        return "Beep boop!"

class Duck:
    def speak(self):
        return "Quack!"

def make_sound(animal):
    """Works with any object that has a speak() method"""
    return animal.speak()

# All work identically - no inheritance required!
creatures = [Dog(), Robot(), Duck()]
for creature in creatures:
    print(f"{creature.__class__.__name__}: {make_sound(creature)}")
\`\`\`

### **Why "Duck Typing"?**
> *"When I see a bird that walks like a duck and swims like a duck and quacks like a duck, I call that bird a duck."*

In Python, if an object has the methods and attributes you need, you can use it - regardless of its class hierarchy.

---

## 🔄 Polymorphism Through Inheritance

### **Method Overriding**
Child classes can provide their own implementation of inherited methods.

\`\`\`python
class Animal:
    def speak(self):
        return "Some generic animal sound"

    def move(self):
        return "Moving in some way"

class Dog(Animal):
    def speak(self):  # Override parent method
        return "Woof!"

    def move(self):   # Override parent method
        return "Running on four legs"

class Cat(Animal):
    def speak(self):  # Override parent method
        return "Meow!"

    def move(self):   # Override parent method
        return "Sneaking quietly"

# Polymorphic function
def animal_actions(animals):
    for animal in animals:
        print(f"{animal.__class__.__name__}:")
        print(f"  Speaks: {animal.speak()}")
        print(f"  Moves: {animal.move()}")
        print()

zoo = [Dog(), Cat()]
animal_actions(zoo)
\`\`\`

---

## 🎭 Duck Typing vs Inheritance Polymorphism

### **Inheritance-Based Polymorphism**
\`\`\`python
class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

def calculate_total_area(shapes):
    return sum(shape.area() for shape in shapes)

shapes = [Circle(5), Square(4)]
print(f"Total area: {calculate_total_area(shapes):.2f}")
\`\`\`

### **Duck Typing Polymorphism (No Inheritance Required!)**
\`\`\`python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):  # Same method name, different implementation
        return self.width * self.height

# No common base class, but works perfectly!
def calculate_total_area(shapes):
    return sum(shape.area() for shape in shapes)

shapes = [Circle(5), Rectangle(4, 6)]
print(f"Total area: {calculate_total_area(shapes):.2f}")
\`\`\`

---

## 🔧 Special Methods and Operator Overloading

### **Making Custom Objects Work with Built-in Operators**

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):        # +
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):        # -
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):       # *
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):         # ==
        return self.x == other.x and self.y == other.y

    def __str__(self):               # str()
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):              # repr()
        return f"Vector(x={self.x}, y={self.y})"

v1 = Vector(2, 3)
v2 = Vector(1, 4)

print(v1 + v2)      # Vector(3, 7)
print(v1 * 3)       # Vector(6, 9)
print(v1 == v2)     # False
print(str(v1))      # Vector(2, 3)
print(repr(v1))     # Vector(x=2, y=3)
\`\`\`

### **Container Protocol**

\`\`\`python
class CustomList:
    def __init__(self, items):
        self.items = list(items)

    def __getitem__(self, index):    # obj[index]
        return self.items[index]

    def __setitem__(self, index, value):  # obj[index] = value
        self.items[index] = value

    def __len__(self):               # len(obj)
        return len(self.items)

    def __iter__(self):              # for item in obj
        return iter(self.items)

    def __contains__(self, item):    # item in obj
        return item in self.items

custom_list = CustomList([1, 2, 3, 4, 5])

print(len(custom_list))      # 5
print(custom_list[2])        # 3
print(3 in custom_list)      # True

for item in custom_list:     # Works with for loops
    print(item, end=" ")    # 1 2 3 4 5
\`\`\`

---

## 📝 Function Polymorphism with *args and **kwargs

### **Flexible Function Parameters**
Python functions can accept any number of arguments, enabling polymorphic behavior.

\`\`\`python
def calculate(*args, **kwargs):
    """Polymorphic function that handles different calculation types"""
    operation = kwargs.get('operation', 'sum')

    if operation == 'sum':
        return sum(args)
    elif operation == 'product':
        result = 1
        for arg in args:
            result *= arg
        return result
    elif operation == 'average':
        return sum(args) / len(args) if args else 0
    else:
        raise ValueError(f"Unknown operation: {operation}")

# Same function, different behaviors
print(calculate(1, 2, 3))                    # 6 (sum)
print(calculate(1, 2, 3, operation='product')) # 6 (product)
print(calculate(1, 2, 3, 4, operation='average')) # 2.5 (average)
\`\`\`

---

## 🎨 Protocol-Based Polymorphism

### **File-like Objects Protocol**
Any object that implements the file protocol can be used wherever files are expected.

\`\`\`python
import io

class InMemoryFile:
    """Custom file-like object"""
    def __init__(self):
        self.content = ""
        self.position = 0

    def write(self, data):
        self.content += data

    def read(self):
        return self.content

    def seek(self, position):
        self.position = position

    def tell(self):
        return self.position

# Works with any function expecting a file-like object
def save_data(data, file_obj):
    file_obj.write(data)

# Both work identically!
memory_file = InMemoryFile()
string_file = io.StringIO()

save_data("Hello World!", memory_file)
save_data("Hello World!", string_file)

print("Memory file:", memory_file.read())
print("StringIO file:", string_file.getvalue())
\`\`\`

---

## 🔄 Abstract Base Classes and Interfaces

### **Defining Contracts with ABC**

\`\`\`python
from abc import ABC, abstractmethod

class Drawable(ABC):
    @abstractmethod
    def draw(self, canvas):
        """Must be implemented by drawable objects"""
        pass

    @abstractmethod
    def get_bounds(self):
        """Must return bounding box"""
        pass

class Circle(Drawable):
    def __init__(self, x, y, radius):
        self.x, self.y, self.radius = x, y, radius

    def draw(self, canvas):
        return f"Drawing circle at ({self.x}, {self.y}) with radius {self.radius}"

    def get_bounds(self):
        return (self.x - self.radius, self.y - self.radius,
                self.x + self.radius, self.y + self.radius)

class Rectangle(Drawable):
    def __init__(self, x, y, width, height):
        self.x, self.y, self.width, self.height = x, y, width, height

    def draw(self, canvas):
        return f"Drawing rectangle at ({self.x}, {self.y}) size {self.width}x{self.height}"

    def get_bounds(self):
        return (self.x, self.y, self.x + self.width, self.y + self.height)

def render_scene(objects):
    """Polymorphic function - works with any Drawable"""
    for obj in objects:
        print(obj.draw("screen"))
        bounds = obj.get_bounds()
        print(f"  Bounds: {bounds}")

scene = [Circle(100, 100, 50), Rectangle(200, 200, 80, 60)]
render_scene(scene)
\`\`\`

---

## 🌟 Real-World Python Polymorphism

### **Web Frameworks**
\`\`\`python
# Django views - all inherit from View but can be completely different
class APIView:
    def dispatch(self, request, *args, **kwargs):
        method = request.method.lower()
        if hasattr(self, method):
            return getattr(self, method)(request, *args, **kwargs)
        return self.http_method_not_allowed(request)

class UserView(APIView):
    def get(self, request):
        return "List users"

    def post(self, request):
        return "Create user"

class ProductView(APIView):
    def get(self, request, product_id=None):
        if product_id:
            return f"Get product {product_id}"
        return "List products"
\`\`\`

### **Data Processing Pipelines**
\`\`\`python
class DataProcessor:
    def process(self, data):
        """Template method with polymorphic steps"""
        data = self.validate(data)
        data = self.transform(data)
        data = self.save(data)
        return data

class CSVProcessor(DataProcessor):
    def validate(self, data):
        return data  # CSV validation logic

    def transform(self, data):
        return [row.split(',') for row in data]

    def save(self, data):
        return f"Saved {len(data)} CSV rows"

class JSONProcessor(DataProcessor):
    def validate(self, data):
        import json
        return json.loads(data)  # JSON validation

    def transform(self, data):
        return {k: v.upper() for k, v in data.items()}

    def save(self, data):
        return f"Saved JSON object with keys: {list(data.keys())}"

processors = [CSVProcessor(), JSONProcessor()]
for processor in processors:
    result = processor.process("sample data")
    print(f"{processor.__class__.__name__}: {result}")
\`\`\`

---

## 🎯 Key Takeaways

1. **Duck typing** enables flexible polymorphism
2. **Behavior matters more than inheritance**
3. **Any object with the right methods** can be used polymorphically
4. **Special methods** enable operator overloading and protocols
5. **Abstract base classes** provide optional type checking
6. **Flexible functions** enable polymorphism
7. **Protocol-based design** creates maintainable code

Polymorphism is about **flexibility and practicality** - if it works, use it! This approach leads to cleaner, more maintainable code. 🚀`,
};
