import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_3: SubLesson = {
  id: 13.3,
  title: 'BST Traversal Algorithms',
  status: 'demo',
  content: `# 🚶 BST Traversal Algorithms

Learn different ways to visit all nodes in a Binary Search Tree systematically!

---

## 🎯 Tree Traversal Methods

### **Depth-First Traversals**

#### **1. Inorder Traversal (Left → Root → Right)**
\`\`\`
Tree:     8
         / \\
        3   10
       / \\    \\
      1   6    14

Inorder: [1, 3, 6, 8, 10, 14] ← **SORTED ORDER**
\`\`\`

**Code:**
\`\`\`python
def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.value, end=' ')
        inorder_traversal(root.right)
\`\`\`

#### **2. Preorder Traversal (Root → Left → Right)**
\`\`\`
Preorder: [8, 3, 1, 6, 10, 14] ← **Root first**
\`\`\`

**Code:**
\`\`\`python
def preorder_traversal(root):
    if root:
        print(root.value, end=' ')
        preorder_traversal(root.left)
        preorder_traversal(root.right)
\`\`\`

#### **3. Postorder Traversal (Left → Right → Root)**
\`\`\`
Postorder: [1, 6, 3, 14, 10, 8] ← **Root last**
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
Level Order: [8, 3, 10, 1, 6, 14] ← **Level by level**
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

## 📊 Traversal Comparison

| Traversal | Order | Pattern | BST Special Property |
|-----------|-------|---------|---------------------|
| **Inorder** | L → R → Root | Left, Root, Right | **Gives sorted order** |
| **Preorder** | Root → L → R | Root, Left, Right | Useful for copying tree |
| **Postorder** | L → R → Root | Left, Right, Root | Useful for deletion |
| **Level** | Level by level | BFS approach | Shows tree structure |

---

## 🔄 Iterative Implementations

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

## 🎯 Applications of Traversals

### **Inorder Traversal Uses**
- ✅ Get elements in **sorted order**
- ✅ **BST validation** (check if inorder is sorted)
- ✅ **Convert BST to sorted array**
- ✅ **Find k-th smallest element**

### **Preorder Traversal Uses**
- ✅ **Copy/clone a tree**
- ✅ **Serialize tree to array/string**
- ✅ **Expression tree evaluation**
- ✅ **File system traversal**

### **Postorder Traversal Uses**
- ✅ **Delete tree nodes** (safe deletion)
- ✅ **Calculate directory sizes**
- ✅ **Expression evaluation** (postfix)
- ✅ **Syntax tree processing**

### **Level Order Uses**
- ✅ **Find tree height/depth**
- ✅ **Print tree level by level**
- ✅ **Find maximum width**
- ✅ **Connect nodes at same level**

---

## 🛠️ Utility Functions Using Traversals

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

## 🎯 Key Takeaways

1. **Inorder**: Left → Root → Right = **Sorted order in BST**
2. **Preorder**: Root → Left → Right = **Tree copying**
3. **Postorder**: Left → Right → Root = **Safe deletion**
4. **Level Order**: BFS = **Level-by-level processing**
5. **Recursive**: Clean, easy to understand
6. **Iterative**: Better for large trees, uses stack/queue

Master these traversals to unlock BST's full potential! 🌟`,
};
