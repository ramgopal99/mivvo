import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_5: SubLesson = {
  id: "9.5",
  title: 'Encapsulation and Abstraction',
  status: 'demo',
  content: "`# ðŸ”’ Encapsulation and Abstraction

The approach to encapsulation and abstraction emphasizes **convention over enforcement**, using naming conventions and modules to hide complexity while maintaining flexibility. Trust developers to use the tools wisely!

---

## ðŸ” Encapsulation: Convention Over Enforcement

### **Name Mangling for Privacy**
\`"\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private attribute (name mangling)
        self._account_type = "savings"  # Protected (convention only)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return self.__balance

    def __calculate_fees(self):  # Private method
        return self.__balance * 0.01

account = BankAccount(1000)
print(account.deposit(500))        # âœ… Works
# print(account.__balance)         # âŒ AttributeError
print(account._BankAccount__balance)  # âœ… Access via name mangling (not recommended)
\`\`\`

### **Properties for Controlled Access**
\`\`\`python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature too low!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return (self._celsius * 9/5) + 32

temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0
temp.celsius = 30        # Uses setter
# temp.celsius = -300    # Raises ValueError
\`\`\`

---

## ðŸŽ­ Abstraction: Hiding Complexity

### **Abstract Base Classes**
\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand):
        self.brand = brand

    @abstractmethod
    def move(self):
        """Must be implemented by subclasses"""
        pass

    def get_brand(self):
        return self.brand

class Car(Vehicle):
    def move(self):
        return "Driving on roads"

class Boat(Vehicle):
    def move(self):
        return "Sailing on water"

# vehicle = Vehicle("Generic")  # TypeError: Can't instantiate abstract class
car = Car("Toyota")
print(car.move())  # Driving on roads
\`\`\`

### **Module-Level Abstraction**
\`\`\`python
# database.py - Abstract away database details
class Database:
    def __init__(self, connection_string):
        self._connection = self._connect(connection_string)

    def save(self, data):
        """Public interface - hides implementation details"""
        self._validate_data(data)
        self._execute_query("INSERT", data)
        self._log_operation("save", data)

    def _connect(self, conn_str):  # Private implementation
        # Complex connection logic hidden
        return f"Connected to {conn_str}"

    def _validate_data(self, data):  # Private implementation
        pass

    def _execute_query(self, operation, data):  # Private implementation
        pass

    def _log_operation(self, op, data):  # Private implementation
        print(f"Logged: {op} operation")

# Users only see the simple save() method
db = Database("sqlite:///data.db")
db.save({"name": "Alice", "age": 30})
\`\`\`

---

## ðŸ“¦ Modules as Abstraction Layers

### **Creating Clean APIs**
\`\`\`python
# mymodule.py
def process_data(data):
    """Clean public API - hides all complexity"""
    _validate_input(data)
    result = _transform_data(data)
    _save_to_cache(result)
    return result

def _validate_input(data):  # Private function
    pass

def _transform_data(data):  # Private function
    return data.upper()

def _save_to_cache(result):  # Private function
    pass

# Usage - only sees the clean interface
from mymodule import process_data
result = process_data("hello")  # Simple, abstracted interface
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Convention over enforcement** for encapsulation
2. **Name mangling** provides privacy
3. **Properties** enable controlled attribute access
4. **Abstract base classes** define contracts
5. **Modules** provide abstraction layers
6. **Trust developers** to follow conventions

The philosophy: *"We're all consenting adults here"* - use the tools wisely! ðŸš€
`,
};


