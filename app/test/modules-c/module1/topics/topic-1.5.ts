import { SubLesson } from '../../../data/lessonsData';

export const topic_1_5: SubLesson = {
  id: 1.5,
  title: 'Installing GCC on Linux',
  status: 'completed',
  content: `# 🐧 Installing GCC on Linux

Step-by-step guide to set up GCC (GNU Compiler Collection) on Linux distributions for C development.

---

## 📋 Linux System Requirements

- **Distribution**: Any modern Linux distribution
- **RAM**: Minimum 1GB, recommended 2GB+
- **Storage**: 500MB free space
- **Permissions**: sudo/administrator access

---

## 🔧 Ubuntu/Debian Installation

### Step 1: Update Package List

\`\`\`bash
# Update package database
sudo apt update
\`\`\`

### Step 2: Install Build Essentials

\`\`\`bash
# Install build-essential package (includes GCC)
sudo apt install build-essential

# Optional: Install additional development tools
sudo apt install gdb valgrind
\`\`\`

### Step 3: Verify Installation

\`\`\`bash
# Check GCC version
gcc --version

# Check G++ version
g++ --version

# Check Make version
make --version

# Check GDB debugger
gdb --version
\`\`\`

**Expected output:**
\`\`\`
gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
Copyright (C) 2021 Free Software Foundation, Inc.
...
\`\`\`

---

## 🔧 CentOS/RHEL/Fedora Installation

### CentOS/RHEL 7/8

\`\`\`bash
# Install Development Tools group
sudo yum groupinstall "Development Tools"

# Or install individual packages
sudo yum install gcc gcc-c++ make gdb
\`\`\`

### Fedora

\`\`\`bash
# Install Development Tools group
sudo dnf groupinstall "Development Tools"

# Or install individual packages
sudo dnf install gcc gcc-c++ make gdb
\`\`\`

### CentOS/RHEL 9 / Rocky Linux / AlmaLinux

\`\`\`bash
# Install GCC and development tools
sudo dnf groupinstall "Development Tools"
\`\`\`

---

## 🔧 Arch Linux Installation

### Step 1: Update Package Database

\`\`\`bash
# Update package database
sudo pacman -Syu
\`\`\`

### Step 2: Install Base Development

\`\`\`bash
# Install base-devel group (includes GCC)
sudo pacman -S base-devel

# Or install individual packages
sudo pacman -S gcc make gdb
\`\`\`

---

## 🔧 SUSE/openSUSE Installation

\`\`\`bash
# Install development patterns
sudo zypper install -t pattern devel_basis

# Or install individual packages
sudo zypper install gcc gcc-c++ make gdb
\`\`\`

---

## 🔧 Gentoo Installation

\`\`\`bash
# Install GCC
emerge sys-devel/gcc

# Install make
emerge sys-devel/make

# Install gdb
emerge sys-devel/gdb
\`\`\`

---

## 🧪 Testing Your GCC Installation

### Create a Test Program

Create a file called \`hello.c\` with this content:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    printf("GCC is working on Linux!\\n");
    return 0;
}
\`\`\`

### Compile and Run

\`\`\`bash
# Compile the program
gcc -Wall -o hello hello.c

# Run the program
./hello
\`\`\`

**Expected output:**
\`\`\`
Hello, C World!
GCC is working on Linux!
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "sudo: command not found"

**Problem**: Not running as root or sudo not available
**Solutions**:
- Use \`su -\` to switch to root
- Install sudo: \`apt install sudo\` (Ubuntu/Debian)
- Check if you're already root: \`whoami\`

### "Package not found" Errors

**Problem**: Package name incorrect or repository not configured
**Solutions**:
- Check package name spelling
- Update package list: \`sudo apt update\` (Ubuntu/Debian)
- Enable additional repositories if needed

### Permission Errors

**Problem**: Cannot write to directories
**Solutions**:
- Use \`sudo\` for installations
- Check file permissions: \`ls -la\`
- Change ownership if needed: \`sudo chown $USER:$USER file\`

### "gcc: command not found" After Installation

**Problem**: GCC not in PATH
**Solutions**:
- Check PATH: \`echo $PATH\`
- Find GCC location: \`which gcc\` or \`whereis gcc\`
- Add to PATH if needed

---

## 📁 GCC Installation Locations

GCC and related tools are typically installed in:

| Distribution | GCC Location | Headers |
|-------------|-------------|---------|
| Ubuntu/Debian | \`/usr/bin/gcc\` | \`/usr/include\` |
| CentOS/RHEL | \`/usr/bin/gcc\` | \`/usr/include\` |
| Arch Linux | \`/usr/bin/gcc\` | \`/usr/include\` |
| Gentoo | \`/usr/bin/gcc\` | \`/usr/include\` |

---

## ⚙️ Essential Compiler Flags for Linux

\`\`\`bash
# Basic compilation
gcc -o program program.c

# With warnings (recommended)
gcc -Wall -Wextra -o program program.c

# With debugging symbols
gcc -g -o program program.c

# With C99 standard
gcc -std=c99 -o program program.c

# Optimized build
gcc -O2 -o program program.c

# Link with math library
gcc -o program program.c -lm
\`\`\`

---

## 🔍 Linux-Specific Features

### Shared Libraries
\`\`\`bash
# Compile shared library
gcc -shared -o libmylib.so -fPIC mylib.c

# Link with shared library
gcc -o program program.c -L. -lmylib
\`\`\`

### Static Libraries
\`\`\`bash
# Create static library
ar rcs libmylib.a mylib.o

# Link with static library
gcc -o program program.c libmylib.a
\`\`\`

### GNU Extensions
\`\`\`bash
# Enable GNU extensions (non-standard C)
gcc -std=gnu99 -o program program.c
\`\`\`

---

## 🚀 Next Steps

Now that GCC is installed on Linux:

1. **Set up your code editor** (next topic)
2. **Test with more complex programs**
3. **Learn basic C syntax** (Module 2)
4. **Practice compilation and debugging**

---

## 📚 Additional Resources

- [GCC Manual](https://gcc.gnu.org/onlinedocs/)
- [Linux C Programming Tutorial](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [GNU Make Manual](https://www.gnu.org/software/make/manual/)
- [GDB Documentation](https://www.gnu.org/software/gdb/documentation/)

---

## 🎯 Distribution-Specific Notes

### Ubuntu/Debian
- GCC is usually pre-installed on recent versions
- Use \`apt\` for package management
- Excellent documentation available

### CentOS/RHEL
- May require EPEL repository for some packages
- Use \`yum\` (older) or \`dnf\` (newer) for package management
- More conservative package versions

### Arch Linux
- Rolling release - always latest packages
- Use \`pacman\` for package management
- AUR (Arch User Repository) for additional packages

### Gentoo
- Source-based distribution
- Compilation may take time
- Highly customizable

**Congratulations! You now have GCC set up on Linux. Ready to write some C code! 🎉**`
};
