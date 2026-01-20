import { Exercise } from '../../../../data/lessonsData';

export const exercise_3_8: Exercise = {
  id: "3.8",
  title: 'Control Structures Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a C program that takes an integer input from user and determines if it's positive, negative, or zero using if-else statements.\n\nExample Input: 5\nExample Output: Positive number\n\nExample Input: -3\nExample Output: Negative number\n\nExample Input: 0\nExample Output: Zero",
      solution: `#include <stdio.h>

int main() {
    int num;

    printf("Enter an integer: ");
    scanf("%d", &num);

    if (num > 0) {
        printf("Positive number\\n");
    } else if (num < 0) {
        printf("Negative number\\n");
    } else {
        printf("Zero\\n");
    }

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a C program that prints the multiplication table for a given number using a for loop.\n\nExample Input: 5\nExample Output:\n5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n...\n5 x 10 = 50",
      solution: `#include <stdio.h>

int main() {
    int num;

    printf("Enter a number: ");
    scanf("%d", &num);

    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\\n", num, i, num * i);
    }

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a C program that finds the largest of three numbers using nested if-else statements.\n\nExample Input: 12 25 8\nExample Output: Largest number: 25",
      solution: `#include <stdio.h>

int main() {
    int a, b, c;

    printf("Enter three numbers: ");
    scanf("%d %d %d", &a, &b, &c);

    if (a >= b) {
        if (a >= c) {
            printf("Largest number: %d\\n", a);
        } else {
            printf("Largest number: %d\\n", c);
        }
    } else {
        if (b >= c) {
            printf("Largest number: %d\\n", b);
        } else {
            printf("Largest number: %d\\n", c);
        }
    }

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a C program that calculates the sum of all even numbers between 1 and 100 using a while loop.\n\nExample Output: Sum of even numbers from 1 to 100: 2550",
      solution: `#include <stdio.h>

int main() {
    int sum = 0;
    int i = 2;  // Start with first even number

    while (i <= 100) {
        sum += i;
        i += 2;  // Next even number
    }

    printf("Sum of even numbers from 1 to 100: %d\\n", sum);

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a C program that uses a switch statement to display the day of the week based on a number input (1-7).\n\nExample Input: 1\nExample Output: Monday\n\nExample Input: 7\nExample Output: Sunday\n\nExample Input: 8\nExample Output: Invalid day",
      solution: `#include <stdio.h>

int main() {
    int day;

    printf("Enter day number (1-7): ");
    scanf("%d", &day);

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:
            printf("Invalid day\\n");
            break;
    }

    return 0;
}`
    }
  ]
};
