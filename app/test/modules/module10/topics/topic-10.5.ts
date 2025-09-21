import { SubLesson } from '../../../data/lessonsData';

export const topic_10_5: SubLesson = {
  id: 10.5,
  title: 'Arrays vs Linked Lists',
  status: 'demo',
  content: `# ⚖️ Arrays vs Linked Lists

Arrays and linked lists are both linear data structures, but they have different strengths and weaknesses. Choosing the right one depends on your specific use case!

---

## 📊 Direct Comparison

| Aspect | Arrays | Linked Lists |
|--------|--------|--------------|
| **Memory Layout** | Contiguous | Scattered |
| **Size** | Fixed | Dynamic |
| **Access Time** | O(1) | O(n) |
| **Insert/Delete** | O(n) | O(1) at ends |
| **Memory Usage** | Less overhead | Extra pointers |
| **Cache Performance** | Excellent | Poor |

---

## 🎯 Access Patterns

### **Random Access - Arrays Win**
\`\`\`python
import time

# Large array
arr = list(range(100000))
ll_head = None

# Build linked list equivalent
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

current = None
for i in range(100000):
    node = Node(i)
    if not ll_head:
        ll_head = node
    else:
        current.next = node
    current = node

# Test random access
def access_array(index):
    return arr[index]

def access_linked_list(index):
    current = ll_head
    for i in range(index):
        if current:
            current = current.next
        else:
            return None
    return current.data if current else None

# Performance test
start = time.time()
for _ in range(1000):
    _ = access_array(50000)
array_time = time.time() - start

start = time.time()
for _ in range(1000):
    _ = access_linked_list(50000)
linked_time = time.time() - start

print(f"Array access time: {array_time:.4f}s")
print(f"Linked list access time: {linked_time:.4f}s")
print(f"Arrays are {linked_time/array_time:.0f}x faster for random access!")
\`\`\`

### **Sequential Access - Similar Performance**
\`\`\`python
# Both are O(n) for traversal
def traverse_array(arr):
    total = 0
    for item in arr:
        total += item
    return total

def traverse_linked_list(head):
    total = 0
    current = head
    while current:
        total += current.data
        current = current.next
    return total

print("Sequential access: Both are efficient!")
\`\`\`

---

## ➕ Insertion/Deletion Performance

### **Arrays - Expensive Operations**
\`\`\`python
# Inserting in middle of array
def insert_array_middle(arr, index, value):
    """Insert into array (simulating shift)"""
    # In real arrays, this requires shifting elements
    arr.insert(index, value)  # Python lists handle this automatically

arr = [1, 2, 4, 5]
print(f"Before: {arr}")
insert_array_middle(arr, 2, 3)
print(f"After inserting 3 at index 2: {arr}")
\`\`\`

### **Linked Lists - Efficient Operations**
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def insert_linked_list_middle(head, index, value):
    """Insert into linked list at specific position."""
    if index == 0:
        new_node = Node(value)
        new_node.next = head
        return new_node

    current = head
    count = 0

    while current and count < index - 1:
        current = current.next
        count += 1

    if current:
        new_node = Node(value)
        new_node.next = current.next
        current.next = new_node

    return head

# Build list
head = Node(1)
head.next = Node(2)
head.next.next = Node(4)
head.next.next.next = Node(5)

print("Linked list before insert:")
current = head
while current:
    print(current.data, end=" -> ")
    current = current.next
print("None")

head = insert_linked_list_middle(head, 2, 3)

print("Linked list after insert:")
current = head
while current:
    print(current.data, end=" -> ")
    current = current.next
print("None")
\`\`\`

---

## 💾 Memory Considerations

### **Arrays - Compact Memory**
\`\`\`python
# Arrays store only data
array = [10, 20, 30, 40, 50]  # Memory: [10][20][30][40][50]
print("Array stores only values")
print(f"Array length: {len(array)}")
\`\`\`

### **Linked Lists - Memory Overhead**
\`\`\`python
# Linked lists store data + pointers
class LinkedListNode:
    def __init__(self, data):
        self.data = data      # Value
        self.next = None      # Pointer to next node

# Each node has overhead
nodes = []
for i in range(5):
    nodes.append(LinkedListNode(i * 10))

# Link them
for i in range(len(nodes) - 1):
    nodes[i].next = nodes[i + 1]

print("Linked list: data + pointer per node")
print("Memory overhead: ~2x for pointers")
\`\`\`

---

## 🎯 When to Use Arrays

### **Perfect for Arrays:**
- **Fast random access** - Need to access elements by index frequently
- **Small to medium datasets** - Size doesn't change much
- **Numerical computations** - Vector/matrix operations
- **Cache-friendly** - Contiguous memory improves performance

\`\`\`python
# Array use cases
def find_max_in_range(arr, start, end):
    """Find max in array range - O(end-start) but fast access."""
    max_val = arr[start]
    for i in range(start + 1, end + 1):
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val

scores = [85, 92, 78, 96, 88, 91, 83]
print(f"Max in range 1-4: {find_max_in_range(scores, 1, 4)}")  # 96
\`\`\`

---

## 🎯 When to Use Linked Lists

### **Perfect for Linked Lists:**
- **Frequent insertions/deletions** - Especially in middle
- **Dynamic size** - Size changes frequently
- **No random access needed** - Sequential access only
- **Memory efficiency** - When working with large objects

\`\`\`python
# Linked list use cases
class TaskManager:
    def __init__(self):
        self.tasks = None  # Head of linked list

    def add_task(self, task):
        """Add task to end (efficient)."""
        new_node = Node(task)
        if not self.tasks:
            self.tasks = new_node
            return

        current = self.tasks
        while current.next:
            current = current.next
        current.next = new_node

    def complete_first_task(self):
        """Complete first task (efficient)."""
        if self.tasks:
            completed = self.tasks.data
            self.tasks = self.tasks.next
            return completed
        return None

manager = TaskManager()
manager.add_task("Write code")
manager.add_task("Test code")
manager.add_task("Deploy code")

print(f"Completed: {manager.complete_first_task()}")
\`\`\`

---

## 🚀 Hybrid Approaches

### **Dynamic Arrays (Like Python Lists)**
\`\`\`python
# Python lists are dynamic arrays
# They resize automatically and provide array benefits
dynamic_array = []

for i in range(10):
    dynamic_array.append(i * 10)

print(f"Dynamic array: {dynamic_array}")
print("Combines array benefits with dynamic sizing")
\`\`\`

### **Skip Lists**
\`\`\`python
# Advanced: Skip lists combine linked list flexibility with array-like access
# (Implementation would be complex, mentioned for completeness)
print("Skip lists: O(log n) search with linked list insertions")
\`\`\`

---

## 📊 Decision Guide

### **Choose Arrays When:**
- ✅ Need fast random access
- ✅ Size is relatively stable
- ✅ Memory is limited (no pointer overhead)
- ✅ Working with numerical data
- ✅ Cache performance is important

### **Choose Linked Lists When:**
- ✅ Frequent insertions/deletions in middle
- ✅ Size changes frequently
- ✅ No need for random access
- ✅ Working with large objects
- ✅ Need to implement custom data structures

### **Consider Python Lists When:**
- ✅ Need both dynamic sizing AND random access
- ✅ Simplicity is more important than optimization
- ✅ Working with general-purpose data

The choice depends on your specific performance requirements and access patterns! 🎯`
};
