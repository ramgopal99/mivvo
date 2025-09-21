import { SubLesson } from '../../../data/lessonsData';

export const topic_6_3: SubLesson = {
  id: 6.3,
  title: 'Accessing Dictionary Elements',
  status: 'demo',
  content: `# 🎯 Accessing Dictionary Elements

Accessing dictionary values is done through keys, not indices. Let's learn all the ways to get data from dictionaries!

---

## 📍 Basic Access with Keys

### **Using Square Brackets []**
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

print(person["name"])   # Alice
print(person["age"])    # 25
print(person["city"])   # New York
\`\`\`

---

## 🔄 Safe Access with get()

### **Avoid KeyError Exceptions**
\`\`\`python
person = {"name": "Alice", "age": 25}

# Safe access - returns None if key doesn't exist
print(person.get("name"))      # Alice
print(person.get("salary"))    # None
print(person.get("city", "Unknown"))  # Unknown (default value)
\`\`\`

---

## 🔍 Checking Key Existence

### **Using 'in' Operator**
\`\`\`python
person = {"name": "Alice", "age": 25}

print("name" in person)      # True
print("salary" in person)    # False
print("city" not in person)  # True
\`\`\`

---

## 📊 Getting All Keys, Values, and Items

### **Dictionary Views**
\`\`\`python
person = {"name": "Alice", "age": 25, "city": "New York"}

# Get all keys
print(list(person.keys()))      # ['name', 'age', 'city']

# Get all values
print(list(person.values()))    # ['Alice', 25, 'New York']

# Get all key-value pairs
print(list(person.items()))     # [('name', 'Alice'), ('age', 25), ('city', 'New York')]
\`\`\`

---

## 🔄 Iterating Through Dictionaries

### **Loop Through Keys, Values, or Items**
\`\`\`python
student = {
    "name": "Alice",
    "age": 20,
    "grades": [85, 92, 88]
}

# Iterate through keys
print("Keys:")
for key in student:
    print(f"  {key}")

# Iterate through key-value pairs
print("\nKey-Value pairs:")
for key, value in student.items():
    print(f"  {key}: {value}")

# Iterate through values only
print("\nValues:")
for value in student.values():
    print(f"  {value}")
\`\`\`

---

## 🎨 Practical Examples

### **Data Processing**
\`\`\`python
# Student database
students = {
    "alice123": {"name": "Alice", "grade": 95},
    "bob456": {"name": "Bob", "grade": 87},
    "charlie789": {"name": "Charlie", "grade": 92}
}

# Find student by ID
student_id = "alice123"
if student_id in students:
    student = students[student_id]
    print(f"Name: {student['name']}, Grade: {student['grade']}")
else:
    print("Student not found")

# Calculate average grade
grades = [student["grade"] for student in students.values()]
average = sum(grades) / len(grades)
print(f"Average grade: {average:.1f}")

# Find highest grade
highest = max(students.items(), key=lambda x: x[1]["grade"])
print(f"Top student: {highest[1]['name']} with {highest[1]['grade']}")
\`\`\`

### **Configuration Management**
\`\`\`python
# Application settings
config = {
    "debug": True,
    "max_users": 100,
    "timeout": 30,
    "database": {
        "host": "localhost",
        "port": 5432,
        "name": "myapp"
    }
}

# Safe access with defaults
debug_mode = config.get("debug", False)
max_users = config.get("max_users", 50)
log_level = config.get("log_level", "INFO")  # Key doesn't exist

print(f"Debug: {debug_mode}")
print(f"Max users: {max_users}")
print(f"Log level: {log_level}")

# Nested access
db_host = config["database"]["host"]
print(f"Database host: {db_host}")
\`\`\`

---

## ⚠️ Common Pitfalls

### **KeyError vs Safe Access**
\`\`\`python
data = {"name": "Alice"}

# This will crash if key doesn't exist
# print(data["age"])  # KeyError!

# Safe alternatives
print(data.get("age"))           # None
print(data.get("age", "N/A"))    # N/A
print(data.get("age", 0))        # 0

# Check before access
if "age" in data:
    print(data["age"])
else:
    print("Age not available")
\`\`\`

Dictionary access is powerful but requires careful key management! 🔑`
};
