import express, { Request, Response } from 'express';
import { OrderService } from '../../services/ordersService';
import { Order } from '../../types/apiResponse';
import { sendResponse } from '../../services/responseService';
import auth from '../../middleware/authentication';
const orderRoute = express.Router();
const orderService = new OrderService();

// Get all orders
orderRoute.get("/", auth, async (_req: Request, res: Response) => {
    try {
        const orders = await orderService.index();
        sendResponse(res, 200, "Retrieved the list of orders successfully.", orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        sendResponse(res, 500, "An error occurred while fetching orders.");
    }
});

// Get order by user_id
orderRoute.get("/user/:userId", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (!isNaN(userId)) {
            const orders = await orderService.getOrdersByUser(userId);
            sendResponse(res, 200, "Retrieved orders for user successfully.", orders);
        } else {
            sendResponse(res, 400, "Invalid user ID. Please provide a numeric ID.");
        }
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        sendResponse(res, 500, `Failed to retrieve orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Get orders complete by user_id
orderRoute.get("/user/:userId/order", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (!isNaN(userId)) {
            const orders = await orderService.getCompletedOrdersByUser(userId);
            sendResponse(res, 200, "Retrieved completed orders for user successfully.", orders);
        } else {
            sendResponse(res, 400, "Invalid user ID. Please provide a numeric ID.");
        }
    } catch (error) {
        console.error("Error fetching completed orders by user:", error);
        sendResponse(res, 500, `Failed to retrieve completed orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Create new order
orderRoute.post("/", auth, async (req: Request, res: Response) => {
    try {
        const newOrder: Order = {
            product_id: parseInt(req.body.product_id, 10),
            user_id: parseInt(req.body.user_id, 10),
            quantity: req.body.quantity,
            status: 'active'
        };

        if (newOrder.product_id && newOrder.user_id && newOrder.quantity) {
            if (newOrder.quantity <= 0) {
                return sendResponse(res, 400, "Quantity must be a positive number.");
            }
            const createdOrder = await orderService.createOrder(newOrder);
            sendResponse(res, 201, "Order created successfully.", createdOrder);
        } else {
            sendResponse(res, 400, "Please provide valid product ID, user ID, and quantity.");
        }
    } catch (error) {
        console.error("Error during order creation:", error);
        sendResponse(res, 422, `Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Update order status
orderRoute.put("/:id", auth, async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        if (!isNaN(orderId)) {
            const updatedOrder = await orderService.updateStatusOfOrder(orderId);
            sendResponse(res, 200, "Order status updated to complete successfully.", updatedOrder);
        } else {
            sendResponse(res, 400, "Invalid order ID. Please provide a numeric ID.");
        }
    } catch (error) {
        console.error("Error during order update:", error);
        sendResponse(res, 422, `Failed to update order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Delete order
orderRoute.delete("/:id", auth, async (req: Request, res: Response) => {
    try {
        const orderId = parseInt(req.params.id, 10);
        if (!isNaN(orderId)) {
            const message = await orderService.deleteOrder(orderId);
            sendResponse(res, 200, message);
        } else {
            sendResponse(res, 400, "Invalid order ID. Please provide a numeric ID.");
        }
    } catch (error) {
        console.error("Error during order deletion:", error);
        sendResponse(res, 422, `Failed to delete order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

export default orderRoute;