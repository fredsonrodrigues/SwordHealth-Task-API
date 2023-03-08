import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
    });
};
