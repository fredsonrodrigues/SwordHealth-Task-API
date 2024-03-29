import { Router } from 'express';
import { verifyToken } from '../middlewares/authHandler';
import taskController from '../controllers/taskController';

const taskRouter : Router = Router();

/**
 * @swagger
 * definitions:
 *   Task:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         example: Dummy Task
 *       description:
 *         type: string
 *         example: A task To create something
 *       timestamp:
 *         type: string
 *         example: 123456
 *       user_id:
 *         type: integer
 *         example: 1
 *     required:
 *       - title
 *       - description
 *       - user_id
 */

/**
 * @swagger
 * /tasks/:
 *   get:
 *     summary: Rota de listar Tasks
 *     description: Retorna uma lista de tasks
 *     security:
 *         - bearerAuth: []
 *     tags:
 *         - Tasks
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: List<Task>
 */

taskRouter.get('/', verifyToken, taskController.getAlltasks);

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Rota de Criar tasks
 *     description: Cria uma task
 *     security:
 *         - bearerAuth: []
 *     tags:
 *         - Tasks
 *     produces:
 *         - application/json
 *     parameters:
 *          - name: data
 *            description: Objeto JSON a ser criado
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/Task'
 *     responses:
 *       200:
 *         description: Object<Task>
 */

taskRouter.post('/add', verifyToken, taskController.createtask);
/**
* @swagger
* /tasks/delete/{id}:
*   delete:
*       summary: Rota de Excluir Task
*       description: Drop um task pelo ID
*       security:
*          - bearerAuth: []
*       tags:
*          - Tasks
*       produces:
*          - application/json
*       parameters:
*          - name: id
*            description: ID da task a ser excluída
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
taskRouter.delete('/delete/:taskId', verifyToken, taskController.deleteTask);

/**
* 
* @swagger
* /tasks/update/{id}:
*   patch:
*       summary: Rota de atualização de task
*       description: Atualiza informações de um task a partir de seu ID
*       security:
*          - bearerAuth: []
*       tags:
*          - Tasks
*       produces:
*           - application/json
* 
*       parameters:
*           - name: id
*             description: ID da task a ser atualizado
*             in: path
*             required: true
*           - name: data
*             description: Objeto JSON com as informações a serem atualizadas
*             in: body
*             required: true
*             schema:
*                $ref: '#/definitions/Task'
*       responses:
*           200:
*               description: task atualizado com sucesso
*/
taskRouter.patch('/update/:taskId', verifyToken, taskController.updateTask);
export default taskRouter;
