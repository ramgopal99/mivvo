import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_1: SubLesson = {
  id: "12.1",
  title: 'What are Stacks?',
  status: 'demo',
  content: "`# ðŸ“š What are Stacks?

Stacks are fundamental data structures that follow the **Last In, First Out (LIFO)** principle. Think of them as a stack of plates where you can only access the top plate!

---

## ðŸŽ¯ What is a Stack?

A **stack** is a linear data structure that allows operations only at one end called the **top**. Elements are added and removed from the same end, following LIFO order.

\`"\`\`python
# Visual representation of stack operations
# Stack: [3, 2, 1]  <- Top is 3
# Push 4: [4, 3, 2, 1]  <- Top is now 4
# Pop: [3, 2, 1]  <- Top is back to 3
\`\`\`

---

## ðŸ—ï¸ Stack Operations

### **Core Operations**
\`\`\`python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        """Add item to top of stack."""
        self.items.append(item)

    def pop(self):
        """Remove and return item from top of stack."""
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        """Return top item without removing it."""
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        """Check if stack is empty."""
        return len(self.items) == 0

    def size(self):
        """Return number of items in stack."""
        return len(self.items)

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)

print(f"Stack size: {stack.size()}")
print(f"Top item: {stack.peek()}")
print(f"Popped: {stack.pop()}")
print(f"New top: {stack.peek()}")
\`\`\`

---

## ðŸŽ¨ Stack Analogy

### **Real-World Examples**
\`\`\`python
# Browser back button (simplified)
class BrowserHistory:
    def __init__(self):
        self.history = Stack()
        self.forward_stack = Stack()

    def visit_page(self, url):
        """Visit a new page."""
        self.history.push(url)
        # Clear forward history when visiting new page
        while not self.forward_stack.is_empty():
            self.forward_stack.pop()

    def go_back(self):
        """Go back to previous page."""
        if not self.history.is_empty():
            current_page = self.history.pop()
            self.forward_stack.push(current_page)
            return self.history.peek()
        return None

    def go_forward(self):
        """Go forward to next page."""
        if not self.forward_stack.is_empty():
            next_page = self.forward_stack.pop()
            self.history.push(next_page)
            return next_page
        return None

# Simulate browsing
browser = BrowserHistory()
browser.visit_page("google.com")
browser.visit_page("github.com")
browser.visit_page("stackoverflow.com")

print("Current page:", browser.history.peek())
print("Go back:", browser.go_back())
print("Go back again:", browser.go_back())
print("Go forward:", browser.go_forward())
\`\`\`

---

## ðŸ“Š Stack Properties

### **LIFO Principle**
\`\`\`python
# Last In, First Out
stack = Stack()

# Push order: A, B, C
stack.push("A")
stack.push("B")
stack.push("C")

# Pop order: C, B, A (reverse of push order)
while not stack.is_empty():
    print(f"Popped: {stack.pop()}")
\`\`\`

### **Time Complexity**
- **Push**: O(1) - Add to end of list
- **Pop**: O(1) - Remove from end of list
- **Peek**: O(1) - Access last element
- **is_empty/size**: O(1) - List length operations

---

## ðŸ”§ Stack Implementation Options

### **Using Python List**
\`\`\`python
# Simplest implementation using list
class ListStack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        return self._items.pop() if self._items else None

    def peek(self):
        return self._items[-1] if self._items else None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

print("Python list makes excellent stack implementation")
\`\`\`

### **Using collections.deque**
\`\`\`python
from collections import deque

class DequeStack:
    def __init__(self):
        self._items = deque()

    def push(self, item):
        self._items.append(item)

    def pop(self):
        return self._items.pop() if self._items else None

    def peek(self):
        return self._items[-1] if self._items else None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)

print("Deque provides O(1) operations for both ends")
\`\`\`

---

## ðŸŽ¯ Stack Applications

### **Function Call Stack**
\`\`\`python
# Simulating function call stack
call_stack = Stack()

def function_a():
    call_stack.push("function_a")
    print("In function_a")
    function_b()
    call_stack.pop()

def function_b():
    call_stack.push("function_b")
    print("In function_b")
    function_c()
    call_stack.pop()

def function_c():
    call_stack.push("function_c")
    print("In function_c")
    print(f"Call stack: {list(reversed(call_stack._items))}")  # Show stack
    call_stack.pop()

function_a()
print("Function calls complete")
\`\`\`

### **Expression Evaluation**
\`\`\`python
# Simple expression evaluation (infix to postfix concept)
def evaluate_simple(expression):
    """Evaluate simple expressions using stack."""
    stack = Stack()
    operators = {'+': lambda a, b: a + b, '-': lambda a, b: a - b}

    # Very simplified parser
    tokens = expression.replace(" ", "").split()

    for token in tokens:
        if token.isdigit():
            stack.push(int(token))
        elif token in operators:
            b = stack.pop()
            a = stack.pop()
            result = operators[token](a, b)
            stack.push(result)

    return stack.pop() if not stack.is_empty() else None

# Note: This is a very simplified example
# Real expression evaluation is more complex
print("Stack-based expression evaluation concepts")
\`\`\`

### **Undo/Redo System**
\`\`\`python
class TextEditor:
    def __init__(self):
        self.text = ""
        self.undo_stack = Stack()
        self.redo_stack = Stack()

    def insert(self, char):
        """Insert character."""
        self.undo_stack.push(("delete", char))  # Store reverse operation
        self.text += char
        print(f"Inserted '{char}': {self.text}")

    def delete(self):
        """Delete last character."""
        if self.text:
            char = self.text[-1]
            self.undo_stack.push(("insert", char))  # Store reverse operation
            self.text = self.text[:-1]
            print(f"Deleted '{char}': {self.text}")
            return char
        return None

    def undo(self):
        """Undo last operation."""
        if not self.undo_stack.is_empty():
            operation, data = self.undo_stack.pop()
            self.redo_stack.push((operation, data))

            if operation == "insert":
                self.text += data
            elif operation == "delete":
                self.text = self.text[:-1]

            print(f"Undid operation: {operation} '{data}'")
            return True
        return False

# Usage
editor = TextEditor()
editor.insert("H")
editor.insert("e")
editor.insert("l")
editor.insert("l")
editor.insert("o")

editor.undo()
editor.undo()
editor.insert("i")

print(f"Final text: {editor.text}")
\`\`\`

---

## âš–ï¸ Stack vs Other Structures

| Operation | Stack | Queue | List |
|-----------|-------|-------|------|
| Add item | O(1) | O(1) | O(1) or O(n) |
| Remove item | O(1) | O(1) | O(1) or O(n) |
| Access middle | O(n) | O(n) | O(1) |
| Memory | O(n) | O(n) | O(n) |
| Ordering | LIFO | FIFO | Random |

### **When to Use Stacks**
- **Function calls** - Call stack management
- **Undo/redo** - Operation reversal
- **Expression evaluation** - Shunting-yard algorithm
- **Browser history** - Back button functionality
- **Syntax parsing** - Parentheses matching

---

## ðŸš€ Stack Implementation Best Practices

### **Choose Right Underlying Structure**
\`\`\`python
# For simple stacks: use Python list
simple_stack = []

# For thread-safe stacks: use deque
from collections import deque
thread_safe_stack = deque()

# For bounded stacks: implement size limit
class BoundedStack:
    def __init__(self, max_size):
        self._items = []
        self._max_size = max_size

    def push(self, item):
        if len(self._items) < self._max_size:
            self._items.append(item)
            return True
        return False  # Stack full

bounded_stack = BoundedStack(3)
bounded_stack.push(1)
bounded_stack.push(2)
bounded_stack.push(3)
bounded_stack.push(4)  # Won't add, stack full
\`\`\`

### **Error Handling**
\`\`\`python
class SafeStack:
    def __init__(self):
        self._items = []

    def push(self, item):
        """Push item onto stack."""
        self._items.append(item)

    def pop(self):
        """Pop item from stack with error handling."""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._items.pop()

    def peek(self):
        """Peek at top item with error handling."""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self._items[-1]

    def is_empty(self):
        """Check if stack is empty."""
        return len(self._items) == 0

# Usage with error handling
safe_stack = SafeStack()
safe_stack.push("item1")

try:
    item = safe_stack.pop()
    print(f"Popped: {item}")
    empty_pop = safe_stack.pop()  # This will raise error
except IndexError as e:
    print(f"Error: {e}")
\`\`\`

Stacks are simple yet powerful - the foundation of many algorithms! ðŸ—ï¸`
};


