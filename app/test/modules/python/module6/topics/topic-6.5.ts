import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_5: SubLesson = {
  id: 6.5,
  title: 'Removing Dictionary Elements',
  status: 'demo',
  content: `# ➖ Removing Dictionary Elements

Dictionaries provide several methods to remove elements. Each method behaves differently when keys don't exist!

---

## 🎯 Remove with del Statement

### **Delete by Key**
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "job": "Engineer"
}
print(f"Before: {person}")

del person["city"]
print(f"After deleting 'city': {person}")

del person["job"]
print(f"After deleting 'job': {person}")
\`\`\`

---

## 🗑️ Pop Method

### **Remove and Return Value**
\`\`\`python
scores = {"Alice": 95, "Bob": 87, "Charlie": 92}
print(f"Before: {scores}")

# Remove and get the value
alice_score = scores.pop("Alice")
print(f"Alice's score was: {alice_score}")
print(f"After: {scores}")

# Pop with default value (safe)
diana_score = scores.pop("Diana", "Not found")
print(f"Diana's score: {diana_score}")
\`\`\`

---

## 🧽 Popitem Method

### **Remove Last Item (Python 3.7+)**
\`\`\`python
data = {"a": 1, "b": 2, "c": 3, "d": 4}
print(f"Before: {data}")

# Remove and return last item (maintains insertion order)
last_item = data.popitem()
print(f"Removed: {last_item}")
print(f"After: {data}")

# Remove another
another = data.popitem()
print(f"Removed another: {another}")
print(f"Final: {data}")
\`\`\`

---

## 🧹 Clear Method

### **Remove All Elements**
\`\`\`python
settings = {
    "debug": True,
    "max_users": 100,
    "timeout": 30,
    "version": "1.0"
}
print(f"Before: {settings}")

settings.clear()
print(f"After clear(): {settings}")  # {}
\`\`\`

---

## 🎨 Practical Examples

### **User Session Management**
\`\`\`python
# Active user sessions
active_sessions = {
    "user123": {"login_time": "10:30", "ip": "192.168.1.1"},
    "user456": {"login_time": "10:45", "ip": "192.168.1.2"},
    "user789": {"login_time": "11:00", "ip": "192.168.1.3"}
}

print("=== Session Management ===")

# User logs out
user_id = "user456"
if user_id in active_sessions:
    session_info = active_sessions.pop(user_id)
    print(f"User {user_id} logged out from {session_info['ip']}")
else:
    print(f"User {user_id} not found")

print(f"Active sessions: {list(active_sessions.keys())}")
\`\`\`

### **Cache Management**
\`\`\`python
# Simple cache system
cache = {
    "query1": "result1",
    "query2": "result2",
    "query3": "result3",
    "query4": "result4"
}

print("\n=== Cache Management ===")

# Remove old entries (simulate LRU eviction)
old_queries = ["query1", "query2"]
for query in old_queries:
    if query in cache:
        del cache[query]
        print(f"Removed {query} from cache")

# Clear entire cache for maintenance
print(f"Cache size before clear: {len(cache)}")
cache.clear()
print(f"Cache size after clear: {len(cache)}")
\`\`\`

### **Configuration Cleanup**
\`\`\`python
# Application configuration
config = {
    "database_host": "localhost",
    "database_port": 5432,
    "debug_mode": True,
    "max_connections": 100,
    "temp_setting": "remove_me",
    "deprecated_option": "old_value"
}

print("\n=== Configuration Cleanup ===")

# Remove deprecated settings
deprecated_keys = ["temp_setting", "deprecated_option"]
for key in deprecated_keys:
    config.pop(key, None)  # Safe removal

print("Cleaned configuration:")
for key, value in config.items():
    print(f"  {key}: {value}")
\`\`\`

---

## ✅ Method Comparison

### **Single Item Removal**
- **del dict[key]** - Fastest, raises KeyError if key missing
- **dict.pop(key)** - Returns removed value, raises KeyError if key missing
- **dict.pop(key, default)** - Returns removed value or default, safe operation

### **Bulk Removal**
- **dict.popitem()** - Removes and returns last (key, value) tuple
- **dict.clear()** - Removes all elements, no errors

### **Error Handling**
- **del** and **pop()** without default: Raise KeyError for missing keys
- **pop()** with default: Safe, returns default value
- **popitem()** and **clear()**: Never raise KeyError

### **Performance Notes**
- **del** is fastest for simple removal
- **pop()** with default is most versatile
- **popitem()** maintains insertion order (Python 3.7+)
- **clear()** is optimized for complete removal

Choose the right removal method for your specific needs! 🗂️`
};
