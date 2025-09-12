export interface SubLesson {
  id: number;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
}

export interface Exercise {
  id: number;
  title: string;
  status: 'demo' | 'locked' | 'completed';
  content?: string;
}

export interface Module {
  id: number;
  title: string;
  hasDemo: boolean;
  isExpanded: boolean;
  isActive: boolean;
  subLessons: SubLesson[];
  exercises: Exercise[];
}

export const modules: Module[] = [
  {
    id: 1,
    title: 'Introduction to Programming',
    hasDemo: true,
    isExpanded: true,
    isActive: true,
    subLessons: [
      {
        id: 1.1,
        title: 'What is Programming?',
        status: 'completed',
        content: `# What is Programming?

Programming is the process of creating a set of instructions that tell a computer how to perform a task. It's like writing a recipe for your computer!

## Why Learn Programming?

- **Problem Solving**: Programming teaches you how to break down complex problems
- **Creativity**: You can build anything you imagine
- **Career Opportunities**: High demand for programmers worldwide
- **Logical Thinking**: Improves your analytical skills

## Types of Programming Languages

### High-Level Languages
- **Python**: Great for beginners, readable syntax
- **JavaScript**: Runs in browsers, very popular
- **Java**: Used for enterprise applications

### Low-Level Languages
- **C**: Close to hardware, very fast
- **Assembly**: Direct hardware control

## Programming Language Comparison

| Language | Beginner Friendly | Speed | Popularity | Use Cases | Average Salary |
|----------|------------------|-------|------------|-----------|----------------|
| **Python** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Data Science, AI, Web | $110,000 |
| **JavaScript** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Web, Mobile, Games | $105,000 |
| **Java** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Enterprise, Android | $115,000 |
| **C++** | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Games, Systems | $120,000 |
| **C#** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Windows, Games | $108,000 |

## Getting Started

Here's your first "Hello World" program:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

This simple line of code will display "Hello, World!" in the console when you run it.`
      },
      {
        id: 1.2,
        title: 'Variables and Data Types',
        status: 'demo',
        content: `# Variables and Data Types

Variables are containers for storing data values. Think of them as labeled boxes where you can store different types of information.

## What are Variables?

Variables are named storage locations in memory that hold data values. They allow you to:
- Store information for later use
- Manipulate data through operations
- Make your code more readable and maintainable

## Declaring Variables

In JavaScript, you can declare variables using \`let\`, \`const\`, or \`var\`:

\`\`\`javascript
// Using let (can be reassigned)
let age = 25;
age = 26; // This is allowed

// Using const (cannot be reassigned)
const name = "Alice";
name = "Bob"; // This will cause an error

// Using var (older way, avoid using)
var city = "New York";
\`\`\`

## Data Types

### Primitive Data Types

1. **String**: Text data
   \`\`\`javascript
   let message = "Hello, World!";
   let name = 'Alice';
   \`\`\`

2. **Number**: Numeric values
   \`\`\`javascript
   let age = 25;
   let price = 19.99;
   \`\`\`

3. **Boolean**: True or false values
   \`\`\`javascript
   let isStudent = true;
   let isWorking = false;
   \`\`\`

4. **Undefined**: No value assigned
   \`\`\`javascript
   let undefinedVariable;
   \`\`\`

5. **Null**: Intentionally empty value
   \`\`\`javascript
   let emptyValue = null;
   \`\`\`

## Data Types Summary

| Data Type | Example Values | Memory Usage | Use Cases | Common Methods |
|-----------|----------------|--------------|-----------|----------------|
| **String** | "Hello", 'World' | 2 bytes/char | Text, Names | length, toUpperCase |
| **Number** | 42, 3.14, -5 | 8 bytes | Math, Counts | toFixed, parseInt |
| **Boolean** | true, false | 1 byte | Conditions, Flags | N/A |
| **Undefined** | undefined | 0 bytes | Uninitialized | N/A |
| **Null** | null | 0 bytes | Empty values | N/A |
| **Object** | {name: "John"} | Variable | Complex data | keys, values |
| **Array** | [1, 2, 3] | Variable | Lists | push, pop |

## Variable Declaration Comparison

| Method | Scope | Reassignable | Hoisted | Best Practice |
|--------|-------|--------------|---------|---------------|
| **var** | Function | Yes | Yes | ❌ Avoid |
| **let** | Block | Yes | No | ✅ Modern |
| **const** | Block | No | No | ✅ Constants |

## Practice Time!

Try creating some variables of different types in the code editor above.`
      },
    ],
    exercises: [
      {
        id: 1.3,
        title: 'MCQ Quiz',
        status: 'locked',
        content: `# MCQ Quiz - Variables and Data Types

## Coming Soon! 🚀

This interactive quiz will test your understanding of:
- Variable declaration methods
- Data type identification
- Memory usage concepts
- Best practices for variable naming

**Features:**
- Multiple choice questions
- Instant feedback
- Progress tracking
- Detailed explanations

Stay tuned for this engaging learning experience!`
      },
      {
        id: 1.4,
        title: 'Code Exercise',
        status: 'locked',
        content: `# Code Exercise - Variable Practice

## Coming Soon! 💻

This hands-on coding exercise will challenge you to:
- Declare variables of different types
- Perform type conversions
- Use proper naming conventions
- Debug common variable errors

**What you'll practice:**
- String manipulation
- Number operations
- Boolean logic
- Variable scope

Get ready to code!`
      },
      {
        id: 1.5,
        title: 'Interactive Lab',
        status: 'locked',
        content: `# Interactive Lab - Data Types

## Coming Soon! 🧪

This interactive lab will let you:
- Experiment with different data types
- See real-time memory usage
- Compare variable behaviors
- Test edge cases

**Lab features:**
- Live code execution
- Visual memory representation
- Step-by-step debugging
- Performance analysis

Coming soon to enhance your learning!`
      }
    ]
  },
  {
    id: 2,
    title: 'Control Structures',
    hasDemo: true,
    isExpanded: false,
    isActive: false,
    subLessons: [
      {
        id: 2.1,
        title: 'If-Else Statements',
        status: 'completed',
        content: `# If-Else Statements

Conditional statements allow your program to make decisions based on certain conditions. They're like crossroads in your code!

## What are Conditionals?

Conditionals let you execute different code blocks based on whether a condition is true or false.

## Basic If Statement

The simplest conditional:

\`\`\`javascript
if (condition) {
  // Code to execute if condition is true
}
\`\`\`

## If-Else Statement

Execute one block if condition is true, another if false:

\`\`\`javascript
if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("You're too young to vote.");
}
\`\`\`

## If-Else If-Else Chain

Handle multiple conditions:

\`\`\`javascript
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else {
  console.log("F");
}
\`\`\`

## Comparison Operators

- \`==\` : Equal to (loose equality, converts types)
- \`===\` : Strictly equal to (strict equality, same type)
- \`!=\` : Not equal to (loose inequality)
- \`!==\` : Strictly not equal to (strict inequality)
- \`>\` : Greater than
- \`<\` : Less than
- \`>=\` : Greater than or equal to
- \`<=\` : Less than or equal to

## Logical Operators

- \`&&\` : AND (both conditions must be true)
- \`\|\|\` : OR (at least one condition must be true)
- \`!\` : NOT (negates the condition)

## Practice Exercise

Write a program that checks if a number is positive, negative, or zero:

\`\`\`javascript
let number = -5;

if (number > 0) {
  console.log("The number is positive");
} else if (number < 0) {
  console.log("The number is negative");
} else {
  console.log("The number is zero");
}
\`\`\``
      },
      {
        id: 2.2,
        title: 'Loops',
        status: 'demo',
        content: `# Loops

Loops allow you to execute a block of code repeatedly. They're essential for automating repetitive tasks!

## Why Use Loops?

- **Efficiency**: Perform the same operation multiple times
- **Scalability**: Handle varying amounts of data
- **Code Reusability**: Write once, execute many times

## Loop Types Overview

| Loop Type | Best Use Case | Performance | Readability | Common Pitfalls |
|-----------|---------------|-------------|-------------|-----------------|
| **For Loop** | Known iterations | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Off-by-one errors |
| **While Loop** | Condition-based | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Infinite loops |
| **Do-While Loop** | At least once | ⭐⭐⭐⭐ | ⭐⭐⭐ | Less common usage |

## Loop Control Statements

| Statement | Purpose | Use Case | Effect |
|-----------|---------|----------|--------|
| **break** | Exit loop immediately | Found target, error condition | Stops execution |
| **continue** | Skip current iteration | Skip invalid data | Continues to next iteration |
| **return** | Exit function entirely | Early completion | Ends function |
| **throw** | Throw exception | Error handling | Triggers catch block |

## For Loop

The most common type of loop:

\`\`\`javascript
for (initialization; condition; increment) {
  // Code to be executed
}
\`\`\`

Example:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log("Iteration:", i);
}
// Output: Iteration: 0, 1, 2, 3, 4
\`\`\`

## While Loop

Executes while a condition is true:

\`\`\`javascript
while (condition) {
  // Code to be executed
}
\`\`\`

Example:
\`\`\`javascript
let count = 0;
while (count < 3) {
  console.log("Count:", count);
  count++;
}
// Output: Count: 0, 1, 2
\`\`\`

## Do-While Loop

Executes at least once, then checks condition:

\`\`\`javascript
do {
  // Code to be executed
} while (condition);
\`\`\`

Example:
\`\`\`javascript
let number = 5;
do {
  console.log("Number:", number);
  number--;
} while (number > 0);
// Output: Number: 5, 4, 3, 2, 1
\`\`\`

## Loop Control Statements

### Break
Exit the loop immediately:

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit loop when i equals 5
  }
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
\`\`\`

### Continue
Skip current iteration and continue with next:

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i equals 2
  }
  console.log(i);
}
// Output: 0, 1, 3, 4
\`\`\`

## Common Loop Patterns

### Looping through Arrays
\`\`\`javascript
let fruits = ['apple', 'banana', 'orange'];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
\`\`\`

### Counting Down
\`\`\`javascript
for (let i = 10; i > 0; i--) {
  console.log(i);
}
// Output: 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
\`\`\`

Try creating your own loops in the code editor above!`
      },
    ],
    exercises: [
      {
        id: 2.3,
        title: 'MCQ Quiz',
        status: 'locked',
        content: `# MCQ Quiz - Control Structures

## Coming Soon! 🚀

This comprehensive quiz will test your knowledge of:
- If-else statement logic
- Loop types and usage
- Comparison operators
- Logical operators
- Control flow concepts

**Quiz features:**
- Scenario-based questions
- Code analysis problems
- Multiple difficulty levels
- Detailed explanations

Test your understanding with this interactive quiz!`
      },
      {
        id: 2.4,
        title: 'Code Challenge',
        status: 'locked',
        content: `# Code Challenge - Control Flow

## Coming Soon! 💻

This coding challenge will push your skills with:
- Complex conditional logic
- Nested loop structures
- Algorithm implementation
- Problem-solving techniques

**Challenge types:**
- Pattern recognition
- Data processing
- Game logic
- Optimization problems

Ready to take on the challenge?`
      },
      {
        id: 2.5,
        title: 'Debugging Exercise',
        status: 'locked',
        content: `# Debugging Exercise - Fix the Code

## Coming Soon! 🐛

This debugging exercise will help you:
- Identify common control flow errors
- Fix infinite loops
- Correct logical mistakes
- Improve code efficiency

**What you'll debug:**
- Syntax errors
- Logic errors
- Performance issues
- Edge case handling

Master the art of debugging!`
      },
      {
        id: 2.6,
        title: 'Interactive Workshop',
        status: 'locked',
        content: `# Interactive Workshop - Control Structures

## Coming Soon! 🛠️

This hands-on workshop will guide you through:
- Building real-world applications
- Implementing user interactions
- Creating game mechanics
- Developing algorithms

**Workshop projects:**
- Calculator application
- Number guessing game
- Data validation system
- Pattern generator

Build something amazing!`
      }
    ]
  },
];
