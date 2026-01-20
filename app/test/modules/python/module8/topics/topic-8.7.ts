import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_7: SubLesson = {
  id: "8.7",
  title: 'Importing Useful Modules',
  status: 'demo',
  content: "`# ðŸ“¦ Importing Useful Modules

Python has many built-in modules that add powerful features. Learn how to import and use the most useful ones!

---

## ðŸŽ¯ What are Modules?

Modules are files with Python code that add extra functionality. You can import them to use their functions and classes.

\`"\`\`python
# Import a module
import math

# Use functions from the module
result = math.sqrt(16)
print(result)  # 4.0
\`\`\`

---

## ðŸ”¢ Math Module

The math module provides mathematical functions and constants.

\`\`\`python
import math

# Basic functions
print(math.sqrt(25))    # Square root: 5.0
print(math.pow(2, 3))   # Power: 8.0
print(math.ceil(3.2))   # Round up: 4
print(math.floor(3.8))  # Round down: 3

# Constants
print(math.pi)          # Pi: 3.14159...
print(math.e)           # Euler's number: 2.718...

# Trigonometry
angle = math.radians(45)  # Convert degrees to radians
print(math.sin(angle))    # Sine
print(math.cos(angle))    # Cosine
\`\`\`

---

## ðŸŽ² Random Module

Generate random numbers and make random choices.

\`\`\`python
import random

# Random numbers
print(random.random())      # Random float 0.0 to 1.0
print(random.randint(1, 10)) # Random integer 1 to 10
print(random.uniform(1, 5)) # Random float 1.0 to 5.0

# Random choices
fruits = ["apple", "banana", "cherry", "date"]
print(random.choice(fruits))    # Pick one random item

# Shuffle a list
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)  # List in random order
\`\`\`

---

## ðŸ“„ JSON Module

Work with JSON data (JavaScript Object Notation).

\`\`\`python
import json

# Convert to JSON string
data = {"name": "Alice", "age": 25, "city": "NYC"}
json_string = json.dumps(data)
print(json_string)  # {"name": "Alice", "age": 25, "city": "NYC"}

# Convert from JSON string
json_data = '{"name": "Bob", "age": 30}'
parsed_data = json.loads(json_data)
print(parsed_data["name"])  # Bob

# Save to file
with open("data.json", "w") as file:
    json.dump(data, file)

# Load from file
with open("data.json", "r") as file:
    loaded_data = json.load(file)
    print(loaded_data)
\`\`\`

---

## ðŸ“ OS Module

Interact with the operating system and file system.

\`\`\`python
import os

# Get current directory
print(os.getcwd())  # Current working directory

# List files in directory
files = os.listdir(".")
print(files)  # List of files and folders

# Create directory
os.makedirs("my_folder", exist_ok=True)

# Check if file exists
if os.path.exists("myfile.txt"):
    print("File exists!")
else:
    print("File not found")

# Get file size
if os.path.exists("myfile.txt"):
    size = os.path.getsize("myfile.txt")
    print(f"File size: {size} bytes")
\`\`\`

---

## ðŸ“… DateTime Module

Work with dates and times.

\`\`\`python
import datetime

# Current date and time
now = datetime.datetime.now()
print(now)  # Current date and time

# Just the date
today = datetime.date.today()
print(today)  # Current date

# Create specific date
birthday = datetime.date(1990, 5, 15)
print(birthday)  # 1990-05-15

# Format dates
formatted = now.strftime("%Y-%m-%d %H:%M:%S")
print(formatted)  # 2024-01-15 14:30:25

# Calculate time difference
future_date = datetime.date(2025, 1, 1)
days_until = (future_date - today).days
print(f"Days until 2025: {days_until}")
\`\`\`

---

## ðŸ” Other Useful Modules

### Collections Module
\`\`\`python
import collections

# Count items
fruits = ["apple", "banana", "apple", "cherry", "banana"]
counter = collections.Counter(fruits)
print(counter)  # Counter({'apple': 2, 'banana': 2, 'cherry': 1})

# Named tuples
Point = collections.namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)  # 10 20
\`\`\`

### String Module
\`\`\`python
import string

# Useful string constants
print(string.ascii_letters)  # abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
print(string.digits)         # 0123456789
print(string.punctuation)    # !"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~

# Generate random password
import random
chars = string.ascii_letters + string.digits
password = ''.join(random.choice(chars) for _ in range(8))
print(password)  # Random 8-character password
\`\`\`

---

## ðŸŽ¨ Practical Examples

### **Simple Calculator with Math**
\`\`\`python
import math

def calculate_circle_area(radius):
    """Calculate area of a circle."""
    return math.pi * math.pow(radius, 2)

def calculate_distance(x1, y1, x2, y2):
    """Calculate distance between two points."""
    return math.sqrt(math.pow(x2-x1, 2) + math.pow(y2-y1, 2))

print(f"Circle area (r=5): {calculate_circle_area(5):.2f}")
print(f"Distance (0,0) to (3,4): {calculate_distance(0, 0, 3, 4)}")
\`\`\`

### **Save Game Data with JSON**
\`\`\`python
import json

# Game save data
game_data = {
    "player_name": "Hero",
    "level": 5,
    "score": 1250,
    "inventory": ["sword", "shield", "potion"],
    "position": {"x": 10, "y": 20}
}

# Save game
with open("savegame.json", "w") as file:
    json.dump(game_data, file, indent=2)

print("Game saved!")

# Load game
with open("savegame.json", "r") as file:
    loaded_game = json.load(file)

print(f"Welcome back, {loaded_game['player_name']}!")
print(f"Level: {loaded_game['level']}, Score: {loaded_game['score']}")
\`\`\`

---

## ðŸš€ Key Takeaways

1. **import module_name** - Import entire module
2. **from module import function** - Import specific functions
3. **import module as alias** - Import with shorter name
4. **Math module** - Advanced math functions and constants
5. **Random module** - Generate random numbers and choices
6. **JSON module** - Work with JSON data format
7. **OS module** - Interact with operating system
8. **DateTime module** - Work with dates and times

**Importing modules gives you access to powerful tools that extend Python's capabilities! ðŸ“¦**`
};


