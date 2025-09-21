import { SubLesson } from '../../../data/lessonsData';

export const topic_8_5: SubLesson = {
  id: 8.5,
  title: 'Input/Output Functions',
  status: 'demo',
  content: `# 💬 Input/Output Functions

Functions for interacting with users and the outside world!

---

## 🎯 Basic I/O Functions

### **print() - Display Output**
\`\`\`python
# Basic printing
print("Hello, World!")          # Hello, World!
print(42)                       # 42
print(3.14)                     # 3.14

# Multiple arguments
print("Name:", "Alice", "Age:", 25)  # Name: Alice Age: 25

# Custom separator
print("apple", "banana", "cherry", sep=", ")  # apple, banana, cherry

# Custom end character
print("Hello", end=" ")         # No newline
print("World!")                 # Hello World!

# File output
with open("output.txt", "w") as f:
    print("Hello, file!", file=f)
\`\`\`

### **input() - Get User Input**
\`\`\`python
# Basic input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Input with validation
while True:
    age_str = input("Enter your age: ")
    if age_str.isdigit():
        age = int(age_str)
        break
    print("Please enter a valid number.")

print(f"You are {age} years old.")

# Multiple inputs
data = input("Enter numbers separated by spaces: ").split()
numbers = [int(x) for x in data]
print(f"You entered: {numbers}")
\`\`\`

---

## 📁 File I/O Functions

### **open() - Open Files**
\`\`\`python
# Reading text file
with open("example.txt", "r") as file:
    content = file.read()
    print("File content:", content)

# Writing to file
with open("output.txt", "w") as file:
    file.write("Hello, file!")
    file.write("This is line 2.")

# Appending to file
with open("output.txt", "a") as file:
    file.write("This is appended.")

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print("Line:", line.strip())
\`\`\`

### **File Modes**
\`\`\`python
# Common file modes:
# "r"  - read (default)
# "w"  - write (truncates file)
# "a"  - append
# "x"  - exclusive creation (fails if file exists)
# "b"  - binary mode
# "t"  - text mode (default)

# Binary file operations
with open("image.jpg", "rb") as f:
    data = f.read()
    print(f"Read {len(data)} bytes")
\`\`\`

---

## 🎨 Practical Examples

### **Interactive Calculator**
\`\`\`python
def calculator():
    """Simple interactive calculator."""
    print("Welcome to Calculator!")
    print("Operations: +, -, *, /")

    while True:
        try:
            # Get input
            operation = input("Enter operation (+, -, *, /) or 'quit': ").strip()

            if operation.lower() == 'quit':
                print("Goodbye!")
                break

            if operation not in ['+', '-', '*', '/']:
                print("Invalid operation. Try again.")
                continue

            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))

            # Perform calculation
            if operation == '+':
                result = num1 + num2
            elif operation == '-':
                result = num1 - num2
            elif operation == '*':
                result = num1 * num2
            elif operation == '/':
                if num2 == 0:
                    print("Cannot divide by zero!")
                    continue
                result = num1 / num2

            print(f"{num1} {operation} {num2} = {result}")

        except ValueError:
            print("Invalid number. Please try again.")
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break

# Uncomment to run: calculator()
\`\`\`

### **File Text Processor**
\`\`\`python
def process_text_file(input_file, output_file):
    """Process text file and create summary."""
    try:
        with open(input_file, "r") as infile:
            content = infile.read()

        # Analyze content
        lines = content.split('\n')
        words = content.split()
        chars = len(content)

        # Create summary
        summary = f"""
Text Analysis Summary
====================
Lines: {len(lines)}
Words: {len(words)}
Characters: {chars}
Average words per line: {len(words)/len(lines):.1f}

Word frequency (top 5):
"""

        # Count word frequency
        word_count = {}
        for word in words:
            word = word.lower().strip('.,!?')
            if word:
                word_count[word] = word_count.get(word, 0) + 1

        # Get top 5 words
        top_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)[:5]
        for word, count in top_words:
            summary += f"{word}: {count}\n"

        # Write summary
        with open(output_file, "w") as outfile:
            outfile.write(summary)

        print(f"Summary written to {output_file}")

    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
    except Exception as e:
        print(f"Error: {e}")

# Example usage:
# Create sample text file first
with open("sample.txt", "w") as f:
    f.write("Hello world! This is a sample text file.\\nIt contains multiple lines.\\nThe quick brown fox jumps over the lazy dog.")

# process_text_file("sample.txt", "summary.txt")
\`\`\`

### **Simple File Reading**
\`\`\`python
# Read a config file
with open("config.txt", "r") as f:
    for line in f:
        if not line.startswith('#'):  # Skip comments
            print(line.strip())
\`\`\`

### **Simple Output**
\`\`\`python
# Print progress messages
for i in range(1, 11):
    print(f"Processing item {i}/10")
    # Do some work here
print("All items processed!")
\`\`\`

---

## ⚠️ Best Practices

### **File Handling**
\`\`\`python
# Always use 'with' statement for files
# ✅ Good
with open("file.txt", "r") as f:
    content = f.read()

# ❌ Bad - may not close file properly
f = open("file.txt", "r")
content = f.read()
f.close()  # Easy to forget!
\`\`\`

### **Input Validation**
\`\`\`python
# Always validate user input
def get_positive_number(prompt):
    while True:
        try:
            value = float(input(prompt))
            if value > 0:
                return value
            print("Please enter a positive number.")
        except ValueError:
            print("Please enter a valid number.")

age = get_positive_number("Enter your age: ")
\`\`\`

### **Error Handling**
\`\`\`python
# Handle file operations gracefully
def safe_read_file(filename):
    try:
        with open(filename, "r") as f:
            return f.read()
    except FileNotFoundError:
        return f"Error: File '{filename}' not found."
    except PermissionError:
        return f"Error: No permission to read '{filename}'."
    except Exception as e:
        return f"Error: {e}"

content = safe_read_file("data.txt")
print(content)
\`\`\`

I/O functions connect your programs to the outside world! 🌍`
};
