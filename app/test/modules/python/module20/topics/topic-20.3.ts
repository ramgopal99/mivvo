import { SubLesson } from '../../../../data/lessonsData';

export const topic_20_3: SubLesson = {
  id: "20.3",
  title: 'Snake Game - Food and Collision Detection',
  status: 'demo',
  content: `# 🍎 Snake Game Project - Part 3: Food & Collision

Let's add food spawning, collision detection, and scoring! This is where the game becomes interactive and challenging.

---

## 🛠️ Part 3: Food Generation and Collision

### **Step 1: Food Class**

\`\`\`python
# Add after Snake class
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
\`\`\`

### **Step 2: Collision Detection System**

\`\`\`python
# Add to snake_game.py (after Food class)
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
\`\`\`

### **Step 3: Game State Management**

\`\`\`python
# Update main() function
def main():
    """Main game function"""
    # Create game objects
    snake = Snake()
    food = Food()

    # Game state
    score = 0
    game_over = False

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
                    # Restart game on spacebar when game over
                    snake = Snake()
                    food = Food()
                    score = 0
                    game_over = False
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
            elif collision == "wall" or collision == "self":
                # Game over!
                game_over = True

        # Clear screen
        screen.fill(BLACK)

        # Draw game objects
        snake.draw(screen)
        food.draw(screen)

        # Draw UI
        font = pygame.font.Font(None, 36)

        # Score display
        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        # Length display
        length_text = font.render(f"Length: {len(snake.body)}", True, GREEN)
        screen.blit(length_text, (10, 40))

        # Game over screen
        if game_over:
            # Semi-transparent overlay
            overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT))
            overlay.set_alpha(128)
            overlay.fill(BLACK)
            screen.blit(overlay, (0, 0))

            # Game over text
            game_over_font = pygame.font.Font(None, 72)
            game_over_text = game_over_font.render("GAME OVER", True, RED)
            score_text = font.render(f"Final Score: {score}", True, WHITE)
            restart_text = font.render("Press SPACE to restart", True, GREEN)

            # Center the text
            game_over_rect = game_over_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 - 50))
            score_rect = score_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2))
            restart_rect = restart_text.get_rect(center=(WINDOW_WIDTH//2, WINDOW_HEIGHT//2 + 50))

            screen.blit(game_over_text, game_over_rect)
            screen.blit(score_text, score_rect)
            screen.blit(restart_text, restart_rect)

        # Update display
        pygame.display.flip()

        # Control game speed
        clock.tick(FPS)

    pygame.quit()
    sys.exit()
\`\`\`

---

## 🎯 Understanding Food & Collision

### **Food Generation Logic**
- **Grid-based positioning**: Food spawns on block boundaries
- **Snake avoidance**: Food never spawns on snake body
- **Random placement**: Uses \`random.randint()\` for positions

### **Collision Detection Types**

#### **Wall Collision**
\`\`\`python
if head[0] < 0 or head[0] >= WINDOW_WIDTH:
    return "wall"  # Hit left/right wall

if head[1] < 0 or head[1] >= WINDOW_HEIGHT:
    return "wall"  # Hit top/bottom wall
\`\`\`

#### **Self Collision**
\`\`\`python
body_without_head = snake.body[1:]  # All segments except head
if head in body_without_head:
    return "self"  # Snake hit itself!
\`\`\`

#### **Food Collision**
\`\`\`python
if head == food.position:
    return "food"  # Snake ate the food!
\`\`\`

### **Game State Management**
- **Score tracking**: +10 points per food eaten
- **Game over state**: Pause game when collision occurs
- **Restart functionality**: SPACE key resets everything

### **Visual Effects**
- **Food appearance**: Red square with light border
- **Game over overlay**: Semi-transparent black background
- **UI elements**: Score, length, restart instructions

---

## 🎮 Testing Food & Collision

Now you should have a fully playable Snake game:
- ✅ **Food spawns** randomly on screen
- ✅ **Snake grows** when eating food
- ✅ **Score increases** with each food eaten
- ✅ **Game ends** on wall or self collision
- ✅ **Restart works** with SPACE key
- ✅ **Visual feedback** for game over

---

## 🔧 Advanced Features Added

### **Boundary Checking**
- Snake can't move outside window bounds
- Clean game over when hitting walls

### **Dynamic Food Respawning**
- Food appears in safe locations only
- Avoids spawning on snake body

### **Game State Transitions**
- **Playing** → **Game Over** → **Restart**
- Clear state management for each phase

### **User Experience**
- Clear instructions during game over
- Score and length tracking
- Visual game over screen

---

## 🐛 Debugging Tips

### **Food Not Appearing**
- Check if \`BLOCK_SIZE\` divides evenly into window dimensions
- Verify food position calculation logic

### **Collision Not Working**
- Print snake head position and compare with food/walls
- Check coordinate systems (pixels vs grid positions)

### **Game Over Not Triggering**
- Add debug prints to collision detection function
- Verify snake body positions are updating correctly

**Next: Adding high scores and sound effects! 🏆**

**Excellent! You now have a complete, playable Snake game! 🎮**`
};

