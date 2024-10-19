import { executeQuery } from './dbService';
import { Order } from '../types/apiResponse';
import { orderQueries } from '../queries/orderQueries.sql';

export class OrderService {
    // Get all orders
    async index(): Promise<Order[]> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(orderQueries.SELECT_ALL_ORDERS);
            return result.rows.length > 0 ? result.rows : [];
        });
    }

    // Create order
    async createOrder(order: Order): Promise<Order> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(orderQueries.INSERT_ORDER, [
                order.product_id,
                order.quantity,
                order.user_id,
                order.status,
            ]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error(`Error when inserting data into the database.`);
            }
        });
    }

    // Get order by user_id
    async getOrdersByUser(userId: number): Promise<Order[]> {
        return await executeQuery(async (connection) => {
            const results = await connection.query(orderQueries.SELECT_ORDERS_BY_USER, [userId]);
            return results.rows.length > 0 ? results.rows : [];
        });
    }

    // Get completed orders by user_id
    async getCompletedOrdersByUser(userId: number): Promise<Order[]> {
        return await executeQuery(async (connection) => {
            const results = await connection.query(orderQueries.SELECT_COMPLETED_ORDERS_BY_USER, [userId]);
            return results.rows.length > 0 ? results.rows : [];
        });
    }

    // Update order status
    async updateStatusOfOrder(orderId: number): Promise<Order> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(orderQueries.UPDATE_ORDER_STATUS, [orderId]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error(`Error when updating order status. Order ID may not exist.`);
            }
        });
    }

    async deleteOrder(orderId: number): Promise<string> {
        return await executeQuery(async (connection) => {
            // Check if order exists
            const existingOrder = await connection.query(orderQueries.CHECK_ORDER_EXISTENCE, [orderId]);
    
            if (existingOrder.rows.length === 0) {
                throw new Error(`Order with ID ${orderId} does not exist.`);
            }
    
            // Delete order
            await connection.query(orderQueries.DELETE_ORDER, [orderId]);
    
            return `Order with ID ${orderId} has been successfully deleted.`;
        });
    }
}