import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_4: SubLesson = {
  id: '16.4',
  title: 'Code Organization and Architecture',
  status: 'demo',
  content: `# Code Organization and Architecture in C

## Modular Code Organization

### Header File Organization
\`\`\`c
// mymodule.h - Interface declaration
#ifndef MYMODULE_H
#define MYMODULE_H

#include <stddef.h>

// Opaque pointer for data hiding
typedef struct MyModule MyModule;

// Public API
MyModule *mymodule_create(void);
void mymodule_destroy(MyModule *module);
int mymodule_process(MyModule *module, const char *data);
size_t mymodule_get_count(const MyModule *module);

// Error codes
typedef enum {
    MYMODULE_SUCCESS = 0,
    MYMODULE_ERROR_INVALID_INPUT = -1,
    MYMODULE_ERROR_MEMORY = -2,
    MYMODULE_ERROR_PROCESSING = -3
} MyModuleError;

const char *mymodule_error_string(MyModuleError error);

#endif // MYMODULE_H
\`\`\`

### Implementation File Structure
\`\`\`c
// mymodule.c - Implementation
#include "mymodule.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

// Private structure definition
struct MyModule {
    char *buffer;
    size_t buffer_size;
    size_t item_count;
    MyModuleError last_error;
};

// Static function declarations
static MyModuleError validate_input(const char *data);
static void set_error(MyModule *module, MyModuleError error);

// Error messages
static const char *error_messages[] = {
    "Success",
    "Invalid input",
    "Memory allocation failed",
    "Processing failed"
};

MyModule *mymodule_create(void) {
    MyModule *module = calloc(1, sizeof(MyModule));
    if (!module) return NULL;

    module->buffer_size = 1024;
    module->buffer = malloc(module->buffer_size);
    if (!module->buffer) {
        free(module);
        return NULL;
    }

    return module;
}

void mymodule_destroy(MyModule *module) {
    if (module) {
        free(module->buffer);
        free(module);
    }
}

int mymodule_process(MyModule *module, const char *data) {
    if (!module || !data) {
        return MYMODULE_ERROR_INVALID_INPUT;
    }

    MyModuleError validation_error = validate_input(data);
    if (validation_error != MYMODULE_SUCCESS) {
        set_error(module, validation_error);
        return validation_error;
    }

    // Process data...
    size_t data_len = strlen(data);
    if (data_len >= module->buffer_size) {
        // Resize buffer
        size_t new_size = data_len * 2;
        char *new_buffer = realloc(module->buffer, new_size);
        if (!new_buffer) {
            set_error(module, MYMODULE_ERROR_MEMORY);
            return MYMODULE_ERROR_MEMORY;
        }
        module->buffer = new_buffer;
        module->buffer_size = new_size;
    }

    strcpy(module->buffer, data);
    module->item_count++;

    set_error(module, MYMODULE_SUCCESS);
    return MYMODULE_SUCCESS;
}

size_t mymodule_get_count(const MyModule *module) {
    return module ? module->item_count : 0;
}

const char *mymodule_error_string(MyModuleError error) {
    if (error >= 0 && error < (int)(sizeof(error_messages) / sizeof(error_messages[0]))) {
        return error_messages[error];
    }
    return "Unknown error";
}

// Private functions
static MyModuleError validate_input(const char *data) {
    if (!data || strlen(data) == 0) {
        return MYMODULE_ERROR_INVALID_INPUT;
    }
    // Additional validation...
    return MYMODULE_SUCCESS;
}

static void set_error(MyModule *module, MyModuleError error) {
    if (module) {
        module->last_error = error;
    }
}
\`\`\`

## Interface Design Patterns

### Callback Interfaces
\`\`\`c
// callback.h
#ifndef CALLBACK_H
#define CALLBACK_H

#include <stddef.h>

// Generic callback types
typedef void (*CallbackFunc)(void *user_data);
typedef int (*PredicateFunc)(const void *item, void *user_data);
typedef int (*CompareFunc)(const void *a, const void *b, void *user_data);

// Callback registration structure
typedef struct {
    CallbackFunc function;
    void *user_data;
} Callback;

// Register callback
void callback_register(Callback *callback, CallbackFunc func, void *user_data);

// Invoke callback
void callback_invoke(const Callback *callback);

// Multiple callbacks
typedef struct {
    Callback *callbacks;
    size_t count;
    size_t capacity;
} CallbackList;

void callback_list_init(CallbackList *list);
void callback_list_add(CallbackList *list, CallbackFunc func, void *user_data);
void callback_list_invoke(const CallbackList *list);
void callback_list_destroy(CallbackList *list);

#endif // CALLBACK_H
\`\`\`

### Plugin Architecture
\`\`\`c
// plugin.h
#ifndef PLUGIN_H
#define PLUGIN_H

#include <stddef.h>

// Plugin interface
typedef struct Plugin Plugin;

typedef struct {
    const char *name;
    const char *version;
    const char *description;

    // Plugin lifecycle
    int (*init)(Plugin *plugin, void *context);
    void (*cleanup)(Plugin *plugin);

    // Plugin functionality
    int (*process)(Plugin *plugin, void *data, size_t size);

    // Plugin information
    const char *(*get_info)(Plugin *plugin);
} PluginInterface;

struct Plugin {
    PluginInterface *interface;
    void *handle;  // For dynamic loading
    void *context; // Plugin-specific data
};

// Plugin manager
typedef struct {
    Plugin *plugins;
    size_t count;
    size_t capacity;
} PluginManager;

void plugin_manager_init(PluginManager *manager);
int plugin_manager_load(PluginManager *manager, const char *plugin_path);
int plugin_manager_process_all(PluginManager *manager, void *data, size_t size);
void plugin_manager_unload_all(PluginManager *manager);

#endif // PLUGIN_H
\`\`\`

## Error Handling Strategies

### Error Context Propagation
\`\`\`c
#include <setjmp.h>
#include <stdio.h>

// Error context structure
typedef struct {
    jmp_buf jump_buffer;
    const char *error_message;
    int error_code;
    const char *file;
    int line;
    const char *function;
} ErrorContext;

// Thread-local error context
static __thread ErrorContext *current_error_context = NULL;

// Set error and jump
#define THROW_ERROR(code, message) \\
    do { \\
        if (current_error_context) { \\
            current_error_context->error_code = code; \\
            current_error_context->error_message = message; \\
            current_error_context->file = __FILE__; \\
            current_error_context->line = __LINE__; \\
            current_error_context->function = __func__; \\
            longjmp(current_error_context->jump_buffer, 1); \\
        } \\
    } while (0)

// Try-catch macro
#define TRY \\
    do { \\
        ErrorContext error_ctx = {0}; \\
        ErrorContext *previous_ctx = current_error_context; \\
        current_error_context = &error_ctx; \\
        \\
        if (setjmp(error_ctx.jump_buffer) == 0) {

// Catch block
#define CATCH \\
        } else { \\
            current_error_context = previous_ctx;

// End try-catch
#define END_TRY \\
        } \\
        current_error_context = previous_ctx; \\
    } while (0)

// Usage example
int risky_operation(int value) {
    if (value < 0) {
        THROW_ERROR(-1, "Negative value not allowed");
    }
    if (value > 100) {
        THROW_ERROR(-2, "Value too large");
    }
    return value * 2;
}

int safe_function(int input) {
    TRY {
        int result = risky_operation(input);
        printf("Result: %d\\n", result);
        return result;
    }
    CATCH {
        fprintf(stderr, "Error in %s at %s:%d: %s\\n",
                error_ctx.function, error_ctx.file, error_ctx.line,
                error_ctx.error_message);
        return error_ctx.error_code;
    }
    END_TRY;
}
\`\`\`

## Resource Management

### RAII-like Resource Management
\`\`\`c
#include <stdlib.h>
#include <stdio.h>

// Resource cleanup function type
typedef void (*CleanupFunc)(void *resource);

// Resource guard structure
typedef struct {
    void *resource;
    CleanupFunc cleanup;
} ResourceGuard;

#define RESOURCE_GUARD_INIT(guard, res, cleanup_func) \\
    do { \\
        (guard)->resource = res; \\
        (guard)->cleanup = cleanup_func; \\
    } while (0)

#define RESOURCE_GUARD_CLEANUP(guard) \\
    do { \\
        if ((guard)->resource && (guard)->cleanup) { \\
            (guard)->cleanup((guard)->resource); \\
            (guard)->resource = NULL; \\
        } \\
    } while (0)

// Automatic cleanup macro
#define WITH_RESOURCE(resource_decl, cleanup_func) \\
    for (int __with_resource_flag = 1; __with_resource_flag; __with_resource_flag = 0, cleanup_func)

// File resource example
void file_cleanup(FILE *file) {
    if (file) fclose(file);
}

void process_file(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) return;

    // File automatically closed when scope exits
    WITH_RESOURCE(file, file_cleanup(file)) {
        char buffer[256];
        while (fgets(buffer, sizeof(buffer), file)) {
            printf("%s", buffer);
        }
    }
}

// Multiple resources
void complex_operation(void) {
    FILE *input = fopen("input.txt", "r");
    FILE *output = fopen("output.txt", "w");
    void *buffer = malloc(1024);

    if (!input || !output || !buffer) {
        // Cleanup on error
        if (input) fclose(input);
        if (output) fclose(output);
        free(buffer);
        return;
    }

    // Process with multiple resources
    WITH_RESOURCE(input, file_cleanup(input)) {
        WITH_RESOURCE(output, file_cleanup(output)) {
            WITH_RESOURCE(buffer, free(buffer)) {
                // Use resources safely
                char *buf = buffer;
                size_t bytes_read;
                while ((bytes_read = fread(buf, 1, 256, input)) > 0) {
                    fwrite(buf, 1, bytes_read, output);
                }
            }
        }
    }
}
\`\`\`

## Code Generation and Metaprogramming

### Template-like Code Generation
\`\`\`c
// Generic container generator
#define DEFINE_VECTOR(type, prefix) \\
typedef struct { \\
    type *data; \\
    size_t size; \\
    size_t capacity; \\
} prefix##_vector_t; \\
\\
static inline void prefix##_vector_init(prefix##_vector_t *vec) { \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
} \\
\\
static inline void prefix##_vector_push(prefix##_vector_t *vec, type value) { \\
    if (vec->size >= vec->capacity) { \\
        vec->capacity = vec->capacity ? vec->capacity * 2 : 8; \\
        vec->data = realloc(vec->data, vec->capacity * sizeof(type)); \\
    } \\
    vec->data[vec->size++] = value; \\
} \\
\\
static inline type prefix##_vector_get(const prefix##_vector_t *vec, size_t index) { \\
    return vec->data[index]; \\
} \\
\\
static inline void prefix##_vector_free(prefix##_vector_t *vec) { \\
    free(vec->data); \\
    vec->data = NULL; \\
    vec->size = 0; \\
    vec->capacity = 0; \\
}

// Instantiate for specific types
DEFINE_VECTOR(int, int)
DEFINE_VECTOR(double, double)
DEFINE_VECTOR(char *, string)

// Usage
int main() {
    int_vector_t int_vec;
    int_vector_init(&int_vec);

    int_vector_push(&int_vec, 10);
    int_vector_push(&int_vec, 20);

    printf("First element: %d\\n", int_vector_get(&int_vec, 0));

    int_vector_free(&int_vec);

    return 0;
}
\`\`\`

## Configuration Management

### Configuration File Parser
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Configuration entry
typedef struct {
    char *key;
    char *value;
} ConfigEntry;

// Configuration structure
typedef struct {
    ConfigEntry *entries;
    size_t count;
    size_t capacity;
} Configuration;

void config_init(Configuration *config) {
    config->entries = NULL;
    config->count = 0;
    config->capacity = 0;
}

void config_destroy(Configuration *config) {
    for (size_t i = 0; i < config->count; i++) {
        free(config->entries[i].key);
        free(config->entries[i].value);
    }
    free(config->entries);
}

int config_load(Configuration *config, const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) return -1;

    char line[256];
    while (fgets(line, sizeof(line), file)) {
        // Skip comments and empty lines
        if (line[0] == '#' || line[0] == '\\n') continue;

        // Find key-value separator
        char *separator = strchr(line, '=');
        if (!separator) continue;

        *separator = '\\0';
        char *key = line;
        char *value = separator + 1;

        // Trim whitespace
        while (isspace(*key)) key++;
        char *key_end = key + strlen(key) - 1;
        while (key_end > key && isspace(*key_end)) *key_end-- = '\\0';

        while (isspace(*value)) value++;
        char *value_end = value + strlen(value) - 1;
        while (value_end > value && isspace(*value_end)) *value_end-- = '\\0';

        // Add entry
        if (config->count >= config->capacity) {
            config->capacity = config->capacity ? config->capacity * 2 : 8;
            config->entries = realloc(config->entries,
                                    config->capacity * sizeof(ConfigEntry));
        }

        config->entries[config->count].key = strdup(key);
        config->entries[config->count].value = strdup(value);
        config->count++;
    }

    fclose(file);
    return 0;
}

const char *config_get(const Configuration *config, const char *key) {
    for (size_t i = 0; i < config->count; i++) {
        if (strcmp(config->entries[i].key, key) == 0) {
            return config->entries[i].value;
        }
    }
    return NULL;
}

// Usage
int main() {
    Configuration config;
    config_init(&config);

    if (config_load(&config, "config.ini") == 0) {
        const char *port = config_get(&config, "port");
        const char *debug = config_get(&config, "debug");

        printf("Port: %s\\n", port ? port : "default");
        printf("Debug: %s\\n", debug ? debug : "false");
    }

    config_destroy(&config);
    return 0;
}
\`\`\`

Good code organization in C involves modular design, clear interfaces, proper error handling, and resource management. These practices lead to maintainable, reusable, and robust C programs.`
};

