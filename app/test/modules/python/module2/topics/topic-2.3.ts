import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_3: SubLesson = {
  id: "2.3",
  title: 'Conditions',
  status: 'demo',
  content: `# 🚀 Python Conditionals - Fast Track Template

Master Python conditionals from basic to advanced! Each level builds on the previous with templates and examples.

---

## 📚 LEVEL 1: BASIC - Simple Decisions

### **Template 1: Basic If Statement**
\`\`\`python
# Template: if condition:
if CONDITION:
    # Do something
    ACTION
\`\`\`

### **Examples:**
\`\`\`python
# Age check
age = 18
if age >= 18:
    print("You can vote!")

# Temperature alert
temp = 30
if temp > 25:
    print("It's hot today!")

# Score validation
score = 85
if score >= 60:
    print("You passed!")
\`\`\`

---

## 📈 LEVEL 2: INTERMEDIATE - Alternatives & Multiple Choices

### **Template 2: If-Else Statement**
\`\`\`python
# Template: if condition else
if CONDITION:
    # True action
    TRUE_ACTION
else:
    # False action
    FALSE_ACTION
\`\`\`

### **Template 3: If-Elif-Else Chain**
\`\`\`python
# Template: Multiple conditions
if CONDITION_1:
    ACTION_1
elif CONDITION_2:
    ACTION_2
elif CONDITION_3:
    ACTION_3
else:
    DEFAULT_ACTION
\`\`\`

### **Examples:**
\`\`\`python
# Grade calculator
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Grade: {grade}")

# Age categories
age = 25
if age < 13:
    category = "Child"
elif age < 20:
    category = "Teen"
elif age < 65:
    category = "Adult"
else:
    category = "Senior"
\`\`\`

### **Logical Operators Template**
\`\`\`python
# AND: Both must be true
if CONDITION_A and CONDITION_B:
    ACTION

# OR: At least one must be true
if CONDITION_A or CONDITION_B:
    ACTION

# NOT: Reverse condition
if not CONDITION:
    ACTION
\`\`\`

---

## 🔧 LEVEL 3: ADVANCED - Complex Logic & Shortcuts

### **Template 4: Nested Conditions**
\`\`\`python
# Template: Conditions inside conditions
if OUTER_CONDITION:
    if INNER_CONDITION:
        ACTION
    else:
        ALTERNATIVE
else:
    OUTER_ALTERNATIVE
\`\`\`

### **Template 5: Ternary Operator**
\`\`\`python
# Template: One-line if-else
result = VALUE_IF_TRUE if CONDITION else VALUE_IF_FALSE

# Multiple ternary
result = A if COND1 else B if COND2 else C
\`\`\`

### **Examples:**
\`\`\`python
# Nested: Driving eligibility
age = 20
has_license = True
has_insurance = False

if age >= 18:
    if has_license:
        if has_insurance:
            status = "Full access"
        else:
            status = "Needs insurance"
    else:
        status = "Needs license"
else:
    status = "Too young"

# Ternary: Status check
user_type = "premium" if score > 100 else "basic"
print(f"User type: {user_type}")

# Multiple ternary: Weather
weather = "Sunny" if temp > 25 else "Cloudy" if temp > 15 else "Cold"
\`\`\`

### **Membership Operators**
\`\`\`python
# Template: Check if item exists
if ITEM in COLLECTION:
    FOUND_ACTION

if ITEM not in COLLECTION:
    NOT_FOUND_ACTION
\`\`\`

### **Examples:**
\`\`\`python
# List membership
fruits = ["apple", "banana", "orange"]
if "apple" in fruits:
    print("Apple available!")

# String membership
message = "Hello World"
if "World" in message:
    print("Found greeting!")

# Dictionary keys
user = {"name": "Alice", "role": "admin"}
if "role" in user:
    print(f"Role: {user['role']}")
\`\`\`

---

## 🎯 LEVEL 4: EXPERT - Real-World Patterns

### **Template 6: Guard Clauses**
\`\`\`python
# Template: Handle errors first
def process_data(data):
    if not data:
        return "No data provided"

    if not isinstance(data, list):
        return "Invalid data type"

    # Main processing logic
    return "Data processed successfully"
\`\`\`

### **Template 7: Complex Conditions**
\`\`\`python
# Template: Combine multiple conditions
if (CONDITION_A and CONDITION_B) or (CONDITION_C and CONDITION_D):
    ACTION

# Template: Check ranges
if MIN_VALUE <= VARIABLE <= MAX_VALUE:
    WITHIN_RANGE_ACTION
\`\`\`

### **Real-World Example:**

\`\`\`python
# User Authentication System
def authenticate(username, password, is_admin=False):
    if not username or not password:
        return "Missing credentials"

    if username == "admin" and password == "secret123":
        if is_admin:
            return "Admin access granted"
        else:
            return "User access granted"
    elif username == "admin":
        return "Wrong password"
    else:
        return "Invalid username"
\`\`\`

---`
};

