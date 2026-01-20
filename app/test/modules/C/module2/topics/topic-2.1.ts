import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_1: SubLesson = {
  id: "2.1",
  title: 'Your First C Program',
  status: 'demo',
  content: `# 🎯 Your First C Program

Let's write and understand your first C program! We'll start with the classic "Hello, World!" program and break down every component.

---

## 📝 Hello, World! Program

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### **Output:**
\`\`\`
Hello, World!
\`\`\`

---

## 🔍 Breaking Down the Code

### **1. Preprocessor Directive: #include**

\`\`\`c
#include <stdio.h>
\`\`\`

- **Purpose**: Includes the Standard Input/Output library
- **What it does**: Gives us access to functions like \`printf()\` and \`scanf()\`
- **Note**: Preprocessor directives start with \`#\` and are processed before compilation
- **\`<stdio.h>\`**: Standard Input/Output header file

\`\`\`c
// Without this line, printf() won't work!
#include <stdio.h>
\`\`\`

### **2. The \`main()\` Function**

\`\`\`c
int main(void) {
    // Your code here
}
\`\`\`

- **Purpose**: The entry point of every C program
- **Execution**: Program starts here when you run it
- **\`int\`**: Return type (returns an integer to the operating system)
- **\`main\`**: Function name (must be exactly "main")
- **\`(void)\`**: Parameter list (void means no parameters)
- **\`{ }\`**: Function body (where your code goes)

\`\`\`c
// Different ways to write main() (all valid)
int main(void) { }      // No parameters
int main() { }          // Also means no parameters
int main(int argc, char *argv[]) { }  // With command-line arguments (advanced)
\`\`\`

### **3. The \`printf()\` Statement**

\`\`\`c
printf("Hello, World!\\n");
\`\`\`

- **Purpose**: Prints text to the console
- **\`"Hello, World!"\`**: The string to print (text in double quotes)
- **\`\\n\`**: Newline character (moves to next line)
- **\`;\`**: Semicolon marks the end of a statement

\`\`\`c
printf("Hello, World!\\n");      // Prints and moves to next line
printf("Hello, World!");         // Prints but stays on same line
printf("Line 1\\nLine 2\\n");    // Prints two lines
\`\`\`

### **4. The \`return 0;\` Statement**

\`\`\`c
return 0;
\`\`\`

- **Purpose**: Returns 0 to the operating system
- **Meaning**: 0 indicates the program completed successfully
- **Why**: C convention - 0 = success, non-zero = error

\`\`\`c
return 0;   // Success
return 1;   // Error (custom error code)
\`\`\`

---

## 📚 Complete Program Structure

\`\`\`c
#include <stdio.h>    // Preprocessor directive

int main(void) {       // Main function (entry point)
    // Statements
    printf("Hello, World!\\n");
    return 0;          // Return success
}
\`\`\`

---

## 🎨 Adding Comments

Comments help explain your code. The compiler ignores them.

### **Single-line Comments**

\`\`\`c
// This is a single-line comment
printf("Hello"); // Comment at end of line
\`\`\`

### **Multi-line Comments**

\`\`\`c
/* This is a
   multi-line
   comment */

/*
 * This style is also common
 * for longer comments
 */
\`\`\`

### **Example with Comments**

\`\`\`c
#include <stdio.h>    // Include standard I/O library

/*
 * Main function - program entry point
 * Returns 0 on success
 */
int main(void) {
    printf("Hello, World!\\n");  // Print message
    return 0;                    // Exit successfully
}
\`\`\`

---

## 🔧 Compilation and Execution

### **Step 1: Write the Code**

Create a file named \`hello.c\`:

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`

### **Step 2: Compile**

\`\`\`bash
# Using GCC (most common)
gcc hello.c -o hello

# Using Clang
clang hello.c -o hello
\`\`\`

- **\`gcc\`**: GNU C Compiler command
- **\`hello.c\`**: Source file (your C code)
- **\`-o hello\`**: Output flag and executable name
- **Result**: Creates executable file \`hello\` (or \`hello.exe\` on Windows)

### **Step 3: Run**

\`\`\`bash
# Linux/macOS
./hello

# Windows
hello.exe
\`\`\`

**Output:**
\`\`\`
Hello, World!
\`\`\`

---

## 📊 Program Execution Flow

\`\`\`
1. Program starts at main()
2. Executes statements in order
3. printf() displays text
4. return 0 exits program
5. Control returns to operating system
\`\`\`

---

## 🎯 Variations of Hello, World!

### **Multiple Print Statements**

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, ");
    printf("World!\\n");
    printf("Welcome to C programming!\\n");
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Hello, World!
Welcome to C programming!
\`\`\`

### **Using Escape Sequences**

\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");          // Newline
    printf("Tab\\tSeparated\\n");        // Tab
    printf("Quote: \\"Hello\\"\\n");     // Double quote
    printf("Backslash: \\\\\\n");        // Backslash
    return 0;
}
\`\`\`

**Output:**
\`\`\`
Hello, World!
Tab	Separated
Quote: "Hello"
Backslash: \\\\
\`\`\`

### **Common Escape Sequences**

| Sequence | Meaning |
|----------|---------|
| \`\\n\` | Newline (moves to next line) |
| \`\\t\` | Tab (horizontal tab) |
| \`\\\\\` | Backslash |
| \`\\"\` | Double quote |
| \`\\'\` | Single quote |

---

## ⚠️ Common Errors

### **Missing Semicolon**

\`\`\`c
// ❌ Error: missing semicolon
printf("Hello")
// ✅ Correct
printf("Hello\\n");
\`\`\`

### **Missing Include**

\`\`\`c
// ❌ Error: printf not declared
int main(void) {
    printf("Hello\\n");  // Error!
    return 0;
}

// ✅ Correct
#include <stdio.h>
int main(void) {
    printf("Hello\\n");  // Works!
    return 0;
}
\`\`\`

### **Wrong Function Name**

\`\`\`c
// ❌ Error: no main function found
int Main(void) {  // Should be 'main', not 'Main'
    printf("Hello\\n");
    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Every C program must have a \`main()\` function**
2. **Use \`#include <stdio.h>\` for input/output functions**
3. **Statements end with semicolons (\`;\`)**
4. **Use \`printf()\` to display text**
5. **Use \`return 0;\` to indicate successful execution**
6. **Comments help document your code**

---

## 🚀 Practice Exercise

Try writing a program that prints:
- Your name
- A welcome message
- Your favorite programming language

**Solution:**
\`\`\`c
#include <stdio.h>

int main(void) {
    printf("Name: John Doe\\n");
    printf("Welcome to C Programming!\\n");
    printf("Favorite Language: C\\n");
    return 0;
}
\`\`\`

Congratulations! You've written your first C program! 🎉✨`

};
