import React from 'react';
import { render } from '@testing-library/react';
import WeatherApp from './WeatherApp';

test('renders WeatherApp component', () => {
  render(<WeatherApp />);
});