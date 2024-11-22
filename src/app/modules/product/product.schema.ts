import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, 'Product Name is Required'],
  },
  brand: {
    type: String,
    required: [true, 'Product Brand is Required'],
  },
  price: {
    type: Number,
    required: [true, 'Product Price is Required'],
  },
  category: {
    type: String,
    required: [true, 'Select a Category Please!!'],
    enum: {
      values: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      message: '{VALUE} is not a valid category',
    },
  },
  description: {
    type: String,
    required: [true, 'Product Description is Required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock availability is required'],
  },
});

export const Product = model<TProduct>('Product', productSchema);
