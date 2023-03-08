import { Router, Request, Response } from 'express';

const homeRouter: Router = Router();

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

export default homeRouter;