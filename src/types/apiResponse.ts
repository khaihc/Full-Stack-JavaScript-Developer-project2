
export interface ApiResponse {
    status: number;
    message: string;
    data?: any;
    dataLength?: number;
}

export interface User {
    id?: Number,
    user_name: string,
    first_name: string,
    last_name: string,
    password: string
}

export interface Product {
    id?: Number,
    name: string,
    price: Number,
    category?: string
}

export interface Order {
    id?: Number,
    product_id: number,
    user_id: number,
    quantity: number,
    status: string
}