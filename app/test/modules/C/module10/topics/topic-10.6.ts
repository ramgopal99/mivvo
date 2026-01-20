import { SubLesson } from '../../../../data/lessonsData';

export const topic_10_6: SubLesson = {
  id: "10.6",
  title: 'Dynamic Programming',
  status: 'demo',
  content: (() => {
    // Use a function to prevent TypeScript from parsing the content
    const contentString = `# 🔄 Dynamic Programming in C

Dynamic programming solves complex problems by breaking them into simpler subproblems and storing solutions to avoid redundant calculations. It's essential for optimization problems with overlapping subproblems.

---

## 📋 What is Dynamic Programming?

**Dynamic Programming (DP)** is an algorithmic technique that:

1. **Breaks down problems** into smaller overlapping subproblems
2. **Stores solutions** to subproblems (memoization/tabulation)
3. **Reuses solutions** to build up to the final answer
4. **Optimizes recursively defined problems**

### **When to Use DP**

- **Optimal substructure**: Optimal solution contains optimal solutions to subproblems
- **Overlapping subproblems**: Same subproblems solved multiple times
- **No after-effects**: Future decisions don't affect past decisions

---

## 📈 Fibonacci with Memoization

### **Top-Down Approach (Memoization)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_N 100
#define UNINITIALIZED -1

long long memo[MAX_N];

long long fibonacci_memo(int n) {
    if (memo[n] != UNINITIALIZED) {
        return memo[n];  // Return cached result
    }

    if (n <= 1) {
        return memo[n] = n;
    }

    return memo[n] = fibonacci_memo(n - 1) + fibonacci_memo(n - 2);
}

void initialize_memo() {
    memset(memo, UNINITIALIZED, sizeof(memo));
}

int main() {
    initialize_memo();

    int n = 50;
    printf("Fibonacci(%d) = %lld\\n", n, fibonacci_memo(n));

    // Show cache hits
    printf("Cached values up to %d:\\n", n);
    for (int i = 0; i <= n && i < 20; i++) {
        if (memo[i] != UNINITIALIZED) {
            printf("  F(%d) = %lld\\n", i, memo[i]);
        }
    }

    return 0;
}
\`\`\`

### **Bottom-Up Approach (Tabulation)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

long long fibonacci_tabulation(int n) {
    if (n <= 1) return n;

    long long *dp = (long long*)malloc((n + 1) * sizeof(long long));
    if (dp == NULL) return -1;

    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    long long result = dp[n];
    free(dp);

    return result;
}

int main() {
    int n = 50;
    printf("Fibonacci(%d) = %lld\\n", n, fibonacci_tabulation(n));

    // Compare with space-optimized version
    long long a = 0, b = 1;
    if (n == 0) {
        printf("Space-optimized: %lld\\n", a);
    } else {
        for (int i = 2; i <= n; i++) {
            long long temp = a + b;
            a = b;
            b = temp;
        }
        printf("Space-optimized: %lld\\n", b);
    }

    return 0;
}
\`\`\`

---

## 🎒 0/1 Knapsack Problem

### **Problem Statement**

Given weights and values of n items, put these items in a knapsack of capacity W to get maximum total value without exceeding capacity.

### **Recursive Solution with Memoization**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ITEMS 100
#define MAX_WEIGHT 1000

int memo[MAX_ITEMS][MAX_WEIGHT];

int knapsack_memo(int weights[], int values[], int n, int capacity) {
    // Base case
    if (n == 0 || capacity == 0) {
        return 0;
    }

    // Check memo
    if (memo[n][capacity] != -1) {
        return memo[n][capacity];
    }

    // If weight of nth item > capacity, skip it
    if (weights[n-1] > capacity) {
        return memo[n][capacity] = knapsack_memo(weights, values, n-1, capacity);
    }

    // Return maximum of:
    // 1. nth item included
    // 2. nth item not included
    int include = values[n-1] + knapsack_memo(weights, values, n-1, capacity - weights[n-1]);
    int exclude = knapsack_memo(weights, values, n-1, capacity);

    return memo[n][capacity] = (include > exclude) ? include : exclude;
}

int knapsack(int weights[], int values[], int n, int capacity) {
    memset(memo, -1, sizeof(memo));
    return knapsack_memo(weights, values, n, capacity);
}

int main() {
    int values[] = {60, 100, 120};
    int weights[] = {10, 20, 30};
    int capacity = 50;
    int n = sizeof(values) / sizeof(values[0]);

    printf("Maximum value: %d\\n", knapsack(weights, values, n, capacity));

    return 0;
}
\`\`\`

### **Tabulation Solution**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int knapsack_tabulation(int weights[], int values[], int n, int capacity) {
    int **dp = (int**)malloc((n + 1) * sizeof(int*));
    if (dp == NULL) return -1;

    for (int i = 0; i <= n; i++) {
        dp[i] = (int*)malloc((capacity + 1) * sizeof(int));
        if (dp[i] == NULL) {
            // Free previously allocated memory
            for (int j = 0; j < i; j++) free(dp[j]);
            free(dp);
            return -1;
        }
    }

    // Initialize base cases
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i-1] <= w) {
                int include = values[i-1] + dp[i-1][w - weights[i-1]];
                int exclude = dp[i-1][w];
                dp[i][w] = (include > exclude) ? include : exclude;
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }

    int result = dp[n][capacity];

    // Free memory
    for (int i = 0; i <= n; i++) {
        free(dp[i]);
    }
    free(dp);

    return result;
}

int main() {
    int values[] = {60, 100, 120, 80};
    int weights[] = {10, 20, 30, 15};
    int capacity = 50;
    int n = sizeof(values) / sizeof(values[0]);

    printf("Maximum value: %d\\n", knapsack_tabulation(weights, values, n, capacity));

    return 0;
}
\`\`\`

---

## 🔢 Longest Common Subsequence

### **Problem Statement**

Given two sequences, find the length of longest subsequence present in both.

### **Recursive Solution**

\`\`\`c
#include <stdio.h>
#include <string.h>

#define MAX_LEN 100
int memo[MAX_LEN][MAX_LEN];

int lcs_memo(char *X, char *Y, int m, int n) {
    if (memo[m][n] != -1) {
        return memo[m][n];
    }

    if (m == 0 || n == 0) {
        return memo[m][n] = 0;
    }

    if (X[m-1] == Y[n-1]) {
        return memo[m][n] = 1 + lcs_memo(X, Y, m-1, n-1);
    }

    int exclude_X = lcs_memo(X, Y, m-1, n);
    int exclude_Y = lcs_memo(X, Y, m, n-1);

    return memo[m][n] = (exclude_X > exclude_Y) ? exclude_X : exclude_Y;
}

int longest_common_subsequence(char *X, char *Y) {
    memset(memo, -1, sizeof(memo));
    return lcs_memo(X, Y, strlen(X), strlen(Y));
}

int main() {
    char X[] = "AGGTAB";
    char Y[] = "GXTXAYB";

    printf("Length of LCS: %d\\n", longest_common_subsequence(X, Y));

    return 0;
}
\`\`\`

### **Tabulation Solution**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int lcs_tabulation(char *X, char *Y) {
    int m = strlen(X);
    int n = strlen(Y);

    int **dp = (int**)malloc((m + 1) * sizeof(int*));
    if (dp == NULL) return -1;

    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)malloc((n + 1) * sizeof(int));
        if (dp[i] == NULL) {
            for (int j = 0; j < i; j++) free(dp[j]);
            free(dp);
            return -1;
        }
    }

    // Build DP table
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (X[i-1] == Y[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = (dp[i-1][j] > dp[i][j-1]) ? dp[i-1][j] : dp[i][j-1];
            }
        }
    }

    int result = dp[m][n];

    // Free memory
    for (int i = 0; i <= m; i++) {
        free(dp[i]);
    }
    free(dp);

    return result;
}

// Also return the LCS string
char* get_lcs_string(char *X, char *Y) {
    int m = strlen(X);
    int n = strlen(Y);

    int **dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)malloc((n + 1) * sizeof(int));
    }

    // Fill DP table
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (X[i-1] == Y[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = (dp[i-1][j] > dp[i][j-1]) ? dp[i-1][j] : dp[i][j-1];
            }
        }
    }

    // Reconstruct LCS
    int index = dp[m][n];
    char *lcs = (char*)malloc((index + 1) * sizeof(char));
    lcs[index] = '\\0';

    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i-1] == Y[j-1]) {
            lcs[index-1] = X[i-1];
            i--; j--; index--;
        } else if (dp[i-1][j] > dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }

    // Free DP table
    for (int k = 0; k <= m; k++) {
        free(dp[k]);
    }
    free(dp);

    return lcs;
}

int main() {
    char X[] = "AGGTAB";
    char Y[] = "GXTXAYB";

    printf("Length of LCS: %d\\n", lcs_tabulation(X, Y));

    char *lcs = get_lcs_string(X, Y);
    printf("LCS: %s\\n", lcs);
    free(lcs);

    return 0;
}
\`\`\`

---

## 📏 Longest Increasing Subsequence

### **Dynamic Programming Solution**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int longest_increasing_subsequence(int arr[], int n) {
    if (n == 0) return 0;

    int *dp = (int*)malloc(n * sizeof(int));
    if (dp == NULL) return -1;

    // Initialize all dp values to 1
    for (int i = 0; i < n; i++) {
        dp[i] = 1;
    }

    // Compute LIS values
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }
    }

    // Find maximum value
    int max_length = INT_MIN;
    for (int i = 0; i < n; i++) {
        if (dp[i] > max_length) {
            max_length = dp[i];
        }
    }

    free(dp);
    return max_length;
}

// Get actual LIS sequence
int* get_lis_sequence(int arr[], int n, int *lis_length) {
    int *dp = (int*)malloc(n * sizeof(int));
    int *prev = (int*)malloc(n * sizeof(int));

    for (int i = 0; i < n; i++) {
        dp[i] = 1;
        prev[i] = -1;
    }

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }

    // Find index with maximum dp value
    int max_index = 0;
    for (int i = 1; i < n; i++) {
        if (dp[i] > dp[max_index]) {
            max_index = i;
        }
    }

    *lis_length = dp[max_index];

    // Reconstruct sequence
    int *sequence = (int*)malloc(*lis_length * sizeof(int));
    int current = max_index;
    int seq_index = *lis_length - 1;

    while (current != -1) {
        sequence[seq_index--] = arr[current];
        current = prev[current];
    }

    free(dp);
    free(prev);

    return sequence;
}

int main() {
    int arr[] = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    int n = sizeof(arr) / sizeof(arr[0]);

    int lis_length = longest_increasing_subsequence(arr, n);
    printf("Length of LIS: %d\\n", lis_length);

    int *sequence = get_lis_sequence(arr, n, &lis_length);
    printf("LIS: ");
    for (int i = 0; i < lis_length; i++) {
        printf("%d ", sequence[i]);
    }
    printf("\\n");

    free(sequence);

    return 0;
}
\`\`\`

---

## 🎯 Matrix Chain Multiplication

### **Problem Statement**

Given a sequence of matrices, find the most efficient way to multiply them.

### **Dynamic Programming Solution**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int matrix_chain_multiplication(int dims[], int n) {
    // dp[i][j] = minimum cost to multiply matrices i to j
    int **dp = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) {
        dp[i] = (int*)malloc(n * sizeof(int));
    }

    // Cost is 0 when multiplying one matrix
    for (int i = 1; i < n; i++) {
        dp[i][i] = 0;
    }

    // Fill dp table
    for (int length = 2; length < n; length++) {
        for (int i = 1; i < n - length + 1; i++) {
            int j = i + length - 1;
            dp[i][j] = INT_MAX;

            for (int k = i; k <= j - 1; k++) {
                int cost = dp[i][k] + dp[k + 1][j] +
                          dims[i-1] * dims[k] * dims[j];

                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                }
            }
        }
    }

    int result = dp[1][n-1];

    // Free memory
    for (int i = 0; i < n; i++) {
        free(dp[i]);
    }
    free(dp);

    return result;
}

// Also return the optimal parenthesization
void print_optimal_parenthesization(int **s, int i, int j) {
    if (i == j) {
        printf("A%d", i);
    } else {
        printf("(");
        print_optimal_parenthesization(s, i, s[i][j]);
        print_optimal_parenthesization(s, s[i][j] + 1, j);
        printf(")");
    }
}

int matrix_chain_order(int dims[], int n) {
    int **dp = (int**)malloc(n * sizeof(int*));
    int **s = (int**)malloc(n * sizeof(int*));  // For parenthesization

    for (int i = 0; i < n; i++) {
        dp[i] = (int*)malloc(n * sizeof(int));
        s[i] = (int*)malloc(n * sizeof(int));
    }

    for (int i = 1; i < n; i++) {
        dp[i][i] = 0;
    }

    for (int length = 2; length < n; length++) {
        for (int i = 1; i < n - length + 1; i++) {
            int j = i + length - 1;
            dp[i][j] = INT_MAX;

            for (int k = i; k <= j - 1; k++) {
                int cost = dp[i][k] + dp[k + 1][j] +
                          dims[i-1] * dims[k] * dims[j];

                if (cost < dp[i][j]) {
                    dp[i][j] = cost;
                    s[i][j] = k;
                }
            }
        }
    }

    printf("Optimal parenthesization: ");
    print_optimal_parenthesization(s, 1, n-1);
    printf("\\n");

    int result = dp[1][n-1];

    // Free memory
    for (int i = 0; i < n; i++) {
        free(dp[i]);
        free(s[i]);
    }
    free(dp);
    free(s);

    return result;
}

int main() {
    // Matrix dimensions: A1(10x20), A2(20x30), A3(30x40), A4(40x30)
    int dims[] = {10, 20, 30, 40, 30};
    int n = sizeof(dims) / sizeof(dims[0]);

    printf("Minimum multiplications: %d\\n",
           matrix_chain_order(dims, n));

    return 0;
}
\`\`\`

---

## 💰 Coin Change Problem

### **Minimum Coins (Unlimited Supply)**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int min_coins(int coins[], int n, int amount) {
    int *dp = (int*)malloc((amount + 1) * sizeof(int));
    if (dp == NULL) return -1;

    // Initialize dp array
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        dp[i] = INT_MAX;
    }

    // Fill dp table
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i) {
                int sub_res = dp[i - coins[j]];
                if (sub_res != INT_MAX && sub_res + 1 < dp[i]) {
                    dp[i] = sub_res + 1;
                }
            }
        }
    }

    int result = dp[amount];
    free(dp);

    return (result == INT_MAX) ? -1 : result;
}

// Get the actual coins used
void get_coin_change(int coins[], int n, int amount) {
    int *dp = (int*)malloc((amount + 1) * sizeof(int));
    int *used_coin = (int*)malloc((amount + 1) * sizeof(int));

    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        dp[i] = INT_MAX;
        used_coin[i] = -1;
    }

    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i) {
                int sub_res = dp[i - coins[j]];
                if (sub_res != INT_MAX && sub_res + 1 < dp[i]) {
                    dp[i] = sub_res + 1;
                    used_coin[i] = coins[j];
                }
            }
        }
    }

    // Reconstruct solution
    if (dp[amount] == INT_MAX) {
        printf("No solution\\n");
    } else {
        printf("Coins used: ");
        int remaining = amount;
        while (remaining > 0) {
            printf("%d ", used_coin[remaining]);
            remaining -= used_coin[remaining];
        }
        printf("\\n");
    }

    free(dp);
    free(used_coin);
}

int main() {
    int coins[] = {1, 2, 5};
    int n = sizeof(coins) / sizeof(coins[0]);
    int amount = 11;

    printf("Minimum coins for %d: %d\\n", amount, min_coins(coins, n, amount));
    get_coin_change(coins, n, amount);

    return 0;
}
\`\`\`

### **Number of Ways to Make Change**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>

long long count_ways(int coins[], int n, int amount) {
    long long *dp = (long long*)calloc(amount + 1, sizeof(long long));
    if (dp == NULL) return 0;

    dp[0] = 1;  // Base case: one way to make 0

    for (int i = 0; i < n; i++) {
        for (int j = coins[i]; j <= amount; j++) {
            dp[j] += dp[j - coins[i]];
        }
    }

    long long result = dp[amount];
    free(dp);
    return result;
}

int main() {
    int coins[] = {1, 2, 5};
    int n = sizeof(coins) / sizeof(coins[0]);
    int amount = 5;

    printf("Number of ways to make %d: %lld\\n",
           amount, count_ways(coins, n, amount));

    return 0;
}
\`\`\`

---

## 🎯 Edit Distance

### **Levenshtein Distance**

\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MIN(a,b,c) ((a) < (b) ? ((a) < (c) ? (a) : (c)) : ((b) < (c) ? (b) : (c)))

int edit_distance(char *str1, char *str2) {
    int m = strlen(str1);
    int n = strlen(str2);

    int **dp = (int**)malloc((m + 1) * sizeof(int*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (int*)malloc((n + 1) * sizeof(int));
    }

    // Initialize base cases
    for (int i = 0; i <= m; i++) {
        dp[i][0] = i;  // Delete all characters from str1
    }
    for (int j = 0; j <= n; j++) {
        dp[0][j] = j;  // Insert all characters to str1
    }

    // Fill dp table
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (str1[i-1] == str2[j-1]) {
                dp[i][j] = dp[i-1][j-1];  // No operation needed
            } else {
                dp[i][j] = 1 + MIN(dp[i-1][j],     // Delete
                                   dp[i][j-1],     // Insert
                                   dp[i-1][j-1]);  // Replace
            }
        }
    }

    int result = dp[m][n];

    // Free memory
    for (int i = 0; i <= m; i++) {
        free(dp[i]);
    }
    free(dp);

    return result;
}

int main() {
    char str1[] = "kitten";
    char str2[] = "sitting";

    printf("Edit distance between '%s' and '%s': %d\\n",
           str1, str2, edit_distance(str1, str2));

    return 0;
}
\`\`\`

---

## 🎓 Key Takeaways

1. **Dynamic Programming** solves problems with overlapping subproblems and optimal substructure
2. **Memoization** stores results of expensive function calls (top-down)
3. **Tabulation** builds solution from smaller subproblems (bottom-up)
4. **Knapsack** optimizes resource allocation with constraints
5. **LCS** finds similarities between sequences
6. **LIS** finds increasing patterns in arrays
7. **Matrix chain** optimizes computation order
8. **Coin change** solves combination and optimization problems

Master dynamic programming to solve complex optimization problems! 🔄✨`;

    return contentString;
  })()
};
