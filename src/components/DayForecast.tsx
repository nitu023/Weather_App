import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import rainyDay from '../assets/rainyDay.png';
import cloudy from '../assets/cloudy.png';
import sun from '../assets/sun.png';

// Define the interface for each day's weather data
interface WeatherDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  icon: string;
}

// Define the props interface for the DayForecast component
interface DayForecastProps {
  weatherDataForcaste: WeatherDay[]; // Array of weather data for each day
  isCelsius: Boolean;
}

// Function to format a date to display day, date, and month
function getFormattedDate(date: Date): string {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const monthName = months[date.getMonth()];

  return `${dayOfWeek}, ${day} ${monthName}`;
}

//convert Feh to Celsius
function fahrenheitToCelsius(fahrenheit: number) {
  if (fahrenheit !== 0) {
    return Math.floor(5 / 9 * (fahrenheit - 32));
  }
}


const DayForecast: React.FC<DayForecastProps> = ({ weatherDataForcaste, isCelsius }) => {
  const displayedWeather = weatherDataForcaste
    .slice(0, 5) // Display forecast for up to 5 days
    .map((day, index) => (
      <Grid item xs={12} sm={6} md={4} lg={2} key={index} sx={{ margin: '14px' }}>
        <Card sx={{ minWidth: 150, bgcolor: '#1E213A', color: '#fff' }}>
          <CardContent>
            <Typography component="div">
              {index === 0 ? 'Tomorrow' : getFormattedDate(new Date(day.datetime))}
            </Typography>
            <Typography>
              <img src={day.icon === 'rain' ? rainyDay : day.icon === 'partly-cloudy-day' ? cloudy : sun} alt='imag' style={{ width: '50px', height: '50px' }} />
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#fff', textAlign:'center' }} gutterBottom>
              {day.icon === 'rain' ? 'Rainy' : day.icon === 'partly-cloudy-day' ? 'Partly Cloudy' : 'Sunny'}
            </Typography>
            <Typography sx={{ fontSize: 14, color: '#fff' }} gutterBottom>
              <span style={{ float: 'left' }}>
                {isCelsius ? fahrenheitToCelsius(day.tempmax) : Math.floor(day.tempmax)}
                <span>{isCelsius ? '°C' : '°F'}</span>
              </span>
              <span style={{ float: 'right' }}>
                {isCelsius ? fahrenheitToCelsius(day.tempmin) : Math.floor(day.tempmin)}
                <span>{isCelsius ? '°C' : '°F'}</span>
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Five Day Forecast
      </Typography>
      <Grid container spacing={2}>
        {displayedWeather}
      </Grid>
    </div>
  );
};

export default DayForecast;
