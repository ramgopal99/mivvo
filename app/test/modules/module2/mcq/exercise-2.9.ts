import { Exercise } from '../../../data/lessonsData';

export const exercise_2_9: Exercise = {
  id: 2.9,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Write a Python program that:\n1. Asks the user for their name and age\n2. Converts the age to an integer\n3. Uses an f-string to print: 'Hello [name], you are [age] years old!'\n4. Uses a conditional to print whether they are an adult (18+) or minor",
      solution: `# Get user input
name = input("Enter your name: ")
age_str = input("Enter your age: ")

# Convert age to integer
age = int(age_str)

# Print greeting with f-string
print(f"Hello {name}, you are {age} years old!")

# Check if adult or minor
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")`
    },
    {
      id: "ex2",
      question: "Create a program that:\n1. Uses a for loop with range() to print numbers 1-10\n2. For each number, determines if it's even or odd using modulo operator (%)\n3. Prints the result in the format: '5 is odd' or '6 is even'\n4. Uses continue to skip numbers divisible by 3",
      solution: `# Loop through numbers 1 to 10
for num in range(1, 11):
    # Skip numbers divisible by 3
    if num % 3 == 0:
        continue

    # Check if even or odd
    if num % 2 == 0:
        print(f"{num} is even")
    else:
        print(f"{num} is odd")`
    },
    {
      id: "ex3",
      question: "Write a program that:\n1. Asks for a password input\n2. Uses string validation methods to check:\n   - Must contain only letters and numbers (isalnum())\n   - Must be at least 6 characters long\n   - Must contain at least one digit (isdigit() check on parts)\n3. Uses a while loop to keep asking until valid\n4. Prints success message when valid",
      solution: `# Main loop to get valid password
while True:
    password = input("Enter a password (letters & numbers, min 6 chars, at least 1 number): ")

    # Check if password is valid
    is_valid = True

    # Check if alphanumeric and length
    if not password.isalnum() or len(password) < 6:
        is_valid = False

    # Check if contains at least one digit
    if is_valid:
        has_digit = False
        for char in password:
            if char.isdigit():
                has_digit = True
                break
        if not has_digit:
            is_valid = False

    # Result
    if is_valid:
        print("Password accepted!")
        break
    else:
        print("Invalid password. Try again.")`
    },
    {
      id: "ex4",
      question: "Create a temperature converter that:\n1. Asks user for temperature value and unit (C/F)\n2. Uses type casting to convert input to float\n3. Uses if-elif-else to handle different units:\n   - C to F: (C * 9/5) + 32\n   - F to C: (F - 32) * 5/9\n4. Prints result with 2 decimal places using f-string formatting\n5. Handles invalid unit input",
      solution: `# Get temperature input
temp_input = input("Enter temperature value: ")
unit = input("Enter unit (C for Celsius, F for Fahrenheit): ").upper()

# Convert temperature to float (basic validation)
temp = float(temp_input)

# Convert based on unit
if unit == "C":
    converted = (temp * 9/5) + 32
    print(f"{temp:.2f}°C = {converted:.2f}°F")
elif unit == "F":
    converted = (temp - 32) * 5/9
    print(f"{temp:.2f}°F = {converted:.2f}°C")
else:
    print("Invalid unit. Use C or F.")`
    },
    {
      id: "ex5",
      question: "Write a program that:\n1. Creates a list of student scores [85, 92, 78, 96, 88]\n2. Uses a for loop to iterate through scores\n3. Uses if-elif-else to assign grades:\n   - A: 90-100\n   - B: 80-89\n   - C: 70-79\n   - F: below 70\n4. Uses enumerate() to show student numbers\n5. Calculates and displays the class average\n6. Uses f-strings for formatted output",
      solution: `# Student scores
scores = [85, 92, 78, 96, 88]
total_score = 0

# Process each student
for student_num, score in enumerate(scores, 1):
    total_score += score

    # Assign grade
    if score >= 90:
        grade = "A"
    elif score >= 80:
        grade = "B"
    elif score >= 70:
        grade = "C"
    else:
        grade = "F"

    print(f"Student {student_num}: Score {score}, Grade {grade}")

# Calculate and display average
average = total_score / len(scores)
print(f"\nClass average: {average:.1f}")`
    }
  ]
};
