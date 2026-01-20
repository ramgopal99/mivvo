import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_1: SubLesson = {
  id: '16.1',
  title: 'Design Patterns in C',
  status: 'demo',
  content: `# Design Patterns in C

## Creational Patterns

### Singleton Pattern
\`\`\`c
#include <stdlib.h>
#include <pthread.h>

// Thread-safe Singleton using Double-Checked Locking
typedef struct {
    int value;
    // Other singleton data
} Singleton;

static Singleton *instance = NULL;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

Singleton *get_singleton_instance(void) {
    if (instance == NULL) {  // First check (no lock)
        pthread_mutex_lock(&mutex);
        if (instance == NULL) {  // Second check (with lock)
            instance = malloc(sizeof(Singleton));
            if (instance) {
                instance->value = 42;
                // Initialize other data
            }
        }
        pthread_mutex_unlock(&mutex);
    }
    return instance;
}

// Alternative: Meyers Singleton (GCC extension)
__attribute__((constructor))
void init_singleton(void) {
    static Singleton singleton_instance = {.value = 42};
    instance = &singleton_instance;
}

__attribute__((destructor))
void destroy_singleton(void) {
    // Cleanup if needed
}
\`\`\`

### Factory Pattern
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Abstract Shape interface
typedef struct {
    void (*draw)(void *self);
    void (*destroy)(void *self);
} Shape;

typedef struct {
    Shape base;
    double radius;
} Circle;

typedef struct {
    Shape base;
    double width;
    double height;
} Rectangle;

// Circle implementation
void circle_draw(void *self) {
    Circle *circle = (Circle *)self;
    printf("Drawing circle with radius %.2f\\n", circle->radius);
}

void circle_destroy(void *self) {
    free(self);
}

// Rectangle implementation
void rectangle_draw(void *self) {
    Rectangle *rectangle = (Rectangle *)self;
    printf("Drawing rectangle %.2fx%.2f\\n", rectangle->width, rectangle->height);
}

void rectangle_destroy(void *self) {
    free(self);
}

// Shape Factory
Shape *create_circle(double radius) {
    Circle *circle = malloc(sizeof(Circle));
    if (!circle) return NULL;

    circle->base.draw = circle_draw;
    circle->base.destroy = circle_destroy;
    circle->radius = radius;

    return (Shape *)circle;
}

Shape *create_rectangle(double width, double height) {
    Rectangle *rect = malloc(sizeof(Rectangle));
    if (!rect) return NULL;

    rect->base.draw = rectangle_draw;
    rect->base.destroy = rectangle_destroy;
    rect->width = width;
    rect->height = height;

    return (Shape *)rect;
}

// Usage
Shape *shapes[3];
shapes[0] = create_circle(5.0);
shapes[1] = create_rectangle(10.0, 20.0);
shapes[2] = create_circle(3.0);

for (int i = 0; i < 3; i++) {
    shapes[i]->draw(shapes[i]);
    shapes[i]->destroy(shapes[i]);
}
\`\`\`

## Structural Patterns

### Adapter Pattern
\`\`\`c
// Legacy Rectangle interface
typedef struct {
    void (*draw_rect)(int x1, int y1, int x2, int y2);
} LegacyRectangle;

void legacy_draw_rect(int x1, int y1, int x2, int y2) {
    printf("Legacy: Drawing rectangle at (%d,%d) to (%d,%d)\\n", x1, y1, x2, y2);
}

// Modern Shape interface
typedef struct {
    void (*draw)(void *self, double x, double y);
} ModernShape;

// Adapter
typedef struct {
    ModernShape base;
    LegacyRectangle *legacy;
} RectangleAdapter;

void adapter_draw(void *self, double x, double y) {
    RectangleAdapter *adapter = (RectangleAdapter *)self;
    // Convert modern coordinates to legacy format
    int x1 = (int)x;
    int y1 = (int)y;
    int x2 = x1 + 100;  // Fixed width for simplicity
    int y2 = y1 + 50;   // Fixed height for simplicity

    adapter->legacy->draw_rect(x1, y1, x2, y2);
}

// Adapter factory
ModernShape *create_rectangle_adapter(LegacyRectangle *legacy) {
    RectangleAdapter *adapter = malloc(sizeof(RectangleAdapter));
    if (!adapter) return NULL;

    adapter->base.draw = adapter_draw;
    adapter->legacy = legacy;

    return (ModernShape *)adapter;
}
\`\`\`

### Observer Pattern
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Observer interface
typedef struct Observer Observer;
typedef void (*NotifyFunc)(Observer *observer, void *data);

struct Observer {
    NotifyFunc notify;
    void *context;
};

// Subject (Observable)
typedef struct {
    Observer **observers;
    size_t observer_count;
    size_t observer_capacity;
} Subject;

void subject_init(Subject *subject) {
    subject->observers = NULL;
    subject->observer_count = 0;
    subject->observer_capacity = 0;
}

void subject_add_observer(Subject *subject, Observer *observer) {
    if (subject->observer_count >= subject->observer_capacity) {
        subject->observer_capacity = subject->observer_capacity ?
                                   subject->observer_capacity * 2 : 4;
        subject->observers = realloc(subject->observers,
                                   subject->observer_capacity * sizeof(Observer *));
    }
    subject->observers[subject->observer_count++] = observer;
}

void subject_notify_observers(Subject *subject, void *data) {
    for (size_t i = 0; i < subject->observer_count; i++) {
        subject->observers[i]->notify(subject->observers[i], data);
    }
}

// Concrete observers
typedef struct {
    Observer base;
    const char *name;
} ConcreteObserver;

void concrete_observer_notify(Observer *observer, void *data) {
    ConcreteObserver *concrete = (ConcreteObserver *)observer;
    printf("Observer '%s' notified with data: %s\\n",
           concrete->name, (char *)data);
}

Observer *create_observer(const char *name) {
    ConcreteObserver *observer = malloc(sizeof(ConcreteObserver));
    if (!observer) return NULL;

    observer->base.notify = concrete_observer_notify;
    observer->base.context = observer;
    observer->name = name;

    return (Observer *)observer;
}

// Usage
Subject subject;
subject_init(&subject);

Observer *obs1 = create_observer("Observer 1");
Observer *obs2 = create_observer("Observer 2");

subject_add_observer(&subject, obs1);
subject_add_observer(&subject, obs2);

subject_notify_observers(&subject, "Hello, observers!");

free(obs1);
free(obs2);
free(subject.observers);
\`\`\`

## Behavioral Patterns

### Strategy Pattern
\`\`\`c
#include <math.h>

// Strategy interface
typedef double (*SortStrategy)(const void *a, const void *b);

// Context
typedef struct {
    int *array;
    size_t size;
    SortStrategy strategy;
} Sorter;

// Concrete strategies
double ascending_int(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

double descending_int(const void *a, const void *b) {
    return (*(int *)b - *(int *)a);
}

// Context methods
void sorter_init(Sorter *sorter, int *array, size_t size) {
    sorter->array = array;
    sorter->size = size;
    sorter->strategy = ascending_int;  // Default strategy
}

void sorter_set_strategy(Sorter *sorter, SortStrategy strategy) {
    sorter->strategy = strategy;
}

void sorter_sort(Sorter *sorter) {
    // Simple bubble sort with strategy
    for (size_t i = 0; i < sorter->size - 1; i++) {
        for (size_t j = 0; j < sorter->size - i - 1; j++) {
            if (sorter->strategy(&sorter->array[j], &sorter->array[j + 1]) > 0) {
                // Swap
                int temp = sorter->array[j];
                sorter->array[j] = sorter->array[j + 1];
                sorter->array[j + 1] = temp;
            }
        }
    }
}

// Usage
int data[] = {64, 34, 25, 12, 22, 11, 90};
Sorter sorter;
sorter_init(&sorter, data, sizeof(data) / sizeof(data[0]));

printf("Original: ");
for (size_t i = 0; i < sorter.size; i++) printf("%d ", sorter.array[i]);
printf("\\n");

// Sort ascending
sorter_sort(&sorter);
printf("Ascending: ");
for (size_t i = 0; i < sorter.size; i++) printf("%d ", sorter.array[i]);
printf("\\n");

// Change strategy to descending
sorter_set_strategy(&sorter, descending_int);
sorter_sort(&sorter);
printf("Descending: ");
for (size_t i = 0; i < sorter.size; i++) printf("%d ", sorter.array[i]);
printf("\\n");
\`\`\`

### Command Pattern
\`\`\`c
#include <stdlib.h>

// Command interface
typedef struct Command Command;
typedef void (*ExecuteFunc)(Command *command);
typedef void (*UndoFunc)(Command *command);

struct Command {
    ExecuteFunc execute;
    UndoFunc undo;
    void *context;
};

// Concrete command: Add to array
typedef struct {
    Command base;
    int *array;
    size_t *size;
    int value;
} AddCommand;

void add_command_execute(Command *command) {
    AddCommand *add_cmd = (AddCommand *)command;
    add_cmd->array[(*add_cmd->size)++] = add_cmd->value;
    printf("Added %d to array\\n", add_cmd->value);
}

void add_command_undo(Command *command) {
    AddCommand *add_cmd = (AddCommand *)command;
    if (*add_cmd->size > 0) {
        (*add_cmd->size)--;
        printf("Removed last element\\n");
    }
}

// Command factory
Command *create_add_command(int *array, size_t *size, int value) {
    AddCommand *cmd = malloc(sizeof(AddCommand));
    if (!cmd) return NULL;

    cmd->base.execute = add_command_execute;
    cmd->base.undo = add_command_undo;
    cmd->base.context = cmd;
    cmd->array = array;
    cmd->size = size;
    cmd->value = value;

    return (Command *)cmd;
}

// Command manager
typedef struct {
    Command **commands;
    size_t command_count;
    size_t current_command;
} CommandManager;

void command_manager_init(CommandManager *manager) {
    manager->commands = NULL;
    manager->command_count = 0;
    manager->current_command = 0;
}

void command_manager_execute(CommandManager *manager, Command *command) {
    command->execute(command);

    // Store command for undo
    manager->commands = realloc(manager->commands,
                              (manager->command_count + 1) * sizeof(Command *));
    manager->commands[manager->command_count++] = command;
    manager->current_command = manager->command_count;
}

void command_manager_undo(CommandManager *manager) {
    if (manager->current_command > 0) {
        manager->current_command--;
        manager->commands[manager->current_command]->undo(
            manager->commands[manager->current_command]);
    }
}

// Usage
#define MAX_ARRAY_SIZE 10
int array[MAX_ARRAY_SIZE];
size_t array_size = 0;

CommandManager manager;
command_manager_init(&manager);

// Execute commands
Command *cmd1 = create_add_command(array, &array_size, 10);
Command *cmd2 = create_add_command(array, &array_size, 20);
Command *cmd3 = create_add_command(array, &array_size, 30);

command_manager_execute(&manager, cmd1);
command_manager_execute(&manager, cmd2);
command_manager_execute(&manager, cmd3);

printf("Array: ");
for (size_t i = 0; i < array_size; i++) printf("%d ", array[i]);
printf("\\n");

// Undo operations
command_manager_undo(&manager);
command_manager_undo(&manager);

printf("After undo: ");
for (size_t i = 0; i < array_size; i++) printf("%d ", array[i]);
printf("\\n");

// Cleanup
free(cmd1);
free(cmd2);
free(cmd3);
free(manager.commands);
\`\`\`

Design patterns in C require careful use of function pointers, structs, and dynamic memory allocation. They provide reusable solutions to common programming problems while maintaining C's efficiency and low-level control.`
};

