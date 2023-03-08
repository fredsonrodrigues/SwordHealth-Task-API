import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import homeRouter from './routes/home';
import taskRouter from './routes/tasks';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import userRouter from './routes/users';

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: "Task services app's API"
    },
  },
  apis: ['./src/routes/*.ts'],
};

const app: Application = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', homeRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;