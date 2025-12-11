import { SubLesson } from '../../../data/lessonsData';

export const topic_1_6: SubLesson = {
  id: 1.6,
  title: 'Setting Up Code Editor',
  status: 'completed',
  content: `# 🖥️ Setting Up Your Code Editor

Choose and configure a code editor for C programming with syntax highlighting, debugging, and productivity features.

---

## 🎯 Editor Requirements for C Development

### Essential Features
- **C syntax highlighting** - Color-coded keywords, functions, variables
- **Code completion** - Auto-complete function names and variables
- **Error detection** - Real-time syntax checking
- **Integrated terminal** - Run compilation commands
- **Debugging support** - Breakpoints, variable inspection

### Nice-to-Have Features
- **Project management** - File tree, multiple files
- **Version control integration** - Git support
- **Extensions marketplace** - Additional plugins
- **Customizable themes** - Personal preference
- **Multi-platform** - Works on your operating system

---

## 🏆 Recommended Editors

### 1. **Visual Studio Code (VS Code)** ⭐⭐⭐⭐⭐

**Best for beginners and professionals alike**

#### Installation
1. **Download**
   - Visit [code.visualstudio.com](https://code.visualstudio.com)
   - Download for your platform (Windows/macOS/Linux)

2. **Install**
   - Run the installer
   - Follow default installation options

#### C/C++ Setup
1. **Install C/C++ Extension**
   - Open VS Code
   - Click Extensions icon (left sidebar)
   - Search for "C/C++"
   - Install "C/C++" by Microsoft

2. **Install Code Runner Extension** (Optional)
   - Search for "Code Runner"
   - Install for quick program execution

#### Configuration
Create a simple C program to test:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello from VS Code!\\n");
    return 0;
}
\`\`\`

**Compile and run:**
- Press \`Ctrl+Shift+P\` (or \`Cmd+Shift+P\` on Mac)
- Type "C/C++: Build and debug active file"
- Or use Code Runner: \`Ctrl+Alt+N\`

#### VS Code Advantages
- **Free and lightweight**
- **Excellent C/C++ support**
- **Integrated terminal**
- **Thousands of extensions**
- **Git integration built-in**

---

### 2. **Code::Blocks** ⭐⭐⭐⭐

**Beginner-friendly IDE specifically for C/C++**

#### Installation
1. **Download**
   - Visit [codeblocks.org](https://codeblocks.org/)
   - Download the version with MinGW (Windows) or appropriate for your OS

2. **Install**
   - Run the installer
   - Include MinGW compiler if prompted

#### Features
- **One-click compilation and execution**
- **Built-in debugger**
- **Project management**
- **Template projects**

#### Code::Blocks Advantages
- **Specifically designed for C/C++**
- **No complex setup required**
- **Perfect for beginners**
- **Lightweight**

---

### 3. **CLion** ⭐⭐⭐⭐⭐

**Professional IDE with advanced features**

#### Installation
1. **Download**
   - Visit [jetbrains.com/clion](https://jetbrains.com/clion)
   - Download free trial or use student license

2. **Install**
   - Run the installer
   - Requires license (free for students/open source)

#### Features
- **Advanced code analysis**
- **Refactoring tools**
- **CMake integration**
- **Performance profiling**

#### CLion Advantages
- **Professional-grade tools**
- **Excellent debugging**
- **Code generation**
- **Cross-platform development**

---

### 4. **Vim/Neovim** ⭐⭐⭐⭐

**Command-line editor for power users**

#### Installation
- **Linux/macOS**: Usually pre-installed
- **Windows**: Install via MSYS2 or download from vim.org

#### C Development Setup
Create \`~/.vimrc\` with C development settings:

\`\`\`vim
syntax on
set number
set tabstop=4
set shiftwidth=4
set expandtab
set autoindent
set cindent

" C-specific settings
autocmd FileType c setlocal tabstop=4 shiftwidth=4 expandtab
autocmd FileType c setlocal commentstring=/*%s*/
\`\`\`

#### Vim Advantages
- **Extremely fast**
- **Available everywhere**
- **Highly customizable**
- **No mouse required**

---

## ⚙️ Editor Configuration

### Essential Settings for C Development

#### Tab and Indentation
- **Tab size**: 4 spaces
- **Use spaces**: Yes (not tabs)
- **Auto-indent**: Enabled

#### File Associations
- **.c files**: C source code
- **.h files**: C header files
- **Makefile**: Build configuration

#### Terminal Integration
- **Working directory**: Project root
- **Shell**: Your system's default shell

---

## 🔧 C Development Workflow

### 1. Create Project Structure
\`\`\`
my_c_project/
├── src/
│   ├── main.c
│   └── helper.c
├── include/
│   └── helper.h
└── Makefile
\`\`\`

### 2. Write Code with Features
- **Syntax highlighting** for keywords, functions, variables
- **Auto-completion** for standard library functions
- **Error underlining** for syntax mistakes

### 3. Compile and Debug
- **One-click compilation** (F5/F7 in most editors)
- **Breakpoint setting** (click line numbers)
- **Variable inspection** during debugging

### 4. Version Control
- **Git integration** for tracking changes
- **Commit frequently** with meaningful messages

---

## 🐛 Common Editor Issues

### VS Code: "Include errors detected"
**Solution**: Install C/C++ extension and reload window

### Code::Blocks: "Compiler not found"
**Solution**: Set compiler path in Settings → Compiler

### Vim: No syntax highlighting
**Solution**: Add \`syntax on\` to ~/.vimrc

### General: Encoding issues
**Solution**: Save files as UTF-8 without BOM

---

## 📁 Recommended Project Structure

### Simple Program
\`\`\`
hello_world/
└── hello.c
\`\`\`

### Multi-file Program
\`\`\`
calculator/
├── main.c
├── calculator.c
├── calculator.h
└── Makefile
\`\`\`

### Large Project
\`\`\`
my_project/
├── src/
├── include/
├── tests/
├── docs/
└── Makefile
\`\`\`

---

## 🚀 Advanced Editor Features

### Code Snippets
Create reusable code templates for common C constructs.

### Linting
Use tools like \`cppcheck\` for static analysis.

### Formatting
Tools like \`clang-format\` for consistent code style.

### Build Systems
- **Make** for simple projects
- **CMake** for complex projects
- **Ninja** for fast builds

---

## 📚 Learning Resources

### VS Code
- [C/C++ Extension Documentation](https://code.visualstudio.com/docs/languages/cpp)
- [VS Code Tips and Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)

### Code::Blocks
- [Code::Blocks Wiki](https://wiki.codeblocks.org/)
- [Getting Started Guide](https://www.codeblocks.org/user-manual/)

### Vim
- [Vim C Development](https://vim.fandom.com/wiki/C_development)
- [Learn Vim Progressively](https://yannesposito.com/Scratch/en/blog/Learn-Vim-Progressively/)

---

## 🎯 Choosing the Right Editor

### For Beginners
- **VS Code** - Easy to learn, powerful features
- **Code::Blocks** - C/C++ focused, simple interface

### For Intermediate Users
- **CLion** - Professional tools, advanced features
- **VS Code** - Extensible, customizable

### For Advanced Users
- **Vim/Neovim** - Fast, efficient, highly customizable
- **Emacs** - Extensible editor with C modes

**Start with VS Code if you're unsure - it's the most beginner-friendly while being professional-grade!**

---

## 🧪 Testing Your Setup

Create and run this test program in your chosen editor:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    printf("My editor is set up correctly!\\n");
    printf("Ready to start learning C! 🚀\\n");
    return 0;
}
\`\`\`

**Congratulations! Your C development environment is complete. Time to start coding! 🎉**`
};
