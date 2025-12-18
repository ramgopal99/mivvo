import { SubLesson } from '../../../data/lessonsData';

export const topic_5_5: SubLesson = {
  id: 5.5,
  title: 'Set Operations',
  status: 'demo',
  content: `# ⚡ Set Operations

Sets support mathematical operations like union, intersection, and difference. These are very powerful for data analysis!

---

## 🔗 Union (Combine Sets)

### **All Elements from Both Sets**
\`\`\`python
set1 = {1, 2, 3}
set2 = {3, 4, 5}

# Method 1: union() method
union_result = set1.union(set2)
print(f"Union: {union_result}")  # {1, 2, 3, 4, 5}

# Method 2: | operator
union_result2 = set1 | set2
print(f"Union with |: {union_result2}")  # {1, 2, 3, 4, 5}

# Multiple sets
set3 = {5, 6, 7}
all_union = set1 | set2 | set3
print(f"All union: {all_union}")  # {1, 2, 3, 4, 5, 6, 7}
\`\`\`

---

## 🎯 Intersection (Common Elements)

### **Elements Present in Both Sets**
\`\`\`python
python_devs = {"Alice", "Bob", "Charlie"}
web_devs = {"Bob", "Charlie", "Diana"}

# Method 1: intersection() method
both = python_devs.intersection(web_devs)
print(f"Both skills: {both}")  # {'Charlie', 'Bob'}

# Method 2: & operator
both2 = python_devs & web_devs
print(f"Both with &: {both2}")  # {'Charlie', 'Bob'}

# Three sets
designers = {"Charlie", "Eve", "Frank"}
all_three = python_devs & web_devs & designers
print(f"All three: {all_three}")  # {'Charlie'}
\`\`\`

---

## ➖ Difference (Elements in First but Not Second)

### **Elements Unique to First Set**
\`\`\`python
all_students = {"Alice", "Bob", "Charlie", "Diana"}
passed_students = {"Alice", "Bob", "Diana"}

# Method 1: difference() method
failed = all_students.difference(passed_students)
print(f"Failed students: {failed}")  # {'Charlie'}

# Method 2: - operator
failed2 = all_students - passed_students
print(f"Failed with -: {failed2}")  # {'Charlie'}

# Reverse difference
not_passed = passed_students - all_students
print(f"Not in class: {not_passed}")  # set()
\`\`\`

---

## △ Symmetric Difference (Elements in Either but Not Both)

### **Elements in One Set or the Other, but Not Both**
\`\`\`python
team_a = {"Alice", "Bob", "Charlie"}
team_b = {"Bob", "Charlie", "Diana"}

# Method 1: symmetric_difference() method
unique = team_a.symmetric_difference(team_b)
print(f"Unique members: {unique}")  # {'Alice', 'Diana'}

# Method 2: ^ operator
unique2 = team_a ^ team_b
print(f"Unique with ^: {unique2}")  # {'Alice', 'Diana'}

# Same result different order
unique3 = team_b ^ team_a
print(f"Same result: {unique3}")  # {'Alice', 'Diana'}
\`\`\`

---

## 🔍 Subset and Superset

### **Set Relationships**
\`\`\`python
small = {1, 2, 3}
large = {1, 2, 3, 4, 5}

# Is small a subset of large?
print(small.issubset(large))    # True
print(small <= large)           # True (subset operator)

# Is large a superset of small?
print(large.issuperset(small))  # True
print(large >= small)           # True (superset operator)

# Proper subset/superset
print(small < large)            # True (proper subset)
print(large > small)            # True (proper superset)

# Equal sets
equal1 = {1, 2, 3}
equal2 = {3, 2, 1}
print(equal1 == equal2)         # True
print(equal1.issubset(equal2))  # True
\`\`\`

---

## 🎨 Practical Examples

### **Data Analysis**
\`\`\`python
# Survey responses
python_users = {"Alice", "Bob", "Charlie", "Diana"}
java_users = {"Bob", "Charlie", "Eve", "Frank"}
javascript_users = {"Charlie", "Eve", "Grace", "Henry"}

# Who uses multiple languages?
python_java = python_users & java_users
print(f"Python + Java: {python_java}")

# Who uses only Python?
only_python = python_users - java_users - javascript_users
print(f"Only Python: {only_python}")

# Who uses at least one language?
all_users = python_users | java_users | javascript_users
print(f"All users: {all_users}")

# Who uses all three languages?
all_three = python_users & java_users & javascript_users
print(f"All three: {all_three}")

# Language popularity
python_only = len(python_users - java_users - javascript_users)
java_only = len(java_users - python_users - javascript_users)
js_only = len(javascript_users - python_users - java_users)
multiple = len(all_users) - python_only - java_only - js_only

print(f"Python only: {python_only}")
print(f"Java only: {java_only}")
print(f"JS only: {js_only}")
print(f"Multiple languages: {multiple}")
\`\`\`

### **Set Operations Summary**

**Union** - union() or | - All elements from both sets  
**Intersection** - intersection() or & - Common elements only  
**Difference** - difference() or - - Elements in first but not second  
**Symmetric Difference** - symmetric_difference() or ^ - Elements in either but not both  
**Subset** - issubset() or <= - All elements of first are in second  
**Superset** - issuperset() or >= - All elements of second are in first

Set operations are incredibly powerful for data analysis! 📊`
};
