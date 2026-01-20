import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_5: SubLesson = {
  id: '12.5',
  title: 'Debugging Concurrent Programs',
  status: 'demo',
  content: `# Debugging Concurrent Programs

## Common Concurrency Bugs

### Race Conditions
- **Definition**: Multiple threads access shared data simultaneously
- **Symptoms**: Intermittent failures, data corruption
- **Detection**: Thread sanitizer, code review

\`\`\`c
// Race condition example
int counter = 0;

void *thread_func(void *arg) {
    for (int i = 0; i < 1000000; i++) {
        counter++;  // Not atomic!
    }
    return NULL;
}
// Result may be less than 2,000,000
\`\`\`

### Deadlocks
- **Definition**: Threads wait for each other indefinitely
- **Causes**: Circular wait, improper lock ordering
- **Prevention**: Consistent lock ordering, timeouts

\`\`\`c
// Deadlock example
pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t mutex2 = PTHREAD_MUTEX_INITIALIZER;

void *thread1_func(void *arg) {
    pthread_mutex_lock(&mutex1);
    sleep(1);  // Thread 2 gets mutex2
    pthread_mutex_lock(&mutex2);  // Waits forever
    // ...
}

void *thread2_func(void *arg) {
    pthread_mutex_lock(&mutex2);
    sleep(1);  // Thread 1 gets mutex1
    pthread_mutex_lock(&mutex1);  // Waits forever
    // ...
}
\`\`\`

### Atomicity Violations
- **Definition**: Operations that should be atomic are not
- **Solution**: Use atomic operations or proper locking

## Debugging Tools

### Thread Sanitizer
\`\`\`bash
# Compile with thread sanitizer
gcc -fsanitize=thread -g program.c -o program -pthread

# Run program
./program

# Thread sanitizer will detect:
# - Race conditions
# - Data races
# - Atomicity violations
\`\`\`

### Valgrind Tools
\`\`\`bash
# Helgrind - thread error detector
valgrind --tool=helgrind ./program

# DRD - data race detector
valgrind --tool=drd ./program

# Memcheck with threading
valgrind --tool=memcheck ./program
\`\`\`

### GDB Thread Debugging
\`\`\`bash
# Start GDB
gdb ./program

# Thread commands
(gdb) info threads          # List all threads
(gdb) thread 2              # Switch to thread 2
(gdb) thread apply all bt   # Backtrace all threads
(gdb) set scheduler-locking on  # Freeze other threads
\`\`\`

## Static Analysis Tools

### Clang Static Analyzer
\`\`\`bash
clang --analyze program.c
# Detects potential race conditions and deadlocks
\`\`\`

### Coverity and Similar Tools
- Detect concurrency issues through static analysis
- Find potential race conditions and deadlocks
- Analyze lock usage patterns

## Testing Strategies

### Deterministic Testing
\`\`\`c
// Force thread scheduling for reproducible tests
#include <sched.h>

// Set thread affinity to control scheduling
cpu_set_t cpuset;
CPU_ZERO(&cpuset);
CPU_SET(0, &cpuset);  // Pin to CPU 0
pthread_setaffinity_np(pthread_self(), sizeof(cpuset), &cpuset);
\`\`\`

### Stress Testing
\`\`\`c
#define NUM_THREADS 100
#define ITERATIONS 10000

void stress_test() {
    pthread_t threads[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, worker_thread, NULL);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
}
\`\`\`

### Fuzz Testing for Concurrency
- Randomize thread scheduling
- Introduce random delays
- Test with different thread counts

## Logging and Monitoring

### Thread-Safe Logging
\`\`\`c
#include <stdio.h>
#include <pthread.h>

pthread_mutex_t log_mutex = PTHREAD_MUTEX_INITIALIZER;

void thread_safe_log(const char *message) {
    pthread_mutex_lock(&log_mutex);

    // Include thread ID in log
    pthread_t thread_id = pthread_self();
    fprintf(stderr, "[Thread %lu] %s\\n", (unsigned long)thread_id, message);

    pthread_mutex_unlock(&log_mutex);
}
\`\`\`

### Performance Monitoring
\`\`\`c
#include <sys/time.h>

typedef struct {
    struct timeval start_time;
    long operation_count;
    pthread_mutex_t stats_mutex;
} ThreadStats;

void record_operation(ThreadStats *stats) {
    pthread_mutex_lock(&stats->stats_mutex);
    stats->operation_count++;
    pthread_mutex_unlock(&stats->stats_mutex);
}

double get_operations_per_second(ThreadStats *stats) {
    struct timeval now;
    gettimeofday(&now, NULL);

    double elapsed = (now.tv_sec - stats->start_time.tv_sec) +
                    (now.tv_usec - stats->start_time.tv_usec) / 1000000.0;

    pthread_mutex_lock(&stats->stats_mutex);
    double ops_per_sec = stats->operation_count / elapsed;
    pthread_mutex_unlock(&stats->stats_mutex);

    return ops_per_sec;
}
\`\`\`

## Prevention Techniques

### Code Review Checklists
- [ ] All shared data is properly synchronized
- [ ] Lock ordering is consistent
- [ ] No long-running operations inside locks
- [ ] Proper error handling in threaded code
- [ ] Thread cleanup is handled correctly

### Design Patterns
- **Immutable objects**: Share read-only data safely
- **Thread-local storage**: Avoid sharing when possible
- **Message passing**: Communicate via channels instead of shared state
- **Actor model**: Isolate state within threads

### Code Quality Tools
\`\`\`c
// Assertions for concurrency
#include <assert.h>

void critical_section() {
    static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
    static int in_critical = 0;

    pthread_mutex_lock(&mutex);
    assert(in_critical == 0);  // Should never be reentrant
    in_critical = 1;

    // Critical section code

    in_critical = 0;
    pthread_mutex_unlock(&mutex);
}
\`\`\`

## Performance Debugging

### Lock Contention Analysis
\`\`\`c
// Instrument locks to measure contention
typedef struct {
    pthread_mutex_t mutex;
    unsigned long long lock_count;
    unsigned long long contention_count;
    struct timespec total_wait_time;
} InstrumentedMutex;

void instrumented_lock(InstrumentedMutex *im) {
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);

    im->lock_count++;

    pthread_mutex_lock(&im->mutex);
    clock_gettime(CLOCK_MONOTONIC, &end);

    // Calculate wait time
    long long wait_ns = (end.tv_sec - start.tv_sec) * 1000000000LL +
                       (end.tv_nsec - start.tv_nsec);

    if (wait_ns > 1000000) {  // More than 1ms
        im->contention_count++;
        im->total_wait_time.tv_nsec += wait_ns;
    }
}
\`\`\`

### Memory Access Patterns
- **Cache misses**: Use cachegrind to analyze
- **False sharing**: Check data layout and padding
- **Memory bandwidth**: Profile memory-intensive operations

## Best Practices

### Development Guidelines
1. **Keep it simple**: Avoid complex synchronization when possible
2. **Test thoroughly**: Use multiple testing strategies
3. **Document assumptions**: Comment thread safety guarantees
4. **Use tools**: Static analysis, sanitizers, profilers
5. **Code reviews**: Have concurrency experts review code

### Common Mistakes to Avoid
- **Assuming atomicity**: int assignment may not be atomic
- **Double-checked locking**: Often implemented incorrectly
- **Spinning without yielding**: Can cause starvation
- **Ignoring compiler optimizations**: Can reorder operations
- **Platform assumptions**: Behavior varies across systems

### Debugging Workflow
1. **Reproduce the issue**: Find reliable reproduction steps
2. **Isolate the problem**: Minimize the test case
3. **Add logging**: Instrument the code for debugging
4. **Use tools**: Sanitizers, debuggers, profilers
5. **Fix the root cause**: Don't just mask symptoms
6. **Test thoroughly**: Ensure the fix works and doesn't break other things`
};

