import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_1: SubLesson = {
  id: "13.1",
  title: 'Introduction to Binary Search Tree',
  status: 'completed',
  content: `# 🌳 Introduction to Binary Search Tree

A Binary Search Tree (BST) is a hierarchical data structure that maintains an ordered relationship between elements in Java!

---

## 🎯 What is a Binary Search Tree?

A **Binary Search Tree** is a binary tree data structure where each node has at most two children, and for each node:

- All values in the left subtree are **less than** the node's value
- All values in the right subtree are **greater than** the node's value

### **Visual Representation**
\`\`\`
        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\   /
      4   7 12
\`\`\`

---

## 🏗️ BST Node Structure in Java

Each node in a BST contains:
- **Value/Data**: The actual data stored (generic type)
- **Left Child**: Reference to left subtree (smaller values)
- **Right Child**: Reference to right subtree (larger values)

\`\`\`java
public class TreeNode<T extends Comparable<T>> {
    public T value;
    public TreeNode<T> left;
    public TreeNode<T> right;

    public TreeNode(T value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
\`\`\`

---

## ✅ BST Properties

### **1. Ordering Property**
- Left subtree < Parent < Right subtree
- Inorder traversal gives **sorted sequence**

### **2. No Duplicate Values**
- Typically, BSTs don't allow duplicate values
- Can be modified to allow duplicates if needed

### **3. Recursive Structure**
- Each subtree is itself a BST
- Root can be considered a BST with empty subtrees

---

## 🔍 BST vs Other Data Structures

| Data Structure | Search | Insert | Delete | Ordered |
|----------------|--------|--------|--------|---------|
| **Array** | O(n) | O(n) | O(n) | Yes |
| **Linked List** | O(n) | O(1) | O(1) | No |
| **BST** | O(log n) | O(log n) | O(log n) | Yes |

---

## 💡 When to Use BST?

### **Perfect for:**
- **Ordered data storage** with fast operations
- **Searching** frequently accessed elements
- **Maintaining sorted order** during insertions
- **Range queries** (find elements between values)

### **Common Applications:**
- Database indexing
- File system organization
- Auto-completion features
- Priority queues implementation

---

## 🛠️ Basic BST Implementation

\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode<T> root;

    public BinarySearchTree() {
        this.root = null;
    }

    // Basic structure - operations will be added in next topics
    public boolean isEmpty() {
        return root == null;
    }

    public TreeNode<T> getRoot() {
        return root;
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **BST maintains ordered data** with logarithmic time complexity
2. **Each node has at most 2 children** with specific ordering rules
3. **Inorder traversal** produces sorted output
4. **Perfect balance** gives optimal performance
5. **Used extensively** in databases, file systems, and search algorithms

**Next:** Learn BST operations - Search, Insert, and Delete! 🚀`
};

