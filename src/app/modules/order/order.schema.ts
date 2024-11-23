import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';
import { Product } from '../product/product.schema';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is Required!!'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Enter  the quantity of Product'],
      min: [0, 'Enter a positive Number please!!'],
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

// Pre-save middleware to calculate totalPrice
// orderSchema.pre('save', async function (next) {
//   if (!this.isModified('quantity') && !this.isModified('product')) {
//     return next();
//   }

//   const product = await Product.findById(this.product);
//   if (!product) {
//     throw new Error('Product not found');
//   }

//   this.totalPrice = product.price * this.quantity;
//   next();
// });

export const Order = model<TOrder>('Order', orderSchema);
