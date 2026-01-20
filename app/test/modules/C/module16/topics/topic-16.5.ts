import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_5: SubLesson = {
  id: '16.5',
  title: 'Performance Optimization Techniques',
  status: 'demo',
  content: `# Performance Optimization Techniques in C

## Profiling and Benchmarking

### High-Resolution Timing
\`\`\`c
#include <time.h>
#include <stdio.h>

// Cross-platform high-resolution timer
typedef struct {
    struct timespec start_time;
    struct timespec end_time;
} HighResTimer;

void timer_start(HighResTimer *timer) {
    clock_gettime(CLOCK_MONOTONIC, &timer->start_time);
}

double timer_elapsed(const HighResTimer *timer) {
    struct timespec current;
    clock_gettime(CLOCK_MONOTONIC, &current);

    double start_sec = timer->start_time.tv_sec +
                      timer->start_time.tv_nsec / 1e9;
    double current_sec = current.tv_sec +
                        current.tv_nsec / 1e9;

    return current_sec - start_sec;
}

double timer_stop(HighResTimer *timer) {
    clock_gettime(CLOCK_MONOTONIC, &timer->end_time);

    double start_sec = timer->start_time.tv_sec +
                      timer->start_time.tv_nsec / 1e9;
    double end_sec = timer->end_time.tv_sec +
                    timer->end_time.tv_nsec / 1e9;

    return end_sec - start_sec;
}

// Benchmarking function
typedef void (*BenchmarkFunc)(void);

double benchmark_function(BenchmarkFunc func, int iterations) {
    HighResTimer timer;
    timer_start(&timer);

    for (int i = 0; i < iterations; i++) {
        func();
    }

    return timer_stop(&timer) / iterations;
}

// Example usage
void test_function(void) {
    volatile int sum = 0;
    for (int i = 0; i < 1000; i++) {
        sum += i * i;
    }
}

int main() {
    double avg_time = benchmark_function(test_function, 1000);
    printf("Average execution time: %.6f seconds\\n", avg_time);

    return 0;
}
\`\`\`

### Performance Counters (Linux)
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/perf_event.h>
#include <asm/unistd.h>

// Performance counter reading
static long perf_event_open(struct perf_event_attr *hw_event, pid_t pid,
                           int cpu, int group_fd, unsigned long flags) {
    return syscall(__NR_perf_event_open, hw_event, pid, cpu, group_fd, flags);
}

typedef struct {
    int fd;
    unsigned long long prev_count;
} PerfCounter;

int perf_counter_init(PerfCounter *counter, int type, int config) {
    struct perf_event_attr pe = {
        .type = type,
        .size = sizeof(struct perf_event_attr),
        .config = config,
        .disabled = 1,
        .exclude_kernel = 1,
        .exclude_hv = 1
    };

    counter->fd = perf_event_open(&pe, 0, -1, -1, 0);
    if (counter->fd == -1) return -1;

    counter->prev_count = 0;
    return 0;
}

unsigned long long perf_counter_read(PerfCounter *counter) {
    unsigned long long count;
    read(counter->fd, &count, sizeof(count));
    unsigned long long result = count - counter->prev_count;
    counter->prev_count = count;
    return result;
}

void perf_counter_start(PerfCounter *counter) {
    ioctl(counter->fd, PERF_EVENT_IOC_RESET, 0);
    ioctl(counter->fd, PERF_EVENT_IOC_ENABLE, 0);
}

void perf_counter_stop(PerfCounter *counter) {
    ioctl(counter->fd, PERF_EVENT_IOC_DISABLE, 0);
}

void perf_counter_close(PerfCounter *counter) {
    close(counter->fd);
}

// Usage
int main() {
    PerfCounter cycles, instructions;

    if (perf_counter_init(&cycles, PERF_TYPE_HARDWARE, PERF_COUNT_HW_CPU_CYCLES) == 0 &&
        perf_counter_init(&instructions, PERF_TYPE_HARDWARE, PERF_COUNT_HW_INSTRUCTIONS) == 0) {

        perf_counter_start(&cycles);
        perf_counter_start(&instructions);

        // Code to profile
        volatile int sum = 0;
        for (int i = 0; i < 1000000; i++) {
            sum += i;
        }

        perf_counter_stop(&cycles);
        perf_counter_stop(&instructions);

        unsigned long long cycle_count = perf_counter_read(&cycles);
        unsigned long long inst_count = perf_counter_read(&instructions);

        printf("CPU Cycles: %llu\\n", cycle_count);
        printf("Instructions: %llu\\n", inst_count);
        printf("CPI: %.2f\\n", (double)cycle_count / inst_count);

        perf_counter_close(&cycles);
        perf_counter_close(&instructions);
    }

    return 0;
}
\`\`\`

## Algorithm Optimization

### Cache-Friendly Data Structures
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Cache-aligned structure
#define CACHE_LINE_SIZE 64

typedef struct {
    char padding[CACHE_LINE_SIZE];  // Cache line alignment
} CacheAligned;

#define CACHE_ALIGNED __attribute__((aligned(CACHE_LINE_SIZE)))

// Cache-friendly linked list (unrolled)
typedef struct ListNode {
    int data[8];  // Process 8 elements at once
    struct ListNode *next;
} CACHE_ALIGNED ListNode;

typedef struct {
    ListNode *head;
    size_t size;
} FastList;

// Cache-friendly matrix operations
void matrix_multiply_cache_friendly(const double *A, const double *B,
                                   double *C, int n) {
    // Blocked matrix multiplication for cache efficiency
    const int BLOCK_SIZE = 64;  // L1 cache size consideration

    for (int ii = 0; ii < n; ii += BLOCK_SIZE) {
        for (int jj = 0; jj < n; jj += BLOCK_SIZE) {
            for (int kk = 0; kk < n; kk += BLOCK_SIZE) {
                // Process blocks
                for (int i = ii; i < ii + BLOCK_SIZE && i < n; i++) {
                    for (int j = jj; j < jj + BLOCK_SIZE && j < n; j++) {
                        double sum = C[i * n + j];
                        for (int k = kk; k < kk + BLOCK_SIZE && k < n; k++) {
                            sum += A[i * n + k] * B[k * n + j];
                        }
                        C[i * n + j] = sum;
                    }
                }
            }
        }
    }
}

// Structure of arrays vs Array of structures
typedef struct {
    double x[1000];
    double y[1000];
    double z[1000];
} CACHE_ALIGNED PointsSoA;  // Structure of Arrays - cache friendly

typedef struct {
    double x, y, z;
} Point;

typedef struct {
    Point points[1000];
} PointsAoS;  // Array of Structures - less cache friendly

// Process points using SoA (better cache performance)
void process_points_soa(const PointsSoA *points) {
    double sum_x = 0, sum_y = 0, sum_z = 0;

    for (int i = 0; i < 1000; i++) {
        sum_x += points->x[i];
        sum_y += points->y[i];
        sum_z += points->z[i];
    }

    printf("Sums: %.2f, %.2f, %.2f\\n", sum_x, sum_y, sum_z);
}
\`\`\`

### Branch Prediction Optimization
\`\`\`c
#include <stdint.h>

// Branchless absolute value
int fast_abs(int x) {
    int mask = x >> (sizeof(int) * 8 - 1);
    return (x ^ mask) - mask;
}

// Branchless min/max
int fast_min(int a, int b) {
    return b ^ ((a ^ b) & -(a < b));
}

int fast_max(int a, int b) {
    return a ^ ((a ^ b) & -(a < b));
}

// Branchless sign function
int fast_sign(int x) {
    return (x > 0) - (x < 0);
}

// Lookup table for expensive operations
#define SIN_TABLE_SIZE 1024
static double sin_table[SIN_TABLE_SIZE];

void init_sin_table(void) {
    for (int i = 0; i < SIN_TABLE_SIZE; i++) {
        double angle = (double)i / SIN_TABLE_SIZE * 2 * M_PI;
        sin_table[i] = sin(angle);
    }
}

double fast_sin(double angle) {
    // Normalize angle to [0, 2π)
    angle = fmod(angle, 2 * M_PI);
    if (angle < 0) angle += 2 * M_PI;

    // Lookup in table
    int index = (int)(angle / (2 * M_PI) * SIN_TABLE_SIZE) % SIN_TABLE_SIZE;
    return sin_table[index];
}

// Conditional move instead of branch
int array_sum_conditional(const int *array, size_t size, int threshold) {
    int sum = 0;
    for (size_t i = 0; i < size; i++) {
        // Avoid branch by using conditional move
        int value = array[i];
        int add_value = (value > threshold) ? value : 0;
        sum += add_value;
    }
    return sum;
}
\`\`\`

## Memory Access Optimization

### Prefetching
\`\`\`c
#include <xmmintrin.h>  // SSE intrinsics

// Software prefetch
void process_with_prefetch(int *data, size_t size) {
    const size_t PREFETCH_DISTANCE = 16;  // Prefetch 16 elements ahead

    for (size_t i = 0; i < size; i++) {
        if (i + PREFETCH_DISTANCE < size) {
            // Prefetch next cache line
            __builtin_prefetch(&data[i + PREFETCH_DISTANCE], 0, 3);
        }

        // Process current element
        data[i] *= 2;
    }
}

// Hardware prefetch with intrinsics (x86)
#include <immintrin.h>

void process_with_prefetch_intrin(float *data, size_t size) {
    for (size_t i = 0; i < size; i += 8) {
        // Prefetch next cache line
        _mm_prefetch((char *)&data[i + 16], _MM_HINT_T0);

        // Process 8 floats at once
        __m256 vec = _mm256_load_ps(&data[i]);
        vec = _mm256_mul_ps(vec, _mm256_set1_ps(2.0f));
        _mm256_store_ps(&data[i], vec);
    }
}
\`\`\`

### Memory Pool for Frequent Allocations
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Object pool for frequent allocations/deallocations
typedef struct PoolNode {
    struct PoolNode *next;
} PoolNode;

typedef struct {
    PoolNode *free_list;
    size_t object_size;
    size_t pool_size;
    void *pool_memory;
} ObjectPool;

void pool_init(ObjectPool *pool, size_t object_size, size_t pool_size) {
    pool->object_size = object_size;
    pool->pool_size = pool_size;

    // Allocate pool memory
    pool->pool_memory = malloc(pool_size * (sizeof(PoolNode) + object_size));
    pool->free_list = NULL;

    // Initialize free list
    char *current = (char *)pool->pool_memory;
    for (size_t i = 0; i < pool_size; i++) {
        PoolNode *node = (PoolNode *)current;
        node->next = pool->free_list;
        pool->free_list = node;
        current += sizeof(PoolNode) + object_size;
    }
}

void *pool_alloc(ObjectPool *pool) {
    if (!pool->free_list) return NULL;

    PoolNode *node = pool->free_list;
    pool->free_list = node->next;

    return (char *)node + sizeof(PoolNode);
}

void pool_free(ObjectPool *pool, void *ptr) {
    if (!ptr) return;

    PoolNode *node = (PoolNode *)((char *)ptr - sizeof(PoolNode));
    node->next = pool->free_list;
    pool->free_list = node;
}

void pool_destroy(ObjectPool *pool) {
    free(pool->pool_memory);
    pool->pool_memory = NULL;
    pool->free_list = NULL;
}

// Usage for particle system
typedef struct {
    float x, y, z;
    float vx, vy, vz;
    int active;
} Particle;

#define MAX_PARTICLES 10000

int main() {
    ObjectPool particle_pool;
    pool_init(&particle_pool, sizeof(Particle), MAX_PARTICLES);

    // Create particles (fast allocation)
    Particle *particles[MAX_PARTICLES];
    for (int i = 0; i < 1000; i++) {
        particles[i] = pool_alloc(&particle_pool);
        if (particles[i]) {
            particles[i]->x = rand() % 100;
            particles[i]->y = rand() % 100;
            particles[i]->active = 1;
        }
    }

    // Simulate and free inactive particles
    for (int i = 0; i < 1000; i++) {
        if (particles[i] && particles[i]->x > 50) {
            particles[i]->active = 0;
            pool_free(&particle_pool, particles[i]);
        }
    }

    pool_destroy(&particle_pool);
    return 0;
}
\`\`\`

## Compiler Optimization Flags

### GCC Optimization Levels
\`\`\`bash
# Different optimization levels
gcc -O0 file.c -o program      # No optimization
gcc -O1 file.c -o program      # Basic optimization
gcc -O2 file.c -o program      # Advanced optimization
gcc -O3 file.c -o program      # Aggressive optimization
gcc -Os file.c -o program      # Optimize for size
gcc -Ofast file.c -o program   # Fastest (may break standards)

# Architecture-specific optimizations
gcc -march=native file.c -o program    # Optimize for current CPU
gcc -mtune=generic file.c -o program   # Generic tuning

# Profile-guided optimization
gcc -fprofile-generate file.c -o program
./program  # Run to generate profile
gcc -fprofile-use file.c -o program     # Recompile with profile

# Link-time optimization
gcc -flto file.c -o program
\`\`\`

### Function and Variable Attributes
\`\`\`c
// Hot function (likely to be called frequently)
__attribute__((hot))
void frequently_called_function(int *data, size_t size) {
    for (size_t i = 0; i < size; i++) {
        data[i] *= 2;
    }
}

// Cold function (unlikely to be called)
__attribute__((cold))
void error_handler(const char *message) {
    fprintf(stderr, "Error: %s\\n", message);
}

// Function that doesn't return
__attribute__((noreturn))
void fatal_error(const char *message) {
    fprintf(stderr, "Fatal: %s\\n", message);
    exit(1);
}

// Pure function (no side effects)
__attribute__((pure))
size_t safe_strlen(const char *str) {
    if (!str) return 0;
    return strlen(str);
}

// Const function (no side effects, no global access)
__attribute__((const))
int multiply_by_two(int x) {
    return x * 2;
}

// Force inline
__attribute__((always_inline))
inline int fast_clamp(int value, int min, int max) {
    return value < min ? min : value > max ? max : value;
}

// Aligned data
__attribute__((aligned(64)))
char cache_line_buffer[64];
\`\`\`

## SIMD Vectorization

### GCC Auto-Vectorization
\`\`\`c
// Code that GCC can auto-vectorize
void vector_add(const float *a, const float *b, float *result, size_t n) {
    for (size_t i = 0; i < n; i++) {
        result[i] = a[i] + b[i];
    }
}

// Help compiler vectorize with pragmas
#pragma GCC optimize("tree-vectorize")
void vectorized_function(float *data, size_t n) {
    #pragma omp simd
    for (size_t i = 0; i < n; i++) {
        data[i] = data[i] * data[i] + 1.0f;
    }
}
\`\`\`

### Manual SIMD with Intrinsics
\`\`\`c
#include <immintrin.h>

// AVX vector addition
void avx_vector_add(const float *a, const float *b, float *result, size_t n) {
    size_t i = 0;

    // Process 8 floats at a time with AVX
    for (; i + 8 <= n; i += 8) {
        __m256 va = _mm256_load_ps(&a[i]);
        __m256 vb = _mm256_load_ps(&b[i]);
        __m256 vr = _mm256_add_ps(va, vb);
        _mm256_store_ps(&result[i], vr);
    }

    // Handle remaining elements
    for (; i < n; i++) {
        result[i] = a[i] + b[i];
    }
}

// SSE string processing
size_t fast_strchr_count(const char *str, char target) {
    size_t count = 0;
    __m128i target_vec = _mm_set1_epi8(target);

    for (size_t i = 0; str[i]; i += 16) {
        __m128i data = _mm_loadu_si128((const __m128i *)&str[i]);
        __m128i cmp = _mm_cmpeq_epi8(data, target_vec);
        count += __builtin_popcount(_mm_movemask_epi8(cmp));
    }

    return count;
}
\`\`\`

Performance optimization in C involves profiling, algorithm selection, cache-friendly data structures, branch prediction optimization, and leveraging compiler features and SIMD instructions for maximum efficiency.`
};

