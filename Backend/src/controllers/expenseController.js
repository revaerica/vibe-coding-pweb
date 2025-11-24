const Expense = require('../models/Expense');
const path = require('path');
const fs = require('fs');

// @desc    Get all expenses for logged in user
// @route   GET /api/expenses
// @access  Private
exports.getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id })
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single expense
// @route   GET /api/expenses/:id
// @access  Private
exports.getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
exports.createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    // Validation
    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, amount, category, and date'
      });
    }

    const expenseData = {
      user: req.user.id,
      title,
      amount: parseFloat(amount),
      category,
      date: new Date(date)
    };

    // Add receipt path if file was uploaded
    if (req.file) {
      expenseData.receipt = `/uploads/receipts/${req.file.filename}`;
    }

    const expense = await Expense.create(expenseData);

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    // Delete uploaded file if expense creation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
exports.updateExpense = async (req, res, next) => {
  try {
    let expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    const { title, amount, category, date } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (amount) updateData.amount = parseFloat(amount);
    if (category) updateData.category = category;
    if (date) updateData.date = new Date(date);

    // Handle new receipt upload
    if (req.file) {
      // Delete old receipt if exists
      if (expense.receipt) {
        const oldPath = path.join(__dirname, '../../', expense.receipt);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.receipt = `/uploads/receipts/${req.file.filename}`;
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Delete receipt file if exists
    if (expense.receipt) {
      const filePath = path.join(__dirname, '../../', expense.receipt);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload/Update receipt for expense
// @route   POST /api/expenses/:id/receipt
// @access  Private
exports.uploadReceipt = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a receipt image'
      });
    }

    // Delete old receipt if exists
    if (expense.receipt) {
      const oldPath = path.join(__dirname, '../../', expense.receipt);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update expense with new receipt
    expense.receipt = `/uploads/receipts/${req.file.filename}`;
    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Receipt uploaded successfully',
      data: expense
    });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Delete receipt from expense
// @route   DELETE /api/expenses/:id/receipt
// @access  Private
exports.deleteReceipt = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    if (!expense.receipt) {
      return res.status(400).json({
        success: false,
        message: 'No receipt to delete'
      });
    }

    // Delete receipt file
    const filePath = path.join(__dirname, '../../', expense.receipt);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    expense.receipt = null;
    await expense.save();

    res.status(200).json({
      success: true,
      message: 'Receipt deleted successfully',
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get expense statistics
// @route   GET /api/expenses/stats
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate category breakdown
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    // Calculate monthly stats
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const monthlyExpenses = expenses.filter(
      exp => new Date(exp.date) >= currentMonth
    );

    const totalThisMonth = monthlyExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalExpenses,
        totalTransactions: expenses.length,
        categoryBreakdown,
        monthly: {
          current: totalThisMonth,
          count: monthlyExpenses.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};