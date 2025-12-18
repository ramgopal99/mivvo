import { SubLesson } from '../../../../data/lessonsData';

export const topic_18_1: SubLesson = {
  id: "18.1",
  title: 'Guess Number Game Project',
  status: 'demo',
  content: `# 🎯 Guess Number Game Project

This project demonstrates fundamental Python programming concepts through a complete guess number game. We'll explore functions, lists, random number generation, loops, conditionals, and user interaction.

---

## 🎮 Game Overview

The guess number game will:
- Generate a random number between 1 and 100
- Allow the player to guess with hints (too high/too low)
- Track the number of attempts
- Store game history
- Provide multiple rounds

---

## 🛠️ Building the Game Step by Step

### **Step 1: Basic Setup**
**Why we do this:** We start with imports and constants because it makes our code organized and easy to change. Constants at the top make it simple to modify game settings without hunting through the code.

\`\`\`python
import random  # We need random module to generate secret numbers

# Game configuration - easy to change these values
MIN_NUMBER = 1      # Smallest possible number
MAX_NUMBER = 100    # Largest possible number
MAX_ATTEMPTS = 10   # How many guesses before game over
\`\`\`

### **Step 2: Input Validation Function**
**Why we do this:** Players might enter wrong input (letters instead of numbers, or numbers outside our range). We use a function to keep asking until we get valid input. This prevents our game from crashing and provides helpful error messages.

\`\`\`python
def get_player_guess():
    while True:  # Keep asking until we get valid input
        try:
            # Try to convert text to number (this can fail!)
            guess = int(input(f"Guess a number between {MIN_NUMBER} and {MAX_NUMBER}: "))
            if MIN_NUMBER <= guess <= MAX_NUMBER:  # Check if guess is in valid range
                return guess  # Success! Return the valid number
            else:
                print(f"Please enter a number between {MIN_NUMBER} and {MAX_NUMBER}")
        except ValueError:  # This catches non-numeric input like "hello"
            print("Please enter a valid number!")
\`\`\`

### **Step 3: Game Round Logic**
**Why we do this:** This function contains the main game logic - checking guesses, giving hints, and tracking attempts. We use a loop that runs up to MAX_ATTEMPTS times. The function returns True/False so the main game knows if the player won or lost.

\`\`\`python
def play_round(target_number, attempts_list):
    attempts = 0  # Track how many guesses the player has made

    while attempts < MAX_ATTEMPTS:  # Give player multiple chances
        attempts += 1  # Count this guess
        guess = get_player_guess()  # Get validated input from player

        if guess == target_number:  # Player guessed correctly!
            print(f"🎉 Congratulations! You guessed it in {attempts} attempts!")
            attempts_list.append(attempts)  # Save score for statistics
            return True  # Player won
        elif guess < target_number:  # Guess is too small
            print("📈 Too low! Try a higher number.")
        else:  # Guess is too big
            print("📉 Too high! Try a lower number.")

    # If we get here, player used all attempts without guessing correctly
    print(f"😞 Sorry! The number was {target_number}. Better luck next time!")
    attempts_list.append(MAX_ATTEMPTS + 1)  # Mark as failure in statistics
    return False  # Player lost
\`\`\`

### **Step 4: Statistics Function**
**Why we do this:** Players want to know how they're doing! We track all games played and calculate statistics like average attempts and best scores. The function separates successful games from failed ones using list comprehensions.

\`\`\`python
def display_statistics(game_history):
    if not game_history:  # Check if list is empty (no games played)
        print("No games played yet!")
        return

    print("\\n📊 Game Statistics:")
    print(f"Total games played: {len(game_history)}")

    # Filter out only the successful games (attempts <= MAX_ATTEMPTS)
    successful_games = [attempts for attempts in game_history if attempts <= MAX_ATTEMPTS]
    if successful_games:  # Only show stats if there were wins
        avg_attempts = sum(successful_games) / len(successful_games)
        print(f"Successful games: {len(successful_games)}")
        print(f"Average attempts for successful games: {avg_attempts:.1f}")
        print(f"Best score: {min(successful_games)} attempts")

    # Calculate failed games by subtracting successful from total
    failed_games = len(game_history) - len(successful_games)
    print(f"Failed games: {failed_games}")
\`\`\`

### **Step 5: Main Game Function**
**Why we do this:** This is the "conductor" function that orchestrates everything. It welcomes the player, manages the game loop (allowing multiple games), generates random numbers for each round, and shows final statistics. The \`if __name__ == "__main__"\` pattern allows the file to be both imported as a module and run directly.

\`\`\`python
def main():
    game_history = []  # Store results from all games played
    games_played = 0   # Count total games

    # Welcome message and instructions
    print("🎯 Welcome to the Guess Number Game!")
    print(f"I'm thinking of a number between {MIN_NUMBER} and {MAX_NUMBER}")
    print(f"You have {MAX_ATTEMPTS} attempts to guess it.\\n")

    while True:  # Game loop - keeps running until player quits
        games_played += 1
        print(f"\\n--- Game {games_played} ---")

        # Generate secret number for this round
        target_number = random.randint(MIN_NUMBER, MAX_NUMBER)
        # Play one round and save result in history
        play_round(target_number, game_history)

        # Ask if player wants to continue
        response = input("\\nWould you like to play again? (yes/no): ").lower()
        if response not in ['yes', 'y']:  # Accept 'y' or 'yes'
            break  # Exit the game loop

    # Game over - show final statistics
    print("\\n🎮 Thanks for playing!")
    display_statistics(game_history)

# This runs main() only when file is executed directly (not imported)
if __name__ == "__main__":
    main()
\`\`\`

---

## 📝 Complete Game Code

\`\`\`python
import random

# Game configuration constants
MIN_NUMBER = 1      # Minimum number in the range
MAX_NUMBER = 100    # Maximum number in the range
MAX_ATTEMPTS = 10   # Maximum attempts allowed per game

# Function to get a valid guess from the player
def get_player_guess():
    while True:  # Loop until we get a valid input
        try:     # Try to convert input to integer
            guess = int(input(f"Guess a number between {MIN_NUMBER} and {MAX_NUMBER}: "))
            if MIN_NUMBER <= guess <= MAX_NUMBER:  # Check if guess is in valid range
                return guess  # Return the valid guess
            else:
                print(f"Please enter a number between {MIN_NUMBER} and {MAX_NUMBER}")
        except ValueError:  # Handle non-numeric input
            print("Please enter a valid number!")

# Function to play one round of the game
def play_round(target_number, attempts_list):
    attempts = 0  # Initialize attempts counter

    while attempts < MAX_ATTEMPTS:  # Continue while attempts remain
        attempts += 1  # Increment attempts counter
        guess = get_player_guess()  # Get player's guess

        if guess == target_number:  # Check if guess is correct
            print(f"🎉 Congratulations! You guessed it in {attempts} attempts!")
            attempts_list.append(attempts)  # Add attempts to history
            return True  # Return success
        elif guess < target_number:  # Guess is too low
            print("📈 Too low! Try a higher number.")
        else:  # Guess is too high
            print("📉 Too high! Try a lower number.")

    # If we reach here, player ran out of attempts
    print(f"😞 Sorry! The number was {target_number}. Better luck next time!")
    attempts_list.append(MAX_ATTEMPTS + 1)  # Record failure in history
    return False  # Return failure

# Function to display game statistics
def display_statistics(game_history):
    if not game_history:  # Check if list is empty
        print("No games played yet!")
        return

    print("\\n📊 Game Statistics:")
    print(f"Total games played: {len(game_history)}")

    successful_games = [attempts for attempts in game_history if attempts <= MAX_ATTEMPTS]
    if successful_games:  # Only calculate stats if there are successful games
        avg_attempts = sum(successful_games) / len(successful_games)
        print(f"Successful games: {len(successful_games)}")
        print(f"Average attempts for successful games: {avg_attempts:.1f}")
        print(f"Best score: {min(successful_games)} attempts")

    failed_games = len(game_history) - len(successful_games)
    print(f"Failed games: {failed_games}")

# Main game function
def main():
    game_history = []  # List to store attempts for each game
    games_played = 0   # Counter for total games

    print("🎯 Welcome to the Guess Number Game!")
    print(f"I'm thinking of a number between {MIN_NUMBER} and {MAX_NUMBER}")
    print(f"You have {MAX_ATTEMPTS} attempts to guess it.\\n")

    while True:  # Main game loop
        games_played += 1
        print(f"\\n--- Game {games_played} ---")

        # Generate random target number
        target_number = random.randint(MIN_NUMBER, MAX_NUMBER)

        # Play one round and check if player won
        won = play_round(target_number, game_history)

        # Ask if player wants to play again
        response = input("\\nWould you like to play again? (yes/no): ").lower()
        if response not in ['yes', 'y']:
            break  # Exit the game loop

    # Display final statistics
    print("\\n🎮 Thanks for playing!")
    display_statistics(game_history)

# Start the game when script is run directly
if __name__ == "__main__":
    main()
\`\`\`

---

## 🎯 Key Programming Concepts Demonstrated

### **Functions**
- Modular code organization
- Parameter passing and return values
- Function reusability

### **Lists**
- Storing game history (\`game_history = []\`)
- List comprehensions for filtering data
- List methods (\`append()\`, \`len()\`)

### **Random Module**
- \`random.randint()\` for number generation
- Importing and using external modules

### **Control Structures**
- \`while\` loops for input validation and game flow
- \`if/elif/else\` for decision making
- \`try/except\` for error handling

### **Input/Output**
- \`input()\` for user interaction
- \`print()\` with f-strings for formatted output
- String formatting and concatenation

---

## 🚀 How to Run the Game

1. Save the code to a file named \`guess_number_game.py\`
2. Open a terminal/command prompt
3. Navigate to the file location
4. Run: \`python guess_number_game.py\`
5. Follow the on-screen instructions

---

## 🎮 Sample Game Output

\`\`\`
🎯 Welcome to the Guess Number Game!
I'm thinking of a number between 1 and 100
You have 10 attempts to guess it.

--- Game 1 ---
Guess a number between 1 and 100: 50
📈 Too low! Try a higher number.
Guess a number between 1 and 100: 75
📉 Too high! Try a lower number.
Guess a number between 1 and 100: 62
🎉 Congratulations! You guessed it in 3 attempts!

Would you like to play again? (yes/no): yes

--- Game 2 ---
...
\`\`\`

**This project provides a solid foundation in Python programming while creating an engaging, interactive game! 🎯**`
};

