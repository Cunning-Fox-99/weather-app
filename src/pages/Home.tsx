import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import {User} from "../types";

const Home: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://randomuser.me/api/?results=5');
            setUsers(prevUsers => [...prevUsers, ...response.data.results]); // Добавляем в конец списка
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const saveUser = (user: User) => {
        const savedUsers = JSON.parse(localStorage.getItem('savedUsers') || '[]');
        localStorage.setItem('savedUsers', JSON.stringify([...savedUsers, user]));
        alert('User saved!');
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="wrapper">
            <h1>Random Users</h1>
            <div className="card-grid">
                {users.map((user, index) => (
                    <UserCard key={index} user={user} onSave={saveUser}/>
                ))}
            </div>
            <button className="button" onClick={fetchUsers}>Load More Users</button>
        </div>
    );
};

export default Home;
