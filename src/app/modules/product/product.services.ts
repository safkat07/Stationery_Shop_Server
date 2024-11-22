import { TProduct } from './product.interface';
import { Product } from './product.schema';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

export const productServices = {
  createProductIntoDB,
};
