import { Exercise } from '../../../data/lessonsData';

export const exercise_5_8: Exercise = {
  id: 5.8,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create a program that:\n1. Creates sets of even and odd numbers from 1-20\n2. Demonstrates set operations: union, intersection, difference\n3. Shows how to check membership and get set length\n4. Uses set comprehensions to create squared numbers",
      solution: `# Create sets of even and odd numbers
even_numbers = {x for x in range(1, 21) if x % 2 == 0}
odd_numbers = {x for x in range(1, 21) if x % 2 != 0}

print(f"Even numbers: {even_numbers}")
print(f"Odd numbers: {odd_numbers}")
print(f"Total numbers: {len(even_numbers) + len(odd_numbers)}")

# Set operations
all_numbers = even_numbers.union(odd_numbers)
print(f"All numbers (union): {all_numbers}")

# Intersection of evens and multiples of 3
multiples_of_3 = {x for x in range(1, 21) if x % 3 == 0}
even_multiples_3 = even_numbers.intersection(multiples_of_3)
print(f"Even multiples of 3: {even_multiples_3}")

# Numbers that are even but not multiples of 3
even_not_multiple_3 = even_numbers.difference(multiples_of_3)
print(f"Even numbers not multiples of 3: {even_not_multiple_3}")

# Check membership
print(f"Is 10 even? {10 in even_numbers}")
print(f"Is 15 odd? {15 in odd_numbers}")

# Set comprehension for squares
squares = {x**2 for x in range(1, 11)}
print(f"Squares from 1-10: {squares}")`
    },
    {
      id: "ex2",
      question: "Write a program that simulates a library book borrowing system:\n1. Create sets for available books and borrowed books\n2. Implement book borrowing (remove from available, add to borrowed)\n3. Implement book returning (add to available, remove from borrowed)\n4. Check which books are currently available\n5. Find books that have never been borrowed",
      solution: `# Library book system using sets
all_books = {"Python Basics", "Data Structures", "Algorithms", "Web Development", "Machine Learning", "Database Design"}
borrowed_books = set()

print(f"All books in library: {all_books}")

# Simulate borrowing books
def borrow_book(book):
    if book in all_books and book not in borrowed_books:
        borrowed_books.add(book)
        print(f"✅ Borrowed: {book}")
        return True
    else:
        print(f"❌ Cannot borrow: {book}")
        return False

def return_book(book):
    if book in borrowed_books:
        borrowed_books.remove(book)
        print(f"✅ Returned: {book}")
        return True
    else:
        print(f"❌ Book not borrowed: {book}")
        return False

# Borrow some books
borrow_book("Python Basics")
borrow_book("Algorithms")
borrow_book("Machine Learning")

# Check current status
available_books = all_books - borrowed_books
print(f"\nCurrently available: {available_books}")
print(f"Currently borrowed: {borrowed_books}")

# Return a book
return_book("Python Basics")

# Check again
available_books = all_books - borrowed_books
print(f"\nAfter return - Available: {available_books}")
print(f"After return - Borrowed: {borrowed_books}")

# Books never borrowed
never_borrowed = all_books - borrowed_books
print(f"\nBooks never borrowed: {never_borrowed}")
print(f"Library utilization: {len(borrowed_books)}/{len(all_books)} books borrowed")`
    },
    {
      id: "ex3",
      question: "Create a student attendance tracking system:\n1. Create sets for different classes (Math, Science, English)\n2. Students can be in multiple classes\n3. Find students enrolled in all classes (intersection)\n4. Find students in Math but not Science (difference)\n5. Find all unique students across classes (union)\n6. Check attendance for specific students",
      solution: `# Student attendance system
math_students = {"Alice", "Bob", "Charlie", "Diana"}
science_students = {"Bob", "Charlie", "Eve", "Frank"}
english_students = {"Alice", "Charlie", "Eve", "Grace"}

print("Class enrollments:")
print(f"Math: {math_students}")
print(f"Science: {science_students}")
print(f"English: {english_students}")

# Students in all three classes
all_classes = math_students.intersection(science_students, english_students)
print(f"\nStudents in all classes: {all_classes}")

# Students in Math but not Science
math_only = math_students.difference(science_students)
print(f"Students in Math only: {math_only}")

# Students in Science but not Math
science_only = science_students.difference(math_students)
print(f"Students in Science only: {science_only}")

# Students taking exactly two classes
math_and_science = math_students.intersection(science_students) - all_classes
science_and_english = science_students.intersection(english_students) - all_classes
math_and_english = math_students.intersection(english_students) - all_classes

exactly_two = math_and_science.union(science_and_english, math_and_english)
print(f"Students in exactly two classes: {exactly_two}")

# All unique students
all_students = math_students.union(science_students, english_students)
print(f"\nTotal unique students: {all_students}")
print(f"Total enrollments across all classes: {len(math_students) + len(science_students) + len(english_students)}")

# Check specific student attendance
def check_student_classes(student):
    classes = []
    if student in math_students:
        classes.append("Math")
    if student in science_students:
        classes.append("Science")
    if student in english_students:
        classes.append("English")

    if classes:
        print(f"{student} is enrolled in: {', '.join(classes)}")
    else:
        print(f"{student} is not enrolled in any classes")

check_student_classes("Alice")
check_student_classes("Bob")
check_student_classes("Henry")  # Not enrolled`
    },
    {
      id: "ex4",
      question: "Write a program that analyzes text using sets:\n1. Get text input from user\n2. Create sets of unique words and characters\n3. Find common words between two texts\n4. Remove common English words (stop words)\n5. Calculate text statistics using set operations",
      solution: `# Text analysis using sets
def analyze_text(text, name):
    # Convert to lowercase and split into words
    words = text.lower().split()
    unique_words = set(words)

    # Get unique characters (excluding spaces)
    chars = set(text.lower().replace(" ", ""))

    print(f"\n{name} Analysis:")
    print(f"Total words: {len(words)}")
    print(f"Unique words: {len(unique_words)}")
    print(f"Unique characters: {len(chars)}")
    print(f"Most common words: {sorted(unique_words, key=lambda w: words.count(w), reverse=True)[:3]}")

    return unique_words, chars

# Get two texts from user
text1 = input("Enter first text: ")
text2 = input("Enter second text: ")

# Analyze both texts
words1, chars1 = analyze_text(text1, "Text 1")
words2, chars2 = analyze_text(text2, "Text 2")

# Find common words
common_words = words1.intersection(words2)
print(f"\nCommon words: {common_words}")

# Find unique words in each text
unique_to_text1 = words1 - words2
unique_to_text2 = words2 - words1
print(f"Words only in text 1: {unique_to_text1}")
print(f"Words only in text 2: {unique_to_text2}")

# Character analysis
common_chars = chars1.intersection(chars2)
chars_only_in_text1 = chars1 - chars2
chars_only_in_text2 = chars2 - chars1

print(f"\nCommon characters: {''.join(sorted(common_chars))}")
print(f"Characters only in text 1: {''.join(sorted(chars_only_in_text1))}")
print(f"Characters only in text 2: {''.join(sorted(chars_only_in_text2))}")

# Remove common stop words
stop_words = {"the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "of", "with", "by"}
meaningful_words1 = words1 - stop_words
meaningful_words2 = words2 - stop_words

print(f"\nAfter removing stop words:")
print(f"Text 1 meaningful words: {meaningful_words1}")
print(f"Text 2 meaningful words: {meaningful_words2}")
print(f"Common meaningful words: {meaningful_words1.intersection(meaningful_words2)}")`
    },
    {
      id: "ex5",
      question: "Create a music playlist management system:\n1. Create sets for different music genres\n2. Users can like songs from different genres\n3. Find songs liked by multiple users\n4. Recommend songs based on user preferences\n5. Analyze genre popularity using set operations\n6. Handle duplicate song additions safely",
      solution: `# Music playlist system using sets
# Define songs by genre
rock_songs = {"Bohemian Rhapsody", "Stairway to Heaven", "Hotel California", "Back in Black"}
pop_songs = {"Shape of You", "Uptown Funk", "Happy", "Can't Stop the Feeling"}
jazz_songs = {"Take Five", "So What", "Blue in Green", "My Favorite Things"}
classical_songs = {"Für Elise", "Moonlight Sonata", "The Four Seasons", "Symphony No. 5"}

# User preferences (what genres they like)
user1_genres = {"rock", "pop"}
user2_genres = {"pop", "jazz"}
user3_genres = {"classical", "jazz"}

# Function to get songs for user's preferred genres
def get_user_songs(user_genres):
    user_songs = set()
    genre_map = {
        "rock": rock_songs,
        "pop": pop_songs,
        "jazz": jazz_songs,
        "classical": classical_songs
    }

    for genre in user_genres:
        if genre in genre_map:
            user_songs.update(genre_map[genre])

    return user_songs

# Get songs for each user
user1_songs = get_user_songs(user1_genres)
user2_songs = get_user_songs(user2_genres)
user3_songs = get_user_songs(user3_genres)

print("User Song Preferences:")
print(f"User 1 ({user1_genres}): {user1_songs}")
print(f"User 2 ({user2_genres}): {user2_songs}")
print(f"User 3 ({user3_genres}): {user3_songs}")

# Find songs liked by multiple users
user1_and_user2 = user1_songs.intersection(user2_songs)
user2_and_user3 = user2_songs.intersection(user3_songs)
user1_and_user3 = user1_songs.intersection(user3_songs)

print(f"\nSongs liked by User 1 & 2: {user1_and_user2}")
print(f"Songs liked by User 2 & 3: {user2_and_user3}")
print(f"Songs liked by User 1 & 3: {user1_and_user3}")

# Songs liked by all three users
all_users = user1_songs.intersection(user2_songs, user3_songs)
print(f"Songs liked by all users: {all_users}")

# Songs liked by at least two users
liked_by_at_least_two = (user1_and_user2.union(user2_and_user3, user1_and_user3)) - all_users
print(f"Songs liked by exactly two users: {liked_by_at_least_two}")

# Unique songs per user
unique_to_user1 = user1_songs - user2_songs - user3_songs
unique_to_user2 = user2_songs - user1_songs - user3_songs
unique_to_user3 = user3_songs - user1_songs - user2_songs

print(f"\nUnique songs - User 1: {unique_to_user1}")
print(f"Unique songs - User 2: {unique_to_user2}")
print(f"Unique songs - User 3: {unique_to_user3}")

# Genre popularity analysis
all_liked_songs = user1_songs.union(user2_songs, user3_songs)
genre_popularity = {}

for song in all_liked_songs:
    for genre_name, genre_songs in [("rock", rock_songs), ("pop", pop_songs), ("jazz", jazz_songs), ("classical", classical_songs)]:
        if song in genre_songs:
            genre_popularity[genre_name] = genre_popularity.get(genre_name, 0) + 1

print(f"\nGenre popularity: {genre_popularity}")
most_popular_genre = max(genre_popularity, key=genre_popularity.get)
print(f"Most popular genre: {most_popular_genre}")`
    }
  ]
};
