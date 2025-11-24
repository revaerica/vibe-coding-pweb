import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Tag, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { CATEGORIES } from '../../utils/constants';
import { getDateInputValue } from '../../utils/formatters';

const ExpenseForm = ({ expense, onSubmit, onCancel }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: getDateInputValue(expense.date),
        receipt: expense.receipt
      });
      if (expense.receipt) {
        setPreview(expense.receipt);
      }
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          receipt: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      const result = expense
        ? await onSubmit(expense._id, submitData)
        : await onSubmit(submitData);

      if (!result.success) {
        setError(result.error || 'Failed to save expense');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: theme.colors.bgCard,
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
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
        {expense ? 'Edit Expense' : 'New Expense'}
      </h3>

      {error && (
        <div style={{
          padding: '12px',
          background: theme.colors.danger + '20',
          border: `1px solid ${theme.colors.danger}`,
          borderRadius: '8px',
          marginBottom: '16px',
          color: theme.colors.danger,
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: '16px' }}>
          {/* Title */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.colors.text
            }}>
              <Tag size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Lunch at campus canteen"
              required
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: theme.colors.bgSecondary,
                color: theme.colors.text,
                outline: 'none'
              }}
            />
          </div>

          {/* Amount & Category */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.colors.text
              }}>
                <DollarSign size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                Amount (Rp)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="1000"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: theme.colors.bgSecondary,
                  color: theme.colors.text,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.colors.text
              }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: theme.colors.bgSecondary,
                  color: theme.colors.text,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.colors.text
            }}>
              <Calendar size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: theme.colors.bgSecondary,
                color: theme.colors.text,
                outline: 'none'
              }}
            />
          </div>

          {/* Receipt Upload */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: theme.colors.text
            }}>
              <ImageIcon size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Receipt (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                background: theme.colors.bgSecondary,
                color: theme.colors.text,
                outline: 'none'
              }}
            />
            {preview && (
              <img
                src={preview}
                alt="Receipt preview"
                style={{
                  marginTop: '12px',
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.border}`
                }}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '8px'
          }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px',
                background: loading ? theme.colors.border : theme.colors.accent,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Saving...' : (expense ? 'Update Expense' : 'Add Expense')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                flex: 1,
                padding: '14px',
                background: 'transparent',
                color: theme.colors.textSecondary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
