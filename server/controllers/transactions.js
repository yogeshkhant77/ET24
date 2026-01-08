// @desc    Get all transactions for logged in user
// @route   GET /api/v1/transactions
// @access  Private

const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    add transaction for logged in user
// @route   POST /api/v1/transaction
// @access  Private

exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    // Validate empty body
    if (
      !text ||
      text.trim() === "" ||
      amount === undefined ||
      amount === null
    ) {
      return res.status(400).json({
        success: false,
        error: [
          "Please add some text",
          "Please add a positive or negative number",
        ],
      });
    }

    const transaction = await Transaction.create({
      text,
      amount,
      userId: req.userId,
    });
    return res.status(201).json({
      success: true,
      created: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// @desc     Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private

exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }

    await transaction.deleteOne();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
