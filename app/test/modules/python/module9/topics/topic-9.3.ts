import { SubLesson } from '../../../data/lessonsData';

export const topic_9_3: SubLesson = {
  id: 9.3,
  title: 'Inheritance',
  status: 'demo',
  content: `# 🏛️ Inheritance

Inheritance allows classes to inherit properties and methods from other classes, promoting code reuse and establishing hierarchical relationships!

---

## 🎯 Inheritance Basics

**Inheritance** allows a class (child/subclass) to inherit attributes and methods from another class (parent/superclass). It supports both single and multiple inheritance, creating "is-a" relationships.

### **Key Inheritance Features**
- **Multiple inheritance** supported natively
- **Method Resolution Order (MRO)** for complex hierarchies
- **Clean parent method calls**
- **Flexible inheritance patterns**

---

## 📝 Basic Inheritance Syntax

### **Single Inheritance**
\`\`\`python
class ParentClass:
    """Parent class definition"""
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello from {self.name}"

class ChildClass(ParentClass):
    """Child class inherits from ParentClass"""
    def __init__(self, name, age):
        super().__init__(name)  # Call parent constructor
        self.age = age          # Add child-specific attribute

    def introduce(self):
        return f"{self.greet()}, I am {self.age} years old"

# Usage
child = ChildClass("Alice", 25)
print(child.introduce())  # Hello from Alice, I am 25 years old
print(child.greet())      # Hello from Alice (inherited method)
\`\`\`

---

## 🔄 The \`super()\` Function

### **Purpose of \`super()\`**
- Calls methods from parent classes
- Enables proper method resolution order
- Allows cooperative inheritance in multiple inheritance

### **Common Patterns**
\`\`\`python
class Animal:
    def __init__(self, species):
        self.species = species

    def make_sound(self):
        return "Some sound"

class Dog(Animal):
    def __init__(self, species, breed):
        super().__init__(species)  # Call parent __init__
        self.breed = breed

    def make_sound(self):
        parent_sound = super().make_sound()  # Call parent method
        return f"{parent_sound} - Woof! I am a {self.breed}"

dog = Dog("Canine", "Golden Retriever")
print(dog.make_sound())  # Some sound - Woof! I am a Golden Retriever
\`\`\`

---

## 🎭 Multiple Inheritance

### **Multiple Inheritance**
Allows classes to inherit from multiple parent classes, creating complex but powerful hierarchies.

\`\`\`python
class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

    def start_engine(self):
        return f"Engine with {self.horsepower} HP started"

class Wheels:
    def __init__(self, num_wheels):
        self.num_wheels = num_wheels

    def drive(self):
        return f"Driving on {self.num_wheels} wheels"

class Car(Engine, Wheels):  # Multiple inheritance
    def __init__(self, horsepower, num_wheels, model):
        Engine.__init__(self, horsepower)    # Explicit parent calls
        Wheels.__init__(self, num_wheels)
        self.model = model

    def drive(self):
        engine_status = self.start_engine()
        wheel_action = Wheels.drive(self)  # Explicit parent call
        return f"{self.model}: {engine_status}. {wheel_action}"

my_car = Car(200, 4, "Sports Car")
print(my_car.drive())
\`\`\`

---

## 🔍 Method Resolution Order (MRO)

### **Understanding MRO**
When a method is called, Python follows the **Method Resolution Order** to find the correct implementation. Use \`ClassName.mro()\` to see the order.

\`\`\`python
class A:
    def method(self):
        return "Method from A"

class B:
    def method(self):
        return "Method from B"

class C(A, B):  # A comes before B
    pass

class D(B, A):  # B comes before A
    pass

c = C()
d = D()

print(c.method())  # Method from A
print(d.method())  # Method from B

print(C.mro())  # [<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class 'object'>]
print(D.mro())  # [<class '__main__.D'>, <class '__main__.B'>, <class '__main__.A'>, <class 'object'>]
\`\`\`

---

## 🎯 Method Overriding

### **Overriding Parent Methods**
Child classes can provide their own implementation of inherited methods.

\`\`\`python
class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        raise NotImplementedError("Subclass must implement area method")

    def perimeter(self):
        raise NotImplementedError("Subclass must implement perimeter method")

class Rectangle(Shape):
    def __init__(self, name, width, height):
        super().__init__(name)
        self.width = width
        self.height = height

    def area(self):  # Override parent method
        return self.width * self.height

    def perimeter(self):  # Override parent method
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, name, radius):
        super().__init__(name)
        self.radius = radius

    def area(self):  # Override parent method
        import math
        return math.pi * self.radius ** 2

    def perimeter(self):  # Override parent method
        import math
        return 2 * math.pi * self.radius

shapes = [Rectangle("Rect", 4, 5), Circle("Circ", 3)]

for shape in shapes:
    print(f"{shape.name}: Area={shape.area():.2f}, Perimeter={shape.perimeter():.2f}")
\`\`\`

---

## 🏗️ Advanced Patterns

### **Mixin Classes**
Mixins are classes that provide specific functionality and are meant to be combined with other classes.

\`\`\`python
class LoggerMixin:
    def log(self, message):
        print(f"[{self.__class__.__name__}]: {message}")

class SerializerMixin:
    def to_dict(self):
        return {key: value for key, value in self.__dict__.items()
                if not key.startswith('_')}

class User(LoggerMixin, SerializerMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email

user = User("Alice", "alice@example.com")
user.log("User created")          # From LoggerMixin
print(user.to_dict())             # From SerializerMixin
\`\`\`

### **Abstract Base Classes**
Use \`abc\` module to create abstract classes that cannot be instantiated directly.

\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    @abstractmethod
    def move(self):
        """Must be implemented by subclasses"""
        pass

    def get_info(self):
        return f"{self.brand} {self.model}"

class Bicycle(Vehicle):
    def move(self):
        return "Pedaling the bicycle"

class Car(Vehicle):
    def move(self):
        return "Driving the car"

# vehicle = Vehicle("Generic", "Model")  # TypeError: Can't instantiate abstract class

bike = Bicycle("Trek", "FX 3")
car = Car("Toyota", "Camry")

print(f"{bike.get_info()}: {bike.move()}")
print(f"{car.get_info()}: {car.move()}")
\`\`\`

---

## 🔒 Access Control in Inheritance

### **Public Members**
Accessible everywhere, including child classes.

### **Protected Members** (Convention)
Single underscore prefix - accessible in child classes but considered internal.

### **Private Members** (Name Mangling)
Double underscore prefix - name mangling makes them harder to access from outside.

\`\`\`python
class Parent:
    def __init__(self):
        self.public = "public"
        self._protected = "protected"      # Convention: internal use
        self.__private = "private"         # Name mangling: _Parent__private

class Child(Parent):
    def show_access(self):
        print(self.public)      # ✅ Accessible
        print(self._protected)  # ✅ Accessible (but should be careful)
        # print(self.__private) # ❌ AttributeError

child = Child()
child.show_access()
# But can still access private via name mangling
print(child._Parent__private)  # "private" - not recommended
\`\`\`

---

## 🎯 Inheritance Best Practices

### **Composition vs Inheritance**
\`\`\`python
# Inheritance (is-a relationship)
class ElectricCar(Car):
    def __init__(self, brand, model, battery_capacity):
        super().__init__(brand, model)
        self.battery = Battery(battery_capacity)  # Composition

# Composition (has-a relationship)
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        self.engine = Engine()  # Car has-an Engine
\`\`\`

### **Avoid Deep Inheritance Hierarchies**
\`\`\`python
# Avoid this (too deep)
class Animal:
    pass

class Mammal(Animal):
    pass

class Carnivore(Mammal):
    pass

class Dog(Carnivore):
    pass

# Prefer this (flatter hierarchy)
class Animal:
    pass

class Dog(Animal):
    def __init__(self):
        self.has_fur = True
        self.is_carnivore = True
\`\`\`

---

## 🔍 Inspecting Inheritance

### **Built-in Functions for Inheritance**
\`\`\`python
class A:
    pass

class B(A):
    pass

class C(B):
    pass

# Check inheritance
print(issubclass(B, A))  # True
print(issubclass(C, A))  # True

# Check instance relationships
b = B()
print(isinstance(b, A))  # True
print(isinstance(b, B))  # True

# Get MRO
print(C.mro())  # [<class '__main__.C'>, <class '__main__.B'>, <class '__main__.A'>, <class 'object'>]

# Get parent classes
print(C.__bases__)  # (<class '__main__.B'>,)
\`\`\`

---

## 🎯 Key Takeaways

1. **Supports both single and multiple inheritance**
2. **Clean parent method calls** with \`super()\`
3. **Method Resolution Order (MRO)** handles method lookup in complex hierarchies
4. **Method overriding** allows child classes to customize behavior
5. **Abstract base classes** define interfaces that must be implemented
6. **Mixin classes** provide reusable functionality
7. **Name mangling** provides a form of privacy
8. **Prefer composition over inheritance** when relationship isn't clearly "is-a"

Ready to explore polymorphism? Let's see how duck typing enables flexible object interactions! 🚀`,
};
