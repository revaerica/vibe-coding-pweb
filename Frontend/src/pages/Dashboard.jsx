import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useExpenses } from '../hooks/useExpenses';
import Header from '../components/layout/Header';
import StatsCard from '../components/dashboard/StatsCard';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import ExpenseList from '../components/dashboard/ExpenseList';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';

const Dashboard = () => {
  const theme = useTheme();
  const { expenses, loading, createExpense, updateExpense, deleteExpense } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalTransactions = expenses.length;

  const handleCreateExpense = async (expenseData) => {
    const result = await createExpense(expenseData);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdateExpense = async (id, expenseData) => {
    const result = await updateExpense(id, expenseData);
    if (result.success) {
      setEditingExpense(null);
      setShowForm(false);
    }
    return result;
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: theme.colors.bg,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '18px',
          color: theme.colors.text
        }}>
          Loading expenses...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.bg,
      transition: 'background 0.3s'
    }}>
      <Header />

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <StatsCard
            type="total"
            value={totalExpenses}
            label="Total Expenses"
          />
          <StatsCard
            type="transactions"
            value={totalTransactions}
            label="Total Transactions"
          />
        </div>

        {/* Add Expense Button */}
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingExpense(null);
          }}
          style={{
            width: '100%',
            padding: '16px',
            background: theme.colors.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
            boxShadow: theme.isDark
              ? '0 4px 16px rgba(140,96,87,0.3)'
              : '0 4px 16px rgba(227,178,60,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.isDark
              ? '0 6px 20px rgba(140,96,87,0.4)'
              : '0 6px 20px rgba(227,178,60,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.isDark
              ? '0 4px 16px rgba(140,96,87,0.3)'
              : '0 4px 16px rgba(227,178,60,0.3)';
          }}
        >
          <PlusCircle size={20} />
          {showForm ? 'Cancel' : 'Add New Expense'}
        </button>

        {/* Expense Form */}
        {showForm && (
          <ExpenseForm
            expense={editingExpense}
            onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
            onCancel={handleCancel}
          />
        )}

        {/* Expenses List */}
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={deleteExpense}
        />

        {/* Category Breakdown */}
        {expenses.length > 0 && (
          <CategoryBreakdown expenses={expenses} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;