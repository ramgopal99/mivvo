import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_2: SubLesson = {
  id: "11.2",
  title: 'Hash Functions',
  status: 'demo',
  content: "`# ðŸ”¢ Hash Functions

Hash functions are the heart of hash tables. They convert keys into array indices and must satisfy specific mathematical properties for optimal performance!

---

## ðŸŽ¯ What Makes a Good Hash Function?

A good hash function should:
- **Be deterministic** - Same input always produces same output
- **Distribute uniformly** - Spread keys evenly across table
- **Be fast to compute** - Minimal computational overhead
- **Minimize collisions** - Different keys produce different hashes

\`"\`\`python
# Python's built-in hash function
print(f"hash('hello'): {hash('hello')}")
print(f"hash('world'): {hash('world')}")
print(f"hash(42): {hash(42)}")

# Deterministic - same result every time
print(f"hash('hello') again: {hash('hello')}")
\`\`\`

---

## ðŸ› ï¸ Common Hash Function Techniques

### **Division Method**
\`\`\`python
def division_hash(key, table_size):
    """Simple division-based hash."""
    return abs(hash(key)) % table_size

# Example
table_size = 100
keys = ["apple", "banana", "cherry", "date"]
for key in keys:
    hash_val = division_hash(key, table_size)
    print(f"{key}: {hash_val}")
\`\`\`

### **Multiplication Method**
\`\`\`python
def multiplication_hash(key, table_size):
    """Knuth's multiplicative hash."""
    # Use golden ratio conjugate: (âˆš5 - 1)/2 â‰ˆ 0.6180339887
    A = 0.6180339887
    frac = (abs(hash(key)) * A) % 1
    return int(table_size * frac)

# More uniform distribution
for key in ["apple", "banana", "cherry", "date"]:
    hash_val = multiplication_hash(key, 100)
    print(f"{key}: {hash_val}")
\`\`\`

### **String Hashing**
\`\`\`python
def djb2_hash(string, table_size):
    """DJB2 hash function for strings."""
    hash_val = 5381
    for char in string:
        hash_val = ((hash_val << 5) + hash_val) + ord(char)  # hash_val * 33 + char
    return abs(hash_val) % table_size

def sdbm_hash(string, table_size):
    """SDBM hash function."""
    hash_val = 0
    for char in string:
        hash_val = ord(char) + (hash_val << 6) + (hash_val << 16) - hash_val
    return abs(hash_val) % table_size

# Compare hash functions
word = "hello"
print(f"DJB2 hash: {djb2_hash(word, 100)}")
print(f"SDBM hash: {sdbm_hash(word, 100)}")
print(f"Python hash: {abs(hash(word)) % 100}")
\`\`\`

---

## ðŸ“Š Hash Function Properties

### **Avalanche Effect**
\`\`\`python
def test_avalanche(hash_func, table_size=100):
    """Test how well small changes affect hash."""
    words = ["hello", "hellp", "hxllo", "hello!"]

    print("Testing avalanche effect:")
    for word in words:
        h = hash_func(word, table_size)
        print(f"{word}: {h}")

# Small changes should produce very different hashes
test_avalanche(djb2_hash)
\`\`\`

### **Uniform Distribution**
\`\`\`python
def test_distribution(hash_func, keys, table_size=100):
    """Test hash distribution uniformity."""
    buckets = [0] * table_size

    for key in keys:
        bucket = hash_func(key, table_size)
        buckets[bucket] += 1

    # Count occupied buckets
    occupied = sum(1 for count in buckets if count > 0)
    max_count = max(buckets)

    print(f"Keys: {len(keys)}")
    print(f"Table size: {table_size}")
    print(f"Occupied buckets: {occupied}")
    print(f"Max items per bucket: {max_count}")
    print(f"Uniformity: {occupied/len(keys):.2%}")

# Test with various keys
test_keys = [f"key_{i}" for i in range(100)]
test_distribution(djb2_hash, test_keys)
\`\`\`

---

## ðŸ” Cryptographic vs Non-Cryptographic Hashes

### **Non-Cryptographic (Table Usage)**
- **Fast computation**
- **Deterministic**
- **Uniform distribution**
- **No security requirements**

\`\`\`python
# Perfect for hash tables
import time

def benchmark_hash(hash_func, keys, table_size=1000):
    start = time.time()
    for key in keys:
        hash_func(key, table_size)
    end = time.time()
    return end - start

keys = [f"test_key_{i}" for i in range(10000)]

djb2_time = benchmark_hash(djb2_hash, keys)
python_time = benchmark_hash(lambda k, s: abs(hash(k)) % s, keys)

print(f"DJB2 time: {djb2_time:.4f}s")
print(f"Python time: {python_time:.4f}s")
\`\`\`

### **Cryptographic (Security Usage)**
- **Slow computation** (deliberately)
- **Collision resistant**
- **Preimage resistant**
- **Second preimage resistant**

\`\`\`python
import hashlib

# Cryptographic hashes (not suitable for hash tables)
crypto_hash = hashlib.sha256(b"hello world").hexdigest()
print(f"SHA256: {crypto_hash[:16]}...")  # First 16 chars

# Too slow and not designed for table indexing
\`\`\`

---

## âš ï¸ Common Hash Function Problems

### **Poor Distribution**
\`\`\`python
def bad_hash(key, table_size):
    """Example of a bad hash function."""
    return len(str(key)) % table_size  # Only uses length!

# All keys of same length collide
bad_keys = ["cat", "dog", "bat", "rat"]  # All length 3
for key in bad_keys:
    print(f"{key}: {bad_hash(key, 10)}")  # All hash to same bucket!
\`\`\`

### **Integer Overflow**
\`\`\`python
def overflow_prone_hash(key, table_size):
    """Hash that can overflow."""
    hash_val = 0
    for char in str(key):
        hash_val += ord(char)
        # No modulo until end - can get very large!
    return hash_val % table_size

# Works for small inputs
print(overflow_prone_hash("a", 100))     # 97
print(overflow_prone_hash("hello", 100)) # 532

# In some languages, this could overflow
\`\`\`

### **Predictable Patterns**
\`\`\`python
def predictable_hash(key, table_size):
    """Hash with predictable patterns."""
    return ord(str(key)[0]) % table_size  # Only first character

# Keys starting with same letter collide
predictable_keys = ["apple", "ant", "axe", "banana", "bat"]
for key in predictable_keys:
    print(f"{key}: {predictable_hash(key, 10)}")
\`\`\`

---

## ðŸŽ¯ Python's Hash Implementation

### **Built-in hash() Function**
\`\`\`python
# Python's hash() for immutable types
print(f"int hash: {hash(42)}")
print(f"str hash: {hash('hello')}")
print(f"tuple hash: {hash((1, 2, 3))}")

# Not available for mutable types
# hash([1, 2, 3])  # TypeError!
# hash({"a": 1})   # TypeError!
\`\`\`

### **Hash Randomization**
\`\`\`python
# Python adds randomization for security
# Same string, different hash across Python sessions
print(f"String hash: {hash('security')}")
print("Hash randomization prevents hash collision attacks")
\`\`\`

---

## ðŸš€ Advanced Hash Techniques

### **Universal Hashing**
\`\`\`python
def universal_hash(key, a, b, p, m):
    """Universal hash function."""
    # h(k) = ((a * hash(k) + b) % p) % m
    hash_val = abs(hash(key))
    return ((a * hash_val + b) % p) % m

# Different (a,b) pairs give different hash functions
p = 10000019  # Large prime
m = 1000      # Table size

hash1 = universal_hash("key", 12345, 67890, p, m)
hash2 = universal_hash("key", 54321, 09876, p, m)
print(f"Different hash functions: {hash1}, {hash2}")
\`\`\`

### **Perfect Hashing**
\`\`\`python
# For known key sets, create collision-free hash
known_keys = ["red", "green", "blue", "yellow", "orange"]

def perfect_hash(key):
    """Perfect hash for specific key set."""
    perfect_map = {
        "red": 0, "green": 1, "blue": 2,
        "yellow": 3, "orange": 4
    }
    return perfect_map.get(key, -1)

for key in known_keys:
    print(f"{key}: {perfect_hash(key)}")  # No collisions!

print("Perfect hashing: O(1) with zero collisions for known keys")
\`\`\`

---

## ðŸ“ˆ Hash Function Quality Metrics

### **Collision Rate**
\`\`\`python
def measure_collisions(hash_func, keys, table_size):
    """Measure collision rate of hash function."""
    buckets = {}
    collisions = 0

    for key in keys:
        bucket = hash_func(key, table_size)
        if bucket in buckets:
            collisions += 1
        buckets[bucket] = True

    collision_rate = collisions / len(keys)
    return collision_rate

# Test collision rates
test_keys = [f"key_{i}" for i in range(1000)]

djb2_rate = measure_collisions(djb2_hash, test_keys, 100)
python_rate = measure_collisions(lambda k, s: abs(hash(k)) % s, test_keys, 100)

print(f"DJB2 collision rate: {djb2_rate:.3f}")
print(f"Python collision rate: {python_rate:.3f}")
\`\`\`

### **Distribution Uniformity**
\`\`\`python
import statistics

def measure_uniformity(hash_func, keys, table_size):
    """Measure how uniformly distributed hashes are."""
    hashes = [hash_func(key, table_size) for key in keys]

    # Calculate standard deviation
    mean = statistics.mean(hashes)
    stdev = statistics.stdev(hashes)

    # Lower stdev = more uniform
    uniformity = 1 / (1 + stdev/table_size)
    return uniformity

uniformity = measure_uniformity(djb2_hash, test_keys, 100)
print(f"Distribution uniformity: {uniformity:.3f} (closer to 1 is better)")
\`\`\`

---

## âœ… Best Practices

1. **Choose appropriate hash functions** - Fast, uniform, deterministic
2. **Handle collisions gracefully** - Use chaining or probing
3. **Monitor load factor** - Resize when table gets full
4. **Use cryptographic hashes only when needed** - Too slow for general use
5. **Test hash quality** - Measure collisions and distribution

Hash functions are the secret sauce that makes hash tables fast and reliable! ðŸ”‘`
};


