import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Weather } from "../types";
import ModalWindow from './ModalWindow';

interface UserCardProps {
    user: User;
    onSave?: (user: User) => void;
    isSaved?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSave, isSaved = false }) => {
    const [open, setOpen] = useState(false);
    const [weather, setWeather] = useState<Weather | null>(null);

    const { latitude, longitude } = user.location.coordinates;

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`
            );
            const { current_weather, hourly } = response.data;
            setWeather({
                current_temperature: current_weather.temperature,
                hourly,
            });
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 300000); // Обновление каждые 5 минут
        return () => clearInterval(interval); // Очистка интервала при размонтировании
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="card">
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} style={{ width: '100%' }} />
            <h3>{`${user.name.first} ${user.name.last}`}</h3>
            <p>Gender: {user.gender}</p>
            <p>Location: {user.location.city}, {user.location.country}</p>
            <p>Email: {user.email}</p>

            <div className="card__buttons-wrapper">
                {!isSaved && (
                    <button className="button mb-5" onClick={() => {
                        onSave?.(user);
                        localStorage.setItem(user.email, JSON.stringify(user)); // Сохранение пользователя в localStorage
                    }}>
                        Save User
                    </button>
                )}
                <button className="button" onClick={handleOpen}>
                    Show Weather
                </button>
            </div>

            <ModalWindow open={open} onClose={handleClose} weather={weather} />
        </div>
    );
};

export default UserCard;
