import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_3: SubLesson = {
  id: "8.3",
  title: 'Mathematical Functions',
  status: 'demo',
  content: `# 🔢 Mathematical Functions

Python's built-in mathematical functions handle common calculations and number operations!

---

## 🎯 Basic Mathematical Functions

### **abs() - Absolute Value**
\`\`\`python
print(abs(-5))     # 5
print(abs(5))      # 5
print(abs(-3.14))  # 3.14

# Useful for distances
def distance(x1, y1, x2, y2):
    return abs(x2 - x1) + abs(y2 - y1)  # Manhattan distance

print(distance(0, 0, 3, 4))  # 7
\`\`\`

### **round() - Round Numbers**
\`\`\`python
print(round(3.14159))     # 3
print(round(3.14159, 2))  # 3.14
print(round(3.14159, 4))  # 3.1416

# Round to nearest even (banker's rounding)
print(round(2.5))  # 2
print(round(3.5))  # 4
\`\`\`

### **pow() - Power Function**
\`\`\`python
print(pow(2, 3))    # 8 (2^3)
print(pow(3, 2))    # 9 (3^2)
print(pow(16, 0.5)) # 4.0 (square root)

# Can use ** instead
print(2 ** 3)    # 8 (same as pow(2, 3))
\`\`\`

---

## 📊 Aggregation Functions

### **min(), max() - Find Extremes**
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

print(min(numbers))  # 1
print(max(numbers))  # 9

# With custom key
words = ["apple", "Banana", "cherry", "Date"]
print(min(words, key=str.lower))  # apple
print(max(words, key=len))        # Banana

# With multiple arguments
print(min(5, 3, 8, 1))  # 1
print(max(5, 3, 8, 1))  # 8
\`\`\`

### **sum() - Sum Elements**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))  # 15

# With start value
print(sum(numbers, 10))  # 25 (15 + 10)

# Sum with generator
print(sum(x**2 for x in range(1, 6)))  # 1+4+9+16+25 = 55

# Careful with mixed types
# print(sum([1, 2, "3"]))  # TypeError!
\`\`\`

---

## 🔢 Advanced Mathematical Functions

### **divmod() - Division and Modulo**
\`\`\`python
# Returns (quotient, remainder)
print(divmod(7, 3))   # (2, 1)
print(divmod(10, 4))  # (2, 2)
print(divmod(8, 5))   # (1, 3)

# Get quotient and remainder together
quotient, remainder = divmod(13, 4)
print(f"13 ÷ 4 = {quotient} with remainder {remainder}")
\`\`\`

---

## 🎨 Practical Examples

### **Statistics Calculator**
\`\`\`python
def calculate_stats(numbers):
    """Calculate basic statistics."""
    if not numbers:
        return None

    return {
        "count": len(numbers),
        "sum": sum(numbers),
        "min": min(numbers),
        "max": max(numbers),
        "average": sum(numbers) / len(numbers),
        "range": max(numbers) - min(numbers)
    }

scores = [85, 92, 78, 96, 88, 91]
stats = calculate_stats(scores)

print("Score Statistics:")
for key, value in stats.items():
    if isinstance(value, float):
        print(f"  {key}: {value:.2f}")
    else:
        print(f"  {key}: {value}")
\`\`\`

### **Grade Calculator**
\`\`\`python
def calculate_grade(score, curve_factor=0):
    """Calculate letter grade with optional curve."""
    adjusted_score = min(100, score + curve_factor)

    if adjusted_score >= 90:
        return "A"
    elif adjusted_score >= 80:
        return "B"
    elif adjusted_score >= 70:
        return "C"
    elif adjusted_score >= 60:
        return "D"
    else:
        return "F"

# Test grades
scores = [85, 92, 78, 96, 88, 91, 73, 65]
grades = [calculate_grade(score) for score in scores]
grades_curved = [calculate_grade(score, 5) for score in scores]

print("Original grades:", grades)
print("Curved grades:  ", grades_curved)

# Grade distribution
grade_counts = {}
for grade in grades:
    grade_counts[grade] = grade_counts.get(grade, 0) + 1

print("Grade distribution:", grade_counts)
\`\`\`

### **Number Analysis**
\`\`\`python
def analyze_number(n):
    """Analyze properties of a number."""
    return {
        "number": n,
        "absolute": abs(n),
        "is_positive": n > 0,
        "is_even": n % 2 == 0,
        "is_odd": n % 2 != 0,
        "digits": len(str(abs(n))),
        "rounded": round(n),
        "nearest_power_of_2": 2 ** round(n.bit_length() / 2)
    }

numbers = [-5, 0, 15, 3.14159, 100]
for num in numbers:
    analysis = analyze_number(num)
    print(f"\nAnalysis of {num}:")
    for key, value in analysis.items():
        print(f"  {key}: {value}")
\`\`\`

### **Distance Calculations**
\`\`\`python
def euclidean_distance(x1, y1, x2, y2):
    """Calculate Euclidean distance."""
    return ((x2 - x1)**2 + (y2 - y1)**2)**0.5

def manhattan_distance(x1, y1, x2, y2):
    """Calculate Manhattan distance."""
    return abs(x2 - x1) + abs(y2 - y1)

points = [(0, 0), (3, 4), (1, 1), (5, 2)]

print("Distances from origin:")
for x, y in points:
    euclid = euclidean_distance(0, 0, x, y)
    manhattan = manhattan_distance(0, 0, x, y)
    print(f"  Point ({x}, {y}):")
    print(f"    Euclidean: {euclid:.2f}")
    print(f"    Manhattan: {manhattan}")
\`\`\`

---

## ⚡ Performance Tips

### **Use Built-ins**
\`\`\`python
# Built-in functions are fast and efficient
numbers = [1, 2, 3, 4, 5]

# Use sum() instead of manual loop
total = sum(numbers)  # Fast!
print(f"Sum: {total}")

# Use min/max instead of sorting
print(f"Min: {min(numbers)}, Max: {max(numbers)}")
\`\`\`

### **min/max with Key Functions**
\`\`\`python
students = [
    {"name": "Alice", "grade": 85},
    {"name": "Bob", "grade": 92},
    {"name": "Charlie", "grade": 78}
]

# Find student with highest grade
top_student = max(students, key=lambda s: s["grade"])
print(f"Top student: {top_student['name']} ({top_student['grade']})")

# Find student with shortest name
shortest_name = min(students, key=lambda s: len(s["name"]))
print(f"Shortest name: {shortest_name['name']}")
\`\`\`

---

## ✅ Best Practices

1. **Use built-in functions** - They're optimized and handle edge cases
2. **Combine functions creatively** - Chain min, max, sum effectively
3. **Handle empty sequences** - min/max raise errors on empty lists
4. **Use key parameters** - For custom comparison logic
5. **Consider precision** - Round appropriately for display

Mathematical functions make number crunching effortless! 🔢`
};

