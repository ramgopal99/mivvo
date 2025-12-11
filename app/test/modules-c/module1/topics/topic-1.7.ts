import { SubLesson } from '../../../data/lessonsData';

export const topic_1_7: SubLesson = {
  id: 1.7,
  title: 'Testing Your C Setup',
  status: 'completed',
  content: `# 🧪 Testing Your C Development Setup

Verify that your C compiler, editor, and development environment are working correctly.

---

## 📋 Testing Checklist

### Before Starting
- [ ] GCC compiler installed and in PATH
- [ ] Code editor configured for C development
- [ ] Basic command-line knowledge
- [ ] Text editor for writing code

### What We'll Test
- [ ] Compiler installation
- [ ] Basic program compilation
- [ ] Program execution
- [ ] Error detection
- [ ] Debugging setup

---

## 🧪 Test 1: Compiler Verification

### Check GCC Installation

\`\`\`bash
# Check GCC version
gcc --version

# Expected output (version numbers may vary):
# gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0
# or
# gcc (MinGW-W64 x86_64-posix-seh) 12.2.0
\`\`\`

### Check Essential Tools

\`\`\`bash
# Check Make utility
make --version

# Check debugger (optional but recommended)
gdb --version

# Check if basic commands work
echo "Testing terminal"
\`\`\`

---

## 🧪 Test 2: Hello World Program

### Create the Test Program

Create a file named \`hello.c\` with this content:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, C World!\\n");
    printf("My C setup is working!\\n");
    return 0;
}
\`\`\`

### Compile the Program

\`\`\`bash
# Compile with warnings (recommended)
gcc -Wall -o hello hello.c

# Check if compilation succeeded (no error messages)
\`\`\`

### Run the Program

\`\`\`bash
# Run the executable
./hello

# On Windows, use:
# hello.exe
\`\`\`

**Expected output:**
\`\`\`
Hello, C World!
My C setup is working!
\`\`\`

---

## 🧪 Test 3: Error Detection Test

### Create a Program with Errors

Create \`errors.c\` with intentional mistakes:

\`\`\`c
#include <stdio.h>

int main() {
    printf("Testing error detection\\n")
    // Missing semicolon above

    int x = 42
    // Missing semicolon above

    printf("x = %d\\n", x);
    return 0;
}
\`\`\`

### Try to Compile

\`\`\`bash
# Compile with warnings enabled
gcc -Wall -o errors errors.c
\`\`\`

**Expected errors:**
\`\`\`
errors.c:5:42: error: expected ';' before 'int'
errors.c:5:5: error: 'x' undeclared (first use in this function)
\`\`\`

**This is good!** The compiler caught the errors. Now fix them and recompile.

---

## 🧪 Test 4: Input/Output Test

### Create Interactive Program

Create \`interactive.c\`:

\`\`\`c
#include <stdio.h>

int main() {
    char name[50];
    int age;

    printf("What's your name? ");
    scanf("%s", name);

    printf("How old are you? ");
    scanf("%d", &age);

    printf("Hello, %s! You are %d years old.\\n", name, age);
    printf("C programming is awesome!\\n");

    return 0;
}
\`\`\`

### Compile and Test

\`\`\`bash
# Compile
gcc -Wall -o interactive interactive.c

# Run and provide input
./interactive
# Type: John
# Type: 25
\`\`\`

**Expected interaction:**
\`\`\`
What's your name? John
How old are you? 25
Hello, John! You are 25 years old.
C programming is awesome!
\`\`\`

---

## 🧪 Test 5: Math Library Test

### Create Math Program

Create \`math_test.c\`:

\`\`\`c
#include <stdio.h>
#include <math.h>

int main() {
    double x = 4.0;
    double sqrt_x = sqrt(x);
    double pow_result = pow(2.0, 3.0);

    printf("Square root of %.1f is %.2f\\n", x, sqrt_x);
    printf("2 to the power of 3 is %.0f\\n", pow_result);
    printf("Math library is working!\\n");

    return 0;
}
\`\`\`

### Compile with Math Library

\`\`\`bash
# Link with math library (-lm flag)
gcc -Wall -o math_test math_test.c -lm

# Run the program
./math_test
\`\`\`

**Expected output:**
\`\`\`
Square root of 4.0 is 2.00
2 to the power of 3 is 8
Math library is working!
\`\`\`

---

## 🧪 Test 6: Multi-File Program

### Create Header File

Create \`helper.h\`:

\`\`\`c
#ifndef HELPER_H
#define HELPER_H

// Function declaration
int add_numbers(int a, int b);
void print_message(char* message);

#endif
\`\`\`

### Create Implementation File

Create \`helper.c\`:

\`\`\`c
#include <stdio.h>
#include "helper.h"

// Function definitions
int add_numbers(int a, int b) {
    return a + b;
}

void print_message(char* message) {
    printf("%s\\n", message);
}
\`\`\`

### Create Main File

Create \`main.c\`:

\`\`\`c
#include <stdio.h>
#include "helper.h"

int main() {
    int result = add_numbers(5, 3);
    printf("5 + 3 = %d\\n", result);

    print_message("Multi-file compilation works!");

    return 0;
}
\`\`\`

### Compile Multi-File Program

\`\`\`bash
# Compile all files together
gcc -Wall -o multi_file main.c helper.c

# Run the program
./multi_file
\`\`\`

**Expected output:**
\`\`\`
5 + 3 = 8
Multi-file compilation works!
\`\`\`

---

## 🧪 Test 7: Debugging Test (Optional)

### Create Debug Program

Create \`debug_test.c\`:

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
        printf("After adding %d, sum = %d\\n", numbers[i], sum);
    }

    printf("Final sum: %d\\n", sum);
    return 0;
}
\`\`\`

### Compile with Debug Symbols

\`\`\`bash
# Compile with debugging symbols
gcc -g -Wall -o debug_test debug_test.c
\`\`\`

### Test with GDB (if available)

\`\`\`bash
# Start debugger
gdb debug_test

# Inside GDB:
# break main
# run
# next (step through code)
# print sum (check variable value)
# continue
# quit
\`\`\`

---

## 🐛 Troubleshooting Failed Tests

### "gcc: command not found"
- Check if GCC is installed
- Verify PATH environment variable
- Reinstall GCC following platform-specific guide

### Compilation Errors
- Check for typos in code
- Ensure all braces and semicolons are present
- Verify header files exist

### Runtime Errors
- Check file permissions: \`chmod +x program\`
- Use full paths if needed
- Check for missing libraries

### Library Link Errors
- Add \`-lm\` for math library
- Check library installation
- Use correct linking order

---

## 📊 Test Results Summary

### All Tests Passed ✅
Congratulations! Your C development environment is fully functional.

### Some Tests Failed ❌
Review the troubleshooting section and platform-specific installation guides.

### Next Steps
1. **Start learning C basics** (Module 2)
2. **Practice regularly** with simple programs
3. **Join C programming communities**
4. **Read "The C Programming Language" by K&R**

---

## 🧹 Cleanup Test Files

After testing, clean up the test files:

\`\`\`bash
# Remove test executables
rm hello hello.exe errors interactive math_test multi_file debug_test

# Remove test source files (optional)
rm hello.c errors.c interactive.c math_test.c main.c helper.c helper.h
\`\`\`

---

## 📚 Additional Testing Resources

### Online Compilers (for comparison)
- [OnlineGDB](https://www.onlinegdb.com/)
- [Programiz C Compiler](https://www.programiz.com/c-programming/online-compiler/)
- [Replit C](https://replit.com/languages/c)

### Static Analysis Tools
- \`cppcheck\` - Static code analysis
- \`valgrind\` - Memory debugging
- \`splint\` - Secure programming lint

---

## 🎯 What to Do Next

### Immediate Next Steps
1. **Complete Module 1** - Review all topics
2. **Start Module 2** - Learn C basics
3. **Practice daily** - Write small programs
4. **Join communities** - Reddit r/C_Programming, Stack Overflow

### Long-term Goals
- **Master pointers** (most challenging C concept)
- **Learn systems programming**
- **Contribute to open source C projects**
- **Build complex applications**

**🎉 Congratulations! Your C development environment is ready. Welcome to the world of systems programming! 🚀**`
};
