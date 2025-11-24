import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

const CategoryBreakdown = ({ expenses }) => {
  const theme = useTheme();

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  // Sort by amount
  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a);

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: '12px',
      padding: '24px',
      marginTop: '24px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: theme.colors.text,
        margin: '0 0 20px 0'
      }}>
        Spending by Category
      </h3>

      <div style={{ display: 'grid', gap: '12px' }}>
        {sortedCategories.map(([category, amount]) => {
          const percentage = formatPercentage(amount, totalExpenses);
          return (
            <div key={category}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.colors.text
                }}>
                  {category}
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.colors.textSecondary
                }}>
                  {formatCurrency(amount)} ({percentage}%)
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: theme.colors.bgSecondary,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${theme.colors.accent}, ${theme.colors.accentLight})`,
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBreakdown;