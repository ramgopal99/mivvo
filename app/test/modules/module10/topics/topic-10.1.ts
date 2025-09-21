import { SubLesson } from '../../../data/lessonsData';

export const topic_10_1: SubLesson = {
  id: 10.1,
  title: 'What are Arrays?',
  status: 'demo',
  content: `# 📊 What are Arrays?

Arrays are fundamental data structures that store elements of the same type in contiguous memory locations. Think of them as a fixed-size container with indexed access!

---

## 🎯 What is an Array?

An **array** is a collection of items that:
- **Stores elements of the same type** - All items have identical data type
- **Uses contiguous memory** - Elements are stored next to each other in memory
- **Provides indexed access** - Access elements by their position (index)
- **Has fixed size** - Size is determined when created

\`\`\`python
# In Python, lists are dynamic arrays
# But conceptually, arrays have these characteristics:

# Static array representation
array_size = 5
array = [0] * array_size  # [0, 0, 0, 0, 0]

# Fill with values
array[0] = 10
array[1] = 20
array[2] = 30
array[3] = 40
array[4] = 50

print(array)  # [10, 20, 30, 40, 50]
print(f"Element at index 2: {array[2]}")  # 30
\`\`\`

---

## 🔍 Array Characteristics

### **Contiguous Memory Layout**

\`\`\`text
Memory: [10][20][30][40][50]
Index:    0   1   2   3   4
\`\`\`

### **Constant-Time Access**
\`\`\`python
# O(1) access time - instant access to any element
large_array = list(range(100000))
print(large_array[50000])  # Instant access!
\`\`\`

### **Fixed Size**
\`\`\`python
# Arrays have predetermined size
size = 10
scores = [0] * size

# Can't add beyond size (in static arrays)
# scores.append(100)  # Would work in Python lists but not static arrays
\`\`\`

---

## 📊 Array Operations

### **Basic Operations**
\`\`\`python
arr = [10, 20, 30, 40, 50]

# Access - O(1)
print(arr[0])    # First element
print(arr[-1])   # Last element

# Update - O(1)
arr[2] = 35
print(arr)       # [10, 20, 35, 40, 50]

# Length
print(len(arr))  # 5
\`\`\`

### **Traversal**
\`\`\`python
# Visit all elements - O(n)
def print_array(arr):
    for i in range(len(arr)):
        print(f"Index {i}: {arr[i]}")

numbers = [1, 2, 3, 4, 5]
print_array(numbers)
\`\`\`

---

## 🎨 Real-World Examples

### **Image Pixels**
\`\`\`python
# RGB pixel array (simplified)
width, height = 3, 2
image = [[(255, 0, 0), (0, 255, 0), (0, 0, 255)],  # Row 0
         [(255, 255, 0), (0, 255, 255), (255, 0, 255)]] # Row 1

print(f"Pixel at (0,1): {image[0][1]}")  # Green pixel
print(f"Image size: {len(image)}x{len(image[0])}")
\`\`\`

### **Sensor Readings**
\`\`\`python
# Temperature sensor readings over time
readings = [23.5, 24.1, 23.8, 24.3, 23.9, 24.0]

# Calculate average
total = sum(readings)
average = total / len(readings)
print(f"Average temperature: {average:.1f}°C")

# Find highest reading
max_temp = max(readings)
max_index = readings.index(max_temp)
print(f"Highest: {max_temp}°C at reading {max_index}")
\`\`\`

### **Student Grades**
\`\`\`python
# Class grades
grades = [85, 92, 78, 96, 88, 91, 83]

# Grade analysis
print(f"Class size: {len(grades)}")
print(f"Average grade: {sum(grades)/len(grades):.1f}")
print(f"Highest grade: {max(grades)}")
print(f"Lowest grade: {min(grades)}")

# Count grades in ranges
a_grades = sum(1 for grade in grades if grade >= 90)
b_grades = sum(1 for grade in grades if 80 <= grade < 90)
c_grades = sum(1 for grade in grades if grade < 80)

print(f"A grades: {a_grades}, B grades: {b_grades}, C grades: {c_grades}")
\`\`\`

---

## ⚡ Array Performance

### **Time Complexity**
- **Access**: O(1) - Constant time
- **Search**: O(n) - Linear search
- **Insertion**: O(n) - May require shifting elements
- **Deletion**: O(n) - May require shifting elements

### **Space Complexity**
- **Fixed overhead**: O(1) additional space
- **Contiguous memory**: Efficient cache usage

---

## 🔍 Arrays vs Python Lists

| Feature | Arrays | Python Lists |
|---------|--------|--------------|
| Size | Fixed | Dynamic |
| Type | Homogeneous | Heterogeneous |
| Memory | Contiguous | Non-contiguous |
| Performance | Faster access | More flexible |
| Built-in | No (use array module) | Yes |

Arrays provide fast, predictable access but require careful size management!

🚀 **Next**: We'll explore array operations and algorithms!`
};
