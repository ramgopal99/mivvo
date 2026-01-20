import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: "2.7",
  title: 'Input & User Interaction',
  status: 'demo',
  content: "`# ðŸš€ Python Input & User Interaction

Master user input handling in Python!

---

## ðŸŽ¯ INPUT() BASICS

\`"\`\`python
# Get user input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# input() always returns a STRING
age = input("Enter age: ")  # "25"
print(type(age))  # <class 'str'>
\`\`\`

---

## ðŸ“š BASIC USAGE

\`\`\`python
# Simple input examples
name = input("What is your name? ")
print("Hello, " + name + "!")

age = input("How old are you? ")
print("You are " + age + " years old.")

color = input("What is your favorite color? ")
print("Your favorite color is " + color + ".")
\`\`\`

---

## ðŸ”§ MULTIPLE INPUTS

\`\`\`python
# Getting multiple inputs
first_name = input("First name: ")
last_name = input("Last name: ")
full_name = first_name + " " + last_name

print("Welcome, " + full_name + "!")
\`\`\`

---

## ðŸ”¢ TYPE CONVERSION WITH INPUT

\`\`\`python
# Convert input to INTEGER
age = int(input("Enter your age: "))
print(f"Next year you will be {age + 1} years old.")

# Convert input to FLOAT
height = float(input("Enter your height in meters: "))
print(f"Your height is {height} meters.")

# Convert input to BOOLEAN (basic example)
is_student = input("Are you a student? (yes/no): ")
print(f"Student status: {is_student}")
\`\`\`


## ðŸŽ¯ QUICK EXAMPLES

\`\`\`python
# Basic conversation
question = input("What's your question? ")
answer = "That's a good question!"
print(answer)

# Simple calculator input
num1 = input("First number: ")
num2 = input("Second number: ")
print("You entered: " + num1 + " and " + num2)

# Calculator with type conversion
num1 = float(input("First number: "))
num2 = float(input("Second number: "))
result = num1 + num2
print(f"Sum: {result}")
\`\`\`

Input handling with proper type conversion is essential for interactive programs! ðŸŽ¯`
};


