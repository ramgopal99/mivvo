import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_4: SubLesson = {
  id: "10.4",
  title: 'Graph Algorithms',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🕸️ Graph Algorithms in C

Graphs model relationships between objects and are fundamental to many algorithms. This lesson covers graph representations and essential traversal/search algorithms.

---

## 📊 Graph Representations

### **Adjacency Matrix**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct {
    int vertices;
    bool adj_matrix[MAX_VERTICES][MAX_VERTICES];
} GraphMatrix;

GraphMatrix* create_graph_matrix(int vertices) {
    GraphMatrix *graph = (GraphMatrix*)malloc(sizeof(GraphMatrix));
    graph->vertices = vertices;

    // Initialize all edges to false
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            graph->adj_matrix[i][j] = false;
        }
    }

    return graph;
}

void add_edge_matrix(GraphMatrix *graph, int src, int dest) {
    if (src >= 0 && src < graph->vertices &&
        dest >= 0 && dest < graph->vertices) {
        graph->adj_matrix[src][dest] = true;
        // For undirected graph, add reverse edge
        graph->adj_matrix[dest][src] = true;
    }
}

void print_matrix(GraphMatrix *graph) {
    printf("Adjacency Matrix:\\n");
    printf("  ");
    for (int i = 0; i < graph->vertices; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    for (int i = 0; i < graph->vertices; i++) {
        printf("%d ", i);
        for (int j = 0; j < graph->vertices; j++) {
            printf("%d ", graph->adj_matrix[i][j] ? 1 : 0);
        }
        printf("\\n");
    }
}
\`\`\`

### **Adjacency List**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int vertex;
    struct Node *next;
} Node;

typedef struct {
    int vertices;
    Node **adj_list;
} GraphList;

GraphList* create_graph_list(int vertices) {
    GraphList *graph = (GraphList*)malloc(sizeof(GraphList));
    graph->vertices = vertices;

    graph->adj_list = (Node**)malloc(vertices * sizeof(Node*));

    for (int i = 0; i < vertices; i++) {
        graph->adj_list[i] = NULL;
    }

    return graph;
}

Node* create_node(int vertex) {
    Node *node = (Node*)malloc(sizeof(Node));
    node->vertex = vertex;
    node->next = NULL;
    return node;
}

void add_edge_list(GraphList *graph, int src, int dest) {
    // Add edge from src to dest
    Node *node = create_node(dest);
    node->next = graph->adj_list[src];
    graph->adj_list[src] = node;

    // For undirected graph, add reverse edge
    node = create_node(src);
    node->next = graph->adj_list[dest];
    graph->adj_list[dest] = node;
}

void print_list(GraphList *graph) {
    printf("Adjacency List:\\n");
    for (int i = 0; i < graph->vertices; i++) {
        printf("%d: ", i);
        Node *current = graph->adj_list[i];
        while (current != NULL) {
            printf("%d ", current->vertex);
            current = current->next;
        }
        printf("\\n");
    }
}

void free_graph_list(GraphList *graph) {
    for (int i = 0; i < graph->vertices; i++) {
        Node *current = graph->adj_list[i];
        while (current != NULL) {
            Node *temp = current;
            current = current->next;
            free(temp);
        }
    }
    free(graph->adj_list);
    free(graph);
}
\`\`\`

---

## 🔍 Breadth-First Search (BFS)

### **BFS Algorithm**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_QUEUE 100

typedef struct {
    int items[MAX_QUEUE];
    int front;
    int rear;
} Queue;

void init_queue(Queue *q) {
    q->front = -1;
    q->rear = -1;
}

bool is_empty(Queue *q) {
    return q->front == -1;
}

void enqueue(Queue *q, int value) {
    if (q->rear == MAX_QUEUE - 1) return;

    if (q->front == -1) q->front = 0;
    q->items[++q->rear] = value;
}

int dequeue(Queue *q) {
    if (is_empty(q)) return -1;

    int item = q->items[q->front];

    if (q->front == q->rear) {
        q->front = q->rear = -1;
    } else {
        q->front++;
    }

    return item;
}

void bfs(GraphList *graph, int start_vertex) {
    bool visited[MAX_VERTICES] = {false};
    Queue queue;
    init_queue(&queue);

    visited[start_vertex] = true;
    enqueue(&queue, start_vertex);

    printf("BFS Traversal: ");

    while (!is_empty(&queue)) {
        int current = dequeue(&queue);
        printf("%d ", current);

        // Visit all adjacent vertices
        Node *adj = graph->adj_list[current];
        while (adj != NULL) {
            int neighbor = adj->vertex;
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                enqueue(&queue, neighbor);
            }
            adj = adj->next;
        }
    }

    printf("\\n");
}
\`\`\`

### **BFS Applications**

#### **Shortest Path in Unweighted Graph**

\`\`\`c
#include <stdio.h>
#include <limits.h>

void shortest_path(GraphList *graph, int start, int target) {
    int distances[MAX_VERTICES];
    int parents[MAX_VERTICES];
    bool visited[MAX_VERTICES] = {false};

    // Initialize
    for (int i = 0; i < graph->vertices; i++) {
        distances[i] = INT_MAX;
        parents[i] = -1;
    }

    Queue queue;
    init_queue(&queue);

    distances[start] = 0;
    visited[start] = true;
    enqueue(&queue, start);

    while (!is_empty(&queue)) {
        int current = dequeue(&queue);

        Node *adj = graph->adj_list[current];
        while (adj != NULL) {
            int neighbor = adj->vertex;

            if (!visited[neighbor]) {
                visited[neighbor] = true;
                distances[neighbor] = distances[current] + 1;
                parents[neighbor] = current;
                enqueue(&queue, neighbor);

                if (neighbor == target) {
                    // Found target, reconstruct path
                    printf("Shortest path from %d to %d: ", start, target);
                    int path[MAX_VERTICES];
                    int path_length = 0;

                    for (int v = target; v != -1; v = parents[v]) {
                        path[path_length++] = v;
                    }

                    for (int i = path_length - 1; i >= 0; i--) {
                        printf("%d ", path[i]);
                    }
                    printf("\\nDistance: %d\\n", distances[target]);
                    return;
                }
            }

            adj = adj->next;
        }
    }

    printf("No path found from %d to %d\\n", start, target);
}
\`\`\`

---

## 🌳 Depth-First Search (DFS)

### **Recursive DFS**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define MAX_VERTICES 100

bool visited[MAX_VERTICES];

void dfs_recursive(GraphList *graph, int vertex) {
    visited[vertex] = true;
    printf("%d ", vertex);

    Node *adj = graph->adj_list[vertex];
    while (adj != NULL) {
        int neighbor = adj->vertex;
        if (!visited[neighbor]) {
            dfs_recursive(graph, neighbor);
        }
        adj = adj->next;
    }
}

void dfs(GraphList *graph, int start_vertex) {
    // Reset visited array
    for (int i = 0; i < graph->vertices; i++) {
        visited[i] = false;
    }

    printf("DFS Traversal: ");
    dfs_recursive(graph, start_vertex);

    // Check for disconnected components
    for (int i = 0; i < graph->vertices; i++) {
        if (!visited[i]) {
            printf("\\nDisconnected component: ");
            dfs_recursive(graph, i);
        }
    }

    printf("\\n");
}
\`\`\`

### **Iterative DFS using Stack**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define MAX_STACK 100

typedef struct {
    int items[MAX_STACK];
    int top;
} Stack;

void init_stack(Stack *s) { s->top = -1; }
bool stack_empty(Stack *s) { return s->top == -1; }
void push(Stack *s, int value) { if (s->top < MAX_STACK - 1) s->items[++s->top] = value; }
int pop(Stack *s) { return s->top >= 0 ? s->items[s->top--] : -1; }

void dfs_iterative(GraphList *graph, int start_vertex) {
    bool visited[MAX_VERTICES] = {false};
    Stack stack;
    init_stack(&stack);

    push(&stack, start_vertex);
    visited[start_vertex] = true;

    printf("DFS Traversal: ");

    while (!stack_empty(&stack)) {
        int current = pop(&stack);
        printf("%d ", current);

        // Push unvisited neighbors (in reverse order for correct traversal)
        Node *adj = graph->adj_list[current];
        if (adj != NULL) {
            // Count neighbors first
            int neighbor_count = 0;
            Node *temp = adj;
            while (temp != NULL) {
                neighbor_count++;
                temp = temp->next;
            }

            // Push neighbors in reverse order
            int *neighbors = (int*)malloc(neighbor_count * sizeof(int));
            temp = adj;
            for (int i = neighbor_count - 1; i >= 0; i--) {
                neighbors[i] = temp->vertex;
                temp = temp->next;
            }

            for (int i = 0; i < neighbor_count; i++) {
                if (!visited[neighbors[i]]) {
                    visited[neighbors[i]] = true;
                    push(&stack, neighbors[i]);
                }
            }

            free(neighbors);
        }
    }

    printf("\\n");
}
\`\`\`

---

## 🔍 Topological Sort

### **Kahn's Algorithm**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int vertices;
    Node **adj_list;
    int *indegree;
} GraphTopo;

GraphTopo* create_graph_topo(int vertices) {
    GraphTopo *graph = (GraphTopo*)malloc(sizeof(GraphTopo));
    graph->vertices = vertices;
    graph->adj_list = (Node**)malloc(vertices * sizeof(Node*));
    graph->indegree = (int*)calloc(vertices, sizeof(int));

    for (int i = 0; i < vertices; i++) {
        graph->adj_list[i] = NULL;
    }

    return graph;
}

void add_edge_topo(GraphTopo *graph, int src, int dest) {
    Node *node = create_node(dest);
    node->next = graph->adj_list[src];
    graph->adj_list[src] = node;

    graph->indegree[dest]++;
}

void topological_sort(GraphTopo *graph) {
    Queue queue;
    init_queue(&queue);

    // Enqueue vertices with indegree 0
    for (int i = 0; i < graph->vertices; i++) {
        if (graph->indegree[i] == 0) {
            enqueue(&queue, i);
        }
    }

    int count = 0;
    printf("Topological Sort: ");

    while (!is_empty(&queue)) {
        int current = dequeue(&queue);
        printf("%d ", current);
        count++;

        // Reduce indegree of neighbors
        Node *adj = graph->adj_list[current];
        while (adj != NULL) {
            int neighbor = adj->vertex;
            graph->indegree[neighbor]--;

            if (graph->indegree[neighbor] == 0) {
                enqueue(&queue, neighbor);
            }

            adj = adj->next;
        }
    }

    if (count != graph->vertices) {
        printf("\\nGraph contains cycle!\\n");
    } else {
        printf("\\n");
    }
}
\`\`\`

### **DFS-based Topological Sort**

\`\`\`c
#include <stdio.h>
#include <stdbool.h>

#define MAX_STACK 100

typedef struct {
    int items[MAX_STACK];
    int top;
} StackTopo;

void init_stack_topo(StackTopo *s) { s->top = -1; }
bool stack_empty_topo(StackTopo *s) { return s->top == -1; }
void push_topo(StackTopo *s, int value) { if (s->top < MAX_STACK - 1) s->items[++s->top] = value; }
int pop_topo(StackTopo *s) { return s->top >= 0 ? s->items[s->top--] : -1; }

bool visited_topo[MAX_VERTICES];
bool recursion_stack[MAX_VERTICES];

bool dfs_cycle_detect(GraphList *graph, int vertex, StackTopo *stack) {
    visited_topo[vertex] = true;
    recursion_stack[vertex] = true;

    Node *adj = graph->adj_list[vertex];
    while (adj != NULL) {
        int neighbor = adj->vertex;

        if (!visited_topo[neighbor]) {
            if (dfs_cycle_detect(graph, neighbor, stack)) {
                return true;
            }
        } else if (recursion_stack[neighbor]) {
            return true;  // Cycle detected
        }

        adj = adj->next;
    }

    recursion_stack[vertex] = false;
    push_topo(stack, vertex);
    return false;
}

void topological_sort_dfs(GraphList *graph) {
    StackTopo stack;
    init_stack_topo(&stack);

    for (int i = 0; i < graph->vertices; i++) {
        visited_topo[i] = false;
        recursion_stack[i] = false;
    }

    bool has_cycle = false;
    for (int i = 0; i < graph->vertices; i++) {
        if (!visited_topo[i]) {
            if (dfs_cycle_detect(graph, i, &stack)) {
                has_cycle = true;
                break;
            }
        }
    }

    if (has_cycle) {
        printf("Graph contains cycle - topological sort not possible\\n");
        return;
    }

    printf("Topological Sort (DFS): ");
    while (!stack_empty_topo(&stack)) {
        printf("%d ", pop_topo(&stack));
    }
    printf("\\n");
}
\`\`\`

---

## 🔗 Minimum Spanning Tree

### **Prim's Algorithm**

\`\`\`c
#include <stdio.h>
#include <limits.h>
#include <stdbool.h>

#define INF INT_MAX

int min_key(int key[], bool mst_set[], int vertices) {
    int min = INF, min_index;

    for (int v = 0; v < vertices; v++) {
        if (!mst_set[v] && key[v] < min) {
            min = key[v];
            min_index = v;
        }
    }

    return min_index;
}

void print_mst(int parent[], int graph[MAX_VERTICES][MAX_VERTICES], int vertices) {
    printf("Edge \\tWeight\\n");
    for (int i = 1; i < vertices; i++) {
        printf("%d - %d \\t%d \\n", parent[i], i, graph[i][parent[i]]);
    }
}

void prim_mst(int graph[MAX_VERTICES][MAX_VERTICES], int vertices) {
    int parent[MAX_VERTICES];
    int key[MAX_VERTICES];
    bool mst_set[MAX_VERTICES];

    for (int i = 0; i < vertices; i++) {
        key[i] = INF;
        mst_set[i] = false;
    }

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < vertices - 1; count++) {
        int u = min_key(key, mst_set, vertices);
        mst_set[u] = true;

        for (int v = 0; v < vertices; v++) {
            if (graph[u][v] && !mst_set[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    print_mst(parent, graph, vertices);
}
\`\`\`

---

## 🎯 Practical Applications

### **Social Network Analysis**

\`\`\`c
#include <stdio.h>

void find_friends(GraphList *social_graph, int person, int max_distance) {
    bool visited[MAX_VERTICES] = {false};
    int distance[MAX_VERTICES];

    Queue queue;
    init_queue(&queue);

    visited[person] = true;
    distance[person] = 0;
    enqueue(&queue, person);

    printf("Friends of %d within distance %d:\\n", person, max_distance);

    while (!is_empty(&queue)) {
        int current = dequeue(&queue);

        Node *adj = social_graph->adj_list[current];
        while (adj != NULL) {
            int friend = adj->vertex;

            if (!visited[friend]) {
                visited[friend] = true;
                distance[friend] = distance[current] + 1;

                if (distance[friend] <= max_distance) {
                    printf("  %d (distance: %d)\\n", friend, distance[friend]);
                    enqueue(&queue, friend);
                }
            }

            adj = adj->next;
        }
    }
}
\`\`\`

### **Web Crawler Simulation**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_URL_LENGTH 100

typedef struct {
    char url[MAX_URL_LENGTH];
    bool crawled;
} WebPage;

typedef struct {
    WebPage pages[MAX_VERTICES];
    GraphList *link_graph;
    int page_count;
} WebCrawler;

void add_webpage(WebCrawler *crawler, const char *url) {
    if (crawler->page_count < MAX_VERTICES) {
        strcpy(crawler->pages[crawler->page_count].url, url);
        crawler->pages[crawler->page_count].crawled = false;
        crawler->page_count++;
    }
}

void crawl_web(WebCrawler *crawler, int start_page) {
    Queue queue;
    init_queue(&queue);

    crawler->pages[start_page].crawled = true;
    enqueue(&queue, start_page);

    printf("Crawling web starting from: %s\\n",
           crawler->pages[start_page].url);

    while (!is_empty(&queue)) {
        int current_page = dequeue(&queue);

        printf("Crawling: %s\\n", crawler->pages[current_page].url);

        // Process outgoing links
        Node *links = crawler->link_graph->adj_list[current_page];
        while (links != NULL) {
            int linked_page = links->vertex;

            if (!crawler->pages[linked_page].crawled) {
                crawler->pages[linked_page].crawled = true;
                enqueue(&queue, linked_page);
            }

            links = links->next;
        }
    }
}
\`\`\`

### **Course Prerequisite Checker**

\`\`\`c
void check_prerequisites(GraphTopo *prereq_graph, int target_course) {
    // Use topological sort to find all prerequisites
    bool visited[MAX_VERTICES] = {false};
    StackTopo stack;
    init_stack_topo(&stack);

    // Reset visited array for topological sort
    memset(visited, 0, sizeof(visited));

    // Perform DFS from target course (working backwards)
    dfs_prereq_collect(prereq_graph, target_course, &stack, visited);

    printf("Prerequisites for course %d: ", target_course);
    while (!stack_empty_topo(&stack)) {
        printf("%d ", pop_topo(&stack));
    }
    printf("\\n");
}

void dfs_prereq_collect(GraphTopo *graph, int course, StackTopo *stack, bool visited[]) {
    visited[course] = true;

    // Visit all prerequisites (incoming edges in reverse graph)
    // This is simplified - in practice, you'd need reverse adjacency list
    for (int i = 0; i < graph->vertices; i++) {
        Node *adj = graph->adj_list[i];
        while (adj != NULL) {
            if (adj->vertex == course && !visited[i]) {
                dfs_prereq_collect(graph, i, stack, visited);
            }
            adj = adj->next;
        }
    }

    push_topo(stack, course);
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Graphs** model relationships and connections between entities
2. **Adjacency matrix** is simple but memory-intensive for sparse graphs
3. **Adjacency list** is memory-efficient and good for sparse graphs
4. **BFS** explores level by level, good for shortest paths in unweighted graphs
5. **DFS** explores deeply, good for topological sorting and cycle detection
6. **Topological sort** orders tasks with dependencies
7. **MST algorithms** find minimum spanning trees for network design
8. **Graph algorithms** have applications in social networks, web crawling, scheduling

Master graph algorithms to solve complex relationship and connectivity problems! 🕸️✨`;

    return contentString;
  })()
};
