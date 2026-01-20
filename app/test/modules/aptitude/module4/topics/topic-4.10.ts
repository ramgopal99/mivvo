import { SubLesson } from '../../../../data/lessonsData';

export const topic_4_10: SubLesson = {
  id: "4.10",
  title: 'Depreciation & Appreciation',
  status: 'completed',
  content: "`# ðŸ“Š Depreciation & Appreciation

Master asset value changes over time! Depreciation deals with value reduction (cars, machinery), while appreciation deals with value increase (property, investments). Both use compound percentage calculations similar to population growth.

---

## ðŸŽ¯ Understanding Depreciation & Appreciation

### **Depreciation**
- **Definition:** Decrease in asset value over time
- **Causes:** Wear and tear, obsolescence, market conditions
- **Examples:** Cars, computers, machinery, buildings

### **Appreciation**
- **Definition:** Increase in asset value over time
- **Causes:** Market demand, inflation, improvements
- **Examples:** Real estate, gold, antiques, stocks

### **Key Similarity**
Both follow compound percentage changes over time.

---

## ðŸ“‰ Depreciation Calculations

### **Basic Formula**
\`"\`\`
Value after n years = P Ã— (1 - r/100)^n
\`\`\`

**Where:**
- P = Original value
- r = Annual depreciation rate (%)
- n = Number of years

### **Example 1: Car Depreciation**
**Problem:** Car costs â‚¹5,00,000. Depreciates 15% annually. Find value after 2 years.

**Solution:**
- Year 1: 5,00,000 Ã— 0.85 = 4,25,000
- Year 2: 4,25,000 Ã— 0.85 = 3,61,250

**Formula:** 5,00,000 Ã— (0.85)Â² = 3,61,250

### **Example 2: Equipment Depreciation**
**Problem:** Machine worth â‚¹1,00,000 depreciates 10% yearly. Find value after 3 years.

**Solution:**
- 1,00,000 Ã— (0.90)Â³ = 1,00,000 Ã— 0.729 = 72,900

---

## ðŸ“ˆ Appreciation Calculations

### **Basic Formula**
\`\`\`
Value after n years = P Ã— (1 + r/100)^n
\`\`\`

**Where:**
- P = Original value
- r = Annual appreciation rate (%)
- n = Number of years

### **Example 1: Property Appreciation**
**Problem:** House costs â‚¹20,00,000. Appreciates 8% annually. Find value after 2 years.

**Solution:**
- 20,00,000 Ã— (1.08)Â² = 20,00,000 Ã— 1.1664 = 23,32,800

### **Example 2: Investment Growth**
**Problem:** Investment of â‚¹50,000 grows 12% yearly. Find value after 3 years.

**Solution:**
- 50,000 Ã— (1.12)Â³ = 50,000 Ã— 1.404928 = 70,246.4 â‰ˆ 70,246

---

## ðŸ’¡ Quick Tricks and Shortcuts

### **Trick 1: Depreciation Shortcuts**
| Years | 10% Depreciation | 20% Depreciation |
|-------|------------------|------------------|
| 1     | Ã— 0.9           | Ã— 0.8           |
| 2     | Ã— 0.81          | Ã— 0.64          |
| 3     | Ã— 0.729         | Ã— 0.512         |

### **Trick 2: Appreciation Shortcuts**
| Years | 10% Appreciation | 5% Appreciation |
|-------|-------------------|-----------------|
| 1     | Ã— 1.1            | Ã— 1.05          |
| 2     | Ã— 1.21           | Ã— 1.1025        |
| 3     | Ã— 1.331          | Ã— 1.157625      |

### **Trick 3: Finding Rate from Values**
\`\`\`
For Depreciation: r = [1 - (Final/Initial)^(1/n)] Ã— 100%
For Appreciation: r = [(Final/Initial)^(1/n) - 1] Ã— 100%
\`\`\`

---

## ðŸ”¢ Real-Life Applications

### **1. Asset Management**
- **Car Value:** Depreciation affects loan payments, insurance
- **Equipment:** Companies calculate depreciation for tax purposes
- **Machinery:** Replacement planning based on depreciation

### **2. Investment Planning**
- **Property:** Real estate appreciation for wealth building
- **Gold/Silver:** Precious metal value changes
- **Antiques:** Collectible item value growth

### **3. Business Decisions**
- **Tax Depreciation:** Accelerated depreciation for tax savings
- **Asset Valuation:** Balance sheet adjustments
- **Investment Returns:** Portfolio performance tracking

---

## ðŸŽ¯ Advanced Depreciation Methods

### **Method 1: Straight Line Depreciation**
Equal depreciation each year.

**Example:** Asset worth â‚¹1,00,000, 10-year life
- Annual depreciation = 1,00,000 Ã· 10 = â‚¹10,000
- Book value = 1,00,000 - (10,000 Ã— years)

### **Method 2: Declining Balance**
Higher depreciation in early years.

**Example:** 20% declining balance on â‚¹1,00,000
- Year 1: 1,00,000 Ã— 0.20 = 20,000 (value = 80,000)
- Year 2: 80,000 Ã— 0.20 = 16,000 (value = 64,000)

### **Method 3: Units of Production**
Based on usage, not time.

**Example:** Machine, 100,000 units total life, 20,000 units/year
- Depreciation per unit = Cost Ã· Total units
- Annual depreciation = Units produced Ã— Depreciation per unit

---

## ðŸš¨ Common Mistakes to Avoid

### **Mistake 1: Confusing Depreciation with Appreciation**
âŒ "Car value appreciated by 10%" (cars depreciate)
- Wrong! Cars lose value over time

### **Mistake 2: Simple Percentage Subtraction**
âŒ "10% depreciation for 2 years = 20% total loss"
- Wrong! Compound effect: (0.9)Â² = 0.81, loss = 19%

### **Mistake 3: Wrong Base Value**
âŒ "Machine depreciated from â‚¹1 lakh to â‚¹80,000, then calculate next year on â‚¹1 lakh"
- Wrong! Use current value as base

### **Mistake 4: Ignoring Salvage Value**
âŒ "Asset depreciates to zero"
- Wrong! Most assets have salvage/residual value

---

## ðŸŽ¯ Practice Questions

### **Depreciation Problems:**
1. Car â‚¹4,00,000 depreciates 12% annually. Value after 2 years = ?
2. Machine â‚¹2,00,000 depreciates 15% yearly. Value after 3 years = ?
3. Equipment depreciated from â‚¹50,000 to â‚¹35,000 in 2 years. Find rate = ?

### **Appreciation Problems:**
1. Property â‚¹10,00,000 appreciates 7% annually. Value after 2 years = ?
2. Investment â‚¹25,000 grows 10% yearly. Value after 3 years = ?
3. Asset appreciated from â‚¹30,000 to â‚¹39,690 in 3 years. Find rate = ?

### **Mixed Problems:**
1. Car depreciates 10%, property appreciates 8%. Both start â‚¹5 lakh, after 2 years = ?

**Answers:**
Depreciation: 3,13,600, 1,22,475, ~6.67%
Appreciation: 11,49,000, 33,775, ~10%
Mixed: Car: 4,05,000, Property: 5,85,664

---

## ðŸŽ“ Pro Tips for Exams

1. **Depreciation uses (1 - r/100)** - subtraction
2. **Appreciation uses (1 + r/100)** - addition
3. **Always compound** - don't add percentages
4. **Be careful with rates** - 10% vs 0.10 confusion
5. **Consider salvage value** - assets don't go to zero
6. **Check realistic rates** - 50% depreciation unusual

---

## ðŸ”¢ Formula Summary

| Type | Formula | Example |
|------|---------|---------|
| Depreciation | P(1 - r/100)^n | 100,000(0.9)^2 = 81,000 |
| Appreciation | P(1 + r/100)^n | 100,000(1.1)^2 = 121,000 |
| Find Rate (Dep) | r = [1 - (F/P)^(1/n)]Ã—100% | From 100kâ†’81k in 2y: 10% |
| Find Rate (App) | r = [(F/P)^(1/n) - 1]Ã—100% | From 100kâ†’121k in 2y: 10% |

---

## ðŸ’¡ Special Cases

### **Case 1: Zero Depreciation**
- Rate = 0%, value constant
- Example: Land value (doesn't depreciate)

### **Case 2: Negative Appreciation**
- Appreciation rate = 0%, value constant
- Depreciation is negative appreciation

### **Case 3: Very High Rates**
- Unusual, check problem
- Example: 100% depreciation = worthless in 1 year

### **Case 4: Fractional Years**
- Use fractional exponents
- Example: 1.5 years = (1 + r/100)^1.5

Master depreciation and appreciation calculations for accurate asset valuation and investment planning! ðŸ†`
};
