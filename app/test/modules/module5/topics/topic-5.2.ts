import { SubLesson } from '../../../data/lessonsData';

export const topic_5_2: SubLesson = {
  id: 5.2,
  title: 'Creating Sets',
  status: 'demo',
  content: `# 🆕 Creating Python Sets

Sets can be created in several ways. Let's explore all the methods!

---

## 🎯 Basic Set Creation

### **Using Curly Braces {}**
\`\`\`python
# Empty set (can't use {} - that's a dict!)
empty_set = set()
print(empty_set)    # set()
print(type(empty_set))  # <class 'set'>

# Set with items
fruits = {"apple", "banana", "orange"}
print(fruits)  # {'orange', 'banana', 'apple'}

# Duplicates are automatically removed
numbers = {1, 2, 2, 3, 3, 3}
print(numbers)  # {1, 2, 3}
\`\`\`

---

## 🔧 Using the set() Function

### **From Other Collections**
\`\`\`python
# From a list
my_list = [1, 2, 2, 3, 4, 4, 5]
my_set = set(my_list)
print(my_set)  # {1, 2, 3, 4, 5} (duplicates removed!)

# From a tuple
my_tuple = (1, 2, 3, 1, 2)
my_set = set(my_tuple)
print(my_set)  # {1, 2, 3}

# From a string
word = "hello"
letters = set(word)
print(letters)  # {'l', 'o', 'e', 'h'} (unique letters)
\`\`\`

---

## 📝 Set Comprehension

### **Create Sets with Conditions**
\`\`\`python
# Basic set comprehension
squares = {x**2 for x in range(1, 6)}
print(squares)  # {1, 4, 9, 16, 25}

# With condition
even_squares = {x**2 for x in range(1, 11) if x**2 % 2 == 0}
print(even_squares)  # {4, 16, 36, 64, 100}

# String processing
word_lengths = {len(word) for word in ["cat", "dog", "elephant", "ant"]}
print(word_lengths)  # {3, 5, 8}
\`\`\`

---

## 🔄 Creating Special Sets

### **Range and Other Iterables**
\`\`\`python
# From range
numbers = set(range(1, 11))
print(numbers)  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

# From string characters
chars = set("programming")
print(chars)  # {'g', 'r', 'o', 'm', 'i', 'n', 'p', 'a'}

# Mathematical sets
primes = {2, 3, 5, 7, 11, 13}
fibonacci = {1, 1, 2, 3, 5, 8, 13}
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Remove duplicates from user input
user_input = ["apple", "banana", "apple", "cherry", "banana"]
unique_fruits = set(user_input)
print(f"Original: {user_input}")
print(f"Unique: {unique_fruits}")

# Get unique characters in a text
text = "hello world"
unique_chars = set(text.replace(" ", ""))
print(f"Unique characters: {unique_chars}")

# Create sets of numbers
even_numbers = {x for x in range(1, 21) if x % 2 == 0}
odd_numbers = {x for x in range(1, 21) if x % 2 != 0}
print(f"Evens: {even_numbers}")
print(f"Odds: {odd_numbers}")

# Student IDs (unique by nature)
student_ids = set()
student_ids.add(101)
student_ids.add(102)
student_ids.add(101)  # Duplicate ignored
print(f"Student IDs: {student_ids}")
\`\`\`

---

## ✅ Quick Practice

\`\`\`python
# Create these sets:
# 1. Set of vowels
vowels = set("aeiou")

# 2. Set from range 1-10
numbers = set(range(1, 11))

# 3. Set of squared numbers
squares = {x**2 for x in range(1, 6)}

# 4. Remove duplicates from list
my_list = [1, 2, 2, 3, 3, 3]
unique = set(my_list)

# 5. Unique words from text
text = "the quick brown fox jumps over the lazy dog"
words = set(text.split())
\`\`\`

Sets automatically handle uniqueness - perfect for deduplication! 🎯`
};
