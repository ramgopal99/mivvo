import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_5: SubLesson = {
  id: "9.5",
  title: 'Memory-Mapped Files and Shared Memory',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🗺️ Memory-Mapped Files and Shared Memory in C

Memory-mapped files and shared memory enable efficient data sharing between processes and fast file access by mapping file contents directly into process memory space.

---

## 🗺️ Memory-Mapped Files

### **What is Memory Mapping?**

Memory mapping creates a direct connection between a file and virtual memory. File contents appear as if they were loaded into memory, enabling efficient random access.

### **Basic Memory Mapping (Unix/Linux)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>

void* map_file_readonly(const char *filename, size_t *file_size) {
    int fd = open(filename, O_RDONLY);
    if (fd == -1) return NULL;

    // Get file size
    struct stat sb;
    if (fstat(fd, &sb) == -1) {
        close(fd);
        return NULL;
    }

    *file_size = sb.st_size;

    // Map file into memory
    void *addr = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (addr == MAP_FAILED) {
        close(fd);
        return NULL;
    }

    // File descriptor can be closed now
    close(fd);

    return addr;
}

void unmap_file(void *addr, size_t size) {
    munmap(addr, size);
}

int main() {
    size_t size;
    void *mapped = map_file_readonly("data.bin", &size);

    if (mapped == NULL) {
        printf("Failed to map file\\n");
        return 1;
    }

    // Access file data directly
    unsigned char *data = (unsigned char*)mapped;
    printf("First 10 bytes: ");
    for (int i = 0; i < 10 && i < size; i++) {
        printf("%02x ", data[i]);
    }
    printf("\\n");

    unmap_file(mapped, size);

    return 0;
}
\`\`\`

### **Read-Write Memory Mapping**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <string.h>

void* map_file_readwrite(const char *filename, size_t size) {
    int fd = open(filename, O_RDWR | O_CREAT, 0644);
    if (fd == -1) return NULL;

    // Extend file to desired size
    if (ftruncate(fd, size) == -1) {
        close(fd);
        return NULL;
    }

    // Map file with read/write permissions
    void *addr = mmap(NULL, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (addr == MAP_FAILED) {
        close(fd);
        return NULL;
    }

    close(fd);
    return addr;
}

int main() {
    const size_t SIZE = 1024;
    void *mapped = map_file_readwrite("shared.dat", SIZE);

    if (mapped == NULL) {
        printf("Failed to create memory mapping\\n");
        return 1;
    }

    // Write data to mapped memory (directly to file)
    strcpy((char*)mapped, "Hello, memory-mapped file!");
    sprintf((char*)mapped + 30, "Timestamp: %ld", time(NULL));

    printf("Data written to memory-mapped file\\n");

    // Changes are automatically flushed to disk
    munmap(mapped, SIZE);

    return 0;
}
\`\`\`

### **Cross-Platform Memory Mapping**

\`\`\`c
#ifdef _WIN32
#include <windows.h>
#else
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>
#endif

typedef struct {
    void *addr;
    size_t size;
#ifdef _WIN32
    HANDLE file_handle;
    HANDLE mapping_handle;
#endif
} MemoryMapping;

MemoryMapping* create_memory_mapping(const char *filename, size_t size, int read_write) {
    MemoryMapping *mapping = (MemoryMapping*)malloc(sizeof(MemoryMapping));
    if (mapping == NULL) return NULL;

#ifdef _WIN32
    DWORD access = read_write ? GENERIC_READ | GENERIC_WRITE : GENERIC_READ;
    DWORD create = read_write ? OPEN_ALWAYS : OPEN_EXISTING;

    mapping->file_handle = CreateFile(filename, access, 0, NULL, create, FILE_ATTRIBUTE_NORMAL, NULL);
    if (mapping->file_handle == INVALID_HANDLE_VALUE) {
        free(mapping);
        return NULL;
    }

    if (read_write) {
        // Set file size
        SetFilePointer(mapping->file_handle, size, NULL, FILE_BEGIN);
        SetEndOfFile(mapping->file_handle);
    }

    DWORD protect = read_write ? PAGE_READWRITE : PAGE_READONLY;
    mapping->mapping_handle = CreateFileMapping(mapping->file_handle, NULL, protect, 0, size, NULL);
    if (mapping->mapping_handle == NULL) {
        CloseHandle(mapping->file_handle);
        free(mapping);
        return NULL;
    }

    DWORD map_access = read_write ? FILE_MAP_WRITE : FILE_MAP_READ;
    mapping->addr = MapViewOfFile(mapping->mapping_handle, map_access, 0, 0, size);
    if (mapping->addr == NULL) {
        CloseHandle(mapping->mapping_handle);
        CloseHandle(mapping->file_handle);
        free(mapping);
        return NULL;
    }

#else
    int flags = read_write ? O_RDWR | O_CREAT : O_RDONLY;
    int fd = open(filename, flags, 0644);
    if (fd == -1) {
        free(mapping);
        return NULL;
    }

    if (read_write) {
        ftruncate(fd, size);
    } else {
        struct stat sb;
        fstat(fd, &sb);
        size = sb.st_size;
    }

    int prot = read_write ? PROT_READ | PROT_WRITE : PROT_READ;
    mapping->addr = mmap(NULL, size, prot, MAP_SHARED, fd, 0);
    if (mapping->addr == MAP_FAILED) {
        close(fd);
        free(mapping);
        return NULL;
    }

    close(fd);
#endif

    mapping->size = size;
    return mapping;
}

void destroy_memory_mapping(MemoryMapping *mapping) {
    if (mapping == NULL) return;

#ifdef _WIN32
    UnmapViewOfFile(mapping->addr);
    CloseHandle(mapping->mapping_handle);
    CloseHandle(mapping->file_handle);
#else
    munmap(mapping->addr, mapping->size);
#endif

    free(mapping);
}

int main() {
    // Create a 1MB memory-mapped file
    MemoryMapping *mapping = create_memory_mapping("large_data.dat", 1024*1024, 1);

    if (mapping == NULL) {
        printf("Failed to create memory mapping\\n");
        return 1;
    }

    // Access data directly
    char *data = (char*)mapping->addr;
    strcpy(data, "This data is stored in a memory-mapped file!");
    sprintf(data + 50, "File size: %zu bytes", mapping->size);

    printf("Data written to memory-mapped file\\n");

    destroy_memory_mapping(mapping);

    return 0;
}
\`\`\`

---

## 🔗 Shared Memory

### **System V Shared Memory**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <string.h>

#define SHM_SIZE 1024
#define SHM_KEY 12345

typedef struct {
    int counter;
    char message[256];
} SharedData;

int main() {
    // Create shared memory segment
    int shm_id = shmget(SHM_KEY, SHM_SIZE, IPC_CREAT | 0666);
    if (shm_id == -1) {
        perror("shmget");
        return 1;
    }

    // Attach to shared memory
    SharedData *shared = (SharedData*)shmat(shm_id, NULL, 0);
    if (shared == (SharedData*)-1) {
        perror("shmat");
        return 1;
    }

    // Initialize shared data
    shared->counter = 0;
    strcpy(shared->message, "Hello from shared memory!");

    printf("Shared memory created. Press Enter to continue...");
    getchar();

    // Modify shared data
    shared->counter++;
    strcat(shared->message, " Updated!");

    printf("Shared data updated.\\n");

    // Detach from shared memory
    shmdt(shared);

    // Remove shared memory segment
    shmctl(shm_id, IPC_RMID, NULL);

    return 0;
}
\`\`\`

### **POSIX Shared Memory**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
#include <string.h>

#define SHM_NAME "/my_shared_memory"
#define SHM_SIZE 1024

int main() {
    // Create shared memory object
    int fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0666);
    if (fd == -1) {
        perror("shm_open");
        return 1;
    }

    // Set size
    ftruncate(fd, SHM_SIZE);

    // Map shared memory
    void *shared = mmap(NULL, SHM_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (shared == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }

    // Write to shared memory
    strcpy((char*)shared, "Data in POSIX shared memory");
    sprintf((char*)shared + 30, "Process ID: %d", getpid());

    printf("Data written to shared memory\\n");
    printf("Press Enter to exit...");
    getchar();

    // Cleanup
    munmap(shared, SHM_SIZE);
    close(fd);
    shm_unlink(SHM_NAME);

    return 0;
}
\`\`\`

### **Inter-Process Communication with Shared Memory**

\`\`\`c
// Writer process
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
#include <string.h>
#include <semaphore.h>

#define SHM_NAME "/ipc_memory"
#define SEM_NAME "/ipc_semaphore"
#define SHM_SIZE 1024

typedef struct {
    int ready;
    char message[256];
} SharedBuffer;

int main() {
    // Create semaphore for synchronization
    sem_t *sem = sem_open(SEM_NAME, O_CREAT, 0644, 0);
    if (sem == SEM_FAILED) {
        perror("sem_open");
        return 1;
    }

    // Create shared memory
    int fd = shm_open(SHM_NAME, O_CREAT | O_RDWR, 0666);
    if (fd == -1) {
        perror("shm_open");
        return 1;
    }

    ftruncate(fd, SHM_SIZE);

    SharedBuffer *shared = (SharedBuffer*)mmap(NULL, SHM_SIZE,
                                               PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    if (shared == MAP_FAILED) {
        perror("mmap");
        close(fd);
        return 1;
    }

    // Write data
    shared->ready = 0;
    strcpy(shared->message, "Message from writer process");

    // Signal reader
    shared->ready = 1;
    sem_post(sem);

    printf("Data sent to reader\\n");

    // Wait for reader to finish
    sleep(2);

    // Cleanup
    munmap(shared, SHM_SIZE);
    close(fd);
    shm_unlink(SHM_NAME);
    sem_close(sem);
    sem_unlink(SEM_NAME);

    return 0;
}
\`\`\`

---

## 🚀 Performance Benefits

### **Memory-Mapped File vs Traditional I/O**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <time.h>

#define FILE_SIZE (1024 * 1024 * 100)  // 100MB

double benchmark_traditional_io(const char *filename) {
    FILE *file = fopen(filename, "rb");
    if (file == NULL) return -1;

    char buffer[4096];
    size_t total_read = 0;
    clock_t start = clock();

    while (fread(buffer, 1, sizeof(buffer), file) > 0) {
        total_read += sizeof(buffer);
    }

    clock_t end = clock();
    fclose(file);

    return (double)(end - start) / CLOCKS_PER_SEC;
}

double benchmark_memory_mapped(const char *filename) {
    int fd = open(filename, O_RDONLY);
    if (fd == -1) return -1;

    struct stat sb;
    fstat(fd, &sb);

    clock_t start = clock();

    void *mapped = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (mapped == MAP_FAILED) {
        close(fd);
        return -1;
    }

    // Access data (simulate processing)
    volatile char *data = (char*)mapped;
    for (size_t i = 0; i < sb.st_size; i += 4096) {
        volatile char temp = data[i];
    }

    munmap(mapped, sb.st_size);
    close(fd);

    clock_t end = clock();
    return (double)(end - start) / CLOCKS_PER_SEC;
}

int main() {
    // Create test file
    FILE *test_file = fopen("benchmark.dat", "wb");
    for (int i = 0; i < FILE_SIZE / sizeof(int); i++) {
        int data = rand();
        fwrite(&data, sizeof(int), 1, test_file);
    }
    fclose(test_file);

    printf("Benchmarking 100MB file access:\\n");

    double traditional_time = benchmark_traditional_io("benchmark.dat");
    printf("Traditional I/O: %.3f seconds\\n", traditional_time);

    double mmap_time = benchmark_memory_mapped("benchmark.dat");
    printf("Memory-mapped I/O: %.3f seconds\\n", mmap_time);

    if (traditional_time > 0 && mmap_time > 0) {
        printf("Speedup: %.2fx\\n", traditional_time / mmap_time);
    }

    remove("benchmark.dat");

    return 0;
}
\`\`\`

### **Large File Processing**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>

#define CHUNK_SIZE (1024 * 1024)  // 1MB chunks

void process_large_file(const char *filename) {
    int fd = open(filename, O_RDONLY);
    if (fd == -1) {
        perror("open");
        return;
    }

    struct stat sb;
    fstat(fd, &sb);
    size_t file_size = sb.st_size;

    printf("Processing file of %zu bytes\\n", file_size);

    size_t offset = 0;
    while (offset < file_size) {
        size_t chunk_size = (offset + CHUNK_SIZE > file_size) ?
                           (file_size - offset) : CHUNK_SIZE;

        // Map chunk
        void *chunk = mmap(NULL, chunk_size, PROT_READ, MAP_PRIVATE, fd, offset);
        if (chunk == MAP_FAILED) {
            perror("mmap");
            break;
        }

        // Process chunk
        const char *data = (const char*)chunk;
        size_t null_count = 0;

        for (size_t i = 0; i < chunk_size; i++) {
            if (data[i] == 0) null_count++;
        }

        printf("Chunk at offset %zu: %zu null bytes\\n", offset, null_count);

        munmap(chunk, chunk_size);
        offset += chunk_size;
    }

    close(fd);
}

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <large_file>\\n", argv[0]);
        return 1;
    }

    process_large_file(argv[1]);

    return 0;
}
\`\`\`

---

## 🔒 Synchronization and Safety

### **Memory Barriers**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

// Atomic operations for shared memory
typedef struct {
    volatile int flag;
    volatile int data;
} SharedState;

void producer(SharedState *shared) {
    // Write data
    shared->data = 42;

    // Memory barrier - ensure write is visible
    __sync_synchronize();

    // Set flag
    shared->flag = 1;
}

void consumer(SharedState *shared) {
    // Wait for flag
    while (!shared->flag) {
        // Busy wait (not efficient, but simple)
    }

    // Memory barrier - ensure read is up to date
    __sync_synchronize();

    printf("Received data: %d\\n", shared->data);
}

int main() {
    // Create shared memory
    int fd = shm_open("/test_shm", O_CREAT | O_RDWR, 0644);
    ftruncate(fd, sizeof(SharedState));

    SharedState *shared = (SharedState*)mmap(NULL, sizeof(SharedState),
                                             PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);

    shared->flag = 0;
    shared->data = 0;

    pid_t pid = fork();

    if (pid == 0) {
        // Child process - consumer
        consumer(shared);
    } else {
        // Parent process - producer
        sleep(1);  // Let consumer start waiting
        producer(shared);
        wait(NULL);
    }

    munmap(shared, sizeof(SharedState));
    close(fd);
    shm_unlink("/test_shm");

    return 0;
}
\`\`\`

### **Error Recovery**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <setjmp.h>
#include <errno.h>

jmp_buf recovery_point;

void error_recovery() {
    fprintf(stderr, "Memory mapping error: %s\\n", strerror(errno));
    longjmp(recovery_point, 1);
}

void* safe_mmap(const char *filename, size_t *size) {
    int fd = -1;
    void *addr = MAP_FAILED;

    if (setjmp(recovery_point) != 0) {
        // Error occurred, cleanup
        if (addr != MAP_FAILED) munmap(addr, *size);
        if (fd != -1) close(fd);
        return NULL;
    }

    fd = open(filename, O_RDONLY);
    if (fd == -1) error_recovery();

    struct stat sb;
    if (fstat(fd, &sb) == -1) error_recovery();

    *size = sb.st_size;
    addr = mmap(NULL, *size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (addr == MAP_FAILED) error_recovery();

    close(fd);  // Can close now
    return addr;
}

int main() {
    size_t size;
    void *mapped = safe_mmap("large_file.dat", &size);

    if (mapped == NULL) {
        printf("Failed to map file safely\\n");
        return 1;
    }

    // Process file...
    printf("File mapped successfully, size: %zu\\n", size);

    munmap(mapped, size);

    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Database Index File**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <string.h>

typedef struct {
    int id;
    char name[32];
    long record_offset;
} IndexEntry;

typedef struct {
    IndexEntry *entries;
    size_t count;
    size_t capacity;
} Index;

Index* load_index(const char *index_file) {
    int fd = open(index_file, O_RDONLY);
    if (fd == -1) return NULL;

    struct stat sb;
    fstat(fd, &sb);

    IndexEntry *entries = (IndexEntry*)mmap(NULL, sb.st_size,
                                           PROT_READ, MAP_PRIVATE, fd, 0);
    if (entries == MAP_FAILED) {
        close(fd);
        return NULL;
    }

    Index *index = (Index*)malloc(sizeof(Index));
    index->entries = entries;
    index->count = sb.st_size / sizeof(IndexEntry);
    index->capacity = index->count;

    close(fd);
    return index;
}

long find_record(Index *index, int id) {
    // Binary search on memory-mapped index
    size_t left = 0, right = index->count - 1;

    while (left <= right) {
        size_t mid = left + (right - left) / 2;

        if (index->entries[mid].id == id) {
            return index->entries[mid].record_offset;
        } else if (index->entries[mid].id < id) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;  // Not found
}

void unload_index(Index *index) {
    munmap(index->entries, index->count * sizeof(IndexEntry));
    free(index);
}

int main() {
    Index *index = load_index("database.idx");

    if (index == NULL) {
        printf("Failed to load index\\n");
        return 1;
    }

    printf("Index loaded with %zu entries\\n", index->count);

    // Fast lookup
    long offset = find_record(index, 12345);
    if (offset != -1) {
        printf("Record found at offset %ld\\n", offset);
    } else {
        printf("Record not found\\n");
    }

    unload_index(index);

    return 0;
}
\`\`\`

### **Image Processing Pipeline**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <string.h>

typedef struct {
    unsigned char *data;
    size_t width;
    size_t height;
    size_t channels;
} Image;

Image* load_image(const char *filename, size_t width, size_t height, size_t channels) {
    size_t image_size = width * height * channels;

    int fd = open(filename, O_RDONLY);
    if (fd == -1) return NULL;

    unsigned char *data = (unsigned char*)mmap(NULL, image_size,
                                              PROT_READ, MAP_PRIVATE, fd, 0);
    if (data == MAP_FAILED) {
        close(fd);
        return NULL;
    }

    Image *image = (Image*)malloc(sizeof(Image));
    image->data = data;
    image->width = width;
    image->height = height;
    image->channels = channels;

    close(fd);
    return image;
}

void apply_grayscale(Image *image) {
    if (image->channels < 3) return;

    for (size_t y = 0; y < image->height; y++) {
        for (size_t x = 0; x < image->width; x++) {
            size_t offset = (y * image->width + x) * image->channels;

            // RGB to grayscale
            unsigned char r = image->data[offset];
            unsigned char g = image->data[offset + 1];
            unsigned char b = image->data[offset + 2];

            unsigned char gray = (r + g + b) / 3;

            image->data[offset] = gray;
            image->data[offset + 1] = gray;
            image->data[offset + 2] = gray;
        }
    }
}

void save_image(Image *image, const char *filename) {
    FILE *file = fopen(filename, "wb");
    if (file == NULL) return;

    size_t image_size = image->width * image->height * image->channels;
    fwrite(image->data, 1, image_size, file);

    fclose(file);
}

void unload_image(Image *image) {
    size_t image_size = image->width * image->height * image->channels;
    munmap(image->data, image_size);
    free(image);
}

int main() {
    // Load image (assuming RGB format)
    Image *image = load_image("input.rgb", 1920, 1080, 3);

    if (image == NULL) {
        printf("Failed to load image\\n");
        return 1;
    }

    printf("Image loaded: %zux%zu\\n", image->width, image->height);

    // Apply grayscale filter
    apply_grayscale(image);

    // Save result
    save_image(image, "output.rgb");

    unload_image(image);

    printf("Image processing complete\\n");

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Memory mapping** provides direct file-to-memory access for high performance
2. **Shared memory** enables efficient inter-process communication
3. **Memory barriers** ensure data consistency in concurrent access
4. **Error recovery** prevents crashes from mapping failures
5. **Cross-platform support** requires conditional compilation
6. **Synchronization** is crucial for shared memory safety
7. **Performance benefits** are significant for large file processing
8. **Resource management** requires proper cleanup

Memory-mapped files and shared memory unlock high-performance data processing capabilities! 🗺️✨`;

    return contentString;
  })()
};
