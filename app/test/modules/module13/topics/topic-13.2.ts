import { SubLesson } from '../../../data/lessonsData';

export const topic_13_2: SubLesson = {
  id: 13.2,
  title: 'BST Operations: Search, Insert, Delete',
  status: 'demo',
  content: `# 🔍 BST Operations: Search, Insert, Delete

Master the core operations that make Binary Search Trees powerful and efficient!

---

## 🎯 Search Operation

### **How Search Works**
- Start from root node
- Compare target with current node
- Go left if target < current, right if target > current
- Continue until found or reach null

\`\`\`python
def search(root, target):
    if root is None or root.value == target:
        return root

    if target < root.value:
        return search(root.left, target)
    else:
        return search(root.right, target)

# Iterative version
def search_iterative(root, target):
    current = root
    while current is not None:
        if target == current.value:
            return current
        elif target < current.value:
            current = current.left
        else:
            current = current.right
    return None
\`\`\`

### **Search Complexity**
- **Best/Average Case**: O(log n) - balanced tree
- **Worst Case**: O(n) - skewed tree

---

## ➕ Insert Operation

### **How Insert Works**
- Follow search path to find correct position
- Create new node when reaching null position
- Maintain BST property during insertion

\`\`\`python
def insert(root, value):
    if root is None:
        return TreeNode(value)

    if value < root.value:
        root.left = insert(root.left, value)
    elif value > root.value:
        root.right = insert(root.right, value)
    # Ignore duplicates (or handle as needed)

    return root

# Iterative version
def insert_iterative(root, value):
    if root is None:
        return TreeNode(value)

    current = root
    parent = None

    while current is not None:
        parent = current
        if value < current.value:
            current = current.left
        elif value > current.value:
            current = current.right
        else:
            return root  # Duplicate found

    new_node = TreeNode(value)
    if value < parent.value:
        parent.left = new_node
    else:
        parent.right = new_node

    return root
\`\`\`

---

## 🗑️ Delete Operation

### **Three Delete Cases**

#### **Case 1: Leaf Node (No Children)**
\`\`\`
Before:     8      After:     8
          / \\               \\
         3   10     →        10
        / \\                /
       1   6              1
\`\`\`
Simply remove the node.

#### **Case 2: One Child**
\`\`\`
Before:     8      After:     8
          / \\               \\
         3   10     →        10
        / \\                /  \\
       1   6              1    14
            \\                 /
             7               7
\`\`\`
Replace node with its child.

#### **Case 3: Two Children**
\`\`\`
Before:     8      After:     6
          / \\               / \\
         3   10     →      1   8
        / \\                \\   \\
       1   6                4   10
            \\
             7
\`\`\`
Replace with inorder successor (smallest in right subtree) or inorder predecessor (largest in left subtree).

### **Delete Implementation**
\`\`\`python
def delete(root, value):
    if root is None:
        return root

    # Find the node to delete
    if value < root.value:
        root.left = delete(root.left, value)
    elif value > root.value:
        root.right = delete(root.right, value)
    else:
        # Node found - handle three cases

        # Case 1 & 2: 0 or 1 child
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left

        # Case 3: 2 children - find inorder successor
        successor = find_min(root.right)
        root.value = successor.value
        root.right = delete(root.right, successor.value)

    return root

def find_min(node):
    current = node
    while current.left is not None:
        current = current.left
    return current
\`\`\`

---

## ⚡ Operation Comparison

| Operation | Recursive | Iterative | Use Case |
|-----------|-----------|-----------|----------|
| **Search** | ✅ Clean code | ✅ Efficient | Both work well |
| **Insert** | ✅ Simple | ✅ Better for large trees | Iterative preferred |
| **Delete** | ✅ Standard | ❌ Complex | Recursive preferred |

---

## 🔍 Finding Min/Max Values

\`\`\`python
def find_minimum(root):
    if root is None:
        return None
    current = root
    while current.left is not None:
        current = current.left
    return current.value

def find_maximum(root):
    if root is None:
        return None
    current = root
    while current.right is not None:
        current = current.right
    return current.value
\`\`\`

---

## 🎯 Key Takeaways

1. **Search**: Follow left/right based on comparisons
2. **Insert**: Find correct position, add new node
3. **Delete**: Three cases - handle carefully to maintain BST property
4. **Recursive vs Iterative**: Both valid, choose based on constraints
5. **Min/Max**: Always at leftmost/rightmost positions

Practice these operations to master BST implementation! 💪`,
};
