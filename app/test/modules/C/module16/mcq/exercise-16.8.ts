import { Exercise } from '../../../../data/lessonsData';

export const exercise_16_8: Exercise = {
  id: "16.8",
  title: 'C Advanced Concepts Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "design_patterns_implementation",
      question: `## Design Patterns Implementation

Implement a comprehensive event system using multiple design patterns. Create an event-driven framework that supports:

1. **Observer Pattern**: Multiple subscribers to events
2. **Command Pattern**: Queued event processing
3. **Factory Pattern**: Event creation
4. **Strategy Pattern**: Different event processing strategies
5. **Singleton Pattern**: Central event manager

**Requirements:**
- Thread-safe event queuing and processing
- Support for synchronous and asynchronous event handling
- Event filtering and prioritization
- Memory-efficient event storage
- Clean API with proper error handling

**Example Usage:**
\`\`\`c
// Initialize event system
EventSystem *system = event_system_create();

// Create event subscribers
EventSubscriber *logger = logger_subscriber_create();
EventSubscriber *processor = processor_subscriber_create();

// Subscribe to events
event_system_subscribe(system, EVENT_TYPE_USER_ACTION, logger);
event_system_subscribe(system, EVENT_TYPE_DATA_UPDATE, processor);

// Create and queue events
Event *login_event = event_factory_create(EVENT_TYPE_USER_ACTION, "user_login");
event_system_queue_event(system, login_event);

// Process events
event_system_process_events(system);

// Cleanup
event_system_destroy(system);
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <stdatomic.h>

// Forward declarations
typedef struct Event Event;
typedef struct EventSubscriber EventSubscriber;
typedef struct EventSystem EventSystem;

// Event types
typedef enum {
    EVENT_TYPE_USER_ACTION,
    EVENT_TYPE_DATA_UPDATE,
    EVENT_TYPE_SYSTEM_ERROR,
    EVENT_TYPE_CUSTOM
} EventType;

// Event structure
struct Event {
    EventType type;
    char *data;
    int priority;
    void (*destroy)(Event *event);
};

// Event subscriber interface (Observer pattern)
struct EventSubscriber {
    void (*on_event)(EventSubscriber *subscriber, Event *event);
    void (*destroy)(EventSubscriber *subscriber);
    void *context;
};

// Event queue (Command pattern)
typedef struct EventQueue {
    Event **events;
    size_t capacity;
    size_t size;
    size_t head;
    size_t tail;
    pthread_mutex_t mutex;
    pthread_cond_t cond;
} EventQueue;

// Event system (Singleton pattern)
struct EventSystem {
    EventSubscriber **subscribers[EVENT_TYPE_CUSTOM + 1];
    size_t subscriber_counts[EVENT_TYPE_CUSTOM + 1];
    EventQueue *queue;
    atomic_bool running;
    pthread_t processor_thread;
};

// Strategy pattern for event processing
typedef enum {
    PROCESSING_STRATEGY_SYNCHRONOUS,
    PROCESSING_STRATEGY_ASYNCHRONOUS
} ProcessingStrategy;

// Factory pattern for event creation
Event *event_factory_create(EventType type, const char *data) {
    Event *event = malloc(sizeof(Event));
    if (!event) return NULL;

    event->type = type;
    event->data = strdup(data);
    event->priority = 0;
    event->destroy = NULL;

    return event;
}

void event_destroy_default(Event *event) {
    free(event->data);
    free(event);
}

// Queue implementation
EventQueue *event_queue_create(size_t capacity) {
    EventQueue *queue = malloc(sizeof(EventQueue));
    if (!queue) return NULL;

    queue->events = malloc(sizeof(Event *) * capacity);
    if (!queue->events) {
        free(queue);
        return NULL;
    }

    queue->capacity = capacity;
    queue->size = 0;
    queue->head = 0;
    queue->tail = 0;

    pthread_mutex_init(&queue->mutex, NULL);
    pthread_cond_init(&queue->cond, NULL);

    return queue;
}

void event_queue_destroy(EventQueue *queue) {
    if (!queue) return;

    // Free any remaining events
    while (queue->size > 0) {
        Event *event = queue->events[queue->head];
        if (event->destroy) {
            event->destroy(event);
        } else {
            event_destroy_default(event);
        }
        queue->head = (queue->head + 1) % queue->capacity;
        queue->size--;
    }

    free(queue->events);
    pthread_mutex_destroy(&queue->mutex);
    pthread_cond_destroy(&queue->cond);
    free(queue);
}

bool event_queue_enqueue(EventQueue *queue, Event *event) {
    pthread_mutex_lock(&queue->mutex);

    if (queue->size >= queue->capacity) {
        pthread_mutex_unlock(&queue->mutex);
        return false;
    }

    queue->events[queue->tail] = event;
    queue->tail = (queue->tail + 1) % queue->capacity;
    queue->size++;

    pthread_cond_signal(&queue->cond);
    pthread_mutex_unlock(&queue->mutex);

    return true;
}

Event *event_queue_dequeue(EventQueue *queue) {
    pthread_mutex_lock(&queue->mutex);

    while (queue->size == 0) {
        pthread_cond_wait(&queue->cond, &queue->mutex);
    }

    Event *event = queue->events[queue->head];
    queue->head = (queue->head + 1) % queue->capacity;
    queue->size--;

    pthread_mutex_unlock(&queue->mutex);

    return event;
}

// Event system implementation
EventSystem *event_system_create(void) {
    static EventSystem *instance = NULL;

    if (instance == NULL) {
        instance = calloc(1, sizeof(EventSystem));
        if (!instance) return NULL;

        instance->queue = event_queue_create(100);
        if (!instance->queue) {
            free(instance);
            return NULL;
        }

        atomic_store(&instance->running, true);
    }

    return instance;
}

void event_system_subscribe(EventSystem *system, EventType type, EventSubscriber *subscriber) {
    if (type > EVENT_TYPE_CUSTOM) return;

    size_t count = system->subscriber_counts[type];
    system->subscribers[type] = realloc(system->subscribers[type],
                                       sizeof(EventSubscriber *) * (count + 1));
    system->subscribers[type][count] = subscriber;
    system->subscriber_counts[type]++;
}

bool event_system_queue_event(EventSystem *system, Event *event) {
    return event_queue_enqueue(system->queue, event);
}

void event_system_process_events_sync(EventSystem *system) {
    Event *event = event_queue_dequeue(system->queue);

    // Notify all subscribers for this event type
    EventType type = event->type;
    for (size_t i = 0; i < system->subscriber_counts[type]; i++) {
        EventSubscriber *subscriber = system->subscribers[type][i];
        subscriber->on_event(subscriber, event);
    }

    // Clean up event
    if (event->destroy) {
        event->destroy(event);
    } else {
        event_destroy_default(event);
    }
}

void *event_processor_thread(void *arg) {
    EventSystem *system = (EventSystem *)arg;

    while (atomic_load(&system->running)) {
        event_system_process_events_sync(system);
    }

    return NULL;
}

void event_system_start_async_processing(EventSystem *system) {
    pthread_create(&system->processor_thread, NULL, event_processor_thread, system);
}

void event_system_stop_async_processing(EventSystem *system) {
    atomic_store(&system->running, false);
    pthread_join(system->processor_thread, NULL);
}

void event_system_process_events(EventSystem *system) {
    // Process all pending events
    while (system->queue->size > 0) {
        event_system_process_events_sync(system);
    }
}

void event_system_destroy(EventSystem *system) {
    if (!system) return;

    atomic_store(&system->running, false);

    // Clean up subscribers
    for (int type = 0; type <= EVENT_TYPE_CUSTOM; type++) {
        for (size_t i = 0; i < system->subscriber_counts[type]; i++) {
            EventSubscriber *subscriber = system->subscribers[type][i];
            if (subscriber->destroy) {
                subscriber->destroy(subscriber);
            }
        }
        free(system->subscribers[type]);
    }

    event_queue_destroy(system->queue);
    free(system);
}

// Concrete subscribers
typedef struct {
    EventSubscriber base;
    const char *name;
} LoggerSubscriber;

void logger_on_event(EventSubscriber *subscriber, Event *event) {
    LoggerSubscriber *logger = (LoggerSubscriber *)subscriber;
    printf("[%s] Event: %d, Data: %s\\n", logger->name, event->type, event->data);
}

void logger_destroy(EventSubscriber *subscriber) {
    free(subscriber);
}

EventSubscriber *logger_subscriber_create(const char *name) {
    LoggerSubscriber *logger = malloc(sizeof(LoggerSubscriber));
    if (!logger) return NULL;

    logger->base.on_event = logger_on_event;
    logger->base.destroy = logger_destroy;
    logger->base.context = logger;
    logger->name = name;

    return (EventSubscriber *)logger;
}

typedef struct {
    EventSubscriber base;
    int processed_count;
} ProcessorSubscriber;

void processor_on_event(EventSubscriber *subscriber, Event *event) {
    ProcessorSubscriber *processor = (ProcessorSubscriber *)subscriber;
    processor->processed_count++;

    // Simulate processing
    printf("Processing event %d: %s\\n", event->type, event->data);
}

void processor_destroy(EventSubscriber *subscriber) {
    free(subscriber);
}

EventSubscriber *processor_subscriber_create(void) {
    ProcessorSubscriber *processor = malloc(sizeof(ProcessorSubscriber));
    if (!processor) return NULL;

    processor->base.on_event = processor_on_event;
    processor->base.destroy = processor_destroy;
    processor->base.context = processor;
    processor->processed_count = 0;

    return (EventSubscriber *)processor;
}

// Usage example and testing
int main() {
    // Create event system
    EventSystem *system = event_system_create();
    if (!system) {
        fprintf(stderr, "Failed to create event system\\n");
        return 1;
    }

    // Create subscribers
    EventSubscriber *logger = logger_subscriber_create("MainLogger");
    EventSubscriber *processor = processor_subscriber_create();

    // Subscribe to events
    event_system_subscribe(system, EVENT_TYPE_USER_ACTION, logger);
    event_system_subscribe(system, EVENT_TYPE_USER_ACTION, processor);
    event_system_subscribe(system, EVENT_TYPE_DATA_UPDATE, processor);

    // Queue some events
    Event *event1 = event_factory_create(EVENT_TYPE_USER_ACTION, "user_login");
    Event *event2 = event_factory_create(EVENT_TYPE_DATA_UPDATE, "data_sync");
    Event *event3 = event_factory_create(EVENT_TYPE_USER_ACTION, "user_logout");

    event_system_queue_event(system, event1);
    event_system_queue_event(system, event2);
    event_system_queue_event(system, event3);

    // Process events synchronously
    printf("Processing events synchronously:\\n");
    event_system_process_events(system);

    // Queue more events and process asynchronously
    Event *event4 = event_factory_create(EVENT_TYPE_USER_ACTION, "async_action");
    event_system_queue_event(system, event4);

    printf("\\nStarting asynchronous processing...\\n");
    event_system_start_async_processing(system);

    // Give async processing time to work
    sleep(1);

    event_system_stop_async_processing(system);
    printf("Asynchronous processing stopped\\n");

    // Clean up
    event_system_destroy(system);

    printf("Event system test completed\\n");

    return 0;
}`
    },
    {
      id: "memory_management_system",
      question: `## Advanced Memory Management System

Implement a sophisticated memory management system that combines multiple allocation strategies. Create a memory manager that provides:

1. **Multiple Allocation Strategies**: Arena, pool, and general-purpose allocators
2. **Memory Tracking**: Leak detection and usage statistics
3. **Defragmentation**: Online memory compaction
4. **Thread Safety**: Concurrent allocation/deallocation
5. **Performance Monitoring**: Allocation patterns and bottlenecks

**Requirements:**
- Support different allocation strategies for different use cases
- Track memory leaks and provide detailed reports
- Handle concurrent allocations safely
- Optimize for cache efficiency
- Provide debugging and profiling capabilities

**Example Usage:**
\`\`\`c
// Create memory manager
MemoryManager *mm = memory_manager_create();

// Allocate from different strategies
void *arena_ptr = memory_manager_alloc(mm, STRATEGY_ARENA, 1024);
void *pool_ptr = memory_manager_alloc(mm, STRATEGY_POOL, sizeof(MyStruct));
void *general_ptr = memory_manager_alloc(mm, STRATEGY_GENERAL, 4096);

// Use memory...
strcpy(arena_ptr, "Arena allocated string");

// Free memory
memory_manager_free(mm, arena_ptr);
memory_manager_free(mm, pool_ptr);
memory_manager_free(mm, general_ptr);

// Get statistics
MemoryStats stats = memory_manager_get_stats(mm);
printf("Total allocated: %zu bytes\\n", stats.total_allocated);
printf("Peak usage: %zu bytes\\n", stats.peak_usage);

// Check for leaks
size_t leaks = memory_manager_detect_leaks(mm);
if (leaks > 0) {
    printf("Memory leaks detected: %zu bytes\\n", leaks);
    memory_manager_dump_leaks(mm);
}

memory_manager_destroy(mm);
\`\`\`

**Implementation Notes:**
- Use atomic operations for thread safety
- Implement different allocation strategies
- Provide memory debugging capabilities
- Handle out-of-memory conditions gracefully
- Support memory alignment requirements`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <stdatomic.h>
#include <assert.h>

// Memory allocation strategies
typedef enum {
    STRATEGY_GENERAL,    // General-purpose malloc/free
    STRATEGY_ARENA,      // Arena allocator
    STRATEGY_POOL,       // Object pool
    STRATEGY_COUNT
} AllocationStrategy;

// Memory statistics
typedef struct {
    size_t total_allocated;
    size_t peak_usage;
    size_t current_usage;
    size_t allocation_count;
    size_t deallocation_count;
} MemoryStats;

// Memory block tracking
typedef struct MemBlock {
    void *ptr;
    size_t size;
    AllocationStrategy strategy;
    const char *file;
    int line;
    const char *func;
    struct MemBlock *next;
} MemBlock;

// Arena allocator
typedef struct {
    char *buffer;
    size_t buffer_size;
    size_t offset;
} Arena;

// Pool allocator
typedef struct PoolNode {
    struct PoolNode *next;
} PoolNode;

typedef struct {
    PoolNode *free_list;
    size_t object_size;
    size_t pool_size;
    void *pool_memory;
} Pool;

// Memory manager
typedef struct MemoryManager {
    // General allocation
    MemBlock *block_list;
    pthread_mutex_t mutex;

    // Strategy-specific allocators
    Arena arena;
    Pool pool;

    // Statistics
    MemoryStats stats;

    // Leak detection
    atomic_size_t leak_count;
} MemoryManager;

// Create memory manager
MemoryManager *memory_manager_create(void) {
    MemoryManager *mm = calloc(1, sizeof(MemoryManager));
    if (!mm) return NULL;

    pthread_mutex_init(&mm->mutex, NULL);

    // Initialize arena (1MB)
    mm->arena.buffer_size = 1024 * 1024;
    mm->arena.buffer = malloc(mm->arena.buffer_size);
    mm->arena.offset = 0;

    // Initialize pool (1000 objects of 64 bytes each)
    mm->pool.object_size = 64;
    mm->pool.pool_size = 1000;
    mm->pool.pool_memory = malloc(mm->pool.pool_size * (sizeof(PoolNode) + mm->pool.object_size));
    mm->pool.free_list = NULL;

    // Initialize pool free list
    char *current = (char *)mm->pool.pool_memory;
    for (size_t i = 0; i < mm->pool.pool_size; i++) {
        PoolNode *node = (PoolNode *)current;
        node->next = mm->pool.free_list;
        mm->pool.free_list = node;
        current += sizeof(PoolNode) + mm->pool.object_size;
    }

    return mm;
}

// Arena allocation
static void *arena_alloc(MemoryManager *mm, size_t size) {
    // Align to 8-byte boundary
    size_t aligned_size = (size + 7) & ~7;

    if (mm->arena.offset + aligned_size > mm->arena.buffer_size) {
        return NULL; // Arena full
    }

    void *ptr = mm->arena.buffer + mm->arena.offset;
    mm->arena.offset += aligned_size;

    return ptr;
}

// Pool allocation
static void *pool_alloc(MemoryManager *mm) {
    if (!mm->pool.free_list) return NULL;

    PoolNode *node = mm->pool.free_list;
    mm->pool.free_list = node->next;

    return (char *)node + sizeof(PoolNode);
}

// Pool free
static void pool_free(MemoryManager *mm, void *ptr) {
    if (!ptr) return;

    PoolNode *node = (PoolNode *)((char *)ptr - sizeof(PoolNode));
    node->next = mm->pool.free_list;
    mm->pool.free_list = node;
}

// General allocation with tracking
static void *general_alloc(MemoryManager *mm, size_t size, const char *file, int line, const char *func) {
    void *ptr = malloc(size);
    if (!ptr) return NULL;

    // Add to tracking list
    MemBlock *block = malloc(sizeof(MemBlock));
    if (block) {
        block->ptr = ptr;
        block->size = size;
        block->strategy = STRATEGY_GENERAL;
        block->file = file;
        block->line = line;
        block->func = func;

        pthread_mutex_lock(&mm->mutex);
        block->next = mm->block_list;
        mm->block_list = block;
        pthread_mutex_unlock(&mm->mutex);
    }

    return ptr;
}

// General free with tracking
static void general_free(MemoryManager *mm, void *ptr) {
    if (!ptr) return;

    pthread_mutex_lock(&mm->mutex);

    // Find and remove from tracking list
    MemBlock *prev = NULL;
    MemBlock *current = mm->block_list;

    while (current) {
        if (current->ptr == ptr) {
            if (prev) {
                prev->next = current->next;
            } else {
                mm->block_list = current->next;
            }
            free(current);
            break;
        }
        prev = current;
        current = current->next;
    }

    pthread_mutex_unlock(&mm->mutex);
    free(ptr);
}

// Public allocation function
void *memory_manager_alloc(MemoryManager *mm, AllocationStrategy strategy, size_t size) {
    void *ptr = NULL;

    switch (strategy) {
        case STRATEGY_GENERAL:
            ptr = general_alloc(mm, size, __FILE__, __LINE__, __func__);
            break;
        case STRATEGY_ARENA:
            ptr = arena_alloc(mm, size);
            break;
        case STRATEGY_POOL:
            if (size <= mm->pool.object_size) {
                ptr = pool_alloc(mm);
            }
            break;
        default:
            return NULL;
    }

    if (ptr) {
        // Update statistics
        mm->stats.total_allocated += size;
        mm->stats.current_usage += size;
        mm->stats.allocation_count++;

        if (mm->stats.current_usage > mm->stats.peak_usage) {
            mm->stats.peak_usage = mm->stats.current_usage;
        }
    }

    return ptr;
}

// Public free function
void memory_manager_free(MemoryManager *mm, void *ptr) {
    if (!ptr) return;

    // Find the strategy used for this pointer (simplified - in real implementation,
    // you'd need better tracking)
    AllocationStrategy strategy = STRATEGY_GENERAL;

    // Check if it's in arena range
    if (ptr >= (void *)mm->arena.buffer &&
        ptr < (void *)(mm->arena.buffer + mm->arena.buffer_size)) {
        strategy = STRATEGY_ARENA;
        // Arena doesn't support individual frees
        return;
    }

    // Check if it's in pool range
    if (ptr >= mm->pool.pool_memory &&
        ptr < (void *)((char *)mm->pool.pool_memory +
                      mm->pool.pool_size * (sizeof(PoolNode) + mm->pool.object_size))) {
        strategy = STRATEGY_POOL;
        pool_free(mm, ptr);
    } else {
        strategy = STRATEGY_GENERAL;
        general_free(mm, ptr);
    }

    mm->stats.deallocation_count++;
}

// Get memory statistics
MemoryStats memory_manager_get_stats(MemoryManager *mm) {
    return mm->stats;
}

// Leak detection
size_t memory_manager_detect_leaks(MemoryManager *mm) {
    size_t leaks = 0;
    pthread_mutex_lock(&mm->mutex);

    MemBlock *current = mm->block_list;
    while (current) {
        leaks += current->size;
        atomic_fetch_add(&mm->leak_count, 1);
        current = current->next;
    }

    pthread_mutex_unlock(&mm->mutex);
    return leaks;
}

// Dump leak information
void memory_manager_dump_leaks(MemoryManager *mm) {
    pthread_mutex_lock(&mm->mutex);

    printf("\\n=== MEMORY LEAKS ===\\n");
    MemBlock *current = mm->block_list;
    while (current) {
        printf("LEAK: %zu bytes allocated at %s:%d in %s\\n",
               current->size, current->file, current->line, current->func);
        current = current->next;
    }
    printf("====================\\n\\n");

    pthread_mutex_unlock(&mm->mutex);
}

// Reset arena (for reuse)
void memory_manager_reset_arena(MemoryManager *mm) {
    mm->arena.offset = 0;
}

// Destroy memory manager
void memory_manager_destroy(MemoryManager *mm) {
    if (!mm) return;

    // Free all tracked blocks
    pthread_mutex_lock(&mm->mutex);
    MemBlock *current = mm->block_list;
    while (current) {
        MemBlock *next = current->next;
        free(current->ptr);
        free(current);
        current = next;
    }
    pthread_mutex_unlock(&mm->mutex);

    // Clean up allocators
    free(mm->arena.buffer);
    free(mm->pool.pool_memory);

    pthread_mutex_destroy(&mm->mutex);
    free(mm);
}

// Usage example and testing
int main() {
    MemoryManager *mm = memory_manager_create();
    if (!mm) {
        fprintf(stderr, "Failed to create memory manager\\n");
        return 1;
    }

    // Test different allocation strategies
    printf("Testing allocation strategies...\\n");

    // Arena allocation (fast, bulk deallocation)
    char *arena_str = memory_manager_alloc(mm, STRATEGY_ARENA, 100);
    if (arena_str) {
        strcpy(arena_str, "Arena allocated string");
        printf("Arena: %s\\n", arena_str);
    }

    // Pool allocation (fast for same-sized objects)
    typedef struct {
        int id;
        char name[20];
    } TestStruct;

    TestStruct *pool_obj = memory_manager_alloc(mm, STRATEGY_POOL, sizeof(TestStruct));
    if (pool_obj) {
        pool_obj->id = 42;
        strcpy(pool_obj->name, "Pool object");
        printf("Pool: ID=%d, Name='%s'\\n", pool_obj->id, pool_obj->name);
        memory_manager_free(mm, pool_obj);
    }

    // General allocation (tracked)
    int *general_array = memory_manager_alloc(mm, STRATEGY_GENERAL, sizeof(int) * 10);
    if (general_array) {
        for (int i = 0; i < 10; i++) {
            general_array[i] = i * i;
        }
        printf("General: ");
        for (int i = 0; i < 10; i++) {
            printf("%d ", general_array[i]);
        }
        printf("\\n");
        memory_manager_free(mm, general_array);
    }

    // Show statistics
    MemoryStats stats = memory_manager_get_stats(mm);
    printf("\\nMemory Statistics:\\n");
    printf("Total allocated: %zu bytes\\n", stats.total_allocated);
    printf("Peak usage: %zu bytes\\n", stats.peak_usage);
    printf("Current usage: %zu bytes\\n", stats.current_usage);
    printf("Allocations: %zu\\n", stats.allocation_count);
    printf("Deallocations: %zu\\n", stats.deallocation_count);

    // Reset arena and show it can be reused
    memory_manager_reset_arena(mm);
    char *arena_str2 = memory_manager_alloc(mm, STRATEGY_ARENA, 50);
    if (arena_str2) {
        strcpy(arena_str2, "Reused arena");
        printf("Reused arena: %s\\n", arena_str2);
    }

    // Check for leaks (should detect arena and any unfreed general allocations)
    size_t leaks = memory_manager_detect_leaks(mm);
    if (leaks > 0) {
        printf("\\nDetected %zu bytes of memory leaks\\n", leaks);
        memory_manager_dump_leaks(mm);
    } else {
        printf("\\nNo memory leaks detected\\n");
    }

    memory_manager_destroy(mm);

    printf("Memory management test completed\\n");
    return 0;
}`
    }
  ]
};
