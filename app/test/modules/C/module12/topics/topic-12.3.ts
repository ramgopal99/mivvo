import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_3: SubLesson = {
  id: '12.3',
  title: 'Performance Analysis and Optimization',
  status: 'demo',
  content: `# Performance Analysis and Optimization

## Thread Performance Metrics

### Latency vs Throughput
- **Latency**: Time for single operation to complete
- **Throughput**: Number of operations per unit time
- **Trade-offs**: Often optimize for one at expense of other

### Profiling Threaded Applications

#### Timing Functions
\`\`\`c
#include <time.h>
#include <sys/time.h>

// High-resolution timing
struct timespec start, end;
clock_gettime(CLOCK_MONOTONIC, &start);
// Code to time
clock_gettime(CLOCK_MONOTONIC, &end);

double elapsed = (end.tv_sec - start.tv_sec) +
                 (end.tv_nsec - start.tv_nsec) / 1e9;

// CPU time per thread
clock_t cpu_time = clock();
double cpu_seconds = cpu_time / (double)CLOCKS_PER_SEC;
\`\`\`

#### Thread-Specific CPU Usage
\`\`\`c
#include <pthread.h>
#include <unistd.h>

// Get thread CPU time
int pthread_getcpuclockid(pthread_t thread, clockid_t *clock_id);
// Then use clock_gettime with the thread-specific clock
\`\`\`

## Memory Performance in Concurrent Programs

### Cache Coherence
- **MESI Protocol**: Modified, Exclusive, Shared, Invalid states
- **False Sharing**: Threads modify different variables in same cache line
- **Cache Thrashing**: Excessive cache invalidation

### Avoiding False Sharing
\`\`\`c
// Bad - false sharing
struct {
    volatile int thread1_counter;
    volatile int thread2_counter;  // Same cache line
} shared;

// Good - padding prevents false sharing
struct {
    volatile int thread1_counter;
    char padding[64];  // Cache line size (typically 64 bytes)
    volatile int thread2_counter;
} shared __attribute__((aligned(64)));
\`\`\`

### Memory Barriers
\`\`\`c
// Compiler barrier
asm volatile("" ::: "memory");

// Hardware memory barrier (GCC)
__sync_synchronize();

// C11 memory barriers
atomic_thread_fence(memory_order_seq_cst);
\`\`\`

## Lock Performance Analysis

### Lock Contention Measurement
\`\`\`c
#include <pthread.h>
#include <sys/time.h>

typedef struct {
    pthread_mutex_t mutex;
    unsigned long long lock_count;
    unsigned long long contention_count;
    struct timeval total_wait_time;
} InstrumentedMutex;

void instrumented_lock(InstrumentedMutex *im) {
    struct timeval start, end;

    im->lock_count++;
    gettimeofday(&start, NULL);

    pthread_mutex_lock(&im->mutex);

    gettimeofday(&end, NULL);

    // Calculate wait time
    if (end.tv_usec < start.tv_usec) {
        end.tv_usec += 1000000;
        end.tv_sec--;
    }

    long long wait_usec = (end.tv_sec - start.tv_sec) * 1000000 +
                         (end.tv_usec - start.tv_usec);

    im->total_wait_time.tv_usec += wait_usec;
    if (im->total_wait_time.tv_usec >= 1000000) {
        im->total_wait_time.tv_sec++;
        im->total_wait_time.tv_usec -= 1000000;
    }
}
\`\`\`

### Lock-Free vs Lock-Based Performance
- **Lock-free**: Better for high-contention scenarios
- **Lock-based**: Better for low-contention with complex operations
- **Hybrid approaches**: Adaptive algorithms

## Scalability Analysis

### Amdahl's Law Application
\`\`\`c
#include <math.h>

// Calculate theoretical speedup
double amdahl_speedup(double parallel_fraction, int num_processors) {
    return 1.0 / ((1.0 - parallel_fraction) + parallel_fraction / num_processors);
}

// Example: If 80% of code is parallelizable
double speedup_8_cores = amdahl_speedup(0.8, 8);
printf("Speedup with 8 cores: %.2f\\n", speedup_8_cores);
\`\`\`

### Gustafson's Law
\`\`\`c
// Scaled speedup calculation
double gustafson_speedup(double parallel_fraction, int num_processors) {
    return num_processors - (1.0 - parallel_fraction) * (num_processors - 1);
}
\`\`\`

## Benchmarking Concurrent Code

### Microbenchmarking Framework
\`\`\`c
#include <time.h>
#include <pthread.h>
#include <stdlib.h>

typedef struct {
    void (*benchmark_function)(void *arg);
    void *arg;
    int num_threads;
    int iterations;
} BenchmarkConfig;

typedef struct {
    double min_time;
    double max_time;
    double avg_time;
    double median_time;
    double throughput;
} BenchmarkResult;

BenchmarkResult run_benchmark(BenchmarkConfig *config) {
    BenchmarkResult result = {0};
    double *times = malloc(config->iterations * sizeof(double));

    for (int i = 0; i < config->iterations; i++) {
        struct timespec start, end;

        clock_gettime(CLOCK_MONOTONIC, &start);
        config->benchmark_function(config->arg);
        clock_gettime(CLOCK_MONOTONIC, &end);

        times[i] = (end.tv_sec - start.tv_sec) +
                  (end.tv_nsec - start.tv_nsec) / 1e9;
    }

    // Calculate statistics
    // ... statistics calculation code ...

    free(times);
    return result;
}
\`\`\`

### Statistical Analysis
- **Mean**: Average execution time
- **Median**: Middle value (resistant to outliers)
- **Standard Deviation**: Measure of variability
- **Confidence Intervals**: Statistical significance

## Profiling Tools and Techniques

### CPU Profiling
\`\`\`bash
# perf - Linux performance analysis
perf stat ./program
perf record ./program
perf report

# gprof - GNU profiler
gcc -pg program.c -o program
./program
gprof program > profile.txt
\`\`\`

### Memory Profiling
\`\`\`bash
# Valgrind for memory leaks and performance
valgrind --tool=callgrind ./program
valgrind --tool=massif ./program

# Intel VTune or AMD CodeXL for advanced profiling
\`\`\`

### Thread Analysis Tools
- **Helgrind**: Race condition detection
- **DRD (Data Race Detection)**: Data race detection
- **ThreadSanitizer**: GCC/Clang thread sanitizer

## Optimization Strategies

### Algorithm-Level Optimizations
1. **Reduce synchronization**: Use lock-free algorithms
2. **Improve data locality**: Organize data for cache efficiency
3. **Minimize contention**: Fine-grained locking
4. **Work stealing**: Dynamic load balancing

### Code-Level Optimizations
\`\`\`c
// Optimize critical sections
pthread_mutex_lock(&mutex);
// Minimize work inside lock
int local_copy = shared_data;
local_copy++;
shared_data = local_copy;
pthread_mutex_unlock(&mutex);

// Use read-write locks for read-heavy workloads
pthread_rwlock_rdlock(&rwlock);
// Read operations
pthread_rwlock_unlock(&rwlock);
\`\`\`

### Hardware-Level Optimizations
- **SIMD Instructions**: Vector processing
- **NUMA Awareness**: Memory locality
- **CPU Affinity**: Pin threads to specific cores
- **Hyper-threading**: Consider logical vs physical cores

## Debugging Concurrent Programs

### Race Condition Detection
\`\`\`c
// Use volatile for variables accessed by multiple threads
volatile int shared_counter = 0;

// Or use atomic operations
#include <stdatomic.h>
atomic_int atomic_counter = ATOMIC_VAR_INIT(0);
\`\`\`

### Deadlock Detection
\`\`\`c
// Lock ordering discipline
#define LOCK_ORDER(a, b) ((a) < (b) ? (a) : (b))

void acquire_locks(pthread_mutex_t *lock1, pthread_mutex_t *lock2) {
    pthread_mutex_t *first = LOCK_ORDER(lock1, lock2);
    pthread_mutex_t *second = (first == lock1) ? lock2 : lock1;

    pthread_mutex_lock(first);
    pthread_mutex_lock(second);
}
\`\`\`

### Thread Sanitizer Usage
\`\`\`bash
# Compile with thread sanitizer
gcc -fsanitize=thread -g program.c -o program -pthread
./program  # Will detect race conditions
\`\`\`

## Performance Monitoring

### System Performance Counters
\`\`\`c
#include <linux/perf_event.h>
#include <sys/ioctl.h>

// Setup performance counter for cache misses
struct perf_event_attr pe = {
    .type = PERF_TYPE_HW_CACHE,
    .config = PERF_COUNT_HW_CACHE_L1D |
              (PERF_COUNT_HW_CACHE_OP_READ << 8) |
              (PERF_COUNT_HW_CACHE_RESULT_MISS << 16),
};

int fd = syscall(__NR_perf_event_open, &pe, 0, -1, -1, 0);
ioctl(fd, PERF_EVENT_IOC_ENABLE, 0);
// Run code to measure
ioctl(fd, PERF_EVENT_IOC_DISABLE, 0);
\`\`\`

### Real-time Performance Monitoring
\`\`\`c
#include <sys/resource.h>
#include <sys/time.h>

// Get resource usage
struct rusage usage;
getrusage(RUSAGE_SELF, &usage);

printf("User CPU time: %ld.%06ld seconds\\n",
       usage.ru_utime.tv_sec, usage.ru_utime.tv_usec);
printf("System CPU time: %ld.%06ld seconds\\n",
       usage.ru_stime.tv_sec, usage.ru_stime.tv_usec);
printf("Context switches: %ld\\n", usage.ru_nvcsw + usage.ru_nivcsw);
\`\`\`

## Best Practices

### Design for Performance
1. **Profile first**: Measure before optimizing
2. **Amdahl's Law awareness**: Focus on parallelizable code
3. **Scalability testing**: Test with different core counts
4. **Resource awareness**: Memory, cache, and I/O bottlenecks

### Coding Standards
- **Consistent locking order**: Prevent deadlocks
- **Minimal critical sections**: Reduce contention
- **Error handling**: Robust concurrent error handling
- **Documentation**: Document thread safety guarantees

### Testing Strategies
- **Stress testing**: High load scenarios
- **Race condition injection**: Deliberately create timing issues
- **Scalability testing**: Performance vs core count
- **Long-running tests**: Detect intermittent bugs`
};

