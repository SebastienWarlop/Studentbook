import { RowDataPacket } from 'mysql2'; //JSON omzetten
import { Message } from '../types/index_studentbook'; //chat & users niet?

const mapToMessages = (rows: RowDataPacket[]): Message[] => {
    const result: Message[] = [];

    rows.forEach(
        ({ 
            //message_messageId, //messageId tabelnaam in DB!!
            message_author,
            message_tekst,
            message_dateSent,
            message_type,
        }) => {
            const message: Message = {
                //messageId: message_messageId,
                messageId: undefined,
                author: message_author,
                tekst: message_tekst,
                dateSent: message_dateSent,
                type: message_type,
            };

            result.push(message);

        
        }   
    );

    return result;
}

export default mapToMessages; //exporteer default functie mapToMessages