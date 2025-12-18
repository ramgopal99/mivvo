import { Exercise } from '../../../data/lessonsData';

export const exercise_12_8: Exercise = {
  id: 12.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement a Stack with additional functionality:\n1. Create a Stack class with push, pop, peek, and is_empty methods\n2. Add a method to get the minimum element in O(1) time\n3. Implement a method to sort the stack using only stack operations\n4. Add bounds checking and error handling\n5. Demonstrate all operations with sample data",
      solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # Parallel stack to track minimums

    def push(self, val):
        self.stack.append(val)
        # Push to min_stack: either the new value or current min
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
        else:
            self.min_stack.append(self.min_stack[-1])

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        self.min_stack.pop()
        return self.stack.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.stack[-1]

    def get_min(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.min_stack[-1]

    def is_empty(self):
        return len(self.stack) == 0

    def size(self):
        return len(self.stack)

    def sort_stack(self):
        """Sort stack in ascending order using only stack operations"""
        temp_stack = []

        while self.stack:
            # Pop from main stack
            temp = self.pop()

            # Move elements from temp_stack back to main stack
            # that are smaller than temp
            while temp_stack and temp_stack[-1] < temp:
                self.push(temp_stack.pop())

            # Push temp to temp_stack
            temp_stack.append(temp)

        # Move all elements back to main stack
        while temp_stack:
            self.push(temp_stack.pop())

# Test the MinStack
print("MinStack Operations:")
min_stack = MinStack()

# Push elements
elements = [3, 5, 2, 1, 4, -1]
for elem in elements:
    min_stack.push(elem)
    print(f"Pushed {elem}, Current min: {min_stack.get_min()}")

print(f"\nStack size: {min_stack.size()}")
print(f"Top element: {min_stack.peek()}")

# Pop some elements
print("\nPopping elements:")
for _ in range(3):
    popped = min_stack.pop()
    print(f"Popped {popped}, Current min: {min_stack.get_min()}")

# Sort the stack
print(f"\nBefore sorting: {[min_stack.stack[i] for i in range(len(min_stack.stack))]}")
min_stack.sort_stack()
print(f"After sorting: {min_stack.stack}")

print("\nMinStack provides O(1) minimum queries!")
print("Sorting uses only stack operations - no external data structures.")`
    },
    {
      id: "ex2",
      question: "Implement a Queue using Stacks:\n1. Create a Queue class using only two stacks\n2. Implement enqueue and dequeue operations\n3. Ensure dequeue is amortized O(1) time\n4. Add front, rear, and size methods\n5. Test with various operations and demonstrate efficiency",
      solution: `class QueueWithStacks:
    def __init__(self):
        self.stack1 = []  # For enqueue operations
        self.stack2 = []  # For dequeue operations

    def enqueue(self, item):
        """Add item to the queue - O(1)"""
        self.stack1.append(item)

    def dequeue(self):
        """Remove and return front item - amortized O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")

        # If stack2 is empty, transfer all elements from stack1
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())

        return self.stack2.pop()

    def front(self):
        """Get front element without removing - O(1) amortized"""
        if self.is_empty():
            raise IndexError("Queue is empty")

        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())

        return self.stack2[-1]

    def rear(self):
        """Get rear element - O(1)"""
        if self.is_empty():
            raise IndexError("Queue is empty")

        if self.stack1:
            return self.stack1[-1]
        else:
            # If stack1 is empty, rear is at bottom of stack2
            return self.stack2[0] if self.stack2 else None

    def is_empty(self):
        return not self.stack1 and not self.stack2

    def size(self):
        return len(self.stack1) + len(self.stack2)

# Test the QueueWithStacks
print("Queue implemented with Stacks:")
queue = QueueWithStacks()

# Enqueue elements
elements = ["A", "B", "C", "D", "E"]
print("Enqueueing elements:")
for elem in elements:
    queue.enqueue(elem)
    print(f"Enqueued {elem}, Front: {queue.front()}, Rear: {queue.rear()}")

print(f"\nQueue size: {queue.size()}")

# Dequeue elements
print("\nDequeueing elements:")
for _ in range(3):
    dequeued = queue.dequeue()
    print(f"Dequeued {dequeued}, Front: {queue.front() if not queue.is_empty() else 'Empty'}, Size: {queue.size()}")

# Add more elements
print("\nAdding more elements:")
queue.enqueue("F")
queue.enqueue("G")
print(f"Front: {queue.front()}, Rear: {queue.rear()}, Size: {queue.size()}")

# Dequeue remaining
print("\nDequeueing remaining:")
while not queue.is_empty():
    dequeued = queue.dequeue()
    print(f"Dequeued {dequeued}, Size: {queue.size()}")

print("\nImplementation Details:")
print("- Enqueue: O(1) - just push to stack1")
print("- Dequeue: Amortized O(1) - transfer happens infrequently")
print("- Space: O(n) - uses two stacks")
print("- Perfect for understanding stack-queue relationship!")`
    },
    {
      id: "ex3",
      question: "Implement a Min-Heap (Priority Queue):\n1. Create a MinHeap class with insert and extract_min methods\n2. Implement heapify_up and heapify_down operations\n3. Add methods to peek minimum and check if heap is empty\n4. Implement heap sort using the heap\n5. Demonstrate heap operations and sorting",
      solution: `class MinHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def insert(self, key):
        """Insert key into heap - O(log n)"""
        self.heap.append(key)
        self._heapify_up(len(self.heap) - 1)

    def _heapify_up(self, i):
        """Maintain heap property by moving element up"""
        while i > 0 and self.heap[i] < self.heap[self.parent(i)]:
            # Swap with parent
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)

    def extract_min(self):
        """Remove and return minimum element - O(log n)"""
        if self.is_empty():
            raise IndexError("Heap is empty")

        min_val = self.heap[0]

        # Move last element to root
        last_val = self.heap.pop()
        if self.heap:
            self.heap[0] = last_val
            self._heapify_down(0)

        return min_val

    def _heapify_down(self, i):
        """Maintain heap property by moving element down"""
        size = len(self.heap)
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)

        # Find smallest among root, left child, right child
        if left < size and self.heap[left] < self.heap[smallest]:
            smallest = left
        if right < size and self.heap[right] < self.heap[smallest]:
            smallest = right

        # If root is not smallest, swap and continue
        if smallest != i:
            self.heap[i], self.heap[smallest] = self.heap[smallest], self.heap[i]
            self._heapify_down(smallest)

    def peek_min(self):
        """Return minimum without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Heap is empty")
        return self.heap[0]

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

    def heap_sort(self, arr):
        """Sort array using heap sort"""
        # Build heap from array
        sorted_heap = MinHeap()
        for num in arr:
            sorted_heap.insert(num)

        # Extract elements in sorted order
        sorted_arr = []
        while not sorted_heap.is_empty():
            sorted_arr.append(sorted_heap.extract_min())

        return sorted_arr

# Test the MinHeap
print("Min-Heap Operations:")
heap = MinHeap()

# Insert elements
elements = [3, 1, 6, 5, 2, 4]
print("Inserting elements:")
for elem in elements:
    heap.insert(elem)
    print(f"Inserted {elem}, Min: {heap.peek_min()}")

print(f"\nHeap: {heap.heap}")
print(f"Size: {heap.size()}")

# Extract minimum elements
print("\nExtracting minimum elements:")
for _ in range(3):
    min_val = heap.extract_min()
    print(f"Extracted {min_val}, New min: {heap.peek_min() if not heap.is_empty() else 'Empty'}")

# Heap sort demonstration
print("\nHeap Sort Demonstration:")
unsorted = [64, 34, 25, 12, 22, 11, 90]
print(f"Unsorted: {unsorted}")
sorted_arr = heap.heap_sort(unsorted)
print(f"Sorted: {sorted_arr}")

print("\nMin-Heap Properties:")
print("- Root always contains smallest element")
print("- Insert: O(log n), Extract: O(log n)")
print("- Perfect for priority queues and sorting!")`
    },
    {
      id: "ex4",
      question: "Implement Stack and Queue Applications:\n1. Create a function to check balanced parentheses using stack\n2. Implement a queue for task scheduling with priorities\n3. Create a browser history simulation using stacks\n4. Implement a printer queue using queue\n5. Demonstrate all applications with comprehensive examples",
      solution: `# Stack and Queue Applications

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        return self.items.pop() if not self.is_empty() else None

    def peek(self):
        return self.items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0

class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        return self.items.pop(0) if not self.is_empty() else None

    def front(self):
        return self.items[0] if not self.is_empty() else None

    def is_empty(self):
        return len(self.items) == 0

def check_balanced_parentheses(expression):
    """Check if parentheses are balanced using stack"""
    stack = Stack()
    brackets = {')': '(', '}': '{', ']': '['}

    for char in expression:
        if char in '({[':
            stack.push(char)
        elif char in ')}]':
            if stack.is_empty() or stack.pop() != brackets[char]:
                return False

    return stack.is_empty()

class TaskScheduler:
    """Priority queue for task scheduling"""
    def __init__(self):
        self.tasks = []  # List of (priority, task) tuples

    def add_task(self, task, priority):
        self.tasks.append((priority, task))
        self.tasks.sort(key=lambda x: x[0])  # Sort by priority (lower number = higher priority)

    def get_next_task(self):
        return self.tasks.pop(0)[1] if self.tasks else None

    def is_empty(self):
        return len(self.tasks) == 0

class BrowserHistory:
    """Browser history using two stacks"""
    def __init__(self):
        self.back_stack = Stack()
        self.forward_stack = Stack()
        self.current = None

    def visit(self, url):
        if self.current:
            self.back_stack.push(self.current)
        self.current = url
        # Clear forward stack when visiting new page
        self.forward_stack = Stack()

    def go_back(self):
        if not self.back_stack.is_empty():
            self.forward_stack.push(self.current)
            self.current = self.back_stack.pop()
        return self.current

    def go_forward(self):
        if not self.forward_stack.is_empty():
            self.back_stack.push(self.current)
            self.current = self.forward_stack.pop()
        return self.current

# Test all applications
print("1. Balanced Parentheses Checker:")
test_expressions = ["(a + b)", "((a + b) * c)", "(a + b", "a + b)", "([{}])"]
for expr in test_expressions:
    result = check_balanced_parentheses(expr)
    print(f"'{expr}' -> {'Balanced' if result else 'Unbalanced'}")

print("\n2. Task Scheduler (Priority Queue):")
scheduler = TaskScheduler()
scheduler.add_task("Fix critical bug", 1)
scheduler.add_task("Write documentation", 3)
scheduler.add_task("Code review", 2)
scheduler.add_task("Deploy to production", 1)

print("Processing tasks by priority:")
while not scheduler.is_empty():
    task = scheduler.get_next_task()
    print(f"Processing: {task}")

print("\n3. Browser History:")
browser = BrowserHistory()
pages = ["home.com", "news.com", "sports.com", "weather.com"]

print("Visiting pages:")
for page in pages:
    browser.visit(page)
    print(f"Visited: {page}")

print("\nGoing back:")
for _ in range(3):
    current = browser.go_back()
    print(f"Current page: {current}")

print("\nGoing forward:")
for _ in range(2):
    current = browser.go_forward()
    print(f"Current page: {current}")

print("\nData Structures Power Real Applications!")
print("- Stacks: Perfect for undo/redo, parentheses checking, browser history")
print("- Queues: Ideal for task scheduling, print queues, breadth-first search")
print("- Heaps: Essential for priority queues and efficient sorting")`
    },
    {
      id: "ex5",
      question: "Implement Advanced Heap Operations:\n1. Create a MaxHeap class (opposite of MinHeap)\n2. Implement heapify operation to build heap from array\n3. Add methods to increase/decrease key values\n4. Implement merge operation for two heaps\n5. Create performance benchmarks comparing heap operations\n6. Demonstrate real-world usage with event scheduling",
      solution: `# Advanced Heap Operations and MaxHeap Implementation

class MaxHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def insert(self, key):
        """Insert key into max-heap - O(log n)"""
        self.heap.append(key)
        self._heapify_up(len(self.heap) - 1)

    def _heapify_up(self, i):
        """Maintain heap property by moving element up"""
        while i > 0 and self.heap[i] > self.heap[self.parent(i)]:
            # Swap with parent
            self.heap[i], self.heap[self.parent(i)] = self.heap[self.parent(i)], self.heap[i]
            i = self.parent(i)

    def extract_max(self):
        """Remove and return maximum element - O(log n)"""
        if self.is_empty():
            raise IndexError("Heap is empty")

        max_val = self.heap[0]

        # Move last element to root
        last_val = self.heap.pop()
        if self.heap:
            self.heap[0] = last_val
            self._heapify_down(0)

        return max_val

    def _heapify_down(self, i):
        """Maintain heap property by moving element down"""
        size = len(self.heap)
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)

        # Find largest among root, left child, right child
        if left < size and self.heap[left] > self.heap[largest]:
            largest = left
        if right < size and self.heap[right] > self.heap[largest]:
            largest = right

        # If root is not largest, swap and continue
        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self._heapify_down(largest)

    def build_heap(self, arr):
        """Build heap from array - O(n)"""
        self.heap = arr[:]
        # Start from last non-leaf node and heapify down
        for i in range(len(arr) // 2 - 1, -1, -1):
            self._heapify_down(i)

    def peek_max(self):
        return self.heap[0] if not self.is_empty() else None

    def is_empty(self):
        return len(self.heap) == 0

    def size(self):
        return len(self.heap)

class EventScheduler:
    """Event scheduler using max-heap (highest priority first)"""
    def __init__(self):
        self.events = MaxHeap()  # Higher priority number = more important

    def schedule_event(self, event, priority):
        self.events.insert((priority, event))

    def get_next_event(self):
        if self.events.is_empty():
            return None
        priority, event = self.events.extract_max()
        return event, priority

    def peek_next_event(self):
        if self.events.is_empty():
            return None
        priority, event = self.events.peek_max()
        return event, priority

# Test MaxHeap and applications
print("Max-Heap Operations:")
max_heap = MaxHeap()

# Insert elements
elements = [3, 1, 6, 5, 2, 4]
print("Inserting elements:")
for elem in elements:
    max_heap.insert(elem)
    print(f"Inserted {elem}, Max: {max_heap.peek_max()}")

print(f"\nHeap: {max_heap.heap}")

# Extract maximum elements
print("\nExtracting maximum elements:")
for _ in range(3):
    max_val = max_heap.extract_max()
    print(f"Extracted {max_val}, New max: {max_heap.peek_max() if not max_heap.is_empty() else 'Empty'}")

# Build heap from array
print("\nBuilding heap from array:")
unsorted = [4, 10, 3, 5, 1, 8, 2, 9, 7, 6]
print(f"Unsorted: {unsorted}")
max_heap.build_heap(unsorted)
print(f"Heapified: {max_heap.heap}")
print(f"Max element: {max_heap.peek_max()}")

# Event scheduler demonstration
print("\nEvent Scheduler (using Max-Heap):")
scheduler = EventScheduler()

events = [
    ("Fix critical server issue", 10),
    ("Team meeting", 5),
    ("Code review", 7),
    ("Deploy to staging", 8),
    ("Update documentation", 3)
]

print("Scheduling events:")
for event, priority in events:
    scheduler.schedule_event(event, priority)
    print(f"Scheduled: {event} (priority {priority})")

print("\nProcessing events by priority:")
while True:
    next_event = scheduler.get_next_event()
    if next_event is None:
        break
    event, priority = next_event
    print(f"Processing: {event} (priority {priority})")

print("\nAdvanced Heap Features:")
print("- Max-heap vs Min-heap: Opposite ordering")
print("- Build heap: O(n) from unsorted array")
print("- Perfect for priority queues and event scheduling")
print("- Foundation for advanced algorithms like Dijkstra's and Huffman coding")`
    }
  ]
};
