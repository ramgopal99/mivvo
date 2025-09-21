import { SubLesson } from '../../../data/lessonsData';

export const topic_16_5: SubLesson = {
  id: 16.5,
  title: 'Regular Expressions',
  status: 'demo',
  content: `# 🔍 Regular Expressions in Python

Regular expressions (regex) are powerful tools for pattern matching and text manipulation. Python's \`re\` module provides comprehensive regex support, enabling complex string operations, data validation, and text processing. Let's master this essential skill for text processing!

---

## 🎯 What are Regular Expressions?

**Regular expressions** are sequences of characters that define search patterns. They can match, search, replace, and split strings based on complex patterns.

### **Why Use Regular Expressions?**
- **Pattern matching** - Find specific text patterns
- **Data validation** - Check if strings match expected formats
- **Text parsing** - Extract information from structured text
- **Search and replace** - Modify text based on patterns
- **String manipulation** - Split and join text intelligently

---

## 💻 Basic Regex Operations

### **Import and Basic Usage**
\`\`\`python
import re

# Simple matching
pattern = r"hello"
text = "hello world"
match = re.search(pattern, text)
if match:
    print(f"Found: {match.group()}")  # Found: hello

# Check if pattern exists
if re.search(r"world", text):
    print("Pattern found")  # Pattern found
\`\`\`

### **Core Functions**
\`\`\`python
text = "The quick brown fox jumps over the lazy dog"

# re.search() - Find first occurrence
match = re.search(r"fox", text)
print(match.group())  # fox
print(match.span())   # (16, 19) - start and end positions

# re.match() - Match from beginning
match = re.match(r"The", text)
if match:
    print(match.group())  # The

# re.findall() - Find all occurrences
words = re.findall(r"\\b\\w+\\b", text)
print(words)  # ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']

# re.finditer() - Find all with match objects
for match in re.finditer(r"\\b\\w+\\b", text):
    print(f"{match.group()} at {match.span()}")
\`\`\`

---

## 🎨 Regex Patterns and Metacharacters

### **Literal Characters**
\`\`\`python
# Match exact characters
pattern = r"cat"
print(re.findall(pattern, "cat category catalog"))  # ['cat', 'cat', 'cat']
\`\`\`

### **Metacharacters**
\`\`\`python
text = "cat cot cut cit cet"

# . - Any single character
print(re.findall(r"c.t", text))  # ['cat', 'cot', 'cut']

# ^ - Start of string
print(re.findall(r"^cat", "cat in hat"))  # ['cat']
print(re.findall(r"^cat", "in cat hat"))  # []

# $ - End of string
print(re.findall(r"hat$", "cat in hat"))  # ['hat']

# * - Zero or more
print(re.findall(r"ca*t", "ct cat caat caaat"))  # ['ct', 'cat', 'caat', 'caaat']

# + - One or more
print(re.findall(r"ca+t", "ct cat caat caaat"))  # ['cat', 'caat', 'caaat']

# ? - Zero or one
print(re.findall(r"ca?t", "ct cat caat"))  # ['ct', 'cat']
\`\`\`

### **Character Classes**
\`\`\`python
text = "Hello123 World456!"

# [abc] - Any of a, b, c
print(re.findall(r"[aeiou]", text))  # ['e', 'o', 'o', 'a']

# [a-z] - Range
print(re.findall(r"[a-z]", text))  # ['e', 'l', 'l', 'o', 'o', 'r', 'l', 'd']

# [^abc] - Negation
print(re.findall(r"[^a-zA-Z0-9]", text))  # [' ', '!']

# \\d - Digit (equivalent to [0-9])
print(re.findall(r"\\d", text))  # ['1', '2', '3', '4', '5', '6']

# \\w - Word character (letters, digits, underscore)
print(re.findall(r"\\w", text))  # ['H', 'e', 'l', 'l', 'o', '1', '2', '3', 'W', 'o', 'r', 'l', 'd', '4', '5', '6']

# \\s - Whitespace
print(re.findall(r"\\s", text))  # [' ']

# Predefined classes
print(re.findall(r"\\D", text))  # Non-digits: ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', '!']
print(re.findall(r"\\W", text))  # Non-word chars: [' ', '!']
print(re.findall(r"\\S", text))  # Non-whitespace: ['H', 'e', 'l', 'l', 'o', '1', '2', '3', 'W', 'o', 'r', 'l', 'd', '4', '5', '6', '!']
\`\`\`

---

## 🔧 Advanced Patterns

### **Quantifiers**
\`\`\`python
text = "ab abc abcc abccc abcccc"

# {n} - Exactly n times
print(re.findall(r"abc{2}", text))   # ['abcc']

# {n,} - n or more times
print(re.findall(r"abc{2,}", text))  # ['abcc', 'abccc', 'abcccc']

# {n,m} - Between n and m times
print(re.findall(r"abc{1,3}", text)) # ['abc', 'abcc', 'abccc', 'abcccc']

# Greedy vs Non-greedy
html = "<div>content</div><div>more</div>"
greedy = re.findall(r"<div>.*</div>", html)
lazy = re.findall(r"<div>.*?</div>", html)
print("Greedy:", greedy)   # ['<div>content</div><div>more</div>']
print("Lazy:", lazy)       # ['<div>content</div>', '<div>more</div>']
\`\`\`

### **Groups and Capturing**
\`\`\`python
# () - Capture groups
text = "John Doe, Jane Smith, Bob Johnson"

# Capture first and last names
matches = re.findall(r"(\\w+) (\\w+)", text)
print(matches)  # [('John', 'Doe'), ('Jane', 'Smith'), ('Bob', 'Johnson')]

# Access groups in match object
match = re.search(r"(\\w+) (\\w+)", text)
if match:
    print(f"Full match: {match.group(0)}")  # John Doe
    print(f"First name: {match.group(1)}")  # John
    print(f"Last name: {match.group(2)}")   # Doe
    print(f"All groups: {match.groups()}") # ('John', 'Doe')
\`\`\`

### **Non-Capturing Groups**
\`\`\`python
# (?:...) - Non-capturing group
text = "abc123def456"

# Capturing groups
capturing = re.findall(r"([a-z]+)(\\d+)", text)
print(capturing)  # [('abc', '123'), ('def', '456')]

# Non-capturing groups (for alternation)
alternation = re.findall(r"(?:abc|def)\\d+", text)
print(alternation)  # ['abc123', 'def456']
\`\`\`

### **Backreferences**
\`\`\`python
# \\1, \\2, etc. - Reference captured groups
text = "dad went to the store, mom stayed home"

# Find repeated words
repeated = re.findall(r"\\b(\\w+)\\s+\\1\\b", text)
print(repeated)  # [] (no repeated words)

text2 = "the the quick brown fox"
repeated2 = re.findall(r"\\b(\\w+)\\s+\\1\\b", text2)
print(repeated2)  # ['the']

# Replace with backreference
result = re.sub(r"(\\w+)\\s+\\1", r"\\1", text2)
print(result)  # the quick brown fox
\`\`\`

---

## 🎯 Practical Applications

### **Email Validation**
\`\`\`python
def is_valid_email(email):
    pattern = r"^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$"
    return bool(re.match(pattern, email))

emails = ["user@example.com", "user.name+tag@example.co.uk", "invalid-email"]
for email in emails:
    print(f"{email}: {is_valid_email(email)}")
\`\`\`

### **Phone Number Extraction**
\`\`\`python
text = "Contact us at (555) 123-4567 or 555-987-6543"

# Extract phone numbers
phone_pattern = r"\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}"
phones = re.findall(phone_pattern, text)
print(phones)  # ['(555) 123-4567', '555-987-6543']
\`\`\`

### **URL Extraction**
\`\`\`python
text = "Visit https://www.example.com and http://test.org/page"

# Extract URLs
url_pattern = r"https?://[\\w.-]+(?:/[\\w.-]*)*"
urls = re.findall(url_pattern, text)
print(urls)  # ['https://www.example.com', 'http://test.org/page']
\`\`\`

### **HTML Tag Removal**
\`\`\`python
html = "<p>This is <b>bold</b> text with <a href='#'>links</a>.</p>"

# Remove HTML tags
clean_text = re.sub(r"<[^>]+>", "", html)
print(clean_text)  # This is bold text with links.
\`\`\`

---

## 🔄 Search and Replace Operations

### **re.sub() Function**
\`\`\`python
text = "The price is $100 and $200 respectively"

# Replace dollar amounts with euros
result = re.sub(r"\\$(\\d+)", r"€\\1", text)
print(result)  # The price is €100 and €200 respectively

# Replace with function
def celsius_to_fahrenheit(match):
    celsius = int(match.group(1))
    fahrenheit = celsius * 9/5 + 32
    return f"{fahrenheit:.1f}°F"

text = "Temperature: 20°C and 25°C"
result = re.sub(r"(\\d+)°C", celsius_to_fahrenheit, text)
print(result)  # Temperature: 68.0°F and 77.0°F
\`\`\`

### **Multiple Replacements**
\`\`\`python
text = "I have a cat and a dog"

# Replace multiple words
replacements = {
    'cat': 'feline',
    'dog': 'canine'
}

def replace_words(match):
    word = match.group(0)
    return replacements.get(word, word)

result = re.sub(r"\\b(cat|dog)\\b", replace_words, text)
print(result)  # I have a feline and a canine
\`\`\`

---

## ⚡ Compilation and Flags

### **Compiled Patterns**
\`\`\`python
# Compile for better performance when used multiple times
email_pattern = re.compile(r"^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$")

emails = ["test@example.com", "invalid@", "user@domain.org"]
for email in emails:
    if email_pattern.match(email):
        print(f"Valid: {email}")
    else:
        print(f"Invalid: {email}")
\`\`\`

### **Regex Flags**
\`\`\`python
text = """Python is great
JavaScript is also great
PYTHON IS POWERFUL"""

# re.IGNORECASE - Case insensitive
matches = re.findall(r"python", text, re.IGNORECASE)
print(matches)  # ['Python', 'PYTHON']

# re.MULTILINE - ^ and $ match line boundaries
matches = re.findall(r"^\\w+", text, re.MULTILINE)
print(matches)  # ['Python', 'JavaScript', 'PYTHON']

# re.DOTALL - . matches newlines
text2 = "Line 1\\nLine 2\\nEnd"
match = re.search(r"Line 1.*End", text2, re.DOTALL)
print(match.group())  # Line 1\nLine 2\nEnd

# Combine flags
pattern = re.compile(r"test", re.IGNORECASE | re.MULTILINE)
\`\`\`

---

## 🧪 Complex Examples

### **Log File Parsing**
\`\`\`python
log_data = """
2023-12-01 10:15:23 INFO User login: alice
2023-12-01 10:16:45 ERROR Database connection failed
2023-12-01 10:17:12 INFO User logout: alice
2023-12-01 10:18:33 WARNING High memory usage: 85%
"""

# Extract log levels and messages
log_pattern = re.compile(r"(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) (\\w+) (.+)")

for line in log_data.strip().split('\\n'):
    match = log_pattern.search(line)
    if match:
        timestamp, level, message = match.groups()
        print(f"[{level}] {timestamp}: {message}")
\`\`\`

### **CSV Data Validation**
\`\`\`python
def validate_csv_row(row):
    # Pattern for: Name,Age,City,Email
    pattern = r"^([^,]+),(\\d+),([^,]+),([\\w.-]+@[\\w.-]+\\.[\\w.]+)$"
    return bool(re.match(pattern, row))

csv_data = [
    "John Doe,30,New York,john@example.com",
    "Jane Smith,25,invalid@domain",  # Missing age
    "Bob Johnson,35,Chicago,bob@company.org"
]

for row in csv_data:
    if validate_csv_row(row):
        print(f"Valid: {row}")
    else:
        print(f"Invalid: {row}")
\`\`\`

### **Code Analysis**
\`\`\`python
code = '''
def calculate_total(price, tax_rate=0.08):
    """Calculate total with tax"""
    subtotal = price * (1 + tax_rate)
    return round(subtotal, 2)

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, name, price):
        self.items.append({"name": name, "price": price})
'''

# Find function definitions
functions = re.findall(r"def (\\w+)\\([^)]*\\):", code)
print(f"Functions: {functions}")

# Find class definitions
classes = re.findall(r"class (\\w+)", code)
print(f"Classes: {classes}")

# Find docstrings
docstrings = re.findall(r'"""([^"]*)"""', code, re.DOTALL)
print(f"Docstrings: {docstrings}")
\`\`\`

---

## 🎯 Best Practices

### **Performance Tips**
\`\`\`python
import re

# ✅ Compile patterns for repeated use
email_pattern = re.compile(r"^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$")

# ❌ Avoid compiling for one-time use (unless very complex)
result = re.search(r"simple", text)  # Fine for simple patterns

# ✅ Use raw strings for patterns
pattern = r"\\d{3}-\\d{2}-\\d{4}"  # Good

# ❌ Don't use regular strings (may need extra escaping)
pattern = "\\\\d{3}-\\\\d{2}-\\\\d{4}"  # Confusing

# ✅ Be specific with patterns
specific = re.findall(r"\\b(cat|dog|bird)\\b", text)  # Better
vague = re.findall(r"\\w+", text)  # May match unwanted text
\`\`\`

### **Common Pitfalls**
\`\`\`python
# ❌ Greedy matching by default
text = "<div>content</div><div>more</div>"
bad = re.search(r"<div>.*</div>", text)
print(bad.group())  # Matches too much: <div>content</div><div>more</div>

# ✅ Use non-greedy matching
good = re.search(r"<div>.*?</div>", text)
print(good.group())  # Matches correctly: <div>content</div>

# ❌ Forgetting word boundaries
text = "cat category catalog"
bad_matches = re.findall(r"cat", text)  # ['cat', 'cat', 'cat']
print(bad_matches)

# ✅ Using word boundaries
good_matches = re.findall(r"\\bcat\\b", text)  # ['cat']
print(good_matches)
\`\`\`

---

## 🚀 Advanced Techniques

### **Lookahead and Lookbehind**
\`\`\`python
text = "price: $100, cost: $50, value: $200"

# Positive lookahead (?<=...)
# Find dollar amounts that follow "price:"
price_pattern = r"(?<=price: \\$)\\d+"
prices = re.findall(price_pattern, text)
print(prices)  # ['100']

# Negative lookahead (?!...)
# Find dollar amounts not followed by comma
no_comma_pattern = r"\\$\\d+(?!,)"
amounts = re.findall(no_comma_pattern, text)
print(amounts)  # ['100', '200']

# Positive lookbehind (?<=...)
# Find words that follow "the"
the_words = re.findall(r"(?<=the )\\w+", text)
print(the_words)  # [] (no matches in this text)

# Negative lookbehind (?<!...)
# Find dollar signs not preceded by "cost"
not_cost = re.findall(r"(?<!cost: )\\$", text)
print(not_cost)  # ['$'] (only the first one)
\`\`\`

### **Conditional Matching**
\`\`\`python
# (?(condition)yes-pattern|no-pattern)
# This is advanced and less commonly used
# Example: Match different patterns based on context

text = "file.txt file.backup file.temp"

# Match .txt or .backup, but not .temp
pattern = r"file\\.(txt|backup)"
matches = re.findall(pattern, text)
print(matches)  # ['txt', 'backup']
\`\`\`

---

## 🏆 Key Takeaways

1. **Regular expressions** are powerful for pattern matching and text processing
2. **Core functions**: \`search()\`, \`match()\`, \`findall()\`, \`sub()\`
3. **Metacharacters** provide flexible pattern matching
4. **Groups** enable capturing and backreferencing
5. **Flags** modify matching behavior
6. **Compilation** improves performance for repeated use
7. **Best practices** ensure maintainable and efficient regex code

**Regular expressions are essential for text processing, data validation, and parsing. Master them to become a more effective Python programmer! 🔍**`
};
