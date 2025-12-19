import { SubLesson } from '../../../../data/lessonsData';

export const topic_8_3: SubLesson = {
  id: "8.3",
  title: 'Time (T)',
  status: 'completed',
  content: `# ⏰ Time (T)

Learn about time period in simple interest calculations! Time (T) is the duration for which interest is calculated on the principal amount. Understanding time units and conversions is essential for accurate interest calculations.

---

## 🎯 What is Time in SI?

**Time (T)** is the period for which the principal amount earns or incurs interest. It's measured in years, months, days, or other time units, depending on the rate specification.

### **Key Points**
- Time determines interest accumulation
- Longer time = Higher interest
- Time unit must match rate unit
- Interest ∝ Time

### **Symbol**
\`\`\`
T (Time Period)
\`\`\`

---

## 📊 Time Units in Simple Interest

### **1. Years**
- Standard unit for annual rates
- T = number of years
- Example: 2 years, 3.5 years

### **2. Months**
- For monthly rates or partial years
- Convert to years: T = months ÷ 12
- Example: 18 months = 1.5 years

### **3. Days**
- For daily rates or short periods
- Convert to years: T = days ÷ 365
- Example: 180 days ≈ 0.493 years

### **4. Other Units**
- Weeks: T = weeks ÷ 52.14
- Quarters: T = quarters ÷ 4
- Hours/Days: Usually not used for SI

---

## 🔢 Time Calculations

### **Finding Time from SI**
\`\`\`
T = (SI × 100) ÷ (P × R)
\`\`\`

**Example:** P = ₹1000, R = 10%, SI = ₹200
- T = (200 × 100) ÷ (1000 × 10) = 2 years

### **Finding Time from Amount**
\`\`\`
T = [(A - P) × 100] ÷ (P × R)
\`\`\`

**Example:** P = ₹5000, R = 8%, A = ₹6000
- T = (1000 × 100) ÷ (5000 × 8) = 2.5 years

---

## 🧮 Time Unit Conversions

### **Months to Years**
\`\`\`
T_years = T_months ÷ 12
\`\`\`

**Example:** 24 months = 24 ÷ 12 = 2 years

### **Days to Years**
\`\`\`
T_years = T_days ÷ 365 (or 366 for leap year)
\`\`\`

**Example:** 730 days = 730 ÷ 365 ≈ 2 years

### **Years to Months**
\`\`\`
T_months = T_years × 12
\`\`\`

### **Years to Days**
\`\`\`
T_days = T_years × 365 (or 366)
\`\`\`

---

## 💡 Important Time Considerations

### **1. Leap Year Adjustments**
- 366 days in leap years
- Affects day-to-year conversions
- Usually use 365 for simplicity

### **2. Exact Time Periods**
- Include exact days/months
- Partial periods count fully
- No fractional interest in SI

### **3. Rate-Time Matching**
- Annual rate with years
- Monthly rate with months
- Daily rate with days

---

## 🎯 Time in Different Contexts

### **1. Banking**
- Deposit periods: months/years
- Loan tenures: years
- Interest calculation periods

### **2. Investments**
- Holding periods
- Maturity periods
- Compounding intervals

### **3. Loans**
- Repayment schedules
- Interest calculation periods
- Grace periods

---

## 📊 Common Time Scenarios

### **1. Partial Years**
- 6 months = 0.5 years
- 9 months = 0.75 years
- 18 months = 1.5 years

### **2. Exact Periods**
- 1 year = 365/366 days
- 1 month ≈ 30.4167 days
- 1 quarter = 3 months

### **3. Business Periods**
- Financial year: April-March
- Calendar year: Jan-Dec
- Custom periods: as specified

---

## 🚨 Time-Related Mistakes

### **Mistake 1: Wrong Unit Conversion**
❌ "12 months = 1 year" for monthly rates
- 12 months at monthly rate = 12 × monthly rate

### **Mistake 2: Ignoring Leap Years**
❌ Always 365 days
- Use 366 for leap years when precise

### **Mistake 3: Partial Period Counting**
❌ "6 months = 0.5 years" always
- Depends on rate type

### **Mistake 4: Rate-Time Mismatch**
❌ Annual rate with months
- Convert appropriately

---

## 🎯 Practice Questions

### **Basic Time Calculations:**
1. P = ₹2000, R = 5%, SI = ₹200. Find T.
2. P = ₹3000, R = 8%, A = ₹3600. Find T.
3. SI = ₹400, P = ₹2000, R = 10%. Find T.

### **Unit Conversion Problems:**
1. Convert 18 months to years.
2. Convert 547 days to years.
3. Convert 2.5 years to months.

**Answers:**
Basic: 2 years, 2.5 years, 2 years
Unit: 1.5 years, 1.5 years, 30 months

Master time calculations in simple interest for accurate period assessments! 🏆`
};
