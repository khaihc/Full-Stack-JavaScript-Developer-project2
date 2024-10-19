import express from 'express';
const routers = express.Router();
import productRoute from './handle/productRoute'
import userRoute from './handle/userRoute';
import orderRoute from './handle/orderRoute'

routers.get('/', (req, res) => {
    res.json({
        message: 'Project 2: Creating an API with PostgreSQL and Express',
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

routers.use('/users', userRoute)
routers.use('/products', productRoute);
routers.use('/orders', orderRoute)

export default routers;
