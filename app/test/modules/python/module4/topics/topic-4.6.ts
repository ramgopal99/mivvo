import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_6: SubLesson = {
  id: 4.6,
  title: 'When to Use Tuples',
  status: 'demo',
  content: `# 🤔 When to Use Tuples

Tuples are great for specific situations. Knowing when to use them makes your code better!

---

## 🎯 Use Tuples When Data Should NOT Change

### **Constants and Fixed Values**
\`\`\`python
# Mathematical constants
PI = 3.14159
E = 2.71828
GRAVITY = 9.81

# Days in months (never changes)
MONTHS_DAYS = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

# RGB color constants
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
\`\`\`

---

## 📍 Use Tuples for Coordinates and Points

### **Geographic and Geometric Data**
\`\`\`python
# Geographic coordinates (latitude, longitude)
new_york = (40.7128, -74.0060)
london = (51.5074, -0.1278)
tokyo = (35.6762, 139.6503)

# 3D coordinates
point_3d = (10, 20, 30)

# Screen coordinates
mouse_position = (500, 300)
\`\`\`

---

## 🔄 Use Tuples for Returning Multiple Values

### **Function Returns**
\`\`\`python
def get_user_info():
    return ("Alice", 25, "Engineer")

def calculate_stats(numbers):
    return (min(numbers), max(numbers), sum(numbers)/len(numbers))

# Unpack the results
name, age, job = get_user_info()
print(f"{name} is {age} and works as {job}")

minimum, maximum, average = calculate_stats([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Avg: {average:.1f}")
\`\`\`

---

## 🔑 Use Tuples as Dictionary Keys

### **Immutable Keys**
\`\`\`python
# Dictionary with coordinate keys
pixel_colors = {
    (0, 0): "white",
    (100, 200): "red",
    (50, 75): "blue"
}

# Student grades by (class, student_id)
grades = {
    ("Math", 101): 95,
    ("Math", 102): 87,
    ("Science", 101): 92
}

print(pixel_colors[(100, 200)])  # red
print(grades[("Math", 101)])     # 95
\`\`\`

---

## 📊 Use Tuples for Data Records

### **Structured Data**
\`\`\`python
# Employee records
employees = [
    ("Alice", "Engineer", 75000),
    ("Bob", "Designer", 65000),
    ("Charlie", "Manager", 85000)
]

# Sort by salary
employees.sort(key=lambda x: x[2])
print("Sorted by salary:")
for name, job, salary in employees:
    print(f"{name}: $", salary)

# Weather data
weather_data = [
    ("Monday", 22, 15, "Sunny"),
    ("Tuesday", 20, 12, "Cloudy"),
    ("Wednesday", 18, 10, "Rainy")
]
\`\`\`

---

## ⚡ Use Tuples for Performance

### **Faster than Lists for Read-Only Data**
\`\`\`python
import time

# Large tuple vs large list
large_tuple = tuple(range(10000))
large_list = list(range(10000))

# Tuples are slightly faster for access
start = time.time()
for i in range(1000):
    _ = large_tuple[5000]
tuple_time = time.time() - start

start = time.time()
for i in range(1000):
    _ = large_list[5000]
list_time = time.time() - start

print(f"Tuple access: {tuple_time:.4f}s")
print(f"List access: {list_time:.4f}s")
\`\`\`

---

## 🚫 When NOT to Use Tuples

### **Don't Use for Changing Data**
\`\`\`python
# ❌ Bad - trying to modify tuple
# directions = ("north", "south", "east", "west")
# directions[0] = "North"  # Error!

# ✅ Good - use list for changing data
directions = ["north", "south", "east", "west"]
directions[0] = "North"  # Works!
\`\`\`

### **Don't Use for Frequent Modifications**
\`\`\`python
# If you need to add/remove items frequently, use lists instead
# Tuples require creating new tuples for changes
\`\`\`

---

## 🎨 Best Practices

1. **Use tuples for immutable data** - constants, coordinates, function returns
2. **Use tuples as dictionary keys** - they must be immutable
3. **Use tuples for small, fixed collections** - like RGB values, points
4. **Use lists for data that changes** - shopping lists, user inputs
5. **Consider performance** - tuples are slightly faster for read-only access

### **Quick Decision Guide:**
- Data never changes → Tuple
- Data changes frequently → List
- Need dictionary key → Tuple
- Multiple function returns → Tuple
- Coordinates/points → Tuple
- Constants → Tuple

Tuples shine when data should stay constant! ✨`
};
