import { SubLesson } from '../../../../data/lessonsData';

export const topic_20_4: SubLesson = {
  id: "20.4",
  title: 'Snake Game - Scoring and Advanced Features',
  status: 'demo',
  content: "`# ðŸ† Snake Game Project - Part 4: Scoring & Polish

Let's add high scores, sound effects, better visuals, and polish to make our Snake game feel professional!

---

## ðŸ› ï¸ Part 4: Advanced Features

### **Step 1: High Score System**

\`"\`\`python
# Add to settings.py
HIGH_SCORE_FILE = "high_scores.txt"
\`\`\`

\`\`\`python
# Add to snake_game.py (after imports)
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
\`\`\`

### **Step 2: Sound Effects (Optional)**

\`\`\`python
# Add to snake_game.py (after pygame.init())
try:
    # Initialize mixer for sound
    pygame.mixer.init()

    # Load sound effects (create these .wav files or comment out)
    eat_sound = pygame.mixer.Sound('eat.wav')  # When eating food
    game_over_sound = pygame.mixer.Sound('game_over.wav')  # When game ends
    pygame.mixer.music.load('background.mp3')  # Background music
    pygame.mixer.music.play(-1)  # Loop background music

    SOUND_ENABLED = True
except:
    # Sounds not available
    SOUND_ENABLED = False
    eat_sound = None
    game_over_sound = None
\`\`\`

### **Step 3: Enhanced UI and Animations**

\`\`\`python
# Add to main() function
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

    # FPS Counter (for debugging)
    fps = clock.get_fps()
    fps_text = font.render(f"FPS: {fps:.1f}", True, BLUE)
    screen.blit(fps_text, (WINDOW_WIDTH - 100, 35))
\`\`\`

### **Step 4: Improved Game Over Screen**

\`\`\`python
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
        congrats_text = congrats_font.render("ðŸŽ‰ New High Score!", True, YELLOW)
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
\`\`\`

### **Step 5: Enhanced Main Game Loop**

\`\`\`python
# Update main() function with all enhancements
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

                # Play eat sound
                if SOUND_ENABLED and eat_sound:
                    eat_sound.play()

            elif collision in ["wall", "self"]:
                # Game over!
                game_over = True

                # Play game over sound
                if SOUND_ENABLED and game_over_sound:
                    game_over_sound.play()

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
\`\`\`

---

## ðŸŽ¯ Advanced Features Added

### **Persistent High Scores**
- **File storage**: Scores saved between game sessions
- **Top 10 tracking**: Only best scores kept
- **Automatic saving**: High scores saved on game over

### **Audio System**
- **Sound effects**: Eat food and game over sounds
- **Background music**: Continuous gameplay music
- **Graceful fallback**: Game works without sound files

### **Visual Polish**
- **Grid system**: Optional background grid for gameplay
- **Enhanced UI**: FPS counter, high score display
- **Better typography**: Shadows and multiple font sizes

### **Improved UX**
- **High score celebration**: Special message for new records
- **Detailed stats**: Final score and snake length display
- **Clear instructions**: Multiple restart options

---

## ðŸŽ® Complete Game Features

Your Snake game now includes:
- âœ… **Smooth snake movement** with arrow key controls
- âœ… **Random food spawning** with collision detection
- âœ… **Score system** with points for eating food
- âœ… **Game over detection** (walls and self-collision)
- âœ… **High score persistence** across game sessions
- âœ… **Sound effects** and background music (optional)
- âœ… **Visual grid** and enhanced UI
- âœ… **Restart functionality** with SPACE key
- âœ… **Professional game over screen**

---

## ðŸ“ File Structure

\`\`\`
snake_game/
â”œâ”€â”€ snake_game.py      # Main game file (all code above)
â”œâ”€â”€ settings.py        # Game constants
â”œâ”€â”€ high_scores.txt    # Auto-generated high scores
â”œâ”€â”€ eat.wav           # Sound effect (optional)
â”œâ”€â”€ game_over.wav     # Sound effect (optional)
â””â”€â”€ background.mp3    # Background music (optional)
\`\`\`

---

## ðŸš€ Running the Complete Game

1. Create the \`snake_game\` folder
2. Create \`settings.py\` with all constants
3. Create \`snake_game.py\` with the complete code
4. **Optional**: Add sound files for full experience
5. Run: \`python snake_game.py\`

---

## ðŸ† Game Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Snake Movement | âœ… | Smooth directional controls |
| Food System | âœ… | Random spawning with growth |
| Collision Detection | âœ… | Walls and self-collision |
| Scoring | âœ… | Points for eating food |
| High Scores | âœ… | Persistent top 10 scores |
| Sound Effects | âœ… | Audio feedback (optional) |
| Visual Polish | âœ… | Grid, UI, animations |
| Game States | âœ… | Menu, playing, game over |

**Congratulations! You now have a complete, professional-quality Snake game! ðŸðŸŽ®**`
};


