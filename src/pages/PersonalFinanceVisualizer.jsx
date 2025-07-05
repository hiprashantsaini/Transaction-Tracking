import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, DollarSign, Target, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Analytics from '../components/Analytics';
import Budgets from '../components/Budgets';
import Dashboard from '../components/Dashboard';
import Insights from '../components/Insights';
import Transactions from '../components/Transactions';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Education',
  'Travel',
  'Insurance',
  'Savings',
  'Other'
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7300', '#00FF00', '#FF00FF', '#00FFFF'];

const PersonalFinanceVisualizer = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: ''
  });
  const [budgetFormData, setBudgetFormData] = useState({
    category: '',
    amount: ''
  });
  const [errors, setErrors] = useState({});
  const [budgetErrors, setBudgetErrors] = useState({});

  // Initialize with sample data
  useEffect(() => {
    const sampleTransactions = [
      { id: 1, amount: 50, date: '2024-12-01', description: 'Grocery shopping', category: 'Food & Dining' },
      { id: 2, amount: 25, date: '2024-12-02', description: 'Gas station', category: 'Transportation' },
      { id: 3, amount: 120, date: '2024-12-03', description: 'Electric bill', category: 'Bills & Utilities' },
      { id: 4, amount: 80, date: '2024-12-05', description: 'Restaurant dinner', category: 'Food & Dining' },
      { id: 5, amount: 200, date: '2024-12-07', description: 'Online shopping', category: 'Shopping' },
      { id: 6, amount: 45, date: '2024-12-10', description: 'Movie tickets', category: 'Entertainment' },
      { id: 7, amount: 75, date: '2024-12-15', description: 'Grocery shopping', category: 'Food & Dining' },
      { id: 8, amount: 30, date: '2024-12-18', description: 'Coffee shop', category: 'Food & Dining' },
      { id: 9, amount: 150, date: '2024-12-20', description: 'Phone bill', category: 'Bills & Utilities' },
      { id: 10, amount: 90, date: '2024-12-22', description: 'Gym membership', category: 'Healthcare' }
    ];
    
    const sampleBudgets = {
      'Food & Dining': 300,
      'Transportation': 150,
      'Bills & Utilities': 400,
      'Shopping': 200,
      'Entertainment': 100,
      'Healthcare': 150
    };
    
    setTransactions(sampleTransactions);
    setBudgets(sampleBudgets);
  }, []);

  // Validation functions
  const validateTransaction = (data) => {
    const newErrors = {};
    
    if (!data.amount || isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!data.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!data.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!data.category) {
      newErrors.category = 'Category is required';
    }
    
    return newErrors;
  };

  const validateBudget = (data) => {
    const newErrors = {};
    
    if (!data.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!data.amount || isNaN(data.amount) || parseFloat(data.amount) <= 0) {
      newErrors.amount = 'Budget amount must be a positive number';
    }
    
    return newErrors;
  };

  // Transaction handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateTransaction(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      id: editingTransaction ? editingTransaction.id : Date.now()
    };
    
    if (editingTransaction) {
      setTransactions(prev => prev.map(t => t.id === editingTransaction.id ? transactionData : t));
      setEditingTransaction(null);
    } else {
      setTransactions(prev => [...prev, transactionData]);
    }
    
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: ''
    });
    setErrors({});
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      amount: transaction.amount.toString(),
      date: transaction.date,
      description: transaction.description,
      category: transaction.category
    });
  };

  const handleDelete = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      category: ''
    });
    setErrors({});
  };

  // Budget handlers
  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateBudget(budgetFormData);
    setBudgetErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setBudgets(prev => ({
      ...prev,
      [budgetFormData.category]: parseFloat(budgetFormData.amount)
    }));
    
    setBudgetFormData({ category: '', amount: '' });
    setBudgetErrors({});
    setEditingBudget(null);
  };

  const handleBudgetEdit = (category, amount) => {
    setEditingBudget(category);
    setBudgetFormData({ category, amount: amount.toString() });
  };

  const handleBudgetDelete = (category) => {
    setBudgets(prev => {
      const newBudgets = { ...prev };
      delete newBudgets[category];
      return newBudgets;
    });
  };

  // Data processing
  const monthlyData = useMemo(() => {
    const monthlyTotals = {};
    transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7);
      monthlyTotals[month] = (monthlyTotals[month] || 0) + transaction.amount;
    });
    
    return Object.entries(monthlyTotals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        total: total
      }));
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categoryTotals = {};
    transactions.forEach(transaction => {
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
    });
    
    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total
    }));
  }, [transactions]);

  const budgetComparison = useMemo(() => {
    const currentMonth = new Date().toISOString().substring(0, 7);
    const currentMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
    
    const categorySpending = {};
    currentMonthTransactions.forEach(transaction => {
      categorySpending[transaction.category] = (categorySpending[transaction.category] || 0) + transaction.amount;
    });
    
    return Object.entries(budgets).map(([category, budget]) => ({
      category,
      budget,
      spent: categorySpending[category] || 0,
      remaining: budget - (categorySpending[category] || 0)
    }));
  }, [transactions, budgets]);

  const insights = useMemo(() => {
    const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = totalExpenses / transactions.length;
    
    const topCategory = categoryData.reduce((max, cat) => 
      cat.total > (max?.total || 0) ? cat : max, null);
    
    const currentMonth = new Date().toISOString().substring(0, 7);
    const currentMonthSpending = transactions
      .filter(t => t.date.startsWith(currentMonth))
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalBudget = Object.values(budgets).reduce((sum, b) => sum + b, 0);
    const budgetUtilization = totalBudget > 0 ? (currentMonthSpending / totalBudget) * 100 : 0;
    
    return {
      totalExpenses,
      avgTransaction,
      topCategory,
      currentMonthSpending,
      budgetUtilization
    };
  }, [transactions, categoryData, budgets]);

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const recentTransactions = transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Personal Finance Visualizer</h1>
          <p className="text-gray-600">Track expenses, manage budgets, and gain financial insights</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg rounded-lg p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 cursor-pointer">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2 cursor-pointer">
              <DollarSign className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2 cursor-pointer">
              <Target className="h-4 w-4" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 cursor-pointer">
              <Calendar className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 cursor-pointer">
              <CheckCircle className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
               <Dashboard recentTransactions={recentTransactions} totalExpenses={totalExpenses} categoryData={categoryData} transactions={transactions} insights={insights} monthlyData={monthlyData} COLORS={COLORS}/>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
               <Transactions editingTransaction={editingTransaction} handleDelete={handleDelete} handleEdit={handleEdit} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} errors={errors} CATEGORIES={CATEGORIES} monthlyData={monthlyData} cancelEdit={cancelEdit} transactions={transactions}/>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
             <Budgets editingBudget={editingBudget} handleBudgetDelete={handleBudgetDelete} handleBudgetEdit={handleBudgetEdit} handleBudgetSubmit={handleBudgetSubmit} budgetFormData={budgetFormData} setBudgetFormData={setBudgetFormData} setBudgetErrors={setBudgetErrors} budgetErrors={budgetErrors} CATEGORIES={CATEGORIES} setEditingBudget={setEditingBudget} budgetComparison={budgetComparison}/>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics monthlyData={monthlyData} categoryData={categoryData} COLORS={COLORS} totalExpenses={totalExpenses} transactions={transactions}/>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
             <Insights insights={insights} monthlyData={monthlyData} totalExpenses={totalExpenses} budgets={budgets} transactions={transactions}/>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PersonalFinanceVisualizer;