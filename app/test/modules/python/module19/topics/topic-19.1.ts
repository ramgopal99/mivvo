import { SubLesson } from '../../../../data/lessonsData';

export const topic_19_1: SubLesson = {
  id: 19.1,
  title: 'Bank Account System Project',
  status: 'demo',
  content: `# 🏦 Bank Account System Project

Create a complete banking system using Object-Oriented Programming (OOP) principles! This project demonstrates inheritance, encapsulation, polymorphism, and file handling in a real-world application.

---

## 🎯 Project Overview

The Bank Account System will include:
- **Base Account class** with common banking operations
- **Savings Account** with interest calculation
- **Checking Account** with overdraft protection
- **Bank class** to manage all accounts
- **File storage** for persistent data
- **Interactive menu system**

---

## 📁 Project Structure (Multiple Files)

\`\`\`
bank_system/
├── account.py           # Base Account class
├── savings_account.py   # Savings Account subclass
├── checking_account.py  # Checking Account subclass
├── bank.py             # Bank management system
└── main.py             # Main application
\`\`\`

---

## 🏗️ Building the System Step by Step

### **Step 1: Base Account Class**

\`\`\`python
# account.py
class Account:
    """Base class for all bank accounts"""

    def __init__(self, account_number, holder_name, balance=0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = balance
        self.transaction_history = []

    def deposit(self, amount):
        """Deposit money into account"""
        if amount > 0:
            self.balance += amount
            self.transaction_history.append(f"Deposit: +\${amount}")
            return True
        return False

    def withdraw(self, amount):
        """Withdraw money from account"""
        if 0 < amount <= self.balance:
            self.balance -= amount
            self.transaction_history.append(f"Withdrawal: -\${amount}")
            return True
        return False

    def get_balance(self):
        """Get current balance"""
        return self.balance

    def get_transaction_history(self):
        """Get transaction history"""
        return self.transaction_history.copy()

    def __str__(self):
        return f"Account({self.account_number}): {self.holder_name} - \${self.balance}"
\`\`\`

### **Step 2: Savings Account Class**

\`\`\`python
# savings_account.py
from account import Account

class SavingsAccount(Account):
    """Savings account with interest calculation"""

    def __init__(self, account_number, holder_name, balance=0, interest_rate=0.02):
        super().__init__(account_number, holder_name, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        """Calculate and add interest"""
        interest = self.balance * self.interest_rate
        self.balance += interest
        self.transaction_history.append(f"Interest: +\${interest:.2f}")
        return interest

    def withdraw(self, amount):
        """Savings accounts may have withdrawal limits"""
        if amount > 500:  # Limit large withdrawals
            print("Savings account withdrawal limit: $500")
            return False
        return super().withdraw(amount)

    def __str__(self):
        return f"Savings Account({self.account_number}): {self.holder_name} - \${self.balance:.2f} (Rate: {self.interest_rate*100}%)"
\`\`\`

### **Step 3: Checking Account Class**

\`\`\`python
# checking_account.py
from account import Account

class CheckingAccount(Account):
    """Checking account with overdraft protection"""

    def __init__(self, account_number, holder_name, balance=0, overdraft_limit=500):
        super().__init__(account_number, holder_name, balance)
        self.overdraft_limit = overdraft_limit

    def withdraw(self, amount):
        """Allow overdraft up to limit"""
        if amount > 0 and (self.balance - amount) >= -self.overdraft_limit:
            self.balance -= amount
            self.transaction_history.append(f"Withdrawal: -\${amount}")
            if self.balance < 0:
                self.transaction_history.append(f"Overdraft fee: -$25")
                self.balance -= 25  # Overdraft fee
            return True
        return False

    def get_available_balance(self):
        """Get balance including overdraft"""
        return self.balance + self.overdraft_limit

    def __str__(self):
        return f"Checking Account({self.account_number}): {self.holder_name} - \${self.balance:.2f} (Overdraft: \${self.overdraft_limit})"
\`\`\`

### **Step 4: Bank Management Class**

\`\`\`python
# bank.py
import json
import os
from account import Account
from savings_account import SavingsAccount
from checking_account import CheckingAccount

class Bank:
    """Bank management system"""

    def __init__(self, data_file="bank_data.json"):
        self.accounts = {}
        self.data_file = data_file
        self.load_data()

    def create_account(self, account_type, account_number, holder_name, **kwargs):
        """Create a new account"""
        if account_number in self.accounts:
            return False, "Account number already exists"

        if account_type == "savings":
            account = SavingsAccount(account_number, holder_name, **kwargs)
        elif account_type == "checking":
            account = CheckingAccount(account_number, holder_name, **kwargs)
        else:
            account = Account(account_number, holder_name, **kwargs)

        self.accounts[account_number] = account
        self.save_data()
        return True, f"{account_type.title()} account created successfully"

    def get_account(self, account_number):
        """Get account by number"""
        return self.accounts.get(account_number)

    def transfer(self, from_account, to_account, amount):
        """Transfer money between accounts"""
        from_acc = self.get_account(from_account)
        to_acc = self.get_account(to_account)

        if not from_acc or not to_acc:
            return False, "Account not found"

        if from_acc.withdraw(amount):
            to_acc.deposit(amount)
            self.save_data()
            return True, f"Transferred \${amount} from {from_account} to {to_account}"
        return False, "Insufficient funds"

    def save_data(self):
        """Save all account data to file"""
        data = {}
        for acc_num, account in self.accounts.items():
            account_data = {
                "type": account.__class__.__name__,
                "account_number": account.account_number,
                "holder_name": account.holder_name,
                "balance": account.balance,
                "transaction_history": account.transaction_history
            }

            # Add subclass-specific data
            if isinstance(account, SavingsAccount):
                account_data["interest_rate"] = account.interest_rate
            elif isinstance(account, CheckingAccount):
                account_data["overdraft_limit"] = account.overdraft_limit

            data[acc_num] = account_data

        with open(self.data_file, 'w') as f:
            json.dump(data, f, indent=2)

    def load_data(self):
        """Load account data from file"""
        if os.path.exists(self.data_file):
            try:
                with open(self.data_file, 'r') as f:
                    data = json.load(f)

                for acc_num, account_data in data.items():
                    acc_type = account_data["type"]
                    if acc_type == "SavingsAccount":
                        account = SavingsAccount(
                            account_data["account_number"],
                            account_data["holder_name"],
                            account_data["balance"],
                            account_data.get("interest_rate", 0.02)
                        )
                    elif acc_type == "CheckingAccount":
                        account = CheckingAccount(
                            account_data["account_number"],
                            account_data["holder_name"],
                            account_data["balance"],
                            account_data.get("overdraft_limit", 500)
                        )
                    else:
                        account = Account(
                            account_data["account_number"],
                            account_data["holder_name"],
                            account_data["balance"]
                        )

                    account.transaction_history = account_data["transaction_history"]
                    self.accounts[acc_num] = account
            except:
                print("Error loading bank data")

    def get_all_accounts(self):
        """Get all accounts"""
        return list(self.accounts.values())
\`\`\`

### **Step 5: Main Application**

\`\`\`python
# main.py
from bank import Bank

def display_menu():
    """Display main menu"""
    print("\\n🏦 Bank Account System")
    print("=" * 30)
    print("1. Create Account")
    print("2. Deposit Money")
    print("3. Withdraw Money")
    print("4. Check Balance")
    print("5. Transfer Money")
    print("6. View Transaction History")
    print("7. List All Accounts")
    print("8. Calculate Interest (Savings)")
    print("9. Exit")
    print("=" * 30)

def create_account_menu(bank):
    """Create account menu"""
    print("\\n📝 Create New Account")
    print("Account Types:")
    print("1. Regular Account")
    print("2. Savings Account")
    print("3. Checking Account")

    choice = input("Select account type (1-3): ").strip()

    account_number = input("Enter account number: ").strip()
    holder_name = input("Enter account holder name: ").strip()

    if choice == "1":
        success, message = bank.create_account("regular", account_number, holder_name)
    elif choice == "2":
        interest_rate = float(input("Enter interest rate (default 0.02): ") or 0.02)
        success, message = bank.create_account("savings", account_number, holder_name,
                                             interest_rate=interest_rate)
    elif choice == "3":
        overdraft_limit = float(input("Enter overdraft limit (default 500): ") or 500)
        success, message = bank.create_account("checking", account_number, holder_name,
                                             overdraft_limit=overdraft_limit)
    else:
        print("Invalid choice!")
        return

    print(message)

def main():
    bank = Bank()

    print("🏦 Welcome to the Bank Account System!")

    while True:
        display_menu()
        choice = input("Enter your choice (1-9): ").strip()

        if choice == "1":
            create_account_menu(bank)

        elif choice == "2":
            acc_num = input("Enter account number: ").strip()
            account = bank.get_account(acc_num)
            if account:
                amount = float(input("Enter deposit amount: "))
                if account.deposit(amount):
                    print(f"✅ Deposited \${amount}. New balance: \${account.get_balance()}")
                else:
                    print("❌ Invalid amount")
            else:
                print("❌ Account not found")

        elif choice == "3":
            acc_num = input("Enter account number: ").strip()
            account = bank.get_account(acc_num)
            if account:
                amount = float(input("Enter withdrawal amount: "))
                if account.withdraw(amount):
                    print(f"✅ Withdrew \${amount}. New balance: \${account.get_balance()}")
                else:
                    print("❌ Insufficient funds or invalid amount")
            else:
                print("❌ Account not found")

        elif choice == "4":
            acc_num = input("Enter account number: ").strip()
            account = bank.get_account(acc_num)
            if account:
                print(f"💰 Balance: \${account.get_balance()}")
                if hasattr(account, 'get_available_balance'):
                    print(f"💳 Available balance: \${account.get_available_balance()}")
            else:
                print("❌ Account not found")

        elif choice == "5":
            from_acc = input("From account number: ").strip()
            to_acc = input("To account number: ").strip()
            amount = float(input("Transfer amount: "))

            success, message = bank.transfer(from_acc, to_acc, amount)
            print(message)

        elif choice == "6":
            acc_num = input("Enter account number: ").strip()
            account = bank.get_account(acc_num)
            if account:
                print(f"\\n📜 Transaction History for {account.holder_name}:")
                for transaction in account.get_transaction_history():
                    print(f"  • {transaction}")
            else:
                print("❌ Account not found")

        elif choice == "7":
            accounts = bank.get_all_accounts()
            if accounts:
                print("\\n📋 All Accounts:")
                for account in accounts:
                    print(f"  {account}")
            else:
                print("No accounts found")

        elif choice == "8":
            acc_num = input("Enter savings account number: ").strip()
            account = bank.get_account(acc_num)
            if isinstance(account, SavingsAccount):
                interest = account.calculate_interest()
                print(f"💰 Interest added: \${interest:.2f}. New balance: \${account.get_balance():.2f}")
            else:
                print("❌ Not a savings account")

        elif choice == "9":
            print("👋 Thank you for using our Bank Account System!")
            break

        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
\`\`\`

---

## 🎯 OOP Concepts Demonstrated

### **Inheritance**
- \`SavingsAccount\` and \`CheckingAccount\` inherit from \`Account\`
- Each subclass adds specialized behavior while reusing base functionality

### **Encapsulation**
- Account data is protected within class instances
- Methods control access to balance and transaction history

### **Polymorphism**
- \`withdraw()\` method behaves differently in each account type
- Same method name, different behavior based on account type

### **Abstraction**
- Complex banking logic is hidden behind simple method calls
- Users interact through a clean interface

---

## 🚀 How to Run the Project

1. Create a \`bank_system\` folder
2. Create the 5 Python files as shown above
3. Run: \`python main.py\`
4. Follow the interactive menu

---

## 💡 Key Features

- ✅ **Multiple Account Types** - Regular, Savings, Checking
- ✅ **Data Persistence** - Accounts saved to JSON file
- ✅ **Transaction History** - Track all account activity
- ✅ **Interest Calculation** - Automatic interest for savings
- ✅ **Overdraft Protection** - Checking accounts with limits
- ✅ **Money Transfers** - Between different accounts
- ✅ **Error Handling** - Robust input validation

**This project showcases professional-level OOP design with real-world banking functionality! 🏦✨**`
};
