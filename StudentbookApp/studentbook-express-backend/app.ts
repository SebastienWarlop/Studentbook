import * as dotenv from 'dotenv'; //alle paden URL in voor app
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './routes/user-router';
import { messageRouter } from './routes/message-router';
import { friendsRouter } from './routes/friends-router';

const app = express(); 
dotenv.config(); 

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API for Studentbook',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/messages', messageRouter);
app.use('/friends', friendsRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Backend is running...' });
});

app.get('/', (req, res) => {
    return res.status(200).send();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}.`);
}); 