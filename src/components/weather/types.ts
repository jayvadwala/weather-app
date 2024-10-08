export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  export interface WeatherData {
    weather: Weather[];
    main: Main;
    wind: Wind;
    clouds: { all: number };
    visibility: number;
    dt: number;
    name: string;
    sys: { country: string };
  }
  