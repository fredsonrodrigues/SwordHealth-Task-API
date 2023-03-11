import { Router } from 'express';
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
 *     tags:
 *         - Tasks
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: List<Task>
 */

taskRouter.get('/', taskController.getAlltasks);

/**
 * @swagger
 * /tasks/add:
 *   post:
 *     summary: Rota de Criar tasks
 *     description: Cria uma task
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

taskRouter.post('/add', taskController.createtask);
/**
* @swagger
* /tasks/delete/{id}:
*   delete:
*       summary: Rota de Excluir Task
*       description: Drop um task pelo ID
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
taskRouter.delete('/delete/:taskId', taskController.deleteTask);

/**
* 
* @swagger
* /tasks/update/{id}:
*   patch:
*       summary: Rota de atualização de task
*       description: Atualiza informações de um task a partir de seu ID
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
taskRouter.patch('/update/:taskId', taskController.updateTask);
export default taskRouter;
