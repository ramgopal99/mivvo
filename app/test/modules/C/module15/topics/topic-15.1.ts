import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_1: SubLesson = {
  id: '15.1',
  title: 'String and Memory Functions (<string.h>, <stdlib.h>)',
  status: 'demo',
  content: `# String and Memory Functions (<string.h>, <stdlib.h>)

## String Manipulation Functions

### Basic String Operations
\`\`\`c
#include <string.h>
#include <stdio.h>

int main() {
    char str1[20] = "Hello";
    char str2[20] = "World";
    char result[40];

    // String length
    size_t len1 = strlen(str1);        // 5
    size_t len2 = strlen(str2);        // 5

    // String copy
    strcpy(result, str1);              // result = "Hello"
    strcat(result, " ");               // result = "Hello "
    strcat(result, str2);              // result = "Hello World"

    // String comparison
    int cmp = strcmp(str1, "Hello");   // 0 (equal)
    cmp = strcmp(str1, "World");       // < 0 (str1 < str2)

    // Case-insensitive comparison
    cmp = strcasecmp("Hello", "HELLO"); // 0 (equal)

    printf("Result: %s\\n", result);
    printf("Length: %zu\\n", strlen(result));

    return 0;
}
\`\`\`

### Advanced String Operations
\`\`\`c
#include <string.h>

int main() {
    char buffer[100] = "Hello, World! This is a test.";

    // String search
    char *found = strstr(buffer, "World");     // Points to "World"
    char *chr = strchr(buffer, 'o');           // Points to first 'o'
    char *rchr = strrchr(buffer, 'o');         // Points to last 'o'

    // Tokenization
    char *token;
    char *rest = buffer;
    while ((token = strtok_r(rest, " ,.!?", &rest))) {
        printf("Token: %s\\n", token);
    }

    // String duplication
    char *dup = strdup("Original string");
    printf("Duplicated: %s\\n", dup);
    free(dup);

    // Error-safe functions (C11 Annex K)
    #ifdef __STDC_WANT_LIB_EXT1__
    char dest[10];
    errno_t err = strcpy_s(dest, sizeof(dest), "Too long string");
    if (err != 0) {
        printf("Copy failed: %d\\n", err);
    }
    #endif

    return 0;
}
\`\`\`

## Memory Management Functions

### Dynamic Memory Allocation
\`\`\`c
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float salary;
} Employee;

// Single object allocation
Employee *emp = malloc(sizeof(Employee));
if (emp == NULL) {
    perror("malloc failed");
    return 1;
}

// Initialize
strcpy(emp->name, "John Doe");
emp->age = 30;
emp->salary = 50000.0;

// Array allocation
int *numbers = calloc(10, sizeof(int));  // Zero-initialized
if (numbers == NULL) {
    perror("calloc failed");
    free(emp);
    return 1;
}

// Resize allocation
numbers = realloc(numbers, 20 * sizeof(int));
if (numbers == NULL) {
    perror("realloc failed");
    free(emp);
    return 1;
}

// Use the memory
for (int i = 0; i < 20; i++) {
    numbers[i] = i * i;
}

// Clean up
free(numbers);
free(emp);
\`\`\`

### Memory Manipulation Functions
\`\`\`c
#include <string.h>

int main() {
    // Memory copy
    char source[20] = "Hello, World!";
    char dest[20];

    memcpy(dest, source, strlen(source) + 1);
    printf("Copied: %s\\n", dest);

    // Memory move (handles overlapping regions)
    char buffer[20] = "ABCDEFGHIJ";
    memmove(buffer + 2, buffer, 5);    // Overlapping copy
    printf("After memmove: %s\\n", buffer);  // "ABABCDEFGHIJ"

    // Memory comparison
    char str1[] = "Hello";
    char str2[] = "Hello";
    char str3[] = "World";

    int cmp1 = memcmp(str1, str2, 5);  // 0 (equal)
    int cmp2 = memcmp(str1, str3, 5);  // < 0

    // Memory search
    char data[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    char *found = memchr(data, 5, sizeof(data));  // Points to element 5

    // Memory set
    char buffer[10];
    memset(buffer, 0, sizeof(buffer));    // Zero fill
    memset(buffer, -1, sizeof(buffer));   // Set to all 1s

    return 0;
}
\`\`\`

## Conversion Functions

### String to Number Conversions
\`\`\`c
#include <stdlib.h>
#include <errno.h>
#include <limits.h>

int main() {
    char *endptr;

    // Integer conversions
    char *str_int = "12345";
    long int_val = strtol(str_int, &endptr, 10);
    if (*endptr != '\\0' || errno == ERANGE) {
        printf("Invalid integer conversion\\n");
    }

    // Floating point conversions
    char *str_float = "3.14159";
    double float_val = strtod(str_float, &endptr);
    if (*endptr != '\\0' || errno == ERANGE) {
        printf("Invalid float conversion\\n");
    }

    // Base conversions
    char *hex_str = "FF";
    long hex_val = strtol(hex_str, NULL, 16);  // 255

    char *oct_str = "77";
    long oct_val = strtol(oct_str, NULL, 8);   // 63

    // Number to string conversions
    char buffer[50];

    itoa(123, buffer, 10);     // "123"
    ltoa(456L, buffer, 16);    // "1c8" (hex)

    // Safe conversions (POSIX)
    long safe_int = atol("invalid");  // Returns 0, no error indication

    printf("Converted values: %ld, %f, %ld, %ld\\n",
           int_val, float_val, hex_val, oct_val);

    return 0;
}
\`\`\`

## Random Number Generation

### Standard Random Functions
\`\`\`c
#include <stdlib.h>
#include <time.h>

int main() {
    // Seed the random number generator
    srand(time(NULL));

    // Generate random numbers
    int random_int = rand();                    // 0 to RAND_MAX
    int dice_roll = (rand() % 6) + 1;           // 1 to 6
    int card = (rand() % 52);                   // 0 to 51

    // Generate random float [0.0, 1.0)
    double random_float = (double)rand() / RAND_MAX;

    // Generate multiple random numbers
    printf("Random numbers: ");
    for (int i = 0; i < 10; i++) {
        printf("%d ", rand() % 100);
    }
    printf("\\n");

    // Cryptographically secure random (if available)
    #ifdef __STDC_LIB_EXT1__
    unsigned char crypto_bytes[32];
    if (rand_s(crypto_bytes) == 0) {
        printf("Generated cryptographically secure random bytes\\n");
    }
    #endif

    return 0;
}
\`\`\`

## Environment and System Functions

### Environment Variables
\`\`\`c
#include <stdlib.h>

int main() {
    // Get environment variable
    char *path = getenv("PATH");
    if (path) {
        printf("PATH: %s\\n", path);
    }

    // Set environment variable
    if (setenv("MY_VAR", "my_value", 1) == 0) {
        printf("Environment variable set\\n");
    }

    // Unset environment variable
    unsetenv("MY_VAR");

    // Get all environment variables
    extern char **environ;
    for (char **env = environ; *env != NULL; env++) {
        printf("%s\\n", *env);
    }

    return 0;
}
\`\`\`

## Sorting and Searching

### qsort - Quick Sort
\`\`\`c
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int compare_strings(const void *a, const void *b) {
    return strcmp(*(const char **)a, *(const char **)b);
}

int main() {
    // Sort integers
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    size_t n = sizeof(numbers) / sizeof(numbers[0]);

    qsort(numbers, n, sizeof(int), compare_ints);

    printf("Sorted integers: ");
    for (size_t i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    // Sort strings
    const char *strings[] = {"zebra", "apple", "banana", "cherry"};
    size_t str_count = sizeof(strings) / sizeof(strings[0]);

    qsort(strings, str_count, sizeof(char *), compare_strings);

    printf("Sorted strings: ");
    for (size_t i = 0; i < str_count; i++) {
        printf("%s ", strings[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### bsearch - Binary Search
\`\`\`c
#include <stdlib.h>

int compare_ints(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int numbers[] = {11, 12, 22, 25, 34, 64, 90};
    size_t n = sizeof(numbers) / sizeof(numbers[0]);

    int key = 25;
    int *found = bsearch(&key, numbers, n, sizeof(int), compare_ints);

    if (found) {
        printf("Found %d at index %ld\\n", *found, found - numbers);
    } else {
        printf("%d not found\\n", key);
    }

    return 0;
}
\`\`\`

## Multibyte and Wide Character Support

### Multibyte Character Functions
\`\`\`c
#include <stdlib.h>
#include <string.h>

int main() {
    // Wide character to multibyte
    wchar_t wide_str[] = L"Hello, 世界!";
    char mb_str[100];

    size_t converted = wcstombs(mb_str, wide_str, sizeof(mb_str));
    if (converted != (size_t)-1) {
        printf("Wide to multibyte: %s\\n", mb_str);
    }

    // Multibyte to wide character
    wchar_t wide_result[50];
    size_t wide_converted = mbstowcs(wide_result, mb_str, sizeof(wide_result) / sizeof(wchar_t));
    if (wide_converted != (size_t)-1) {
        printf("Multibyte to wide: %ls\\n", wide_result);
    }

    // Character conversion restart
    mbstate_t state = {0};
    const char *mb_ptr = "UTF-8 string";
    wchar_t wc;
    size_t result = mbrtowc(&wc, mb_ptr, strlen(mb_ptr), &state);

    return 0;
}
\`\`\`

This covers the fundamental string and memory manipulation functions in the C Standard Library, which are essential for most C programs.`
};

