import { SubLesson } from '../../../../data/lessonsData';

export const topic_6_5: SubLesson = {
  id: "6.5",
  title: 'String Conversion and Formatting',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 String Conversion and Formatting in C

Converting between strings and other data types is essential for input/output operations. C provides various functions for formatting strings and converting between strings and numbers.

---

## 📊 Number to String Conversion

### **sprintf() - Format to String**

\`\`\`c
#include <stdio.h>

int main(void) {
    char buffer[100];
    int value = 42;
    float pi = 3.14159f;

    // Format integer to string
    sprintf(buffer, "The answer is %d", value);
    printf("Result: %s\\n", buffer);

    // Format multiple values
    sprintf(buffer, "Integer: %d, Float: %.2f", value, pi);
    printf("Combined: %s\\n", buffer);

    // Format with field width
    sprintf(buffer, "Padded: %05d", value);
    printf("Padded: %s\\n", buffer);

    return 0;
}
\`\`\`

---

### **snprintf() - Safe sprintf**

\`\`\`c
#include <stdio.h>

int main(void) {
    char buffer[20];
    int large_number = 123456789;

    // Safe version - prevents buffer overflow
    int written = snprintf(buffer, sizeof(buffer), "Number: %d", large_number);

    if (written >= sizeof(buffer)) {
        printf("String was truncated! Needed %d characters\\n", written);
    }

    printf("Result: %s\\n", buffer);
    printf("Characters written: %d\\n", written);

    return 0;
}
\`\`\`

---

## 🔢 String to Number Conversion

### **atoi() - String to Integer**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char str1[] = "123";
    char str2[] = "-456";
    char str3[] = "789abc";  // Invalid characters
    char str4[] = "0";

    printf("atoi('%s') = %d\\n", str1, atoi(str1));
    printf("atoi('%s') = %d\\n", str2, atoi(str2));
    printf("atoi('%s') = %d\\n", str3, atoi(str3));  // Stops at 'a'
    printf("atoi('%s') = %d\\n", str4, atoi(str4));

    return 0;
}
\`\`\`

**Limitations:**
- No error checking
- Stops at first non-digit character
- Returns 0 for invalid input (indistinguishable from "0")

---

### **atol() and atoll() - String to Long/LLong**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char str1[] = "2147483647";  // Max int
    char str2[] = "9223372036854775807";  // Max long long

    long l_val = atol(str1);
    long long ll_val = atoll(str2);

    printf("atol('%s') = %ld\\n", str1, l_val);
    printf("atoll('%s') = %lld\\n", str2, ll_val);

    return 0;
}
\`\`\`

---

### **atof() - String to Float**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char str1[] = "3.14159";
    char str2[] = "-123.456";
    char str3[] = "1.23e10";  // Scientific notation
    char str4[] = "not_a_number";

    printf("atof('%s') = %f\\n", str1, atof(str1));
    printf("atof('%s') = %f\\n", str2, atof(str2));
    printf("atof('%s') = %f\\n", str3, atof(str3));
    printf("atof('%s') = %f\\n", str4, atof(str4));  // Returns 0.0

    return 0;
}
\`\`\`

---

## 🔧 Advanced Conversion Functions

### **strtol() - String to Long with Error Checking**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>

int main(void) {
    char *endptr;
    char str1[] = "123abc";
    char str2[] = "999999999999999999999";  // Too big
    char str3[] = "not_a_number";

    errno = 0;  // Reset error flag

    // Convert with base 10
    long result1 = strtol(str1, &endptr, 10);
    printf("strtol('%s') = %ld, remaining: '%s'\\n", str1, result1, endptr);

    // Check for errors
    long result2 = strtol(str2, &endptr, 10);
    if (errno == ERANGE) {
        printf("Number too large: %s\\n", str2);
    }

    // Invalid input
    long result3 = strtol(str3, &endptr, 10);
    printf("strtol('%s') = %ld, endptr: '%s'\\n", str3, result3, endptr);

    return 0;
}
\`\`\`

---

### **strtod() - String to Double**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char *endptr;
    char str1[] = "3.14159hello";
    char str2[] = "1.5e-2world";

    double result1 = strtod(str1, &endptr);
    printf("strtod('%s') = %f, remaining: '%s'\\n", str1, result1, endptr);

    double result2 = strtod(str2, &endptr);
    printf("strtod('%s') = %f, remaining: '%s'\\n", str2, result2, endptr);

    return 0;
}
\`\`\`

---

### **Different Number Bases**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char bin_str[] = "1010";      // Binary
    char oct_str[] = "77";        // Octal
    char dec_str[] = "42";        // Decimal
    char hex_str[] = "2A";        // Hexadecimal

    // Convert from different bases
    long bin_val = strtol(bin_str, NULL, 2);
    long oct_val = strtol(oct_str, NULL, 8);
    long dec_val = strtol(dec_str, NULL, 10);
    long hex_val = strtol(hex_str, NULL, 16);

    printf("Binary '%s' = %ld\\n", bin_str, bin_val);
    printf("Octal '%s' = %ld\\n", oct_str, oct_val);
    printf("Decimal '%s' = %ld\\n", dec_str, dec_val);
    printf("Hex '%s' = %ld\\n", hex_str, hex_val);

    // All should be 42 in decimal
    printf("All values: %ld, %ld, %ld, %ld\\n", bin_val, oct_val, dec_val, hex_val);

    return 0;
}
\`\`\`

---

## 📝 String Formatting and Building

### **Custom String Builder**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdarg.h>

// Simple string builder
typedef struct {
    char *data;
    size_t size;
    size_t capacity;
} StringBuilder;

StringBuilder* sb_create(size_t initial_capacity) {
    StringBuilder *sb = (StringBuilder*)malloc(sizeof(StringBuilder));
    if (sb == NULL) return NULL;

    sb->data = (char*)malloc(initial_capacity);
    if (sb->data == NULL) {
        free(sb);
        return NULL;
    }

    sb->data[0] = '\\0';
    sb->size = 0;
    sb->capacity = initial_capacity;

    return sb;
}

void sb_destroy(StringBuilder *sb) {
    if (sb) {
        free(sb->data);
        free(sb);
    }
}

int sb_append(StringBuilder *sb, const char *str) {
    size_t len = strlen(str);
    size_t needed = sb->size + len + 1;

    if (needed > sb->capacity) {
        // Double capacity
        size_t new_capacity = sb->capacity * 2;
        char *new_data = (char*)realloc(sb->data, new_capacity);
        if (new_data == NULL) return 0;

        sb->data = new_data;
        sb->capacity = new_capacity;
    }

    strcpy(sb->data + sb->size, str);
    sb->size += len;

    return 1;
}

int sb_appendf(StringBuilder *sb, const char *format, ...) {
    va_list args;
    va_start(args, format);

    // First, determine how much space we need
    va_list args_copy;
    va_copy(args_copy, args);
    int needed = vsnprintf(NULL, 0, format, args_copy);
    va_end(args_copy);

    if (needed < 0) return 0;

    size_t total_needed = sb->size + needed + 1;
    if (total_needed > sb->capacity) {
        size_t new_capacity = total_needed * 2;
        char *new_data = (char*)realloc(sb->data, new_capacity);
        if (new_data == NULL) return 0;

        sb->data = new_data;
        sb->capacity = new_capacity;
    }

    vsnprintf(sb->data + sb->size, needed + 1, format, args);
    sb->size += needed;

    va_end(args);
    return 1;
}

const char* sb_get_string(StringBuilder *sb) {
    return sb ? sb->data : NULL;
}

int main(void) {
    StringBuilder *sb = sb_create(10);
    if (sb == NULL) return 1;

    sb_append(sb, "Hello");
    sb_append(sb, " ");
    sb_append(sb, "World");
    sb_append(sb, "!\\n");

    sb_appendf(sb, "The answer is %d\\n", 42);
    sb_appendf(sb, "Pi is approximately %.2f\\n", 3.14159);

    printf("Built string:\\n%s", sb_get_string(sb));

    sb_destroy(sb);
    return 0;
}
\`\`\`

---

## 🎯 Practical Examples

### **Example 1: Command Line Calculator**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

double calculate(double a, char op, double b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b != 0 ? a / b : 0;
        default: return 0;
    }
}

int main(int argc, char *argv[]) {
    if (argc != 4) {
        printf("Usage: %s <number> <operator> <number>\\n", argv[0]);
        printf("Example: %s 10 + 5\\n", argv[0]);
        return 1;
    }

    // Convert string arguments to numbers
    double a = atof(argv[1]);
    double b = atof(argv[3]);
    char op = argv[2][0];

    double result = calculate(a, op, b);

    // Format result as string
    char result_str[100];
    sprintf(result_str, "%.2f %c %.2f = %.2f\\n", a, op, b, result);

    printf("%s", result_str);

    return 0;
}
\`\`\`

### **Example 2: Temperature Conversion Program**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

double celsius_to_fahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

double fahrenheit_to_celsius(double f) {
    return (f - 32.0) * 5.0 / 9.0;
}

double celsius_to_kelvin(double c) {
    return c + 273.15;
}

double fahrenheit_to_kelvin(double f) {
    return celsius_to_kelvin(fahrenheit_to_celsius(f));
}

int main(void) {
    char input[100];
    char from_scale, to_scale;
    double value, result;

    printf("Temperature Converter\\n");
    printf("===================\\n");
    printf("Enter: <value> <from_scale> <to_scale>\\n");
    printf("Scales: C (Celsius), F (Fahrenheit), K (Kelvin)\\n");
    printf("Example: 25 C F\\n\\n");

    while (1) {
        printf("Convert: ");
        if (fgets(input, sizeof(input), stdin) == NULL) break;

        // Parse input
        char *token = strtok(input, " \\n");
        if (token == NULL) continue;

        value = atof(token);

        token = strtok(NULL, " \\n");
        if (token == NULL) continue;
        from_scale = toupper(token[0]);

        token = strtok(NULL, " \\n");
        if (token == NULL) continue;
        to_scale = toupper(token[0]);

        // Perform conversion
        if (from_scale == 'C' && to_scale == 'F') {
            result = celsius_to_fahrenheit(value);
        } else if (from_scale == 'F' && to_scale == 'C') {
            result = fahrenheit_to_celsius(value);
        } else if (from_scale == 'C' && to_scale == 'K') {
            result = celsius_to_kelvin(value);
        } else if (from_scale == 'F' && to_scale == 'K') {
            result = fahrenheit_to_kelvin(value);
        } else if (from_scale == 'K' && to_scale == 'C') {
            result = value - 273.15;
        } else if (from_scale == 'K' && to_scale == 'F') {
            result = celsius_to_fahrenheit(value - 273.15);
        } else {
            printf("Invalid conversion\\n");
            continue;
        }

        printf("%.2f°%c = %.2f°%c\\n", value, from_scale, result, to_scale);
    }

    return 0;
}
\`\`\`

### **Example 3: Unit Converter**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    char name[20];
    double factor;  // Factor to convert to base unit
} Unit;

Unit length_units[] = {
    {"mm", 0.001}, {"cm", 0.01}, {"m", 1.0}, {"km", 1000.0},
    {"inch", 0.0254}, {"foot", 0.3048}, {"yard", 0.9144}, {"mile", 1609.344}
};

Unit weight_units[] = {
    {"mg", 0.001}, {"g", 1.0}, {"kg", 1000.0}, {"ton", 1000000.0},
    {"oz", 28.3495}, {"lb", 453.592}, {"stone", 6350.29}
};

double convert_units(double value, const char *from_unit, const char *to_unit, Unit *units, int num_units) {
    double base_value = 0;
    double to_factor = 0;

    // Find from_unit factor
    for (int i = 0; i < num_units; i++) {
        if (strcmp(units[i].name, from_unit) == 0) {
            base_value = value * units[i].factor;
            break;
        }
    }

    // Find to_unit factor
    for (int i = 0; i < num_units; i++) {
        if (strcmp(units[i].name, to_unit) == 0) {
            to_factor = units[i].factor;
            break;
        }
    }

    if (to_factor == 0) return 0;  // Invalid conversion

    return base_value / to_factor;
}

int main(void) {
    char input[100];
    char unit_type[20];
    double value;
    char from_unit[20], to_unit[20];

    printf("Unit Converter\\n");
    printf("==============\\n");
    printf("Supported units:\\n");
    printf("Length: mm, cm, m, km, inch, foot, yard, mile\\n");
    printf("Weight: mg, g, kg, ton, oz, lb, stone\\n\\n");

    while (1) {
        printf("Convert: ");
        if (fgets(input, sizeof(input), stdin) == NULL) break;

        // Parse: <value> <from_unit> <to_unit>
        if (sscanf(input, "%lf %19s %19s", &value, from_unit, to_unit) != 3) {
            printf("Format: <value> <from_unit> <to_unit>\\n");
            continue;
        }

        double result = 0;
        int valid = 0;

        // Try length conversion
        result = convert_units(value, from_unit, to_unit, length_units,
                              sizeof(length_units) / sizeof(length_units[0]));
        if (result != 0) {
            printf("%.2f %s = %.4f %s\\n", value, from_unit, result, to_unit);
            valid = 1;
        }

        // Try weight conversion
        if (!valid) {
            result = convert_units(value, from_unit, to_unit, weight_units,
                                  sizeof(weight_units) / sizeof(weight_units[0]));
            if (result != 0) {
                printf("%.2f %s = %.4f %s\\n", value, from_unit, result, to_unit);
                valid = 1;
            }
        }

        if (!valid) {
            printf("Invalid conversion\\n");
        }
    }

    return 0;
}
\`\`\`

---

## ⚠️ Common Conversion Mistakes

### **Mistake 1: Not Checking Conversion Results**

\`\`\`c
// ❌ No error checking
char str[] = "not_a_number";
int value = atoi(str);  // Returns 0 - is it error or actual 0?
printf("Value: %d\\n", value);

// ✅ Check with strtol
char *endptr;
long result = strtol(str, &endptr, 10);
if (*endptr != '\\0') {
    printf("Conversion failed\\n");
} else {
    printf("Value: %ld\\n", result);
}
\`\`\`

### **Mistake 2: Buffer Overflow in sprintf**

\`\`\`c
// ❌ Dangerous - no size limit
char buffer[10];
sprintf(buffer, "Very long string: %d", 12345);  // Overflow!

// ✅ Safe with snprintf
snprintf(buffer, sizeof(buffer), "Very long string: %d", 12345);
\`\`\`

### **Mistake 3: Wrong Base in strtol**

\`\`\`c
// ❌ Wrong base
char hex_str[] = "FF";
int decimal = atoi(hex_str);  // Treats as decimal 0

// ✅ Correct base
long hex_value = strtol(hex_str, NULL, 16);  // Base 16
printf("0x%s = %ld\\n", hex_str, hex_value);
\`\`\`

---

## 🎓 Key Takeaways

1. **sprintf()** formats data into strings
2. **snprintf()** is safer with buffer size limits
3. **atoi/atol/atof()** convert strings to numbers (basic)
4. **strtol/strtod()** provide advanced conversion with error checking
5. **Always check conversion results** for validity
6. **Use correct number bases** (decimal=10, hex=16, octal=8, binary=2)
7. **Prevent buffer overflows** with size-limited functions

Master string conversion and formatting to handle user input and output effectively! 🔄✨`;
    return contentString;
  })()
};
