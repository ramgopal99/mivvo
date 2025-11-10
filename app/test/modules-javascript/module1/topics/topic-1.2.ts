import { SubLesson } from '../../../data/lessonsData';

export const topic_1_2: SubLesson = {
  id: 1.2,
  title: 'Setting Up JavaScript Locally',
  status: 'completed',
  content: `# 🛠️ Setting Up JavaScript on Your Local Machine

Learn how to install Node.js, npm, and set up your JavaScript development environment for modern web development.

---

## 📋 Prerequisites

Before installing JavaScript tools, make sure your system meets these requirements:

### Windows Requirements
- Windows 7 or later (64-bit recommended)
- Administrator privileges for installation
- At least 2GB RAM, 4GB recommended

### macOS Requirements
- macOS 10.10 or later
- At least 4GB RAM

### Linux Requirements
- Most Linux distributions
- Package manager access
- At least 2GB RAM

---

## 🌐 Node.js Installation

### Method 1: Official Installer (Recommended)

1. **Download Node.js**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Choose the installer for your platform

2. **Install Node.js**
   - Run the installer
   - Follow the setup wizard
   - Accept default settings (includes npm)

3. **Verify Installation**
   - Open terminal/command prompt
   - Type: \`node --version\`
   - Type: \`npm --version\`

### Method 2: Package Managers

#### Windows (Chocolatey)
\`\`\`bash
# Install Chocolatey first (if not installed)
# Then install Node.js
choco install nodejs-lts
\`\`\`

#### macOS (Homebrew)
\`\`\`bash
# Install Homebrew (if not installed)
# Then install Node.js
brew install node
\`\`\`

#### Linux (Ubuntu/Debian)
\`\`\`bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
\`\`\`

---

## 🆚 Node.js vs Browser JavaScript

### Node.js Environment
- **Server-side JavaScript**
- **File system access**
- **Network operations**
- **npm packages**
- **CommonJS/ES6 modules**

### Browser Environment
- **DOM manipulation**
- **Web APIs**
- **Event handling**
- **Local storage**
- **Fetch API**

**You'll learn both, but start with Node.js for fundamentals!** 🚀

---

## 🖥️ Setting Up Your Development Environment

### 1. Choose a Code Editor

#### Visual Studio Code (Recommended)
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install JavaScript extensions:
   - "JavaScript (ES6) code snippets"
   - "ESLint"
   - "Prettier - Code formatter"
   - "Auto Rename Tag"
   - "Bracket Pair Colorizer"

#### Other Popular Options
- **WebStorm** (Professional IDE)
- **Sublime Text** (Lightweight)
- **Atom** (Hackable editor)
- **Vim/Emacs** (Terminal-based)

### 2. Essential Development Tools

#### Initialize a Node.js Project
\`\`\`bash
# Create project directory
mkdir my-js-project
cd my-js-project

# Initialize npm project
npm init -y

# This creates package.json
\`\`\`

#### Essential npm Packages (Global)
\`\`\`bash
# Install globally useful packages
npm install -g nodemon  # Auto-restart server
npm install -g live-server  # Local development server
npm install -g http-server  # Simple HTTP server
\`\`\`

---

## 🧪 Testing Your Setup

Create a simple JavaScript test program:

### Create hello.js (Node.js)
\`\`\`javascript
// hello.js - Node.js version
console.log('Hello, Node.js!');

// ES6 features
const name = 'JavaScript';
const greeting = \`Welcome to \${name} development!\`;

console.log(greeting);

// Modern JavaScript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

console.log('Original:', numbers);
console.log('Doubled:', doubled);

// Async/await example
async function fetchData() {
  try {
    // Simulate API call
    const response = await Promise.resolve({ data: 'Success!' });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
\`\`\`

### Create index.html (Browser)
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Test</title>
</head>
<body>
    <h1 id="title">Hello, Browser JavaScript!</h1>
    <button id="button">Click Me!</button>
    <div id="output"></div>

    <script>
        // Browser JavaScript
        const title = document.getElementById('title');
        const button = document.getElementById('button');
        const output = document.getElementById('output');

        let clickCount = 0;

        button.addEventListener('click', () => {
            clickCount++;
            output.textContent = \`Button clicked \${clickCount} time\${clickCount === 1 ? '' : 's'}!\`;

            // Modern JavaScript features
            const message = \`🎉 \${new Date().toLocaleTimeString()} - Click #\${clickCount}\`;
            console.log(message);
        });

        // ES6+ features
        const features = ['Arrow Functions', 'Template Literals', 'Promises', 'Async/Await'];
        features.forEach(feature => {
            console.log(\`✅ \${feature} supported\`);
        });
    </script>
</body>
</html>
\`\`\`

### Run the Tests

#### Node.js Test
\`\`\`bash
# Run the Node.js script
node hello.js
\`\`\`

**Expected Output:**
\`\`\`
Hello, Node.js!
Welcome to JavaScript development!
Original: [ 1, 2, 3, 4, 5 ]
Doubled: [ 2, 4, 6, 8, 10 ]
API Response: Success!
\`\`\`

#### Browser Test
\`\`\`bash
# Start a local server
npx live-server

# Or use the simple HTTP server
npx http-server

# Open browser to http://localhost:8080
# Click the button to test interactivity
\`\`\`

---

## 🐛 Troubleshooting Common Issues

### "node command not found" (Windows)
- Restart your terminal/command prompt
- Add Node.js to PATH manually
- Check installation directory: \`C:\\Program Files\\nodejs\`

### "npm command not found"
- npm comes with Node.js, reinstall Node.js
- Check if PATH includes npm directory

### Permission Errors (macOS/Linux)
\`\`\`bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
\`\`\`

### "Cannot find module" Error
\`\`\`bash
# Install missing module
npm install module-name

# Or install globally
npm install -g module-name
\`\`\`

---

## 📦 Working with npm

### Essential npm Commands
\`\`\`bash
# Initialize project
npm init -y

# Install packages
npm install package-name          # Save to dependencies
npm install package-name --save-dev   # Save to devDependencies
npm install package-name -g       # Install globally

# Run scripts
npm run script-name
npm start    # Runs "start" script
npm test     # Runs "test" script

# List installed packages
npm list
npm list -g  # Global packages

# Update packages
npm update
npm update package-name

# Remove packages
npm uninstall package-name
\`\`\`

### package.json Structure
\`\`\`json
{
  "name": "my-js-project",
  "version": "1.0.0",
  "description": "My JavaScript project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^29.0.0"
  }
}
\`\`\`

---

## 🔧 JavaScript Development Workflow

### 1. Project Setup
\`\`\`bash
# Create project
mkdir my-app
cd my-app
npm init -y

# Install development dependencies
npm install --save-dev nodemon jest eslint prettier
\`\`\`

### 2. Development Scripts
\`\`\`json
// package.json scripts
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint *.js",
    "format": "prettier --write *.js"
  }
}
\`\`\`

### 3. Write Code with Modern JS
\`\`\`javascript
// index.js - Modern JavaScript
import express from 'express';
import { readFile } from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 3000;

// Async/await with ES6 modules
app.get('/', async (req, res) => {
  try {
    const data = await readFile('./data.json', 'utf8');
    const jsonData = JSON.parse(data);

    res.json({
      message: 'Hello, Modern JavaScript!',
      data: jsonData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
\`\`\`

### 4. Run and Debug
\`\`\`bash
# Development mode (auto-restart)
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
\`\`\`

---

## 🌐 Browser vs Node.js Development

### Browser JavaScript
\`\`\`javascript
// Browser-only APIs
document.getElementById('myDiv');
localStorage.setItem('key', 'value');
fetch('/api/data');

// Event handling
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
\`\`\`

### Node.js JavaScript
\`\`\`javascript
// Node.js-only APIs
const fs = require('fs');
const http = require('http');
const path = require('path');

// File operations
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Server creation
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\\n');
});

server.listen(3000);
\`\`\`

---

## 🎯 Development Best Practices

### Code Quality Tools
\`\`\`bash
# ESLint for code linting
npm install --save-dev eslint
npx eslint --init

# Prettier for code formatting
npm install --save-dev prettier
\`\`\`

### Version Control
\`\`\`bash
# Initialize Git repository
git init
git add .
git commit -m "Initial commit"

# Create .gitignore
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
\`\`\`

### Environment Variables
\`\`\`bash
# .env file
PORT=3000
NODE_ENV=development
API_KEY=your-secret-key

# Use in code
require('dotenv').config();
console.log(process.env.PORT);
\`\`\`

---

## 📚 Essential JavaScript Learning Resources

### Official Documentation
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [npm Documentation](https://docs.npmjs.com/)

### Learning Platforms
- [freeCodeCamp](https://freecodecamp.org) - Interactive learning
- [JavaScript.info](https://javascript.info) - Comprehensive guide
- [Eloquent JavaScript](https://eloquentjavascript.net) - Free book

### Development Tools
- [VS Code](https://code.visualstudio.com) - Popular editor
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Browser debugging
- [Node.js REPL](https://nodejs.org/api/repl.html) - Interactive shell

---

🎉 **Congratulations!** You now have a complete JavaScript development environment with Node.js, npm, and modern tooling. Time to build amazing web applications! 🚀`
};
