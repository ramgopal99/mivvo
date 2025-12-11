import { SubLesson } from '../../../data/lessonsData';

export const topic_10_1: SubLesson = {
  id: 10.1,
  title: 'Advanced Memory Allocation',
  status: 'completed',
  content: `# 💾 Advanced Memory Allocation

Master sophisticated memory management techniques beyond basic malloc/free, including custom allocators, memory pools, and advanced allocation strategies.

---

## 🎯 Memory Allocation Strategies

### Memory Pool Allocator

**Memory pools pre-allocate large blocks and sub-allocate from them, reducing fragmentation and improving performance.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 4096
#define BLOCK_SIZE 64
#define NUM_BLOCKS (POOL_SIZE / BLOCK_SIZE)

typedef struct {
    char memory[POOL_SIZE];
    char used_blocks[NUM_BLOCKS];  // 1 = used, 0 = free
    size_t free_blocks;
} MemoryPool;

void pool_init(MemoryPool* pool) {
    memset(pool->used_blocks, 0, sizeof(pool->used_blocks));
    pool->free_blocks = NUM_BLOCKS;
}

void* pool_alloc(MemoryPool* pool, size_t size) {
    if (size > BLOCK_SIZE || pool->free_blocks == 0) {
        return NULL;  // Too big or no space
    }

    // Find first free block
    for (size_t i = 0; i < NUM_BLOCKS; i++) {
        if (!pool->used_blocks[i]) {
            pool->used_blocks[i] = 1;
            pool->free_blocks--;
            return &pool->memory[i * BLOCK_SIZE];
        }
    }

    return NULL;  // No free blocks
}

void pool_free(MemoryPool* pool, void* ptr) {
    if (ptr == NULL) return;

    // Calculate block index
    size_t offset = (char*)ptr - pool->memory;
    size_t block_index = offset / BLOCK_SIZE;

    if (block_index < NUM_BLOCKS && pool->used_blocks[block_index]) {
        pool->used_blocks[block_index] = 0;
        pool->free_blocks++;
    }
}

int main() {
    MemoryPool pool;
    pool_init(&pool);

    printf("Pool initialized: %zu free blocks\\n", pool.free_blocks);

    // Allocate some blocks
    void* ptr1 = pool_alloc(&pool, 32);
    void* ptr2 = pool_alloc(&pool, 16);
    void* ptr3 = pool_alloc(&pool, 48);

    printf("After allocations: %zu free blocks\\n", pool.free_blocks);

    // Use the memory
    if (ptr1) strcpy(ptr1, "Hello");
    if (ptr2) strcpy(ptr2, "World");

    // Free some blocks
    pool_free(&pool, ptr2);
    printf("After freeing: %zu free blocks\\n", pool.free_blocks);

    return 0;
}
\`\`\`

### Slab Allocator

**Slab allocators maintain pools of objects of the same size for efficient allocation/deallocation.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define SLAB_SIZE 4096
#define OBJ_SIZE sizeof(Node)
#define OBJECTS_PER_SLAB (SLAB_SIZE / OBJ_SIZE)

typedef struct Node {
    int data;
    struct Node* next;
} Node;

typedef struct Slab {
    char memory[SLAB_SIZE];
    char used[OBJECTS_PER_SLAB];
    size_t free_count;
    struct Slab* next;
} Slab;

typedef struct {
    Slab* slabs;
    Node* free_list;  // Free list for quick allocation
} SlabAllocator;

Slab* create_slab() {
    Slab* slab = malloc(sizeof(Slab));
    if (slab == NULL) return NULL;

    memset(slab->used, 0, sizeof(slab->used));
    slab->free_count = OBJECTS_PER_SLAB;
    slab->next = NULL;

    return slab;
}

void* slab_alloc(SlabAllocator* allocator) {
    // Try free list first
    if (allocator->free_list) {
        Node* node = allocator->free_list;
        allocator->free_list = node->next;
        return node;
    }

    // Find slab with free space
    Slab* slab = allocator->slabs;
    while (slab) {
        if (slab->free_count > 0) {
            // Find free slot
            for (size_t i = 0; i < OBJECTS_PER_SLAB; i++) {
                if (!slab->used[i]) {
                    slab->used[i] = 1;
                    slab->free_count--;
                    return (Node*)&slab->memory[i * OBJ_SIZE];
                }
            }
        }
        slab = slab->next;
    }

    // No free space, create new slab
    Slab* new_slab = create_slab();
    if (new_slab == NULL) return NULL;

    new_slab->next = allocator->slabs;
    allocator->slabs = new_slab;

    // Allocate from new slab
    new_slab->used[0] = 1;
    new_slab->free_count--;
    return (Node*)&new_slab->memory[0];
}

void slab_free(SlabAllocator* allocator, void* ptr) {
    // Add to free list for quick reuse
    Node* node = (Node*)ptr;
    node->next = allocator->free_list;
    allocator->free_list = node;
}

void slab_destroy(SlabAllocator* allocator) {
    Slab* slab = allocator->slabs;
    while (slab) {
        Slab* next = slab->next;
        free(slab);
        slab = next;
    }
    allocator->slabs = NULL;
    allocator->free_list = NULL;
}

int main() {
    SlabAllocator allocator = {NULL, NULL};

    // Allocate nodes
    Node* nodes[10];
    for (int i = 0; i < 10; i++) {
        nodes[i] = slab_alloc(&allocator);
        if (nodes[i]) {
            nodes[i]->data = i * 10;
        }
    }

    // Free some nodes
    slab_free(&allocator, nodes[3]);
    slab_free(&allocator, nodes[7]);

    // Allocate again (should reuse freed nodes)
    Node* new_node1 = slab_alloc(&allocator);
    Node* new_node2 = slab_alloc(&allocator);

    printf("Reallocated nodes: %p, %p\\n", new_node1, new_node2);

    slab_destroy(&allocator);
    return 0;
}
\`\`\`

---

## 🔄 Memory Alignment and Padding

### Alignment Requirements

**Different data types have different alignment requirements for optimal memory access.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Aligned allocation function
void* aligned_alloc(size_t alignment, size_t size) {
    // Calculate total size needed
    size_t total_size = size + alignment - 1 + sizeof(void*);

    // Allocate raw memory
    void* raw = malloc(total_size);
    if (raw == NULL) return NULL;

    // Calculate aligned address
    uintptr_t raw_addr = (uintptr_t)raw;
    uintptr_t aligned_addr = (raw_addr + sizeof(void*) + alignment - 1) & ~(alignment - 1);

    // Store original pointer before aligned address
    void** stored_ptr = (void**)(aligned_addr - sizeof(void*));
    *stored_ptr = raw;

    return (void*)aligned_addr;
}

void aligned_free(void* ptr) {
    if (ptr == NULL) return;

    // Get original pointer
    void** stored_ptr = (void**)((uintptr_t)ptr - sizeof(void*));
    void* original = *stored_ptr;

    free(original);
}

int main() {
    // Allocate 16-byte aligned memory
    void* aligned_ptr = aligned_alloc(16, 100);

    if (aligned_ptr) {
        printf("Original pointer: %p\\n", aligned_ptr);
        printf("Is 16-byte aligned: %s\\n",
               ((uintptr_t)aligned_ptr % 16 == 0) ? "Yes" : "No");

        aligned_free(aligned_ptr);
    }

    return 0;
}
\`\`\`

### Structure Padding Analysis

\`\`\`c
#include <stdio.h>

struct PaddedStruct {
    char c1;     // 1 byte
    // 3 bytes padding
    int i;       // 4 bytes
    char c2;     // 1 byte
    // 3 bytes padding
    double d;    // 8 bytes
};               // Total: 20 bytes

#pragma pack(1)
struct PackedStruct {
    char c1;     // 1 byte
    int i;       // 4 bytes
    char c2;     // 1 byte
    double d;    // 8 bytes
};               // Total: 14 bytes
#pragma pack()

int main() {
    printf("Padded struct size: %zu\\n", sizeof(struct PaddedStruct));
    printf("Packed struct size: %zu\\n", sizeof(struct PackedStruct));

    // Show member addresses
    struct PaddedStruct ps = {0};
    printf("\\nPadded struct member addresses:\\n");
    printf("  c1: %p\\n", &ps.c1);
    printf("  i:  %p\\n", &ps.i);
    printf("  c2: %p\\n", &ps.c2);
    printf("  d:  %p\\n", &ps.d);

    return 0;
}
\`\`\`

---

## 🧪 Memory Debugging Techniques

### Memory Corruption Detection

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CANARY_VALUE 0xDEADBEEF
#define CANARY_SIZE sizeof(unsigned int)

typedef struct {
    size_t size;
    unsigned int canary_start;
    char data[];  // Flexible array
} TrackedBlock;

void* debug_malloc(size_t size) {
    size_t total_size = sizeof(TrackedBlock) + size + CANARY_SIZE;

    TrackedBlock* block = malloc(total_size);
    if (block == NULL) return NULL;

    block->size = size;
    block->canary_start = CANARY_VALUE;

    // Set end canary
    unsigned int* end_canary = (unsigned int*)&block->data[size];
    *end_canary = CANARY_VALUE;

    return block->data;
}

void debug_free(void* ptr) {
    if (ptr == NULL) return;

    TrackedBlock* block = (TrackedBlock*)((char*)ptr - sizeof(TrackedBlock));

    // Check canaries
    if (block->canary_start != CANARY_VALUE) {
        fprintf(stderr, "Memory corruption detected at start of block\\n");
    }

    unsigned int* end_canary = (unsigned int*)&block->data[block->size];
    if (*end_canary != CANARY_VALUE) {
        fprintf(stderr, "Memory corruption detected at end of block\\n");
    }

    free(block);
}

int main() {
    // Allocate with debugging
    char* str = debug_malloc(20);
    strcpy(str, "Hello World");

    printf("String: %s\\n", str);

    // This would detect corruption if we wrote past the end
    // str[25] = 'x';  // Buffer overflow

    debug_free(str);
    printf("Memory freed successfully\\n");

    return 0;
}
\`\`\`

---

## 🎯 Advanced Allocation Patterns

### Arena Allocator

**Arena allocators allocate from a large contiguous block and free everything at once.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* buffer;
    size_t size;
    size_t used;
} Arena;

Arena* arena_create(size_t size) {
    Arena* arena = malloc(sizeof(Arena));
    if (arena == NULL) return NULL;

    arena->buffer = malloc(size);
    if (arena->buffer == NULL) {
        free(arena);
        return NULL;
    }

    arena->size = size;
    arena->used = 0;

    return arena;
}

void* arena_alloc(Arena* arena, size_t size) {
    if (arena->used + size > arena->size) {
        return NULL;  // Out of memory
    }

    void* ptr = &arena->buffer[arena->used];
    arena->used += size;

    return ptr;
}

void arena_reset(Arena* arena) {
    arena->used = 0;
}

void arena_destroy(Arena* arena) {
    free(arena->buffer);
    free(arena);
}

int main() {
    Arena* arena = arena_create(1024);

    if (arena == NULL) {
        printf("Failed to create arena\\n");
        return 1;
    }

    // Allocate multiple objects
    char* str1 = arena_alloc(arena, 20);
    int* arr = arena_alloc(arena, 10 * sizeof(int));
    double* dbl = arena_alloc(arena, sizeof(double));

    if (str1 && arr && dbl) {
        strcpy(str1, "Arena allocated");
        for (int i = 0; i < 10; i++) arr[i] = i * 2;
        *dbl = 3.14159;

        printf("String: %s\\n", str1);
        printf("Array[5]: %d\\n", arr[5]);
        printf("Double: %.2f\\n", *dbl);
        printf("Arena used: %zu/%zu bytes\\n", arena->used, arena->size);
    }

    // Reset arena (all allocations freed at once)
    arena_reset(arena);
    printf("Arena reset, used: %zu bytes\\n", arena->used);

    arena_destroy(arena);
    return 0;
}
\`\`\`

---

## 📊 Memory Usage Tracking

### Memory Statistics

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    size_t total_allocated;
    size_t current_used;
    size_t peak_used;
    size_t allocation_count;
    size_t free_count;
} MemoryStats;

static MemoryStats mem_stats = {0};

void* tracked_malloc(size_t size) {
    void* ptr = malloc(size);

    if (ptr != NULL) {
        mem_stats.total_allocated += size;
        mem_stats.current_used += size;
        mem_stats.peak_used = mem_stats.current_used > mem_stats.peak_used ?
                             mem_stats.current_used : mem_stats.peak_used;
        mem_stats.allocation_count++;
    }

    return ptr;
}

void tracked_free(void* ptr, size_t size) {
    if (ptr != NULL) {
        free(ptr);
        mem_stats.current_used -= size;
        mem_stats.free_count++;
    }
}

void print_memory_stats() {
    printf("\\nMemory Statistics:\\n");
    printf("  Total allocated: %zu bytes\\n", mem_stats.total_allocated);
    printf("  Current used: %zu bytes\\n", mem_stats.current_used);
    printf("  Peak used: %zu bytes\\n", mem_stats.peak_used);
    printf("  Allocations: %zu\\n", mem_stats.allocation_count);
    printf("  Frees: %zu\\n", mem_stats.free_count);
    printf("  Net allocations: %zu\\n",
           mem_stats.allocation_count - mem_stats.free_count);
}

#define TMALLOC(size) tracked_malloc(size)
#define TFREE(ptr, size) tracked_free(ptr, size)

int main() {
    // Simulate memory usage
    int* arr1 = TMALLOC(100 * sizeof(int));
    char* str1 = TMALLOC(50);
    double* arr2 = TMALLOC(20 * sizeof(double));

    print_memory_stats();

    TFREE(str1, 50);  // Free some memory

    print_memory_stats();

    TFREE(arr1, 100 * sizeof(int));
    TFREE(arr2, 20 * sizeof(double));

    print_memory_stats();

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Memory pools** reduce fragmentation and improve allocation speed
2. **Slab allocators** efficiently manage objects of the same size
3. **Arena allocators** provide fast allocation with bulk deallocation
4. **Alignment** is crucial for optimal memory access performance
5. **Structure padding** can be controlled with #pragma pack
6. **Memory debugging** techniques help detect corruption and leaks
7. **Tracking statistics** helps optimize memory usage patterns

---

## 🚀 Preview: Memory Debugging Tools

In the next topic, you'll learn about:
- **Valgrind** for comprehensive memory analysis
- **AddressSanitizer** for fast memory error detection
- **Memory leak detection** algorithms
- **Heap corruption** debugging techniques
- **Performance profiling** of memory operations

**Professional memory debugging is essential for robust C programs!** 🐛

