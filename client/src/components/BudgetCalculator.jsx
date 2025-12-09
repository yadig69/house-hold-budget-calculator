import { useState, useEffect } from 'react';

const defaultAccounts = [
  { name: 'Rent/Mortgage', category: 'household', percentage: 30 },
  { name: 'Monthly Savings', category: 'savings', percentage: 20 },
  { name: 'Investments', category: 'investments', percentage: 10 },
  { name: 'Weekly Food Bills', category: 'household', percentage: 15 },
  { name: 'Rainy Day Savings', category: 'savings', percentage: 5 },
  { name: 'Kids Savings', category: 'family', percentage: 5 },
  { name: 'Kids School', category: 'family', percentage: 5 },
  { name: 'Vacation Savings', category: 'family', percentage: 3 },
  { name: 'Family Funtime', category: 'family', percentage: 4 },
  { name: 'Couples Funtime', category: 'personal', percentage: 3 }
];

export default function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [accounts, setAccounts] = useState(defaultAccounts);
  const [budget, setBudget] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const calculateBudget = async () => {
    if (!monthlyIncome) return;

    try {
      const response = await fetch('http://localhost:5000/api/budget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthlyIncome: parseFloat(monthlyIncome), accounts })
      });
      const data = await response.json();
      setBudget(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePercentage = (index, newPercentage) => {
    const updated = [...accounts];
    updated[index].percentage = parseFloat(newPercentage);
    setAccounts(updated);
  };

  const totalPercentage = accounts.reduce((sum, acc) => sum + acc.percentage, 0);

  return (
    <>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <div className="budget-calculator">
        <h1>Money Management App</h1>

      <div className="income-input">
        <label>Monthly Income: $</label>
        <input
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          placeholder="Enter your monthly income"
        />
      </div>

      <div className="accounts-config">
        <h2>Budget Allocation ({totalPercentage}%)</h2>
        {accounts.map((account, index) => (
          <div key={index} className="account-row">
            <span className="account-name">{account.name}</span>
            <input
              type="number"
              value={account.percentage}
              onChange={(e) => updatePercentage(index, e.target.value)}
              min="0"
              max="100"
              step="0.1"
            />
            <span>%</span>
            {monthlyIncome && (
              <span className="amount">
                ${((monthlyIncome * account.percentage) / 100).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>

      <button onClick={calculateBudget} disabled={!monthlyIncome || totalPercentage !== 100}>
        Calculate Budget
      </button>

      {budget && (
        <div className="budget-results">
          <h2>Your Budget Breakdown</h2>
          {budget.accounts.map((account, index) => (
            <div key={index} className="budget-item">
              <span>{account.name}</span>
              <span>${account.allocatedAmount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}