import { SubLesson } from '../../../data/lessonsData';

export const topic_6_1: SubLesson = {
  id: 6.1,
  title: 'What are Dictionaries?',
  status: 'demo',
  content: `# 📚 What are Python Dictionaries?

Dictionaries are Python's most powerful data structure for storing **key-value pairs**. Think of them as real-world dictionaries where you look up words (keys) to find their meanings (values)!

---

## 🎯 What is a Dictionary?

A **dictionary** is a collection that:
- **Maps keys to values** - Each key is associated with a value
- **Keys are unique** - No duplicate keys allowed
- **Keys must be immutable** - Can use strings, numbers, tuples (not lists)
- **Values can be anything** - Any data type including other dictionaries
- **Unordered** (Python 3.6+ maintains insertion order)

\`\`\`python
# A simple dictionary of student grades
grades = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92
}
print(grades)  # {'Alice': 95, 'Bob': 87, 'Charlie': 92}
\`\`\`

---

## 🔑 Key Characteristics

### **Key-Value Pairs**
\`\`\`python
# Keys point to values using colons
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print(person["name"])   # Alice
print(person["age"])    # 25
\`\`\`

### **Keys Must Be Unique**
\`\`\`python
# Duplicate keys - only last one is kept
duplicate_keys = {
    "key1": "first",
    "key1": "second",  # This overwrites the first
    "key2": "value2"
}
print(duplicate_keys)  # {'key1': 'second', 'key2': 'value2'}
\`\`\`

### **Keys Must Be Immutable**
\`\`\`python
# ✅ Valid keys
valid_dict = {
    "string_key": "value",
    42: "number key",
    (1, 2): "tuple key",
    True: "boolean key"
}

# ❌ Invalid keys (would cause error)
# invalid_dict = {
#     ["list", "key"]: "value",  # Lists are mutable
#     {"dict": "key"}: "value"   # Dictionaries are mutable
# }
\`\`\`

---

## 📊 Dictionary vs Other Collections

| Feature | List | Tuple | Dictionary |
|---------|------|-------|-------------|
| Access by | Index | Index | Key |
| Ordered | ✅ | ✅ | ✅ (3.6+) |
| Mutable | ✅ | ❌ | ✅ |
| Duplicates | ✅ | ✅ | Keys: ❌ Values: ✅ |
| Fast lookup | ❌ | ❌ | ✅ |

---

## 🎨 Real-World Examples

\`\`\`python
# User database
users = {
    "user123": {"name": "Alice", "email": "alice@email.com"},
    "user456": {"name": "Bob", "email": "bob@email.com"}
}

# Product inventory
inventory = {
    "apples": {"price": 2.50, "stock": 100},
    "bananas": {"price": 1.20, "stock": 50},
    "oranges": {"price": 3.00, "stock": 75}
}

# Translation dictionary
translations = {
    "hello": "hola",
    "goodbye": "adiós",
    "thank you": "gracias"
}

# Settings configuration
config = {
    "debug": True,
    "max_connections": 100,
    "timeout": 30.5
}
\`\`\`

---

## 🚀 Why Dictionaries Are Powerful

### **Fast Lookups**
\`\`\`python
# Finding values by key is very fast
large_dict = {f"key_{i}": f"value_{i}" for i in range(10000)}
print(large_dict["key_5000"])  # Instant access!
\`\`\`

### **Flexible Data Structure**
\`\`\`python
# Store complex data relationships
student_records = {
    "alice123": {
        "personal": {"name": "Alice", "age": 20},
        "academic": {"major": "CS", "gpa": 3.8},
        "courses": ["CS101", "MATH201", "PHYS301"]
    }
}
\`\`\`

Dictionaries are the backbone of Python programming - you'll use them everywhere! 🔑`
};
