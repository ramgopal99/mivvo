import { Exercise } from '../../../../data/lessonsData';

export const exercise_6_8: Exercise = {
  id: 6.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a Java program that demonstrates basic class and object concepts:\n1. Define a Car class with make, model, and year fields\n2. Create a constructor and getter methods\n3. Create multiple Car objects with different values\n4. Display information about each car\n5. Show how objects are independent of each other",
      solution: `public class CarDemo {
    public static void main(String[] args) {
        // Create Car objects using the constructor
        Car car1 = new Car("Toyota", "Camry", 2020);
        Car car2 = new Car("Honda", "Civic", 2021);
        Car car3 = new Car("Ford", "Mustang", 2019);

        // Display information about each car
        System.out.println("Car 1: " + car1.getMake() + " " + car1.getModel() + " (" + car1.getYear() + ")");
        System.out.println("Car 2: " + car2.getMake() + " " + car2.getModel() + " (" + car2.getYear() + ")");
        System.out.println("Car 3: " + car3.getMake() + " " + car3.getModel() + " (" + car3.getYear() + ")");

        // Objects are independent - changing one doesn't affect others
        System.out.println("\\nOriginal car1: " + car1.getModel());

        // car2 is completely independent
        System.out.println("car2 remains: " + car2.getModel());
    }
}

class Car {
    private String make;
    private String model;
    private int year;

    // Constructor
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Getter methods
    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates encapsulation:\n1. Create a BankAccount class with private balance field\n2. Implement deposit() and withdraw() methods with validation\n3. Create a BankAccount object and perform transactions\n4. Show that balance cannot be accessed directly\n5. Display account information using getter methods",
      solution: `public class BankAccountDemo {
    public static void main(String[] args) {
        // Create a bank account
        BankAccount account = new BankAccount("John Doe", "123456789");

        // Display initial balance
        System.out.println("Initial balance: $" + account.getBalance());

        // Perform transactions
        account.deposit(1000.00);
        System.out.println("After deposit: $" + account.getBalance());

        account.withdraw(300.00);
        System.out.println("After withdrawal: $" + account.getBalance());

        // Try to withdraw more than balance
        account.withdraw(800.00);
        System.out.println("After failed withdrawal: $" + account.getBalance());

        // Cannot access balance directly (compilation error if uncommented)
        // account.balance = -1000; // This would cause an error

        // Display account info
        System.out.println("Account holder: " + account.getAccountHolder());
        System.out.println("Account number: " + account.getAccountNumber());
        System.out.println("Final balance: $" + account.getBalance());
    }
}

class BankAccount {
    private String accountHolder;
    private String accountNumber;
    private double balance;

    public BankAccount(String accountHolder, String accountNumber) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = 0.0;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public String getAccountNumber() {
        return accountNumber;
    }
}`
    },
    {
      id: "ex3",
      question: "Create a Java program that shows constructor overloading:\n1. Define a Student class with multiple constructors\n2. Create constructor that takes name only\n3. Create constructor that takes name and age\n4. Create constructor that takes name, age, and GPA\n5. Demonstrate all constructors and show default values",
      solution: `public class ConstructorOverloadingDemo {
    public static void main(String[] args) {
        // Using different constructors
        Student student1 = new Student("Alice");
        Student student2 = new Student("Bob", 20);
        Student student3 = new Student("Charlie", 21, 3.8);

        // Display student information
        System.out.println("Student 1: " + student1.getName() + ", Age: " + student1.getAge() + ", GPA: " + student1.getGpa());
        System.out.println("Student 2: " + student2.getName() + ", Age: " + student2.getAge() + ", GPA: " + student2.getGpa());
        System.out.println("Student 3: " + student3.getName() + ", Age: " + student3.getAge() + ", GPA: " + student3.getGpa());

        // Update student information
        student1.setAge(19);
        student1.setGpa(3.5);

        System.out.println("\\nAfter updates:");
        System.out.println("Student 1: " + student1.getName() + ", Age: " + student1.getAge() + ", GPA: " + student1.getGpa());
    }
}

class Student {
    private String name;
    private int age;
    private double gpa;

    // Constructor with name only
    public Student(String name) {
        this.name = name;
        this.age = 18;  // Default age
        this.gpa = 0.0; // Default GPA
    }

    // Constructor with name and age
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        this.gpa = 0.0; // Default GPA
    }

    // Constructor with all fields
    public Student(String name, int age, double gpa) {
        this.name = name;
        this.age = age;
        this.gpa = gpa;
    }

    // Getter methods
    public String getName() { return name; }
    public int getAge() { return age; }
    public double getGpa() { return gpa; }

    // Setter methods
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setGpa(double gpa) { this.gpa = gpa; }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates object references:\n1. Create a Person class with name and age fields\n2. Create multiple references to the same object\n3. Show how changes through one reference affect all references\n4. Demonstrate creating independent objects\n5. Show the difference between object equality and reference equality",
      solution: `public class ObjectReferencesDemo {
    public static void main(String[] args) {
        // Create first person object
        Person person1 = new Person("Alice", 25);
        System.out.println("person1: " + person1.getName() + ", age " + person1.getAge());

        // Create second reference to the same object
        Person person2 = person1;
        System.out.println("person2: " + person2.getName() + ", age " + person2.getAge());

        // Modify through person2 - affects person1 too
        person2.setName("Alice Smith");
        person2.setAge(26);

        System.out.println("\\nAfter modifying through person2:");
        System.out.println("person1: " + person1.getName() + ", age " + person1.getAge());
        System.out.println("person2: " + person2.getName() + ", age " + person2.getAge());

        // Check if references point to same object
        System.out.println("\\nperson1 == person2: " + (person1 == person2)); // true

        // Create independent object
        Person person3 = new Person("Bob", 30);
        System.out.println("\\nperson3: " + person3.getName() + ", age " + person3.getAge());

        // Modify person3 - doesn't affect others
        person3.setName("Robert");
        System.out.println("After modifying person3:");
        System.out.println("person1: " + person1.getName());
        System.out.println("person3: " + person3.getName());

        // Different objects with same data
        Person person4 = new Person("Alice Smith", 26);
        System.out.println("\\nperson1.equals(person4) (same data): " + person1.equals(person4));
        System.out.println("person1 == person4 (different objects): " + (person1 == person4));
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Person person = (Person) obj;
        return age == person.age && name.equals(person.name);
    }

    @Override
    public String toString() {
        return name + " (age " + age + ")";
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that demonstrates a simple library system:\n1. Create a Book class with title, author, and ISBN\n2. Create a Library class that manages multiple books\n3. Implement methods to add books, remove books, and search by title\n4. Demonstrate object composition (Library contains Book objects)\n5. Show proper encapsulation and data validation",
      solution: `import java.util.ArrayList;
import java.util.List;

public class LibrarySystemDemo {
    public static void main(String[] args) {
        // Create a library
        Library library = new Library("City Library");

        // Create some books
        Book book1 = new Book("1984", "George Orwell", "978-0451524935");
        Book book2 = new Book("To Kill a Mockingbird", "Harper Lee", "978-0061120084");
        Book book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "978-0743273565");

        // Add books to library
        library.addBook(book1);
        library.addBook(book2);
        library.addBook(book3);

        // Display all books
        System.out.println("Books in " + library.getName() + ":");
        library.displayAllBooks();

        // Search for books
        System.out.println("\\nSearching for '1984':");
        Book foundBook = library.findBookByTitle("1984");
        if (foundBook != null) {
            System.out.println("Found: " + foundBook.getTitle() + " by " + foundBook.getAuthor());
        } else {
            System.out.println("Book not found");
        }

        // Try to find a book that doesn't exist
        System.out.println("\\nSearching for 'Harry Potter':");
        Book notFoundBook = library.findBookByTitle("Harry Potter");
        if (notFoundBook != null) {
            System.out.println("Found: " + notFoundBook.getTitle());
        } else {
            System.out.println("Book not found");
        }

        // Remove a book
        library.removeBook("978-0061120084");
        System.out.println("\\nAfter removing 'To Kill a Mockingbird':");
        library.displayAllBooks();

        System.out.println("\\nTotal books: " + library.getBookCount());
    }
}

class Book {
    private String title;
    private String author;
    private String isbn;

    public Book(String title, String author, String isbn) {
        if (title == null || title.trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }
        if (author == null || author.trim().isEmpty()) {
            throw new IllegalArgumentException("Author cannot be empty");
        }
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new IllegalArgumentException("ISBN cannot be empty");
        }

        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public String getIsbn() { return isbn; }

    @Override
    public String toString() {
        return "\"" + title + "\" by " + author + " (ISBN: " + isbn + ")";
    }
}

class Library {
    private String name;
    private List<Book> books;

    public Library(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Library name cannot be empty");
        }
        this.name = name;
        this.books = new ArrayList<>();
    }

    public String getName() { return name; }

    public void addBook(Book book) {
        if (book != null) {
            books.add(book);
            System.out.println("Added: " + book.getTitle());
        }
    }

    public boolean removeBook(String isbn) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getIsbn().equals(isbn)) {
                Book removedBook = books.remove(i);
                System.out.println("Removed: " + removedBook.getTitle());
                return true;
            }
        }
        return false;
    }

    public Book findBookByTitle(String title) {
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                return book;
            }
        }
        return null;
    }

    public void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library");
        } else {
            for (Book book : books) {
                System.out.println("  " + book);
            }
        }
    }

    public int getBookCount() {
        return books.size();
    }
}`
    }
  ]
};
