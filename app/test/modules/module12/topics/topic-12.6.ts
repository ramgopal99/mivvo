import { SubLesson } from '../../../data/lessonsData';

export const topic_12_6: SubLesson = {
  id: 12.6,
  title: 'Heap Operations',
  status: 'demo',
  content: `# ⚙️ Heap Operations

Heaps support various operations for insertion, deletion, and manipulation. Let's explore each operation in detail with implementations and algorithms!

---

## 🔧 Basic Heap Operations

### **Insert Operation**
\`\`\`python
import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    def insert(self, item):
        """Insert item into heap."""
        heapq.heappush(self.heap, item)
        print(f"Inserted {item}. Heap: {self.heap}")

    def display(self):
        """Display current heap state."""
        print(f"Heap: {self.heap}")
        print(f"Min: {self.peek()}")

# Demonstrate insert operations
heap = MinHeap()
heap.insert(10)
heap.insert(5)
heap.insert(15)
heap.insert(3)
heap.display()
\`\`\`

### **Extract Min/Max Operation**
\`\`\`python
def extract_min(self):
    """Remove and return smallest item."""
    if self.is_empty():
        print("Heap is empty! Cannot extract.")
        return None

    min_item = heapq.heappop(self.heap)
    print(f"Extracted {min_item}. Heap: {self.heap}")
    return min_item

def peek(self):
    """Return smallest item without removing."""
    if self.is_empty():
        print("Heap is empty!")
        return None
    return self.heap[0]

def is_empty(self):
    """Check if heap is empty."""
    return len(self.heap) == 0

# Add to MinHeap class
MinHeap.extract_min = extract_min
MinHeap.peek = peek
MinHeap.is_empty = is_empty

# Demonstrate extract operations
heap = MinHeap()
for num in [10, 5, 15, 3, 8]:
    heap.insert(num)

print("Extracting minimums:")
while not heap.is_empty():
    heap.extract_min()
\`\`\`

---

## 🔍 Advanced Heap Operations

### **Size Operation**
\`\`\`python
def size(self):
    """Return number of elements in heap."""
    return len(self.heap)

# Add to MinHeap class
MinHeap.size = size

heap = MinHeap()
for i in range(5):
    heap.insert(i * 10)
    print(f"Size after insert {i}: {heap.size()}")

for i in range(3):
    heap.extract_min()
    print(f"Size after extract {i}: {heap.size()}")
\`\`\`

### **Contains Operation**
\`\`\`python
def contains(self, item):
    """Check if item is in heap."""
    return item in self.heap

# Add to MinHeap class
MinHeap.contains = contains

heap = MinHeap()
heap.insert(10)
heap.insert(20)
heap.insert(30)

print(f"Heap contains 20: {heap.contains(20)}")
print(f"Heap contains 40: {heap.contains(40)}")
\`\`\`

---

## 🎯 Heap Algorithm Examples

### **Kth Largest Element**
\`\`\`python
def find_kth_largest(nums, k):
    """Find kth largest element using min-heap."""
    if k > len(nums) or k < 1:
        return None

    # Min-heap to keep track of k largest elements
    heap = []

    for num in nums:
        if len(heap) < k:
            heapq.heappush(heap, num)
        elif num > heap[0]:
            heapq.heapreplace(heap, num)

    return heap[0] if heap else None

# Test
numbers = [3, 2, 1, 5, 6, 4]
k = 2
result = find_kth_largest(numbers, k)
print(f"{k}nd largest in {numbers}: {result}")

# Verify
sorted_nums = sorted(numbers, reverse=True)
print(f"Verification: {sorted_nums[k-1]}")
\`\`\`

### **Merge K Sorted Lists**
\`\`\`python
def merge_k_lists(lists):
    """Merge k sorted lists using heap."""
    if not lists:
        return []

    # Min-heap to track smallest element from each list
    heap = []
    result = []

    # Initialize heap with first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))  # (value, list_index, element_index)

    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)

        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))

    return result

# Test
list1 = [1, 4, 5]
list2 = [1, 3, 4]
list3 = [2, 6]

merged = merge_k_lists([list1, list2, list3])
print(f"Merged {len([list1, list2, list3])} sorted lists: {merged}")

# Verify sorted
print(f"Is sorted: {merged == sorted(merged)}")
\`\`\`

### **Running Median**
\`\`\`python
class MedianFinder:
    """Find running median using two heaps."""
    def __init__(self):
        self.max_heap = []  # Left half (smaller numbers)
        self.min_heap = []  # Right half (larger numbers)

    def add_number(self, num):
        """Add number and maintain balance."""
        # Add to max_heap (left)
        heapq.heappush(self.max_heap, -num)

        # Balance: move largest from left to right
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))

        # Ensure left heap has equal or one more element
        if len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def find_median(self):
        """Find current median."""
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        else:
            return (-self.max_heap[0] + self.min_heap[0]) / 2

# Test running median
mf = MedianFinder()
numbers = [5, 15, 1, 3, 2, 8, 7, 9, 10, 6, 11, 4]

print("Running median calculation:")
medians = []
for num in numbers:
    mf.add_number(num)
    median = mf.find_median()
    medians.append(median)
    print(f"Added {num}: median = {median}")

print(f"Final medians: {medians}")
\`\`\`

---

## 📊 Heap Performance Analysis

### **Time Complexity**
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| insert() | O(log n) | Heapify up |
| extract_min/max() | O(log n) | Heapify down |
| peek() | O(1) | Access root |
| is_empty()/size() | O(1) | Array operations |
| contains() | O(n) | Linear search |
| build_heap() | O(n) | Heapify all elements |

### **Space Complexity**
- **O(n)** where n is number of elements
- **Efficient** - Array representation, no extra pointers

---

## 🎨 Heap Applications in Depth

### **Dijkstra's Algorithm**
\`\`\`python
import heapq

def dijkstra(graph, start):
    """Find shortest paths using priority queue (heap)."""
    # Priority queue: (distance, node)
    pq = [(0, start)]
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    previous = {node: None for node in graph}

    while pq:
        current_distance, current_node = heapq.heappop(pq)

        # Skip if we found a better path already
        if current_distance > distances[current_node]:
            continue

        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous

# Graph: node -> {neighbor: weight}
graph = {
    'A': {'B': 4, 'C': 2},
    'B': {'A': 4, 'C': 1, 'D': 5},
    'C': {'A': 2, 'B': 1, 'D': 8, 'E': 10},
    'D': {'B': 5, 'C': 8, 'E': 2, 'F': 6},
    'E': {'C': 10, 'D': 2, 'F': 3},
    'F': {'D': 6, 'E': 3}
}

distances, _ = dijkstra(graph, 'A')
print("Shortest distances from A:")
for node, distance in distances.items():
    print(f"  {node}: {distance}")
\`\`\`

### **Prim's Minimum Spanning Tree**
\`\`\`python
def prim_mst(graph):
    """Find minimum spanning tree using heap."""
    if not graph:
        return []

    start_node = next(iter(graph))
    mst = []
    visited = set([start_node])

    # Priority queue: (weight, from_node, to_node)
    edges = [(weight, start_node, to_node)
             for to_node, weight in graph[start_node].items()]
    heapq.heapify(edges)

    while edges:
        weight, from_node, to_node = heapq.heappop(edges)

        if to_node in visited:
            continue

        # Add edge to MST
        mst.append((from_node, to_node, weight))
        visited.add(to_node)

        # Add new edges from this node
        for next_node, edge_weight in graph[to_node].items():
            if next_node not in visited:
                heapq.heappush(edges, (edge_weight, to_node, next_node))

    return mst

# Undirected graph
graph = {
    'A': {'B': 2, 'D': 6},
    'B': {'A': 2, 'C': 3, 'D': 8},
    'C': {'B': 3, 'E': 5},
    'D': {'A': 6, 'B': 8, 'E': 9},
    'E': {'C': 5, 'D': 9}
}

mst = prim_mst(graph)
total_weight = sum(weight for _, _, weight in mst)

print("Minimum Spanning Tree edges:")
for from_node, to_node, weight in mst:
    print(f"  {from_node} -- {to_node}: {weight}")
print(f"Total weight: {total_weight}")
\`\`\`

### **Event Scheduling**
\`\`\`python
class EventScheduler:
    """Schedule events using priority queue."""
    def __init__(self):
        self.events = []  # (time, event_name, callback)
        self.current_time = 0

    def schedule_event(self, time, event_name, callback=None):
        """Schedule event at specific time."""
        heapq.heappush(self.events, (time, event_name, callback))

    def run_simulation(self, max_time):
        """Run simulation until max_time."""
        results = []

        while self.events and self.events[0][0] <= max_time:
            event_time, event_name, callback = heapq.heappop(self.events)
            self.current_time = event_time

            result = f"Time {event_time}: {event_name}"
            if callback:
                callback_result = callback()
                result += f" -> {callback_result}"

            results.append(result)

        return results

# Simulation
def user_login():
    return "User logged in"

def process_payment():
    return "Payment processed"

def send_notification():
    return "Notification sent"

scheduler = EventScheduler()
scheduler.schedule_event(5, "User login", user_login)
scheduler.schedule_event(10, "Process payment", process_payment)
scheduler.schedule_event(15, "Send notification", send_notification)
scheduler.schedule_event(8, "Cache cleanup")

events = scheduler.run_simulation(20)
print("Simulation events:")
for event in events:
    print(f"  {event}")
\`\`\`

---

## 🚀 Advanced Heap Concepts

### **Fibonacci Heap (Theoretical)**
\`\`\`python
# Fibonacci heaps provide better amortized performance
# O(1) insert, O(1) decrease-key, O(log n) extract-min
# Complex implementation, used in advanced algorithms

print("Fibonacci heaps offer better theoretical bounds")
print("but are rarely used due to implementation complexity")
\`\`\`

### **Binomial Heap**
\`\`\`python
# Binomial heaps allow O(1) merge operations
# Good for algorithms that frequently merge heaps

print("Binomial heaps: efficient for union operations")
\`\`\`

### **Heap with Custom Comparator**
\`\`\`python
import heapq

class CustomHeap:
    """Heap with custom comparison."""
    def __init__(self, key_func=lambda x: x):
        self.heap = []
        self.key_func = key_func

    def push(self, item):
        heapq.heappush(self.heap, (self.key_func(item), item))

    def pop(self):
        return heapq.heappop(self.heap)[1] if self.heap else None

    def peek(self):
        return self.heap[0][1] if self.heap else None

# Heap sorted by string length
length_heap = CustomHeap(key_func=len)
length_heap.push("a")
length_heap.push("bbb")
length_heap.push("cc")

print("Heap by length:")
while True:
    item = length_heap.pop()
    if item is None:
        break
    print(f"  '{item}' (length {len(item)})")
\`\`\`

---

## ✅ Best Practices

1. **Use heapq for simple cases** - Efficient and standard library
2. **Implement custom heaps when needed** - For complex comparisons
3. **Choose appropriate heap type** - Min-heap for smallest first, max-heap for largest first
4. **Consider heapify for bulk operations** - More efficient than individual inserts
5. **Use heaps for priority-based algorithms** - Natural fit for scheduling problems

Heap operations provide efficient priority-based access and are fundamental to many algorithms! 🏔️`
};
