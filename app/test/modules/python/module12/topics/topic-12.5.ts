import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_5: SubLesson = {
  id: "12.5",
  title: 'What are Heaps?',
  status: 'demo',
  content: `# 🏔️ What are Heaps?

Heaps are specialized tree-based data structures that satisfy the **heap property**. They enable efficient access to the minimum or maximum element and are the foundation of priority queues!

---

## 🎯 What is a Heap?

A **heap** is a complete binary tree where each node satisfies the **heap property**:
- **Max Heap**: Parent ≥ children (root is maximum)
- **Min Heap**: Parent ≤ children (root is minimum)

\`\`\`python
# Max Heap Example:
#        10
#       /  \
#      8    9
#     / \  / \
#    4  7 5  6

# Min Heap Example:
#        4
#       / \
#      8   9
#     / \ / \
#    10 7 5  6
\`\`\`

---

## 🏗️ Heap Operations

### **Core Operations**
\`\`\`python
import heapq

class MaxHeap:
    """Max heap implementation (Python's heapq is min-heap, so we negate)."""
    def __init__(self):
        self.heap = []

    def push(self, item):
        """Add item to heap."""
        heapq.heappush(self.heap, -item)  # Negate for max-heap

    def pop(self):
        """Remove and return largest item."""
        if self.heap:
            return -heapq.heappop(self.heap)
        return None

    def peek(self):
        """Return largest item without removing."""
        if self.heap:
            return -self.heap[0]
        return None

    def size(self):
        """Return number of items."""
        return len(self.heap)

    def is_empty(self):
        """Check if heap is empty."""
        return len(self.heap) == 0

# Usage
max_heap = MaxHeap()
max_heap.push(5)
max_heap.push(3)
max_heap.push(8)
max_heap.push(1)

print(f"Max heap size: {max_heap.size()}")
print(f"Largest item: {max_heap.peek()}")
print(f"Popped: {max_heap.pop()}")
print(f"New largest: {max_heap.peek()}")
\`\`\`

### **Using Python's heapq (Min Heap)**
\`\`\`python
import heapq

# Min heap (natural for heapq)
min_heap = []

heapq.heappush(min_heap, 5)
heapq.heappush(min_heap, 3)
heapq.heappush(min_heap, 8)
heapq.heappush(min_heap, 1)

print(f"Min heap: {min_heap}")
print(f"Smallest: {min_heap[0]}")
print(f"Pop smallest: {heapq.heappop(min_heap)}")
print(f"New smallest: {min_heap[0] if min_heap else 'Empty'}")
\`\`\`

---

## 🌳 Heap Properties

### **Complete Binary Tree**
\`\`\`python
# Heaps are complete - all levels filled except possibly last
# Can be represented as array where:
# - Root: index 0
# - Left child of i: 2*i + 1
# - Right child of i: 2*i + 2
# - Parent of i: (i-1)//2

def show_heap_structure(heap):
    """Show heap as tree structure."""
    if not heap:
        print("Empty heap")
        return

    def print_tree(index, level=0):
        if index < len(heap):
            indent = "  " * level
            print(f"{indent}{heap[index]}")
            print_tree(2*index + 1, level + 1)  # Left
            print_tree(2*index + 2, level + 1)  # Right

    print_tree(0)

# Example heap as array
heap_array = [10, 8, 9, 4, 7, 5, 6]
print("Heap structure:")
show_heap_structure(heap_array)
\`\`\`

### **Heap Property Maintenance**
\`\`\`python
def heapify_up(heap, index):
    """Maintain heap property by bubbling up."""
    parent = (index - 1) // 2
    if index > 0 and heap[index] < heap[parent]:  # For min-heap
        heap[index], heap[parent] = heap[parent], heap[index]
        heapify_up(heap, parent)

def heapify_down(heap, index, size):
    """Maintain heap property by bubbling down."""
    smallest = index
    left = 2 * index + 1
    right = 2 * index + 2

    # Find smallest among root, left, right
    if left < size and heap[left] < heap[smallest]:
        smallest = left
    if right < size and heap[right] < heap[smallest]:
        smallest = right

    # Swap and continue if needed
    if smallest != index:
        heap[index], heap[smallest] = heap[smallest], heap[index]
        heapify_down(heap, smallest, size)

# Example of heapify operations
test_heap = [3, 8, 5, 10, 12, 7]
print(f"Before heapify: {test_heap}")
heapify_down(test_heap, 0, len(test_heap))
print(f"After heapify down: {test_heap}")
\`\`\`

---

## 📊 Heap Performance

### **Time Complexity**
- **Insert**: O(log n) - Bubble up to correct position
- **Extract Min/Max**: O(log n) - Remove root and heapify
- **Peek**: O(1) - Just return root
- **Build Heap**: O(n) - Heapify all elements
- **Search**: O(n) - Must check all elements

### **Space Complexity**
- **O(n)** - Store all elements in array
- **Efficient** - No extra pointers needed

---

## 🔧 Heap Implementation Options

### **Manual Implementation**
\`\`\`python
class MinHeap:
    """Complete min-heap implementation."""
    def __init__(self):
        self.heap = []

    def push(self, item):
        """Insert item and maintain heap property."""
        self.heap.append(item)
        self._heapify_up(len(self.heap) - 1)

    def pop(self):
        """Remove and return smallest item."""
        if self.is_empty():
            return None

        if len(self.heap) == 1:
            return self.heap.pop()

        # Swap root with last, remove last, heapify down
        root = self.heap[0]
        self.heap[0] = self.heap.pop()
        self._heapify_down(0)

        return root

    def peek(self):
        """Return smallest item without removing."""
        return self.heap[0] if self.heap else None

    def _heapify_up(self, index):
        """Bubble up to maintain heap property."""
        parent = (index - 1) // 2
        if index > 0 and self.heap[index] < self.heap[parent]:
            self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
            self._heapify_up(parent)

    def _heapify_down(self, index):
        """Bubble down to maintain heap property."""
        size = len(self.heap)
        smallest = index
        left = 2 * index + 1
        right = 2 * index + 2

        if left < size and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < size and self.heap[right] < self.heap[smallest]:
            smallest = right

        if smallest != index:
            self.heap[index], self.heap[smallest] = self.heap[smallest], self.heap[index]
            self._heapify_down(smallest)

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

    def display(self):
        """Display heap array."""
        print(f"Heap: {self.heap}")

# Test manual heap
manual_heap = MinHeap()
for num in [8, 3, 7, 1, 9, 4, 2]:
    manual_heap.push(num)

print("Manual heap after insertions:")
manual_heap.display()

print("Extracting minimums:")
while not manual_heap.is_empty():
    print(f"  Extracted: {manual_heap.pop()}")
\`\`\`

### **Using heapq Module**
\`\`\`python
import heapq

# heapq provides efficient min-heap operations
heap = []

# Add items
heapq.heappush(heap, 8)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

print(f"heapq heap: {heap}")
print(f"Smallest: {heap[0]}")
print(f"Pop smallest: {heapq.heappop(heap)}")

# Build heap from list
numbers = [8, 3, 7, 1, 9, 4, 2]
heapq.heapify(numbers)
print(f"Heapified list: {numbers}")

# Get n smallest/largest
data = [1, 8, 3, 7, 9, 4, 2, 6, 5]
print(f"3 smallest: {heapq.nsmallest(3, data)}")
print(f"3 largest: {heapq.nlargest(3, data)}")
\`\`\`

---

## 🎯 Heap Applications

### **Priority Queue**
\`\`\`python
class PriorityQueue:
    """Priority queue using heap."""
    def __init__(self):
        self.heap = []
        self.entry_count = 0  # Handle same priority items

    def push(self, item, priority=1):
        """Add item with priority (lower = higher priority)."""
        heapq.heappush(self.heap, (priority, self.entry_count, item))
        self.entry_count += 1

    def pop(self):
        """Remove and return highest priority item."""
        if self.heap:
            return heapq.heappop(self.heap)[2]
        return None

    def peek(self):
        """Return highest priority item without removing."""
        if self.heap:
            return self.heap[0][2]
        return None

    def is_empty(self):
        return len(self.heap) == 0

# Task scheduler
pq = PriorityQueue()
pq.push("Fix critical bug", priority=1)      # High priority
pq.push("Write documentation", priority=3)  # Low priority
pq.push("Code review", priority=2)          # Medium priority

print("Processing tasks by priority:")
while not pq.is_empty():
    task = pq.pop()
    print(f"  {task}")
\`\`\`

### **Heap Sort Algorithm**
\`\`\`python
def heap_sort(arr):
    """Sort array using heap sort."""
    # Build max heap (in-place)
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)

    n = len(arr)

    # Build heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # Swap
        heapify(arr, i, 0)

    return arr

# Test heap sort
unsorted = [12, 11, 13, 5, 6, 7]
print(f"Before heap sort: {unsorted}")
sorted_arr = heap_sort(unsorted.copy())
print(f"After heap sort: {sorted_arr}")
\`\`\`

### **K Largest/Smallest Elements**
\`\`\`python
def find_k_largest(nums, k):
    """Find k largest elements using min-heap."""
    if k >= len(nums):
        return sorted(nums, reverse=True)

    # Min-heap to keep track of k largest
    heap = []

    for num in nums:
        if len(heap) < k:
            heapq.heappush(heap, num)
        elif num > heap[0]:
            heapq.heapreplace(heap, num)

    return sorted(heap, reverse=True)

def find_k_smallest(nums, k):
    """Find k smallest elements using max-heap."""
    if k >= len(nums):
        return sorted(nums)

    # Max-heap to keep track of k smallest (negate values)
    heap = []

    for num in nums:
        if len(heap) < k:
            heapq.heappush(heap, -num)  # Negate for max-heap
        elif -num > heap[0]:
            heapq.heapreplace(heap, -num)

    return sorted([-x for x in heap])  # Negate back

# Test
numbers = [3, 2, 1, 13, 12, 11, 7, 8, 9, 10, 4, 5, 6]
k = 3

print(f"Array: {numbers}")
print(f"{k} largest: {find_k_largest(numbers, k)}")
print(f"{k} smallest: {find_k_smallest(numbers, k)}")
\`\`\`

---

## ⚖️ Heap vs Other Structures

| Operation | Heap | Sorted Array | Unsorted Array |
|-----------|------|--------------|----------------|
| Find Min/Max | O(1) | O(1) | O(n) |
| Insert | O(log n) | O(n) | O(1) |
| Delete Min/Max | O(log n) | O(n) | O(n) |
| Search | O(n) | O(log n) | O(n) |
| Build | O(n) | O(n log n) | O(1) |

### **When to Use Heaps**
- **Priority queues** - Need to access min/max frequently
- **Scheduling algorithms** - Tasks with priorities
- **Graph algorithms** - Dijkstra's, Prim's algorithms
- **K largest/smallest** - Efficient selection
- **Median maintenance** - Running median calculations

---

## 🚀 Heap Implementation Best Practices

### **Choose Right Heap Type**
\`\`\`python
# Min-heap for smallest first
min_heap = []

# Max-heap by negating (or use custom class)
max_heap = []  # Push -value, pop -value

# Priority queue with custom priorities
import heapq

class TaskQueue:
    def __init__(self):
        self.tasks = []
        self.entry_count = 0

    def add_task(self, task, priority):
        heapq.heappush(self.tasks, (priority, self.entry_count, task))
        self.entry_count += 1

    def get_next_task(self):
        return heapq.heappop(self.tasks)[2] if self.tasks else None

task_queue = TaskQueue()
task_queue.add_task("urgent_bug", 1)
task_queue.add_task("feature", 3)
task_queue.add_task("cleanup", 2)

print(f"Next task: {task_queue.get_next_task()}")
\`\`\`

### **Heap Construction**
\`\`\`python
# Efficient heap construction
data = [3, 1, 6, 5, 2, 4]

# Method 1: Push each element (O(n log n))
heap1 = []
for item in data:
    heapq.heappush(heap1, item)

# Method 2: Use heapify (O(n))
heap2 = data.copy()
heapq.heapify(heap2)

print(f"Heap from pushes: {heap1}")
print(f"Heap from heapify: {heap2}")
print("heapify is more efficient for initial construction!")
\`\`\`

Heaps are powerful for priority-based operations and efficient min/max access! 🏔️`
};

