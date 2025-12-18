import { Exercise } from '../../../data/lessonsData';

export const exercise_14_6: Exercise = {
  id: 14.6,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement classic recursive algorithms:\n1. Create recursive factorial and fibonacci functions\n2. Implement recursive binary search\n3. Add memoization to fibonacci for optimization\n4. Compare recursive vs iterative approaches\n5. Analyze time and space complexity of each approach",
      solution: `# Classic Recursive Algorithms

def factorial_recursive(n):
    """Recursive factorial calculation"""
    # Base case
    if n <= 1:
        return 1
    # Recursive case
    return n * factorial_recursive(n - 1)

def factorial_iterative(n):
    """Iterative factorial calculation"""
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def fibonacci_recursive(n):
    """Basic recursive fibonacci (inefficient)"""
    # Base cases
    if n <= 1:
        return n
    # Recursive cases
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)

# Memoization cache for fibonacci
fib_cache = {}
def fibonacci_memoized(n):
    """Memoized fibonacci (efficient)"""
    # Check cache first
    if n in fib_cache:
        return fib_cache[n]

    # Base cases
    if n <= 1:
        result = n
    else:
        # Recursive cases with caching
        result = fibonacci_memoized(n - 1) + fibonacci_memoized(n - 2)

    # Store in cache
    fib_cache[n] = result
    return result

def binary_search_recursive(arr, target, left, right):
    """Recursive binary search"""
    # Base case: element not found
    if left > right:
        return -1

    # Calculate middle index
    mid = (left + right) // 2

    # Base case: element found
    if arr[mid] == target:
        return mid

    # Recursive cases
    if arr[mid] > target:
        # Search left half
        return binary_search_recursive(arr, target, left, mid - 1)
    else:
        # Search right half
        return binary_search_recursive(arr, target, mid + 1, right)

def binary_search_iterative(arr, target):
    """Iterative binary search for comparison"""
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            right = mid - 1
        else:
            left = mid + 1

    return -1

# Performance comparison function
import time

def compare_performance():
    """Compare recursive vs iterative approaches"""
    print("Performance Comparison")
    print("=" * 50)

    # Test factorial
    n = 10
    print(f"Factorial of {n}:")

    # Recursive factorial
    start = time.time()
    fact_rec = factorial_recursive(n)
    rec_time = time.time() - start

    # Iterative factorial
    start = time.time()
    fact_iter = factorial_iterative(n)
    iter_time = time.time() - start

    print(f"Recursive: {fact_rec} (time: {rec_time:.6f}s)")
    print(f"Iterative: {fact_iter} (time: {iter_time:.6f}s)")
    print(f"Results match: {fact_rec == fact_iter}")

    print(f"\nFibonacci number {n}:")

    # Recursive fibonacci (might be slow)
    start = time.time()
    try:
        fib_rec = fibonacci_recursive(n)
        rec_time = time.time() - start
        print(f"Basic recursive: {fib_rec} (time: {rec_time:.6f}s)")
    except RecursionError:
        print("Basic recursive: Too slow/deep recursion")
        rec_time = float('inf')

    # Memoized fibonacci
    start = time.time()
    fib_memo = fibonacci_memoized(n)
    memo_time = time.time() - start
    print(f"Memoized recursive: {fib_memo} (time: {memo_time:.6f}s)")

    # Test binary search
    arr = list(range(1000))
    target = 750

    print(f"\nBinary search for {target} in array of size {len(arr)}:")

    # Recursive binary search
    start = time.time()
    rec_result = binary_search_recursive(arr, target, 0, len(arr) - 1)
    rec_time = time.time() - start

    # Iterative binary search
    start = time.time()
    iter_result = binary_search_iterative(arr, target)
    iter_time = time.time() - start

    print(f"Recursive result: {rec_result} (time: {rec_time:.6f}s)")
    print(f"Iterative result: {iter_result} (time: {iter_time:.6f}s)")
    print(f"Results match: {rec_result == iter_result}")

# Run comparison
compare_performance()

print("\nComplexity Analysis:")
print("Algorithm          | Recursive Time | Recursive Space | Iterative Time | Iterative Space")
print("-------------------|----------------|-----------------|----------------|----------------")
print("Factorial          | O(n)          | O(n)           | O(n)          | O(1)")
print("Fibonacci (basic)  | O(2^n)        | O(n)           | O(n)          | O(1)")
print("Fibonacci (memo)   | O(n)          | O(n)           | O(n)          | O(1)")
print("Binary Search      | O(log n)      | O(log n)       | O(log n)      | O(1)")

print("\nRecursion Advantages:")
print("- Elegant and concise code")
print("- Natural for tree/graph problems")
print("- Automatic backtracking")

print("\nRecursion Disadvantages:")
print("- Stack overflow risk")
print("- Higher memory usage")
print("- Slower due to function calls")
print("- Harder to debug")

print("\nMemoization Benefits:")
print("- Eliminates redundant calculations")
print("- Can make exponential -> linear time")
print("- Perfect for problems with overlapping subproblems")`
    },
    {
      id: "ex2",
      question: "Implement recursive tree and graph algorithms:\n1. Create recursive tree traversals (inorder, preorder, postorder)\n2. Implement recursive binary tree operations\n3. Add recursive graph traversal (DFS)\n4. Create recursive path finding algorithms\n5. Demonstrate recursive problem solving patterns\n6. Compare recursive vs iterative tree traversals",
      solution: `# Recursive Tree and Graph Algorithms

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def inorder_traversal(root):
    """Recursive inorder traversal: Left, Root, Right"""
    result = []
    _inorder_helper(root, result)
    return result

def _inorder_helper(node, result):
    if node:
        _inorder_helper(node.left, result)
        result.append(node.value)
        _inorder_helper(node.right, result)

def preorder_traversal(root):
    """Recursive preorder traversal: Root, Left, Right"""
    result = []
    _preorder_helper(root, result)
    return result

def _preorder_helper(node, result):
    if node:
        result.append(node.value)
        _preorder_helper(node.left, result)
        _preorder_helper(node.right, result)

def postorder_traversal(root):
    """Recursive postorder traversal: Left, Right, Root"""
    result = []
    _postorder_helper(root, result)
    return result

def _postorder_helper(node, result):
    if node:
        _postorder_helper(node.left, result)
        _postorder_helper(node.right, result)
        result.append(node.value)

def tree_height(root):
    """Recursive tree height calculation"""
    if root is None:
        return 0
    left_height = tree_height(root.left)
    right_height = tree_height(root.right)
    return max(left_height, right_height) + 1

def count_nodes(root):
    """Recursive node counting"""
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)

def tree_sum(root):
    """Recursive sum of all node values"""
    if root is None:
        return 0
    return root.value + tree_sum(root.left) + tree_sum(root.right)

def find_max_path_sum(root):
    """Find maximum path sum in binary tree"""
    max_sum = float('-inf')

    def max_path_helper(node):
        nonlocal max_sum
        if node is None:
            return 0

        # Get maximum path sums from left and right subtrees
        left_sum = max(max_path_helper(node.left), 0)
        right_sum = max(max_path_helper(node.right), 0)

        # Update maximum path sum
        current_sum = node.value + left_sum + right_sum
        max_sum = max(max_sum, current_sum)

        # Return maximum path sum extending through current node
        return node.value + max(left_sum, right_sum)

    max_path_helper(root)
    return max_sum

# Graph representation using adjacency list
class Graph:
    def __init__(self):
        self.adj_list = {}

    def add_edge(self, u, v):
        if u not in self.adj_list:
            self.adj_list[u] = []
        if v not in self.adj_list:
            self.adj_list[v] = []
        self.adj_list[u].append(v)
        # For undirected graph, add both directions
        # self.adj_list[v].append(u)

    def dfs_recursive(self, start, visited=None):
        """Recursive Depth-First Search"""
        if visited is None:
            visited = set()

        visited.add(start)
        result = [start]

        # Visit all neighbors recursively
        for neighbor in self.adj_list.get(start, []):
            if neighbor not in visited:
                result.extend(self.dfs_recursive(neighbor, visited))

        return result

    def has_path(self, start, target, visited=None):
        """Recursive path finding"""
        if visited is None:
            visited = set()

        if start == target:
            return True

        visited.add(start)

        for neighbor in self.adj_list.get(start, []):
            if neighbor not in visited:
                if self.has_path(neighbor, target, visited):
                    return True

        return False

def build_sample_tree():
    """Build a sample binary tree"""
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    return root

def compare_traversals():
    """Compare recursive vs iterative traversals"""
    root = build_sample_tree()

    print("Tree Traversals:")
    print(f"Inorder: {inorder_traversal(root)}")
    print(f"Preorder: {preorder_traversal(root)}")
    print(f"Postorder: {postorder_traversal(root)}")

    print(f"\nTree Statistics:")
    print(f"Height: {tree_height(root)}")
    print(f"Node count: {count_nodes(root)}")
    print(f"Sum of values: {tree_sum(root)}")
    print(f"Max path sum: {find_max_path_sum(root)}")

def demonstrate_graph_algorithms():
    """Demonstrate recursive graph algorithms"""
    graph = Graph()

    # Build sample graph
    edges = [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (4, 7), (5, 7), (6, 7)]
    for u, v in edges:
        graph.add_edge(u, v)

    print("\nGraph Algorithms:")
    print(f"DFS from node 1: {graph.dfs_recursive(1)}")

    # Test path finding
    test_paths = [(1, 7), (2, 6), (4, 6), (1, 8)]
    for start, target in test_paths:
        has_path = graph.has_path(start, target)
        print(f"Path from {start} to {target}: {'Exists' if has_path else 'Does not exist'}")

# Run demonstrations
compare_traversals()
demonstrate_graph_algorithms()

print("\nRecursive Algorithm Patterns:")
print("1. Tree Traversal: Base case (None), recursive calls on children")
print("2. Divide & Conquer: Break problem into subproblems, combine results")
print("3. Backtracking: Try options, backtrack when stuck")
print("4. Memoization: Cache results to avoid redundant calculations")

print("\nWhen to Use Recursion:")
print("- Tree/Graph problems")
print("- Problems with recursive structure")
print("- Divide and conquer algorithms")
print("- When iterative solution is complex")

print("\nWhen to Avoid Recursion:")
print("- Deep recursion (risk of stack overflow)")
print("- Performance-critical code")
print("- Languages without tail call optimization")
print("- When iterative solution is simpler")`
    },
    {
      id: "ex3",
      question: "Implement recursive backtracking algorithms:\n1. Create recursive sudoku solver\n2. Implement N-Queens problem solver\n3. Add recursive maze solver\n4. Create recursive permutation generator\n5. Implement recursive subset sum finder\n6. Demonstrate backtracking problem-solving patterns",
      solution: `# Recursive Backtracking Algorithms

def solve_sudoku(board):
    """Recursive Sudoku solver using backtracking"""
    def find_empty():
        """Find empty cell (represented by 0)"""
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    return i, j
        return None

    def is_valid(num, row, col):
        """Check if number can be placed at position"""
        # Check row
        if num in board[row]:
            return False

        # Check column
        if num in [board[i][col] for i in range(9)]:
            return False

        # Check 3x3 box
        box_row, box_col = (row // 3) * 3, (col // 3) * 3
        for i in range(3):
            for j in range(3):
                if board[box_row + i][box_col + j] == num:
                    return False

        return True

    def solve():
        """Main solving function"""
        empty = find_empty()
        if not empty:
            return True  # Solved!

        row, col = empty

        # Try numbers 1-9
        for num in range(1, 10):
            if is_valid(num, row, col):
                board[row][col] = num

                if solve():  # Recurse
                    return True

                board[row][col] = 0  # Backtrack

        return False

    solve()
    return board

def solve_n_queens(n):
    """Solve N-Queens problem using backtracking"""
    def is_safe(board, row, col):
        """Check if queen can be placed at board[row][col]"""
        # Check column
        for i in range(row):
            if board[i][col] == 1:
                return False

        # Check upper-left diagonal
        for i, j in zip(range(row, -1, -1), range(col, -1, -1)):
            if board[i][j] == 1:
                return False

        # Check upper-right diagonal
        for i, j in zip(range(row, -1, -1), range(col, n)):
            if board[i][j] == 1:
                return False

        return True

    def solve(board, row):
        """Recursive function to solve N-Queens"""
        if row == n:
            return True  # All queens placed

        for col in range(n):
            if is_safe(board, row, col):
                board[row][col] = 1

                if solve(board, row + 1):
                    return True

                board[row][col] = 0  # Backtrack

        return False

    # Initialize empty board
    board = [[0 for _ in range(n)] for _ in range(n)]

    if solve(board, 0):
        return board
    return None

def solve_maze(maze, start, end):
    """Recursive maze solver using backtracking"""
    def is_valid_move(x, y):
        return (0 <= x < len(maze) and 0 <= y < len(maze[0]) and
                maze[x][y] == 0)  # 0 = open path

    def solve_path(x, y):
        # Base case: reached end
        if (x, y) == end:
            return True

        # Mark current cell as visited
        maze[x][y] = 2  # 2 = visited

        # Try all four directions
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # Up, Down, Left, Right

        for dx, dy in directions:
            new_x, new_y = x + dx, y + dy

            if is_valid_move(new_x, new_y):
                if solve_path(new_x, new_y):
                    return True

        # Backtrack: unmark current cell
        maze[x][y] = 0
        return False

    start_x, start_y = start
    if solve_path(start_x, start_y):
        # Mark start position
        maze[start_x][start_y] = 3  # 3 = solution path
        return maze
    return None

def generate_permutations(nums):
    """Generate all permutations using backtracking"""
    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return

        for i in range(len(remaining)):
            # Choose
            current.append(remaining[i])
            # Explore
            backtrack(current, remaining[:i] + remaining[i+1:])
            # Unchoose (backtrack)
            current.pop()

    result = []
    backtrack([], nums)
    return result

def subset_sum(nums, target):
    """Find if there is a subset that sums to target"""
    def backtrack(index, current_sum, subset):
        # Base case: target reached
        if current_sum == target:
            result.append(subset[:])
            return True

        # Base case: exceeded target or end of array
        if current_sum > target or index == len(nums):
            return False

        # Include current number
        subset.append(nums[index])
        if backtrack(index + 1, current_sum + nums[index], subset):
            return True
        subset.pop()  # Backtrack

        # Exclude current number
        if backtrack(index + 1, current_sum, subset):
            return True

        return False

    result = []
    backtrack(0, 0, [])
    return result if result else None

# Test all backtracking algorithms
print("Backtracking Algorithm Demonstrations")
print("=" * 50)

# Sudoku solver
print("1. Sudoku Solver:")
sudoku_board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

solved = solve_sudoku(sudoku_board)
print("Sudoku solved!" if solved else "No solution found")

# N-Queens
print("\n2. N-Queens (N=4):")
queens_solution = solve_n_queens(4)
if queens_solution:
    print("Solution found:")
    for row in queens_solution:
        print(row)
else:
    print("No solution found")

# Maze solver
print("\n3. Maze Solver:")
maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
]
start, end = (0, 0), (4, 4)

solved_maze = solve_maze(maze, start, end)
if solved_maze:
    print("Maze solved!")
    for row in solved_maze:
        print(row)
else:
    print("No solution found")

# Permutations
print("\n4. Permutations:")
nums = [1, 2, 3]
perms = generate_permutations(nums)
print(f"Permutations of {nums}:")
for perm in perms[:6]:  # Show first 6
    print(perm)

# Subset sum
print(f"\n5. Subset Sum (target=7):")
numbers = [3, 34, 4, 12, 5, 2]
target = 7
subsets = subset_sum(numbers, target)
if subsets:
    print(f"Found subsets that sum to {target}:")
    for subset in subsets:
        print(subset)
else:
    print("No subset found")

print("\nBacktracking Characteristics:")
print("- Try all possible solutions")
print("- Prune invalid paths early")
print("- Use recursion for state management")
print("- Backtrack when stuck")
print("- Perfect for constraint satisfaction problems")`
    },
    {
      id: "ex4",
      question: "Implement advanced recursive algorithms:\n1. Create recursive merge sort and quick sort\n2. Implement recursive Tower of Hanoi solver\n3. Add recursive flood fill algorithm\n4. Create recursive expression evaluator\n5. Implement recursive directory traversal\n6. Demonstrate advanced recursion patterns and optimization",
      solution: `# Advanced Recursive Algorithms

def merge_sort(arr):
    """Recursive merge sort implementation"""
    if len(arr) <= 1:
        return arr

    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Conquer (merge)
    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays"""
    result = []
    i = j = 0

    # Merge while both arrays have elements
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result

def quick_sort(arr):
    """Recursive quick sort implementation"""
    if len(arr) <= 1:
        return arr

    # Choose pivot (middle element)
    pivot = arr[len(arr) // 2]

    # Partition
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    # Recurse and combine
    return quick_sort(left) + middle + quick_sort(right)

def tower_of_hanoi(n, source, target, auxiliary):
    """Recursive Tower of Hanoi solver"""
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return

    # Move n-1 disks from source to auxiliary
    tower_of_hanoi(n-1, source, auxiliary, target)

    # Move nth disk from source to target
    print(f"Move disk {n} from {source} to {target}")

    # Move n-1 disks from auxiliary to target
    tower_of_hanoi(n-1, auxiliary, target, source)

class FloodFill:
    """Recursive flood fill algorithm"""
    def __init__(self, image):
        self.image = image
        self.rows = len(image)
        self.cols = len(image[0]) if self.rows > 0 else 0

    def fill(self, start_row, start_col, new_color):
        """Fill region with new color starting from given position"""
        if (start_row < 0 or start_row >= self.rows or
            start_col < 0 or start_col >= self.cols):
            return

        old_color = self.image[start_row][start_col]
        if old_color == new_color:
            return

        self._flood_fill_recursive(start_row, start_col, old_color, new_color)

    def _flood_fill_recursive(self, row, col, old_color, new_color):
        # Base case: out of bounds or wrong color
        if (row < 0 or row >= self.rows or
            col < 0 or col >= self.cols or
            self.image[row][col] != old_color):
            return

        # Fill current cell
        self.image[row][col] = new_color

        # Recursively fill adjacent cells (4-directional)
        self._flood_fill_recursive(row + 1, col, old_color, new_color)  # Down
        self._flood_fill_recursive(row - 1, col, old_color, new_color)  # Up
        self._flood_fill_recursive(row, col + 1, old_color, new_color)  # Right
        self._flood_fill_recursive(row, col - 1, old_color, new_color)  # Left

def evaluate_expression(expression):
    """Recursive expression evaluator for simple arithmetic"""
    def parse_expression(expr):
        """Parse and evaluate expression"""
        expr = expr.replace(" ", "")  # Remove spaces

        # Find the operator with lowest precedence (+ or -)
        for i in range(len(expr) - 1, -1, -1):
            if expr[i] in "+-" and (i == 0 or expr[i-1] not in "*/"):
                left = parse_expression(expr[:i])
                right = parse_expression(expr[i+1:])
                return left + right if expr[i] == "+" else left - right

        # Find the operator with higher precedence (* or /)
        for i in range(len(expr) - 1, -1, -1):
            if expr[i] in "*/":
                left = parse_expression(expr[:i])
                right = parse_expression(expr[i+1:])
                return left * right if expr[i] == "*" else left / right

        # Base case: number
        return float(expr)

    return parse_expression(expression)

import os
def directory_traversal(path, depth=0):
    """Recursive directory traversal"""
    indent = "  " * depth

    try:
        items = os.listdir(path)
    except PermissionError:
        print(f"{indent}[Permission Denied] {os.path.basename(path)}")
        return

    for item in sorted(items):
        item_path = os.path.join(path, item)

        if os.path.isdir(item_path):
            print(f"{indent}[DIR] {item}")
            directory_traversal(item_path, depth + 1)
        else:
            size = os.path.getsize(item_path)
            print(f"{indent}[FILE] {item} ({size} bytes)")

# Test sorting algorithms
print("Sorting Algorithms Comparison:")
unsorted = [64, 34, 25, 12, 22, 11, 90, 5, 77, 30]

print(f"Original: {unsorted}")
merge_sorted = merge_sort(unsorted.copy())
quick_sorted = quick_sort(unsorted.copy())
print(f"Merge sort: {merge_sorted}")
print(f"Quick sort: {quick_sorted}")
print(f"Correctly sorted: {merge_sorted == sorted(unsorted)}")

# Tower of Hanoi
print("\nTower of Hanoi (3 disks):")
tower_of_hanoi(3, "A", "C", "B")

# Flood fill
print("\nFlood Fill:")
image = [
    [1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 1],
    [1, 0, 0, 1, 1]
]

print("Original image:")
for row in image:
    print(row)

flood_fill = FloodFill([row[:] for row in image])  # Copy
flood_fill.fill(0, 0, 2)  # Fill region starting at (0,0) with color 2

print("\nAfter flood fill:")
for row in flood_fill.image:
    print(row)

# Expression evaluation
print("\nExpression Evaluation:")
expressions = ["3+4*2", "(5+3)*2", "10-4/2", "2*3+4*5"]
for expr in expressions:
    try:
        result = evaluate_expression(expr)
        print(f"{expr} = {result}")
    except Exception as e:
        print(f"{expr} = Error: {e}")

# Directory traversal (simplified demo)
print("\nDirectory Traversal Simulation:")
print("(Simulating directory structure)")
mock_structure = {
    "root": {
        "folder1": {"file1.txt": 100, "file2.txt": 200},
        "folder2": {"file3.txt": 150},
        "file4.txt": 300
    }
}

def mock_directory_traversal(structure, path="", depth=0):
    indent = "  " * depth
    for name, content in structure.items():
        if isinstance(content, dict):
            print(f"{indent}[DIR] {name}")
            mock_directory_traversal(content, f"{path}/{name}", depth + 1)
        else:
            print(f"{indent}[FILE] {name} ({content} bytes)")

mock_directory_traversal(mock_structure["root"])

print("\nAdvanced Recursion Patterns:")
print("- Divide & Conquer: Break into subproblems (merge sort)")
print("- Decrease & Conquer: Reduce problem size (Tower of Hanoi)")
print("- Backtracking: Try possibilities, backtrack on failure")
print("- Tree Recursion: Multiple recursive calls (expression evaluation)")
print("- Mutual Recursion: Functions calling each other")

print("\nRecursion Optimization Techniques:")
print("- Tail Recursion: Last operation is recursive call")
print("- Memoization: Cache expensive function results")
print("- Iterative alternatives: Convert to loops when possible")
print("- Stack size limits: Be aware of recursion depth limits")`
    },
    {
      id: "ex5",
      question: "Implement recursive dynamic programming and optimization:\n1. Create recursive fibonacci with memoization\n2. Implement recursive knapsack problem solver\n3. Add recursive longest common subsequence finder\n4. Create recursive coin change problem solver\n5. Implement recursive edit distance calculator\n6. Demonstrate dynamic programming optimization patterns",
      solution: `# Recursive Dynamic Programming and Optimization

# Fibonacci with memoization
def fibonacci_memo(n, memo=None):
    """Fibonacci with memoization - O(n) time, O(n) space"""
    if memo is None:
        memo = {}

    if n in memo:
        return memo[n]

    if n <= 1:
        return n

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# 0/1 Knapsack Problem
def knapsack(weights, values, capacity, n):
    """Recursive 0/1 knapsack - exponential time without memoization"""
    # Base case
    if n == 0 or capacity == 0:
        return 0

    # If weight of nth item > capacity, skip it
    if weights[n-1] > capacity:
        return knapsack(weights, values, capacity, n-1)

    # Return max of:
    # 1. nth item included
    # 2. nth item not included
    else:
        include = values[n-1] + knapsack(weights, values, capacity - weights[n-1], n-1)
        exclude = knapsack(weights, values, capacity, n-1)
        return max(include, exclude)

# Memoized knapsack
def knapsack_memo(weights, values, capacity, n, memo=None):
    """Memoized knapsack - O(n*capacity) time and space"""
    if memo is None:
        memo = {}

    # Create unique key for memoization
    key = (n, capacity)
    if key in memo:
        return memo[key]

    # Base case
    if n == 0 or capacity == 0:
        return 0

    # If weight > capacity, skip item
    if weights[n-1] > capacity:
        result = knapsack_memo(weights, values, capacity, n-1, memo)
    else:
        # Choose max of include/exclude
        include = values[n-1] + knapsack_memo(weights, values, capacity - weights[n-1], n-1, memo)
        exclude = knapsack_memo(weights, values, capacity, n-1, memo)
        result = max(include, exclude)

    memo[key] = result
    return result

# Longest Common Subsequence
def lcs(X, Y, m, n, memo=None):
    """Longest Common Subsequence with memoization"""
    if memo is None:
        memo = {}

    key = (m, n)
    if key in memo:
        return memo[key]

    if m == 0 or n == 0:
        return 0

    if X[m-1] == Y[n-1]:
        result = 1 + lcs(X, Y, m-1, n-1, memo)
    else:
        result = max(lcs(X, Y, m-1, n, memo), lcs(X, Y, m, n-1, memo))

    memo[key] = result
    return result

# Coin Change Problem
def coin_change(coins, amount, memo=None):
    """Minimum coins needed for amount - with memoization"""
    if memo is None:
        memo = {}

    if amount in memo:
        return memo[amount]

    if amount == 0:
        return 0

    if amount < 0:
        return float('inf')

    min_coins = float('inf')

    for coin in coins:
        result = coin_change(coins, amount - coin, memo)
        if result != float('inf'):
            min_coins = min(min_coins, result + 1)

    memo[amount] = min_coins
    return min_coins

# Edit Distance (Levenshtein Distance)
def edit_distance(str1, str2, m, n, memo=None):
    """Minimum edit distance between two strings"""
    if memo is None:
        memo = {}

    key = (m, n)
    if key in memo:
        return memo[key]

    # Base cases
    if m == 0:
        return n  # Insert all characters of str2
    if n == 0:
        return m  # Delete all characters of str1

    # If last characters are same, no operation needed
    if str1[m-1] == str2[n-1]:
        return edit_distance(str1, str2, m-1, n-1, memo)

    # If last characters are different, consider all operations
    insert = edit_distance(str1, str2, m, n-1, memo)      # Insert
    delete = edit_distance(str1, str2, m-1, n, memo)      # Delete
    replace = edit_distance(str1, str2, m-1, n-1, memo)   # Replace

    result = 1 + min(insert, delete, replace)
    memo[key] = result
    return result

# Test all algorithms
print("Dynamic Programming with Recursion")
print("=" * 50)

# Fibonacci
print("1. Fibonacci with Memoization:")
n = 10
fib_result = fibonacci_memo(n)
print(f"Fibonacci({n}) = {fib_result}")

# Knapsack
print("\n2. 0/1 Knapsack Problem:")
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
n_items = len(weights)

basic_knapsack = knapsack(weights, values, capacity, n_items)
memo_knapsack = knapsack_memo(weights, values, capacity, n_items)

print(f"Weights: {weights}")
print(f"Values: {values}")
print(f"Capacity: {capacity}")
print(f"Max value (basic): {basic_knapsack}")
print(f"Max value (memoized): {memo_knapsack}")

# LCS
print("\n3. Longest Common Subsequence:")
X = "AGGTAB"
Y = "GXTXAYB"
lcs_length = lcs(X, Y, len(X), len(Y))
print(f"String 1: {X}")
print(f"String 2: {Y}")
print(f"LCS length: {lcs_length}")

# Coin Change
print("\n4. Coin Change Problem:")
coins = [1, 2, 5]
amount = 11
min_coins = coin_change(coins, amount)
print(f"Coins: {coins}")
print(f"Amount: {amount}")
print(f"Minimum coins needed: {min_coins}")

# Edit Distance
print("\n5. Edit Distance:")
str1 = "kitten"
str2 = "sitting"
distance = edit_distance(str1, str2, len(str1), len(str2))
print(f"String 1: {str1}")
print(f"String 2: {str2}")
print(f"Edit distance: {distance}")

print("\nDynamic Programming Optimization Patterns:")
print("- Memoization: Cache results of subproblems")
print("- Tabulation: Build solution bottom-up")
print("- Optimal Substructure: Optimal solution uses optimal subsolutions")
print("- Overlapping Subproblems: Same subproblems solved multiple times")

print("\nRecursion + Memoization Benefits:")
print("- Solves exponential time complexity")
print("- Natural recursive formulation")
print("- Easy to implement and understand")
print("- Automatic optimization for repeated subproblems")

print("\nWhen to Use Memoization:")
print("- Pure functions (same input → same output)")
print("- Overlapping subproblems")
print("- Optimal substructure")
print("- When recursion depth isn't too large")`
    }
  ]
};
