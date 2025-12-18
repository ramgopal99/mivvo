import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_2: SubLesson = {
  id: "14.2",
  title: 'Recursion vs Iteration',
  status: 'demo',
  content: `# ⚖️ Recursion vs Iteration

Two different approaches to solve the same problems - each with its own strengths and trade-offs!

---

## 🎯 Understanding Both Approaches

### **Recursion**
- Function calls itself
- Uses call stack implicitly
- Often more elegant and readable
- Can be less efficient

### **Iteration**
- Uses loops (for, while)
- Uses explicit variables for state
- Often more efficient
- Can be more complex to read

---

## 🔄 Converting Between Recursion and Iteration

### **Example: Factorial**

#### **Recursive Version**
\`\`\`python
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)
\`\`\`

#### **Iterative Version**
\`\`\`python
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Both return same results:
# factorial_recursive(5) = 120
# factorial_iterative(5) = 120
\`\`\`

### **Example: Sum of Array**

#### **Recursive Version**
\`\`\`python
def sum_recursive(arr, n):
    if n <= 0:
        return 0
    return arr[n-1] + sum_recursive(arr, n-1)
\`\`\`

#### **Iterative Version**
\`\`\`python
def sum_iterative(arr):
    total = 0
    for num in arr:
        total += num
    return total
\`\`\`

---

## 📊 Performance Comparison

### **Time Complexity**
- **Both approaches**: Usually same O(n) time
- **Recursion**: May have function call overhead
- **Iteration**: Usually slightly faster

### **Space Complexity**
- **Recursion**: O(n) stack space (worst case)
- **Iteration**: O(1) additional space (usually)

### **Call Stack Usage**
\`\`\`python
# Recursion: Each call adds to stack
def recursive_sum(n):
    if n == 0: return 0
    return n + recursive_sum(n-1)

# Stack for recursive_sum(3):
# recursive_sum(3)
# recursive_sum(2)
# recursive_sum(1)
# recursive_sum(0) ← deepest point

# Iteration: No extra stack usage
def iterative_sum(n):
    total = 0
    while n > 0:
        total += n
        n -= 1
    return total
\`\`\`

---

## 🎯 When to Choose Recursion

### **Recursion is Better When:**

#### **1. Natural Recursive Structure**
\`\`\`python
# Tree traversal - naturally recursive
def traverse_tree(node):
    if not node:
        return
    print(node.value)
    traverse_tree(node.left)
    traverse_tree(node.right)

# Directory traversal
def list_files(directory):
    for item in os.listdir(directory):
        path = os.path.join(directory, item)
        if os.path.isdir(path):
            list_files(path)  # Recursive call
        else:
            print(path)
\`\`\`

#### **2. Divide and Conquer Problems**
\`\`\`python
# Binary search - perfect for recursion
def binary_search(arr, target, left, right):
    if left > right:
        return -1

    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid-1)
    else:
        return binary_search(arr, target, mid+1, right)
\`\`\`

#### **3. Backtracking Problems**
\`\`\`python
# N-Queens, Sudoku, maze solving
def solve_maze(maze, x, y):
    if is_goal(x, y):
        return True

    for direction in [(0,1), (1,0), (0,-1), (-1,0)]:
        new_x, new_y = x + direction[0], y + direction[1]
        if is_valid(maze, new_x, new_y):
            if solve_maze(maze, new_x, new_y):
                return True
    return False
\`\`\`

#### **4. Mathematical Sequences**
\`\`\`python
# Fibonacci - naturally recursive
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

---

## 🔄 When to Choose Iteration

### **Iteration is Better When:**

#### **1. Performance is Critical**
\`\`\`python
# Iterative version is faster
def iterative_fibonacci(n):
    if n <= 1:
        return n

    a, b = 0, 1
    for _ in range(2, n+1):
        a, b = b, a + b
    return b
\`\`\`

#### **2. Deep Recursion Risk**
\`\`\`python
# Python recursion limit is ~1000
# This will cause RecursionError for large n
def recursive_countdown(n):
    if n == 0:
        return
    print(n)
    recursive_countdown(n-1)

# Safe iterative version
def iterative_countdown(n):
    while n > 0:
        print(n)
        n -= 1
\`\`\`

#### **3. Simple Accumulative Operations**
\`\`\`python
# Finding maximum - iterative is clearer
def find_max_iterative(arr):
    if not arr:
        return None

    maximum = arr[0]
    for num in arr[1:]:
        if num > maximum:
            maximum = num
    return maximum

# Recursive version is overkill
def find_max_recursive(arr, n):
    if n == 1:
        return arr[0]
    return max(arr[n-1], find_max_recursive(arr, n-1))
\`\`\`

---

## 🛠️ Converting Recursion to Iteration

### **Using a Stack (Manual Simulation)**
\`\`\`python
# Recursive factorial
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative using stack
def factorial_with_stack(n):
    stack = []
    result = 1

    # Push all numbers to stack
    while n > 1:
        stack.append(n)
        n -= 1

    # Pop and multiply
    while stack:
        result *= stack.pop()

    return result
\`\`\`

### **Tail Recursion Optimization**
Some languages optimize tail recursion to avoid stack overflow.

\`\`\`python
# Tail recursive (can be optimized)
def factorial_tail(n, accumulator=1):
    if n <= 1:
        return accumulator
    return factorial_tail(n - 1, n * accumulator)

# Python doesn't optimize tail recursion
# But it's a good pattern to recognize
\`\`\`

---

## 🎯 Key Decision Factors

| Factor | Choose Recursion | Choose Iteration |
|--------|------------------|------------------|
| **Readability** | Often cleaner | Sometimes verbose |
| **Performance** | Function call overhead | Usually faster |
| **Memory** | O(n) stack space | O(1) additional space |
| **Debugging** | Harder (deep stack) | Easier (single frame) |
| **Problem Type** | Trees, graphs, divide&conquer | Simple loops, performance-critical |
| **Language Support** | May have recursion limits | Always supported |

---

## 💡 Best Practices

### **1. Know Your Limits**
\`\`\`python
import sys
print(f"Recursion limit: {sys.getrecursionlimit()}")  # Usually 1000

# Can increase if needed
sys.setrecursionlimit(2000)
\`\`\`

### **2. Test Both Approaches**
- Start with recursion for clarity
- Switch to iteration if performance issues arise
- Profile both versions for large inputs

### **3. Use Appropriate Tool**
- **Recursion**: When problem structure matches
- **Iteration**: When performance matters
- **Hybrid**: Sometimes combine both approaches

---

## 🎯 Key Takeaways

1. **Recursion**: Elegant but uses stack space
2. **Iteration**: Efficient but sometimes complex
3. **Choose based on problem**: Natural fit vs performance needs
4. **Know limits**: Recursion depth constraints
5. **Can convert**: Between recursion and iteration
6. **Profile performance**: Test both for critical code

Master both techniques - they'll serve you well in different scenarios! 🚀`,
};

