import { Router } from 'express';

const userRouter = Router();

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

userRouter.get('/', (req, res) => {
    res.json([{
        type: 2,
        description: 'User1',
        user_manager: 1,
    }]);
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
 *     responses:
 *       200:
 *         description: Object<User>
 */

userRouter.post('/add', (req, res) => {
    res.json({
        success: true,
        data: 'User Added!'
    });
});

export default userRouter;