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

const getAsingleProductFromDB = async (productID: unknown) => {
  const result = await Product.findById(productID);
  return result;
};

const updateAProductInDB = async (
  productID: unknown,
  updateData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productID, updateData, {
    runValidators: true,
    new: true,
  });
  return result;
};

const deleteAProductFromDB = async (productID: unknown) => {
  const result = await Product.deleteOne({ _id: productID });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAsingleProductFromDB,
  updateAProductInDB,
  deleteAProductFromDB,
};
