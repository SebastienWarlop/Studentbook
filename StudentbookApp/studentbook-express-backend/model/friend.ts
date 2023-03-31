import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToFriends from './friend-mapper';
import { User } from '../types/index_studentbook';
import { connectionPool } from '../database';
import internal from 'stream';
import mapToUsers from './user-mapper';

const addFriend = async ( 
    user_id: number, friedName: string, onResult: (error: boolean, message: string) => void
) => {
    const findUser = 'SELECT name as user_name, status as user_status, id as user_id FROM user WHERE id = ?';

    const findFriendId = 'SELECT id, name, status from user WHERE name = ?';
    

    const [theUser] = await connectionPool.execute(findUser, [user_id]);
   
    const [theFriend] = await connectionPool.execute(findFriendId, [friedName]);
    

    

    

    if (theUser[0] != undefined && theFriend[0] != undefined) {
        //const  - query to test if friend connecion is unique (select van id's hierboven - als select iets terugvindt -> al vrienden! (error gooien))
        //const existingFriend = 

        
        try {
            const query = 'INSERT INTO studentbook.friends (user_id1, user_id2) VALUES (?, ?)'
            const [row] = await connectionPool.execute(query, [user_id, theFriend[0].id]);
            
            var friend = mapToUsers(<RowDataPacket[]>theFriend)[0];
            onResult(null, theFriend[0].name + " " + theFriend[0].status);

        } catch (error) {
            onResult(error, "error")
        }

    } else {
        onResult(true, "The users don't exist");
    }
};

//METHODE DUBBEL - zie user.ts
// const getFriends = async ( user_id: number, onResult: (error:Error, users: User[]) => void) => { //parameter user_id meegeven om die zijn vrienden te vinden 
//     const query = 'SELECT f.user_id AS user_id, f.friend_id AS friend_id FROM friends WHERE f.user_id = ?'

//     try {
//         const [rows] = await connectionPool.query(query, [user_id]); //geef user_id mee met query
//         //onResult(null, mapToFriends(<RowDataPacket[]>rows));
//     } catch (error) {
//         onResult(error, null); //error returnen
//     }
// }

export { addFriend };