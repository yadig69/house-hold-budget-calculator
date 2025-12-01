# Money Management App

A MERN stack application that automatically splits monthly income into separate budget accounts and sub-accounts.

## Features

- **Household Bills**: Rent/Mortgage, Weekly Food Bills
- **Savings**: Monthly Savings, Rainy Day Savings
- **Investments**: Investment allocations
- **Family**: Kids Savings, Kids School, Vacation Savings, Family Funtime
- **Personal**: Couples Funtime, Personal Savings

## Setup

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Database
Install MongoDB locally or use MongoDB Atlas.

## Usage

1. Enter your monthly income
2. Adjust percentage allocations for each account (must total 100%)
3. Click "Calculate Budget" to see automatic money distribution
4. View allocated amounts for each account/sub-account

## Default Allocation
- Rent/Mortgage: 30%
- Monthly Savings: 20%
- Weekly Food Bills: 15%
- Investments: 10%
- Kids School: 5%
- Kids Savings: 5%
- Rainy Day Savings: 5%
- Family Funtime: 4%
- Vacation Savings: 3%
- Couples Funtime: 3%