import { SubLesson } from '../../../data/lessonsData';

export const topic_10_4: SubLesson = {
  id: 10.4,
  title: 'Memory Fragmentation',
  status: 'completed',
  content: `# 🧩 Memory Fragmentation

Master memory fragmentation causes, effects, and mitigation strategies for efficient memory utilization in long-running C programs.

---

## 🎯 Understanding Fragmentation

### What is Memory Fragmentation?

**Memory fragmentation occurs when free memory is divided into small, non-contiguous blocks, making it difficult to allocate large contiguous memory regions.**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define ALLOC_COUNT 100

int main() {
    void* pointers[ALLOC_COUNT];

    // Allocate alternating small/large blocks
    for (int i = 0; i < ALLOC_COUNT; i++) {
        if (i % 2 == 0) {
            pointers[i] = malloc(100);  // Small block
        } else {
            pointers[i] = malloc(1000); // Large block
        }
    }

    // Free every other block (creating holes)
    for (int i = 0; i < ALLOC_COUNT; i += 2) {
        free(pointers[i]);
        pointers[i] = NULL;
    }

    // Try to allocate a large block
    void* large_block = malloc(2000);

    if (large_block == NULL) {
        printf("Failed to allocate 2000 bytes despite having enough free memory!\\n");
        printf("This is fragmentation - free memory is scattered.\\n");
    }

    // Cleanup
    for (int i = 0; i < ALLOC_COUNT; i++) {
        free(pointers[i]);
    }
    free(large_block);

    return 0;
}
\`\`\`

### Types of Fragmentation

#### External Fragmentation
- Free memory exists but is scattered in small chunks
- Cannot satisfy large allocation requests
- Common in heap allocators

#### Internal Fragmentation
- Allocated blocks waste space due to alignment requirements
- Memory is allocated but not fully utilized
- Caused by fixed block sizes in allocators

---

## 🛠️ Defragmentation Strategies

### Compaction Algorithm

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* heap;
    size_t heap_size;
    size_t* allocation_table;
    size_t table_size;
} CompactingHeap;

void heap_init(CompactingHeap* heap, size_t size) {
    heap->heap = malloc(size);
    heap->heap_size = size;
    heap->allocation_table = calloc(100, sizeof(size_t)); // Simplified
    heap->table_size = 100;
}

void* heap_alloc(CompactingHeap* heap, size_t size) {
    // Find free space (simplified)
    static size_t offset = 0;

    if (offset + size > heap->heap_size) {
        return NULL; // Out of memory
    }

    void* ptr = heap->heap + offset;
    offset += size;

    return ptr;
}

void heap_compact(CompactingHeap* heap) {
    // Simplified compaction: move all allocations to front
    char* new_heap = malloc(heap->heap_size);
    size_t new_offset = 0;

    // In a real implementation, you'd track all live objects
    // and update their pointers during compaction

    // For demonstration, just copy everything
    memcpy(new_heap, heap->heap, heap->heap_size);

    free(heap->heap);
    heap->heap = new_heap;

    printf("Heap compacted\\n");
}

void heap_destroy(CompactingHeap* heap) {
    free(heap->heap);
    free(heap->allocation_table);
}
\`\`\`

### Memory Pool with Defragmentation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 4096
#define BLOCK_SIZE 64

typedef struct {
    char pool[POOL_SIZE];
    char used[POOL_SIZE / BLOCK_SIZE];
    int fragmentation_threshold;
} DefragPool;

void pool_init(DefragPool* pool) {
    memset(pool->used, 0, sizeof(pool->used));
    pool->fragmentation_threshold = 50; // 50% fragmentation triggers defrag
}

void* pool_alloc(DefragPool* pool, size_t size) {
    if (size > BLOCK_SIZE) return NULL;

    // Check fragmentation
    int free_blocks = 0;
    int total_blocks = POOL_SIZE / BLOCK_SIZE;

    for (int i = 0; i < total_blocks; i++) {
        if (!pool->used[i]) free_blocks++;
    }

    float fragmentation = (float)free_blocks / total_blocks * 100;
    if (fragmentation > pool->fragmentation_threshold) {
        pool_defragment(pool);
    }

    // Find contiguous free blocks
    for (int i = 0; i < total_blocks; i++) {
        if (!pool->used[i]) {
            pool->used[i] = 1;
            return &pool->pool[i * BLOCK_SIZE];
        }
    }

    return NULL;
}

void pool_defragment(DefragPool* pool) {
    printf("Defragmenting pool...\\n");

    char temp[POOL_SIZE];
    int write_idx = 0;

    // Move all used blocks to front
    for (int i = 0; i < POOL_SIZE / BLOCK_SIZE; i++) {
        if (pool->used[i]) {
            memcpy(&temp[write_idx * BLOCK_SIZE],
                   &pool->pool[i * BLOCK_SIZE], BLOCK_SIZE);
            pool->used[write_idx] = 1;
            write_idx++;
        }
    }

    // Clear remaining used flags
    for (int i = write_idx; i < POOL_SIZE / BLOCK_SIZE; i++) {
        pool->used[i] = 0;
    }

    memcpy(pool->pool, temp, POOL_SIZE);
}
\`\`\`

---

## 🎯 Allocation Strategies

### Best-Fit vs First-Fit

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Block {
    size_t size;
    int free;
    struct Block* next;
} Block;

Block* heap_start = NULL;

// First-fit: Return first block that's big enough
Block* first_fit(size_t size) {
    Block* current = heap_start;

    while (current) {
        if (current->free && current->size >= size) {
            return current;
        }
        current = current->next;
    }

    return NULL;
}

// Best-fit: Find smallest block that's big enough
Block* best_fit(size_t size) {
    Block* current = heap_start;
    Block* best = NULL;

    while (current) {
        if (current->free && current->size >= size) {
            if (best == NULL || current->size < best->size) {
                best = current;
            }
        }
        current = current->next;
    }

    return best;
}

void* allocate(size_t size, Block* (*strategy)(size_t)) {
    Block* block = strategy(size + sizeof(Block));

    if (block == NULL) return NULL;

    // Split block if too large
    if (block->size > size + sizeof(Block) + 64) {
        Block* new_block = (Block*)((char*)block + sizeof(Block) + size);
        new_block->size = block->size - size - sizeof(Block);
        new_block->free = 1;
        new_block->next = block->next;

        block->size = size;
        block->next = new_block;
    }

    block->free = 0;
    return (char*)block + sizeof(Block);
}
\`\`\`

### Buddy System

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX_ORDER 10  // 2^10 = 1024 bytes max block

typedef struct {
    void* blocks[MAX_ORDER + 1][32];  // Free lists for each order
    char* memory_pool;
    size_t pool_size;
} BuddyAllocator;

void buddy_init(BuddyAllocator* buddy, size_t size) {
    buddy->pool_size = size;
    buddy->memory_pool = malloc(size);

    // Initialize all blocks as free in largest order
    for (int i = 0; i <= MAX_ORDER; i++) {
        for (int j = 0; j < 32; j++) {
            buddy->blocks[i][j] = NULL;
        }
    }

    // Add entire pool as one large block
    buddy->blocks[MAX_ORDER][0] = buddy->memory_pool;
}

int get_order(size_t size) {
    int order = 0;
    size_t block_size = 1;

    while (block_size < size) {
        block_size *= 2;
        order++;
    }

    return order;
}

void* buddy_alloc(BuddyAllocator* buddy, size_t size) {
    int order = get_order(size);

    // Find smallest available block that fits
    for (int current_order = order; current_order <= MAX_ORDER; current_order++) {
        if (buddy->blocks[current_order][0] != NULL) {
            // Found a block, split it down to required size
            void* block = buddy->blocks[current_order][0];
            buddy->blocks[current_order][0] = NULL;

            // Split down to required order
            for (int o = current_order; o > order; o--) {
                size_t split_size = 1 << (o - 1);  // 2^(o-1)
                void* buddy_block = (char*)block + split_size;

                // Add buddy to free list
                buddy->blocks[o - 1][0] = buddy_block;
            }

            return block;
        }
    }

    return NULL;  // No suitable block found
}

void buddy_free(BuddyAllocator* buddy, void* ptr) {
    // Simplified: just mark as free
    // Real implementation would coalesce buddies
    printf("Freed block at %p\\n", ptr);
}
\`\`\`

---

## 🗂️ Virtual Memory Concepts

### Memory-Mapped Files

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

#ifdef _WIN32
#include <windows.h>
#endif

void* map_file(const char* filename, size_t* size) {
#ifdef _WIN32
    HANDLE file = CreateFile(filename, GENERIC_READ, FILE_SHARE_READ,
                           NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL);

    if (file == INVALID_HANDLE_VALUE) return NULL;

    HANDLE mapping = CreateFileMapping(file, NULL, PAGE_READONLY, 0, 0, NULL);
    if (mapping == NULL) {
        CloseHandle(file);
        return NULL;
    }

    void* data = MapViewOfFile(mapping, FILE_MAP_READ, 0, 0, 0);
    CloseHandle(mapping);
    CloseHandle(file);

    // Get file size
    WIN32_FILE_ATTRIBUTE_DATA attrs;
    GetFileAttributesEx(filename, GetFileExInfoStandard, &attrs);
    *size = attrs.nFileSizeLow;

    return data;
#else
    int fd = open(filename, O_RDONLY);
    if (fd == -1) return NULL;

    // Get file size
    struct stat st;
    fstat(fd, &st);
    *size = st.st_size;

    // Map file into memory
    void* data = mmap(NULL, *size, PROT_READ, MAP_PRIVATE, fd, 0);
    close(fd);

    if (data == MAP_FAILED) return NULL;

    return data;
#endif
}

void unmap_file(void* data, size_t size) {
#ifdef _WIN32
    UnmapViewOfFile(data);
#else
    munmap(data, size);
#endif
}

int main() {
    size_t file_size;
    void* file_data = map_file("large_file.dat", &file_size);

    if (file_data != NULL) {
        printf("File mapped at %p, size %zu bytes\\n", file_data, file_size);

        // Access file data as if it were in memory
        char* content = (char*)file_data;
        printf("First 100 chars: %.100s\\n", content);

        unmap_file(file_data, file_size);
    }

    return 0;
}
\`\`\`

---

## 🎯 Fragmentation Prevention

### Allocation Patterns

\`\`\`c
// 1. Allocate similar-sized objects together
typedef struct {
    int data[100];
} LargeObject;

void allocate_similar_objects() {
    // Allocate many objects of same size
    LargeObject* objects[1000];

    for (int i = 0; i < 1000; i++) {
        objects[i] = malloc(sizeof(LargeObject));
    }

    // Use objects...

    // Free in reverse order (reduces fragmentation)
    for (int i = 999; i >= 0; i--) {
        free(objects[i]);
    }
}

// 2. Use memory pools for frequent allocations
typedef struct {
    char* pool;
    size_t object_size;
    char* free_list;
} ObjectPool;

ObjectPool* pool_create(size_t object_size, size_t count) {
    ObjectPool* pool = malloc(sizeof(ObjectPool));
    pool->pool = malloc(object_size * count);
    pool->object_size = object_size;

    // Initialize free list
    pool->free_list = pool->pool;
    for (size_t i = 0; i < count - 1; i++) {
        char* current = pool->pool + i * object_size;
        *(char**)current = current + object_size;
    }
    *(char**)(pool->pool + (count - 1) * object_size) = NULL;

    return pool;
}

void* pool_allocate(ObjectPool* pool) {
    if (pool->free_list == NULL) return NULL;

    void* obj = pool->free_list;
    pool->free_list = *(char**)pool->free_list;

    return obj;
}

void pool_free(ObjectPool* pool, void* obj) {
    *(char**)obj = pool->free_list;
    pool->free_list = obj;
}
\`\`\`

---

## 🧪 Complete Fragmentation Example

### Fragmentation Analyzer

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define HEAP_SIZE 1024 * 1024  // 1MB heap
#define ALLOCATION_COUNT 10000

typedef struct Allocation {
    void* ptr;
    size_t size;
    struct Allocation* next;
} Allocation;

typedef struct {
    char heap[HEAP_SIZE];
    Allocation* allocations;
    size_t used;
} FragmentationAnalyzer;

void analyzer_init(FragmentationAnalyzer* analyzer) {
    analyzer->allocations = NULL;
    analyzer->used = 0;
}

void* analyzer_alloc(FragmentationAnalyzer* analyzer, size_t size) {
    if (analyzer->used + size > HEAP_SIZE) {
        return NULL;  // Out of memory
    }

    void* ptr = &analyzer->heap[analyzer->used];
    analyzer->used += size;

    // Record allocation
    Allocation* alloc = malloc(sizeof(Allocation));
    alloc->ptr = ptr;
    alloc->size = size;
    alloc->next = analyzer->allocations;
    analyzer->allocations = alloc;

    return ptr;
}

void analyzer_free(FragmentationAnalyzer* analyzer, void* ptr) {
    // Find and remove allocation record
    Allocation* prev = NULL;
    Allocation* curr = analyzer->allocations;

    while (curr) {
        if (curr->ptr == ptr) {
            if (prev) {
                prev->next = curr->next;
            } else {
                analyzer->allocations = curr->next;
            }
            free(curr);
            return;
        }
        prev = curr;
        curr = curr->next;
    }
}

double calculate_fragmentation(FragmentationAnalyzer* analyzer) {
    size_t total_free = HEAP_SIZE - analyzer->used;
    if (total_free == 0) return 0.0;

    // In a real implementation, you'd analyze free block sizes
    // For simplicity, return a basic metric
    Allocation* alloc = analyzer->allocations;
    size_t largest_free_block = 0;
    size_t current_free_start = 0;

    // Simplified: assume one large free block at end
    largest_free_block = HEAP_SIZE - analyzer->used;

    return (double)largest_free_block / total_free;
}

void run_fragmentation_test() {
    FragmentationAnalyzer analyzer;
    analyzer_init(&analyzer);

    srand(time(NULL));

    // Simulate random allocations and deallocations
    void* pointers[ALLOCATION_COUNT] = {0};
    int alloc_count = 0;

    for (int i = 0; i < 100000; i++) {
        int action = rand() % 3;

        if (action == 0 && alloc_count < ALLOCATION_COUNT) {
            // Allocate
            size_t size = (rand() % 1000) + 1;
            void* ptr = analyzer_alloc(&analyzer, size);

            if (ptr != NULL) {
                pointers[alloc_count++] = ptr;
            }

        } else if (action == 1 && alloc_count > 0) {
            // Free random allocation
            int index = rand() % alloc_count;
            if (pointers[index] != NULL) {
                analyzer_free(&analyzer, pointers[index]);
                pointers[index] = NULL;

                // Compact array
                for (int j = index; j < alloc_count - 1; j++) {
                    pointers[j] = pointers[j + 1];
                }
                alloc_count--;
            }
        }

        // Periodically check fragmentation
        if (i % 10000 == 0) {
            double frag = calculate_fragmentation(&analyzer);
            printf("Iteration %d: Used %zu/%d bytes, Fragmentation: %.2f\\n",
                   i, analyzer.used, HEAP_SIZE, frag);
        }
    }

    // Cleanup
    Allocation* curr = analyzer.allocations;
    while (curr) {
        Allocation* next = curr->next;
        free(curr);
        curr = next;
    }
}

int main() {
    run_fragmentation_test();
    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Fragmentation** prevents allocation of large contiguous blocks
2. **Defragmentation** compacts memory to reduce fragmentation
3. **Memory pools** reduce fragmentation for frequent allocations
4. **Allocation strategies** (best-fit, first-fit) affect fragmentation
5. **Virtual memory** and memory mapping help manage large datasets
6. **Prevention** through careful allocation patterns is most effective

---

## 🚀 Preview: Memory Management Libraries

In the next topic, you'll learn about:
- **Standard library** memory functions (malloc, calloc, realloc, free)
- **Third-party libraries** (jemalloc, tcmalloc, mimalloc)
- **POSIX memory management** functions
- **Memory advice** and optimization hints
- **NUMA-aware** memory allocation

**Professional memory management requires understanding available tools!** 🛠️

