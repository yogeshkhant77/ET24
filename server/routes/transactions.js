const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransactions,
  deleteTransactions,
} = require("../controllers/transactions");
const authMiddleware = require("../middleware/auth");

// All routes require authentication
router.route("/").get(authMiddleware, getTransactions);
router.route("/").post(authMiddleware, addTransactions);
router.route("/:id").delete(authMiddleware, deleteTransactions);

module.exports = router;
