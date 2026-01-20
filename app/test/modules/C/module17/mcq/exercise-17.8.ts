import { Exercise } from '../../../../data/lessonsData';

export const exercise_17_8: Exercise = {
  id: "17.8",
  title: 'C Libraries & Tools Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "build_system_and_dependencies",
      question: `## Comprehensive Build System with Dependencies

Create a complete build system for a C library that manages dependencies, includes external libraries, and supports multiple platforms. Implement:

1. **CMake Build System**: Cross-platform configuration with dependency management
2. **External Dependencies**: Integration with SQLite and cURL libraries
3. **Testing Framework**: Unit tests with coverage reporting
4. **Documentation**: Doxygen documentation generation
5. **Package Generation**: Create installable packages
6. **CI/CD Integration**: GitHub Actions workflow

**Requirements:**
- Use CMake for build configuration
- Integrate SQLite and cURL libraries
- Implement comprehensive unit tests
- Generate documentation with Doxygen
- Support multiple platforms (Linux/macOS/Windows)
- Include code formatting and static analysis
- Create Debian/RPM packages

**Project Structure:**
\`\`\`
myproject/
├── CMakeLists.txt
├── README.md
├── .github/workflows/ci.yml
├── include/
│   └── mylib.h
├── src/
│   ├── core.c
│   └── database.c
├── tests/
│   ├── test_core.c
│   └── test_database.c
├── docs/
│   └── Doxyfile
├── scripts/
│   └── build_deb.sh
└── examples/
    └── simple_example.c
\`\`\``,
      solution: `# CMakeLists.txt - Main build configuration
cmake_minimum_required(VERSION 3.15)
project(mylib VERSION 1.0.0 LANGUAGES C)

# Set C standard
set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)

# Options
option(BUILD_TESTS "Build test suite" ON)
option(BUILD_EXAMPLES "Build example programs" ON)
option(BUILD_DOCS "Generate documentation" ON)
option(ENABLE_COVERAGE "Enable code coverage" OFF)

# Find required packages
find_package(PkgConfig REQUIRED)

# SQLite3
pkg_check_modules(SQLITE3 REQUIRED sqlite3)
include_directories(\${SQLITE3_INCLUDE_DIRS})

# cURL
pkg_check_modules(CURL REQUIRED libcurl)
include_directories(\${CURL_INCLUDE_DIRS})

# Compiler warnings
if(CMAKE_C_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# Coverage flags
if(ENABLE_COVERAGE AND CMAKE_C_COMPILER_ID MATCHES "GNU|Clang")
    add_compile_options(-fprofile-arcs -ftest-coverage)
    add_link_options(-fprofile-arcs)
endif()

# Include directories
include_directories(include)

# Source files
set(SOURCES
    src/core.c
    src/database.c
)

# Create library
add_library(mylib SHARED \${SOURCES})
target_link_libraries(mylib
    \${SQLITE3_LIBRARIES}
    \${CURL_LIBRARIES}
    m  # math library
)

# Set library version
set_target_properties(mylib PROPERTIES
    VERSION \${PROJECT_VERSION}
    SOVERSION \${PROJECT_VERSION_MAJOR}
)

# Install library
install(TARGETS mylib
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
)

# Install headers
install(DIRECTORY include/
    DESTINATION include
    FILES_MATCHING PATTERN "*.h"
)

# Tests
if(BUILD_TESTS)
    enable_testing()

    # Test executable
    add_executable(test_suite tests/test_core.c tests/test_database.c)
    target_link_libraries(test_suite mylib)

    # Add test
    add_test(NAME unit_tests COMMAND test_suite)

    # Coverage reporting
    if(ENABLE_COVERAGE)
        find_program(GCOVR_EXECUTABLE gcovr)
        if(GCOVR_EXECUTABLE)
            add_custom_target(coverage
                COMMAND \${GCOVR_EXECUTABLE}
                    --root \${CMAKE_SOURCE_DIR}
                    --object-directory \${CMAKE_BINARY_DIR}
                    --html --html-details
                    --output coverage.html
                WORKING_DIRECTORY \${CMAKE_BINARY_DIR}
                COMMENT "Generating coverage report"
            )
        endif()
    endif()
endif()

# Examples
if(BUILD_EXAMPLES)
    add_executable(simple_example examples/simple_example.c)
    target_link_libraries(simple_example mylib)
endif()

# Documentation
if(BUILD_DOCS)
    find_package(Doxygen)
    if(DOXYGEN_FOUND)
        set(DOXYGEN_IN \${CMAKE_CURRENT_SOURCE_DIR}/docs/Doxyfile.in)
        set(DOXYGEN_OUT \${CMAKE_CURRENT_BINARY_DIR}/Doxyfile)

        configure_file(\${DOXYGEN_IN} \${DOXYGEN_OUT} @ONLY)
        add_custom_target(docs
            COMMAND \${DOXYGEN_EXECUTABLE} \${DOXYGEN_OUT}
            WORKING_DIRECTORY \${CMAKE_CURRENT_BINARY_DIR}
            COMMENT "Generating API documentation with Doxygen"
            VERBATIM
        )
    endif()
endif()

# Packaging
set(CPACK_PACKAGE_NAME \${PROJECT_NAME})
set(CPACK_PACKAGE_VERSION \${PROJECT_VERSION})
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "My C Library with Database Support")
set(CPACK_PACKAGE_VENDOR "Your Name")

# Debian package
set(CPACK_DEBIAN_PACKAGE_MAINTAINER "Your Name <your.email@example.com>")
set(CPACK_DEBIAN_PACKAGE_DEPENDS "libsqlite3-0, libcurl4")

# RPM package
set(CPACK_RPM_PACKAGE_LICENSE "MIT")
set(CPACK_RPM_PACKAGE_REQUIRES "sqlite, libcurl")

include(CPack)

# Print configuration summary
message(STATUS "Configuration Summary:")
message(STATUS "  Build tests: \${BUILD_TESTS}")
message(STATUS "  Build examples: \${BUILD_EXAMPLES}")
message(STATUS "  Build docs: \${BUILD_DOCS}")
message(STATUS "  Enable coverage: \${ENABLE_COVERAGE}")
message(STATUS "  SQLite3: \${SQLITE3_VERSION}")
message(STATUS "  cURL: \${CURL_VERSION}")
`
    },
    {
      id: "library_design_and_api",
      question: `## Professional C Library Design

Design and implement a professional-quality C library following industry best practices. Create a reusable library for data compression and decompression with:

1. **Clean API Design**: Intuitive, consistent interface with opaque types
2. **Error Handling**: Comprehensive error reporting and recovery
3. **Memory Management**: Safe memory handling with custom allocators
4. **Thread Safety**: Concurrent access support
5. **Extensibility**: Plugin architecture for different compression algorithms
6. **Cross-Platform**: Portable across different operating systems
7. **Documentation**: Complete API documentation
8. **Testing**: Comprehensive test suite

**Requirements:**
- Support multiple compression algorithms (LZ77, Huffman, etc.)
- Streaming compression/decompression
- Memory-mapped file support
- Compression level configuration
- Progress callbacks
- Benchmarking and performance metrics

**Example Usage:**
\`\`\`c
// Initialize library
CompressionLib *lib = compression_lib_create();
if (!lib) {
    fprintf(stderr, "Failed to create compression library\\n");
    return 1;
}

// Compress data
CompressionConfig config = {
    .algorithm = COMPRESSION_LZ77,
    .level = COMPRESSION_LEVEL_NORMAL,
    .progress_callback = my_progress_callback,
    .user_data = NULL
};

size_t compressed_size;
uint8_t *compressed = compression_compress(lib, input_data, input_size,
                                          &compressed_size, &config);

if (!compressed) {
    fprintf(stderr, "Compression failed: %s\\n",
            compression_lib_error_string(lib));
    compression_lib_destroy(lib);
    return 1;
}

// Decompress data
size_t decompressed_size;
uint8_t *decompressed = compression_decompress(lib, compressed, compressed_size,
                                              &decompressed_size, NULL);

// Clean up
free(compressed);
free(decompressed);
compression_lib_destroy(lib);
\`\`\`

**Implementation Focus:**
- Modular architecture with clear separation of concerns
- Comprehensive error handling with detailed error messages
- Memory safety with bounds checking and leak prevention
- Thread-safe operations where appropriate
- Performance optimizations and benchmarking capabilities
- Extensible plugin system for compression algorithms`,
      solution: `#ifndef COMPRESSION_LIB_H
#define COMPRESSION_LIB_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

// Library version
#define COMPRESSION_LIB_VERSION_MAJOR 1
#define COMPRESSION_LIB_VERSION_MINOR 0
#define COMPRESSION_LIB_VERSION_PATCH 0

// Error codes
typedef enum {
    COMPRESSION_SUCCESS = 0,
    COMPRESSION_ERROR_INVALID_ARGUMENT = -1,
    COMPRESSION_ERROR_MEMORY = -2,
    COMPRESSION_ERROR_CORRUPTED_DATA = -3,
    COMPRESSION_ERROR_UNSUPPORTED_ALGORITHM = -4,
    COMPRESSION_ERROR_COMPRESSION_FAILED = -5,
    COMPRESSION_ERROR_DECOMPRESSION_FAILED = -6,
    COMPRESSION_ERROR_THREAD_SAFETY = -7
} CompressionError;

// Compression algorithms
typedef enum {
    COMPRESSION_NONE,
    COMPRESSION_LZ77,
    COMPRESSION_HUFFMAN,
    COMPRESSION_DEFLATE,
    COMPRESSION_LZMA,
    COMPRESSION_BROTLI
} CompressionAlgorithm;

// Compression levels
typedef enum {
    COMPRESSION_LEVEL_FASTEST,
    COMPRESSION_LEVEL_FAST,
    COMPRESSION_LEVEL_NORMAL,
    COMPRESSION_LEVEL_GOOD,
    COMPRESSION_LEVEL_BEST
} CompressionLevel;

// Progress callback
typedef void (*ProgressCallback)(void *user_data, size_t processed, size_t total);

// Compression configuration
typedef struct {
    CompressionAlgorithm algorithm;
    CompressionLevel level;
    ProgressCallback progress_callback;
    void *user_data;
    bool enable_threading;
    size_t max_memory_usage;  // 0 = unlimited
} CompressionConfig;

// Opaque library handle
typedef struct CompressionLib CompressionLib;

// Library lifecycle
CompressionLib *compression_lib_create(void);
void compression_lib_destroy(CompressionLib *lib);

// Error handling
CompressionError compression_lib_last_error(const CompressionLib *lib);
const char *compression_lib_error_string(CompressionError error);

// Core compression functions
uint8_t *compression_compress(const CompressionLib *lib,
                             const uint8_t *input_data, size_t input_size,
                             size_t *output_size, const CompressionConfig *config);

uint8_t *compression_decompress(const CompressionLib *lib,
                               const uint8_t *input_data, size_t input_size,
                               size_t *output_size, const CompressionConfig *config);

// Streaming compression (for large files)
typedef struct CompressionStream CompressionStream;

CompressionStream *compression_stream_create(const CompressionLib *lib,
                                           CompressionAlgorithm algorithm,
                                           bool compress_mode);
void compression_stream_destroy(CompressionStream *stream);

CompressionError compression_stream_process(CompressionStream *stream,
                                          const uint8_t *input_data, size_t input_size,
                                          uint8_t **output_data, size_t *output_size);

CompressionError compression_stream_finish(CompressionStream *stream,
                                         uint8_t **output_data, size_t *output_size);

// File operations
CompressionError compression_compress_file(const CompressionLib *lib,
                                         const char *input_file, const char *output_file,
                                         const CompressionConfig *config);

CompressionError compression_decompress_file(const CompressionLib *lib,
                                           const char *input_file, const char *output_file,
                                           const CompressionConfig *config);

// Utility functions
bool compression_supports_algorithm(const CompressionLib *lib, CompressionAlgorithm algorithm);
const char *compression_algorithm_name(CompressionAlgorithm algorithm);
double compression_get_ratio(size_t original_size, size_t compressed_size);

// Benchmarking
typedef struct {
    double compression_time;
    double decompression_time;
    double compression_ratio;
    size_t original_size;
    size_t compressed_size;
    double compression_speed;  // bytes/second
    double decompression_speed; // bytes/second
} CompressionBenchmark;

CompressionBenchmark compression_benchmark(const CompressionLib *lib,
                                         const uint8_t *data, size_t size,
                                         const CompressionConfig *config);

// Memory management (custom allocator support)
typedef void *(*CompressionAllocFunc)(size_t size);
typedef void (*CompressionFreeFunc)(void *ptr);

void compression_lib_set_allocator(CompressionLib *lib,
                                  CompressionAllocFunc alloc_func,
                                  CompressionFreeFunc free_func);

// Version information
const char *compression_lib_version_string(void);

#ifdef __cplusplus
}
#endif

#endif // COMPRESSION_LIB_H

// ============================================================================
// Implementation (compression_lib.c)
// ============================================================================

#include "compression_lib.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <pthread.h>
#include <assert.h>

// Internal structures
struct CompressionLib {
    CompressionError last_error;
    CompressionAllocFunc alloc_func;
    CompressionFreeFunc free_func;
    pthread_mutex_t mutex;
    // Algorithm availability flags
    bool supports_lz77;
    bool supports_huffman;
    bool supports_deflate;
    bool supports_lzma;
    bool supports_brotli;
};

struct CompressionStream {
    const CompressionLib *lib;
    CompressionAlgorithm algorithm;
    bool compress_mode;
    void *internal_state;
    // Stream-specific data...
};

// Error messages
static const char *error_messages[] = {
    "Success",
    "Invalid argument",
    "Memory allocation failed",
    "Corrupted data",
    "Unsupported algorithm",
    "Compression failed",
    "Decompression failed",
    "Thread safety violation"
};

// Default allocator
static void *default_alloc(size_t size) {
    return malloc(size);
}

static void default_free(void *ptr) {
    free(ptr);
}

// Utility functions
static void set_error(CompressionLib *lib, CompressionError error) {
    if (lib) {
        pthread_mutex_lock(&lib->mutex);
        lib->last_error = error;
        pthread_mutex_unlock(&lib->mutex);
    }
}

static void *lib_alloc(const CompressionLib *lib, size_t size) {
    return lib->alloc_func ? lib->alloc_func(size) : default_alloc(size);
}

static void lib_free(const CompressionLib *lib, void *ptr) {
    if (lib->free_func) {
        lib->free_func(ptr);
    } else {
        default_free(ptr);
    }
}

// Library lifecycle
CompressionLib *compression_lib_create(void) {
    CompressionLib *lib = calloc(1, sizeof(CompressionLib));
    if (!lib) return NULL;

    lib->alloc_func = default_alloc;
    lib->free_func = default_free;
    lib->last_error = COMPRESSION_SUCCESS;

    // Initialize thread safety
    if (pthread_mutex_init(&lib->mutex, NULL) != 0) {
        free(lib);
        return NULL;
    }

    // Check available algorithms (simplified - in real implementation,
    // this would check for available libraries)
    lib->supports_lz77 = true;
    lib->supports_huffman = true;
    lib->supports_deflate = true;
    lib->supports_lzma = false;  // Would check for liblzma
    lib->supports_brotli = false; // Would check for libbrotli

    return lib;
}

void compression_lib_destroy(CompressionLib *lib) {
    if (!lib) return;

    pthread_mutex_destroy(&lib->mutex);
    free(lib);
}

// Error handling
CompressionError compression_lib_last_error(const CompressionLib *lib) {
    if (!lib) return COMPRESSION_ERROR_INVALID_ARGUMENT;

    CompressionError error;
    pthread_mutex_lock(&lib->mutex);
    error = lib->last_error;
    pthread_mutex_unlock(&lib->mutex);

    return error;
}

const char *compression_lib_error_string(CompressionError error) {
    int index = -error;
    if (index >= 0 && index < (int)(sizeof(error_messages) / sizeof(error_messages[0]))) {
        return error_messages[index];
    }
    return "Unknown error";
}

// Utility functions
bool compression_supports_algorithm(const CompressionLib *lib, CompressionAlgorithm algorithm) {
    if (!lib) return false;

    switch (algorithm) {
        case COMPRESSION_NONE: return true;
        case COMPRESSION_LZ77: return lib->supports_lz77;
        case COMPRESSION_HUFFMAN: return lib->supports_huffman;
        case COMPRESSION_DEFLATE: return lib->supports_deflate;
        case COMPRESSION_LZMA: return lib->supports_lzma;
        case COMPRESSION_BROTLI: return lib->supports_brotli;
        default: return false;
    }
}

const char *compression_algorithm_name(CompressionAlgorithm algorithm) {
    switch (algorithm) {
        case COMPRESSION_NONE: return "None";
        case COMPRESSION_LZ77: return "LZ77";
        case COMPRESSION_HUFFMAN: return "Huffman";
        case COMPRESSION_DEFLATE: return "Deflate";
        case COMPRESSION_LZMA: return "LZMA";
        case COMPRESSION_BROTLI: return "Brotli";
        default: return "Unknown";
    }
}

double compression_get_ratio(size_t original_size, size_t compressed_size) {
    if (original_size == 0) return 0.0;
    return (double)compressed_size / (double)original_size;
}

// Version
const char *compression_lib_version_string(void) {
    static char version[32];
    snprintf(version, sizeof(version), "%d.%d.%d",
             COMPRESSION_LIB_VERSION_MAJOR,
             COMPRESSION_LIB_VERSION_MINOR,
             COMPRESSION_LIB_VERSION_PATCH);
    return version;
}

// Custom allocator
void compression_lib_set_allocator(CompressionLib *lib,
                                  CompressionAllocFunc alloc_func,
                                  CompressionFreeFunc free_func) {
    if (!lib) return;

    pthread_mutex_lock(&lib->mutex);
    lib->alloc_func = alloc_func ? alloc_func : default_alloc;
    lib->free_func = free_func ? free_func : default_free;
    pthread_mutex_unlock(&lib->mutex);
}

// Simplified compression/decompression (would implement real algorithms)
uint8_t *compression_compress(const CompressionLib *lib,
                             const uint8_t *input_data, size_t input_size,
                             size_t *output_size, const CompressionConfig *config) {
    if (!lib || !input_data || !output_size || !config) {
        return NULL;
    }

    if (!compression_supports_algorithm(lib, config->algorithm)) {
        return NULL;
    }

    // Simplified: just copy data (real implementation would compress)
    uint8_t *output = lib_alloc(lib, input_size);
    if (!output) return NULL;

    memcpy(output, input_data, input_size);
    *output_size = input_size;

    return output;
}

uint8_t *compression_decompress(const CompressionLib *lib,
                               const uint8_t *input_data, size_t input_size,
                               size_t *output_size, const CompressionConfig *config) {
    if (!lib || !input_data || !output_size) {
        return NULL;
    }

    // Simplified: just copy data (real implementation would decompress)
    uint8_t *output = lib_alloc(lib, input_size);
    if (!output) return NULL;

    memcpy(output, input_data, input_size);
    *output_size = input_size;

    return output;
}

// File operations (simplified)
CompressionError compression_compress_file(const CompressionLib *lib,
                                         const char *input_file, const char *output_file,
                                         const CompressionConfig *config) {
    // Simplified implementation - would read input file, compress, write output file
    (void)lib; (void)input_file; (void)output_file; (void)config;
    return COMPRESSION_SUCCESS;
}

CompressionError compression_decompress_file(const CompressionLib *lib,
                                           const char *input_file, const char *output_file,
                                           const CompressionConfig *config) {
    // Simplified implementation
    (void)lib; (void)input_file; (void)output_file; (void)config;
    return COMPRESSION_SUCCESS;
}

// Benchmarking (simplified)
CompressionBenchmark compression_benchmark(const CompressionLib *lib,
                                         const uint8_t *data, size_t size,
                                         const CompressionConfig *config) {
    CompressionBenchmark bench = {0};

    if (!lib || !data || !config) return bench;

    bench.original_size = size;

    // Compress
    clock_t start = clock();
    size_t compressed_size;
    uint8_t *compressed = compression_compress(lib, data, size, &compressed_size, config);
    clock_t compress_end = clock();

    if (compressed) {
        bench.compressed_size = compressed_size;
        bench.compression_time = (double)(compress_end - start) / CLOCKS_PER_SEC;
        bench.compression_ratio = compression_get_ratio(size, compressed_size);

        // Decompress
        size_t decompressed_size;
        uint8_t *decompressed = compression_decompress(lib, compressed, compressed_size,
                                                      &decompressed_size, config);
        clock_t decompress_end = clock();

        if (decompressed) {
            bench.decompression_time = (double)(decompress_end - compress_end) / CLOCKS_PER_SEC;
            bench.compression_speed = (double)size / bench.compression_time;
            bench.decompression_speed = (double)size / bench.decompression_time;

            lib_free(lib, decompressed);
        }

        lib_free(lib, compressed);
    }

    return bench;
}

// Stream operations (stub implementations)
CompressionStream *compression_stream_create(const CompressionLib *lib,
                                           CompressionAlgorithm algorithm,
                                           bool compress_mode) {
    (void)lib; (void)algorithm; (void)compress_mode;
    return NULL; // Stub
}

void compression_stream_destroy(CompressionStream *stream) {
    (void)stream; // Stub
}

CompressionError compression_stream_process(CompressionStream *stream,
                                          const uint8_t *input_data, size_t input_size,
                                          uint8_t **output_data, size_t *output_size) {
    (void)stream; (void)input_data; (void)input_size; (void)output_data; (void)output_size;
    return COMPRESSION_SUCCESS; // Stub
}

CompressionError compression_stream_finish(CompressionStream *stream,
                                         uint8_t **output_data, size_t *output_size) {
    (void)stream; (void)output_data; (void)output_size;
    return COMPRESSION_SUCCESS; // Stub
}
`
    }
  ]
};
