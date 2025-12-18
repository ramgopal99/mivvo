import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_4: SubLesson = {
  id: 5.4,
  title: 'Removing Elements from Sets',
  status: 'demo',
  content: `# ➖ Removing Elements from Sets

Sets provide several ways to remove elements. Each method behaves differently when the element doesn't exist!

---

## 🎯 Remove Method

### **Remove Specific Element (Error if Missing)**
\`\`\`python
fruits = {"apple", "banana", "orange", "grape"}
print(f"Original: {fruits}")

fruits.remove("banana")
print(f"After remove: {fruits}")  # {'orange', 'grape', 'apple'}

# This will cause an error if element doesn't exist
# fruits.remove("watermelon")  # KeyError!
\`\`\`

---

## 🗑️ Discard Method

### **Remove Element Safely (No Error if Missing)**
\`\`\`python
numbers = {1, 2, 3, 4, 5}
print(f"Original: {numbers}")

numbers.discard(3)
print(f"After discard: {numbers}")  # {1, 2, 4, 5}

# No error if element doesn't exist
numbers.discard(10)
print(f"After discard missing: {numbers}")  # No change, no error
\`\`\`

---

## 🏀 Pop Method

### **Remove and Return Random Element**
\`\`\`python
colors = {"red", "green", "blue", "yellow"}
print(f"Original: {colors}")

# Remove and return a random element
removed = colors.pop()
print(f"Removed: {removed}")
print(f"Remaining: {colors}")

# Pop another one
another = colors.pop()
print(f"Removed another: {another}")
print(f"Remaining: {colors}")
\`\`\`

---

## 🧹 Clear Method

### **Remove All Elements**
\`\`\`python
items = {"book", "pen", "notebook", "eraser"}
print(f"Original: {items}")

items.clear()
print(f"After clear: {items}")  # set()
\`\`\`

---

## ✂️ Set Difference Operations

### **Remove Multiple Elements**
\`\`\`python
big_set = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
to_remove = {2, 4, 6, 8}

# Create new set with difference
result = big_set.difference(to_remove)
print(f"Original: {big_set}")
print(f"To remove: {to_remove}")
print(f"Difference: {result}")  # {1, 3, 5, 7, 9, 10}

# Using - operator
result2 = big_set - to_remove
print(f"Using -: {result2}")
\`\`\`

---

## 📏 Difference Update

### **Remove Elements In-Place**
\`\`\`python
set1 = {1, 2, 3, 4, 5}
set2 = {2, 4}
print(f"Set1: {set1}")
print(f"Set2: {set2}")

# Remove elements of set2 from set1
set1.difference_update(set2)
print(f"After difference_update: {set1}")  # {1, 3, 5}

# Equivalent to: set1 = set1 - set2
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Managing a guest list
invited = {"Alice", "Bob", "Charlie", "Diana", "Eve"}
declined = {"Bob", "Diana"}

print(f"Originally invited: {invited}")
print(f"Who declined: {declined}")

# Remove those who declined (safe way)
for person in declined:
    invited.discard(person)  # Won't error if person not in set

print(f"Final guest list: {invited}")

# Alternative: use difference_update
# invited.difference_update(declined)
\`\`\`

### **Cleanup Operations**
\`\`\`python
# Remove invalid entries
valid_ids = {101, 102, 103, 104, 105}
invalid_ids = {102, 999}  # 999 not in set

# Safe removal of invalid IDs
for invalid_id in invalid_ids:
    valid_ids.discard(invalid_id)  # No error for 999

print(f"Valid IDs: {valid_ids}")

# Clear all for reset
valid_ids.clear()
print(f"After clear: {valid_ids}")
\`\`\`

---

## ✅ Method Comparison

**remove()** - Removes specific element (error if missing), modifies set  
**discard()** - Removes specific element safely (no error if missing), modifies set  
**pop()** - Removes and returns random element (error if empty), modifies set  
**clear()** - Removes all elements, modifies set  
**difference()** - Returns new set with elements in first but not second, doesn't modify  
**difference_update()** - Removes elements from second set, modifies set

Choose the right removal method for your needs! 🗂️`
};
