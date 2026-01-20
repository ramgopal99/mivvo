import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_6: SubLesson = {
  id: "3.6",
  title: 'Simple List Operations',
  status: 'demo',
  content: "`# ðŸ”§ Simple List Operations

Let's explore some common operations you can perform on lists!

---

## ðŸ” Check if Item Exists

### **Using 'in' Operator**
\`"\`\`python
fruits = ["apple", "banana", "orange"]

# Check if item is in list
print("apple" in fruits)    # True
print("grape" in fruits)    # False

# Check if NOT in list
print("grape" not in fruits)  # True
\`\`\`

---

## ðŸ”¢ Count Items

### **Count Occurrences**
\`\`\`python
numbers = [1, 2, 2, 3, 2, 4]
print(numbers.count(2))  # 3 (appears 3 times)
print(numbers.count(5))  # 0 (not found)
\`\`\`

---

## ðŸ“ Find Position

### **Index Method**
\`\`\`python
fruits = ["apple", "banana", "orange", "banana"]
print(fruits.index("banana"))  # 1 (first occurrence)
print(fruits.index("orange"))  # 2
\`\`\`

---

## ðŸ”„ Reverse List

### **Reverse Method**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
print(f"Original: {numbers}")

numbers.reverse()
print(f"Reversed: {numbers}")  # [5, 4, 3, 2, 1]
\`\`\`

### **Reverse with Slicing**
\`\`\`python
numbers = [1, 2, 3, 4, 5]
reversed_list = numbers[::-1]
print(f"Original: {numbers}")      # [1, 2, 3, 4, 5]
print(f"Reversed: {reversed_list}") # [5, 4, 3, 2, 1]

# Doesn't modify original list
print(f"Original unchanged: {numbers}")  # [1, 2, 3, 4, 5]
\`\`\`

---

## ðŸ“Š Sort List

### **Sort Method**
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2]
print(f"Original: {numbers}")

numbers.sort()
print(f"Sorted: {numbers}")  # [1, 1, 2, 3, 4, 5, 9]
\`\`\`

### **Sort Strings**
\`\`\`python
words = ["zebra", "apple", "banana"]
print(f"Original: {words}")

words.sort()
print(f"Sorted: {words}")  # ['apple', 'banana', 'zebra']
\`\`\`

---

## ðŸ”„ Copy List

### **Copy Method**
\`\`\`python
original = [1, 2, 3]
copy_list = original.copy()

copy_list.append(4)
print(f"Original: {original}")  # [1, 2, 3]
print(f"Copy: {copy_list}")     # [1, 2, 3, 4]
\`\`\`

---

## âœ‚ï¸ List Slicing

### **Slicing Template**
\`\`\`python
# list[start:end:step]
# start: where to begin (default 0)
# end: where to stop (not including this index)
# step: how many to skip (default 1)

my_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### **Get Last Element**
\`\`\`python
numbers = [10, 20, 30, 40, 50]

# Get last element as a list
last_item = numbers[-1:]
print(last_item)  # [50]

# Compare with just [-1]
print(numbers[-1])   # 50 (single element)
print(numbers[-1:])  # [50] (list with one element)
\`\`\`

### **Common Slicing Patterns**
\`\`\`python
fruits = ["apple", "banana", "orange", "grape", "kiwi"]

# Get last two items
print(fruits[-2:])   # ['grape', 'kiwi']

# Get first three items
print(fruits[:3])    # ['apple', 'banana', 'orange']

# Get middle items
print(fruits[1:4])   # ['banana', 'orange', 'grape']

# Get every other item
print(fruits[::2])   # ['apple', 'orange', 'kiwi']
\`\`\`

---

## ðŸŽ¨ Practical Examples

\`\`\`python
# Student grades system
grades = [85, 92, 78, 96, 88, 92]

# Check if student passed
passed = 85 in grades
print(f"85 in grades: {passed}")

# Count how many got 92
count_92 = grades.count(92)
print(f"Students with 92: {count_92}")

# Find position of first 78
position = grades.index(78)
print(f"78 is at position: {position}")

# Sort grades
grades.sort()
print(f"Sorted grades: {grades}")

# Reverse the order
grades.reverse()
print(f"Reversed: {grades}")
\`\`\`

Lists have many useful operations - experiment with them! ðŸ§®`
};


