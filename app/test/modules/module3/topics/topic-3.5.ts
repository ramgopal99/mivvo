import { SubLesson } from '../../../data/lessonsData';

export const topic_3_5: SubLesson = {
  id: 3.5,
  title: 'Removing List Elements',
  status: 'demo',
  content: `# ➖ Removing Elements from Lists

Lists can shrink as well as grow. Let's learn how to remove items!

---

## 🎯 Remove Method

### **Remove by Value**
\`\`\`python
fruits = ["apple", "banana", "orange", "banana"]
print(f"Before: {fruits}")

fruits.remove("banana")  # Removes first "banana"
print(f"After: {fruits}")  # ['apple', 'orange', 'banana']

# Remove another item
fruits.remove("orange")
print(f"Final: {fruits}")  # ['apple', 'banana']
\`\`\`

---

## 🗑️ Pop Method

### **Remove by Index**
\`\`\`python
numbers = [10, 20, 30, 40, 50]
print(f"Before: {numbers}")

# Remove and return last item
last_item = numbers.pop()
print(f"Removed: {last_item}")  # 50
print(f"After: {numbers}")      # [10, 20, 30, 40]

# Remove and return specific index
third_item = numbers.pop(2)
print(f"Removed: {third_item}")  # 30
print(f"After: {numbers}")       # [10, 20, 40]
\`\`\`

---

## ✂️ Del Statement

### **Delete by Index**
\`\`\`python
colors = ["red", "blue", "green", "yellow"]
print(f"Before: {colors}")

# Delete item at index 1
del colors[1]
print(f"After: {colors}")  # ['red', 'green', 'yellow']

# Delete multiple items
del colors[0:2]  # Delete first two items
print(f"Final: {colors}")  # ['yellow']
\`\`\`

---

## 🧹 Clear Method

### **Remove All Items**
\`\`\`python
items = ["book", "pen", "notebook", "eraser"]
print(f"Before: {items}")

items.clear()
print(f"After: {items}")  # []
\`\`\`

---

## 🎨 Practical Examples

\`\`\`python
# Task list
tasks = ["buy milk", "call mom", "do homework", "exercise"]
print(f"Tasks: {tasks}")

# Complete first task
completed = tasks.pop(0)
print(f"Completed: {completed}")
print(f"Remaining: {tasks}")

# Remove a specific task
tasks.remove("call mom")
print(f"After removal: {tasks}")

# Clear all tasks
tasks.clear()
print(f"All done: {tasks}")
\`\`\`

Choose the right removal method for your needs! 🗂️`
};
