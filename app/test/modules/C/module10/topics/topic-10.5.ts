import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_5: SubLesson = {
  id: "10.5",
  title: 'Hash Tables and Hash Functions',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔑 Hash Tables and Hash Functions in C

Hash tables provide fast data access using hash functions to map keys to storage locations. They offer average O(1) lookup time and are essential for efficient data structures.

---

## 🔧 Hash Function Design

### **What is a Hash Function?**

A hash function converts a key into an index within a fixed range, enabling fast data retrieval.

### **Simple Hash Functions**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Simple string hash
unsigned int simple_hash(const char *key) {
    unsigned int hash = 0;
    while (*key) {
        hash = hash * 31 + *key;  // 31 is a common prime multiplier
        key++;
    }
    return hash;
}

// Division method hash
unsigned int division_hash(unsigned int key, unsigned int table_size) {
    return key % table_size;
}

// Multiplication method hash
unsigned int multiplication_hash(unsigned int key, unsigned int table_size) {
    const double A = 0.6180339887;  // Golden ratio conjugate
    double fractional_part = key * A;
    fractional_part -= (unsigned int)fractional_part;
    return (unsigned int)(fractional_part * table_size);
}

// djb2 hash (popular string hash)
unsigned long djb2_hash(const char *str) {
    unsigned long hash = 5381;
    int c;

    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;  // hash * 33 + c
    }

    return hash;
}

// sdbm hash
unsigned long sdbm_hash(const char *str) {
    unsigned long hash = 0;
    int c;

    while ((c = *str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }

    return hash;
}
\`\`\`

### **Hash Function Evaluation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define TEST_KEYS 1000
#define TABLE_SIZE 100

void test_hash_distribution(unsigned int (*hash_func)(unsigned int, unsigned int)) {
    int distribution[TABLE_SIZE] = {0};
    int collisions = 0;

    // Generate test keys
    srand(time(NULL));
    for (int i = 0; i < TEST_KEYS; i++) {
        unsigned int key = rand();
        unsigned int index = hash_func(key, TABLE_SIZE);
        distribution[index]++;

        if (distribution[index] > 1) {
            collisions++;
        }
    }

    printf("Hash function distribution:\\n");
    printf("Collisions: %d\\n", collisions);
    printf("Max bucket size: ");

    int max_bucket = 0;
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (distribution[i] > max_bucket) {
            max_bucket = distribution[i];
        }
    }
    printf("%d\\n", max_bucket);

    // Calculate load factor
    printf("Average load: %.2f\\n", (float)TEST_KEYS / TABLE_SIZE);
}

int main() {
    printf("Testing division hash:\\n");
    test_hash_distribution(division_hash);

    printf("\\nTesting multiplication hash:\\n");
    test_hash_distribution(multiplication_hash);

    return 0;
}
\`\`\`

---

## 📦 Hash Table Implementation

### **Basic Hash Table with Separate Chaining**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define TABLE_SIZE 100

typedef struct HashNode {
    char *key;
    int value;
    struct HashNode *next;
} HashNode;

typedef struct {
    HashNode *buckets[TABLE_SIZE];
    unsigned int (*hash_func)(const char*);
} HashTable;

unsigned int string_hash(const char *key) {
    unsigned long hash = 5381;
    int c;
    while ((c = *key++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash % TABLE_SIZE;
}

HashTable* hash_table_create() {
    HashTable *table = (HashTable*)malloc(sizeof(HashTable));
    if (table == NULL) return NULL;

    memset(table->buckets, 0, sizeof(table->buckets));
    table->hash_func = string_hash;

    return table;
}

HashNode* create_node(const char *key, int value) {
    HashNode *node = (HashNode*)malloc(sizeof(HashNode));
    if (node == NULL) return NULL;

    node->key = (char*)malloc(strlen(key) + 1);
    if (node->key == NULL) {
        free(node);
        return NULL;
    }

    strcpy(node->key, key);
    node->value = value;
    node->next = NULL;

    return node;
}

bool hash_table_insert(HashTable *table, const char *key, int value) {
    unsigned int index = table->hash_func(key);

    // Check if key already exists
    HashNode *current = table->buckets[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            current->value = value;  // Update existing
            return true;
        }
        current = current->next;
    }

    // Insert new node at beginning of chain
    HashNode *new_node = create_node(key, value);
    if (new_node == NULL) return false;

    new_node->next = table->buckets[index];
    table->buckets[index] = new_node;

    return true;
}

bool hash_table_get(HashTable *table, const char *key, int *value) {
    unsigned int index = table->hash_func(key);

    HashNode *current = table->buckets[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            *value = current->value;
            return true;
        }
        current = current->next;
    }

    return false;  // Key not found
}

bool hash_table_remove(HashTable *table, const char *key) {
    unsigned int index = table->hash_func(key);

    HashNode *current = table->buckets[index];
    HashNode *prev = NULL;

    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            if (prev == NULL) {
                table->buckets[index] = current->next;
            } else {
                prev->next = current->next;
            }

            free(current->key);
            free(current);
            return true;
        }

        prev = current;
        current = current->next;
    }

    return false;  // Key not found
}

void hash_table_destroy(HashTable *table) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        HashNode *current = table->buckets[i];
        while (current != NULL) {
            HashNode *next = current->next;
            free(current->key);
            free(current);
            current = next;
        }
    }
    free(table);
}

void hash_table_print(HashTable *table) {
    printf("Hash Table Contents:\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table->buckets[i] != NULL) {
            printf("Bucket %d: ", i);
            HashNode *current = table->buckets[i];
            while (current != NULL) {
                printf("(%s,%d) ", current->key, current->value);
                current = current->next;
            }
            printf("\\n");
        }
    }
}
\`\`\`

### **Hash Table with Linear Probing**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define TABLE_SIZE 100
#define DELETED (void*)-1

typedef struct {
    char **keys;
    int *values;
    size_t size;
} HashTableLP;

HashTableLP* hash_table_lp_create() {
    HashTableLP *table = (HashTableLP*)malloc(sizeof(HashTableLP));
    if (table == NULL) return NULL;

    table->keys = (char**)malloc(TABLE_SIZE * sizeof(char*));
    table->values = (int*)malloc(TABLE_SIZE * sizeof(int));

    if (table->keys == NULL || table->values == NULL) {
        free(table->keys);
        free(table->values);
        free(table);
        return NULL;
    }

    // Initialize all slots as empty
    for (int i = 0; i < TABLE_SIZE; i++) {
        table->keys[i] = NULL;
        table->values[i] = 0;
    }

    table->size = 0;
    return table;
}

unsigned int hash_string_lp(const char *key) {
    unsigned long hash = 5381;
    int c;
    while ((c = *key++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash % TABLE_SIZE;
}

bool hash_table_lp_insert(HashTableLP *table, const char *key, int value) {
    if (table->size >= TABLE_SIZE * 0.75) {
        printf("Hash table is full\\n");
        return false;
    }

    unsigned int index = hash_string_lp(key);

    // Linear probing
    while (table->keys[index] != NULL && table->keys[index] != DELETED) {
        if (strcmp(table->keys[index], key) == 0) {
            // Update existing
            table->values[index] = value;
            return true;
        }
        index = (index + 1) % TABLE_SIZE;
    }

    // Insert new key-value pair
    table->keys[index] = (char*)malloc(strlen(key) + 1);
    if (table->keys[index] == NULL) return false;

    strcpy(table->keys[index], key);
    table->values[index] = value;
    table->size++;

    return true;
}

bool hash_table_lp_get(HashTableLP *table, const char *key, int *value) {
    unsigned int index = hash_string_lp(key);

    // Linear probing
    while (table->keys[index] != NULL) {
        if (table->keys[index] != DELETED && strcmp(table->keys[index], key) == 0) {
            *value = table->values[index];
            return true;
        }
        index = (index + 1) % TABLE_SIZE;
    }

    return false;
}

bool hash_table_lp_remove(HashTableLP *table, const char *key) {
    unsigned int index = hash_string_lp(key);

    // Linear probing
    while (table->keys[index] != NULL) {
        if (table->keys[index] != DELETED && strcmp(table->keys[index], key) == 0) {
            free(table->keys[index]);
            table->keys[index] = (char*)DELETED;  // Mark as deleted
            table->size--;
            return true;
        }
        index = (index + 1) % TABLE_SIZE;
    }

    return false;
}

void hash_table_lp_destroy(HashTableLP *table) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table->keys[i] != NULL && table->keys[i] != DELETED) {
            free(table->keys[i]);
        }
    }
    free(table->keys);
    free(table->values);
    free(table);
}
\`\`\`

---

## 🔄 Hash Table Operations

### **Resize and Rehash**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

#define INITIAL_SIZE 16
#define LOAD_FACTOR 0.75

typedef struct HashEntry {
    char *key;
    int value;
    struct HashEntry *next;
} HashEntry;

typedef struct {
    HashEntry **buckets;
    size_t size;
    size_t capacity;
    unsigned int (*hash_func)(const char*, size_t);
} ResizableHashTable;

ResizableHashTable* resizable_hash_create() {
    ResizableHashTable *table = (ResizableHashTable*)malloc(sizeof(ResizableHashTable));
    if (table == NULL) return NULL;

    table->capacity = INITIAL_SIZE;
    table->size = 0;
    table->buckets = (HashEntry**)calloc(table->capacity, sizeof(HashEntry*));
    table->hash_func = NULL;  // Will set this

    if (table->buckets == NULL) {
        free(table);
        return NULL;
    }

    return table;
}

unsigned int resizable_hash_func(const char *key, size_t capacity) {
    unsigned long hash = 5381;
    int c;
    while ((c = *key++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash % capacity;
}

bool resizable_hash_resize(ResizableHashTable *table, size_t new_capacity) {
    HashEntry **new_buckets = (HashEntry**)calloc(new_capacity, sizeof(HashEntry*));
    if (new_buckets == NULL) return false;

    // Rehash all entries
    for (size_t i = 0; i < table->capacity; i++) {
        HashEntry *entry = table->buckets[i];
        while (entry != NULL) {
            HashEntry *next = entry->next;

            // Recompute hash for new capacity
            unsigned int new_index = resizable_hash_func(entry->key, new_capacity);

            // Insert at beginning of new bucket
            entry->next = new_buckets[new_index];
            new_buckets[new_index] = entry;

            entry = next;
        }
    }

    free(table->buckets);
    table->buckets = new_buckets;
    table->capacity = new_capacity;

    return true;
}

bool resizable_hash_insert(ResizableHashTable *table, const char *key, int value) {
    // Check load factor
    if ((float)table->size / table->capacity >= LOAD_FACTOR) {
        size_t new_capacity = table->capacity * 2;
        if (!resizable_hash_resize(table, new_capacity)) {
            return false;
        }
    }

    unsigned int index = resizable_hash_func(key, table->capacity);

    // Check if key exists
    HashEntry *current = table->buckets[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            current->value = value;  // Update
            return true;
        }
        current = current->next;
    }

    // Insert new entry
    HashEntry *new_entry = (HashEntry*)malloc(sizeof(HashEntry));
    if (new_entry == NULL) return false;

    new_entry->key = (char*)malloc(strlen(key) + 1);
    if (new_entry->key == NULL) {
        free(new_entry);
        return false;
    }

    strcpy(new_entry->key, key);
    new_entry->value = value;
    new_entry->next = table->buckets[index];
    table->buckets[index] = new_entry;
    table->size++;

    return true;
}
\`\`\`

### **Hash Table Iterator**

\`\`\`c
typedef struct {
    ResizableHashTable *table;
    size_t bucket_index;
    HashEntry *current_entry;
} HashIterator;

void hash_iterator_init(HashIterator *iter, ResizableHashTable *table) {
    iter->table = table;
    iter->bucket_index = 0;
    iter->current_entry = NULL;

    // Find first non-empty bucket
    while (iter->bucket_index < table->capacity &&
           table->buckets[iter->bucket_index] == NULL) {
        iter->bucket_index++;
    }

    if (iter->bucket_index < table->capacity) {
        iter->current_entry = table->buckets[iter->bucket_index];
    }
}

bool hash_iterator_next(HashIterator *iter, const char **key, int *value) {
    if (iter->current_entry == NULL) return false;

    *key = iter->current_entry->key;
    *value = iter->current_entry->value;

    // Move to next entry
    iter->current_entry = iter->current_entry->next;

    // If end of chain, find next non-empty bucket
    while (iter->current_entry == NULL && iter->bucket_index < iter->table->capacity - 1) {
        iter->bucket_index++;
        iter->current_entry = iter->table->buckets[iter->bucket_index];
    }

    return true;
}

// Usage
void print_all_entries(ResizableHashTable *table) {
    HashIterator iter;
    hash_iterator_init(&iter, table);

    const char *key;
    int value;

    printf("All hash table entries:\\n");
    while (hash_iterator_next(&iter, &key, &value)) {
        printf("  %s: %d\\n", key, value);
    }
}
\`\`\`

---

## 🎯 Applications

### **Word Frequency Counter**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_WORD_LENGTH 100

HashTable* create_word_frequency_table() {
    return hash_table_create();
}

void process_text(HashTable *table, const char *text) {
    char word[MAX_WORD_LENGTH];
    int word_index = 0;

    for (size_t i = 0; text[i] != '\\0'; i++) {
        char c = tolower(text[i]);

        if (isalnum(c)) {
            if (word_index < MAX_WORD_LENGTH - 1) {
                word[word_index++] = c;
            }
        } else if (word_index > 0) {
            // End of word
            word[word_index] = '\\0';

            // Update frequency
            int frequency = 0;
            hash_table_get(table, word, &frequency);
            hash_table_insert(table, word, frequency + 1);

            word_index = 0;
        }
    }

    // Handle last word
    if (word_index > 0) {
        word[word_index] = '\\0';
        int frequency = 0;
        hash_table_get(table, word, &frequency);
        hash_table_insert(table, word, frequency + 1);
    }
}

void print_top_words(HashTable *table, int top_n) {
    // Simple approach: iterate and find top frequencies
    // In practice, you'd want a more efficient way

    typedef struct {
        char *word;
        int frequency;
    } WordFreq;

    WordFreq *words = NULL;
    int word_count = 0;

    // Collect all words (inefficient but simple)
    for (int i = 0; i < TABLE_SIZE; i++) {
        HashNode *current = table->buckets[i];
        while (current != NULL) {
            words = (WordFreq*)realloc(words, (word_count + 1) * sizeof(WordFreq));
            words[word_count].word = current->key;
            words[word_count].frequency = current->value;
            word_count++;
            current = current->next;
        }
    }

    // Simple bubble sort by frequency (descending)
    for (int i = 0; i < word_count - 1; i++) {
        for (int j = 0; j < word_count - i - 1; j++) {
            if (words[j].frequency < words[j + 1].frequency) {
                WordFreq temp = words[j];
                words[j] = words[j + 1];
                words[j + 1] = temp;
            }
        }
    }

    printf("Top %d words:\\n", top_n);
    for (int i = 0; i < top_n && i < word_count; i++) {
        printf("  %s: %d\\n", words[i].word, words[i].frequency);
    }

    free(words);
}

int main() {
    const char *text = "the quick brown fox jumps over the lazy dog the fox is quick";

    HashTable *word_table = create_word_frequency_table();
    process_text(word_table, text);

    print_top_words(word_table, 5);

    hash_table_destroy(word_table);

    return 0;
}
\`\`\`

### **Symbol Table for Compiler**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef enum {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_CHAR,
    TYPE_VOID
} DataType;

typedef struct {
    char *name;
    DataType type;
    int scope_level;
    bool is_function;
    union {
        int int_value;
        float float_value;
        char char_value;
    } value;
} Symbol;

typedef struct SymbolTable {
    HashTable *table;
    struct SymbolTable *parent;
    int current_scope;
} SymbolTable;

SymbolTable* symbol_table_create(SymbolTable *parent) {
    SymbolTable *st = (SymbolTable*)malloc(sizeof(SymbolTable));
    if (st == NULL) return NULL;

    st->table = hash_table_create();
    if (st->table == NULL) {
        free(st);
        return NULL;
    }

    st->parent = parent;
    st->current_scope = parent ? parent->current_scope + 1 : 0;

    return st;
}

bool symbol_table_insert(SymbolTable *st, const char *name, DataType type, bool is_function) {
    // Check if symbol already exists in current scope
    int existing_value;
    if (hash_table_get(st->table, name, &existing_value)) {
        return false;  // Already exists in current scope
    }

    // Create symbol entry (store type as value for simplicity)
    return hash_table_insert(st->table, name, (int)type);
}

bool symbol_table_lookup(SymbolTable *st, const char *name, DataType *type) {
    // Search current scope first
    int type_int;
    if (hash_table_get(st->table, name, &type_int)) {
        *type = (DataType)type_int;
        return true;
    }

    // Search parent scopes
    if (st->parent != NULL) {
        return symbol_table_lookup(st->parent, name, type);
    }

    return false;
}

void symbol_table_enter_scope(SymbolTable **current) {
    SymbolTable *new_scope = symbol_table_create(*current);
    *current = new_scope;
}

void symbol_table_exit_scope(SymbolTable **current) {
    if (*current == NULL || (*current)->parent == NULL) return;

    SymbolTable *to_free = *current;
    *current = (*current)->parent;

    hash_table_destroy(to_free->table);
    free(to_free);
}

void symbol_table_destroy(SymbolTable *st) {
    while (st != NULL) {
        SymbolTable *next = st->parent;
        hash_table_destroy(st->table);
        free(st);
        st = next;
    }
}

int main() {
    SymbolTable *current_scope = symbol_table_create(NULL);

    // Global scope
    symbol_table_insert(current_scope, "printf", TYPE_VOID, true);
    symbol_table_insert(current_scope, "global_var", TYPE_INT, false);

    // Enter function scope
    symbol_table_enter_scope(&current_scope);
    symbol_table_insert(current_scope, "local_var", TYPE_FLOAT, false);

    // Check symbol lookup
    DataType type;
    if (symbol_table_lookup(current_scope, "local_var", &type)) {
        printf("local_var found, type: %d\\n", type);
    }

    if (symbol_table_lookup(current_scope, "global_var", &type)) {
        printf("global_var found, type: %d\\n", type);
    }

    // Exit function scope
    symbol_table_exit_scope(&current_scope);

    symbol_table_destroy(current_scope);

    return 0;
}
\`\`\`

### **Cache Implementation**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define CACHE_SIZE 100

typedef struct CacheEntry {
    char *key;
    void *value;
    size_t value_size;
    struct CacheEntry *next;
    struct CacheEntry *prev;  // For LRU
} CacheEntry;

typedef struct {
    HashTable *hash_table;
    CacheEntry *head;  // Most recently used
    CacheEntry *tail;  // Least recently used
    size_t max_size;
    size_t current_size;
} LRUCache;

LRUCache* lru_cache_create(size_t max_size) {
    LRUCache *cache = (LRUCache*)malloc(sizeof(LRUCache));
    if (cache == NULL) return NULL;

    cache->hash_table = hash_table_create();
    if (cache->hash_table == NULL) {
        free(cache);
        return NULL;
    }

    cache->head = NULL;
    cache->tail = NULL;
    cache->max_size = max_size;
    cache->current_size = 0;

    return cache;
}

void lru_move_to_front(LRUCache *cache, CacheEntry *entry) {
    if (entry == cache->head) return;

    // Remove from current position
    if (entry->prev) entry->prev->next = entry->next;
    if (entry->next) entry->next->prev = entry->prev;
    if (entry == cache->tail) cache->tail = entry->prev;

    // Move to front
    entry->next = cache->head;
    entry->prev = NULL;
    if (cache->head) cache->head->prev = entry;
    cache->head = entry;

    if (cache->tail == NULL) cache->tail = entry;
}

void lru_evict(LRUCache *cache) {
    if (cache->tail == NULL) return;

    CacheEntry *to_evict = cache->tail;

    // Remove from hash table
    hash_table_remove(cache->hash_table, to_evict->key);

    // Remove from linked list
    if (to_evict->prev) to_evict->prev->next = NULL;
    cache->tail = to_evict->prev;

    // Free memory
    free(to_evict->key);
    free(to_evict->value);
    free(to_evict);

    cache->current_size--;
}

bool lru_cache_put(LRUCache *cache, const char *key, void *value, size_t value_size) {
    // Check if key exists
    int existing_index;
    if (hash_table_get(cache->hash_table, key, &existing_index)) {
        // Update existing entry
        CacheEntry *entry = (CacheEntry*)existing_index;  // Simplified
        free(entry->value);
        entry->value = malloc(value_size);
        if (entry->value == NULL) return false;
        memcpy(entry->value, value, value_size);
        entry->value_size = value_size;

        lru_move_to_front(cache, entry);
        return true;
    }

    // Create new entry
    CacheEntry *new_entry = (CacheEntry*)malloc(sizeof(CacheEntry));
    if (new_entry == NULL) return false;

    new_entry->key = (char*)malloc(strlen(key) + 1);
    new_entry->value = malloc(value_size);

    if (new_entry->key == NULL || new_entry->value == NULL) {
        free(new_entry->key);
        free(new_entry->value);
        free(new_entry);
        return false;
    }

    strcpy(new_entry->key, key);
    memcpy(new_entry->value, value, value_size);
    new_entry->value_size = value_size;

    // Add to hash table (simplified - using pointer as int)
    hash_table_insert(cache->hash_table, key, (int)new_entry);

    // Add to linked list (front)
    new_entry->next = cache->head;
    new_entry->prev = NULL;
    if (cache->head) cache->head->prev = new_entry;
    cache->head = new_entry;
    if (cache->tail == NULL) cache->tail = new_entry;

    cache->current_size++;

    // Evict if necessary
    if (cache->current_size > cache->max_size) {
        lru_evict(cache);
    }

    return true;
}

bool lru_cache_get(LRUCache *cache, const char *key, void **value, size_t *value_size) {
    int entry_ptr;
    if (!hash_table_get(cache->hash_table, key, &entry_ptr)) {
        return false;
    }

    CacheEntry *entry = (CacheEntry*)entry_ptr;
    *value = entry->value;
    *value_size = entry->value_size;

    lru_move_to_front(cache, entry);

    return true;
}

void lru_cache_destroy(LRUCache *cache) {
    CacheEntry *current = cache->head;
    while (current != NULL) {
        CacheEntry *next = current->next;
        free(current->key);
        free(current->value);
        free(current);
        current = next;
    }

    hash_table_destroy(cache->hash_table);
    free(cache);
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Hash functions** convert keys to array indices for fast lookup
2. **Collision resolution** handles cases where different keys hash to same index
3. **Separate chaining** uses linked lists for collision resolution
4. **Linear probing** searches sequentially for next available slot
5. **Load factor** determines when to resize hash table
6. **Hash table operations** provide average O(1) time complexity
7. **Cache implementations** use hash tables for fast data access
8. **Symbol tables** in compilers rely on hash table efficiency

Master hash tables to implement fast lookup data structures! 🔑✨`;

    return contentString;
  })()
};
