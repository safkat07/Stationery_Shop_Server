import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import { productServices } from './product.services';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const validateProduct = productValidationSchema.parse(product);
    const result = await productServices.createProductIntoDB(validateProduct);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return  res.status(400).json({
        success: false,
        message: 'Product validation failed',
        error: error.issues[0].message,
      });
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message:
          error.message || 'An error occurred while creating the Product.',
        error: error.message,
      });
      return;
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await productServices.getAllProductsFromDB(
      searchTerm as string,
    );
    res.status(201).json({
      success: true,
      message: 'All products Retrived Successfully',
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Unable to Get All Products',
        error: error.message,
      });
      return;
    }
  }
};

const getASingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getAsingleProductFromDB(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Product Retrived Successfully',
        data: result,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Unable to Get All Products',
        error: error.message,
      });
    }
  }
};

const updateASingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await productServices.updateAProductInDB(
      productId,
      updateData,
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product updated successfully.',
        data: result,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: 'Unable to Get All Products',
        error: error.message,
      });
    }
  }
};

const deleteASingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteAProductFromDB(productId);
    if (result.deletedCount === 0) {
      res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully.',
        data: {},
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Unable to delete product.',
        error: error.message,
      });
    }
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getASingleProduct,
  updateASingleProduct,
  deleteASingleProduct,
};
