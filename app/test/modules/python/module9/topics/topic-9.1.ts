import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_1: SubLesson = {
  id: "9.1",
  title: 'Introduction to Object-Oriented Programming',
  status: 'demo',
  content: `# 🎯 Introduction to Object-Oriented Programming

Object-Oriented Programming (OOP) organizes code around objects and classes, making it perfect for building complex, maintainable applications!

---

## 🏗️ OOP Fundamentals

**Object-Oriented Programming** is based on creating **objects** that bundle data (attributes) and functions (methods) together. Everything is treated as an object, making OOP a natural fit.

### **Why Use OOP?**
- **Dynamic Nature**: Easy to modify objects at runtime
- **Multiple Inheritance**: Classes can inherit from multiple parents
- **Duck Typing**: Focus on behavior over strict type checking
- **Simple Syntax**: Clean, readable class definitions

---

## 🎯 OOP Core Principles

OOP implements four fundamental principles:

| Principle | Implementation | Key Benefit |
|-----------|----------------------|-------------|
| **Encapsulation** | Private attributes (\`__attr\`) | Data protection and modularity |
| **Inheritance** | Class hierarchies with \`super()\` | Code reuse and relationships |
| **Polymorphism** | Duck typing and method overriding | Flexibility and extensibility |
| **Abstraction** | Abstract base classes (\`abc\`) | Interface contracts |

---

## 📦 Objects: Everything is an Object

### **What is an Object?**
**Everything is an object** - even basic types like integers and strings. Objects encapsulate:
- **Data** (instance attributes)
- **Behavior** (methods)
- **Identity** (\`id()\` function)
- **Type** (\`type()\` function)

### **Real-World Example**
\`\`\`python
# Everything is an object
name = "Alice"  # str object
age = 25        # int object
items = [1, 2, 3]  # list object

print(type(name))   # <class 'str'>
print(type(age))    # <class 'int'>
print(type(items))  # <class 'list'>
\`\`\`

---

## 🔧 Classes vs Objects

### **Classes (Blueprints)**
- Defined using the \`class\` keyword
- Can have class attributes and methods
- Support inheritance and polymorphism
- Can be modified dynamically

### **Objects (Instances)**
- Created by calling the class like a function
- Have their own namespace for attributes
- Can be modified independently
- Support dynamic attribute addition

\`\`\`python
# Class definition
class Dog:
    """A simple Dog class"""
    species = "Canis familiaris"  # Class attribute

    def __init__(self, name, breed):
        self.name = name    # Instance attribute
        self.breed = breed  # Instance attribute

# Object creation
buddy = Dog("Buddy", "Golden Retriever")
max = Dog("Max", "Bulldog")

# Dynamic attribute addition
buddy.age = 3  # Add attribute to specific instance

print(buddy.name)      # Buddy
print(max.name)        # Max
print(buddy.species)   # Canis familiaris (shared)
print(Dog.species)     # Canis familiaris (class level)
print(buddy.age)       # 3 (instance-specific)
# print(max.age)       # AttributeError - max doesn't have age
\`\`\`

---

## 🌟 OOP Advantages

### **Dynamic Nature**
\`\`\`python
class FlexibleClass:
    pass

obj = FlexibleClass()
obj.name = "Dynamic"      # Add attribute
obj.greet = lambda: "Hi!" # Add method
setattr(obj, 'age', 25)   # Add via setattr

print(obj.name)           # Dynamic
print(obj.greet())        # Hi!
print(obj.age)            # 25
\`\`\`

### **Duck Typing Philosophy**
\`\`\`python
def make_sound(animal):
    """Works with any object that has a speak method"""
    return animal.speak()

class Dog:
    def speak(self): return "Woof!"

class Cat:
    def speak(self): return "Meow!"

class Duck:
    def speak(self): return "Quack!"

# All work the same way
animals = [Dog(), Cat(), Duck()]
for animal in animals:
    print(make_sound(animal))
\`\`\`

### **Multiple Inheritance**
\`\`\`python
class Flyable:
    def fly(self): return "Flying high!"

class Swimmable:
    def swim(self): return "Swimming fast!"

class Duck(Flyable, Swimmable):
    def speak(self): return "Quack!"

duck = Duck()
print(duck.fly())   # From Flyable
print(duck.swim())  # From Swimmable
print(duck.speak()) # Own method
\`\`\`

---

## 🚀 OOP in Practice

### **Everything is an Object**
\`\`\`python
# Even functions and classes are objects
def greet(name):
    return f"Hello, {name}!"

class Greeter:
    def say_hi(self): return "Hi!"

# Functions can have attributes
greet.language = "English"

# Classes can have attributes
Greeter.version = "1.0"

print(greet("Alice"))      # Hello, Alice!
print(greet.language)      # English
print(Greeter.version)     # 1.0
\`\`\`

### **Built-in Features**
\`\`\`python
# Python's built-in classes use OOP
text = "hello world"
numbers = [1, 2, 3, 4, 5]

print(text.upper())        # HELLO WORLD
print(text.split())        # ['hello', 'world']
print(numbers.append(6))   # None (modifies in place)
print(numbers)             # [1, 2, 3, 4, 5, 6]
print(len(numbers))        # 6
\`\`\`

---

## 📋 When to Use OOP?

### **Perfect for OOP**
- ✅ Large applications with complex relationships
- ✅ GUI applications (Tkinter, PyQt)
- ✅ Web frameworks (Django, Flask models)
- ✅ Game development
- ✅ Scientific computing with custom data structures
- ✅ API clients and data models

### **When Procedural Might Be Better**
- ❌ Simple scripts (< 100 lines)
- ❌ Data processing pipelines
- ❌ Performance-critical number crunching
- ❌ Quick automation tasks

---

## 🎯 OOP Key Takeaways

1. **Everything is an object** - even basic types and functions
2. **Dynamic by nature** - add attributes and methods at runtime
3. **Duck typing** - behavior matters more than inheritance
4. **Multiple inheritance** supported natively
5. **Simple syntax** with powerful capabilities
6. **Perfect for complex applications** requiring maintainability

Ready to dive deep into classes and objects? Let's explore the \`__init__\` method, instance attributes, and more OOP features! 🚀`,
};

