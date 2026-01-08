const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
