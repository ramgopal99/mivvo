import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_6: SubLesson = {
  id: "9.6",
  title: 'OOP Best Practices',
  status: 'demo',
  content: `# 🏗️ OOP Best Practices

OOP has its own unique approach to design. While SOLID principles apply, the philosophy emphasizes practicality, readability, and clean code. Let's explore best practices!

---

## 🎯 SOLID Principles

### **Single Responsibility Principle (SRP)**
\`\`\`python
# ✅ Good: Each class has one clear purpose
class UserRepository:
    def save(self, user): pass
    def find_by_id(self, user_id): pass

class UserService:
    def create_user(self, data): pass
    def update_user(self, user_id, data): pass

# ❌ Bad: One class doing too many things
class UserManager:
    def save_to_db(self, user): pass
    def send_email(self, user): pass
    def generate_report(self): pass
    def validate_input(self, data): pass
\`\`\`

### **Open/Closed Principle (OCP)**
\`\`\`python
# ✅ Good: Extend without modifying
class Shape:
    def area(self): raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14 * self.r ** 2

# Adding new shapes doesn't break existing code
\`\`\`

---

## 🐍 Best Practices

### **Use Duck Typing Over Inheritance**
\`\`\`python
# ✅ Good: Duck typing
def process_data(data):
    if hasattr(data, 'read'):
        return data.read()  # File-like object
    elif hasattr(data, '__iter__'):
        return list(data)   # Iterable object
    else:
        return str(data)    # Fallback

# Works with files, lists, strings, etc.
process_data(open('file.txt'))
process_data([1, 2, 3])
process_data("hello")
\`\`\`

### **Properties Over Getters/Setters**
\`\`\`python
# ✅ Good: Use properties
class Person:
    def __init__(self, name):
        self._name = name

    @property
    def name(self):
        return self._name.title()

    @name.setter
    def name(self, value):
        if len(value) < 2:
            raise ValueError("Name too short")
        self._name = value

# Usage feels natural
person = Person("john doe")
print(person.name)  # John Doe
person.name = "jane smith"
\`\`\`

### **Context Managers for Resources**
\`\`\`python
# ✅ Good: Context managers
class DatabaseConnection:
    def __init__(self, conn_string):
        self.conn_string = conn_string

    def __enter__(self):
        self.connection = self._connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()

# Usage
with DatabaseConnection("sqlite:///db") as db:
    db.execute("SELECT * FROM users")
# Connection automatically closed
\`\`\`

### **Composition Over Inheritance**
\`\`\`python
# ✅ Pythonic: Prefer composition
class Engine:
    def start(self): return "Engine started"

class Wheels:
    def roll(self): return "Wheels rolling"

class Car:
    def __init__(self):
        self.engine = Engine()
        self.wheels = Wheels()

    def drive(self):
        return f"{self.engine.start()}. {self.wheels.roll()}"

# More flexible than deep inheritance hierarchies
\`\`\`

---

## 📋 Python OOP Guidelines

### **Class Design**
1. **Keep classes small and focused**
2. **Use descriptive names** (not abbreviations)
3. **Document with docstrings**
4. **Use \`self\` consistently**

### **Method Design**
1. **Methods should do one thing well**
2. **Use descriptive names** starting with verbs
3. **Keep parameters minimal** (use \*args, \*\*kwargs when needed)
4. **Return meaningful values**

### **Inheritance Guidelines**
1. **Use inheritance for "is-a" relationships**
2. **Prefer duck typing over strict inheritance**
3. **Keep inheritance hierarchies shallow**
4. **Use \`super()\` properly in multiple inheritance**

---

## 🔍 Python OOP Patterns

### **Factory Pattern**
\`\`\`python
class Animal:
    @staticmethod
    def create(animal_type, name):
        if animal_type == "dog":
            return Dog(name)
        elif animal_type == "cat":
            return Cat(name)
        else:
            raise ValueError(f"Unknown animal: {animal_type}")

# Usage
dog = Animal.create("dog", "Buddy")
cat = Animal.create("cat", "Whiskers")
\`\`\`

### **Singleton Pattern (Pythonic)**
\`\`\`python
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Usage
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True
\`\`\`

### **Mixin Pattern**
\`\`\`python
class LoggerMixin:
    def log(self, message):
        print(f"[{self.__class__.__name__}]: {message}")

class SerializerMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class User(LoggerMixin, SerializerMixin):
    def __init__(self, name, email):
        self.name = name
        self.email = email

user = User("Alice", "alice@example.com")
user.log("User created")
print(user.to_json())
\`\`\`

---

## ⚠️ Common Python OOP Mistakes

### **Overusing Inheritance**
\`\`\`python
# ❌ Bad: Deep inheritance for simple needs
class Animal:
    def __init__(self, name): self.name = name

class Mammal(Animal):
    def has_fur(self): return True

class Dog(Mammal):
    def speak(self): return "Woof"

# ✅ Better: Simple class with attributes
class Dog:
    def __init__(self, name):
        self.name = name
        self.has_fur = True
        self.sound = "Woof"

    def speak(self):
        return self.sound
\`\`\`

### **Ignoring Duck Typing**
\`\`\`python
# ❌ Bad: Unnecessarily strict type checking
def process_file(file):
    if not isinstance(file, File):
        raise TypeError("Must be a File object")
    return file.read()

# ✅ Better: Duck typing
def process_file(file):
    if not hasattr(file, 'read'):
        raise TypeError("Object must have read method")
    return file.read()
\`\`\`

### **Not Using Special Methods**
\`\`\`python
# ❌ Bad: Manual implementation
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def add(self, other):
        return Vector(self.x + other.x, self.y + other.y)

# ✅ Better: Use special methods
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):  # Enables v1 + v2
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):  # Enables print(v)
        return f"Vector({self.x}, {self.y})"
\`\`\`

---

## 🎯 Python OOP Key Takeaways

1. **Duck typing** is more Pythonic than strict inheritance
2. **Properties** provide cleaner interfaces than getters/setters
3. **Composition** is often better than deep inheritance
4. **Special methods** make classes more intuitive
5. **Context managers** ensure proper resource handling
6. **Keep it simple** - Python values readability over complexity

**Remember:** "Simple is better than complex. Readability counts." Focus on clean, maintainable code! 🚀\`;
\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def calculate_pay(self):
        return self.salary * 1.1  # 10% bonus

    def save_to_database(self):
        # Database logic
        print(f"Saving {self.name} to database")

    def generate_report(self):
        # Report generation logic
        return f"Employee Report: {self.name}, Salary: {self.salary}"

    def send_email(self, message):
        # Email sending logic
        print(f"Sending email to {self.name}: {message}")
\`\`\`

### **✅ Good Example (Follows SRP)**
\`\`\`python
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class PayCalculator:
    def calculate_pay(self, employee):
        return employee.salary * 1.1

class EmployeeRepository:
    def save(self, employee):
        print(f"Saving {employee.name} to database")

class ReportGenerator:
    def generate_employee_report(self, employee):
        return f"Employee Report: {employee.name}, Salary: {employee.salary}"

class EmailService:
    def send_email(self, recipient, message):
        print(f"Sending email to {recipient}: {message}")
\`\`\`

---

## 🔓 Open/Closed Principle (OCP)

**Software entities should be open for extension but closed for modification**.

### **❌ Bad Example (Violates OCP)**
\`\`\`python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

class AreaCalculator:
    def calculate_area(self, shapes):
        total = 0
        for shape in shapes:
            if isinstance(shape, Rectangle):
                total += shape.width * shape.height
            # Adding a new shape requires modifying this method!
        return total
\`\`\`

### **✅ Good Example (Follows OCP)**
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

class AreaCalculator:
    def calculate_area(self, shapes):
        return sum(shape.area() for shape in shapes)

# Adding a new shape is easy - just implement the Shape interface!
\`\`\`

---

## 🔄 Liskov Substitution Principle (LSP)

**Subtypes must be substitutable for their base types** - derived classes should be able to replace their base classes without altering program correctness.

### **❌ Bad Example (Violates LSP)**
\`\`\`python
class Bird:
    def fly(self):
        return "Flying"

class Ostrich(Bird):
    def fly(self):
        raise NotImplementedError("Ostriches can't fly!")

# This breaks LSP - you can't substitute Ostrich for Bird
def make_bird_fly(bird):
    return bird.fly()

ostrich = Ostrich()
# make_bird_fly(ostrich)  # Runtime error!
\`\`\`

### **✅ Good Example (Follows LSP)**
\`\`\`python
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        return "Flying"

class NonFlyingBird(Bird):
    pass

class Sparrow(FlyingBird):
    def fly(self):
        return "Sparrow flying"

class Ostrich(NonFlyingBird):
    def run(self):
        return "Ostrich running fast"

# Now substitution works correctly
def make_bird_fly(bird):
    if isinstance(bird, FlyingBird):
        return bird.fly()
    return "This bird can't fly"

sparrow = Sparrow()
ostrich = Ostrich()

print(make_bird_fly(sparrow))  # Sparrow flying
print(make_bird_fly(ostrich))  # This bird can't fly
\`\`\`

---

## 🔌 Interface Segregation Principle (ISP)

**Clients should not be forced to depend on interfaces they don't use** - create specific interfaces rather than general-purpose ones.

### **❌ Bad Example (Violates ISP)**
\`\`\`python
class MultiFunctionPrinter:
    def print(self, document):
        print(f"Printing: {document}")

    def scan(self, document):
        print(f"Scanning: {document}")

    def fax(self, document):
        print(f"Faxing: {document}")

class SimplePrinter:
    def __init__(self):
        self.printer = MultiFunctionPrinter()

    def print_document(self, document):
        self.printer.print(document)
        # But SimplePrinter doesn't need scan or fax methods!

    def scan_document(self, document):
        # This method shouldn't exist in SimplePrinter!
        raise NotImplementedError("Simple printer can't scan")
\`\`\`

### **✅ Good Example (Follows ISP)**
\`\`\`python
from abc import ABC, abstractmethod

class Printer(ABC):
    @abstractmethod
    def print(self, document):
        pass

class Scanner(ABC):
    @abstractmethod
    def scan(self, document):
        pass

class Fax(ABC):
    @abstractmethod
    def fax(self, document):
        pass

class SimplePrinter(Printer):
    def print(self, document):
        print(f"Printing: {document}")

class MultiFunctionDevice(Printer, Scanner, Fax):
    def print(self, document):
        print(f"Printing: {document}")

    def scan(self, document):
        print(f"Scanning: {document}")

    def fax(self, document):
        print(f"Faxing: {document}")

# Usage
simple_printer = SimplePrinter()
mfd = MultiFunctionDevice()

simple_printer.print("Document")  # ✅ Only has print method
mfd.print("Document")             # ✅ Has all methods
mfd.scan("Document")              # ✅ Has all methods
\`\`\`

---

## 🔀 Dependency Inversion Principle (DIP)

**High-level modules should not depend on low-level modules. Both should depend on abstractions.**

### **❌ Bad Example (Violates DIP)**
\`\`\`python
class MySQLDatabase:
    def connect(self):
        return "Connected to MySQL"

    def query(self, sql):
        return f"Executing: {sql}"

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Direct dependency

    def get_user(self, user_id):
        connection = self.db.connect()
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")

# UserService is tightly coupled to MySQLDatabase
\`\`\`

### **✅ Good Example (Follows DIP)**
\`\`\`python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

class MySQLDatabase(Database):
    def connect(self):
        return "Connected to MySQL"

    def query(self, sql):
        return f"MySQL: {sql}"

class PostgreSQLDatabase(Database):
    def connect(self):
        return "Connected to PostgreSQL"

    def query(self, sql):
        return f"PostgreSQL: {sql}"

class UserService:
    def __init__(self, database: Database):
        self.db = database  # Depends on abstraction

    def get_user(self, user_id):
        connection = self.db.connect()
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")

# Usage with dependency injection
mysql_service = UserService(MySQLDatabase())
postgres_service = UserService(PostgreSQLDatabase())

print(mysql_service.get_user(1))
print(postgres_service.get_user(1))
\`\`\`

---

## 🎯 Other Important Design Principles

### **DRY (Don't Repeat Yourself)**
Avoid code duplication by abstracting common functionality.

### **KISS (Keep It Simple, Stupid)**
Prefer simple solutions over complex ones.

### **YAGNI (You Ain't Gonna Need It)**
Don't implement features until they're actually needed.

### **Composition over Inheritance**
Favor object composition over class inheritance when possible.

---

## 🏗️ Design Patterns Overview

### **Creational Patterns**
- **Singleton**: Ensure only one instance exists
- **Factory**: Create objects without specifying exact classes
- **Builder**: Construct complex objects step by step

### **Structural Patterns**
- **Adapter**: Convert interface of a class into another interface
- **Decorator**: Add behavior to objects dynamically
- **Facade**: Provide simplified interface to complex system

### **Behavioral Patterns**
- **Observer**: Define one-to-many dependency between objects
- **Strategy**: Define family of algorithms and make them interchangeable
- **Command**: Encapsulate request as an object

---

## 📊 Code Quality Metrics

### **Cyclomatic Complexity**
- Measure of code complexity
- Lower is better (aim for < 10)

### **Coupling vs Cohesion**
- **High Cohesion**: Related responsibilities together
- **Low Coupling**: Minimal dependencies between classes

### **Testability**
- Code should be easily testable
- Dependency injection helps with testing

---

## 🎯 Best Practices Summary

### **Class Design**
1. **Small, focused classes** with single responsibility
2. **Meaningful names** that describe purpose
3. **Proper encapsulation** with appropriate access modifiers

### **Method Design**
1. **Short methods** (5-15 lines ideal)
2. **Descriptive names** using verbs
3. **Minimal parameters** (0-3 parameters ideal)

### **Inheritance Guidelines**
1. **Use inheritance** for "is-a" relationships
2. **Prefer composition** for "has-a" relationships
3. **Keep inheritance hierarchies shallow**

### **Error Handling**
1. **Use exceptions** appropriately
2. **Don't use exceptions for control flow**
3. **Provide meaningful error messages**

---

## 🏆 Key Takeaways

1. **SOLID principles** guide good OOP design
2. **Single Responsibility** keeps classes focused
3. **Open/Closed** enables extension without modification
4. **Liskov Substitution** ensures proper inheritance
5. **Interface Segregation** prevents bloated interfaces
6. **Dependency Inversion** reduces coupling
7. **Design patterns** solve common problems
8. **Quality metrics** help assess code health

Congratulations! You've completed the comprehensive OOP concepts course. These principles will help you write better, more maintainable code! 🎉`
};

