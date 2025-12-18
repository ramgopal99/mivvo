import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_8: Exercise = {
  id: "6.8",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program that:\n1. Creates a dictionary of student grades\n2. Adds new students and updates existing grades\n3. Calculates and displays the average grade\n4. Finds the highest and lowest grades\n5. Uses dict.get() to safely access grades",
      solution: `# Create initial student grades dictionary
grades = {
    "Alice": 95,
    "Bob": 87,
    "Charlie": 92,
    "Diana": 88
}

print("Initial grades:", grades)

# Add new students
grades["Eve"] = 96
grades["Frank"] = 85

print("After adding students:", grades)

# Update existing grade
grades["Bob"] = 90

print("After updating Bob:", grades)

# Calculate average manually
total = 0
for grade in grades.values():
    total = total + grade
average = total / len(grades)
print(f"Average grade: {average:.1f}")

# Find highest and lowest manually
highest_student = ""
highest_grade = 0
lowest_student = ""
lowest_grade = 100

for student, grade in grades.items():
    if grade > highest_grade:
        highest_grade = grade
        highest_student = student
    if grade < lowest_grade:
        lowest_grade = grade
        lowest_student = student

print(f"Highest: {highest_student} ({highest_grade})")
print(f"Lowest: {lowest_student} ({lowest_grade})")

# Safe access with get()
grace_grade = grades.get("Grace", "Not found")
print(f"Grace's grade: {grace_grade}")`
    },
    {
      id: "ex2",
      question: "Write a program that simulates a phone book:\n1. Create a dictionary with names as keys and phone numbers as values\n2. Add, update, and remove contacts\n3. Search for contacts by name\n4. Display all contacts\n5. Count total contacts and check if a contact exists",
      solution: `# Create phone book dictionary
phone_book = {
    "Alice": "555-0101",
    "Bob": "555-0102",
    "Charlie": "555-0103"
}

print("Initial phone book:")
for name, number in phone_book.items():
    print(f"{name}: {number}")

# Add new contacts
phone_book["Diana"] = "555-0104"
phone_book["Eve"] = "555-0105"

print("\nAfter adding contacts:")
for name, number in phone_book.items():
    print(f"{name}: {number}")

# Update existing contact
phone_book["Alice"] = "555-0199"

# Remove a contact
if "Bob" in phone_book:
    removed_number = phone_book["Bob"]
    del phone_book["Bob"]
    print(f"\nRemoved Bob's number: {removed_number}")
else:
    print("\nBob not found")

# Search for a contact
search_name = "Charlie"
if search_name in phone_book:
    print(f"{search_name}'s number: {phone_book[search_name]}")
else:
    print(f"{search_name} not found")

# Display all contacts
print(f"\nTotal contacts: {len(phone_book)}")
print("All contacts:")
for name in phone_book:
    print(f"{name}: {phone_book[name]}")`
    },
    {
      id: "ex3",
      question: "Create a word frequency counter:\n1. Take a text string and count word frequencies\n2. Use a dictionary to store word counts\n3. Handle case sensitivity (convert to lowercase)\n4. Find the most frequent word\n5. Display words that appear more than once",
      solution: `# Sample text for analysis
text = "the quick brown fox jumps over the lazy dog the fox is quick"

# Convert to lowercase and split into words
words = text.lower().split()

# Count word frequencies using dictionary
word_counts = {}
for word in words:
    if word in word_counts:
        word_counts[word] = word_counts[word] + 1
    else:
        word_counts[word] = 1

print("Word frequencies:")
for word in word_counts:
    print(f"{word}: {word_counts[word]}")

# Find most frequent word manually
most_frequent = ""
max_count = 0
for word in word_counts:
    if word_counts[word] > max_count:
        max_count = word_counts[word]
        most_frequent = word

print(f"\nMost frequent word: '{most_frequent}' ({max_count} times)")

# Find words that appear more than once
duplicates = {}
for word in word_counts:
    if word_counts[word] > 1:
        duplicates[word] = word_counts[word]

print(f"Words appearing more than once: {duplicates}")

# Total unique words and total words
print(f"\nTotal words: {len(words)}")
print(f"Unique words: {len(word_counts)}")`
    },
    {
      id: "ex4",
      question: "Write a program that manages inventory:\n1. Create a dictionary with product names and quantities\n2. Add new products and update quantities\n3. Remove products that are out of stock\n4. Calculate total inventory value\n5. Display inventory report",
      solution: `# Create inventory dictionary (product: quantity)
inventory = {
    "apples": 25,
    "bananas": 30,
    "oranges": 15,
    "grapes": 20,
    "pears": 12
}

# Product prices
prices = {
    "apples": 2.50,
    "bananas": 1.80,
    "oranges": 3.20,
    "grapes": 4.00,
    "pears": 2.75
}

print("Initial inventory:")
for product in inventory:
    quantity = inventory[product]
    price = prices.get(product, 0)
    value = quantity * price
    print(f"{product}: {quantity} @ \${price:.2f} = \${value:.2f}")

# Add new products
inventory["kiwis"] = 18
prices["kiwis"] = 3.50

# Update quantities
inventory["apples"] = inventory["apples"] + 10
inventory["bananas"] = inventory["bananas"] - 5

# Remove out of stock items
out_of_stock = []
for product in inventory:
    if inventory[product] <= 0:
        out_of_stock.append(product)

for product in out_of_stock:
    del inventory[product]

print("\nUpdated inventory:")
total_value = 0
for product in inventory:
    quantity = inventory[product]
    price = prices.get(product, 0)
    value = quantity * price
    total_value = total_value + value
    print(f"{product}: {quantity} @ \${price:.2f} = \${value:.2f}")

print(f"\nTotal inventory value: \${total_value:.2f}")
print(f"Summary: {len(inventory)} products in stock")`
    },
    {
      id: "ex5",
      question: "Create a simple student grade system:\n1. Store student names and grades in a dictionary\n2. Calculate averages for each student\n3. Find the student with the highest average\n4. Display all student information",
      solution: `# Student grade system
students = {
    "Alice": [95, 87, 92, 88],
    "Bob": [78, 82, 85, 80],
    "Charlie": [92, 89, 94, 91],
    "Diana": [85, 88, 82, 87]
}

# Calculate averages and store in new dictionary
student_averages = {}
for name in students:
    grades = students[name]
    total = 0
    for grade in grades:
        total = total + grade
    average = total / len(grades)
    student_averages[name] = average

# Display all students
print("Student Report:")
print("-" * 40)
for name in students:
    grades = students[name]
    average = student_averages[name]
    print(f"{name}: Grades {grades}, Average {average:.1f}")

# Find top performer manually
top_student = ""
top_average = 0
for name in student_averages:
    if student_averages[name] > top_average:
        top_average = student_averages[name]
        top_student = name

print(f"\nTop performer: {top_student} ({top_average:.1f})")

# Add new student
students["Eve"] = [90, 93, 87, 95]
eve_grades = students["Eve"]
eve_total = 0
for grade in eve_grades:
    eve_total = eve_total + grade
eve_average = eve_total / len(eve_grades)
student_averages["Eve"] = eve_average

print(f"\nAfter adding Eve:")
print(f"Eve: Grades {eve_grades}, Average {eve_average:.1f}")
print(f"Total students: {len(students)}")`
    }
  ]
};

