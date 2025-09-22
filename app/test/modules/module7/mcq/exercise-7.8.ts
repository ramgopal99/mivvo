import { Exercise } from '../../../data/lessonsData';

export const exercise_7_8: Exercise = {
  id: 7.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program with multiple functions:\n1. Write a function to calculate the area of a circle\n2. Write a function to calculate the perimeter of a circle\n3. Write a function that takes radius and returns both area and perimeter\n4. Test all functions with different radius values",
      solution: `# Function to calculate circle area
def calculate_area(radius):
    return 3.14159 * radius * radius

# Function to calculate circle perimeter (circumference)
def calculate_perimeter(radius):
    return 2 * 3.14159 * radius

# Function that returns both area and perimeter
def get_circle_info(radius):
    area = calculate_area(radius)
    perimeter = calculate_perimeter(radius)
    return area, perimeter

# Test the functions
print("Circle Calculations:")
print("-" * 30)

radii = [5, 10, 15]

for radius in radii:
    area = calculate_area(radius)
    perimeter = calculate_perimeter(radius)
    print(f"Radius {radius}:")
    print(f"  Area: {area:.2f}")
    print(f"  Perimeter: {perimeter:.2f}")

    # Test the combined function
    area2, perimeter2 = get_circle_info(radius)
    print(f"  Combined function: Area={area2:.2f}, Perimeter={perimeter2:.2f}")
    print()

# Extra test
print("Testing with radius 7:")
area, perimeter = get_circle_info(7)
print(f"Area: {area:.2f}, Perimeter: {perimeter:.2f}")`
    },
    {
      id: "ex2",
      question: "Write a temperature conversion program:\n1. Create functions to convert Celsius to Fahrenheit and vice versa\n2. Create a function that takes a temperature and unit, then converts to the other unit\n3. Add input validation to ensure temperatures are reasonable\n4. Test with various temperature values",
      solution: `# Function to convert Celsius to Fahrenheit
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

# Function to convert Fahrenheit to Celsius
def fahrenheit_to_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Function to convert temperature with validation
def convert_temperature(temp, unit):
    if unit.upper() == 'C':
        if temp < -273.15:  # Absolute zero check
            return None, "Temperature below absolute zero"
        fahrenheit = celsius_to_fahrenheit(temp)
        return fahrenheit, "F"
    elif unit.upper() == 'F':
        if temp < -459.67:  # Absolute zero check
            return None, "Temperature below absolute zero"
        celsius = fahrenheit_to_celsius(temp)
        return celsius, "C"
    else:
        return None, "Invalid unit. Use 'C' or 'F'"

# Test the functions
print("Temperature Conversion Tests:")
print("-" * 40)

# Test individual conversions
print("Direct conversions:")
print(f"25°C = {celsius_to_fahrenheit(25):.1f}°F")
print(f"77°F = {fahrenheit_to_celsius(77):.1f}°C")

# Test combined function
test_cases = [
    (25, 'C'),
    (77, 'F'),
    (0, 'C'),
    (32, 'F'),
    (-50, 'C')
]

print("\nCombined function tests:")
for temp, unit in test_cases:
    result, new_unit = convert_temperature(temp, unit)
    if result is not None:
        print(f"{temp}°{unit} = {result:.1f}°{new_unit}")
    else:
        print(f"Error with {temp}°{unit}: {new_unit}")

# Test edge cases
print("\nEdge case tests:")
edge_cases = [(-300, 'C'), (25, 'X'), (1000, 'F')]
for temp, unit in edge_cases:
    result, message = convert_temperature(temp, unit)
    if result is None:
        print(f"Invalid: {temp}°{unit} - {message}")
    else:
        print(f"{temp}°{unit} = {result:.1f}°{message}")`
    },
    {
      id: "ex3",
      question: "Create a student grade management system:\n1. Write functions to calculate average, find highest/lowest grades\n2. Write a function to assign letter grades (A, B, C, F)\n3. Write a function to generate student reports\n4. Test with multiple students and different grade scenarios",
      solution: `# Function to calculate average of grades
def calculate_average(grades):
    if not grades:
        return 0
    return sum(grades) / len(grades)

# Function to find highest grade
def find_highest(grades):
    if not grades:
        return None
    return max(grades)

# Function to find lowest grade
def find_lowest(grades):
    if not grades:
        return None
    return min(grades)

# Function to assign letter grade
def assign_letter_grade(average):
    if average >= 90:
        return 'A'
    elif average >= 80:
        return 'B'
    elif average >= 70:
        return 'C'
    elif average >= 60:
        return 'D'
    else:
        return 'F'

# Function to generate student report
def generate_report(name, grades):
    average = calculate_average(grades)
    highest = find_highest(grades)
    lowest = find_lowest(grades)
    letter = assign_letter_grade(average)

    report = f"""
Student Report for {name}
{'='*30}
Grades: {grades}
Average: {average:.1f}
Highest: {highest}
Lowest: {lowest}
Letter Grade: {letter}
Status: {'Pass' if letter != 'F' else 'Fail'}
"""
    return report.strip()

# Test with sample students
students = [
    ("Alice", [95, 87, 92, 88]),
    ("Bob", [78, 82, 85, 80]),
    ("Charlie", [92, 89, 94, 91]),
    ("Diana", [65, 72, 68, 71]),
    ("Eve", [88, 90, 85, 92])
]

print("Student Grade Reports:")
print("=" * 50)

for name, grades in students:
    report = generate_report(name, grades)
    print(report)
    print()

# Summary statistics
all_grades = [grade for _, grades in students for grade in grades]
class_average = calculate_average(all_grades)
class_highest = find_highest(all_grades)
class_lowest = find_lowest(all_grades)

print("Class Summary:")
print(f"Total students: {len(students)}")
print(f"Total grades: {len(all_grades)}")
print(f"Class average: {class_average:.1f}")
print(f"Class highest: {class_highest}")
print(f"Class lowest: {class_lowest}")

# Grade distribution
letter_counts = {}
for name, grades in students:
    avg = calculate_average(grades)
    letter = assign_letter_grade(avg)
    letter_counts[letter] = letter_counts.get(letter, 0) + 1

print(f"Grade distribution: {letter_counts}")`
    },
    {
      id: "ex4",
      question: "Write a text analysis program:\n1. Create functions to count words, characters, and sentences\n2. Create a function to find most frequent words\n3. Create a function to check text readability\n4. Test with different text samples",
      solution: `# Function to count words in text
def count_words(text):
    words = text.split()
    return len(words)

# Function to count characters (excluding spaces)
def count_characters(text):
    return len(text.replace(" ", ""))

# Function to count sentences (basic - counts periods, exclamation marks, question marks)
def count_sentences(text):
    if not text.strip():
        return 0
    # Count ending punctuation marks
    sentences = text.count('.') + text.count('!') + text.count('?')
    return max(1, sentences)  # At least 1 sentence if there's text

# Function to find most frequent words
def most_frequent_words(text, top_n=3):
    words = text.lower().split()
    # Remove punctuation from words
    clean_words = []
    for word in words:
        clean_word = ''.join(c for c in word if c.isalnum())
        if clean_word:
            clean_words.append(clean_word)

    # Count frequencies
    word_counts = {}
    for word in clean_words:
        word_counts[word] = word_counts.get(word, 0) + 1

    # Sort by frequency and return top N
    sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
    return sorted_words[:top_n]

# Function to check basic readability
def check_readability(text):
    words = count_words(text)
    sentences = count_sentences(text)

    if sentences == 0:
        return "No readable content"

    avg_words_per_sentence = words / sentences

    if avg_words_per_sentence < 10:
        return "Easy to read"
    elif avg_words_per_sentence < 20:
        return "Moderate difficulty"
    else:
        return "Difficult to read"

# Test with sample texts
texts = [
    "The quick brown fox jumps over the lazy dog. This is a simple test sentence.",
    "Python programming is fun and powerful. Functions help organize code. They make programs modular and reusable. Learning functions is important for good programming practices.",
    "In computer science, algorithms are step-by-step procedures for calculations. Data structures organize and store data efficiently. Programming languages provide tools to implement these concepts."
]

print("Text Analysis Results:")
print("=" * 60)

for i, text in enumerate(texts, 1):
    print(f"Text {i} Analysis:")
    print("-" * 20)

    word_count = count_words(text)
    char_count = count_characters(text)
    sentence_count = count_sentences(text)
    readability = check_readability(text)
    frequent_words = most_frequent_words(text)

    print(f"Words: {word_count}")
    print(f"Characters: {char_count}")
    print(f"Sentences: {sentence_count}")
    print(f"Readability: {readability}")
    print(f"Most frequent words: {frequent_words}")

    # Calculate average word length
    words = text.split()
    if words:
        avg_word_length = sum(len(word) for word in words) / len(words)
        print(f"Average word length: {avg_word_length:.1f}")

    print(f"Text preview: {text[:50]}...")
    print()

# Overall statistics
total_texts = len(texts)
avg_words = sum(count_words(text) for text in texts) / total_texts
avg_chars = sum(count_characters(text) for text in texts) / total_texts

print("Overall Statistics:")
print(f"Average words per text: {avg_words:.1f}")
print(f"Average characters per text: {avg_chars:.1f}")`
    },
    {
      id: "ex5",
      question: "Create a simple calculator program:\n1. Write functions for basic arithmetic operations (add, subtract, multiply, divide)\n2. Write a function to get user input and validate it\n3. Write a main calculator function that uses the others\n4. Handle division by zero and invalid operations\n5. Allow multiple calculations in a loop",
      solution: `# Function for addition
def add(a, b):
    return a + b

# Function for subtraction
def subtract(a, b):
    return a - b

# Function for multiplication
def multiply(a, b):
    return a * b

# Function for division with error handling
def divide(a, b):
    if b == 0:
        return None, "Cannot divide by zero"
    return a / b, None

# Function to get valid number input
def get_number(prompt):
    while True:
        try:
            num = float(input(prompt))
            return num
        except ValueError:
            print("Please enter a valid number.")

# Function to get valid operation
def get_operation():
    valid_ops = ['+', '-', '*', '/']
    while True:
        op = input("Enter operation (+, -, *, /): ").strip()
        if op in valid_ops:
            return op
        print("Invalid operation. Please use +, -, *, or /.")

# Main calculator function
def calculator():
    print("Simple Calculator")
    print("Enter two numbers and an operation.")

    # Get inputs
    num1 = get_number("Enter first number: ")
    operation = get_operation()
    num2 = get_number("Enter second number: ")

    # Perform calculation
    if operation == '+':
        result = add(num1, num2)
        print(f"{num1} + {num2} = {result}")
    elif operation == '-':
        result = subtract(num1, num2)
        print(f"{num1} - {num2} = {result}")
    elif operation == '*':
        result = multiply(num1, num2)
        print(f"{num1} * {num2} = {result}")
    elif operation == '/':
        result, error = divide(num1, num2)
        if error:
            print(f"Error: {error}")
        else:
            print(f"{num1} / {num2} = {result}")

    return result

# Main program loop
def main():
    print("Welcome to the Calculator Program!")
    print("=" * 40)

    while True:
        calculator()

        # Ask if user wants to continue
        again = input("Do another calculation? (y/n): ").lower().strip()
        if again != 'y' and again != 'yes':
            print("Thank you for using the calculator!")
            break
        print()

# Run the program (commented out for testing)
# main()

# Test individual functions for demonstration
print("Testing individual functions:")
print(f"add(5, 3) = {add(5, 3)}")
print(f"subtract(10, 4) = {subtract(10, 4)}")
print(f"multiply(6, 7) = {multiply(6, 7)}")
result, error = divide(15, 3)
print(f"divide(15, 3) = {result}")
result, error = divide(10, 0)
print(f"divide(10, 0) = Error: {error}")

print("\nTo run the interactive calculator, uncomment main() at the bottom.")`
    }
  ]
};
