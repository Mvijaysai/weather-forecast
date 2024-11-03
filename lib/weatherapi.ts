import axios from 'axios';
import {toast, ToastContainer } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";



const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
// const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=56`;

export interface WeatherData {
  date: string;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

export async function getWeatherByCity(city: string): Promise<WeatherData[]> {

const BASE_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=56`;
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // for temperature in Celsius
      },
    });

    const data = response.data.list;
    const groupedByDate = data.reduce((acc: any, entry: any) => {
      const date = entry.dt_txt.split(' ')[0]; 
      if (!acc[date]) {
        acc[date] = entry;
      }
      return acc;
    }, {});

    return Object.keys(groupedByDate).map(date => {
      const entry = groupedByDate[date];
      return {
        date,
        tempMin: entry.main.temp_min,
        tempMax: entry.main.temp_max,
        pressure: entry.main.pressure,
        humidity: entry.main.humidity,
      };
    });
  } catch (error) {
    toast.warning("Danger");
    return[] 
  }
}
