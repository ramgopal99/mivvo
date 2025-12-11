import { SubLesson } from '../../../data/lessonsData';

export const topic_2_1: SubLesson = {
  id: 2.1,
  title: 'Basic Structure and Syntax',
  status: 'completed',
  content: `# 📝 C Basic Structure and Syntax

Learn the fundamental structure and syntax rules of C programming language.

---

## 🏗️ Anatomy of a C Program

### The Simplest C Program

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    return 0;
}
\`\`\`

Let's break down each part:

---

## 📋 Program Components

### 1. **Header Files Inclusion**
\`\`\`c
#include <stdio.h>
\`\`\`

**What it does:**
- Includes the Standard Input/Output header file
- Provides declarations for \`printf\`, \`scanf\`, etc.
- Uses angle brackets \`<\` \`>\` for standard library headers

### 2. **Main Function**
\`\`\`c
int main() {
    // code goes here
    return 0;
}
\`\`\`

**Key points:**
- **Entry point** of every C program
- **Returns int** - success (0) or error code
- **Required** in every C program

### 3. **Statements**
\`\`\`c
printf("Hello, C World!\\n");
return 0;
\`\`\`

**Characteristics:**
- End with **semicolon** \`;\`
- Executed sequentially
- Can span multiple lines

### 4. **Return Statement**
\`\`\`c
return 0;
\`\`\`

**Purpose:**
- Exit the function
- Return value to operating system
- 0 typically means "success"

---

## 🔧 C Syntax Rules

### Case Sensitivity
\`\`\`c
int main()    // ✓ correct
INT MAIN()    // ❌ wrong - C is case sensitive
Main()        // ❌ wrong
\`\`\`

**C is case sensitive!** \`main\` ≠ \`Main\` ≠ \`MAIN\`

### Whitespace
\`\`\`c
// All of these are equivalent:
int main(){printf("Hello\\n");return 0;}

int main() {
    printf("Hello\\n");
    return 0;
}

int main()
{
    printf("Hello\\n");
    return 0;
}
\`\`\`

**Whitespace is flexible** but use it for readability!

### Statement Termination
\`\`\`c
// ✓ Correct
printf("Hello\\n");
return 0;

// ❌ Wrong - missing semicolons
printf("Hello\\n")  // Error!
return 0
\`\`\`

**Every statement must end with a semicolon!**

---

## 📝 Comments in C

### Single-Line Comments
\`\`\`c
// This is a single-line comment
printf("Hello\\n");  // Comment after code
\`\`\`

### Multi-Line Comments
\`\`\`c
/*
 * This is a multi-line comment
 * Can span multiple lines
 * Very useful for documentation
 */
int main() {
    return 0;  // Another comment
}
\`\`\`

---

## 🔍 Program Flow

### Compilation Process
1. **Source Code** (\`.c\`) → Preprocessor
2. **Preprocessed Code** → Compiler
3. **Assembly Code** → Assembler
4. **Object Code** (\`.o\`) → Linker
5. **Executable** → Ready to run

### Execution Flow
\`\`\`c
#include <stdio.h>  // 1. Headers included

int main() {        // 2. Program starts here
    printf("Hello\\n");  // 3. Execute statements
    return 0;       // 4. Return to OS
}                   // 5. End of function
\`\`\`

---

## 🧪 Example Programs

### Program 1: Basic Output
\`\`\`c
#include <stdio.h>

int main() {
    printf("Welcome to C Programming!\\n");
    printf("This is your first program.\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Welcome to C Programming!
This is your first program.
\`\`\`

### Program 2: Multiple Statements
\`\`\`c
#include <stdio.h>

int main() {
    // Multiple print statements
    printf("Line 1\\n");
    printf("Line 2\\n");
    printf("Line 3\\n");

    // Single printf with multiple lines
    printf("Line 4\\nLine 5\\nLine 6\\n");

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
\`\`\`

---

## 🐛 Common Syntax Errors

### Missing Semicolon
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello\\n")  // ❌ Missing semicolon
    return 0;
}
\`\`\`

**Error:** \`expected ';' before 'return'\`

### Missing Parentheses
\`\`\`c
#include <stdio.h>

int main {  // ❌ Missing parentheses
    printf("Hello\\n");
    return 0;
}
\`\`\`

**Error:** \`expected '(' before '{' token\`

### Wrong Quotes
\`\`\`c
#include <stdio.h>

int main() {
    printf('Hello\\n');  // ❌ Single quotes for string
    return 0;
}
\`\`\`

**Error:** Use double quotes \`"\` for strings, single quotes \`'\` for characters.

---

## 📚 Best Practices

### Code Formatting
\`\`\`c
// ✓ Good formatting
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}

// ❌ Poor formatting
#include <stdio.h>
int main(){printf("Hello, World!\\n");return 0;}
\`\`\`

### Commenting
\`\`\`c
// ✓ Useful comments
#include <stdio.h>

int main() {
    // Print welcome message
    printf("Welcome!\\n");

    // Return success
    return 0;
}
\`\`\`

### Consistent Style
\`\`\`c
// Choose one style and stick to it
int main() {
    printf("Hello\\n");
    return 0;
}

// OR

int main()
{
    printf("Hello\\n");
    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Every C program needs a \`main\` function**
2. **Include necessary header files** with \`#include\`
3. **Statements end with semicolons** \`;\`
4. **C is case sensitive**
5. **Use comments** to explain your code
6. **Follow consistent formatting** for readability

---

## 🧪 Practice Exercises

### Exercise 1: Hello Program
Write a program that prints:
\`\`\`
Hello, C Programming!
This is fun!
\`\`\`

### Exercise 2: Multiple Lines
Write a program that prints your name and favorite programming language on separate lines.

### Exercise 3: Comments
Add appropriate comments to explain each part of the hello world program.

---

## 🚀 What's Next

In the next topics, you'll learn about:
- **Variables** - storing data
- **Data Types** - different kinds of values
- **Operators** - performing calculations
- **Input/Output** - interacting with users

**Keep practicing the basic structure - it's the foundation of everything in C!** 💪`
};
