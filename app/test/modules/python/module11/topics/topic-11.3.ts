import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_3: SubLesson = {
  id: "11.3",
  title: 'Collision Handling',
  status: 'demo',
  content: "`# ðŸ’¥ Collision Handling

Collisions are inevitable in hash tables. Different keys can produce the same hash value, and we need strategies to handle this gracefully!

---

## ðŸŽ¯ Understanding Collisions

### **What Causes Collisions?**
\`"\`\`python
# Two different keys can hash to same value
key1 = "abc"
key2 = "def"

hash1 = hash(key1) % 10  # Might be 5
hash2 = hash(key2) % 10  # Might also be 5

print(f"{key1} -> {hash1}")
print(f"{key2} -> {hash2}")

if hash1 == hash2:
    print("COLLISION! Both keys map to same bucket")
\`\`\`

### **Collision Probability**
\`\`\`python
import math

def collision_probability(n, m):
    """Probability of collision with n items in m buckets."""
    if n > m:
        return 1.0  # Guaranteed collision
    # Birthday problem approximation
    return 1 - math.exp(-n*n/(2*m))

print("Collision probability:")
for items in [10, 23, 50, 100]:
    prob = collision_probability(items, 365)  # Birthday problem
    print(f"{items} items in 365 buckets: {prob:.3f}")
\`\`\`

---

## ðŸ”— Separate Chaining

### **Store Multiple Items Per Bucket**
\`\`\`python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists
        self.count = 0

    def _hash(self, key):
        return abs(hash(key)) % self.size

    def put(self, key, value):
        index = self._hash(key)

        # Check if key exists, update if so
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return

        # Key not found, append
        self.table[index].append((key, value))
        self.count += 1

    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

    def remove(self, key):
        index = self._hash(key)
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                self.count -= 1
                return v
        return None

# Usage
ht = HashTableChaining(5)  # Small table to force collisions

# Add items that will collide
ht.put("apple", 1.50)
ht.put("banana", 0.75)  # Different hash, no collision
ht.put("grape", 2.00)   # May collide with apple

print(f"Apple: {ht.get('apple')}")
print(f"Banana: {ht.get('banana')}")
print(f"Grape: {ht.get('grape')}")
\`\`\`

### **Advantages & Disadvantages**
\`\`\`python
# Advantages
print("âœ… Simple to implement")
print("âœ… Handles any number of collisions")
print("âœ… Deletion is straightforward")
print("âœ… Better cache performance")

# Disadvantages
print("âŒ Extra memory for linked structures")
print("âŒ Lookup requires searching linked list")
print("âŒ Worst case: O(n) lookup time")
\`\`\`

---

## ðŸ”„ Open Addressing

### **Find Next Available Slot**

#### **Linear Probing**
\`\`\`python
class HashTableLinearProbing:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size
        self.keys = [None] * size
        self.count = 0

    def _hash(self, key):
        return abs(hash(key)) % self.size

    def put(self, key, value):
        if self.count >= self.size * 0.75:  # Load factor > 0.75
            self._resize()

        index = self._hash(key)
        original_index = index

        # Linear probing
        while self.keys[index] is not None:
            if self.keys[index] == key:
                break  # Key exists, update
            index = (index + 1) % self.size

            # Full table check
            if index == original_index:
                raise Exception("Hash table is full")

        self.keys[index] = key
        self.table[index] = value

        if self.keys[index] != key:  # New key added
            self.count += 1

    def get(self, key):
        index = self._hash(key)
        original_index = index

        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.table[index]
            index = (index + 1) % self.size

            if index == original_index:  # Searched entire table
                break

        return None

    def _resize(self):
        """Resize table when load factor is high."""
        old_keys = self.keys.copy()
        old_table = self.table.copy()

        self.size *= 2
        self.table = [None] * self.size
        self.keys = [None] * self.size
        self.count = 0

        # Rehash all existing items
        for key, value in zip(old_keys, old_table):
            if key is not None:
                self.put(key, value)

# Usage
ht_lp = HashTableLinearProbing(5)
ht_lp.put("apple", 1.50)
ht_lp.put("banana", 0.75)
ht_lp.put("grape", 2.00)   # Will probe for empty slot

print(f"Apple: {ht_lp.get('apple')}")
print(f"Banana: {ht_lp.get('banana')}")
print(f"Grape: {ht_lp.get('grape')}")
\`\`\`

#### **Quadratic Probing**
\`\`\`python
def quadratic_probe(index, attempt, size):
    """Quadratic probing sequence."""
    return (index + attempt * attempt) % size

# Reduces clustering compared to linear probing
print("Quadratic probing: index + 1Â², index + 2Â², index + 3Â², ...")
\`\`\`

#### **Double Hashing**
\`\`\`python
class HashTableDoubleHashing:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size
        self.keys = [None] * size

    def _hash1(self, key):
        return abs(hash(key)) % self.size

    def _hash2(self, key):
        # Secondary hash function (must never be 0)
        return 1 + (abs(hash(str(key) + "salt"))) % (self.size - 1)

    def put(self, key, value):
        index = self._hash1(key)
        step = self._hash2(key)

        original_index = index
        attempt = 0

        while self.keys[index] is not None:
            if self.keys[index] == key:
                break  # Update existing
            attempt += 1
            index = (original_index + attempt * step) % self.size

            if attempt >= self.size:  # Prevent infinite loop
                raise Exception("Hash table full")

        self.keys[index] = key
        self.table[index] = value

    def get(self, key):
        index = self._hash1(key)
        step = self._hash2(key)

        original_index = index
        attempt = 0

        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.table[index]
            attempt += 1
            index = (original_index + attempt * step) % self.size

            if attempt >= self.size:
                break

        return None

print("Double hashing provides better distribution than linear probing")
\`\`\`

---

## âš–ï¸ Comparing Collision Resolution

### **Performance Comparison**
\`\`\`python
import time

def benchmark_collision_resolution(strategy_class, size, operations):
    ht = strategy_class(size)

    # Insert operations
    start = time.time()
    for i in range(operations):
        ht.put(f"key_{i}", f"value_{i}")
    insert_time = time.time() - start

    # Lookup operations
    start = time.time()
    for i in range(operations):
        ht.get(f"key_{i}")
    lookup_time = time.time() - start

    return insert_time, lookup_time

# Compare strategies (with small table to force collisions)
size = 50
operations = 100

chaining_results = benchmark_collision_resolution(HashTableChaining, size, operations)
linear_results = benchmark_collision_resolution(HashTableLinearProbing, size, operations)

print("Performance comparison (smaller = better):")
print(f"Separate Chaining - Insert: {chaining_results[0]:.4f}s, Lookup: {chaining_results[1]:.4f}s")
print(f"Linear Probing - Insert: {linear_results[0]:.4f}s, Lookup: {linear_results[1]:.4f}s")
\`\`\`

### **Memory Usage**
\`\`\`python
# Separate chaining uses more memory per collision
# Open addressing uses exactly table size memory

print("Memory considerations:")
print("Separate Chaining: Extra memory for linked structures")
print("Open Addressing: Fixed memory usage")
print("Trade-off: Flexibility vs Memory efficiency")
\`\`\`

---

## ðŸ”§ Load Factor Management

### **When to Resize**
\`\`\`python
def load_factor(items, table_size):
    return items / table_size

def should_resize(current_load, threshold=0.75):
    return current_load > threshold

# Monitor and resize
current_items = 75
table_size = 100
load = load_factor(current_items, table_size)

print(f"Current load factor: {load}")
print(f"Should resize: {should_resize(load)}")

if should_resize(load):
    print("Resize table to reduce collisions!")
\`\`\`

### **Resize Strategy**
\`\`\`python
def resize_table(old_table, new_size):
    """Resize hash table to new size."""
    new_table = type(old_table)(new_size)

    # Rehash all existing items
    if hasattr(old_table, 'keys'):  # Open addressing
        for key, value in zip(old_table.keys, old_table.table):
            if key is not None:
                new_table.put(key, value)
    else:  # Separate chaining
        for bucket in old_table.table:
            for key, value in bucket:
                new_table.put(key, value)

    return new_table

print("Resize strategy: Create new table, rehash all items")
\`\`\`

---

## ðŸŽ¯ Choosing Collision Resolution

### **When to Use Separate Chaining**
- **Simple implementation needed**
- **Memory is plentiful**
- **Predictable worst-case performance**
- **Cache performance is important**

### **When to Use Open Addressing**
- **Memory efficiency is critical**
- **No external libraries allowed**
- **Good average-case performance**
- **Table size is fixed**

### **Hybrid Approaches**
\`\`\`python
# Modern hash tables often combine approaches
# Start with separate chaining
# Switch to different strategy based on load factor
# Use Robin Hood hashing, Hopscotch hashing, etc.

print("Modern hash tables use sophisticated collision resolution")
\`\`\`

---

## âš ï¸ Common Collision Issues

### **Primary Clustering (Linear Probing)**
\`\`\`python
# Items cluster together, making probing slower
# Quadratic probing helps but double hashing is best

print("Primary clustering: Consecutive slots fill up")
print("Solution: Use better probing sequences")
\`\`\`

### **Secondary Clustering (Poor Double Hashing)**
\`\`\`python
# All items following same probe sequence
# Choose hash functions that minimize this

print("Secondary clustering: Same probe sequence for colliding items")
print("Solution: Choose different step sizes")
\`\`\`

### **Degraded Performance**
\`\`\`python
# High load factors cause performance degradation
# Monitor and resize proactively

print("Monitor load factor and resize when > 0.75")
\`\`\`

---

## ðŸš€ Advanced Techniques

### **Robin Hood Hashing**
\`\`\`python
# Steal slots from richer neighbors
# Minimizes variance in probe lengths
# Better worst-case performance

print("Robin Hood: Rich slots give to poor slots")
\`\`\`

### **Hopscotch Hashing**
\`\`\`python
# Keep colliding items within a small neighborhood
# Fast lookups with bounded probe distance

print("Hopscotch: Keep related items close together")
\`\`\`

### **Cuckoo Hashing**
\`\`\`python
# Use multiple hash functions
# Items can be displaced to make room
# Worst-case O(1) lookups

print("Cuckoo: Multiple homes for each item")
\`\`\`

Collision resolution is what makes hash tables practical and efficient! ðŸŽ¯`
};


