import { SubLesson } from '../../../data/lessonsData';

export const topic_10_7: SubLesson = {
  id: 10.7,
  title: 'Case Studies',
  status: 'completed',
  content: `# 📚 Case Studies

Explore real-world memory management scenarios and learn from practical examples of memory-related bugs and their solutions.

---

## 🎯 Real-World Memory Bugs

### Buffer Overflow in Network Code

**Scenario: A network server reads data from clients but doesn't validate input size.**

\`\`\`c
// ❌ Vulnerable code
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>

void handle_client(int client_socket) {
    char buffer[1024];  // Fixed-size buffer

    // Read data from client
    ssize_t bytes_read = recv(client_socket, buffer, sizeof(buffer), 0);

    if (bytes_read > 0) {
        // Process the data
        process_data(buffer, bytes_read);
    }
}

void process_data(char* data, size_t length) {
    char response[512];

    // Copy data to response buffer
    strcpy(response, "Response: ");
    strncat(response, data, length);  // Potential overflow!

    send(client_socket, response, strlen(response), 0);
}

// ✅ Fixed code
void handle_client_fixed(int client_socket) {
    const size_t MAX_BUFFER = 1024;
    char* buffer = malloc(MAX_BUFFER);

    if (buffer == NULL) {
        // Handle allocation failure
        close(client_socket);
        return;
    }

    ssize_t bytes_read = recv(client_socket, buffer, MAX_BUFFER - 1, 0);

    if (bytes_read > 0) {
        buffer[bytes_read] = '\\0';  // Null terminate
        process_data_fixed(buffer, bytes_read);
    }

    free(buffer);
    close(client_socket);
}

void process_data_fixed(const char* data, size_t length) {
    const size_t MAX_RESPONSE = 1024;
    char* response = malloc(MAX_RESPONSE);

    if (response == NULL) return;

    // Safe string operations
    size_t prefix_len = strlen("Response: ");
    size_t data_len = strnlen(data, length);

    if (prefix_len + data_len + 1 <= MAX_RESPONSE) {
        strcpy(response, "Response: ");
        strncat(response, data, data_len);

        send(client_socket, response, strlen(response), 0);
    }

    free(response);
}
\`\`\`

### Use-After-Free in Linked List

**Scenario: A linked list implementation has a dangling pointer bug.**

\`\`\`c
// ❌ Buggy linked list
typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct {
    Node* head;
} LinkedList;

void list_remove(LinkedList* list, int value) {
    Node* current = list->head;
    Node* previous = NULL;

    while (current != NULL) {
        if (current->data == value) {
            if (previous == NULL) {
                list->head = current->next;
            } else {
                previous->next = current->next;
            }

            free(current);  // Free the node
            return;         // Exit function
        }

        previous = current;
        current = current->next;
    }
}

void print_list(const LinkedList* list) {
    Node* current = list->head;

    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

int main() {
    LinkedList list = {NULL};

    // Add nodes
    Node* n1 = malloc(sizeof(Node)); n1->data = 1; n1->next = list.head; list.head = n1;
    Node* n2 = malloc(sizeof(Node)); n2->data = 2; n2->next = list.head; list.head = n2;
    Node* n3 = malloc(sizeof(Node)); n3->data = 3; n3->next = list.head; list.head = n3;

    print_list(&list);  // Prints: 3 -> 2 -> 1 -> NULL

    // This causes use-after-free!
    list_remove(&list, 2);

    print_list(&list);  // May crash or print garbage
}

// ✅ Fixed version
void list_remove_fixed(LinkedList* list, int value) {
    Node* current = list->head;
    Node* previous = NULL;

    while (current != NULL) {
        if (current->data == value) {
            if (previous == NULL) {
                list->head = current->next;
            } else {
                previous->next = current->next;
            }

            free(current);
            return;
        }

        previous = current;
        current = current->next;
    }
}

// Better: Return success/failure
bool list_remove_safe(LinkedList* list, int value) {
    Node* current = list->head;
    Node* previous = NULL;

    while (current != NULL) {
        if (current->data == value) {
            if (previous == NULL) {
                list->head = current->next;
            } else {
                previous->next = current->next;
            }

            free(current);
            return true;
        }

        previous = current;
        current = current->next;
    }

    return false;  // Value not found
}
\`\`\`

### Memory Leak in Resource Manager

**Scenario: A resource manager fails to clean up all resources on error.**

\`\`\`c
// ❌ Leaky resource manager
typedef struct {
    FILE* log_file;
    char* buffer;
    void* connection;
} ResourceManager;

ResourceManager* create_manager(const char* log_filename) {
    ResourceManager* mgr = malloc(sizeof(ResourceManager));

    if (mgr == NULL) return NULL;

    mgr->log_file = fopen(log_filename, "w");
    if (mgr->log_file == NULL) {
        free(mgr);  // Leak: mgr not freed on error
        return NULL;
    }

    mgr->buffer = malloc(1024);
    if (mgr->buffer == NULL) {
        fclose(mgr->log_file);  // Leak: log_file not closed
        free(mgr);             // Leak: mgr not freed
        return NULL;
    }

    mgr->connection = create_connection();
    if (mgr->connection == NULL) {
        free(mgr->buffer);     // Leak: buffer not freed
        fclose(mgr->log_file); // Leak: log_file not closed
        free(mgr);            // Leak: mgr not freed
        return NULL;
    }

    return mgr;
}

// ✅ Fixed with proper cleanup
typedef struct {
    FILE* log_file;
    char* buffer;
    void* connection;
} ResourceManager;

ResourceManager* create_manager_fixed(const char* log_filename) {
    ResourceManager* mgr = NULL;
    FILE* log_file = NULL;
    char* buffer = NULL;
    void* connection = NULL;

    // Allocate manager
    mgr = malloc(sizeof(ResourceManager));
    if (mgr == NULL) goto error;

    // Open log file
    log_file = fopen(log_filename, "w");
    if (log_file == NULL) goto error;

    // Allocate buffer
    buffer = malloc(1024);
    if (buffer == NULL) goto error;

    // Create connection
    connection = create_connection();
    if (connection == NULL) goto error;

    // Success - assign to manager
    mgr->log_file = log_file;
    mgr->buffer = buffer;
    mgr->connection = connection;

    return mgr;

error:
    // Clean up in reverse order
    if (connection) destroy_connection(connection);
    free(buffer);
    if (log_file) fclose(log_file);
    free(mgr);

    return NULL;
}

void destroy_manager(ResourceManager* mgr) {
    if (mgr == NULL) return;

    destroy_connection(mgr->connection);
    free(mgr->buffer);
    fclose(mgr->log_file);
    free(mgr);
}
\`\`\`

---

## 🏗️ Architecture Patterns

### Memory Pool for Game Objects

**Scenario: A game needs to frequently create and destroy similar objects.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ENEMIES 100
#define ENEMY_SIZE sizeof(Enemy)

typedef struct {
    int x, y;
    int health;
    int damage;
    bool active;
} Enemy;

typedef struct {
    Enemy enemies[MAX_ENEMIES];
    bool used[MAX_ENEMIES];
    size_t free_count;
} EnemyPool;

void pool_init(EnemyPool* pool) {
    memset(pool->used, 0, sizeof(pool->used));
    pool->free_count = MAX_ENEMIES;
}

Enemy* pool_spawn_enemy(EnemyPool* pool, int x, int y) {
    if (pool->free_count == 0) return NULL;

    // Find free slot
    for (int i = 0; i < MAX_ENEMIES; i++) {
        if (!pool->used[i]) {
            pool->used[i] = true;
            pool->free_count--;

            Enemy* enemy = &pool->enemies[i];
            enemy->x = x;
            enemy->y = y;
            enemy->health = 100;
            enemy->damage = 10;
            enemy->active = true;

            return enemy;
        }
    }

    return NULL;
}

void pool_destroy_enemy(EnemyPool* pool, Enemy* enemy) {
    if (enemy == NULL) return;

    // Calculate index
    size_t index = enemy - pool->enemies;

    if (index < MAX_ENEMIES && pool->used[index]) {
        pool->used[index] = false;
        pool->free_count++;
        enemy->active = false;
    }
}

void pool_update_enemies(EnemyPool* pool) {
    for (int i = 0; i < MAX_ENEMIES; i++) {
        if (pool->used[i]) {
            Enemy* enemy = &pool->enemies[i];

            // Simple AI: move toward player
            if (enemy->x > 400) enemy->x -= 2;
            if (enemy->x < 400) enemy->x += 2;

            // Take damage over time
            enemy->health -= 1;

            if (enemy->health <= 0) {
                pool_destroy_enemy(pool, enemy);
            }
        }
    }
}

void pool_render_enemies(const EnemyPool* pool) {
    for (int i = 0; i < MAX_ENEMIES; i++) {
        if (pool->used[i]) {
            const Enemy* enemy = &pool->enemies[i];
            printf("Enemy at (%d, %d) HP: %d\\n",
                   enemy->x, enemy->y, enemy->health);
        }
    }
}

int main() {
    EnemyPool pool;
    pool_init(&pool);

    // Spawn some enemies
    pool_spawn_enemy(&pool, 100, 100);
    pool_spawn_enemy(&pool, 200, 150);
    pool_spawn_enemy(&pool, 300, 200);

    printf("Initial enemies:\\n");
    pool_render_enemies(&pool);

    // Simulate game loop
    for (int frame = 0; frame < 10; frame++) {
        pool_update_enemies(&pool);
        printf("\\nFrame %d:\\n", frame + 1);
        pool_render_enemies(&pool);
    }

    printf("\\nPool statistics: %zu enemies active, %zu free slots\\n",
           MAX_ENEMIES - pool.free_count, pool.free_count);

    return 0;
}
\`\`\`

### Custom String Library

**Scenario: A string library that manages memory efficiently.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdarg.h>

typedef struct {
    char* data;
    size_t length;
    size_t capacity;
} String;

String* string_create(const char* initial) {
    size_t initial_len = initial ? strlen(initial) : 0;
    size_t capacity = initial_len > 0 ? initial_len * 2 : 16;

    String* str = malloc(sizeof(String));
    if (str == NULL) return NULL;

    str->data = malloc(capacity + 1);
    if (str->data == NULL) {
        free(str);
        return NULL;
    }

    str->capacity = capacity;
    str->length = initial_len;

    if (initial) {
        strcpy(str->data, initial);
    } else {
        str->data[0] = '\\0';
    }

    return str;
}

void string_destroy(String* str) {
    if (str != NULL) {
        free(str->data);
        free(str);
    }
}

bool string_resize(String* str, size_t new_capacity) {
    if (new_capacity <= str->capacity) return true;

    char* new_data = realloc(str->data, new_capacity + 1);
    if (new_data == NULL) return false;

    str->data = new_data;
    str->capacity = new_capacity;

    return true;
}

bool string_append(String* str, const char* suffix) {
    size_t suffix_len = strlen(suffix);
    size_t needed_capacity = str->length + suffix_len;

    if (needed_capacity > str->capacity) {
        size_t new_capacity = str->capacity * 2;
        while (new_capacity < needed_capacity) {
            new_capacity *= 2;
        }

        if (!string_resize(str, new_capacity)) {
            return false;
        }
    }

    strcpy(str->data + str->length, suffix);
    str->length += suffix_len;

    return true;
}

bool string_append_format(String* str, const char* format, ...) {
    va_list args;

    // First, determine how much space we need
    va_start(args, format);
    int needed = vsnprintf(NULL, 0, format, args);
    va_end(args);

    if (needed < 0) return false;

    size_t required_capacity = str->length + needed;

    if (required_capacity > str->capacity) {
        size_t new_capacity = str->capacity * 2;
        while (new_capacity < required_capacity) {
            new_capacity *= 2;
        }

        if (!string_resize(str, new_capacity)) {
            return false;
        }
    }

    // Now format into the string
    va_start(args, format);
    int written = vsnprintf(str->data + str->length,
                           str->capacity - str->length + 1,
                           format, args);
    va_end(args);

    if (written > 0) {
        str->length += written;
        return true;
    }

    return false;
}

void string_clear(String* str) {
    str->data[0] = '\\0';
    str->length = 0;
}

const char* string_get(const String* str) {
    return str->data;
}

size_t string_length(const String* str) {
    return str->length;
}

int main() {
    String* str = string_create("Hello");

    if (str == NULL) return 1;

    string_append(str, " ");
    string_append(str, "World");

    string_append_format(str, "! Today is %d/%d/%d", 12, 25, 2024);

    printf("Final string: %s\\n", string_get(str));
    printf("Length: %zu, Capacity: %zu\\n", string_length(str), str->capacity);

    string_destroy(str);

    return 0;
}
\`\`\`

---

## 🐛 Debugging War Stories

### The Case of the Mysterious Crash

**Problem: Program crashes randomly after hours of operation.**

**Root Cause:** Memory corruption due to buffer overflow in string processing.

\`\`\`c
// ❌ Buggy code
void process_message(char* message) {
    char buffer[256];

    // No bounds checking!
    strcpy(buffer, message);

    // Process buffer...
}

// ✅ Fixed code
void process_message_fixed(const char* message) {
    const size_t BUFFER_SIZE = 256;
    char buffer[BUFFER_SIZE];

    // Safe copy with bounds checking
    strncpy(buffer, message, BUFFER_SIZE - 1);
    buffer[BUFFER_SIZE - 1] = '\\0';

    // Validate input
    if (strlen(message) >= BUFFER_SIZE) {
        fprintf(stderr, "Message too long: %zu characters\\n", strlen(message));
        return;
    }

    // Process buffer...
}
\`\`\`

### The Case of the Growing Memory Usage

**Problem: Server memory usage grows indefinitely over time.**

**Root Cause:** Circular reference in reference-counted objects.

\`\`\`c
// ❌ Circular reference bug
typedef struct A {
    struct B* b_ref;
    int ref_count;
} A;

typedef struct B {
    struct A* a_ref;
    int ref_count;
} B;

A* create_a() {
    A* a = malloc(sizeof(A));
    a->ref_count = 1;
    return a;
}

B* create_b() {
    B* b = malloc(sizeof(B));
    b->ref_count = 1;
    return b;
}

void set_references(A* a, B* b) {
    a->b_ref = b;  // A references B
    b->a_ref = a;  // B references A (circular!)
}

// When both ref_counts reach 0, neither gets freed!
\`\`\`

**Solutions:**
1. Use weak references for one direction
2. Implement cycle detection in garbage collector
3. Manual breaking of cycles before cleanup

### The Case of the Intermittent Failures

**Problem: Program works in debug mode but fails in release.**

**Root Cause:** Uninitialized memory in release build.

\`\`\`c
// ❌ Uninitialized variable
int process_data(int* data, size_t size) {
    int total = 0;  // Uninitialized in release?

    for (size_t i = 0; i < size; i++) {
        total += data[i];
    }

    return total;
}

// ✅ Always initialize
int process_data_fixed(int* data, size_t size) {
    int total = 0;  // Explicitly initialized

    for (size_t i = 0; i < size; i++) {
        total += data[i];
    }

    return total;
}
\`\`\`

---

## 🎯 Best Practices from Case Studies

### 1. Always Validate Input

\`\`\`c
// Validate sizes before allocation
void* safe_malloc(size_t size) {
    if (size == 0 || size > MAX_ALLOCATION_SIZE) {
        return NULL;
    }

    void* ptr = malloc(size);
    if (ptr == NULL) {
        fprintf(stderr, "Allocation failed for %zu bytes\\n", size);
    }

    return ptr;
}
\`\`\`

### 2. Use Consistent Error Handling

\`\`\`c
#define CHECK_NULL(ptr, message) \\
    do { \\
        if ((ptr) == NULL) { \\
            fprintf(stderr, "NULL pointer: %s\\n", message); \\
            goto cleanup; \\
        } \\
    } while(0)

#define CHECK_ALLOC(ptr) CHECK_NULL(ptr, "allocation failed")
\`\`\`

### 3. Implement Resource Management

\`\`\`c
// RAII-style resource management
typedef struct {
    void** resources;
    void (*cleanup_functions[10])(void*);
    size_t count;
} ResourceManager;

void rm_init(ResourceManager* rm) {
    rm->count = 0;
}

void rm_add(ResourceManager* rm, void* resource, void (*cleanup)(void*)) {
    if (rm->count < 10) {
        rm->resources[rm->count] = resource;
        rm->cleanup_functions[rm->count] = cleanup;
        rm->count++;
    }
}

void rm_cleanup(ResourceManager* rm) {
    for (size_t i = rm->count; i > 0; i--) {
        if (rm->cleanup_functions[i-1]) {
            rm->cleanup_functions[i-1](rm->resources[i-1]);
        }
    }
    rm->count = 0;
}
\`\`\`

### 4. Test Memory Edge Cases

\`\`\`c
void test_memory_edge_cases() {
    // Test allocation failures
    void* ptr = malloc(SIZE_MAX);
    assert(ptr == NULL);

    // Test realloc edge cases
    ptr = malloc(100);
    void* new_ptr = realloc(ptr, 0);  // Should free and return NULL
    assert(new_ptr == NULL);

    // Test calloc with large sizes
    ptr = calloc(1, SIZE_MAX);
    assert(ptr == NULL);
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Validate all inputs** before memory operations
2. **Use consistent error handling** patterns
3. **Implement proper resource cleanup** on all error paths
4. **Test edge cases** thoroughly
5. **Use appropriate tools** for debugging memory issues
6. **Learn from real-world bugs** and their solutions
7. **Document memory ownership** and lifetime rules

