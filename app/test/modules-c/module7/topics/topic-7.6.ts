import { SubLesson } from '../../../data/lessonsData';

export const topic_7_6: SubLesson = {
  id: 7.6,
  title: 'Unions',
  status: 'completed',
  content: `# 🔄 Unions

Master unions for memory-efficient data storage where multiple data types share the same memory location.

---

## 🎯 Understanding Unions

### What is a Union?

**A union is a special data type that allows different data types to share the same memory location.**

\`\`\`c
#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;

    // All members share the same memory
    data.i = 42;
    printf("int: %d\\n", data.i);

    data.f = 3.14f;
    printf("float: %.2f\\n", data.f);

    strcpy(data.str, "Hello");
    printf("string: %s\\n", data.str);

    // Notice: only the last assigned value is valid!
    printf("int (now invalid): %d\\n", data.i);  // Garbage!

    return 0;
}
\`\`\`

**Key difference from structures:**
- **Structures:** Each member has its own memory location
- **Unions:** All members share the same memory location

---

## 🏗️ Union Declaration and Syntax

### Basic Union Declaration

\`\`\`c
// Complete union syntax
union UnionName {
    data_type member1;
    data_type member2;
    // ... more members
} variable_list;
\`\`\`

### Union Examples

\`\`\`c
#include <stdio.h>

union Number {
    int int_value;
    float float_value;
    double double_value;
};

union MixedData {
    int integer;
    char character;
    char string[100];
    void* pointer;
};

int main() {
    union Number num;
    union MixedData data;

    // Use as integer
    num.int_value = 42;
    printf("As int: %d\\n", num.int_value);

    // Use as float
    num.float_value = 3.14159f;
    printf("As float: %.5f\\n", num.float_value);

    return 0;
}
\`\`\`

---

## 💾 Memory Layout of Unions

### Shared Memory Demonstration

\`\`\`c
#include <stdio.h>

union SharedMemory {
    int i;
    float f;
    char bytes[4];  // Same size as int/float
};

int main() {
    union SharedMemory u;

    u.i = 0x12345678;  // Hex value

    printf("As int: 0x%08X\\n", u.i);
    printf("As float: %f\\n", u.f);

    printf("Memory bytes: ");
    for (int i = 0; i < sizeof(u); i++) {
        printf("%02X ", (unsigned char)u.bytes[i]);
    }
    printf("\\n");

    return 0;
}
\`\`\`

### Size of Unions

\`\`\`c
#include <stdio.h>

union SmallUnion {
    char c;    // 1 byte
    short s;   // 2 bytes
};

union LargeUnion {
    int i;     // 4 bytes
    double d;  // 8 bytes
    char str[100];  // 100 bytes
};

int main() {
    printf("SmallUnion size: %zu bytes\\n", sizeof(union SmallUnion));
    printf("LargeUnion size: %zu bytes\\n", sizeof(union LargeUnion));

    // Union size is determined by the largest member
    return 0;
}
\`\`\`

---

## 🎯 When to Use Unions

### Type-Dependent Data

\`\`\`c
#include <stdio.h>

typedef enum {
    INT_TYPE,
    FLOAT_TYPE,
    STRING_TYPE
} DataType;

typedef union {
    int int_value;
    float float_value;
    char string_value[100];
} Value;

typedef struct {
    DataType type;
    Value data;
} Variant;

void print_variant(const Variant* v) {
    switch (v->type) {
        case INT_TYPE:
            printf("Integer: %d\\n", v->data.int_value);
            break;
        case FLOAT_TYPE:
            printf("Float: %.2f\\n", v->data.float_value);
            break;
        case STRING_TYPE:
            printf("String: %s\\n", v->data.string_value);
            break;
    }
}

int main() {
    Variant v1 = {INT_TYPE, {.int_value = 42}};
    Variant v2 = {FLOAT_TYPE, {.float_value = 3.14f}};
    Variant v3 = {STRING_TYPE, {.string_value = "Hello"}};

    print_variant(&v1);
    print_variant(&v2);
    print_variant(&v3);

    return 0;
}
\`\`\`

### Memory-Efficient Storage

\`\`\`c
// Without union: 4 + 100 = 104 bytes per record
struct Inefficient {
    int type;
    int int_data;
    char str_data[100];
};

// With union: 4 + 100 = 104 bytes per record (same)
// But only one data type is used at a time
struct Efficient {
    int type;
    union {
        int int_data;
        char str_data[100];
    } data;
};

// More efficient: 4 bytes type + max(4, 100) = 104 bytes
// But logically cleaner and safer
\`\`\`

---

## 🔄 Type Punning with Unions

### Safe Type Conversion

\`\`\`c
#include <stdio.h>

union FloatBits {
    float f;
    unsigned int bits;
};

void print_float_bits(float value) {
    union FloatBits fb;
    fb.f = value;

    printf("Float: %f\\n", fb.f);
    printf("Bits:  0x%08X\\n", fb.bits);

    // Extract sign bit, exponent, mantissa
    unsigned int sign = (fb.bits >> 31) & 1;
    unsigned int exponent = (fb.bits >> 23) & 0xFF;
    unsigned int mantissa = fb.bits & 0x7FFFFF;

    printf("Sign: %u, Exponent: %u, Mantissa: 0x%06X\\n",
           sign, exponent, mantissa);
}

int main() {
    print_float_bits(3.14159f);
    print_float_bits(-1.0f);
    print_float_bits(0.0f);

    return 0;
}
\`\`\`

### Endianness Detection

\`\`\`c
#include <stdio.h>

union EndianTest {
    int i;
    char bytes[4];
};

int main() {
    union EndianTest et;
    et.i = 0x12345678;

    if (et.bytes[0] == 0x78) {
        printf("Little-endian\\n");
    } else if (et.bytes[0] == 0x12) {
        printf("Big-endian\\n");
    } else {
        printf("Unknown endianness\\n");
    }

    return 0;
}
\`\`\`

---

## 🏷️ Anonymous Unions (C11)

### Unions in Structures

\`\`\`c
#include <stdio.h>

struct Packet {
    int type;
    union {  // Anonymous union
        struct {  // Login packet
            char username[32];
            char password[32];
        } login;

        struct {  // Data packet
            int data_size;
            char data[1024];
        } data_packet;

        struct {  // Error packet
            int error_code;
            char message[256];
        } error;
    };  // No union name
};

int main() {
    struct Packet packet;

    packet.type = 1;  // Login packet
    strcpy(packet.login.username, "admin");
    strcpy(packet.login.password, "secret");

    // Access without union name
    printf("Username: %s\\n", packet.login.username);

    return 0;
}
\`\`\`

---

## 🧪 Advanced Union Patterns

### Tagged Unions

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    SQUARE,
    CIRCLE,
    TRIANGLE
} ShapeType;

typedef struct {
    double base;
    double height;
} TriangleData;

typedef struct {
    double side;
} SquareData;

typedef struct {
    double radius;
} CircleData;

typedef union {
    SquareData square;
    CircleData circle;
    TriangleData triangle;
} ShapeData;

typedef struct {
    ShapeType type;
    ShapeData data;
} Shape;

double calculate_area(const Shape* shape) {
    switch (shape->type) {
        case SQUARE:
            return shape->data.square.side * shape->data.square.side;
        case CIRCLE:
            return 3.14159 * shape->data.circle.radius * shape->data.circle.radius;
        case TRIANGLE:
            return 0.5 * shape->data.triangle.base * shape->data.triangle.height;
        default:
            return 0;
    }
}

int main() {
    Shape shapes[3];

    // Square
    shapes[0].type = SQUARE;
    shapes[0].data.square.side = 5.0;

    // Circle
    shapes[1].type = CIRCLE;
    shapes[1].data.circle.radius = 3.0;

    // Triangle
    shapes[2].type = TRIANGLE;
    shapes[2].data.triangle.base = 4.0;
    shapes[2].data.triangle.height = 6.0;

    for (int i = 0; i < 3; i++) {
        printf("Shape %d area: %.2f\\n", i + 1, calculate_area(&shapes[i]));
    }

    return 0;
}
\`\`\`

### Serialization with Unions

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef union {
    int i;
    float f;
    char str[20];
} SerialData;

typedef enum {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_STRING
} DataType;

// Simple serialization (for demonstration)
void serialize(const SerialData* data, DataType type, FILE* file) {
    fwrite(&type, sizeof(DataType), 1, file);

    switch (type) {
        case TYPE_INT:
            fwrite(&data->i, sizeof(int), 1, file);
            break;
        case TYPE_FLOAT:
            fwrite(&data->f, sizeof(float), 1, file);
            break;
        case TYPE_STRING:
            fwrite(data->str, sizeof(char), strlen(data->str) + 1, file);
            break;
    }
}

int main() {
    SerialData data;
    DataType type;

    // Serialize different types
    FILE* file = fopen("data.bin", "wb");

    if (file != NULL) {
        data.i = 42;
        serialize(&data, TYPE_INT, file);

        data.f = 3.14f;
        serialize(&data, TYPE_FLOAT, file);

        strcpy(data.str, "Hello World");
        serialize(&data, TYPE_STRING, file);

        fclose(file);
    }

    return 0;
}
\`\`\`

---

## 🛡️ Union Safety and Best Practices

### Always Track the Active Member

\`\`\`c
#include <stdio.h>

typedef union {
    int int_val;
    float float_val;
} Number;

int main() {
    Number num;

    num.int_val = 42;
    printf("Int value: %d\\n", num.int_val);

    // DON'T do this - undefined behavior
    // printf("Float value: %f\\n", num.float_val);  // Wrong!

    // Instead, assign first
    num.float_val = 3.14f;
    printf("Float value: %.2f\\n", num.float_val);

    return 0;
}
\`\`\`

### Use Tagged Unions

\`\`\`c
// ✅ Safe: Tagged union
typedef struct {
    enum { INT, FLOAT } type;
    union {
        int i;
        float f;
    } value;
} SafeNumber;

// ❌ Unsafe: Untagged union
typedef union {
    int i;
    float f;
} UnsafeNumber;

void use_safe(SafeNumber n) {
    if (n.type == INT) {
        printf("Int: %d\\n", n.value.i);
    } else {
        printf("Float: %f\\n", n.value.f);
    }
}

void use_unsafe(UnsafeNumber n) {
    // Which member is active? Unknown!
    // printf("%d or %f?\n", n.i, n.f);  // Dangerous
}
\`\`\`

### Avoid Unions for Different Sized Types

\`\`\`c
// ✅ OK: Same size types
union IntFloat {
    int i;     // 4 bytes
    float f;   // 4 bytes
};

// ❌ Problematic: Different size types
union BadUnion {
    char c;      // 1 byte
    int i;       // 4 bytes
    double d;    // 8 bytes
};

int main() {
    union BadUnion u;
    u.d = 3.14;

    // Accessing c or i now is undefined behavior!
    // The smaller members don't "own" their bytes anymore

    return 0;
}
\`\`\`

---

## 🔍 Union vs Structure Comparison

### Memory Usage

\`\`\`c
struct StructExample {
    int a;      // 4 bytes
    float b;    // 4 bytes
    char c;     // 1 byte (+ 3 padding)
};              // Total: 12 bytes

union UnionExample {
    int a;      // 4 bytes
    float b;    // 4 bytes
    char c;     // 1 byte
};              // Total: 4 bytes (largest member)

int main() {
    printf("Struct: %zu bytes\\n", sizeof(struct StructExample));
    printf("Union: %zu bytes\\n", sizeof(union UnionExample));

    return 0;
}
\`\`\`

### Access Patterns

\`\`\`c
struct PointStruct {
    int x, y;
};  // Both x and y are always valid

union PointUnion {
    struct { int x, y; } point;
    int coords[2];
};  // Can access as struct or array, but not both simultaneously

int main() {
    struct PointStruct ps = {10, 20};
    printf("Struct: x=%d, y=%d\\n", ps.x, ps.y);

    union PointUnion pu;
    pu.point.x = 10;
    pu.point.y = 20;
    printf("Union as struct: x=%d, y=%d\\n", pu.point.x, pu.point.y);
    printf("Union as array: [%d, %d]\\n", pu.coords[0], pu.coords[1]);

    return 0;
}
\`\`\`

---

## 🧪 Complete Examples

### Variant Type Implementation

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

typedef enum {
    TYPE_NULL,
    TYPE_BOOL,
    TYPE_INT,
    TYPE_DOUBLE,
    TYPE_STRING
} ValueType;

typedef union {
    bool bool_val;
    int int_val;
    double double_val;
    char* string_val;
} ValueUnion;

typedef struct {
    ValueType type;
    ValueUnion value;
} Value;

// Constructor functions
Value value_null() {
    return (Value){TYPE_NULL, {0}};
}

Value value_bool(bool b) {
    return (Value){TYPE_BOOL, {.bool_val = b}};
}

Value value_int(int i) {
    return (Value){TYPE_INT, {.int_val = i}};
}

Value value_double(double d) {
    return (Value){TYPE_DOUBLE, {.double_val = d}};
}

Value value_string(const char* s) {
    Value v = {TYPE_STRING, {0}};
    v.value.string_val = malloc(strlen(s) + 1);
    if (v.value.string_val != NULL) {
        strcpy(v.value.string_val, s);
    }
    return v;
}

// Destructor
void value_destroy(Value* v) {
    if (v->type == TYPE_STRING && v->value.string_val != NULL) {
        free(v->value.string_val);
        v->value.string_val = NULL;
    }
    v->type = TYPE_NULL;
}

// Print function
void value_print(const Value* v) {
    switch (v->type) {
        case TYPE_NULL:
            printf("null");
            break;
        case TYPE_BOOL:
            printf("%s", v->value.bool_val ? "true" : "false");
            break;
        case TYPE_INT:
            printf("%d", v->value.int_val);
            break;
        case TYPE_DOUBLE:
            printf("%.6f", v->value.double_val);
            break;
        case TYPE_STRING:
            printf("\"%s\"", v->value.string_val ? v->value.string_val : "");
            break;
    }
}

int main() {
    Value values[5];

    values[0] = value_null();
    values[1] = value_bool(true);
    values[2] = value_int(42);
    values[3] = value_double(3.14159);
    values[4] = value_string("Hello, World!");

    printf("Values: ");
    for (int i = 0; i < 5; i++) {
        value_print(&values[i]);
        if (i < 4) printf(", ");
    }
    printf("\\n");

    // Clean up
    for (int i = 0; i < 5; i++) {
        value_destroy(&values[i]);
    }

    return 0;
}
\`\`\`

---

## 🎯 Key Takeaways

1. **Unions** allow multiple data types to share the same memory
2. **Only one member** is active at a time - track which one!
3. **Tagged unions** combine unions with type indicators for safety
4. **Memory efficient** - size equals largest member
5. **Type punning** allows viewing data as different types
6. **Anonymous unions** can be embedded in structures
7. **Use unions** for variant data, not for different simultaneous values

---

## 🚀 Preview: typedef and Advanced Structure Concepts

In the final topic, you'll learn about:
- **Advanced typedef** patterns for complex types
- **Bit fields** for memory-efficient flags
- **Structure padding** and alignment control
- **Flexible array members** (C99)
- **Structure packing** and optimization

**Master these advanced concepts for professional C programming!** 🏆

