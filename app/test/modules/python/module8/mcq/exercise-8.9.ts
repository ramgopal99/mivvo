import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_9: Exercise = {
  id: "8.9",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program that:\n1. Takes a list of numbers from user input\n2. Converts input strings to integers\n3. Uses built-in functions to find min, max, and sum\n4. Calculates average using len() and sum()\n5. Displays formatted results",
      solution: `# Get list of numbers from user
numbers_input = input("Enter numbers separated by spaces: ")
numbers_str = numbers_input.split()
numbers = []

# Convert strings to integers
for num_str in numbers_str:
    numbers.append(int(num_str))

print(f"Numbers: {numbers}")

# Use built-in functions
minimum = min(numbers)
maximum = max(numbers)
total = sum(numbers)
average = total / len(numbers)
count = len(numbers)

print(f"Count: {count}")
print(f"Minimum: {minimum}")
print(f"Maximum: {maximum}")
print(f"Sum: {total}")
print(f"Average: {average:.2f}")`
    },
    {
      id: "ex2",
      question: "Write a program that:\n1. Takes a sentence as input\n2. Uses len() to count characters\n3. Splits into words and counts them\n4. Uses sorted() to sort words alphabetically\n5. Uses enumerate() to number the sorted words\n6. Displays word frequency using count()",
      solution: `# Get sentence from user
sentence = input("Enter a sentence: ")

# Count characters
char_count = len(sentence)
print(f"Total characters: {char_count}")

# Split into words and count
words = sentence.split()
word_count = len(words)
print(f"Total words: {word_count}")

# Sort words alphabetically
sorted_words = sorted(words)
print(f"Sorted words: {sorted_words}")

# Number the words using enumerate
print("Word list with numbers:")
for i, word in enumerate(sorted_words, 1):
    print(f"{i}. {word}")

# Count frequency of each word
print("Word frequencies:")
unique_words = []
for word in sorted_words:
    if word not in unique_words:
        unique_words.append(word)

for word in unique_words:
    frequency = words.count(word)
    print(f"'{word}': {frequency} times")`
    },
    {
      id: "ex3",
      question: "Create a program that:\n1. Creates a list of mixed data types\n2. Uses type() to identify each element's type\n3. Converts elements using built-in functions (int(), float(), str())\n4. Uses range() to create number sequences\n5. Demonstrates abs() with negative numbers\n6. Shows round() with decimal numbers",
      solution: `# Create mixed list
mixed_data = [42, 3.14, "hello", True, -5, "123"]

print("Original data and types:")
for item in mixed_data:
    print(f"{item} -> {type(item)}")

# Convert elements
converted_data = []
for item in mixed_data:
    if type(item) == str and item.isdigit():
        converted_data.append(int(item))
    elif type(item) == int:
        converted_data.append(float(item))
    elif type(item) == float:
        converted_data.append(round(item))
    else:
        converted_data.append(str(item))

print(f"\nConverted data: {converted_data}")

# Demonstrate range
print("
Range examples:")
print(f"range(5): {list(range(5))}")
print(f"range(2, 8): {list(range(2, 8))}")
print(f"range(1, 10, 2): {list(range(1, 10, 2))}")

# Demonstrate abs and round
numbers = [3.14159, -7, 2.7, -4.8]
print(f"\nOriginal numbers: {numbers}")
print(f"Absolute values: {[abs(x) for x in numbers]}")
print(f"Rounded values: {[round(x) for x in numbers]}")
print(f"Rounded to 2 decimals: {[round(x, 2) for x in numbers]}")`
    },
    {
      id: "ex4",
      question: "Write a program that:\n1. Takes multiple numbers as input\n2. Uses enumerate() to number them\n3. Sorts them using sorted()\n4. Reverses the sorted list using reversed()\n5. Calculates statistics using sum(), min(), max()\n6. Uses zip() to pair original with sorted positions",
      solution: `# Get numbers from user
numbers_input = input("Enter numbers separated by spaces: ")
numbers_str = numbers_input.split()
numbers = [int(x) for x in numbers_str]

print(f"Original numbers: {numbers}")

# Use enumerate to number them
print("Numbered list:")
for i, num in enumerate(numbers, 1):
    print(f"{i}. {num}")

# Sort the numbers
sorted_numbers = sorted(numbers)
print(f"Sorted: {sorted_numbers}")

# Reverse the sorted list
reversed_numbers = list(reversed(sorted_numbers))
print(f"Reversed: {reversed_numbers}")

# Calculate statistics
total = sum(numbers)
minimum = min(numbers)
maximum = max(numbers)
average = total / len(numbers)

print(f"\nStatistics:")
print(f"Sum: {total}")
print(f"Min: {minimum}")
print(f"Max: {maximum}")
print(f"Average: {average:.2f}")

# Use zip to pair original positions with sorted values
print("
Original vs Sorted positions:")
for original_pos, (sorted_pos, sorted_val) in enumerate(zip(range(1, len(sorted_numbers) + 1), sorted_numbers), 1):
    original_val = numbers[original_pos - 1]
    print(f"Position {original_pos}: {original_val} -> {sorted_val}")`
    },
    {
      id: "ex5",
      question: "Create a text analyzer program:\n1. Takes text input from user\n2. Uses len() for character and word counts\n3. Converts to uppercase/lowercase using upper()/lower()\n4. Uses split() and join() for word processing\n5. Finds unique words using set() and list()\n6. Uses enumerate() to show word positions",
      solution: `# Get text from user
text = input("Enter some text: ")

# Basic counts
char_count = len(text)
words = text.split()
word_count = len(words)

print(f"Text: '{text}'")
print(f"Characters: {char_count}")
print(f"Words: {word_count}")

# Case conversion
uppercase = text.upper()
lowercase = text.lower()
print(f"\nUppercase: {uppercase}")
print(f"Lowercase: {lowercase}")

# Word processing
print(f"\nWords: {words}")

# Join words back with different separators
joined_dash = "-".join(words)
joined_space = " ".join(words)
print(f"Joined with dashes: {joined_dash}")
print(f"Joined with spaces: {joined_space}")

# Find unique words
unique_words = list(set(words))
print(f"\nUnique words: {unique_words}")
print(f"Unique word count: {len(unique_words)}")

# Show word positions using enumerate
print("
Word positions:")
for i, word in enumerate(words, 1):
    print(f"{i}. {word}")

# Word length analysis
word_lengths = [len(word) for word in words]
print(f"\nWord lengths: {word_lengths}")
print(f"Average word length: {sum(word_lengths) / len(word_lengths):.1f}")
print(f"Longest word: {max(words, key=len)}")
print(f"Shortest word: {min(words, key=len)}")`
    }
  ]
};

