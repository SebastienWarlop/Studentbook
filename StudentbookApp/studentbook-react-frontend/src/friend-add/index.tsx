import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import StudentbookService from '../services/StudentbookService';
import { User, Message, Response, StatusMessage, Friend, FriendProxy } from '../types/index_studentbook';
import FriendsTable from '../components/user-friends';
import classNames from 'classnames';
import useInterval from 'use-interval';

const FriendAdd: React.FC = () => {
    //const [allFriends, setAllFriends] = useState<User[]>([]) //user[] ipv Friend[]?
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const addFriend = async (friendInput: FriendProxy) => { //FriendProxy type => je gaat enkel eigen userid & name van friend meegeven!
        try {
            await StudentbookService.addFriend(friendInput);
            setStatusMessages([
                { message: `User ${nameInput} successfully added.`, type: 'success' },
            ]);
            setNameInput('');
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: error.response.data.errorMessage, type: 'error' },
            ]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (nameInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in name.', type: 'error' }]); //OK
        } else {
            console.log('hier raken we react')
            //const friendInput = { id: 1, name: nameInput, status: 'online', friends: [], messages: [], loggedIn: true } //NIET user gaan meegeven - wel friendProxy object -> dit is wat express addFriend functie gebruikt!
            
            //userid ingelogde gebruiker uit session halen
            const item = sessionStorage.getItem('userid');
            const userid = item ? JSON.parse(item).user_id : null;

            const friendInput = { user_id: userid, friendName: nameInput }
            console.log('hier raken we niet?');
            addFriend(friendInput);
        }
    };

    return ( //dit is de render functie
        <section className="row justify-content-center">
            {statusMessages && (
                <ul className="list-unstyled col-4 mb-3">
                    {statusMessages.map(({ message, type }, index) => (
                        <li
                            key={index}
                            className={classNames({
                                'text-danger': type === 'error',
                                'text-success': type === 'success',
                            })}
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            )}
            <div className="w-100 d-none d-md-block" />
            <div className="col-4 mb-3">
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            className="m-sm-2"
                            type="text"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
            <div className="w-100 d-none d-md-block" />
        </section>
    );
};

export default FriendAdd;
