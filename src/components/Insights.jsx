import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Target, TrendingUp } from 'lucide-react';
const Insights = ({insights,monthlyData,totalExpenses,budgets,transactions}) => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Average Transaction
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                            ${insights.avgTransaction.toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-600">Per transaction</p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Top Category
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-green-600">
                            {insights.topCategory?.category || 'N/A'}
                        </div>
                        <p className="text-sm text-gray-600">
                            ${insights.topCategory?.total.toFixed(2) || '0.00'} spent
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            This Month
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">
                            ${insights.currentMonthSpending.toFixed(2)}
                        </div>
                        <p className="text-sm text-gray-600">Current month spending</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Spending Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <h4 className="font-semibold text-blue-800">Budget Performance</h4>
                            <p className="text-blue-700">
                                {insights.budgetUtilization < 80
                                    ? "You're doing great! Your spending is well within budget limits."
                                    : insights.budgetUtilization < 100
                                        ? "You're approaching your budget limits. Consider monitoring your expenses more closely."
                                        : "You've exceeded your budget this month. Time to review your spending habits."
                                }
                            </p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-semibold text-green-800">Spending Pattern</h4>
                            <p className="text-green-700">
                                Your highest spending category is {insights.topCategory?.category || 'N/A'} with
                                ${insights.topCategory?.total.toFixed(2) || '0.00'} total. This represents{' '}
                                {insights.topCategory ? ((insights.topCategory.total / totalExpenses) * 100).toFixed(1) : 0}%
                                of your total expenses.
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                            <h4 className="font-semibold text-yellow-800">Monthly Comparison</h4>
                            <p className="text-yellow-700">
                                {monthlyData.length > 1
                                    ? `Compared to last month, your spending has ${monthlyData[monthlyData.length - 1]?.total > monthlyData[monthlyData.length - 2]?.total
                                        ? 'increased' : 'decreased'
                                    }.`
                                    : 'Add more transactions to see monthly comparisons.'
                                }
                            </p>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                            <h4 className="font-semibold text-purple-800">Recommendations</h4>
                            <ul className="text-purple-700 space-y-2">
                                <li>• Consider setting budgets for categories where you don't have limits yet</li>
                                <li>• Review your {insights.topCategory?.category || 'highest spending category'} expenses for potential savings</li>
                                <li>• Track your progress weekly to stay on top of your financial goals</li>
                                {insights.budgetUtilization > 90 && (
                                    <li>• You're close to or over budget - consider reducing discretionary spending</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Financial Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <div className="text-6xl font-bold mb-4">
                            {(() => {
                                let score = 100;
                                if (insights.budgetUtilization > 100) score -= 30;
                                else if (insights.budgetUtilization > 90) score -= 15;
                                else if (insights.budgetUtilization > 80) score -= 10;

                                if (Object.keys(budgets).length < 3) score -= 20;
                                if (transactions.length < 5) score -= 15;

                                return Math.max(score, 0);
                            })()}
                        </div>
                        <p className="text-lg text-gray-600 mb-4">Financial Health Score</p>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full transition-all duration-300 ${(() => {
                                        let score = 100;
                                        if (insights.budgetUtilization > 100) score -= 30;
                                        else if (insights.budgetUtilization > 90) score -= 15;
                                        else if (insights.budgetUtilization > 80) score -= 10;

                                        if (Object.keys(budgets).length < 3) score -= 20;
                                        if (transactions.length < 5) score -= 15;

                                        score = Math.max(score, 0);
                                        return score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500';
                                    })()
                                    }`}
                                style={{
                                    width: `${(() => {
                                        let score = 100;
                                        if (insights.budgetUtilization > 100) score -= 30;
                                        else if (insights.budgetUtilization > 90) score -= 15;
                                        else if (insights.budgetUtilization > 80) score -= 10;

                                        if (Object.keys(budgets).length < 3) score -= 20;
                                        if (transactions.length < 5) score -= 15;

                                        return Math.max(score, 0);
                                    })()}%`
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            {(() => {
                                let score = 100;
                                if (insights.budgetUtilization > 100) score -= 30;
                                else if (insights.budgetUtilization > 90) score -= 15;
                                else if (insights.budgetUtilization > 80) score -= 10;

                                if (Object.keys(budgets).length < 3) score -= 20;
                                if (transactions.length < 5) score -= 15;

                                score = Math.max(score, 0);
                                return score >= 80 ? 'Excellent financial management!' :
                                    score >= 60 ? 'Good progress, room for improvement' :
                                        'Focus on budgeting and expense tracking';
                            })()}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Insights