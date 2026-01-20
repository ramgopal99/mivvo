import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_1: SubLesson = {
  id: "13.1",
  title: 'Introduction to Binary Search Tree',
  status: 'demo',
  content: "`# ðŸŒ³ Introduction to Binary Search Tree

A Binary Search Tree (BST) is a hierarchical data structure that maintains an ordered relationship between elements!

---

## ðŸŽ¯ What is a Binary Search Tree?

A **Binary Search Tree** is a binary tree data structure where each node has at most two children, and for each node:

- All values in the left subtree are **less than** the node's value
- All values in the right subtree are **greater than** the node's value

### **Visual Representation**
\`"\`\`
        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\   /
      4   7 12
\`\`\`

---

## ðŸ—ï¸ BST Node Structure

Each node in a BST contains:
- **Value/Data**: The actual data stored
- **Left Child**: Reference to left subtree (smaller values)
- **Right Child**: Reference to right subtree (larger values)

\`\`\`python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
\`\`\`

---

## âœ… BST Properties

### **Ordering Property**
- Left subtree < Node < Right subtree
- This property must be maintained during all operations

### **No Duplicate Values**
- Typically, BSTs don't allow duplicate values
- Some implementations allow duplicates in right subtree

### **Inorder Traversal = Sorted Order**
- Traversing BST in inorder gives elements in sorted order
- This is a key property for sorting and searching applications

---

## ðŸ” Basic Operations Overview

| Operation | Time Complexity | Description |
|-----------|----------------|-------------|
| **Search** | O(log n) | Find if value exists |
| **Insert** | O(log n) | Add new value |
| **Delete** | O(log n) | Remove value |
| **Traversal** | O(n) | Visit all nodes |

---

## ðŸ’¡ Why Use BST?

### **Advantages**
- âœ… Efficient search, insert, delete operations
- âœ… Maintains sorted order automatically
- âœ… Dynamic size (unlike arrays)
- âœ… Easy to implement recursive algorithms

### **Applications**
- ðŸ“Š Database indexing
- ðŸ” Symbol tables in compilers
- ðŸ“± File system organization
- ðŸŽ¯ Auto-completion features
- ðŸ—‚ï¸ Priority queues implementation

---

## âš ï¸ Important Notes

- **Balance matters**: Tree height affects performance
- **Worst case**: Can degenerate to linked list (O(n) operations)
- **Self-balancing trees**: AVL, Red-Black trees solve this issue
- **Threaded BSTs**: Use null pointers for efficient traversal

---

## ðŸŽ¯ Key Takeaways

1. **BST maintains sorted order** through its structural properties
2. **Operations are efficient** when tree is balanced (O(log n))
3. **Inorder traversal** gives sorted sequence
4. **Used extensively** in computer science applications
5. **Foundation** for more advanced tree structures

Ready to dive into BST operations? Let's explore how to search, insert, and delete nodes in the next topic! ðŸš€`,
};


