import { Exercise } from '../../../../data/lessonsData';

export const exercise_10_8: Exercise = {
  id: "10.8",
  title: 'Advanced Data Structures Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "bst",
      question: `## Binary Search Tree Operations

Implement a Binary Search Tree with the following operations:
- Insert a node
- Search for a value
- Delete a node (handle all cases)
- In-order traversal

**Example Usage:**
\`\`\`c
// Create BST and perform operations
TreeNode* root = NULL;
root = insert(root, 50);
root = insert(root, 30);
root = insert(root, 70);
root = insert(root, 20);
root = insert(root, 40);

printf("Inorder traversal: ");
inorder_traversal(root);  // Should print: 20 30 40 50 70
printf("\\n");

printf("Search 40: %s\\n", search(root, 40) ? "Found" : "Not found");
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* create_node(int data) {
    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    if (node == NULL) return NULL;

    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

TreeNode* insert(TreeNode* root, int data) {
    if (root == NULL) {
        return create_node(data);
    }

    if (data < root->data) {
        root->left = insert(root->left, data);
    } else if (data > root->data) {
        root->right = insert(root->right, data);
    }

    return root;
}

bool search(TreeNode* root, int data) {
    if (root == NULL) return false;

    if (data == root->data) return true;
    else if (data < root->data) return search(root->left, data);
    else return search(root->right, data);
}

TreeNode* find_min(TreeNode* node) {
    while (node->left != NULL) {
        node = node->left;
    }
    return node;
}

TreeNode* delete_node(TreeNode* root, int data) {
    if (root == NULL) return root;

    if (data < root->data) {
        root->left = delete_node(root->left, data);
    } else if (data > root->data) {
        root->right = delete_node(root->right, data);
    } else {
        // Node with only one child or no child
        if (root->left == NULL) {
            TreeNode* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            TreeNode* temp = root->left;
            free(root);
            return temp;
        }

        // Node with two children: Get the inorder successor
        TreeNode* temp = find_min(root->right);
        root->data = temp->data;
        root->right = delete_node(root->right, temp->data);
    }

    return root;
}

void inorder_traversal(TreeNode* root) {
    if (root != NULL) {
        inorder_traversal(root->left);
        printf("%d ", root->data);
        inorder_traversal(root->right);
    }
}

// Example usage
int main() {
    TreeNode* root = NULL;
    root = insert(root, 50);
    root = insert(root, 30);
    root = insert(root, 70);
    root = insert(root, 20);
    root = insert(root, 40);

    printf("Inorder traversal: ");
    inorder_traversal(root);
    printf("\\n");

    printf("Search 40: %s\\n", search(root, 40) ? "Found" : "Not found");

    return 0;
}`
    },
    {
      id: "hashtable",
      question: `## Hash Table with Separate Chaining

Implement a hash table that uses separate chaining for collision resolution.

**Requirements:**
- Support insert, search, and delete operations
- Use a good hash function for strings
- Handle dynamic memory management

**Example Usage:**
\`\`\`c
HashTable* table = hash_create();
hash_insert(table, "apple", 5);
hash_insert(table, "banana", 7);

int value;
if (hash_search(table, "apple", &value)) {
    printf("Found apple: %d\\n", value);
}
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define INITIAL_SIZE 16

typedef struct HashNode {
    char* key;
    int value;
    struct HashNode* next;
} HashNode;

typedef struct {
    HashNode** buckets;
    size_t size;
    size_t capacity;
} HashTable;

// djb2 hash function
unsigned long hash_function(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}

HashTable* hash_create() {
    HashTable* table = (HashTable*)malloc(sizeof(HashTable));
    if (table == NULL) return NULL;

    table->capacity = INITIAL_SIZE;
    table->size = 0;
    table->buckets = (HashNode**)calloc(table->capacity, sizeof(HashNode*));

    if (table->buckets == NULL) {
        free(table);
        return NULL;
    }

    return table;
}

bool hash_insert(HashTable* table, const char* key, int value) {
    if (table == NULL || key == NULL) return false;

    unsigned long hash = hash_function(key);
    size_t index = hash % table->capacity;

    // Check if key already exists
    HashNode* current = table->buckets[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            current->value = value;
            return true;
        }
        current = current->next;
    }

    // Insert new key-value pair
    HashNode* new_node = (HashNode*)malloc(sizeof(HashNode));
    if (new_node == NULL) return false;

    new_node->key = strdup(key);
    if (new_node->key == NULL) {
        free(new_node);
        return false;
    }

    new_node->value = value;
    new_node->next = table->buckets[index];
    table->buckets[index] = new_node;
    table->size++;

    return true;
}

bool hash_search(HashTable* table, const char* key, int* value) {
    if (table == NULL || key == NULL || value == NULL) return false;

    unsigned long hash = hash_function(key);
    size_t index = hash % table->capacity;

    HashNode* current = table->buckets[index];
    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            *value = current->value;
            return true;
        }
        current = current->next;
    }

    return false;
}

bool hash_delete(HashTable* table, const char* key) {
    if (table == NULL || key == NULL) return false;

    unsigned long hash = hash_function(key);
    size_t index = hash % table->capacity;

    HashNode* current = table->buckets[index];
    HashNode* prev = NULL;

    while (current != NULL) {
        if (strcmp(current->key, key) == 0) {
            if (prev == NULL) {
                table->buckets[index] = current->next;
            } else {
                prev->next = current->next;
            }

            free(current->key);
            free(current);
            table->size--;
            return true;
        }

        prev = current;
        current = current->next;
    }

    return false;
}

void hash_destroy(HashTable* table) {
    if (table == NULL) return;

    for (size_t i = 0; i < table->capacity; i++) {
        HashNode* current = table->buckets[i];
        while (current != NULL) {
            HashNode* temp = current;
            current = current->next;
            free(temp->key);
            free(temp);
        }
    }

    free(table->buckets);
    free(table);
}

// Example usage
int main() {
    HashTable* table = hash_create();
    if (table == NULL) return 1;

    hash_insert(table, "apple", 5);
    hash_insert(table, "banana", 7);
    hash_insert(table, "cherry", 10);

    int value;
    if (hash_search(table, "apple", &value)) {
        printf("Found apple: %d\\n", value);
    }

    hash_delete(table, "banana");

    if (!hash_search(table, "banana", &value)) {
        printf("Banana successfully deleted\\n");
    }

    hash_destroy(table);
    return 0;
}`
    },
    {
      id: "graph_bfs",
      question: `## Graph BFS Implementation

Implement Breadth-First Search (BFS) for a graph using adjacency list representation.

**Requirements:**
- Find shortest path distances from a source vertex
- Handle disconnected graphs
- Use iterative implementation with queue

**Example Usage:**
\`\`\`c
// Create graph with 5 vertices
Graph* graph = graph_create(5);
// Add edges...
int distances[5];
bfs(graph, 0, distances);
// distances array will contain shortest path distances from vertex 0
\`\`\``,
      solution: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

// Adjacency List representation
typedef struct AdjListNode {
    int dest;
    struct AdjListNode* next;
} AdjListNode;

typedef struct AdjList {
    AdjListNode* head;
} AdjList;

typedef struct Graph {
    int vertices;
    AdjList* array;
} Graph;

AdjListNode* new_adj_list_node(int dest) {
    AdjListNode* new_node = (AdjListNode*)malloc(sizeof(AdjListNode));
    new_node->dest = dest;
    new_node->next = NULL;
    return new_node;
}

Graph* graph_create(int vertices) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    graph->vertices = vertices;

    graph->array = (AdjList*)malloc(vertices * sizeof(AdjList));

    for (int i = 0; i < vertices; i++) {
        graph->array[i].head = NULL;
    }

    return graph;
}

void graph_add_edge(Graph* graph, int src, int dest) {
    // Add edge from src to dest
    AdjListNode* new_node = new_adj_list_node(dest);
    new_node->next = graph->array[src].head;
    graph->array[src].head = new_node;

    // Add edge from dest to src (undirected graph)
    new_node = new_adj_list_node(src);
    new_node->next = graph->array[dest].head;
    graph->array[dest].head = new_node;
}

void bfs(Graph* graph, int start_vertex, int* distances) {
    // Initialize distances
    for (int i = 0; i < graph->vertices; i++) {
        distances[i] = INT_MAX;
    }
    distances[start_vertex] = 0;

    // Create visited array
    bool* visited = (bool*)calloc(graph->vertices, sizeof(bool));

    // Create queue
    int* queue = (int*)malloc(graph->vertices * sizeof(int));
    int front = 0, rear = 0;

    // Enqueue start vertex
    visited[start_vertex] = true;
    queue[rear++] = start_vertex;

    while (front < rear) {
        int current_vertex = queue[front++];

        // Traverse all adjacent vertices
        AdjListNode* adj_list = graph->array[current_vertex].head;
        while (adj_list != NULL) {
            int adj_vertex = adj_list->dest;

            if (!visited[adj_vertex]) {
                visited[adj_vertex] = true;
                distances[adj_vertex] = distances[current_vertex] + 1;
                queue[rear++] = adj_vertex;
            }

            adj_list = adj_list->next;
        }
    }

    free(visited);
    free(queue);
}

// Example usage
int main() {
    int vertices = 5;
    Graph* graph = graph_create(vertices);

    graph_add_edge(graph, 0, 1);
    graph_add_edge(graph, 0, 4);
    graph_add_edge(graph, 1, 2);
    graph_add_edge(graph, 1, 3);
    graph_add_edge(graph, 1, 4);
    graph_add_edge(graph, 2, 3);
    graph_add_edge(graph, 3, 4);

    int* distances = (int*)malloc(vertices * sizeof(int));
    bfs(graph, 0, distances);

    printf("Shortest distances from vertex 0:\\n");
    for (int i = 0; i < vertices; i++) {
        if (distances[i] == INT_MAX) {
            printf("Vertex %d: Unreachable\\n", i);
        } else {
            printf("Vertex %d: %d\\n", i, distances[i]);
        }
    }

    free(distances);
    // Note: Graph destruction not implemented for brevity
    return 0;
}`
    }
  ]
};