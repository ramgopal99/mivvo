import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_1: SubLesson = {
  id: "5.1",
  title: 'What are Sets?',
  status: 'demo',
  content: `# 🎲 What are Python Sets?

Sets are **unordered collections of unique items**. Think of them as mathematical sets with special properties!

---

## 🎯 What is a Set?

A **set** is a collection that:
- **Unordered** - No specific order, no indices
- **Unique** - No duplicate items allowed
- **Mutable** - Can add/remove items
- **Unindexed** - Cannot access by position

\`\`\`python
# A simple set of unique numbers
numbers = {1, 2, 3, 4, 5}
print(numbers)  # {1, 2, 3, 4, 5} (order may vary)

# Set automatically removes duplicates
duplicates = {1, 2, 2, 3, 3, 3}
print(duplicates)  # {1, 2, 3}
\`\`\`

---

## 🔍 Key Characteristics

### **No Duplicates Allowed**
\`\`\`python
fruits = {"apple", "banana", "apple", "orange", "banana"}
print(fruits)  # {'orange', 'banana', 'apple'} (duplicates removed)
\`\`\`

### **Unordered (No Indices)**
\`\`\`python
colors = {"red", "green", "blue"}
print(colors)  # Order may vary: {'blue', 'red', 'green'}

# This doesn't work - no indexing!
# print(colors[0])  # TypeError!
\`\`\`

### **Mutable (Can Change)**
\`\`\`python
numbers = {1, 2, 3}
print(f"Original: {numbers}")

numbers.add(4)
print(f"After add: {numbers}")  # {1, 2, 3, 4}

numbers.remove(2)
print(f"After remove: {numbers}")  # {1, 3, 4}
\`\`\`

---

## 📊 Set vs Other Collections

| Feature | List | Tuple | Set |
|---------|------|-------|-----|
| Ordered | ✅ | ✅ | ❌ |
| Indexed | ✅ | ✅ | ❌ |
| Mutable | ✅ | ❌ | ✅ |
| Duplicates | ✅ | ✅ | ❌ |
| Fast lookup | ❌ | ❌ | ✅ |

---

## 🎨 Real-World Examples

\`\`\`python
# Unique email addresses
emails = {"user1@email.com", "user2@email.com", "user1@email.com"}
print(emails)  # {'user2@email.com', 'user1@email.com'}

# Unique tags/categories
tags = {"python", "programming", "tutorial", "python", "coding"}
print(tags)  # {'python', 'programming', 'tutorial', 'coding'}

# Unique student IDs
student_ids = {101, 102, 103, 101, 104}
print(student_ids)  # {101, 102, 103, 104}

# Mathematical operations
prime_numbers = {2, 3, 5, 7, 11}
even_numbers = {2, 4, 6, 8, 10}
\`\`\`

---

## 🚀 Why Sets Are Useful

### **Automatic Deduplication**
\`\`\`python
# Remove duplicates from a list
my_list = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
unique_items = list(set(my_list))
print(unique_items)  # [1, 2, 3, 4]
\`\`\`

### **Fast Membership Testing**
\`\`\`python
large_set = set(range(100000))
print(50000 in large_set)  # Very fast!

large_list = list(range(100000))
print(50000 in large_list)  # Slower!
\`\`\`

Sets are perfect for unique collections and fast lookups! ⚡`
};

