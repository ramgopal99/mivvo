import { SubLesson } from '../../../../data/lessonsData';

export const topic_5_1: SubLesson = {
  id: "5.1",
  title: 'if-else Statements',
  status: 'completed',
  content: `# 🔀 if-else Statements in Java

Control structures allow your program to make decisions and execute different code paths based on conditions. The if-else statement is the most fundamental decision-making construct in Java, enabling conditional execution of code blocks.

---

## 📋 Basic if Statement

### **Simple if Statement**

The if statement executes a block of code only if a specified condition is true.

\`\`\`java
public class SimpleIf {
    public static void main(String[] args) {
        int age = 18;

        // Basic if statement
        if (age >= 18) {
            System.out.println("You are eligible to vote!");
        }

        // Code continues here regardless of the condition
        System.out.println("Program continues...");
    }
}
\`\`\`

### **Boolean Conditions**

Conditions in if statements must evaluate to a boolean value (true or false).

\`\`\`java
public class BooleanConditions {
    public static void main(String[] args) {
        boolean isRaining = true;
        boolean hasUmbrella = false;
        int temperature = 25;

        // Direct boolean variable
        if (isRaining) {
            System.out.println("It's raining!");
        }

        // Comparison operators
        if (temperature > 30) {
            System.out.println("It's very hot!");
        }

        if (temperature < 10) {
            System.out.println("It's very cold!");
        }

        // Logical operators
        if (isRaining && !hasUmbrella) {
            System.out.println("You might get wet!");
        }

        // Arithmetic expressions
        if (temperature % 2 == 0) {
            System.out.println("Temperature is even");
        }
    }
}
\`\`\`

---

## 🔀 if-else Statement

### **Basic if-else Structure**

The if-else statement provides two execution paths - one for when the condition is true, and another for when it's false.

\`\`\`java
public class IfElseBasic {
    public static void main(String[] args) {
        int score = 75;

        if (score >= 60) {
            System.out.println("You passed the exam!");
            System.out.println("Congratulations!");
        } else {
            System.out.println("You did not pass the exam.");
            System.out.println("Better luck next time.");
        }

        // Only one of the above blocks will execute
        System.out.println("Exam evaluation complete.");
    }
}
\`\`\`

### **Real-World Examples**

\`\`\`java
public class IfElseExamples {
    public static void main(String[] args) {
        // Example 1: Age verification
        int age = 17;
        if (age >= 18) {
            System.out.println("Access granted - you are an adult.");
        } else {
            System.out.println("Access denied - you must be 18 or older.");
        }

        // Example 2: Grade classification
        int examScore = 85;
        if (examScore >= 90) {
            System.out.println("Grade: A - Excellent work!");
        } else {
            System.out.println("Grade needs improvement.");
        }

        // Example 3: Login system
        String username = "admin";
        String password = "secret";
        boolean isValidUser = username.equals("admin");
        boolean isValidPassword = password.equals("secret");

        if (isValidUser && isValidPassword) {
            System.out.println("Login successful!");
        } else {
            System.out.println("Login failed - invalid credentials.");
        }
    }
}
\`\`\`

---

## 🔄 if-else if-else Ladder

### **Multiple Conditions**

The if-else if-else ladder allows testing multiple conditions in sequence.

\`\`\`java
public class IfElseIfLadder {
    public static void main(String[] args) {
        int marks = 85;

        if (marks >= 90) {
            System.out.println("Grade: A+");
            System.out.println("Outstanding performance!");
        } else if (marks >= 80) {
            System.out.println("Grade: A");
            System.out.println("Excellent work!");
        } else if (marks >= 70) {
            System.out.println("Grade: B");
            System.out.println("Good job!");
        } else if (marks >= 60) {
            System.out.println("Grade: C");
            System.out.println("Satisfactory");
        } else if (marks >= 50) {
            System.out.println("Grade: D");
            System.out.println("Needs improvement");
        } else {
            System.out.println("Grade: F");
            System.out.println("Failed - try again");
        }
    }
}
\`\`\`

### **Traffic Light System Example**

\`\`\`java
public class TrafficLight {
    public static void main(String[] args) {
        String lightColor = "yellow";

        if (lightColor.equals("red")) {
            System.out.println("STOP! Do not proceed.");
        } else if (lightColor.equals("yellow")) {
            System.out.println("CAUTION! Prepare to stop.");
        } else if (lightColor.equals("green")) {
            System.out.println("GO! Safe to proceed.");
        } else {
            System.out.println("INVALID LIGHT COLOR!");
        }
    }
}
\`\`\`

---

## 🎯 Nested if Statements

### **if Inside if**

You can place if statements inside other if statements for more complex logic.

\`\`\`java
public class NestedIf {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;
        boolean hasInsurance = true;

        if (age >= 18) {
            System.out.println("You are old enough to drive.");

            if (hasLicense) {
                System.out.println("You have a valid license.");

                if (hasInsurance) {
                    System.out.println("You have insurance.");
                    System.out.println("You are fully qualified to drive!");
                } else {
                    System.out.println("You need insurance to drive legally.");
                }
            } else {
                System.out.println("You need a license to drive.");
            }
        } else {
            System.out.println("You are too young to drive.");
        }
    }
}
\`\`\`

### **Avoiding Deep Nesting**

Deep nesting can make code hard to read. Consider alternatives:

\`\`\`java
public class AvoidingDeepNesting {
    public static void main(String[] args) {
        int age = 25;
        boolean hasLicense = true;
        boolean hasInsurance = false;

        // ❌ Deep nesting (hard to read)
        if (age >= 18) {
            if (hasLicense) {
                if (hasInsurance) {
                    System.out.println("Fully qualified!");
                } else {
                    System.out.println("Need insurance");
                }
            } else {
                System.out.println("Need license");
            }
        } else {
            System.out.println("Too young");
        }

        // ✅ Early returns (cleaner)
        if (age < 18) {
            System.out.println("Too young to drive");
            return;
        }

        if (!hasLicense) {
            System.out.println("Need a license");
            return;
        }

        if (!hasInsurance) {
            System.out.println("Need insurance");
            return;
        }

        System.out.println("Fully qualified to drive!");
    }
}
\`\`\`

---

## 🔧 Comparison Operators in Conditions

### **Common Comparison Patterns**

\`\`\`java
public class ComparisonOperators {
    public static void main(String[] args) {
        int x = 10;
        int y = 20;

        // Equality
        if (x == y) {
            System.out.println("x equals y");
        }

        // Inequality
        if (x != y) {
            System.out.println("x does not equal y");
        }

        // Greater than
        if (x > y) {
            System.out.println("x is greater than y");
        }

        // Less than
        if (x < y) {
            System.out.println("x is less than y");
        }

        // Greater than or equal
        if (x >= y) {
            System.out.println("x is greater than or equal to y");
        }

        // Less than or equal
        if (x <= y) {
            System.out.println("x is less than or equal to y");
        }

        // Range checking
        int score = 85;
        if (score >= 80 && score <= 89) {
            System.out.println("Score is in the 80s range");
        }

        // Boundary checks
        int temperature = 75;
        if (temperature < 32) {
            System.out.println("Freezing!");
        } else if (temperature > 100) {
            System.out.println("Very hot!");
        } else {
            System.out.println("Comfortable temperature");
        }
    }
}
\`\`\`

---

## 🎯 Practical Applications

### **User Authentication**

\`\`\`java
public class UserAuthentication {
    public static void main(String[] args) {
        String username = "john_doe";
        String password = "secret123";
        boolean isAdmin = false;

        // Basic login check
        if (username.equals("john_doe") && password.equals("secret123")) {
            System.out.println("Login successful!");

            // Role-based access
            if (isAdmin) {
                System.out.println("Welcome, Administrator!");
                System.out.println("You have full system access.");
            } else {
                System.out.println("Welcome, User!");
                System.out.println("You have standard access.");
            }
        } else {
            System.out.println("Login failed - invalid credentials.");
        }
    }
}
\`\`\`

### **E-commerce Discount System**

\`\`\`java
public class DiscountSystem {
    public static void main(String[] args) {
        double purchaseAmount = 150.0;
        boolean isPremiumMember = true;
        String couponCode = "SAVE20";

        double discount = 0.0;

        // Amount-based discount
        if (purchaseAmount >= 100) {
            discount = 10.0; // 10% discount for orders over $100
        }

        // Membership discount
        if (isPremiumMember) {
            discount += 5.0; // Additional 5% for premium members
        }

        // Coupon discount
        if (couponCode.equals("SAVE20")) {
            discount += 20.0; // Additional 20% off
        }

        // Cap discount at 50%
        if (discount > 50.0) {
            discount = 50.0;
        }

        double finalAmount = purchaseAmount * (1 - discount / 100);

        System.out.println("Original amount: $" + purchaseAmount);
        System.out.println("Discount applied: " + discount + "%");
        System.out.println("Final amount: $" + finalAmount);
    }
}
\`\`\`

### **Student Grade Calculator**

\`\`\`java
public class GradeCalculator {
    public static void main(String[] args) {
        int mathScore = 85;
        int scienceScore = 92;
        int englishScore = 78;

        // Calculate average
        double average = (mathScore + scienceScore + englishScore) / 3.0;

        // Determine letter grade
        String letterGrade;
        String feedback;

        if (average >= 90) {
            letterGrade = "A";
            feedback = "Outstanding performance!";
        } else if (average >= 80) {
            letterGrade = "B";
            feedback = "Good job!";
        } else if (average >= 70) {
            letterGrade = "C";
            feedback = "Satisfactory work";
        } else if (average >= 60) {
            letterGrade = "D";
            feedback = "Needs improvement";
        } else {
            letterGrade = "F";
            feedback = "Must retake course";
        }

        System.out.println("Student Grade Report");
        System.out.println("====================");
        System.out.println("Math: " + mathScore);
        System.out.println("Science: " + scienceScore);
        System.out.println("English: " + englishScore);
        System.out.println("Average: " + String.format("%.2f", average));
        System.out.println("Grade: " + letterGrade);
        System.out.println("Feedback: " + feedback);
    }
}
\`\`\`

---

## ⚠️ Common if-else Mistakes

### **Missing Braces**

\`\`\`java
public class CommonMistakes {
    public static void main(String[] args) {
        int x = 5;

        // ❌ Missing braces - only first statement is conditional
        if (x > 0)
            System.out.println("x is positive");
            System.out.println("This always executes!"); // Bug!

        // ✅ Correct with braces
        if (x > 0) {
            System.out.println("x is positive");
            System.out.println("Both statements are conditional");
        }

        // ✅ Single statement doesn't need braces (but recommended)
        if (x < 0)
            System.out.println("x is negative");
    }
}
\`\`\`

### **Assignment vs Comparison**

\`\`\`java
public class AssignmentVsComparison {
    public static void main(String[] args) {
        int x = 5;
        boolean condition;

        // ❌ Wrong: assignment instead of comparison
        // if (condition = true) {  // This assigns true to condition
        //     System.out.println("This will always execute");
        // }

        // ❌ Wrong: assignment in condition
        // if (x = 10) {  // This assigns 10 to x, then checks if x is truthy
        //     System.out.println("This might not work as expected");
        // }

        // ✅ Correct: comparison
        if (x == 10) {
            System.out.println("x equals 10");
        }

        // ✅ Correct: explicit assignment and comparison
        condition = (x > 0);
        if (condition) {
            System.out.println("x is positive");
        }
    }
}
\`\`\`

### **Floating-Point Comparison Issues**

\`\`\`java
public class FloatingPointIssues {
    public static void main(String[] args) {
        double x = 0.1 + 0.2;  // 0.30000000000000004 due to floating-point precision

        // ❌ Wrong: direct comparison
        // if (x == 0.3) {
        //     System.out.println("x equals 0.3");
        // }

        // ✅ Better: use epsilon comparison
        double epsilon = 0.0001;
        if (Math.abs(x - 0.3) < epsilon) {
            System.out.println("x is approximately equal to 0.3");
        }

        // ✅ For money, use BigDecimal or integer cents
        // BigDecimal price = new BigDecimal("19.99");
        // if (price.compareTo(new BigDecimal("20.00")) < 0) {
        //     System.out.println("Price is less than $20.00");
        // }
    }
}
\`\`\`

---

## 🎯 Ternary Operator (?:)

### **Compact if-else**

The ternary operator provides a compact way to write simple if-else statements.

\`\`\`java
public class TernaryOperator {
    public static void main(String[] args) {
        int age = 20;

        // Traditional if-else
        String status;
        if (age >= 18) {
            status = "Adult";
        } else {
            status = "Minor";
        }
        System.out.println("Status (if-else): " + status);

        // Ternary operator: condition ? true_value : false_value
        String ternaryStatus = (age >= 18) ? "Adult" : "Minor";
        System.out.println("Status (ternary): " + ternaryStatus);

        // Multiple ternary operators
        int score = 85;
        String grade = (score >= 90) ? "A" :
                      (score >= 80) ? "B" :
                      (score >= 70) ? "C" : "F";
        System.out.println("Grade: " + grade);

        // In method calls
        int max = (5 > 3) ? 5 : 3;
        System.out.println("Maximum: " + max);
    }
}
\`\`\`

---

## 🎯 Best Practices

### **1. Use Descriptive Conditions**

\`\`\`java
public class BestPractices {
    public static void main(String[] args) {
        int userAge = 25;
        boolean isLoggedIn = true;
        boolean hasPermission = false;

        // ✅ Good: descriptive conditions
        if (userAge >= 18 && isLoggedIn && hasPermission) {
            System.out.println("Access granted");
        }

        // ❌ Bad: magic numbers and unclear logic
        // if (userAge > 17 && isLoggedIn == true && hasPermission == false) {
        //     System.out.println("Access granted");
        // }

        // ✅ Extract complex conditions to variables
        boolean isAuthorized = userAge >= 18 && isLoggedIn;
        boolean hasAccess = isAuthorized && hasPermission;

        if (hasAccess) {
            System.out.println("Access granted");
        } else {
            System.out.println("Access denied");
        }
    }
}
\`\`\`

### **2. Avoid Negative Conditions When Possible**

\`\`\`java
public class PositiveConditions {
    public static void main(String[] args) {
        boolean isValid = false;

        // ❌ Negative condition (harder to read)
        if (!isValid) {
            System.out.println("Input is invalid");
            return;
        }
        // Continue with valid input...

        // ✅ Positive condition (easier to read)
        if (isValid) {
            // Process valid input
            System.out.println("Processing valid input...");
        } else {
            System.out.println("Input is invalid");
            return;
        }
    }
}
\`\`\`

### **3. Keep Conditions Simple**

\`\`\`java
public class SimpleConditions {
    public static void main(String[] args) {
        // ✅ Simple, readable conditions
        if (isUserLoggedIn() && hasValidSubscription()) {
            showPremiumContent();
        }

        // ❌ Complex condition (hard to debug)
        // if (user != null && user.getAccount() != null &&
        //     user.getAccount().getSubscription() != null &&
        //     user.getAccount().getSubscription().isActive() &&
        //     !user.getAccount().getSubscription().isExpired()) {
        //     showPremiumContent();
        // }
    }

    // Helper methods make conditions readable
    private static boolean isUserLoggedIn() { return true; }
    private static boolean hasValidSubscription() { return true; }
    private static void showPremiumContent() {
        System.out.println("Showing premium content");
    }
}
\`\`\`

---

## 🎯 Summary

if-else statements are the foundation of decision-making in Java:

### **Key Concepts**
- **if**: Executes code when condition is true
- **else**: Executes code when condition is false
- **else if**: Tests additional conditions
- **Nested if**: if statements inside other if statements
- **Ternary operator**: Compact if-else for simple cases

### **Common Patterns**
- **Range checking**: \`if (value >= min && value <= max)\`
- **State validation**: \`if (isValid) { process() } else { error() }\`
- **Role-based logic**: \`if (isAdmin) { adminActions() } else { userActions() }\`

### **Best Practices**
- Always use braces for clarity
- Keep conditions simple and readable
- Use early returns to avoid deep nesting
- Extract complex conditions to variables
- Prefer positive conditions over negative ones

Master if-else statements and you'll be able to create dynamic, responsive Java programs that can handle any decision-making scenario!

### **Quick Check**
What will be the output of this code?
\`\`\`java
int score = 85;
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else if (score >= 70) {
    System.out.println("C");
} else {
    System.out.println("F");
}
\`\`\``
};

