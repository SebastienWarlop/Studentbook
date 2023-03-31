import { existsSync } from 'fs';
import { RowDataPacket } from 'mysql2';
import { exit } from 'process';
import { Friend } from '../types/index_studentbook';

const mapToFriends = (rows: RowDataPacket[]): Friend[] => {
    const result: Friend[] = [];

    rows.forEach(
        ({
        user_id,
        friend_id
        }) => {
            const friend: Friend = {
                user_id: user_id,
                friend_id: friend_id,
            };

            const existing = result.find((el) => el.user_id === user_id);
            if (!existing) {
                result.push(friend);
            }
        }
    );

    return result;
};

export default mapToFriends;