import { SubLesson } from '../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: 2.6,
  title: 'Type Casting in Python',
  status: 'demo',
  content: `# 🚀 Python Type Casting

Master type conversion in Python!

---

## 🎯 BASIC CONVERSION

\`\`\`python
# Convert to integer
age = int("25")        # "25" -> 25
price = int(19.99)     # 19.99 -> 19

# Convert to float
decimal = float("3.14")  # "3.14" -> 3.14
number = float(42)       # 42 -> 42.0

# Convert to string
text = str(42)           # 42 -> "42"
text2 = str(3.14)        # 3.14 -> "3.14"

# Convert to boolean
flag = bool(1)           # 1 -> True
flag2 = bool(0)          # 0 -> False
\`\`\`

---

## 🔧 MORE EXAMPLES

\`\`\`python
# Converting between types
number = 42
text = str(number)     # 42 -> "42"
back_to_int = int(text)  # "42" -> 42

# Float conversions
price = 19.99
whole_price = int(price)    # 19.99 -> 19
price_text = str(price)     # 19.99 -> "19.99"

# Boolean conversions
print(bool(1))     # True
print(bool(0))     # False
print(bool(5))     # True (any non-zero)
print(bool(""))    # False (empty string)
\`\`\`

---

## 🎯 QUICK REFERENCE

| Function | Purpose | Example |
|----------|---------|---------|
| int() | To integer | int("25") → 25 |
| float() | To float | float("3.14") → 3.14 |
| str() | To string | str(42) → "42" |
| bool() | To boolean | bool(1) → True |

Type casting converts data between types safely! 🎯`
};
