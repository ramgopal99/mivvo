import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'Setting Up Python Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up Python on Your Local Machine

Learn how to install Python and set up your development environment for coding.

---

## 📋 Prerequisites

Before installing Python, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation

### macOS Requirements
- macOS 10.9 or later
- Command Line Tools for Xcode

### Linux Requirements
- Most Linux distributions come with Python pre-installed
- Package manager access (apt, yum, etc.)

---

## 🪟 Windows Installation

### Method 1: Official Python Installer (Recommended)

1. **Download Python**
   - Visit [python.org](https://python.org)
   - Click "Downloads" → "Download Python 3.x.x"
   - Choose the latest stable version

2. **Run the Installer**
   - Double-click the downloaded .exe file
   - **Important**: Check "Add Python to PATH" at the bottom
   - Click "Install Now" or "Customize installation"

3. **Verify Installation**
   - Open Command Prompt (search for "cmd")
   - Type: \`python --version\`
   - Type: \`pip --version\`

### Method 2: Microsoft Store

1. Open Microsoft Store
2. Search for "Python"
3. Install the latest Python version

---

## 🍎 macOS Installation

### Method 1: Official Installer

1. **Download Python**
   - Visit [python.org](https://python.org)
   - Click "Downloads" → "Download Python 3.x.x"
   - Choose macOS installer

2. **Install Python**
   - Open the downloaded .pkg file
   - Follow installation wizard
   - Python will be installed in \`/usr/local/bin/\`

3. **Verify Installation**
   - Open Terminal
   - Type: \`python3 --version\`
   - Type: \`pip3 --version\`

### Method 2: Homebrew (Recommended for developers)

1. **Install Homebrew** (if not installed):
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

2. **Install Python**:
   \`\`\`bash
   brew install python
   \`\`\`

3. **Verify Installation**:
   \`\`\`bash
   python3 --version
   pip3 --version
   \`\`\`

---

## 🐧 Linux Installation

### Ubuntu/Debian

\`\`\`bash
# Update package list
sudo apt update

# Install Python 3 and pip
sudo apt install python3 python3-pip

# Verify installation
python3 --version
pip3 --version
\`\`\`

### CentOS/RHEL/Fedora

\`\`\`bash
# CentOS/RHEL
sudo yum install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip

# Verify installation
python3 --version
pip3 --version
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S python python-pip
python --version
pip --version
\`\`\`

---

## 🆚 Python 2 vs Python 3

### Python 2
- **Legacy version** (released 2000)
- **End of life**: January 1, 2020
- **Not recommended** for new projects

### Python 3
- **Current version** (released 2008)
- **Actively maintained**
- **Recommended** for all new projects

**Always use Python 3!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose a Code Editor

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install Python extension by Microsoft
3. Install Pylint extension for code analysis

#### Other Popular Options
- PyCharm (Professional IDE)
- Sublime Text
- Atom
- Vim/Emacs

### 2. Virtual Environments (Optional - Only for Learning Projects)

Virtual environments help manage project dependencies for specific projects. **You don't need this for basic learning - only when working on larger projects with multiple dependencies.**

#### When to use virtual environments:
- Working on multiple projects with different package versions
- Learning advanced Python concepts
- Developing applications with complex dependencies

#### Windows
\`\`\`bash
# Create virtual environment
python -m venv myproject

# Activate virtual environment
myproject\\Scripts\\activate

# Deactivate
deactivate
\`\`\`

#### macOS/Linux
\`\`\`bash
# Create virtual environment
python3 -m venv myproject

# Activate virtual environment
source myproject/bin/activate

# Deactivate
deactivate
\`\`\`

### 3. Install Essential Packages

\`\`\`bash
# Upgrade pip
pip install --upgrade pip

# Install common packages
pip install requests
pip install numpy
pip install pandas
pip install matplotlib
\`\`\`

---

## 🧪 Testing Your Setup

Create a simple test script to verify everything works:

### Create test.py
\`\`\`python
# test.py
print("Hello, Python!")
print(f"Python version: {__import__('sys').version}")

# Test basic functionality
name = input("What's your name? ")
print(f"Hello, {name}! Welcome to Python! 🐍")
\`\`\`

### Run the script

#### Windows
\`\`\`bash
python test.py
\`\`\`

#### macOS/Linux
\`\`\`bash
python3 test.py
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "python is not recognized" (Windows)
- Reinstall Python and check "Add to PATH"
- Or add Python to PATH manually in Environment Variables

### Permission Errors (macOS/Linux)
\`\`\`bash
# Use pip with --user flag
pip3 install --user package_name

# Or use virtual environments
\`\`\`

### Multiple Python Versions
\`\`\`bash
# Check installed versions
python --version
python3 --version

# Use python3 explicitly if needed
python3 script.py
\`\`\`

---

## 🔧 Setting Up Environment Variables

Environment variables help your computer find Python and its tools. This is especially important on Windows.

### Windows - Adding Python to PATH

If you forgot to check "Add Python to PATH" during installation:

1. **Search for "Environment Variables"** in Windows search
2. **Click "Edit the system environment variables"**
3. **Click "Environment Variables"** button
4. **Find "Path" in System variables** and click "Edit"
5. **Add these paths** (replace with your Python installation path):
   - \`C:\\Python312\\\` (main Python folder)
   - \`C:\\Python312\\Scripts\\\` (for pip and other tools)

### Verifying PATH Setup

After setting up PATH, restart your command prompt and test:

\`\`\`bash
# These should work from any directory
python --version
pip --version
\`\`\`

### macOS/Linux Environment Variables

On macOS and Linux, Python is usually available system-wide. If you installed via Homebrew, it should be in your PATH automatically.

To check your PATH:
\`\`\`bash
echo $PATH
which python3
\`\`\`

---

🎉 **Congratulations!** You now have Python set up on your local machine. Time to start coding! 🚀`
};
