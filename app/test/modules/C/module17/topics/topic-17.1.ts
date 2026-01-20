import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_1: SubLesson = {
  id: '17.1',
  title: 'External Libraries and Linking',
  status: 'demo',
  content: `# External Libraries and Linking in C

## Static vs Dynamic Linking

### Static Libraries (.a files)
Static libraries are archives of object files that are linked directly into the executable at compile time.

**Creating a Static Library:**
\`\`\`bash
# Compile object files
gcc -c math_utils.c -o math_utils.o
gcc -c string_utils.c -o string_utils.o

# Create static library
ar rcs libmyutils.a math_utils.o string_utils.o

# Link with static library
gcc main.c -L. -lmyutils -o program
\`\`\`

**Advantages:**
- No external dependencies
- Faster startup (no dynamic loading)
- Better optimization opportunities

**Disadvantages:**
- Larger executable size
- Updates require recompilation
- Memory waste if library used by multiple programs

### Dynamic Libraries (.so/.dll files)
Dynamic libraries are loaded at runtime, allowing multiple programs to share the same code.

**Creating a Shared Library:**
\`\`\`bash
# Compile with position-independent code
gcc -c -fPIC math_utils.c -o math_utils.o
gcc -c -fPIC string_utils.c -o string_utils.o

# Create shared library
gcc -shared -o libmyutils.so math_utils.o string_utils.o

# Link with shared library
gcc main.c -L. -lmyutils -o program

# Set library path
export LD_LIBRARY_PATH=.:$LD_LIBRARY_PATH
\`\`\`

**Advantages:**
- Smaller executables
- Updates don't require recompilation
- Memory efficient for multiple processes

**Disadvantages:**
- Startup overhead
- Dependency management complexity
- Version compatibility issues

## Popular C Libraries

### GLib (GNOME Core Library)
A comprehensive utility library for C programming.

**Features:**
- Data structures (GHashTable, GArray, GList)
- Memory management utilities
- String manipulation
- Threading support
- Main loop implementation

**Example Usage:**
\`\`\`c
#include <glib.h>

int main() {
    // Hash table
    GHashTable *hash = g_hash_table_new(g_str_hash, g_str_equal);
    g_hash_table_insert(hash, "key1", "value1");
    char *value = g_hash_table_lookup(hash, "key1");
    g_hash_table_destroy(hash);

    // String utilities
    gchar *upper = g_utf8_strup("hello world", -1);
    g_free(upper);

    // Array
    GArray *array = g_array_new(FALSE, FALSE, sizeof(int));
    int num = 42;
    g_array_append_val(array, num);
    g_array_free(array, TRUE);

    return 0;
}
\`\`\`

### SQLite - Embedded Database
Lightweight, file-based SQL database engine.

**Features:**
- Self-contained, serverless database
- ACID compliance
- SQL query support
- Small footprint (~600KB)
- Cross-platform

**Example Usage:**
\`\`\`c
#include <sqlite3.h>

int main() {
    sqlite3 *db;
    char *err_msg = 0;

    // Open database
    int rc = sqlite3_open("example.db", &db);
    if (rc != SQLITE_OK) {
        fprintf(stderr, "Cannot open database: %s\\n", sqlite3_errmsg(db));
        return 1;
    }

    // Create table
    const char *sql = "CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT);";
    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);

    // Insert data
    sql = "INSERT INTO users(name) VALUES('John');";
    rc = sqlite3_exec(db, sql, 0, 0, &err_msg);

    // Query data
    sql = "SELECT * FROM users;";
    sqlite3_stmt *stmt;
    sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);

    while (sqlite3_step(stmt) == SQLITE_ROW) {
        int id = sqlite3_column_int(stmt, 0);
        const char *name = sqlite3_column_text(stmt, 1);
        printf("User: %d - %s\\n", id, name);
    }

    sqlite3_finalize(stmt);
    sqlite3_close(db);

    return 0;
}
\`\`\`

### cURL - Client URL Library
Library for transferring data with URLs (HTTP, FTP, etc.).

**Features:**
- HTTP/HTTPS support
- FTP/FTPS support
- SSL/TLS support
- Cookies and authentication
- Proxy support

**Example Usage:**
\`\`\`c
#include <curl/curl.h>

// Callback function for writing received data
size_t write_callback(void *ptr, size_t size, size_t nmemb, void *userdata) {
    FILE *file = (FILE *)userdata;
    return fwrite(ptr, size, nmemb, file);
}

int main() {
    CURL *curl = curl_easy_init();
    if (!curl) return 1;

    FILE *file = fopen("download.html", "wb");
    if (!file) return 1;

    // Set URL
    curl_easy_setopt(curl, CURLOPT_URL, "https://example.com");

    // Set write callback
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, file);

    // Follow redirects
    curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

    // Perform request
    CURLcode res = curl_easy_perform(curl);

    if (res != CURLE_OK) {
        fprintf(stderr, "curl_easy_perform() failed: %s\\n", curl_easy_strerror(res));
    }

    fclose(file);
    curl_easy_cleanup(curl);

    return 0;
}
\`\`\`

### OpenSSL - Cryptography Library
Comprehensive cryptography library.

**Features:**
- Symmetric encryption (AES, DES)
- Asymmetric encryption (RSA, ECC)
- Hash functions (SHA, MD5)
- Digital signatures
- SSL/TLS protocols

**Example Usage:**
\`\`\`c
#include <openssl/sha.h>
#include <openssl/aes.h>
#include <stdio.h>
#include <string.h>

int main() {
    const char *data = "Hello, World!";
    unsigned char hash[SHA256_DIGEST_LENGTH];

    // SHA256 hash
    SHA256((unsigned char *)data, strlen(data), hash);

    printf("SHA256: ");
    for (int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        printf("%02x", hash[i]);
    }
    printf("\\n");

    // Simple AES encryption (simplified example)
    AES_KEY aes_key;
    unsigned char key[16] = "0123456789abcdef";  // 128-bit key
    unsigned char plaintext[16] = "Hello, AES!    ";  // 16 bytes
    unsigned char ciphertext[16];

    AES_set_encrypt_key(key, 128, &aes_key);
    AES_encrypt(plaintext, ciphertext, &aes_key);

    printf("AES Encrypted: ");
    for (int i = 0; i < 16; i++) {
        printf("%02x", ciphertext[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

## Library Linking and Loading

### Runtime Library Loading
\`\`\`c
#include <dlfcn.h>
#include <stdio.h>

int main() {
    // Load library at runtime
    void *handle = dlopen("./libmymath.so", RTLD_LAZY);
    if (!handle) {
        fprintf(stderr, "Error loading library: %s\\n", dlerror());
        return 1;
    }

    // Get function pointer
    typedef double (*add_func)(double, double);
    add_func add = (add_func)dlsym(handle, "add");

    if (!add) {
        fprintf(stderr, "Error finding function: %s\\n", dlerror());
        dlclose(handle);
        return 1;
    }

    // Use function
    double result = add(3.14, 2.86);
    printf("Result: %f\\n", result);

    // Close library
    dlclose(handle);

    return 0;
}
\`\`\`

### Linker Script Basics
Linker scripts control how programs are laid out in memory.

**Simple Linker Script:**
\`\`\`ld
MEMORY
{
  FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 128K
  RAM (rwx) : ORIGIN = 0x20000000, LENGTH = 20K
}

SECTIONS
{
  .text : {
    *(.text)
    *(.text*)
  } > FLASH

  .data : {
    *(.data)
    *(.data*)
  } > RAM AT > FLASH

  .bss : {
    *(.bss)
    *(.bss*)
  } > RAM
}
\`\`\`

## Package Managers for C

### Conan (C/C++ Package Manager)
\`\`\`bash
# Install Conan
pip install conan

# Create conanfile.txt
[requires]
boost/1.75.0
openssl/1.1.1

[generators]
cmake

# Install dependencies
conan install .

# Use in CMake
find_package(Boost REQUIRED)
target_link_libraries(my_app Boost::boost)
\`\`\`

### vcpkg (Microsoft's C++ Package Manager)
\`\`\`bash
# Clone vcpkg
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg && ./bootstrap-vcpkg.sh

# Install packages
./vcpkg install boost
./vcpkg install openssl

# Integrate with CMake
cmake -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake ..
\`\`\`

## Cross-Platform Library Development

### Platform-Specific Implementations
\`\`\`c
// platform.h
#ifndef PLATFORM_H
#define PLATFORM_H

#ifdef _WIN32
  #define PLATFORM_WINDOWS
  #define PATH_SEPARATOR "\\\\"
#else
  #define PLATFORM_POSIX
  #define PATH_SEPARATOR "/"
#endif

#endif // PLATFORM_H

// file_io.h
#ifndef FILE_IO_H
#define FILE_IO_H

#include "platform.h"

#ifdef PLATFORM_WINDOWS
  #include <windows.h>
  typedef HANDLE file_handle_t;
#else
  #include <unistd.h>
  typedef int file_handle_t;
#endif

file_handle_t file_open(const char *path);
void file_close(file_handle_t handle);
size_t file_read(file_handle_t handle, void *buffer, size_t size);
size_t file_write(file_handle_t handle, const void *buffer, size_t size);

#endif // FILE_IO_H

// file_io_win32.c
#ifdef PLATFORM_WINDOWS

file_handle_t file_open(const char *path) {
    return CreateFileA(path, GENERIC_READ | GENERIC_WRITE, 0, NULL,
                      OPEN_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
}

void file_close(file_handle_t handle) {
    CloseHandle(handle);
}

size_t file_read(file_handle_t handle, void *buffer, size_t size) {
    DWORD bytes_read;
    ReadFile(handle, buffer, (DWORD)size, &bytes_read, NULL);
    return bytes_read;
}

size_t file_write(file_handle_t handle, const void *buffer, size_t size) {
    DWORD bytes_written;
    WriteFile(handle, buffer, (DWORD)size, &bytes_written, NULL);
    return bytes_written;
}

#endif // PLATFORM_WINDOWS
\`\`\`

External libraries extend C's capabilities significantly, providing functionality for databases, networking, cryptography, and more. Understanding linking, library management, and cross-platform development is essential for professional C programming.`
};

