// src/components/weather/WeatherDetails.tsx
import React from 'react';
import styled from 'styled-components';
import { WeatherData } from './types';

interface WeatherDetailsProps {
  weatherData: WeatherData;
}

const WeatherContainer = styled.div`
  margin-top: 20px;
`;

const WeatherMain = styled.h3`
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const WeatherDescription = styled.p`
  font-size: small;
  margin-top: 0;
`;

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData }) => {
  const { weather, main, wind } = weatherData;

  return (
    <WeatherContainer>
      <WeatherMain>{weather[0].main}</WeatherMain>
      <WeatherDescription>{weather[0].description}</WeatherDescription>
      <p>{main.temp} °C</p>
      <p>Wind: {wind.speed} m/sec</p>
    </WeatherContainer>
  );
};

export default WeatherDetails;
