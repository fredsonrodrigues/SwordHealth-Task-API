import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import homeRouter from './routes/home';
import taskRouter from './routes/tasks';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import userRouter from './routes/users';

// --- Polyfill for Prisma - Serializate big int
declare global {
  interface BigInt {
      toJSON(): string;
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString();
};
// ---

const swaggerOptions: Options = {
  swaggerDefinition: {
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: "Task services app's API"
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  security: [{
    bearerAuth: []
  }],
  apis: ['./src/routes/*.ts'],
};

const app: Application = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', homeRouter);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;