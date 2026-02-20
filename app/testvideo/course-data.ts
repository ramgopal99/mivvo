import type { TypedSlide } from "@/app/dashboard/videolearn/_components/slides"

export interface CourseModule {
  id: string
  title: string
  description: string
  slides: TypedSlide[]
}

export const COURSE_DATA: CourseModule[] = [
  {
    id: "module-1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React and component-based development",
    slides: [
      {
        slideNumber: 1,
        type: "title_slide",
        title: "Introduction to React",
        content: {
          tts: "Welcome to Module 1: Introduction to React. In this module, we'll explore the fundamentals of React, a powerful JavaScript library for building user interfaces.",
          subtitle: "Building Modern Web Applications",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 12 },
      },
      {
        slideNumber: 2,
        type: "bullet_points",
        title: "What is React?",
        content: {
          tts: "React is a JavaScript library created by Facebook for building user interfaces. It allows developers to create reusable UI components and efficiently update the user interface when data changes.",
          bullets: [
            "JavaScript library for building UIs",
            "Created by Facebook in 2013",
            "Component-based architecture",
            "Virtual DOM for performance",
            "Declarative programming model",
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 15 },
      },
      {
        slideNumber: 3,
        type: "highlight_box",
        title: "Key Concept",
        content: {
          tts: "React uses a virtual DOM, which is a JavaScript representation of the real DOM. This allows React to efficiently update only the parts of the UI that have changed, resulting in better performance.",
          highlight: "Virtual DOM",
          supporting: "A JavaScript representation of the real DOM that enables efficient updates",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 14 },
      },
      {
        slideNumber: 4,
        type: "code_block",
        title: "Your First React Component",
        content: {
          tts: "Here's a simple React component. Components are the building blocks of React applications. They are JavaScript functions that return JSX, which describes what the UI should look like.",
          code: `function Welcome() {
  return <h1>Hello, World!</h1>;
}

export default Welcome;`,
          language: "javascript",
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 18 },
      },
      {
        slideNumber: 5,
        type: "bullet_points",
        title: "React Features",
        content: {
          tts: "React provides several powerful features that make it popular among developers. These include component reusability, one-way data binding, and a rich ecosystem of tools and libraries.",
          bullets: [
            "Component reusability",
            "One-way data binding",
            "JSX syntax",
            "React Hooks",
            "Rich ecosystem",
          ],
          variant: "cards",
        },
        timing: { displayDelay: 0, ttsDuration: 16 },
      },
      {
        slideNumber: 6,
        type: "code_step_explain",
        title: "Understanding JSX",
        content: {
          tts: "JSX is a syntax extension that allows you to write HTML-like code in JavaScript. Let's break down how JSX works step by step.",
          code: `const element = (
  <div>
    <h1>Hello, {name}</h1>
    <p>Welcome to React!</p>
  </div>
);`,
          language: "javascript",
          steps: [
            { lineRef: "L1", text: "JSX allows mixing HTML and JavaScript" },
            { lineRef: "L2", text: "Curly braces enable JavaScript expressions" },
            { lineRef: "L3", text: "JSX must have a single root element" },
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
      {
        slideNumber: 7,
        type: "comparison_table",
        title: "React vs Other Frameworks",
        content: {
          tts: "Let's compare React with other popular frameworks. Each has its strengths, but React's component-based approach and large community make it a popular choice.",
          headers: ["Feature", "React", "Vue", "Angular"],
          rows: [
            ["Learning Curve", "Moderate", "Easy", "Steep"],
            ["Bundle Size", "Small", "Small", "Large"],
            ["Community", "Very Large", "Large", "Large"],
            ["TypeScript", "Optional", "Optional", "Built-in"],
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
      {
        slideNumber: 8,
        type: "flow_tree",
        title: "React Component Lifecycle",
        content: {
          tts: "Understanding the React component lifecycle is crucial. Components go through mounting, updating, and unmounting phases, each with specific methods you can use.",
          nodes: [
            {
              id: "mount",
              label: "Mounting",
              children: [
                { id: "constructor", label: "Constructor" },
                { id: "render", label: "Render" },
                { id: "componentDidMount", label: "Component Did Mount" },
              ],
            },
            {
              id: "update",
              label: "Updating",
              children: [
                { id: "render-update", label: "Render" },
                { id: "componentDidUpdate", label: "Component Did Update" },
              ],
            },
            {
              id: "unmount",
              label: "Unmounting",
              children: [{ id: "componentWillUnmount", label: "Component Will Unmount" }],
            },
          ],
          variant: "vertical",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 9,
        type: "code_block",
        title: "Using Props",
        content: {
          tts: "Props allow you to pass data from parent components to child components. They are read-only and help make components reusable and flexible.",
          code: `function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return <Greeting name="Alice" />;
}`,
          language: "javascript",
          variant: "dark",
        },
        timing: { displayDelay: 0, ttsDuration: 16 },
      },
      {
        slideNumber: 10,
        type: "question_prompt",
        title: "Knowledge Check",
        content: {
          tts: "Let's test your understanding. Which of these statements about React is correct?",
          question: "What is React primarily used for?",
          options: [
            "Building server-side applications",
            "Building user interfaces",
            "Database management",
            "API development",
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 12 },
      },
      {
        slideNumber: 11,
        type: "summary_slide",
        title: "Module 1 Summary",
        content: {
          tts: "In this module, we've covered the basics of React, including what React is, its key features, JSX syntax, components, props, and the component lifecycle. You're now ready to move on to more advanced topics.",
          points: [
            "React is a JavaScript library for building UIs",
            "Components are reusable building blocks",
            "JSX allows HTML-like syntax in JavaScript",
            "Props pass data to components",
            "Understanding lifecycle is important",
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
    ],
  },
  {
    id: "module-2",
    title: "React Hooks and State Management",
    description: "Master React Hooks and learn how to manage component state effectively",
    slides: [
      {
        slideNumber: 1,
        type: "title_slide",
        title: "React Hooks and State Management",
        content: {
          tts: "Welcome to Module 2: React Hooks and State Management. In this module, we'll dive deep into React Hooks, which allow you to use state and other React features in functional components.",
          subtitle: "Modern React Development",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 15 },
      },
      {
        slideNumber: 2,
        type: "bullet_points",
        title: "What are React Hooks?",
        content: {
          tts: "React Hooks are functions that let you hook into React features from functional components. They were introduced in React 16.8 and revolutionized how we write React code.",
          bullets: [
            "Introduced in React 16.8",
            "Use state in functional components",
            "Access lifecycle features",
            "Share logic between components",
            "No need for class components",
          ],
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 16 },
      },
      {
        slideNumber: 3,
        type: "code_block",
        title: "useState Hook",
        content: {
          tts: "The useState hook is the most commonly used hook. It allows you to add state to functional components. Here's how to use it.",
          code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
          language: "javascript",
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
      {
        slideNumber: 4,
        type: "code_step_explain",
        title: "useState Explained",
        content: {
          tts: "Let's break down how useState works. The hook returns an array with two elements: the current state value and a function to update it.",
          code: `const [state, setState] = useState(initialValue);

// state: current value
// setState: function to update state
// initialValue: starting value`,
          language: "javascript",
          steps: [
            { lineRef: "L1", text: "useState returns an array with state and setter" },
            { lineRef: "L3", text: "State holds the current value" },
            { lineRef: "L4", text: "Setter function updates the state" },
            { lineRef: "L5", text: "Initial value sets the starting state" },
          ],
          variant: "split",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
      {
        slideNumber: 5,
        type: "code_block",
        title: "useEffect Hook",
        content: {
          tts: "The useEffect hook lets you perform side effects in functional components. It's similar to componentDidMount, componentDidUpdate, and componentWillUnmount combined.",
          code: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return <div>{data ? data.name : 'Loading...'}</div>;
}`,
          language: "javascript",
          variant: "dark",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 6,
        type: "highlight_box",
        title: "useEffect Dependencies",
        content: {
          tts: "The dependency array in useEffect controls when the effect runs. An empty array means it runs once on mount, while including values means it runs when those values change.",
          highlight: "Dependency Array",
          supporting: "Controls when useEffect runs: [] = once, [value] = when value changes, no array = every render",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 18 },
      },
      {
        slideNumber: 7,
        type: "code_block",
        title: "useContext Hook",
        content: {
          tts: "The useContext hook allows you to access context values without prop drilling. It's perfect for sharing data across multiple components.",
          code: `import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}`,
          language: "javascript",
          variant: "terminal",
        },
        timing: { displayDelay: 0, ttsDuration: 18 },
      },
      {
        slideNumber: 8,
        type: "comparison_table",
        title: "Common React Hooks",
        content: {
          tts: "Here's a comparison of the most commonly used React hooks. Each serves a specific purpose in modern React development.",
          headers: ["Hook", "Purpose", "When to Use"],
          rows: [
            ["useState", "Manage component state", "Need local state"],
            ["useEffect", "Handle side effects", "API calls, subscriptions"],
            ["useContext", "Access context", "Avoid prop drilling"],
            ["useReducer", "Complex state logic", "Multiple state updates"],
            ["useMemo", "Memoize values", "Expensive calculations"],
            ["useCallback", "Memoize functions", "Prevent re-renders"],
          ],
          variant: "striped",
        },
        timing: { displayDelay: 0, ttsDuration: 26 },
      },
      {
        slideNumber: 9,
        type: "code_block",
        title: "useReducer Hook",
        content: {
          tts: "useReducer is an alternative to useState for managing complex state logic. It's similar to Redux and is useful when you have multiple state updates or complex state transitions.",
          code: `import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      Count: {state.count}
    </button>
  );
}`,
          language: "javascript",
          variant: "line-numbers",
        },
        timing: { displayDelay: 0, ttsDuration: 28 },
      },
      {
        slideNumber: 10,
        type: "flow_tree",
        title: "State Management Options",
        content: {
          tts: "React offers multiple ways to manage state. The choice depends on your application's complexity and requirements.",
          nodes: [
            {
              id: "local",
              label: "Local State",
              children: [
                { id: "useState", label: "useState Hook" },
                { id: "useReducer", label: "useReducer Hook" },
              ],
            },
            {
              id: "context",
              label: "Context API",
              children: [{ id: "useContext", label: "useContext Hook" }],
            },
            {
              id: "external",
              label: "External Libraries",
              children: [
                { id: "redux", label: "Redux" },
                { id: "zustand", label: "Zustand" },
                { id: "jotai", label: "Jotai" },
              ],
            },
          ],
          variant: "horizontal",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
      {
        slideNumber: 11,
        type: "code_block",
        title: "Custom Hooks",
        content: {
          tts: "Custom hooks allow you to extract component logic into reusable functions. They're a powerful way to share stateful logic between components.",
          code: `function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

function Counter() {
  const { count, increment } = useCounter(0);
  return <button onClick={increment}>{count}</button>;
}`,
          language: "javascript",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 12,
        type: "question_prompt",
        title: "Knowledge Check",
        content: {
          tts: "Test your understanding of React Hooks. Which hook would you use to fetch data when a component mounts?",
          question: "Which hook is best for fetching data on component mount?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
          ],
          variant: "cards",
        },
        timing: { displayDelay: 0, ttsDuration: 14 },
      },
      {
        slideNumber: 13,
        type: "summary_slide",
        title: "Module 2 Summary",
        content: {
          tts: "In this module, we've covered React Hooks extensively. You've learned about useState, useEffect, useContext, useReducer, and how to create custom hooks. These are essential tools for modern React development.",
          points: [
            "Hooks enable state in functional components",
            "useState manages local component state",
            "useEffect handles side effects",
            "useContext avoids prop drilling",
            "Custom hooks share reusable logic",
          ],
          variant: "numbered",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
    ],
  },
  {
    id: "module-3",
    title: "Advanced React Patterns",
    description: "Explore advanced patterns, performance optimization, and best practices",
    slides: [
      {
        slideNumber: 1,
        type: "title_slide",
        title: "Advanced React Patterns",
        content: {
          tts: "Welcome to Module 3: Advanced React Patterns. In this final module, we'll explore advanced techniques, performance optimization, and best practices for building scalable React applications.",
          subtitle: "Building Production-Ready Apps",
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 18 },
      },
      {
        slideNumber: 2,
        type: "bullet_points",
        title: "Advanced Topics",
        content: {
          tts: "This module covers advanced React concepts that will help you build better, more performant applications. We'll explore patterns used in production applications.",
          bullets: [
            "Performance optimization",
            "Code splitting and lazy loading",
            "Higher-order components",
            "Render props pattern",
            "Error boundaries",
            "React.memo and useMemo",
          ],
          variant: "timeline",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
      {
        slideNumber: 3,
        type: "code_block",
        title: "React.memo for Optimization",
        content: {
          tts: "React.memo is a higher-order component that memoizes the result of a component. It only re-renders if the props have changed, which can significantly improve performance.",
          code: `import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive computation
  const result = processData(data);
  return <div>{result}</div>;
});

// Only re-renders if 'data' prop changes`,
          language: "javascript",
          variant: "classic",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
      {
        slideNumber: 4,
        type: "code_block",
        title: "useMemo Hook",
        content: {
          tts: "useMemo memoizes expensive calculations. It only recalculates when its dependencies change, preventing unnecessary computations on every render.",
          code: `import { useMemo } from 'react';

function ExpensiveList({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);
  
  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
          language: "javascript",
          variant: "dark",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
      {
        slideNumber: 5,
        type: "code_block",
        title: "useCallback Hook",
        content: {
          tts: "useCallback memoizes functions, preventing them from being recreated on every render. This is especially useful when passing functions as props to memoized components.",
          code: `import { useState, useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return <Child onClick={handleClick} />;
}

const Child = memo(({ onClick }) => (
  <button onClick={onClick}>Click me</button>
));`,
          language: "javascript",
          variant: "terminal",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 6,
        type: "code_block",
        title: "Lazy Loading Components",
        content: {
          tts: "React.lazy allows you to code-split your application by loading components only when they're needed. This reduces the initial bundle size and improves load times.",
          code: `import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`,
          language: "javascript",
          variant: "light",
        },
        timing: { displayDelay: 0, ttsDuration: 20 },
      },
      {
        slideNumber: 7,
        type: "code_block",
        title: "Error Boundaries",
        content: {
          tts: "Error boundaries catch JavaScript errors anywhere in the component tree and display a fallback UI instead of crashing the entire app. They're implemented as class components or using libraries.",
          code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
          language: "javascript",
          variant: "line-numbers",
        },
        timing: { displayDelay: 0, ttsDuration: 26 },
      },
      {
        slideNumber: 8,
        type: "highlight_box",
        title: "Performance Best Practices",
        content: {
          tts: "Following performance best practices is crucial for building fast React applications. Always measure before optimizing and use React DevTools Profiler to identify bottlenecks.",
          highlight: "Performance Tips",
          supporting: "Use React.memo, useMemo, useCallback, code splitting, and virtualize long lists. Always profile before optimizing.",
          variant: "quote",
        },
        timing: { displayDelay: 0, ttsDuration: 18 },
      },
      {
        slideNumber: 9,
        type: "comparison_table",
        title: "Optimization Techniques",
        content: {
          tts: "Here's a comparison of different optimization techniques. Each has its use case and should be applied judiciously based on your application's needs.",
          headers: ["Technique", "Use Case", "Impact"],
          rows: [
            ["React.memo", "Prevent re-renders", "High"],
            ["useMemo", "Expensive calculations", "Medium"],
            ["useCallback", "Function props", "Medium"],
            ["Code Splitting", "Large bundles", "High"],
            ["Virtualization", "Long lists", "High"],
            ["Lazy Loading", "Route-based", "High"],
          ],
          variant: "cards",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 10,
        type: "code_block",
        title: "Higher-Order Components",
        content: {
          tts: "Higher-order components are functions that take a component and return a new component with additional functionality. They're a pattern for reusing component logic.",
          code: `function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = checkAuth();
    
    if (!isAuthenticated) {
      return <LoginPage />;
    }
    
    return <WrappedComponent {...props} />;
  };
}

const ProtectedPage = withAuth(MyPage);`,
          language: "javascript",
          variant: "split",
        },
        timing: { displayDelay: 0, ttsDuration: 22 },
      },
      {
        slideNumber: 11,
        type: "flow_tree",
        title: "React Application Architecture",
        content: {
          tts: "A well-structured React application follows a clear architecture. Understanding this structure helps maintain and scale your application effectively.",
          nodes: [
            {
              id: "components",
              label: "Components",
              children: [
                { id: "presentational", label: "Presentational" },
                { id: "container", label: "Container" },
              ],
            },
            {
              id: "state",
              label: "State Management",
              children: [
                { id: "local-state", label: "Local State" },
                { id: "global-state", label: "Global State" },
              ],
            },
            {
              id: "routing",
              label: "Routing",
              children: [{ id: "react-router", label: "React Router" }],
            },
            {
              id: "api",
              label: "API Layer",
              children: [
                { id: "fetch", label: "Fetch / Axios" },
                { id: "react-query", label: "React Query" },
              ],
            },
          ],
          variant: "bracket",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
      {
        slideNumber: 12,
        type: "code_step_explain",
        title: "Render Props Pattern",
        content: {
          tts: "The render props pattern is a technique for sharing code between components using a prop whose value is a function. This pattern provides flexibility and reusability.",
          code: `function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return render(position);
}`,
          language: "javascript",
          steps: [
            { lineRef: "L1", text: "Component accepts a render function prop" },
            { lineRef: "L2", text: "Manages internal state" },
            { lineRef: "L4-8", text: "Handles side effects and cleanup" },
            { lineRef: "L10", text: "Calls render prop with state" },
          ],
          variant: "timeline",
        },
        timing: { displayDelay: 0, ttsDuration: 26 },
      },
      {
        slideNumber: 13,
        type: "question_prompt",
        title: "Final Knowledge Check",
        content: {
          tts: "Let's test your understanding of advanced React patterns. Which technique would you use to prevent a component from re-rendering when props haven't changed?",
          question: "What prevents unnecessary re-renders?",
          options: [
            "useState",
            "React.memo",
            "useEffect",
            "useContext",
          ],
          variant: "numbered",
        },
        timing: { displayDelay: 0, ttsDuration: 16 },
      },
      {
        slideNumber: 14,
        type: "summary_slide",
        title: "Course Complete!",
        content: {
          tts: "Congratulations! You've completed all three modules. You now have a solid understanding of React fundamentals, hooks, state management, and advanced patterns. Continue practicing and building projects to reinforce your learning.",
          points: [
            "Mastered React fundamentals",
            "Learned React Hooks",
            "Understood state management",
            "Explored advanced patterns",
            "Ready to build real applications",
          ],
          variant: "gradient",
        },
        timing: { displayDelay: 0, ttsDuration: 24 },
      },
    ],
  },
]
