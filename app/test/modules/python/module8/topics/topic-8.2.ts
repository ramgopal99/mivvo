import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_2: SubLesson = {
  id: "8.2",
  title: 'Type Conversion Functions',
  status: 'demo',
  content: `# 🔄 Type Conversion Functions

Convert between different data types using Python's built-in conversion functions!

---

## 🎯 Basic Type Conversions

### **int() - Convert to Integer**
\`\`\`python
# From string
print(int("42"))        # 42
print(int("101", 2))    # 5 (binary to decimal)
print(int("FF", 16))    # 255 (hexadecimal to decimal)

# From float
print(int(3.14))        # 3 (truncates)
print(int(3.9))         # 3 (truncates)

# From boolean
print(int(True))        # 1
print(int(False))       # 0
\`\`\`

### **float() - Convert to Float**
\`\`\`python
# From string
print(float("3.14"))    # 3.14
print(float("42"))      # 42.0

# From int
print(float(42))        # 42.0

# Special values
print(float("inf"))     # inf
print(float("-inf"))    # -inf
print(float("nan"))     # nan
\`\`\`

### **str() - Convert to String**
\`\`\`python
# From numbers
print(str(42))          # "42"
print(str(3.14))        # "3.14"

# From boolean
print(str(True))        # "True"

# From collections
print(str([1, 2, 3]))   # "[1, 2, 3]"
print(str({"a": 1}))     # "{'a': 1}"
\`\`\`

---

## 📦 Collection Conversions

### **list() - Convert to List**
\`\`\`python
# From string
print(list("hello"))    # ['h', 'e', 'l', 'l', 'o']

# From tuple
print(list((1, 2, 3)))  # [1, 2, 3]

# From set
print(list({1, 2, 3}))  # [1, 2, 3] (order may vary)

# From range
print(list(range(5)))   # [0, 1, 2, 3, 4]

# From dict (keys)
print(list({"a": 1, "b": 2}))  # ['a', 'b']
\`\`\`

### **tuple() - Convert to Tuple**
\`\`\`python
# From list
print(tuple([1, 2, 3])) # (1, 2, 3)

# From string
print(tuple("hello"))   # ('h', 'e', 'l', 'l', 'o')

# From set
print(tuple({1, 2, 3})) # (1, 2, 3) (order may vary)

# From range
print(tuple(range(3)))  # (0, 1, 2)
\`\`\`

### **set() - Convert to Set**
\`\`\`python
# From list (removes duplicates)
print(set([1, 2, 2, 3, 3, 3]))  # {1, 2, 3}

# From tuple
print(set((1, 2, 3, 1, 2)))     # {1, 2, 3}

# From string
print(set("hello"))              # {'l', 'o', 'e', 'h'}

# From dict (keys only)
print(set({"a": 1, "b": 2}))      # {'a', 'b'}
\`\`\`

---

## 🎯 Advanced Conversions

### **bool() - Convert to Boolean**
\`\`\`python
# Truthy values
print(bool(1))        # True
print(bool("hello"))  # True
print(bool([1, 2]))   # True

# Falsy values
print(bool(0))        # False
print(bool(""))       # False
print(bool([]))       # False
print(bool(None))     # False

# Custom objects
class EmptyClass:
    pass

print(bool(EmptyClass()))  # True (objects are truthy by default)
\`\`\`

### **complex() - Convert to Complex Number**
\`\`\`python
# Real number
print(complex(5))     # (5+0j)

# Real and imaginary
print(complex(3, 4))  # (3+4j)

# From string
print(complex("3+4j")) # (3+4j)
print(complex("5"))    # (5+0j)
\`\`\`

### **bytes() - Convert to Bytes**
\`\`\`python
# From string (specify encoding)
print(bytes("hello", "utf-8"))  # b'hello'

# From list of integers
print(bytes([72, 101, 108, 108, 111]))  # b'Hello'

# Empty bytes
print(bytes(5))       # b'\x00\x00\x00\x00\x00'
\`\`\`

---

## 🎨 Practical Examples

### **Data Processing Pipeline**
\`\`\`python
# Raw input data (all strings)
raw_data = ["42", "3.14", "True", "hello", "123"]

# Convert to appropriate types
processed_data = []
for item in raw_data:
    if item.isdigit():
        processed_data.append(int(item))
    elif item.replace(".", "").isdigit():
        processed_data.append(float(item))
    elif item.lower() in ["true", "false"]:
        processed_data.append(item.lower() == "true")
    else:
        processed_data.append(item)

print("Original:", raw_data)
print("Processed:", processed_data)
\`\`\`

### **CSV Data Conversion**
\`\`\`python
# Simulate CSV data
csv_row = ["Alice", "25", "85.5", "True"]

# Convert each column to appropriate type
name = str(csv_row[0])          # Already string
age = int(csv_row[1])           # Convert to int
score = float(csv_row[2])       # Convert to float
active = csv_row[3].lower() == "true"  # Convert to bool

print(f"Name: {name} ({type(name)})")
print(f"Age: {age} ({type(age)})")
print(f"Score: {score} ({type(score)})")
print(f"Active: {active} ({type(active)})")
\`\`\`

### **Safe Conversions with Error Handling**
\`\`\`python
def safe_int(value, default=0):
    """Safely convert to int with fallback."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def safe_float(value, default=0.0):
    """Safely convert to float with fallback."""
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

# Test safe conversions
test_values = ["42", "3.14", "invalid", None, "", "0"]

print("Safe int conversions:")
for value in test_values:
    result = safe_int(value, -1)
    print(f"  {repr(value)} -> {result}")

print("\nSafe float conversions:")
for value in test_values:
    result = safe_float(value, -1.0)
    print(f"  {repr(value)} -> {result}")
\`\`\`

---

## ⚠️ Conversion Gotchas

### **Precision Loss**
\`\`\`python
# Float to int loses decimal part
print(int(3.9))       # 3 (not 4!)
print(int(3.1))       # 3

# Very large floats lose precision
big_num = 999999999999999999999999999999999999999999999999
print(float(big_num))  # May lose precision
\`\`\`

### **String Conversion Issues**
\`\`\`python
# These will fail
# int("3.14")        # ValueError
# int("hello")       # ValueError
# float("hello")     # ValueError

# These work
print(int(float("3.14")))  # 3 (but loses precision)
print(str(42) + "hello")   # "42hello"
\`\`\`

### **Boolean Edge Cases**
\`\`\`python
# Empty collections are falsy
print(bool([]))       # False
print(bool({}))       # False
print(bool(set()))    # False

# Zero values are falsy
print(bool(0))        # False
print(bool(0.0))      # False

# None is falsy
print(bool(None))     # False
\`\`\`

---

## ✅ Best Practices

1. **Handle conversion errors** - Use try-except for user input
2. **Know precision limits** - Float conversions can lose precision
3. **Use safe conversion functions** - Create helpers for common cases
4. **Check before converting** - Validate input when possible
5. **Document expected types** - Make conversion requirements clear

Type conversions are essential for data processing! 🔄`
};

