import { SubLesson } from '../../../data/lessonsData';

export const topic_7_2: SubLesson = {
  id: 7.2,
  title: 'Defining Functions',
  status: 'demo',
  content: `# 🆕 Defining Python Functions

Functions are defined using the \`def\` keyword. Let's learn the complete syntax and best practices!

---

## 🎯 Basic Function Definition

### **Function Syntax**
\`\`\`python
def function_name():
    """Optional docstring describing what the function does."""
    # Function body
    # Code goes here
    pass  # Placeholder when no code

# Call the function
function_name()
\`\`\`

### **Complete Example**
\`\`\`python
def greet_user():
    """Display a greeting message."""
    print("Hello! Welcome to our program.")
    print("Hope you're having a great day!")

# Call the function multiple times
greet_user()
print("---")
greet_user()
\`\`\`

---

## 📝 Function with Parameters

### **Accepting Input Values**
\`\`\`python
def greet_person(name):
    """Greet a specific person by name."""
    print(f"Hello, {name}! Nice to meet you.")

def calculate_square(number):
    """Calculate the square of a number."""
    result = number * number
    print(f"The square of {number} is {result}")

# Call with different arguments
greet_person("Alice")
greet_person("Bob")
calculate_square(5)
calculate_square(10)
\`\`\`

---

## 🔄 Functions with Return Values

### **Returning Results**
\`\`\`python
def add_numbers(a, b):
    """Add two numbers and return the result."""
    result = a + b
    return result

def get_full_name(first, last):
    """Combine first and last names."""
    return f"{first} {last}"

# Use the return values
sum_result = add_numbers(5, 3)
print(f"Sum: {sum_result}")  # Sum: 8

name = get_full_name("Alice", "Johnson")
print(f"Full name: {name}")  # Full name: Alice Johnson

# Use in expressions
total = add_numbers(10, 20) + add_numbers(5, 5)
print(f"Total: {total}")  # Total: 40
\`\`\`

---

## 📚 Docstrings

### **Documenting Functions**
\`\`\`python
def calculate_area(length, width):
    """
    Calculate the area of a rectangle.

    Args:
        length (float): The length of the rectangle
        width (float): The width of the rectangle

    Returns:
        float: The area of the rectangle

    Example:
        >>> calculate_area(5, 3)
        15
    """
    return length * width

# Access docstring
print(calculate_area.__doc__)

# Use the function
area = calculate_area(5, 3)
print(f"Area: {area}")
\`\`\`

---

## 🎨 Advanced Examples

### **Multi-Step Functions**
\`\`\`python
def process_student_data(name, scores):
    """
    Process student information and calculate statistics.

    Args:
        name (str): Student name
        scores (list): List of test scores

    Returns:
        dict: Dictionary with student info and statistics
    """
    # Calculate statistics
    average = sum(scores) / len(scores)
    highest = max(scores)
    lowest = min(scores)

    # Create result dictionary
    result = {
        "name": name,
        "scores": scores,
        "average": round(average, 2),
        "highest": highest,
        "lowest": lowest,
        "passed": average >= 60
    }

    return result

# Use the function
alice_data = process_student_data("Alice", [85, 92, 78, 96])
print("Alice's results:")
for key, value in alice_data.items():
    print(f"  {key}: {value}")

bob_data = process_student_data("Bob", [45, 52, 38, 41])
print(f"\nBob passed: {bob_data['passed']}")
\`\`\`

### **Validation Functions**
\`\`\`python
def validate_password(password):
    """
    Validate password strength.

    Args:
        password (str): Password to validate

    Returns:
        tuple: (is_valid, message)
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"

    if not any(char.isupper() for char in password):
        return False, "Password must contain at least one uppercase letter"

    if not any(char.islower() for char in password):
        return False, "Password must contain at least one lowercase letter"

    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least one number"

    return True, "Password is strong"

# Test passwords
test_passwords = ["weak", "Password123", "password", "PASSWORD123"]

for pwd in test_passwords:
    is_valid, message = validate_password(pwd)
    status = "✅" if is_valid else "❌"
    print(f"{status} '{pwd}': {message}")
\`\`\`

---

## ✅ Best Practices

1. **Use descriptive names** - calculate_total() not calc()
2. **Write docstrings** - Document what the function does
3. **Keep functions focused** - One clear responsibility per function
4. **Use return statements** - Make functions useful by returning values
5. **Handle edge cases** - Consider what happens with invalid inputs

Functions make your code organized, reusable, and maintainable! 📝`
};
