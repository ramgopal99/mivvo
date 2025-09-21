import { SubLesson } from '../../../data/lessonsData';

export const topic_15_4: SubLesson = {
  id: 15.4,
  title: 'Insertion Sort Algorithm',
  status: 'demo',
  content: `# 🔧 Insertion Sort Algorithm

Insertion Sort is an efficient algorithm for small datasets and nearly sorted arrays. It works by building a sorted array one element at a time, inserting each new element into its correct position within the already sorted portion. Let's explore this intuitive approach!

---

## 🎯 How Insertion Sort Works

**Insertion Sort** works similarly to how you might sort playing cards in your hand. You take one card at a time and insert it into its correct position among the cards you're already holding.

### **Basic Algorithm**
1. Start with the second element (first is considered sorted)
2. Compare it with elements in the sorted portion
3. Shift larger elements to the right to make space
4. Insert the element in its correct position
5. Repeat for all remaining elements

---

## 📝 Step-by-Step Example

**Input Array**: [12, 11, 13, 5, 6]

### **Iteration 1: i = 1, key = 11**
- Sorted portion: [12], Unsorted: [11, 13, 5, 6]
- Compare 11 < 12 → Shift 12 right → [12, 12]
- Insert 11 → [**11**, **12**, 13, 5, 6]

### **Iteration 2: i = 2, key = 13**
- Sorted portion: [11, 12], Unsorted: [13, 5, 6]
- Compare 13 > 12 → No shift needed
- Insert 13 → [11, 12, **13**, 5, 6]

### **Iteration 3: i = 3, key = 5**
- Sorted portion: [11, 12, 13], Unsorted: [5, 6]
- Compare 5 < 13 → Shift 13 right → [11, 12, 13, 13, 6]
- Compare 5 < 12 → Shift 12 right → [11, 12, 12, 13, 6]
- Compare 5 < 11 → Shift 11 right → [11, 11, 12, 13, 6]
- Insert 5 → [**5**, **11**, **12**, **13**, 6]

### **Iteration 4: i = 4, key = 6**
- Sorted portion: [5, 11, 12, 13], Unsorted: [6]
- Compare 6 < 13 → Shift 13 right → [5, 11, 12, 13, 13]
- Compare 6 < 12 → Shift 12 right → [5, 11, 12, 12, 13]
- Compare 6 > 11 → Stop shifting
- Insert 6 → [5, 11, **6**, 12, 13]

Wait, that doesn't look right. Let me fix this:

Actually, when we compare 6 with elements from right to left in the sorted portion:

- Compare 6 < 13 → Shift 13 right → [5, 11, 12, 13, 13]
- Compare 6 < 12 → Shift 12 right → [5, 11, 12, 12, 13]  
- Compare 6 > 11 → Stop, insert 6 at position after 11
- Result: [5, 11, **6**, 12, 13]

**Final Result**: [5, 6, 11, 12, 13]

---

## 💻 Implementation

### **Basic Insertion Sort**
\`\`\`python
def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]  # Element to be inserted
        j = i - 1
        
        # Move elements of arr[0..i-1] that are greater than key
        # to one position ahead of their current position
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        # Insert the key at its correct position
        arr[j + 1] = key
    
    return arr

# Example usage
arr = [12, 11, 13, 5, 6]
insertion_sort(arr)
print(arr)  # [5, 6, 11, 12, 13]
\`\`\`

### **Insertion Sort with Binary Search**
\`\`\`python
def binary_search_insertion(arr, val, start, end):
    """Find the position where val should be inserted"""
    if start == end:
        if arr[start] > val:
            return start
        else:
            return start + 1
    
    if start > end:
        return start
    
    mid = (start + end) // 2
    if arr[mid] < val:
        return binary_search_insertion(arr, val, mid + 1, end)
    elif arr[mid] > val:
        return binary_search_insertion(arr, val, start, mid - 1)
    else:
        return mid

def insertion_sort_binary(arr):
    n = len(arr)
    
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        
        # Find position to insert using binary search
        pos = binary_search_insertion(arr, key, 0, j)
        
        # Shift elements to make space
        for k in range(j, pos - 1, -1):
            arr[k + 1] = arr[k]
        
        # Insert the key
        arr[pos] = key
    
    return arr

# Example
arr = [12, 11, 13, 5, 6]
insertion_sort_binary(arr)
print(arr)  # [5, 6, 11, 12, 13]
\`\`\`

---

## 📊 Algorithm Analysis

### **Time Complexity**
- **Best Case**: O(n) - when array is already sorted
- **Worst Case**: O(n²) - when array is reverse sorted
- **Average Case**: O(n²)

### **Space Complexity**
- **O(1)** - In-place sorting, only constant extra space

### **Stability**
- **Stable** - Equal elements maintain their relative order

### **Adaptivity**
- **Highly Adaptive** - Performs excellently on nearly sorted data

---

## 🎯 Insertion Sort Properties

### **Advantages**
- ✅ **Excellent for small datasets** (n ≤ 25 elements)
- ✅ **Adaptive** - O(n) for nearly sorted arrays
- ✅ **Stable sorting algorithm**
- ✅ **In-place sorting** (no extra space needed)
- ✅ **Online algorithm** - can sort as data comes in
- ✅ **Simple to implement**

### **Disadvantages**
- ❌ **O(n²) worst case** - not suitable for large arrays
- ❌ **Inefficient for reverse sorted data**

---

## 🔄 Why "Insertion" Sort?

The name comes from the way elements are inserted into their correct positions:

**Card Sorting Analogy:**
Imagine sorting playing cards:
1. You hold cards in your left hand (sorted)
2. You pick a card from the table with your right hand
3. You insert it into the correct position in your left hand
4. You shift existing cards as needed to make space

**This is exactly how Insertion Sort works!**

---

## 🧪 Testing and Examples

### **Test Case 1: Nearly Sorted Array**
\`\`\`python
arr = [1, 2, 4, 3, 5, 6]
print("Original:", arr)
insertion_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5, 6]
# Very efficient - only a few shifts needed!
\`\`\`

### **Test Case 2: Already Sorted**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
insertion_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
# Best case: O(n) time!
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [5, 4, 3, 2, 1]
print("Original:", arr)
insertion_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
# Worst case: O(n²) time
\`\`\`

### **Test Case 4: Duplicates (Stability Test)**
\`\`\`python
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original:", arr)
insertion_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
# Stable: Relative order of duplicates preserved
\`\`\`

---

## 🎯 When to Use Insertion Sort

### **Good Use Cases:**
- **Small datasets** (n ≤ 25 elements)
- **Nearly sorted data** (excellent performance)
- **Online sorting** (data arrives incrementally)
- **Stable sorting required**
- **Memory-constrained environments**
- **Part of hybrid algorithms** (like Timsort in Python)

### **Avoid When:**
- Large datasets (n > 1000)
- Random data (use Quick Sort or Merge Sort)
- Reverse sorted data (use other algorithms)

---

## 🔧 Variations and Optimizations

### **Shell Sort (Generalized Insertion Sort)**
\`\`\`python
def shell_sort(arr):
    n = len(arr)
    gap = n // 2  # Initial gap
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            
            # Perform insertion sort on elements gap apart
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            
            arr[j] = temp
        
        gap //= 2  # Reduce gap
    
    return arr

# Example
arr = [12, 34, 54, 2, 3]
shell_sort(arr)
print(arr)  # [2, 3, 12, 34, 54]
\`\`\`

### **Library Sort**
A more complex variation that uses gaps to improve insertion sort.

---

## 🔍 Comparison with Other Quadratic Sorts

| Algorithm | Best Case | Average Case | Worst Case | Stable | Adaptive |
|-----------|-----------|--------------|------------|--------|----------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | Yes | Yes |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | No | No |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | Yes | Yes |

**Insertion Sort is generally the best of the three quadratic sorts!**

---

## 🏆 Key Takeaways

1. **Insertion Sort** builds the sorted array one element at a time
2. **Time complexity** ranges from O(n) to O(n²) depending on input
3. **Space complexity** is O(1) - it's an in-place algorithm
4. **It's stable** - maintains relative order of equal elements
5. **Highly adaptive** - excellent performance on nearly sorted data
6. **Best suited** for small datasets and online sorting scenarios

**Insertion Sort is efficient and practical for many real-world scenarios. Now let's explore the more powerful divide-and-conquer algorithms like Merge Sort! 🚀**`
};
