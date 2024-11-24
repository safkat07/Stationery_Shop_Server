import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is Requiried',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Invalid Email Address',
    }),
  product: z
    .string({
      required_error: 'Product Referrance is string',
      invalid_type_error: 'Product Referrance must be a string',
    })
    .min(1, 'Product Referrance is Required'),
  quantity: z
    .number({
      required_error: 'Product quantity is Requiried',
      invalid_type_error: 'Product quantity must be a number',
    })
    .positive({
      message: "Quantity can't be 0 or negative value",
    }),
  totalPrice: z
    .number({
      required_error: 'Product Referrance is Requiried',
      invalid_type_error: 'Product Referrance must be a number',
    })
    .optional(),
});

export default orderValidationSchema;
