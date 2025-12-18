import { SubLesson } from '../../../../data/lessonsData';

export const topic_13_4: SubLesson = {
  id: "13.4",
  title: 'BST Properties and Applications',
  status: 'demo',
  content: `# 🏗️ BST Properties and Applications

Explore the mathematical properties and real-world applications that make BSTs essential!

---

## 📐 Mathematical Properties

### **Height and Balance**

#### **Tree Height**
- **Height**: Longest path from root to leaf
- **Balanced Tree**: Height ≈ log₂(n)
- **Skewed Tree**: Height = n-1 (worst case)

\`\`\`python
def get_height(root):
    if not root:
        return 0
    return 1 + max(get_height(root.left), get_height(root.right))

# Example heights:
# Balanced: h ≈ log₂(n)
# Left-skewed: h = n-1
# Right-skewed: h = n-1
\`\`\`

#### **Balance Factor**
\`\`\`python
def balance_factor(node):
    if not node:
        return 0
    return get_height(node.left) - get_height(node.right)

# Balance Factor:
# = 0: Perfectly balanced
# = ±1: Acceptably balanced
# > ±1: Needs rebalancing
\`\`\`

---

## ⚖️ Time Complexity Analysis

| Operation | Average Case | Worst Case | Best Case |
|-----------|--------------|------------|-----------|
| **Search** | O(log n) | O(n) | O(1) |
| **Insert** | O(log n) | O(n) | O(1) |
| **Delete** | O(log n) | O(n) | O(1) |
| **Traversal** | O(n) | O(n) | O(n) |

### **Space Complexity**
- **O(n)** for storing nodes
- **O(log n)** auxiliary space (recursion stack)
- **O(n)** worst case (skewed tree)

---

## 🎯 Key BST Properties

### **1. Inorder Property**
- **Inorder traversal** = **Sorted sequence**
- Enables O(n) sorting with additional O(n) space

### **2. Search Tree Property**
- Left subtree < Root < Right subtree
- Enables O(log n) search operations

### **3. No Duplicate Property**
- Typically no duplicate values allowed
- Can be modified to allow duplicates

### **4. Dynamic Size**
- Can grow/shrink dynamically
- No fixed size limitations like arrays

---

## 🔧 Advanced BST Operations

### **Find K-th Smallest Element**
\`\`\`python
def kth_smallest(root, k):
    def inorder_count(node):
        nonlocal count, result
        if not node or result is not None:
            return

        inorder_count(node.left)

        count += 1
        if count == k:
            result = node.value
            return

        inorder_count(node.right)

    count = 0
    result = None
    inorder_count(root)
    return result

# Usage: kth_smallest(root, 3)  # 3rd smallest element
\`\`\`

### **Count Nodes in Range**
\`\`\`python
def count_in_range(root, low, high):
    if not root:
        return 0

    if root.value < low:
        return count_in_range(root.right, low, high)
    elif root.value > high:
        return count_in_range(root.left, low, high)
    else:
        return (1 +
                count_in_range(root.left, low, high) +
                count_in_range(root.right, low, high))

# Usage: count_in_range(root, 5, 15)  # Count nodes between 5-15
\`\`\`

### **Check if BST is Balanced**
\`\`\`python
def is_balanced(root):
    def check_height(node):
        if not node:
            return 0

        left_height = check_height(node.left)
        right_height = check_height(node.right)

        if left_height == -1 or right_height == -1:
            return -1

        if abs(left_height - right_height) > 1:
            return -1

        return 1 + max(left_height, right_height)

    return check_height(root) != -1
\`\`\`

---

## 🌟 Real-World Applications

### **1. Database Indexing**
\`\`\`
Database tables use BST-like structures:
- B-Trees (balanced BST variants)
- Fast lookup: O(log n)
- Range queries: O(log n + k)
- Dynamic updates
\`\`\`

### **2. File System Organization**
\`\`\`
Directory structures:
- Hierarchical organization
- Fast file/directory lookup
- Sorted directory listings
- Dynamic addition/removal
\`\`\`

### **3. Auto-completion Features**
\`\`\`
Search engines, IDEs, text editors:
- Prefix-based search
- Fast suggestions
- Alphabetical ordering
- Trie (prefix tree) implementation
\`\`\`

### **4. Symbol Tables in Compilers**
\`\`\`
Variable/function name lookup:
- Fast symbol resolution
- Scope management
- Sorted symbol tables
- Efficient memory management
\`\`\`

### **5. Priority Queues**
\`\`\`
Heap implementation:
- Fast insert/delete minimum
- O(log n) operations
- Used in algorithms like Dijkstra, Huffman coding
\`\`\`

### **6. Expression Evaluation**
\`\`\`
Mathematical expression trees:
- Inorder: infix notation
- Preorder: prefix notation
- Postorder: postfix evaluation
\`\`\`

---

## 🔄 BST Variants and Extensions

### **Self-Balancing BSTs**
- **AVL Trees**: Height-balanced, strict balance
- **Red-Black Trees**: Relaxed balance, used in C++ std::map
- **B-Trees**: Multi-way trees for disk storage

### **Specialized BSTs**
- **Threaded BST**: Null pointers point to inorder successor/predecessor
- **Interval Tree**: Stores intervals, finds overlapping intervals
- **Treap**: Combines BST and heap properties

---

## ⚠️ Common Pitfalls and Solutions

### **Problem 1: Unbalanced Trees**
\`\`\`
Issue: Operations become O(n) instead of O(log n)
Solution: Use self-balancing trees (AVL, Red-Black)
\`\`\`

### **Problem 2: Duplicate Handling**
\`\`\`
Issue: BST typically doesn't allow duplicates
Solutions:
- Store count in node
- Allow duplicates in right subtree
- Use multi-set approach
\`\`\`

### **Problem 3: Thread Safety**
\`\`\`
Issue: Concurrent access problems
Solutions:
- Read-write locks
- Immutable BSTs
- Concurrent skip lists
\`\`\`

---

## 🎯 Key Takeaways

1. **Balance is crucial** for optimal performance
2. **Inorder = sorted order** - fundamental property
3. **Wide applications** in databases, filesystems, compilers
4. **Self-balancing variants** solve performance issues
5. **Choose right variant** based on specific requirements
6. **Consider concurrency** for multi-threaded applications

BSTs are fundamental to computer science - understanding them deeply will serve you well! 🚀`,
};

