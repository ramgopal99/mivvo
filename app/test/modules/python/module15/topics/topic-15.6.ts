import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_6: SubLesson = {
  id: 15.6,
  title: 'Quick Sort Algorithm',
  status: 'demo',
  content: `# ⚡ Quick Sort Algorithm

Quick Sort is one of the most widely used sorting algorithms due to its excellent average-case performance and efficient use of memory. It's a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it. Let's explore this fast and practical algorithm!

---

## 🎯 How Quick Sort Works

**Quick Sort** follows the divide-and-conquer approach:
1. **Choose a pivot** element from the array
2. **Partition** the array so that elements smaller than pivot go left, larger go right
3. **Recursively sort** the left and right subarrays

The key insight is that once the pivot is in its correct position, you just need to sort the elements on either side.

---

## 📝 Step-by-Step Example

**Input Array**: [10, 80, 30, 90, 40, 50, 70]

Let's use **50** as the pivot (last element).

### **Partitioning Process:**
\`\`\`text
Initial: [10, 80, 30, 90, 40, 50, 70]  ← pivot = 50
         ↑                       ↑
       start                    end

Step 1: Compare 10 < 50 → No swap, move start → [10, 80, 30, 90, 40, 50, 70]
         ↑↑                      ↑
       start                    end

Step 2: Compare 80 > 50 → Swap with end-1 → [10, 40, 30, 90, 80, 50, 70]
            ↑↑                   ↑
          start                 end

Step 3: Compare 30 < 50 → No swap, move start → [10, 40, 30, 90, 80, 50, 70]
               ↑↑                ↑
             start              end

Step 4: Compare 90 > 50 → Swap with end-1 → [10, 40, 30, 70, 80, 50, 90]
                  ↑↑             ↑
                start           end

Step 5: All elements processed. Swap pivot:
        [10, 40, 30, 70, 80, 50, 90] → [10, 40, 30, 50, 80, 70, 90]
\`\`\`

**Result after partitioning:**
- Left: [10, 40, 30] (elements ≤ 50)
- Pivot: 50 (in correct position)
- Right: [80, 70, 90] (elements > 50)

**Now recursively sort left and right subarrays!**

---

## 💻 Implementation

### **Basic Quick Sort (Recursive)**
\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Choose pivot (using last element)
    pivot = arr[-1]
    
    # Partition the array
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    
    # Recursively sort and combine
    return quick_sort(left) + [pivot] + quick_sort(right)

# Example usage
arr = [10, 80, 30, 90, 40, 50, 70]
sorted_arr = quick_sort(arr)
print(sorted_arr)  # [10, 30, 40, 50, 70, 80, 90]
\`\`\`

### **In-Place Quick Sort (Lomuto Partition)**
\`\`\`python
def quick_sort_inplace(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_idx = partition(arr, low, high)
        
        # Recursively sort left and right subarrays
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    # Choose pivot (last element)
    pivot = arr[high]
    i = low - 1  # Index of smaller element
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Swap pivot to correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example
arr = [10, 80, 30, 90, 40, 50, 70]
quick_sort_inplace(arr)
print(arr)  # [10, 30, 40, 50, 70, 80, 90]
\`\`\`

### **Hoare Partition Scheme (More Efficient)**
\`\`\`python
def quick_sort_hoare(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition and get pivot index
        pivot_idx = hoare_partition(arr, low, high)
        
        # Recursively sort (note: pivot is already in correct position)
        quick_sort_hoare(arr, low, pivot_idx)
        quick_sort_hoare(arr, pivot_idx + 1, high)

def hoare_partition(arr, low, high):
    pivot = arr[low]  # Choose first element as pivot
    i = low - 1
    j = high + 1
    
    while True:
        # Find element larger than pivot
        i += 1
        while arr[i] < pivot:
            i += 1
        
        # Find element smaller than pivot
        j -= 1
        while arr[j] > pivot:
            j -= 1
        
        if i >= j:
            return j
        
        # Swap elements
        arr[i], arr[j] = arr[j], arr[i]

# Example
arr = [10, 80, 30, 90, 40, 50, 70]
quick_sort_hoare(arr)
print(arr)  # [10, 30, 40, 50, 70, 80, 90]
\`\`\`

---

## 🎯 Pivot Selection Strategies

### **1. First Element**
\`\`\`python
pivot = arr[low]  # Simple but can be bad for sorted arrays
\`\`\`

### **2. Last Element**
\`\`\`python
pivot = arr[high]  # Common choice, works well in practice
\`\`\`

### **3. Middle Element**
\`\`\`python
pivot = arr[(low + high) // 2]  # Good for many cases
\`\`\`

### **4. Random Element**
\`\`\`python
import random
pivot_idx = random.randint(low, high)
arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
pivot = arr[high]  # Reduces chance of worst case
\`\`\`

### **5. Median of Three**
\`\`\`python
def median_of_three(arr, low, high):
    mid = (low + high) // 2
    candidates = [(arr[low], low), (arr[mid], mid), (arr[high], high)]
    candidates.sort()
    median_idx = candidates[1][1]  # Middle value
    arr[median_idx], arr[high] = arr[high], arr[median_idx]
    return arr[high]
\`\`\`

---

## 📊 Algorithm Analysis

### **Time Complexity**
- **Best Case**: O(n log n) - when pivot splits array evenly
- **Worst Case**: O(n²) - when pivot is always smallest/largest element
- **Average Case**: O(n log n)

### **Space Complexity**
- **O(log n)** - Recursion stack space
- **O(n)** worst case for skewed recursion tree

### **Stability**
- **Unstable** - Equal elements may change relative order

### **In-place**
- **Yes** - Can be implemented in-place

---

## 🎯 Quick Sort Properties

### **Advantages**
- ✅ **Fast in practice** - often the fastest sorting algorithm
- ✅ **In-place sorting** - uses O(log n) extra space
- ✅ **Cache-friendly** - good locality of reference
- ✅ **Highly optimized** in standard libraries

### **Disadvantages**
- ❌ **O(n²) worst case** - can be slow on already sorted data
- ❌ **Unstable** - may change relative order of equal elements
- ❌ **Not suitable for external sorting**

---

## 🔧 Optimizations and Improvements

### **1. Hybrid Quick Sort (Intro Sort)**
Combines Quick Sort with Heap Sort to avoid worst-case performance:
\`\`\`python
def intro_sort(arr, max_depth=None):
    if max_depth is None:
        max_depth = 2 * math.log2(len(arr))
    
    if len(arr) <= 16:  # Use insertion sort for small arrays
        insertion_sort(arr)
    elif max_depth == 0:  # Use heap sort if recursion too deep
        heap_sort(arr)
    else:
        # Normal quick sort
        pivot_idx = partition(arr, 0, len(arr) - 1)
        intro_sort(arr[:pivot_idx], max_depth - 1)
        intro_sort(arr[pivot_idx + 1:], max_depth - 1)
\`\`\`

### **2. Three-Way Quick Sort (Dutch National Flag)**
Handles duplicates efficiently:
\`\`\`python
def three_way_partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    j = low
    k = high
    
    while j < k:
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
            j += 1
        elif arr[j] == pivot:
            j += 1
        else:  # arr[j] > pivot
            k -= 1
            arr[j], arr[k] = arr[k], arr[j]
    
    # Move pivot to correct position
    arr[k], arr[high] = arr[high], arr[k]
    return i + 1, k - 1  # Return range of equal elements
\`\`\`

---

## 🧪 Testing and Examples

### **Test Case 1: Normal Array**
\`\`\`python
arr = [10, 80, 30, 90, 40, 50, 70]
print("Original:", arr)
quick_sort_inplace(arr)
print("Sorted:  ", arr)
# Output: [10, 30, 40, 50, 70, 80, 90]
\`\`\`

### **Test Case 2: Already Sorted (Worst Case)**
\`\`\`python
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print("Original:", arr)
quick_sort_inplace(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# O(n²) performance - very slow!
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
print("Original:", arr)
quick_sort_inplace(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# O(n²) performance
\`\`\`

### **Test Case 4: Many Duplicates**
\`\`\`python
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original:", arr)
quick_sort_inplace(arr)
print("Sorted:  ", arr)
# Output: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
# Relative order may change
\`\`\`

---

## 🎯 When to Use Quick Sort

### **Good Use Cases:**
- **General-purpose sorting** in standard libraries
- **Large random datasets**
- **Memory-constrained environments** (in-place)
- **Cache performance matters**
- **Average case performance is important**

### **Avoid When:**
- Stability is required
- Nearly sorted data (use Insertion Sort)
- Worst-case performance guarantees needed (use Merge Sort)
- Small datasets (use Insertion Sort)

---

## 🔍 Quick Sort vs Other Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | In-place |
|-----------|------|---------|-------|-------|--------|----------|
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |

**Quick Sort is usually the fastest in practice for random data!**

---

## 🚀 Real-World Usage

### **Standard Library Implementations**
- **C++**: \`std::sort()\` uses introsort (Quick Sort + Heap Sort)
- **Java**: \`Arrays.sort()\` uses dual-pivot Quick Sort
- **Python**: \`sorted()\` uses Timsort (Merge Sort + Insertion Sort)
- **JavaScript**: V8 engine uses Quick Sort variations

### **Why Quick Sort is Popular**
1. **Fast average performance**
2. **Low memory overhead**
3. **Cache-friendly access patterns**
4. **Easy to implement and optimize**

### **Worst Case Prevention**
Modern implementations use:
- **Random pivot selection**
- **Median-of-three pivot**
- **Introsort** (switch to Heap Sort if recursion too deep)
- **Small array optimizations**

---

## 🏆 Key Takeaways

1. **Quick Sort** uses divide-and-conquer with a pivot element
2. **Time complexity** is O(n log n) average, O(n²) worst case
3. **Space complexity** is O(log n) - very memory efficient
4. **It's unstable** - doesn't preserve relative order of equal elements
5. **In-place sorting** - modifies the original array
6. **Fastest in practice** for most real-world scenarios

**Quick Sort is the go-to algorithm for general-purpose sorting, but watch out for its worst-case behavior! Next, let's explore Heap Sort for guaranteed performance! 🚀**`
};
