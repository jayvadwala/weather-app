// src/components/forecast/types.ts
import { Main, Weather, Wind } from '../weather/types';

export interface ForecastEntry {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: { all: number };
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: { "3h": number };
  dt_txt: string;
}

export interface ForecastData {
  list: ForecastEntry[];
  city: {
    id: number;
    name: string;
    country: string;
  };
}
