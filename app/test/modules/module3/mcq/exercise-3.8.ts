import { Exercise } from '../../../data/lessonsData';

export const exercise_3_8: Exercise = {
  id: 3.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program that:\n1. Creates a list of 5 student names\n2. Uses a for loop to print each name with its position number\n3. Prints the total number of students using len()\n4. Prints the first and last student names",
      solution: `# Create a list of student names
students = ["Alice", "Bob", "Charlie", "Diana", "Eve"]

# Print each student with position
for i in range(len(students)):
    print(f"Student {i+1}: {students[i]}")

# Print total number of students
print(f"Total students: {len(students)}")

# Print first and last students
print(f"First student: {students[0]}")
print(f"Last student: {students[-1]}")`
    },
    {
      id: "ex2",
      question: "Write a program that:\n1. Creates a list of exam scores [85, 92, 78, 96, 88]\n2. Uses indexing to access and print each score\n3. Calculates and prints the highest score (without using max())\n4. Uses a loop to count how many scores are above 90",
      solution: `# Create list of exam scores
scores = [85, 92, 78, 96, 88]

# Print each score with index
for i in range(len(scores)):
    print(f"Score {i+1}: {scores[i]}")

# Find highest score manually
highest = scores[0]
for score in scores:
    if score > highest:
        highest = score

print(f"Highest score: {highest}")

# Count scores above 90
count_above_90 = 0
for score in scores:
    if score > 90:
        count_above_90 += 1

print(f"Scores above 90: {count_above_90}")`
    },
    {
      id: "ex3",
      question: "Create a simple quiz program that:\n1. Creates a list of questions and a list of answers\n2. Uses a for loop to ask each question\n3. Gets user input for answers\n4. Compares user answers with correct answers\n5. Counts and displays the score",
      solution: `# Create lists of questions and answers
questions = [
    "What is 2 + 2?",
    "What color is the sky?",
    "How many days in a week?"
]

answers = ["4", "blue", "7"]

# Initialize score
score = 0

# Ask each question
for i in range(len(questions)):
    print(f"Question {i+1}: {questions[i]}")
    user_answer = input("Your answer: ")

    if user_answer.lower() == answers[i].lower():
        print("Correct!")
        score += 1
    else:
        print(f"Wrong! Correct answer: {answers[i]}")

# Display final score
print(f"Final score: {score}/{len(questions)}")`
    },
    {
      id: "ex4",
      question: "Write a program that:\n1. Creates two lists: one with days of the week, one with temperatures\n2. Uses indexing to print each day with its temperature\n3. Finds and prints the warmest day (without using max())\n4. Uses conditions to classify each temperature as 'hot', 'warm', or 'cool'",
      solution: `# Create lists of days and temperatures
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
temperatures = [25, 28, 30, 27, 26]

# Print each day with temperature
for i in range(len(days)):
    day = days[i]
    temp = temperatures[i]
    print(f"{day}: {temp}°C")

# Find warmest day manually
warmest_temp = temperatures[0]
warmest_day = days[0]

for i in range(len(temperatures)):
    if temperatures[i] > warmest_temp:
        warmest_temp = temperatures[i]
        warmest_day = days[i]

print(f"Warmest day: {warmest_day} ({warmest_temp}°C)")

# Classify each temperature
print("Temperature classifications:")
for i in range(len(temperatures)):
    temp = temperatures[i]
    day = days[i]

    if temp >= 28:
        classification = "hot"
    elif temp >= 25:
        classification = "warm"
    else:
        classification = "cool"

    print(f"{day}: {classification} ({temp}°C)")`
    },
    {
      id: "ex5",
      question: "Create a program that:\n1. Creates a list of fruits and a list of prices\n2. Asks the user to select a fruit by number\n3. Uses input validation to ensure the choice is valid\n4. Displays the selected fruit and its price\n5. Uses negative indexing to show the last fruit option",
      solution: `# Create lists of fruits and prices
fruits = ["apple", "banana", "orange", "grape", "kiwi"]
prices = [2.50, 1.80, 3.20, 4.00, 5.50]

# Display fruit options
print("Available fruits:")
for i in range(len(fruits)):
    print(f"{i+1}. {fruits[i]} - \${prices[i]}")

# Get user choice with validation
while True:
    choice_str = input("Select a fruit (1-5): ")

    # Basic validation - check if it's a digit
    if choice_str.isdigit():
        choice = int(choice_str)
        if 1 <= choice <= len(fruits):
            break
        else:
            print("Please enter a number between 1 and 5")
    else:
        print("Please enter a valid number")

# Display selected fruit (adjust for 0-based indexing)
selected_index = choice - 1
print(f"You selected: {fruits[selected_index]}")
print(f"Price: \${prices[selected_index]}")

# Show last fruit option using negative indexing
print(f"Our most expensive fruit: {fruits[-1]} (\${prices[-1]})")`
    }
  ]
};
