import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Weather } from '../types';

interface ModalWindowProps {
    open: boolean;
    onClose: () => void;
    weather: Weather | null;
}

const ModalWindow: React.FC<ModalWindowProps> = ({ open, onClose, weather }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle style={{ textAlign: 'center', backgroundColor: '#2196F3', color: '#fff' }}>
                Weather Details
            </DialogTitle>
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
                <Button onClick={onClose} color="secondary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalWindow;
