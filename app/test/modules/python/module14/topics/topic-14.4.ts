import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_4: SubLesson = {
  id: 14.4,
  title: 'Advanced Recursion Concepts',
  status: 'demo',
  content: `# 🚀 Advanced Recursion Concepts

Explore sophisticated recursive techniques and optimization strategies!

---

## 🎯 Advanced Recursive Patterns

### **1. Tail Recursion**

#### **Definition**
A recursive function is **tail recursive** when the recursive call is the last operation in the function.

#### **Example: Tail Recursive Factorial**
\`\`\`python
# NOT tail recursive
def factorial_regular(n):
    if n <= 1:
        return 1
    return n * factorial_regular(n - 1)  # Multiplication AFTER recursion

# Tail recursive version
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)  # Recursion is LAST operation

print(factorial_tail(5))  # 120
\`\`\`

#### **Why Tail Recursion Matters**
- Can be optimized by compiler to iteration
- No stack overflow risk for deep recursion
- Languages like Scheme, Scala optimize tail recursion

---

### **2. Mutual Recursion**

#### **Definition**
Functions that call each other recursively.

#### **Example: Even/Odd Checker**
\`\`\`python
def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)

print(is_even(4))  # True
print(is_odd(4))   # False
\`\`\`

#### **Another Example: Tree Validation**
\`\`\`python
def is_valid_tree(node, min_val=float('-inf'), max_val=float('inf')):
    if not node:
        return True

    if not (min_val < node.value < max_val):
        return False

    return (is_valid_tree(node.left, min_val, node.value) and
            is_valid_tree(node.right, node.value, max_val))
\`\`\`

---

### **3. Nested Recursion**

#### **Definition**
When a recursive call is passed as a parameter to another recursive call.

#### **Example: Ackermann Function**
\`\`\`python
def ackermann(m, n):
    if m == 0:
        return n + 1
    if n == 0:
        return ackermann(m - 1, 1)
    return ackermann(m - 1, ackermann(m, n - 1))

# Grows extremely fast!
print(ackermann(2, 1))  # 5
print(ackermann(3, 2))  # 29
\`\`\`

---

## 🧠 Memoization and Dynamic Programming

### **Memoization Basics**
Store results of expensive function calls to avoid recomputation.

#### **Fibonacci with Memoization**
\`\`\`python
# Without memoization: O(2^n)
def fibonacci_slow(n):
    if n <= 1:
        return n
    return fibonacci_slow(n-1) + fibonacci_slow(n-2)

# With memoization: O(n)
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

# Comparison
import time
start = time.time()
fibonacci_slow(35)  # Takes a while
print(f"Slow: {time.time() - start:.2f}s")

start = time.time()
fibonacci_memo(35)  # Instant
print(f"Memoized: {time.time() - start:.2f}s")
\`\`\`

#### **Decorator Approach**
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_cached(n):
    if n <= 1:
        return n
    return fibonacci_cached(n-1) + fibonacci_cached(n-2)
\`\`\`

---

## 🔄 Backtracking Algorithms

### **Backtracking Template**
\`\`\`python
def backtrack(candidate, remaining_choices):
    if is_solution(candidate):
        process_solution(candidate)
        return

    for choice in get_choices(candidate, remaining_choices):
        if is_valid(choice, candidate):
            make_move(candidate, choice)
            backtrack(candidate, remaining_choices)
            undo_move(candidate, choice)
\`\`\`

### **Sudoku Solver**
\`\`\`python
def solve_sudoku(board):
    def find_empty():
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    return i, j
        return None

    def is_valid(num, pos):
        # Check row
        for j in range(9):
            if board[pos[0]][j] == num:
                return False

        # Check column
        for i in range(9):
            if board[i][pos[1]] == num:
                return False

        # Check 3x3 box
        box_x, box_y = pos[0] // 3, pos[1] // 3
        for i in range(3):
            for j in range(3):
                if board[box_x*3 + i][box_y*3 + j] == num:
                    return False
        return True

    def solve():
        empty = find_empty()
        if not empty:
            return True

        row, col = empty
        for num in range(1, 10):
            if is_valid(num, (row, col)):
                board[row][col] = num
                if solve():
                    return True
                board[row][col] = 0  # Backtrack
        return False

    solve()
    return board
\`\`\`

---

## 🌳 Tree and Graph Recursion

### **Binary Tree Operations**
\`\`\`python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def tree_height(node):
    if not node:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))

def tree_size(node):
    if not node:
        return 0
    return 1 + tree_size(node.left) + tree_size(node.right)

def tree_sum(node):
    if not node:
        return 0
    return node.value + tree_sum(node.left) + tree_sum(node.right)

def mirror_tree(node):
    if not node:
        return None

    # Swap left and right
    node.left, node.right = node.right, node.left

    # Recurse on both subtrees
    mirror_tree(node.left)
    mirror_tree(node.right)

    return node
\`\`\`

### **Graph Traversal (DFS)**
\`\`\`python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    print(start, end=' ')

    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Usage
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

dfs(graph, 'A')  # A B D E F C
\`\`\`

---

## ⚡ Recursion Optimization Techniques

### **1. Memoization Table**
\`\`\`python
# Top-down memoization
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
\`\`\`

### **2. Bottom-up Dynamic Programming**
\`\`\`python
# Bottom-up iterative
def fib_dp(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]
\`\`\`

### **3. Space Optimization**
\`\`\`python
# Only keep last two values
def fib_optimized(n):
    if n <= 1:
        return n

    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
\`\`\`

---

## 🎯 Advanced Problem Patterns

### **1. Generating Permutations**
\`\`\`python
def generate_permutations(nums):
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return

        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]  # Backtrack

    result = []
    backtrack(0)
    return result

print(generate_permutations([1, 2, 3]))
# [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
\`\`\`

### **2. Generating Subsets**
\`\`\`python
def generate_subsets(nums):
    def backtrack(start, current):
        result.append(current[:])

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()  # Backtrack

    result = []
    backtrack(0, [])
    return result

print(generate_subsets([1, 2, 3]))
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

### **3. Expression Evaluation**
\`\`\`python
def evaluate_expression(nums, operators, target):
    def backtrack(index, current_value, expression):
        if index == len(nums):
            if current_value == target:
                result.append(expression)
            return

        for op in operators:
            if op == '+':
                new_value = current_value + nums[index]
                backtrack(index + 1, new_value, expression + '+' + str(nums[index]))
            elif op == '-':
                new_value = current_value - nums[index]
                backtrack(index + 1, new_value, expression + '-' + str(nums[index]))
            elif op == '*':
                new_value = current_value * nums[index]
                backtrack(index + 1, new_value, expression + '*' + str(nums[index]))

    result = []
    backtrack(1, nums[0], str(nums[0]))
    return result
\`\`\`

---

## 🎯 Key Takeaways

1. **Tail Recursion**: Can be optimized, prevents stack overflow
2. **Memoization**: Cache results to avoid recomputation
3. **Backtracking**: Systematic exploration with undo operations
4. **Tree Recursion**: Powerful for hierarchical structures
5. **Optimization**: Convert to DP when possible for better performance
6. **Patterns**: Master common recursive patterns for problem solving

Advanced recursion requires understanding both the elegance and the performance implications! 🧠`,
};
