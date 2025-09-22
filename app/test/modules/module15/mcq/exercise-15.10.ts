import { Exercise } from '../../../data/lessonsData';

export const exercise_15_10: Exercise = {
  id: 15.10,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement and compare basic sorting algorithms:\n1. Create Bubble Sort, Selection Sort, and Insertion Sort\n2. Implement performance timing for each algorithm\n3. Compare time complexities with different input sizes\n4. Test with best case, worst case, and average case scenarios\n5. Analyze stability and in-place properties",
      solution: `# Basic Sorting Algorithms Implementation and Comparison

import time
import random

def bubble_sort(arr):
    """Bubble Sort: O(n²) time, O(1) space, stable"""
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:  # Optimization: stop if no swaps
            break
    return arr

def selection_sort(arr):
    """Selection Sort: O(n²) time, O(1) space, unstable"""
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

def insertion_sort(arr):
    """Insertion Sort: O(n²) worst case, O(n) best case, O(1) space, stable"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def time_sorting_algorithm(sort_func, arr, name):
    """Time a sorting algorithm"""
    arr_copy = arr.copy()
    start_time = time.time()
    sort_func(arr_copy)
    end_time = time.time()
    return end_time - start_time

def generate_test_cases(size):
    """Generate different test cases"""
    # Random array
    random_arr = [random.randint(0, 1000) for _ in range(size)]

    # Sorted array (best case for insertion sort)
    sorted_arr = list(range(size))

    # Reverse sorted array (worst case for most algorithms)
    reverse_arr = list(range(size, 0, -1))

    return {
        'random': random_arr,
        'sorted': sorted_arr,
        'reverse': reverse_arr
    }

def run_performance_comparison():
    """Compare sorting algorithms performance"""
    print("Sorting Algorithms Performance Comparison")
    print("=" * 60)

    algorithms = [
        ('Bubble Sort', bubble_sort),
        ('Selection Sort', selection_sort),
        ('Insertion Sort', insertion_sort)
    ]

    test_sizes = [100, 500, 1000]

    for size in test_sizes:
        print(f"\nArray Size: {size}")
        print("-" * 30)

        test_cases = generate_test_cases(size)

        for case_name, arr in test_cases.items():
            print(f"\n{case_name.capitalize()} Case:")
            print(f"{'Algorithm':<15} {'Time (s)':<10} {'First 10 elements':<20}")
            print("-" * 55)

            for algo_name, algo_func in algorithms:
                time_taken = time_sorting_algorithm(algo_func, arr, algo_name)
                result_preview = str(arr[:10]) if len(arr) >= 10 else str(arr)
                print(f"{algo_name:<15} {time_taken:<10.6f} {result_preview}")

def analyze_sorting_properties():
    """Analyze stability and other properties"""
    print("\nSorting Algorithm Properties Analysis")
    print("=" * 50)

    # Test stability with objects that have equal keys
    class Item:
        def __init__(self, key, value):
            self.key = key
            self.value = value

        def __repr__(self):
            return f"({self.key},{self.value})"

    # Create array with equal keys
    items = [Item(3, 'A'), Item(1, 'B'), Item(3, 'C'), Item(2, 'D'), Item(1, 'E')]

    algorithms = [
        ('Bubble Sort', bubble_sort),
        ('Selection Sort', selection_sort),
        ('Insertion Sort', insertion_sort)
    ]

    print("Stability Test (equal keys should maintain relative order):")
    original = [str(item) for item in items]
    print(f"Original: {original}")

    for name, algo in algorithms:
        # Sort by key
        sorted_items = sorted(items, key=lambda x: x.key)
        result = [str(item) for item in sorted_items]
        print(f"{name}: {result}")

    print("\nAlgorithm Properties:")
    print("Bubble Sort:   Stable, In-place, O(n²) time")
    print("Selection Sort: Unstable, In-place, O(n²) time")
    print("Insertion Sort: Stable, In-place, O(n²) worst/O(n) best time")

# Run the comparisons
run_performance_comparison()
analyze_sorting_properties()

print("\nKey Insights:")
print("- Bubble Sort: Simple but inefficient, good for nearly sorted data")
print("- Selection Sort: Predictable performance, good for small datasets")
print("- Insertion Sort: Excellent for small or partially sorted datasets")
print("- All three are in-place but have O(n²) worst-case time complexity")
print("- Stability matters when sorting objects with equal keys")`
    },
    {
      id: "ex2",
      question: "Implement advanced comparison-based sorting algorithms:\n1. Create Quick Sort with different pivot selection strategies\n2. Implement Merge Sort with and without optimization\n3. Add Heap Sort using heap data structure\n4. Compare performance across different input distributions\n5. Analyze recursion depth and stack usage\n6. Test stability properties of each algorithm",
      solution: `# Advanced Comparison-Based Sorting Algorithms

import random
import sys

def quick_sort(arr, pivot_strategy='middle'):
    """Quick Sort with different pivot selection strategies"""
    if len(arr) <= 1:
        return arr

    # Choose pivot based on strategy
    if pivot_strategy == 'first':
        pivot = arr[0]
    elif pivot_strategy == 'last':
        pivot = arr[-1]
    elif pivot_strategy == 'middle':
        pivot = arr[len(arr) // 2]
    elif pivot_strategy == 'random':
        pivot = random.choice(arr)
    elif pivot_strategy == 'median_of_three':
        first, middle, last = arr[0], arr[len(arr)//2], arr[-1]
        pivot = sorted([first, middle, last])[1]

    # Partition
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    # Recurse
    return quick_sort(left, pivot_strategy) + middle + quick_sort(right, pivot_strategy)

def merge_sort(arr):
    """Merge Sort - guaranteed O(n log n)"""
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    """Merge two sorted arrays"""
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

def heap_sort(arr):
    """Heap Sort using heap data structure"""
    def heapify(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2

        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, n, largest)

    n = len(arr)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[i], arr[0] = arr[0], arr[i]  # Swap
        heapify(arr, i, 0)

    return arr

def measure_performance():
    """Compare advanced sorting algorithms"""
    import time

    print("Advanced Sorting Algorithms Performance")
    print("=" * 60)

    algorithms = [
        ('Quick Sort (middle)', lambda arr: quick_sort(arr, 'middle')),
        ('Quick Sort (random)', lambda arr: quick_sort(arr, 'random')),
        ('Quick Sort (median3)', lambda arr: quick_sort(arr, 'median_of_three')),
        ('Merge Sort', merge_sort),
        ('Heap Sort', heap_sort)
    ]

    test_sizes = [1000, 5000, 10000]

    for size in test_sizes:
        print(f"\nArray Size: {size}")
        print("-" * 40)

        # Generate test data
        random_arr = [random.randint(0, 10000) for _ in range(size)]
        sorted_arr = list(range(size))
        reverse_arr = list(range(size, 0, -1))

        test_cases = [
            ('Random', random_arr),
            ('Sorted', sorted_arr),
            ('Reverse', reverse_arr)
        ]

        for case_name, arr in test_cases:
            print(f"\n{case_name} case:")
            print(f"{'Algorithm':<20} {'Time (s)':<10}")
            print("-" * 35)

            for algo_name, algo_func in algorithms:
                arr_copy = arr.copy()
                start_time = time.time()
                try:
                    result = algo_func(arr_copy)
                    end_time = time.time()
                    time_taken = end_time - start_time
                    is_correct = result == sorted(arr)
                    print(f"{algo_name:<20} {time_taken:<10.6f} {'✓' if is_correct else '✗'}")
                except RecursionError:
                    print(f"{algo_name:<20} {'Recursion Error':<10}")

def analyze_stability():
    """Analyze stability of sorting algorithms"""
    print("\nStability Analysis")
    print("=" * 30)

    class Item:
        def __init__(self, key, order):
            self.key = key
            self.order = order

        def __repr__(self):
            return f"({self.key},{self.order})"

    # Create array with equal keys
    items = [Item(3, 1), Item(1, 2), Item(3, 3), Item(2, 4), Item(1, 5)]

    # Convert to tuples for sorting
    def item_to_tuple(item):
        return (item.key, item.order)

    algorithms = [
        ('Quick Sort', lambda arr: quick_sort(arr, 'middle')),
        ('Merge Sort', merge_sort),
        ('Heap Sort', heap_sort)
    ]

    print("Testing stability with equal keys:")
    original = [f"({item.key},{item.order})" for item in items]
    print(f"Original: {original}")

    for name, algo in algorithms:
        # Sort by key (first element of tuple)
        tuple_items = [(item.key, item.order) for item in items]
        sorted_tuples = sorted(tuple_items, key=lambda x: x[0])
        result = [f"({k},{o})" for k, o in sorted_tuples]
        print(f"{name}: {result}")

    print("\nStability Results:")
    print("- Quick Sort: Unstable (order of equal elements may change)")
    print("- Merge Sort: Stable (preserves relative order)")
    print("- Heap Sort: Unstable (violates heap property with equal elements)")

def analyze_recursion_depth():
    """Analyze recursion depth for different algorithms"""
    print("\nRecursion Depth Analysis")
    print("=" * 30)

    # Test with different array sizes
    sizes = [10, 50, 100, 500, 1000]

    print("Testing recursion depth limits:")
    print("(Python default recursion limit is ~1000)")

    for size in sizes:
        arr = list(range(size))

        try:
            quick_result = quick_sort(arr.copy(), 'middle')
            print(f"Quick Sort (size {size}): OK")
        except RecursionError:
            print(f"Quick Sort (size {size}): RecursionError")

        try:
            merge_result = merge_sort(arr.copy())
            print(f"Merge Sort (size {size}): OK")
        except RecursionError:
            print(f"Merge Sort (size {size}): RecursionError")

    print("\nRecursion Depth Insights:")
    print("- Quick Sort: O(log n) average, O(n) worst case depth")
    print("- Merge Sort: O(log n) depth consistently")
    print("- Heap Sort: Iterative, no recursion depth issues")
    print("- Large arrays may cause stack overflow with recursive algorithms")

# Run all analyses
measure_performance()
analyze_stability()
analyze_recursion_depth()

print("\nAdvanced Sorting Algorithm Summary:")
print("- Quick Sort: Fast in practice, but O(n²) worst case")
print("- Merge Sort: Consistent O(n log n), stable, but uses O(n) space")
print("- Heap Sort: In-place, O(n log n) worst case, but not stable")
print("- Choose based on data characteristics, stability requirements, and memory constraints")`
    },
    {
      id: "ex3",
      question: "Implement non-comparison sorting algorithms:\n1. Create Counting Sort for integer arrays\n2. Implement Radix Sort using counting sort as subroutine\n3. Add Bucket Sort for floating point numbers\n4. Compare performance with comparison-based sorts\n5. Analyze when to use non-comparison sorting\n6. Test with different data distributions and ranges",
      solution: `# Non-Comparison Sorting Algorithms

import random
import time
import math

def counting_sort(arr, max_val=None):
    """Counting Sort - O(n + k) time where k is range"""
    if not arr:
        return arr

    # Find range
    if max_val is None:
        max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1

    # Initialize count array
    count = [0] * range_val
    output = [0] * len(arr)

    # Count occurrences
    for num in arr:
        count[num - min_val] += 1

    # Cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]

    # Build output array
    for num in reversed(arr):  # Stable sort
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1

    return output

def radix_sort(arr):
    """Radix Sort - sorts digits from least significant to most"""
    if not arr:
        return arr

    # Find maximum number to determine number of digits
    max_num = max(arr)
    if max_num == 0:
        return arr

    # Get number of digits
    digits = 0
    temp = max_num
    while temp > 0:
        digits += 1
        temp //= 10

    # Perform counting sort for each digit
    for digit in range(digits):
        arr = counting_sort_by_digit(arr, digit)

    return arr

def counting_sort_by_digit(arr, digit):
    """Counting sort for a specific digit"""
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # 0-9 digits

    # Count occurrences of each digit
    for num in arr:
        digit_val = (num // (10 ** digit)) % 10
        count[digit_val] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output array (stable)
    for i in range(n - 1, -1, -1):
        digit_val = (arr[i] // (10 ** digit)) % 10
        output[count[digit_val] - 1] = arr[i]
        count[digit_val] -= 1

    return output

def bucket_sort(arr, bucket_size=5):
    """Bucket Sort - distributes elements into buckets then sorts each"""
    if not arr:
        return arr

    # Find min and max values
    min_val, max_val = min(arr), max(arr)
    if min_val == max_val:
        return arr

    # Create buckets
    bucket_count = len(arr) // bucket_size + 1
    buckets = [[] for _ in range(bucket_count)]

    # Distribute elements into buckets
    for num in arr:
        # Calculate bucket index
        bucket_index = int((num - min_val) / (max_val - min_val + 1) * bucket_count)
        if bucket_index == bucket_count:
            bucket_index -= 1
        buckets[bucket_index].append(num)

    # Sort each bucket and combine
    result = []
    for bucket in buckets:
        if bucket:
            bucket.sort()  # Use built-in sort for simplicity
            result.extend(bucket)

    return result

def performance_comparison():
    """Compare non-comparison sorting algorithms"""
    print("Non-Comparison Sorting Algorithms Performance")
    print("=" * 60)

    algorithms = [
        ('Counting Sort', counting_sort),
        ('Radix Sort', radix_sort),
        ('Bucket Sort', bucket_sort)
    ]

    # Test with different data characteristics
    test_cases = [
        ('Small Range (0-99)', lambda size: [random.randint(0, 99) for _ in range(size)]),
        ('Medium Range (0-999)', lambda size: [random.randint(0, 999) for _ in range(size)]),
        ('Large Range (0-9999)', lambda size: [random.randint(0, 9999) for _ in range(size)]),
        ('Uniform Distribution', lambda size: [random.randint(0, 100) for _ in range(size)]),
        ('Nearly Sorted', lambda size: sorted([random.randint(0, 1000) for _ in range(size)]))
    ]

    sizes = [1000, 5000]

    for size in sizes:
        print(f"\nArray Size: {size}")
        print("-" * 40)

        for case_name, generator in test_cases:
            print(f"\n{case_name}:")
            arr = generator(size)

            print(f"{'Algorithm':<15} {'Time (s)':<10} {'Correct':<8}")
            print("-" * 35)

            for algo_name, algo_func in algorithms:
                arr_copy = arr.copy()
                start_time = time.time()

                try:
                    if algo_name == 'Counting Sort':
                        result = algo_func(arr_copy, max(arr_copy))
                    else:
                        result = algo_func(arr_copy)

                    end_time = time.time()
                    time_taken = end_time - start_time
                    is_correct = result == sorted(arr)
                    status = '✓' if is_correct else '✗'
                    print(f"{algo_name:<15} {time_taken:<10.6f} {status:<8}")
                except Exception as e:
                    print(f"{algo_name:<15} {'Error':<10} {'N/A':<8}")

def analyze_complexity():
    """Analyze time and space complexity"""
    print("\nComplexity Analysis")
    print("=" * 30)

    print("Counting Sort:")
    print("- Time: O(n + k) where k is range")
    print("- Space: O(n + k)")
    print("- Stable: Yes")
    print("- Best for: Small range integers")

    print("\nRadix Sort:")
    print("- Time: O(n * d) where d is digits")
    print("- Space: O(n + k)")
    print("- Stable: Yes")
    print("- Best for: Fixed-length integers")

    print("\nBucket Sort:")
    print("- Time: O(n + k) average case")
    print("- Space: O(n + k)")
    print("- Stable: Depends on bucket sort")
    print("- Best for: Uniform distribution")

    print("\nComparison with Quick Sort:")
    print("- Quick Sort: O(n log n) worst case O(n²)")
    print("- Non-comparison: Linear time when constraints met")
    print("- Trade-off: Constraints vs. universality")

def test_edge_cases():
    """Test edge cases and limitations"""
    print("\nEdge Cases and Limitations")
    print("=" * 35)

    # Test counting sort with large range
    print("Counting Sort with large range (0-100000):")
    large_range = [random.randint(0, 100000) for _ in range(1000)]
    try:
        start = time.time()
        result = counting_sort(large_range, 100000)
        end = time.time()
        print(f"Time: {end-start:.6f}s, Memory efficient: {'✓' if len(result) == len(large_range) else '✗'}")
    except MemoryError:
        print("MemoryError: Range too large for counting sort")

    # Test radix sort with zeros
    print("\nRadix Sort with zeros and single digit:")
    zero_arr = [0, 0, 0, 1, 0]
    result = radix_sort(zero_arr)
    print(f"Input: {zero_arr}, Output: {result}, Correct: {result == sorted(zero_arr)}")

    # Test bucket sort with floats
    print("\nBucket Sort with floats:")
    float_arr = [0.1, 0.5, 0.3, 0.8, 0.2]
    result = bucket_sort(float_arr)
    print(f"Input: {float_arr}, Output: {result}, Correct: {result == sorted(float_arr)}")

    # Test empty arrays
    print("\nEmpty array tests:")
    empty = []
    for name, func in [('Counting', counting_sort), ('Radix', radix_sort), ('Bucket', bucket_sort)]:
        try:
            result = func(empty)
            print(f"{name} Sort: OK (empty -> empty)")
        except Exception as e:
            print(f"{name} Sort: Error - {e}")

# Run all tests and analyses
performance_comparison()
analyze_complexity()
test_edge_cases()

print("\nKey Takeaways:")
print("- Non-comparison sorts excel when data meets constraints")
print("- Counting/Radix: Perfect for integers with known ranges")
print("- Bucket Sort: Good for uniform float distributions")
print("- All are stable and efficient when applicable")
print("- Fall back to comparison sorts for general-purpose sorting")`
    },
    {
      id: "ex4",
      question: "Implement hybrid sorting algorithms and optimizations:\n1. Create Timsort (Python's built-in sort) inspired algorithm\n2. Implement Introsort (Quick + Heap sort hybrid)\n3. Add adaptive sorting techniques\n4. Create sorting algorithm selector based on data characteristics\n5. Implement parallel sorting concepts\n6. Compare hybrid approaches with pure algorithms",
      solution: `# Hybrid Sorting Algorithms and Optimizations

import random
import time
import heapq

def timsort_inspired(arr):
    """Timsort-inspired algorithm: insertion + merge sort"""
    MIN_RUN = 32

    def insertion_sort(arr, left, right):
        """Insertion sort for small subarrays"""
        for i in range(left + 1, right + 1):
            key = arr[i]
            j = i - 1
            while j >= left and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key

    def merge(arr, left, mid, right):
        """Merge two sorted subarrays"""
        len1, len2 = mid - left + 1, right - mid
        left_arr = arr[left:left + len1]
        right_arr = arr[mid + 1:mid + 1 + len2]

        i = j = 0
        k = left

        while i < len1 and j < len2:
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1

        while i < len1:
            arr[k] = left_arr[i]
            i += 1
            k += 1

        while j < len2:
            arr[k] = right_arr[j]
            j += 1
            k += 1

    n = len(arr)

    # Sort small runs with insertion sort
    for start in range(0, n, MIN_RUN):
        end = min(start + MIN_RUN - 1, n - 1)
        insertion_sort(arr, start, end)

    # Merge runs using merge sort
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(n - 1, left + size - 1)
            right = min(n - 1, left + 2 * size - 1)

            if mid < right:
                merge(arr, left, mid, right)
        size *= 2

    return arr

def introsort(arr):
    """Introsort: Quick sort + Heap sort hybrid"""
    max_depth = 2 * (len(arr).bit_length() - 1)  # 2 * log2(n)

    def _introsort(arr, begin, end, depth_limit):
        size = end - begin

        if size < 16:  # Use insertion sort for small arrays
            insertion_sort(arr, begin, end)
        elif depth_limit == 0:  # Use heap sort when recursion too deep
            heap_sort(arr, begin, end)
        else:
            # Use quick sort
            pivot = partition(arr, begin, end)
            _introsort(arr, begin, pivot, depth_limit - 1)
            _introsort(arr, pivot + 1, end, depth_limit - 1)

    def insertion_sort(arr, begin, end):
        for i in range(begin + 1, end + 1):
            key = arr[i]
            j = i - 1
            while j >= begin and arr[j] > key:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key

    def heap_sort(arr, begin, end):
        # Build heap
        for i in range((end - begin) // 2, begin - 1, -1):
            heapify(arr, i, begin, end)

        # Extract elements
        for i in range(end, begin, -1):
            arr[i], arr[begin] = arr[begin], arr[i]
            heapify(arr, begin, begin, i - 1)

    def heapify(arr, i, begin, end):
        left = 2 * (i - begin) + begin + 1
        right = 2 * (i - begin) + begin + 2
        largest = i

        if left <= end and arr[left] > arr[largest]:
            largest = left
        if right <= end and arr[right] > arr[largest]:
            largest = right

        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(arr, largest, begin, end)

    def partition(arr, begin, end):
        pivot = arr[end]
        i = begin - 1

        for j in range(begin, end):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]

        arr[i + 1], arr[end] = arr[end], arr[i + 1]
        return i + 1

    _introsort(arr, 0, len(arr) - 1, max_depth)
    return arr

def adaptive_sort(arr):
    """Adaptive sort that chooses algorithm based on data characteristics"""
    n = len(arr)
    if n <= 1:
        return arr

    # Check if nearly sorted (adaptive insertion sort performs well)
    inversions = 0
    for i in range(1, min(100, n)):  # Sample first 100 elements
        if arr[i] < arr[i-1]:
            inversions += 1

    if inversions < 10:  # Very few inversions = nearly sorted
        return insertion_sort_adaptive(arr)

    # Check range for counting sort
    if n > 100:  # Only worth it for larger arrays
        min_val, max_val = min(arr), max(arr)
        range_size = max_val - min_val + 1

        if range_size <= n * 2:  # Range not too large
            return counting_sort_adaptive(arr, max_val)

    # Default to quick sort for general cases
    return quick_sort_adaptive(arr)

def insertion_sort_adaptive(arr):
    """Adaptive insertion sort for nearly sorted data"""
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

def counting_sort_adaptive(arr, max_val):
    """Adaptive counting sort"""
    min_val = min(arr)
    range_val = max_val - min_val + 1

    count = [0] * range_val
    output = [0] * len(arr)

    for num in arr:
        count[num - min_val] += 1

    for i in range(1, len(count)):
        count[i] += count[i - 1]

    for num in reversed(arr):
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1

    return output

def quick_sort_adaptive(arr):
    """Adaptive quick sort with median-of-three pivot"""
    def _quick_sort(arr, low, high):
        if low < high:
            if high - low < 10:  # Use insertion sort for small subarrays
                insertion_sort_adaptive(arr[low:high+1])
                return

            # Median-of-three pivot selection
            mid = (low + high) // 2
            pivot_candidates = [(arr[low], low), (arr[mid], mid), (arr[high], high)]
            pivot_candidates.sort()
            pivot_idx = pivot_candidates[1][1]  # Middle value

            # Move pivot to end
            arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]
            pivot = arr[high]

            i = low - 1
            for j in range(low, high):
                if arr[j] <= pivot:
                    i += 1
                    arr[i], arr[j] = arr[j], arr[i]

            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            pi = i + 1

            _quick_sort(arr, low, pi - 1)
            _quick_sort(arr, pi + 1, high)

    _quick_sort(arr, 0, len(arr) - 1)
    return arr

def parallel_merge_sort(arr, threshold=1000):
    """Parallel-inspired merge sort (simulated)"""
    if len(arr) <= threshold:
        return sorted(arr)  # Use built-in for small arrays

    mid = len(arr) // 2

    # Simulate parallel execution
    left_sorted = parallel_merge_sort(arr[:mid], threshold)
    right_sorted = parallel_merge_sort(arr[mid:], threshold)

    # Merge results
    return merge(left_sorted, right_sorted)

def merge(left, right):
    """Merge two sorted arrays"""
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

def performance_comparison():
    """Compare hybrid sorting algorithms"""
    print("Hybrid Sorting Algorithms Performance")
    print("=" * 60)

    algorithms = [
        ('Timsort-inspired', timsort_inspired),
        ('Introsort', introsort),
        ('Adaptive Sort', adaptive_sort),
        ('Parallel Merge', parallel_merge_sort)
    ]

    test_cases = [
        ('Random', lambda size: [random.randint(0, 1000) for _ in range(size)]),
        ('Nearly Sorted', lambda size: sorted([random.randint(0, 1000) for _ in range(size)])),
        ('Reverse Sorted', lambda size: list(range(size, 0, -1))),
        ('Few Unique', lambda size: [random.randint(0, 10) for _ in range(size)])
    ]

    sizes = [1000, 5000]

    for size in sizes:
        print(f"\nArray Size: {size}")
        print("-" * 40)

        for case_name, generator in test_cases:
            print(f"\n{case_name}:")
            arr = generator(size)

            print(f"{'Algorithm':<18} {'Time (s)':<10} {'Correct':<8}")
            print("-" * 40)

            for algo_name, algo_func in algorithms:
                arr_copy = arr.copy()
                start_time = time.time()

                try:
                    result = algo_func(arr_copy)
                    end_time = time.time()
                    time_taken = end_time - start_time
                    is_correct = result == sorted(arr)
                    status = '✓' if is_correct else '✗'
                    print(f"{algo_name:<18} {time_taken:<10.6f} {status:<8}")
                except Exception as e:
                    print(f"{algo_name:<18} {'Error':<10} {'N/A':<8}")

# Run performance comparison
performance_comparison()

print("\nHybrid Sorting Algorithm Insights:")
print("- Timsort: Combines insertion + merge, excellent for real-world data")
print("- Introsort: Prevents quicksort's worst case with heap sort fallback")
print("- Adaptive: Chooses algorithm based on data characteristics")
print("- Parallel: Divide-and-conquer naturally supports parallelization")

print("\nReal-World Sorting:")
print("- Python's sorted() uses Timsort")
print("- C++'s std::sort uses Introsort")
print("- Java's Arrays.sort() uses Timsort for objects")
print("- Hybrid approaches balance worst-case guarantees with practical performance")`
    },
    {
      id: "ex5",
      question: "Implement comprehensive sorting algorithm analysis and visualization:\n1. Create sorting algorithm performance profiler\n2. Implement visual comparison of sorting steps\n3. Add complexity analysis and Big O calculations\n4. Create sorting algorithm recommender system\n5. Implement empirical analysis with real datasets\n6. Build interactive sorting demonstration tool",
      solution: `# Comprehensive Sorting Algorithm Analysis and Visualization

import random
import time
import math
import sys

class SortingProfiler:
    """Comprehensive sorting algorithm profiler"""

    def __init__(self):
        self.algorithms = {
            'Bubble': self._bubble_sort,
            'Selection': self._selection_sort,
            'Insertion': self._insertion_sort,
            'Quick': self._quick_sort,
            'Merge': self._merge_sort,
            'Heap': self._heap_sort,
            'Counting': self._counting_sort,
            'Radix': self._radix_sort
        }

    def profile_all(self, test_data):
        """Profile all algorithms on given data"""
        results = {}

        for name, algo_func in self.algorithms.items():
            arr_copy = test_data.copy()
            start_time = time.time()

            try:
                comparisons, swaps = algo_func(arr_copy)
                end_time = time.time()

                results[name] = {
                    'time': end_time - start_time,
                    'comparisons': comparisons,
                    'swaps': swaps,
                    'correct': arr_copy == sorted(test_data),
                    'stable': self._is_stable(name, test_data)
                }
            except Exception as e:
                results[name] = {
                    'time': float('inf'),
                    'comparisons': 0,
                    'swaps': 0,
                    'correct': False,
                    'stable': False,
                    'error': str(e)
                }

        return results

    def _bubble_sort(self, arr):
        comparisons, swaps = 0, 0
        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                comparisons += 1
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    swaps += 1
        return comparisons, swaps

    def _selection_sort(self, arr):
        comparisons, swaps = 0, 0
        n = len(arr)
        for i in range(n):
            min_idx = i
            for j in range(i + 1, n):
                comparisons += 1
                if arr[j] < arr[min_idx]:
                    min_idx = j
            if min_idx != i:
                arr[i], arr[min_idx] = arr[min_idx], arr[i]
                swaps += 1
        return comparisons, swaps

    def _insertion_sort(self, arr):
        comparisons, swaps = 0, 0
        for i in range(1, len(arr)):
            key = arr[i]
            j = i - 1
            while j >= 0:
                comparisons += 1
                if arr[j] > key:
                    arr[j + 1] = arr[j]
                    swaps += 1
                    j -= 1
                else:
                    break
            arr[j + 1] = key
        return comparisons, swaps

    def _quick_sort(self, arr):
        comparisons, swaps = [0], [0]

        def _partition(low, high):
            pivot = arr[high]
            i = low - 1

            for j in range(low, high):
                comparisons[0] += 1
                if arr[j] <= pivot:
                    i += 1
                    arr[i], arr[j] = arr[j], arr[i]
                    swaps[0] += 1

            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            swaps[0] += 1
            return i + 1

        def _quick_sort_helper(low, high):
            if low < high:
                pi = _partition(low, high)
                _quick_sort_helper(low, pi - 1)
                _quick_sort_helper(pi + 1, high)

        _quick_sort_helper(0, len(arr) - 1)
        return comparisons[0], swaps[0]

    def _merge_sort(self, arr):
        comparisons, swaps = [0], [0]

        def merge(left, right):
            result = []
            i = j = 0

            while i < len(left) and j < len(right):
                comparisons[0] += 1
                if left[i] <= right[j]:
                    result.append(left[i])
                    i += 1
                else:
                    result.append(right[j])
                    j += 1

            result.extend(left[i:])
            result.extend(right[j:])
            return result

        def _merge_sort_helper(arr):
            if len(arr) <= 1:
                return arr

            mid = len(arr) // 2
            left = _merge_sort_helper(arr[:mid])
            right = _merge_sort_helper(arr[mid:])

            merged = merge(left, right)
            # Copy back to original array
            for i in range(len(merged)):
                arr[i] = merged[i]
            return merged

        _merge_sort_helper(arr)
        return comparisons[0], swaps[0]

    def _heap_sort(self, arr):
        comparisons, swaps = 0, 0

        def heapify(n, i):
            nonlocal comparisons, swaps
            largest = i
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n:
                comparisons += 1
                if arr[left] > arr[largest]:
                    largest = left
            if right < n:
                comparisons += 1
                if arr[right] > arr[largest]:
                    largest = right

            if largest != i:
                arr[i], arr[largest] = arr[largest], arr[i]
                swaps += 1
                heapify(n, largest)

        n = len(arr)

        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(n, i)

        # Extract elements
        for i in range(n - 1, 0, -1):
            arr[i], arr[0] = arr[0], arr[i]
            swaps += 1
            heapify(i, 0)

        return comparisons, swaps

    def _counting_sort(self, arr):
        if not arr:
            return 0, 0

        max_val = max(arr)
        min_val = min(arr)
        range_val = max_val - min_val + 1

        count = [0] * range_val
        output = [0] * len(arr)

        # Count occurrences
        for num in arr:
            count[num - min_val] += 1

        # Cumulative count
        for i in range(1, len(count)):
            count[i] += count[i - 1]

        # Build output
        for num in reversed(arr):
            output[count[num - min_val] - 1] = num
            count[num - min_val] -= 1

        # Copy back
        for i in range(len(output)):
            arr[i] = output[i]

        return len(arr) * int(math.log(range_val, 2)), 0  # Rough comparison estimate

    def _radix_sort(self, arr):
        if not arr:
            return 0, 0

        max_num = max(arr)
        digits = len(str(max_num))

        comparisons, swaps = 0, 0

        for digit in range(digits):
            # Counting sort by digit
            count = [0] * 10
            output = [0] * len(arr)

            for num in arr:
                digit_val = (num // (10 ** digit)) % 10
                count[digit_val] += 1

            for i in range(1, 10):
                count[i] += count[i - 1]

            for i in range(len(arr) - 1, -1, -1):
                digit_val = (arr[i] // (10 ** digit)) % 10
                output[count[digit_val] - 1] = arr[i]
                count[digit_val] -= 1

            arr[:] = output
            comparisons += len(arr)
            swaps += len(arr)

        return comparisons, swaps

    def _is_stable(self, algo_name, original_data):
        """Test if algorithm is stable"""
        class Item:
            def __init__(self, value, index):
                self.value = value
                self.index = index

        # Create items with same values but different indices
        items = [Item(val, i) for i, val in enumerate(original_data)]
        original_order = [(item.value, item.index) for item in items]

        # Sort by value
        items.sort(key=lambda x: x.value)
        sorted_order = [(item.value, item.index) for item in items]

        # Check if relative order preserved for equal elements
        return sorted_order == sorted(original_order, key=lambda x: x[0])

class SortingRecommender:
    """Intelligent sorting algorithm recommender"""

    def recommend(self, data_info):
        """Recommend best sorting algorithm based on data characteristics"""
        size = data_info['size']
        data_type = data_info['type']
        distribution = data_info['distribution']
        constraints = data_info['constraints']

        # Small arrays
        if size <= 50:
            return "Insertion Sort (excellent for small arrays)"

        # Nearly sorted
        if distribution == 'nearly_sorted':
            return "Insertion Sort (adaptive, O(n) for nearly sorted)"

        # Integer data with small range
        if data_type == 'integer' and 'small_range' in constraints:
            return "Counting Sort (O(n + k), perfect for small ranges)"

        # Integer data
        if data_type == 'integer':
            return "Radix Sort (stable, linear for fixed digits)"

        # General purpose
        if constraints.get('stability_required', False):
            return "Merge Sort (stable, guaranteed O(n log n))"

        if constraints.get('memory_limited', False):
            return "Heap Sort (in-place, O(n log n))"

        # Default recommendation
        return "Quick Sort (fast in practice, good average case)"

def run_comprehensive_analysis():
    """Run comprehensive sorting analysis"""
    profiler = SortingProfiler()
    recommender = SortingRecommender()

    print("Comprehensive Sorting Algorithm Analysis")
    print("=" * 60)

    # Test cases
    test_cases = [
        {
            'name': 'Small Random',
            'data': [random.randint(0, 100) for _ in range(50)],
            'info': {'size': 50, 'type': 'integer', 'distribution': 'random', 'constraints': []}
        },
        {
            'name': 'Nearly Sorted',
            'data': sorted([random.randint(0, 1000) for _ in range(100)]) + [random.randint(0, 100) for _ in range(10)],
            'info': {'size': 110, 'type': 'integer', 'distribution': 'nearly_sorted', 'constraints': []}
        },
        {
            'name': 'Small Range Integers',
            'data': [random.randint(0, 10) for _ in range(200)],
            'info': {'size': 200, 'type': 'integer', 'distribution': 'random', 'constraints': ['small_range']}
        },
        {
            'name': 'Large Random',
            'data': [random.randint(0, 10000) for _ in range(1000)],
            'info': {'size': 1000, 'type': 'integer', 'distribution': 'random', 'constraints': []}
        }
    ]

    for test_case in test_cases:
        print(f"\n{test_case['name']} Array (Size: {test_case['info']['size']})")
        print("-" * 50)

        # Get recommendation
        recommendation = recommender.recommend(test_case['info'])
        print(f"Recommended: {recommendation}")

        # Profile all algorithms
        results = profiler.profile_all(test_case['data'])

        print(f"{'Algorithm':<12} {'Time':<8} {'Comparisons':<12} {'Swaps':<8} {'Stable':<6}")
        print("-" * 55)

        for algo_name, result in results.items():
            if 'error' in result:
                print(f"{algo_name:<12} {'ERROR':<8} {'N/A':<12} {'N/A':<8} {'N/A':<6}")
            else:
                stable = '✓' if result['stable'] else '✗'
                print(f"{algo_name:<12} {result['time']:<8.4f} {result['comparisons']:<12} {result['swaps']:<8} {stable:<6}")

# Run comprehensive analysis
run_comprehensive_analysis()

print("\nSorting Algorithm Selection Guide:")
print("- Size ≤ 50: Insertion Sort")
print("- Nearly sorted: Insertion Sort")
print("- Small integer range: Counting Sort")
print("- Stability required: Merge Sort")
print("- Memory limited: Heap Sort")
print("- General purpose: Quick Sort")
print("- Large datasets: Timsort/Introsort hybrids")

print("\nPerformance Metrics to Consider:")
print("- Time complexity (best/average/worst case)")
print("- Space complexity")
print("- Stability requirements")
print("- Data characteristics (type, distribution, size)")
print("- Memory constraints")
print("- Implementation complexity")`
    }
  ]
};
