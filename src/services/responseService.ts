import { Response } from 'express';
import { ApiResponse } from '../types/apiResponse';

export const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data: any = null
) => {
    const response: ApiResponse = {
        status: statusCode,
        message
    };

    if (data !== null) {
        response.data = data;
        response.dataLength = Array.isArray(data) ? data.length : 1;
    }

    res.status(statusCode).json(response);
};