import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expressValidator from 'express-validator';

import productRoutes from './routes/product';
import categoryRoutes from'./routes/category';
import authRoutes from'./routes/auth';
import userRoutes from'./routes/user';

// import { omit } from 'lodash';

//config
dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(expressValidator());

app.use(morgan('dev'));

// connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected')
});

mongoose.connection.on('Error', err => {
    console.log(`Data connect failed, ${err.message}`)
})

app.use(cors({credentials: ' same-origin'}));

//routes middewares
app.use('/api',productRoutes);
app.use('/api',categoryRoutes);
app.use('/api',authRoutes);
app.use('/api',userRoutes);



//listen
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("thanh cong", port);
 })