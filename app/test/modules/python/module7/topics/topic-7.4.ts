import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_4: SubLesson = {
  id: "7.4",
  title: 'Return Values',
  status: 'demo',
  content: "`# â†©ï¸ Return Values

Functions can return values back to the caller. Understanding return statements is crucial for effective programming!

---

## ðŸŽ¯ Basic Return Statement

### **Returning a Single Value**
\`"\`\`python
def get_greeting(name):
    """Return a personalized greeting."""
    return f"Hello, {name}!"

def add_numbers(a, b):
    """Return the sum of two numbers."""
    return a + b

# Use the returned values
message = get_greeting("Alice")
print(message)  # Hello, Alice!

result = add_numbers(5, 3)
print(result)   # 8

# Use in expressions
total = add_numbers(10, 20) + add_numbers(5, 5)
print(total)  # 40
\`\`\`

---

## ðŸ”„ Multiple Return Values

### **Returning Tuples**
\`\`\`python
def get_user_info():
    """Return user information as tuple."""
    name = "Alice"
    age = 25
    email = "alice@email.com"
    return name, age, email  # Returns a tuple

def calculate_stats(numbers):
    """Return min, max, and average."""
    if not numbers:
        return None, None, None
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

# Unpack returned values
name, age, email = get_user_info()
print(f"Name: {name}, Age: {age}, Email: {email}")

minimum, maximum, average = calculate_stats([1, 5, 3, 9, 2])
print(f"Min: {minimum}, Max: {maximum}, Avg: {average:.1f}")
\`\`\`

---

## ðŸ›‘ Early Returns

### **Return Early from Functions**
\`\`\`python
def validate_age(age):
    """Validate age and return appropriate message."""
    if age < 0:
        return "Age cannot be negative"

    if age < 18:
        return "Must be 18 or older"

    return "Age is valid"

def find_first_even(numbers):
    """Find the first even number in list."""
    for num in numbers:
        if num % 2 == 0:
            return num  # Exit immediately when found
    return None  # No even number found

# Test validation
print(validate_age(-5))    # Age cannot be negative
print(validate_age(15))    # Must be 18 or older
print(validate_age(25))    # Age is valid

# Test search
print(find_first_even([1, 3, 5, 6, 7]))  # 6
print(find_first_even([1, 3, 5, 7]))     # None
\`\`\`

---

## ðŸ“¦ Returning Different Types

### **Flexible Return Types**
\`\`\`python
def process_data(data, operation):
    """Process data based on operation type."""
    if operation == "sum":
        if isinstance(data, list):
            return sum(data)
        return data

    elif operation == "length":
        if isinstance(data, (str, list, tuple)):
            return len(data)
        return 0

    elif operation == "reverse":
        if isinstance(data, str):
            return data[::-1]
        elif isinstance(data, list):
            return data[::-1]
        return data

    else:
        return None

# Test different return types
print(process_data([1, 2, 3], "sum"))        # 6 (int)
print(process_data("hello", "length"))       # 5 (int)
print(process_data("world", "reverse"))      # dlrow (str)
print(process_data([1, 2, 3], "reverse"))    # [3, 2, 1] (list)
print(process_data(42, "unknown"))           # None
\`\`\`

---

## ðŸ”„ Conditional Returns

### **Return Based on Conditions**
\`\`\`python
def get_grade_description(score):
    """Return grade description based on score."""
    if score >= 90:
        return "Excellent"
    elif score >= 80:
        return "Good"
    elif score >= 70:
        return "Fair"
    elif score >= 60:
        return "Poor"
    else:
        return "Failing"

def check_password_strength(password):
    """
    Check password strength.

    Returns:
        tuple: (strength_level, score)
    """
    score = 0

    if len(password) >= 8:
        score += 1
    if any(char.isupper() for char in password):
        score += 1
    if any(char.islower() for char in password):
        score += 1
    if any(char.isdigit() for char in password):
        score += 1

    if score == 4:
        return "Very Strong", score
    elif score == 3:
        return "Strong", score
    elif score == 2:
        return "Medium", score
    else:
        return "Weak", score

# Test grading
scores = [95, 85, 75, 65, 55]
for score in scores:
    description = get_grade_description(score)
    print(f"{score}: {description}")

# Test password strength
passwords = ["weak", "Password", "Password123", "Password123!"]
for pwd in passwords:
    strength, score = check_password_strength(pwd)
    print(f"'{pwd}': {strength} ({score}/4)")
\`\`\`

---

## ðŸŽ¨ Practical Examples

### **Data Processing Functions**
\`\`\`python
def clean_text(text):
    """Clean and normalize text."""
    if not text:
        return ""
    return text.strip().lower()

def extract_numbers(text):
    """Extract all numbers from text."""
    import re
    numbers = re.findall(r'\d+', text)
    return [int(num) for num in numbers] if numbers else []

def calculate_bmi(weight_kg, height_m):
    """Calculate BMI and category."""
    if height_m <= 0 or weight_kg <= 0:
        return None, "Invalid measurements"

    bmi = weight_kg / (height_m ** 2)

    if bmi < 18.5:
        category = "Underweight"
    elif bmi < 25:
        category = "Normal"
    elif bmi < 30:
        category = "Overweight"
    else:
        category = "Obese"

    return round(bmi, 1), category

# Test text processing
text = "  Hello World 123 456  "
print(f"Cleaned: '{clean_text(text)}'")
print(f"Numbers: {extract_numbers(text)}")

# Test BMI calculator
bmi, category = calculate_bmi(70, 1.75)
print(f"BMI: {bmi}, Category: {category}")
\`\`\`

---

## âœ… Best Practices

1. **Be consistent with return types** - Same function should return similar types
2. **Use early returns for error conditions** - Fail fast, succeed early
3. **Document return values** - Use docstrings to explain what gets returned
4. **Consider multiple return values** - Use tuples for related data
5. **Handle edge cases** - Think about empty inputs, invalid data, etc.

Return values make functions useful and composable! ðŸ”„`
};


