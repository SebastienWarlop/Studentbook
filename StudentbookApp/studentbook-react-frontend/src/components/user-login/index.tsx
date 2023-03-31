import React, { useState, useEffect } from 'react';
import StudentbookService from '../../services/StudentbookService';
import {User, StatusMessage} from '../../types/index_studentbook';
import classNames from 'classnames';
import App from '../../App';

const UserLogin: React.FC = () => {
    //nog id
    const [nameInput, setNameInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const logIn = async (userInput: User) => {
        try {
            await StudentbookService.logIn(userInput);
            setStatusMessages([
                {message: nameInput +' succesfully logged in.', type: 'success'},
            ]);
            setNameInput('');
            sessionStorage.setItem("username", JSON.stringify(nameInput)); //username doorspelen
            setTimeout(function(){ // 2 seconden wachten na succesvolle login zodat statusmessage gelezen kan worden
                window.location.reload();
            }, 1500);
            const userid = await (await StudentbookService.getID(nameInput)).data; // user id van de ingelogde gebruiker ophalen en in de sessionstorage steken
            sessionStorage.setItem("userid", JSON.stringify(userid));
            const userstatus = await (await StudentbookService.getStatus(nameInput)).data; 
            sessionStorage.setItem("userstatus", JSON.stringify(userstatus));
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: 'No user found!', type: 'error' },
            ]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault(); 
        if(nameInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in name.', type: 'error' }]);
        } else {
            const userInput = {name: nameInput, id: 0, status: 'offline', friends: [], messages: [], loggedIn: true}; 
            logIn(userInput);
        }
    };

    return (
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
                    <h4>Log in</h4>
                    <label>
                        Username:
                        <input
                            className="m-sm-2"
                            type="text"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                        />
                    </label>
                    <input type="submit" value="Log in" onClick={App}/>
                </form>
            </div>
        </section>
    );
};

export default UserLogin;