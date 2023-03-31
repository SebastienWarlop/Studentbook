import classNames from "classnames";
import React, { useState, useEffect } from 'react';
import StudentbookService from "../../services/StudentbookService";
import { StatusMessage, User } from "../../types/index_studentbook";

const UserStatus: React.FC = () => {
    var [idInput, setIdInput] = useState<number>();
    const [statusInput, setStatusInput] = useState<string>('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const updateStatus = async (userInput: User) => {
        try {
            await StudentbookService.updateStatus(userInput);
            setStatusMessages([
                {message: statusInput+' is new status', type: 'success'},
            ]);
            setStatusInput('');
            const item = sessionStorage.getItem("username");
            const nameInput = item ? JSON.parse(item) : null;
            const userstatus = await (await StudentbookService.getStatus(nameInput)).data; 
            sessionStorage.setItem("userstatus", JSON.stringify(userstatus));
            setTimeout(function(){ // 2 seconden wachten na succesvolle login zodat statusmessage gelezen kan worden
                window.location.reload();
            }, 1500);
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: error.response.data.errorMessage, type: 'error' },
            ]);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault(); 
        if(statusInput.trim() === '') {
            setStatusMessages([{message: 'Please fill in status.', type:'error'}]);
        } else {
            const item = sessionStorage.getItem('username');
            const username = item ? JSON.parse(item) : null;
            const userInput = {name: username, id: 0, status: statusInput, friends: [], messages: [], loggedIn: true}; // probleem met userid? 
            updateStatus(userInput);
        }
    };

    const getActualStatus = (event: any) => {
        const item = sessionStorage.getItem('userstatus');
        const userstatus = item ? JSON.parse(item) : null;
        if(userstatus == null) {
            setStatusInput("Online");
            handleSubmit;
            
        };
        return(
            <div>{userstatus}</div>
        )
    }

    const item = sessionStorage.getItem('userstatus');
    const userstatus = item ? JSON.parse(item).user_status : null;
    const actualStatus = userstatus;

    return (
        <section className="row justify-content-center">
            <h4>My status: {actualStatus}</h4>
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
                        Status: 
                        <input
                            className="m-sm-2"
                            type="text"
                            value={statusInput}
                            onChange={(event) => setStatusInput(event.target.value)} 
                            maxLength={30}
                        />
                    </label>
                    <input type="submit" value="Change" />
                </form>
            </div>
        </section>
    );
};

export default UserStatus;