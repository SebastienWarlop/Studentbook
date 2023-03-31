import { AxiosResponse } from 'axios';
import React, { useState, useEffect } from 'react';
import { Message, StatusMessage } from '../../types/index_studentbook';
import MessageOverviewTable from '../message-overview';
import StudentbookService from '../../services/StudentbookService';
import classNames from 'classnames';
import useInterval from 'use-interval';
import { relative } from 'path';
import { text } from 'stream/consumers';

const MesssageAdd: React.FC = () => {
    //const [authorInput, setAuthorInput] = useState<string>(''); -> author wordt meegegeven vanuit session na login
    const [textInput, setTextInput] = useState<string>('');
    //const [typeInput, setTypeInput] = useState<string>(''); Type is weggevallen!
    //other input types from message object are generated (id & dateSent)
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]); //for error or success message

    /*useInterval(() => { //polling - 37' react opname 3 
        //getAllMessages(); 
    }, 5000) */


    const addMessage = async (messageInput: Message) => {
        try {
            await StudentbookService.addMessage(messageInput);  
            setStatusMessages([
                { message: `Message successfully published.`, type: 'success' },
            ]);
            setTextInput('');
            //setTypeInput('');
        } catch (error: any) {
            setStatusMessages([
                ...statusMessages,
                { message: error.response.data.errorMessage, type: 'error' },
            ]);
        }
    };
    
    const handleSubmit = (event: any) => { //wnr je op submit duwt
        event.preventDefault(); //= browser gaat automatisch pagina herladen bij form submit, dit prevent dat - want wij willen dit met react afhandelen
        console.log(textInput.trim().length);
        if (textInput.trim() === '') {
            setStatusMessages([{ message: 'Please fill in the text.', type: 'error' }]);
            
        } else if (textInput.trim().length > 256) { //error?
            setStatusMessages([{ message: 'Maximum length of a message is 256 characters.', type: 'error' }]);
        } else {
            //Name van logged in User opvragen en meegeven - zie slide 14 react ppt
            const item = sessionStorage.getItem('username');
            const authorLoggedInUser = item ? JSON.parse(item) : null;

            const messageInput = { messageId: -1, author: authorLoggedInUser, tekst: textInput, dateSent: new Date(), type: 'public' }; //id is ok - author niet
            addMessage(messageInput);
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
                <form onSubmit={handleSubmit} style={{ top: 0 }}>
                    {/* <label>
                        Author:
                        <input
                            className="m-sm-2"
                            type="text"
                            value={authorInput}
                            onChange={(event) => setAuthorInput(event.target.value)}
                        />
                    </label> */}
                    <label>
                        Text:
                        <textarea className="m-sm-2" value={textInput} onChange={(event) => setTextInput(event.target.value)}/>
                    </label>
                    {/* <label> Type hoeft niet meer, altijd public!
                        Type:
                        <input
                            className="m-sm-2"
                            type="text"
                            value={typeInput}
                            onChange={(event) => setTypeInput(event.target.value)}
                        />
                    </label> */}
                    <input type="submit" value="Publish" />
                </form>
            </div>
            <div className="w-100 d-none d-md-block" />
        </section>
    );
}

export default MesssageAdd;