import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_3: SubLesson = {
  id: "13.3",
  title: 'BST Traversal Algorithms',
  status: 'completed',
  content: "`# ðŸš¶ BST Traversal Algorithms

Learn different ways to visit all nodes in a Binary Search Tree systematically in Java!

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
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Inorder Traversal (Left, Root, Right)
    public void inorderTraversal() {
        inorderRecursive(root);
        System.out.println(); // New line after traversal
    }

    private void inorderRecursive(TreeNode<T> node) {
        if (node != null) {
            inorderRecursive(node.left);    // Visit left subtree
            System.out.print(node.value + " "); // Visit root
            inorderRecursive(node.right);   // Visit right subtree
        }
    }
}
\`\`\`

#### **2. Preorder Traversal (Root â†’ Left â†’ Right)**
\`\`\`
Tree:     8
         / \\
        3   10
       / \\    \\
      1   6    14

Preorder: [8, 3, 1, 6, 10, 14] â† **Root first**
\`\`\`

**Code:**
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Preorder Traversal (Root, Left, Right)
    public void preorderTraversal() {
        preorderRecursive(root);
        System.out.println();
    }

    private void preorderRecursive(TreeNode<T> node) {
        if (node != null) {
            System.out.print(node.value + " "); // Visit root first
            preorderRecursive(node.left);    // Then left subtree
            preorderRecursive(node.right);   // Then right subtree
        }
    }
}
\`\`\`

#### **3. Postorder Traversal (Left â†’ Right â†’ Root)**
\`\`\`
Tree:     8
         / \\
        3   10
       / \\    \\
      1   6    14

Postorder: [1, 6, 3, 14, 10, 8] â† **Root last**
\`\`\`

**Code:**
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Postorder Traversal (Left, Right, Root)
    public void postorderTraversal() {
        postorderRecursive(root);
        System.out.println();
    }

    private void postorderRecursive(TreeNode<T> node) {
        if (node != null) {
            postorderRecursive(node.left);    // Visit left subtree
            postorderRecursive(node.right);   // Visit right subtree
            System.out.print(node.value + " "); // Visit root last
        }
    }
}
\`\`\`

---

## ðŸŒŠ Breadth-First Traversal (Level Order)

### **Level Order Traversal (Queue-based)**
\`\`\`
Tree:     8
         / \\
        3   10
       / \\    \\
      1   6    14
         / \\   /
        4   7 12

Level Order: [8, 3, 10, 1, 6, 14, 4, 7, 12] â† **Level by level**
\`\`\`

**Code:**
\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Level Order Traversal (Breadth-First)
    public void levelOrderTraversal() {
        if (root == null) return;

        Queue<TreeNode<T>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode<T> current = queue.poll();
            System.out.print(current.value + " ");

            if (current.left != null) {
                queue.offer(current.left);
            }
            if (current.right != null) {
                queue.offer(current.right);
            }
        }
        System.out.println();
    }
}
\`\`\`

---

## ðŸ“Š Comparison of Traversals

| Traversal | Order | Use Case |
|-----------|-------|----------|
| **Inorder** | Left â†’ Root â†’ Right | Get **sorted** elements |
| **Preorder** | Root â†’ Left â†’ Right | Create **tree copy**, prefix notation |
| **Postorder** | Left â†’ Right â†’ Root | Delete tree, postfix notation |
| **Level Order** | Level by level | Find **shortest path**, level info |

---

## ðŸ”„ Iterative Traversals (Stack-based)

### **Iterative Inorder Traversal**
\`\`\`java
import java.util.Stack;

public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Iterative Inorder Traversal
    public void inorderIterative() {
        if (root == null) return;

        Stack<TreeNode<T>> stack = new Stack<>();
        TreeNode<T> current = root;

        while (current != null || !stack.isEmpty()) {
            // Reach the leftmost node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            // Process the node
            current = stack.pop();
            System.out.print(current.value + " ");

            // Move to right subtree
            current = current.right;
        }
        System.out.println();
    }
}
\`\`\`

### **Iterative Preorder Traversal**
\`\`\`java
public class BinarySearchTree<T extends Comparable<T>> {
    // ... existing code ...

    // Iterative Preorder Traversal
    public void preorderIterative() {
        if (root == null) return;

        Stack<TreeNode<T>> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode<T> current = stack.pop();
            System.out.print(current.value + " ");

            // Push right first, then left (so left is processed first)
            if (current.right != null) {
                stack.push(current.right);
            }
            if (current.left != null) {
                stack.push(current.left);
            }
        }
        System.out.println();
    }
}
\`\`\`

---

## ðŸ§ª Complete BST with All Traversals

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class BinarySearchTree<T extends Comparable<T>> {
    private TreeNode<T> root;

    // ... existing BST operations ...

    // All traversal methods
    public void inorderTraversal() {
        inorderRecursive(root);
        System.out.println();
    }

    public void preorderTraversal() {
        preorderRecursive(root);
        System.out.println();
    }

    public void postorderTraversal() {
        postorderRecursive(root);
        System.out.println();
    }

    public void levelOrderTraversal() {
        if (root == null) return;

        Queue<TreeNode<T>> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode<T> current = queue.poll();
            System.out.print(current.value + " ");

            if (current.left != null) queue.offer(current.left);
            if (current.right != null) queue.offer(current.right);
        }
        System.out.println();
    }

    // Recursive implementations
    private void inorderRecursive(TreeNode<T> node) {
        if (node != null) {
            inorderRecursive(node.left);
            System.out.print(node.value + " ");
            inorderRecursive(node.right);
        }
    }

    private void preorderRecursive(TreeNode<T> node) {
        if (node != null) {
            System.out.print(node.value + " ");
            preorderRecursive(node.left);
            preorderRecursive(node.right);
        }
    }

    private void postorderRecursive(TreeNode<T> node) {
        if (node != null) {
            postorderRecursive(node.left);
            postorderRecursive(node.right);
            System.out.print(node.value + " ");
        }
    }
}
\`\`\`

---

## ðŸ§ª Testing All Traversals

\`\`\`java
public class BSTTraversalDemo {
    public static void main(String[] args) {
        BinarySearchTree<Integer> bst = new BinarySearchTree<>();

        // Build tree: 8, 3, 10, 1, 6, 14, 4, 7, 13
        bst.insert(8);
        bst.insert(3);
        bst.insert(10);
        bst.insert(1);
        bst.insert(6);
        bst.insert(14);
        bst.insert(4);
        bst.insert(7);
        bst.insert(13);

        System.out.println("Inorder (Sorted): ");
        bst.inorderTraversal();     // 1 3 4 6 7 8 10 13 14

        System.out.println("Preorder: ");
        bst.preorderTraversal();    // 8 3 1 6 4 7 10 14 13

        System.out.println("Postorder: ");
        bst.postorderTraversal();   // 1 4 7 6 3 13 14 10 8

        System.out.println("Level Order: ");
        bst.levelOrderTraversal();  // 8 3 10 1 6 14 4 7 13
    }
}
\`\`\`

---

## ðŸŽ¯ Key Takeaways

1. **Inorder**: Left â†’ Root â†’ Right (gives sorted order in BST)
2. **Preorder**: Root â†’ Left â†’ Right (useful for copying trees)
3. **Postorder**: Left â†’ Right â†’ Root (useful for deletion)
4. **Level Order**: Breadth-first, level by level
5. **Recursive**: Simple but can cause stack overflow for deep trees
6. **Iterative**: Uses stacks/queues, better for large trees

**Next:** Learn BST properties and applications! ðŸš€`
};


