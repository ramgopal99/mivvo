import { SubLesson } from '../../../../data/lessonsData';

export const topic_20_1: SubLesson = {
  id: "20.1",
  title: 'Snake Game - Basic Setup and Window',
  status: 'demo',
  content: `# 🐍 Snake Game Project - Part 1: Basic Setup

Welcome to building the classic Snake game! This multi-part project will teach you game development concepts including game loops, collision detection, user input, and scoring systems.

---

## 🎯 What We'll Build

A complete Snake game featuring:
- **Snake movement** with arrow key controls
- **Food spawning** and collection
- **Collision detection** (walls and self)
- **Score tracking** and high scores
- **Game over** and restart functionality
- **Smooth animations** and sound effects

---

## 📁 Project Structure

\`\`\`
snake_game/
├── snake_game.py    # Main game file
├── settings.py      # Game constants and settings
├── assets/          # Images, sounds, fonts
└── high_scores.txt  # Save file for high scores
\`\`\`

---

## 🛠️ Part 1: Basic Setup and Window

### **Step 1: Import Libraries**

\`\`\`python
# snake_game.py
import pygame
import random
import sys
from settings import *

# Initialize Pygame
pygame.init()

# Set up the game window
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Snake Game - Python Learning")

# Create a clock to control game speed
clock = pygame.time.Clock()
\`\`\`

### **Step 2: Game Settings**

\`\`\`python
# settings.py

# Window settings
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

# Colors (RGB values)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Game settings
BLOCK_SIZE = 20  # Size of each game block in pixels
FPS = 10         # Game speed (frames per second)

# Directions (as tuples for movement)
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)
\`\`\`

### **Step 3: Basic Game Loop**

\`\`\`python
def main():
    """Main game function"""
    running = True

    while running:
        # Handle events (keyboard, mouse, etc.)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False

        # Clear the screen with black
        screen.fill(BLACK)

        # Draw a simple welcome message (temporary)
        font = pygame.font.Font(None, 48)
        text = font.render("Snake Game", True, GREEN)
        text_rect = text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2))
        screen.blit(text, text_rect)

        # Update the display
        pygame.display.flip()

        # Control game speed
        clock.tick(FPS)

    # Quit Pygame
    pygame.quit()
    sys.exit()

# Start the game
if __name__ == "__main__":
    main()
\`\`\`

---

## 🎯 Understanding the Code

### **Pygame Initialization**
- \`pygame.init()\` - Starts up all Pygame modules
- \`pygame.display.set_mode()\` - Creates the game window
- \`pygame.display.set_caption()\` - Sets the window title

### **Game Loop Structure**
Every game needs a main loop that:
1. **Handles input** - Keyboard, mouse, system events
2. **Updates game state** - Move objects, check collisions
3. **Draws graphics** - Render everything to the screen
4. **Controls timing** - Maintain consistent frame rate

### **Event Handling**
- \`pygame.event.get()\` - Gets all pending events
- \`pygame.QUIT\` - User clicked the X button
- \`pygame.KEYDOWN\` - User pressed a key

### **Drawing Basics**
- \`screen.fill(color)\` - Fill screen with solid color
- \`pygame.font.Font()\` - Create text font
- \`font.render()\` - Create text surface
- \`screen.blit()\` - Draw surface to screen

---

## 🚀 Running the Game

1. Create a \`snake_game\` folder
2. Create \`settings.py\` with the constants above
3. Create \`snake_game.py\` with the code above
4. Run: \`python snake_game.py\`

You should see a black window with "Snake Game" text in the center!

---

## 🎮 What We Have So Far

- ✅ **Game window** opens and displays properly
- ✅ **Basic event handling** (can quit with ESC or X)
- ✅ **Game loop** running at controlled speed
- ✅ **Clean shutdown** when game ends

**Next: Adding the snake and movement controls! 🐍**

**This establishes the foundation for our Snake game! 🎯**`
};

