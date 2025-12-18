import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_7: SubLesson = {
  id: 15.7,
  title: 'Heap Sort Algorithm',
  status: 'demo',
  content: `# 🏗️ Heap Sort Algorithm

Heap Sort is a sophisticated sorting algorithm that uses a binary heap data structure. It provides guaranteed O(n log n) performance with minimal extra space, making it perfect for memory-constrained environments. Let's explore this elegant algorithm that combines data structure knowledge with sorting!

---

## 🎯 How Heap Sort Works

**Heap Sort** leverages the properties of a binary heap:
1. **Build a max-heap** from the input array
2. **Extract the maximum element** (root) and place it at the end
3. **Restore heap property** for the remaining elements
4. **Repeat** until the array is sorted

The key insight is that a max-heap always keeps the largest element at the root, making it easy to extract and place in its correct sorted position.

---

## 📝 Step-by-Step Example

**Input Array**: [4, 10, 3, 5, 1]

### **Step 1: Build Max-Heap**
\`\`\`text
Initial array: [4, 10, 3, 5, 1]

Build heap (heapify from bottom up):
- Start with leaf nodes (already heaps)
- Heapify node at index 1: [4, 10, 3, 5, 1] → [4, 10, 3, 5, 1] (no change)
- Heapify node at index 0: [4, 10, 3, 5, 1] → [10, 4, 3, 5, 1] (swap 4 and 10)

Max-heap: [10, 5, 3, 4, 1]
         10
        /  \\
       5    3
      / \\
     4   1
\`\`\`

### **Step 2: Extract Maximum (First Pass)**
\`\`\`text
Heap: [10, 5, 3, 4, 1]  →  Swap root with last element
Result: [1, 5, 3, 4, 10] →  Now heapify root (ignore last element)

After heapify: [5, 4, 3, 1, 10]
       5
      / \\
     4   3
    /
   1

Largest element (10) is now in correct position!
\`\`\`

### **Step 3: Extract Maximum (Second Pass)**
\`\`\`text
Heap: [5, 4, 3, 1, 10]  →  Swap root with last unsorted element
Result: [1, 4, 3, 5, 10] →  Now heapify root

After heapify: [4, 1, 3, 5, 10]
      4
     / \\
    1   3

Largest element (5) is now in correct position!
\`\`\`

### **And so on...**

**Final Result**: [1, 3, 4, 5, 10]

---

## 💻 Implementation

### **Complete Heap Sort**
\`\`\`python
def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        # Swap root with last element
        arr[i], arr[0] = arr[0], arr[i]
        
        # Heapify the reduced heap
        heapify(arr, i, 0)

def heapify(arr, n, i):
    """Heapify subtree rooted at index i"""
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    # Check if left child exists and is larger than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is larger than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root, swap and continue heapifying
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Example usage
arr = [4, 10, 3, 5, 1]
heap_sort(arr)
print(arr)  # [1, 3, 4, 5, 10]
\`\`\`

### **Heapify Function (Step by Step)**
\`\`\`python
def heapify_verbose(arr, n, i):
    print(f"Heapifying at index {i}, value {arr[i]}")
    
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    print(f"  Left child ({left}): {arr[left] if left < n else 'None'}")
    print(f"  Right child ({right}): {arr[right] if right < n else 'None'}")
    
    if left < n and arr[left] > arr[largest]:
        largest = left
        print(f"  Left child is larger")
    
    if right < n and arr[right] > arr[largest]:
        largest = right
        print(f"  Right child is larger")
    
    if largest != i:
        print(f"  Swapping {arr[i]} with {arr[largest]}")
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify_verbose(arr, n, largest)
    else:
        print("  No swap needed")

# Example
arr = [4, 10, 3, 5, 1]
heapify_verbose(arr, len(arr), 0)
\`\`\`

---

## 🏗️ Understanding Binary Heaps

### **Heap Properties**
- **Complete Binary Tree**: All levels filled except possibly last level
- **Heap Property**: Parent ≥ children (max-heap) or Parent ≤ children (min-heap)

### **Array Representation**
\`\`\`text
Heap: [10, 5, 3, 4, 1]
         10 (index 0)
        /  \\
       5    3
      / \\
     4   1

For node at index i:
- Left child: 2*i + 1
- Right child: 2*i + 2
- Parent: (i-1)//2
\`\`\`

### **Building a Heap**
\`\`\`python
def build_max_heap(arr):
    n = len(arr)
    # Start from last non-leaf node and heapify each
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    return arr

arr = [4, 10, 3, 5, 1]
build_max_heap(arr)
print(arr)  # [10, 5, 3, 4, 1]
\`\`\`

---

## 📊 Algorithm Analysis

### **Time Complexity**
- **Build Heap**: O(n)
- **Extract Elements**: O(n log n)
- **Overall**: O(n log n) - guaranteed!
- **Best Case**: O(n log n)
- **Worst Case**: O(n log n)
- **Average Case**: O(n log n)

### **Space Complexity**
- **O(1)** - In-place sorting, no extra space needed!

### **Stability**
- **Unstable** - Equal elements may change relative order

### **In-place**
- **Yes** - Modifies the original array

---

## 🎯 Heap Sort Properties

### **Advantages**
- ✅ **Guaranteed O(n log n)** performance in all cases
- ✅ **In-place sorting** - uses only O(1) extra space
- ✅ **No worst-case surprises** like Quick Sort
- ✅ **Cache-friendly** - good locality of reference

### **Disadvantages**
- ❌ **Unstable** - may change relative order of equal elements
- ❌ **Not adaptive** - always O(n log n) even for sorted data
- ❌ **Complex implementation** compared to simpler algorithms
- ❌ **Slower than Quick Sort** in practice for random data

---

## 🔍 Heap Sort vs Other Algorithms

| Algorithm | Best | Average | Worst | Space | Stable | In-place |
|-----------|------|---------|-------|-------|--------|----------|
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | No | Yes |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | No | Yes |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes | No |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | Yes | Yes |

**Heap Sort provides the best of both worlds: guaranteed performance with minimal memory usage!**

---

## 🧪 Testing and Examples

### **Test Case 1: Normal Array**
\`\`\`python
arr = [4, 10, 3, 5, 1]
print("Original:", arr)
heap_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 3, 4, 5, 10]
\`\`\`

### **Test Case 2: Already Sorted**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
heap_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
# Still O(n log n) - not adaptive
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [5, 4, 3, 2, 1]
print("Original:", arr)
heap_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
# Guaranteed O(n log n)
\`\`\`

### **Test Case 4: Duplicates**
\`\`\`python
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original:", arr)
heap_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
\`\`\`

---

## 🎯 When to Use Heap Sort

### **Good Use Cases:**
- **Memory-constrained systems** (embedded systems)
- **Large datasets** where worst-case performance matters
- **Real-time systems** requiring predictable timing
- **When stability isn't required**
- **Priority queue** implementations

### **Avoid When:**
- Stability is required (use Merge Sort)
- Small datasets (use Insertion Sort)
- Average-case performance is priority (use Quick Sort)

---

## 🔧 Advanced Heap Operations

### **Heap Extract Max/Min**
\`\`\`python
def heap_extract_max(heap):
    if len(heap) == 0:
        return None
    
    max_val = heap[0]
    # Move last element to root
    heap[0] = heap[-1]
    heap.pop()
    
    # Restore heap property
    heapify(heap, len(heap), 0)
    return max_val

def heap_insert(heap, value):
    heap.append(value)
    i = len(heap) - 1
    
    # Bubble up the new element
    while i > 0:
        parent = (i - 1) // 2
        if heap[i] > heap[parent]:
            heap[i], heap[parent] = heap[parent], heap[i]
            i = parent
        else:
            break
\`\`\`

### **Heap-based Priority Queue**
\`\`\`python
class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def insert(self, val):
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)
    
    def extract_max(self):
        if not self.heap:
            return None
        
        max_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        if self.heap:
            self._heapify(0)
        
        return max_val
    
    def _bubble_up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else:
                break
    
    def _heapify(self, i):
        n = len(self.heap)
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and self.heap[left] > self.heap[largest]:
            largest = left
        if right < n and self.heap[right] > self.heap[largest]:
            largest = right
        
        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self._heapify(largest)
\`\`\`

---

## 🚀 Real-World Applications

### **Priority Queues**
- Operating system task scheduling
- Event simulation
- Dijkstra's algorithm for shortest paths

### **Order Statistics**
- Finding k-th largest/smallest element
- Median finding algorithms

### **Memory-Constrained Environments**
- Embedded systems
- Mobile applications
- Real-time systems

### **External Sorting**
- When data is too large for memory
- Database sorting operations

---

## 🏆 Key Takeaways

1. **Heap Sort** uses a binary heap to sort elements
2. **Time complexity** is guaranteed O(n log n) in all cases
3. **Space complexity** is O(1) - the most memory-efficient O(n log n) sort
4. **It's unstable** - doesn't preserve relative order of equal elements
5. **In-place sorting** - modifies the original array
6. **Perfect for systems** where memory is limited and predictable performance is needed

**Heap Sort provides guaranteed performance with minimal memory usage. Now let's compare all the sorting algorithms we've learned! 🚀**`
};
