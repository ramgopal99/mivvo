import { Exercise } from '../../../../data/lessonsData';

export const exercise_11_8: Exercise = {
  id: "11.8",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement a Simple Hash Table:\n1. Create a basic hash table class with fixed size\n2. Implement a simple hash function\n3. Handle collisions using separate chaining (lists)\n4. Implement put, get, and remove methods\n5. Test with sample data and demonstrate collisions",
      solution: `class SimpleHashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [[] for _ in range(size)]  # List of lists for separate chaining

    def _hash(self, key):
        """Simple hash function - sum of character codes modulo table size"""
        hash_value = 0
        for char in str(key):
            hash_value += ord(char)
        return hash_value % self.size

    def put(self, key, value):
        """Insert or update a key-value pair"""
        index = self._hash(key)

        # Check if key already exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)  # Update existing
                return

        # Key doesn't exist, add new
        self.table[index].append((key, value))

    def get(self, key):
        """Retrieve value for a key"""
        index = self._hash(key)

        for k, v in self.table[index]:
            if k == key:
                return v

        return None  # Key not found

    def remove(self, key):
        """Remove a key-value pair"""
        index = self._hash(key)

        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                del self.table[index][i]
                return True

        return False  # Key not found

    def display(self):
        """Display the hash table"""
        for i, bucket in enumerate(self.table):
            if bucket:
                print(f"Index {i}: {bucket}")

# Test the hash table
ht = SimpleHashTable(5)  # Small size to force collisions

# Insert some data
test_data = [
    ("apple", 1.50),
    ("banana", 0.75),
    ("orange", 2.00),
    ("grape", 3.00),
    ("pear", 1.80),
    ("plum", 2.50),  # Should collide with "apple"
]

print("Inserting data:")
for key, value in test_data:
    ht.put(key, value)
    hash_index = ht._hash(key)
    print(f"Put {key}: {value} -> index {hash_index}")

print("\nHash table contents:")
ht.display()

print("\nTesting retrieval:")
test_keys = ["apple", "banana", "plum", "kiwi"]
for key in test_keys:
    value = ht.get(key)
    print(f"Get {key}: {value}")

print("\nTesting removal:")
ht.remove("banana")
ht.remove("kiwi")  # Doesn't exist
print("After removing 'banana':")
ht.display()`
    },
    {
      id: "ex2",
      question: "Create a Word Frequency Counter using Hash Tables:\n1. Read text and count word frequencies\n2. Use a hash table (dictionary) for storage\n3. Handle case sensitivity and punctuation\n4. Find most and least frequent words\n5. Display frequency statistics\n6. Compare with list-based approach",
      solution: `# Word frequency counter using hash tables (dictionaries)
def count_word_frequencies(text):
    """Count word frequencies using a dictionary (hash table)"""
    # Clean and split text
    words = text.lower().replace('.', '').replace(',', '').replace('!', '').replace('?', '').split()

    # Use dictionary as hash table
    frequency = {}

    for word in words:
        if word in frequency:
            frequency[word] += 1
        else:
            frequency[word] = 1

    return frequency

def analyze_frequencies(frequency_dict):
    """Analyze word frequency data"""
    if not frequency_dict:
        return None

    # Find most frequent
    most_frequent = max(frequency_dict.items(), key=lambda x: x[1])

    # Find least frequent
    least_frequent = min(frequency_dict.items(), key=lambda x: x[1])

    # Calculate statistics
    total_words = sum(frequency_dict.values())
    unique_words = len(frequency_dict)
    average_frequency = total_words / unique_words

    return {
        'most_frequent': most_frequent,
        'least_frequent': least_frequent,
        'total_words': total_words,
        'unique_words': unique_words,
        'average_frequency': average_frequency
    }

# Test with sample text
sample_text = """
Python is a powerful programming language. Python is used for web development,
data science, artificial intelligence, and many other applications. Programming
with Python is fun and productive. Many developers love Python because it is
easy to learn and has extensive libraries.
"""

print("Word Frequency Analysis")
print("=" * 40)

# Count frequencies
frequencies = count_word_frequencies(sample_text)
print(f"Total words processed: {sum(frequencies.values())}")
print(f"Unique words: {len(frequencies)}")

# Analyze results
analysis = analyze_frequencies(frequencies)

if analysis:
    most_word, most_count = analysis['most_frequent']
    least_word, least_count = analysis['least_frequent']

    print(f"\nMost frequent word: '{most_word}' ({most_count} times)")
    print(f"Least frequent word: '{least_word}' ({least_count} times)")
    print(f"Average frequency: {analysis['average_frequency']:.2f}")

    # Show top 5 most frequent words
    sorted_freq = sorted(frequencies.items(), key=lambda x: x[1], reverse=True)
    print(f"\nTop 5 most frequent words:")
    for i, (word, count) in enumerate(sorted_freq[:5], 1):
        print(f"{i}. {word}: {count}")

    # Show words that appear only once
    single_words = [word for word, count in frequencies.items() if count == 1]
    print(f"\nWords appearing only once: {single_words}")

print(f"\nHash Table Performance:")
print(f"- Space used: O({len(frequencies)}) for unique words")
print(f"- Lookup time: O(1) average for any word")
print(f"- Insertion time: O(1) average")
print(f"- Total operations: Very efficient for large texts!")`
    },
    {
      id: "ex3",
      question: "Implement a Phone Book using Hash Tables:\n1. Create a phone book class using dictionary\n2. Implement add, lookup, update, and delete operations\n3. Handle duplicate names and invalid inputs\n4. Add search functionality (by name prefix)\n5. Demonstrate hash table performance vs list search",
      solution: `# Phone book implementation using hash tables
class PhoneBook:
    def __init__(self):
        self.contacts = {}  # Hash table for O(1) lookups

    def add_contact(self, name, number):
        """Add or update a contact"""
        if not name or not number:
            return False, "Name and number cannot be empty"

        # Store in hash table (automatically handles updates)
        self.contacts[name] = number
        return True, f"Contact {name} added/updated"

    def lookup_contact(self, name):
        """Look up a contact by name - O(1) average time"""
        if name in self.contacts:
            return self.contacts[name]
        return None

    def update_contact(self, name, new_number):
        """Update an existing contact"""
        if name in self.contacts:
            self.contacts[name] = new_number
            return True, f"Contact {name} updated"
        return False, f"Contact {name} not found"

    def delete_contact(self, name):
        """Delete a contact"""
        if name in self.contacts:
            del self.contacts[name]
            return True, f"Contact {name} deleted"
        return False, f"Contact {name} not found"

    def search_by_prefix(self, prefix):
        """Search contacts by name prefix"""
        matches = {}
        prefix = prefix.lower()

        for name, number in self.contacts.items():
            if name.lower().startswith(prefix):
                matches[name] = number

        return matches

    def get_all_contacts(self):
        """Get all contacts"""
        return self.contacts.copy()

    def get_contact_count(self):
        """Get total number of contacts"""
        return len(self.contacts)

# Demonstrate phone book functionality
phone_book = PhoneBook()

# Add contacts
contacts_data = [
    ("Alice Johnson", "555-0101"),
    ("Bob Smith", "555-0102"),
    ("Charlie Brown", "555-0103"),
    ("Diana Prince", "555-0104"),
    ("Alice Cooper", "555-0105"),  # Different Alice
]

print("Adding contacts:")
for name, number in contacts_data:
    success, message = phone_book.add_contact(name, number)
    print(f"- {message}")

print(f"\nTotal contacts: {phone_book.get_contact_count()}")

# Test lookups
print("\nTesting lookups:")
test_names = ["Alice Johnson", "Bob Smith", "Eve Wilson"]
for name in test_names:
    number = phone_book.lookup_contact(name)
    if number:
        print(f"- {name}: {number}")
    else:
        print(f"- {name}: Not found")

# Test prefix search
print("\nSearching by prefix 'Ali':")
matches = phone_book.search_by_prefix("Ali")
for name, number in matches.items():
    print(f"- {name}: {number}")

# Update and delete
print("\nUpdating and deleting:")
success, message = phone_book.update_contact("Bob Smith", "555-0199")
print(f"- {message}")

success, message = phone_book.delete_contact("Charlie Brown")
print(f"- {message}")

print(f"\nFinal contact count: {phone_book.get_contact_count()}")

print(f"\nHash Table Advantages:")
print(f"- O(1) average lookup time")
print(f"- Fast insertions and deletions")
print(f"- Efficient for large datasets")
print(f"- Perfect for key-value storage like phone books!")`
    },
    {
      id: "ex4",
      question: "Implement a Simple Cache using Hash Tables:\n1. Create a cache class with size limit\n2. Implement get and put operations\n3. Use hash table for O(1) access\n4. Implement LRU (Least Recently Used) eviction\n5. Track cache performance (hits/misses)\n6. Demonstrate cache effectiveness",
      solution: `# Simple cache implementation using hash tables
class SimpleCache:
    def __init__(self, capacity=5):
        self.capacity = capacity
        self.cache = {}  # Hash table for O(1) access
        self.access_order = []  # Track access order for LRU
        self.hits = 0
        self.misses = 0

    def get(self, key):
        """Get value from cache - O(1) average time"""
        if key in self.cache:
            # Move to end (most recently used)
            self.access_order.remove(key)
            self.access_order.append(key)
            self.hits += 1
            return self.cache[key]
        else:
            self.misses += 1
            return None

    def put(self, key, value):
        """Put value in cache - O(1) average time"""
        if key in self.cache:
            # Update existing
            self.cache[key] = value
            self.access_order.remove(key)
            self.access_order.append(key)
        else:
            # Add new
            if len(self.cache) >= self.capacity:
                # Remove least recently used (LRU)
                lru_key = self.access_order.pop(0)
                del self.cache[lru_key]
                print(f"Cache full, removed LRU item: {lru_key}")

            self.cache[key] = value
            self.access_order.append(key)

    def get_stats(self):
        """Get cache performance statistics"""
        total_requests = self.hits + self.misses
        hit_rate = (self.hits / total_requests * 100) if total_requests > 0 else 0

        return {
            'size': len(self.cache),
            'capacity': self.capacity,
            'hits': self.hits,
            'misses': self.misses,
            'hit_rate': hit_rate
        }

    def display_cache(self):
        """Display current cache contents"""
        print("Current cache contents:")
        for key in self.access_order:
            print(f"  {key}: {self.cache[key]}")
        print(f"Access order: {self.access_order}")

# Test the cache
cache = SimpleCache(3)  # Small capacity to demonstrate eviction

print("Cache Operations Demonstration")
print("=" * 40)

# Add some items
cache.put("user_1", {"name": "Alice", "age": 25})
cache.put("user_2", {"name": "Bob", "age": 30})
cache.put("user_3", {"name": "Charlie", "age": 35})

print("Initial cache:")
cache.display_cache()

# Access some items (changes LRU order)
print("\nAccessing items:")
result = cache.get("user_1")  # Should be hit
print(f"Get user_1: {'Found' if result else 'Not found'}")

result = cache.get("user_4")  # Should be miss
print(f"Get user_4: {'Found' if result else 'Not found'}")

# Add item that causes eviction
print("\nAdding item that causes eviction:")
cache.put("user_4", {"name": "Diana", "age": 28})
cache.display_cache()

# More operations
cache.get("user_2")  # Access to change LRU
cache.put("user_5", {"name": "Eve", "age": 32})  # Should evict user_3

print("\nFinal cache state:")
cache.display_cache()

# Show statistics
stats = cache.get_stats()
print(f"\nCache Statistics:")
print(f"Size: {stats['size']}/{stats['capacity']}")
print(f"Hits: {stats['hits']}")
print(f"Misses: {stats['misses']}")
print(f"Hit Rate: {stats['hit_rate']:.1f}%")

print(f"\nHash Table Benefits for Caching:")
print(f"- O(1) average lookup time")
print(f"- Efficient storage of key-value pairs")
print(f"- Perfect for implementing caches, databases, and indexes")`
    },
    {
      id: "ex5",
      question: "Implement Hash Table Collision Analysis:\n1. Create hash functions with different collision rates\n2. Implement separate chaining and open addressing\n3. Analyze collision patterns\n4. Compare performance of different approaches\n5. Demonstrate load factor effects\n6. Create visual representation of hash table distribution",
      solution: `# Hash table collision analysis
import random

class HashTableAnalyzer:
    def __init__(self, size=20):
        self.size = size
        self.table = [[] for _ in range(size)]  # Separate chaining
        self.collision_count = 0

    def poor_hash(self, key):
        """Poor hash function - high collision rate"""
        # Always returns same value for even keys
        return hash(key) % 2

    def good_hash(self, key):
        """Better hash function - lower collision rate"""
        return hash(key) % self.size

    def insert(self, key, value, use_poor_hash=False):
        """Insert with collision tracking"""
        if use_poor_hash:
            index = self.poor_hash(key)
        else:
            index = self.good_hash(key)

        # Check for collision (bucket already has items)
        if self.table[index]:
            self.collision_count += 1
            print(f"Collision at index {index}: {key}")

        self.table[index].append((key, value))

    def analyze_distribution(self):
        """Analyze how keys are distributed"""
        bucket_sizes = [len(bucket) for bucket in self.table]
        max_bucket = max(bucket_sizes)
        min_bucket = min(bucket_sizes)
        avg_bucket = sum(bucket_sizes) / len(bucket_sizes)

        empty_buckets = bucket_sizes.count(0)
        load_factor = sum(bucket_sizes) / self.size

        return {
            'max_bucket_size': max_bucket,
            'min_bucket_size': min_bucket,
            'avg_bucket_size': avg_bucket,
            'empty_buckets': empty_buckets,
            'load_factor': load_factor,
            'total_collisions': self.collision_count
        }

    def display_table(self):
        """Display hash table distribution"""
        print("Hash Table Distribution:")
        print("-" * 30)
        for i, bucket in enumerate(self.table):
            if bucket:
                print(f"Index {i}: {len(bucket)} items - {bucket}")
            else:
                print(f"Index {i}: Empty")

# Test with different hash functions
print("Hash Table Collision Analysis")
print("=" * 50)

# Generate test data
test_keys = [f"key_{i}" for i in range(15)]
random.shuffle(test_keys)

print("Test Keys:", test_keys[:10], "...")

# Test poor hash function
print("\nTesting POOR hash function:")
poor_table = HashTableAnalyzer(10)
for key in test_keys:
    poor_table.insert(key, f"value_{key}", use_poor_hash=True)

poor_stats = poor_table.analyze_distribution()
print(f"Poor hash results:")
print(f"- Max bucket size: {poor_stats['max_bucket_size']}")
print(f"- Empty buckets: {poor_stats['empty_buckets']}")
print(f"- Total collisions: {poor_stats['total_collisions']}")
print(f"- Load factor: {poor_stats['load_factor']:.2f}")

# Test good hash function
print("\nTesting GOOD hash function:")
good_table = HashTableAnalyzer(10)
for key in test_keys:
    good_table.insert(key, f"value_{key}", use_poor_hash=False)

good_stats = good_table.analyze_distribution()
print(f"Good hash results:")
print(f"- Max bucket size: {good_stats['max_bucket_size']}")
print(f"- Empty buckets: {good_stats['empty_buckets']}")
print(f"- Total collisions: {good_stats['total_collisions']}")
print(f"- Load factor: {good_stats['load_factor']:.2f}")

print(f"\nPoor hash table distribution:")
poor_table.display_table()

print(f"\nKey Insights:")
print(f"- Poor hash function: {poor_stats['total_collisions']} collisions")
print(f"- Good hash function: {good_stats['total_collisions']} collisions")
print(f"- Good distribution minimizes collisions and maximizes performance")
print(f"- Hash table performance depends heavily on hash function quality!")

# Demonstrate load factor effects
print(f"\nLoad Factor Demonstration:")
print(f"- Poor hash load factor: {poor_stats['load_factor']:.2f} (clustered)")
print(f"- Good hash load factor: {good_stats['load_factor']:.2f} (well-distributed)")
print(f"- Lower max bucket size = Better performance")`
    }
  ]
};

