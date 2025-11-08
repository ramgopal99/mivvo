import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedTest4Data() {
  console.log('🌱 Seeding test4 course data...');

  try {
    // Create a sample course
    const course = await prisma.course.create({
      data: {
        title: 'Complete Python Programming Course',
        description: 'Master Python programming from basics to advanced concepts',
        modules: {
          create: [
            {
              title: 'Python Fundamentals',
              order: 1,
              hasDemo: true,
              subLessons: {
                create: [
                  {
                    title: 'Introduction to Python',
                    order: 1,
                    status: 'DEMO',
                    content: `# Welcome to Python Programming!

Python is a high-level, interpreted programming language known for its simplicity and readability.

## Why Python?

- **Easy to Learn**: Simple syntax similar to English
- **Versatile**: Used for web development, data science, AI, automation, and more
- **Large Community**: Extensive libraries and frameworks
- **Cross-Platform**: Works on Windows, Mac, Linux

## Getting Started

To run Python code, you can use:
- Python interpreter in terminal/command prompt
- Online compilers like Replit, Google Colab
- IDEs like VS Code, PyCharm

Let's start with your first Python program!`
                  },
                  {
                    title: 'Variables and Data Types',
                    order: 2,
                    status: 'LOCKED',
                    content: `# Variables and Data Types

## Variables

Variables are containers for storing data values. In Python, you don't need to declare variable types.

\`\`\`python
# Creating variables
name = "Alice"
age = 25
height = 5.7
is_student = True

print(name)  # Output: Alice
print(age)   # Output: 25
\`\`\`

## Data Types

Python has several built-in data types:

- **Strings**: Text data (\`str\`)
- **Integers**: Whole numbers (\`int\`)
- **Floats**: Decimal numbers (\`float\`)
- **Booleans**: True/False values (\`bool\`)

## Type Conversion

You can convert between data types:

\`\`\`python
# Convert to string
str(25)  # '25'

# Convert to integer
int("42")  # 42

# Convert to float
float("3.14")  # 3.14
\`\`\``
                  }
                ]
              },
              exercises: {
                create: [
                  {
                    title: 'Basic Python Exercises',
                    order: 1,
                    status: 'LOCKED',
                    type: 'CODE',
                    codeQuestions: {
                      create: [
                        {
                          question: 'Write a Python program that prints "Hello, World!"',
                          solution: 'print("Hello, World!")',
                          order: 1
                        },
                        {
                          question: 'Create variables for your name and age, then print them',
                          solution: `name = "Your Name"
age = 25
print(f"My name is {name} and I am {age} years old.")`,
                          order: 2
                        }
                      ]
                    }
                  },
                  {
                    title: 'Data Types Quiz',
                    order: 2,
                    status: 'LOCKED',
                    type: 'MCQ',
                    mcqQuestions: {
                      create: [
                        {
                          question: 'Which of the following is NOT a valid Python data type?',
                          options: ['str', 'int', 'float', 'char'],
                          correctAnswer: 3,
                          explanation: 'Python does not have a "char" data type. Characters are represented as strings of length 1.',
                          order: 1
                        },
                        {
                          question: 'What will `type(42.0)` return?',
                          options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'bool\'>'],
                          correctAnswer: 1,
                          explanation: '42.0 is a floating-point number, so type() returns <class \'float\'>.',
                          order: 2
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              title: 'Control Structures',
              order: 2,
              hasDemo: false,
              subLessons: {
                create: [
                  {
                    title: 'Conditional Statements',
                    order: 1,
                    status: 'LOCKED',
                    content: `# Conditional Statements

Conditional statements allow you to execute different code based on conditions.

## If Statements

\`\`\`python
age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
\`\`\`

## Elif Statements

\`\`\`python
grade = 85

if grade >= 90:
    print("A")
elif grade >= 80:
    print("B")
elif grade >= 70:
    print("C")
else:
    print("F")
\`\`\`

## Nested Conditions

\`\`\`python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("You can drive")
    else:
        print("You need a license")
else:
    print("You are too young to drive")
\`\`\``
                  },
                  {
                    title: 'Loops',
                    order: 2,
                    status: 'LOCKED',
                    content: `# Loops in Python

Loops allow you to execute code repeatedly.

## For Loops

\`\`\`python
# Loop through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Loop with range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
\`\`\`

## While Loops

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Loop Control

- **break**: Exit the loop
- **continue**: Skip current iteration

\`\`\`python
for i in range(10):
    if i == 5:
        break  # Exit loop when i is 5
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)
\`\`\``
                  }
                ]
              }
            }
          ]
        }
      }
    });

    console.log('✅ Created course:', course.title);
    console.log('📊 Course ID:', course.id);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
seedTest4Data();
