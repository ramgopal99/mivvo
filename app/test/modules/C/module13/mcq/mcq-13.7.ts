import { Exercise } from '../../../../data/lessonsData';

export const exercise_13_7: Exercise = {
  id: "13.7",
  title: 'Network Programming MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "Which function is used to create a socket in C?",
      options: [
        "create_socket()",
        "socket()",
        "open_socket()",
        "new_socket()"
      ],
      correctAnswer: 1,
      explanation: "socket() is the standard C function for creating a socket, taking domain, type, and protocol parameters."
    },
    {
      id: "q2",
      question: "What does TCP provide that UDP doesn't?",
      options: [
        "Faster transmission",
        "Reliable delivery",
        "Smaller packet sizes",
        "Broadcast capability"
      ],
      correctAnswer: 1,
      explanation: "TCP provides reliable, ordered delivery with error recovery, while UDP provides best-effort delivery without guarantees."
    },
    {
      id: "q3",
      question: "Which function converts host byte order to network byte order for 16-bit integers?",
      options: [
        "htonl()",
        "htons()",
        "ntohl()",
        "ntohs()"
      ],
      correctAnswer: 1,
      explanation: "htons() converts a 16-bit integer from host byte order to network byte order."
    },
    {
      id: "q4",
      question: "What is the purpose of the bind() function?",
      options: [
        "To connect to a server",
        "To assign an address to a socket",
        "To send data",
        "To close a connection"
      ],
      correctAnswer: 1,
      explanation: "bind() assigns a local address and port number to a socket."
    },
    {
      id: "q5",
      question: "Which system call is used for I/O multiplexing?",
      options: [
        "select()",
        "poll()",
        "epoll()",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "select(), poll(), and epoll() are all used for I/O multiplexing in different scenarios."
    },
    {
      id: "q6",
      question: "What does the listen() function do?",
      options: [
        "Accepts incoming connections",
        "Marks a socket as passive for accepting connections",
        "Sends data to a peer",
        "Closes a socket"
      ],
      correctAnswer: 1,
      explanation: "listen() marks a socket as passive, indicating it will accept incoming connection requests."
    },
    {
      id: "q7",
      question: "Which function is used to establish a connection in TCP?",
      options: [
        "bind()",
        "listen()",
        "connect()",
        "accept()"
      ],
      correctAnswer: 2,
      explanation: "connect() is used by a TCP client to establish a connection with a server."
    },
    {
      id: "q8",
      question: "What is the main advantage of UDP over TCP?",
      options: [
        "Reliability",
        "Lower overhead",
        "Ordered delivery",
        "Connection-oriented"
      ],
      correctAnswer: 1,
      explanation: "UDP has lower protocol overhead since it doesn't provide reliability, ordering, or flow control mechanisms."
    },
    {
      id: "q9",
      question: "Which function is used to resolve hostnames to IP addresses?",
      options: [
        "inet_addr()",
        "gethostbyname()",
        "inet_ntoa()",
        "getaddrinfo()"
      ],
      correctAnswer: 3,
      explanation: "getaddrinfo() is the modern, protocol-independent function for resolving hostnames and service names."
    },
    {
      id: "q10",
      question: "What does SSL/TLS provide in network communication?",
      options: [
        "Faster transmission",
        "Compression",
        "Encryption and authentication",
        "Error correction"
      ],
      correctAnswer: 2,
      explanation: "SSL/TLS provides encryption, authentication, and integrity protection for network communications."
    }
  ]
};
