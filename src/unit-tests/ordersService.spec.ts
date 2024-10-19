import { OrderService } from '../services/ordersService';
import * as dbService from '../services/dbService';
import { Order } from '../types/apiResponse';

describe('OrderService', () => {
    let orderService: OrderService;

    beforeEach(() => {
        orderService = new OrderService();
    });

    describe('index', () => {
        it('should return a list of orders', async () => {
            const mockOrders: Order[] = [
                { id: 1, product_id: 1, user_id: 1, quantity: 2, status: 'active' },
                { id: 2, product_id: 2, user_id: 1, quantity: 3, status: 'active' },
            ];
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: mockOrders })
                });
            });

            const result = await orderService.index();
            expect(result).toEqual(mockOrders);
        });

        it('should return an empty array if no orders found', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            const result = await orderService.index();
            expect(result).toEqual([]);
        });
    });

    describe('createOrder', () => {
        it('should create an order successfully', async () => {
            const newOrder: Order = { product_id: 1, user_id: 1, quantity: 2, status: 'active' };
            const mockResult = { id: 1, ...newOrder };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [mockResult] })
                });
            });

            const result = await orderService.createOrder(newOrder);
            expect(result).toEqual(mockResult);
        });

        it('should throw an error if order creation fails', async () => {
            const newOrder: Order = { product_id: 1, user_id: 1, quantity: 2, status: 'active' };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(orderService.createOrder(newOrder)).toBeRejectedWithError('Error when inserting data into the database.');
        });
    });

    describe('getOrdersByUser', () => {
        it('should return orders for a specific user', async () => {
            const userId = 1;
            const mockOrders: Order[] = [
                { id: 1, product_id: 1, user_id: 1, quantity: 2, status: 'active' }
            ];
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: mockOrders })
                });
            });

            const result = await orderService.getOrdersByUser(userId);
            expect(result).toEqual(mockOrders);
        });

        it('should return an empty array if no orders found for the user', async () => {
            const userId = 2;
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            const result = await orderService.getOrdersByUser(userId);
            expect(result).toEqual([]);
        });
    });

    describe('getCompletedOrdersByUser', () => {
        it('should return completed orders for a specific user', async () => {
            const userId = 1;
            const mockCompletedOrders: Order[] = [
                { id: 1, product_id: 1, user_id: 1, quantity: 2, status: 'completed' }
            ];
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: mockCompletedOrders })
                });
            });

            const result = await orderService.getCompletedOrdersByUser(userId);
            expect(result).toEqual(mockCompletedOrders);
        });

        it('should return an empty array if no completed orders found for the user', async () => {
            const userId = 2;
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            const result = await orderService.getCompletedOrdersByUser(userId);
            expect(result).toEqual([]);
        });
    });

    describe('updateStatusOfOrder', () => {
        it('should update the order status successfully', async () => {
            const orderId = 1;
            const mockUpdatedOrder = { id: 1, product_id: 1, user_id: 1, quantity: 2, status: 'completed' };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [mockUpdatedOrder] })
                });
            });

            const result = await orderService.updateStatusOfOrder(orderId);
            expect(result).toEqual(mockUpdatedOrder);
        });

        it('should throw an error if the order does not exist', async () => {
            const orderId = 999;
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(orderService.updateStatusOfOrder(orderId)).toBeRejectedWithError('Error when updating order status. Order ID may not exist.');
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order successfully', async () => {
            const orderId = 1;
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [{ exists: true }] })
                });
            });

            const result = await orderService.deleteOrder(orderId);
            expect(result).toEqual(`Order with ID ${orderId} has been successfully deleted.`);
        });

        it('should throw an error if the order does not exist', async () => {
            const orderId = 999;
            spyOn(dbService, 'executeQuery').and.callFake(async (callback) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(orderService.deleteOrder(orderId)).toBeRejectedWithError(`Order with ID ${orderId} does not exist.`);
        });
    });
});