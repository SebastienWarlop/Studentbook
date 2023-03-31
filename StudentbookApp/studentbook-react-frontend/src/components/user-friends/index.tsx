import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import useInterval from 'use-interval';
import StudentbookService from '../../services/StudentbookService';
import { User } from '../../types/index_studentbook';
import FriendsTable from './FriendsTable';

const UserFriends: React.FC = () => {
    const [friends, setfriends] = useState<Array<User>>([]);

    useEffect(() => {
        getFriends();
    }, []); 

    useInterval(() => { 
        getFriends();
    }, 5000) 

    const getFriends = async () => {
        const res: AxiosResponse<Array<User>> = await StudentbookService.getFriends(); 
        setfriends(res.data); 
    };

    return (
        <section className="row justify-content-center">
            {friends.length ? <FriendsTable
                friends={friends}
            /> : <p>No friends added yet</p>}
            
        </section>
    );
}

export default UserFriends; 