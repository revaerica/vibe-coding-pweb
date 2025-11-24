import React from 'react';
import { Edit2, Trash2, Calendar, Tag, Image } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { CATEGORY_ICONS } from '../../utils/constants';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const theme = useTheme();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      onDelete(expense._id);
    }
  };

  return (
    <div style={{
      padding: '16px',
      background: theme.colors.bgSecondary,
      borderRadius: '10px',
      border: `1px solid ${theme.colors.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = theme.isDark
        ? '0 4px 12px rgba(0,0,0,0.3)'
        : '0 4px 12px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      {/* Left Section */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '20px' }}>
            {CATEGORY_ICONS[expense.category] || '📌'}
          </span>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: theme.colors.text,
            margin: 0
          }}>
            {expense.title}
          </h4>
          {expense.receipt && (
            <Image size={16} color={theme.colors.textSecondary} />
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            background: theme.colors.accent + '20',
            borderRadius: '6px',
            fontSize: '12px',
            color: theme.colors.accent,
            fontWeight: '500'
          }}>
            <Tag size={12} />
            {expense.category}
          </span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '13px',
            color: theme.colors.textSecondary
          }}>
            <Calendar size={12} />
            {formatDate(expense.date)}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: '700',
          color: theme.colors.text,
          minWidth: '120px',
          textAlign: 'right'
        }}>
          {formatCurrency(expense.amount)}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onEdit(expense)}
            style={{
              padding: '8px',
              background: theme.colors.accentLight + '30',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.accentLight + '50';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.accentLight + '30';
            }}
            aria-label="Edit expense"
          >
            <Edit2 size={16} color={theme.colors.accentLight} />
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '8px',
              background: theme.colors.danger + '20',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.colors.danger + '30';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.danger + '20';
            }}
            aria-label="Delete expense"
          >
            <Trash2 size={16} color={theme.colors.danger} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;