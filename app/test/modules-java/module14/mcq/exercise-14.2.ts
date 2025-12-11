import { Exercise } from '../../../data/lessonsData';

export const exercise_14_2: Exercise = {
  id: 14.2,
  title: 'Recursion Project',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the correct recursive implementation to check if a string is a palindrome in Java?",
      options: ["public boolean isPalindrome(String s) { return s.equals(new StringBuilder(s).reverse().toString()); }", "public boolean isPalindrome(String s, int i, int j) { if (i >= j) return true; if (s.charAt(i) != s.charAt(j)) return false; return isPalindrome(s, i + 1, j - 1); }", "public boolean isPalindrome(String s) { for (int i = 0; i < s.length() / 2; i++) if (s.charAt(i) != s.charAt(s.length() - 1 - i)) return false; return true; }", "public boolean isPalindrome(String s) { return isPalindrome(s.substring(1, s.length() - 1)); }"],
      correctAnswer: 1,
      explanation: "The correct recursive palindrome check uses indices to compare characters from both ends, moving inward with each recursive call."
    },
    {
      id: "q2",
      question: "Which recursive approach correctly implements binary search in Java?",
      options: ["public int binarySearch(int[] arr, int target, int low, int high) { int mid = (low + high) / 2; if (arr[mid] == target) return mid; if (target < arr[mid]) return binarySearch(arr, target, low, mid); return binarySearch(arr, target, mid, high); }", "public int binarySearch(int[] arr, int target, int low, int high) { if (low > high) return -1; int mid = low + (high - low) / 2; if (arr[mid] == target) return mid; if (target < arr[mid]) return binarySearch(arr, target, low, mid - 1); return binarySearch(arr, target, mid + 1, high); }", "public int binarySearch(int[] arr, int target) { return Arrays.binarySearch(arr, target); }", "public int binarySearch(int[] arr, int target, int index) { if (index >= arr.length) return -1; if (arr[index] == target) return index; return binarySearch(arr, target, index + 1); }"],
      correctAnswer: 1,
      explanation: "The correct binary search recursively searches the left or right half based on comparison with the middle element, ensuring proper bounds."
    },
    {
      id: "q3",
      question: "What is the correct way to implement recursive array sum in Java?",
      options: ["public int sum(int[] arr) { int total = 0; for (int num : arr) total += num; return total; }", "public int sum(int[] arr, int index) { if (index == arr.length) return 0; return arr[index] + sum(arr, index + 1); }", "public int sum(int[] arr) { return Arrays.stream(arr).sum(); }", "public int sum(int[] arr) { return sum(arr, 0, arr.length - 1); }"],
      correctAnswer: 1,
      explanation: "The recursive array sum uses an index parameter to track position, adding the current element to the sum of the remaining array."
    },
    {
      id: "q4",
      question: "Which implementation correctly reverses a string recursively in Java?",
      options: ["public String reverse(String s) { return new StringBuilder(s).reverse().toString(); }", "public String reverse(String s) { if (s.length() <= 1) return s; return reverse(s.substring(1)) + s.charAt(0); }", "public String reverse(String s) { String result = \"\"; for (int i = s.length() - 1; i >= 0; i--) result += s.charAt(i); return result; }", "public String reverse(String s) { char[] chars = s.toCharArray(); int i = 0, j = chars.length - 1; while (i < j) { char temp = chars[i]; chars[i] = chars[j]; chars[j] = temp; i++; j--; } return new String(chars); }"],
      correctAnswer: 1,
      explanation: "The recursive string reversal takes the first character and appends it to the reversal of the remaining substring."
    },
    {
      id: "q5",
      question: "What is the correct recursive implementation of factorial in Java?",
      options: ["public int factorial(int n) { return n * factorial(n - 1); }", "public int factorial(int n) { if (n == 0) return 1; return n * factorial(n - 1); }", "public int factorial(int n) { int result = 1; for (int i = 1; i <= n; i++) result *= i; return result; }", "public int factorial(int n) { return (n == 0) ? 1 : n * factorial(n - 1); }"],
      correctAnswer: 1,
      explanation: "The correct recursive factorial has a base case (n == 0) that returns 1, and the recursive case multiplies n by factorial(n-1)."
    },
    {
      id: "q6",
      question: "Which recursive algorithm correctly implements subset sum to find if a subset sums to target?",
      options: ["public boolean subsetSum(int[] nums, int target, int index) { if (target == 0) return true; if (index >= nums.length) return false; return subsetSum(nums, target - nums[index], index + 1) || subsetSum(nums, target, index + 1); }", "public boolean subsetSum(int[] nums, int target) { for (int num : nums) { if (num == target) return true; target -= num; } return target == 0; }", "public boolean subsetSum(int[] nums, int target) { Arrays.sort(nums); int left = 0, right = nums.length - 1; while (left <= right) { if (nums[left] + nums[right] == target) return true; if (nums[left] + nums[right] < target) left++; else right--; } return false; }", "public boolean subsetSum(int[] nums, int target) { return Arrays.stream(nums).anyMatch(n -> n == target); }"],
      correctAnswer: 0,
      explanation: "The recursive subset sum tries including or excluding each element, checking if the remaining target can be achieved with the remaining elements."
    },
    {
      id: "q7",
      question: "What is the correct implementation of Tower of Hanoi recursive solution?",
      options: ["public void hanoi(int n, char from, char to, char aux) { if (n == 1) { System.out.println(\"Move from \" + from + \" to \" + to); return; } hanoi(n - 1, from, aux, to); System.out.println(\"Move from \" + from + \" to \" + to); hanoi(n - 1, aux, to, from); }", "public void hanoi(int n, char from, char to, char aux) { for (int i = 1; i <= n; i++) { System.out.println(\"Move disk \" + i + \" from \" + from + \" to \" + to); } }", "public void hanoi(int n, char from, char to, char aux) { if (n > 0) { hanoi(n, from, aux, to); System.out.println(\"Move from \" + from + \" to \" + to); hanoi(n, aux, to, from); } }", "public void hanoi(int n, char from, char to, char aux) { Stack<Integer> stack = new Stack<>(); for (int i = n; i > 0; i--) stack.push(i); while (!stack.isEmpty()) { System.out.println(\"Move disk \" + stack.pop() + \" from \" + from + \" to \" + to); } }"],
      correctAnswer: 0,
      explanation: "The Tower of Hanoi moves n-1 disks to auxiliary peg, then moves nth disk to destination, then moves n-1 disks from auxiliary to destination."
    },
    {
      id: "q8",
      question: "Which recursive approach correctly finds the maximum element in an array?",
      options: ["public int findMax(int[] arr) { return Arrays.stream(arr).max().getAsInt(); }", "public int findMax(int[] arr, int index, int currentMax) { if (index == arr.length) return currentMax; return findMax(arr, index + 1, Math.max(currentMax, arr[index])); }", "public int findMax(int[] arr) { int max = arr[0]; for (int num : arr) max = Math.max(max, num); return max; }", "public int findMax(int[] arr) { Arrays.sort(arr); return arr[arr.length - 1]; }"],
      correctAnswer: 1,
      explanation: "The recursive findMax compares the current element with the maximum of the remaining array, using an accumulator parameter."
    },
    {
      id: "q9",
      question: "What is the correct recursive implementation to check if an array is sorted?",
      options: ["public boolean isSorted(int[] arr) { for (int i = 0; i < arr.length - 1; i++) if (arr[i] > arr[i + 1]) return false; return true; }", "public boolean isSorted(int[] arr, int index) { if (index >= arr.length - 1) return true; if (arr[index] > arr[index + 1]) return false; return isSorted(arr, index + 1); }", "public boolean isSorted(int[] arr) { int[] sorted = Arrays.copyOf(arr, arr.length); Arrays.sort(sorted); return Arrays.equals(arr, sorted); }", "public boolean isSorted(int[] arr) { return arr.length <= 1 || arr[0] <= arr[1] && isSorted(Arrays.copyOfRange(arr, 1, arr.length)); }"],
      correctAnswer: 1,
      explanation: "The recursive isSorted checks if the current element is less than or equal to the next, then recurses on the remaining array."
    },
    {
      id: "q10",
      question: "Which implementation uses memoization to optimize recursive Fibonacci?",
      options: ["public long fibonacci(int n) { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }", "public long fibonacci(int n, Map<Integer, Long> memo) { if (n <= 1) return n; if (memo.containsKey(n)) return memo.get(n); long result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo); memo.put(n, result); return result; }", "public long fibonacci(int n) { long a = 0, b = 1; for (int i = 2; i <= n; i++) { long temp = a + b; a = b; b = temp; } return b; }", "public long fibonacci(int n) { return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2); }"],
      correctAnswer: 1,
      explanation: "Memoization stores computed values in a Map to avoid recomputing the same Fibonacci numbers, reducing exponential time to linear."
    }
  ]
};
