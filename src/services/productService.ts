import { executeQuery } from './dbService';
import { Product } from '../types/apiResponse';
import { productQueries } from '../queries/productQueries.sql';

export class ProductService {
    
    async fetchAllProducts(): Promise<Product[]> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(productQueries.SELECT_ALL_PRODUCTS);
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                throw new Error(`No products found in the database.`);
            }
        });
    }

    async fetchProductInformation(pr_id: number): Promise<Product[]> {
        return await executeQuery(async (connection) => {
            const result = await connection.query(productQueries.SELECT_PRODUCT_BY_ID, [pr_id]);
            if (result.rows.length > 0) {
                return result.rows;
            } else {
                throw new Error(`Product with ID ${pr_id} does not exist.`);
            }
        });
    }

    async saveProduct(product: Product): Promise<Product> {
        return await executeQuery(async (connection) => {
            // Check if the product name already exists
            const { rows } = await connection.query(productQueries.CHECK_PRODUCT_EXISTENCE, [product.name]);

            if (rows[0].exists) {
                throw new Error("Product name already taken. Please choose another.");
            }

            // Insert the new product without specifying the ID
            const result = await connection.query(productQueries.INSERT_PRODUCT, [product.name, product.price, product.category]);

            return result.rows[0];
        });
    }

    async deleteProduct(prId: number): Promise<string> {
        return await executeQuery(async (connection) => {
            // Check if the product exists
            const existingProduct = await connection.query(productQueries.SELECT_PRODUCT_BY_ID, [prId]);

            if (existingProduct.rows.length === 0) {
                throw new Error("Product not found. Unable to delete.");
            }

            // Delete the product
            await connection.query(productQueries.DELETE_PRODUCT, [prId]);

            return `Product with ID ${prId} has been successfully deleted.`;
        });
    }

    async updateProduct(prId: number, updatedData: Partial<Product>): Promise<{ data: Product; message: string }> {
        return await executeQuery(async (connection) => {
            // Check if the product exists
            const existingProduct = await connection.query(productQueries.SELECT_PRODUCT_BY_ID, [prId]);

            if (existingProduct.rows.length === 0) {
                throw new Error("Product not found. Update operation cannot be completed.");
            }

            const setClause = Object.keys(updatedData).map((key, index) => `${key} = $${index + 1}`).join(", ");
            const sqlUpdate = productQueries.UPDATE_PRODUCT(setClause);
            
            const values = [...Object.values(updatedData), prId];
            const result = await connection.query(sqlUpdate, values);
            const updatedProduct = result.rows[0];

            return {
                data: updatedProduct,
                message: `Product with ID ${prId} has been successfully updated.`,
            };
        });
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        return await executeQuery(async (connection) => {
            const { rows } = await connection.query(productQueries.SELECT_BY_CATEGORY, [category]);
            return rows;
        });
    }
}