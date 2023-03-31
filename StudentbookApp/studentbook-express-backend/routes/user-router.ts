/**
 * @swagger
 *   components:
 *    schemas:
 *      user:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *            name:
 *              type: string
 *            status:
 *              type: string
 *            loggedIn:
 *              type: boolean
 */

import express, { Request, Response, Handler } from 'express';
import * as userModel from '../model/user';
import { User } from '../types/index_studentbook';

const userRouter= express.Router(); 

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
// GET ALL USERS 
userRouter.get('/', (req: Request, res: Response) => {
    userModel.getUsers((err: Error, users: User[]) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
}); 

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Username found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
//GET USER BY NAME (LOG IN)
userRouter.post('/login', (req: Request, res: Response) => {
    const user = <User>req.body;
    userModel.getUser(user.name, (error: boolean, userName: string) => {
        if(error) {
            res.status(403).json({status: 'forbidden' }); 
        } else {
            res.status(200).json({status: 'success: true' }); 
            user.loggedIn = true;
        }
    });
});

/**
 * @swagger
 * /user/status:
 *   put:
 *     summary: Change the status of a user
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: Status changed 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 */
userRouter.put('/status', (req: Request, res: Response) => {
    const user = <User>req.body; 
    userModel.setStatus(user.status, user.name, (error: boolean, userStatus: string) => {
        if(error) {
            res.status(404).json({status: 'no user found' }); 
        } else {
            res.status(200).json({status: user.status }); 
        }
    });
});

/**
 * @swagger
 * /user/friends:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: A list of friends (username & status).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *     parameters:
 *     - in: query
 *       name: userid
 *       schema:
 *         type: integer
 *       description: userid
 */
userRouter.get('/friends', (req: Request, res: Response) => {
    const userID = <number><unknown>req.query.userid;
            userModel.getFriends(userID, (err: Error, users: User[]) => {
                if (err) {
                    res.status(500).json({ status: 'error', errorMessage: err.message });
                } else {
                    res.status(200).json(users);
                }
            }); 
});
/**
 * @swagger
 * /user/id:
 *   get:
 *     summary: Get the id of the logged in user
 *     responses:
 *       200:
 *         description: A list with the id.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *     parameters:
 *     - in: query
 *       name: username
 *       schema:
 *         type: string
 *       description: username
 */
userRouter.get('/id', (req: Request, res: Response) => {
    const userName = <string>req.query.username; 
    userModel.getID(userName, (err: Error, users: string) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});

/**
 * @swagger
 * /user/status:
 *   get:
 *     summary: Get the status of the logged in user
 *     responses:
 *       200:
 *         description: A list with the status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *     parameters:
 *     - in: query
 *       name: username
 *       schema:
 *         type: string
 *       description: username
 */
 userRouter.get('/status', (req: Request, res: Response) => {
    const userName = <string>req.query.username; 
    userModel.getStatus(userName, (err: Error, users: string) => {
        if (err) {
            res.status(500).json({ status: 'error', errorMessage: err.message });
        } else {
            res.status(200).json(users);
        }
    });
});


/*
/**
 * @swagger
 * /users:
 *   post:
 *      summary: Add a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserInput'
 *      responses:
 *         200:
 *            description: The ID of the new User
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 */
 /*userRouter.post('/', (req: Request, res: Response) => {
     const user = <User>req.body;
     userModel.addFriend(user, (error: Error, userId: number) => {
         if (error) {
             res.status(500).json({ status: 'error', errorMessage: error.message });
         } else {
             res.status(200).json({ status: 'succes', userId });
         }
     });
 });*/

export { userRouter };