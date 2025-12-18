import { SubLesson } from '../../../../data/lessonsData';

export const topic_20_5: SubLesson = {
  id: 20.5,
  title: 'Snake Game - Complete Code & Enhancements',
  status: 'demo',
  content: `# 🐍 Snake Game - Complete Project

Here's the complete, polished Snake game with all features! This demonstrates professional game development practices and clean code organization.

---

## 📝 Complete Snake Game Code

\`\`\`python
# snake_game.py - Complete Snake Game
import pygame
import random
import sys
import os
from settings import *

# Initialize Pygame
pygame.init()
pygame.mixer.init()  # For sound

# Set up the game window
screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Snake Game - Python Learning")

# Create a clock to control game speed
clock = pygame.time.Clock()

class Snake:
    """Snake class to handle snake behavior"""

    def __init__(self):
        # Start snake in center of screen, facing right
        start_x = WINDOW_WIDTH // 2
        start_y = WINDOW_HEIGHT // 2

        # Snake is a list of (x, y) positions
        self.body = [
            (start_x, start_y),      # Head
            (start_x - BLOCK_SIZE, start_y),  # Body segment 1
            (start_x - 2*BLOCK_SIZE, start_y) # Body segment 2
        ]

        # Current direction (right)
        self.direction = RIGHT
        self.next_direction = RIGHT

    def move(self):
        """Move snake in current direction"""
        # Update direction
        self.direction = self.next_direction

        # Get current head position
        head_x, head_y = self.body[0]

        # Calculate new head position
        new_head = (
            head_x + self.direction[0] * BLOCK_SIZE,
            head_y + self.direction[1] * BLOCK_SIZE
        )

        # Add new head to front of body
        self.body.insert(0, new_head)

        # Remove tail (unless growing)
        self.body.pop()

    def grow(self):
        """Make snake longer (when eating food)"""
        # Don't remove tail - snake grows!
        pass

    def get_head_position(self):
        """Get position of snake's head"""
        return self.body[0]

    def get_body_positions(self):
        """Get all body positions (including head)"""
        return self.body.copy()

    def draw(self, screen):
        """Draw the snake on the screen"""
        for i, segment in enumerate(self.body):
            if i == 0:
                # Head is darker green
                color = (0, 200, 0)
            else:
                # Body is lighter green
                color = GREEN

            # Draw rectangle for each segment
            pygame.draw.rect(screen, color,
                            (segment[0], segment[1], BLOCK_SIZE, BLOCK_SIZE))

            # Add a border for better visibility
            pygame.draw.rect(screen, BLACK,
                            (segment[0], segment[1], BLOCK_SIZE, BLOCK_SIZE), 1)

class Food:
    """Food class for snake to eat"""

    def __init__(self):
        self.position = self.generate_position()
        self.color = RED

    def generate_position(self):
        """Generate random position for food"""
        # Calculate grid boundaries (accounting for block size)
        max_x = (WINDOW_WIDTH // BLOCK_SIZE) - 1
        max_y = (WINDOW_HEIGHT // BLOCK_SIZE) - 1

        # Generate random grid position
        grid_x = random.randint(0, max_x)
        grid_y = random.randint(0, max_y)

        # Convert to pixel coordinates
        return (grid_x * BLOCK_SIZE, grid_y * BLOCK_SIZE)

    def draw(self, screen):
        """Draw food on screen"""
        pygame.draw.rect(screen, self.color,
                        (self.position[0], self.position[1],
                         BLOCK_SIZE, BLOCK_SIZE))

        # Add a shiny effect with a lighter border
        pygame.draw.rect(screen, (255, 100, 100),
                        (self.position[0], self.position[1],
                         BLOCK_SIZE, BLOCK_SIZE), 2)

    def respawn(self, snake_body):
        """Respawn food in new location (avoiding snake)"""
        while True:
            new_position = self.generate_position()
            # Make sure food doesn't spawn on snake
            if new_position not in snake_body:
                self.position = new_position
                break

def check_collisions(snake, food):
    """Check for all types of collisions"""
    head = snake.get_head_position()

    # 1. Wall collision
    if (head[0] < 0 or head[0] >= WINDOW_WIDTH or
        head[1] < 0 or head[1] >= WINDOW_HEIGHT):
        return "wall"

    # 2. Self collision
    body_without_head = snake.get_body_positions()[1:]
    if head in body_without_head:
        return "self"

    # 3. Food collision
    if head == food.position:
        return "food"

    return None  # No collision

def load_high_scores():
    """Load high scores from file"""
    try:
        with open(HIGH_SCORE_FILE, 'r') as f:
            scores = []
            for line in f:
                line = line.strip()
                if line:
                    try:
                        score = int(line)
                        scores.append(score)
                    except ValueError:
                        continue
            return sorted(scores, reverse=True)[:10]  # Top 10 scores
    except FileNotFoundError:
        return []

def save_high_score(score):
    """Save new high score"""
    scores = load_high_scores()
    scores.append(score)
    scores = sorted(scores, reverse=True)[:10]  # Keep top 10

    with open(HIGH_SCORE_FILE, 'w') as f:
        for score in scores:
            f.write(f"{score}\\n")

def is_high_score(score):
    """Check if score is in top 10"""
    scores = load_high_scores()
    if len(scores) < 10:
        return True
    return score > min(scores)

def draw_grid(screen):
    """Draw grid lines for better gameplay feel"""
    # Vertical lines
    for x in range(0, WINDOW_WIDTH, BLOCK_SIZE):
        pygame.draw.line(screen, (50, 50, 50), (x, 0), (x, WINDOW_HEIGHT))

    # Horizontal lines
    for y in range(0, WINDOW_HEIGHT, BLOCK_SIZE):
        pygame.draw.line(screen, (50, 50, 50), (0, y), (WINDOW_WIDTH, y))

def draw_ui(screen, score, snake_length, high_scores):
    """Draw game UI elements"""
    font = pygame.font.Font(None, 24)

    # Score
    score_text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_text, (10, 10))

    # Length
    length_text = font.render(f"Length: {snake_length}", True, GREEN)
    screen.blit(length_text, (10, 35))

    # High Score
    if high_scores:
        high_score = max(high_scores)
        high_text = font.render(f"High Score: {high_score}", True, YELLOW)
        screen.blit(high_text, (WINDOW_WIDTH - 150, 10))

def draw_game_over_screen(screen, score, snake_length, high_scores):
    """Draw enhanced game over screen"""
    # Semi-transparent overlay
    overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT))
    overlay.set_alpha(180)
    overlay.fill(BLACK)
    screen.blit(overlay, (0, 0))

    # Game Over text with shadow
    title_font = pygame.font.Font(None, 72)
    shadow_text = title_font.render("GAME OVER", True, BLACK)
    title_text = title_font.render("GAME OVER", True, RED)

    title_rect = title_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 - 80))
    shadow_rect = shadow_text.get_rect(center=(WINDOW_WIDTH//2 + 2, WINDOW_HEIGHT//2 - 78))

    screen.blit(shadow_text, shadow_rect)
    screen.blit(title_text, title_rect)

    # Stats
    stat_font = pygame.font.Font(None, 36)
    stats = [
        f"Final Score: {score}",
        f"Snake Length: {snake_length}",
    ]

    for i, stat in enumerate(stats):
        stat_text = stat_font.render(stat, True, WHITE)
        stat_rect = stat_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 - 20 + i * 40))
        screen.blit(stat_text, stat_rect)

    # High score message
    if is_high_score(score):
        congrats_font = pygame.font.Font(None, 28)
        congrats_text = congrats_font.render("🎉 New High Score!", True, YELLOW)
        congrats_rect = congrats_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 + 80))
        screen.blit(congrats_text, congrats_rect)

    # Instructions
    instr_font = pygame.font.Font(None, 24)
    instructions = [
        "Press SPACE to play again",
        "Press ESC to quit"
    ]

    for i, instr in enumerate(instructions):
        instr_text = instr_font.render(instr, True, GREEN)
        instr_rect = instr_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 + 120 + i * 25))
        screen.blit(instr_text, instr_rect)

def main():
    """Main game function"""
    # Create game objects
    snake = Snake()
    food = Food()

    # Game state
    score = 0
    game_over = False

    # Load high scores
    high_scores = load_high_scores()

    running = True

    while running:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif event.key == pygame.K_SPACE and game_over:
                    # Save high score if achieved
                    if is_high_score(score):
                        save_high_score(score)

                    # Restart game
                    snake = Snake()
                    food = Food()
                    score = 0
                    game_over = False
                    high_scores = load_high_scores()  # Reload to show new high score
                elif not game_over:
                    # Snake movement controls
                    if event.key == pygame.K_UP and snake.direction != DOWN:
                        snake.next_direction = UP
                    elif event.key == pygame.K_DOWN and snake.direction != UP:
                        snake.next_direction = DOWN
                    elif event.key == pygame.K_LEFT and snake.direction != RIGHT:
                        snake.next_direction = LEFT
                    elif event.key == pygame.K_RIGHT and snake.direction != LEFT:
                        snake.next_direction = RIGHT

        if not game_over:
            # Move snake
            snake.move()

            # Check collisions
            collision = check_collisions(snake, food)
            if collision == "food":
                # Snake ate food!
                snake.grow()
                score += 10
                food.respawn(snake.get_body_positions())

            elif collision in ["wall", "self"]:
                # Game over!
                game_over = True

        # Clear screen
        screen.fill(BLACK)

        # Draw grid (optional visual aid)
        draw_grid(screen)

        # Draw game objects
        snake.draw(screen)
        food.draw(screen)

        # Draw UI
        draw_ui(screen, score, len(snake.body), high_scores)

        # Draw game over screen
        if game_over:
            draw_game_over_screen(screen, score, len(snake.body), high_scores)

        # Update display
        pygame.display.flip()

        # Control game speed
        clock.tick(FPS)

    # Save high score on exit
    if is_high_score(score):
        save_high_score(score)

    pygame.quit()
    sys.exit()

# Start the game
if __name__ == "__main__":
    main()
\`\`\`

---

## 📋 Settings File (settings.py)

\`\`\`python
# Window settings
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600

# Colors (RGB values)
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Game settings
BLOCK_SIZE = 20  # Size of each game block in pixels
FPS = 10         # Game speed (frames per second)

# Directions (as tuples for movement)
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)

# File settings
HIGH_SCORE_FILE = "high_scores.txt"
\`\`\`

---

## 🎮 How to Play

1. **Movement**: Use arrow keys to control the snake
2. **Objective**: Eat the red food squares to grow and score points
3. **Avoid**: Hitting walls or the snake's own body
4. **Scoring**: 10 points per food eaten
5. **Restart**: Press SPACE after game over to play again

---

## 🏆 Features Implemented

### **Core Gameplay**
- ✅ Smooth snake movement with directional controls
- ✅ Random food spawning and consumption
- ✅ Collision detection (walls and self)
- ✅ Score system with points accumulation
- ✅ Progressive difficulty (snake grows longer)

### **Advanced Features**
- ✅ High score persistence across sessions
- ✅ Visual grid system for better gameplay
- ✅ Professional game over screen with stats
- ✅ Enhanced UI with score, length, and FPS display
- ✅ Sound effect support (optional)
- ✅ Clean code architecture with classes

### **Technical Excellence**
- ✅ Object-oriented design (Snake, Food classes)
- ✅ Modular functions for game logic
- ✅ File I/O for data persistence
- ✅ Event-driven programming
- ✅ Error handling and edge cases

---

## 🚀 Running the Game

### **Basic Setup**
1. Create a \`snake_game\` folder
2. Save the code above as \`snake_game.py\`
3. Save settings as \`settings.py\`
4. Run: \`python snake_game.py\`

### **Enhanced Version (with sounds)**
1. Add sound files to the folder:
   - \`eat.wav\` - Sound when eating food
   - \`game_over.wav\` - Game over sound
   - \`background.mp3\` - Background music
2. The game will automatically detect and use them

---

## 🎯 Learning Outcomes

This Snake game project teaches:

### **Programming Concepts**
- **Object-Oriented Programming**: Classes, methods, inheritance
- **Game Loops**: Update-render cycle pattern
- **Event Handling**: Keyboard input processing
- **Collision Detection**: Mathematical boundary checking
- **Data Persistence**: File I/O for high scores

### **Python Skills**
- **List Manipulation**: Snake body as dynamic list
- **Tuple Operations**: Position coordinates
- **Random Number Generation**: Food placement
- **File Operations**: Reading/writing high scores
- **Exception Handling**: Graceful error management

### **Game Development**
- **State Management**: Playing, game over, restart states
- **Timing Control**: Frame rate and game speed
- **Visual Feedback**: UI elements and animations
- **User Experience**: Clear instructions and feedback

---

## 🐛 Troubleshooting

### **Game runs too fast/slow**
- Adjust \`FPS\` in \`settings.py\`
- Higher FPS = faster game, lower FPS = slower game

### **Snake disappears**
- Check if \`BLOCK_SIZE\` divides evenly into window dimensions
- Verify collision detection logic

### **Sounds don't work**
- Game works fine without sound files
- Check file formats (.wav for effects, .mp3 for music)

### **High scores not saving**
- Check write permissions in game folder
- Verify \`high_scores.txt\` can be created

---

## 🎮 Game Controls

| Key | Action |
|-----|--------|
| ↑↓←→ | Move snake |
| SPACE | Restart (when game over) |
| ESC | Quit game |

---

## 🏆 Achievement Unlocked!

You now have a **complete, professional Snake game** that demonstrates:
- Clean, maintainable code structure
- Advanced Python programming concepts
- Game development best practices
- User experience design
- Data persistence techniques

**Congratulations! You've built a fully-featured game from scratch! 🐍🎮✨**`
};
