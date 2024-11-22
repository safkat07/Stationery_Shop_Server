import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes

//products routes starts
app.use('/api/products', productRoutes);
//products routes ends

//application routes

app.get('/', (req: Request, res: Response) => {
  res.send('Stationery Market');
});

export default app;
