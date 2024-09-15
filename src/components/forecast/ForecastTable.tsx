import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ForecastData, ForecastEntry } from './types';

// Styled Components for the Table
const TableContainer = styled.div`
  margin: 20px auto;
  max-width: 900px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  background-color: #f4f4f4;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const TableData = styled.td`
  padding: 12px;
  font-size: 14px;
  text-align: center;
`;

const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const DateSelector = styled.select`
  margin-bottom: 20px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: block;
  margin: 0 auto 20px auto;
`;

const DayColumn = styled.td`
  padding: 12px;
  text-align: left;
`;

const Loader = styled.div`
  margin: 20px auto;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

// Helper function to format the date in the table as "Saturday, 15 Sep 12 AM"
const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',  // Saturday
    day: 'numeric',   // 15
    month: 'short',   // Sep
    hour: 'numeric',  // 12 AM
    hour12: true,
    timeZone: 'UTC',  // Ensure UTC time zone
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Helper function to format the date for the dropdown as "Sat Sep 15"
const formatDropDownDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',  // Sat, Sun, etc.
    month: 'short',    // Sep, Oct, etc.
    day: 'numeric',    // 15, 16, etc.
    timeZone: 'UTC'    // Ensure UTC format
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Helper function to format the temperature display as "High / Low"
const formatTemperature = (temp_min: number, temp_max: number) => {
  return `${Math.round(temp_max)}°C / ${Math.round(temp_min)}°C`;
};

const ForecastTable: React.FC<{ forecastData: ForecastData }> = ({ forecastData }) => {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<ForecastEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (forecastData) {
      setLoading(false);

      // Extract unique dates from the forecast data
      const uniqueDates: number[] = Array.from(
        new Set(
          forecastData.list.map((entry: ForecastEntry) =>
            new Date(entry.dt * 1000).setUTCHours(0, 0, 0, 0)
          )
        )
      );

      // Set the initial date to the first available date (UTC midnight)
      setSelectedDate(uniqueDates[0]);

      // Filter the data for the first available date
      setFilteredData(
        forecastData.list.filter((entry: ForecastEntry) =>
          new Date(entry.dt * 1000).setUTCHours(0, 0, 0, 0) === uniqueDates[0]
        )
      );
    } else {
      setError('Unable to fetch forecast data. Please try again later.');
      setLoading(false);
    }
  }, [forecastData]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = parseInt(e.target.value, 10);
    setSelectedDate(selected);

    // Filter the forecast data based on the selected date
    const filtered = forecastData.list.filter((entry: ForecastEntry) =>
      new Date(entry.dt * 1000).setUTCHours(0, 0, 0, 0) === selected
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <Loader>Loading forecast data...</Loader>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!forecastData) {
    return null;
  }

  // Extract unique dates for the dropdown (Unix timestamp converted to UTC midnight)
  const uniqueDates: number[] = Array.from(
    new Set(
      forecastData.list.map((entry: ForecastEntry) =>
        new Date(entry.dt * 1000).setUTCHours(0, 0, 0, 0)
      )
    )
  );

  return (
    <TableContainer>
      {/* Date selection dropdown */}
      <DateSelector value={selectedDate} onChange={handleDateChange}>
        {uniqueDates.map((timestamp) => (
          <option key={timestamp} value={timestamp}>
            {formatDropDownDate(timestamp / 1000)} {/* Convert back to seconds for display */}
          </option>
        ))}
      </DateSelector>

      {/* Forecast table */}
      <Table>
        <thead>
          <tr>
            <TableHeader>Time</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>High / Low</TableHeader>
            <TableHeader>Precipitation</TableHeader>
            <TableHeader>Wind</TableHeader>
            <TableHeader>Humidity</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry: ForecastEntry) => (
            <TableRow key={entry.dt}>
              <DayColumn>{formatDateTime(entry.dt)}</DayColumn>
              <TableData>
                <WeatherIcon
                  src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                  alt={entry.weather[0].description}
                />
                <br />
                {entry.weather[0].description}
              </TableData>
              <TableData>{formatTemperature(entry.main.temp_min, entry.main.temp_max)}</TableData>
              <TableData>{(entry.pop * 100).toFixed(0)}%</TableData>
              <TableData>{entry.wind.speed} m/sec</TableData>
              <TableData>{entry.main.humidity}%</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ForecastTable;
