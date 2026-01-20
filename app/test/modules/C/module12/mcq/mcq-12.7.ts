import { Exercise } from '../../../../data/lessonsData';

export const exercise_12_7: Exercise = {
  id: "12.7",
  title: 'Advanced Thread Synchronization MCQs',
  status: 'demo',
  type: 'mcq',
  mcqQuestions: [
    {
      id: "q1",
      question: "What is the main difference between binary and counting semaphores?",
      options: [
        "Binary semaphores can only be used by one thread",
        "Counting semaphores can have values greater than 1",
        "Binary semaphores are faster",
        "Counting semaphores don't block threads"
      ],
      correctAnswer: 1,
      explanation: "Counting semaphores can have values greater than 1 and can allow multiple threads to access a resource, while binary semaphores are essentially mutexes with values 0 or 1."
    },
    {
      id: "q2",
      question: "Which synchronization primitive allows multiple readers but only one writer?",
      options: [
        "Mutex",
        "Semaphore",
        "Read-write lock",
        "Condition variable"
      ],
      correctAnswer: 2,
      explanation: "Read-write locks allow multiple threads to read simultaneously but ensure exclusive access for writers."
    },
    {
      id: "q3",
      question: "What does the ABA problem refer to in lock-free programming?",
      options: [
        "A deadlock situation",
        "A race condition where a value changes from A to B and back to A",
        "A memory allocation issue",
        "A thread scheduling problem"
      ],
      correctAnswer: 1,
      explanation: "The ABA problem occurs when a value is read as A, then changed to B by another thread, then back to A, causing the first thread to incorrectly assume nothing changed."
    },
    {
      id: "q4",
      question: "Which memory barrier ensures that all previous memory operations are visible before subsequent ones?",
      options: [
        "Read barrier",
        "Write barrier",
        "Full barrier",
        "Load barrier"
      ],
      correctAnswer: 2,
      explanation: "A full memory barrier ensures that all previous loads and stores are completed before any subsequent loads and stores become visible."
    },
    {
      id: "q5",
      question: "What is the purpose of hazard pointers in lock-free data structures?",
      options: [
        "To detect data races",
        "To safely reclaim memory in concurrent environments",
        "To prevent deadlocks",
        "To measure performance"
      ],
      correctAnswer: 1,
      explanation: "Hazard pointers help safely reclaim memory in lock-free algorithms by tracking which objects are currently being accessed by other threads."
    },
    {
      id: "q6",
      question: "Which POSIX function creates a barrier that synchronizes multiple threads?",
      options: [
        "pthread_barrier_init()",
        "pthread_cond_init()",
        "sem_init()",
        "pthread_mutex_init()"
      ],
      correctAnswer: 0,
      explanation: "pthread_barrier_init() creates a barrier that allows threads to synchronize at a specific point in execution."
    },
    {
      id: "q7",
      question: "What is the difference between lock-free and wait-free algorithms?",
      options: [
        "Lock-free algorithms use locks, wait-free don't",
        "Wait-free algorithms guarantee completion in finite steps for each operation",
        "Lock-free algorithms are faster",
        "Wait-free algorithms don't work on multiprocessors"
      ],
      correctAnswer: 1,
      explanation: "Wait-free algorithms guarantee that every operation completes in a finite number of steps, regardless of other threads' behavior, while lock-free algorithms only guarantee system-wide progress."
    },
    {
      id: "q8",
      question: "Which C11 atomic operation provides acquire-release semantics?",
      options: [
        "memory_order_relaxed",
        "memory_order_acquire",
        "memory_order_acq_rel",
        "memory_order_seq_cst"
      ],
      correctAnswer: 2,
      explanation: "memory_order_acq_rel provides both acquire semantics for loads and release semantics for stores, ensuring proper ordering across threads."
    },
    {
      id: "q9",
      question: "What is the main advantage of read-copy-update (RCU) over traditional locking?",
      options: [
        "It's faster for writes",
        "It allows lock-free reads",
        "It prevents deadlocks",
        "It uses less memory"
      ],
      correctAnswer: 1,
      explanation: "RCU allows readers to access data without locks or atomic operations, providing very fast read access while maintaining consistency."
    },
    {
      id: "q10",
      question: "Which tool is commonly used to detect race conditions in C programs?",
      options: [
        "Valgrind",
        "ThreadSanitizer",
        "GDB",
        "perf"
      ],
      correctAnswer: 1,
      explanation: "ThreadSanitizer (part of GCC/Clang) is specifically designed to detect data races and other threading issues in C/C++ programs."
    }
  ]
};
