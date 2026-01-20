import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_6: SubLesson = {
  id: "2.6",
  title: 'Comments & Code Style',
  status: 'demo',
  content: `# 💬 Comments and Code Style in C

Writing clean, readable, and well-commented code is essential for maintainability and collaboration. Let's learn best practices for C programming style.

---

## 📝 Comments in C

Comments are notes in your code that the compiler ignores. They help explain what your code does and why.

### **Single-line Comments (C99+)**

\`\`\`c
// This is a single-line comment
int x = 10;  // Initialize x to 10

// You can use multiple single-line comments
// for longer explanations
// across several lines
\`\`\`

### **Multi-line Comments (Traditional C)**

\`\`\`c
/* This is a multi-line comment
   that spans multiple lines */

/* You can also write it
 * with asterisks
 * for better readability
 */

/* Or on a single line */
int x = 10; /* x represents the count */
\`\`\`

### **Commenting Out Code**

\`\`\`c
// Temporarily disable code
// printf("This won't execute");

/* Or use block comments
printf("This also won't execute");
printf("Neither will this");
*/
\`\`\`

---

## 📚 Types of Comments

### **1. Header Comments (File Documentation)**

\`\`\`c
/*
 * File: calculator.c
 * Author: John Doe
 * Date: 2024-01-15
 * Description: Simple calculator program with basic arithmetic operations
 * License: MIT
 */

#include <stdio.h>
\`\`\`

### **2. Function Documentation**

\`\`\`c
/**
 * Calculates the area of a circle
 * 
 * @param radius The radius of the circle
 * @return The area of the circle (π * radius²)
 */
float calculate_circle_area(float radius) {
    const float PI = 3.14159f;
    return PI * radius * radius;
}
\`\`\`

### **3. Inline Comments (Explain Complex Logic)**

\`\`\`c
int result;
// Check if number is even (divisible by 2)
if (number % 2 == 0) {
    result = number / 2;  // Divide by 2 if even
} else {
    result = number * 3 + 1;  // Collatz sequence for odd numbers
}
\`\`\`

### **4. TODO Comments**

\`\`\`c
// TODO: Add input validation
// TODO: Implement error handling
// FIXME: Memory leak in function cleanup()
// NOTE: This works but could be optimized
\`\`\`

---

## 🎨 Code Style Guidelines

### **1. Naming Conventions**

#### **Variables and Functions (snake_case)**

\`\`\`c
// ✅ Good: descriptive, lowercase with underscores
int student_count;
float average_grade;
void calculate_total(void);

// ❌ Bad: unclear abbreviations
int sc;
float ag;
void calc(void);
\`\`\`

#### **Constants (UPPERCASE)**

\`\`\`c
// ✅ Good: constants in uppercase
#define MAX_SIZE 100
#define PI 3.14159
const int BUFFER_SIZE = 1024;

// ❌ Bad: constants not clearly marked
#define maxSize 100
const int buffer_size = 1024;
\`\`\`

#### **Type Names (CamelCase or snake_case with _t suffix)**

\`\`\`c
// Common C convention
typedef struct {
    int x, y;
} Point;

// Or with _t suffix (POSIX style)
typedef int size_t;
\`\`\`

### **2. Indentation and Spacing**

#### **Use Consistent Indentation (4 spaces recommended)**

\`\`\`c
// ✅ Good: 4-space indentation
int main(void) {
    int x = 10;
    if (x > 5) {
        printf("x is greater than 5\\n");
    }
    return 0;
}

// ❌ Bad: inconsistent indentation
int main(void) {
  int x = 10;
    if (x > 5) {
  printf("x is greater than 5\\n");
    }
  return 0;
}
\`\`\`

#### **Add Spaces Around Operators**

\`\`\`c
// ✅ Good: spaces around operators
int sum = a + b;
if (count > 10) {
    result = x * y;
}

// ❌ Bad: no spaces
int sum=a+b;
if(count>10){
    result=x*y;
}
\`\`\`

#### **Add Spaces After Commas**

\`\`\`c
// ✅ Good
printf("%d %d %d\\n", x, y, z);
int a = 1, b = 2, c = 3;

// ❌ Bad
printf("%d %d %d\\n",x,y,z);
int a=1,b=2,c=3;
\`\`\`

### **3. Braces Style**

#### **K&R Style (Traditional C)**

\`\`\`c
// Opening brace on same line
int main(void) {
    if (condition) {
        // code
    }
}
\`\`\`

#### **Allman Style (Alternative)**

\`\`\`c
// Opening brace on new line
int main(void)
{
    if (condition)
    {
        // code
    }
}
\`\`\`

**Choose one style and be consistent!**

### **4. Line Length and Formatting**

\`\`\`c
// ✅ Good: reasonable line length, clear formatting
if (student_count > 0 && average_grade >= 70.0f) {
    printf("Class average: %.2f\\n", average_grade);
}

// ❌ Bad: too long, hard to read
if(student_count>0&&average_grade>=70.0f){printf("Class average: %.2f\\n",average_grade);}
\`\`\`

#### **Breaking Long Lines**

\`\`\`c
// ✅ Good: break long lines logically
if (student_count > 0 
    && average_grade >= 70.0f 
    && max_score <= 100) {
    // code
}

// Long function call
printf("Student: %s, Age: %d, Grade: %.2f\\n",
       student_name, age, grade);
\`\`\`

---

## 📖 Complete Style Example

### **❌ Poorly Styled Code**

\`\`\`c
#include <stdio.h>
int main(void){
int x=10,y=5;
float result=(float)x/y;
if(result>1.5){
printf("Result is %f\\n",result);
}
return 0;
}
\`\`\`

### **✅ Well-Styled Code**

\`\`\`c
#include <stdio.h>

/*
 * Program: Simple Division Calculator
 * Demonstrates basic division and conditional output
 */

int main(void) {
    int x = 10, y = 5;
    float result = (float)x / y;
    
    if (result > 1.5) {
        printf("Result is %.2f\\n", result);
    }
    
    return 0;
}
\`\`\`

---

## 🎯 Best Practices

### **1. Write Self-Documenting Code**

\`\`\`c
// ❌ Needs comment to understand
int x = 10;
int y = x * 2;

// ✅ Self-explanatory
int student_count = 10;
int total_capacity = student_count * 2;
\`\`\`

### **2. Comment the "Why", Not the "What"**

\`\`\`c
// ❌ Obvious comment (not helpful)
int count = 0;  // Set count to zero

// ✅ Explains reasoning
int count = 0;  // Initialize counter for loop iterations

// ❌ Redundant
if (age >= 18) {  // Check if age is greater than or equal to 18

// ✅ Explains purpose
if (age >= 18) {  // Verify user is an adult
\`\`\`

### **3. Keep Comments Up-to-Date**

\`\`\`c
// ❌ Comment is outdated
int max_users = 50;  // Maximum 100 users allowed

// ✅ Correct comment
int max_users = 50;  // Maximum 50 users allowed (reduced from 100)
\`\`\`

### **4. Use Consistent Comment Style**

\`\`\`c
/*
 * Choose one comment style and stick with it
 * throughout your project
 */
\`\`\`

---

## 🔧 Code Organization

### **File Structure**

\`\`\`c
/*
 * Header comment (file description)
 */

// Includes
#include <stdio.h>
#include <stdlib.h>

// Constants
#define MAX_SIZE 100
#define PI 3.14159f

// Function prototypes
void function1(void);
int calculate_sum(int a, int b);

// Main function
int main(void) {
    // Program code
    return 0;
}

// Function definitions
void function1(void) {
    // Implementation
}

int calculate_sum(int a, int b) {
    return a + b;
}
\`\`\`

---

## 📋 Style Checklist

- [ ] Consistent indentation (4 spaces)
- [ ] Spaces around operators
- [ ] Descriptive variable names (snake_case)
- [ ] Constants in UPPERCASE
- [ ] Comments explain "why", not "what"
- [ ] Braces used consistently
- [ ] Lines not too long (max 80-100 characters)
- [ ] Header comments for files
- [ ] Function documentation comments

---

## 🎓 Key Takeaways

1. **Comments** help explain code to other developers (and future you!)
2. **Consistent style** makes code easier to read and maintain
3. **Self-documenting code** is better than over-commented code
4. **Follow C conventions**: snake_case for variables, UPPERCASE for constants
5. **Use comments wisely** - explain complex logic, not obvious code

Clean, well-styled code is professional code! 💬✨`

};


