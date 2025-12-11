import { SubLesson } from '../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'C Development Environment Overview',
  status: 'completed',
  content: `# 🖥️ C Development Environment Overview

Understanding the tools and setup needed for C programming.

---

## 🔧 What You Need for C Development

### Core Components

#### 1. **C Compiler**
- **GCC (GNU Compiler Collection)** - Most popular, cross-platform
- **Clang** - Alternative compiler with better error messages
- **MSVC (Microsoft Visual C++)** - Windows-only, advanced features

#### 2. **Code Editor/IDE**
- **Visual Studio Code** - Free, lightweight, extensible
- **CLion** - Professional IDE with advanced features
- **Code::Blocks** - Beginner-friendly IDE
- **Vim/Emacs** - Command-line editors for power users

#### 3. **Build Tools**
- **Make** - Traditional build automation
- **CMake** - Modern cross-platform build system
- **Ninja** - Fast build system

#### 4. **Debugger**
- **GDB (GNU Debugger)** - Command-line debugger
- **LLDB** - Alternative debugger (comes with Clang)
- **Visual Studio Debugger** - Integrated debugging

### Operating System Support

#### Windows
- **MinGW-w64**: GCC port for Windows
- **MSYS2**: Unix-like environment with pacman package manager
- **Visual Studio Build Tools**: Microsoft's compiler toolchain

#### macOS
- **Command Line Tools for Xcode**: Apple's GCC/Clang distribution
- **Homebrew**: Package manager for additional tools
- **MacPorts**: Alternative package manager

#### Linux
- **Build Essentials**: Pre-installed on most distributions
- **Package Managers**: apt (Ubuntu/Debian), yum/dnf (Red Hat), pacman (Arch)

---

## 🏗️ Development Workflow

### 1. **Write Code**
\`\`\`c
// hello.c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    return 0;
}
\`\`\`

### 2. **Compile**
\`\`\`bash
# Basic compilation
gcc -o hello hello.c

# With warnings (recommended)
gcc -Wall -Wextra -o hello hello.c

# With debugging symbols
gcc -g -o hello hello.c
\`\`\`

### 3. **Run and Test**
\`\`\`bash
./hello
\`\`\`

### 4. **Debug if Needed**
\`\`\`bash
gdb ./hello
# Commands: run, break main, next, step, print variable
\`\`\`

---

## 📋 Prerequisites Checklist

### System Requirements
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: 1GB free space for compiler and tools
- **Permissions**: Administrator/sudo access for installation

### Skill Prerequisites
- **Basic computer usage** (file navigation, command line)
- **Understanding of programming concepts** (helpful but not required)
- **Patience for troubleshooting** (C can be challenging!)

---

## 🎯 Why GCC is Recommended

### GCC Advantages
- **Cross-platform**: Works on Windows, macOS, Linux
- **Free and open source**: No licensing costs
- **Industry standard**: Used in most C projects
- **Extensive documentation**: Well-documented
- **Active development**: Regular updates and improvements

### GCC vs Other Compilers

| Feature | GCC | Clang | MSVC |
|---------|-----|-------|------|
| Platforms | All major OS | All major OS | Windows |
| License | GPL | Apache/MIT | Proprietary |
| Error Messages | Good | Excellent | Good |
| Performance | Excellent | Excellent | Excellent |
| Learning Curve | Moderate | Moderate | Steep |

**Recommendation: Start with GCC - it's the most widely used and supported compiler for learning C.**

---

## 📚 Essential Development Concepts

### Compilation Process
1. **Preprocessing**: Header inclusion, macro expansion
2. **Compilation**: Convert C code to assembly
3. **Assembly**: Convert assembly to machine code
4. **Linking**: Combine with libraries to create executable

### File Extensions
- **.c**: C source code files
- **.h**: Header files (function declarations)
- **.o/.obj**: Object files (compiled but not linked)
- **(no extension)**: Executable files (Linux/macOS)
- **.exe**: Executable files (Windows)

### Common Compiler Flags
\`\`\`bash
-Wall          # Enable most warnings
-Wextra        # Enable extra warnings
-g             # Include debugging symbols
-O2            # Optimization level 2
-pedantic      # Strict ISO C compliance
-std=c99       # Use C99 standard
\`\`\`

---

## 🚀 Getting Started

Now that you understand what you need, let's proceed to platform-specific installation guides. Each platform has its own setup process, so follow the guide for your operating system.

**Ready to set up your C development environment? Choose your platform to continue!**

---

## 📖 Learning Path Forward

After setting up your environment, you'll learn:
- **Module 2**: Variables, data types, and basic I/O
- **Module 3**: Control structures and loops
- **Module 4**: Functions and modular programming
- **Module 5**: Arrays and strings
- **Module 6**: Pointers and memory management

Each module builds on the previous one, so take your time and practice regularly! 💪`
};
