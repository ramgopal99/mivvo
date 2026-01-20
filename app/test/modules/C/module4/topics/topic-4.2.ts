import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_2: SubLesson = {
  id: "4.2",
  title: 'Function Parameters & Return Values',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📥📤 Function Parameters & Return Values

Parameters allow functions to receive data, and return values allow functions to send results back. Understanding parameter passing and return mechanisms is crucial for effective function usage.

---

## 📥 Function Parameters

### **Parameter Types**

1. **Formal Parameters**: Variables declared in function definition
2. **Actual Parameters**: Values passed when calling the function

\`\`\`c
#include <stdio.h>

// Function definition with formal parameters
void print_sum(int a, int b) {  // a and b are formal parameters
    printf("%d + %d = %d\\n", a, b, a + b);
}

int main(void) {
    int x = 5, y = 10;
    print_sum(x, y);  // x and y are actual parameters (arguments)
    print_sum(3, 7);  // 3 and 7 are actual parameters

    return 0;
}
\`\`\`

**Output:**
\`\`\`
5 + 10 = 15
3 + 7 = 10
\`\`\`

---

## 🔄 Parameter Passing Methods

### **Pass by Value (Default)**

\`\`\`c
#include <stdio.h>

void modify_value(int x) {
    x = x * 2;  // This only changes the local copy
    printf("Inside function: x = %d\\n", x);
}

int main(void) {
    int num = 5;
    printf("Before function: num = %d\\n", num);

    modify_value(num);  // Pass by value

    printf("After function: num = %d\\n", num);  // Original unchanged

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Before function: num = 5
Inside function: x = 10
After function: num = 5
\`\`\`

---

## 📝 Multiple Parameters

### **Functions with Multiple Parameters**

\`\`\`c
#include <stdio.h>

// Function with multiple parameters of different types
float calculate_grade(int homework, int midterm, int final) {
    // Weights: homework 30%, midterm 30%, final 40%
    float weighted_sum = homework * 0.3f + midterm * 0.3f + final * 0.4f;
    return weighted_sum;
}

void print_student_info(char *name, int age, float gpa) {
    printf("Student: %s\\n", name);
    printf("Age: %d\\n", age);
    printf("GPA: %.2f\\n", gpa);
}

int main(void) {
    float grade = calculate_grade(85, 90, 88);
    printf("Final grade: %.2f\\n\\n", grade);

    print_student_info("Alice", 20, 3.8f);

    return 0;
}
\`\`\`

---

## 🔀 Default Parameter Behavior

### **Parameter Evaluation Order**

Parameters are evaluated from right to left (implementation dependent):

\`\`\`c
#include <stdio.h>

int add(int a, int b) {
    printf("Adding %d and %d\\n", a, b);
    return a + b;
}

int get_number(void) {
    static int counter = 1;
    printf("Getting number %d\\n", counter);
    return counter++;
}

int main(void) {
    // Parameters evaluated right to left
    int result = add(get_number(), get_number());
    printf("Result: %d\\n", result);

    return 0;
}
\`\`\`

---

## 📤 Return Values

### **Return Statement**

\`\`\`c
#include <stdio.h>

int find_max(int a, int b, int c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}

int main(void) {
    int max = find_max(15, 8, 23);
    printf("Maximum value: %d\\n", max);

    return 0;
}
\`\`\`

### **Multiple Return Points**

\`\`\`c
#include <stdio.h>

char get_grade_letter(float percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

int main(void) {
    float score = 85.5f;
    char grade = get_grade_letter(score);
    printf("Score: %.1f%%, Grade: %c\\n", score, grade);

    return 0;
}
\`\`\`

---

## 🔄 Functions Returning Different Types

### **Integer Return**

\`\`\`c
int get_factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\`

### **Float Return**

\`\`\`c
float calculate_circle_area(float radius) {
    const float PI = 3.14159f;
    return PI * radius * radius;
}
\`\`\`

### **Character Return**

\`\`\`c
char get_first_letter(char *word) {
    if (word == NULL || word[0] == '\\0') {
        return '\\0';  // Return null character for empty string
    }
    return word[0];
}
\`\`\`

### **Void Return (No Value)**

\`\`\`c
void print_hello(void) {
    printf("Hello, World!\\n");
    // No return statement needed for void functions
}
\`\`\`

---

## 🎯 Advanced Parameter Techniques

### **Parameter Validation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Function with parameter validation
float divide_numbers(float numerator, float denominator) {
    if (denominator == 0) {
        printf("Error: Division by zero!\\n");
        return 0.0f;  // Return default value
    }

    if (numerator < 0 || denominator < 0) {
        printf("Warning: Negative values used in division\\n");
    }

    return numerator / denominator;
}

int main(void) {
    printf("10 / 2 = %.2f\\n", divide_numbers(10, 2));
    printf("5 / 0 = %.2f\\n", divide_numbers(5, 0));

    return 0;
}
\`\`\`

---

## 📊 Function Overloading (Not in C)

**Note:** C does not support function overloading like C++ or Java.

\`\`\`c
// ❌ This is NOT allowed in C
int add(int a, int b) {
    return a + b;
}

float add(float a, float b) {  // Error: Same name as above
    return a + b;
}
\`\`\`

**Workaround:** Use different function names

\`\`\`c
// ✅ This works in C
int add_int(int a, int b) {
    return a + b;
}

float add_float(float a, float b) {
    return a + b;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Temperature Conversion Functions**

\`\`\`c
#include <stdio.h>

// Convert Celsius to Fahrenheit
float c_to_f(float celsius) {
    return (celsius * 9.0f / 5.0f) + 32.0f;
}

// Convert Fahrenheit to Celsius
float f_to_c(float fahrenheit) {
    return (fahrenheit - 32.0f) * 5.0f / 9.0f;
}

// Check if temperature is freezing
int is_freezing(float temp, char scale) {
    if (scale == 'C' || scale == 'c') {
        return temp <= 0;
    } else if (scale == 'F' || scale == 'f') {
        return temp <= 32;
    }
    return 0;  // Invalid scale
}

int main(void) {
    float temp_c = 25.0f;
    float temp_f = c_to_f(temp_c);

    printf("%.1f°C = %.1f°F\\n", temp_c, temp_f);

    if (is_freezing(temp_c, 'C')) {
        printf("Water would freeze at %.1f°C\\n", temp_c);
    } else {
        printf("Water would not freeze at %.1f°C\\n", temp_c);
    }

    return 0;
}
\`\`\`

### **Example 2: String Processing Functions**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Count vowels in a string
int count_vowels(const char *str) {
    if (str == NULL) return 0;

    int count = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        char c = str[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            count++;
        }
    }
    return count;
}

// Check if string is palindrome
int is_palindrome(const char *str) {
    if (str == NULL) return 0;

    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return 0;  // Not a palindrome
        }
    }
    return 1;  // Is a palindrome
}

int main(void) {
    char word[100];

    printf("Enter a word: ");
    scanf("%s", word);

    printf("Vowel count: %d\\n", count_vowels(word));

    if (is_palindrome(word)) {
        printf("%s is a palindrome\\n", word);
    } else {
        printf("%s is not a palindrome\\n", word);
    }

    return 0;
}
\`\`\`

### **Example 3: Mathematical Functions**

\`\`\`c
#include <stdio.h>
#include <math.h>

// Calculate power (x^y)
double power(double base, int exponent) {
    double result = 1.0;

    if (exponent == 0) return 1.0;

    int abs_exponent = abs(exponent);
    for (int i = 0; i < abs_exponent; i++) {
        result *= base;
    }

    return (exponent < 0) ? 1.0 / result : result;
}

// Check if number is perfect square
int is_perfect_square(int number) {
    if (number < 0) return 0;

    int root = (int)sqrt(number);
    return root * root == number;
}

// Calculate nth Fibonacci number
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;

    int a = 0, b = 1, temp;
    for (int i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

int main(void) {
    printf("2^3 = %.0f\\n", power(2, 3));
    printf("2^-2 = %.4f\\n", power(2, -2));

    printf("16 is perfect square: %s\\n",
           is_perfect_square(16) ? "Yes" : "No");
    printf("17 is perfect square: %s\\n",
           is_perfect_square(17) ? "Yes" : "No");

    printf("Fibonacci(10) = %d\\n", fibonacci(10));

    return 0;
}
\`\`\`

---

## ⚠️ Common Parameter/Return Mistakes

### **Missing Parameter Types**

\`\`\`c
// ❌ Old K&R style (avoid in modern C)
int add(a, b)  // Missing parameter types!
int a, b;
{
    return a + b;
}

// ✅ Modern function declaration
int add(int a, int b) {
    return a + b;
}
\`\`\`

### **Returning Local Variable Addresses**

\`\`\`c
// ❌ Dangerous: returning address of local variable
int* get_local_array(void) {
    int arr[5] = {1, 2, 3, 4, 5};
    return arr;  // Local array destroyed after function returns!
}

// ✅ Safe: caller provides the array
void fill_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] = i + 1;
    }
}
\`\`\`

### **Unused Parameters**

\`\`\`c
// Sometimes parameters are intentionally unused
void callback_function(int unused_parameter) {
    // Parameter not used in this callback
    printf("Callback executed\\n");
}

// Use void cast to suppress compiler warnings
void another_callback(int unused_param) {
    (void)unused_param;  // Tell compiler we intentionally ignore it
    printf("Another callback\\n");
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Parameters** are inputs passed to functions (pass by value)
2. **Return values** send results back from functions
3. **void functions** don't return values
4. **Parameter validation** prevents errors
5. **Multiple return points** can simplify logic
6. **Local variables** are destroyed when function ends
7. **Function overloading** is not supported in C

Master parameters and return values to create flexible, reusable functions! 📥📤✨`;
    return contentString;
  })()
};
