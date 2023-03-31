import React, { useState } from 'react';
import { Message } from '../../types/index_studentbook';

type Props = {
    messages: Array<Message>;
};

const messagesOverviewTable: React.FC<Props> = ({ messages }: Props) => { //messages restructuren nr props
    return (
        <div className="col-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Tekst</th>
                        <th scope="col">Date sent</th>
                    </tr>
                </thead>
                <tbody>
                    {messages &&
                        messages.map((message, index) => ( //we mappen het message object nr een rij in html -> map: functie die als return waarde hieronder geeft
                            <tr key={index}>
                                <td>{message.author}</td>
                                <td>{message.tekst}</td>
                                <td>{new Date(message.dateSent).toLocaleDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default messagesOverviewTable;
