import { SubLesson } from '../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'Setting Up Java Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up Java on Your Local Machine

Learn how to install Java Development Kit (JDK) and set up your development environment for coding.

---

## 📋 Prerequisites

Before installing Java, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation

### macOS Requirements
- macOS 10.10 or later
- Command Line Tools for Xcode

### Linux Requirements
- Most Linux distributions support Java installation
- Package manager access (apt, yum, etc.)

---

## 🪟 Windows Installation

### Method 1: Oracle JDK (Recommended)

1. **Download JDK**
   - Visit [oracle.com/java](https://www.oracle.com/java/technologies/downloads/)
   - Click "Download JDK" for your platform
   - Choose the latest LTS (Long Term Support) version

2. **Run the Installer**
   - Double-click the downloaded .exe file
   - Follow the installation wizard
   - Note the installation directory

3. **Set Environment Variables**
   - Search for "Environment Variables" in Windows search
   - Click "Edit the system environment variables"
   - Click "Environment Variables" button
   - Add new system variable:
     - Variable name: \`JAVA_HOME\`
     - Variable value: \`C:\\Program Files\\Java\\jdk-17\` (your JDK path)
   - Edit "Path" variable and add: \`%JAVA_HOME%\\bin\`

4. **Verify Installation**
   - Open Command Prompt
   - Type: \`java -version\`
   - Type: \`javac -version\`

### Method 2: OpenJDK (Free Alternative)

1. **Download OpenJDK**
   - Visit [adoptium.net](https://adoptium.net/)
   - Download Eclipse Temurin JDK
   - Choose the latest LTS version

2. **Install and configure** same as Oracle JDK

---

## 🍎 macOS Installation

### Method 1: Oracle JDK

1. **Download JDK**
   - Visit [oracle.com/java](https://www.oracle.com/java/technologies/downloads/)
   - Download macOS installer (.dmg)

2. **Install Java**
   - Open the downloaded .dmg file
   - Run the installer package
   - Java will be installed in \`/Library/Java/JavaVirtualMachines/\`

3. **Verify Installation**
   - Open Terminal
   - Type: \`java -version\`
   - Type: \`javac -version\`

### Method 2: Homebrew (Recommended for developers)

1. **Install Homebrew** (if not installed):
   \`\`\`bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   \`\`\`

2. **Install OpenJDK**:
   \`\`\`bash
   brew install openjdk
   sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
   \`\`\`

3. **Verify Installation**:
   \`\`\`bash
   java -version
   javac -version
   \`\`\`

---

## 🐧 Linux Installation

### Ubuntu/Debian

\`\`\`bash
# Update package list
sudo apt update

# Install OpenJDK
sudo apt install openjdk-17-jdk

# Verify installation
java -version
javac -version
\`\`\`

### CentOS/RHEL/Fedora

\`\`\`bash
# CentOS/RHEL 7
sudo yum install java-17-openjdk-devel

# CentOS/RHEL 8+ / Fedora
sudo dnf install java-17-openjdk-devel

# Verify installation
java -version
javac -version
\`\`\`

### Arch Linux

\`\`\`bash
sudo pacman -S jdk-openjdk
java -version
javac -version
\`\`\`

---

## 🆚 JDK vs JRE

### JRE (Java Runtime Environment)
- **Purpose**: Run Java applications only
- **Contents**: JVM + core libraries
- **Use case**: End users running Java apps

### JDK (Java Development Kit)
- **Purpose**: Develop AND run Java applications
- **Contents**: JRE + development tools (javac, javadoc, etc.)
- **Use case**: Developers creating Java applications

**Always install JDK for development!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose a Code Editor

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install Java extensions:
   - "Extension Pack for Java" by Microsoft
   - "Java Language Support" by Red Hat

#### Other Popular Options
- IntelliJ IDEA (Professional IDE)
- Eclipse IDE
- NetBeans
- Sublime Text

### 2. Install Build Tools (Optional)

#### Maven (Project management and build tool)
\`\`\`bash
# Download from maven.apache.org
# Add to PATH environment variable
mvn -version
\`\`\`

#### Gradle (Modern build tool)
\`\`\`bash
# Download from gradle.org
# Add to PATH environment variable
gradle -version
\`\`\`

---

## 🧪 Testing Your Setup

Create a simple test program to verify everything works:

### Create HelloWorld.java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
        System.out.println("Java version: " + System.getProperty("java.version"));
        System.out.println("Java home: " + System.getProperty("java.home"));
    }
}
\`\`\`

### Compile and Run the Program

#### Windows/macOS/Linux
\`\`\`bash
# Compile the program
javac HelloWorld.java

# Run the program
java HelloWorld
\`\`\`

**Expected Output:**
\`\`\`
Hello, Java!
Java version: 17.0.5
Java home: /path/to/java/home
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "java is not recognized" (Windows)
- Check if JAVA_HOME is set correctly
- Add \`%JAVA_HOME%\\bin\` to PATH
- Restart command prompt

### "JAVA_HOME is not defined correctly" (Windows)
\`\`\`bash
# Check current JAVA_HOME
echo %JAVA_HOME%

# Verify java executable exists
dir "%JAVA_HOME%\bin\java.exe"
\`\`\`

### Permission Errors (macOS/Linux)
\`\`\`bash
# Check Java installation
which java
ls -la /usr/bin/java
\`\`\`

### Multiple Java Versions
\`\`\`bash
# List all installed Java versions
/usr/libexec/java_home -V

# Set specific version (macOS)
/usr/libexec/java_home -v 17

# Update alternatives (Linux)
sudo update-alternatives --config java
sudo update-alternatives --config javac
\`\`\`

---

## 🔧 Setting Up Environment Variables

Environment variables help your computer find Java and its tools.

### Windows - Setting JAVA_HOME

1. **Right-click "This PC"** → **Properties**
2. **Click "Advanced system settings"**
3. **Click "Environment Variables"**
4. **Add new system variable**:
   - Variable name: \`JAVA_HOME\`
   - Variable value: \`C:\\Program Files\\Java\\jdk-17.0.5\` (your actual path)

5. **Edit PATH variable** and add:
   - \`%JAVA_HOME%\\bin\`

### Verifying Environment Setup

After setting up environment variables, restart your command prompt:

\`\`\`bash
# Test Java commands
java -version
javac -version
echo %JAVA_HOME%
\`\`\`

### macOS/Linux Environment Variables

Java is usually available system-wide. Add to your shell profile:

\`\`\`bash
# Add to ~/.bashrc or ~/.zshrc
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
\`\`\`

---

🎉 **Congratulations!** You now have Java set up on your local machine. Time to start coding! 🚀`
};
