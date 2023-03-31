/**
 * @swagger
 *   components:
 *    schemas:
 *      friendList:
 *          type: object
 *          properties:
 *            user_id:
 *              type: number
 *            friendName:
 *              type: string
 * 
 */

import express, { Request, Response, Handler } from 'express';
import * as friendModel from '../model/friend';
import { Friend, FriendProxy, User } from '../types/index_studentbook';

const friendsRouter = express.Router();

/**
 * @swagger
 * /friends:
 *   post:
 *      summary: Add a friend
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/friendList'
 *      responses:
 *         200:
 *            description: Friend has been added
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 *         404:
 *            description: error
 *            content:
 *              application/json:
 *                schema:
 *                  type: number
 *                  description: Database ID
 * 
 */
 friendsRouter.post('/', (req: Request, res: Response) => {
    const friendProxy = <FriendProxy>req.body;

    friendModel.addFriend(friendProxy.user_id, friendProxy.friendName, (error: boolean, message: string) => {
        if (error) {
            res.status(500).json({ status: 'User doesn’t exist ' + error });
        } else {
            res.status(200).json({ status: message });
        }
    });
});

export { friendsRouter };