import { SubLesson } from '../../../../data/lessonsData';

export const topic_15_5: SubLesson = {
  id: '15.5',
  title: 'Character Handling (<ctype.h>) and Localization',
  status: 'demo',
  content: `# Character Handling (<ctype.h>) and Localization

## Character Classification Functions

### Basic Classification
\`\`\`c
#include <ctype.h>
#include <stdio.h>

void classify_char(char ch) {
    printf("Character: '%c' (ASCII: %d)\\n", ch, (int)ch);

    if (isalnum(ch)) printf("  Alphanumeric\\n");
    if (isalpha(ch)) printf("  Alphabetic\\n");
    if (isdigit(ch)) printf("  Digit\\n");
    if (isxdigit(ch)) printf("  Hexadecimal digit\\n");
    if (islower(ch)) printf("  Lowercase\\n");
    if (isupper(ch)) printf("  Uppercase\\n");
    if (isspace(ch)) printf("  Whitespace\\n");
    if (iscntrl(ch)) printf("  Control character\\n");
    if (isprint(ch)) printf("  Printable\\n");
    if (isgraph(ch)) printf("  Graphical (printable, not space)\\n");
    if (ispunct(ch)) printf("  Punctuation\\n");
    if (isblank(ch)) printf("  Blank (space or tab)\\n");  // C99
}

int main() {
    classify_char('A');
    printf("\\n");
    classify_char('7');
    printf("\\n");
    classify_char(' ');
    printf("\\n");
    classify_char('\\n');
    printf("\\n");
    classify_char('@');

    return 0;
}
\`\`\`

### Character Conversion Functions
\`\`\`c
#include <ctype.h>

int main() {
    char text[] = "Hello, World! 123";

    printf("Original: %s\\n", text);

    // Convert to uppercase
    for (char *p = text; *p; p++) {
        *p = toupper(*p);
    }
    printf("Upper: %s\\n", text);

    // Convert to lowercase
    for (char *p = text; *p; p++) {
        *p = tolower(*p);
    }
    printf("Lower: %s\\n", text);

    // Selective conversion
    char mixed[] = "MiXeD CaSe StRiNg";
    printf("Mixed: %s\\n", mixed);

    // Convert first letter of each word to uppercase
    int capitalize_next = 1;
    for (char *p = mixed; *p; p++) {
        if (isspace(*p)) {
            capitalize_next = 1;
        } else if (capitalize_next && isalpha(*p)) {
            *p = toupper(*p);
            capitalize_next = 0;
        } else {
            *p = tolower(*p);
        }
    }
    printf("Title: %s\\n", mixed);

    return 0;
}
\`\`\`

## Wide Character Support (<wctype.h>)

### Wide Character Classification
\`\`\`c
#include <wctype.h>
#include <wchar.h>
#include <locale.h>

int main() {
    // Set locale for wide character support
    setlocale(LC_ALL, "");

    wint_t wide_chars[] = {L'A', L'7', L'α', L'中', L' '};

    for (size_t i = 0; i < sizeof(wide_chars) / sizeof(wide_chars[0]); i++) {
        wint_t ch = wide_chars[i];
        wprintf(L"Character: %lc (0x%04X)\\n", ch, ch);

        if (iswalnum(ch)) wprintf(L"  Alphanumeric\\n");
        if (iswalpha(ch)) wprintf(L"  Alphabetic\\n");
        if (iswdigit(ch)) wprintf(L"  Digit\\n");
        if (iswlower(ch)) wprintf(L"  Lowercase\\n");
        if (iswupper(ch)) wprintf(L"  Uppercase\\n");
        if (iswspace(ch)) wprintf(L"  Whitespace\\n");
        if (iswprint(ch)) wprintf(L"  Printable\\n");
        wprintf(L"\\n");
    }

    return 0;
}
\`\`\`

### Wide Character Conversion
\`\`\`c
#include <wctype.h>
#include <wchar.h>

int main() {
    setlocale(LC_ALL, "");

    // Wide character case conversion
    wint_t upper = L'Σ';  // Greek sigma
    wint_t lower = towlower(upper);
    wint_t back_to_upper = towupper(lower);

    wprintf(L"Upper: %lc\\n", upper);
    wprintf(L"Lower: %lc\\n", lower);
    wprintf(L"Back to upper: %lc\\n", back_to_upper);

    // Wide string case conversion
    wchar_t greek[] = L"ΚΑΛΗΜΕΡΑ";  // Good morning in Greek
    wprintf(L"Original: %ls\\n", greek);

    // Convert to lowercase
    for (wchar_t *p = greek; *p; p++) {
        *p = towlower(*p);
    }
    wprintf(L"Lowercase: %ls\\n", greek);

    return 0;
}
\`\`\`

## Localization (<locale.h>)

### Locale Categories
\`\`\`c
#include <locale.h>
#include <stdio.h>

int main() {
    // Get current locale
    char *current = setlocale(LC_ALL, NULL);
    printf("Current locale: %s\\n", current);

    // Set different locale categories
    setlocale(LC_NUMERIC, "C");      // C locale for numbers
    setlocale(LC_TIME, "en_US.UTF-8"); // US English for time
    setlocale(LC_MONETARY, "de_DE");   // German for currency

    // Test numeric formatting
    printf("LC_NUMERIC test:\\n");
    printf("Number: %.2f\\n", 1234.56);

    // Test time formatting
    time_t now = time(NULL);
    struct tm *time_info = localtime(&now);
    char buffer[80];
    strftime(buffer, sizeof(buffer), "%c", time_info);
    printf("LC_TIME test: %s\\n", buffer);

    // Reset to default locale
    setlocale(LC_ALL, "");

    return 0;
}
\`\`\`

### Numeric Formatting in Different Locales
\`\`\`c
#include <locale.h>
#include <stdio.h>

int main() {
    double value = 1234567.89;

    // Test different numeric locales
    const char *locales[] = {"C", "en_US", "de_DE", "fr_FR", "ja_JP"};

    for (size_t i = 0; i < sizeof(locales) / sizeof(locales[0]); i++) {
        if (setlocale(LC_NUMERIC, locales[i]) != NULL) {
            printf("Locale %s: %.2f\\n", locales[i], value);
        } else {
            printf("Locale %s: not available\\n", locales[i]);
        }
    }

    // Reset to C locale
    setlocale(LC_NUMERIC, "C");

    return 0;
}
\`\`\`

## String Collation and Comparison

### Locale-Aware String Comparison
\`\`\`c
#include <locale.h>
#include <string.h>

int main() {
    setlocale(LC_ALL, "");

    // Words that sort differently in different locales
    const char *words[] = {
        "apple",
        "Banana",
        "cherry",
        "Date"
    };

    printf("Dictionary order (ASCII):\\n");
    for (int i = 0; i < 4; i++) {
        for (int j = i + 1; j < 4; j++) {
            if (strcmp(words[i], words[j]) > 0) {
                const char *temp = words[i];
                words[i] = words[j];
                words[j] = temp;
            }
        }
    }

    for (int i = 0; i < 4; i++) {
        printf("  %s\\n", words[i]);
    }

    // Note: strcoll() would provide locale-aware comparison
    // but implementation varies by system

    return 0;
}
\`\`\`

## Character Encoding

### Multibyte Character Handling
\`\`\`c
#include <stdlib.h>
#include <string.h>
#include <locale.h>

int main() {
    setlocale(LC_ALL, "");

    // UTF-8 string
    const char *utf8_str = "Hello, 世界! 🌍";
    printf("UTF-8 string: %s\\n", utf8_str);
    printf("Length in bytes: %zu\\n", strlen(utf8_str));

    // Convert to wide characters
    mbstate_t state = {0};
    size_t wide_len = mbsrtowcs(NULL, &utf8_str, 0, &state);

    if (wide_len != (size_t)-1) {
        wchar_t *wide_str = malloc((wide_len + 1) * sizeof(wchar_t));
        state = (mbstate_t){0};
        mbsrtowcs(wide_str, &utf8_str, wide_len + 1, &state);

        printf("Wide string length: %zu\\n", wcslen(wide_str));
        printf("First wide char: %lc (0x%04X)\\n", wide_str[0], wide_str[0]);

        free(wide_str);
    }

    // Check if character is valid in current locale
    int valid_count = 0;
    const char *ptr = utf8_str;
    while (*ptr) {
        size_t char_len = mbrlen(ptr, MB_CUR_MAX, &state);
        if (char_len == (size_t)-1) {
            printf("Invalid multibyte sequence\\n");
            break;
        } else if (char_len == (size_t)-2) {
            printf("Incomplete multibyte sequence\\n");
            break;
        } else if (char_len > 0) {
            valid_count++;
            ptr += char_len;
        } else {
            break;
        }
    }

    printf("Valid characters: %d\\n", valid_count);

    return 0;
}
\`\`\`

## Regular Expressions (POSIX)

### Basic Regular Expression Usage
\`\`\`c
#include <regex.h>
#include <stdio.h>

int main() {
    regex_t regex;
    const char *pattern = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    const char *test_emails[] = {
        "user@example.com",
        "invalid-email",
        "user.name+tag@example.co.uk",
        "user@subdomain.example.com"
    };

    // Compile regular expression
    int result = regcomp(&regex, pattern, REG_EXTENDED | REG_NOSUB);
    if (result != 0) {
        char error_buffer[100];
        regerror(result, &regex, error_buffer, sizeof(error_buffer));
        printf("Regex compilation failed: %s\\n", error_buffer);
        return 1;
    }

    // Test emails
    for (size_t i = 0; i < sizeof(test_emails) / sizeof(test_emails[0]); i++) {
        result = regexec(&regex, test_emails[i], 0, NULL, 0);
        printf("'%s' is %s\\n", test_emails[i],
               result == 0 ? "valid" : "invalid");
    }

    // Clean up
    regfree(&regex);

    return 0;
}
\`\`\`

## Utility Functions

### String Tokenization with Localization
\`\`\`c
#include <locale.h>
#include <string.h>

int main() {
    setlocale(LC_ALL, "");

    char text[] = "Hello, world! How are you today?";
    char *delimiters = " ,.!?";  // Include common punctuation

    printf("Tokenizing: %s\\n", text);

    // Use strtok_r for thread-safe tokenization
    char *saveptr;
    char *token = strtok_r(text, delimiters, &saveptr);

    while (token != NULL) {
        printf("Token: '%s'\\n", token);
        token = strtok_r(NULL, delimiters, &saveptr);
    }

    // Note: This modifies the original string
    // For read-only tokenization, use strspn/strcspn

    return 0;
}
\`\`\`

## Error Messages and Localization

### strerror and Locale
\`\`\`c
#include <locale.h>
#include <string.h>
#include <errno.h>

int main() {
    // Test different locales for error messages
    const char *locales[] = {"C", "en_US", "fr_FR", "de_DE"};

    for (size_t i = 0; i < sizeof(locales) / sizeof(locales[0]); i++) {
        if (setlocale(LC_MESSAGES, locales[i]) != NULL) {
            printf("Locale %s: %s\\n", locales[i], strerror(ENOENT));
        }
    }

    // Reset locale
    setlocale(LC_ALL, "C");

    return 0;
}
\`\`\`

Character handling and localization functions are essential for writing internationalized C programs that work correctly across different languages, character encodings, and cultural conventions. The <ctype.h> and <wctype.h> headers provide character classification and conversion, while <locale.h> enables locale-aware operations.`
};

