import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_6: SubLesson = {
  id: '16.6',
  title: 'Cross-Platform Development and Portability',
  status: 'demo',
  content: `# Cross-Platform Development and Portability in C

## Platform Detection and Abstraction

### Comprehensive Platform Detection
\`\`\`c
// platform.h - Platform detection header
#ifndef PLATFORM_H
#define PLATFORM_H

// Compiler detection
#ifdef _MSC_VER
    #define COMPILER_MSVC 1
    #define COMPILER_NAME "MSVC"
#endif

#ifdef __GNUC__
    #define COMPILER_GCC 1
    #define COMPILER_NAME "GCC"
#endif

#ifdef __clang__
    #define COMPILER_CLANG 1
    #define COMPILER_NAME "Clang"
#endif

// Operating system detection
#ifdef _WIN32
    #define OS_WINDOWS 1
    #define OS_NAME "Windows"
    #ifdef _WIN64
        #define OS_ARCH "x64"
    #else
        #define OS_ARCH "x86"
    #endif
#endif

#ifdef __linux__
    #define OS_LINUX 1
    #define OS_NAME "Linux"
#endif

#ifdef __APPLE__
    #define OS_MACOS 1
    #define OS_NAME "macOS"
#endif

#ifdef __ANDROID__
    #define OS_ANDROID 1
    #define OS_NAME "Android"
#endif

// Architecture detection
#ifdef __x86_64__
    #define ARCH_X86_64 1
    #define ARCH_NAME "x86_64"
#endif

#ifdef __i386__
    #define ARCH_X86 1
    #define ARCH_NAME "x86"
#endif

#ifdef __arm__
    #define ARCH_ARM 1
    #define ARCH_NAME "ARM"
#endif

#ifdef __aarch64__
    #define ARCH_ARM64 1
    #define ARCH_NAME "ARM64"
#endif

// Endianness detection
#define LITTLE_ENDIAN 0
#define BIG_ENDIAN 1

#ifdef __BYTE_ORDER__
    #if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
        #define ENDIANNESS LITTLE_ENDIAN
    #elif __BYTE_ORDER__ == __ORDER_BIG_ENDIAN__
        #define ENDIANNESS BIG_ENDIAN
    #endif
#endif

// Debug/Release detection
#ifdef NDEBUG
    #define BUILD_TYPE "Release"
#else
    #define BUILD_TYPE "Debug"
#endif

// Platform string
#define PLATFORM_STRING OS_NAME "-" ARCH_NAME "-" COMPILER_NAME "-" BUILD_TYPE

#endif // PLATFORM_H
\`\`\`

### Portable Type Definitions
\`\`\`c
// types.h - Portable type definitions
#ifndef TYPES_H
#define TYPES_H

#include <stdint.h>
#include <stddef.h>

// Fixed-size integer types (C99)
typedef int8_t   i8;
typedef uint8_t  u8;
typedef int16_t  i16;
typedef uint16_t u16;
typedef int32_t  i32;
typedef uint32_t u32;
typedef int64_t  i64;
typedef uint64_t u64;

// Size types
typedef size_t   usize;
typedef ptrdiff_t isize;

// Boolean type
#ifndef __cplusplus
    #ifndef bool
        typedef _Bool bool;
        #define true  1
        #define false 0
    #endif
#endif

// Handle types
#ifdef OS_WINDOWS
    typedef void*    handle_t;
    typedef handle_t file_handle_t;
    typedef u32      thread_id_t;
    typedef u32      process_id_t;
    #define PATH_SEPARATOR "\\"
    #define PATH_SEPARATOR_CHAR '\\\\'
#else
    typedef int      handle_t;
    typedef int      file_handle_t;
    typedef pid_t    process_id_t;
    typedef pthread_t thread_id_t;
    #define PATH_SEPARATOR "/"
    #define PATH_SEPARATOR_CHAR '/'
#endif

// Socket types
#ifdef OS_WINDOWS
    typedef u64 socket_t;
#else
    typedef int socket_t;
#endif

#endif // TYPES_H
\`\`\`

## File System Abstraction

### Cross-Platform File I/O
\`\`\`c
// file.h - Cross-platform file operations
#ifndef FILE_H
#define FILE_H

#include "types.h"
#include <stdio.h>

#ifdef __cplusplus
extern "C" {
#endif

// File open modes (portable)
#define FILE_MODE_READ   "rb"
#define FILE_MODE_WRITE  "wb"
#define FILE_MODE_APPEND "ab"
#define FILE_MODE_UPDATE "r+b"

// Portable file functions
file_handle_t file_open(const char *path, const char *mode);
void file_close(file_handle_t file);
size_t file_read(file_handle_t file, void *buffer, size_t size);
size_t file_write(file_handle_t file, const void *buffer, size_t size);
bool file_seek(file_handle_t file, i64 offset, int origin);
i64 file_tell(file_handle_t file);
i64 file_size(file_handle_t file);
bool file_exists(const char *path);
bool file_delete(const char *path);

#ifdef __cplusplus
}
#endif

#endif // FILE_H
\`\`\`

### Implementation for Different Platforms
\`\`\`c
// file_win32.c - Windows implementation
#ifdef OS_WINDOWS

#include "file.h"
#include <windows.h>

file_handle_t file_open(const char *path, const char *mode) {
    DWORD access = 0;
    DWORD create = 0;

    if (strchr(mode, 'r')) access |= GENERIC_READ;
    if (strchr(mode, 'w')) access |= GENERIC_WRITE;
    if (strchr(mode, '+')) access |= GENERIC_READ | GENERIC_WRITE;

    if (strchr(mode, 'w')) {
        create = CREATE_ALWAYS;
    } else if (strchr(mode, 'a')) {
        create = OPEN_ALWAYS;
    } else {
        create = OPEN_EXISTING;
    }

    HANDLE handle = CreateFileA(path, access, 0, NULL, create, FILE_ATTRIBUTE_NORMAL, NULL);
    return handle != INVALID_HANDLE_VALUE ? handle : NULL;
}

void file_close(file_handle_t file) {
    CloseHandle(file);
}

size_t file_read(file_handle_t file, void *buffer, size_t size) {
    DWORD bytes_read;
    ReadFile(file, buffer, (DWORD)size, &bytes_read, NULL);
    return bytes_read;
}

size_t file_write(file_handle_t file, const void *buffer, size_t size) {
    DWORD bytes_written;
    WriteFile(file, buffer, (DWORD)size, &bytes_written, NULL);
    return bytes_written;
}

// ... other Windows implementations

#endif // OS_WINDOWS
\`\`\`

\`\`\`c
// file_posix.c - POSIX implementation
#ifdef OS_LINUX

#include "file.h"
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>

file_handle_t file_open(const char *path, const char *mode) {
    int flags = 0;

    if (strchr(mode, 'r') && strchr(mode, '+')) flags |= O_RDWR;
    else if (strchr(mode, 'r')) flags |= O_RDONLY;
    else if (strchr(mode, 'w') && strchr(mode, '+')) flags |= O_RDWR | O_CREAT | O_TRUNC;
    else if (strchr(mode, 'w')) flags |= O_WRONLY | O_CREAT | O_TRUNC;
    else if (strchr(mode, 'a') && strchr(mode, '+')) flags |= O_RDWR | O_CREAT | O_APPEND;
    else if (strchr(mode, 'a')) flags |= O_WRONLY | O_CREAT | O_APPEND;

    return open(path, flags, 0644);
}

void file_close(file_handle_t file) {
    close(file);
}

size_t file_read(file_handle_t file, void *buffer, size_t size) {
    return read(file, buffer, size);
}

size_t file_write(file_handle_t file, const void *buffer, size_t size) {
    return write(file, buffer, size);
}

// ... other POSIX implementations

#endif // OS_LINUX
\`\`\`

## Threading Abstraction

### Cross-Platform Threading API
\`\`\`c
// thread.h - Cross-platform threading
#ifndef THREAD_H
#define THREAD_H

#include "types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef void *(*thread_func_t)(void *arg);

typedef struct {
#ifdef OS_WINDOWS
    HANDLE handle;
#else
    pthread_t handle;
#endif
} thread_t;

typedef struct {
#ifdef OS_WINDOWS
    CRITICAL_SECTION cs;
#else
    pthread_mutex_t mutex;
#endif
} mutex_t;

// Thread functions
bool thread_create(thread_t *thread, thread_func_t func, void *arg);
bool thread_join(thread_t *thread, void **result);
void thread_detach(thread_t *thread);
thread_id_t thread_current_id(void);

// Mutex functions
bool mutex_init(mutex_t *mutex);
void mutex_destroy(mutex_t *mutex);
bool mutex_lock(mutex_t *mutex);
bool mutex_unlock(mutex_t *mutex);

#ifdef __cplusplus
}
#endif

#endif // THREAD_H
\`\`\`

### Windows Implementation
\`\`\`c
// thread_win32.c
#ifdef OS_WINDOWS

#include "thread.h"
#include <process.h>

static unsigned __stdcall thread_wrapper(void *arg) {
    thread_func_t func = ((void **)arg)[0];
    void *func_arg = ((void **)arg)[1];
    free(arg);
    return (unsigned)func(func_arg);
}

bool thread_create(thread_t *thread, thread_func_t func, void *arg) {
    void **wrapper_arg = malloc(sizeof(void *) * 2);
    if (!wrapper_arg) return false;

    wrapper_arg[0] = func;
    wrapper_arg[1] = arg;

    uintptr_t handle = _beginthreadex(NULL, 0, thread_wrapper, wrapper_arg, 0, NULL);
    if (handle == 0) {
        free(wrapper_arg);
        return false;
    }

    thread->handle = (HANDLE)handle;
    return true;
}

bool thread_join(thread_t *thread, void **result) {
    DWORD exit_code;
    if (WaitForSingleObject(thread->handle, INFINITE) == WAIT_OBJECT_0) {
        GetExitCodeThread(thread->handle, &exit_code);
        CloseHandle(thread->handle);
        if (result) *result = (void *)(uintptr_t)exit_code;
        return true;
    }
    return false;
}

// ... other Windows threading implementations

#endif // OS_WINDOWS
\`\`\`

## Dynamic Library Loading

### Cross-Platform Dynamic Loading
\`\`\`c
// library.h - Dynamic library loading
#ifndef LIBRARY_H
#define LIBRARY_H

#include "types.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
#ifdef OS_WINDOWS
    HMODULE handle;
#else
    void *handle;
#endif
} library_t;

// Library functions
bool library_load(library_t *lib, const char *path);
void library_unload(library_t *lib);
void *library_get_symbol(library_t *lib, const char *symbol_name);

// Platform-specific library naming
#ifdef OS_WINDOWS
    #define LIBRARY_EXTENSION ".dll"
    #define LIBRARY_PREFIX ""
#else
    #define LIBRARY_EXTENSION ".so"
    #define LIBRARY_PREFIX "lib"
#endif

#define LIBRARY_NAME(name) LIBRARY_PREFIX name LIBRARY_EXTENSION

#ifdef __cplusplus
}
#endif

#endif // LIBRARY_H
\`\`\`

## Build System Configuration

### CMake Cross-Platform Configuration
\`\`\`cmake
# CMakeLists.txt - Cross-platform build configuration
cmake_minimum_required(VERSION 3.10)
project(MyProject C)

# Set C standard
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Platform-specific settings
if(WIN32)
    # Windows-specific settings
    add_definitions(-D_CRT_SECURE_NO_WARNINGS)
    set(PLATFORM_LIBS ws2_32)

    # Use static runtime in release
    foreach(config CMAKE_C_FLAGS_RELEASE CMAKE_C_FLAGS_RELWITHDEBINFO)
        # Replace /MD with /MT for static linking
        set(temp_flags \${CMAKE_C_FLAGS})
        string(REPLACE "/MD" "/MT" temp_flags "\${temp_flags}")
        set(\${config} "\${temp_flags}")
    endforeach()
elseif(UNIX)
    # Unix-specific settings
    set(PLATFORM_LIBS pthread m)
    add_definitions(-D_GNU_SOURCE)
endif()

# Architecture detection
if(CMAKE_SIZEOF_VOID_P EQUAL 8)
    add_definitions(-DARCH_64BIT)
else()
    add_definitions(-DARCH_32BIT)
endif()

# Compiler-specific optimizations
if(CMAKE_C_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(-Wall -Wextra -Wpedantic)
    add_compile_options($<$<CONFIG:Release>:-O3>)
    add_compile_options($<$<CONFIG:Debug>:-g -O0>)
elseif(MSVC)
    add_compile_options(/W4)
    add_compile_options($<$<CONFIG:Release>:/O2>)
    add_compile_options($<$<CONFIG:Debug>:/Od>)
endif()

# Source files
file(GLOB SOURCES "src/*.c")
file(GLOB HEADERS "include/*.h")

# Create library
add_library(\${PROJECT_NAME} SHARED \${SOURCES} \${HEADERS})
target_include_directories(\${PROJECT_NAME} PUBLIC include)
target_link_libraries(\${PROJECT_NAME} \${PLATFORM_LIBS})

# Create executable
add_executable(\${PROJECT_NAME}_test test/main.c)
target_link_libraries(\${PROJECT_NAME}_test \${PROJECT_NAME})

# Installation
install(TARGETS \${PROJECT_NAME} LIBRARY DESTINATION lib)
install(FILES \${HEADERS} DESTINATION include)
\`\`\`

## Endianness Handling

### Portable Byte Order Conversion
\`\`\`c
// endian.h - Endianness handling
#ifndef ENDIAN_H
#define ENDIAN_H

#include "types.h"

// Byte swap functions
static inline u16 byteswap_u16(u16 value) {
    return (value >> 8) | (value << 8);
}

static inline u32 byteswap_u32(u32 value) {
    return ((value & 0x000000FF) << 24) |
           ((value & 0x0000FF00) << 8) |
           ((value & 0x00FF0000) >> 8) |
           ((value & 0xFF000000) >> 24);
}

static inline u64 byteswap_u64(u64 value) {
    return ((value & 0x00000000000000FFULL) << 56) |
           ((value & 0x000000000000FF00ULL) << 40) |
           ((value & 0x0000000000FF0000ULL) << 24) |
           ((value & 0x00000000FF000000ULL) << 8) |
           ((value & 0x000000FF00000000ULL) >> 8) |
           ((value & 0x0000FF0000000000ULL) >> 24) |
           ((value & 0x00FF000000000000ULL) >> 40) |
           ((value & 0xFF00000000000000ULL) >> 56);
}

// Host to network byte order (big endian)
#define hton_u16(value) (ENDIANNESS == LITTLE_ENDIAN ? byteswap_u16(value) : (value))
#define hton_u32(value) (ENDIANNESS == LITTLE_ENDIAN ? byteswap_u32(value) : (value))
#define hton_u64(value) (ENDIANNESS == LITTLE_ENDIAN ? byteswap_u64(value) : (value))

// Network to host byte order
#define ntoh_u16(value) hton_u16(value)
#define ntoh_u32(value) hton_u32(value)
#define ntoh_u64(value) hton_u64(value)

#endif // ENDIAN_H
\`\`\`

## Configuration Management

### Platform-Specific Configuration
\`\`\`c
// config.h - Platform-specific configuration
#ifndef CONFIG_H
#define CONFIG_H

// Default paths
#ifdef OS_WINDOWS
    #define DEFAULT_CONFIG_PATH "%APPDATA%\\MyApp\\config.ini"
    #define DEFAULT_DATA_PATH "%APPDATA%\\MyApp\\data"
    #define DEFAULT_LOG_PATH "%TEMP%\\myapp.log"
#else
    #define DEFAULT_CONFIG_PATH "~/.config/myapp/config.ini"
    #define DEFAULT_DATA_PATH "~/.local/share/myapp"
    #define DEFAULT_LOG_PATH "/tmp/myapp.log"
#endif

// Memory settings based on platform
#ifdef ARCH_X86_64
    #define DEFAULT_BUFFER_SIZE (64 * 1024 * 1024)  // 64MB on 64-bit
#else
    #define DEFAULT_BUFFER_SIZE (16 * 1024 * 1024)  // 16MB on 32-bit
#endif

// Thread settings
#ifdef OS_WINDOWS
    #define DEFAULT_THREAD_STACK_SIZE (1 * 1024 * 1024)  // 1MB on Windows
#else
    #define DEFAULT_THREAD_STACK_SIZE (8 * 1024 * 1024)  // 8MB on POSIX
#endif

// Feature detection
#ifdef COMPILER_GCC
    #define HAS_BUILTIN_POPCOUNT 1
    #define HAS_BUILTIN_CLZ 1
#endif

#ifdef COMPILER_MSVC
    #define HAS_INTRINSIC_POPCOUNT 1
#endif

#endif // CONFIG_H
\`\`\`

## Testing Cross-Platform Code

### Platform-Specific Test Macros
\`\`\`c
// test_platform.h - Cross-platform testing
#ifndef TEST_PLATFORM_H
#define TEST_PLATFORM_H

#include "types.h"

// Test result codes
#define TEST_PASS 0
#define TEST_FAIL 1
#define TEST_SKIP 2

// Platform-specific test setup
#ifdef OS_WINDOWS
    #define TEST_SETUP() SetConsoleOutputCP(CP_UTF8)
    #define TEST_CLEANUP() /* Windows cleanup */
#else
    #define TEST_SETUP() /* POSIX setup */
    #define TEST_CLEANUP() /* POSIX cleanup */
#endif

// Timing functions for performance tests
#ifdef OS_WINDOWS
    #include <windows.h>
    static inline u64 get_timer_frequency(void) {
        LARGE_INTEGER freq;
        QueryPerformanceFrequency(&freq);
        return freq.QuadPart;
    }

    static inline u64 get_timer_value(void) {
        LARGE_INTEGER counter;
        QueryPerformanceCounter(&counter);
        return counter.QuadPart;
    }
#else
    #include <time.h>
    static inline u64 get_timer_frequency(void) {
        return 1000000000ULL;  // Nanoseconds
    }

    static inline u64 get_timer_value(void) {
        struct timespec ts;
        clock_gettime(CLOCK_MONOTONIC, &ts);
        return (u64)ts.tv_sec * 1000000000ULL + ts.tv_nsec;
    }
#endif

// High-resolution timer for benchmarks
typedef struct {
    u64 start_time;
    u64 frequency;
} benchmark_timer_t;

static inline void benchmark_start(benchmark_timer_t *timer) {
    timer->frequency = get_timer_frequency();
    timer->start_time = get_timer_value();
}

static inline double benchmark_stop(benchmark_timer_t *timer) {
    u64 end_time = get_timer_value();
    u64 elapsed = end_time - timer->start_time;
    return (double)elapsed / timer->frequency;
}

// Test runner
#define RUN_TEST(test_func) \\
    do { \\
        printf("Running %s... ", #test_func); \\
        fflush(stdout); \\
        int result = test_func(); \\
        if (result == TEST_PASS) { \\
            printf("PASS\\n"); \\
        } else if (result == TEST_FAIL) { \\
            printf("FAIL\\n"); \\
        } else { \\
            printf("SKIP\\n"); \\
        } \\
    } while (0)

#endif // TEST_PLATFORM_H
\`\`\`

Cross-platform development in C requires careful abstraction of platform-specific functionality, consistent type definitions, and thorough testing across target platforms. Using conditional compilation and platform detection allows writing portable code that works efficiently on different operating systems and architectures.`
};

