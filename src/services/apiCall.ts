// src/services/weatherService.ts
import axios from 'axios';

const API_KEY_WEATHER = 'GBHVRYWKLADZA76WRGKL3MK4F';
const API_KEY = 'c3c92189f57b47908c679c82b401bad9';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

export async function fetchWeatherData(newLocation: string) {
  if (newLocation.length >= 3) {
    try {
      const response = await axios.get(`${BASE_URL}${newLocation}?key=${API_KEY_WEATHER}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  } else {
    throw new Error('Please provide more than or equal to 3 letters of your city name');
  }
}


export const fetchCityName = async (coordinates: { latitude: number; longitude: number } | null) => {
  try {
    if (!coordinates) {
      return ''; // Return early if coordinates are not available yet
    }
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${coordinates.latitude}+${coordinates.longitude}`
    );
    const data = await response.json();
    const city = data.results[0]?.components?.city;
    console.log(city, data, coordinates.latitude);
    return city || '';
  } catch (error) {
    console.error('Error fetching city name:', error);
    throw error;
  }
};