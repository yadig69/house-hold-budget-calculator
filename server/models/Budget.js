import mongoose from 'mongoose';

const budgetAccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  allocatedAmount: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 },
  percentage: { type: Number, required: true }
});

const budgetSchema = new mongoose.Schema({
  monthlyIncome: { type: Number, required: true },
  accounts: [budgetAccountSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Budget', budgetSchema);