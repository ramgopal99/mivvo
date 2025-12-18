import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_5: SubLesson = {
  id: 15.5,
  title: 'Merge Sort Algorithm',
  status: 'demo',
  content: `# 🔀 Merge Sort Algorithm

Merge Sort is a powerful divide-and-conquer algorithm that provides guaranteed O(n log n) performance. It's stable, predictable, and forms the basis for many advanced sorting techniques. Let's explore this elegant algorithm!

---

## 🎯 How Merge Sort Works

**Merge Sort** follows the divide-and-conquer paradigm:
1. **Divide**: Split the array into two halves
2. **Conquer**: Recursively sort each half
3. **Combine**: Merge the sorted halves back together

The key insight is that merging two sorted arrays is efficient and straightforward.

---

## 📝 Step-by-Step Example

**Input Array**: [38, 27, 43, 3, 9, 82, 10]

### **Division Phase:**
\`\`\`text
Level 1: [38, 27, 43, 3, 9, 82, 10]
         ↙                    ↘
Level 2: [38, 27, 43]     [3, 9, 82, 10]
         ↙     ↘          ↙     ↘
Level 3: [38] [27, 43]   [3, 9] [82, 10]
         ↓     ↙   ↘     ↙   ↘   ↓   ↓
Level 4: [38] [27] [43]  [3] [9] [82] [10]
\`\`\`

### **Merging Phase:**
\`\`\`text
Level 4: [38] [27] [43]  [3] [9] [82] [10]

Level 3: merge([38], [27]) → [27, 38]
         merge([43], []) → [43]
         merge([3], [9]) → [3, 9]
         merge([82], [10]) → [10, 82]

Level 2: merge([27, 38], [43]) → [27, 38, 43]
         merge([3, 9], [10, 82]) → [3, 9, 10, 82]

Level 1: merge([27, 38, 43], [3, 9, 10, 82]) → [3, 9, 10, 27, 38, 43, 82]
\`\`\`

**Final Result**: [3, 9, 10, 27, 38, 43, 82]

---

## 💻 Implementation

### **Basic Merge Sort (Recursive)**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide the array into two halves
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # Recursively sort each half
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # Merge the sorted halves
    return merge(left_sorted, right_sorted)

def merge(left, right):
    result = []
    i = j = 0
    
    # Merge the two sorted arrays
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

# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### **In-Place Merge Sort**
\`\`\`python
def merge_sort_inplace(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left < right:
        mid = (left + right) // 2
        
        # Sort left half
        merge_sort_inplace(arr, left, mid)
        
        # Sort right half
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge the sorted halves
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    # Create temporary arrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge temporary arrays back
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
merge_sort_inplace(arr)
print(arr)  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### **Bottom-Up Merge Sort (Iterative)**
\`\`\`python
def merge_sort_iterative(arr):
    n = len(arr)
    
    # Start with subarrays of size 1, then 2, 4, 8, etc.
    size = 1
    while size < n:
        # Merge adjacent subarrays of current size
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            
            # Merge subarrays arr[left..mid] and arr[mid+1..right]
            merge_inplace(arr, left, mid, right)
        
        size *= 2
    
    return arr

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
merge_sort_iterative(arr)
print(arr)  # [3, 9, 10, 27, 38, 43, 82]
\`\`\`

---

## 📊 Algorithm Analysis

### **Time Complexity**
- **Best Case**: O(n log n)
- **Worst Case**: O(n log n)
- **Average Case**: O(n log n)

### **Space Complexity**
- **O(n)** - Requires additional space for merging
- **O(log n)** auxiliary stack space for recursion

### **Stability**
- **Stable** - Equal elements maintain their relative order

### **Adaptivity**
- **Not adaptive** - Always O(n log n) regardless of input order

---

## 🔍 The Merge Function

The merge operation is the heart of Merge Sort:

\`\`\`python
def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= ensures stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements (one of these will be empty)
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# Example merge:
left = [1, 3, 5]
right = [2, 4, 6]
print(merge(left, right))  # [1, 2, 3, 4, 5, 6]
\`\`\`

**Key Points:**
- Uses two pointers (i, j) to track positions
- Compares elements and picks the smaller one
- Handles leftover elements efficiently
- The <= comparison ensures stability

---

## 🎯 Merge Sort Properties

### **Advantages**
- ✅ **Guaranteed O(n log n)** performance in all cases
- ✅ **Stable sorting algorithm**
- ✅ **Predictable performance** (no worst-case surprises)
- ✅ **Works well for large datasets**
- ✅ **Parallelizable** (different subarrays can be sorted simultaneously)

### **Disadvantages**
- ❌ **O(n) extra space** required
- ❌ **Not in-place** (uses additional memory)
- ❌ **Slower than Quick Sort** in practice for small arrays
- ❌ **Complex implementation** compared to quadratic sorts

---

## 🧪 Testing and Examples

### **Test Case 1: Normal Array**
\`\`\`python
arr = [38, 27, 43, 3, 9, 82, 10]
print("Original:", arr)
sorted_arr = merge_sort(arr)
print("Sorted:  ", sorted_arr)
# Output: [3, 9, 10, 27, 38, 43, 82]
\`\`\`

### **Test Case 2: Already Sorted**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
sorted_arr = merge_sort(arr)
print("Sorted:  ", sorted_arr)
# Output: [1, 2, 3, 4, 5]
# Still O(n log n) - not adaptive
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [5, 4, 3, 2, 1]
print("Original:", arr)
sorted_arr = merge_sort(arr)
print("Sorted:  ", sorted_arr)
# Output: [1, 2, 3, 4, 5]
# Still O(n log n) - predictable
\`\`\`

### **Test Case 4: Duplicates (Stability Test)**
\`\`\`python
arr = [('Alice', 25), ('Bob', 30), ('Alice', 20)]
print("Original:", arr)
# Sort by age
sorted_arr = merge_sort(arr, key=lambda x: x[1])
print("Sorted by age:", sorted_arr)
# Alice entries maintain relative order (25 before 20)
\`\`\`

---

## 🎯 When to Use Merge Sort

### **Good Use Cases:**
- **Large datasets** where predictability matters
- **External sorting** (sorting data larger than memory)
- **Stability is required**
- **Linked lists** (can be sorted in-place conceptually)
- **Parallel processing** scenarios
- **When worst-case performance guarantees are needed**

### **Avoid When:**
- Memory is limited (due to O(n) space requirement)
- Working with arrays where in-place sorting is preferred
- Small datasets (use Insertion Sort instead)

---

## 🔧 Advanced Variations

### **Three-Way Merge Sort**
\`\`\`python
def three_way_merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide into three parts
    third = len(arr) // 3
    left = arr[:third]
    middle = arr[third:2*third]
    right = arr[2*third:]
    
    # Recursively sort each part
    left = three_way_merge_sort(left)
    middle = three_way_merge_sort(middle)
    right = three_way_merge_sort(right)
    
    # Merge three sorted arrays
    return merge_three(left, middle, right)

def merge_three(left, middle, right):
    result = []
    i = j = k = 0
    
    while i < len(left) or j < len(middle) or k < len(right):
        # Find the smallest among the three
        candidates = []
        if i < len(left): candidates.append((left[i], 0))
        if j < len(middle): candidates.append((middle[j], 1))
        if k < len(right): candidates.append((right[k], 2))
        
        if not candidates:
            break
            
        min_val, source = min(candidates)
        result.append(min_val)
        
        if source == 0: i += 1
        elif source == 1: j += 1
        else: k += 1
    
    return result
\`\`\`

### **In-Place Merge Sort (Advanced)**
More complex but uses O(1) additional space (besides recursion stack).

---

## 🔍 Comparison with Other Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | In-place |
|-----------|------|---------|-------|-------|--------|----------|
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |

**Merge Sort excels when stability and predictable performance are needed!**

---

## 🚀 Real-World Applications

### **External Sorting**
Merge Sort is ideal for sorting large files that don't fit in memory:
- Sort chunks that fit in memory
- Merge the sorted chunks
- Used by databases and file systems

### **Stable Sorting Requirements**
- Sorting customer records by multiple criteria
- Maintaining order in complex data structures
- Database query results

### **Parallel Processing**
- Different subarrays can be sorted simultaneously
- Used in multi-core systems and distributed computing

---

## 🏆 Key Takeaways

1. **Merge Sort** uses divide-and-conquer: divide, sort, and merge
2. **Time complexity** is always O(n log n) - predictable performance
3. **Space complexity** is O(n) - requires additional memory
4. **It's stable** - maintains relative order of equal elements
5. **Excellent for large datasets** and external sorting
6. **Forms the basis** for advanced sorting algorithms like Timsort

**Merge Sort is reliable and efficient, but uses extra space. Next, let's explore Quick Sort, which is often faster in practice! 🚀**`
};
