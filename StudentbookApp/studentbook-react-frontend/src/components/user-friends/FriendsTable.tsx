import React, {useState} from 'react'; 
import { User } from '../../types/index_studentbook';

type Props = {
    friends: Array<User>; 
}; 

const friendsTable: React.FC<Props> = ({friends }: Props) => {
    return (
        <div className="col-8">
            <table className="table table-striped">
                <tbody>
                    {friends &&
                        friends.map((friend, index) => ( //we mappen het message object nr een rij in html -> map: functie die als return waarde hieronder geeft
                            <tr key={index}>
                                <td>{friend.name}</td>
                                <td>{friend.status}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default friendsTable;