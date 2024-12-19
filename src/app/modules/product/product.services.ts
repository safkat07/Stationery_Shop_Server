import { TProduct } from './product.interface';
import { Product } from './product.schema';

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  const filter = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};
  const result = await Product.find(filter);
  return result;
};

const getAsingleProductFromDB = async (productId: unknown) => {
  const result = await Product.findById(productId);
  return result;
};

const updateAProductInDB = async (
  productId: unknown,
  updateData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, updateData, {
    runValidators: true,
    new: true,
  });
  return result;
};

const deleteAProductFromDB = async (productId: unknown) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAsingleProductFromDB,
  updateAProductInDB,
  deleteAProductFromDB,
};
