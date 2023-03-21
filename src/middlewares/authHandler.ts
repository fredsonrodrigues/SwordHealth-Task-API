import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'auth token not found' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'invalid token' });
        }
        req.headers['user_id'] = decoded.userId;
        next();
    });
}