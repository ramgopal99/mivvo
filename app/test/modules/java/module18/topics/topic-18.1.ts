import { SubLesson } from '../../../../data/lessonsData';

export const topic_18_1: SubLesson = {
  id: "18.1",
  title: 'Simple Calculator Application',
  status: 'completed',
  content: `# 🧮 Java Beginner Project: Simple Calculator

Build your first complete Java application with GUI!

---

## 🎯 Project Overview

Create a calculator application with basic arithmetic operations using Java Swing.

### **Features to Implement:**
- ✅ Addition, subtraction, multiplication, division
- ✅ Clear and equals functionality
- ✅ Error handling for division by zero
- ✅ User-friendly GUI interface
- ✅ Input validation

---

## 🏗️ Project Structure

\`\`\`
calculator-app/
├── src/
│   ├── Calculator.java          # Main class with GUI
│   ├── CalculatorLogic.java     # Business logic
│   └── CalculatorTest.java      # Unit tests
├── lib/                         # Dependencies
└── README.md                    # Project documentation
\`\`\`

---

## 💻 Implementation

### **1. Calculator Logic Class**
\`\`\`java
public class CalculatorLogic {
    private double currentValue;
    private String lastOperation;
    private boolean newNumber;

    public CalculatorLogic() {
        clear();
    }

    public void clear() {
        currentValue = 0;
        lastOperation = "";
        newNumber = true;
    }

    public void setOperation(String operation) {
        if (!newNumber) {
            calculate();
        }
        lastOperation = operation;
        newNumber = true;
    }

    public void calculate() {
        // Implementation for calculation logic
        newNumber = true;
    }

    public void appendDigit(String digit) {
        // Implementation for appending digits
    }

    public String getDisplayText() {
        return String.valueOf(currentValue);
    }
}
\`\`\`

### **2. GUI Implementation**
\`\`\`java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Calculator extends JFrame implements ActionListener {
    private JTextField display;
    private CalculatorLogic logic;

    // Number buttons
    private JButton[] numberButtons;

    // Operation buttons
    private JButton addButton, subtractButton, multiplyButton, divideButton;
    private JButton equalsButton, clearButton, decimalButton;

    public Calculator() {
        logic = new CalculatorLogic();
        initializeGUI();
    }

    private void initializeGUI() {
        setTitle("Java Calculator");
        setSize(300, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Display
        display = new JTextField("0");
        display.setEditable(false);
        display.setHorizontalAlignment(JTextField.RIGHT);
        display.setFont(new Font("Arial", Font.BOLD, 24));
        add(display, BorderLayout.NORTH);

        // Button panel
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(5, 4, 5, 5));

        // Initialize number buttons
        numberButtons = new JButton[10];
        for (int i = 0; i < 10; i++) {
            numberButtons[i] = new JButton(String.valueOf(i));
            numberButtons[i].addActionListener(this);
        }

        // Initialize operation buttons
        addButton = new JButton("+");
        subtractButton = new JButton("-");
        multiplyButton = new JButton("*");
        divideButton = new JButton("/");
        equalsButton = new JButton("=");
        clearButton = new JButton("C");
        decimalButton = new JButton(".");

        // Add action listeners
        addButton.addActionListener(this);
        subtractButton.addActionListener(this);
        multiplyButton.addActionListener(this);
        divideButton.addActionListener(this);
        equalsButton.addActionListener(this);
        clearButton.addActionListener(this);
        decimalButton.addActionListener(this);

        // Layout buttons (similar to physical calculator)
        buttonPanel.add(clearButton);
        buttonPanel.add(new JLabel("")); // Empty space
        buttonPanel.add(new JLabel("")); // Empty space
        buttonPanel.add(divideButton);

        buttonPanel.add(numberButtons[7]);
        buttonPanel.add(numberButtons[8]);
        buttonPanel.add(numberButtons[9]);
        buttonPanel.add(multiplyButton);

        buttonPanel.add(numberButtons[4]);
        buttonPanel.add(numberButtons[5]);
        buttonPanel.add(numberButtons[6]);
        buttonPanel.add(subtractButton);

        buttonPanel.add(numberButtons[1]);
        buttonPanel.add(numberButtons[2]);
        buttonPanel.add(numberButtons[3]);
        buttonPanel.add(addButton);

        buttonPanel.add(numberButtons[0]);
        buttonPanel.add(decimalButton);
        buttonPanel.add(equalsButton);
        buttonPanel.add(new JLabel("")); // Empty space

        add(buttonPanel, BorderLayout.CENTER);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String command = e.getActionCommand();

        switch (command) {
            case "C":
                logic.clear();
                display.setText("0");
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                logic.setOperation(command);
                break;
            case "=":
                logic.calculate();
                display.setText(logic.getDisplayText());
                break;
            default:
                if (Character.isDigit(command.charAt(0)) || command.equals(".")) {
                    logic.appendDigit(command);
                    display.setText(logic.getDisplayText());
                }
                break;
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            Calculator calculator = new Calculator();
            calculator.setVisible(true);
        });
    }
}
\`\`\`

---

## 🧪 Unit Tests

### **Testing Calculator Logic**
\`\`\`java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorLogicTest {
    private CalculatorLogic calculator;

    @BeforeEach
    public void setUp() {
        calculator = new CalculatorLogic();
    }

    @Test
    public void testAddition() {
        calculator.appendDigit("5");
        calculator.setOperation("+");
        calculator.appendDigit("3");
        calculator.calculate();

        assertEquals("8.0", calculator.getDisplayText());
    }

    @Test
    public void testSubtraction() {
        calculator.appendDigit("10");
        calculator.setOperation("-");
        calculator.appendDigit("4");
        calculator.calculate();

        assertEquals("6.0", calculator.getDisplayText());
    }

    @Test
    public void testClear() {
        calculator.appendDigit("123");
        calculator.clear();

        assertEquals("0.0", calculator.getDisplayText());
    }

    @Test
    public void testDivisionByZero() {
        calculator.appendDigit("10");
        calculator.setOperation("/");
        calculator.appendDigit("0");
        calculator.calculate();

        // Should handle division by zero gracefully
        assertTrue(calculator.getDisplayText().contains("Error") ||
                  calculator.getDisplayText().equals("Infinity"));
    }
}
\`\`\`

---

## 📋 Requirements Checklist

- [ ] ✅ Basic arithmetic operations (+, -, *, /)
- [ ] ✅ Clear functionality
- [ ] ✅ Error handling for division by zero
- [ ] ✅ Decimal number support
- [ ] ✅ User-friendly GUI
- [ ] ✅ Unit tests
- [ ] ✅ Input validation
- [ ] ✅ Proper error messages

---

## 🚀 Enhancements (Optional)

### **Advanced Features:**
- 🔢 **Scientific Calculator**: Add sin, cos, tan, log, etc.
- 📊 **History**: Keep track of previous calculations
- 🎨 **Themes**: Dark/light mode
- ⌨️ **Keyboard Support**: Allow keyboard input
- 💾 **Memory Functions**: M+, M-, MR, MC
- 🔄 **Undo/Redo**: Undo last operation

### **Code Quality:**
- 📚 **Documentation**: Add JavaDoc comments
- 🏗️ **Architecture**: Separate MVC pattern properly
- 🧪 **Test Coverage**: Aim for 90%+ test coverage
- 🚀 **Performance**: Optimize for large numbers

---

## 🎯 Learning Outcomes

By completing this project, you'll learn:

1. **Java GUI Development** with Swing
2. **Event-Driven Programming** 
3. **Object-Oriented Design** principles
4. **Unit Testing** with JUnit
5. **Error Handling** and validation
6. **MVC Architecture** basics
7. **User Experience** design

---

## 🏆 Project Completion

**Congratulations!** 🎉 You've built your first complete Java application.

### **Next Steps:**
- Deploy your calculator as a JAR file
- Add it to your portfolio
- Show it to friends and family
- Build upon it with advanced features

**Ready for more challenging projects?** 🚀`
};

