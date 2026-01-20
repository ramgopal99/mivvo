import { SubLesson } from '../../../../data/lessonsData';

export const topic_19_1: SubLesson = {
  id: '19.1',
  title: 'Intermediate C Programming Projects',
  status: 'demo',
  content: `# 🏗️ Intermediate C Programming Projects

This module contains intermediate-level C programming projects that build upon the concepts from earlier modules. These projects demonstrate advanced data structures, algorithms, multi-file program organization, and real-world software engineering practices.

## 🏗️ Development Approach for Intermediate Projects

### Advanced C Programming Techniques:

1. **Multi-File Organization:**
   - Separate interface (.h) from implementation (.c)
   - Use header guards and proper includes
   - Forward declarations for complex structures

2. **Data Structure Design:**
   - Choose appropriate data structures for the problem
   - Consider time/space complexity trade-offs
   - Implement custom data structures when needed

3. **Error Handling Strategies:**
   - Return error codes from functions
   - Use goto for cleanup on error (when appropriate)
   - Validate inputs at API boundaries

4. **Memory Management:**
   - RAII-like patterns with cleanup functions
   - Reference counting for shared resources
   - Avoid memory leaks with proper cleanup

5. **File I/O Best Practices:**
   - Check return values of all I/O operations
   - Handle partial reads/writes
   - Use binary formats for structured data

## Project 1: Library Management System

**Description:** A comprehensive library management system with book cataloging, user management, and borrowing tracking. This project demonstrates database-like functionality using file I/O and advanced data structures.

**Key Features:**
- Book catalog with search and filtering
- User registration and management
- Book borrowing and return system
- Fine calculation and due date tracking
- File-based data persistence
- Command-line interface with menus

**Architecture:**
- Multi-file organization (headers and implementations)
- Modular design with clear separation of concerns
- Error handling and data validation
- Efficient data structures for search operations

**Concepts Used:**
- Structures and unions for complex data
- File I/O for data persistence
- Dynamic memory allocation
- String manipulation and parsing
- Date/time handling
- Search algorithms and data organization

\`"\`\`c
// lib_system.h - Main header file
#ifndef LIB_SYSTEM_H
#define LIB_SYSTEM_H

#include <time.h>
#include <stdbool.h>

// Book structure
typedef struct {
    int id;
    char title[100];
    char author[50];
    char isbn[20];
    int year;
    bool available;
} Book;

// User structure
typedef struct {
    int id;
    char name[50];
    char email[50];
    time_t reg_date;
} User;

// Borrow record
typedef struct {
    int book_id;
    int user_id;
    time_t borrow_date;
    time_t due_date;
    time_t return_date;
    double fine;
} BorrowRecord;

// Library system structure
typedef struct {
    Book *books;
    User *users;
    BorrowRecord *records;
    int book_count;
    int user_count;
    int record_count;
    int max_books;
    int max_users;
    int max_records;
} LibrarySystem;

// Core functions
LibrarySystem *lib_create(int max_books, int max_users, int max_records);
void lib_destroy(LibrarySystem *lib);

// Book management
int lib_add_book(LibrarySystem *lib, const char *title, const char *author,
                const char *isbn, int year);
Book *lib_find_book(LibrarySystem *lib, int id);

// User management
int lib_add_user(LibrarySystem *lib, const char *name, const char *email);
User *lib_find_user(LibrarySystem *lib, int id);

// Borrowing system
int lib_borrow_book(LibrarySystem *lib, int book_id, int user_id);
int lib_return_book(LibrarySystem *lib, int book_id, int user_id);

// File operations
int lib_save_to_file(LibrarySystem *lib, const char *filename);
int lib_load_from_file(LibrarySystem *lib, const char *filename);

// Statistics
void lib_print_stats(const LibrarySystem *lib);

#endif // LIB_SYSTEM_H
\`\`\`

## Project 2: Expression Parser and Calculator

**Description:** An advanced calculator that can parse and evaluate mathematical expressions with variables, functions, and operator precedence. This project demonstrates recursive descent parsing, symbol tables, and expression evaluation.

**Key Features:**
- Support for complex mathematical expressions
- Variables and user-defined functions
- Proper operator precedence and associativity
- Error reporting with position information

**Architecture:**
- Lexer for tokenization
- Parser using recursive descent
- Symbol table for variables and functions
- Expression tree for evaluation

**Concepts Used:**
- Abstract syntax trees (AST)
- Recursive descent parsing
- Symbol table management
- Mathematical function evaluation

## Project 3: Simple Database Engine

**Description:** A basic database engine with table creation, data insertion, querying, and indexing. This project demonstrates B-tree implementation, file-based storage, and query processing.

**Key Features:**
- Table creation with schema definition
- Data insertion and retrieval
- Simple query language (SELECT, INSERT, WHERE)
- B-tree indexing for efficient lookups

**Architecture:**
- B-tree implementation for indexing
- Record storage with fixed/variable length fields
- Query parser and execution engine

**Concepts Used:**
- B-tree data structure and algorithms
- File organization and storage
- Query parsing and optimization

## Project 4: Multi-threaded Web Crawler

**Description:** A concurrent web crawler that can fetch multiple web pages simultaneously using threads and connection pooling. This project demonstrates advanced multi-threading, network programming, and concurrent data structures.

**Key Features:**
- Multi-threaded page fetching
- URL deduplication and queue management
- Connection pooling for efficiency
- Configurable crawling depth and limits

**Architecture:**
- Thread pool for concurrent operations
- Producer-consumer pattern for URL queue
- Connection pooling for HTTP requests

**Concepts Used:**
- POSIX threads and synchronization primitives
- Socket programming for HTTP requests
- Thread-safe data structures

These intermediate projects demonstrate advanced C programming concepts including multi-file organization, complex data structures, algorithms, multi-threading, and real-world application development. Each project builds upon concepts from earlier modules while introducing new challenges and best practices.`
};
