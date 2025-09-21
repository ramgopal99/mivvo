import { SubLesson } from '../../../data/lessonsData';

export const topic_12_3: SubLesson = {
  id: 12.3,
  title: 'What are Queues?',
  status: 'demo',
  content: `# 📋 What are Queues?

Queues are fundamental data structures that follow the **First In, First Out (FIFO)** principle. Think of them as a line at a store - the first person in line is the first to be served!

---

## 🎯 What is a Queue?

A **queue** is a linear data structure that allows operations at two ends:
- **Enqueue** (add) at the **rear/back**
- **Dequeue** (remove) from the **front**

\`\`\`python
# Visual representation of queue operations
# Queue: [1, 2, 3]  <- Front is 1, Rear is 3
# Enqueue 4: [1, 2, 3, 4]  <- Rear is now 4
# Dequeue: [2, 3, 4]  <- Front is now 2
\`\`\`

---

## 🏗️ Queue Operations

### **Core Operations**
\`\`\`python
class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        """Add item to rear of queue."""
        self.items.append(item)

    def dequeue(self):
        """Remove and return item from front of queue."""
        if not self.is_empty():
            return self.items.pop(0)
        return None

    def front(self):
        """Return front item without removing it."""
        if not self.is_empty():
            return self.items[0]
        return None

    def rear(self):
        """Return rear item without removing it."""
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        """Check if queue is empty."""
        return len(self.items) == 0

    def size(self):
        """Return number of items in queue."""
        return len(self.items)

# Usage
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)

print(f"Queue size: {queue.size()}")
print(f"Front item: {queue.front()}")
print(f"Rear item: {queue.rear()}")
print(f"Dequeued: {queue.dequeue()}")
print(f"New front: {queue.front()}")
\`\`\`

---

## 🎨 Queue Analogy

### **Real-World Examples**
\`\`\`python
# Print queue simulation
class PrintQueue:
    def __init__(self):
        self.queue = Queue()

    def add_print_job(self, document_name, user):
        """Add document to print queue."""
        job = {"document": document_name, "user": user, "timestamp": "2024-01-15"}
        self.queue.enqueue(job)
        print(f"Added print job: {document_name} for {user}")

    def process_print_job(self):
        """Process next print job."""
        if not self.queue.is_empty():
            job = self.queue.dequeue()
            print(f"Printing: {job['document']} for {job['user']}")
            return job
        else:
            print("No print jobs in queue")
            return None

    def show_queue(self):
        """Show current print queue."""
        if self.queue.is_empty():
            print("Print queue is empty")
        else:
            print("Current print queue:")
            for i, job in enumerate(self.queue.items):
                status = "NEXT" if i == 0 else f"Position {i+1}"
                print(f"  {status}: {job['document']} ({job['user']})")

# Simulate print queue
printer = PrintQueue()
printer.add_print_job("report.pdf", "alice")
printer.add_print_job("presentation.pptx", "bob")
printer.add_print_job("resume.docx", "charlie")

printer.show_queue()
printer.process_print_job()
printer.process_print_job()
printer.show_queue()
\`\`\`

---

## 📊 Queue Properties

### **FIFO Principle**
\`\`\`python
# First In, First Out
queue = Queue()

# Enqueue order: A, B, C
queue.enqueue("A")
queue.enqueue("B")
queue.enqueue("C")

# Dequeue order: A, B, C (same as enqueue order)
while not queue.is_empty():
    print(f"Dequeued: {queue.dequeue()}")
\`\`\`

### **Time Complexity**
- **Enqueue**: O(1) - Add to end of list
- **Dequeue**: O(n) - Remove from beginning (list shift)
- **Front/Rear**: O(1) - Access first/last element
- **is_empty/size**: O(1) - List length operations

---

## 🔧 Queue Implementation Options

### **Using Python List (Simple but Inefficient)**
\`\`\`python
# Basic implementation - dequeue is O(n)
class ListQueue:
    def __init__(self):
        self._items = []

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        return self._items.pop(0) if self._items else None

    def front(self):
        return self._items[0] if self._items else None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

print("List implementation: Simple but dequeue is O(n)")
\`\`\`

### **Using collections.deque (Efficient)**
\`\`\`python
from collections import deque

class DequeQueue:
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)  # O(1)

    def dequeue(self):
        return self._items.popleft() if self._items else None  # O(1)

    def front(self):
        return self._items[0] if self._items else None

    def rear(self):
        return self._items[-1] if self._items else None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

print("Deque implementation: Both enqueue and dequeue are O(1)")
\`\`\`

---

## 🎯 Queue Applications

### **Task Scheduling**
\`\`\`python
from collections import deque

class TaskScheduler:
    def __init__(self):
        self.task_queue = deque()

    def add_task(self, task_name, priority=1):
        """Add task to queue (higher priority = lower number)."""
        task = {"name": task_name, "priority": priority}
        self.task_queue.append(task)

    def get_next_task(self):
        """Get highest priority task."""
        if not self.task_queue:
            return None

        # Find highest priority task (lowest priority number)
        highest_priority_idx = 0
        for i, task in enumerate(self.task_queue):
            if task["priority"] < self.task_queue[highest_priority_idx]["priority"]:
                highest_priority_idx = i

        # Remove and return task
        task = self.task_queue[highest_priority_idx]
        del self.task_queue[highest_priority_idx]
        return task

# Usage
scheduler = TaskScheduler()
scheduler.add_task("Check emails", priority=3)
scheduler.add_task("Fix critical bug", priority=1)
scheduler.add_task("Write documentation", priority=2)

print("Processing tasks by priority:")
while True:
    task = scheduler.get_next_task()
    if task:
        print(f"Processing: {task['name']} (priority {task['priority']})")
    else:
        break
\`\`\`

### **Breadth-First Search (BFS)**
\`\`\`python
# BFS uses queue to visit nodes level by level
def bfs(graph, start_node):
    """Breadth-first search using queue."""
    visited = set()
    queue = deque([start_node])
    visited.add(start_node)
    result = []

    while queue:
        current = queue.popleft()
        result.append(current)

        # Add unvisited neighbors to queue
        for neighbor in graph.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Graph representation
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(f"BFS traversal: {bfs(graph, 'A')}")
\`\`\`

### **Message Queue System**
\`\`\`python
class MessageQueue:
    def __init__(self):
        self.queue = deque()
        self.max_size = 100

    def send_message(self, message, sender):
        """Send message to queue."""
        if len(self.queue) >= self.max_size:
            print("Queue full! Message dropped.")
            return False

        msg = {
            "content": message,
            "sender": sender,
            "timestamp": "2024-01-15T10:00:00"
        }
        self.queue.append(msg)
        print(f"Message queued from {sender}")
        return True

    def receive_message(self):
        """Receive next message."""
        if self.queue:
            msg = self.queue.popleft()
            print(f"Message received from {msg['sender']}: {msg['content']}")
            return msg
        return None

    def peek_message(self):
        """Peek at next message without removing."""
        return self.queue[0] if self.queue else None

# Simulate messaging
mq = MessageQueue()
mq.send_message("Hello!", "alice")
mq.send_message("How are you?", "bob")
mq.send_message("Meeting at 3pm", "manager")

while True:
    msg = mq.receive_message()
    if not msg:
        break
\`\`\`

---

## ⚖️ Queue vs Other Structures

| Operation | Queue | Stack | List |
|-----------|-------|-------|------|
| Add item | O(1) | O(1) | O(1) or O(n) |
| Remove item | O(1)* | O(1) | O(1) or O(n) |
| Access middle | O(n) | O(n) | O(1) |
| Memory | O(n) | O(n) | O(n) |
| Ordering | FIFO | LIFO | Random |

*O(1) with deque, O(n) with list

### **When to Use Queues**
- **Task scheduling** - Process requests in order
- **BFS algorithms** - Level-order traversal
- **Message systems** - Process messages in arrival order
- **Print queues** - Handle jobs sequentially
- **Event processing** - Handle events in chronological order

---

## 🚀 Queue Implementation Best Practices

### **Choose Right Underlying Structure**
\`\`\`python
# For simple queues with small size: use list
simple_queue = []

# For efficient operations: use deque
from collections import deque
efficient_queue = deque()

# For bounded queues: implement size limit
class BoundedQueue:
    def __init__(self, max_size):
        self._items = deque()
        self._max_size = max_size

    def enqueue(self, item):
        if len(self._items) < self._max_size:
            self._items.append(item)
            return True
        return False  # Queue full

bounded_queue = BoundedQueue(3)
for i in range(5):
    success = bounded_queue.enqueue(f"item_{i}")
    print(f"Added item_{i}: {success}")
\`\`\`

### **Thread-Safe Queues**
\`\`\`python
import queue
import threading

# Python's thread-safe queue
thread_queue = queue.Queue(maxsize=10)

def producer():
    for i in range(5):
        thread_queue.put(f"item_{i}")
        print(f"Produced item_{i}")

def consumer():
    while True:
        try:
            item = thread_queue.get(timeout=1)
            print(f"Consumed {item}")
            thread_queue.task_done()
        except queue.Empty:
            break

# Start producer and consumer threads
producer_thread = threading.Thread(target=producer)
consumer_thread = threading.Thread(target=consumer)

producer_thread.start()
producer_thread.join()
consumer_thread.start()
consumer_thread.join()

print("Thread-safe queue operations completed")
\`\`\`

Queues are essential for ordered processing and sequential operations! 📋`
};
