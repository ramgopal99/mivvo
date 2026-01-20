import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_4: SubLesson = {
  id: '11.4',
  title: 'Memory-Mapped Files and Shared Memory',
  status: 'demo',
  content: `# Memory-Mapped Files and Shared Memory

## Memory-Mapped Files

### mmap() System Call
\`\`\`c
#include <sys/mman.h>
#include <fcntl.h>
#include <unistd.h>

void *mmap(void *addr, size_t length, int prot, int flags,
           int fd, off_t offset);
\`\`\`

### Protection Flags
- **PROT_READ**: Pages may be read
- **PROT_WRITE**: Pages may be written
- **PROT_EXEC**: Pages may be executed
- **PROT_NONE**: Pages may not be accessed

### Mapping Flags
- **MAP_SHARED**: Changes visible to other processes
- **MAP_PRIVATE**: Changes private to this process
- **MAP_ANONYMOUS**: Anonymous mapping (no file backing)
- **MAP_FIXED**: Use exact address specified

### Example Usage
\`\`\`c
int fd = open("data.bin", O_RDONLY);
if (fd == -1) {
    perror("open");
    return 1;
}

// Get file size
struct stat sb;
fstat(fd, &sb);

// Map file to memory
char *file_data = mmap(NULL, sb.st_size, PROT_READ,
                       MAP_PRIVATE, fd, 0);

if (file_data == MAP_FAILED) {
    perror("mmap");
    close(fd);
    return 1;
}

// Use file_data as regular memory
printf("First byte: %c\\n", file_data[0]);

// Cleanup
munmap(file_data, sb.st_size);
close(fd);
\`\`\`

### Advantages
1. **Zero-copy I/O**: Direct memory access
2. **Shared memory**: Multiple processes can share data
3. **Demand paging**: Only accessed pages loaded
4. **Automatic synchronization**: OS handles coherence

## Shared Memory

### System V Shared Memory
\`\`\`c
#include <sys/ipc.h>
#include <sys/shm.h>

// Create shared memory segment
key_t key = ftok("shared_mem_key", 'A');
int shmid = shmget(key, 1024, IPC_CREAT | 0666);

// Attach to process address space
char *shared_mem = shmat(shmid, NULL, 0);

// Use shared memory
strcpy(shared_mem, "Hello, shared memory!");

// Detach
shmdt(shared_mem);
\`\`\`

### POSIX Shared Memory
\`\`\`c
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>

// Create shared memory object
int fd = shm_open("/my_shared_memory", O_CREAT | O_RDWR, 0666);
ftruncate(fd, 1024);

// Map shared memory
char *shared_mem = mmap(NULL, 1024, PROT_READ | PROT_WRITE,
                        MAP_SHARED, fd, 0);
\`\`\`

## Synchronization Primitives

### Semaphores
\`\`\`c
#include <semaphore.h>

// Named semaphore
sem_t *sem = sem_open("/my_semaphore", O_CREAT, 0644, 1);
sem_wait(sem);    // Decrement (lock)
sem_post(sem);    // Increment (unlock)
sem_close(sem);

// Unnamed semaphore
sem_t sem;
sem_init(&sem, 0, 1);  // Shared between threads
\`\`\`

### Mutexes
\`\`\`c
#include <pthread.h>

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_lock(&mutex);
// Critical section
pthread_mutex_unlock(&mutex);
\`\`\`

### Condition Variables
\`\`\`c
pthread_cond_t cond = PTHREAD_COND_INITIALIZER;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

// Wait for condition
pthread_mutex_lock(&mutex);
while (!condition) {
    pthread_cond_wait(&cond, &mutex);
}
pthread_mutex_unlock(&mutex);

// Signal condition
pthread_cond_signal(&cond);
\`\`\`

## Inter-Process Communication (IPC)

### Pipes
\`\`\`c
#include <unistd.h>

int pipe_fd[2];
pipe(pipe_fd);  // pipe_fd[0] = read, pipe_fd[1] = write

if (fork() == 0) {
    // Child process
    close(pipe_fd[0]);  // Close read end
    write(pipe_fd[1], "Hello from child", 16);
} else {
    // Parent process
    close(pipe_fd[1]);  // Close write end
    char buffer[32];
    read(pipe_fd[0], buffer, sizeof(buffer));
    printf("Received: %s\\n", buffer);
}
\`\`\`

### Named Pipes (FIFOs)
\`\`\`c
// Create named pipe
mkfifo("my_fifo", 0666);

// Writer
int fd = open("my_fifo", O_WRONLY);
write(fd, "Hello", 5);

// Reader
int fd = open("my_fifo", O_RDONLY);
char buffer[32];
read(fd, buffer, sizeof(buffer));
\`\`\`

### Message Queues
\`\`\`c
#include <sys/msg.h>

struct msgbuf {
    long mtype;
    char mtext[100];
};

key_t key = ftok("msg_queue_key", 'B');
int msgid = msgget(key, IPC_CREAT | 0666);

// Send message
struct msgbuf message = {1, "Hello"};
msgsnd(msgid, &message, sizeof(message.mtext), 0);

// Receive message
msgrcv(msgid, &message, sizeof(message.mtext), 1, 0);
\`\`\`

## Memory Barriers and Atomic Operations

### Volatile Keyword
\`\`\`c
volatile int shared_variable = 0;

// Forces compiler to not optimize accesses
// Required for memory-mapped I/O and shared variables
\`\`\`

### Atomic Operations (C11)
\`\`\`c
#include <stdatomic.h>

atomic_int counter = ATOMIC_VAR_INIT(0);
atomic_fetch_add(&counter, 1);  // Thread-safe increment
\`\`\`

### Memory Barriers
\`\`\`c
// Compiler barrier
asm volatile("" ::: "memory");

// CPU memory barrier (platform specific)
__sync_synchronize();  // GCC built-in
\`\`\`

## Performance Considerations

### Memory-Mapped Files
- **Pros**: Fast random access, shared memory
- **Cons**: Page faults, virtual memory overhead
- **Best for**: Large files, random access patterns

### Shared Memory
- **Pros**: Fastest IPC method, no copying
- **Cons**: Synchronization complexity, limited size
- **Best for**: High-performance inter-process communication

### Choosing IPC Method
| Method | Speed | Complexity | Use Case |
|--------|-------|------------|----------|
| Shared Memory | Fastest | High | Large data, performance critical |
| Pipes | Fast | Low | Sequential data flow |
| Message Queues | Medium | Medium | Structured messages |
| Sockets | Slowest | Medium | Network communication |
`
};

