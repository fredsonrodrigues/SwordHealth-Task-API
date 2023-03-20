import { Router, Request, Response } from 'express';
import loginController from '../controllers/loginController';

const homeRouter: Router = Router();

/**
 * @swagger
 * definitions:
 *   UserLogin:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         example: johndoe@mail.com
 *       password:
 *         type: string
 *         example: 123456
 *     required:
 *       - email
 *       - password
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de bem-vindo
 *     description: Retorna uma Objeto com uma mensagem de boas vindas
 *     tags:
 *         - Home
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: Objeto 'Bem-vindo'
 */
homeRouter.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        data: 'Hello World!'
    });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Create a new User
 *     tags:
 *         - Home
 *     produces:
 *         - application/json
 *     parameters:
 *          - name: data
 *            description: JSON User model
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: Authorization
 */
homeRouter.post('/login', loginController.login);

export default homeRouter;