export interface User {
    name: { first: string; last: string };
    gender: string;
    picture: { large: string };
    location: {
        city: string;
        country: string;
        coordinates: { latitude: string; longitude: string };
    };
    email: string;
}

interface HourlyWeather {
    temperature_2m: number[];
    time: string[];
}

export interface Weather {
    current_temperature: number;
    hourly: HourlyWeather;
}