import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CitySelect from './components/CitySelect';
import WeatherDetails from './components/weather/WeatherDetails';
import ForecastTable from './components/forecast/ForecastTable';
import { WeatherData } from './components/weather/types';
import { ForecastData } from './components/forecast/types';

const API_KEY = process.env.REACT_APP_API_KEY;

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [showForecast, setShowForecast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = async (cityId: string) => {
    setLoading(true);
    setError('');
    try {
      const weatherResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}&units=metric`
      );
      setForecastData(forecastResponse.data);
    } catch (error) {
      setError('Unable to fetch data. Please try again later.');
    }
    setLoading(false);
  };

  const handleCitySelect = (cityId: string) => {
    setShowForecast(false);
    setWeatherData(null);
    setForecastData(null);
    fetchWeatherData(cityId);
  };

  return (
    <AppContainer>
      <Title>Weather App</Title>
      <CitySelect onSelectCity={handleCitySelect} />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              {weatherData ? (
                <>
                  <WeatherDetails weatherData={weatherData} />
                  {!showForecast ? (
                    <Button onClick={() => setShowForecast(true)}>See Forecast</Button>
                  ) : (
                    <>
                      <Button onClick={() => setShowForecast(false)}>Close</Button>
                      {forecastData && <ForecastTable forecastData={forecastData} />}
                    </>
                  )}
                </>
              ) : (
                <p>Please select a city to see the forecast.</p>
              )}
            </>
          )}
        </>
      )}
    </AppContainer>
  );
};

export default App;
