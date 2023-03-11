import { Request, Response } from 'express';
import { Prisma } from '@prisma/client'
import prisma from '../client';

const taskController = {
    getAlltasks: async (req: Request, res: Response) => {
        const tasks = await prisma.task.findMany();
        res.json({
            success: true,
            message: `Task List`,
            data: tasks
        });
    },
    createtask: async (req: Request, res: Response) => {
        const task: Prisma.TaskCreateInput = req.body;
        const returningFields: Prisma.TaskSelect = {
            title: true,
            id: true,
            timestamp: true
        };
        const newTask = await prisma.task.create({
            data: task,
            select: returningFields
        })
        res.json({
            success: true,
            message: `Task ${newTask.title} sucessufull created!`,
            data: newTask
        });
    },
    updateTask: async (req: Request, res: Response) => {
        const taskId = Number(req.params.taskId);
        const task: Prisma.TaskUpdateInput = req.body;
        const returningFields: Prisma.TaskSelect = {
            title: true,
            id: true,
            timestamp: true
        };
        const updateTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: task,
            select: returningFields
        })
        res.json({
            success: true,
            message: `Task ${updateTask.title} sucessufull created!`,
            data: updateTask
        });
    },
    deleteTask: async (req: Request, res: Response) => {
        const taskId = Number(req.params.taskId);
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        });
        res.json({
            success: true,
            message: `Usuário com id ${taskId} excluído com sucesso!`,
            data: deletedTask
        });
    }
}
export default taskController;