import React from 'react';
import { DollarSign, Receipt, Calendar, TrendingDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatters';

const StatsCard = ({ type, value, label }) => {
  const theme = useTheme();
  const isMobile = window.innerWidth < 768;

  const getIcon = () => {
    const iconSize = isMobile ? 20 : 24;
    switch (type) {
      case 'total':
        return <DollarSign size={iconSize} color={theme.colors.accent} />;
      case 'monthly':
        return <Calendar size={iconSize} color={theme.colors.accentLight} />;
      case 'daily':
        return <TrendingDown size={iconSize} color="#8B5CF6" />;
      case 'transactions':
        return <Receipt size={iconSize} color={theme.colors.accentLight} />;
      default:
        return <DollarSign size={iconSize} color={theme.colors.accent} />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'total':
        return theme.colors.accent + '20';
      case 'monthly':
        return theme.colors.accentLight + '20';
      case 'daily':
        return '#8B5CF620';
      case 'transactions':
        return theme.colors.accentLight + '20';
      default:
        return theme.colors.accent + '20';
    }
  };

  const formatValue = () => {
    if (type === 'transactions') {
      return value;
    }
    return formatCurrency(value);
  };

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: isMobile ? '10px' : '12px',
      padding: isMobile ? '16px' : '24px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      minHeight: isMobile ? 'auto' : '140px'
    }}
    onMouseEnter={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = theme.isDark
          ? '0 8px 24px rgba(0,0,0,0.3)'
          : '0 8px 24px rgba(0,0,0,0.12)';
      }
    }}
    onMouseLeave={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.isDark
          ? '0 4px 16px rgba(0,0,0,0.2)'
          : '0 4px 16px rgba(0,0,0,0.06)';
      }
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: theme.colors.textSecondary,
            margin: '0 0 8px 0',
            fontWeight: '500'
          }}>
            {label}
          </p>
          <h2 style={{
            fontSize: isMobile ? '22px' : '28px',
            fontWeight: '700',
            color: theme.colors.text,
            margin: 0,
            wordBreak: 'break-word'
          }}>
            {formatValue()}
          </h2>
        </div>

        <div style={{
          padding: isMobile ? '8px' : '12px',
          background: getIconBg(),
          borderRadius: isMobile ? '8px' : '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginLeft: '8px'
        }}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
