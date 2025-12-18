import { SubLesson } from '../../../data/lessonsData';

export const topic_13_2: SubLesson = {
  id: 13.2,
  title: 'BST Operations: Search, Insert, Delete',
  status: 'completed',
  content: `# 🔍 BST Operations: Search, Insert, Delete

Master the core operations that make Binary Search Trees powerful and efficient in Java!

---

## 🎯 Search Operation

### **How Search Works**
- Start from root node
- Compare target with current node using \`compareTo()\`
- Go left if target < current, right if target > current
- Continue until found or reach null

\`\`\`java
public class TreeNode<T extends Comparable<T>> {
    T value;
    TreeNode<T> left, right;

    public TreeNode(T value) {
        this.value = value;
        left = right = null;
    }
}

public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode<T> root;

    // Search operation
    public boolean search(T target) {
        return searchRecursive(root, target);
    }

    private boolean searchRecursive(TreeNode<T> node, T target) {
        if (node == null) {
            return false; // Not found
        }

        int comparison = target.compareTo(node.value);

        if (comparison == 0) {
            return true; // Found!
        } else if (comparison < 0) {
            return searchRecursive(node.left, target); // Search left
        } else {
            return searchRecursive(node.right, target); // Search right
        }
    }
}
\`\`\`

### **Search Time Complexity**
- **Best Case**: O(1) - root node
- **Average Case**: O(log n) - balanced tree
- **Worst Case**: O(n) - skewed tree

---

## ➕ Insert Operation

### **How Insert Works**
1. Search for the correct position (like search)
2. When null reached, create new node there
3. Maintain BST property during insertion

\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Insert operation
    public void insert(T value) {
        root = insertRecursive(root, value);
    }

    private TreeNode<T> insertRecursive(TreeNode<T> node, T value) {
        if (node == null) {
            return new TreeNode<>(value); // Create new node
        }

        int comparison = value.compareTo(node.value);

        if (comparison < 0) {
            node.left = insertRecursive(node.left, value);
        } else if (comparison > 0) {
            node.right = insertRecursive(node.right, value);
        }
        // If equal, typically ignore or handle duplicates

        return node;
    }
}
\`\`\`

### **Insert Examples**
\`\`\`
// Initial: empty tree
// Insert 8:     8

// Insert 3:     8
//             /
//            3

// Insert 10:    8
//              / \\
//             3   10

// Insert 1:     8
//              / \\
//             3   10
//            /
//           1
\`\`\`

---

## 🗑️ Delete Operation

### **Delete is Complex - Three Cases**

#### **Case 1: Leaf Node (No children)**
\`\`\`
// Delete 1 from tree
// Before:    8     After:    8
//           / \\            / \\
//          3   10   →     3   10
//         /
//        1
\`\`\`

#### **Case 2: One Child**
\`\`\`
// Delete 3 from tree
// Before:    8     After:    8
//           / \\            / \\
//          3   10   →     6   10
//           \\
//            6
\`\`\`

#### **Case 3: Two Children (Most Complex)**
\`\`\`
// Delete 8 from tree (has two children)
// Find inorder successor (smallest in right subtree)
// Before:    8     After:   10
//           / \\           / \\
//          3   10   →    3   14
//         / \\   \\       / \\   \\
//        1   6   14     1   6   14
//           / \\           / \\
//          4   7         4   7
\`\`\`

\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Delete operation
    public void delete(T value) {
        root = deleteRecursive(root, value);
    }

    private TreeNode<T> deleteRecursive(TreeNode<T> node, T value) {
        if (node == null) {
            return null;
        }

        int comparison = value.compareTo(node.value);

        if (comparison < 0) {
            node.left = deleteRecursive(node.left, value);
        } else if (comparison > 0) {
            node.right = deleteRecursive(node.right, value);
        } else {
            // Node found - handle three cases

            // Case 1: No children (leaf)
            if (node.left == null && node.right == null) {
                return null;
            }

            // Case 2: One child
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }

            // Case 3: Two children - find inorder successor
            T successorValue = findMin(node.right);
            node.value = successorValue;
            node.right = deleteRecursive(node.right, successorValue);
        }

        return node;
    }

    private T findMin(TreeNode<T> node) {
        while (node.left != null) {
            node = node.left;
        }
        return node.value;
    }
}
\`\`\`

---

## 🧪 Complete BST Implementation

\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode<T> root;

    public BinarySearchTree() {
        root = null;
    }

    // Search
    public boolean search(T target) {
        return searchRecursive(root, target);
    }

    private boolean searchRecursive(TreeNode<T> node, T target) {
        if (node == null) return false;

        int cmp = target.compareTo(node.value);
        if (cmp == 0) return true;
        if (cmp < 0) return searchRecursive(node.left, target);
        return searchRecursive(node.right, target);
    }

    // Insert
    public void insert(T value) {
        root = insertRecursive(root, value);
    }

    private TreeNode<T> insertRecursive(TreeNode<T> node, T value) {
        if (node == null) return new TreeNode<>(value);

        int cmp = value.compareTo(node.value);
        if (cmp < 0) {
            node.left = insertRecursive(node.left, value);
        } else if (cmp > 0) {
            node.right = insertRecursive(node.right, value);
        }
        return node;
    }

    // Delete
    public void delete(T value) {
        root = deleteRecursive(root, value);
    }

    private TreeNode<T> deleteRecursive(TreeNode<T> node, T value) {
        if (node == null) return null;

        int cmp = value.compareTo(node.value);
        if (cmp < 0) {
            node.left = deleteRecursive(node.left, value);
        } else if (cmp > 0) {
            node.right = deleteRecursive(node.right, value);
        } else {
            // Node to delete found
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;

            // Two children - find successor
            T successor = findMin(node.right);
            node.value = successor;
            node.right = deleteRecursive(node.right, successor);
        }
        return node;
    }

    private T findMin(TreeNode<T> node) {
        while (node.left != null) node = node.left;
        return node.value;
    }

    // Utility methods
    public boolean isEmpty() { return root == null; }
    public TreeNode<T> getRoot() { return root; }
}
\`\`\`

---

## 🧪 Testing BST Operations

\`\`\`java
public class BSTDemo {
    public static void main(String[] args) {
        BinarySearchTree<Integer> bst = new BinarySearchTree<>();

        // Insert elements
        bst.insert(8);
        bst.insert(3);
        bst.insert(10);
        bst.insert(1);
        bst.insert(6);
        bst.insert(14);
        bst.insert(4);
        bst.insert(7);
        bst.insert(13);

        // Search elements
        System.out.println("Search 6: " + bst.search(6));  // true
        System.out.println("Search 15: " + bst.search(15)); // false

        // Delete element
        bst.delete(3);
        System.out.println("Search 3 after delete: " + bst.search(3)); // false
    }
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Search**: Recursive traversal using compareTo()
2. **Insert**: Find null position and create new node
3. **Delete**: Three cases - leaf, one child, two children
4. **Time Complexity**: O(log n) average, O(n) worst case
5. **Space Complexity**: O(n) for storing nodes

**Next:** Learn BST traversal algorithms! 🚀`
};
