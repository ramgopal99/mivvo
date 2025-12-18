import { SubLesson } from '../../../data/lessonsData';

export const topic_17_1: SubLesson = {
  id: 17.1,
  title: 'File Input/Output Operations',
  status: 'demo',
  content: `# 📁 File Input/Output Operations in Python

File operations are fundamental to most Python applications. Whether reading configuration files, processing data, or logging information, understanding file I/O is crucial for robust Python programming. This topic covers comprehensive file handling techniques, best practices, and advanced operations.

---

## 🎯 Understanding File Operations

### **File Modes**
Python provides various file modes for different operations:

| Mode | Description | Use Case |
|------|-------------|----------|
| \`'r'\` | Read (default) | Reading existing files |
| \`'w'\` | Write | Creating/overwriting files |
| \`'a'\` | Append | Adding to existing files |
| \`'x'\` | Exclusive creation | Creating new files only |
| \`'r+'\` | Read and write | Reading and modifying |
| \`'w+'\` | Write and read | Creating/overwriting with read capability |
| \`'a+'\` | Append and read | Appending with read capability |
| \`'rb'\` | Binary read | Reading binary files |
| \`'wb'\` | Binary write | Writing binary files |

### **Text vs Binary Modes**
\`\`\`python
# Text mode (default) - handles encoding
with open('file.txt', 'r') as f:
    text = f.read()  # Returns string

# Binary mode - handles raw bytes
with open('file.bin', 'rb') as f:
    data = f.read()  # Returns bytes object
\`\`\`

---

## 💻 Reading Files

### **Reading Files**
\`\`\`python
# Read entire file
with open('file.txt', 'r') as file:
    content = file.read()
    print(content)

# Read line by line
with open('file.txt', 'r') as file:
    for line in file:
        print(line.strip())
\`\`\`

---

## ✍️ Writing Files

### **Writing Files**
\`\`\`python
# Write to file
with open('file.txt', 'w') as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# Append to file
with open('file.txt', 'a') as file:
    file.write("This is added to the end\n")
\`\`\`

---

## 🔄 Advanced File Operations

### **File Position and Seeking**
\`\`\`python
with open('example.txt', 'r+') as file:
    # Get current position
    position = file.tell()
    print(f"Current position: {position}")

    # Read first 10 characters
    content = file.read(10)
    print(f"Read: {content}")

    # Seek to position 5
    file.seek(5)
    content = file.read(5)
    print(f"From position 5: {content}")

    # Seek from end
    file.seek(-10, 2)  # 10 characters from end
    content = file.read()
    print(f"Last 10 chars: {content}")
\`\`\`

### **Working with Binary Files**
\`\`\`python
# Writing binary data
data = bytes([0x41, 0x42, 0x43])  # ABC in bytes
with open('binary.bin', 'wb') as file:
    file.write(data)

# Reading binary data
with open('binary.bin', 'rb') as file:
    binary_data = file.read()
    print(binary_data)  # b'ABC'
    print(binary_data.hex())  # 414243

# Copying binary files
def copy_binary_file(source, destination):
    with open(source, 'rb') as src, open(destination, 'wb') as dst:
        while chunk := src.read(4096):  # Read in chunks
            dst.write(chunk)
\`\`\`

### **Memory-Mapped Files**
\`\`\`python
import mmap

# Memory-map a file for efficient access
with open('large_file.txt', 'r') as file:
    with mmap.mmap(file.fileno(), 0, access=mmap.ACCESS_READ) as mapped:
        # File content is now in memory
        print(mapped[0:50])  # First 50 bytes

        # Search in memory-mapped file
        position = mapped.find(b'pattern')
        if position != -1:
            print(f"Pattern found at position {position}")
\`\`\`

---

## 🛡️ Error Handling and Best Practices

### **Error Handling**
\`\`\`python
# Handle file errors
try:
    with open('file.txt', 'r') as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("File not found!")
except IOError:
    print("Error reading file!")
\`\`\`

---

## 🎯 Best Practices

### **File Handling Tips**
\`\`\`python
# Always use 'with' to automatically close files
with open('file.txt', 'r') as file:
    content = file.read()

# Handle errors
try:
    with open('file.txt', 'r') as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")
\`\`\`

---

## 🚀 Key Takeaways

1. **Context managers** (\`with\` statement) ensure proper resource cleanup
2. **File modes** determine read/write behavior and text/binary handling
3. **Encoding** matters - always specify \`encoding='utf-8'\`
4. **Error handling** prevents crashes from file system issues
5. **Path operations** should use \`pathlib\` for cross-platform compatibility
6. **Large files** should be processed in chunks to avoid memory issues
7. **Binary files** require \`'rb'\`/\`'wb'\` modes and bytes handling
8. **Temporary files** are useful for intermediate data processing

**Mastering file I/O operations is essential for building robust, efficient Python applications that can handle real-world data processing tasks! 📁**`
};
