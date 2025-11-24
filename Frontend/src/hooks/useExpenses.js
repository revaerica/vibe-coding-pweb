import { useState, useEffect, useCallback } from 'react';
import { expenseService } from '../services/expenseService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await expenseService.getAll();
      setExpenses(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createExpense = async (expenseData) => {
    try {
      const data = await expenseService.create(expenseData);
      setExpenses(prev => [data.data, ...prev]);
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const data = await expenseService.update(id, expenseData);
      setExpenses(prev =>
        prev.map(exp => (exp._id === id ? data.data : exp))
      );
      return { success: true, data: data.data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseService.delete(id);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};