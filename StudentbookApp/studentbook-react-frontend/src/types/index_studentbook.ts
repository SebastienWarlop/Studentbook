export interface User {
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

export interface StatusMessage {
    message: string;
    type: 'error' | 'success';
}

export interface Response { //weg? fout?
    status: 'error' | 'success';
    friend_id?: number;
    errorMessage?: string;
}

export interface FriendProxy { //dit object gebruiken om de addfriend methode af te handelen met een string(naam) te kunen ingeven - zonder friends tabel nieuwe naam tabel te moeten hebben
    user_id: number;
    friendName: string; //krijgen van request
}