import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_1: SubLesson = {
  id: "14.1",
  title: 'Introduction to Recursion',
  status: 'demo',
  content: `# 🔄 Introduction to Recursion

Recursion is a powerful programming technique where a function calls itself to solve problems!

---

## 🎯 What is Recursion?

**Recursion** is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller, similar subproblems.

### **Key Components of Recursion**

#### **1. Base Case**
The condition that stops the recursion - prevents infinite loops!

#### **2. Recursive Case**
The part where the function calls itself with a smaller problem

#### **3. Progress Toward Base Case**
Each recursive call must get closer to the base case

---

## 📝 Simple Recursive Function

### **Factorial Example**
\`\`\`python
def factorial(n):
    # Base case: factorial of 0 or 1 is 1
    if n <= 1:
        return 1

    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

# Usage
print(factorial(5))  # 120
print(factorial(3))  # 6
\`\`\`

### **How it works:**
\`\`\`
factorial(5) = 5 * factorial(4)
factorial(4) = 4 * factorial(3)
factorial(3) = 3 * factorial(2)
factorial(2) = 2 * factorial(1)
factorial(1) = 1
factorial(2) = 2 * 1 = 2
factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
factorial(5) = 5 * 24 = 120
\`\`\`

---

## 🔍 Anatomy of Recursive Function

### **Template Structure**
\`\`\`python
def recursive_function(parameter):
    # Base case(s) - stopping condition
    if base_condition:
        return base_value

    # Recursive case - work toward base case
    # Modify parameter to get closer to base case
    modified_parameter = modify(parameter)

    # Recursive call
    result = recursive_function(modified_parameter)

    # Combine result with current work
    return combine(current_work, result)
\`\`\`

---

## 🎯 Classic Recursive Examples

### **1. Sum of First N Numbers**
\`\`\`python
def sum_n(n):
    if n == 0:
        return 0
    return n + sum_n(n - 1)

print(sum_n(5))  # 15 (5+4+3+2+1)
\`\`\`

### **2. Power Function**
\`\`\`python
def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)

print(power(2, 3))  # 8 (2*2*2)
\`\`\`

### **3. String Reversal**
\`\`\`python
def reverse_string(s):
    if len(s) <= 1:
        return s
    return reverse_string(s[1:]) + s[0]

print(reverse_string("hello"))  # "olleh"
\`\`\`

---

## 🧠 Why Recursion Works

### **Call Stack Visualization**
\`\`\`
sum_n(5)
├── sum_n(4)
│   ├── sum_n(3)
│   │   ├── sum_n(2)
│   │   │   ├── sum_n(1)
│   │   │   │   └── sum_n(0) → 0
│   │   │   └── 1 + 0 = 1
│   │   └── 2 + 1 = 3
│   └── 3 + 3 = 6
└── 5 + 6 = 15
\`\`\`

### **Key Insight**
Each function call waits for its recursive call to complete before finishing its own computation.

---

## ⚠️ Common Pitfalls

### **1. Missing Base Case**
\`\`\`python
def bad_factorial(n):
    return n * bad_factorial(n - 1)  # Infinite recursion!
\`\`\`

### **2. Wrong Base Case**
\`\`\`python
def wrong_factorial(n):
    if n == 2:  # Wrong! Should be 0 or 1
        return 2
    return n * wrong_factorial(n - 1)
\`\`\`

### **3. Not Progressing to Base Case**
\`\`\`python
def infinite_loop(n):
    if n == 0:
        return 0
    return n + infinite_loop(n)  # Never reaches base case!
\`\`\`

---

## 💡 When to Use Recursion

### **Good for Recursion:**
- ✅ Tree/Graph traversal
- ✅ Divide and conquer algorithms
- ✅ Problems with recursive structure
- ✅ Mathematical sequences (Fibonacci, factorial)
- ✅ Backtracking problems

### **Better with Iteration:**
- ❌ Simple loops
- ❌ Performance-critical code
- ❌ Deep recursion (stack overflow risk)
- ❌ Tail recursion not optimized

---

## 🎯 Key Takeaways

1. **Base case** stops recursion and prevents infinite loops
2. **Recursive case** calls the function with a smaller problem
3. **Each call** must progress toward the base case
4. **Recursion uses stack** - each call waits for subcalls
5. **Choose recursion** when problem has natural recursive structure
6. **Consider stack limits** for deep recursion

Recursion is a mind-bending but powerful technique - practice these basics before moving to advanced patterns! 🧠`,
};

