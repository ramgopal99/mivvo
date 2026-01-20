import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_3: SubLesson = {
  id: "13.3",
  title: 'BST Traversal Algorithms',
  status: 'demo',
  content: "`# ðŸš¶ BST Traversal Algorithms

Learn different ways to visit all nodes in a Binary Search Tree systematically!

---

## ðŸŽ¯ Tree Traversal Methods

### **Depth-First Traversals**

#### **1. Inorder Traversal (Left â†’ Root â†’ Right)**
\`"\`\`
Tree:     8
         / \\
        3   10
       / \\    \\
      1   6    14

Inorder: [1, 3, 6, 8, 10, 14] â† **SORTED ORDER**
\`\`\`

**Code:**
\`\`\`python
def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.value, end=' ')
        inorder_traversal(root.right)
\`\`\`

#### **2. Preorder Traversal (Root â†’ Left â†’ Right)**
\`\`\`
Preorder: [8, 3, 1, 6, 10, 14] â† **Root first**
\`\`\`

**Code:**
\`\`\`python
def preorder_traversal(root):
    if root:
        print(root.value, end=' ')
        preorder_traversal(root.left)
        preorder_traversal(root.right)
\`\`\`

#### **3. Postorder Traversal (Left â†’ Right â†’ Root)**
\`\`\`
Postorder: [1, 6, 3, 14, 10, 8] â† **Root last**
\`\`\`

**Code:**
\`\`\`python
def postorder_traversal(root):
    if root:
        postorder_traversal(root.left)
        postorder_traversal(root.right)
        print(root.value, end=' ')
\`\`\`

### **Breadth-First Traversal (Level Order)**

#### **4. Level Order Traversal (Queue-based)**
\`\`\`
Level Order: [8, 3, 10, 1, 6, 14] â† **Level by level**
\`\`\`

**Code:**
\`\`\`python
from collections import deque

def level_order_traversal(root):
    if not root:
        return

    queue = deque([root])
    while queue:
        node = queue.popleft()
        print(node.value, end=' ')

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
\`\`\`

---

## ðŸ“Š Traversal Comparison

| Traversal | Order | Pattern | BST Special Property |
|-----------|-------|---------|---------------------|
| **Inorder** | L â†’ R â†’ Root | Left, Root, Right | **Gives sorted order** |
| **Preorder** | Root â†’ L â†’ R | Root, Left, Right | Useful for copying tree |
| **Postorder** | L â†’ R â†’ Root | Left, Right, Root | Useful for deletion |
| **Level** | Level by level | BFS approach | Shows tree structure |

---

## ðŸ”„ Iterative Implementations

### **Iterative Inorder (Using Stack)**
\`\`\`python
def inorder_iterative(root):
    stack = []
    current = root

    while current or stack:
        # Reach leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process node
        current = stack.pop()
        print(current.value, end=' ')

        # Move to right subtree
        current = current.right
\`\`\`

### **Iterative Preorder (Using Stack)**
\`\`\`python
def preorder_iterative(root):
    if not root:
        return

    stack = [root]

    while stack:
        node = stack.pop()
        print(node.value, end=' ')

        # Push right first, then left (LIFO)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
\`\`\`

---

## ðŸŽ¯ Applications of Traversals

### **Inorder Traversal Uses**
- âœ… Get elements in **sorted order**
- âœ… **BST validation** (check if inorder is sorted)
- âœ… **Convert BST to sorted array**
- âœ… **Find k-th smallest element**

### **Preorder Traversal Uses**
- âœ… **Copy/clone a tree**
- âœ… **Serialize tree to array/string**
- âœ… **Expression tree evaluation**
- âœ… **File system traversal**

### **Postorder Traversal Uses**
- âœ… **Delete tree nodes** (safe deletion)
- âœ… **Calculate directory sizes**
- âœ… **Expression evaluation** (postfix)
- âœ… **Syntax tree processing**

### **Level Order Uses**
- âœ… **Find tree height/depth**
- âœ… **Print tree level by level**
- âœ… **Find maximum width**
- âœ… **Connect nodes at same level**

---

## ðŸ› ï¸ Utility Functions Using Traversals

### **Check if BST is Valid**
\`\`\`python
def is_valid_bst(root):
    def inorder_check(node, prev):
        if not node:
            return True

        if not inorder_check(node.left, prev):
            return False

        if prev[0] is not None and node.value <= prev[0]:
            return False

        prev[0] = node.value
        return inorder_check(node.right, prev)

    return inorder_check(root, [None])
\`\`\`

### **Find Height of BST**
\`\`\`python
def height(root):
    if not root:
        return 0
    return 1 + max(height(root.left), height(root.right))
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Inorder**: Left â†’ Root â†’ Right = **Sorted order in BST**
2. **Preorder**: Root â†’ Left â†’ Right = **Tree copying**
3. **Postorder**: Left â†’ Right â†’ Root = **Safe deletion**
4. **Level Order**: BFS = **Level-by-level processing**
5. **Recursive**: Clean, easy to understand
6. **Iterative**: Better for large trees, uses stack/queue

Master these traversals to unlock BST's full potential! ðŸŒŸ`,
};


