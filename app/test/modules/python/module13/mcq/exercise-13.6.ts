import { Exercise } from '../../../data/lessonsData';

export const exercise_13_6: Exercise = {
  id: 13.6,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement a Binary Search Tree with basic operations:\n1. Create a TreeNode class and BST class\n2. Implement insert, search, and delete operations\n3. Add methods for inorder, preorder, and postorder traversal\n4. Implement find_min and find_max methods\n5. Test all operations with sample data",
      solution: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        """Insert value into BST"""
        if self.root is None:
            self.root = TreeNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        """Search for value in BST"""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None or node.value == value:
            return node
        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)

    def delete(self, value):
        """Delete value from BST"""
        self.root = self._delete_recursive(self.root, value)

    def _delete_recursive(self, node, value):
        if node is None:
            return node

        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Node with one child or no child
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left

            # Node with two children: get inorder successor
            successor = self._find_min(node.right)
            node.value = successor.value
            node.right = self._delete_recursive(node.right, successor.value)

        return node

    def find_min(self):
        """Find minimum value in BST"""
        if self.root is None:
            return None
        return self._find_min(self.root).value

    def _find_min(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current

    def find_max(self):
        """Find maximum value in BST"""
        if self.root is None:
            return None
        current = self.root
        while current.right is not None:
            current = current.right
        return current.value

    def inorder_traversal(self):
        """Inorder traversal: left, root, right"""
        result = []
        self._inorder_recursive(self.root, result)
        return result

    def _inorder_recursive(self, node, result):
        if node:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)

    def preorder_traversal(self):
        """Preorder traversal: root, left, right"""
        result = []
        self._preorder_recursive(self.root, result)
        return result

    def _preorder_recursive(self, node, result):
        if node:
            result.append(node.value)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)

    def postorder_traversal(self):
        """Postorder traversal: left, right, root"""
        result = []
        self._postorder_recursive(self.root, result)
        return result

    def _postorder_recursive(self, node, result):
        if node:
            self._postorder_recursive(node.left, result)
            self._postorder_recursive(node.right, result)
            result.append(node.value)

# Test the BST
print("Binary Search Tree Operations:")
bst = BinarySearchTree()

# Insert values
values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
print("Inserting values:")
for val in values:
    bst.insert(val)
    print(f"Inserted {val}")

print(f"\nInorder (sorted): {bst.inorder_traversal()}")
print(f"Preorder: {bst.preorder_traversal()}")
print(f"Postorder: {bst.postorder_traversal()}")

print(f"\nMin value: {bst.find_min()}")
print(f"Max value: {bst.find_max()}")

# Search operations
search_vals = [6, 15, 8]
print("\nSearch operations:")
for val in search_vals:
    found = bst.search(val)
    print(f"Search {val}: {'Found' if found else 'Not found'}")

# Delete operations
print("\nDelete operations:")
delete_vals = [3, 14, 8]
for val in delete_vals:
    bst.delete(val)
    print(f"Deleted {val}, Inorder: {bst.inorder_traversal()}")

print("\nBST maintains sorted order automatically!")
print("All operations are efficient when tree is balanced.")`
    },
    {
      id: "ex2",
      question: "Implement BST validation and properties checking:\n1. Create a function to check if a binary tree is a valid BST\n2. Implement methods to calculate tree height and check balance\n3. Add functions to count nodes, leaves, and full nodes\n4. Create a method to find the kth smallest element\n5. Implement level-order traversal (breadth-first)\n6. Test all validation and property methods",
      solution: `class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BSTValidator:
    def is_valid_bst(self, root):
        """Check if binary tree is a valid BST"""
        return self._is_valid_bst_recursive(root, float('-inf'), float('inf'))

    def _is_valid_bst_recursive(self, node, min_val, max_val):
        if node is None:
            return True

        if node.value <= min_val or node.value >= max_val:
            return False

        return (self._is_valid_bst_recursive(node.left, min_val, node.value) and
                self._is_valid_bst_recursive(node.right, node.value, max_val))

    def get_height(self, root):
        """Calculate height of the tree"""
        if root is None:
            return 0
        left_height = self.get_height(root.left)
        right_height = self.get_height(root.right)
        return max(left_height, right_height) + 1

    def is_balanced(self, root):
        """Check if tree is balanced (height difference <= 1)"""
        if root is None:
            return True

        left_height = self.get_height(root.left)
        right_height = self.get_height(root.right)

        if abs(left_height - right_height) > 1:
            return False

        return self.is_balanced(root.left) and self.is_balanced(root.right)

    def count_nodes(self, root):
        """Count total number of nodes"""
        if root is None:
            return 0
        return 1 + self.count_nodes(root.left) + self.count_nodes(root.right)

    def count_leaves(self, root):
        """Count number of leaf nodes"""
        if root is None:
            return 0
        if root.left is None and root.right is None:
            return 1
        return self.count_leaves(root.left) + self.count_leaves(root.right)

    def count_full_nodes(self, root):
        """Count nodes with two children"""
        if root is None:
            return 0
        count = 0
        if root.left is not None and root.right is not None:
            count = 1
        return count + self.count_full_nodes(root.left) + self.count_full_nodes(root.right)

    def find_kth_smallest(self, root, k):
        """Find the kth smallest element using inorder traversal"""
        result = []
        self._inorder_for_kth(root, result)
        if 1 <= k <= len(result):
            return result[k - 1]
        return None

    def _inorder_for_kth(self, node, result):
        if node:
            self._inorder_for_kth(node.left, result)
            result.append(node.value)
            self._inorder_for_kth(node.right, result)

    def level_order_traversal(self, root):
        """Breadth-first traversal using queue"""
        if root is None:
            return []

        result = []
        queue = [root]

        while queue:
            current = queue.pop(0)
            result.append(current.value)

            if current.left:
                queue.append(current.left)
            if current.right:
                queue.append(current.right)

        return result

# Test BST validation and properties
validator = BSTValidator()

# Create a valid BST
root = TreeNode(8)
root.left = TreeNode(3)
root.right = TreeNode(10)
root.left.left = TreeNode(1)
root.left.right = TreeNode(6)
root.right.right = TreeNode(14)

print("BST Properties Analysis:")
print(f"Is valid BST: {validator.is_valid_bst(root)}")
print(f"Height: {validator.get_height(root)}")
print(f"Is balanced: {validator.is_balanced(root)}")
print(f"Total nodes: {validator.count_nodes(root)}")
print(f"Leaf nodes: {validator.count_leaves(root)}")
print(f"Full nodes (2 children): {validator.count_full_nodes(root)}")

print(f"\nLevel-order traversal: {validator.level_order_traversal(root)}")

# Test kth smallest
for k in range(1, 8):
    kth = validator.find_kth_smallest(root, k)
    print(f"{k}th smallest: {kth}")

# Test with invalid BST
print("\nTesting invalid BST:")
invalid_root = TreeNode(5)
invalid_root.left = TreeNode(10)  # Invalid: left child > parent
invalid_root.right = TreeNode(15)
print(f"Is valid BST: {validator.is_valid_bst(invalid_root)}")

print("\nBST Validation ensures data integrity!")
print("- Valid BST: Left < Root < Right")
print("- Balance prevents performance degradation")
print("- Properties help analyze tree structure")`
    },
    {
      id: "ex3",
      question: "Implement BST applications and advanced operations:\n1. Create a BST-based dictionary (key-value pairs)\n2. Implement range queries (find all values in a range)\n3. Add closest value finder (find value closest to target)\n4. Create a BST iterator for inorder traversal\n5. Implement tree comparison and merging\n6. Demonstrate all applications with examples",
      solution: `class TreeNode:
    def __init__(self, key, value=None):
        self.key = key
        self.value = value
        self.left = None
        self.right = None

class BSTDictionary:
    def __init__(self):
        self.root = None

    def put(self, key, value):
        """Insert or update key-value pair"""
        self.root = self._put_recursive(self.root, key, value)

    def _put_recursive(self, node, key, value):
        if node is None:
            return TreeNode(key, value)

        if key < node.key:
            node.left = self._put_recursive(node.left, key, value)
        elif key > node.key:
            node.right = self._put_recursive(node.right, key, value)
        else:
            node.value = value  # Update existing

        return node

    def get(self, key):
        """Get value for key"""
        node = self._get_recursive(self.root, key)
        return node.value if node else None

    def _get_recursive(self, node, key):
        if node is None or node.key == key:
            return node

        if key < node.key:
            return self._get_recursive(node.left, key)
        return self._get_recursive(node.right, key)

    def range_query(self, min_key, max_key):
        """Find all keys in range [min_key, max_key]"""
        result = []
        self._range_query_recursive(self.root, min_key, max_key, result)
        return result

    def _range_query_recursive(self, node, min_key, max_key, result):
        if node is None:
            return

        if min_key < node.key:
            self._range_query_recursive(node.left, min_key, max_key, result)

        if min_key <= node.key <= max_key:
            result.append((node.key, node.value))

        if max_key > node.key:
            self._range_query_recursive(node.right, min_key, max_key, result)

    def find_closest(self, target):
        """Find key closest to target"""
        if self.root is None:
            return None

        closest = self.root.key
        self._find_closest_recursive(self.root, target, closest)
        return closest

    def _find_closest_recursive(self, node, target, closest):
        if node is None:
            return

        if abs(node.key - target) < abs(closest - target):
            closest = node.key

        if target < node.key:
            self._find_closest_recursive(node.left, target, closest)
        elif target > node.key:
            self._find_closest_recursive(node.right, target, closest)

class BSTIterator:
    """Iterator for inorder traversal"""
    def __init__(self, root):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def has_next(self):
        return len(self.stack) > 0

    def next(self):
        if not self.has_next():
            raise StopIteration

        node = self.stack.pop()
        if node.right:
            self._push_left(node.right)
        return node.key

# Test BST applications
print("BST Dictionary (Key-Value Store):")
bst_dict = BSTDictionary()

# Insert key-value pairs
data = [("apple", 1.50), ("banana", 0.75), ("cherry", 3.00), ("date", 4.50), ("elderberry", 2.25)]
for key, value in data:
    bst_dict.put(key, value)
    print(f"Put {key}: {value}")

# Get values
print("\nRetrieving values:")
keys_to_get = ["banana", "date", "fig"]
for key in keys_to_get:
    value = bst_dict.get(key)
    print(f"Get {key}: {value}")

# Range query
print(f"\nRange query ['b', 'e']:")
range_result = bst_dict.range_query("b", "e")
for key, value in range_result:
    print(f"  {key}: {value}")

# Find closest
targets = [2.0, 3.5, 5.0]
print("\nFinding closest keys:")
for target in targets:
    closest = bst_dict.find_closest(target)
    print(f"Closest to {target}: {closest}")

# BST Iterator
print("\nBST Iterator (inorder traversal):")
iterator = BSTIterator(bst_dict.root)
values = []
while iterator.has_next():
    values.append(iterator.next())
print(f"Sorted keys: {values}")

print("\nBST Applications:")
print("- Dictionary: Efficient key-value storage")
print("- Range queries: Find elements in value ranges")
print("- Closest value: Find nearest neighbor")
print("- Iterator: Memory-efficient traversal")
print("- Perfect for ordered data operations!")`
    },
    {
      id: "ex4",
      question: "Implement advanced BST algorithms and analysis:\n1. Create functions to check if BST is complete or perfect\n2. Implement lowest common ancestor (LCA) finder\n3. Add diameter calculation (longest path between any two nodes)\n4. Create BST from sorted array and vice versa\n5. Implement tree serialization and deserialization\n6. Analyze BST vs other data structures performance",
      solution: `# Advanced BST Algorithms and Analysis

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BSTAnalyzer:
    def is_complete_bst(self, root):
        """Check if BST is complete (all levels filled except possibly last)"""
        if root is None:
            return True

        queue = [root]
        found_none = False

        while queue:
            node = queue.pop(0)

            if node is None:
                found_none = True
            else:
                if found_none:
                    return False  # Node after None found
                queue.append(node.left)
                queue.append(node.right)

        return True

    def is_perfect_bst(self, root):
        """Check if BST is perfect (all levels completely filled)"""
        if root is None:
            return True

        # Calculate height
        height = self._get_height(root)

        # Check if all leaves are at same level and all internal nodes have 2 children
        return self._is_perfect_recursive(root, height, 0)

    def _is_perfect_recursive(self, node, height, level):
        if node is None:
            return True

        if node.left is None and node.right is None:
            return height == level + 1

        if node.left is None or node.right is None:
            return False

        return (self._is_perfect_recursive(node.left, height, level + 1) and
                self._is_perfect_recursive(node.right, height, level + 1))

    def _get_height(self, node):
        if node is None:
            return 0
        return 1 + max(self._get_height(node.left), self._get_height(node.right))

    def find_lca(self, root, n1, n2):
        """Find Lowest Common Ancestor of two nodes"""
        if root is None:
            return None

        # If both n1 and n2 are smaller, LCA is in left subtree
        if root.value > n1 and root.value > n2:
            return self.find_lca(root.left, n1, n2)

        # If both n1 and n2 are greater, LCA is in right subtree
        if root.value < n1 and root.value < n2:
            return self.find_lca(root.right, n1, n2)

        # Otherwise, current node is LCA
        return root

    def diameter(self, root):
        """Find diameter (longest path between any two nodes)"""
        if root is None:
            return 0

        # Get height of left and right subtrees
        left_height = self._get_height(root.left)
        right_height = self._get_height(root.right)

        # Return maximum of:
        # 1. Diameter of left subtree
        # 2. Diameter of right subtree
        # 3. Height of left + height of right + 1
        return max(
            self.diameter(root.left),
            self.diameter(root.right),
            left_height + right_height + 1
        )

    def sorted_array_to_bst(self, arr):
        """Convert sorted array to balanced BST"""
        if not arr:
            return None
        return self._sorted_array_to_bst(arr, 0, len(arr) - 1)

    def _sorted_array_to_bst(self, arr, start, end):
        if start > end:
            return None

        # Middle element becomes root
        mid = (start + end) // 2
        root = TreeNode(arr[mid])

        # Recursively construct left and right subtrees
        root.left = self._sorted_array_to_bst(arr, start, mid - 1)
        root.right = self._sorted_array_to_bst(arr, mid + 1, end)

        return root

    def bst_to_sorted_array(self, root):
        """Convert BST to sorted array (inorder traversal)"""
        result = []
        self._inorder_to_array(root, result)
        return result

    def _inorder_to_array(self, node, result):
        if node:
            self._inorder_to_array(node.left, result)
            result.append(node.value)
            self._inorder_to_array(node.right, result)

    def serialize(self, root):
        """Serialize BST to string"""
        if root is None:
            return "null"

        return f"{root.value},{self.serialize(root.left)},{self.serialize(root.right)}"

    def deserialize(self, data):
        """Deserialize string to BST"""
        def build_tree(values):
            val = next(values)
            if val == "null":
                return None
            node = TreeNode(int(val))
            node.left = build_tree(values)
            node.right = build_tree(values)
            return node

        values = iter(data.split(','))
        return build_tree(values)

# Test advanced BST algorithms
analyzer = BSTAnalyzer()

# Create a balanced BST from sorted array
sorted_arr = [1, 2, 3, 4, 5, 6, 7]
print("Creating BST from sorted array:")
print(f"Sorted array: {sorted_arr}")
root = analyzer.sorted_array_to_bst(sorted_arr)

print(f"Is complete BST: {analyzer.is_complete_bst(root)}")
print(f"Is perfect BST: {analyzer.is_perfect_bst(root)}")

# Test LCA
lca = analyzer.find_lca(root, 2, 6)
print(f"LCA of 2 and 6: {lca.value if lca else None}")

# Test diameter
diameter = analyzer.diameter(root)
print(f"Diameter: {diameter}")

# Convert back to array
back_to_array = analyzer.bst_to_sorted_array(root)
print(f"Back to sorted array: {back_to_array}")

# Test serialization
serialized = analyzer.serialize(root)
print(f"Serialized: {serialized}")

deserialized = analyzer.deserialize(serialized)
deserialized_array = analyzer.bst_to_sorted_array(deserialized)
print(f"Deserialized and converted back: {deserialized_array}")

print("\nAdvanced BST Operations:")
print("- Complete BST: All levels filled except possibly last")
print("- Perfect BST: All levels completely filled")
print("- LCA: Lowest common ancestor for efficient queries")
print("- Diameter: Longest path between any two nodes")
print("- Serialization: Convert tree to/from string")
print("- BST construction: O(n) from sorted array")

# Performance comparison
print("\nData Structure Performance Comparison:")
print("Operation    | Array | Linked List | BST (balanced)")
print("-------------|-------|-------------|----------------")
print("Search       | O(log n) | O(n)       | O(log n)")
print("Insert       | O(n)  | O(1)       | O(log n)")
print("Delete       | O(n)  | O(1)       | O(log n)")
print("Range query  | O(n)  | O(n)       | O(k + log n)*")
print("* k = number of elements in range")`
    },
    {
      id: "ex5",
      question: "Implement BST visualization and educational tools:\n1. Create ASCII tree visualization\n2. Implement tree statistics calculator\n3. Add path finding between nodes\n4. Create tree comparison tools\n5. Implement educational BST simulator\n6. Demonstrate tree transformations and analysis",
      solution: `# BST Visualization and Educational Tools

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BSTVisualizer:
    def print_tree(self, root):
        """Print ASCII representation of BST"""
        self._print_tree_helper(root, "", True)

    def _print_tree_helper(self, node, prefix, is_left):
        if node is not None:
            # Print right subtree first (for left-to-right reading)
            self._print_tree_helper(node.right, prefix + ("│   " if is_left else "    "), False)

            # Print current node
            print(prefix + ("└── " if is_left else "┌── ") + str(node.value))

            # Print left subtree
            self._print_tree_helper(node.left, prefix + ("    " if is_left else "│   "), True)

    def get_tree_stats(self, root):
        """Calculate comprehensive tree statistics"""
        if root is None:
            return {
                'height': 0,
                'node_count': 0,
                'leaf_count': 0,
                'internal_count': 0,
                'min_value': None,
                'max_value': None,
                'is_balanced': True,
                'is_complete': True
            }

        height = self._get_height(root)
        node_count = self._count_nodes(root)
        leaf_count = self._count_leaves(root)
        internal_count = node_count - leaf_count
        min_val = self._find_min(root)
        max_val = self._find_max(root)
        is_balanced = self._is_balanced(root)
        is_complete = self._is_complete(root)

        return {
            'height': height,
            'node_count': node_count,
            'leaf_count': leaf_count,
            'internal_count': internal_count,
            'min_value': min_val,
            'max_value': max_val,
            'is_balanced': is_balanced,
            'is_complete': is_complete
        }

    def _get_height(self, node):
        if node is None:
            return 0
        return 1 + max(self._get_height(node.left), self._get_height(node.right))

    def _count_nodes(self, node):
        if node is None:
            return 0
        return 1 + self._count_nodes(node.left) + self._count_nodes(node.right)

    def _count_leaves(self, node):
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self._count_leaves(node.left) + self._count_leaves(node.right)

    def _find_min(self, node):
        current = node
        while current.left:
            current = current.left
        return current.value

    def _find_max(self, node):
        current = node
        while current.right:
            current = current.right
        return current.value

    def _is_balanced(self, node):
        if node is None:
            return True

        left_height = self._get_height(node.left)
        right_height = self._get_height(node.right)

        if abs(left_height - right_height) > 1:
            return False

        return self._is_balanced(node.left) and self._is_balanced(node.right)

    def _is_complete(self, node):
        if node is None:
            return True

        queue = [node]
        found_none = False

        while queue:
            current = queue.pop(0)

            if current is None:
                found_none = True
            else:
                if found_none:
                    return False
                queue.append(current.left)
                queue.append(current.right)

        return True

    def find_path(self, root, target):
        """Find path from root to target node"""
        path = []
        if self._find_path_recursive(root, target, path):
            return path
        return None

    def _find_path_recursive(self, node, target, path):
        if node is None:
            return False

        path.append(node.value)

        if node.value == target:
            return True

        if (self._find_path_recursive(node.left, target, path) or
            self._find_path_recursive(node.right, target, path)):
            return True

        path.pop()
        return False

    def compare_trees(self, root1, root2):
        """Compare two BSTs for structural equality"""
        if root1 is None and root2 is None:
            return True
        if root1 is None or root2 is None:
            return False

        return (root1.value == root2.value and
                self.compare_trees(root1.left, root2.left) and
                self.compare_trees(root1.right, root2.right))

class BSTSimulator:
    """Educational BST simulator"""
    def __init__(self):
        self.visualizer = BSTVisualizer()
        self.root = None

    def insert(self, value):
        """Insert with educational output"""
        print(f"\nInserting {value}:")
        if self.root is None:
            self.root = TreeNode(value)
            print(f"Created root node: {value}")
        else:
            self._insert_with_path(self.root, value, "")

    def _insert_with_path(self, node, value, path):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
                print(f"Inserted {value} as left child of {node.value}")
                print(f"Path taken: Root{path} -> Left")
            else:
                self._insert_with_path(node.left, value, path + " -> Left")
        else:
            if node.right is None:
                node.right = TreeNode(value)
                print(f"Inserted {value} as right child of {node.value}")
                print(f"Path taken: Root{path} -> Right")
            else:
                self._insert_with_path(node.right, value, path + " -> Right")

    def show_stats(self):
        """Display comprehensive tree statistics"""
        stats = self.visualizer.get_tree_stats(self.root)

        print("\n" + "="*50)
        print("BST STATISTICS")
        print("="*50)
        print(f"Height: {stats['height']}")
        print(f"Total nodes: {stats['node_count']}")
        print(f"Leaf nodes: {stats['leaf_count']}")
        print(f"Internal nodes: {stats['internal_count']}")
        print(f"Min value: {stats['min_value']}")
        print(f"Max value: {stats['max_value']}")
        print(f"Is balanced: {stats['is_balanced']}")
        print(f"Is complete: {stats['is_complete']}")
        print("="*50)

# Demonstrate BST visualization and education
simulator = BSTSimulator()

# Build a sample BST
values = [8, 3, 10, 1, 6, 14, 4, 7, 13]
print("Building BST with educational feedback:")
for value in values:
    simulator.insert(value)

print("\nASCII Tree Visualization:")
BSTVisualizer().print_tree(simulator.root)

simulator.show_stats()

# Test path finding
visualizer = BSTVisualizer()
path_to_6 = visualizer.find_path(simulator.root, 6)
path_to_13 = visualizer.find_path(simulator.root, 13)
print(f"\nPath to 6: {path_to_6}")
print(f"Path to 13: {path_to_13}")

# Test tree comparison
tree1_root = TreeNode(5)
tree1_root.left = TreeNode(3)
tree1_root.right = TreeNode(7)

tree2_root = TreeNode(5)
tree2_root.left = TreeNode(3)
tree2_root.right = TreeNode(7)

are_equal = visualizer.compare_trees(tree1_root, tree2_root)
print(f"\nTree comparison: {'Equal' if are_equal else 'Different'}")

print("\nBST Educational Tools:")
print("- ASCII visualization for understanding structure")
print("- Comprehensive statistics for analysis")
print("- Path finding for navigation")
print("- Tree comparison for validation")
print("- Interactive simulator for learning")
print("- Perfect for understanding BST concepts!")`
    }
  ]
};
