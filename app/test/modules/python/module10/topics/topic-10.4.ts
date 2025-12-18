import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_4: SubLesson = {
  id: 10.4,
  title: 'Linked List Operations',
  status: 'demo',
  content: `# ⚙️ Linked List Operations

Linked lists support various operations for insertion, deletion, and manipulation. Let's implement and understand the key operations!

---

## 🔧 Complete Linked List Implementation

### **Node and LinkedList Classes**
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def is_empty(self):
        return self.head is None

    def display(self):
        """Print all elements."""
        if self.is_empty():
            print("List is empty")
            return

        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

    def get_length(self):
        """Return number of nodes."""
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        return count
\`\`\`

---

## ➕ Insertion Operations

### **Insert at Beginning**
\`\`\`python
def insert_at_beginning(self, data):
    """Insert node at the start of list."""
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node

# Add to LinkedList class
LinkedList.insert_at_beginning = insert_at_beginning

ll = LinkedList()
ll.insert_at_beginning(30)
ll.insert_at_beginning(20)
ll.insert_at_beginning(10)

print("After inserting at beginning:")
ll.display()  # 10 -> 20 -> 30 -> None
\`\`\`

### **Insert at End**
\`\`\`python
def insert_at_end(self, data):
    """Insert node at the end of list."""
    new_node = Node(data)

    if self.is_empty():
        self.head = new_node
        return

    current = self.head
    while current.next:
        current = current.next

    current.next = new_node

# Add to LinkedList class
LinkedList.insert_at_end = insert_at_end

ll2 = LinkedList()
ll2.insert_at_end(10)
ll2.insert_at_end(20)
ll2.insert_at_end(30)

print("After inserting at end:")
ll2.display()  # 10 -> 20 -> 30 -> None
\`\`\`

### **Insert at Position**
\`\`\`python
def insert_at_position(self, data, position):
    """Insert node at specific position."""
    if position < 0:
        print("Invalid position")
        return

    new_node = Node(data)

    if position == 0:
        new_node.next = self.head
        self.head = new_node
        return

    current = self.head
    count = 0

    # Find node before insertion point
    while current and count < position - 1:
        current = current.next
        count += 1

    if current is None:
        print("Position out of range")
        return

    new_node.next = current.next
    current.next = new_node

# Add to LinkedList class
LinkedList.insert_at_position = insert_at_position

ll3 = LinkedList()
ll3.insert_at_end(10)
ll3.insert_at_end(30)
ll3.insert_at_end(40)

ll3.insert_at_position(20, 1)  # Insert 20 at position 1

print("After inserting at position 1:")
ll3.display()  # 10 -> 20 -> 30 -> 40 -> None
\`\`\`

---

## ➖ Deletion Operations

### **Delete from Beginning**
\`\`\`python
def delete_from_beginning(self):
    """Delete node from start of list."""
    if self.is_empty():
        print("List is empty")
        return

    self.head = self.head.next

# Add to LinkedList class
LinkedList.delete_from_beginning = delete_from_beginning

ll4 = LinkedList()
ll4.insert_at_end(10)
ll4.insert_at_end(20)
ll4.insert_at_end(30)

print("Before deletion:")
ll4.display()  # 10 -> 20 -> 30 -> None

ll4.delete_from_beginning()
print("After deleting from beginning:")
ll4.display()  # 20 -> 30 -> None
\`\`\`

### **Delete from End**
\`\`\`python
def delete_from_end(self):
    """Delete node from end of list."""
    if self.is_empty():
        print("List is empty")
        return

    if self.head.next is None:
        self.head = None
        return

    current = self.head
    while current.next.next:
        current = current.next

    current.next = None

# Add to LinkedList class
LinkedList.delete_from_end = delete_from_end

ll5 = LinkedList()
ll5.insert_at_end(10)
ll5.insert_at_end(20)
ll5.insert_at_end(30)

print("Before deletion:")
ll5.display()  # 10 -> 20 -> 30 -> None

ll5.delete_from_end()
print("After deleting from end:")
ll5.display()  # 10 -> 20 -> None
\`\`\`

### **Delete by Value**
\`\`\`python
def delete_by_value(self, value):
    """Delete first node with given value."""
    if self.is_empty():
        print("List is empty")
        return

    # If head contains value
    if self.head.data == value:
        self.head = self.head.next
        return

    current = self.head
    while current.next and current.next.data != value:
        current = current.next

    if current.next:
        current.next = current.next.next
    else:
        print(f"Value {value} not found")

# Add to LinkedList class
LinkedList.delete_by_value = delete_by_value

ll6 = LinkedList()
ll6.insert_at_end(10)
ll6.insert_at_end(20)
ll6.insert_at_end(30)
ll6.insert_at_end(20)

print("Before deletion:")
ll6.display()  # 10 -> 20 -> 30 -> 20 -> None

ll6.delete_by_value(20)  # Deletes first occurrence
print("After deleting first 20:")
ll6.display()  # 10 -> 30 -> 20 -> None
\`\`\`

---

## 🔍 Search Operations

### **Search by Value**
\`\`\`python
def search(self, value):
    """Search for value in list."""
    current = self.head
    position = 0

    while current:
        if current.data == value:
            return position
        current = current.next
        position += 1

    return -1

# Add to LinkedList class
LinkedList.search = search

ll7 = LinkedList()
ll7.insert_at_end(10)
ll7.insert_at_end(20)
ll7.insert_at_end(30)

print(f"Position of 20: {ll7.search(20)}")  # 1
print(f"Position of 40: {ll7.search(40)}")  # -1
\`\`\`

### **Get Node at Position**
\`\`\`python
def get_node_at(self, position):
    """Get node data at specific position."""
    if position < 0:
        return None

    current = self.head
    count = 0

    while current and count < position:
        current = current.next
        count += 1

    return current.data if current else None

# Add to LinkedList class
LinkedList.get_node_at = get_node_at

print(f"Node at position 0: {ll7.get_node_at(0)}")  # 10
print(f"Node at position 2: {ll7.get_node_at(2)}")  # 30
print(f"Node at position 5: {ll7.get_node_at(5)}")  # None
\`\`\`

---

## 🔄 Utility Operations

### **Reverse Linked List**
\`\`\`python
def reverse(self):
    """Reverse the linked list."""
    prev = None
    current = self.head

    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    self.head = prev

# Add to LinkedList class
LinkedList.reverse = reverse

ll8 = LinkedList()
ll8.insert_at_end(10)
ll8.insert_at_end(20)
ll8.insert_at_end(30)

print("Before reverse:")
ll8.display()  # 10 -> 20 -> 30 -> None

ll8.reverse()
print("After reverse:")
ll8.display()  # 30 -> 20 -> 10 -> None
\`\`\`

### **Detect Cycle**
\`\`\`python
def has_cycle(self):
    """Check if linked list has a cycle."""
    if not self.head:
        return False

    slow = self.head
    fast = self.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False

# Add to LinkedList class
LinkedList.has_cycle = has_cycle

# Test cycle detection
ll9 = LinkedList()
ll9.insert_at_end(1)
ll9.insert_at_end(2)
ll9.insert_at_end(3)

print(f"Has cycle: {ll9.has_cycle()}")  # False

# Create a cycle for testing
ll9.head.next.next.next = ll9.head.next
print(f"Has cycle after creating: {ll9.has_cycle()}")  # True
\`\`\`

---

## ⚡ Performance Comparison

### **Operation Complexity**
| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Insert at beginning | O(1) | Just update head |
| Insert at end | O(n) | Must traverse to end |
| Insert at position | O(n) | Must find position |
| Delete from beginning | O(1) | Just update head |
| Delete from end | O(n) | Must find second-to-last |
| Delete by value | O(n) | Must search for value |
| Search by value | O(n) | Must traverse |
| Access by index | O(n) | No random access |

Linked list operations are efficient for dynamic collections but slow for random access! 🔗`
};
