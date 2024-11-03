import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { getWeatherByCity, WeatherData } from '../lib/weatherapi';
import WeatherTable from '../components/weathertable';

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [city, setCity] = useState('visakhapatnam');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setLoading(false);
    }
    fetchWeather();
  }, [city]);
  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCity(city);

  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', marginRight: '2px' }}>
        <h1 style={{ width: '50%' }}>Weather In your City</h1>
        <div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button style={
            { margin: '2px' }
          } onSubmit={(e) => handleSubmitSearch}>
            <IoSearch />
          </button>
        </div>
      </div>

      <WeatherTable weatherData={weatherData} loading={loading} />
    </div>
  );
};

export default Home;
