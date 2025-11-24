import React from 'react';
import { DollarSign, Receipt } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatters';

const StatsCard = ({ type, value, label }) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'total':
        return <DollarSign size={24} color={theme.colors.accent} />;
      case 'transactions':
        return <Receipt size={24} color={theme.colors.accentLight} />;
      default:
        return <DollarSign size={24} color={theme.colors.accent} />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'total':
        return theme.colors.accent + '20';
      case 'transactions':
        return theme.colors.accentLight + '20';
      default:
        return theme.colors.accent + '20';
    }
  };

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: '12px',
      padding: '24px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = theme.isDark
        ? '0 8px 24px rgba(0,0,0,0.3)'
        : '0 8px 24px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)';
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div>
          <p style={{
            fontSize: '14px',
            color: theme.colors.textSecondary,
            margin: '0 0 8px 0',
            fontWeight: '500'
          }}>
            {label}
          </p>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: theme.colors.text,
            margin: 0
          }}>
            {type === 'total' ? formatCurrency(value) : value}
          </h2>
        </div>

        <div style={{
          padding: '12px',
          background: getIconBg(),
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;