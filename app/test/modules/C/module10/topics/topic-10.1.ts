import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_1: SubLesson = {
  id: "10.1",
  title: 'Advanced Data Structures',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔗 Advanced Data Structures in C

Data structures are fundamental to efficient programming. Advanced structures like linked lists, stacks, and queues provide dynamic storage with specific access patterns, enabling sophisticated algorithms and applications.

---

## 📋 What are Advanced Data Structures?

**Advanced data structures organize and store data efficiently for specific operations.** Unlike arrays, these structures can grow/shrink dynamically and provide specialized access patterns:

- **Linked Lists**: Dynamic sequential storage with flexible insertion/deletion
- **Stacks**: Last-In-First-Out (LIFO) access pattern
- **Queues**: First-In-First-Out (FIFO) access pattern
- **Trees**: Hierarchical data organization
- **Graphs**: Complex relationship modeling

---

## 🔗 Linked Lists

### **What is a Linked List?**

A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence.

### **Node Structure**

\`\`\`c
typedef struct Node {
    int data;           // Data stored in the node
    struct Node *next;  // Pointer to next node
} Node;
\`\`\`

### **Basic Linked List Operations**

#### **Creating a Node**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Function to create a new node
Node* create_node(int data) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Memory allocation failed!\\n");
        return NULL;
    }

    new_node->data = data;
    new_node->next = NULL;
    return new_node;
}
\`\`\`

#### **Inserting at Beginning**

\`\`\`c
// Insert at the beginning of the list
void insert_at_beginning(Node **head, int data) {
    Node *new_node = create_node(data);
    if (new_node == NULL) return;

    new_node->next = *head;
    *head = new_node;
}
\`\`\`

#### **Inserting at End**

\`\`\`c
// Insert at the end of the list
void insert_at_end(Node **head, int data) {
    Node *new_node = create_node(data);
    if (new_node == NULL) return;

    if (*head == NULL) {
        *head = new_node;
        return;
    }

    Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = new_node;
}
\`\`\`

#### **Deleting a Node**

\`\`\`c
// Delete a node with specific value
void delete_node(Node **head, int key) {
    if (*head == NULL) return;

    Node *current = *head;
    Node *prev = NULL;

    // If head node contains the key
    if (current != NULL && current->data == key) {
        *head = current->next;
        free(current);
        return;
    }

    // Search for the key
    while (current != NULL && current->data != key) {
        prev = current;
        current = current->next;
    }

    // If key not found
    if (current == NULL) return;

    // Unlink and free
    prev->next = current->next;
    free(current);
}
\`\`\`

#### **Traversing the List**

\`\`\`c
// Print all elements in the list
void print_list(Node *head) {
    Node *current = head;

    printf("Linked List: ");
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}
\`\`\`

### **Complete Linked List Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node* create_node(int data) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Memory allocation failed!\\n");
        return NULL;
    }
    new_node->data = data;
    new_node->next = NULL;
    return new_node;
}

void insert_at_end(Node **head, int data) {
    Node *new_node = create_node(data);
    if (new_node == NULL) return;

    if (*head == NULL) {
        *head = new_node;
        return;
    }

    Node *current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = new_node;
}

void print_list(Node *head) {
    Node *current = head;
    printf("List: ");
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

void free_list(Node *head) {
    Node *current = head;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
}

int main() {
    Node *head = NULL;

    // Insert elements
    insert_at_end(&head, 10);
    insert_at_end(&head, 20);
    insert_at_end(&head, 30);
    insert_at_end(&head, 40);

    print_list(head);

    free_list(head);

    return 0;
}
\`\`\`

---

## 📚 Stack (LIFO Structure)

### **What is a Stack?**

A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are added and removed from the same end (top).

### **Stack Operations**

1. **Push**: Add element to top
2. **Pop**: Remove element from top
3. **Peek/Top**: View top element without removing
4. **IsEmpty**: Check if stack is empty

### **Stack Implementation using Array**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;

// Initialize stack
void init_stack(Stack *stack) {
    stack->top = -1;
}

// Check if stack is empty
bool is_empty(Stack *stack) {
    return stack->top == -1;
}

// Check if stack is full
bool is_full(Stack *stack) {
    return stack->top == MAX_SIZE - 1;
}

// Push element onto stack
bool push(Stack *stack, int value) {
    if (is_full(stack)) {
        printf("Stack overflow!\\n");
        return false;
    }
    stack->data[++stack->top] = value;
    return true;
}

// Pop element from stack
bool pop(Stack *stack, int *value) {
    if (is_empty(stack)) {
        printf("Stack underflow!\\n");
        return false;
    }
    *value = stack->data[stack->top--];
    return true;
}

// Peek at top element
bool peek(Stack *stack, int *value) {
    if (is_empty(stack)) {
        return false;
    }
    *value = stack->data[stack->top];
    return true;
}

// Print stack
void print_stack(Stack *stack) {
    if (is_empty(stack)) {
        printf("Stack is empty\\n");
        return;
    }

    printf("Stack (top to bottom): ");
    for (int i = stack->top; i >= 0; i--) {
        printf("%d ", stack->data[i]);
    }
    printf("\\n");
}

int main() {
    Stack stack;
    init_stack(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    print_stack(&stack);

    int value;
    if (pop(&stack, &value)) {
        printf("Popped: %d\\n", value);
    }

    print_stack(&stack);

    return 0;
}
\`\`\`

### **Stack Implementation using Linked List**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *top;
} Stack;

// Initialize stack
void init_stack(Stack *stack) {
    stack->top = NULL;
}

// Check if stack is empty
bool is_empty(Stack *stack) {
    return stack->top == NULL;
}

// Push element onto stack
void push(Stack *stack, int value) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    new_node->data = value;
    new_node->next = stack->top;
    stack->top = new_node;
}

// Pop element from stack
bool pop(Stack *stack, int *value) {
    if (is_empty(stack)) {
        printf("Stack underflow!\\n");
        return false;
    }

    Node *temp = stack->top;
    *value = temp->data;
    stack->top = temp->next;
    free(temp);
    return true;
}

// Peek at top element
bool peek(Stack *stack, int *value) {
    if (is_empty(stack)) {
        return false;
    }
    *value = stack->top->data;
    return true;
}

// Print stack
void print_stack(Stack *stack) {
    if (is_empty(stack)) {
        printf("Stack is empty\\n");
        return;
    }

    printf("Stack (top to bottom): ");
    Node *current = stack->top;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

// Free stack memory
void free_stack(Stack *stack) {
    Node *current = stack->top;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
    stack->top = NULL;
}

int main() {
    Stack stack;
    init_stack(&stack);

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    print_stack(&stack);

    int value;
    if (pop(&stack, &value)) {
        printf("Popped: %d\\n", value);
    }

    print_stack(&stack);

    free_stack(&stack);

    return 0;
}
\`\`\`

---

## 🏭 Queue (FIFO Structure)

### **What is a Queue?**

A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear and removed from the front.

### **Queue Operations**

1. **Enqueue**: Add element to rear
2. **Dequeue**: Remove element from front
3. **Front/Peek**: View front element without removing
4. **IsEmpty**: Check if queue is empty
5. **IsFull**: Check if queue is full

### **Queue Implementation using Array**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 100

typedef struct {
    int data[MAX_SIZE];
    int front;
    int rear;
    int size;
} Queue;

// Initialize queue
void init_queue(Queue *queue) {
    queue->front = 0;
    queue->rear = -1;
    queue->size = 0;
}

// Check if queue is empty
bool is_empty(Queue *queue) {
    return queue->size == 0;
}

// Check if queue is full
bool is_full(Queue *queue) {
    return queue->size == MAX_SIZE;
}

// Add element to queue
bool enqueue(Queue *queue, int value) {
    if (is_full(queue)) {
        printf("Queue overflow!\\n");
        return false;
    }

    queue->rear = (queue->rear + 1) % MAX_SIZE;
    queue->data[queue->rear] = value;
    queue->size++;
    return true;
}

// Remove element from queue
bool dequeue(Queue *queue, int *value) {
    if (is_empty(queue)) {
        printf("Queue underflow!\\n");
        return false;
    }

    *value = queue->data[queue->front];
    queue->front = (queue->front + 1) % MAX_SIZE;
    queue->size--;
    return true;
}

// Peek at front element
bool peek(Queue *queue, int *value) {
    if (is_empty(queue)) {
        return false;
    }
    *value = queue->data[queue->front];
    return true;
}

// Print queue
void print_queue(Queue *queue) {
    if (is_empty(queue)) {
        printf("Queue is empty\\n");
        return;
    }

    printf("Queue (front to rear): ");
    int i = queue->front;
    for (int count = 0; count < queue->size; count++) {
        printf("%d ", queue->data[i]);
        i = (i + 1) % MAX_SIZE;
    }
    printf("\\n");
}

int main() {
    Queue queue;
    init_queue(&queue);

    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);

    print_queue(&queue);

    int value;
    if (dequeue(&queue, &value)) {
        printf("Dequeued: %d\\n", value);
    }

    print_queue(&queue);

    return 0;
}
\`\`\`

### **Queue Implementation using Linked List**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *front;
    Node *rear;
} Queue;

// Initialize queue
void init_queue(Queue *queue) {
    queue->front = NULL;
    queue->rear = NULL;
}

// Check if queue is empty
bool is_empty(Queue *queue) {
    return queue->front == NULL;
}

// Add element to queue
void enqueue(Queue *queue, int value) {
    Node *new_node = (Node*)malloc(sizeof(Node));
    if (new_node == NULL) {
        printf("Memory allocation failed!\\n");
        return;
    }

    new_node->data = value;
    new_node->next = NULL;

    if (is_empty(queue)) {
        queue->front = queue->rear = new_node;
    } else {
        queue->rear->next = new_node;
        queue->rear = new_node;
    }
}

// Remove element from queue
bool dequeue(Queue *queue, int *value) {
    if (is_empty(queue)) {
        printf("Queue underflow!\\n");
        return false;
    }

    Node *temp = queue->front;
    *value = temp->data;
    queue->front = temp->next;

    if (queue->front == NULL) {
        queue->rear = NULL;
    }

    free(temp);
    return true;
}

// Peek at front element
bool peek(Queue *queue, int *value) {
    if (is_empty(queue)) {
        return false;
    }
    *value = queue->front->data;
    return true;
}

// Print queue
void print_queue(Queue *queue) {
    if (is_empty(queue)) {
        printf("Queue is empty\\n");
        return;
    }

    printf("Queue (front to rear): ");
    Node *current = queue->front;
    while (current != NULL) {
        printf("%d ", current->data);
        current = current->next;
    }
    printf("\\n");
}

// Free queue memory
void free_queue(Queue *queue) {
    Node *current = queue->front;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
    queue->front = queue->rear = NULL;
}

int main() {
    Queue queue;
    init_queue(&queue);

    enqueue(&queue, 10);
    enqueue(&queue, 20);
    enqueue(&queue, 30);

    print_queue(&queue);

    int value;
    if (dequeue(&queue, &value)) {
        printf("Dequeued: %d\\n", value);
    }

    print_queue(&queue);

    free_queue(&queue);

    return 0;
}
\`\`\`

---

## 🌳 Binary Trees (Introduction)

### **What is a Binary Tree?**

A binary tree is a hierarchical data structure where each node has at most two children (left and right).

### **Binary Tree Node Structure**

\`\`\`c
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;
\`\`\`

### **Basic Tree Operations**

#### **Creating a Tree Node**

\`\`\`c
TreeNode* create_node(int data) {
    TreeNode *new_node = (TreeNode*)malloc(sizeof(TreeNode));
    if (new_node == NULL) {
        printf("Memory allocation failed!\\n");
        return NULL;
    }

    new_node->data = data;
    new_node->left = NULL;
    new_node->right = NULL;
    return new_node;
}
\`\`\`

#### **Tree Traversals**

\`\`\`c
// In-order traversal (Left, Root, Right)
void inorder_traversal(TreeNode *root) {
    if (root != NULL) {
        inorder_traversal(root->left);
        printf("%d ", root->data);
        inorder_traversal(root->right);
    }
}

// Pre-order traversal (Root, Left, Right)
void preorder_traversal(TreeNode *root) {
    if (root != NULL) {
        printf("%d ", root->data);
        preorder_traversal(root->left);
        preorder_traversal(root->right);
    }
}

// Post-order traversal (Left, Right, Root)
void postorder_traversal(TreeNode *root) {
    if (root != NULL) {
        postorder_traversal(root->left);
        postorder_traversal(root->right);
        printf("%d ", root->data);
    }
}
\`\`\`

#### **Inserting into Binary Search Tree**

\`\`\`c
TreeNode* insert_bst(TreeNode *root, int data) {
    if (root == NULL) {
        return create_node(data);
    }

    if (data < root->data) {
        root->left = insert_bst(root->left, data);
    } else if (data > root->data) {
        root->right = insert_bst(root->right, data);
    }

    return root;
}
\`\`\`

### **Complete Binary Tree Example**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* create_node(int data) {
    TreeNode *new_node = (TreeNode*)malloc(sizeof(TreeNode));
    if (new_node == NULL) return NULL;

    new_node->data = data;
    new_node->left = NULL;
    new_node->right = NULL;
    return new_node;
}

void inorder_traversal(TreeNode *root) {
    if (root != NULL) {
        inorder_traversal(root->left);
        printf("%d ", root->data);
        inorder_traversal(root->right);
    }
}

TreeNode* insert_bst(TreeNode *root, int data) {
    if (root == NULL) {
        return create_node(data);
    }

    if (data < root->data) {
        root->left = insert_bst(root->left, data);
    } else if (data > root->data) {
        root->right = insert_bst(root->right, data);
    }

    return root;
}

void free_tree(TreeNode *root) {
    if (root != NULL) {
        free_tree(root->left);
        free_tree(root->right);
        free(root);
    }
}

int main() {
    TreeNode *root = NULL;

    // Insert elements into BST
    root = insert_bst(root, 50);
    root = insert_bst(root, 30);
    root = insert_bst(root, 70);
    root = insert_bst(root, 20);
    root = insert_bst(root, 40);
    root = insert_bst(root, 60);
    root = insert_bst(root, 80);

    printf("In-order traversal: ");
    inorder_traversal(root);
    printf("\\n");

    free_tree(root);

    return 0;
}
\`\`\`

---

## 🎯 Practical Applications

### **Example 1: Browser History (Stack)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_PAGES 100

typedef struct {
    char pages[MAX_PAGES][100];
    int top;
} BrowserHistory;

void init_history(BrowserHistory *history) {
    history->top = -1;
}

bool visit_page(BrowserHistory *history, const char *url) {
    if (history->top >= MAX_PAGES - 1) {
        printf("History full!\\n");
        return false;
    }

    strcpy(history->pages[++history->top], url);
    return true;
}

bool go_back(BrowserHistory *history, char *current_page) {
    if (history->top <= 0) {
        printf("No previous page!\\n");
        return false;
    }

    strcpy(current_page, history->pages[--history->top]);
    return true;
}

void print_history(BrowserHistory *history) {
    printf("Browser History (most recent first):\\n");
    for (int i = history->top; i >= 0; i--) {
        printf("%d. %s\\n", history->top - i + 1, history->pages[i]);
    }
}

int main() {
    BrowserHistory history;
    init_history(&history);

    visit_page(&history, "google.com");
    visit_page(&history, "stackoverflow.com");
    visit_page(&history, "github.com");

    print_history(&history);

    char current[100];
    if (go_back(&history, current)) {
        printf("Went back to: %s\\n", current);
    }

    return 0;
}
\`\`\`

### **Example 2: Print Queue (Queue)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_JOBS 50

typedef struct {
    char jobs[MAX_JOBS][100];
    int front;
    int rear;
    int size;
} PrintQueue;

void init_queue(PrintQueue *queue) {
    queue->front = 0;
    queue->rear = -1;
    queue->size = 0;
}

bool add_print_job(PrintQueue *queue, const char *document) {
    if (queue->size >= MAX_JOBS) {
        printf("Print queue full!\\n");
        return false;
    }

    queue->rear = (queue->rear + 1) % MAX_JOBS;
    strcpy(queue->jobs[queue->rear], document);
    queue->size++;
    return true;
}

bool process_print_job(PrintQueue *queue, char *document) {
    if (queue->size == 0) {
        printf("No print jobs in queue!\\n");
        return false;
    }

    strcpy(document, queue->jobs[queue->front]);
    queue->front = (queue->front + 1) % MAX_JOBS;
    queue->size--;
    return true;
}

void print_queue_status(PrintQueue *queue) {
    printf("Print Queue Status:\\n");
    printf("Jobs in queue: %d\\n", queue->size);

    if (queue->size > 0) {
        printf("Next job: %s\\n", queue->jobs[queue->front]);
    }
}

int main() {
    PrintQueue queue;
    init_queue(&queue);

    add_print_job(&queue, "report.pdf");
    add_print_job(&queue, "presentation.pptx");
    add_print_job(&queue, "resume.docx");

    print_queue_status(&queue);

    char document[100];
    if (process_print_job(&queue, document)) {
        printf("Printing: %s\\n", document);
    }

    print_queue_status(&queue);

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Linked Lists** provide dynamic sequential storage with efficient insertions/deletions
2. **Stacks** implement LIFO behavior, useful for undo operations, function calls
3. **Queues** implement FIFO behavior, essential for scheduling, breadth-first search
4. **Trees** organize hierarchical data, enable fast searching with BSTs
5. **Choose the right structure** based on your access patterns and requirements
6. **Memory management** is crucial - always free allocated memory
7. **Error handling** prevents crashes and undefined behavior

Master these advanced data structures to solve complex programming problems! 🔗📚✨`;

    return contentString;
  })()
};
