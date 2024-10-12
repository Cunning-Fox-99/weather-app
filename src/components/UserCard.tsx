import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import {User, Weather} from "../types";

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

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle style={{ textAlign: 'center', backgroundColor: '#2196F3', color: '#fff' }}>Weather Details</DialogTitle>
                <DialogContent>
                    {weather ? (
                        <div>
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Current Temperature: {weather.current_temperature}°C
                            </Typography>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>Hourly Forecast:</Typography>
                            <List>
                                {weather.hourly.time.slice(0, 6).map((time, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            secondary={`${weather.hourly.temperature_2m[index]}°C`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserCard;
