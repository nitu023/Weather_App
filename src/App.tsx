
import React from 'react';
import './App.css';
import WeatherApp from './components/WeatherApp';

const App: React.FC = () => {
  return (
    <div className="App"  data-testid="weather-app">
      <h1>Weather Forecast App</h1>
      <WeatherApp />
    </div>
  );
};

export default App;

