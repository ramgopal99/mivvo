import { SubLesson } from '../../../../data/lessonsData';

export const topic_17_5: SubLesson = {
  id: '17.5',
  title: 'Practical C Applications',
  status: 'demo',
  content: `# Practical C Applications

## Command-Line Tools

### File Processing Utility
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <getopt.h>

#define BUFFER_SIZE 4096

typedef struct {
    int count_lines;
    int count_words;
    int count_chars;
    int show_help;
    char **files;
    int file_count;
} Options;

void print_usage(const char *program_name) {
    printf("Usage: %s [OPTIONS] [FILES...]\n", program_name);
    printf("Count lines, words, and characters in files.\n\n");
    printf("Options:\n");
    printf("  -l, --lines     count lines\n");
    printf("  -w, --words     count words\n");
    printf("  -c, --chars     count characters\n");
    printf("  -h, --help      show this help\n");
    printf("\nIf no options specified, count all.\n");
}

int count_file(FILE *file, Options *opts, const char *filename) {
    char buffer[BUFFER_SIZE];
    int lines = 0, words = 0, chars = 0;
    int in_word = 0;

    while (fgets(buffer, sizeof(buffer), file)) {
        chars += strlen(buffer);

        for (char *p = buffer; *p; p++) {
            if (*p == '\n') lines++;

            if (*p == ' ' || *p == '\t' || *p == '\n') {
                if (in_word) {
                    words++;
                    in_word = 0;
                }
            } else {
                in_word = 1;
            }
        }
    }

    // Count last word if file doesn't end with whitespace
    if (in_word) words++;

    // Print results
    if (opts->file_count > 1) printf("%s: ", filename);

    if (opts->count_lines || (!opts->count_lines && !opts->count_words && !opts->count_chars)) {
        printf("%d ", lines);
    }
    if (opts->count_words || (!opts->count_lines && !opts->count_words && !opts->count_chars)) {
        printf("%d ", words);
    }
    if (opts->count_chars || (!opts->count_lines && !opts->count_words && !opts->count_chars)) {
        printf("%d ", chars);
    }

    printf("\n");

    return 0;
}

int main(int argc, char *argv[]) {
    Options opts = {0};

    static struct option long_options[] = {
        {"lines", no_argument, 0, 'l'},
        {"words", no_argument, 0, 'w'},
        {"chars", no_argument, 0, 'c'},
        {"help", no_argument, 0, 'h'},
        {0, 0, 0, 0}
    };

    int option_index = 0;
    int c;

    while ((c = getopt_long(argc, argv, "lwch", long_options, &option_index)) != -1) {
        switch (c) {
            case 'l': opts.count_lines = 1; break;
            case 'w': opts.count_words = 1; break;
            case 'c': opts.count_chars = 1; break;
            case 'h': opts.show_help = 1; break;
            default: return 1;
        }
    }

    if (opts.show_help) {
        print_usage(argv[0]);
        return 0;
    }

    opts.files = &argv[optind];
    opts.file_count = argc - optind;

    // If no files specified, read from stdin
    if (opts.file_count == 0) {
        count_file(stdin, &opts, "stdin");
    } else {
        for (int i = 0; i < opts.file_count; i++) {
            FILE *file = fopen(opts.files[i], "r");
            if (!file) {
                perror(opts.files[i]);
                continue;
            }

            count_file(file, &opts, opts.files[i]);
            fclose(file);
        }
    }

    return 0;
}
\`\`\`

### Simple HTTP Client
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>

#define BUFFER_SIZE 4096

int create_tcp_socket() {
    return socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
}

int connect_to_host(const char *host, int port) {
    struct sockaddr_in server_addr;
    struct hostent *host_info;
    int sockfd;

    sockfd = create_tcp_socket();
    if (sockfd < 0) return -1;

    host_info = gethostbyname(host);
    if (!host_info) {
        close(sockfd);
        return -1;
    }

    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(port);
    memcpy(&server_addr.sin_addr, host_info->h_addr, host_info->h_length);

    if (connect(sockfd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
        close(sockfd);
        return -1;
    }

    return sockfd;
}

int send_request(int sockfd, const char *host, const char *path) {
    char request[1024];

    snprintf(request, sizeof(request),
             "GET %s HTTP/1.1\r\n"
             "Host: %s\r\n"
             "User-Agent: SimpleCClient/1.0\r\n"
             "Connection: close\r\n"
             "\r\n",
             path, host);

    return send(sockfd, request, strlen(request), 0);
}

void read_response(int sockfd) {
    char buffer[BUFFER_SIZE];
    int bytes_read;
    int header_ended = 0;

    while ((bytes_read = recv(sockfd, buffer, sizeof(buffer) - 1, 0)) > 0) {
        buffer[bytes_read] = '\0';

        if (!header_ended) {
            // Look for end of headers
            char *body_start = strstr(buffer, "\r\n\r\n");
            if (body_start) {
                header_ended = 1;
                printf("%s", body_start + 4);
            }
        } else {
            printf("%s", buffer);
        }
    }
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <URL>\n", argv[0]);
        printf("Example: %s http://example.com/path\n", argv[0]);
        return 1;
    }

    // Parse URL (simplified)
    char *url = argv[1];
    char *host_start, *path_start;

    if (strncmp(url, "http://", 7) != 0) {
        fprintf(stderr, "Only HTTP URLs supported\n");
        return 1;
    }

    host_start = url + 7;
    path_start = strchr(host_start, '/');

    char host[256];
    char path[256] = "/";

    if (path_start) {
        size_t host_len = path_start - host_start;
        strncpy(host, host_start, host_len);
        host[host_len] = '\0';
        strcpy(path, path_start);
    } else {
        strcpy(host, host_start);
    }

    printf("Connecting to %s%s\n", host, path);

    int sockfd = connect_to_host(host, 80);
    if (sockfd < 0) {
        perror("Connection failed");
        return 1;
    }

    if (send_request(sockfd, host, path) < 0) {
        perror("Send failed");
        close(sockfd);
        return 1;
    }

    read_response(sockfd);
    close(sockfd);

    return 0;
}
\`\`\`

## Data Processing Applications

### CSV Parser and Processor
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_LINE 1024
#define MAX_FIELDS 100

typedef struct {
    char **fields;
    int field_count;
} CSVRow;

typedef struct {
    CSVRow *rows;
    int row_count;
    char **headers;
    int header_count;
} CSVData;

void csv_free(CSVData *data) {
    for (int i = 0; i < data->row_count; i++) {
        for (int j = 0; j < data->rows[i].field_count; j++) {
            free(data->rows[i].fields[j]);
        }
        free(data->rows[i].fields);
    }
    free(data->rows);

    for (int i = 0; i < data->header_count; i++) {
        free(data->headers[i]);
    }
    free(data->headers);
}

// Parse CSV line (handles quoted fields)
char **parse_csv_line(char *line, int *field_count) {
    char **fields = malloc(MAX_FIELDS * sizeof(char *));
    *field_count = 0;
    char *ptr = line;
    int in_quotes = 0;

    while (*ptr && *field_count < MAX_FIELDS) {
        // Skip leading whitespace
        while (*ptr && isspace(*ptr)) ptr++;

        if (*ptr == '"') {
            // Quoted field
            in_quotes = 1;
            ptr++;
        }

        char *field_start = ptr;
        char *field_end = ptr;

        while (*ptr) {
            if (in_quotes && *ptr == '"') {
                if (*(ptr + 1) == '"') {
                    // Escaped quote
                    ptr += 2;
                    field_end = ptr;
                } else {
                    // End of quoted field
                    in_quotes = 0;
                    ptr++;
                    break;
                }
            } else if (!in_quotes && (*ptr == ',' || *ptr == '\n' || *ptr == '\0')) {
                break;
            } else {
                ptr++;
                field_end = ptr;
            }
        }

        // Extract field
        size_t field_len = field_end - field_start;
        fields[*field_count] = malloc(field_len + 1);
        memcpy(fields[*field_count], field_start, field_len);
        fields[*field_count][field_len] = '\0';

        (*field_count)++;

        // Skip comma
        if (*ptr == ',') ptr++;
    }

    return fields;
}

CSVData *csv_read_file(const char *filename) {
    FILE *file = fopen(filename, "r");
    if (!file) return NULL;

    CSVData *data = calloc(1, sizeof(CSVData));
    char line[MAX_LINE];
    int is_first_line = 1;

    while (fgets(line, sizeof(line), file)) {
        // Remove trailing newline
        line[strcspn(line, "\n")] = '\0';

        int field_count;
        char **fields = parse_csv_line(line, &field_count);

        if (is_first_line) {
            // Treat first line as headers
            data->headers = fields;
            data->header_count = field_count;
            is_first_line = 0;
        } else {
            // Add as data row
            data->rows = realloc(data->rows, (data->row_count + 1) * sizeof(CSVRow));
            data->rows[data->row_count].fields = fields;
            data->rows[data->row_count].field_count = field_count;
            data->row_count++;
        }
    }

    fclose(file);
    return data;
}

void csv_print(CSVData *data) {
    if (data->header_count > 0) {
        for (int i = 0; i < data->header_count; i++) {
            printf("%s", data->headers[i]);
            if (i < data->header_count - 1) printf(",");
        }
        printf("\n");
    }

    for (int i = 0; i < data->row_count; i++) {
        CSVRow *row = &data->rows[i];
        for (int j = 0; j < row->field_count; j++) {
            printf("%s", row->fields[j]);
            if (j < row->field_count - 1) printf(",");
        }
        printf("\n");
    }
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <csv_file>\n", argv[0]);
        return 1;
    }

    CSVData *data = csv_read_file(argv[1]);
    if (!data) {
        perror("Failed to read CSV file");
        return 1;
    }

    printf("CSV file contains %d rows with %d columns\n",
           data->row_count, data->header_count);

    csv_print(data);
    csv_free(data);

    return 0;
}
\`\`\`

## System Monitoring Tools

### Process Information Utility
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <dirent.h>

typedef struct {
    pid_t pid;
    char name[256];
    char state;
    unsigned long utime;
    unsigned long stime;
    long rss;
} ProcessInfo;

void read_process_info(pid_t pid, ProcessInfo *info) {
    char path[256];
    FILE *file;

    info->pid = pid;

    // Read /proc/<pid>/stat
    snprintf(path, sizeof(path), "/proc/%d/stat", pid);
    file = fopen(path, "r");
    if (file) {
        fscanf(file, "%d %s %c %*d %*d %*d %*d %*d %*d %*d %*d %*d %*d %lu %lu",
               &info->pid, info->name, &info->state, &info->utime, &info->stime);
        fclose(file);
    }

    // Read /proc/<pid>/statm for memory info
    snprintf(path, sizeof(path), "/proc/%d/statm", pid);
    file = fopen(path, "r");
    if (file) {
        fscanf(file, "%*d %ld", &info->rss);
        info->rss *= getpagesize() / 1024;  // Convert to KB
        fclose(file);
    }
}

void list_processes() {
    DIR *dir = opendir("/proc");
    if (!dir) {
        perror("Cannot open /proc");
        return;
    }

    struct dirent *entry;
    printf("%-8s %-20s %-8s %-8s %-8s\n", "PID", "NAME", "STATE", "UTIME", "RSS(KB)");
    printf("-------- -------------------- -------- -------- --------\n");

    while ((entry = readdir(dir)) != NULL) {
        // Check if entry is a PID directory
        char *endptr;
        pid_t pid = strtol(entry->d_name, &endptr, 10);
        if (*endptr == '\0') {
            ProcessInfo info = {0};
            read_process_info(pid, &info);

            // Clean up process name (remove parentheses)
            char clean_name[256];
            size_t len = strlen(info.name);
            if (len >= 2) {
                memcpy(clean_name, info.name + 1, len - 2);
                clean_name[len - 2] = '\0';
            }

            printf("%-8d %-20s %-8c %-8lu %-8ld\n",
                   info.pid, clean_name, info.state, info.utime, info.rss);
        }
    }

    closedir(dir);
}

int main() {
    list_processes();
    return 0;
}
\`\`\`

### Memory Usage Monitor
\`\`\`c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

typedef struct {
    unsigned long total;
    unsigned long used;
    unsigned long free;
    unsigned long buffers;
    unsigned long cached;
} MemoryInfo;

void read_memory_info(MemoryInfo *mem) {
    FILE *file = fopen("/proc/meminfo", "r");
    if (!file) return;

    char line[256];
    while (fgets(line, sizeof(line), file)) {
        if (sscanf(line, "MemTotal: %lu kB", &mem->total) == 1) continue;
        if (sscanf(line, "MemFree: %lu kB", &mem->free) == 1) continue;
        if (sscanf(line, "Buffers: %lu kB", &mem->buffers) == 1) continue;
        if (sscanf(line, "Cached: %lu kB", &mem->cached) == 1) continue;
    }

    mem->used = mem->total - mem->free - mem->buffers - mem->cached;

    fclose(file);
}

void print_memory_bar(unsigned long used, unsigned long total, int width) {
    int used_width = (used * width) / total;
    printf("[");
    for (int i = 0; i < width; i++) {
        printf(i < used_width ? "█" : "░");
    }
    printf("]");
}

int main(int argc, char *argv[]) {
    int interval = 1;  // seconds
    if (argc > 1) {
        interval = atoi(argv[1]);
        if (interval < 1) interval = 1;
    }

    printf("Memory Monitor (updates every %d second%s)\n", interval, interval == 1 ? "" : "s");
    printf("Press Ctrl+C to exit\n\n");

    while (1) {
        MemoryInfo mem = {0};
        read_memory_info(&mem);

        printf("\rTotal: %6lu MB  Used: %6lu MB  Free: %6lu MB  Buffers: %6lu MB  Cached: %6lu MB  ",
               mem.total / 1024, mem.used / 1024, mem.free / 1024,
               mem.buffers / 1024, mem.cached / 1024);

        print_memory_bar(mem.used, mem.total, 20);
        printf(" %3.1f%%", (double)mem.used / mem.total * 100);

        fflush(stdout);
        sleep(interval);
    }

    return 0;
}
\`\`\`

Practical C applications demonstrate the language's power in system programming, data processing, and tool development. Command-line utilities, network clients, and system monitoring tools are common C application domains.`
};

