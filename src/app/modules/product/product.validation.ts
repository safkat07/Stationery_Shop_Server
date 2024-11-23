import { z } from 'zod';

const productValidationSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, 'Product name is Required')
    .max(20, 'Product name cannot be more than 20 characters'),
  brand: z
    .string({
      required_error: 'Brand name is required',
      invalid_type_error: 'Brand name must be a string',
    })
    .min(1, 'Brand name is Required')
    .max(20, 'Brand name cannot be more than 10 characters'),
  price: z
    .number({
      required_error: 'Product Price is required',
      invalid_type_error: 'Product Price must be a number',
    })
    .positive('Product Price must be a positive number'),
  category: z.enum([
    'Writing',
    'Office Supplies',
    'Art Supplies',
    'Educational',
    'Technology',
  ]),
  description: z
    .string({
      required_error: 'Description  is required',
      invalid_type_error: 'Descriptionmust must be a string',
    })
    .min(10, 'Description must be at least 50 characters long')
    .max(200, 'Description cannot be more than 200 characters'),
  quantity: z
    .number({
      required_error: 'Product Quantity  is required',
      invalid_type_error: 'Product Quantity must be a number',
    })
    .positive('Product Quantity  must be a positive number'),
  inStock: z.boolean({
    required_error: 'Stock availability is required',
    invalid_type_error: 'Stock must be a boolean value',
  }),
});

export default productValidationSchema;
