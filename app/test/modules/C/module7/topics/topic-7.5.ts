import { SubLesson } from '../../../../data/lessonsData';

export const topic_7_5: SubLesson = {
  id: "7.5",
  title: 'Unions and Memory Sharing',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 Unions and Memory Sharing in C

Unions are special structures that allow multiple variables to share the same memory location. They are useful for memory optimization and representing different data types that are mutually exclusive.

---

## 📋 What is a Union?

**A union is a user-defined data type where all members share the same memory location.** Unlike structures where each member has its own memory space, union members overlap in memory.

### **Key Characteristics**

- **Shared memory**: All members use the same memory location
- **Size**: Equal to the size of the largest member
- **One value at a time**: Only one member can hold a valid value
- **Memory efficient**: Saves space when variables are mutually exclusive

---

## 🔧 Union Declaration and Usage

### **Basic Union Declaration**

\`\`\`c
#include <stdio.h>

// Union declaration
union Data {
    int i;
    float f;
    char str[20];
};

int main(void) {
    union Data data;

    // Store an integer
    data.i = 42;
    printf("Integer: %d\\n", data.i);

    // Store a float (overwrites integer)
    data.f = 3.14f;
    printf("Float: %.2f\\n", data.f);

    // Store a string (overwrites float)
    strcpy(data.str, "Hello");
    printf("String: %s\\n", data.str);

    // Note: integer value is gone
    printf("Integer (corrupted): %d\\n", data.i);

    return 0;
}
\`\`\`

**Output:**
\`\`\`
Integer: 42
Float: 3.14
String: Hello
Integer (corrupted): 1819043144
\`\`\`

---

## 📏 Union Size and Memory Layout

### **Understanding Union Memory**

\`\`\`c
#include <stdio.h>

union Example {
    char c;      // 1 byte
    int i;       // 4 bytes
    double d;    // 8 bytes
};

int main(void) {
    union Example ex;

    printf("Size of union: %zu bytes\\n", sizeof(union Example));
    printf("Size of largest member (double): %zu bytes\\n", sizeof(double));

    printf("\\nMemory address of union: %p\\n", (void*)&ex);
    printf("Address of c: %p\\n", (void*)&ex.c);
    printf("Address of i: %p\\n", (void*)&ex.i);
    printf("Address of d: %p\\n", (void*)&ex.d);

    return 0;
}
\`\`\`

**Key Points:**
- Union size = size of largest member
- All members start at same memory address
- No padding between members

---

## 🎯 Practical Union Applications

### **Example 1: Generic Data Container**

\`\`\`c
#include <stdio.h>

typedef enum { INT_TYPE, FLOAT_TYPE, STRING_TYPE } DataType;

union Value {
    int int_val;
    float float_val;
    char string_val[50];
};

struct GenericData {
    DataType type;
    union Value value;
};

void print_data(const struct GenericData *data) {
    switch (data->type) {
        case INT_TYPE:
            printf("Integer: %d\\n", data->value.int_val);
            break;
        case FLOAT_TYPE:
            printf("Float: %.2f\\n", data->value.float_val);
            break;
        case STRING_TYPE:
            printf("String: %s\\n", data->value.string_val);
            break;
    }
}

int main(void) {
    struct GenericData data[3];

    // Store different types
    data[0].type = INT_TYPE;
    data[0].value.int_val = 42;

    data[1].type = FLOAT_TYPE;
    data[1].value.float_val = 3.14f;

    data[2].type = STRING_TYPE;
    strcpy(data[2].value.string_val, "Hello, World!");

    // Print all data
    for (int i = 0; i < 3; i++) {
        print_data(&data[i]);
    }

    return 0;
}
\`\`\`

---

### **Example 2: Network Packet Parser**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef enum { TEXT_MSG, INT_DATA, FLOAT_DATA } PacketType;

union PacketData {
    char text[100];
    int int_value;
    float float_value;
};

struct NetworkPacket {
    PacketType type;
    union PacketData data;
};

void process_packet(const struct NetworkPacket *packet) {
    printf("Packet type: ");
    switch (packet->type) {
        case TEXT_MSG:
            printf("Text Message\\n");
            printf("Content: %s\\n", packet->data.text);
            break;
        case INT_DATA:
            printf("Integer Data\\n");
            printf("Value: %d\\n", packet->data.int_value);
            break;
        case FLOAT_DATA:
            printf("Float Data\\n");
            printf("Value: %.2f\\n", packet->data.float_value);
            break;
    }
}

int main(void) {
    struct NetworkPacket packets[3];

    // Text packet
    packets[0].type = TEXT_MSG;
    strcpy(packets[0].data.text, "Hello from client!");

    // Integer packet
    packets[1].type = INT_DATA;
    packets[1].data.int_value = 12345;

    // Float packet
    packets[2].type = FLOAT_DATA;
    packets[2].data.float_value = 98.6f;

    // Process all packets
    for (int i = 0; i < 3; i++) {
        printf("--- Packet %d ---\\n", i + 1);
        process_packet(&packets[i]);
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## 🔍 Bit Fields and Unions

### **Combining Unions with Bit Fields**

\`\`\`c
#include <stdio.h>

// Union with bit fields for compact representation
union StatusRegister {
    struct {
        unsigned int error_flag : 1;    // 1 bit
        unsigned int ready_flag : 1;    // 1 bit
        unsigned int busy_flag : 1;     // 1 bit
        unsigned int mode : 2;          // 2 bits (0-3)
        unsigned int priority : 3;      // 3 bits (0-7)
    } bits;
    unsigned char byte;  // Access as single byte
};

int main(void) {
    union StatusRegister status;

    // Set individual bits
    status.bits.error_flag = 0;
    status.bits.ready_flag = 1;
    status.bits.busy_flag = 0;
    status.bits.mode = 2;
    status.bits.priority = 5;

    printf("Status byte: 0x%02X\\n", status.byte);
    printf("Error: %d, Ready: %d, Busy: %d\\n",
           status.bits.error_flag,
           status.bits.ready_flag,
           status.bits.busy_flag);
    printf("Mode: %d, Priority: %d\\n",
           status.bits.mode,
           status.bits.priority);

    return 0;
}
\`\`\`

---

## 🔄 Type Conversion with Unions

### **Reinterpreting Data Types**

\`\`\`c
#include <stdio.h>

union Converter {
    int i;
    float f;
    unsigned char bytes[4];
};

void print_bytes(const unsigned char *bytes, int size) {
    printf("Bytes: ");
    for (int i = 0; i < size; i++) {
        printf("%02X ", bytes[i]);
    }
    printf("\\n");
}

int main(void) {
    union Converter conv;

    // Store as float
    conv.f = 3.14159f;
    printf("Float: %.6f\\n", conv.f);
    print_bytes(conv.bytes, 4);

    // Interpret as int
    printf("As int: %d\\n", conv.i);
    printf("As unsigned int: %u\\n", (unsigned int)conv.i);

    // Store as int
    conv.i = 0x40490FDB;  // IEEE 754 representation of ~3.14159
    printf("\\nStored as int: %d\\n", conv.i);
    printf("Interpreted as float: %.6f\\n", conv.f);

    return 0;
}
\`\`\`

**⚠️ Warning:** Type punning through unions may not be portable across different architectures.

---

## 🎯 Advanced Union Techniques

### **Tagged Union Pattern**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum { INTEGER, STRING, FLOAT } ValueType;

struct Value {
    ValueType type;
    union {
        int int_val;
        char *str_val;
        float float_val;
    } data;
};

struct Value* create_int_value(int val) {
    struct Value *v = (struct Value*)malloc(sizeof(struct Value));
    if (v == NULL) return NULL;

    v->type = INTEGER;
    v->data.int_val = val;
    return v;
}

struct Value* create_string_value(const char *str) {
    struct Value *v = (struct Value*)malloc(sizeof(struct Value));
    if (v == NULL) return NULL;

    v->type = STRING;
    v->data.str_val = (char*)malloc(strlen(str) + 1);
    if (v->data.str_val == NULL) {
        free(v);
        return NULL;
    }
    strcpy(v->data.str_val, str);
    return v;
}

struct Value* create_float_value(float val) {
    struct Value *v = (struct Value*)malloc(sizeof(struct Value));
    if (v == NULL) return NULL;

    v->type = FLOAT;
    v->data.float_val = val;
    return v;
}

void print_value(const struct Value *v) {
    switch (v->type) {
        case INTEGER:
            printf("Integer: %d\\n", v->data.int_val);
            break;
        case STRING:
            printf("String: %s\\n", v->data.str_val);
            break;
        case FLOAT:
            printf("Float: %.2f\\n", v->data.float_val);
            break;
    }
}

void destroy_value(struct Value *v) {
    if (v->type == STRING) {
        free(v->data.str_val);
    }
    free(v);
}

int main(void) {
    struct Value *values[3];

    values[0] = create_int_value(42);
    values[1] = create_string_value("Hello, World!");
    values[2] = create_float_value(3.14f);

    for (int i = 0; i < 3; i++) {
        print_value(values[i]);
        destroy_value(values[i]);
    }

    return 0;
}
\`\`\`

---

## 🏗️ Building Complex Data Types

### **Variant Record Pattern**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    CIRCLE,
    RECTANGLE,
    TRIANGLE
} ShapeType;

struct Circle {
    float radius;
};

struct Rectangle {
    float width, height;
};

struct Triangle {
    float base, height;
};

struct Shape {
    ShapeType type;
    union {
        struct Circle circle;
        struct Rectangle rectangle;
        struct Triangle triangle;
    } data;
};

float calculate_area(const struct Shape *shape) {
    switch (shape->type) {
        case CIRCLE:
            return 3.14159f * shape->data.circle.radius * shape->data.circle.radius;
        case RECTANGLE:
            return shape->data.rectangle.width * shape->data.rectangle.height;
        case TRIANGLE:
            return 0.5f * shape->data.triangle.base * shape->data.triangle.height;
        default:
            return 0.0f;
    }
}

void print_shape(const struct Shape *shape) {
    printf("Shape type: ");
    switch (shape->type) {
        case CIRCLE:
            printf("Circle\\n");
            printf("Radius: %.2f\\n", shape->data.circle.radius);
            break;
        case RECTANGLE:
            printf("Rectangle\\n");
            printf("Width: %.2f, Height: %.2f\\n",
                   shape->data.rectangle.width, shape->data.rectangle.height);
            break;
        case TRIANGLE:
            printf("Triangle\\n");
            printf("Base: %.2f, Height: %.2f\\n",
                   shape->data.triangle.base, shape->data.triangle.height);
            break;
    }
    printf("Area: %.2f\\n", calculate_area(shape));
}

int main(void) {
    struct Shape shapes[3];

    // Circle
    shapes[0].type = CIRCLE;
    shapes[0].data.circle.radius = 5.0f;

    // Rectangle
    shapes[1].type = RECTANGLE;
    shapes[1].data.rectangle.width = 4.0f;
    shapes[1].data.rectangle.height = 6.0f;

    // Triangle
    shapes[2].type = TRIANGLE;
    shapes[2].data.triangle.base = 3.0f;
    shapes[2].data.triangle.height = 4.0f;

    for (int i = 0; i < 3; i++) {
        printf("--- Shape %d ---\\n", i + 1);
        print_shape(&shapes[i]);
        printf("\\n");
    }

    return 0;
}
\`\`\`

---

## ⚠️ Union Safety Considerations

### **Common Union Pitfalls**

\`\`\`c
#include <stdio.h>

union Unsafe {
    int i;
    float f;
};

int main(void) {
    union Unsafe u;

    // Store int, read as float - undefined behavior!
    u.i = 42;
    printf("Int: %d, As float: %f\\n", u.i, u.f);  // Risky!

    // Store float, read as int - undefined behavior!
    u.f = 3.14f;
    printf("Float: %f, As int: %d\\n", u.f, u.i);  // Risky!

    return 0;
}
\`\`\`

### **Safe Union Usage**

\`\`\`c
#include <stdio.h>

typedef enum { INT_VAL, FLOAT_VAL } ValueType;

union SafeValue {
    int i;
    float f;
};

struct TaggedUnion {
    ValueType type;
    union SafeValue value;
};

int main(void) {
    struct TaggedUnion data;

    // Store int
    data.type = INT_VAL;
    data.value.i = 42;

    // Read safely
    if (data.type == INT_VAL) {
        printf("Integer value: %d\\n", data.value.i);
    }

    // Store float
    data.type = FLOAT_VAL;
    data.value.f = 3.14f;

    // Read safely
    if (data.type == FLOAT_VAL) {
        printf("Float value: %.2f\\n", data.value.f);
    }

    return 0;
}
\`\`\`

---

## 🔧 Union vs Structure Comparison

| Feature | Structure | Union |
|---------|-----------|-------|
| **Memory** | Sum of all members | Size of largest member |
| **Access** | All members simultaneously | One member at a time |
| **Use case** | Related data | Mutually exclusive data |
| **Initialization** | All members | One member |
| **Size** | Larger | Smaller |

---

## 🎯 Memory Optimization Examples

### **Example 1: Device Register Simulation**

\`\`\`c
#include <stdio.h>

// Simulate a hardware device register
union DeviceRegister {
    struct {
        unsigned int ready : 1;
        unsigned int error : 1;
        unsigned int mode : 2;
        unsigned int data : 12;
    } bits;
    unsigned short value;  // 16-bit register
};

int main(void) {
    union DeviceRegister reg;

    // Set register value
    reg.value = 0x0A5C;  // Some device value

    printf("Register value: 0x%04X\\n", reg.value);
    printf("Ready flag: %d\\n", reg.bits.ready);
    printf("Error flag: %d\\n", reg.bits.error);
    printf("Mode: %d\\n", reg.bits.mode);
    printf("Data: %d\\n", reg.bits.data);

    // Modify individual bits
    reg.bits.error = 1;
    reg.bits.data = 999;

    printf("\\nAfter modification:\\n");
    printf("New register value: 0x%04X\\n", reg.value);

    return 0;
}
\`\`\`

### **Example 2: Protocol Message Handler**

\`\`\`c
#include <stdio.h>
#include <string.h>

typedef enum { LOGIN, LOGOUT, DATA } MessageType;

union MessageData {
    struct {
        char username[20];
        char password[20];
    } login;
    struct {
        char username[20];
    } logout;
    struct {
        int length;
        char payload[100];
    } data;
};

struct ProtocolMessage {
    MessageType type;
    union MessageData data;
};

void process_message(const struct ProtocolMessage *msg) {
    switch (msg->type) {
        case LOGIN:
            printf("Login request from: %s\\n", msg->data.login.username);
            break;
        case LOGOUT:
            printf("Logout request from: %s\\n", msg->data.logout.username);
            break;
        case DATA:
            printf("Data message (%d bytes): %.20s...\\n",
                   msg->data.data.length, msg->data.data.payload);
            break;
    }
}

int main(void) {
    struct ProtocolMessage messages[3];

    // Login message
    messages[0].type = LOGIN;
    strcpy(messages[0].data.login.username, "alice");
    strcpy(messages[0].data.login.password, "secret");

    // Logout message
    messages[1].type = LOGOUT;
    strcpy(messages[1].data.logout.username, "bob");

    // Data message
    messages[2].type = DATA;
    messages[2].data.data.length = 50;
    strcpy(messages[2].data.data.payload, "This is some data payload...");

    for (int i = 0; i < 3; i++) {
        printf("Message %d: ", i + 1);
        process_message(&messages[i]);
    }

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Unions share memory** - all members use the same location
2. **Size equals largest member** - efficient for mutually exclusive data
3. **Only one value at a time** - track which member is active
4. **Tagged unions** prevent misuse by tracking current type
5. **Memory reinterpretation** possible but platform-dependent
6. **Perfect for variants** - different types in same memory space
7. **Combine with bit fields** for compact data representation
8. **Use for optimization** when variables are mutually exclusive

Unions enable memory-efficient, flexible data representation! 🔄✨`;
    return contentString;
  })()
};
