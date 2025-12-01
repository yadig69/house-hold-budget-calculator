import express from 'express';
import Budget from '../models/Budget.js';

const router = express.Router();

// Get budget
router.get('/', async (req, res) => {
  try {
    const budget = await Budget.findOne().sort({ createdAt: -1 });
    res.json(budget || { monthlyIncome: 0, accounts: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Update budget
router.post('/', async (req, res) => {
  try {
    const { monthlyIncome, accounts } = req.body;
    
    const budget = new Budget({
      monthlyIncome,
      accounts: accounts.map(account => ({
        ...account,
        allocatedAmount: (monthlyIncome * account.percentage) / 100,
        currentBalance: (monthlyIncome * account.percentage) / 100
      }))
    });
    
    await budget.save();
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;