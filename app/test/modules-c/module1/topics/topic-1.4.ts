import { SubLesson } from '../../../data/lessonsData';

export const topic_1_4: SubLesson = {
  id: 1.4,
  title: 'Installing GCC on macOS',
  status: 'completed',
  content: `# 🍎 Installing GCC on macOS

Step-by-step guide to set up GCC (GNU Compiler Collection) on macOS for C development.

---

## 📋 macOS System Requirements

- **Operating System**: macOS 10.10 or later
- **RAM**: Minimum 2GB, recommended 4GB+
- **Storage**: 2GB free space (including Xcode)
- **Permissions**: Administrator access (sudo)

---

## 🔧 Method 1: Command Line Tools for Xcode (Recommended)

Apple provides GCC/Clang through Xcode Command Line Tools - the easiest method.

### Step 1: Install Command Line Tools

1. **Open Terminal**
   - Press \`Cmd + Space\`, type "Terminal", press Enter
   - Or find Terminal in Applications → Utilities

2. **Install Command Line Tools**
   \`\`\`bash
   xcode-select --install
   \`\`\`

3. **Accept the license**
   - A dialog will appear asking you to install
   - Click "Install" and agree to the terms

4. **Wait for installation**
   - This may take 10-15 minutes
   - You'll see progress in a separate window

### Step 2: Verify Installation

\`\`\`bash
# Check GCC/Clang version
gcc --version

# Check Clang specifically
clang --version

# Check if Make is available
make --version
\`\`\`

**Expected output:**
\`\`\`
Apple clang version 14.0.0 (clang-1400.0.29.202)
Target: x86_64-apple-darwin22.1.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
\`\`\`

**Note**: On macOS, \`gcc\` is actually Apple's Clang compiler, which is GCC-compatible.

---

## 🔧 Method 2: Homebrew (Alternative for Pure GCC)

Homebrew allows installation of the actual GNU GCC compiler.

### Step 1: Install Homebrew

1. **Open Terminal**

2. **Install Homebrew**
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

3. **Follow the installation prompts**
   - You may need to enter your password
   - Installation may take several minutes

4. **Verify Homebrew**
   \`\`\`bash
   brew --version
   \`\`\`

### Step 2: Install GCC

\`\`\`bash
# Install GCC
brew install gcc

# This installs gcc-12 or similar (version number may vary)
\`\`\`

### Step 3: Add GCC to PATH (if needed)

Homebrew usually adds itself to PATH automatically. If not:

1. **Check your shell profile**
   \`\`\`bash
   echo $PATH
   \`\`\`

2. **Add Homebrew to PATH** (if missing)
   - Edit \`~/.zshrc\` or \`~/.bash_profile\`
   - Add: \`export PATH="/usr/local/bin:$PATH"\`

### Step 4: Verify GCC Installation

\`\`\`bash
# Check GNU GCC version
gcc-12 --version  # or whatever version was installed

# Create symbolic link (optional)
sudo ln -s /usr/local/bin/gcc-12 /usr/local/bin/gcc
\`\`\`

---

## 🧪 Testing Your GCC Installation

### Create a Test Program

Create a file called \`hello.c\` with this content:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    printf("GCC is working on macOS!\\n");
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
GCC is working on macOS!
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "xcode-select: command not found"

**Problem**: Command Line Tools not installed
**Solution**: Run \`xcode-select --install\` again

### "Agreeing to the Xcode license"

**Problem**: License not accepted
**Solution**:
\`\`\`bash
sudo xcodebuild -license accept
\`\`\`

### Permission Errors

**Problem**: Cannot write to directories
**Solution**: Use \`sudo\` for system installations

### "brew command not found"

**Problem**: Homebrew PATH not set
**Solution**:
\`\`\`bash
# Add to your shell profile
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
\`\`\`

### Multiple GCC Versions

**Problem**: Both Apple Clang and GNU GCC installed
**Solution**: Specify which one to use:
\`\`\`bash
# Use Apple Clang
/usr/bin/gcc --version

# Use GNU GCC (Homebrew)
/usr/local/bin/gcc-12 --version
\`\`\`

---

## 📁 Understanding macOS Compiler Setup

### Apple Clang vs GNU GCC

| Feature | Apple Clang (Default) | GNU GCC (Homebrew) |
|---------|----------------------|-------------------|
| Installation | Via Xcode tools | Via Homebrew |
| Compatibility | macOS optimized | Cross-platform |
| License | Open source | GPL |
| Performance | Excellent on macOS | Excellent |
| Learning | Perfect for beginners | Good for advanced |

**Recommendation**: Use Apple Clang (default) for learning C on macOS.

---

## ⚙️ Essential Compiler Flags for macOS

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
\`\`\`

---

## 🔍 macOS-Specific Considerations

### Framework Integration
\`\`\`bash
# Link with frameworks
gcc -framework Foundation -o program program.c

# Common frameworks: Foundation, AppKit, CoreFoundation
\`\`\`

### Universal Binaries
\`\`\`bash
# Create universal binary (Intel + Apple Silicon)
gcc -arch x86_64 -arch arm64 -o program program.c
\`\`\`

### Code Signing (for distribution)
\`\`\`bash
# Sign executable
codesign -s "Developer ID" program
\`\`\`

---

## 🚀 Next Steps

Now that GCC is installed on macOS:

1. **Set up your code editor** (next topic)
2. **Test with more complex programs**
3. **Learn basic C syntax** (Module 2)
4. **Practice compilation and debugging**

---

## 📚 Additional Resources

- [macOS Development Documentation](https://developer.apple.com/documentation/)
- [Homebrew Documentation](https://docs.brew.sh/)
- [GCC Manual](https://gcc.gnu.org/onlinedocs/)
- [macOS C Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)

**Congratulations! You now have GCC set up on macOS. Ready to write some C code! 🎉**`
};
