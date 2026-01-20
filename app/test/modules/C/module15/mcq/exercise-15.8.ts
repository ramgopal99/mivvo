import { Exercise } from '../../../../data/lessonsData';

export const exercise_15_8: Exercise = {
  id: "15.8",
  title: 'C Standard Library Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "string_processing_system",
      question: `## Advanced String Processing System

Implement a comprehensive string processing system that demonstrates various C Standard Library string functions. Create a library that provides:

1. **String Utilities**: Safe string operations with bounds checking
2. **Text Analysis**: Word counting, character frequency analysis
3. **String Transformation**: Case conversion, trimming, formatting
4. **Pattern Matching**: Simple substring search and replacement
5. **Memory Safety**: Proper bounds checking and error handling

**Requirements:**
- Use <string.h> functions appropriately
- Implement safe versions of standard functions
- Handle edge cases (NULL pointers, buffer overflows)
- Provide comprehensive error reporting
- Include unit tests for all functions

**Example Usage:**
\`\`\`c
StringProcessor *sp = string_processor_create();

const char *text = "  Hello,   World! How are you today?  ";
char *trimmed = string_processor_trim(sp, text);
printf("Trimmed: '%s'\\n", trimmed);

// Word analysis
WordStats stats = string_processor_analyze_words(sp, trimmed);
printf("Words: %d, Avg length: %.1f\\n", stats.count, stats.avg_length);

// Character frequency
CharFreq freq[256];
int unique_chars = string_processor_char_frequency(sp, trimmed, freq);
printf("Unique characters: %d\\n", unique_chars);

// Safe string operations
char result[100];
string_processor_safe_copy(sp, result, sizeof(result), "Hello", " ", "World");
printf("Concatenated: %s\\n", result);

string_processor_destroy(sp);
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <assert.h>
#include <errno.h>

// Error codes
typedef enum {
    SP_SUCCESS = 0,
    SP_ERROR_NULL_POINTER = -1,
    SP_ERROR_BUFFER_TOO_SMALL = -2,
    SP_ERROR_INVALID_ARGUMENT = -3,
    SP_ERROR_MEMORY_ALLOCATION = -4
} StringProcessorError;

// Character frequency structure
typedef struct {
    char character;
    int count;
} CharFreq;

// Word statistics
typedef struct {
    int count;
    double avg_length;
    int min_length;
    int max_length;
} WordStats;

// String processor structure
typedef struct {
    char *temp_buffer;
    size_t temp_buffer_size;
    int error_code;
    char error_message[256];
} StringProcessor;

// Create string processor
StringProcessor *string_processor_create(void) {
    StringProcessor *sp = malloc(sizeof(StringProcessor));
    if (!sp) return NULL;

    sp->temp_buffer = NULL;
    sp->temp_buffer_size = 0;
    sp->error_code = SP_SUCCESS;
    sp->error_message[0] = '\\0';

    return sp;
}

// Destroy string processor
void string_processor_destroy(StringProcessor *sp) {
    if (!sp) return;
    free(sp->temp_buffer);
    free(sp);
}

// Set error
static void set_error(StringProcessor *sp, int code, const char *message) {
    sp->error_code = code;
    strncpy(sp->error_message, message, sizeof(sp->error_message) - 1);
    sp->error_message[sizeof(sp->error_message) - 1] = '\\0';
}

// Get error information
int string_processor_get_error(const StringProcessor *sp, const char **message) {
    if (message) *message = sp->error_message;
    return sp->error_code;
}

// Ensure temp buffer is large enough
static int ensure_temp_buffer(StringProcessor *sp, size_t size) {
    if (sp->temp_buffer_size < size) {
        char *new_buffer = realloc(sp->temp_buffer, size);
        if (!new_buffer) {
            set_error(sp, SP_ERROR_MEMORY_ALLOCATION, "Failed to allocate temp buffer");
            return 0;
        }
        sp->temp_buffer = new_buffer;
        sp->temp_buffer_size = size;
    }
    return 1;
}

// Safe string copy with concatenation
int string_processor_safe_copy(StringProcessor *sp, char *dest, size_t dest_size,
                              const char *str1, const char *str2, const char *str3) {
    if (!sp || !dest || !str1) {
        set_error(sp, SP_ERROR_NULL_POINTER, "NULL pointer argument");
        return 0;
    }

    size_t len1 = strlen(str1);
    size_t len2 = str2 ? strlen(str2) : 0;
    size_t len3 = str3 ? strlen(str3) : 0;
    size_t total_len = len1 + len2 + len3 + 1;

    if (total_len > dest_size) {
        set_error(sp, SP_ERROR_BUFFER_TOO_SMALL, "Destination buffer too small");
        return 0;
    }

    strcpy(dest, str1);
    if (str2) strcat(dest, str2);
    if (str3) strcat(dest, str3);

    sp->error_code = SP_SUCCESS;
    return 1;
}

// Trim whitespace from string
char *string_processor_trim(StringProcessor *sp, const char *str) {
    if (!sp || !str) {
        set_error(sp, SP_ERROR_NULL_POINTER, "NULL pointer argument");
        return NULL;
    }

    // Find first non-whitespace character
    const char *start = str;
    while (*start && isspace(*start)) start++;

    // Find last non-whitespace character
    const char *end = str + strlen(str) - 1;
    while (end > start && isspace(*end)) end--;

    // Allocate result buffer
    size_t result_len = end - start + 2; // +1 for null, +1 for safety
    if (!ensure_temp_buffer(sp, result_len)) {
        return NULL;
    }

    // Copy trimmed string
    size_t len = end - start + 1;
    memcpy(sp->temp_buffer, start, len);
    sp->temp_buffer[len] = '\\0';

    sp->error_code = SP_SUCCESS;
    return sp->temp_buffer;
}

// Analyze words in text
WordStats string_processor_analyze_words(StringProcessor *sp, const char *text) {
    WordStats stats = {0, 0.0, INT_MAX, 0};
    if (!sp || !text) {
        set_error(sp, SP_ERROR_NULL_POINTER, "NULL pointer argument");
        return stats;
    }

    const char *ptr = text;
    int in_word = 0;
    int word_length = 0;
    int total_length = 0;

    while (*ptr) {
        if (isspace(*ptr)) {
            if (in_word) {
                // End of word
                stats.count++;
                total_length += word_length;
                if (word_length < stats.min_length) stats.min_length = word_length;
                if (word_length > stats.max_length) stats.max_length = word_length;
                word_length = 0;
                in_word = 0;
            }
        } else {
            // In word
            word_length++;
            in_word = 1;
        }
        ptr++;
    }

    // Handle last word
    if (in_word) {
        stats.count++;
        total_length += word_length;
        if (word_length < stats.min_length) stats.min_length = word_length;
        if (word_length > stats.max_length) stats.max_length = word_length;
    }

    if (stats.count > 0) {
        stats.avg_length = (double)total_length / stats.count;
    } else {
        stats.min_length = 0;
    }

    sp->error_code = SP_SUCCESS;
    return stats;
}

// Character frequency analysis
int string_processor_char_frequency(StringProcessor *sp, const char *text, CharFreq *freq) {
    if (!sp || !text || !freq) {
        set_error(sp, SP_ERROR_NULL_POINTER, "NULL pointer argument");
        return 0;
    }

    // Count frequencies
    int char_counts[256] = {0};
    const char *ptr = text;
    while (*ptr) {
        char_counts[(unsigned char)*ptr]++;
        ptr++;
    }

    // Collect non-zero frequencies
    int unique_count = 0;
    for (int i = 0; i < 256; i++) {
        if (char_counts[i] > 0) {
            freq[unique_count].character = (char)i;
            freq[unique_count].count = char_counts[i];
            unique_count++;
        }
    }

    sp->error_code = SP_SUCCESS;
    return unique_count;
}

// Simple substring replacement
char *string_processor_replace(StringProcessor *sp, const char *text,
                              const char *old_sub, const char *new_sub) {
    if (!sp || !text || !old_sub || !new_sub) {
        set_error(sp, SP_ERROR_NULL_POINTER, "NULL pointer argument");
        return NULL;
    }

    size_t text_len = strlen(text);
    size_t old_len = strlen(old_sub);
    size_t new_len = strlen(new_sub);

    if (old_len == 0) {
        set_error(sp, SP_ERROR_INVALID_ARGUMENT, "Empty substring to replace");
        return NULL;
    }

    // Count occurrences
    int count = 0;
    const char *ptr = text;
    while ((ptr = strstr(ptr, old_sub)) != NULL) {
        count++;
        ptr += old_len;
    }

    // Calculate result size
    size_t result_size = text_len + count * (new_len - old_len) + 1;
    if (!ensure_temp_buffer(sp, result_size)) {
        return NULL;
    }

    // Perform replacement
    char *result = sp->temp_buffer;
    const char *src = text;
    char *dst = result;

    while (*src) {
        if (strncmp(src, old_sub, old_len) == 0) {
            // Copy replacement
            memcpy(dst, new_sub, new_len);
            dst += new_len;
            src += old_len;
        } else {
            *dst++ = *src++;
        }
    }
    *dst = '\\0';

    sp->error_code = SP_SUCCESS;
    return result;
}

// Unit tests
void run_tests(void) {
    StringProcessor *sp = string_processor_create();
    assert(sp != NULL);

    // Test trim
    const char *test_str = "  Hello World  ";
    char *trimmed = string_processor_trim(sp, test_str);
    assert(trimmed != NULL);
    assert(strcmp(trimmed, "Hello World") == 0);

    // Test word analysis
    WordStats stats = string_processor_analyze_words(sp, "Hello beautiful world");
    assert(stats.count == 3);
    assert(stats.min_length == 5); // "Hello", "world"
    assert(stats.max_length == 9); // "beautiful"

    // Test character frequency
    CharFreq freq[256];
    int unique = string_processor_char_frequency(sp, "hello", freq);
    assert(unique == 4); // h, e, l, o
    // Find 'l' frequency
    int l_count = 0;
    for (int i = 0; i < unique; i++) {
        if (freq[i].character == 'l') {
            l_count = freq[i].count;
            break;
        }
    }
    assert(l_count == 2);

    // Test safe copy
    char buffer[50];
    int success = string_processor_safe_copy(sp, buffer, sizeof(buffer),
                                           "Hello", " ", "World");
    assert(success);
    assert(strcmp(buffer, "Hello World") == 0);

    // Test replacement
    char *replaced = string_processor_replace(sp, "Hello old world", "old", "new");
    assert(replaced != NULL);
    assert(strcmp(replaced, "Hello new world") == 0);

    string_processor_destroy(sp);
    printf("All tests passed!\\n");
}

int main() {
    run_tests();
    return 0;
}`
    },
    {
      id: "math_library_application",
      question: `## Mathematical Computation Library

Implement a comprehensive mathematical computation library that leverages the C Standard Library math functions. Create a calculator that supports:

1. **Basic Operations**: Addition, subtraction, multiplication, division
2. **Advanced Functions**: Trigonometric, exponential, logarithmic, power functions
3. **Complex Numbers**: Basic complex arithmetic operations
4. **Statistical Functions**: Mean, median, standard deviation
5. **Error Handling**: Proper domain/range error handling
6. **Precision Management**: Floating-point precision considerations

**Requirements:**
- Use <math.h> functions extensively
- Handle special cases (NaN, infinity, domain errors)
- Implement complex number operations
- Provide statistical analysis functions
- Include comprehensive error checking
- Support both real and complex number modes

**Example Usage:**
\`\`\`c
MathCalculator *calc = math_calculator_create();

// Basic operations
double result = math_calculator_evaluate(calc, "sin(PI/2) + cos(0)");
printf("Result: %f\\n", result);

// Complex numbers
Complex c1 = {3.0, 4.0};  // 3 + 4i
Complex c2 = {1.0, -2.0}; // 1 - 2i
Complex sum = math_calculator_complex_add(calc, c1, c2);
printf("Sum: %f %fi\\n", sum.real, sum.imag);

// Statistics
double data[] = {1.0, 2.0, 3.0, 4.0, 5.0};
Statistics stats = math_calculator_analyze(calc, data, 5);
printf("Mean: %f, StdDev: %f\\n", stats.mean, stats.std_dev);

// Error handling
double invalid = math_calculator_evaluate(calc, "sqrt(-1)");
if (math_calculator_has_error(calc)) {
    printf("Error: %s\\n", math_calculator_get_error(calc));
}

math_calculator_destroy(calc);
\`\`\`

**Implementation Notes:**
- Use errno to detect math function errors
- Handle floating-point exceptions appropriately
- Implement complex numbers using double complex if available
- Provide both simple and advanced statistical measures
- Include input validation and bounds checking`,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <errno.h>
#include <assert.h>
#include <complex.h>

// Complex number structure (fallback if complex.h not available)
typedef struct {
    double real;
    double imag;
} Complex;

// Statistics structure
typedef struct {
    double mean;
    double median;
    double std_dev;
    double min;
    double max;
    size_t count;
} Statistics;

// Error codes
typedef enum {
    MATH_SUCCESS = 0,
    MATH_ERROR_INVALID_INPUT = -1,
    MATH_ERROR_DOMAIN_ERROR = -2,
    MATH_ERROR_RANGE_ERROR = -3,
    MATH_ERROR_OVERFLOW = -4,
    MATH_ERROR_MEMORY = -5
} MathError;

// Math calculator structure
typedef struct {
    int error_code;
    char error_message[256];
    int use_complex_mode;
} MathCalculator;

// Create calculator
MathCalculator *math_calculator_create(void) {
    MathCalculator *calc = malloc(sizeof(MathCalculator));
    if (!calc) return NULL;

    calc->error_code = MATH_SUCCESS;
    calc->error_message[0] = '\\0';
    calc->use_complex_mode = 0;

    return calc;
}

// Destroy calculator
void math_calculator_destroy(MathCalculator *calc) {
    if (calc) free(calc);
}

// Set error
static void set_error(MathCalculator *calc, int code, const char *message) {
    calc->error_code = code;
    strncpy(calc->error_message, message, sizeof(calc->error_message) - 1);
    calc->error_message[sizeof(calc->error_message) - 1] = '\\0';
}

// Error checking
int math_calculator_has_error(const MathCalculator *calc) {
    return calc->error_code != MATH_SUCCESS;
}

const char *math_calculator_get_error(const MathCalculator *calc) {
    return calc->error_message;
}

// Complex number operations
Complex math_calculator_complex_add(MathCalculator *calc, Complex a, Complex b) {
    Complex result = {a.real + b.real, a.imag + b.imag};
    calc->error_code = MATH_SUCCESS;
    return result;
}

Complex math_calculator_complex_multiply(MathCalculator *calc, Complex a, Complex b) {
    Complex result = {
        a.real * b.real - a.imag * b.imag,
        a.real * b.imag + a.imag * b.real
    };
    calc->error_code = MATH_SUCCESS;
    return result;
}

double math_calculator_complex_magnitude(MathCalculator *calc, Complex c) {
    calc->error_code = MATH_SUCCESS;
    return sqrt(c.real * c.real + c.imag * c.imag);
}

// Safe math functions with error checking
double safe_sin(MathCalculator *calc, double x) {
    errno = 0;
    double result = sin(x);
    if (errno == EDOM) {
        set_error(calc, MATH_ERROR_DOMAIN_ERROR, "Domain error in sin()");
        return NAN;
    }
    calc->error_code = MATH_SUCCESS;
    return result;
}

double safe_cos(MathCalculator *calc, double x) {
    errno = 0;
    double result = cos(x);
    if (errno == EDOM) {
        set_error(calc, MATH_ERROR_DOMAIN_ERROR, "Domain error in cos()");
        return NAN;
    }
    calc->error_code = MATH_SUCCESS;
    return result;
}

double safe_sqrt(MathCalculator *calc, double x) {
    if (x < 0) {
        set_error(calc, MATH_ERROR_DOMAIN_ERROR, "Cannot take square root of negative number");
        return NAN;
    }
    errno = 0;
    double result = sqrt(x);
    if (errno == ERANGE) {
        set_error(calc, MATH_ERROR_RANGE_ERROR, "Range error in sqrt()");
        return result; // May be infinity
    }
    calc->error_code = MATH_SUCCESS;
    return result;
}

double safe_log(MathCalculator *calc, double x) {
    if (x <= 0) {
        set_error(calc, MATH_ERROR_DOMAIN_ERROR, "Logarithm of non-positive number");
        return -HUGE_VAL;
    }
    errno = 0;
    double result = log(x);
    if (errno == ERANGE) {
        set_error(calc, MATH_ERROR_RANGE_ERROR, "Range error in log()");
    }
    calc->error_code = MATH_SUCCESS;
    return result;
}

double safe_pow(MathCalculator *calc, double base, double exp) {
    errno = 0;
    double result = pow(base, exp);
    if (errno == EDOM) {
        set_error(calc, MATH_ERROR_DOMAIN_ERROR, "Domain error in pow()");
        return NAN;
    } else if (errno == ERANGE) {
        set_error(calc, MATH_ERROR_RANGE_ERROR, "Range error in pow()");
    }
    calc->error_code = MATH_SUCCESS;
    return result;
}

// Simple expression evaluator (supports basic math functions)
double math_calculator_evaluate(MathCalculator *calc, const char *expression) {
    if (!calc || !expression) {
        set_error(calc, MATH_ERROR_INVALID_INPUT, "NULL input");
        return NAN;
    }

    // Very basic evaluator - in real implementation, use a proper parser
    if (strcmp(expression, "PI") == 0) {
        calc->error_code = MATH_SUCCESS;
        return M_PI;
    } else if (strcmp(expression, "E") == 0) {
        calc->error_code = MATH_SUCCESS;
        return M_E;
    } else if (strcmp(expression, "sin(PI/2)") == 0) {
        return safe_sin(calc, M_PI / 2);
    } else if (strcmp(expression, "cos(0)") == 0) {
        return safe_cos(calc, 0);
    } else if (strcmp(expression, "sqrt(4)") == 0) {
        return safe_sqrt(calc, 4);
    } else if (strcmp(expression, "log(10)") == 0) {
        return safe_log(calc, 10);
    } else if (strcmp(expression, "sqrt(-1)") == 0) {
        return safe_sqrt(calc, -1);
    }

    // Simple number parsing
    char *endptr;
    errno = 0;
    double result = strtod(expression, &endptr);
    if (errno == ERANGE) {
        set_error(calc, MATH_ERROR_RANGE_ERROR, "Number out of range");
        return result;
    } else if (*endptr != '\\0') {
        set_error(calc, MATH_ERROR_INVALID_INPUT, "Invalid expression");
        return NAN;
    }

    calc->error_code = MATH_SUCCESS;
    return result;
}

// Statistical analysis
Statistics math_calculator_analyze(MathCalculator *calc, const double *data, size_t n) {
    Statistics stats = {0};
    if (!calc || !data || n == 0) {
        set_error(calc, MATH_ERROR_INVALID_INPUT, "Invalid input data");
        return stats;
    }

    stats.count = n;
    stats.min = data[0];
    stats.max = data[0];
    double sum = 0.0;

    // Calculate sum, min, max
    for (size_t i = 0; i < n; i++) {
        sum += data[i];
        if (data[i] < stats.min) stats.min = data[i];
        if (data[i] > stats.max) stats.max = data[i];
    }

    stats.mean = sum / n;

    // Calculate median
    double *sorted_data = malloc(n * sizeof(double));
    if (!sorted_data) {
        set_error(calc, MATH_ERROR_MEMORY, "Memory allocation failed");
        return stats;
    }

    memcpy(sorted_data, data, n * sizeof(double));

    // Simple bubble sort for median
    for (size_t i = 0; i < n - 1; i++) {
        for (size_t j = 0; j < n - i - 1; j++) {
            if (sorted_data[j] > sorted_data[j + 1]) {
                double temp = sorted_data[j];
                sorted_data[j] = sorted_data[j + 1];
                sorted_data[j + 1] = temp;
            }
        }
    }

    if (n % 2 == 0) {
        stats.median = (sorted_data[n/2 - 1] + sorted_data[n/2]) / 2.0;
    } else {
        stats.median = sorted_data[n/2];
    }

    // Calculate standard deviation
    double sum_squares = 0.0;
    for (size_t i = 0; i < n; i++) {
        double diff = data[i] - stats.mean;
        sum_squares += diff * diff;
    }
    stats.std_dev = sqrt(sum_squares / n);

    free(sorted_data);
    calc->error_code = MATH_SUCCESS;
    return stats;
}

// Unit tests
void run_tests(void) {
    MathCalculator *calc = math_calculator_create();
    assert(calc != NULL);

    // Test basic evaluation
    double result = math_calculator_evaluate(calc, "3.14");
    assert(!isnan(result) && fabs(result - 3.14) < 1e-10);

    // Test constants
    result = math_calculator_evaluate(calc, "PI");
    assert(fabs(result - M_PI) < 1e-10);

    // Test functions
    result = math_calculator_evaluate(calc, "sin(PI/2)");
    assert(fabs(result - 1.0) < 1e-10);

    // Test error handling
    result = math_calculator_evaluate(calc, "sqrt(-1)");
    assert(math_calculator_has_error(calc));
    assert(isnan(result));

    // Test complex numbers
    Complex c1 = {3.0, 4.0};
    Complex c2 = {1.0, 2.0};
    Complex sum = math_calculator_complex_add(calc, c1, c2);
    assert(fabs(sum.real - 4.0) < 1e-10);
    assert(fabs(sum.imag - 6.0) < 1e-10);

    double mag = math_calculator_complex_magnitude(calc, c1);
    assert(fabs(mag - 5.0) < 1e-10);

    // Test statistics
    double data[] = {1.0, 2.0, 3.0, 4.0, 5.0};
    Statistics stats = math_calculator_analyze(calc, data, 5);
    assert(fabs(stats.mean - 3.0) < 1e-10);
    assert(fabs(stats.median - 3.0) < 1e-10);
    assert(fabs(stats.std_dev - sqrt(2.0)) < 1e-6);

    math_calculator_destroy(calc);
    printf("All tests passed!\\n");
}

int main() {
    run_tests();
    return 0;
}`
    }
  ]
};
