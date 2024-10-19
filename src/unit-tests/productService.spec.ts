import { ProductService } from '../services/productService';
import * as dbService from '../services/dbService';
import { Product } from '../types/apiResponse';

describe('ProductService', () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
    });

    describe('fetchAllProducts', () => {
        it('should return a list of products', async () => {
            const mockProducts: Product[] = [
                { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
                { id: 2, name: 'Product 2', price: 200, category: 'Category 2' },
            ];
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: mockProducts })
                });
            });

            const result = await productService.fetchAllProducts();
            console.log("fetchAllProducts: ", result);
            expect(result).toEqual(mockProducts);
        });

        it('should throw an error if no products found', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(productService.fetchAllProducts()).toBeRejectedWithError('No products found in the database.');
        });
    });

    describe('fetchProductInformation', () => {
        it('should return product information for a valid product ID', async () => {
            const mockProduct = { id: 1, name: 'Iphone 16', price: 999, category: 'Phone' };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [mockProduct] })
                });
            });
        
            const result = await productService.fetchProductInformation(1);
            console.log("fetchProductInformation", result);
            expect(result).toEqual([mockProduct]);
        });

        it('should throw an error if product not found', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(productService.fetchProductInformation(999)).toBeRejectedWithError('Product with ID 999 does not exist.');
        });
    });

    describe('saveProduct', () => {
        it('should save a new product successfully', async () => {
            const newProduct: Product = { name: 'New Product', price: 150, category: 'Category 3' };
            const mockResult = { id: 3, ...newProduct };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [mockResult] })
                });
            });

            const result = await productService.saveProduct(newProduct);
            expect(result).toEqual(mockResult);
        });

        it('should throw an error if product name already exists', async () => {
            const existingProduct: Product = { name: 'Existing Product', price: 150, category: 'Category 3' };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({
                        rows: [{ exists: true }]
                    })
                });
            });

            await expectAsync(productService.saveProduct(existingProduct)).toBeRejectedWithError('Product name already taken. Please choose another.');
        });
    });

    describe('updateProduct', () => {
        it('should update an existing product successfully', async () => {
            const updatedData: Partial<Product> = { price: 200 };
            const mockUpdatedProduct = { id: 1, name: 'Product 1', price: 200, category: 'Category 1' };

            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async (sql: string, params: any[]) => ({
                        rows: [mockUpdatedProduct],
                    }),
                });
            });

            const result = await productService.updateProduct(1, updatedData);
            expect(result).toEqual({
                data: mockUpdatedProduct,
                message: 'Product with ID 1 has been successfully updated.',
            });
        });

        it('should throw an error if product not found', async () => {
            const updatedData: Partial<Product> = { price: 200 };
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(productService.updateProduct(999, updatedData)).toBeRejectedWithError('Product not found. Update operation cannot be completed.');
        });
    });

    describe('deleteProduct', () => {
        it('should delete an existing product successfully', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [{ exists: true }] })
                });
            });

            const result = await productService.deleteProduct(1);
            expect(result).toEqual('Product with ID 1 has been successfully deleted.');
        });

        it('should throw an error if product not found', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            await expectAsync(productService.deleteProduct(999)).toBeRejectedWithError('Product not found. Unable to delete.');
        });
    });

    describe('getProductsByCategory', () => {
        it('should return products for a given category', async () => {
            const mockProducts: Product[] = [
                { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },
                { id: 2, name: 'Product 2', price: 200, category: 'Category 1' },
            ];
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: mockProducts })
                });
            });

            const result = await productService.getProductsByCategory('Category 1');
            expect(result).toEqual(mockProducts);
        });

        it('should return an empty array if no products found for the category', async () => {
            spyOn(dbService, 'executeQuery').and.callFake(async (callback: any) => {
                return callback({
                    query: async () => ({ rows: [] })
                });
            });

            const result = await productService.getProductsByCategory('Nonexistent Category');
            expect(result).toEqual([]);
        });
    });
});