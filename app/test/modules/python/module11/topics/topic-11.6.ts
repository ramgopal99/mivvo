import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_6: SubLesson = {
  id: "11.6",
  title: 'Hash Table Performance',
  status: 'demo',
  content: `# ⚡ Hash Table Performance

Hash tables offer exceptional performance, but understanding their characteristics helps you use them effectively. Let's analyze the performance factors!

---

## 📊 Time Complexity Analysis

### **Average Case Performance**
\`\`\`python
# Hash table operations are typically O(1)
hash_table = {}

# These operations are O(1) on average
hash_table["key"] = "value"      # Insert
value = hash_table["key"]        # Lookup
del hash_table["key"]            # Delete
"key" in hash_table              # Membership test

print("Average case: O(1) for all basic operations")
\`\`\`

### **Worst Case Performance**
\`\`\`python
# Worst case occurs with many collisions
def poor_hash(key, table_size):
    """Poor hash function that causes collisions."""
    return len(str(key)) % table_size  # Only depends on length

# All keys of same length collide
poor_table = {}
keys = ["cat", "dog", "bat", "rat", "mat", "pat"]  # All length 3

for key in keys:
    poor_table[key] = f"value_for_{key}"

# Lookups now take O(n) time due to collisions
print("Worst case: O(n) when hash function causes many collisions")
\`\`\`

---

## 🔢 Load Factor Impact

### **What is Load Factor?**
\`\`\`python
def calculate_load_factor(table_size, num_items):
    """Calculate load factor."""
    return num_items / table_size if table_size > 0 else 0

# Example load factors
print(f"Empty table: {calculate_load_factor(100, 0)}")
print(f"Half full: {calculate_load_factor(100, 50)}")
print(f"Overloaded: {calculate_load_factor(100, 150)}")
\`\`\`

### **Load Factor and Performance**
\`\`\`python
import time

def benchmark_load_factor(max_load_factor):
    """Benchmark hash table performance at different load factors."""
    results = {}

    for load_factor in [0.25, 0.5, 0.75, 1.0, 1.5]:
        if load_factor > max_load_factor:
            continue

        # Create table with specific load factor
        table_size = 1000
        num_items = int(table_size * load_factor)

        # Fill table
        test_table = {}
        for i in range(num_items):
            test_table[f"key_{i}"] = f"value_{i}"

        # Benchmark lookups
        start_time = time.time()
        for i in range(1000):  # 1000 lookups
            _ = test_table.get(f"key_{i % num_items}", "not_found")
        end_time = time.time()

        avg_time = (end_time - start_time) / 1000
        results[load_factor] = avg_time

    return results

# Run benchmark
print("Load factor performance test:")
results = benchmark_load_factor(1.0)
for load_factor, avg_time in results.items():
    print(f"  Load {load_factor}: {avg_time:.6f}s per lookup")
\`\`\`

---

## 🔄 Resizing Behavior

### **Automatic Resizing in Python**
\`\`\`python
# Python dicts automatically resize when load factor gets high
import sys

def monitor_dict_growth():
    """Monitor how dict size changes."""
    d = {}
    sizes = []

    for i in range(10000):
        d[i] = i * 2
        if len(d) % 1000 == 0:  # Check every 1000 additions
            size_bytes = sys.getsizeof(d)
            sizes.append((len(d), size_bytes))

    print("Dict growth pattern:")
    for item_count, size_bytes in sizes:
        print(f"  {item_count} items: {size_bytes} bytes")

monitor_dict_growth()
\`\`\`

### **Resize Triggers**
\`\`\`python
# Python resizes when load factor exceeds threshold
print("Resize triggers:")
print("- Load factor > 2/3 for growth")
print("- Resize typically doubles table size")
print("- Amortized O(1) cost per operation")
\`\`\`

---

## 🆚 Comparison with Other Data Structures

### **Performance Comparison Table**
| Operation | Hash Table | Array | Linked List | Binary Tree |
|-----------|------------|-------|-------------|-------------|
| Search | O(1) avg | O(n) | O(n) | O(log n) |
| Insert | O(1) avg | O(n) | O(1) | O(log n) |
| Delete | O(1) avg | O(n) | O(1)* | O(log n) |
| Memory | O(n) | O(n) | O(n) | O(n) |
| Ordered | No | Yes | Yes | Yes |

*At known position

### **When to Choose Hash Tables**
\`\`\`python
# Choose hash tables when:
fast_lookups_needed = True
no_order_requirement = True
keys_are_hashable = True

if fast_lookups_needed and no_order_requirement and keys_are_hashable:
    print("Use hash table!")
else:
    print("Consider other data structures")
\`\`\`

---

## 🔧 Optimization Techniques

### **Choose Good Hash Functions**
\`\`\`python
import hashlib

def secure_hash(key):
    """Use cryptographic hash for security."""
    return int(hashlib.sha256(str(key).encode()).hexdigest(), 16)

def fast_hash(key, table_size):
    """Fast non-cryptographic hash."""
    hash_val = 0
    for char in str(key):
        hash_val = (hash_val * 31 + ord(char)) & 0xFFFFFFFF
    return hash_val % table_size

# Test hash quality
test_keys = [f"test_key_{i}" for i in range(1000)]

fast_times = []
secure_times = []

import time
for key in test_keys[:100]:  # Test subset
    start = time.time()
    fast_hash(key, 1000)
    fast_times.append(time.time() - start)

    start = time.time()
    secure_hash(key)
    secure_times.append(time.time() - start)

avg_fast = sum(fast_times) / len(fast_times)
avg_secure = sum(secure_times) / len(secure_times)

print(f"Fast hash: {avg_fast:.8f}s")
print(f"Secure hash: {avg_secure:.8f}s")
print(f"Secure is {avg_secure/avg_fast:.1f}x slower")
\`\`\`

### **Pre-size for Known Workloads**
\`\`\`python
# Pre-size dictionary for better performance
known_size = 10000

# Method 1: Create with initial data
pre_sized = dict.fromkeys(range(known_size))

# Method 2: Use comprehension
pre_sized2 = {i: None for i in range(known_size)}

print(f"Pre-sized dict: {len(pre_sized)} items")
print("Reduces resizing overhead for known workloads")
\`\`\`

---

## 📈 Real-World Performance Tips

### **Memory Efficiency**
\`\`\`python
# Use __slots__ for memory-efficient objects
class CompactObject:
    __slots__ = ['x', 'y', 'data']  # Only these attributes allowed

    def __init__(self, x, y, data):
        self.x = x
        self.y = y
        self.data = data

# Compare memory usage
regular_objects = [{'x': i, 'y': i*2, 'data': f'item_{i}'} for i in range(1000)]
compact_objects = [CompactObject(i, i*2, f'item_{i}') for i in range(1000)]

print("Regular dict objects use more memory")
print("Compact objects with __slots__ are more efficient")
\`\`\`

### **Cache-Friendly Patterns**
\`\`\`python
# Group related data for better cache performance
class DataCache:
    def __init__(self):
        self.metadata = {}  # id -> metadata
        self.data = {}      # id -> actual_data

    def store(self, id, metadata, data):
        self.metadata[id] = metadata
        self.data[id] = data

    def retrieve(self, id):
        return {
            'metadata': self.metadata.get(id),
            'data': self.data.get(id)
        }

cache = DataCache()
cache.store('user_123', {'name': 'Alice'}, {'profile': 'data...'})

result = cache.retrieve('user_123')
print("Cached data retrieved efficiently")
\`\`\`

---

## ⚠️ Performance Pitfalls

### **Key Distribution Issues**
\`\`\`python
# Poor key distribution leads to clustering
bad_keys = [f"user_{i:03d}" for i in range(100)]  # user_000, user_001, etc.

# These keys will cluster if hash function is poor
hash_values = [hash(key) % 100 for key in bad_keys[:10]]
print(f"Hash distribution: {hash_values}")

# Good keys have better distribution
good_keys = [f"user_{hash(str(i))}" for i in range(100)]
good_hashes = [hash(key) % 100 for key in good_keys[:10]]
print(f"Better distribution: {good_hashes}")
\`\`\`

### **Hash Collision Attacks**
\`\`\`python
# Malicious keys designed to cause collisions
def create_collision_keys(base_key, num_keys):
    """Create keys that collide in poor hash functions."""
    keys = []
    for i in range(num_keys):
        # Modify key in way that preserves hash
        key = base_key + chr(i)  # Simple modification
        keys.append(key)
    return keys

collision_keys = create_collision_keys("attack", 10)
print("Collision attacks can degrade performance")
print("Use cryptographically secure hashes for security-critical applications")
\`\`\`

---

## 🚀 Advanced Performance Techniques

### **Concurrent Hash Tables**
\`\`\`python
# Thread-safe hash tables (conceptual)
import threading

class ThreadSafeDict:
    def __init__(self):
        self._dict = {}
        self._lock = threading.RLock()

    def __getitem__(self, key):
        with self._lock:
            return self._dict[key]

    def __setitem__(self, key, value):
        with self._lock:
            self._dict[key] = value

    def get(self, key, default=None):
        with self._lock:
            return self._dict.get(key, default)

print("Thread-safe hash tables prevent race conditions")
print("Use locks or atomic operations for concurrent access")
\`\`\`

### **Persistent Hash Tables**
\`\`\`python
# Immutable hash tables for functional programming
class PersistentDict:
    def __init__(self, data=None, parent=None):
        self.data = data or {}
        self.parent = parent

    def __getitem__(self, key):
        if key in self.data:
            return self.data[key]
        elif self.parent:
            return self.parent[key]
        else:
            raise KeyError(key)

    def set(self, key, value):
        """Return new dict with key set."""
        new_data = dict(self.data)
        new_data[key] = value
        return PersistentDict(new_data, self.parent)

# Functional updates
dict1 = PersistentDict()
dict2 = dict1.set('a', 1)
dict3 = dict2.set('b', 2)

print(f"dict1 has 'a': {'a' in dict1.data}")  # False
print(f"dict2 has 'a': {'a' in dict2.data}")  # True
print(f"dict3 has 'a' and 'b': {list(dict3.data.keys())}")  # ['a', 'b']
\`\`\`

---

## 📊 Benchmarking Your Hash Tables

### **Comprehensive Benchmark**
\`\`\`python
import time
import statistics

def benchmark_hash_table(operations=10000):
    """Comprehensive hash table benchmark."""
    results = {}

    # Test different key types
    test_data = {
        'integers': list(range(operations)),
        'strings': [f"key_{i}" for i in range(operations)],
        'tuples': [(i, i*2) for i in range(operations)]
    }

    for data_type, keys in test_data.items():
        ht = {}

        # Insert benchmark
        start = time.time()
        for key in keys:
            ht[key] = f"value_{hash(key) % 1000}"
        insert_time = time.time() - start

        # Lookup benchmark
        start = time.time()
        for key in keys:
            _ = ht.get(key)
        lookup_time = time.time() - start

        # Memory usage
        import sys
        memory_usage = sys.getsizeof(ht)

        results[data_type] = {
            'insert_time': insert_time,
            'lookup_time': lookup_time,
            'memory': memory_usage,
            'avg_insert': insert_time / operations,
            'avg_lookup': lookup_time / operations
        }

    return results

# Run benchmark
print("Hash Table Performance Benchmark:")
results = benchmark_hash_table(5000)  # Smaller for demo

for data_type, metrics in results.items():
    print(f"\n{data_type.upper()}:")
    print(f"  Avg insert: {metrics['avg_insert']:.8f}s")
    print(f"  Avg lookup: {metrics['avg_lookup']:.8f}s")
    print(f"  Memory: {metrics['memory']} bytes")
\`\`\`

Hash table performance is exceptional when properly implemented and used! 🏃‍♂️`
};

