import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: "1.2",
  title: 'Setting Up C Environment',
  status: 'demo',
  content: `# 🛠️ Setting Up Your C Development Environment

In this lesson, you'll install a C compiler and a code editor, then write and run your **first C program**.

---

## 📋 What You Need

- A **C compiler** (GCC or Clang, or MSVC on Windows)
- A **code editor or IDE** (we'll recommend VS Code)
- A basic **terminal / command prompt**

---

## 🪟 Windows Setup

### Option 1: MinGW-w64 (GCC for Windows)

1. Go to the MinGW-w64 project page (e.g., via a trusted distribution like MSYS2 or winlib).
2. Download a **64-bit** version of GCC for Windows.
3. Install it to a simple path, for example:
   - \`"C:\\mingw-w64\\\`
4. Add the compiler's \`bin\` directory to your **PATH** (Environment Variables):
   - Example: \`C:\\mingw-w64\\bin\\\`

To verify:

\`\`\`bash
gcc --version
\`\`\`

You should see version information, not "command not found".

### Option 2: WSL (Windows Subsystem for Linux)

1. Enable **WSL** and install a Linux distribution (like Ubuntu) from the Microsoft Store.
2. Open the Linux terminal and install build tools:

\`\`\`bash
sudo apt update
sudo apt install build-essential
\`\`\`

3. Verify:

\`\`\`bash
gcc --version
\`\`\`

---

## 🍎 macOS Setup

### Option 1: Xcode Command Line Tools

1. Open Terminal.
2. Run:

\`\`\`bash
xcode-select --install
\`\`\`

3. Follow the prompts to install the command line tools (includes \`clang\`).

Verify:

\`\`\`bash
clang --version
\`\`\`

### Option 2: Homebrew + GCC

1. Install Homebrew (if you don't have it):

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

2. Install GCC:

\`\`\`bash
brew install gcc
\`\`\`

3. Verify:

\`\`\`bash
gcc --version
\`\`\`

---

## 🐧 Linux Setup

On most Linux distributions, you just need to install the build tools.

### Ubuntu / Debian

\`\`\`bash
sudo apt update
sudo apt install build-essential

gcc --version
\`\`\`

### Fedora

\`\`\`bash
sudo dnf groupinstall "Development Tools"
gcc --version
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S base-devel
gcc --version
\`\`\`

---

## 📝 Choose a Code Editor (VS Code Recommended)

We'll use **Visual Studio Code** as our main editor.

1. Download from \`https://code.visualstudio.com\`
2. Install the **C/C++ extension** by Microsoft:
   - Gives you IntelliSense, code navigation, and debugging support.
3. (Optional) Install a C formatting tool (like \`clang-format\`) for consistent style.

You can also use:

- CLion, Code::Blocks, Dev-C++
- Vim/Neovim, Emacs
- Any editor that lets you edit text and run commands

---

## 🚀 Your First C Program

Create a file named \`hello.c\` with this content:

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, C!\\n");
    return 0;
}
\`\`\`

### Compile and Run (GCC / Clang)

From the folder where \`hello.c\` is saved:

#### On Linux / macOS / WSL

\`\`\`bash
gcc hello.c -o hello
./hello
\`\`\`

#### On Windows (MinGW)

\`\`\`bash
gcc hello.c -o hello.exe
hello.exe
\`\`\`

You should see:

\`\`\`text
Hello, C!
\`\`\`

---

## 🔍 Understanding the Program (High-Level)

- \`#include <stdio.h>\` - tells the compiler to include the standard I/O library (for \`printf\`).
- \`int main(void)\` - the **entry point** of every C program.
- \`printf("Hello, C!\\n");\` - prints text to the screen.
- \`return 0;\` - returns 0 to the operating system, meaning "success".

We'll break all of this down in detail in the next modules.

---

🎉 **You're ready!** You have a C compiler, an editor, and you ran your first C program. Next we'll explore basic C syntax in more depth.`,
};



