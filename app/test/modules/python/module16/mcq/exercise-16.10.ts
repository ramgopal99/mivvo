import { Exercise } from '../../../../data/lessonsData';

export const exercise_16_10: Exercise = {
  id: "16.10",
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Implement and demonstrate decorators, generators, and context managers:\n1. Create a timing decorator that measures function execution time\n2. Implement a generator that yields Fibonacci numbers with memoization\n3. Create a custom context manager for file operations\n4. Build a retry decorator that retries failed operations\n5. Demonstrate all concepts with comprehensive examples",
      solution: `# Advanced Python Concepts: Decorators, Generators, and Context Managers

import time
import functools
from contextlib import contextmanager

# 1. Timing Decorator
def timing_decorator(func):
    """Decorator that times function execution"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds")
        return result
    return wrapper

# 2. Fibonacci Generator with Memoization
def fibonacci_generator(limit=None):
    """Generator for Fibonacci numbers with memoization"""
    memo = {0: 0, 1: 1}
    a, b = 0, 1
    count = 0

    while limit is None or count < limit:
        if count in memo:
            yield memo[count]
        else:
            memo[count] = a
            yield a
        a, b = b, a + b
        count += 1

# 3. Custom Context Manager
class FileManager:
    """Custom context manager for file operations"""
    def __init__(self, filename, mode='r'):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        print(f"Opened file: {self.filename}")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
            print(f"Closed file: {self.filename}")
        if exc_type:
            print(f"Exception occurred: {exc_val}")
        return False  # Don't suppress exceptions

# Context manager decorator
@contextmanager
def database_connection(db_name):
    """Context manager for database connections (simulated)"""
    print(f"Connecting to database: {db_name}")
    connection = {"connected": True, "name": db_name}
    try:
        yield connection
    finally:
        print(f"Disconnecting from database: {db_name}")
        connection["connected"] = False

# 4. Retry Decorator
def retry_decorator(max_attempts=3, delay=1):
    """Decorator that retries function calls on failure"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            attempts = 0
            while attempts < max_attempts:
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    attempts += 1
                    if attempts == max_attempts:
                        raise e
                    print(f"Attempt {attempts} failed: {e}. Retrying in {delay} seconds...")
                    time.sleep(delay)
            return None
        return wrapper
    return decorator

# 5. Comprehensive Demonstration
@timing_decorator
def expensive_operation(n):
    """Simulate an expensive operation"""
    time.sleep(0.1 * n)
    return sum(i**2 for i in range(n))

@retry_decorator(max_attempts=3, delay=0.5)
def unreliable_operation():
    """Simulate an operation that might fail"""
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise ValueError("Random failure occurred")
    return "Operation succeeded!"

def main():
    print("=== Advanced Python Concepts Demonstration ===\n")

    # 1. Timing Decorator
    print("1. Timing Decorator:")
    result = expensive_operation(5)
    print(f"Result: {result}\n")

    # 2. Fibonacci Generator
    print("2. Fibonacci Generator:")
    fib_gen = fibonacci_generator(10)
    fib_numbers = list(fib_gen)
    print(f"First 10 Fibonacci numbers: {fib_numbers}\n")

    # 3. Custom Context Manager
    print("3. Custom Context Manager:")
    # Using class-based context manager
    with FileManager("sample.txt", "w") as f:
        f.write("Hello, World!\n")
        f.write("This is a test file.\n")

    # Using context manager decorator
    with database_connection("mydb") as conn:
        print(f"Database connection status: {conn['connected']}")
        # Simulate database operations
        time.sleep(0.1)

    print()

    # 4. Retry Decorator
    print("4. Retry Decorator:")
    try:
        result = unreliable_operation()
        print(f"Final result: {result}")
    except ValueError as e:
        print(f"All attempts failed: {e}")

    print("\n=== Advanced Concepts Summary ===")
    print("✓ Decorators: Extend function behavior without modification")
    print("✓ Generators: Memory-efficient iteration with yield")
    print("✓ Context Managers: Automatic resource management")
    print("✓ Memoization: Caching expensive computations")
    print("✓ Error Handling: Robust retry mechanisms")

if __name__ == "__main__":
    main()`
    },
    {
      id: "ex2",
      question: "Implement metaclasses, custom descriptors, and advanced OOP patterns:\n1. Create a metaclass that automatically adds timestamps to classes\n2. Implement custom property descriptors with validation\n3. Build a Singleton pattern using metaclasses\n4. Create a registry system for automatic class registration\n5. Demonstrate advanced OOP concepts with practical examples",
      solution: `# Advanced OOP: Metaclasses, Descriptors, and Design Patterns

import time
from functools import wraps

# 1. Timestamp Metaclass
class TimestampMeta(type):
    """Metaclass that adds creation timestamp to classes"""
    def __new__(cls, name, bases, namespace, **kwargs):
        # Add timestamp when class is created
        namespace['_creation_time'] = time.time()
        namespace['_class_name'] = name

        # Add instance counter
        namespace['_instance_count'] = 0

        return super().__new__(cls, name, bases, namespace)

    def __call__(cls, *args, **kwargs):
        # Increment instance counter
        cls._instance_count += 1
        instance = super().__call__(*args, **kwargs)

        # Add creation timestamp to instance
        instance._instance_creation_time = time.time()
        instance._instance_id = cls._instance_count

        return instance

# 2. Custom Property Descriptor with Validation
class ValidatedProperty:
    """Descriptor that validates property values"""

    def __init__(self, validator=None, default=None):
        self.validator = validator
        self.default = default
        self.name = None

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, instance, owner):
        if instance is None:
            return self
        return instance.__dict__.get(self.name, self.default)

    def __set__(self, instance, value):
        if self.validator and not self.validator(value):
            raise ValueError(f"Invalid value for {self.name}: {value}")
        instance.__dict__[self.name] = value

# Validators
def positive_validator(value):
    return isinstance(value, (int, float)) and value > 0

def email_validator(value):
    return isinstance(value, str) and '@' in value and '.' in value

def age_validator(value):
    return isinstance(value, int) and 0 <= value <= 150

# 3. Singleton Metaclass
class SingletonMeta(type):
    """Metaclass for Singleton pattern"""
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

# 4. Registry System
class RegistryMeta(type):
    """Metaclass that automatically registers classes"""
    registry = {}

    def __new__(cls, name, bases, namespace, **kwargs):
        new_class = super().__new__(cls, name, bases, namespace)

        # Register the class
        if hasattr(new_class, '_register') and new_class._register:
            cls.registry[name.lower()] = new_class

        return new_class

    @classmethod
    def get_registered_class(cls, name):
        """Get a registered class by name"""
        return cls.registry.get(name.lower())

    @classmethod
    def list_registered_classes(cls):
        """List all registered classes"""
        return list(cls.registry.keys())

# Using the metaclasses and descriptors
class TimestampedClass(metaclass=TimestampMeta):
    """Class that gets automatic timestamps"""
    def __init__(self, name):
        self.name = name

    def get_info(self):
        return f"Instance {self._instance_id} of {self._class_name}"

class ValidatedPerson:
    """Person class with validated properties"""
    age = ValidatedProperty(age_validator, 0)
    salary = ValidatedProperty(positive_validator, 0.0)
    email = ValidatedProperty(email_validator, "")

    def __init__(self, name, age, salary, email):
        self.name = name
        self.age = age
        self.salary = salary
        self.email = email

class SingletonLogger(metaclass=SingletonMeta):
    """Singleton logger class"""
    def __init__(self):
        self.logs = []

    def log(self, message):
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f"[{timestamp}] {message}"
        self.logs.append(log_entry)
        print(log_entry)

    def get_logs(self):
        return self.logs.copy()

class PluginBase(metaclass=RegistryMeta):
    """Base class for plugins with automatic registration"""
    _register = False  # Subclasses can set this to True

    def execute(self):
        raise NotImplementedError("Subclasses must implement execute method")

class CalculatorPlugin(PluginBase):
    _register = True

    def execute(self):
        return "Calculator functionality"

class TextEditorPlugin(PluginBase):
    _register = True

    def execute(self):
        return "Text editor functionality"

class UnregisteredPlugin(PluginBase):
    # This won't be registered
    def execute(self):
        return "Unregistered plugin"

# Demonstration
def main():
    print("=== Advanced OOP Concepts Demonstration ===\n")

    # 1. Timestamp Metaclass
    print("1. Timestamp Metaclass:")
    obj1 = TimestampedClass("Object 1")
    time.sleep(0.001)  # Small delay
    obj2 = TimestampedClass("Object 2")

    print(f"Class created at: {time.ctime(obj1._creation_time)}")
    print(f"Object 1: {obj1.get_info()}")
    print(f"Object 2: {obj2.get_info()}")
    print(f"Total instances created: {TimestampedClass._instance_count}\n")

    # 2. Validated Properties
    print("2. Validated Properties:")
    try:
        person = ValidatedPerson("Alice", 30, 50000, "alice@example.com")
        print(f"Created person: {person.name}, age: {person.age}")

        # Test validation
        person.age = 25  # Valid
        print(f"Updated age: {person.age}")

        person.age = -5  # Invalid
    except ValueError as e:
        print(f"Validation error: {e}")

    try:
        person.email = "invalid-email"  # Invalid
    except ValueError as e:
        print(f"Validation error: {e}")

    print()

    # 3. Singleton Pattern
    print("3. Singleton Pattern:")
    logger1 = SingletonLogger()
    logger1.log("First log message")

    logger2 = SingletonLogger()  # Same instance
    logger2.log("Second log message")

    print(f"Same instance: {logger1 is logger2}")
    print(f"All logs: {logger1.get_logs()}\n")

    # 4. Registry System
    print("4. Registry System:")
    print(f"Registered classes: {RegistryMeta.list_registered_classes()}")

    # Get registered classes
    calc_class = RegistryMeta.get_registered_class("calculatorplugin")
    if calc_class:
        calc_instance = calc_class()
        print(f"Calculator plugin: {calc_instance.execute()}")

    text_class = RegistryMeta.get_registered_class("texteditorplugin")
    if text_class:
        text_instance = text_class()
        print(f"Text editor plugin: {text_instance.execute()}")

    # Try to get unregistered class
    unreg_class = RegistryMeta.get_registered_class("unregisteredplugin")
    print(f"Unregistered class found: {unreg_class is not None}")

    print("\n=== Advanced OOP Concepts Summary ===")
    print("✓ Metaclasses: Classes that create classes")
    print("✓ Descriptors: Custom property behavior")
    print("✓ Singleton: One instance per class")
    print("✓ Registry: Automatic class registration")
    print("✓ Validation: Property-level constraints")

if __name__ == "__main__":
    main()`
    },
    {
      id: "ex3",
      question: "Master regular expressions with comprehensive pattern matching and text processing:\n1. Create email and phone number validators using regex\n2. Implement a text analyzer that extracts information using patterns\n3. Build a log file parser with regex patterns\n4. Create a URL parser and validator\n5. Implement advanced text manipulation with find/replace operations\n6. Demonstrate regex performance and best practices",
      solution: `# Advanced Regular Expressions: Pattern Matching and Text Processing

import re
import time
from collections import Counter

# 1. Email and Phone Validators
class Validators:
    @staticmethod
    def validate_email(email):
        """Validate email addresses using regex"""
        # Comprehensive email regex pattern
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return bool(re.match(pattern, email))

    @staticmethod
    def validate_phone(phone):
        """Validate phone numbers (various formats)"""
        # Pattern for US phone numbers: (123) 456-7890, 123-456-7890, 1234567890
        pattern = r'^(\(\d{3}\)\s?|\d{3}-?)?\d{3}-?\d{4}$'
        return bool(re.match(pattern, phone))

    @staticmethod
    def extract_emails(text):
        """Extract all email addresses from text"""
        email_pattern = r'\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b'
        return re.findall(email_pattern, text)

    @staticmethod
    def extract_phones(text):
        """Extract phone numbers from text"""
        phone_pattern = r'(\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})'
        return re.findall(phone_pattern, text)

# 2. Text Analyzer
class TextAnalyzer:
    def __init__(self, text):
        self.text = text

    def extract_dates(self):
        """Extract dates in various formats"""
        # Patterns for different date formats
        patterns = [
            r'\b\d{1,2}/\d{1,2}/\d{2,4}\b',  # MM/DD/YYYY
            r'\b\d{1,2}-\d{1,2}-\d{2,4}\b',  # MM-DD-YYYY
            r'\b\d{4}-\d{2}-\d{2}\b',         # YYYY-MM-DD
        ]

        dates = []
        for pattern in patterns:
            dates.extend(re.findall(pattern, self.text))
        return list(set(dates))  # Remove duplicates

    def extract_numbers(self):
        """Extract all numbers (integers and floats)"""
        number_pattern = r'\b\d+\.?\d*\b'
        return re.findall(number_pattern, self.text)

    def extract_urls(self):
        """Extract URLs from text"""
        url_pattern = r'https?://(?:[-\w.])+(?:[:\d]+)?(?:/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:\w*))*)?'
        return re.findall(url_pattern, self.text)

    def extract_hashtags(self):
        """Extract hashtags from social media text"""
        hashtag_pattern = r'#\w+'
        return re.findall(hashtag_pattern, self.text)

    def get_word_frequency(self):
        """Get word frequency analysis"""
        # Clean and split text
        words = re.findall(r'\b\w+\b', self.text.lower())
        return Counter(words)

    def analyze_sentiment_words(self):
        """Simple sentiment analysis using word lists"""
        positive_words = {'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic'}
        negative_words = {'bad', 'terrible', 'awful', 'horrible', 'worst', 'hate'}

        words = re.findall(r'\b\w+\b', self.text.lower())
        positive_count = sum(1 for word in words if word in positive_words)
        negative_count = sum(1 for word in words if word in negative_words)

        return {
            'positive_words': positive_count,
            'negative_words': negative_count,
            'sentiment': 'positive' if positive_count > negative_count else 'negative' if negative_count > positive_count else 'neutral'
        }

# 3. Log File Parser
class LogParser:
    def __init__(self, log_pattern=None):
        # Default Apache-style log pattern
        if log_pattern is None:
            self.log_pattern = r'(\d+\.\d+\.\d+\.\d+) - - \[([^\]]+)\] "([^"]*)" (\d+) (\d+)'

    def parse_log_line(self, line):
        """Parse a single log line"""
        match = re.match(self.log_pattern, line)
        if match:
            ip, timestamp, request, status, size = match.groups()
            return {
                'ip': ip,
                'timestamp': timestamp,
                'request': request,
                'status': int(status),
                'size': int(size)
            }
        return None

    def extract_errors(self, log_content):
        """Extract error entries (status codes 400-599)"""
        error_pattern = r'.*\s([45]\d{2})\s.*'
        return re.findall(error_pattern, log_content)

    def get_unique_ips(self, log_content):
        """Get unique IP addresses from logs"""
        ip_pattern = r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b'
        ips = re.findall(ip_pattern, log_content)
        return list(set(ips))

# 4. URL Parser and Validator
class URLProcessor:
    @staticmethod
    def validate_url(url):
        """Validate URL format"""
        url_pattern = r'^https?://(?:[-\w.])+(?:[:\d]+)?(?:/(?:[\w/_.])*(?:\?(?:[\w&=%.])*)?(?:#(?:\w*))*)?$'
        return bool(re.match(url_pattern, url))

    @staticmethod
    def parse_url(url):
        """Parse URL components"""
        pattern = r'(https?)://([^:/]+)(?::(\d+))?(/?(?:[^/?#]*))?(?:\?([^#]*))?(?:#(.*))?'
        match = re.match(pattern, url)

        if match:
            protocol, domain, port, path, query, fragment = match.groups()
            return {
                'protocol': protocol,
                'domain': domain,
                'port': port or ('443' if protocol == 'https' else '80'),
                'path': path or '/',
                'query': query,
                'fragment': fragment
            }
        return None

    @staticmethod
    def extract_domain(url):
        """Extract domain from URL"""
        match = re.search(r'https?://([^:/]+)', url)
        return match.group(1) if match else None

# 5. Advanced Text Manipulation
class TextManipulator:
    def __init__(self, text):
        self.text = text

    def censor_words(self, words_to_censor):
        """Censor specified words"""
        pattern = r'\b(' + '|'.join(re.escape(word) for word in words_to_censor) + r')\b'
        return re.sub(pattern, '***', self.text, flags=re.IGNORECASE)

    def extract_code_blocks(self):
        """Extract code blocks from markdown"""
        code_pattern = r'\`\`\`[\s\S]*?\`\`\`'
        return re.findall(code_pattern, self.text)

    def format_phone_numbers(self):
        """Format phone numbers consistently"""
        def format_match(match):
            number = re.sub(r'\D', '', match.group())
            if len(number) == 10:
                return f"({number[:3]}) {number[3:6]}-{number[6:]}"
            return match.group()

        phone_pattern = r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b'
        return re.sub(phone_pattern, format_match, self.text)

    def highlight_keywords(self, keywords, highlight_format='<strong>{}</strong>'):
        """Highlight keywords in text"""
        for keyword in keywords:
            pattern = r'\b' + re.escape(keyword) + r'\b'
            replacement = highlight_format.format(keyword)
            self.text = re.sub(pattern, replacement, self.text, flags=re.IGNORECASE)
        return self.text

# Comprehensive Demonstration
def main():
    print("=== Advanced Regular Expressions Demonstration ===\n")

    # 1. Email and Phone Validation
    print("1. Email and Phone Validation:")
    validator = Validators()

    emails = ["user@example.com", "test.email+tag@domain.co.uk", "invalid-email", "user@.com"]
    phones = ["(555) 123-4567", "555-123-4567", "5551234567", "invalid-phone"]

    print("Email validation:")
    for email in emails:
        print(f"  {email}: {'Valid' if validator.validate_email(email) else 'Invalid'}")

    print("Phone validation:")
    for phone in phones:
        print(f"  {phone}: {'Valid' if validator.validate_phone(phone) else 'Invalid'}")

    # 2. Text Analysis
    print("\n2. Text Analysis:")
    sample_text = """
    Contact us at support@example.com or call (555) 123-4567.
    Visit our website at https://www.example.com/products?id=123#section2
    Today's date is 12/25/2023 and we have great deals!
    This is amazing! I love this product. #great #amazing
    """

    analyzer = TextAnalyzer(sample_text)
    print(f"Extracted emails: {analyzer.extract_emails()}")
    print(f"Extracted phones: {analyzer.extract_phones()}")
    print(f"Extracted dates: {analyzer.extract_dates()}")
    print(f"Extracted URLs: {analyzer.extract_urls()}")
    print(f"Extracted hashtags: {analyzer.extract_hashtags()}")

    sentiment = analyzer.analyze_sentiment_words()
    print(f"Sentiment analysis: {sentiment['positive_words']} positive, {sentiment['negative_words']} negative = {sentiment['sentiment']}")

    # 3. Log Parsing
    print("\n3. Log Parsing:")
    sample_log = '''192.168.1.1 - - [25/Dec/2023:10:15:32 +0000] "GET /api/users HTTP/1.1" 200 1024
192.168.1.2 - - [25/Dec/2023:10:15:45 +0000] "POST /api/login HTTP/1.1" 401 234
192.168.1.1 - - [25/Dec/2023:10:16:12 +0000] "GET /api/data HTTP/1.1" 500 0'''

    parser = LogParser()
    print(f"Error status codes: {parser.extract_errors(sample_log)}")
    print(f"Unique IPs: {parser.get_unique_ips(sample_log)}")

    # 4. URL Processing
    print("\n4. URL Processing:")
    test_urls = [
        "https://www.example.com:8080/path/to/resource?param1=value1&param2=value2#section",
        "http://subdomain.example.org/path",
        "invalid-url"
    ]

    for url in test_urls:
        print(f"URL: {url}")
        print(f"  Valid: {URLProcessor.validate_url(url)}")
        parsed = URLProcessor.parse_url(url)
        if parsed:
            print(f"  Domain: {parsed['domain']}")
            print(f"  Path: {parsed['path']}")

    # 5. Text Manipulation
    print("\n5. Text Manipulation:")
    text = "Call us at 555.123.4567 or visit badwebsite.com. This is a bad word and another bad term."
    manipulator = TextManipulator(text)

    # Censor words
    censored = manipulator.censor_words(['bad', 'terrible'])
    print(f"Original: {text}")
    print(f"Censored: {censored}")

    # Format phone numbers
    formatted = manipulator.format_phone_numbers()
    print(f"Formatted phones: {formatted}")

    print("\n=== Regex Performance Tips ===")
    print("✓ Compile patterns for reuse: re.compile()")
    print("✓ Use raw strings for patterns: r'pattern'")
    print("✓ Be specific to avoid backtracking")
    print("✓ Use non-capturing groups when possible: (?:...)")
    print("✓ Test patterns with various inputs")
    print("✓ Use re.finditer() for large texts instead of findall()")

if __name__ == "__main__":
    main()`
    },
    {
      id: "ex4",
      question: "Implement modules, packages, and import system mastery:\n1. Create a custom module with classes and functions\n2. Build a package structure with multiple modules\n3. Implement lazy loading and dynamic imports\n4. Create a plugin system using importlib\n5. Build a module registry and dependency manager\n6. Demonstrate advanced import patterns and best practices",
      solution: `# Advanced Modules, Packages, and Import System

import importlib
import sys
import os
from pathlib import Path
import time

# 1. Custom Module Creation
class MathUtils:
    """Custom math utilities module"""
    PI = 3.14159
    E = 2.71828

    @staticmethod
    def factorial(n):
        """Calculate factorial"""
        if n <= 1:
            return 1
        return n * MathUtils.factorial(n - 1)

    @staticmethod
    def fibonacci(n):
        """Calculate nth Fibonacci number"""
        if n <= 1:
            return n
        return MathUtils.fibonacci(n - 1) + MathUtils.fibonacci(n - 2)

    @classmethod
    def get_constants(cls):
        """Get mathematical constants"""
        return {'pi': cls.PI, 'e': cls.E}

class StringUtils:
    """Custom string utilities module"""
    @staticmethod
    def reverse_string(s):
        """Reverse a string"""
        return s[::-1]

    @staticmethod
    def is_palindrome(s):
        """Check if string is palindrome"""
        cleaned = ''.join(c.lower() for c in s if c.isalnum())
        return cleaned == cleaned[::-1]

    @staticmethod
    def word_count(text):
        """Count words in text"""
        return len(text.split())

# 2. Package Structure Simulation
class PackageManager:
    """Simulate package management system"""
    def __init__(self):
        self.modules = {}
        self.packages = {}

    def register_module(self, name, module_class):
        """Register a module in the system"""
        self.modules[name] = module_class
        print(f"Registered module: {name}")

    def create_package(self, package_name, modules):
        """Create a package from modules"""
        if package_name not in self.packages:
            self.packages[package_name] = {}

        for module_name, module_class in modules.items():
            self.packages[package_name][module_name] = module_class
            print(f"Added {module_name} to package {package_name}")

    def import_from_package(self, package_name, module_name):
        """Import a module from a package"""
        if package_name in self.packages and module_name in self.packages[package_name]:
            return self.packages[package_name][module_name]
        raise ImportError(f"No module named '{module_name}' in package '{package_name}'")

# 3. Lazy Loading System
class LazyLoader:
    """Lazy loading system for modules"""
    def __init__(self):
        self._loaded_modules = {}
        self._module_factories = {}

    def register_lazy_module(self, name, factory_func):
        """Register a module factory for lazy loading"""
        self._module_factories[name] = factory_func

    def __getattr__(self, name):
        """Lazy load module when accessed"""
        if name in self._loaded_modules:
            return self._loaded_modules[name]

        if name in self._module_factories:
            print(f"Lazy loading module: {name}")
            self._loaded_modules[name] = self._module_factories[name]()
            return self._loaded_modules[name]

        raise AttributeError(f"Module '{name}' not found")

# 4. Plugin System using importlib
class PluginManager:
    """Plugin system using importlib"""
    def __init__(self, plugin_dir="plugins"):
        self.plugin_dir = Path(plugin_dir)
        self.plugins = {}
        self._load_plugins()

    def _load_plugins(self):
        """Load all plugins from plugin directory"""
        if not self.plugin_dir.exists():
            self.plugin_dir.mkdir()
            return

        for plugin_file in self.plugin_dir.glob("*.py"):
            plugin_name = plugin_file.stem
            try:
                # Import plugin module
                spec = importlib.util.spec_from_file_location(plugin_name, plugin_file)
                module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(module)

                # Register plugin if it has the required interface
                if hasattr(module, 'PLUGIN_NAME') and hasattr(module, 'execute'):
                    self.plugins[module.PLUGIN_NAME] = module
                    print(f"Loaded plugin: {module.PLUGIN_NAME}")

            except Exception as e:
                print(f"Failed to load plugin {plugin_name}: {e}")

    def get_plugin(self, name):
        """Get a loaded plugin by name"""
        return self.plugins.get(name)

    def list_plugins(self):
        """List all loaded plugins"""
        return list(self.plugins.keys())

    def execute_plugin(self, name, *args, **kwargs):
        """Execute a plugin with given arguments"""
        plugin = self.get_plugin(name)
        if plugin:
            return plugin.execute(*args, **kwargs)
        raise ValueError(f"Plugin '{name}' not found")

# 5. Module Registry and Dependency Manager
class ModuleRegistry:
    """Advanced module registry with dependencies"""
    def __init__(self):
        self.modules = {}
        self.dependencies = {}

    def register_module(self, name, module_class, deps=None):
        """Register a module with dependencies"""
        self.modules[name] = module_class
        self.dependencies[name] = deps or []
        print(f"Registered module: {name} with dependencies: {deps}")

    def resolve_dependencies(self, module_name):
        """Resolve and return module with all dependencies"""
        if module_name not in self.modules:
            raise ImportError(f"Module '{module_name}' not found")

        resolved = {}
        self._resolve_recursive(module_name, resolved, set())
        return resolved

    def _resolve_recursive(self, name, resolved, visiting):
        """Recursive dependency resolution"""
        if name in visiting:
            raise ImportError(f"Circular dependency detected: {name}")

        if name in resolved:
            return

        visiting.add(name)

        # Resolve dependencies first
        for dep in self.dependencies[name]:
            if dep not in self.modules:
                raise ImportError(f"Dependency '{dep}' of module '{name}' not found")
            self._resolve_recursive(dep, resolved, visiting)

        # Add this module
        resolved[name] = self.modules[name]
        visiting.remove(name)

# Demonstration
def main():
    print("=== Advanced Modules and Packages Demonstration ===\n")

    # 1. Custom Modules
    print("1. Custom Modules:")
    print(f"Factorial of 5: {MathUtils.factorial(5)}")
    print(f"Fibonacci 8: {MathUtils.fibonacci(8)}")
    print(f"Constants: {MathUtils.get_constants()}")

    print(f"Reverse 'hello': {StringUtils.reverse_string('hello')}")
    print(f"Is 'radar' palindrome: {StringUtils.is_palindrome('radar')}")
    print(f"Word count: {StringUtils.word_count('This is a test sentence')}")
    print()

    # 2. Package Management
    print("2. Package Management:")
    pkg_mgr = PackageManager()

    # Register modules
    pkg_mgr.register_module('math_utils', MathUtils)
    pkg_mgr.register_module('string_utils', StringUtils)

    # Create packages
    pkg_mgr.create_package('utilities', {
        'math': MathUtils,
        'string': StringUtils
    })

    # Import from package
    MathModule = pkg_mgr.import_from_package('utilities', 'math')
    StringModule = pkg_mgr.import_from_package('utilities', 'string')
    print(f"Imported Math.PI: {MathModule.PI}")
    print()

    # 3. Lazy Loading
    print("3. Lazy Loading:")
    lazy = LazyLoader()

    # Register lazy modules
    lazy.register_lazy_module('heavy_math', lambda: MathUtils)
    lazy.register_lazy_module('heavy_string', lambda: StringUtils)

    # Access triggers loading
    start_time = time.time()
    math_module = lazy.heavy_math
    load_time = time.time() - start_time
    print(f"Lazy loading time: {load_time:.6f}")

    print(f"Heavy math factorial: {lazy.heavy_math.factorial(6)}")
    print()

    # 4. Plugin System
    print("4. Plugin System:")
    plugin_mgr = PluginManager()

    # Create a sample plugin file (simulated)
    plugin_content = '''
PLUGIN_NAME = "sample_plugin"

def execute(data):
    """Sample plugin function"""
    return f"Processed: {data.upper()}"
'''

    # Save plugin file
    plugin_file = plugin_mgr.plugin_dir / "sample_plugin.py"
    with open(plugin_file, 'w') as f:
        f.write(plugin_content)

    # Reload plugins
    plugin_mgr._load_plugins()

    print(f"Available plugins: {plugin_mgr.list_plugins()}")
    if plugin_mgr.list_plugins():
        result = plugin_mgr.execute_plugin("sample_plugin", "hello world")
        print(f"Plugin result: {result}")
    print()

    # 5. Dependency Management
    print("5. Dependency Management:")
    registry = ModuleRegistry()

    # Register modules with dependencies
    registry.register_module('base_math', MathUtils)
    registry.register_module('advanced_math', MathUtils, ['base_math'])
    registry.register_module('text_processor', StringUtils, ['base_math'])

    # Resolve dependencies
    try:
        resolved = registry.resolve_dependencies('text_processor')
        print(f"Resolved modules for 'text_processor': {list(resolved.keys())}")

        # Test circular dependency detection
        registry.register_module('circular_a', MathUtils, ['circular_b'])
        registry.register_module('circular_b', MathUtils, ['circular_a'])
        registry.resolve_dependencies('circular_a')
    except ImportError as e:
        print(f"Dependency error: {e}")

    print("\n=== Module and Package Best Practices ===")
    print("✓ Use __init__.py for package initialization")
    print("✓ Follow naming conventions (lowercase, underscores)")
    print("✓ Use absolute imports within packages")
    print("✓ Handle import errors gracefully")
    print("✓ Document module interfaces clearly")
    print("✓ Use __all__ to control public API")

    # Clean up
    if plugin_file.exists():
        plugin_file.unlink()

if __name__ == "__main__":
    main()`
    },
    {
      id: "ex5",
      question: "Build a comprehensive Python application demonstrating advanced concepts integration:\n1. Create a command-line task manager with persistence\n2. Implement a modular architecture with plugins\n3. Add configuration management with validation\n4. Include logging, error handling, and performance monitoring\n5. Build a REST API simulator using advanced Python features\n6. Demonstrate production-ready application patterns",
      solution: `# Comprehensive Python Application: Advanced Concepts Integration

import json
import os
import time
import logging
from datetime import datetime
from functools import wraps
from pathlib import Path
import argparse
from collections import defaultdict
import sys

# Configuration Management with Validation
class ConfigManager:
    """Configuration manager with validation"""
    def __init__(self, config_file="config.json"):
        self.config_file = Path(config_file)
        self.config = self._load_default_config()
        self._load_config()

    def _load_default_config(self):
        return {
            "app": {
                "name": "TaskManager",
                "version": "1.0.0",
                "debug": False
            },
            "database": {
                "file": "tasks.json",
                "backup_interval": 3600
            },
            "logging": {
                "level": "INFO",
                "file": "app.log"
            }
        }

    def _load_config(self):
        """Load configuration from file"""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r') as f:
                    loaded_config = json.load(f)
                    self._merge_configs(self.config, loaded_config)
            except json.JSONDecodeError:
                print("Warning: Invalid config file, using defaults")

    def _merge_configs(self, base, update):
        """Recursively merge configuration dictionaries"""
        for key, value in update.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                self._merge_configs(base[key], value)
            else:
                base[key] = value

    def get(self, key_path):
        """Get configuration value using dot notation"""
        keys = key_path.split('.')
        value = self.config
        for key in keys:
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                raise KeyError(f"Configuration key '{key_path}' not found")
        return value

    def set(self, key_path, value):
        """Set configuration value"""
        keys = key_path.split('.')
        config = self.config
        for key in keys[:-1]:
            if key not in config:
                config[key] = {}
            config = config[key]
        config[keys[-1]] = value

    def save(self):
        """Save configuration to file"""
        with open(self.config_file, 'w') as f:
            json.dump(self.config, f, indent=2)

# Logging System
class Logger:
    """Advanced logging system"""
    def __init__(self, config):
        self.config = config
        self._setup_logging()

    def _setup_logging(self):
        """Setup logging configuration"""
        log_level = getattr(logging, self.config.get('logging.level').upper())

        # Create logger
        self.logger = logging.getLogger('TaskManager')
        self.logger.setLevel(log_level)

        # Remove existing handlers
        for handler in self.logger.handlers[:]:
            self.logger.removeHandler(handler)

        # Console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(log_level)

        # File handler
        log_file = self.config.get('logging.file')
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(log_level)

        # Formatter
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(formatter)
        file_handler.setFormatter(formatter)

        # Add handlers
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)

    def log_performance(self, operation, start_time, end_time=None):
        """Log performance metrics"""
        if end_time is None:
            end_time = time.time()
        duration = end_time - start_time
        self.logger.info(".4f")

# Plugin System
class PluginSystem:
    """Plugin system for extending functionality"""
    def __init__(self):
        self.plugins = {}
        self.hooks = defaultdict(list)

    def register_plugin(self, name, plugin_class):
        """Register a plugin"""
        plugin_instance = plugin_class()
        self.plugins[name] = plugin_instance

        # Register hooks if plugin has them
        if hasattr(plugin_instance, 'get_hooks'):
            hooks = plugin_instance.get_hooks()
            for hook_name, hook_func in hooks.items():
                self.hooks[hook_name].append(hook_func)

    def execute_hook(self, hook_name, *args, **kwargs):
        """Execute all functions registered for a hook"""
        results = []
        for hook_func in self.hooks[hook_name]:
            try:
                result = hook_func(*args, **kwargs)
                results.append(result)
            except Exception as e:
                print(f"Plugin hook '{hook_name}' failed: {e}")
        return results

# Task Manager Core
class TaskManager:
    """Main task manager application"""
    def __init__(self, config):
        self.config = config
        self.logger = Logger(config)
        self.plugins = PluginSystem()
        self.tasks = self._load_tasks()
        self._last_backup = time.time()

    def _load_tasks(self):
        """Load tasks from file"""
        db_file = self.config.get('database.file')
        if os.path.exists(db_file):
            try:
                with open(db_file, 'r') as f:
                    return json.load(f)
            except json.JSONDecodeError:
                self.logger.logger.warning("Invalid database file, starting fresh")
        return []

    def _save_tasks(self):
        """Save tasks to file"""
        db_file = self.config.get('database.file')
        with open(db_file, 'w') as f:
            json.dump(self.tasks, f, indent=2)

        # Periodic backup
        current_time = time.time()
        if current_time - self._last_backup > self.config.get('database.backup_interval'):
            self._backup_tasks()
            self._last_backup = current_time

    def _backup_tasks(self):
        """Create backup of tasks"""
        db_file = self.config.get('database.file')
        backup_file = f"{db_file}.backup"
        if os.path.exists(db_file):
            import shutil
            shutil.copy2(db_file, backup_file)
            self.logger.logger.info(f"Database backup created: {backup_file}")

    def add_task(self, title, description="", priority="medium"):
        """Add a new task"""
        start_time = time.time()

        task = {
            "id": len(self.tasks) + 1,
            "title": title,
            "description": description,
            "priority": priority,
            "completed": False,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }

        self.tasks.append(task)
        self._save_tasks()

        # Execute plugin hooks
        self.plugins.execute_hook('on_task_added', task)

        self.logger.log_performance("add_task", start_time)
        self.logger.logger.info(f"Added task: {title}")
        return task

    def list_tasks(self, completed=None):
        """List tasks with optional filtering"""
        start_time = time.time()

        if completed is None:
            filtered_tasks = self.tasks
        else:
            filtered_tasks = [t for t in self.tasks if t['completed'] == completed]

        self.logger.log_performance("list_tasks", start_time)
        return filtered_tasks

    def complete_task(self, task_id):
        """Mark task as completed"""
        start_time = time.time()

        for task in self.tasks:
            if task['id'] == task_id:
                task['completed'] = True
                task['updated_at'] = datetime.now().isoformat()
                self._save_tasks()

                # Execute plugin hooks
                self.plugins.execute_hook('on_task_completed', task)

                self.logger.log_performance("complete_task", start_time)
                self.logger.logger.info(f"Completed task: {task['title']}")
                return task

        raise ValueError(f"Task with id {task_id} not found")

# Sample Plugins
class NotificationPlugin:
    """Plugin for notifications"""
    def get_hooks(self):
        return {
            'on_task_added': self.notify_task_added,
            'on_task_completed': self.notify_task_completed
        }

    def notify_task_added(self, task):
        print(f"📝 New task added: {task['title']}")

    def notify_task_completed(self, task):
        print(f"✅ Task completed: {task['title']}")

class StatisticsPlugin:
    """Plugin for statistics"""
    def __init__(self):
        self.stats = {'tasks_added': 0, 'tasks_completed': 0}

    def get_hooks(self):
        return {
            'on_task_added': self.track_added,
            'on_task_completed': self.track_completed
        }

    def track_added(self, task):
        self.stats['tasks_added'] += 1

    def track_completed(self, task):
        self.stats['tasks_completed'] += 1

    def get_stats(self):
        return self.stats.copy()

# REST API Simulator
class RESTAPISimulator:
    """Simple REST API simulator"""
    def __init__(self, task_manager):
        self.task_manager = task_manager

    def handle_request(self, method, path, data=None):
        """Handle API request"""
        try:
            if method == 'GET' and path == '/tasks':
                return {'status': 200, 'data': self.task_manager.list_tasks()}

            elif method == 'POST' and path == '/tasks':
                if not data or 'title' not in data:
                    return {'status': 400, 'error': 'Title required'}
                task = self.task_manager.add_task(
                    data['title'],
                    data.get('description', ''),
                    data.get('priority', 'medium')
                )
                return {'status': 201, 'data': task}

            elif method == 'PUT' and path.startswith('/tasks/'):
                task_id = int(path.split('/')[-1])
                task = self.task_manager.complete_task(task_id)
                return {'status': 200, 'data': task}

            else:
                return {'status': 404, 'error': 'Endpoint not found'}

        except Exception as e:
            return {'status': 500, 'error': str(e)}

# Command Line Interface
def create_cli_parser():
    """Create command line argument parser"""
    parser = argparse.ArgumentParser(description='Task Manager CLI')
    subparsers = parser.add_subparsers(dest='command', help='Available commands')

    # Add task command
    add_parser = subparsers.add_parser('add', help='Add a new task')
    add_parser.add_argument('title', help='Task title')
    add_parser.add_argument('--description', '-d', default='', help='Task description')
    add_parser.add_argument('--priority', '-p', choices=['low', 'medium', 'high'], default='medium', help='Task priority')

    # List tasks command
    list_parser = subparsers.add_parser('list', help='List tasks')
    list_parser.add_argument('--completed', '-c', action='store_true', help='Show only completed tasks')
    list_parser.add_argument('--pending', action='store_true', help='Show only pending tasks')

    # Complete task command
    complete_parser = subparsers.add_parser('complete', help='Mark task as completed')
    complete_parser.add_argument('task_id', type=int, help='Task ID to complete')

    return parser

# Main Application
def main():
    print("🚀 Advanced Python Task Manager")
    print("=" * 40)

    # Initialize configuration
    config = ConfigManager()

    # Initialize task manager
    task_manager = TaskManager(config)

    # Register plugins
    task_manager.plugins.register_plugin('notifications', NotificationPlugin)
    task_manager.plugins.register_plugin('statistics', StatisticsPlugin)

    # Initialize API simulator
    api = RESTAPISimulator(task_manager)

    # CLI interface
    parser = create_cli_parser()

    if len(sys.argv) > 1:
        # Command line mode
        args = parser.parse_args()

        try:
            if args.command == 'add':
                task = task_manager.add_task(args.title, args.description, args.priority)
                print(f"Added task: {task['title']} (ID: {task['id']})")

            elif args.command == 'list':
                if args.completed:
                    tasks = task_manager.list_tasks(completed=True)
                elif args.pending:
                    tasks = task_manager.list_tasks(completed=False)
                else:
                    tasks = task_manager.list_tasks()

                if not tasks:
                    print("No tasks found")
                else:
                    for task in tasks:
                        status = "✓" if task['completed'] else "○"
                        print(f"{status} {task['id']}: {task['title']} ({task['priority']})")

            elif args.command == 'complete':
                task = task_manager.complete_task(args.task_id)
                print(f"Completed task: {task['title']}")

        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
    else:
        # Interactive mode
        print("Interactive mode - Type 'help' for commands")

        while True:
            try:
                command = input("\n> ").strip()

                if command == 'help':
                    print("Commands:")
                    print("  add <title> - Add a new task")
                    print("  list - List all tasks")
                    print("  complete <id> - Complete a task")
                    print("  stats - Show statistics")
                    print("  api-demo - Demonstrate API")
                    print("  quit - Exit")

                elif command.startswith('add '):
                    title = command[4:].strip()
                    if title:
                        task = task_manager.add_task(title)
                        print(f"Added task: {task['title']} (ID: {task['id']})")
                    else:
                        print("Please provide a task title")

                elif command == 'list':
                    tasks = task_manager.list_tasks()
                    if not tasks:
                        print("No tasks found")
                    else:
                        for task in tasks:
                            status = "✓" if task['completed'] else "○"
                            print(f"{status} {task['id']}: {task['title']} ({task['priority']})")

                elif command.startswith('complete '):
                    try:
                        task_id = int(command[9:].strip())
                        task = task_manager.complete_task(task_id)
                        print(f"Completed task: {task['title']}")
                    except ValueError:
                        print("Please provide a valid task ID")

                elif command == 'stats':
                    # Get statistics from plugin
                    stats_plugin = task_manager.plugins.plugins.get('statistics')
                    if stats_plugin:
                        stats = stats_plugin.get_stats()
                        print(f"Tasks added: {stats['tasks_added']}")
                        print(f"Tasks completed: {stats['tasks_completed']}")
                        print(f"Total tasks: {len(task_manager.tasks)}")

                elif command == 'api-demo':
                    print("API Demonstration:")
                    # Simulate API calls
                    response = api.handle_request('POST', '/tasks', {'title': 'API Test Task'})
                    print(f"POST /tasks: Status {response['status']}")

                    response = api.handle_request('GET', '/tasks')
                    print(f"GET /tasks: Found {len(response.get('data', []))} tasks")

                elif command == 'quit':
                    break

                else:
                    print("Unknown command. Type 'help' for available commands")

            except KeyboardInterrupt:
                print("\nGoodbye!")
                break
            except Exception as e:
                print(f"Error: {e}")

    # Save configuration
    config.save()

if __name__ == "__main__":
    main()`
    }
  ]
};

