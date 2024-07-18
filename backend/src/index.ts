import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/userRoute'
import {productRouter} from "./routes/product";
import dotenv from 'dotenv'
const app = express()

if (process.env.NODE_ENV != 'production') {
    dotenv.config()
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/products', productRouter)

connectDB()
app.listen(process.env.PORT, () => console.log('server run'))
