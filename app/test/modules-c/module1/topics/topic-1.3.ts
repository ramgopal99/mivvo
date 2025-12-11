import { SubLesson } from '../../../data/lessonsData';

export const topic_1_3: SubLesson = {
  id: 1.3,
  title: 'Installing GCC on Windows',
  status: 'completed',
  content: `# 🪟 Installing GCC on Windows

Step-by-step guide to set up GCC (GNU Compiler Collection) on Windows for C development.

---

## 📋 Windows System Requirements

- **Operating System**: Windows 7 or later (64-bit recommended)
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: 1GB free space
- **Permissions**: Administrator access for installation

---

## 🔧 Method 1: MinGW-w64 (Recommended)

MinGW-w64 provides the GCC compiler suite for Windows with an easy installer.

### Step 1: Download MinGW-w64

1. **Visit the official website**
   - Go to [mingw-w64.org](https://mingw-w64.org/)
   - Click on "Downloads" in the top menu

2. **Choose the installer**
   - Look for "MingW-W64-builds"
   - Click on "Installation" → "Run the installer"
   - Or directly download from SourceForge:
     [MinGW-w64 Installer](https://sourceforge.net/projects/mingw-w64/)

3. **Select the correct version**
   - **Architecture**: x86_64 (for 64-bit Windows)
   - **Threads**: win32 or posix (win32 is more compatible)
   - **Exception**: seh (Stable Exception Handling)

### Step 2: Install MinGW-w64

1. **Run the installer**
   - Double-click the downloaded .exe file
   - Choose your preferred language

2. **Select installation directory**
   - Default is usually \`C:\\mingw64\\\`
   - You can change it, but remember the path

3. **Select components**
   - Make sure to check at least:
     - **mingw-w64-x86_64-gcc-g++** (GCC compiler)
     - **mingw-w64-x86_64-gdb** (Debugger)

4. **Complete installation**
   - Click "Next" through the remaining steps
   - Installation may take a few minutes

### Step 3: Add MinGW to PATH

This step is crucial - it allows Windows to find the GCC compiler.

1. **Open Environment Variables**
   - Press \`Win + R\`, type \`sysdm.cpl\`, press Enter
   - Click "Advanced" tab → "Environment Variables"

2. **Edit System PATH**
   - Find "Path" in "System variables"
   - Click "Edit" → "New"
   - Add: \`C:\\mingw64\\bin\` (use your installation path)
   - Click "OK" to save

3. **Restart Command Prompt**
   - Close any open Command Prompt windows
   - Open a new Command Prompt

### Step 4: Verify Installation

\`\`\`bash
# Check GCC version
gcc --version

# Check G++ version (for C++)
g++ --version

# Check GDB debugger
gdb --version
\`\`\`

**Expected output:**
\`\`\`
gcc (MinGW-W64 x86_64-posix-seh, built by Brecht Sanders) 12.2.0
Copyright (C) 2022 Free Software Foundation, Inc.
...
\`\`\`

---

## 🔧 Method 2: MSYS2 (Advanced Alternative)

MSYS2 provides a Unix-like environment with pacman package manager.

### Installation Steps

1. **Download MSYS2**
   - Visit [msys2.org](https://msys2.org/)
   - Download the installer for your architecture

2. **Install MSYS2**
   - Run the installer
   - Choose installation directory

3. **Update package database**
   \`\`\`bash
   pacman -Syu
   \`\`\`

4. **Install GCC**
   \`\`\`bash
   pacman -S mingw-w64-x86_64-gcc
   \`\`\`

5. **Add to PATH**
   - MSYS2 usually adds itself to PATH automatically

---

## 🧪 Testing Your GCC Installation

### Create a Test Program

Create a file called \`hello.c\` with this content:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    printf("GCC is working on Windows!\\n");
    return 0;
}
\`\`\`

### Compile and Run

\`\`\`bash
# Compile the program
gcc -Wall -o hello hello.c

# Run the program
hello.exe
\`\`\`

**Expected output:**
\`\`\`
Hello, C World!
GCC is working on Windows!
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "gcc is not recognized" Error

**Problem**: GCC is not in PATH
**Solutions**:
1. Check if MinGW bin directory is in PATH
2. Use full path: \`C:\\mingw64\\bin\\gcc.exe --version\`
3. Reinstall MinGW and ensure PATH is set correctly

### Permission Errors

**Problem**: Cannot write to installation directory
**Solution**: Run Command Prompt as Administrator

### Antivirus Blocking

**Problem**: Antivirus software blocks GCC
**Solutions**:
- Add exception for MinGW directory
- Temporarily disable antivirus during installation
- Use Windows Security exclusions

### "mingw32-make: command not found"

**Problem**: Make utility not installed
**Solution**: Install make separately or use Method 2 (MSYS2)

---

## 📁 Directory Structure After Installation

After successful installation, your MinGW directory should look like:

\`\`\`
C:\\mingw64\\
├── bin\\           # Executables (gcc.exe, gdb.exe, etc.)
├── include\\       # Header files
├── lib\\           # Libraries
├── libexec\\       # Support executables
└── share\\         # Shared files and documentation
\`\`\`

---

## ⚙️ Essential Compiler Flags for Windows

\`\`\`bash
# Basic compilation
gcc -o program.exe program.c

# With warnings (recommended)
gcc -Wall -Wextra -o program.exe program.c

# With debugging symbols
gcc -g -o program.exe program.c

# Optimized build
gcc -O2 -o program.exe program.c

# 32-bit compilation (if needed)
gcc -m32 -o program.exe program.c
\`\`\`

---

## 🚀 Next Steps

Now that GCC is installed on Windows:

1. **Set up your code editor** (next topic)
2. **Test with more complex programs**
3. **Learn basic C syntax** (Module 2)
4. **Practice compilation and debugging**

---

## 📚 Additional Resources

- [MinGW-w64 Documentation](https://mingw-w64.org/doku.php)
- [GCC Manual](https://gcc.gnu.org/onlinedocs/)
- [Windows C Programming Tutorial](https://docs.microsoft.com/en-us/cpp/build/walkthrough-compiling-a-native-cpp-program-on-the-command-line)

**Congratulations! You now have GCC set up on Windows. Ready to write some C code! 🎉**
`
};
