import express, { Request, Response } from 'express'
import { ProductService } from '../../services/productService';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { sendResponse as sendResponse } from '../../services/responseService';
import auth from '../../middleware/authentication';
import { Product } from '../../types/apiResponse';

dotenv.config()
const productRoute = express.Router();
const productService = new ProductService();
const serect = String(process.env.SECRET_TOKEN)

// Get All Products from Database
productRoute.get("/", auth, async (req: Request, res: Response) => {
    try {
        const products = await productService.fetchAllProducts();
        sendResponse(res, 200, "Get list of product successfully", products)
    } catch (error) {
        sendResponse(res, 500, `Failed to retrieve product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
})

// Fetch Information for a Single Product
productRoute.get("/:id", auth, async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);

        // Check if userId is a valid number
        if (!isNaN(userId)) {
            const product = await productService.fetchProductInformation(userId);
            sendResponse(res, 200, "Successfully retrieved product information.", product);
        } else {
            sendResponse(res, 400, "Invalid userId: product id must be a number");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        sendResponse(res, 500, `Failed to retrieve product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Save Product
productRoute.post("/registerProduct", auth, async (req: Request, res: Response) => {
    try {
        const newUser: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        console.log(newUser);

        // Validate input
        if (newUser.name && newUser.price && newUser.category ) {
            const signUpUser = await productService.saveProduct(newUser);
            sendResponse(res, 200, "Register user successfully", signUpUser);
        } else {
            sendResponse(res, 400, "Please input username, password, firstname, lastname");
        }
    } catch (error) {
        console.error("Error during register user:", error);
        sendResponse(res, 422, `Failed to register user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Updater Product
productRoute.put("/:id", auth, async (req: Request, res: Response) => {
    try {
        const prId = parseInt(req.params.id);
        const updatedData: Partial<Product> = req.body;
        const result = await productService.updateProduct(prId, updatedData);
        sendResponse(res, 200, result.message, result.data);
    } catch (error) {
        console.error("Error during user update:", error);
        sendResponse(res, 422, `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

// Delete Product
productRoute.delete("/:id", auth, async (req: Request, res: Response) => {
    try {
        const prId = parseInt(req.params.id);
        const message = await productService.deleteProduct(prId);
        sendResponse(res, 200, message);
    } catch (error) {
        console.error("Error during user deletion:", error);
        sendResponse(res, 422, `Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

productRoute.get("/category/:category", auth, async (req: Request, res: Response) => {
    try {
        const category = req.params.category;
        const products = await productService.getProductsByCategory(category);

        if (products.length === 0) {
            return sendResponse(res, 404, "No products found for this category.");
        }
        sendResponse(res, 200, "Products retrieved successfully.", products);
    } catch (error) {
        console.error("Error during fetching products by category:", error);
        sendResponse(res, 422, `Failed to fetch products: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});

export default productRoute;