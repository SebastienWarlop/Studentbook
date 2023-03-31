//Studentbook
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MessageOverview from './components/message-overview';
import UserStatus from './components/user-status';
import UserFriends from './components/user-friends';
import MessageAdd from './components/message-add';
import FriendAdd from './friend-add';
import UserLogin from './components/user-login';

function App() { //kern vd react applicatie die hier wordt gebootstrapt
    if(sessionStorage.getItem("username") == "0" || sessionStorage.getItem("username") == null) {
        return (
            <>
                <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
                    <a
                        className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none"
                        href="/"
                    >
                        Studentbook
                    </a>
                </header>
                <Routes>
                    <Route path="/" element={<UserLogin />} />
                </Routes>
            </>
        )
    } else {
        return (
            <>
                <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
                    <a
                        className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none"
                        href="/"
                    >
                        Studentbook
                    </a>
                </header>
                <main className="container mt-5">
                    <div className="main-item">
                        <h3>Messages</h3>
                        <Routes>
                            <Route path="/" element={<MessageOverview />} />
                            <Route path="/messages" element={<MessageOverview />} />
                            
                        </Routes>
                    </div>
                    <div className="sidebar1">
                        <Routes>
                            <Route path="/" element={<UserStatus />} />
                        </Routes>
                    </div>
                    <div className="sidebar2">
                        <h4>Publish message</h4>
                        <Routes>
                            <Route path="/" element={<MessageAdd />} />
                        </Routes>
                    </div>
                    <div className="sidebar3">
                        <h4>Friends</h4>
                        <div>
                            <Routes>
                                <Route path='/' element={<FriendAdd/>} />
                            </Routes>
                        </div>
                        <Routes>
                            <Route path='/' element={<UserFriends/>} />
                        </Routes>
                    </div>
                </main>
            </>
        );
    }
}

export default App;
