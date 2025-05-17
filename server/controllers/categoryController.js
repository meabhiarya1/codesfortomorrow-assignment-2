const { Category, Service } = require("../db");

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create({ name: req.body.name });
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update category by ID
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        if (!category) return res.status(404).json({ message: "Category not found" });
        category.name = req.body.name;
        await category.save();
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete empty category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId, {
            include: Service,
        });
        if (!category) return res.status(404).json({ message: "Category not found" });
        if (category.Services && category.Services.length > 0) {
            return res.status(400).json({ message: "Cannot delete category with services" });
        }
        await category.destroy();
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
