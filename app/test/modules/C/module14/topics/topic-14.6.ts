import { SubLesson } from '../../../../data/lessonsData';

export const topic_14_6: SubLesson = {
  id: '14.6',
  title: 'Cross-Platform C Programming',
  status: 'demo',
  content: `# Cross-Platform C Programming

## Platform Detection

### Compiler Detection
\`\`\`c
// Compiler detection
#ifdef _MSC_VER
    // Microsoft Visual C++
    #define COMPILER_MSVC _MSC_VER
#endif

#ifdef __GNUC__
    // GCC
    #define COMPILER_GCC __GNUC__
#endif

#ifdef __clang__
    // Clang
    #define COMPILER_CLANG 1
#endif

#ifdef __INTEL_COMPILER
    // Intel C++ Compiler
    #define COMPILER_INTEL 1
#endif
\`\`\`

### Operating System Detection
\`\`\`c
// OS detection
#ifdef _WIN32
    // Windows (32-bit or 64-bit)
    #define OS_WINDOWS 1
    #ifdef _WIN64
        #define OS_WINDOWS_64 1
    #else
        #define OS_WINDOWS_32 1
    #endif
#endif

#ifdef __linux__
    #define OS_LINUX 1
#endif

#ifdef __APPLE__
    #define OS_MACOS 1
    #include <TargetConditionals.h>
    #ifdef TARGET_OS_IPHONE
        #define OS_IOS 1
    #endif
#endif

#ifdef __ANDROID__
    #define OS_ANDROID 1
#endif

#ifdef __unix__
    #define OS_UNIX 1
#endif

// BSD variants
#ifdef __FreeBSD__
    #define OS_FREEBSD 1
#endif

#ifdef __NetBSD__
    #define OS_NETBSD 1
#endif

#ifdef __OpenBSD__
    #define OS_OPENBSD 1
#endif
\`\`\`

### Architecture Detection
\`\`\`c
// Architecture detection
#ifdef __x86_64__
    #define ARCH_X86_64 1
    #define ARCH_BITS 64
#endif

#ifdef __i386__
    #define ARCH_X86 1
    #define ARCH_BITS 32
#endif

#ifdef __arm__
    #define ARCH_ARM 1
    #ifdef __ARM_ARCH_7__
        #define ARCH_ARM_V7 1
    #endif
#endif

#ifdef __aarch64__
    #define ARCH_ARM64 1
    #define ARCH_BITS 64
#endif

// Endianness
#ifdef __BYTE_ORDER__
    #if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
        #define ARCH_LITTLE_ENDIAN 1
    #elif __BYTE_ORDER__ == __ORDER_BIG_ENDIAN__
        #define ARCH_BIG_ENDIAN 1
    #endif
#endif
\`\`\`

## Portable Data Types

### Fixed-Width Integer Types (C99)
\`\`\`c
#include <stdint.h>
#include <inttypes.h>

// Exact-width types
int8_t   i8;   // 8-bit signed
uint8_t  u8;   // 8-bit unsigned
int16_t  i16;  // 16-bit signed
uint16_t u16;  // 16-bit unsigned
int32_t  i32;  // 32-bit signed
uint32_t u32;  // 32-bit unsigned
int64_t  i64;  // 64-bit signed
uint64_t u64;  // 64-bit unsigned

// Minimum-width types
int_least8_t  least_i8;
uint_least16_t least_u16;

// Fast types (fastest type with at least N bits)
int_fast8_t  fast_i8;
uint_fast32_t fast_u32;

// Pointer-sized types
intptr_t  ptr_int;
uintptr_t ptr_uint;

// Maximum-width types
intmax_t  max_int;
uintmax_t max_uint;

// Format specifiers
printf("int64: %" PRId64 "\\n", i64);
printf("uint32: %" PRIu32 "\\n", u32);
printf("size_t: %" PRIuPTR "\\n", (uintptr_t)ptr);
\`\`\`

### Platform-Specific Types
\`\`\`c
// Cross-platform type definitions
#ifdef OS_WINDOWS
    typedef HANDLE file_handle_t;
    typedef SOCKET socket_t;
    typedef DWORD thread_id_t;
    #define PATH_SEPARATOR "\\\\"
    #define PATH_SEPARATOR_CHAR '\\\\'
#endif

#ifdef OS_LINUX
    typedef int file_handle_t;
    typedef int socket_t;
    typedef pthread_t thread_id_t;
    #define PATH_SEPARATOR "/"
    #define PATH_SEPARATOR_CHAR '/'
#endif

#ifdef OS_MACOS
    typedef int file_handle_t;
    typedef int socket_t;
    typedef pthread_t thread_id_t;
    #define PATH_SEPARATOR "/"
    #define PATH_SEPARATOR_CHAR '/'
#endif

// Generic types
typedef file_handle_t file_t;
typedef socket_t socket_fd;
typedef thread_id_t thread_t;
\`\`\`

## File System Operations

### Path Handling
\`\`\`c
#include <stdlib.h>
#include <string.h>

// Cross-platform path operations
char *path_join(const char *dir, const char *file) {
    size_t dir_len = strlen(dir);
    size_t file_len = strlen(file);
    size_t total_len = dir_len + file_len + 2; // +1 for separator, +1 for null

    char *result = malloc(total_len);
    if (!result) return NULL;

    strcpy(result, dir);

    // Add separator if not present
    if (result[dir_len - 1] != PATH_SEPARATOR_CHAR) {
        strcat(result, PATH_SEPARATOR);
    }

    strcat(result, file);
    return result;
}

// Get directory from path
char *path_dirname(const char *path) {
    char *last_sep = strrchr(path, PATH_SEPARATOR_CHAR);
    if (!last_sep) return strdup(".");

    size_t len = last_sep - path;
    char *result = malloc(len + 1);
    if (!result) return NULL;

    memcpy(result, path, len);
    result[len] = '\\0';
    return result;
}

// Get filename from path
char *path_basename(const char *path) {
    char *last_sep = strrchr(path, PATH_SEPARATOR_CHAR);
    if (!last_sep) return strdup(path);
    return strdup(last_sep + 1);
}

// Normalize path
char *path_normalize(const char *path) {
    // Basic normalization - remove double separators
    char *result = strdup(path);
    if (!result) return NULL;

    char *ptr = result;
    while (*ptr) {
        if (*ptr == PATH_SEPARATOR_CHAR &&
            *(ptr + 1) == PATH_SEPARATOR_CHAR) {
            // Remove duplicate separator
            memmove(ptr, ptr + 1, strlen(ptr));
        } else {
            ptr++;
        }
    }

    return result;
}
\`\`\`

### File I/O Abstraction
\`\`\`c
// Cross-platform file I/O wrapper
typedef struct {
    file_handle_t handle;
    int flags;
} file_wrapper_t;

// Open file
file_wrapper_t *file_open(const char *filename, const char *mode) {
    file_wrapper_t *file = malloc(sizeof(file_wrapper_t));
    if (!file) return NULL;

#ifdef OS_WINDOWS
    DWORD access_flags = 0;
    DWORD share_flags = FILE_SHARE_READ;
    DWORD create_flags = 0;

    if (strchr(mode, 'r')) access_flags |= GENERIC_READ;
    if (strchr(mode, 'w')) access_flags |= GENERIC_WRITE;
    if (strchr(mode, 'w')) create_flags = CREATE_ALWAYS;
    else create_flags = OPEN_EXISTING;

    file->handle = CreateFile(filename, access_flags, share_flags,
                             NULL, create_flags, FILE_ATTRIBUTE_NORMAL, NULL);
    if (file->handle == INVALID_HANDLE_VALUE) {
        free(file);
        return NULL;
    }
#endif

#ifdef OS_LINUX
    int flags = 0;
    if (strchr(mode, 'r') && strchr(mode, 'w')) flags |= O_RDWR;
    else if (strchr(mode, 'r')) flags |= O_RDONLY;
    else if (strchr(mode, 'w')) flags |= O_WRONLY | O_CREAT | O_TRUNC;

    file->handle = open(filename, flags, 0644);
    if (file->handle < 0) {
        free(file);
        return NULL;
    }
#endif

    return file;
}

// Read from file
size_t file_read(file_wrapper_t *file, void *buffer, size_t size) {
#ifdef OS_WINDOWS
    DWORD bytes_read;
    if (!ReadFile(file->handle, buffer, size, &bytes_read, NULL)) {
        return 0;
    }
    return bytes_read;
#endif

#ifdef OS_LINUX
    return read(file->handle, buffer, size);
#endif
}

// Write to file
size_t file_write(file_wrapper_t *file, const void *buffer, size_t size) {
#ifdef OS_WINDOWS
    DWORD bytes_written;
    if (!WriteFile(file->handle, buffer, size, &bytes_written, NULL)) {
        return 0;
    }
    return bytes_written;
#endif

#ifdef OS_LINUX
    return write(file->handle, buffer, size);
#endif
}

// Close file
void file_close(file_wrapper_t *file) {
#ifdef OS_WINDOWS
    CloseHandle(file->handle);
#endif

#ifdef OS_LINUX
    close(file->handle);
#endif

    free(file);
}
\`\`\`

## Threading Abstractions

### Thread Creation Wrapper
\`\`\`c
typedef struct {
    thread_t handle;
    void *(*start_routine)(void *arg);
    void *arg;
} thread_wrapper_t;

// Thread creation
thread_wrapper_t *thread_create(void *(*start_routine)(void *), void *arg) {
    thread_wrapper_t *thread = malloc(sizeof(thread_wrapper_t));
    if (!thread) return NULL;

    thread->start_routine = start_routine;
    thread->arg = arg;

#ifdef OS_WINDOWS
    thread->handle = CreateThread(NULL, 0, start_routine, arg, 0, NULL);
    if (thread->handle == NULL) {
        free(thread);
        return NULL;
    }
#endif

#ifdef OS_LINUX
    if (pthread_create(&thread->handle, NULL, start_routine, arg) != 0) {
        free(thread);
        return NULL;
    }
#endif

    return thread;
}

// Thread join
int thread_join(thread_wrapper_t *thread, void **retval) {
#ifdef OS_WINDOWS
    WaitForSingleObject(thread->handle, INFINITE);
    GetExitCodeThread(thread->handle, (DWORD *)retval);
    CloseHandle(thread->handle);
    free(thread);
    return 0;
#endif

#ifdef OS_LINUX
    int result = pthread_join(thread->handle, retval);
    free(thread);
    return result;
#endif
}
\`\`\`

### Mutex Abstraction
\`\`\`c
typedef struct {
#ifdef OS_WINDOWS
    CRITICAL_SECTION cs;
#endif
#ifdef OS_LINUX
    pthread_mutex_t mutex;
#endif
} mutex_wrapper_t;

// Initialize mutex
void mutex_init(mutex_wrapper_t *mutex) {
#ifdef OS_WINDOWS
    InitializeCriticalSection(&mutex->cs);
#endif
#ifdef OS_LINUX
    pthread_mutex_init(&mutex->mutex, NULL);
#endif
}

// Lock mutex
void mutex_lock(mutex_wrapper_t *mutex) {
#ifdef OS_WINDOWS
    EnterCriticalSection(&mutex->cs);
#endif
#ifdef OS_LINUX
    pthread_mutex_lock(&mutex->mutex);
#endif
}

// Unlock mutex
void mutex_unlock(mutex_wrapper_t *mutex) {
#ifdef OS_WINDOWS
    LeaveCriticalSection(&mutex->cs);
#endif
#ifdef OS_LINUX
    pthread_mutex_unlock(&mutex->mutex);
#endif
}

// Destroy mutex
void mutex_destroy(mutex_wrapper_t *mutex) {
#ifdef OS_WINDOWS
    DeleteCriticalSection(&mutex->cs);
#endif
#ifdef OS_LINUX
    pthread_mutex_destroy(&mutex->mutex);
#endif
}
\`\`\`

## Network Programming Abstraction

### Socket Abstraction
\`\`\`c
typedef struct {
    socket_fd fd;
    int domain;
    int type;
    int protocol;
} socket_wrapper_t;

// Create socket
socket_wrapper_t *socket_create(int domain, int type, int protocol) {
    socket_wrapper_t *sock = malloc(sizeof(socket_wrapper_t));
    if (!sock) return NULL;

    sock->domain = domain;
    sock->type = type;
    sock->protocol = protocol;

#ifdef OS_WINDOWS
    sock->fd = WSASocket(domain, type, protocol, NULL, 0, 0);
    if (sock->fd == INVALID_SOCKET) {
        free(sock);
        return NULL;
    }
#endif

#ifdef OS_LINUX
    sock->fd = socket(domain, type, protocol);
    if (sock->fd < 0) {
        free(sock);
        return NULL;
    }
#endif

    return sock;
}

// Close socket
void socket_close(socket_wrapper_t *sock) {
#ifdef OS_WINDOWS
    closesocket(sock->fd);
#endif
#ifdef OS_LINUX
    close(sock->fd);
#endif
    free(sock);
}
\`\`\`

## Dynamic Library Loading

### Cross-Platform Dynamic Loading
\`\`\`c
typedef struct {
#ifdef OS_WINDOWS
    HMODULE handle;
#endif
#ifdef OS_LINUX
    void *handle;
#endif
} library_handle_t;

// Load library
library_handle_t *library_load(const char *filename) {
    library_handle_t *lib = malloc(sizeof(library_handle_t));
    if (!lib) return NULL;

#ifdef OS_WINDOWS
    lib->handle = LoadLibrary(filename);
    if (lib->handle == NULL) {
        free(lib);
        return NULL;
    }
#endif

#ifdef OS_LINUX
    lib->handle = dlopen(filename, RTLD_LAZY);
    if (lib->handle == NULL) {
        free(lib);
        return NULL;
    }
#endif

    return lib;
}

// Get function pointer
void *library_get_symbol(library_handle_t *lib, const char *symbol_name) {
#ifdef OS_WINDOWS
    return (void *)GetProcAddress(lib->handle, symbol_name);
#endif
#ifdef OS_LINUX
    return dlsym(lib->handle, symbol_name);
#endif
}

// Unload library
void library_unload(library_handle_t *lib) {
#ifdef OS_WINDOWS
    FreeLibrary(lib->handle);
#endif
#ifdef OS_LINUX
    dlclose(lib->handle);
#endif
    free(lib);
}
\`\`\`

## Build System Abstractions

### Cross-Platform Makefiles
\`\`\`makefile
# Cross-platform Makefile

# Compiler detection
ifdef COMSPEC
    # Windows
    CC = gcc
    EXE_EXT = .exe
    RM = del /Q
else
    # Unix-like
    CC = gcc
    EXE_EXT =
    RM = rm -f
endif

# Platform-specific flags
ifdef OS_WINDOWS
    LIBS = -lws2_32
    CFLAGS += -DWIN32
else
    LIBS =
    CFLAGS +=
endif

# Build targets
TARGET = myprogram$(EXE_EXT)

$(TARGET): main.o utils.o
	$(CC) $(CFLAGS) -o $@ $^ $(LIBS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	$(RM) *.o $(TARGET)

.PHONY: clean
\`\`\`

### CMake Cross-Platform Build
\`\`\`cmake
cmake_minimum_required(VERSION 3.10)
project(MyProject)

# Find platform-specific libraries
set(PLATFORM_LIBS "")  # Default empty

if(WIN32)
    set(PLATFORM_LIBS ws2_32)
    add_definitions(-DWIN32)
elseif(UNIX)
    set(PLATFORM_LIBS pthread)
    add_definitions(-DUNIX)
endif()

# Create executable
add_executable(myprogram main.c utils.c)
target_link_libraries(myprogram \${PLATFORM_LIBS})

# Platform-specific source files
if(WIN32)
    target_sources(myprogram PRIVATE windows_specific.c)
elseif(APPLE)
    target_sources(myprogram PRIVATE macos_specific.c)
elseif(UNIX AND NOT APPLE)
    target_sources(myprogram PRIVATE linux_specific.c)
endif()
\`\`\`

## Testing Cross-Platform Code

### Platform-Specific Test Macros
\`\`\`c
// Test macros for different platforms
#define TEST_PASSED 0
#define TEST_FAILED 1

#define TEST_ASSERT(condition, message) \\
    do { \\
        if (!(condition)) { \\
            fprintf(stderr, "TEST FAILED: %s\\n", message); \\
            fprintf(stderr, "  File: %s, Line: %d\\n", __FILE__, __LINE__); \\
            return TEST_FAILED; \\
        } \\
    } while (0)

#define TEST_PLATFORM_SPECIFIC(test_func) \\
    do { \\
        printf("Running %s on ", #test_func); \\
        platform_print_name(); \\
        printf("\\n"); \\
        \\
        int result = test_func(); \\
        if (result == TEST_PASSED) { \\
            printf("PASSED\\n"); \\
        } else { \\
            printf("FAILED\\n"); \\
        } \\
    } while (0)

void platform_print_name(void) {
#ifdef OS_WINDOWS
    printf("Windows");
#endif
#ifdef OS_LINUX
    printf("Linux");
#endif
#ifdef OS_MACOS
    printf("macOS");
#endif
}

// Example test
int test_file_operations(void) {
    // Test basic file operations
    TEST_ASSERT(create_test_file() == 0, "Failed to create test file");
    TEST_ASSERT(write_test_data() == 0, "Failed to write test data");
    TEST_ASSERT(read_test_data() == 0, "Failed to read test data");
    TEST_ASSERT(delete_test_file() == 0, "Failed to delete test file");

    return TEST_PASSED;
}

int main(void) {
    TEST_PLATFORM_SPECIFIC(test_file_operations);
    return 0;
}
\`\`\`

Cross-platform C programming requires careful attention to platform differences, proper abstraction layers, and thorough testing across target platforms. Using conditional compilation and platform-specific implementations ensures code portability and maintainability.`
};

