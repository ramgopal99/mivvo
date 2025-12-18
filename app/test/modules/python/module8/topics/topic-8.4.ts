import { SubLesson } from '../../../data/lessonsData';

export const topic_8_4: SubLesson = {
  id: 8.4,
  title: 'Sequence Functions',
  status: 'demo',
  content: `# 📋 Sequence Functions

Functions that work with lists, tuples, strings, and other sequence types!

---

## 🎯 Core Sequence Functions

### **len() - Get Length**
\`\`\`python
print(len("hello"))    # 5
print(len([1, 2, 3]))  # 3
print(len((1, 2)))     # 2
print(len({1, 2, 3}))  # 3
print(len({"a": 1}))   # 1 (keys only)

# Check if empty
def is_empty(sequence):
    return len(sequence) == 0

print(is_empty([]))      # True
print(is_empty("hello")) # False
\`\`\`

### **sorted() - Sort Sequence**
\`\`\`python
numbers = [3, 1, 4, 1, 5]
print(sorted(numbers))        # [1, 1, 3, 4, 5]
print(sorted(numbers, reverse=True))  # [5, 4, 3, 1, 1]

# Sort strings
words = ["apple", "Banana", "cherry"]
print(sorted(words))           # ['Banana', 'apple', 'cherry']
print(sorted(words, key=str.lower))  # ['apple', 'Banana', 'cherry']

# Sort by length
print(sorted(words, key=len))  # ['apple', 'cherry', 'Banana']
\`\`\`

### **reversed() - Reverse Sequence**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(list(reversed(numbers)))  # [5, 4, 3, 2, 1]

text = "hello"
print(''.join(reversed(text)))  # "olleh"

# Range in reverse
print(list(reversed(range(5))))  # [4, 3, 2, 1, 0]
\`\`\`

---

## 🔄 Iterator Functions

### **range() - Create Number Sequences**
\`\`\`python
# Basic range
print(list(range(5)))        # [0, 1, 2, 3, 4]
print(list(range(2, 6)))     # [2, 3, 4, 5]
print(list(range(1, 10, 2))) # [1, 3, 5, 7, 9]

# Negative steps
print(list(range(10, 0, -1))) # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

# Use in loops
for i in range(3):
    print(f"Count: {i}")
\`\`\`

### **enumerate() - Add Indices**
\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Basic enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Start from different number
for index, fruit in enumerate(fruits, start=1):
    print(f"#{index}: {fruit}")

# Get as list of tuples
print(list(enumerate(fruits)))  # [(0, 'apple'), (1, 'banana'), (2, 'cherry')]
\`\`\`

### **zip() - Combine Sequences**
\`\`\`python
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
cities = ["NYC", "LA", "Chicago"]

# Zip together
print(list(zip(names, ages)))        # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
print(list(zip(names, ages, cities))) # [('Alice', 25, 'NYC'), ('Bob', 30, 'LA'), ('Charlie', 35, 'Chicago')]

# Unzip
zipped = list(zip(names, ages))
unzipped_names, unzipped_ages = zip(*zipped)
print(list(unzipped_names))  # ['Alice', 'Bob', 'Charlie']
print(list(unzipped_ages))   # [25, 30, 35]

# Different length sequences
short = [1, 2]
long = [10, 20, 30, 40]
print(list(zip(short, long)))  # [(1, 10), (2, 20)] - stops at shortest
\`\`\`

---

## 🎨 Practical Examples

### **Data Processing Pipeline**
\`\`\`python
# Process student data
students = ["Alice", "Bob", "Charlie", "Diana"]
scores = [85, 92, 78, 96]

# Create student records
student_records = list(zip(students, scores))
print("Student records:", student_records)

# Sort by score (highest first)
sorted_records = sorted(student_records, key=lambda x: x[1], reverse=True)
print("Sorted by score:", sorted_records)

# Get top 3 students
top_3 = sorted_records[:3]
print("Top 3 students:")
for rank, (name, score) in enumerate(top_3, start=1):
    print(f"  {rank}. {name}: {score}")
\`\`\`

### **Matrix Operations**
\`\`\`python
# Simple matrix
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Transpose matrix using zip
transposed = list(zip(*matrix))
print("Original matrix:")
for row in matrix:
    print(row)

print("Transposed matrix:")
for row in transposed:
    print(list(row))

# Get diagonal
diagonal = [matrix[i][i] for i in range(len(matrix))]
print("Diagonal:", diagonal)
\`\`\`

### **Text Analysis**
\`\`\`python
def analyze_text(text):
    """Analyze text using sequence functions."""
    words = text.split()
    word_lengths = [len(word) for word in words]

    return {
        "word_count": len(words),
        "unique_words": len(set(words)),
        "longest_word": max(words, key=len),
        "shortest_word": min(words, key=len),
        "average_word_length": sum(word_lengths) / len(word_lengths),
        "words_by_length": sorted(words, key=len, reverse=True)
    }

text = "The quick brown fox jumps over the lazy dog"
analysis = analyze_text(text)

print("Text Analysis:")
for key, value in analysis.items():
    print(f"  {key}: {value}")
\`\`\`

### **Pagination Helper**
\`\`\`python
def paginate(items, page_size, page_number):
    """Paginate a list of items."""
    total_items = len(items)
    total_pages = (total_items + page_size - 1) // page_size

    start_index = (page_number - 1) * page_size
    end_index = start_index + page_size

    page_items = items[start_index:end_index]

    return {
        "items": page_items,
        "page": page_number,
        "page_size": page_size,
        "total_pages": total_pages,
        "total_items": total_items,
        "has_next": page_number < total_pages,
        "has_previous": page_number > 1
    }

# Test pagination
data = list(range(1, 101))  # 100 items
page_info = paginate(data, page_size=10, page_number=3)

print(f"Page {page_info['page']} of {page_info['total_pages']}")
print(f"Items: {page_info['items']}")
print(f"Has next: {page_info['has_next']}")
print(f"Has previous: {page_info['has_previous']}")
\`\`\`

### **Running Statistics**
\`\`\`python
def running_stats(numbers):
    """Calculate running statistics."""
    running_sum = 0
    running_max = float('-inf')
    running_min = float('inf')

    stats = []
    for i, num in enumerate(numbers, 1):
        running_sum += num
        running_max = max(running_max, num)
        running_min = min(running_min, num)

        stats.append({
            "count": i,
            "current": num,
            "running_sum": running_sum,
            "running_avg": running_sum / i,
            "running_max": running_max,
            "running_min": running_min
        })

    return stats

numbers = [10, 20, 15, 25, 30]
stats = running_stats(numbers)

print("Running Statistics:")
for stat in stats:
    print(f"After {stat['count']} numbers (current: {stat['current']}):")
    print(f"  Sum: {stat['running_sum']}, Avg: {stat['running_avg']:.1f}")
    print(f"  Min: {stat['running_min']}, Max: {stat['running_max']}")
    print()
\`\`\`

---

## ✅ Best Practices

1. **Use len() for emptiness checks** - if len(sequence) == 0 or if not sequence
2. **Prefer sorted() over list.sort()** - When you want a new list
3. **Use enumerate() for indices** - Cleaner than manual index tracking
4. **Zip for parallel iteration** - When processing multiple sequences together
5. **Handle different lengths** - Zip stops at shortest sequence

Sequence functions make data manipulation powerful! 📋`
};
