// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Grid, Stack, Switch, Box, CircularProgress,
   Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} 
from '@mui/material';
import axios from 'axios';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import rainyDay from '../assets/rainyDay.png';
import cloudy from '../assets/cloudy.png';
import sun from '../assets/sun.png';
import WeatherDetails from './WeatherDetails';
import DayForecast from './DayForecast';
import DayOverview from './DayOverview';
import _debounce from 'lodash/debounce';
import { fetchWeatherData, fetchCityName } from '../services/apiCall';

// Define days of the week and months arrays
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Define Coordinates interface
interface Coordinates {
  latitude: number;
  longitude: number;
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  // useEffect call user current location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (error) {
        console.error('Error fetching current location:', error);
      }
    };
    fetchLocation();
  }, []);

  //function for fetching current city  
  const fetchCurrentCity = async () => {
    try {
      const city = await fetchCityName(coordinates);
      if (city) {
        setCityName(city);
        setLocation(city);
      } else {
        setCityName('');
      }
    } catch (error) {
      console.error('Error fetching current city name:', error);
      setCityName('');
    }
  };

  useEffect(() => {
    if (cityName) {
      console.log(cityName)
      debouncedSearch(cityName);
    }
    fetchCurrentCity();
  }, [coordinates, cityName]);

  // fetching  user  current position 
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not available'));
      }
    });
  };

  const debouncedSearch = _debounce(async (newLocation: string) => {
    try {
      setLoading(true);
      const response = await fetchWeatherData(newLocation);
      if (response?.days?.length === 0) {
        setWeatherData(null);
        setOpen(true);
        setErrorMessage('Opps...We could not find any Data as per your given details');
      } else {
        setWeatherData(response);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setOpen(true); 
      setErrorMessage('Opps...We could not find any Data as per your given details');
    } finally {
      setLoading(false);
    }
  }, 1000);


  // Handle search button calling when button will click
  function handleSearchClick() {
    setErrorMessage('');
    debouncedSearch(location);
  }
  
  // HandleChnage function  input search 
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(false);
    setLocation(e.target.value);
  }

  // HandleChnage for unit change
  const handleUnitChange = () => {
    setIsCelsius(!isCelsius);
  }

  // Extracting weather data for the current day
  const presentWeatherData = weatherData && weatherData['days'][0];
  const humidity: number = presentWeatherData && presentWeatherData['humidity'] ? presentWeatherData['humidity'] : 0;
  const cloudcover: number = presentWeatherData && presentWeatherData['cloudcover'] ? presentWeatherData['cloudcover'] : 0;
  const datetimeString: string = presentWeatherData && presentWeatherData['datetime'] ? presentWeatherData['datetime'] : '';
  const date = new Date(datetimeString);
  const dayNumber = date.getDay();
  const currentMonth = date.getMonth();
  const currentMonthName = months[currentMonth];
  const dayName = daysOfWeek[dayNumber];
  const fahrenheit: number = presentWeatherData && presentWeatherData['temp'] ? presentWeatherData['temp'] : 0;

  // Function to convert Fahrenheit to Celsius
  function fahrenheitToCelsius(fahrenheit: number) {
    if (fahrenheit !== 0) {
      return Math.floor(5 / 9 * (fahrenheit - 32));
    }
  }

  // Converting Fahrenheit temperature to Celsius
  const celsiusTemperature = fahrenheitToCelsius(fahrenheit);

  // Geting weather icon and corresponding image with conditonal rendering
  const Icon = presentWeatherData && presentWeatherData['icon'];
  const Value = Icon === 'rain' ? rainyDay : Icon === 'partly-cloudy-day' ? cloudy : sun;

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container sx={{ height: '100vh', width:'100%' }}>
        {/* Left Grid */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              bgcolor: '#1E213A',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                value={location}
                onChange={handleChange}
                sx={{ backgroundColor: '#fff', color: '#000' }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={handleSearchClick}
                sx={{ ml: 2, bgcolor: '#fff'}}
              >
                <ArrowForwardIcon />
              </Button>
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
            {weatherData && presentWeatherData && weatherData ? (
              <div
                style={{
                  color: '#fff',
                  textAlign: 'center',
                }}
              >
                {/* Displayed weather information */}
                <h1 style={{ fontSize: '40px' }}>{weatherData && weatherData['address']}</h1>
                <p>{dayName}, {date.getDate()} {currentMonthName}</p> <br /> <br />
                <img src={Value} alt='rainy' style={{ width: '203px', height: '149px' }} /> <br /> <br />
                <h1>{isCelsius ? celsiusTemperature : Math.floor(fahrenheit)} <span>{isCelsius ? '°C' : '°F'} </span> </h1>
                <h3> {Icon === 'rain' ? 'Rainy' : Icon === 'partly-cloudy-day' ? 'Partialy Cloud' : 'Sunny'} </h3>
              </div>
            ) : ''}
          </Box>
        </Grid>
        
        {/* Displaying Right Grid */}
        {loading && <CircularProgress size='large' />}
        {weatherData && presentWeatherData && weatherData ? (
          <Grid item xs={12} sm={8} md={7} lg={8} style={{ color: '#fff' }}>
            <Box sx={{ bgcolor: '#100E1D', height: '100%', padding: '20px' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{float: 'right'}}>
                <Typography>°F</Typography>
                <Switch checked={isCelsius} onChange={handleUnitChange}/>
                <Typography>°C</Typography>
              </Stack>
              {/* Display day overview component */}
              <DayOverview humidity={humidity} cloudcover={cloudcover} />
              {/* Display weather details and forecast */}
              <WeatherDetails weatherData={presentWeatherData} isCelsius={isCelsius} />
              <br /> <br />
              <DayForecast weatherDataForcaste={weatherData && weatherData['days']} isCelsius={isCelsius} />
            </Box>
          </Grid>
        ) : (
          // Display error dialog if data not found
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Data Not Found!!!
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                 {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                 Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Grid>
    </>
  );
};

export default WeatherApp;
