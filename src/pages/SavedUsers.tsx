import React, { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import {User} from "../types";

const SavedUsers: React.FC = () => {
    const [savedUsers, setSavedUsers] = useState<User[]>([]);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('savedUsers') || '[]');
        setSavedUsers(users);
    }, []);

    return (
        <div>
            <h1>Saved Users</h1>
            <div className="card-grid">
                {savedUsers.length > 0 ? (
                    savedUsers.map((user, index) => (
                        <UserCard key={index} user={user} isSaved /> // Передаем isSaved для скрытия кнопки
                    ))
                ) : (
                    <p>No saved users.</p>
                )}
            </div>
        </div>
    );
};

export default SavedUsers;
