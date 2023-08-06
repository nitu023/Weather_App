import React from 'react';
import { render } from '@testing-library/react';
import DayForecast from './DayForecast';

describe('DayForecast component', () => {
  const mockWeatherData = [
    {
      datetime: '2023-08-01T12:00:00',
      tempmax: 80,
      tempmin: 70,
      icon: 'rain',
    },
  ];

  it('should render correctly', () => {
    const { getByText, getByAltText } = render(<DayForecast weatherDataForcaste={mockWeatherData} isCelsius={true} />);
  });
});
