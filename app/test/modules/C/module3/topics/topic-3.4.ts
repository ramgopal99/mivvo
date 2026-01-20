import { SubLesson } from '../../../../data/lessonsData';

export const topic_3_4: SubLesson = {
  id: "3.4",
  title: 'Logical Operators & Complex Conditions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔗 Logical Operators in C

Logical operators allow you to combine multiple conditions and create complex decision-making logic. They work with boolean values (true/false) and are essential for writing sophisticated conditional statements.

---

## 📋 Logical Operators

### **&& (Logical AND)**

Both conditions must be true for the result to be true:

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 25;
    int hasLicense = 1;  // 1 = true, 0 = false

    if (age >= 18 && hasLicense) {
        printf("You can drive legally!\\n");
    } else {
        printf("You cannot drive legally.\\n");
    }

    return 0;
}
\`\`\`

**Truth Table for &&:**
| A | B | A && B |
|---|---|--------|
| 0 | 0 | 0      |
| 0 | 1 | 0      |
| 1 | 0 | 0      |
| 1 | 1 | 1      |

---

### **|| (Logical OR)**

At least one condition must be true for the result to be true:

\`\`\`c
#include <stdio.h>

int main(void) {
    int isWeekend = 0;  // 0 = false
    int isHoliday = 1;  // 1 = true

    if (isWeekend || isHoliday) {
        printf("You can relax today!\\n");
    } else {
        printf("Time to work!\\n");
    }

    return 0;
}
\`\`\`

**Truth Table for ||:**
| A | B | A || B |
|---|---|--------|
| 0 | 0 | 0      |
| 0 | 1 | 1      |
| 1 | 0 | 1      |
| 1 | 1 | 1      |

---

### **! (Logical NOT)**

Reverses the truth value:

\`\`\`c
#include <stdio.h>

int main(void) {
    int isLoggedIn = 0;  // 0 = false

    if (!isLoggedIn) {
        printf("Please log in first.\\n");
    } else {
        printf("Welcome back!\\n");
    }

    return 0;
}
\`\`\`

**Truth Table for !:**
| A | !A |
|---|----|
| 0 | 1  |
| 1 | 0  |

---

## 🔄 Operator Precedence

Logical operators have different priorities:

| Priority | Operator | Description |
|----------|----------|-------------|
| 1 (Highest) | \`! \` | Logical NOT |
| 2 | \`*\`, \`/\`, \`%\` | Arithmetic |
| 3 | \`+\`, \`-\` | Arithmetic |
| 4 | \`<\`, \`>\`, \`<=\`, \`>=\` | Comparison |
| 5 | \`==\`, \`!=\` | Equality |
| 6 | \`&&\` | Logical AND |
| 7 (Lowest) | \`||\` | Logical OR |

### **Precedence Examples**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a = 5, b = 10, c = 15;

    // && has higher precedence than ||
    if (a < b && b < c || a > c) {
        printf("Complex condition is true\\n");
    }
    // Equivalent to: (a < b && b < c) || (a > c)

    // Use parentheses for clarity
    if ((a < b && b < c) || (a > c)) {
        printf("Same result with parentheses\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Complex Conditions

### **Range Checking**

\`\`\`c
#include <stdio.h>

int main(void) {
    int score = 85;

    // Check if score is between 80 and 90 (inclusive)
    if (score >= 80 && score <= 90) {
        printf("Score is in the B range\\n");
    }

    // Check if number is outside a range
    if (score < 60 || score > 100) {
        printf("Invalid score\\n");
    }

    return 0;
}
\`\`\`

### **Multiple Conditions**

\`\`\`c
#include <stdio.h>

int main(void) {
    int age = 25;
    int isStudent = 1;
    int hasJob = 0;

    // Complex eligibility check
    if ((age >= 18 && age <= 30) && (isStudent || hasJob)) {
        printf("Eligible for young professional program\\n");
    }

    return 0;
}
\`\`\`

---

## 🔧 Short-Circuit Evaluation

### **AND (&&) Short-Circuit**

If the first condition is false, the second is not evaluated:

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 5;
    int y = 0;

    // y != 0 is not evaluated because x > 10 is false
    if (x > 10 && (y != 0) && (10 / y > 0)) {
        printf("This won't print\\n");
    } else {
        printf("Short-circuit prevented division by zero\\n");
    }

    return 0;
}
\`\`\`

### **OR (||) Short-Circuit**

If the first condition is true, the second is not evaluated:

\`\`\`c
#include <stdio.h>

int main(void) {
    int x = 15;

    // x > 10 is true, so x < 0 is not evaluated
    if (x > 10 || x < 0) {
        printf("x is either positive or negative\\n");
    }

    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: User Authentication**

\`\`\`c
#include <stdio.h>
#include <string.h>

int main(void) {
    char username[20];
    char password[20];
    int isAdmin = 0;

    printf("Username: ");
    scanf("%s", username);

    printf("Password: ");
    scanf("%s", password);

    // Complex authentication logic
    if ((strcmp(username, "admin") == 0 && strcmp(password, "secret") == 0) ||
        (strcmp(username, "user") == 0 && strcmp(password, "pass") == 0)) {

        if (strcmp(username, "admin") == 0) {
            isAdmin = 1;
        }

        printf("Login successful!\\n");
        if (isAdmin) {
            printf("Welcome, administrator!\\n");
        } else {
            printf("Welcome, user!\\n");
        }
    } else {
        printf("Invalid credentials\\n");
    }

    return 0;
}
\`\`\`

### **Example 2: Grade Classification**

\`\`\`c
#include <stdio.h>

int main(void) {
    float score;
    int attendance;

    printf("Enter score (0-100): ");
    scanf("%f", &score);

    printf("Enter attendance percentage: ");
    scanf("%d", &attendance);

    if (score >= 90 && attendance >= 95) {
        printf("Grade: A+ (Outstanding)\\n");
    } else if (score >= 85 && attendance >= 90) {
        printf("Grade: A\\n");
    } else if (score >= 80 && attendance >= 85) {
        printf("Grade: B+\\n");
    } else if (score >= 75 && attendance >= 80) {
        printf("Grade: B\\n");
    } else if (score >= 70 && attendance >= 75) {
        printf("Grade: C+\\n");
    } else if (score >= 60 && attendance >= 70) {
        printf("Grade: C\\n");
    } else if (score >= 50 || attendance >= 60) {
        printf("Grade: D (Conditional Pass)\\n");
    } else {
        printf("Grade: F (Fail)\\n");
    }

    return 0;
}
\`\`\`

### **Example 3: Leap Year Check**

\`\`\`c
#include <stdio.h>

int main(void) {
    int year;

    printf("Enter a year: ");
    scanf("%d", &year);

    // Leap year logic: divisible by 4, but not by 100 unless also by 400
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        printf("%d is a leap year\\n", year);
    } else {
        printf("%d is not a leap year\\n", year);
    }

    return 0;
}
\`\`\`

### **Example 4: Triangle Type Checker**

\`\`\`c
#include <stdio.h>

int main(void) {
    int a, b, c;

    printf("Enter three sides of triangle: ");
    scanf("%d %d %d", &a, &b, &c);

    // Check triangle inequality
    if (a + b > c && a + c > b && b + c > a) {
        if (a == b && b == c) {
            printf("Equilateral triangle\\n");
        } else if (a == b || a == c || b == c) {
            printf("Isosceles triangle\\n");
        } else {
            printf("Scalene triangle\\n");
        }
    } else {
        printf("Not a valid triangle\\n");
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common Logical Operator Mistakes

### **Confusing && with ||**

\`\`\`c
// ❌ Wrong logic
int age = 25;
if (age < 18 && age > 65) {  // Impossible condition!
    printf("Eligible for discount\\n");
}

// ✅ Correct logic
if (age < 18 || age > 65) {
    printf("Eligible for discount\\n");
}
\`\`\`

### **Missing Parentheses**

\`\`\`c
// ❌ Operator precedence issue
if (a || b && c) {  // Evaluates as: a || (b && c)
    // ...
}

// ✅ Clear precedence with parentheses
if ((a || b) && c) {  // Different logic
    // ...
}
\`\`\`

### **Incorrect De Morgan's Law Application**

\`\`\`c
// De Morgan's Laws:
// !(A && B) ≡ (!A || !B)
// !(A || B) ≡ (!A && !B)

// ❌ Wrong
if (!(a == 5 || b == 10)) {
    // Not equivalent to: a != 5 && b != 10
}

// ✅ Correct application
if (a != 5 && b != 10) {
    printf("Neither a is 5 nor b is 10\\n");
}
\`\`\`

---

## 🔧 Logical Operator Best Practices

1. **Use parentheses** for complex conditions to clarify precedence
2. **Short-circuit evaluation** can prevent errors (like division by zero)
3. **Avoid overly complex conditions** - break them into smaller parts
4. **Use meaningful variable names** for intermediate conditions
5. **Comment complex logic** for future maintainers
6. **Consider De Morgan's laws** when negating complex conditions

---

## 🎓 Key Takeaways

1. **\`&&\` (AND)** - both conditions must be true
2. **\`||\` (OR)** - at least one condition must be true
3. **\`! \` (NOT)** - reverses the truth value
4. **Short-circuit evaluation** - second operand not evaluated if result is determined
5. **Operator precedence** - \`!\` > \`&&\` > \`||\`
6. **Use parentheses** for complex conditions
7. **Logical operators work with** 0 (false) and non-zero (true) values

Master logical operators to create sophisticated decision-making logic! 🔗✨`;
    return contentString;
  })()
};
