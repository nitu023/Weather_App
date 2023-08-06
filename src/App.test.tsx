import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders heading and WeatherApp component', () => {
    render(<App />);
    
    // Check if the heading element is present
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Weather Forecast App');

    // Check if the WeatherApp component is present
    const weatherAppComponent = screen.getByTestId('weather-app');
    expect(weatherAppComponent).toBeInTheDocument();
  });
});
