export const SAMPLE_QUESTIONS = {
  javascript: [
    {
      title: "Simple Calculator",
      description: "Create a function that adds two numbers",
      starterCode: `function addNumbers(a, b) {
  // Step 1: Add the two parameters together
  // Step 2: Return the result
  // Your code here
}

console.log(addNumbers(5, 3)); // Should output: 8`
    },
    {
      title: "Array Filter",
      description: "Filter even numbers from an array",
      starterCode: `function filterEvenNumbers(arr) {
  // Step 1: Use the filter method on the array
  // Step 2: Check if each number is even (number % 2 === 0)
  // Step 3: Return the filtered array
  // Your code here
}

console.log(filterEvenNumbers([1, 2, 3, 4, 5, 6])); // Should output: [2, 4, 6]`
    },
    {
      title: "String Reversal",
      description: "Create a function that reverses a string",
      starterCode: `function reverseString(str) {
  // Step 1: Split the string into an array of characters
  // Step 2: Reverse the array
  // Step 3: Join the array back into a string
  // Your code here
}

console.log(reverseString("hello")); // Should output: "olleh"`
    }
  ],
  python: [
    {
      title: "Hello World",
      description: "Create a simple Python function",
      starterCode: `def greet(name):
    # Step 1: Create a greeting message using f-string
    # Step 2: Return the message
    # Your code here
    pass

print(greet("World")) # Should output: Hello, World!`
    },
    {
      title: "List Comprehension",
      description: "Create a list of squares using list comprehension",
      starterCode: `numbers = [1, 2, 3, 4, 5]
# Step 1: Use list comprehension syntax: [expression for item in list]
# Step 2: Square each number using ** operator
# Step 3: Store in squares variable
squares = 

print(squares) # Should output: [1, 4, 9, 16, 25]`
    },
    {
      title: "Factorial Function",
      description: "Create a function that calculates factorial",
      starterCode: `def factorial(n):
    # Step 1: Handle base case (n <= 1)
    # Step 2: Use recursion: n * factorial(n-1)
    # Your code here
    pass

print(factorial(5)) # Should output: 120`
    }
  ]
}
