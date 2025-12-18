import { Exercise } from '../../../../data/lessonsData';

export const exercise_17_1: Exercise = {
  id: "17.1",
  title: 'MCQ',
  status: 'completed',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is Spring Boot primarily used for?",
      options: ["Database management", "Rapid application development", "Frontend development", "Testing frameworks"],
      correctAnswer: 1,
      explanation: "Spring Boot is primarily used for rapid application development with auto-configuration and embedded servers."
    },
    {
      id: "q2",
      question: "What annotation is used to mark a class as a Spring component?",
      options: ["@Service", "@Component", "@Repository", "@Controller"],
      correctAnswer: 1,
      explanation: "@Component is the generic stereotype annotation, while others are specialized versions for specific layers."
    },
    {
      id: "q3",
      question: "What does @Autowired annotation do in Spring?",
      options: ["Creates a new instance", "Injects dependencies automatically", "Validates input data", "Handles exceptions"],
      correctAnswer: 1,
      explanation: "@Autowired enables automatic dependency injection by Spring's IoC container."
    },
    {
      id: "q4",
      question: "What is JPA in Spring?",
      options: ["Java Persistence API", "Java Performance Analyzer", "JSON Processing API", "Java Plugin Architecture"],
      correctAnswer: 0,
      explanation: "JPA stands for Java Persistence API, which provides ORM functionality for database operations."
    },
    {
      id: "q5",
      question: "Which annotation is used for REST controllers in Spring?",
      options: ["@Controller", "@RestController", "@RequestMapping", "@ResponseBody"],
      correctAnswer: 1,
      explanation: "@RestController combines @Controller and @ResponseBody, automatically serializing return values to JSON."
    },
    {
      id: "q6",
      question: "What is Hibernate in the context of Spring?",
      options: ["A logging framework", "An ORM framework", "A security framework", "A testing framework"],
      correctAnswer: 1,
      explanation: "Hibernate is an ORM (Object-Relational Mapping) framework that implements JPA specifications."
    },
    {
      id: "q7",
      question: "What does @Transactional annotation do?",
      options: ["Creates a new thread", "Manages database transactions", "Validates user input", "Compresses data"],
      correctAnswer: 1,
      explanation: "@Transactional manages database transactions, ensuring ACID properties and rollback on exceptions."
    },
    {
      id: "q8",
      question: "What is the purpose of Spring Security?",
      options: ["Database optimization", "Authentication and authorization", "UI design", "Performance monitoring"],
      correctAnswer: 1,
      explanation: "Spring Security provides comprehensive security services including authentication, authorization, and protection against attacks."
    },
    {
      id: "q9",
      question: "What does @Entity annotation indicate in JPA?",
      options: ["A service class", "A database table mapping", "A REST endpoint", "A configuration class"],
      correctAnswer: 1,
      explanation: "@Entity marks a class as a JPA entity that maps to a database table."
    },
    {
      id: "q10",
      question: "What is dependency injection in Spring?",
      options: ["A design pattern where objects define their dependencies", "A pattern where dependencies are injected by the framework", "A way to create singleton objects", "A method for testing code"],
      correctAnswer: 1,
      explanation: "Dependency injection is a design pattern where the Spring IoC container injects dependencies into objects rather than objects creating them."
    }
  ]
};

