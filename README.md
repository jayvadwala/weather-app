# Weather App

This is a simple weather forecasting app built using React and TypeScript. It allows users to select a city from a dropdown and displays the current weather and a 5-day forecast. The weather data is fetched from the OpenWeather API.

## Features
- Select a city to view the current weather.
- Display weather information such as temperature, wind speed, and weather description.
- Click on "See Forecast" to view the 5-day weather forecast in a table format.
- Date selector allows you to toggle between different forecast days.
- Forecast table displays weather details with formatted date and time.

## Technologies Used
- **React**: Frontend library for building the user interface.
- **TypeScript**: For static type-checking.
- **Styled-components**: For writing CSS-in-JS styles.
- **Axios**: To handle HTTP requests to the OpenWeather API.

## Prerequisites
Before running the app, ensure you have the following installed on your system:
- **Node.js** (version >= 14.x.x)
- **npm** (version >= 6.x.x) or **yarn**

## Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
```

### 2. Navigate the project directory:
cd weather-app
npm install

### 3. Set up environment variabes
Create .env file at root level and copy the below code:
`REACT_APP_API_KEY=your_openweather_api_key`

### 4. Running the App:
npm start

### 5. Project Structure:
weather-app/
│
├── public/                  # Public assets like index.html
├── src/                     # Source files
│   ├── components/          # React components
│   │   ├── CitySelect.tsx   # City selection dropdown
│   │   ├── WeatherDetails.tsx # Displays current weather details
│   │   ├── ForecastTable.tsx  # Displays the forecast table for the selected date
│   ├── types/               # TypeScript types for weather and forecast data
│   ├── App.tsx              # Main App component
│   ├── index.tsx            # App entry point
│   ├── styles/              # Global and component styles using styled-components
├── .env                     # API key configuration
└── README.md                # App documentation
