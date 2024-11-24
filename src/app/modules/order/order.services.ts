import { Product } from '../product/product.schema';
import { Order } from './order.schema';

const createNewOrderIntoDB = async (
  email: string,
  product: string,
  quantity: number,
) => {
  const result = await Product.findById(product);
  if (!result) {
    throw new Error('Product not found.');
  }

  if (result.quantity < quantity) {
    throw new Error('Insufficient stock for this product.');
  }

  const totalPrice = result.price * quantity;

  const newOrder = new Order({
    email,
    product: product,
    quantity,
    totalPrice,
  });
  await newOrder.save();

  // Update the product quantity and inStock status
  result.quantity -= quantity;
  if (result.quantity <= 0) {
    result.inStock = false;
  }

  await result.save();

  return newOrder;
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);

  return result.length > 0 ? result[0].totalRevenue : 0;
};

export const orderServices = {
  createNewOrderIntoDB,
  calculateRevenueFromDB,
};
