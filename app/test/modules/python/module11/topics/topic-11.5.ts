import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_5: SubLesson = {
  id: "11.5",
  title: 'Hash Table Applications',
  status: 'demo',
  content: "`# ðŸŽ¯ Hash Table Applications

Hash tables power countless real-world applications. They're everywhere in modern computing - from databases to web browsers!

---

## ðŸ—„ï¸ Database Indexing

### **Primary Key Lookups**
\`"\`\`python
class SimpleDatabase:
    def __init__(self):
        self.primary_index = {}  # ID -> Record
        self.name_index = {}     # Name -> ID(s)

    def insert(self, record):
        record_id = record['id']

        # Primary index (hash table)
        self.primary_index[record_id] = record

        # Secondary index (name to IDs)
        name = record['name']
        if name not in self.name_index:
            self.name_index[name] = []
        self.name_index[name].append(record_id)

    def find_by_id(self, record_id):
        """O(1) lookup by primary key"""
        return self.primary_index.get(record_id)

    def find_by_name(self, name):
        """Find all records with name"""
        ids = self.name_index.get(name, [])
        return [self.primary_index[id] for id in ids]

# Usage
db = SimpleDatabase()

db.insert({"id": 1, "name": "Alice", "age": 25})
db.insert({"id": 2, "name": "Bob", "age": 30})
db.insert({"id": 3, "name": "Alice", "age": 35})

print("Find by ID:")
alice_record = db.find_by_id(1)
print(f"ID 1: {alice_record}")

print("\nFind by name:")
alice_records = db.find_by_name("Alice")
for record in alice_records:
    print(f"  {record}")
\`\`\`

### **Cache Systems**
\`\`\`python
class LRUCache:
    def __init__(self, capacity=100):
        self.capacity = capacity
        self.cache = {}  # key -> value
        self.access_time = {}  # key -> timestamp
        self.current_time = 0

    def get(self, key):
        if key in self.cache:
            self.access_time[key] = self.current_time
            self.current_time += 1
            return self.cache[key]
        return None

    def put(self, key, value):
        if key in self.cache:
            # Update existing
            self.cache[key] = value
            self.access_time[key] = self.current_time
        else:
            # Check capacity
            if len(self.cache) >= self.capacity:
                # Remove least recently used
                lru_key = min(self.access_time.keys(),
                            key=lambda k: self.access_time[k])
                del self.cache[lru_key]
                del self.access_time[lru_key]

            self.cache[key] = value
            self.access_time[key] = self.current_time

        self.current_time += 1

# Web page cache simulation
cache = LRUCache(capacity=3)

# Load pages
cache.put("home", "<html>Home Page</html>")
cache.put("about", "<html>About Us</html>")
cache.put("contact", "<html>Contact</html>")

# Access pages (updates LRU order)
print(f"Home page: {len(cache.get('home'))} chars")
print(f"About page: {len(cache.get('about'))} chars")

# Add new page (should evict contact)
cache.put("products", "<html>Products</html>")
print(f"Contact still cached: {'contact' in cache.cache}")
print(f"Products cached: {'products' in cache.cache}")
\`\`\`

---

## ðŸŒ Web Applications

### **Session Management**
\`\`\`python
class SessionManager:
    def __init__(self):
        self.sessions = {}  # session_id -> session_data
        self.user_sessions = {}  # user_id -> session_id

    def create_session(self, user_id):
        """Create new session for user"""
        import uuid
        session_id = str(uuid.uuid4())

        session_data = {
            "user_id": user_id,
            "created": "2024-01-15T10:00:00",
            "last_activity": "2024-01-15T10:00:00",
            "data": {}
        }

        self.sessions[session_id] = session_data
        self.user_sessions[user_id] = session_id

        return session_id

    def get_session(self, session_id):
        """Get session data"""
        return self.sessions.get(session_id)

    def update_session(self, session_id, data):
        """Update session data"""
        if session_id in self.sessions:
            self.sessions[session_id]["data"].update(data)
            self.sessions[session_id]["last_activity"] = "2024-01-15T10:30:00"

    def end_session(self, session_id):
        """End user session"""
        if session_id in self.sessions:
            user_id = self.sessions[session_id]["user_id"]
            del self.sessions[session_id]
            if user_id in self.user_sessions:
                del self.user_sessions[user_id]

# Usage
manager = SessionManager()

# User logs in
session_id = manager.create_session("user123")
print(f"Created session: {session_id}")

# User performs actions
manager.update_session(session_id, {"cart": ["item1", "item2"]})
manager.update_session(session_id, {"preferences": {"theme": "dark"}})

# Get session data
session = manager.get_session(session_id)
print(f"Session data: {session}")

# User logs out
manager.end_session(session_id)
print(f"Session exists: {session_id in manager.sessions}")
\`\`\`

### **URL Routing**
\`\`\`python
class URLRouter:
    def __init__(self):
        self.routes = {}  # path -> handler_function

    def add_route(self, path, handler):
        """Add route mapping"""
        self.routes[path] = handler

    def handle_request(self, path, method="GET"):
        """Handle HTTP request"""
        handler = self.routes.get(path)
        if handler:
            return handler(method)
        else:
            return "404 Not Found"

# Define route handlers
def home_handler(method):
    return f"<h1>Home Page</h1><p>Method: {method}</p>"

def about_handler(method):
    return f"<h1>About Us</h1><p>Method: {method}</p>"

def api_handler(method):
    if method == "GET":
        return '{"status": "success", "data": []}'
    elif method == "POST":
        return '{"status": "created", "id": 123}'
    return '{"status": "method not allowed"}'

# Set up router
router = URLRouter()
router.add_route("/", home_handler)
router.add_route("/about", about_handler)
router.add_route("/api/data", api_handler)

# Handle requests
print("GET /:", router.handle_request("/"))
print("POST /api/data:", router.handle_request("/api/data", "POST"))
print("GET /contact:", router.handle_request("/contact"))
\`\`\`

---

## ðŸ” Data Analysis & Processing

### **Word Frequency Analysis**
\`\`\`python
def analyze_text(text):
    """Analyze text using hash tables."""
    # Word frequency
    word_freq = {}
    # Character frequency
    char_freq = {}
    # Word positions
    word_positions = {}

    words = text.lower().split()

    for i, word in enumerate(words):
        # Clean word
        word = word.strip('.,!?;:"')

        # Word frequency
        word_freq[word] = word_freq.get(word, 0) + 1

        # Word positions
        if word not in word_positions:
            word_positions[word] = []
        word_positions[word].append(i)

    # Character frequency
    for char in text.lower():
        if char.isalpha():
            char_freq[char] = char_freq.get(char, 0) + 1

    return {
        "word_count": len(words),
        "unique_words": len(word_freq),
        "most_common_word": max(word_freq.items(), key=lambda x: x[1]),
        "most_common_char": max(char_freq.items(), key=lambda x: x[1]),
        "word_positions": word_positions
    }

text = "The quick brown fox jumps over the lazy dog. The fox is quick!"
analysis = analyze_text(text)

print("Text Analysis:")
print(f"  Total words: {analysis['word_count']}")
print(f"  Unique words: {analysis['unique_words']}")
print(f"  Most common word: {analysis['most_common_word']}")
print(f"  Most common char: {analysis['most_common_char']}")
\`\`\`

### **Duplicate Detection**
\`\`\`python
def find_duplicates(items):
    """Find all duplicate items using hash table."""
    seen = set()
    duplicates = set()

    for item in items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)

    return duplicates

def remove_duplicates(items):
    """Remove duplicates while preserving order."""
    seen = set()
    result = []

    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)

    return result

# Test with various data types
data = [1, 2, 3, 2, 4, 5, 3, 6, "apple", "banana", "apple"]
duplicates = find_duplicates(data)
cleaned = remove_duplicates(data)

print(f"Original: {data}")
print(f"Duplicates: {duplicates}")
print(f"Cleaned: {cleaned}")
\`\`\`

---

## ðŸŽ® Game Development

### **Entity Management**
\`\`\`python
class GameWorld:
    def __init__(self):
        self.entities = {}  # entity_id -> entity_data
        self.entities_by_type = {}  # entity_type -> [entity_ids]

    def add_entity(self, entity_id, entity_type, data):
        """Add game entity."""
        self.entities[entity_id] = {
            "type": entity_type,
            "data": data,
            "position": (0, 0),
            "active": True
        }

        # Index by type
        if entity_type not in self.entities_by_type:
            self.entities_by_type[entity_type] = []
        self.entities_by_type[entity_type].append(entity_id)

    def get_entity(self, entity_id):
        """Get entity by ID."""
        return self.entities.get(entity_id)

    def get_entities_by_type(self, entity_type):
        """Get all entities of specific type."""
        entity_ids = self.entities_by_type.get(entity_type, [])
        return [self.entities[eid] for eid in entity_ids if self.entities[eid]["active"]]

    def remove_entity(self, entity_id):
        """Remove entity from game."""
        if entity_id in self.entities:
            entity_type = self.entities[entity_id]["type"]
            self.entities[entity_id]["active"] = False

            # Remove from type index
            if entity_type in self.entities_by_type:
                self.entities_by_type[entity_type] = [
                    eid for eid in self.entities_by_type[entity_type]
                    if eid != entity_id
                ]

# Game simulation
world = GameWorld()

world.add_entity("player_1", "player", {"health": 100, "score": 0})
world.add_entity("enemy_1", "enemy", {"health": 50, "damage": 10})
world.add_entity("enemy_2", "enemy", {"health": 75, "damage": 15})
world.add_entity("item_1", "item", {"type": "health_potion", "value": 25})

print("All players:", world.get_entities_by_type("player"))
print("All enemies:", world.get_entities_by_type("enemy"))
print("All items:", world.get_entities_by_type("item"))

# Remove enemy
world.remove_entity("enemy_1")
print("Enemies after removal:", world.get_entities_by_type("enemy"))
\`\`\`

### **Inventory System**
\`\`\`python
class Inventory:
    def __init__(self, max_slots=20):
        self.items = {}  # item_name -> {"count": n, "max_stack": m}
        self.max_slots = max_slots

    def add_item(self, item_name, count=1, max_stack=64):
        """Add items to inventory."""
        if len(self.items) >= self.max_slots and item_name not in self.items:
            return False  # No space for new item type

        if item_name not in self.items:
            self.items[item_name] = {"count": 0, "max_stack": max_stack}

        # Calculate how many can be added
        current_count = self.items[item_name]["count"]
        max_stack = self.items[item_name]["max_stack"]
        space_available = max_stack - current_count

        if space_available <= 0:
            return False  # Stack is full

        # Add as many as possible
        to_add = min(count, space_available)
        self.items[item_name]["count"] += to_add

        return to_add == count  # True if all items added

    def remove_item(self, item_name, count=1):
        """Remove items from inventory."""
        if item_name not in self.items:
            return False

        if self.items[item_name]["count"] >= count:
            self.items[item_name]["count"] -= count
            if self.items[item_name]["count"] == 0:
                del self.items[item_name]
            return True

        return False

    def get_item_count(self, item_name):
        """Get count of specific item."""
        return self.items.get(item_name, {"count": 0})["count"]

# Game inventory
inventory = Inventory()

inventory.add_item("sword", 1, 1)  # Unique item
inventory.add_item("potion", 10, 20)  # Stackable
inventory.add_item("gold", 50, 100)  # Currency

print(f"Sword count: {inventory.get_item_count('sword')}")
print(f"Potion count: {inventory.get_item_count('potion')}")
print(f"Gold count: {inventory.get_item_count('gold')}")

inventory.remove_item("potion", 5)
print(f"Potion count after using 5: {inventory.get_item_count('potion')}")
\`\`\`

---

## ðŸ”§ System Programming

### **Symbol Tables**
\`\`\`python
class SymbolTable:
    def __init__(self):
        self.symbols = {}  # name -> symbol_info
        self.scopes = []   # Stack of scopes

    def enter_scope(self):
        """Enter new scope."""
        self.scopes.append({})

    def exit_scope(self):
        """Exit current scope."""
        if self.scopes:
            self.scopes.pop()

    def define_symbol(self, name, symbol_type, value=None):
        """Define symbol in current scope."""
        if not self.scopes:
            self.enter_scope()

        current_scope = self.scopes[-1]
        current_scope[name] = {
            "type": symbol_type,
            "value": value,
            "scope_level": len(self.scopes) - 1
        }

    def lookup_symbol(self, name):
        """Look up symbol starting from current scope."""
        # Search from innermost to outermost scope
        for scope in reversed(self.scopes):
            if name in scope:
                return scope[name]
        return None

# Compiler symbol table simulation
symbols = SymbolTable()

# Global scope
symbols.define_symbol("print", "function", "built-in")
symbols.define_symbol("x", "variable", 42)

print("Global lookup x:", symbols.lookup_symbol("x"))

# Function scope
symbols.enter_scope()
symbols.define_symbol("y", "variable", 100)
symbols.define_symbol("x", "parameter", 50)  # Shadows global x

print("Function lookup x:", symbols.lookup_symbol("x"))
print("Function lookup y:", symbols.lookup_symbol("y"))

symbols.exit_scope()
print("Back to global x:", symbols.lookup_symbol("x"))
\`\`\`

Hash tables are fundamental to modern software systems - they're everywhere! ðŸ—ï¸`
};


