import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)',
      marginBottom: '24px'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: theme.colors.text,
        margin: '0 0 20px 0'
      }}>
        Recent Expenses
      </h3>

      {expenses.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: theme.colors.textSecondary
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
          <p style={{ fontSize: '16px', margin: 0 }}>
            No expenses yet. Add your first expense!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(expense => (
              <ExpenseItem
                key={expense._id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;