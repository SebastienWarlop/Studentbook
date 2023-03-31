import exp from "constants";
import internal from "stream";

export interface User { //beschrijving objecten
    id: number;
    name: string;
    status: string;
    friends: Array<User> | null;
    messages: Array<Message> | null;
    loggedIn: boolean;
}

export interface Message {
    messageId: number;
    author: string;
    tekst: string;
    dateSent: Date;
    type: string;
}

export interface Chat {
    users: Array<User> | null;
    messages: Array<Message> | null;
}

export interface Friend {
    user_id: number;
    friend_id: number;
}

export interface FriendProxy { //dit object gebruiken om de addfriend methode af te handelen met een string(naam) te kunen ingeven - zonder friends tabel nieuwe naam tabel te moeten hebben
    user_id: number;
    friendName: string; //krijgen van request
}