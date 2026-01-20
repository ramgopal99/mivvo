import { SubLesson } from '../../../../data/lessonsData';

export const topic_11_3: SubLesson = {
  id: '11.3',
  title: 'System Programming Fundamentals',
  status: 'demo',
  content: `# System Programming Fundamentals

## Process Management

### Process Creation
- **fork()**: Create child process (Unix/Linux)
- **exec()** family: Replace process image
- **spawn()**: Create new process (Windows)

### Process States
- **Running**: Currently executing
- **Ready**: Waiting for CPU
- **Waiting/Blocked**: Waiting for I/O or event
- **Terminated**: Finished execution

### Process ID and Parent-Child Relationship
\`\`\`c
#include <unistd.h>
#include <sys/types.h>

pid_t pid = fork();
if (pid == 0) {
    // Child process
    printf("Child PID: %d, Parent PID: %d\\n", getpid(), getppid());
} else if (pid > 0) {
    // Parent process
    printf("Parent PID: %d, Child PID: %d\\n", getpid(), pid);
} else {
    // Error
    perror("fork failed");
}
\`\`\`

## Process Termination

### Exit Status
- **EXIT_SUCCESS** (0): Successful termination
- **EXIT_FAILURE** (1): Unsuccessful termination
- Custom exit codes: 0-255

### Termination Functions
- **exit()**: Normal termination, flushes buffers
- **_Exit()**: Immediate termination, no cleanup
- **abort()**: Abnormal termination, generates SIGABRT

### atexit() Handlers
\`\`\`c
#include <stdlib.h>

void cleanup1(void) {
    printf("Cleanup 1\\n");
}

void cleanup2(void) {
    printf("Cleanup 2\\n");
}

int main() {
    atexit(cleanup1);
    atexit(cleanup2);  // LIFO order

    printf("Main function\\n");
    exit(0);
    // Output: Main function\\nCleanup 2\\nCleanup 1\\n
}
\`\`\`

## Environment Variables

### Accessing Environment
\`\`\`c
#include <stdlib.h>

// Method 1: extern char **environ;
extern char **environ;

// Method 2: main() parameter
int main(int argc, char *argv[], char *envp[]) {
    // envp points to environment variables
}

// Method 3: getenv()
char *path = getenv("PATH");
if (path != NULL) {
    printf("PATH: %s\\n", path);
}
\`\`\`

### Setting Environment Variables
- **setenv()**: Set environment variable
- **unsetenv()**: Remove environment variable
- **putenv()**: Set using "NAME=value" format

## Signals

### Common Signals
| Signal | Description | Default Action |
|--------|-------------|----------------|
| SIGINT | Interrupt (Ctrl+C) | Terminate |
| SIGTERM | Termination request | Terminate |
| SIGKILL | Kill process | Terminate (uncatchable) |
| SIGSEGV | Segmentation fault | Terminate + core dump |
| SIGALRM | Timer alarm | Terminate |

### Signal Handling
\`\`\`c
#include <signal.h>

void signal_handler(int sig) {
    printf("Received signal %d\\n", sig);
}

int main() {
    // Install signal handler
    signal(SIGINT, signal_handler);

    // Or ignore signal
    signal(SIGINT, SIG_IGN);

    // Or use default handler
    signal(SIGINT, SIG_DFL);
}
\`\`\`

### Advanced Signal Handling (sigaction)
\`\`\`c
struct sigaction sa;
sa.sa_handler = signal_handler;
sa.sa_flags = 0;
sigemptyset(&sa.sa_mask);

sigaction(SIGINT, &sa, NULL);
\`\`\`

## Time and Date Functions

### Time Representation
- **time_t**: Seconds since Unix epoch (Jan 1, 1970)
- **struct tm**: Broken-down time structure
- **struct timespec**: High-resolution time

### Time Functions
\`\`\`c
#include <time.h>

time_t now = time(NULL);
printf("Current time: %ld\\n", now);

struct tm *local_time = localtime(&now);
printf("Year: %d, Month: %d, Day: %d\\n",
       local_time->tm_year + 1900,
       local_time->tm_mon + 1,
       local_time->tm_mday);
\`\`\`

### High-Resolution Timing
\`\`\`c
#include <time.h>

struct timespec start, end;

clock_gettime(CLOCK_MONOTONIC, &start);
// Code to time
clock_gettime(CLOCK_MONOTONIC, &end);

double elapsed = (end.tv_sec - start.tv_sec) +
                 (end.tv_nsec - start.tv_nsec) / 1e9;
\`\`\`

## System Information

### uname() - System Information
\`\`\`c
#include <sys/utsname.h>

struct utsname sysinfo;
uname(&sysinfo);

printf("System: %s\\n", sysinfo.sysname);
printf("Node: %s\\n", sysinfo.nodename);
printf("Release: %s\\n", sysinfo.release);
printf("Version: %s\\n", sysinfo.version);
printf("Machine: %s\\n", sysinfo.machine);
\`\`\`

### System Limits
\`\`\`c
#include <limits.h>
#include <unistd.h>

printf("Max open files: %ld\\n", sysconf(_SC_OPEN_MAX));
printf("Page size: %ld\\n", sysconf(_SC_PAGE_SIZE));
printf("Max path length: %d\\n", PATH_MAX);
\`\`\`

## Process Scheduling

### Priority Levels
- **nice()**: Change process priority
- **getpriority()**/**setpriority()**: Get/set priority

### Scheduling Policies
- **SCHED_FIFO**: First-in, first-out
- **SCHED_RR**: Round-robin
- **SCHED_OTHER**: Default time-sharing

\`\`\`c
#include <sched.h>

struct sched_param param;
param.sched_priority = 10;

sched_setscheduler(0, SCHED_FIFO, &param);
\`\`\`
`
};

