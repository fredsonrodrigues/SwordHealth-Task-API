import { Router } from 'express';
import userController from '../controllers/userController';

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
 *     summary: List users endpoint
 *     description: Returns a list of Users
 *     tags:
 *         - Users
 *     produces:
 *         - application/json
 *     responses:
 *       200:
 *         description: List<User>
 */

userRouter.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: User create endpoint
 *     description: Create a new User
 *     tags:
 *         - Users
 *     produces:
 *         - application/json
 *     parameters:
 *          - name: data
 *            description: JSON User model
 *            in: body
 *            required: true
 *            schema:
 *              $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Object<User>
 */

userRouter.post('/add', userController.createUser);

/**
* @swagger
* /users/delete/{id}:
*   delete:
*       summary: Delete user endpoint
*       description: Delete a user by ID
*       tags:
*          - Users
*       produces:
*          - application/json
*       parameters:
*          - name: id
*            description: user id
*            in: path
*            required: true
*            type: integer
*       responses:
*           200:
*               description: User deleted successfully
*           404:
*               description: User Not found
*           500:
*               description: Internal Error
*/
userRouter.delete('/delete/:userId', userController.deleteUser);

/**
* 
* @swagger
* /users/update/{id}:
*   patch:
*       summary: User update endpoint
*       description: using the user id, update the data from selected user
*       tags:
*          - Users
*       produces:
*           - application/json
* 
*       parameters:
*           - name: id
*             description: User Id
*             in: path
*             required: true
*           - name: data
*             description: Updated User Model JSON
*             in: body
*             required: true
*             schema:
*                $ref: '#/definitions/User'
*       responses:
*           200:
*               description: User updated successfully
*/
userRouter.patch('/update/:userId', userController.updateUser);


export default userRouter;