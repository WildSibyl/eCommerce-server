import Order from "../models/Order.js";
import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const checkProduct = async (prod) => {
  let total = 0;
  for (const e of prod) {
    const found = await Product.findByPk(e.productId);
    if (!found) {
      throw new ErrorResponse(`Product ID: ${e.productId} does not exist`, 400);
    }
    total += found.price * e.quantity;
  }
  console.log("Total", total);
  return total;
};

const getOrders = async (req, res) => {
  console.log("Get orders");
  const orders = await Order.findAll();
  res.json(orders);
};

const postOrders = async (req, res) => {
  console.log("Post orders");
  console.log(req.body);
  const products = req.body.products;
  const total = await checkProduct(products);
  console.log("Total 2", total);
  const order = await Order.create({ ...req.body, total });
  res.json(order);
};

const getOrderById = async (req, res) => {
  console.log("Get order by id");
  const orders = await Order.findByPk(req.params.id);
  res.json(orders);
};

const putOrder = async (req, res) => {
  console.log("Update orders");
  const order = await Order.findByPk(req.params.id);
  if (!order) throw new ErrorResponse("Order not found", 404);
  const products = req.body.products;
  const total = await checkProduct(products);
  console.log("Total 2", total);
  const orderUpdate = await order.update({ ...req.body, total });
  res.json(orderUpdate);
};

// const { lat, lng } = await getCoordinates(address);

//       address: {
//         ...address,
//         location: {
//           coordinates: [lng, lat], //Always longitude first and then latitude
//         },
//       },

const deleteOrder = async (req, res) => {
  console.log("Delete order");
  const order = await Order.findByPk(req.params.id);
  if (!order) throw new ErrorResponse("Order not found", 404);
  await order.destroy();
  res.json({ message: "Order deleted" });
};

export { getOrderById, getOrders, postOrders, putOrder, deleteOrder };
