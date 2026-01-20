import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_4: SubLesson = {
  id: "6.4",
  title: 'Adding/Updating Dictionary Elements',
  status: 'demo',
  content: "`# âž• Adding & Updating Dictionary Elements

Dictionaries are mutable, so you can add new key-value pairs and update existing ones. Let's explore all the ways!

---

## ðŸŽ¯ Adding New Elements

### **Using Square Brackets []**
\`"\`\`python
person = {"name": "Alice"}
print(f"Before: {person}")

# Add new key-value pairs
person["age"] = 25
person["city"] = "New York"
person["job"] = "Engineer"

print(f"After: {person}")
# {'name': 'Alice', 'age': 25, 'city': 'New York', 'job': 'Engineer'}
\`\`\`

---

## ðŸ”„ Updating Existing Elements

### **Modify Values**
\`\`\`python
student = {
    "name": "Alice",
    "grade": 85,
    "status": "active"
}
print(f"Before: {student}")

# Update existing values
student["grade"] = 92
student["status"] = "honor_roll"

print(f"After: {student}")
# {'name': 'Alice', 'grade': 92, 'status': 'honor_roll'}
\`\`\`

---

## ðŸ“¦ Update with update() Method

### **Add Multiple Key-Value Pairs**
\`\`\`python
person = {"name": "Alice", "age": 25}
print(f"Before: {person}")

# Add multiple items at once
person.update({
    "city": "New York",
    "job": "Engineer",
    "hobbies": ["reading", "coding"]
})

print(f"After: {person}")
\`\`\`

---

## ðŸ”„ Update with Keyword Arguments

### **Using update() with kwargs**
\`\`\`python
config = {"debug": False, "version": "1.0"}
print(f"Before: {config}")

# Update using keyword arguments
config.update(max_users=100, timeout=30, retries=3)

print(f"After: {config}")
# {'debug': False, 'version': '1.0', 'max_users': 100, 'timeout': 30, 'retries': 3}
\`\`\`

---

## ðŸ“ Conditional Updates

### **Update Only If Key Exists/Don't Exist**
\`\`\`python
# Update only if key exists
def safe_update(dictionary, key, value):
    if key in dictionary:
        dictionary[key] = value
        print(f"Updated {key}: {value}")
    else:
        print(f"Key '{key}' not found")

person = {"name": "Alice", "age": 25}
safe_update(person, "age", 26)      # Updates age
safe_update(person, "city", "NYC")  # Won't update
\`\`\`

---

## ðŸŽ¨ Practical Examples

### **User Profile Management**
\`\`\`python
# User profile system
user_profile = {
    "username": "alice_dev",
    "email": "alice@email.com",
    "level": 1,
    "points": 100
}

print("=== User Profile Management ===")
print(f"Initial profile: {user_profile}")

# Level up user
user_profile["level"] = 2
user_profile["points"] = 250

# Add new achievements
user_profile.update({
    "achievements": ["First Login", "Level Up"],
    "last_login": "2024-01-15"
})

print(f"Updated profile: {user_profile}")
\`\`\`

### **Inventory Management**
\`\`\`python
# Store inventory
inventory = {
    "apples": {"price": 2.50, "stock": 100},
    "bananas": {"price": 1.20, "stock": 50}
}

print("\n=== Inventory Management ===")

# Add new product
inventory["oranges"] = {"price": 3.00, "stock": 75}

# Update existing stock
inventory["apples"]["stock"] = 120
inventory["bananas"]["price"] = 1.30

# Add multiple products
new_products = {
    "grapes": {"price": 4.00, "stock": 30},
    "pears": {"price": 2.80, "stock": 40}
}
inventory.update(new_products)

print("Updated inventory:")
for item, details in inventory.items():
    print(f"  {item}: $", details['price'], f", {details['stock']} in stock")
\`\`\`

### **Configuration Updates**
\`\`\`python
# Application configuration
app_config = {
    "database": {
        "host": "localhost",
        "port": 5432
    },
    "features": ["login", "dashboard"]
}

print("\n=== Configuration Updates ===")

# Update database settings
app_config["database"].update({
    "username": "admin",
    "password": "secret"
})

# Add new features
app_config["features"].extend(["reports", "analytics"])

# Add new top-level settings
app_config.update({
    "version": "2.1.0",
    "maintenance_mode": False
})

print(f"Final config: {app_config}")
\`\`\`

---

## âœ… Best Practices

1. **Use update() for multiple changes** - More efficient than individual assignments
2. **Check key existence before updating** - Avoid accidental overwrites
3. **Use descriptive key names** - Makes code more readable
4. **Consider using dict.update() with other dicts** - Great for merging configurations

Dictionaries make data updates intuitive and efficient! ðŸ“`
};


