/**
 * @swagger
 *   components:
 *    schemas:
 *      message:
 *          type: object
 *          properties:
 *            author:
 *              type: string
 *              description: Author of the message.
 *            tekst:
 *              type: string
 *            dateSent:
 *              type: string
 *              format: date
 *              description: Date of the message send.
 *            type:
 *              type: string
 *      MessageInput:    
 *          type: object
 *          properties:
 *            author:
 *              type: string
 *              description: Author of the message.
 *            tekst:
 *              type: string
 *              description: Message's text.
 *            type:
 *              type: string
 *              description: type of the message (Public/Private)
 */

import express, { Request, Response, Handler } from 'express';
import * as messageModel from '../model/message';
import { Message, User } from '../types/index_studentbook';

const messageRouter = express.Router();

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get a list of the last 5 public messages
 *     responses:
 *       200:
 *         description: A list of messsages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 */

//get a list of all messages
messageRouter.get("/", (req: Request, res:Response) => { //controller -> deze methode gaat model oproepen om message array op te halen
    messageModel.getMessages((error:Error, messages:Message[]) => {
        if (error) {
            res.status(500).json({ status: "error", message: error.message })
        } else { //200 response => succesvol http-request
            res.status(200).json(messages);
        }
    })
})


/**
 * @swagger
 * /messages:
 *   post:
 *      summary: Add a message
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MessageInput'
 *      responses:
 *         200:
 *            description: The text of the new message
 *            content:
 *              application/json:
 *                schema:
 *                  type: text
 *                  description: Text of the Message (of nr id zetten?)
 */
 messageRouter.post('/', (req: Request, res: Response) => {
    const message = <Message>req.body;
    messageModel.addMessage(message, (error: Error, messageId: number) => {
        if (error) {
            res.status(500).json({ status: 'error', errorMessage: error.message })
        } else {
            res.status(200).json({ status: 'success', messageId });
        }
    });
});

/**
 * @swagger
 * /messages/friends:
 *   get:
 *     summary: Get a list of the last 5 public messages from your friends
 *     responses:
 *       200:
 *         description: A list of messsages.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/message'
 *     parameters:
 *     - in: query
 *       name: userid
 *       schema:
 *         type: integer
 *       description: userid
 */
//get a list friends messages
messageRouter.get("/friends", (req: Request, res:Response) => { 
    const userID = <number><unknown>req.query.userid;
    messageModel.getFriendsMessages(userID,(error:Error, messages:Message[]) => {
        if (error) {
            res.status(500).json({ status: "error", message: error.message })
        } else { 
            res.status(200).json(messages);
        }
    });
});

export { messageRouter };