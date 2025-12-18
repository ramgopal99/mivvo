import { Exercise } from '../../../../data/lessonsData';

export const exercise_1_4: Exercise = {
  id: 1.4,
  title: "EXERCISE",
  status: 'completed',
  type: 'code',
  codeQuestions: [
    {
      id: "ex1",
      question: "Create your first Java program that:\n1. Defines a public class called 'HelloJava'\n2. Implements the main method with correct signature\n3. Uses System.out.println() to print 'Hello, Java World!'\n4. Includes a single-line comment explaining the program\n5. Compiles and runs successfully",
      solution: `// This is my first Java program
public class HelloJava {
    public static void main(String[] args) {
        System.out.println("Hello, Java World!");
    }
}`
    },
    {
      id: "ex2",
      question: "Write a Java program that demonstrates basic Java syntax:\n1. Uses multiple System.out.println() statements\n2. Shows proper indentation and formatting\n3. Includes both single-line and multi-line comments\n4. Prints your name and favorite programming language\n5. Uses string concatenation with the + operator",
      solution: `/*
 * This program demonstrates basic Java syntax
 * Author: Java Student
 * Date: Current Date
 */

public class BasicSyntax {
    public static void main(String[] args) {
        // Print greeting
        System.out.println("Hello, World!");

        // Print personal information
        String name = "Java Student";
        String favoriteLanguage = "Java";

        System.out.println("My name is: " + name);
        System.out.println("My favorite programming language is: " + favoriteLanguage);

        // Print a fun message
        System.out.println("Java is " + favoriteLanguage + " and I love it!");
    }
}`
    },
    {
      id: "ex3",
      question: "Create a program that explores Java environment information:\n1. Prints 'Java Version: ' followed by the Java version\n2. Prints 'Java Vendor: ' followed by the vendor name\n3. Prints 'OS Name: ' followed by the operating system\n4. Uses System.getProperty() method to get system information\n5. Demonstrates string concatenation and system property access",
      solution: `public class JavaEnvironment {
    public static void main(String[] args) {
        // Get Java version information
        String javaVersion = System.getProperty("java.version");
        String javaVendor = System.getProperty("java.vendor");

        // Get operating system information
        String osName = System.getProperty("os.name");
        String osVersion = System.getProperty("os.version");

        // Display the information
        System.out.println("Java Version: " + javaVersion);
        System.out.println("Java Vendor: " + javaVendor);
        System.out.println("OS Name: " + osName);
        System.out.println("OS Version: " + osVersion);

        // Additional fun information
        System.out.println("Java Home: " + System.getProperty("java.home"));
        System.out.println("User Directory: " + System.getProperty("user.dir"));
    }
}`
    },
    {
      id: "ex4",
      question: "Write a Java program that demonstrates JVM concepts:\n1. Shows that Java is platform-independent\n2. Explains compilation vs interpretation\n3. Uses comments to explain the JVM role\n4. Prints information about the runtime environment\n5. Demonstrates bytecode execution concept",
      solution: `/**
 * This program demonstrates Java Virtual Machine (JVM) concepts
 * Java code is compiled to bytecode (.class files) that runs on any JVM
 */
public class JVMConcepts {
    public static void main(String[] args) {
        System.out.println("=== Java Virtual Machine (JVM) Concepts ===");
        System.out.println();

        // Java is platform-independent
        System.out.println("1. Platform Independence:");
        System.out.println("   - Java code compiles to bytecode (.class files)");
        System.out.println("   - Bytecode runs on any platform with JVM installed");
        System.out.println("   - 'Write Once, Run Anywhere' principle");
        System.out.println();

        // JVM Information
        System.out.println("2. JVM Runtime Information:");
        System.out.println("   JVM Version: " + System.getProperty("java.vm.version"));
        System.out.println("   JVM Name: " + System.getProperty("java.vm.name"));
        System.out.println("   JVM Vendor: " + System.getProperty("java.vm.vendor"));
        System.out.println();

        // Compilation vs Runtime
        System.out.println("3. Compilation Process:");
        System.out.println("   Source Code (.java) -> Compiler (javac) -> Bytecode (.class)");
        System.out.println("   Bytecode -> JVM -> Machine Code -> Execution");
        System.out.println();

        System.out.println("4. This program runs the same way on Windows, Mac, or Linux!");
        System.out.println("   As long as a JVM is installed on the target platform.");
    }
}`
    },
    {
      id: "ex5",
      question: "Create a Java program that sets up a complete development environment simulation:\n1. Demonstrates JDK vs JRE concepts\n2. Shows classpath and package concepts\n3. Includes proper documentation comments\n4. Uses environment variables simulation\n5. Explains the development workflow",
      solution: `/**
 * Java Development Environment Setup Demo
 *
 * This program demonstrates the components of a Java development environment:
 * - JDK (Java Development Kit) for development
 * - JRE (Java Runtime Environment) for running applications
 * - Classpath and package management
 *
 * @author Java Developer
 * @version 1.0
 */
public class DevelopmentEnvironment {

    public static void main(String[] args) {
        System.out.println("=== Java Development Environment ===");
        System.out.println();

        // JDK Components
        System.out.println("1. JDK (Java Development Kit) Components:");
        System.out.println("   - javac: Java Compiler (converts .java to .class)");
        System.out.println("   - java: Java Runtime (runs .class files)");
        System.out.println("   - jar: Archive tool (creates JAR files)");
        System.out.println("   - javadoc: Documentation generator");
        System.out.println();

        // JRE Components
        System.out.println("2. JRE (Java Runtime Environment) Components:");
        System.out.println("   - JVM: Java Virtual Machine (runs bytecode)");
        System.out.println("   - Core libraries: Essential Java classes");
        System.out.println("   - Runtime tools: For executing Java applications");
        System.out.println();

        // Development Workflow
        System.out.println("3. Development Workflow:");
        System.out.println("   1. Write source code (.java files)");
        System.out.println("   2. Compile with 'javac' to create bytecode");
        System.out.println("   3. Run with 'java' command");
        System.out.println("   4. Package with 'jar' for distribution");
        System.out.println();

        // Environment Information
        System.out.println("4. Current Environment:");
        System.out.println("   Java Version: " + System.getProperty("java.version"));
        System.out.println("   Classpath: " + System.getProperty("java.class.path"));
        System.out.println("   Java Home: " + System.getProperty("java.home"));

        System.out.println();
        System.out.println("✅ Java Development Environment is ready!");
    }
}`
    }
  ]
};


