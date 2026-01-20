import { SubLesson } from '../../../../data/lessonsData';

export const topic_12_2: SubLesson = {
  id: '12.2',
  title: 'Concurrency Patterns and Parallel Algorithms',
  status: 'demo',
  content: `# Concurrency Patterns and Parallel Algorithms

## Thread Pool Pattern

### Thread Pool Design
\`\`\`c
#include <pthread.h>
#include <semaphore.h>
#include <stdbool.h>
#include <stdlib.h>
#include <stdio.h>

#define MAX_THREADS 10
#define MAX_QUEUE 100

typedef struct {
    void (*function)(void *arg);
    void *arg;
} Task;

typedef struct {
    pthread_t threads[MAX_THREADS];
    Task task_queue[MAX_QUEUE];
    int queue_front;
    int queue_rear;
    int queue_count;
    int num_threads;
    int shutdown;

    pthread_mutex_t queue_mutex;
    pthread_cond_t queue_cond;
    sem_t queue_sem;
} ThreadPool;

ThreadPool* threadpool_create(int num_threads) {
    ThreadPool *pool = malloc(sizeof(ThreadPool));
    pool->num_threads = num_threads;
    pool->queue_front = 0;
    pool->queue_rear = 0;
    pool->queue_count = 0;
    pool->shutdown = 0;

    pthread_mutex_init(&pool->queue_mutex, NULL);
    pthread_cond_init(&pool->queue_cond, NULL);
    sem_init(&pool->queue_sem, 0, MAX_QUEUE);

    for (int i = 0; i < num_threads; i++) {
        pthread_create(&pool->threads[i], NULL, worker_thread, pool);
    }

    return pool;
}

void threadpool_add_task(ThreadPool *pool, void (*function)(void *), void *arg) {
    sem_wait(&pool->queue_sem);

    pthread_mutex_lock(&pool->queue_mutex);
    pool->task_queue[pool->queue_rear].function = function;
    pool->task_queue[pool->queue_rear].arg = arg;
    pool->queue_rear = (pool->queue_rear + 1) % MAX_QUEUE;
    pool->queue_count++;
    pthread_cond_signal(&pool->queue_cond);
    pthread_mutex_unlock(&pool->queue_mutex);
}

void* worker_thread(void *arg) {
    ThreadPool *pool = (ThreadPool *)arg;

    while (1) {
        pthread_mutex_lock(&pool->queue_mutex);

        while (pool->queue_count == 0 && !pool->shutdown) {
            pthread_cond_wait(&pool->queue_cond, &pool->queue_mutex);
        }

        if (pool->shutdown) {
            pthread_mutex_unlock(&pool->queue_mutex);
            break;
        }

        Task task = pool->task_queue[pool->queue_front];
        pool->queue_front = (pool->queue_front + 1) % MAX_QUEUE;
        pool->queue_count--;

        pthread_mutex_unlock(&pool->queue_mutex);

        sem_post(&pool->queue_sem);

        task.function(task.arg);
    }

    return NULL;
}
\`\`\`

## Producer-Consumer Pattern

### Bounded Buffer Implementation
\`\`\`c
#include <pthread.h>
#include <semaphore.h>
#include <stdio.h>
#include <stdlib.h>

#define BUFFER_SIZE 5

typedef struct {
    int buffer[BUFFER_SIZE];
    int in, out, count;

    pthread_mutex_t mutex;
    sem_t empty, full;
} BoundedBuffer;

BoundedBuffer* buffer_create() {
    BoundedBuffer *buf = malloc(sizeof(BoundedBuffer));
    buf->in = 0;
    buf->out = 0;
    buf->count = 0;

    pthread_mutex_init(&buf->mutex, NULL);
    sem_init(&buf->empty, 0, BUFFER_SIZE);
    sem_init(&buf->full, 0, 0);

    return buf;
}

void buffer_produce(BoundedBuffer *buf, int item) {
    sem_wait(&buf->empty);
    pthread_mutex_lock(&buf->mutex);

    buf->buffer[buf->in] = item;
    buf->in = (buf->in + 1) % BUFFER_SIZE;
    buf->count++;

    pthread_mutex_unlock(&buf->mutex);
    sem_post(&buf->full);
}

int buffer_consume(BoundedBuffer *buf) {
    sem_wait(&buf->full);
    pthread_mutex_lock(&buf->mutex);

    int item = buf->buffer[buf->out];
    buf->out = (buf->out + 1) % BUFFER_SIZE;
    buf->count--;

    pthread_mutex_unlock(&buf->mutex);
    sem_post(&buf->empty);

    return item;
}
\`\`\`

## Parallel Algorithms

### Parallel Merge Sort
\`\`\`c
#include <pthread.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int *array;
    int left;
    int right;
} SortArgs;

void merge(int *array, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));

    memcpy(L, &array[left], n1 * sizeof(int));
    memcpy(R, &array[mid + 1], n2 * sizeof(int));

    int i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k++] = L[i++];
        } else {
            array[k++] = R[j++];
        }
    }

    while (i < n1) array[k++] = L[i++];
    while (j < n2) array[k++] = R[j++];

    free(L);
    free(R);
}

void* merge_sort_parallel(void *arg) {
    SortArgs *args = (SortArgs *)arg;
    int *array = args->array;
    int left = args->left;
    int right = args->right;

    if (left < right) {
        int mid = left + (right - left) / 2;

        // Create threads for left and right halves
        SortArgs left_args = {array, left, mid};
        SortArgs right_args = {array, mid + 1, right};

        pthread_t left_thread, right_thread;

        pthread_create(&left_thread, NULL, merge_sort_parallel, &left_args);
        pthread_create(&right_thread, NULL, merge_sort_parallel, &right_args);

        pthread_join(left_thread, NULL);
        pthread_join(right_thread, NULL);

        merge(array, left, mid, right);
    }

    return NULL;
}

void parallel_merge_sort(int *array, int size) {
    SortArgs args = {array, 0, size - 1};
    pthread_t thread;
    pthread_create(&thread, NULL, merge_sort_parallel, &args);
    pthread_join(thread, NULL);
}
\`\`\`

### Parallel Matrix Multiplication
\`\`\`c
#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>

#define MATRIX_SIZE 4
#define NUM_THREADS 4

typedef struct {
    int (*A)[MATRIX_SIZE];
    int (*B)[MATRIX_SIZE];
    int (*C)[MATRIX_SIZE];
    int row_start;
    int row_end;
} MatrixArgs;

void* matrix_multiply_worker(void *arg) {
    MatrixArgs *args = (MatrixArgs *)arg;
    int (*A)[MATRIX_SIZE] = args->A;
    int (*B)[MATRIX_SIZE] = args->B;
    int (*C)[MATRIX_SIZE] = args->C;

    for (int i = args->row_start; i < args->row_end; i++) {
        for (int j = 0; j < MATRIX_SIZE; j++) {
            C[i][j] = 0;
            for (int k = 0; k < MATRIX_SIZE; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return NULL;
}

void parallel_matrix_multiply(int A[MATRIX_SIZE][MATRIX_SIZE],
                              int B[MATRIX_SIZE][MATRIX_SIZE],
                              int C[MATRIX_SIZE][MATRIX_SIZE]) {
    pthread_t threads[NUM_THREADS];
    MatrixArgs args[NUM_THREADS];

    int rows_per_thread = MATRIX_SIZE / NUM_THREADS;

    for (int i = 0; i < NUM_THREADS; i++) {
        args[i].A = A;
        args[i].B = B;
        args[i].C = C;
        args[i].row_start = i * rows_per_thread;
        args[i].row_end = (i == NUM_THREADS - 1) ?
                         MATRIX_SIZE : (i + 1) * rows_per_thread;

        pthread_create(&threads[i], NULL, matrix_multiply_worker, &args[i]);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
}
\`\`\`

## Work-Stealing Scheduler

### Basic Work-Stealing Concept
\`\`\`c
#include <pthread.h>
#include <stdatomic.h>
#include <stdlib.h>

// Simplified work-stealing deque
typedef struct {
    void **tasks;
    atomic_int top;
    atomic_int bottom;
    int capacity;
    pthread_mutex_t mutex;
} WorkStealingDeque;

WorkStealingDeque* deque_create(int capacity) {
    WorkStealingDeque *deque = malloc(sizeof(WorkStealingDeque));
    deque->tasks = malloc(capacity * sizeof(void *));
    deque->top = 0;
    deque->bottom = 0;
    deque->capacity = capacity;
    pthread_mutex_init(&deque->mutex, NULL);
    return deque;
}

void deque_push_bottom(WorkStealingDeque *deque, void *task) {
    pthread_mutex_lock(&deque->mutex);
    deque->tasks[deque->bottom % deque->capacity] = task;
    atomic_fetch_add(&deque->bottom, 1);
    pthread_mutex_unlock(&deque->mutex);
}

void* deque_pop_bottom(WorkStealingDeque *deque) {
    pthread_mutex_lock(&deque->mutex);
    atomic_fetch_sub(&deque->bottom, 1);
    if (atomic_load(&deque->bottom) < atomic_load(&deque->top)) {
        atomic_fetch_add(&deque->bottom, 1); // Restore
        pthread_mutex_unlock(&deque->mutex);
        return NULL; // Empty
    }
    void *task = deque->tasks[deque->bottom % deque->capacity];
    pthread_mutex_unlock(&deque->mutex);
    return task;
}

void* deque_steal(WorkStealingDeque *deque) {
    pthread_mutex_lock(&deque->mutex);
    if (atomic_load(&deque->bottom) <= atomic_load(&deque->top)) {
        pthread_mutex_unlock(&deque->mutex);
        return NULL; // Empty
    }
    void *task = deque->tasks[deque->top % deque->capacity];
    atomic_fetch_add(&deque->top, 1);
    pthread_mutex_unlock(&deque->mutex);
    return task;
}
\`\`\`

## Pipeline Pattern

### Assembly Line Processing
\`\`\`c
#include <pthread.h>
#include <semaphore.h>

typedef struct {
    int data;
    // Add more fields as needed
} WorkItem;

#define QUEUE_SIZE 10

typedef struct {
    WorkItem queue[QUEUE_SIZE];
    int front, rear, count;
    pthread_mutex_t mutex;
    sem_t empty, full;
} PipelineQueue;

void* stage1_worker(void *arg) {
    PipelineQueue *output_queue = (PipelineQueue *)arg;

    while (1) {
        // Stage 1 processing
        WorkItem item = get_input();

        // Process item for stage 1
        item.data = stage1_process(item.data);

        // Pass to next stage
        queue_put(output_queue, item);
    }

    return NULL;
}

void* stage2_worker(void *arg) {
    PipelineQueue *input_queue = (PipelineQueue *)arg;
    PipelineQueue *output_queue = get_next_queue();

    while (1) {
        WorkItem item = queue_get(input_queue);

        // Process item for stage 2
        item.data = stage2_process(item.data);

        // Pass to next stage
        queue_put(output_queue, item);
    }

    return NULL;
}
\`\`\`

## Map-Reduce Pattern

### Simple Map-Reduce Implementation
\`\`\`c
#include <pthread.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    void *data;
    size_t data_size;
    int num_mappers;
    int num_reducers;

    void (*mapper)(void *data, void **intermediate);
    void (*reducer)(void *key, void **values, void *result);

    void **intermediate_results;
    void *final_result;
} MapReduceJob;

void* mapper_worker(void *arg) {
    MapReduceJob *job = (MapReduceJob *)arg;
    int thread_id = // get thread ID

    // Calculate data chunk for this mapper
    size_t chunk_size = job->data_size / job->num_mappers;
    size_t offset = thread_id * chunk_size;
    void *chunk = (char *)job->data + offset;

    // Run mapper function
    job->mapper(chunk, &job->intermediate_results[thread_id]);

    return NULL;
}

void* reducer_worker(void *arg) {
    MapReduceJob *job = (MapReduceJob *)arg;
    int thread_id = // get thread ID

    // Group intermediate results by key
    // This is simplified - real implementation would use hash tables

    job->reducer(/*key*/, /*grouped_values*/,
                 &job->final_result);

    return NULL;
}

void mapreduce_execute(MapReduceJob *job) {
    pthread_t *mapper_threads = malloc(job->num_mappers * sizeof(pthread_t));
    pthread_t *reducer_threads = malloc(job->num_reducers * sizeof(pthread_t));

    // Start mapper threads
    for (int i = 0; i < job->num_mappers; i++) {
        pthread_create(&mapper_threads[i], NULL, mapper_worker, job);
    }

    // Wait for mappers to complete
    for (int i = 0; i < job->num_mappers; i++) {
        pthread_join(mapper_threads[i], NULL);
    }

    // Start reducer threads
    for (int i = 0; i < job->num_reducers; i++) {
        pthread_create(&reducer_threads[i], NULL, reducer_worker, job);
    }

    // Wait for reducers to complete
    for (int i = 0; i < job->num_reducers; i++) {
        pthread_join(reducer_threads[i], NULL);
    }

    free(mapper_threads);
    free(reducer_threads);
}
\`\`\`

## Performance Analysis

### Amdahl's Law
Speedup = 1 / ((1 - P) + P/N)
- P = parallelizable portion
- N = number of processors
- Shows theoretical speedup limits

### Gustafson's Law
Speedup = N - (1 - P) * (N - 1)
- Accounts for scaled problem sizes
- More optimistic than Amdahl's Law

### Scalability Metrics
- **Speedup**: Sequential time / Parallel time
- **Efficiency**: Speedup / Number of processors
- **Scalability**: How speedup increases with processors

### Common Bottlenecks
1. **Synchronization overhead**: Locks, barriers
2. **Communication latency**: Data sharing between threads
3. **Load imbalance**: Uneven work distribution
4. **Memory contention**: Cache thrashing, false sharing

### Optimization Strategies
- **Granularity control**: Right balance of work per thread
- **Data locality**: Minimize data movement
- **Minimizing synchronization**: Lock-free algorithms where possible
- **Work stealing**: Dynamic load balancing
- **Memory layout optimization**: Avoid cache conflicts`
};

