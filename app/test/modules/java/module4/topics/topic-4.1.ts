import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_1: SubLesson = {
  id: "4.1",
  title: 'Arithmetic Operators',
  status: 'completed',
  content: `# ➕ Arithmetic Operators in Java

Arithmetic operators are fundamental mathematical operations used to perform calculations on numeric data types. Java provides a complete set of arithmetic operators for basic mathematical computations.

---

## 🔢 Basic Arithmetic Operators

### **Addition (+)**

The addition operator adds two operands together.

\`\`\`java
public class AdditionExamples {
    public static void main(String[] args) {
        // Integer addition
        int a = 10;
        int b = 20;
        int sum = a + b;  // Result: 30

        System.out.println("Sum: " + sum);

        // Floating-point addition
        double x = 3.14;
        double y = 2.86;
        double total = x + y;  // Result: 6.0

        System.out.println("Total: " + total);

        // String concatenation (special case)
        String firstName = "John";
        String lastName = "Doe";
        String fullName = firstName + " " + lastName;  // "John Doe"

        System.out.println("Full Name: " + fullName);
    }
}
\`\`\`

### **Subtraction (-)**

The subtraction operator subtracts the right operand from the left operand.

\`\`\`java
public class SubtractionExamples {
    public static void main(String[] args) {
        // Basic subtraction
        int result = 50 - 25;  // Result: 25
        System.out.println("50 - 25 = " + result);

        // Negative results
        int difference = 10 - 20;  // Result: -10
        System.out.println("10 - 20 = " + difference);

        // Floating-point subtraction
        double balance = 1000.50;
        double withdrawal = 250.25;
        double remaining = balance - withdrawal;  // Result: 750.25

        System.out.println("Remaining balance: $" + remaining);

        // Temperature conversion (Celsius to Fahrenheit)
        double celsius = 25.0;
        double fahrenheit = (celsius * 9/5) + 32;
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
    }
}
\`\`\`

### **Multiplication (*)**

The multiplication operator multiplies two operands.

\`\`\`java
public class MultiplicationExamples {
    public static void main(String[] args) {
        // Basic multiplication
        int product = 6 * 7;  // Result: 42
        System.out.println("6 × 7 = " + product);

        // Area calculation
        int length = 10;
        int width = 5;
        int area = length * width;  // Result: 50

        System.out.println("Rectangle area: " + area);

        // Floating-point multiplication
        double price = 19.99;
        int quantity = 3;
        double total = price * quantity;  // Result: 59.97

        System.out.println("Total cost: $" + total);

        // Scientific calculations
        double force = 10.0;  // Newtons
        double acceleration = 2.5;  // m/s²
        double mass = force / acceleration;  // Newton's second law

        System.out.println("Mass = " + mass + " kg");
    }
}
\`\`\`

### **Division (/)**

The division operator divides the left operand by the right operand.

\`\`\`java
public class DivisionExamples {
    public static void main(String[] args) {
        // Integer division (truncates decimal part)
        int result1 = 17 / 5;  // Result: 3 (not 3.4)
        System.out.println("17 ÷ 5 = " + result1);

        // Floating-point division
        double result2 = 17.0 / 5.0;  // Result: 3.4
        System.out.println("17.0 ÷ 5.0 = " + result2);

        // Mixed division
        double result3 = 17 / 5.0;  // Result: 3.4 (one operand is double)
        System.out.println("17 ÷ 5.0 = " + result3);

        // Average calculation
        int score1 = 85, score2 = 92, score3 = 78;
        double average = (score1 + score2 + score3) / 3.0;
        System.out.println("Average score: " + average);

        // Percentage calculation
        int obtainedMarks = 85;
        int totalMarks = 100;
        double percentage = (obtainedMarks * 100.0) / totalMarks;
        System.out.println("Percentage: " + percentage + "%");
    }
}
\`\`\`

### **Modulus (%)**

The modulus operator returns the remainder of division.

\`\`\`java
public class ModulusExamples {
    public static void main(String[] args) {
        // Basic modulus
        int remainder = 17 % 5;  // Result: 2
        System.out.println("17 % 5 = " + remainder);

        // Even/Odd check
        int number = 42;
        if (number % 2 == 0) {
            System.out.println(number + " is even");
        } else {
            System.out.println(number + " is odd");
        }

        // Time calculations
        int totalSeconds = 125;
        int minutes = totalSeconds / 60;  // 2 minutes
        int seconds = totalSeconds % 60;  // 5 seconds
        System.out.println(totalSeconds + " seconds = " + minutes + "m " + seconds + "s");

        // Cycling through values (0-2 pattern)
        for (int i = 0; i < 10; i++) {
            int pattern = i % 3;
            System.out.print(pattern + " ");  // Output: 0 1 2 0 1 2 0 1 2 0
        }
        System.out.println();

        // Checking divisibility
        int num = 15;
        if (num % 3 == 0) {
            System.out.println(num + " is divisible by 3");
        }
        if (num % 5 == 0) {
            System.out.println(num + " is divisible by 5");
        }
    }
}
\`\`\`

---

## 🔧 Arithmetic Operator Precedence

### **Operator Precedence Rules**

Java follows mathematical operator precedence rules:

1. **Multiplication, Division, Modulus** (highest precedence)
2. **Addition, Subtraction** (lowest precedence)

\`\`\`java
public class PrecedenceExamples {
    public static void main(String[] args) {
        // Multiplication/division before addition/subtraction
        int result1 = 10 + 5 * 2;    // 10 + (5 * 2) = 20
        int result2 = (10 + 5) * 2;  // (10 + 5) * 2 = 30

        System.out.println("10 + 5 * 2 = " + result1);
        System.out.println("(10 + 5) * 2 = " + result2);

        // Left to right for same precedence
        int result3 = 20 - 10 - 5;   // (20 - 10) - 5 = 5
        int result4 = 20 - (10 - 5); // 20 - (10 - 5) = 15

        System.out.println("20 - 10 - 5 = " + result3);
        System.out.println("20 - (10 - 5) = " + result4);

        // Complex expressions
        double complex = 10.0 + 5.0 * 2.0 / 4.0 - 1.0;
        // Evaluates as: 10.0 + ((5.0 * 2.0) / 4.0) - 1.0 = 10.0 + (10.0 / 4.0) - 1.0 = 10.0 + 2.5 - 1.0 = 11.5

        System.out.println("Complex expression: " + complex);
    }
}
\`\`\`

### **Using Parentheses for Clarity**

Always use parentheses to make expressions clear and avoid precedence issues.

\`\`\`java
public class ParenthesesExamples {
    public static void main(String[] args) {
        // Without parentheses (following precedence rules)
        double result1 = 10 + 5 * 2 - 3 / 2;
        // 10 + (5 * 2) - (3 / 2) = 10 + 10 - 1 = 19

        // With parentheses (explicit precedence)
        double result2 = ((10 + 5) * 2) - (3 / 2);
        // ((10 + 5) * 2) - (3 / 2) = (15 * 2) - 1 = 30 - 1 = 29

        System.out.println("Without parentheses: " + result1);
        System.out.println("With parentheses: " + result2);

        // Complex calculations
        double principal = 1000;
        double rate = 0.05;
        int time = 2;

        // Compound interest formula: P(1 + r)^t
        double compoundInterest = principal * Math.pow(1 + rate, time);
        System.out.println("Compound interest: $" + compoundInterest);

        // Temperature conversion: (C × 9/5) + 32
        double celsius = 25;
        double fahrenheit = (celsius * 9 / 5) + 32;
        System.out.println(celsius + "°C = " + fahrenheit + "°F");
    }
}
\`\`\`

---

## 🧮 Practical Applications

### **Financial Calculations**

\`\`\`java
public class FinancialCalculations {
    public static void main(String[] args) {
        // Simple interest: SI = (P × R × T) / 100
        double principal = 5000;
        double rate = 6.5;  // 6.5%
        int time = 3;       // 3 years

        double simpleInterest = (principal * rate * time) / 100;
        double totalAmount = principal + simpleInterest;

        System.out.println("Principal: $" + principal);
        System.out.println("Simple Interest: $" + simpleInterest);
        System.out.println("Total Amount: $" + totalAmount);

        // Discount calculation
        double originalPrice = 199.99;
        double discountPercent = 15;
        double discountAmount = originalPrice * discountPercent / 100;
        double finalPrice = originalPrice - discountAmount;

        System.out.println("\\nOriginal Price: $" + originalPrice);
        System.out.println("Discount (" + discountPercent + "%): $" + discountAmount);
        System.out.println("Final Price: $" + finalPrice);
    }
}
\`\`\`

### **Geometric Calculations**

\`\`\`java
public class GeometricCalculations {
    public static void main(String[] args) {
        // Rectangle properties
        double length = 10.5;
        double width = 7.2;
        double area = length * width;
        double perimeter = 2 * (length + width);

        System.out.println("Rectangle:");
        System.out.println("Area: " + area);
        System.out.println("Perimeter: " + perimeter);

        // Circle properties
        double radius = 5.0;
        double circleArea = Math.PI * radius * radius;
        double circumference = 2 * Math.PI * radius;

        System.out.println("\\nCircle:");
        System.out.println("Area: " + circleArea);
        System.out.println("Circumference: " + circumference);

        // Triangle area (base × height ÷ 2)
        double base = 8.0;
        double height = 6.0;
        double triangleArea = (base * height) / 2;

        System.out.println("\\nTriangle Area: " + triangleArea);
    }
}
\`\`\`

### **Time and Date Calculations**

\`\`\`java
public class TimeCalculations {
    public static void main(String[] args) {
        // Convert total seconds to hours, minutes, seconds
        int totalSeconds = 7265;

        int hours = totalSeconds / 3600;           // 7265 ÷ 3600 = 2 hours
        int remainingSeconds = totalSeconds % 3600; // 7265 % 3600 = 65 seconds
        int minutes = remainingSeconds / 60;       // 65 ÷ 60 = 1 minute
        int seconds = remainingSeconds % 60;       // 65 % 60 = 5 seconds

        System.out.println(totalSeconds + " seconds = " +
                          hours + "h " + minutes + "m " + seconds + "s");

        // Calculate age in years, months, days
        int totalDays = 10000;
        int years = totalDays / 365;
        int remainingDays = totalDays % 365;
        int months = remainingDays / 30;
        int days = remainingDays % 30;

        System.out.println(totalDays + " days = " +
                          years + " years, " + months + " months, " + days + " days");
    }
}
\`\`\`

---

## ⚠️ Common Arithmetic Issues

### **Integer Division**

\`\`\`java
public class DivisionPitfalls {
    public static void main(String[] args) {
        // Integer division truncates decimal part
        int result1 = 5 / 2;      // Result: 2 (not 2.5)
        double result2 = 5.0 / 2; // Result: 2.5

        System.out.println("5 / 2 = " + result1 + " (integer division)");
        System.out.println("5.0 / 2 = " + result2 + " (floating-point division)");

        // Fix: Cast to double or use double literals
        double correct = (double) 5 / 2;  // Result: 2.5
        System.out.println("(double) 5 / 2 = " + correct);
    }
}
\`\`\`

### **Division by Zero**

\`\`\`java
public class DivisionByZero {
    public static void main(String[] args) {
        // Integer division by zero (RuntimeException)
        try {
            // int result = 10 / 0;  // ArithmeticException
            System.out.println("Integer division by zero would cause exception");
        } catch (ArithmeticException e) {
            System.out.println("Caught: " + e.getMessage());
        }

        // Floating-point division by zero (returns Infinity or NaN)
        double infinity = 10.0 / 0.0;    // Infinity
        double nan = 0.0 / 0.0;          // NaN (Not a Number)

        System.out.println("10.0 / 0.0 = " + infinity);
        System.out.println("0.0 / 0.0 = " + nan);
        System.out.println("Is NaN: " + Double.isNaN(nan));
    }
}
\`\`\`

---

## 🎯 Best Practices

### **1. Use Parentheses for Clarity**

\`\`\`java
public class BestPractices {
    public static void main(String[] args) {
        // ✅ Clear and unambiguous
        double result = (a + b) * (c - d) / 2.0;

        // ❌ Unclear precedence
        // double result = a + b * c - d / 2.0;

        // ✅ Break complex expressions
        double numerator = (a + b) * (c - d);
        double denominator = e + f;
        double finalResult = numerator / denominator;

        // ✅ Use meaningful variable names
        double rectangleArea = length * width;
        double averageScore = (math + science + english) / 3.0;

        // ✅ Handle division carefully
        if (denominator != 0) {
            double quotient = numerator / denominator;
            System.out.println("Result: " + quotient);
        } else {
            System.out.println("Cannot divide by zero");
        }
    }
}
\`\`\`

### **2. Choose Appropriate Data Types**

\`\`\`java
public class DataTypeChoice {
    public static void main(String[] args) {
        // Use int for whole numbers
        int count = 100;

        // Use double for decimal calculations
        double price = 19.99;

        // Use long for large integers
        long population = 7800000000L;  // World population

        // Be careful with precision
        double sum = 0.1 + 0.2;  // May not be exactly 0.3 due to floating-point precision
        System.out.println("0.1 + 0.2 = " + sum);  // Output: 0.30000000000000004

        // For money, consider using BigDecimal
        // BigDecimal price = new BigDecimal("19.99");
    }
}
\`\`\`

---

## 🎯 Summary

Arithmetic operators form the foundation of mathematical computations in Java:

### **Basic Operators**
- **`+`**: Addition and string concatenation
- **`-`**: Subtraction
- **`*`**: Multiplication
- **`/`**: Division (integer vs floating-point)
- **`%`**: Modulus (remainder)

### **Key Concepts**
- **Operator precedence**: `*`, `/`, `%` before `+`, `-`
- **Data type considerations**: Integer vs floating-point division
- **Parentheses for clarity**: Use to override precedence and improve readability
- **Division by zero**: Handle carefully, especially with integers

### **Common Applications**
- Financial calculations (interest, discounts)
- Geometric calculations (area, perimeter)
- Time conversions (seconds to minutes/hours)
- Statistical calculations (averages, percentages)

Arithmetic operators are essential for performing mathematical operations. Master these fundamentals, and you'll be able to create sophisticated calculations in your Java programs!

### **Quick Check**
What will be the output of these expressions?
\`\`\`java
int a = 10, b = 3;
System.out.println(a + b);     // 1. ?
System.out.println(a - b);     // 2. ?
System.out.println(a * b);     // 3. ?
System.out.println(a / b);     // 4. ?
System.out.println(a % b);     // 5. ?
System.out.println(a + b * 2); // 6. ?
System.out.println((a + b) * 2); // 7. ?
\`\`\``
};

