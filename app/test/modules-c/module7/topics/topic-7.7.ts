import { SubLesson } from '../../../data/lessonsData';

export const topic_7_7: SubLesson = {
  id: 7.7,
  title: 'typedef and Advanced Structure Concepts',
  status: 'completed',
  content: `# 🏆 typedef and Advanced Structure Concepts

Master advanced typedef patterns, bit fields, memory alignment, and other professional C programming techniques.

---

## 🎯 Advanced typedef Patterns

### typedef for Complex Types

\`\`\`c
#include <stdio.h>

// Function pointer typedef
typedef void (*CallbackFunction)(int, const char*);

// Structure typedef
typedef struct {
    char name[50];
    CallbackFunction callback;
} EventHandler;

// Array typedef
typedef int Vector3D[3];

// Pointer to function returning pointer typedef
typedef char* (*StringProcessor)(const char*);

void sample_callback(int code, const char* message) {
    printf("Callback: %d - %s\\n", code, message);
}

char* uppercase_processor(const char* input) {
    static char buffer[100];
    strcpy(buffer, input);
    // Convert to uppercase (simplified)
    for (char* p = buffer; *p; p++) {
        if (*p >= 'a' && *p <= 'z') {
            *p -= 32;
        }
    }
    return buffer;
}

int main() {
    EventHandler handler = {"sample", sample_callback};
    Vector3D vec = {1, 2, 3};
    StringProcessor processor = uppercase_processor;

    // Use typedefs
    handler.callback(200, "OK");

    printf("Vector: [%d, %d, %d]\\n", vec[0], vec[1], vec[2]);

    char* result = processor("hello world");
    printf("Processed: %s\\n", result);

    return 0;
}
\`\`\`

### typedef for Type Safety

\`\`\`c
#include <stdio.h>

// Create distinct types for better type safety
typedef int UserID;
typedef int ProductID;
typedef int OrderID;

void process_user(UserID id) {
    printf("Processing user %d\\n", id);
}

void process_product(ProductID id) {
    printf("Processing product %d\\n", id);
}

int main() {
    UserID user = 123;
    ProductID product = 456;

    process_user(user);
    process_product(product);

    // This would cause a warning (good!)
    // process_user(product);

    return 0;
}
\`\`\`

---

## 🔍 Bit Fields

### Basic Bit Fields

**Bit fields allow you to specify exactly how many bits each structure member should occupy.**

\`\`\`c
#include <stdio.h>

struct StatusFlags {
    unsigned int is_active : 1;    // 1 bit
    unsigned int is_admin : 1;     // 1 bit
    unsigned int priority : 2;     // 2 bits (0-3)
    unsigned int timeout : 4;      // 4 bits (0-15)
    unsigned int : 8;              // 8 unused bits
    unsigned int error_code : 16;  // 16 bits
};

int main() {
    struct StatusFlags flags = {0};

    flags.is_active = 1;
    flags.is_admin = 0;
    flags.priority = 3;
    flags.timeout = 10;
    flags.error_code = 404;

    printf("Active: %u\\n", flags.is_active);
    printf("Admin: %u\\n", flags.is_admin);
    printf("Priority: %u\\n", flags.priority);
    printf("Timeout: %u\\n", flags.timeout);
    printf("Error: %u\\n", flags.error_code);

    printf("Total size: %zu bytes\\n", sizeof(struct StatusFlags));

    return 0;
}
\`\`\`

### Bit Field Applications

\`\`\`c
#include <stdio.h>

// TCP header flags (simplified)
struct TCPFlags {
    unsigned int urg : 1;
    unsigned int ack : 1;
    unsigned int psh : 1;
    unsigned int rst : 1;
    unsigned int syn : 1;
    unsigned int fin : 1;
    unsigned int : 2;  // Padding to byte boundary
};

void print_flags(struct TCPFlags flags) {
    printf("URG:%u ACK:%u PSH:%u RST:%u SYN:%u FIN:%u\\n",
           flags.urg, flags.ack, flags.psh,
           flags.rst, flags.syn, flags.fin);
}

int main() {
    struct TCPFlags flags = {0};

    // SYN packet
    flags.syn = 1;
    print_flags(flags);

    // SYN-ACK packet
    flags.ack = 1;
    print_flags(flags);

    return 0;
}
\`\`\`

---

## 📏 Structure Padding and Alignment

### Understanding Padding

**Compilers add padding between structure members to optimize memory access.**

\`\`\`c
#include <stdio.h>

struct PaddedStruct {
    char c;      // 1 byte
    // 3 bytes padding (to align int on 4-byte boundary)
    int i;       // 4 bytes
    // No padding needed (char aligns to 1-byte boundary)
    char c2;     // 1 byte
    // 3 bytes padding (to align struct to int boundary)
};              // Total: 12 bytes

struct OptimizedStruct {
    int i;       // 4 bytes
    char c1;     // 1 byte
    char c2;     // 1 byte
    // 2 bytes padding
};              // Total: 8 bytes

int main() {
    printf("Padded struct: %zu bytes\\n", sizeof(struct PaddedStruct));
    printf("Optimized struct: %zu bytes\\n", sizeof(struct OptimizedStruct));

    return 0;
}
\`\`\`

### Manual Structure Packing

\`\`\`c
// GCC/Clang specific attribute
struct __attribute__((packed)) PackedStruct {
    char c;
    int i;
    char c2;
};

int main() {
    printf("Packed struct: %zu bytes\\n", sizeof(struct PackedStruct));

    // Usually 6 bytes instead of 12 with padding
    return 0;
}
\`\`\`

### Alignment Control

\`\`\`c
// Align structure to 16-byte boundary
struct __attribute__((aligned(16))) AlignedStruct {
    char c;
    int i;
};

int main() {
    struct AlignedStruct s;
    printf("Address: %p\\n", (void*)&s);
    printf("Size: %zu\\n", sizeof(struct AlignedStruct));

    return 0;
}
\`\`\`

---

## 🔧 Flexible Array Members (C99)

### Dynamic Arrays in Structures

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct String {
    size_t length;
    char data[];  // Flexible array member (no size specified)
};

struct String* create_string(const char* str) {
    size_t len = strlen(str);

    // Allocate space for struct + string data
    struct String* s = malloc(sizeof(struct String) + len + 1);

    if (s != NULL) {
        s->length = len;
        strcpy(s->data, str);
    }

    return s;
}

void destroy_string(struct String* s) {
    free(s);
}

int main() {
    struct String* str = create_string("Hello, flexible arrays!");

    if (str != NULL) {
        printf("Length: %zu\\n", str->length);
        printf("Content: %s\\n", str->data);

        destroy_string(str);
    }

    return 0;
}
\`\`\`

### Flexible Array Limitations

\`\`\`c
struct BadExample {
    int fixed_member;
    int flexible[];  // ❌ Must be last member
};

struct AlsoBad {
    int flexible1[];  // ❌ Only one flexible array allowed
    int flexible2[];
};

struct GoodExample {
    int fixed_member;
    int flexible[];   // ✅ Last member, only one
};
\`\`\`

---

## 🏗️ Advanced Structure Patterns

### Nested Structures with typedef

\`\`\`c
#include <stdio.h>

typedef struct Point {
    double x, y;
} Point;

typedef struct {
    Point center;
    double radius;
} Circle;

typedef struct {
    Point vertices[3];
    double area;
} Triangle;

double distance(const Point* p1, const Point* p2) {
    double dx = p1->x - p2->x;
    double dy = p1->y - p2->y;
    return sqrt(dx*dx + dy*dy);
}

int main() {
    Circle circle = {{0, 0}, 5.0};
    Triangle triangle = {{{0, 0}, {3, 0}, {1.5, 2.6}}, 3.9};

    printf("Circle center: (%.1f, %.1f), radius: %.1f\\n",
           circle.center.x, circle.center.y, circle.radius);

    printf("Triangle vertices:\\n");
    for (int i = 0; i < 3; i++) {
        printf("  (%.1f, %.1f)\\n",
               triangle.vertices[i].x, triangle.vertices[i].y);
    }

    return 0;
}
\`\`\`

### Opaque Pointers (Incomplete Types)

\`\`\`c
// Header file: database.h
#ifndef DATABASE_H
#define DATABASE_H

typedef struct Database Database;  // Incomplete type

Database* database_create(const char* filename);
void database_destroy(Database* db);
int database_insert(Database* db, const char* key, const char* value);
const char* database_get(Database* db, const char* key);

#endif
\`\`\`

\`\`\`c
// Implementation file: database.c
#include "database.h"
#include <stdlib.h>
#include <string.h>

// Complete definition (private)
struct Database {
    char filename[256];
    // Implementation details...
    int record_count;
};

Database* database_create(const char* filename) {
    Database* db = malloc(sizeof(Database));
    if (db != NULL) {
        strcpy(db->filename, filename);
        db->record_count = 0;
    }
    return db;
}

void database_destroy(Database* db) {
    free(db);
}

int database_insert(Database* db, const char* key, const char* value) {
    // Implementation...
    db->record_count++;
    return 1;
}

const char* database_get(Database* db, const char* key) {
    // Implementation...
    return "dummy_value";
}
\`\`\`

---

## 🎯 Structure Design Best Practices

### 1. Use typedef for Structure Types

\`\`\`c
// ✅ Good
typedef struct {
    char name[50];
    int age;
} Person;

// ❌ Bad - verbose
struct Person {
    char name[50];
    int age;
};

struct Person p;  // Annoying to type
\`\`\`

### 2. Order Members by Size (Alignment)

\`\`\`c
// ✅ Good - ordered by size for minimal padding
typedef struct {
    double d;    // 8 bytes
    int i;       // 4 bytes
    short s;     // 2 bytes
    char c;      // 1 byte
} Optimized;

// ❌ Bad - causes padding
typedef struct {
    char c;      // 1 byte
    double d;    // 8 bytes (with 7 bytes padding)
    short s;     // 2 bytes (with 6 bytes padding)
    int i;       // 4 bytes
} WastedSpace;
\`\`\`

### 3. Use Bit Fields for Flags

\`\`\`c
// ✅ Good - compact flags
typedef struct {
    unsigned int is_valid : 1;
    unsigned int is_admin : 1;
    unsigned int priority : 2;
    unsigned int : 4;  // Reserved
} CompactFlags;

// ❌ Bad - wastes space
typedef struct {
    int is_valid;      // 4 bytes instead of 1 bit
    int is_admin;      // 4 bytes instead of 1 bit
    int priority;      // 4 bytes instead of 2 bits
} WastefulFlags;
\`\`\`

### 4. Use Flexible Arrays for Variable Data

\`\`\`c
// ✅ Good - variable size string
typedef struct {
    size_t length;
    char data[];  // Flexible array
} FlexString;

// ❌ Bad - fixed maximum size
typedef struct {
    size_t length;
    char data[1024];  // Wastes space or limits size
} FixedString;
\`\`\`

---

## 🧪 Complete Examples

### Memory Pool with Advanced Structures

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE 4096

typedef struct __attribute__((packed)) {
    unsigned int is_free : 1;
    unsigned int size : 15;    // Up to 32KB blocks
    unsigned int prev_offset : 16;  // Offset to previous block
} BlockHeader;

typedef struct {
    char memory[POOL_SIZE];
    size_t used;
} MemoryPool;

void* pool_alloc(MemoryPool* pool, size_t size) {
    // Align size to 4-byte boundary
    size = (size + 3) & ~3;

    // Find free block
    size_t offset = 0;
    while (offset < pool->used) {
        BlockHeader* header = (BlockHeader*)&pool->memory[offset];

        if (header->is_free && header->size >= size) {
            // Split block if too large
            if (header->size > size + sizeof(BlockHeader)) {
                size_t remaining = header->size - size - sizeof(BlockHeader);
                size_t new_offset = offset + sizeof(BlockHeader) + size;

                BlockHeader* new_header = (BlockHeader*)&pool->memory[new_offset];
                new_header->is_free = 1;
                new_header->size = remaining;
                new_header->prev_offset = offset;

                header->size = size;
            }

            header->is_free = 0;
            return &pool->memory[offset + sizeof(BlockHeader)];
        }

        offset += sizeof(BlockHeader) + header->size;
    }

    return NULL;
}

void pool_free(MemoryPool* pool, void* ptr) {
    if (ptr == NULL) return;

    size_t offset = (char*)ptr - pool->memory - sizeof(BlockHeader);
    BlockHeader* header = (BlockHeader*)&pool->memory[offset];

    header->is_free = 1;

    // Coalesce with next block if free
    size_t next_offset = offset + sizeof(BlockHeader) + header->size;
    if (next_offset < pool->used) {
        BlockHeader* next_header = (BlockHeader*)&pool->memory[next_offset];
        if (next_header->is_free) {
            header->size += sizeof(BlockHeader) + next_header->size;
        }
    }
}

int main() {
    MemoryPool pool = {0};

    // Allocate some memory
    char* str1 = pool_alloc(&pool, 20);
    char* str2 = pool_alloc(&pool, 15);

    if (str1 && str2) {
        strcpy(str1, "Hello");
        strcpy(str2, "World");

        printf("%s %s\\n", str1, str2);

        pool_free(&pool, str1);
        pool_free(&pool, str2);
    }

    return 0;
}
\`\`\`

### Advanced typedef Patterns

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Complex typedef chain
typedef void* GenericPtr;
typedef GenericPtr (*Allocator)(size_t);
typedef void (*Deallocator)(GenericPtr);

// Function that takes functions as parameters
typedef void (*ForEachFunc)(void* element, void* context);

typedef struct {
    void** elements;
    size_t count;
    size_t capacity;
    Allocator alloc;
    Deallocator dealloc;
} DynamicArray;

void* default_alloc(size_t size) { return malloc(size); }
void default_dealloc(void* ptr) { free(ptr); }

DynamicArray* create_array(Allocator alloc, Deallocator dealloc) {
    DynamicArray* arr = alloc(sizeof(DynamicArray));
    if (arr != NULL) {
        arr->elements = NULL;
        arr->count = 0;
        arr->capacity = 0;
        arr->alloc = alloc ? alloc : default_alloc;
        arr->dealloc = dealloc ? dealloc : default_dealloc;
    }
    return arr;
}

int array_append(DynamicArray* arr, void* element) {
    if (arr->count >= arr->capacity) {
        size_t new_capacity = arr->capacity == 0 ? 4 : arr->capacity * 2;
        void** new_elements = arr->alloc(new_capacity * sizeof(void*));

        if (new_elements == NULL) return 0;

        if (arr->elements != NULL) {
            memcpy(new_elements, arr->elements, arr->count * sizeof(void*));
            arr->dealloc(arr->elements);
        }

        arr->elements = new_elements;
        arr->capacity = new_capacity;
    }

    arr->elements[arr->count++] = element;
    return 1;
}

void array_foreach(const DynamicArray* arr, ForEachFunc func, void* context) {
    for (size_t i = 0; i < arr->count; i++) {
        func(arr->elements[i], context);
    }
}

void destroy_array(DynamicArray* arr) {
    if (arr != NULL) {
        arr->dealloc(arr->elements);
        arr->dealloc(arr);
    }
}

// Example usage
void print_int(void* element, void* context) {
    printf("%d ", *(int*)element);
}

int main() {
    DynamicArray* arr = create_array(NULL, NULL);

    if (arr != NULL) {
        // Add some integers
        int* nums[5];
        for (int i = 0; i < 5; i++) {
            nums[i] = malloc(sizeof(int));
            *nums[i] = i * 10;
            array_append(arr, nums[i]);
        }

        // Print them
        array_foreach(arr, print_int, NULL);
        printf("\\n");

        destroy_array(arr);

        // Clean up individual elements
        for (int i = 0; i < 5; i++) {
            free(nums[i]);
        }
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **typedef** creates aliases for complex types and improves readability
2. **Bit fields** save memory by packing multiple flags into single bytes
3. **Structure padding** affects memory layout and performance
4. **Flexible array members** allow variable-sized structures
5. **Attribute specifiers** control alignment and packing
6. **Opaque pointers** hide implementation details
7. **Order members by size** to minimize padding

---

## 🚀 Module 7 Complete!

**Congratulations!** You've mastered structures and unions in C:

- ✅ **Structure introduction** and basic concepts
- ✅ **Declaration and definition** with complete syntax
- ✅ **Member access** using dot and arrow operators
- ✅ **Initialization** techniques (basic, designated, nested)
- ✅ **Structures and functions** (pass by value/reference, function pointers)
- ✅ **Unions** for memory-efficient data storage
- ✅ **Advanced concepts** (typedef, bit fields, padding, flexible arrays)

**Ready for Module 8: File I/O?** Files allow your programs to persist data and interact with the file system! 💾

