import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2 } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const Budgets = ({editingBudget,handleBudgetDelete,handleBudgetEdit,handleBudgetSubmit,budgetFormData,setBudgetFormData,setBudgetErrors,budgetErrors,CATEGORIES,setEditingBudget,budgetComparison}) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>{editingBudget ? 'Edit Budget' : 'Set Monthly Budget'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleBudgetSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="budget-category">Category</Label>
                                <Select
                                    value={budgetFormData.category}
                                    onValueChange={(value) => setBudgetFormData({ ...budgetFormData, category: value })}
                                    disabled={editingBudget}
                                >
                                    <SelectTrigger className={budgetErrors.category ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {budgetErrors.category && <p className="text-red-500 text-sm mt-1">{budgetErrors.category}</p>}
                            </div>

                            <div>
                                <Label htmlFor="budget-amount">Budget Amount ($)</Label>
                                <Input
                                    id="budget-amount"
                                    type="number"
                                    step="0.01"
                                    value={budgetFormData.amount}
                                    onChange={(e) => setBudgetFormData({ ...budgetFormData, amount: e.target.value })}
                                    className={budgetErrors.amount ? 'border-red-500' : ''}
                                />
                                {budgetErrors.amount && <p className="text-red-500 text-sm mt-1">{budgetErrors.amount}</p>}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">
                                    {editingBudget ? 'Update Budget' : 'Set Budget'}
                                </Button>
                                {editingBudget && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setEditingBudget(null);
                                            setBudgetFormData({ category: '', amount: '' });
                                            setBudgetErrors({});
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Budget vs Actual</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={budgetComparison}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                                <Bar dataKey="budget" fill="#10B981" name="Budget" />
                                <Bar dataKey="spent" fill="#EF4444" name="Spent" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Overview */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {budgetComparison.map((item) => (
                            <div key={item.category} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{item.category}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">
                                            ${item.spent.toFixed(2)} / ${item.budget.toFixed(2)}
                                        </span>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleBudgetEdit(item.category, item.budget)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleBudgetDelete(item.category)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${item.spent > item.budget ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-sm">
                                    <span className={item.remaining >= 0 ? 'text-green-600' : 'text-red-600'}>
                                        {item.remaining >= 0 ? 'Remaining' : 'Over budget'}: ${Math.abs(item.remaining).toFixed(2)}
                                    </span>
                                    <span className="text-gray-600">
                                        {((item.spent / item.budget) * 100).toFixed(1)}% used
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Budgets