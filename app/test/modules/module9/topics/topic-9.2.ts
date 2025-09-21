import { SubLesson } from '../../../data/lessonsData';

export const topic_9_2: SubLesson = {
  id: 9.2,
  title: 'Classes and Objects',
  status: 'demo',
  content: `# 🏗️ Classes and Objects

Classes and objects are the core of Object-Oriented Programming. Let's explore how to define blueprints and create instances!

---

## 🎯 Class Definition

A **class** is a blueprint for creating objects. Classes are dynamic and flexible, supporting features like multiple inheritance and dynamic attribute addition.

### **Basic Class Syntax**
\`\`\`python
class ClassName:
    """Optional class documentation string"""

    # Class attributes (shared by all instances)
    class_attribute = "shared_value"

    def __init__(self, parameters):
        """Constructor method - called when creating instances"""
        # Instance attributes (unique to each instance)
        self.instance_attribute = value

    def instance_method(self, parameters):
        """Instance method - operates on instance data"""
        return result

    @classmethod
    def class_method(cls, parameters):
        """Class method - operates on class data"""
        return result

    @staticmethod
    def static_method(parameters):
        """Static method - doesn't access instance or class data"""
        return result
\`\`\`

---

## 📝 The Constructor

### **Purpose of \`__init__\`**
- Initializes new instances when they're created
- Sets up initial state for the object
- Called automatically when you create an instance
- Similar to constructors in other languages

### **Constructor Patterns**
\`\`\`python
from datetime import datetime

class Person:
    def __init__(self, name, age=0):
        self.name = name
        self.age = age
        self.created_at = datetime.now()  # Dynamic initialization

    def __str__(self):
        return f"{self.name}, age {self.age}"

# Creating instances
person1 = Person("Alice", 30)  # Both arguments
person2 = Person("Bob")        # Uses default age=0
\`\`\`

---

## 🎯 Creating Objects

### **Object Creation Process**
1. Memory is allocated for the new object
2. The object's creation method sets up the instance
3. The initialization method sets up the instance attributes
4. Reference to the object is returned

\`\`\`python
class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
        self.mileage = 0
        self.is_running = False

    def start(self):
        self.is_running = True
        return f"{self.make} {self.model} started!"

    def drive(self, miles):
        if self.is_running:
            self.mileage += miles
            return f"Drove {miles} miles. Total mileage: {self.mileage}"
        return "Car is not running!"

# Object instantiation
my_car = Car("Toyota", "Camry", 2020)
your_car = Car("Honda", "Civic", 2019)

print(my_car.start())        # Toyota Camry started!
print(my_car.drive(50))      # Drove 50 miles. Total mileage: 50
print(your_car.drive(30))    # Car is not running!
\`\`\`

---

## 🔍 The Instance Parameter

### **Understanding \`self\`**
- Refers to the current instance of the class
- **Always the first parameter** in instance methods
- Used to access instance attributes and methods
- Similar to \`this\` in other languages but must be explicit

### **Why \`self\` is Required**
\`\`\`python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1  # Accesses this instance's count

    def get_count(self):
        return self.count

counter1 = Counter()
counter2 = Counter()

counter1.increment()
counter1.increment()
counter2.increment()

print(counter1.get_count())  # 2
print(counter2.get_count())  # 1
\`\`\`

---

## 📦 Instance vs Class Members

### **Instance Attributes**
- Unique to each object instance
- Created in \`__init__\` or dynamically
- Accessed via \`self.attribute\`

### **Class Attributes**
- Shared among all instances of the class
- Defined directly in the class body
- Can be accessed via class name or instance

\`\`\`python
class Employee:
    # Class attributes (shared)
    company_name = "Tech Corp"
    total_employees = 0

    def __init__(self, name, salary):
        # Instance attributes (unique)
        self.name = name
        self.salary = salary
        Employee.total_employees += 1  # Modify class attribute

# Usage
emp1 = Employee("Alice", 75000)
emp2 = Employee("Bob", 80000)

print(Employee.total_employees)  # 2 (class attribute)
print(emp1.company_name)         # Tech Corp (class attribute)
print(emp1.name)                 # Alice (instance attribute)

# Dynamic attribute addition
emp1.bonus = 5000  # Only emp1 has this attribute
# print(emp2.bonus)  # AttributeError
\`\`\`

---

## 🔧 Method Types

### **Instance Methods**
- Most common type of method
- Operate on individual instance data
- First parameter is \`self\`

### **Class Methods**
- Operate on class-level data
- Use \`@classmethod\` decorator
- First parameter is \`cls\` (convention)

### **Static Methods**
- Don't access instance or class data
- Use \`@staticmethod\` decorator
- No implicit first parameter

\`\`\`python
class BankAccount:
    interest_rate = 0.05  # Class attribute

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):  # Instance method
        self.balance += amount
        return self.balance

    @classmethod
    def set_interest_rate(cls, rate):  # Class method
        cls.interest_rate = rate

    @staticmethod
    def validate_amount(amount):  # Static method
        return amount > 0 and amount <= 10000

# Usage
account = BankAccount("Alice", 1000)

# Instance method
print(account.deposit(500))  # 1500

# Class method
BankAccount.set_interest_rate(0.06)
print(BankAccount.interest_rate)  # 0.06

# Static method
print(BankAccount.validate_amount(500))   # True
print(BankAccount.validate_amount(15000)) # False
\`\`\`

---

## 🏭 Flexible Initialization

### **Default Parameters**
\`\`\`python
class Rectangle:
    def __init__(self, width=10, height=None):
        self.width = width
        self.height = height if height is not None else width  # Square if height not provided

rect1 = Rectangle(5, 8)      # width=5, height=8
rect2 = Rectangle(5)         # width=5, height=5 (square)
rect3 = Rectangle()          # width=10, height=10 (square)
\`\`\`

### **Multiple Initialization Patterns**
\`\`\`python
class Person:
    def __init__(self, name=None, age=None, email=None):
        self.name = name
        self.age = age
        self.email = email

    @classmethod
    def from_dict(cls, data_dict):
        """Alternative constructor from dictionary"""
        return cls(data_dict.get('name'), data_dict.get('age'), data_dict.get('email'))

    @classmethod
    def create_anonymous(cls):
        """Factory method for anonymous person"""
        return cls("Anonymous")

# Different ways to create Person objects
person1 = Person("Alice", 30, "alice@email.com")
person2 = Person.from_dict({'name': 'Bob', 'age': 25})
person3 = Person.create_anonymous()
\`\`\`

---

## 🔍 Special Methods

### **Common Dunder Methods**
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """String representation for print()"""
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        """Detailed representation for debugging"""
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):
        """Addition operator overloading"""
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        """Equality comparison"""
        return self.x == other.x and self.y == other.y

    def __len__(self):
        """Length of the vector (magnitude)"""
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)           # Vector(3, 4)
print(repr(v1))     # Vector(x=3, y=4)
print(v1 + v2)      # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 5
\`\`\`

---

## 🎯 Key Takeaways

1. **Classes are dynamic** - attributes can be added at runtime
2. **Instance parameter is explicit** - always the first parameter in instance methods
3. **Instance attributes** are unique to each object
4. **Class attributes** are shared among all instances
5. **Multiple method types** - instance, class, and static methods
6. **Special methods** enable operator overloading and custom behavior

Ready to explore inheritance? Let's see how classes can inherit and extend functionality from other classes! 🚀`,
};
