# Dynamic Language System for Test Modules

This system allows you to dynamically load different programming language modules and content without changing multiple files.

## ⚡ Quick Start

**To switch courses, change ONE variable:**

1. Open `app/test/config/course.ts`
2. Change: `export const CURRENT_COURSE = 'java';`
3. To: `export const CURRENT_COURSE = 'python';`
4. Save - the entire app now shows Python content! 🎉

## 🚀 How It Works

### Core Components:
- **`app/test/config/course.ts`** - 🎯 **Single variable to switch courses!**
- **`moduleLoader.ts`** - Dynamically loads modules based on language
- **`headerDataLoader.ts`** - Dynamically loads header data based on language
- **`TestPage`** - Accepts `language` prop to display appropriate content
- **`LanguageTestWrapper`** - UI component with course switching buttons

### Usage:

#### **Method 1: Course Config (Easiest)**
```tsx
// 1. Change this line in app/test/config/course.ts:
// export const CURRENT_COURSE: 'python' | 'java' = 'java'; // Change to 'python' for Python

// 2. Use TestPage normally - it automatically uses the config
<TestPage /> // Will use whatever is set in config/course.ts
```

#### **Method 2: Direct Language Prop**
```tsx
// Override the config for specific cases
<TestPage language="java" />
<TestPage language="python" />
```

#### **Method 3: With Course Switcher**
```tsx
<LanguageTestWrapper /> // Includes UI buttons to switch between courses
```

#### **Method 4: Advanced Examples**
See `app/test/docs/examples.tsx` for more usage patterns!

## 📁 Adding a New Language

### Step 1: Create Module Structure
```
app/test/modules-{language}/
├── module1/
│   ├── module-info.ts
│   ├── topics/
│   │   ├── topic-1.1.ts
│   │   └── topic-1.2.ts
│   └── mcq/
│       └── exercise-1.3.ts
└── module2/
    └── ...
```

### Step 2: Create Header Data
```tsx
// app/test/data/headerData-{language}.ts
export const headerData = {
  title: 'Master {Language}',
  completionPercentage: '0% Completed',
};
```

### Step 3: Update Loaders

#### In `moduleLoader.ts`:
1. Add imports for the new language modules
2. Add entry to `MODULE_CONFIGS` object

#### In `headerDataLoader.ts`:
1. Add import for the new header data
2. Add entry to `HEADER_DATA_CONFIG` object

### Step 4: Test
The new language will be automatically available in the language selector!

## 📊 Current Languages

- **Python** - 20 modules with full content
- **Java** - 1 module (intro) with exercises
- **C** - 1 module (intro) with exercises
- **C++** - 1 module (intro) with exercises
- **JavaScript** - 1 module (intro) with exercises

## 🔧 API Reference

### `loadModules(language: string)`
```tsx
const modules = await loadModules('java'); // Returns Java modules
```

### `getHeaderData(language: string)`
```tsx
const header = getHeaderData('python'); // Returns Python header data
```

### `getAvailableLanguages()`
```tsx
const languages = getAvailableLanguages(); // Returns ['python', 'java', ...]
```

## 🎯 Benefits

- ✅ **Single file changes** - Add new languages by updating just 2 loader files
- ✅ **Type safety** - Full TypeScript support
- ✅ **Performance** - Static imports, no dynamic loading overhead
- ✅ **Extensible** - Easy to add new languages following the same pattern
- ✅ **Clean architecture** - Separation of concerns between languages
