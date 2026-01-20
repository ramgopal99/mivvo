import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_6: SubLesson = {
  id: "6.6",
  title: 'Dictionary Methods',
  status: 'demo',
  content: "`# ðŸ”§ Dictionary Methods

Dictionaries have many useful methods for manipulation and analysis. Let's explore the most important ones!

---

## ðŸ”„ Copy Method

### **Create a Copy**
\`"\`\`python
original = {"a": 1, "b": 2, "c": 3}
copy_dict = original.copy()

copy_dict["d"] = 4
print(f"Original: {original}")   # {'a': 1, 'b': 2, 'c': 3}
print(f"Copy: {copy_dict}")      # {'a': 1, 'b': 2, 'c': 3, 'd': 4}
\`\`\`

---

## ðŸ“Š Set Operations

### **Keys, Values, and Items**
\`\`\`python
data = {"name": "Alice", "age": 25, "city": "NYC"}

# Get views of keys, values, items
keys_view = data.keys()
values_view = data.values()
items_view = data.items()

print(f"Keys: {list(keys_view)}")
print(f"Values: {list(values_view)}")
print(f"Items: {list(items_view)}")

# Views are dynamic - they update when dict changes
data["job"] = "Engineer"
print(f"Keys after update: {list(keys_view)}")
\`\`\`

---

## ðŸ” Get Method Variations

### **Advanced Access Patterns**
\`\`\`python
config = {"debug": True, "timeout": 30}

# Basic get
print(config.get("debug"))        # True
print(config.get("missing"))      # None
print(config.get("missing", 0))   # 0

# Set default if key doesn't exist
config.setdefault("retries", 3)
print(config["retries"])          # 3

# Setdefault doesn't change existing values
config.setdefault("debug", False)
print(config["debug"])            # True (unchanged)
\`\`\`

---

## ðŸ“ Dictionary from Keys

### **Create Dict with Default Values**
\`\`\`python
# Create dict from keys with default value
keys = ["a", "b", "c"]
default_dict = dict.fromkeys(keys)
print(default_dict)  # {'a': None, 'b': None, 'c': None}

# With custom default value
default_dict = dict.fromkeys(keys, 0)
print(default_dict)  # {'a': 0, 'b': 0, 'c': 0}

# Useful for counters
word_count = dict.fromkeys(["the", "and", "or"], 0)
print(word_count)    # {'the': 0, 'and': 0, 'or': 0}
\`\`\`

---

## ðŸŽ¨ Practical Examples

### **Word Frequency Counter**
\`\`\`python
text = "the quick brown fox jumps over the lazy dog"
words = text.split()

# Create word frequency dictionary
word_freq = {}
for word in words:
    word_freq[word] = word_freq.get(word, 0) + 1

print("Word frequencies:")
for word, count in sorted(word_freq.items()):
    print(f"  {word}: {count}")

# Alternative using setdefault
word_freq2 = {}
for word in words:
    word_freq2.setdefault(word, 0)
    word_freq2[word] += 1

print(f"Results match: {word_freq == word_freq2}")
\`\`\`

### **Configuration Management**
\`\`\`python
# Application defaults
defaults = {
    "debug": False,
    "max_users": 100,
    "timeout": 30,
    "retries": 3
}

# User configuration (partial)
user_config = {
    "debug": True,
    "max_users": 50
}

# Merge configurations
config = defaults.copy()
config.update(user_config)

print("Final configuration:")
for key, value in sorted(config.items()):
    print(f"  {key}: {value}")

# Check which settings were customized
customized = set(user_config.keys())
all_settings = set(config.keys())
default_only = all_settings - customized

print(f"Customized settings: {sorted(customized)}")
print(f"Using defaults: {sorted(default_only)}")
\`\`\`

### **Student Grade Analysis**
\`\`\`python
# Student grades
grades = {
    "Alice": [85, 92, 88],
    "Bob": [78, 85, 82],
    "Charlie": [95, 88, 92]
}

# Calculate averages using dictionary comprehension
averages = {name: sum(scores)/len(scores) for name, scores in grades.items()}

print("Student averages:")
for name, avg in averages.items():
    print(f"  {name}: {avg:.1f}")

# Find top performer
top_student = max(averages.items(), key=lambda x: x[1])
print(f"Top student: {top_student[0]} with {top_student[1]:.1f}")

# Grade distribution
grade_counts = dict.fromkeys(["A", "B", "C", "D", "F"], 0)
for scores in grades.values():
    for score in scores:
        if score >= 90:
            grade_counts["A"] += 1
        elif score >= 80:
            grade_counts["B"] += 1
        elif score >= 70:
            grade_counts["C"] += 1
        elif score >= 60:
            grade_counts["D"] += 1
        else:
            grade_counts["F"] += 1

print(f"Grade distribution: {dict(grade_counts)}")
\`\`\`

---

## âœ… Method Summary

### **View Methods (Dynamic)**
- **dict.keys()** - Returns dict_keys view (like set)
- **dict.values()** - Returns dict_values view
- **dict.items()** - Returns dict_items view (key-value pairs)

### **Access Methods**
- **dict.get(key, default)** - Safe access, returns default if missing
- **dict.setdefault(key, default)** - Set if missing, return current value

### **Creation & Copying**
- **dict.copy()** - Create shallow copy
- **dict.fromkeys(keys, value)** - Create dict from keys with default value

### **Modification Methods**
- **dict.update(other)** - Update with another dict or key-value pairs
- **dict.pop(key, default)** - Remove and return value (safe with default)
- **dict.popitem()** - Remove and return last (key, value) tuple
- **dict.clear()** - Remove all items

### **Key Points**
- **View methods** return dynamic views that update when dict changes
- **get()** is safer than dict[key] for optional access
- **setdefault()** combines checking and setting in one operation
- **update()** accepts dicts, iterables of pairs, or keyword arguments
- **pop()** with default is the safest removal method

Dictionary methods provide powerful data manipulation capabilities! ðŸ› ï¸`
};


