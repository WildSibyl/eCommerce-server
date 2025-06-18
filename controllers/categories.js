import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id, {
    include: { model: Product, as: "products" },
  });
  if (!category) throw new ErrorResponse("Category not found", 404);
  res.json(category);
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const found = await Category.findOne({ where: { name } });
  if (found)
    throw new ErrorResponse("Category with that name already exists", 400);
  const category = await Category.create(req.body);
  res.json(category);
};

export const updateCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id);
  if (!category) throw new ErrorResponse("Category not found", 404);
  await category.update(req.body);
  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const {
    params: { id },
  } = req;
  const category = await Category.findByPk(id, {
    include: { model: Product, as: "products" },
  });
  if (!category) throw new ErrorResponse("Category not found", 404);
  if (category.products.length > 0) {
    throw new ErrorResponse(
      "Cannot delete category with existing products",
      400
    );
  } else {
    await category.destroy();
  }

  res.json({ message: "Category deleted" });
};
