import { Router, Request, Response } from 'express';
import { Prisma } from '@prisma/client'
import prisma from '../client';

const userRouter: Router = Router();

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: John Doe
 *       email:
 *         type: string
 *         example: johndoe@mail.com
 *       password:
 *         type: string
 *         example: 123456
 *       role:
 *         type: string
 *         example: ADMIN
 *       admin_user:
 *         type: integer
 *         example: 0
 *     required:
 *       - nome
 *       - email
 *       - password
 *       - role
 *       - admin_user
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Rota de listar users
 *     description: Retorna uma lista de users
 *     tags:
 *         - Users
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: List<User>
 */

userRouter.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json({
        success: true,
        message: `Lista de usuários`,
        data: users
    });
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Rota de Criar users
 *     description: Cria uma user
 *     tags:
 *         - Users
 *     produces:
 *         - application/json
 *     parameters:
 *          - name: data
 *            description: Objeto JSON a ser criado
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Object<User>
 */

userRouter.post('/add', async (req: Request, res: Response) => {
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
});

/**
* @swagger
* /users/delete/{id}:
*   delete:
*       summary: Rota de Excluir usuário
*       description: Exclui um usuário pelo ID
*       tags:
*          - Users
*       produces:
*          - application/json
*       parameters:
*          - name: id
*            description: ID do usuário a ser excluído
*            in: path
*            required: true
*            type: integer
*       responses:
*           200:
*               description: Usuário excluído com sucesso
*           404:
*               description: Usuário não encontrado
*           500:
*               description: Erro interno do servidor
*/
userRouter.delete('/delete/:userId', async (req: Request, res: Response) => {
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
});

/**
* 
* @swagger
* /users/update/{id}:
*   patch:
*       summary: Rota de atualização de usuário
*       description: Atualiza informações de um usuário a partir de seu ID
*       tags:
*          - Users
*       produces:
*           - application/json
* 
*       parameters:
*           - name: id
*             description: ID do usuário a ser atualizado
*             in: path
*             required: true
*           - name: data
*             description: Objeto JSON com as informações a serem atualizadas
*             in: body
*             required: true
*             schema:
*                $ref: '#/definitions/User'
*       responses:
*           200:
*               description: Usuário atualizado com sucesso
*/
userRouter.patch('/update/:userId', async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    const userData: Prisma.UserUpdateInput = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
        },
        data: userData
    });
    res.json({
        success: true,
        message: `Usuário com id ${userId} atualizado com sucesso!`,
        data: updatedUser
    });
});


export default userRouter;