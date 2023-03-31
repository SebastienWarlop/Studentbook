import { AxiosResponse } from 'axios';
import exp from 'constants';
import React, { useState, useEffect } from 'react';
import useInterval from 'use-interval';
//import LecturerService from '../../services/LecturerService';
//import { Lecturer } from '../../types';
//import CoursesOverviewTable from './CoursesOverviewTable';
//import LecturersOverviewTable from './LecturersOverviewTable';
import StudentbookService from '../../services/StudentbookService';
import { Message } from '../../types/index_studentbook';
import MessageOverviewtable from '../message-overview/MessagesOverviewTable';

const MessageOverview: React.FC = () => {
    const [messages, setMesssages] = useState<Array<Message>>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);


    useEffect(() => { //side effect - voer functie uit als waarde in array verandert (in dit geval altijd uitgevoerd na elke render functie)
        getMessages();
    }, []);

    useInterval(() => { 
        getMessages();
    }, 5000) 


    const getMessages = async () => {
        const res: AxiosResponse<Array<Message>> = await StudentbookService.getAllMessages(); //gaat service oproepen met getAllMessages() methode
        setMesssages(res.data); //set van de state meegeven hierboven
    };

    return (
        <section className="row justify-content-center">
            {messages.length ? 
                <MessageOverviewtable
                    messages={messages}
                />
             : <p>Your friends have been quiet lately…</p> }
        </section>
    );
};

export default MessageOverview;
