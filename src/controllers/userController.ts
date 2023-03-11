import { Request, Response } from 'express';
import { Prisma } from '@prisma/client'
import prisma from '../client';

const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        const users = await prisma.user.findMany();
        res.json({
            success: true,
            message: `Lista de usuários`,
            data: users
        });
    },
    createUser: async (req: Request, res: Response) => {
        const user: Prisma.UserCreateInput = req.body;
        const returningFields: Prisma.UserSelect = {
            email: true,
            id: true
        };
        const newUser = await prisma.user.create({
            data: user,
            select: returningFields
        })
        res.json({
            success: true,
            message: `Usuário com email ${newUser.email} criado com sucesso!`,
            data: newUser
        });
    },
    updateUser: async (req: Request, res: Response) => {
        const user: Prisma.UserCreateInput = req.body;
        const returningFields: Prisma.UserSelect = {
            email: true,
            id: true
        };
        const newUser = await prisma.user.create({
            data: user,
            select: returningFields
        })
        res.json({
            success: true,
            message: `Usuário com email ${newUser.email} criado com sucesso!`,
            data: newUser
        });
    },
    deleteUser: async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const deletedUser = await prisma.user.delete({
            where: {
                id: userId
            }
        });
        res.json({
            success: true,
            message: `Usuário com id ${userId} excluído com sucesso!`,
            data: deletedUser
        });
    }
}
export default userController;