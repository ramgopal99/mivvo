# SUSE Mono Fonts

Your SUSE Mono fonts are now configured and applied globally to your project!

## 🎯 **Current Setup:**

### **Font Loading:**
- ✅ **16 font variants** loaded (8 weights × 2 styles)
- ✅ **Weights:** Thin (100) to ExtraBold (800)
- ✅ **Styles:** Normal & Italic
- ✅ **Global application:** Applied via `font-mono` class

### **Usage:**

#### **Global (Applied Everywhere):**
```jsx
<body className="font-mono">
  {/* All text uses SUSE Mono */}
</body>
```

#### **Specific Font Weights:**
```jsx
// Regular weight (default)
<p className="font-normal">Regular text</p>

// Bold weight
<p className="font-bold">Bold text</p>

// Light weight
<p className="font-light">Light text</p>

// Extra light
<p className="font-extralight">Extra light text</p>
```

#### **Specific Font Styles:**
```jsx
// Normal style (default)
<p className="font-normal">Normal text</p>

// Italic style
<p className="font-normal italic">Italic text</p>
<p className="italic">Italic text (shorter)</p>
```

#### **Combined Classes:**
```jsx
<p className="font-bold italic">Bold italic text</p>
<p className="font-light">Light weight text</p>
<p className="font-extrabold italic">Extra bold italic</p>
```

## 📊 **Available Weights:**
- `font-thin` (100) - SUSEMono-Thin
- `font-extralight` (200) - SUSEMono-ExtraLight
- `font-light` (300) - SUSEMono-Light
- `font-normal` (400) - SUSEMono-Regular
- `font-medium` (500) - SUSEMono-Medium
- `font-semibold` (600) - SUSEMono-SemiBold
- `font-bold` (700) - SUSEMono-Bold
- `font-extrabold` (800) - SUSEMono-ExtraBold

## 🔧 **Font Features:**
- **Monospace font** - Perfect for code and technical content
- **Clean, modern design** - Great readability
- **Multiple weights** - Flexible styling options
- **Italic variants** - Additional emphasis options

## 🎨 **Styling Examples:**

### **Code Blocks:**
```jsx
<pre className="font-mono bg-gray-100 p-4 rounded">
  {`def hello_world():
    print("Hello, World!")
    return "Success"`}
</pre>
```

### **Technical Content:**
```jsx
<div className="font-mono text-sm">
  <p className="font-semibold">Function:</p>
  <code className="bg-gray-200 px-2 py-1 rounded">calculate_total(items)</code>
</div>
```

Your SUSE Mono fonts are now ready to use throughout your entire Mivvo application! 🚀✨
