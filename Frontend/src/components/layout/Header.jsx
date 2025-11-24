import React, { useState } from 'react';
import { Sun, Moon, User, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      background: theme.colors.bgCard,
      borderBottom: `1px solid ${theme.colors.border}`,
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: theme.isDark
        ? '0 2px 8px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🍔</span>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: theme.colors.text,
            margin: 0
          }}>
            BudgetBites
          </h1>
        </div>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Theme Toggle */}
          <button
            onClick={theme.toggleTheme}
            style={{
              padding: '8px',
              background: theme.colors.bgSecondary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            aria-label="Toggle theme"
          >
            {theme.isDark ? (
              <Sun size={20} color={theme.colors.text} />
            ) : (
              <Moon size={20} color={theme.colors.text} />
            )}
          </button>

          {/* User Info (Desktop) */}
          <div style={{
            display: window.innerWidth > 768 ? 'flex' : 'none',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: theme.colors.bgSecondary,
            borderRadius: '8px'
          }}>
            <User size={18} color={theme.colors.textSecondary} />
            <span style={{
              fontSize: '14px',
              color: theme.colors.text,
              fontWeight: '500'
            }}>
              {user?.name}
            </span>
          </div>

          {/* Logout (Desktop) */}
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              background: theme.colors.danger,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: window.innerWidth > 768 ? 'flex' : 'none',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
              background: theme.colors.bgSecondary,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '8px',
              cursor: 'pointer',
              display: window.innerWidth <= 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {mobileMenuOpen ? (
              <X size={20} color={theme.colors.text} />
            ) : (
              <Menu size={20} color={theme.colors.text} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: theme.colors.bgSecondary,
          borderRadius: '8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            padding: '8px',
            borderBottom: `1px solid ${theme.colors.border}`
          }}>
            <User size={18} color={theme.colors.textSecondary} />
            <span style={{ fontSize: '14px', color: theme.colors.text }}>
              {user?.name}
            </span>
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '10px',
              background: theme.colors.danger,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '14px'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;