import { Request, Response } from 'express';
import { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken';
import prisma from '../client';

const loginController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const query: Prisma.UserWhereInput = {
      email: email
    }

    const user = await prisma.user.findFirst({
      where: query,
      select: {
        password: true,
        email: true,
        id: true
      }
    });
    console.log(req.body)
    if (!user || password != user.password) {
      return res.status(401).json({ message: 'invalid email ou password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({
      success: true,
      data: {
        token
      }
    });
  }
}
export default loginController