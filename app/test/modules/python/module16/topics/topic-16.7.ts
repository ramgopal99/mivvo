import { SubLesson } from '../../../../data/lessonsData';

export const topic_16_7: SubLesson = {
  id: "16.7",
  title: 'Context Managers',
  status: 'demo',
  content: "`# ðŸ” Context Managers

Context managers are Python's mechanism for resource management, ensuring that resources like files, database connections, and locks are properly acquired and released. The \`"with\` statement provides a clean, exception-safe way to handle resource management. Let's explore this essential Python feature!

---

## ðŸŽ¯ What are Context Managers?

**Context managers** are objects that define the methods \`__enter__()\` and \`__exit__()\` to set up and tear down resources. They work with the \`with\` statement to ensure proper resource cleanup.

### **Why Use Context Managers?**
- **Automatic resource cleanup** - No need to manually close files/connections
- **Exception safety** - Resources cleaned up even if exceptions occur
- **Cleaner code** - Eliminates boilerplate resource management
- **Reusable** - Can be used across different parts of code

---

## ðŸ’» The \`with\` Statement

### **Basic File Operations**
\`\`\`python
# Traditional approach (error-prone)
file = open("example.txt", "r")
try:
    content = file.read()
    print(content)
finally:
    file.close()  # Must remember to close!

# Context manager approach (safe and clean)
with open("example.txt", "r") as file:
    content = file.read()
    print(content)
# File automatically closed here
\`\`\`

### **Multiple Context Managers**
\`\`\`python
# Multiple files
with open("input.txt", "r") as input_file, open("output.txt", "w") as output_file:
    content = input_file.read()
    output_file.write(content.upper())

# Nested context managers
with open("file1.txt", "r") as f1:
    with open("file2.txt", "w") as f2:
        f2.write(f1.read())
\`\`\`

---

## ðŸ”§ Creating Custom Context Managers

### **Class-Based Context Manager**
\`\`\`python
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
    
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file  # This becomes the 'as' variable
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # Return False to propagate exceptions, True to suppress
        return False

# Usage
with FileManager("example.txt", "w") as f:
    f.write("Hello, World!")

# File is automatically closed
\`\`\`

### **Context Manager with Exception Handling**
\`\`\`python
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string
        self.connection = None
    
    def __enter__(self):
        # Simulate database connection
        print(f"Connecting to {self.connection_string}")
        self.connection = f"Connection to {self.connection_string}"
        return self.connection
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection")
        if exc_type:
            print(f"Exception occurred: {exc_val}")
            # Could log error, rollback transaction, etc.
        self.connection = None
        return False  # Don't suppress exceptions

# Usage
with DatabaseConnection("postgresql://localhost/mydb") as conn:
    print(f"Using {conn}")
    # Simulate an operation that might fail
    # raise ValueError("Something went wrong!")

print("Connection closed")
\`\`\`

---

## âš¡ Generator-Based Context Managers

### **Using @contextmanager Decorator**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    try:
        yield  # Code in 'with' block executes here
    finally:
        end = time.time()
        print(f"Elapsed time: {end - start:.2f} seconds")

# Usage
with timer():
    import time
    time.sleep(1)
    print("Doing some work...")
# Output: Doing some work...
#         Elapsed time: 1.00 seconds
\`\`\`

### **File Operations with Context Manager**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def open_file(filename, mode):
    try:
        file = open(filename, mode)
        yield file
    finally:
        file.close()

# Usage
with open_file("example.txt", "w") as f:
    f.write("Hello from context manager!")

# File is automatically closed
\`\`\`

### **Database Transaction Context Manager**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def database_transaction(connection):
    try:
        # Begin transaction
        print("Beginning transaction")
        yield connection
        # Commit if no exceptions
        print("Committing transaction")
    except Exception as e:
        # Rollback on error
        print(f"Rolling back transaction due to: {e}")
        raise

# Usage
class MockConnection:
    pass

conn = MockConnection()
try:
    with database_transaction(conn) as db:
        print("Performing database operations...")
        # raise ValueError("Simulated error")
        print("Operations completed successfully")
except ValueError as e:
    print(f"Transaction failed: {e}")
\`\`\`

---

## ðŸŽ¨ Built-in Context Managers

### **File Objects**
\`\`\`python
# Files are context managers
with open("example.txt", "r") as file:
    content = file.read()
# Automatically closed

# Multiple file operations
with open("input.txt", "r") as input_file, \\
     open("output.txt", "w") as output_file:
    output_file.write(input_file.read().upper())
\`\`\`

### **threading.Lock**
\`\`\`python
import threading

lock = threading.Lock()

def thread_safe_operation():
    with lock:
        # Critical section - only one thread at a time
        print("Thread-safe operation")
        # Shared resource access here

# Usage
thread_safe_operation()
\`\`\`

### **decimal.localcontext**
\`\`\`python
import decimal

# Change decimal precision temporarily
with decimal.localcontext() as ctx:
    ctx.prec = 4  # Set precision to 4 decimal places
    result = decimal.Decimal('1') / decimal.Decimal('3')
    print(result)  # 0.3333

# Outside context, precision returns to default
result2 = decimal.Decimal('1') / decimal.Decimal('3')
print(result2)  # 0.333333333333333314829616256247390992939472198486328125
\`\`\`

---

## ðŸ”§ Advanced Context Manager Patterns

### **Context Manager with Parameters**
\`\`\`python
from contextlib import contextmanager

@contextmanager
def temporary_precision(precision):
    import decimal
    original_prec = decimal.getcontext().prec
    decimal.getcontext().prec = precision
    try:
        yield
    finally:
        decimal.getcontext().prec = original_prec

# Usage
import decimal

print(f"Default precision: {decimal.Decimal('1') / decimal.Decimal('7')}")

with temporary_precision(4):
    result = decimal.Decimal('1') / decimal.Decimal('7')
    print(f"Custom precision: {result}")

print(f"Back to default: {decimal.Decimal('1') / decimal.Decimal('7')}")
\`\`\`

### **Context Manager Factory**
\`\`\`python
from contextlib import contextmanager

def temporary_value(obj, attr, temp_value):
    @contextmanager
    def context():
        original = getattr(obj, attr)
        setattr(obj, attr, temp_value)
        try:
            yield
        finally:
            setattr(obj, attr, original)
    return context()

class Config:
    def __init__(self):
        self.debug = False
        self.timeout = 30

config = Config()

# Temporarily change config values
with temporary_value(config, 'debug', True):
    print(f"Debug mode: {config.debug}")  # True

print(f"Debug mode: {config.debug}")      # False (back to original)
\`\`\`

---

## ðŸ§ª Practical Examples

### **Example 1: Temporary File Creation**
\`\`\`python
import tempfile
import os

class TempFile:
    def __init__(self, content=""):
        self.content = content
        self.filename = None
    
    def __enter__(self):
        # Create temporary file
        fd, self.filename = tempfile.mkstemp()
        with os.fdopen(fd, 'w') as f:
            f.write(self.content)
        return self.filename
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        # Clean up temporary file
        if self.filename and os.path.exists(self.filename):
            os.unlink(self.filename)

# Usage
with TempFile("Temporary content") as temp_file:
    print(f"Created temp file: {temp_file}")
    with open(temp_file, 'r') as f:
        print(f"Content: {f.read()}")

# File automatically deleted
print("Temp file cleaned up")
\`\`\`

### **Example 2: Logging Context**
\`\`\`python
from contextlib import contextmanager
import logging

@contextmanager
def logging_context(logger_name, level):
    logger = logging.getLogger(logger_name)
    original_level = logger.level
    logger.setLevel(level)
    
    try:
        yield logger
    finally:
        logger.setLevel(original_level)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("my_app")

# Usage
with logging_context("my_app", logging.DEBUG) as debug_logger:
    debug_logger.debug("This debug message will show")
    debug_logger.info("This info message will show")

# Back to original level
logger.debug("This debug message won't show (level is INFO)")
logger.info("This info message will show")
\`\`\`

### **Example 3: Performance Monitoring**
\`\`\`python
from contextlib import contextmanager
import time
import psutil
import os

@contextmanager
def performance_monitor(operation_name):
    start_time = time.time()
    start_memory = psutil.Process(os.getpid()).memory_info().rss / 1024 / 1024  # MB
    
    try:
        yield
    finally:
        end_time = time.time()
        end_memory = psutil.Process(os.getpid()).memory_info().rss / 1024 / 1024  # MB
        
        print(f"Operation: {operation_name}")
        print(".2f")
        print("+.2f")

# Usage (requires psutil: pip install psutil)
try:
    with performance_monitor("Large computation"):
        # Simulate work
        result = sum(x**2 for x in range(100000))
        print(f"Result: {result}")
except ImportError:
    print("psutil not available - install with: pip install psutil")
\`\`\`

---

## ðŸŽ¯ contextlib Utilities

### **closing()**
\`\`\`python
from contextlib import closing

class Resource:
    def __init__(self):
        self.opened = True
    
    def close(self):
        self.opened = False
        print("Resource closed")

# Without context manager support
resource = Resource()
try:
    print(f"Resource opened: {resource.opened}")
finally:
    resource.close()

# With closing()
from contextlib import closing
with closing(Resource()) as resource:
    print(f"Resource opened: {resource.opened}")
# Automatically calls close()
\`\`\`

### **suppress()**
\`\`\`python
from contextlib import suppress

# Suppress specific exceptions
with suppress(FileNotFoundError):
    with open("nonexistent_file.txt", "r") as f:
        content = f.read()

print("Program continues - exception was suppressed")

# Suppress multiple exception types
with suppress(FileNotFoundError, PermissionError):
    # Code that might raise these exceptions
    pass
\`\`\`

### **redirect_stdout/stderr**
\`\`\`python
from contextlib import redirect_stdout, redirect_stderr
import io

# Capture stdout
stdout_capture = io.StringIO()
with redirect_stdout(stdout_capture):
    print("This will be captured")
    print("So will this")

captured_output = stdout_capture.getvalue()
print(f"Captured: {repr(captured_output)}")

# Capture stderr
stderr_capture = io.StringIO()
with redirect_stderr(stderr_capture):
    import sys
    print("Error message", file=sys.stderr)

error_output = stderr_capture.getvalue()
print(f"Errors: {repr(error_output)}")
\`\`\`

---

## ðŸš€ Async Context Managers (Python 3.7+)

### **Async Context Managers**
\`\`\`python
import asyncio

class AsyncResource:
    async def __aenter__(self):
        print("Acquiring async resource")
        await asyncio.sleep(0.1)  # Simulate async operation
        return "async_resource"
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Releasing async resource")
        await asyncio.sleep(0.1)  # Simulate cleanup
        return False

async def async_operation():
    async with AsyncResource() as resource:
        print(f"Using {resource}")
        await asyncio.sleep(0.5)

# Usage
asyncio.run(async_operation())
\`\`\`

### **@asynccontextmanager**
\`\`\`python
from contextlib import asynccontextmanager

@asynccontextmanager
async def async_timer():
    import time
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        print(f"Async operation took {end - start:.2f} seconds")

async def async_task():
    async with async_timer():
        await asyncio.sleep(1)
        print("Async work done")

asyncio.run(async_task())
\`\`\`

---

## ðŸ† Best Practices

### **When to Use Context Managers**
\`\`\`python
# âœ… Good use cases
# 1. Resource management (files, connections, locks)
with open("file.txt", "r") as f:
    data = f.read()

# 2. Temporary state changes
with decimal.localcontext() as ctx:
    ctx.prec = 10
    # Calculations here

# 3. Setup/teardown operations
@contextmanager
def database_connection(db_url):
    conn = create_connection(db_url)
    try:
        yield conn
    finally:
        conn.close()

# âŒ Avoid overusing for simple cases
# Don't do this:
with open("file.txt", "r") as f:
    print(f.read())  # Simple enough without context manager

# Better as regular code for simple cases
\`\`\`

### **Error Handling in Context Managers**
\`\`\`python
class SafeResource:
    def __enter__(self):
        print("Acquiring resource")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Cleaning up resource")
        if exc_type:
            print(f"Exception occurred: {exc_val}")
            # Handle cleanup based on exception
            return False  # Propagate exception
        return True  # Suppress exception if desired

# Usage
with SafeResource() as res:
    print("Doing work...")
    # raise ValueError("Test exception")
    print("Work completed")
\`\`\`

---

## ðŸš€ Key Takeaways

1. **Context managers** ensure proper resource cleanup using \`with\` statement
2. **\`__enter__()\`** and **\`__exit__()\`** methods define context manager behavior
3. **\`@contextmanager\`** decorator creates context managers from generator functions
4. **Exception safety** - resources cleaned up even when errors occur
5. **Built-in context managers** include files, locks, and decimal contexts
6. **Async context managers** available for asynchronous code
7. **contextlib** provides utilities like \`closing()\`, \`suppress()\`, and redirection

**Context managers make resource management elegant, safe, and maintainable. They're essential for writing robust Python code! ðŸ”**`
};


