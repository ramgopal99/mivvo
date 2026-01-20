import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_4: SubLesson = {
  id: '15.4',
  title: 'Time and Date Functions (<time.h>)',
  status: 'demo',
  content: `# Time and Date Functions (<time.h>)

## Time Representation

### Time Types
\`\`\`c
#include <time.h>
#include <stdio.h>

int main() {
    // time_t - arithmetic time type
    time_t current_time;
    time(&current_time);  // Get current time
    printf("Current time_t: %ld\\n", (long)current_time);

    // struct tm - broken-down time
    struct tm *time_info;
    time_info = localtime(&current_time);

    printf("Year: %d\\n", time_info->tm_year + 1900);
    printf("Month: %d\\n", time_info->tm_mon + 1);
    printf("Day: %d\\n", time_info->tm_mday);
    printf("Hour: %d\\n", time_info->tm_hour);
    printf("Minute: %d\\n", time_info->tm_min);
    printf("Second: %d\\n", time_info->tm_sec);

    // struct timespec - nanosecond precision (C11)
    struct timespec nano_time;
    timespec_get(&nano_time, TIME_UTC);
    printf("Nanoseconds: %ld\\n", nano_time.tv_nsec);

    return 0;
}
\`\`\`

### Time Conversion Functions
\`\`\`c
#include <time.h>

int main() {
    time_t now = time(NULL);

    // time_t to struct tm (local time)
    struct tm *local = localtime(&now);
    printf("Local time: %s", asctime(local));

    // time_t to struct tm (UTC)
    struct tm *utc = gmtime(&now);
    printf("UTC time: %s", asctime(utc));

    // struct tm to time_t
    struct tm future_time = *local;
    future_time.tm_mday += 7;  // Add 7 days
    time_t future = mktime(&future_time);
    printf("Future time: %s", ctime(&future));

    // Manual time construction
    struct tm manual_time = {
        .tm_year = 2024 - 1900,  // Years since 1900
        .tm_mon = 0,             // 0-based month
        .tm_mday = 1,            // Day of month
        .tm_hour = 12,
        .tm_min = 0,
        .tm_sec = 0
    };

    time_t manual_timestamp = mktime(&manual_time);
    printf("Manual time: %s", ctime(&manual_timestamp));

    return 0;
}
\`\`\`

## Formatting and Parsing

### Time Formatting
\`\`\`c
#include <time.h>

int main() {
    time_t now = time(NULL);
    struct tm *time_info = localtime(&now);
    char buffer[80];

    // strftime - format time to string
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", time_info);
    printf("ISO format: %s\\n", buffer);

    strftime(buffer, sizeof(buffer), "%A, %B %d, %Y", time_info);
    printf("Long format: %s\\n", buffer);

    strftime(buffer, sizeof(buffer), "%I:%M %p", time_info);
    printf("12-hour format: %s\\n", buffer);

    // Common format specifiers:
    // %Y - Year (4 digits)
    // %m - Month (01-12)
    // %d - Day (01-31)
    // %H - Hour (00-23)
    // %M - Minute (00-59)
    // %S - Second (00-59)
    // %A - Full weekday name
    // %B - Full month name
    // %I - Hour (01-12)
    // %p - AM/PM

    return 0;
}
\`\`\`

### Time Parsing
\`\`\`c
#include <time.h>

int main() {
    // strptime - parse time from string (POSIX extension)
    #ifdef _XOPEN_SOURCE
    struct tm parsed_time = {0};
    const char *time_str = "2024-01-15 14:30:45";

    if (strptime(time_str, "%Y-%m-%d %H:%M:%S", &parsed_time) != NULL) {
        time_t timestamp = mktime(&parsed_time);
        printf("Parsed time: %s", ctime(&timestamp));
    }
    #endif

    // Manual parsing with sscanf
    int year, month, day, hour, minute, second;
    if (sscanf("2024-01-15 14:30:45", "%d-%d-%d %d:%d:%d",
               &year, &month, &day, &hour, &minute, &second) == 6) {

        struct tm manual = {
            .tm_year = year - 1900,
            .tm_mon = month - 1,
            .tm_mday = day,
            .tm_hour = hour,
            .tm_min = minute,
            .tm_sec = second
        };

        time_t parsed = mktime(&manual);
        printf("Manually parsed: %s", ctime(&parsed));
    }

    return 0;
}
\`\`\`

## Time Arithmetic

### Time Differences
\`\`\`c
#include <time.h>

int main() {
    // difftime - calculate difference in seconds
    time_t start = time(NULL);

    // Simulate some work
    for (volatile long i = 0; i < 100000000; i++);

    time_t end = time(NULL);

    double elapsed = difftime(end, start);
    printf("Elapsed time: %.2f seconds\\n", elapsed);

    // Time arithmetic with mktime
    struct tm *now = localtime(&start);
    struct tm future = *now;

    // Add 30 days
    future.tm_mday += 30;
    time_t future_time = mktime(&future);

    double days_diff = difftime(future_time, start) / (60 * 60 * 24);
    printf("30 days from now: %.1f days\\n", days_diff);

    return 0;
}
\`\`\`

## High-Resolution Timing

### Clock Functions
\`\`\`c
#include <time.h>

int main() {
    // clock() - processor time
    clock_t start = clock();

    // Some computation
    volatile double result = 0;
    for (int i = 0; i < 1000000; i++) {
        result += sin(i) * cos(i);
    }

    clock_t end = clock();
    double cpu_time = (double)(end - start) / CLOCKS_PER_SEC;
    printf("CPU time: %.3f seconds\\n", cpu_time);

    // timespec for high resolution timing
    struct timespec start_ts, end_ts;
    timespec_get(&start_ts, TIME_UTC);

    // High-precision operation
    for (volatile int i = 0; i < 100000; i++);

    timespec_get(&end_ts, TIME_UTC);

    // Calculate difference
    time_t sec_diff = end_ts.tv_sec - start_ts.tv_sec;
    long nsec_diff = end_ts.tv_nsec - start_ts.tv_nsec;
    if (nsec_diff < 0) {
        sec_diff--;
        nsec_diff += 1000000000L;
    }

    printf("Wall time: %ld.%09ld seconds\\n", sec_diff, nsec_diff);

    return 0;
}
\`\`\`

## Time Zones and Localization

### Time Zone Handling
\`\`\`c
#include <time.h>

int main() {
    time_t now = time(NULL);

    // Local time vs UTC
    struct tm *local = localtime(&now);
    struct tm *utc = gmtime(&now);

    printf("Local: %s", asctime(local));
    printf("UTC:   %s", asctime(utc));

    // Time zone information
    printf("Timezone: %s\\n", tzname[0]);  // Standard timezone name
    printf("DST name: %s\\n", tzname[1]);  // Daylight saving name
    printf("DST active: %d\\n", daylight); // Whether DST is in effect

    // Set timezone (POSIX)
    setenv("TZ", "America/New_York", 1);
    tzset();  // Update timezone information

    struct tm *new_local = localtime(&now);
    printf("New York time: %s", asctime(new_local));

    return 0;
}
\`\`\`

## Date and Time Utilities

### Calendar Functions
\`\`\`c
#include <time.h>

// Check if year is leap year
int is_leap_year(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

// Get days in month
int days_in_month(int year, int month) {
    static int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    if (month == 1 && is_leap_year(year)) {  // February
        return 29;
    }

    return days[month];
}

// Add days to date
struct tm add_days(struct tm date, int days) {
    date.tm_mday += days;

    // Normalize the date
    mktime(&date);

    return date;
}

int main() {
    time_t now = time(NULL);
    struct tm *current = localtime(&now);

    printf("Current date: %04d-%02d-%02d\\n",
           current->tm_year + 1900, current->tm_mon + 1, current->tm_mday);

    printf("Is leap year: %s\\n",
           is_leap_year(current->tm_year + 1900) ? "Yes" : "No");

    printf("Days in current month: %d\\n",
           days_in_month(current->tm_year + 1900, current->tm_mon));

    // Add 30 days
    struct tm future = add_days(*current, 30);
    printf("30 days later: %04d-%02d-%02d\\n",
           future.tm_year + 1900, future.tm_mon + 1, future.tm_mday);

    return 0;
}
\`\`\`

## Timer Functions

### Alarm and Sleep
\`\`\`c
#include <unistd.h>
#include <signal.h>

void alarm_handler(int sig) {
    printf("Alarm triggered!\\n");
}

int main() {
    // Set up signal handler
    signal(SIGALRM, alarm_handler);

    // Set alarm for 5 seconds
    alarm(5);
    printf("Alarm set for 5 seconds...\\n");

    // Sleep for 2 seconds
    sleep(2);
    printf("Slept for 2 seconds\\n");

    // Sleep with microsecond precision
    usleep(500000);  // 0.5 seconds
    printf("Slept for 0.5 seconds\\n");

    // Cancel alarm
    alarm(0);
    printf("Alarm cancelled\\n");

    return 0;
}
\`\`\`

## Performance Measurement

### Benchmarking Template
\`\`\`c
#include <time.h>
#include <sys/time.h>

typedef struct {
    struct timespec start;
    struct timespec end;
} Timer;

void timer_start(Timer *timer) {
    timespec_get(&timer->start, TIME_UTC);
}

double timer_stop(Timer *timer) {
    timespec_get(&timer->end, TIME_UTC);

    time_t sec_diff = timer->end.tv_sec - timer->start.tv_sec;
    long nsec_diff = timer->end.tv_nsec - timer->start.tv_nsec;

    if (nsec_diff < 0) {
        sec_diff--;
        nsec_diff += 1000000000L;
    }

    return sec_diff + nsec_diff / 1e9;
}

int main() {
    Timer timer;

    // Benchmark function 1
    timer_start(&timer);
    // Function to benchmark
    volatile long sum = 0;
    for (long i = 0; i < 1000000; i++) {
        sum += i;
    }
    double time1 = timer_stop(&timer);
    printf("Function 1: %.6f seconds\\n", time1);

    // Benchmark function 2
    timer_start(&timer);
    // Another function to benchmark
    volatile double result = 0;
    for (long i = 0; i < 1000000; i++) {
        result += sin(i) * cos(i);
    }
    double time2 = timer_stop(&timer);
    printf("Function 2: %.6f seconds\\n", time2);

    return 0;
}
\`\`\`

The <time.h> header provides comprehensive time and date handling functions essential for applications requiring temporal operations, scheduling, and performance measurement. Understanding the different time representations and conversion functions is crucial for proper time handling in C programs.`
};

