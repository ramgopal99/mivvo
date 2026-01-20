import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_3: SubLesson = {
  id: "5.3",
  title: 'Adding Elements to Sets',
  status: 'demo',
  content: "`# âž• Adding Elements to Sets

Sets are mutable, so you can add new elements. But remember - duplicates are automatically ignored!

---

## ðŸŽ¯ Add Method

### **Add Single Element**
\`"\`\`python
fruits = {"apple", "banana"}
print(f"Original: {fruits}")

fruits.add("orange")
print(f"After add: {fruits}")  # {'orange', 'banana', 'apple'}

# Try to add duplicate (ignored)
fruits.add("apple")
print(f"After duplicate add: {fruits}")  # No change
\`\`\`

---

## ðŸ“¦ Update Method

### **Add Multiple Elements**
\`\`\`python
numbers = {1, 2, 3}
print(f"Original: {numbers}")

# Add multiple elements at once
numbers.update([4, 5, 6])
print(f"After update: {numbers}")  # {1, 2, 3, 4, 5, 6}

# Can also use another set
more_numbers = {7, 8, 9}
numbers.update(more_numbers)
print(f"After set update: {numbers}")  # {1, 2, 3, 4, 5, 6, 7, 8, 9}
\`\`\`

---

## ðŸ”„ Union Operation

### **Create New Set with Union**
\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Create new set with all elements
union_set = set1.union(set2)
print(f"Set1: {set1}")
print(f"Set2: {set2}")
print(f"Union: {union_set}")  # {1, 2, 3, 4, 5}

# Using | operator
union_set2 = set1 | set2
print(f"Union with |: {union_set2}")  # {1, 2, 3, 4, 5}
\`\`\`

---

## ðŸŽ¨ Adding Different Types

\`\`\`python
# Mixed types in sets
mixed_set = {"hello", 42, 3.14, True}
print(f"Mixed: {mixed_set}")

# Add more mixed items
mixed_set.add("world")
mixed_set.add(100)
print(f"After adding: {mixed_set}")

# Update with different types
mixed_set.update([False, "python", 2.71])
print(f"After update: {mixed_set}")
\`\`\`

---

## ðŸ“ Practical Examples

\`\`\`python
# Building a collection of unique items
visited_cities = set()
print(f"Initial: {visited_cities}")

# Add cities as we visit them
visited_cities.add("New York")
visited_cities.add("London")
visited_cities.add("Tokyo")
print(f"After visits: {visited_cities}")

# Add multiple cities at once
more_cities = ["Paris", "Sydney", "Berlin"]
visited_cities.update(more_cities)
print(f"After bulk add: {visited_cities}")

# Try to add duplicate (ignored)
visited_cities.add("London")
print(f"After duplicate: {visited_cities}")  # No change
\`\`\`

### **Set Union Examples**
\`\`\`python
# Combine different collections
python_skills = {"variables", "loops", "functions"}
web_skills = {"HTML", "CSS", "JavaScript"}
data_skills = {"SQL", "pandas", "numpy"}

# All skills
all_skills = python_skills | web_skills | data_skills
print(f"All skills: {all_skills}")

# Add new skill category
ml_skills = {"scikit-learn", "tensorflow"}
all_skills = all_skills.union(ml_skills)
print(f"With ML: {all_skills}")
\`\`\`

---

## âœ… Important Notes

- **add()** - Single element
- **update()** - Multiple elements (list, set, etc.)
- **union()** - Create new set (doesn't modify original)
- **Duplicates are ignored** - Sets maintain uniqueness
- **Order is not guaranteed** - Sets are unordered

Sets grow by adding elements - perfect for collecting unique items! ðŸ“Š`
};


