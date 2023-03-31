import axios from '../axios';
import { FriendProxy, Message, User } from '../types/index_studentbook';

const item = sessionStorage.getItem('userid');
const userid = item ? JSON.parse(item).user_id : null;

const getAllMessages = () => axios.get<Array<Message>>('/messages/friends?userid='+userid); //via axios get request uitvoeren

const addMessage = (message: Message) => axios.post<Response>('/messages', message);

const logIn = (user: User) => axios.post<Response>('/user/login', user);

const updateStatus = (user: User) => axios.put<Response>('/user/status', user);

const getFriends = () => axios.get<Array<User>>('/user/friends?userid='+userid);

const addFriend = (friend: FriendProxy) => axios.post<Response>('/friends', friend);

const getID = (username: String) => axios.get('/user/id?username='+username);

const getStatus = (username: String) => axios.get('/user/status?username='+username);

const StudentbookService = { //StudentbookService ?
    getAllMessages,
    addMessage,
    logIn,
    updateStatus,
    getFriends,
    addFriend,
    getID,
    getStatus,
};

export default StudentbookService;
