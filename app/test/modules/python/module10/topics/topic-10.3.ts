import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_3: SubLesson = {
  id: "10.3",
  title: 'What are Linked Lists?',
  status: 'demo',
  content: "`# ðŸ”— What are Linked Lists?

Linked lists are dynamic data structures where elements are connected through pointers. Unlike arrays, they don't require contiguous memory and can grow/shrink easily!

---

## ðŸŽ¯ What is a Linked List?

A **linked list** is a collection of nodes where each node contains:
- **Data** - The actual value stored
- **Pointer/Reference** - Link to the next node in the sequence

\`"\`\`python
# Simple Node class
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Creating a linked list
head = Node(10)
head.next = Node(20)
head.next.next = Node(30)

print(f"First: {head.data}")          # 10
print(f"Second: {head.next.data}")    # 20
print(f"Third: {head.next.next.data}") # 30
\`\`\`

---

## ðŸ”— Linked List Types

### **Singly Linked List**

\`\`\`text
Head -> [10|*] -> [20|*] -> [30|*] -> None
\`\`\`

### **Doubly Linked List**

\`\`\`text
None <- [10|*|*] <-> [20|*|*] <-> [30|*|*] -> None
\`\`\`

### **Circular Linked List**

\`\`\`text
Head -> [10|*] -> [20|*] -> [30|*] -> back to Head
\`\`\`

---

## ðŸ“¦ Linked List Operations

### **Basic Structure**
\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        """Add node to end of list."""
        if not self.head:
            self.head = Node(data)
            return

        current = self.head
        while current.next:
            current = current.next
        current.next = Node(data)

    def display(self):
        """Print all elements."""
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")
\`\`\`

### **Adding Elements**
\`\`\`python
# Create linked list
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)

print("Linked List:")
ll.display()  # 10 -> 20 -> 30 -> None
\`\`\`

---

## ðŸ” Linked List Traversal

### **Iterating Through Nodes**
\`\`\`python
def traverse_linked_list(head):
    """Visit each node in linked list."""
    current = head
    while current is not None:
        print(f"Node data: {current.data}")
        current = current.next

# Create and traverse
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)

print("Traversing linked list:")
traverse_linked_list(head)
\`\`\`

### **Finding Length**
\`\`\`python
def get_length(head):
    """Count nodes in linked list."""
    count = 0
    current = head
    while current:
        count += 1
        current = current.next
    return count

# Test length
length = get_length(head)
print(f"Linked list length: {length}")  # 3
\`\`\`

---

## ðŸŽ¯ Key Advantages

### **Dynamic Size**
\`\`\`python
# Can grow and shrink easily
ll = LinkedList()
for i in range(5):
    ll.append(i * 10)

ll.display()  # 0 -> 10 -> 20 -> 30 -> 40 -> None

# Arrays would need resizing
\`\`\`

### **Efficient Insertions/Deletions**
\`\`\`python
# Insert/delete anywhere with just pointer changes
# No need to shift elements like in arrays

def insert_after(node, new_data):
    """Insert new node after given node."""
    if node is None:
        return

    new_node = Node(new_data)
    new_node.next = node.next
    node.next = new_node

# Insert 25 between 20 and 30
insert_after(head.next.next, 25)
traverse_linked_list(head)
\`\`\`

---

## âš ï¸ Key Disadvantages

### **No Random Access**
\`\`\`python
# Can't access by index like arrays
# Must traverse from head each time

def get_node_at_index(head, index):
    """Get node at specific index."""
    current = head
    count = 0

    while current and count < index:
        current = current.next
        count += 1

    return current.data if current else None

# Slow for large indices
print(get_node_at_index(head, 0))  # 1 (fast)
print(get_node_at_index(head, 10)) # None (had to traverse all)
\`\`\`

### **Extra Memory**
\`\`\`python
# Each node stores data + pointer
# Arrays only store data

print("Array: stores just data")
print("Linked List: stores data + next pointer")
print("Memory overhead per element")
\`\`\`

---

## ðŸŽ¨ Real-World Applications

### **Undo/Redo Functionality**
\`\`\`python
class TextEditor:
    def __init__(self):
        self.history = LinkedList()
        self.current = None

    def type_text(self, text):
        """Add text to editor."""
        node = Node(text)
        if self.current:
            self.current.next = node
        else:
            self.history.head = node
        self.current = node

    def undo(self):
        """Remove last action."""
        if not self.current:
            return

        # Find node before current
        prev = None
        temp = self.history.head
        while temp and temp != self.current:
            prev = temp
            temp = temp.next

        if prev:
            prev.next = None
        else:
            self.history.head = None
        self.current = prev

editor = TextEditor()
editor.type_text("Hello")
editor.type_text(" World")
editor.type_text("!")

print("Before undo:")
traverse_linked_list(editor.history.head)

editor.undo()
print("After undo:")
traverse_linked_list(editor.history.head)
\`\`\`

### **Browser History**
\`\`\`python
# Browser back/forward navigation
class BrowserHistory:
    def __init__(self):
        self.history = LinkedList()
        self.current = None

    def visit_page(self, url):
        """Visit a new page."""
        node = Node(url)
        if self.current:
            # Clear forward history
            self.current.next = node
        else:
            self.history.head = node
        self.current = node

    def go_back(self):
        """Go to previous page."""
        if not self.current:
            return None

        # Find previous page
        prev = self.history.head
        while prev and prev.next != self.current:
            prev = prev.next

        if prev:
            self.current = prev
            return prev.data
        return None

browser = BrowserHistory()
browser.visit_page("google.com")
browser.visit_page("github.com")
browser.visit_page("stackoverflow.com")

print("Current page:", browser.current.data)
browser.go_back()
print("After back:", browser.current.data)
\`\`\`

Linked lists are perfect for dynamic collections where insertions and deletions are frequent! ðŸ”—`
};


