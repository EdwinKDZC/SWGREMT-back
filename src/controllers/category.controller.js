import CategoryModel from "../models/category.controller.js";

const createCategory = async (req, res) => {
    const category = new CategoryModel(req.body);
    try {
        const existingCategory = await CategoryModel.findOne({
            name: category.name,
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find().populate("products");
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id).populate(
            "products"
        );
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;

        const updatedCategory = await category.save();

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await CategoryModel.findByIdAndDelete(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
