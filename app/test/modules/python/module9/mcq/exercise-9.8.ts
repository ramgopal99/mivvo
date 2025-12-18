import { Exercise } from '../../../../data/lessonsData';

export const exercise_9_8: Exercise = {
  id: "9.8",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a simple Car class:\n1. Define a Car class with __init__ method\n2. Add attributes: make, model, year, color\n3. Create a method to display car information\n4. Create multiple car objects and display their info\n5. Add a method to calculate car age",
      solution: `class Car:
    def __init__(self, make, model, year, color):
        self.make = make
        self.model = model
        self.year = year
        self.color = color

    def display_info(self):
        print(f"{self.year} {self.make} {self.model} ({self.color})")

    def calculate_age(self, current_year=2024):
        return current_year - self.year

# Create car objects
car1 = Car("Toyota", "Camry", 2020, "Blue")
car2 = Car("Honda", "Civic", 2019, "Red")
car3 = Car("Ford", "Mustang", 2022, "Black")

# Display information
print("Car Information:")
car1.display_info()
car2.display_info()
car3.display_info()

# Calculate ages
print(f"\nCar Ages (2024):")
print(f"{car1.make} {car1.model}: {car1.calculate_age()} years old")
print(f"{car2.make} {car2.model}: {car2.calculate_age()} years old")
print(f"{car3.make} {car3.model}: {car3.calculate_age()} years old")`
    },
    {
      id: "ex2",
      question: "Create a BankAccount class:\n1. Define BankAccount class with account holder name and balance\n2. Add methods: deposit, withdraw, check_balance\n3. Include validation (cannot withdraw more than balance)\n4. Create account objects and perform transactions\n5. Display transaction history",
      solution: `class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        self.account_holder = account_holder
        self.balance = initial_balance
        self.transactions = []

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self.transactions.append(f"Deposited: \${amount}")
            print(f"Deposited \${amount}. New balance: \${self.balance}")
        else:
            print("Deposit amount must be positive")

    def withdraw(self, amount):
        if amount > 0:
            if amount <= self.balance:
                self.balance -= amount
                self.transactions.append(f"Withdrew: \${amount}")
                print(f"Withdrew \${amount}. New balance: \${self.balance}")
            else:
                print("Insufficient funds")
        else:
            print("Withdrawal amount must be positive")

    def check_balance(self):
        print(f"Account balance: \${self.balance}")
        return self.balance

    def show_transactions(self):
        print(f"Transaction history for {self.account_holder}:")
        for transaction in self.transactions:
            print(f"  - {transaction}")

# Create account objects
account1 = BankAccount("Alice Johnson", 1000)
account2 = BankAccount("Bob Smith", 500)

# Perform transactions
print("Account 1 Transactions:")
account1.deposit(500)
account1.withdraw(200)
account1.withdraw(1500)  # Should fail
account1.check_balance()

print("\nAccount 2 Transactions:")
account2.deposit(1000)
account2.withdraw(300)
account2.check_balance()

# Show transaction history
print("\nTransaction History:")
account1.show_transactions()
print()
account2.show_transactions()`
    },
    {
      id: "ex3",
      question: "Create inheritance with Animal classes:\n1. Create a base Animal class with name and sound attributes\n2. Create Dog and Cat classes that inherit from Animal\n3. Override the make_sound method in each subclass\n4. Add specific methods to each subclass\n5. Create objects and demonstrate polymorphism",
      solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        return "Some generic animal sound"

    def introduce(self):
        return f"I am {self.name}"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

    def make_sound(self):
        return "Woof! Woof!"

    def fetch(self):
        return f"{self.name} the {self.breed} is fetching the ball!"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color

    def make_sound(self):
        return "Meow! Meow!"

    def scratch(self):
        return f"{self.name} the {self.color} cat is scratching the post!"

# Create animal objects
dog1 = Dog("Buddy", "Golden Retriever")
cat1 = Cat("Whiskers", "Orange")
dog2 = Dog("Max", "German Shepherd")

# Create list of animals to demonstrate polymorphism
animals = [dog1, cat1, dog2]

# Introduce all animals
print("Animal Introductions:")
for animal in animals:
    print(f"{animal.introduce()}: {animal.make_sound()}")

# Demonstrate specific methods
print(f"\nSpecific Actions:")
print(dog1.fetch())
print(cat1.scratch())
print(dog2.fetch())

# Show inheritance
print(f"\nInheritance Check:")
print(f"Dog is instance of Animal: {isinstance(dog1, Animal)}")
print(f"Cat is instance of Animal: {isinstance(cat1, Animal)}")
print(f"Dog has breed attribute: {hasattr(dog1, 'breed')}")
print(f"Cat has color attribute: {hasattr(cat1, 'color')}")`
    },
    {
      id: "ex4",
      question: "Create a Library Book system:\n1. Create a Book class with title, author, isbn\n2. Create a Library class that manages books\n3. Add methods to borrow and return books\n4. Track which books are available\n5. Display library status and borrowed books",
      solution: `class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True

    def __str__(self):
        status = "Available" if self.is_available else "Borrowed"
        return f"'{self.title}' by {self.author} ({status})"

class Library:
    def __init__(self, name):
        self.name = name
        self.books = []
        self.borrowed_books = []

    def add_book(self, book):
        self.books.append(book)
        print(f"Added: {book}")

    def borrow_book(self, title):
        for book in self.books:
            if book.title.lower() == title.lower() and book.is_available:
                book.is_available = False
                self.borrowed_books.append(book)
                print(f"Borrowed: {book}")
                return True
        print(f"Book '{title}' not available")
        return False

    def return_book(self, title):
        for book in self.borrowed_books:
            if book.title.lower() == title.lower():
                book.is_available = True
                self.borrowed_books.remove(book)
                print(f"Returned: {book}")
                return True
        print(f"Book '{title}' was not borrowed from this library")
        return False

    def display_available_books(self):
        print(f"\nAvailable books in {self.name}:")
        available = [book for book in self.books if book.is_available]
        if available:
            for book in available:
                print(f"  - {book}")
        else:
            print("  No books available")

    def display_borrowed_books(self):
        print(f"\nBorrowed books from {self.name}:")
        if self.borrowed_books:
            for book in self.borrowed_books:
                print(f"  - {book}")
        else:
            print("  No books currently borrowed")

# Create library
library = Library("City Library")

# Add books
book1 = Book("Python Programming", "John Smith", "123456")
book2 = Book("Data Structures", "Jane Doe", "234567")
book3 = Book("Algorithms", "Bob Johnson", "345678")

library.add_book(book1)
library.add_book(book2)
library.add_book(book3)

# Borrow and return books
print("\nBorrowing books:")
library.borrow_book("Python Programming")
library.borrow_book("Data Structures")
library.borrow_book("Nonexistent Book")  # Should fail

print("\nReturning books:")
library.return_book("Python Programming")
library.return_book("Unknown Book")  # Should fail

# Display status
library.display_available_books()
library.display_borrowed_books()`
    },
    {
      id: "ex5",
      question: "Create a Student Grade Management System:\n1. Create a Student class with name and grades list\n2. Add methods to add grades, calculate average, get letter grade\n3. Create a Classroom class that manages multiple students\n4. Add methods to find top student, class average, grade distribution\n5. Demonstrate class relationships and object interactions",
      solution: `class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []

    def add_grade(self, grade):
        if 0 <= grade <= 100:
            self.grades.append(grade)
            print(f"Added grade {grade} for {self.name}")
        else:
            print("Grade must be between 0 and 100")

    def calculate_average(self):
        if not self.grades:
            return 0
        return sum(self.grades) / len(self.grades)

    def get_letter_grade(self):
        avg = self.calculate_average()
        if avg >= 90:
            return 'A'
        elif avg >= 80:
            return 'B'
        elif avg >= 70:
            return 'C'
        elif avg >= 60:
            return 'D'
        else:
            return 'F'

    def __str__(self):
        return f"{self.name}: Grades {self.grades}, Average {self.calculate_average():.1f}, Grade {self.get_letter_grade()}"

class Classroom:
    def __init__(self, class_name):
        self.class_name = class_name
        self.students = []

    def add_student(self, student):
        self.students.append(student)
        print(f"Added student {student.name} to {self.class_name}")

    def find_top_student(self):
        if not self.students:
            return None
        return max(self.students, key=lambda s: s.calculate_average())

    def calculate_class_average(self):
        if not self.students:
            return 0
        total = sum(student.calculate_average() for student in self.students)
        return total / len(self.students)

    def get_grade_distribution(self):
        distribution = {'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0}
        for student in self.students:
            grade = student.get_letter_grade()
            distribution[grade] += 1
        return distribution

    def display_all_students(self):
        print(f"\nStudents in {self.class_name}:")
        for student in self.students:
            print(f"  {student}")

# Create classroom
classroom = Classroom("Computer Science 101")

# Create students
student1 = Student("Alice")
student2 = Student("Bob")
student3 = Student("Charlie")
student4 = Student("Diana")

# Add students to classroom
classroom.add_student(student1)
classroom.add_student(student2)
classroom.add_student(student3)
classroom.add_student(student4)

# Add grades
student1.add_grade(95)
student1.add_grade(87)
student1.add_grade(92)

student2.add_grade(78)
student2.add_grade(82)
student2.add_grade(85)

student3.add_grade(92)
student3.add_grade(89)
student3.add_grade(94)

student4.add_grade(85)
student4.add_grade(88)
student4.add_grade(82)

# Display all students
classroom.display_all_students()

# Class statistics
print(f"\nClass Statistics for {classroom.class_name}:")
print(f"Class average: {classroom.calculate_class_average():.1f}")

top_student = classroom.find_top_student()
if top_student:
    print(f"Top student: {top_student.name} ({top_student.calculate_average():.1f})")

grade_dist = classroom.get_grade_distribution()
print(f"Grade distribution: {grade_dist}")`
    }
  ]
};

