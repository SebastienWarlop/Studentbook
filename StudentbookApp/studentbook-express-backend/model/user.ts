import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import mapToUsers from './user-mapper';
import { User } from '../types/index_studentbook';
import { connectionPool } from '../database';
import internal from 'stream';
import { error } from 'console';

const getUsers = async (onResult: (error: Error, users: User[]) => void) => {
    const query = `SELECT u.id as user_id, u.name as user_name, u.status as user_status, u.loggedIn as user_loggedIn FROM user u`;

    /**
     * You can avoid a try/catch block by wrapping the logic into an IIFE (immediately invoked function expression):
     *  (async () => {
     *      const rows = await connectionPool.query(query);
     *      onResult(null, mapToLecturers(rows));
     *  })().catch((err) => onResult(err));
     */
    try {
        const [rows] = await connectionPool.query(query); //query meegeven -- await = wachten
        onResult(null, mapToUsers(<RowDataPacket[]>rows)); //promise = object met 2 mogelijke uitkomsten gelukt of gefaald, bij gelukt gaan ze verder (async call) -- data returnen hier
    } catch (error) {
        onResult(error, null); //error returnen
    }
};



const getUser = async (
    userName : string, 
    onResult: (error: boolean, userName: string) => void
) => {
    const query = `SELECT u.id as user_id, u.name as user_name, u.status as user_status, u.loggedIn as user_loggedIn FROM user u WHERE u.name = ?`; 
    try {
        const [row] = await connectionPool.execute(query, [userName]); 
        if(Array.isArray(row) && row.length !== 0) { // const row heeft geen .length property vanwege OkPacket (zie: https://stackoverflow.com/questions/55530602/property-length-does-not-exists-on-type-okpacket-in-mysql2-module)
            onResult(false, userName);
            const query = `UPDATE user SET user.loggedIn = 1 WHERE user.name = ?`;
            const loggedIn = await connectionPool.execute(query, [userName]);
        }
        else {
            throw new Error();
        }
    } catch (error: any) {
        onResult(true, null)
    }
};

const setStatus =async (
    userStatus : string,
    userName : string,
    onResult: (error: boolean, userStatus: string) => void
) => {
    const query = `UPDATE user SET user.status = ? WHERE user.name = ?`;
    try {
        const status = await connectionPool.execute(query, [userStatus, userName]);
        let tempResult: any = status; // kan niet loopen over const status vanwege OkPacket... -> gekopieerd naar nieuwe array
        if(tempResult[0].changedRows !== 0) {
            onResult(false, userStatus);
        }
        else {
            throw new Error();
        }
    } catch (error: any) {
        onResult(error, null)
    }
}; 

const getFriends =async (userId : number, onResult: (error: Error, users : User[]) => void) => {
    const query = `SELECT u.name as user_name, u.status as user_status FROM user u WHERE u.id IN (SELECT user_id1 FROM friends WHERE user_id2 = ?) OR u.id IN (SELECT user_id2 FROM friends where user_id1 = ?)`;
    try {
        const [rows] = await connectionPool.query(query, [userId, userId]);
        onResult(null, mapToUsers(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getLoggedInUser = async (onResult: (error: Error, user : User[]) => void) => {
    const query = `SELECT u.id as user_id, u.name as user_name, u.status as user_status, u.loggedIn as user_loggedIn FROM user u WHERE u.loggedIn = 1`;
    try {
        const [rows] = await connectionPool.query(query);
        onResult(null, mapToUsers(<RowDataPacket[]>rows));
    } catch (error) {
        onResult(error, null);
    }
};

const getID = async (userName: string, onResult: (error: Error, userid: string) => void) => {
    const query = `SELECT u.id as user_id FROM user u WHERE u.name = ?`;
    try {
        const rows = await connectionPool.query(query, [userName]);
        let tempResult: any = rows;
        const userid = tempResult[0][0];
        onResult(null, userid); 
    } catch (error) {
        onResult(error, null);
    }
};

const getStatus = async (userName: string, onResult: (error: Error, userid: string) => void) => {
    const query = `SELECT u.status as user_status FROM user u WHERE u.name = ?`;
    try {
        const rows = await connectionPool.query(query, [userName]);
        let tempResult: any = rows;
        const userstatus = tempResult[0][0];
        onResult(null, userstatus); 
    } catch (error) {
        onResult(error, null);
    }
};


export { getUsers , getUser , setStatus, getFriends, getLoggedInUser, getID, getStatus};