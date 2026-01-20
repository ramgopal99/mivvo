import { Exercise } from '../../../../data/lessonsData';

export const exercise_10_7: Exercise = {
  id: "10.7",
  title: 'Advanced Data Structures and Algorithms MCQs',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the time complexity of inserting an element into a balanced Binary Search Tree (like AVL or Red-Black tree)?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 1,
      explanation: "Balanced BSTs maintain O(log n) height, so insertion takes O(log n) time to traverse and balance the tree."
    },
    {
      id: "q2",
      question: "Which of the following is NOT a characteristic of a hash table with separate chaining?",
      options: [
        "Can handle collisions by storing multiple items in the same bucket",
        "Worst-case lookup time is O(1)",
        "Uses linked lists to store collided items",
        "Load factor affects performance"
      ],
      correctAnswer: 1,
      explanation: "Separate chaining can have O(n) worst-case lookup time if all keys hash to the same bucket, creating a long linked list."
    },
    {
      id: "q3",
      question: "In graph theory, what does BFS (Breadth-First Search) guarantee about the path found between two nodes in an unweighted graph?",
      options: [
        "The shortest path in terms of number of edges",
        "The shortest path in terms of edge weights",
        "A path with minimum total weight",
        "The only possible path between the nodes"
      ],
      correctAnswer: 0,
      explanation: "BFS finds the shortest path in terms of number of edges in unweighted graphs, as it explores nodes level by level."
    },
    {
      id: "q4",
      question: "What is the space complexity of the standard dynamic programming solution for the Longest Common Subsequence problem?",
      options: [
        "O(1)",
        "O(n)",
        "O(n + m)",
        "O(n * m)"
      ],
      correctAnswer: 3,
      explanation: "The DP table for LCS requires O(n * m) space, where n and m are the lengths of the two input sequences."
    },
    {
      id: "q5",
      question: "Which sorting algorithm is NOT stable?",
      options: [
        "Bubble Sort",
        "Merge Sort",
        "Insertion Sort",
        "Selection Sort"
      ],
      correctAnswer: 3,
      explanation: "Selection sort is not stable because it can change the relative order of equal elements during swaps."
    },
    {
      id: "q6",
      question: "In dynamic programming, what is memoization?",
      options: [
        "Storing results of expensive function calls",
        "Dividing problem into smaller subproblems",
        "Finding optimal substructure",
        "Overlapping subproblems"
      ],
      correctAnswer: 0,
      explanation: "Memoization is a technique where you store the results of expensive function calls and return the cached result when the same inputs occur again."
    },
    {
      id: "q7",
      question: "What is the main advantage of separate chaining over linear probing in hash tables?",
      options: [
        "Better cache performance",
        "Handles high load factors better",
        "Simpler implementation",
        "Uses less memory"
      ],
      correctAnswer: 1,
      explanation: "Separate chaining can handle load factors greater than 1 without performance degradation, while linear probing struggles with high load factors."
    },
    {
      id: "q8",
      question: "Which graph algorithm can be used to detect cycles in a directed graph?",
      options: [
        "Breadth-First Search only",
        "Depth-First Search only",
        "Both BFS and DFS",
        "Neither BFS nor DFS"
      ],
      correctAnswer: 2,
      explanation: "Both BFS (using topological sort concepts) and DFS (using back edges) can detect cycles in directed graphs."
    },
    {
      id: "q9",
      question: "In the context of dynamic programming, what does 'optimal substructure' mean?",
      options: [
        "The problem can be solved using a greedy algorithm",
        "The optimal solution contains optimal solutions to subproblems",
        "The problem has only one optimal solution",
        "Subproblems are independent of each other"
      ],
      correctAnswer: 1,
      explanation: "Optimal substructure means that the optimal solution to a problem contains optimal solutions to its subproblems."
    },
    {
      id: "q10",
      question: "Which data structure is typically used to implement a priority queue for Dijkstra's algorithm?",
      options: [
        "Stack",
        "Queue",
        "Binary Heap",
        "Hash Table"
      ],
      correctAnswer: 2,
      explanation: "Dijkstra's algorithm uses a priority queue (often implemented as a binary heap) to always extract the vertex with the smallest distance."
    },
    {
      id: "q11",
      question: "What is the worst-case time complexity of Quick Sort?",
      options: [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(n³)"
      ],
      correctAnswer: 2,
      explanation: "Quick sort has O(n²) worst-case time complexity when the pivot selection consistently results in unbalanced partitions."
    },
    {
      id: "q12",
      question: "In hash table design, what is the load factor?",
      options: [
        "Number of buckets in the table",
        "Ratio of stored elements to table size",
        "Number of collisions in the table",
        "Size of each bucket"
      ],
      correctAnswer: 1,
      explanation: "Load factor is the ratio of the number of stored elements to the total number of buckets/slots in the hash table."
    },
    {
      id: "q13",
      question: "Which of the following is a topological sort algorithm?",
      options: [
        "Kahn's algorithm",
        "Dijkstra's algorithm",
        "Floyd-Warshall algorithm",
        "Bellman-Ford algorithm"
      ],
      correctAnswer: 0,
      explanation: "Kahn's algorithm performs topological sorting by repeatedly removing nodes with no incoming edges."
    },
    {
      id: "q14",
      question: "What is the space complexity of Merge Sort?",
      options: [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      correctAnswer: 2,
      explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging."
    },
    {
      id: "q15",
      question: "In graph algorithms, what does a 'back edge' in DFS indicate?",
      options: [
        "A cross edge to another component",
        "An edge to an already visited ancestor",
        "A forward edge to a descendant",
        "A tree edge in the DFS tree"
      ],
      correctAnswer: 1,
      explanation: "A back edge in DFS connects a vertex to one of its ancestors in the DFS tree, indicating a cycle."
    },
    {
      id: "q16",
      question: "Which dynamic programming approach builds the solution from smaller subproblems to larger ones?",
      options: [
        "Memoization",
        "Tabulation",
        "Greedy approach",
        "Divide and conquer"
      ],
      correctAnswer: 1,
      explanation: "Tabulation (bottom-up) builds the solution by solving smaller subproblems first and using their solutions to solve larger problems."
    },
    {
      id: "q17",
      question: "What is the main disadvantage of using linear probing for collision resolution in hash tables?",
      options: [
        "Poor cache performance",
        "Clustering of elements",
        "High memory usage",
        "Complex implementation"
      ],
      correctAnswer: 1,
      explanation: "Linear probing can lead to primary clustering where groups of occupied slots form, degrading performance."
    },
    {
      id: "q18",
      question: "In the 0/1 Knapsack problem, what does the '0/1' refer to?",
      options: [
        "You can use zero or one of each item",
        "Items can be used zero or one time",
        "The problem has binary constraints",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "0/1 refers to the constraint that each item can be used either zero times or one time (not fractions or multiples)."
    },
    {
      id: "q19",
      question: "Which graph representation is most efficient for dense graphs?",
      options: [
        "Adjacency List",
        "Adjacency Matrix",
        "Edge List",
        "Incidence Matrix"
      ],
      correctAnswer: 1,
      explanation: "Adjacency matrix is efficient for dense graphs because it uses O(V²) space regardless of edge count, and operations are O(1)."
    },
    {
      id: "q20",
      question: "What is the key difference between Prim's and Kruskal's algorithms?",
      options: [
        "Prim's uses a priority queue, Kruskal's uses sorting",
        "Prim's works with adjacency matrix, Kruskal's uses edge list",
        "Prim's grows a single tree, Kruskal's adds minimum edges",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Prim's algorithm grows a single tree from a starting vertex using a priority queue, while Kruskal's algorithm sorts all edges and adds them if they don't form cycles."
    }
  ]
};