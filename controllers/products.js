import Product from "../models/Product.js";
import Category from "../models/Category.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// GET /products
const getProducts = async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    const products = await Product.findAll({
      where: categoryId ? { categoryId } : {},
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET /products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new ErrorResponse("Product not found", 404);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// POST /products
const postProduct = async (req, res, next) => {
  try {
    const { name, description, price, categoryId } = req.body;

    const categoryExists = await Category.findByPk(categoryId);
    if (!categoryExists)
      throw new ErrorResponse(`Category ID ${categoryId} does not exist`, 400);

    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// PUT /products/:id
const putProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new ErrorResponse("Product not found", 404);

    if (req.body.categoryId) {
      const cat = await Category.findByPk(req.body.categoryId);
      if (!cat)
        throw new ErrorResponse(
          `Category ID ${req.body.categoryId} does not exist`,
          400
        );
    }

    await product.update(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE /products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) throw new ErrorResponse("Product not found", 404);

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export { getProducts, getProductById, postProduct, putProduct, deleteProduct };
