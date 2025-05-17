const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const categoryController = require("../controllers/categoryController");

router.post("/category", authenticateToken, categoryController.createCategory);
router.get("/categories", authenticateToken, categoryController.getCategories);
router.put("/category/:categoryId", authenticateToken, categoryController.updateCategory);
router.delete("/category/:categoryId", authenticateToken, categoryController.deleteCategory);

module.exports = router;
