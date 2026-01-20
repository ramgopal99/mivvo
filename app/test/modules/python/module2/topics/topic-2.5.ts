import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_5: SubLesson = {
  id: "2.5",
  title: 'String Validation: isalpha() & isdigit()',
  status: 'demo',
  content: "`# ðŸš€ Python String Validation

Master isalpha() and isdigit() methods!

---

## ðŸŽ¯ CORE METHODS

\`"\`\`python
# isalpha() - Check if ALL characters are letters
print("Hello".isalpha())    # True
print("Hello123".isalpha()) # False
print("Hello!".isalpha())   # False

# isdigit() - Check if ALL characters are digits
print("123".isdigit())      # True
print("123.45".isdigit())   # False
print("abc".isdigit())      # False
\`\`\`

---

## ðŸ“š OTHER STRING METHODS

\`\`\`python
text = "Hello"

# Case checking
print(text.isupper())  # False
print(text.islower())  # False
print(text.istitle())  # True

# Content checking
print(text.isalnum())  # True (letters + numbers)
print(text.isspace())  # False (not only spaces)
\`\`\`

---

## ðŸ”§ PRACTICAL VALIDATION

\`\`\`python
# Name validation (letters only)
def validate_name():
    while True:
        name = input("Enter name: ").strip()
        if name and name.isalpha():
            return name
        print("âŒ Name must contain only letters!")

# Age validation (digits only)
def validate_age():
    while True:
        age_str = input("Enter age: ").strip()
        if age_str.isdigit():
            age = int(age_str)
            if 0 <= age <= 150:
                return age
            print("âŒ Age must be 0-150!")
        print("âŒ Age must be a number!")

# Test validation
name = validate_name()
age = validate_age()
print(f"Hello {name}, age {age}!")
\`\`\`

---

## ðŸŽ¯ QUICK REFERENCE

| Method | Purpose | Example |
|--------|---------|---------|
| isalpha() | Only letters | "Hello".isalpha() â†’ True |
| isdigit() | Only digits | "123".isdigit() â†’ True |
| isalnum() | Letters + numbers | "Hello123".isalnum() â†’ True |
| isupper() | All uppercase | "HELLO".isupper() â†’ True |
| islower() | All lowercase | "hello".islower() â†’ True |
| istitle() | Title case | "Hello World".istitle() â†’ True |
| isspace() | Only spaces | "   ".isspace() â†’ True |

String validation methods help ensure data integrity! ðŸŽ¯`
};


