import React from 'react';
import { WeatherData } from '../lib/weatherapi';
import styles from './WeatherTable.module.css';

interface WeatherTableProps {
  weatherData: WeatherData[];
    loading: boolean;
}

const WeatherTable: React.FC<WeatherTableProps> = ({ weatherData , loading  }) => {
  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }
  return (
    <div className={styles.tableContainer}>
      {weatherData.map((data, index) => (
        <div key={index} className={styles.weatherCard}>
          <div className={styles.date}>Date: {data.date}</div>
          <div className={styles.tempSection}>
            <span>Temperature</span>
            <div className={styles.tempRow}>
              <div>Min</div>
              <div>Max</div>
            </div>
            <div className={styles.tempRow}>
              <div>{data.tempMin.toFixed(2)}°C</div>
              <div>{data.tempMax.toFixed(2)}°C</div>
            </div>
          </div>
          <div className={styles.infoRow}>
            <span>Pressure</span>
            <span>{data.pressure} hPa</span>
          </div>
          <div className={styles.infoRow}>
            <span>Humidity</span>
            <span>{data.humidity}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherTable;
