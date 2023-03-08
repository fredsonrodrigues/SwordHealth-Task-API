import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
};