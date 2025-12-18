import { Exercise } from '../../../../data/lessonsData';

export const exercise_10_8: Exercise = {
  id: 10.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement an Array class with basic operations:\n1. Create a fixed-size array class\n2. Implement methods to get, set, and get length\n3. Add bounds checking for safety\n4. Demonstrate array operations with a sample dataset",
      solution: `class Array:
    def __init__(self, size):
        self.size = size
        self.data = [None] * size

    def get(self, index):
        if 0 <= index < self.size:
            return self.data[index]
        else:
            raise IndexError("Index out of bounds")

    def set(self, index, value):
        if 0 <= index < self.size:
            self.data[index] = value
        else:
            raise IndexError("Index out of bounds")

    def length(self):
        return self.size

    def __str__(self):
        return str(self.data)

# Create an array of size 5
arr = Array(5)

# Set values
for i in range(5):
    arr.set(i, (i + 1) * 10)

print("Array contents:")
print(arr)

# Get individual elements
print("\nIndividual elements:")
for i in range(5):
    print(f"arr[{i}] = {arr.get(i)}")

# Demonstrate bounds checking
print("\nBounds checking test:")
try:
    arr.get(10)  # Should fail
except IndexError as e:
    print(f"Error caught: {e}")

try:
    arr.set(10, 100)  # Should fail
except IndexError as e:
    print(f"Error caught: {e}")

print(f"\nArray length: {arr.length()}")`
    },
    {
      id: "ex2",
      question: "Implement a Singly Linked List:\n1. Create Node and LinkedList classes\n2. Implement append, prepend, and display methods\n3. Add a method to get the length of the list\n4. Demonstrate the linked list with sample data\n5. Show the difference between arrays and linked lists",
      solution: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.length += 1

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.length += 1

    def display(self):
        elements = []
        current = self.head
        while current:
            elements.append(str(current.data))
            current = current.next
        return " -> ".join(elements)

    def get_length(self):
        return self.length

# Create a linked list
ll = LinkedList()

# Append elements
ll.append("Apple")
ll.append("Banana")
ll.append("Cherry")

print("After appending:")
print(ll.display())
print(f"Length: {ll.get_length()}")

# Prepend elements
ll.prepend("Orange")
ll.prepend("Grape")

print("\nAfter prepending:")
print(ll.display())
print(f"Length: {ll.get_length()}")

# Compare with array (list) operations
print("\nComparison with arrays:")
arr = []
arr.append("Apple")  # O(1) amortized
arr.append("Banana")
arr.insert(0, "Orange")  # O(n) - shifts elements

print(f"Array: {arr}")
print(f"Linked List: {ll.display()}")

print("\nLinked list advantages:")
print("- O(1) prepend operations")
print("- Dynamic size without resizing")
print("- Efficient insertions/deletions in middle")

print("\nArray advantages:")
print("- O(1) random access")
print("- Better cache performance")
print("- Less memory overhead")`
    },
    {
      id: "ex3",
      question: "Implement a Stack using both Array and Linked List:\n1. Create ArrayStack and LinkedListStack classes\n2. Implement push, pop, peek, and is_empty methods\n3. Compare performance and memory usage\n4. Demonstrate stack operations with sample data",
      solution: `class ArrayStack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListStack:
    def __init__(self):
        self.top = None
        self.length = 0

    def push(self, item):
        new_node = Node(item)
        new_node.next = self.top
        self.top = new_node
        self.length += 1

    def pop(self):
        if not self.is_empty():
            item = self.top.data
            self.top = self.top.next
            self.length -= 1
            return item
        return None

    def peek(self):
        if not self.is_empty():
            return self.top.data
        return None

    def is_empty(self):
        return self.top is None

    def size(self):
        return self.length

# Test both stack implementations
print("Array-based Stack:")
array_stack = ArrayStack()
for item in ["A", "B", "C", "D"]:
    array_stack.push(item)
    print(f"Pushed {item}, size: {array_stack.size()}")

print(f"Peek: {array_stack.peek()}")
while not array_stack.is_empty():
    item = array_stack.pop()
    print(f"Popped {item}, size: {array_stack.size()}")

print("\nLinked List-based Stack:")
linked_stack = LinkedListStack()
for item in ["A", "B", "C", "D"]:
    linked_stack.push(item)
    print(f"Pushed {item}, size: {linked_stack.size()}")

print(f"Peek: {linked_stack.peek()}")
while not linked_stack.is_empty():
    item = linked_stack.pop()
    print(f"Popped {item}, size: {linked_stack.size()}")

print("\nPerformance Comparison:")
print("Array Stack:")
print("- Push: O(1) amortized")
print("- Pop: O(1)")
print("- Memory: Efficient, no extra pointers")

print("\nLinked List Stack:")
print("- Push: O(1)")
print("- Pop: O(1)")
print("- Memory: Extra space for pointers")

print("\nBoth implementations have O(1) push and pop operations!")
print("Linked list version uses more memory but has truly O(1) operations.")`
    },
    {
      id: "ex4",
      question: "Implement a Queue using both Array and Linked List:\n1. Create ArrayQueue and LinkedListQueue classes\n2. Implement enqueue, dequeue, front, and is_empty methods\n3. Compare the implementations\n4. Demonstrate queue operations with sample data",
      solution: `class ArrayQueue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.pop(0)
        return None

    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedListQueue:
    def __init__(self):
        self.front_node = None
        self.rear_node = None
        self.length = 0

    def enqueue(self, item):
        new_node = Node(item)
        if self.is_empty():
            self.front_node = new_node
            self.rear_node = new_node
        else:
            self.rear_node.next = new_node
            self.rear_node = new_node
        self.length += 1

    def dequeue(self):
        if not self.is_empty():
            item = self.front_node.data
            self.front_node = self.front_node.next
            if self.front_node is None:
                self.rear_node = None
            self.length -= 1
            return item
        return None

    def front(self):
        if not self.is_empty():
            return self.front_node.data
        return None

    def is_empty(self):
        return self.front_node is None

    def size(self):
        return self.length

# Test both queue implementations
print("Array-based Queue:")
array_queue = ArrayQueue()
for item in ["A", "B", "C", "D"]:
    array_queue.enqueue(item)
    print(f"Enqueued {item}, size: {array_queue.size()}")

print(f"Front: {array_queue.front()}")
while not array_queue.is_empty():
    item = array_queue.dequeue()
    print(f"Dequeued {item}, size: {array_queue.size()}")

print("\nLinked List-based Queue:")
linked_queue = LinkedListQueue()
for item in ["A", "B", "C", "D"]:
    linked_queue.enqueue(item)
    print(f"Enqueued {item}, size: {linked_queue.size()}")

print(f"Front: {linked_queue.front()}")
while not linked_queue.is_empty():
    item = linked_queue.dequeue()
    print(f"Dequeued {item}, size: {linked_queue.size()}")

print("\nPerformance Comparison:")
print("Array Queue:")
print("- Enqueue: O(1) amortized")
print("- Dequeue: O(n) - requires shifting elements")
print("- Memory: Efficient")

print("\nLinked List Queue:")
print("- Enqueue: O(1)")
print("- Dequeue: O(1)")
print("- Memory: Extra space for pointers")

print("\nFor queues, linked list implementation is generally preferred")
print("because both enqueue and dequeue operations are O(1).")`
    },
    {
      id: "ex5",
      question: "Implement Array and Linked List operations comparison:\n1. Create functions to perform operations on both data structures\n2. Compare insertion, deletion, and access times\n3. Implement search operations for both\n4. Demonstrate memory usage differences\n5. Create performance benchmarks",
      solution: `# Performance comparison between arrays and linked lists
import time

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.length = 0

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.length += 1

    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self.length += 1

    def delete_first(self):
        if self.head:
            self.head = self.head.next
            self.length -= 1

    def search(self, target):
        current = self.head
        position = 0
        while current:
            if current.data == target:
                return position
            current = current.next
            position += 1
        return -1

    def get_length(self):
        return self.length

# Performance comparison
def benchmark_operations():
    print("Data Structure Performance Comparison")
    print("=" * 50)

    # Test data
    test_size = 1000
    test_values = list(range(test_size))

    # Array (Python list) operations
    print("Array (List) Operations:")
    start_time = time.time()
    array = []
    for value in test_values:
        array.append(value)
    array_time = time.time() - start_time
    print(f"Append {test_size} elements: {array_time:.6f} seconds")

    start_time = time.time()
    array.insert(0, -1)
    insert_time = time.time() - start_time
    print(f"Insert at beginning: {insert_time:.6f} seconds")

    start_time = time.time()
    result = array[500]
    access_time = time.time() - start_time
    print(f"Access middle element: {access_time:.6f} seconds")

    start_time = time.time()
    pos = array.index(750)
    search_time = time.time() - start_time
    print(f"Search for element: {search_time:.6f} seconds")

    # Linked List operations
    print("\nLinked List Operations:")
    start_time = time.time()
    linked_list = LinkedList()
    for value in test_values:
        linked_list.append(value)
    linked_time = time.time() - start_time
    print(f"Append {test_size} elements: {linked_time:.6f} seconds")

    start_time = time.time()
    linked_list.insert_at_beginning(-1)
    insert_time = time.time() - start_time
    print(f"Insert at beginning: {insert_time:.6f} seconds")

    start_time = time.time()
    # Linked list access is O(n) - need to traverse
    current = linked_list.head
    for i in range(500):
        current = current.next
    access_time = time.time() - start_time
    print(f"Access middle element: {access_time:.6f} seconds")

    start_time = time.time()
    pos = linked_list.search(750)
    search_time = time.time() - start_time
    print(f"Search for element: {search_time:.6f} seconds")

    # Memory comparison
    print("\nMemory Usage:")
    print(f"Array length: {len(array)}")
    print(f"Linked list length: {linked_list.get_length()}")

    print("\nKey Insights:")
    print("- Arrays: Fast random access, slow insertions/deletions in middle")
    print("- Linked Lists: Fast insertions/deletions, slow random access")
    print("- Choose based on your use case!")

benchmark_operations()`
    }
  ]
};
