import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_2: SubLesson = {
  id: "15.2",
  title: 'Bubble Sort Algorithm',
  status: 'demo',
  content: "`# ðŸ«§ Bubble Sort Algorithm

Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. Let's explore this classic algorithm!

---

## ðŸŽ¯ How Bubble Sort Works

**Bubble Sort** gets its name because smaller elements "bubble" to the top of the array (beginning) while larger elements sink to the bottom (end).

### **Basic Algorithm**
1. Compare each pair of adjacent elements
2. Swap them if they are in wrong order
3. Repeat for all elements
4. Each pass moves the largest unsorted element to its correct position

---

## ðŸ“ Step-by-Step Example

**Input Array**: [64, 34, 25, 12, 22, 11, 90]

### **Pass 1:**
- Compare 64 > 34 â†’ Swap â†’ [34, 64, 25, 12, 22, 11, 90]
- Compare 64 > 25 â†’ Swap â†’ [34, 25, 64, 12, 22, 11, 90]
- Compare 64 > 12 â†’ Swap â†’ [34, 25, 12, 64, 22, 11, 90]
- Compare 64 > 22 â†’ Swap â†’ [34, 25, 12, 22, 64, 11, 90]
- Compare 64 > 11 â†’ Swap â†’ [34, 25, 12, 22, 11, 64, 90]
- Compare 64 < 90 â†’ No swap â†’ [34, 25, 12, 22, 11, 64, 90]
- **Largest element (90) is now in correct position!**

### **Pass 2:**
- Compare 34 > 25 â†’ Swap â†’ [25, 34, 12, 22, 11, 64, 90]
- Compare 34 > 12 â†’ Swap â†’ [25, 12, 34, 22, 11, 64, 90]
- Compare 34 > 22 â†’ Swap â†’ [25, 12, 22, 34, 11, 64, 90]
- Compare 34 > 11 â†’ Swap â†’ [25, 12, 22, 11, 34, 64, 90]
- Compare 34 < 64 â†’ No swap
- **Second largest element (64) is now in correct position!**

### **And so on...**

**Final Result**: [11, 12, 22, 25, 34, 64, 90]

---

## ðŸ’» Implementation

### **Basic Bubble Sort**
\`"\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            # Swap if current element > next element
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
print(arr)  # [11, 12, 22, 25, 34, 64, 90]
\`\`\`

### **Optimized Bubble Sort (Early Termination)**
\`\`\`python
def optimized_bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False  # Track if any swap happened
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swap occurred, array is already sorted
        if not swapped:
            break
    
    return arr

# Example: Nearly sorted array
arr = [1, 2, 3, 4, 5, 6, 7, 8, 10, 9]
optimized_bubble_sort(arr)
print(arr)  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
\`\`\`

---

## ðŸ“Š Algorithm Analysis

### **Time Complexity**
- **Best Case**: O(n) - when array is already sorted
- **Worst Case**: O(nÂ²) - when array is reverse sorted
- **Average Case**: O(nÂ²)

### **Space Complexity**
- **O(1)** - In-place sorting, only constant extra space needed

### **Stability**
- **Stable** - Equal elements maintain their relative order

### **Adaptivity**
- **Adaptive** - Performs better on nearly sorted data (with optimization)

---

## ðŸ” Why "Bubble" Sort?

The name comes from the way smaller elements "bubble up" to the beginning of the array:

**Visualization:**
\`\`\`text
Initial: [5, 4, 3, 2, 1]

Pass 1:  [4, 5, 3, 2, 1]  // 4 and 5 swapped
         [4, 3, 5, 2, 1]  // 5 and 3 swapped
         [4, 3, 2, 5, 1]  // 5 and 2 swapped
         [4, 3, 2, 1, 5]  // 5 and 1 swapped

Pass 2:  [3, 4, 2, 1, 5]  // 4 and 3 swapped
         [3, 2, 4, 1, 5]  // 4 and 2 swapped
         [3, 2, 1, 4, 5]  // 4 and 1 swapped

Pass 3:  [2, 3, 1, 4, 5]  // 3 and 2 swapped
         [2, 1, 3, 4, 5]  // 3 and 1 swapped

Pass 4:  [1, 2, 3, 4, 5]  // 2 and 1 swapped

Final:   [1, 2, 3, 4, 5]
\`\`\`

Notice how the largest elements "sink" to the bottom, while smaller elements "bubble" up!

---

## ðŸŽ¯ Bubble Sort Properties

### **Advantages**
- âœ… **Simple to understand and implement**
- âœ… **Stable sorting algorithm**
- âœ… **In-place sorting** (no extra space needed)
- âœ… **Adaptive** (can be optimized for nearly sorted data)

### **Disadvantages**
- âŒ **Very slow** for large datasets (O(nÂ²))
- âŒ **Does many unnecessary comparisons**
- âŒ **Not suitable for large arrays**

---

## ðŸ”§ Variations and Optimizations

### **Cocktail Shaker Sort (Bidirectional Bubble Sort)**
\`\`\`python
def cocktail_shaker_sort(arr):
    n = len(arr)
    swapped = True
    start = 0
    end = n - 1
    
    while swapped:
        swapped = False
        
        # Forward pass (like bubble sort)
        for i in range(start, end):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        
        # If no swaps, array is sorted
        if not swapped:
            break
        
        swapped = False
        end -= 1
        
        # Backward pass
        for i in range(end - 1, start - 1, -1):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                swapped = True
        
        start += 1
    
    return arr
\`\`\`

### **Odd-Even Sort (Brick Sort)**
\`\`\`python
def odd_even_sort(arr):
    n = len(arr)
    is_sorted = False
    
    while not is_sorted:
        is_sorted = True
        
        # Odd phase
        for i in range(1, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
        
        # Even phase
        for i in range(0, n - 1, 2):
            if arr[i] > arr[i + 1]:
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                is_sorted = False
    
    return arr
\`\`\`

---

## ðŸ§ª Testing and Examples

### **Test Case 1: Normal Array**
\`\`\`python
arr = [64, 34, 25, 12, 22, 11, 90]
print("Original:", arr)
bubble_sort(arr)
print("Sorted:  ", arr)
# Output: [11, 12, 22, 25, 34, 64, 90]
\`\`\`

### **Test Case 2: Already Sorted**
\`\`\`python
arr = [1, 2, 3, 4, 5]
print("Original:", arr)
bubble_sort(arr)  # Should terminate early with optimization
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
\`\`\`

### **Test Case 3: Reverse Sorted**
\`\`\`python
arr = [5, 4, 3, 2, 1]
print("Original:", arr)
bubble_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 2, 3, 4, 5]
\`\`\`

### **Test Case 4: Duplicates (Stability Test)**
\`\`\`python
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]
print("Original:", arr)
bubble_sort(arr)
print("Sorted:  ", arr)
# Output: [1, 1, 2, 3, 3, 4, 5, 5, 6, 9]
\`\`\`

---

## ðŸŽ¯ When to Use Bubble Sort

### **Good Use Cases:**
- **Educational purposes** - Great for learning sorting concepts
- **Small datasets** (n â‰¤ 20 elements)
- **Nearly sorted data** (with optimization)
- **When simplicity matters more than performance**
- **Embedded systems** with limited memory

### **Avoid When:**
- Large datasets (n > 1000)
- Performance-critical applications
- Real-time systems requiring fast sorting

---

## ðŸ† Key Takeaways

1. **Bubble Sort** repeatedly swaps adjacent elements if they're in wrong order
2. **Time complexity** is O(nÂ²) in worst case, but O(n) for already sorted arrays
3. **Space complexity** is O(1) - it's an in-place sorting algorithm
4. **It's stable** - maintains relative order of equal elements
5. **Best suited** for small datasets and educational purposes

**Bubble Sort may be slow, but it's the foundation for understanding more complex sorting algorithms! Next, let's explore Selection Sort! ðŸš€**`
};


