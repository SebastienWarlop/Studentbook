import { RowDataPacket } from 'mysql2'; //JSON omzetten
import { userInfo } from 'os';
import { Message, Chat, User } from '../types/index_studentbook';

const mapToUsers = (rows: RowDataPacket[]): User[] => {
    const result: User[] = [];

    rows.forEach
        (({ 
            //user_id,
            user_name,
            user_status,
            user_loggedIn,
        }) => {
        const user:User = {
            //id: user_id,
            id: undefined,
            name: user_name,
            status: user_status,
            loggedIn: user_loggedIn,
            friends: [],
            messages: []
        };

           result.push(user);
    })

    return result;
}



export default mapToUsers; //exporteer default functie mapToMessages