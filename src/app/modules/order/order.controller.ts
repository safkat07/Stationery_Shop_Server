import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { errorUtil } from 'zod/lib/helpers/errorUtil';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;
    const newOrder = await orderServices.createNewOrderIntoDB(
      email,
      product,
      quantity,
    );
    return res.status(201).json({
      success: true,
      message: 'Order placed successfully.',
      data: newOrder,
    });
  } catch (error: any) {
    if (error.message === 'Product not found.') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    } else if (error.message === 'Insufficient stock for this product.') {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Unable to create the order.',
      error: error.message,
    });
  }
};

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenueFromDB();
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Failed to Generate the Revenue',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully.',
      data: result,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to calculate total revenue from orders.',
        error: error.message,
      });
    }
  }
};

export const orderControllers = {
  createOrder,
  getTotalRevenue,
};
