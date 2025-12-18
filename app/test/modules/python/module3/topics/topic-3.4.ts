import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_4: SubLesson = {
  id: 3.4,
  title: 'Adding Elements to Lists',
  status: 'demo',
  content: `# ➕ Adding Elements to Lists

Lists can grow and shrink as needed. Let's learn how to add new items!

---

## 🎯 Append Method

### **Add to the End**
\`\`\`python
fruits = ["apple", "banana"]
print(f"Before: {fruits}")

fruits.append("orange")
print(f"After: {fruits}")  # ['apple', 'banana', 'orange']

# Add more items
fruits.append("grape")
fruits.append("kiwi")
print(f"Final: {fruits}")
\`\`\`

---

## 📍 Insert Method

### **Add at Specific Position**
\`\`\`python
numbers = [1, 2, 4, 5]
print(f"Before: {numbers}")

# Insert 3 at index 2
numbers.insert(2, 3)
print(f"After: {numbers}")  # [1, 2, 3, 4, 5]

# Insert at beginning
numbers.insert(0, 0)
print(f"Start: {numbers}")  # [0, 1, 2, 3, 4, 5]
\`\`\`

---

## 🔗 Extend Method

### **Add Multiple Items**
\`\`\`python
list1 = [1, 2, 3]
list2 = [4, 5, 6]

print(f"List1: {list1}")
print(f"List2: {list2}")

# Add all items from list2 to list1
list1.extend(list2)
print(f"Extended: {list1}")  # [1, 2, 3, 4, 5, 6]
\`\`\`

---

## ➕ Using + Operator

### **Combine Lists**
\`\`\`python
fruits = ["apple", "banana"]
more_fruits = ["orange", "grape"]

# Create new combined list
all_fruits = fruits + more_fruits
print(all_fruits)  # ['apple', 'banana', 'orange', 'grape']

# Original lists unchanged
print(fruits)       # ['apple', 'banana']
print(more_fruits)  # ['orange', 'grape']
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Shopping list
shopping = ["bread", "milk"]
print(f"Current list: {shopping}")

# Add more items
shopping.append("eggs")
shopping.append("butter")
print(f"After append: {shopping}")

# Insert cheese at position 1
shopping.insert(1, "cheese")
print(f"After insert: {shopping}")

# Add multiple items from another list
more_items = ["apples", "bananas"]
shopping.extend(more_items)
print(f"Final list: {shopping}")
\`\`\`

Lists grow as you add items - use the method that fits your needs! 📝`
};
