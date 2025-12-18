import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_6: SubLesson = {
  id: "5.6",
  title: 'Set Methods',
  status: 'demo',
  content: `# 🔧 Set Methods

Sets have many useful methods for manipulation and analysis. Let's explore the most important ones!

---

## 📏 Length and Membership

### **Basic Set Information**
\`\`\`python
fruits = {"apple", "banana", "orange", "grape"}

# Get number of elements
print(len(fruits))  # 4

# Check membership
print("apple" in fruits)      # True
print("watermelon" in fruits) # False
print("apple" not in fruits)  # False
\`\`\`

---

## 🔄 Copy Method

### **Create a Copy**
\`\`\`python
original = {1, 2, 3, 4, 5}
copy_set = original.copy()

copy_set.add(6)
print(f"Original: {original}")  # {1, 2, 3, 4, 5}
print(f"Copy: {copy_set}")      # {1, 2, 3, 4, 5, 6}
\`\`\`

---

## 🔍 Is Disjoint

### **Check for No Common Elements**
\`\`\`python
set1 = {1, 2, 3}
set2 = {4, 5, 6}
set3 = {3, 4, 5}

print(set1.isdisjoint(set2))  # True (no common elements)
print(set1.isdisjoint(set3))  # False (both have 3)
\`\`\`

---

## 📊 Update Methods (In-Place Operations)

### **Modify Set Directly**
\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print(f"Before: set1={set1}, set2={set2}")

# Union update (add all from set2)
set1.update(set2)
print(f"After update: {set1}")  # {1, 2, 3, 4, 5}

# Reset for next example
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Intersection update (keep only common)
set1.intersection_update(set2)
print(f"After intersection_update: {set1}")  # {3}

# Reset for next example
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Difference update (remove elements from set2)
set1.difference_update(set2)
print(f"After difference_update: {set1}")  # {1, 2}

# Reset for next example
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Symmetric difference update
set1.symmetric_difference_update(set2)
print(f"After symmetric_difference_update: {set1}")  # {1, 2, 4, 5}
\`\`\`

---

## 🎨 Practical Examples

### **Set Analysis**
\`\`\`python
# Student course analysis
math_students = {"Alice", "Bob", "Charlie", "Diana"}
science_students = {"Bob", "Charlie", "Eve", "Frank"}
history_students = {"Charlie", "Eve", "Grace", "Henry"}

# Find students taking multiple courses
multiple_courses = set()
for student in math_students | science_students | history_students:
    courses = 0
    if student in math_students: courses += 1
    if student in science_students: courses += 1
    if student in history_students: courses += 1
    if courses > 1:
        multiple_courses.add(student)

print(f"Students taking multiple courses: {multiple_courses}")

# Find unique students per course
only_math = math_students - science_students - history_students
only_science = science_students - math_students - history_students
only_history = history_students - math_students - science_students

print(f"Only math: {only_math}")
print(f"Only science: {only_science}")
print(f"Only history: {only_history}")
\`\`\`

### **Data Cleaning**
\`\`\`python
# Remove duplicates and clean data
raw_data = ["apple", "Banana", "APPLE", "orange", "banana", "Orange"]

# Convert to lowercase and create set
clean_data = {item.lower() for item in raw_data}
print(f"Clean unique items: {clean_data}")

# Check data quality
print(f"Number of unique items: {len(clean_data)}")
print(f"Original had duplicates: {len(raw_data) > len(clean_data)}")
\`\`\`

### **Set Statistics**
\`\`\`python
# Website analytics
page_views = {"home", "about", "products", "contact", "blog"}
purchases = {"home", "products", "checkout", "thank_you"}
newsletter_signups = {"blog", "about", "newsletter"}

# Analyze user journeys
all_pages = page_views | purchases | newsletter_signups
purchase_funnel = purchases & page_views
conversion_pages = purchases - page_views

print(f"Total unique pages: {len(all_pages)}")
print(f"Pages in both views and purchases: {purchase_funnel}")
print(f"Purchase-only pages: {conversion_pages}")

# Check if sets are related
print(f"Purchase pages subset of all pages: {purchases.issubset(all_pages)}")
print(f"All pages superset of purchases: {all_pages.issuperset(purchases)}")
\`\`\`

---

## ✅ Method Summary

**add(item)** - Add single item, modifies set  
**update(iterable)** - Add multiple items, modifies set  
**remove(item)** - Remove item (error if missing), modifies set  
**discard(item)** - Remove item safely (no error), modifies set  
**pop()** - Remove and return random item, modifies set  
**clear()** - Remove all items, modifies set  
**copy()** - Create copy, returns new set  
**union(other)** - Combine sets, returns new set  
**intersection(other)** - Find common elements, returns new set  
**difference(other)** - Elements in first but not second, returns new set  
**symmetric_difference(other)** - Elements in either but not both, returns new set  
**issubset(other)** - Check if subset, returns boolean  
**issuperset(other)** - Check if superset, returns boolean  
**isdisjoint(other)** - Check no common elements, returns boolean  
**len(set)** - Get size, returns integer  
**item in set** - Check membership, returns boolean

Sets have powerful methods for all kinds of data operations! 🛠️`
};

