import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: "2.7",
  title: 'Putting It All Together',
  status: 'demo',
  content: `# 🎯 Putting It All Together

Let's combine everything we've learned so far to build a complete, practical C program. This will reinforce all the concepts from Module 2.

---

## 📊 Project: Student Grade Calculator

Let's build a program that:
1. Takes student information as input
2. Calculates average grade
3. Determines letter grade
4. Displays formatted results

---

## 💻 Complete Program

\`\`\`c
#include <stdio.h>

// Constants
#define NUM_ASSIGNMENTS 3
#define A_GRADE 90
#define B_GRADE 80
#define C_GRADE 70
#define D_GRADE 60

/*
 * Function: calculate_average
 * Calculates the average of three grades
 * 
 * Parameters:
 *   grade1, grade2, grade3: Three assignment grades (0-100)
 * 
 * Returns:
 *   Average of the three grades
 */
float calculate_average(float grade1, float grade2, float grade3) {
    float sum = grade1 + grade2 + grade3;
    return sum / NUM_ASSIGNMENTS;
}

/*
 * Function: get_letter_grade
 * Determines letter grade based on numeric average
 * 
 * Parameters:
 *   average: Numeric grade average (0-100)
 * 
 * Returns:
 *   Character representing letter grade (A-F)
 */
char get_letter_grade(float average) {
    if (average >= A_GRADE) {
        return 'A';
    } else if (average >= B_GRADE) {
        return 'B';
    } else if (average >= C_GRADE) {
        return 'C';
    } else if (average >= D_GRADE) {
        return 'D';
    } else {
        return 'F';
    }
}

/*
 * Function: display_results
 * Displays formatted student grade report
 * 
 * Parameters:
 *   name: Student name
 *   grades: Array of three grades
 *   average: Calculated average
 *   letter_grade: Letter grade
 */
void display_results(char name[], float grades[], float average, char letter_grade) {
    printf("\\n========================================\\n");
    printf("        STUDENT GRADE REPORT\\n");
    printf("========================================\\n");
    printf("Name: %s\\n", name);
    printf("\\nAssignment Grades:\\n");
    printf("  Assignment 1: %.2f\\n", grades[0]);
    printf("  Assignment 2: %.2f\\n", grades[1]);
    printf("  Assignment 3: %.2f\\n", grades[2]);
    printf("\\nAverage: %.2f\\n", average);
    printf("Letter Grade: %c\\n", letter_grade);
    printf("========================================\\n");
}

int main(void) {
    // Variable declarations
    char student_name[50];
    float grades[NUM_ASSIGNMENTS];
    float average;
    char letter_grade;
    
    // Get student name
    printf("Enter student name: ");
    scanf("%s", student_name);
    
    // Get assignment grades
    printf("\\nEnter grades for %d assignments:\\n", NUM_ASSIGNMENTS);
    for (int i = 0; i < NUM_ASSIGNMENTS; i++) {
        printf("  Assignment %d: ", i + 1);
        scanf("%f", &grades[i]);
        
        // Validate grade (should be between 0 and 100)
        if (grades[i] < 0 || grades[i] > 100) {
            printf("    Warning: Grade should be between 0 and 100\\n");
        }
    }
    
    // Calculate average
    average = calculate_average(grades[0], grades[1], grades[2]);
    
    // Determine letter grade
    letter_grade = get_letter_grade(average);
    
    // Display results
    display_results(student_name, grades, average, letter_grade);
    
    // Additional statistics
    printf("\\nGrade Statistics:\\n");
    
    // Find highest grade
    float highest = grades[0];
    for (int i = 1; i < NUM_ASSIGNMENTS; i++) {
        if (grades[i] > highest) {
            highest = grades[i];
        }
    }
    printf("  Highest grade: %.2f\\n", highest);
    
    // Find lowest grade
    float lowest = grades[0];
    for (int i = 1; i < NUM_ASSIGNMENTS; i++) {
        if (grades[i] < lowest) {
            lowest = grades[i];
        }
    }
    printf("  Lowest grade: %.2f\\n", lowest);
    
    // Calculate grade difference
    float grade_range = highest - lowest;
    printf("  Grade range: %.2f\\n", grade_range);
    
    // Status message
    if (average >= C_GRADE) {
        printf("\\nStatus: Passing ✅\\n");
    } else {
        printf("\\nStatus: Failing ❌\\n");
        printf("Need to improve performance\\n");
    }
    
    return 0;
}
\`\`\`

**Note**: This example uses some concepts we haven't covered yet (arrays, loops, functions). Don't worry - we'll learn these in upcoming modules! For now, focus on the basic structure.

---

## 🔍 Program Breakdown

### **1. Header and Constants**

\`\`\`c
#include <stdio.h>

#define NUM_ASSIGNMENTS 3
#define A_GRADE 90
\`\`\`

- Includes standard I/O library
- Defines constants for program configuration

### **2. Input Section**

\`\`\`c
char student_name[50];
float grades[NUM_ASSIGNMENTS];

printf("Enter student name: ");
scanf("%s", student_name);

printf("Enter grades for %d assignments:\\n", NUM_ASSIGNMENTS);
scanf("%f", &grades[i]);
\`\`\`

- Gets student name using \`scanf()\`
- Gets multiple grades in a loop (concept coming later)
- Uses format specifiers (\`%s\`, \`%f\`)

### **3. Processing Section**

\`\`\`c
average = calculate_average(grades[0], grades[1], grades[2]);
letter_grade = get_letter_grade(average);
\`\`\`

- Calculates average using arithmetic operations
- Determines letter grade using comparisons

### **4. Output Section**

\`\`\`c
printf("\\n========================================\\n");
printf("        STUDENT GRADE REPORT\\n");
printf("Name: %s\\n", student_name);
printf("Average: %.2f\\n", average);
\`\`\`

- Formats output with \`printf()\`
- Uses format specifiers for proper display

---

## 📝 Simplified Version (Current Knowledge Only)

Here's a simpler version using only what we've learned so far:

\`\`\`c
#include <stdio.h>

#define A_GRADE 90
#define B_GRADE 80
#define C_GRADE 70

int main(void) {
    // Variable declarations
    char student_name[50];
    float grade1, grade2, grade3;
    float average;
    char letter_grade;
    
    // Get input
    printf("=== Student Grade Calculator ===\\n\\n");
    printf("Enter student name: ");
    scanf("%s", student_name);
    
    printf("Enter grade 1: ");
    scanf("%f", &grade1);
    
    printf("Enter grade 2: ");
    scanf("%f", &grade2);
    
    printf("Enter grade 3: ");
    scanf("%f", &grade3);
    
    // Calculate average
    average = (grade1 + grade2 + grade3) / 3.0f;
    
    // Determine letter grade
    if (average >= A_GRADE) {
        letter_grade = 'A';
    } else if (average >= B_GRADE) {
        letter_grade = 'B';
    } else if (average >= C_GRADE) {
        letter_grade = 'C';
    } else {
        letter_grade = 'F';
    }
    
    // Display results
    printf("\\n========================================\\n");
    printf("        STUDENT GRADE REPORT\\n");
    printf("========================================\\n");
    printf("Name: %s\\n", student_name);
    printf("\\nGrades:\\n");
    printf("  Grade 1: %.2f\\n", grade1);
    printf("  Grade 2: %.2f\\n", grade2);
    printf("  Grade 3: %.2f\\n", grade3);
    printf("\\nAverage: %.2f\\n", average);
    printf("Letter Grade: %c\\n", letter_grade);
    printf("========================================\\n");
    
    return 0;
}
\`\`\`

---

## 🎯 Sample Output

\`\`\`
=== Student Grade Calculator ===

Enter student name: Alice
Enter grade 1: 85.5
Enter grade 2: 92.0
Enter grade 3: 88.5

========================================
        STUDENT GRADE REPORT
========================================
Name: Alice

Grades:
  Grade 1: 85.50
  Grade 2: 92.00
  Grade 3: 88.50

Average: 88.67
Letter Grade: B
========================================
\`\`\`

---

## 📊 What We've Applied

This program uses concepts from Module 2:

1. ✅ **Header files**: \`#include <stdio.h>\`
2. ✅ **Variables**: Different data types (char array, float, char)
3. ✅ **Constants**: \`#define\` for grade thresholds
4. ✅ **Input**: \`scanf()\` with format specifiers
5. ✅ **Arithmetic**: Calculating average
6. ✅ **Output**: \`printf()\` with formatting
7. ✅ **Comments**: Documenting the code
8. ✅ **Code style**: Clean, readable formatting

---

## 🚀 Practice Exercises

### **Exercise 1: Temperature Converter**

Write a program that:
- Converts Celsius to Fahrenheit
- Uses constants for conversion formula
- Formats output to 2 decimal places

### **Exercise 2: Simple Calculator**

Write a program that:
- Takes two numbers and an operator (+, -, *, /)
- Performs the calculation
- Handles division by zero

### **Exercise 3: Rectangle Calculator**

Write a program that:
- Takes length and width as input
- Calculates area and perimeter
- Displays results with labels

---

## 🎓 Module 2 Summary

In this module, we've covered:

1. ✅ **Your First C Program** - Structure, compilation, execution
2. ✅ **Variables & Data Types** - int, float, char, and modifiers
3. ✅ **Input & Output** - printf() and scanf()
4. ✅ **Constants & Literals** - #define and const
5. ✅ **Arithmetic Operators** - +, -, *, /, %, increment/decrement
6. ✅ **Comments & Code Style** - Best practices
7. ✅ **Putting It All Together** - Complete programs

You now have the foundation to write basic C programs! 🎉

---

## 🔜 What's Next?

In Module 3, we'll learn about:
- Conditional statements (if, else, switch)
- Making decisions in your programs
- Control flow basics

Keep practicing with the exercises! 💪✨`

};


