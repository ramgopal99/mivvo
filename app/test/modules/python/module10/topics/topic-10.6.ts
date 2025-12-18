import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_6: SubLesson = {
  id: 10.6,
  title: 'When to Use Arrays vs Linked Lists',
  status: 'demo',
  content: `# 🤔 When to Use Arrays vs Linked Lists

The choice between arrays and linked lists depends on your specific use case, performance requirements, and data access patterns. Let's explore real-world scenarios!

---

## 🎯 Quick Decision Guide

### **Use Arrays When:**
- **Fast random access** is critical
- **Size is relatively stable**
- **Memory efficiency** matters
- **Simple implementation** is preferred
- **Cache performance** is important

### **Use Linked Lists When:**
- **Frequent insertions/deletions** in the middle
- **Size changes dynamically**
- **No random access** is needed
- **Memory for large objects** is a concern

---

## 📊 Real-World Use Cases

### **Arrays Excel At:**

#### **1. Image Processing**
\`\`\`python
# Pixel arrays - random access is crucial
def invert_colors(image_pixels):
    """Invert colors in image array."""
    height, width = len(image_pixels), len(image_pixels[0])

    for i in range(height):
        for j in range(width):
            # Direct access to any pixel - O(1)
            r, g, b = image_pixels[i][j]
            image_pixels[i][j] = (255 - r, 255 - g, 255 - b)

# Arrays allow instant pixel access
print("Arrays: Perfect for image processing!")
\`\`\`

#### **2. Mathematical Computations**
\`\`\`python
# Vector operations
def dot_product(vec1, vec2):
    """Calculate dot product of two vectors."""
    if len(vec1) != len(vec2):
        return None

    result = 0
    for i in range(len(vec1)):
        result += vec1[i] * vec2[i]  # O(1) access
    return result

v1 = [1, 2, 3, 4, 5]
v2 = [6, 7, 8, 9, 10]
print(f"Dot product: {dot_product(v1, v2)}")  # 130

print("Arrays: Essential for numerical computing!")
\`\`\`

#### **3. Database Records**
\`\`\`python
# Fixed-size records
employees = [
    [101, "Alice", "Engineer", 75000],
    [102, "Bob", "Designer", 65000],
    [103, "Charlie", "Manager", 85000]
]

def find_employee_by_id(emp_id):
    """Find employee by ID using binary search."""
    left, right = 0, len(employees) - 1

    while left <= right:
        mid = (left + right) // 2
        if employees[mid][0] == emp_id:
            return employees[mid]
        elif employees[mid][0] < emp_id:
            left = mid + 1
        else:
            right = mid - 1

    return None

print(f"Employee 102: {find_employee_by_id(102)}")
print("Arrays: Great for structured data!")
\`\`\`

---

### **Linked Lists Excel At:**

#### **1. Dynamic Task Management**
\`\`\`python
class TaskNode:
    def __init__(self, task, priority=1):
        self.task = task
        self.priority = priority
        self.next = None

class TaskManager:
    def __init__(self):
        self.head = None

    def add_task(self, task, priority=1):
        """Add task with priority (insertion sort)."""
        new_node = TaskNode(task, priority)

        if not self.head or priority > self.head.priority:
            new_node.next = self.head
            self.head = new_node
            return

        current = self.head
        while current.next and current.next.priority >= priority:
            current = current.next

        new_node.next = current.next
        current.next = new_node

    def complete_highest_priority(self):
        """Complete highest priority task."""
        if self.head:
            task = self.head.task
            self.head = self.head.next
            return task
        return None

    def display_tasks(self):
        """Show all tasks by priority."""
        current = self.head
        while current:
            print(f"Priority {current.priority}: {current.task}")
            current = current.next

manager = TaskManager()
manager.add_task("Fix critical bug", 5)
manager.add_task("Write documentation", 2)
manager.add_task("Code review", 3)

print("Task list by priority:")
manager.display_tasks()

print(f"\nCompleted: {manager.complete_highest_priority()}")
\`\`\`

#### **2. Undo/Redo Functionality**
\`\`\`python
class EditAction:
    def __init__(self, action_type, data):
        self.action_type = action_type
        self.data = data
        self.next = None

class TextEditor:
    def __init__(self):
        self.history = None  # Linked list of actions
        self.current = None

    def perform_action(self, action_type, data):
        """Record and perform an action."""
        action = EditAction(action_type, data)
        action.next = self.history
        self.history = action

        print(f"Performed: {action_type} - {data}")

    def undo(self):
        """Undo last action."""
        if self.history:
            undone = self.history.data
            self.history = self.history.next
            print(f"Undid: {undone}")
            return undone
        return None

editor = TextEditor()
editor.perform_action("insert", "Hello")
editor.perform_action("insert", " World")
editor.perform_action("delete", "o")

editor.undo()  # Undo delete
editor.undo()  # Undo insert " World"
\`\`\`

#### **3. Memory-Efficient Large Objects**
\`\`\`python
class LargeObject:
    def __init__(self, data):
        self.data = data  # Large data structure
        self.next = None

class ObjectPool:
    def __init__(self):
        self.available = None  # Linked list of available objects

    def get_object(self, data):
        """Get object from pool or create new."""
        if self.available:
            obj = self.available
            self.available = obj.next
            obj.data = data
            return obj

        return LargeObject(data)

    def return_object(self, obj):
        """Return object to pool."""
        obj.next = self.available
        self.available = obj

pool = ObjectPool()

# Reuse objects efficiently
obj1 = pool.get_object("Large dataset 1")
obj2 = pool.get_object("Large dataset 2")

pool.return_object(obj1)
reused_obj = pool.get_object("New data")  # Reuses obj1

print("Linked lists: Perfect for object pooling!")
\`\`\`

---

## ⚖️ Performance Trade-offs

### **Time Complexity Comparison**

| Operation | Array | Linked List | Winner |
|-----------|-------|-------------|--------|
| Access by index | O(1) | O(n) | Array |
| Insert at beginning | O(n) | O(1) | Linked List |
| Insert at end | O(1)* | O(n) | Array* |
| Insert in middle | O(n) | O(n) | Tie |
| Delete from beginning | O(n) | O(1) | Linked List |
| Delete from end | O(1) | O(n) | Array |
| Search | O(n) | O(n) | Tie |

*Python lists are dynamic arrays, so append is amortized O(1)

---

## 💾 Memory Considerations

### **Arrays: Contiguous Memory**
- **Pros**: Cache-friendly, less memory overhead
- **Cons**: May waste space, resizing expensive
- **Best for**: Numerical data, fixed-size collections

### **Linked Lists: Scattered Memory**
- **Pros**: No wasted space, dynamic sizing
- **Cons**: Memory overhead for pointers, cache unfriendly
- **Best for**: Dynamic collections, large objects

---

## 🛠️ Practical Guidelines

### **Choose Arrays for:**
- **Games & Graphics** - Fast pixel access
- **Scientific Computing** - Vector/matrix operations
- **Databases** - Fixed-record structures
- **Caching** - Fast lookups by index
- **Small datasets** - Simplicity matters

### **Choose Linked Lists for:**
- **Text Editors** - Undo/redo, insertions
- **Task Schedulers** - Priority queues, dynamic ordering
- **Memory Pools** - Object reuse
- **Large objects** - Minimize memory overhead
- **Frequent modifications** - Middle insertions/deletions

### **Choose Python Lists for:**
- **General programming** - Dynamic arrays with array benefits
- **Prototyping** - Quick development
- **Mixed usage** - Both random access and dynamic sizing needed

---

## 🚀 Advanced Considerations

### **Hybrid Approaches**
\`\`\`python
# Unrolled linked lists (cache-friendly linked lists)
# Skip lists (linked list with array-like access)
# Dynamic arrays (what Python lists actually are)

print("Advanced: Consider hybrid data structures for complex needs")
\`\`\`

### **Language-Specific Optimizations**
\`\`\`python
# Python lists are already optimized dynamic arrays
# Use collections.deque for efficient queue operations
# Use array module for typed arrays

import collections
from array import array

# Efficient queue
queue = collections.deque([1, 2, 3])
queue.appendleft(0)  # O(1)
queue.pop()          # O(1)

# Typed array (memory efficient)
int_array = array('i', [1, 2, 3, 4, 5])  # 'i' = signed int

print("Python provides optimized alternatives!")
\`\`\`

---

## 🎯 Decision Framework

### **Step 1: Analyze Access Patterns**
- **Mostly random access?** → Arrays
- **Mostly sequential access?** → Either
- **Frequent middle modifications?** → Linked Lists

### **Step 2: Consider Size Dynamics**
- **Size stable?** → Arrays
- **Size changes frequently?** → Linked Lists

### **Step 3: Memory Constraints**
- **Memory critical?** → Arrays (less overhead)
- **Large objects?** → Linked Lists (no wasted space)

### **Step 4: Implementation Complexity**
- **Simple code needed?** → Arrays/Python Lists
- **Custom behavior needed?** → Linked Lists

### **Step 5: Performance Test**
\`\`\`python
# Always measure performance for your specific use case
import time

# Test your actual usage patterns
def benchmark_structure(structure_type, operations):
    # Implement performance tests
    pass

print("Measure, don't assume!")
\`\`\`

The best choice depends on your specific requirements and constraints! 🎯`
};
