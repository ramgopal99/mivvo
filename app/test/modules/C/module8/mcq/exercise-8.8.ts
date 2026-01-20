import { Exercise } from '../../../../data/lessonsData';

export const exercise_8_8: Exercise = {
  id: "8.8",
  title: 'File I/O Coding Exercises',
  status: 'demo',
  type: 'code',
  codeQuestions: [
    {
      id: "code1",
      question: "Write a C program that creates a file called 'numbers.txt' and writes the numbers from 1 to 10 to it, each on a separate line.\n\nExample Output (in file):\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
      solution: `#include <stdio.h>

int main() {
    FILE *file = fopen("numbers.txt", "w");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write numbers 1 to 10 to file
    for (int i = 1; i <= 10; i++) {
        fprintf(file, "%d\\n", i);
    }

    fclose(file);
    printf("Numbers written to numbers.txt\\n");

    return 0;
}`
    },
    {
      id: "code2",
      question: "Write a C program that reads the 'numbers.txt' file created in the previous exercise and calculates the sum of all numbers in it.\n\nExample Output:\nSum of numbers: 55",
      solution: `#include <stdio.h>

int main() {
    FILE *file = fopen("numbers.txt", "r");

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int number, sum = 0;

    // Read numbers from file and calculate sum
    while (fscanf(file, "%d", &number) != EOF) {
        sum += number;
    }

    fclose(file);

    printf("Sum of numbers: %d\\n", sum);

    return 0;
}`
    },
    {
      id: "code3",
      question: "Write a C program that copies the contents of one text file to another. The program should take source and destination filenames as command line arguments.\n\nExample Usage:\n./program source.txt destination.txt\n\nExample: If source.txt contains 'Hello World', then destination.txt should also contain 'Hello World'",
      solution: `#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s <source_file> <destination_file>\\n", argv[0]);
        return 1;
    }

    FILE *source = fopen(argv[1], "r");
    if (source == NULL) {
        printf("Error opening source file!\\n");
        return 1;
    }

    FILE *destination = fopen(argv[2], "w");
    if (destination == NULL) {
        printf("Error opening destination file!\\n");
        fclose(source);
        return 1;
    }

    int ch;
    // Copy character by character
    while ((ch = fgetc(source)) != EOF) {
        fputc(ch, destination);
    }

    fclose(source);
    fclose(destination);

    printf("File copied successfully!\\n");

    return 0;
}`
    },
    {
      id: "code4",
      question: "Write a C program that counts the number of lines, words, and characters in a text file.\n\nExample Output:\nLines: 5\nWords: 23\nCharacters: 127\n\n(Hint: A word is any sequence of non-whitespace characters)",
      solution: `#include <stdio.h>
#include <ctype.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\\n", argv[0]);
        return 1;
    }

    FILE *file = fopen(argv[1], "r");
    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    int lines = 0, words = 0, characters = 0;
    int in_word = 0;
    int ch;

    while ((ch = fgetc(file)) != EOF) {
        characters++;

        if (ch == '\\n') {
            lines++;
        }

        if (isspace(ch)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }

    // Count the last line if file doesn't end with newline
    if (characters > 0 && ch != '\\n') {
        lines++;
    }

    fclose(file);

    printf("Lines: %d\\n", lines);
    printf("Words: %d\\n", words);
    printf("Characters: %d\\n", characters);

    return 0;
}`
    },
    {
      id: "code5",
      question: "Write a C program that appends text to an existing file. If the file doesn't exist, it should create it.\n\nExample: If 'log.txt' contains 'First line', after running the program it should contain:\nFirst line\nThis is an appended line\nLog entry at [current time]",
      solution: `#include <stdio.h>
#include <time.h>

int main() {
    FILE *file = fopen("log.txt", "a");  // Append mode

    if (file == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Get current time
    time_t now = time(NULL);
    struct tm *timeinfo = localtime(&now);

    // Append to file
    fprintf(file, "This is an appended line\\n");
    fprintf(file, "Log entry at %04d-%02d-%02d %02d:%02d:%02d\\n",
            timeinfo->tm_year + 1900,
            timeinfo->tm_mon + 1,
            timeinfo->tm_mday,
            timeinfo->tm_hour,
            timeinfo->tm_min,
            timeinfo->tm_sec);

    fclose(file);

    printf("Text appended to log.txt\\n");

    return 0;
}`
    }
  ]
};
