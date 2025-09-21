import { SubLesson } from '../../../data/lessonsData';

export const topic_17_2: SubLesson = {
  id: 17.2,
  title: 'GUI Programming with Tkinter',
  status: 'demo',
  content: `# 🖥️ GUI Programming with Tkinter

Tkinter is Python's standard GUI (Graphical User Interface) library. It provides a powerful object-oriented interface to the Tk GUI toolkit, allowing you to create desktop applications with windows, buttons, text fields, and other interactive elements. This topic covers everything from basic windows to advanced widgets and event handling.

---

## 🎯 Getting Started with Tkinter

### **Basic Window Creation**
\`\`\`python
import tkinter as tk

# Create main window
root = tk.Tk()
root.title("My First Tkinter App")
root.geometry("400x300")  # Width x Height

# Start the event loop
root.mainloop()
\`\`\`

### **Understanding the Tkinter Architecture**
\`\`\`python
# Tkinter hierarchy:
# Tk() -> Root window
#   ├── Toplevel() -> Additional windows
#   ├── Frame() -> Container widgets
#   │   ├── Button(), Label(), Entry() -> Child widgets
#   │   └── Canvas(), Text() -> Complex widgets
#   └── Menu() -> Menu bar
\`\`\`

---

## 🏗️ Basic Widgets

### **Labels and Buttons**
\`\`\`python
import tkinter as tk

def button_clicked():
    label.config(text="Button was clicked!")

root = tk.Tk()
root.title("Basic Widgets")
root.geometry("300x200")

# Label widget
label = tk.Label(root, text="Hello, Tkinter!", font=("Arial", 14))
label.pack(pady=20)

# Button widget
button = tk.Button(root, text="Click Me!", command=button_clicked)
button.pack(pady=10)

root.mainloop()
\`\`\`

### **Text Input**
\`\`\`python
import tkinter as tk

def show_text():
    text = entry.get()
    label.config(text=f"You typed: {text}")

root = tk.Tk()
root.title("Text Input")

# Text entry field
entry = tk.Entry(root, width=30)
entry.pack(pady=10)

# Button to show entered text
button = tk.Button(root, text="Show Text", command=show_text)
button.pack(pady=5)

# Label to display result
label = tk.Label(root, text="")
label.pack(pady=10)

root.mainloop()
\`\`\`

### **Checkboxes**
\`\`\`python
import tkinter as tk

def check_status():
    if var.get():
        label.config(text="Checkbox is checked!")
    else:
        label.config(text="Checkbox is unchecked!")

root = tk.Tk()
root.title("Checkbox")

# Checkbox variable
var = tk.BooleanVar()

# Checkbox widget
checkbox = tk.Checkbutton(root, text="Check me!", variable=var, command=check_status)
checkbox.pack(pady=10)

# Label to show status
label = tk.Label(root, text="")
label.pack(pady=10)

root.mainloop()
\`\`\`

---

## 🎯 Best Practices
\`\`\`python
# Always use pack() for simple layouts
import tkinter as tk

root = tk.Tk()
root.title("Best Practices")

# Label at top
label = tk.Label(root, text="Hello!", font=("Arial", 14))
label.pack(pady=20)

# Button below label
button = tk.Button(root, text="Click me!")
button.pack(pady=10)

root.mainloop()
\`\`\`

---

## 🚀 Key Takeaways

1. **Tkinter** is Python's built-in GUI library
2. **Widgets** like buttons and labels create the interface
3. **pack()** arranges widgets in the window
4. **command** connects buttons to functions
5. **mainloop()** runs the GUI application

**Tkinter lets you create simple desktop apps with Python! 🖥️**`
};
