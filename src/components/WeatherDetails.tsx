import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Defined the interface for weather data
interface WeatherData {
  tempmax: number;
  tempmin: number;
  sunrise: string;
  sunset: string;
}

// Defined the props interface for the WeatherDetails component
interface WeatherDetailsProps {
  weatherData: WeatherData;
  isCelsius: boolean;
}

// WeatherDetails component that displays weather details
const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weatherData, isCelsius }) => {

  // Function to convert Fahrenheit to Celsius
  function fahrenheitToCelsius(fahrenheit: number) {
    if (fahrenheit !== 0) {
      return Math.floor(5 / 9 * (fahrenheit - 32));
    }
  }

  // Convert max and min temperatures from Fahrenheit to Celsius
  const celsiusTempMax = fahrenheitToCelsius(weatherData['tempmax']);
  const celsiusTempMin = fahrenheitToCelsius(weatherData['tempmin']);

  function formatTime(date: string) {
    const newDate = date.split(':');
    const hrs = newDate[0];
    const min = newDate[1];
    return `${hrs}: ${min}`;
}

const sunriseTime = formatTime(weatherData['sunrise']);
const sunriseSet = formatTime(weatherData['sunset']);

console.log('nitu', sunriseTime)


  return (
    <Grid container spacing={2} sx={{ textAlign: 'center', marginTop: '10px' }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 150, bgcolor: '#1E213A', color: '#fff' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Max Temp
            </Typography>
            <Typography variant="h5" component="div">
              {isCelsius ? celsiusTempMax : Math.floor(weatherData['tempmax'])} <span>{isCelsius ? '°C' : '°F'}</span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 150, bgcolor: '#1E213A', color: '#fff' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Min Temp
            </Typography>
            <Typography variant="h5" component="div">
              {isCelsius ? celsiusTempMin : Math.floor(weatherData['tempmin'])} <span>{isCelsius ? '°C' : '°F'}</span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 150, bgcolor: '#1E213A', color: '#fff' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14, color: '#fff' }} gutterBottom>
              Sunrise
            </Typography>
            <Typography variant="h5" component="div">
              {sunriseTime}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ minWidth: 150, bgcolor: '#1E213A', color: '#fff' }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Sunset
            </Typography>
            <Typography variant="h5" component="div">
              {sunriseSet}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WeatherDetails;
