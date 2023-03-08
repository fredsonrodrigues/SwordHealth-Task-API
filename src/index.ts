import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import homeRouter from './routes/home';
import taskRouter from './routes/tasks';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: "Task services app's API"
    },
  },
  apis: ['./src/routes/*.ts'],
};

const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/', homeRouter);
app.use('/tasks', taskRouter);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack
  });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});