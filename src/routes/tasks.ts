import { Router } from 'express';

const taskRouter = Router();

/**
 * @swagger
 * /tasks/:
 *   get:
 *     summary: Rota de listar Tasks
 *     description: Retorna uma lista de tasks
 *     tags:
 *         - Tasks
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: List<Task>
 */

taskRouter.get('/', (req, res) => {
    res.json([{
        complete: false,
        description: 'Task1',
        user_id: 1
    }]);
});

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Rota de Criar Tasks
 *     description: Cria uma task
 *     tags:
 *         - Tasks
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: Object<Task>
 */

taskRouter.post('/add', (req, res) => {
    res.json({
        success: true,
        data: 'Task Added!'
    });
});

export default taskRouter;
