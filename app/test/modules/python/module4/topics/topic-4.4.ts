import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_4: SubLesson = {
  id: 4.4,
  title: 'Tuple Methods',
  status: 'demo',
  content: `# 🔧 Tuple Methods

Tuples have fewer methods than lists because they are immutable. Let's explore what methods are available!

---

## 🔢 Count Method

### **Count Occurrences**
\`\`\`python
numbers = (1, 2, 3, 2, 4, 2, 5)
print(numbers.count(2))  # 3 (2 appears 3 times)
print(numbers.count(6))  # 0 (6 not found)

fruits = ("apple", "banana", "apple", "orange", "apple")
print(fruits.count("apple"))  # 3
print(fruits.count("grape"))  # 0
\`\`\`

---

## 📍 Index Method

### **Find Position**
\`\`\`python
fruits = ("apple", "banana", "orange", "banana", "grape")
print(fruits.index("banana"))  # 1 (first occurrence)
print(fruits.index("orange"))  # 2

# Find starting from specific position
print(fruits.index("banana", 2))  # 3 (start searching from index 2)
\`\`\`

---

## 📏 Length and Membership

### **Built-in Functions**
\`\`\`python
colors = ("red", "green", "blue", "yellow")

# Length
print(len(colors))  # 4

# Membership testing
print("red" in colors)      # True
print("purple" in colors)   # False
print("red" not in colors)  # False
\`\`\`

---

## 🔄 Sorting and Reversing

### **Create Sorted/Reverse Copies**
\`\`\`python
numbers = (3, 1, 4, 1, 5, 9, 2)

# Create sorted tuple
sorted_numbers = tuple(sorted(numbers))
print(f"Original: {numbers}")      # (3, 1, 4, 1, 5, 9, 2)
print(f"Sorted: {sorted_numbers}")  # (1, 1, 2, 3, 4, 5, 9)

# Create reversed tuple
reversed_numbers = tuple(reversed(numbers))
print(f"Reversed: {reversed_numbers}")  # (2, 9, 5, 1, 4, 1, 3)

# Original tuple unchanged
print(f"Original: {numbers}")  # (3, 1, 4, 1, 5, 9, 2)
\`\`\`

---

## 📊 Min, Max, and Sum

### **Aggregate Functions**
\`\`\`python
scores = (85, 92, 78, 96, 88)

print(f"Minimum: {min(scores)}")   # 78
print(f"Maximum: {max(scores)}")   # 96
print(f"Sum: {sum(scores)}")       # 439
print(f"Average: {sum(scores)/len(scores)}")  # 87.8

# Works with strings too
words = ("apple", "banana", "cherry")
print(f"First alphabetically: {min(words)}")  # apple
print(f"Last alphabetically: {max(words)}")  # cherry
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Student grades analysis
grades = (85, 92, 78, 96, 88, 92, 85)

# Count how many got each grade
print(f"A grades (90+): {grades.count(92) + grades.count(96)}")
print(f"B grades (80-89): {grades.count(85) + grades.count(88)}")
print(f"C grades (78): {grades.count(78)}")

# Find positions
print(f"First 92 at position: {grades.index(92)}")

# Statistics
print(f"Highest grade: {max(grades)}")
print(f"Lowest grade: {lowest}")
print(f"Average: {sum(grades)/len(grades):.1f}")

# Check for specific grades
print(f"Anyone got 100? {100 in grades}")
print(f"Anyone failed? {min(grades) < 60}")
\`\`\`

Tuples have fewer methods because they're immutable - but these methods are still very useful! 📊`
};
