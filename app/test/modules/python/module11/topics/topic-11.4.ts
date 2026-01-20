import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_4: SubLesson = {
  id: "11.4",
  title: 'Hash Table Operations',
  status: 'demo',
  content: "`# âš™ï¸ Hash Table Operations

Hash tables support standard dictionary operations with excellent performance. Let's explore the core operations and their implementations!

---

## ðŸ”§ Basic Operations

### **Put/Insert Operation**
\`"\`\`python
# Adding key-value pairs
hash_table = {}

# Method 1: Direct assignment
hash_table["apple"] = 1.50
hash_table["banana"] = 0.75
hash_table["orange"] = 2.00

# Method 2: update() method
hash_table.update({
    "grape": 3.00,
    "kiwi": 2.50
})

print("Hash table after insertions:")
for key, value in hash_table.items():
    print(f"  {key}: \${value}")
\`\`\`

### **Get/Lookup Operation**
\`\`\`python
# Retrieving values by key
price = hash_table.get("apple")
print(f"Apple price: \${price}")

# Safe lookup with default
mango_price = hash_table.get("mango", "Not found")
print(f"Mango price: {mango_price}")

# Direct access (raises KeyError if missing)
try:
    pear_price = hash_table["pear"]
    print(f"Pear price: \${pear_price}")
except KeyError:
    print("Pear not found in hash table")
\`\`\`

### **Remove/Delete Operation**
\`\`\`python
# Remove specific key-value pair
if "banana" in hash_table:
    removed_price = hash_table.pop("banana")
    print(f"Removed banana (was \${removed_price})")

# Remove with default (safe)
removed_value = hash_table.pop("nonexistent", "Not found")
print(f"Removed nonexistent: {removed_value}")

# Remove arbitrary item (useful for caches)
if hash_table:
    random_key, random_value = hash_table.popitem()
    print(f"Removed random item: {random_key} = \${random_value}")
\`\`\`

---

## ðŸ” Advanced Operations

### **Membership Testing**
\`\`\`python
# Check if key exists - O(1) average
print(f"Apple in hash table: {{'apple' in hash_table}}")
print(f"Mango in hash table: {{'mango' in hash_table}}")

# Check if key doesn't exist
print(f"Orange not in hash table: {{'orange' not in hash_table}}")
\`\`\`

### **Size and Length**
\`\`\`python
print(f"Hash table size: {len(hash_table)}")
print(f"Hash table is empty: {len(hash_table) == 0}")

# Check if hash table has items
if hash_table:
    print("Hash table has items")
else:
    print("Hash table is empty")
\`\`\`

### **Iteration Operations**
\`\`\`python
# Iterate through keys
print("Keys:")
for key in hash_table.keys():
    print(f"  {key}")

# Iterate through values
print("Values:")
for value in hash_table.values():
    print(f"  \${value}")

# Iterate through key-value pairs
print("Key-value pairs:")
for key, value in hash_table.items():
    print(f"  {key}: \${value}")

# Default iteration (keys)
print("Default iteration (keys):")
for key in hash_table:
    print(f"  {key}")
\`\`\`

---

## ðŸ”„ Bulk Operations

### **Clear Operation**
\`\`\`python
# Remove all items
backup_table = hash_table.copy()  # Keep backup
hash_table.clear()
print(f"Hash table cleared. Size: {len(hash_table)}")

# Restore from backup
hash_table.update(backup_table)
print(f"Hash table restored. Size: {len(hash_table)}")
\`\`\`

### **Copy Operation**
\`\`\`python
# Shallow copy
table_copy = hash_table.copy()

# Modify copy (doesn't affect original)
table_copy["new_fruit"] = 99.99
print(f"Original size: {len(hash_table)}")
print(f"Copy size: {len(table_copy)}")

# Deep copy for nested structures
import copy
nested_table = {"fruits": {"apple": 1.50, "banana": 0.75}}
deep_copy = copy.deepcopy(nested_table)
deep_copy["fruits"]["apple"] = 2.00
print(f"Original apple price: \${nested_table['fruits']['apple']}")
print(f"Deep copy apple price: \${deep_copy['fruits']['apple']}")
\`\`\`

---

## ðŸŽ¯ Set Operations on Keys

### **Key Set Operations**
\`\`\`python
prices1 = {"apple": 1.50, "banana": 0.75, "orange": 2.00}
prices2 = {"banana": 0.80, "orange": 1.80, "grape": 3.00}

# Keys as sets
keys1 = set(prices1.keys())
keys2 = set(prices2.keys())

print(f"Keys in prices1: {keys1}")
print(f"Keys in prices2: {keys2}")

# Set operations on keys
print(f"Common fruits: {keys1 & keys2}")
print(f"Unique to prices1: {keys1 - keys2}")
print(f"Unique to prices2: {keys2 - keys1}")
print(f"All fruits: {keys1 | keys2}")
\`\`\`

### **Dictionary Views**
\`\`\`python
# Dictionary views are dynamic
keys_view = prices1.keys()
values_view = prices1.values()
items_view = prices1.items()

print(f"Initial keys: {list(keys_view)}")

# Views update when dictionary changes
prices1["kiwi"] = 4.00
print(f"After adding kiwi: {list(keys_view)}")

# Views are set-like for some operations
print(f"'apple' in keys: {'apple' in keys_view}")
print(f"Number of keys: {len(keys_view)}")
\`\`\`

---

## ðŸ“Š Performance Characteristics

### **Time Complexity Analysis**

\`\`\`
Operation      | Average Case | Worst Case | Notes
---------------|--------------|------------|-----------------------
get(key)       | O(1)         | O(n)       | n = items in bucket
put(key, value)| O(1)         | O(n)       | n = items in bucket
remove(key)    | O(1)         | O(n)       | n = items in bucket
contains(key)  | O(1)         | O(n)       | n = items in bucket
keys()         | O(n)         | O(n)       | Must visit all items
values()       | O(n)         | O(n)       | Must visit all items
items()        | O(n)         | O(n)       | Must visit all items
\`\`\`

### **Space Complexity**
- **O(n)** where n = number of key-value pairs
- **Load factor** affects collision rate and performance
- **Hash function overhead** (minimal)

---

## ðŸ› ï¸ Practical Implementations

### **Simple Cache Implementation**
\`\`\`python
class SimpleCache:
    def __init__(self, max_size=100):
        self.cache = {}
        self.max_size = max_size
        self.access_order = []  # For LRU tracking

    def get(self, key):
        if key in self.cache:
            # Move to end (most recently used)
            self.access_order.remove(key)
            self.access_order.append(key)
            return self.cache[key]
        return None

    def put(self, key, value):
        if key in self.cache:
            # Update existing
            self.access_order.remove(key)
        elif len(self.cache) >= self.max_size:
            # Remove least recently used
            lru_key = self.access_order.pop(0)
            del self.cache[lru_key]

        self.cache[key] = value
        self.access_order.append(key)

# Usage
cache = SimpleCache(max_size=3)
cache.put("user_1", {"name": "Alice"})
cache.put("user_2", {"name": "Bob"})
cache.put("user_3", {"name": "Charlie"})

print(f"Cache hit for user_1: {cache.get('user_1') is not None}")

# Add fourth item (should evict user_2)
cache.put("user_4", {"name": "Diana"})
print(f"user_2 still cached: {'user_2' in cache.cache}")
print(f"user_4 cached: {'user_4' in cache.cache}")
\`\`\`

### **Frequency Counter**
\`\`\`python
def count_word_frequency(text):
    """Count frequency of each word in text."""
    words = text.lower().split()
    frequency = {}

    for word in words:
        # Remove punctuation
        word = word.strip('.,!?;:"')
        if word:
            frequency[word] = frequency.get(word, 0) + 1

    return frequency

text = "The quick brown fox jumps over the lazy dog. The fox is quick!"
freq = count_word_frequency(text)

print("Word frequencies:")
for word, count in sorted(freq.items(), key=lambda x: x[1], reverse=True):
    print(f"  {word}: {count}")
\`\`\`

### **Two-Sum Problem**
\`\`\`python
def two_sum(nums, target):
    """Find two numbers that add up to target."""
    seen = {}  # num -> index

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return None

# Test
numbers = [2, 7, 11, 15]
target = 9
result = two_sum(numbers, target)

if result:
    print(f"Indices {result[0]} and {result[1]}: {numbers[result[0]]} + {numbers[result[1]]} = {target}")
else:
    print("No solution found")
\`\`\`

---

## âš ï¸ Common Pitfalls

### **Key Immutability**
\`\`\`python
# Valid keys (immutable)
valid_keys = {
    "string": 1,
    42: 2,
    (1, 2): 3,
    frozenset([1, 2, 3]): 4
}

# Invalid keys (mutable) - will raise TypeError
# bad_keys = {
#     [1, 2, 3]: "list",      # Lists are mutable
#     {"a": 1}: "dict"         # Dicts are mutable
# }
\`\`\`

### **Hash Consistency**
\`\`\`python
# Hash values should be consistent within a session
key = "test"
hash1 = hash(key)
hash2 = hash(key)
print(f"Hash consistency: {hash1 == hash2}")

# But different objects with same value may have different hashes
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(f"List hash equality: {hash(tuple(list1)) == hash(tuple(list2))}")
\`\`\`

### **Load Factor Management**
\`\`\`python
# High load factors degrade performance
large_table = {}
for i in range(10000):
    large_table[f"key_{i}"] = f"value_{i}"

load_factor = len(large_table) / (len(large_table) * 1.0)  # Simplified
print(f"Load factor: {load_factor}")
print("Python automatically manages resizing for good performance")
\`\`\`

---

## ðŸš€ Advanced Operations

### **Dictionary Comprehensions**
\`\`\`python
# Create new dictionary from existing data
original = {"a": 1, "b": 2, "c": 3}

# Double all values
doubled = {key: value * 2 for key, value in original.items()}
print(f"Doubled: {doubled}")

# Filter and transform
even_only = {key: value for key, value in original.items() if value % 2 == 0}
print(f"Even values only: {even_only}")

# Swap keys and values
inverted = {value: key for key, value in original.items()}
print(f"Inverted: {inverted}")
\`\`\`

### **Merging Dictionaries**
\`\`\`python
# Python 3.9+ merge operator
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}

# Method 1: update() (modifies dict1)
dict1_copy = dict1.copy()
dict1_copy.update(dict2)
print(f"After update(): {dict1_copy}")

# Method 2: {**dict1, **dict2} (creates new dict)
merged = {**dict1, **dict2}
print(f"Merged with **: {merged}")

# Method 3: dict union (Python 3.9+)
# merged_new = dict1 | dict2
# print(f"Union operator: {merged_new}")
\`\`\`

Hash table operations are the foundation of efficient data manipulation! âš¡`
};


