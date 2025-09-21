import { SubLesson } from '../../../data/lessonsData';

export const topic_14_3: SubLesson = {
  id: 14.3,
  title: 'Recursive Problem Solving',
  status: 'demo',
  content: `# 🧩 Recursive Problem Solving

Learn systematic approaches to solve problems using recursion effectively!

---

## 🎯 Problem Solving Framework

### **1. Identify the Recursive Structure**
Look for problems that can be broken down into smaller, similar subproblems.

### **2. Define the Base Case**
Find the simplest case that can be solved directly.

### **3. Define the Recursive Case**
Express the solution in terms of smaller subproblems.

### **4. Ensure Progress**
Make sure each recursive call gets closer to the base case.

---

## 📝 Classic Recursive Problems

### **1. Fibonacci Sequence**

#### **Problem**: Find the nth Fibonacci number
**F(n) = F(n-1) + F(n-2), where F(0) = 0, F(1) = 1**

\`\`\`python
def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Recursive case
    return fibonacci(n-1) + fibonacci(n-2)

# Usage
print(fibonacci(6))  # 8 (0,1,1,2,3,5,8)
\`\`\`

#### **Optimization with Memoization**
\`\`\`python
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n

    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]
\`\`\`

### **2. Tower of Hanoi**

#### **Problem**: Move n disks from source to destination using auxiliary peg
\`\`\`python
def tower_of_hanoi(n, source, auxiliary, destination):
    if n == 1:
        print(f"Move disk 1 from {source} to {destination}")
        return

    # Move n-1 disks from source to auxiliary
    tower_of_hanoi(n-1, source, destination, auxiliary)

    # Move nth disk from source to destination
    print(f"Move disk {n} from {source} to {destination}")

    # Move n-1 disks from auxiliary to destination
    tower_of_hanoi(n-1, auxiliary, source, destination)

# Usage
tower_of_hanoi(3, 'A', 'B', 'C')
\`\`\`

### **3. Binary Search**

#### **Problem**: Find target in sorted array
\`\`\`python
def binary_search(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1

    # Base case: not found
    if left > right:
        return -1

    mid = (left + right) // 2

    # Base case: found
    if arr[mid] == target:
        return mid

    # Recursive cases
    if arr[mid] > target:
        return binary_search(arr, target, left, mid-1)
    else:
        return binary_search(arr, target, mid+1, right)

# Usage
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 4))   # -1
\`\`\`

---

## 🧩 Advanced Recursive Patterns

### **1. Divide and Conquer**

#### **Merge Sort**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

### **2. Backtracking**

#### **N-Queens Problem**
\`\`\`python
def solve_n_queens(n):
    def is_safe(board, row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False

        # Check diagonal
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == 'Q':
                return False

        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == 'Q':
                return False

        return True

    def backtrack(board, row):
        if row == n:
            solutions.append([''.join(row) for row in board])
            return

        for col in range(n):
            if is_safe(board, row, col):
                board[row][col] = 'Q'
                backtrack(board, row + 1)
                board[row][col] = '.'  # Backtrack

    solutions = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    backtrack(board, 0)
    return solutions

# Usage
solutions = solve_n_queens(4)
print(f"Found {len(solutions)} solutions for 4-queens")
\`\`\`

### **3. Tree Recursion**

#### **All Possible Paths**
\`\`\`python
def all_paths(graph, start, end, path=[]):
    path = path + [start]

    if start == end:
        return [path]

    if start not in graph:
        return []

    paths = []
    for node in graph[start]:
        if node not in path:  # Avoid cycles
            new_paths = all_paths(graph, node, end, path)
            paths.extend(new_paths)

    return paths

# Usage
graph = {
    'A': ['B', 'C'],
    'B': ['C', 'D'],
    'C': ['D'],
    'D': ['C']
}
print(all_paths(graph, 'A', 'D'))
# [['A', 'B', 'C', 'D'], ['A', 'B', 'D'], ['A', 'C', 'D']]
\`\`\`

---

## 🛠️ Problem Solving Steps

### **Step 1: Understand the Problem**
- What is the input?
- What is the expected output?
- Any constraints or edge cases?

### **Step 2: Find Recursive Structure**
- Can the problem be broken into smaller subproblems?
- Are subproblems of the same type?

### **Step 3: Identify Base Cases**
- What are the simplest cases?
- What should they return?

### **Step 4: Define Recursive Cases**
- How to combine results from subproblems?
- What changes with each recursive call?

### **Step 5: Handle Edge Cases**
- Empty inputs, null values, boundaries

### **Step 6: Optimize if Needed**
- Memoization for repeated subproblems
- Iterative solution for performance

---

## 🎯 Common Recursive Patterns

### **1. Linear Recursion**
- Single recursive call
- Examples: factorial, sum, length

### **2. Tree Recursion**
- Multiple recursive calls
- Examples: Fibonacci, Tower of Hanoi

### **3. Mutual Recursion**
- Functions calling each other
- Examples: even/odd functions

### **4. Nested Recursion**
- Recursive call as parameter
- Examples: Ackermann function

### **5. Tail Recursion**
- Recursive call is the last operation
- Can be optimized to iteration

---

## ⚠️ Common Mistakes to Avoid

### **1. Missing Base Case**
\`\`\`python
def bad_sum(n):
    return n + bad_sum(n-1)  # Infinite recursion!
\`\`\`

### **2. Wrong Base Case**
\`\`\`python
def wrong_factorial(n):
    if n == 2:  # Should be 0 or 1
        return 2
    return n * wrong_factorial(n-1)
\`\`\`

### **3. Not Making Progress**
\`\`\`python
def stuck_function(n):
    if n == 0:
        return 0
    return n + stuck_function(n)  # Never decreases n!
\`\`\`

### **4. Ignoring Return Values**
\`\`\`python
def missing_return(n):
    if n == 0:
        return 0
    missing_return(n-1)  # Forgot to return!
\`\`\`

---

## 🎯 Key Takeaways

1. **Framework**: Base case + recursive case + progress
2. **Patterns**: Linear, tree, tail, mutual recursion
3. **Optimization**: Memoization, iteration when needed
4. **Debugging**: Trace call stack, check base cases
5. **Practice**: Start simple, build to complex problems
6. **Performance**: Consider when recursion vs iteration matters

Recursion is a powerful tool - practice these patterns to master recursive problem solving! 🧠`,
};
