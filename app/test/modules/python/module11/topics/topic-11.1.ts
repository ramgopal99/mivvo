import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_1: SubLesson = {
  id: 11.1,
  title: 'What are Hash Tables?',
  status: 'demo',
  content: `# 🗂️ What are Hash Tables?

Hash tables are powerful data structures that provide **average O(1) lookup time** by using a hash function to map keys to array indices. They're the foundation of Python dictionaries!

---

## 🎯 What is a Hash Table?

A **hash table** (or hash map) is a data structure that:
- **Maps keys to values** using a hash function
- **Provides fast lookups** - Average O(1) time complexity
- **Uses an array internally** with clever indexing
- **Handles collisions** when different keys hash to same index

\`\`\`python
# Python dict is a hash table implementation
hash_table = {
    "apple": 1.50,
    "banana": 0.75,
    "orange": 2.00
}

print(hash_table["apple"])   # O(1) average lookup
print(hash_table["banana"])  # O(1) average lookup
\`\`\`

---

## 🔧 How Hash Tables Work

### **The Hash Function**
\`\`\`python
def simple_hash(key, table_size):
    """Simple hash function (not production-ready)."""
    hash_value = 0
    for char in str(key):
        hash_value += ord(char)
    return hash_value % table_size

# Example hashing
table_size = 10
print(f"Hash of 'apple': {simple_hash('apple', table_size)}")
print(f"Hash of 'banana': {simple_hash('banana', table_size)}")
print(f"Hash of 'orange': {simple_hash('orange', table_size)}")

# Python's built-in hash function
print(f"Python hash of 'apple': {hash('apple') % table_size}")
\`\`\`

### **Basic Structure**
\`\`\`python
class SimpleHashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size  # Array of buckets

    def _hash(self, key):
        """Compute hash index."""
        return hash(key) % self.size

    def put(self, key, value):
        """Store key-value pair."""
        index = self._hash(key)
        self.table[index] = (key, value)  # Store as tuple

    def get(self, key):
        """Retrieve value by key."""
        index = self._hash(key)
        if self.table[index] and self.table[index][0] == key:
            return self.table[index][1]
        return None

# Usage
ht = SimpleHashTable()
ht.put("name", "Alice")
ht.put("age", 25)

print(f"Name: {ht.get('name')}")
print(f"Age: {ht.get('age')}")
\`\`\`

---

## 💥 The Collision Problem

### **What Happens When Keys Collide?**
\`\`\`python
# Simple hash function can cause collisions
hash_table = SimpleHashTable(5)  # Small table

# These might collide
hash_table.put("abc", 1)    # hash("abc") % 5
hash_table.put("def", 2)    # hash("def") % 5

# Second value overwrites first!
print(hash_table.get("abc"))  # None (overwritten)
print(hash_table.get("def"))  # 2

print("Problem: Collisions cause data loss!")
\`\`\`

### **Collision Resolution Strategies**

#### **1. Separate Chaining (Linked Lists)**
\`\`\`python
class HashTableChaining:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)
        # Check if key exists, update if so
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Key not found, append
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

ht_chain = HashTableChaining()
ht_chain.put("abc", 1)
ht_chain.put("def", 2)
ht_chain.put("ghi", 3)  # May collide with others

print(f"abc: {ht_chain.get('abc')}")
print(f"def: {ht_chain.get('def')}")
print(f"ghi: {ht_chain.get('ghi')}")
\`\`\`

#### **2. Open Addressing (Linear Probing)**
\`\`\`python
class HashTableProbing:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size
        self.keys = [None] * size

    def _hash(self, key):
        return hash(key) % self.size

    def put(self, key, value):
        index = self._hash(key)

        # Linear probing for empty slot
        while self.keys[index] is not None:
            if self.keys[index] == key:
                break  # Key exists, update
            index = (index + 1) % self.size

        self.keys[index] = key
        self.table[index] = value

    def get(self, key):
        index = self._hash(key)

        # Linear probing to find key
        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.table[index]
            index = (index + 1) % self.size

        return None

ht_probe = HashTableProbing()
ht_probe.put("abc", 1)
ht_probe.put("def", 2)
ht_probe.put("ghi", 3)

print(f"abc: {ht_probe.get('abc')}")
print(f"def: {ht_probe.get('def')}")
print(f"ghi: {ht_probe.get('ghi')}")
\`\`\`

---

## ⚡ Hash Table Performance

### **Average Case: O(1)**
- **Insert**: O(1)
- **Lookup**: O(1)
- **Delete**: O(1)

### **Worst Case: O(n)**
- **Poor hash function** causes many collisions
- **High load factor** requires resizing
- **Clustering** in open addressing

### **Load Factor**
\`\`\`python
def load_factor(table_size, items_count):
    """Calculate load factor."""
    return items_count / table_size

print(f"Load factor: {load_factor(10, 7)}")  # 0.7
print("High load factor (> 0.75) triggers resizing")
\`\`\`

---

## 🎨 Real-World Applications

### **Database Indexing**
\`\`\`python
# Primary key lookups
user_database = {
    101: {"name": "Alice", "email": "alice@email.com"},
    102: {"name": "Bob", "email": "bob@email.com"},
    103: {"name": "Charlie", "email": "charlie@email.com"}
}

def find_user(user_id):
    return user_database.get(user_id, "User not found")

print(find_user(102))      # Fast lookup by ID
print(find_user(999))      # Not found
\`\`\`

### **Caching Systems**
\`\`\`python
class SimpleCache:
    def __init__(self):
        self.cache = {}

    def get(self, key):
        return self.cache.get(key)

    def put(self, key, value):
        self.cache[key] = value

    def clear(self):
        self.cache.clear()

cache = SimpleCache()
cache.put("user_123_data", {"name": "Alice", "last_login": "2024-01-15"})
cache.put("page_home", "<html>Home Page</html>")

print("Cached user data:", cache.get("user_123_data"))
print("Cached page:", cache.get("page_home"))
\`\`\`

### **Symbol Tables**
\`\`\`python
# Programming language symbol table
symbol_table = {
    "x": 42,
    "y": "hello",
    "add": lambda a, b: a + b,
    "PI": 3.14159
}

# Variable lookup
print(f"x = {symbol_table['x']}")
print(f"PI = {symbol_table['PI']}")

# Function lookup and call
add_func = symbol_table['add']
result = add_func(5, 3)
print(f"add(5, 3) = {result}")
\`\`\`

---

## 🆚 Hash Tables vs Other Structures

| Structure | Lookup | Insert | Delete | Ordered |
|-----------|--------|--------|--------|---------|
| Hash Table | O(1) | O(1) | O(1) | No |
| Array | O(n) | O(n) | O(n) | Yes |
| Linked List | O(n) | O(1) | O(1) | Yes |
| Binary Tree | O(log n) | O(log n) | O(log n) | Yes |

Hash tables provide the fastest average-case performance for lookups!

---

## 🔑 Key Concepts

### **Hash Function Requirements**
- **Deterministic**: Same key always produces same hash
- **Uniform distribution**: Spreads keys evenly across table
- **Fast computation**: Quick to calculate

### **Collision Resolution**
- **Separate chaining**: Linked lists at each index
- **Open addressing**: Find next available slot
- **Robin Hood hashing**: Minimize variance

### **Dynamic Resizing**
- **Load factor monitoring**: Track table fullness
- **Rehashing**: Create larger table and reinsert items
- **Growth factor**: Typically 2x size increase

Hash tables are the workhorses of modern computing - fast, flexible, and ubiquitous! 🚀`
};
