import { SubLesson } from '../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'Setting Up C Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up C on Your Local Machine

Learn how to install C compilers and set up your development environment for coding.

---

## 📋 Prerequisites

Before installing C, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation

### macOS Requirements
- macOS 10.10 or later
- Command Line Tools for Xcode

### Linux Requirements
- Most Linux distributions support C development
- Package manager access (apt, yum, etc.)

---

## 🪟 Windows Installation

### Method 1: MinGW-w64 (Recommended)

MinGW-w64 provides GCC (GNU Compiler Collection) for Windows:

1. **Download MinGW-w64**
   - Visit [mingw-w64.org](https://mingw-w64.org/)
   - Download the latest installer
   - Choose the appropriate architecture (x86_64 for 64-bit)

2. **Install MinGW-w64**
   - Run the installer
   - Choose installation directory (default is fine)
   - Select components to install (GCC is essential)

3. **Add to PATH**
   - Search for "Environment Variables" in Windows search
   - Click "Edit the system environment variables"
   - Click "Environment Variables" button
   - Find "Path" in System variables and click "Edit"
   - Add: \`C:\\mingw64\\bin\` (adjust path if different)

4. **Verify Installation**
   - Open Command Prompt
   - Type: \`gcc --version\`
   - Type: \`g++ --version\` (for C++)

### Method 2: Visual Studio Build Tools

For advanced development:

1. **Download Visual Studio**
   - Visit [visualstudio.microsoft.com](https://visualstudio.microsoft.com/)
   - Download Visual Studio Community (free)

2. **Install with C++ workload**
   - Run installer
   - Select "Desktop development with C++"
   - Install

3. **Verify Installation**
   - Open Developer Command Prompt
   - Type: \`cl\` (Microsoft C/C++ compiler)

---

## 🍎 macOS Installation

### Method 1: Command Line Tools (Recommended)

1. **Install Xcode Command Line Tools**
   \`\`\`bash
   xcode-select --install
   \`\`\`

2. **Verify Installation**
   \`\`\`bash
   gcc --version
   clang --version
   \`\`\`

### Method 2: Homebrew (Alternative)

1. **Install Homebrew** (if not installed):
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

2. **Install GCC**:
   \`\`\`bash
   brew install gcc
   \`\`\`

---

## 🐧 Linux Installation

### Ubuntu/Debian

\`\`\`bash
# Update package list
sudo apt update

# Install build essentials (includes GCC)
sudo apt install build-essential

# Install additional development tools
sudo apt install gdb valgrind

# Verify installation
gcc --version
make --version
gdb --version
\`\`\`

### CentOS/RHEL/Fedora

\`\`\`bash
# CentOS/RHEL
sudo yum groupinstall "Development Tools"

# Fedora
sudo dnf groupinstall "Development Tools"

# Verify installation
gcc --version
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S base-devel
gcc --version
\`\`\`

---

## 🆚 GCC vs Clang

### GCC (GNU Compiler Collection)
- **Default choice** for Linux development
- **Most compatible** with existing code
- **Extensive features** and optimizations
- **Primary compiler** for most C projects

### Clang (LLVM)
- **Faster compilation** times
- **Better error messages** and diagnostics
- **Memory efficient** compiler
- **Default on macOS** and some BSD systems

**Use GCC for learning and most projects!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose a Code Editor

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install C/C++ extensions:
   - "C/C++" by Microsoft
   - "Code Runner" for quick execution

#### Other Popular Options
- Vim/Emacs with plugins
- Sublime Text
- CLion (Professional IDE)
- Code::Blocks (Beginner-friendly)

### 2. Essential Development Tools

#### Compiler Flags (Important!)
\`\`\`bash
# Basic compilation
gcc -o program program.c

# With warnings (ALWAYS USE!)
gcc -Wall -Wextra -o program program.c

# With debugging symbols
gcc -g -o program program.c

# Optimized build
gcc -O2 -o program program.c
\`\`\`

#### Build Systems
- **Make**: Traditional build automation
- **CMake**: Modern cross-platform build system
- **Autotools**: For complex projects

---

## 🧪 Testing Your Setup

Create a simple test program to verify everything works:

### Create hello.c
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    printf("Welcome to systems programming!\\n");
    return 0;
}
\`\`\`

### Compile and Run

#### Windows (MinGW)
\`\`\`bash
# Compile
gcc -Wall -o hello hello.c

# Run
hello.exe
\`\`\`

#### macOS/Linux
\`\`\`bash
# Compile
gcc -Wall -o hello hello.c

# Run
./hello
\`\`\`

**Expected Output:**
\`\`\`
Hello, C!
Welcome to systems programming!
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "gcc command not found" (Windows)
- Check if MinGW bin directory is in PATH
- Reinstall MinGW and add to PATH manually
- Use full path: \`C:\\mingw64\\bin\\gcc.exe\`

### Permission Errors (macOS/Linux)
\`\`\`bash
# Check permissions
ls -la hello

# Make executable if needed
chmod +x hello

# Run with full path
./hello
\`\`\`

### Compilation Errors
\`\`\`bash
# Enable all warnings
gcc -Wall -Wextra -Werror -o program program.c

# Common fixes:
# - Missing semicolon: Add ; at end of line
# - Missing include: Add #include <header.h>
# - Wrong function name: Check spelling
\`\`\`

### "Undefined reference" Errors
- **Missing library**: Link with \`-l\` flag
- **Wrong order**: Put libraries after source files
- **Example**: \`gcc main.c -lm -o program\`

---

## 🔧 Essential C Development Workflow

### 1. Write Code
\`\`\`c
// hello.c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### 2. Compile with Warnings
\`\`\`bash
gcc -Wall -Wextra -g -o hello hello.c
\`\`\`

### 3. Run and Test
\`\`\`bash
./hello
\`\`\`

### 4. Debug if Needed
\`\`\`bash
gdb ./hello
# Inside GDB: run, break main, next, print variable
\`\`\`

### 5. Clean Up
\`\`\`bash
# Remove executable
rm hello

# Remove all executables
find . -name "*.exe" -delete  # Windows
find . -executable -type f -delete  # Linux/macOS
\`\`\`

---

## 📚 Recommended Learning Resources

### Books:
- **"The C Programming Language"** by Kernighan & Ritchie (K&R)
- **"C Primer Plus"** by Stephen Prata
- **"Expert C Programming"** by Peter van der Linden

### Online Resources:
- [Learn C Programming](https://www.programiz.com/c-programming)
- [C Reference](https://en.cppreference.com/w/c)
- [GNU C Manual](https://gcc.gnu.org/onlinedocs/gcc/)

---

🎉 **Congratulations!** You now have a complete C development environment. Time to start writing some efficient, powerful C code! 🚀`
};
