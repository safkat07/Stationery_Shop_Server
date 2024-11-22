import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.services';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const validateProduct = productValidationSchema.parse(product);
    const result = await productServices.createProductIntoDB(validateProduct);
    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Product validation failed',
        error: error.issues[0].message,
      });
    }
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message:
          error.message || 'An error occurred while creating the Product.',
        error: error.message,
      });
    }
  }
};

export const productControllers = {
  createProduct,
};
