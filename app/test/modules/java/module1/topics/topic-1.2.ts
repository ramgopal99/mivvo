import { SubLesson } from '../../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: "1.2",
  title: 'Setting Up Java Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up Java on Your Local Machine

Learn how to install Java and set up your development environment for coding.

---

## 📋 Prerequisites

Before installing Java, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation

### macOS Requirements
- macOS 10.9 or later
- Command Line Tools for Xcode

### Linux Requirements
- Most Linux distributions come with Java pre-installed
- Package manager access (apt, yum, etc.)

---

## 🪟 Windows Installation

### Method 1: Official Oracle JDK (Recommended)

1. **Download Java**
   - Visit [oracle.com/java](https://oracle.com/java)
   - Click "Download Java" → "JDK Download"
   - Choose the latest LTS version (Java 17 or 21)

2. **Run the Installer**
   - Double-click the downloaded .exe file
   - Follow installation wizard
   - Note the installation path

3. **Verify Installation**
   - Open Command Prompt (search for "cmd")
   - Type: \`java -version\`
   - Type: \`javac -version\`

### Method 2: OpenJDK (Free Alternative)

1. **Download OpenJDK**
   - Visit [adoptium.net](https://adoptium.net)
   - Download Eclipse Temurin JDK
   - Choose LTS version

2. **Install and Verify**
   - Extract to a folder (e.g., C:\\Java)
   - Add to PATH environment variable

---

## 🍎 macOS Installation

### Method 1: Official Oracle JDK

1. **Download Java**
   - Visit [oracle.com/java](https://oracle.com/java)
   - Click "Download Java" → "JDK Download"
   - Choose macOS installer

2. **Install Java**
   - Open the downloaded .dmg file
   - Follow installation wizard
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
   sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
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
# CentOS/RHEL
sudo yum install java-17-openjdk-devel

# Fedora
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

## 🆚 JDK vs JRE vs JVM

### JDK (Java Development Kit)
- **Contains**: JRE + development tools (javac, javadoc, etc.)
- **Purpose**: Develop Java applications
- **Required for**: Compiling and running Java code

### JRE (Java Runtime Environment)
- **Contains**: JVM + core libraries
- **Purpose**: Run Java applications
- **Required for**: End users running Java programs

### JVM (Java Virtual Machine)
- **Purpose**: Execute Java bytecode
- **Platform**: Specific to each operating system
- **Features**: Garbage collection, security, performance optimization

**Always install JDK for development!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose a Code Editor

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install Java Extension Pack by Microsoft
3. Install Gradle/Maven extensions for project management

#### Other Popular Options
- **Eclipse**: Free, open-source, widely used for Java
- **IntelliJ IDEA**: Powerful, modern IDE (Community Edition is free)
- **NetBeans**: Official Oracle IDE, good for beginners

### 2. Environment Variables Setup

#### Windows - Adding Java to PATH

1. **Search for "Environment Variables"** in Windows search
2. **Click "Edit the system environment variables"**
3. **Click "Environment Variables"** button
4. **Find "Path" in System variables** and click "Edit"
5. **Add these paths** (replace with your Java installation path):
   - \`C:\\Program Files\\Java\\jdk-17\\bin\` (for Oracle JDK)
   - \`C:\\Java\\jdk-17\\bin\` (for OpenJDK)

#### macOS/Linux Environment Variables

\`\`\`bash
# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Add to PATH
export PATH=$JAVA_HOME/bin:$PATH

# Make permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
\`\`\`

### 3. Install Build Tools (Optional but Recommended)

#### Maven (Project management and build tool)
\`\`\`bash
# Download from maven.apache.org
# Add to PATH after installation
mvn -version
\`\`\`

#### Gradle (Modern build tool)
\`\`\`bash
# Download from gradle.org
# Add to PATH after installation
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
    }
}
\`\`\`

### Compile and Run

#### Windows
\`\`\`bash
javac HelloWorld.java
java HelloWorld
\`\`\`

#### macOS/Linux
\`\`\`bash
javac HelloWorld.java
java HelloWorld
\`\`\`

#### Expected Output
\`\`\`
Hello, Java!
Java version: 17.0.8
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "java is not recognized" (Windows)
- Reinstall JDK and ensure PATH is set correctly
- Restart command prompt after PATH changes
- Check if you're using the right java command

### Permission Errors (macOS/Linux)
\`\`\`bash
# Use sudo if needed
sudo apt install openjdk-17-jdk

# Or adjust permissions
chmod +x java
\`\`\`

### Multiple Java Versions
\`\`\`bash
# Check installed versions
java -version
javac -version

# Use update-alternatives (Linux)
sudo update-alternatives --config java
sudo update-alternatives --config javac
\`\`\`

---

## 🎯 Java Versions and Compatibility

### Long-Term Support (LTS) Versions
- **Java 8** (2014): Most widely used, LTS until 2030
- **Java 11** (2018): Modern LTS with many improvements
- **Java 17** (2021): Latest LTS, recommended for new projects
- **Java 21** (2023): Next LTS with latest features

### Version Compatibility
- **Backward Compatible**: Newer JVMs can run older bytecode
- **Forward Compatible**: Older JVMs cannot run newer bytecode
- **Source Compatibility**: Code usually compiles across versions

---

## 🚀 Next Steps

Now that Java is set up, you're ready to:

1. **Learn Java Syntax** (Module 2)
2. **Understand Variables and Data Types** (Module 3)
3. **Master Operators and Expressions** (Module 4)

Remember: **Practice regularly** and **experiment with code**. Java has excellent documentation and a supportive community!

Happy coding! 🎉
`
};

