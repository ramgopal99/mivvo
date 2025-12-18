# Mivvo Test Platform - Unified Configuration System

A comprehensive learning platform with modular course management, dynamic language support, and intelligent AI assistance.

## 🎯 Architecture Overview

### **Modular Configuration System**
```
app/test/config/
├── config.ts          # Main export hub
├── types/
│   └── course.ts      # TypeScript interfaces
├── courses/
│   └── registry.ts    # Course definitions
└── utils/
    └── courseUtils.ts # Helper functions
```

### **Course Model Structure**
Each course encapsulates everything needed for that language:
```typescript
interface CourseModel {
  id: string;
  displayName: string;
  headerData: { title: string; completionPercentage: string };
  codeEditor?: { monacoLanguage: string; defaultCode: string; /* ... */ };
  aiAssistant: { systemPrompt: string; name: string; /* ... */ };
  showCodeEditor: boolean;
  // ... UI and behavior settings
}
```

## 🚀 Quick Start

### **Adding a New Course**
1. **Define the course** in `config/courses/registry.ts`:
```typescript
javascript: {
  id: 'javascript',
  displayName: 'JavaScript Programming',
  headerData: {
    title: 'JavaScript Programming Course',
    completionPercentage: '0% Completed',
  },
  codeEditor: {
    monacoLanguage: 'javascript',
    displayName: 'JavaScript',
    defaultCode: 'console.log("Hello, World!");',
    executionLanguage: 'javascript',
    executionVersion: '18.15.0'
  },
  aiAssistant: {
    name: 'Mivvo JavaScript Assistant',
    description: 'JavaScript Programming Learning Assistant',
    systemPrompt: `You are Mivvo, a helpful JavaScript programming assistant...`
  },
  showCodeEditor: true,
  // ... other properties
}
```

2. **Create course content** structure:
```
app/test/modules-javascript/
├── module1/
│   ├── module-info.ts
│   └── topics/
└── ...
```

3. **Update module loader** in `loaders/moduleLoader.ts`:
```typescript
// Add import
import { loadJavascriptModules } from './javascriptModuleLoader';

// Add to loader logic
if (language === 'javascript') {
  return loadJavascriptModules();
}
```

4. **That's it!** The course is now fully integrated with:
- ✅ Dynamic course loading
- ✅ AI assistant with language-specific prompts
- ✅ Code editor with proper syntax highlighting
- ✅ Header data and UI customization
- ✅ Automatic integration with all existing features

## 🎨 Key Features

### **🏗️ Modular Architecture**
- **Separation of Concerns**: Types, data, and logic in separate modules
- **Single Source of Truth**: Everything flows from the `COURSES` registry
- **Type Safety**: Full TypeScript support throughout
- **Easy Maintenance**: Clear file organization and responsibilities

### **🎓 Intelligent Course Management**
- **Dynamic Loading**: Courses load based on URL parameters
- **Flexible UI**: Code editors show/hide per course type
- **Course-Specific AI**: Each language has tailored AI prompts
- **Progress Tracking**: Individual completion states per course

### **💬 AI Assistant System**
- **Language-Specific Prompts**: Python, Java, and future languages
- **Context-Aware**: Understands the current course context
- **Educational Focus**: Tailored responses for learning
- **Multi-Language Support**: Different prompts for different languages

### **⚙️ Configuration-Driven**
- **No Hardcoding**: All settings come from course definitions
- **Runtime Flexibility**: Change courses without code changes
- **Extensible**: Add new properties to courses easily
- **Validation**: Built-in type checking and error handling

## 📊 Current Courses

| Language | Code Editor | AI Assistant | Status |
|----------|-------------|--------------|--------|
| **Python** | ✅ Full | ✅ Specialized | Complete |
| **Java** | ✅ Full | ✅ Specialized | Complete |
| *JavaScript* | ⏳ Planned | ⏳ Planned | Coming Soon |
| *Theory* | ❌ Hidden | ✅ Specialized | For future |

## 🔧 API Reference

### **Course Registry**
```typescript
import { COURSES, CURRENT_COURSE } from './config';

// Access course data
const pythonCourse = COURSES.python;
const currentCourse = COURSES[CURRENT_COURSE];
```

### **Utility Functions**
```typescript
import {
  getCourse,              // Get course by ID
  getAvailableCourses,    // List all course IDs
  getCourseDisplayName,   // Get display name
  shouldShowCodeEditor,   // Check if course has code editor
  getCodeEditorConfig,    // Get editor settings
  getAIAssistantPrompt,   // Get AI system prompt
} from './config';
```

### **Course-Specific AI**
```typescript
// Each course defines its own AI assistant
const aiConfig = getCourse('python').aiAssistant;
// Returns: { name, description, systemPrompt }
```

## 🎯 Benefits

### **For Developers**
- ✅ **Rapid Course Addition**: Add new languages in minutes
- ✅ **Type-Safe Configuration**: Compile-time error checking
- ✅ **Modular Organization**: Easy to understand and modify
- ✅ **Zero Breaking Changes**: Add features without affecting existing code

### **For Content Creators**
- ✅ **Flexible Course Design**: Mix coding and theory courses
- ✅ **Custom AI Behavior**: Tailored assistance per language
- ✅ **Rich Configuration**: Comprehensive course customization
- ✅ **Easy Content Management**: Clear separation of concerns

### **For Students**
- ✅ **Personalized Experience**: Course-specific UI and AI help
- ✅ **Multiple Learning Paths**: Coding + theory options
- ✅ **Consistent Interface**: Familiar experience across courses
- ✅ **Progress Preservation**: Individual tracking per course

## 🚀 Future Enhancements

- **Multi-Course Progress**: Combined progress across courses
- **Learning Paths**: Recommended course sequences
- **Advanced AI**: Context-aware hints and explanations
- **Collaborative Features**: Shared progress and achievements
- **Mobile Optimization**: Responsive design improvements

---

**Built with ❤️ for the Mivvo Learning Platform**
