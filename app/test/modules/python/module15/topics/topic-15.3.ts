import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_3: SubLesson = {
  id: "15.3",
  title: 'Selection Sort Algorithm',
  status: 'demo',
  content: `# 🎯 Selection Sort Algorithm

Selection Sort is another simple comparison-based sorting algorithm. Unlike Bubble Sort, it minimizes the number of swaps by finding the minimum element and placing it in its correct position in each pass. Let's explore this efficient approach!

---

## 🎯 How Selection Sort Works

**Selection Sort** works by repeatedly finding the minimum element from the unsorted portion and putting it at the beginning. It maintains two subarrays: sorted and unsorted.

### **Basic Algorithm**
1. Find the minimum element in the unsorted array
2. Swap it with the first unsorted element
3. Move the boundary between sorted and unsorted arrays
4. Repeat until the entire array is sorted

---

## 📝 Step-by-Step Example

**Input Array**: [64, 25, 12, 22, 11]

### **Pass 1:**
- Find minimum element in [64, 25, 12, 22, 11] → **11**
- Swap 11 with first element (64) → [**11**, 25, 12, 22, 64]
- **11 is now in its correct position!**

### **Pass 2:**
- Find minimum element in [25, 12, 22, 64] → **12**
- Swap 12 with first unsorted element (25) → [11, **12**, 25, 22, 64]
- **12 is now in its correct position!**

### **Pass 3:**
- Find minimum element in [25, 22, 64] → **22**
- Swap 22 with first unsorted element (25) → [11, 12, **22**, 25, 64]
- **22 is now in its correct position!**

### **Pass 4:**
- Find minimum element in [25, 64] → **25**
- 25 is already in correct position → [11, 12, 22, **25**, 64]
- **25 is now in its correct position!**

### **Pass 5:**
- Only one element left [64] → Already sorted!

**Final Result**: [11, 12, 22, 25, 64]

---

## 💻 Implementation

### **Basic Selection Sort**
\`\`\`python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Find the minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum element with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
selection_sort(arr)
print(arr)  # [11, 12, 22, 25, 64]
\`\`\`

### **Selection Sort with Detailed Output**
\`\`\`python
def selection_sort_verbose(arr):
    n = len(arr)
    
    for i in range(n):
        min_idx = i
        print(f"Pass {i + 1}: Finding min in {arr[i:]}")
        
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        if min_idx != i:
            print(f"  Swapping {arr[i]} and {arr[min_idx]}")
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
        print(f"  Result: {arr}")
    
    return arr

# Example
arr = [29, 10, 14, 37, 13]
selection_sort_verbose(arr)
\`\`\`

---

## 📊 Algorithm Analysis

### **Time Complexity**
- **Best Case**: O(n²) - Always scans entire unsorted portion
- **Worst Case**: O(n²) - Reverse sorted array
- **Average Case**: O(n²)

### **Space Complexity**
- **O(1)** - In-place sorting, only constant extra space

### **Stability**
- **Unstable** - Equal elements may change relative order

### **Number of Swaps**
- **O(n)** - At most n-1 swaps (much fewer than Bubble Sort)

---

## 🔍 Selection Sort vs Bubble Sort

| Aspect | Selection Sort | Bubble Sort |
|--------|----------------|-------------|
| **Swaps** | O(n) - Minimal | O(n²) - Many |
| **Comparisons** | O(n²) - Always | O(n²) - Always |
| **Best Case** | O(n²) | O(n) |
| **Stability** | Unstable | Stable |
| **Memory** | O(1) | O(1) |

**Key Difference**: Selection Sort performs fewer swaps but always takes O(n²) time.

---

## 🎯 Selection Sort Properties

### **Advantages**
- ✅ **Simple to understand and implement**
- ✅ **Performs fewer swaps** than Bubble Sort
- ✅ **In-place sorting** (no extra space needed)
- ✅ **Predictable performance** (always O(n²))

### **Disadvantages**
- ❌ **Always O(n²)** - even for already sorted arrays
- ❌ **Unstable** - may change relative order of equal elements
- ❌ **Not suitable for large arrays**

---

## 🔧 Bidirectional Selection Sort

A variation that finds both minimum and maximum elements in each pass:

\`\`\`python
def bidirectional_selection_sort(arr):
    n = len(arr)
    left = 0
    right = n - 1
    
    while left < right:
        # Find minimum and maximum in current range
        min_idx = left
        max_idx = right
        
        for i in range(left, right + 1):
            if arr[i] < arr[min_idx]:
                min_idx = i
            if arr[i] > arr[max_idx]:
                max_idx = i
        
        # Place minimum at left
        arr[left], arr[min_idx] = arr[min_idx], arr[left]
        
        # If max was at left position, update its index
        if max_idx == left:
            max_idx = min_idx
        
        # Place maximum at right
        arr[right], arr[max_idx] = arr[max_idx], arr[right]
        
        left += 1
        right -= 1
    
    return arr

# Example
arr = [64, 25, 12, 22, 11, 90]
bidirectional_selection_sort(arr)
print(arr)  # [11, 12, 22, 25, 64, 90]
\`\`\`

---

## 🧪 Testing and Examples

### **Test Case 1: Normal Array**
\`\`\`python
arr = [64, 25, 12, 22, 11]
print("Original:", arr)
selection_sort(arr)
print("Sorted:  ", arr)
# Output: [11, 12, 22, 25, 64]
\`\`\`

### **Test Case 2: Already Sorted**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
selection_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
# Still takes O(n²) time!
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [5, 4, 3, 2, 1]
print("Original:", arr)
selection_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
\`\`\`

### **Test Case 4: Duplicates (Stability Test)**
\`\`\`python
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original:", arr)
selection_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
# Note: Relative order of duplicates may change
\`\`\`

---

## 🎯 When to Use Selection Sort

### **Good Use Cases:**
- **Small datasets** (n ≤ 100 elements)
- **Memory-constrained environments**
- **When minimizing swaps is important**
- **Simple implementation needed**
- **Teaching sorting concepts**

### **Avoid When:**
- Large datasets (n > 1000)
- Stability is required
- Nearly sorted data (use Insertion Sort instead)
- Performance-critical applications

---

## 🔄 Selection Sort Visualization

\`\`\`text
Initial: [29, 10, 14, 37, 13]

Pass 1:  [29, 10, 14, 37, 13]
          ↑           ↑
         min=10     swap with 29
         [10, 29, 14, 37, 13]

Pass 2:  [10, 29, 14, 37, 13]
              ↑     ↑
             min=14 swap with 29
         [10, 14, 29, 37, 13]

Pass 3:  [10, 14, 29, 37, 13]
                  ↑     ↑
                 min=13 swap with 29
         [10, 14, 13, 37, 29]

Pass 4:  [10, 14, 13, 37, 29]
               ↑  ↑
              min=13 swap with 14
         [10, 13, 14, 37, 29]

Pass 5:  [10, 13, 14, 37, 29]
                     ↑  ↑
                    min=29 swap with 37
         [10, 13, 14, 29, 37]

Final:   [10, 13, 14, 29, 37]
\`\`\`

---

## 🏆 Key Takeaways

1. **Selection Sort** finds the minimum element and places it at the beginning
2. **Time complexity** is always O(n²) regardless of input order
3. **Space complexity** is O(1) - it's an in-place algorithm
4. **It's unstable** - may change relative order of equal elements
5. **Performs fewer swaps** than Bubble Sort (at most n-1)

**Selection Sort is simple and predictable, but not the most efficient. Next, let's explore Insertion Sort, which performs better on nearly sorted data! 🚀**`
};

