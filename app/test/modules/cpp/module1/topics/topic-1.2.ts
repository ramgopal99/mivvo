import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: "1.2",
  title: 'Setting Up C++ Development Environment',
  status: 'completed',
  content: `\`# 🛠️ Setting Up Your C++ Development Environment

Setting up C++ can be challenging for beginners, but don't worry! We'll guide you through the entire process step by step for Windows, macOS, and Linux.

---

## 🔧 What You Need

### **Essential Tools**
1. **C++ Compiler** - Converts your code to executable programs
2. **IDE/Text Editor** - Where you'll write your code
3. **Build System** - Manages compilation and linking

### **Optional but Recommended**
- **Version Control** (Git)
- **Package Manager** (vcpkg, Conan)
- **Debugging Tools**

---

## 🪟 Windows Setup

### **Method 1: Visual Studio (Recommended for Windows)**

#### **Step 1: Download Visual Studio**
- Visit [visualstudio.microsoft.com](https://visualstudio.microsoft.com)
- Download **Visual Studio 2022 Community** (free)
- File size: ~2GB, so grab a coffee! ☕

#### **Step 2: Installation**
1. **Run the installer**
2. **Select "Desktop development with C++"** workload
3. **Additional components to include:**
   - MSVC v143 build tools
   - Windows 10/11 SDK
   - C++ CMake tools
   - C++ ATL for latest build tools

#### **Step 3: Verify Installation**
\`\`\`batch
# Open Developer Command Prompt
# Type these commands:

cl /?
# Should show Microsoft C++ compiler info

# Create a test file
notepad hello.cpp
\`\`\`

**hello.cpp content:**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++ on Windows! 🪟" << std::endl;
    return 0;
}
\`\`\`

**Compile and run:**
\`\`\`batch
# Compile
cl hello.cpp

# Run
hello.exe
\`\`\`

---

### **Method 2: MinGW-w64 (Lightweight Alternative)**

#### **Step 1: Download MinGW-w64**
- Visit [mingw-w64.org](https://mingw-w64.org)
- Download the latest installer
- Choose **x86_64** architecture

#### **Step 2: Installation**
1. **Run installer** as Administrator
2. **Installation directory**: \`C:\\mingw64\` (recommended)
3. **Select components:**
   - mingw32-gcc-g++ (C++ compiler)
   - mingw32-gcc (C compiler)

#### **Step 3: Add to PATH**
1. **Search for "Environment Variables"**
2. **System Properties → Advanced → Environment Variables**
3. **Find "Path" in System variables**
4. **Add**: \`C:\\mingw64\\bin\`

#### **Step 4: Verify Installation**
\`\`\`batch
# Open Command Prompt
g++ --version
# Should show g++ version

# Compile test program
g++ hello.cpp -o hello.exe
hello.exe
\`\`\`

---

## 🍎 macOS Setup

### **Method 1: Xcode Command Line Tools (Recommended)**

#### **Step 1: Install Command Line Tools**
\`\`\`bash
# Open Terminal and run:
xcode-select --install
\`\`\`

This installs:
- **Clang** C/C++ compiler
- **Git** version control
- **Make** build system

#### **Step 2: Verify Installation**
\`\`\`bash
# Check compiler
clang++ --version

# Test compilation
clang++ hello.cpp -o hello
./hello
\`\`\`

---

### **Method 2: Homebrew + GCC**

#### **Step 1: Install Homebrew**
\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

#### **Step 2: Install GCC**
\`\`\`bash
# Install GCC (includes g++)
brew install gcc

# Check installation
g++-12 --version  # Version number may vary
\`\`\`

#### **Step 3: Create Alias (Optional)**
Add to your \`~/.zshrc\` or \`~/.bash_profile\`:
\`\`\`bash
# Use GCC instead of Clang
alias g++='g++-12'
alias gcc='gcc-12'
\`\`\`

---

## 🐧 Linux Setup

### **Ubuntu/Debian**

#### **Step 1: Update Package List**
\`\`\`bash
sudo apt update
\`\`\`

#### **Step 2: Install Build Essentials**
\`\`\`bash
sudo apt install build-essential

# This installs:
# - gcc (C compiler)
# - g++ (C++ compiler)
# - make (build system)
# - gdb (debugger)
\`\`\`

#### **Step 3: Verify Installation**
\`\`\`bash
# Check versions
g++ --version
gcc --version
make --version
\`\`\`

---

### **CentOS/RHEL/Fedora**

#### **CentOS/RHEL**
\`\`\`bash
sudo yum groupinstall "Development Tools"
# or for newer versions:
sudo dnf groupinstall "Development Tools"
\`\`\`

#### **Fedora**
\`\`\`bash
sudo dnf install gcc-c++
\`\`\`

---

### **Arch Linux**
\`\`\`bash
sudo pacman -S gcc
\`\`\`

---

## 🖥️ Choosing an IDE/Text Editor

### **Beginner-Friendly IDEs**

#### **Visual Studio Code (Recommended)**
\`\`\`bash
# Download from: code.visualstudio.com

# Install C++ extensions:
# 1. C/C++ by Microsoft
# 2. C++ IntelliSense
# 3. Code Runner
\`\`\`

**VS Code Settings for C++:**
\`\`\`json
{
    "C_Cpp.default.compilerPath": "g++",
    "C_Cpp.default.cppStandard": "c++17",
    "code-runner.executorMap": {
        "cpp": "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir$fileNameWithoutExt"
    }
}
\`\`\`

#### **Visual Studio (Windows Only)**
- Best IDE for Windows C++ development
- Integrated debugger and IntelliSense
- Free Community edition available

#### **Code::Blocks**
- Lightweight, cross-platform
- Built-in compiler integration
- Perfect for beginners

---

### **Advanced IDEs**

#### **CLion (JetBrains)**
- Professional C++ IDE
- Excellent code analysis
- CMake integration
- Paid software

#### **Qt Creator**
- Great for Qt framework development
- Free and open source

---

## ⚙️ Build Systems & Project Management

### **Make (Traditional)**
**Makefile example:**
\`\`\`makefile
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra
TARGET = myprogram
SRC = main.cpp utils.cpp
OBJ = $(SRC:.cpp=.o)

$(TARGET): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJ)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $<

clean:
	rm -f $(OBJ) $(TARGET)

.PHONY: clean
\`\`\`

**Usage:**
\`\`\`bash
make        # Build program
make clean  # Clean build files
\`\`\`

---

### **CMake (Modern, Cross-platform)**
**CMakeLists.txt example:**
\`\`\`cmake
cmake_minimum_required(VERSION 3.16)
project(MyProject VERSION 1.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(myprogram main.cpp utils.cpp)
\`\`\`

**Build process:**
\`\`\`bash
mkdir build
cd build
cmake ..
make
\`\`\`

---

## 🧪 Testing Your Setup

### **Create Test Program**
**hello.cpp:**
\`\`\`cpp
#include <iostream>
#include <vector>
#include <string>

int main() {
    std::cout << "🎉 C++ Development Environment Ready!" << std::endl;
    std::cout << "C++ Standard: " << __cplusplus << std::endl;

    // Test basic features
    std::vector<std::string> features = {
        "Variables & Data Types",
        "Control Flow",
        "Functions",
        "Classes & Objects",
        "STL Containers",
        "File I/O"
    };

    std::cout << "\\n🚀 Ready to learn:" << std::endl;
    for (size_t i = 0; i < features.size(); ++i) {
        std::cout << i + 1 << ". " << features[i] << std::endl;
    }

    return 0;
}
\`\`\`

### **Compilation Commands**

#### **Windows (Visual Studio)**
\`\`\`batch
# Debug build
cl /EHsc /Zi hello.cpp

# Release build
cl /EHsc /O2 hello.cpp
\`\`\`

#### **Windows (MinGW)**
\`\`\`batch
g++ hello.cpp -o hello.exe
hello.exe
\`\`\`

#### **macOS/Linux**
\`\`\`bash
# Compile
g++ -std=c++17 -Wall -Wextra hello.cpp -o hello

# Run
./hello
\`\`\`

---

## 🔧 Compiler Flags Explained

### **Essential Flags**
- **\`-std=c++17\`**: Use C++17 standard
- **\`-Wall\`**: Enable all warnings
- **\`-Wextra\`**: Extra warnings
- **\`-Werror\`**: Treat warnings as errors
- **\`-O2\`**: Optimization level 2
- **\`-g\`**: Include debug information

### **Example Compilation**
\`\`\`bash
# Full compilation command
g++ -std=c++17 -Wall -Wextra -Werror -O2 -g hello.cpp -o hello
\`\`\`

---

## 🐛 Debugging Setup

### **GDB (GNU Debugger)**
\`\`\`bash
# Compile with debug info
g++ -g -std=c++17 hello.cpp -o hello

# Start debugging
gdb hello

# GDB commands:
# run          - Start program
# break main   - Set breakpoint
# step         - Step into function
# next         - Step over function
# print var    - Print variable value
# quit         - Exit debugger
\`\`\`

### **VS Code Debugging**
**launch.json:**
\`\`\`json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "g++ build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "\${fileDirname}/\${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "\${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "/usr/bin/gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "g++ build active file"
        }
    ]
}
\`\`\`

---

## 📚 Project Structure Best Practices

### **Basic Project Layout**
\`\`\`text
myproject/
├── src/           # Source files (.cpp)
├── include/       # Header files (.hpp/.h)
├── build/         # Build output
├── CMakeLists.txt # Build configuration
└── README.md      # Documentation
\`\`\`

### **Advanced Project Layout**
\`\`\`text
myproject/
├── src/
│   ├── main.cpp
│   └── core/
├── include/
│   └── myproject/
├── tests/
├── docs/
├── scripts/
├── CMakeLists.txt
├── .gitignore
└── README.md
\`\`\`

---

## 🎯 Next Steps

### **Start Coding!**
1. **Create your first program** (hello.cpp)
2. **Experiment with basic syntax**
3. **Learn about variables and data types**
4. **Practice control flow statements**

### **Learning Resources**
- **C++ Reference**: [cppreference.com](https://cppreference.com)
- **LearnCpp.com**: Free C++ tutorials
- **C++ Core Guidelines**: [github.com/isocpp/CppCoreGuidelines](https://github.com/isocpp/CppCoreGuidelines)

### **Practice Platforms**
- **LeetCode**: Algorithm practice
- **CodeChef**: Competitive programming
- **HackerRank**: Skill development

---

## ❗ Troubleshooting Common Issues

### **"g++ command not found"**
**Solution:** Add compiler to PATH or reinstall

### **Compilation Errors**
**Check:**
- Correct file extension (.cpp)
- Proper syntax
- Include necessary headers

### **Runtime Errors**
**Debug steps:**
1. Add debug prints
2. Use debugger (gdb)
3. Check memory management

### **IDE Issues**
- **VS Code**: Check C++ extension installation
- **Visual Studio**: Repair installation
- **Code::Blocks**: Reconfigure compiler paths

---

**🎉 Congratulations!** Your C++ development environment is now ready. Time to start building amazing programs! 🚀\``
};