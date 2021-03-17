import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';

import productRoutes from './routes/product';

const app = express();
dotenv.config();

app.use(morgan('dev'));

//Routes

app.use('/api',productRoutes);

//listen

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("thanh cong")
 })