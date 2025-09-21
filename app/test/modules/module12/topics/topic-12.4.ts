import { SubLesson } from '../../../data/lessonsData';

export const topic_12_4: SubLesson = {
  id: 12.4,
  title: 'Queue Operations',
  status: 'demo',
  content: `# ⚙️ Queue Operations

Queues support various operations for adding, removing, and inspecting elements. Let's explore each operation with implementations and examples!

---

## 🔧 Basic Queue Operations

### **Enqueue Operation**
\`\`\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        """Add item to rear of queue."""
        self.items.append(item)
        print(f"Enqueued {item}. Queue: {list(self.items)}")

    def display(self):
        """Display current queue state."""
        print(f"Queue: {list(self.items)}")
        print(f"Front: {self.front()}, Rear: {self.rear()}")

# Demonstrate enqueue operations
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
queue.display()
\`\`\`

### **Dequeue Operation**
\`\`\`python
def dequeue(self):
    """Remove and return item from front of queue."""
    if self.is_empty():
        print("Queue is empty! Cannot dequeue.")
        return None

    dequeued_item = self.items.popleft()
    print(f"Dequeued {dequeued_item}. Queue: {list(self.items)}")
    return dequeued_item

# Add to Queue class
Queue.dequeue = dequeue

# Demonstrate dequeue operations
queue = Queue()
for i in [10, 20, 30, 40]:
    queue.enqueue(i)

print("Dequeuing elements:")
while not queue.is_empty():
    queue.dequeue()
\`\`\`

### **Front and Rear Operations**
\`\`\`python
def front(self):
    """Return front item without removing it."""
    if self.is_empty():
        print("Queue is empty!")
        return None
    return self.items[0]

def rear(self):
    """Return rear item without removing it."""
    if self.is_empty():
        print("Queue is empty!")
        return None
    return self.items[-1]

def is_empty(self):
    """Check if queue is empty."""
    return len(self.items) == 0

# Add to Queue class
Queue.front = front
Queue.rear = rear
Queue.is_empty = is_empty

# Demonstrate front and rear
queue = Queue()
queue.enqueue("A")
queue.enqueue("B")
queue.enqueue("C")

print(f"Front element: {queue.front()}")
print(f"Rear element: {queue.rear()}")
print(f"Queue still has: {list(queue.items)}")
\`\`\`

---

## 🔍 Advanced Queue Operations

### **Size Operation**
\`\`\`python
def size(self):
    """Return number of elements in queue."""
    return len(self.items)

# Add to Queue class
Queue.size = size

queue = Queue()
for i in range(5):
    queue.enqueue(f"item_{i}")
    print(f"Size after enqueue {i}: {queue.size()}")

for i in range(3):
    queue.dequeue()
    print(f"Size after dequeue {i}: {queue.size()}")
\`\`\`

### **Contains Operation**
\`\`\`python
def contains(self, item):
    """Check if item is in queue."""
    return item in self.items

# Add to Queue class
Queue.contains = contains

queue = Queue()
queue.enqueue("apple")
queue.enqueue("banana")
queue.enqueue("cherry")

print(f"Queue contains 'banana': {queue.contains('banana')}")
print(f"Queue contains 'grape': {queue.contains('grape')}")
\`\`\`

---

## 🎯 Queue Algorithm Examples

### **Josephus Problem**
\`\`\`python
def josephus_problem(n, k):
    """Solve Josephus problem using queue."""
    queue = deque(range(1, n + 1))  # People numbered 1 to n

    while len(queue) > 1:
        # Skip k-1 people
        for _ in range(k - 1):
            queue.append(queue.popleft())

        # Remove k-th person
        eliminated = queue.popleft()
        print(f"Eliminated: {eliminated}, Remaining: {list(queue)}")

    return queue[0]

# n people, every k-th person eliminated
print(f"Last survivor (n=7, k=3): {josephus_problem(7, 3)}")
\`\`\`

### **Sliding Window Maximum**
\`\`\`python
from collections import deque

def sliding_window_maximum(arr, k):
    """Find maximum in each sliding window of size k."""
    if not arr or k == 0:
        return []

    result = []
    window = deque()  # Store indices, front always has max

    for i in range(len(arr)):
        # Remove elements outside current window
        while window and window[0] <= i - k:
            window.popleft()

        # Remove smaller elements from back
        while window and arr[window[-1]] <= arr[i]:
            window.pop()

        # Add current element index
        window.append(i)

        # Add to result when window is complete
        if i >= k - 1:
            result.append(arr[window[0]])

    return result

# Test with array
numbers = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
maxima = sliding_window_maximum(numbers, k)

print(f"Array: {numbers}")
print(f"Sliding window maxima (k={k}): {maxima}")
\`\`\`

### **Queue Reversal**
\`\`\`python
def reverse_queue(queue):
    """Reverse elements in queue using stack."""
    stack = []

    # Dequeue all elements to stack
    while queue:
        stack.append(queue.popleft())

    # Enqueue back to queue (reversed order)
    while stack:
        queue.append(stack.pop())

    return queue

# Test queue reversal
original = deque([1, 2, 3, 4, 5])
print(f"Original queue: {list(original)}")

reversed_queue = reverse_queue(original.copy())
print(f"Reversed queue: {list(reversed_queue)}")
\`\`\`

---

## 📊 Queue Performance Analysis

### **Time Complexity**
| Operation | Deque Implementation | List Implementation |
|-----------|----------------------|-------------------|
| enqueue() | O(1) | O(1) |
| dequeue() | O(1) | O(n) |
| front() | O(1) | O(1) |
| rear() | O(1) | O(1) |
| is_empty() | O(1) | O(1) |
| size() | O(1) | O(1) |
| contains() | O(n) | O(n) |

### **Space Complexity**
- **O(n)** where n is number of elements
- **Minimal overhead** - just the deque/list

---

## 🎨 Queue Applications in Depth

### **Level Order Tree Traversal**
\`\`\`python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def level_order_traversal(root):
    """Traverse binary tree level by level using queue."""
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.value)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result

# Create sample tree
#       1
#      / \
#     2   3
#    / \   \
#   4   5   6
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.right.right = TreeNode(6)

levels = level_order_traversal(root)
print("Level order traversal:")
for i, level in enumerate(levels):
    print(f"  Level {i}: {level}")
\`\`\`

### **Web Crawler (Simplified)**
\`\`\`python
class WebCrawler:
    def __init__(self):
        self.visited = set()
        self.to_visit = deque()

    def add_url(self, url):
        """Add URL to crawl queue."""
        if url not in self.visited:
            self.to_visit.append(url)

    def crawl_next(self):
        """Crawl next URL in queue."""
        if not self.to_visit:
            return None

        url = self.to_visit.popleft()
        if url in self.visited:
            return self.crawl_next()  # Skip if already visited

        self.visited.add(url)

        # Simulate finding links on page
        links_found = self.simulate_crawl(url)
        for link in links_found:
            if link not in self.visited:
                self.to_visit.append(link)

        return url

    def simulate_crawl(self, url):
        """Simulate finding links on a page."""
        # Mock link finding
        mock_links = {
            "home": ["about", "products"],
            "about": ["contact"],
            "products": ["product1", "product2"],
            "contact": [],
            "product1": ["products"],
            "product2": ["products"]
        }
        return mock_links.get(url, [])

# Simulate web crawling
crawler = WebCrawler()
crawler.add_url("home")

print("Crawling order:")
for _ in range(10):  # Limit iterations
    page = crawler.crawl_next()
    if page:
        print(f"  Crawled: {page}")
    else:
        break

print(f"Total pages crawled: {len(crawler.visited)}")
\`\`\`

### **Job Scheduler with Priorities**
\`\`\`python
import heapq
from collections import deque

class PriorityQueue:
    """Queue with priority support."""
    def __init__(self):
        self.queue = []
        self.entry_count = 0  # Handle same priority items

    def enqueue(self, item, priority=1):
        """Add item with priority (lower number = higher priority)."""
        heapq.heappush(self.queue, (priority, self.entry_count, item))
        self.entry_count += 1

    def dequeue(self):
        """Remove and return highest priority item."""
        if self.queue:
            return heapq.heappop(self.queue)[2]
        return None

    def peek(self):
        """Return highest priority item without removing."""
        if self.queue:
            return self.queue[0][2]
        return None

    def is_empty(self):
        return len(self.queue) == 0

    def size(self):
        return len(self.queue)

# Job scheduler simulation
scheduler = PriorityQueue()

# Add jobs with priorities (1 = highest, 3 = lowest)
scheduler.enqueue("Fix critical bug", priority=1)
scheduler.enqueue("Write documentation", priority=3)
scheduler.enqueue("Code review", priority=2)
scheduler.enqueue("Deploy to production", priority=1)

print("Processing jobs by priority:")
while not scheduler.is_empty():
    job = scheduler.dequeue()
    print(f"  Processing: {job}")
\`\`\`

---

## 🚀 Advanced Queue Concepts

### **Circular Queue**
\`\`\`python
class CircularQueue:
    """Fixed-size circular queue."""
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = -1
        self.rear = -1
        self.size = 0

    def enqueue(self, item):
        """Add item to circular queue."""
        if self.size == self.capacity:
            print("Queue is full!")
            return False

        # Move rear pointer
        self.rear = (self.rear + 1) % self.capacity

        if self.front == -1:  # First element
            self.front = self.rear

        self.queue[self.rear] = item
        self.size += 1
        return True

    def dequeue(self):
        """Remove item from circular queue."""
        if self.size == 0:
            print("Queue is empty!")
            return None

        item = self.queue[self.front]
        self.queue[self.front] = None

        if self.front == self.rear:  # Last element
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity

        self.size -= 1
        return item

    def display(self):
        """Display circular queue."""
        if self.size == 0:
            print("Queue is empty")
            return

        print("Circular Queue:", end=" ")
        i = self.front
        for _ in range(self.size):
            print(self.queue[i], end=" ")
            i = (i + 1) % self.capacity
        print()

# Test circular queue
cq = CircularQueue(5)
for i in range(6):  # Try to add 6 items to capacity 5
    success = cq.enqueue(f"item_{i}")
    print(f"Added item_{i}: {success}")

cq.display()

for _ in range(3):
    removed = cq.dequeue()
    print(f"Removed: {removed}")

cq.display()
\`\`\`

### **Double-Ended Queue (Deque) Operations**
\`\`\`python
# Deque supports operations from both ends
deque_queue = deque()

# Add to both ends
deque_queue.append(1)      # Rear
deque_queue.appendleft(0)  # Front
deque_queue.append(2)      # Rear

print(f"Deque: {list(deque_queue)}")

# Remove from both ends
print(f"Pop right: {deque_queue.pop()}")      # Rear
print(f"Pop left: {deque_queue.popleft()}")   # Front
print(f"Remaining: {list(deque_queue)}")

# Peek both ends
deque_queue.append(3)
deque_queue.appendleft(4)
print(f"Left end: {deque_queue[0]}, Right end: {deque_queue[-1]}")
\`\`\`

---

## ✅ Best Practices

1. **Use deque for efficient operations** - O(1) enqueue and dequeue
2. **Handle empty queue conditions** - Always check before dequeue
3. **Consider bounded queues** - Prevent memory issues
4. **Use appropriate data structures** - PriorityQueue for priorities, CircularQueue for fixed size
5. **Implement thread safety** - Use queue.Queue for concurrent access

Queue operations are fundamental to ordered processing and sequential algorithms! 📋`
};
