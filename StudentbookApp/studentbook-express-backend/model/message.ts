import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToMessages from './message-mapper';
import { Message } from '../types/index_studentbook';
import { connectionPool } from '../database';
import { getFriends, getLoggedInUser } from './user';

//vereisten van get messages in query!!! (laatste 5, public messages, ...) (niet: m.messageId AS message_id) (author met subquery)
const getMessages = async (onResult: (error:Error, messages: Message[]) => void) => { //de messages: Message[] array gaat opgevult worden wnr we effectief data bevatten
    const query = 'SELECT m.messageId AS message_id, m.author AS message_author, m.tekst AS message_tekst, m.dateSent AS message_dateSent, m.type AS message_type FROM message AS m WHERE m.type = "public" ORDER BY m.messageId DESC LIMIT 5';

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToLecturers(rows));
     *  })().catch((err) => onResult(err));
     */
    
    try {
        const [rows] = await connectionPool.query(query); //query meegeven -- await = wachten
        onResult(null, mapToMessages(<RowDataPacket[]>rows)); //promise = object met 2 mogelijke uitkomsten gelukt of gefaald, bij gelukt gaan ze verder (async call) -- data returnen hier
    } catch (error) {
        onResult(error, null); //error returnen
    }
}

const addMessage = async ( //=publishMessage
    message: Message, //of chat hier?
    onResult: (error: Error, addedMessageId: number) => void
) => {
    const messageInsert = 'INSERT INTO message (author, tekst, dateSent, type) VALUES (?, ?, ?, ?)'; //!!! alle values meegeven! (kan geen lege waardes inserten => drm zei hij default values) (id is auto increment dus deze hoeft niet)
    const dateSent = new Date(Date.now())

    const connection = await connectionPool.getConnection();

    // Multiple queries are involved, so we execute them in a transaction to assure they will only get commited
    // when all queries were succesful. Otherwise, all queries need to be rolled back.
    await connection.beginTransaction();

    try {
        const [result] = await connection.execute(messageInsert, [message.author, message.tekst, dateSent, message.type] );
        const addedMessageId = (<ResultSetHeader>result).insertId;
        //const today = (<ResultSetHeader>result).insertDate;

        await connection.commit();
        onResult(null, addedMessageId);
    } catch (error) {
        await connection.rollback();
        onResult(error, null);
    } finally {
        await connection.release();
    }
};

const getFriendsMessages = async (userId : number, onResult: (error:Error, messages: Message[]) => void) => {
    const query = 'SELECT m.author AS message_author, m.tekst AS message_tekst, m.dateSent AS message_dateSent, m.type AS message_type FROM message m WHERE m.author in (SELECT u.name as user_name FROM user u WHERE u.id IN (SELECT user_id1 FROM friends WHERE user_id2 = ?) OR u.id IN (SELECT user_id2 FROM friends where user_id1 = ?)) AND m.type="public" ORDER BY m.dateSent DESC LIMIT 5';
    try {
        const [rows] = await connectionPool.execute(query, [userId, userId]);
        onResult(null, mapToMessages(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

export { getMessages, addMessage , getFriendsMessages};