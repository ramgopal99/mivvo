import { SubLesson } from '../../../../data/lessonsData';

export const topic_2_7: SubLesson = {
  id: "2.7",
  title: 'Input & User Interaction',
  status: 'completed',
  content: `# 📁 Input/Output and File Handling in Java

Java provides comprehensive I/O capabilities for reading from and writing to various sources including files, networks, and memory. Understanding Java I/O is essential for building real-world applications.

---

## 📖 Understanding Java I/O Streams

### **What are Streams?**
Streams represent flow of data between a program and a data source/sink. Java uses streams for all I/O operations.

\`\`\`java
import java.io.*;

public class StreamBasics {
    public static void main(String[] args) {
        // Byte streams (for binary data)
        InputStream inputStream = System.in;    // Standard input
        OutputStream outputStream = System.out; // Standard output

        // Character streams (for text data)
        Reader reader = new InputStreamReader(System.in);
        Writer writer = new OutputStreamWriter(System.out);

        System.out.println("Streams are the foundation of Java I/O");
    }
}
\`\`\`

### **Byte vs Character Streams**
- **Byte Streams**: Handle raw binary data (8-bit bytes)
- **Character Streams**: Handle text data with encoding support

---

## 📄 File Handling with File Class

### **File Operations**
\`\`\`java
import java.io.File;

public class FileOperations {
    public static void main(String[] args) {
        // Create File objects
        File file = new File("example.txt");
        File directory = new File("myfolder");
        File nestedFile = new File("myfolder/documents/readme.txt");

        // Check file/directory properties
        System.out.println("File exists: " + file.exists());
        System.out.println("Is directory: " + directory.isDirectory());
        System.out.println("Is file: " + file.isFile());

        // Get file information
        if (file.exists()) {
            System.out.println("File name: " + file.getName());
            System.out.println("Absolute path: " + file.getAbsolutePath());
            System.out.println("File size: " + file.length() + " bytes");
            System.out.println("Last modified: " + new java.util.Date(file.lastModified()));
            System.out.println("Can read: " + file.canRead());
            System.out.println("Can write: " + file.canWrite());
        }

        // Create directories
        File newDir = new File("newDirectory");
        if (newDir.mkdir()) {
            System.out.println("Directory created successfully");
        }

        // List directory contents
        File currentDir = new File(".");
        String[] files = currentDir.list();
        if (files != null) {
            System.out.println("Files in current directory:");
            for (String filename : files) {
                System.out.println("  " + filename);
            }
        }
    }
}
\`\`\`

---

## ✍️ Writing to Files

### **FileWriter (Character Stream)**
\`\`\`java
import java.io.FileWriter;
import java.io.IOException;

public class FileWriting {
    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("output.txt")) {
            // Write text to file
            writer.write("Hello, Java File I/O!\\n");
            writer.write("This is a new line.\\n");

            // Write character by character
            String text = "Writing character by character";
            for (char c : text.toCharArray()) {
                writer.write(c);
            }
            writer.write("\\n");

            // Append to existing file
            writer.append("This text is appended.\\n");

            System.out.println("Data written to file successfully");

        } catch (IOException e) {
            System.out.println("Error writing to file: " + e.getMessage());
        }
    }
}
\`\`\`

### **BufferedWriter (Efficient Writing)**
\`\`\`java
import java.io.*;

public class BufferedWriting {
    public static void main(String[] args) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("buffered_output.txt"))) {

            // Write multiple lines efficiently
            writer.write("Line 1: Hello World");
            writer.newLine();  // Platform-independent line separator

            writer.write("Line 2: Java I/O is powerful");
            writer.newLine();

            writer.write("Line 3: Buffered writing is efficient");
            writer.newLine();

            System.out.println("Buffered writing completed");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

### **PrintWriter (Formatted Output)**
\`\`\`java
import java.io.*;

public class PrintWriterDemo {
    public static void main(String[] args) {
        try (PrintWriter writer = new PrintWriter(new FileWriter("formatted_output.txt"))) {

            // Write formatted data (like System.out.printf)
            writer.println("=== User Information ===");
            writer.printf("Name: %s%n", "John Doe");
            writer.printf("Age: %d%n", 30);
            writer.printf("Salary: $%.2f%n", 75000.50);
            writer.printf("Active: %b%n", true);

            // Write objects
            java.util.Date now = new java.util.Date();
            writer.println("Current Date: " + now);

            System.out.println("Formatted output written");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 📖 Reading from Files

### **FileReader (Character Stream)**
\`\`\`java
import java.io.FileReader;
import java.io.IOException;

public class FileReading {
    public static void main(String[] args) {
        try (FileReader reader = new FileReader("output.txt")) {

            // Read character by character
            int character;
            System.out.println("File contents:");
            while ((character = reader.read()) != -1) {
                System.out.print((char) character);
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
\`\`\`

### **BufferedReader (Efficient Reading)**
\`\`\`java
import java.io.*;

public class BufferedReading {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("buffered_output.txt"))) {

            String line;
            int lineNumber = 1;

            System.out.println("Reading file line by line:");
            while ((line = reader.readLine()) != null) {
                System.out.println(lineNumber + ": " + line);
                lineNumber++;
            }

        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
\`\`\`

### **Scanner (Token-based Reading)**
\`\`\`java
import java.io.File;
import java.util.Scanner;

public class ScannerReading {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(new File("formatted_output.txt"))) {

            System.out.println("Reading with Scanner:");

            // Read different data types
            while (scanner.hasNext()) {
                if (scanner.hasNextInt()) {
                    int number = scanner.nextInt();
                    System.out.println("Found integer: " + number);
                } else if (scanner.hasNextDouble()) {
                    double decimal = scanner.nextDouble();
                    System.out.println("Found double: " + decimal);
                } else if (scanner.hasNextBoolean()) {
                    boolean bool = scanner.nextBoolean();
                    System.out.println("Found boolean: " + bool);
                } else {
                    String token = scanner.next();
                    System.out.println("Found token: " + token);
                }
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🔄 Modern File I/O (Java 7+ - NIO.2)

### **Files Class (Simple Operations)**
\`\`\`java
import java.nio.file.*;
import java.io.IOException;

public class ModernFileIO {
    public static void main(String[] args) {
        try {
            Path filePath = Paths.get("modern_file.txt");

            // Write all lines at once
            java.util.List<String> lines = java.util.Arrays.asList(
                "Line 1: Modern Java I/O",
                "Line 2: Simple and powerful",
                "Line 3: No need for streams"
            );
            Files.write(filePath, lines);

            // Read all lines at once
            java.util.List<String> readLines = Files.readAllLines(filePath);
            System.out.println("File contents:");
            for (String line : readLines) {
                System.out.println(line);
            }

            // Read entire file as string
            String content = Files.readString(filePath);
            System.out.println("\\nFull content: " + content);

            // File operations
            System.out.println("File size: " + Files.size(filePath) + " bytes");
            System.out.println("Is readable: " + Files.isReadable(filePath));
            System.out.println("Is writable: " + Files.isWritable(filePath));

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

### **Path Operations**
\`\`\`java
import java.nio.file.*;

public class PathOperations {
    public static void main(String[] args) {
        // Create paths
        Path path1 = Paths.get("folder", "subfolder", "file.txt");
        Path path2 = Paths.get("/absolute/path/to/file.txt");
        Path path3 = Paths.get("relative/path/file.txt");

        System.out.println("Path 1: " + path1);
        System.out.println("Path 2: " + path2);
        System.out.println("Path 3: " + path3);

        // Path operations
        System.out.println("File name: " + path1.getFileName());
        System.out.println("Parent: " + path1.getParent());
        System.out.println("Root: " + path1.getRoot());
        System.out.println("Name count: " + path1.getNameCount());

        // Path manipulation
        Path resolved = Paths.get("base").resolve("relative/path");
        System.out.println("Resolved: " + resolved);

        Path normalized = Paths.get("base", "..", "actual", "file.txt").normalize();
        System.out.println("Normalized: " + normalized);

        // Check if paths are the same
        Path p1 = Paths.get("file.txt");
        Path p2 = Paths.get("./file.txt");
        System.out.println("Paths equal: " + p1.equals(p2));
    }
}
\`\`\`

---

## 📂 Directory Operations

### **Creating and Managing Directories**
\`\`\`java
import java.io.File;
import java.nio.file.*;

public class DirectoryOperations {
    public static void main(String[] args) {
        try {
            // Create directories (old way)
            File oldDir = new File("oldStyle/directory");
            if (oldDir.mkdirs()) {
                System.out.println("Old style directory created");
            }

            // Create directories (new way - Java 7+)
            Path newDir = Paths.get("newStyle", "directory", "structure");
            Files.createDirectories(newDir);
            System.out.println("New style directory created");

            // List directory contents
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get("."))) {
                System.out.println("Current directory contents:");
                for (Path entry : stream) {
                    System.out.println("  " + entry.getFileName());
                }
            }

            // Walk through directory tree
            Path startPath = Paths.get(".");
            Files.walk(startPath, 2)  // Max depth of 2
                .filter(Files::isRegularFile)
                .forEach(path -> System.out.println("File: " + path));

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 📋 File and Directory Information

### **File Attributes**
\`\`\`java
import java.nio.file.*;
import java.nio.file.attribute.*;

public class FileAttributes {
    public static void main(String[] args) {
        try {
            Path filePath = Paths.get("output.txt");

            // Basic file attributes
            BasicFileAttributes attrs = Files.readAttributes(filePath, BasicFileAttributes.class);

            System.out.println("File: " + filePath.getFileName());
            System.out.println("Size: " + attrs.size() + " bytes");
            System.out.println("Created: " + attrs.creationTime());
            System.out.println("Modified: " + attrs.lastModifiedTime());
            System.out.println("Accessed: " + attrs.lastAccessTime());
            System.out.println("Is regular file: " + attrs.isRegularFile());
            System.out.println("Is directory: " + attrs.isDirectory());
            System.out.println("Is symbolic link: " + attrs.isSymbolicLink());

            // Set file permissions (Unix-like systems)
            if (java.nio.file.FileSystems.getDefault().supportedFileAttributeViews().contains("posix")) {
                PosixFileAttributes posixAttrs = Files.readAttributes(filePath, PosixFileAttributes.class);
                System.out.println("Owner: " + posixAttrs.owner());
                System.out.println("Group: " + posixAttrs.group());
                System.out.println("Permissions: " + posixAttrs.permissions());
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## 🔒 Serialization (Object I/O)

### **Object Serialization**
\`\`\`java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;  // Won't be serialized

    public Person(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + ", password='[HIDDEN]'}";
    }
}

public class SerializationDemo {
    public static void main(String[] args) {
        Person person = new Person("Alice", 30, "secret123");

        // Serialize object to file
        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            out.writeObject(person);
            System.out.println("Object serialized: " + person);
        } catch (IOException e) {
            System.out.println("Serialization error: " + e.getMessage());
        }

        // Deserialize object from file
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person restoredPerson = (Person) in.readObject();
            System.out.println("Object deserialized: " + restoredPerson);
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Deserialization error: " + e.getMessage());
        }
    }
}
\`\`\`

---

## ⚠️ I/O Best Practices and Error Handling

### **Proper Resource Management**
\`\`\`java
import java.io.*;

public class ResourceManagement {
    public static void oldWay() {
        FileReader reader = null;
        try {
            reader = new FileReader("file.txt");
            // Use reader...
            System.out.println("File opened successfully");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            // Manual cleanup
            try {
                if (reader != null) {
                    reader.close();
                    System.out.println("File closed manually");
                }
            } catch (IOException e) {
                System.out.println("Error closing file: " + e.getMessage());
            }
        }
    }

    public static void newWay() {
        // Automatic resource management
        try (FileReader reader = new FileReader("file.txt")) {
            // Use reader...
            System.out.println("File opened successfully");
            // File automatically closed when try block exits
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // No manual cleanup needed!
    }

    public static void main(String[] args) {
        System.out.println("=== Old Way ===");
        oldWay();
        System.out.println("=== New Way ===");
        newWay();
    }
}
\`\`\`

### **Exception Handling in I/O**
\`\`\`java
import java.io.*;
import java.nio.file.*;

public class IOErrorHandling {
    public static void safeFileRead(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            System.out.println("Error: Invalid filename");
            return;
        }

        Path filePath = Paths.get(filename);
        if (!Files.exists(filePath)) {
            System.out.println("Error: File does not exist: " + filename);
            return;
        }

        if (!Files.isReadable(filePath)) {
            System.out.println("Error: File is not readable: " + filename);
            return;
        }

        try {
            String content = Files.readString(filePath);
            System.out.println("File content: " + content);

        } catch (SecurityException e) {
            System.out.println("Error: Access denied: " + e.getMessage());
        } catch (OutOfMemoryError e) {
            System.out.println("Error: File too large to read into memory");
        } catch (IOException e) {
            System.out.println("Error: Failed to read file: " + e.getMessage());
        }
    }

    public static void safeFileWrite(String filename, String content) {
        try {
            Path filePath = Paths.get(filename);

            // Create parent directories if they don't exist
            Files.createDirectories(filePath.getParent());

            // Write content with proper encoding
            Files.writeString(filePath, content, java.nio.charset.StandardCharsets.UTF_8);

            System.out.println("File written successfully: " + filename);

        } catch (SecurityException e) {
            System.out.println("Error: Write access denied: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error: Failed to write file: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        safeFileRead("nonexistent.txt");
        safeFileRead("output.txt");

        safeFileWrite("safe_output.txt", "This is safe content\\nWith multiple lines");
    }
}
\`\`\`

---

## 🚀 Performance Considerations

### **Buffered vs Unbuffered I/O**
\`\`\`java
import java.io.*;
import java.nio.file.*;

public class IOPerformance {
    public static void main(String[] args) throws IOException {
        String testFile = "performance_test.txt";
        String content = "A".repeat(10000); // 10,000 characters

        // Write content to file for testing
        Files.writeString(Paths.get(testFile), content);

        System.out.println("=== Performance Comparison ===");

        // Test buffered reading
        long startTime = System.nanoTime();
        try (BufferedReader reader = new BufferedReader(new FileReader(testFile))) {
            while (reader.readLine() != null) {
                // Read all lines
            }
        }
        long bufferedTime = System.nanoTime() - startTime;
        System.out.println("Buffered reading: " + (bufferedTime / 1_000_000) + " ms");

        // Test unbuffered reading
        startTime = System.nanoTime();
        try (FileReader reader = new FileReader(testFile)) {
            int ch;
            while ((ch = reader.read()) != -1) {
                // Read character by character
            }
        }
        long unbufferedTime = System.nanoTime() - startTime;
        System.out.println("Unbuffered reading: " + (unbufferedTime / 1_000_000) + " ms");

        System.out.println("Buffered I/O is " + (unbufferedTime / bufferedTime) + "x faster!");

        // Clean up
        Files.deleteIfExists(Paths.get(testFile));
    }
}
\`\`\`

Java I/O provides powerful and flexible ways to work with files and data streams. Always use try-with-resources for automatic cleanup, handle exceptions properly, and consider using buffered I/O for better performance! 📁`
};


