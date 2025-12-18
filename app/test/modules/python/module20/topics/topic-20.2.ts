import { SubLesson } from '../../../data/lessonsData';

export const topic_20_2: SubLesson = {
  id: 20.2,
  title: 'Snake Game - Snake Movement and Controls',
  status: 'demo',
  content: `# 🐍 Snake Game Project - Part 2: Snake Movement

Now let's add the snake! We'll create the snake data structure, implement movement controls, and handle keyboard input for direction changes.

---

## 🛠️ Part 2: Snake Movement and Controls

### **Step 1: Snake Data Structure**

\`\`\`python
# Add to snake_game.py (after imports)
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

        # Next direction (for smooth turns)
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
\`\`\`

### **Step 2: Drawing the Snake**

\`\`\`python
# Add to Snake class
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
\`\`\`

### **Step 3: Keyboard Controls**

\`\`\`python
# Add to main() function, replace the event handling section
def main():
    """Main game function"""
    # Create snake object
    snake = Snake()

    running = True

    while running:
        # Handle events
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                # Arrow key controls
                elif event.key == pygame.K_UP and snake.direction != DOWN:
                    snake.next_direction = UP
                elif event.key == pygame.K_DOWN and snake.direction != UP:
                    snake.next_direction = DOWN
                elif event.key == pygame.K_LEFT and snake.direction != RIGHT:
                    snake.next_direction = LEFT
                elif event.key == pygame.K_RIGHT and snake.direction != LEFT:
                    snake.next_direction = RIGHT

        # Move snake
        snake.move()

        # Clear screen
        screen.fill(BLACK)

        # Draw snake
        snake.draw(screen)

        # Draw temporary instructions
        font = pygame.font.Font(None, 24)
        instructions = [
            "Use arrow keys to move",
            "ESC to quit",
            f"Snake length: {len(snake.body)}"
        ]

        for i, text in enumerate(instructions):
            color = WHITE if i < 2 else GREEN
            text_surface = font.render(text, True, color)
            screen.blit(text_surface, (10, 10 + i * 25))

        # Update display
        pygame.display.flip()

        # Control game speed
        clock.tick(FPS)

    pygame.quit()
    sys.exit()
\`\`\`

---

## 🎯 Understanding Snake Movement

### **Snake Data Structure**
- **List of tuples**: \`[(x1,y1), (x2,y2), (x3,y3)]\`
- **Index 0**: Head position
- **Rest**: Body segments following the head

### **Movement Logic**
1. **Calculate new head position** based on current direction
2. **Insert new head** at front of body list
3. **Remove tail** (unless growing from food)
4. **Direction changes** are queued to prevent instant reversals

### **Direction Prevention**
- **Can't reverse directly**: If moving right, can't immediately go left
- **Prevents self-collision**: Snake can't turn into itself instantly

### **Drawing Strategy**
- **Head**: Darker green to distinguish from body
- **Body**: Standard green segments
- **Border**: Black outline for better visibility

---

## 🎮 Testing Movement

Run the game now and you should see:
- ✅ **Snake appears** in center of screen
- ✅ **Moves automatically** in right direction
- ✅ **Arrow keys change direction** (with restrictions)
- ✅ **Length counter** shows current snake size
- ✅ **Smooth movement** at controlled speed

---

## 🔧 Key Concepts Learned

### **Object-Oriented Design**
- \`Snake\` class encapsulates snake behavior
- Methods handle movement, drawing, and state

### **List Manipulation**
- \`insert(0, item)\` - Add to front
- \`pop()\` - Remove from end
- \`copy()\` - Create list copy

### **Direction Vectors**
- \`UP = (0, -1)\` - No x change, negative y
- \`DOWN = (0, 1)\` - No x change, positive y
- \`LEFT = (-1, 0)\` - Negative x, no y change
- \`RIGHT = (1, 0)\` - Positive x, no y change

### **Event-Driven Input**
- \`pygame.KEYDOWN\` - Detect key presses
- \`event.key\` - Which key was pressed
- Conditional direction changes prevent illegal moves

---

## 🐛 Common Issues & Solutions

### **Snake Disappears**
- **Problem**: Snake moves off screen
- **Solution**: Add boundary checking (next topic)

### **Instant Reversals**
- **Problem**: Snake can turn into itself
- **Solution**: Prevent opposite direction changes

### **Jumpy Movement**
- **Problem**: Snake moves too fast/slow
- **Solution**: Adjust FPS in settings

**Next: Adding food and collision detection! 🍎**

**Great progress - our snake can now move and be controlled! 🎮**`
};
