import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_3: SubLesson = {
  id: "9.3",
  title: 'Dynamic Arrays and Structures',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 📊 Dynamic Arrays and Structures in C

Dynamic arrays and structures provide flexible data management. Unlike static arrays, dynamic versions can grow and shrink at runtime, enabling sophisticated data handling and algorithms.

---

## 📈 Dynamic Arrays

### **Building a Dynamic Array**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int *data;        // Pointer to array data
    size_t size;      // Current number of elements
    size_t capacity;  // Maximum capacity before resizing
} DynamicArray;

DynamicArray* dynamic_array_create(size_t initial_capacity) {
    DynamicArray *arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)malloc(initial_capacity * sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = 0;
    arr->capacity = initial_capacity;
    return arr;
}

void dynamic_array_destroy(DynamicArray *arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}
\`\`\`

### **Resize Operation**

\`\`\`c
int dynamic_array_resize(DynamicArray *arr, size_t new_capacity) {
    int *new_data = (int*)realloc(arr->data, new_capacity * sizeof(int));
    if (new_data == NULL) {
        return 0;  // Resize failed
    }

    arr->data = new_data;
    arr->capacity = new_capacity;

    // Adjust size if capacity became smaller
    if (arr->size > new_capacity) {
        arr->size = new_capacity;
    }

    return 1;  // Success
}
\`\`\`

### **Add Elements**

\`\`\`c
int dynamic_array_add(DynamicArray *arr, int value) {
    // Resize if needed (double capacity when full)
    if (arr->size >= arr->capacity) {
        size_t new_capacity = arr->capacity * 2;
        if (!dynamic_array_resize(arr, new_capacity)) {
            return 0;  // Failed to resize
        }
    }

    arr->data[arr->size++] = value;
    return 1;  // Success
}
\`\`\`

### **Insert and Remove**

\`\`\`c
int dynamic_array_insert(DynamicArray *arr, size_t index, int value) {
    if (index > arr->size) return 0;

    // Resize if needed
    if (arr->size >= arr->capacity) {
        if (!dynamic_array_resize(arr, arr->capacity * 2)) {
            return 0;
        }
    }

    // Shift elements to make space
    memmove(&arr->data[index + 1], &arr->data[index],
            (arr->size - index) * sizeof(int));

    arr->data[index] = value;
    arr->size++;
    return 1;
}

int dynamic_array_remove(DynamicArray *arr, size_t index) {
    if (index >= arr->size) return 0;

    // Shift elements to fill the gap
    memmove(&arr->data[index], &arr->data[index + 1],
            (arr->size - index - 1) * sizeof(int));

    arr->size--;
    return 1;
}
\`\`\`

### **Complete Dynamic Array**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicArray;

DynamicArray* dynamic_array_create(size_t initial_capacity) {
    if (initial_capacity == 0) initial_capacity = 1;

    DynamicArray *arr = (DynamicArray*)malloc(sizeof(DynamicArray));
    if (arr == NULL) return NULL;

    arr->data = (int*)malloc(initial_capacity * sizeof(int));
    if (arr->data == NULL) {
        free(arr);
        return NULL;
    }

    arr->size = 0;
    arr->capacity = initial_capacity;
    return arr;
}

void dynamic_array_destroy(DynamicArray *arr) {
    if (arr != NULL) {
        free(arr->data);
        free(arr);
    }
}

int dynamic_array_resize(DynamicArray *arr, size_t new_capacity) {
    if (new_capacity == 0) return 0;

    int *new_data = (int*)realloc(arr->data, new_capacity * sizeof(int));
    if (new_data == NULL) return 0;

    arr->data = new_data;
    arr->capacity = new_capacity;

    if (arr->size > new_capacity) {
        arr->size = new_capacity;
    }

    return 1;
}

int dynamic_array_add(DynamicArray *arr, int value) {
    if (arr->size >= arr->capacity) {
        size_t new_capacity = arr->capacity * 2;
        if (!dynamic_array_resize(arr, new_capacity)) {
            return 0;
        }
    }

    arr->data[arr->size++] = value;
    return 1;
}

int dynamic_array_get(DynamicArray *arr, size_t index) {
    if (index >= arr->size) return INT_MIN;  // Error value
    return arr->data[index];
}

int dynamic_array_set(DynamicArray *arr, size_t index, int value) {
    if (index >= arr->size) return 0;
    arr->data[index] = value;
    return 1;
}

void dynamic_array_print(DynamicArray *arr) {
    printf("Array (%zu/%zu): [", arr->size, arr->capacity);
    for (size_t i = 0; i < arr->size; i++) {
        printf("%d", arr->data[i]);
        if (i < arr->size - 1) printf(", ");
    }
    printf("]\\n");
}

int main() {
    DynamicArray *arr = dynamic_array_create(2);
    if (arr == NULL) {
        printf("Failed to create array\\n");
        return 1;
    }

    // Add elements (will trigger resize)
    dynamic_array_add(arr, 10);
    dynamic_array_add(arr, 20);
    dynamic_array_add(arr, 30);  // Resize happens here

    printf("After adding elements:\\n");
    dynamic_array_print(arr);

    // Test get/set
    printf("Element at index 1: %d\\n", dynamic_array_get(arr, 1));

    dynamic_array_set(arr, 1, 25);
    printf("After setting index 1 to 25:\\n");
    dynamic_array_print(arr);

    dynamic_array_destroy(arr);
    return 0;
}
\`\`\`

---

## 🏗️ Dynamic Structures

### **Linked List with Dynamic Nodes**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *head;
    Node *tail;
    size_t size;
} LinkedList;

// Create new node
Node* create_node(int data) {
    Node *node = (Node*)malloc(sizeof(Node));
    if (node == NULL) return NULL;

    node->data = data;
    node->next = NULL;
    return node;
}

// Initialize list
void list_init(LinkedList *list) {
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

// Add to end
int list_append(LinkedList *list, int data) {
    Node *node = create_node(data);
    if (node == NULL) return 0;

    if (list->tail == NULL) {
        // Empty list
        list->head = list->tail = node;
    } else {
        list->tail->next = node;
        list->tail = node;
    }

    list->size++;
    return 1;
}

// Insert at position
int list_insert(LinkedList *list, size_t position, int data) {
    if (position > list->size) return 0;

    Node *node = create_node(data);
    if (node == NULL) return 0;

    if (position == 0) {
        // Insert at beginning
        node->next = list->head;
        list->head = node;
        if (list->tail == NULL) {
            list->tail = node;
        }
    } else {
        // Find position
        Node *current = list->head;
        for (size_t i = 0; i < position - 1; i++) {
            current = current->next;
        }

        node->next = current->next;
        current->next = node;

        if (node->next == NULL) {
            list->tail = node;
        }
    }

    list->size++;
    return 1;
}

// Remove at position
int list_remove(LinkedList *list, size_t position) {
    if (position >= list->size) return 0;

    Node *to_remove;

    if (position == 0) {
        // Remove from beginning
        to_remove = list->head;
        list->head = list->head->next;

        if (list->head == NULL) {
            list->tail = NULL;
        }
    } else {
        // Find position
        Node *current = list->head;
        for (size_t i = 0; i < position - 1; i++) {
            current = current->next;
        }

        to_remove = current->next;
        current->next = to_remove->next;

        if (to_remove == list->tail) {
            list->tail = current;
        }
    }

    free(to_remove);
    list->size--;
    return 1;
}

// Print list
void list_print(LinkedList *list) {
    printf("List (%zu): ", list->size);
    Node *current = list->head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

// Free list
void list_destroy(LinkedList *list) {
    Node *current = list->head;
    while (current != NULL) {
        Node *next = current->next;
        free(current);
        current = next;
    }
    list->head = list->tail = NULL;
    list->size = 0;
}

int main() {
    LinkedList list;
    list_init(&list);

    list_append(&list, 10);
    list_append(&list, 30);
    list_insert(&list, 1, 20);  // Insert 20 at position 1

    printf("After insertions:\\n");
    list_print(&list);

    list_remove(&list, 1);  // Remove position 1

    printf("After removing position 1:\\n");
    list_print(&list);

    list_destroy(&list);
    return 0;
}
\`\`\`

### **Dynamic Stack**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct {
    int *data;
    size_t size;
    size_t capacity;
} DynamicStack;

DynamicStack* stack_create(size_t initial_capacity) {
    DynamicStack *stack = (DynamicStack*)malloc(sizeof(DynamicStack));
    if (stack == NULL) return NULL;

    stack->data = (int*)malloc(initial_capacity * sizeof(int));
    if (stack->data == NULL) {
        free(stack);
        return NULL;
    }

    stack->size = 0;
    stack->capacity = initial_capacity;
    return stack;
}

void stack_destroy(DynamicStack *stack) {
    if (stack != NULL) {
        free(stack->data);
        free(stack);
    }
}

int stack_resize(DynamicStack *stack, size_t new_capacity) {
    int *new_data = (int*)realloc(stack->data, new_capacity * sizeof(int));
    if (new_data == NULL) return 0;

    stack->data = new_data;
    stack->capacity = new_capacity;
    return 1;
}

int stack_push(DynamicStack *stack, int value) {
    if (stack->size >= stack->capacity) {
        size_t new_capacity = stack->capacity * 2;
        if (!stack_resize(stack, new_capacity)) {
            return 0;
        }
    }

    stack->data[stack->size++] = value;
    return 1;
}

int stack_pop(DynamicStack *stack, int *value) {
    if (stack->size == 0) return 0;

    *value = stack->data[--stack->size];
    return 1;
}

int stack_peek(DynamicStack *stack, int *value) {
    if (stack->size == 0) return 0;

    *value = stack->data[stack->size - 1];
    return 1;
}

void stack_print(DynamicStack *stack) {
    printf("Stack (%zu/%zu): ", stack->size, stack->capacity);
    for (size_t i = 0; i < stack->size; i++) {
        printf("%d ", stack->data[i]);
    }
    printf("\\n");
}

int main() {
    DynamicStack *stack = stack_create(2);
    if (stack == NULL) return 1;

    stack_push(stack, 10);
    stack_push(stack, 20);
    stack_push(stack, 30);  // Will resize

    printf("Stack after pushes:\\n");
    stack_print(stack);

    int value;
    if (stack_peek(stack, &value)) {
        printf("Top element: %d\\n", value);
    }

    while (stack_pop(stack, &value)) {
        printf("Popped: %d\\n", value);
        stack_print(stack);
    }

    stack_destroy(stack);
    return 0;
}
\`\`\`

---

## 🔄 Dynamic Multi-dimensional Arrays

### **Dynamic 2D Array**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int **data;
    size_t rows;
    size_t cols;
} Matrix;

// Create dynamic 2D array
Matrix* matrix_create(size_t rows, size_t cols) {
    Matrix *mat = (Matrix*)malloc(sizeof(Matrix));
    if (mat == NULL) return NULL;

    mat->data = (int**)malloc(rows * sizeof(int*));
    if (mat->data == NULL) {
        free(mat);
        return NULL;
    }

    mat->rows = rows;
    mat->cols = cols;

    // Allocate each row
    for (size_t i = 0; i < rows; i++) {
        mat->data[i] = (int*)malloc(cols * sizeof(int));
        if (mat->data[i] == NULL) {
            // Free previously allocated rows
            for (size_t j = 0; j < i; j++) {
                free(mat->data[j]);
            }
            free(mat->data);
            free(mat);
            return NULL;
        }
    }

    return mat;
}

// Destroy matrix
void matrix_destroy(Matrix *mat) {
    if (mat != NULL) {
        for (size_t i = 0; i < mat->rows; i++) {
            free(mat->data[i]);
        }
        free(mat->data);
        free(mat);
    }
}

// Get/set elements
int matrix_get(Matrix *mat, size_t row, size_t col) {
    if (row >= mat->rows || col >= mat->cols) return INT_MIN;
    return mat->data[row][col];
}

int matrix_set(Matrix *mat, size_t row, size_t col, int value) {
    if (row >= mat->rows || col >= mat->cols) return 0;
    mat->data[row][col] = value;
    return 1;
}

// Print matrix
void matrix_print(Matrix *mat) {
    for (size_t i = 0; i < mat->rows; i++) {
        for (size_t j = 0; j < mat->cols; j++) {
            printf("%3d ", mat->data[i][j]);
        }
        printf("\\n");
    }
}

// Matrix operations
Matrix* matrix_add(Matrix *a, Matrix *b) {
    if (a->rows != b->rows || a->cols != b->cols) return NULL;

    Matrix *result = matrix_create(a->rows, a->cols);
    if (result == NULL) return NULL;

    for (size_t i = 0; i < a->rows; i++) {
        for (size_t j = 0; j < a->cols; j++) {
            result->data[i][j] = a->data[i][j] + b->data[i][j];
        }
    }

    return result;
}

int main() {
    Matrix *mat1 = matrix_create(3, 3);
    Matrix *mat2 = matrix_create(3, 3);
    if (mat1 == NULL || mat2 == NULL) return 1;

    // Initialize matrices
    int val = 1;
    for (size_t i = 0; i < 3; i++) {
        for (size_t j = 0; j < 3; j++) {
            matrix_set(mat1, i, j, val++);
            matrix_set(mat2, i, j, val++);
        }
    }

    printf("Matrix 1:\\n");
    matrix_print(mat1);

    printf("\\nMatrix 2:\\n");
    matrix_print(mat2);

    Matrix *sum = matrix_add(mat1, mat2);
    if (sum != NULL) {
        printf("\\nSum:\\n");
        matrix_print(sum);
        matrix_destroy(sum);
    }

    matrix_destroy(mat1);
    matrix_destroy(mat2);

    return 0;
}
\`\`\`

### **Jagged Arrays (Arrays of Arrays)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

// Jagged array: each row can have different length
typedef struct {
    int **rows;
    size_t num_rows;
    size_t *row_lengths;
} JaggedArray;

JaggedArray* jagged_create(size_t num_rows, size_t *row_lengths) {
    JaggedArray *arr = (JaggedArray*)malloc(sizeof(JaggedArray));
    if (arr == NULL) return NULL;

    arr->rows = (int**)malloc(num_rows * sizeof(int*));
    if (arr->rows == NULL) {
        free(arr);
        return NULL;
    }

    arr->row_lengths = (size_t*)malloc(num_rows * sizeof(size_t));
    if (arr->row_lengths == NULL) {
        free(arr->rows);
        free(arr);
        return NULL;
    }

    arr->num_rows = num_rows;

    // Allocate each row
    for (size_t i = 0; i < num_rows; i++) {
        arr->row_lengths[i] = row_lengths[i];
        arr->rows[i] = (int*)malloc(row_lengths[i] * sizeof(int));
        if (arr->rows[i] == NULL) {
            // Free everything allocated so far
            for (size_t j = 0; j < i; j++) {
                free(arr->rows[j]);
            }
            free(arr->row_lengths);
            free(arr->rows);
            free(arr);
            return NULL;
        }
    }

    return arr;
}

void jagged_destroy(JaggedArray *arr) {
    if (arr != NULL) {
        for (size_t i = 0; i < arr->num_rows; i++) {
            free(arr->rows[i]);
        }
        free(arr->row_lengths);
        free(arr->rows);
        free(arr);
    }
}

void jagged_print(JaggedArray *arr) {
    for (size_t i = 0; i < arr->num_rows; i++) {
        printf("Row %zu: ", i);
        for (size_t j = 0; j < arr->row_lengths[i]; j++) {
            printf("%d ", arr->rows[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    size_t row_lengths[] = {3, 5, 2, 4};
    JaggedArray *jagged = jagged_create(4, row_lengths);
    if (jagged == NULL) return 1;

    // Fill with data
    int val = 1;
    for (size_t i = 0; i < jagged->num_rows; i++) {
        for (size_t j = 0; j < jagged->row_lengths[i]; j++) {
            jagged->rows[i][j] = val++;
        }
    }

    jagged_print(jagged);

    jagged_destroy(jagged);

    return 0;
}
\`\`\`

---

## 🏛️ Advanced Data Structures

### **Dynamic Hash Table**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define INITIAL_CAPACITY 16
#define LOAD_FACTOR_THRESHOLD 0.75

typedef struct Entry {
    char *key;
    int value;
    struct Entry *next;  // For collision resolution
} Entry;

typedef struct {
    Entry **buckets;
    size_t capacity;
    size_t size;
} HashTable;

unsigned long hash_string(const char *str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;  // hash * 33 + c
    }
    return hash;
}

HashTable* hashtable_create() {
    HashTable *table = (HashTable*)malloc(sizeof(HashTable));
    if (table == NULL) return NULL;

    table->buckets = (Entry**)calloc(INITIAL_CAPACITY, sizeof(Entry*));
    if (table->buckets == NULL) {
        free(table);
        return NULL;
    }

    table->capacity = INITIAL_CAPACITY;
    table->size = 0;
    return table;
}

int hashtable_resize(HashTable *table, size_t new_capacity) {
    Entry **new_buckets = (Entry**)calloc(new_capacity, sizeof(Entry*));
    if (new_buckets == NULL) return 0;

    // Rehash all entries
    for (size_t i = 0; i < table->capacity; i++) {
        Entry *entry = table->buckets[i];
        while (entry != NULL) {
            size_t new_index = hash_string(entry->key) % new_capacity;

            Entry *next = entry->next;
            entry->next = new_buckets[new_index];
            new_buckets[new_index] = entry;
            entry = next;
        }
    }

    free(table->buckets);
    table->buckets = new_buckets;
    table->capacity = new_capacity;

    return 1;
}

int hashtable_put(HashTable *table, const char *key, int value) {
    if ((float)table->size / table->capacity >= LOAD_FACTOR_THRESHOLD) {
        if (!hashtable_resize(table, table->capacity * 2)) {
            return 0;
        }
    }

    size_t index = hash_string(key) % table->capacity;

    // Check if key exists
    Entry *entry = table->buckets[index];
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            entry->value = value;  // Update existing
            return 1;
        }
        entry = entry->next;
    }

    // Add new entry
    Entry *new_entry = (Entry*)malloc(sizeof(Entry));
    if (new_entry == NULL) return 0;

    new_entry->key = (char*)malloc(strlen(key) + 1);
    if (new_entry->key == NULL) {
        free(new_entry);
        return 0;
    }

    strcpy(new_entry->key, key);
    new_entry->value = value;
    new_entry->next = table->buckets[index];
    table->buckets[index] = new_entry;
    table->size++;

    return 1;
}

int hashtable_get(HashTable *table, const char *key, int *value) {
    size_t index = hash_string(key) % table->capacity;

    Entry *entry = table->buckets[index];
    while (entry != NULL) {
        if (strcmp(entry->key, key) == 0) {
            *value = entry->value;
            return 1;
        }
        entry = entry->next;
    }

    return 0;  // Not found
}

void hashtable_destroy(HashTable *table) {
    if (table != NULL) {
        for (size_t i = 0; i < table->capacity; i++) {
            Entry *entry = table->buckets[i];
            while (entry != NULL) {
                Entry *next = entry->next;
                free(entry->key);
                free(entry);
                entry = next;
            }
        }
        free(table->buckets);
        free(table);
    }
}

int main() {
    HashTable *table = hashtable_create();
    if (table == NULL) return 1;

    hashtable_put(table, "apple", 5);
    hashtable_put(table, "banana", 7);
    hashtable_put(table, "orange", 3);

    int value;
    if (hashtable_get(table, "banana", &value)) {
        printf("Banana count: %d\\n", value);
    }

    hashtable_destroy(table);
    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Dynamic String Builder**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

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

int sb_append(StringBuilder *sb, const char *str) {
    size_t str_len = strlen(str);
    size_t needed = sb->size + str_len + 1;

    if (needed > sb->capacity) {
        size_t new_capacity = sb->capacity * 2;
        while (new_capacity < needed) {
            new_capacity *= 2;
        }

        char *new_data = (char*)realloc(sb->data, new_capacity);
        if (new_data == NULL) return 0;

        sb->data = new_data;
        sb->capacity = new_capacity;
    }

    strcpy(sb->data + sb->size, str);
    sb->size += str_len;
    return 1;
}

char* sb_to_string(StringBuilder *sb) {
    return sb->data;
}

void sb_destroy(StringBuilder *sb) {
    if (sb != NULL) {
        free(sb->data);
        free(sb);
    }
}

int main() {
    StringBuilder *sb = sb_create(10);
    if (sb == NULL) return 1;

    sb_append(sb, "Hello");
    sb_append(sb, ", ");
    sb_append(sb, "Dynamic");
    sb_append(sb, " ");
    sb_append(sb, "Strings!");

    printf("Result: %s\\n", sb_to_string(sb));
    printf("Size: %zu, Capacity: %zu\\n", sb->size, sb->capacity);

    sb_destroy(sb);
    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Dynamic arrays** grow automatically and provide flexible storage
2. **Dynamic structures** enable complex data relationships
3. **Resize operations** are crucial for efficiency
4. **Memory management** must handle all allocated resources
5. **Error checking** prevents crashes and data corruption
6. **Performance considerations** include resize strategies and access patterns
7. **Multi-dimensional arrays** require careful allocation/deallocation
8. **Advanced structures** like hash tables provide fast data access

Dynamic data structures unlock the full potential of C programming! 📊✨`;

    return contentString;
  })()
};
