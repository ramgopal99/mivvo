import { SubLesson } from '../../../../data/lessonsData';

export const topic_9_12: SubLesson = {
  id: "9.12",
  title: 'Present Value',
  status: 'completed',
  content: `# 💰 Present Value

Master present value calculations - finding today's worth of future money! Present value (PV) is crucial for investment decisions, loan valuations, and financial planning. Learn to discount future cash flows to their current value.

---

## 🎯 What is Present Value?

**Present Value (PV)** is the current worth of a future sum of money, discounted at a specific rate of return. It answers: "What is ₹X received in the future worth today?"

### **Key Concept**
- Future money is worth less than present money
- Time value of money
- Risk and opportunity cost factors

### **Basic Formula**
\`\`\`
PV = FV / (1 + R/100)^T
\`\`\`

**Where:**
- PV = Present Value
- FV = Future Value
- R = Discount rate (%)
- T = Time period

---

## 📊 Step-by-Step Calculation

### **Example 1: Single Future Amount**
**Problem:** What is ₹10,000 received after 3 years worth today at 8% discount rate?

**Solution:**
- PV = 10000 / (1 + 8/100)^3
- PV = 10000 / (1.08)^3
- PV = 10000 / 1.259712 = ₹7,938.40

**Interpretation:** You would pay ₹7,938.40 today to receive ₹10,000 in 3 years.

### **Example 2: Investment Decision**
**Problem:** Choose between ₹15,000 today or ₹25,000 after 4 years. Discount rate 10%.

**Solution:**
- PV of ₹25,000 = 25000 / (1.10)^4 = 25000 / 1.4641 ≈ ₹17,068
- Since 17,068 > 15,000, choose future amount

---

## 🔢 Applications

### **1. Investment Valuation**
- Bond pricing
- Stock valuation
- Project evaluation

### **2. Loan Decisions**
- Loan amount calculation
- EMI present value
- Mortgage pricing

### **3. Business Decisions**
- Capital budgeting
- Lease vs buy decisions
- Insurance valuation

---

## 💡 Relationship with Future Value

### **FV to PV Conversion**
\`\`\`
PV = FV × (1 + R/100)^(-T)
\`\`\`

### **PV to FV Conversion**
\`\`\`
FV = PV × (1 + R/100)^T
\`\`\`

### **Break-even Analysis**
When PV of inflows = PV of outflows

---

## 🎯 Multiple Cash Flows

### **Annuity Present Value**
\`\`\`
PV = C × [(1 - (1 + R/100)^(-T)) / (R/100)]
\`\`\`

**Where:**
- C = Annual cash flow
- R = Discount rate
- T = Number of years

### **Example:** ₹5000 annual payment for 5 years at 8%.
- PV = 5000 × [(1 - (1.08)^(-5)) / 0.08]
- PV ≈ 5000 × 3.9927 = ₹19,963.50

---

## 🧮 PV Factors

### **Present Value Factor**
\`\`\`
PV Factor = 1 / (1 + R/100)^T
\`\`\`

### **Common PV Factors**
- 8% for 1 year: 0.9259
- 8% for 5 years: 0.6806
- 10% for 1 year: 0.9091
- 10% for 5 years: 0.6209

---

## 🚨 Common Mistakes

### **Mistake 1: Ignoring Time Value**
❌ "Future money = present money"
- Always discount future amounts

### **Mistake 2: Wrong Discount Rate**
❌ "Use bank rate for all calculations"
- Use appropriate opportunity cost rate

### **Mistake 3: Cash Flow Timing**
❌ "All cash flows at year-end"
- Consider exact timing

---

## 🎯 Practice Problems

### **Basic PV Calculations:**
1. FV = ₹20000, T = 2 years, R = 10%. Find PV.
2. FV = ₹50000, T = 3 years, R = 8%. Find PV.
3. FV = ₹100000, T = 5 years, R = 12%. Find PV.

### **Application Problems:**
1. Choose: ₹30000 today or ₹50000 in 4 years (R=9%)?
2. Find PV of ₹8000 annual payments for 3 years at 10%.
3. Loan offers ₹100000 in 3 years or ₹75000 today. Which better?

**Answers:**
Basic: ₹16,528.93, ₹39,880.34, ₹56,742.69
Applications: Choose future amount (PV=₹33,835), ₹19,682.54, Choose today (PV=₹75,000)

Master present value calculations for informed financial decision making! 🏆`
};
