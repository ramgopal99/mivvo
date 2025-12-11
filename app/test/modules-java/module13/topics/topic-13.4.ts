import { SubLesson } from '../../../data/lessonsData';

export const topic_13_4: SubLesson = {
  id: 13.4,
  title: 'BST Properties and Applications',
  status: 'completed',
  content: `# 🏗️ BST Properties and Applications

Explore the mathematical properties and real-world applications that make BSTs essential in Java!

---

## 📐 Mathematical Properties

### **Height and Balance**

#### **Tree Height**
- **Height**: Longest path from root to leaf
- **Balanced Tree**: Height ≈ log₂(n)
- **Skewed Tree**: Height = n-1 (worst case)

\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Calculate tree height
    public int getHeight() {
        return getHeightRecursive(root);
    }

    private int getHeightRecursive(TreeNode<T> node) {
        if (node == null) {
            return 0;
        }
        return 1 + Math.max(getHeightRecursive(node.left),
                           getHeightRecursive(node.right));
    }

    // Check if tree is balanced (height difference ≤ 1)
    public boolean isBalanced() {
        return isBalancedRecursive(root) != -1;
    }

    private int isBalancedRecursive(TreeNode<T> node) {
        if (node == null) {
            return 0;
        }

        int leftHeight = isBalancedRecursive(node.left);
        if (leftHeight == -1) return -1;

        int rightHeight = isBalancedRecursive(node.right);
        if (rightHeight == -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Not balanced
        }

        return 1 + Math.max(leftHeight, rightHeight);
    }
}
\`\`\`

### **Tree Statistics**
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Count total nodes
    public int getSize() {
        return getSizeRecursive(root);
    }

    private int getSizeRecursive(TreeNode<T> node) {
        if (node == null) {
            return 0;
        }
        return 1 + getSizeRecursive(node.left) + getSizeRecursive(node.right);
    }

    // Count leaf nodes
    public int getLeafCount() {
        return getLeafCountRecursive(root);
    }

    private int getLeafCountRecursive(TreeNode<T> node) {
        if (node == null) {
            return 0;
        }
        if (node.left == null && node.right == null) {
            return 1; // Leaf node
        }
        return getLeafCountRecursive(node.left) + getLeafCountRecursive(node.right);
    }

    // Find minimum value
    public T findMin() {
        if (root == null) {
            throw new IllegalStateException("Tree is empty");
        }
        return findMinRecursive(root);
    }

    private T findMinRecursive(TreeNode<T> node) {
        while (node.left != null) {
            node = node.left;
        }
        return node.value;
    }

    // Find maximum value
    public T findMax() {
        if (root == null) {
            throw new IllegalStateException("Tree is empty");
        }
        return findMaxRecursive(root);
    }

    private T findMaxRecursive(TreeNode<T> node) {
        while (node.right != null) {
            node = node.right;
        }
        return node.value;
    }
}
\`\`\`

---

## 🔍 BST Validation

### **Check if Tree is Valid BST**
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Validate BST property
    public boolean isValidBST() {
        return isValidBSTRecursive(root, null, null);
    }

    private boolean isValidBSTRecursive(TreeNode<T> node, T min, T max) {
        if (node == null) {
            return true;
        }

        // Check current node value against bounds
        if ((min != null && node.value.compareTo(min) <= 0) ||
            (max != null && node.value.compareTo(max) >= 0)) {
            return false;
        }

        // Recursively check subtrees with updated bounds
        return isValidBSTRecursive(node.left, min, node.value) &&
               isValidBSTRecursive(node.right, node.value, max);
    }
}
\`\`\`

---

## 🌟 Real-World Applications

### **1. Database Indexing**
\`\`\`java
// Simplified database index using BST
public class DatabaseIndex<T extends Comparable<T>, V> {
    private class IndexEntry implements Comparable<IndexEntry> {
        T key;
        V value;

        public IndexEntry(T key, V value) {
            this.key = key;
            this.value = value;
        }

        @Override
        public int compareTo(IndexEntry other) {
            return this.key.compareTo(other.key);
        }
    }

    private BinarySearchTree<IndexEntry> index;

    public void insert(T key, V value) {
        index.insert(new IndexEntry(key, value));
    }

    public V search(T key) {
        // Find entry with matching key
        // Implementation would need custom search
        return null;
    }
}
\`\`\`

### **2. File System Organization**
\`\`\`java
// Simplified file system using BST
public class FileSystem {
    private class FileNode implements Comparable<FileNode> {
        String name;
        boolean isDirectory;
        List<FileNode> children;

        public FileNode(String name, boolean isDirectory) {
            this.name = name;
            this.isDirectory = isDirectory;
            this.children = new ArrayList<>();
        }

        @Override
        public int compareTo(FileNode other) {
            return this.name.compareTo(other.name);
        }
    }

    private BinarySearchTree<FileNode> files;

    public void createFile(String path) {
        // Parse path and create file nodes
        // Implementation would handle path traversal
    }
}
\`\`\`

### **3. Auto-completion Systems**
\`\`\`java
// Simplified auto-complete using BST
public class AutoComplete {
    private BinarySearchTree<String> words;

    public void addWord(String word) {
        words.insert(word.toLowerCase());
    }

    public List<String> getSuggestions(String prefix) {
        List<String> suggestions = new ArrayList<>();
        // Implementation would traverse tree to find words starting with prefix
        return suggestions;
    }
}
\`\`\`

### **4. Expression Evaluation**
\`\`\`java
// Binary expression tree
public class ExpressionTree {
    private class ExpressionNode {
        String value;
        ExpressionNode left, right;

        public ExpressionNode(String value) {
            this.value = value;
        }
    }

    private ExpressionNode root;

    // Evaluate mathematical expression
    public double evaluate() {
        return evaluateRecursive(root);
    }

    private double evaluateRecursive(ExpressionNode node) {
        if (node == null) return 0;

        // Leaf node (number)
        if (node.left == null && node.right == null) {
            return Double.parseDouble(node.value);
        }

        // Operator node
        double left = evaluateRecursive(node.left);
        double right = evaluateRecursive(node.right);

        switch (node.value) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
            default: throw new IllegalArgumentException("Unknown operator");
        }
    }
}
\`\`\`

---

## ⚡ Time Complexity Analysis

| Operation | Average Case | Worst Case | Best Case |
|-----------|-------------|------------|-----------|
| **Search** | O(log n) | O(n) | O(1) |
| **Insert** | O(log n) | O(n) | O(1) |
| **Delete** | O(log n) | O(n) | O(1) |
| **Traversal** | O(n) | O(n) | O(n) |

### **Space Complexity**
- **O(n)** - Each node stores data and references
- **Overhead**: 2 references per node (left, right)

---

## 🔧 Self-Balancing BSTs

### **Why Self-Balancing?**
- Regular BST can become skewed
- Skewed trees have O(n) operations
- Self-balancing maintains O(log n) guarantee

### **Popular Self-Balancing BSTs**
- **AVL Tree**: Height-balanced, strict balancing
- **Red-Black Tree**: Relaxes balancing for better performance
- **B-Tree**: Multi-way tree for disk storage

\`\`\`java
// Java's TreeMap uses Red-Black Tree internally
import java.util.TreeMap;

public class SelfBalancingExample {
    public static void main(String[] args) {
        TreeMap<Integer, String> treeMap = new TreeMap<>();

        // Automatically balanced insertions
        treeMap.put(3, "Three");
        treeMap.put(1, "One");
        treeMap.put(7, "Seven");
        treeMap.put(5, "Five");

        // Guaranteed O(log n) operations
        System.out.println(treeMap.get(5)); // "Five"
    }
}
\`\`\`

---

## 🧪 Complete BST Implementation with Utilities

\`\`\`java
import java.util.*;

public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode<T> root;

    // ... existing BST operations ...

    // Utility methods
    public int getHeight() {
        return getHeightRecursive(root);
    }

    public int getSize() {
        return getSizeRecursive(root);
    }

    public boolean isBalanced() {
        return isBalancedRecursive(root) != -1;
    }

    public boolean isValidBST() {
        return isValidBSTRecursive(root, null, null);
    }

    public T findMin() {
        if (root == null) throw new IllegalStateException("Tree is empty");
        return findMinRecursive(root);
    }

    public T findMax() {
        if (root == null) throw new IllegalStateException("Tree is empty");
        return findMaxRecursive(root);
    }

    // Private helper methods
    private int getHeightRecursive(TreeNode<T> node) {
        return node == null ? 0 :
               1 + Math.max(getHeightRecursive(node.left),
                           getHeightRecursive(node.right));
    }

    private int getSizeRecursive(TreeNode<T> node) {
        return node == null ? 0 :
               1 + getSizeRecursive(node.left) + getSizeRecursive(node.right);
    }

    private int isBalancedRecursive(TreeNode<T> node) {
        if (node == null) return 0;

        int left = isBalancedRecursive(node.left);
        if (left == -1) return -1;

        int right = isBalancedRecursive(node.right);
        if (right == -1) return -1;

        return Math.abs(left - right) > 1 ? -1 : 1 + Math.max(left, right);
    }

    private boolean isValidBSTRecursive(TreeNode<T> node, T min, T max) {
        if (node == null) return true;

        if ((min != null && node.value.compareTo(min) <= 0) ||
            (max != null && node.value.compareTo(max) >= 0)) {
            return false;
        }

        return isValidBSTRecursive(node.left, min, node.value) &&
               isValidBSTRecursive(node.right, node.value, max);
    }

    private T findMinRecursive(TreeNode<T> node) {
        while (node.left != null) node = node.left;
        return node.value;
    }

    private T findMaxRecursive(TreeNode<T> node) {
        while (node.right != null) node = node.right;
        return node.value;
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Height affects performance** - balanced trees are faster
2. **Validation ensures BST property** - useful for debugging
3. **Multiple real-world applications** - databases, file systems, search
4. **Self-balancing variants** exist for guaranteed performance
5. **Java's TreeMap uses Red-Black Tree** - automatically balanced

**Congratulations!** You've mastered Binary Search Trees in Java! 🎉`
};
