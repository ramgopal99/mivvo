import { SubLesson } from '../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: 2.7,
  title: 'Input & User Interaction',
  status: 'demo',
  content: `# 🚀 Python Input & User Interaction

Master user input handling in Python!

---

## 🎯 INPUT() BASICS

\`\`\`python
# Get user input
name = input("Enter your name: ")
print(f"Hello, {name}!")

# input() always returns a STRING
age = input("Enter age: ")  # "25"
print(type(age))  # <class 'str'>
\`\`\`

---

## 📚 BASIC USAGE

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

## 🔧 MULTIPLE INPUTS

\`\`\`python
# Getting multiple inputs
first_name = input("First name: ")
last_name = input("Last name: ")
full_name = first_name + " " + last_name

print("Welcome, " + full_name + "!")
\`\`\`

---

## 🎯 QUICK EXAMPLES

\`\`\`python
# Basic conversation
question = input("What's your question? ")
answer = "That's a good question!"
print(answer)

# Simple calculator input
num1 = input("First number: ")
num2 = input("Second number: ")
print("You entered: " + num1 + " and " + num2)
\`\`\`

Input handling is essential for interactive programs! 🎯`
};
