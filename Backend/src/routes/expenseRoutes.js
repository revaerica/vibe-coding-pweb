const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { uploadReceipt, handleMulterError } = require('../middlewares/uploadMiddleware');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  uploadReceipt: uploadReceiptController,
  deleteReceipt,
  getStats
} = require('../controllers/expenseController');

// All routes require authentication
router.use(protect);

// Stats route (must be before /:id)
router.get('/stats', getStats);

// Main CRUD routes
router.route('/')
  .get(getAllExpenses)
  .post(uploadReceipt, handleMulterError, createExpense);

router.route('/:id')
  .get(getExpenseById)
  .put(uploadReceipt, handleMulterError, updateExpense)
  .delete(deleteExpense);

// Receipt management
router.route('/:id/receipt')
  .post(uploadReceipt, handleMulterError, uploadReceiptController)
  .delete(deleteReceipt);

module.exports = router;