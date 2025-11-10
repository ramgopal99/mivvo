import { SubLesson } from '../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'Setting Up C++ Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up C++ on Your Local Machine

Learn how to install C++ compilers, IDEs, and set up your development environment for modern C++ development.

---

## 📋 Prerequisites

Before installing C++, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation
- At least 2GB RAM, 4GB recommended

### macOS Requirements
- macOS 10.10 or later
- Command Line Tools for Xcode
- At least 4GB RAM

### Linux Requirements
- Most Linux distributions support C++ development
- GCC 7.0+ or Clang 5.0+
- Package manager access

---

## 🪟 Windows Installation

### Method 1: Visual Studio Community (Recommended)

1. **Download Visual Studio**
   - Visit [visualstudio.microsoft.com](https://visualstudio.microsoft.com/)
   - Download Visual Studio Community 2022 (free)

2. **Install with C++ workload**
   - Run installer
   - Select "Desktop development with C++"
   - Include optional components:
     - MSVC v143 build tools
     - Windows 10/11 SDK
     - C++ CMake tools

3. **Verify Installation**
   - Open Developer Command Prompt
   - Type: \`cl\` (shows MSVC compiler version)
   - Type: \`msbuild /version\` (shows build tools version)

### Method 2: MinGW-w64 (Alternative)

1. **Download MinGW-w64**
   - Visit [mingw-w64.org](https://mingw-w64.org/)
   - Download the latest installer
   - Choose x86_64 architecture

2. **Install MinGW-w64**
   - Run installer with default settings

3. **Add to PATH**
   - Add \`C:\\mingw64\\bin\` to system PATH

4. **Verify Installation**
   - Open Command Prompt
   - Type: \`g++ --version\`

---

## 🍎 macOS Installation

### Method 1: Xcode Command Line Tools (Recommended)

1. **Install Command Line Tools**
   \`\`\`bash
   xcode-select --install
   \`\`\`

2. **Verify Installation**
   \`\`\`bash
   clang++ --version
   g++ --version  # May need to install separately
   \`\`\`

### Method 2: Homebrew (Full Development Suite)

1. **Install Homebrew**
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

2. **Install GCC and LLVM**
   \`\`\`bash
   # Install GCC
   brew install gcc

   # Install LLVM (includes Clang)
   brew install llvm

   # Add to PATH (add to ~/.zshrc or ~/.bash_profile)
   export PATH="/usr/local/opt/llvm/bin:$PATH"
   \`\`\`

3. **Verify Installation**
   \`\`\`bash
   g++-12 --version  # GCC version
   clang++ --version # Clang version
   \`\`\`

---

## 🐧 Linux Installation

### Ubuntu/Debian

\`\`\`bash
# Update package list
sudo apt update

# Install build essentials and C++ standard library
sudo apt install build-essential
sudo apt install libstdc++-11-dev

# Install development tools
sudo apt install gdb valgrind
sudo apt install cmake ninja-build

# Install multiple compilers (optional)
sudo apt install clang clang-tools

# Verify installation
g++ --version
clang++ --version
cmake --version
\`\`\`

### CentOS/RHEL/Fedora

\`\`\`bash
# CentOS/RHEL 8+
sudo dnf groupinstall "Development Tools"
sudo dnf install gcc-c++ gdb cmake

# Fedora
sudo dnf groupinstall "C Development Tools and Libraries"
sudo dnf install gcc-c++ clang cmake

# Verify installation
g++ --version
clang++ --version
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S base-devel
sudo pacman -S gcc gdb cmake ninja

# Verify installation
g++ --version
cmake --version
\`\`\`

---

## 🆚 GCC vs Clang vs MSVC

### GCC (GNU Compiler Collection)
- **Most widely used** on Linux
- **Excellent C++ standard support**
- **Comprehensive warning system**
- **Free and open source**

### Clang (LLVM)
- **Faster compilation** times
- **Better error messages** and diagnostics
- **Used by Apple** and many projects
- **Memory efficient**

### MSVC (Microsoft Visual C++)
- **Best Windows integration**
- **Excellent debugger** and IDE integration
- **Proprietary** (free for open source)
- **Strong C++20 support**

**Use GCC for Linux learning, MSVC for Windows development!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose an IDE

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install C/C++ extensions:
   - "C/C++" by Microsoft
   - "CMake Tools" by Microsoft
   - "Code Runner"

#### Professional IDEs
- **Visual Studio** (Windows) - Industry standard
- **CLion** (Cross-platform) - JetBrains IDE
- **Qt Creator** - For Qt development
- **Code::Blocks** - Free, lightweight

### 2. Build Systems

#### CMake (Recommended)
\`\`\`cmake
# CMakeLists.txt
cmake_minimum_required(VERSION 3.16)
project(MyProject VERSION 1.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(myapp main.cpp)
\`\`\`

#### Make (Traditional)
\`\`\`makefile
# Makefile
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -O2

all: myprogram

myprogram: main.cpp
	$(CXX) $(CXXFLAGS) -o myprogram main.cpp

clean:
	rm -f myprogram
\`\`\`

---

## 🧪 Testing Your Setup

Create a modern C++ test program:

### Create hello.cpp
\`\`\`cpp
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::cout << "Hello, Modern C++!" << std::endl;

    // Test C++11 features
    auto numbers = std::vector<int>{3, 1, 4, 1, 5, 9, 2, 6};

    // C++11 range-based loop
    std::cout << "Numbers: ";
    for (auto num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    // C++ algorithm
    std::sort(numbers.begin(), numbers.end());
    std::cout << "Sorted: ";
    for (auto num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}
\`\`\`

### Compile and Run

#### Windows (MSVC)
\`\`\`bash
# Compile with MSVC
cl /std:c++17 /EHsc hello.cpp

# Run
hello.exe
\`\`\`

#### Windows/Linux/macOS (GCC/Clang)
\`\`\`bash
# Compile with GCC
g++ -std=c++17 -Wall -Wextra -o hello hello.cpp

# Or with Clang
clang++ -std=c++17 -Wall -Wextra -o hello hello.cpp

# Run
./hello
\`\`\`

**Expected Output:**
\`\`\`
Hello, Modern C++!
Numbers: 3 1 4 1 5 9 2 6
Sorted: 1 1 2 3 4 5 6 9
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "C++17 not supported" Error
\`\`\`bash
# Check compiler version
g++ --version

# Update compiler or use older standard
g++ -std=c++14 hello.cpp  # Use C++14 instead

# For very old compilers
g++ -std=c++11 hello.cpp  # Use C++11
\`\`\`

### "Undefined reference to std::cout" (GCC)
\`\`\`bash
# Link C++ standard library explicitly
g++ -std=c++17 -lstdc++ -o hello hello.cpp
\`\`\`

### MSVC: "cl is not recognized"
- Use "Developer Command Prompt for VS"
- Or run \`vcvarsall.bat\` in your command prompt
- Check if Visual Studio is properly installed

### Include Path Issues
\`\`\`bash
# GCC: Add include paths
g++ -I/path/to/includes -std=c++17 hello.cpp

# MSVC: Use /I flag
cl /I"path\to\includes" /std:c++17 hello.cpp
\`\`\`

---

## 🔧 Essential C++ Development Workflow

### 1. Write Modern C++ Code
\`\`\`cpp
// Use C++17 features
#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    auto numbers = std::vector<int>{3, 1, 4, 1, 5};
    std::sort(numbers.begin(), numbers.end());

    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;

    return 0;
}
\`\`\`

### 2. Compile with Modern Standards
\`\`\`bash
# GCC/Clang
g++ -std=c++17 -Wall -Wextra -Wpedantic -O2 -o program main.cpp

# MSVC
cl /std:c++17 /W4 /EHsc /O2 main.cpp
\`\`\`

### 3. Use Build Systems for Larger Projects
\`\`\`bash
# Create CMake project
mkdir build && cd build
cmake ..
make

# Run
./myprogram
\`\`\`

### 4. Debug When Needed
\`\`\`bash
# GDB (Linux/macOS)
gdb ./program
# (gdb) run
# (gdb) break main
# (gdb) next

# Visual Studio Debugger (Windows)
# F5 to start debugging
# F10 to step over
\`\`\`

---

## 📚 C++ Standards and Compiler Support

### C++ Standards Timeline
- **C++98/03**: Legacy standard
- **C++11**: Modern C++ begins
- **C++14**: Incremental improvements
- **C++17**: Major features (filesystem, optional, etc.)
- **C++20**: Coroutines, modules, ranges
- **C++23**: Latest features

### Compiler Standard Support
- **GCC**: Excellent support for all standards
- **Clang**: Fastest standard adoption
- **MSVC**: Good support, slower adoption

---

## 🎯 Development Best Practices

### Always Use Modern Standards
\`\`\`cpp
// ✅ Modern C++
auto result = std::vector<int>{1, 2, 3};
auto lambda = [](int x) { return x * 2; };

// ❌ Legacy C++
std::vector<int> result;
result.push_back(1);
result.push_back(2);
// etc.
\`\`\`

### Enable All Warnings
\`\`\`bash
# GCC/Clang
-Wall -Wextra -Wpedantic -Werror

# MSVC
/W4 /WX
\`\`\`

### Use RAII and Smart Pointers
\`\`\`cpp
// ✅ Modern memory management
#include <memory>

auto ptr = std::make_unique<int>(42);
// Automatic cleanup when out of scope

// ❌ Manual memory management (error-prone)
int* ptr = new int(42);
delete ptr; // Easy to forget!
\`\`\`

---

🎉 **Congratulations!** You now have a modern C++ development environment with support for C++11/14/17/20 features. Time to write some efficient, powerful C++ code! 🚀`
};
