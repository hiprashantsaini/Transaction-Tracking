# 💸 Personal Finance Visualizer

A responsive and intuitive web application to track your personal finances, categorize expenses, set budgets, and visualize financial trends with rich charts and insights.

## 🚀 Live Demo

👉 [View Live App](https://transaction-tracking.netlify.app/)  
🔗 [GitHub Repository](https://github.com/hiprashantsaini/Transaction-Tracking)

---

## 📦 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [shadcn/ui](https://ui.shadcn.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [lucide-react](https://lucide.dev/)

---

## 🧩 Features

### ✅ Stage 1: Basic Transaction Tracking

- ➕ Add / ✏️ Edit / 🗑️ Delete transactions
- 📜 Transaction list view
- 📊 Monthly expenses bar chart
- 🛡️ Basic form validation and error states

### ✅ Stage 2: Categories

- 📂 Predefined categories (e.g., Food, Utilities, Healthcare)
- 🥧 Category-wise Pie Chart
- 📊 Dashboard summary: total expenses, breakdown, and recent transactions

### ✅ Stage 3: Budgeting

- 🎯 Set monthly budgets per category
- 📉 Budget vs Actual comparison
- 💡 Insights: total expenses, top categories, monthly trends, and budget utilization

---

## 📈 Dashboards & Visualizations

- **Bar Chart:** Monthly expense trends
- **Pie Chart:** Category-wise breakdown
- **Budget Comparison:** Spending vs Budget by category
- **Financial Insights:** Top category, average transaction, total spent

---

## 🖥️ UI/UX Highlights

- Clean layout with responsive design
- Tab-based navigation using `@/components/ui/tabs`
- Clear feedback on errors and validations
- Smooth integration of charts for better financial visualization

---

## 📁 Project Structure

```bash
/components
  - Dashboard.jsx
  - Transactions.jsx
  - Budgets.jsx
  - Analytics.jsx
  - Insights.jsx
/pages
  - PersonalFinanceVisualizer.jsx
