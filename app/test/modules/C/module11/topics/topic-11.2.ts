import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_2: SubLesson = {
  id: '11.2',
  title: 'Advanced File Operations',
  status: 'demo',
  content: `# Advanced File Operations

## Random Access Files

### File Positioning
- **ftell()**: Get current position
- **fseek()**: Set absolute position
- **fgetpos()**/**fsetpos()**: Advanced positioning
- **rewind()**: Reset to beginning

### Position Constants
\`\`\`c
#define SEEK_SET 0  // Beginning of file
#define SEEK_CUR 1  // Current position
#define SEEK_END 2  // End of file
\`\`\`

### Usage Examples
\`\`\`c
// Move to 100th byte from beginning
fseek(fp, 100, SEEK_SET);

// Move 50 bytes forward from current position
fseek(fp, 50, SEEK_CUR);

// Move to 10 bytes before end
fseek(fp, -10, SEEK_END);

// Get current position
long pos = ftell(fp);
\`\`\`

## Binary File I/O

### Block I/O Functions
- **fread()**: Read blocks of data
- **fwrite()**: Write blocks of data
- **size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream)**
- **size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream)**

### Binary File Example
\`\`\`c
typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

Employee emp = {123, "John Doe", 50000.0};

// Write structure to file
fwrite(&emp, sizeof(Employee), 1, fp);

// Read structure from file
Employee read_emp;
fread(&read_emp, sizeof(Employee), 1, fp);
\`\`\`

## File System Operations

### Standard Library Functions
- **remove()**: Delete file
- **rename()**: Rename/move file
- **tmpfile()**: Create temporary file
- **tmpnam()**: Generate temporary filename

### Directory Operations
\`\`\`c
// Note: Directory operations vary by platform
// POSIX systems:
#include <dirent.h>
#include <sys/stat.h>

// Windows:
#include <io.h>
#include <direct.h>
\`\`\`

## Error Handling and Diagnostics

### errno and perror()
\`\`\`c
#include <errno.h>

FILE *fp = fopen("nonexistent.txt", "r");
if (fp == NULL) {
    printf("Error code: %d\\n", errno);
    perror("fopen failed");
}
\`\`\`

### Common Error Codes
- **ENOENT**: File not found
- **EACCES**: Permission denied
- **EEXIST**: File exists
- **ENOSPC**: No space left on device
- **EISDIR**: Is a directory

## File Locking

### Advisory vs Mandatory Locking
- **Advisory**: Processes cooperate voluntarily
- **Mandatory**: Enforced by system

### fcntl() for File Locking
\`\`\`c
#include <fcntl.h>
#include <unistd.h>

struct flock lock;
lock.l_type = F_WRLCK;    // Write lock
lock.l_whence = SEEK_SET;
lock.l_start = 0;
lock.l_len = 0;           // Lock entire file

fcntl(fd, F_SETLKW, &lock);  // Wait for lock
\`\`\`

## Memory-Mapped Files

### mmap() Function (POSIX)
\`\`\`c
#include <sys/mman.h>

void *addr = mmap(NULL, size, PROT_READ | PROT_WRITE,
                   MAP_PRIVATE, fd, offset);
\`\`\`

### Advantages
- No buffering overhead
- Direct memory access
- Shared memory between processes

## Performance Considerations

### Buffering Strategies
- **Fully buffered**: I/O only when buffer full
- **Line buffered**: Flush on newline
- **Unbuffered**: Immediate I/O

### Optimizing File I/O
\`\`\`c
// Increase buffer size
char buffer[8192];
setvbuf(fp, buffer, _IOFBF, sizeof(buffer));

// Read/write in larger chunks
#define BUFFER_SIZE 4096
char buffer[BUFFER_SIZE];
size_t bytes_read;

while ((bytes_read = fread(buffer, 1, BUFFER_SIZE, fp)) > 0) {
    // Process buffer
}
\`\`\`

## Cross-Platform Considerations

### Path Separators
\`\`\`c
#ifdef _WIN32
    const char *path_sep = "\\\\";
#else
    const char *path_sep = "/";
#endif
\`\`\`

### Text File Translation
- Windows: CR-LF (\\r\\n)
- Unix/Linux: LF (\\n)
- Mac: CR (\\r)

### Endianness Issues
- Use network byte order (big-endian) for portable binary files
- **htonl()**, **htons()**, **ntohl()**, **ntohs()** functions`
};

