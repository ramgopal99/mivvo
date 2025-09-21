import { SubLesson } from '../../../data/lessonsData';

export const topic_10_2: SubLesson = {
  id: 10.2,
  title: 'Array Operations',
  status: 'demo',
  content: `# ⚙️ Array Operations

Arrays support various operations for searching, sorting, and manipulation. Let's explore the most common array algorithms and operations!

---

## 🔍 Searching Operations

### **Linear Search - O(n)**
\`\`\`python
def linear_search(arr, target):
    """Find target in array using linear search."""
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index
    return -1  # Not found

numbers = [10, 20, 30, 40, 50]
print(f"Index of 30: {linear_search(numbers, 30)}")    # 2
print(f"Index of 99: {linear_search(numbers, 99)}")    # -1
\`\`\`

### **Binary Search - O(log n)**
\`\`\`python
def binary_search(arr, target):
    """Find target in sorted array using binary search."""
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

sorted_numbers = [10, 20, 30, 40, 50, 60, 70]
print(f"Index of 40: {binary_search(sorted_numbers, 40)}")  # 3
print(f"Index of 25: {binary_search(sorted_numbers, 25)}")  # -1
\`\`\`

---

## 📊 Sorting Operations

### **Bubble Sort - O(n²)**
\`\`\`python
def bubble_sort(arr):
    """Sort array using bubble sort."""
    n = len(arr)
    for i in range(n):
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Before: {numbers}")
bubble_sort(numbers)
print(f"After: {numbers}")
\`\`\`

### **Quick Sort - O(n log n)**
\`\`\`python
def quick_sort(arr):
    """Sort array using quick sort."""
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(f"Before: {numbers}")
sorted_numbers = quick_sort(numbers)
print(f"After: {sorted_numbers}")
\`\`\`

---

## 🔄 Array Manipulation

### **Reverse Array**
\`\`\`python
def reverse_array(arr):
    """Reverse array in place."""
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

numbers = [1, 2, 3, 4, 5]
print(f"Before: {numbers}")
reverse_array(numbers)
print(f"After: {numbers}")
\`\`\`

### **Rotate Array**
\`\`\`python
def rotate_left(arr, k):
    """Rotate array left by k positions."""
    n = len(arr)
    k = k % n  # Handle k > n
    return arr[k:] + arr[:k]

numbers = [1, 2, 3, 4, 5, 6]
print(f"Original: {numbers}")
print(f"Rotate left by 2: {rotate_left(numbers, 2)}")
print(f"Rotate left by 4: {rotate_left(numbers, 4)}")
\`\`\`

---

## 📈 Array Statistics

### **Common Statistical Operations**
\`\`\`python
def array_stats(arr):
    """Calculate basic statistics for array."""
    if not arr:
        return None

    sorted_arr = sorted(arr)
    n = len(arr)

    return {
        "count": n,
        "sum": sum(arr),
        "mean": sum(arr) / n,
        "median": sorted_arr[n // 2] if n % 2 else (sorted_arr[n//2-1] + sorted_arr[n//2]) / 2,
        "min": min(arr),
        "max": max(arr),
        "range": max(arr) - min(arr)
    }

scores = [85, 92, 78, 96, 88, 91, 83, 87]
stats = array_stats(scores)

print("Array Statistics:")
for key, value in stats.items():
    if isinstance(value, float):
        print(f"  {key}: {value:.2f}")
    else:
        print(f"  {key}: {value}")
\`\`\`

---

## 🎯 Array Algorithms

### **Find Duplicates**
\`\`\`python
def find_duplicates(arr):
    """Find all duplicate elements in array."""
    seen = set()
    duplicates = set()

    for num in arr:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)

    return list(duplicates)

numbers = [1, 2, 3, 2, 4, 5, 3, 6]
print(f"Duplicates in {numbers}: {find_duplicates(numbers)}")
\`\`\`

### **Remove Duplicates**
\`\`\`python
def remove_duplicates(arr):
    """Remove duplicates while preserving order."""
    seen = set()
    result = []

    for num in arr:
        if num not in seen:
            seen.add(num)
            result.append(num)

    return result

numbers = [1, 2, 3, 2, 4, 5, 3, 6, 1]
print(f"Original: {numbers}")
print(f"Without duplicates: {remove_duplicates(numbers)}")
\`\`\`

### **Find Missing Number**
\`\`\`python
def find_missing_number(arr, n):
    """Find missing number in array of 1 to n."""
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    return expected_sum - actual_sum

# Array should contain 1 to 10, missing 7
numbers = [1, 2, 3, 4, 5, 6, 8, 9, 10]
print(f"Missing number: {find_missing_number(numbers, 10)}")
\`\`\`

---

## ⚡ Performance Comparison

### **Algorithm Complexity**
| Operation | Time Complexity | Use Case |
|-----------|----------------|----------|
| Access by index | O(1) | Random access |
| Linear search | O(n) | Unsorted data |
| Binary search | O(log n) | Sorted data |
| Bubble sort | O(n²) | Small arrays |
| Quick sort | O(n log n) | General sorting |
| Reverse | O(n) | In-place operations |

Array operations are fundamental to computer science and form the basis of many algorithms! 🔬`
};
