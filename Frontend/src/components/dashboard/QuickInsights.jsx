import React from 'react';
import { TrendingUp, Calendar, Award } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatters';

const QuickInsights = ({ expenses }) => {
  const theme = useTheme();
  const isMobile = window.innerWidth < 768;

  // Calculate top category
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)[0];

  // Calculate average daily spend
  const daysWithExpenses = [...new Set(expenses.map(exp => 
    new Date(exp.date).toDateString()
  ))].length;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgDaily = daysWithExpenses > 0 ? totalExpenses / daysWithExpenses : 0;

  // Find most active day
  const dayCount = expenses.reduce((acc, exp) => {
    const dayName = new Date(exp.date).toLocaleDateString('id-ID', { weekday: 'long' });
    acc[dayName] = (acc[dayName] || 0) + 1;
    return acc;
  }, {});

  const mostActiveDay = Object.entries(dayCount)
    .sort(([, a], [, b]) => b - a)[0];

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: isMobile ? '10px' : '12px',
      padding: isMobile ? '16px' : '24px',
      marginBottom: isMobile ? '16px' : '24px',
      border: `1px solid ${theme.colors.border}`,
      boxShadow: theme.isDark
        ? '0 4px 16px rgba(0,0,0,0.2)'
        : '0 4px 16px rgba(0,0,0,0.06)'
    }}>
      <h3 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: theme.colors.text,
        margin: '0 0 6px 0'
      }}>
        Quick Insights
      </h3>
      <p style={{
        fontSize: isMobile ? '12px' : '14px',
        color: theme.colors.textSecondary,
        margin: '0 0 16px 0'
      }}>
        Your spending patterns at a glance
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 
          window.innerWidth > 900 ? 'repeat(3, 1fr)' :      // Desktop: 3 kolom
          window.innerWidth > 600 ? 'repeat(2, 1fr)' :      // Tablet: 2 kolom
          '1fr',                                             // Mobile: 1 kolom
        gap: isMobile ? '12px' : '16px'
      }}>
        {/* Top Category */}
        <div style={{
          padding: isMobile ? '12px' : '16px',
          background: theme.colors.bgSecondary,
          borderRadius: isMobile ? '8px' : '10px',
          border: `1px solid ${theme.colors.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            <Award size={isMobile ? 16 : 18} color={theme.colors.accent} />
            <span style={{
              fontSize: isMobile ? '11px' : '13px',
              fontWeight: '500',
              color: theme.colors.textSecondary
            }}>
              Top Category
            </span>
          </div>
          <div style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            {topCategory ? topCategory[0] : 'N/A'}
          </div>
          <div style={{
            fontSize: isMobile ? '11px' : '13px',
            color: theme.colors.textSecondary,
            marginTop: '4px'
          }}>
            {topCategory ? formatCurrency(topCategory[1]) : '-'}
          </div>
        </div>

        {/* Average Daily Spend */}
        <div style={{
          padding: isMobile ? '12px' : '16px',
          background: theme.colors.bgSecondary,
          borderRadius: isMobile ? '8px' : '10px',
          border: `1px solid ${theme.colors.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            <TrendingUp size={isMobile ? 16 : 18} color={theme.colors.accentLight} />
            <span style={{
              fontSize: isMobile ? '11px' : '13px',
              fontWeight: '500',
              color: theme.colors.textSecondary
            }}>
              Average Daily Spend
            </span>
          </div>
          <div style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            {formatCurrency(avgDaily)}
          </div>
          <div style={{
            fontSize: isMobile ? '11px' : '13px',
            color: theme.colors.textSecondary,
            marginTop: '4px'
          }}>
            across {daysWithExpenses} days
          </div>
        </div>

        {/* Most Active Day */}
        <div style={{
          padding: isMobile ? '12px' : '16px',
          background: theme.colors.bgSecondary,
          borderRadius: isMobile ? '8px' : '10px',
          border: `1px solid ${theme.colors.border}`
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '8px'
          }}>
            <Calendar size={isMobile ? 16 : 18} color="#8B5CF6" />
            <span style={{
              fontSize: isMobile ? '11px' : '13px',
              fontWeight: '500',
              color: theme.colors.textSecondary
            }}>
              Most Active Day
            </span>
          </div>
          <div style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: theme.colors.text
          }}>
            {mostActiveDay ? mostActiveDay[0] : 'N/A'}
          </div>
          <div style={{
            fontSize: isMobile ? '11px' : '13px',
            color: theme.colors.textSecondary,
            marginTop: '4px'
          }}>
            {mostActiveDay ? `${mostActiveDay[1]} transactions` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickInsights;
